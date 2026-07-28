import { useState, useEffect } from 'react';
import { Bookmark, Download, MoreHorizontal, FileText, ArrowRight, Maximize2, X, Check, PanelRightClose } from 'lucide-react';
import { AUDIENCES, type AudienceId } from '../audienceData';
import type { Screen } from '../App';
import DataSourcesPopover from './DataSourcesPopover';
import AudienceDensity from './AudienceDensity';
import { Module, type ModuleRef } from './ModuleAsk';

// ── Per-audience extended data ───────────────────────────────────────────────

const EXTENDED: Record<string, {
  headline: string; headlineHighlights: string[];
  pillars: { num: string; txt: string; bold: string }[];
  incomeData: { label: string; pct: number; lead: boolean; val: string }[];
  segments: { label: string; pct: number; val: string }[];
  interestsData: { label: string; pct: number; lead: boolean; val: string }[];
  mapInsight: string; mapInsightBold: string;
  districts: { id: string; x: number; y: number; color: string; textColor: string }[];
  dealerDistricts: { id: string; x: number; y: number; color: string; textColor: string }[];
  reach: { channel: string; vals: number[] }[];
  brief: { northStar: string; say: string; show: string; where: string; when: string; avoid: string };
}> = {
  'marsden-park-stockups': {
    headline: "Sydney's furthest-travelling big-basket households — one enormous monthly shop, planned days in advance.",
    headlineHighlights: ['furthest-travelling', 'planned days in advance'],
    pillars: [
      { num: '3.4×', txt: 'larger average basket than the Greater Sydney household', bold: 'larger average basket' },
      { num: '14 km', txt: 'median distance travelled for a single big shop — 2.4× the metro average', bold: 'median distance' },
    ],
    incomeData: [
      { label: '< $80k',    pct: 20,  lead: false, val: '0.4×' },
      { label: '$80–120k',  pct: 58,  lead: false, val: '1.1×' },
      { label: '$120–180k', pct: 100, lead: true,  val: '2.0×' },
      { label: '$180k+',    pct: 64,  lead: true,  val: '1.3×' },
    ],
    segments: [
      { label: 'New-Build Families',  pct: 100, val: '2.2×' },
      { label: 'Two-Car Households',  pct: 92,  val: '1.9×' },
      { label: 'Young Parents',       pct: 88,  val: '1.7×' },
      { label: 'Weekend Sport Families', pct: 74, val: '1.4×' },
    ],
    interestsData: [
      { label: 'Bulk & pantry stock-ups', pct: 100, lead: true,  val: '2.6×' },
      { label: 'New-build home & reno',   pct: 88,  lead: true,  val: '2.1×' },
      { label: 'Junior sport & clubs',    pct: 81,  lead: true,  val: '1.8×' },
      { label: 'Fuel & car servicing',    pct: 72,  lead: false, val: '1.6×' },
      { label: 'Home entertaining',       pct: 61,  lead: false, val: '1.3×' },
      { label: 'Streaming & gaming',      pct: 55,  lead: false, val: '1.2×' },
    ],
    mapInsight: 'Where they live and where they shop sit ~14 km apart — the M7 and Richmond Road corridors sit squarely in between.',
    mapInsightBold: 'squarely in between',
    districts: [
      { id: 'Marsden Pk', x: 100, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'Schofields', x: 158, y: 74, color: '#8A5C90', textColor: '#fff' },
      { id: 'Box Hill',   x: 216, y: 78, color: '#BEBDE7', textColor: '#4a2a50' },
      { id: 'Riverstone', x: 286, y: 92, color: '#6B3C72', textColor: '#fff' },
    ],
    dealerDistricts: [
      { id: 'M7 corridor',  x: 218, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'Richmond Rd',  x: 288, y: 92, color: '#8A5C90', textColor: '#fff' },
      { id: 'Rouse Hill',   x: 190, y: 122, color: '#6B3C72', textColor: '#fff' },
    ],
    reach: [
      { channel: 'Roadside OOH (M7 / Richmond Rd)', vals: [80, 65, 55, 25, 70] },
      { channel: 'Meta / social',                    vals: [35, 55, 78, 45, 60] },
      { channel: 'Catalogue & letterbox',            vals: [70, 50, 40, 20, 55] },
      { channel: 'Radio — commute drive-time',       vals: [75, 60, 45, 20, 50] },
    ],
    brief: {
      northStar: "Reach them on the way, not at home — the trip is decided by Thursday and driven on Saturday morning",
      say: 'One trip, one month sorted; membership pays for itself in two shops',
      show: 'A full trolley and a full boot — the scale of one trip, not a product shot',
      where: 'Roadside OOH along the M7 and Richmond Road; Meta; drive-time radio',
      when: 'Thursday to Saturday, weighted to the start of each month and back-to-school',
      avoid: 'Small-basket convenience messaging — it undersells the whole proposition',
    },
  },
  'parramatta-value-families': {
    headline: 'Sydney’s highest-volume households — two families shopping as one, deciding on unit price alone.',
    headlineHighlights: ['highest-volume', 'unit price alone'],
    pillars: [
      { num: '2.8×', txt: 'more likely to shop for more than one household in a single trip', bold: 'more than one household' },
      { num: '61%', txt: 'cross-shop discount grocers and switch on unit price rather than brand', bold: 'switch on unit price' },
    ],
    incomeData: [
      { label: '< $80k',    pct: 46,  lead: false, val: '0.9×' },
      { label: '$80–120k',  pct: 100, lead: true,  val: '1.9×' },
      { label: '$120–180k', pct: 74,  lead: true,  val: '1.5×' },
      { label: '$180k+',    pct: 32,  lead: false, val: '0.6×' },
    ],
    segments: [
      { label: 'Multi-Generational Homes', pct: 100, val: '2.4×' },
      { label: 'Multicultural Families',   pct: 96,  val: '2.1×' },
      { label: 'Value Seekers',            pct: 84,  val: '1.7×' },
      { label: 'Community Networks',       pct: 70,  val: '1.4×' },
    ],
    interestsData: [
      { label: 'Bulk fresh & staples',   pct: 100, lead: true,  val: '2.5×' },
      { label: 'Cooking at scale',       pct: 90,  lead: true,  val: '2.2×' },
      { label: 'Cricket & soccer',       pct: 82,  lead: true,  val: '1.8×' },
      { label: 'Money-saving & cashback', pct: 76, lead: false, val: '1.6×' },
      { label: 'Community & faith groups', pct: 68, lead: false, val: '1.4×' },
      { label: 'International travel',    pct: 57,  lead: false, val: '1.2×' },
    ],
    mapInsight: 'They cluster tightly along the Parramatta–Granville–Auburn spine — a short-drive and public-transport catchment, not a highway one.',
    mapInsightBold: 'short-drive and public-transport catchment',
    districts: [
      { id: 'Parramatta', x: 100, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'Granville',  x: 158, y: 74, color: '#8A5C90', textColor: '#fff' },
      { id: 'Merrylands', x: 216, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'Auburn',     x: 286, y: 92, color: '#BEBDE7', textColor: '#4a2a50' },
    ],
    dealerDistricts: [
      { id: 'Church St',      x: 218, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'Parramatta Rd',  x: 288, y: 92, color: '#8A5C90', textColor: '#fff' },
      { id: 'Westmead',       x: 190, y: 122, color: '#6B3C72', textColor: '#fff' },
    ],
    reach: [
      { channel: 'Digital OOH — Parramatta CBD', vals: [72, 68, 60, 35, 65] },
      { channel: 'Multicultural radio & press',   vals: [65, 55, 50, 30, 58] },
      { channel: 'WhatsApp & community referral', vals: [45, 50, 72, 55, 70] },
      { channel: 'Catalogue & letterbox',         vals: [60, 45, 38, 22, 50] },
    ],
    brief: {
      northStar: 'Win on unit price and let the community do the rest — referral is the strongest acquisition channel this cluster has',
      say: 'Price per unit, size of the pack, what the trolley costs versus last week',
      show: 'Real household scale — the shop that feeds a large or shared family',
      where: 'Digital OOH around the Parramatta interchange; multicultural radio; referral mechanics',
      when: 'Fortnightly pay cycles, Sunday afternoons, and the Ramadan / Diwali / Lunar New Year peaks',
      avoid: 'Premium and provenance messaging — it reads as a price signal they do not want',
    },
  },
  'castle-hill-bulk-buyers': {
    headline: 'The Hills District’s highest-value trolleys — fewest trips, biggest baskets, and already a member somewhere else.',
    headlineHighlights: ['highest-value trolleys', 'already a member'],
    pillars: [
      { num: '4.1×', txt: 'higher average basket value than the Greater Sydney household', bold: 'higher average basket value' },
      { num: '2 in 3', txt: 'already hold a warehouse-club membership elsewhere — this is a switch, not a first trial', bold: 'already hold a membership' },
    ],
    incomeData: [
      { label: '< $80k',    pct: 14,  lead: false, val: '0.3×' },
      { label: '$80–120k',  pct: 38,  lead: false, val: '0.7×' },
      { label: '$120–180k', pct: 82,  lead: true,  val: '1.6×' },
      { label: '$180k+',    pct: 100, lead: true,  val: '2.2×' },
    ],
    segments: [
      { label: 'Established Families',  pct: 100, val: '2.0×' },
      { label: 'Home Entertainers',     pct: 92,  val: '1.8×' },
      { label: 'Private School Parents', pct: 80, val: '1.6×' },
      { label: 'Existing Club Members',  pct: 76, val: '1.5×' },
    ],
    interestsData: [
      { label: 'Premium bulk & entertaining', pct: 100, lead: true,  val: '2.3×' },
      { label: 'Wine & specialty food',       pct: 87,  lead: true,  val: '2.0×' },
      { label: 'Home & garden',               pct: 80,  lead: true,  val: '1.8×' },
      { label: 'Travel',                      pct: 72,  lead: false, val: '1.6×' },
      { label: 'Fitness & wellbeing',         pct: 64,  lead: false, val: '1.4×' },
      { label: 'Private schooling',           pct: 58,  lead: false, val: '1.3×' },
    ],
    mapInsight: 'Concentrated across Castle Hill, Baulkham Hills and Kellyville — Windsor Road and Old Northern Road carry almost every trip.',
    mapInsightBold: 'carry almost every trip',
    districts: [
      { id: 'Castle Hill',    x: 100, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'Baulkham Hills', x: 158, y: 74, color: '#BEBDE7', textColor: '#4a2a50' },
      { id: 'Kellyville',     x: 216, y: 78, color: '#8A5C90', textColor: '#fff' },
      { id: 'Bella Vista',    x: 286, y: 92, color: '#6B3C72', textColor: '#fff' },
    ],
    dealerDistricts: [
      { id: 'Windsor Rd',      x: 218, y: 78, color: '#6B3C72', textColor: '#fff' },
      { id: 'Old Northern Rd', x: 288, y: 92, color: '#8A5C90', textColor: '#fff' },
      { id: 'Norwest',         x: 190, y: 122, color: '#6B3C72', textColor: '#fff' },
    ],
    reach: [
      { channel: 'Roadside OOH — Windsor Rd',    vals: [76, 62, 48, 22, 66] },
      { channel: 'Retail media & search',        vals: [50, 58, 70, 45, 62] },
      { channel: 'Email / CRM',                  vals: [42, 55, 60, 30, 48] },
      { channel: 'Local press & school networks', vals: [58, 50, 44, 25, 55] },
    ],
    brief: {
      northStar: 'This is a share-of-wallet fight, not an acquisition one — give them a reason to compare the trolley',
      say: 'Range, quality and what a full trip actually costs against their current club',
      show: 'The long table — entertaining scale, premium and imported lines',
      where: 'Windsor Road and Old Northern Road OOH; retail media; CRM to existing members',
      when: 'Two to three days ahead of a monthly trip; heavy Easter, September and November–December weighting',
      avoid: 'Deep-discount framing — it undercuts the quality case that wins the switch',
    },
  },
};

export type GeoModeKey = 'Residential' | 'Daytime' | 'Transaction';
export type DayTypeKey = 'Weekday' | 'Weekend';

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

function SectionHead({ num, title, aside, reserveAsk }: { num: string; title: string; aside?: string; reserveAsk?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 mb-3 ${reserveAsk ? 'pr-[64px]' : ''}`}>
      <div className="w-[21px] h-[21px] rounded-[6px] bg-[#f1e9ff] text-[#6b3c72] font-['Jua',sans-serif] text-[12px] flex items-center justify-center shrink-0">{num}</div>
      <span className="font-['Jua',sans-serif] text-[15px] text-[#1a1a1a]">{title}</span>
      {aside && <span className="ml-auto font-['Jua',sans-serif] text-[11px] text-[#9a9a9a]">{aside}</span>}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function AudienceDetailPanel({ audienceId, onClose, onCollapse, onAskInChat, onOpenFullPage, isSaved = false, onSave }: { audienceId: AudienceId; screen?: Screen; onClose?: () => void; onCollapse?: () => void; onAskInChat?: (ref: ModuleRef) => void; onOpenFullPage?: (id: AudienceId, name: string) => void; isSaved?: boolean; onSave?: (id: AudienceId) => void }) {
  const [whoTab, setWhoTab] = useState('Demographics');
  const [howTab, setHowTab] = useState('Brief');
  const [showExport, setShowExport] = useState(false);

  const audience = AUDIENCES.find((a) => a.id === audienceId)!;
  const ext = EXTENDED[audienceId];

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* ── Top tab bar ── */}
      <div className="flex-none flex items-center gap-1.5 px-4 py-2.5 border-b border-[#e5e5e2] bg-white">
        {onCollapse ? (
          <button
            onClick={onCollapse}
            title="Hide this panel — the map takes the full stage"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-['Jua',sans-serif] text-[12px] bg-[#f1e9ff] text-[#6b3c72] hover:bg-[#e7dbff] transition-colors"
          >
            <PanelRightClose className="w-3.5 h-3.5" />Hide
          </button>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-['Jua',sans-serif] text-[12px] bg-[#f1e9ff] text-[#6b3c72]">
            <FileText className="w-3.5 h-3.5" />Preview
          </div>
        )}
        {onOpenFullPage && (
          <button
            onClick={() => onOpenFullPage(audienceId, audience.name)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-['Jua',sans-serif] text-[12px] text-[#6b6b6b] hover:bg-gray-50 transition-colors"
            title="Open the full audience page"
          >
            <Maximize2 className="w-3.5 h-3.5" />View Full Page
          </button>
        )}

        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={() => onSave?.(audienceId)}
            title={isSaved ? 'Saved to your Audiences library' : 'Save to your Audiences library'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-['Jua',sans-serif] text-[12px] transition-colors ${isSaved ? 'border border-[#1D9E75] bg-[#1D9E75] text-white' : 'border border-[#6b3c72] text-[#6b3c72] hover:bg-[#f5f0ff]'}`}
          >
            {isSaved ? <Check className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}{isSaved ? 'Saved' : 'Save'}
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

      <>
          {/* ── Hero band ── */}
          <div className="flex-none bg-[#6b3c72] px-5 py-3.5">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="font-['Jua',sans-serif] text-[17px] text-white leading-tight">{audience.name}</span>
              <span className={`px-2 py-0.5 rounded-[7px] font-['Jua',sans-serif] text-[11px] text-white ${isSaved ? 'bg-[#1D9E75]' : 'bg-white/20'}`}>{isSaved ? 'Saved' : 'Draft'}</span>
            </div>
            <p className="font-['Jua',sans-serif] text-[12px] text-white/80">{audience.shortDesc}</p>
          </div>

          {/* ── Scrollable body ── */}
          <div className="flex-1 overflow-y-auto bg-[#fafaf9] px-5">

            {/* THE READ */}
            <Module id={`aud:${audienceId}:read`} label="The read" audience={audience.name} onAsk={onAskInChat}>
              <div className="py-4 border-b border-[#e5e5e2]">
                <p className="font-['Jua',sans-serif] text-[16px] text-[#1a1a1a] leading-[1.35] mb-3 pr-12">
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
            </Module>

            {/* §1 WHO THEY ARE */}
            <Module id={`aud:${audienceId}:who`} label="Who they are" audience={audience.name} state={[whoTab]} onAsk={onAskInChat}>
            <div className="py-4 border-b border-[#e5e5e2]">
              <SectionHead num="1" title="Who they are" aside="Indexed vs national" reserveAsk />
              <Tabs options={['Demographics', 'Income', 'Segments', 'Interests', 'Behaviours']} active={whoTab} onChange={setWhoTab} />

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

              {whoTab === 'Interests' && (
                <>
                  <p className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.06em] text-[#9a9a9a] mb-2">Top interests &amp; affinities · vs national</p>
                  <div className="flex flex-col gap-2">
                    {(ext?.interestsData ?? []).map((r) => (
                      <BarRow key={r.label} label={r.label} pct={r.pct} lead={r.lead} val={r.val} />
                    ))}
                  </div>
                  <TakeawayInline text={<>Interest categories and hobbies — <strong className="text-[#6b3c72]">affinities, not purchase intent</strong>. Use these to find lookalikes and to theme creative, not to time the buy.</>} />
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
            </Module>

            {/* §2 WHEN TO REACH THEM — temporal density */}
            {/* The Residential/Daytime/Transaction × Weekday/Weekend lens now lives
                on the LumosMap, so this section drops the switches and focuses on
                timing: the hour × day density heatmap and its best-window takeaway. */}
            <Module id={`aud:${audienceId}:when`} label="When to reach them" audience={audience.name} onAsk={onAskInChat}>
            <div className="py-4 border-b border-[#e5e5e2]">
              <SectionHead num="2" title="When to reach them" aside="Best time to reach" reserveAsk />
              <AudienceDensity audienceId={audienceId} mode="Residential" variant="panel" />
            </div>
            </Module>

            {/* §3 HOW TO WIN THEM */}
            <Module id={`aud:${audienceId}:how`} label="How to win them" audience={audience.name} state={[howTab]} onAsk={onAskInChat}>
            <div className="py-4">
              <SectionHead num="3" title="How to win them" reserveAsk />
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
            </Module>
          </div>

          {/* ── Footer ── */}
          <div className="flex-none border-t border-[#e5e5e2] px-4 py-3 flex gap-2.5 bg-white">
            <button
              onClick={() => onSave?.(audienceId)}
              className={`flex-[1.4] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-['Jua',sans-serif] text-[13px] transition-colors ${isSaved ? 'bg-white border border-[#6b3c72] text-[#6b3c72] hover:bg-[#f5f0ff]' : 'bg-[#6b3c72] hover:bg-[#5c2375] text-white'}`}
            >
              {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}{isSaved ? 'Saved to library' : 'Save audience'}
            </button>
            <button
              onClick={() => onOpenFullPage?.(audienceId, audience.name)}
              disabled={!onOpenFullPage}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-[#e5e5e2] bg-white rounded-lg font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Open full
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
      </>
    </div>
  );
}
