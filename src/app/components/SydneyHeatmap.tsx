import type { StyleConfig } from './CustomizationPopover';

interface SydneyHeatmapProps {
  styleConfig: StyleConfig;
}

interface Region {
  id: string;
  name: string;
  index: number;
  path: string;
}

const regions: Region[] = [
  {
    id: 'liverpool',
    name: 'Liverpool',
    index: 214,
    path: 'M 150 280 L 180 265 L 210 270 L 220 300 L 200 320 L 170 315 Z',
  },
  {
    id: 'bankstown',
    name: 'Bankstown',
    index: 206,
    path: 'M 220 240 L 250 230 L 275 245 L 270 275 L 240 285 L 210 270 Z',
  },
  {
    id: 'campbelltown',
    name: 'Campbelltown',
    index: 189,
    path: 'M 200 350 L 230 340 L 255 360 L 245 390 L 215 395 L 190 380 Z',
  },
  {
    id: 'penrith',
    name: 'Penrith',
    index: 168,
    path: 'M 80 220 L 115 210 L 140 225 L 135 255 L 105 265 L 75 250 Z',
  },
  {
    id: 'parramatta',
    name: 'Parramatta',
    index: 160,
    path: 'M 180 210 L 210 200 L 235 215 L 230 245 L 200 255 L 175 240 Z',
  },
  {
    id: 'blacktown',
    name: 'Blacktown',
    index: 182,
    path: 'M 140 185 L 170 175 L 195 190 L 190 220 L 160 230 L 135 215 Z',
  },
  {
    id: 'cabramatta',
    name: 'Cabramatta',
    index: 160,
    path: 'M 170 290 L 195 280 L 215 295 L 210 320 L 185 325 L 165 310 Z',
  },
  {
    id: 'camden',
    name: 'Camden',
    index: 189,
    path: 'M 130 330 L 160 320 L 180 335 L 175 365 L 145 370 L 125 355 Z',
  },
  {
    id: 'stgeorge',
    name: 'St George',
    index: 124,
    path: 'M 260 310 L 285 300 L 305 315 L 300 345 L 275 350 L 255 335 Z',
  },
  {
    id: 'sutherland',
    name: 'Sutherland',
    index: 131,
    path: 'M 245 420 L 275 410 L 295 425 L 290 455 L 260 460 L 240 445 Z',
  },
  {
    id: 'innerwest',
    name: 'Inner West',
    index: 128,
    path: 'M 240 200 L 265 190 L 285 205 L 280 235 L 255 240 L 235 225 Z',
  },
  {
    id: 'northshore',
    name: 'N. Shore',
    index: 92,
    path: 'M 280 140 L 305 130 L 325 145 L 320 175 L 295 180 L 275 165 Z',
  },
  {
    id: 'northernbeaches',
    name: 'N. Beaches',
    index: 142,
    path: 'M 350 100 L 375 90 L 395 105 L 390 135 L 365 140 L 345 125 Z',
  },
  {
    id: 'hornsby',
    name: 'Hornsby',
    index: 78,
    path: 'M 240 80 L 265 70 L 285 85 L 280 115 L 255 120 L 235 105 Z',
  },
  {
    id: 'easternsuburbs',
    name: 'East',
    index: 88,
    path: 'M 330 240 L 355 230 L 375 245 L 370 275 L 345 280 L 325 265 Z',
  },
  {
    id: 'cbd',
    name: 'CBD',
    index: 74,
    path: 'M 290 210 L 310 205 L 325 215 L 320 240 L 300 245 L 285 235 Z',
  },
  {
    id: 'botany',
    name: 'Botany Bay',
    index: 110,
    path: 'M 310 360 L 335 350 L 355 365 L 350 395 L 325 400 L 305 385 Z',
  },
  {
    id: 'quakershill',
    name: 'Quakers Hill',
    index: 120,
    path: 'M 115 155 L 140 145 L 160 160 L 155 190 L 130 195 L 110 180 Z',
  },
];

export default function SydneyHeatmap({ styleConfig }: SydneyHeatmapProps) {
  const getPaletteColors = () => {
    switch (styleConfig.chartPalette) {
      case 'sequential':
        return ['#faf5ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', styleConfig.brandColor];
      case 'categorical':
        return ['#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'];
      case 'diverging':
        return ['#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c'];
      case 'mono':
        return ['#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252'];
      default:
        return ['#faf5ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', styleConfig.brandColor];
    }
  };

  const colors = getPaletteColors();
  const maxIndex = Math.max(...regions.map(r => r.index));
  const minIndex = Math.min(...regions.map(r => r.index));

  const getColorForIndex = (index: number) => {
    const normalized = (index - minIndex) / (maxIndex - minIndex);
    const colorIndex = Math.floor(normalized * (colors.length - 1));
    return colors[colorIndex];
  };

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 500 550"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))' }}
      >
        {/* Background */}
        <rect x="0" y="0" width="500" height="550" fill="#f8f9fa" />

        {/* Water/Ocean areas */}
        <ellipse cx="420" cy="280" rx="80" ry="120" fill="#e3f2fd" opacity="0.5" />
        <ellipse cx="380" cy="480" rx="90" ry="60" fill="#e3f2fd" opacity="0.5" />
        <path d="M 350 150 Q 420 180 450 120 L 500 150 L 500 0 L 350 0 Z" fill="#e3f2fd" opacity="0.5" />

        {/* Regions */}
        {regions.map((region) => (
          <g key={region.id}>
            <path
              d={region.path}
              fill={getColorForIndex(region.index)}
              stroke="#ffffff"
              strokeWidth="2"
              className="transition-all duration-300 hover:opacity-80 cursor-pointer"
            >
              <title>{`${region.name}: ${region.index}`}</title>
            </path>
            <text
              x={region.path.split(' ')[1]}
              y={region.path.split(' ')[2]}
              style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
              className="text-[10px] font-medium pointer-events-none"
              fill="#ffffff"
              textAnchor="middle"
              dy="5"
            >
              {region.name}
            </text>
            <text
              x={region.path.split(' ')[1]}
              y={region.path.split(' ')[2]}
              style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
              className="text-[9px] font-bold pointer-events-none"
              fill="#ffffff"
              textAnchor="middle"
              dy="18"
            >
              {region.index}
            </text>
          </g>
        ))}

        {/* Location labels for reference */}
        <text
          x="450"
          y="280"
          style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
          className="text-[11px] italic"
          fill="#90a4ae"
        >
          Pacific Ocean
        </text>
        <text
          x="420"
          y="500"
          style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
          className="text-[11px] italic"
          fill="#90a4ae"
        >
          Botany Bay
        </text>
        <text
          x="420"
          y="130"
          style={{ fontFamily: `'${styleConfig.bodyFont}',sans-serif` }}
          className="text-[11px] italic"
          fill="#90a4ae"
        >
          Sydney Harbour
        </text>
      </svg>
    </div>
  );
}
