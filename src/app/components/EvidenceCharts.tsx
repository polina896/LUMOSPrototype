import { useState, useRef, useLayoutEffect } from 'react';

// ── Evidence charts ───────────────────────────────────────────────────────────
// The six signals Lumos tests the hypothesis against. Every chart follows the
// emphasis form: the audience carries the accent plum, the metro baseline is the
// de-emphasis gray (ΔE 20.4 normal / 19.4 deutan), and ordered scales use the
// one-hue ramp rather than a second identity colour.

const ACC = '#6B3C72';
const CTX = '#8A8494';
const RAMP = ['#D6B9DA', '#B084B8', '#7A4C82', '#4E2A54'];

// ── tooltip ───────────────────────────────────────────────────────────────────

function useTip() {
  const [tip, setTip] = useState<{ x: number; y: number; label: string; note?: string } | null>(null);
  const node = tip ? (
    <div
      className="fixed z-[900] pointer-events-none rounded-[9px] bg-[#211A2E] px-2.5 py-1.5 font-['Nunito_Sans',sans-serif] text-[11.5px] font-bold text-white shadow-lg"
      style={{ left: tip.x + 14, top: tip.y - 44 }}
    >
      {tip.label}
      {tip.note && <span className="block font-semibold text-[10.5px] text-[#C9BEF0] mt-0.5">{tip.note}</span>}
    </div>
  ) : null;
  return { setTip, node };
}

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(300);
  useLayoutEffect(() => {
    const measure = () => ref.current && setW(ref.current.clientWidth || 300);
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return { ref, w };
}

// column with a 4px rounded cap, square where it meets the baseline
function colPath(x: number, y: number, w: number, h: number, r = 4) {
  const rr = Math.min(r, w / 2, h);
  return `M${x},${y + h} L${x},${y + rr} Q${x},${y} ${x + rr},${y} L${x + w - rr},${y} Q${x + w},${y} ${x + w},${y + rr} L${x + w},${y + h} Z`;
}
function barPath(x: number, y: number, w: number, h: number, r = 4) {
  const rr = Math.min(r, h / 2, w);
  return `M${x},${y} L${x + w - rr},${y} Q${x + w},${y} ${x + w},${y + rr} L${x + w},${y + h - rr} Q${x + w},${y + h} ${x + w - rr},${y + h} L${x},${y + h} Z`;
}

type Col = { label: string; v?: number; a?: number; b?: number; fill?: string; tag?: boolean; note?: string };

function Columns({ data, max, series }: { data: Col[]; max: number; series?: [string, string] }) {
  const { ref, w: W } = useWidth();
  const { setTip, node } = useTip();
  const H = 118, padB = 20, padT = 16, n = data.length, plotH = H - padB - padT, band = W / n, two = !!series;

  return (
    <div ref={ref} className="w-full">
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
        <line x1={0} y1={H - padB} x2={W} y2={H - padB} stroke="#EDEAF2" strokeWidth={1} />
        {data.map((d, i) => {
          const vals = two ? [d.a ?? 0, d.b ?? 0] : [d.v ?? 0];
          const thick = Math.min(24, (band - 10) / (two ? 2 : 1) - (two ? 2 : 0));
          return (
            <g key={i}>
              {vals.map((v, k) => {
                const h = Math.max(2, (v / max) * plotH);
                const gx = band * i + (band - (thick * (two ? 2 : 1) + (two ? 2 : 0))) / 2 + k * (thick + 2);
                const fill = two ? (k === 0 ? ACC : CTX) : d.fill || ACC;
                return (
                  <g key={k}>
                    <path
                      d={colPath(gx, H - padB - h, thick, h)}
                      fill={fill}
                      onMouseMove={(e) => setTip({ x: e.clientX, y: e.clientY, label: `${d.label} · ${v}%`, note: two ? series![k] : d.note })}
                      onMouseLeave={() => setTip(null)}
                    />
                    {d.tag && k === 0 && (
                      <text x={gx + thick / 2} y={H - padB - h - 6} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="#4A3E5C" fontFamily="Baloo 2, sans-serif">{v}%</text>
                    )}
                  </g>
                );
              })}
              <text x={band * i + band / 2} y={H - 6} textAnchor="middle" fontSize={10} fill="#7E7490" fontFamily="Nunito Sans, sans-serif" fontWeight={600}>{d.label}</text>
            </g>
          );
        })}
      </svg>
      {node}
    </div>
  );
}

function PairBars({ rows, max }: { rows: { label: string; v: number; ctx?: boolean; note?: string }[]; max: number }) {
  const { ref, w: W } = useWidth();
  const { setTip, node } = useTip();
  const rowH = 30, H = rows.length * rowH + 6, labelW = 78, barW = Math.max(40, W - labelW - 46);

  return (
    <div ref={ref} className="w-full">
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
        {rows.map((r, i) => {
          const y = i * rowH + 4, h = 16, bw = Math.max(3, (r.v / max) * barW);
          return (
            <g key={i}>
              <text x={0} y={y + h - 3} fontSize={11} fill="#4A3E5C" fontFamily="Nunito Sans, sans-serif" fontWeight={700}>{r.label}</text>
              <rect x={labelW} y={y + 1} width={barW} height={h - 2} rx={4} fill="#F4F1F7" />
              <path
                d={barPath(labelW, y, bw, h)}
                fill={r.ctx ? CTX : ACC}
                onMouseMove={(e) => setTip({ x: e.clientX, y: e.clientY, label: `${r.label} · ${r.v}%`, note: r.note })}
                onMouseLeave={() => setTip(null)}
              />
              <text x={labelW + bw + 8} y={y + h - 3} fontSize={11} fontWeight={700} fill="#4A3E5C" fontFamily="Baloo 2, sans-serif">{r.v}%</text>
            </g>
          );
        })}
      </svg>
      {node}
    </div>
  );
}

// ── the six signals ───────────────────────────────────────────────────────────
// Ordered to build the argument: the premise, then habit and the rival
// explanation, then the two co-visitation charts as the closing proof.

export const EVIDENCE = [
  {
    id: 'far', t: 'Distance travelled', sub: 'Share of trips by distance band',
    read: <>Median <b>14 km</b> against a metro average of 8.4 km. Two thirds of trips start beyond 10 km.</>,
    map: 'Distance rings · median vs metro',
    legend: [[RAMP[0], 'Nearer'], [RAMP[3], 'Further']] as [string, string][],
    chart: <Columns max={44} data={[
      { label: '≤5 km', v: 12, fill: RAMP[0] }, { label: '5–10', v: 24, fill: RAMP[1] },
      { label: '10–15', v: 24, fill: RAMP[2] }, { label: '15+ km', v: 40, fill: RAMP[3], tag: true },
    ]} />,
  },
  {
    id: 'when', t: 'Weekday vs weekend', sub: 'Share of visits by day',
    read: <><b>57%</b> of visits fall on Saturday or Sunday — the metro grocery average is 41%. A planned outing, not a top-up.</>,
    map: 'Weekend density · Sat–Sun only',
    legend: [[ACC, 'Weekend'], [CTX, 'Weekday']] as [string, string][],
    chart: <Columns max={36} data={[
      { label: 'Mon', v: 7, fill: CTX }, { label: 'Tue', v: 7, fill: CTX }, { label: 'Wed', v: 8, fill: CTX },
      { label: 'Thu', v: 9, fill: CTX }, { label: 'Fri', v: 12, fill: CTX },
      { label: 'Sat', v: 33, fill: ACC, tag: true, note: 'weekend' }, { label: 'Sun', v: 24, fill: ACC, note: 'weekend' },
    ]} />,
  },
  {
    id: 'repeat', t: 'Repeat visitors', sub: 'Return within 60 days',
    read: <><b>68%</b> come back inside 60 days — 1.9× the category norm. They are not trying it once.</>,
    map: 'Density weighted to repeat households',
    hero: ['68%', 'RETURN WITHIN 60 DAYS'] as [string, string],
    legend: [[RAMP[0], 'One-off'], [RAMP[3], 'Frequent']] as [string, string][],
    chart: <Columns max={44} data={[
      { label: '1 visit', v: 32, fill: RAMP[0] }, { label: '2–3', v: 41, fill: RAMP[2], tag: true }, { label: '4+', v: 27, fill: RAMP[3] },
    ]} />,
  },
  {
    id: 'household', t: 'Household size', sub: 'People per household',
    read: <><b>66%</b> are four-person households or larger, against 29% across the metro. Explains the basket — not the distance.</>,
    map: 'Households of 4+ only',
    legend: [[ACC, 'This audience'], [CTX, 'Metro average']] as [string, string][],
    chart: <Columns max={44} series={['This audience', 'Metro average']} data={[
      { label: '1', a: 4, b: 22 }, { label: '2', a: 11, b: 29 }, { label: '3', a: 19, b: 20 },
      { label: '4', a: 38, b: 18 }, { label: '5+', a: 28, b: 11 },
    ]} />,
  },
  {
    id: 'ikea', t: 'IKEA overlap', sub: 'Visited an IKEA in the last 90 days',
    read: <><b>3.4×</b> the metro rate. Destination retail begets destination retail.</>,
    map: 'IKEA stores · co-visitation',
    legend: [[ACC, 'This audience'], [CTX, 'Metro average']] as [string, string][],
    chart: <PairBars max={60} rows={[{ label: 'This audience', v: 41, note: 'index 341' }, { label: 'Metro average', v: 12, ctx: true }]} />,
  },
  {
    id: 'bunnings', t: 'Bunnings overlap', sub: 'Visited a Bunnings in the last 90 days',
    read: <><b>2.9×</b> the metro rate, and usually on the same trip — the chain runs hardware then grocery.</>,
    map: 'Bunnings stores · co-visitation',
    legend: [[ACC, 'This audience'], [CTX, 'Metro average']] as [string, string][],
    chart: <PairBars max={60} rows={[{ label: 'This audience', v: 56, note: 'index 292' }, { label: 'Metro average', v: 19, ctx: true }]} />,
  },
];

export const KEY_FINDINGS = [
  'Highest-value Costco customers are affluent families.',
  'They travel significantly further than average.',
  'Weekend visitation dominates.',
  'IKEA and Bunnings are the strongest overlap brands.',
  'North-West Sydney offers the highest concentration of lookalike customers.',
];

export const NEXT_TURNS = [
  { id: 'ooh', t: 'Recommend billboard locations?', icon: <><rect x="3" y="4" width="18" height="11" rx="1.5" /><path d="M8 20h8M12 15v5" /></>,
    ack: 'Pulling the panels inside the 20–30 km band that these households pass on a Saturday morning — ranked by weekly reach against this audience, not against the metro.' },
  { id: 'aud', t: 'Build a media audience?', icon: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0112 0" /><circle cx="17.5" cy="9" r="2.4" /><path d="M16 20a5 5 0 016.5-4.4" /></>,
    ack: 'Building it now: households in the 20–30 km band with a weekend big-basket pattern and an IKEA or Bunnings visit in the last 90 days. I’ll size it before you activate.' },
  { id: 'comp', t: 'Compare against Sam’s Club?', icon: <><path d="M7 16l-4-4 4-4" /><path d="M3 12h12" /><path d="M17 8l4 4-4 4" /><path d="M21 12H9" /></>,
    ack: 'Running the same six signals against Sam’s Club shoppers so you can see where the two overlap and where they part.' },
  { id: 'export', t: 'Export an executive summary?', icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M12 12v6M9 15l3 3 3-3" /></>,
    ack: 'Assembling the summary — hypothesis, the six signals, and the key findings, with the map states as figures.' },
];

// ── the grid ──────────────────────────────────────────────────────────────────

export function EvidenceGrid({ active, onShowOnMap, visibleCount = EVIDENCE.length }: {
  active: string | null;
  onShowOnMap: (id: string) => void;
  // charts arrive one at a time, so the reader watches the case being built
  visibleCount?: number;
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 items-start my-5">
      {EVIDENCE.slice(0, visibleCount).map((ev, i) => (
        <div
          key={ev.id}
          className={`lumos-reply-in flex flex-col rounded-2xl bg-white p-4 pb-3 border transition-shadow ${
            active === ev.id ? 'border-[#6b3c72] shadow-[0_2px_12px_rgba(74,42,110,0.13)]' : 'border-[#e1d9ec]'
          }`}
        >
          <div className="flex items-start gap-2">
            <span className="font-['Geist',sans-serif] text-[13px] font-bold text-[#1a1a1a] leading-tight">{ev.t}</span>
            <span className="ml-auto flex-shrink-0 rounded-md bg-[#efe8f8] px-1.5 py-0.5 font-['Geist',sans-serif] text-[10px] font-bold uppercase tracking-wide text-[#6b3c72]">Signal {i + 1}</span>
          </div>
          <p className="font-['Nunito_Sans',sans-serif] text-[11px] text-[#7e7490] mt-0.5 mb-2.5">{ev.sub}</p>
          {ev.hero && (
            <div className="font-['Geist',sans-serif] text-[30px] font-extrabold leading-none text-[#4a2a6e] mb-1">
              {ev.hero[0]}
              <span className="block font-['Nunito_Sans',sans-serif] text-[10.5px] font-bold tracking-wide text-[#7e7490] mt-1">{ev.hero[1]}</span>
            </div>
          )}
          {ev.chart}
          <p className="font-['Jua',sans-serif] text-[12.5px] leading-relaxed text-[#4a3e5c] mt-2.5 mb-3 [&>b]:text-[#4a2a6e]">{ev.read}</p>
          <div className="mt-auto flex items-center gap-2 border-t border-[#ebe5f1] pt-2.5">
            <button
              onClick={() => onShowOnMap(ev.id)}
              className={`inline-flex items-center gap-1.5 rounded-[9px] border px-3 py-1.5 font-['Geist',sans-serif] text-[11.5px] font-bold transition-colors ${
                active === ev.id
                  ? 'bg-[#6b3c72] border-[#6b3c72] text-white'
                  : 'bg-white border-[#e1d9ec] text-[#6b3c72] hover:border-[#7c4fc7] hover:bg-[#f5f0fb]'
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" /><circle cx="12" cy="10" r="2.6" />
              </svg>
              Show on map
            </button>
            <span className="ml-auto flex gap-3 font-['Nunito_Sans',sans-serif] text-[10.5px] font-semibold text-[#7e7490]">
              {ev.legend.map(([c, l]) => (
                <span key={l} className="inline-flex items-center gap-1.5">
                  <i className="inline-block w-2.5 h-2.5 rounded-[2px]" style={{ background: c }} />{l}
                </span>
              ))}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function KeyFindings() {
  return (
    <div className="my-5 rounded-2xl border border-[#BFE3CE] bg-[#F0FAF4] px-[18px] py-4">
      <h3 className="font-['Geist',sans-serif] text-[15px] font-extrabold text-[#1F7A4C] mb-3">Key findings</h3>
      <ul className="flex flex-col gap-2.5">
        {KEY_FINDINGS.map((t) => (
          <li key={t} className="flex items-start gap-2.5 font-['Jua',sans-serif] text-[13.5px] leading-relaxed text-[#123D28]">
            <span className="mt-0.5 grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-[#1F7A4C]">
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
