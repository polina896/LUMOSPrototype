Visual reference: match the attached screenshots. Four images are attached — image 1 (blank state), image 2 (chat in progress), image 3 (picker pattern), image 4 (rendered analysis with right panel populated). The visual system, layout proportions, type treatment, and component shapes should be read off those images directly. Notes below cover flow, scenario, and specifics not visible in the screenshots.

What we're building
A single flow inside Lumos — an AI-first geospatial and media planning tool used by ad-agency planners. The flow demonstrates a picker pattern: the AI proposes 2–3 ways to lay out an answer to the planner's brief, the planner toggles through sketches, picks one, and the right-hand panel renders the chosen layout populated with real data.
The hero moment is the picker — the moment the AI says here are three ways I could present this; you choose.
Who's using it
A media planner at an ad agency, working a new-business pitch for a beverage client (Koala Cola). Sophisticated about audiences and markets, not a data analyst.
The scenario
Koala Cola is a New Zealand beverage company launching in Australia. The planner has opened Lumos to figure out which audiences to target for the Sydney launch.
Layout
Split view, persistent throughout. See image 4 for the full split — chat panel left, artifact panel right, with the sidebar to the far left.

Left sidebar — workspace switcher ("Koala Cola"), nav (Home, Data Explorer, Audiences), Recent Analysis list. See image 1.
Chat panel — conversational stream. User prompts, AI replies, step indicators. Input bar pinned at the bottom (image 2 shows this pattern).
Artifact panel — empty on the blank state, hosts the picker, then renders the final analysis. See image 4 for the populated state.


The flow — five screens
Screen 1 — Blank state
Reference: image 1.
Right panel empty. Chat panel centres the prompt header and input bar. Pre-fill the input with the Koala Cola brief so the demo lands on the right starting point:

We are Koala Cola, a New Zealand beverage company looking to launch in Australia. We want to identify the key audience segments for our Sydney launch and messaging tactics for these audiences.

Keep the three suggestion chips below the input as shown in image 1.
Screen 2 — Planning
Reference: image 2 for the chat stream pattern, with step-indicator dots like the ones shown.
User message appears as a chat bubble (right-aligned, grey fill — see image 2). AI responds:

Got it — a Sydney launch for a beverage brand. Let me break this into pieces. I'll start by figuring out who buys beverages in Sydney, then segment those buyers, then pull messaging angles for each segment.

Three plan steps below — first filled lavender dot (active), the rest grey hollow, matching the dot pattern in image 2:

● Identifying beverage buyers in Sydney
○ Segmenting by demographics and behaviour
○ Pulling messaging angles per segment

Right panel still empty or showing a subtle "Working..." state.
Screen 3 — The picker (hero moment)
Reference: image 3.
Chat stream continues with a progress line:

Completed 2 steps, looked into 6 data sources.
Before I render the full analysis, here are three ways I could present the audience segments. Tab through them and pick one — I'll lock it in and run it properly.

The picker card matches image 3 exactly:

Three tabs across the top:

A · Audience cards → Three persona cards
B · Ranked comparison → Diverging bars
C · Geo map → Sydney shaded


Active tab underlined in lavender (see image 3 tab treatment)
Short description line under the tabs
SKELETON PREVIEW block — grey skeleton rectangles showing the rough shape (three rectangles for cards, horizontal bars for comparison, Sydney outline with shaded patches for the map). Match the sketch-preview pattern in image 3.
"Best when" line below the sketch
Footer: "Option 1 of 3" with prev/next chevrons on the left, Use this option button (solid lavender, check icon) on the right — exactly as in image 3

Per-tab content:
TabDescriptionBest whenA · Audience cardsThree named segments — top demographic, income, behaviour. Each reads as its own story.The segments are genuinely different personas. Reads as a slide.B · Ranked comparisonTop audiences as diverging bars, ranked by reach. Index alongside.You want to argue for prioritisation.C · Geo mapSydney shaded by where each segment over-indexes.You're anchoring audiences to media buys.
Screen 4 — Locked in, rendering
User clicks Use this option on A · Audience cards.
Key transition: the picker card disappears from the right panel, and the right panel begins rendering the chosen layout in the same surface. Do not navigate to a new page. The right panel transitions from picker → rendered analysis without a route change.
In the chat stream, a small confirmation appears:

Going with audience cards. Pulling the data now.

Then a new AI message:

Good — I'll start with who lives in beverage-heavy Sydney postcodes, then drill into the top three segments.
> Completed 4 steps, looked into 8 data sources
Here's what I found. The Sydney beverage audience splits cleanly into three groups. Want me to drill into messaging next?

Screen 5 — The rendered result
Reference: image 4. The right panel structure, header treatment, audience card pattern, and Top Postcodes table should match this image directly.
Right panel header row matches image 4:

Top left: Preview / Data Explorer toggle (Preview active, lavender pill)
Top right: Save Insight button (lavender, dropdown chevron)

Title row: small icon + Top Audiences in display font (Caveat), Save button on the right — see image 4.
TOP 3 AUDIENCES BY REACH block with a soft yellow "3 new audiences" tag (matching the tag treatment in image 4). Three audience cards stacked:

Inner-city young professionals — 28% reach — 25–34 | 90k+ | 55% F / 45% M
Western Sydney families — 22% reach — 30–44 | 80k+ | 50% F / 50% M
Eastern beaches affluent — 18% reach — 35–54 | 150k+ | 52% F / 48% M

Card structure: number on the left, lavender pill with the audience name, percentage on the right, demographic line below — matching the audience card pattern shown in image 4.
TOP POSTCODES table below — six rows matching the table structure in image 4 (rank, area, lavender concentration-index bar with number, households count). Suburbs: Surry Hills, Bondi, Parramatta, Manly, Newtown, Penrith.
Chat input bar stays pinned at the bottom of the chat panel, placeholder Reply to Lumos.

Interaction notes

The picker tabs feel like flipping through sketches — quick, low-stakes.
The skeleton previews are intentionally rough so the planner doesn't mistake them for real output.
Use this option is the only commit moment. Everything before it is exploratory.
The chat stream is append-only — old messages stay visible as the user scrolls.
Screens 4 → 5 happen in the same right panel. No route change. The picker card collapses out and the rendered analysis builds in its place.

What success looks like
A planner watching this should immediately get it: the AI is showing me my options before doing the work, and I get to steer. The picker should feel like the AI is being a good collaborator — laying out the choices and waiting.
Out of scope

Messaging tactics step (AI mentions it, we don't build it)
Data Explorer view (toggle exists, only Preview is functional)
Saving the insight (button exists, no save flow)
Audience drill-down or edit
Sidebar navigation — Home, Audiences, Documents are decorative