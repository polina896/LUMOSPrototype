import { useEffect, useRef, useState } from 'react';

// ── The audience universe ─────────────────────────────────────────────────────
// What sits where the map will be, before there is a map. Every household in
// the market as a point of light; Lumos sweeping through them; three clusters
// resolving out of the noise as the analysis narrows. It is a waiting state, so
// it earns its keep by showing the scale of what is being searched.

const STEPS = [
  { t: 'Reading the brief', s: 'Costco · Western Sydney · media planning' },
  { t: 'Scanning the universe', s: '4,218,640 Greater Sydney households' },
  { t: 'Twelve months of location signal', s: 'movement, dwell and visit frequency' },
  { t: 'Matching transaction patterns', s: 'basket size, category, repeat rate' },
  { t: 'Clustering on behaviour', s: 'how they shop, not who they are' },
  { t: 'Three audiences are taking shape', s: 'resolving catchments and index' },
];

// where the three clusters bloom, in fractions of the canvas
const CLUSTERS = [
  { x: 0.38, y: 0.42, c: [168, 116, 196] },
  { x: 0.58, y: 0.58, c: [110, 200, 160] },
  { x: 0.70, y: 0.34, c: [224, 168, 104] },
];

export default function AudienceUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState(0);
  const [scanned, setScanned] = useState(0);

  // the copy advances on its own — the analysis takes about as long
  useEffect(() => {
    const t = window.setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 2600);
    return () => window.clearInterval(t);
  }, []);

  // a counter that climbs toward the universe size, easing as it goes.
  // on an interval rather than rAF, so it keeps counting in a background tab.
  useEffect(() => {
    const total = 4218640, span = 14000, start = Date.now();
    const t = window.setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / span);
      setScanned(Math.floor(total * (1 - Math.pow(1 - p, 3))));
      if (p >= 1) window.clearInterval(t);
    }, 60);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let raf = 0, t0 = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0, h = 0;

    const size = () => {
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(cv);

    const GAP = 13;                       // the halftone pitch, as on the site
    const draw = (ts: number) => {
      if (!t0) t0 = ts;
      const el = (ts - t0) / 1000;
      // the sweep runs top-left to bottom-right and repeats
      const sweep = ((el * 0.34) % 1.5) - 0.25;

      ctx.clearRect(0, 0, w, h);
      for (let x = GAP / 2; x < w; x += GAP) {
        for (let y = GAP / 2; y < h; y += GAP) {
          const nx = x / w, ny = y / h;

          // base field: a quiet dot per household
          let a = 0.13, r = 1.0, col = [214, 190, 236];

          // clusters bloom in sequence as the analysis narrows
          for (let i = 0; i < CLUSTERS.length; i++) {
            const cl = CLUSTERS[i];
            const d = Math.hypot(nx - cl.x, (ny - cl.y) * (h / w) * 1.6);
            const born = Math.max(0, Math.min(1, (el - (4 + i * 2.2)) / 2.6));
            const near = Math.max(0, 1 - d / 0.19);
            if (near > 0 && born > 0) {
              const k = Math.pow(near, 1.5) * born;
              a = Math.max(a, 0.13 + k * 0.72);
              r = Math.max(r, 1.0 + k * 1.9);
              if (k > 0.12) col = cl.c;
            }
          }

          // the sweep lifts whatever it passes over
          const band = Math.abs((nx * 0.6 + ny * 0.4) - sweep);
          if (band < 0.075) {
            const k = 1 - band / 0.075;
            a = Math.min(0.95, a + k * 0.5);
            r += k * 0.7;
          }

          ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${a})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  const pct = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#2E0A47]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* a soft vignette, so the copy always has something to sit on */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,rgba(46,10,71,0.92)_18%,rgba(46,10,71,0)_62%)]" />

      <div className="absolute inset-x-0 bottom-0 p-8">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C9A6F0] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C9A6F0]" />
          </span>
          <span className="font-['Geist',sans-serif] text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#C9A6F0]">
            Searching the audience universe
          </span>
        </div>

        <h2 className="font-['Geist',sans-serif] text-[26px] font-bold leading-tight text-white" style={{ letterSpacing: '-0.02em' }}>
          {STEPS[step].t}
        </h2>
        <p className="mt-1.5 font-['Nunito_Sans',sans-serif] text-[13.5px] text-[#CDB6E6]">{STEPS[step].s}</p>

        <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-[#C9A6F0] transition-[width] duration-700 ease-out" style={{ width: `${pct}%` }} />
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-['Geist',sans-serif] text-[15px] font-bold tabular-nums text-white">
            {scanned.toLocaleString('en-AU')}
          </span>
          <span className="font-['Nunito_Sans',sans-serif] text-[11.5px] text-[#A78CC4]">households read so far</span>
        </div>
      </div>
    </div>
  );
}
