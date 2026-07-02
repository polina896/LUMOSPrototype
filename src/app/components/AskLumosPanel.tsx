import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import { Sparkles, ArrowUp, X } from 'lucide-react';
import type { ModuleRef } from './ModuleAsk';

// ── Ask Lumos — docked page-level panel ──────────────────────────────────────
// Opens by default on the right of the audience detail page (toggled by the
// header "Ask Lumos" button). Intentionally spare: a nudge + a few quiet
// starters up top, and a generous composer pinned at the bottom where chat
// lives. The emptiness is the message — "this is a space for you to ask".
//
// This is the page-level counterpart to the per-tile <Module> Ask affordance
// (ModuleAsk.tsx): the docked panel asks about the whole audience, ModuleAsk
// asks about a single chart. They are meant to share one thread; for now the
// panel keeps a local thread stub so the loop is demonstrable without a backend.

export type AskMsg = { role: 'you' | 'lumos'; text: string };

// One starter per intent — understand / activate / compare. Kept quiet and
// easy to ignore; they reference this audience's real distinctive signals.
const STARTERS = [
  'What makes them distinctive?',
  'Best message for them?',
  'How do they compare to average?',
];

// Prototype stub: a plausible, context-aware reply so the panel isn't a dead
// box. Real wiring replaces this with a call scoped to { audience, tab, filters }.
function stubAnswer(q: string, audience: string, scope: string | null): string {
  const focus = scope ? ` — focused on ${scope}` : '';
  return `Looking at ${audience} for the current tab and filters${focus}: ${q} — here's where the grounded answer appears, drawn from this audience's live data.`;
}

// Thread + draft are owned by the parent (AudienceProfileViewer) so the
// conversation survives the panel being collapsed and re-opened.
export default function AskLumosPanel({
  audienceName,
  messages,
  setMessages,
  draft,
  setDraft,
  pinned = [],
  onUnpin,
}: {
  audienceName: string;
  messages: AskMsg[];
  setMessages: Dispatch<SetStateAction<AskMsg[]>>;
  draft: string;
  setDraft: Dispatch<SetStateAction<string>>;
  // Sections pinned via a tile's inline "Ask" — quoted context on the composer.
  pinned?: ModuleRef[];
  onUnpin?: (id: string) => void;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  // Focus the composer on open so it reads as ready to type into.
  useEffect(() => { inputRef.current?.focus(); }, []);
  // Keep the latest message in view.
  useEffect(() => { threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight }); }, [messages]);

  const submit = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const scope = pinned.length ? pinned.map((p) => p.label).join(', ') : null;
    setMessages((m) => [...m, { role: 'you', text: q }, { role: 'lumos', text: stubAnswer(q, audienceName, scope) }]);
    setDraft('');
    inputRef.current?.focus();
  };

  const empty = messages.length === 0;

  // Placeholder reflects any pinned sections so the composer reads as scoped.
  const placeholder =
    pinned.length === 1
      ? `Ask about “${pinned[0].label}”…`
      : pinned.length > 1
      ? `Ask about these ${pinned.length} sections…`
      : 'Ask about this audience…';

  return (
    <div className="flex-none w-[384px] h-full flex flex-col bg-[#fcfbfd] border-l border-[#e7e2ec]">

      {/* ── Header ── */}
      <div className="flex-none flex items-center gap-[10px] px-[18px] py-4 bg-white border-b border-[#efeaf2]">
        <div className="w-[25px] h-[25px] rounded-[7px] bg-[#6b3c72] flex items-center justify-center text-white shrink-0">
          <Sparkles className="w-[13px] h-[13px]" />
        </div>
        <span className="font-['Jua',sans-serif] text-[14.5px] text-[#1a1a1a]">Ask Lumos</span>
      </div>

      {/* ── Body ── */}
      {empty ? (
        // Default empty state: nudge + quiet starters, floating in open space.
        <div className="flex-1 flex flex-col px-[22px] pt-[30px] pb-4 overflow-y-auto">
          <h2 className="font-['Jua',sans-serif] text-[21px] leading-[1.34] tracking-[-0.015em] text-[#1f1d23]">
            What do you want to know about <span className="text-[#6b3c72]">this audience</span>?
          </h2>
          <p className="font-['Inter',sans-serif] text-[12.5px] leading-[1.55] text-[#6b6b6b] mt-[10px]">
            Ask anything in plain language — answers come from this audience's live data.
          </p>

          <div className="mt-[26px]">
            <div className="font-['Inter',sans-serif] text-[10px] font-semibold tracking-[0.07em] uppercase text-[#9a9a9a] mb-[9px]">
              Try one of these
            </div>
            <div className="flex flex-wrap gap-[7px]">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="font-['Inter',sans-serif] text-[12px] text-[#5d5763] bg-white border border-[#ece8ef] rounded-full px-3 py-[7px] hover:border-[#d3c2dd] hover:text-[#6b3c72] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Thread state: questions + grounded answers.
        <div ref={threadRef} className="flex-1 overflow-y-auto px-[18px] py-[18px] flex flex-col gap-[14px]">
          {messages.map((m, i) =>
            m.role === 'you' ? (
              <div key={i} className="self-end max-w-[85%] bg-[#6b3c72] text-white rounded-[14px] rounded-br-[5px] px-[13px] py-[9px] font-['Inter',sans-serif] text-[12.5px] leading-[1.5]">
                {m.text}
              </div>
            ) : (
              <div key={i} className="self-start max-w-[92%]">
                <div className="flex items-center gap-[6px] mb-[5px]">
                  <Sparkles className="w-[12px] h-[12px] text-[#6b3c72]" />
                  <span className="font-['Jua',sans-serif] text-[11px] text-[#6b3c72]">Lumos</span>
                </div>
                <div className="bg-white border border-[#ece8ef] rounded-[14px] rounded-tl-[5px] px-[13px] py-[10px] font-['Inter',sans-serif] text-[12.5px] leading-[1.55] text-[#322e38]">
                  {m.text}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* ── Composer (pinned bottom) ── */}
      <div className="flex-none px-4 pt-[14px] pb-4 bg-white border-t border-[#efeaf2]">
        <div className="flex flex-col rounded-[16px] border-[1.5px] border-[#ddd0e4] bg-white overflow-hidden shadow-[0_6px_22px_rgba(108,60,114,0.07)] focus-within:border-[#6b3c72] transition-colors">
          {/* Pinned sections — quoted context added via a tile's inline "Ask" */}
          {pinned.length > 0 && (
            <div className="flex flex-wrap gap-[6px] px-[12px] pt-[12px]">
              {pinned.map((p) => (
                <span
                  key={p.id}
                  className="flex items-center gap-[5px] bg-[#6b3c72] text-white rounded-full pl-[9px] pr-[5px] py-[3px] font-['Jua',sans-serif] text-[11px]"
                >
                  <Sparkles className="w-[10px] h-[10px]" />
                  {p.label}
                  <button
                    onClick={() => onUnpin?.(p.id)}
                    title={`Remove “${p.label}”`}
                    className="w-[15px] h-[15px] rounded-full flex items-center justify-center hover:bg-white/25 transition-colors"
                  >
                    <X className="w-[10px] h-[10px]" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(draft); }
            }}
            rows={empty ? 3 : 1}
            placeholder={placeholder}
            className="resize-none bg-transparent outline-none px-4 pt-4 pb-2 font-['Inter',sans-serif] text-[14px] leading-[1.5] text-[#322e38] placeholder:text-[#ada6b5] min-h-[44px] max-h-[140px]"
          />
          <div className="flex items-center px-[10px] pb-[10px] pt-2">
            <span className="flex items-center gap-[5px] font-['Inter',sans-serif] text-[10.5px] text-[#9a9a9a]">
              <Sparkles className="w-[11px] h-[11px]" />
              Uses the current tab &amp; filters
            </span>
            <button
              onClick={() => submit(draft)}
              disabled={!draft.trim()}
              className={`ml-auto w-[34px] h-[34px] rounded-full flex items-center justify-center transition-colors ${
                draft.trim() ? 'bg-[#6b3c72] text-white' : 'bg-[#ece7ef] text-[#bcbcbc]'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
