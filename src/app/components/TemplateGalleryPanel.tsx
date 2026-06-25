import { useState } from 'react';
import { Search, Plus, BarChart2, GitCompare, MessageSquare, Map, TrendingUp, FileText, Layers } from 'lucide-react';
import TemplatePreviewModal from './TemplatePreviewModal';
import TemplateEditorModal from './TemplateEditorModal';
import UseTemplateModal from './UseTemplateModal';

interface Template {
  id: string;
  title: string;
  description: string;
  sections: number;
  icon: React.ReactNode;
  badge?: string;
}

const LUMOS_TEMPLATES: Template[] = [
  {
    id: 't1',
    title: 'Audience Strategy Doc',
    description: 'Full audience analysis with segment profiles, geo concentration, growth signals, and campaign recommendations.',
    sections: 4,
    icon: <BarChart2 className="w-4 h-4 text-[#6b3c72]" />,
    badge: 'Most used',
  },
  {
    id: 't2',
    title: 'Messaging Matrix',
    description: 'Map messaging angles, proof points, and tone of voice across audiences and channels.',
    sections: 3,
    icon: <MessageSquare className="w-4 h-4 text-[#6b3c72]" />,
  },
  {
    id: 't3',
    title: 'Audience Comparison',
    description: 'Side-by-side comparison of 2–4 segments across reach, demographics, and behaviours.',
    sections: 3,
    icon: <GitCompare className="w-4 h-4 text-[#6b3c72]" />,
  },
  {
    id: 't4',
    title: 'Media Plan',
    description: 'Channel mix, timing, and budget allocation by segment with rationale for each recommendation.',
    sections: 4,
    icon: <Map className="w-4 h-4 text-[#6b3c72]" />,
  },
  {
    id: 't5',
    title: 'Executive Insight Report',
    description: 'Board-ready summary of market opportunity, audience findings, and next steps.',
    sections: 2,
    icon: <TrendingUp className="w-4 h-4 text-[#6b3c72]" />,
  },
  {
    id: 't6',
    title: 'Campaign Brief',
    description: 'Creative and channel brief per segment, including objectives, messaging, and success metrics.',
    sections: 3,
    icon: <FileText className="w-4 h-4 text-[#6b3c72]" />,
  },
  {
    id: 't7',
    title: 'Segment Deep Dive',
    description: 'Single-segment deep analysis covering demographics, spend, lifestyle, and brand affinity.',
    sections: 5,
    icon: <Layers className="w-4 h-4 text-[#6b3c72]" />,
  },
  {
    id: 't8',
    title: 'Growth Opportunity Report',
    description: 'Identify highest-growth audience segments with index scores and activation recommendations.',
    sections: 3,
    icon: <TrendingUp className="w-4 h-4 text-[#6b3c72]" />,
  },
  {
    id: 't9',
    title: 'Channel Mix Planner',
    description: 'Recommended channel allocation per audience with reach estimates and cost guidance.',
    sections: 3,
    icon: <BarChart2 className="w-4 h-4 text-[#6b3c72]" />,
  },
];

const MY_TEMPLATES: Template[] = [
  {
    id: 'm1',
    title: 'Meridian Motors Launch Brief',
    description: 'Custom campaign brief template tailored for premium automotive audience segments in Singapore.',
    sections: 4,
    icon: <FileText className="w-4 h-4 text-[#6b3c72]" />,
  },
  {
    id: 'm2',
    title: 'EV Segment Playbook',
    description: 'Activation playbook for EV intender segments with Singapore Green Plan messaging angles.',
    sections: 3,
    icon: <Layers className="w-4 h-4 text-[#6b3c72]" />,
  },
];

interface TemplateGalleryPanelProps {
  onBack: () => void;
}

export default function TemplateGalleryPanel({ onBack }: TemplateGalleryPanelProps) {
  const [activeTab, setActiveTab] = useState<'lumos' | 'my'>('lumos');
  const [search, setSearch] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<(typeof LUMOS_TEMPLATES)[0] | null>(null);
  const [useTemplate, setUseTemplate] = useState<(typeof LUMOS_TEMPLATES)[0] | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const templates = activeTab === 'lumos' ? LUMOS_TEMPLATES : MY_TEMPLATES;
  const filtered = search.trim()
    ? templates.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
      )
    : templates;

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#fafaf9]">
      {/* Header */}
      <div className="flex-none flex items-center justify-between px-8 pt-7 pb-5">
        <h1 className="font-['Jua',sans-serif] text-[21px] text-[#1a1a1a] font-normal leading-none">
          <button
            onClick={onBack}
            className="hover:text-[#6b3c72] transition-colors"
          >
            Documents
          </button>
          <span className="text-[#9a9a9a] mx-2">/</span>
          Templates
        </h1>
        <button
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#6b3c72] hover:bg-[#5c2375] text-white rounded-lg font-['Jua',sans-serif] text-[13px] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New Template
        </button>
      </div>

      {/* Search */}
      <div className="flex-none px-8 pb-4">
        <div className="relative w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9a9a9a]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Template"
            className="w-full pl-9 pr-3 py-2 border border-[#e5e5e2] rounded-[7px] bg-white font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] placeholder:text-[#9a9a9a] outline-none focus:border-[#6b3c72] transition-colors"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-none flex gap-0 px-8 border-b border-[#e5e5e2] mb-6">
        {[
          { key: 'lumos' as const, label: 'Lumos Templates' },
          { key: 'my' as const, label: 'My Templates' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 font-['Jua',sans-serif] text-[14px] transition-colors border-b-2 -mb-px ${
              activeTab === tab.key
                ? 'text-[#6b3c72] border-[#6b3c72]'
                : 'text-[#3e4450] border-transparent hover:text-[#6b3c72]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <p className="font-['Jua',sans-serif] text-[14px] text-[#b0b0b0]">No templates match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-[11px]">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-[#e5e5e2] rounded-[11px] p-4 flex flex-col gap-3 hover:border-[#c8b8d4] hover:shadow-sm transition-all"
              >
                {/* Card top: icon + badge */}
                <div className="flex items-start justify-between">
                  <div className="w-[30px] h-[30px] bg-[#f1e9ff] border border-[#e5e5e2] rounded-lg flex items-center justify-center shrink-0">
                    {t.icon}
                  </div>
                  {t.badge && (
                    <span className="px-2 py-0.5 bg-[#6b3c72] text-white rounded font-['Jua',sans-serif] text-[10px] whitespace-nowrap">
                      {t.badge}
                    </span>
                  )}
                </div>

                {/* Title + description */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <p className="font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] leading-tight">{t.title}</p>
                  <p className="font-['Jua',sans-serif] text-[11px] text-[#6b6b6b] leading-[16px] line-clamp-3">{t.description}</p>
                </div>

                {/* Footer: section count + buttons */}
                <div className="flex items-center justify-between pt-1 border-t border-[#f0f0ee]">
                  <span className="font-['Jua',sans-serif] text-[11px] text-[#9a9a9a]">{t.sections} sections</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setPreviewTemplate(t)}
                      className="px-3 py-1 bg-[#fafaf8] border border-[#e5e5e2] rounded-md font-['Jua',sans-serif] text-[11px] text-[#6b6b6b] hover:border-[#6b3c72] hover:text-[#6b3c72] transition-colors"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => setUseTemplate(t)}
                      className="px-3 py-1 bg-[#6b3c72] hover:bg-[#5c2375] text-white rounded-md font-['Jua',sans-serif] text-[11px] transition-colors"
                    >
                      Use
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Template preview modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onUse={() => { setUseTemplate(previewTemplate); setPreviewTemplate(null); }}
          onRemix={() => { setPreviewTemplate(null); setShowEditor(true); }}
        />
      )}

      {/* Use template modal */}
      {useTemplate && (
        <UseTemplateModal
          templateTitle={useTemplate.title}
          onClose={() => setUseTemplate(null)}
          onGenerate={(_audience, _context) => setUseTemplate(null)}
        />
      )}

      {/* Template editor modal */}
      {showEditor && (
        <TemplateEditorModal
          onClose={() => setShowEditor(false)}
          onSave={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}
