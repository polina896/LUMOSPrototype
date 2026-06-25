import { useState, useEffect } from 'react';
import { Bookmark, Download, MoreHorizontal, FileText, Search, ArrowRight, Maximize2, Plus, Minus, X } from 'lucide-react';
import { AUDIENCES, type AudienceId } from '../audienceData';
import type { Screen } from '../App';
import DataExplorerPanel from './DataExplorerPanel';
import DataSourcesPopover from './DataSourcesPopover';
import { Module } from './ModuleAsk';

// ── Per-audience extended data ───────────────────────────────────────────────

// Reachability matrix shown in the expand-map view: rows = channels, columns below.
const REACH_WINDOWS = ['Early AM', 'Daytime', 'Evening', 'Late', 'Weekend'] as const;

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
    interestsData: [
      { label: 'Golf & country clubs',   pct: 100, lead: true,  val: '2.2×' },
      { label: 'Fine dining & wine',     pct: 86,  lead: true,  val: '1.9×' },
      { label: 'Luxury travel & resorts', pct: 82, lead: true,  val: '1.8×' },
      { label: 'Watches & collectibles', pct: 73,  lead: false, val: '1.6×' },
      { label: 'Sailing & yachting',     pct: 64,  lead: false, val: '1.4×' },
      { label: 'Art & auctions',         pct: 59,  lead: false, val: '1.3×' },
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
    reach: [
      { channel: 'LinkedIn / Digital',   vals: [40, 70, 85, 30, 45] },
      { channel: 'YouTube pre-roll',      vals: [25, 45, 80, 55, 50] },
      { channel: 'OOH / Premium print',   vals: [75, 60, 50, 20, 65] },
      { channel: 'Email / CRM',           vals: [35, 55, 45, 15, 30] },
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
    interestsData: [
      { label: 'Tech & gadgets',         pct: 100, lead: true,  val: '2.4×' },
      { label: 'Cycling & triathlon',    pct: 84,  lead: true,  val: '2.0×' },
      { label: 'Sustainable living',     pct: 80,  lead: true,  val: '1.9×' },
      { label: 'Smart home & IoT',       pct: 71,  lead: false, val: '1.7×' },
      { label: 'Trail running & outdoors', pct: 63, lead: false, val: '1.5×' },
      { label: 'Gaming & esports',       pct: 55,  lead: false, val: '1.3×' },
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
    reach: [
      { channel: 'Mobile / App',          vals: [88, 60, 55, 40, 50] },
      { channel: 'YouTube / Digital video', vals: [70, 50, 60, 45, 55] },
      { channel: 'Social media',          vals: [45, 55, 75, 50, 60] },
      { channel: 'EV forums & communities', vals: [50, 40, 60, 45, 72] },
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
    interestsData: [
      { label: 'Camping & outdoors',     pct: 100, lead: true,  val: '2.1×' },
      { label: 'Youth sports & coaching', pct: 88, lead: true,  val: '1.9×' },
      { label: 'Road trips & overlanding', pct: 84, lead: true, val: '1.8×' },
      { label: 'Home improvement & DIY', pct: 73,  lead: false, val: '1.6×' },
      { label: 'Family cycling',         pct: 63,  lead: false, val: '1.4×' },
      { label: 'Hiking & nature parks',  pct: 58,  lead: false, val: '1.3×' },
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
    reach: [
      { channel: 'Facebook / Meta',        vals: [40, 55, 70, 35, 65] },
      { channel: 'WhatsApp communities',    vals: [45, 50, 68, 40, 60] },
      { channel: 'Digital OOH near schools', vals: [78, 70, 40, 15, 55] },
      { channel: 'YouTube family content',  vals: [30, 45, 55, 25, 80] },
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

// ── Geo intelligence: residential / daytime / transaction, weekday vs weekend ──

type GeoDistrict = { id: string; x: number; y: number; color: string; textColor: string };
type GeoView = { districts: GeoDistrict[]; insight: string; insightBold: string; window: string; times: { slot: string; pct: number }[] };
type GeoMode = { mapLabel: string; weekday: GeoView; weekend: GeoView };
type GeoData = { Residential: GeoMode; Daytime: GeoMode; Transaction: GeoMode };
export type GeoModeKey = 'Residential' | 'Daytime' | 'Transaction';
export type DayTypeKey = 'Weekday' | 'Weekend';

const GEO_TONE = {
  hi:    { color: '#6B3C72', textColor: '#ffffff' },
  mid:   { color: '#8A5C90', textColor: '#ffffff' },
  lo:    { color: '#BEBDE7', textColor: '#4a2a50' },
  faint: { color: '#D9CCE3', textColor: '#4a2a50' },
} as const;
const GEO_POS = [{ x: 100, y: 78 }, { x: 158, y: 74 }, { x: 216, y: 78 }, { x: 286, y: 92 }];
const GEO_SLOTS = ['Morning', 'Midday', 'Afternoon', 'Evening'] as const;
type Tone = keyof typeof GEO_TONE;

function gv(
  ids: [string, string, string, string],
  tones: [Tone, Tone, Tone, Tone],
  insight: string, insightBold: string, windowLabel: string, times: [number, number, number, number],
): GeoView {
  return {
    districts: ids.map((id, i) => ({ id, x: GEO_POS[i].x, y: GEO_POS[i].y, ...GEO_TONE[tones[i]] })),
    insight, insightBold, window: windowLabel,
    times: GEO_SLOTS.map((slot, i) => ({ slot, pct: times[i] })),
  };
}

const GEO: Record<string, GeoData> = {
  'premium-sedan-intenders': {
    Residential: {
      mapLabel: 'Home districts',
      weekday: gv(['D10', 'D11', 'D9', 'D15'], ['hi', 'mid', 'lo', 'faint'], "Anchored in prime districts 9–11 — Singapore's affluent central core.", 'districts 9–11', 'Weekday 7–10pm', [12, 16, 28, 44]),
      weekend: gv(['D10', 'D11', 'D9', 'D15'], ['hi', 'mid', 'lo', 'faint'], 'Home on weekend mornings, planning showroom visits before midday.', 'weekend mornings', 'Weekend 9am–12pm', [42, 32, 18, 14]),
    },
    Daytime: {
      mapLabel: 'Daytime hotspots',
      weekday: gv(['D1', 'D2', 'D6', 'D9'], ['hi', 'mid', 'mid', 'lo'], 'Office hours cluster in the CBD around Raffles Place & Marina.', 'the CBD', 'Weekday 12–2pm', [18, 42, 28, 12]),
      weekend: gv(['D9', 'D10', 'D11', 'D15'], ['hi', 'mid', 'lo', 'faint'], 'Weekends shift to Orchard & lifestyle enclaves.', 'Orchard & lifestyle enclaves', 'Weekend 11am–2pm', [22, 40, 30, 8]),
    },
    Transaction: {
      mapLabel: 'Spend & showroom zones',
      weekday: gv(['D9', 'D1', 'D10', 'D6'], ['hi', 'mid', 'lo', 'faint'], 'Weekday spend skews to premium retail & dining in Orchard.', 'premium retail & dining', 'Weekday 6–9pm', [10, 22, 30, 38]),
      weekend: gv(['D14', 'D3', 'D9', 'D15'], ['hi', 'mid', 'lo', 'faint'], 'Saturday showroom visits peak in the dealership belt (D3, D14).', 'showroom visits', 'Saturday 11am–3pm', [20, 40, 32, 8]),
    },
  },
  'ev-upgrade-shoppers': {
    Residential: {
      mapLabel: 'Home districts',
      weekday: gv(['D5', 'D20', 'D12', 'D19'], ['hi', 'mid', 'lo', 'faint'], 'Cluster near one-north & Bishan — close to charging hubs.', 'charging hubs', 'Weekday 7–9am', [44, 24, 20, 12]),
      weekend: gv(['D5', 'D20', 'D12', 'D19'], ['hi', 'mid', 'lo', 'faint'], 'Home-based weekend mornings, comparing models online.', 'weekend mornings', 'Weekend 9–11am', [40, 30, 18, 12]),
    },
    Daytime: {
      mapLabel: 'Daytime hotspots',
      weekday: gv(['D1', 'D5', 'D3', 'D12'], ['hi', 'mid', 'mid', 'lo'], 'Daytime in the one-north & CBD tech corridor.', 'tech corridor', 'Weekday 7–9am', [40, 26, 22, 12]),
      weekend: gv(['D5', 'D12', 'D19', 'D20'], ['hi', 'mid', 'lo', 'faint'], 'Weekends near charging stops & lifestyle malls.', 'charging stops', 'Weekend 10am–1pm', [22, 38, 28, 12]),
    },
    Transaction: {
      mapLabel: 'Spend & showroom zones',
      weekday: gv(['D1', 'D5', 'D3', 'D12'], ['hi', 'mid', 'lo', 'faint'], 'Weekday spend is digital-first — app & online, low foot traffic.', 'digital-first', 'Weekday 7–9am', [38, 24, 24, 14]),
      weekend: gv(['D5', 'D14', 'D12', 'D19'], ['hi', 'mid', 'lo', 'faint'], 'Weekend test-drives cluster near EV showrooms & charging points.', 'test-drives', 'Weekend 11am–2pm', [20, 40, 28, 12]),
    },
  },
  'family-suv-upgraders': {
    Residential: {
      mapLabel: 'Home districts',
      weekday: gv(['D18', 'D16', 'D19', 'D27'], ['hi', 'mid', 'lo', 'faint'], 'Heartland HDB & condo belts in the east and west.', 'east and west', 'Weekday 8–10pm', [16, 18, 30, 36]),
      weekend: gv(['D18', 'D16', 'D19', 'D27'], ['hi', 'mid', 'lo', 'faint'], 'Home base for weekend family routines & school runs.', 'weekend family routines', 'Weekend 9am–12pm', [38, 30, 20, 12]),
    },
    Daytime: {
      mapLabel: 'Daytime hotspots',
      weekday: gv(['D18', 'D1', 'D16', 'D19'], ['hi', 'mid', 'lo', 'faint'], 'Split between workplaces and school-zone corridors.', 'school-zone corridors', 'Weekday 8–9am', [36, 22, 28, 14]),
      weekend: gv(['D18', 'D16', 'D19', 'D27'], ['hi', 'mid', 'lo', 'faint'], 'Weekends at malls, enrichment centres & nature parks.', 'malls & nature parks', 'Weekend 10am–1pm', [24, 38, 30, 8]),
    },
    Transaction: {
      mapLabel: 'Spend & showroom zones',
      weekday: gv(['D18', 'D16', 'D19', 'D1'], ['hi', 'mid', 'lo', 'faint'], 'Weekday spend near home — groceries, enrichment, fuel.', 'near home', 'Weekday 6–8pm', [12, 20, 32, 36]),
      weekend: gv(['D18', 'D22', 'D3', 'D16'], ['hi', 'mid', 'lo', 'faint'], 'Saturday showroom visits with the family in tow.', 'with the family', 'Saturday 1–4pm', [16, 30, 42, 12]),
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

function SegControl({ options, active, onChange }: { options: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="inline-flex bg-[#f1ecf3] rounded-[8px] p-[3px] gap-[2px]">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`font-['Jua',sans-serif] text-[11px] px-2.5 py-[5px] rounded-[6px] transition-colors whitespace-nowrap ${
            active === o ? 'bg-white text-[#6b3c72] shadow-[0_1px_2px_rgba(0,0,0,0.07)]' : 'text-[#9a9a9a] hover:text-[#6b6b6b]'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function TimesToReach({ times, window: peak }: { times: { slot: string; pct: number }[]; window: string }) {
  const max = Math.max(...times.map((t) => t.pct));
  return (
    <div className="mt-2.5">
      <div className="flex items-center justify-between mb-1.5">
        <p className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.06em] text-[#9a9a9a]">Best times to reach here</p>
        <span className="inline-flex items-center gap-1 font-['Jua',sans-serif] text-[10.5px] text-[#6b3c72] bg-[#f1e9ff] px-1.5 py-0.5 rounded-[5px]">
          <svg className="w-[10px] h-[10px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
          {peak}
        </span>
      </div>
      <div className="flex items-end gap-2 h-[38px] px-0.5">
        {times.map((t) => (
          <div key={t.slot} className="flex-1 flex items-end justify-center h-full">
            <div className="w-full rounded-t-[4px]" style={{ height: `${Math.max(14, (t.pct / max) * 100)}%`, background: t.pct === max ? '#6b3c72' : '#d9cce3' }} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 px-0.5 mt-1">
        {times.map((t) => (
          <span key={t.slot} className={`flex-1 text-center font-['Jua',sans-serif] text-[9px] ${t.pct === max ? 'text-[#6b3c72]' : 'text-[#9a9a9a]'}`}>{t.slot}</span>
        ))}
      </div>
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

// ── Expand-map view: intermediate inspection layer over the sidebar ──────────
function reachShade(v: number, isPeak: boolean) {
  if (isPeak) return { bg: '#6B3C72', fg: '#ffffff' };
  if (v >= 70) return { bg: '#8A5C90', fg: '#ffffff' };
  if (v >= 50) return { bg: '#BEBDE7', fg: '#4a2a50' };
  if (v >= 35) return { bg: '#D9CCE3', fg: '#6b3c72' };
  return { bg: '#F1E9FF', fg: '#cdbfdb' };
}

// Best-time-to-reach as a channel × window heatmap — shown only in the expand-map view.
function ReachMatrix({ rows }: { rows: { channel: string; vals: number[] }[] }) {
  const cols = REACH_WINDOWS;
  const grid = { gridTemplateColumns: `minmax(110px, 150px) repeat(${cols.length}, minmax(0, 1fr))` };
  return (
    <div>
      <div className="flex items-center gap-2 mb-0.5">
        <p className="font-['Jua',sans-serif] text-[13px] text-[#1a1a1a]">Best time to reach, by channel</p>
        <span className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.08em] text-[#6b3c72] bg-[#f1e9ff] px-1.5 py-0.5 rounded-[5px]">Behavioural</span>
      </div>
      <p className="font-['Jua',sans-serif] text-[11px] text-[#9a9a9a] mb-2.5">When this audience is most reachable on each channel · indexed</p>

      <div className="grid items-center gap-1.5 mb-1.5" style={grid}>
        <span />
        {cols.map((c) => (
          <span key={c} className="font-['Jua',sans-serif] text-[10px] text-[#9a9a9a] text-center">{c}</span>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        {rows.map((r) => {
          const peak = Math.max(...r.vals);
          return (
            <div key={r.channel} className="grid items-center gap-1.5" style={grid}>
              <span className="font-['Jua',sans-serif] text-[11px] text-[#1a1a1a] truncate pr-1">{r.channel}</span>
              {r.vals.map((v, i) => {
                const isPeak = v === peak;
                const s = reachShade(v, isPeak);
                return (
                  <div key={i} className="h-[26px] rounded-[6px] flex items-center justify-center" style={{ background: s.bg }} title={`${cols[i]} · ${v}`}>
                    {isPeak && <svg className="w-[11px] h-[11px]" viewBox="0 0 24 24" fill={s.fg}><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z"/></svg>}
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

function ExpandedMapModal({
  audienceName, whereMode, setWhereMode, dayType, setDayType, geoMode, view, reach, onClose,
}: {
  audienceName: string;
  whereMode: GeoModeKey; setWhereMode: (m: GeoModeKey) => void;
  dayType: DayTypeKey; setDayType: (d: DayTypeKey) => void;
  geoMode: GeoMode; view: GeoView; reach: { channel: string; vals: number[] }[]; onClose: () => void;
}) {
  // Esc closes — matches click-outside and the explicit X.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(26,12,30,0.45)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[14px] border border-[#e5e5e2] shadow-2xl flex flex-col overflow-hidden w-full"
        style={{ maxWidth: 940, maxHeight: '88vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — continuity lockup: audience + current state chip */}
        <div className="flex-none flex items-start justify-between gap-4 px-5 py-3.5 border-b border-[#e5e5e2]">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <svg className="w-[12px] h-[12px] text-[#6b3c72] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 14v6h6M20 10V4h-6M14 10l6-6M10 14l-6 6" /></svg>
              <span className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.08em] text-[#9a9a9a]">Expanded map · inspection view</span>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-['Jua',sans-serif] text-[16px] text-[#1a1a1a] truncate">{audienceName}</span>
              <span className="inline-flex items-center gap-1.5 font-['Jua',sans-serif] text-[11px] text-[#6b3c72] bg-[#f1e9ff] px-2 py-0.5 rounded-[7px] whitespace-nowrap">{geoMode.mapLabel} · {dayType}</span>
            </div>
          </div>
          <button onClick={onClose} title="Close (Esc)" className="shrink-0 w-[30px] h-[30px] flex items-center justify-center border border-[#e5e5e2] rounded-lg hover:bg-gray-50 transition-colors">
            <X className="w-3.5 h-3.5 text-[#6b6b6b]" />
          </button>
        </div>

        {/* Controls — same switches as the sidebar, mutating shared state */}
        <div className="flex-none flex items-center justify-between gap-2 px-5 py-3 border-b border-[#e5e5e2] flex-wrap bg-[#fafaf9]">
          <SegControl options={['Residential', 'Daytime', 'Transaction']} active={whereMode} onChange={(v) => setWhereMode(v as GeoModeKey)} />
          <SegControl options={['Weekday', 'Weekend']} active={dayType} onChange={(v) => setDayType(v as DayTypeKey)} />
        </div>

        {/* Body — map dominant on top, supporting context stacked below */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 flex flex-col gap-4">
          {/* large primary map */}
          <div className="relative border border-[#e5e5e2] rounded-[12px] overflow-hidden bg-[#fafaf8] min-h-[300px] flex items-center">
            <span className="absolute left-3 top-3 font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.08em] text-[#9a9a9a] z-10">{geoMode.mapLabel} · {dayType}</span>
            <div className="absolute top-3 right-3 flex flex-col bg-white/90 border border-[#e5e5e2] rounded-lg overflow-hidden z-10">
              <button className="w-[28px] h-[28px] flex items-center justify-center text-[#6b6b6b] hover:text-[#6b3c72] border-b border-[#e5e5e2] transition-colors"><Plus className="w-3.5 h-3.5" /></button>
              <button className="w-[28px] h-[28px] flex items-center justify-center text-[#6b6b6b] hover:text-[#6b3c72] transition-colors"><Minus className="w-3.5 h-3.5" /></button>
            </div>
            <MapSVG districts={view.districts} />
            <div className="absolute right-3 bottom-3 flex items-center gap-1.5 bg-white/85 px-2 py-1 rounded-[6px]">
              <span className="font-['Jua',sans-serif] text-[10px] text-[#9a9a9a]">Low</span>
              <div className="w-[48px] h-[6px] rounded-[4px]" style={{ background: 'linear-gradient(90deg, #F1E9FF, #6B3C72)' }} />
              <span className="font-['Jua',sans-serif] text-[10px] text-[#9a9a9a]">High</span>
            </div>
          </div>

          {/* concise insight for the selected state */}
          <div className="flex gap-2 items-start bg-[#f1e9ff] rounded-[10px] px-3 py-2.5">
            <svg className="w-[14px] h-[14px] text-[#6b3c72] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" /></svg>
            <span className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] leading-[1.5]">
              {view.insight.split(view.insightBold).map((part, i) =>
                i === 0 ? part : <span key={i}><strong className="text-[#6b3c72]">{view.insightBold}</strong>{part}</span>
              )}
            </span>
          </div>

          {/* times-to-reach — channel × window heatmap, under the map */}
          <div className="pt-1 border-t border-[#eeebef]">
            <ReachMatrix rows={reach} />
          </div>
        </div>

        {/* Footer — progressive path to the deeper report */}
        <div className="flex-none border-t border-[#e5e5e2] px-5 py-3 flex items-center gap-2.5 bg-white flex-wrap">
          <p className="font-['Jua',sans-serif] text-[11px] text-[#9a9a9a] mr-auto">Inspecting geography — open the full report for deeper analysis.</p>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#6b3c72] hover:bg-[#5c2375] text-white rounded-lg font-['Jua',sans-serif] text-[13px] transition-colors">
            <Bookmark className="w-3.5 h-3.5" />Save audience
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#e5e5e2] bg-white rounded-lg font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
            Open full report
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function AudienceDetailPanel({ audienceId, screen, onClose }: { audienceId: AudienceId; screen: Screen; onClose?: () => void }) {
  const [mainTab, setMainTab] = useState<'preview' | 'data'>('preview');
  const [whoTab, setWhoTab] = useState('Demographics');
  const [whereMode, setWhereMode] = useState<GeoModeKey>('Residential');
  const [dayType, setDayType] = useState<DayTypeKey>('Weekday');
  const [mapExpanded, setMapExpanded] = useState(false);
  const [howTab, setHowTab] = useState('Brief');
  const [showExport, setShowExport] = useState(false);

  const audience = AUDIENCES.find((a) => a.id === audienceId)!;
  const ext = EXTENDED[audienceId];
  const geo = GEO[audienceId];
  const geoMode = geo?.[whereMode];
  const view = dayType === 'Weekday' ? geoMode?.weekday : geoMode?.weekend;

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
            <Module id={`aud:${audienceId}:read`} type="text" label="The read" state={[audience.name]}>
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
            <Module id={`aud:${audienceId}:who`} type="chart" label="Who they are" state={[whoTab, audience.name]}>
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

            {/* §2 WHERE THEY ARE — geo intelligence */}
            <Module id={`aud:${audienceId}:where`} type="map" label="Where they are" state={[whereMode, dayType, audience.name]}>
            <div className="py-4 border-b border-[#e5e5e2]">
              <SectionHead num="2" title="Where they are" aside="Geo intelligence" reserveAsk />

              {geo && view && (
                <>
                  {/* location mode + weekday/weekend switches */}
                  <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                    <SegControl options={['Residential', 'Daytime', 'Transaction']} active={whereMode} onChange={(v) => setWhereMode(v as GeoModeKey)} />
                    <SegControl options={['Weekday', 'Weekend']} active={dayType} onChange={(v) => setDayType(v as DayTypeKey)} />
                  </div>

                  {/* map — primary geo anchor */}
                  <div className="relative border border-[#e5e5e2] rounded-[10px] overflow-hidden bg-[#fafaf8]">
                    <span className="absolute left-2 top-2 font-['Jua',sans-serif] text-[9.5px] uppercase tracking-[0.08em] text-[#9a9a9a] z-10">{geoMode!.mapLabel} · {dayType}</span>
                    <div className="absolute top-2 right-2 flex flex-col bg-white/90 border border-[#e5e5e2] rounded-lg overflow-hidden z-10">
                      <button className="w-[26px] h-[26px] flex items-center justify-center text-[#6b6b6b] hover:text-[#6b3c72] border-b border-[#e5e5e2] transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                      <button className="w-[26px] h-[26px] flex items-center justify-center text-[#6b6b6b] hover:text-[#6b3c72] border-b border-[#e5e5e2] transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setMapExpanded(true)} title="Expand map" className="w-[26px] h-[26px] flex items-center justify-center text-[#6b6b6b] hover:text-[#6b3c72] transition-colors"><Maximize2 className="w-3 h-3" /></button>
                    </div>
                    <MapSVG districts={view.districts} />
                    <div className="absolute right-2 bottom-2 flex items-center gap-1.5 bg-white/85 px-1.5 py-0.5 rounded-[6px]">
                      <span className="font-['Jua',sans-serif] text-[9.5px] text-[#9a9a9a]">Low</span>
                      <div className="w-[40px] h-[6px] rounded-[4px]" style={{ background: 'linear-gradient(90deg, #F1E9FF, #6B3C72)' }} />
                      <span className="font-['Jua',sans-serif] text-[9.5px] text-[#9a9a9a]">High</span>
                    </div>
                  </div>

                  {/* short insight */}
                  <div className="flex gap-2 items-start font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] leading-[1.5] mt-2.5">
                    <svg className="w-[14px] h-[14px] text-[#6b3c72] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
                    </svg>
                    <span>
                      {view.insight.split(view.insightBold).map((part, i) =>
                        i === 0 ? part : <span key={i}><strong className="text-[#6b3c72]">{view.insightBold}</strong>{part}</span>
                      )}
                    </span>
                  </div>

                  {/* times-to-reach — tied to the selected geography */}
                  <TimesToReach times={view.times} window={view.window} />

                  {/* expand CTA */}
                  <button onClick={() => setMapExpanded(true)} className="flex items-center gap-1.5 mt-3 font-['Jua',sans-serif] text-[12px] text-[#6b3c72] hover:opacity-70 transition-opacity">
                    Expand map
                    <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 14v6h6M20 10V4h-6M14 10l6-6M10 14l-6 6" /></svg>
                  </button>
                </>
              )}
            </div>
            </Module>

            {/* §3 HOW TO WIN THEM */}
            <Module id={`aud:${audienceId}:how`} type="recommendation" label="How to win them" state={[howTab, audience.name]}>
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
            <button className="flex-[1.4] flex items-center justify-center gap-2 px-4 py-2.5 bg-[#6b3c72] hover:bg-[#5c2375] text-white rounded-lg font-['Jua',sans-serif] text-[13px] transition-colors">
              <Bookmark className="w-3.5 h-3.5" />Save audience
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-[#e5e5e2] bg-white rounded-lg font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
              Open full
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ── Expand-map view ── */}
          {mapExpanded && geo && view && geoMode && ext && (
            <ExpandedMapModal
              audienceName={audience.name}
              whereMode={whereMode} setWhereMode={setWhereMode}
              dayType={dayType} setDayType={setDayType}
              geoMode={geoMode} view={view} reach={ext.reach}
              onClose={() => setMapExpanded(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
