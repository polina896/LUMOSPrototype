import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Send, TrendingUp, Check, Users, UserPlus, Plus, Search,
  FileText, BarChart2, MapPin, Paperclip, ArrowLeft, Sparkles,
} from 'lucide-react';
import AudienceDetailPanel from './AudienceDetailPanel';

// The created audience reuses a real dataset so the preview renders the
// genuine AudienceDetailPanel (headline, who/where/how, geo, density…).
const AUD_ID = 'premium-sedan-intenders';
const AUD_NAME = 'Premium Sedan Intenders';

const STARTERS: { icon: typeof TrendingUp; title: string; sub: string; brief: string }[] = [
  { icon: TrendingUp, title: 'In-market for a category', sub: 'People actively shopping now',
    brief: 'People in Singapore in-market for a premium sedan — launching our new flagship, want to raise consideration.' },
  { icon: Check, title: 'Loyal / returning customers', sub: 'Your repeat, high-retention base',
    brief: 'Our loyal, returning premium-sedan owners in Singapore — high retention, ripe for an upgrade.' },
  { icon: UserPlus, title: 'Lookalike of an existing audience', sub: "Expand from one you've saved",
    brief: 'A lookalike of our Premium Sedan Intenders — expand reach to similar high-value buyers.' },
];

const DESCRIBE_CHIPS = ['Lapsed owners due to upgrade', 'Families shopping 7-seaters', 'EV-curious commuters'];

const QUESTIONS: { headline: string; chips: string[]; multi: boolean; placeholder: string }[] = [
  { headline: 'Before I build it, a couple of quick things — which competitor owners should count as "in-market"?',
    chips: ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus'], multi: true, placeholder: 'Or name another competitor…' },
  { headline: 'How tightly should I scope it?',
    chips: ['Broad reach', 'Balanced', 'Precise / high-intent'], multi: false, placeholder: 'Or describe the scope…' },
];

type Step = 'brief' | 'clarify' | 'building' | 'preview' | 'saved';

const ACC = '#732d93';

// ── Data Explorer session rail ────────────────────────────────────────────────
function RailCard({ icon: Icon, name, meta, selected, building, placeholder, metaColor }: {
  icon: typeof Users; name: string; meta: string; selected?: boolean; building?: boolean; placeholder?: boolean; metaColor?: string;
}) {
  if (placeholder) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-[#ddd] bg-[#f9f9f9] opacity-70 px-3.5 py-3">
        <div className="w-8 h-8 rounded-lg bg-[#eee] flex items-center justify-center flex-shrink-0"><Plus className="w-3.5 h-3.5 text-[#aaa]" /></div>
        <div><p className="font-['Jua',sans-serif] text-[13px] text-[#bbb] leading-tight">{name}</p><p className="font-['Jua',sans-serif] text-[12px] text-[#c8c8c8] leading-tight mt-0.5">{meta}</p></div>
      </div>
    );
  }
  return (
    <div className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors ${selected ? 'bg-[#fcf6ff] border-[#732d93]' : building ? 'border-dashed border-[#e0d8f8] bg-white' : 'bg-white border-[#e8e8e8]'}`}>
      <div className="w-8 h-8 rounded-lg bg-[#f0e8ff] flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4 text-[#732d93]" /></div>
      <div className="min-w-0 flex-1">
        <p className="font-['Jua',sans-serif] text-[13px] text-[#1e163c] leading-tight truncate">{name}</p>
        <p className="font-['Jua',sans-serif] text-[12px] leading-tight mt-0.5" style={{ color: metaColor ?? '#888' }}>{meta}</p>
      </div>
      {building && <span className="w-3.5 h-3.5 rounded-full border-2 border-[#e0d8f8] border-t-[#732d93] animate-spin flex-shrink-0" />}
      {selected && <ArrowRight className="w-3.5 h-3.5 text-[#732d93] flex-shrink-0 -rotate-45" />}
    </div>
  );
}

function SessionRail({ step, narrow }: { step: Step; narrow: boolean }) {
  const hasAudience = step !== 'brief';
  const built = step === 'preview' || step === 'saved';
  const saved = step === 'saved';
  return (
    <div className={`${narrow ? 'w-[300px]' : 'w-[384px]'} flex-shrink-0 border-r border-[#d3d3d0] bg-[#f5f5f3] flex flex-col transition-all duration-200`}>
      <div className="px-5 pt-4 pb-3 border-b border-[#e5e5e2] bg-white flex-shrink-0">
        <p className="font-['Jua',sans-serif] text-[14px] text-[#1a1a1a]">Data Explorer</p>
        {!narrow && <p className="font-['Jua',sans-serif] text-[12px] text-[#999] mt-0.5">Audiences, insights &amp; documents from this session</p>}
      </div>
      <div className="flex-1 overflow-y-auto bg-white px-5 py-4 space-y-6">
        <section>
          <p className="font-['Jua',sans-serif] text-[11px] text-[#929292] tracking-widest uppercase mb-3">Audiences</p>
          <div className="space-y-2">
            {hasAudience ? (
              <RailCard icon={saved ? Check : Users} name={AUD_NAME}
                meta={built ? (saved ? 'Saved · 284k · Singapore' : '284k · Singapore') : 'building… ~340k · narrowing'}
                selected={built} building={!built} metaColor={saved ? '#1D9E75' : undefined} />
            ) : (
              <RailCard icon={Users} name="No audiences yet" meta="The audience you're building will appear here" placeholder />
            )}
          </div>
        </section>
        <section>
          <p className="font-['Jua',sans-serif] text-[11px] text-[#929292] tracking-widest uppercase mb-3">Insights</p>
          <div className="space-y-2">
            {hasAudience ? (
              <>
                <RailCard icon={BarChart2} name="Auto-intent index — SG" meta="Stat · premium sedan segment" />
                <RailCard icon={MapPin} name="Competitor showroom visitation" meta="Heatmap · district level" />
              </>
            ) : (
              <RailCard icon={BarChart2} name="No insights yet" meta="Charts & stats appear as Lumos works" placeholder />
            )}
          </div>
        </section>
        <section>
          <p className="font-['Jua',sans-serif] text-[11px] text-[#929292] tracking-widest uppercase mb-3">Documents</p>
          <RailCard icon={FileText} name="Create document" meta="Collate into a recommendation later" placeholder />
        </section>
      </div>
    </div>
  );
}

// ── Stepped clarify widget (matches the product's existing chat pattern) ───────
function ClarifyWidget({ index, onSubmit }: { index: number; onSubmit: (answer: string) => void }) {
  const q = QUESTIONS[index];
  const [multi, setMulti] = useState<string[]>(index === 0 ? ['BMW', 'Mercedes-Benz'] : []);
  const [single, setSingle] = useState(index === 1 ? 'Balanced' : '');
  const [typed, setTyped] = useState('');
  const answer = q.multi ? (multi.length ? multi.join(', ') : typed.trim()) : (single || typed.trim());
  const canSubmit = answer.length > 0;
  const toggle = (c: string) => q.multi
    ? setMulti(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])
    : (setSingle(p => p === c ? '' : c), setTyped(''));
  const active = (c: string) => q.multi ? multi.includes(c) : single === c;

  return (
    <div className="bg-white border border-[#e0d8f8] rounded-2xl shadow-[0_4px_24px_rgba(115,45,147,0.10)] overflow-hidden">
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 border-b border-[#f4f0fb]">
        <div className="flex gap-1.5">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all ${i < index ? 'w-4 bg-[#732d93]' : i === index ? 'w-6 bg-[#732d93]' : 'w-4 bg-[#e5e0f0]'}`} />
          ))}
        </div>
        <span className="font-['Jua',sans-serif] text-[11px] text-[#aaa]">Question {index + 1} of {QUESTIONS.length}</span>
      </div>
      <div className="px-5 pt-4 pb-5">
        <div className="flex flex-wrap gap-2 mb-4">
          {q.chips.map(c => (
            <button key={c} onClick={() => toggle(c)}
              className={`px-3 py-1.5 rounded-full font-['Jua',sans-serif] text-[12px] border transition-all ${active(c) ? 'bg-[#732d93] border-[#732d93] text-white' : 'bg-white border-[#ddd] text-[#555] hover:border-[#732d93] hover:text-[#732d93]'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input value={typed} onChange={e => { setTyped(e.target.value); if (!q.multi) setSingle(''); }}
            onKeyDown={e => { if (e.key === 'Enter' && canSubmit) onSubmit(answer); }}
            placeholder={q.placeholder}
            className="flex-1 px-3.5 py-2.5 bg-[#faf9ff] border border-[#e8e4f4] rounded-xl font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] outline-none focus:border-[#732d93] placeholder:text-[#c0b8d0]" />
          <button onClick={() => canSubmit && onSubmit(answer)} disabled={!canSubmit}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-['Jua',sans-serif] text-[13px] flex-shrink-0 transition-all ${canSubmit ? 'bg-[#732d93] text-white hover:bg-[#5c2375]' : 'bg-[#f0edf7] text-[#c0b0d0] cursor-not-allowed'}`}>
            {index < QUESTIONS.length - 1 ? 'Next' : 'Build audience'}
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main flow ─────────────────────────────────────────────────────────────────
export default function CreateAudienceFlow({ onExit, onSaved }: { onExit: () => void; onSaved: (id: string, name: string) => void }) {
  const [step, setStep] = useState<Step>('brief');
  const [brief, setBrief] = useState('');
  const [qIndex, setQIndex] = useState(0);
  const [composer, setComposer] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === 'building') { const t = setTimeout(() => setStep('preview'), 1600); return () => clearTimeout(t); }
  }, [step]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); }, [step, qIndex]);

  const submitBrief = (text: string) => { if (!text.trim()) return; setBrief(text.trim()); setComposer(''); setQIndex(0); setStep('clarify'); };
  const answerQuestion = () => { if (qIndex < QUESTIONS.length - 1) setQIndex(qIndex + 1); else setStep('building'); };

  const built = step === 'preview' || step === 'saved';

  return (
    <div className="flex-1 flex min-h-0 bg-[#f4f3f1]">
      {/* ── CHAT ── */}
      <div className="flex flex-col min-w-0 border-r border-[#d3d3d0]" style={{ flex: '1 1 0%' }}>
        <div className="flex items-center gap-3 px-5 py-3 border-b border-[#e5e5e2] bg-white flex-shrink-0">
          <button onClick={onExit} className="flex items-center gap-1.5 text-[#6a6a6a] hover:text-[#1a1a1a] transition-colors">
            <ArrowLeft className="w-4 h-4" /><span className="font-['Jua',sans-serif] text-[13px]">Audiences</span>
          </button>
          <span className="font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] ml-1">New audience</span>
          <span className="font-['Jua',sans-serif] text-[12px] text-[#b0b0b0]">
            · {step === 'brief' ? 'guided brief' : step === 'clarify' ? 'guided brief' : step === 'building' ? 'building' : step === 'saved' ? 'saved' : 'refine'}
          </span>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5">
          {/* BRIEF */}
          {step === 'brief' && (
            <div className="max-w-[440px]">
              <p className="font-['Jua',sans-serif] text-[15px] text-[#1a1a1a] mb-1">Who do you want to reach?</p>
              <p className="font-['Jua',sans-serif] text-[13.5px] text-[#6a6a6a] leading-relaxed mb-4">
                Describe the audience in your own words — the goal, the market, the kind of people. I'll build it here and it'll appear in your session on the right. Or start from a pattern.
              </p>
              <div className="space-y-2 mb-4">
                {STARTERS.map(s => (
                  <button key={s.title} onClick={() => submitBrief(s.brief)}
                    className="w-full flex items-center gap-3 bg-white border border-[#e5e5e2] rounded-xl px-3 py-2.5 text-left hover:border-[#e0d8f8] transition-colors">
                    <span className="w-[26px] h-[26px] rounded-lg bg-[#f0e8ff] flex items-center justify-center flex-shrink-0"><s.icon className="w-[15px] h-[15px] text-[#732d93]" /></span>
                    <span><span className="block font-['Jua',sans-serif] text-[13px] text-[#1e163c]">{s.title}</span><span className="block font-['Jua',sans-serif] text-[11.5px] text-[#9a9a9a]">{s.sub}</span></span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2.5 text-[#9a9a9a] mb-3">
                <span className="h-px bg-[#e5e5e2] flex-1" /><span className="font-['Jua',sans-serif] text-[11.5px]">or describe your own</span><span className="h-px bg-[#e5e5e2] flex-1" />
              </div>
              <div className="flex flex-wrap gap-2">
                {DESCRIBE_CHIPS.map(c => (
                  <button key={c} onClick={() => submitBrief(c)} className="px-3 py-1.5 rounded-full font-['Jua',sans-serif] text-[12px] border border-[#e5e5e2] bg-white text-[#6a6a6a] hover:border-[#732d93] hover:text-[#732d93] transition-colors">{c}</button>
                ))}
              </div>
            </div>
          )}

          {/* CLARIFY / BUILDING / PREVIEW / SAVED all keep the brief bubble */}
          {step !== 'brief' && (
            <div className="mb-4 flex justify-end">
              <div className="max-w-[80%] bg-[#efe6ff] text-[#5c2375] rounded-[14px_14px_4px_14px] px-4 py-2.5 font-['Jua',sans-serif] text-[13.5px] leading-relaxed">{brief}</div>
            </div>
          )}

          {step === 'clarify' && (
            <>
              <div className="flex items-start gap-2.5 bg-[#f4f3f1] rounded-xl px-3.5 py-3 mb-4 max-w-[560px]">
                <span className="text-[#c5c1c9] text-[13px] mt-px">›</span>
                <span className="font-['Jua',sans-serif] text-[12.5px] italic text-[#6a6a6a] leading-relaxed">Reading the brief — premium sedan intenders, Singapore, competitor &amp; showroom-visitation signals, launch-consideration objective…</span>
              </div>
              <p className="font-['Jua',sans-serif] text-[16px] text-[#1a1a1a] leading-snug mb-4 max-w-[560px]">{QUESTIONS[qIndex].headline}</p>
              <ClarifyWidget key={qIndex} index={qIndex} onSubmit={answerQuestion} />
            </>
          )}

          {step === 'building' && (
            <>
              <div className="flex items-center gap-3 bg-white border border-[#e5e5e2] rounded-xl px-4 py-3 mb-3 max-w-[520px]">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-[#e0d8f8] border-t-[#732d93] animate-spin flex-shrink-0" />
                <span className="font-['Jua',sans-serif] text-[13px] text-[#6a6a6a]">Building the audience — applying filters, matching against auto-intent &amp; visitation data…</span>
              </div>
              <p className="font-['Jua',sans-serif] text-[12px] text-[#9a9a9a]">Reading 14 sources · showroom foot-traffic, premium-purchase, digital auto-research &amp; lifestyle signals</p>
            </>
          )}

          {step === 'preview' && (
            <>
              <div className="flex items-center gap-2 mb-3"><Check className="w-4 h-4 text-[#1D9E75]" /><span className="font-['Jua',sans-serif] text-[13px] text-[#6a6a6a]">Built — 284k people from 14 sources</span></div>
              <p className="font-['Jua',sans-serif] text-[13.5px] text-[#1a1a1a] leading-relaxed mb-3 max-w-[440px]"><b>{AUD_NAME}</b> — open on the right. Refine it in words, or save it as-is.</p>
              <p className="font-['Jua',sans-serif] text-[11px] uppercase tracking-wide text-[#9a9a9a] mb-2">Try refining</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Only Districts 9, 10, 11', 'Tighten to high-intent', 'Add EV-curious'].map(c => (
                  <button key={c} onClick={() => setComposer(c)} className="px-3 py-1.5 rounded-full font-['Jua',sans-serif] text-[12px] border border-[#e0d8f8] bg-[#fcf6ff] text-[#5c2375] hover:bg-[#f5eeff] transition-colors">{c}</button>
                ))}
              </div>
              <button onClick={() => setStep('saved')} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#732d93] text-white font-['Jua',sans-serif] text-[13px] hover:bg-[#5c2375] transition-colors">
                Save audience <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {step === 'saved' && (
            <>
              <div className="flex items-center gap-2 mb-3"><Check className="w-4 h-4 text-[#1D9E75]" /><span className="font-['Jua',sans-serif] text-[13px] text-[#6a6a6a]">Saved · now in your Audiences library</span></div>
              <p className="font-['Jua',sans-serif] text-[13.5px] text-[#1a1a1a] leading-relaxed mb-4 max-w-[440px]"><b>{AUD_NAME}</b> is saved and reusable in any prompt. Want to keep going?</p>
              <div className="space-y-2 max-w-[440px]">
                <button onClick={() => onSaved(AUD_ID, AUD_NAME)} className="w-full flex items-center gap-3 bg-white border border-[#e5e5e2] rounded-xl px-3 py-2.5 text-left hover:border-[#e0d8f8] transition-colors">
                  <span className="w-[26px] h-[26px] rounded-lg bg-[#f0e8ff] flex items-center justify-center flex-shrink-0"><Users className="w-[15px] h-[15px] text-[#732d93]" /></span>
                  <span><span className="block font-['Jua',sans-serif] text-[13px] text-[#1e163c]">Open its full profile</span><span className="block font-['Jua',sans-serif] text-[11.5px] text-[#9a9a9a]">Deep-dive · mobility · digital twin</span></span>
                </button>
                <button onClick={onExit} className="w-full flex items-center gap-3 bg-white border border-[#e5e5e2] rounded-xl px-3 py-2.5 text-left hover:border-[#e0d8f8] transition-colors">
                  <span className="w-[26px] h-[26px] rounded-lg bg-[#f0e8ff] flex items-center justify-center flex-shrink-0"><Plus className="w-[15px] h-[15px] text-[#732d93]" /></span>
                  <span><span className="block font-['Jua',sans-serif] text-[13px] text-[#1e163c]">Back to Audiences library</span><span className="block font-['Jua',sans-serif] text-[11.5px] text-[#9a9a9a]">See it filed with the rest</span></span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* composer */}
        <div className="px-5 py-4 border-t border-[#e5e5e2] bg-white flex-shrink-0">
          <div className="border border-[#e5e5e2] rounded-2xl px-4 py-3 focus-within:border-[#732d93] transition-colors">
            <input value={composer} onChange={e => setComposer(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && step === 'brief') submitBrief(composer); }}
              placeholder={step === 'brief' ? 'Describe your audience…' : 'Reply to Lumos'}
              className="w-full font-['Jua',sans-serif] text-[14px] text-black outline-none placeholder:text-[#b0b0b0] mb-2.5" />
            <div className="flex items-center gap-3 text-[#6a6a6a]">
              <span className="flex items-center gap-1.5 font-['Jua',sans-serif] text-[12px] text-[#732d93]"><Users className="w-3.5 h-3.5" />Add audience</span>
              <span className="flex-1" />
              <Search className="w-4 h-4" /><Paperclip className="w-4 h-4" />
              <button onClick={() => step === 'brief' && submitBrief(composer)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${composer.trim() && step === 'brief' ? 'bg-[#732d93]' : 'bg-[#e0d8f8]'}`}>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── DATA EXPLORER SESSION RAIL ── */}
      <SessionRail step={step} narrow={built} />

      {/* ── AUDIENCE DETAIL PANEL (the real one) ── */}
      {built && (
        <div className="w-[420px] flex-shrink-0 border-l border-[#d3d3d0] bg-white overflow-hidden flex flex-col">
          <AudienceDetailPanel audienceId={AUD_ID} screen="profiles" />
        </div>
      )}
    </div>
  );
}
