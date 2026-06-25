import { useState, useMemo, useRef } from "react";
import { Search, Plus, GripVertical, MapPin, X, Bell, ShoppingCart, Car, Compass, Zap, Heart, PlayCircle, Tag, Activity, Coffee, Truck, Leaf, Music } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type SegmentKey = "high-value" | "frequent" | "new" | "lapsed" | "in-market" | "loyal" | "custom";

interface Audience {
  id: string;
  name: string;
  segment: SegmentKey;
  segmentLabel: string;
  size: number;
  location: string;
  category: string;
}

// ── Segment config ─────────────────────────────────────────────────────────

const SEGMENTS: Record<SegmentKey, { label: string; color: string }> = {
  "high-value":  { label: "High value",       color: "#7C3AED" },
  "frequent":    { label: "Frequent",          color: "#1D9E75" },
  "new":         { label: "New",               color: "#639922" },
  "lapsed":      { label: "Lapsed",            color: "#BA7517" },
  "in-market":   { label: "In-market",         color: "#D85A30" },
  "loyal":       { label: "Loyal / Returning", color: "#378ADD" },
  "custom":      { label: "Win-back VIP",      color: "#993556" },
};

// Gradient circles — one per segment key
const SEGMENT_AVATAR: Record<SegmentKey, string> = {
  "high-value": "linear-gradient(135deg,#A488F1,#5B27B4)",
  "frequent":   "linear-gradient(135deg,#5FD0AB,#0F6E56)",
  "loyal":      "linear-gradient(135deg,#73ACEB,#185FA5)",
  "new":        "linear-gradient(135deg,#A0CB60,#3B6D11)",
  "lapsed":     "linear-gradient(135deg,#E6AE5E,#854F0B)",
  "in-market":  "linear-gradient(135deg,#EE9168,#993C1D)",
  "custom":     "linear-gradient(135deg,#D77FA0,#8E2F4E)",
};

// Filled pill colours — background + text per segment
const PILL_STYLE: Record<SegmentKey, { bg: string; text: string }> = {
  "high-value": { bg: "#EDE6FB", text: "#5B27B4" },
  "frequent":   { bg: "#D7EFE6", text: "#0F6E56" },
  "loyal":      { bg: "#DEEBFA", text: "#185FA5" },
  "new":        { bg: "#E6F1D6", text: "#3B6D11" },
  "lapsed":     { bg: "#FAE8CE", text: "#854F0B" },
  "in-market":  { bg: "#FAE3DA", text: "#993C1D" },
  "custom":     { bg: "#FBE2EC", text: "#993556" },
};

// ── Category icon ──────────────────────────────────────────────────────────

function CategoryIcon({ category }: { category: string }) {
  const lower = category.toLowerCase();
  const cls = "w-[14px] h-[14px]";

  let icon: React.ReactNode;
  if (lower.includes("supermarket") || lower.includes("grocery") || lower.includes("convenience")) {
    icon = <ShoppingCart className={cls} />;
  } else if (lower.includes("health") || lower.includes("fitness") || lower.includes("wellness") || lower.includes("sport") || lower.includes("active")) {
    icon = <Activity className={cls} />;
  } else if (lower.includes("café") || lower.includes("cafe") || lower.includes("restaurant") || lower.includes("dining") || lower.includes("food service")) {
    icon = <Coffee className={cls} />;
  } else if (lower.includes("automotive") || lower.includes("car") || lower.includes("petrol")) {
    icon = <Car className={cls} />;
  } else if (lower.includes("travel") || lower.includes("tourism") || lower.includes("holiday")) {
    icon = <Compass className={cls} />;
  } else if (lower.includes("streaming") || lower.includes("media") || lower.includes("entertainment") || lower.includes("digital")) {
    icon = <PlayCircle className={cls} />;
  } else if (lower.includes("music") || lower.includes("event") || lower.includes("live")) {
    icon = <Music className={cls} />;
  } else if (lower.includes("petcare") || lower.includes("pet")) {
    icon = <Heart className={cls} />;
  } else if (lower.includes("eco") || lower.includes("sustainab") || lower.includes("organic") || lower.includes("natural")) {
    icon = <Leaf className={cls} />;
  } else if (lower.includes("delivery") || lower.includes("logistics") || lower.includes("quick")) {
    icon = <Truck className={cls} />;
  } else if (lower.includes("financial") || lower.includes("fleet") || lower.includes("corporate") || lower.includes("professional")) {
    icon = <Zap className={cls} />;
  } else {
    icon = <Tag className={cls} />;
  }

  return (
    <span className="w-[24px] h-[24px] rounded-[7px] bg-[#F0EDE7] flex-none flex items-center justify-center text-[#6E6A73]">
      {icon}
    </span>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────

const AUDIENCES: Audience[] = [
  // Automotive — Core
  { id: "a1",  name: "Urban Upgrade Drivers — Singapore",     segment: "in-market",  segmentLabel: "In-market",        size: 387000,  location: "Singapore",                  category: "Automotive" },
  { id: "a2",  name: "Premium Sedan Intenders — Singapore",   segment: "in-market",  segmentLabel: "In-market",        size: 284000,  location: "Central Singapore",          category: "Automotive" },
  { id: "a3",  name: "EV Early Adopters — Singapore",         segment: "new",        segmentLabel: "New",              size: 218000,  location: "Singapore",                  category: "Automotive" },
  { id: "a4",  name: "Family SUV Shoppers — Singapore",       segment: "high-value", segmentLabel: "High value",       size: 462000,  location: "Singapore",                  category: "Automotive" },
  { id: "a5",  name: "First-Time Buyers — Singapore",         segment: "new",        segmentLabel: "New",              size: 195000,  location: "Singapore",                  category: "Automotive" },
  { id: "a6",  name: "Upgrade-Ready Owners",                  segment: "loyal",      segmentLabel: "Loyal / Returning",size: 278000,  location: "Singapore",                  category: "Automotive" },
  { id: "a7",  name: "Fleet & Corporate Drivers",             segment: "frequent",   segmentLabel: "Frequent",         size: 312000,  location: "Singapore",                  category: "Fleet / Corporate" },
  // Professional & Lifestyle
  { id: "a8",  name: "High-Income Professionals — CBD",       segment: "high-value", segmentLabel: "High value",       size: 394000,  location: "Central Business District",  category: "Professional" },
  { id: "a9",  name: "Expat High Earners — Singapore",        segment: "high-value", segmentLabel: "High value",       size: 148000,  location: "Central Singapore",          category: "Professional" },
  { id: "a10", name: "Weekend Lifestyle Drivers",             segment: "frequent",   segmentLabel: "Frequent",         size: 520000,  location: "Singapore",                  category: "Lifestyle" },
  { id: "a11", name: "Business Frequent Travellers",          segment: "frequent",   segmentLabel: "Frequent",         size: 267000,  location: "Singapore",                  category: "Travel" },
  { id: "a12", name: "Young Aspirationals — Singapore",       segment: "new",        segmentLabel: "New",              size: 445000,  location: "Singapore",                  category: "Lifestyle" },
  // Sustainability & Family
  { id: "a13", name: "Green Commuters — Singapore",           segment: "in-market",  segmentLabel: "In-market",        size: 338000,  location: "Singapore",                  category: "Sustainability" },
  { id: "a14", name: "Suburban Families — Singapore",         segment: "loyal",      segmentLabel: "Loyal / Returning",size: 612000,  location: "Singapore",                  category: "Family" },
  // Lapsed
  { id: "a15", name: "Lapsed Considerers — Sedan",            segment: "lapsed",     segmentLabel: "Lapsed",           size: 174000,  location: "Singapore",                  category: "Automotive" },
  { id: "a16", name: "Trade-In Prospects",                    segment: "lapsed",     segmentLabel: "Lapsed",           size: 243000,  location: "Singapore",                  category: "Automotive" },
  // Premium Finance
  { id: "a17", name: "Premium Finance Users",                 segment: "high-value", segmentLabel: "High value",       size: 189000,  location: "Singapore",                  category: "Financial" },
  { id: "a18", name: "Car Service Regulars",                  segment: "loyal",      segmentLabel: "Loyal / Returning",size: 421000,  location: "Singapore",                  category: "Automotive" },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function formatSize(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

type SortKey = "largest" | "smallest" | "az" | "za";
type GroupKey = "category" | "segment" | "none";

const SORT_LABELS: Record<SortKey, string> = { largest: "Largest", smallest: "Smallest", az: "A → Z", za: "Z → A" };
const GROUP_LABELS: Record<GroupKey, string> = { category: "Category", segment: "Segment", none: "None" };

function SegmentDot({ seg }: { seg: SegmentKey }) {
  const color = SEGMENTS[seg]?.color ?? "#999";
  return <span className="w-[7px] h-[7px] rounded-full flex-none inline-block" style={{ background: color }} />;
}

// ── Dropdown ──────────────────────────────────────────────────────────────

interface DropdownProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
}

function FilterChip({ label, options, value, onChange, prefix }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  const handleBlur = (e: React.FocusEvent) => {
    if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
  };

  return (
    <div ref={ref} className="relative" onBlur={handleBlur}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 bg-white border border-[#ECEAE6] rounded-[8px] px-[11px] py-[8px] text-[13.5px] text-[#262329] cursor-pointer whitespace-nowrap hover:bg-[#faf9f7] transition-colors"
      >
        {prefix && <span className="text-[#262329]">{prefix} </span>}
        <span className="font-semibold">{label}</span>
        <span className="text-[#A6A2AA] text-[10px]">▾</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-[#ECEAE6] rounded-[11px] shadow-[0_12px_30px_rgba(40,37,45,.13)] py-1.5 min-w-[160px]">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-3 py-[7px] text-[13.5px] rounded-[7px] mx-1 transition-colors ${
                opt.value === value
                  ? "bg-[#F3EEFD] text-[#5B27B4] font-semibold"
                  : "text-[#262329] hover:bg-[#f6f4f1]"
              }`}
              style={{ width: "calc(100% - 8px)" }}
            >
              {opt.label}
              {opt.value === value && <span className="float-right text-[#7C3AED] text-[12px]">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Segment pill dropdown ─────────────────────────────────────────────────

const STANDARD_SEGMENTS: { key: SegmentKey; label: string }[] = [
  { key: "high-value", label: "High value" },
  { key: "frequent",   label: "Frequent" },
  { key: "loyal",      label: "Loyal / Returning" },
  { key: "lapsed",     label: "Lapsed" },
  { key: "in-market",  label: "In-market" },
  { key: "new",        label: "New" },
];

function SegmentPill({
  seg,
  label,
  audienceId,
  onChangeSegment,
}: {
  seg: SegmentKey;
  label: string;
  audienceId: string;
  onChangeSegment: (id: string, seg: SegmentKey, label: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const pillStyle = PILL_STYLE[seg] ?? { bg: "#F0EDE7", text: "#6E6A73" };
  const ref = useRef<HTMLDivElement>(null);

  const handleBlur = (e: React.FocusEvent) => {
    if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-flex" onBlur={handleBlur}>
      <button
        onClick={() => { setOpen((o) => !o); setSearch(""); }}
        className="inline-flex items-center gap-[7px] text-[12.5px] font-semibold rounded-[8px] px-[11px] py-[4px] transition-opacity hover:opacity-80"
        style={{ background: pillStyle.bg, color: pillStyle.text }}
      >
        <span className="w-[6px] h-[6px] rounded-full flex-none inline-block" style={{ background: "currentColor" }} />
        {label}
        <span className="text-[9px] ml-0.5" style={{ opacity: 0.45 }}>▾</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-[#ECEAE6] rounded-[11px] shadow-[0_12px_30px_rgba(40,37,45,.13)] p-2 w-[220px]">
          {/* search field */}
          <div className="flex items-center gap-2 border border-[#E4D9FB] rounded-[8px] px-[10px] py-[8px] mb-1.5 text-[13.5px]">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={label}
              className="flex-1 outline-none bg-transparent text-[#262329] placeholder:text-[#A6A2AA] text-[13.5px]"
            />
            <span className="w-[1px] h-[15px] bg-[#7C3AED]" />
          </div>
          {search.trim() && (
            <button
              onClick={() => { onChangeSegment(audienceId, "custom", search.trim()); setOpen(false); }}
              className="w-full text-left flex items-center gap-2 px-2 py-[7px] rounded-[7px] text-[#5B27B4] font-semibold text-[13.5px] hover:bg-[#F3EEFD] transition-colors"
            >
              <span className="w-[18px] h-[18px] rounded-[5px] bg-[#F3EEFD] flex items-center justify-center text-[13px]">+</span>
              Create "{search.trim()}"
            </button>
          )}
          <p className="text-[11px] text-[#A6A2AA] uppercase tracking-[.05em] px-2 pt-1.5 pb-1">Or pick a standard segment</p>
          {STANDARD_SEGMENTS.map((s) => (
            <button
              key={s.key}
              onClick={() => { onChangeSegment(audienceId, s.key, s.label); setOpen(false); }}
              className={`w-full text-left flex items-center gap-2 px-2 py-[7px] rounded-[7px] text-[13.5px] transition-colors ${
                s.key === seg ? "bg-[#F3EEFD] text-[#5B27B4] font-semibold" : "text-[#262329] hover:bg-[#f6f4f1]"
              }`}
            >
              <span className="w-[8px] h-[8px] rounded-full flex-none" style={{ background: SEGMENTS[s.key].color }} />
              {s.label}
              {s.key === seg && <span className="ml-auto text-[#7C3AED] text-[12px]">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────

interface AudienceLibraryProps {
  onSelectAudience?: (id: string, name: string) => void;
}

export default function AudienceLibrary({ onSelectAudience }: AudienceLibraryProps) {
  const [audiences, setAudiences] = useState<Audience[]>(AUDIENCES);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("largest");
  const [groupKey, setGroupKey] = useState<GroupKey>("category");
  const [segmentFilter, setSegmentFilter] = useState<string>("all");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverGroup, setDragOverGroup] = useState<string | null>(null);

  // ── Filter + sort + group ─────────────────────────────────────────────

  const filtered = useMemo(() => {
    let list = audiences.filter((a) => {
      const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.location.toLowerCase().includes(search.toLowerCase());
      const matchSeg = segmentFilter === "all" || a.segment === segmentFilter;
      return matchSearch && matchSeg;
    });

    list = [...list].sort((a, b) => {
      if (sortKey === "largest") return b.size - a.size;
      if (sortKey === "smallest") return a.size - b.size;
      if (sortKey === "az") return a.name.localeCompare(b.name);
      if (sortKey === "za") return b.name.localeCompare(a.name);
      return 0;
    });

    return list;
  }, [audiences, search, sortKey, segmentFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, Audience[]>();
    for (const a of filtered) {
      const key = groupKey === "category" ? a.category : groupKey === "segment" ? a.segmentLabel : "All Audiences";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(a);
    }
    return Array.from(map.entries());
  }, [filtered, groupKey]);

  const totalCount = audiences.length;
  const categoryCount = new Set(audiences.map((a) => a.category)).size;

  // ── Drag ──────────────────────────────────────────────────────────────

  const handleDragStart = (id: string) => setDragId(id);
  const handleDragEnd = () => { setDragId(null); setDragOverGroup(null); };

  const handleDrop = (targetGroup: string) => {
    if (!dragId) return;
    setAudiences((prev) =>
      prev.map((a) => {
        if (a.id !== dragId) return a;
        if (groupKey === "category") return { ...a, category: targetGroup };
        return a;
      })
    );
    setDragId(null);
    setDragOverGroup(null);
  };

  // ── Segment change ────────────────────────────────────────────────────

  const handleChangeSegment = (id: string, seg: SegmentKey, label: string) => {
    setAudiences((prev) => prev.map((a) => a.id === id ? { ...a, segment: seg, segmentLabel: label } : a));
  };

  const toggleCollapse = (group: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 overflow-y-auto bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="bg-white overflow-hidden">

          {/* Slim app bar */}
          <div className="flex items-center justify-between px-[18px] py-[11px] border-b border-[#F2F0EC]">
            <div className="flex items-center gap-2 text-[13.5px] font-medium text-[#262329]">
              <span className="w-[22px] h-[22px] rounded-[6px] bg-[#1D9E75] text-white text-[10px] font-bold flex items-center justify-center flex-none">MM</span>
              Meridian Motors
              <span className="text-[#A6A2AA] text-[10px]">▾</span>
            </div>
            <div className="flex items-center gap-[14px]">
              <Bell className="w-[17px] h-[17px] text-[#A6A2AA]" />
              <div className="flex items-center gap-2">
                <span className="w-[27px] h-[27px] rounded-[8px] bg-[#7C3AED] text-white flex items-center justify-center flex-none">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M12 2C12.5 7 17 11.5 22 12C17 12.5 12.5 17 12 22C11.5 17 7 12.5 2 12C7 11.5 11.5 7 12 2Z" />
                  </svg>
                </span>
                <span className="font-['Jua',sans-serif] text-[17px] text-[#262329]">Lumos</span>
              </div>
            </div>
          </div>

          {/* Top bar */}
          <div className="flex items-start justify-between px-[30px] pt-[22px] pb-0">
            <div>
              <h1 className="text-[27px] leading-[1.1] m-0 font-['Jua',sans-serif] font-normal text-[#262329]">
                Audiences
              </h1>
              <p className="text-[#6E6A73] text-[13.5px] mt-[7px]">
                {totalCount} audiences · {categoryCount} categories
              </p>
            </div>
            <button className="inline-flex items-center gap-[7px] bg-[#7C3AED] text-white border-none font-semibold text-[14px] px-[15px] py-[10px] rounded-[10px] cursor-pointer hover:bg-[#6d33d4] transition-colors">
              <Plus className="w-4 h-4" />
              Create audience
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-[9px] px-[30px] py-[20px] flex-wrap">
            {/* Search */}
            <div className="flex-1 min-w-[240px] flex items-center gap-[9px] bg-[#FAF9F7] border border-[#ECEAE6] rounded-[9px] px-[12px] py-[9px] text-[13.5px] text-[#A6A2AA]">
              <Search className="w-[14px] h-[14px] text-[#A6A2AA] flex-none" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search audiences…"
                className="flex-1 bg-transparent outline-none text-[#262329] placeholder:text-[#A6A2AA] text-[13.5px]"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-[#A6A2AA] hover:text-[#6E6A73]">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Group by */}
            <FilterChip
              prefix="Group by:"
              label={GROUP_LABELS[groupKey]}
              value={groupKey}
              onChange={(v) => setGroupKey(v as GroupKey)}
              options={Object.entries(GROUP_LABELS).map(([value, label]) => ({ value, label }))}
            />

            {/* Segment filter */}
            <FilterChip
              label={segmentFilter === "all" ? "Segment" : SEGMENTS[segmentFilter as SegmentKey]?.label ?? "Segment"}
              value={segmentFilter}
              onChange={setSegmentFilter}
              options={[
                { value: "all", label: "All segments" },
                ...Object.entries(SEGMENTS).map(([value, { label }]) => ({ value, label })),
              ]}
            />

            {/* Sort */}
            <FilterChip
              prefix="Sort:"
              label={SORT_LABELS[sortKey]}
              value={sortKey}
              onChange={(v) => setSortKey(v as SortKey)}
              options={Object.entries(SORT_LABELS).map(([value, label]) => ({ value, label }))}
            />
          </div>

          {/* Column headers */}
          <div className="flex items-center gap-3 px-[30px] py-[8px] text-[#A6A2AA] text-[11px] font-semibold tracking-[.05em] uppercase">
            <span className="w-[14px] flex-none" />
            <span className="flex-1">Name</span>
            <span className="w-[168px] flex-none">Segment</span>
            <span className="w-[96px] flex-none text-right">Size</span>
            <span className="w-[158px] flex-none text-right">Location</span>
            <span className="w-[18px] flex-none" />
          </div>

          {/* Groups + rows */}
          {grouped.length === 0 ? (
            <div className="px-[30px] py-10 text-center text-[#A6A2AA] text-[14px]">
              No audiences match your filters.
            </div>
          ) : (
            grouped.map(([group, rows]) => {
              const isCollapsed = collapsed.has(group);
              const isDragOver = dragOverGroup === group;

              return (
                <div
                  key={group}
                  onDragOver={(e) => { e.preventDefault(); setDragOverGroup(group); }}
                  onDrop={() => handleDrop(group)}
                  onDragLeave={() => setDragOverGroup(null)}
                >
                  {/* Group header */}
                  <div
                    className={`flex items-center gap-[9px] px-[30px] py-[12px] border-t border-b border-[#F2F0EC] cursor-pointer select-none transition-colors ${
                      isDragOver ? "bg-[#F8F5FE]" : "bg-[#FBFAF8] hover:bg-[#f5f4f1]"
                    }`}
                    style={{ borderColor: isDragOver ? "#E4D9FB" : undefined }}
                    onClick={() => toggleCollapse(group)}
                  >
                    <span className="text-[#A6A2AA] text-[11px] w-3 transition-transform" style={{ transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)" }}>
                      ▾
                    </span>
                    <CategoryIcon category={group} />
                    <span className="text-[13.5px] font-semibold text-[#262329]">{group}</span>
                    <span className="text-[13px] text-[#A6A2AA]">{rows.length}</span>
                    <button
                      className="ml-auto text-[#C5C1C9] text-[16px] hover:text-[#7C3AED] transition-colors leading-none"
                      onClick={(e) => { e.stopPropagation(); }}
                      title={`Add to ${group}`}
                    >
                      +
                    </button>
                  </div>

                  {/* Rows */}
                  {!isCollapsed && rows.map((audience) => {
                    const isDragging = dragId === audience.id;
                    const color = SEGMENTS[audience.segment]?.color ?? "#999";

                    return (
                      <div
                        key={audience.id}
                        draggable
                        onDragStart={() => handleDragStart(audience.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => onSelectAudience?.(audience.id, audience.name)}
                        className={`flex items-center gap-3 px-[30px] h-[48px] cursor-pointer relative group transition-colors ${
                          isDragging
                            ? "bg-white border border-[#E4D9FB] rounded-[10px] shadow-[0_14px_30px_rgba(40,37,45,.16)] mx-[22px] z-10"
                            : "hover:bg-[#FBFAF8]"
                        }`}
                      >
                        {/* Grip */}
                        <span className="w-[14px] flex-none text-[#C5C1C9] opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity">
                          <GripVertical className="w-3.5 h-3.5" />
                        </span>

                        {/* Name */}
                        <span className="flex-1 flex items-center gap-[11px] min-w-0">
                          <span className="w-[20px] h-[20px] rounded-full flex-none" style={{ background: SEGMENT_AVATAR[audience.segment] ?? color }} />
                          <span className="text-[14px] text-[#262329] font-medium truncate">{audience.name}</span>
                        </span>

                        {/* Segment */}
                        <span className="w-[168px] flex-none">
                          <SegmentPill
                            seg={audience.segment}
                            label={audience.segmentLabel}
                            audienceId={audience.id}
                            onChangeSegment={handleChangeSegment}
                          />
                        </span>

                        {/* Size */}
                        <span className="w-[96px] flex-none text-right text-[14px] font-semibold text-[#262329]">
                          {formatSize(audience.size)}
                          <span className="text-[11.5px] font-normal text-[#A6A2AA] ml-1">ppl</span>
                        </span>

                        {/* Location */}
                        <span className="w-[158px] flex-none text-[13px] text-[#6E6A73] flex items-center gap-1.5 justify-end">
                          <MapPin className="w-3 h-3 text-[#C5C1C9] flex-none" />
                          {audience.location}
                        </span>

                        {/* Chevron */}
                        <span className="w-[18px] flex-none text-right text-[#C5C1C9] group-hover:text-[#7C3AED] transition-colors text-[18px] leading-none">
                          ›
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}

          <div className="h-[14px]" />
        </div>
    </div>
  );
}
