# Plan: Update AudienceLibrary to v6 design

## Context

The user has manually updated the design reference to `audience-library-v6.html`. Three visual changes distinguish v6 from the current implementation:
1. A new slim app top bar (workspace switcher + Lumos logo/bell)
2. Group header category icons replaced from a plain square to an SVG icon matched to each category
3. Row identity and segment pills redesigned — small dot replaced by a 20px gradient circle avatar; bordered pill replaced by a filled coloured pill (background + text keyed to segment type)

Only `src/app/components/AudienceLibrary.tsx` needs to change.

---

## Changes to `src/app/components/AudienceLibrary.tsx`

### 1 — Add app top bar (inside the white card, above `.topbar`)

```tsx
<div className="flex items-center justify-between px-[18px] py-[11px] border-b border-[#F2F0EC]">
  {/* Workspace switcher */}
  <div className="flex items-center gap-2 text-[13.5px] font-medium text-[#262329]">
    <span className="w-[22px] h-[22px] rounded-[6px] bg-[#1D9E75] text-white text-[10px] font-bold flex items-center justify-center">AM</span>
    AS Mobbin
    <span className="text-[#A6A2AA] text-[10px]">▾</span>
  </div>
  {/* Right: bell + Lumos logo */}
  <div className="flex items-center gap-[14px]">
    <Bell className="w-[17px] h-[17px] text-[#A6A2AA]" />
    <div className="flex items-center gap-2">
      <span className="w-[27px] h-[27px] rounded-[8px] bg-[#7C3AED] text-white flex items-center justify-center">
        <Sparkles className="w-4 h-4" />  {/* or inline star SVG */}
      </span>
      <span className="font-['Jua',sans-serif] text-[17px] text-[#262329]">Lumos</span>
    </div>
  </div>
</div>
```

Use `Bell` from lucide-react (already available). For the Lumos star mark, use an inline SVG path `M12 2C12.5 7 17 11.5 22 12C17 12.5 12.5 17 12 22C11.5 17 7 12.5 2 12C7 11.5 11.5 7 12 2Z` (4-pointed star), since lucide doesn't have this exact shape.

### 2 — Gradient circle avatars (replace 7px dots in rows)

Add a `SEGMENT_AVATAR` map keyed to `SegmentKey`:

```ts
const SEGMENT_AVATAR: Record<SegmentKey, string> = {
  "high-value": "linear-gradient(135deg,#A488F1,#5B27B4)",
  "frequent":   "linear-gradient(135deg,#5FD0AB,#0F6E56)",
  "loyal":      "linear-gradient(135deg,#73ACEB,#185FA5)",
  "new":        "linear-gradient(135deg,#A0CB60,#3B6D11)",
  "lapsed":     "linear-gradient(135deg,#E6AE5E,#854F0B)",
  "in-market":  "linear-gradient(135deg,#EE9168,#993C1D)",
  "custom":     "linear-gradient(135deg,#D77FA0,#8E2F4E)",
};
```

Replace `<span className="w-[7px] h-[7px] rounded-full..." style={{ background: color }} />` in row render with:

```tsx
<span className="w-[20px] h-[20px] rounded-full flex-none"
  style={{ background: SEGMENT_AVATAR[audience.segment] }} />
```

Also update name gap from `gap-[9px]` → `gap-[11px]`.

### 3 — Filled segment pills (replace bordered pill with coloured fill)

Add a `PILL_STYLE` map:

```ts
const PILL_STYLE: Record<SegmentKey, { bg: string; text: string }> = {
  "high-value": { bg: "#EDE6FB", text: "#5B27B4" },
  "frequent":   { bg: "#D7EFE6", text: "#0F6E56" },
  "loyal":      { bg: "#DEEBFA", text: "#185FA5" },
  "new":        { bg: "#E6F1D6", text: "#3B6D11" },
  "lapsed":     { bg: "#FAE8CE", text: "#854F0B" },
  "in-market":  { bg: "#FAE3DA", text: "#993C1D" },
  "custom":     { bg: "#FBE2EC", text: "#993556" },
};
```

Update `SegmentPill` button styling: remove `border border-[#ECEAE6]` and `bg-white`, apply background and text colour from `PILL_STYLE[seg]`. The dot inside the pill uses `currentColor` (i.e. the text colour).

### 4 — Category icons in group headers

Add a `CATEGORY_ICON` map that returns an SVG element for each category string. For unrecognised categories fall back to a generic grid/tag icon. Implement a small `CategoryIcon` component that receives the category name and renders the matching SVG inside a `24×24 rounded-[7px]` box:

- **Eating Places** / food: fork & knife path
- **Airline Travelers** / travel/flight: paper plane (send icon from lucide)
- **Home Improvement** / tools: wrench/tool path
- **Fashion & Apparel**: shirt/hanger
- **Automotive**: car
- **Supermarkets**: shopping cart
- **Health & Fitness**: activity/heart
- **Banking & Finance**: credit card
- **Travel & Tourism**: map/compass
- **Electronics**: zap/cpu
- **Petcare**: heart (with paw feel)
- **Education**: book
- **Streaming & Media**: play circle
- **Real Estate**: home
- **default fallback**: tag icon

Use lucide-react icons where the shape matches well; inline SVG only when needed (e.g. the fork/knife path from the HTML).

Replace the current `<span className="w-[15px] h-[15px] rounded-[5px] bg-[#EDEAE5] flex-none" />` in group headers with `<CategoryIcon category={group} />`.

---

## Verification

1. Open the app, click Audiences in the sidebar
2. Confirm the slim app bar appears at the top with "AS Mobbin" workspace and "Lumos" logo
3. Each category group header shows a distinct SVG icon
4. Each row shows a 20px gradient circle instead of a 7px dot
5. Segment pills are filled (no border, coloured bg + matching text), dot inside matches text colour
6. All existing interactivity (search, filter, sort, collapse, drag, segment picker) still works

---

# Plan: Replace Mastercard data with Koala Cola dummy data

## Context

The app currently uses "Mastercard" as both the workspace name and the fictional client behind all campaign copy, audience descriptions, data sources, and conversation flows. The user wants this replaced with "Koala Cola" — the older prototype brand already present in the Figma-imported design components (`/src/imports/AudienceCreation/index.tsx`). Koala Cola is a New Zealand beverage company launching in Australia; the older prototype used an FMCG/beverage context rather than a payments/credit-card context.

## Files to change (7 files)

### 1. `src/app/components/Sidebar.tsx` — 1 change
- Workspace switcher label: `"Mastercard"` → `"Koala Cola"`

### 2. `src/app/components/DataSourcesPopover.tsx` — 2 changes
Replace the two Mastercard-specific data sources with FMCG/location equivalents:
- `"Mastercard First-Party Spend Data"` → `"Shopper Movement Data"` with description about location and purchase-intent signals
- `"Mastercard MCC Classification"` → `"Category Purchase Index"` with description about FMCG category classification

### 3. `src/app/audienceData.ts` — full content rewrite
Change the 3 audience IDs and all content from credit-card/dining to beverage/FMCG:

| Old ID | New ID |
|---|---|
| `eating-places-high-spenders` | `cola-enthusiasts` |
| `eating-places-frequent-buyers` | `convenience-shoppers` |
| `qsr-frequent-buyers` | `health-switchers` |

New audience themes (maintain same data structure — demographics, interests, behaviours, competitorBrands, channels, behaviourData):
- **Cola Enthusiasts** — high-spend soft drink buyers, premium segments, Index ~230, ~1.8M reach, Age 25–45, income $90K+
- **Convenience Shoppers** — frequent impulse buyers at petrol/convenience, broad reach ~4.2M, Age 18–40
- **Health-Conscious Switchers** — low/no-sugar cola segment, new-to-brand opportunity, ~3.1M, Age 22–38

Update `competitorBrands` arrays to reference Coca-Cola, Pepsi, Solo, Schweppes instead of Amex/Chase/Visa.  
Update `STRATEGIC_INSIGHTS` copy to reflect beverage market stats (summer launch, convenience channel, share-of-throat opportunity).

Also update `AudienceId` type to reflect new IDs.

### 4. `src/app/components/ChatPanel.tsx` — ~21 changes
Replace all Mastercard-specific copy throughout the scripted conversation flow:

- `CLARIFY_QUESTIONS`: dining categories → beverage categories (Cola & Carbonated, Sports & Energy, Flavoured Water), campaign objectives → launch/trial/frequency, third question about layering → distribution channel segments
- `MASTERCARD_AUDIENCES` array / variable name → `AUDIENCE_LIBRARY` — update all audience category names to FMCG categories (Soft Drinks, Snack Foods, Convenience Retail, Petrol & Auto, Supermarkets, Health Foods, etc.) and rename tags from `'High Spenders' | 'Frequent Buyers'` to `'High Value' | 'Frequent Buyers'`
- Popup header: `"Mastercard Audiences"` → `"Audience Library"`
- `UserMessage` brief text: rewrite from winter dining campaign → Sydney summer launch for Koala Cola
- Upload file name: `cardholder_segments.csv` → `koala_cola_segments.csv`
- `AIMessage` and `CollapsibleReasoning` copy: replace all "Mastercard cardholder dining spend" language with beverage purchase intent and convenience shopper language
- Scanning beat text: replace Mastercard scanning copy with location + shopper movement data copy
- Suggestion pills: replace dining/cardholder suggestions with beverage launch suggestions
- `onAddTextBlock` messaging content at the end: rewrite from dining card recs → Koala Cola campaign recs
- Upload path AI message: rewrite from "12,000 Mastercard cardholders" to "customer segments with purchase intent data"

### 5. `src/app/components/AudienceListCard.tsx` — 1 change
- `"Mastercard spend segment · MC Data & Services"` → `"Purchase intent segment · Location & Shopper Data"`

### 6. `src/app/components/AudienceDetailPanel.tsx` — 1 change
- Find and replace the Mastercard reference (likely in a badge or attribution label) with Koala Cola / generic equivalent

### 7. `src/app/components/ArtifactPanel.tsx` — 6 changes
- Replace audience segment descriptions that reference "Mastercard segments"
- Update the campaign recommendation document title from "Mastercard winter dining campaign" → "Koala Cola Sydney summer launch"
- Update any segment copy to reference the 3 new Koala Cola audience names

## AudienceLibrary.tsx — no changes needed
The new `AudienceLibrary.tsx` built in the previous turn already uses brand-neutral dummy data with no Mastercard references.

## Verification
1. Text-search for `"Mastercard"` across all `.tsx`/`.ts` files — should return zero results after changes
2. Check TypeScript still compiles: the `AudienceId` type is used in `App.tsx`, `ChatPanel.tsx`, `AudienceDetailPanel.tsx`, `DataExplorerPanel.tsx` — all ID references must be updated consistently
3. Run through the app flow: blank → planning → clarifying → insights → profiles → deep-dive → result — confirm all copy reads as Koala Cola/FMCG context
4. Open Audiences view and confirm no Mastercard references appear in the library
