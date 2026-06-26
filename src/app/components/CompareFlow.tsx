import { useState, useRef, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import {
  Users, X, Search, MapPin, PieChart, Calendar, ArrowRight, Send,
  GitMerge, Split, Target, Zap, Map as MapIcon, Sparkles, FileText, Save, RefreshCw, Mic, Paperclip, ScanSearch,
} from 'lucide-react';

// ─── Saved-audience library (compare picker) ──────────────────────────────────

type AudTag = 'High Value' | 'Frequent Buyers';

interface SavedAudience {
  id: string;
  category: string;
  name: string;
  size: string;
  tag: AudTag;
}

const SAVED_AUDIENCES: SavedAudience[] = [
  { id: 'premium-sedan-intenders', category: 'Premium Sedans', name: 'Premium Sedan Intenders', size: '284k', tag: 'High Value' },
  { id: 'ev-upgrade-shoppers',     category: 'EV & Hybrid',    name: 'EV Upgrade Shoppers',     size: '218k', tag: 'High Value' },
  { id: 'family-suv-upgraders',    category: 'Family SUV',     name: 'Family SUV Upgraders',    size: '195k', tag: 'Frequent Buyers' },
  { id: 'first-time-buyers',       category: 'First-Time Buyers', name: 'First-Time Buyers',    size: '312k', tag: 'Frequent Buyers' },
  { id: 'fleet-corporate',         category: 'Fleet & Corporate', name: 'Fleet & Corporate Drivers', size: '148k', tag: 'High Value' },
  { id: 'upgrade-ready-owners',    category: 'Upgrade Owners', name: 'Upgrade-Ready Owners',    size: '387k', tag: 'High Value' },
  { id: 'weekend-lifestyle',       category: 'Weekend Lifestyle', name: 'Weekend Lifestyle Drivers', size: '462k', tag: 'Frequent Buyers' },
  { id: 'performance-buyers',      category: 'Performance',    name: 'Performance Car Buyers',  size: '394k', tag: 'High Value' },
];

function TagBadge({ tag }: { tag: AudTag }) {
  const isValue = tag === 'High Value';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-['Geist',sans-serif] font-semibold flex-shrink-0 ${
      isValue ? 'bg-[#e8f5e9] text-[#2e7d32]' : 'bg-[#fff3e0] text-[#e65100]'
    }`}>
      {isValue ? '🏷️' : '🔄'} {tag}
    </span>
  );
}

// ─── Dimensions ───────────────────────────────────────────────────────────────

type DimId = 'geography' | 'demographics' | 'time';

const DIMENSIONS: { id: DimId; icon: typeof MapPin; title: string; eg: string; lens: string }[] = [
  { id: 'geography',    icon: MapPin,   title: 'Geography',          eg: 'Same audiences across markets — e.g. Singapore vs Malaysia', lens: 'Singapore vs Malaysia' },
  { id: 'demographics', icon: PieChart, title: 'Age & demographics', eg: 'Across age groups or income bands — e.g. 18–24 vs 35–44',    lens: 'Age & income bands' },
  { id: 'time',         icon: Calendar, title: 'Time period',        eg: 'Across seasons or moments — e.g. April vs December',          lens: 'April vs December' },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface CompareFlowProps {
  seed?: SavedAudience[];
  seedPrompt?: string;
  onExit: () => void;
}

type Step = 'setup' | 'dimension' | 'analyzing' | 'result';

export default function CompareFlow({ seed = [], seedPrompt = '', onExit }: CompareFlowProps) {
  const [step, setStep] = useState<Step>('setup');
  const [selected, setSelected] = useState<SavedAudience[]>(seed.length ? seed : []);
  const [prompt, setPrompt] = useState(seedPrompt);
  const [dimension, setDimension] = useState<DimId>('geography');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [step]);

  // analyzing → result beat
  useEffect(() => {
    if (step === 'analyzing') {
      const t = setTimeout(() => setStep('result'), 1900);
      return () => clearTimeout(t);
    }
  }, [step]);

  const pair = selected.slice(0, 2);
  const lens = DIMENSIONS.find((d) => d.id === dimension)!.lens;

  return (
    <div className="flex-1 flex flex-col bg-white min-h-0">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {step === 'setup' ? (
          <SetupScreen
            selected={selected}
            setSelected={setSelected}
            prompt={prompt}
            setPrompt={setPrompt}
            onCompare={() => setStep('dimension')}
            onCancel={onExit}
          />
        ) : (
          <div className="px-8 py-8">
            <div className="max-w-[760px] mx-auto pb-10">
              {/* Continuous conversation: the opening user turn */}
              {prompt.trim() ? (
                <UserMessage text={prompt.trim()} />
              ) : (
                <UserMessage text={`Compare ${pair.map((a) => a.name).join(' and ')}`} />
              )}

              <AILine text="Great — here are the two audiences you're comparing:" />
              <div className="flex items-center gap-2.5 flex-wrap mb-7">
                {pair.map((a, i) => (
                  <span key={a.id} className="inline-flex items-center gap-2">
                    <AudienceChip name={a.name} variant={i === 0 ? 'a' : 'b'} />
                    {i === 0 && <span className="font-['Geist',sans-serif] text-[13px] font-medium text-[#aaa]">vs</span>}
                  </span>
                ))}
              </div>

              {step === 'dimension' && (
                <DimensionQuestion
                  dimension={dimension}
                  setDimension={setDimension}
                  onNext={() => setStep('analyzing')}
                />
              )}

              {(step === 'analyzing' || step === 'result') && (
                <>
                  <UserMessage text={`Compare them across ${DIMENSIONS.find((d) => d.id === dimension)!.title.toLowerCase()}`} />
                  <AnalyzingBeat lens={lens} />
                </>
              )}

              {step === 'result' && <ResultReport pair={pair} dimension={dimension} lens={lens} />}
            </div>
          </div>
        )}
      </div>

      {/* Docked composer (continuous chat) */}
      {step !== 'setup' && (
        <div className="px-8 py-5 border-t border-gray-200 flex-shrink-0">
          <div className="max-w-[760px] mx-auto">
            <Composer />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step 1 · Set up comparison ───────────────────────────────────────────────

function SetupScreen({
  selected, setSelected, prompt, setPrompt, onCompare, onCancel,
}: {
  selected: SavedAudience[];
  setSelected: Dispatch<SetStateAction<SavedAudience[]>>;
  prompt: string;
  setPrompt: (p: string) => void;
  onCompare: () => void;
  onCancel: () => void;
}) {
  const [search, setSearch] = useState('');
  const selectedIds = new Set(selected.map((a) => a.id));

  const toggle = (a: SavedAudience) => {
    setSelected((prev) => prev.some((x) => x.id === a.id) ? prev.filter((x) => x.id !== a.id) : [...prev, a]);
  };

  const filtered = search.trim()
    ? SAVED_AUDIENCES.filter((a) => (a.name + a.category).toLowerCase().includes(search.toLowerCase()))
    : SAVED_AUDIENCES;

  const grouped: Record<string, SavedAudience[]> = {};
  for (const a of filtered) (grouped[a.category] ??= []).push(a);

  const canCompare = selected.length >= 2;

  return (
    <div className="px-8 py-10">
      <div className="max-w-[640px] mx-auto">
        <div className="flex items-start justify-between mb-1.5">
          <h1 className="font-['Geist',sans-serif] font-bold text-[24px] text-black">Let's set up your comparison</h1>
          <button onClick={onCancel} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors mt-1" title="Cancel">
            <X className="w-4 h-4 text-[#999]" />
          </button>
        </div>
        <p className="font-['Geist',sans-serif] text-[15px] text-[#666] leading-relaxed mb-6">
          Pick two or more saved audiences and I'll find where they overlap and where they pull apart.
        </p>

        {/* Optional prompt */}
        <div className="mb-5">
          <textarea
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Add a prompt (optional) — e.g. which is the better launch audience for Singapore?"
            className="w-full px-4 py-3 bg-[#faf9ff] border border-[#e8e4f4] rounded-xl font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] outline-none focus:border-[#732d93] placeholder:text-[#b8b0c8] resize-none transition-colors"
          />
        </div>

        {/* Picker card */}
        <div className="bg-white border border-[#e5e5e2] rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#f0f0f0] flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#aaa] flex-shrink-0" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved audiences…"
              className="flex-1 font-['Geist',sans-serif] text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#aaa]"
            />
          </div>
          <div className="max-h-[320px] overflow-y-auto py-1">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <p className="px-4 pt-2.5 pb-1 font-['Geist',sans-serif] text-[10px] font-semibold text-[#aaa] uppercase tracking-wider">{cat}</p>
                {items.map((a) => {
                  const on = selectedIds.has(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggle(a)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${on ? 'bg-[#f0ebff]' : 'hover:bg-[#f8f8f8]'}`}
                    >
                      <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${on ? 'bg-[#7c6bf0] border-[#7c6bf0]' : 'border-[#ccc]'}`}>
                        {on && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className="flex-1 font-['Geist',sans-serif] text-[14px] text-[#1a1a1a] truncate">{a.name}</span>
                      <span className="font-['Geist',sans-serif] text-[12px] text-[#999] flex-shrink-0">{a.size}</span>
                      <TagBadge tag={a.tag} />
                    </button>
                  );
                })}
              </div>
            ))}
            {Object.keys(grouped).length === 0 && (
              <p className="px-4 py-8 text-center font-['Geist',sans-serif] text-[14px] text-[#aaa]">No audiences match "{search}"</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5">
          <span className="font-['Geist',sans-serif] text-[13px] text-[#888]">
            {selected.length === 0 ? 'Select at least 2 audiences' : `${selected.length} selected`}
          </span>
          <button
            onClick={onCompare}
            disabled={!canCompare}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-['Geist',sans-serif] text-[14px] font-medium transition-colors ${
              canCompare ? 'bg-[#732d93] text-white hover:bg-[#5c2375]' : 'bg-[#f0edf7] text-[#c0b0d0] cursor-not-allowed'
            }`}
          >
            Compare {selected.length >= 2 ? selected.length : ''} audiences
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2 · Dimension question ──────────────────────────────────────────────

function DimensionQuestion({
  dimension, setDimension, onNext,
}: {
  dimension: DimId;
  setDimension: (d: DimId) => void;
  onNext: () => void;
}) {
  const [freeText, setFreeText] = useState('');

  return (
    <div className="mb-6">
      <h2 className="font-['Geist',sans-serif] font-bold text-[22px] text-[#1a1a1a] mb-5">What do you want to compare them across?</h2>
      <div className="bg-white border border-[#e5e5e2] rounded-2xl p-5">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-5">
          <span className="h-1.5 w-10 rounded-full bg-[#732d93]" />
          <span className="h-1.5 w-10 rounded-full bg-[#e5e0f0]" />
          <span className="font-['Geist',sans-serif] text-[12px] font-medium text-[#888] ml-1">Question 1 of 2</span>
        </div>

        <div className="space-y-3">
          {DIMENSIONS.map((d) => {
            const on = dimension === d.id;
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => setDimension(d.id)}
                className={`w-full flex items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all border ${
                  on ? 'border-[#732d93] border-2 bg-[#f7f1fb]' : 'border-[#e5e5e2] hover:border-[#cfc6dd]'
                }`}
              >
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${on ? 'bg-[#e9dcf2]' : 'bg-[#f3f0f7]'}`}>
                  <Icon className="w-5 h-5 text-[#732d93]" />
                </span>
                <span className="flex-1">
                  <span className="block font-['Geist',sans-serif] font-semibold text-[15px] text-[#1a1a1a]">{d.title}</span>
                  <span className="block font-['Geist',sans-serif] text-[13px] text-[#888] mt-0.5">{d.eg}</span>
                </span>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${on ? 'bg-[#732d93] border-[#732d93]' : 'border-[#ccc]'}`}>
                  {on && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* or free text */}
        <div className="flex items-center gap-3 my-4">
          <span className="flex-1 h-px bg-[#eee]" />
          <span className="font-['Geist',sans-serif] text-[12px] font-medium text-[#bbb]">or</span>
          <span className="flex-1 h-px bg-[#eee]" />
        </div>
        <div className="flex items-center gap-3">
          <input
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onNext(); }}
            placeholder="Describe what you want to compare in your own words…"
            className="flex-1 px-4 py-3 bg-[#faf9ff] border border-[#e8e4f4] rounded-xl font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] outline-none focus:border-[#732d93] placeholder:text-[#b8b0c8] transition-colors"
          />
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-[#732d93] text-white font-['Geist',sans-serif] text-[14px] font-medium hover:bg-[#5c2375] transition-colors flex-shrink-0"
          >
            Next <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3 · Analyzing beat ──────────────────────────────────────────────────

function AnalyzingBeat({ lens }: { lens: string }) {
  return (
    <div className="mb-6 flex items-center gap-2.5">
      <div className="flex gap-1">
        {[0, 150, 300].map((d) => (
          <div key={d} className="w-2 h-2 bg-[#7c6bf0] rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
        ))}
      </div>
      <span className="font-['Jua',sans-serif] text-[14px] text-[#999] italic">
        Comparing the two audiences across {lens.toLowerCase()} — overlap, deltas and index scores…
      </span>
    </div>
  );
}

// ─── Step 4 · Result report ───────────────────────────────────────────────────

const ATTRIBUTES = [
  { name: 'Affluent urban professional',     flag: 'Shared',        a: 78, ai: 245, b: 74, bi: 231 },
  { name: 'Extensive pre-purchase research', flag: 'Shared',        a: 70, ai: 218, b: 73, bi: 226 },
  { name: 'Sustainability & green incentives', flag: 'Biggest delta', a: 22, ai: 68,  b: 71, bi: 219 },
  { name: 'Brand prestige & financing',      flag: 'Delta',         a: 68, ai: 211, b: 34, bi: 104 },
] as const;

const STRATEGIES = [
  { icon: Target, title: 'Run one shared brand message in the overlap', desc: 'In central Singapore (Orchard, Bukit Timah, Holland V) the two audiences overlap 38% — lead with a single premium-professional message here for efficient reach before splitting creative.' },
  { icon: Zap,    title: 'Split creative on the biggest delta', desc: 'Lead EV Upgrade Shoppers with sustainability + Green Plan rebate messaging; lead Premium Sedan Intenders with prestige, performance and financing offers.' },
  { icon: MapIcon, title: 'Geo-weight the spend', desc: 'Prioritise Singapore for the EV push where intent indexes 240; in Malaysia, lead with the Premium Sedan + family-prestige angle and treat EV as secondary.' },
];

function ResultReport({ pair, lens }: { pair: SavedAudience[]; dimension: DimId; lens: string }) {
  const a = pair[0]?.name ?? 'Audience A';
  const b = pair[1]?.name ?? 'Audience B';

  return (
    <div>
      <AILine text={`Here's how your two audiences compare, with the lens on ${lens}.`} />
      <div className="flex items-center gap-2.5 flex-wrap mb-6">
        <AudienceChip name={a} variant="a" />
        <AudienceChip name={b} variant="b" />
        <span className="inline-flex items-center gap-1.5 font-['Geist',sans-serif] text-[13px] font-medium text-[#aaa]">
          <MapPin className="w-3.5 h-3.5" /> Lens: {lens}
        </span>
      </div>

      {/* Heroes */}
      <div className="grid grid-cols-2 gap-4 mb-7">
        <div className="rounded-2xl p-5 bg-[#e9f5ec]">
          <div className="flex items-center gap-1.5 font-['Geist',sans-serif] text-[12px] font-bold text-[#2e7d46] uppercase tracking-wide mb-2">
            <GitMerge className="w-3.5 h-3.5" /> Biggest overlap
          </div>
          <div className="font-['Geist',sans-serif] font-bold text-[38px] leading-none text-[#2e7d46]">38%</div>
          <p className="font-['Geist',sans-serif] text-[14px] text-[#33473a] leading-snug mt-2.5">
            Both skew to affluent urban professionals 35–44 who research heavily before buying — concentrated in central Singapore districts.
          </p>
        </div>
        <div className="rounded-2xl p-5 bg-[#fbeae3]">
          <div className="flex items-center gap-1.5 font-['Geist',sans-serif] text-[12px] font-bold text-[#b14a22] uppercase tracking-wide mb-2">
            <Split className="w-3.5 h-3.5" /> Biggest delta
          </div>
          <div className="font-['Geist',sans-serif] font-bold text-[38px] leading-none text-[#b14a22]">3.2×</div>
          <p className="font-['Geist',sans-serif] text-[14px] text-[#5e3a2b] leading-snug mt-2.5">
            EV Upgrade Shoppers index 3.2× higher on sustainability & green-incentive motivation, and far stronger in SG than MY.
          </p>
        </div>
      </div>

      {/* Index bars */}
      <h3 className="flex items-center gap-2 font-['Geist',sans-serif] font-bold text-[18px] text-[#1a1a1a] mb-3.5">
        <PieChart className="w-4.5 h-4.5 text-[#732d93]" /> Where they overlap and differ
      </h3>
      <div className="border border-[#e5e5e2] rounded-2xl bg-white p-5 mb-7">
        <div className="flex gap-5 mb-5">
          <span className="inline-flex items-center gap-2 font-['Geist',sans-serif] text-[13px] font-semibold text-[#666]">
            <span className="w-3 h-3 rounded bg-[#732d93]" /> {a}
          </span>
          <span className="inline-flex items-center gap-2 font-['Geist',sans-serif] text-[13px] font-semibold text-[#666]">
            <span className="w-3 h-3 rounded bg-[#4d6bf0]" /> {b}
          </span>
        </div>

        {ATTRIBUTES.map((attr, i) => {
          const isDelta = attr.flag !== 'Shared';
          return (
            <div key={attr.name} className={i < ATTRIBUTES.length - 1 ? 'mb-5' : ''}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-['Geist',sans-serif] font-semibold text-[14px] text-[#1a1a1a]">{attr.name}</span>
                <span className={`font-['Geist',sans-serif] text-[11px] font-semibold rounded-full px-2.5 py-0.5 ${
                  isDelta ? 'bg-[#fbeae3] text-[#b14a22]' : 'bg-[#e9f5ec] text-[#2e7d46]'
                }`}>{attr.flag}</span>
              </div>
              <div className="space-y-1.5">
                <BarLine width={attr.a} color="#732d93" value={`Index ${attr.ai}`} />
                <BarLine width={attr.b} color="#4d6bf0" value={`Index ${attr.bi}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Strategy recs */}
      <h3 className="flex items-center gap-2 font-['Geist',sans-serif] font-bold text-[18px] text-[#1a1a1a] mb-3.5">
        <Sparkles className="w-4.5 h-4.5 text-[#732d93]" /> What this means for your campaign
      </h3>
      <div className="border border-[#e5e5e2] rounded-2xl bg-white px-5 mb-7">
        {STRATEGIES.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className={`flex gap-4 items-start py-4 ${i < STRATEGIES.length - 1 ? 'border-b border-[#f0f0f0]' : ''}`}>
              <span className="w-10 h-10 rounded-xl bg-[#f3f0f7] flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#732d93]" />
              </span>
              <div>
                <p className="font-['Geist',sans-serif] font-semibold text-[15px] text-[#1a1a1a] mb-0.5">{s.title}</p>
                <p className="font-['Geist',sans-serif] text-[14px] text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#732d93] text-white font-['Geist',sans-serif] text-[14px] font-semibold hover:bg-[#5c2375] transition-colors">
          <Sparkles className="w-4 h-4" /> Create campaign recommendations
        </button>
        <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#ddd] text-[#1a1a1a] font-['Geist',sans-serif] text-[14px] font-semibold hover:bg-gray-50 transition-colors">
          <FileText className="w-4 h-4" /> Turn into strategy doc
        </button>
        <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#ddd] text-[#1a1a1a] font-['Geist',sans-serif] text-[14px] font-semibold hover:bg-gray-50 transition-colors">
          <Save className="w-4 h-4" /> Save comparison
        </button>
      </div>

      {/* Follow-ups */}
      <h4 className="font-['Geist',sans-serif] font-semibold text-[14px] text-[#666] mb-3">Keep exploring</h4>
      <div className="space-y-2.5">
        {[
          'Narrow this comparison to 18–24 year olds',
          'Which channels suit each audience best?',
          'Add a third audience to the comparison',
        ].map((q) => (
          <button key={q} className="flex items-center gap-3 w-full text-left border border-[#e5e5e2] rounded-xl px-4 py-3 hover:bg-[#faf9fc] transition-colors">
            <RefreshCw className="w-4 h-4 text-[#732d93] flex-shrink-0" />
            <span className="font-['Geist',sans-serif] text-[14px] font-medium text-[#1a1a1a]">{q}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BarLine({ width, color, value }: { width: number; color: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-3.5 bg-[#f3f2f0] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${width}%`, background: color }} />
      </div>
      <span className="font-['Geist',sans-serif] text-[12px] font-semibold text-[#888] w-[88px] flex-shrink-0">{value}</span>
    </div>
  );
}

// ─── Shared bits ──────────────────────────────────────────────────────────────

function AILine({ text }: { text: string }) {
  return <p className="font-['Jua',sans-serif] text-[16px] text-[#140934] leading-relaxed mb-3">{text}</p>;
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end mb-6">
      <div className="max-w-[85%] bg-[#e7e7e7] rounded-tl-xl rounded-tr-xl rounded-bl-xl px-4 py-3">
        <p className="font-['Jua',sans-serif] text-[14px] text-black opacity-70 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function AudienceChip({ name, variant }: { name: string; variant: 'a' | 'b' }) {
  const styles = variant === 'a'
    ? 'bg-[#f3e9f8] text-[#732d93]'
    : 'bg-[#eff1fe] text-[#33409a]';
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-['Geist',sans-serif] text-[13px] font-semibold ${styles}`}>
      <Users className="w-3.5 h-3.5" /> {name}
    </span>
  );
}

function Composer() {
  return (
    <div className="bg-white border border-[#ccc] rounded-lg shadow-sm">
      <div className="px-4 py-3">
        <input type="text" placeholder="Reply to Lumos…" className="w-full font-['Jua',sans-serif] text-[14px] text-black outline-none placeholder:text-[#999] placeholder:opacity-50" />
      </div>
      <div className="flex items-center justify-between px-2 pb-2">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-[#f3f0ff] rounded-lg transition-colors">
          <Users className="w-4 h-4 text-[#7c6bf0]" />
          <span className="font-['Geist',sans-serif] text-[13px] text-[#7c6bf0] font-medium">Add audience</span>
        </button>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded transition-colors">
            <ScanSearch className="w-4 h-4 text-[#797F8A]" />
            <span className="font-['Jua',sans-serif] text-[14px] text-[#2e2e2e]">Explore</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors"><Paperclip className="w-4 h-4 text-[#595959]" /></button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors"><Mic className="w-4 h-4 text-[#595959]" /></button>
          <button className="p-2.5 bg-[#4d6bf0] opacity-30 rounded-full"><ArrowRight className="w-4 h-4 text-white" /></button>
        </div>
      </div>
    </div>
  );
}

export type { SavedAudience };
export { SAVED_AUDIENCES };
