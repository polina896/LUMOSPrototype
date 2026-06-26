import React, { useState, useRef, useEffect } from 'react';
import { Mic, ArrowRight, ScanSearch, ChevronDown, ChevronRight, Paperclip, Users, X, Send, Sparkles } from 'lucide-react';
import DataSourcesPopover from './DataSourcesPopover';
import type { ModuleRef } from './ModuleAsk';

const CLARIFY_QUESTIONS = [
  {
    aiIntro: "Before I run this, a few quick things — which vehicle segments are you prioritising for the Singapore launch?",
    chips: ['Luxury Sedan Buyers', 'Family SUV Shoppers', 'EV Early Adopters', 'First-Time Buyers'],
    multi: false,
    placeholder: 'Or describe the vehicle segment...',
  },
  {
    aiIntro: "What's your primary campaign objective?",
    chips: ['Drive test-drive bookings', 'Build brand awareness in Singapore', 'Win share from competitor brands', 'Grow repeat consideration rate'],
    multi: false,
    placeholder: 'Or describe your objective...',
  },
  {
    aiIntro: "And last one — any other audience segments you'd like to layer in?",
    chips: ['High-income professionals', 'Expat residents', 'Frequent business travellers', 'Upgrade-ready existing owners'],
    multi: true,
    placeholder: 'Or describe additional segments...',
  },
] as const;
import type { Screen } from '../App';
import { AUDIENCES } from '../audienceData';
import type { AudienceId } from '../audienceData';
import AudienceListCard from './AudienceListCard';

// ─── Audience library ─────────────────────────────────────────────────────────

type AudienceTag = 'High Value' | 'Frequent Buyers';

interface SavedAudience {
  id: number;
  category: string;
  name: string;
  tag: AudienceTag;
}

const AUDIENCE_LIBRARY: SavedAudience[] = [
  { id: 1,  category: 'Premium Sedans',               name: 'Luxury Sedan Buyers – High Value',              tag: 'High Value'      },
  { id: 2,  category: 'Premium Sedans',               name: 'Luxury Sedan Buyers – Frequent Buyers',         tag: 'Frequent Buyers' },
  { id: 3,  category: 'Family SUV',                   name: 'Family SUV Shoppers – High Value',              tag: 'High Value'      },
  { id: 4,  category: 'Family SUV',                   name: 'Family SUV Shoppers – Frequent Buyers',         tag: 'Frequent Buyers' },
  { id: 5,  category: 'EV & Hybrid',                  name: 'EV & Hybrid Intenders – High Value',            tag: 'High Value'      },
  { id: 6,  category: 'EV & Hybrid',                  name: 'EV & Hybrid Intenders – Frequent Buyers',       tag: 'Frequent Buyers' },
  { id: 7,  category: 'First-Time Buyers',            name: 'First-Time Buyers – High Value',                tag: 'High Value'      },
  { id: 8,  category: 'First-Time Buyers',            name: 'First-Time Buyers – Frequent Buyers',           tag: 'Frequent Buyers' },
  { id: 9,  category: 'Fleet & Corporate',            name: 'Fleet & Corporate Drivers – High Value',        tag: 'High Value'      },
  { id: 10, category: 'Fleet & Corporate',            name: 'Fleet & Corporate Drivers – Frequent Buyers',   tag: 'Frequent Buyers' },
  { id: 11, category: 'Upgrade Owners',               name: 'Upgrade-Ready Owners – High Value',             tag: 'High Value'      },
  { id: 12, category: 'Upgrade Owners',               name: 'Upgrade-Ready Owners – Lapsed',                 tag: 'Frequent Buyers' },
  { id: 13, category: 'Weekend Lifestyle',            name: 'Weekend Lifestyle Drivers – High Value',        tag: 'High Value'      },
  { id: 14, category: 'Weekend Lifestyle',            name: 'Weekend Lifestyle Drivers – Frequent Buyers',   tag: 'Frequent Buyers' },
  { id: 15, category: 'Performance',                  name: 'Performance Car Buyers – High Value',           tag: 'High Value'      },
  { id: 16, category: 'Performance',                  name: 'Performance Car Buyers – Frequent Buyers',      tag: 'Frequent Buyers' },
  { id: 17, category: 'Car Services',                 name: 'Petrol Station Regulars – Frequent',            tag: 'Frequent Buyers' },
  { id: 18, category: 'Car Services',                 name: 'Car Service Regulars – Loyal',                  tag: 'High Value'      },
  { id: 19, category: 'Finance',                      name: 'Premium Finance Users – High Value',            tag: 'High Value'      },
  { id: 20, category: 'Finance',                      name: 'Trade-In Prospects – Lapsed',                   tag: 'Frequent Buyers' },
  { id: 21, category: 'Professional',                 name: 'High-Income Professionals – High Value',        tag: 'High Value'      },
  { id: 22, category: 'Professional',                 name: 'Expat Residents – High Value',                  tag: 'High Value'      },
  { id: 23, category: 'Travel',                       name: 'Business Frequent Travellers – High Value',     tag: 'High Value'      },
  { id: 24, category: 'Travel',                       name: 'Business Frequent Travellers – Frequent',       tag: 'Frequent Buyers' },
];

const SAVED_AUDIENCES = AUDIENCE_LIBRARY;

function TagBadge({ tag }: { tag: AudienceTag }) {
  const isHighSpenders = tag === 'High Spenders';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-['Geist',sans-serif] font-semibold flex-shrink-0 ${
      isHighSpenders
        ? 'bg-[#fff3e0] text-[#e65100]'
        : 'bg-[#e8f5e9] text-[#2e7d32]'
    }`}>
      {isHighSpenders ? '🏷️' : '🔄'} {tag}
    </span>
  );
}

function AudiencePickerPopup({
  onSelect,
  onClose,
}: {
  onSelect: (audience: SavedAudience) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const filtered = search.trim()
    ? AUDIENCE_LIBRARY.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.category.toLowerCase().includes(search.toLowerCase())
      )
    : AUDIENCE_LIBRARY;

  // Group by category
  const grouped: Record<string, SavedAudience[]> = {};
  for (const a of filtered) {
    if (!grouped[a.category]) grouped[a.category] = [];
    grouped[a.category].push(a);
  }

  const toggleSelect = (a: SavedAudience) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(a.id)) next.delete(a.id); else next.add(a.id);
      return next;
    });
  };

  const handleAdd = () => {
    AUDIENCE_LIBRARY.filter(a => selected.has(a.id)).forEach(a => onSelect(a));
    onClose();
  };

  return (
    <div
      ref={ref}
      className="absolute bottom-full mb-2 left-0 w-[380px] bg-white border border-[#e0e0e0] rounded-xl shadow-xl z-50 overflow-hidden flex flex-col"
      style={{ maxHeight: '420px' }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#f0f0f0] flex items-center justify-between flex-shrink-0">
        <span className="font-['Geist',sans-serif] font-semibold text-[13px] text-[#1a1a1a]">Audience Library</span>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
          <X className="w-3.5 h-3.5 text-[#999]" />
        </button>
      </div>
      {/* Search */}
      <div className="px-3 py-2 border-b border-[#f0f0f0] flex-shrink-0">
        <input
          autoFocus
          type="text"
          placeholder="Search audiences..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-3 py-1.5 bg-[#f5f5f5] rounded-lg font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] outline-none placeholder:text-[#aaa]"
        />
      </div>
      {/* List */}
      <div className="flex-1 overflow-y-auto py-1">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <p className="px-4 pt-2.5 pb-1 font-['Geist',sans-serif] text-[10px] font-semibold text-[#aaa] uppercase tracking-wider">{category}</p>
            {items.map(a => (
              <button
                key={a.id}
                onClick={() => toggleSelect(a)}
                className={`w-full flex items-center gap-3 px-4 py-2 transition-colors text-left ${
                  selected.has(a.id) ? 'bg-[#f0ebff]' : 'hover:bg-[#f8f8f8]'
                }`}
              >
                <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                  selected.has(a.id) ? 'bg-[#7c6bf0] border-[#7c6bf0]' : 'border-[#ccc]'
                }`}>
                  {selected.has(a.id) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="flex-1 font-['Geist',sans-serif] text-[13px] text-[#1a1a1a] truncate">{a.category}</span>
                <TagBadge tag={a.tag} />
              </button>
            ))}
          </div>
        ))}
        {Object.keys(grouped).length === 0 && (
          <p className="px-4 py-6 text-center font-['Geist',sans-serif] text-[13px] text-[#aaa]">No audiences match "{search}"</p>
        )}
      </div>
      {/* Footer */}
      {selected.size > 0 && (
        <div className="px-4 py-3 border-t border-[#f0f0f0] flex items-center justify-between flex-shrink-0 bg-white">
          <span className="font-['Geist',sans-serif] text-[12px] text-[#666]">{selected.size} selected</span>
          <button
            onClick={handleAdd}
            className="px-4 py-1.5 bg-[#7c6bf0] text-white rounded-lg font-['Geist',sans-serif] text-[13px] font-medium hover:bg-[#6a5adf] transition-colors"
          >
            Add to prompt
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface ChatPanelProps {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  onAddTextBlock: ((title: string, content: string) => void) | null;
  setIsGeneratingBlock: (value: boolean) => void;
  entryMode: 'brief' | 'upload' | null;
  setEntryMode: (mode: 'brief' | 'upload' | null) => void;
  setIsAnalysisComplete: (value: boolean) => void;
  selectedAudienceId: AudienceId | null;
  setSelectedAudienceId: (id: AudienceId | null) => void;
  onNewAnalysis?: (type: 'brief' | 'upload', title: string) => void;
  chatContext?: ModuleRef[];
  onRemoveChatContext?: (id: string) => void;
  onClearChatContext?: () => void;
}

// ─── Screen ordering helper ───────────────────────────────────────────────────

const SCREEN_ORDER: Screen[] = ['blank', 'planning', 'clarifying', 'insights', 'profiles', 'deep-dive', 'result'];

function isAtOrAfter(current: Screen, target: Screen): boolean {
  return SCREEN_ORDER.indexOf(current) >= SCREEN_ORDER.indexOf(target);
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ChatPanel({
  screen,
  setScreen,
  onAddTextBlock,
  setIsGeneratingBlock,
  entryMode,
  setEntryMode,
  setIsAnalysisComplete,
  selectedAudienceId,
  setSelectedAudienceId,
  onNewAnalysis,
  chatContext = [],
  onRemoveChatContext,
  onClearChatContext,
}: ChatPanelProps) {
  const [homeTab, setHomeTab] = useState<'brief' | 'upload'>('brief');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  // Clarifying flow (one-by-one floating widget)
  const [showClarifyCard, setShowClarifyCard] = useState(false);
  const [clarifySubmitted, setClarifySubmitted] = useState(false);
  const [clarifyStep, setClarifyStep] = useState(0);
  const [clarifyAnswers, setClarifyAnswers] = useState<string[]>([]);
  const [showScanningBeat, setShowScanningBeat] = useState(false);
  const [showMarketMessage, setShowMarketMessage] = useState(false);
  const [statCardCount, setStatCardCount] = useState(0);
  const [showAudienceCard, setShowAudienceCard] = useState(false);

  // Progressive message visibility
  const [visibleMessages, setVisibleMessages] = useState<{ [key: string]: boolean }>({});

  // Insight cards progressive reveal
  const [insightVisibleCount, setInsightVisibleCount] = useState(0);
  const [showInsightsCTA, setShowInsightsCTA] = useState(false);

  // Profiles section
  const [profilesLoaded, setProfilesLoaded] = useState(false);
  const [showProfilesCTA, setShowProfilesCTA] = useState(false);

  // Deep-dive section
  const [wentDeepDive, setWentDeepDive] = useState(false);
  const [deepDiveLoaded, setDeepDiveLoaded] = useState(false);
  const [showDeepDiveCTA, setShowDeepDiveCTA] = useState(false);

  // Template picker
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Result / messaging
  const [showMessagingButton, setShowMessagingButton] = useState(false);
  const [isGeneratingMessaging, setIsGeneratingMessaging] = useState(false);
  const [messagingComplete, setMessagingComplete] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new content appears
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages, insightVisibleCount, profilesLoaded, deepDiveLoaded, showInsightsCTA, showProfilesCTA, showDeepDiveCTA, showClarifyCard, showMarketMessage, statCardCount, showAudienceCard, clarifyStep, clarifyAnswers]);

  // ── Effects per screen ──────────────────────────────────────────────────────

  useEffect(() => {
    if (screen === 'clarifying') {
      setShowClarifyCard(false);
      setClarifyStep(0);
      setTimeout(() => setShowClarifyCard(true), 900);
    }
  }, [screen === 'clarifying']);

  useEffect(() => {
    if (screen === 'insights') {
      setInsightVisibleCount(0);
      setShowInsightsCTA(false);
      setTimeout(() => setVisibleMessages(prev => ({ ...prev, 'insights-reasoning': true })), 500);
      setTimeout(() => setVisibleMessages(prev => ({ ...prev, 'insights-ai': true })), 1300);
      setTimeout(() => setInsightVisibleCount(1), 2100);
      setTimeout(() => setInsightVisibleCount(2), 2900);
      setTimeout(() => setInsightVisibleCount(3), 3700);
      setTimeout(() => setInsightVisibleCount(4), 4500);
      setTimeout(() => setShowInsightsCTA(true), 5400);
    }
  }, [screen === 'insights']);

  useEffect(() => {
    if (screen === 'profiles') {
      setProfilesLoaded(false);
      setShowProfilesCTA(false);
      setTimeout(() => setVisibleMessages(prev => ({ ...prev, 'profiles-reasoning': true })), 400);
      setTimeout(() => {
        setVisibleMessages(prev => ({ ...prev, 'profiles-ai': true }));
        setProfilesLoaded(true);
      }, 2200);
      setTimeout(() => setShowProfilesCTA(true), 3600);
    }
  }, [screen === 'profiles']);

  useEffect(() => {
    if (screen === 'deep-dive') {
      setDeepDiveLoaded(false);
      setShowDeepDiveCTA(false);
      setTimeout(() => setVisibleMessages(prev => ({ ...prev, 'deepdive-reasoning': true })), 400);
      setTimeout(() => setVisibleMessages(prev => ({ ...prev, 'deepdive-ai': true })), 1200);
      setTimeout(() => setDeepDiveLoaded(true), 2000);
      setTimeout(() => setShowDeepDiveCTA(true), 3200);
    }
  }, [screen === 'deep-dive']);

  useEffect(() => {
    if (screen === 'result') {
      setShowMessagingButton(false);
      setIsGeneratingMessaging(false);
      setMessagingComplete(false);
      setIsAnalysisComplete(false);
      setTimeout(() => setVisibleMessages(prev => ({ ...prev, 'result-message-1': true })), 600);
      setTimeout(() => setVisibleMessages(prev => ({ ...prev, 'result-reasoning': true })), 1800);
      setTimeout(() => {
        setVisibleMessages(prev => ({ ...prev, 'result-message-2': true }));
        setIsAnalysisComplete(true);
        handleMessaging();
      }, 2800);
    }
  }, [screen === 'result']);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleStart = () => {
    setEntryMode(homeTab);
    setIsAnalysisComplete(false);
    const title = homeTab === 'brief'
      ? 'Meridian Motors — Singapore Launch'
      : 'Owner Upload Enrichment';
    onNewAnalysis?.(homeTab, title);
    setVisibleMessages({});
    setShowClarifyCard(false);
    setClarifySubmitted(false);
    setClarifyStep(0);
    setClarifyAnswers([]);
    setShowScanningBeat(false);
    setShowMarketMessage(false);
    setStatCardCount(0);
    setShowAudienceCard(false);
    setWentDeepDive(false);
    setShowTemplatePicker(false);
    setSelectedTemplate(null);
    setScreen('planning');
    if (homeTab === 'brief') {
      setTimeout(() => setScreen('clarifying'), 2000);
    } else {
      // Upload path: skip clarifying, go straight to profiles
      setTimeout(() => {
        setProfilesLoaded(false);
        setShowProfilesCTA(false);
        setScreen('profiles');
        setTimeout(() => setVisibleMessages(prev => ({ ...prev, 'profiles-ai': true })), 500);
        setTimeout(() => setProfilesLoaded(true), 1400);
        setTimeout(() => setShowProfilesCTA(true), 2800);
      }, 2500);
    }
  };

  const handleClarifyStep = (answer: string) => {
    const newAnswers = [...clarifyAnswers, answer];
    setClarifyAnswers(newAnswers);

    if (clarifyStep < 2) {
      setClarifyStep(s => s + 1);
    } else {
      // All 3 answered — begin analysis
      setClarifySubmitted(true);
      setTimeout(() => setShowScanningBeat(true), 400);
      setTimeout(() => {
        setShowScanningBeat(false);
        setShowMarketMessage(true);
      }, 3000);
      setTimeout(() => setStatCardCount(1), 3600);
      setTimeout(() => setStatCardCount(2), 4200);
      setTimeout(() => setStatCardCount(3), 4800);
      setTimeout(() => setShowAudienceCard(true), 6000);
    }
  };

  const handleAudienceConfirm = () => {
    setScreen('profiles');
  };

  const handleContinueToProfiles = () => {
    setInsightVisibleCount(4);
    setShowInsightsCTA(false);
    setScreen('profiles');
  };

  const handleExploreAudiences = () => {
    setWentDeepDive(true);
    setScreen('deep-dive');
  };

  const handleShowTemplatePicker = () => {
    setShowTemplatePicker(true);
    setSelectedAudienceId(null);
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setShowTemplatePicker(false);
    setIsAnalysisComplete(false);
    setScreen('result');
  };

  const handleSkipToResults = () => {
    setSelectedAudienceId(null);
    setIsAnalysisComplete(false);
    setScreen('result');
  };

  const handleDeepDiveContinue = () => {
    setSelectedAudienceId(null);
    setIsAnalysisComplete(false);
    setScreen('result');
  };

  const handleFileSelect = () => {
    setUploadedFile('automotive_audiences.csv');
  };

  const handleMessaging = () => {
    setIsGeneratingMessaging(true);
    setShowMessagingButton(true);
    setIsGeneratingBlock(true);
    setTimeout(() => {
      setVisibleMessages(prev => ({ ...prev, 'messaging-reasoning': true }));
    }, 1200);
    setTimeout(() => {
      setIsGeneratingMessaging(false);
      setMessagingComplete(true);
      setIsGeneratingBlock(false);
      setVisibleMessages(prev => ({ ...prev, 'messaging-complete': true }));
      if (onAddTextBlock) {
        const content =
          entryMode === 'upload'
            ? 'Active Owners show strong repeat-consideration potential — focus on loyalty service benefits and upgrade incentives to maintain brand preference. Lapsed Considerers need re-engagement with a compelling reason to revisit Meridian. New-to-Brand Enquirers require nurture campaigns with a low-commitment first step, such as a complimentary test drive.'
            : 'Premium Sedan Intenders are the highest-affinity segment — lead with precision engineering and aspirational positioning to win consideration from existing premium buyers. EV Upgrade Shoppers are the broadest reach opportunity; technology leadership and Singapore Green Plan messaging drive immediate interest. Family SUV Upgraders have the highest upgrade propensity and respond strongly to safety credentials and family-lifestyle activations.';
        onAddTextBlock('Campaign recommendations', content);
      }
    }, 3500);
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 flex flex-col bg-white">

      {/* ════════ BLANK STATE ════════ */}
      {screen === 'blank' && (
        <div className="flex-1 flex flex-col items-center justify-center px-12">
          <div className="max-w-[680px] w-full space-y-6">
            <div className="text-center space-y-3">
              <h1 className="font-['Geist',sans-serif] font-bold text-[24px] text-black">
                What are you curious about?
              </h1>
              <p className="font-['Geist',sans-serif] text-[16px] text-[#666] leading-relaxed">
                Tap into proprietary location data to unlock key insights about your target audience.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 justify-center">
              {(['brief', 'upload'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setHomeTab(tab); setUploadedFile(null); }}
                  className={`px-5 py-2.5 font-['Geist',sans-serif] text-[14px] font-medium transition-all rounded-full ${
                    homeTab === tab
                      ? 'bg-[#4d6bf0] text-white shadow-md'
                      : 'bg-white text-[#666] border border-[#e0e0e0] hover:border-[#4d6bf0] hover:text-[#4d6bf0]'
                  }`}
                >
                  {tab === 'brief' ? 'Start from scratch' : 'Enrich your audience data'}
                </button>
              ))}
            </div>

            {/* Upload zone */}
            {homeTab === 'upload' && (
              <div className="bg-white border-2 border-dashed border-[#ccc] rounded-lg p-6 hover:border-[#4d6bf0] hover:bg-[#fafafa] transition-all">
                {!uploadedFile ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#f0f0f0] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#666]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-['Geist',sans-serif] font-medium text-[14px] text-[#1a1a1a]">Upload your audience file</p>
                        <p className="font-['Geist',sans-serif] text-[12px] text-[#666]">CSV or Excel with segment names</p>
                      </div>
                    </div>
                    <button onClick={handleFileSelect} className="px-4 py-2 bg-white border border-[#ccc] text-[#1a1a1a] rounded-md font-['Geist',sans-serif] text-[13px] hover:bg-gray-50 transition-colors">
                      Choose file
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#e8f5e9] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#4caf50]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-['Geist',sans-serif] font-medium text-[14px] text-[#1a1a1a]">{uploadedFile}</p>
                        <p className="font-['Geist',sans-serif] text-[12px] text-[#4caf50]">Ready to enrich</p>
                      </div>
                    </div>
                    <button onClick={() => setUploadedFile(null)} className="px-3 py-1.5 text-[#666] rounded-md font-['Geist',sans-serif] text-[13px] hover:bg-gray-100 transition-colors">Remove</button>
                  </div>
                )}
              </div>
            )}

            {/* Input box */}
            <HomeInputBox homeTab={homeTab} uploadedFile={uploadedFile} onStart={handleStart} />

            {/* Suggestion pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {homeTab === 'brief' ? (
                <>
                  <Pill text="Help me find my highest-potential launch audience in Singapore" />
                  <Pill text="Identify new-to-brand intenders for a premium sedan launch" />
                  <Pill text="Help me build a test-drive campaign for Meridian Motors" />
                </>
              ) : (
                <>
                  <Pill text="Help me understand which segments have the most growth potential" />
                  <Pill text="Help me unlock new strategies based on my owner data" />
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ════════ ALL CHAT SCREENS ════════ */}
      {screen !== 'blank' && (
        <div className="flex-1 flex flex-col min-h-0">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8">
            <div className="max-w-[700px] pb-8 space-y-0">

              {/* ── Brief user message ── */}
              {entryMode === 'brief' && (
                <UserMessage text="We are launching Meridian Motors in Singapore and want to identify the best audience segments to target for test-drive bookings and brand awareness. Help me select the right audiences and build campaign recommendations." />
              )}

              {/* ── Upload user message ── */}
              {entryMode === 'upload' && (
                <>
                  <div className="flex justify-end mb-6">
                    <div className="max-w-[85%] bg-[#e7e7e7] rounded-tl-xl rounded-tr-xl rounded-bl-xl px-4 py-3">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-[#666]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span className="font-['Jua',sans-serif] text-[14px] text-black opacity-70">meridian_owners.csv</span>
                      </div>
                      <p className="font-['Jua',sans-serif] text-[14px] text-black opacity-70 leading-relaxed">
                        We have an owner database of 8,400 registered Meridian owners in Singapore with vehicle purchase history over the last 36 months. We want to understand who these owners are — purchase patterns, service frequency, upgrade timing, and who else in the market looks like them.
                      </p>
                    </div>
                  </div>
                  {(screen !== 'planning') && (
                    <AIMessage text="Got it — I can see you've uploaded 3 segments: Active Owners, Lapsed Considerers, and New-to-Brand Shoppers. Enriching these with vehicle registration data, movement patterns, and purchase intent signals." />
                  )}
                </>
              )}

              {/* ── Planning screen: reading brief ── */}
              {screen === 'planning' && (
                <div className="my-6 space-y-3">
                  {entryMode === 'brief' ? (
                    <CollapsibleReasoning
                      summary="Reading the brief — Meridian Motors Singapore launch, automotive category audiences, test-drive and awareness objectives..."
                      steps={['Parsing brief requirements', 'Identifying key vehicle segments', 'Understanding campaign objectives']}
                    />
                  ) : (
                    <div className="space-y-3">
                      <StepIndicator active text="Analyzing uploaded owner segment definitions" />
                      <StepIndicator active={false} text="Enriching with vehicle registration and movement data" />
                      <StepIndicator active={false} text="Pulling purchase frequency and upgrade timing insights per segment" />
                    </div>
                  )}
                </div>
              )}

              {/* ══════════════════════════════════════════════════════════════
                  CLARIFYING FLOW (brief path — one-by-one floating widget)
              ══════════════════════════════════════════════════════════════ */}
              {isAtOrAfter(screen, 'clarifying') && entryMode === 'brief' && (
                <>
                  {/* Reasoning block — persistent */}
                  <CollapsibleReasoning
                    summary="Reading the brief — Meridian Motors Singapore launch, automotive category audiences, test-drive and awareness objectives..."
                    steps={['Parsing brief requirements', 'Identifying key vehicle segments', 'Understanding campaign objectives']}
                  />

                  {/* Q+A pairs — appear one by one as answered */}
                  {showClarifyCard && CLARIFY_QUESTIONS.map((q, i) => {
                    const isReached = i <= clarifyStep;
                    const answer = clarifyAnswers[i];
                    if (!isReached) return null;
                    return (
                      <React.Fragment key={i}>
                        <AIMessage text={q.aiIntro} />
                        {answer && <UserMessage text={answer} />}
                      </React.Fragment>
                    );
                  })}

                  {/* Scanning beat */}
                  {screen === 'clarifying' && showScanningBeat && (
                    <div className="mb-5 flex items-center gap-2">
                      <div className="flex gap-1">
                        {[0, 150, 300].map((d) => (
                          <div key={d} className="w-2 h-2 bg-[#7c6bf0] rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </div>
                      <span className="font-['Jua',sans-serif] text-[14px] text-[#999] italic">Scanning vehicle registration data — purchase frequency, seasonal uplift, automotive category concentration...</span>
                    </div>
                  )}

                  {/* Market summary message */}
                  {(showMarketMessage || isAtOrAfter(screen, 'profiles')) && (
                    <AIMessage text="Here's the market picture. New vehicle registrations in Singapore index 42% above baseline in Q1, with premium sedans the fastest-growing sub-category. Consideration is highly concentrated — the top 30% of intenders account for 74% of total category conversions. And EV Early Adopters trial new brands at 3.8× the rate of the general market. Three segments stand out as the strongest launch targets — I'll define them now." />
                  )}

                  {/* 3 stat insight cards — staggered */}
                  {(statCardCount >= 1 || isAtOrAfter(screen, 'profiles')) && (
                    <MarketStatCard
                      stat="+42% YoY"
                      context="New vehicle registrations in Singapore index 42% above baseline in Q1 — the Jan–Mar window is the highest-potential launch period for Meridian Motors."
                    />
                  )}
                  {(statCardCount >= 2 || isAtOrAfter(screen, 'profiles')) && (
                    <MarketStatCard
                      stat="74% of conversions"
                      context="The top 30% of intenders account for 74% of total category conversions — targeting the right segment matters more than reach."
                    />
                  )}
                  {(statCardCount >= 3 || isAtOrAfter(screen, 'profiles')) && (
                    <MarketStatCard
                      stat="3.8× more likely"
                      context="EV Early Adopters are 3.8× more likely to trial a new automotive brand, driven by technology curiosity and Singapore's Green Plan incentives."
                    />
                  )}

                  {/* Audience segments confirm card */}
                  {(showAudienceCard || isAtOrAfter(screen, 'profiles')) && (
                    <AudienceSegmentsCard
                      onConfirm={isAtOrAfter(screen, 'profiles') ? undefined : handleAudienceConfirm}
                    />
                  )}
                </>
              )}

              {/* Strategic insights section intentionally moved into clarifying flow above */}

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 2: AUDIENCE PROFILES
                  Shown for: profiles, deep-dive, result
              ═══════════════════════════════════════════════════════════════ */}
              {isAtOrAfter(screen, 'profiles') && entryMode === 'brief' && (
                <>
                  <UserMessage text="Yes, proceed with this segmentation" />

                  {/* Reasoning block while analysis runs */}
                  {(screen !== 'profiles' || visibleMessages['profiles-reasoning']) && (
                    <CollapsibleReasoning
                      summary="Running full analysis — building owner profiles, pulling vehicle registration data, behavioural signals..."
                      steps={[
                        'Pulling vehicle registration and transaction distributions per segment',
                        'Identifying upgrade frequency and consideration signals',
                        'Mapping owner geographic concentration across Singapore',
                        'Analysing channel and dealership visit indices',
                        'Confirming audience reach and index estimates',
                      ]}
                    />
                  )}

                  {/* Full analysis done + audience cards */}
                  {(screen !== 'profiles' || visibleMessages['profiles-ai']) && (
                    <AIMessage text="Full analysis done. Here are the 3 Meridian Motors launch audiences I've built — you can save these for more analysis later on." />
                  )}
                  {(screen !== 'profiles' || profilesLoaded) && (
                    <div className="my-5 space-y-3">
                      {AUDIENCES.map((a) => (
                        <AudienceListCard
                          key={a.id}
                          audience={a}
                          onClick={() => setSelectedAudienceId(selectedAudienceId === a.id ? null : a.id)}
                          isSelected={selectedAudienceId === a.id}
                          clickable
                        />
                      ))}
                    </div>
                  )}

                  {/* CTA → template picker */}
                  {(showProfilesCTA && screen === 'profiles') && !showTemplatePicker && !selectedTemplate && (
                    <ProfilesCampaignCTA onProceed={handleShowTemplatePicker} />
                  )}
                  {showTemplatePicker && screen === 'profiles' && (
                    <TemplatePicker onSelect={handleSelectTemplate} />
                  )}
                </>
              )}

              {/* Upload: profiles section */}
              {isAtOrAfter(screen, 'profiles') && entryMode === 'upload' && (
                <>
                  {(screen !== 'profiles' || visibleMessages['profiles-ai']) && (
                    <AIMessage text="I've enriched your 3 uploaded segments with vehicle registration data, movement patterns, and purchase intent signals. Here's what they look like." />
                  )}
                  {(screen !== 'profiles' || profilesLoaded) && (
                    <div className="my-5 space-y-3">
                      {[
                        { name: 'Active Meridian Owners', desc: '4.2K owners · 2+ service visits/year · index 264 vs all registered' },
                        { name: 'Lapsed Considerers', desc: '2.8K owners · <1 dealership visit in last 90 days · index 157 vs all registered' },
                        { name: 'New-to-Brand Enquirers', desc: '1.4K prospects · First Meridian enquiry in last 60 days · index 131 vs all registered' },
                      ].map((seg) => (
                        <UploadSegmentCard key={seg.name} name={seg.name} desc={seg.desc} />
                      ))}
                    </div>
                  )}
                  {showProfilesCTA && screen === 'profiles' && (
                    <CTAExploreCard
                      onExplore={handleExploreAudiences}
                      onSkip={handleSkipToResults}
                    />
                  )}
                </>
              )}

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 3: DEEP-DIVE AUDIENCE CARDS (clickable)
                  Shown for: deep-dive, result
              ═══════════════════════════════════════════════════════════════ */}
              {isAtOrAfter(screen, 'deep-dive') && wentDeepDive && (
                <>
                  <UserMessage text="Yes, explore these audiences in more detail" />
                  {(screen !== 'deep-dive' || visibleMessages['deepdive-reasoning']) && (
                    <CollapsibleReasoning
                      summary="Building full audience profiles — vehicle ownership patterns, consideration signals, channel behaviour, lifestyle overlap..."
                      steps={[
                        'Pulling vehicle registration and ownership distributions per segment',
                        'Identifying upgrade frequency and consideration signals',
                        'Mapping cross-category spend overlap and seasonal patterns',
                        'Analysing dealership and digital channel indices',
                        'Building timing and messaging insights',
                      ]}
                    />
                  )}
                  {(screen !== 'deep-dive' || visibleMessages['deepdive-ai']) && (
                    <AIMessage text="Here's a detailed breakdown of each segment. Click any card to explore the full profile — vehicle ownership patterns, consideration behaviour, channel insights, and messaging thought starters." />
                  )}
                  {(screen !== 'deep-dive' || deepDiveLoaded) && (
                    <div className="my-5 space-y-3">
                      {AUDIENCES.map((a) => (
                        <AudienceListCard
                          key={a.id}
                          audience={a}
                          onClick={() => setSelectedAudienceId(selectedAudienceId === a.id ? null : a.id)}
                          isSelected={selectedAudienceId === a.id}
                          clickable
                        />
                      ))}
                    </div>
                  )}
                  {showDeepDiveCTA && screen === 'deep-dive' && !showTemplatePicker && !selectedTemplate && (
                    <div className="mt-4 mb-2">
                      <button
                        onClick={handleShowTemplatePicker}
                        className="flex items-center gap-2 px-5 py-3 bg-[#7c6bf0] text-white rounded-xl font-['Geist',sans-serif] text-[14px] font-medium hover:bg-[#6a5adf] transition-colors shadow-sm"
                      >
                        Continue to campaign recommendations
                        <span className="text-[16px]">→</span>
                      </button>
                    </div>
                  )}
                  {showTemplatePicker && screen === 'deep-dive' && (
                    <TemplatePicker onSelect={handleSelectTemplate} />
                  )}
                </>
              )}

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 4: RESULT / CAMPAIGN RECOMMENDATIONS
              ═══════════════════════════════════════════════════════════════ */}
              {screen === 'result' && (
                <>
                  <UserMessage text={
                    selectedTemplate
                      ? `Use the ${OUTPUT_TEMPLATES.find(t => t.id === selectedTemplate)?.title ?? 'Campaign Strategy Brief'} template`
                      : 'Continue to campaign recommendations'
                  } />

                  {visibleMessages['result-message-1'] && (
                    <AIMessage text="Running the full analysis now — identifying consideration concentration by segment, building detailed owner profiles, and pulling Q1 uplift signals." />
                  )}
                  {visibleMessages['result-reasoning'] && (
                    <CollapsibleReasoning
                      summary="Cross-referencing vehicle registration data across segments and Singapore planning areas..."
                      steps={[
                        'Identifying high-value automotive buyers by purchase frequency and spend',
                        'Analysing Q1 seasonal uplift patterns',
                        'Segmenting by vehicle ownership behaviour and category',
                        'Confirming audience definitions and index scores',
                        'Analysing geographic concentration and growth trends',
                        'Building campaign-ready owner profiles',
                      ]}
                    />
                  )}
                  {visibleMessages['result-message-2'] && (
                    <AIMessage text="Done. The three segments show distinct ownership behaviours and different Q1 uplift trajectories. I'll add campaign recommendations for each segment now." />
                  )}

                  {/* Messaging generation flow */}
                  {!showMessagingButton && (
                    <div className="mt-4 space-y-3 my-6">
                      <StepIndicator active text="Analysing competitive positioning per segment" />
                      <StepIndicator active={false} text="Identifying campaign angles and channels" />
                      <StepIndicator active={false} text="Generating creative recommendations" />
                    </div>
                  )}
                  {visibleMessages['messaging-reasoning'] && !messagingComplete && (
                    <div className="mb-6 flex items-center gap-2">
                      <div className="flex gap-1">
                        {[0, 150, 300].map((d) => (
                          <div key={d} className="w-2 h-2 bg-[#7c6bf0] rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </div>
                      <span className="font-['Jua',sans-serif] text-[14px] text-[#999] italic">Building messaging angles for each segment based on ownership behaviour and seasonal patterns...</span>
                    </div>
                  )}
                  {messagingComplete && visibleMessages['messaging-complete'] && (
                    <>
                      <CollapsibleReasoning
                        summary="Analysing consideration drivers: premium sedan intent vs. EV curiosity vs. family upgrade need..."
                        steps={['Analysing owner consideration positioning per segment', 'Identifying campaign angles and channels', 'Generating creative recommendations']}
                      />
                      <AIMessage text="Campaign recommendations added to the analysis — messaging angles, channel mix, and creative direction for each segment." />
                      <StrategyDocCard entryMode={entryMode} />
                      <AIMessageFooter />
                      <FollowUpQuestions entryMode={entryMode} />
                    </>
                  )}
                </>
              )}

            </div>
          </div>

          {/* Floating clarify widget — sits above the input bar */}
          {screen === 'clarifying' && showClarifyCard && !clarifySubmitted && (
            <div className="px-8 pb-3">
              <div className="max-w-[700px]">
                <FloatingClarifyWidget
                  key={clarifyStep}
                  step={clarifyStep}
                  onSubmit={handleClarifyStep}
                />
              </div>
            </div>
          )}

          {/* Input bar */}
          <div className="px-8 py-5 border-t border-gray-200">
            <div className="max-w-[700px]">
              <InputBar
                placeholder="Reply to Lumos"
                contextRefs={chatContext}
                onRemoveContext={onRemoveChatContext}
                onClearContext={onClearChatContext}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end mb-6">
      <div className="max-w-[85%] bg-[#e7e7e7] rounded-tl-xl rounded-tr-xl rounded-bl-xl px-4 py-3">
        <p className="font-['Jua',sans-serif] text-[14px] text-black opacity-70 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function AIMessage({ text }: { text: string }) {
  return (
    <div className="mb-6">
      <p className="font-['Jua',sans-serif] text-[16px] text-[#140934] leading-relaxed">{text}</p>
    </div>
  );
}

function StepIndicator({ active, text }: { active?: boolean; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2.5 h-2.5 rounded-full ${active ? 'bg-[#4d6bf0]' : 'border-2 border-[#bababa]'}`} />
      <span className="font-['Jua',sans-serif] text-[16px] text-[#5e6375]">{text}</span>
    </div>
  );
}

function CollapsibleReasoning({ summary, steps }: { summary: string; steps: string[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="my-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-4 py-2 bg-[#f5f5f5] rounded-lg hover:bg-[#ebebeb] transition-colors w-full text-left"
      >
        {isExpanded ? <ChevronDown className="w-4 h-4 text-[#666] flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-[#666] flex-shrink-0" />}
        <span className="font-['Jua',sans-serif] text-[14px] text-[#666] italic">{summary}</span>
      </button>
      {isExpanded && (
        <div className="mt-3 ml-6 space-y-2 pl-4 border-l-2 border-[#e5e5e5]">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#7c6bf0]" />
              <span className="font-['Jua',sans-serif] text-[14px] text-[#5e6375]">{step}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CTAExploreCard({
  onExplore,
  onSkip,
}: {
  onExplore: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="my-6 bg-[#f8f7ff] border border-[#e0d9ff] rounded-xl p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 bg-[#ede9ff] rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-[#7c6bf0]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <div>
          <p className="font-['Geist',sans-serif] font-semibold text-[15px] text-[#1a1a1a] mb-1">
            Want to explore these audiences further?
          </p>
          <p className="font-['Jua',sans-serif] text-[14px] text-[#666] leading-relaxed">
            I can build detailed profiles for each segment — demographics, lifestyle signals, channel consumption, competitor overlap, and messaging thought starters.
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onExplore}
          className="px-4 py-2.5 bg-[#7c6bf0] text-white rounded-lg font-['Geist',sans-serif] text-[14px] font-medium hover:bg-[#6a5adf] transition-colors"
        >
          Yes, explore in detail
        </button>
        <button
          onClick={onSkip}
          className="px-4 py-2.5 bg-white border border-[#ccc] text-[#666] rounded-lg font-['Geist',sans-serif] text-[14px] hover:bg-gray-50 transition-colors"
        >
          Skip to campaign recommendations
        </button>
      </div>
    </div>
  );
}

function UploadSegmentCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-white border border-[#e8e8e8] rounded-xl p-4 flex items-center gap-4">
      <div className="w-10 h-10 bg-[#efeafc] rounded-lg flex items-center justify-center flex-shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#6C4CD6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="7" r="4" stroke="#6C4CD6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#6C4CD6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#6C4CD6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-['Nunito_Sans',sans-serif] text-[16px] text-[#2a2433]" style={{ fontVariationSettings: '"YTLC" 500' }}>{name}</p>
        <p className="font-['Nunito_Sans',sans-serif] font-bold text-[11px] text-[#8a8494] mt-0.5" style={{ fontVariationSettings: '"YTLC" 500' }}>{desc}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none"><path d="M0 0V10L4 7L8 10V0H0Z" fill="#8A8494" /></svg>
          <span className="font-['Nunito_Sans',sans-serif] font-bold text-[10px] text-[#8a8494]">Enriched segment · MC Data & Services</span>
        </div>
      </div>
      <span className="font-['Nunito_Sans',sans-serif] font-bold text-[11px] text-[#5b3fc4] whitespace-nowrap flex-shrink-0">View profile ↗</span>
    </div>
  );
}

// ── Floating clarify widget (floats above input bar, one question at a time) ──

function FloatingClarifyWidget({
  step,
  onSubmit,
}: {
  step: number;
  onSubmit: (answer: string) => void;
}) {
  const q = CLARIFY_QUESTIONS[step];
  const [chipSel, setChipSel] = useState('');
  const [multiSel, setMultiSel] = useState<string[]>([]);
  const [typed, setTyped] = useState('');

  const effectiveAnswer = q.multi
    ? multiSel.length > 0 ? multiSel.join(', ') : typed.trim()
    : chipSel || typed.trim();

  const canSubmit = effectiveAnswer.length > 0;

  const handleChip = (chip: string) => {
    if (q.multi) {
      setMultiSel(prev => prev.includes(chip) ? prev.filter(x => x !== chip) : [...prev, chip]);
    } else {
      setChipSel(prev => prev === chip ? '' : chip);
      setTyped('');
    }
  };

  const handleTyped = (val: string) => {
    setTyped(val);
    if (!q.multi) setChipSel('');
  };

  const handleSubmit = () => {
    if (canSubmit) onSubmit(effectiveAnswer);
  };

  return (
    <div className="bg-white border border-[#e0d8f8] rounded-2xl shadow-[0_4px_24px_rgba(115,45,147,0.10)] overflow-hidden">
      {/* Step indicator */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 border-b border-[#f4f0fb]">
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i < step ? 'w-4 bg-[#732d93]' : i === step ? 'w-6 bg-[#732d93]' : 'w-4 bg-[#e5e0f0]'
              }`}
            />
          ))}
        </div>
        <span className="font-['Jua',sans-serif] text-[11px] text-[#aaa]">Question {step + 1} of 3</span>
      </div>

      <div className="px-5 pt-4 pb-5">
        {/* Chip options */}
        <div className="flex flex-wrap gap-2 mb-4">
          {q.chips.map(chip => {
            const active = q.multi ? multiSel.includes(chip as string) : chipSel === chip;
            return (
              <button
                key={chip}
                onClick={() => handleChip(chip as string)}
                className={`px-3 py-1.5 rounded-full font-['Jua',sans-serif] text-[12px] border transition-all ${
                  active
                    ? 'bg-[#732d93] border-[#732d93] text-white'
                    : 'bg-white border-[#ddd] text-[#555] hover:border-[#732d93] hover:text-[#732d93]'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* Text input row */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={typed}
            onChange={e => handleTyped(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
            placeholder={q.placeholder}
            className="flex-1 px-3.5 py-2.5 bg-[#faf9ff] border border-[#e8e4f4] rounded-xl font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] outline-none focus:border-[#732d93] placeholder:text-[#c0b8d0] transition-colors"
          />
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-['Jua',sans-serif] text-[13px] transition-all flex-shrink-0 ${
              canSubmit
                ? 'bg-[#732d93] text-white hover:bg-[#5c2375]'
                : 'bg-[#f0edf7] text-[#c0b0d0] cursor-not-allowed'
            }`}
          >
            {step < 2 ? 'Next' : 'Run analysis'}
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MarketStatCard({ stat, context }: { stat: string; context: string }) {
  return (
    <div className="mb-2 bg-white border border-[#eeebf5] rounded-xl overflow-hidden flex">
      <div className="w-[30%] flex-shrink-0 flex items-center justify-center px-4 py-4 bg-[#faf8ff]">
        <span className="font-['Jua',sans-serif] text-[#732d93] leading-tight text-center" style={{ fontSize: '22px' }}>{stat}</span>
      </div>
      <div className="w-[70%] flex items-center px-4 py-4 border-l border-[#eeebf5]">
        <p className="font-['Jua',sans-serif] text-[13px] text-[#666] leading-relaxed">{context}</p>
      </div>
    </div>
  );
}

function AudienceSegmentsCard({ onConfirm }: { onConfirm?: () => void }) {
  const segments = [
    {
      name: 'Premium Sedan Intenders',
      desc: 'Ages 28–50, SGD $120k+ HHI, 1–2 vehicle purchases in last 5 years. Strong brand loyalty with high receptiveness to premium features. Peaks around year-end bonuses and Chinese New Year. Index 245.',
    },
    {
      name: 'EV Upgrade Shoppers',
      desc: 'Ages 25–45, SGD $95k+ HHI, current hybrid or EV owner. Actively comparing next-gen EVs. Highest new-brand consideration rate. Strong Q1 and post-Budget purchase behaviour. Index 212.',
    },
    {
      name: 'Family SUV Upgraders',
      desc: 'Ages 30–48, SGD $85k+ HHI, current MPV or mid-size SUV owner. Upgrade trigger linked to family growth or school-zone relocation. Index 188.',
    },
  ];

  return (
    <div className="mb-5">
      <AIMessage text="I've identified three core audience segments for Meridian Motors based on vehicle ownership patterns, brand consideration, and upgrade propensity:" />
      <div className="mb-4 bg-white border border-[#e8e4f4] rounded-2xl overflow-hidden">
        {segments.map((s, i) => (
          <div key={s.name} className={`px-5 py-3.5 ${i < segments.length - 1 ? 'border-b border-[#f0edf8]' : ''}`}>
            <p className="font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] mb-0.5">{s.name}</p>
            <p className="font-['Jua',sans-serif] text-[12px] text-[#777] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      {onConfirm && (
        <>
          <AIMessage text="Does this segmentation look right? I'll proceed with full analysis if you confirm." />
          <div className="flex gap-3 mt-3 mb-2">
            <button
              onClick={onConfirm}
              className="px-4 py-2.5 bg-[#732d93] text-white rounded-xl font-['Jua',sans-serif] text-[13px] hover:bg-[#5c2375] transition-colors"
            >
              Yes, proceed with this segmentation
            </button>
            <button className="px-4 py-2.5 bg-white border border-[#ddd] text-[#555] rounded-xl font-['Jua',sans-serif] text-[13px] hover:bg-gray-50 transition-colors">
              Refine segments
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Template picker ──────────────────────────────────────────────────────────

const OUTPUT_TEMPLATES = [
  {
    id: 'campaign-strategy',
    icon: '📣',
    title: 'Campaign Strategy Brief',
    goodFor: 'Planning integrated media campaigns and creative direction across channels.',
    sections: [
      'Audience overview & sizing',
      'Channel mix & media weighting',
      'Messaging angles by segment',
      'Timing & seasonality calendar',
      'Creative direction thought starters',
    ],
  },
  {
    id: 'insight-report',
    icon: '📊',
    title: 'Executive Insight Report',
    goodFor: 'Stakeholder presentations and leadership briefings with clear opportunity sizing.',
    sections: [
      'Executive summary',
      'Audience profiles & index scores',
      'Demographic & behavioural breakdown',
      'Market opportunity sizing',
      'Strategic recommendations',
    ],
  },
  {
    id: 'conquest-plan',
    icon: '🎯',
    title: 'Conquest Activation Plan',
    goodFor: 'Identifying competitor brand switchers and new-to-brand conquest opportunities.',
    sections: [
      'Competitive brand landscape',
      'Switching opportunity analysis',
      'Conquest segment priorities',
      'Activation tactics per segment',
      'Budget allocation guidance',
    ],
  },
  {
    id: 'launch-playbook',
    icon: '🚀',
    title: 'Launch Playbook',
    goodFor: 'End-to-end launch planning with test-drive events, timing and success metrics.',
    sections: [
      'Launch objectives & KPIs',
      'Segment prioritisation matrix',
      'Channel activation plan',
      'Test-drive event strategy',
      'Success metrics & measurement',
    ],
  },
];

function TemplatePicker({ onSelect }: { onSelect: (id: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="mb-6">
      <AIMessage text="Before I build the analysis — which format works best for your needs? Each template structures the output differently." />
      <div className="grid grid-cols-2 gap-3 mt-3">
        {OUTPUT_TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            onMouseEnter={() => setHovered(t.id)}
            onMouseLeave={() => setHovered(null)}
            className="relative text-left bg-white border border-[#e5e5e2] rounded-2xl p-4 hover:border-[#732d93] hover:shadow-md transition-all group overflow-hidden"
          >
            {/* Hover highlight */}
            <div className={`absolute inset-0 bg-[#f9f4ff] transition-opacity duration-150 ${hovered === t.id ? 'opacity-100' : 'opacity-0'}`} />

            <div className="relative z-10">
              {/* Icon + title */}
              <div className="flex items-start gap-2.5 mb-2">
                <span className="text-[20px] leading-none mt-0.5 shrink-0">{t.icon}</span>
                <span className="font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] leading-[18px] group-hover:text-[#732d93] transition-colors">{t.title}</span>
              </div>

              {/* Good for — always visible */}
              <p className="font-['Jua',sans-serif] text-[11px] text-[#777] leading-[16px] mb-3">{t.goodFor}</p>

              {/* Sections — revealed on hover */}
              <div className={`overflow-hidden transition-all duration-200 ${hovered === t.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="font-['Jua',sans-serif] text-[9px] uppercase tracking-[0.8px] text-[#9a9a9a] mb-1.5">AI will output</p>
                <div className="flex flex-col gap-1">
                  {t.sections.map((s) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-[#b89fc4] shrink-0" />
                      <span className="font-['Jua',sans-serif] text-[11px] text-[#555]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA hint */}
              <div className={`mt-3 transition-all duration-150 ${hovered === t.id ? 'opacity-100' : 'opacity-0'}`}>
                <span className="font-['Jua',sans-serif] text-[11px] text-[#732d93]">Use this template →</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProfilesCampaignCTA({ onProceed }: { onProceed: () => void }) {
  return (
    <div className="mb-6">
      <AIMessage text="If you're happy with these, I can create a campaign recommendation off the back of these audiences." />
      <div className="flex gap-3 mt-3">
        <button
          onClick={onProceed}
          className="px-5 py-2.5 bg-[#732d93] text-white rounded-xl font-['Jua',sans-serif] text-[13px] hover:bg-[#5c2375] transition-colors"
        >
          Create campaign recommendations →
        </button>
        <button className="px-5 py-2.5 bg-white border border-[#ddd] text-[#555] rounded-xl font-['Jua',sans-serif] text-[13px] hover:bg-gray-50 transition-colors">
          Refine audiences
        </button>
      </div>
    </div>
  );
}

function StrategyDocCard({ entryMode }: { entryMode: 'brief' | 'upload' | null }) {
  const title = entryMode === 'upload'
    ? 'Meridian Motors Singapore — Upload Analysis'
    : 'Meridian Motors Singapore — Audience Strategy';
  const meta = entryMode === 'upload'
    ? '3 enriched segments · Campaign recommendations · Owner analysis'
    : '3 audience segments · Campaign recommendations · Registration analysis';

  return (
    <div className="my-5 bg-white border border-[#e0d4ff] rounded-xl overflow-hidden shadow-sm">
      {/* Doc header strip */}
      <div className="bg-[#732d93] px-4 py-2.5 flex items-center gap-2">
        <svg className="w-4 h-4 text-white/80 flex-shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
        </svg>
        <span className="font-['Jua',sans-serif] text-[12px] text-white/80 uppercase tracking-wide">Strategy Document</span>
      </div>
      {/* Doc preview body */}
      <div className="px-4 py-3.5">
        <p className="font-['Jua',sans-serif] text-[15px] text-[#1a1a1a] mb-1">{title}</p>
        <p className="font-['Jua',sans-serif] text-[12px] text-[#888] mb-3">{meta}</p>
        {/* Mini doc preview blocks */}
        <div className="space-y-1.5 mb-4 pl-1">
          {['AI Summary', 'Geographic Concentration', 'Top 3 Audiences by Reach', 'Campaign Recommendations'].map((section) => (
            <div key={section} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#bbaaf0] flex-shrink-0" />
              <span className="font-['Jua',sans-serif] text-[11px] text-[#777]">{section}</span>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#f5eeff] hover:bg-[#ece0ff] text-[#732d93] rounded-lg font-['Jua',sans-serif] text-[13px] transition-colors w-full justify-center">
          View strategy doc
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function AIMessageFooter() {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Copy">
          <svg className="w-4 h-4 text-[#999]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </button>
      </div>
      <div className="relative">
        <DataSourcesPopover label="5 data sources analysed" openUpward={true} />
      </div>
      <div className="flex items-center gap-2">
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Good response">
          <svg className="w-4 h-4 text-[#999]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
          </svg>
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Bad response">
          <svg className="w-4 h-4 text-[#999]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function FollowUpQuestions({ entryMode }: { entryMode: 'brief' | 'upload' | null }) {
  const briefQuestions = [
    'Tell me more about Premium Sedan Intenders — what their vehicle consideration journey looks like across the quarter',
    'Go deeper on campaign recommendations by channel, timing, and offer mechanics',
    'Help me create a strategic doc that I can share with stakeholders',
  ];
  const uploadQuestions = [
    'Tell me more about Active Meridian Owners — which vehicle categories they over-index on',
    'Go deeper on re-engagement strategies for Lapsed Considerers',
    'Help me create a strategic doc that I can share with stakeholders',
  ];
  const questions = entryMode === 'brief' ? briefQuestions : uploadQuestions;

  return (
    <div className="mt-8 mb-4">
      <h3 className="font-['Geist',sans-serif] text-[14px] font-medium text-[#1a1a1a] mb-3">Follow-ups</h3>
      <div className="space-y-2">
        {questions.map((q, i) => (
          <button key={i} className="flex items-start gap-2 w-full text-left p-3 bg-[#f8f8f8] rounded-lg hover:bg-[#efefef] transition-colors">
            <span className="text-[#999] text-[14px] mt-0.5 flex-shrink-0">↪</span>
            <span className="font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] leading-relaxed">{q}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <button className="px-3 py-1.5 bg-white border border-[#edeff3] rounded-full hover:border-[#7c6bf0] hover:bg-[#fafafa] transition-colors">
      <span className="font-['DM_Sans',sans-serif] font-semibold text-[10px] text-[#1a1a1a]">{text}</span>
    </button>
  );
}

function InputBar({
  placeholder,
  contextRefs = [],
  onRemoveContext,
  onClearContext,
}: {
  placeholder: string;
  contextRefs?: ModuleRef[];
  onRemoveContext?: (id: string) => void;
  onClearContext?: () => void;
}) {
  const [showAudiencePicker, setShowAudiencePicker] = useState(false);
  const [addedAudiences, setAddedAudiences] = useState<typeof SAVED_AUDIENCES>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // When a module is pinned from the output, focus the composer so the user can
  // just start typing their question about it.
  useEffect(() => {
    if (contextRefs.length > 0) inputRef.current?.focus();
  }, [contextRefs.length]);

  return (
    <div className="bg-white border border-[#ccc] rounded-lg shadow-sm">
      {/* Quoted modules pinned via the inline "Ask" affordance */}
      {contextRefs.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-3 pt-2.5 pb-1">
          {contextRefs.map((r) => (
            <span key={r.id} className="flex items-center gap-2 pl-1.5 pr-2 py-1.5 bg-[#6b3c72] rounded-[8px] shadow-sm">
              <span className="w-[22px] h-[22px] rounded-[6px] bg-white/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-3 h-3 text-white" />
              </span>
              <span className="flex flex-col leading-[1.15] min-w-0">
                <span className="font-['Jua',sans-serif] text-[12px] text-white truncate">{r.label}</span>
                <span className="font-['Jua',sans-serif] text-[10px] text-white/70 truncate">{[r.audience, ...r.state].join(' · ')}</span>
              </span>
              <button onClick={() => onRemoveContext?.(r.id)} className="ml-1 hover:opacity-80 shrink-0" title="Remove">
                <X className="w-3.5 h-3.5 text-white/80" />
              </button>
            </span>
          ))}
        </div>
      )}
      {addedAudiences.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-3 pt-2.5 pb-1">
          {addedAudiences.map((a) => (
            <span key={a.id} className="flex items-center gap-1.5 px-2.5 py-1 bg-[#ede9ff] rounded-full">
              <span className="font-['Geist',sans-serif] text-[12px] text-[#7c6bf0] font-medium">{a.category}</span>
              <TagBadge tag={a.tag} />
              <button onClick={() => setAddedAudiences((prev) => prev.filter((x) => x.id !== a.id))} className="ml-0.5 hover:opacity-70">
                <X className="w-3 h-3 text-[#7c6bf0]" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="px-4 py-3">
        <input ref={inputRef} type="text" placeholder={contextRefs.length > 0 ? `Ask about ${contextRefs.length === 1 ? `“${contextRefs[0].label}”` : `${contextRefs.length} sections`}…` : placeholder} className="w-full font-['Jua',sans-serif] text-[14px] text-black outline-none placeholder:text-[#999] placeholder:opacity-50" />
      </div>
      <div className="flex items-center justify-between px-2 pb-2">
        <div className="relative">
          <button
            onClick={() => setShowAudiencePicker((v) => !v)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-[#f3f0ff] rounded-lg transition-colors"
          >
            <Users className="w-4 h-4 text-[#7c6bf0]" />
            <span className="font-['Geist',sans-serif] text-[13px] text-[#7c6bf0] font-medium">Add audience</span>
          </button>
          {showAudiencePicker && (
            <AudiencePickerPopup
              onSelect={(a) => setAddedAudiences((prev) => (prev.find((x) => x.id === a.id) ? prev : [...prev, a]))}
              onClose={() => setShowAudiencePicker(false)}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded transition-colors">
            <ScanSearch className="w-4 h-4 text-[#797F8A]" />
            <span className="font-['Jua',sans-serif] text-[14px] text-[#2e2e2e]">Explore</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <Paperclip className="w-4 h-4 text-[#595959]" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <Mic className="w-4 h-4 text-[#595959]" />
          </button>
          <button
            onClick={() => { if (inputRef.current) inputRef.current.value = ''; onClearContext?.(); }}
            className="p-2.5 bg-[#4d6bf0] opacity-30 rounded-full hover:opacity-50 transition-opacity"
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function HomeInputBox({
  homeTab,
  uploadedFile,
  onStart,
}: {
  homeTab: 'brief' | 'upload';
  uploadedFile: string | null;
  onStart: () => void;
}) {
  const [showAudiencePicker, setShowAudiencePicker] = useState(false);
  const [addedAudiences, setAddedAudiences] = useState<typeof SAVED_AUDIENCES>([]);

  return (
    <div className="bg-white border border-[#ccc] rounded-lg shadow-[0px_0px_30px_rgba(95,49,0,0.08)] p-4">
      {addedAudiences.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-2 pt-1 pb-2">
          {addedAudiences.map((a) => (
            <span key={a.id} className="flex items-center gap-1.5 px-2.5 py-1 bg-[#ede9ff] rounded-full">
              <span className="font-['Geist',sans-serif] text-[12px] text-[#7c6bf0] font-medium">{a.category}</span>
              <TagBadge tag={a.tag} />
              <button onClick={() => setAddedAudiences((prev) => prev.filter((x) => x.id !== a.id))} className="ml-0.5 hover:opacity-70">
                <X className="w-3 h-3 text-[#7c6bf0]" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="px-2 py-3">
        <textarea
          key={homeTab}
          rows={3}
          placeholder={homeTab === 'brief' ? 'Describe your audience challenge or goal...' : 'Add context or instructions for the enrichment...'}
          defaultValue={
            homeTab === 'brief'
              ? 'We are launching Meridian Motors in Singapore and want to identify the best audience segments to target for test-drive bookings and brand awareness. Help me select the right audiences and build campaign recommendations.'
              : 'We have an owner database of 8,400 registered Meridian owners in Singapore with vehicle purchase history over the last 36 months. We want to understand who these owners are — purchase patterns, service frequency, upgrade timing, and who else in the market looks like them.'
          }
          className="w-full font-['Jua',sans-serif] text-[14px] text-black outline-none placeholder:text-[#999] resize-none"
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="relative">
          <button
            onClick={() => setShowAudiencePicker((v) => !v)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-[#f3f0ff] rounded-lg transition-colors"
          >
            <Users className="w-4 h-4 text-[#7c6bf0]" />
            <span className="font-['Geist',sans-serif] text-[13px] text-[#7c6bf0] font-medium">Add audience</span>
          </button>
          {showAudiencePicker && (
            <AudiencePickerPopup
              onSelect={(a) => setAddedAudiences((prev) => (prev.find((x) => x.id === a.id) ? prev : [...prev, a]))}
              onClose={() => setShowAudiencePicker(false)}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <Paperclip className="w-4 h-4 text-[#595959]" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <Mic className="w-4 h-4 text-[#595959]" />
          </button>
          <button
            onClick={onStart}
            disabled={homeTab === 'upload' && !uploadedFile}
            className={`p-2.5 rounded-full transition-colors ${
              homeTab === 'upload' && !uploadedFile ? 'bg-[#d0d0d0] cursor-not-allowed' : 'bg-[#4d6bf0] hover:bg-[#3d5be0]'
            }`}
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
