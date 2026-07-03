import { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowUp, X, Lock } from 'lucide-react';
import DeepDiveBlock, { AddChartTile } from '../app/components/DeepDiveBlock';
import {
  seedBlocks, seedMobilityBlocks, seedTemporalBlocks,
  resolveBlockRequest, type BlockConfig,
} from '../app/components/deepDiveBlocks';

// ── Standalone preview harness for the editable deep-dive blocks feature ──────
// Not wired into the app (shared files are owned by another live session). It
// reproduces the audience-detail tab shell and renders an independent, editable
// block deck per tab — Profile / Mobility / Temporal — plus a working mock of
// the scoped Ask panel. Digital Twin is intentionally excluded (not relevant).

type TabKey = 'profile' | 'mobility' | 'temporal' | 'digital';
const TABS: { key: TabKey; label: string }[] = [
  { key: 'profile', label: 'Audience Profile' },
  { key: 'mobility', label: 'Mobility & Movement' },
  { key: 'temporal', label: 'Temporal & Seasonal' },
  { key: 'digital', label: 'Digital Twin' },
];

const HERO: Record<Exclude<TabKey, 'digital'>, { eyebrow: string; line: string }> = {
  profile: { eyebrow: 'Takeaway · who they are', line: 'Affluent mid-career professionals who over-index across premium automotive, financial services and aspirational lifestyle brands.' },
  mobility: { eyebrow: 'Takeaway · where they move', line: 'Home-anchored in the central prime districts, commuting into the CBD with an evening movement peak around 5–7pm.' },
  temporal: { eyebrow: 'Takeaway · when to reach them', line: 'A Saturday, late-morning audience — activity peaks 10–12pm and lifts +42% at weekends, strongest in the Feb–Mar window.' },
};

type Msg = { role: 'you' | 'lumos'; text: string };
type Scope = { blockId: string; label: string } | null;
type Decks = Record<Exclude<TabKey, 'digital'>, BlockConfig[]>;

export default function DeepDivePreview() {
  const [activeTab, setActiveTab] = useState<TabKey>('profile');
  const [decks, setDecks] = useState<Decks>(() => ({
    profile: seedBlocks(),
    mobility: seedMobilityBlocks(),
    temporal: seedTemporalBlocks(),
  }));
  const [scope, setScope] = useState<Scope>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => { threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight }); }, [messages]);

  const deckKey = activeTab === 'digital' ? null : (activeTab as Exclude<TabKey, 'digital'>);

  // Find which deck a block id lives in (scope can survive a tab switch).
  const findDeck = (id: string): Exclude<TabKey, 'digital'> | null =>
    (Object.keys(decks) as Exclude<TabKey, 'digital'>[]).find((k) => decks[k].some((b) => b.id === id)) ?? null;

  const askBlock = (config: BlockConfig) => {
    setScope({ blockId: config.id, label: config.title });
    inputRef.current?.focus();
  };

  const addBlock = () => {
    setScope({ blockId: 'new', label: 'New chart' });
    setMessages((m) => [...m, {
      role: 'lumos',
      text: "What would you like to add? Describe the chart in plain language — e.g. “compare car ownership by lifestage as a bar chart”.",
    }]);
    inputRef.current?.focus();
  };

  const submit = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setDraft('');
    setMessages((m) => [...m, { role: 'you', text: q }]);

    if (scope?.blockId === 'new') {
      const res = resolveBlockRequest({ userText: q, scope: 'new' });
      if (res.kind === 'new' && deckKey) setDecks((d) => ({ ...d, [deckKey]: [...d[deckKey], res.newBlock] }));
      setMessages((m) => [...m, { role: 'lumos', text: res.reply }]);
      setScope(null);
    } else if (scope) {
      const dk = findDeck(scope.blockId);
      const current = dk ? decks[dk].find((b) => b.id === scope.blockId) : undefined;
      const res = resolveBlockRequest({ userText: q, scope: 'edit', currentConfig: current });
      if (res.kind === 'patch' && dk) {
        setDecks((d) => ({ ...d, [dk]: d[dk].map((b) => (b.id === scope.blockId ? { ...b, ...res.patch } : b)) }));
        if (res.patch.title) setScope({ blockId: scope.blockId, label: res.patch.title });
      }
      setMessages((m) => [...m, { role: 'lumos', text: res.reply }]);
    } else {
      setMessages((m) => [...m, {
        role: 'lumos',
        text: `Looking at Urban Upgrade Drivers: “${q}” — grounded answer from this audience's live data. Tip: click a chart's ✦ Ask to edit it.`,
      }]);
    }
    inputRef.current?.focus();
  };

  const empty = messages.length === 0;
  const hero = deckKey ? HERO[deckKey] : null;

  return (
    <div className="flex h-full min-h-0 bg-[#fafaf8]">
      {/* ── Left: the audience detail body ── */}
      <div className="flex-1 min-w-0 overflow-y-auto flex flex-col">
        {/* preview banner */}
        <div className="sticky top-0 z-20 bg-[#2a1330] text-white px-5 py-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-['Jua',sans-serif] text-[12px]">Preview · Editable deep-dive blocks (not yet merged) — one editable deck per tab; Digital Twin excluded.</span>
        </div>

        <div className="px-[21px] pt-4">
          {/* header context */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-['Jua',sans-serif] text-[18px] text-[#1a1a1a]">Urban Upgrade Drivers — Singapore</span>
            <span className="font-['Inter',sans-serif] text-[11px] text-[#9a9a9a]">· updated 1d ago</span>
          </div>

          {/* tab bar — mirrors the real deep-dive tab shell */}
          <div className="flex items-center bg-white border border-[#e5e5e2] rounded-xl p-[5px] gap-1 h-[50px]">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-[9px] font-['Jua',sans-serif] text-[13px] transition-colors whitespace-nowrap ${
                  activeTab === key ? 'bg-[#f1e9ff] text-[#6b3c72]' : 'text-[#6b6b6b] hover:bg-[#f5f5f3]'
                }`}
              >
                {label}
                {key === 'digital' && <Lock className="w-3 h-3 opacity-60" />}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab body ── */}
        {deckKey ? (
          <div className="p-[21px] flex flex-col gap-[14px] max-w-[1000px]">
            {/* filter bar (static context) */}
            <div className="flex items-center gap-2 flex-wrap">
              {[['Date', 'Jan–Mar 2026'], ['Geography', 'Singapore'], ['Indexed vs', 'National average']].map(([l, v]) => (
                <div key={l} className="flex items-center gap-[6px] bg-white border border-[#e5e5e2] rounded-[10px] px-[10px] py-[6px]">
                  <span className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.54px] text-[#9a9a9a]">{l}</span>
                  <span className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a]">{v}</span>
                </div>
              ))}
            </div>

            {/* takeaway hero (condensed) */}
            {hero && (
              <div className="rounded-[14px] border border-[#bebde7] p-5" style={{ background: 'linear-gradient(180deg, #f7f1ff 0%, #fbfaff 100%)' }}>
                <span className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[1.2px] text-[#6b3c72]">{hero.eyebrow}</span>
                <p className="font-['Jua',sans-serif] text-[18px] text-[#1a1a1a] leading-[24px] mt-2">{hero.line}</p>
              </div>
            )}

            {/* ── THE MODULAR BLOCK GRID (per tab) ── */}
            <div className="grid grid-cols-3 gap-3 items-start">
              {decks[deckKey].map((b) => (
                <DeepDiveBlock key={b.id} config={b} active={scope?.blockId === b.id} onAsk={askBlock} />
              ))}
              <AddChartTile active={scope?.blockId === 'new'} onAdd={addBlock} />
            </div>
          </div>
        ) : (
          // Digital Twin — intentionally excluded from the editable-blocks treatment.
          <div className="flex-1 flex items-center justify-center p-10">
            <div className="max-w-[420px] text-center flex flex-col items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#f1e9ff] text-[#6b3c72] flex items-center justify-center"><Lock className="w-5 h-5" /></div>
              <span className="font-['Jua',sans-serif] text-[16px] text-[#1a1a1a]">Editable blocks aren't used here</span>
              <p className="font-['Inter',sans-serif] text-[12.5px] leading-[1.6] text-[#6b6b6b]">
                The Digital Twin is a single synthesised persona view, not a deck of comparable metrics — so the modular chart blocks and “Add chart” flow are intentionally excluded from this tab.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Right: mock Ask Lumos panel (shared across tabs) ── */}
      <div className="flex-none w-[384px] h-full flex flex-col bg-[#fcfbfd] border-l border-[#e7e2ec]">
        <div className="flex-none flex items-center gap-[10px] px-[18px] py-4 bg-white border-b border-[#efeaf2]">
          <div className="w-[25px] h-[25px] rounded-[7px] bg-[#6b3c72] flex items-center justify-center text-white">
            <Sparkles className="w-[13px] h-[13px]" />
          </div>
          <span className="font-['Jua',sans-serif] text-[14.5px] text-[#1a1a1a]">Ask Lumos</span>
        </div>

        {empty ? (
          <div className="flex-1 flex flex-col px-[22px] pt-[30px]">
            <h2 className="font-['Jua',sans-serif] text-[21px] leading-[1.34] text-[#1f1d23]">
              What do you want to know about <span className="text-[#6b3c72]">this audience</span>?
            </h2>
            <p className="font-['Inter',sans-serif] text-[12.5px] leading-[1.55] text-[#6b6b6b] mt-[10px]">
              Click a chart's ✦ Ask to edit it, or “Add chart” to create one. Try “make this a donut”, “show percent”, “break it down by district”.
            </p>
          </div>
        ) : (
          <div ref={threadRef} className="flex-1 overflow-y-auto px-[18px] py-[18px] flex flex-col gap-[14px]">
            {messages.map((m, i) => m.role === 'you' ? (
              <div key={i} className="self-end max-w-[85%] bg-[#6b3c72] text-white rounded-[14px] rounded-br-[5px] px-[13px] py-[9px] font-['Inter',sans-serif] text-[12.5px] leading-[1.5]">{m.text}</div>
            ) : (
              <div key={i} className="self-start max-w-[92%]">
                <div className="flex items-center gap-[6px] mb-[5px]"><Sparkles className="w-[12px] h-[12px] text-[#6b3c72]" /><span className="font-['Jua',sans-serif] text-[11px] text-[#6b3c72]">Lumos</span></div>
                <div className="bg-white border border-[#ece8ef] rounded-[14px] rounded-tl-[5px] px-[13px] py-[10px] font-['Inter',sans-serif] text-[12.5px] leading-[1.55] text-[#322e38]">{m.text}</div>
              </div>
            ))}
          </div>
        )}

        {/* composer */}
        <div className="flex-none px-4 pt-[14px] pb-4 bg-white border-t border-[#efeaf2]">
          <div className="flex flex-col rounded-[16px] border-[1.5px] border-[#ddd0e4] bg-white overflow-hidden focus-within:border-[#6b3c72] transition-colors">
            {scope && (
              <div className="px-3 pt-3">
                <span className="inline-flex items-center gap-1.5 bg-[#6b3c72] text-white rounded-full pl-2.5 pr-1.5 py-1 font-['Jua',sans-serif] text-[11px]">
                  <Sparkles className="w-[11px] h-[11px]" />
                  {scope.label}
                  <button onClick={() => setScope(null)} className="w-[15px] h-[15px] rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center"><X className="w-[9px] h-[9px]" /></button>
                </span>
              </div>
            )}
            <textarea
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(draft); } }}
              rows={2}
              placeholder={scope ? `Ask about “${scope.label}”…` : 'Ask about this audience…'}
              className="resize-none bg-transparent outline-none px-4 pt-3 pb-2 font-['Inter',sans-serif] text-[14px] leading-[1.5] text-[#322e38] placeholder:text-[#ada6b5]"
            />
            <div className="flex items-center px-[10px] pb-[10px] pt-1">
              <span className="flex items-center gap-[5px] font-['Inter',sans-serif] text-[10.5px] text-[#9a9a9a]"><Sparkles className="w-[11px] h-[11px]" />{scope ? 'Editing this chart' : 'Uses the current tab & filters'}</span>
              <button onClick={() => submit(draft)} disabled={!draft.trim()} className={`ml-auto w-[34px] h-[34px] rounded-full flex items-center justify-center transition-colors ${draft.trim() ? 'bg-[#6b3c72] text-white' : 'bg-[#ece7ef] text-[#bcbcbc]'}`}>
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
