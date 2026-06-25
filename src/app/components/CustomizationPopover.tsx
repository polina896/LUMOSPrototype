import { useState } from 'react';
import { X, Upload, Minus, Plus } from 'lucide-react';

interface CustomizationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onStyleChange: (style: StyleConfig) => void;
}

export interface StyleConfig {
  brandColor: string;
  headingFont: string;
  bodyFont: string;
  bodySize: number;
  chartPalette: 'sequential' | 'categorical' | 'diverging' | 'mono';
}

const BRAND_COLORS = [
  { name: 'Purple', value: '#7c6bf0' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Brown', value: '#92400e' },
  { name: 'Gray', value: '#6b7280' },
];

const FONTS = ['Jua', 'Inter', 'Geist', 'DM Sans', 'Arial', 'Helvetica'];

export default function CustomizationPopover({
  isOpen,
  onClose,
  onStyleChange,
}: CustomizationPopoverProps) {
  const [brandColor, setBrandColor] = useState('#7c6bf0');
  const [headingFont, setHeadingFont] = useState('Jua');
  const [bodyFont, setBodyFont] = useState('Inter');
  const [bodySize, setBodySize] = useState(13.5);
  const [chartPalette, setChartPalette] = useState<'sequential' | 'categorical' | 'diverging' | 'mono'>('sequential');

  const handleReset = () => {
    setBrandColor('#7c6bf0');
    setHeadingFont('Jua');
    setBodyFont('Inter');
    setBodySize(13.5);
    setChartPalette('sequential');
    onStyleChange({
      brandColor: '#7c6bf0',
      headingFont: 'Jua',
      bodyFont: 'Inter',
      bodySize: 13.5,
      chartPalette: 'sequential',
    });
  };

  const handleColorChange = (color: string) => {
    setBrandColor(color);
    onStyleChange({ brandColor: color, headingFont, bodyFont, bodySize, chartPalette });
  };

  const handleHeadingFontChange = (font: string) => {
    setHeadingFont(font);
    onStyleChange({ brandColor, headingFont: font, bodyFont, bodySize, chartPalette });
  };

  const handleBodyFontChange = (font: string) => {
    setBodyFont(font);
    onStyleChange({ brandColor, headingFont, bodyFont: font, bodySize, chartPalette });
  };

  const handleBodySizeChange = (size: number) => {
    setBodySize(size);
    onStyleChange({ brandColor, headingFont, bodyFont, bodySize: size, chartPalette });
  };

  const handleChartPaletteChange = (palette: 'sequential' | 'categorical' | 'diverging' | 'mono') => {
    setChartPalette(palette);
    onStyleChange({ brandColor, headingFont, bodyFont, bodySize, chartPalette: palette });
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-16 w-[340px] bg-white rounded-xl shadow-2xl border border-[#e5e5e2] z-50 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#e5e5e2] flex items-center justify-between">
        <h3 className="font-['Jua',sans-serif] text-[16px] text-[#1a1a1a]">Customise style</h3>
        <button
          onClick={handleReset}
          className="font-['Jua',sans-serif] text-[13px] text-[#7c6bf0] hover:text-[#6a5adf] transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="max-h-[600px] overflow-y-auto p-5 space-y-6">
        {/* Brand Section */}
        <div>
          <h4 className="font-['Jua',sans-serif] text-[11px] text-[#999] uppercase tracking-wide mb-3">
            BRAND
          </h4>
          <div className="flex items-center gap-3 p-3 bg-[#f5f5f5] rounded-lg">
            <div className="w-10 h-10 bg-[#0d9488] rounded-lg flex items-center justify-center text-white font-bold text-[18px]">
              H
            </div>
            <div className="flex-1">
              <div className="font-['Jua',sans-serif] text-[13px] text-[#1a1a1a]">
                homebuilder-logo.svg
              </div>
              <div className="flex gap-2 mt-1">
                <button className="font-['Jua',sans-serif] text-[11px] text-[#7c6bf0] hover:text-[#6a5adf]">
                  Replace
                </button>
                <span className="text-[#ccc]">|</span>
                <button className="font-['Jua',sans-serif] text-[11px] text-[#7c6bf0] hover:text-[#6a5adf]">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Typography Section */}
        <div>
          <h4 className="font-['Jua',sans-serif] text-[11px] text-[#999] uppercase tracking-wide mb-3">
            TYPOGRAPHY
          </h4>
          <div className="space-y-3">
            <div>
              <label className="font-['Jua',sans-serif] text-[12px] text-[#666] mb-1 block">
                Heading
              </label>
              <select
                value={headingFont}
                onChange={(e) => handleHeadingFontChange(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#e5e5e2] rounded-lg font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] outline-none focus:border-[#7c6bf0]"
              >
                {FONTS.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-['Jua',sans-serif] text-[12px] text-[#666] mb-1 block">
                Body
              </label>
              <select
                value={bodyFont}
                onChange={(e) => handleBodyFontChange(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#e5e5e2] rounded-lg font-['Jua',sans-serif] text-[13px] text-[#1a1a1a] outline-none focus:border-[#7c6bf0]"
              >
                {FONTS.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-['Jua',sans-serif] text-[12px] text-[#666] mb-1 block">
                Body size
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBodySizeChange(Math.max(10, bodySize - 0.5))}
                  className="w-8 h-8 flex items-center justify-center border border-[#e5e5e2] rounded-md hover:bg-gray-50"
                >
                  <Minus className="w-3 h-3 text-[#666]" />
                </button>
                <input
                  type="number"
                  value={bodySize}
                  onChange={(e) => handleBodySizeChange(parseFloat(e.target.value))}
                  className="flex-1 px-3 py-2 bg-white border border-[#e5e5e2] rounded-lg font-['Jua',sans-serif] text-[13px] text-center text-[#1a1a1a] outline-none focus:border-[#7c6bf0]"
                  step="0.5"
                  min="10"
                  max="20"
                />
                <button
                  onClick={() => handleBodySizeChange(Math.min(20, bodySize + 0.5))}
                  className="w-8 h-8 flex items-center justify-center border border-[#e5e5e2] rounded-md hover:bg-gray-50"
                >
                  <Plus className="w-3 h-3 text-[#666]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Colour Section */}
        <div>
          <h4 className="font-['Jua',sans-serif] text-[11px] text-[#999] uppercase tracking-wide mb-3">
            BRAND COLOUR
          </h4>
          <div className="flex gap-2 flex-wrap">
            {BRAND_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorChange(color.value)}
                className={`w-10 h-10 rounded-lg transition-all ${
                  brandColor === color.value
                    ? 'ring-2 ring-offset-2 ring-[#7c6bf0] scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
            <button className="w-10 h-10 rounded-lg border-2 border-dashed border-[#ccc] flex items-center justify-center hover:border-[#7c6bf0] transition-colors">
              <Plus className="w-4 h-4 text-[#999]" />
            </button>
          </div>
        </div>

        {/* Chart Palette Section */}
        <div>
          <h4 className="font-['Jua',sans-serif] text-[11px] text-[#999] uppercase tracking-wide mb-3">
            CHART PALETTE
          </h4>
          <div className="space-y-2">
            <PaletteOption
              name="Sequential_brand"
              type="sequential"
              isSelected={chartPalette === 'sequential'}
              onClick={() => handleChartPaletteChange('sequential')}
              colors={['#e8e5f8', '#c5bcf3', '#9d8ef0', '#7c6bf0', '#5a4ad4']}
            />
            <PaletteOption
              name="Categorical"
              type="categorical"
              isSelected={chartPalette === 'categorical'}
              onClick={() => handleChartPaletteChange('categorical')}
              colors={['#0d9488', '#2563eb', '#ea580c', '#92400e', '#f59e0b']}
            />
            <PaletteOption
              name="Diverging"
              type="diverging"
              isSelected={chartPalette === 'diverging'}
              onClick={() => handleChartPaletteChange('diverging')}
              colors={['#dc2626', '#f87171', '#fef3c7', '#86efac', '#16a34a']}
            />
            <PaletteOption
              name="Mono"
              type="mono"
              isSelected={chartPalette === 'mono'}
              onClick={() => handleChartPaletteChange('mono')}
              colors={['#f5f5f5', '#d4d4d4', '#a3a3a3', '#525252', '#171717']}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PaletteOption({
  name,
  type,
  isSelected,
  onClick,
  colors,
}: {
  name: string;
  type: string;
  isSelected: boolean;
  onClick: () => void;
  colors: string[];
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg border-2 transition-all ${
        isSelected
          ? 'border-[#7c6bf0] bg-[#f8f7ff]'
          : 'border-[#e5e5e2] hover:border-[#d0d0d0]'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-['Jua',sans-serif] text-[12px] text-[#1a1a1a]">{name}</span>
      </div>
      <div className="flex gap-1">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex-1 h-6 rounded"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </button>
  );
}
