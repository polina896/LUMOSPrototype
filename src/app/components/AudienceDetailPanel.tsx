import { useState } from 'react';
import { Bookmark, Download, MoreHorizontal, FileText, Search, ArrowRight, Maximize2, Plus, Minus, X } from 'lucide-react';
import { AUDIENCES, type AudienceId } from '../audienceData';
import type { Screen } from '../App';
import DataExplorerPanel from './DataExplorerPanel';
import DataSourcesPopover from './DataSourcesPopover';

// ── Per-audience extended data ───────────────────────────────────────────────

const EXTENDED: Record<string, {
  headline: string; headlineHighlights: string[];
  pillars: { num: string; txt: string; bold: string }[];
  incomeData: { label: string; pct: number; lead: boolean; val: string }[];
  segments: { label: string; pct: number; val: string }[];
  mapInsight: string; mapInsightBold: string;
  districts: { id: string; x: number; y: number; color: string; textColor: string }[];
  dealerDistricts: { id: string; x: number; y: number; color: string; textColor: string }[];
  brief: { northStar: string; say: string; show: string; where: string; when: string; avoid: string };
}> = {
  'premium-sedan-intenders': {
    headline: "Singapore's most brand-loyal premium-sedan buyers — they shortlist on reputation, then buy when the bonus lands.",
    headlineHighlights: ['brand-loyal', 'bonus lands'],
    pillars: [
      { num: '2.45×', txt: 'more likely to be in-market than the average Singaporean', bold: 'in-market' },
      { num: '4 in 5', txt: 'shortlist by brand reputation before they price-compare', bold: 'brand reputation' },
    ],
    incomeData: [
      { label: '< $60k',    pct: 18,  lead: false, val: '0.3×' },
      { label: '$60–120k',  pct: 42,  lead: false, val: '0.8×' },
      { label: '$120–160k', pct: 78,  lead: true,  val: '1.6×' },
      { label: '$160k+',    pct: 100, lead: true,  val: '2.1×' },
    ],
    segments: [
      { label: 'Affluent Professionals', pct: 100, val: '1.7×' },
      { label: 'Established Families',   pct: 94,  val: '1.6×' },
      { label: 'Luxury Lifestyle',        pct: 94,  val: '1.6×' },
      { label: 'Business Travellers',     pct: 88,  val: '1.5×' },
    ],
    mapInsight: 'Where they live and where they buy sit ~12 km apart — target them as two zones for awareness and conversion.',
    mapInsightBold: 'two zones',
    districts: [
      { id: 'D10', x: 100, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'D11', x: 158, y: 74, color: '#8A5C90', textColor: '#fff' },
      { id: 'D9',  x: 216, y: 78, color: '#BEBDE7', textColor: '#4a2a50' },
      { id: 'D15', x: 286, y: 92, color: '#6B3C72', textColor: '#fff' },
    ],
    dealerDistricts: [
      { id: 'D14', x: 218, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'D9',  x: 288, y: 92, color: '#8A5C90', textColor: '#fff' },
      { id: 'D3',  x: 190, y: 122, color: '#6B3C72', textColor: '#fff' },
    ],
    brief: {
      northStar: "Speak to arrival, not aspiration — reassure the choice, never discount it",
      say: 'Achievement & ownership privilege; proof over promotions',
      show: 'Understated premium — quiet confidence, not flash',
      where: 'LinkedIn + premium OOH in D9–11 & D15; skip hard-sell email',
      when: 'Build into year-end bonus & Chinese New Year windows',
      avoid: 'Discount urgency — they barely deal-seek (0.4×)',
    },
  },
  'ev-upgrade-shoppers': {
    headline: "Singapore's most tech-forward EV switchers — they compare relentlessly, then commit when the range anxiety dissolves.",
    headlineHighlights: ['tech-forward', 'range anxiety dissolves'],
    pillars: [
      { num: '3.8×', txt: 'more likely to trial a new brand than the general market', bold: 'trial a new brand' },
      { num: '68%', txt: 'cite range and charging infrastructure as primary decision factors', bold: 'range and charging' },
    ],
    incomeData: [
      { label: '< $60k',    pct: 22,  lead: false, val: '0.5×' },
      { label: '$60–120k',  pct: 55,  lead: false, val: '1.0×' },
      { label: '$120–160k', pct: 88,  lead: true,  val: '1.7×' },
      { label: '$160k+',    pct: 72,  lead: true,  val: '1.4×' },
    ],
    segments: [
      { label: 'Tech Early Adopters', pct: 100, val: '2.1×' },
      { label: 'Sustainability Champions', pct: 90, val: '1.9×' },
      { label: 'Affluent Professionals', pct: 76, val: '1.6×' },
      { label: 'Young Aspirationals', pct: 62, val: '1.3×' },
    ],
    mapInsight: 'EV Upgrade Shoppers cluster in one-north and Bishan — close to charging infrastructure hubs. Target digitally, convert near charging points.',
    mapInsightBold: 'charging infrastructure hubs',
    districts: [
      { id: 'D5',  x: 100, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'D20', x: 158, y: 74, color: '#8A5C90', textColor: '#fff' },
      { id: 'D12', x: 216, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'D19', x: 286, y: 92, color: '#BEBDE7', textColor: '#4a2a50' },
    ],
    dealerDistricts: [
      { id: 'D5',  x: 218, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'D14', x: 288, y: 92, color: '#8A5C90', textColor: '#fff' },
      { id: 'D12', x: 190, y: 122, color: '#6B3C72', textColor: '#fff' },
    ],
    brief: {
      northStar: "Lead with technology leadership and Singapore's Green Plan — this audience self-selects on innovation, not prestige",
      say: 'Range confidence, Green Plan rebates, total cost of ownership',
      show: 'Precision technology — clean lines, data dashboards, sustainability metrics',
      where: 'Digital-first: YouTube, EV forums, social media; charging station OOH',
      when: 'Post-Budget announcement windows; Q1 and Q3 consideration peaks',
      avoid: 'Heritage and legacy messaging — they actively reject traditional auto cues',
    },
  },
  'family-suv-upgraders': {
    headline: "Singapore families upgrading before school enrolment — safety credentials win the decision, COE maths seals it.",
    headlineHighlights: ['safety credentials', 'COE maths'],
    pillars: [
      { num: '2.1×', txt: 'more likely to upgrade when a school enrolment trigger occurs', bold: 'school enrolment trigger' },
      { num: '78%', txt: 'involve both partners in the final purchase decision', bold: 'both partners' },
    ],
    incomeData: [
      { label: '< $60k',    pct: 30,  lead: false, val: '0.6×' },
      { label: '$60–120k',  pct: 72,  lead: false, val: '1.3×' },
      { label: '$120–160k', pct: 100, lead: true,  val: '1.8×' },
      { label: '$160k+',    pct: 55,  lead: false, val: '1.0×' },
    ],
    segments: [
      { label: 'Growing Families',  pct: 100, val: '2.0×' },
      { label: 'Suburban Parents',  pct: 90,  val: '1.8×' },
      { label: 'School Gate Crowd', pct: 78,  val: '1.5×' },
      { label: 'Weekend Travellers', pct: 60,  val: '1.2×' },
    ],
    mapInsight: 'Family SUV Upgraders cluster near primary school corridors in the east and west — weekend showroom visits peak on Saturday afternoons after school activities.',
    mapInsightBold: 'primary school corridors',
    districts: [
      { id: 'D18', x: 100, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'D16', x: 158, y: 74, color: '#BEBDE7', textColor: '#4a2a50' },
      { id: 'D19', x: 216, y: 78, color: '#8A5C90', textColor: '#fff' },
      { id: 'D27', x: 286, y: 92, color: '#6B3C72', textColor: '#fff' },
    ],
    dealerDistricts: [
      { id: 'D18', x: 218, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'D3',  x: 288, y: 92, color: '#8A5C90', textColor: '#fff' },
      { id: 'D22', x: 190, y: 122, color: '#6B3C72', textColor: '#fff' },
    ],
    brief: {
      northStar: "Win the family conversation — safety and practicality close the deal, school-gate word-of-mouth seals retention",
      say: '5-star safety, boot space, school-run versatility, COE value',
      show: 'Real families in real Singapore life — school gates, weekend drives to JB',
      where: 'Facebook & WhatsApp communities; school-zone OOH; weekend lifestyle press',
      when: 'P1 registration (Jan–Feb), mid-year school break, year-end COE renewal cycle',
      avoid: 'Performance and sport messaging — it actively alienates the primary buyer',
    },
  },
};

// ── Sub-components ───────────────────────────────────────────────────────────

function Tabs({ options, active, onChange }: { options: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex gap-0 border-b border-[#e5e5e2] mb-3">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`font-['Jua',sans-serif] text-[12px] pb-2 px-0.5 mr-[18px] border-b-2 transition-colors -mb-px ${
            active === o ? 'text-[#6b3c72] border-[#6b3c72]' : 'text-[#9a9a9a] border-transparent hover:text-[#6b6b6b]'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function BarRow({ label, pct, lead, val }: { label: string; pct: number; lead: boolean; val: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="font-['Jua',sans-serif] text-[11.5px] text-[#1a1a1a] w-[118px] shrink-0 truncate">{label}</span>
      <div className="flex-1 h-[7px] rounded-full bg-[#fafaf8] border border-[#e5e5e2] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: lead ? '#6b3c72' : '#bebde7' }} />
      </div>
      <span className="font-['Jua',sans-serif] text-[11.5px] text-[#6b6b6b] w-[36px] text-right shrink-0">{val}</span>
    </div>
  );
}

function TakeawayInline({ text }: { text: React.ReactNode }) {
  return (
    <div className="flex gap-2 items-start bg-[#f1e9ff] rounded-[10px] px-3 py-2 mt-3">
      <svg className="w-[13px] h-[13px] text-[#6b3c72] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2"/>
      </svg>
      <p className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] leading-[1.5]">{text}</p>
    </div>
  );
}

function SectionHead({ num, title, aside }: { num: string; title: string; aside?: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-[21px] h-[21px] rounded-[6px] bg-[#f1e9ff] text-[#6b3c72] font-['Jua',sans-serif] text-[12px] flex items-center justify-center shrink-0">{num}</div>
      <span className="font-['Jua',sans-serif] text-[15px] text-[#1a1a1a]">{title}</span>
      {aside && <span className="ml-auto font-['Jua',sans-serif] text-[11px] text-[#9a9a9a]">{aside}</span>}
    </div>
  );
}

function MapSVG({ districts }: { districts: { id: string; x: number; y: number; color: string; textColor: string }[] }) {
  const polys = [
    { pts: '60,57 120,45 150,74 110,98 65,90', i: 0 },
    { pts: '150,74 120,45 185,37 215,66 180,94 110,98', i: 1 },
    { pts: '215,66 185,37 255,45 270,82 230,98 180,94', i: 2 },
    { pts: '270,82 255,45 320,62 330,103 285,115 230,98', i: 3 },
    { pts: '180,94 230,98 285,115 250,139 175,135 130,123 110,98', i: 4 },
    { pts: '330,103 320,62 360,78 355,123 285,115', i: 5 },
  ];
  const colors = districts.map(d => d.color);
  const fills = [colors[0] ?? '#BEBDE7', colors[1] ?? '#D9CCE3', colors[2] ?? '#BEBDE7', colors[3] ?? '#6B3C72', '#D9CCE3', '#F1E9FF'];

  return (
    <svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg" className="block w-full h-auto">
      <rect width="400" height="150" fill="#FAFAF8"/>
      {polys.map((p) => (
        <polygon key={p.i} points={p.pts} fill={fills[p.i]} />
      ))}
      {districts.map((d) => (
        <text key={d.id} x={d.x} y={d.y} fontFamily="Jua" fontSize="10" fill={d.textColor}>{d.id}</text>
      ))}
    </svg>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function AudienceDetailPanel({ audienceId, screen, onClose }: { audienceId: AudienceId; screen: Screen; onClose?: () => void }) {
  const [mainTab, setMainTab] = useState<'preview' | 'data'>('preview');
  const [whoTab, setWhoTab] = useState('Demographics');
  const [whereTab, setWhereTab] = useState('Live');
  const [howTab, setHowTab] = useState('Brief');
  const [showExport, setShowExport] = useState(false);

  const audience = AUDIENCES.find((a) => a.id === audienceId)!;
  const ext = EXTENDED[audienceId];

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* ── Top tab bar ── */}
      <div className="flex-none flex items-center gap-1.5 px-4 py-2.5 border-b border-[#e5e5e2] bg-white">
        <button
          onClick={() => setMainTab('preview')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-['Jua',sans-serif] text-[12px] transition-colors ${mainTab === 'preview' ? 'bg-[#f1e9ff] text-[#6b3c72]' : 'text-[#6b6b6b] hover:bg-gray-50'}`}
        >
          <FileText className="w-3.5 h-3.5" />Preview
        </button>
        <button
          onClick={() => setMainTab('data')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-['Jua',sans-serif] text-[12px] transition-colors ${mainTab === 'data' ? 'bg-[#f1e9ff] text-[#6b3c72]' : 'text-[#6b6b6b] hover:bg-gray-50'}`}
        >
          <Search className="w-3.5 h-3.5" />Data Explorer
        </button>

        <div className="ml-auto flex items-center gap-1.5">
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#6b3c72] text-[#6b3c72] rounded-lg font-['Jua',sans-serif] text-[12px] hover:bg-[#f5f0ff] transition-colors">
            <Bookmark className="w-3 h-3" />Save
          </button>
          {onClose && (
            <button onClick={onClose} className="w-[30px] h-[30px] flex items-center justify-center border border-[#e5e5e2] rounded-lg hover:bg-gray-50 transition-colors" title="Close">
              <X className="w-3.5 h-3.5 text-[#6b6b6b]" />
            </button>
          )}
          <div className="relative">
            <button
              onClick={() => setShowExport(v => !v)}
              className="w-[30px] h-[30px] flex items-center justify-center border border-[#e5e5e2] rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#6b6b6b]" />
            </button>
            {showExport && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowExport(false)} />
                <div className="absolute right-0 top-[36px] z-20 w-40 bg-white border border-[#e5e5e2] rounded-lg shadow-lg py-1">
                  <button className="w-full px-3 py-2 text-left font-['Jua',sans-serif] text-[12px] hover:bg-gray-50">Export as PDF</button>
                  <button className="w-full px-3 py-2 text-left font-['Jua',sans-serif] text-[12px] hover:bg-gray-50">Export as PNG</button>
                </div>
              </>
            )}
          </div>
          <button className="w-[30px] h-[30px] flex items-center justify-center border border-[#e5e5e2] rounded-lg hover:bg-gray-50 transition-colors">
            <MoreHorizontal className="w-3.5 h-3.5 text-[#6b6b6b]" />
          </button>
        </div>
      </div>

      {mainTab === 'data' && (
        <div className="flex-1 overflow-hidden bg-white">
          <DataExplorerPanel screen={screen} selectedAudienceId={audienceId} />
        </div>
      )}

      {mainTab === 'preview' && (
        <>
          {/* ── Hero band ── */}
          <div className="flex-none bg-[#6b3c72] px-5 py-3.5">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="font-['Jua',sans-serif] text-[17px] text-white leading-tight">{audience.name}</span>
              <span className="px-2 py-0.5 bg-white/20 rounded-[7px] font-['Jua',sans-serif] text-[11px] text-white">Draft</span>
            </div>
            <p className="font-['Jua',sans-serif] text-[12px] text-white/80">{audience.shortDesc}</p>
          </div>

          {/* ── Scrollable body ── */}
          <div className="flex-1 overflow-y-auto bg-[#fafaf9] px-5">

            {/* THE READ */}
            <div className="py-4 border-b border-[#e5e5e2]">
              <p className="font-['Jua',sans-serif] text-[16px] text-[#1a1a1a] leading-[1.35] mb-3">
                {ext?.headline ?? audience.description}
              </p>
              {ext?.pillars.map((p) => (
                <div key={p.num} className="flex gap-3 items-baseline mb-2">
                  <span className="font-['Jua',sans-serif] text-[16px] text-[#6b3c72] min-w-[52px] shrink-0">{p.num}</span>
                  <span className="font-['Jua',sans-serif] text-[12px] text-[#6b6b6b] leading-[1.5]">
                    {p.txt.split(p.bold).map((part, i) =>
                      i === 0 ? part : <span key={i}><strong className="text-[#1a1a1a]">{p.bold}</strong>{part}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* §1 WHO THEY ARE */}
            <div className="py-4 border-b border-[#e5e5e2]">
              <SectionHead num="1" title="Who they are" aside="Indexed vs national" />
              <Tabs options={['Demographics', 'Income', 'Segments', 'Behaviours']} active={whoTab} onChange={setWhoTab} />

              {whoTab === 'Demographics' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Core age', value: audience.demographic.age, idx: '1.6×', lead: true },
                      { label: 'Gender', value: audience.demographic.gender, idx: '0.9×', lead: false },
                      { label: 'Occupation', value: 'Professional', idx: '1.4×', lead: true },
                      { label: 'Life stage', value: 'Est. family', idx: '1.5×', lead: true },
                    ].map((c) => (
                      <div key={c.label} className="border border-[#e5e5e2] rounded-[10px] px-3 py-2 bg-white flex items-center justify-between gap-2">
                        <div>
                          <p className="font-['Jua',sans-serif] text-[9.5px] uppercase tracking-[0.05em] text-[#9a9a9a]">{c.label}</p>
                          <p className="font-['Jua',sans-serif] text-[13px] text-[#1a1a1a]">{c.value}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-[6px] font-['Jua',sans-serif] shrink-0 ${
                          c.lead ? 'bg-[#f1e9ff] text-[#6b3c72]' : 'bg-white border border-[#e5e5e2] text-[#9a9a9a]'
                        }`}>
                          {c.lead && <svg className="w-[9px] h-[9px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5l7 12H5z"/></svg>}
                          {c.idx}
                        </span>
                      </div>
                    ))}
                  </div>
                  <TakeawayInline text={<>A <strong className="text-[#6b3c72]">mid-career, family-stage professional</strong> core — affluent enough for premium, settled enough to buy considered.</>} />
                </>
              )}

              {whoTab === 'Income' && (
                <>
                  <p className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.06em] text-[#9a9a9a] mb-2">Household income · vs national</p>
                  <div className="flex flex-col gap-2">
                    {(ext?.incomeData ?? []).map((r) => (
                      <BarRow key={r.label} label={r.label} pct={r.pct} lead={r.lead} val={r.val} />
                    ))}
                  </div>
                  <TakeawayInline text={<>The <strong className="text-[#6b3c72]">most affluent auto audience</strong> Lumos tracks — $160k+ households index 2.1×. Lead on reassurance, not price.</>} />
                </>
              )}

              {whoTab === 'Segments' && (
                <>
                  <p className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.06em] text-[#9a9a9a] mb-2">Leading segments · vs national</p>
                  <div className="flex flex-col gap-2">
                    {(ext?.segments ?? []).map((r) => (
                      <BarRow key={r.label} label={r.label} pct={r.pct} lead val={r.val} />
                    ))}
                  </div>
                </>
              )}

              {whoTab === 'Behaviours' && (
                <ul className="flex flex-col gap-2.5">
                  {audience.behaviours.map((b) => (
                    <li key={b} className="flex gap-2 items-start font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] leading-[1.4]">
                      <svg className="w-3 h-3 text-[#6b3c72] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* §2 WHERE THEY LIVE */}
            <div className="py-4 border-b border-[#e5e5e2]">
              <SectionHead num="2" title="Where they live" />
              {ext && (
                <div className="flex gap-2 items-start font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] leading-[1.5] mb-3">
                  <svg className="w-[14px] h-[14px] text-[#6b3c72] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v3M12 20v3M1 12h3M20 12h3"/>
                  </svg>
                  <span>
                    {ext.mapInsight.split(ext.mapInsightBold).map((part, i) =>
                      i === 0 ? part : <span key={i}><strong className="text-[#6b3c72]">{ext.mapInsightBold}</strong>{part}</span>
                    )}
                  </span>
                </div>
              )}
              <Tabs options={['Live', 'Transact']} active={whereTab} onChange={setWhereTab} />

              <div className="relative border border-[#e5e5e2] rounded-[10px] overflow-hidden bg-[#fafaf8]">
                <span className="absolute left-2 top-2 font-['Jua',sans-serif] text-[9.5px] uppercase tracking-[0.08em] text-[#9a9a9a] z-10">
                  {whereTab === 'Live' ? 'Home districts' : 'Dealership zones'}
                </span>
                <div className="absolute top-2 right-2 flex flex-col bg-white/90 border border-[#e5e5e2] rounded-lg overflow-hidden z-10">
                  {[<Plus className="w-3.5 h-3.5" key="p"/>, <Minus className="w-3.5 h-3.5" key="m"/>, <Maximize2 className="w-3 h-3" key="x"/>].map((icon, i) => (
                    <button key={i} className="w-[26px] h-[26px] flex items-center justify-center text-[#6b6b6b] hover:text-[#6b3c72] border-b last:border-b-0 border-[#e5e5e2] transition-colors">
                      {icon}
                    </button>
                  ))}
                </div>
                {ext && <MapSVG districts={whereTab === 'Live' ? ext.districts : ext.dealerDistricts} />}
                <div className="absolute right-2 bottom-2 flex items-center gap-1.5 bg-white/85 px-1.5 py-0.5 rounded-[6px]">
                  <span className="font-['Jua',sans-serif] text-[9.5px] text-[#9a9a9a]">Low</span>
                  <div className="w-[40px] h-[6px] rounded-[4px]" style={{ background: 'linear-gradient(90deg, #F1E9FF, #6B3C72)' }} />
                  <span className="font-['Jua',sans-serif] text-[9.5px] text-[#9a9a9a]">High</span>
                </div>
              </div>
              <button className="flex items-center gap-1.5 mt-2 font-['Jua',sans-serif] text-[12px] text-[#6b3c72] hover:opacity-70 transition-opacity">
                View expanded map
                <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 14v6h6M20 10V4h-6M14 10l6-6M10 14l-6 6"/></svg>
              </button>
            </div>

            {/* §3 HOW TO WIN THEM */}
            <div className="py-4">
              <SectionHead num="3" title="How to win them" />
              <Tabs options={['Brief', 'Channels', 'Competition', 'Messaging']} active={howTab} onChange={setHowTab} />

              {howTab === 'Brief' && ext && (
                <>
                  <div className="flex flex-col">
                    <div className="flex gap-3 py-2 pb-3 mb-1 border-b border-[#e5e5e2]">
                      <span className="font-['Jua',sans-serif] text-[10.5px] uppercase tracking-[0.05em] text-[#6b3c72] w-[54px] shrink-0 mt-0.5">North star</span>
                      <span className="font-['Jua',sans-serif] text-[12.5px] text-[#6b3c72] leading-[1.4]">{ext.brief.northStar}</span>
                    </div>
                    {[
                      { key: 'Say', val: ext.brief.say },
                      { key: 'Show', val: ext.brief.show },
                      { key: 'Where', val: ext.brief.where },
                      { key: 'When', val: ext.brief.when },
                      { key: 'Avoid', val: ext.brief.avoid, muted: true },
                    ].map((r) => (
                      <div key={r.key} className="flex gap-3 py-1.5">
                        <span className="font-['Jua',sans-serif] text-[10.5px] uppercase tracking-[0.05em] text-[#6b3c72] w-[54px] shrink-0 mt-0.5">{r.key}</span>
                        <span className={`font-['Jua',sans-serif] text-[12.5px] leading-[1.4] ${r.muted ? 'text-[#9a9a9a]' : 'text-[#1a1a1a]'}`}>{r.val}</span>
                      </div>
                    ))}
                  </div>
                  <button className="flex items-center gap-1.5 mt-3 font-['Jua',sans-serif] text-[12px] text-[#6b3c72] hover:opacity-70 transition-opacity">
                    Turn this into a brief
                    <ArrowRight className="w-[13px] h-[13px]" />
                  </button>
                </>
              )}

              {howTab === 'Channels' && (
                <>
                  <p className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.06em] text-[#9a9a9a] mb-2">Reachable share · top channels</p>
                  <div className="flex flex-col gap-2">
                    {audience.channels.map((c) => (
                      <BarRow key={c.name} label={c.name} pct={c.pct} lead={c.pct === Math.max(...audience.channels.map(x => x.pct))} val={`${c.pct}%`} />
                    ))}
                  </div>
                </>
              )}

              {howTab === 'Competition' && (
                <>
                  <p className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.06em] text-[#9a9a9a] mb-2">Share of consideration · in this segment</p>
                  <div className="flex flex-col gap-2">
                    {audience.competitorBrands.map((b) => (
                      <BarRow key={b.name} label={b.name} pct={b.pct} lead={b.pct === Math.max(...audience.competitorBrands.map(x => x.pct))} val={`${b.pct}%`} />
                    ))}
                  </div>
                </>
              )}

              {howTab === 'Messaging' && (
                <>
                  <p className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.06em] text-[#9a9a9a] mb-2">Messaging thought starters</p>
                  <ul className="flex flex-col gap-3">
                    {audience.messaging.map((m) => {
                      const [bold, ...rest] = m.split(':');
                      return (
                        <li key={m} className="flex gap-2 items-start font-['Jua',sans-serif] text-[12.5px] text-[#6b6b6b] leading-[1.45]">
                          <svg className="w-[13px] h-[13px] text-[#6b3c72] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8"/></svg>
                          <span><strong className="text-[#1a1a1a]">{bold}:</strong>{rest.join(':')}</span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              <div className="mt-4 pt-3 border-t border-[#e5e5e2] flex justify-center">
                <DataSourcesPopover label="5 data sources" openUpward />
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="flex-none border-t border-[#e5e5e2] px-4 py-3 flex gap-2.5 bg-white">
            <button className="flex-[1.4] flex items-center justify-center gap-2 px-4 py-2.5 bg-[#6b3c72] hover:bg-[#5c2375] text-white rounded-lg font-['Jua',sans-serif] text-[13px] transition-colors">
              <Bookmark className="w-3.5 h-3.5" />Save audience
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-[#e5e5e2] bg-white rounded-lg font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
              Open full
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
