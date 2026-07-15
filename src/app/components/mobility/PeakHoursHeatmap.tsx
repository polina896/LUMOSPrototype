import { useMemo, useState } from 'react';
import type { Signal } from './mobilityData';

// ── Peak movement hours — hour × day indexed heatmap ─────────────────────────
// Ported from the wireframe: a Gaussian-mixture model of when the audience is on
// the move, per signal. Values are indexed (1.0 = average); the single hottest
// cell is starred, and a takeaway calls out the peak + next-strongest window.

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HRS = Array.from({ length: 17 }, (_, i) => i + 6); // 06:00 … 22:00
const DAY_FACTOR: Record<string, number> = { Mon: 0.95, Tue: 0.98, Wed: 1.0, Thu: 1.0, Fri: 0.94, Sat: 1.18, Sun: 1.06 };
const RAMP = ['#E6D7E9', '#C6A9CA', '#A278A9', '#7A4C82', '#5A2E62'];
const MODES: Signal[] = ['Residential', 'Daytime', 'Transaction'];

const gauss = (x: number, mu: number, sd: number) => Math.exp(-((x - mu) ** 2) / (2 * sd * sd));
const fmtHour = (h: number) => `${h < 10 ? '0' : ''}${h}:00`;
const fmtClock = (h: number) => { const hh = h % 12 === 0 ? 12 : h % 12; return `${hh}${h < 12 ? 'am' : 'pm'}`; };

function weight(h: number, weekend: boolean, mode: Signal): number {
  if (mode === 'Daytime') {
    if (weekend) return gauss(h, 13, 3.0) * 0.6 + 0.12;
    return gauss(h, 12.5, 2.4) * 1.0 + gauss(h, 17, 1.6) * 0.35 + 0.12;
  }
  if (mode === 'Transaction') {
    if (weekend) return gauss(h, 14, 2.6) * 1.0 + gauss(h, 19, 2.0) * 0.7 + 0.14;
    return gauss(h, 12.5, 1.5) * 0.7 + gauss(h, 19, 1.8) * 0.9 + 0.12;
  }
  if (weekend) return gauss(h, 9.5, 2.4) * 1.0 + gauss(h, 20, 2.2) * 0.5 + 0.12;
  return gauss(h, 7.8, 1.5) * 1.0 + gauss(h, 20, 1.8) * 0.7 + 0.10;
}

function bucket(v: number): string {
  if (v < 0.55) return RAMP[0];
  if (v < 0.90) return RAMP[1];
  if (v < 1.35) return RAMP[2];
  if (v < 1.90) return RAMP[3];
  return RAMP[4];
}

const Star = () => (
  <svg width={9} height={9} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
    <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
  </svg>
);

export default function PeakHoursHeatmap() {
  const [mode, setMode] = useState<Signal>('Residential');

  const { idx, peak, second } = useMemo(() => {
    const raw = HRS.map((h) => DAYS.map((d) => weight(h, d === 'Sat' || d === 'Sun', mode) * DAY_FACTOR[d]));
    const flat = raw.flat();
    const mean = flat.reduce((a, b) => a + b, 0) / flat.length;
    const idx = raw.map((r) => r.map((v) => v / mean));
    let peak = { v: -1, r: 0, c: 0 };
    idx.forEach((row, r) => row.forEach((v, c) => { if (v > peak.v) peak = { v, r, c }; }));
    const ranked = idx.flatMap((row, r) => row.map((v, c) => ({ v, r, c }))).sort((a, b) => b.v - a.v);
    const second = ranked.find((x) => x.c !== peak.c || Math.abs(x.r - peak.r) > 2) ?? ranked[1];
    return { idx, peak, second };
  }, [mode]);

  const pDay = DAYS[peak.c];
  const pHour = HRS[peak.r];
  const modeWord = mode === 'Daytime' ? 'Daytime presence' : mode === 'Transaction' ? 'Spend activity' : 'Home presence';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="inline-flex border border-[#e5e5e2] rounded-lg overflow-hidden bg-white">
          {MODES.map((m) => (
            <span
              key={m}
              onClick={() => setMode(m)}
              className={`px-[11px] py-1.5 text-[11px] cursor-pointer select-none font-['Jua',sans-serif] ${m === mode ? 'bg-[#f1e9ff] text-[#6b3c72]' : 'text-[#6b6b6b]'}`}
            >
              {m}
            </span>
          ))}
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[12px] text-[#6b3c72] bg-[#f1e9ff] px-2.5 py-[5px] rounded-lg font-['Jua',sans-serif]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
          Peak · {pDay} {fmtClock(pHour)}
        </span>
      </div>

      <div className="border border-[#e5e5e2] rounded-xl overflow-hidden">
        <div className="max-h-[300px] overflow-y-auto">
          <table className="w-full border-separate" style={{ borderSpacing: 0, tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th className="sticky top-0 left-0 z-[4] bg-[#faf8fc] text-[10px] text-[#6b6b6b] font-normal py-2 pl-3.5 text-left font-['Jua',sans-serif] w-16">Hour</th>
                {DAYS.map((d) => (
                  <th key={d} className="sticky top-0 z-[3] bg-[#faf8fc] text-[10px] text-[#6b6b6b] font-normal py-2 text-center font-['Jua',sans-serif] border-b border-[#e5e5e2]">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HRS.map((h, r) => (
                <tr key={h}>
                  <td className="sticky left-0 z-[2] bg-white text-[11px] text-[#1a1a1a] pl-3.5 border-r border-b border-[#f0eef2] font-['Jua',sans-serif] w-16" style={{ height: 34 }}>{fmtHour(h)}</td>
                  {DAYS.map((d, c) => {
                    const v = idx[r][c];
                    const isPeak = r === peak.r && c === peak.c;
                    return (
                      <td key={d} className="border-b border-[#f0eef2]" style={{ height: 34 }}>
                        <div className="relative h-full p-1">
                          <div className="absolute rounded-md" style={{ inset: 3, background: bucket(v) }} />
                          <div
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[24px] h-5 px-[5px] rounded-md flex items-center justify-center gap-0.5 text-[10px] font-['Jua',sans-serif] ${isPeak ? 'text-white' : 'text-[#1a1a1a]'}`}
                            style={isPeak
                              ? { background: '#6b3c72', border: '1px solid #6b3c72', boxShadow: '0 2px 6px rgba(107,60,114,.4)' }
                              : { background: '#fff', border: '1px solid rgba(0,0,0,.05)', boxShadow: '0 1px 2px rgba(0,0,0,.08)' }}
                            title={`${d} ${fmtHour(h)} · ${v.toFixed(1)}x`}
                          >
                            {isPeak && <Star />}{v.toFixed(1)}
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

      <div className="flex gap-2 items-start bg-[#f1e9ff] rounded-[11px] px-3.5 py-3">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 text-[#6b3c72] shrink-0 mt-0.5"><path d="M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.8-7 11-7 11z" /><circle cx="12" cy="10" r="2" /></svg>
        <p className="text-[12.5px] text-[#1a1a1a] leading-[1.5] font-['Jua',sans-serif]">
          {modeWord} peaks <b className="text-[#6b3c72]">{pDay} {fmtClock(pHour)}–{fmtClock(pHour + 2)} ({peak.v.toFixed(1)}x)</b>, with <b className="text-[#6b3c72]">{DAYS[second.c]} {fmtClock(HRS[second.r])}</b> the next-strongest window.
        </p>
      </div>
    </div>
  );
}
