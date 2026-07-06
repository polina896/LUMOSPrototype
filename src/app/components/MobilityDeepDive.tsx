import Screen2Mobility from '@/imports/Screen2Mobility-1';
import { BlockDeck } from './DeepDiveBlock';
import { BlockPinButton } from './MyView';
import type { BlockConfig } from './deepDiveBlocks';

// ── Mobility & Movement deep-dive tab ────────────────────────────────────────
// The interactive Singapore district map + density heatmap can't be reproduced as
// a chart-only block, so the existing Figma-export view is kept intact as a fixed
// anchor. Below it sits an editable block deck (seedMobilityBlocks) — the new
// "reshape / add a chart via Ask Lumos" layer. The map's own baked "Ask" pills
// still pin-to-chat (handled in AudienceProfileViewer); the deck uses real ✦ Ask.

// Stable id for the Mobility map/overview anchor so it can be pinned to My View.
// "Where they live / transact / catchment / competitor / frequency" are one Figma
// export (not separable blocks), so they pin together as one overview module.
export const MOBILITY_OVERVIEW_ID = 'mob-overview';

// A thin header row carrying the pin for the map overview — shown above the map
// in the tab, and reused as the card header when re-rendered in My View.
function MobilityOverviewHeader() {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-col gap-0.5">
        <span className="font-['Jua',sans-serif] text-[15px] text-[#1a1a1a]">Where they live &amp; move</span>
        <span className="font-['Jua',sans-serif] text-[11px] text-[#9a9a9a]">Map · catchment · transaction &amp; competitor visitation</span>
      </div>
      <BlockPinButton id={MOBILITY_OVERVIEW_ID} />
    </div>
  );
}

// The whole Mobility map overview as a self-contained, pinnable card — used by
// My View when MOBILITY_OVERVIEW_ID is pinned.
export function MobilityOverviewCard() {
  return (
    <div className="rounded-[14px] border border-[#e5e5e2] bg-white px-5 py-4 flex flex-col gap-3">
      <MobilityOverviewHeader />
      <Screen2Mobility />
    </div>
  );
}

type DeckHostProps = {
  blocks: BlockConfig[];
  scopeId: string | null;
  onAskBlock: (config: BlockConfig) => void;
  onAddBlock: () => void;
};

export default function MobilityDeepDive({ blocks, scopeId, onAskBlock, onAddBlock }: DeckHostProps) {
  return (
    <div className="flex flex-col gap-3.5">
      {/* Pin affordance for the whole map overview (it's one Figma export). */}
      <MobilityOverviewHeader />
      {/* Fixed anchor: the interactive Singapore map + heatmap (Figma export). */}
      <Screen2Mobility />

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
