import { GlobalFilterBar } from './AudienceProfileContent';
import { BlockDeck } from './DeepDiveBlock';
import { MOBILITY_SECTIONS, MobilitySectionCard } from './MobilitySections';
import type { ModuleRef } from './ModuleAsk';
import type { BlockConfig } from './deepDiveBlocks';

// ── Mobility & Movement deep-dive tab ────────────────────────────────────────
// The map view used to be one Figma export (Screen2Mobility) whose sections
// couldn't be pinned individually. Rebuilt as native, individually-pinnable
// section cards (see MobilitySections.tsx) — each carries its own Ask pill + My
// View pin. Below them sits the editable block deck (seedMobilityBlocks).

type DeckHostProps = {
  blocks: BlockConfig[];
  scopeId: string | null;
  onAskBlock: (config: BlockConfig) => void;
  onAddBlock: () => void;
  // Audience name + pin handler so each section can pin itself into the docked
  // Ask Lumos chat, mirroring the Temporal density anchor.
  audience?: string;
  onAskGraph?: (ref: ModuleRef) => void;
};

export default function MobilityDeepDive({ blocks, scopeId, onAskBlock, onAddBlock, audience, onAskGraph }: DeckHostProps) {
  return (
    <div className="flex flex-col gap-3.5">
      <GlobalFilterBar />

      {/* Native section cards — each individually pinnable to My View. */}
      <div className="grid grid-cols-3 gap-3 items-start">
        {MOBILITY_SECTIONS.map((s) => (
          <div key={s.id} className={s.span === 3 ? 'col-span-3' : 'col-span-1'}>
            <MobilitySectionCard id={s.id} audience={audience} onAskGraph={onAskGraph} />
          </div>
        ))}
      </div>

      {/* Editable layer heading */}
      <div className="flex items-baseline gap-3 pt-1">
        <span className="font-['Jua',sans-serif] text-[15px] text-[#1a1a1a]">Build your own view</span>
        <span className="font-['Jua',sans-serif] text-[11px] text-[#9a9a9a]">
          Editable blocks — click a chart's ✦ Ask to reshape it, or add one.
        </span>
      </div>

      {/* Editable deck: presence / movement / catchment analysis. */}
      <BlockDeck blocks={blocks} scopeId={scopeId} onAsk={onAskBlock} onAdd={onAddBlock} />
    </div>
  );
}
