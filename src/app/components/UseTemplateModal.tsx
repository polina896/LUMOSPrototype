import { useState, useRef, useEffect } from 'react';
import { Plus, Mic, ArrowRight, ChevronDown } from 'lucide-react';

const AUDIENCES = [
  'Urban Upgrade Drivers — Singapore',
  'Premium Sedan Intenders — Singapore',
  'EV Early Adopters — Singapore',
  'Family SUV Shoppers — Singapore',
  'Expat High Earners — Singapore',
  'Fleet & Corporate Drivers',
  'Upgrade-Ready Owners',
  'Young Aspirationals — Singapore',
];

interface UseTemplateModalProps {
  templateTitle: string;
  onClose: () => void;
  onGenerate: (audience: string, context: string) => void;
}

export default function UseTemplateModal({ templateTitle, onClose, onGenerate }: UseTemplateModalProps) {
  const [selectedAudience, setSelectedAudience] = useState(AUDIENCES[0]);
  const [audienceOpen, setAudienceOpen] = useState(false);
  const [context, setContext] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAudienceOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSend = () => {
    if (!selectedAudience) return;
    onGenerate(selectedAudience, context);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Short display names for the chips
  const shortAudience = selectedAudience.split('—')[0].trim();
  const shortTemplate = templateTitle.split('—').pop()?.trim() ?? templateTitle;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.3)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white rounded-[14px] shadow-2xl border border-[#e5e5e2] overflow-hidden"
        style={{ width: 420 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Heading */}
        <div className="px-6 pt-5 pb-4">
          <p className="font-['Jua',sans-serif] text-[16px] text-[#1a1a1a] leading-tight">
            How do you want to use this template?
          </p>
        </div>

        {/* Sentence with chips */}
        <div className="px-6 pb-4 flex flex-wrap items-center gap-x-1.5 gap-y-2">
          <span className="font-['Jua',sans-serif] text-[14px] text-[#444]">Use this</span>

          {/* Template chip */}
          <span className="inline-flex items-center px-2.5 py-1 bg-[#f1e9ff] text-[#6b3c72] rounded-[6px] font-['Jua',sans-serif] text-[13px] whitespace-nowrap">
            {shortTemplate}
          </span>

          <span className="font-['Jua',sans-serif] text-[14px] text-[#444]">and create a recommendation for</span>

          {/* Audience chip — clickable dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAudienceOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#6b3c72] text-white rounded-[6px] font-['Jua',sans-serif] text-[13px] hover:bg-[#5c2375] transition-colors whitespace-nowrap"
            >
              {shortAudience}
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {audienceOpen && (
              <div className="absolute top-full left-0 mt-1.5 bg-white border border-[#e5e5e2] rounded-xl shadow-lg py-1 z-10 min-w-[260px]">
                {AUDIENCES.map((a) => (
                  <button
                    key={a}
                    onClick={() => { setSelectedAudience(a); setAudienceOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 font-['Jua',sans-serif] text-[13px] transition-colors ${
                      a === selectedAudience
                        ? 'bg-[#f1e9ff] text-[#6b3c72]'
                        : 'text-[#1a1a1a] hover:bg-[#fafaf8]'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input bar */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 border border-[#e5e5e2] rounded-xl px-3 py-2.5 bg-[#fafaf9] focus-within:border-[#6b3c72] transition-colors">
            <button className="w-[26px] h-[26px] flex items-center justify-center rounded-lg hover:bg-[#e5e5e2] transition-colors shrink-0 text-[#9a9a9a]">
              <Plus className="w-4 h-4" />
            </button>

            <input
              ref={inputRef}
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add any extra context or instructions..."
              className="flex-1 bg-transparent font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] placeholder:text-[#b0b0b0] outline-none min-w-0"
            />

            <button className="w-[26px] h-[26px] flex items-center justify-center rounded-lg hover:bg-[#e5e5e2] transition-colors shrink-0 text-[#9a9a9a]">
              <Mic className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleSend}
              className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-[#6b3c72] hover:bg-[#5c2375] transition-colors shrink-0"
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
