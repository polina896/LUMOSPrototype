import Screen2Mobility from '@/imports/Screen2Mobility-1';
import { BlockDeck } from './DeepDiveBlock';
import type { BlockConfig } from './deepDiveBlocks';

// ── Mobility & Movement deep-dive tab ────────────────────────────────────────
// The interactive Singapore district map + density heatmap can't be reproduced as
// a chart-only block, so the existing Figma-export view is kept intact as a fixed
// anchor. Below it sits an editable block deck (seedMobilityBlocks) — the new
// "reshape / add a chart via Ask Lumos" layer. The map's own baked "Ask" pills
// still pin-to-chat (handled in AudienceProfileViewer); the deck uses real ✦ Ask.

type DeckHostProps = {
  blocks: BlockConfig[];
  scopeId: string | null;
  onAskBlock: (config: BlockConfig) => void;
  onAddBlock: () => void;
};

export default function MobilityDeepDive({ blocks, scopeId, onAskBlock, onAddBlock }: DeckHostProps) {
  return (
    <div className="flex flex-col gap-3.5">
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
