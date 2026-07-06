import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import DeepDiveBlock from './DeepDiveBlock';
import type { BlockConfig } from './deepDiveBlocks';

// ── My View — a per-user custom dashboard for one audience ────────────────────
// Users pin the modules (blocks) most useful to them — from any deep-dive tab —
// into one flexible overview. Pinning happens in place (the pin button on every
// block header) or via the Customize sheet here. Cards drag to reorder. State is
// held by AudienceProfileViewer and persisted to localStorage (per-user feel).
//
// Naming decision (see wireframe): the tab is "My View", the action is "Pin".

const GOLD = '#c69214';
const GOLD_SOFT = '#fbf3de';

// ── Pin affordance ────────────────────────────────────────────────────────────
// A pushpin that reads cleanly filled (pinned) or outline (not pinned).
export function PinIcon({ filled, size = 14 }: { filled?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth={filled ? 0 : 2}
      strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="M9 3h6v2l-1 1v4l3 3v1h-4v5l-1 2-1-2v-5H7v-1l3-3V6L9 5z" />
    </svg>
  );
}

// ── Context — lets any block header pin/unpin itself without prop-threading ────
type MyViewCtx = { isPinned: (id: string) => boolean; toggle: (id: string) => void } | null;
const Ctx = createContext<MyViewCtx>(null);
export const MyViewProvider = Ctx.Provider;
export function useMyView() { return useContext(Ctx); }

// A small pin button for a block header (used inside DeepDiveBlock).
export function BlockPinButton({ id }: { id: string }) {
  const mv = useMyView();
  if (!mv) return null;
  const pinned = mv.isPinned(id);
  return (
    <button
      onClick={() => mv.toggle(id)}
      title={pinned ? 'Pinned to My View — click to remove' : 'Pin to My View'}
      aria-pressed={pinned}
      className="flex items-center justify-center w-[26px] h-[26px] rounded-[7px] border transition-colors"
      style={pinned
        ? { borderColor: GOLD, background: GOLD_SOFT, color: GOLD }
        : { borderColor: '#e5e5e2', background: '#fafaf8', color: '#9a9a9a' }}
    >
      <PinIcon filled={pinned} size={13} />
    </button>
  );
}

// ── Types passed down from the viewer ─────────────────────────────────────────
// A module is either an editable deck block (rendered by DeepDiveBlock) or an
// "anchor" — a fixed, hand-built card (the Mobility map, the Temporal density
// heatmap) that can't be a config-driven block but is still pinnable. Anchors
// carry their own render() so My View can show them alongside deck blocks.
export type AnchorModule = { id: string; title: string; source: string; span?: number; render: () => ReactNode };
export type CatalogItem = { id: string; title: string; subtitle?: string };
export type Catalog = { key: string; label: string; items: CatalogItem[] }[];

interface MyViewTabProps {
  order: string[];                          // pinned module ids, in display order
  blockMap: Record<string, BlockConfig>;    // id → deck-block config (across every tab)
  anchors: Record<string, AnchorModule>;    // id → fixed anchor module
  sourceOf: Record<string, string>;         // id → source-tab label
  catalog: Catalog;                         // every pinnable module, grouped by source tab
  scopeId: string | null;
  onReorder: (next: string[]) => void;
  onToggle: (id: string) => void;
  onAsk: (config: BlockConfig) => void;
  onBrowse: () => void;                      // empty-state → jump to a deep-dive tab
}

export function MyViewTab({
  order, blockMap, anchors, sourceOf, catalog, scopeId, onReorder, onToggle, onAsk, onBrowse,
}: MyViewTabProps) {
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const dragId = useRef<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const pinnedIds = order.filter((id) => blockMap[id] || anchors[id]);

  const handleDrop = (targetId: string) => {
    const from = pinnedIds.indexOf(dragId.current ?? '');
    const to = pinnedIds.indexOf(targetId);
    if (from === -1 || to === -1 || from === to) { dragId.current = null; setOverId(null); return; }
    const next = [...pinnedIds];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onReorder(next);
    dragId.current = null;
    setOverId(null);
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* ── Dashboard header ── */}
      <div className="flex items-start gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span style={{ color: GOLD }}><PinIcon filled size={17} /></span>
            <span className="font-['Jua',sans-serif] text-[17px] text-[#1a1a1a]">My View</span>
          </div>
          <div className="flex items-center gap-2 mt-1 font-['Jua',sans-serif] text-[12px] text-[#6b6b6b]">
            <span>{pinnedIds.length} pinned module{pinnedIds.length === 1 ? '' : 's'}</span>
            {pinnedIds.length > 0 && (
              <>
                <span className="text-[#c9c9c9]">·</span>
                <span className="flex items-center gap-1 text-[#9a9a9a]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01" /></svg>
                  drag a card to reorder
                </span>
              </>
            )}
            <span className="text-[#c9c9c9]">·</span>
            <span className="flex items-center gap-1 text-[#9a9a9a]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="3.2" /><path d="M5.5 20c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" /></svg>
              only visible to you
            </span>
          </div>
        </div>
        <button
          onClick={() => setCustomizeOpen(true)}
          className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-2 font-['Jua',sans-serif] text-[12px] text-white transition-colors"
          style={{ background: GOLD }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          Customize
        </button>
      </div>

      {/* ── Empty state ── */}
      {pinnedIds.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d9c9e0] bg-white px-10 py-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-[18px] flex items-center justify-center mb-4" style={{ background: GOLD_SOFT, color: GOLD }}>
            <PinIcon size={30} />
          </div>
          <h2 className="font-['Jua',sans-serif] text-[20px] text-[#1a1a1a] mb-2">Build your own view of this audience</h2>
          <p className="font-['Jua',sans-serif] text-[13px] text-[#6b6b6b] max-w-[52ch] leading-[20px] mb-6">
            Pin the modules that matter most — mobility, best times to reach, spend, seasonality — and see them together here. Nothing is pinned yet.
          </p>
          <button
            onClick={() => setCustomizeOpen(true)}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 font-['Jua',sans-serif] text-[13px] text-white"
            style={{ background: GOLD }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            Add modules
          </button>
          <div className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.1em] text-[#9a9a9a] mt-8 mb-3">Suggested for this audience</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {catalog.flatMap((g) => g.items.map((it) => ({ it, label: g.label })))
              .filter(({ it }) => !order.includes(it.id))
              .filter((_, i) => i < 3)
              .map(({ it, label }) => (
                <button
                  key={it.id}
                  onClick={() => onToggle(it.id)}
                  className="flex items-center gap-2 rounded-[10px] border border-[#e5e5e2] bg-[#fafaf8] px-3 py-2 font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] hover:border-[#d9c9e0] transition-colors"
                >
                  <span className="w-[18px] h-[18px] rounded-[5px] bg-[#f1e9ff] text-[#6b3c72] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                  {it.title}
                  <span className="text-[9px] text-[#9a9a9a]">· {label}</span>
                </button>
              ))}
          </div>
        </div>
      ) : (
        /* ── Populated grid ── */
        <div className="grid grid-cols-3 gap-3 items-start">
          {pinnedIds.map((id) => {
            const b = blockMap[id];
            const anchor = anchors[id];
            const span3 = b ? b.span === 3 : anchor?.span === 3;
            return (
              <div
                key={id}
                draggable
                onDragStart={() => { dragId.current = id; }}
                onDragOver={(e) => { e.preventDefault(); if (id !== dragId.current) setOverId(id); }}
                onDragLeave={() => setOverId((o) => (o === id ? null : o))}
                onDrop={(e) => { e.preventDefault(); handleDrop(id); }}
                onDragEnd={() => { dragId.current = null; setOverId(null); }}
                className={`relative ${span3 ? 'col-span-3' : 'col-span-1'} ${dragId.current === id ? 'opacity-40' : ''} ${overId === id ? 'ring-2 ring-[#d9c9e0] rounded-[14px]' : ''}`}
              >
                {/* source chip — this dashboard mixes modules from different tabs */}
                <span className="absolute -top-2 left-3 z-10 px-2 py-[1px] rounded-full bg-white border border-[#e5e5e2] font-['Jua',sans-serif] text-[9px] text-[#9a9a9a] whitespace-nowrap">
                  {sourceOf[id]}
                </span>
                {b ? <DeepDiveBlock config={b} active={scopeId === id} onAsk={onAsk} /> : anchor?.render()}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Customize sheet ── */}
      {customizeOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" >
          <div className="absolute inset-0 bg-[#1e1a22]/34" onClick={() => setCustomizeOpen(false)} />
          <div className="relative w-[428px] max-w-[90vw] h-full bg-white border-l border-[#e5e5e2] shadow-[-16px_0_40px_rgba(0,0,0,0.12)] flex flex-col">
            <div className="px-5 pt-5 pb-4 border-b border-[#e5e5e2] relative">
              <h3 className="flex items-center gap-2 font-['Jua',sans-serif] text-[16px] text-[#1a1a1a]">
                <span style={{ color: GOLD }}><PinIcon filled size={16} /></span>
                Customize My View
              </h3>
              <p className="font-['Jua',sans-serif] text-[12px] text-[#6b6b6b] mt-1">Pick which modules appear on the My View tab for this audience.</p>
              <button onClick={() => setCustomizeOpen(false)} className="absolute top-4 right-4 w-7 h-7 rounded-lg border border-[#e5e5e2] bg-[#fafaf8] flex items-center justify-center text-[#6b6b6b] hover:bg-[#f3f3f1]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-2">
              {catalog.map((group) => (
                <div key={group.key}>
                  <div className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.09em] text-[#9a9a9a] mt-4 mb-2">{group.label}</div>
                  {group.items.map((it) => {
                    const on = order.includes(it.id);
                    return (
                      <button
                        key={it.id}
                        onClick={() => onToggle(it.id)}
                        className="w-full flex items-center gap-3 rounded-[11px] border px-3 py-2.5 mb-2 text-left transition-colors"
                        style={on ? { borderColor: GOLD, background: GOLD_SOFT } : { borderColor: '#e5e5e2', background: 'white' }}
                      >
                        <span className="w-[34px] h-[34px] rounded-[9px] bg-[#f1e9ff] text-[#6b3c72] flex items-center justify-center shrink-0">
                          <PinIcon filled={on} size={16} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] truncate">{it.title}</div>
                          {it.subtitle && <div className="font-['Jua',sans-serif] text-[11px] text-[#9a9a9a] truncate">{it.subtitle}</div>}
                        </div>
                        {/* toggle */}
                        <span className="relative w-10 h-[23px] rounded-full shrink-0 transition-colors" style={{ background: on ? GOLD : '#e5e5e2' }}>
                          <span className="absolute top-[2px] w-[19px] h-[19px] rounded-full bg-white shadow transition-all" style={{ left: on ? '19px' : '2px' }} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="px-5 py-3.5 border-t border-[#e5e5e2] flex items-center gap-3">
              <span className="font-['Jua',sans-serif] text-[12px] text-[#6b6b6b]">{pinnedIds.length} selected</span>
              <button onClick={() => setCustomizeOpen(false)} className="ml-auto rounded-lg px-4 py-2 font-['Jua',sans-serif] text-[12px] text-white" style={{ background: GOLD }}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
