import { useState, useRef } from "react";
import AudienceProfileContent from "./AudienceProfileContent";
import AskLumosPanel, { type AskMsg } from "./AskLumosPanel";
import Screen2Mobility from "@/imports/Screen2Mobility-1";
import Screen3Temporal from "@/imports/Screen3Temporal";
import Screen4DigitalTwin from "@/imports/Screen4DigitalTwin";

interface AudienceProfileViewerProps {
  audienceId: string;
  audienceName?: string;
  onBack: () => void;
}

type DeepDiveTab = 'profile' | 'mobility' | 'temporal' | 'digital';

const TABS: { key: DeepDiveTab; label: string }[] = [
  { key: 'profile',  label: 'Audience Profile'   },
  { key: 'mobility', label: 'Mobility & Movement' },
  { key: 'temporal', label: 'Temporal & Seasonal' },
  { key: 'digital',  label: 'Digital Twin'        },
];

export default function AudienceProfileViewer(props: AudienceProfileViewerProps) {
  const [activeTab, setActiveTab] = useState<DeepDiveTab>('profile');
  // Ask Lumos docks open by default — interrogating the audience is the primary verb.
  const [askOpen, setAskOpen] = useState(true);
  // Thread + draft live here (not in the panel) so the conversation survives a collapse.
  const [askMessages, setAskMessages] = useState<AskMsg[]>([]);
  const [askDraft, setAskDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Short name for the panel's answer scope (strip the " — Singapore" suffix).
  const askName = (props.audienceName ?? 'Urban Upgrade Drivers').split(' — ')[0];

  const handleTabClick = (tab: DeepDiveTab) => {
    setActiveTab(tab);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  return (
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
      `}</style>

      {/* ── Persistent header: audience name + action buttons ── */}
      <div className="flex-none flex items-center justify-between gap-3 px-5 pt-4 pb-0 bg-[#fafaf8]">
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="font-['Jua',sans-serif] text-[18px] text-[#1a1a1a] leading-[27px] truncate">Urban Upgrade Drivers — Singapore</span>
          <span className="font-['Inter',sans-serif] text-[11px] text-[#9a9a9a] whitespace-nowrap shrink-0">· updated 2d ago</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Defined by */}
          <button className="flex items-center gap-[6px] bg-[#fafaf8] border border-[#e5e5e2] rounded-lg px-3 py-2 hover:bg-[#f3f3f1] transition-colors">
            <svg viewBox="0 0 13 13" width="13" height="13" fill="none">
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
          </div>
        </div>
      </div>

      {/* ── Tab bar — below audience definition, above date/geo filters ── */}
      <div className="flex-none px-5 pt-3 pb-0 bg-[#fafaf8]">
        <div className="flex items-center bg-white border border-[#e5e5e2] rounded-xl p-[5px] gap-1 h-[50px]">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleTabClick(key)}
              className={`flex-1 flex items-center justify-center px-3 py-2 rounded-[9px] font-['Jua',sans-serif] text-[13px] transition-colors whitespace-nowrap ${
                activeTab === key
                  ? 'bg-[#f1e9ff] text-[#6b3c72]'
                  : 'text-[#6b6b6b] hover:bg-[#f5f5f3]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scrollable content — KPI card hidden via CSS, starts with date/geo filters ── */}
      <div
        ref={scrollRef}
        className="kc-deep-dive flex-1 overflow-y-auto overflow-x-auto"
      >
        {activeTab === 'profile'  && <AudienceProfileContent />}
        {activeTab === 'mobility' && <Screen2Mobility />}
        {activeTab === 'temporal' && <Screen3Temporal />}
        {activeTab === 'digital'  && <Screen4DigitalTwin />}
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
        />
      )}
    </div>
  );
}
