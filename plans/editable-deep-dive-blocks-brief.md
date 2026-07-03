# Feature: editable, modular deep-dive blocks across the audience deep-dive tabs

## Goal
Make the analysis content on the audience deep-dive page a grid of **modular,
config-driven, editable blocks**. A user can (a) edit an existing block's chart
type / data / title via the Ask Lumos chat, and (b) add brand-new analysis
blocks via an "Add chart" bento tile that kicks off a chat. This applies to
**three of the four tabs** (see Scope).

## Stack & where things live
- LUMOS prototype: **Vite + React 18 + TypeScript + Tailwind**, in the
  `LUMOSPrototype-23June/` folder. Run with `pnpm dev`.
- Design language to match exactly: **Jua font**, purple accent `#6b3c72`,
  light-purple `#f1e9ff`, rounded `[14px]` cards, index multipliers (`2.1×`),
  up/down delta pills, the `✦ Ask` pill in card headers.
- Key files:
  - `src/app/components/AudienceProfileViewer.tsx` — the tab shell (Audience
    Profile / Mobility & Movement / Temporal & Seasonal / Digital Twin), the
    KPI summary card, and the **docked Ask Lumos panel** (shared across tabs).
  - `src/app/components/AudienceProfileContent.tsx` — the **Audience Profile**
    tab body: filter bar, "Takeaway · who they are" hero, then the analysis
    sections.
  - `src/imports/Screen2Mobility-1/`, `Screen3Temporal/`, `Screen4DigitalTwin/`
    — the other three tabs. These are **monolithic Figma exports** (2,900–3,600
    lines of pixel-positioned SVG, baked-in data, no modular grid).
  - `src/app/components/AskLumosPanel.tsx` — the docked chat panel.
  - `src/app/components/ModuleAsk.tsx` — exports `AskPill` + a `pinned`-scope
    pattern already used to scope the docked chat to a section.

## ✅ Already built — REUSE, do not rebuild
A previous pass built and tested these (they are correct and demoable):
- `src/app/components/deepDiveBlocks.ts` — the `BlockConfig`/`BlockRow` types,
  `compareMode`-aware value/bar formatting, three profile seed blocks
  (`seedBlocks`), themed seed decks (`seedMobilityBlocks`, `seedTemporalBlocks`),
  canned datasets, and **`resolveBlockRequest({ userText, scope, currentConfig? })`**
  — the single intent→config resolver (mock keyword version, with a clear
  `TODO(api)` to swap in a real Anthropic call).
- `src/app/components/DeepDiveBlock.tsx` — the generic `<DeepDiveBlock>` renderer
  (chart types: `bars`, `segmented-bar`, `stat-cards`, `donut`, `line`, `table`),
  the header `✦ Ask` pill, active-ring highlight, and the `<AddChartTile>` bento.
- `src/preview/DeepDivePreview.tsx` — a standalone, working reference of the full
  tabbed interaction (per-tab decks + scoped Ask panel). **Use it as the spec for
  the real wiring.** It is a throwaway harness — you may delete `src/preview/*`
  and `preview.html` once the feature is wired into the real app.

**Your job is the real integration**, not re-authoring the above.

## Scope — which tabs
- **Audience Profile** — ✅ convert to blocks.
- **Mobility & Movement** — ✅ rebuild as blocks.
- **Temporal & Seasonal** — ✅ rebuild as blocks.
- **Digital Twin** — ❌ **excluded.** It's a single synthesised persona view, not
  a deck of comparable metrics. Leave `Screen4DigitalTwin` rendering as-is.

## Decisions already locked (do NOT re-ask)
1. **All three in-scope tabs become one editable block deck each** — this is the
   whole-page treatment, not just a subset of cards. On Profile that means the
   existing analysis sections (Demographics, Income, Lifestage, **and** Top
   segments, Purchase patterns, Weekend & lifestyle signals, Interests & brand
   affinity) all become editable blocks. Do **not** silently drop sections.
2. **Preserve, unchanged, above each deck:** the persistent header, KPI summary
   card, the tab bar, the per-tab filter bar, and the "Takeaway · who they are"
   hero. Only the analysis sections below the hero become the block grid.
3. **Each tab seeds with themed starter blocks** (see `seedBlocks` /
   `seedMobilityBlocks` / `seedTemporalBlocks`) followed by the Add-chart tile.
4. **Each tab owns an independent deck**; the one docked Ask Lumos panel is
   shared and scopes to whichever block's `✦ Ask` was clicked (across tabs).
5. **In-memory React state only** (`useState`/`useReducer`) — no localStorage.

## Block config model (already in `deepDiveBlocks.ts`)
```ts
type ChartType = 'bars' | 'segmented-bar' | 'stat-cards' | 'donut' | 'line' | 'table';
type CompareMode = 'index' | 'percent' | 'count';
interface BlockConfig {
  id: string; title: string; subtitle?: string;
  chartType: ChartType; metric: string; compareMode: CompareMode;
  data: { rows: BlockRow[] };
}
```
The richer existing Profile sections (e.g. the "takeaway panel + bars" split, the
category pill, the Snapshot/Trend toggle) don't map 1:1 to the current model.
**Extend `BlockConfig` minimally** to carry them faithfully — e.g. an optional
`takeaway?: string`, an optional `pill?: {label,color,bg}`, and a `layout?:
'stacked' | 'split'` — rather than dropping that content. Keep the visual result
identical to today for the migrated sections.

## Interaction 1 — edit a block via chat
- A block's `✦ Ask` scopes the docked chat to that block (set the scope chip in
  the composer — reuse the `AskPill` / `pinned` scope mechanism already in
  `ModuleAsk.tsx` + `AskLumosPanel.tsx`; don't add a second competing affordance).
- Scoped messages resolve via `resolveBlockRequest(..., scope:'edit', currentConfig)`
  into a **partial patch** applied to that block's config in state. It re-renders
  live. Support: change chart type ("make this a donut"), change compareMode
  ("show percent instead of index"), swap data ("break it down by age"), rename
  ("rename this to Income tiers").

## Interaction 2 — add a new block
- An "Add chart" bento tile is the last grid item (dashed, `+ Add chart`).
- Clicking it does **not** open a form — it scopes the chat to "new block", seeds
  a "What would you like to add?" prompt, and sets a "New chart" chip.
- The user's description resolves via `resolveBlockRequest(..., scope:'new')`
  into a full `BlockConfig`, appended to the **current tab's** deck. The Add tile
  stays at the end.

## Ask Lumos wiring
- Lift each tab's block deck + the active scope into `AudienceProfileViewer`
  (which owns the shared docked panel), or a small shared store — so a block's
  Ask, the composer chip, and `resolveBlockRequest` all operate on the same state.
- When no block is scoped, the panel behaves as it does today (general Q&A stub).

## Rebuilding Mobility & Temporal — read this
Those tabs are Figma exports being **replaced** by block decks. Before deleting
their content, inventory what they currently show (e.g. Mobility has an
**interactive Singapore district map + an hour×day density heatmap**; Temporal
has peak-time and seasonal visuals). The current block types are chart-only and
**will not reproduce the map/heatmap**. Decide with the user, or if proceeding:
either (a) add a dedicated `map`/`heatmap` block type and keep those as blocks,
or (b) keep the map/heatmap as a fixed anchor above the editable deck. **Do not
silently lose the map.** Flag this early.

## Constraints
- Don't break the KPI summary card, tabs, filter bars, or the docked panel.
- Migrated sections must look **visually identical** to today.
- Prototype quality: prioritise the interaction loops working end-to-end and
  design consistency. Keep `resolveBlockRequest`'s mock resolver; leave the
  `TODO(api)` for the Anthropic call.

## Suggested build order
1. Reuse `deepDiveBlocks.ts` + `DeepDiveBlock.tsx`. Extend `BlockConfig` for the
   richer Profile sections (takeaway/pill/split layout) and migrate ALL Profile
   analysis sections into config blocks — pixel-match the current look.
2. In `AudienceProfileViewer`, hold per-tab decks + scope state; render a
   `<DeepDiveBlock>` grid + `<AddChartTile>` for Profile.
3. Wire the block `✦ Ask` + composer chip + `resolveBlockRequest` edit loop.
4. Add the "Add chart" loop.
5. Rebuild Mobility & Temporal as block decks (resolve the map/heatmap question
   first). Leave Digital Twin untouched.
6. Delete the `src/preview/*` harness + `preview.html`.

## Done when
- Profile, Mobility, and Temporal each render an editable block deck (themed seed
  blocks + Add tile); Digital Twin is unchanged.
- The migrated Profile sections look identical to today.
- Scoped chat edits a block's chart type / data / title live.
- "Add chart" starts a chat and appends a new block to the current tab.
- Header, KPI card, tabs, filter bars, hero, and docked panel all still work.
```
