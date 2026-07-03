import { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';

// ── Inline ask on any module ─────────────────────────────────────────────────
// A reusable wrapper that gives any output module an always-visible "Ask"
// affordance. Clicking it doesn't open a separate chat — it pins the module (its
// identity + current state) as quoted context onto the main chat composer, so
// the user asks their follow-up in one conversation with the section attached.
// See docs/inline-ask-on-any-module.md.
//
//   <Module id="aud:ev:where" label="Where they are" audience="EV Upgrade Shoppers"
//           state={['Daytime', 'Weekend']} onAsk={pinToChat}>
//     …module content…
//   </Module>

export type ModuleRef = {
  id: string;        // stable, e.g. "aud:ev-upgrade-shoppers:where"
  label: string;     // human scope label → "Where they are"
  audience: string;  // which audience this module belongs to
  state: string[];   // live control snapshot → ['Daytime', 'Weekend']
};

// Inline variant of the Ask affordance — lays out in the normal flow (e.g. in a
// card header's action row) rather than absolutely pinned. Same behaviour and
// feedback as <Module>'s pill; used where an absolute pill would collide with an
// existing control (a Snapshot/Trend toggle, an export icon, etc.).
export function AskPill({
  id,
  label,
  audience,
  state = [],
  onAsk,
  className = '',
}: {
  id: string;
  label: string;
  audience: string;
  state?: string[];
  onAsk?: (ref: ModuleRef) => void;
  className?: string;
}) {
  const [added, setAdded] = useState(false);

  const pin = () => {
    onAsk?.({ id, label, audience, state });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  };

  return (
    <button
      onClick={pin}
      title={`Ask about “${label}” — adds it to the chat as context`}
      className={`shrink-0 flex items-center gap-1 px-2 py-[3px] rounded-full font-['Jua',sans-serif] text-[11px] transition-colors ${
        added ? 'bg-[#6b3c72] text-white' : 'bg-[#f1e9ff] text-[#6b3c72] hover:bg-[#e7dbf6]'
      } ${className}`}
    >
      {added ? <Check className="w-[11px] h-[11px]" /> : <Sparkles className="w-[11px] h-[11px]" />}
      {added ? 'Added' : 'Ask'}
    </button>
  );
}

export function Module({
  id,
  label,
  audience,
  state = [],
  onAsk,
  children,
  className = '',
  pillPosition = 'top-3 right-0',
}: {
  id: string;
  label: string;
  audience: string;
  state?: string[];
  onAsk?: (ref: ModuleRef) => void;
  children: React.ReactNode;
  className?: string;
  pillPosition?: string;
}) {
  const [added, setAdded] = useState(false);

  const pin = () => {
    onAsk?.({ id, label, audience, state });
    // Brief confirmation + focus pulse so the user sees it landed in the composer.
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  };

  return (
    <div
      className={`relative transition-shadow duration-300 rounded-[12px] ${
        added ? 'ring-2 ring-[#6b3c72]/35' : 'ring-0'
      } ${className}`}
    >
      {/* Always-visible Ask pill — subtle, pinned top-right, one per module. */}
      <button
        onClick={pin}
        title={`Ask about “${label}” — adds it to the chat as context`}
        className={`absolute ${pillPosition} z-20 flex items-center gap-1 px-2 py-[3px] rounded-full font-['Jua',sans-serif] text-[11px] transition-colors ${
          added ? 'bg-[#6b3c72] text-white' : 'bg-[#f1e9ff] text-[#6b3c72] hover:bg-[#e7dbf6]'
        }`}
      >
        {added ? <Check className="w-[11px] h-[11px]" /> : <Sparkles className="w-[11px] h-[11px]" />}
        {added ? 'Added' : 'Ask'}
      </button>

      {children}
    </div>
  );
}

export default Module;
