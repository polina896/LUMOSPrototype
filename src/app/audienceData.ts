export type AudienceId = 'premium-sedan-intenders' | 'ev-upgrade-shoppers' | 'family-suv-upgraders';

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
    id: 'premium-sedan-intenders',
    name: 'Premium Sedan Intenders',
    shortDesc: '~284k intenders · Premium Automotive · Index 245',
    reach: '32%',
    reachCount: '~284,000',
    indexScore: 245,
    segments: 'Premium Sedan Intenders',
    description: 'Affluent professionals in Singapore actively considering a premium sedan purchase in the next 6–12 months. They have owned 1–2 vehicles in the past five years and are brand-loyal but open to switching for the right combination of performance, prestige, and ownership experience.',
    demographic: {
      age: '28–50',
      income: 'SGD $120,000+',
      gender: '62% male',
    },
    interests: ['Premium automotive', 'Business travel', 'Golf & country clubs', 'Fine dining', 'Financial investment', 'Luxury lifestyle'],
    behaviours: [
      'Visits car showrooms or configurator tools 2–3× per month during consideration phase',
      'Researches vehicle specifications across multiple digital touchpoints before a dealer visit',
      'Peak consideration window aligns with year-end bonuses and Chinese New Year periods',
      'Highly responsive to test-drive invitations, exclusive preview events, and ownership privilege messaging',
    ],
    competitorBrands: [
      { name: 'BMW', pct: 38 },
      { name: 'Mercedes-Benz', pct: 32 },
      { name: 'Audi', pct: 18 },
      { name: 'Lexus', pct: 12 },
    ],
    channels: [
      { name: 'LinkedIn / Digital', pct: 34, color: '#7c6bf0' },
      { name: 'YouTube pre-roll', pct: 28, color: '#5b8def' },
      { name: 'OOH / Premium print', pct: 22, color: '#e96b7a' },
      { name: 'Email / CRM', pct: 16, color: '#f5a623' },
    ],
    timing: 'Consideration peaks in Q4 (Oct–Dec) around year-end bonus payouts and Q1 (Jan–Mar) ahead of Chinese New Year. Singapore Motor Show (Jan) drives a 52% uplift in showroom visits. Weekday evenings and Saturday mornings are the highest-engagement windows for digital content.',
    messaging: [
      'Prestige lead: "Precision engineered for Singapore\'s most discerning drivers"',
      'Heritage play: "Meridian — where performance meets refined living"',
      'Experience hook: "Book your private test drive — feel the difference"',
      'Ownership privilege: "Meridian ownership. Exclusive benefits from day one."',
    ],
    behaviourData: {
      weeklyFrequency: [
        { day: 'Mon', txns: 2 },
        { day: 'Tue', txns: 3 },
        { day: 'Wed', txns: 3 },
        { day: 'Thu', txns: 4 },
        { day: 'Fri', txns: 5 },
        { day: 'Sat', txns: 6 },
        { day: 'Sun', txns: 3 },
      ],
      timeOfDay: [
        { slot: 'Morning', pct: 14, color: '#f5a623' },
        { slot: 'Midday', pct: 22, color: '#7c6bf0' },
        { slot: 'Afternoon', pct: 32, color: '#5b8def' },
        { slot: 'Evening', pct: 32, color: '#e96b7a' },
      ],
      seasonalIndex: [
        { month: 'Jan', index: 148 },
        { month: 'Feb', index: 132 },
        { month: 'Mar', index: 112 },
        { month: 'Apr', index: 98 },
        { month: 'May', index: 92 },
        { month: 'Jun', index: 88 },
        { month: 'Jul', index: 86 },
        { month: 'Aug', index: 90 },
        { month: 'Sep', index: 96 },
        { month: 'Oct', index: 118 },
        { month: 'Nov', index: 136 },
        { month: 'Dec', index: 152 },
      ],
    },
  },
  {
    id: 'ev-upgrade-shoppers',
    name: 'EV Upgrade Shoppers',
    shortDesc: '~218k intenders · EV & Hybrid · Index 212',
    reach: '44%',
    reachCount: '~218,000',
    indexScore: 212,
    segments: 'EV Upgrade Shoppers',
    description: 'Current hybrid or EV owners in Singapore who are actively researching their next electric or plug-in hybrid vehicle. Motivated by Singapore\'s Green Plan 2030 incentives, lower running costs, and a genuine preference for cutting-edge automotive technology. Highest new-brand trial propensity of any segment.',
    demographic: {
      age: '25–45',
      income: 'SGD $95,000+',
      gender: '56% male',
    },
    interests: ['EV technology', 'Sustainability & green living', 'Tech & gadgets', 'Cycling & active commuting', 'Smart home', 'Social media & content'],
    behaviours: [
      'Actively follows EV news, range updates, and charging infrastructure developments in Singapore',
      'Compares 3–5 EV models simultaneously using online configurators and reviews',
      'Strong weekday morning digital engagement and weekend charging-station dwell behaviour',
      'Responds strongly to range demonstrations, charging cost calculators, and Green Plan incentive messaging',
    ],
    competitorBrands: [
      { name: 'Tesla', pct: 42 },
      { name: 'BYD', pct: 28 },
      { name: 'Hyundai IONIQ', pct: 18 },
      { name: 'Volvo EX', pct: 12 },
    ],
    channels: [
      { name: 'Mobile / App', pct: 40, color: '#7c6bf0' },
      { name: 'YouTube / Digital video', pct: 28, color: '#1D9E75' },
      { name: 'Social media', pct: 22, color: '#5b8def' },
      { name: 'EV forums & communities', pct: 10, color: '#f5a623' },
    ],
    timing: 'Purchase decisions accelerate following Singapore Budget announcements (Feb) when EV rebates and COE policies are updated. Q1 and Q3 are the highest consideration quarters. Digital engagement peaks weekday mornings (7–9am) when commuters research during transit.',
    messaging: [
      'Technology lead: "Meridian EV — engineered for Singapore\'s electric future"',
      'Incentive hook: "Maximise your Green Plan rebate with Meridian"',
      'Range confidence: "650km range. Singapore fits comfortably."',
      'Trial driver: "Experience zero-compromise EV driving — book a test drive"',
    ],
    behaviourData: {
      weeklyFrequency: [
        { day: 'Mon', txns: 5 },
        { day: 'Tue', txns: 6 },
        { day: 'Wed', txns: 5 },
        { day: 'Thu', txns: 6 },
        { day: 'Fri', txns: 7 },
        { day: 'Sat', txns: 5 },
        { day: 'Sun', txns: 3 },
      ],
      timeOfDay: [
        { slot: 'Morning', pct: 38, color: '#f5a623' },
        { slot: 'Midday', pct: 24, color: '#7c6bf0' },
        { slot: 'Afternoon', pct: 26, color: '#5b8def' },
        { slot: 'Evening', pct: 12, color: '#e96b7a' },
      ],
      seasonalIndex: [
        { month: 'Jan', index: 132 },
        { month: 'Feb', index: 148 },
        { month: 'Mar', index: 124 },
        { month: 'Apr', index: 108 },
        { month: 'May', index: 100 },
        { month: 'Jun', index: 96 },
        { month: 'Jul', index: 94 },
        { month: 'Aug', index: 98 },
        { month: 'Sep', index: 128 },
        { month: 'Oct', index: 116 },
        { month: 'Nov', index: 112 },
        { month: 'Dec', index: 120 },
      ],
    },
  },
  {
    id: 'family-suv-upgraders',
    name: 'Family SUV Upgraders',
    shortDesc: '~462k intenders · Family SUV · Index 188',
    reach: '24%',
    reachCount: '~462,000',
    indexScore: 188,
    segments: 'Family SUV Upgraders',
    description: 'Current MPV or mid-size SUV owners in Singapore whose upgrade timing is driven by family milestones — a second child, primary school enrolment, or an ageing vehicle approaching its 10-year COE renewal. Practical-first buyers who prioritise safety ratings, third-row seating, and total ownership cost alongside brand confidence.',
    demographic: {
      age: '30–48',
      income: 'SGD $85,000+',
      gender: '52% male',
    },
    interests: ['Family activities', 'School & education', 'Weekend road trips to Malaysia', 'Home improvement', 'Sports & kids\' activities', 'Parenting communities'],
    behaviours: [
      'Researches safety ratings, boot space, and COE renewal cost as primary decision factors',
      'Involves partner in the purchase decision — dual-influence household buying pattern',
      'Visits showrooms on weekends with family present; values child-friendly test-drive experiences',
      'Highly influenced by school-gate word-of-mouth and parenting community recommendations',
    ],
    competitorBrands: [
      { name: 'Toyota Alphard/Vellfire', pct: 36 },
      { name: 'Kia Carnival', pct: 28 },
      { name: 'Honda CR-V', pct: 22 },
      { name: 'Mazda CX-8', pct: 14 },
    ],
    channels: [
      { name: 'Facebook / Meta', pct: 36, color: '#7c6bf0' },
      { name: 'WhatsApp communities', pct: 26, color: '#1D9E75' },
      { name: 'Digital OOH near schools', pct: 24, color: '#5b8def' },
      { name: 'YouTube family content', pct: 14, color: '#f5a623' },
    ],
    timing: 'Consideration spikes around P1 primary school registration (Jan–Feb), mid-year school holidays (Jun), and year-end school breaks (Nov–Dec). COE renewal windows create predictable upgrade triggers. Weekend showroom visits peak on Saturday afternoons between school runs.',
    messaging: [
      'Safety first: "Seven seats. Five-star safety. One Meridian."',
      'Family hook: "Built for every school run, road trip, and adventure in between"',
      'COE angle: "Smarter than renewal — upgrade to Meridian and own your drive"',
      'Community trust: "Chosen by Singapore families. Proven on every school run."',
    ],
    behaviourData: {
      weeklyFrequency: [
        { day: 'Mon', txns: 2 },
        { day: 'Tue', txns: 3 },
        { day: 'Wed', txns: 3 },
        { day: 'Thu', txns: 3 },
        { day: 'Fri', txns: 4 },
        { day: 'Sat', txns: 7 },
        { day: 'Sun', txns: 6 },
      ],
      timeOfDay: [
        { slot: 'Morning', pct: 20, color: '#f5a623' },
        { slot: 'Midday', pct: 18, color: '#7c6bf0' },
        { slot: 'Afternoon', pct: 36, color: '#5b8def' },
        { slot: 'Evening', pct: 26, color: '#e96b7a' },
      ],
      seasonalIndex: [
        { month: 'Jan', index: 142 },
        { month: 'Feb', index: 138 },
        { month: 'Mar', index: 108 },
        { month: 'Apr', index: 96 },
        { month: 'May', index: 92 },
        { month: 'Jun', index: 136 },
        { month: 'Jul', index: 128 },
        { month: 'Aug', index: 98 },
        { month: 'Sep', index: 102 },
        { month: 'Oct', index: 106 },
        { month: 'Nov', index: 144 },
        { month: 'Dec', index: 148 },
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
    id: 'q1-uplift',
    stat: '+42%',
    label: 'Q1 vehicle registration uplift',
    detail: 'New vehicle registrations in Singapore index 42% above baseline in Q1, driven by year-end bonus spending and Chinese New Year purchase decisions — making Jan–Mar the highest-potential launch window for Meridian Motors.',
  },
  {
    id: 'consideration-concentration',
    stat: '74% of conversions',
    label: 'From top 30% of intenders',
    detail: '74% of total category conversions are driven by the top 30% of active intenders — targeting Premium Sedan Intenders and EV Upgrade Shoppers is the most efficient path to launch velocity.',
  },
  {
    id: 'ev-trial-propensity',
    stat: '3.8×',
    label: 'EV segment brand trial rate',
    detail: 'EV Early Adopters trial new automotive brands at 3.8× the rate of the general market — a technology-forward campaign and exclusive test-drive event will accelerate new-brand consideration.',
  },
  {
    id: 'digital-influence',
    stat: '68%',
    label: 'Digital-influenced showroom visits',
    detail: '68% of Singapore car buyers research extensively online before their first showroom visit — digital-first creative is essential for Meridian\'s awareness and consideration phases.',
  },
];
