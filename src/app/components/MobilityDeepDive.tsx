import { GlobalFilterBar } from './AudienceProfileContent';
import { BlockDeck } from './DeepDiveBlock';
import MobilityMapHero from './mobility/MobilityMapHero';
import { MOBILITY_SECTIONS, MobilitySectionCard } from './MobilitySections';
import type { ModuleRef } from './ModuleAsk';
import type { BlockConfig } from './deepDiveBlocks';

// ── Mobility & Movement deep-dive tab ────────────────────────────────────────
// Map-first: a live Leaflet planning-area choropleth (MobilityMapHero) is the
// hero, carrying the signal/weekday toggles, hotspots and a where-they-are rail.
// Below it sit native, individually-pinnable supporting cards (MobilitySections)
// — Peak movement hours, catchment, competitor, frequency, reach — each with its
// own Ask pill + My View pin. Then the editable block deck (seedMobilityBlocks).

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

      {/* Map hero — the live choropleth, pinnable as its own My View module. */}
      <MobilityMapHero audience={audience} onAskGraph={onAskGraph} />

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
