// ── Mobility choropleth data & helpers ───────────────────────────────────────
// Ported from the audience-deepdive-map-hero wireframe. Drives the planning-area
// choropleth: an audience index per (planning area × signal × day), a purple
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

// Hand-set audience index (vs national avg) for the over-indexing planning areas.
export const IDX: Record<string, Cell> = {
  QUEENSTOWN:      { Residential: { Weekday: 3.8, Weekend: 3.4 }, Daytime: { Weekday: 3.0, Weekend: 2.0 }, Transaction: { Weekday: 2.3, Weekend: 2.4 } },
  BISHAN:          { Residential: { Weekday: 3.4, Weekend: 3.2 }, Daytime: { Weekday: 2.1, Weekend: 1.9 }, Transaction: { Weekday: 2.6, Weekend: 3.0 } },
  TAMPINES:        { Residential: { Weekday: 3.1, Weekend: 3.0 }, Daytime: { Weekday: 1.7, Weekend: 1.6 }, Transaction: { Weekday: 2.7, Weekend: 3.1 } },
  WOODLANDS:       { Residential: { Weekday: 2.8, Weekend: 2.7 }, Daytime: { Weekday: 1.4, Weekend: 1.5 }, Transaction: { Weekday: 2.0, Weekend: 2.4 } },
  'ANG MO KIO':    { Residential: { Weekday: 2.6, Weekend: 2.5 }, Daytime: { Weekday: 1.6, Weekend: 1.5 }, Transaction: { Weekday: 2.1, Weekend: 2.5 } },
  SERANGOON:       { Residential: { Weekday: 2.3, Weekend: 2.2 }, Daytime: { Weekday: 1.5, Weekend: 1.4 }, Transaction: { Weekday: 2.0, Weekend: 2.3 } },
  'TOA PAYOH':     { Residential: { Weekday: 2.2, Weekend: 2.1 }, Daytime: { Weekday: 1.8, Weekend: 1.5 }, Transaction: { Weekday: 2.1, Weekend: 2.3 } },
  CLEMENTI:        { Residential: { Weekday: 1.9, Weekend: 1.8 }, Daytime: { Weekday: 1.7, Weekend: 1.4 }, Transaction: { Weekday: 1.8, Weekend: 2.0 } },
  'JURONG EAST':   { Residential: { Weekday: 1.9, Weekend: 1.8 }, Daytime: { Weekday: 1.5, Weekend: 1.4 }, Transaction: { Weekday: 2.3, Weekend: 2.7 } },
  PUNGGOL:         { Residential: { Weekday: 1.7, Weekend: 1.8 }, Daytime: { Weekday: 1.2, Weekend: 1.3 }, Transaction: { Weekday: 1.6, Weekend: 2.1 } },
  SENGKANG:        { Residential: { Weekday: 1.8, Weekend: 1.9 }, Daytime: { Weekday: 1.2, Weekend: 1.3 }, Transaction: { Weekday: 1.6, Weekend: 2.0 } },
  'PASIR RIS':     { Residential: { Weekday: 1.5, Weekend: 1.6 }, Daytime: { Weekday: 1.1, Weekend: 1.3 }, Transaction: { Weekday: 1.5, Weekend: 2.0 } },
  BEDOK:           { Residential: { Weekday: 1.9, Weekend: 2.0 }, Daytime: { Weekday: 1.3, Weekend: 1.4 }, Transaction: { Weekday: 1.8, Weekend: 2.2 } },
  HOUGANG:         { Residential: { Weekday: 1.8, Weekend: 1.8 }, Daytime: { Weekday: 1.3, Weekend: 1.3 }, Transaction: { Weekday: 1.7, Weekend: 2.0 } },
  YISHUN:          { Residential: { Weekday: 1.7, Weekend: 1.7 }, Daytime: { Weekday: 1.2, Weekend: 1.3 }, Transaction: { Weekday: 1.6, Weekend: 2.0 } },
  'BUKIT MERAH':   { Residential: { Weekday: 2.0, Weekend: 1.9 }, Daytime: { Weekday: 2.2, Weekend: 1.8 }, Transaction: { Weekday: 2.2, Weekend: 2.4 } },
  'DOWNTOWN CORE': { Residential: { Weekday: 1.3, Weekend: 1.2 }, Daytime: { Weekday: 3.6, Weekend: 2.4 }, Transaction: { Weekday: 2.9, Weekend: 2.6 } },
  'MARINA SOUTH':  { Residential: { Weekday: 1.1, Weekend: 1.0 }, Daytime: { Weekday: 2.8, Weekend: 2.0 }, Transaction: { Weekday: 2.4, Weekend: 2.5 } },
  OUTRAM:          { Residential: { Weekday: 1.5, Weekend: 1.4 }, Daytime: { Weekday: 2.6, Weekend: 2.1 }, Transaction: { Weekday: 2.5, Weekend: 2.7 } },
  ROCHOR:          { Residential: { Weekday: 1.6, Weekend: 1.5 }, Daytime: { Weekday: 2.4, Weekend: 2.3 }, Transaction: { Weekday: 2.8, Weekend: 3.0 } },
  NEWTON:          { Residential: { Weekday: 1.5, Weekend: 1.4 }, Daytime: { Weekday: 2.6, Weekend: 2.8 }, Transaction: { Weekday: 3.4, Weekend: 3.8 } },
  'RIVER VALLEY':  { Residential: { Weekday: 1.6, Weekend: 1.5 }, Daytime: { Weekday: 2.5, Weekend: 2.7 }, Transaction: { Weekday: 3.2, Weekend: 3.6 } },
  TANGLIN:         { Residential: { Weekday: 1.7, Weekend: 1.6 }, Daytime: { Weekday: 2.3, Weekend: 2.5 }, Transaction: { Weekday: 2.9, Weekend: 3.2 } },
  KALLANG:         { Residential: { Weekday: 1.9, Weekend: 1.8 }, Daytime: { Weekday: 1.9, Weekend: 1.7 }, Transaction: { Weekday: 2.2, Weekend: 2.4 } },
  GEYLANG:         { Residential: { Weekday: 1.8, Weekend: 1.8 }, Daytime: { Weekday: 1.7, Weekend: 1.7 }, Transaction: { Weekday: 2.1, Weekend: 2.3 } },
  'MARINE PARADE': { Residential: { Weekday: 1.7, Weekend: 1.8 }, Daytime: { Weekday: 1.5, Weekend: 1.6 }, Transaction: { Weekday: 2.0, Weekend: 2.3 } },
  NOVENA:          { Residential: { Weekday: 2.0, Weekend: 1.9 }, Daytime: { Weekday: 2.2, Weekend: 1.8 }, Transaction: { Weekday: 2.3, Weekend: 2.4 } },
};

// Segment mix blurb shown in the tooltip for the notable areas.
export const MIX: Record<string, string> = {
  QUEENSTOWN: '41% Premium Drivers · 26% Young Pros · Buona Vista / one-north',
  BISHAN: '38% Premium Drivers · 24% Young Pros',
  TAMPINES: '34% Est. Families · 22% Upgraders',
  WOODLANDS: '36% Est. Families · 19% Value Seekers',
  'ANG MO KIO': '33% Est. Families · 21% Young Pros',
  'DOWNTOWN CORE': '52% Daytime workers · 18% Premium Drivers',
  'MARINA SOUTH': '48% Daytime workers · 16% Premium Drivers',
  NEWTON: '44% Weekend spenders · 20% Premium Drivers · Orchard belt',
  'RIVER VALLEY': '42% Weekend spenders · 19% Premium Drivers · Orchard belt',
  'JURONG EAST': '31% Value Seekers · 20% Est. Families',
  PUNGGOL: '39% Young Families · 17% Upgraders',
  CLEMENTI: '29% Young Pros · 22% Est. Families',
};

const SPARSE = /TUAS|ISLANDS|WATER CATCHMENT|SIMPANG|LIM CHU KANG|MANDAI|SELETAR|CHANGI BAY|STRAITS VIEW|MARINA EAST|PIONEER|TENGAH|SUNGEI KADUT|BOON LAY/;

function hashName(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

// A low graduated baseline for areas the audience barely touches, so the whole
// island still tessellates with a plausible-looking ramp rather than blanks.
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
  { lat: 1.3040, lng: 103.8320, name: 'ION Orchard' },
  { lat: 1.2646, lng: 103.8220, name: 'VivoCity' },
  { lat: 1.3510, lng: 103.8480, name: 'Junction 8' },
  { lat: 1.3536, lng: 103.9450, name: 'Tampines Mall' },
  { lat: 1.2990, lng: 103.7870, name: 'one-north' },
  { lat: 1.4360, lng: 103.7865, name: 'Causeway Point' },
  { lat: 1.2820, lng: 103.8520, name: 'Marina Bay' },
];
