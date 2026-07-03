import { useState } from 'react';
import { Sparkles, Plus } from 'lucide-react';
import {
  type BlockConfig,
  type BlockRow,
  type CompareMode,
  rowValue,
  rowPct,
} from './deepDiveBlocks';

// ── Generic, config-driven deep-dive block ───────────────────────────────────
// One component renders every chart type from a BlockConfig. The header carries
// a "✦ Ask" pill that scopes the Ask Lumos chat to this block; asking to change
// the chart type / data / title patches the config in state and re-renders here.

const CARD = 'bg-white rounded-[14px] border border-[#e5e5e2]';
const SECTION_TITLE = 'font-["Jua",sans-serif] text-[14px] text-[#1a1a1a] font-normal leading-[21px]';
const SECTION_SUB = 'font-["Jua",sans-serif] text-[11px] text-[#9a9a9a] font-normal leading-[16.5px]';
const TAKEAWAY_PANEL = 'bg-[#f8f4ff] rounded-[10px] p-4 flex flex-col gap-2.5 min-w-0';
const TAKEAWAY_LABEL = 'font-["Jua",sans-serif] text-[9px] uppercase tracking-[0.8px] text-[#6b3c72] font-normal';
const BODY_COPY = 'font-["Jua",sans-serif] text-[12px] text-[#4a4a4a] leading-[18.6px] font-normal';

function IndexBadge({ value, trend }: { value: string; trend?: 'up' | 'down' | 'flat' }) {
  const color = trend === 'up' ? '#2f7d4f' : trend === 'down' ? '#c0392b' : '#6b6b6b';
  const bg = trend === 'up' ? '#e7f3ec' : trend === 'down' ? '#fef2f2' : '#f3f3f1';
  const arrow = trend === 'up' ? '▲' : trend === 'down' ? '▼' : null;
  return (
    <span className="inline-flex items-center gap-0.5 px-[6px] py-[2px] rounded-full font-['Jua',sans-serif] text-[10px] font-normal whitespace-nowrap" style={{ background: bg, color }}>
      {arrow && <span className="text-[8px]">{arrow}</span>}
      {value}
    </span>
  );
}

// ── Chart primitives ─────────────────────────────────────────────────────────

function BarsChart({ rows, mode }: { rows: BlockRow[]; mode: CompareMode }) {
  const maxPct = Math.max(...rows.map((r) => rowPct(r, mode, rows)));
  return (
    <div className="flex flex-col gap-3">
      {rows.map((r) => {
        const pct = rowPct(r, mode, rows);
        return (
          <div key={r.label} className="flex items-center gap-3">
            <span className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] font-normal w-[92px] shrink-0 truncate">{r.label}</span>
            <div className="flex-1 h-[8px] bg-[#f1e9ff] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: pct >= maxPct - 0.5 ? '#6b3c72' : '#b89fc4' }} />
            </div>
            <span className="font-['Jua',sans-serif] text-[12px] text-[#6b3c72] font-normal w-[34px] text-right shrink-0">{rowValue(r, mode)}</span>
          </div>
        );
      })}
    </div>
  );
}

function StatCardsChart({ rows, mode }: { rows: BlockRow[]; mode: CompareMode }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {rows.map((r) => (
        <div key={r.label} className="bg-[#fafaf8] rounded-[10px] border border-[#e5e5e2] px-3 py-3 flex flex-col gap-1.5">
          <span className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.6px] text-[#9a9a9a] font-normal">{r.label}</span>
          <span className="font-['Jua',sans-serif] text-[18px] text-[#1a1a1a] leading-[22px] font-normal">{r.display ?? rowValue(r, mode)}</span>
          {(r.index != null || r.percent != null || r.count != null) && <IndexBadge value={rowValue(r, mode)} trend={r.trend} />}
        </div>
      ))}
    </div>
  );
}

function SegmentedBarChart({ rows, mode }: { rows: BlockRow[]; mode: CompareMode }) {
  const total = rows.reduce((s, r) => s + (r.percent ?? 0), 0) || 100;
  return (
    <>
      <div className="flex rounded-md overflow-hidden h-5 w-full mb-4">
        {rows.map((r, i) => (
          <div key={r.label} style={{ width: `${((r.percent ?? 0) / total) * 100}%`, background: r.color ?? '#c4a0c8' }} title={`${r.label}: ${r.percent}%`} />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: r.color ?? '#c4a0c8' }} />
              <span className="font-['Jua',sans-serif] text-[12px] text-[#333] font-normal truncate">{r.label}</span>
            </div>
            <span className="font-['Jua',sans-serif] text-[11px] text-[#6b3c72] shrink-0">{rowValue(r, mode)}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function DonutChart({ rows, mode }: { rows: BlockRow[]; mode: CompareMode }) {
  const total = rows.reduce((s, r) => s + (r.percent ?? 0), 0) || 100;
  const R = 42, C = 2 * Math.PI * R;
  let offset = 0;
  const arcs = rows.map((r) => {
    const frac = (r.percent ?? 0) / total;
    const seg = { color: r.color ?? '#c4a0c8', dash: frac * C, gap: C - frac * C, off: offset };
    offset -= frac * C;
    return seg;
  });
  const top = rows.reduce((a, b) => ((b.percent ?? 0) > (a.percent ?? 0) ? b : a), rows[0]);
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 110 110" className="w-[118px] h-[118px] shrink-0 -rotate-90">
        <circle cx="55" cy="55" r={R} fill="none" stroke="#f1e9ff" strokeWidth="14" />
        {arcs.map((a, i) => (
          <circle key={i} cx="55" cy="55" r={R} fill="none" stroke={a.color} strokeWidth="14"
            strokeDasharray={`${a.dash} ${a.gap}`} strokeDashoffset={a.off} />
        ))}
        <text x="55" y="52" textAnchor="middle" className="rotate-90" fontFamily="Jua" fontSize="15" fill="#1a1a1a" transform="rotate(90 55 55)">{top?.percent}%</text>
        <text x="55" y="66" textAnchor="middle" fontFamily="Jua" fontSize="7" fill="#9a9a9a" transform="rotate(90 55 55)">top share</text>
      </svg>
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: r.color ?? '#c4a0c8' }} />
              <span className="font-['Jua',sans-serif] text-[12px] text-[#333] font-normal truncate">{r.label}</span>
            </div>
            <span className="font-['Jua',sans-serif] text-[11px] text-[#6b3c72] shrink-0">{rowValue(r, mode)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChart({ rows, mode }: { rows: BlockRow[]; mode: CompareMode }) {
  const W = 280, H = 96, PAD = 8;
  const pts = rows.map((r, i) => {
    const x = rows.length > 1 ? PAD + (i * (W - 2 * PAD)) / (rows.length - 1) : W / 2;
    const y = H - PAD - (rowPct(r, mode, rows) / 100) * (H - 2 * PAD);
    return { x, y, r };
  });
  const line = pts.map((p) => `${p.x},${p.y}`).join(' ');
  const area = `${PAD},${H - PAD} ${line} ${W - PAD},${H - PAD}`;
  return (
    <div className="flex flex-col gap-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <polygon points={area} fill="#f1e9ff" />
        <polyline points={line} fill="none" stroke="#6b3c72" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p) => <circle key={p.r.label} cx={p.x} cy={p.y} r="3" fill="#6b3c72" />)}
      </svg>
      <div className="flex justify-between">
        {rows.map((r) => (
          <div key={r.label} className="flex flex-col items-center gap-0.5 min-w-0 flex-1">
            <span className="font-['Jua',sans-serif] text-[10px] text-[#6b3c72] truncate">{rowValue(r, mode)}</span>
            <span className="font-['Jua',sans-serif] text-[9px] text-[#9a9a9a] truncate w-full text-center">{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TableChart({ rows, mode }: { rows: BlockRow[]; mode: CompareMode }) {
  return (
    <div className="rounded-[10px] border border-[#e5e5e2] overflow-hidden">
      {rows.map((r, i) => (
        <div key={r.label} className={`flex items-center justify-between gap-2 px-3 py-2 ${i % 2 ? 'bg-[#fafaf8]' : 'bg-white'}`}>
          <span className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] font-normal truncate">{r.label}</span>
          <IndexBadge value={rowValue(r, mode)} trend={r.trend} />
        </div>
      ))}
    </div>
  );
}

function ChartBody({ config }: { config: BlockConfig }) {
  const { chartType, compareMode, data } = config;
  const rows = data.rows;
  if (!rows?.length) return <div className="font-['Jua',sans-serif] text-[12px] text-[#9a9a9a] py-6 text-center">No data yet.</div>;
  switch (chartType) {
    case 'bars': return <BarsChart rows={rows} mode={compareMode} />;
    case 'stat-cards': return <StatCardsChart rows={rows} mode={compareMode} />;
    case 'segmented-bar': return <SegmentedBarChart rows={rows} mode={compareMode} />;
    case 'donut': return <DonutChart rows={rows} mode={compareMode} />;
    case 'line': return <LineChart rows={rows} mode={compareMode} />;
    case 'table': return <TableChart rows={rows} mode={compareMode} />;
    default: return null;
  }
}

// ── Split layout — takeaway panel (left) + bars (right) ──────────────────────
// Reproduces the hand-built Profile "SplitSection" / brand-affinity look so the
// migrated full-width sections stay visually identical to today.

// Single-column split bar — uniform purple, normalised across the block's rows,
// with a trend badge (segments / purchase / weekend).
function SplitBar({ row, rows, mode }: { row: BlockRow; rows: BlockRow[]; mode: CompareMode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] font-normal w-[200px] shrink-0 truncate">{row.label}</span>
      <div className="flex-1 h-[8px] bg-[#f1e9ff] rounded-full overflow-hidden">
        <div className="h-full bg-[#6b3c72] rounded-full transition-all" style={{ width: `${rowPct(row, mode, rows)}%` }} />
      </div>
      <IndexBadge value={rowValue(row, mode)} trend={row.trend} />
    </div>
  );
}

// Two-column value bar, no badge (brand-affinity grid).
function TwoColValueBar({ row, rows, mode }: { row: BlockRow; rows: BlockRow[]; mode: CompareMode }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="font-['Jua',sans-serif] text-[11px] text-[#1a1a1a] font-normal w-[110px] shrink-0 truncate">{row.label}</span>
      <div className="flex-1 h-[7px] bg-[#f1e9ff] rounded-full overflow-hidden">
        <div className="h-full bg-[#6b3c72] rounded-full" style={{ width: `${rowPct(row, mode, rows)}%` }} />
      </div>
      <span className="font-['Jua',sans-serif] text-[11px] text-[#6b3c72] font-normal w-[28px] text-right shrink-0">{rowValue(row, mode)}</span>
    </div>
  );
}

function SplitBody({ config }: { config: BlockConfig }) {
  const { compareMode, data, takeaway, columns, footer } = config;
  const rows = data.rows;
  return (
    <div className="flex gap-4 min-w-0">
      <div className={`${TAKEAWAY_PANEL} w-[220px] shrink-0`}>
        <span className={TAKEAWAY_LABEL}>Takeaway</span>
        <p className={BODY_COPY}>{takeaway}</p>
      </div>
      {columns === 2 ? (
        <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-3 content-start pt-1 min-w-0">
          {rows.map((r) => (
            <TwoColValueBar key={r.label} row={r} rows={rows} mode={compareMode} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-3 min-w-0 pt-1">
          {rows.map((r) => (
            <SplitBar key={r.label} row={r} rows={rows} mode={compareMode} />
          ))}
          {footer && <p className="font-['Jua',sans-serif] text-[11px] text-[#9a9a9a] font-normal mt-1">{footer}</p>}
        </div>
      )}
    </div>
  );
}

// ── Block header — pill + title/subtitle + (optional toggle) + ✦ Ask ─────────
function BlockHeader({ config, active, onAsk }: { config: BlockConfig; active?: boolean; onAsk: (c: BlockConfig) => void }) {
  const [view, setView] = useState<'snapshot' | 'trend'>('snapshot');
  return (
    <div className="flex items-start gap-2 mb-4">
      {config.pill && (
        <span className="mt-0.5 shrink-0 px-2 py-0.5 rounded-[4px] font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.6px] font-normal whitespace-nowrap" style={{ background: config.pill.bg, color: config.pill.color }}>
          {config.pill.label}
        </span>
      )}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className={SECTION_TITLE}>{config.title}</span>
        {config.subtitle && <span className={SECTION_SUB}>{config.subtitle}</span>}
      </div>
      <div className="ml-auto flex items-center gap-2 shrink-0">
        {config.toggle && (
          <div className="flex items-center gap-px border border-[#e5e5e2] rounded-[8px] overflow-hidden bg-white">
            {(['snapshot', 'trend'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setView(t)}
                className={`font-['Jua',sans-serif] text-[11px] px-3 py-1.5 capitalize transition-colors ${view === t ? 'bg-[#f1e9ff] text-[#6b3c72]' : 'text-[#6b6b6b] hover:bg-[#f5f5f3]'}`}
              >
                {t === 'snapshot' ? 'Snapshot' : 'Trend'}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => onAsk(config)}
          title={`Ask about “${config.title}” — scopes the chat to this block`}
          className={`flex items-center gap-1 px-2 py-[3px] rounded-full font-['Jua',sans-serif] text-[11px] transition-colors ${
            active ? 'bg-[#6b3c72] text-white' : 'bg-[#f1e9ff] text-[#6b3c72] hover:bg-[#e7dbf6]'
          }`}
        >
          <Sparkles className="w-[11px] h-[11px]" />
          Ask
        </button>
      </div>
    </div>
  );
}

// ── The block card ───────────────────────────────────────────────────────────

export default function DeepDiveBlock({
  config,
  active,
  onAsk,
}: {
  config: BlockConfig;
  active?: boolean;
  onAsk: (config: BlockConfig) => void;
}) {
  const isSplit = config.layout === 'split';
  return (
    <div className={`${CARD} p-[17px] flex flex-col transition-shadow ${active ? 'ring-2 ring-[#6b3c72]/45' : ''}`}>
      <BlockHeader config={config} active={active} onAsk={onAsk} />
      {isSplit ? <SplitBody config={config} /> : <ChartBody config={config} />}
    </div>
  );
}

// ── Block deck — the span-aware grid of blocks + the Add-chart tile ──────────
// Shared by every editable tab (Profile / Mobility / Temporal). Blocks with
// span:3 take a full row; the rest tile 3-up. The Add tile always trails.

export function BlockDeck({
  blocks,
  scopeId,
  onAsk,
  onAdd,
}: {
  blocks: BlockConfig[];
  scopeId?: string | null;
  onAsk: (config: BlockConfig) => void;
  onAdd: () => void;
}) {
  return (
    // data-editable-deck lets the viewer's Figma-pill click handler ignore real
    // block ✦ Ask clicks (they route through onAsk → scope, not pin-to-chat).
    <div data-editable-deck className="grid grid-cols-3 gap-3 items-start">
      {blocks.map((b) => (
        <div key={b.id} className={b.span === 3 ? 'col-span-3' : 'col-span-1'}>
          <DeepDiveBlock config={b} active={scopeId === b.id} onAsk={onAsk} />
        </div>
      ))}
      <div className="col-span-1">
        <AddChartTile active={scopeId === 'new'} onAdd={onAdd} />
      </div>
    </div>
  );
}

// ── Add-chart bento tile — starts a scoped "new block" chat ──────────────────

export function AddChartTile({ active, onAdd }: { active?: boolean; onAdd: () => void }) {
  return (
    <button
      onClick={onAdd}
      className={`rounded-[14px] border-2 border-dashed flex flex-col items-center justify-center gap-2 p-[17px] min-h-[150px] transition-colors ${
        active ? 'border-[#6b3c72] bg-[#f8f4ff]' : 'border-[#d8cfe0] bg-[#fcfbfd] hover:border-[#6b3c72] hover:bg-[#f8f4ff]'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-[#f1e9ff] text-[#6b3c72] flex items-center justify-center">
        <Plus className="w-4 h-4" />
      </div>
      <span className="font-['Jua',sans-serif] text-[13px] text-[#6b3c72]">Add chart</span>
      <span className="font-['Jua',sans-serif] text-[10.5px] text-[#9a9a9a] text-center leading-[1.4]">Describe it to Lumos<br />— e.g. “car ownership by lifestage”</span>
    </button>
  );
}
