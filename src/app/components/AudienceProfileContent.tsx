import { RotateCcw, MessageSquare } from 'lucide-react';
import { BlockDeck } from './DeepDiveBlock';
import ProfileMapHero, { ProfileAreaDossier } from './profile/ProfileMapHero';
import type { ModuleRef } from './ModuleAsk';
import type { BlockConfig } from './deepDiveBlocks';

// ── Audience Profile tab ──────────────────────────────────────────────────────
// Preserves the per-tab filter bar and the "Takeaway · who they are" hero
// unchanged, then renders the analysis area as an editable block deck (the seven
// former hand-built sections now live as BlockConfigs — see deepDiveBlocks.ts).
// The deck + the active Ask scope are owned by AudienceProfileViewer.

// ── Filter bar ──────────────────────────────────────────────────────────────

function FilterPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-[6px] bg-white border border-[#e5e5e2] rounded-[10px] px-[10px] py-[6px] cursor-pointer hover:border-[#c8b8d4] transition-colors">
      <span className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.54px] text-[#9a9a9a] font-normal">{label}</span>
      <span className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] font-normal">{value}</span>
      <svg width="10" height="10" viewBox="0 0 13 13" fill="none"><path d="M3.25 4.875L6.5 8.125L9.75 4.875" stroke="#9A9A9A" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
}

export function GlobalFilterBar() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <FilterPill label="Date" value="Jan–Mar 2026" />
      <FilterPill label="Geography" value="Singapore" />
      <FilterPill label="Indexed vs" value="National average" />
      <FilterPill label="Compare" value="vs previous quarter" />
      <div className="ml-auto flex items-center gap-px border border-[#e5e5e2] rounded-[8px] overflow-hidden bg-white">
        {['Index', '%', 'Count'].map((t) => (
          <button key={t} className={`font-['Jua',sans-serif] text-[11px] px-3 py-1.5 transition-colors ${t === 'Index' ? 'bg-[#f1e9ff] text-[#6b3c72]' : 'text-[#6b6b6b] hover:bg-[#f5f5f3]'}`}>{t}</button>
        ))}
      </div>
    </div>
  );
}

// ── AI Takeaway hero ────────────────────────────────────────────────────────

function TakeawayHero() {
  return (
    <div className="rounded-[14px] border border-[#bebde7] relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f7f1ff 0%, #fbfaff 100%)' }}>
      <div className="p-5 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.75L8.16667 4.66667L11.0833 5.83333L8.16667 7L7 9.91667L5.83333 7L2.91667 5.83333L5.83333 4.66667L7 1.75Z" stroke="#6B3C72" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[1.2px] text-[#6b3c72] font-normal">Takeaway · who they are</span>
          </div>
          <span className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.4px] text-[#9a9a9a] font-normal">Updated for Jan–Mar 2026</span>
        </div>

        {/* Headline */}
        <p className="font-['Jua',sans-serif] text-[20px] text-[#1a1a1a] leading-[26px] font-normal">
          Affluent mid-career professionals who over-index across premium automotive, financial services and aspirational lifestyle brands.
        </p>

        {/* Body copy */}
        <p className="font-['Jua',sans-serif] text-[13px] text-[#6b6b6b] leading-[20.8px] font-normal">
          Urban Upgrade Drivers over-index highest on{' '}
          <span className="text-[#1a1a1a]">premium vehicle brands (2.1×)</span> and{' '}
          <span className="text-[#1a1a1a]">financial services (1.8×)</span>, with an average household income of{' '}
          <span className="text-[#1a1a1a]">$148k</span> and 72% of spend in-person. They skew{' '}
          <span className="text-[#1a1a1a]">professional (1.6×)</span> and slightly male (58%), and concentrate in the{' '}
          <span className="text-[#1a1a1a]">$120–200k</span> household band. Their strongest brand affinities are{' '}
          <span className="text-[#1a1a1a]">CarousellAuto (2.4×)</span>,{' '}
          <span className="text-[#1a1a1a]">BMW (2.0×)</span> and{' '}
          <span className="text-[#1a1a1a]">Mercedes-Benz (1.9×)</span>.
        </p>

        {/* Dashed divider + stats row */}
        <div className="border-t border-dashed border-[#bebde7] pt-4">
          <div className="flex items-start justify-between gap-4">
            {[
              { value: '387k', label: 'People' },
              { value: '2.1×', label: 'Index vs national' },
              { value: '$148k', label: 'Avg HHI' },
              { value: '2.4×', label: 'Auto interest' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="font-['Jua',sans-serif] text-[18px] text-[#6b3c72] leading-[27px] font-normal">{s.value}</span>
                <span className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.5px] text-[#9a9a9a] font-normal">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action row */}
        <div className="flex items-center gap-4 pt-0.5">
          <button className="flex items-center gap-1.5 text-[#6b3c72] hover:opacity-70 transition-opacity">
            <RotateCcw className="w-[13px] h-[13px]" />
            <span className="font-['Jua',sans-serif] text-[11px] font-normal">Regenerate</span>
          </button>
          <button className="flex items-center gap-1.5 text-[#6b3c72] hover:opacity-70 transition-opacity">
            <MessageSquare className="w-[13px] h-[13px]" />
            <span className="font-['Jua',sans-serif] text-[11px] font-normal">Ask a follow-up</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Root export ─────────────────────────────────────────────────────────────

export default function AudienceProfileContent({
  blocks,
  scopeId,
  onAskBlock,
  onAddBlock,
  audience,
  onAskGraph,
}: {
  blocks: BlockConfig[];
  scopeId: string | null;
  onAskBlock: (config: BlockConfig) => void;
  onAddBlock: () => void;
  audience?: string;
  onAskGraph?: (ref: ModuleRef) => void;
}) {
  return (
    <div className="flex flex-col gap-[14px]">
      <GlobalFilterBar />
      <TakeawayHero />
      {/* Companion map — colours by who lives there; income & lifestage rows two-way link to it. */}
      <ProfileMapHero audience={audience} onAskGraph={onAskGraph} />
      <ProfileAreaDossier audience={audience} onAskGraph={onAskGraph} />
      <BlockDeck blocks={blocks} scopeId={scopeId} onAsk={onAskBlock} onAdd={onAddBlock} />
    </div>
  );
}
