import React, { useState } from 'react';
import { Search, ChevronDown, BarChart2, MessageSquare, FileText, Map, LayoutTemplate, Plus, ExternalLink } from 'lucide-react';
import TemplateGalleryPanel from './TemplateGalleryPanel';
import DocumentViewer, { type DocKey } from './DocumentViewer';

// Map a document's type to the worked example the viewer opens on. Types
// without a bespoke example fall back to the Audience Strategy doc.
const DOC_TYPE_TO_KEY: Record<string, DocKey> = {
  'Audience Strategy': 'strategy',
  'Messaging Matrix': 'matrix',
  'Campaign Brief': 'brief',
};

const TAG_PALETTES: Record<string, { bg: string; text: string }> = {
  'Affluent Professionals':    { bg: '#e8f4ec', text: '#1e7a42' },
  'Tech-savvy Families':       { bg: '#eaf0fb', text: '#2455a0' },
  'Expat Executives':          { bg: '#fef3e2', text: '#995500' },
  'Urban Upgrade Drivers':     { bg: '#f1e9ff', text: '#6b3c72' },
  'Weekend Lifestyle Drivers': { bg: '#e8f4ec', text: '#1e7a42' },
  'Premium Sedan Intenders':   { bg: '#eaf0fb', text: '#2455a0' },
  'EV Early Adopters':         { bg: '#e8f8f4', text: '#1a7a5e' },
  'EV Upgrade Shoppers':       { bg: '#e8f8f4', text: '#1a7a5e' },
  'Green Commuters':           { bg: '#e8f4ec', text: '#1e7a42' },
};

interface DocRow {
  id: string;
  name: string;
  tags: string[];
  type: string;
  timestamp: string;
}

interface DocGroup {
  type: string;
  icon: React.ReactNode;
  docs: DocRow[];
}

const DOC_GROUPS: DocGroup[] = [
  {
    type: 'Audience Strategy',
    icon: <BarChart2 className="w-3.5 h-3.5" />,
    docs: [
      { id: 'd1', name: 'Meridian Motors Singapore — Audience Strategy',  tags: ['Affluent Professionals', 'Tech-savvy Families', 'Expat Executives'], type: 'Audience Strategy', timestamp: 'Today, 10:18 pm' },
      { id: 'd2', name: 'Urban Upgrade Drivers — Audience Deep Dive',     tags: ['Urban Upgrade Drivers', 'Weekend Lifestyle Drivers'],                type: 'Audience Strategy', timestamp: '3 days ago' },
      { id: 'd3', name: 'Premium Sedan Intenders — Profile Report',        tags: ['Premium Sedan Intenders', 'EV Early Adopters'],                      type: 'Audience Strategy', timestamp: '5 days ago' },
    ],
  },
  {
    type: 'Messaging Matrix',
    icon: <MessageSquare className="w-3.5 h-3.5" />,
    docs: [
      { id: 'd4', name: 'Meridian Motors — Launch Messaging Matrix',      tags: ['Affluent Professionals', 'Expat Executives'],                        type: 'Messaging Matrix', timestamp: 'Today, 10:22 pm' },
      { id: 'd5', name: 'EV Upgrade Shoppers — Messaging Guide',          tags: ['EV Upgrade Shoppers', 'Green Commuters'],                            type: 'Messaging Matrix', timestamp: '2 days ago' },
    ],
  },
  {
    type: 'Campaign Brief',
    icon: <FileText className="w-3.5 h-3.5" />,
    docs: [
      { id: 'd6', name: 'Meridian Motors Q1 — Campaign Brief',            tags: ['Affluent Professionals', 'Tech-savvy Families', 'Expat Executives'], type: 'Campaign Brief',   timestamp: '2 days ago' },
    ],
  },
  {
    type: 'Media Plan',
    icon: <Map className="w-3.5 h-3.5" />,
    docs: [
      { id: 'd7', name: 'Singapore Premium Auto — Q1 Media Plan',         tags: ['Affluent Professionals', 'Expat Executives'],                        type: 'Media Plan',       timestamp: 'Today, 10:24 pm' },
    ],
  },
];

export default function DocumentsPanel() {
  const [search, setSearch] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<DocKey | null>(null);

  if (showTemplates) {
    return <TemplateGalleryPanel onBack={() => setShowTemplates(false)} />;
  }

  if (viewingDoc) {
    return <DocumentViewer initialDoc={viewingDoc} onBack={() => setViewingDoc(null)} />;
  }

  const filtered = search.trim()
    ? DOC_GROUPS.map((g) => ({
        ...g,
        docs: g.docs.filter((d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
        ),
      })).filter((g) => g.docs.length > 0)
    : DOC_GROUPS;

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#fafaf9]">
      {/* Header */}
      <div className="flex-none flex items-center justify-between px-8 pt-7 pb-5">
        <h1 className="font-['Jua',sans-serif] text-[22px] text-[#1a1a1a] font-normal leading-none">Documents</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTemplates(true)}
            className="flex items-center gap-2 px-4 py-2 border border-[#e5e5e2] rounded-lg bg-white font-['Jua',sans-serif] text-[13px] text-[#444] hover:bg-[#f5f5f3] transition-colors"
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-[#6b3c72]" />
            Templates
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#6b3c72] hover:bg-[#5c2375] text-white rounded-lg font-['Jua',sans-serif] text-[13px] transition-colors">
            <Plus className="w-3.5 h-3.5" />
            New document
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-none flex items-center gap-3 px-8 pb-5">
        <div className="relative w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9a9a9a]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-3 py-2 border border-[#e5e5e2] rounded-lg bg-white font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] placeholder:text-[#b0b0b0] outline-none focus:border-[#6b3c72] transition-colors"
          />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 border border-[#e5e5e2] rounded-lg bg-white font-['Jua',sans-serif] text-[12px] text-[#555] hover:bg-[#f5f5f3] transition-colors whitespace-nowrap">
          Group by: Type <ChevronDown className="w-3 h-3" />
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 border border-[#e5e5e2] rounded-lg bg-white font-['Jua',sans-serif] text-[12px] text-[#555] hover:bg-[#f5f5f3] transition-colors whitespace-nowrap">
          Sort: Recent <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="bg-white rounded-xl border border-[#e5e5e2] overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#e5e5e2]">
                <th className="text-left py-3 pl-6 pr-4 font-['Jua',sans-serif] text-[10px] uppercase tracking-widest text-[#9a9a9a] font-normal w-auto">Name</th>
                <th className="text-left py-3 px-4 font-['Jua',sans-serif] text-[10px] uppercase tracking-widest text-[#9a9a9a] font-normal w-[180px]">Type</th>
                <th className="text-left py-3 px-4 font-['Jua',sans-serif] text-[10px] uppercase tracking-widest text-[#9a9a9a] font-normal w-[140px]">Created</th>
                <th className="w-[80px]" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-16 text-center">
                    <p className="font-['Jua',sans-serif] text-[14px] text-[#b0b0b0]">No documents match your search.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((group) => (
                  <React.Fragment key={group.type}>
                    {/* Group header */}
                    <tr className="bg-[#fafaf9] border-b border-[#eeecea]">
                      <td colSpan={4} className="py-2.5 pl-6 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[#9a9a9a]">{group.icon}</span>
                          <span className="font-['Jua',sans-serif] text-[13px] text-[#1a1a1a]">{group.type}</span>
                          <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#f1e9ff] text-[#6b3c72] rounded-full font-['Jua',sans-serif] text-[11px]">
                            {group.docs.length}
                          </span>
                        </div>
                      </td>
                    </tr>
                    {/* Doc rows */}
                    {group.docs.map((doc) => (
                      <tr key={doc.id} className="border-b border-[#f0f0ee] hover:bg-[#fafaf8] transition-colors group/row">
                        <td className="py-3 pl-10 pr-4">
                          <div className="flex items-start gap-3">
                            <div className="w-[30px] h-[30px] bg-[#f1e9ff] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                              <FileText className="w-3.5 h-3.5 text-[#6b3c72]" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] leading-tight mb-1.5">{doc.name}</p>
                              <div className="flex flex-wrap gap-1">
                                {doc.tags.map((tag) => {
                                  const p = TAG_PALETTES[tag] ?? { bg: '#f3f3f1', text: '#555' };
                                  return (
                                    <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded font-['Jua',sans-serif] text-[11px] whitespace-nowrap" style={{ background: p.bg, color: p.text }}>
                                      + {tag}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-1 bg-[#f3f3f1] text-[#555] rounded-[6px] font-['Jua',sans-serif] text-[11px] whitespace-nowrap">
                            {doc.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-['Jua',sans-serif] text-[12px] text-[#9a9a9a]">{doc.timestamp}</span>
                        </td>
                        <td className="py-3 pl-4 pr-6">
                          <button
                            onClick={() => setViewingDoc(DOC_TYPE_TO_KEY[doc.type] ?? 'strategy')}
                            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e5e5e2] rounded-lg font-['Jua',sans-serif] text-[12px] text-[#444] hover:border-[#6b3c72] hover:text-[#6b3c72] transition-colors opacity-0 group-hover/row:opacity-100"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
