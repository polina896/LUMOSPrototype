import { X } from 'lucide-react';

interface TemplatePreviewModalProps {
  template: {
    id: string;
    title: string;
    description: string;
    sections: number;
    icon: React.ReactNode;
  };
  onClose: () => void;
  onUse: () => void;
  onRemix?: () => void;
}

// ── Per-template section definitions ────────────────────────────────────────

const KEY_SECTIONS: Record<string, string[]> = {
  't1': ['AI Summary', 'Top Audiences by Reach', 'Growth Audiences', 'Campaign Recommendations', 'End'],
  't2': ['Messaging Angles', 'Proof Points by Segment', 'Tone of Voice Guide', 'End'],
  't3': ['Segment Profiles Side-by-Side', 'Reach & Index Comparison', 'Behavioural Overlap', 'End'],
  't4': ['Channel Allocation Matrix', 'Budget by Segment', 'Timing Calendar', 'Rationale Notes', 'End'],
  't5': ['Executive Summary', 'Market Opportunity', 'Audience Findings', 'Next Steps', 'End'],
  't6': ['Campaign Objectives', 'Messaging Per Segment', 'Channel Mix', 'Success Metrics', 'End'],
  't7': ['Segment Profile', 'Demographic Deep Dive', 'Spend & Lifestyle Signals', 'Brand Affinity', 'Recommendations', 'End'],
  't8': ['Growth Opportunity Overview', 'Segment Index Scores', 'Activation Priorities', 'End'],
  't9': ['Channel Recommendations', 'Reach Estimates', 'Cost Guidance', 'End'],
  'm1': ['Launch Objectives', 'Singapore Segment Matrix', 'Channel Plan', 'Test-Drive Strategy', 'End'],
  'm2': ['EV Intender Profile', 'Green Plan Messaging', 'Digital Activation', 'End'],
};

const DESCRIPTIONS: Record<string, string> = {
  't1': 'Use this template to build a full audience strategy with segment profiles, geo concentration, growth signals, and campaign recommendations.',
  't2': 'Use this template to map messaging angles, proof points, and tone of voice across all target audiences and channels.',
  't3': 'Use this template for a side-by-side comparison of 2–4 audience segments across reach, demographics, and behaviours.',
  't4': 'Use this template to plan channel mix, timing, and budget allocation by segment with rationale for each recommendation.',
  't5': 'Use this template for a board-ready summary of market opportunity, audience findings, and strategic next steps.',
  't6': 'Use this template to produce a creative and channel brief per segment, including objectives, messaging, and success metrics.',
  't7': 'Use this template for a single-segment deep dive covering demographics, spend patterns, lifestyle signals, and brand affinity.',
  't8': 'Use this template to identify the highest-growth audience segments with index scores and activation recommendations.',
  't9': 'Use this template to recommend channel allocation per audience with reach estimates and cost guidance.',
  'm1': 'Custom launch brief template for premium automotive audiences in the Singapore market.',
  'm2': 'Activation playbook for EV intender segments with Singapore Green Plan messaging angles.',
};

// ── Preview content per template ─────────────────────────────────────────────

function AudienceStrategyPreview() {
  return (
    <div className="flex flex-col gap-4">
      {/* AI Summary */}
      <div>
        <p className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.8px] text-[#9a9a9a] mb-1.5">AI Summary</p>
        <p className="font-['Jua',sans-serif] text-[11px] text-[#333] leading-[16px] bg-[#fafaf9] border border-[#e5e5e2] rounded-lg p-3">
          The Singapore premium auto market splits across three high-value conquest segments. Lead with Affluent Professionals for launch volume in Districts 9–11, build pipeline with Tech-savvy Families ahead of the EV release.
        </p>
      </div>

      {/* Top Audiences by Reach */}
      <div>
        <p className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.8px] text-[#9a9a9a] mb-2">Top Audiences by Reach</p>
        <div className="flex flex-col gap-2">
          {[
            { label: 'Affluent Professionals', pct: 35, color: '#2d7a4f', bg: '#e8f4ec' },
            { label: 'Tech-savvy Families',    pct: 28, color: '#3457a6', bg: '#eaf0fb' },
            { label: 'Expat Executives',       pct: 22, color: '#a05c10', bg: '#fef3e2' },
          ].map((a) => (
            <div key={a.label} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: a.color }} />
              <span className="font-['Jua',sans-serif] text-[11px] text-[#333] w-[130px] shrink-0">{a.label}</span>
              <div className="flex-1 h-[6px] bg-[#f3f3f1] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(a.pct / 35) * 100}%`, background: a.color }} />
              </div>
              <span className="font-['Jua',sans-serif] text-[11px] w-[28px] text-right shrink-0" style={{ color: a.color }}>{a.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Audiences */}
      <div>
        <p className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.8px] text-[#9a9a9a] mb-2">Growth Audiences</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Young Entrepreneurs', growth: '+28% YoY', note: 'New wealth, tech sector' },
            { name: 'Sustainability Millennials', growth: '+41% YoY', note: 'EV interest, D15–16' },
          ].map((g) => (
            <div key={g.name} className="bg-[#fafaf9] border border-[#e5e5e2] rounded-lg p-2.5">
              <p className="font-['Jua',sans-serif] text-[11px] text-[#1a1a1a] mb-0.5">{g.name}</p>
              <p className="font-['Jua',sans-serif] text-[13px] text-[#2d7a4f] mb-0.5">{g.growth}</p>
              <p className="font-['Jua',sans-serif] text-[10px] text-[#9a9a9a]">{g.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Recommendations */}
      <div>
        <p className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.8px] text-[#9a9a9a] mb-2">Campaign Recommendations</p>
        <div className="bg-[#fafaf9] border border-[#e5e5e2] rounded-lg p-3 flex flex-col gap-1.5">
          <p className="font-['Jua',sans-serif] text-[11px] text-[#6b3c72]">Affluent Professionals</p>
          <p className="font-['Jua',sans-serif] text-[11px] text-[#333] leading-[16px]">Msg: Engineering meets legacy — for those who've earned the right to expect both.</p>
          <p className="font-['Jua',sans-serif] text-[10px] text-[#9a9a9a]">Channels: OOH D9–11 (40%), Digital (30%), Events (20%), Press (10%)</p>
        </div>
      </div>
    </div>
  );
}

function MessagingMatrixPreview() {
  const rows = [
    { segment: 'Affluent Professionals', angle: 'Engineering meets legacy', proof: 'Award-winning performance credentials', tone: 'Authoritative, aspirational' },
    { segment: 'EV Upgrade Shoppers',    angle: 'Precision for the planet',  proof: 'Singapore Green Plan alignment',      tone: 'Progressive, confident' },
    { segment: 'Family SUV Upgraders',   angle: 'Every journey, considered', proof: '5-star safety, 7-seat versatility',   tone: 'Warm, reassuring' },
  ];
  return (
    <div className="flex flex-col gap-3">
      <p className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.8px] text-[#9a9a9a]">Messaging Angles · by segment</p>
      <div className="border border-[#e5e5e2] rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-[#fafaf9] border-b border-[#e5e5e2]">
          {['Segment', 'Angle', 'Proof point', 'Tone'].map((h) => (
            <div key={h} className="px-3 py-2">
              <p className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.6px] text-[#9a9a9a]">{h}</p>
            </div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={r.segment} className={`grid grid-cols-4 ${i < rows.length - 1 ? 'border-b border-[#f0f0ee]' : ''}`}>
            {[r.segment, r.angle, r.proof, r.tone].map((cell, j) => (
              <div key={j} className="px-3 py-2.5">
                <p className={`font-['Jua',sans-serif] text-[10px] leading-[14px] ${j === 0 ? 'text-[#6b3c72]' : 'text-[#333]'}`}>{cell}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericPreview({ title, sections }: { title: string; sections: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.8px] text-[#9a9a9a]">Template structure</p>
      <div className="flex flex-col gap-2">
        {sections.filter(s => s !== 'End').map((s, i) => (
          <div key={s} className="bg-[#fafaf9] border border-[#e5e5e2] rounded-lg px-4 py-3 flex items-center gap-3">
            <div className="w-[22px] h-[22px] rounded-full bg-[#f1e9ff] flex items-center justify-center shrink-0">
              <span className="font-['Jua',sans-serif] text-[10px] text-[#6b3c72]">{i + 1}</span>
            </div>
            <div className="flex-1">
              <p className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a]">{s}</p>
              <div className="mt-1.5 flex flex-col gap-1">
                <div className="h-1.5 bg-[#f1e9ff] rounded-full w-full" />
                <div className="h-1.5 bg-[#f3f3f1] rounded-full w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="font-['Jua',sans-serif] text-[10px] text-[#9a9a9a] text-center">AI will populate each section based on your audience data</p>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function TemplatePreviewModal({ template, onClose, onUse, onRemix }: TemplatePreviewModalProps) {
  const sections = KEY_SECTIONS[template.id] ?? ['Summary', 'Analysis', 'Recommendations', 'End'];
  const description = DESCRIPTIONS[template.id] ?? template.description;

  const renderPreview = () => {
    if (template.id === 't1' || template.id === 'm1') return <AudienceStrategyPreview />;
    if (template.id === 't2') return <MessagingMatrixPreview />;
    return <GenericPreview title={template.title} sections={sections} />;
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.35)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal card */}
      <div
        className="bg-white rounded-[11px] border border-[#e5e5e2] shadow-2xl flex overflow-hidden"
        style={{ width: 720, maxHeight: '85vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Left panel ── */}
        <div className="w-[260px] shrink-0 flex flex-col border-r border-[#e5e5e2] p-6">
          {/* Icon */}
          <div className="w-[36px] h-[36px] bg-[#f1e9ff] border border-[#e5e5e2] rounded-xl flex items-center justify-center mb-4">
            {template.icon}
          </div>

          {/* Title + description */}
          <h2 className="font-['Jua',sans-serif] text-[17px] text-[#1a1a1a] leading-tight mb-2">{template.title}</h2>
          <p className="font-['Jua',sans-serif] text-[12px] text-[#6b6b6b] leading-[17px] mb-6">{description}</p>

          {/* Key Sections */}
          <p className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] mb-3">Key Sections</p>
          <ul className="flex flex-col gap-2 flex-1">
            {sections.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b89fc4] shrink-0" />
                <span className="font-['Jua',sans-serif] text-[12px] text-[#444]">{s}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col gap-2 pt-5 border-t border-[#e5e5e2]">
            <button
              onClick={onRemix}
              className="w-full px-4 py-2.5 border border-[#e5e5e2] rounded-lg font-['Jua',sans-serif] text-[13px] text-[#444] hover:bg-[#f5f5f3] transition-colors"
            >
              Remix template
            </button>
            <button
              onClick={onUse}
              className="w-full px-4 py-2.5 bg-[#6b3c72] hover:bg-[#5c2375] text-white rounded-lg font-['Jua',sans-serif] text-[13px] transition-colors"
            >
              Use this template
            </button>
          </div>
        </div>

        {/* ── Right panel — preview ── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Preview header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5e5e2] shrink-0">
            <span className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.8px] text-[#9a9a9a]">Preview</span>
            <button
              onClick={onClose}
              className="w-[26px] h-[26px] flex items-center justify-center rounded-lg hover:bg-[#f3f3f1] transition-colors"
            >
              <X className="w-3.5 h-3.5 text-[#6b6b6b]" />
            </button>
          </div>

          {/* Preview body */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  );
}
