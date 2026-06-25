import { ChevronDown, House, ScanSearch, UsersRound, DatabaseZap, ImagePlay, FileText, BarChart2, Users, Upload } from 'lucide-react';

export interface RecentAnalysis {
  id: string;
  title: string;
  subtitle: string;
  type: 'brief' | 'upload';
  timestamp: string;
}

interface SidebarProps {
  showDataExplorer: boolean;
  onToggleDataExplorer: () => void;
  showAudiences: boolean;
  onToggleAudiences: () => void;
  showDocuments: boolean;
  onToggleDocuments: () => void;
  recentAnalyses?: RecentAnalysis[];
  activeAnalysisId?: string | null;
  onSelectAnalysis?: (id: string) => void;
}

export default function Sidebar({
  showDataExplorer,
  onToggleDataExplorer,
  showAudiences,
  onToggleAudiences,
  showDocuments,
  onToggleDocuments,
  recentAnalyses = [],
  activeAnalysisId,
  onSelectAnalysis,
}: SidebarProps) {
  return (
    <div className="w-[210px] bg-[#f3f3f1] border-r border-[#d0d0d0] flex flex-col overflow-y-auto shrink-0">
      <div className="p-4 flex-1 flex flex-col">
        {/* Workspace Switcher */}
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-[#e5e5e5] transition-colors mb-4">
          <span className="font-['Jua',sans-serif] text-[14px] text-[#6a6a6a]">Meridian Motors</span>
          <ChevronDown className="w-4 h-4 text-[#323745]" />
        </button>

        {/* Mode Badges */}
        <div className="flex gap-2 mb-6">
          <div className="flex items-center gap-1.5 px-2 py-1.5 bg-[#bdbde7] rounded">
            <DatabaseZap className="w-3.5 h-3.5 text-[#2B2A33]" />
            <span className="font-['Geist',sans-serif] text-[12px] text-[#2b2a33] font-medium">Research</span>
          </div>
          <div className="flex items-center justify-center px-2 py-1.5 bg-[#e0e0e0] rounded">
            <ImagePlay className="w-3.5 h-3.5 text-[#2B2A33]" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 mb-8">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md bg-[#e5e5e5] transition-colors">
            <House className="w-4 h-4 text-[#323745]" />
            <span className="font-['Jua',sans-serif] text-[14px] text-[#6a6a6a]">Home</span>
          </button>
          <button
            onClick={onToggleDataExplorer}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
              showDataExplorer ? 'bg-[#efe6ff] text-[#732d93]' : 'hover:bg-[#e5e5e5]'
            }`}
          >
            <ScanSearch className={`w-4 h-4 ${showDataExplorer ? 'text-[#732d93]' : 'text-[#323745]'}`} />
            <span className={`font-['Jua',sans-serif] text-[14px] ${showDataExplorer ? 'text-[#732d93]' : 'text-[#6a6a6a]'}`}>
              Data Explorer
            </span>
          </button>
          <button
            onClick={onToggleAudiences}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
              showAudiences ? 'bg-[#efe6ff] text-[#732d93]' : 'hover:bg-[#e5e5e5]'
            }`}
          >
            <UsersRound className={`w-4 h-4 ${showAudiences ? 'text-[#732d93]' : 'text-[#323745]'}`} />
            <span className={`font-['Jua',sans-serif] text-[14px] ${showAudiences ? 'text-[#732d93]' : 'text-[#6a6a6a]'}`}>
              Audiences
            </span>
          </button>
          <button
            onClick={onToggleDocuments}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${showDocuments ? 'bg-[#efe6ff]' : 'hover:bg-[#e5e5e5]'}`}
          >
            <FileText className={`w-4 h-4 ${showDocuments ? 'text-[#732d93]' : 'text-[#323745]'}`} />
            <span className={`font-['Jua',sans-serif] text-[14px] ${showDocuments ? 'text-[#732d93]' : 'text-[#6a6a6a]'}`}>Documents</span>
          </button>
        </nav>

        {/* Recent analysis */}
        <div className="flex-1">
          <h3 className="font-['Jua',sans-serif] text-[11px] text-[#9c9c9c] uppercase tracking-wide px-3 mb-2">
            Recent analysis
          </h3>
          {recentAnalyses.length === 0 ? (
            <p className="font-['Jua',sans-serif] text-[12px] text-[#b0b0b0] px-3 py-1 leading-relaxed">
              No analysis yet — start a new chat to begin.
            </p>
          ) : (
            <div className="space-y-0.5">
              {recentAnalyses.map((a) => {
                const isActive = a.id === activeAnalysisId;
                const Icon = a.type === 'upload' ? Upload : BarChart2;
                return (
                  <button
                    key={a.id}
                    onClick={() => onSelectAnalysis?.(a.id)}
                    className={`w-full text-left flex items-start gap-2.5 px-3 py-2 rounded-md transition-colors ${
                      isActive ? 'bg-[#efe6ff]' : 'hover:bg-[#e5e5e5]'
                    }`}
                  >
                    <div className={`mt-0.5 w-[20px] h-[20px] rounded-md flex items-center justify-center shrink-0 ${isActive ? 'bg-[#d4aadf]' : 'bg-[#e2e2e0]'}`}>
                      <Icon className={`w-3 h-3 ${isActive ? 'text-[#6b3c72]' : 'text-[#666]'}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`font-['Jua',sans-serif] text-[12px] leading-tight truncate ${isActive ? 'text-[#6b3c72]' : 'text-[#444]'}`}>
                        {a.title}
                      </p>
                      <p className="font-['Jua',sans-serif] text-[10px] text-[#999] leading-tight mt-0.5">
                        {a.timestamp}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
