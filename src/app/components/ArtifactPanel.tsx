import React, { useState, useRef } from 'react';
import { ChevronDown, Check, Sparkles, Plus, PaintBucket, FileText, Database, GripVertical, Edit2, MoreVertical, Lightbulb, Download, Users, Bookmark, X, ArrowUp, Wand2 } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { Screen } from '../App';
import type { AudienceId } from '../audienceData';
import CustomizationPopover, { type StyleConfig } from './CustomizationPopover';
import PostcodeEditModal from './PostcodeEditModal';
import HeatmapView from './HeatmapView';
import AudienceDetailPanel from './AudienceDetailPanel';
import DataExplorerPanel from './DataExplorerPanel';

const ItemType = 'BLOCK';

// ────────────────────────────────────────────────────────────────
// Doc editing: scope a block into Ask Lumos → preview a proposed
// change inline → Accept / Discard. Shared across every block via
// context so the DraggableWrapper owns the whole flow in one place.
// ────────────────────────────────────────────────────────────────
interface Proposal {
  loading: boolean;
  before?: string;
  after?: string;
  summary?: string;
  note?: string;
}

interface BlockEditApi {
  askOpenId: string | null;
  openAsk: (id: string) => void;
  closeAsk: () => void;
  proposals: Record<string, Proposal>;
  heroNotes: Record<string, string>;
  submitAsk: (id: string, instruction: string, before: string) => void;
  acceptProposal: (id: string) => void;
  discardProposal: (id: string) => void;
  clearHero: (id: string) => void;
  duplicateBlock: (id: string) => void;
  deleteBlock: (id: string) => void;
}

const BlockEditContext = React.createContext<BlockEditApi | null>(null);

// Canned-but-intent-aware rewrite (mirrors the doc-editing wireframe).
function proposeRewrite(prompt: string, before: string): { after: string; summary: string; note: string } {
  const p = (prompt || '').toLowerCase();
  if (/short|concise|tighten|punch|snappy|brief|trim/.test(p))
    return {
      after: 'Three clusters own 71% of big-basket value — and they’re only in-corridor a few hours a week. Concentration is the whole opportunity.',
      summary: 'shortened to one punchy line',
      note: 'Tightened to a single sentence and led with the headline stat.',
    };
  if (/number|stat|data|quantif|metric|figure/.test(p))
    return {
      after: 'Just three clusters hold 71% of big-basket value (566K households, ▲9% QoQ), passing 3 media corridors for ~6 hours a week — a $4.9B addressable window.',
      summary: 'added quantification',
      note: 'Folded in the household count, growth and spend figures.',
    };
  if (/formal|exec|profession|stakeholder/.test(p))
    return {
      after: 'Big-basket demand is highly concentrated: three clusters account for 71% of value, consistently present in three key corridors during a narrow weekly window — a targetable efficiency the launch should exploit.',
      summary: 'more formal tone',
      note: 'Rewrote in a more executive register.',
    };
  if (/warm|human|friendly|approachable/.test(p))
    return {
      after: 'Here’s the good news: most of the households Costco wants are already driving past the same few places each week. Meet them there and the launch does the heavy lifting for you.',
      summary: 'warmer, more human tone',
      note: 'Softened the register while keeping the core insight.',
    };
  return {
    after: `${before.replace(/\s+$/, '')} And crucially, this is reachable — predictable corridors during a narrow weekly window make timing and place the real unlock.`,
    summary: 'sharper emphasis on reachability',
    note: 'Kept your facts and sharpened the “why it matters”.',
  };
}

interface ArtifactPanelProps {
  screen: Screen;
  setOnAddTextBlock: (fn: ((title: string, content: string) => void) | null) => void;
  isGeneratingBlock: boolean;
  entryMode: 'brief' | 'upload' | null;
  isAnalysisComplete: boolean;
  selectedAudienceId: AudienceId | null;
  onOpenFullPage?: (id: AudienceId, name: string) => void;
  savedAudienceIds?: AudienceId[];
  onSaveAudience?: (id: AudienceId) => void;
  onSaveDocument?: (doc: { name: string; type: string; tags: string[] }) => void;
  savedDocumentNames?: string[];
}

export default function ArtifactPanel({
  screen,
  setOnAddTextBlock,
  isGeneratingBlock,
  entryMode,
  isAnalysisComplete,
  selectedAudienceId,
  onOpenFullPage,
  savedAudienceIds = [],
  onSaveAudience,
  onSaveDocument,
  savedDocumentNames = [],
}: ArtifactPanelProps) {
  const [previewMode, setPreviewMode] = useState<'preview' | 'data'>('preview');

  if (screen === 'blank' || screen === 'planning' || screen === 'clarifying' || screen === 'insights') {
    return null;
  }

  if (screen === 'profiles') {
    if (!selectedAudienceId) return null;
    return (
      <div className="w-[420px] bg-white border-l border-[#d3d3d0] flex flex-col min-h-0 overflow-y-auto">
        <AudienceDetailPanel audienceId={selectedAudienceId} screen={screen} onOpenFullPage={onOpenFullPage} isSaved={savedAudienceIds.includes(selectedAudienceId)} onSave={onSaveAudience} />
      </div>
    );
  }

  if (screen === 'deep-dive') {
    if (!selectedAudienceId) {
      return (
        <div className="w-[420px] bg-white border-l border-[#d3d3d0] flex flex-col items-center justify-center gap-4 text-center p-10">
          <div className="w-14 h-14 rounded-full bg-[#f5eeff] flex items-center justify-center">
            <Users className="w-7 h-7 text-[#732d93]" />
          </div>
          <div>
            <p className="font-['Jua',sans-serif] text-[15px] text-[#1a1a1a] mb-1">Select an audience</p>
            <p className="font-['Jua',sans-serif] text-[13px] text-[#888] leading-relaxed">Click on an audience card to explore the full profile and insights.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="w-[420px] bg-white border-l border-[#d3d3d0] flex flex-col min-h-0 overflow-y-auto">
        <AudienceDetailPanel audienceId={selectedAudienceId} screen={screen} onOpenFullPage={onOpenFullPage} isSaved={savedAudienceIds.includes(selectedAudienceId)} onSave={onSaveAudience} />
      </div>
    );
  }

  if (screen === 'result') {
    return (
      <div className="flex-1 bg-white border-l border-[#d3d3d0] flex flex-col min-h-0">
        {!isAnalysisComplete ? (
          <AnalysisLoadingState entryMode={entryMode} />
        ) : (
          <ResultPanel
            previewMode={previewMode}
            setPreviewMode={setPreviewMode}
            setOnAddTextBlock={setOnAddTextBlock}
            isGeneratingBlock={isGeneratingBlock}
            entryMode={entryMode}
            screen={screen}
            selectedAudienceId={selectedAudienceId}
            onSaveDocument={onSaveDocument}
            savedDocumentNames={savedDocumentNames}
          />
        )}
      </div>
    );
  }

  return null;
}

export function PickerCard({
  activeTab,
  setActiveTab,
  onSelect,
}: {
  activeTab: 'cards' | 'comparison' | 'map';
  setActiveTab: (tab: 'cards' | 'comparison' | 'map') => void;
  onSelect: (layout: 'cards' | 'comparison' | 'map') => void;
}) {
  const tabs = [
    {
      id: 'cards' as const,
      label: 'A · AUDIENCE CARDS',
      title: 'Three segment cards',
      description: 'Marsden Park Stock-Ups, Parramatta Value Families, and Castle Hill Bulk Buyers as distinct clusters — basket size, shopping frequency, and travel behaviour.',
      bestWhen: 'Best when the segments are genuinely different in behaviour. Reads as a slide.',
      reasoning: 'Your brief calls out distinct shopper types — cards make each cluster feel like a separate persona with clear frequency and basket-size differentiation.',
    },
    {
      id: 'comparison' as const,
      label: 'B · COMPARISON',
      title: 'Ranked comparison bars',
      description: 'Clusters ranked by reach with index scores and seasonal uplift signals side-by-side.',
      bestWhen: 'Best when you need to prioritize which clusters to activate first.',
      reasoning: 'Since this is a store launch, you need to prioritise — a ranked view shows which clusters deliver the highest value impact and fastest opening-week uplift.',
    },
    {
      id: 'map' as const,
      label: 'C · GEO MAP',
      title: 'Top metro area heatmap',
      description: 'Greater Sydney regions shaded by big-basket household concentration with SA2-level detail.',
      bestWhen: 'Best when you are planning catchment activations, drive-to-store campaigns, or OOH placement.',
      reasoning: 'Store launches live or die on catchment — this shows exactly where high-value big-basket households concentrate across Greater Sydney.',
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const currentIndex = tabs.findIndex((t) => t.id === activeTab);

  return (
    <div className="bg-white border border-[#d0d0d0] rounded-lg shadow-lg w-full p-8">
      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 font-['Geist',sans-serif] text-[12px] font-semibold tracking-wide transition-colors ${
              activeTab === tab.id
                ? 'text-[#7c6bf0] border-b-2 border-[#7c6bf0]'
                : 'text-[#999] hover:text-[#666]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mb-6">
        <h3 className="font-['Geist',sans-serif] font-semibold text-[18px] text-black mb-2">
          {currentTab.title}
        </h3>
        <p className="font-['Geist',sans-serif] text-[14px] text-[#666] mb-3">
          {currentTab.description}
        </p>
        <div className="bg-[#f0f0f0] rounded-md px-3 py-2 mb-6">
          <p className="font-['Geist',sans-serif] text-[12px] text-[#555] italic leading-relaxed">
            <span className="font-semibold text-[#7c6bf0]">Why this layout:</span> {currentTab.reasoning}
          </p>
        </div>

        {/* Sketch Preview */}
        <div className="bg-[#f8f8f8] rounded-lg p-8 mb-4">
          <div className="text-[11px] font-['Geist',sans-serif] text-[#999] uppercase tracking-wide mb-4">
            Sketch Preview
          </div>
          {activeTab === 'cards' && <SketchCards />}
          {activeTab === 'comparison' && <SketchComparison />}
          {activeTab === 'map' && <SketchMap />}
        </div>

        <p className="font-['Geist',sans-serif] text-[13px] text-[#888] italic">
          {currentTab.bestWhen}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end pt-4 border-t border-gray-200">
        <button
          onClick={() => onSelect(activeTab)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#7c6bf0] text-white rounded-md font-['Geist',sans-serif] text-[14px] font-medium hover:bg-[#6a5adf] transition-colors"
        >
          <Check className="w-4 h-4" />
          Use this option
        </button>
      </div>
    </div>
  );
}

function SketchCards() {
  const audiences = [
    { name: 'Marsden Park Stock-Ups', age: '30-45', income: '$145k+ HHI', reach: '29%' },
    { name: 'Parramatta Value Families', age: '28-48', income: '$105k+ HHI', reach: '38%' },
    { name: 'Castle Hill Bulk Buyers', age: '35-55', income: '$185k+ HHI', reach: '21%' }
  ];

  return (
    <div className="space-y-4">
      <div className="h-2 rounded w-32 bg-gray-300 mb-3" />
      <div className="grid grid-cols-3 gap-3">
        {audiences.map((audience, i) => (
          <div key={i} className="bg-white border border-gray-300 rounded p-3 space-y-1.5">
            <div className="bg-[#7c6bf0] bg-opacity-20 rounded px-2 py-1">
              <div className="h-2 rounded w-full bg-[#7c6bf0] bg-opacity-40" />
            </div>
            <div className="space-y-1">
              <div className="h-1.5 rounded w-2/3 bg-gray-300" />
              <div className="h-1.5 rounded w-1/2 bg-gray-300" />
              <div className="h-1.5 rounded w-3/4 bg-gray-300" />
            </div>
            <div className="pt-1 border-t border-gray-200">
              <div className="h-2.5 rounded w-1/3 bg-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SketchComparison() {
  const audiences = [
    { name: 'Marsden Park Stock-Ups', reach: 29, index: 264, growth: '+22%' },
    { name: 'Parramatta Value Families', reach: 38, index: 218, growth: '+18%' },
    { name: 'Castle Hill Bulk Buyers', reach: 21, index: 186, growth: '+31%' }
  ];

  return (
    <div className="space-y-3">
      <div className="h-2 rounded w-28 bg-gray-300 mb-3" />
      <div className="space-y-2.5">
        {audiences.map((aud, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-16 h-1.5 rounded bg-gray-300" />
            <div className="flex-1 flex items-center gap-2">
              <div
                className="h-5 rounded bg-[#7c6bf0] bg-opacity-70 flex items-center justify-end pr-1.5"
                style={{ width: `${(aud.reach / 35) * 100}%` }}
              >
                <div className="h-1 w-4 rounded bg-white" />
              </div>
            </div>
            <div className="w-10 h-1.5 rounded bg-gray-300" />
            <div className="w-10 h-1.5 rounded bg-green-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SketchMap() {
  return (
    <div className="space-y-4">
      <div className="h-2 rounded w-36 bg-gray-300 mb-3" />
      <div className="relative h-64 bg-gray-100 rounded border border-gray-300 overflow-hidden">
        {/* Rough Greater Sydney shape */}
        <svg viewBox="0 0 300 180" className="w-full h-full">
          {/* Western Sydney (darker - Stock-Ups & Value Families) */}
          <ellipse cx="150" cy="90" rx="35" ry="25" fill="#7c6bf0" opacity="0.7" />
          {/* Hills District (medium - Bulk Buyers) */}
          <ellipse cx="190" cy="70" rx="30" ry="20" fill="#7c6bf0" opacity="0.4" />
          {/* Outer west (lighter - mixed) */}
          <ellipse cx="100" cy="100" rx="28" ry="22" fill="#7c6bf0" opacity="0.25" />
          {/* North-West growth corridor */}
          <ellipse cx="120" cy="60" rx="20" ry="15" fill="#7c6bf0" opacity="0.3" />
          {/* Legend boxes */}
        </svg>
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 rounded px-2 py-1.5 space-y-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#7c6bf0] opacity-70" />
            <span className="text-[8px] text-gray-700">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#7c6bf0] opacity-40" />
            <span className="text-[8px] text-gray-700">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#7c6bf0] opacity-20" />
            <span className="text-[8px] text-gray-700">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BlockData {
  id: string;
  type: 'insight' | 'narrative' | 'audiences' | 'growth' | 'geo-map' | 'postcodes' | 'text' | 'messaging' | 'campaign-recs';
  title?: string;
  content?: string;
}

function ResultPanel({
  previewMode,
  setPreviewMode,
  setOnAddTextBlock,
  isGeneratingBlock,
  entryMode,
  screen,
  selectedAudienceId,
  onSaveDocument,
  savedDocumentNames = [],
}: {
  previewMode: 'preview' | 'data';
  setPreviewMode: (mode: 'preview' | 'data') => void;
  setOnAddTextBlock: (fn: ((title: string, content: string) => void) | null) => void;
  isGeneratingBlock: boolean;
  entryMode: 'brief' | 'upload' | null;
  screen: Screen;
  selectedAudienceId: AudienceId | null;
  onSaveDocument?: (doc: { name: string; type: string; tags: string[] }) => void;
  savedDocumentNames?: string[];
}) {
  const [pageTitle, setPageTitle] = useState('Costco Western Sydney Launch — Audiences');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const isDocSaved = savedDocumentNames.includes(pageTitle);
  const [blocks, setBlocks] = useState<BlockData[]>([
    { id: 'insight-1', type: 'insight' },
    { id: 'map-1', type: 'geo-map', title: 'GEOGRAPHIC CONCENTRATION' },
    { id: 'narrative-1', type: 'narrative' },
    { id: 'audiences-1', type: 'audiences', title: 'TOP 3 AUDIENCES BY REACH' },
    { id: 'growth-1', type: 'growth', title: 'GROWTH AUDIENCES' },
    { id: 'postcodes-1', type: 'postcodes', title: 'TOP DISTRICTS' },
    { id: 'campaign-recs-1', type: 'campaign-recs', title: 'CAMPAIGN RECOMMENDATIONS' },
  ]);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [styleConfig, setStyleConfig] = useState<StyleConfig>({
    brandColor: '#7c6bf0',
    headingFont: 'Jua',
    bodyFont: 'Inter',
    bodySize: 13.5,
    chartPalette: 'sequential',
  });
  const [isPostcodeEditOpen, setIsPostcodeEditOpen] = useState(false);
  const [postcodeView, setPostcodeView] = useState<'ranking' | 'heatmap'>('ranking');

  // ── Block editing (scoped Ask → proposal → Accept/Discard) ──
  const [askOpenId, setAskOpenId] = useState<string | null>(null);
  const [proposals, setProposals] = useState<Record<string, Proposal>>({});
  const [heroNotes, setHeroNotes] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast((t) => (t === msg ? null : t)), 1800);
  };

  const blockEditApi: BlockEditApi = {
    askOpenId,
    openAsk: (id) => {
      setAskOpenId(id);
      setProposals((p) => {
        if (!p[id]) return p;
        const next = { ...p };
        delete next[id];
        return next;
      });
    },
    closeAsk: () => setAskOpenId(null),
    proposals,
    heroNotes,
    submitAsk: (id, instruction, before) => {
      setAskOpenId(null);
      setProposals((p) => ({ ...p, [id]: { loading: true } }));
      window.setTimeout(() => {
        const { after, summary, note } = proposeRewrite(instruction, before);
        setProposals((p) => ({ ...p, [id]: { loading: false, before, after, summary, note } }));
      }, 1200);
    },
    acceptProposal: (id) => {
      setProposals((p) => {
        const prop = p[id];
        if (prop?.after) setHeroNotes((h) => ({ ...h, [id]: prop.after! }));
        const next = { ...p };
        delete next[id];
        return next;
      });
      showToast('Change applied');
    },
    discardProposal: (id) => {
      setProposals((p) => {
        const next = { ...p };
        delete next[id];
        return next;
      });
      showToast('Change discarded');
    },
    clearHero: (id) => {
      setHeroNotes((h) => {
        const next = { ...h };
        delete next[id];
        return next;
      });
      showToast('Note removed');
    },
    duplicateBlock: (id) => {
      setBlocks((bs) => {
        const i = bs.findIndex((b) => b.id === id);
        if (i === -1) return bs;
        const copy: BlockData = { ...bs[i], id: `${bs[i].type}-${Date.now()}` };
        const next = [...bs];
        next.splice(i + 1, 0, copy);
        return next;
      });
      showToast('Block duplicated');
    },
    deleteBlock: (id) => {
      setBlocks((bs) => bs.filter((b) => b.id !== id));
      setProposals((p) => {
        const next = { ...p };
        delete next[id];
        return next;
      });
      showToast('Block deleted');
    },
  };

  const moveBlock = (dragIndex: number, hoverIndex: number) => {
    const newBlocks = [...blocks];
    const [removed] = newBlocks.splice(dragIndex, 1);
    newBlocks.splice(hoverIndex, 0, removed);
    setBlocks(newBlocks);
  };

  const addTextBlock = (title: string, content: string) => {
    // If this is the messaging block, create a messaging type instead
    const isMessagingBlock = title === 'Campaign recommendations';
    const newBlock: BlockData = {
      id: `${isMessagingBlock ? 'messaging' : 'text'}-${Date.now()}`,
      type: isMessagingBlock ? 'messaging' : 'text',
      title: isMessagingBlock ? 'Campaign recommendations by segment' : title,
      content,
    };
    setBlocks([...blocks, newBlock]);
  };

  // Expose addTextBlock to parent
  React.useEffect(() => {
    setOnAddTextBlock(() => addTextBlock);
  }, [setOnAddTextBlock]);

  // Seed takeaway each data block's Ask edit starts from.
  const HERO_SEED: Record<BlockData['type'], string> = {
    insight: '',
    text: '',
    'geo-map': 'Three corridors — the North-West growth belt, Parramatta and the Hills — hold the large majority of qualified reach, so a tightly geo-fenced launch beats metro-wide spend.',
    audiences: 'These three clusters carry the bulk of big-basket value; lead with Marsden Park Stock-Ups for launch impact.',
    growth: 'Too small to lead with, but the fastest climbers — worth seeding now ahead of the opening-week surge.',
    postcodes: 'Six SA2s index well above baseline, with Marsden Park / Riverstone the clear anchor for OOH-to-store seeding.',
    'campaign-recs': 'Sequence the launch by cluster: a broad-reach hero for the North-West, always-on unit-price messaging in Parramatta, and a switching play in the Hills.',
    messaging: 'Each cluster needs its own value prop and hook — one message won’t carry all three.',
    narrative: 'These three clusters aren’t just the biggest — they’re the most reachable, which is what makes them the right place to start.',
  };

  return (
    <BlockEditContext.Provider value={blockEditApi}>
    <DndProvider backend={HTML5Backend}>
    <div className="flex flex-col h-full">
      {/* Header Row */}
      <div className="bg-white border-b border-[#e5e5e2] px-5 py-3.5 flex items-center justify-between relative">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPreviewMode('preview')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-['Jua',sans-serif] text-[12px] transition-colors ${
              previewMode === 'preview'
                ? 'bg-[#f1e9ff] text-[#6b3c72]'
                : 'bg-transparent text-[#6b6b6b] hover:bg-gray-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Preview
          </button>
          <button
            onClick={() => setPreviewMode('data')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-['Jua',sans-serif] text-[12px] transition-colors ${
              previewMode === 'data'
                ? 'bg-[#f1e9ff] text-[#6b3c72]'
                : 'bg-transparent text-[#6b6b6b] hover:bg-gray-50'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Data Explorer
          </button>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#e5e5e2] rounded-lg font-['Jua',sans-serif] text-[12px] text-[#6b6b6b] hover:bg-gray-50 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Add block
          </button>
          <button
            onClick={() =>
              onSaveDocument?.({
                name: pageTitle,
                type: 'Audience Strategy',
                tags: ['Marsden Park Stock-Ups', 'Parramatta Value Families', 'Castle Hill Bulk Buyers'],
              })
            }
            disabled={isDocSaved}
            title={isDocSaved ? 'Saved to your Documents' : 'Save to your Documents'}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-['Jua',sans-serif] text-[12px] transition-colors ${
              isDocSaved
                ? 'border border-[#1D9E75] bg-[#1D9E75] text-white'
                : 'border border-[#6b3c72] text-[#6b3c72] hover:bg-[#f5f0ff]'
            }`}
          >
            {isDocSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            {isDocSaved ? 'Saved to Documents' : 'Save to Documents'}
          </button>
          <div className="relative">
            <button
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="flex items-center justify-center w-[34px] h-[34px] bg-[#efe6ff] rounded-2xl hover:bg-[#e5dcff] transition-colors"
            >
              <Download className="w-4 h-4 text-[#732D93]" />
            </button>
            {isExportMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsExportMenuOpen(false)}
                />
                <div className="absolute right-0 top-[42px] z-20 w-48 bg-white border border-[#e5e5e2] rounded-lg shadow-lg py-1">
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PDF
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PNG
                  </button>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setIsCustomizationOpen(!isCustomizationOpen)}
            className="flex items-center justify-center w-[34px] h-[34px] bg-[#efe6ff] rounded-2xl hover:bg-[#e5dcff] transition-colors"
          >
            <PaintBucket className="w-4 h-4 text-[#732D93]" />
          </button>
        </div>

        {/* Customization Popover */}
        <CustomizationPopover
          isOpen={isCustomizationOpen}
          onClose={() => setIsCustomizationOpen(false)}
          onStyleChange={setStyleConfig}
        />
      </div>

      {/* Content Area */}
      {previewMode === 'data' ? (
        <div className="flex-1 overflow-hidden bg-white">
          <DataExplorerPanel
            screen={screen}
            selectedAudienceId={selectedAudienceId}
          />
        </div>
      ) : null}
      <div className={`flex-1 overflow-y-auto bg-white px-10 py-6 ${previewMode === 'data' ? 'hidden' : ''}`}>

      {/* Document Header */}
      <div className="mb-8">
        {isEditingTitle ? (
          <input
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsEditingTitle(false);
              }
            }}
            autoFocus
            style={{
              fontFamily: `'${styleConfig.headingFont}',sans-serif`,
              borderColor: styleConfig.brandColor,
            }}
            className="text-[24px] text-[#1a1a1a] w-full outline-none border-b-2 bg-transparent font-bold"
          />
        ) : (
          <h1
            onClick={() => setIsEditingTitle(true)}
            style={{ fontFamily: `'${styleConfig.headingFont}',sans-serif` }}
            className="text-[24px] text-[#1a1a1a] font-bold cursor-text hover:bg-gray-50 px-1 -mx-1 rounded transition-colors mb-2"
          >
            {pageTitle}
          </h1>
        )}
        <p
          style={{
            fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
            fontSize: `${Math.max(12, styleConfig.bodySize - 1)}px`,
          }}
          className="text-[#888] leading-relaxed"
        >
          An AI-generated audience analysis and campaign recommendation for the Costco Western Sydney launch. For internal planning use only.
        </p>
      </div>

      {/* Draggable Blocks */}
      {blocks.map((block, index) => {
        if (block.type === 'insight') {
          const summaryText = entryMode === 'upload'
            ? "Your member segments reveal distinct shopping and lapsing patterns. Active Members offer the highest immediate value through frequency and basket-growth mechanics. Lapsed Members show the strongest re-engagement opportunity now that the new warehouse is closer than the one they left. Prioritise Active Members for opening-week velocity, win back Lapsed Members with a proximity-led offer, and convert Never-Redeemed Sign-Ups with a concrete first-trip prompt."
            : "Costco's Western Sydney launch opportunity sits across three household clusters with distinct shopping rhythms and travel behaviours. Lead with Marsden Park Stock-Ups for launch impact, activate Parramatta Value Families for breadth of reach, and target Castle Hill Bulk Buyers to take share of wallet from existing warehouse clubs.";

          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock} blockLabel="AI Summary" defaultHero={summaryText} heroInline>
              <AISummaryBlock
                text={heroNotes[block.id] ?? summaryText}
                styleConfig={styleConfig}
              />
            </DraggableWrapper>
          );
        }
        if (block.type === 'audiences') {
          const audienceData = entryMode === 'upload'
            ? [
                { number: 1, name: 'Active Members', reach: '48%', demographics: '30–55 | $120k+ | 2+ shops/month', growth: 'Stable' },
                { number: 2, name: 'Lapsed Members', reach: '28%', demographics: '25–50 | $95k+ | no shop in 90 days', growth: '+19% re-eng.' },
                { number: 3, name: 'Never-Redeemed Sign-Ups', reach: '24%', demographics: '22–45 | $85k+ | joined, never shopped', growth: '+36% YoY' },
              ]
            : [
                { number: 1, name: 'Marsden Park Stock-Ups', reach: '29%', demographics: '30–45 | $145k+ | Index 264', growth: '+22% YoY' },
                { number: 2, name: 'Parramatta Value Families', reach: '38%', demographics: '28–48 | $105k+ | Index 218', growth: '+18% YoY' },
                { number: 3, name: 'Castle Hill Bulk Buyers', reach: '21%', demographics: '35–55 | $185k+ | Index 186', growth: '+31% YoY' },
              ];

          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock} blockLabel={block.title} defaultHero={HERO_SEED[block.type]}>
              <DraggableBlock title={block.title!} styleConfig={styleConfig}>
                <div className="space-y-2.5">
                  {audienceData.map((audience) => (
                    <AudienceCard
                      key={audience.number}
                      number={audience.number}
                      name={audience.name}
                      reach={audience.reach}
                      demographics={audience.demographics}
                      growth={audience.growth}
                      styleConfig={styleConfig}
                      enriched={entryMode === 'upload'}
                    />
                  ))}
                </div>
              </DraggableBlock>
            </DraggableWrapper>
          );
        }
        if (block.type === 'narrative') {
          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock} blockLabel="Why these segments" defaultHero={HERO_SEED[block.type]}>
              <NarrativeBlock styleConfig={styleConfig} entryMode={entryMode} />
            </DraggableWrapper>
          );
        }
        if (block.type === 'growth') {
          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock} blockLabel={block.title} defaultHero={HERO_SEED[block.type]}>
              <GrowthAudiencesBlock title={block.title!} styleConfig={styleConfig} entryMode={entryMode} />
            </DraggableWrapper>
          );
        }
        if (block.type === 'geo-map') {
          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock} blockLabel={block.title} defaultHero={HERO_SEED[block.type]}>
              <GeoMapBlock title={block.title!} styleConfig={styleConfig} />
            </DraggableWrapper>
          );
        }
        if (block.type === 'postcodes') {
          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock} blockLabel={block.title} defaultHero={HERO_SEED[block.type]} onStructuredEdit={() => setIsPostcodeEditOpen(true)}>
              <DraggableBlock
                title={block.title!}
                styleConfig={styleConfig}
              >
                {postcodeView === 'ranking' ? (
                  <div className="space-y-3">
                    <PostcodeRow rank={1} area="Marsden Park / Riverstone" index={312} households={68000} styleConfig={styleConfig} />
                    <PostcodeRow rank={2} area="Schofields / Box Hill" index={287} households={54000} styleConfig={styleConfig} />
                    <PostcodeRow rank={3} area="Parramatta / Granville" index={264} households={91000} styleConfig={styleConfig} />
                    <PostcodeRow rank={4} area="Castle Hill / Kellyville" index={241} households={78000} styleConfig={styleConfig} />
                    <PostcodeRow rank={5} area="Merrylands / Auburn" index={228} households={103000} styleConfig={styleConfig} />
                    <PostcodeRow rank={6} area="Blacktown / Rooty Hill" index={209} households={87000} styleConfig={styleConfig} />
                  </div>
                ) : (
                  <HeatmapView styleConfig={styleConfig} />
                )}
              </DraggableBlock>
            </DraggableWrapper>
          );
        }
        if (block.type === 'campaign-recs') {
          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock} blockLabel={block.title} defaultHero={HERO_SEED[block.type]}>
              <CampaignRecommendationsBlock title={block.title!} styleConfig={styleConfig} entryMode={entryMode} />
            </DraggableWrapper>
          );
        }
        if (block.type === 'messaging') {
          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock} blockLabel={block.title} defaultHero={HERO_SEED[block.type]}>
              <MessagingBlock title={block.title!} styleConfig={styleConfig} entryMode={entryMode} />
            </DraggableWrapper>
          );
        }
        if (block.type === 'text') {
          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock} blockLabel={block.title} defaultHero={block.content} heroInline>
              <TextBlock title={block.title!} content={heroNotes[block.id] ?? block.content!} styleConfig={styleConfig} />
            </DraggableWrapper>
          );
        }
        return null;
      })}

      {/* Loading Placeholder */}
      {isGeneratingBlock && (
        <div className="relative rounded-xl pl-[38px] pr-2 py-3 mb-6 bg-white">
          <div className="bg-white rounded-xl p-4 border border-[#bebde7] animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
              <div className="h-3 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
        </div>
      )}

      {/* Legal Disclaimer */}
      <div className="mt-12 pt-6 border-t border-[#e5e5e2]">
        <p
          style={{
            fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
            fontSize: `${Math.max(10, styleConfig.bodySize - 3)}px`,
          }}
          className="text-[#999] text-center"
        >
          AI-generated analysis. Always verify outputs before use in client deliverables.
        </p>
      </div>
      </div>
    </div>
    </DndProvider>

    {/* Postcode Edit Modal */}
    <PostcodeEditModal
      isOpen={isPostcodeEditOpen}
      onClose={() => setIsPostcodeEditOpen(false)}
      currentView={postcodeView}
      onViewChange={setPostcodeView}
      styleConfig={styleConfig}
    />

    {/* Toast */}
    {toast && (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-[#1a1a1a] text-white rounded-full shadow-lg font-['Geist',sans-serif] text-[12.5px] flex items-center gap-2 animate-[fadeIn_.15s_ease]">
        <Check className="w-3.5 h-3.5 text-[#5bd39a]" />
        {toast}
      </div>
    )}
    </BlockEditContext.Provider>
  );
}

function AnalysisLoadingState({ entryMode }: { entryMode: 'brief' | 'upload' | null }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-white p-10">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#e5e5e5] border-t-[#7c6bf0] rounded-full animate-spin" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-['Jua',sans-serif] text-[18px] text-[#1a1a1a]">
            Running analysis...
          </h3>
          <p className="font-['Jua',sans-serif] text-[14px] text-[#666] leading-relaxed">
            {entryMode === 'upload'
              ? 'Enriching your member segments with transaction data, movement patterns, and geographic concentration...'
              : 'Identifying clusters, analysing catchment concentration, and pulling seasonal shopping signals...'}
          </p>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <div className="w-2 h-2 bg-[#7c6bf0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#7c6bf0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-[#7c6bf0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

interface DraggableWrapperProps {
  id: string;
  index: number;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
  /** Label shown in the Ask scope-chip (usually the section title). */
  blockLabel?: string;
  /** Text the proposal starts from — the block's body for prose, or a seed takeaway for data blocks. */
  defaultHero?: string;
  /** When true the accepted change is reflected in the block body itself (no separate callout). */
  heroInline?: boolean;
  /** Optional structured editor (e.g. postcode modal) surfaced as a pencil. */
  onStructuredEdit?: () => void;
}

function DraggableWrapper({ id, index, moveBlock, children, blockLabel, defaultHero = '', heroInline, onStructuredEdit }: DraggableWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const edit = React.useContext(BlockEditContext);
  const [moreOpen, setMoreOpen] = useState(false);
  const [askText, setAskText] = useState('');

  const askOpen = edit?.askOpenId === id;
  const proposal = edit?.proposals[id];
  const heroNote = edit?.heroNotes[id];
  const beforeText = heroNote ?? defaultHero;

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();
  const submit = () => {
    const t = askText.trim();
    if (!t || !edit) return;
    edit.submitAsk(id, t, beforeText);
    setAskText('');
  };

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    hover: (item: { id: string; index: number }, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveBlock(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  const isBusy = askOpen || !!proposal;

  return (
    <div
      ref={ref}
      className={`group relative transition-all ${isDragging ? 'opacity-40' : 'opacity-100'} ${
        isOver ? 'scale-[1.02]' : 'scale-100'
      } ${isBusy ? 'rounded-xl ring-1 ring-[#e7d9ee]' : ''}`}
    >
      {/* Centralized block toolbar (Ask · edit · more) */}
      <div
        onMouseDown={stop}
        className={`absolute right-3 top-3 z-30 flex items-center gap-1 transition-opacity ${
          askOpen || moreOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <button
          onClick={(e) => {
            stop(e);
            if (askOpen) edit?.closeAsk();
            else edit?.openAsk(id);
          }}
          className="flex items-center gap-1 h-[26px] pl-2 pr-2.5 bg-white border border-[#e3d3ea] text-[#6b3c72] rounded-md text-[11.5px] font-['Geist',sans-serif] hover:bg-[#faf5fc] shadow-sm transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Ask
        </button>
        {onStructuredEdit && (
          <button
            onClick={(e) => {
              stop(e);
              onStructuredEdit();
            }}
            title="Edit data"
            className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 shadow-sm transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5 text-[#6b6b6b]" />
          </button>
        )}
        <div className="relative">
          <button
            onClick={(e) => {
              stop(e);
              setMoreOpen((v) => !v);
            }}
            className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 shadow-sm transition-colors"
          >
            <MoreVertical className="w-3.5 h-3.5 text-[#6b6b6b]" />
          </button>
          {moreOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMoreOpen(false)} />
              <div className="absolute right-0 top-[30px] z-20 w-44 bg-white border border-[#e5e5e2] rounded-lg shadow-lg py-1">
                {[
                  { label: 'Export as PDF', fn: () => {} },
                  { label: 'Export as PNG', fn: () => {} },
                ].map((it) => (
                  <button
                    key={it.label}
                    onClick={() => setMoreOpen(false)}
                    className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors"
                  >
                    {it.label}
                  </button>
                ))}
                <div className="my-1 border-t border-[#e5e5e2]" />
                <button
                  onClick={() => {
                    setMoreOpen(false);
                    edit?.duplicateBlock(id);
                  }}
                  className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors"
                >
                  Duplicate
                </button>
                <button
                  onClick={() => {
                    setMoreOpen(false);
                    edit?.deleteBlock(id);
                  }}
                  className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#dc2626] hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {children}

      {/* Accepted takeaway note (data blocks — prose blocks reflect the change in-body) */}
      {!heroInline && heroNote && !proposal && (
        <div onMouseDown={stop} className="ml-[38px] mr-2 -mt-4 mb-8 group/note relative">
          <div className="flex items-start gap-2.5 bg-gradient-to-b from-[#faf7fc] to-[#f6f1f8] border border-[#ece2f0] border-l-[3px] border-l-[#6b3c72] rounded-lg px-3.5 py-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#6b3c72] mt-0.5 flex-none" />
            <p className="font-['Geist',sans-serif] text-[13px] text-[#40304a] leading-[20px]">{heroNote}</p>
            <div className="flex-none flex gap-1 opacity-0 group-hover/note:opacity-100 transition-opacity">
              <button onClick={() => edit?.openAsk(id)} title="Revise" className="w-6 h-6 rounded-md hover:bg-white/70 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-[#6b3c72]" />
              </button>
              <button onClick={() => edit?.clearHero(id)} title="Remove" className="w-6 h-6 rounded-md hover:bg-white/70 flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-[#9a8aa2]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline Ask composer, scoped to this block */}
      {askOpen && (
        <div onMouseDown={stop} className="ml-[38px] mr-2 -mt-4 mb-8">
          <div className="border border-[#e3d3ea] bg-[#fbf7fd] rounded-xl p-2.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full bg-[#f1e9ff] border border-[#e3d3ea] text-[11px] text-[#6b3c72] font-['Geist',sans-serif]">
                <Wand2 className="w-3 h-3" />
                <span className="max-w-[220px] truncate">{blockLabel || 'This section'}</span>
                <button onClick={() => edit?.closeAsk()} className="w-4 h-4 rounded-full bg-[#6b3c72]/15 hover:bg-[#6b3c72]/30 flex items-center justify-center">
                  <X className="w-2.5 h-2.5 text-[#6b3c72]" />
                </button>
              </span>
            </div>
            <div className="flex items-end gap-2">
              <textarea
                autoFocus
                rows={1}
                value={askText}
                onChange={(e) => setAskText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                  if (e.key === 'Escape') edit?.closeAsk();
                }}
                placeholder={`Tell Lumos how to change “${blockLabel || 'this section'}”…`}
                className="flex-1 resize-none bg-white border border-[#e5e5e2] rounded-lg px-3 py-2 font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] outline-none focus:border-[#6b3c72] leading-[19px] max-h-28"
              />
              <button
                onClick={submit}
                disabled={!askText.trim()}
                className="w-[34px] h-[34px] rounded-full bg-[#6b3c72] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#5a3060] transition-colors"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['Make it shorter', 'More formal', 'Add the numbers', 'Warmer tone'].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    if (!edit) return;
                    edit.submitAsk(id, s, beforeText);
                    setAskText('');
                  }}
                  className="px-2.5 py-1 rounded-full bg-white border border-[#e5e5e2] text-[11px] text-[#6b6b6b] font-['Geist',sans-serif] hover:border-[#6b3c72] hover:text-[#6b3c72] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Proposal — loading shimmer, then before → after with Accept / Discard */}
      {proposal && (
        <div onMouseDown={stop} className="ml-[38px] mr-2 -mt-4 mb-8">
          {proposal.loading ? (
            <div className="border border-[#e3d3ea] bg-[#fbf5fd] rounded-xl px-3.5 py-3 flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#6b3c72] animate-pulse" />
              <span className="font-['Geist',sans-serif] text-[12.5px] text-[#6b3c72]">Lumos is revising “{blockLabel || 'this section'}”…</span>
            </div>
          ) : (
            <div className="border border-[#e3d3ea] bg-[#fbf5fd] rounded-xl overflow-hidden">
              <div className="px-3.5 pt-3 pb-2.5 space-y-2">
                {beforeText && (
                  <div className="flex gap-2">
                    <span className="flex-none mt-0.5 text-[10px] font-['Geist',sans-serif] font-semibold uppercase tracking-wide text-[#b7a4bf]">Before</span>
                    <p className="font-['Geist',sans-serif] text-[12.5px] text-[#9a8aa2] line-through leading-[19px]">{beforeText}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <span className="flex-none mt-0.5 text-[10px] font-['Geist',sans-serif] font-semibold uppercase tracking-wide text-[#6b3c72]">After</span>
                  <p className="font-['Geist',sans-serif] text-[13px] text-[#2a1f30] leading-[20px]">{proposal.after}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 px-3.5 py-2 border-t border-[#eaddf0] bg-white/50">
                <span className="font-['Geist',sans-serif] text-[11.5px] text-[#8a7a92]">✦ {proposal.summary}</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => edit?.discardProposal(id)}
                    className="px-3 py-1.5 rounded-lg border border-[#e5e5e2] bg-white text-[12px] text-[#6b6b6b] font-['Geist',sans-serif] hover:bg-gray-50 transition-colors"
                  >
                    Discard
                  </button>
                  <button
                    onClick={() => edit?.acceptProposal(id)}
                    className="px-3 py-1.5 rounded-lg bg-[#6b3c72] text-white text-[12px] font-['Geist',sans-serif] hover:bg-[#5a3060] transition-colors"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AISummaryBlock({ text, styleConfig }: { text: string; styleConfig: StyleConfig }) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate lighter version of brand color for background
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 124, g: 107, b: 240 };
  };

  const rgb = hexToRgb(styleConfig.brandColor);
  const lightBgColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.06)`;

  return (
    <div
      className={`relative pl-[38px] pr-2 py-3 mb-8 transition-all cursor-move ${
        isHovered ? 'bg-[#fafaf8]' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Drag Handle */}
      <div className={`absolute left-1 top-1/2 -translate-y-1/2 transition-opacity pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <GripVertical className="w-3.5 h-3.5 text-[#9a9a9a]" />
      </div>

      {/* Add Button */}
      <div className={`absolute left-[22px] top-1/2 -translate-y-1/2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button className="w-4 h-4 flex items-center justify-center">
          <Plus className="w-3 h-3 text-[#9a9a9a]" />
        </button>
      </div>

      <div
        style={{ backgroundColor: lightBgColor }}
        className="p-4 rounded-lg"
      >
        <h3
          style={{
            fontFamily: `'${styleConfig.headingFont}',sans-serif`,
            color: styleConfig.brandColor,
            fontSize: `${Math.max(11, styleConfig.bodySize - 2)}px`,
          }}
          className="font-bold uppercase tracking-wide mb-2"
        >
          AI Summary
        </h3>
        <p
          style={{
            fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
            fontSize: `${styleConfig.bodySize}px`,
          }}
          className="text-[#1a1a1a] leading-[22px]"
        >
          {text}
        </p>
      </div>
    </div>
  );
}

function DraggableBlock({ title, children, styleConfig }: { title: string; children: React.ReactNode; styleConfig: StyleConfig }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-xl pl-[38px] pr-2 mb-8 transition-all cursor-move ${
        isHovered ? 'bg-[#fafaf8]' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Divider above section */}
      <div
        style={{ borderColor: styleConfig.brandColor }}
        className="absolute left-0 right-0 top-0 border-t opacity-15 mb-4"
      />

      {/* Drag Handle */}
      <div className={`absolute left-1 top-12 transition-opacity pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <GripVertical className="w-3.5 h-3.5 text-[#9a9a9a]" />
      </div>

      {/* Add Button */}
      <div className={`absolute left-[22px] top-12 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button className="w-4 h-4 flex items-center justify-center">
          <Plus className="w-3 h-3 text-[#9a9a9a]" />
        </button>
      </div>

      {/* Content */}
      <div className="pt-5 pb-3">
        <h2
          style={{
            fontFamily: `'${styleConfig.headingFont}',sans-serif`,
            color: styleConfig.brandColor,
          }}
          className="text-[18px] font-bold mb-4 tracking-tight"
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

function TextBlock({ title, content, styleConfig }: { title: string; content: string; styleConfig: StyleConfig }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-xl pl-[38px] pr-2 mb-8 transition-all cursor-move ${
        isHovered ? 'bg-[#fafaf8]' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Divider above section */}
      <div
        style={{ borderColor: styleConfig.brandColor }}
        className="absolute left-0 right-0 top-0 border-t opacity-15 mb-4"
      />

      {/* Drag Handle */}
      <div className={`absolute left-1 top-12 transition-opacity pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <GripVertical className="w-3.5 h-3.5 text-[#9a9a9a]" />
      </div>

      {/* Add Button */}
      <div className={`absolute left-[22px] top-12 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button className="w-4 h-4 flex items-center justify-center">
          <Plus className="w-3 h-3 text-[#9a9a9a]" />
        </button>
      </div>

      {/* Content */}
      <div className="pt-5 pb-3">

        <h3
          style={{
            fontFamily: `'${styleConfig.headingFont}',sans-serif`,
            color: styleConfig.brandColor,
          }}
          className="text-[18px] font-bold mb-4 tracking-tight"
        >
          {title}
        </h3>
        <div
          style={{
            fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
            fontSize: `${styleConfig.bodySize}px`,
          }}
          className="text-[#1a1a1a] leading-[22px] whitespace-pre-wrap"
        >
          {content}
        </div>
      </div>
    </div>
  );
}

function MessagingBlock({ title, styleConfig, entryMode }: { title: string; styleConfig: StyleConfig; entryMode?: 'brief' | 'upload' | null }) {
  const [isHovered, setIsHovered] = useState(false);

  const audiences = entryMode === 'upload'
    ? [
        {
          name: 'Active Members',
          themes: [
            { message: 'Your new warehouse opens closer to home — see what’s in store', channel: 'Email' },
            { message: 'Members-only opening week — first look at the new range', channel: 'Instagram' },
            { message: 'Fill the trolley, then fill the tank — members save twice', channel: 'Facebook' },
            { message: 'Priority opening-week hours for existing members', channel: 'Email' },
          ],
        },
        {
          name: 'Lapsed Members',
          themes: [
            { message: 'We moved closer. Your nearest warehouse is now 12 minutes away.', channel: 'Email' },
            { message: 'Your membership is still worth it — here’s the maths', channel: 'Facebook' },
            { message: 'New warehouse, new reasons to come back', channel: 'Instagram' },
            { message: 'Personalised win-back with a first-trip reminder', channel: 'Email' },
          ],
        },
        {
          name: 'Never-Redeemed Sign-Ups',
          themes: [
            { message: 'You’re already a member — here’s what your first trip looks like', channel: 'Email' },
            { message: 'Twelve minutes away, one trolley, a month sorted', channel: 'Instagram' },
            { message: 'See why Western Sydney families make the trip', channel: 'Facebook' },
            { message: 'First-shop welcome offer — bring the card, fill the boot', channel: 'Email' },
          ],
        },
      ]
    : [
        {
          name: 'Marsden Park Stock-Ups',
          themes: [
            { message: 'One trip. One month sorted.', channel: 'Instagram' },
            { message: 'Costco Marsden Park — built for households like yours', channel: 'YouTube' },
            { message: 'The Saturday shop everyone will be talking about', channel: 'Instagram' },
            { message: 'The membership pays for itself in two shops', channel: 'Email' },
          ],
        },
        {
          name: 'Parramatta Value Families',
          themes: [
            { message: 'Buy it by the box. Pay less by the unit.', channel: 'Mobile' },
            { message: 'Big enough for the whole family — and the family next door', channel: 'Facebook' },
            { message: 'The shop Western Sydney families share', channel: 'Mobile' },
            { message: 'Bring a friend. Split the trolley, not the value.', channel: 'Facebook' },
          ],
        },
        {
          name: 'Castle Hill Bulk Buyers',
          themes: [
            { message: 'Bulk, without the compromise.', channel: 'Instagram' },
            { message: 'Everything the long table needs, in one trip', channel: 'Email' },
            { message: 'Already a member somewhere? Compare the trolley.', channel: 'Instagram' },
            { message: 'Twenty minutes from the Hills — worth the drive, once a month', channel: 'Email' },
          ],
        },
      ];

  const getChannelColor = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'instagram':
        return { bg: '#FCE7F3', text: '#BE185D' };
      case 'facebook':
        return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'linkedin':
        return { bg: '#DBEAFE', text: '#0A66C2' };
      case 'email':
        return { bg: '#FEF3C7', text: '#92400E' };
      case 'youtube':
        return { bg: '#FEE2E2', text: '#991B1B' };
      case 'mobile':
        return { bg: '#DCFCE7', text: '#166534' };
      default:
        return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  return (
    <div
      className={`relative rounded-xl pl-[38px] pr-2 mb-8 transition-all cursor-move ${
        isHovered ? 'bg-[#fafaf8]' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Divider above section */}
      <div
        style={{ borderColor: styleConfig.brandColor }}
        className="absolute left-0 right-0 top-0 border-t opacity-15 mb-4"
      />

      {/* Drag Handle */}
      <div className={`absolute left-1 top-12 transition-opacity pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <GripVertical className="w-3.5 h-3.5 text-[#9a9a9a]" />
      </div>

      {/* Add Button */}
      <div className={`absolute left-[22px] top-12 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button className="w-4 h-4 flex items-center justify-center">
          <Plus className="w-3 h-3 text-[#9a9a9a]" />
        </button>
      </div>

      {/* Content */}
      <div className="pt-5 pb-3">

        <h3
          style={{
            fontFamily: `'${styleConfig.headingFont}',sans-serif`,
            color: styleConfig.brandColor,
          }}
          className="text-[18px] font-bold mb-4 tracking-tight"
        >
          {title}
        </h3>

        <div className="space-y-4">
          {audiences.map((audience, idx) => (
            <div key={idx} className="space-y-2">
              {/* Audience Name */}
              <h4
                style={{
                  fontFamily: `'${styleConfig.headingFont}',sans-serif`,
                  color: styleConfig.brandColor,
                }}
                className="text-[15px] font-semibold"
              >
                {audience.name}
              </h4>

              {/* 2x2 Grid of Theme Blocks */}
              <div className="grid grid-cols-2 gap-2">
                {audience.themes.map((theme, themeIdx) => {
                  const channelColor = getChannelColor(theme.channel);
                  return (
                    <div
                      key={themeIdx}
                      className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      {/* Channel Tag */}
                      <div className="mb-1.5">
                        <span
                          style={{
                            backgroundColor: channelColor.bg,
                            color: channelColor.text,
                            fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                            fontSize: `${Math.max(9, styleConfig.bodySize - 4.5)}px`,
                          }}
                          className="px-2 py-0.5 rounded-full font-medium"
                        >
                          {theme.channel}
                        </span>
                      </div>
                      {/* Message */}
                      <p
                        style={{
                          fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                          fontSize: `${Math.max(11, styleConfig.bodySize - 2.5)}px`,
                        }}
                        className="text-[#1a1a1a] leading-snug"
                      >
                        {theme.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AudienceCard({
  number,
  name,
  reach,
  demographics,
  growth,
  styleConfig,
  enriched = false,
}: {
  number: number;
  name: string;
  reach: string;
  demographics: string;
  growth?: string | null;
  styleConfig: StyleConfig;
  enriched?: boolean;
}) {
  // Calculate lighter versions of brand color for backgrounds
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 124, g: 107, b: 240 };
  };

  const rgb = hexToRgb(styleConfig.brandColor);
  const lightBgColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;

  return (
    <div
      style={{ borderColor: 'rgb(229, 231, 235)' }}
      className="flex items-center gap-4 p-3 bg-white border rounded-lg hover:border-current transition-colors"
      onMouseEnter={(e) => e.currentTarget.style.borderColor = styleConfig.brandColor}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(229, 231, 235)'}
    >
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
        <span
          style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
          className="text-[14px] text-[#666]"
        >
          {number}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3
            style={{
              fontFamily: `'${styleConfig.headingFont}',sans-serif`,
              fontSize: `${styleConfig.bodySize + 3}px`,
            }}
            className="text-[#1a1a1a] font-bold"
          >
            {name}
          </h3>
          {enriched && (
            <span
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: `${Math.max(9, styleConfig.bodySize - 4.5)}px`,
              }}
              className="px-2 py-0.5 bg-[#f0f0f0] text-[#666] rounded-full border border-[#e0e0e0] flex-shrink-0"
            >
              Enriched
            </span>
          )}
        </div>
        <div>
          <p
            style={{
              fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
              fontSize: `${Math.max(10.5, styleConfig.bodySize - 2.5)}px`,
            }}
            className="text-[#888]"
          >{demographics}</p>
          {growth && (
            <p
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: `${Math.max(10, styleConfig.bodySize - 3)}px`,
              }}
              className={`mt-0.5 ${
                growth.startsWith('+') ? 'text-[#059669] font-medium' : 'text-[#888]'
              }`}
            >
              {growth}
            </p>
          )}
        </div>
      </div>
      <div
        style={{
          fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
          color: styleConfig.brandColor,
        }}
        className="text-[22px] font-semibold flex-shrink-0"
      >
        {reach}
      </div>
    </div>
  );
}

function NarrativeBlock({ styleConfig, entryMode }: { styleConfig: StyleConfig; entryMode?: 'brief' | 'upload' | null }) {
  const [isHovered, setIsHovered] = useState(false);

  const narrativeText = entryMode === 'upload'
    ? "Your member segments reveal distinct visit and lapsing patterns. Active Members concentrate in high-frequency shopping behaviours with strong basket-growth and retention potential. Lapsed Members represent a significant re-engagement opportunity — a proximity-led offer tied to the new warehouse is the most effective re-activation lever. We recommend prioritising Active Members for immediate opening-week velocity, while running a dedicated win-back campaign for Lapsed Members through the first quarter of trade."
    : "Costco's Western Sydney launch opportunity splits cleanly across three household clusters, each with distinct shopping rhythms and travel signals. Volume impact is highest with Parramatta Value Families, who deliver the broadest household reach per activation. The highest-value opportunity sits with Marsden Park Stock-Ups, whose long, planned trips make roadside media unusually efficient. We recommend leading with Marsden Park Stock-Ups for launch velocity, and activating Parramatta Value Families with unit-price messaging to build sustained frequency.";

  return (
    <div
      className={`relative pl-[38px] pr-2 py-4 mb-8 transition-all cursor-move ${
        isHovered ? 'bg-[#fafaf8]' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute left-1 top-1/2 -translate-y-1/2 transition-opacity pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <GripVertical className="w-3.5 h-3.5 text-[#9a9a9a]" />
      </div>

      <div className={`absolute left-[22px] top-1/2 -translate-y-1/2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button className="w-4 h-4 flex items-center justify-center">
          <Plus className="w-3 h-3 text-[#9a9a9a]" />
        </button>
      </div>

      <div
        style={{
          borderLeftColor: styleConfig.brandColor,
        }}
        className="border-l-[3px] pl-4"
      >
        <p
          style={{
            fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
            fontSize: `${Math.max(13, styleConfig.bodySize)}px`,
            lineHeight: '1.8',
          }}
          className="text-[#2a2a2a]"
        >
          {narrativeText}
        </p>
      </div>
    </div>
  );
}

function GrowthAudiencesBlock({ title, styleConfig, entryMode }: { title: string; styleConfig: StyleConfig; entryMode?: 'brief' | 'upload' | null }) {
  const [isHovered, setIsHovered] = useState(false);

  const growthAudiences = entryMode === 'upload'
    ? [
        {
          name: 'Re-engaged Lapsed Members',
          growth: '+19% YoY',
          signal: 'Recovery opportunity',
          reason: 'Lapsed members re-entering consideration now that the new Western Sydney warehouse is closer than the one they left',
        },
        {
          name: 'Club Switchers (Rival → Costco)',
          growth: '+36% YoY',
          signal: 'Emerging segment',
          reason: 'Existing warehouse-club members actively comparing trolleys as cost-of-living pressure sharpens unit-price sensitivity',
        }
      ]
    : [
        {
          name: 'Café & Small Business Buyers',
          growth: '+31% YoY',
          signal: 'Emerging opportunity',
          reason: 'Small hospitality and trade operators buying wholesale volumes on a business membership rather than through a distributor',
        },
        {
          name: 'New-Build Movers',
          growth: '+44% YoY',
          signal: 'Fastest-growing',
          reason: 'Households settling into new North-West estates, forming their shopping habits in the first six months after moving in',
        }
      ];

  return (
    <div
      className={`relative rounded-xl pl-[38px] pr-2 mb-8 transition-all cursor-move ${
        isHovered ? 'bg-[#fafaf8]' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Divider above section */}
      <div
        style={{ borderColor: styleConfig.brandColor }}
        className="absolute left-0 right-0 top-0 border-t opacity-15 mb-4"
      />

      <div className={`absolute left-1 top-12 transition-opacity pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <GripVertical className="w-3.5 h-3.5 text-[#9a9a9a]" />
      </div>

      <div className={`absolute left-[22px] top-12 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button className="w-4 h-4 flex items-center justify-center">
          <Plus className="w-3 h-3 text-[#9a9a9a]" />
        </button>
      </div>

      <div className="pt-5 pb-3">

        <h2
          style={{
            fontFamily: `'${styleConfig.headingFont}',sans-serif`,
            color: styleConfig.brandColor,
          }}
          className="text-[18px] font-bold mb-3 tracking-tight"
        >
          {title}
        </h2>

        <p
          style={{
            fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
            fontSize: `${Math.max(11.5, styleConfig.bodySize - 1.5)}px`,
            lineHeight: '1.6',
          }}
          className="text-[#666] mb-4"
        >
          These segments aren't large enough to lead with, but show the strongest upward trajectory — worth seeding now ahead of the broader Q1 launch surge.
        </p>

        <div className="space-y-2.5">
          {growthAudiences.map((audience, idx) => (
            <div key={idx} className="p-3 bg-gradient-to-r from-green-50 to-transparent rounded-lg border border-green-200">
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex-1">
                  <h3
                    style={{
                      fontFamily: `'${styleConfig.headingFont}',sans-serif`,
                      fontSize: `${styleConfig.bodySize + 1}px`,
                    }}
                    className="text-[#1a1a1a] mb-1 font-semibold"
                  >
                    {audience.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                      fontSize: `${Math.max(10, styleConfig.bodySize - 2.5)}px`,
                    }}
                    className="text-[#059669] bg-green-100 px-2 py-0.5 rounded-full"
                  >
                    {audience.signal}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                    fontSize: `${styleConfig.bodySize + 2}px`,
                  }}
                  className="text-green-600 font-semibold"
                >
                  {audience.growth}
                </div>
              </div>
              <p
                style={{
                  fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                  fontSize: `${Math.max(11, styleConfig.bodySize - 1.5)}px`,
                }}
                className="text-[#666] leading-relaxed"
              >
                {audience.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GeoMapBlock({ title, styleConfig }: { title: string; styleConfig: StyleConfig }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-xl pl-[38px] pr-2 mb-8 transition-all cursor-move ${
        isHovered ? 'bg-[#fafaf8]' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Divider above section */}
      <div
        style={{ borderColor: styleConfig.brandColor }}
        className="absolute left-0 right-0 top-0 border-t opacity-15 mb-4"
      />

      <div className={`absolute left-1 top-12 transition-opacity pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <GripVertical className="w-3.5 h-3.5 text-[#9a9a9a]" />
      </div>

      <div className={`absolute left-[22px] top-12 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button className="w-4 h-4 flex items-center justify-center">
          <Plus className="w-3 h-3 text-[#9a9a9a]" />
        </button>
      </div>

      <div className="pt-5 pb-3">

        <h2
          style={{
            fontFamily: `'${styleConfig.headingFont}',sans-serif`,
            color: styleConfig.brandColor,
          }}
          className="text-[18px] font-bold mb-4 tracking-tight"
        >
          {title}
        </h2>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <svg viewBox="0 0 500 350" className="w-full h-auto">
            {/* District boundaries - Choropleth map */}

            {/* North-West growth corridor (Darkest) */}
            <path
              d="M 220 150 L 240 140 L 260 145 L 270 160 L 265 175 L 245 180 L 225 175 Z"
              fill={styleConfig.brandColor}
              opacity="0.85"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Marsden Park */}
            <path
              d="M 200 160 L 220 150 L 225 175 L 210 180 Z"
              fill={styleConfig.brandColor}
              opacity="0.85"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Parramatta */}
            <path
              d="M 180 130 L 200 160 L 210 180 L 190 190 L 170 170 L 165 145 Z"
              fill={styleConfig.brandColor}
              opacity="0.75"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Granville */}
            <path
              d="M 165 145 L 170 170 L 155 180 L 145 165 L 150 145 Z"
              fill={styleConfig.brandColor}
              opacity="0.75"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Hills District (Medium) */}
            <path
              d="M 270 160 L 290 155 L 310 165 L 320 180 L 315 200 L 295 205 L 275 195 L 265 175 Z"
              fill={styleConfig.brandColor}
              opacity="0.5"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            <path
              d="M 290 155 L 310 140 L 330 150 L 335 170 L 320 180 L 310 165 Z"
              fill={styleConfig.brandColor}
              opacity="0.45"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            <path
              d="M 275 195 L 295 205 L 300 225 L 285 235 L 265 225 L 260 205 Z"
              fill={styleConfig.brandColor}
              opacity="0.48"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Blacktown & Rooty Hill (Medium-Low) */}
            <path
              d="M 180 130 L 200 110 L 230 105 L 250 120 L 240 140 L 220 150 L 200 160 Z"
              fill={styleConfig.brandColor}
              opacity="0.38"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            <path
              d="M 230 105 L 250 90 L 280 95 L 290 115 L 280 130 L 260 145 L 240 140 L 250 120 Z"
              fill={styleConfig.brandColor}
              opacity="0.35"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Outer west (Low) */}
            <path
              d="M 150 145 L 155 180 L 145 200 L 120 205 L 105 185 L 110 160 L 130 150 Z"
              fill={styleConfig.brandColor}
              opacity="0.25"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            <path
              d="M 110 160 L 105 185 L 85 195 L 70 180 L 75 155 L 95 145 Z"
              fill={styleConfig.brandColor}
              opacity="0.22"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Inner west & south (Low) */}
            <path
              d="M 190 190 L 210 180 L 245 180 L 265 175 L 265 225 L 235 240 L 200 230 L 175 210 Z"
              fill={styleConfig.brandColor}
              opacity="0.28"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            <path
              d="M 145 200 L 155 180 L 190 190 L 175 210 L 150 215 Z"
              fill={styleConfig.brandColor}
              opacity="0.26"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Region labels */}
            <text x="243" y="167"
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: '9px',
                fontWeight: '600',
              }}
              fill="#ffffff"
              textAnchor="middle"
            >
              Marsden Pk
            </text>

            <text x="186" y="163"
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: '9px',
                fontWeight: '600',
              }}
              fill="#ffffff"
              textAnchor="middle"
            >
              Parra-
            </text>
            <text x="186" y="174"
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: '9px',
                fontWeight: '600',
              }}
              fill="#ffffff"
              textAnchor="middle"
            >
              matta
            </text>

            <text x="155" y="164"
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: '9px',
                fontWeight: '600',
              }}
              fill="#ffffff"
              textAnchor="middle"
            >
              Castle
            </text>
            <text x="155" y="174"
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: '9px',
                fontWeight: '600',
              }}
              fill="#ffffff"
              textAnchor="middle"
            >
              Hill
            </text>
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="p-2 bg-gray-50 rounded">
            <div
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: `${Math.max(10, styleConfig.bodySize - 2.5)}px`,
              }}
              className="text-[#999] mb-0.5"
            >
              North-West corridor
            </div>
            <div
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: `${styleConfig.bodySize}px`,
                color: styleConfig.brandColor,
              }}
              className="font-semibold"
            >
              46%
            </div>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <div
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: `${Math.max(10, styleConfig.bodySize - 2.5)}px`,
              }}
              className="text-[#999] mb-0.5"
            >
              Parramatta / Inner West
            </div>
            <div
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: `${styleConfig.bodySize}px`,
                color: styleConfig.brandColor,
              }}
              className="font-semibold"
            >
              34%
            </div>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <div
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: `${Math.max(10, styleConfig.bodySize - 2.5)}px`,
              }}
              className="text-[#999] mb-0.5"
            >
              Hills District
            </div>
            <div
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: `${styleConfig.bodySize}px`,
                color: styleConfig.brandColor,
              }}
              className="font-semibold"
            >
              20%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignRecommendationsBlock({ title, styleConfig, entryMode }: { title: string; styleConfig: StyleConfig; entryMode?: 'brief' | 'upload' | null }) {
  const [isHovered, setIsHovered] = useState(false);

  const campaigns = entryMode === 'upload'
    ? [
        {
          segment: 'Active Members',
          color: '#7c6bf0',
          messaging: '"You already shop with us. Now we’re closer."',
          channels: [
            { name: 'Email / CRM', percentage: 40 },
            { name: 'Member loyalty push', percentage: 30 },
            { name: 'Social media', percentage: 20 },
            { name: 'Digital display', percentage: 10 },
          ],
          creative: 'Retention and basket growth — personalised category offers, members-only opening hours, fuel-and-shop bundling.',
        },
        {
          segment: 'Lapsed Members',
          color: '#5b8def',
          messaging: '"We moved closer. Your trolley is waiting."',
          channels: [
            { name: 'Email re-engagement', percentage: 40 },
            { name: 'Social retargeting', percentage: 30 },
            { name: 'Digital display', percentage: 20 },
            { name: 'Limited-time offers', percentage: 10 },
          ],
          creative: 'Warm and concrete — drive-time proximity messaging, a named product and price, low-friction return with no re-join step.',
        },
        {
          segment: 'Never-Redeemed Sign-Ups',
          color: '#4db8d8',
          messaging: '"You’re already a member. Here’s what the first trip looks like."',
          channels: [
            { name: 'Email onboarding', percentage: 45 },
            { name: 'Mobile / app', percentage: 25 },
            { name: 'Social media', percentage: 20 },
            { name: 'Digital display', percentage: 10 },
          ],
          creative: 'Bright and practical — a walkthrough of the first shop, drive time from home, low barrier to the first visit.',
        },
      ]
    : [
        {
          segment: 'Marsden Park Stock-Ups',
          color: '#7c6bf0',
          messaging: '"One trip. One month sorted."',
          channels: [
            { name: 'Roadside OOH (M7 / Richmond Rd)', percentage: 36 },
            { name: 'Meta / social', percentage: 26 },
            { name: 'Catalogue & letterbox', percentage: 22 },
            { name: 'Drive-time radio', percentage: 16 },
          ],
          creative: 'Scale and practicality — a full trolley and a full boot, M7 and Richmond Road placement, Thursday-to-Saturday weighting.',
        },
        {
          segment: 'Parramatta Value Families',
          color: '#5b8def',
          messaging: '"Buy it by the box. Pay less by the unit."',
          channels: [
            { name: 'Digital OOH — Parramatta CBD', percentage: 33 },
            { name: 'Multicultural radio & press', percentage: 27 },
            { name: 'Community referral', percentage: 24 },
            { name: 'Catalogue & letterbox', percentage: 16 },
          ],
          creative: 'Unit-price led and community-proofed — household-scale imagery, referral mechanic, Ramadan / Diwali / Lunar New Year weighting.',
        },
        {
          segment: 'Castle Hill Bulk Buyers',
          color: '#4db8d8',
          messaging: '"Bulk, without the compromise."',
          channels: [
            { name: 'Roadside OOH — Windsor Rd', percentage: 31 },
            { name: 'Retail media & search', percentage: 28 },
            { name: 'Email / CRM', percentage: 23 },
            { name: 'Local press & school networks', percentage: 18 },
          ],
          creative: 'Range-led and quality-forward — entertaining imagery, compare-the-trolley mechanic, Windsor Road and Old Northern Road placement.',
        },
      ];

  const channelColors = ['#7c6bf0', '#5b8def', '#4db8d8', '#3dd9c5'];

  return (
    <div
      className={`relative rounded-xl pl-[38px] pr-2 mb-8 transition-all cursor-move ${
        isHovered ? 'bg-[#fafaf8]' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Divider above section */}
      <div
        style={{ borderColor: styleConfig.brandColor }}
        className="absolute left-0 right-0 top-0 border-t opacity-15 mb-4"
      />

      <div className={`absolute left-1 top-12 transition-opacity pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <GripVertical className="w-3.5 h-3.5 text-[#9a9a9a]" />
      </div>

      <div className={`absolute left-[22px] top-12 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button className="w-4 h-4 flex items-center justify-center">
          <Plus className="w-3 h-3 text-[#9a9a9a]" />
        </button>
      </div>

      <div className="pt-5 pb-3">

        <h2
          style={{
            fontFamily: `'${styleConfig.headingFont}',sans-serif`,
            color: styleConfig.brandColor,
          }}
          className="text-[18px] font-bold mb-4 tracking-tight"
        >
          {title}
        </h2>

        <div className="space-y-3">
          {campaigns.map((campaign, idx) => (
            <div
              key={idx}
              style={{ borderLeftColor: campaign.color }}
              className="p-3 bg-gray-50 rounded-lg border-l-4"
            >
              <h3
                style={{
                  fontFamily: `'${styleConfig.headingFont}',sans-serif`,
                  fontSize: `${styleConfig.bodySize + 2}px`,
                }}
                className="text-[#1a1a1a] font-bold mb-2"
              >
                {campaign.segment}
              </h3>

              {/* Messaging */}
              <div className="mb-2">
                <div
                  style={{
                    fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                    fontSize: `${Math.max(9.5, styleConfig.bodySize - 3)}px`,
                  }}
                  className="text-[#999] uppercase tracking-wide mb-1"
                >
                  Messaging
                </div>
                <p
                  style={{
                    fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                    fontSize: `${Math.max(12, styleConfig.bodySize - 0.5)}px`,
                  }}
                  className="text-[#1a1a1a] italic"
                >
                  {campaign.messaging}
                </p>
              </div>

              {/* Channels */}
              <div className="mb-2">
                <div
                  style={{
                    fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                    fontSize: `${Math.max(9.5, styleConfig.bodySize - 3)}px`,
                  }}
                  className="text-[#999] uppercase tracking-wide mb-1.5"
                >
                  Channels
                </div>

                {/* Channel bar */}
                <div className="flex h-8 rounded-md overflow-hidden mb-2">
                  {campaign.channels.map((channel, channelIdx) => (
                    <div
                      key={channelIdx}
                      style={{
                        width: `${channel.percentage}%`,
                        backgroundColor: channelColors[channelIdx % channelColors.length],
                      }}
                      className="flex items-center justify-center"
                    >
                      <span
                        style={{
                          fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                          fontSize: `${Math.max(9, styleConfig.bodySize - 4)}px`,
                        }}
                        className="text-white font-medium"
                      >
                        {channel.percentage}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Channel legend */}
                <div className="grid grid-cols-2 gap-2">
                  {campaign.channels.map((channel, channelIdx) => (
                    <div key={channelIdx} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: channelColors[channelIdx % channelColors.length] }}
                      />
                      <span
                        style={{
                          fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                          fontSize: `${Math.max(10, styleConfig.bodySize - 2.5)}px`,
                        }}
                        className="text-[#666]"
                      >
                        {channel.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Creative direction */}
              <div>
                <div
                  style={{
                    fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                    fontSize: `${Math.max(9.5, styleConfig.bodySize - 3)}px`,
                  }}
                  className="text-[#999] uppercase tracking-wide mb-1"
                >
                  Creative direction
                </div>
                <p
                  style={{
                    fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                    fontSize: `${Math.max(11, styleConfig.bodySize - 1.5)}px`,
                  }}
                  className="text-[#666] leading-relaxed"
                >
                  {campaign.creative}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PostcodeRow({
  rank,
  area,
  index,
  households,
  styleConfig,
}: {
  rank: number;
  area: string;
  index: number;
  households: number;
  styleConfig: StyleConfig;
}) {
  const maxIndex = 312;
  const barWidth = (index / maxIndex) * 100;

  return (
    <div className="grid grid-cols-[40px_140px_1fr_100px] gap-4 items-center">
      <span
        style={{
          fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
          fontSize: `${styleConfig.bodySize}px`,
        }}
        className="text-[#999] text-center"
      >
        {rank}
      </span>
      <span
        style={{
          fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
          fontSize: `${styleConfig.bodySize + 0.5}px`,
        }}
        className="text-black"
      >{area}</span>
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
          <div
            style={{
              width: `${barWidth}%`,
              backgroundColor: styleConfig.brandColor,
            }}
            className="h-full rounded-full flex items-center justify-end pr-2"
          >
            <span
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: `${Math.max(10, styleConfig.bodySize - 2.5)}px`,
              }}
              className="text-white"
            >
              {index}
            </span>
          </div>
        </div>
      </div>
      <span
        style={{
          fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
          fontSize: `${styleConfig.bodySize}px`,
        }}
        className="text-[#666] text-right"
      >
        {households.toLocaleString()}
      </span>
    </div>
  );
}
