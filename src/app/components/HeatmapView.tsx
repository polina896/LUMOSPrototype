import { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import type { StyleConfig } from './CustomizationPopover';
import SydneyHeatmap from './SydneyHeatmap';

interface HeatmapViewProps {
  styleConfig: StyleConfig;
}

const postcodeData = [
  { rank: 1, area: 'Liverpool', postcode: '2132', index: 214, reach: '350k' },
  { rank: 2, area: 'Bankstown', postcode: '2311', index: 189, reach: '120k' },
  { rank: 3, area: 'Campbelltown', postcode: '2003', index: 160, reach: '100k' },
  { rank: 4, area: 'Quaker Hill', postcode: '2766', index: 120, reach: '50k' },
  { rank: 5, area: 'Cabramatta', postcode: '2168', index: 100, reach: '23k' },
];

export default function HeatmapView({ styleConfig }: HeatmapViewProps) {
  const [showBy, setShowBy] = useState<'Postcodes' | 'LGA'>('Postcodes');

  // Get color palette based on chartPalette setting
  const getPaletteColors = () => {
    switch (styleConfig.chartPalette) {
      case 'sequential':
        return ['#e8e5f8', '#c5bcf3', '#9d8ef0', styleConfig.brandColor, `${styleConfig.brandColor}dd`];
      case 'categorical':
        return ['#0d9488', '#2563eb', '#ea580c', '#92400e', '#f59e0b'];
      case 'diverging':
        return ['#dc2626', '#f87171', '#fef3c7', '#86efac', '#16a34a'];
      case 'mono':
        return ['#f5f5f5', '#d4d4d4', '#a3a3a3', '#525252', '#171717'];
      default:
        return ['#e8e5f8', '#c5bcf3', '#9d8ef0', styleConfig.brandColor, `${styleConfig.brandColor}dd`];
    }
  };

  const colors = getPaletteColors();
  const maxIndex = Math.max(...postcodeData.map(d => d.index));

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        {/* Last 7 Days Filter */}
        <button
          style={{
            backgroundColor: `${styleConfig.brandColor}15`,
            borderColor: styleConfig.brandColor,
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-[12px] hover:opacity-80 transition-opacity"
        >
          <Calendar className="w-3.5 h-3.5" style={{ color: styleConfig.brandColor }} />
          <span
            style={{
              fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
              color: styleConfig.brandColor,
            }}
          >
            Last 7 Days
          </span>
          <ChevronDown className="w-3.5 h-3.5" style={{ color: styleConfig.brandColor }} />
        </button>

        {/* Show by Toggle */}
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
              fontSize: `${styleConfig.bodySize + 2}px`,
            }}
            className="text-[#686868]"
          >
            Show by
          </span>
          <div className="flex items-center bg-white border border-[#e7e3ef] rounded-lg p-1">
            <button
              onClick={() => setShowBy('Postcodes')}
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                backgroundColor: showBy === 'Postcodes' ? `${styleConfig.brandColor}15` : 'transparent',
                color: showBy === 'Postcodes' ? '#0a0a0a' : '#827398',
              }}
              className="px-3 py-1 rounded text-[10px] font-medium transition-colors"
            >
              Postcodes
            </button>
            <button
              onClick={() => setShowBy('LGA')}
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                backgroundColor: showBy === 'LGA' ? `${styleConfig.brandColor}15` : 'transparent',
                color: showBy === 'LGA' ? '#0a0a0a' : '#827398',
              }}
              className="px-3 py-1 rounded text-[10px] font-medium transition-colors"
            >
              LGA
            </button>
          </div>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="relative bg-white rounded-lg overflow-hidden h-[400px]">
        <SydneyHeatmap styleConfig={styleConfig} />
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2">
        <span
          style={{
            fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
            fontSize: `${Math.max(10, styleConfig.bodySize - 3)}px`,
          }}
          className="text-[#999]"
        >
          Index 60
        </span>
        <div className="flex h-2 w-32 rounded overflow-hidden">
          {colors.map((color, i) => (
            <div key={i} style={{ backgroundColor: color }} className="flex-1" />
          ))}
        </div>
        <span
          style={{
            fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
            fontSize: `${Math.max(10, styleConfig.bodySize - 3)}px`,
          }}
          className="text-[#999]"
        >
          Index 200+
        </span>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-[#e7e3ef] rounded overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#f9f8fc] grid grid-cols-[180px_1fr_120px_120px] border-b border-[#e7e3ef]">
          <div className="px-3 py-2 flex items-center gap-1">
            <span
              style={{
                fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                color: styleConfig.brandColor,
              }}
              className="text-[10px] font-medium uppercase tracking-wide"
            >
              INDEX
            </span>
            <ChevronDown className="w-3 h-3" style={{ color: styleConfig.brandColor }} />
          </div>
          <div className="px-3 py-2">
            <span
              style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
              className="text-[10px] font-medium uppercase tracking-wide text-[#4f475b]"
            >
              Area
            </span>
          </div>
          <div className="px-3 py-2">
            <span
              style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
              className="text-[10px] font-medium uppercase tracking-wide text-[#4f475b]"
            >
              Postcode
            </span>
          </div>
          <div className="px-3 py-2">
            <span
              style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
              className="text-[10px] font-medium uppercase tracking-wide text-[#4f475b]"
            >
              Reach
            </span>
          </div>
        </div>

        {/* Table Body */}
        {postcodeData.map((row) => {
          const barWidth = (row.index / maxIndex) * 100;
          const colorIndex = Math.min(Math.floor((row.index / maxIndex) * colors.length), colors.length - 1);
          const barColor = colors[colorIndex];

          return (
            <div
              key={row.rank}
              className="grid grid-cols-[180px_1fr_120px_120px] border-b border-[#e7e3ef] last:border-0"
            >
              <div className="px-3 py-3 flex items-center gap-3">
                <div className="flex-1 bg-[rgba(29,4,59,0.1)] rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${barWidth}%`, backgroundColor: barColor }}
                    className="h-full rounded-full"
                  />
                </div>
                <span
                  style={{
                    fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                    fontSize: `${Math.max(10, styleConfig.bodySize - 1.5)}px`,
                  }}
                  className="text-[#28252d] font-medium w-8"
                >
                  {row.index}
                </span>
              </div>
              <div className="px-3 py-3 flex items-center">
                <span
                  style={{
                    fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                    fontSize: `${Math.max(10, styleConfig.bodySize - 1.5)}px`,
                  }}
                  className="text-[#4f475b]"
                >
                  {row.area}
                </span>
              </div>
              <div className="px-3 py-3 flex items-center">
                <span
                  style={{
                    fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                    fontSize: `${Math.max(10, styleConfig.bodySize - 1.5)}px`,
                  }}
                  className="text-[#4f475b]"
                >
                  {row.postcode}
                </span>
              </div>
              <div className="px-3 py-3 flex items-center">
                <span
                  style={{
                    fontFamily: `'${styleConfig.bodyFont}',sans-serif`,
                    fontSize: `${Math.max(10, styleConfig.bodySize - 1.5)}px`,
                  }}
                  className="text-[#4f475b]"
                >
                  {row.reach}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
