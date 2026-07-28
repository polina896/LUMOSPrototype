import { useEffect, useRef } from 'react';
import type { AudienceId } from '../audienceData';

// ── LumosMap stage ────────────────────────────────────────────────────────────
// Thin React wrapper around the vanilla LumosMap module (public/lumos-map.js,
// loaded as a global in index.html after Leaflet). Mounts once, reveals via
// open(), and keeps the map's selected segment in sync with the app's selected
// audience — both directions:
//   • click a region/segment on the map → onSelectAudience(audienceId)
//   • open an audience elsewhere        → lm.select(segment) flies the map there

// The module ships its own demo segments keyed stockup/value/bulk, whose counts
// & indices already match the three launch clusters — so we only need an id map.
const AUD_TO_SEG: Record<AudienceId, string> = {
  'marsden-park-stockups': 'stockup',
  'parramatta-value-families': 'value',
  'castle-hill-bulk-buyers': 'bulk',
};
const SEG_TO_AUD: Record<string, AudienceId> = {
  stockup: 'marsden-park-stockups',
  value: 'parramatta-value-families',
  bulk: 'castle-hill-bulk-buyers',
};

declare global {
  interface Window {
    LumosMap?: {
      mount: (el: HTMLElement | string, opts?: Record<string, unknown>) => LumosMapInstance;
    };
  }
}
interface LumosMapInstance {
  open: () => void;
  select: (id: string) => void;
  showAll: () => void;
  setLayerOn: (key: string, on: boolean) => void;
  clearFocus: () => void;
  destroy: () => void;
  readonly mode: string;
}

// What the map hands back when a catchment is clicked — the chat turns this
// into a plain-language summary rather than dumping the numbers on screen.
export interface RegionPick {
  name: string;
  store?: string | null;
  trips?: { name: string; pct: number }[];
  index: number;
  households: number;
  share: number;
  rank: number;
  of: number;
  segment: string;
  corridors: { name: string; pct: number }[];
}

export default function LumosMapStage({
  selectedAudienceId,
  onSelectAudience,
  onPickRegion,
  layerRequest,
}: {
  selectedAudienceId: AudienceId | null;
  onSelectAudience: (id: AudienceId | null) => void;
  onPickRegion?: (pick: RegionPick & { audienceId: AudienceId | null }) => void;
  // a chat follow-up asking the map to bring a layer up: {key, n} — n forces a re-run
  layerRequest?: { key: string; n: number } | null;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const lmRef = useRef<LumosMapInstance | null>(null);
  // keep the latest callbacks without re-mounting the map
  const onSelectRef = useRef(onSelectAudience);
  onSelectRef.current = onSelectAudience;
  const onPickRef = useRef(onPickRegion);
  onPickRef.current = onPickRegion;

  // Mount once. The map reveals + fits Greater Sydney on open().
  useEffect(() => {
    const el = hostRef.current;
    if (!el || !window.LumosMap) return;
    const lm = window.LumosMap.mount(el, {
      onSelect: (segId: string) => {
        const aud = SEG_TO_AUD[segId];
        if (aud) onSelectRef.current(aud);
      },
      onShowAll: () => onSelectRef.current(null),
      onRegion: (pick: RegionPick) => {
        onPickRef.current?.({ ...pick, audienceId: SEG_TO_AUD[pick.segment] ?? null });
      },
    });
    lmRef.current = lm;
    lm.open();
    return () => {
      try { lm.destroy(); } catch { /* noop */ }
      lmRef.current = null;
    };
  }, []);

  // Reflect the app's selected audience into the map (guarded to avoid re-flying
  // when the change originated from a map click).
  useEffect(() => {
    const lm = lmRef.current;
    if (!lm) return;
    const seg = selectedAudienceId ? AUD_TO_SEG[selectedAudienceId] : null;
    if (seg) {
      if (lm.mode !== seg) lm.select(seg);
    } else if (lm.mode !== 'all') {
      lm.showAll();
    }
  }, [selectedAudienceId]);

  // A chat follow-up ("which billboards reach them?") brings a layer up on the map.
  useEffect(() => {
    if (!layerRequest) return;
    try { lmRef.current?.setLayerOn(layerRequest.key, true); } catch { /* noop */ }
  }, [layerRequest?.n]);

  return <div ref={hostRef} className="w-full h-full" />;
}
