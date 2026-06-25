import { useState } from 'react';
import { ArrowUpRight, Download, Maximize2, FileText, Users, BarChart2, Plus } from 'lucide-react';
import type { Screen } from '../App';
import type { AudienceId } from '../audienceData';
import { AUDIENCES, STRATEGIC_INSIGHTS } from '../audienceData';

// ── Section header ────────────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <p className="font-['Jua',sans-serif] text-[11px] text-[#929292] tracking-widest uppercase mb-3">{label}</p>
  );
}

// ── Item dot ─────────────────────────────────────────────────────────────────

function Dot() {
  return (
    <span className="inline-block w-1 h-1 rounded-full bg-[#ccc] flex-shrink-0 mx-0.5" />
  );
}

// ── Document card ─────────────────────────────────────────────────────────────

function DocumentCard({
  title,
  meta,
  isStrategy,
  isPlaceholder,
}: {
  title: string;
  meta: string;
  isStrategy?: boolean;
  isPlaceholder?: boolean;
}) {
  const [showExport, setShowExport] = useState(false);

  return (
    <div
      className={`relative rounded-xl w-full overflow-hidden transition-all cursor-pointer group border ${
        isPlaceholder
          ? 'bg-[#f9f9f9] border-dashed border-[#ddd] opacity-60'
          : isStrategy
          ? 'bg-[#fcf6ff] border-[#732d93] hover:shadow-sm'
          : 'bg-[#f4f4f4] border-[#e2e2e2] hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        <div className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg ${
          isPlaceholder ? 'bg-[#eee]' : isStrategy ? 'bg-[#f0e8ff]' : 'bg-[#ebebeb]'
        }`}>
          {isPlaceholder
            ? <Plus className="w-4 h-4 text-[#aaa]" />
            : <FileText className={`w-4 h-4 ${isStrategy ? 'text-[#732d93]' : 'text-[#888]'}`} />
          }
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-['Jua',sans-serif] text-[13px] leading-snug mb-0.5 ${isPlaceholder ? 'text-[#aaa]' : 'text-[#1e163c]'}`}>{title}</p>
          <p className="font-['Jua',sans-serif] text-[12px] text-[#888] leading-snug">{meta}</p>
        </div>
        {!isPlaceholder && (
          <button className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#732d93]" />
          </button>
        )}
      </div>
      {!isPlaceholder && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 flex gap-1">
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowExport(!showExport); }}
              className="w-6 h-6 flex items-center justify-center bg-white border border-[#e5e5e2] rounded-md hover:bg-gray-50"
            >
              <Download className="w-3 h-3 text-[#6b6b6b]" />
            </button>
            {showExport && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowExport(false)} />
                <div className="absolute right-0 top-7 z-20 w-40 bg-white border border-[#e5e5e2] rounded-lg shadow-lg py-1">
                  <button className="w-full px-3 py-1.5 text-left font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] hover:bg-gray-50">Export as PDF</button>
                  <button className="w-full px-3 py-1.5 text-left font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] hover:bg-gray-50">Export as PNG</button>
                  <button className="w-full px-3 py-1.5 text-left font-['Jua',sans-serif] text-[12px] text-[#1a1a1a] hover:bg-gray-50">Export as CSV</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Audience card ─────────────────────────────────────────────────────────────

function AudienceItemCard({
  name,
  meta,
  selected,
  isPlaceholder,
  onClick,
}: {
  name: string;
  meta: string;
  selected?: boolean;
  isPlaceholder?: boolean;
  onClick?: () => void;
}) {
  if (isPlaceholder) {
    return (
      <div className="w-full rounded-xl border border-dashed border-[#ddd] bg-[#f9f9f9] opacity-60 px-4 py-3 flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#eee] rounded-md">
          <Plus className="w-3.5 h-3.5 text-[#aaa]" />
        </div>
        <p className="font-['Jua',sans-serif] text-[13px] text-[#bbb]">{name}</p>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full relative rounded-xl text-left transition-all group border ${
        selected
          ? 'bg-[#fcf6ff] border-[#732d93] shadow-sm'
          : 'bg-white border-[#e8e8e8] hover:border-[#732d93] hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#f0e8ff] rounded-md">
          <Users className="w-4 h-4 text-[#732d93]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-['Jua',sans-serif] text-[13px] text-[#1e163c] leading-snug">{name}</p>
          <p className="font-['Jua',sans-serif] text-[12px] text-[#888] leading-snug">{meta}</p>
        </div>
        <ArrowUpRight className={`w-3.5 h-3.5 flex-shrink-0 transition-opacity ${selected ? 'opacity-100 text-[#732d93]' : 'opacity-0 group-hover:opacity-100 text-[#732d93]'}`} />
      </div>
    </button>
  );
}

// ── Insight card ──────────────────────────────────────────────────────────────

function InsightItemCard({
  title,
  subtype,
  isPlaceholder,
}: {
  title: string;
  subtype: string;
  isPlaceholder?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  if (isPlaceholder) {
    return (
      <div className="w-full rounded-xl border border-dashed border-[#ddd] bg-[#f9f9f9] opacity-60 px-4 py-3 flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#eee] rounded-md">
          <Plus className="w-3.5 h-3.5 text-[#aaa]" />
        </div>
        <p className="font-['Jua',sans-serif] text-[13px] text-[#bbb]">{title}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e8e8e8] rounded-xl w-full overflow-hidden group hover:border-[#732d93] transition-colors cursor-pointer">
      <div className="flex items-center gap-3 px-4 py-3" onClick={() => setExpanded(!expanded)}>
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#f0e8ff] rounded-md">
          <BarChart2 className="w-4 h-4 text-[#732d93]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-['Jua',sans-serif] text-[13px] text-[#1e163c] leading-snug truncate">{title}</p>
          <p className="font-['Jua',sans-serif] text-[12px] text-[#888]">{subtype}</p>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button className="w-6 h-6 flex items-center justify-center bg-[#f5eeff] rounded-md hover:bg-[#ece0ff]">
            <Maximize2 className="w-3 h-3 text-[#732d93]" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center bg-[#f5eeff] rounded-md hover:bg-[#ece0ff]">
            <Download className="w-3 h-3 text-[#732d93]" />
          </button>
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 border-t border-[#f0f0f0]">
          <div className="mt-3 h-20 bg-[#f9f7ff] rounded-lg flex items-end gap-1.5 px-4 pb-3 border border-[#efe6ff]">
            {[60, 80, 45, 90, 65, 75, 55].map((h, i) => (
              <div
                key={i}
                className="rounded-t flex-1"
                style={{ height: `${h}%`, backgroundColor: i === 3 ? '#732d93' : '#bba8e8' }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <button className="font-['Jua',sans-serif] text-[12px] text-[#732d93] hover:underline">
              View full chart →
            </button>
            <button className="font-['Jua',sans-serif] text-[12px] text-[#888] hover:text-[#555]">
              Export CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface DataExplorerPanelProps {
  screen: Screen;
  selectedAudienceId: AudienceId | null;
  onSelectAudience?: (id: AudienceId) => void;
}

export default function DataExplorerPanel({ screen, selectedAudienceId, onSelectAudience }: DataExplorerPanelProps) {
  const screenOrder = ['blank', 'planning', 'clarifying', 'insights', 'profiles', 'deep-dive', 'result'];
  const screenIdx = screenOrder.indexOf(screen);
  const hasInsights = screenIdx >= screenOrder.indexOf('insights');
  const hasAudiences = screenIdx >= screenOrder.indexOf('profiles');
  const hasDocument = screenIdx >= screenOrder.indexOf('result');

  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto px-5 py-4 space-y-6">

      {/* DOCUMENTS */}
      <section>
        <SectionHeader label="Documents" />
        <div className="space-y-2">
          {hasDocument ? (
            <>
              <DocumentCard
                title="Singapore Launch Audiences — Strategy Doc"
                meta="3 audience segments · Campaign recommendations"
                isStrategy
              />
              <DocumentCard
                title="Create new document"
                meta="Collate insights into a recommendation or slide deck"
                isPlaceholder
              />
            </>
          ) : (
            <DocumentCard
              title="Create Document"
              meta="Collate insights into a recommendation, slide deck or strategy doc."
              isPlaceholder
            />
          )}
        </div>
      </section>

      {/* AUDIENCES */}
      <section>
        <SectionHeader label="Audiences" />
        <div className="space-y-2">
          {hasAudiences ? (
            AUDIENCES.map((a) => (
              <AudienceItemCard
                key={a.id}
                name={a.name}
                meta={a.shortDesc}
                selected={selectedAudienceId === a.id}
                onClick={() => onSelectAudience?.(a.id)}
              />
            ))
          ) : (
            <AudienceItemCard
              name="No audiences yet"
              meta="Audience segments appear here after analysis"
              isPlaceholder
            />
          )}
        </div>
      </section>

      {/* INSIGHTS */}
      <section>
        <SectionHeader label="Insights" />
        <div className="space-y-2">
          {hasInsights ? (
            <>
              {STRATEGIC_INSIGHTS.map((insight) => (
                <InsightItemCard
                  key={insight.id}
                  title={insight.title}
                  subtype={insight.statLabel}
                />
              ))}
              {hasAudiences && (
                <InsightItemCard
                  title="Geographic Concentration — Singapore Districts"
                  subtype="Heatmap · District level"
                />
              )}
              {hasDocument && (
                <InsightItemCard
                  title="Campaign Channel Mix by Segment"
                  subtype="Bar chart · 3 segments"
                />
              )}
            </>
          ) : (
            <InsightItemCard
              title="No insights yet"
              subtype="Run an analysis to generate insights"
              isPlaceholder
            />
          )}
        </div>
      </section>

    </div>
  );
}
