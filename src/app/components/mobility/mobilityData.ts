// ── Mobility choropleth data & helpers ───────────────────────────────────────
// Ported from the audience-deepdive-map-hero wireframe. Drives the suburb
// choropleth: an audience index per (suburb × signal × day), a purple
// density ramp, and a graduated baseline for areas without a hand-set figure.

export type Signal = 'Residential' | 'Daytime' | 'Transaction';
export type DayType = 'Weekday' | 'Weekend';

// Purple density ramp, low → high (matches the Data Explorer choropleth).
export const RAMP = ['#E6D7E9', '#C6A9CA', '#A278A9', '#7A4C82', '#5A2E62'];

export function colorFor(v: number): string {
  if (v >= 3.3) return RAMP[4];
  if (v >= 2.7) return RAMP[3];
  if (v >= 2.0) return RAMP[2];
  if (v >= 1.4) return RAMP[1];
  return RAMP[0];
}

type Cell = Record<Signal, Record<DayType, number>>;

// Hand-set audience index (vs Greater Sydney avg) for the over-indexing suburbs.
// The three Costco clusters lead: the North-West growth corridor (Marsden Park
// and its neighbours), the Parramatta / Granville value belt, and the Hills.
export const IDX: Record<string, Cell> = {
  'MARSDEN PARK':  { Residential: { Weekday: 3.8, Weekend: 3.6 }, Daytime: { Weekday: 2.1, Weekend: 2.4 }, Transaction: { Weekday: 2.6, Weekend: 3.4 } },
  SCHOFIELDS:      { Residential: { Weekday: 3.5, Weekend: 3.4 }, Daytime: { Weekday: 1.8, Weekend: 2.1 }, Transaction: { Weekday: 2.4, Weekend: 3.1 } },
  RIVERSTONE:      { Residential: { Weekday: 3.3, Weekend: 3.2 }, Daytime: { Weekday: 1.7, Weekend: 1.9 }, Transaction: { Weekday: 2.2, Weekend: 2.9 } },
  'ROUSE HILL':    { Residential: { Weekday: 3.2, Weekend: 3.1 }, Daytime: { Weekday: 2.3, Weekend: 2.7 }, Transaction: { Weekday: 2.8, Weekend: 3.3 } },
  'BOX HILL':      { Residential: { Weekday: 3.0, Weekend: 2.9 }, Daytime: { Weekday: 1.6, Weekend: 1.8 }, Transaction: { Weekday: 2.1, Weekend: 2.7 } },
  'THE PONDS':     { Residential: { Weekday: 3.1, Weekend: 3.0 }, Daytime: { Weekday: 1.7, Weekend: 1.9 }, Transaction: { Weekday: 2.2, Weekend: 2.8 } },
  'QUAKERS HILL':  { Residential: { Weekday: 2.7, Weekend: 2.6 }, Daytime: { Weekday: 1.6, Weekend: 1.7 }, Transaction: { Weekday: 2.0, Weekend: 2.5 } },
  BLACKTOWN:       { Residential: { Weekday: 3.0, Weekend: 2.9 }, Daytime: { Weekday: 2.4, Weekend: 2.3 }, Transaction: { Weekday: 2.9, Weekend: 3.3 } },
  'SEVEN HILLS':   { Residential: { Weekday: 2.5, Weekend: 2.4 }, Daytime: { Weekday: 1.9, Weekend: 1.8 }, Transaction: { Weekday: 2.4, Weekend: 2.8 } },
  PARRAMATTA:      { Residential: { Weekday: 2.8, Weekend: 2.6 }, Daytime: { Weekday: 3.4, Weekend: 2.9 }, Transaction: { Weekday: 3.2, Weekend: 3.6 } },
  GRANVILLE:       { Residential: { Weekday: 2.9, Weekend: 2.8 }, Daytime: { Weekday: 2.2, Weekend: 2.1 }, Transaction: { Weekday: 2.7, Weekend: 3.1 } },
  MERRYLANDS:      { Residential: { Weekday: 2.8, Weekend: 2.7 }, Daytime: { Weekday: 2.0, Weekend: 2.0 }, Transaction: { Weekday: 2.6, Weekend: 3.0 } },
  AUBURN:          { Residential: { Weekday: 2.6, Weekend: 2.5 }, Daytime: { Weekday: 2.1, Weekend: 2.0 }, Transaction: { Weekday: 2.5, Weekend: 2.9 } },
  GUILDFORD:       { Residential: { Weekday: 2.4, Weekend: 2.3 }, Daytime: { Weekday: 1.6, Weekend: 1.6 }, Transaction: { Weekday: 2.2, Weekend: 2.6 } },
  'CASTLE HILL':   { Residential: { Weekday: 3.1, Weekend: 3.0 }, Daytime: { Weekday: 2.6, Weekend: 2.9 }, Transaction: { Weekday: 3.3, Weekend: 3.7 } },
  'BAULKHAM HILLS':{ Residential: { Weekday: 2.9, Weekend: 2.8 }, Daytime: { Weekday: 2.2, Weekend: 2.5 }, Transaction: { Weekday: 3.0, Weekend: 3.4 } },
  'KELLYVILLE':    { Residential: { Weekday: 3.0, Weekend: 2.9 }, Daytime: { Weekday: 1.9, Weekend: 2.3 }, Transaction: { Weekday: 2.7, Weekend: 3.2 } },
  'WEST PENNANT HILLS': { Residential: { Weekday: 2.4, Weekend: 2.3 }, Daytime: { Weekday: 1.7, Weekend: 1.9 }, Transaction: { Weekday: 2.5, Weekend: 2.8 } },
  PENRITH:         { Residential: { Weekday: 2.3, Weekend: 2.2 }, Daytime: { Weekday: 2.2, Weekend: 2.1 }, Transaction: { Weekday: 2.5, Weekend: 2.9 } },
  'ST MARYS':      { Residential: { Weekday: 2.2, Weekend: 2.1 }, Daytime: { Weekday: 1.6, Weekend: 1.6 }, Transaction: { Weekday: 2.1, Weekend: 2.5 } },
  LIVERPOOL:       { Residential: { Weekday: 2.4, Weekend: 2.3 }, Daytime: { Weekday: 2.3, Weekend: 2.2 }, Transaction: { Weekday: 2.6, Weekend: 3.0 } },
  'CASULA':        { Residential: { Weekday: 2.1, Weekend: 2.0 }, Daytime: { Weekday: 1.7, Weekend: 1.8 }, Transaction: { Weekday: 2.3, Weekend: 2.7 } },
  CAMPBELLTOWN:    { Residential: { Weekday: 2.0, Weekend: 1.9 }, Daytime: { Weekday: 1.6, Weekend: 1.6 }, Transaction: { Weekday: 2.0, Weekend: 2.4 } },
  'ORAN PARK':     { Residential: { Weekday: 2.6, Weekend: 2.5 }, Daytime: { Weekday: 1.4, Weekend: 1.7 }, Transaction: { Weekday: 2.0, Weekend: 2.6 } },
  'GREGORY HILLS': { Residential: { Weekday: 2.5, Weekend: 2.4 }, Daytime: { Weekday: 1.5, Weekend: 1.8 }, Transaction: { Weekday: 2.1, Weekend: 2.7 } },
  BANKSTOWN:       { Residential: { Weekday: 2.2, Weekend: 2.1 }, Daytime: { Weekday: 1.8, Weekend: 1.8 }, Transaction: { Weekday: 2.3, Weekend: 2.7 } },
  FAIRFIELD:       { Residential: { Weekday: 2.3, Weekend: 2.2 }, Daytime: { Weekday: 1.7, Weekend: 1.7 }, Transaction: { Weekday: 2.2, Weekend: 2.6 } },
  'WETHERILL PARK':{ Residential: { Weekday: 1.7, Weekend: 1.6 }, Daytime: { Weekday: 2.4, Weekend: 2.6 }, Transaction: { Weekday: 2.8, Weekend: 3.2 } },
  RYDALMERE:       { Residential: { Weekday: 1.6, Weekend: 1.5 }, Daytime: { Weekday: 2.3, Weekend: 1.8 }, Transaction: { Weekday: 2.1, Weekend: 2.3 } },
  'SYDNEY':        { Residential: { Weekday: 1.2, Weekend: 1.1 }, Daytime: { Weekday: 2.6, Weekend: 1.9 }, Transaction: { Weekday: 1.8, Weekend: 1.9 } },
  CHATSWOOD:       { Residential: { Weekday: 1.4, Weekend: 1.3 }, Daytime: { Weekday: 2.0, Weekend: 2.1 }, Transaction: { Weekday: 2.0, Weekend: 2.2 } },
};

// Segment mix blurb shown in the tooltip for the notable areas.
export const MIX: Record<string, string> = {
  'MARSDEN PARK': '46% Stock-Ups · 21% New-Build Movers · North-West growth corridor',
  SCHOFIELDS: '41% Stock-Ups · 24% New-Build Movers',
  RIVERSTONE: '38% Stock-Ups · 22% Large Families',
  'ROUSE HILL': '35% Stock-Ups · 26% Bulk Buyers · Rouse Hill Town Centre',
  'THE PONDS': '37% Stock-Ups · 25% New-Build Movers',
  BLACKTOWN: '33% Value Families · 24% Large Families',
  PARRAMATTA: '39% Value Families · 22% Unit-Price Switchers',
  GRANVILLE: '42% Value Families · 19% Multi-Generational',
  MERRYLANDS: '38% Value Families · 21% Multi-Generational',
  'CASTLE HILL': '44% Bulk Buyers · 18% Premium & Entertaining',
  'BAULKHAM HILLS': '39% Bulk Buyers · 20% Premium & Entertaining',
  KELLYVILLE: '36% Bulk Buyers · 23% Large Families',
  LIVERPOOL: '31% Value Families · 20% Large Families',
  PENRITH: '28% Value Families · 19% Stock-Ups',
  'WETHERILL PARK': '48% Daytime & small-business buyers · Stockland Wetherill Park',
};

// National park, water catchment and rural fringe — barely any audience at all.
const SPARSE = /NATIONAL PARK|ROYAL NATIONAL|KU-RING-GAI CHASE|WARRAGAMBA|BLUE MOUNTAINS|WATERFALL|HEATHCOTE|MAIANBAR|BUNDEENA|LUCAS HEIGHTS|BOWEN MOUNTAIN|MOUNT WILSON|BILPIN|WISEMANS FERRY|LOWER PORTLAND|MARAYLYA|CATTAI|SCHEYVILLE|AGNES BANKS|CASTLEREAGH|LONDONDERRY|BADGERYS CREEK|LUDDENHAM|WALLACIA|SILVERDALE|MENANGLE|DOUGLAS PARK|WILTON|APPIN/;

function hashName(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

// A low graduated baseline for areas the audience barely touches, so the whole
// basin still tessellates with a plausible-looking ramp rather than blanks.
function baseline(name: string, sig: Signal, day: DayType): number {
  let b = 0.35 + (hashName(name) % 60) / 100; // 0.35 .. 0.94
  if (SPARSE.test(name)) b *= 0.5;
  const sigMul = sig === 'Daytime' ? 0.85 : sig === 'Transaction' ? 1.05 : 1.0;
  const dayMul = day === 'Weekend' ? 0.96 : 1.0;
  return b * sigMul * dayMul;
}

export function valueFor(name: string, sig: Signal, day: DayType): number {
  return IDX[name] ? IDX[name][sig][day] : baseline(name, sig, day);
}

export function titleCase(s: string): string {
  return s.toLowerCase().replace(/(^|[\s-])([a-z])/g, (_m, p: string, c: string) => p + c.toUpperCase());
}

export const HOTSPOTS = [
  { lat: -33.7135, lng: 150.8380, name: 'Marsden Park Home Hub' },
  { lat: -33.6870, lng: 150.9200, name: 'Rouse Hill Town Centre' },
  { lat: -33.7710, lng: 150.9060, name: 'Westpoint Blacktown' },
  { lat: -33.8150, lng: 151.0000, name: 'Westfield Parramatta' },
  { lat: -33.7320, lng: 151.0050, name: 'Castle Towers' },
  { lat: -33.8620, lng: 150.9420, name: 'Costco Auburn' },
  { lat: -33.7510, lng: 150.6940, name: 'Westfield Penrith' },
];
