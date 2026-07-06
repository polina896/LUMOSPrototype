import AudienceDensity from './AudienceDensity';
import { GlobalFilterBar } from './AudienceProfileContent';
import { BlockDeck } from './DeepDiveBlock';
import { BlockPinButton } from './MyView';
import type { BlockConfig } from './deepDiveBlocks';
import { AskPill, type ModuleRef } from './ModuleAsk';

// ── Temporal & Seasonal deep-dive tab ────────────────────────────────────────
// Now an editable block deck: the summary strip (hero) and the shared Audience
// Density hour × day heatmap are preserved as fixed anchors, and the seasonal /
// daypart analysis below becomes an editable deck of blocks (seedTemporalBlocks).

const AUD_ID = 'urban-upgrade-drivers';

// Stable id for the density anchor so it can be pinned to My View.
export const TEMPORAL_DENSITY_ID = 'tmp-density';

type DeckHostProps = {
  blocks: BlockConfig[];
  scopeId: string | null;
  onAskBlock: (config: BlockConfig) => void;
  onAddBlock: () => void;
  // Audience display name + pin handler so the fixed density anchor can pin
  // itself into the docked Ask Lumos panel, like the editable blocks can.
  audience?: string;
  onAskGraph?: (ref: ModuleRef) => void;
};

// ── Peak days & dayparts — the shared Audience Density hour × day heatmap. ──
// A fixed anchor (not a config-driven block). It carries two affordances: the
// "Ask Lumos" pill (pin into the docked chat) and the My View pin (add to the
// dashboard). Exported so My View can re-render it when pinned.
export function PeakDaysDaypartsCard({ audience = 'this audience', onAskGraph }: { audience?: string; onAskGraph?: (ref: ModuleRef) => void }) {
  return (
    <div className="rounded-[14px] border border-[#e5e5e2] bg-white px-5 py-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-col gap-0.5">
          <p className="font-['Jua',sans-serif] text-[15px] text-[#1a1a1a]">Peak days &amp; dayparts</p>
          <p className="font-['Jua',sans-serif] text-[11px] text-[#9a9a9a]">Hour × day · indexed density · ★ = best time to reach</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <AskPill
            id={`aud:${AUD_ID}:temporal:density`}
            label="Peak days & dayparts"
            audience={audience}
            state={['Residential']}
            onAsk={onAskGraph}
          />
          <BlockPinButton id={TEMPORAL_DENSITY_ID} />
        </div>
      </div>
      <AudienceDensity audienceId={AUD_ID} mode="Residential" variant="expanded" earlyRiser hideTitle />
    </div>
  );
}

// ── Summary strip (hero) ──────────────────────────────────────────────────────
function SummaryStrip() {
  const stats = [
    { label: 'Peak window', value: 'Sat 6–9am' },
    { label: 'Peak index', value: '2.3×' },
    { label: 'Weekly reach YoY', value: '418k', badge: '▲ +14%' },
    { label: 'Marathon lift', value: '+58%' },
  ];
  return (
    <div className="rounded-[14px] border border-[#e7dff0] bg-gradient-to-b from-[#f6f0fb] to-[#fbf8fe] px-5 py-4">
      <div className="flex flex-wrap gap-x-10 gap-y-3">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="flex items-baseline gap-1.5">
              <span className="font-['Jua',sans-serif] text-[24px] text-[#6b3c72] leading-none">{s.value}</span>
              {s.badge && <span className="font-['Jua',sans-serif] text-[11px] text-[#2f7d4f] bg-[#e7f3ec] px-[6px] py-[2px] rounded-full">{s.badge}</span>}
            </div>
            <p className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.06em] text-[#9a9a9a] mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-5 mt-3.5 pt-3 border-t border-[#eadff2]">
        <button className="flex items-center gap-1.5 font-['Jua',sans-serif] text-[12px] text-[#6b3c72] hover:opacity-70 transition-opacity">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
          Regenerate
        </button>
        <button className="flex items-center gap-1.5 font-['Jua',sans-serif] text-[12px] text-[#6b3c72] hover:opacity-70 transition-opacity">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          Ask a follow-up
        </button>
      </div>
    </div>
  );
}

// ── Tab ───────────────────────────────────────────────────────────────────────
export default function TemporalDeepDive({ blocks, scopeId, onAskBlock, onAddBlock, audience = 'this audience', onAskGraph }: DeckHostProps) {
  return (
    <div className="flex flex-col gap-3.5">
      <GlobalFilterBar />
      <SummaryStrip />

      {/* Fixed anchor: the shared Audience Density hour × day heatmap. */}
      <PeakDaysDaypartsCard audience={audience} onAskGraph={onAskGraph} />

      {/* Editable deck: seasonal / daypart analysis. */}
      <BlockDeck blocks={blocks} scopeId={scopeId} onAsk={onAskBlock} onAdd={onAddBlock} />
    </div>
  );
}
