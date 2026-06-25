# Plan: Add Digital Twin Tab

## Context
Follows the identical pattern as Mobility & Movement and Temporal & Seasonal. The import already exists at `/src/imports/Screen4DigitalTwin/index.tsx`, exported as `Screen4DigitalTwin` with root `data-name="SCREEN 4 — DIGITAL TWIN"`.

## Change — `src/app/components/AudienceProfileViewer.tsx`

1. Add import: `import Screen4DigitalTwin from "@/imports/Screen4DigitalTwin";`
2. Set Digital Twin tab to `available: true` in the `TABS` array
3. Add render: `{activeTab === 'digital' && <Screen4DigitalTwin />}`
4. Extend the three outer-card CSS rules to also include `[data-name="SCREEN 4 — DIGITAL TWIN"]`

## Verification
Click Digital Twin tab in the deep-dive → Screen4DigitalTwin renders, sidebar hidden, no outer border.

---

# Plan: Fix broken CSS in AudienceProfileViewer

## Context

The CSS rules in `AudienceProfileViewer.tsx` that strip the outer card wrapper and hide the static tab bar are far too broad — they match every `[data-name="Background+Border"]` element in the tree, not only the intended targets. This causes:

- **Outer-card rules** (`background: transparent`, `padding: 0`, `width: 100%`) applied to every inner card (KPI header, dark map cards, grid cards), destroying their layout and making content invisible.
- **Tab-bar rule** (`:has([class*="gap-[4px]"])`) also matches `BackgroundBorder20` in Screen2Mobility (a grid content card whose flex wrapper uses `gap-[4px]`), hiding part of the Mobility tab's detail.

## Fix — `src/app/components/AudienceProfileViewer.tsx`

Replace the four over-broad rules with precise, scoped equivalents.

### Outer card rules — scope to screen root only

Both screens have the outermost BackgroundBorder as a **direct child** of the screen root div:
- `[data-name="SCREEN 1 — PROFILE"] > [data-name="Background+Border"]`
- `[data-name="SCREEN 2 — MOBILITY"] > [data-name="Background+Border"]`

Replace:
```css
/* OLD — applies to every card in the tree */
.kc-deep-dive [data-name="Background+Border"] { … }
.kc-deep-dive [data-name="Background+Border"] > div:first-child { … }
.kc-deep-dive [data-name="Background+Border"] > [aria-hidden] { … }
```
With:
```css
/* NEW — only the outermost wrapper card */
.kc-deep-dive [data-name="SCREEN 1 — PROFILE"] > [data-name="Background+Border"],
.kc-deep-dive [data-name="SCREEN 2 — MOBILITY"] > [data-name="Background+Border"] {
  background: transparent !important;
  border-radius: 0 !important;
  width: 100% !important;
}
.kc-deep-dive [data-name="SCREEN 1 — PROFILE"] > [data-name="Background+Border"] > div:first-child,
.kc-deep-dive [data-name="SCREEN 2 — MOBILITY"] > [data-name="Background+Border"] > div:first-child {
  padding: 0 !important;
  border-radius: 0 !important;
}
.kc-deep-dive [data-name="SCREEN 1 — PROFILE"] > [data-name="Background+Border"] > [aria-hidden],
.kc-deep-dive [data-name="SCREEN 2 — MOBILITY"] > [data-name="Background+Border"] > [aria-hidden] {
  display: none !important;
}
```

### Static tab bar rule — match by height class

The tab bar in both screens has `h-[50px]` in its class (unique — no other inner card uses that exact height). Replace `:has(…)` with:
```css
/* NEW — matches only the 50px-tall tab bar pill container */
.kc-deep-dive [data-name="Background+Border"][class*="h-[50px]"] {
  display: none !important;
}
```

### Sidebar rule — unchanged
The existing rule is already precise enough:
```css
.kc-deep-dive [data-name="Background+Border"] > div > [data-name="Container"] > div > [data-name="VerticalBorder"] {
  display: none !important;
}
```

## Verification
1. Open Audiences → click any audience → Audience Profile tab: KPI header (612k, 1.8×, Sat 7–9am, 58%) visible, all content cards rendered
2. Click Mobility & Movement → full screen including map, postcodes, catchment flow, transaction map, competitor/POI, frequency, reach-by-site cards all visible
3. No duplicate sidebar on either tab
4. No outer grey rounded card border on either tab

---

# Plan: Mobility & Movement Tab

## Context

The deep-dive viewer (`AudienceProfileViewer`) currently renders only `Screen1Profile` (Audience Profile tab). Both imported screens (`Screen1Profile`, `Screen2Mobility`) include a static decorative 4-tab bar baked into the Figma export — the active tab just has a different background color per screen. The task is to wire up `Screen2Mobility-1` as the **Mobility & Movement** tab so the viewer supports both screens with a real interactive tab bar.

## Changes — `src/app/components/AudienceProfileViewer.tsx` only

### 1 — Add tab state
```ts
type DeepDiveTab = 'profile' | 'mobility' | 'temporal' | 'digital';
const [activeTab, setActiveTab] = useState<DeepDiveTab>('profile');
```

### 2 — Render an interactive tab bar
Place it above the scrollable content area. Matches the Figma visual exactly:
- White bg, `rounded-xl`, `border border-[#e5e5e2]`, 50px height
- 4 tabs: `Audience Profile | Mobility & Movement | Temporal & Seasonal | Digital Twin`
- Active pill: `bg-[#f1e9ff] text-[#6b3c72] rounded-[9px]`; inactive: `text-[#6b6b6b]`
- `font-['Jua',sans-serif] text-[13px]`
- Temporal & Seasonal and Digital Twin show a "Coming soon" tooltip or are visually dimmed (not yet implemented)

### 3 — Conditional content render
```tsx
{activeTab === 'profile'  && <Screen1Profile />}
{activeTab === 'mobility' && <Screen2Mobility />}
```
Import `Screen2Mobility` from `@/imports/Screen2Mobility-1`.

### 4 — Extend the scoped CSS rules
Add two more rules inside the existing `<style>` block:

**a) Hide the static tab bar inside both imports** — the tab bar is the only `[data-name="Background+Border"]` whose inner flex container carries `gap-[4px]` (the spacing between the 4 tab pills):
```css
.kc-deep-dive [data-name="Background+Border"]:has([class*="gap-[4px]"]) {
  display: none !important;
}
```

**b) The sidebar-hide and outer-border-remove selectors already use `.kc-deep-dive` as the scope** — they apply automatically to Screen2Mobility since it shares the same `data-name` structure (`Background+Border`, `VerticalBorder`, etc.). No extra rules needed.

## Verification
1. Open Audiences → click any audience → deep-dive opens showing Audience Profile tab
2. Click "Mobility & Movement" tab → Screen2Mobility renders, sidebar hidden, no double border
3. The static tab bar inside each imported screen is hidden; only the interactive tab bar shows
4. Clicking back to "Audience Profile" switches back correctly
5. Temporal & Seasonal and Digital Twin tabs are visible but marked coming-soon (dimmed or disabled)

---

# Previous: AudienceLibrary Full-Width Layout Fix

## Context

The AudienceLibrary currently wraps its content in `max-w-[1100px] mx-auto` with an additional `mx-7` on the inner card, and the card itself has a `rounded-[18px]` border — all of which create visible margins on both sides and make the table feel inset rather than full-screen. The user wants the table to stretch edge-to-edge (filling the space between the sidebar and the right edge of the window), while the left sidebar stays unchanged.

## Change

**File:** `src/app/components/AudienceLibrary.tsx`

Two wrapper divs to update (lines ~368–369):

1. Outer wrapper: remove `max-w-[1100px] mx-auto` → keep only `pb-16 pt-0` (or remove the wrapper entirely and let the inner card be the full-height container)
2. Inner card: remove `mx-7 rounded-[18px] border border-[#ECEAE6]` → the table sits flush, no card chrome

The outer component root (`flex-1 overflow-y-auto bg-[#F4F3F1]`) can stay as-is — it already fills the remaining width after the sidebar.

Also remove the `pb-16 pt-0` wrapper div entirely and apply that padding directly to the root if needed. The result: the white table background fills the full available width with no side margins and no rounded card border.

## Verification

Open the app → click Audiences in sidebar → table rows and header should stretch to the full width of the content area with no visible side gaps.

---

# Previous: Koala Cola Audience Tab Consistency + Step-Through Flow

## Context

The app is an audience analytics tool branded for "Koala Cola." The Figma import (`Screen1Profile`) renders a polished audience detail view (Weekend Runners — Melbourne) with Koala Cola branding. The app's "Audiences" sidebar tab currently opens `AudienceLibrary.tsx` which shows 32 generic audiences across categories like Banking & Finance — these were originally part of a Mastercard-flavored demo and don't match Koala Cola's brand context. The user has already manually edited the Screen1Profile import files to remove Mastercard data; now we need to:

1. Update the Audiences tab content to be Koala Cola-appropriate (removing generic/finance-flavoured audiences)
2. Wire up a step-through viewer using Screen1Profile when a specific audience is opened

---

## Task 1 — Audience Tab: Make Koala Cola-Consistent

**Problem:** `AudienceLibrary.tsx` shows 32 hard-coded audiences across generic categories (Banking & Finance, Home Improvement, etc.) that belong to a generic/Mastercard demo, not a cola brand.

**Fix:**
- Replace the inline `AUDIENCES` array in `AudienceLibrary.tsx` with a Koala Cola-relevant set of ~12–16 audiences across categories that make sense for a beverage brand: Supermarkets, Convenience & Petrol, Health & Fitness, Restaurants & Cafés, Entertainment & Live Events, Sports & Active Lifestyle, Digital & Streaming — removing Banking & Finance entirely.
- Keep the 4 "Your Audiences" entries matching Screen1Profile's sidebar: Weekend Runners, Gen Z Women, Tradies & Utes, Premium EV Intenders (with geo/reach matching the import).
- The existing UI (search, filter, grouping) stays intact — only the data array changes.

**Files:** `src/app/components/AudienceLibrary.tsx`

---

## Task 2 — Step-Through Audience Profile Viewer

**New component:** `src/app/components/AudienceProfileViewer.tsx`

### UX design
A full-screen overlay that renders the imported `Screen1Profile` design inside a scrollable container. A sticky header overlay shows:
- Current section name + step counter (e.g., "3 / 7 — Demographics")
- Previous / Next section buttons
- A row of section dots (progress indicator)
- A close button (×) top-right

### Section navigation mechanism
After the component mounts, find section headings within the rendered Screen1Profile container using `querySelectorAll` scanning for elements whose `textContent` matches known section heading strings:

| Step | Heading text to match |
|------|----------------------|
| 1 | `"TAKEAWAY"` / `"WHO THEY ARE"` (AI Key Takeaway hero) |
| 2 | `"Demographics & occupation"` |
| 3 | `"Income & affluence"` |
| 4 | `"Top segments by index"` |
| 5 | `"Purchase patterns"` |
| 6 | `"Weekend & lifestyle signals"` |
| 7 | `"Interests & brand affinity"` |

Store each element's `offsetTop` in a `steps` array. Prev/Next buttons set an active step index and call `scrollTo({ top: steps[i] - 80, behavior: 'smooth' })` on the container. An `IntersectionObserver` watches each section sentinel to keep the active index in sync as the user scrolls freely.

### Implementation details
- Import `Screen1Profile` from `@/imports/Screen1Profile`
- Container: `position: fixed; inset: 0; z-index: 50; overflow-y: auto` with a white/light background
- The sticky header sits at `top: 0` with `position: sticky` inside the scroll container, or as a `fixed` overlay
- Keyboard: `Escape` closes the viewer, arrow keys advance/retreat steps
- Entrance animation via `motion/react` `AnimatePresence` / `motion.div` fade-in

### Props
```ts
interface AudienceProfileViewerProps {
  audienceId: string;
  onClose: () => void;
}
```

**Files:** `src/app/components/AudienceProfileViewer.tsx` (new)

---

## Task 3 — Wire Into App.tsx

Add state `showProfileViewer: boolean` (default false). When an audience is selected from AudienceLibrary (`onSelectAudience`), set `selectedAudienceId` AND `showProfileViewer = true`. Render `AudienceProfileViewer` as an overlay (conditionally) with `onClose` resetting `showProfileViewer = false`.

**Files:** `src/app/App.tsx`

---

## Verification

1. Open the app → click Audiences in sidebar → confirm no Banking/Finance or Mastercard-adjacent audiences appear; see Koala Cola-relevant categories
2. Click any audience → confirm full-screen Screen1Profile viewer opens
3. Use Prev/Next buttons → confirm smooth scroll between each of the 7 sections
4. Dots indicator updates to match current section as you scroll freely
5. Press Escape or click × → viewer closes, main app is restored
6. Ensure no console errors from the Screen1Profile import or section detection
