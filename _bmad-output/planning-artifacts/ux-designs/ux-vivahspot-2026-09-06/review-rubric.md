# Spine Pair Review — vivahspot

## Overall verdict

The reference layer of this pair is the strongest I have seen in a spine: every one of the 44
`{path.to.token}` references in `DESIGN.md` and all 11 in `EXPERIENCE.md` resolve, all 42 Glossary
terms are reproduced verbatim from `prd.md` §3, all 22 `AD-n` and 40 `FR-n` citations point at real
sections, every line-number citation spot-checked (`prd.md:244`, `:414`, `:466`, `:476`, `:1353`,
`research-india-regulatory.md:207`) is accurate, and all sixteen stated contrast ratios reproduce to
within rounding when recomputed. What a downstream consumer still cannot do is build a screen. Only
three of roughly thirty named components carry both a visual spec and a behavioural one; the Span
continuation rail — which `EXPERIENCE.md` itself calls the highest-risk pattern in the document —
has no visual spec at all; there is no loading state anywhere in a product whose stated target is a
mid-range Android on patchy mobile data; and seven of the twelve working mocks, including the two
behind the largest decisions in the run, are never referenced.

Treat this as a decision record that is nearly finished and a build contract that is roughly half
finished. The gaps are concentrated and nameable, not diffuse.

---

## 1. Flow coverage — adequate

Extracted all five journey names from `prd.md` §2.2 and matched them against the five Key Flows.
Every flow has a named protagonist, numbered steps, an explicitly marked **Climax**, and (four of
five) a labelled edge case or failure path. Also extracted all 72 FR names and checked which have no
behavioural home anywhere in `EXPERIENCE.md`, and walked each UJ's own `Path` steps against the
matching flow's steps.

### Findings

- **critical** FR-71 ("What each Service is required to carry") is cited nowhere in `EXPERIENCE.md`
  and four of its five required capabilities appear nowhere in either spine — grep for *named
  person*, *who will actually shoot*, *additional payment*, *virtual tour* returns zero hits. Worse,
  the Vendor portal capability table asserts the opposite of FR-71: "Listing completeness | FR-59,
  AD-27 | A four-item publish gate… **The editor must show exactly these four**"
  (`EXPERIENCE.md:161`), while `prd.md:706` states these are "**additional conditions of listing, on
  top of the general ones in FR-59**". A builder following the spine ships a gate that lets a
  Photography Listing publish without naming who shoots and a Band Baaja Baraat Listing publish
  without the no-demands declaration. *Fix:* change "exactly these four" to "the four general
  conditions plus whatever the Service's own FR-71 configuration requires", and add a Listing-detail
  row for the per-Service required capability so it has a rendering.

- **high** UJ-5's resolution beat has no step. `prd.md:118` makes it explicit — "He taps the quiet
  line, and starts a Wedding of his own… **This is the only growth channel designed into the
  product**" — but Flow 4 (`EXPERIENCE.md:1007`) ends at Rutuja's count moving, and the growth line
  is specified only as "one quiet growth line at the foot", with its wording still open
  (Open Question 2). The single designed growth loop in the product has no designed transition.
  *Fix:* add a step 7 to Flow 4 covering what happens when the growth line is tapped — where it
  lands, and whether it carries anything from the invitation he just answered.

- **high** FR-31 ("Seeing where the year is empty") is uncovered anywhere. The Vendor portal
  restructure demoted Calendar from a destination to a lens of Enquiries (`EXPERIENCE.md:145`), and
  FR-31's capability — which Slots are empty, which are drawing no interest, feeding FR-30 seasonal
  pricing — was not re-homed into any of the four surviving destinations. Grep for *drawing no
  interest*, *calendar's health*, *where the year is empty* returns zero. *Fix:* place it in
  Performance or in the Calendar lens explicitly, and say which.

- **medium** UJ-4's path step 5 — Kiran configuring a new Service (taxonomy, filters, comparison
  attributes, Sizing Attribute, Order Basis, Engagement Model, pricing model; `prd.md:92`) — has no
  step in Flow 5, and the flow title drops "opens a Service" from the UJ name. The omission is
  probably correct (Admin is Frappe Desk, AD-2) but it is silent rather than stated, so a reader
  cannot tell whether it was decided or forgotten. *Fix:* one line in Flow 5 saying the Service
  configuration act happens in Desk and lands on no designed surface.

- **low** Flows are not in UJ order — Flow 4 is UJ-5 and Flow 5 is UJ-4 (`EXPERIENCE.md:1007`,
  `:1035`). Harmless but it costs a reader a double-take on every cross-reference. *Fix:* reorder or
  renumber to match.

---

## 2. Token completeness — adequate

Parsed the `DESIGN.md` frontmatter into a path set and resolved every `{…}` reference in both files
against it programmatically: 44 references in `DESIGN.md`, 11 in `EXPERIENCE.md`, **zero
unresolved**. Every one of the 18 colour tokens carries a hex. Recomputed all sixteen contrast
ratios stated in prose against the actual hex values.

Contrast verification (WCAG relative luminance, computed from the frontmatter hexes):

| Claim | Stated | Computed |
|---|---|---|
| ink on ground | 17.75 | 17.75 |
| ink on surface | 18.22 | 18.22 |
| muted on ground | 4.76 | 4.77 |
| muted on surface | 4.89 | 4.89 |
| white on vermillion | 4.80 | 4.80 |
| ink on turmeric | 11.33 | 11.33 |
| white on turmeric | 1.61 | 1.61 |
| ink on gold-tint | 15.41 | 15.41 |
| muted on gold-tint | 4.14 | 4.14 |
| vermillion on gold-tint | 4.06 | 4.06 |
| vermillion on turmeric | 2.99 | 2.99 |
| hairline on ground | 1.23 | 1.23 |
| white on danger | 8.3 | 8.28 |
| danger on ground | 8.1 | 8.07 |
| danger on danger-tint | 6.7 | 6.74 |
| turmeric on gold-tint | 1.36 | 1.36 |

Every figure holds. The document's own note that muted computes 4.77 rather than 4.76 is correct and
correctly dismissed as rounding. This is the best-evidenced part of either spine.

### Findings

- **high** `elevation-1`, `elevation-2` and `elevation-3` are used as component values —
  `invitation-card.shadow: elevation-2`, `vendor-card.shadow: elevation-1`,
  `category-medallion.shadow: elevation-1` (`DESIGN.md:155`, `:187`, `:219`) — but no `elevation` or
  `shadows` group exists in the frontmatter. They resolve only by a human reading the prose at
  `DESIGN.md:426–433`. A machine extractor mirroring the frontmatter into `tokens.js` gets the
  literal string `elevation-2`. This is the one place the spec's own resolver contract breaks.
  *Fix:* add an `elevation` (or `shadows`) frontmatter group with the three CSS values already
  written in prose, and change the component entries to `{elevation.2}` style references.

- **high** `fontFamily: system-sans` (`DESIGN.md:65`, `:70`, `:80`, `:90`, `:95`, `:100`, `:111`,
  `:121`, `:127` — nine typography roles) is not a resolvable font family. The actual stack lives
  only in prose at `DESIGN.md:374`. Nine of the twenty typography tokens — every functional role,
  including body, price, button, meta and tab — therefore carry an unusable `fontFamily`. *Fix:*
  either put the literal stack in the frontmatter, or use the spec's `note:` convention for platform
  inheritance as `design-example-mobile.md` does.

- **medium** The vendor card's rating chip sits "on a `rgba(0,0,0,0.6)` scrim" (`DESIGN.md:493`)
  over an arbitrary Vendor photograph, and no text colour or contrast target is stated for it. This
  is a load-bearing combination — a rating is exactly the kind of thing a Family reads — over the
  one background in the system whose luminance is unknown. *Fix:* name the label colour and state
  the floor the scrim is sized to hold.

- **medium** No contrast target is stated for the focus ring against anything but white. It is
  specified as `2px solid {colors.vermillion}, offset 2px` on `search-field` (`DESIGN.md:213`) and
  generalised in `EXPERIENCE.md`'s Accessibility Floor, but a vermillion ring around a
  `{colors.gold-tint}` chip computes 4.06:1 for text and is untested as a 3:1 non-text indicator.
  *Fix:* state the ring's non-text contrast floor and name the one fill it may not sit on.

- **low** Six colour tokens are defined but never referenced by any component entry —
  `on-turmeric`, `foil`, `shadow-tint`, `medallion-start/end`, `placeholder-start/end` reach
  components only through literal gradient strings rather than references. Consistent, but it means
  the components block is not a complete projection of the palette. *Fix:* none required; noted so
  a token-diffing tool is not surprised.

---

## 3. Component coverage — thin

Extracted every component name from the `DESIGN.md` `components` frontmatter (10), the
`DESIGN.md` ## Components prose (9), and the `EXPERIENCE.md` Component Patterns table (20 rows plus
the Span continuation subsection), then intersected them.

**Components with both a visual spec and a behavioural spec: three.** Invitation card, Vendor card,
and the not-yet-estimated price treatment. `banner-failure` is a half — it has a frontmatter entry
and is referenced from State Patterns, but has no ## Components prose entry and no Component
Patterns row.

Seventeen `EXPERIENCE.md` patterns have no visual spec: Function card, Availability signal, Featured
band, Ordering disclosure, Rules panel, Rule-conflict prompt, Compare tray, Collision view, Enquiry
thread, Agreement record, Guest household row, Pasted list import, Suggestion queue, Portfolio
image, Vendor calendar Slot, Grievance entry point, Span continuation rail. Four `DESIGN.md`
components have no behavioural spec: button-primary, button-celebration, chip, search-field.

### Findings

- **critical** The **Span continuation rail** has no entry in `DESIGN.md` at all — not in the
  frontmatter, not in ## Components. `EXPERIENCE.md:359` heads its section "the highest-risk pattern
  in this document" and requires the connector to "read with colour removed, because
  `{colors.hairline}` is 1.23:1 and may never carry meaning" (`EXPERIENCE.md:377`) — but gives no
  stroke weight, no colour token, no geometry, and no rule for how it crosses the gap between
  Function cards. The document diagnoses the exact failure (`direction-workspace-4.html` "would
  mislead anyone building from it") and then leaves the replacement unspecified. A builder ships
  hairline, and the ₹7,20,000-for-a-₹2,40,000-lawn error the section exists to prevent comes back as
  a rendering bug. *Fix:* add a `continuation-rail` component with a colour token that clears 3:1,
  a stroke width, and the inter-card behaviour.

- **critical** The **Availability signal** — "the capability that makes the product worth opening,
  and the one a builder is most likely to reduce to a boolean" (`EXPERIENCE.md:482`) — has three
  behavioural states and no visual spec. `EXPERIENCE.md:485–489` requires "a glyph **and** the word"
  for two states and "**Nothing.** Not greyed, not 'unknown' styled as a failure" for the third, but
  no glyph is named, no colour assigned, and no treatment given for the neutral third state.
  *Fix:* add an `availability-signal` component with the three renderings, and name the glyphs.

- **high** The **Featured band** has no visual spec, and its per-card `Featured` chip collides with
  the existing `chip` component. `DESIGN.md:498` defines `chip` as the *filter* chip — gold-tint
  fill, turmeric border, vermillion when selected. A `Featured` chip built from that component reads
  as a selected filter. Given that `EXPERIENCE.md:697` records this band as live CCPA exposure and
  that its three non-colour signals are what carry FR-20, the one component the disclosure rests on
  should not be borrowed. *Fix:* add a distinct `chip-featured` (or `badge-paid`) component, and a
  `featured-band` container spec.

- **high** The **Function card** has no visual spec. It is the Workspace's primary object, carries
  three row states each requiring "a glyph **and** a word" (`EXPERIENCE.md:395`), and hosts the Span
  rail. Nothing in `DESIGN.md` describes it. *Fix:* add it to ## Components with its row states.

- **medium** `button-primary`, `button-celebration`, `chip` and `search-field` have no row in
  Component Patterns. Search is the most consequential: it is a top-level element of Home
  (`EXPERIENCE.md:71`) and realises FR-18, yet no spine says what it searches over, whether it is
  scoped to a Service, what happens on submit, or what it does with no matches. *Fix:* add
  Component Patterns rows for all four; the search one is not optional.

- **medium** The **empty-state anatomy** is explicitly salvaged — "Circular icon → heading → one
  sentence → one button, capped and centred… Keep it; rewrite every string"
  (`EXPERIENCE.md:838`) — but has no component in either spine, and Open Question 3 leaves empty
  states open. A named, adopted pattern with no specification will be reinvented per screen.
  *Fix:* promote it to a component in both files even while the individual strings stay open.

- **medium** The vendor portal's **lens switch** (segmented control) and **left rail** are load-
  bearing structural components — the lens switch is what makes Enquiries "one surface rather than
  two" (`EXPERIENCE.md:150`) — and neither appears in Component Patterns or `DESIGN.md`.
  *Fix:* add both.

---

## 4. State coverage — thin

Walked each of the 14 Family app IA surfaces, the 4 Vendor destinations and the 4 Guest pages
against the six state classes (empty, cold-load, focus, error, offline, permission-denied) plus the
lifecycle states the sources imply.

What is covered is covered unusually well. The Failure, Offline, Destructive-confirmation,
Invited-Member, Listing-leaves-discovery, Vendor-removed and Wedding-lifecycle rows are more
rigorous than anything in the reference examples — the offline row's "no explicit save action exists
anywhere in the Workspace… an interrupted Agreement confirmation retried is a no-op" is exactly the
altitude a consumer needs. The gaps are in the ordinary states, not the hard ones.

### Findings

- **critical** **There is no cold-load or loading state anywhere in `EXPERIENCE.md`.** Grep for
  *skeleton*, *loading*, *cold load*, *spinner*: zero hits across 1110 lines. Both reference examples
  open their State Patterns with one. The document names its target as "a mid-range Android on
  patchy mobile data" at least five times and hangs NFR 5.3 on it, then specifies nothing for the
  seconds that condition actually produces. The nearest thing is the vendor-card placeholder
  gradient, which covers one image, not a screen. Every surface will get whatever loading treatment
  its implementer improvises. *Fix:* add cold-load rows for Home, Service results, Listing detail,
  the Workspace and the Vendor Enquiries landing, and say whether cached content renders first.

- **high** **No search-empty / no-results state.** Grep for *no results*, *no matches*, *nothing
  matched*: zero hits. Home carries a search field and Service results carry per-Service filters;
  the combination that returns nothing is unspecified. This is distinct from "Empty Shortlist", which
  is covered. *Fix:* add a row for Service results with zero matches and one for search with zero
  matches, and say whether filters are offered back.

- **high** **The Guest pages have no failure, offline or dead-link state.** The Offline row scopes
  itself to "Everywhere in the Family app and the Vendor portal" (`EXPERIENCE.md:441`), explicitly
  excluding the two public surfaces. UJ-5's constraints require links to be revocable and to expire
  when the Wedding concludes or is abandoned (`prd.md:128`), and `EXPERIENCE.md:444` confirms
  "Public links the Wedding issued are dead" — but only from the Workspace side. Nothing says what a
  Guest sees when he opens a dead, revoked or rate-limited link. He has no account, no app and no
  route to ask. *Fix:* add Guest-page rows for expired/revoked link, rate-limited, and RSVP
  submission failure.

- **high** **Empty states are an acknowledged hole rather than a covered one.** Open Question 3
  names three; the IA implies more — Boards, the Enquiries tab, Guest list, Function detail with no
  Services, Vendor Listings, Real Weddings with none published, and the You surface all lack one.
  The document's own judgement applies: "an empty screen is the worst first impression a paid tool
  can give". *Fix:* at minimum specify the shared anatomy (see §3) and let per-surface copy stay
  open, so the shape is decided even where the words are not.

- **medium** **Permission-denied is covered for push only.** The push row is excellent
  (`EXPERIENCE.md:581`), but FR-11 names contacts as a guest-list import route ("taken from her
  contacts", `EXPERIENCE.md:598`) with no permission state, and portfolio upload / Board image save
  need camera and photo-library permission with none specified. *Fix:* add rows; the contacts one
  matters most because it is a named path in a decided section.

- **medium** **Focus has no State Patterns row.** It is asserted in the Accessibility Floor ("never
  removed and never signalled by a tint alone") and specified visually for `search-field` only.
  Vendor cards, chips, medallions, tab items and the compare tray have no focus treatment.
  *Fix:* one row stating the global focus treatment and its exceptions.

- **medium** **OTP limit states are named but not designed.** `EXPERIENCE.md:762` says "six digits,
  valid ten minutes, five attempts, three resends per hour — the screen must express those limits"
  and then does not say how. Code expired, attempts exhausted and resends exhausted are three
  distinct dead ends on the only auth surface in the product. *Fix:* add the three states.

- **medium** **The Vendor's own Grace Period state is missing.** The Family side of expiry is
  covered by "Listing leaves discovery"; the Vendor's thirty-day Grace Period with reminders at
  30/14/7/1 days appears only in Channels routing, with no portal state describing what he sees.
  Given that "the reminder **is** the renewal mechanism" (`EXPERIENCE.md:556`) this is the surface
  the business model runs on. *Fix:* add a Vendor-portal row for in-Grace and post-Grace.

- **low** **Real Weddings and Reels have no IA row and no route.** Both get major sections
  (`EXPERIENCE.md:220`, `:252`) and Real Weddings is said to "appear inside the app as inspiration",
  but neither appears in the Family app IA table and no surface links to them. *Fix:* add IA rows
  with a `Reached from` value, or state that placement is open.

---

## 5. Visual reference coverage — thin

Listed all 17 files in `.working/` (12 HTML, 5 extract Markdown) and grepped both spines for each.
`mockups/` and `wireframes/` do not exist, which is expected at this stage; `imports/` exists and is
empty.

Referenced (5 of 12 HTML): `type-finalists-stress.html`, `directions-4.html`, `color-themes-1.html`,
`direction-failure-3.html`, `direction-workspace-4.html`.

Orphans (7 of 12): `direction-home-screen.html`, `direction-vendor-4.html`,
`direction-vendor-desktop.html`, `direction-vendor-switch.html`, `direction-family-record-3.html`,
`type-devanagari-pairing.html`, `type-devanagari-pairing-2.html`.

Spines-win-on-conflict is stated once, at `EXPERIENCE.md:15–16`, and its wording ("either spine")
correctly covers both files. That requirement is met.

### Findings

- **high** The mocks behind the run's two largest decisions are never named. `.memlog.md:20` records
  `direction-home-screen.html` as the artifact that resolved the home-screen decision by looking —
  the decision that overrides FR-10 and FR-68 — and `EXPERIENCE.md:63` states that override without
  linking it. `.memlog.md:54` and `:56` record `direction-vendor-4.html` and
  `direction-vendor-desktop.html` as the four-landing-surface study and the ≥1024px rail study that
  produced the Enquiries-with-two-lenses decision; `EXPERIENCE.md:143–158` states that decision
  without linking either. A consumer questioning the override has no way back to the evidence.
  *Fix:* inline links at those two sections naming what each mock shows.

- **high** `direction-vendor-switch.html` (the Calendar/Inbox lens switch) and
  `direction-family-record-3.html` (the three moments at which the Family learns what a Vendor
  recorded, per `.memlog.md:76`) are the only renderings of two patterns the spines specify in prose
  and specify nowhere visually. Both are orphans. *Fix:* link them at
  `EXPERIENCE.md:145` and `:726` respectively.

- **medium** None of the five references that do exist is a composition reference. They are
  argumentative — "sizes lifted from", "renders every surface square", "does not, and would mislead
  anyone building from it" — which is better provenance than the examples show, but it means no
  section anywhere points a builder at what a screen looks like. The examples' pattern is
  `→ Composition reference: mockups/today-cold.html… Spine wins on conflict.` at the IA section;
  neither spine has an equivalent. *Fix:* add a composition-reference line to the Family app IA and
  Vendor portal IA sections naming the authoritative mock for each.

- **medium** `directions-4.html` is a set of directions, and nothing in either spine says which one
  was chosen or that it was. Combined with 12 unlabelled HTML files and nothing promoted to
  `mockups/`, a consumer opening `.working/` has no map. *Fix:* one line in `DESIGN.md` naming the
  chosen direction and its file, or promote it.

- **low** Path forms are inconsistent. `EXPERIENCE.md:666–667` names `directions-4.html`,
  `color-themes-1.html` and `direction-workspace-4.html` without the `.working/` prefix used
  everywhere else, and `EXPERIENCE.md:406` references `compare.html` with no path at all (it is the
  published site's file at repo root — verified present). *Fix:* use one prefix form throughout, and
  qualify `compare.html` as a repo-root file.

- **low** The two Devanagari pairing mocks are orphans even though the Typography section makes a
  substantive comparative argument (Inknut over Rozha One and Amita) that they are the evidence for.
  `.memlog.md:35` also records that `type-devanagari-pairing.html` **requires network** while every
  other artifact renders offline — worth carrying into the spine so a reader does not open it and
  see fallback faces. *Fix:* link both at `DESIGN.md:357` with the network caveat.

---

## 6. Bloat & overspecification — thin

### Findings

- **high** `DESIGN.md`'s Layout & Spacing section contradicts itself within eight lines. It declares
  "a plain 4px grid that the existing values round onto without visible change" and sets the scale
  at 4/8/12/16/24/32/48 (`DESIGN.md:392–398`), then immediately specifies "a 13px row gap and a 6px
  column gap… Vendor cards stack with an 11px gap. Section heads take 20px above and 11px below"
  (`DESIGN.md:405–406`). Three of those four values are off the grid it just declared, and none is a
  token. A consumer cannot tell whether to use `{spacing.3}` or 13px. *Fix:* either round them onto
  the scale — which the section claims is lossless — or drop the grid claim.

- **high** The same off-grid literals recur inside the `components` frontmatter, mixed into values
  that also use tokens: `invitation-card.padding: '{spacing.4} 15px 15px'`,
  `button-primary.padding: '{spacing.2} 14px'`, `chip.padding: '{spacing.1} 10px'`,
  `tab-bar.padding: '7px {spacing.1} 9px'` (`DESIGN.md:154`, `:172`, `:200`, `:225`). These are
  exactly the pixel specs a spacing scale exists to replace, and the half-tokenised form is worse
  than either pure alternative. *Fix:* tokenise, or state once that component padding is
  deliberately hand-tuned and off-scale.

- **high** `EXPERIENCE.md` carries editorial voice throughout, which the rubric reserves for
  `DESIGN.md`. Representative: "the highest-risk pattern in this document" (`:359`), "Confusing them
  is the most damaging mistake available on this surface" (`:709`), "a dashboard that only looks
  good stops being believed" (`:971`), and — self-congratulation rather than specification — "This
  document's *State Patterns* section is longer than the site's entire error vocabulary, and that
  ratio is the point" (`:876`). Some of this is genuinely load-bearing emphasis; the last is not.
  *Fix:* keep the emphasis that ranks risk, cut the commentary about the document itself.

- **medium** Each of the five Key Flows opens with a persona paragraph that restates `prd.md` §2.2
  near-verbatim. Flow 1's opener reproduces roughly fifty consecutive words from `prd.md:7`
  ("She is the one doing the running around, which today means calling Vendors one at a time to ask
  what is free on the 22nd, then the 27th, then the 4th…"). This is source restatement with a
  second place to edit if the PRD changes. *Fix:* cite the UJ for persona context and start each
  flow at step 1.

- **medium** "The Service Catalogue Is Configuration, Not Design" (`EXPERIENCE.md:637–670`) spends
  about thirty-five lines arguing whether *Invitations* and *Pandit / Priest* belong in the
  catalogue, and concludes — in its own Open Question 11 — that "it changes nothing in this document
  either way". The actionable content is the four-row rule table at the end. *Fix:* keep the table
  and the correction note about the six hardcoded medallions; move the catalogue argument to the
  memlog.

- **medium** "Roles and What Each May Do" (`EXPERIENCE.md:740`) is largely a restatement of FR-2,
  FR-4, FR-5 and FR-6 plus the §3 Glossary, and "Reviews and the Record Each Side Holds"
  (`:707`) restates FR-46/47/48 in a comparison table. Both contain real new decisions — role
  context being explicit on both surfaces; the "How she learns what a Vendor recorded" subsection —
  buried in the restatement. *Fix:* keep the decisions, cite the FRs for the rest.

- **medium** The Reels subsection (`EXPERIENCE.md:252–281`) is flagged "**NEW SCOPE.** Video appears
  **nowhere** in the PRD" and runs about thirty lines including a cost analysis. Recording it here
  is defensible; sizing it like a decided capability inside a contract downstream consumers build
  from is not, since §11 of the scope document puts it out of scope until a PRD change lands.
  *Fix:* compress to the decision and the owed PRD change, and move the cost analysis to the memlog
  until scope is amended.

- **low** `DESIGN.md`'s Open Questions 2, 5 and 6 duplicate `EXPERIENCE.md`'s Open Questions 1, 9
  and 3. Four facts, two places each to edit. *Fix:* keep each question in one spine and
  cross-reference from the other.

---

## 7. Inheritance discipline — adequate

Checked the §3 Glossary term-by-term against `EXPERIENCE.md`'s binding-vocabulary list; verified
every `AD-n` against the architecture spine's headings; verified every `FR-n` against the PRD's
headings; spot-checked six line-number citations against the actual lines; and cross-checked
component names across all sections of both files.

The Glossary reproduction is exact — all 42 terms, in source order, no synonyms, no omissions, no
additions. All 22 AD citations resolve to real ADs whose content matches the use made of them
(AD-32's see-and-correct-by-OTP and AD-33's grievance-with-a-reference both check out precisely).
All 40 FR citations resolve. All six line citations are accurate to the line. `EXPERIENCE.md`'s
`sources:` frontmatter lists three files, all present.

### Findings

- **high** The two spines contradict each other on whether a Save action exists. `DESIGN.md:484`
  sanctions Save as a primary-button label — "Labels are verbs the platform can honestly perform:
  **Enquire**, **Send**, **Shortlist**, **Compare**, **Save**" — while `EXPERIENCE.md:441` states
  "**No explicit save action exists anywhere in the Workspace** — every entry is preserved as it is
  made." A builder reading `DESIGN.md` ships a Save button into the surface that forbids it.
  *Fix:* remove Save from the sanctioned labels, or scope it explicitly to the Vendor portal.

- **high** The two spines contradict each other on the vendor portal above 768px. `DESIGN.md:415`
  specifies "widening to a two-column layout above 768px"; `EXPERIENCE.md:817` specifies a
  persistent left rail plus a main column plus "the rail's contents move to a right column" — three
  regions. `EXPERIENCE.md` compounds it by sourcing the breakpoint from `DESIGN.md`, so a consumer
  reads both and gets two answers. *Fix:* pick one and state it in `DESIGN.md`, with
  `EXPERIENCE.md` inheriting.

- **medium** Three UJ names are truncated in the Key Flow titles, in violation of verbatim
  inheritance: UJ-3 loses "and the reviews become worth reading", UJ-5 loses "and finds his own
  daughter's wedding", UJ-4 loses "opens a Service" (`EXPERIENCE.md:980`, `:1007`, `:1035`). In two
  of the three the dropped clause corresponds to a beat the flow also omits (see §1), so the
  truncation is not merely cosmetic. *Fix:* restore the full names.

- **medium** One component carries three names across the pair: `price-unestimated` (frontmatter),
  "**Not yet estimated**" (`DESIGN.md:518`), and `"not yet estimated"` (Component Patterns row).
  `EXPERIENCE.md` also references it as `{components.price-unestimated}` in one place and by prose
  name in three others. *Fix:* one name, used in all five places.

- **medium** `DESIGN.md` has no `sources:` frontmatter key. Its provenance — `styles.css`, the
  `.working/extract-*.md` files, the memlog, the published site — exists only in prose, so a
  consumer cannot mechanically determine what it inherits from. `EXPERIENCE.md` does this correctly.
  *Fix:* add `sources:` to `DESIGN.md`.

- **low** `banner-failure` exists in the frontmatter and is referenced from `EXPERIENCE.md`'s State
  Patterns, but has no entry in `DESIGN.md` ## Components — it is described instead inside the
  Colors section (`DESIGN.md:328–340`). A consumer reading ## Components as the component inventory
  will miss it. *Fix:* add a prose entry.

- **low** "Invitation card" (`DESIGN.md`) vs "Invitation card strip" (`EXPERIENCE.md`) is a small
  name drift on the product's signature object. *Fix:* pick one.

- **low** `EXPERIENCE.md` cites "AD Conventions §i18n" and "AD Conventions §Errors"
  (`:56`, `:352`). The rows exist and the content is accurate, but the section is titled
  "Consistency Conventions", not "AD Conventions". *Fix:* use the real section name.

- **low** `DESIGN.md:369–371` states "`apps/mobile/tailwind.config.js` already declares
  `Playfair Display` with **no font file behind it**". Verified: the config declares
  `fontFamily: { heading: [fonts.headingFamily] }` sourcing from `@vivahspot/shared/tokens`, where
  `fonts.headingFamily = 'Playfair Display'`, and `expo-font` is a dependency with no load call. The
  substance is correct; the sentence is one indirection off. *Fix:* say "via
  `packages/shared/src/tokens.js`".

---

## 8. Shape fit — strong

`DESIGN.md` sections run Brand & Style → Colors → Typography → Layout & Spacing → Elevation & Depth
→ Shapes → Components → Do's and Don'ts. Canonical order, no omissions, no reordering.

`EXPERIENCE.md` carries all eight required defaults — Foundation, Information Architecture, Voice
and Tone, Component Patterns, State Patterns, Interaction Primitives, Accessibility Floor, Key Flows
— plus both required-when-applicable sections: Responsive & Platform (five surfaces, two
breakpoints) and Inspiration & Anti-patterns (the memlog and the published site supply both lifts
and rejects). Nothing required is missing or dropped.

### Findings

- **low** Both files append an "Open Questions" section after the last canonical section. It is an
  invention but it earns its place — a downstream consumer needs to know what is undecided before
  building, and both lists are specific and tagged. Noted only so the deviation is deliberate rather
  than accidental. *Fix:* none.

- **low** `EXPERIENCE.md`'s nine invented sections mostly earn their place — Availability/Blocks,
  Money, Channels, Featured Band and Guest List each encode invariants that do not fit a default
  section and that a builder would otherwise get wrong. Two do not carry their length (see §6).
  *Fix:* covered under Bloat.

---

## Mechanical notes

**Frontmatter completeness.** `DESIGN.md` carries `name`, `description`, `status`, `updated`,
`colors` (18), `typography` (20), `rounded` (5), `spacing` (10), `components` (10). Missing:
`sources`, and an `elevation`/`shadows` group the components block already depends on (§2).
`EXPERIENCE.md` carries `name`, `description`, `status`, `updated`, `design`, `sources` (3, all
resolve). The `design: ./DESIGN.md` pointer resolves.

**Status and dates are stale.** Both files declare `status: draft` and `updated: 2026-09-06`.
`DESIGN.md` was last modified 2026-09-07 11:27 and `EXPERIENCE.md` 2026-09-07 12:20 — both a day
after the recorded date, and `EXPERIENCE.md` records decisions (the tab bar, the vendor lens switch)
made after `DESIGN.md`'s stated date. A consumer cannot tell from the frontmatter which spine is
newer. Bump both to 2026-09-07 and decide whether `draft` still applies to a document being handed
to architecture and story-dev.

**Cross-reference integrity.** No broken references found. All 22 `AD-n`, all 40 `FR-n`, all `NFR
5.x`, all 55 `{token}` references and all six line-number citations resolve. `compare.html` resolves
to the repo root. `fonts/playfair-display.woff2` exists at 38,404 bytes exactly as claimed.
`packages/shared/src/tokens.js` still carries the superseded rose-pink palette, which `DESIGN.md`
Open Question 5 correctly flags as an owed change rather than silently contradicting.

**Name inconsistencies (consolidated).** `price-unestimated` / "Not yet estimated" / "not yet
estimated"; "Invitation card" / "Invitation card strip"; "AD Conventions" / "Consistency
Conventions"; `.working/`-prefixed vs bare mock filenames. The tab-bar conflict recorded at
`EXPERIENCE.md:104` was resolved correctly — `DESIGN.md:510` now reads Home · Wedding · Shortlists ·
Enquiries · You, matching.

**No Mermaid diagrams are present in either spine**, so there is no diagram syntax to validate.

**Contrast arithmetic** was recomputed independently rather than taken on trust; all sixteen stated
ratios hold. The document's self-flagged discrepancies against the memlog (muted 4.76 vs 4.77,
vermillion 4.80 vs 4.81, turmeric 1.61 vs 2.0) resolve in favour of `DESIGN.md` in every case.

**Finding counts.** critical 4 · high 16 · medium 19 · low 12 — 51 total.
