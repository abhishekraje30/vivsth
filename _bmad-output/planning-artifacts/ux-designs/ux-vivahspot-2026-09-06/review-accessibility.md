# Accessibility review — WCAG 2.1 AA

Reviewer: accessibility lens, BMad UX validation gate.
Reviewed: `DESIGN.md`, `EXPERIENCE.md`, and all twelve `.working/*.html` prototypes.
Method: every contrast figure recomputed from hex per WCAG 2.1 (sRGB linearisation,
L = 0.2126R + 0.7152G + 0.0722B, ratio = (L1+0.05)/(L2+0.05)) by script, not by eye. Rendered
geometry and effective backgrounds measured in Chromium via Playwright against the prototypes
served over HTTP at their natural widths, and again at a 320 CSS px viewport and a 32px root.
Dichromacy simulated with the Viénot–Brettel–Mollon linear-RGB transform, separation scored in
CIEDE2000.
Date: 2026-09-07.

---

## Verdict

**Conditional fail.** Three things are true at once and they should not be collapsed.

**The arithmetic is sound.** Nineteen asserted contrast pairs were recomputed from the hex values.
Sixteen are correct. Three are wrong, all by rounding, and **none of the three changes a pass/fail
verdict** — the palette's contrast decisions are all correctly decided even where the figure printed
beside them is off in the second decimal place. The contrast-locked `{colors.muted}` genuinely
clears 4.5:1 on both grounds; white genuinely fails on turmeric; the danger token genuinely clears
everything it is used against. This document does not ask for a single token to change value.

**The written rules are unusually strong.** The colour-alone discipline, the fence around
`{colors.danger}`, the ban on lightening `{colors.muted}` by opacity, the requirement that the
progress bar always carry its `n OF 5` label, the reduced-motion path that must leave meaning
intact, the attribution discipline on availability — these are better than most shipped design
systems manage, and several of them were clearly written *because* someone did the arithmetic first.

**The rendered artifacts break those rules in four places, and the two highest-stakes surfaces have
never been rendered at all.** `{colors.muted}` and `{colors.vermillion}` appear as text on
`{colors.gold-tint}` in three prototypes, in the same week `DESIGN.md` banned it. The vendor
calendar separates "Engaged" from "Enquiries pending" by colour alone. Not one interactive element
in any prototype reaches the product's own 44pt/48dp floor — the vendor calendar's day cells measure
27px. And the guest RSVP page, which `EXPERIENCE.md` gives the highest floor and which more people
will see than every other surface combined, does not exist as an artifact: every claim about it is
prose.

Gate outcome: **do not pass**. The blocking items are C1–C4 and S1–S7 below. The palette itself is
not the problem; the problem is that the artifacts a builder will copy contradict the spine that
governs them, and that the two surfaces carrying the most regulatory and human weight (guest RSVP,
Featured band) are undesigned.

---

## Contrast verification table

Every pair either document asserts, recomputed from hex. "Computed" is to three decimals so the
rounding can be checked.

### Claimed pairs

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

Three claimed figures are wrong. All three are rounding, all three understate or overstate by an
amount that changes nothing. `DESIGN.md:299` prints 4.76 and 4.77 side by side and calls the gap
"rounding" — it is not two computations, it is one wrong rounding of 4.766; use **4.77**. The
memlog's 2.0 for white-on-turmeric is the only figure that is materially wrong (the true value is
1.61), and `DESIGN.md:313` already notes that "either figure fails badly", so no decision rides on
it. The 4.81 for white-on-vermillion matters more than its size suggests: that pair sits **0.30
above the floor**, the thinnest margin in the palette, so it should be recorded at its true 4.80 and
treated as untouchable.

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

The scrim value `DESIGN.md:493` specifies is safe at both ends of the gradient — recorded so nobody
re-opens it. Both warm gradients also carry ink comfortably at both stops, so `DESIGN.md:326`'s
"never sit behind text" is a stylistic fence, not a contrast necessity.

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

The specified focus ring clears 3:1 against every surface it can land on. That is the one part of
the non-text story that is fully sound.

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

Protanopia turns vermillion `#E01B33` into `#565635` and danger `#8C2F1A` into `#42421B` — two dark
olives 7.1 apart, down from 16.9. See S2. Deuteranopia leaves the two reds separable. The calendar's
two live states stay far apart under both, so C4 is a plain 1.4.1 failure rather than a colour-vision
one — but pending vs blocked is only 7.3 apart **for everyone**, which is why the strike-through on
blocked is load-bearing.

---

## Findings

Severity is user impact, not effort.

### CRITICAL

#### C1 · No interactive element in any prototype meets the product's own 44pt/48dp floor

`DESIGN.md:174` declares `button-primary.min-target: 44px`. `EXPERIENCE.md:791` declares
"Tap targets ≥ 44pt (iOS) / 48dp (Android). The Vendor portal holds the same floor — it is used on a
phone at a function, one-handed." Measured in Chromium, at each prototype's natural width:

| Control | Measured | Location |
|---|---|---|
| Vendor calendar day cell (phone lens) | **35 × 27** | `direction-vendor-switch.html:112` — `.cal .days b{aspect-ratio:1.3}` |
| Vendor calendar day cell (desktop lens) | **28 × 21** | same rule, narrower column |
| Family tab bar item | **67 × 35** | `direction-workspace-4.html` `.tabs{padding:7px 4px 9px}` |
| Vendor phone tab bar item | **75 × 34** | `direction-vendor-switch.html:128` `.ptabs{padding:7px 3px 9px}` |
| Segmented lens switch segment | **90–145 × 35.6** | `direction-vendor-switch.html:74` `.sw span{padding:8px 17px}` |
| Primary button "Send a Quote" | **122 × 33** | `.btn{padding:7px 14px;font-size:.77rem}` |
| Nudge buttons "Still free" / "Not available" | **88–122 × 35** | same |
| Vendor-card CTA "Enquire" | **73 × 27** | `color-themes-1.html:95` `.vc .cta{padding:5px 12px}` |
| Failure-banner "Retry" | **34 × 20** | `direction-failure-3.html` `.off span` |
| Left-rail nav row | **199 × 38** | `direction-vendor-switch.html:57` `.side a{padding:9px 15px}` |
| "How results are ordered" link | **310 × 43** | `direction-family-record-3.html` |

The category medallion is the only measured target that passes (a ~130 × 69 cell, because the label
sits inside it). WCAG 2.1 AA does not itself mandate 44px — that is 2.5.5 at AAA, tightened to 24px
at AA only in WCAG 2.2 — so this is not literally an AA failure. It is a failure against the
product's own binding floor, and a 27px calendar cell is a real-world failure for the exact person
the portal is designed for: Dattatray, one-handed, standing at someone else's function.

**Fix.** Set `min-height:44px` (48 on Android) on `button-primary`, `chip`, `tab`, the lens-switch
segment, every calendar cell and every retry. Where the visible box must stay small for density —
the calendar is the real case — keep the visual cell and expand the hit area with padding or an
`::after` overlay, rather than shrinking the control to fit the grid.

#### C2 · The guest RSVP page has never been rendered

`grep -ic rsvp .working/*.html` returns **0 across all twelve files**. There is no guest artifact of
any kind.

This is the surface `EXPERIENCE.md:796` gives the highest floor — "the guest pages carry the highest
floor and the least chrome … keyboard-operable, readable at 200% zoom" — and the one
`EXPERIENCE.md:775` singles out because "many who reach it were forwarded the link and none of them
chose to be there at all." It is also the highest-volume surface in the product: hundreds of guests
per wedding, against one family and one vendor.

Every requirement in `EXPERIENCE.md:204–210` is therefore unverified prose:

- the reply control visible without scrolling at 360×640
- three answers, each a full-width target, each labelled in words
- nothing preselected
- confirmation in place, no redirect
- the growth line below the answer, never above it
- no app shell

The composition question is not rhetorical. At 360×640, after the browser chrome, a finished
invitation card and a line of attribution, three answers at 48dp with 8dp gaps need **≥168dp** of
what remains. Whether the card can be both beautiful and that compact is exactly the trade
`EXPERIENCE.md:204` says must resolve in the reply's favour — and it has not been tested once.

**Fix.** Build the artifact at 360×640 before this gate closes. Measure the fold. If the card does
not fit above it, shrink the card, as the spine already instructs.

#### C3 · `{colors.muted}` and `{colors.vermillion}` are rendered as text on `{colors.gold-tint}`, which both documents forbid

`DESIGN.md:316`: "{colors.muted} on it is only 4.14:1 and {colors.vermillion} on it only 4.06:1 —
**neither is permitted as text on this fill.**" `DESIGN.md:530` repeats it in the Don'ts table.
Recomputed: **4.138** and **4.061**. The rule is right. It is broken in three prototypes:

| Rendered | Ratio | Size | Location |
|---|---|---|---|
| Function card date chip "Nov" — muted on gold-tint | 4.14 | **9.6px** | `direction-workspace-4.html` |
| "Morning · 150 guests" — muted on gold-tint | 4.14 | 11.2px | `direction-workspace-4.html` |
| "There is no dispute process…" — muted on gold-tint | 4.14 | 12.3px | `direction-family-record-3.html` |
| Ghost button label "Add my account first" — vermillion on gold-tint | 4.06 | 12.3px | `direction-family-record-3.html` |
| Ghost button label "Edit the quote" — vermillion on gold-tint | 4.06 | 12.5px | `direction-failure-3.html` T3 |
| "Photo didn't load — tap to retry" — muted on gold-tint | 4.14 | 12.0px | `direction-failure-3.html` T3 |

The third row is the worst of these. `EXPERIENCE.md:734` makes the point that the absence of an
appeal process must be "stated, not hidden" — "saying it plainly is kinder than letting her hunt for
a complaint button that does not exist." That sentence is currently rendered below the legibility
floor. The first row is the second worst: a date, at 9.6px, at 4.14:1.

**Fix.** On `{colors.gold-tint}`, `{colors.ink}` only — 15.41:1, and it is already the specified
label colour for that fill. For a ghost button that must sit on the tint, use an ink label with a
vermillion rule; better, move the button off the tint entirely.

#### C4 · The vendor calendar separates "Engaged" from "Enquiries pending" by colour alone

`direction-vendor-switch.html:111–115` and the same rules in `direction-vendor-4.html`:

```
.cal .days b.eng{background:var(--vermillion);color:#fff;font-weight:700}
.cal .days b.ask{background:var(--gold-tint);border-color:var(--turmeric);font-weight:700}
.cal .days b.blk{background:var(--hairline);color:var(--muted);text-decoration:line-through}
```

`.eng` and `.ask` are both bold, both a bare day number, with no glyph, letter or shape between
them. Only `.blk` earns a second signal. The legend below is three 10×10 colour swatches beside
three words — a colour key restates the colour, it does not replace it.

This is SC 1.4.1 and NFR 5.8. Note what it is *not*: the two states stay 30.8–47.4 apart in CIEDE2000
under both dichromacies, so this is not a colour-blindness failure. It fails for the ordinary
reason — a bleached phone screen in daylight at an outdoor function, which is where this screen is
actually read.

The `.ask` cell's turmeric border, which is the only thing separating it from a plain day, computes
**1.18:1** against the surface. It contributes nothing.

**Fix.** Put a mark inside the cell: a filled dot for engaged, a hollow ring for pending, keep the
strike for blocked. Keep the colour — it is what makes the month scannable. Rewrite the legend to
show the mark as well as the swatch.

---

### SERIOUS

#### S1 · The active tab is colour plus weight; the specified filled icon never renders

`DESIGN.md:231` specifies `active-indicator: 'filled icon + weight, never colour alone'`, and
`DESIGN.md:512` calls it "three signals, because one of them is colour." What every prototype
actually renders is two:

```
.tab.on{color:var(--vermillion);font-weight:600}      /* direction-vendor-4.html:60 */
.ptab.on{color:var(--vermillion);font-weight:600}     /* direction-vendor-switch.html:131 */
```

The `<i class="ic">` glyph is identical at rest and active in all three tab bars — the glyphs differ
*per tab* (◳ Home, ◆ Wedding, ♡ Shortlists) but there is no filled/outline swap on activation. So
the active state rests on vermillion-vs-muted plus 400→600 at **9.4–9.8px**, where a two-step weight
change is close to sub-perceptual. Under protanopia vermillion and muted collapse to CIEDE2000
**8.92**, from 24.03.

**Fix.** Ship the filled/outline icon pair the spec already names — it is the cheapest of the three
signals and the only one that survives both small type and protanopia. An indicator rule above the
active tab would also do it.

#### S2 · The two warm reds collapse under protanopia, and destructive confirmation is where it bites

Viénot simulation: vermillion `#E01B33` → `#565635`, danger `#8C2F1A` → `#42421B`. CIEDE2000 falls
from **16.92 to 7.14** — a 58% loss. Deuteranopia is unaffected (16.38). `direction-failure-3.html`'s
own verdict text predicted this ("a red-blind eye sees two dark warm blocks"), and the decision was
taken anyway with the mitigation written into the spine.

**The mitigation holds almost everywhere.** `DESIGN.md:337` and `EXPERIENCE.md:444` both require a
glyph, a sentence naming what happened and a sentence naming what happens next with every failure.
The banner keeps an 8.07:1 danger border against the page even though its tint drops to ΔE 3.98
against the ground under deuteranopia. A protanope who cannot tell the two reds apart still reads
the words. That is the right design and it should be kept.

**One place it breaks.** `EXPERIENCE.md:445` extends `{colors.danger}` to destructive confirmation —
"removing a Service that carries an Agreement, discarding a Candidate Block, taking a Listing down."
Nothing in either document forbids a danger-filled confirm button sitting beside a vermillion-filled
primary. To a protanope those are two near-identical dark olive blocks, and the only remaining
separator is the button text — on the one class of interaction in the product that cannot be undone.

**Fix.** Add a line to `DESIGN.md` Don'ts: a `{colors.danger}` fill and a `{colors.vermillion}` fill
never appear as adjacent sibling actions. In a destructive confirmation the safe action is a text or
ghost button, never a second filled one. This costs nothing and closes the only gap the two-red
decision actually opened.

#### S3 · Every turmeric and hairline boundary fails SC 1.4.11

Recomputed: turmeric on surface **1.608**, on ground **1.567**; gold-tint fill vs ground **1.152**;
hairline on surface **1.267**, on ground **1.234**. All are below the 3:1 required for "visual
information required to identify user interface components and states."

`DESIGN.md:319` states the principle exactly right — hairline "is a boundary, never a state and
never a divider carrying meaning; anything a person must perceive needs 3:1 and therefore needs a
different device." The document then uses hairline as the **sole** boundary of the search field
(`DESIGN.md:503`), the vendor card, list rows and the tab bar's top rule, and turmeric as the sole
boundary of the chip and the celebration button. Concretely:

- The **filter chip** — gold-tint fill (1.15:1 against ground) inside a turmeric border (1.57:1) —
  has no perceivable silhouette at all. Its label floats on the page. A user cannot see that it is a
  control, only that some words are there.
- The **lens switch**'s 1px turmeric frame is invisible, so the unselected segment ("Inbox", muted on
  white) reads as a line of text rather than the other half of a control. Only the selected segment,
  filled vermillion, looks like anything.
- The **search field**'s hairline outline at 1.27:1 gives a text input no visible edge.

**Fix.** Any element whose *shape* must be identified — chip, switch segment, search field, text
input — needs either a ≥3:1 boundary or an internal fill reaching 3:1 against its ground. `{colors.
muted}` at 4.77:1 on ground is an available hairline substitute for exactly those elements. Leave
hairline where it separates decorative surfaces; it is doing its job there.

#### S4 · The `n OF 5` label is missing from the only Workspace prototype

`grep -c "OF 5"` returns **0** for `direction-workspace-4.html`, against 5 for `color-themes-1.html`
and 2 for `directions-4.html`.

`DESIGN.md:479` and `EXPERIENCE.md:397` both make the label mandatory, for the correct reason: the
turmeric fill against the gold-tint track computes **1.360:1** and cannot carry the state alone.
The prototype a builder will copy the Workspace from is the one that drops it.

**Fix.** Add the label to the artifact, and make it structurally non-optional in the component
contract — the bar and the label are one component, not a component and a decoration.

#### S5 · The failure retry is a 34×20 unstyled span identified only by its position

`direction-failure-3.html`, in all three treatments:

```html
<div class="off"><span><b>No connection.</b> Showing what was loaded.</span><span>Retry</span></div>
```

"Retry" has the same colour, the same size and the same weight as the sentence beside it, with no
border, underline, fill or spacing that marks it as a control. It is identified by right-alignment
and nothing else — a control conveyed by position. In the chosen T2 treatment it is white text on
the danger fill at 8.28:1, which makes it perfectly legible *as part of the sentence*.

`DESIGN.md:243` already specifies the right thing — `retry: 'button-primary with {colors.danger}
background'`. The prototype never renders it, and this is the failure surface, where
`EXPERIENCE.md:439` says the band must be persistent precisely so someone can act on it.

**Fix.** Render the retry as the specified button at 44px with an accessible name. Apply the same
check to the other retry affordance in the same file — "Photo didn't load — tap to retry" is a
78px-tall dashed box whose tappability is carried entirely by the word "tap".

#### S6 · Inknut Antiqua at weight 300, 0.84rem, is not defensible for Vendor Rules on the target device

`type-finalists-stress.html:66,85` sets the Rules block at `font-size:.84rem; line-height:1.85;
font-weight:300`. `DESIGN.md:76` tokenises it as `body-long-devanagari` at the same values. 0.84rem
is **13.44 CSS px**.

Three things stack badly here:

1. Inknut Antiqua is a **modulated** Devanagari serif — real thick/thin stroke contrast. Weight 300
   is its Light. On a mid-range Android at density 1.75–2.0, 13.44 CSS px puts the thin strokes at
   roughly one device pixel, where they alias or drop out entirely.
2. Devanagari carries meaning **above and below** the shirorekha — i-kar and u-kar hooks, anusvara,
   chandrabindu, the conjunct stack. These sit at a fraction of the em, so they degrade before the
   base letterforms do. Indic typography conventionally needs ~1.15–1.3× the Latin optical size for
   equivalent legibility; here it is set *smaller* than the Latin body (0.86rem) and *lighter* than
   everything else in the ramp.
3. The Rules are load-bearing. `DESIGN.md:363` calls them "text a family must read correctly before
   enquiring," and `EXPERIENCE.md:403` puts them on the Listing itself precisely so she reads them
   once, properly. `DESIGN.md:363` rejects Amita *because* its strokes make "a wall of Rules … real
   work at 0.84rem" — the identical objection applies to Inknut Light, and it was not applied.

**Fix.** Set `body-long-devanagari` to weight **400** at **≥0.94rem (15px)**, line-height 1.9. Keep
300 for short decorative runs only. Re-test on a real device once the face is installed —
`DESIGN.md:366` records that Inknut is specified but has no font file in the repo, so nothing in
this ramp has yet been seen in its intended face.

#### S7 · No `lang` on Devanagari runs — SC 3.1.2 Language of Parts, Level AA

Every prototype is `<html lang="en">` and there is no other `lang` attribute in any of the twelve
files. Devanagari user content sits inside an English document with nothing marking it.

SC 3.1.2 is Level AA and it applies here: `EXPERIENCE.md:53` establishes that Devanagari appears as
user content — a Vendor's Rules, a Listing description, a Family's review, a Function she named, the
couple's names — inside an interface that is English throughout. That is textbook Language of Parts.
Without the attribute, TalkBack and VoiceOver read Devanagari with an English voice, which produces
noise rather than words.

`EXPERIENCE.md:53` also decides that content is shown "never asked to declare a language," and that
decision is right — it is the whole point of not making the Family do the platform's work. But
detecting the **script** is not asking her to declare a language: the Unicode block is right there
in the string.

**Fix.** Derive `lang` from the script at render time (Devanagari → `mr` where the Place is
Marathi-primary, else `hi`) and set it on the run, not the page. If that is refused, record it as a
documented AA exception — but note that NFR 5.8 as written does not permit one.

---

### MODERATE

#### M1 · Two animations use properties the design's own Don'ts ban

`DESIGN.md:270` asserts "every one of them is transform and opacity only." `DESIGN.md:533` bans
animating "`width`, `height`, `top`, `background-position`". Both are violated:

- `color-themes-1.html:77` and `directions-4.html:122` —
  `@keyframes foil{0%,55%{background-position:170% 0}92%,100%{background-position:-70% 0}}`
- `directions-4.html:203` — `@keyframes fill{0%,10%{width:60%}42%,88%{width:100%}100%{width:100%}}`

The foil sweep is the brand's signature moment and the fill is a progress meter. Both force
repaint per frame on the class of device NFR 5.3 targets.

**Fix.** Express the foil as a `translateX` on an absolutely positioned overlay. Express the meter as
`scaleX` with `transform-origin:left`. Both are direct substitutions.

#### M2 · Reduced-motion is handled well, with one artifact left behind

Credit first, because this was done properly. Both files carrying animation ship a
`prefers-reduced-motion` block, and every one restores the meaning rather than just stopping the
movement — `color-themes-1.html:97–100` and `directions-4.html:205–210`:

```css
*,*::before,*::after{animation:none!important;transition:none!important}
.inv .ln.done::after{transform:scaleX(1)}   /* the gold rule appears, settled */
.next .m1{opacity:0}.next .m2{opacity:1}    /* one message resolves, not both */
.bm .r.win .tr i{width:100%}                /* the meter shows its value */
```

That is exactly the "leaves the meaning intact" the spine asks for, and it is rarer than it should
be. The gap: with `animation:none`, the `.foil` overlay keeps rendering at its default
`background-position`, leaving a permanent diagonal gold band frozen across the invitation card.
Contrast survives — ink over the foil tint stays above 14:1 — so nothing becomes unreadable, but it
is a visible defect on the identity object.

**Fix.** `@media (prefers-reduced-motion:reduce){.inv .foil{display:none}}`.

#### M3 · `opacity:.75` on the unsettled invitation line is still live in the chosen theme

`color-themes-1.html:65` — `.inv .ln.todo{color:var(--soft);opacity:.75}` — measures **3.04:1** in
the Kumkum & Turmeric theme (T3, the chosen one). `directions-4.html:110` does it differently and
worse: `.ln.todo{color:#BBAE9C}` at **2.18:1**.

`DESIGN.md:528` and `EXPERIENCE.md:397` both name this as the back-door lightening that breaks the
contrast lock. The rule was written; the artifacts were never corrected, and the two of them now
disagree with the spine and with each other. The next person who copies a mock copies the defect.

**Fix.** Correct both artifacts to `{colors.muted}` at full strength, or mark them superseded in the
file itself so the rule travels with the code someone will lift.

#### M4 · The first-run empty card's `— & —` has no specified colour, and the only rendering is 1.87:1

`directions-4.html` renders the placeholder dashes at `#C8BCA9` on white — **1.87:1**. `DESIGN.md:479`
specifies the empty card ("First run is the same card, empty, with `—  &  —` and `0 OF 5`") but
assigns no token to the dashes.

Those dashes are the "nothing here yet" signal on the very first screen a new user sees, and the
only rendering that exists is nearly invisible.

**Fix.** Name the token. `{colors.muted}` at full strength (4.89:1 on surface) is the obvious answer
and matches the rule already governing every other open fact on the card.

#### M5 · Unread Enquiries are marked by a left rail and position, with no word or glyph

`direction-vendor-switch.html:88` — `.enq.unread{border-left:3px solid var(--vermillion)}`. In the
markup the three unread cards sit above an eyebrow reading "In progress 4", with **no heading of
their own**. So the state is carried by a colour rail plus position in the list.

The rail itself is fine at 4.80:1; the issue is SC 1.4.1. `direction-vendor-4.html:153` gets this
right — it puts an eyebrow "Needs a reply 3" above the group — so the fix already exists in a
sibling artifact.

This matters commercially as well as legally: `EXPERIENCE.md:156` makes reply speed the one vendor
behaviour that moves ranking, and a state whose only marker is a colour bar is a state that gets
missed.

**Fix.** Carry the vendor-4 eyebrow into the switch layout, or add a per-card word.

#### M6 · The Featured band and the filter chip — the two components the spines call most important — are never prototyped

Neither exists in any artifact:

- **Featured band.** No file renders the disclosed paid-placement band. `direction-home-screen.html:179`
  has a "Featured near you" row heading, but that is the old site's browse rail — the exact
  anti-pattern `EXPERIENCE.md:700` warns about ("'Featured' is the euphemism FR-20 was written
  against"). `EXPERIENCE.md:689` calls the band's three non-colour signals — bounded container,
  heading, per-card chip — "the most essential thing on the screen to get right," with CCPA exposure
  attached at `EXPERIENCE.md:701`.
- **Filter chip.** The `class="chip"` matches in `directions-4.html` and `type-finalists-stress.html`
  are theme colour swatches and Devanagari specimens, not the component. `DESIGN.md:500` marks the
  selected state `[ASSUMPTION]` — including the leading check glyph that is the whole reason
  selection is not carried by colour alone. That glyph has never been drawn.

**Fix.** Render both before the gate closes. The Featured band in particular is the one component
where getting the non-colour marking wrong has a consequence outside the product.

#### M7 · Reflow and 200% zoom are asserted, and fail in the only artifacts that exist

Measured on `direction-vendor-switch.html` in Chromium:

- **At a 320 CSS px viewport (SC 1.4.10).** The desktop lens keeps `width:200px;flex:none` on the
  left rail and `width:282px;flex:none` on the right rail, and there is **no `@media` rule anywhere
  in either vendor prototype**. `.win{overflow:hidden}` then *clips* the 482px of fixed columns
  rather than scrolling them — content becomes unreachable, which is worse than the horizontal
  scroll 1.4.10 forbids.
- **At a 32px root, i.e. 200% text (SC 1.4.4).** `document.scrollWidth` grows to **397px in a 320px
  viewport**; the lens switch alone measures 333px. `.pscr{height:648px;overflow:hidden}` clips the
  phone content, tab bar included.

These are presentation frames rather than product code, and should be weighted accordingly. But
`EXPERIENCE.md:815` asserts a ≥768px two-column behaviour that no artifact implements, and
`EXPERIENCE.md:786` asserts "nothing truncates at the largest setting" against artifacts that all
truncate. Two AA criteria are claimed and nothing demonstrates either.

**Fix.** Add the breakpoint, make both rails shrinkable, and test the vendor portal at 320px and at
200%. The guest page needs the same test (`EXPERIENCE.md:798` claims "readable at 200% zoom") and
does not yet exist to test.

---

### MINOR

#### m1 · The type ramp bottoms out below any defensible floor

`DESIGN.md:128` sets `typography.tab` at **0.61rem = 9.76px**; prototypes render 9.44–9.8px.
Above it: `progress-label` 0.68rem (10.88px), `chip` 0.7rem (11.2px), `eyebrow` 0.72rem (11.52px),
`meta` 0.74rem (11.84px), `button` 0.78rem (12.48px).

WCAG sets no absolute minimum, so this is judgement, not a criterion. The judgement: iOS HIG sets
tab labels at 10pt and Material sets bottom-nav labels at 12sp. 9.44px is roughly **7pt**. This
product's stated audience explicitly includes older relatives — Vasant kaka is a named persona —
and a wedding is a context of divided attention.

**Suggested floor:** 11px (0.7rem) for any label, 12px for anything read as a sentence. Raising
`tab` to 0.7rem costs horizontal room; the five-tab bar can afford it by shortening "Shortlists" or
dropping to four destinations.

#### m2 · muted on hairline, 3.86:1

`direction-vendor-switch.html:114` — `.cal .days b.blk{background:var(--hairline);color:var(--muted)}`
— the "you marked unavailable" day number. **3.862:1**, never claimed by either document.

**Fix.** `{colors.ink}` on hairline is 14.38:1. Keep the strike-through, which is the state's real
signal.

#### m3 · muted on danger-tint, 3.99:1 — a trap, not yet a defect

**3.985:1.** Not currently rendered, because the failure banner puts its body in ink (14.84:1). But
the banner is a tinted surface and `{typography.meta}` is muted by default, so the first timestamp,
helper line or "2 minutes ago" added to a banner will fail silently.

**Fix.** Add the pair to the `DESIGN.md` Don'ts row alongside the gold-tint pairs, before someone
adds the line.

#### m4 · Focus and screen-reader behaviour are asserted and demonstrated nowhere

No `:focus` or `:focus-visible` rule exists in any of the twelve prototypes. Separately, all twelve
files contain **zero** `<button>`, zero `<a href>`, zero `role=` and zero `aria-` — every button,
tab, chip, calendar cell and switch segment is a `<div>` or `<span>`.

For static mocks that is defensible. What it means for this gate is that every claim in
`EXPERIENCE.md:781–798` — TalkBack labelling with role and state, the availability signal announcing
its attribution, the invitation card announcing "3 of 5 settled", the continuation rail being
announced and not only drawn, keyboard operability, focus order following reading order, skip links
— rests on prose alone. Not one has an artifact behind it.

The good news, already recorded in the tables above: the *specified* focus ring is sound. Vermillion
clears 3:1 against ground (4.68), surface (4.80), gold-tint (4.06) and danger-tint (3.91), so
`DESIGN.md:505` works wherever the ring lands. It has simply never been drawn.

**Fix.** Render focus in at least one prototype, and treat the screen-reader claims as untested until
something exercises them.

#### m5 · Verified sound, recorded so it is not re-opened

- The rating chip's `rgba(0,0,0,0.6)` scrim (`DESIGN.md:493`) gives white **6.61:1** over
  `placeholder-start` and **7.79:1** over `placeholder-end` — the worst point of the gradient clears
  AA comfortably.
- Both warm gradients carry `{colors.ink}` at 10.68–14.97:1 at every stop, so `DESIGN.md:326`'s
  "never sit behind text" is a stylistic fence, not a contrast requirement.
- The chosen failure treatment (T2) is contrast-clean throughout: glyph 8.28:1, title 6.74:1, body
  14.84:1, retry fill 8.28:1, ghost 6.74:1.
- `{colors.danger}` clears 3:1 as a border against both its tint (6.74) and the page ground (8.07),
  so the banner stays findable even when its tint drops to ΔE 3.98 under deuteranopia.

---

## What would clear the gate

In order of user impact:

1. Build the guest RSVP artifact at 360×640 and measure the fold (C2).
2. Raise every touch target to 44/48, starting with the vendor calendar (C1).
3. Add a non-colour mark to the calendar's engaged and pending states (C4).
4. Move the six gold-tint text instances to `{colors.ink}` (C3).
5. Ship the filled/outline tab icon (S1); add the adjacent-fills rule for destructive confirmation
   (S2); give chips, the lens switch and the search field a ≥3:1 boundary (S3).
6. Restore the `n OF 5` label to the Workspace mock (S4) and render the retry as the specified button
   (S5).
7. Raise `body-long-devanagari` to 400 / ≥0.94rem and re-test on a device once the face is installed
   (S6); decide `lang` on Devanagari runs (S7).

Nothing on this list requires changing a palette value. The palette was computed correctly.
