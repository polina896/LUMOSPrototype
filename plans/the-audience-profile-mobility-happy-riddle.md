# Plan: Audience detail side panel within Data Explorer

## Context

Currently clicking an audience in DataExplorer calls `setShowDataExplorer(false)` which closes the explorer. The `AudienceDetailPanel` already exists and matches the wireframe, but it only surfaces via `ArtifactPanel` (right side). The wireframe title — "Data Explorer · Audience side panel" — shows the panel should appear **alongside** the open DataExplorer list, not replace it. The layout should become a three-column split: chat → DataExplorer list → AudienceDetailPanel, keeping full context visible.

---

## Changes

### 1. `src/app/App.tsx`

**a) Change the `onSelectAudience` callback inside the DataExplorer block** — stop closing the explorer on selection:

```tsx
// Before:
onSelectAudience={(id) => {
  setSelectedAudienceId(id);
  setShowDataExplorer(false);
}}

// After:
onSelectAudience={(id) => {
  setSelectedAudienceId(id);
  // keep showDataExplorer=true so the list stays visible
}}
```

**b) Add `AudienceDetailPanel` alongside the DataExplorer** — render it as a second panel when `showDataExplorer && selectedAudienceId`:

```tsx
{!showAudiences && !showDocuments && showDataExplorer ? (
  <>
    {/* DataExplorer list — narrowed slightly when detail is open */}
    <div className={`border-l border-[#d3d3d0] bg-[#f5f5f3] overflow-hidden flex flex-col flex-none ${selectedAudienceId ? 'w-[320px]' : 'w-[400px]'} transition-all`}>
      <DataExplorerPanel ... />
    </div>

    {/* Audience detail side panel — slides in when audience selected */}
    {selectedAudienceId && (
      <div className="w-[420px] flex-none border-l border-[#d3d3d0] overflow-hidden flex flex-col">
        <AudienceDetailPanel
          audienceId={selectedAudienceId}
          screen={screen}
          onClose={() => setSelectedAudienceId(null)}
        />
      </div>
    )}
  </>
) : null}
```

**c) Add `onClose` prop to `AudienceDetailPanel`** — called by the "✕" or close gesture to collapse back to just the list.

---

### 2. `src/app/components/AudienceDetailPanel.tsx`

Add optional `onClose?: () => void` to the props interface. Wire it to a small `✕` button in the top-right of the header bar (next to the existing Save/Download/More buttons).

```tsx
// In the top bar row, rightmost:
{onClose && (
  <button onClick={onClose} className="w-[30px] h-[30px] flex items-center justify-center border border-[#e5e5e2] rounded-lg hover:bg-gray-50">
    <X className="w-3.5 h-3.5 text-[#6b6b6b]" />
  </button>
)}
```

The `X` import already exists in lucide-react.

---

### 3. `src/app/components/DataExplorerPanel.tsx`

The audience list items already highlight the selected audience — no changes needed. Confirm the selected state (`selectedAudienceId`) is passed through correctly and the highlighted state remains visible when the detail panel is open.

---

## Files to modify

1. `src/app/App.tsx` — split DataExplorer block into list + conditional detail panel; change `onSelectAudience` callback
2. `src/app/components/AudienceDetailPanel.tsx` — add `onClose` prop + close button

---

## Verification

1. Open the prototype and click "Data Explorer" in the sidebar
2. Confirm the audience list shows normally (400px wide)
3. Click an audience card — confirm:
   - DataExplorer list narrows to ~320px and stays visible with the selected audience highlighted
   - AudienceDetailPanel slides in to the right (420px)
   - Panel shows "The Read", §1 Who they are, §2 Where they live, §3 How to win them with tabs
4. Click the ✕ button in the AudienceDetailPanel header — confirm the detail panel closes and the DataExplorer list returns to full 400px width
5. Test all three audiences (Premium Sedan Intenders, EV Upgrade Shoppers, Family SUV Upgraders) show distinct content
