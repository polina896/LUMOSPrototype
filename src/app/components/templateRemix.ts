import type { EditorTemplate, Section, SectionType } from './TemplateEditorModal';

// ── Canonical per-template content ───────────────────────────────────────────
// Shared by TemplatePreviewModal (preview) and the remix flow so the two stay
// in sync. Keyed by template id. 'End' is a sentinel marker, not an editable
// section — it's stripped when building the editor template.

export const KEY_SECTIONS: Record<string, string[]> = {
  't1': ['AI Summary', 'Top Audiences by Reach', 'Growth Audiences', 'Campaign Recommendations', 'End'],
  't2': ['Messaging Angles', 'Proof Points by Segment', 'Tone of Voice Guide', 'End'],
  't3': ['Segment Profiles Side-by-Side', 'Reach & Index Comparison', 'Behavioural Overlap', 'End'],
  't4': ['Channel Allocation Matrix', 'Budget by Segment', 'Timing Calendar', 'Rationale Notes', 'End'],
  't5': ['Executive Summary', 'Market Opportunity', 'Audience Findings', 'Next Steps', 'End'],
  't6': ['Campaign Objectives', 'Messaging Per Segment', 'Channel Mix', 'Success Metrics', 'End'],
  't7': ['Segment Profile', 'Demographic Deep Dive', 'Spend & Lifestyle Signals', 'Brand Affinity', 'Recommendations', 'End'],
  't8': ['Growth Opportunity Overview', 'Segment Index Scores', 'Activation Priorities', 'End'],
  't9': ['Channel Recommendations', 'Reach Estimates', 'Cost Guidance', 'End'],
  'm1': ['Launch Objectives', 'Singapore Segment Matrix', 'Channel Plan', 'Test-Drive Strategy', 'End'],
  'm2': ['EV Intender Profile', 'Green Plan Messaging', 'Digital Activation', 'End'],
};

export const DESCRIPTIONS: Record<string, string> = {
  't1': 'Use this template to build a full audience strategy with segment profiles, geo concentration, growth signals, and campaign recommendations.',
  't2': 'Use this template to map messaging angles, proof points, and tone of voice across all target audiences and channels.',
  't3': 'Use this template for a side-by-side comparison of 2–4 audience segments across reach, demographics, and behaviours.',
  't4': 'Use this template to plan channel mix, timing, and budget allocation by segment with rationale for each recommendation.',
  't5': 'Use this template for a board-ready summary of market opportunity, audience findings, and strategic next steps.',
  't6': 'Use this template to produce a creative and channel brief per segment, including objectives, messaging, and success metrics.',
  't7': 'Use this template for a single-segment deep dive covering demographics, spend patterns, lifestyle signals, and brand affinity.',
  't8': 'Use this template to identify the highest-growth audience segments with index scores and activation recommendations.',
  't9': 'Use this template to recommend channel allocation per audience with reach estimates and cost guidance.',
  'm1': 'Custom launch brief template for premium automotive audiences in the Singapore market.',
  'm2': 'Activation playbook for EV intender segments with Singapore Green Plan messaging angles.',
};

// Maps each template to the editor's Document Type dropdown options.
const DOC_TYPE_BY_ID: Record<string, string> = {
  't1': 'Audience Strategy',
  't2': 'Messaging Matrix',
  't3': 'Audience Comparison',
  't4': 'Media Plan',
  't5': 'Executive Insight Report',
  't6': 'Campaign Brief',
  't7': 'Segment Deep Dive',
  't8': 'Audience Strategy',
  't9': 'Media Plan',
  'm1': 'Campaign Brief',
  'm2': 'Campaign Brief',
};

// ── Section heuristics ───────────────────────────────────────────────────────
// Infer a sensible section type + starter description from the section title so
// a remixed template lands in the editor pre-populated rather than blank.

function inferTypes(title: string): SectionType[] {
  const t = title.toLowerCase();
  if (t.includes('summary') || t.includes('overview') || t.includes('objectives'))
    return ['AI Summary'];
  if (t.includes('reach') || t.includes('index') || t.includes('ranking') || t.includes('scores') || t.includes('priorities') || t.includes('top audiences'))
    return ['Ranking'];
  if (t.includes('matrix') || t.includes('side-by-side') || t.includes('comparison') || t.includes('allocation') || t.includes('budget') || t.includes('mix') || t.includes('calendar'))
    return ['Table'];
  if (t.includes('growth') || t.includes('trend') || t.includes('estimate') || t.includes('signals') || t.includes('overlap'))
    return ['Line Graph'];
  if (t.includes('recommendation') || t.includes('messaging') || t.includes('strategy') || t.includes('next steps') || t.includes('activation') || t.includes('plan'))
    return ['AI Summary'];
  return ['Text Block'];
}

function describe(title: string): string {
  const types = inferTypes(title);
  if (types.includes('Ranking')) return `Rank the relevant audience segments for "${title}", with the key metric and a one-line reason for each.`;
  if (types.includes('Table')) return `Lay out "${title}" as a table, one row per segment with the supporting figures.`;
  if (types.includes('Line Graph')) return `Show the trend behind "${title}" over time, calling out what's driving the movement.`;
  if (types.includes('AI Summary')) return `Summarise "${title}" in 2–3 sentences, leading with the most important takeaway.`;
  return `Describe what AI should generate for "${title}".`;
}

// ── Public builder ───────────────────────────────────────────────────────────

interface RemixSource {
  id: string;
  title: string;
  description: string;
}

/** Convert a previewed/gallery template into the shape TemplateEditorModal edits. */
export function buildRemixTemplate(template: RemixSource): EditorTemplate {
  const titles = (KEY_SECTIONS[template.id] ?? ['Summary', 'Analysis', 'Recommendations', 'End'])
    .filter((s) => s !== 'End');

  const sections: Section[] = titles.map((title, i) => ({
    id: `s${i + 1}`,
    title,
    types: inferTypes(title),
    description: describe(title),
  }));

  return {
    name: `${template.title} (Remix)`,
    aiPrompt: DESCRIPTIONS[template.id] ?? template.description,
    docType: DOC_TYPE_BY_ID[template.id] ?? 'Audience Strategy',
    sections,
  };
}
