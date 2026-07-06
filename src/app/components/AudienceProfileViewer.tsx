import { useState, useRef, useEffect, useMemo } from "react";
import AudienceProfileContent from "./AudienceProfileContent";
import MobilityDeepDive from "./MobilityDeepDive";
import { MOBILITY_SECTIONS, MobilitySectionCard } from "./MobilitySections";
import TemporalDeepDive, { PeakDaysDaypartsCard, TEMPORAL_DENSITY_ID } from "./TemporalDeepDive";
import AskLumosPanel, { type AskMsg } from "./AskLumosPanel";
import type { ModuleRef } from "./ModuleAsk";
import DigitalTwinTab from "./DigitalTwinTab";
import { MyViewProvider, MyViewTab, PinIcon, type Catalog, type AnchorModule } from "./MyView";
import {
  seedBlocks,
  seedMobilityBlocks,
  seedTemporalBlocks,
  resolveBlockRequest,
  type BlockConfig,
} from "./deepDiveBlocks";

interface AudienceProfileViewerProps {
  audienceId: string;
  audienceName?: string;
  onBack: () => void;
}

type DeepDiveTab = 'myview' | 'profile' | 'mobility' | 'temporal' | 'digital';
// The three tabs that render an editable block deck (Digital Twin is excluded).
type DeckKey = 'profile' | 'mobility' | 'temporal';

// My View leads (it's the user's own overview); the analytical tabs follow.
const TABS: { key: DeepDiveTab; label: string }[] = [
  { key: 'myview',   label: 'My View'            },
  { key: 'profile',  label: 'Audience Profile'   },
  { key: 'mobility', label: 'Mobility & Movement' },
  { key: 'temporal', label: 'Temporal & Seasonal' },
  { key: 'digital',  label: 'Digital Twin'        },
];

// Source-tab label for each deck (shown as a chip on My View's mixed cards).
const DECK_LABELS: Record<DeckKey, string> = {
  profile: 'Audience Profile',
  mobility: 'Mobility & Movement',
  temporal: 'Temporal & Seasonal',
};

// Default pinned modules — a cross-tab starter mix so My View is never bare on
// first open. Ids must exist in the seed decks.
const DEFAULT_MYVIEW = ['tmp-peak', 'mob-districts', 'purchase-patterns', 'top-segments'];

// The profile tab's <AskPill> uses a lucide Sparkles glyph; the Figma screens ship
// a different (chat-bubble) icon. We swap theirs for this so every "Ask" matches.
// (currentColor → inherits the pill's #6b3c72 text colour.)
const SPARKLE_ICON =
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:11px;height:11px;display:block">` +
  `<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/>` +
  `<path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M6 18H2"/></svg>`;

export default function AudienceProfileViewer(props: AudienceProfileViewerProps) {
  const [activeTab, setActiveTab] = useState<DeepDiveTab>('profile');
  // Ask Lumos docks open by default — interrogating the audience is the primary verb.
  const [askOpen, setAskOpen] = useState(true);
  // "Defined by" reveals the audience's provenance (filters/sources/window/geo/confidence).
  // Open by default so the definition is visible on every audience's deep dive.
  const [defsOpen, setDefsOpen] = useState(true);
  // Thread + draft live here (not in the panel) so the conversation survives a collapse.
  const [askMessages, setAskMessages] = useState<AskMsg[]>([]);
  const [askDraft, setAskDraft] = useState('');
  // Sections pinned into the docked chat via a tile's inline "Ask" (Digital Twin).
  const [pinned, setPinned] = useState<ModuleRef[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── Editable block decks — one per in-scope tab, held in memory. The docked
  //    Ask panel scopes to whichever block's ✦ Ask (or the Add tile) was clicked. ──
  const [decks, setDecks] = useState<Record<DeckKey, BlockConfig[]>>(() => ({
    profile: seedBlocks(),
    mobility: seedMobilityBlocks(),
    temporal: seedTemporalBlocks(),
  }));
  const [scope, setScope] = useState<{ blockId: string; label: string } | null>(null);
  const deckKey: DeckKey | null = activeTab === 'digital' || activeTab === 'myview' ? null : activeTab;

  // ── My View — the user's pinned modules for this audience. Order is display
  //    order; membership = pinned. Persisted per-audience (per-user feel). ──
  const storageKey = `lumos:myview:${props.audienceId}`;
  const [myViewIds, setMyViewIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return JSON.parse(raw);
    } catch { /* ignore */ }
    return DEFAULT_MYVIEW;
  });
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(myViewIds)); } catch { /* ignore */ }
  }, [storageKey, myViewIds]);

  const togglePin = (id: string) =>
    setMyViewIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  // Flatten every deck's blocks + the fixed anchors (Mobility map, Temporal
  // density) so My View can resolve a pinned id to its renderer and know which
  // tab it came from. Digital Twin has no pinnable modules.
  const { blockMap, sourceOf, catalog } = useMemo(() => {
    const bm: Record<string, BlockConfig> = {};
    const src: Record<string, string> = {};
    // Anchor catalog items, keyed by the deck they belong beside. Mobility's
    // sections are now individual native cards (MOBILITY_SECTIONS).
    const anchorItems: Record<DeckKey, { id: string; title: string; subtitle?: string }[]> = {
      profile: [],
      mobility: MOBILITY_SECTIONS.map((s) => ({ id: s.id, title: s.title, subtitle: s.subtitle })),
      temporal: [{ id: TEMPORAL_DENSITY_ID, title: 'Peak days & dayparts', subtitle: 'Hour × day · indexed density' }],
    };
    const cat: Catalog = (['profile', 'mobility', 'temporal'] as DeckKey[]).map((k) => {
      decks[k].forEach((b) => { bm[b.id] = b; src[b.id] = DECK_LABELS[k]; });
      anchorItems[k].forEach((a) => { src[a.id] = DECK_LABELS[k]; });
      const deckItems = decks[k].map((b) => ({ id: b.id, title: b.title, subtitle: b.subtitle }));
      return { key: k, label: DECK_LABELS[k], items: [...anchorItems[k], ...deckItems] };
    });
    return { blockMap: bm, sourceOf: src, catalog: cat };
  }, [decks]);

  // Short name for the panel's answer scope (strip the " — Singapore" suffix).
  const askName = (props.audienceName ?? 'Urban Upgrade Drivers').split(' — ')[0];

  // Which deck a block id lives in (scope only ever targets the active tab today).
  const findDeck = (id: string): DeckKey | null =>
    (Object.keys(decks) as DeckKey[]).find((k) => decks[k].some((b) => b.id === id)) ?? null;

  // A block's ✦ Ask → scope the docked chat to that block (edit).
  const askBlock = (config: BlockConfig) => {
    setAskOpen(true);
    setScope({ blockId: config.id, label: config.title });
  };

  // The Add-chart tile → scope the chat to "new block" + seed the prompt.
  const addBlock = () => {
    setAskOpen(true);
    setScope({ blockId: 'new', label: 'New chart' });
    setAskMessages((m) => [
      ...m,
      {
        role: 'lumos',
        text: 'What would you like to add? Describe the chart in plain language — e.g. “compare car ownership by lifestage as a bar chart”.',
      },
    ]);
  };

  // Route a composer submission: new-block, block-edit, or general Q&A.
  const handleAskSubmit = (q: string) => {
    setAskMessages((m) => [...m, { role: 'you', text: q }]);

    if (scope?.blockId === 'new') {
      const res = resolveBlockRequest({ userText: q, scope: 'new' });
      if (res.kind === 'new' && deckKey) {
        const dk = deckKey;
        setDecks((d) => ({ ...d, [dk]: [...d[dk], res.newBlock] }));
      }
      setAskMessages((m) => [...m, { role: 'lumos', text: res.reply }]);
      setScope(null);
    } else if (scope) {
      const dk = findDeck(scope.blockId);
      const current = dk ? decks[dk].find((b) => b.id === scope.blockId) : undefined;
      const res = resolveBlockRequest({ userText: q, scope: 'edit', currentConfig: current });
      if (res.kind === 'patch' && dk) {
        setDecks((d) => ({
          ...d,
          [dk]: d[dk].map((b) => (b.id === scope.blockId ? { ...b, ...res.patch } : b)),
        }));
        if (res.patch.title) setScope({ blockId: scope.blockId, label: res.patch.title });
      }
      setAskMessages((m) => [...m, { role: 'lumos', text: res.reply }]);
    } else {
      // General audience Q&A — mirrors the panel's stub, honouring pinned context.
      const scopeStr = pinned.length ? pinned.map((p) => p.label).join(', ') : null;
      const focus = scopeStr ? ` — focused on ${scopeStr}` : '';
      setAskMessages((m) => [
        ...m,
        {
          role: 'lumos',
          text: `Looking at ${askName} for the current tab and filters${focus}: ${q} — here's where the grounded answer appears, drawn from this audience's live data.`,
        },
      ]);
    }
  };

  const pinSection = (ref: ModuleRef) => {
    setAskOpen(true); // reveal the panel so the added context is visible
    setPinned((prev) => (prev.some((r) => r.id === ref.id) ? prev : [...prev, ref]));
  };
  const unpinSection = (id: string) => setPinned((prev) => prev.filter((r) => r.id !== id));

  // Fixed anchors — hand-built cards that aren't config-driven blocks but are
  // still pinnable: the Temporal density heatmap and each native Mobility section.
  const anchors: Record<string, AnchorModule> = {
    [TEMPORAL_DENSITY_ID]: {
      id: TEMPORAL_DENSITY_ID, title: 'Peak days & dayparts', source: DECK_LABELS.temporal, span: 3,
      render: () => <PeakDaysDaypartsCard audience={askName} onAskGraph={pinSection} />,
    },
    ...Object.fromEntries(MOBILITY_SECTIONS.map((s) => [s.id, {
      id: s.id, title: s.title, source: DECK_LABELS.mobility, span: s.span,
      render: () => <MobilitySectionCard id={s.id} audience={askName} onAskGraph={pinSection} />,
    }])),
  };

  const handleTabClick = (tab: DeepDiveTab) => {
    setActiveTab(tab);
    setPinned([]); // pinned sections are tab-scoped — drop them when the tab changes
    setScope(null); // an off-tab block scope would edit something out of view
    scrollRef.current?.scrollTo({ top: 0 });
  };

  // The Mobility/Temporal/Digital tabs are Figma-generated screens whose tiles
  // carry a static "Ask" pill. Rather than rewrite those generated files, we
  // catch the click here, read the enclosing card's title, and pin it into chat.
  // (The profile tab wires its own <AskPill> and is excluded to avoid double-pins.)
  const CONTROL_LABELS = new Set(['Ask', 'Trend', 'Snapshot', 'Map', 'Index', '%', 'Count', 'Export', 'New']);
  const handleScreenAsk = (e: React.MouseEvent) => {
    // Only Digital Twin still carries static Figma "Ask" pills scraped here.
    // Profile, Temporal and (now) Mobility render real <AskPill>s, so exclude
    // them to avoid double-pinning.
    if (activeTab === 'profile' || activeTab === 'temporal' || activeTab === 'mobility') return;
    // Ignore clicks inside the editable deck — those route through the block's own
    // ✦ Ask (scope), not the legacy pin-to-chat affordance on the map anchor.
    if ((e.target as HTMLElement).closest?.('[data-editable-deck]')) return;
    // Walk up from the click to find the "Ask" affordance itself.
    let el = e.target as HTMLElement | null;
    let hit: HTMLElement | null = null;
    for (let d = 0; el && d < 4; d++, el = el.parentElement) {
      if ((el.textContent || '').trim() === 'Ask') { hit = el; break; }
    }
    if (!hit) return;
    // Read the enclosing tile's title: climb ancestors and stop at the smallest
    // container (20–700 chars — a single card, not the whole screen) that holds a
    // heading. Skip controls, numeric values, and the persistent page header;
    // among what's left the title is the largest type.
    let title = '';
    let node: HTMLElement | null = hit;
    for (let d = 0; node && d < 10; d++, node = node.parentElement) {
      const len = (node.textContent || '').trim().length;
      if (len < 20 || len > 700) continue;
      const cands = [...node.querySelectorAll('p,span,h1,h2,h3')]
        .map((n) => ({ t: (n.textContent || '').trim(), fs: parseFloat(getComputedStyle(n).fontSize) || 0 }))
        .filter((o) => o.t.length > 3 && o.t.length < 46 && !CONTROL_LABELS.has(o.t) && !/^[\d$]/.test(o.t) && !/Urban Upgrade Drivers/.test(o.t));
      if (cands.length) { cands.sort((a, b) => b.fs - a.fs); title = cands[0].t; break; }
    }
    if (!title) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    pinSection({ id: `aud:${askName}:${activeTab}:${slug}`, label: title, audience: askName, state: [] });
  };

  // Match the Figma screens' baked-in "Ask" pills to the profile tab's <AskPill>:
  // CSS (in the style block) handles shape/border/sizing/hover; the icon can't be
  // swapped in CSS, so replace the glyph here once per screen mount. Safe against
  // re-renders — the screen imports are static, so React never re-writes this DOM.
  useEffect(() => {
    // Only Mobility still renders a Figma screen (its map anchor) with baked pills.
    if (activeTab !== 'mobility') return;
    const root = scrollRef.current;
    if (!root) return;
    root
      .querySelectorAll<HTMLElement>('[data-name="Background+Border"]')
      .forEach((pill) => {
        if (!/bg-\[#f1e9ff\]/.test(pill.className) || !/rounded-\[7px\]/.test(pill.className)) return;
        const iconWrap = pill.querySelector('[data-name="SVG"]');
        if (iconWrap && !iconWrap.hasAttribute('data-ask-sparkle')) {
          iconWrap.setAttribute('data-ask-sparkle', '');
          iconWrap.innerHTML = SPARKLE_ICON;
        }
      });
  }, [activeTab]);

  return (
    <MyViewProvider value={{ isPinned: (id) => myViewIds.includes(id), toggle: togglePin }}>
    <div className="flex-1 flex min-w-0 overflow-hidden">
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#fafaf8]">
      <style>{`
        /* ── Hide built-in nav sidebar ── */
        .kc-deep-dive [data-name="Background+Border"] > div > [data-name="Container"] > div > [data-name="VerticalBorder"] {
          display: none !important;
        }

        /* ── Strip outer wrapper card — scoped to each screen root only ── */
        .kc-deep-dive [data-name="SCREEN 1 — PROFILE"] > [data-name="Background+Border"],
        .kc-deep-dive [data-name="SCREEN 2 — MOBILITY"] > [data-name="Background+Border"],
        .kc-deep-dive [data-name="SCREEN 3 — TEMPORAL"] > [data-name="Background+Border"],
        .kc-deep-dive [data-name="SCREEN 4 — DIGITAL TWIN"] > [data-name="Background+Border"] {
          background: transparent !important;
          border-radius: 0 !important;
          width: 100% !important;
        }
        .kc-deep-dive [data-name="SCREEN 1 — PROFILE"] > [data-name="Background+Border"] > div:first-child,
        .kc-deep-dive [data-name="SCREEN 2 — MOBILITY"] > [data-name="Background+Border"] > div:first-child,
        .kc-deep-dive [data-name="SCREEN 3 — TEMPORAL"] > [data-name="Background+Border"] > div:first-child,
        .kc-deep-dive [data-name="SCREEN 4 — DIGITAL TWIN"] > [data-name="Background+Border"] > div:first-child {
          padding: 0 !important;
          border-radius: 0 !important;
        }
        .kc-deep-dive [data-name="SCREEN 1 — PROFILE"] > [data-name="Background+Border"] > [aria-hidden],
        .kc-deep-dive [data-name="SCREEN 2 — MOBILITY"] > [data-name="Background+Border"] > [aria-hidden],
        .kc-deep-dive [data-name="SCREEN 3 — TEMPORAL"] > [data-name="Background+Border"] > [aria-hidden],
        .kc-deep-dive [data-name="SCREEN 4 — DIGITAL TWIN"] > [data-name="Background+Border"] > [aria-hidden] {
          display: none !important;
        }

        /* ── Hide the baked-in static tab bar (h-[50px] is unique to it) ── */
        .kc-deep-dive [data-name="Background+Border"][class*="h-[50px]"] {
          display: none !important;
        }

        /* ── Hide KPI card from flex-col screen imports — rendered above the tab bar in the viewer ── */
        .kc-deep-dive [data-name="Container"][class*="flex-[1_0_0]"][class*="flex-col"] > [data-name="Background+Border"]:first-child {
          display: none !important;
        }

        /* ── Screen3Temporal uses absolute positioning — hide KPI card and shift content up ── */
        .kc-deep-dive [data-name="SCREEN 3 — TEMPORAL"] [data-name="Container"][class*="flex-[1_0_0]"]:not([class*="flex-col"]) > [data-name="Background+Border"]:first-child {
          display: none !important;
        }
        .kc-deep-dive [data-name="SCREEN 3 — TEMPORAL"] [data-name="Container"][class*="flex-[1_0_0]"]:not([class*="flex-col"]) {
          margin-top: -214px !important;
        }

        /* ── Restore outer gutter and inter-section spacing ── */
        .kc-deep-dive {
          padding: 21px;
        }
        /* Vertical gap between each stacked section inside each screen's main column */
        .kc-deep-dive [data-name="Container"][class*="flex-[1_0_0]"][class*="flex-col"] {
          gap: 14px !important;
        }

        /* ── Normalise the Figma screens' baked-in "Ask" pills to the profile tab's
              <AskPill>: full radius, no border, matching padding/type + hover. The
              icon glyph is swapped separately in JS (see SPARKLE_ICON). ── */
        .kc-deep-dive [data-name="Background+Border"][class*="bg-[#f1e9ff]"][class*="rounded-[7px]"] {
          border-radius: 9999px !important;
          height: auto !important;
          padding: 3px 8px !important;
          gap: 4px !important;
          cursor: pointer;
        }
        .kc-deep-dive [data-name="Background+Border"][class*="bg-[#f1e9ff]"][class*="rounded-[7px]"]:hover {
          background-color: #e7dbf6 !important;
        }
        .kc-deep-dive [data-name="Background+Border"][class*="bg-[#f1e9ff]"][class*="rounded-[7px]"] > [aria-hidden] {
          display: none !important;
        }
        .kc-deep-dive [data-name="Background+Border"][class*="bg-[#f1e9ff]"][class*="rounded-[7px]"] [data-name="SVG"] {
          width: 11px !important;
          height: 11px !important;
        }
        .kc-deep-dive [data-name="Background+Border"][class*="bg-[#f1e9ff]"][class*="rounded-[7px]"] p {
          font-size: 11px !important;
        }
      `}</style>

      {/* ── Persistent header: audience name + action buttons ── */}
      <div className="flex-none flex items-center justify-between gap-3 px-5 pt-4 pb-0 bg-[#fafaf8]">
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="font-['Jua',sans-serif] text-[18px] text-[#1a1a1a] leading-[27px] truncate">Urban Upgrade Drivers — Singapore</span>
          <span className="font-['Inter',sans-serif] text-[11px] text-[#9a9a9a] whitespace-nowrap shrink-0">· updated 2d ago</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Defined by — toggles the audience definition panel inside the KPI card */}
          <button
            onClick={() => setDefsOpen((v) => !v)}
            aria-pressed={defsOpen}
            aria-label="Toggle audience definition"
            className="flex items-center gap-[6px] bg-[#fafaf8] border border-[#e5e5e2] rounded-lg px-3 py-2 hover:bg-[#f3f3f1] transition-colors"
          >
            <svg viewBox="0 0 13 13" width="13" height="13" fill="none" className={`transition-transform ${defsOpen ? '' : 'rotate-180'}`}>
              <path d="M9.75 8.125L6.5 4.875L3.25 8.125" stroke="#6B6B6B" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-['Inter',sans-serif] text-[11.4px] text-[#6b6b6b] leading-normal">Defined by</span>
          </button>
          {/* Export */}
          <button className="flex items-center gap-[6px] bg-white border border-[#e5e5e2] rounded-lg px-3 py-2 hover:bg-[#f5f5f3] transition-colors">
            <svg viewBox="0 0 14 14" width="14" height="14" fill="none">
              <path d="M7 1.75V8.75M9.33333 6.41667L7 8.75L4.66667 6.41667M2.91667 12.25H11.0833" stroke="#1A1A1A" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] leading-[18px]">Export</span>
          </button>
          {/* Ask Lumos — toggles the docked panel (filled when open, outline when closed) */}
          <button
            onClick={() => setAskOpen((v) => !v)}
            aria-pressed={askOpen}
            className={`flex items-center gap-[6px] border border-[#6b3c72] rounded-lg px-3 py-2 transition-colors ${
              askOpen ? 'bg-[#6b3c72] hover:bg-[#5a3261]' : 'bg-white hover:bg-[#f5f0ff]'
            }`}
          >
            <svg viewBox="0 0 14 14" width="14" height="14" fill="none">
              <path d="M7 1.75L8.16667 4.66667L11.0833 5.83333L8.16667 7L7 9.91667L5.83333 7L2.91667 5.83333L5.83333 4.66667L7 1.75Z" stroke={askOpen ? 'white' : '#6B3C72'} strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`font-['Jua',sans-serif] text-[12px] leading-[18px] ${askOpen ? 'text-white' : 'text-[#6b3c72]'}`}>Ask Lumos</span>
          </button>
        </div>
      </div>

      {/* ── KPI card — audience definition, sits between header and tab bar ── */}
      <div className="flex-none px-5 pt-3 pb-0 bg-[#fafaf8]">
        <div className="bg-white relative rounded-[14px] w-full border border-[#e5e5e2]">
          <div className="flex flex-col gap-[12px] items-start pb-[14px] pt-[15px] px-[17px]">
            <div className="flex items-stretch w-full rounded-[10px] border border-[#e5e5e2] overflow-hidden">
              {[
                { label: 'Audience size', value: '387k', badge: '▲ +8% vs Q4', badgeColor: '#2f7d4f', badgeBg: '#e7f3ec' },
                { label: 'Index vs national', value: '2.1×', badge: '▲ +0.3×', badgeColor: '#2f7d4f', badgeBg: '#e7f3ec' },
                { label: 'Peak day & hour', value: 'Sat', sub: '10–12pm', badge: '2.1×', badgeColor: '#6b3c72', badgeBg: '#f1e9ff' },
                { label: 'Distinctive', value: '62%', badge: 'own 3yr+', badgeColor: '#6b3c72', badgeBg: '#f1e9ff' },
              ].map((m, i, arr) => (
                <div key={m.label} className={`flex-1 flex flex-col gap-[3px] px-[16px] py-[14px] relative ${i < arr.length - 1 ? 'border-r border-[#e5e5e2]' : ''}`}>
                  <span className="font-['Jua',sans-serif] text-[10px] text-[#9a9a9a] uppercase tracking-[0.6px]">{m.label}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Jua',sans-serif] text-[21px] text-[#1a1a1a] leading-none">{m.value}</span>
                    {m.sub && <span className="font-['Jua',sans-serif] text-[12px] text-[#6b6b6b] leading-none">{m.sub}</span>}
                    <span className="font-['Jua',sans-serif] text-[10px] px-[6px] py-[2px] rounded-full whitespace-nowrap" style={{ color: m.badgeColor, background: m.badgeBg }}>{m.badge}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Defined by — audience provenance, revealed by the header button ── */}
            {defsOpen && (
              <div className="flex flex-wrap gap-[7px] w-full pt-[12px] border-t border-dashed border-[#e5e5e2]">
                {[
                  { label: 'Filters:', value: ' In-market auto intenders · showroom & dealer dwell' },
                  { label: 'Sources:', value: ' LUMOS panels · GWI · Telco · Card & loyalty' },
                  { label: 'Window:', value: ' Mar–May 2026 · rolling 90d' },
                  { label: 'Geo:', value: ' Singapore' },
                  { label: 'Confidence:', value: ' ±2.1% @ 95% CI' },
                ].map((c) => (
                  <span
                    key={c.label}
                    className="bg-[#f3f3f1] border border-[#e5e5e2] rounded-full pt-[4px] pb-[5.5px] px-[11px] font-['Jua',sans-serif] text-[11px] leading-[16.5px] whitespace-nowrap"
                  >
                    <span className="text-[#1a1a1a]">{c.label}</span>
                    <span className="text-[#6b6b6b]">{c.value}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Tab bar — below audience definition, above date/geo filters ── */}
      <div className="flex-none px-5 pt-3 pb-0 bg-[#fafaf8]">
        <div className="flex items-center bg-white border border-[#e5e5e2] rounded-xl p-[5px] gap-1 h-[50px]">
          {TABS.map(({ key, label }) => {
            const isMyView = key === 'myview';
            const activeCls = isMyView ? 'bg-[#fbf3de] text-[#c69214]' : 'bg-[#f1e9ff] text-[#6b3c72]';
            return (
              <button
                key={key}
                onClick={() => handleTabClick(key)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-[9px] font-['Jua',sans-serif] text-[13px] transition-colors whitespace-nowrap ${
                  activeTab === key ? activeCls : 'text-[#6b6b6b] hover:bg-[#f5f5f3]'
                }`}
              >
                {isMyView && <PinIcon filled={activeTab === key} size={13} />}
                {label}
                {isMyView && (
                  <span
                    className="text-[10px] px-[6px] py-[1px] rounded-full leading-none"
                    style={activeTab === key ? { background: 'rgba(198,146,20,0.16)' } : { background: 'rgba(0,0,0,0.06)' }}
                  >
                    {myViewIds.filter((id) => blockMap[id] || anchors[id]).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Scrollable content — KPI card hidden via CSS, starts with date/geo filters ── */}
      <div
        ref={scrollRef}
        onClick={handleScreenAsk}
        className="kc-deep-dive flex-1 overflow-y-auto overflow-x-auto"
      >
        {activeTab === 'myview' && (
          <MyViewTab
            order={myViewIds}
            blockMap={blockMap}
            anchors={anchors}
            sourceOf={sourceOf}
            catalog={catalog}
            scopeId={scope?.blockId ?? null}
            onReorder={setMyViewIds}
            onToggle={togglePin}
            onAsk={askBlock}
            onBrowse={() => handleTabClick('profile')}
          />
        )}
        {activeTab === 'profile' && (
          <AudienceProfileContent
            blocks={decks.profile}
            scopeId={scope?.blockId ?? null}
            onAskBlock={askBlock}
            onAddBlock={addBlock}
          />
        )}
        {activeTab === 'mobility' && (
          <MobilityDeepDive
            blocks={decks.mobility}
            scopeId={scope?.blockId ?? null}
            onAskBlock={askBlock}
            onAddBlock={addBlock}
            audience={askName}
            onAskGraph={pinSection}
          />
        )}
        {activeTab === 'temporal' && (
          <TemporalDeepDive
            blocks={decks.temporal}
            scopeId={scope?.blockId ?? null}
            onAskBlock={askBlock}
            onAddBlock={addBlock}
            audience={askName}
            onAskGraph={pinSection}
          />
        )}
        {activeTab === 'digital' && <DigitalTwinTab />}
      </div>
    </div>

      {/* ── Ask Lumos docked panel — toggled by the header button; thread persists across collapse ── */}
      {askOpen && (
        <AskLumosPanel
          audienceName={askName}
          messages={askMessages}
          setMessages={setAskMessages}
          draft={askDraft}
          setDraft={setAskDraft}
          pinned={pinned}
          onUnpin={unpinSection}
          scope={scope}
          onClearScope={() => setScope(null)}
          onSubmit={handleAskSubmit}
        />
      )}
    </div>
    </MyViewProvider>
  );
}
