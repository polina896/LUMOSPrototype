import React, { useState, useRef } from 'react';
import { ChevronDown, Check, Sparkles, Plus, PaintBucket, FileText, Database, GripVertical, Edit2, MoreVertical, Lightbulb, Download, Users } from 'lucide-react';
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

interface ArtifactPanelProps {
  screen: Screen;
  setOnAddTextBlock: (fn: ((title: string, content: string) => void) | null) => void;
  isGeneratingBlock: boolean;
  entryMode: 'brief' | 'upload' | null;
  isAnalysisComplete: boolean;
  selectedAudienceId: AudienceId | null;
}

export default function ArtifactPanel({
  screen,
  setOnAddTextBlock,
  isGeneratingBlock,
  entryMode,
  isAnalysisComplete,
  selectedAudienceId,
}: ArtifactPanelProps) {
  const [previewMode, setPreviewMode] = useState<'preview' | 'data'>('preview');

  if (screen === 'blank' || screen === 'planning' || screen === 'clarifying' || screen === 'insights') {
    return null;
  }

  if (screen === 'profiles') {
    if (!selectedAudienceId) return null;
    return (
      <div className="w-[420px] bg-white border-l border-[#d3d3d0] flex flex-col min-h-0 overflow-y-auto">
        <AudienceDetailPanel audienceId={selectedAudienceId} screen={screen} />
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
        <AudienceDetailPanel audienceId={selectedAudienceId} screen={screen} />
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
      description: 'Premium Sedan Intenders, EV Upgrade Shoppers, and Family SUV Upgraders as distinct audience segments — vehicle ownership level, consideration frequency, and upgrade behaviour.',
      bestWhen: 'Best when the segments are genuinely different in behaviour. Reads as a slide.',
      reasoning: 'Your brief calls out distinct buyer types — cards make each segment feel like a separate persona with clear ownership frequency and upgrade behaviour differentiation.',
    },
    {
      id: 'comparison' as const,
      label: 'B · COMPARISON',
      title: 'Ranked comparison bars',
      description: 'Segments ranked by reach with index scores and Q1 uplift signals side-by-side.',
      bestWhen: 'Best when you need to prioritize which segments to activate first.',
      reasoning: 'Since this is a launch campaign, you need to prioritise — a ranked view shows which segments deliver the highest consideration impact and fastest Q1 uplift.',
    },
    {
      id: 'map' as const,
      label: 'C · GEO MAP',
      title: 'Top metro area heatmap',
      description: 'Singapore planning areas shaded by vehicle registration concentration with district-level detail.',
      bestWhen: 'Best when you are planning geo-targeted dealer activations, test-drive event locations, or OOH placement.',
      reasoning: 'Launch campaigns benefit from geographic targeting — this shows exactly where high-intent automotive buyers concentrate across Singapore\'s planning areas.',
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
    { name: 'Premium Sedan Intenders', age: '28-50', income: '$120k+ HHI', reach: '32%' },
    { name: 'EV Upgrade Shoppers', age: '25-45', income: '$95k+ HHI', reach: '44%' },
    { name: 'Family SUV Upgraders', age: '30-48', income: '$85k+ HHI', reach: '24%' }
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
    { name: 'Premium Sedan Intenders', reach: 32, index: 245, growth: '+22%' },
    { name: 'EV Upgrade Shoppers', reach: 44, index: 212, growth: '+18%' },
    { name: 'Family SUV Upgraders', reach: 24, index: 188, growth: '+31%' }
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
        {/* Rough Singapore island shape */}
        <svg viewBox="0 0 300 180" className="w-full h-full">
          {/* Central/Downtown districts (darker - Affluent Professionals) */}
          <ellipse cx="150" cy="90" rx="35" ry="25" fill="#7c6bf0" opacity="0.7" />
          {/* Northeast/East (medium - Tech Families) */}
          <ellipse cx="190" cy="70" rx="30" ry="20" fill="#7c6bf0" opacity="0.4" />
          {/* West (lighter - mixed) */}
          <ellipse cx="100" cy="100" rx="28" ry="22" fill="#7c6bf0" opacity="0.25" />
          {/* Northwest */}
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
}: {
  previewMode: 'preview' | 'data';
  setPreviewMode: (mode: 'preview' | 'data') => void;
  setOnAddTextBlock: (fn: ((title: string, content: string) => void) | null) => void;
  isGeneratingBlock: boolean;
  entryMode: 'brief' | 'upload' | null;
  screen: Screen;
  selectedAudienceId: AudienceId | null;
}) {
  const [pageTitle, setPageTitle] = useState('Meridian Motors Singapore Launch — Audiences');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
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

  return (
    <>
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
          An AI-generated audience analysis and campaign recommendation for the Meridian Motors Singapore launch. For internal planning use only.
        </p>
      </div>

      {/* Draggable Blocks */}
      {blocks.map((block, index) => {
        if (block.type === 'insight') {
          const summaryText = entryMode === 'upload'
            ? "Your owner segments reveal distinct purchase and service patterns. Active Owners offer the highest immediate conquest potential through targeted test-drive mechanics. Lapsed Considerers show the strongest re-engagement opportunity with a compelling upgrade offer. Prioritise Active Owners for launch velocity, re-engage Lapsed Considerers with an upgrade incentive, and onboard New-to-Brand Enquirers with a strong first-trial moment."
            : "Meridian Motors' Singapore launch opportunity sits across three audience segments with distinct consideration behaviours and purchase signals. Lead with Premium Sedan Intenders for brand challenger impact, activate EV Upgrade Shoppers for category leadership, and target Family SUV Upgraders for sustained new-model consideration.";

          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock}>
              <AISummaryBlock
                text={summaryText}
                styleConfig={styleConfig}
              />
            </DraggableWrapper>
          );
        }
        if (block.type === 'audiences') {
          const audienceData = entryMode === 'upload'
            ? [
                { number: 1, name: 'Active Owners', reach: '48%', demographics: '30–55 | $120k+ | 2+ vehicles', growth: 'Stable' },
                { number: 2, name: 'Lapsed Considerers', reach: '28%', demographics: '25–50 | $95k+ | <1 visit/90 days', growth: '+19% re-eng.' },
                { number: 3, name: 'New-to-Brand Enquirers', reach: '24%', demographics: '22–45 | $85k+ | First enquiry', growth: '+36% YoY' },
              ]
            : [
                { number: 1, name: 'Premium Sedan Intenders', reach: '32%', demographics: '28–50 | $120k+ | Index 245', growth: '+22% YoY' },
                { number: 2, name: 'EV Upgrade Shoppers', reach: '44%', demographics: '25–45 | $95k+ | Index 212', growth: '+18% YoY' },
                { number: 3, name: 'Family SUV Upgraders', reach: '24%', demographics: '30–48 | $85k+ | Index 188', growth: '+31% YoY' },
              ];

          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock}>
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
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock}>
              <NarrativeBlock styleConfig={styleConfig} entryMode={entryMode} />
            </DraggableWrapper>
          );
        }
        if (block.type === 'growth') {
          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock}>
              <GrowthAudiencesBlock title={block.title!} styleConfig={styleConfig} entryMode={entryMode} />
            </DraggableWrapper>
          );
        }
        if (block.type === 'geo-map') {
          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock}>
              <GeoMapBlock title={block.title!} styleConfig={styleConfig} />
            </DraggableWrapper>
          );
        }
        if (block.type === 'postcodes') {
          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock}>
              <DraggableBlock
                title={block.title!}
                styleConfig={styleConfig}
                onEdit={() => setIsPostcodeEditOpen(true)}
              >
                {postcodeView === 'ranking' ? (
                  <div className="space-y-3">
                    <PostcodeRow rank={1} area="Orchard / River Valley" index={312} households={68000} styleConfig={styleConfig} />
                    <PostcodeRow rank={2} area="Buona Vista / one-north" index={287} households={54000} styleConfig={styleConfig} />
                    <PostcodeRow rank={3} area="Bishan / Ang Mo Kio" index={264} households={91000} styleConfig={styleConfig} />
                    <PostcodeRow rank={4} area="Jurong East" index={241} households={78000} styleConfig={styleConfig} />
                    <PostcodeRow rank={5} area="Tampines / Pasir Ris" index={228} households={103000} styleConfig={styleConfig} />
                    <PostcodeRow rank={6} area="Woodlands / Sembawang" index={209} households={87000} styleConfig={styleConfig} />
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
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock}>
              <CampaignRecommendationsBlock title={block.title!} styleConfig={styleConfig} entryMode={entryMode} />
            </DraggableWrapper>
          );
        }
        if (block.type === 'messaging') {
          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock}>
              <MessagingBlock title={block.title!} styleConfig={styleConfig} entryMode={entryMode} />
            </DraggableWrapper>
          );
        }
        if (block.type === 'text') {
          return (
            <DraggableWrapper key={block.id} id={block.id} index={index} moveBlock={moveBlock}>
              <TextBlock title={block.title!} content={block.content!} styleConfig={styleConfig} />
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
    </>
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
              ? 'Enriching your owner segments with vehicle registration data, movement patterns, and geographic concentration...'
              : 'Identifying segments, analysing registration concentration, and pulling seasonal automotive signals...'}
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
}

function DraggableWrapper({ id, index, moveBlock, children }: DraggableWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={ref}
      className={`transition-opacity ${isDragging ? 'opacity-40' : 'opacity-100'} ${
        isOver ? 'scale-[1.02]' : 'scale-100'
      }`}
    >
      {children}
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

function DraggableBlock({ title, children, styleConfig, onEdit }: { title: string; children: React.ReactNode; styleConfig: StyleConfig; onEdit?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

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
        {/* Edit and More Buttons */}
        <div className={`absolute right-2 top-6 flex gap-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onEdit) onEdit();
            }}
            className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5 text-[#6b6b6b]" />
          </button>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMoreMenuOpen(!isMoreMenuOpen);
              }}
              className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <MoreVertical className="w-3.5 h-3.5 text-[#6b6b6b]" />
            </button>
            {isMoreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-[30px] z-20 w-44 bg-white border border-[#e5e5e2] rounded-lg shadow-lg py-1">
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PDF
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as CSV
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PNG
                  </button>
                  <div className="my-1 border-t border-[#e5e5e2]" />
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Duplicate
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#dc2626] hover:bg-red-50 transition-colors">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

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
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

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
        {/* Edit and More Buttons */}
        <div className={`absolute right-2 top-6 flex gap-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Edit2 className="w-3.5 h-3.5 text-[#6b6b6b]" />
          </button>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMoreMenuOpen(!isMoreMenuOpen);
              }}
              className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <MoreVertical className="w-3.5 h-3.5 text-[#6b6b6b]" />
            </button>
            {isMoreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-[30px] z-20 w-44 bg-white border border-[#e5e5e2] rounded-lg shadow-lg py-1">
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PDF
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as CSV
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PNG
                  </button>
                  <div className="my-1 border-t border-[#e5e5e2]" />
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Duplicate
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#dc2626] hover:bg-red-50 transition-colors">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

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
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const audiences = entryMode === 'upload'
    ? [
        {
          name: 'Active Owners',
          themes: [
            { message: 'Your next Meridian is ready — book a test drive today', channel: 'Email' },
            { message: 'Exclusive owner preview — new model launch event', channel: 'Instagram' },
            { message: 'Upgrade your drive — Meridian owners get first access', channel: 'Facebook' },
            { message: 'Loyalty reward — priority delivery for existing owners', channel: 'Email' },
          ],
        },
        {
          name: 'Lapsed Considerers',
          themes: [
            { message: "A lot has changed — come back and see the new lineup", channel: 'Email' },
            { message: 'Your upgrade offer is waiting — limited Q1 availability', channel: 'Facebook' },
            { message: 'New model, new reasons to reconsider Meridian', channel: 'Instagram' },
            { message: 'Personalised re-engagement with an exclusive test-drive invite', channel: 'Email' },
          ],
        },
        {
          name: 'New-to-Brand Enquirers',
          themes: [
            { message: 'Your first Meridian experience starts here — book a drive', channel: 'Email' },
            { message: 'Discover what precision feels like — test drive this week', channel: 'Instagram' },
            { message: "See why Singapore's premium buyers choose Meridian", channel: 'Facebook' },
            { message: 'First-enquiry welcome offer — complimentary test drive', channel: 'Email' },
          ],
        },
      ]
    : [
        {
          name: 'Premium Sedan Intenders',
          themes: [
            { message: 'Not the sedan you expected. Better.', channel: 'Instagram' },
            { message: 'Meridian Motors — precision engineered for Singapore roads', channel: 'YouTube' },
            { message: 'The drive everyone will be talking about', channel: 'Instagram' },
            { message: 'Book your test drive — limited launch allocations available', channel: 'Email' },
          ],
        },
        {
          name: 'EV Upgrade Shoppers',
          themes: [
            { message: 'Go electric without compromise — Meridian EV is here', channel: 'Mobile' },
            { message: 'Charge smarter, drive further — Q1 launch pricing available', channel: 'Facebook' },
            { message: 'Singapore Green Plan incentive eligible — enquire now', channel: 'Mobile' },
            { message: 'The EV your current car wishes it was', channel: 'Facebook' },
          ],
        },
        {
          name: 'Family SUV Upgraders',
          themes: [
            { message: 'More space. More safety. More Meridian.', channel: 'Instagram' },
            { message: 'The SUV built for Singapore family life', channel: 'Email' },
            { message: 'Seven seats, zero compromise — see the new SUV', channel: 'Instagram' },
            { message: 'Flexible finance — upgrade your family drive today', channel: 'Email' },
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
        {/* Edit and More Buttons */}
        <div className={`absolute right-2 top-6 flex gap-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Edit2 className="w-3.5 h-3.5 text-[#6b6b6b]" />
          </button>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMoreMenuOpen(!isMoreMenuOpen);
              }}
              className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <MoreVertical className="w-3.5 h-3.5 text-[#6b6b6b]" />
            </button>
            {isMoreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-[30px] z-20 w-44 bg-white border border-[#e5e5e2] rounded-lg shadow-lg py-1">
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PDF
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as CSV
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PNG
                  </button>
                  <div className="my-1 border-t border-[#e5e5e2]" />
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Duplicate
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#dc2626] hover:bg-red-50 transition-colors">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

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
    ? "Your owner segments reveal distinct service and consideration patterns. Active Owners concentrate in high-frequency ownership behaviours with strong upsell and retention potential. Lapsed Considerers represent a significant re-engagement opportunity — a targeted test-drive offer or exclusive preview event is the most effective re-activation lever. We recommend prioritising Active Owners for immediate launch velocity, while running a dedicated re-engagement campaign for Lapsed Considerers through the Q1 window."
    : "Meridian Motors' Singapore launch opportunity splits cleanly across three audience groups, each with distinct ownership behaviours and upgrade signals. Volume impact is highest with Premium Sedan Intenders, who drive the broadest dealership visit reach per activation. The highest-value brand-building opportunity sits with EV Upgrade Shoppers, where technology-challenger creative consistently drives brand switching. We recommend leading with Premium Sedan Intenders for volume, and activating EV Upgrade Shoppers with a test-drive campaign to build sustained consideration.";

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
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const growthAudiences = entryMode === 'upload'
    ? [
        {
          name: 'Re-engaged Lapsed Owners',
          growth: '+19% YoY',
          signal: 'Recovery opportunity',
          reason: 'Lapsed Meridian owners re-entering consideration driven by new model launch and competitive upgrade offers',
        },
        {
          name: 'EV Converts (Petrol → Electric)',
          growth: '+36% YoY',
          signal: 'Emerging segment',
          reason: 'Petrol car owners actively shifting to EV or hybrid as Singapore Green Plan incentives increase',
        }
      ]
    : [
        {
          name: 'Premium Finance Upgraders',
          growth: '+31% YoY',
          signal: 'Emerging opportunity',
          reason: 'Higher-spend segment trading up from mid-range to premium vehicles via flexible financing structures',
        },
        {
          name: 'Expat High Earners',
          growth: '+44% YoY',
          signal: 'Fastest-growing',
          reason: 'Expat residents with high disposable income and strong brand affinity for European and Japanese premium marques',
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
        <div className={`absolute right-2 top-6 flex gap-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Edit2 className="w-3.5 h-3.5 text-[#6b6b6b]" />
          </button>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMoreMenuOpen(!isMoreMenuOpen);
              }}
              className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <MoreVertical className="w-3.5 h-3.5 text-[#6b6b6b]" />
            </button>
            {isMoreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-[30px] z-20 w-44 bg-white border border-[#e5e5e2] rounded-lg shadow-lg py-1">
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PDF
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as CSV
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PNG
                  </button>
                  <div className="my-1 border-t border-[#e5e5e2]" />
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Duplicate
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#dc2626] hover:bg-red-50 transition-colors">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

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
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

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
        <div className={`absolute right-2 top-6 flex gap-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Edit2 className="w-3.5 h-3.5 text-[#6b6b6b]" />
          </button>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMoreMenuOpen(!isMoreMenuOpen);
              }}
              className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <MoreVertical className="w-3.5 h-3.5 text-[#6b6b6b]" />
            </button>
            {isMoreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-[30px] z-20 w-44 bg-white border border-[#e5e5e2] rounded-lg shadow-lg py-1">
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PDF
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as CSV
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PNG
                  </button>
                  <div className="my-1 border-t border-[#e5e5e2]" />
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Duplicate
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#dc2626] hover:bg-red-50 transition-colors">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

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

            {/* Central Region - Districts 9, 10, 11 (Darkest) */}
            <path
              d="M 220 150 L 240 140 L 260 145 L 270 160 L 265 175 L 245 180 L 225 175 Z"
              fill={styleConfig.brandColor}
              opacity="0.85"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Orchard (District 9) */}
            <path
              d="M 200 160 L 220 150 L 225 175 L 210 180 Z"
              fill={styleConfig.brandColor}
              opacity="0.85"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Bukit Timah (District 10) */}
            <path
              d="M 180 130 L 200 160 L 210 180 L 190 190 L 170 170 L 165 145 Z"
              fill={styleConfig.brandColor}
              opacity="0.75"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Holland Village (District 10) */}
            <path
              d="M 165 145 L 170 170 L 155 180 L 145 165 L 150 145 Z"
              fill={styleConfig.brandColor}
              opacity="0.75"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* East - Districts 15, 19, 21 (Medium) */}
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

            {/* North (Medium-Low) */}
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

            {/* West (Low) */}
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

            {/* South (Low) */}
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

            {/* District labels */}
            <text x="207" y="165"
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: '11px',
                fontWeight: '600',
              }}
              fill="#ffffff"
              textAnchor="middle"
            >
              Orchard
            </text>

            <text x="180" y="165"
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: '10px',
                fontWeight: '600',
              }}
              fill="#ffffff"
              textAnchor="middle"
            >
              Bukit
            </text>
            <text x="180" y="176"
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: '10px',
                fontWeight: '600',
              }}
              fill="#ffffff"
              textAnchor="middle"
            >
              Timah
            </text>

            <text x="157" y="165"
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: '9px',
                fontWeight: '600',
              }}
              fill="#ffffff"
              textAnchor="middle"
            >
              Holland
            </text>
            <text x="157" y="175"
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: '9px',
                fontWeight: '600',
              }}
              fill="#ffffff"
              textAnchor="middle"
            >
              Village
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
              Central / East
            </div>
            <div
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: `${styleConfig.bodySize}px`,
                color: styleConfig.brandColor,
              }}
              className="font-semibold"
            >
              52%
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
              North / West
            </div>
            <div
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: `${styleConfig.bodySize}px`,
                color: styleConfig.brandColor,
              }}
              className="font-semibold"
            >
              31%
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
              South / HDB towns
            </div>
            <div
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: `${styleConfig.bodySize}px`,
                color: styleConfig.brandColor,
              }}
              className="font-semibold"
            >
              17%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignRecommendationsBlock({ title, styleConfig, entryMode }: { title: string; styleConfig: StyleConfig; entryMode?: 'brief' | 'upload' | null }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const campaigns = entryMode === 'upload'
    ? [
        {
          segment: 'Active Owners',
          color: '#7c6bf0',
          messaging: '"You already drive Meridian. The next generation is ready for you."',
          channels: [
            { name: 'Email / CRM', percentage: 40 },
            { name: 'Owner loyalty push', percentage: 30 },
            { name: 'Social media', percentage: 20 },
            { name: 'Digital display', percentage: 10 },
          ],
          creative: 'Retention and upsell — personalised upgrade offers, exclusive owner preview events, Q1 launch priority access.',
        },
        {
          segment: 'Lapsed Considerers',
          color: '#5b8def',
          messaging: '"Your next Meridian is worth the wait."',
          channels: [
            { name: 'Email re-engagement', percentage: 40 },
            { name: 'Social retargeting', percentage: 30 },
            { name: 'Digital display', percentage: 20 },
            { name: 'Limited-time offers', percentage: 10 },
          ],
          creative: 'Warm and compelling — new model imagery, limited-allocation offer mechanic, low-friction re-entry via test-drive booking.',
        },
        {
          segment: 'New-to-Brand Enquirers',
          color: '#4db8d8',
          messaging: '"Discover what Meridian feels like from the driver\'s seat."',
          channels: [
            { name: 'Email onboarding', percentage: 45 },
            { name: 'Mobile / app', percentage: 25 },
            { name: 'Social media', percentage: 20 },
            { name: 'Digital display', percentage: 10 },
          ],
          creative: 'Bright and welcoming — first test-drive moment, brand story-forward, low barrier to showroom visit.',
        },
      ]
    : [
        {
          segment: 'Premium Sedan Intenders',
          color: '#7c6bf0',
          messaging: '"The sedan Singapore\'s most discerning drivers have been waiting for."',
          channels: [
            { name: 'Instagram / Meta', percentage: 35 },
            { name: 'Email / CRM', percentage: 30 },
            { name: 'OOH (premium districts)', percentage: 20 },
            { name: 'Digital display', percentage: 15 },
          ],
          creative: 'Aspirational and precise — premium automotive imagery, Orchard / River Valley placement, exclusivity and craftsmanship framing.',
        },
        {
          segment: 'EV Upgrade Shoppers',
          color: '#5b8def',
          messaging: '"Drive electric. Drive smarter. Drive Meridian."',
          channels: [
            { name: 'Social media', percentage: 35 },
            { name: 'Search / intent', percentage: 25 },
            { name: 'Digital display', percentage: 25 },
            { name: 'EDM', percentage: 15 },
          ],
          creative: 'Technology-forward and progressive — EV range and charging imagery, Green Plan incentive callout, challenger brand positioning.',
        },
        {
          segment: 'Family SUV Upgraders',
          color: '#4db8d8',
          messaging: '"Room for every journey. Built for Singapore roads."',
          channels: [
            { name: 'Mobile / app', percentage: 40 },
            { name: 'Digital OOH (family districts)', percentage: 30 },
            { name: 'YouTube pre-roll', percentage: 20 },
            { name: 'Social media', percentage: 10 },
          ],
          creative: 'Warm and family-forward — lifestyle imagery with space and safety emphasis, flexible finance mechanic, Tampines / Bishan placement.',
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
        <div className={`absolute right-2 top-6 flex gap-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Edit2 className="w-3.5 h-3.5 text-[#6b6b6b]" />
          </button>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMoreMenuOpen(!isMoreMenuOpen);
              }}
              className="w-[26px] h-[26px] bg-white border border-[#e5e5e2] rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <MoreVertical className="w-3.5 h-3.5 text-[#6b6b6b]" />
            </button>
            {isMoreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-[30px] z-20 w-44 bg-white border border-[#e5e5e2] rounded-lg shadow-lg py-1">
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PDF
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as CSV
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Export as PNG
                  </button>
                  <div className="my-1 border-t border-[#e5e5e2]" />
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] hover:bg-gray-50 transition-colors">
                    Duplicate
                  </button>
                  <button className="w-full px-4 py-2 text-left font-['Geist',sans-serif] text-[13px] text-[#dc2626] hover:bg-red-50 transition-colors">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

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
