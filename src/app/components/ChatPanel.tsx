import React, { useState, useRef, useEffect } from 'react';
import { Mic, ArrowRight, ScanSearch, ChevronDown, ChevronRight, Paperclip, Users, X, Send, Sparkles, Check } from 'lucide-react';
import DataSourcesPopover from './DataSourcesPopover';
import type { ModuleRef } from './ModuleAsk';

const CLARIFY_QUESTIONS = [
  {
    aiIntro: "Before we dive into the data, I'd like to understand the outcome you're working towards — what are you trying to do?",
    chips: ['Understand my existing customers', 'Find new customer opportunities', 'Decide where to advertise', 'Compare against competitors', 'Build a customer persona'],
    multi: true,
    placeholder: 'Or describe the outcome in your own words...',
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
  { id: 1,  category: 'Bulk Grocery',                 name: 'Big-Basket Households – High Value',            tag: 'High Value'      },
  { id: 2,  category: 'Bulk Grocery',                 name: 'Big-Basket Households – Frequent Buyers',       tag: 'Frequent Buyers' },
  { id: 3,  category: 'Family Households',            name: 'Large Family Shoppers – High Value',            tag: 'High Value'      },
  { id: 4,  category: 'Family Households',            name: 'Large Family Shoppers – Frequent Buyers',       tag: 'Frequent Buyers' },
  { id: 5,  category: 'Warehouse Club',               name: 'Existing Club Members – High Value',            tag: 'High Value'      },
  { id: 6,  category: 'Warehouse Club',               name: 'Existing Club Members – Frequent Buyers',       tag: 'Frequent Buyers' },
  { id: 7,  category: 'New Movers',                   name: 'New-Build Movers – High Value',                 tag: 'High Value'      },
  { id: 8,  category: 'New Movers',                   name: 'New-Build Movers – Frequent Buyers',            tag: 'Frequent Buyers' },
  { id: 9,  category: 'Small Business',               name: 'Café & Small Business Buyers – High Value',     tag: 'High Value'      },
  { id: 10, category: 'Small Business',               name: 'Café & Small Business Buyers – Frequent',       tag: 'Frequent Buyers' },
  { id: 11, category: 'Lapsed Members',               name: 'Lapsed Members – High Value',                   tag: 'High Value'      },
  { id: 12, category: 'Lapsed Members',               name: 'Lapsed Members – Never Redeemed',               tag: 'Frequent Buyers' },
  { id: 13, category: 'Weekend Shoppers',             name: 'Saturday Big-Shop Households – High Value',     tag: 'High Value'      },
  { id: 14, category: 'Weekend Shoppers',             name: 'Saturday Big-Shop Households – Frequent',       tag: 'Frequent Buyers' },
  { id: 15, category: 'Premium Grocery',              name: 'Premium & Entertaining Buyers – High Value',    tag: 'High Value'      },
  { id: 16, category: 'Premium Grocery',              name: 'Premium & Entertaining Buyers – Frequent',      tag: 'Frequent Buyers' },
  { id: 17, category: 'Fuel & Convenience',           name: 'Fuel Station Regulars – Frequent',              tag: 'Frequent Buyers' },
  { id: 18, category: 'Fuel & Convenience',           name: 'Combined Fuel & Shop Trips – Loyal',            tag: 'High Value'      },
  { id: 19, category: 'Value Seekers',                name: 'Unit-Price Switchers – High Value',             tag: 'High Value'      },
  { id: 20, category: 'Value Seekers',                name: 'Discount Grocery Cross-Shoppers – Lapsed',      tag: 'Frequent Buyers' },
  { id: 21, category: 'Multicultural',                name: 'Multi-Generational Households – High Value',    tag: 'High Value'      },
  { id: 22, category: 'Multicultural',                name: 'Community Bulk Buyers – High Value',            tag: 'High Value'      },
  { id: 23, category: 'Home & Garden',                name: 'Hardware & Home Project Buyers – High Value',   tag: 'High Value'      },
  { id: 24, category: 'Home & Garden',                name: 'Hardware & Home Project Buyers – Frequent',     tag: 'Frequent Buyers' },
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
  onStartCompare?: (seed: never[], prompt: string) => void;
  regionPicks?: ChatRegionPick[];
  onRequestLayer?: (key: string) => void;
}

// A catchment the user clicked on the map. The chat answers it in a sentence
// rather than opening a panel — the numbers stay on the map's own index card.
export interface ChatRegionPick {
  key: number;
  name: string;
  store?: string | null;
  trips?: { name: string; pct: number }[];
  index: number;
  households: number;
  share: number;
  rank: number;
  of: number;
  segment: string;
  corridors: { name: string; pct: number }[];
}

// One plain-language read per catchment — what the AI says when it is clicked.
const REGION_READS: Record<string, { lead: string; also: string }> = {
  'Marsden Park · Riverstone': {
    lead: 'This audience is 2.3× more likely to be affluent families with larger households. They frequently visit Bunnings, IKEA and Costco Auburn on weekends — big-basket trips, made by car.',
    also: 'Almost a quarter of the trips into the site come from Schofields alone, and thirty minutes of drive time covers three quarters of the cluster — so the M7 and Richmond Road see them on the way in, every time.',
  },
  'Schofields · Box Hill': {
    lead: 'Newer estates, same habit — 2.1× more likely to be young families in their first home, still forming where they shop.',
    also: 'Their trips come almost entirely from inside twenty minutes — Schofields, Riverstone and Rouse Hill. Reach them in the first six months after they move and the habit sticks.',
  },
  'Rouse Hill · Kellyville': {
    lead: 'A crossover pocket — Stock-Ups and Bulk Buyers overlap here. They’re 1.9× more likely to already hold a warehouse-club membership.',
    also: 'Rouse Hill Town Centre anchors the weekly trip, and the Metro line gives you a second, cheaper way to reach them.',
  },
  'Parramatta · Granville': {
    lead: 'A different shopper entirely — 2.4× more likely to be multi-generational households buying for more than one family at a time.',
    also: 'They shop fortnightly, on foot or a short drive, and switch on unit price rather than brand. Referral moves faster here than paid media.',
  },
  'Castle Hill · Baulkham': {
    lead: 'The highest-value trolleys in Sydney — 2.2× more likely to be established families buying premium and entertaining lines.',
    also: 'Fewest trips, biggest baskets, and most already hold a membership somewhere else. This is a switching play, not first trial.',
  },
  'Blacktown · Mount Druitt': {
    lead: 'Broad and price-led — 1.8× more likely to cross-shop ALDI and BIG W in the same week.',
    also: 'Westpoint anchors the trip, and the M7 and Richmond Road carry them straight past your catchment on the way home.',
  },
  'Merrylands · Auburn': {
    lead: 'Value-led and community-driven — 2.0× more likely to be shopping for a large household on a fortnightly rhythm.',
    also: 'Word of mouth travels faster here than any channel you can buy. Referral mechanics do the work paid media can’t.',
  },
  'Penrith · St Marys': {
    lead: 'The edge of the catchment — 1.4× more likely to be big-basket families, but they already have a closer warehouse option.',
    also: 'Worth reach, not weight. Lead here only once the three core clusters are covered.',
  },
};

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
  onStartCompare,
  regionPicks = [],
  onRequestLayer,
}: ChatPanelProps) {
  const [homeTab, setHomeTab] = useState<'brief' | 'upload' | 'compare'>('brief');
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
  }, [visibleMessages, insightVisibleCount, profilesLoaded, deepDiveLoaded, showInsightsCTA, showProfilesCTA, showDeepDiveCTA, showClarifyCard, showMarketMessage, statCardCount, showAudienceCard, clarifyStep, clarifyAnswers, regionPicks.length]);

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
      ? 'Costco — Western Sydney Launch'
      : 'Member Upload Enrichment';
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

    if (clarifyStep < CLARIFY_QUESTIONS.length - 1) {
      setClarifyStep(s => s + 1);
    } else {
      // Every question answered — begin analysis
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
    setUploadedFile('costco_member_segments.csv');
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
            ? 'Active Members are already in the habit — protect frequency with fuel and bulk-unit-price messaging rather than acquisition spend. Lapsed Members need a single concrete reason to return, ideally tied to the new Western Sydney warehouse being closer than the one they left. Never-Redeemed Sign-Ups are the biggest untapped pool; a first-trip prompt with a named product and a drive time converts far harder than a generic reminder.'
            : 'Marsden Park Stock-Ups are the highest-affinity cluster — weight roadside OOH along the M7 and Richmond Road corridors Thursday to Saturday, immediately ahead of the trip. Parramatta Value Families are the broadest reach opportunity; lead on unit price through digital OOH in the Parramatta CBD and multicultural radio. Castle Hill Bulk Buyers are a switching play rather than first trial — range and quality messaging via retail media and CRM will move share of wallet.';
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
              {([
                { tab: 'brief', label: 'Start from scratch' },
                { tab: 'upload', label: 'Enrich your audience data' },
                { tab: 'compare', label: 'Compare audiences' },
              ] as const).map(({ tab, label }) => (
                <button
                  key={tab}
                  onClick={() => { setHomeTab(tab); setUploadedFile(null); }}
                  className={`relative px-5 py-2.5 font-['Geist',sans-serif] text-[14px] font-medium transition-all rounded-full ${
                    homeTab === tab
                      ? 'bg-[#4d6bf0] text-white shadow-md'
                      : 'bg-white text-[#666] border border-[#e0e0e0] hover:border-[#4d6bf0] hover:text-[#4d6bf0]'
                  }`}
                >
                  {label}
                  {tab === 'compare' && (
                    <span className={`ml-2 align-middle inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${
                      homeTab === 'compare' ? 'bg-white/25 text-white' : 'bg-[#eef0ff] text-[#4d6bf0]'
                    }`}>New</span>
                  )}
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
            <HomeInputBox
              homeTab={homeTab}
              uploadedFile={uploadedFile}
              onStart={handleStart}
              onStartCompare={(prompt) => onStartCompare?.([], prompt)}
            />

            {/* Suggestion pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {homeTab === 'brief' ? (
                <>
                  <Pill text="Who are the ideal customers for a Costco in Western Sydney?" />
                  <Pill text="Show me where my big-basket shoppers live and travel" />
                  <Pill text="Help me decide where to advertise for the Marsden Park launch" />
                </>
              ) : homeTab === 'upload' ? (
                <>
                  <Pill text="Help me understand which member segments have the most growth potential" />
                  <Pill text="Help me unlock new strategies based on my membership data" />
                </>
              ) : (
                <>
                  <Pill text="Compare Marsden Park Stock-Ups vs Parramatta Value Families" />
                  <Pill text="Where do my two audiences overlap, and where do they differ?" />
                  <Pill text="Compare the same audience across Western Sydney and South-West Sydney" />
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ════════ ALL CHAT SCREENS ════════ */}
      {screen !== 'blank' && (
        <div className="flex-1 flex flex-col min-h-0">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 flex flex-col">
            <div className="w-full max-w-[700px] my-auto pb-8 space-y-0">

              {/* ── Brief user message ── */}
              {entryMode === 'brief' && (
                <UserMessage text="I'm launching Costco in Western Sydney and want to understand who our ideal customers are, so we know where to advertise." />
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
                        <span className="font-['Jua',sans-serif] text-[14px] text-black opacity-70">costco_members.csv</span>
                      </div>
                      <p className="font-['Jua',sans-serif] text-[14px] text-black opacity-70 leading-relaxed">
                        We have a membership database of 42,000 Costco members across Greater Sydney with basket and visit history over the last 24 months. We want to understand who these members are — basket size, visit frequency, how far they travel, and who else in Western Sydney looks like them.
                      </p>
                    </div>
                  </div>
                  {(screen !== 'planning') && (
                    <AIMessage text="Got it — I can see you've uploaded 3 segments: Active Members, Lapsed Members, and Never-Redeemed Sign-Ups. Enriching these with transaction data, movement patterns, and catchment signals across Greater Sydney." />
                  )}
                </>
              )}

              {/* ── Planning screen: reading brief ── */}
              {screen === 'planning' && (
                <div className="my-6 space-y-3">
                  {entryMode === 'brief' ? (
                    <CollapsibleReasoning
                      summary="Reading the brief — Costco Western Sydney launch, big-basket grocery category, ideal-customer discovery..."
                      steps={['Parsing brief requirements', 'Identifying the Western Sydney catchment', 'Understanding the underlying objective']}
                    />
                  ) : (
                    <div className="space-y-3">
                      <StepIndicator active text="Analyzing uploaded member segment definitions" />
                      <StepIndicator active={false} text="Enriching with transaction and movement data" />
                      <StepIndicator active={false} text="Pulling basket size, visit frequency and travel distance per segment" />
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
                    summary="Reading the brief — Costco Western Sydney launch, big-basket grocery category, ideal-customer discovery..."
                    steps={['Parsing brief requirements', 'Identifying the Western Sydney catchment', 'Understanding the underlying objective']}
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
                      <span className="font-['Jua',sans-serif] text-[14px] text-[#999] italic">Scanning transaction and movement data — basket size, visit frequency, Western Sydney catchment concentration...</span>
                    </div>
                  )}

                  {/* Market summary message */}
                  {(showMarketMessage || isAtOrAfter(screen, 'profiles')) && (
                    <AIMessage text="Got it — so this is a media planning question, not a demographic profile. Here's the market picture. Bulk and warehouse-club shopping across Western Sydney indexes 38% above the Greater Sydney average, driven by larger households and a drive-to-shop habit. Spend is highly concentrated — the top 25% of big-basket households account for 68% of category value. And North-West growth-corridor households travel 2.4× further than the metro average for a single shop. Three clusters stand out — I'll build the Digital Twin now." />
                  )}

                  {/* 3 stat insight cards — staggered */}
                  {(statCardCount >= 1 || isAtOrAfter(screen, 'profiles')) && (
                    <MarketStatCard
                      stat="+38% vs metro"
                      context="Bulk and warehouse-club shopping in Western Sydney indexes 38% above the Greater Sydney average — household size and drive-to-shop behaviour are the drivers."
                    />
                  )}
                  {(statCardCount >= 2 || isAtOrAfter(screen, 'profiles')) && (
                    <MarketStatCard
                      stat="68% of value"
                      context="The top 25% of big-basket households account for 68% of category value — where you advertise matters more than how widely you advertise."
                    />
                  )}
                  {(statCardCount >= 3 || isAtOrAfter(screen, 'profiles')) && (
                    <MarketStatCard
                      stat="2.4× further"
                      context="North-West growth-corridor households travel 2.4× further than the metro average for a single big shop, passing the M7 and Richmond Road media corridors on the way."
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
                      summary="Generating the Digital Twin — building cluster profiles, pulling transaction and movement data, mapping catchments..."
                      steps={[
                        'Pulling basket size and spend distributions per cluster',
                        'Identifying visit frequency and travel-distance signals',
                        'Mapping household concentration across Greater Sydney',
                        'Analysing media corridor and on-route exposure indices',
                        'Confirming audience reach and index estimates',
                      ]}
                    />
                  )}

                  {/* Full analysis done + audience cards */}
                  {(screen !== 'profiles' || visibleMessages['profiles-ai']) && (
                    <AIMessage text="I've generated the Digital Twin for Costco shoppers across Sydney. Immediately, I can see three strong audience clusters — around Marsden Park, Parramatta and Castle Hill. Click any cluster to open it on the map, or save these for more analysis later on." />
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
                    <AIMessage text="I've enriched your 3 uploaded segments with transaction data, movement patterns, and catchment signals. Here's what they look like." />
                  )}
                  {(screen !== 'profiles' || profilesLoaded) && (
                    <div className="my-5 space-y-3">
                      {[
                        { name: 'Active Members', desc: '18.6K members · 2+ shops per month · index 264 vs all members' },
                        { name: 'Lapsed Members', desc: '14.2K members · no shop in the last 90 days · index 157 vs all members' },
                        { name: 'Never-Redeemed Sign-Ups', desc: '9.1K members · joined but never completed a first shop · index 131 vs all members' },
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
                      summary="Building full cluster profiles — shopping patterns, travel behaviour, channel exposure, lifestyle overlap..."
                      steps={[
                        'Pulling basket and category distributions per cluster',
                        'Identifying visit frequency and trip-chain signals',
                        'Mapping cross-category spend overlap and seasonal patterns',
                        'Analysing out-of-home and digital channel indices',
                        'Building timing and messaging insights',
                      ]}
                    />
                  )}
                  {(screen !== 'deep-dive' || visibleMessages['deepdive-ai']) && (
                    <AIMessage text="Here's a detailed breakdown of each cluster. Click any card to explore the full profile — shopping patterns, travel behaviour, channel insights, and messaging thought starters." />
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
                    <AIMessage text="Running the full analysis now — identifying spend concentration by cluster, building detailed household profiles, and pulling the media corridors each cluster passes through." />
                  )}
                  {visibleMessages['result-reasoning'] && (
                    <CollapsibleReasoning
                      summary="Cross-referencing transaction and movement data across clusters and Greater Sydney SA2s..."
                      steps={[
                        'Identifying high-value households by basket size and visit frequency',
                        'Analysing seasonal and weekly shopping patterns',
                        'Segmenting by household composition and travel behaviour',
                        'Confirming audience definitions and index scores',
                        'Analysing geographic concentration and catchment overlap',
                        'Building campaign-ready household profiles',
                      ]}
                    />
                  )}
                  {visibleMessages['result-message-2'] && (
                    <AIMessage text="Done. The three clusters shop on distinctly different rhythms and pass through different media corridors. I'll add campaign recommendations for each cluster now." />
                  )}

                  {/* Messaging generation flow */}
                  {!showMessagingButton && (
                    <div className="mt-4 space-y-3 my-6">
                      <StepIndicator active text="Analysing competitive positioning per cluster" />
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
                      <span className="font-['Jua',sans-serif] text-[14px] text-[#999] italic">Building messaging angles for each cluster based on shopping behaviour and seasonal patterns...</span>
                    </div>
                  )}
                  {messagingComplete && visibleMessages['messaging-complete'] && (
                    <>
                      <CollapsibleReasoning
                        summary="Analysing purchase drivers: one-trip convenience vs. unit price vs. premium bulk range..."
                        steps={['Analysing household positioning per cluster', 'Identifying campaign angles and channels', 'Generating creative recommendations']}
                      />
                      <AIMessage text="Campaign recommendations added to the analysis — messaging angles, channel mix, and creative direction for each cluster." />
                      <StrategyDocCard entryMode={entryMode} />
                      <AIMessageFooter />
                      <FollowUpQuestions entryMode={entryMode} />
                    </>
                  )}
                </>
              )}

              {/* Catchment picks — the map click, answered in the chat */}
              {regionPicks.map((pick) => (
                <RegionSummary key={pick.key} pick={pick} onRequestLayer={onRequestLayer} />
              ))}

              {/* Clarify widget — flows inline with the conversation it belongs to */}
              {screen === 'clarifying' && showClarifyCard && !clarifySubmitted && (
                <div className="pt-1">
                  <FloatingClarifyWidget
                    key={clarifyStep}
                    step={clarifyStep}
                    onSubmit={handleClarifyStep}
                  />
                </div>
              )}

            </div>
          </div>

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
            I can build detailed profiles for each cluster — household make-up, shopping signals, channel consumption, competitor overlap, and messaging thought starters.
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
      {/* Step indicator — only meaningful when there's more than one question */}
      {CLARIFY_QUESTIONS.length > 1 && (
        <div className="flex items-center gap-3 px-5 pt-4 pb-3 border-b border-[#f4f0fb]">
          <div className="flex gap-1.5">
            {CLARIFY_QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i < step ? 'w-4 bg-[#732d93]' : i === step ? 'w-6 bg-[#732d93]' : 'w-4 bg-[#e5e0f0]'
                }`}
              />
            ))}
          </div>
          <span className="font-['Jua',sans-serif] text-[11px] text-[#aaa]">Question {step + 1} of {CLARIFY_QUESTIONS.length}</span>
        </div>
      )}

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
            {step < CLARIFY_QUESTIONS.length - 1 ? 'Next' : 'Run analysis'}
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Colours match the map's own segment palette, so the chip that lands in the
// chat is visibly the thing that was just clicked on the map.
const SEGMENT_COLOR: Record<string, string> = {
  stockup: '#7A4C82',
  value: '#2F8F63',
  bulk: '#C07A2E',
};

function RegionSummary({ pick, onRequestLayer }: { pick: ChatRegionPick; onRequestLayer?: (key: string) => void }) {
  // Land the reply the way a live answer arrives: the source chip first, a
  // beat of thinking, then the words.
  const [thinking, setThinking] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setThinking(true);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    const t = window.setTimeout(() => {
      setThinking(false);
      // the answer is taller than the thinking beat — follow it down
      window.setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 60);
    }, 850);
    return () => window.clearTimeout(t);
  }, [pick.key]);

  const read = REGION_READS[pick.name];
  const lead = read?.lead
    ?? `This catchment indexes ${pick.index} — #${pick.rank} of ${pick.of} across Greater Sydney, with about ${(pick.households / 1000).toFixed(0)}k households of your audience living here.`;
  const top = pick.trips?.[0] ?? pick.corridors[0];
  const compareTo = pick.name.startsWith('Parramatta') ? 'Marsden Park Stock-Ups' : 'Parramatta Value Families';
  const colour = SEGMENT_COLOR[pick.segment] ?? '#732d93';
  const short = pick.name.split(' · ')[0];

  return (
    <div ref={ref} className="mb-6 lumos-reply-in">
      {/* Where this reply came from — the chip the map click puts in the thread */}
      <div className="flex justify-end mb-2">
        <span
          className="lumos-source-pulse inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border"
          style={{ borderColor: `${colour}44`, background: `${colour}12` }}
        >
          <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: colour }}>
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" /><circle cx="12" cy="10" r="2.6" />
            </svg>
          </span>
          <span className="font-['Jua',sans-serif] text-[11px] leading-none" style={{ color: colour }}>
            Selected on map · {pick.name}
          </span>
        </span>
      </div>

      <UserMessage text={`Tell me about ${short}`} />

      {thinking ? (
        <div className="mb-5 flex items-center gap-2">
          <div className="flex gap-1">
            {[0, 150, 300].map((d) => (
              <div key={d} className="w-2 h-2 bg-[#7c6bf0] rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
          <span className="font-['Jua',sans-serif] text-[14px] text-[#999] italic">Reading the {short} catchment — households, basket, travel…</span>
        </div>
      ) : (
        <div className="lumos-reply-in">
          <AIMessage text={lead} />
          {read?.also && <AIMessage text={read.also} />}
          {!read?.also && top && (
            <AIMessage text={`Their biggest single source of trips is ${top.name} at ${top.pct}% of visits. I’ve drawn the drive-time catchment and the trips running into it on the map.`} />
          )}
          <div className="space-y-2">
            <button
              onClick={() => onRequestLayer?.('poi')}
              className="flex items-start gap-2 w-full text-left p-3 bg-[#f8f8f8] rounded-lg hover:bg-[#efefef] transition-colors"
            >
              <span className="text-[#999] text-[14px] mt-0.5 flex-shrink-0">↪</span>
              <span className="font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] leading-relaxed">Where else do they go?</span>
            </button>
            <button
              onClick={() => onRequestLayer?.('media')}
              className="flex items-start gap-2 w-full text-left p-3 bg-[#f8f8f8] rounded-lg hover:bg-[#efefef] transition-colors"
            >
              <span className="text-[#999] text-[14px] mt-0.5 flex-shrink-0">↪</span>
              <span className="font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] leading-relaxed">Which billboards reach them?</span>
            </button>
            <button className="flex items-start gap-2 w-full text-left p-3 bg-[#f8f8f8] rounded-lg hover:bg-[#efefef] transition-colors">
              <span className="text-[#999] text-[14px] mt-0.5 flex-shrink-0">↪</span>
              <span className="font-['Jua',sans-serif] text-[14px] text-[#1a1a1a] leading-relaxed">Compare to {compareTo}</span>
            </button>
          </div>
        </div>
      )}
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
      name: 'Marsden Park Stock-Ups',
      desc: 'Ages 30–45, $145k+ household income, new-build family homes across the North-West growth corridor. Monthly big shop, median 14km travelled, basket 3.4× the metro average. Index 264.',
    },
    {
      name: 'Parramatta Value Families',
      desc: 'Ages 28–48, $105k+ household income, multi-generational and multicultural households from Parramatta to Auburn. Highest unit volume in Sydney, fortnightly rhythm, switches on unit price. Index 218.',
    },
    {
      name: 'Castle Hill Bulk Buyers',
      desc: 'Ages 35–55, $185k+ household income, established Hills District families. Fewest trips, biggest baskets, premium and entertaining lines — already members elsewhere. Index 186.',
    },
  ];

  return (
    <div className="mb-5">
      <AIMessage text="I've built the Digital Twin for Costco shoppers in Western Sydney. Three clusters carry the launch, defined by basket size, household composition, and how far they travel to shop:" />
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
      'Messaging angles by cluster',
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
      'Cluster profiles & index scores',
      'Household & behavioural breakdown',
      'Market opportunity sizing',
      'Strategic recommendations',
    ],
  },
  {
    id: 'conquest-plan',
    icon: '🎯',
    title: 'Switching & Conquest Plan',
    goodFor: 'Identifying which supermarket and warehouse-club shoppers are winnable, and how.',
    sections: [
      'Competitive retail landscape',
      'Switching opportunity analysis',
      'Conquest cluster priorities',
      'Activation tactics per cluster',
      'Budget allocation guidance',
    ],
  },
  {
    id: 'launch-playbook',
    icon: '🚀',
    title: 'Store Launch Playbook',
    goodFor: 'End-to-end launch planning with catchment, opening-week timing and success metrics.',
    sections: [
      'Launch objectives & KPIs',
      'Cluster prioritisation matrix',
      'Channel activation plan',
      'Opening-week drive-to-store strategy',
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
    ? 'Costco Western Sydney — Member Upload Analysis'
    : 'Costco Western Sydney — Audience Strategy';
  const meta = entryMode === 'upload'
    ? '3 enriched segments · Campaign recommendations · Member analysis'
    : '3 audience clusters · Campaign recommendations · Catchment analysis';

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
    'Tell me more about Marsden Park Stock-Ups — what their shopping trip looks like from home to checkout',
    'Which billboards and corridors reach the most of these three clusters?',
    'Help me create a strategic doc that I can share with stakeholders',
  ];
  const uploadQuestions = [
    'Tell me more about Active Members — which categories they over-index on',
    'Go deeper on win-back strategies for Lapsed Members',
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
  const [justPinned, setJustPinned] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevCount = useRef(0);

  // When a module is pinned from the output (the composer is often across the
  // screen from the pin), focus it AND flash a confirmation so it's obvious the
  // click landed here.
  useEffect(() => {
    if (contextRefs.length > prevCount.current) {
      inputRef.current?.focus();
      setJustPinned(true);
      const t = window.setTimeout(() => setJustPinned(false), 1600);
      prevCount.current = contextRefs.length;
      return () => window.clearTimeout(t);
    }
    prevCount.current = contextRefs.length;
  }, [contextRefs.length]);

  return (
    <div className={`relative bg-white border rounded-lg shadow-sm transition-all duration-300 ${justPinned ? 'border-[#6b3c72] ring-2 ring-[#6b3c72]/40' : 'border-[#ccc]'}`}>
      {/* Confirmation badge — fires when a section is pinned from elsewhere */}
      {justPinned && (
        <div className="absolute -top-3 left-3 z-10 flex items-center gap-1 px-2 py-0.5 bg-[#6b3c72] rounded-full shadow-sm">
          <Check className="w-3 h-3 text-white" />
          <span className="font-['Jua',sans-serif] text-[11px] text-white">Added to chat</span>
        </div>
      )}
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
  onStartCompare,
}: {
  homeTab: 'brief' | 'upload' | 'compare';
  uploadedFile: string | null;
  onStart: () => void;
  onStartCompare?: (prompt: string) => void;
}) {
  const [showAudiencePicker, setShowAudiencePicker] = useState(false);
  const [addedAudiences, setAddedAudiences] = useState<typeof SAVED_AUDIENCES>([]);
  const [compareText, setCompareText] = useState('');
  const isCompare = homeTab === 'compare';

  const placeholder = isCompare
    ? 'Compare these two audiences… (optional — you can pick them next)'
    : homeTab === 'brief'
      ? 'Describe your audience challenge or goal...'
      : 'Add context or instructions for the enrichment...';

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
        {isCompare ? (
          <textarea
            rows={3}
            value={compareText}
            onChange={(e) => setCompareText(e.target.value)}
            placeholder={placeholder}
            className="w-full font-['Jua',sans-serif] text-[14px] text-black outline-none placeholder:text-[#999] resize-none"
          />
        ) : (
          <textarea
            key={homeTab}
            rows={3}
            placeholder={placeholder}
            defaultValue={
              homeTab === 'brief'
                ? "I'm launching Costco in Western Sydney and want to understand who our ideal customers are, so we know where to advertise."
                : 'We have a membership database of 42,000 Costco members across Greater Sydney with basket and visit history over the last 24 months. We want to understand who these members are — basket size, visit frequency, how far they travel, and who else in Western Sydney looks like them.'
            }
            className="w-full font-['Jua',sans-serif] text-[14px] text-black outline-none placeholder:text-[#999] resize-none"
          />
        )}
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
          {isCompare ? (
            <button
              onClick={() => onStartCompare?.(compareText)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#4d6bf0] hover:bg-[#3d5be0] text-white font-['Geist',sans-serif] text-[13px] font-medium transition-colors"
            >
              Set up comparison
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          ) : (
            <button
              onClick={onStart}
              disabled={homeTab === 'upload' && !uploadedFile}
              className={`p-2.5 rounded-full transition-colors ${
                homeTab === 'upload' && !uploadedFile ? 'bg-[#d0d0d0] cursor-not-allowed' : 'bg-[#4d6bf0] hover:bg-[#3d5be0]'
              }`}
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
