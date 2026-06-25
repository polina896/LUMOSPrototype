# Plan: Purchasing Behaviour Charts + Data Sources Popover

## Context
Two enhancements to the audience detail panel and chat footer:
1. The BEHAVIOURS section in `AudienceDetailPanel` currently shows plain text bullets. It needs supporting graphs to make spend patterns visual and credible.
2. The "10 data sources analysed" pill in the chat `AIMessageFooter` is static. The user wants an interactive version — click to reveal the actual data sources powering the analysis. The same indicator should also appear on the audience detail panel.

---

## Change 1: Purchasing Behaviour Charts in AudienceDetailPanel

### Data additions — `src/app/audienceData.ts`

Add a `behaviourData` field to the `Audience` interface and each audience object. Three chart datasets per audience:

```ts
behaviourData: {
  weeklyFrequency: { day: string; txns: number }[];    // Mon–Sun bar chart
  timeOfDay: { slot: string; pct: number }[];           // Morning / Lunch / Dinner / Late Night
  seasonalIndex: { month: string; index: number }[];    // Jan–Dec spend index (100 = baseline)
}
```

**Eating Places – High Spenders values:**
- weeklyFrequency: Mon 2, Tue 2, Wed 3, Thu 3, Fri 6, Sat 7, Sun 4
- timeOfDay: Morning 8%, Lunch 22%, Dinner 58%, Late Night 12%
- seasonalIndex: peaks Dec 142, Nov 138, Feb 131; troughs Jul 84, Aug 87

**Eating Places – Frequent Buyers values:**
- weeklyFrequency: Mon 4, Tue 5, Wed 5, Thu 5, Fri 5, Sat 4, Sun 3
- timeOfDay: Morning 12%, Lunch 38%, Dinner 38%, Late Night 12%
- seasonalIndex: flat baseline, modest winter peak Dec 118, Jan 114

**QSR – Frequent Buyers values:**
- weeklyFrequency: Mon 5, Tue 6, Wed 6, Thu 5, Fri 5, Sat 4, Sun 3
- timeOfDay: Morning 14%, Lunch 44%, Dinner 28%, Late Night 14%
- seasonalIndex: near-flat, slight Nov 111, Dec 108 uplift

### UI additions — `src/app/components/AudienceDetailPanel.tsx`

Replace the current plain-text BEHAVIOURS section with two sub-sections:

**BEHAVIOURS** — Keep the 4 text bullets as-is (white bordered boxes), unchanged.

**PURCHASE PATTERNS** — New section added directly below BEHAVIOURS. Three mini chart cards inside white rounded boxes (`bg-white border border-[#e5e5e2] rounded-lg p-3`):

1. **Weekly Frequency** — `BarChart` from recharts (height 80px, `ResponsiveContainer` width 100%). Mon–Sun on X-axis (abbreviated), transaction count on Y (no label). Bar fill `#732d93`. No grid lines. Tiny x-axis tick labels only.

2. **Time of Day Split** — Full-width segmented bar (plain div, no recharts). Height 20px. Four colour-coded segments side by side proportional to percentage: Morning `#c4b5fd`, Lunch `#7c6bf0`, Dinner `#732d93`, Late Night `#4a1a6b`. Mini colour legend row underneath with labels and percentages.

3. **Seasonal Spend Index** — `AreaChart` from recharts (height 80px, `ResponsiveContainer` 100%). X-axis: abbreviated month names. A dashed reference line at y=100 (baseline). Area fill `rgba(115,45,147,0.15)`, stroke `#732d93`. Highlights the Nov–Feb region visually with a slightly different background shade or just the data naturally peaking.

Use `BarChart`, `Bar`, `AreaChart`, `Area`, `XAxis`, `ReferenceLine`, `ResponsiveContainer` from `recharts` (already installed, confirmed). Do **not** use the `ChartContainer` wrapper from `ui/chart.tsx` — these are small inline charts, the wrapper adds unnecessary complexity.

---

## Change 2: Interactive Data Sources Indicator

### New shared component — `src/app/components/DataSourcesPopover.tsx`

A self-contained component with internal open/close toggle state. Props: `label?: string` (defaults to `"5 data sources"`).

Renders:
- A clickable pill: `Info` icon (lucide, already imported in other files) + label text, styled like the existing chat footer pill (`bg-[#f5f5f5] rounded-full px-3 py-1.5`)
- On click: toggles a popover card (`absolute z-50 bg-white border border-[#e5e5e2] rounded-xl shadow-lg w-[280px] p-4`) listing 5 data sources
- Closes on outside click via `useRef` + `useEffect` mousedown listener (same pattern as `AudiencePickerPopup` in `ChatPanel.tsx` at line ~45)

**Popover content:**
```
DATA SOURCES  (small grey uppercase label)
──────────────────────────────────────────
🔒  Mastercard First-Party Spend Data
    Transaction-level, anonymised cardholder data
    across 150M+ active cards globally.

📍  Lumos Geospatial Intelligence
    Foot traffic and POI visit signals enriching
    cardholder location behaviour.

👤  Experian Demographic Segmentation
    Income, age, and household composition layers
    applied at segment level.

🌐  LiveRamp Digital Identity Graph
    Cross-channel digital behaviour signals linked
    to cardholder profiles.

🍽️  Mastercard MCC Classification
    Merchant Category Codes used to classify and
    rank dining transaction types.
```

Popover position: in the audience panel (narrow right-side panel) open **upward** (`bottom-full mb-2`); in the chat footer open **upward** as well since the pill sits near the bottom of the scroll area.

### Location A — `src/app/components/AudienceDetailPanel.tsx`

Add `<DataSourcesPopover />` just above the `<div className="h-4" />` spacer at the bottom of the scrollable content area, inside the existing `space-y-4` div. The pill sits naturally between the Messaging Thought Starters and the Estimated Reach footer.

### Location B — `src/app/components/ChatPanel.tsx` → `AIMessageFooter`

Replace the existing static pill:
```tsx
<div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f5f5f5] rounded-full">
  <span className="text-[14px]">🔍</span>
  <span className="text-[14px]">📊</span>
  <span className="font-['Geist',sans-serif] text-[13px] text-[#666]">10 data sources analysed</span>
</div>
```
with `<DataSourcesPopover label="5 data sources analysed" />` wrapped in a `relative` div so the popover positions correctly.

---

## Files to modify

| File | Change |
|---|---|
| `src/app/audienceData.ts` | Add `behaviourData` to `Audience` interface + values for all 3 audiences |
| `src/app/components/AudienceDetailPanel.tsx` | Add PURCHASE PATTERNS section with 3 charts; add DataSourcesPopover |
| `src/app/components/ChatPanel.tsx` | Replace static pill in `AIMessageFooter` with `<DataSourcesPopover>` |
| `src/app/components/DataSourcesPopover.tsx` | New shared component (popover + pill) |

---

## Verification
1. Open brief path → click an audience card at profiles/deep-dive screen → side panel opens → scroll to BEHAVIOURS — confirm existing text bullets are intact.
2. Below that, confirm PURCHASE PATTERNS section renders: weekly bar chart (Mon–Sun), time-of-day segmented bar with legend, seasonal area chart with baseline dashed line. Switch between all 3 audiences — data should differ visibly (High Spenders peaks Fri/Sat/Dinner; QSR peaks Tue–Thu/Lunch).
3. Click "5 data sources" pill in audience panel → popover opens listing all 5 sources → click outside → closes cleanly.
4. Run to result screen → confirm "5 data sources analysed" pill in chat footer opens same popover on click → closes on outside click.
5. No TypeScript errors from the new `behaviourData` interface field.
