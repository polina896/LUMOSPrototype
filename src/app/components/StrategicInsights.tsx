import { useEffect, useState } from 'react';
import { STRATEGIC_INSIGHTS } from '../audienceData';

function TrendChart() {
  const points = [20, 28, 24, 35, 31, 42, 38, 51, 47, 62];
  const w = 120, h = 48;
  const max = Math.max(...points), min = Math.min(...points);
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ys = points.map((v) => h - ((v - min) / (max - min)) * h * 0.85 - h * 0.08);
  const poly = xs.map((x, i) => `${x},${ys[i]}`).join(' ');
  const fill = `${xs.map((x, i) => `${x},${ys[i]}`).join(' ')} ${w},${h} 0,${h}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c6bf0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7c6bf0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fill} fill="url(#trendGrad)" />
      <polyline points={poly} fill="none" stroke="#7c6bf0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GeoChart() {
  const districts = [
    { label: 'D9–11', pct: 85 },
    { label: 'D15–16', pct: 58 },
    { label: 'D19–21', pct: 42 },
    { label: 'Other', pct: 18 },
  ];
  return (
    <div className="space-y-1.5 w-full">
      {districts.map((d) => (
        <div key={d.label} className="flex items-center gap-2">
          <span className="font-['Geist',sans-serif] text-[9px] text-[#999] w-10 flex-shrink-0">{d.label}</span>
          <div className="flex-1 h-2 bg-[#f0ebff] rounded-full overflow-hidden">
            <div className="h-full bg-[#7c6bf0] rounded-full" style={{ width: `${d.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ConquestChart() {
  const brands = [
    { label: 'Mercedes', pct: 42 },
    { label: 'BMW', pct: 31 },
    { label: 'Audi', pct: 18 },
  ];
  return (
    <div className="space-y-1.5 w-full">
      {brands.map((b) => (
        <div key={b.label} className="flex items-center gap-2">
          <span className="font-['Geist',sans-serif] text-[9px] text-[#999] w-12 flex-shrink-0">{b.label}</span>
          <div className="flex-1 h-2 bg-[#f0ebff] rounded-full overflow-hidden">
            <div className="h-full bg-[#7c6bf0] rounded-full" style={{ width: `${b.pct}%` }} />
          </div>
          <span className="font-['Geist',sans-serif] text-[9px] text-[#888]">{b.pct}%</span>
        </div>
      ))}
    </div>
  );
}

function FunnelChart() {
  const stages = [
    { label: 'Digital', pct: 100 },
    { label: 'Showroom', pct: 62 },
    { label: 'Purchase', pct: 29 },
  ];
  return (
    <div className="space-y-1.5 w-full">
      {stages.map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          <span className="font-['Geist',sans-serif] text-[9px] text-[#999] w-12 flex-shrink-0">{s.label}</span>
          <div style={{ width: `${s.pct}%` }} className="h-3.5 bg-[#7c6bf0] rounded flex items-center justify-end pr-1">
            <span className="font-['Geist',sans-serif] text-[8px] text-white">{s.pct}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function InsightCard({ insight, visible }: { insight: typeof STRATEGIC_INSIGHTS[0]; visible: boolean }) {
  return (
    <div
      className={`bg-white border border-[#e5e5e2] rounded-xl p-4 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 pr-2">
          <p className="font-['Geist',sans-serif] text-[10px] text-[#999] uppercase tracking-wide mb-1">{insight.title}</p>
          <p className="font-['Geist',sans-serif] text-[28px] text-[#7c6bf0] font-semibold leading-none">{insight.stat}</p>
          <p className="font-['Geist',sans-serif] text-[10px] text-[#888] mt-0.5">{insight.statLabel}</p>
        </div>
      </div>
      <div className="mb-3">
        {insight.chartType === 'trend' && <TrendChart />}
        {insight.chartType === 'geo' && <GeoChart />}
        {insight.chartType === 'conquest' && <ConquestChart />}
        {insight.chartType === 'funnel' && <FunnelChart />}
      </div>
      <p className="font-['Geist',sans-serif] text-[12px] text-[#555] leading-relaxed">{insight.description}</p>
    </div>
  );
}

export default function StrategicInsights({ visibleCount }: { visibleCount: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      {STRATEGIC_INSIGHTS.map((insight, i) => (
        <InsightCard key={insight.id} insight={insight} visible={i < visibleCount} />
      ))}
    </div>
  );
}
