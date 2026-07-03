import type { GeoModeKey } from './AudienceDetailPanel';

// ── Audience Density — Hour × Day heatmap ─────────────────────────────────────
// One surface for "when they're dense" + "best time to reach". The peak cell (★)
// is the single best day+hour to reach the audience. Mode is owned by the parent
// (Residential / Daytime / Transaction) and passed in — this component only draws.

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
const HOURS: number[] = [];
for (let h = 6; h <= 23; h++) HOURS.push(h);

// purple density scale — mirrors the wireframe + legend order
const SCALE = ['#F4EEFA', '#E4D8EE', '#C9B6DC', '#9D6BA6', '#6B3C72'];

const gauss = (x: number, mu: number, sd: number) => Math.exp(-((x - mu) ** 2) / (2 * sd * sd));
const fmtHour = (h: number) => String(h).padStart(2, '0') + ':00';
const fmtClock = (h: number) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? 'am' : 'pm'}`;

// mode → time-of-day shape (weekday, weekend). earlyRiser shifts the morning
// peak to dawn (fitness / marathon audiences active before work & at weekends).
function hourWeight(mode: GeoModeKey, h: number, weekend: boolean, earlyRiser = false): number {
  if (earlyRiser && mode === 'Residential') {
    // Flatter distribution so the Sat-morning peak indexes ~2.3× (not a spike),
    // weekday mornings read moderate, midday/late stay low.
    return weekend
      ? gauss(h, 7, 2.1) * 0.85 + gauss(h, 18.5, 2.4) * 0.30 + 0.42
      : gauss(h, 7, 1.9) * 0.48 + gauss(h, 19, 2.1) * 0.34 + 0.42;
  }
  switch (mode) {
    case 'Daytime': // out at work / on the move during office hours
      return weekend
        ? gauss(h, 13, 3.0) * 1.0 + gauss(h, 19, 2.2) * 0.4 + 0.12
        : gauss(h, 10.5, 2.6) * 0.9 + gauss(h, 13, 1.4) * 0.6 + 0.10;
    case 'Transaction': // spend / showroom windows — evenings & weekend afternoons
      return weekend
        ? gauss(h, 14.5, 2.6) * 1.0 + gauss(h, 11, 1.8) * 0.5 + 0.12
        : gauss(h, 19.5, 2.0) * 1.0 + gauss(h, 12.5, 1.4) * 0.4 + 0.10;
    case 'Residential': // at home — commute mornings + home evenings
    default:
      return weekend
        ? gauss(h, 9.5, 2.4) * 1.0 + gauss(h, 20, 2.2) * 0.5 + 0.12
        : gauss(h, 7.8, 1.5) * 1.0 + gauss(h, 20, 1.8) * 0.7 + 0.10;
  }
}

// per-audience personality — which days lean hot
const AUD_DAY_FACTOR: Record<string, Record<string, number>> = {
  'ev-upgrade-shoppers':     { Mon: 0.95, Tue: 0.98, Wed: 1.0, Thu: 1.0, Fri: 0.9,  Sat: 1.18, Sun: 1.05 },
  'premium-sedan-intenders': { Mon: 1.0,  Tue: 1.02, Wed: 1.03, Thu: 1.05, Fri: 1.1, Sat: 0.95, Sun: 0.85 },
  'family-suv-upgraders':    { Mon: 0.9,  Tue: 0.92, Wed: 0.95, Thu: 0.95, Fri: 1.0, Sat: 1.25, Sun: 1.12 },
  'urban-upgrade-drivers':   { Mon: 0.85, Tue: 0.88, Wed: 0.9, Thu: 0.9,  Fri: 0.95, Sat: 1.32, Sun: 1.16 },
};
const DEFAULT_DAY_FACTOR = { Mon: 1, Tue: 1, Wed: 1, Thu: 1, Fri: 1, Sat: 1.05, Sun: 0.95 };

type Cell = { r: number; c: number; v: number };
type Matrix = { idx: number[][]; peak: Cell; second: Cell };

function buildMatrix(audienceId: string, mode: GeoModeKey, earlyRiser: boolean): Matrix {
  const dayFactor = AUD_DAY_FACTOR[audienceId] ?? DEFAULT_DAY_FACTOR;
  const raw = HOURS.map((h) =>
    DAYS.map((d) => hourWeight(mode, h, d === 'Sat' || d === 'Sun', earlyRiser) * (dayFactor[d] ?? 1)),
  );
  const flat = raw.flat();
  const mean = flat.reduce((a, b) => a + b, 0) / flat.length;
  const idx = raw.map((row) => row.map((v) => v / mean));

  const ranked: Cell[] = [];
  idx.forEach((row, r) => row.forEach((v, c) => ranked.push({ r, c, v })));
  ranked.sort((a, b) => b.v - a.v);
  const peak = ranked[0];
  const second = ranked.find((x) => x.c !== peak.c || Math.abs(x.r - peak.r) > 2) ?? ranked[1];
  return { idx, peak, second };
}

function bucket(v: number): string {
  if (v < 0.55) return SCALE[0];
  if (v < 0.90) return SCALE[1];
  if (v < 1.35) return SCALE[2];
  if (v < 1.90) return SCALE[3];
  return SCALE[4];
}

const Star = ({ cls }: { cls: string }) => (
  <svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" /></svg>
);

export default function AudienceDensity({
  audienceId, mode, variant = 'panel', earlyRiser = false, hideTitle = false,
}: {
  audienceId: string;
  mode: GeoModeKey;
  variant?: 'panel' | 'expanded';
  earlyRiser?: boolean;
  hideTitle?: boolean;
}) {
  const { idx, peak, second } = buildMatrix(audienceId, mode, earlyRiser);
  const big = variant === 'expanded';

  const cellH = big ? 52 : 40;
  const chipCls = big ? 'min-w-[30px] h-[24px] text-[12px] px-[6px]' : 'min-w-[24px] h-[19px] text-[10px] px-[4px]';
  const starCls = big ? 'w-[10px] h-[10px]' : 'w-[8px] h-[8px]';
  const scrollH = big ? 360 : 250;
  const hourColW = big ? 74 : 52;
  const dayFont = big ? 'text-[12.5px]' : 'text-[10.5px]';
  const hourFont = big ? 'text-[12.5px]' : 'text-[10.5px]';

  const pDay = DAYS[peak.c], pHour = HOURS[peak.r];
  const peakLabel = `${pDay} ${fmtClock(pHour)}`;

  return (
    <div>
      {/* header — title + legend */}
      <div className={`flex items-start gap-3 mb-2 flex-wrap ${hideTitle ? 'justify-end' : 'justify-between'}`}>
        {!hideTitle && (
          <div>
            <p className="font-['Jua',sans-serif] text-[13px] text-[#1a1a1a]">Audience density</p>
            <p className="font-['Jua',sans-serif] text-[10.5px] text-[#9a9a9a]">By hour &amp; day · indexed (1.0 = average)</p>
          </div>
        )}
        <div className="flex items-center gap-1.5 pt-0.5">
          <span className="font-['Jua',sans-serif] text-[9.5px] text-[#9a9a9a]">Low</span>
          {SCALE.map((c) => (
            <span key={c} className="w-[18px] h-[9px] rounded-[5px]" style={{ background: c }} />
          ))}
          <span className="font-['Jua',sans-serif] text-[9.5px] text-[#9a9a9a]">High</span>
        </div>
      </div>

      {/* grid */}
      <div className="border border-[#e5e5e2] rounded-[10px] overflow-hidden">
        <div className="overflow-y-auto" style={{ maxHeight: scrollH }}>
          <table className="w-full border-separate border-spacing-0 table-fixed">
            <thead>
              <tr>
                <th
                  className={`sticky top-0 left-0 z-[4] bg-[#faf8fc] text-left pl-3 py-2 font-['Jua',sans-serif] ${dayFont} text-[#6b6b6b] font-normal border-b border-[#e5e5e2]`}
                  style={{ width: hourColW }}
                >
                  Hour
                </th>
                {DAYS.map((d) => (
                  <th key={d} className={`sticky top-0 z-[3] bg-[#faf8fc] text-center py-2 font-['Jua',sans-serif] ${dayFont} text-[#6b6b6b] font-normal border-b border-[#e5e5e2]`}>
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOURS.map((h, r) => (
                <tr key={h}>
                  <td
                    className={`sticky left-0 z-[2] bg-white pl-3 font-['Jua',sans-serif] ${hourFont} text-[#1a1a1a] border-r border-[#e5e5e2] border-b border-[#f0eef2]`}
                    style={{ width: hourColW }}
                  >
                    {fmtHour(h)}
                  </td>
                  {DAYS.map((d, c) => {
                    const v = idx[r][c];
                    const isPeak = r === peak.r && c === peak.c;
                    return (
                      <td key={d} className="border-b border-[#f0eef2]" style={{ height: cellH }}>
                        <div className="relative h-full p-[5px]">
                          <div className="absolute inset-[5px] rounded-[8px]" style={{ background: bucket(v) }} />
                          <div
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-[2px] rounded-[7px] font-['Jua',sans-serif] ${chipCls} ${
                              isPeak
                                ? 'bg-[#6b3c72] text-white shadow-[0_2px_6px_rgba(107,60,114,0.4)]'
                                : 'bg-white text-[#1a1a1a] border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.08)]'
                            }`}
                            title={`${d} ${fmtHour(h)} · ${v.toFixed(1)}× density`}
                          >
                            {isPeak && <Star cls={starCls} />}
                            {v.toFixed(1)}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* takeaway */}
      <div className="flex gap-2 items-start bg-[#f1e9ff] rounded-[10px] px-3 py-2 mt-2.5">
        <svg className="w-[13px] h-[13px] text-[#6b3c72] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" /><circle cx="12" cy="10" r="2" />
        </svg>
        <p className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] leading-[1.5]">
          Density peaks{' '}
          <strong className="text-[#6b3c72]">{pDay} {fmtClock(pHour)}–{fmtClock(pHour + 2)} ({peak.v.toFixed(1)}×)</strong>
          {' '}— the best window to reach them — with{' '}
          <strong className="text-[#6b3c72]">{DAYS[second.c]} {fmtClock(HOURS[second.r])}</strong> next.
        </p>
      </div>
      {big && (
        <p className="font-['Jua',sans-serif] text-[10.5px] text-[#9a9a9a] mt-2">
          ★ = peak window ({peakLabel}) · density blends home presence, dwell time &amp; app activity.
        </p>
      )}
    </div>
  );
}
