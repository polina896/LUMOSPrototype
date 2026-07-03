import AudienceDensity from './AudienceDensity';

// ── Temporal & Seasonal deep-dive tab ────────────────────────────────────────
// Replaces the Figma-generated Screen3Temporal. Keeps the seasonal trend, and
// renders "best time to reach" as the shared Audience Density hour × day heatmap
// (same component as the audience side panel) so the read is consistent across
// surfaces. Hardcoded to the Urban Upgrade Drivers audience this viewer shows.

const AUD_ID = 'urban-upgrade-drivers';

// ── Summary strip ────────────────────────────────────────────────────────────
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

// ── Card chrome — title + the Figma "Ask / expand / download" pill cluster ─────
function CardHead({ title, tag }: { title: string; tag?: string }) {
  return (
    <div className="flex items-start justify-between gap-3 mb-3">
      <div className="flex items-center gap-2">
        <p className="font-['Jua',sans-serif] text-[15px] text-[#1a1a1a]">{title}</p>
        {tag && <span className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.08em] text-[#6b3c72] bg-[#f1e9ff] px-1.5 py-0.5 rounded-[5px]">{tag}</span>}
      </div>
      <div className="flex items-center gap-1.5">
        <button className="flex items-center gap-1 font-['Jua',sans-serif] text-[11px] text-[#6b3c72] bg-[#f1e9ff] rounded-full px-2 py-1 hover:bg-[#e7dbf6] transition-colors">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          Ask
        </button>
        <button className="w-[26px] h-[26px] flex items-center justify-center border border-[#e5e5e2] rounded-lg text-[#6b6b6b] hover:bg-gray-50 transition-colors" title="Expand">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 14v6h6M20 10V4h-6M14 10l6-6M10 14l-6 6" /></svg>
        </button>
        <button className="w-[26px] h-[26px] flex items-center justify-center border border-[#e5e5e2] rounded-lg text-[#6b6b6b] hover:bg-gray-50 transition-colors" title="Download">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v12M8 11l4 4 4-4M4 21h16" /></svg>
        </button>
      </div>
    </div>
  );
}

// ── Volume over time — seasonal trend with YoY compare ────────────────────────
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const THIS_YEAR = [58, 62, 71, 88, 96, 78, 70, 74, 82, 90, 84, 72];
const LAST_YEAR = [52, 55, 60, 66, 70, 64, 61, 63, 68, 72, 70, 61];

function VolumeTrend() {
  const W = 720, H = 150, PAD = 8;
  const max = Math.max(...THIS_YEAR, ...LAST_YEAR) * 1.1;
  const x = (i: number) => PAD + (i / (MONTHS.length - 1)) * (W - PAD * 2);
  const y = (v: number) => H - PAD - (v / max) * (H - PAD * 2 - 18);
  const line = (arr: number[]) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${line(THIS_YEAR)} L${x(MONTHS.length - 1).toFixed(1)},${H - PAD} L${x(0).toFixed(1)},${H - PAD} Z`;
  const peakI = THIS_YEAR.indexOf(Math.max(...THIS_YEAR));

  return (
    <div className="rounded-[14px] border border-[#e5e5e2] bg-white px-5 py-4">
      <CardHead title="Volume over time" tag="YoY" />
      <p className="font-['Jua',sans-serif] text-[11px] text-[#9a9a9a] -mt-2 mb-2">Weekly active reach · indexed · this year vs last</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <defs>
          <linearGradient id="volFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b3c72" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#6b3c72" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#volFill)" />
        <path d={line(LAST_YEAR)} fill="none" stroke="#cdbfdb" strokeWidth="2" strokeDasharray="4 4" />
        <path d={line(THIS_YEAR)} fill="none" stroke="#6b3c72" strokeWidth="2.5" />
        <circle cx={x(peakI)} cy={y(THIS_YEAR[peakI])} r="4" fill="#6b3c72" />
        <text x={x(peakI)} y={y(THIS_YEAR[peakI]) - 8} textAnchor="middle" fontFamily="Jua" fontSize="10" fill="#6b3c72">May peak</text>
        {MONTHS.map((m, i) => (
          <text key={m} x={x(i)} y={H - 1} textAnchor="middle" fontFamily="Jua" fontSize="9" fill="#9a9a9a">{m}</text>
        ))}
      </svg>
      <div className="flex items-center gap-4 mt-1">
        <span className="flex items-center gap-1.5 font-['Jua',sans-serif] text-[10.5px] text-[#6b6b6b]"><span className="w-3 h-[2.5px] bg-[#6b3c72] rounded" />This year</span>
        <span className="flex items-center gap-1.5 font-['Jua',sans-serif] text-[10.5px] text-[#9a9a9a]"><span className="w-3 h-[2.5px] rounded" style={{ background: 'repeating-linear-gradient(90deg,#cdbfdb 0 4px,transparent 4px 8px)' }} />Last year</span>
      </div>
    </div>
  );
}

// ── Best time by channel — channel × window heatmap ───────────────────────────
const WINDOWS = ['Early AM', 'Daytime', 'Evening', 'Late', 'Weekend'];
const CHANNELS: { channel: string; vals: number[] }[] = [
  { channel: 'Fitness & run apps', vals: [92, 40, 45, 30, 80] },
  { channel: 'Instagram / Social', vals: [55, 60, 78, 50, 70] },
  { channel: 'YouTube', vals: [45, 50, 82, 60, 65] },
  { channel: 'Spotify / Podcasts', vals: [80, 65, 55, 35, 72] },
  { channel: 'Transit & gym OOH', vals: [75, 68, 40, 15, 60] },
];

function chanShade(v: number, isPeak: boolean) {
  if (isPeak) return { bg: '#6B3C72', fg: '#ffffff' };
  if (v >= 75) return { bg: '#9D6BA6', fg: '#ffffff' };
  if (v >= 55) return { bg: '#C9B6DC', fg: '#4a2a50' };
  if (v >= 40) return { bg: '#E4D8EE', fg: '#6b3c72' };
  return { bg: '#F4EEFA', fg: '#c3b2d1' };
}

function ChannelBestTime() {
  const grid = { gridTemplateColumns: `minmax(120px, 160px) repeat(${WINDOWS.length}, minmax(0, 1fr))` };
  return (
    <div className="rounded-[14px] border border-[#e5e5e2] bg-white px-5 py-4">
      <CardHead title="Best time by channel" tag="Behavioural" />
      <p className="font-['Jua',sans-serif] text-[11px] text-[#9a9a9a] -mt-2 mb-3">When this audience is most reachable on each channel · indexed</p>
      <div className="grid items-center gap-1.5 mb-1.5" style={grid}>
        <span />
        {WINDOWS.map((w) => <span key={w} className="font-['Jua',sans-serif] text-[10px] text-[#9a9a9a] text-center">{w}</span>)}
      </div>
      <div className="flex flex-col gap-1.5">
        {CHANNELS.map((r) => {
          const peak = Math.max(...r.vals);
          return (
            <div key={r.channel} className="grid items-center gap-1.5" style={grid}>
              <span className="font-['Jua',sans-serif] text-[11.5px] text-[#1a1a1a] truncate pr-1">{r.channel}</span>
              {r.vals.map((v, i) => {
                const isPeak = v === peak;
                const s = chanShade(v, isPeak);
                return (
                  <div key={i} className="h-[28px] rounded-[7px] flex items-center justify-center" style={{ background: s.bg }} title={`${WINDOWS[i]} · ${v}`}>
                    {isPeak && <svg className="w-[11px] h-[11px]" viewBox="0 0 24 24" fill={s.fg}><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" /></svg>}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <p className="font-['Jua',sans-serif] text-[10.5px] text-[#9a9a9a] mt-2.5">★ = peak window per channel · best time &amp; channel to reach them</p>
    </div>
  );
}

// ── Tab ───────────────────────────────────────────────────────────────────────
export default function TemporalDeepDive() {
  return (
    <div className="flex flex-col gap-3.5">
      <SummaryStrip />

      {/* Peak days & dayparts → the shared Audience Density hour × day heatmap */}
      <div className="rounded-[14px] border border-[#e5e5e2] bg-white px-5 py-4">
        <CardHead title="Peak days & dayparts" />
        <p className="font-['Jua',sans-serif] text-[11px] text-[#9a9a9a] -mt-2 mb-3">Hour × day · indexed density · ★ = best time to reach</p>
        <AudienceDensity audienceId={AUD_ID} mode="Residential" variant="expanded" earlyRiser hideTitle />
      </div>

      <VolumeTrend />
      <ChannelBestTime />
    </div>
  );
}
