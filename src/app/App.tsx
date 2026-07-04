import { useState } from 'react';
import Sidebar, { type RecentAnalysis } from './components/Sidebar';
import DocumentsPanel from './components/DocumentsPanel';
import ChatPanel from './components/ChatPanel';
import ArtifactPanel from './components/ArtifactPanel';
import DataExplorerPanel from './components/DataExplorerPanel';
import AudienceDetailPanel from './components/AudienceDetailPanel';
import AudienceLibrary from './components/AudienceLibrary';
import AudienceProfileViewer from './components/AudienceProfileViewer';
import CompareFlow, { type SavedAudience } from './components/CompareFlow';
import CreateAudienceFlow from './components/CreateAudienceFlow';
import type { ModuleRef } from './components/ModuleAsk';
import type { AudienceId } from './audienceData';

export type Screen = 'blank' | 'planning' | 'clarifying' | 'insights' | 'profiles' | 'deep-dive' | 'result';

// Audience size map for the named audiences in the Audience Library
const AUDIENCE_SIZE_MAP: Record<string, string> = {
  'a1': '387k',
  'a2': '284k',
  'a3': '218k',
  'a4': '462k',
  'a5': '195k',
  'a6': '148k',
  'a7': '312k',
  'a8': '394k',
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('blank');
  const [onAddTextBlock, setOnAddTextBlock] = useState<((title: string, content: string) => void) | null>(null);
  const [isGeneratingBlock, setIsGeneratingBlock] = useState(false);
  const [entryMode, setEntryMode] = useState<'brief' | 'upload' | null>(null);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [selectedAudienceId, setSelectedAudienceId] = useState<AudienceId | null>(null);
  // Audiences saved from the Data Explorer detail panel — surfaced in the Audiences library.
  const [savedAudienceIds, setSavedAudienceIds] = useState<AudienceId[]>([]);
  const saveAudience = (id: AudienceId) =>
    setSavedAudienceIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const [showDataExplorer, setShowDataExplorer] = useState(false);
  const [showAudiences, setShowAudiences] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [profileViewerId, setProfileViewerId] = useState<string | null>(null);
  const [profileViewerName, setProfileViewerName] = useState<string | null>(null);
  const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>([]);
  const [activeAnalysisId, setActiveAnalysisId] = useState<string | null>(null);
  // Modules pinned into the main chat composer via the inline "Ask" affordance.
  const [chatContext, setChatContext] = useState<ModuleRef[]>([]);

  const addChatContext = (ref: ModuleRef) =>
    setChatContext((prev) => (prev.some((r) => r.id === ref.id) ? prev : [...prev, ref]));
  const removeChatContext = (id: string) =>
    setChatContext((prev) => prev.filter((r) => r.id !== id));

  const [compareActive, setCompareActive] = useState(false);
  const [compareSeed, setCompareSeed] = useState<SavedAudience[]>([]);
  const [comparePrompt, setComparePrompt] = useState('');
  const [createAudienceActive, setCreateAudienceActive] = useState(false);

  const startCreateAudience = () => {
    setCreateAudienceActive(true);
    setShowAudiences(false);
    setShowDocuments(false);
    setCompareActive(false);
    setSelectedAudienceId(null);
    setShowDataExplorer(true); // lights up Data Explorer in the sidebar
    closeDeepDive();
  };
  const exitCreateAudience = () => {
    setCreateAudienceActive(false);
    setShowDataExplorer(false);
    setShowAudiences(true); // back to the Audiences library
  };
  const savedFromCreateAudience = (id: string, name: string) => {
    setCreateAudienceActive(false);
    setShowDataExplorer(false);
    openAudience(id, name); // open the saved audience's full profile
  };

  const startCompare = (seed: SavedAudience[], prompt: string) => {
    setCompareSeed(seed);
    setComparePrompt(prompt);
    setCompareActive(true);
    setShowDataExplorer(false);
    setShowAudiences(false);
    setShowDocuments(false);
  };

  const openAudience = (id: string, name: string) => {
    const size = AUDIENCE_SIZE_MAP[id] ?? '';
    setProfileViewerId(id);
    setProfileViewerName(name);
    setShowAudiences(true);
  };

  const handleNewAnalysis = (type: 'brief' | 'upload', title: string) => {
    const id = `analysis-${Date.now()}`;
    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }) + ' · Today';
    const entry: RecentAnalysis = { id, title, subtitle: type === 'upload' ? 'Upload enrichment' : 'Audience brief', type, timestamp };
    setActiveAnalysisId(id);
    setRecentAnalyses((prev) => [entry, ...prev].slice(0, 8));
  };

  const closeDeepDive = () => {
    setProfileViewerId(null);
    setProfileViewerName(null);
  };

  return (
    <div className="flex h-screen bg-[#fafaf9] overflow-hidden">
      <Sidebar
        showDataExplorer={showDataExplorer}
        onToggleDataExplorer={() => { setShowDataExplorer((v) => !v); setShowAudiences(false); setShowDocuments(false); setCompareActive(false); setCreateAudienceActive(false); closeDeepDive(); }}
        showAudiences={showAudiences}
        onToggleAudiences={() => {
          const next = !showAudiences;
          setShowAudiences(next);
          setShowDataExplorer(false);
          setShowDocuments(false);
          setCompareActive(false);
          setCreateAudienceActive(false);
          if (!next) closeDeepDive();
        }}
        showDocuments={showDocuments}
        onToggleDocuments={() => { setShowDocuments((v) => !v); setShowAudiences(false); setShowDataExplorer(false); setCompareActive(false); setCreateAudienceActive(false); closeDeepDive(); }}
        recentAnalyses={recentAnalyses}
        activeAnalysisId={activeAnalysisId}
        onSelectAnalysis={(id) => setActiveAnalysisId(id)}
      />

      {/* Main content area */}
      {createAudienceActive ? (
        <CreateAudienceFlow
          onExit={exitCreateAudience}
          onSaved={savedFromCreateAudience}
        />
      ) : compareActive ? (
        <CompareFlow
          seed={compareSeed}
          seedPrompt={comparePrompt}
          onExit={() => setCompareActive(false)}
        />
      ) : showDocuments ? (
        <DocumentsPanel />
      ) : showAudiences ? (
        profileViewerId ? (
          <AudienceProfileViewer
            audienceId={profileViewerId}
            audienceName={profileViewerName ?? undefined}
            onBack={closeDeepDive}
          />
        ) : (
          <AudienceLibrary
            onSelectAudience={(id, name) => openAudience(id, name ?? id)}
            onCreateAudience={startCreateAudience}
            savedAudienceIds={savedAudienceIds}
          />
        )
      ) : (
        <ChatPanel
          screen={screen}
          setScreen={setScreen}
          onAddTextBlock={onAddTextBlock}
          setIsGeneratingBlock={setIsGeneratingBlock}
          entryMode={entryMode}
          setEntryMode={setEntryMode}
          setIsAnalysisComplete={setIsAnalysisComplete}
          selectedAudienceId={selectedAudienceId}
          setSelectedAudienceId={setSelectedAudienceId}
          onNewAnalysis={handleNewAnalysis}
          chatContext={chatContext}
          onRemoveChatContext={removeChatContext}
          onClearChatContext={() => setChatContext([])}
          onStartCompare={startCompare}
        />
      )}

      {!createAudienceActive && !compareActive && !showAudiences && !showDocuments && showDataExplorer ? (
        <>
          {/* DataExplorer list — narrows when detail panel is open */}
          <div className={`flex-shrink-0 border-l border-[#d3d3d0] bg-[#f5f5f3] overflow-hidden flex flex-col transition-all duration-200 ${selectedAudienceId ? 'w-[300px]' : 'w-[400px]'}`}>
            <div className="px-5 pt-4 pb-3 border-b border-[#e5e5e2] bg-white flex-shrink-0">
              <p className="font-['Jua',sans-serif] text-[14px] text-[#1a1a1a]">Data Explorer</p>
              <p className="font-['Jua',sans-serif] text-[12px] text-[#999] mt-0.5">Audiences, insights, and documents from this session</p>
            </div>
            <div className="flex-1 overflow-hidden bg-white">
              <DataExplorerPanel
                screen={screen}
                selectedAudienceId={selectedAudienceId}
                onSelectAudience={(id) => {
                  setSelectedAudienceId(selectedAudienceId === id ? null : id);
                }}
              />
            </div>
          </div>

          {/* Audience detail side panel — slides in when an audience is selected */}
          {selectedAudienceId && (
            <div className="w-[420px] flex-shrink-0 border-l border-[#d3d3d0] overflow-hidden flex flex-col bg-white">
              <AudienceDetailPanel
                audienceId={selectedAudienceId}
                screen={screen}
                onClose={() => setSelectedAudienceId(null)}
                onAskInChat={addChatContext}
                onOpenFullPage={(id, name) => { setSelectedAudienceId(null); openAudience(id, name); }}
                isSaved={savedAudienceIds.includes(selectedAudienceId)}
                onSave={saveAudience}
              />
            </div>
          )}
        </>
      ) : !createAudienceActive && !compareActive && !showAudiences && !showDocuments ? (
        <ArtifactPanel
          screen={screen}
          setOnAddTextBlock={setOnAddTextBlock}
          isGeneratingBlock={isGeneratingBlock}
          entryMode={entryMode}
          isAnalysisComplete={isAnalysisComplete}
          selectedAudienceId={selectedAudienceId}
          onOpenFullPage={(id, name) => openAudience(id, name)}
          savedAudienceIds={savedAudienceIds}
          onSaveAudience={saveAudience}
        />
      ) : null}
    </div>
  );
}
