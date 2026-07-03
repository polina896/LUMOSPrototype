import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Maximize2, Plus, Eye, X, RotateCw, Check, Info, ChevronRight, SlidersHorizontal } from 'lucide-react';

// ── Digital Twin tab ─────────────────────────────────────────────────────────
// The audience as a conversational synthetic respondent (not a look-alike).
// Two flows:
//   A) Talk to a twin — pick the whole audience (aggregate, third-person) or a
//      persona (first-person, in-character) and interrogate them. Every answer
//      is tagged measured vs modelled.
//   B) Create a persona — a 3-step drawer that mints a new persona FROM A
//      SEGMENT, keeping synthetic identity (modelled) and behaviour (measured)
//      separate. On save it joins the rail and is immediately chattable.
//
// Ported from the standalone wireframe (digital-twin-flow.html). Threads are
// pre-seeded stubs so the loop is demonstrable without a backend.

type Provenance = 'measured' | 'modelled';
type Heat = 'cold' | 'warm' | 'hot';

type Trust = { label: string; kind: Provenance };
type Variant = { lab: string; text: string };
type Reaction = { tag: string; heat: Heat; text: string };

type ChatMsg = {
  role: 'you' | 'twin';
  text: string;
  variants?: Variant[];         // labelled copy options shown inside a "you" bubble
  grounded?: string;            // "Grounded in:" atoms
  trust?: Trust[];
  reactions?: Reaction[];       // per-variant reaction rows in a twin answer
  verdict?: string;             // "nudge read" summary line
};

type Persona = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  lms?: string;
  basisShare?: string;          // e.g. "34%"
  voice: 'aggregate' | 'character';
  isNew?: boolean;
  starters: string[];
  seeded: ChatMsg[];
};

// ── seed data ────────────────────────────────────────────────────────────────

const WHOLE: Persona = {
  id: 'whole',
  name: 'Whole audience',
  avatar: '∑',
  role: '612k · blended',
  voice: 'aggregate',
  starters: [
    'What do they buy?',
    'Which competitor stores do they visit?',
    'Best channel & time to reach them?',
    'How would they react to a $260 launch?',
    'Stress-test message A vs B',
  ],
  seeded: [
    { role: 'you', text: 'What do they actually buy, and which competitor stores do they visit?' },
    {
      role: 'twin',
      text: 'They skew heavily to sports nutrition (1.9×) and athleisure (1.8×), avg basket $48, mostly in-store. On visitation, 42% have been to rebel Sport in the last 3 months (1.6× metro), 31% a lululemon store, 27% Nike or a specialty running store.',
      grounded: 'Purchase patterns · Competitor & POI visitation',
      trust: [{ label: 'measured', kind: 'measured' }],
    },
    { role: 'you', text: 'Best way and time to reach them for a launch?' },
    {
      role: 'twin',
      text: 'OOH around home at Sat 6–9am is the strongest single window (2.3×). Social indexes on weekday evenings and retail media on weekends. A “tested on your weekend route” framing lands better than race-day performance for this crowd.',
      grounded: 'Peak dayparts · Best time by channel · Brand affinity',
      trust: [{ label: 'measured', kind: 'measured' }, { label: 'phrasing modelled', kind: 'modelled' }],
    },
  ],
};

const MARA: Persona = {
  id: 'mara',
  name: 'Mara, 34',
  avatar: 'M',
  role: 'Weekend Runner · Brunswick',
  lms: 'LMS-0131',
  basisShare: '34%',
  voice: 'character',
  starters: ['What would make you switch brands?', 'React to this tagline', 'What do you buy after a run?', '$260 launch — yes or no?'],
  seeded: [
    { role: 'you', text: 'Would you pay $260 for a premium running shoe?' },
    {
      role: 'twin',
      text: 'Honestly? Maybe — but you’d have to earn it. I normally spend around $180 and I replace them when my knees start complaining, not on a schedule. If it genuinely helped my Saturday long run I’d stretch, but “pro-grade” on its own doesn’t move me.',
      grounded: 'Basket & price sensitivity · Category purchase cycle',
      trust: [{ label: 'measured', kind: 'measured' }, { label: 'voice modelled', kind: 'modelled' }],
    },
    { role: 'you', text: 'Where would an ad actually reach you?' },
    {
      role: 'twin',
      text: 'Out and about near home early Saturday — I’m on my route by 7. During the week it’s Instagram in the evenings once the kids are down. Radio and race-day banners mostly wash over me.',
      grounded: 'Peak dayparts · Channel affinity (Brunswick)',
      trust: [{ label: 'measured', kind: 'measured' }, { label: 'voice modelled', kind: 'modelled' }],
    },
  ],
};

const DANIEL: Persona = {
  id: 'daniel',
  name: 'Daniel, 41',
  avatar: 'D',
  role: 'Family Trailgoer · Sandringham',
  lms: 'LMS-0119',
  basisShare: '22%',
  voice: 'character',
  starters: ['What gets the family out?', 'React to this tagline', 'Would you upgrade your gear?', 'Where do you shop?'],
  seeded: [
    { role: 'you', text: 'What actually gets you buying new running gear?' },
    {
      role: 'twin',
      text: 'It’s usually the kids, honestly — a family trail day at the You Yangs and someone’s shoes are shot. I buy practical and durable over flashy, and I’ll wait for a sale unless something’s broken. Weekends are when I’m actually in the shops.',
      grounded: 'Purchase triggers · Weekend mobility · Price sensitivity',
      trust: [{ label: 'measured', kind: 'measured' }, { label: 'voice modelled', kind: 'modelled' }],
    },
  ],
};

const INITIAL_PERSONAS = [WHOLE, MARA, DANIEL];

// The Sam persona minted by the create flow (starts with an empty thread).
const SAM: Persona = {
  id: 'sam',
  name: 'Sam, 29',
  avatar: 'S',
  role: 'Weekend Runner · Fitzroy',
  lms: 'LMS-0148',
  basisShare: '34%',
  voice: 'character',
  isNew: true,
  starters: [
    'Test marathon copy — would you buy $260 shoes?',
    'What do you buy after a run?',
    'Where would an ad reach you?',
    'React to this tagline',
  ],
  seeded: [],
};

// The Melbourne Marathon copy-test exchange — injected when Sam's marathon
// starter is used. Demonstrates pressure-testing copy for a purchase nudge.
function marathonCopyTest(): ChatMsg[] {
  return [
    {
      role: 'you',
      text: 'It’s ~3 weeks out from the Melbourne Marathon. Which of these would get you to invest in a new pair of $260 shoes?',
      variants: [
        { lab: 'A', text: '“Race-day tested — shave minutes off your PB.”' },
        { lab: 'B', text: '“Your city. Your marathon. New shoes for Melbourne.”' },
        { lab: 'C', text: '“Built to outlast your whole training block.”' },
      ],
    },
    {
      role: 'twin',
      text: 'Three weeks out I’m deep in taper and precious about my legs — so the timing’s right, this is exactly when I think about gear.',
      reactions: [
        { tag: 'cold', heat: 'cold', text: 'A — leaves me cold. I don’t chase a PB, I run for the Saturday habit. “Shave minutes” feels aimed at someone faster than me.' },
        { tag: 'leans in', heat: 'hot', text: 'B — this lands. It’s my marathon, my streets, Fitzroy to the Tan. Nod to Melbourne and the event I’m actually in and I lean in.' },
        { tag: 'opens wallet', heat: 'hot', text: 'C — the one that opens my wallet. I buy on value, and “outlast your training block” tells me $260 is justified, not hype.' },
      ],
      grounded: 'Price sensitivity · Local running (58%) · Event affinity — Melb Marathon 3.2×',
      trust: [{ label: 'measured', kind: 'measured' }, { label: 'voice modelled', kind: 'modelled' }],
    },
    { role: 'you', text: 'So — would you actually buy at $260 before race day?' },
    {
      role: 'twin',
      text: 'Probably yes — but only if B and C run together. Frame it as “gear up for your Melbourne Marathon — built to last well beyond it,” put it in the fortnight before, near home or on my Saturday route. Lead on raw performance and I scroll straight past.',
      verdict: 'Nudge read: conversion likely if event-timed local framing (B) is paired with a value/durability hook (C), delivered in the 2 weeks pre-race via OOH near home. Pure-performance framing (A) does not move him.',
      grounded: 'Basket & price sensitivity ($48 avg / $180 shoe spend) · Peak dayparts · Event calendar',
      trust: [{ label: 'measured', kind: 'measured' }, { label: 'voice & verdict modelled', kind: 'modelled' }],
    },
  ];
}

// ── segments offered by the create flow ──────────────────────────────────────
const SEGMENTS = [
  { id: 'weekend', name: 'Weekend Runners', share: 34, size: '~208k', idx: 'athleisure 1.8×' },
  { id: 'family', name: 'Family Trailgoers', share: 22, size: '~135k', idx: 'kids’ outdoor 2.1×' },
  { id: 'commuter', name: 'Early-morning Commuter-runners', share: 18, size: '~110k', idx: 'transit + gym 1.6×' },
  { id: 'event', name: 'Event Chasers', share: 14, size: '~86k', idx: 'marathon sign-ups 3.2×' },
];

// ── small presentational bits ────────────────────────────────────────────────

function TrustPill({ t }: { t: Trust }) {
  const measured = t.kind === 'measured';
  return (
    <span
      className="font-['Inter',sans-serif] text-[9px] rounded-[5px] px-[6px] py-[1px] whitespace-nowrap"
      style={
        measured
          ? { background: '#f3f3f1', color: '#6b6b6b', border: '1px solid #e5e5e2' }
          : { background: '#f1e9ff', color: '#6b3c72' }
      }
    >
      {t.label}
    </span>
  );
}

const HEAT: Record<Heat, { color: string; bg: string }> = {
  cold: { color: '#6b6b6b', bg: '#f3f3f1' },
  warm: { color: '#a65a2e', bg: '#f6ece2' },
  hot: { color: '#2f7d4f', bg: '#e7f3ec' },
};

// ── main component ───────────────────────────────────────────────────────────

export default function DigitalTwinTab() {
  const [personas, setPersonas] = useState<Persona[]>(INITIAL_PERSONAS);
  const [selectedId, setSelectedId] = useState('whole');
  const [threads, setThreads] = useState<Record<string, ChatMsg[]>>(() =>
    Object.fromEntries(INITIAL_PERSONAS.map((p) => [p.id, p.seeded]))
  );
  const [draft, setDraft] = useState('');

  // create flow: null (closed) | 'basis' | 'review'
  const [createStep, setCreateStep] = useState<null | 'basis' | 'review'>(null);
  const [segmentId, setSegmentId] = useState('weekend');

  const threadRef = useRef<HTMLDivElement>(null);
  const selected = personas.find((p) => p.id === selectedId)!;
  const messages = threads[selectedId] ?? [];
  const firstName = selected.name.split(',')[0];

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [messages.length, selectedId]);

  const append = (id: string, msgs: ChatMsg[]) =>
    setThreads((t) => ({ ...t, [id]: [...(t[id] ?? []), ...msgs] }));

  // In-character vs aggregate stub reply.
  const stub = (q: string): ChatMsg =>
    selected.voice === 'character'
      ? {
          role: 'twin',
          text: `(${firstName}, in character) “${q}” — here’s where my grounded, first-person answer appears, drawn from the ${selected.basisShare ?? ''} of the audience I represent.`,
          grounded: 'Segment atoms',
          trust: [{ label: 'measured', kind: 'measured' }, { label: 'voice modelled', kind: 'modelled' }],
        }
      : {
          role: 'twin',
          text: `Looking at the whole audience: “${q}” — here’s where the grounded, aggregate answer appears, drawn from this audience’s live data.`,
          grounded: 'Audience atoms',
          trust: [{ label: 'measured', kind: 'measured' }],
        };

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    // Special: Sam's marathon starter injects the full copy-test exchange.
    if (selectedId === 'sam' && /marathon/i.test(q)) {
      append('sam', marathonCopyTest());
    } else {
      append(selectedId, [{ role: 'you', text: q }, stub(q)]);
    }
    setDraft('');
  };

  // create flow → save mints Sam, selects him, lands on his empty thread.
  const savePersona = () => {
    if (!personas.some((p) => p.id === 'sam')) {
      setPersonas((ps) => [...ps, SAM]);
      setThreads((t) => ({ ...t, sam: [] }));
    }
    setSelectedId('sam');
    setCreateStep(null);
  };

  const seg = SEGMENTS.find((s) => s.id === segmentId)!;

  return (
    <div className="relative w-full font-['Inter',sans-serif]">
      {/* ── Takeaway hero ── */}
      <div
        className="rounded-[14px] border border-[#bebde7] p-[18px] mb-[14px]"
        style={{ background: 'linear-gradient(180deg,#F7F1FF 0%, #FBFAFF 100%)' }}
      >
        <div className="flex items-center gap-2 mb-[9px]">
          <Sparkles className="w-[14px] h-[14px] text-[#6b3c72]" />
          <span className="font-['Inter',sans-serif] text-[10px] font-semibold tracking-[0.12em] uppercase text-[#6b3c72]">
            Talk to a synthetic stand-in
          </span>
        </div>
        <div className="font-['Jua',sans-serif] text-[19px] leading-[1.3] text-[#1a1a1a] mb-[8px] max-w-[66ch]">
          A synthetic stand-in of this audience, built from the measured data in the other three tabs.
        </div>
        <div className="text-[13px] leading-[1.6] text-[#6b6b6b] max-w-[82ch]">
          Ask it about messaging, product or price and it answers in character. Every answer shows what’s{' '}
          <b className="text-[#1a1a1a]">measured</b> vs <b className="text-[#1a1a1a]">modelled</b>, so you can see where
          the data ends and the model begins.
        </div>
      </div>

      {/* ── Persona rail ── */}
      <div className="bg-white border border-[#e5e5e2] rounded-[14px] p-4 mb-3">
        <div className="mb-[10px]">
          <div className="font-['Jua',sans-serif] text-[14px] text-[#1a1a1a]">Who do you want to talk to?</div>
          <div className="text-[11px] text-[#9a9a9a] mt-[2px]">Synthetic personas, modelled from the measured atoms</div>
        </div>
        <div className="flex gap-[10px] flex-wrap">
          {personas.map((p) => {
            const active = p.id === selectedId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`flex items-center gap-[9px] border rounded-[10px] px-3 py-[9px] transition-colors ${
                  active ? 'border-[#6b3c72] bg-[#f1e9ff]' : 'border-[#e5e5e2] bg-[#fafaf8] hover:border-[#d3c2dd]'
                }`}
              >
                <span
                  className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-[13px] font-['Jua',sans-serif] shrink-0 ${
                    active ? 'bg-[#6b3c72] text-white' : 'bg-[#bebde7] text-[#6b3c72]'
                  }`}
                >
                  {p.avatar}
                </span>
                <span className="flex flex-col items-start leading-[1.2]">
                  <span className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] flex items-center gap-[6px]">
                    {p.name}
                    {p.isNew && (
                      <span className="text-[9px] text-[#6b3c72] bg-[#f1e9ff] rounded-[5px] px-[5px] py-[1px]">new</span>
                    )}
                  </span>
                  <span className="text-[10px] text-[#9a9a9a]">{p.role}</span>
                </span>
              </button>
            );
          })}
          {/* + New persona */}
          <button
            onClick={() => { setCreateStep('basis'); setSegmentId('weekend'); }}
            className="flex items-center gap-[9px] border border-dashed border-[#bebde7] rounded-[10px] px-3 py-[9px] text-[#6b3c72] hover:bg-[#f1e9ff] transition-colors"
          >
            <span className="w-[30px] h-[30px] rounded-full bg-[#f1e9ff] flex items-center justify-center shrink-0">
              <Plus className="w-4 h-4" />
            </span>
            <span className="flex flex-col items-start leading-[1.2]">
              <span className="font-['Jua',sans-serif] text-[12px]">New persona</span>
              <span className="text-[10px] text-[#9a9a9a]">from a segment</span>
            </span>
          </button>
        </div>
      </div>

      {/* ── Chat card ── */}
      <div className="bg-white border border-[#e5e5e2] rounded-[14px] p-4">
        <div className="flex items-start gap-2 mb-3">
          <div>
            <div className="font-['Jua',sans-serif] text-[14px] text-[#1a1a1a]">Talk to the digital twin of this audience</div>
            <div className="text-[11px] text-[#9a9a9a] mt-[2px]">Pressure-test messaging, products &amp; price in natural language</div>
          </div>
          <span className="ml-auto w-[26px] h-[26px] rounded-[7px] border border-[#e5e5e2] bg-[#fafaf8] flex items-center justify-center text-[#9a9a9a]">
            <Maximize2 className="w-[14px] h-[14px]" />
          </span>
        </div>

        {/* persona header (only when a persona is selected) */}
        {selected.voice === 'character' && (
          <div className="flex items-center gap-3 bg-[#f1e9ff] border border-[#bebde7] rounded-[12px] px-[14px] py-[11px] mb-3">
            <span className="w-10 h-10 rounded-full bg-[#6b3c72] text-white flex items-center justify-center text-[15px] font-['Jua',sans-serif] shrink-0">
              {selected.avatar}
            </span>
            <div>
              <div className="font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] flex items-center gap-2">
                {selected.name}
                {selected.lms && (
                  <span className="font-['Inter',sans-serif] text-[9px] text-[#6b3c72] bg-white border border-[#bebde7] rounded-full px-[7px] py-[1px]">
                    {selected.lms}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-[#6b6b6b] mt-[2px]">
                {selected.role} · represents {selected.basisShare} of the audience
              </div>
            </div>
            <button className="ml-auto flex items-center gap-[5px] text-[11px] text-[#6b3c72]">
              <Eye className="w-[13px] h-[13px]" /> View profile
            </button>
          </div>
        )}

        {/* thread */}
        <div ref={threadRef} className="flex flex-col gap-2 min-h-[320px] max-h-[440px] overflow-y-auto pr-1">
          {messages.length === 0 ? (
            <div className="m-auto text-center py-7 text-[#9a9a9a]">
              <div className="font-['Jua',sans-serif] text-[15px] text-[#6b6b6b] mb-[5px]">Ask {firstName} anything</div>
              <div className="text-[11px]">
                {firstName} answers in character, grounded on the Weekend Runners segment
              </div>
            </div>
          ) : (
            messages.map((m, i) =>
              m.role === 'you' ? (
                <div key={i} className="self-end max-w-[80%] bg-[#f1e9ff] text-[#6b3c72] rounded-[12px] px-3 py-[10px] text-[12px] leading-[1.55]">
                  {m.text}
                  {m.variants && (
                    <div className="flex flex-col gap-[6px] mt-2">
                      {m.variants.map((v) => (
                        <div key={v.lab} className="flex gap-2 items-start bg-white border border-[#bebde7] rounded-[9px] px-[10px] py-2">
                          <span className="text-[11px] text-[#6b3c72] shrink-0">{v.lab}</span>
                          <span className="text-[11px] text-[#6b6b6b] leading-[1.5]">{v.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  key={i}
                  className="self-start max-w-[88%] bg-[#fafaf8] border border-[#e5e5e2] rounded-[12px] px-3 py-[10px] text-[12px] leading-[1.55] text-[#1a1a1a]"
                  style={{ borderLeft: '3px solid #bebde7' }}
                >
                  {m.text}
                  {m.reactions && (
                    <div className="flex flex-col gap-[7px] mt-[9px]">
                      {m.reactions.map((r, j) => (
                        <div key={j} className="flex gap-[10px] items-start bg-white border border-[#e5e5e2] rounded-[9px] px-[11px] py-[9px]">
                          <span className="flex-1 text-[11px] text-[#1a1a1a] leading-[1.5]">{r.text}</span>
                          <span
                            className="text-[9px] rounded-full px-2 py-[2px] whitespace-nowrap shrink-0"
                            style={{ color: HEAT[r.heat].color, background: HEAT[r.heat].bg }}
                          >
                            {r.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {m.verdict && (
                    <div className="flex gap-2 items-start mt-[10px] pt-[10px] border-t border-dashed border-[#e5e5e2] text-[12px] leading-[1.55]">
                      <Check className="w-[14px] h-[14px] text-[#6b3c72] shrink-0 mt-[2px]" />
                      <span>
                        <b className="text-[#1a1a1a]">{m.verdict.split(':')[0]}:</b>
                        {m.verdict.slice(m.verdict.indexOf(':') + 1)}
                      </span>
                    </div>
                  )}
                  {(m.grounded || m.trust) && (
                    <div className="flex items-center gap-[6px] flex-wrap mt-[7px] text-[10px] text-[#9a9a9a]">
                      {m.grounded && <span>Grounded in: {m.grounded}</span>}
                      {m.trust?.map((t, k) => <TrustPill key={k} t={t} />)}
                    </div>
                  )}
                </div>
              )
            )
          )}
        </div>

        {/* suggested */}
        <div className="flex flex-wrap gap-[6px] mt-[10px]">
          <div className="w-full font-['Inter',sans-serif] text-[9px] font-semibold tracking-[0.08em] uppercase text-[#9a9a9a] mb-[2px]">
            {selected.voice === 'character' ? `Ask ${firstName}` : 'Try one of these'}
          </div>
          {selected.starters.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-[11px] text-[#6b3c72] bg-[#f1e9ff] rounded-full px-[11px] py-[5px] hover:bg-[#e9dcfb] transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* composer */}
        <div className="flex items-center gap-2 bg-[#fafaf8] border border-[#6b3c72] rounded-[10px] px-[13px] py-[11px] mt-2 focus-within:border-[#6b3c72]">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(draft); }}
            placeholder={selected.voice === 'character' ? `Ask ${firstName} anything — answers in character…` : 'Ask the audience anything — message, product, price, channel…'}
            className="flex-1 bg-transparent outline-none text-[12px] text-[#1a1a1a] placeholder:text-[#9a9a9a]"
          />
          <span className="flex items-center gap-[4px] text-[9px] text-[#9a9a9a] shrink-0">
            <Sparkles className="w-[11px] h-[11px]" /> Uses the current tab &amp; filters
          </span>
          <button onClick={() => send(draft)} className="shrink-0 text-[#6b3c72]">
            <Send className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* ── Create-persona drawer ── */}
      {createStep && (
        <>
          <div className="fixed inset-0 z-40" style={{ background: 'rgba(28,22,32,0.30)' }} onClick={() => setCreateStep(null)} />
          <div className="fixed top-0 right-0 h-full w-[460px] z-50 bg-white border-l border-[#e5e5e2] p-5 flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.12)]">
            <div className="flex items-start gap-[10px]">
              <div className="font-['Jua',sans-serif] text-[16px] text-[#1a1a1a]">New persona</div>
              <button onClick={() => setCreateStep(null)} className="ml-auto w-[26px] h-[26px] rounded-[8px] border border-[#e5e5e2] bg-[#fafaf8] flex items-center justify-center text-[#9a9a9a]">
                <X className="w-[14px] h-[14px]" />
              </button>
            </div>

            {createStep === 'basis' ? (
              <>
                <div className="font-['Inter',sans-serif] text-[10px] font-semibold tracking-[0.08em] uppercase text-[#6b3c72] mt-[2px] mb-4">
                  Step 1 of 3 · Choose who they represent
                </div>
                <div className="font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] mb-3">Who should this persona represent?</div>

                <div className="flex-1 overflow-y-auto flex flex-col gap-[9px]">
                  {SEGMENTS.map((s) => {
                    const sel = s.id === segmentId;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSegmentId(s.id)}
                        className={`flex items-center gap-3 border rounded-[11px] px-[13px] py-3 text-left transition-colors ${
                          sel ? 'border-[#6b3c72] bg-[#f1e9ff]' : 'border-[#e5e5e2] bg-[#fafaf8] hover:border-[#d3c2dd]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full shrink-0"
                          style={sel ? { boxShadow: 'inset 0 0 0 3px #fff, inset 0 0 0 8px #6b3c72', border: '2px solid #6b3c72' } : { border: '2px solid #e5e5e2' }}
                        />
                        <span className="flex-1 min-w-0">
                          <span className="block font-['Jua',sans-serif] text-[13px] text-[#1a1a1a]">{s.name}</span>
                          <span className="flex items-center gap-2 text-[11px] text-[#6b6b6b] mt-[3px]">
                            <span>{s.share}% of audience · {s.size}</span>
                            <span className="text-[#6b3c72]">{s.idx}</span>
                          </span>
                          <span className="block h-[5px] rounded-[3px] bg-[#f3f3f1] mt-2 overflow-hidden">
                            <span className="block h-full" style={{ width: `${s.share}%`, background: sel ? '#6b3c72' : '#bebde7' }} />
                          </span>
                        </span>
                      </button>
                    );
                  })}

                  <div className="flex items-center gap-[10px] text-[10px] uppercase tracking-[0.08em] text-[#9a9a9a] my-1 before:content-[''] before:flex-1 before:h-px before:bg-[#e5e5e2] after:content-[''] after:flex-1 after:h-px after:bg-[#e5e5e2]">
                    or
                  </div>
                  <div className="flex items-center gap-[10px] border border-dashed border-[#e5e5e2] rounded-[11px] px-[13px] py-3 text-[12px] text-[#6b6b6b]">
                    <SlidersHorizontal className="w-[15px] h-[15px] text-[#9a9a9a] shrink-0" />
                    Define it yourself — behaviours, geography, lifestage
                    <span className="ml-auto text-[#6b3c72]">Build →</span>
                  </div>

                  <div className="flex items-baseline gap-2 mt-1 px-[13px] py-[11px] bg-[#f1e9ff] border border-[#bebde7] rounded-[10px]">
                    <span className="font-['Jua',sans-serif] text-[18px] text-[#6b3c72]">{seg.size} people</span>
                    <span className="text-[11px] text-[#6b6b6b]">measured slice of this audience</span>
                  </div>
                </div>

                <div className="flex items-center gap-[10px] mt-[14px] pt-[14px] border-t border-[#e5e5e2]">
                  <button onClick={() => setCreateStep(null)} className="text-[12px] text-[#6b6b6b] border border-[#e5e5e2] rounded-[8px] px-3 py-2">Cancel</button>
                  <span className="flex-1" />
                  <button onClick={() => setCreateStep('review')} className="text-[12px] text-white bg-[#6b3c72] rounded-[8px] px-3 py-2">Next: model persona →</button>
                </div>
              </>
            ) : (
              <>
                <div className="font-['Inter',sans-serif] text-[10px] font-semibold tracking-[0.08em] uppercase text-[#6b3c72] mt-[2px] mb-4">
                  Step 2 of 3 · Review &amp; edit
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="flex items-center gap-[13px] pb-[14px] border-b border-dashed border-[#e5e5e2]">
                    <span className="w-[54px] h-[54px] rounded-full bg-[#bebde7] text-[#6b3c72] flex items-center justify-center text-[22px] font-['Jua',sans-serif] shrink-0">S</span>
                    <div className="flex-1">
                      <div className="font-['Jua',sans-serif] text-[17px] text-[#1a1a1a]">Sam, 29</div>
                      <div className="text-[11px] text-[#6b6b6b] mt-[3px]">Weekend Runner · Fitzroy</div>
                      <div className="flex items-center gap-2 mt-[6px]">
                        <TrustPill t={{ label: 'identity modelled', kind: 'modelled' }} />
                        <TrustPill t={{ label: 'LMS-0148', kind: 'measured' }} />
                        <span className="ml-auto flex items-center gap-[4px] text-[10px] text-[#6b3c72]">
                          <RotateCw className="w-3 h-3" /> Regenerate
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-[13px] mb-[6px] text-[10px] uppercase tracking-[0.06em] text-[#9a9a9a]">
                    Name <TrustPill t={{ label: 'modelled — edit freely', kind: 'modelled' }} />
                  </div>
                  <div className="border border-[#e5e5e2] rounded-[9px] px-[11px] py-[9px] text-[12px] bg-[#fafaf8]">Sam</div>

                  <div className="flex items-center gap-2 mt-[13px] mb-[6px] text-[10px] uppercase tracking-[0.06em] text-[#9a9a9a]">
                    One-line bio <TrustPill t={{ label: 'modelled', kind: 'modelled' }} />
                  </div>
                  <div className="border border-[#e5e5e2] rounded-[9px] px-[11px] py-[9px] text-[12px] bg-[#fafaf8] leading-[1.5]">
                    Runs the Capital City Trail most Saturdays; shops the category actively, buys on value not hype.
                  </div>

                  <div className="flex items-center gap-2 mt-4 mb-[6px] text-[10px] uppercase tracking-[0.06em] text-[#9a9a9a]">
                    Defining atoms <TrustPill t={{ label: 'measured — fixed by the segment', kind: 'measured' }} />
                  </div>
                  {[
                    { k: 'Top behaviours', v: 'Sports nutrition, athleisure', i: '1.9× / 1.8×' },
                    { k: 'Competitor / POI', v: 'rebel Sport, lululemon', i: '1.6×' },
                    { k: 'Peak daypart', v: 'Sat 6–9am', i: '2.3×' },
                    { k: 'Channel affinity', v: 'OOH near home · IG evenings', i: '1.7×' },
                    { k: 'Avg basket', v: '$48', i: '—' },
                  ].map((a, i, arr) => (
                    <div key={a.k} className={`flex items-baseline gap-[10px] text-[12px] py-[9px] ${i < arr.length - 1 ? 'border-b border-[#e5e5e2]' : ''}`}>
                      <span className="text-[#6b6b6b] shrink-0 w-[118px]">{a.k}</span>
                      <span className="flex-1 text-[#1a1a1a]">{a.v}</span>
                      <span className="text-[#6b3c72] text-[11px] whitespace-nowrap">{a.i}</span>
                    </div>
                  ))}

                  <div className="flex gap-2 mt-[14px] text-[11px] text-[#6b6b6b] bg-[#fafaf8] border border-[#e5e5e2] rounded-[9px] px-3 py-[10px]">
                    <Info className="w-[13px] h-[13px] text-[#6b3c72] shrink-0 mt-[2px]" />
                    <span>
                      Represents <b className="text-[#1a1a1a]">Weekend Runners</b> — 34% of the audience (~208k). Editing name &amp; bio
                      changes how Sam presents; the <b className="text-[#1a1a1a]">data comes from the segment</b>.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-[10px] mt-[14px] pt-[14px] border-t border-[#e5e5e2]">
                  <button onClick={() => setCreateStep('basis')} className="text-[12px] text-[#6b6b6b] border border-[#e5e5e2] rounded-[8px] px-3 py-2">← Back</button>
                  <span className="flex-1" />
                  <button onClick={savePersona} className="text-[12px] text-white bg-[#6b3c72] rounded-[8px] px-3 py-2 flex items-center gap-[6px]">
                    <Check className="w-[14px] h-[14px]" /> Save persona
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
