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

// The readout rests on the audience's top home suburb — the North-West growth
// corridor is where the strongest cluster lives.
export const DEFAULT_READOUT_AREA = 'MARSDEN PARK';

// Concentration = residential-weekday audience index, reused from the shared engine.
export function concentrationFor(name: string): number {
  return valueFor(name, 'Residential', 'Weekday');
}

export type AreaProfile = {
  rank: string; shareN: number; shareIdx: number; homeN: number;
  incomeN: number; seg: string; retail: string; poi: string;
};

export const AREA_PROFILE: Record<string, AreaProfile> = {
  'MARSDEN PARK':   { rank: '1st home suburb',   shareN: 8.4, shareIdx: 2.8, homeN: 1.12, incomeN: 138, seg: 'Stock-Up Households',   retail: 'Marsden Park Home Hub',  poi: 'IKEA Marsden Park' },
  SCHOFIELDS:       { rank: '2nd home suburb',   shareN: 7.1, shareIdx: 2.5, homeN: 1.24, incomeN: 142, seg: 'Stock-Up Households',   retail: 'Schofields Village',     poi: 'Schofields station' },
  'ROUSE HILL':     { rank: '3rd home suburb',   shareN: 6.3, shareIdx: 2.4, homeN: 1.38, incomeN: 151, seg: 'Bulk Buyers',           retail: 'Rouse Hill Town Centre', poi: 'Rouse Hill Town Centre' },
  RIVERSTONE:       { rank: '4th home suburb',   shareN: 5.6, shareIdx: 2.3, homeN: 1.02, incomeN: 126, seg: 'Stock-Up Households',   retail: 'Riverstone village',     poi: 'Riverstone station' },
  'THE PONDS':      { rank: '5th home suburb',   shareN: 4.8, shareIdx: 2.2, homeN: 1.31, incomeN: 148, seg: 'Stock-Up Households',   retail: 'The Ponds Shopping Ctr', poi: 'The Ponds' },
  'BOX HILL':       { rank: 'Growth corridor',   shareN: 3.9, shareIdx: 2.1, homeN: 1.18, incomeN: 134, seg: 'New-Build Movers',      retail: 'Box Hill village',       poi: 'Box Hill' },
  BLACKTOWN:        { rank: 'Regional centre',   shareN: 6.8, shareIdx: 2.1, homeN: 0.86, incomeN: 104, seg: 'Value Families',        retail: 'Westpoint Blacktown',    poi: 'Blacktown station' },
  PARRAMATTA:       { rank: 'Regional centre',   shareN: 7.9, shareIdx: 2.0, homeN: 0.94, incomeN: 112, seg: 'Value Families',        retail: 'Westfield Parramatta',   poi: 'Parramatta Square' },
  GRANVILLE:        { rank: 'Value belt',        shareN: 5.2, shareIdx: 2.1, homeN: 0.79, incomeN: 92,  seg: 'Value Families',        retail: 'Granville Town Centre',  poi: 'Granville station' },
  MERRYLANDS:       { rank: 'Value belt',        shareN: 5.0, shareIdx: 2.0, homeN: 0.82, incomeN: 95,  seg: 'Value Families',        retail: 'Stockland Merrylands',   poi: 'Merrylands station' },
  AUBURN:           { rank: 'Value belt',        shareN: 4.4, shareIdx: 1.9, homeN: 0.81, incomeN: 89,  seg: 'Value Families',        retail: 'Auburn Central',         poi: 'Costco Auburn' },
  'CASTLE HILL':    { rank: 'Hills District',    shareN: 5.9, shareIdx: 2.6, homeN: 1.84, incomeN: 186, seg: 'Bulk Buyers',          retail: 'Castle Towers',          poi: 'Castle Hill Metro' },
  'BAULKHAM HILLS': { rank: 'Hills District',    shareN: 4.6, shareIdx: 2.3, homeN: 1.66, incomeN: 172, seg: 'Bulk Buyers',          retail: 'Stockland Baulkham Hills', poi: 'Bella Vista' },
  KELLYVILLE:       { rank: 'Hills District',    shareN: 4.9, shareIdx: 2.4, homeN: 1.58, incomeN: 168, seg: 'Bulk Buyers',          retail: 'Kellyville Village',     poi: 'Kellyville Metro' },
  'QUAKERS HILL':   { rank: 'North-West',        shareN: 3.6, shareIdx: 1.9, homeN: 0.98, incomeN: 118, seg: 'Large Families',        retail: 'Quakers Court',          poi: 'Quakers Hill station' },
  PENRITH:          { rank: 'Outer West',        shareN: 3.4, shareIdx: 1.7, homeN: 0.76, incomeN: 98,  seg: 'Value Families',        retail: 'Westfield Penrith',      poi: 'Penrith Panthers' },
  LIVERPOOL:        { rank: 'South-West',        shareN: 3.8, shareIdx: 1.8, homeN: 0.80, incomeN: 96,  seg: 'Value Families',        retail: 'Westfield Liverpool',    poi: 'Liverpool station' },
  'ORAN PARK':      { rank: 'South-West growth', shareN: 3.1, shareIdx: 2.0, homeN: 1.06, incomeN: 132, seg: 'New-Build Movers',      retail: 'Oran Park Podium',       poi: 'Oran Park Town' },
  CAMPBELLTOWN:     { rank: 'Macarthur',         shareN: 2.9, shareIdx: 1.6, homeN: 0.72, incomeN: 90,  seg: 'Large Families',        retail: 'Macarthur Square',       poi: 'Campbelltown station' },
  FAIRFIELD:        { rank: 'South-West',        shareN: 3.0, shareIdx: 1.7, homeN: 0.77, incomeN: 88,  seg: 'Multi-Generational',    retail: 'Neeta City',             poi: 'Fairfield station' },
};

// Fallback profile for any suburb without a hand-set dossier entry.
export function pget(name: string): AreaProfile {
  const hit = AREA_PROFILE[name];
  if (hit) return hit;
  const c = concentrationFor(name);
  return {
    rank: 'Greater Sydney suburb', shareN: +(c * 1.1).toFixed(1), shareIdx: +c.toFixed(1),
    homeN: +(0.62 + c * 0.34).toFixed(2), incomeN: Math.round(72 + c * 26),
    seg: c > 2.2 ? 'Stock-Up Households' : c > 1.5 ? 'Value Families' : 'Occasional Bulk',
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
  { band: '$200k+ households',    label: '$200k+',    areas: ['CASTLE HILL', 'BAULKHAM HILLS', 'KELLYVILLE', 'WEST PENNANT HILLS'],   home: '$1.9M',  summary: 'The Hills — Castle Hill, Baulkham Hills & Kellyville', pct: 62, val: '1.3×', color: '#7A4C82' },
  { band: '$120–200k households', label: '$120–200k', areas: ['MARSDEN PARK', 'SCHOFIELDS', 'THE PONDS', 'ROUSE HILL', 'BOX HILL'],   home: '$1.2M',  summary: 'The audience core — the North-West growth corridor', pct: 94, val: '1.6×', color: '#6B3C72', hot: true },
  { band: '$80–120k households',  label: '$80–120k',  areas: ['BLACKTOWN', 'PARRAMATTA', 'QUAKERS HILL', 'PENRITH', 'LIVERPOOL'],     home: '$0.88M', summary: 'Regional centres — Blacktown, Parramatta & Penrith', pct: 71, val: '1.2×', color: '#A278A9' },
  { band: '<$80k households',     label: '<$80k',     areas: ['GRANVILLE', 'MERRYLANDS', 'AUBURN', 'FAIRFIELD', 'CAMPBELLTOWN'],      home: '$0.76M', summary: 'The value belt — Granville, Merrylands & Auburn', pct: 48, val: '0.8×', color: '#C6A9CA' },
];

export const LIFESTAGE: LinkRow[] = [
  { band: 'Large Growing Families', label: 'Large Growing Families', areas: ['MARSDEN PARK', 'SCHOFIELDS', 'THE PONDS', 'BOX HILL', 'ORAN PARK', 'RIVERSTONE'], home: '$1.2M',  summary: 'New-build estates across the North-West and South-West corridors', pct: 34, color: '#5A2E62' },
  { band: 'Established Families',   label: 'Established Families',   areas: ['CASTLE HILL', 'BAULKHAM HILLS', 'KELLYVILLE', 'QUAKERS HILL'],                     home: '$1.7M',  summary: 'The Hills — bigger homes, fewer but larger shops', pct: 28, color: '#7A4C82' },
  { band: 'Multi-Generational',     label: 'Multi-Generational',     areas: ['GRANVILLE', 'MERRYLANDS', 'AUBURN', 'FAIRFIELD'],                                  home: '$0.79M', summary: 'The value belt — three generations, one weekly shop', pct: 21, color: '#A278A9' },
  { band: 'Other segments',         label: 'Other',                  areas: ['PENRITH', 'CAMPBELLTOWN', 'LIVERPOOL', 'BLACKTOWN'],                               home: '$0.84M', summary: 'Spread across the outer regional centres', pct: 17, color: '#C6A9CA', light: true },
];

export const DOSSIER_ORDER = ['MARSDEN PARK', 'SCHOFIELDS', 'ROUSE HILL', 'CASTLE HILL', 'PARRAMATTA', 'BLACKTOWN'];
