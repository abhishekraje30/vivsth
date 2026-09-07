# Spine Pair Review — vivahspot · Pass 2

Re-walked from scratch on the current files (`DESIGN.md` 642 lines, `EXPERIENCE.md` 1124 lines).
Every reference re-extracted and re-resolved, every contrast ratio recomputed, every source citation
re-opened, the guest-page measurement reproduced in headless Chrome. Nothing was carried forward
from pass 1 on trust; the reconciliation at the end is written after the walk, not before it.

## Overall verdict

**Three of the four criticals are genuinely closed, one is not, and the revision introduced a new
one of a kind pass 1 could not have seen.**

Closed: FR-71 is reconciled and what was written matches what `prd.md:704–714` actually says, clause
by clause. The Span rail is gone — replaced by an *Across the wedding* section and a `span-card`
component, with no stale rail language surviving anywhere in either spine. Cold load exists, with a
`skeleton` component, a no-layout-shift rule and a reduced-motion path.

Not closed: the **availability signal** was given a visual spec that the two spines disagree about.
`EXPERIENCE.md:407` says the three rings are *solid / thin / dashed*;
`DESIGN.md:255–257` makes free and taken **both `2px solid`**, separating them by colour only —
which is the one thing NFR 5.8 forbids and the exact defect the component was added to fix. Worse,
the free ring is `2px solid {colors.turmeric}` over a `{colors.gold-tint}` fill: recomputed, that is
**1.57:1 against the ground and 1.15:1 for the fill**, so the ring the document says "carries the
state on its own" is below the 3:1 non-text floor `DESIGN.md:376` sets for itself.

New: the PRD and the architecture spine **were amended and committed** during this run
(`.memlog.md:82`), and neither spine was re-read against them. Five statements about the sources are
now false — including the top-matter claim at `EXPERIENCE.md:20` that the overrides "need a PRD edit
that **has not been made**", when `prd.md:405` and `prd.md:396` both carry dated amendment notes.
Pass 1's headline was that the reference layer was the strongest thing in the pair. It is now the
category that moved backwards.

The build contract is materially further along than it was: eight components carry both a visual and
a behavioural spec where three did. What has not moved at all is the ordinary-states hole, the
search surface, the guest pages' failure vocabulary, and the working-artifact map — which got
**worse**, because six new prototypes landed and only one of them is referenced.

---

## 1. Flow coverage — adequate *(pass 1: adequate)*

Re-extracted the five UJ names from `prd.md:70–186`, matched them against the five Key Flows,
re-walked each UJ's `Path` steps against the matching flow's steps, and re-ran the FR coverage sweep:
41 of the 72 FRs are cited across the pair, 31 are not.

FR-71 verified line by line against `prd.md:708–714`. All five capabilities in
`EXPERIENCE.md:180–186` reproduce the source correctly — catering's headcount and its basis,
photography's named person and the before-not-after rule, décor's Stated Size, BBB's no-additional-
payment declaration, the venue's site visit or virtual tour from the Listing itself. The publish
gate at `EXPERIENCE.md:167` now reads "four general items plus whatever this Service requires",
matching `prd.md:706`'s "**additional conditions of listing, on top of the general ones in FR-59**".
This is a clean close.

### Findings

- **high** UJ-5's resolution beat still has no step. `prd.md:183` is explicit — "He taps the quiet
  line, and starts a Wedding of his own… **This is the only growth channel designed into the
  product**" — and Flow 4 (`EXPERIENCE.md:1021–1042`) still ends at Rutuja's count moving. The
  growth line is still specified only as "one quiet line" with its wording open (Open Question 2).
  Unchanged from pass 1. *Fix:* add step 7 covering where the tap lands and what it carries.

- **high** FR-31 ("Seeing where the year is empty", `prd.md:778`) is still uncovered. Grep for
  *drawing no interest*, *calendar's health*, *where the year is empty*, *empty Slot* across both
  spines returns zero. The capability — which Slots are empty, which are drawing no interest,
  feeding FR-30 seasonal pricing — was never re-homed after Calendar was demoted from a destination
  to a lens. *Fix:* place it in Performance or in the Calendar lens, and say which.

- **high** The **Function detail** IA row now contradicts the new Span rule. `EXPERIENCE.md:83`
  reads "One ceremony: its day, Slot, stated guest count, and **every Service serving it** with its
  state." A Span Service serves that Function — and `EXPERIENCE.md:379` says "**A Span never appears
  under a Function**", `:400` says "Do not 'helpfully' echo a Span into its Functions." A builder
  reading the IA table, which is where they will start, ships the echo the pattern exists to remove.
  *Fix:* qualify the row — "every Service serving it alone; Spans appear once, above."

- **medium** The **Workspace** IA row was not updated for the new shape. `EXPERIENCE.md:82` still
  describes the Workspace as "the wedding organised by **Haldi / Wedding / Reception**: each Function
  opens to show which Services serve it" — no *Across the wedding* section, no Spans. The structural
  description of the surface the pattern lives on does not mention the pattern. *Fix:* add it; it is
  one clause.

- **medium** Flow 1 step 9 carries a **half-completed edit**. `EXPERIENCE.md:940–943` reads
  "…five Shortlists, the budget tracked against ₹8L. **Shubhmangal Lawns appears under /
  Shubhmangal Lawns sits in Across the wedding**, above the Functions…" — the old rail sentence was
  cut mid-clause and the replacement appended after it. This is the resolution beat of the flagship
  flow. *Fix:* delete "Shubhmangal Lawns appears under".

- **medium** UJ-4's path step 5 — Kiran configuring a new Service (`prd.md:157`) — still has no step
  in Flow 5 and the flow title still drops "opens a Service". The omission is probably right (Admin
  is Frappe Desk, AD-2) but it is still silent rather than stated. *Fix:* one line saying the act
  happens in Desk and lands on no designed surface.

- **medium** Flow 4 was not updated for the **guest count control**. The control is now decided
  (`EXPERIENCE.md:218` — revealed after *Yes*, pre-filled with the Creator's household figure) but
  Flow 4 step 4 still reads only "He says yes — four of them travelling"
  (`EXPERIENCE.md:1035`), which is the sentence that motivated the control. The flow does not show
  the interaction the flow's own gap produced. *Fix:* one clause in step 4.

- **low** Flows are still not in UJ order — Flow 4 is UJ-5, Flow 5 is UJ-4
  (`EXPERIENCE.md:1021`, `:1049`). Unchanged. *Fix:* reorder or renumber.

---

## 2. Token completeness — adequate *(pass 1: adequate)*

Re-parsed the frontmatter into a 293-path set and re-resolved every `{…}` reference programmatically:
**197 references in `DESIGN.md` (45 unique), 18 in `EXPERIENCE.md` (12 unique), zero unresolved** —
including every reference inside the five new components, and `{components.chip}` nested inside
`span-card.days`. All 18 colour tokens carry a hex. Recomputed all sixteen stated contrast ratios;
every one reproduces to within rounding, exactly as in pass 1.

Then computed the ratios the **new** components imply but do not state:

| New component value | Against | Computed |
|---|---|---|
| `availability-ring.free` — 2px turmeric ring | `{colors.ground}` | **1.57:1** |
| `availability-ring.free` — 2px turmeric ring | `{colors.surface}` | **1.61:1** |
| `availability-ring.free` — gold-tint fill | `{colors.ground}` | **1.15:1** |
| `availability-ring.taken` / `.unstated` — muted ring | `{colors.surface}` | 4.89:1 ✓ |
| `calendar-day-bar.enquiries-pending` — turmeric bar | `{colors.surface}` | **1.61:1** |
| `calendar-day-bar.engaged` — vermillion bar | `{colors.surface}` | 4.80:1 ✓ |

### Findings

- **high** **The two new state-carrying components put their most important state below the
  document's own non-text floor.** `DESIGN.md:376` states the rule — "anything a person must
  perceive needs 3:1" — and `DESIGN.md:591` already bans the turmeric-on-gold-tint progress fill at
  1.36:1 for exactly this. The *shows free* ring computes 1.57:1 and its fill 1.15:1; the
  enquiries-pending bar computes 1.61:1. Both figures are unstated anywhere in the document, unlike
  the sixteen that are. *Fix:* re-colour the free ring and the pending bar to clear 3:1, and add
  these ratios to the stated set so the next reviewer does not have to compute them.

- **high** `elevation-1`, `elevation-2` and `elevation-3` are **still** used as component values —
  `invitation-card.shadow: elevation-2` (`DESIGN.md:161`), `vendor-card.shadow: elevation-1`
  (`:193`), `category-medallion.shadow: elevation-1` (`:225`) — with no `elevation` or `shadows`
  group in the frontmatter. Confirmed: top-level keys are `colors`, `components`, `description`,
  `name`, `rounded`, `spacing`, `status`, `typography`, `updated`. A machine extractor still gets
  the literal string. Unchanged from pass 1. *Fix:* add the group; reference it as `{elevation.2}`.

- **high** `fontFamily: system-sans` is **still** unresolvable, on nine typography roles
  (`DESIGN.md:65, :70, :86, :96, :101, :106, :117, :127, :133`) — body, body-long, review, price,
  meta, button, chip, progress-label, tab. The actual stack lives only in prose at `DESIGN.md:431`.
  Unchanged. *Fix:* put the stack in the frontmatter, or use the spec's `note:` convention.

- **medium** The vendor card's rating chip still sits "on a `rgba(0,0,0,0.6)` scrim"
  (`DESIGN.md:550`) over an arbitrary photograph with no label colour and no contrast target.
  Unchanged. *Fix:* name the colour and the floor the scrim is sized to hold.

- **medium** The focus ring still has no non-text contrast target against anything but white
  (`DESIGN.md:219`, `:562`; `EXPERIENCE.md:806`). Unchanged, and now more exposed: the guest RSVP
  page's three `button-choice` peers are the surface where focus does the most work, and
  `button-choice` carries no focus value at all (`DESIGN.md:279–290`). *Fix:* state the floor and
  the one fill the ring may not sit on.

- **medium** The new components extend the **off-scale literal** habit rather than closing it:
  `availability-ring.size-large: 40px` (the scale has 32 and 48, not 40),
  `calendar-day-bar.offset: 3px`, `calendar-day-bar.width: '70% of cell'` (a prose value in a token
  slot), `span-card.padding: '{spacing.3} 11px'`. See §6. *Fix:* round onto the scale or state once
  that component dimensions are deliberately hand-tuned.

- **low** `on-turmeric` remains the only colour token no component entry reaches; `foil`,
  `shadow-tint`, `medallion-*` and `placeholder-*` still reach components through literal gradient
  and shadow strings. The new components did close part of this — `availability-ring` and
  `calendar-day-bar` reference turmeric, gold-tint, muted, surface, ink and vermillion by name.
  *Fix:* none required.

---

## 3. Component coverage — thin *(pass 1: thin)*

Re-extracted every component name from the `DESIGN.md` frontmatter (**15**, up from 10), the
`DESIGN.md` `## Components` prose (**10**), and the `EXPERIENCE.md` Component Patterns table
(**22 rows**, plus the Spans subsection), then intersected them.

**Components with both a visual and a behavioural spec: eight** — invitation-card, vendor-card,
price-unestimated, banner-failure, and the four new ones that carry an `{components.…}` reference
from `EXPERIENCE.md`: availability-ring, skeleton, calendar-day-bar, span-card. Pass 1 counted three.
That is real movement.

Of the five new components, four have a behavioural counterpart that names them by token:
`{components.availability-ring}` at `EXPERIENCE.md:407`, `{components.skeleton}` at `:450`,
`{components.calendar-day-bar}` at `:424`, `{components.span-card}` at `:388`. The fifth,
**`button-choice`, is named nowhere in `EXPERIENCE.md`** — grep returns one hit total, the
frontmatter definition itself.

### Findings

- **critical** **The two spines specify the availability ring differently, and `DESIGN.md`'s version
  separates two states by colour alone.** `EXPERIENCE.md:407` — "**The ring treatment carries the
  state on its own** — solid for *shows free*, thin for *shows taken*, dashed for *not stated*".
  `DESIGN.md:255–257` — `free: 'fill {colors.gold-tint}, 2px solid {colors.turmeric}'`,
  `taken: 'fill {colors.surface}, 2px solid {colors.muted}'`. **Both 2px, both solid.** Nothing is
  "thin". Free and taken differ only in fill colour and border colour, which is precisely what
  NFR 5.8 and `DESIGN.md:590` forbid. `.memlog.md:101` records the decision as "solid / thin /
  dashed", so `DESIGN.md` diverges from the decision as well as from its sibling; and
  `.working/availability-signal.html:60–62` renders `2px solid` / `2px solid` / `2px dashed`,
  matching `DESIGN.md` while its own caption at line 155 asserts "In grey the three rings are still
  solid, thin and dashed" — an assertion its own CSS contradicts. Three artifacts, two answers, and
  the wrong one is the one a builder reads. Compounded by §2: the free ring is 1.57:1, so it cannot
  carry the state on its own under any treatment. *Fix:* give *taken* a genuinely thinner stroke,
  re-colour *free* to clear 3:1, and make `DESIGN.md` the single statement with `EXPERIENCE.md`
  inheriting.

- **high** The ring separates *taken* from *not stated* by **`2px solid` against `2px DASHED` at a
  16px diameter** (`DESIGN.md:252`, `:256–257`) — the device `DESIGN.md:601`'s own new Don't bans:
  "Separate them by a texture — solid against dashed — anywhere below about 6px. A dash pattern
  averages into a solid line and the distinction disappears in greyscale." The rule was written for
  the calendar bar and then not applied to the ring drawn in the same batch. Both are muted, so
  colour cannot rescue it either. *Fix:* apply the count-not-texture rule to the ring, or state why
  a 2px dash on a circumference is a different case and prove it at 16px.

- **high** The **Function card** still has no visual spec. Nothing in `DESIGN.md` describes it. It
  is the Workspace's primary object, carries three row states each requiring "a glyph **and** a
  word" (`EXPERIENCE.md:408`), and the Span rewrite made it *more* load-bearing, not less — it is
  now the object that must **not** show the Span. *Fix:* add it to `## Components` with its row
  states and its relationship to the *Across the wedding* section above it.

- **high** The **Featured band** still has no visual spec, and its per-card `Featured` chip still
  collides with the `chip` component. `DESIGN.md:201–210` defines `chip` as the *filter* chip —
  gold-tint fill, turmeric border, vermillion when selected. A `Featured` chip built from it reads
  as a selected filter. `EXPERIENCE.md:712` still records this band as live CCPA exposure and
  `:701` still makes the chip one of the three non-colour signals carrying FR-20. Unchanged.
  *Fix:* add a distinct `chip-featured` (or `badge-paid`) and a `featured-band` container.

- **medium** **Six of the fifteen frontmatter components have no `## Components` prose entry** —
  `availability-ring`, `skeleton`, `calendar-day-bar`, `button-choice`, `span-card`,
  `banner-failure`. The prose section is the human-readable inventory the spec reserves for
  per-component anatomy and state appearance; it now describes 10 of 15 objects, and four of the
  five newest are absent. `Calendar day cell` (`DESIGN.md:567`) is not a substitute — it specifies
  the hit area, not the bar. *Fix:* add the six.

- **medium** **`button-choice` has no behavioural counterpart that names it.** The behaviour exists
  at `EXPERIENCE.md:219` — "Three answers, each a full-width target, each labelled in words… Nothing
  is preselected" — but never references `{components.button-choice}`, never states the 48px floor
  the component sets, and never says where else in the product a set of equal peers may occur.
  *Fix:* reference the component from the rule, as the other four new components do.

- **medium** The **guest count control has no visual spec at all.** It is a decided, novel control
  (`EXPERIENCE.md:218`, `.memlog.md:107`) — revealed after *Yes*, pre-filled, adjustable — on the
  one surface strangers ever see, and `DESIGN.md` has no stepper, no number input, no numeric
  control of any kind. It is also absent from `.working/guest-rsvp.html`, which explicitly records
  the gap at line 150–154 rather than filling it. *Fix:* specify it, or say it inherits the platform
  control and name which.

- **medium** **The Availability signal has two rows in Component Patterns.**
  `EXPERIENCE.md:407` is the full specification; `EXPERIENCE.md:410` is a stub —
  "Three states, never two. See *Availability, Blocks and the Three States*" — three lines below it,
  with a different `Use` column. The old row survived the insertion of the new one. Two places to
  edit one fact. *Fix:* delete `:410`.

- **medium** `button-primary`, `button-celebration`, `chip` and `search-field` still have no
  Component Patterns row. **Search is still the consequential one:** it is a top-level element of
  Home (`EXPERIENCE.md:81`) and Service results (`:84`) and realises FR-18, and no spine says what
  it searches over, whether it is scoped to a Service, what happens on submit, or what it does with
  no matches. FR-18 is uncited in either spine. Unchanged. *Fix:* add the four rows; search is not
  optional.

- **medium** The **empty-state anatomy** is still explicitly salvaged — "Circular icon → heading →
  one sentence → one button, capped and centred… Keep it; rewrite every string"
  (`EXPERIENCE.md:851`) — and still has no component in either spine, with Open Question 3 still
  leaving empty states open. Unchanged. *Fix:* promote the anatomy to a component even while the
  strings stay open.

- **medium** The vendor portal's **lens switch** and **left rail** are still load-bearing structural
  components with no entry in Component Patterns or `DESIGN.md`. The lens switch is what makes
  Enquiries "one surface rather than two" (`EXPERIENCE.md:150`) and it now carries a count
  (`Inbox · 3`, `:156`) with no specification of how the count renders. Unchanged. *Fix:* add both.

- **low** The **"Across the wedding" section header** has no type role. It is a new, named
  structural element of the Workspace with no `{typography.…}` assignment — `heading-section` is the
  obvious candidate but is not stated. *Fix:* one line in the `span-card` note or in Layout.

- **low** `EXPERIENCE.md:424` requires "The legend states all three in words" for the vendor
  calendar. No legend component exists in either spine. *Fix:* fold it into the calendar spec.

---

## 4. State coverage — thin *(pass 1: thin)*

Re-walked the 14 Family app IA surfaces, the 4 Vendor destinations and the 4 Guest pages against the
six state classes. State Patterns is now **23 rows**, up from 21.

The cold-load critical is closed. `EXPERIENCE.md:450` adds a **Cold load** row: skeletons never
spinners, `{components.skeleton}` occupying the exact footprint so nothing moves on arrival,
hairline blocks, transform-only sheen, sheen removed under `prefers-reduced-motion`, and a tagged
assumption that an unresolved skeleton gains one line after ~5s. `DESIGN.md:262–267` backs it. This
is a good row.

What is covered is still covered unusually well, and the gaps are still in the ordinary states.

### Findings

- **high** **Still no search-empty / no-results state.** Grep for *no results*, *no matches*,
  *nothing matched*: zero hits across 1124 lines. Home carries a search field and Service results
  carry per-Service filters; the combination that returns nothing is unspecified. Distinct from
  "Empty Shortlist", which is covered. Unchanged. *Fix:* add a row for Service results with zero
  matches and one for search with zero matches, and say whether filters are offered back.

- **high** **The Guest pages still have no failure, offline or dead-link state — and the surface
  grew.** The Offline row still scopes itself to "Everywhere in the Family app and the Vendor
  portal" (`EXPERIENCE.md:451`), explicitly excluding the two public surfaces. Grep for *expired*,
  *revoked*, *rate limit*, *dead link* returns nothing for the Guest pages. `prd.md:184` and
  `EXPERIENCE.md:454` confirm links die when the Wedding concludes, but only from the Workspace
  side. Since pass 1 the page gained a **count control** and therefore a second failure mode
  (submission failure with an adjusted count), still unspecified. A Guest has no account, no app and
  no route to ask. *Fix:* add rows for expired/revoked link, rate-limited, and RSVP submission
  failure.

- **high** **Empty states are still an acknowledged hole rather than a covered one.** Open Question
  3 (`EXPERIENCE.md:1089`) names three; the IA implies more — Boards, the Enquiries tab, Guest list,
  Function detail with no Services, Vendor Listings, Real Weddings with none published, and the You
  surface. The document's own judgement still applies: "an empty screen is the worst first
  impression a paid tool can give". Unchanged. *Fix:* specify the shared anatomy (§3) and let
  per-surface copy stay open.

- **medium** **Cold load is one generic row, not the per-surface coverage the gap needed, and it
  does not answer the cached-content question.** `EXPERIENCE.md:450` scopes itself to "Every
  surface" and specifies the treatment, which is the important half. It does not say whether cached
  content renders first and is then refreshed, or whether every surface skeletons from cold — which
  is the decision that actually differs between Home (heavily cacheable), Service results (seeded
  per session, AD-22) and the Workspace (money, AD-19). *Fix:* one clause per surface class.

- **medium** **Permission-denied is still covered for push only.** The push row (`EXPERIENCE.md:593`)
  remains excellent. FR-11 still names contacts as a guest-list import route
  (`EXPERIENCE.md:611` — "taken from her contacts") with no permission state, and portfolio upload
  and Board image save still need camera and photo-library permission with none specified. Grep for
  *camera*: zero hits. Unchanged. *Fix:* add the rows; contacts matters most, being a named path in
  a decided section.

- **medium** **Focus still has no State Patterns row.** It is asserted at `EXPERIENCE.md:806` and
  specified visually for `search-field` only. Vendor cards, chips, medallions, tab items, the
  compare tray, the lens switch and now the three `button-choice` peers have no focus treatment.
  Unchanged. *Fix:* one row stating the global treatment and its exceptions.

- **medium** **OTP limit states are still named but not designed.** `EXPERIENCE.md:770` still says
  "six digits, valid ten minutes, five attempts, three resends per hour — the screen must express
  those limits" and still does not say how. Code expired, attempts exhausted and resends exhausted
  are three distinct dead ends on the only auth surface in the product. Unchanged. *Fix:* add them.

- **medium** **The Vendor's own Grace Period state is still missing.** The Family side is covered by
  "Listing leaves discovery" (`EXPERIENCE.md:446`); the Vendor's thirty-day Grace Period with
  reminders at 30/14/7/1 days appears only in Channels routing (`:565`), with no portal state.
  Given "the reminder **is** the renewal mechanism", this is the surface the business model runs on.
  Unchanged. *Fix:* add in-Grace and post-Grace rows.

- **low** **Real Weddings and Reels still have no IA row and no route.** Both still get major
  sections (`EXPERIENCE.md:233`, `:265`) and Real Weddings is still said to "appear inside the app
  as inspiration", but neither appears in the Family app IA table (`:79–94`) and no surface links to
  them. Unchanged. *Fix:* add IA rows with a `Reached from` value, or state that placement is open.

---

## 5. Visual reference coverage — thin *(pass 1: thin)*

Re-listed `.working/`: **18 HTML files** now (was 12) plus 5 extract Markdown. Grepped both spines
for each filename.

Referenced (**6 of 18**): `type-finalists-stress.html`, `directions-4.html`, `color-themes-1.html`,
`direction-failure-3.html`, `direction-workspace-4.html`, `guest-rsvp.html`.

Orphans (**12 of 18**): `direction-home-screen.html`, `direction-vendor-4.html`,
`direction-vendor-desktop.html`, `direction-vendor-switch.html`, `direction-family-record-3.html`,
`type-devanagari-pairing.html`, `type-devanagari-pairing-2.html`, **`critical-four.html`**,
**`availability-signal.html`**, **`availability-icons.html`**, **`availability-icons-b.html`**,
**`vendor-calendar-bar.html`**.

Six mocks were added and one reference. The ratio went from 5/12 to 6/18.

`mockups/` and `wireframes/` still do not exist; `imports/` still exists and is empty.
Spines-win-on-conflict is still stated once, at `EXPERIENCE.md:15–16`, correctly covering both files.

**Verified by rendering.** `EXPERIENCE.md:216` claims, as measured rather than asserted, that "the
card is 325px and the reply ends at 542 of 640 in `.working/guest-rsvp.html`". Reproduced in headless
Chrome: the file's own instrumentation reports *"Invitation card 325px. Reply control ends at 542px
✓ of 640px available — 98px of headroom above the fold."* **Exact.** This is the best-evidenced claim
in either spine and the pattern the rest of the run should follow.

### Findings

- **high** **`critical-four.html` — the options study behind four of this revision's five decisions —
  is referenced nowhere.** Its four sections are *1 · The Span continuation rail* (options A Bracket
  rail / **B One card, days inside** / C Words only), *2 · The availability signal*, *3 · What the
  screen shows while it waits*, *4 · The vendor calendar, without colour*. Every chosen option in
  `.memlog.md:100–106` is one of its options. A consumer questioning why a Span is one card, why the
  ring has three treatments, why skeletons beat a spinner, or why the calendar counts rather than
  textures has no route to the evidence. Worse, its section 1 is still **headed with the rejected
  pattern's name**, so a reader who opens `.working/` unprompted finds a document that appears to
  specify the continuation rail. *Fix:* link it at `EXPERIENCE.md:372`, `:407`, `:450` and `:424`,
  naming what each section shows and which option won.

- **high** **`availability-icons-b.html` and `vendor-calendar-bar.html` are the sole evidence for
  token values the spine states as fact, and neither is referenced.**
  `DESIGN.md:259–260` asserts a two-cut icon system — ">=24px … stroke 1.7" and
  "<=20px — inner grid REMOVED, stroke 2.4" — which only `availability-icons-b.html` demonstrates
  (verified: `stroke-width="1.7"` and `stroke-width="2.4"` both present, at two optical sizes).
  `DESIGN.md:273–277`'s count-not-texture rule for the calendar bar is argued from
  `vendor-calendar-bar.html` ("As first drawn" / "Strengthened"), which is likewise unnamed. These
  are the two most specific, least self-evident claims in the new frontmatter. *Fix:* link both.

- **medium** **The mocks behind the run's two largest earlier decisions are still never named.**
  `.memlog.md:20` records `direction-home-screen.html` as the artifact that resolved the home-screen
  decision by looking — the decision that overrides FR-10 and FR-68 — and `EXPERIENCE.md:62–77`
  states that override without linking it. `.memlog.md:54`, `:56` record `direction-vendor-4.html`
  and `direction-vendor-desktop.html` behind the Enquiries-with-two-lenses decision;
  `EXPERIENCE.md:141–161` states it without linking either. Unchanged. *Fix:* inline links.

- **medium** `direction-vendor-switch.html` (the lens switch) and `direction-family-record-3.html`
  (the three moments at which the Family learns what a Vendor recorded) are still the only
  renderings of two patterns the spines specify in prose and nowhere visually. Both still orphans.
  Unchanged. *Fix:* link at `EXPERIENCE.md:145` and `:738`.

- **medium** **`guest-rsvp.html` is cited as evidence for a design it does not render.** It is
  referenced at `EXPERIENCE.md:216` for the fold measurement, which reproduces exactly — but the file
  was written before the count-control decision and states so explicitly at its own lines 150–154:
  *"UJ-5's HEADCOUNT HAS NO HOME… None of the seven guest-page rules mentions a count control, so a
  faithful render cannot show one. No count control is invented here; the gap is recorded instead."*
  The spine has since filled that gap. A cited artifact that argues against the current spine, with
  no supersession note, is the failure mode `EXPERIENCE.md:15–16` exists to prevent. *Fix:* re-render
  with the count control, or note that the measured figures predate it and still hold because the
  control appears only after the answer.

- **medium** **Still no composition reference anywhere, and still nothing promoted.** All six
  references remain argumentative — "sizes lifted from", "renders every surface square", "rendered
  in" — which is better provenance than the examples show, but no section points a builder at what a
  screen looks like. `directions-4.html` remains a set of directions with nothing in either spine
  saying which was chosen. Unchanged. *Fix:* add a composition-reference line to the Family app IA
  and Vendor portal IA sections and name the chosen direction in `DESIGN.md`.

- **low** **Two prototypes render Unicode state glyphs that `DESIGN.md:599` now bans outright.**
  The new Don't reads: "Use a Unicode character for a state mark. `U+2713` renders with **emoji
  presentation** on several Android builds, putting an unchosen green tick into a system where
  nothing means *good* by being green." `guest-rsvp.html` — a *referenced* file — sets its *Yes*
  button glyph to `&#10003;` (U+2713), its *No* to `&#10007;` and its *Not sure* to `?`;
  `availability-signal.html` uses `✓ — ?` for the three ring states. The rule was written after both
  files and neither was updated. *Fix:* re-cut both with the inline SVGs from
  `availability-icons-b.html`, or note the files predate the rule.

- **low** Path forms are still inconsistent. `EXPERIENCE.md:678–680` names `directions-4.html`,
  `color-themes-1.html` and `direction-workspace-4.html` without the `.working/` prefix used
  elsewhere, and `EXPERIENCE.md:416` still references `compare.html` with no path (repo root —
  verified present). Unchanged. *Fix:* one prefix form; qualify `compare.html`.

- **low** The two Devanagari pairing mocks are still orphans even though `DESIGN.md:414–421` makes a
  substantive comparative argument (Inknut over Rozha One and Amita) they are the evidence for, and
  `.memlog.md:35` still records that `type-devanagari-pairing.html` **requires network** while every
  other artifact renders offline. Unchanged. *Fix:* link both with the caveat.

---

## 6. Bloat & overspecification — thin *(pass 1: thin)*

`EXPERIENCE.md` grew from 1110 to 1124 lines and `DESIGN.md` from 545-ish to 642. Nothing was cut.
Every pass-1 bloat finding survives, and the edits added a new class of it.

### Findings

- **high** `DESIGN.md`'s Layout & Spacing still contradicts itself within eight lines. It declares
  "a plain 4px grid that the existing values round onto without visible change" and sets the scale at
  4/8/12/16/24/32/48 (`DESIGN.md:449–456`), then specifies "a 13px row gap and a 6px column gap…
  Vendor cards stack with an 11px gap. Section heads take 20px above and 11px below"
  (`DESIGN.md:462–463`). Three of those four are off the grid it just declared, and none is a token.
  Unchanged. *Fix:* round them on, or drop the grid claim.

- **high** The half-tokenised component padding pattern **spread into the new components** rather
  than being resolved: `invitation-card.padding: '{spacing.4} 15px 15px'` (`:160`),
  `button-primary.padding: '{spacing.2} 14px'` (`:178`), `chip.padding: '{spacing.1} 10px'` (`:206`),
  `tab-bar.padding: '7px {spacing.1} 9px'` (`:231`), `banner-failure.padding: '{spacing.3} 13px'`
  (`:243`), and now **`span-card.padding: '{spacing.3} 11px'`** (`:295`),
  `calendar-day-bar.offset: '3px from the cell foot'` (`:271`),
  `availability-ring.size-large: 40px` (`:253`). Worse than pass 1 by three entries. *Fix:*
  tokenise, or state once that component dimensions are deliberately hand-tuned and off-scale.

- **high** `EXPERIENCE.md` still carries editorial voice throughout, which the rubric reserves for
  `DESIGN.md`. Unchanged, verbatim: "the highest-risk pattern in this document" (`:372`), "Confusing
  them is the most damaging mistake available on this surface" (`:722`), "a dashboard that only
  looks good stops being believed" (`:980`), and — still self-referential rather than specification
  — "This document's *State Patterns* section is longer than the site's entire error vocabulary, and
  that ratio is the point" (`:894`). *Fix:* keep the emphasis that ranks risk; cut the commentary
  about the document.

- **medium** Each of the five Key Flows still opens with a persona paragraph restating `prd.md` §2.2
  near-verbatim. Flow 1's opener (`EXPERIENCE.md:909–913`) still reproduces roughly fifty
  consecutive words from `prd.md:71`. Unchanged. *Fix:* cite the UJ and start at step 1.

- **medium** "The Service Catalogue Is Configuration, Not Design" (`EXPERIENCE.md:649–681`) still
  spends about thirty-five lines arguing whether *Invitations* and *Pandit / Priest* belong in the
  catalogue, and still concludes in Open Question 11 that "it changes nothing in this document either
  way". The actionable content is still the four-row rule table at the end. Unchanged. *Fix:* keep
  the table and the medallion correction; move the argument to the memlog.

- **medium** "Roles and What Each May Do" (`EXPERIENCE.md:752`) and "Reviews and the Record Each Side
  Holds" (`:719`) still restate FR-2/4/5/6 and FR-46/47/48 around their genuine decisions.
  Unchanged. *Fix:* keep the decisions, cite the FRs for the rest.

- **medium** The Reels subsection (`EXPERIENCE.md:265–292`) is unchanged at ~30 lines including its
  cost analysis — and it is now **also stale**, since the PRD change it says is owed has been made
  (see §7). The reason to compress it has strengthened. *Fix:* compress to the decision, correct the
  scope claim, move the cost analysis to the memlog.

- **medium** The edits left **run-on repair sentences** where a clean replacement was needed.
  `DESIGN.md:391` is a single ~380-character sentence carrying the danger-token naming rationale;
  `DESIGN.md:471` is a ~400-character sentence into which the three-region correction was spliced;
  `DESIGN.md:541` splices the Save-scoping correction into the middle of the button-label list.
  Each is a correct fact in a sentence nobody will read to the end of. *Fix:* break them.

- **low** `DESIGN.md`'s Open Questions 2, 5 and 6 still duplicate `EXPERIENCE.md`'s Open Questions 1,
  9 and 3. Four facts, two places each to edit — and §7 below shows what that costs: two of the four
  duplicated statements are now wrong in both copies. Unchanged. *Fix:* keep each question in one
  spine and cross-reference.

---

## 7. Inheritance discipline — thin *(pass 1: adequate)*

Re-verified the §3 Glossary term by term against `EXPERIENCE.md:344–350` (all 42, source order,
verbatim, no synonyms — still exact). Re-verified every `AD-n` against the architecture spine's
headings (22 cited, all resolve) and every `FR-n` against the PRD's headings (41 cited, all resolve).
Re-opened all six line-number citations.

**This is the category that moved backwards.** The PRD and the architecture spine were amended and
committed during this run (`.memlog.md:82`, commits `76399ff`, `22167c6`, `7d7ed5f`), and neither
spine was re-read against the amended sources. Five statements the pair makes about its own sources
are now false.

### Findings

- **critical** **Both spines assert that PRD edits are owed which have already been made.** Four
  statements, all verified against the current PRD:
  1. `EXPERIENCE.md:20` (top matter) — "Two of its decisions override shipped FRs; both overrides are
     recorded in full below and **both need a PRD edit that has not been made**." FR-10 now reads
     "*(Amended 2026-09-06 by the UX run. This consequence previously read 'It is the first thing the
     Family reaches after sign-in…')*" at `prd.md:405`; FR-68 carries the parallel note at
     `prd.md:396`.
  2. `EXPERIENCE.md:74` — "Both FRs require a PRD edit that **has not been made**." Same.
  3. `DESIGN.md:632–636` (Open Question 5) — "NFR 5.10 **still** points at
     `packages/shared/src/tokens.js` as the source of truth for colour and type and instructs
     downstream UX work not to invent a palette." §5.10 now reads the opposite:
     *"The identity is owned by … DESIGN.md, which is the single source of truth for colour and type;
     `packages/shared/src/tokens.js` is its projection and is regenerated from it"* (`prd.md:1350`),
     with its own amendment note. `EXPERIENCE.md:1114–1116` (Open Question 9) repeats the claim.
  4. `EXPERIENCE.md:267` — "**NEW SCOPE.** Video appears **nowhere** in the PRD — not once — so this
     is an addition… which makes this a PRD change owed alongside the others." `prd.md:1231` now
     carries "**The Creator can publish short vertical video of their own Wedding**", with the
     disclosed-ordering rule and its own *(Added 2026-09-06 by the UX run)* note.

  A downstream consumer reading either spine believes three PRD edits are outstanding and that video
  is out of scope. All four claims are wrong, and two of them are duplicated across both files
  because of the Open Questions duplication flagged in §6. *Fix:* re-read the amended PRD and rewrite
  OQ 5 / OQ 9 and the Reels scope paragraph to record the edits as **made**, with their commits.

- **high** `EXPERIENCE.md:340–342` states "The architecture describes the Vendor's Subscription
  payment as **'one-time checkout per term'** (AD-34). That is architecture vocabulary. **The button
  may not say Checkout.**" AD-34 no longer says it: `ARCHITECTURE-SPINE.md:409` reads "the
  integration takes a single payment per term *(wording amended 2026-09-06: this read 'one-time
  checkout per term', and PRD §7.9 bans checkout across every downstream document)*". The rule the
  paragraph draws is still right; the premise it draws it from is quoting a sentence that no longer
  exists. *Fix:* re-source it to the amendment note, or state the rule without the quote.

- **high** **The two spines contradict each other on the availability ring.** Full detail in §3.
  This is the same class of defect as the two contradictions pass 1 found (Save, 768px) — both of
  which were closed — reintroduced on the newest component. *Fix:* one statement in `DESIGN.md`,
  inherited by `EXPERIENCE.md`.

- **medium** **`prd.md:1353` is cited twice and is one line off.** `DESIGN.md:357` and
  `DESIGN.md:587` both cite it for the muted contrast lock. `prd.md:1353` is now the *palette*
  bullet ("The palette is festive, not corporate. Kumkum vermillion carries every action…"); the
  lock is at `prd.md:1354` ("One token in the palette is an accessibility decision, not an aesthetic
  one… It must not be lightened"). The §5.10 amendment shifted the section. The substance is
  correct; the pointer is not. *Fix:* re-cite `prd.md:1354`, or cite the bullet by name rather than
  by line so the next amendment does not break it.

- **medium** Three UJ names are still truncated in the Key Flow titles, in violation of verbatim
  inheritance: UJ-3 still loses "and the reviews become worth reading" (`EXPERIENCE.md:994` vs
  `prd.md:121`), UJ-5 still loses "and finds his own daughter's wedding" (`:1021` vs `prd.md:172`),
  UJ-4 still loses "opens a Service" (`:1049` vs `prd.md:148`). In two of the three the dropped
  clause still corresponds to a beat the flow omits (§1). Unchanged. *Fix:* restore the full names.

- **medium** `DESIGN.md` still has **no `sources:` frontmatter key.** Confirmed: top-level keys are
  `name`, `description`, `status`, `updated`, `colors`, `typography`, `rounded`, `spacing`,
  `components`. Its provenance — `styles.css`, the `.working/extract-*.md` files, the memlog, the
  published site — exists only in prose, so a consumer cannot mechanically determine what it
  inherits from. `EXPERIENCE.md` still does this correctly. Unchanged, and the amendment problem
  above is the concrete cost. *Fix:* add `sources:`.

- **medium** One component still carries three names across the pair: `price-unestimated`
  (frontmatter `:302`), "**Not yet estimated**" (`DESIGN.md:577`), and `"not yet estimated"`
  (Component Patterns `:426`), referenced as `{components.price-unestimated}` in one place
  (`:632`) and by prose name in three others. Unchanged. *Fix:* one name in all five places.

- **low** `EXPERIENCE.md:54` and `:364` still cite "AD Conventions §i18n" and "AD Conventions
  §Errors". The rows exist and the content is accurate, but the section is titled **"Consistency
  Conventions"** (`ARCHITECTURE-SPINE.md:442`). Unchanged. *Fix:* use the real name.

- **low** "Invitation card" (`DESIGN.md:525`) vs "Invitation card strip" (`EXPERIENCE.md:62`,
  `:406`) is still two names for the product's signature object. Unchanged. *Fix:* pick one.

- **low** `banner-failure` still exists in the frontmatter (`DESIGN.md:238`) and is referenced from
  State Patterns (`EXPERIENCE.md:456`), but still has no `## Components` prose entry — it is
  described inside the Colors section (`DESIGN.md:385–397`). Unchanged; now one of six such
  components (§3). *Fix:* add the prose entry.

- **low** `DESIGN.md:426–428` still states "`apps/mobile/tailwind.config.js` already declares
  `Playfair Display` with **no font file behind it**" without the `packages/shared/src/tokens.js`
  indirection. Re-verified: the config sources `fontFamily: { heading: [fonts.headingFamily] }` from
  `@vivahspot/shared/tokens`, where `fonts.headingFamily = 'Playfair Display'`. Substance correct,
  sentence still one indirection off. Unchanged. *Fix:* say "via `packages/shared/src/tokens.js`".

---

## 8. Shape fit — strong *(pass 1: strong)*

`DESIGN.md` sections run Brand & Style (`:309`) → Colors (`:335`) → Typography (`:403`) → Layout &
Spacing (`:447`) → Elevation & Depth (`:475`) → Shapes (`:499`) → Components (`:523`) → Do's and
Don'ts (`:583`). Canonical order, no omissions, no reordering. Unchanged.

`EXPERIENCE.md` still carries all eight required defaults — Foundation, Information Architecture,
Voice and Tone, Component Patterns, State Patterns, Interaction Primitives, Accessibility Floor, Key
Flows — plus both required-when-applicable sections, Responsive & Platform and Inspiration &
Anti-patterns. Nothing required is missing or dropped.

**The revision was structurally disciplined.** Five new components, three new patterns and a rewritten
Span all landed *inside* existing sections — Spans stayed under Component Patterns, Cold load and
Vendor calendar day under State Patterns, the ring under both — rather than spawning new top-level
sections. That is the right instinct and it is why this category holds.

### Findings

- **low** `## Components` no longer mirrors the frontmatter. The frontmatter carries 15 components;
  the prose section describes 10, and four of the five newest are absent (§3). The spec reserves
  section 7 for per-component anatomy and state appearance, so the drift is inside the shape rather
  than outside it — but a consumer reading `## Components` as the inventory now misses a third of
  the system. *Fix:* add the six missing entries.

- **low** Both files still append an "Open Questions" section after the last canonical section
  (`DESIGN.md:610`, `EXPERIENCE.md:1080`). Still an invention, still earning its place — a downstream
  consumer needs to know what is undecided. Noted again only so the deviation stays deliberate.
  *Fix:* none. (But see §7: two of its entries are now factually wrong.)

---

## Mechanical notes

**Frontmatter completeness.** `DESIGN.md` carries `name`, `description`, `status`, `updated`,
`colors` (18), `typography` (20), `rounded` (5), `spacing` (10), `components` (**15**, up from 10).
Still missing: `sources`, and an `elevation`/`shadows` group the components block still depends on.
`EXPERIENCE.md` carries `name`, `description`, `status`, `updated`, `design`, `sources` (3, all
resolve). The `design: ./DESIGN.md` pointer resolves.

**Status and dates are staler than they were.** Both files still declare `status: draft` and
`updated: 2026-09-06`. Actual modification times: `DESIGN.md` 2026-09-07 13:51, `EXPERIENCE.md`
2026-09-07 13:53 — a full day after the recorded date, and now across **two** revision rounds. The
frontmatter cannot tell a consumer that a pair carrying five new components and a rewritten Span is
newer than the version the first review read. Bump both to 2026-09-07.

**Cross-reference integrity.** 215 `{token}` reference occurrences (197 in `DESIGN.md` across 45
unique paths, 18 in `EXPERIENCE.md` across 12), **zero unresolved** — including all references inside
the five new components and the nested `{components.chip}` in `span-card.days`. All 22 `AD-n` and all
41 `FR-n` citations resolve to real sections. `prd.md:244`, `:414`, `:466`, `:476` and
`research-india-regulatory.md:207` re-opened and accurate to the line. **`prd.md:1353` is now off by
one** (§7). `compare.html` resolves to the repo root. `packages/shared/src/tokens.js` still carries
the superseded rose-pink palette (`accent: '#e23e7a'`), which both spines still flag as an owed
change.

**Contrast arithmetic** recomputed independently, not taken on trust. All sixteen stated ratios hold
to within rounding, exactly as in pass 1. Six ratios the **new** components imply were computed for
the first time; three of them fall below the document's own 3:1 non-text floor (§2).

**Span reconciliation — the specific thing asked for.** Grep for *continuation*, *rail*, *bracket*
across both spines: every surviving hit is the **vendor portal's left/right rail**, not the Span. No
stale Span-rail language exists in either file. `.memlog.md:108`'s claim that "every stale reference
to the removed rail" was cleared holds for the spines. It does **not** hold for `.working/`:
`critical-four.html` is still headed "1 · The Span continuation rail" and is unreferenced (§5). The
new shape does create two coverage gaps — the Function detail IA row and the Workspace IA row (§1) —
and one botched edit in Flow 1 (§1).

**The five new components, checked individually.** `availability-ring` — behavioural counterpart at
`EXPERIENCE.md:407`, all `{token}` refs resolve, **contradicts its counterpart and falls below the
non-text floor** (§3). `skeleton` — counterpart at `:450`, refs resolve, clean. `calendar-day-bar` —
counterpart at `:424`, refs resolve, pending-state colour below the floor. `button-choice` — **no
counterpart names it**, refs resolve. `span-card` — counterpart at `:388`, refs resolve, clean. Four
of the five have no `## Components` prose entry.

**Name inconsistencies (consolidated, all unchanged).** `price-unestimated` / "Not yet estimated" /
"not yet estimated"; "Invitation card" / "Invitation card strip"; "AD Conventions" / "Consistency
Conventions"; `.working/`-prefixed vs bare mock filenames. New: "Availability signal" appears twice
in Component Patterns with different content.

**No Mermaid diagrams** in either spine, so there is no diagram syntax to validate.

**Finding counts.** critical 2 · high 17 · medium 32 · low 14 — **65 total**.

---

## Reconciliation against pass 1

Of the 51 findings in `review-rubric.md`: **6 CLOSED · 4 CHANGED · 41 STILL OPEN**, plus **21 NEW**.

### §1 Flow coverage

| # | Pass-1 finding | Verdict |
|---|---|---|
| 1 | **critical** FR-71 uncited; publish gate says "exactly these four" | **CLOSED.** `EXPERIENCE.md:167` now reads "four general items plus whatever this Service requires… **FR-71 adds per-Service conditions on top of these**", matching `prd.md:706` verbatim in substance. All five capabilities added at `:180–186` and verified clause by clause against `prd.md:709–713`. Residual: the Listing-detail IA row (`:85`) still does not list the per-Service capability among what a Listing shows — the "Where it surfaces" column carries it instead, which is adequate but indirect |
| 2 | **high** UJ-5 resolution beat has no step | **STILL OPEN.** Flow 4 still ends at the climax (`:1041`); no step 7 |
| 3 | **high** FR-31 uncovered | **STILL OPEN.** Still uncited; keyword grep still returns zero |
| 4 | **medium** UJ-4 step 5 has no step, silently | **STILL OPEN.** Flow 5 unchanged |
| 5 | **low** Flows not in UJ order | **STILL OPEN.** Still 1·2·3·5·4 |

### §2 Token completeness

| # | Pass-1 finding | Verdict |
|---|---|---|
| 6 | **high** `elevation-1/2/3` used as values, no frontmatter group | **STILL OPEN.** Verified: no `elevation` or `shadows` key exists; `:161`, `:193`, `:225` still carry literals |
| 7 | **high** `fontFamily: system-sans` unresolvable on nine roles | **STILL OPEN.** Nine occurrences confirmed |
| 8 | **medium** rating-chip scrim has no colour or contrast target | **STILL OPEN.** `:550` unchanged |
| 9 | **medium** focus ring has no non-text contrast target | **STILL OPEN.** And now more exposed by `button-choice`, which carries no focus value |
| 10 | **low** six colour tokens unreferenced by any component | **CHANGED.** The new components reference turmeric, gold-tint, muted, surface, ink and vermillion by name, so the gap narrowed to `on-turmeric`; `foil`, `shadow-tint` and the two gradients still reach components only as literal strings |

### §3 Component coverage

| # | Pass-1 finding | Verdict |
|---|---|---|
| 11 | **critical** Span continuation rail has no `DESIGN.md` entry | **CLOSED.** The pattern was replaced rather than specified — `span-card` at `DESIGN.md:291–301` with background, 2px turmeric border, radius, padding, title, price, day-chips and a note fixing its position. The rail no longer exists to specify |
| 12 | **critical** Availability signal has no visual spec, no glyph named | **CHANGED — not closed.** A spec now exists (`availability-ring`, `:251–261`) with inline-SVG glyphs and two optical cuts, which answers "no glyph is named". But it contradicts `EXPERIENCE.md:407` on the three treatments, separates free from taken **by colour alone**, uses solid-vs-dashed at 16px against its own new Don't, and puts the free ring at 1.57:1. The finding is not closed; it has a different shape |
| 13 | **high** Featured band has no visual spec; chip collides | **STILL OPEN.** Neither `featured-band` nor `chip-featured` exists |
| 14 | **high** Function card has no visual spec | **STILL OPEN.** And more load-bearing now |
| 15 | **medium** `button-primary`/`button-celebration`/`chip`/`search-field` have no Component Patterns row | **STILL OPEN.** Table verified: 22 rows, none of the four |
| 16 | **medium** empty-state anatomy has no component | **STILL OPEN** |
| 17 | **medium** lens switch and left rail have no component | **STILL OPEN** |

### §4 State coverage

| # | Pass-1 finding | Verdict |
|---|---|---|
| 18 | **critical** no cold-load or loading state anywhere | **CLOSED.** `EXPERIENCE.md:450` adds a Cold load row for every surface, backed by `{components.skeleton}` (`DESIGN.md:262–267`), with the no-layout-shift rule and a `prefers-reduced-motion` path. Residual (new, medium): one generic row rather than per-surface, and it does not say whether cached content renders first |
| 19 | **high** no search-empty / no-results state | **STILL OPEN.** Grep still returns zero |
| 20 | **high** Guest pages have no failure, offline or dead-link state | **STILL OPEN.** Offline row still scoped to "the Family app and the Vendor portal"; and the surface gained a control since |
| 21 | **high** empty states acknowledged, not covered | **STILL OPEN.** Open Question 3 unchanged |
| 22 | **medium** permission-denied covered for push only | **STILL OPEN.** No contacts, camera or photo-library state |
| 23 | **medium** focus has no State Patterns row | **STILL OPEN** |
| 24 | **medium** OTP limit states named, not designed | **STILL OPEN.** `:770` unchanged |
| 25 | **medium** Vendor's Grace Period state missing | **STILL OPEN** |
| 26 | **low** Real Weddings and Reels have no IA row | **STILL OPEN** |

### §5 Visual reference coverage

| # | Pass-1 finding | Verdict |
|---|---|---|
| 27 | **high** the two largest-decision mocks are never named | **STILL OPEN.** `direction-home-screen.html`, `direction-vendor-4.html`, `direction-vendor-desktop.html` all still orphans |
| 28 | **high** `direction-vendor-switch.html` and `direction-family-record-3.html` orphaned | **STILL OPEN** |
| 29 | **medium** no composition reference anywhere | **STILL OPEN** |
| 30 | **medium** `directions-4.html`'s chosen direction never named | **STILL OPEN** |
| 31 | **low** inconsistent path forms; bare `compare.html` | **STILL OPEN** |
| 32 | **low** Devanagari pairing mocks orphaned, network caveat uncarried | **STILL OPEN** |

### §6 Bloat & overspecification

| # | Pass-1 finding | Verdict |
|---|---|---|
| 33 | **high** Layout & Spacing contradicts itself | **STILL OPEN.** `:449–463` unchanged |
| 34 | **high** off-grid literals inside `components` frontmatter | **CHANGED — worse.** All four originals survive and three more were added: `span-card` 11px, `calendar-day-bar` 3px offset, `availability-ring` 40px |
| 35 | **high** editorial voice in `EXPERIENCE.md` | **STILL OPEN.** All four quoted lines survive verbatim, including the self-referential one at `:894` |
| 36 | **medium** persona paragraphs restate `prd.md` §2.2 | **STILL OPEN** |
| 37 | **medium** Service Catalogue section carries thirty-five lines for a four-row table | **STILL OPEN** |
| 38 | **medium** Roles / Reviews sections restate FRs | **STILL OPEN** |
| 39 | **medium** Reels sized like a decided capability while out of scope | **CHANGED.** Still ~30 lines with the cost analysis — but the scope premise inverted: the PRD change it says is owed was made (`prd.md:1231`), so it is now oversized *and* factually wrong |
| 40 | **low** duplicate Open Questions across both spines | **STILL OPEN.** And the duplication now propagates two false claims (§7) |

### §7 Inheritance discipline

| # | Pass-1 finding | Verdict |
|---|---|---|
| 41 | **high** spines contradict on whether a Save action exists | **CLOSED.** `DESIGN.md:541` now scopes Save to Boards only (FR-67) and states explicitly that nothing in the Workspace is labelled Save; the Do's and Don'ts row at `:597` matches; `EXPERIENCE.md:451` unchanged and now consistent |
| 42 | **high** spines contradict on the vendor portal above 768px | **CLOSED.** `DESIGN.md:471` now specifies **three regions** — left rail, main column, right rail — matching `EXPERIENCE.md:828` |
| 43 | **medium** three UJ names truncated in flow titles | **STILL OPEN.** All three verified against `prd.md:121`, `:148`, `:172` |
| 44 | **medium** `price-unestimated` carries three names | **STILL OPEN** |
| 45 | **medium** `DESIGN.md` has no `sources:` key | **STILL OPEN.** Top-level keys re-parsed and confirmed |
| 46 | **low** `banner-failure` has no `## Components` prose entry | **STILL OPEN.** Now one of six |
| 47 | **low** "Invitation card" vs "Invitation card strip" | **STILL OPEN** |
| 48 | **low** "AD Conventions" vs "Consistency Conventions" | **STILL OPEN.** Section title verified at `ARCHITECTURE-SPINE.md:442` |
| 49 | **low** tailwind.config sentence is one indirection off | **STILL OPEN.** `DESIGN.md:426–428` unchanged |

### §8 Shape fit

| # | Pass-1 finding | Verdict |
|---|---|---|
| 50 | **low** Open Questions appended after the last canonical section | **CLOSED — no action was required.** Re-checked; still deliberate, still earns its place |
| 51 | **low** two of the nine invented sections do not carry their length | **STILL OPEN.** Deferred to §6, where both entries survive |

### NEW — introduced by the changes since pass 1

21 findings the first pass could not have made. Every one traces to an edit made since.

| # | Severity | Finding |
|---|---|---|
| N1 | **critical** | Four claims that PRD edits are owed are false — FR-10, FR-68, NFR 5.10 and video were all amended and committed (`EXPERIENCE.md:20`, `:74`, `:267`, OQ 9; `DESIGN.md` OQ 5) |
| N2 | **critical** | `DESIGN.md` and `EXPERIENCE.md` specify the availability ring differently, and `DESIGN.md`'s version separates *free* from *taken* by colour alone |
| N3 | **high** | The *shows free* ring is 1.57:1 on ground / 1.15:1 fill, and the enquiries-pending bar 1.61:1 — below the document's own 3:1 non-text floor |
| N4 | **high** | The ring separates *taken* from *not stated* by solid-vs-dashed at 16px, the device `DESIGN.md:601`'s new Don't bans |
| N5 | **high** | `EXPERIENCE.md:83`'s Function detail row — "every Service serving it" — contradicts the new "a Span never appears under a Function" rule |
| N6 | **high** | `critical-four.html`, the options study behind four of this revision's five decisions, is unreferenced and still headed with the rejected pattern's name |
| N7 | **high** | `availability-icons-b.html` and `vendor-calendar-bar.html` are the sole evidence for the icon-cut and count-not-texture tokens, and both are unreferenced |
| N8 | **high** | `EXPERIENCE.md:340` quotes AD-34's "one-time checkout per term", which was amended out of `ARCHITECTURE-SPINE.md:409` |
| N9 | **medium** | The Workspace IA row (`:82`) was not updated for the *Across the wedding* section |
| N10 | **medium** | Flow 1 step 9 carries a half-deleted sentence: "Shubhmangal Lawns appears under / Shubhmangal Lawns sits in…" (`:940–942`) |
| N11 | **medium** | Flow 4 was not updated for the guest count control |
| N12 | **medium** | Six of fifteen frontmatter components have no `## Components` prose entry |
| N13 | **medium** | `button-choice` is named nowhere in `EXPERIENCE.md` — the only new component without a counterpart that references it |
| N14 | **medium** | The guest count control has no visual spec anywhere |
| N15 | **medium** | "Availability signal" appears twice in Component Patterns (`:407` and `:410`) with different content |
| N16 | **medium** | Cold load is one generic row and does not say whether cached content renders first |
| N17 | **medium** | `guest-rsvp.html` is cited as evidence but predates the count control and internally records it as an unfilled gap |
| N18 | **medium** | New off-scale token values: `size-large: 40px`, `offset: 3px`, `span-card` 11px padding |
| N19 | **medium** | `prd.md:1353` is cited twice for the muted lock, which moved to `prd.md:1354` |
| N20 | **medium** | Edit-scar run-on sentences at `DESIGN.md:391`, `:471`, `:541` |
| N21 | **low** | `guest-rsvp.html` (referenced) and `availability-signal.html` render Unicode state glyphs — including U+2713 — that `DESIGN.md:599`'s new Don't bans outright |
