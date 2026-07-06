import { useState } from 'react';
import { X, BarChart3, PieChart, Table, MapPin, ChevronDown } from 'lucide-react';
import type { StyleConfig } from './CustomizationPopover';
import HeatmapView from './HeatmapView';

function PostcodeRow({
  rank,
  area,
  index,
  households,
  styleConfig,
}: {
  rank: number;
  area: string;
  index: number;
  households: number;
  styleConfig: StyleConfig;
}) {
  const maxIndex = 228;
  const barWidth = (index / maxIndex) * 100;

  return (
    <div className="grid grid-cols-[40px_140px_1fr_100px] gap-4 items-center">
      <span
        style={{
          fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
          fontSize: `${styleConfig.bodySize}px`,
        }}
        className="text-[#999] text-center"
      >
        {rank}
      </span>
      <span
        style={{
          fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
          fontSize: `${styleConfig.bodySize + 0.5}px`,
        }}
        className="text-black"
      >{area}</span>
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
          <div
            style={{
              width: `${barWidth}%`,
              backgroundColor: styleConfig.brandColor,
            }}
            className="h-full rounded-full flex items-center justify-end pr-2"
          >
            <span
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                fontSize: `${Math.max(10, styleConfig.bodySize - 2.5)}px`,
              }}
              className="text-white"
            >
              {index}
            </span>
          </div>
        </div>
      </div>
      <span
        style={{
          fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
          fontSize: `${styleConfig.bodySize}px`,
        }}
        className="text-[#666] text-right"
      >
        {households.toLocaleString()}
      </span>
    </div>
  );
}

interface PostcodeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: 'ranking' | 'heatmap';
  onViewChange: (view: 'ranking' | 'heatmap') => void;
  styleConfig: StyleConfig;
}

type InsightType = 'heatmap' | 'horizontal' | 'pie' | 'table';

export default function PostcodeEditModal({
  isOpen,
  onClose,
  currentView,
  onViewChange,
  styleConfig,
}: PostcodeEditModalProps) {
  const [activeTab, setActiveTab] = useState<'setup' | 'customization'>('setup');
  const [insightType, setInsightType] = useState<InsightType>(currentView === 'heatmap' ? 'heatmap' : 'horizontal');
  const [insightName, setInsightName] = useState('Pork Purchase Index');

  if (!isOpen) return null;

  const handleSave = () => {
    onViewChange(insightType === 'heatmap' ? 'heatmap' : 'ranking');
    onClose();
  };

  const insightTypes = [
    { id: 'heatmap' as InsightType, label: 'Heatmap', icon: MapPin },
    { id: 'horizontal' as InsightType, label: 'List', icon: BarChart3 },
    { id: 'pie' as InsightType, label: 'List', icon: PieChart },
    { id: 'table' as InsightType, label: 'List', icon: Table },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[20px] shadow-[0px_7px_20px_0px_rgba(0,0,0,0.1)] z-50 overflow-hidden">
        <div className="px-7 py-6 flex flex-col gap-2.5">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <h2
              style={{ fontFamily: `'${styleConfig.headingFont}',sans-serif` }}
              className="text-[24px] text-black leading-5"
            >
              Edit Pork Purchase Index
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-[#4B5565]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex gap-3.5">
            {/* Left: Preview */}
            <div className="flex flex-col gap-1.5 w-[848px]">
              <p
                style={{ fontFamily: `'${styleConfig.headingFont}',sans-serif` }}
                className="text-[14px] text-[#6a6a6a] leading-5"
              >
                PREVIEW
              </p>
              <div className="w-full aspect-[1226/1016] bg-gray-50 rounded-lg overflow-hidden">
                {insightType === 'heatmap' ? (
                  <div className="w-full h-full p-6">
                    <HeatmapView styleConfig={styleConfig} />
                  </div>
                ) : insightType === 'horizontal' ? (
                  <div className="w-full h-full p-6 overflow-y-auto">
                    <div className="space-y-3">
                      <PostcodeRow rank={1} area="Orchard / River Valley" index={228} households={8400} styleConfig={styleConfig} />
                      <PostcodeRow rank={2} area="Tanglin" index={214} households={12100} styleConfig={styleConfig} />
                      <PostcodeRow rank={3} area="Bukit Timah" index={202} households={9700} styleConfig={styleConfig} />
                      <PostcodeRow rank={4} area="Novena" index={187} households={7200} styleConfig={styleConfig} />
                      <PostcodeRow rank={5} area="Marine Parade" index={176} households={5800} styleConfig={styleConfig} />
                      <PostcodeRow rank={6} area="Bishan / Ang Mo Kio" index={168} households={10400} styleConfig={styleConfig} />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    {insightType === 'pie' && <PieChart className="w-24 h-24" />}
                    {insightType === 'table' && <Table className="w-24 h-24" />}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Configuration */}
            <div className="w-[461px] px-4 py-3 flex flex-col gap-6">
              {/* Tabs */}
              <div className="flex h-8">
                <button
                  onClick={() => setActiveTab('setup')}
                  style={{
                    fontFamily: `'${styleConfig.headingFont}',sans-serif`,
                    color: activeTab === 'setup' ? '#5f3acd' : '#4b473e',
                    borderBottomColor: activeTab === 'setup' ? '#5f3acd' : '#e9e9e9',
                  }}
                  className={`px-3 py-1 text-[12px] leading-normal ${
                    activeTab === 'setup' ? 'border-b-2' : 'border-b'
                  }`}
                >
                  Set Up
                </button>
                <button
                  onClick={() => setActiveTab('customization')}
                  style={{
                    fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                    color: activeTab === 'customization' ? '#5f3acd' : '#4b473e',
                    borderBottomColor: activeTab === 'customization' ? '#5f3acd' : '#e9e9e9',
                  }}
                  className={`px-3 py-1 text-[12px] leading-normal ${
                    activeTab === 'customization' ? 'border-b-2' : 'border-b'
                  }`}
                >
                  Customization
                </button>
              </div>

              {/* Insight Name */}
              <div className="flex flex-col gap-2">
                <label
                  style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
                  className="text-[12px] font-bold text-[#4b473e]"
                >
                  Insight Name
                </label>
                <input
                  type="text"
                  value={insightName}
                  onChange={(e) => setInsightName(e.target.value)}
                  style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
                  className="h-8 px-3 py-2 bg-white border border-[#e9e9e9] rounded text-[14px] text-[#140934] outline-none focus:border-[#5f3acd]"
                />
              </div>

              {/* Insight Type */}
              <div className="flex flex-col gap-2">
                <label
                  style={{ fontFamily: `'${styleConfig.headingFont}',sans-serif` }}
                  className="text-[12px] text-[#4b473e]"
                >
                  Insight Type
                </label>
                <div className="grid grid-cols-2 gap-1">
                  {insightTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = insightType === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setInsightType(type.id)}
                        style={{
                          backgroundColor: isSelected ? '#f5f2ff' : 'white',
                          borderColor: isSelected ? '#e7e0fb' : '#e9e9e9',
                        }}
                        className="p-2 border rounded flex items-center gap-2 hover:bg-gray-50 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-[#7C57E7]" />
                        <span
                          style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
                          className="text-[14px] text-[#4b473e] leading-5"
                        >
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Metric */}
              <div className="flex flex-col gap-2">
                <label
                  style={{ fontFamily: `'${styleConfig.headingFont}',sans-serif` }}
                  className="text-[12px] text-[#4b473e]"
                >
                  Metric
                </label>
                <div className="relative">
                  <select
                    style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
                    className="w-full h-8 px-3 pr-8 bg-white border border-[#e9e9e9] rounded text-[14px] text-[#140934] outline-none focus:border-[#5f3acd] appearance-none"
                  >
                    <option>Pork Purchase Index</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b473e] pointer-events-none" />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#f4f4f4]" />

              {/* Add Segmentation */}
              <div className="flex flex-col gap-3">
                <p
                  style={{ fontFamily: `'${styleConfig.headingFont}',sans-serif` }}
                  className="text-[14px] text-[#6a6a6a] leading-5"
                >
                  ADD SEGMENTATION
                </p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search and add filter..."
                    style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
                    className="w-full h-8 px-3 pr-8 bg-white border border-[#e9e9e9] rounded text-[14px] text-[#140934] outline-none focus:border-[#5f3acd] placeholder:text-[#140934]"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b473e] pointer-events-none" />
                </div>
                <div className="flex gap-1.5">
                  {['Channels', 'Postcodes', 'Regions'].map((filter) => (
                    <div
                      key={filter}
                      className="px-2 py-1 bg-[#fafbda] rounded-lg"
                    >
                      <span
                        style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
                        className="text-[14px] font-medium text-[#655d4b] leading-4"
                      >
                        {filter}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                style={{
                  fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                  backgroundColor: styleConfig.brandColor,
                }}
                className="w-[139px] h-[42px] rounded-2xl text-white text-[18px] font-medium hover:opacity-90 transition-opacity"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
