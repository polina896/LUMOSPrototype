import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

const DATA_SOURCES = [
  {
    icon: '🔒',
    name: 'Vehicle Registration Data',
    description: 'Anonymised ownership and purchase-intent signals from Singapore LTA vehicle registration records.',
  },
  {
    icon: '📍',
    name: 'Lumos Geospatial Intelligence',
    description: 'Foot traffic and POI visit signals enriching owner location and dealership behaviour.',
  },
  {
    icon: '👤',
    name: 'Experian Demographic Segmentation',
    description: 'Income, age, and household composition layers applied at segment level.',
  },
  {
    icon: '🌐',
    name: 'LiveRamp Digital Identity Graph',
    description: 'Cross-channel digital behaviour signals linked to owner and intender profiles.',
  },
  {
    icon: '🚗',
    name: 'Automotive Purchase Index',
    description: 'Vehicle category classification system ranking consideration frequency and upgrade timing patterns.',
  },
];

interface DataSourcesPopoverProps {
  label?: string;
  openUpward?: boolean;
}

export default function DataSourcesPopover({ label = '5 data sources', openUpward = true }: DataSourcesPopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f5f5f5] hover:bg-[#ebebeb] rounded-full transition-colors cursor-pointer"
      >
        <Info className="w-3.5 h-3.5 text-[#888]" />
        <span className="font-['Geist',sans-serif] text-[13px] text-[#666]">{label}</span>
      </button>

      {open && (
        <div
          className={`absolute ${openUpward ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 -translate-x-1/2 z-50 w-[290px] bg-white border border-[#e5e5e2] rounded-xl shadow-xl overflow-hidden`}
        >
          <div className="px-4 pt-3.5 pb-2 border-b border-[#f0f0f0]">
            <p className="font-['Geist',sans-serif] text-[10px] font-semibold text-[#999] uppercase tracking-widest">
              Data Sources
            </p>
          </div>
          <div className="px-4 py-3 space-y-3.5">
            {DATA_SOURCES.map((source) => (
              <div key={source.name} className="flex gap-3">
                <span className="text-[16px] leading-none flex-shrink-0 mt-0.5">{source.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-['Geist',sans-serif] text-[12px] font-semibold text-[#1a1a1a] leading-snug mb-0.5">
                    {source.name}
                  </p>
                  <p className="font-['Geist',sans-serif] text-[11px] text-[#888] leading-relaxed">
                    {source.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
