import { useEffect, useRef, useState } from 'react';
import { Sparkles, X, ArrowUp, RotateCcw, MessageSquare, Target } from 'lucide-react';

// ── Inline ask on any module ─────────────────────────────────────────────────
// A reusable wrapper that gives any output module the always-visible "Ask"
// affordance, an anchored composer that inherits the module's live state, and an
// inline, intent-routed answer card. See docs/inline-ask-on-any-module.md.
//
// Usage: wrap a module's container and pass its identity + live state.
//   <Module id="aud:ev:where" type="map" label="Where they are"
//           state={['Daytime', 'Weekend', 'EV Upgrade Shoppers']}>
//     …module content…
//   </Module>

export type ModuleType = 'text' | 'recommendation' | 'chart' | 'map' | 'card';

type Intent = 'read' | 'reason' | 'edit' | 'drill';
type Verb = { label: string; intent: Intent };

// Which contextual verbs each module type offers. Read-oriented verbs first.
const VERBS: Record<ModuleType, Verb[]> = {
  text: [
    { label: 'Explain', intent: 'read' },
    { label: 'Rewrite', intent: 'edit' },
    { label: 'Simplify', intent: 'edit' },
    { label: 'Expand', intent: 'drill' },
    { label: 'How derived?', intent: 'reason' },
  ],
  recommendation: [
    { label: 'Explain', intent: 'read' },
    { label: 'Make more direct', intent: 'edit' },
    { label: 'Expand', intent: 'drill' },
    { label: 'How derived?', intent: 'reason' },
  ],
  chart: [
    { label: 'Explain', intent: 'read' },
    { label: 'Change metric', intent: 'edit' },
    { label: 'Break down by…', intent: 'drill' },
    { label: 'Compare differently', intent: 'edit' },
    { label: 'How derived?', intent: 'reason' },
  ],
  map: [
    { label: 'Explain this view', intent: 'read' },
    { label: 'Top postcodes', intent: 'drill' },
    { label: 'Change layer', intent: 'edit' },
    { label: 'Weekday vs weekend', intent: 'drill' },
    { label: 'How derived?', intent: 'reason' },
  ],
  card: [
    { label: 'Explain', intent: 'read' },
    { label: 'Expand', intent: 'drill' },
    { label: 'Compare', intent: 'drill' },
    { label: 'How derived?', intent: 'reason' },
  ],
};

type Answer = { intent: Intent; verb: string; body: string };

// Prototype stub: builds a plausible, context-aware answer so the loop is
// demonstrable without a backend. Real wiring replaces this with a call that
// passes { id, type, label, state, query } to the model.
function buildAnswer(label: string, type: ModuleType, intent: Intent, query: string, state: string[]): string {
  const ctx = state.length ? ` for ${state.join(' · ')}` : '';
  switch (intent) {
    case 'edit':
      return `Proposed change to “${label}”${ctx}: ${query}. Applied in place — surrounding modules untouched. Revert if it’s not what you meant.`;
    case 'drill':
      return type === 'map'
        ? `Drilling into “${label}”${ctx}: the strongest sub-areas are districts that over-index here. Expanded inline; ask again to go deeper or open the full map.`
        : `Expanding “${label}”${ctx}: ${query || 'here is the supporting detail behind this view'}. Shown as a continuation of this module.`;
    case 'reason':
      return `“${label}” is derived from this audience’s indexed first-party + panel data${ctx}, weighted to the current view. Full reasoning is mirrored in the chat thread.`;
    default:
      return `About “${label}”${ctx}: ${query || 'here’s what this section is showing, scoped to just this module'}.`;
  }
}

export function Module({
  id,
  type,
  label,
  state = [],
  children,
  className = '',
}: {
  id: string;
  type: ModuleType;
  label: string;
  state?: string[];
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [pulse, setPulse] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  void id; // reserved for thread linkage when page-level chat is wired in

  // Focus the composer input when it opens; Esc closes and returns focus.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const submit = (verb: string, intent: Intent, query: string) => {
    setAnswer({ intent, verb, body: buildAnswer(label, type, intent, query, state) });
    setOpen(false);
    setDraft('');
    // Brief focus pulse so attention returns to the acted-on module.
    setPulse(true);
    window.setTimeout(() => setPulse(false), 1100);
  };

  const verbs = VERBS[type];
  const focused = open || pulse;

  return (
    <div
      className={`relative transition-shadow duration-300 rounded-[12px] ${
        focused ? 'ring-2 ring-[#6b3c72]/35' : 'ring-0'
      } ${className}`}
    >
      {/* Always-visible Ask pill — subtle, pinned top-right, one per module. */}
      <div className="absolute top-3 right-0 z-20">
        <button
          onClick={() => setOpen((v) => !v)}
          title={`Ask about “${label}”`}
          className={`flex items-center gap-1 px-2 py-[3px] rounded-full font-['Jua',sans-serif] text-[11px] transition-colors ${
            open
              ? 'bg-[#6b3c72] text-white'
              : 'bg-[#f1e9ff] text-[#6b3c72] hover:bg-[#e7dbf6]'
          }`}
        >
          <Sparkles className="w-[11px] h-[11px]" />
          Ask
        </button>

        {/* Anchored composer — scoped header, inherited state, verbs, free text. */}
        {open && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
            <div
              className="absolute right-0 top-[28px] z-30 w-[296px] bg-white border border-[#e5e5e2] rounded-[12px] shadow-xl p-3"
              onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
            >
              {/* scope header */}
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 font-['Jua',sans-serif] text-[12px] text-[#6b3c72]">
                  <Target className="w-[12px] h-[12px]" />
                  Ask about “{label}”
                </span>
                <button onClick={() => setOpen(false)} className="text-[#9a9a9a] hover:text-[#6b6b6b]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* inherited context — read-only, so the user sees what carries over */}
              {state.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2.5">
                  {state.map((s) => (
                    <span key={s} className="font-['Jua',sans-serif] text-[10.5px] text-[#6b6b6b] bg-[#f5f5f3] px-1.5 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* contextual verbs */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {verbs.map((v) => (
                  <button
                    key={v.label}
                    onClick={() => submit(v.label, v.intent, '')}
                    className="font-['Jua',sans-serif] text-[11.5px] text-[#1a1a1a] border border-[#e5e5e2] rounded-[8px] px-2 py-1 hover:border-[#6b3c72] hover:text-[#6b3c72] transition-colors"
                  >
                    {v.label}
                  </button>
                ))}
              </div>

              {/* free text */}
              <div className="flex items-end gap-1.5 border border-[#e5e5e2] rounded-[10px] px-2.5 py-1.5 focus-within:border-[#6b3c72] transition-colors">
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && draft.trim()) {
                      e.preventDefault();
                      submit('Ask', 'read', draft.trim());
                    }
                  }}
                  rows={1}
                  placeholder="Ask or change anything…"
                  className="flex-1 resize-none bg-transparent font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] placeholder:text-[#bcbcbc] outline-none leading-[1.4] max-h-[80px]"
                />
                <button
                  onClick={() => draft.trim() && submit('Ask', 'read', draft.trim())}
                  disabled={!draft.trim()}
                  className={`shrink-0 w-[22px] h-[22px] flex items-center justify-center rounded-full transition-colors ${
                    draft.trim() ? 'bg-[#6b3c72] text-white' : 'bg-[#ece7ef] text-[#bcbcbc]'
                  }`}
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {children}

      {/* Inline answer card — primary response surface, attached to the module. */}
      {answer && (
        <div className="mt-3 border border-[#e5e5e2] rounded-[10px] bg-white overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#faf7fc] border-b border-[#f0eaf3]">
            <Sparkles className="w-[12px] h-[12px] text-[#6b3c72]" />
            <span className="font-['Jua',sans-serif] text-[11px] text-[#6b3c72]">{answer.verb} · {label}</span>
            <button onClick={() => setAnswer(null)} className="ml-auto text-[#9a9a9a] hover:text-[#6b6b6b]">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] leading-[1.55] px-3 py-2.5">
            {answer.body}
          </p>
          <div className="flex items-center gap-3 px-3 pb-2.5">
            {answer.intent === 'edit' && (
              <button
                onClick={() => setAnswer(null)}
                className="flex items-center gap-1 font-['Jua',sans-serif] text-[11px] text-[#6b6b6b] hover:text-[#6b3c72] transition-colors"
              >
                <RotateCcw className="w-[11px] h-[11px]" />
                Revert
              </button>
            )}
            <span
              title="Mirrored to the chat thread, linked to this module"
              className="flex items-center gap-1 font-['Jua',sans-serif] text-[11px] text-[#9a9a9a]"
            >
              <MessageSquare className="w-[11px] h-[11px]" />
              Linked in chat
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Module;
