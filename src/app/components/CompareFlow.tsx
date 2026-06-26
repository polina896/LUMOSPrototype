import { useState, useRef, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import {
  Users, X, Search, MapPin, PieChart, Calendar, ArrowRight, Send, Check, Plus,
  GitMerge, Split, Target, Zap, Map as MapIcon, Sparkles, FileText, Save, RefreshCw, Mic, Paperclip, ScanSearch, FileBarChart,
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

// ─── Dimensions + branch model ────────────────────────────────────────────────

type DimId = 'geography' | 'demographics' | 'time';

const DIMENSIONS: { id: DimId; icon: typeof MapPin; title: string; eg: string; desc: string }[] = [
  { id: 'geography',    icon: MapPin,   title: 'Geography',          eg: 'Same audiences across markets — e.g. Singapore vs Malaysia', desc: 'comparing same audiences across markets' },
  { id: 'demographics', icon: PieChart, title: 'Age & demographics', eg: 'Across age groups or income bands — e.g. 18–24 vs 35–44',    desc: 'across age groups or income bands' },
  { id: 'time',         icon: Calendar, title: 'Time period',        eg: 'Across seasons or moments — e.g. April vs December, or Black Friday vs Christmas', desc: 'across seasons or moments' },
];

const GEO_LEVELS = ['Postcode', 'City / Suburb', 'State / Region', 'Country'];
const AGE_BANDS = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55+', 'Custom range'];
const DEMO_SPLITS = ['Income band', 'Education level', 'Household size', 'Occupation', 'Life stage', 'Custom'];
const TIME_MOMENTS = ['End of financial year', 'Mid financial year', 'Christmas period', 'Easter period', 'Peak vs off-peak', 'Specific dates', 'Custom comparison'];

type Step = 'setup' | 'dimension' | 'geo-level' | 'geo-locations' | 'age' | 'demographics' | 'time' | 'result';

interface CompareFlowProps {
  seed?: SavedAudience[];
  seedPrompt?: string;
  onExit: () => void;
}

export default function CompareFlow({ seed = [], seedPrompt = '', onExit }: CompareFlowProps) {
  const [step, setStep] = useState<Step>('setup');
  const [selected, setSelected] = useState<SavedAudience[]>(seed.length ? seed : []);
  const [prompt, setPrompt] = useState(seedPrompt);
  const [dimension, setDimension] = useState<DimId>('geography');
  const [geoLevel, setGeoLevel] = useState('City / Suburb');
  const [locA, setLocA] = useState('Singapore');
  const [locB, setLocB] = useState('Malaysia');
  const [ageBands, setAgeBands] = useState<string[]>(['18–24', '35–44']);
  const [demoSplits, setDemoSplits] = useState<string[]>(['Income band']);
  const [timeMoments, setTimeMoments] = useState<string[]>(['Christmas period']);

  const leftScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (leftScrollRef.current) leftScrollRef.current.scrollTop = leftScrollRef.current.scrollHeight;
  }, [step]);

  const pair = selected.slice(0, 2);
  const dimMeta = DIMENSIONS.find((d) => d.id === dimension)!;

  const lens =
    dimension === 'geography' ? `${locA} vs ${locB}`
    : dimension === 'demographics' ? `${ageBands.join(' vs ') || 'age bands'}`
    : `${timeMoments.join(' vs ') || 'time periods'}`;

  // Advance handlers
  const startCompare = () => setStep('dimension');
  const onDimensionNext = () => setStep(dimension === 'geography' ? 'geo-level' : dimension === 'demographics' ? 'age' : 'time');

  const conversation = (
    <Conversation
      step={step}
      pair={pair}
      prompt={prompt}
      dimension={dimension}
      setDimension={setDimension}
      dimMeta={dimMeta}
      geoLevel={geoLevel}
      setGeoLevel={setGeoLevel}
      locA={locA} setLocA={setLocA} locB={locB} setLocB={setLocB}
      ageBands={ageBands} setAgeBands={setAgeBands}
      demoSplits={demoSplits} setDemoSplits={setDemoSplits}
      timeMoments={timeMoments} setTimeMoments={setTimeMoments}
      onDimensionNext={onDimensionNext}
      onGeoLevelNext={() => setStep('geo-locations')}
      onGeoRun={() => setStep('result')}
      onAgeNext={() => setStep('demographics')}
      onDemoNext={() => setStep('result')}
      onTimeNext={() => setStep('result')}
    />
  );

  // ── Setup is its own full screen ──
  if (step === 'setup') {
    return (
      <div className="flex-1 flex flex-col bg-white min-h-0 overflow-y-auto">
        <SetupScreen
          selected={selected} setSelected={setSelected}
          prompt={prompt} setPrompt={setPrompt}
          onCompare={startCompare} onCancel={onExit}
        />
      </div>
    );
  }

  // ── Result is two-pane: chat left, doc right ──
  if (step === 'result') {
    return (
      <div className="flex-1 flex min-h-0 bg-white">
        {/* LEFT — chat continues */}
        <div className="flex flex-col min-w-0 border-r border-[#e5e5e2]" style={{ flex: '1 1 0%' }}>
          <div ref={leftScrollRef} className="flex-1 overflow-y-auto px-7 py-8">
            <div className="max-w-[560px] mx-auto pb-6">{conversation}</div>
          </div>
          <div className="px-7 py-4 border-t border-gray-200 flex-shrink-0">
            <div className="max-w-[560px] mx-auto"><Composer /></div>
          </div>
        </div>
        {/* RIGHT — comparison doc (flexes & caps so it always fits the viewport) */}
        <div className="flex flex-col min-w-0 bg-[#fcfcfc]" style={{ flex: '1.5 1 0%', maxWidth: 820 }}>
          <div className="flex items-center justify-end gap-2 px-6 py-3 border-b border-[#e5e5e2] flex-shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#ddd] bg-white text-[#555] font-['Geist',sans-serif] text-[13px] font-medium hover:bg-gray-50 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add block
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#732d93] text-white font-['Geist',sans-serif] text-[13px] font-medium hover:bg-[#5c2375] transition-colors">
              Save doc <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-7 py-6">
            <ReportDoc pair={pair} dimension={dimension} lens={lens} locA={locA} locB={locB} />
          </div>
        </div>
      </div>
    );
  }

  // ── All guided question steps — single centered column ──
  return (
    <div className="flex-1 flex flex-col bg-white min-h-0">
      <div ref={leftScrollRef} className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-[720px] mx-auto pb-10">{conversation}</div>
      </div>
      <div className="px-8 py-5 border-t border-gray-200 flex-shrink-0">
        <div className="max-w-[720px] mx-auto"><Composer /></div>
      </div>
    </div>
  );
}

// ─── Conversation (left chat transcript + active question) ────────────────────

interface ConvProps {
  step: Step;
  pair: SavedAudience[];
  prompt: string;
  dimension: DimId;
  setDimension: (d: DimId) => void;
  dimMeta: { id: DimId; title: string; eg: string; desc: string; icon: typeof MapPin };
  geoLevel: string; setGeoLevel: (s: string) => void;
  locA: string; setLocA: (s: string) => void; locB: string; setLocB: (s: string) => void;
  ageBands: string[]; setAgeBands: Dispatch<SetStateAction<string[]>>;
  demoSplits: string[]; setDemoSplits: Dispatch<SetStateAction<string[]>>;
  timeMoments: string[]; setTimeMoments: Dispatch<SetStateAction<string[]>>;
  onDimensionNext: () => void;
  onGeoLevelNext: () => void; onGeoRun: () => void;
  onAgeNext: () => void; onDemoNext: () => void; onTimeNext: () => void;
}

function Conversation(p: ConvProps) {
  const { step, pair, prompt, dimension, dimMeta } = p;
  const names = pair.map((a) => a.name);
  const opening = prompt.trim() ||
    `We're targeting ${names.join(' and ')} — can one campaign speak to both, or do we need to split creative? Help me understand where these audiences overlap and where they diverge.`;

  const isResult = step === 'result';
  const pastDimension = step !== 'dimension';

  return (
    <>
      <UserMessage text={opening} />
      <ActionPill text={`Added ${pair.length} audiences — ${names.join(' · ')}`} />

      {/* ── Dimension milestone ── */}
      {!pastDimension ? (
        <>
          <AILine text="Great — here are the two audiences you're comparing:" />
          <div className="flex items-center gap-2.5 flex-wrap mb-6">
            <AudienceChip name={names[0] ?? 'Audience A'} variant="a" />
            <span className="font-['Geist',sans-serif] text-[13px] font-medium text-[#aaa]">vs</span>
            <AudienceChip name={names[1] ?? 'Audience B'} variant="b" />
          </div>
          <h2 className="font-['Geist',sans-serif] font-bold text-[22px] text-[#1a1a1a] mb-5">What do you want to compare them across?</h2>
          <DimensionQuestion dimension={dimension} setDimension={p.setDimension} onNext={p.onDimensionNext} />
        </>
      ) : isResult ? (
        <ActionPill text={resultDimPill(p)} />
      ) : (
        <ActionPill text={`${dimMeta.title} selected — ${dimMeta.desc}`} />
      )}

      {/* ── Geography branch ── */}
      {pastDimension && dimension === 'geography' && (
        <>
          {step === 'geo-level' && (
            <>
              <h2 className="font-['Geist',sans-serif] font-bold text-[22px] text-[#1a1a1a] mb-5">Which level of geography should I compare them on?</h2>
              <QuestionCard progress={[true, false]} count="Question 1 of 2" subtitle="Select the geography level to compare:">
                <ChipRow options={GEO_LEVELS} selected={[p.geoLevel]} onToggle={(v) => p.setGeoLevel(v)} />
                <FreeTextRow placeholder="Or describe the geography…" onNext={p.onGeoLevelNext} label="Next" />
              </QuestionCard>
            </>
          )}
          {(step === 'geo-locations') && <ActionPill text={`Level selected — ${p.geoLevel}`} />}
          {step === 'geo-locations' && (
            <>
              <h2 className="font-['Geist',sans-serif] font-bold text-[22px] text-[#1a1a1a] mb-5">Which specific cities or suburbs should I compare?</h2>
              <QuestionCard progress={[true, true]} count="Question 2 of 2" subtitle="Enter the locations you want to compare:" hint="You can enter multiple — Lumos will compare both audiences across all of them.">
                <div className="flex items-center gap-3 mb-3">
                  <input value={p.locA} onChange={(e) => p.setLocA(e.target.value)} placeholder="e.g. Singapore" className="flex-1 px-4 py-3 bg-[#faf9ff] border border-[#e8e4f4] rounded-xl font-['Jua',sans-serif] text-[14px] outline-none focus:border-[#732d93]" />
                  <span className="font-['Geist',sans-serif] text-[13px] font-medium text-[#aaa]">vs</span>
                  <input value={p.locB} onChange={(e) => p.setLocB(e.target.value)} placeholder="e.g. Malaysia" className="flex-1 px-4 py-3 bg-[#faf9ff] border border-[#e8e4f4] rounded-xl font-['Jua',sans-serif] text-[14px] outline-none focus:border-[#732d93]" />
                </div>
                <button className="flex items-center gap-1.5 font-['Geist',sans-serif] text-[13px] font-medium text-[#732d93] mb-4 hover:opacity-70">
                  <Plus className="w-3.5 h-3.5" /> Add another location
                </button>
                <button onClick={p.onGeoRun} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#732d93] text-white font-['Geist',sans-serif] text-[14px] font-medium hover:bg-[#5c2375] transition-colors">
                  Run comparison <ArrowRight className="w-4 h-4" />
                </button>
              </QuestionCard>
            </>
          )}
        </>
      )}

      {/* ── Age & demographics branch ── */}
      {pastDimension && dimension === 'demographics' && (
        <>
          {step === 'age' && (
            <>
              <h2 className="font-['Geist',sans-serif] font-bold text-[22px] text-[#1a1a1a] mb-5">Which age ranges should I compare?</h2>
              <QuestionCard progress={[true, false]} count="Question 1 of 2" subtitle="Select the age bands to compare:">
                <ChipRow options={AGE_BANDS} selected={p.ageBands} multi onToggle={(v) => p.setAgeBands((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])} />
                <FreeTextRow placeholder="Or describe the age range…" onNext={p.onAgeNext} label="Next" />
              </QuestionCard>
            </>
          )}
          {(step === 'demographics') && <ActionPill text={`Age range selected — ${p.ageBands.join(', ')}`} />}
          {step === 'demographics' && (
            <>
              <h2 className="font-['Geist',sans-serif] font-bold text-[22px] text-[#1a1a1a] mb-5">Which demographic dimensions should I compare?</h2>
              <QuestionCard progress={[true, true]} count="Question 2 of 2" subtitle="Select the demographic split:">
                <ChipRow options={DEMO_SPLITS} selected={p.demoSplits} multi onToggle={(v) => p.setDemoSplits((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])} />
                <FreeTextRow placeholder="Or describe the demographic split…" onNext={p.onDemoNext} label="Next" />
              </QuestionCard>
            </>
          )}
        </>
      )}

      {/* ── Time period branch ── */}
      {pastDimension && dimension === 'time' && step === 'time' && (
        <>
          <h2 className="font-['Geist',sans-serif] font-bold text-[22px] text-[#1a1a1a] mb-5">Which time periods should I compare?</h2>
          <QuestionCard progress={[true]} count="Question 1 of 1" subtitle="Describe the two moments you want to compare:">
            <ChipRow options={TIME_MOMENTS} selected={p.timeMoments} multi onToggle={(v) => p.setTimeMoments((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])} />
            <FreeTextRow placeholder="e.g. Christmas 2024 vs mid-May 2024, or end of FY vs start of FY…" onNext={p.onTimeNext} label="Next" />
          </QuestionCard>
        </>
      )}

      {/* ── Result: doc card + actions + follow-ups (left pane) ── */}
      {isResult && (
        <>
          <DocCard names={names} />
          <p className="font-['Geist',sans-serif] text-[12px] text-[#999] mb-4">5 data sources analysed</p>
          <div className="flex flex-wrap gap-2.5 mb-7">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#732d93] text-white font-['Geist',sans-serif] text-[13px] font-semibold hover:bg-[#5c2375] transition-colors">
              <Sparkles className="w-4 h-4" /> Create campaign recommendations
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#ddd] text-[#1a1a1a] font-['Geist',sans-serif] text-[13px] font-semibold hover:bg-gray-50 transition-colors">
              <FileText className="w-4 h-4" /> Turn into strategy doc
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#ddd] text-[#1a1a1a] font-['Geist',sans-serif] text-[13px] font-semibold hover:bg-gray-50 transition-colors">
              <Save className="w-4 h-4" /> Save comparison
            </button>
          </div>
          <h4 className="font-['Geist',sans-serif] font-semibold text-[14px] text-[#666] mb-3">Keep exploring</h4>
          <div className="space-y-2.5">
            {['Narrow this comparison to 18–24 year olds', 'Which channels suit each audience best?', 'Add a third audience to the comparison'].map((q) => (
              <button key={q} className="flex items-center gap-3 w-full text-left border border-[#e5e5e2] rounded-xl px-4 py-3 hover:bg-[#faf9fc] transition-colors">
                <RefreshCw className="w-4 h-4 text-[#732d93] flex-shrink-0" />
                <span className="font-['Geist',sans-serif] text-[14px] font-medium text-[#1a1a1a]">{q}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function resultDimPill(p: ConvProps): string {
  if (p.dimension === 'geography') return `Geography selected — ${p.geoLevel} — ${p.locA} vs ${p.locB}`;
  if (p.dimension === 'demographics') return `Age & demographics selected — ${p.ageBands.join(', ')} · ${p.demoSplits.join(', ')}`;
  return `Time period selected — ${p.timeMoments.join(', ')}`;
}

// ─── Setup screen ─────────────────────────────────────────────────────────────

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
  const toggle = (a: SavedAudience) =>
    setSelected((prev) => prev.some((x) => x.id === a.id) ? prev.filter((x) => x.id !== a.id) : [...prev, a]);

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
        <div className="mb-5">
          <textarea
            rows={2} value={prompt} onChange={(e) => setPrompt(e.target.value)}
            placeholder="Add a prompt (optional) — e.g. which is the better launch audience for Singapore?"
            className="w-full px-4 py-3 bg-[#faf9ff] border border-[#e8e4f4] rounded-xl font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] outline-none focus:border-[#732d93] placeholder:text-[#b8b0c8] resize-none transition-colors"
          />
        </div>
        <div className="bg-white border border-[#e5e5e2] rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#f0f0f0] flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#aaa] flex-shrink-0" />
            <input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search saved audiences…"
              className="flex-1 font-['Geist',sans-serif] text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#aaa]" />
          </div>
          <div className="max-h-[300px] overflow-y-auto py-1">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <p className="px-4 pt-2.5 pb-1 font-['Geist',sans-serif] text-[10px] font-semibold text-[#aaa] uppercase tracking-wider">{cat}</p>
                {items.map((a) => {
                  const on = selectedIds.has(a.id);
                  return (
                    <button key={a.id} onClick={() => toggle(a)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${on ? 'bg-[#f0ebff]' : 'hover:bg-[#f8f8f8]'}`}>
                      <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${on ? 'bg-[#7c6bf0] border-[#7c6bf0]' : 'border-[#ccc]'}`}>
                        {on && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
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
        <div className="flex items-center justify-between mt-5">
          <span className="font-['Geist',sans-serif] text-[13px] text-[#888]">
            {selected.length === 0 ? 'Select at least 2 audiences' : `${selected.length} selected`}
          </span>
          <button onClick={onCompare} disabled={!canCompare}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-['Geist',sans-serif] text-[14px] font-medium transition-colors ${
              canCompare ? 'bg-[#732d93] text-white hover:bg-[#5c2375]' : 'bg-[#f0edf7] text-[#c0b0d0] cursor-not-allowed'
            }`}>
            Compare {selected.length >= 2 ? selected.length : ''} audiences <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Dimension question ───────────────────────────────────────────────────────

function DimensionQuestion({ dimension, setDimension, onNext }: { dimension: DimId; setDimension: (d: DimId) => void; onNext: () => void }) {
  const [freeText, setFreeText] = useState('');
  return (
    <div className="bg-white border border-[#e5e5e2] rounded-2xl p-5 mb-6">
      <Progress segs={[true, false]} count="Question 1 of 2" />
      <div className="space-y-3 mt-5">
        {DIMENSIONS.map((d) => {
          const on = dimension === d.id;
          const Icon = d.icon;
          return (
            <button key={d.id} onClick={() => setDimension(d.id)}
              className={`w-full flex items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all border ${on ? 'border-[#732d93] border-2 bg-[#f7f1fb]' : 'border-[#e5e5e2] hover:border-[#cfc6dd]'}`}>
              <span className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${on ? 'bg-[#e9dcf2]' : 'bg-[#f3f0f7]'}`}>
                <Icon className="w-5 h-5 text-[#732d93]" />
              </span>
              <span className="flex-1">
                <span className="block font-['Geist',sans-serif] font-semibold text-[15px] text-[#1a1a1a]">{d.title}</span>
                <span className="block font-['Geist',sans-serif] text-[13px] text-[#888] mt-0.5">{d.eg}</span>
              </span>
              <RadioDot on={on} />
            </button>
          );
        })}
      </div>
      <OrDivider />
      <div className="flex items-center gap-3">
        <input value={freeText} onChange={(e) => setFreeText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') onNext(); }}
          placeholder="Describe what you want to compare in your own words…"
          className="flex-1 px-4 py-3 bg-[#faf9ff] border border-[#e8e4f4] rounded-xl font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] outline-none focus:border-[#732d93] placeholder:text-[#b8b0c8] transition-colors" />
        <button onClick={onNext} className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-[#732d93] text-white font-['Geist',sans-serif] text-[14px] font-medium hover:bg-[#5c2375] transition-colors flex-shrink-0">
          Next <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Report doc (right panel) ─────────────────────────────────────────────────

const ATTRIBUTES = [
  { name: 'Affluent urban professional',       flag: 'Shared',        a: 78, av: 'Index 245', b: 74, bv: 'Index 231' },
  { name: 'Extensive pre-purchase research',   flag: 'Shared',        a: 70, av: 'Index 218', b: 73, bv: 'Index 226' },
  { name: 'Sustainability & green incentives', flag: 'Biggest delta', a: 22, av: 'Index 68',  b: 71, bv: 'Index 219' },
  { name: 'Brand prestige & financing',        flag: 'Delta',         a: 68, av: 'Index 211', b: 34, bv: 'Index 104' },
] as const;

const STRATEGIES = [
  { icon: Target, title: 'Run one shared brand message in the overlap', desc: 'In central Singapore (Orchard, Bukit Timah, Holland V) the two audiences overlap 38% — lead with a single premium-professional message here for efficient reach before splitting creative.' },
  { icon: Zap,    title: 'Split creative on the biggest delta', desc: 'Lead EV Upgrade Shoppers with sustainability + Green Plan rebate messaging; lead Premium Sedan Intenders with prestige, performance and financing offers.' },
  { icon: MapIcon, title: 'Geo-weight the spend', desc: 'Prioritise Singapore for the EV launch push where intent indexes 240; in Malaysia, lead with the Premium Sedan + family-prestige angle and treat EV as secondary.' },
];

function ReportDoc({ pair, lens, locA, locB }: { pair: SavedAudience[]; dimension: DimId; lens: string; locA: string; locB: string }) {
  const a = pair[0]?.name ?? 'Audience A';
  const b = pair[1]?.name ?? 'Audience B';
  return (
    <div className="max-w-[640px]">
      <p className="font-['Jua',sans-serif] text-[16px] text-[#140934] leading-relaxed mb-4">Here's how your two audiences compare across {locA} and {locB}.</p>
      <div className="flex items-center gap-2.5 flex-wrap mb-6">
        <AudienceChip name={a} variant="a" />
        <AudienceChip name={b} variant="b" />
        <span className="inline-flex items-center gap-1.5 font-['Geist',sans-serif] text-[13px] font-medium text-[#aaa]"><MapPin className="w-3.5 h-3.5" /> Lens: {lens}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-7">
        <div className="rounded-2xl p-5 bg-[#e9f5ec]">
          <div className="flex items-center gap-1.5 font-['Geist',sans-serif] text-[12px] font-bold text-[#2e7d46] uppercase tracking-wide mb-2"><GitMerge className="w-3.5 h-3.5" /> Biggest overlap</div>
          <div className="font-['Geist',sans-serif] font-bold text-[36px] leading-none text-[#2e7d46]">38%</div>
          <p className="font-['Geist',sans-serif] text-[14px] text-[#33473a] leading-snug mt-2.5">Both skew to affluent urban professionals 35–44 who research heavily before buying — concentrated in central Singapore districts.</p>
        </div>
        <div className="rounded-2xl p-5 bg-[#fbeae3]">
          <div className="flex items-center gap-1.5 font-['Geist',sans-serif] text-[12px] font-bold text-[#b14a22] uppercase tracking-wide mb-2"><Split className="w-3.5 h-3.5" /> Biggest delta</div>
          <div className="font-['Geist',sans-serif] font-bold text-[36px] leading-none text-[#b14a22]">3.2×</div>
          <p className="font-['Geist',sans-serif] text-[14px] text-[#5e3a2b] leading-snug mt-2.5">EV Upgrade Shoppers index 3.2× higher on sustainability & green-incentive motivation, and far stronger in SG than MY.</p>
        </div>
      </div>

      <h3 className="flex items-center gap-2 font-['Geist',sans-serif] font-bold text-[18px] text-[#1a1a1a] mb-3.5"><PieChart className="w-4 h-4 text-[#732d93]" /> Where they overlap and differ</h3>
      <div className="border border-[#e5e5e2] rounded-2xl bg-white p-5 mb-7">
        <div className="flex gap-5 mb-5">
          <span className="inline-flex items-center gap-2 font-['Geist',sans-serif] text-[13px] font-semibold text-[#666]"><span className="w-3 h-3 rounded bg-[#732d93]" /> {a}</span>
          <span className="inline-flex items-center gap-2 font-['Geist',sans-serif] text-[13px] font-semibold text-[#666]"><span className="w-3 h-3 rounded bg-[#4d6bf0]" /> {b}</span>
        </div>
        {ATTRIBUTES.map((attr) => {
          const isDelta = attr.flag !== 'Shared';
          return (
            <div key={attr.name} className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-['Geist',sans-serif] font-semibold text-[14px] text-[#1a1a1a]">{attr.name}</span>
                <span className={`font-['Geist',sans-serif] text-[11px] font-semibold rounded-full px-2.5 py-0.5 ${isDelta ? 'bg-[#fbeae3] text-[#b14a22]' : 'bg-[#e9f5ec] text-[#2e7d46]'}`}>{attr.flag}</span>
              </div>
              <div className="space-y-1.5">
                <BarLine width={attr.a} color="#732d93" value={attr.av} />
                <BarLine width={attr.b} color="#4d6bf0" value={attr.bv} />
              </div>
            </div>
          );
        })}
        {/* 5th attribute — geography split */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-['Geist',sans-serif] font-semibold text-[14px] text-[#1a1a1a]">EV intent — {locA} vs {locB}</span>
            <span className="font-['Geist',sans-serif] text-[11px] font-semibold rounded-full px-2.5 py-0.5 bg-[#fbeae3] text-[#b14a22]">Delta</span>
          </div>
          <div className="space-y-1.5">
            <BarLine width={80} color="#4d6bf0" value={`SG · Index 240`} />
            <BarLine width={30} color="#4d6bf0" value={`MY · Index 90`} faded />
          </div>
        </div>
      </div>

      <h3 className="flex items-center gap-2 font-['Geist',sans-serif] font-bold text-[18px] text-[#1a1a1a] mb-3.5"><Sparkles className="w-4 h-4 text-[#732d93]" /> What this means for your campaign</h3>
      <div className="border border-[#e5e5e2] rounded-2xl bg-white px-5 mb-2">
        {STRATEGIES.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className={`flex gap-4 items-start py-4 ${i < STRATEGIES.length - 1 ? 'border-b border-[#f0f0f0]' : ''}`}>
              <span className="w-10 h-10 rounded-xl bg-[#f3f0f7] flex items-center justify-center flex-shrink-0"><Icon className="w-5 h-5 text-[#732d93]" /></span>
              <div>
                <p className="font-['Geist',sans-serif] font-semibold text-[15px] text-[#1a1a1a] mb-0.5">{s.title}</p>
                <p className="font-['Geist',sans-serif] text-[14px] text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Doc card (left pane) ─────────────────────────────────────────────────────

function DocCard({ names }: { names: string[] }) {
  return (
    <div className="my-4 bg-white border border-[#e0d4ff] rounded-xl overflow-hidden shadow-sm">
      <div className="bg-[#732d93] px-5 pt-4 pb-4">
        <p className="font-['Geist',sans-serif] text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-1.5">Audience comparison</p>
        <p className="font-['Jua',sans-serif] text-[17px] text-white leading-tight">Meridian Motors Singapore — Audience Comparison</p>
      </div>
      <div className="px-5 py-4">
        <p className="font-['Geist',sans-serif] text-[12px] text-[#888] mb-3">2 audience segments · {names.join(' vs ')}</p>
        <div className="space-y-1.5 mb-4">
          {['Biggest overlap — 38% shared traits', 'Biggest delta — 3.2× index variance', 'Where they overlap and differ', 'What this means for your campaign'].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#bbaaf0] flex-shrink-0" />
              <span className="font-['Geist',sans-serif] text-[12px] text-[#666]">{s}</span>
            </div>
          ))}
        </div>
        <button className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 bg-[#f5eeff] hover:bg-[#ece0ff] text-[#732d93] rounded-lg font-['Geist',sans-serif] text-[13px] font-medium transition-colors">
          View comparison <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Shared bits ──────────────────────────────────────────────────────────────

function AILine({ text }: { text: string }) {
  return <p className="font-['Jua',sans-serif] text-[16px] text-[#140934] leading-relaxed mb-3">{text}</p>;
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end mb-5">
      <div className="max-w-[85%] bg-[#e7e7e7] rounded-tl-xl rounded-tr-xl rounded-bl-xl px-4 py-3">
        <p className="font-['Jua',sans-serif] text-[14px] text-black opacity-70 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function ActionPill({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 border border-[#e5e5e2] rounded-xl px-3.5 py-2.5 mb-3 bg-white">
      <span className="w-4 h-4 rounded bg-[#f0ebff] flex items-center justify-center flex-shrink-0">
        <FileBarChart className="w-2.5 h-2.5 text-[#7c6bf0]" />
      </span>
      <span className="font-['Geist',sans-serif] text-[13px] text-[#777] truncate">{text}</span>
    </div>
  );
}

function AudienceChip({ name, variant }: { name: string; variant: 'a' | 'b' }) {
  const styles = variant === 'a' ? 'bg-[#f3e9f8] text-[#732d93]' : 'bg-[#eff1fe] text-[#33409a]';
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-['Geist',sans-serif] text-[13px] font-semibold ${styles}`}>
      <Users className="w-3.5 h-3.5" /> {name}
    </span>
  );
}

function Progress({ segs, count }: { segs: boolean[]; count: string }) {
  return (
    <div className="flex items-center gap-2">
      {segs.map((on, i) => <span key={i} className={`h-1.5 w-10 rounded-full ${on ? 'bg-[#732d93]' : 'bg-[#e5e0f0]'}`} />)}
      <span className="font-['Geist',sans-serif] text-[12px] font-medium text-[#888] ml-1">{count}</span>
    </div>
  );
}

function QuestionCard({ progress, count, subtitle, hint, children }: { progress: boolean[]; count: string; subtitle: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#e5e5e2] rounded-2xl p-5 mb-6">
      <Progress segs={progress} count={count} />
      <p className="font-['Geist',sans-serif] font-semibold text-[14px] text-[#1a1a1a] mt-5 mb-1">{subtitle}</p>
      {hint && <p className="font-['Geist',sans-serif] text-[13px] text-[#999] mb-3">{hint}</p>}
      <div className={hint ? '' : 'mt-3'}>{children}</div>
    </div>
  );
}

function ChipRow({ options, selected, onToggle, multi }: { options: string[]; selected: string[]; onToggle: (v: string) => void; multi?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2 mb-1">
      {options.map((o) => {
        const on = selected.includes(o);
        return (
          <button key={o} onClick={() => onToggle(o)}
            className={`px-3.5 py-2 rounded-full font-['Geist',sans-serif] text-[13px] font-medium border transition-all ${
              on ? 'bg-[#732d93] border-[#732d93] text-white' : 'bg-white border-[#ddd] text-[#555] hover:border-[#732d93] hover:text-[#732d93]'
            }`}>
            {multi && on && <Check className="w-3 h-3 inline mr-1 -mt-0.5" strokeWidth={3} />}{o}
          </button>
        );
      })}
    </div>
  );
}

function OrDivider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <span className="flex-1 h-px bg-[#eee]" />
      <span className="font-['Geist',sans-serif] text-[12px] font-medium text-[#bbb]">or</span>
      <span className="flex-1 h-px bg-[#eee]" />
    </div>
  );
}

function FreeTextRow({ placeholder, onNext, label }: { placeholder: string; onNext: () => void; label: string }) {
  const [val, setVal] = useState('');
  return (
    <>
      <OrDivider />
      <div className="flex items-center gap-3">
        <input value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') onNext(); }}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 bg-[#faf9ff] border border-[#e8e4f4] rounded-xl font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] outline-none focus:border-[#732d93] placeholder:text-[#b8b0c8] transition-colors" />
        <button onClick={onNext} className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-[#732d93] text-white font-['Geist',sans-serif] text-[14px] font-medium hover:bg-[#5c2375] transition-colors flex-shrink-0">
          {label} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}

function RadioDot({ on }: { on: boolean }) {
  return (
    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${on ? 'bg-[#732d93] border-[#732d93]' : 'border-[#ccc]'}`}>
      {on && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
    </span>
  );
}

function BarLine({ width, color, value, faded }: { width: number; color: string; value: string; faded?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-3.5 bg-[#f3f2f0] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${width}%`, background: color, opacity: faded ? 0.5 : 1 }} />
      </div>
      <span className="font-['Geist',sans-serif] text-[12px] font-semibold text-[#888] w-[92px] flex-shrink-0">{value}</span>
    </div>
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
