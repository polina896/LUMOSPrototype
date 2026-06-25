import { useState } from 'react';
import { X, Plus, GripVertical, Sparkles } from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

type SectionType = 'AI Summary' | 'Ranking' | 'Line Graph' | 'Table' | 'Bar Chart' | 'Text Block';

interface Section {
  id: string;
  title: string;
  types: SectionType[];
  description: string;
}

interface TemplateEditorModalProps {
  /** Pass an existing template to edit; undefined = create new */
  initial?: {
    name: string;
    aiPrompt: string;
    docType: string;
    sections: Section[];
  };
  onClose: () => void;
  onSave: (template: { name: string; aiPrompt: string; docType: string; sections: Section[] }) => void;
}

// ── Constants ────────────────────────────────────────────────────────────────

const DOC_TYPES = [
  'Audience Strategy',
  'Messaging Matrix',
  'Audience Comparison',
  'Media Plan',
  'Executive Insight Report',
  'Campaign Brief',
  'Segment Deep Dive',
];

const SECTION_TYPES: SectionType[] = ['AI Summary', 'Ranking', 'Line Graph', 'Table', 'Bar Chart', 'Text Block'];

const TYPE_COLORS: Record<SectionType, { bg: string; text: string }> = {
  'AI Summary':  { bg: '#f1e9ff', text: '#6b3c72' },
  'Ranking':     { bg: '#eaf0fb', text: '#2455a0' },
  'Line Graph':  { bg: '#e8f8f4', text: '#1a7a5e' },
  'Table':       { bg: '#fef3e2', text: '#995500' },
  'Bar Chart':   { bg: '#fce8e8', text: '#c0392b' },
  'Text Block':  { bg: '#f3f3f1', text: '#555555' },
};

const EXAMPLE_TEMPLATE = {
  name: 'Automotive Launch — Audience Strategy',
  aiPrompt: 'A template for automotive brand launches — covering key audience segments with reach data, growth opportunities, and campaign recommendations per audience including messaging and channel mix.',
  docType: 'Audience Strategy',
  sections: [
    {
      id: 's1',
      title: 'AU Summary',
      types: ['AI Summary'] as SectionType[],
      description: 'Summarise the key audience findings in 3–4 sentences. Lead with the strategic opportunity, then name the top segments and why they were selected for this automotive launch.',
    },
    {
      id: 's2',
      title: 'Top Audiences by Reach',
      types: ['Ranking'] as SectionType[],
      description: 'List the top 3 audience segments ranked by reach %. For each: name, age/income/district, reach %, and a one-line purchase motivation.',
    },
    {
      id: 's3',
      title: 'Growth Audiences',
      types: ['Ranking', 'Line Graph'] as SectionType[],
      description: "Identify 1–2 emerging segments not in the top 3 but with strong YoY growth. Include growth % and a brief explanation of what's driving the trend.",
    },
    {
      id: 's4',
      title: 'Campaign Recommendations',
      types: ['AI Summary'] as SectionType[],
      description: 'For each top audience: messaging angle (1 sentence), channel mix with % weighting, and creative direction (1 sentence).',
    },
  ],
};

// ── Preview pane ─────────────────────────────────────────────────────────────

function PreviewPane({ name, sections }: { name: string; sections: Section[] }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Document title */}
      <h2 className="font-['Jua',sans-serif] text-[16px] text-[#1a1a1a] leading-tight border-b border-[#e5e5e2] pb-3">
        {name || 'Untitled Template'}
      </h2>

      {/* Section previews */}
      {sections.map((s) => (
        <div key={s.id} className="flex flex-col gap-2">
          {/* Section header */}
          <p className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.8px] text-[#9a9a9a]">{s.title}</p>

          {/* Render skeleton matching the section type */}
          {s.types.includes('Ranking') ? (
            <div className="flex flex-col gap-1.5">
              {[92, 74, 58].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-[110px] h-2 bg-[#f3f3f1] rounded-full shrink-0" />
                  <div className="h-[5px] bg-[#e2d8f0] rounded-full" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
          ) : s.types.includes('Line Graph') ? (
            <div className="h-[40px] bg-[#fafaf9] border border-[#e5e5e2] rounded-lg flex items-center px-3 gap-2">
              <div className="w-full h-[20px] flex items-end gap-1">
                {[40, 55, 48, 62, 70, 65, 80].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#d4aadf] rounded-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          ) : s.types.includes('Table') ? (
            <div className="border border-[#e5e5e2] rounded-lg overflow-hidden">
              {[0, 1, 2].map((r) => (
                <div key={r} className={`flex gap-3 px-3 py-2 ${r < 2 ? 'border-b border-[#f0f0ee]' : ''} ${r === 0 ? 'bg-[#fafaf9]' : ''}`}>
                  {[60, 80, 50].map((w, c) => (
                    <div key={c} className="h-2 bg-[#f3f3f1] rounded-full" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            /* AI Summary / Text Block */
            <div className="bg-[#fafaf9] border border-[#e5e5e2] rounded-lg p-3 flex flex-col gap-1.5">
              <div className="h-2 bg-[#f3f3f1] rounded-full w-full" />
              <div className="h-2 bg-[#f3f3f1] rounded-full w-4/5" />
              <div className="h-2 bg-[#f3f3f1] rounded-full w-3/5" />
              <p className="font-['Jua',sans-serif] text-[10px] text-[#c0c0c0] mt-1">{
                s.description.split('.')[0].slice(0, 50) + '…'
              }</p>
            </div>
          )}
        </div>
      ))}

      {sections.length === 0 && (
        <p className="font-['Jua',sans-serif] text-[12px] text-[#b0b0b0] text-center py-8">Add sections to see the preview</p>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function TemplateEditorModal({ initial, onClose, onSave }: TemplateEditorModalProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [aiPrompt, setAiPrompt] = useState(initial?.aiPrompt ?? '');
  const [docType, setDocType] = useState(initial?.docType ?? 'Audience Strategy');
  const [sections, setSections] = useState<Section[]>(initial?.sections ?? []);
  const [editingTypeFor, setEditingTypeFor] = useState<string | null>(null);

  const handleAutoGenerate = () => {
    setName(EXAMPLE_TEMPLATE.name);
    setAiPrompt(EXAMPLE_TEMPLATE.aiPrompt);
    setDocType(EXAMPLE_TEMPLATE.docType);
    setSections(EXAMPLE_TEMPLATE.sections);
  };

  const addSection = () => {
    const id = `s${Date.now()}`;
    setSections((prev) => [
      ...prev,
      { id, title: `Section ${prev.length + 1}`, types: ['AI Summary'], description: '' },
    ]);
  };

  const updateSection = (id: string, patch: Partial<Section>) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const removeSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleType = (sectionId: string, type: SectionType) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== sectionId) return s;
        const has = s.types.includes(type);
        const next = has ? s.types.filter((t) => t !== type) : [...s.types, type];
        return { ...s, types: next.length === 0 ? ['AI Summary'] : next };
      })
    );
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name, aiPrompt, docType, sections });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white rounded-[11px] border border-[#e5e5e2] shadow-2xl flex flex-col overflow-hidden"
        style={{ width: 860, maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#e5e5e2] shrink-0">
          <h1 className="font-['Jua',sans-serif] text-[15px] text-[#1a1a1a] uppercase tracking-wide">
            {initial ? 'Edit Template' : 'Create New Template'}
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAutoGenerate}
              className="flex items-center gap-2 px-3 py-1.5 border border-dashed border-[#bebde7] bg-[#f1e9ff] rounded-lg font-['Jua',sans-serif] text-[12px] text-[#6b3c72] hover:bg-[#e9dcff] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Auto-generate with Example
            </button>
          </div>
        </div>

        {/* ── Body: form + preview ── */}
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* Left: form */}
          <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5 border-r border-[#e5e5e2]">

            {/* Template name */}
            <div className="flex flex-col gap-1.5">
              <label className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.77px] text-[#9a9a9a]">Template name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Automotive Launch — Audience Strategy"
                className="w-full px-3 py-2.5 border border-[#e5e5e2] rounded-[8px] bg-[#fafaf8] font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] placeholder:text-[#b0b0b0] outline-none focus:border-[#6b3c72] transition-colors"
              />
            </div>

            {/* AI prompt */}
            <div className="flex flex-col gap-1.5">
              <label className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.77px] text-[#9a9a9a]">Tell AI when to use this template</label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe the scenario where this template should be used..."
                rows={3}
                className="w-full px-3 py-2.5 border border-[#e5e5e2] rounded-[8px] bg-[#fafaf8] font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] placeholder:text-[#b0b0b0] outline-none focus:border-[#6b3c72] transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Document type */}
            <div className="flex flex-col gap-1.5">
              <label className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.77px] text-[#9a9a9a]">Document type</label>
              <div className="relative">
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 border border-[#e5e5e2] rounded-[8px] bg-[#fafaf8] font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] outline-none focus:border-[#6b3c72] cursor-pointer transition-colors"
                >
                  {DOC_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9a9a] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="font-['Jua',sans-serif] text-[10px] uppercase tracking-[0.77px] text-[#9a9a9a]">Sections</label>
                <button
                  onClick={addSection}
                  className="flex items-center gap-1.5 px-2.5 py-1 border border-[#e5e5e2] rounded-lg font-['Jua',sans-serif] text-[11px] text-[#6b3c72] hover:bg-[#f5f0ff] transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add section
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                {sections.map((s, idx) => (
                  <div key={s.id} className="border border-[#e5e5e2] rounded-[8px] overflow-hidden">
                    {/* Section header row */}
                    <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#fafaf9]">
                      <GripVertical className="w-3.5 h-3.5 text-[#c0c0c0] shrink-0 cursor-grab" />
                      <span className="font-['Jua',sans-serif] text-[12px] text-[#9a9a9a] shrink-0">{idx + 1}.</span>
                      <input
                        value={s.title}
                        onChange={(e) => updateSection(s.id, { title: e.target.value })}
                        className="flex-1 bg-transparent font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] outline-none min-w-0"
                        placeholder="Section title"
                      />
                      {/* Type badges */}
                      <div className="flex items-center gap-1 shrink-0">
                        {s.types.map((t) => (
                          <span
                            key={t}
                            onClick={() => setEditingTypeFor(editingTypeFor === s.id ? null : s.id)}
                            className="px-2 py-0.5 rounded-[4px] font-['Jua',sans-serif] text-[10px] cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ background: TYPE_COLORS[t].bg, color: TYPE_COLORS[t].text }}
                          >
                            {t}
                          </span>
                        ))}
                        <button
                          onClick={() => setEditingTypeFor(editingTypeFor === s.id ? null : s.id)}
                          className="w-[18px] h-[18px] flex items-center justify-center border border-[#e5e5e2] rounded-[4px] text-[#9a9a9a] hover:border-[#6b3c72] hover:text-[#6b3c72] transition-colors text-[12px]"
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeSection(s.id)}
                        className="w-[18px] h-[18px] flex items-center justify-center text-[#ccc] hover:text-[#c0392b] transition-colors shrink-0"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Type picker dropdown */}
                    {editingTypeFor === s.id && (
                      <div className="px-3 py-2 border-t border-[#e5e5e2] bg-white flex flex-wrap gap-1.5">
                        {SECTION_TYPES.map((t) => (
                          <button
                            key={t}
                            onClick={() => toggleType(s.id, t)}
                            className="px-2 py-0.5 rounded-[4px] font-['Jua',sans-serif] text-[10px] border transition-all"
                            style={
                              s.types.includes(t)
                                ? { background: TYPE_COLORS[t].bg, color: TYPE_COLORS[t].text, borderColor: TYPE_COLORS[t].text }
                                : { background: '#fff', color: '#9a9a9a', borderColor: '#e5e5e2' }
                            }
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Description textarea */}
                    <div className="px-3 pb-3 pt-2 bg-white">
                      <textarea
                        value={s.description}
                        onChange={(e) => updateSection(s.id, { description: e.target.value })}
                        placeholder="Describe what AI should generate for this section..."
                        rows={2}
                        className="w-full px-2.5 py-2 border border-[#e5e5e2] rounded-[6px] bg-white font-['Jua',sans-serif] text-[11px] text-[#555] placeholder:text-[#b0b0b0] outline-none focus:border-[#6b3c72] resize-none leading-relaxed transition-colors"
                      />
                    </div>
                  </div>
                ))}

                {sections.length === 0 && (
                  <button
                    onClick={addSection}
                    className="w-full py-5 border-2 border-dashed border-[#e5e5e2] rounded-[8px] flex flex-col items-center gap-2 hover:border-[#6b3c72] hover:bg-[#fdfaff] transition-colors group"
                  >
                    <Plus className="w-5 h-5 text-[#c0c0c0] group-hover:text-[#6b3c72] transition-colors" />
                    <span className="font-['Jua',sans-serif] text-[12px] text-[#b0b0b0] group-hover:text-[#6b3c72] transition-colors">Add your first section</span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Right: live preview */}
          <div className="w-[280px] shrink-0 flex flex-col overflow-hidden bg-[#fafaf9]">
            <div className="px-4 py-3 border-b border-[#e5e5e2] bg-white shrink-0">
              <p className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.8px] text-[#9a9a9a]">Preview</p>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <PreviewPane name={name} sections={sections} />
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#e5e5e2] bg-white shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 font-['Jua',sans-serif] text-[13px] text-[#555] hover:text-[#1a1a1a] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="px-5 py-2.5 bg-[#6b3c72] hover:bg-[#5c2375] disabled:bg-[#c0c0c0] disabled:cursor-not-allowed text-white rounded-lg font-['Jua',sans-serif] text-[13px] transition-colors"
          >
            Save template
          </button>
        </div>
      </div>
    </div>
  );
}
