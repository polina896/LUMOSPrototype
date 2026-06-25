import svgPaths from '../../imports/Frame2147234537/svg-7wpgdb0pqu';
import type { Audience } from '../audienceData';

function AudienceAvatar() {
  return (
    <div className="relative shrink-0 w-[44px] h-[44px]">
      <svg className="absolute block inset-0 w-full h-full" fill="none" viewBox="0 0 44 44">
        <path d={svgPaths.pc0cda00} fill="#EFEAFC" />
        <path d={svgPaths.p9305000} fill="#6C4CD6" />
        <path d={svgPaths.p170f44f0} fill="#6C4CD6" />
      </svg>
    </div>
  );
}

interface AudienceListCardProps {
  audience: Audience;
  onClick?: () => void;
  isSelected?: boolean;
  clickable?: boolean;
}

export default function AudienceListCard({ audience, onClick, isSelected, clickable = true }: AudienceListCardProps) {
  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={`bg-white rounded-xl border transition-all ${
        clickable ? 'cursor-pointer' : 'cursor-default'
      } ${
        isSelected
          ? 'border-[#732d93] shadow-md'
          : clickable
          ? 'border-[#e5e5e2] hover:border-[#732d93] hover:shadow-sm'
          : 'border-[#e5e5e2]'
      }`}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        <AudienceAvatar />
        <div className="flex-1 min-w-0">
          <p className="font-['Jua',sans-serif] text-[17px] text-[#2a2433] mb-0.5 leading-tight">
            {audience.name}
          </p>
          <p className="font-['Jua',sans-serif] text-[12px] text-[#8a8494] mb-1.5">
            {audience.shortDesc}
          </p>
          <div className="flex items-center gap-1.5">
            <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
              <path d="M0 0V10L4 7L8 10V0H0Z" fill="#8A8494" />
            </svg>
            <span className="font-['Jua',sans-serif] text-[11px] text-[#8a8494]">
              Purchase intent segment · Vehicle Registration Data
            </span>
          </div>
        </div>
        {clickable && (
          <span className="font-['Jua',sans-serif] text-[11px] text-[#732d93] flex-shrink-0 mt-1 self-end">
            {isSelected ? 'Viewing ↗' : 'Open audience ↗'}
          </span>
        )}
      </div>
    </div>
  );
}
