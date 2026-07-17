// ── Audience Profile geo data ────────────────────────────────────────────────
// The companion map on the Audience Profile tab shares the same choropleth
// engine as the Mobility hero, but a "who lives there" lens. Per request the
// colour-by selector (Concentration / Affluence / Ownership) is dropped — the
// map always colours by audience concentration. This module carries the
// place-dossier data behind the readout, tooltips, income/lifestage links and
// the area-dossier table.
import { valueFor, titleCase } from '../mobility/mobilityData';

// Re-exported so the hero can import geometry/label helpers from one place.
export { titleCase };

// The readout rests on the audience's 2nd home postcode (Bishan), matching the
// wireframe's default state.
export const DEFAULT_READOUT_AREA = 'BISHAN';

// Concentration = residential-weekday audience index, reused from the shared engine.
export function concentrationFor(name: string): number {
  return valueFor(name, 'Residential', 'Weekday');
}

export type AreaProfile = {
  rank: string; shareN: number; shareIdx: number; homeN: number;
  incomeN: number; seg: string; retail: string; poi: string;
};

export const AREA_PROFILE: Record<string, AreaProfile> = {
  QUEENSTOWN:     { rank: '1st home postcode', shareN: 8.1, shareIdx: 2.6, homeN: 1.9,  incomeN: 172, seg: 'Est. Professionals',     retail: 'one-north · Rochester',   poi: 'one-north biz park' },
  BISHAN:         { rank: '2nd home postcode', shareN: 7.4, shareIdx: 2.3, homeN: 2.1,  incomeN: 168, seg: 'Est. Professionals',     retail: 'Junction 8 · Cold Storage', poi: 'Bishan-AMK Park' },
  TAMPINES:       { rank: '3rd home postcode', shareN: 6.0, shareIdx: 1.7, homeN: 0.98, incomeN: 118, seg: 'Aspirational Climbers',  retail: 'Tampines Mall · NTUC',    poi: 'Our Tampines Hub' },
  WOODLANDS:      { rank: '4th home postcode', shareN: 5.4, shareIdx: 1.5, homeN: 0.72, incomeN: 96,  seg: 'Growing Families',       retail: 'Causeway Point',          poi: 'Woodlands Waterfront' },
  'ANG MO KIO':   { rank: '5th home postcode', shareN: 4.0, shareIdx: 1.6, homeN: 0.86, incomeN: 104, seg: 'Aspirational Climbers',  retail: 'AMK Hub',                 poi: 'Bishan-AMK Park' },
  NOVENA:         { rank: '6th home postcode', shareN: 3.6, shareIdx: 2.2, homeN: 2.4,  incomeN: 196, seg: 'Est. Professionals',     retail: 'Velocity · United Sq',    poi: 'Health City Novena' },
  TANGLIN:        { rank: '8th home postcode', shareN: 4.2, shareIdx: 3.1, homeN: 3.4,  incomeN: 240, seg: 'Affluent Establishment', retail: 'Tanglin Mall · Dempsey',  poi: 'Botanic Gardens' },
  NEWTON:         { rank: 'Prime district',    shareN: 3.4, shareIdx: 2.9, homeN: 3.2,  incomeN: 228, seg: 'Affluent Establishment', retail: 'Orchard belt',            poi: 'Newton Food Centre' },
  'RIVER VALLEY': { rank: 'Prime district',    shareN: 3.0, shareIdx: 2.7, homeN: 2.9,  incomeN: 210, seg: 'Affluent Establishment', retail: 'Great World',             poi: 'Robertson Quay' },
  'BUKIT MERAH':  { rank: 'Inner-city',        shareN: 3.8, shareIdx: 1.9, homeN: 1.3,  incomeN: 132, seg: 'Est. Professionals',     retail: 'Tiong Bahru Plaza',       poi: 'Tiong Bahru' },
  SERANGOON:      { rank: 'Mature estate',     shareN: 3.2, shareIdx: 1.8, homeN: 1.1,  incomeN: 126, seg: 'Aspirational Climbers',  retail: 'NEX',                     poi: 'NEX' },
  BEDOK:          { rank: 'Mature estate',     shareN: 3.0, shareIdx: 1.5, homeN: 0.90, incomeN: 108, seg: 'Aspirational Climbers',  retail: 'Bedok Mall',              poi: 'East Coast Park' },
  CLEMENTI:       { rank: 'Mature estate',     shareN: 2.6, shareIdx: 1.6, homeN: 1.2,  incomeN: 130, seg: 'Est. Professionals',     retail: 'Clementi Mall',           poi: 'West Coast Park' },
  PUNGGOL:        { rank: 'North-east',        shareN: 2.4, shareIdx: 1.4, homeN: 0.68, incomeN: 98,  seg: 'Growing Families',       retail: 'Waterway Point',          poi: 'Punggol Waterway' },
  SENGKANG:       { rank: 'North-east',        shareN: 2.2, shareIdx: 1.4, homeN: 0.66, incomeN: 95,  seg: 'Growing Families',       retail: 'Compass One',             poi: 'Sengkang Riverside' },
  'JURONG EAST':  { rank: 'Regional centre',   shareN: 2.0, shareIdx: 1.3, homeN: 0.95, incomeN: 110, seg: 'Aspirational Climbers',  retail: 'JEM · Westgate',          poi: 'Jurong Lake Gardens' },
  YISHUN:         { rank: 'Outer town',        shareN: 1.8, shareIdx: 1.2, homeN: 0.62, incomeN: 92,  seg: 'Growing Families',       retail: 'Northpoint City',         poi: 'Yishun Pond' },
};

// Fallback profile for any planning area without a hand-set dossier entry.
export function pget(name: string): AreaProfile {
  const hit = AREA_PROFILE[name];
  if (hit) return hit;
  const c = concentrationFor(name);
  return {
    rank: 'Planning area', shareN: +(c * 1.1).toFixed(1), shareIdx: +c.toFixed(1),
    homeN: +(0.55 + c * 0.5).toFixed(2), incomeN: Math.round(70 + c * 40),
    seg: c > 2.2 ? 'Est. Professionals' : c > 1.5 ? 'Aspirational Climbers' : 'Growing Families',
    retail: 'Neighbourhood centre', poi: '—',
  };
}

export function fmtHome(n: number): string {
  return n >= 1 ? `$${n.toFixed(1)}M` : `$${Math.round(n * 1000)}k`;
}

export function profileTip(name: string): string {
  const p = pget(name);
  return `<div class="tn">${titleCase(name)} <span class="tx">${p.shareIdx}x</span></div>`
    + `<div class="tm">${fmtHome(p.homeN)} home · $${p.incomeN}k income · ${p.seg}</div>`;
}

// ── Map-linked cards ──────────────────────────────────────────────────────────
// Each row carries the suburbs it over-indexes in, so hovering it lights them up
// on the map and swaps the readout to a band summary.
export type LinkRow = {
  band: string; label: string; areas: string[]; home: string;
  summary: string; pct: number; color: string; hot?: boolean; val?: string;
  light?: boolean; // seg-bar label needs dark text on a pale swatch
};

export const INCOME_BANDS: LinkRow[] = [
  { band: '$200k+ households',   label: '$200k+',   areas: ['NEWTON', 'TANGLIN', 'RIVER VALLEY', 'NOVENA'],             home: '$3.1M', summary: 'Prime districts — Newton, Tanglin, River Valley & Novena', pct: 70, val: '1.4×', color: '#7A4C82' },
  { band: '$120–200k households', label: '$120–200k', areas: ['BISHAN', 'QUEENSTOWN', 'BUKIT MERAH', 'NOVENA', 'CLEMENTI'], home: '$2.0M', summary: 'The audience core — Bishan, Queenstown & Bukit Merah', pct: 92, val: '1.5×', color: '#6B3C72', hot: true },
  { band: '$80–120k households',  label: '$80–120k',  areas: ['TAMPINES', 'ANG MO KIO', 'SERANGOON', 'BEDOK'],           home: '$0.95M', summary: 'Mature HDB towns — Tampines, Ang Mo Kio & Serangoon', pct: 58, val: '0.9×', color: '#A278A9' },
  { band: '<$80k households',     label: '<$80k',     areas: ['WOODLANDS', 'YISHUN', 'JURONG EAST', 'PUNGGOL', 'SENGKANG'], home: '$0.70M', summary: 'Outer towns — Woodlands, Yishun & Sengkang', pct: 34, val: '0.6×', color: '#C6A9CA' },
];

export const LIFESTAGE: LinkRow[] = [
  { band: 'Established Professionals', label: 'Established Professionals', areas: ['QUEENSTOWN', 'BISHAN', 'NOVENA', 'BUKIT MERAH', 'CLEMENTI', 'TANGLIN'], home: '$2.1M', summary: 'Concentrated on the Queenstown–Bishan–Novena belt', pct: 31, color: '#5A2E62' },
  { band: 'Aspirational Climbers',     label: 'Aspirational Climbers',     areas: ['TAMPINES', 'ANG MO KIO', 'SERANGOON', 'BEDOK', 'JURONG EAST'],        home: '$0.98M', summary: 'Mature HDB towns — Tampines, AMK, Serangoon', pct: 27, color: '#7A4C82' },
  { band: 'Growing Families',          label: 'Growing Families',          areas: ['PUNGGOL', 'SENGKANG', 'WOODLANDS', 'YISHUN'],                          home: '$0.70M', summary: 'Newer north-east estates — Punggol, Sengkang, Woodlands', pct: 19, color: '#A278A9' },
  { band: 'Other segments',            label: 'Other',                     areas: ['GEYLANG', 'KALLANG', 'MARINE PARADE', 'HOUGANG'],                      home: '$1.1M', summary: 'Spread across mixed inner-east estates', pct: 23, color: '#C6A9CA', light: true },
];

export const DOSSIER_ORDER = ['QUEENSTOWN', 'BISHAN', 'TAMPINES', 'WOODLANDS', 'ANG MO KIO', 'NOVENA'];
