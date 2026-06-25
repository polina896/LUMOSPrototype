import { useState } from 'react';
import { RotateCcw, MessageSquare } from 'lucide-react';

// ── Design tokens ───────────────────────────────────────────────────────────
const CARD = 'bg-white rounded-[14px] border border-[#e5e5e2]';
const TAKEAWAY_PANEL = 'bg-[#f8f4ff] rounded-[10px] p-4 flex flex-col gap-2.5 min-w-0';
const TAKEAWAY_LABEL = 'font-["Jua",sans-serif] text-[9px] uppercase tracking-[0.8px] text-[#6b3c72] font-normal';
const SECTION_TITLE = 'font-["Jua",sans-serif] text-[14px] text-[#1a1a1a] font-normal leading-[21px]';
const SECTION_SUB = 'font-["Jua",sans-serif] text-[11px] text-[#9a9a9a] font-normal leading-[16.5px]';
const BODY_COPY = 'font-["Jua",sans-serif] text-[12px] text-[#4a4a4a] leading-[18.6px] font-normal';

// ── Shared sub-components ───────────────────────────────────────────────────

function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`${CARD} p-[17px] ${className}`}>{children}</div>;
}

function SectionHeader({ title, subtitle, pill }: { title: string; subtitle: string; pill?: { label: string; color: string; bg: string } }) {
  return (
    <div className="flex items-start gap-2 mb-4">
      {pill && (
        <span className="mt-0.5 shrink-0 px-2 py-0.5 rounded-[4px] font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.6px] font-normal whitespace-nowrap" style={{ background: pill.bg, color: pill.color }}>
          {pill.label}
        </span>
      )}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className={SECTION_TITLE}>{title}</span>
        <span className={SECTION_SUB}>{subtitle}</span>
      </div>
    </div>
  );
}

function IndexBadge({ value, trend }: { value: string; trend?: 'up' | 'down' | 'flat' }) {
  const color = trend === 'up' ? '#2f7d4f' : trend === 'down' ? '#c0392b' : '#6b6b6b';
  const bg = trend === 'up' ? '#e7f3ec' : trend === 'down' ? '#fef2f2' : '#f3f3f1';
  const arrow = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '–';
  return (
    <span className="inline-flex items-center gap-0.5 px-[6px] py-[2px] rounded-full font-['Jua',sans-serif] text-[10px] font-normal whitespace-nowrap" style={{ background: bg, color }}>
      {arrow !== '–' && <span className="text-[8px]">{arrow}</span>}
      {value}
    </span>
  );
}

function IndexBar({ label, value, pct, trend }: { label: string; value: string; pct: number; trend?: 'up' | 'down' | 'flat' }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] font-normal w-[200px] shrink-0 truncate">{label}</span>
      <div className="flex-1 h-[8px] bg-[#f1e9ff] rounded-full overflow-hidden">
        <div className="h-full bg-[#6b3c72] rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <IndexBadge value={value} trend={trend} />
    </div>
  );
}

function TwoColIndexBar({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="font-['Jua',sans-serif] text-[11px] text-[#1a1a1a] font-normal w-[110px] shrink-0 truncate">{label}</span>
      <div className="flex-1 h-[7px] bg-[#f1e9ff] rounded-full overflow-hidden">
        <div className="h-full bg-[#6b3c72] rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="font-['Jua',sans-serif] text-[11px] text-[#6b3c72] font-normal w-[28px] text-right shrink-0">{value}</span>
    </div>
  );
}

// ── Filter bar ──────────────────────────────────────────────────────────────

function FilterPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-[6px] bg-white border border-[#e5e5e2] rounded-[10px] px-[10px] py-[6px] cursor-pointer hover:border-[#c8b8d4] transition-colors">
      <span className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.54px] text-[#9a9a9a] font-normal">{label}</span>
      <span className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] font-normal">{value}</span>
      <svg width="10" height="10" viewBox="0 0 13 13" fill="none"><path d="M3.25 4.875L6.5 8.125L9.75 4.875" stroke="#9A9A9A" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
}

function GlobalFilterBar() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <FilterPill label="Date" value="Jan–Mar 2026" />
      <FilterPill label="Geography" value="Singapore" />
      <FilterPill label="Indexed vs" value="National average" />
      <FilterPill label="Compare" value="vs previous quarter" />
      <div className="ml-auto flex items-center gap-px border border-[#e5e5e2] rounded-[8px] overflow-hidden bg-white">
        {['Index', '%', 'Count'].map((t) => (
          <button key={t} className={`font-['Jua',sans-serif] text-[11px] px-3 py-1.5 transition-colors ${t === 'Index' ? 'bg-[#f1e9ff] text-[#6b3c72]' : 'text-[#6b6b6b] hover:bg-[#f5f5f3]'}`}>{t}</button>
        ))}
      </div>
    </div>
  );
}

// ── AI Takeaway hero ────────────────────────────────────────────────────────

function TakeawayHero() {
  return (
    <div className="rounded-[14px] border border-[#bebde7] relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f7f1ff 0%, #fbfaff 100%)' }}>
      <div className="p-5 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.75L8.16667 4.66667L11.0833 5.83333L8.16667 7L7 9.91667L5.83333 7L2.91667 5.83333L5.83333 4.66667L7 1.75Z" stroke="#6B3C72" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[1.2px] text-[#6b3c72] font-normal">Takeaway · who they are</span>
          </div>
          <span className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.4px] text-[#9a9a9a] font-normal">Updated for Jan–Mar 2026</span>
        </div>

        {/* Headline */}
        <p className="font-['Jua',sans-serif] text-[20px] text-[#1a1a1a] leading-[26px] font-normal">
          Affluent mid-career professionals who over-index across premium automotive, financial services and aspirational lifestyle brands.
        </p>

        {/* Body copy */}
        <p className="font-['Jua',sans-serif] text-[13px] text-[#6b6b6b] leading-[20.8px] font-normal">
          Urban Upgrade Drivers over-index highest on{' '}
          <span className="text-[#1a1a1a]">premium vehicle brands (2.1×)</span> and{' '}
          <span className="text-[#1a1a1a]">financial services (1.8×)</span>, with an average household income of{' '}
          <span className="text-[#1a1a1a]">$148k</span> and 72% of spend in-person. They skew{' '}
          <span className="text-[#1a1a1a]">professional (1.6×)</span> and slightly male (58%), and concentrate in the{' '}
          <span className="text-[#1a1a1a]">$120–200k</span> household band. Their strongest brand affinities are{' '}
          <span className="text-[#1a1a1a]">CarousellAuto (2.4×)</span>,{' '}
          <span className="text-[#1a1a1a]">BMW (2.0×)</span> and{' '}
          <span className="text-[#1a1a1a]">Mercedes-Benz (1.9×)</span>.
        </p>

        {/* Dashed divider + stats row */}
        <div className="border-t border-dashed border-[#bebde7] pt-4">
          <div className="flex items-start justify-between gap-4">
            {[
              { value: '387k', label: 'People' },
              { value: '2.1×', label: 'Index vs national' },
              { value: '$148k', label: 'Avg HHI' },
              { value: '2.4×', label: 'Auto interest' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="font-['Jua',sans-serif] text-[18px] text-[#6b3c72] leading-[27px] font-normal">{s.value}</span>
                <span className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.5px] text-[#9a9a9a] font-normal">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action row */}
        <div className="flex items-center gap-4 pt-0.5">
          <button className="flex items-center gap-1.5 text-[#6b3c72] hover:opacity-70 transition-opacity">
            <RotateCcw className="w-[13px] h-[13px]" />
            <span className="font-['Jua',sans-serif] text-[11px] font-normal">Regenerate</span>
          </button>
          <button className="flex items-center gap-1.5 text-[#6b3c72] hover:opacity-70 transition-opacity">
            <MessageSquare className="w-[13px] h-[13px]" />
            <span className="font-['Jua',sans-serif] text-[11px] font-normal">Ask a follow-up</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Demographics card ───────────────────────────────────────────────────────

function DemographicsCard() {
  const stats = [
    { label: 'Core age', value: '32–52', index: '1.6×', trend: 'up' as const },
    { label: 'Female share', value: '42%', index: '0.9×', trend: 'flat' as const },
    { label: 'Occupation', value: 'Professional', index: '1.6×', trend: 'up' as const },
    { label: 'Life stage', value: 'Homeowners 61%', index: '1.9×', trend: 'up' as const },
  ];
  return (
    <SectionCard className="flex-1 min-w-0">
      <SectionHeader title="Demographics & occupation" subtitle="Indexed vs national" />
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#fafaf8] rounded-[10px] border border-[#e5e5e2] px-3 py-3 flex flex-col gap-1.5">
            <span className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.6px] text-[#9a9a9a] font-normal">{s.label}</span>
            <span className="font-['Jua',sans-serif] text-[18px] text-[#1a1a1a] leading-[22px] font-normal">{s.value}</span>
            <IndexBadge value={s.index} trend={s.trend} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ── Income & Affluence card ─────────────────────────────────────────────────

function IncomeCard() {
  const bands = [
    { label: '<$80k', value: '0.6×', pct: 40 },
    { label: '$80–120k', value: '0.9×', pct: 60 },
    { label: '$120–200k', value: '1.5×', pct: 100 },
    { label: '$200k+', value: '1.4×', pct: 93 },
  ];
  return (
    <SectionCard className="flex-1 min-w-0">
      <SectionHeader title="Income & affluence" subtitle="HH-income bands vs benchmark" />
      <div className="flex flex-col gap-3">
        {bands.map((b) => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] font-normal w-[72px] shrink-0">{b.label}</span>
            <div className="flex-1 h-[8px] bg-[#f1e9ff] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${b.pct}%`, background: b.pct === 100 ? '#6b3c72' : '#b89fc4' }} />
            </div>
            <span className="font-['Jua',sans-serif] text-[12px] text-[#6b3c72] font-normal w-[28px] text-right shrink-0">{b.value}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ── Lifestage mix card ──────────────────────────────────────────────────────

function LifestageCard() {
  const segments = [
    { pct: 31, color: '#6b3c72', label: 'Established Professionals', index: '2.1×' },
    { pct: 27, color: '#9b6ba0', label: 'Aspirational Climbers', index: '1.7×' },
    { pct: 19, color: '#c4a0c8', label: 'Growing Families', index: '1.3×' },
    { pct: 23, color: '#e0cce4', label: 'Other', index: null },
  ];
  return (
    <SectionCard className="flex-1 min-w-0">
      <SectionHeader title="Lifestage mix" subtitle="Helix-style segments" />
      {/* Segmented bar */}
      <div className="flex rounded-md overflow-hidden h-5 w-full mb-4">
        {segments.map((s) => (
          <div key={s.label} style={{ width: `${s.pct}%`, background: s.color }} title={`${s.label}: ${s.pct}%`} />
        ))}
      </div>
      {/* Legend */}
      <div className="flex flex-col gap-2">
        {segments.filter((s) => s.index).map((s) => (
          <div key={s.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
              <span className="font-['Jua',sans-serif] text-[12px] text-[#333] font-normal truncate">{s.label}</span>
            </div>
            <span className="font-['Jua',sans-serif] text-[11px] text-[#6b3c72] shrink-0">{s.index}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ── Split section (takeaway left + bars right) ──────────────────────────────

interface SplitSectionProps {
  title: string;
  subtitle: string;
  pill?: { label: string; color: string; bg: string };
  takeawayCopy: string;
  bars: { label: string; value: string; pct: number; trend?: 'up' | 'down' | 'flat' }[];
  footer?: string;
}

function SplitSection({ title, subtitle, pill, takeawayCopy, bars, footer }: SplitSectionProps) {
  return (
    <SectionCard>
      <SectionHeader title={title} subtitle={subtitle} pill={pill} />
      <div className="flex gap-4 min-w-0">
        {/* Takeaway panel */}
        <div className={`${TAKEAWAY_PANEL} w-[220px] shrink-0`}>
          <span className={TAKEAWAY_LABEL}>Takeaway</span>
          <p className={BODY_COPY}>{takeawayCopy}</p>
        </div>
        {/* Bars */}
        <div className="flex-1 flex flex-col gap-3 min-w-0 pt-1">
          {bars.map((b) => (
            <IndexBar key={b.label} label={b.label} value={b.value} pct={b.pct} trend={b.trend} />
          ))}
          {footer && (
            <p className="font-['Jua',sans-serif] text-[11px] text-[#9a9a9a] font-normal mt-1">{footer}</p>
          )}
        </div>
      </div>
    </SectionCard>
  );
}

// ── Brand affinity (2-column grid of bars) ──────────────────────────────────

function BrandAffinitySection() {
  const brands = [
    { label: 'CarousellAuto', value: '2.4×', pct: 100 },
    { label: 'BMW', value: '2.0×', pct: 83 },
    { label: 'Mercedes-Benz', value: '1.9×', pct: 79 },
    { label: 'Porsche', value: '1.7×', pct: 71 },
  ];
  return (
    <SectionCard>
      <SectionHeader title="Interests & brand affinity" subtitle="Categories & brands they over-index for" />
      <div className="flex gap-4 min-w-0">
        {/* Takeaway panel */}
        <div className={`${TAKEAWAY_PANEL} w-[220px] shrink-0`}>
          <span className={TAKEAWAY_LABEL}>Takeaway</span>
          <p className={BODY_COPY}>
            Affinity is strongest for premium automotive and financial services brands. CarousellAuto and BMW cluster together. Mercedes-Benz and Porsche also over-index.
          </p>
        </div>
        {/* 2-column brand grid */}
        <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-3 content-start pt-1 min-w-0">
          {brands.map((b) => (
            <TwoColIndexBar key={b.label} label={b.label} value={b.value} pct={b.pct} />
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

// ── Top segments with tabs ───────────────────────────────────────────────────

function TopSegmentsSection() {
  const [view, setView] = useState<'snapshot' | 'trend'>('snapshot');
  const segments = [
    { label: 'Premium Vehicle Owners', value: '2.1×', pct: 100, trend: 'up' as const },
    { label: 'Wealth Management Users', value: '1.8×', pct: 86, trend: 'up' as const },
    { label: 'Premium Retail Shoppers', value: '1.7×', pct: 81, trend: 'flat' as const },
    { label: 'Business Class Travellers', value: '1.5×', pct: 71, trend: 'down' as const },
  ];
  return (
    <SectionCard>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex flex-col gap-0.5">
          <span className={SECTION_TITLE}>Top segments by index</span>
          <span className={SECTION_SUB}>Leading buyergraphic segments · vs national baseline</span>
        </div>
        {/* Tab toggle — no Ask CTA */}
        <div className="flex items-center gap-px border border-[#e5e5e2] rounded-[8px] overflow-hidden bg-white shrink-0">
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
      </div>
      <div className="flex gap-4 min-w-0">
        <div className={`${TAKEAWAY_PANEL} w-[220px] shrink-0`}>
          <span className={TAKEAWAY_LABEL}>Takeaway</span>
          <p className={BODY_COPY}>
            The four leading segments all reflect high-income professional lifestyles, with Premium Vehicle Owners and Wealth Management Users clustering together. Premium Vehicle Owners rose versus last quarter; Business Class Travellers declined slightly as travel normalised.
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-3 min-w-0 pt-1">
          {segments.map((s) => (
            <IndexBar key={s.label} label={s.label} value={s.value} pct={s.pct} trend={s.trend} />
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

// ── Root export ─────────────────────────────────────────────────────────────

export default function AudienceProfileContent() {
  return (
    <div className="flex flex-col gap-[14px]">
      <GlobalFilterBar />

      <TakeawayHero />

      {/* Three-column row */}
      <div className="flex gap-[12px] items-stretch">
        <DemographicsCard />
        <IncomeCard />
        <LifestageCard />
      </div>

      <TopSegmentsSection />

      <SplitSection
        title="Purchase patterns"
        subtitle="What they buy · category spend indexed"
        pill={{ label: 'Transactional', color: '#2471a3', bg: '#e8f4fd' }}
        takeawayCopy="Urban Upgrade Drivers over-index on premium automotive (2.4×) and financial services (1.8×). Average household spend is $148k, split 72% in-person / 28% online. Business travel and health & wellness are secondary spend pillars."
        bars={[
          { label: 'Premium automotive', value: '2.4×', pct: 100, trend: 'up' },
          { label: 'Financial & investment services', value: '1.8×', pct: 75, trend: 'up' },
          { label: 'Business travel & hospitality', value: '1.7×', pct: 71, trend: 'flat' },
          { label: 'Health & wellness', value: '1.6×', pct: 67, trend: 'flat' },
        ]}
        footer="Dealership / in-person 72%  ·  Online 28%"
      />

      <SplitSection
        title="Weekend & lifestyle signals"
        subtitle="What they do outside work · venue visitation"
        pill={{ label: 'Behavioural', color: '#1e8449', bg: '#eafaf1' }}
        takeawayCopy="Car show & expo attendance over-indexes highest at 2.3×. Fine dining and golf courses cluster together. Premium fitness and wellness rounds out the top four. Weekend activities skew toward premium, experiential occasions."
        bars={[
          { label: 'Car show & expo attendance', value: '2.3×', pct: 100, trend: 'up' },
          { label: 'Fine dining & restaurants', value: '1.8×', pct: 78, trend: 'up' },
          { label: 'Golf courses', value: '1.6×', pct: 70, trend: 'flat' },
          { label: 'Premium fitness & wellness', value: '1.5×', pct: 65, trend: 'flat' },
        ]}
      />

      <BrandAffinitySection />
    </div>
  );
}
