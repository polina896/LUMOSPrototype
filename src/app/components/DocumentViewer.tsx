import { useState } from 'react';
import { ArrowLeft, Share2, Download, Sparkles } from 'lucide-react';

export type DocKey = 'strategy' | 'matrix' | 'brief';

/* ---------------------------------------------------------------- data --- */

const TITLES: Record<DocKey, [string, string]> = {
  strategy: ['Meridian Motors Singapore — Audience Strategy', 'Audience Strategy'],
  matrix: ['Meridian Motors — Launch Messaging Matrix', 'Messaging Matrix'],
  brief: ['Meridian Motors Q1 — Campaign Brief', 'Campaign Brief'],
};

const PILLS: { key: DocKey; label: string; dot: string; n: string }[] = [
  { key: 'strategy', label: 'Audience Strategy', dot: '#8b5fa0', n: '1' },
  { key: 'matrix', label: 'Messaging Matrix', dot: '#2455a0', n: '2' },
  { key: 'brief', label: 'Campaign Brief', dot: '#1e7a42', n: '3' },
];

const AUDIENCES = [
  {
    rank: 1, name: 'Affluent Professionals', size: '96,400',
    who: '35–54 · household income S$250K+ · District 9–11 & Bukit Timah',
    signals: [
      ['Luxury-auto dealer visits', 92, '184'], ['Premium fuel / EV charging', 78, '156'],
      ['Business-class travel', 71, '142'], ["Fine-dining & members' clubs", 64, '128'],
    ] as [string, number, string][],
    reach: [
      ['Best channel', 'DOOH · Orchard + CBD'], ['Best window', 'Weekdays 8–10am'],
      ['Dwell at hotspots', '41 min median'], ['Digital overlap', 'LinkedIn · CTV · 82%'],
    ] as [string, string][],
  },
  {
    rank: 2, name: 'Tech-savvy Families', size: '74,900',
    who: '32–45 · dual-income · 1–2 kids · Punggol, Tampines, Bishan',
    signals: [
      ['EV / hybrid research', 88, '176'], ['7-seater & SUV browsing', 74, '148'],
      ['Big-box & IKEA visits', 69, '138'], ['Weekend enrichment / schools', 61, '122'],
    ] as [string, number, string][],
    reach: [
      ['Best channel', 'Retail DOOH · YouTube'], ['Best window', 'Sat–Sun 10am–2pm'],
      ['Dwell at hotspots', '63 min median'], ['Digital overlap', 'Meta · Search · 79%'],
    ] as [string, string][],
  },
  {
    rank: 3, name: 'Expat Executives', size: '31,200',
    who: '30–50 · relocation ≤3 yrs · condo tenancy · District 1, 4, 15',
    signals: [
      ['Car-lease / subscription intent', 95, '191'], ['International schools', 81, '162'],
      ['Airport & serviced-apt travel', 76, '152'], ['Premium grocery (Cold Storage)', 58, '116'],
    ] as [string, number, string][],
    reach: [
      ['Best channel', 'CTV · Airport DOOH'], ['Best window', 'Weeknights 7–10pm'],
      ['Dwell at hotspots', '38 min median'], ['Digital overlap', 'Instagram · CTV · 74%'],
    ] as [string, string][],
  },
];

const HOTSPOTS: [string, number, string][] = [
  ['Orchard Road corridor', 100, '148,200'], ['Marina Bay / CBD', 83, '122,600'],
  ['East Coast Parkway', 61, '90,400'], ['Jewel / Changi Airport', 47, '69,900'],
  ['Tampines regional hub', 38, '56,100'],
];

const PLAYS: [string, string, string][] = [
  ['Own the morning Orchard–CBD corridor',
    'Weekday 8–10am DOOH burst against Affluent Professionals, the peak density window. Anchor the new model-year hero.',
    'Reaches ~66% of Audience 1 · lowest cost-per-qualified-reach'],
  ['Weekend retail + YouTube for Families',
    'Sat–Sun 10am–2pm at Tampines & Jewel, synced to a 7-seater / EV YouTube sequence. Long 63-min dwell supports frequency without extra buys.',
    'Natural 3× frequency from dwell alone'],
  ['Retarget the exposed to showroom & test-drive',
    'Build an OOH-exposed seed from these five sites; retarget across CTV + Meta with a test-drive CTA and measure showroom visit-lift vs a hold-out control.',
    'Benchmark: +31% visit lift on comparable auto campaigns'],
];

const HEAT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HEAT_HOURS = ['6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p'];
const HEAT_DATA = [
  [96, 182, 150, 120, 108, 116, 132, 102],
  [98, 178, 148, 118, 106, 112, 128, 104],
  [100, 176, 152, 122, 110, 118, 138, 108],
  [102, 180, 156, 124, 112, 120, 142, 114],
  [110, 170, 148, 132, 124, 142, 162, 150],
  [118, 150, 196, 206, 178, 150, 138, 132],
  [112, 140, 184, 192, 168, 140, 130, 120],
];
function heatColor(v: number) {
  const t = Math.max(0, Math.min(1, (v - 80) / 130));
  const stops = [[239, 231, 242], [185, 143, 202], [107, 60, 114], [61, 31, 74]];
  const seg = t * 3, i = Math.min(2, Math.floor(seg)), f = seg - i;
  const a = stops[i], b = stops[i + 1];
  const c = a.map((x, k) => Math.round(x + (b[k] - x) * f));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

// Messaging Matrix
const MATRIX: { aud: string; sz: string; vp: string; drv: string; hook: string; proof: string; cta: string; chans: string[] }[] = [
  {
    aud: 'Affluent Professionals', sz: '96.4K reachable',
    vp: 'Effortless command of your morning. The car that respects your time as much as you do.',
    drv: 'Earned ease — reward for the standard you hold yourself to.',
    hook: '"Your 8am, upgraded."',
    proof: 'Proof: 41-min dwell in Orchard/CBD → the commute is where they live. Lead with quiet luxury + adaptive drive.',
    cta: 'Book a private preview', chans: ['DOOH · Orchard', 'LinkedIn', 'CTV'],
  },
  {
    aud: 'Expat Executives', sz: '31.2K reachable',
    vp: 'The easiest way to drive well in a new city — ownership or subscription, sorted in a week.',
    drv: 'Belonging & control — arrive settled, no friction.',
    hook: '"New here. Already sorted."',
    proof: 'Proof: 191 index on lease/subscription intent → lead with flexibility, English-first concierge, airport-to-driveway delivery.',
    cta: 'Explore flexible ownership', chans: ['CTV', 'Airport DOOH', 'Instagram'],
  },
];
const PROOFS: { badge: string; color: string; name: string; rows: [string, number, string][] }[] = [
  {
    badge: 'A', color: '#1e7a42', name: 'Affluent Professionals',
    rows: [['Adaptive quiet cabin', 90, 'High'], ['Concierge servicing', 74, 'Med'], ['Resale value retention', 66, 'Med'], ['0–100 performance stat', 28, 'Low']],
  },
  {
    badge: 'E', color: '#995500', name: 'Expat Executives',
    rows: [['Subscription flexibility', 94, 'High'], ['Delivery to your door', 80, 'High'], ['Family / school-run space', 63, 'Med'], ['Heritage / brand history', 31, 'Low']],
  },
];
const DO_ITEMS = [
  'Lead with the moment (the commute, the arrival), not the spec sheet',
  'Show the car in real Singapore context — Orchard, ECP, Changi',
  'Keep copy calm and confident; one idea per frame',
  'Always pair a hook with one signal-backed proof point',
];
const DONT_ITEMS = [
  "Don't lead with 0–100 times or top speed — both audiences under-index",
  "Don't use price as the hook; it's a closing detail, not an opener",
  "Don't crowd the frame — luxury reads as space",
  "Don't reuse the same hero line across both audiences",
];

// Campaign Brief
const KPIS: [string, string][] = [
  ['2,400', 'Test-drive bookings'], ['+25%', 'Showroom visit-lift vs control'],
  ['≤ S$500', 'Cost per qualified booking'], ['3.2M', 'Qualified reach (de-dup)'],
];
const BRIEF_AUDS: { name: string; pct: number; label: string; from: string; to: string }[] = [
  { name: 'Affluent Professionals', pct: 100, label: '96.4K · 50%', from: '#a5d3b6', to: '#1e7a42' },
  { name: 'Tech-savvy Families', pct: 66, label: '74.9K · 32%', from: '#a9c3e8', to: '#2455a0' },
  { name: 'Expat Executives', pct: 34, label: '31.2K · 18%', from: '#f0cf9a', to: '#995500' },
];
const FUNNEL: { stage: string; goal: string; copy: string; kicker: string; pct: string; bg: string }[] = [
  { stage: 'Awareness', goal: 'Build exposed seed', copy: 'Programmatic DOOH across the 5 priority hotspots, weighted to peak density windows.', kicker: 'Orchard · Marina Bay · ECP · Jewel · Tampines', pct: '50%', bg: '#6b3c72' },
  { stage: 'Consideration', goal: 'Extend & sequence', copy: 'CTV + YouTube + Meta retargeting the OOH-exposed audience with model-specific creative.', kicker: 'Sequenced from hero → proof → offer', pct: '35%', bg: '#8b5fa0' },
  { stage: 'Conversion', goal: 'Drive the booking', copy: 'Search + Meta lead-gen with test-drive CTA; retarget showroom non-visitors at 7 days.', kicker: 'Test-drive booking form + concierge follow-up', pct: '15%', bg: '#b57fc2' },
];
const FLIGHT: { name: string; left: number; width: number; bg: string; label: string }[] = [
  { name: 'DOOH', left: 0, width: 52, bg: '#6b3c72', label: 'Launch burst' },
  { name: 'CTV / YouTube', left: 16, width: 70, bg: '#8b5fa0', label: 'Sequenced retargeting' },
  { name: 'Meta / Social', left: 24, width: 72, bg: '#a86cb8', label: 'Always-on + offer' },
  { name: 'Search', left: 8, width: 90, bg: '#c08fce', label: 'Always-on capture' },
];
const FLIGHT_COLS = ['Jan W1–2', 'Jan W3–4', 'Feb W1–2', 'Feb W3–4', 'Mar W1–2', 'Mar W3–4'];
const MEASURE: [string, string][] = [
  ['Exposed vs control', 'Visit-lift measured on the OOH seed via matched hold-out'],
  ['Weekly', 'In-flight optimisation against CPQB & pacing'],
  ['Day 90', 'Post-campaign report: bookings, lift, share shift'],
];

/* --------------------------------------------------------------- styles --- */

const CSS = `
.docviewer{
  --purple:#6b3c72;--purple-d:#5c2375;--purple-tint:#f1e9ff;
  --ink:#1a1a1a;--ink-2:#444;--ink-3:#6c6c6c;--muted:#9a9a9a;
  --line:#e9e7e4;--line-2:#f0efec;--canvas:#f4f2ef;--paper:#fff;
  --green-bg:#e8f4ec;--green-tx:#1e7a42;--blue-bg:#eaf0fb;--blue-tx:#2455a0;
  --amber-bg:#fef3e2;--amber-tx:#995500;
  font-family:'DM Sans',sans-serif;color:var(--ink);line-height:1.55;
}
.docviewer .jua{font-family:'Jua',sans-serif;font-weight:400}
.docviewer .stage{padding:22px 24px 80px;display:flex;justify-content:center}
.docviewer .page{width:100%;max-width:860px;background:var(--paper);border:1px solid var(--line);border-radius:16px;
  box-shadow:0 1px 2px rgba(0,0,0,.03),0 16px 40px -24px rgba(0,0,0,.22);overflow:hidden}
.docviewer .doc-head{padding:38px 48px 30px;border-bottom:1px solid var(--line-2)}
.docviewer .kicker{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--purple);font-weight:600;margin-bottom:12px}
.docviewer .doc-head h1{font-family:'Jua';font-size:30px;line-height:1.18;color:var(--ink)}
.docviewer .lede{font-size:15px;color:var(--ink-3);margin-top:12px;max-width:60ch}
.docviewer .meta-row{display:flex;flex-wrap:wrap;gap:22px;margin-top:22px;padding-top:20px;border-top:1px dashed var(--line)}
.docviewer .meta-row .m{display:flex;flex-direction:column;gap:3px}
.docviewer .meta-row .m .k{font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.docviewer .meta-row .m .v{font-size:13px;color:var(--ink-2);font-weight:600}
.docviewer .tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px}
.docviewer .tag{font-size:11.5px;padding:4px 10px;border-radius:6px}
.docviewer .sec{padding:34px 48px}
.docviewer .sec + .sec{border-top:1px solid var(--line-2)}
.docviewer .sec-num{font-family:'Jua';font-size:12px;color:var(--purple);background:var(--purple-tint);width:26px;height:26px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;flex:none}
.docviewer .sec-head{display:flex;align-items:center;gap:11px;margin-bottom:6px}
.docviewer .sec-head h2{font-family:'Jua';font-size:19px;color:var(--ink)}
.docviewer .sec-sub{font-size:13.5px;color:var(--ink-3);margin:2px 0 20px 37px;max-width:64ch}
.docviewer .takeaway{background:linear-gradient(180deg,#faf7fc,#f6f1f8);border:1px solid #ece2f0;border-left:3px solid var(--purple);border-radius:12px;padding:16px 18px;margin:0 0 22px;display:flex;gap:12px;align-items:flex-start}
.docviewer .takeaway .ic{font-size:15px;flex:none;color:var(--purple)}
.docviewer .takeaway p{font-size:14.5px;color:#40304a}
.docviewer .takeaway b{color:var(--purple);font-weight:700}
.docviewer .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:0 0 6px}
.docviewer .stats.three{grid-template-columns:repeat(3,1fr)}
.docviewer .stat{border:1px solid var(--line);border-radius:12px;padding:15px 16px;background:#fdfdfc}
.docviewer .stat .big{font-family:'Jua';font-size:26px;color:var(--ink);line-height:1}
.docviewer .stat .big .u{font-size:14px;color:var(--ink-3)}
.docviewer .stat .lbl{font-size:12px;color:var(--ink-3);margin-top:8px}
.docviewer .stat .delta{font-size:11.5px;font-weight:600;margin-top:5px}
.docviewer .up{color:var(--green-tx)}
.docviewer .aud-card{border:1px solid var(--line);border-radius:14px;margin-bottom:14px;overflow:hidden}
.docviewer .aud-top{display:flex;align-items:center;gap:14px;padding:16px 18px;border-bottom:1px solid var(--line-2)}
.docviewer .aud-rank{font-family:'Jua';font-size:13px;width:26px;height:26px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:var(--ink);color:#fff;flex:none}
.docviewer .aud-name{font-family:'Jua';font-size:16px;color:var(--ink)}
.docviewer .aud-who{font-size:12.5px;color:var(--ink-3);margin-top:1px}
.docviewer .aud-size{margin-left:auto;text-align:right;flex:none}
.docviewer .aud-size .n{font-family:'Jua';font-size:19px;color:var(--purple)}
.docviewer .aud-size .l{font-size:10.5px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
.docviewer .aud-body{display:grid;grid-template-columns:1.3fr 1fr}
.docviewer .aud-col{padding:15px 18px}
.docviewer .aud-col + .aud-col{border-left:1px solid var(--line-2)}
.docviewer .aud-col h4{font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:9px}
.docviewer .sig{display:flex;align-items:center;gap:10px;margin-bottom:9px}
.docviewer .sig .sname{font-size:12.5px;color:var(--ink-2);width:120px;flex:none}
.docviewer .bar{flex:1;height:7px;border-radius:4px;background:#efedea;overflow:hidden}
.docviewer .bar > span{display:block;height:100%;border-radius:4px;background:linear-gradient(90deg,#8b5fa0,#6b3c72)}
.docviewer .sig .sx{font-size:11.5px;font-weight:600;color:var(--purple);width:34px;text-align:right;flex:none}
.docviewer .kv{display:flex;justify-content:space-between;gap:10px;font-size:12.5px;padding:5px 0;border-bottom:1px dashed var(--line-2)}
.docviewer .kv:last-child{border-bottom:0}
.docviewer .kv .kk{color:var(--ink-3)}
.docviewer .kv .vv{color:var(--ink-2);font-weight:600;text-align:right}
.docviewer .hot{display:flex;align-items:center;gap:14px;padding:11px 0;border-bottom:1px solid var(--line-2)}
.docviewer .hot:last-child{border-bottom:0}
.docviewer .hot .rank{font-family:'Jua';font-size:12px;color:var(--muted);width:20px;flex:none}
.docviewer .hot .pin{width:9px;height:9px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:var(--purple);flex:none}
.docviewer .hot .place{font-size:13.5px;color:var(--ink);font-weight:500;flex:none;width:170px}
.docviewer .hot .htrack{flex:1;height:8px;background:#f0eeec;border-radius:5px;overflow:hidden}
.docviewer .hot .htrack > span{display:block;height:100%;background:linear-gradient(90deg,#c9a9d6,#6b3c72)}
.docviewer .hot .reach{font-size:12.5px;color:var(--ink-2);font-weight:600;width:96px;text-align:right;flex:none}
.docviewer .heat table{border-collapse:separate;border-spacing:3px;width:100%}
.docviewer .heat td,.docviewer .heat th{text-align:center}
.docviewer .heat th{font-size:10px;color:var(--muted);font-weight:500;padding-bottom:2px}
.docviewer .heat .rowlab{font-size:10.5px;color:var(--ink-3);text-align:right;padding-right:6px;white-space:nowrap;font-weight:500}
.docviewer .heat .cell{height:24px;border-radius:5px;font-size:10px;font-weight:600;position:relative}
.docviewer .heat-legend{display:flex;align-items:center;gap:8px;margin-top:12px;font-size:11px;color:var(--muted)}
.docviewer .heat-legend .grad{width:120px;height:8px;border-radius:5px;background:linear-gradient(90deg,#efe7f2,#b98fca,#6b3c72,#3d1f4a)}
.docviewer .star{position:absolute;top:-6px;right:-4px;font-size:11px}
.docviewer .matrix-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:12px}
.docviewer table.matrix{border-collapse:collapse;width:100%;min-width:640px;font-size:12.5px}
.docviewer table.matrix th,.docviewer table.matrix td{text-align:left;padding:13px 14px;vertical-align:top;border-bottom:1px solid var(--line-2)}
.docviewer table.matrix thead th{font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-weight:600;background:#faf9f7}
.docviewer table.matrix tbody tr:last-child td{border-bottom:0}
.docviewer table.matrix .rowh{font-family:'Jua';font-size:13.5px;color:var(--ink);white-space:nowrap}
.docviewer table.matrix .rowh .sz{display:block;font-family:'DM Sans';font-size:11px;color:var(--muted);font-weight:500;margin-top:3px}
.docviewer table.matrix td .hook{color:var(--ink);font-weight:600;margin-bottom:4px}
.docviewer table.matrix td .proof{color:var(--ink-3);font-size:11.5px}
.docviewer .cta-chip{display:inline-block;font-size:11px;padding:3px 9px;border-radius:6px;background:var(--purple-tint);color:var(--purple);font-weight:600}
.docviewer .chan{display:inline-block;font-size:11px;padding:3px 8px;border-radius:6px;background:#f3f3f1;color:#555;margin:0 4px 4px 0}
.docviewer .dd{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:6px}
.docviewer .dd .box{border:1px solid var(--line);border-radius:12px;padding:15px 16px}
.docviewer .dd .box h4{font-family:'Jua';font-size:13px;margin-bottom:10px}
.docviewer .dd .do h4{color:var(--green-tx)}
.docviewer .dd .dont h4{color:#b23}
.docviewer .dd ul{list-style:none;margin:0;padding:0}
.docviewer .dd li{font-size:12.5px;color:var(--ink-2);padding:5px 0 5px 18px;position:relative}
.docviewer .dd li::before{position:absolute;left:0;top:5px;font-size:11px}
.docviewer .dd .do li::before{content:'✓';color:var(--green-tx)}
.docviewer .dd .dont li::before{content:'✕';color:#b23}
.docviewer .funnel{display:flex;flex-direction:column;gap:10px}
.docviewer .fstage{display:flex;border:1px solid var(--line);border-radius:12px;overflow:hidden}
.docviewer .fstage .flabel{width:150px;flex:none;padding:14px 16px;background:#faf9f7;border-right:1px solid var(--line-2)}
.docviewer .fstage .flabel .ft{font-family:'Jua';font-size:13px;color:var(--ink)}
.docviewer .fstage .flabel .fg{font-size:11px;color:var(--muted);margin-top:2px}
.docviewer .fstage .fbody{flex:1;padding:14px 16px;display:flex;flex-direction:column;justify-content:center}
.docviewer .fstage .fbody .fc{font-size:12.5px;color:var(--ink-2)}
.docviewer .fstage .fbody .fk{font-size:11px;color:var(--muted);margin-top:4px}
.docviewer .fbar{width:110px;flex:none;display:flex;align-items:center;justify-content:center;font-family:'Jua';font-size:15px;color:#fff}
.docviewer .flight{border:1px solid var(--line);border-radius:12px;overflow:hidden}
.docviewer .flight .fhead{display:grid;grid-template-columns:130px repeat(6,1fr);background:#faf9f7;border-bottom:1px solid var(--line-2)}
.docviewer .flight .fhead div{font-size:10.5px;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;padding:9px 8px;text-align:center;font-weight:600}
.docviewer .flight .fhead div:first-child{text-align:left}
.docviewer .flight .frow{display:grid;grid-template-columns:130px 1fr;align-items:center;border-bottom:1px solid var(--line-2)}
.docviewer .flight .frow:last-child{border-bottom:0}
.docviewer .flight .frow .fn{font-size:12.5px;color:var(--ink-2);font-weight:600;padding:10px 12px}
.docviewer .flight .frow .track{position:relative;height:34px;margin:0 8px}
.docviewer .gbar{position:absolute;height:16px;top:9px;border-radius:8px;font-size:10px;color:#fff;display:flex;align-items:center;padding:0 8px;font-weight:600;white-space:nowrap;overflow:hidden}
.docviewer .plays{display:flex;flex-direction:column;gap:10px}
.docviewer .play{display:flex;gap:14px;border:1px solid var(--line);border-radius:12px;padding:14px 16px}
.docviewer .play .pn{font-family:'Jua';font-size:14px;color:#fff;background:var(--purple);width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex:none}
.docviewer .play .pt{font-size:13.5px;font-weight:700;color:var(--ink)}
.docviewer .play .pd{font-size:12.5px;color:var(--ink-3);margin-top:3px}
.docviewer .play .pw{font-size:11.5px;color:var(--purple);margin-top:6px;font-weight:600}
.docviewer .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.docviewer .kpi{border:1px solid var(--line);border-radius:12px;padding:14px;text-align:center;background:#fdfdfc}
.docviewer .kpi .kn{font-family:'Jua';font-size:22px;color:var(--purple)}
.docviewer .kpi .kl{font-size:11.5px;color:var(--ink-3);margin-top:5px}
.docviewer .inline-ask{margin-top:20px;display:flex;align-items:center;gap:10px;border:1px dashed #d8cbdf;border-radius:11px;padding:11px 14px;background:#fbf9fc}
.docviewer .inline-ask .lm{width:22px;height:22px;border-radius:7px;background:var(--purple);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Jua';font-size:12px;flex:none}
.docviewer .inline-ask input{flex:1;border:0;background:transparent;font-family:'DM Sans';font-size:13px;color:var(--ink-2);outline:none}
.docviewer .inline-ask input::placeholder{color:#b6a9bd}
.docviewer .inline-ask .go{font-size:11.5px;color:var(--purple);font-weight:600;cursor:pointer}
@media(max-width:720px){
  .docviewer .stats,.docviewer .stats.three,.docviewer .kpis{grid-template-columns:repeat(2,1fr)}
  .docviewer .aud-body{grid-template-columns:1fr}
  .docviewer .aud-col + .aud-col{border-left:0;border-top:1px solid var(--line-2)}
  .docviewer .dd{grid-template-columns:1fr}
  .docviewer .sec,.docviewer .doc-head{padding-left:24px;padding-right:24px}
}
`;

/* ----------------------------------------------------------- fragments --- */

function Heatmap() {
  return (
    <>
      <div className="heat">
        <table>
          <thead>
            <tr>
              <th />
              {HEAT_HOURS.map((h) => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {HEAT_DATA.map((row, d) => {
              const max = Math.max(...row);
              const maxi = row.indexOf(max);
              return (
                <tr key={d}>
                  <td className="rowlab">{HEAT_DAYS[d]}</td>
                  {row.map((v, h) => (
                    <td key={h}>
                      <div className="cell" style={{ background: heatColor(v), color: v > 150 ? '#fff' : '#6b4a72' }}>
                        {v}{h === maxi && max > 140 && <span className="star">★</span>}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="heat-legend">
        <span>Lower index</span><span className="grad" /><span>Higher index</span>
        <span style={{ marginLeft: 'auto' }}>★ best window to reach</span>
      </div>
    </>
  );
}

function InlineAsk({ placeholder }: { placeholder: string }) {
  return (
    <div className="inline-ask">
      <span className="lm">✦</span>
      <input placeholder={placeholder} readOnly />
      <span className="go">Ask ▸</span>
    </div>
  );
}

/* ---------------------------------------------------------------- docs --- */

function StrategyDoc() {
  return (
    <>
      <div className="doc-head">
        <div className="kicker">Audience Strategy · Singapore Premium Auto</div>
        <h1>Meridian Motors Singapore<br />Audience Strategy</h1>
        <p className="lede">Three priority audiences for the Q1 model-year launch — who they are, where they move, and when to reach them — built on Lumos mobility, spend and identity signals across 4.1M Singapore-resident profiles.</p>
        <div className="tags">
          <span className="tag" style={{ background: 'var(--green-bg)', color: 'var(--green-tx)' }}>Affluent Professionals</span>
          <span className="tag" style={{ background: 'var(--blue-bg)', color: 'var(--blue-tx)' }}>Tech-savvy Families</span>
          <span className="tag" style={{ background: 'var(--amber-bg)', color: 'var(--amber-tx)' }}>Expat Executives</span>
        </div>
        <div className="meta-row">
          {[['Prepared for', 'Meridian Motors · Marketing'], ['Market', 'Singapore'], ['Window', 'Q1 FY26 launch'], ['Created', 'Today, 10:18 pm'], ['Confidence', '±2.4% · 95% CI']].map(([k, v]) => (
            <div className="m" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">01</span><h2>The opportunity</h2></div>
        <p className="sec-sub">In-market demand for premium sedans and EVs is concentrated in a small, high-value, highly mobile population — reachable if timing and place are right.</p>
        <div className="takeaway"><span className="ic">◆</span><p>Just <b>three audiences hold 71% of qualified premium-auto intent</b> in Singapore, yet they cluster in predictable corridors — Orchard, Marina Bay and the East Coast — for only a few hours each week. Concentration is the opportunity.</p></div>
        <div className="stats">
          <div className="stat"><div className="big">218K</div><div className="lbl">In-market premium-auto intenders</div><div className="delta up">▲ 9% vs last quarter</div></div>
          <div className="stat"><div className="big">71<span className="u">%</span></div><div className="lbl">Of intent held by top 3 audiences</div><div className="delta">of 12 modelled segments</div></div>
          <div className="stat"><div className="big">1.8<span className="u">×</span></div><div className="lbl">Peak index vs Singapore adult avg</div><div className="delta up">Affluent Professionals</div></div>
          <div className="stat"><div className="big">S$4.9<span className="u">B</span></div><div className="lbl">Est. addressable annual spend</div><div className="delta">new + upgrade purchases</div></div>
        </div>
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">02</span><h2>Priority audiences</h2></div>
        <p className="sec-sub">Ranked by qualified intent × addressable spend. Signal strength shown as index vs the Singapore adult baseline (100 = average).</p>
        {AUDIENCES.map((a) => (
          <div className="aud-card" key={a.rank}>
            <div className="aud-top">
              <span className="aud-rank">{a.rank}</span>
              <div><div className="aud-name">{a.name}</div><div className="aud-who">{a.who}</div></div>
              <div className="aud-size"><div className="n">{a.size}</div><div className="l">reachable</div></div>
            </div>
            <div className="aud-body">
              <div className="aud-col">
                <h4>Top signals · index vs avg</h4>
                {a.signals.map(([name, w, x]) => (
                  <div className="sig" key={name}><span className="sname">{name}</span><span className="bar"><span style={{ width: `${w}%` }} /></span><span className="sx">{x}</span></div>
                ))}
              </div>
              <div className="aud-col">
                <h4>How to reach</h4>
                {a.reach.map(([k, v]) => (
                  <div className="kv" key={k}><span className="kk">{k}</span><span className="vv">{v}</span></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">03</span><h2>Where they are</h2></div>
        <p className="sec-sub">Footfall hotspots across the three audiences, ranked by unique reach — the OOH surfaces that put you in their path to the showroom.</p>
        <div className="takeaway"><span className="ic">◆</span><p>Five sites deliver <b>62% of combined weekly reach</b>. Orchard and Marina Bay alone touch two-thirds of Affluent Professionals before they ever visit a dealership.</p></div>
        {HOTSPOTS.map(([place, w, reach], i) => (
          <div className="hot" key={place}>
            <span className="rank">{i + 1}</span><span className="pin" />
            <span className="place">{place}</span>
            <span className="htrack"><span style={{ width: `${w}%` }} /></span>
            <span className="reach">{reach}</span>
          </div>
        ))}
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">04</span><h2>When to reach them</h2></div>
        <p className="sec-sub">Combined audience density by hour and day. Darker = higher index vs weekly average; ★ marks the single best window per day to be live.</p>
        <Heatmap />
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">05</span><h2>Recommended plays</h2></div>
        <p className="sec-sub">How to turn the concentration above into a launch plan. Sequenced by funnel stage.</p>
        <div className="plays">
          {PLAYS.map(([t, d, w], i) => (
            <div className="play" key={t}>
              <span className="pn">{i + 1}</span>
              <div><div className="pt">{t}</div><div className="pd">{d}</div><div className="pw">▸ {w}</div></div>
            </div>
          ))}
        </div>
        <InlineAsk placeholder="Ask Lumos to model reach & frequency for these plays at a S$1.2M budget…" />
      </div>
    </>
  );
}

function MatrixDoc() {
  return (
    <>
      <div className="doc-head">
        <div className="kicker">Messaging Matrix · Launch Creative</div>
        <h1>Meridian Motors<br />Launch Messaging Matrix</h1>
        <p className="lede">The single source of truth for what we say to whom. Each audience gets a core value proposition, an emotional driver, proof points, and channel-ready hooks — grounded in Lumos signal data.</p>
        <div className="tags">
          <span className="tag" style={{ background: 'var(--green-bg)', color: 'var(--green-tx)' }}>Affluent Professionals</span>
          <span className="tag" style={{ background: 'var(--amber-bg)', color: 'var(--amber-tx)' }}>Expat Executives</span>
        </div>
        <div className="meta-row">
          {[['Prepared for', 'Meridian Motors · Brand'], ['Campaign', 'Q1 model-year launch'], ['Version', 'v2 · approved for build'], ['Created', 'Today, 10:22 pm']].map(([k, v]) => (
            <div className="m" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">01</span><h2>Positioning spine</h2></div>
        <p className="sec-sub">The one line every execution ladders back to — then flexed per audience below.</p>
        <div className="takeaway"><span className="ic">◆</span><p><b>"Engineered for the life you've built."</b> — premium capability framed as earned reward, not status. Signal data shows both priority audiences over-index on <b>achievement and family-provision cues</b>, and under-respond to raw performance bragging.</p></div>
        <div className="stats three">
          <div className="stat"><div className="big">Reward</div><div className="lbl">Master emotional territory</div></div>
          <div className="stat"><div className="big">Calm</div><div className="lbl">Tone · confident, not loud</div></div>
          <div className="stat"><div className="big">Proof</div><div className="lbl">Every claim signal-backed</div></div>
        </div>
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">02</span><h2>The matrix</h2></div>
        <p className="sec-sub">Rows are audiences; columns are the message system. Read left-to-right to build any execution.</p>
        <div className="matrix-wrap">
          <table className="matrix">
            <thead><tr><th>Audience</th><th>Core value prop</th><th>Emotional driver</th><th>Lead hook + proof</th><th>CTA · Channel</th></tr></thead>
            <tbody>
              {MATRIX.map((r) => (
                <tr key={r.aud}>
                  <td className="rowh">{r.aud}<span className="sz">{r.sz}</span></td>
                  <td>{r.vp}</td>
                  <td>{r.drv}</td>
                  <td><div className="hook">{r.hook}</div><div className="proof">{r.proof}</div></td>
                  <td>
                    <span className="cta-chip">{r.cta}</span>
                    <div style={{ marginTop: 8 }}>{r.chans.map((c) => <span className="chan" key={c}>{c}</span>)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">03</span><h2>Proof-point library</h2></div>
        <p className="sec-sub">Interchangeable proof points, ranked by resonance for each audience. Pull the top one for hero, others for supporting frames.</p>
        {PROOFS.map((p) => (
          <div className="aud-card" key={p.name}>
            <div className="aud-top"><span className="aud-rank" style={{ background: p.color }}>{p.badge}</span><div className="aud-name">{p.name}</div></div>
            <div className="aud-col" style={{ padding: '16px 18px' }}>
              {p.rows.map(([name, w, tag]) => (
                <div className="sig" key={name}><span className="sname">{name}</span><span className="bar"><span style={{ width: `${w}%` }} /></span><span className="sx">{tag}</span></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">04</span><h2>Creative guardrails</h2></div>
        <p className="sec-sub">What keeps every execution on-territory across both audiences.</p>
        <div className="dd">
          <div className="box do"><h4>◇ Do</h4><ul>{DO_ITEMS.map((t) => <li key={t}>{t}</li>)}</ul></div>
          <div className="box dont"><h4>◇ Don't</h4><ul>{DONT_ITEMS.map((t) => <li key={t}>{t}</li>)}</ul></div>
        </div>
        <InlineAsk placeholder="Ask Lumos to draft 3 DOOH headline variants for Expat Executives…" />
      </div>
    </>
  );
}

function BriefDoc() {
  return (
    <>
      <div className="doc-head">
        <div className="kicker">Campaign Brief · Q1 FY26</div>
        <h1>Meridian Motors Q1<br />Campaign Brief</h1>
        <p className="lede">The launch of the new model-year range across Singapore. This brief aligns objective, audience, channels, flighting and measurement into one plan — ready for agency and media partners.</p>
        <div className="tags">
          <span className="tag" style={{ background: 'var(--green-bg)', color: 'var(--green-tx)' }}>Affluent Professionals</span>
          <span className="tag" style={{ background: 'var(--blue-bg)', color: 'var(--blue-tx)' }}>Tech-savvy Families</span>
          <span className="tag" style={{ background: 'var(--amber-bg)', color: 'var(--amber-tx)' }}>Expat Executives</span>
        </div>
        <div className="meta-row">
          {[['Client', 'Meridian Motors'], ['Flight', '6 Jan – 30 Mar 2026'], ['Working budget', 'S$1.2M'], ['Objective', 'Test-drive bookings'], ['Owner', 'P. Nesterova']].map(([k, v]) => (
            <div className="m" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">01</span><h2>Background &amp; challenge</h2></div>
        <div className="takeaway"><span className="ic">◆</span><p>The new range lands in a market where <b>premium-auto intent is up 9% but attention is scarce</b> — our audiences are in-corridor for only a few hours a week. The challenge isn't awareness; it's <b>converting concentrated presence into showroom visits</b>.</p></div>
        <p style={{ fontSize: '13.5px', color: 'var(--ink-2)' }}>Meridian is refreshing its sedan and EV line-up for FY26. Prior campaigns leaned on broad awareness and under-delivered on qualified test-drives. This quarter shifts spend toward the three audiences and five hotspots identified in the Audience Strategy, with a hard test-drive KPI and closed-loop footfall measurement.</p>
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">02</span><h2>Objective &amp; KPIs</h2></div>
        <p className="sec-sub">One primary objective. Everything is measured against test-drive bookings and showroom visit-lift.</p>
        <div className="kpis">
          {KPIS.map(([n, l]) => <div className="kpi" key={l}><div className="kn">{n}</div><div className="kl">{l}</div></div>)}
        </div>
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">03</span><h2>Target audiences</h2></div>
        <p className="sec-sub">Prioritised from the Meridian Audience Strategy. Budget weighted to reachable intent.</p>
        {BRIEF_AUDS.map((a) => (
          <div className="hot" key={a.name}>
            <span className="pin" style={{ background: a.to }} />
            <span className="place" style={{ width: 190 }}>{a.name}</span>
            <span className="htrack"><span style={{ width: `${a.pct}%`, background: `linear-gradient(90deg,${a.from},${a.to})` }} /></span>
            <span className="reach">{a.label}</span>
          </div>
        ))}
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">04</span><h2>Channel plan</h2></div>
        <p className="sec-sub">Full-funnel, OOH-led into digital retargeting — using the exposed audience as the seed.</p>
        <div className="funnel">
          {FUNNEL.map((f) => (
            <div className="fstage" key={f.stage}>
              <div className="flabel"><div className="ft">{f.stage}</div><div className="fg">{f.goal}</div></div>
              <div className="fbody"><div className="fc">{f.copy}</div><div className="fk">{f.kicker}</div></div>
              <div className="fbar" style={{ background: f.bg }}>{f.pct}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">05</span><h2>Flighting</h2></div>
        <p className="sec-sub">13-week flight, Jan–Mar. OOH front-loaded to build the seed; digital sustains and converts.</p>
        <div className="flight">
          <div className="fhead"><div>Channel</div>{FLIGHT_COLS.map((c) => <div key={c}>{c}</div>)}</div>
          {FLIGHT.map((f) => (
            <div className="frow" key={f.name}>
              <div className="fn">{f.name}</div>
              <div className="track"><span className="gbar" style={{ left: `${f.left}%`, width: `${f.width}%`, background: f.bg }}>{f.label}</span></div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="sec-head"><span className="sec-num">06</span><h2>Measurement &amp; approvals</h2></div>
        <p className="sec-sub">Closed-loop, exposed-vs-control. Lumos measures showroom visit-lift on the OOH-exposed seed.</p>
        <div className="stats three">
          {MEASURE.map(([n, l]) => <div className="stat" key={n}><div className="big" style={{ fontSize: 20 }}>{n}</div><div className="lbl">{l}</div></div>)}
        </div>
        <div className="meta-row" style={{ borderTop: '1px solid var(--line-2)', marginTop: 24 }}>
          {[['Client approval', '☐ Pending — Meridian CMO'], ['Media approval', '☑ Approved — Planning'], ['Creative', '→ See Messaging Matrix v2'], ['Go-live', '6 Jan 2026']].map(([k, v]) => (
            <div className="m" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
          ))}
        </div>
        <InlineAsk placeholder="Ask Lumos to project bookings at S$1.2M given these audiences & CPQB…" />
      </div>
    </>
  );
}

const DOCS: Record<DocKey, () => JSX.Element> = {
  strategy: StrategyDoc,
  matrix: MatrixDoc,
  brief: BriefDoc,
};

/* --------------------------------------------------------------- shell --- */

export default function DocumentViewer({ initialDoc = 'strategy', onBack }: { initialDoc?: DocKey; onBack: () => void }) {
  const [doc, setDoc] = useState<DocKey>(initialDoc);
  const Body = DOCS[doc];
  const [title, type] = TITLES[doc];

  return (
    <div className="docviewer flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f4f2ef]">
      <style>{CSS}</style>

      {/* Top bar */}
      <div className="flex-none flex items-center gap-4 px-6 py-3 bg-white border-b border-[#e9e7e4]">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 text-[13px] text-[#444] px-2.5 py-1.5 rounded-lg hover:bg-[#f4f2ef] transition-colors whitespace-nowrap">
          <ArrowLeft className="w-4 h-4" /> Documents
        </button>
        <span className="font-['Jua',sans-serif] text-[15px] text-[#1a1a1a] truncate">{title}</span>
        <span className="text-[11px] px-2.5 py-[3px] rounded-md bg-[#f3f3f1] text-[#555] whitespace-nowrap">{type}</span>
        <span className="flex-1" />
        <button className="inline-flex items-center gap-1.5 text-[12.5px] px-3 py-1.5 rounded-lg border border-[#e9e7e4] bg-white text-[#444] hover:bg-[#f5f5f3] transition-colors whitespace-nowrap"><Share2 className="w-3.5 h-3.5" /> Share</button>
        <button className="inline-flex items-center gap-1.5 text-[12.5px] px-3 py-1.5 rounded-lg border border-[#e9e7e4] bg-white text-[#444] hover:bg-[#f5f5f3] transition-colors whitespace-nowrap"><Download className="w-3.5 h-3.5" /> Export</button>
        <button className="inline-flex items-center gap-1.5 text-[12.5px] px-3 py-1.5 rounded-lg bg-[#6b3c72] hover:bg-[#5c2375] text-white transition-colors whitespace-nowrap"><Sparkles className="w-3.5 h-3.5" /> Ask Lumos</button>
      </div>

      {/* Switcher */}
      <div className="flex-none flex justify-center gap-2 px-6 pt-4 pb-1 bg-[#f4f2ef] flex-wrap">
        {PILLS.map((p) => {
          const active = p.key === doc;
          return (
            <button
              key={p.key}
              onClick={() => setDoc(p.key)}
              className={`inline-flex items-center gap-2 text-[12.5px] px-3.5 py-2 rounded-full border transition-colors ${active ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white text-[#6c6c6c] border-[#e9e7e4] hover:border-[#d9d5d0]'}`}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: p.dot }} />
              {p.label}
              <span className={`text-[10px] ${active ? 'text-white/55' : 'text-[#9a9a9a]'}`}>{p.n}</span>
            </button>
          );
        })}
      </div>

      {/* Page */}
      <div className="flex-1 overflow-y-auto">
        <div className="stage">
          <div className="page"><Body /></div>
        </div>
      </div>
    </div>
  );
}
