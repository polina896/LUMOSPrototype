import { useState, useEffect } from 'react';

// ── Digital twin mode ─────────────────────────────────────────────────────────
// A second way to interact with the audiences: instead of asking Lumos about
// them, you ask them. Each twin answers from its own behaviour, and the shape of
// the answer follows the question — copy gets scored, a question about their
// household does not, because a score would mean nothing there.

export const TWINS = [
  { id: 'stockup', n: 'Marsden Park Stock-Ups', sub: '186k · index 169', c: '#7A4C82' },
  { id: 'value', n: 'Parramatta Value Families', sub: '248k · index 218', c: '#2F8F63' },
  { id: 'bulk', n: 'Castle Hill Bulk Buyers', sub: '132k · index 186', c: '#C07A2E' },
];

type Answer = { say: string; why: string; score?: number };
type Intent = {
  label: string;
  scored?: boolean;
  stockup: Answer; value: Answer; bulk: Answer;
};

export const ANSWERS: Record<string, Intent> = {
  copy: {
    label: 'Reading it against their trip planning, price sensitivity and what each already buys',
    scored: true,
    stockup: { score: 42,
      say: '“Every day” isn’t how I shop. I go once a month, I plan it on the Thursday, and I drive 25 minutes with the back seats down. Tell me what fits in the boot, not what’s cheap today.',
      why: 'Median trip 14 km · 57% of visits on a weekend · chained to Bunnings and IKEA' },
    value: { score: 71,
      say: 'Price talks, but “save big” doesn’t tell me anything. Show me the unit price against what I pay now. I’m buying for two households and I’ll do the maths myself.',
      why: 'Switches on unit price rather than brand · fortnightly shop · buys for more than one family' },
    bulk: { score: 28,
      say: 'I already have a membership somewhere else. Cheap isn’t the reason I’d switch — the range is. If you carry things I can’t get at the local shops, say that first.',
      why: 'Most already hold a warehouse membership elsewhere · fewest trips, biggest baskets' },
  },
  demographics: {
    label: 'Answering from household composition, income and where they live',
    stockup: { say: 'Two adults, three kids, a four-bedroom place in one of the new estates off Richmond Road. Two cars, because out here you need them. Most of what we earn goes on the mortgage and the children.',
      why: '66% are four-person households or larger · North-West growth corridor · two-car households index 1.9×' },
    value: { say: 'There are six of us under one roof — my parents, us, and the two kids. We shop as one household even though we are really two. The income looks fine on paper; per person it is not.',
      why: '2.8× more likely to shop for more than one household · multi-generational · Parramatta–Granville spine' },
    bulk: { say: 'Two of us now the children have gone, but I still buy like there are five. Big house, established street, and we have people over a lot.',
      why: 'Established families · fewest trips, biggest baskets · premium and entertaining lines' },
  },
  routine: {
    label: 'Answering from observed trip timing and frequency',
    stockup: { say: 'Weekdays are school, work and the drive. The big shop is Saturday morning — drop-off, a coffee, Bunnings, and we are at Costco by eleven.',
      why: '38% run the same Saturday chain · arrival window 10–11am · 57% of visits on a weekend' },
    value: { say: 'Fortnightly, usually a Thursday evening or a Sunday once everyone has eaten. Whoever has the car that day does the run for both families.',
      why: 'Fortnightly rhythm · short drive or on foot · 68% return within 60 days' },
    bulk: { say: 'Once every six weeks or so, always with a list. I would rather do one enormous run than five small ones.',
      why: 'Fewest trips of the three · largest average basket · plans around entertaining' },
  },
  motivation: {
    label: 'Answering on what would actually move them',
    stockup: { say: 'Fitting the whole month into one trip. If I have to come back in a fortnight, it did not work and I will not bother again.',
      why: 'Basket 3.4× the metro household · one planned trip per month · travels 14 km for it' },
    value: { say: 'Unit price, stated plainly. And if my sister says it is worth it, that counts for more than any advertisement you can buy.',
      why: 'Switches on unit price · referral outperforms paid media in this cluster' },
    bulk: { say: 'Range. I would move for things I cannot get locally — not for a few dollars off something I already buy.',
      why: 'Already holds a membership elsewhere · switching is a range argument, not a price one' },
  },
  channel: {
    label: 'Answering on where they would actually see you',
    stockup: { say: 'On the road. I am on the M7 or Richmond Road twice a day, every day. I have not opened a catalogue in years.',
      why: 'Passes the corridor twice daily · roadside OOH indexes highest of any channel here' },
    value: { say: 'WhatsApp, honestly — that is where things get passed around. And the screens around the Parramatta interchange, I am through there constantly.',
      why: 'Referral and community networks · digital OOH at the interchange · multicultural radio' },
    bulk: { say: 'Nothing that looks like a discount flyer. Email me something specific and I will read it; the rest I ignore.',
      why: 'Low response to price-led creative · responds to range and event messaging' },
  },
  objection: {
    label: 'Answering on what would stop them',
    stockup: { say: 'The drive, if the trip does not pay for itself. And a membership fee I cannot see the value of before I have paid it.',
      why: '25-minute drive each way · value must be legible before the first trip' },
    value: { say: 'Bulk I have nowhere to put. And anything where the unit price is not actually better once I work it out.',
      why: 'Storage-constrained · calculates unit price · 61% cross-shop discount grocers' },
    bulk: { say: 'I already pay for one membership. Two feels absurd unless one of them is clearly better.',
      why: 'Existing warehouse membership is the single biggest barrier in this cluster' },
  },
  general: {
    label: 'Answering in their own words',
    stockup: { say: 'Ask me about the trip and I can tell you a lot — when I go, how far, what else I do on the way. That is the part of my life this is really about.',
      why: 'Strongest signal: trip length, timing and chaining' },
    value: { say: 'Ask me about price or about who I am buying for. Those two things explain nearly everything about how I shop.',
      why: 'Strongest signal: unit price sensitivity and household size' },
    bulk: { say: 'Ask me what I cannot get locally. That is the only thing that would make me change where I shop.',
      why: 'Strongest signal: range and existing membership' },
  },
};

export const PROMPTS = [
  { g: 'Test creative', items: [
    { t: 'Save big at Costco. Unbeatable prices, every day.', hint: 'a line to react to' },
    { t: 'Rewrite this for a roadside billboard on the M7.' },
  ]},
  { g: 'Understand them', items: [
    { t: 'Who are you, in your own words?' },
    { t: 'What does a typical week look like?' },
  ]},
  { g: 'Dig deeper', items: [
    { t: 'What would make you switch from where you shop now?' },
    { t: 'Where would I actually reach you?' },
    { t: 'What would stop you joining?' },
  ]},
];

// Crude on purpose — a real one would use the model. Order matters: a statement
// is a line of copy to react to, a question is a question about them. That is
// what separates "every day" in a tagline from "what does your day look like".
export function classify(text: string): string {
  const t = text.toLowerCase().trim();
  const asks = /\?/.test(t) || /^(what|who|where|why|how|when|which|do|does|did|are|is|would|could|can|tell me|describe)\b/.test(t);
  if (/^["“']/.test(text.trim()) || /\b(copy|tagline|slogan|headline|rewrite|creative|this line|this ad)\b/.test(t)) return 'copy';
  if (!asks) return 'copy';
  if (/\b(who are you|household|income|demographic|how old|age|family|kids|children|where do you live)\b/.test(t)) return 'demographics';
  if (/\b(typical (day|week)|your (week|weekend|day)|weekend|routine|how often|when do you|a day in|shopping trip)\b/.test(t)) return 'routine';
  if (/\b(switch|motivat|make you|convince|move you|why would you|what would you)\b/.test(t)) return 'motivation';
  if (/\b(reach|media|channel|see (an )?ad|advertis|billboard|radio|social|catalogue)\b/.test(t)) return 'channel';
  if (/\b(stop|barrier|objection|put you off|worry|concern|hesitat|why wouldn)\b/.test(t)) return 'objection';
  return 'general';
}

const initials = (n: string) => n.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

// ── the room ──────────────────────────────────────────────────────────────────

export function TwinRoom({ room, onToggle }: { room: string[]; onToggle: (id: string) => void }) {
  return (
    <div className="mb-3 flex items-center gap-2 overflow-x-auto">
      <span className="flex-shrink-0 font-['Geist',sans-serif] text-[10px] font-extrabold uppercase tracking-[0.11em] text-[#a79fb6]">Select</span>
      {TWINS.map((t) => {
        const on = room.includes(t.id);
        return (
          <button
            key={t.id}
            onClick={() => onToggle(t.id)}
            className={`flex flex-shrink-0 items-center gap-2 rounded-full border bg-white py-1.5 pl-[7px] pr-3 transition-all ${
              on ? 'border-[#c7e4ec]' : 'border-[#e1d9ec] opacity-45'
            } hover:border-[#0E7490]`}
          >
            <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full font-['Geist',sans-serif] text-[9.5px] font-extrabold text-white" style={{ background: t.c }}>
              {initials(t.n)}
            </span>
            <span className="text-left">
              <span className="block font-['Geist',sans-serif] text-[12px] font-bold leading-tight">{t.n}</span>
              <span className="block font-['Nunito_Sans',sans-serif] text-[10.5px] leading-tight text-[#7e7490]">{t.sub}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── one exchange ──────────────────────────────────────────────────────────────

export function TwinExchange({ question, room }: { question: string; room: string[] }) {
  const kind = classify(question);
  const A = ANSWERS[kind] || ANSWERS.general;
  const here = TWINS.filter((t) => room.includes(t.id));

  // A beat before they answer. Three people reading the same line and reacting
  // differently takes a moment — landing it instantly reads as canned.
  const [thinking, setThinking] = useState(true);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const timers: number[] = [window.setTimeout(() => setThinking(false), 1500)];
    here.forEach((_, i) => timers.push(window.setTimeout(() => setShown(i + 1), 1500 + i * 320)));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="lumos-reply-in">
      <div className="flex justify-end mb-4">
        <span className="max-w-[82%] rounded-xl rounded-br-none border border-[#c7e4ec] bg-white px-3.5 py-2.5 font-['Jua',sans-serif] text-[14px] leading-relaxed text-[#0B3B47]">{question}</span>
      </div>

      {thinking && (
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex gap-1">
            {[0, 150, 300].map((d) => (
              <div key={d} className="h-2 w-2 animate-bounce rounded-full bg-[#0E7490]" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
          <span className="font-['Jua',sans-serif] text-[14px] italic text-[#7e9aa3]">
            Putting it to {here.length === 1 ? here[0].n : `${here.length} twins`} — reading it against how each of them actually shops…
          </span>
        </div>
      )}

      <div className={`mb-4 flex items-center gap-2.5 rounded-xl border border-dashed border-[#c7e4ec] bg-white px-3.5 py-2.5 ${thinking ? 'hidden' : 'lumos-reply-in'}`}>
        <span className="grid h-[22px] w-[22px] flex-shrink-0 place-items-center rounded-[7px] bg-[#F0F9FB]">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="#0E7490" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
        </span>
        <p className="font-['Nunito_Sans',sans-serif] text-[12.5px] leading-relaxed text-[#4a3e5c]">
          {A.label} — across <b className="text-[#0B5A70]">{here.length} twin{here.length === 1 ? '' : 's'}</b>.
        </p>
      </div>

      {here.slice(0, shown).map((t) => {
        const a = (A as unknown as Record<string, Answer>)[t.id];
        if (!a) return null;
        const scored = A.scored && typeof a.score === 'number';
        return (
          <div key={t.id} className="lumos-reply-in mb-3 rounded-[15px] border border-[#e1d9ec] bg-white px-4 pb-3 pt-3.5">
            <div className="mb-2.5 flex items-center gap-2.5">
              <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full font-['Geist',sans-serif] text-[10.5px] font-extrabold text-white" style={{ background: t.c }}>
                {initials(t.n)}
              </span>
              <span className="min-w-0">
                <span className="block font-['Geist',sans-serif] text-[13px] font-bold leading-tight">{t.n}</span>
                <span className="block font-['Nunito_Sans',sans-serif] text-[10.5px] leading-tight text-[#7e7490] mt-0.5">{t.sub}</span>
              </span>
              {scored && (
                <span className="ml-auto flex-shrink-0 text-right">
                  <b className="block font-['Geist',sans-serif] text-[16px] font-extrabold leading-none" style={{ color: t.c }}>{a.score}</b>
                  <span className="mt-0.5 block font-['Geist',sans-serif] text-[9px] font-extrabold uppercase tracking-wider text-[#a79fb6]">Resonance</span>
                </span>
              )}
            </div>
            {scored && (
              <div className="mb-2.5 h-[5px] overflow-hidden rounded-full bg-[#F0EDF4]">
                <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${a.score}%`, background: t.c }} />
              </div>
            )}
            <p className="font-['Jua',sans-serif] text-[14px] leading-relaxed text-[#1a1a1a]">{a.say}</p>
            <p className="mt-2.5 border-t border-[#ebe5f1] pt-2.5 font-['Nunito_Sans',sans-serif] text-[11.5px] leading-relaxed text-[#7e7490]">{a.why}</p>
          </div>
        );
      })}
    </div>
  );
}

// ── the prompt library ────────────────────────────────────────────────────────

export function PromptLibrary({ title, onPick }: { title: string; onPick: (t: string) => void }) {
  return (
    <div className="mb-4 rounded-[15px] border border-[#e1d9ec] bg-white px-4 pb-3 pt-3.5 lumos-reply-in">
      <div className="mb-3 font-['Geist',sans-serif] text-[12.5px] font-extrabold">{title}</div>
      {PROMPTS.map((g) => (
        <div key={g.g} className="mb-3">
          <div className="mb-1.5 font-['Geist',sans-serif] text-[9px] font-extrabold uppercase tracking-[0.11em] text-[#a79fb6]">{g.g}</div>
          <div className="flex flex-wrap gap-[7px]">
            {g.items.map((it) => (
              <button
                key={it.t}
                onClick={() => onPick(it.t)}
                className="inline-flex items-baseline gap-[7px] rounded-[10px] border border-[#e1d9ec] bg-white px-3 py-2 text-left font-['Jua',sans-serif] text-[13px] transition-colors hover:border-[#0E7490] hover:bg-[#F0F9FB]"
              >
                {it.t}
                {it.hint && <span className="font-['Nunito_Sans',sans-serif] text-[10.5px] font-semibold text-[#a79fb6]">{it.hint}</span>}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="border-t border-[#ebe5f1] pt-2.5 font-['Nunito_Sans',sans-serif] text-[11.5px] text-[#a79fb6]">
        Or ask anything — they answer from their own behaviour.
      </div>
    </div>
  );
}

// ── the composer, in twin mode ────────────────────────────────────────────────

export function TwinComposer({ seed = '', onSend }: { seed?: string; onSend: (text: string) => void }) {
  // remounted with a key when a prompt is picked, so the suggestion lands in the
  // box ready to edit rather than being sent on the reader's behalf
  const [value, setValue] = useState(seed);
  const send = () => { const v = value.trim(); if (!v) return; setValue(''); onSend(v); };
  return (
    <div className="rounded-xl border border-[#c7e4ec] bg-white px-3.5 py-3 shadow-[0_0_0_3px_rgba(14,116,144,0.07)] transition-all focus-within:border-[#0E7490] focus-within:shadow-[0_0_0_3px_rgba(14,116,144,0.14)]">
      <textarea
        rows={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send(); }}
        placeholder="Paste a line of copy, or ask the twins a question…"
        className="w-full resize-none border-none font-['Jua',sans-serif] text-[14px] leading-relaxed text-black outline-none placeholder:text-[#aaa]"
      />
      <div className="mt-1.5 flex items-center gap-2.5">
        <span className="font-['Nunito_Sans',sans-serif] text-[11px] text-[#a79fb6]">Answers come from the audiences, grounded in their behaviour</span>
        <button onClick={send} className="ml-auto grid h-[34px] w-[34px] place-items-center rounded-full bg-[#0E7490] transition-colors hover:bg-[#0B5A70]">
          <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}
