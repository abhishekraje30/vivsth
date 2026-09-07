# Validation Report — vivahspot

- **DESIGN.md:** `_bmad-output/planning-artifacts/ux-designs/ux-vivahspot-2026-09-06/DESIGN.md`
- **EXPERIENCE.md:** `_bmad-output/planning-artifacts/ux-designs/ux-vivahspot-2026-09-06/EXPERIENCE.md`
- **Run at:** 2026-09-07T00:00:00Z

## Overall verdict

The reference layer of this pair is the strongest the rubric walker has seen in a spine: every one of
the 44 `{path.to.token}` references in `DESIGN.md` and all 11 in `EXPERIENCE.md` resolve, all 42
Glossary terms are reproduced verbatim from `prd.md` §3, all 22 `AD-n` and 40 `FR-n` citations point
at real sections, every line-number citation spot-checked (`prd.md:244`, `:414`, `:466`, `:476`,
`:1353`, `research-india-regulatory.md:207`) is accurate, and all sixteen stated contrast ratios
reproduce to within rounding when recomputed. What a downstream consumer still cannot do is build a
screen. Only three of roughly thirty named components carry both a visual spec and a behavioural one;
the Span continuation rail — which `EXPERIENCE.md` itself calls the highest-risk pattern in the
document — has no visual spec at all; there is no loading state anywhere in a product whose stated
target is a mid-range Android on patchy mobile data; and seven of the twelve working mocks, including
the two behind the largest decisions in the run, are never referenced. Treat this as a decision record
that is nearly finished and a build contract that is roughly half finished. The gaps are concentrated
and nameable, not diffuse.

The accessibility lens shifts that picture, and the shift is the finding. The rubric judged the
reference layer sound; the WCAG 2.1 AA audit judged the artifacts that implement it and returned a
**conditional fail**. Three things are true at once and they should not be collapsed. **The arithmetic
is sound** — nineteen asserted pairs recomputed from hex, sixteen correct, three wrong only by
rounding, and none of the three changes a pass/fail verdict; this document does not ask for a single
token to change value. **The written rules are unusually strong** — the colour-alone discipline, the
fence around `{colors.danger}`, the ban on lightening `{colors.muted}` by opacity, the mandatory
`n OF 5` label, the reduced-motion path that must leave meaning intact, the attribution discipline on
availability — better than most shipped design systems manage. And **the rendered artifacts break
those rules in four places, and the two highest-stakes surfaces have never been rendered at all.**
`{colors.muted}` and `{colors.vermillion}` appear as text on `{colors.gold-tint}` in three prototypes,
in the same week `DESIGN.md` banned it. The vendor calendar separates "Engaged" from "Enquiries
pending" by colour alone. Not one interactive element in any prototype reaches the product's own
44pt/48dp floor — the vendor calendar's day cells measure 27px. And the guest RSVP page, which
`EXPERIENCE.md` gives the highest floor and which more people will see than every other surface
combined, does not exist as an artifact: every claim about it is prose. The rubric found the reference
layer sound; the artifacts implementing it are not, and the two surfaces carrying the most regulatory
and human weight are undesigned or undersized. Gate outcome from the accessibility reviewer: **do not
pass**.

## Category verdicts

- Flow coverage — **adequate**
- Token completeness — **adequate**
- Component coverage — **thin**
- State coverage — **thin**
- Visual reference coverage — **thin**
- Bloat & overspecification — **thin**
- Inheritance discipline — **adequate**
- Shape fit — **strong**

Accessibility reviewer (WCAG 2.1 AA) — **conditional fail, do not pass**.

**Reconciled totals: 74 findings.** Rubric 51 (critical 4 · high 16 · medium 19 · low 12) plus
accessibility 23 (CRITICAL 4 · SERIOUS 7 · MODERATE 7 · MINOR 5). Consolidated by severity:
**critical 8 · high 23 · medium 26 · low 17**. The accessibility bands map SERIOUS→high,
MODERATE→medium, MINOR→low; every finding keeps its source id (C1–C4, S1–S7, M1–M7, m1–m5).

## Findings by severity

### Critical (8)

**[Flow coverage]** — FR-71 is cited nowhere, and the Vendor portal capability table asserts its opposite (§ `EXPERIENCE.md:161`, `prd.md:706`)
FR-71 ("What each Service is required to carry") is cited nowhere in `EXPERIENCE.md` and four of its
five required capabilities appear nowhere in either spine — grep for *named person*, *who will
actually shoot*, *additional payment*, *virtual tour* returns zero hits. Worse, the Vendor portal
capability table asserts the opposite of FR-71: "Listing completeness | FR-59, AD-27 | A four-item
publish gate… **The editor must show exactly these four**", while `prd.md:706` states these are
"**additional conditions of listing, on top of the general ones in FR-59**". A builder following the
spine ships a gate that lets a Photography Listing publish without naming who shoots and a Band Baaja
Baraat Listing publish without the no-demands declaration.
Fix: change "exactly these four" to "the four general conditions plus whatever the Service's own FR-71
configuration requires", and add a Listing-detail row for the per-Service required capability so it
has a rendering.

**[Component coverage]** — The Span continuation rail has no entry in `DESIGN.md` at all (§ `EXPERIENCE.md:359`, `:377`)
Not in the frontmatter, not in ## Components. `EXPERIENCE.md:359` heads its section "the highest-risk
pattern in this document" and requires the connector to "read with colour removed, because
`{colors.hairline}` is 1.23:1 and may never carry meaning" (`EXPERIENCE.md:377`) — but gives no stroke
weight, no colour token, no geometry, and no rule for how it crosses the gap between Function cards.
The document diagnoses the exact failure (`direction-workspace-4.html` "would mislead anyone building
from it") and then leaves the replacement unspecified. A builder ships hairline, and the
₹7,20,000-for-a-₹2,40,000-lawn error the section exists to prevent comes back as a rendering bug.
*Overlaps accessibility m4.*
Fix: add a `continuation-rail` component with a colour token that clears 3:1, a stroke width, and the
inter-card behaviour.

**[Component coverage]** — The Availability signal has three behavioural states and no visual spec (§ `EXPERIENCE.md:482`, `:485–489`)
"The capability that makes the product worth opening, and the one a builder is most likely to reduce
to a boolean". `EXPERIENCE.md:485–489` requires "a glyph **and** the word" for two states and
"**Nothing.** Not greyed, not 'unknown' styled as a failure" for the third, but no glyph is named, no
colour assigned, and no treatment given for the neutral third state. *Overlaps accessibility m4.*
Fix: add an `availability-signal` component with the three renderings, and name the glyphs.

**[State coverage]** — There is no cold-load or loading state anywhere in `EXPERIENCE.md` (§ `EXPERIENCE.md`, all 1110 lines; NFR 5.3)
Grep for *skeleton*, *loading*, *cold load*, *spinner*: zero hits across 1110 lines. Both reference
examples open their State Patterns with one. The document names its target as "a mid-range Android on
patchy mobile data" at least five times and hangs NFR 5.3 on it, then specifies nothing for the seconds
that condition actually produces. The nearest thing is the vendor-card placeholder gradient, which
covers one image, not a screen. Every surface will get whatever loading treatment its implementer
improvises.
Fix: add cold-load rows for Home, Service results, Listing detail, the Workspace and the Vendor
Enquiries landing, and say whether cached content renders first.

**[Accessibility C1]** — No interactive element in any prototype meets the product's own 44pt/48dp floor (§ `DESIGN.md:174`, `EXPERIENCE.md:791`)
Measured in Chromium at each prototype's natural width: vendor calendar day cell **35 × 27** (phone
lens) and **28 × 21** (desktop lens) at `direction-vendor-switch.html:112`; Family tab bar item
**67 × 35**; Vendor phone tab bar item **75 × 34** (`:128`); segmented lens switch segment
**90–145 × 35.6** (`:74`); primary button "Send a Quote" **122 × 33**; nudge buttons **88–122 × 35**;
vendor-card CTA "Enquire" **73 × 27** (`color-themes-1.html:95`); failure-banner "Retry" **34 × 20**;
left-rail nav row **199 × 38** (`:57`); "How results are ordered" link **310 × 43**. The category
medallion is the only measured target that passes. WCAG 2.1 AA does not itself mandate 44px — that is
2.5.5 at AAA, tightened to 24px at AA only in WCAG 2.2 — so this is not literally an AA failure. It is
a failure against the product's own binding floor, and a 27px calendar cell is a real-world failure for
the exact person the portal is designed for: Dattatray, one-handed, standing at someone else's
function. *Overlaps Bloat high (the same padding literals).*
Fix: set `min-height:44px` (48 on Android) on `button-primary`, `chip`, `tab`, the lens-switch segment,
every calendar cell and every retry. Where the visible box must stay small for density — the calendar
is the real case — keep the visual cell and expand the hit area with padding or an `::after` overlay,
rather than shrinking the control to fit the grid.

**[Accessibility C2]** — The guest RSVP page has never been rendered (§ `EXPERIENCE.md:204–210`, `:775`, `:796`)
`grep -ic rsvp .working/*.html` returns **0 across all twelve files**. There is no guest artifact of
any kind. This is the surface `EXPERIENCE.md:796` gives the highest floor — "the guest pages carry the
highest floor and the least chrome … keyboard-operable, readable at 200% zoom" — and the one
`EXPERIENCE.md:775` singles out because "many who reach it were forwarded the link and none of them
chose to be there at all." It is also the highest-volume surface in the product: hundreds of guests per
wedding, against one family and one vendor. Every requirement in `EXPERIENCE.md:204–210` is therefore
unverified prose: the reply control visible without scrolling at 360×640; three answers, each a
full-width target, each labelled in words; nothing preselected; confirmation in place, no redirect; the
growth line below the answer, never above it; no app shell. The composition question is not rhetorical.
At 360×640, after the browser chrome, a finished invitation card and a line of attribution, three
answers at 48dp with 8dp gaps need **≥168dp** of what remains. Whether the card can be both beautiful
and that compact is exactly the trade `EXPERIENCE.md:204` says must resolve in the reply's favour — and
it has not been tested once. *Overlaps State coverage high.*
Fix: build the artifact at 360×640 before this gate closes. Measure the fold. If the card does not fit
above it, shrink the card, as the spine already instructs.

**[Accessibility C3]** — `{colors.muted}` and `{colors.vermillion}` are rendered as text on `{colors.gold-tint}`, which both documents forbid (§ `DESIGN.md:316`, `:530`; three prototypes)
`DESIGN.md:316`: "{colors.muted} on it is only 4.14:1 and {colors.vermillion} on it only 4.06:1 —
**neither is permitted as text on this fill.**" Recomputed: **4.138** and **4.061**. The rule is right.
It is broken six times in three prototypes: Function card date chip "Nov" (muted, 4.14, **9.6px**,
`direction-workspace-4.html`); "Morning · 150 guests" (muted, 4.14, 11.2px, same file); "There is no
dispute process…" (muted, 4.14, 12.3px, `direction-family-record-3.html`); ghost button "Add my account
first" (vermillion, 4.06, 12.3px, same file); ghost button "Edit the quote" (vermillion, 4.06, 12.5px,
`direction-failure-3.html` T3); "Photo didn't load — tap to retry" (muted, 4.14, 12.0px, same file).
The third is the worst: `EXPERIENCE.md:734` makes the point that the absence of an appeal process must
be "stated, not hidden" — "saying it plainly is kinder than letting her hunt for a complaint button
that does not exist." That sentence is currently rendered below the legibility floor. The first is the
second worst: a date, at 9.6px, at 4.14:1.
Fix: on `{colors.gold-tint}`, `{colors.ink}` only — 15.41:1, and it is already the specified label
colour for that fill. For a ghost button that must sit on the tint, use an ink label with a vermillion
rule; better, move the button off the tint entirely.

**[Accessibility C4]** — The vendor calendar separates "Engaged" from "Enquiries pending" by colour alone (§ `direction-vendor-switch.html:111–115`, `direction-vendor-4.html`)
`.eng` and `.ask` are both bold, both a bare day number, with no glyph, letter or shape between them.
Only `.blk` earns a second signal (a strike-through). The legend below is three 10×10 colour swatches
beside three words — a colour key restates the colour, it does not replace it. This is SC 1.4.1 and
NFR 5.8. Note what it is *not*: the two states stay 30.8–47.4 apart in CIEDE2000 under both
dichromacies, so this is not a colour-blindness failure. It fails for the ordinary reason — a bleached
phone screen in daylight at an outdoor function, which is where this screen is actually read. The
`.ask` cell's turmeric border, the only thing separating it from a plain day, computes **1.18:1**
against the surface. It contributes nothing.
Fix: put a mark inside the cell: a filled dot for engaged, a hollow ring for pending, keep the strike
for blocked. Keep the colour — it is what makes the month scannable. Rewrite the legend to show the
mark as well as the swatch.

### High (23)

**[Flow coverage]** — UJ-5's resolution beat has no step; the only designed growth loop has no designed transition (§ `prd.md:118`, `EXPERIENCE.md:1007`)
`prd.md:118` makes it explicit — "He taps the quiet line, and starts a Wedding of his own… **This is
the only growth channel designed into the product**" — but Flow 4 ends at Rutuja's count moving, and the
growth line is specified only as "one quiet growth line at the foot", with its wording still open
(Open Question 2).
Fix: add a step 7 to Flow 4 covering what happens when the growth line is tapped — where it lands, and
whether it carries anything from the invitation he just answered.

**[Flow coverage]** — FR-31 ("Seeing where the year is empty") is uncovered anywhere (§ `EXPERIENCE.md:145`)
The Vendor portal restructure demoted Calendar from a destination to a lens of Enquiries, and FR-31's
capability — which Slots are empty, which are drawing no interest, feeding FR-30 seasonal pricing —
was not re-homed into any of the four surviving destinations. Grep for *drawing no interest*,
*calendar's health*, *where the year is empty* returns zero.
Fix: place it in Performance or in the Calendar lens explicitly, and say which.

**[Token completeness]** — `elevation-1/2/3` are used as component values but no `elevation` group exists in the frontmatter (§ `DESIGN.md:155`, `:187`, `:219`; prose at `:426–433`)
`invitation-card.shadow: elevation-2`, `vendor-card.shadow: elevation-1`,
`category-medallion.shadow: elevation-1` resolve only by a human reading the prose. A machine extractor
mirroring the frontmatter into `tokens.js` gets the literal string `elevation-2`. This is the one place
the spec's own resolver contract breaks.
Fix: add an `elevation` (or `shadows`) frontmatter group with the three CSS values already written in
prose, and change the component entries to `{elevation.2}` style references.

**[Token completeness]** — `fontFamily: system-sans` is not a resolvable font family; nine typography roles carry an unusable value (§ `DESIGN.md:65, :70, :80, :90, :95, :100, :111, :121, :127`; stack at `:374`)
The actual stack lives only in prose at `DESIGN.md:374`. Nine of the twenty typography tokens — every
functional role, including body, price, button, meta and tab — therefore carry an unusable
`fontFamily`.
Fix: either put the literal stack in the frontmatter, or use the spec's `note:` convention for platform
inheritance as `design-example-mobile.md` does.

**[Component coverage]** — The Featured band has no visual spec, and its per-card chip collides with the filter `chip` (§ `DESIGN.md:498`, `EXPERIENCE.md:697`)
`DESIGN.md:498` defines `chip` as the *filter* chip — gold-tint fill, turmeric border, vermillion when
selected. A `Featured` chip built from that component reads as a selected filter. Given that
`EXPERIENCE.md:697` records this band as live CCPA exposure and that its three non-colour signals are
what carry FR-20, the one component the disclosure rests on should not be borrowed. *Overlaps
accessibility M6.*
Fix: add a distinct `chip-featured` (or `badge-paid`) component, and a `featured-band` container spec.

**[Component coverage]** — The Function card — the Workspace's primary object — has no visual spec (§ `EXPERIENCE.md:395`)
It carries three row states each requiring "a glyph **and** a word", and hosts the Span rail. Nothing
in `DESIGN.md` describes it.
Fix: add it to ## Components with its row states.

**[State coverage]** — No search-empty / no-results state (§ `EXPERIENCE.md`, Home + Service results)
Grep for *no results*, *no matches*, *nothing matched*: zero hits. Home carries a search field and
Service results carry per-Service filters; the combination that returns nothing is unspecified. This is
distinct from "Empty Shortlist", which is covered.
Fix: add a row for Service results with zero matches and one for search with zero matches, and say
whether filters are offered back.

**[State coverage]** — The Guest pages have no failure, offline or dead-link state (§ `EXPERIENCE.md:441`, `:444`; `prd.md:128`)
The Offline row scopes itself to "Everywhere in the Family app and the Vendor portal", explicitly
excluding the two public surfaces. UJ-5's constraints require links to be revocable and to expire when
the Wedding concludes or is abandoned, and `EXPERIENCE.md:444` confirms "Public links the Wedding
issued are dead" — but only from the Workspace side. Nothing says what a Guest sees when he opens a
dead, revoked or rate-limited link. He has no account, no app and no route to ask. *Overlaps
accessibility C2 and M7 — the same surface, which does not exist as an artifact at all.*
Fix: add Guest-page rows for expired/revoked link, rate-limited, and RSVP submission failure.

**[State coverage]** — Empty states are an acknowledged hole rather than a covered one (§ `EXPERIENCE.md` Open Question 3)
Open Question 3 names three; the IA implies more — Boards, the Enquiries tab, Guest list, Function
detail with no Services, Vendor Listings, Real Weddings with none published, and the You surface all
lack one. The document's own judgement applies: "an empty screen is the worst first impression a paid
tool can give".
Fix: at minimum specify the shared anatomy (see Component coverage), and let per-surface copy stay open,
so the shape is decided even where the words are not.

**[Visual reference coverage]** — The mocks behind the run's two largest decisions are never named (§ `.memlog.md:20`, `:54`, `:56`; `EXPERIENCE.md:63`, `:143–158`)
`.memlog.md:20` records `direction-home-screen.html` as the artifact that resolved the home-screen
decision by looking — the decision that overrides FR-10 and FR-68 — and `EXPERIENCE.md:63` states that
override without linking it. `.memlog.md:54` and `:56` record `direction-vendor-4.html` and
`direction-vendor-desktop.html` as the four-landing-surface study and the ≥1024px rail study that
produced the Enquiries-with-two-lenses decision; `EXPERIENCE.md:143–158` states that decision without
linking either. A consumer questioning the override has no way back to the evidence.
Fix: inline links at those two sections naming what each mock shows.

**[Visual reference coverage]** — The only renderings of two prose-only patterns are both orphans (§ `EXPERIENCE.md:145`, `:726`; `.memlog.md:76`)
`direction-vendor-switch.html` (the Calendar/Inbox lens switch) and `direction-family-record-3.html`
(the three moments at which the Family learns what a Vendor recorded) are the only renderings of two
patterns the spines specify in prose and specify nowhere visually. Both are orphans. *These are also
the two files carrying the heaviest accessibility defect load — C1, C3, C4, M5, M7 all land here.*
Fix: link them at `EXPERIENCE.md:145` and `:726` respectively.

**[Bloat & overspecification]** — `DESIGN.md`'s Layout & Spacing section contradicts itself within eight lines (§ `DESIGN.md:392–398`, `:405–406`)
It declares "a plain 4px grid that the existing values round onto without visible change" and sets the
scale at 4/8/12/16/24/32/48, then immediately specifies "a 13px row gap and a 6px column gap… Vendor
cards stack with an 11px gap. Section heads take 20px above and 11px below". Three of those four values
are off the grid it just declared, and none is a token. A consumer cannot tell whether to use
`{spacing.3}` or 13px.
Fix: either round them onto the scale — which the section claims is lossless — or drop the grid claim.

**[Bloat & overspecification]** — The same off-grid literals recur inside the `components` frontmatter, half-tokenised (§ `DESIGN.md:154`, `:172`, `:200`, `:225`)
`invitation-card.padding: '{spacing.4} 15px 15px'`, `button-primary.padding: '{spacing.2} 14px'`,
`chip.padding: '{spacing.1} 10px'`, `tab-bar.padding: '7px {spacing.1} 9px'`. These are exactly the
pixel specs a spacing scale exists to replace, and the half-tokenised form is worse than either pure
alternative. *Overlaps accessibility C1, which measures what those literals produce: a 122×33 primary
button and a 67×35 tab item against a 44px floor.*
Fix: tokenise, or state once that component padding is deliberately hand-tuned and off-scale.

**[Bloat & overspecification]** — `EXPERIENCE.md` carries editorial voice throughout, which the rubric reserves for `DESIGN.md` (§ `EXPERIENCE.md:359`, `:709`, `:971`, `:876`)
Representative: "the highest-risk pattern in this document" (`:359`), "Confusing them is the most
damaging mistake available on this surface" (`:709`), "a dashboard that only looks good stops being
believed" (`:971`), and — self-congratulation rather than specification — "This document's *State
Patterns* section is longer than the site's entire error vocabulary, and that ratio is the point"
(`:876`). Some of this is genuinely load-bearing emphasis; the last is not.
Fix: keep the emphasis that ranks risk, cut the commentary about the document itself.

**[Inheritance discipline]** — The two spines contradict each other on whether a Save action exists (§ `DESIGN.md:484`, `EXPERIENCE.md:441`)
`DESIGN.md:484` sanctions Save as a primary-button label — "Labels are verbs the platform can honestly
perform: **Enquire**, **Send**, **Shortlist**, **Compare**, **Save**" — while `EXPERIENCE.md:441` states
"**No explicit save action exists anywhere in the Workspace** — every entry is preserved as it is made."
A builder reading `DESIGN.md` ships a Save button into the surface that forbids it.
Fix: remove Save from the sanctioned labels, or scope it explicitly to the Vendor portal.

**[Inheritance discipline]** — The two spines contradict each other on the vendor portal above 768px (§ `DESIGN.md:415`, `EXPERIENCE.md:817`)
`DESIGN.md:415` specifies "widening to a two-column layout above 768px"; `EXPERIENCE.md:817` specifies a
persistent left rail plus a main column plus "the rail's contents move to a right column" — three
regions. `EXPERIENCE.md` compounds it by sourcing the breakpoint from `DESIGN.md`, so a consumer reads
both and gets two answers. *Overlaps accessibility M7, which adds the third answer: no `@media` rule
exists in either vendor prototype, so neither behaviour is implemented.*
Fix: pick one and state it in `DESIGN.md`, with `EXPERIENCE.md` inheriting.

**[Accessibility S1]** — The active tab is colour plus weight; the specified filled icon never renders (§ `DESIGN.md:231`, `:512`; `direction-vendor-4.html:60`, `direction-vendor-switch.html:131`)
`DESIGN.md:231` specifies `active-indicator: 'filled icon + weight, never colour alone'`, and
`DESIGN.md:512` calls it "three signals, because one of them is colour." What every prototype actually
renders is two: `.tab.on{color:var(--vermillion);font-weight:600}`. The `<i class="ic">` glyph is
identical at rest and active in all three tab bars — the glyphs differ *per tab* but there is no
filled/outline swap on activation. So the active state rests on vermillion-vs-muted plus 400→600 at
**9.4–9.8px**, where a two-step weight change is close to sub-perceptual. Under protanopia vermillion
and muted collapse to CIEDE2000 **8.92**, from 24.03.
Fix: ship the filled/outline icon pair the spec already names — it is the cheapest of the three signals
and the only one that survives both small type and protanopia. An indicator rule above the active tab
would also do it.

**[Accessibility S2]** — The two warm reds collapse under protanopia, and destructive confirmation is where it bites (§ `DESIGN.md:337`, `EXPERIENCE.md:444`, `:445`)
Viénot simulation: vermillion `#E01B33` → `#565635`, danger `#8C2F1A` → `#42421B`. CIEDE2000 falls from
**16.92 to 7.14** — a 58% loss. Deuteranopia is unaffected (16.38). `direction-failure-3.html`'s own
verdict text predicted this ("a red-blind eye sees two dark warm blocks"), and the decision was taken
anyway with the mitigation written into the spine. **The mitigation holds almost everywhere** — both
files require a glyph, a sentence naming what happened and a sentence naming what happens next with
every failure; the banner keeps an 8.07:1 danger border against the page even though its tint drops to
ΔE 3.98 under deuteranopia. A protanope who cannot tell the two reds apart still reads the words. That
is the right design and it should be kept. **One place it breaks.** `EXPERIENCE.md:445` extends
`{colors.danger}` to destructive confirmation — "removing a Service that carries an Agreement,
discarding a Candidate Block, taking a Listing down." Nothing in either document forbids a danger-filled
confirm button sitting beside a vermillion-filled primary. To a protanope those are two near-identical
dark olive blocks, and the only remaining separator is the button text — on the one class of
interaction in the product that cannot be undone.
Fix: add a line to `DESIGN.md` Don'ts: a `{colors.danger}` fill and a `{colors.vermillion}` fill never
appear as adjacent sibling actions. In a destructive confirmation the safe action is a text or ghost
button, never a second filled one. This costs nothing and closes the only gap the two-red decision
actually opened.

**[Accessibility S3]** — Every turmeric and hairline boundary fails SC 1.4.11 (§ `DESIGN.md:319`, `:503`)
Recomputed: turmeric on surface **1.608**, on ground **1.567**; gold-tint fill vs ground **1.152**;
hairline on surface **1.267**, on ground **1.234**. All below the 3:1 required for "visual information
required to identify user interface components and states." `DESIGN.md:319` states the principle
exactly right — hairline "is a boundary, never a state and never a divider carrying meaning; anything a
person must perceive needs 3:1 and therefore needs a different device." The document then uses hairline
as the **sole** boundary of the search field (`DESIGN.md:503`), the vendor card, list rows and the tab
bar's top rule, and turmeric as the sole boundary of the chip and the celebration button. The **filter
chip** — gold-tint fill inside a turmeric border — has no perceivable silhouette at all; its label
floats on the page, and a user cannot see that it is a control, only that some words are there. The
**lens switch**'s 1px turmeric frame is invisible, so the unselected segment ("Inbox", muted on white)
reads as a line of text rather than the other half of a control. The **search field**'s hairline outline
at 1.27:1 gives a text input no visible edge. *Overlaps Component coverage medium.*
Fix: any element whose *shape* must be identified — chip, switch segment, search field, text input —
needs either a ≥3:1 boundary or an internal fill reaching 3:1 against its ground. `{colors.muted}` at
4.77:1 on ground is an available hairline substitute for exactly those elements. Leave hairline where it
separates decorative surfaces; it is doing its job there.

**[Accessibility S4]** — The `n OF 5` label is missing from the only Workspace prototype (§ `DESIGN.md:479`, `EXPERIENCE.md:397`, `direction-workspace-4.html`)
`grep -c "OF 5"` returns **0** for `direction-workspace-4.html`, against 5 for `color-themes-1.html` and
2 for `directions-4.html`. Both spines make the label mandatory, for the correct reason: the turmeric
fill against the gold-tint track computes **1.360:1** and cannot carry the state alone. The prototype a
builder will copy the Workspace from is the one that drops it.
Fix: add the label to the artifact, and make it structurally non-optional in the component contract —
the bar and the label are one component, not a component and a decoration.

**[Accessibility S5]** — The failure retry is a 34×20 unstyled span identified only by its position (§ `DESIGN.md:243`, `EXPERIENCE.md:439`, `direction-failure-3.html`)
In all three treatments the markup is
`<div class="off"><span><b>No connection.</b> Showing what was loaded.</span><span>Retry</span></div>`.
"Retry" has the same colour, the same size and the same weight as the sentence beside it, with no
border, underline, fill or spacing that marks it as a control. It is identified by right-alignment and
nothing else — a control conveyed by position. In the chosen T2 treatment it is white text on the danger
fill at 8.28:1, which makes it perfectly legible *as part of the sentence*. `DESIGN.md:243` already
specifies the right thing — `retry: 'button-primary with {colors.danger} background'`. The prototype
never renders it, and this is the failure surface, where `EXPERIENCE.md:439` says the band must be
persistent precisely so someone can act on it.
Fix: render the retry as the specified button at 44px with an accessible name. Apply the same check to
the other retry affordance in the same file — "Photo didn't load — tap to retry" is a 78px-tall dashed
box whose tappability is carried entirely by the word "tap".

**[Accessibility S6]** — Inknut Antiqua at weight 300, 0.84rem, is not defensible for Vendor Rules on the target device (§ `type-finalists-stress.html:66,85`; `DESIGN.md:76`, `:363`, `:366`; `EXPERIENCE.md:403`)
0.84rem is **13.44 CSS px**. Three things stack badly. (1) Inknut Antiqua is a **modulated** Devanagari
serif — real thick/thin stroke contrast — and weight 300 is its Light; on a mid-range Android at density
1.75–2.0, 13.44 CSS px puts the thin strokes at roughly one device pixel, where they alias or drop out
entirely. (2) Devanagari carries meaning **above and below** the shirorekha — i-kar and u-kar hooks,
anusvara, chandrabindu, the conjunct stack — which sit at a fraction of the em and degrade before the
base letterforms do; Indic typography conventionally needs ~1.15–1.3× the Latin optical size for
equivalent legibility, and here it is set *smaller* than the Latin body (0.86rem) and *lighter* than
everything else in the ramp. (3) The Rules are load-bearing: `DESIGN.md:363` calls them "text a family
must read correctly before enquiring," and `EXPERIENCE.md:403` puts them on the Listing itself precisely
so she reads them once, properly. `DESIGN.md:363` rejects Amita *because* its strokes make "a wall of
Rules … real work at 0.84rem" — the identical objection applies to Inknut Light, and it was not applied.
*Overlaps Visual reference coverage low.*
Fix: set `body-long-devanagari` to weight **400** at **≥0.94rem (15px)**, line-height 1.9. Keep 300 for
short decorative runs only. Re-test on a real device once the face is installed — `DESIGN.md:366`
records that Inknut is specified but has no font file in the repo, so nothing in this ramp has yet been
seen in its intended face.

**[Accessibility S7]** — No `lang` on Devanagari runs — SC 3.1.2 Language of Parts, Level AA (§ `EXPERIENCE.md:53`; all twelve prototypes; NFR 5.8)
Every prototype is `<html lang="en">` and there is no other `lang` attribute in any of the twelve files.
Devanagari user content sits inside an English document with nothing marking it. SC 3.1.2 is Level AA and
it applies here: `EXPERIENCE.md:53` establishes that Devanagari appears as user content — a Vendor's
Rules, a Listing description, a Family's review, a Function she named, the couple's names — inside an
interface that is English throughout. That is textbook Language of Parts. Without the attribute, TalkBack
and VoiceOver read Devanagari with an English voice, which produces noise rather than words.
`EXPERIENCE.md:53` also decides that content is shown "never asked to declare a language," and that
decision is right — it is the whole point of not making the Family do the platform's work. But detecting
the **script** is not asking her to declare a language: the Unicode block is right there in the string.
Fix: derive `lang` from the script at render time (Devanagari → `mr` where the Place is Marathi-primary,
else `hi`) and set it on the run, not the page. If that is refused, record it as a documented AA
exception — but note that NFR 5.8 as written does not permit one.

### Medium (26)

**[Flow coverage]** — UJ-4's path step 5 (Kiran configuring a new Service) has no step in Flow 5 (§ `prd.md:92`, `EXPERIENCE.md` Flow 5)
Taxonomy, filters, comparison attributes, Sizing Attribute, Order Basis, Engagement Model, pricing model
have no step, and the flow title drops "opens a Service" from the UJ name. The omission is probably
correct (Admin is Frappe Desk, AD-2) but it is silent rather than stated, so a reader cannot tell whether
it was decided or forgotten.
Fix: one line in Flow 5 saying the Service configuration act happens in Desk and lands on no designed
surface.

**[Token completeness]** — The vendor card's rating chip has no text colour or contrast target over its scrim (§ `DESIGN.md:493`)
The chip sits on a `rgba(0,0,0,0.6)` scrim over an arbitrary Vendor photograph, and no text colour or
contrast target is stated for it. This is a load-bearing combination — a rating is exactly the kind of
thing a Family reads — over the one background in the system whose luminance is unknown. *Overlaps
accessibility m5, which measured it safe: white on the scrim gives 6.61:1 over `placeholder-start` and
7.79:1 over `placeholder-end`. The documentation gap stands; the risk does not.*
Fix: name the label colour and state the floor the scrim is sized to hold.

**[Token completeness]** — No contrast target is stated for the focus ring against anything but white (§ `DESIGN.md:213`; `EXPERIENCE.md` Accessibility Floor)
It is specified as `2px solid {colors.vermillion}, offset 2px` on `search-field` and generalised in the
Accessibility Floor, but a vermillion ring around a `{colors.gold-tint}` chip computes 4.06:1 for text and
is untested as a 3:1 non-text indicator. *Overlaps accessibility m4, which answers it: the ring clears
3:1 on ground (4.68), surface (4.80), gold-tint (4.06) and danger-tint (3.91). It has never been drawn.*
Fix: state the ring's non-text contrast floor and name the one fill it may not sit on.

**[Component coverage]** — Four `DESIGN.md` components have no Component Patterns row; search is the consequential one (§ `EXPERIENCE.md:71`)
`button-primary`, `button-celebration`, `chip` and `search-field` have no row. Search is the most
consequential: it is a top-level element of Home and realises FR-18, yet no spine says what it searches
over, whether it is scoped to a Service, what happens on submit, or what it does with no matches.
*Overlaps accessibility S3 (search field and chip have no perceivable boundary) and M6 (the chip's
selected-state check glyph has never been drawn).*
Fix: add Component Patterns rows for all four; the search one is not optional.

**[Component coverage]** — The empty-state anatomy is explicitly salvaged but has no component in either spine (§ `EXPERIENCE.md:838`)
"Circular icon → heading → one sentence → one button, capped and centred… Keep it; rewrite every string",
and Open Question 3 leaves empty states open. A named, adopted pattern with no specification will be
reinvented per screen.
Fix: promote it to a component in both files even while the individual strings stay open.

**[Component coverage]** — The vendor portal's lens switch and left rail appear in neither Component Patterns nor `DESIGN.md` (§ `EXPERIENCE.md:150`)
Both are load-bearing structural components — the lens switch is what makes Enquiries "one surface rather
than two".
Fix: add both.

**[State coverage]** — Permission-denied is covered for push only (§ `EXPERIENCE.md:581`, `:598`)
The push row is excellent, but FR-11 names contacts as a guest-list import route ("taken from her
contacts") with no permission state, and portfolio upload / Board image save need camera and
photo-library permission with none specified.
Fix: add rows; the contacts one matters most because it is a named path in a decided section.

**[State coverage]** — Focus has no State Patterns row (§ `EXPERIENCE.md` Accessibility Floor; `DESIGN.md:213`)
It is asserted in the Accessibility Floor ("never removed and never signalled by a tint alone") and
specified visually for `search-field` only. Vendor cards, chips, medallions, tab items and the compare
tray have no focus treatment. *Overlaps accessibility m4: no `:focus` or `:focus-visible` rule exists in
any of the twelve prototypes either.*
Fix: one row stating the global focus treatment and its exceptions.

**[State coverage]** — OTP limit states are named but not designed (§ `EXPERIENCE.md:762`)
"Six digits, valid ten minutes, five attempts, three resends per hour — the screen must express those
limits" and then does not say how. Code expired, attempts exhausted and resends exhausted are three
distinct dead ends on the only auth surface in the product.
Fix: add the three states.

**[State coverage]** — The Vendor's own Grace Period state is missing (§ `EXPERIENCE.md:556`)
The Family side of expiry is covered by "Listing leaves discovery"; the Vendor's thirty-day Grace Period
with reminders at 30/14/7/1 days appears only in Channels routing, with no portal state describing what
he sees. Given that "the reminder **is** the renewal mechanism" this is the surface the business model
runs on.
Fix: add a Vendor-portal row for in-Grace and post-Grace.

**[Visual reference coverage]** — None of the five references that do exist is a composition reference (§ `EXPERIENCE.md` Family app IA, Vendor portal IA)
They are argumentative — "sizes lifted from", "renders every surface square", "does not, and would
mislead anyone building from it" — which is better provenance than the examples show, but it means no
section anywhere points a builder at what a screen looks like. The examples' pattern is
`→ Composition reference: mockups/today-cold.html… Spine wins on conflict.` at the IA section; neither
spine has an equivalent.
Fix: add a composition-reference line to the Family app IA and Vendor portal IA sections naming the
authoritative mock for each.

**[Visual reference coverage]** — Nothing says which of `directions-4.html`'s directions was chosen, or that one was (§ `.working/directions-4.html`)
Combined with 12 unlabelled HTML files and nothing promoted to `mockups/`, a consumer opening `.working/`
has no map.
Fix: one line in `DESIGN.md` naming the chosen direction and its file, or promote it.

**[Bloat & overspecification]** — Each of the five Key Flows opens with a persona paragraph restating `prd.md` §2.2 near-verbatim (§ `prd.md:7`, `EXPERIENCE.md` Flow 1)
Flow 1's opener reproduces roughly fifty consecutive words from `prd.md:7` ("She is the one doing the
running around, which today means calling Vendors one at a time to ask what is free on the 22nd, then the
27th, then the 4th…"). This is source restatement with a second place to edit if the PRD changes.
Fix: cite the UJ for persona context and start each flow at step 1.

**[Bloat & overspecification]** — "The Service Catalogue Is Configuration, Not Design" argues thirty-five lines to no effect (§ `EXPERIENCE.md:637–670`)
It spends about thirty-five lines arguing whether *Invitations* and *Pandit / Priest* belong in the
catalogue, and concludes — in its own Open Question 11 — that "it changes nothing in this document either
way". The actionable content is the four-row rule table at the end.
Fix: keep the table and the correction note about the six hardcoded medallions; move the catalogue
argument to the memlog.

**[Bloat & overspecification]** — "Roles and What Each May Do" and "Reviews and the Record Each Side Holds" bury decisions inside restatement (§ `EXPERIENCE.md:740`, `:707`)
The first is largely a restatement of FR-2, FR-4, FR-5 and FR-6 plus the §3 Glossary; the second restates
FR-46/47/48 in a comparison table. Both contain real new decisions — role context being explicit on both
surfaces; the "How she learns what a Vendor recorded" subsection — buried in the restatement.
Fix: keep the decisions, cite the FRs for the rest.

**[Bloat & overspecification]** — The Reels subsection is sized like a decided capability while being out of scope (§ `EXPERIENCE.md:252–281`)
Flagged "**NEW SCOPE.** Video appears **nowhere** in the PRD" and runs about thirty lines including a cost
analysis. Recording it here is defensible; sizing it like a decided capability inside a contract
downstream consumers build from is not, since §11 of the scope document puts it out of scope until a PRD
change lands.
Fix: compress to the decision and the owed PRD change, and move the cost analysis to the memlog until
scope is amended.

**[Inheritance discipline]** — Three UJ names are truncated in the Key Flow titles, violating verbatim inheritance (§ `EXPERIENCE.md:980`, `:1007`, `:1035`)
UJ-3 loses "and the reviews become worth reading", UJ-5 loses "and finds his own daughter's wedding",
UJ-4 loses "opens a Service". In two of the three the dropped clause corresponds to a beat the flow also
omits, so the truncation is not merely cosmetic.
Fix: restore the full names.

**[Inheritance discipline]** — One component carries three names across the pair (§ `DESIGN.md` frontmatter and `:518`; `EXPERIENCE.md` Component Patterns)
`price-unestimated` (frontmatter), "**Not yet estimated**" (`DESIGN.md:518`), and `"not yet estimated"`
(Component Patterns row). `EXPERIENCE.md` also references it as `{components.price-unestimated}` in one
place and by prose name in three others.
Fix: one name, used in all five places.

**[Inheritance discipline]** — `DESIGN.md` has no `sources:` frontmatter key (§ `DESIGN.md` frontmatter)
Its provenance — `styles.css`, the `.working/extract-*.md` files, the memlog, the published site — exists
only in prose, so a consumer cannot mechanically determine what it inherits from. `EXPERIENCE.md` does
this correctly.
Fix: add `sources:` to `DESIGN.md`.

**[Accessibility M1]** — Two animations use properties the design's own Don'ts ban (§ `DESIGN.md:270`, `:533`; `color-themes-1.html:77`, `directions-4.html:122`, `:203`)
`DESIGN.md:270` asserts "every one of them is transform and opacity only." `DESIGN.md:533` bans animating
"`width`, `height`, `top`, `background-position`". Both are violated:
`@keyframes foil{0%,55%{background-position:170% 0}92%,100%{background-position:-70% 0}}` and
`@keyframes fill{0%,10%{width:60%}42%,88%{width:100%}100%{width:100%}}`. The foil sweep is the brand's
signature moment and the fill is a progress meter. Both force repaint per frame on the class of device
NFR 5.3 targets.
Fix: express the foil as a `translateX` on an absolutely positioned overlay. Express the meter as
`scaleX` with `transform-origin:left`. Both are direct substitutions.

**[Accessibility M2]** — Reduced-motion is handled well, with one artifact left behind (§ `color-themes-1.html:97–100`, `directions-4.html:205–210`)
Credit first, because this was done properly. Both files carrying animation ship a
`prefers-reduced-motion` block, and every one restores the meaning rather than just stopping the movement
— the gold rule appears settled, one message resolves rather than both, the meter shows its value. That is
exactly the "leaves the meaning intact" the spine asks for, and it is rarer than it should be. The gap:
with `animation:none`, the `.foil` overlay keeps rendering at its default `background-position`, leaving a
permanent diagonal gold band frozen across the invitation card. Contrast survives — ink over the foil tint
stays above 14:1 — so nothing becomes unreadable, but it is a visible defect on the identity object.
Fix: `@media (prefers-reduced-motion:reduce){.inv .foil{display:none}}`.

**[Accessibility M3]** — `opacity:.75` on the unsettled invitation line is still live in the chosen theme (§ `color-themes-1.html:65`, `directions-4.html:110`; `DESIGN.md:528`, `EXPERIENCE.md:397`)
`.inv .ln.todo{color:var(--soft);opacity:.75}` measures **3.04:1** in the Kumkum & Turmeric theme (T3, the
chosen one). `directions-4.html:110` does it differently and worse: `.ln.todo{color:#BBAE9C}` at
**2.18:1**. Both spines name this as the back-door lightening that breaks the contrast lock. The rule was
written; the artifacts were never corrected, and the two of them now disagree with the spine and with each
other. The next person who copies a mock copies the defect.
Fix: correct both artifacts to `{colors.muted}` at full strength, or mark them superseded in the file
itself so the rule travels with the code someone will lift.

**[Accessibility M4]** — The first-run empty card's `— & —` has no specified colour, and the only rendering is 1.87:1 (§ `directions-4.html`, `DESIGN.md:479`)
`directions-4.html` renders the placeholder dashes at `#C8BCA9` on white — **1.87:1**. `DESIGN.md:479`
specifies the empty card ("First run is the same card, empty, with `—  &  —` and `0 OF 5`") but assigns no
token to the dashes. Those dashes are the "nothing here yet" signal on the very first screen a new user
sees, and the only rendering that exists is nearly invisible.
Fix: name the token. `{colors.muted}` at full strength (4.89:1 on surface) is the obvious answer and
matches the rule already governing every other open fact on the card.

**[Accessibility M5]** — Unread Enquiries are marked by a left rail and position, with no word or glyph (§ `direction-vendor-switch.html:88`, `direction-vendor-4.html:153`, `EXPERIENCE.md:156`)
`.enq.unread{border-left:3px solid var(--vermillion)}`. In the markup the three unread cards sit above an
eyebrow reading "In progress 4", with **no heading of their own**. So the state is carried by a colour rail
plus position in the list. The rail itself is fine at 4.80:1; the issue is SC 1.4.1.
`direction-vendor-4.html:153` gets this right — it puts an eyebrow "Needs a reply 3" above the group — so
the fix already exists in a sibling artifact. This matters commercially as well as legally:
`EXPERIENCE.md:156` makes reply speed the one vendor behaviour that moves ranking, and a state whose only
marker is a colour bar is a state that gets missed.
Fix: carry the vendor-4 eyebrow into the switch layout, or add a per-card word.

**[Accessibility M6]** — The Featured band and the filter chip — the two components the spines call most important — are never prototyped (§ `EXPERIENCE.md:689`, `:700`, `:701`; `DESIGN.md:500`; `direction-home-screen.html:179`)
Neither exists in any artifact. **Featured band:** no file renders the disclosed paid-placement band.
`direction-home-screen.html:179` has a "Featured near you" row heading, but that is the old site's browse
rail — the exact anti-pattern `EXPERIENCE.md:700` warns about ("'Featured' is the euphemism FR-20 was
written against"). `EXPERIENCE.md:689` calls the band's three non-colour signals — bounded container,
heading, per-card chip — "the most essential thing on the screen to get right," with CCPA exposure attached
at `:701`. **Filter chip:** the `class="chip"` matches in `directions-4.html` and
`type-finalists-stress.html` are theme colour swatches and Devanagari specimens, not the component.
`DESIGN.md:500` marks the selected state `[ASSUMPTION]` — including the leading check glyph that is the
whole reason selection is not carried by colour alone. That glyph has never been drawn. *Overlaps
Component coverage high (Featured band) and medium (chip).*
Fix: render both before the gate closes. The Featured band in particular is the one component where
getting the non-colour marking wrong has a consequence outside the product.

**[Accessibility M7]** — Reflow and 200% zoom are asserted, and fail in the only artifacts that exist (§ `direction-vendor-switch.html`; `EXPERIENCE.md:786`, `:798`, `:815`)
Measured in Chromium. **At a 320 CSS px viewport (SC 1.4.10):** the desktop lens keeps
`width:200px;flex:none` on the left rail and `width:282px;flex:none` on the right rail, and there is **no
`@media` rule anywhere in either vendor prototype**. `.win{overflow:hidden}` then *clips* the 482px of
fixed columns rather than scrolling them — content becomes unreachable, which is worse than the horizontal
scroll 1.4.10 forbids. **At a 32px root, i.e. 200% text (SC 1.4.4):** `document.scrollWidth` grows to
**397px in a 320px viewport**; the lens switch alone measures 333px. `.pscr{height:648px;overflow:hidden}`
clips the phone content, tab bar included. These are presentation frames rather than product code, and
should be weighted accordingly. But `EXPERIENCE.md:815` asserts a ≥768px two-column behaviour that no
artifact implements, and `EXPERIENCE.md:786` asserts "nothing truncates at the largest setting" against
artifacts that all truncate. Two AA criteria are claimed and nothing demonstrates either. *Overlaps
Inheritance discipline high — the spines already disagree on what that ≥768px behaviour is.*
Fix: add the breakpoint, make both rails shrinkable, and test the vendor portal at 320px and at 200%. The
guest page needs the same test (`EXPERIENCE.md:798` claims "readable at 200% zoom") and does not yet exist
to test.

### Low (17)

**[Flow coverage]** — Flows are not in UJ order (§ `EXPERIENCE.md:1007`, `:1035`)
Flow 4 is UJ-5 and Flow 5 is UJ-4. Harmless but it costs a reader a double-take on every cross-reference.
Fix: reorder or renumber to match.

**[Token completeness]** — Six colour tokens are defined but never referenced by any component entry (§ `DESIGN.md` frontmatter `colors`)
`on-turmeric`, `foil`, `shadow-tint`, `medallion-start/end`, `placeholder-start/end` reach components only
through literal gradient strings rather than references. Consistent, but it means the components block is
not a complete projection of the palette.
Fix: none required; noted so a token-diffing tool is not surprised.

**[State coverage]** — Real Weddings and Reels have no IA row and no route (§ `EXPERIENCE.md:220`, `:252`)
Both get major sections and Real Weddings is said to "appear inside the app as inspiration", but neither
appears in the Family app IA table and no surface links to them.
Fix: add IA rows with a `Reached from` value, or state that placement is open.

**[Visual reference coverage]** — Path forms are inconsistent (§ `EXPERIENCE.md:666–667`, `:406`)
`EXPERIENCE.md:666–667` names `directions-4.html`, `color-themes-1.html` and `direction-workspace-4.html`
without the `.working/` prefix used everywhere else, and `EXPERIENCE.md:406` references `compare.html` with
no path at all (it is the published site's file at repo root — verified present).
Fix: use one prefix form throughout, and qualify `compare.html` as a repo-root file.

**[Visual reference coverage]** — The two Devanagari pairing mocks are orphans, and one requires network (§ `DESIGN.md:357`, `.memlog.md:35`)
The Typography section makes a substantive comparative argument (Inknut over Rozha One and Amita) that they
are the evidence for. `.memlog.md:35` also records that `type-devanagari-pairing.html` **requires network**
while every other artifact renders offline — worth carrying into the spine so a reader does not open it and
see fallback faces. *Overlaps accessibility S6, which attacks the same argument's conclusion.*
Fix: link both at `DESIGN.md:357` with the network caveat.

**[Bloat & overspecification]** — Three Open Questions are duplicated across both spines (§ `DESIGN.md` OQ 2, 5, 6; `EXPERIENCE.md` OQ 1, 9, 3)
Four facts, two places each to edit.
Fix: keep each question in one spine and cross-reference from the other.

**[Inheritance discipline]** — `banner-failure` has no entry in `DESIGN.md` ## Components (§ `DESIGN.md:328–340`)
It exists in the frontmatter and is referenced from `EXPERIENCE.md`'s State Patterns, but is described
instead inside the Colors section. A consumer reading ## Components as the component inventory will miss it.
Fix: add a prose entry.

**[Inheritance discipline]** — "Invitation card" vs "Invitation card strip" (§ `DESIGN.md` vs `EXPERIENCE.md`)
A small name drift on the product's signature object.
Fix: pick one.

**[Inheritance discipline]** — `EXPERIENCE.md` cites a section name that does not exist (§ `EXPERIENCE.md:56`, `:352`)
It cites "AD Conventions §i18n" and "AD Conventions §Errors". The rows exist and the content is accurate,
but the section is titled "Consistency Conventions".
Fix: use the real section name.

**[Inheritance discipline]** — The Playfair Display claim is one indirection off (§ `DESIGN.md:369–371`)
It states "`apps/mobile/tailwind.config.js` already declares `Playfair Display` with **no font file behind
it**". Verified: the config declares `fontFamily: { heading: [fonts.headingFamily] }` sourcing from
`@vivahspot/shared/tokens`, where `fonts.headingFamily = 'Playfair Display'`, and `expo-font` is a
dependency with no load call. The substance is correct; the sentence is one indirection off.
Fix: say "via `packages/shared/src/tokens.js`".

**[Shape fit]** — Both files append an "Open Questions" section after the last canonical section (§ `DESIGN.md`, `EXPERIENCE.md` — final section)
It is an invention but it earns its place — a downstream consumer needs to know what is undecided before
building, and both lists are specific and tagged. Noted only so the deviation is deliberate rather than
accidental.
Fix: none.

**[Shape fit]** — `EXPERIENCE.md`'s nine invented sections mostly earn their place (§ `EXPERIENCE.md` — invented sections)
Availability/Blocks, Money, Channels, Featured Band and Guest List each encode invariants that do not fit a
default section and that a builder would otherwise get wrong. Two do not carry their length.
Fix: covered under Bloat & overspecification.

**[Accessibility m1]** — The type ramp bottoms out below any defensible floor (§ `DESIGN.md:128`)
`typography.tab` is **0.61rem = 9.76px**; prototypes render 9.44–9.8px. Above it: `progress-label` 0.68rem
(10.88px), `chip` 0.7rem (11.2px), `eyebrow` 0.72rem (11.52px), `meta` 0.74rem (11.84px), `button` 0.78rem
(12.48px). WCAG sets no absolute minimum, so this is judgement, not a criterion. The judgement: iOS HIG sets
tab labels at 10pt and Material sets bottom-nav labels at 12sp. 9.44px is roughly **7pt**. This product's
stated audience explicitly includes older relatives — Vasant kaka is a named persona — and a wedding is a
context of divided attention.
Fix: suggested floor 11px (0.7rem) for any label, 12px for anything read as a sentence. Raising `tab` to
0.7rem costs horizontal room; the five-tab bar can afford it by shortening "Shortlists" or dropping to four
destinations.

**[Accessibility m2]** — muted on hairline, 3.86:1 (§ `direction-vendor-switch.html:114`)
`.cal .days b.blk{background:var(--hairline);color:var(--muted)}` — the "you marked unavailable" day
number. **3.862:1**, never claimed by either document.
Fix: `{colors.ink}` on hairline is 14.38:1. Keep the strike-through, which is the state's real signal.

**[Accessibility m3]** — muted on danger-tint, 3.99:1 — a trap, not yet a defect (§ `DESIGN.md` Don'ts table; `{typography.meta}`)
**3.985:1.** Not currently rendered, because the failure banner puts its body in ink (14.84:1). But the
banner is a tinted surface and `{typography.meta}` is muted by default, so the first timestamp, helper line
or "2 minutes ago" added to a banner will fail silently.
Fix: add the pair to the `DESIGN.md` Don'ts row alongside the gold-tint pairs, before someone adds the line.

**[Accessibility m4]** — Focus and screen-reader behaviour are asserted and demonstrated nowhere (§ `EXPERIENCE.md:781–798`, `DESIGN.md:505`; all twelve prototypes)
No `:focus` or `:focus-visible` rule exists in any of the twelve prototypes. Separately, all twelve files
contain **zero** `<button>`, zero `<a href>`, zero `role=` and zero `aria-` — every button, tab, chip,
calendar cell and switch segment is a `<div>` or `<span>`. For static mocks that is defensible. What it means
for this gate is that every claim in `EXPERIENCE.md:781–798` — TalkBack labelling with role and state, the
availability signal announcing its attribution, the invitation card announcing "3 of 5 settled", the
continuation rail being announced and not only drawn, keyboard operability, focus order following reading
order, skip links — rests on prose alone. Not one has an artifact behind it. The good news: the *specified*
focus ring is sound. Vermillion clears 3:1 against ground (4.68), surface (4.80), gold-tint (4.06) and
danger-tint (3.91), so `DESIGN.md:505` works wherever the ring lands. It has simply never been drawn.
*Overlaps Token completeness medium, State coverage medium, and both Component coverage criticals — the Span
continuation rail and the Availability signal are two of the unbacked claims.*
Fix: render focus in at least one prototype, and treat the screen-reader claims as untested until something
exercises them.

**[Accessibility m5]** — Verified sound, recorded so it is not re-opened (§ `DESIGN.md:493`, `:326`; `direction-failure-3.html` T2)
The rating chip's `rgba(0,0,0,0.6)` scrim gives white **6.61:1** over `placeholder-start` and **7.79:1** over
`placeholder-end` — the worst point of the gradient clears AA comfortably. Both warm gradients carry
`{colors.ink}` at 10.68–14.97:1 at every stop, so `DESIGN.md:326`'s "never sit behind text" is a stylistic
fence, not a contrast requirement. The chosen failure treatment (T2) is contrast-clean throughout: glyph
8.28:1, title 6.74:1, body 14.84:1, retry fill 8.28:1, ghost 6.74:1. `{colors.danger}` clears 3:1 as a
border against both its tint (6.74) and the page ground (8.07), so the banner stays findable even when its
tint drops to ΔE 3.98 under deuteranopia. *This answers Token completeness medium on the rating-chip scrim.*
Fix: none — recorded so the decisions are not re-litigated.

## Contrast verification (accessibility reviewer)

Every pair either document asserts, recomputed from hex per WCAG 2.1 by script, not by eye. "Computed" is
to three decimals so the rounding can be checked.

| Pair | Claimed | Computed | Floor | Result | Verdict on the claim |
|---|---|---|---|---|---|
| ink `#2B0A0E` on ground `#FFFCF2` | 17.75 | **17.752** | 4.5 | pass | correct |
| ink on surface `#FFFFFF` | 18.22 | **18.222** | 4.5 | pass | correct |
| muted `#8C6A50` on ground | 4.76 | **4.766** | 4.5 | pass | **WRONG** — rounds to 4.77, not 4.76 |
| muted on ground (alt figure, same line) | 4.77 | **4.766** | 4.5 | pass | correct |
| muted on surface | 4.89 | **4.892** | 4.5 | pass | correct |
| white on vermillion `#E01B33` | 4.80 | **4.801** | 4.5 | pass | correct |
| white on vermillion (memlog figure) | 4.81 | **4.801** | 4.5 | pass | **WRONG** — off by −0.01 |
| white on turmeric `#FFC300` | 1.61 | **1.608** | 4.5 | **fail (intended)** | correct |
| white on turmeric (memlog figure) | 2.0 | **1.608** | 4.5 | **fail (intended)** | **WRONG** — off by −0.39, a 24% error |
| ink on turmeric | 11.33 | **11.330** | 4.5 | pass | correct |
| ink on gold-tint `#FFEBB0` | 15.41 | **15.412** | 4.5 | pass | correct |
| muted on gold-tint | 4.14 | **4.138** | 4.5 | **fail (intended)** | correct |
| vermillion on gold-tint | 4.06 | **4.061** | 4.5 | **fail (intended)** | correct |
| vermillion on turmeric | 2.99 | **2.985** | 4.5 | **fail (intended)** | correct |
| turmeric on gold-tint (progress fill on track) | 1.36 | **1.360** | 3.0 | **fail (intended)** | correct |
| white on danger `#8C2F1A` | 8.3 | **8.279** | 4.5 | pass | correct |
| danger on ground | 8.1 | **8.065** | 4.5 | pass | correct |
| danger on danger-tint `#F7E4DE` | 6.7 | **6.744** | 4.5 | pass | correct |
| hairline `#F6E2C2` on ground | 1.23 | **1.234** | 3.0 | **fail (intended)** | correct |
| muted at `opacity:.75` on surface | 3.04 | **3.040** | 4.5 | **fail (the point)** | correct |

Three claimed figures are wrong. All three are rounding, all three understate or overstate by an amount
that changes nothing. `DESIGN.md:299` prints 4.76 and 4.77 side by side and calls the gap "rounding" — it is
not two computations, it is one wrong rounding of 4.766; use **4.77**. The memlog's 2.0 for
white-on-turmeric is the only figure that is materially wrong (the true value is 1.61), and `DESIGN.md:313`
already notes that "either figure fails badly", so no decision rides on it. The 4.81 for
white-on-vermillion matters more than its size suggests: that pair sits **0.30 above the floor**, the
thinnest margin in the palette, so it should be recorded at its true 4.80 and treated as untouchable.

### Pairs the prototypes render that neither document claims

| Pair | Computed | Floor | Result | Where |
|---|---|---|---|---|
| muted on hairline (calendar "unavailable" day number) | **3.862** | 4.5 | **FAIL** | `direction-vendor-switch.html` `.cal .days b.blk` |
| muted on danger-tint | **3.985** | 4.5 | **FAIL** | not yet rendered — a trap, see m3 |
| vermillion on ground (links on the page canvas) | **4.677** | 4.5 | pass, thin | throughout |
| vermillion on surface / white | **4.801** | 4.5 | pass | throughout |
| muted at `opacity:.75` on **ground** | **2.996** | 4.5 | **FAIL** | worse than the surface case already flagged |
| ink on medallion-start `#FFE49C` | **14.603** | 4.5 | pass | gradient stop |
| ink on medallion-end `#FFB3AE` | **10.682** | 4.5 | pass | gradient stop |
| ink on placeholder-start `#FFE7A8` | **14.966** | 4.5 | pass | gradient stop |
| ink on placeholder-end `#FFBDB6` | **11.459** | 4.5 | pass | gradient stop |
| ink on foil `#FFEB96` | **15.250** | 4.5 | pass | foil overlay |
| ink on danger-tint | **14.844** | 4.5 | pass | failure banner body |
| ink on hairline | **14.383** | 4.5 | pass | — |
| white on `rgba(0,0,0,.6)` over placeholder-start | **6.610** | 4.5 | pass | rating chip, worst gradient stop |
| white on `rgba(0,0,0,.6)` over placeholder-end | **7.792** | 4.5 | pass | rating chip |

### Non-text contrast (SC 1.4.11, 3:1) — boundaries and states

| Element boundary | Computed | Result |
|---|---|---|
| turmeric border on surface — chip, nudge, lens switch, invitation card | **1.608** | **FAIL** |
| turmeric border on ground | **1.567** | **FAIL** |
| gold-tint chip fill vs ground — the chip's silhouette | **1.152** | **FAIL** |
| gold-tint chip fill vs surface | **1.182** | **FAIL** |
| hairline border on surface — card, list row, tab-bar top rule | **1.267** | **FAIL** |
| hairline border on ground | **1.234** | **FAIL** |
| turmeric progress fill vs gold-tint track | **1.360** | **FAIL** (already known) |
| calendar `.ask` gold-tint cell vs surface | **1.182** | **FAIL** |
| calendar `.blk` hairline cell vs surface | **1.267** | **FAIL** |
| calendar `.eng` vermillion cell vs surface | **4.801** | pass |
| danger border on danger-tint | **6.744** | pass |
| danger border on ground | **8.065** | pass |
| vermillion unread rail on surface | **4.801** | pass |
| vermillion focus ring on ground | **4.677** | pass |
| vermillion focus ring on gold-tint | **4.061** | pass |
| vermillion focus ring on danger-tint | **3.911** | pass |

The specified focus ring clears 3:1 against every surface it can land on. That is the one part of the
non-text story that is fully sound.

### Dichromacy separation (CIEDE2000, Viénot simulation)

| Pair | Normal | Protanopia | Deuteranopia |
|---|---|---|---|
| vermillion vs danger — action red vs failure red | 16.92 | **7.14** | 16.38 |
| vermillion vs muted — active tab vs resting tab | 24.03 | **8.92** | 11.87 |
| danger vs muted | 19.29 | 15.96 | 13.39 |
| danger-tint vs ground — failure banner vs page | 9.30 | **4.64** | **3.98** |
| calendar: engaged (vermillion) vs pending (gold-tint) | 51.30 | 47.44 | 30.79 |
| calendar: pending (gold-tint) vs blocked (hairline) | **7.28** | 6.72 | 6.35 |
| gold-tint vs ground | 14.72 | 15.09 | 15.41 |

Protanopia turns vermillion `#E01B33` into `#565635` and danger `#8C2F1A` into `#42421B` — two dark olives
7.1 apart, down from 16.9. See S2. Deuteranopia leaves the two reds separable. The calendar's two live
states stay far apart under both, so C4 is a plain 1.4.1 failure rather than a colour-vision one — but
pending vs blocked is only 7.3 apart **for everyone**, which is why the strike-through on blocked is
load-bearing.

## Where the two lenses overlap

Thirteen findings pair across the two reviews. This is signal, not duplication: the rubric walker read the
spines and the accessibility reviewer measured the artifacts, so a paired finding is one object failing at
both altitudes at once. Fix the pair together, or the fix lands on one half.

1. **Span continuation rail** — Component coverage *critical* (no `DESIGN.md` entry at all; the connector
   must read with colour removed and no stroke, token or geometry is given) × accessibility m4 (the rail
   "being announced and not only drawn" rests on prose; no artifact exercises it).
2. **Availability signal** — Component coverage *critical* (three behavioural states, no visual spec, no
   glyphs named) × accessibility m4 and the verdict preamble, which praises "the attribution discipline on
   availability" as a written rule while noting nothing renders it.
3. **Featured band** — Component coverage *high* (no visual spec; its chip collides with the filter `chip`;
   live CCPA exposure) × accessibility M6 (never prototyped; the only "Featured" in any artifact is the old
   site's browse rail, the exact anti-pattern FR-20 was written against).
4. **Filter chip** — Component coverage *medium* (no Component Patterns row) × accessibility S3 (gold-tint
   fill 1.15:1 inside a turmeric border 1.57:1 — no perceivable silhouette) and M6 (the `[ASSUMPTION]` check
   glyph has never been drawn).
5. **Search field** — Component coverage *medium* (no behavioural spec: what it searches, scope, submit) and
   State coverage *high* (no zero-results state) × accessibility S3 (hairline outline at 1.27:1 gives a text
   input no visible edge).
6. **Focus** — Token completeness *medium* (no non-text contrast target stated off white) and State coverage
   *medium* (no State Patterns row) × accessibility m4, which *answers* the rubric: the ring clears 3:1 on
   ground, surface, gold-tint and danger-tint — but exists in no prototype.
7. **Rating-chip scrim** — Token completeness *medium* (no label colour or contrast floor stated over an
   unknown photograph) × accessibility m5, which measures it safe at both gradient stops (6.61 / 7.79). The
   documentation gap stands; the risk it flagged does not exist.
8. **The contrast arithmetic itself** — Token completeness recomputed sixteen stated ratios and found every
   figure holds × accessibility recomputed nineteen and found three wrong by rounding, none changing a
   verdict, with the memlog's 2.0 for white-on-turmeric the only materially wrong figure (true 1.61). Two
   independent computations agreeing is the strongest evidence in this gate.
9. **Off-grid component padding** — Bloat *high* (`'7px {spacing.1} 9px'`, `'{spacing.2} 14px'`,
   `'{spacing.1} 10px'` are half-tokenised and off the declared 4px grid) × accessibility C1, which measures
   what those literals produce: a 122×33 primary button and a 67×35 tab item against a 44px floor.
10. **Vendor portal above 768px** — Inheritance discipline *high* (`DESIGN.md` says two columns,
    `EXPERIENCE.md` says three regions) × accessibility M7 (no `@media` rule exists in either vendor
    prototype, and at 320px `overflow:hidden` clips 482px of fixed rails). Three answers, none implemented.
11. **Guest pages** — State coverage *high* (no failure, offline or dead-link state; the Offline row
    explicitly excludes the public surfaces) × accessibility C2 and M7 (the RSVP page has never been
    rendered; the 200% zoom claim has nothing to test against). One lens says the states are unspecified,
    the other says the surface does not exist.
12. **The orphan vendor and workspace mocks** — Visual reference coverage *high* ×2
    (`direction-vendor-4.html`, `direction-vendor-desktop.html`, `direction-vendor-switch.html`,
    `direction-family-record-3.html` are the evidence for the largest decisions and are never referenced) ×
    accessibility C1, C3, C4, M5, S4, M7, which are all located in those same files. The rubric says a
    builder cannot find them; the audit says if he does, he copies six defects.
13. **Devanagari / Inknut** — Visual reference coverage *low* (the two pairing mocks that evidence the
    Inknut-over-Amita argument are orphans, and one requires network) × accessibility S6 (the objection that
    rejected Amita applies verbatim to Inknut Light at 0.84rem and was not applied) and S7 (no `lang` on any
    Devanagari run). The rubric says the evidence is not linked; the audit says the evidence does not support
    the conclusion.

## Mechanical notes

- **Reconciled totals.** 74 findings: rubric 51 (critical 4 · high 16 · medium 19 · low 12) plus
  accessibility 23 (CRITICAL 4 · SERIOUS 7 · MODERATE 7 · MINOR 5). Consolidated: critical 8, high 23,
  medium 26, low 17.
- **Frontmatter completeness.** `DESIGN.md` carries `name`, `description`, `status`, `updated`, `colors`
  (18), `typography` (20), `rounded` (5), `spacing` (10), `components` (10). Missing: `sources`, and an
  `elevation`/`shadows` group the components block already depends on. `EXPERIENCE.md` carries `name`,
  `description`, `status`, `updated`, `design`, `sources` (3, all resolve). The `design: ./DESIGN.md`
  pointer resolves.
- **Status and dates are stale.** Both files declare `status: draft` and `updated: 2026-09-06`. `DESIGN.md`
  was last modified 2026-09-07 11:27 and `EXPERIENCE.md` 2026-09-07 12:20 — both a day after the recorded
  date, and `EXPERIENCE.md` records decisions (the tab bar, the vendor lens switch) made after `DESIGN.md`'s
  stated date. A consumer cannot tell from the frontmatter which spine is newer. Bump both to 2026-09-07 and
  decide whether `draft` still applies to a document being handed to architecture and story-dev.
- **Cross-reference integrity.** No broken references found. All 22 `AD-n`, all 40 `FR-n`, all `NFR 5.x`,
  all 55 `{token}` references and all six line-number citations resolve. `compare.html` resolves to the repo
  root. `fonts/playfair-display.woff2` exists at 38,404 bytes exactly as claimed.
  `packages/shared/src/tokens.js` still carries the superseded rose-pink palette, which `DESIGN.md` Open
  Question 5 correctly flags as an owed change rather than silently contradicting.
- **Name inconsistencies (consolidated).** `price-unestimated` / "Not yet estimated" / "not yet estimated";
  "Invitation card" / "Invitation card strip"; "AD Conventions" / "Consistency Conventions"; `.working/`-
  prefixed vs bare mock filenames. The tab-bar conflict recorded at `EXPERIENCE.md:104` was resolved
  correctly — `DESIGN.md:510` now reads Home · Wedding · Shortlists · Enquiries · You, matching.
- **No Mermaid diagrams are present in either spine**, so there is no diagram syntax to validate.
- **What would clear the accessibility gate**, in order of user impact: (1) build the guest RSVP artifact at
  360×640 and measure the fold (C2); (2) raise every touch target to 44/48, starting with the vendor
  calendar (C1); (3) add a non-colour mark to the calendar's engaged and pending states (C4); (4) move the
  six gold-tint text instances to `{colors.ink}` (C3); (5) ship the filled/outline tab icon (S1), add the
  adjacent-fills rule for destructive confirmation (S2), give chips, the lens switch and the search field a
  ≥3:1 boundary (S3); (6) restore the `n OF 5` label to the Workspace mock (S4) and render the retry as the
  specified button (S5); (7) raise `body-long-devanagari` to 400 / ≥0.94rem and re-test on a device once the
  face is installed (S6), decide `lang` on Devanagari runs (S7). Nothing on this list requires changing a
  palette value. The palette was computed correctly.

## Reviewer files

- `review-rubric.md` — eight-category rubric walk, 51 findings
- `review-accessibility.md` — WCAG 2.1 AA audit, 23 findings, verdict: conditional fail / do not pass
