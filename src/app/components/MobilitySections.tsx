import { AskPill, type ModuleRef } from './ModuleAsk';
import { BlockPinButton } from './MyView';

// ── Mobility & Movement — native section cards ────────────────────────────────
// The map sections used to live inside one Figma export (Screen2Mobility), so
// they couldn't be pinned individually. Rebuilt here as self-contained native
// cards: each carries an Ask pill + a My View pin, and is registered as an anchor
// so My View can re-render any of them. Data mirrors the previous Figma screen.

const CARD = 'bg-white rounded-[14px] border border-[#e5e5e2] p-[17px] flex flex-col';
const TITLE = "font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] leading-[21px]";
const SUB = "font-['Jua',sans-serif] text-[11px] text-[#9a9a9a] leading-[16.5px]";
const NOTE = "font-['Jua',sans-serif] text-[11px] text-[#6b6b6b] leading-[16px]";
const LABEL = "font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.06em] text-[#9a9a9a]";

function BarRow({ label, pct, val, hot }: { label: string; pct: number; val: string; hot?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] w-[112px] shrink-0 truncate">{label}</span>
      <div className="flex-1 h-[8px] bg-[#f1e9ff] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: hot ? '#6b3c72' : '#b89fc4' }} />
      </div>
      <span className="font-['Jua',sans-serif] text-[12px] text-[#6b3c72] w-[42px] text-right shrink-0">{val}</span>
    </div>
  );
}

// ── Visuals ───────────────────────────────────────────────────────────────────

function MapMini() {
  return (
    <div
      className="relative h-[196px] rounded-[10px] overflow-hidden border border-[#e5e5e2]"
      style={{ background: 'radial-gradient(120px 90px at 30% 42%, rgba(107,60,114,0.50), rgba(107,60,114,0) 70%), radial-gradient(95px 72px at 62% 60%, rgba(107,60,114,0.40), rgba(107,60,114,0) 70%), radial-gradient(70px 55px at 78% 30%, rgba(107,60,114,0.28), rgba(107,60,114,0) 70%), #edeaf0' }}
    >
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#e5e5e2 1px, transparent 1px), linear-gradient(90deg, #e5e5e2 1px, transparent 1px)', backgroundSize: '34px 34px', opacity: 0.5 }} />
      {[['30%', '42%'], ['62%', '60%'], ['78%', '30%']].map(([l, t], i) => (
        <span key={i} className="absolute w-3 h-3 border-2 border-white" style={{ background: '#6b3c72', borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', left: l, top: t }} />
      ))}
      <span className="absolute font-['Jua',sans-serif] text-[9px] text-[#6b3c72] bg-white/85 rounded px-1.5 py-0.5" style={{ left: '20%', top: '28%' }}>Tampines 3.8×</span>
      <span className="absolute font-['Jua',sans-serif] text-[9px] text-[#6b3c72] bg-white/85 rounded px-1.5 py-0.5" style={{ left: '56%', top: '70%' }}>Bishan 2.9×</span>
      <span className="absolute font-['Jua',sans-serif] text-[9px] text-[#6b3c72] bg-white/90 rounded px-1.5 py-0.5" style={{ left: '10px', top: '8px' }}>SINGAPORE</span>
    </div>
  );
}

function WhereTheyLive() {
  return (
    <div className="grid grid-cols-[1.6fr_1fr] gap-4">
      <MapMini />
      <div className="flex flex-col gap-2.5">
        <div className={LABEL}>Top home districts</div>
        <BarRow label="D15 · Tampines" pct={100} val="3.8×" hot />
        <BarRow label="D20 · Bishan" pct={78} val="2.9×" />
        <BarRow label="D5 · Buona Vista" pct={64} val="2.4×" />
        <BarRow label="D10 · Tanglin" pct={55} val="2.1×" />
        <div className="mt-1.5 pt-2.5 border-t border-dashed border-[#e5e5e2]">
          <span className={NOTE}>Median travel <b className="text-[#1a1a1a]">14.2km</b> · 90th pct 52km</span>
        </div>
      </div>
    </div>
  );
}

function WhereTheyTransact() {
  return (
    <div className="flex flex-col gap-3">
      <BarRow label="Orchard · D9" pct={100} val="2.6×" hot />
      <BarRow label="Marina · D1" pct={72} val="1.9×" />
      <BarRow label="Tanglin · D10" pct={58} val="1.6×" />
      <BarRow label="Novena · D11" pct={46} val="1.3×" />
      <span className={NOTE}>Spend clusters near premium retail — Orchard over-indexes <b className="text-[#1a1a1a]">2.6×</b>.</span>
    </div>
  );
}

function Catchment() {
  const bands = [['0–5km', 18], ['5–15km', 42], ['15–30km', 28], ['30km+', 12]] as const;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <div><div className="font-['Jua',sans-serif] text-[20px] text-[#1a1a1a] leading-none">14.2km</div><div className={LABEL}>Median travel</div></div>
        <div><div className="font-['Jua',sans-serif] text-[20px] text-[#6b3c72] leading-none">52km</div><div className={LABEL}>90th pct</div></div>
      </div>
      <div className="flex rounded-md overflow-hidden h-5 w-full">
        {bands.map(([lab, w], i) => (
          <div key={lab} className="flex items-center justify-center font-['Jua',sans-serif] text-[9px] text-white" style={{ width: `${w}%`, background: ['#d9c9e0', '#b89fc4', '#8a5f92', '#6b3c72'][i] }}>{w}%</div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {bands.map(([lab], i) => (
          <span key={lab} className="flex items-center gap-1.5 font-['Jua',sans-serif] text-[11px] text-[#6b6b6b]"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: ['#d9c9e0', '#b89fc4', '#8a5f92', '#6b3c72'][i] }} />{lab}</span>
        ))}
      </div>
    </div>
  );
}

function Competitor() {
  return (
    <div className="flex flex-col gap-3">
      <BarRow label="CarouselAuto" pct={100} val="38%" hot />
      <BarRow label="AutoHub SG" pct={63} val="24%" />
      <BarRow label="DriveCity" pct={50} val="19%" />
      <BarRow label="MotorMile" pct={32} val="12%" />
      <span className={NOTE}>Share of rival-venue visits, last 3 mo · CarouselAuto leads.</span>
    </div>
  );
}

function Frequency() {
  const segs = [['One-off', 62, '#b89fc4'], ['Returning', 26, '#8a5f92'], ['Loyal', 12, '#6b3c72']] as const;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex rounded-md overflow-hidden h-5 w-full">
        {segs.map(([lab, w, c]) => (
          <div key={lab} style={{ width: `${w}%`, background: c }} title={`${lab}: ${w}%`} />
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        {segs.map(([lab, w, c]) => (
          <div key={lab} className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-['Jua',sans-serif] text-[12px] text-[#333]"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />{lab}</span>
            <span className="font-['Jua',sans-serif] text-[11px] text-[#6b3c72]">{w}%</span>
          </div>
        ))}
      </div>
      <div className="pt-2 border-t border-dashed border-[#e5e5e2]"><span className={NOTE}>Median gap between visits <b className="text-[#1a1a1a]">11 days</b>.</span></div>
    </div>
  );
}

function ReachBySite() {
  return (
    <div className="flex flex-col gap-3">
      <BarRow label="Orchard Rd Digital" pct={100} val="1.9×" hot />
      <BarRow label="Marina One" pct={82} val="1.6×" />
      <BarRow label="Tampines Hub" pct={64} val="1.3×" />
      <BarRow label="Bishan MRT" pct={50} val="1.1×" />
      <span className={NOTE}>Top LUMOS panels by audience index · best panel <b className="text-[#1a1a1a]">1.9×</b>.</span>
    </div>
  );
}

// ── Section registry ──────────────────────────────────────────────────────────
// One entry per pinnable Mobility section. span:3 → full row; the rest tile 3-up.
type SectionMeta = { id: string; title: string; subtitle: string; span: 1 | 3; Visual: () => JSX.Element };

export const MOBILITY_SECTIONS: SectionMeta[] = [
  { id: 'mob-where-live',     title: 'Where they live',           subtitle: 'Home-origin density · top over-indexing districts', span: 3, Visual: WhereTheyLive },
  { id: 'mob-where-transact', title: 'Where they transact',       subtitle: 'Spend density · top districts',                   span: 1, Visual: WhereTheyTransact },
  { id: 'mob-catchment',      title: 'Catchment & origin flows',  subtitle: 'How far they travel · median & 90th pct',         span: 1, Visual: Catchment },
  { id: 'mob-competitor',     title: 'Competitor & POI visitation', subtitle: 'Rival venues · share of visits',                span: 1, Visual: Competitor },
  { id: 'mob-frequency',      title: 'Frequency & recency',       subtitle: 'Visitor mix · median gap',                        span: 1, Visual: Frequency },
  { id: 'mob-reach',          title: 'Reach by site',             subtitle: 'Top LUMOS panels · audience index',               span: 1, Visual: ReachBySite },
];

const BY_ID: Record<string, SectionMeta> = Object.fromEntries(MOBILITY_SECTIONS.map((s) => [s.id, s]));

// A single pinnable Mobility section card — used both in the Mobility tab and,
// via the anchor registry, inside My View.
export function MobilitySectionCard({ id, audience = 'this audience', onAskGraph }: { id: string; audience?: string; onAskGraph?: (ref: ModuleRef) => void }) {
  const s = BY_ID[id];
  if (!s) return null;
  const Visual = s.Visual;
  return (
    <div className={CARD}>
      <div className="flex items-start gap-2 mb-4">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className={TITLE}>{s.title}</span>
          <span className={SUB}>{s.subtitle}</span>
        </div>
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <AskPill id={`aud:mobility:${id}`} label={s.title} audience={audience} state={['Residential']} onAsk={onAskGraph} />
          <BlockPinButton id={id} />
        </div>
      </div>
      <Visual />
    </div>
  );
}
