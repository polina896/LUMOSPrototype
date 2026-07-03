// ── Deep-dive blocks: config-driven, editable analysis tiles ──────────────────
// The area below the "Takeaway · Who they are" hero is a deck of modular blocks
// held in React state. Each block renders from a BlockConfig; the Ask Lumos chat
// resolves plain-language requests into a partial patch (edit) or a whole new
// block (add) via resolveBlockRequest(). See DeepDiveBlock.tsx for rendering.

export type ChartType =
  | 'bars'          // horizontal index bars (label · bar · value)
  | 'segmented-bar' // one stacked bar of shares + legend
  | 'stat-cards'    // 2-col grid of big-number cards with index badges
  | 'donut'         // ring of shares + legend
  | 'line'          // trend line across the rows
  | 'table';        // compact label / value / trend table

export type CompareMode = 'index' | 'percent' | 'count';

export interface BlockRow {
  label: string;
  index?: number;     // 2.1  → "2.1×"
  percent?: number;   // 42   → "42%" and segmented/donut share width
  count?: number;     // 165000 → "165k"
  display?: string;   // stat-cards headline value, e.g. "32–52" / "Professional"
  trend?: 'up' | 'down' | 'flat';
  color?: string;     // segmented-bar / donut segment colour
}

export interface BlockConfig {
  id: string;
  title: string;
  subtitle?: string;
  chartType: ChartType;
  metric: string;                 // which dataset/dimension it shows
  compareMode: CompareMode;
  data: { rows: BlockRow[] };
  // ── Optional richness carried over from the hand-built Profile sections so the
  //    migrated deck stays visually identical to today (see DeepDiveBlock.tsx). ──
  layout?: 'stacked' | 'split';   // 'split' = takeaway panel (left) + bars (right)
  span?: 1 | 3;                    // grid column span (default 1); full-width = 3
  takeaway?: string;              // copy for the split layout's takeaway panel
  pill?: { label: string; color: string; bg: string };  // category tag in header
  columns?: 1 | 2;                // split bars: 1-col index bars vs 2-col value grid
  toggle?: boolean;              // render a decorative Snapshot/Trend control
  footer?: string;               // small print under the split bars
}

// ── Value / bar-fill formatting (compareMode-aware) ──────────────────────────

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${n}`;
}

export function rowValue(row: BlockRow, mode: CompareMode): string {
  if (mode === 'percent' && row.percent != null) return `${row.percent}%`;
  if (mode === 'count' && row.count != null) return formatCount(row.count);
  if (row.index != null) return `${row.index}×`;
  if (row.percent != null) return `${row.percent}%`;
  if (row.count != null) return formatCount(row.count);
  return row.display ?? '';
}

// Bar fill 0–100, normalised within the block so the strongest row reads full.
export function rowPct(row: BlockRow, mode: CompareMode, rows: BlockRow[]): number {
  if (mode === 'percent' && row.percent != null) return row.percent;
  if (mode === 'count' && row.count != null) {
    const max = Math.max(...rows.map((r) => r.count ?? 0));
    return max ? (row.count / max) * 100 : 0;
  }
  if (row.index != null) {
    const max = Math.max(...rows.map((r) => r.index ?? 0));
    return max ? (row.index / max) * 100 : 0;
  }
  if (row.percent != null) return row.percent;
  return 0;
}

// ── Seed deck — the three original cards, now config-driven ──────────────────

const SEGMENT_PALETTE = ['#6b3c72', '#9b6ba0', '#c4a0c8', '#e0cce4', '#b89fc4'];

export function seedBlocks(): BlockConfig[] {
  return [
    // ── Row of three: demographics / income / lifestage (span 1 each) ──
    {
      id: 'demographics',
      title: 'Demographics & occupation',
      subtitle: 'Indexed vs national',
      chartType: 'stat-cards',
      metric: 'demographics',
      compareMode: 'index',
      span: 1,
      data: {
        rows: [
          { label: 'Core age', display: '32–52', index: 1.6, trend: 'up' },
          { label: 'Female share', display: '42%', index: 0.9, trend: 'flat' },
          { label: 'Occupation', display: 'Professional', index: 1.6, trend: 'up' },
          { label: 'Life stage', display: 'Homeowners 61%', index: 1.9, trend: 'up' },
        ],
      },
    },
    {
      id: 'income',
      title: 'Income & affluence',
      subtitle: 'HH-income bands vs benchmark',
      chartType: 'bars',
      metric: 'income',
      compareMode: 'index',
      span: 1,
      data: {
        rows: [
          { label: '<$80k', index: 0.6, percent: 12, trend: 'down' },
          { label: '$80–120k', index: 0.9, percent: 22, trend: 'flat' },
          { label: '$120–200k', index: 1.5, percent: 38, trend: 'up' },
          { label: '$200k+', index: 1.4, percent: 28, trend: 'up' },
        ],
      },
    },
    {
      id: 'lifestage',
      title: 'Lifestage mix',
      subtitle: 'Helix-style segments',
      chartType: 'segmented-bar',
      metric: 'lifestage',
      compareMode: 'percent',
      span: 1,
      data: {
        rows: [
          { label: 'Established Professionals', percent: 31, index: 2.1, color: '#6b3c72' },
          { label: 'Aspirational Climbers', percent: 27, index: 1.7, color: '#9b6ba0' },
          { label: 'Growing Families', percent: 19, index: 1.3, color: '#c4a0c8' },
          { label: 'Other', percent: 23, color: '#e0cce4' },
        ],
      },
    },
    // ── Full-width split sections (takeaway panel + bars) ──
    {
      id: 'top-segments',
      title: 'Top segments by index',
      subtitle: 'Leading buyergraphic segments · vs national baseline',
      chartType: 'bars',
      metric: 'top-segments',
      compareMode: 'index',
      layout: 'split',
      span: 3,
      columns: 1,
      toggle: true,
      takeaway:
        'The four leading segments all reflect high-income professional lifestyles, with Premium Vehicle Owners and Wealth Management Users clustering together. Premium Vehicle Owners rose versus last quarter; Business Class Travellers declined slightly as travel normalised.',
      data: {
        rows: [
          { label: 'Premium Vehicle Owners', index: 2.1, percent: 30, trend: 'up', color: '#6b3c72' },
          { label: 'Wealth Management Users', index: 1.8, percent: 25, trend: 'up', color: '#9b6ba0' },
          { label: 'Premium Retail Shoppers', index: 1.7, percent: 24, trend: 'flat', color: '#c4a0c8' },
          { label: 'Business Class Travellers', index: 1.5, percent: 21, trend: 'down', color: '#e0cce4' },
        ],
      },
    },
    {
      id: 'purchase-patterns',
      title: 'Purchase patterns',
      subtitle: 'What they buy · category spend indexed',
      chartType: 'bars',
      metric: 'purchase-patterns',
      compareMode: 'index',
      layout: 'split',
      span: 3,
      columns: 1,
      pill: { label: 'Transactional', color: '#2471a3', bg: '#e8f4fd' },
      takeaway:
        'Urban Upgrade Drivers over-index on premium automotive (2.4×) and financial services (1.8×). Average household spend is $148k, split 72% in-person / 28% online. Business travel and health & wellness are secondary spend pillars.',
      footer: 'Dealership / in-person 72%  ·  Online 28%',
      data: {
        rows: [
          { label: 'Premium automotive', index: 2.4, percent: 32, trend: 'up', color: '#6b3c72' },
          { label: 'Financial & investment services', index: 1.8, percent: 24, trend: 'up', color: '#9b6ba0' },
          { label: 'Business travel & hospitality', index: 1.7, percent: 23, trend: 'flat', color: '#c4a0c8' },
          { label: 'Health & wellness', index: 1.6, percent: 21, trend: 'flat', color: '#e0cce4' },
        ],
      },
    },
    {
      id: 'weekend-lifestyle',
      title: 'Weekend & lifestyle signals',
      subtitle: 'What they do outside work · venue visitation',
      chartType: 'bars',
      metric: 'weekend-lifestyle',
      compareMode: 'index',
      layout: 'split',
      span: 3,
      columns: 1,
      pill: { label: 'Behavioural', color: '#1e8449', bg: '#eafaf1' },
      takeaway:
        'Car show & expo attendance over-indexes highest at 2.3×. Fine dining and golf courses cluster together. Premium fitness and wellness rounds out the top four. Weekend activities skew toward premium, experiential occasions.',
      data: {
        rows: [
          { label: 'Car show & expo attendance', index: 2.3, percent: 32, trend: 'up', color: '#6b3c72' },
          { label: 'Fine dining & restaurants', index: 1.8, percent: 25, trend: 'up', color: '#9b6ba0' },
          { label: 'Golf courses', index: 1.6, percent: 22, trend: 'flat', color: '#c4a0c8' },
          { label: 'Premium fitness & wellness', index: 1.5, percent: 21, trend: 'flat', color: '#e0cce4' },
        ],
      },
    },
    {
      id: 'brand-affinity',
      title: 'Interests & brand affinity',
      subtitle: 'Categories & brands they over-index for',
      chartType: 'bars',
      metric: 'brand',
      compareMode: 'index',
      layout: 'split',
      span: 3,
      columns: 2,
      takeaway:
        'Affinity is strongest for premium automotive and financial services brands. CarousellAuto and BMW cluster together. Mercedes-Benz and Porsche also over-index.',
      data: {
        rows: [
          { label: 'CarousellAuto', index: 2.4, percent: 30, color: '#6b3c72' },
          { label: 'BMW', index: 2.0, percent: 25, color: '#9b6ba0' },
          { label: 'Mercedes-Benz', index: 1.9, percent: 24, color: '#c4a0c8' },
          { label: 'Porsche', index: 1.7, percent: 21, color: '#e0cce4' },
        ],
      },
    },
  ];
}

// Mobility & Movement — themed starter deck.
export function seedMobilityBlocks(): BlockConfig[] {
  return [
    {
      id: 'mob-presence',
      title: 'Home vs work split',
      subtitle: 'Where they are · by location type',
      chartType: 'segmented-bar',
      metric: 'presence',
      compareMode: 'percent',
      data: {
        rows: [
          { label: 'Residential', percent: 46, index: 1.4, color: '#6b3c72' },
          { label: 'Workplace', percent: 32, index: 1.2, color: '#9b6ba0' },
          { label: 'Transit', percent: 12, index: 0.9, color: '#c4a0c8' },
          { label: 'Retail & leisure', percent: 10, index: 1.1, color: '#e0cce4' },
        ],
      },
    },
    {
      id: 'mob-peak-hours',
      title: 'Peak movement hours',
      subtitle: 'Mobility index · by daypart',
      chartType: 'line',
      metric: 'movement',
      compareMode: 'index',
      data: {
        rows: [
          { label: '6–9am', index: 1.3, percent: 62 },
          { label: '12–2pm', index: 1.1, percent: 52 },
          { label: '5–7pm', index: 1.6, percent: 78 },
          { label: '8–10pm', index: 0.9, percent: 44 },
        ],
      },
    },
    {
      id: 'mob-districts',
      title: 'Top catchment districts',
      subtitle: 'Top catchment districts · vs national',
      chartType: 'bars',
      metric: 'district',
      compareMode: 'index',
      data: {
        rows: [
          { label: 'D10 · Tanglin', index: 2.1, percent: 30, trend: 'up' },
          { label: 'D11 · Novena', index: 1.7, percent: 26, trend: 'up' },
          { label: 'D9 · Orchard', index: 1.4, percent: 24, trend: 'flat' },
          { label: 'D15 · East Coast', index: 1.1, percent: 20, trend: 'down' },
        ],
      },
    },
  ];
}

// Temporal & Seasonal — themed starter deck.
export function seedTemporalBlocks(): BlockConfig[] {
  return [
    {
      id: 'tmp-peak',
      title: 'Peak day & hour',
      subtitle: 'When they index highest',
      chartType: 'stat-cards',
      metric: 'peak',
      compareMode: 'index',
      data: {
        rows: [
          { label: 'Peak day', display: 'Saturday', index: 1.8, trend: 'up' },
          { label: 'Peak hour', display: '10–12pm', index: 2.1, trend: 'up' },
          { label: 'Weekend lift', display: '+42%', index: 1.4, trend: 'up' },
          { label: 'Quietest', display: 'Tue am', index: 0.6, trend: 'down' },
        ],
      },
    },
    {
      id: 'tmp-season',
      title: 'Seasonality',
      subtitle: 'Seasonal index · by month',
      chartType: 'line',
      metric: 'season',
      compareMode: 'index',
      data: {
        rows: [
          { label: 'Jan', index: 1.2, percent: 60, trend: 'up' },
          { label: 'Feb', index: 1.4, percent: 70, trend: 'up' },
          { label: 'Mar', index: 1.8, percent: 90, trend: 'up' },
          { label: 'Apr', index: 1.5, percent: 75, trend: 'down' },
          { label: 'May', index: 1.3, percent: 65, trend: 'flat' },
          { label: 'Jun', index: 1.1, percent: 55, trend: 'down' },
        ],
      },
    },
    {
      id: 'tmp-daypart',
      title: 'Daypart mix',
      subtitle: 'Share of activity · by daypart',
      chartType: 'donut',
      metric: 'daypart',
      compareMode: 'percent',
      data: {
        rows: [
          { label: 'Morning', percent: 24, index: 1.3, color: '#6b3c72' },
          { label: 'Midday', percent: 28, index: 1.1, color: '#9b6ba0' },
          { label: 'Afternoon', percent: 30, index: 1.6, color: '#c4a0c8' },
          { label: 'Evening', percent: 18, index: 0.9, color: '#e0cce4' },
        ],
      },
    },
  ];
}

// ── Canned datasets for "break it down by …" edits + new blocks ──────────────

const DATASETS: Record<string, { subtitle: string; rows: BlockRow[] }> = {
  age: {
    subtitle: 'Age bands vs national',
    rows: [
      { label: '18–24', index: 0.5, percent: 8, trend: 'down' },
      { label: '25–34', index: 1.2, percent: 24, trend: 'up' },
      { label: '35–44', index: 1.8, percent: 31, trend: 'up' },
      { label: '45–54', index: 1.6, percent: 22, trend: 'flat' },
      { label: '55+', index: 0.8, percent: 15, trend: 'down' },
    ],
  },
  car: {
    subtitle: 'Vehicle ownership by lifestage',
    rows: [
      { label: 'Established Professionals', index: 2.1, percent: 34, trend: 'up' },
      { label: 'Aspirational Climbers', index: 1.6, percent: 28, trend: 'up' },
      { label: 'Growing Families', index: 1.9, percent: 26, trend: 'up' },
      { label: 'Other', index: 0.7, percent: 12, trend: 'down' },
    ],
  },
  channel: {
    subtitle: 'Reachable share · top channels',
    rows: [
      { label: 'LinkedIn / Digital', index: 2.0, percent: 41, trend: 'up' },
      { label: 'YouTube pre-roll', index: 1.7, percent: 33, trend: 'up' },
      { label: 'OOH / Premium print', index: 1.4, percent: 22, trend: 'flat' },
      { label: 'Email / CRM', index: 0.9, percent: 14, trend: 'down' },
    ],
  },
  spend: {
    subtitle: 'Category spend indexed',
    rows: [
      { label: 'Premium automotive', index: 2.4, percent: 32, trend: 'up' },
      { label: 'Financial services', index: 1.8, percent: 24, trend: 'up' },
      { label: 'Business travel', index: 1.7, percent: 21, trend: 'flat' },
      { label: 'Health & wellness', index: 1.6, percent: 18, trend: 'flat' },
    ],
  },
  brand: {
    subtitle: 'Brand affinity · over-index',
    rows: [
      { label: 'CarousellAuto', index: 2.4, percent: 30, color: '#6b3c72' },
      { label: 'BMW', index: 2.0, percent: 26, color: '#9b6ba0' },
      { label: 'Mercedes-Benz', index: 1.9, percent: 24, color: '#c4a0c8' },
      { label: 'Porsche', index: 1.7, percent: 20, color: '#e0cce4' },
    ],
  },
  district: {
    subtitle: 'Top catchment districts · vs national',
    rows: [
      { label: 'D10 · Tanglin', index: 2.1, percent: 30, trend: 'up' },
      { label: 'D11 · Novena', index: 1.7, percent: 26, trend: 'up' },
      { label: 'D9 · Orchard', index: 1.4, percent: 24, trend: 'flat' },
      { label: 'D15 · East Coast', index: 1.1, percent: 20, trend: 'down' },
    ],
  },
  season: {
    subtitle: 'Seasonal index · by month',
    rows: [
      { label: 'Jan', index: 1.2, percent: 60, trend: 'up' },
      { label: 'Feb', index: 1.4, percent: 70, trend: 'up' },
      { label: 'Mar', index: 1.8, percent: 90, trend: 'up' },
      { label: 'Apr', index: 1.5, percent: 75, trend: 'down' },
      { label: 'May', index: 1.3, percent: 65, trend: 'flat' },
      { label: 'Jun', index: 1.1, percent: 55, trend: 'down' },
    ],
  },
  daypart: {
    subtitle: 'Share of activity · by daypart',
    rows: [
      { label: 'Morning', percent: 24, index: 1.3, color: '#6b3c72' },
      { label: 'Midday', percent: 28, index: 1.1, color: '#9b6ba0' },
      { label: 'Afternoon', percent: 30, index: 1.6, color: '#c4a0c8' },
      { label: 'Evening', percent: 18, index: 0.9, color: '#e0cce4' },
    ],
  },
};

// ── Keyword → chart type / compare mode ──────────────────────────────────────

function detectChartType(text: string): ChartType | null {
  const t = text.toLowerCase();
  if (/\bdonut|doughnut|ring|pie\b/.test(t)) return 'donut';
  if (/\btable|grid of numbers|list\b/.test(t)) return 'table';
  if (/\bline|trend line|over time|trend chart\b/.test(t)) return 'line';
  if (/\bsegmented|stacked|share bar|one bar\b/.test(t)) return 'segmented-bar';
  if (/\bstat cards?|stat-cards?|big numbers?|number cards?\b/.test(t)) return 'stat-cards';
  if (/\bbar|bars|bar chart\b/.test(t)) return 'bars';
  return null;
}

function detectCompareMode(text: string): CompareMode | null {
  const t = text.toLowerCase();
  if (/\bpercent|percentage|% |share of|as %|proportion\b/.test(t) || t.trim().endsWith('%')) return 'percent';
  if (/\bcount|absolute|raw number|headcount|how many people\b/.test(t)) return 'count';
  if (/\bindex|indexed|vs national|multiplier\b/.test(t)) return 'index';
  return null;
}

function detectDataset(text: string): keyof typeof DATASETS | null {
  const t = text.toLowerCase();
  if (/\bage\b/.test(t)) return 'age';
  if (/\bcar|vehicle|ownership\b/.test(t)) return 'car';
  if (/\bchannel|reach|media|linkedin|youtube\b/.test(t)) return 'channel';
  if (/\bspend|purchase|buy|category\b/.test(t)) return 'spend';
  if (/\bbrand|affinity\b/.test(t)) return 'brand';
  if (/\bdistrict|catchment|postcode|area|neighbourhood|neighborhood\b/.test(t)) return 'district';
  if (/\bseason|month|monthly|time of year|quarter\b/.test(t)) return 'season';
  if (/\bdaypart|time of day|hour|morning|evening\b/.test(t)) return 'daypart';
  return null;
}

// Pull a title out of "rename this to X" / "call it X" / "title: X".
function detectTitle(text: string): string | null {
  const m =
    text.match(/(?:rename(?:\s+this)?\s+to|call\s+it|title(?:\s+it)?[:]?|name\s+it)\s+["“]?([^"”\n.]+)["”]?/i);
  if (!m) return null;
  return m[1].trim().replace(/\s+/g, ' ').replace(/[.\s]+$/, '');
}

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `block-${idCounter}-${Math.round(Date.now() % 100000)}`;
}

// ── The single intent → config step ──────────────────────────────────────────
// Preferred path is a real Anthropic call returning JSON matching BlockConfig;
// this is a fully-demoable keyword resolver behind the same signature.
// TODO(api): swap the body for an Anthropic call — instruct it to return ONLY a
// JSON patch (edit) or full BlockConfig (new), then strip fences + JSON.parse
// inside a try/catch, falling back to this heuristic resolver on any failure.

export type ResolveResult =
  | { kind: 'patch'; patch: Partial<BlockConfig>; reply: string }
  | { kind: 'new'; newBlock: BlockConfig; reply: string }
  | { kind: 'noop'; reply: string };

export function resolveBlockRequest(input: {
  userText: string;
  scope: 'edit' | 'new';
  currentConfig?: BlockConfig;
}): ResolveResult {
  const { userText, scope, currentConfig } = input;
  const text = userText.trim();

  if (scope === 'edit' && currentConfig) {
    const patch: Partial<BlockConfig> = {};
    const changed: string[] = [];

    const title = detectTitle(text);
    if (title) { patch.title = title; changed.push(`renamed to “${title}”`); }

    const chartType = detectChartType(text);
    // Apply if the type changes, OR if we're leaving a split layout (whose
    // chartType is otherwise cosmetic) — either way the requested chart renders.
    if (chartType && (chartType !== currentConfig.chartType || currentConfig.layout === 'split')) {
      patch.chartType = chartType;
      if (currentConfig.layout === 'split') patch.layout = 'stacked'; // exit takeaway+bars
      changed.push(`switched to a ${chartType.replace('-', ' ')} chart`);
    }

    const mode = detectCompareMode(text);
    if (mode && mode !== currentConfig.compareMode) {
      patch.compareMode = mode;
      changed.push(`now showing ${mode === 'index' ? 'index' : mode === 'percent' ? 'percent' : 'counts'}`);
    }

    const ds = detectDataset(text);
    if (ds && ds !== currentConfig.metric) {
      patch.metric = ds;
      patch.subtitle = DATASETS[ds].subtitle;
      patch.data = { rows: DATASETS[ds].rows };
      changed.push(`broke it down by ${ds === 'car' ? 'car ownership' : ds}`);
    }

    if (changed.length === 0) {
      return {
        kind: 'noop',
        reply:
          `I kept “${currentConfig.title}” as-is — try “make this a donut”, “show percent instead of index”, ` +
          `“break it down by age”, or “rename this to Income tiers”.`,
      };
    }
    return {
      kind: 'patch',
      patch,
      reply: `Done — ${changed.join(', ')} for “${patch.title ?? currentConfig.title}”.`,
    };
  }

  // scope === 'new' — build a whole block from the description.
  const chartType = detectChartType(text) ?? 'bars';
  const ds = detectDataset(text);
  const mode = detectCompareMode(text) ?? (chartType === 'segmented-bar' || chartType === 'donut' ? 'percent' : 'index');
  const title =
    detectTitle(text) ??
    (ds
      ? { age: 'Age breakdown', car: 'Car ownership', channel: 'Channel reach', spend: 'Category spend', brand: 'Brand affinity', district: 'Top districts', season: 'Seasonality', daypart: 'Daypart mix' }[ds]
      : 'New analysis');

  const base = ds ? DATASETS[ds] : DATASETS.spend;
  // Give segmented/donut charts colours if the dataset didn't supply them.
  const rows = base.rows.map((r, i) => ({ ...r, color: r.color ?? SEGMENT_PALETTE[i % SEGMENT_PALETTE.length] }));

  const newBlock: BlockConfig = {
    id: nextId(),
    title,
    subtitle: base.subtitle,
    chartType,
    metric: ds ?? 'spend',
    compareMode: mode,
    data: { rows },
  };
  return {
    kind: 'new',
    newBlock,
    reply: `Added “${title}” as a ${chartType.replace('-', ' ')} chart. Click its ✦ Ask to refine it.`,
  };
}
