# Product / UX Brief — Inline Ask on Any Module

_LUMOS · cross-module interaction pattern · v1_

---

## 1. Brief

### Problem
Today, refining or questioning part of an output is clunky. To act on a specific
paragraph, chart, map, or audience section, users must describe the module in
words, copy-paste content into the bottom chat (`ChatPanel`), or refer to a
visual indirectly. The system loses the one thing it already knows — _which
module_ and _what state it's in_. The product feels like a static dashboard with
a chat bolted on, not a companion analyst.

### Goal
Let users point at a specific module and ask about **that exact section** —
clarify, refine, drill down, or see reasoning — with the module's identity and
current state inherited automatically. Asking about a module should be **easier
than describing it**.

### Success looks like
- Zero copy-paste to question or change a module.
- The targeted module is never ambiguous.
- The affordance is always visible, always quiet.
- Works identically across text, recommendations, charts, maps, tables, and
  audience cards — including the `AudienceDetailPanel` sections **Who they are /
  Where they are / How to win them**.
- Module-scoped asks and page-level chat coexist without confusion.

### Non-goals (v1)
- A full WYSIWYG edit mode per module.
- Free-form sub-pixel targeting on visuals (deferred — see §9).
- Multi-module batch asks ("change all three charts").

---

## 2. Core model — one thread, two entry points, one scope object

The whole pattern rests on three primitives:

**a. `ModuleContext` — the unit of "what am I asking about".**
Every interactable module exposes a descriptor, captured at ask-time:

```ts
type ModuleContext = {
  id: string;            // stable, e.g. "aud:ev-upgrade-shoppers:where"
  type: 'text' | 'recommendation' | 'chart' | 'map' | 'table' | 'card' | 'comparison';
  label: string;         // human scope label → "Where they are"
  state: Record<string, unknown>; // live controls snapshot, see below
  snapshot?: string;     // optional: text excerpt or chart/map image data URL
};
```

`state` is the live control snapshot — what makes the ask precise without the
user restating anything. For the `Where they are` section that is:
`{ mode: 'Daytime', day: 'Weekend', audienceId: 'ev-upgrade-shoppers', activeRegion: null }`.
For a `Who they are` tab: `{ tab: 'Income', audienceId }`. For a comparison:
`{ audienceA, audienceB, dimension }`.

**b. The "Ask" affordance — always visible, purpose-built.** A quiet, branded
control pinned to each module (not a three-dot menu — see §4).

**c. The chat thread as the single source of truth.** Every inline ask writes
into the existing `ChatPanel` thread, but tagged with a **module reference
chip**. The _primary_ answer surface is next to the module; the thread is the
durable, scrollable record. This is what makes reasoning traceable ("how did you
get this?") — the answer is both inline _and_ in the left thread, visibly linked.

> **The distinction users must feel:** a message with a module chip = scoped to
> that module; a message with no chip = page-level. Same thread, two entry
> points, one unmistakable visual marker.

---

## 3. Recommended interaction model (end to end)

> **Implemented direction (chosen):** rather than spawning a separate mini-chat
> per module, the Ask affordance **pins the module as a quoted reference onto the
> single, page-level composer**. One conversation; the section travels into it as
> context. This keeps the interface lighter and avoids fragmenting the dialogue
> across many little windows. (The earlier anchored-popover variant is kept in §10
> as the considered alternative.)

1. Every module renders a persistent **Ask** pill at a consistent anchor
   (top-right of the module's header row).
2. User clicks it. The pill briefly confirms (**✦ Ask → ✓ Added**) and the module
   gives a short **focus-ring pulse** so it's clear what was captured.
3. A **quoted chip** is added to the main chat composer carrying the module's
   identity + live state: `✦ Where they are · EV Upgrade Shoppers · Daytime ·
   Weekend`. The composer **auto-focuses** and its placeholder retargets:
   _"Ask about 'Where they are'…"_.
4. The user types their follow-up — clarify, refine, drill-down, reasoning — in
   the one composer, with the section(s) attached. Multiple modules can be pinned
   at once (placeholder reads _"Ask about 2 sections…"_); duplicates are ignored.
5. On send, the message goes to the thread with its module chip(s) attached for
   traceability, and the pinned context clears. Each chip has an ✕ to unpin
   before sending.

---

## 4. Recommended menu pattern — a distinct "Ask" pill, not a three-dot

**Recommendation: a purpose-built, always-visible "Ask" affordance** — a small
pill (`✦ Ask` on roomy modules; spark-icon-only on dense ones), brand-tinted,
pinned top-right of each module header, `flex-shrink-0`.

**Why not the three-dot / burger the brief floats as the default:**
1. **Semantic collision.** `AudienceDetailPanel.tsx` _already_ ships a three-dot
   **More** overflow (Save / Download / More) in its top bar. A second three-dot
   meaning "ask AI" would be indistinguishable from "module settings/overflow."
2. **Three-dot reads as "manage," not "converse."** It signals housekeeping
   (rename, delete, export). The mental model we want is "talk to this," which a
   spark/ask glyph + the word "Ask" conveys instantly.
3. **Discoverability.** A labeled affordance teaches the capability on first
   sight; a bare ⋯ is learned only by clicking.

**Behavior on click:** the pill opens the contextual verb menu _inside_ the
anchored composer (so click → menu + input together), rather than a separate
dropdown then a separate composer. One click, one surface.

**Visual spec (quiet by default):**
- Resting: 26px pill, `bg-[#f1e9ff]` tint or transparent with `#6b3c72` icon at
  ~60% opacity, no border. Subordinate to content.
- Hover/focus: full-opacity icon, faint `#6b3c72` ring.
- Active (composer open): solid brand fill, module focus ring on.
- Density rule: modules ≥ ~240px wide show `✦ Ask`; tighter ones (table rows,
  small cards) show the icon only with a tooltip.

This satisfies "always visible, subtle, low-noise, consistent across types,
clearly belongs to one module" while staying out of the existing overflow's lane.

---

## 5. Recommended composer pattern — pin into the one page-level composer

**Recommendation (implemented): the module is quoted into the existing main chat
composer**, rather than each module getting its own mini-composer. The user keeps
typing in one place, with the section(s) attached as removable context chips.

Why this over a per-module popover:
- **One conversation, not many.** A separate composer per module fragments the
  dialogue and competes with the page chat (§4). Pinning keeps a single thread.
- **Lighter interface.** No second input surface, no inline answer cards to
  manage or dismiss. The affordance is just "attach this here."
- **Reuses what exists.** The composer already renders removable chips (the
  `addedAudiences` pattern in `InputBar`); module quotes ride the same rail.

Composer behavior when a module is pinned:
- A **quoted chip** appears above the input: `✦ {label} · {audience} · {state…}`,
  each with an ✕ to unpin. The `state` snapshot makes inherited context visible,
  not magic.
- The input **auto-focuses** and the **placeholder retargets** to the scope
  (_"Ask about 'Where they are'…"_, or _"Ask about N sections…"_ for several).
- The user expresses intent in natural language — explain / rewrite / change /
  expand / how-derived are all just phrasings of the follow-up, so no per-type
  verb menu is needed. (A verb quick-row remains an easy future add per §10.)
- On send, the chips clear; the message carries them as attached context.

---

## 6. Response pattern

**Implemented:** answers come back in the **single chat thread**, where the
sent message carries the module chip(s) it was about — so every response is
traceable to its source module without a separate per-module answer surface.

The richer intent-routing below (update-in-place, revision preview, inline
expansion) is the **forward-looking design** for when responses can act on the
module directly; it's documented as the target, not all wired yet.

**Target: route by intent, but always leave a linked thread record.**

| Intent | Primary surface | Thread record |
|---|---|---|
| Clarify / Explain | Ephemeral **answer card** under the module (dismissible) | message + module chip |
| Reasoning ("how derived?") | Short answer card + "see full reasoning ↓" deep-link into thread | reasoning message + chip |
| Refine / Rewrite | **Module updates in place** + before/after **Revert** control | "Edited _Where they are_" log + chip |
| Change output ("by city") | Module re-renders new state + Revert | log + chip |
| Drill-down / Expand | Inline expansion **or** new **linked** module appended, with a connector chip back to the source | "Expanded from _Income_" + chip |

Unifying rules:
- **Traceability:** every response is reachable from both the module (inline) and
  the thread (chip-linked message). Answers the stakeholder ask — users never
  hunt for "where did the explanation go."
- **Reversibility:** any edit is a revision with one-click **Revert**; surrounding
  modules are untouched unless the change logically requires it (then say so).
- **Re-orientation:** the acted-on module pulses its focus ring on response so
  attention returns to the right place.

---

## 7. Applying it across module types

The pattern is one component (`<Module>`) wrapping each output, providing
`ModuleContext` and rendering the Ask pill. Per-type specialization is only in
(a) which verbs show and (b) what `state` is captured.

- **Text summary / "THE READ" headline & pillars** — verbs: Explain, Rewrite,
  Simplify, Expand. `snapshot` = the text. Edits apply in place with revert.
- **AI recommendations / "How to win them" (Brief, Messaging)** — verbs:
  Rewrite, Make more direct, Expand, How derived? Targets the active tab.
- **Charts (`BarRow` groups, `StrategicInsights` mini-charts, `TimesToReach`)** —
  verbs: Change metric, Break down by…, Compare differently, Explain, How
  derived? `state` = active series/metric/tab.
- **Maps (`MapSVG`, `SydneyHeatmap`)** — verbs: Explain this view, Top
  postcodes/regions, Change layer (Residential/Daytime/Transaction), Compare
  weekday vs weekend, How derived? `state` = `{ mode, day, audienceId }`.
- **Tables (`ui/table`)** — verbs: Explain, Sort/Filter by…, Summarize, Add
  column. `state` = sort/filter.
- **Audience cards (`AudienceListCard`) & sidebar sections (Who/Where/How)** —
  each section is its own module with its own pill and `label`. Verbs: Explain,
  Expand, Compare to another audience, How derived?
- **Comparison modules (A vs B)** — verbs include "Compare differently";
  scope-disambiguation required (see §8).

Implementation sketch (reuses existing stack):

```tsx
// One wrapper provides context + the always-visible affordance.
<Module id="aud:ev:where" type="map" label="Where they are"
        state={{ mode, day, audienceId }} snapshot={mapPng}>
  {/* existing MapSVG + SegControl + TimesToReach unchanged */}
</Module>
// <Module> renders the Ask pill (top-right), the focus ring, and on click
// opens <AskComposer ctx={...}/> (Radix Popover). Submissions call a single
// askModule(ctx, intent, text) that writes to the ChatPanel thread + applies
// inline result. No per-module plumbing beyond passing state.
```

---

## 8. Edge & ambiguity cases to solve

1. **Nested modules.** A chart inside `Who they are` inside the panel — three
   possible owners. **Rule:** the innermost module with a meaningful `label`
   owns the ask; parents don't render a competing pill when a child is focused.
   Avoid stacked affordances.
2. **Comparison scope.** On "Audience A vs B," does "rewrite this" mean the whole
   comparison or one side? **Rule:** default to whole module; if the user
   targeted a sub-element (one bar/side), narrow the chip to it and confirm.
3. **Scope mismatch.** User types "rewrite the entire report" from a single
   module. Detect breadth, surface a chip: _"This affects more than this module —
   ask at page level?"_ with a one-tap switch to page chat.
4. **Stale / loading / empty / error module.** Disable the pill (or show "Ask"
   greyed with tooltip "available once loaded"); never let an ask reference data
   that isn't there.
5. **Edit-then-filter conflict.** User rewrites the geo insight, then flips
   Weekday→Weekend (state changes underneath the edit). **Rule:** edits bind to
   the `state` they were made in; on state change, show "this edit was made for
   _Daytime/Weekend_ — keep, re-run, or revert?"
6. **Concurrent asks.** Two modules with open composers. Allowed; each is
   independent, each pulses its own ring on response. Only one focus ring at a
   time reads as "active."
7. **Drill-down sprawl.** Repeated "expand" creating many linked modules. Cap
   inline expansion; route further depth to the thread or a dedicated view, and
   keep the connector chip so lineage is clear.
8. **Page-level vs module-level collision in the thread.** A scoped answer and a
   global answer sit in the same thread — the **module chip** is the
   disambiguator; global messages never carry one.
9. **Accessibility.** Always-visible (not hover-revealed) is an a11y win — the
   affordance is tabbable and announced. Composer is focus-trapped; `Esc` closes
   and returns focus to the pill; scope is announced ("Ask about Where they are").
10. **Mobile / narrow panels (`AudienceDetailPanel` is 420px).** Icon-only pill;
    composer opens as a `Sheet`/`Drawer` (already in `ui/`) anchored to bottom
    with the scope chip pinned, rather than a floating popover.
11. **Reversibility of destructive edits.** Always offer Revert; for
    multi-module ripple, preview before applying.
12. **Latency / cost.** Module shows an inline pending shimmer scoped to itself
    (not a global spinner); the pill stays put so the user keeps their place.

---

## 9. Visual targeting (charts & maps) — MVP vs later

- **MVP: whole-module targeting only.** The Ask pill targets the entire module +
  its `state`. Simple, universal, ships first. "Ask about this chart / this
  map," inheriting active metric/mode/day.
- **V2: sub-element targeting.** Feasible cheaply because the visuals are already
  discrete DOM/SVG: `MapSVG`/`SydneyHeatmap` regions are individual `<path>`
  elements; bars are individual divs. Clicking a region/bar narrows the scope
  chip — _"Ask about Jurong East"_ / _"Ask about the Morning peak"_ — indicated
  by highlighting that element and updating the chip. The module-level pill
  remains as the always-available fallback.
- **Indication of granularity:** chip text is the contract. Whole-module = label
  ("Where they are"); sub-element = element name. The highlighted element + chip
  together make targeting unmistakable.

> Recommendation: ship MVP whole-module everywhere; add sub-element targeting
> first to maps and bar charts (highest stakeholder value) in V2.

---

## 10. Alternatives considered

**Alt A — Selection-driven floating toolbar (Notion/Medium style).** Select any
text/element → a toolbar floats up. _Pros:_ very granular, no resting chrome.
_Cons:_ **fails the always-visible requirement** (hover/selection-revealed),
and selection is meaningless on an SVG map or a chart. Good as a _complement_ for
text refinement later; wrong as the primary, cross-type pattern.

**Alt B — Persistent right-side "Ask" dock that follows the focused module.**
A docked composer that re-scopes to whichever module has focus. _Pros:_ roomy for
long answers, one consistent place to type. _Cons:_ weakens the spatial link
(the thing you change is across the screen from where you ask), and competes with
the existing `ArtifactPanel`/detail panel for the right rail. Re-creates the
disconnection we're removing.

**Recommendation:** **Persistent "Ask" pill → anchored popover composer →
intent-routed, thread-mirrored response → whole-module targeting (MVP) scaling to
sub-element (V2).** It is the only option that is simultaneously always-visible,
spatially honest, cross-type, low-noise, and reuses the existing Radix + chat
infrastructure. Borrow Alt A's selection toolbar later for power text editing;
skip Alt B.

---

## 11. Build order (suggested)
1. `<Module>` wrapper + `ModuleContext` capture + always-visible Ask pill + focus
   ring. Wrap `AudienceDetailPanel`'s three sections first.
2. `<AskComposer>` popover (verbs + inherited chips + free text) on Radix Popover.
3. `askModule()` → thread message with module chip in `ChatPanel`; inline answer
   card for **read** intents.
4. **edit/drill-down** intents: in-place update + Revert + linked-module
   expansion.
5. Roll the wrapper across charts, `MapSVG`, tables, cards.
6. V2: sub-element targeting on maps + bar charts; mobile `Sheet` composer.
