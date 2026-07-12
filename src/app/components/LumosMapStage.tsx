import { useEffect, useRef } from 'react';
import type { AudienceId } from '../audienceData';

// ── LumosMap stage ────────────────────────────────────────────────────────────
// Thin React wrapper around the vanilla LumosMap module (public/lumos-map.js,
// loaded as a global in index.html after Leaflet). Mounts once, reveals via
// open(), and keeps the map's selected segment in sync with the app's selected
// audience — both directions:
//   • click a region/segment on the map → onSelectAudience(audienceId)
//   • open an audience elsewhere        → lm.select(segment) flies the map there

// The module ships its own demo segments keyed sedan/ev/suv, whose counts &
// indices already match the three launch audiences — so we only need an id map.
const AUD_TO_SEG: Record<AudienceId, string> = {
  'premium-sedan-intenders': 'sedan',
  'ev-upgrade-shoppers': 'ev',
  'family-suv-upgraders': 'suv',
};
const SEG_TO_AUD: Record<string, AudienceId> = {
  sedan: 'premium-sedan-intenders',
  ev: 'ev-upgrade-shoppers',
  suv: 'family-suv-upgraders',
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
  destroy: () => void;
  readonly mode: string;
}

export default function LumosMapStage({
  selectedAudienceId,
  onSelectAudience,
}: {
  selectedAudienceId: AudienceId | null;
  onSelectAudience: (id: AudienceId | null) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const lmRef = useRef<LumosMapInstance | null>(null);
  // keep the latest callback without re-mounting the map
  const onSelectRef = useRef(onSelectAudience);
  onSelectRef.current = onSelectAudience;

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

  return <div ref={hostRef} className="w-full h-full" />;
}
