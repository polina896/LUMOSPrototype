export type AudienceId = 'marsden-park-stockups' | 'parramatta-value-families' | 'castle-hill-bulk-buyers';

export interface Audience {
  id: AudienceId;
  name: string;
  shortDesc: string;
  reach: string;
  reachCount: string;
  indexScore: number;
  segments: string;
  description: string;
  demographic: {
    age: string;
    income: string;
    gender: string;
  };
  interests: string[];
  behaviours: string[];
  competitorBrands: { name: string; pct: number }[];
  channels: { name: string; pct: number; color: string }[];
  timing: string;
  messaging: string[];
  behaviourData: {
    weeklyFrequency: { day: string; txns: number }[];
    timeOfDay: { slot: string; pct: number; color: string }[];
    seasonalIndex: { month: string; index: number }[];
  };
}

export const AUDIENCES: Audience[] = [
  {
    id: 'marsden-park-stockups',
    name: 'Marsden Park Stock-Ups',
    shortDesc: '~186k households · North-West growth corridor · Index 264',
    reach: '29%',
    reachCount: '~186,000',
    indexScore: 264,
    segments: 'Marsden Park Stock-Ups',
    description: 'New-build family households across the North-West growth corridor — Marsden Park, Schofields, Box Hill and Riverstone. Large households, two cars, and a monthly big-shop habit built around bulk pantry, nappies and freezer stock. They already drive past the Costco catchment on the way to work, and travel further than any other cluster for a single shop.',
    demographic: {
      age: '30–45',
      income: '$145,000+ household',
      gender: '58% female primary shopper',
    },
    interests: ['Bulk & pantry stock-ups', 'New-build homes & renovation', 'Young families & childcare', 'Weekend sport', 'Fuel & car servicing', 'Home entertaining'],
    behaviours: [
      'Shops in one large monthly trip rather than several small ones — median basket 3.4× the metro average',
      'Travels a median 14km to a big-basket shop, passing the M7 and Richmond Road corridors each time',
      'Combines the big shop with fuel, hardware and a food-court stop — a two-to-three-hour Saturday outing',
      'Highly responsive to fuel-price and bulk-unit-price messaging; membership value is the deciding factor',
    ],
    competitorBrands: [
      { name: 'Woolworths', pct: 34 },
      { name: 'Coles', pct: 28 },
      { name: 'ALDI', pct: 24 },
      { name: 'BIG W', pct: 14 },
    ],
    channels: [
      { name: 'Roadside OOH (M7 / Richmond Rd)', pct: 36, color: '#7c6bf0' },
      { name: 'Meta / social', pct: 26, color: '#5b8def' },
      { name: 'Catalogue & letterbox', pct: 22, color: '#e96b7a' },
      { name: 'Radio — commute drive-time', pct: 16, color: '#f5a623' },
    ],
    timing: 'The big shop is a Saturday-morning ritual — 9am to 12pm accounts for 41% of weekly visits. Volume climbs at the start of each month with pay cycles, and peaks hard in the back-to-school window (mid-Jan) and the run into Christmas. Drive-time radio and roadside OOH land best Thursday–Saturday, immediately ahead of the trip.',
    messaging: [
      'Value lead: "One trip. One month sorted."',
      'Membership maths: "The membership pays for itself in two shops"',
      'Fuel hook: "Fill the trolley, then fill the tank — for less"',
      'Local proof: "Now open in Marsden Park — built for households like yours"',
    ],
    behaviourData: {
      weeklyFrequency: [
        { day: 'Mon', txns: 2 },
        { day: 'Tue', txns: 2 },
        { day: 'Wed', txns: 3 },
        { day: 'Thu', txns: 4 },
        { day: 'Fri', txns: 5 },
        { day: 'Sat', txns: 9 },
        { day: 'Sun', txns: 6 },
      ],
      timeOfDay: [
        { slot: 'Morning', pct: 41, color: '#f5a623' },
        { slot: 'Midday', pct: 26, color: '#7c6bf0' },
        { slot: 'Afternoon', pct: 21, color: '#5b8def' },
        { slot: 'Evening', pct: 12, color: '#e96b7a' },
      ],
      seasonalIndex: [
        { month: 'Jan', index: 152 },
        { month: 'Feb', index: 118 },
        { month: 'Mar', index: 104 },
        { month: 'Apr', index: 98 },
        { month: 'May', index: 92 },
        { month: 'Jun', index: 94 },
        { month: 'Jul', index: 96 },
        { month: 'Aug', index: 92 },
        { month: 'Sep', index: 98 },
        { month: 'Oct', index: 108 },
        { month: 'Nov', index: 132 },
        { month: 'Dec', index: 158 },
      ],
    },
  },
  {
    id: 'parramatta-value-families',
    name: 'Parramatta Value Families',
    shortDesc: '~248k households · Parramatta & Granville corridor · Index 218',
    reach: '38%',
    reachCount: '~248,000',
    indexScore: 218,
    segments: 'Parramatta Value Families',
    description: 'Multi-generational and multicultural households across Parramatta, Granville, Merrylands and Auburn. Often two families shopping as one — the biggest baskets in Greater Sydney by unit volume, with heavy weighting to fresh, rice, oil and household staples. Price per unit drives every decision, and the shop is frequently shared or split between households.',
    demographic: {
      age: '28–48',
      income: '$105,000+ household',
      gender: '54% female primary shopper',
    },
    interests: ['Bulk fresh & staples', 'Multi-generational households', 'Community & religious groups', 'Cricket & soccer', 'Money-saving & cashback', 'Cooking at scale'],
    behaviours: [
      'Shops fortnightly at high volume — often buying for two households in a single trip',
      'Cross-shops ALDI and independent bulk grocers; switches readily on unit price rather than brand',
      'Strong public-transport and short-drive catchment — Parramatta Road and Church Street are daily touchpoints',
      'Word-of-mouth travels fast through community and WhatsApp groups; referral drives membership sign-up',
    ],
    competitorBrands: [
      { name: 'ALDI', pct: 32 },
      { name: 'Woolworths', pct: 27 },
      { name: 'Independent bulk grocers', pct: 23 },
      { name: 'Coles', pct: 18 },
    ],
    channels: [
      { name: 'Digital OOH — Parramatta CBD', pct: 33, color: '#7c6bf0' },
      { name: 'Multicultural radio & press', pct: 27, color: '#5b8def' },
      { name: 'WhatsApp & community referral', pct: 24, color: '#e96b7a' },
      { name: 'Catalogue & letterbox', pct: 16, color: '#f5a623' },
    ],
    timing: 'Fortnightly rhythm tied to pay and benefit cycles, with a clear Sunday-afternoon peak (34% of weekly visits). Volume lifts sharply around Ramadan, Diwali and Lunar New Year, and again through the December school holidays. Commuter digital OOH performs best weekday evenings around the Parramatta interchange.',
    messaging: [
      'Unit-price lead: "Buy it by the box. Pay less by the unit."',
      'Household hook: "Big enough for the whole family — and the family next door"',
      'Community proof: "The shop Western Sydney families share"',
      'Referral driver: "Bring a friend. Split the trolley, not the value."',
    ],
    behaviourData: {
      weeklyFrequency: [
        { day: 'Mon', txns: 3 },
        { day: 'Tue', txns: 3 },
        { day: 'Wed', txns: 4 },
        { day: 'Thu', txns: 5 },
        { day: 'Fri', txns: 6 },
        { day: 'Sat', txns: 7 },
        { day: 'Sun', txns: 8 },
      ],
      timeOfDay: [
        { slot: 'Morning', pct: 22, color: '#f5a623' },
        { slot: 'Midday', pct: 24, color: '#7c6bf0' },
        { slot: 'Afternoon', pct: 34, color: '#5b8def' },
        { slot: 'Evening', pct: 20, color: '#e96b7a' },
      ],
      seasonalIndex: [
        { month: 'Jan', index: 138 },
        { month: 'Feb', index: 112 },
        { month: 'Mar', index: 128 },
        { month: 'Apr', index: 124 },
        { month: 'May', index: 98 },
        { month: 'Jun', index: 94 },
        { month: 'Jul', index: 96 },
        { month: 'Aug', index: 102 },
        { month: 'Sep', index: 108 },
        { month: 'Oct', index: 126 },
        { month: 'Nov', index: 118 },
        { month: 'Dec', index: 146 },
      ],
    },
  },
  {
    id: 'castle-hill-bulk-buyers',
    name: 'Castle Hill Bulk Buyers',
    shortDesc: '~132k households · Hills District · Index 186',
    reach: '21%',
    reachCount: '~132,000',
    indexScore: 186,
    segments: 'Castle Hill Bulk Buyers',
    description: 'Established Hills District households — Castle Hill, Baulkham Hills, Kellyville and Bella Vista. The highest-spend, lowest-frequency cluster: fewer trips, far bigger baskets, and a strong skew to premium bulk, entertaining and imported lines. They already hold warehouse memberships elsewhere and shop on quality-per-dollar rather than lowest price.',
    demographic: {
      age: '35–55',
      income: '$185,000+ household',
      gender: '51% female primary shopper',
    },
    interests: ['Premium bulk & entertaining', 'Home & garden', 'Travel', 'Wine & specialty food', 'Private schooling', 'Fitness & wellbeing'],
    behaviours: [
      'Shops roughly monthly with the highest average basket value of any cluster — 4.1× the metro average',
      'Buys for entertaining and stockpiling rather than weekly need; strong premium and imported-line uptake',
      'Already an existing warehouse-club member — the launch is a switch and share-of-wallet play, not first trial',
      'Plans the trip in advance; responds to range and quality messaging far more than discount messaging',
    ],
    competitorBrands: [
      { name: 'Existing warehouse clubs', pct: 38 },
      { name: 'Woolworths', pct: 26 },
      { name: 'Harris Farm & specialty', pct: 21 },
      { name: 'Coles', pct: 15 },
    ],
    channels: [
      { name: 'Roadside OOH — Windsor Rd / Old Northern Rd', pct: 31, color: '#7c6bf0' },
      { name: 'Retail media & search', pct: 28, color: '#5b8def' },
      { name: 'Email / CRM', pct: 23, color: '#e96b7a' },
      { name: 'Local press & school networks', pct: 18, color: '#f5a623' },
    ],
    timing: 'Monthly cadence with a Sunday-morning bias and a strong entertaining seasonality — spikes ahead of Easter, the September school holidays, and a pronounced November–December run for Christmas catering. Weekday-evening retail media captures the planning window two to three days before the trip.',
    messaging: [
      'Range lead: "Bulk, without the compromise"',
      'Entertaining hook: "Everything the long table needs, in one trip"',
      'Switch play: "Already a member somewhere? Compare the trolley."',
      'Convenience: "Twenty minutes from the Hills — worth the drive, once a month"',
    ],
    behaviourData: {
      weeklyFrequency: [
        { day: 'Mon', txns: 2 },
        { day: 'Tue', txns: 2 },
        { day: 'Wed', txns: 3 },
        { day: 'Thu', txns: 3 },
        { day: 'Fri', txns: 4 },
        { day: 'Sat', txns: 7 },
        { day: 'Sun', txns: 8 },
      ],
      timeOfDay: [
        { slot: 'Morning', pct: 36, color: '#f5a623' },
        { slot: 'Midday', pct: 28, color: '#7c6bf0' },
        { slot: 'Afternoon', pct: 24, color: '#5b8def' },
        { slot: 'Evening', pct: 12, color: '#e96b7a' },
      ],
      seasonalIndex: [
        { month: 'Jan', index: 118 },
        { month: 'Feb', index: 96 },
        { month: 'Mar', index: 112 },
        { month: 'Apr', index: 132 },
        { month: 'May', index: 94 },
        { month: 'Jun', index: 92 },
        { month: 'Jul', index: 98 },
        { month: 'Aug', index: 96 },
        { month: 'Sep', index: 124 },
        { month: 'Oct', index: 110 },
        { month: 'Nov', index: 142 },
        { month: 'Dec', index: 164 },
      ],
    },
  },
];

export interface StrategicInsight {
  id: string;
  stat: string;
  label: string;
  detail: string;
}

export const STRATEGIC_INSIGHTS: StrategicInsight[] = [
  {
    id: 'west-index',
    stat: '+38%',
    label: 'Bulk shopping vs metro average',
    detail: 'Bulk and warehouse-club shopping across Western Sydney indexes 38% above the Greater Sydney average, driven by larger households and a drive-to-shop habit — the Marsden Park catchment is the strongest single pocket in the metro.',
  },
  {
    id: 'spend-concentration',
    stat: '68% of value',
    label: 'From the top 25% of households',
    detail: '68% of big-basket category value comes from the top 25% of households — three clusters carry the launch, so where you advertise matters far more than how widely you advertise.',
  },
  {
    id: 'travel-distance',
    stat: '2.4×',
    label: 'Further travelled per shop',
    detail: 'North-West growth-corridor households travel 2.4× further than the metro average for a single big shop, passing the M7 and Richmond Road media corridors on every trip — roadside OOH reaches them in the mindset that matters.',
  },
  {
    id: 'saturday-window',
    stat: '41%',
    label: 'Of visits in one window',
    detail: '41% of big-basket visits happen between 9am and 12pm on Saturday — a narrow, predictable window that makes Thursday-to-Saturday weighting the single biggest efficiency lever in the plan.',
  },
];
