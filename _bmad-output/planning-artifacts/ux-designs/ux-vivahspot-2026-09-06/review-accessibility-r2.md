# Accessibility review — WCAG 2.1 AA — second pass

Reviewer: accessibility lens, BMad UX validation gate.
Reviewed: `DESIGN.md`, `EXPERIENCE.md`, and all eighteen `.working/*.html` prototypes — the twelve
remediated and the six new (`guest-rsvp`, `critical-four`, `availability-signal`,
`availability-icons`, `availability-icons-b`, `vendor-calendar-bar`).
Date: 2026-09-07.

Method, all of it re-run rather than carried over from the first pass:

- Every contrast pair recomputed from hex in Python per WCAG 2.1 (sRGB linearisation,
  `L = 0.2126R + 0.7152G + 0.0722B`, `(L1+0.05)/(L2+0.05)`). Alpha and inherited `opacity` composited
  against the resolved effective background before the ratio is taken.
- Every rendered text node in all eighteen files swept in Chromium via Playwright — 1,600+ nodes —
  with the effective background walked up the ancestor chain, so the figures below are what the
  browser paints, not what the CSS says.
- Geometry measured with `getBoundingClientRect()`; hit areas probed with `elementFromPoint()` at
  sub-pixel offsets, because a measured box and a reachable target are not the same thing.
- Accessible names and roles read from Chromium's own accessibility tree over CDP
  (`Accessibility.getFullAXTree`), not inferred from markup.
- Dichromacy simulated with the Viénot–Brettel–Mollon linear-RGB transform, separation in CIEDE2000.
- Icons rendered at `deviceScaleFactor` 1 and 2 and magnified with nearest-neighbour to judge the
  16px cut on a real device grid.

**Files moved during this review.** `DESIGN.md`, `EXPERIENCE.md`, `availability-signal.html`,
`availability-icons.html` and `availability-icons-b.html` were all rewritten at 14:09 while the audit
was running — the `availability-ring` component in particular was replaced wholesale. Everything
below is re-verified against the state at that point. Hashes, so this is reproducible:

```
DESIGN.md        d8909bfcc60cb21104040d259e555ee1   651 lines
EXPERIENCE.md    06aed3e1446f5fb37ce67214cf1fdeb0  1129 lines
availability-icons-b.html  f2831888f2f0bc43d9de6687380fa2e8
availability-icons.html    1767bfedc56b2f53472204952bd8c121
availability-signal.html   51b7d94e102faea0ca507a961ac36617
guest-rsvp.html            78cd39aaffe816fbcc0766626d20f2d5
vendor-calendar-bar.html   7d347c788b1f04b7c07b36dc714f31c9
critical-four.html         ca210d6f3d383e20bacc98556aae019c
direction-vendor-switch.html e329fdcf920193f4b61c4176530a0f3d
```

---

## Verdict

**Conditional fail — held.** The verdict has not moved, but almost none of the reasons are the same
ones, and that is the honest summary: this was a real remediation, not a paper one.

**What genuinely landed.** The guest RSVP page exists and every measurable claim about it is true —
I measured the card at 325px and the reply control ending at 542 of 640 on a 360×640 viewport, with
98px of headroom; three answer buttons at exactly 48 × 330px, identical in fill, border, weight and
size, none preselected, none disabled, no `aria-pressed`; accessible names read from Chromium's tree
as *"Yes, we will be there"*, *"No, we cannot come"*, *"Not sure yet"*; and at a 32px root
`scrollWidth` is 360 against a `clientWidth` of 360, so nothing overflows horizontally at 200%. That
is C2 answered properly. The six gold-tint text violations are gone — `direction-workspace-4`,
`direction-family-record-3` and `direction-failure-3` now sweep clean with **zero** product text
below its floor. Touch targets moved: tab items 48px, lens-switch segments 44px, buttons 44px, the
retry 70 × 44 with a real fill. The `n OF 5` label is back. The unread-Enquiries heading is in.
`lang="mr"` now wraps **every one of the 108 Devanagari runs** across the six files that contain
Devanagari — parsed with an HTML parser, not grepped, zero uncovered. And the destructive-confirmation
rule S2 asked for is in the Don'ts table with the CIEDE2000 figures correct to two decimals.

**Where it fails.** Four things, and three of them are defects the remediation itself created.

1. **The 44 × 44 hit overlay does not do what it is claimed to do.** On every *Enquiries pending*
   cell in `vendor-calendar-bar.html` the overlay is not 44 × 44 — it is **13.19 × 4px**, because the
   second turmeric bar segment is drawn with the same `::after` and overwrites it. The state a vendor
   most needs to tap has no hit area at all. Elsewhere the overlay delivers a hit box equal to the
   *column pitch*, never 44px — 41.14px measured in `direction-vendor-switch.html` — and it is
   **off-centre**: probing with `elementFromPoint`, a tap on the visible right edge of a date already
   lands on the next date.
2. **The mark that closes C4 fails SC 1.4.11.** The turmeric two-segment bar is **1.608:1** against
   the surface it sits on. C4 was raised about a bleached phone screen in daylight; the fix put the
   distinguishing mark at a sixth of the required non-text contrast. And two mutually exclusive C4
   fixes now ship — bars in `vendor-calendar-bar.html`, ●/○/× glyphs in the three vendor prototypes —
   while `DESIGN.md` specifies only the bar.
3. **Unicode characters are used as state marks in six files**, including `U+2713` on the guest RSVP
   page — the exact character `DESIGN.md`'s own Don't names, for the exact reason it names (emoji
   presentation on Android putting an unchosen green tick into a system where nothing means *good* by
   being green).
4. **The count control `EXPERIENCE.md` now requires after *Yes* does not exist.** The spine gained the
   rule; the artifact's own header records that it was deliberately not built. On the highest-floor,
   highest-volume surface in the product, that requirement is back to being prose.

**And the spine and the artifacts have come apart.** Five fixes live in the mocks and nowhere in the
documents a builder will actually read: the chip and search-field boundaries (`DESIGN.md` still
specifies `1px solid {colors.turmeric}` and `1px solid {colors.hairline}`), the `lang` rule (absent
from both spines), the tab indicator (`DESIGN.md:571` still specifies a filled icon nobody drew), and
the Devanagari ramp, where the tokens now say 400 / 0.94rem / 0.92rem while the prose and the Do's
row still say 300 / 0.84rem / 0.82rem in three places. A fix that only exists in a mock is a fix that
will be lost.

**Contrast arithmetic: four asserted figures are wrong, down from three being wrong in a smaller
set.** None changes a pass/fail verdict. The palette is still correctly decided everywhere.

Gate outcome: **do not pass.** Blocking items are C-r1 … C-r4 and S-r1 … S-r9.

---

## Contrast verification table

Everything either document or any prototype header asserts, recomputed from hex to three decimals.

### Claimed pairs — the two spines

| Where | Pair | Claimed | Computed | Floor | Result | Verdict on the claim |
|---|---|---|---|---|---|---|
| `DESIGN.md:255` | muted `#8C6A50` on ground `#FFFCF2` | 4.77 | **4.766** | 3.0 | pass | correct |
| `DESIGN.md:261` | turmeric `#FFC300` on ground | 1.57 | **1.567** | 3.0 | fail (stated) | correct |
| `DESIGN.md:262` | gold-tint `#FFEBB0` on ground | 1.15 | **1.152** | 3.0 | fail (stated) | correct |
| `DESIGN.md:358` | ink `#2B0A0E` on ground | 17.75 | **17.752** | 4.5 | pass | correct |
| `DESIGN.md:358` | ink on surface `#FFFFFF` | 18.22 | **18.222** | 4.5 | pass | correct |
| `DESIGN.md:364` | muted on ground | 4.76 | **4.766** | 4.5 | pass | **WRONG** — rounds to 4.77 |
| `DESIGN.md:364` | muted on ground (alt figure, same line) | 4.77 | **4.766** | 4.5 | pass | correct |
| `DESIGN.md:365` | muted on surface | 4.89 | **4.892** | 4.5 | pass | correct |
| `DESIGN.md:370` | white on vermillion `#E01B33` | 4.80 | **4.801** | 4.5 | pass | correct |
| `DESIGN.md:370` | same, memlog's figure, now attributed | 4.81 | **4.801** | 4.5 | pass | correctly flagged as the memlog's |
| `DESIGN.md:377` | white on turmeric | 1.61 | **1.608** | 4.5 | fail (intended) | correct |
| `DESIGN.md:377` | same, memlog's figure, now attributed | 2.0 | **1.608** | 4.5 | fail (intended) | correctly flagged as the memlog's |
| `DESIGN.md:378` | ink on turmeric | 11.33 | **11.330** | 4.5 | pass | correct |
| `DESIGN.md:380` | ink on gold-tint | 15.41 | **15.412** | 4.5 | pass | correct |
| `DESIGN.md:380` | muted on gold-tint | 4.14 | **4.138** | 4.5 | fail (intended) | correct |
| `DESIGN.md:381` | vermillion on gold-tint | 4.06 | **4.061** | 4.5 | fail (intended) | correct |
| `DESIGN.md:383` | hairline `#F6E2C2` on ground | 1.23 | **1.234** | 3.0 | fail (intended) | correct |
| `DESIGN.md:396` | white on danger `#8C2F1A` | 8.3 | **8.279** | 4.5 | pass | correct |
| `DESIGN.md:396` | danger on ground | 8.1 | **8.065** | 4.5 | pass | correct at 1 dp |
| `DESIGN.md:396` | danger on danger-tint `#F7E4DE` | 6.7 | **6.744** | 4.5 | pass | correct |
| `DESIGN.md:543`, `EXPERIENCE.md:408` | turmeric fill on gold-tint track | 1.36 | **1.360** | 3.0 | fail (intended) | correct |
| `DESIGN.md:547` | white on vermillion | 4.80 | **4.801** | 4.5 | pass | correct |
| `DESIGN.md:595` | muted on ground | 4.76 | **4.766** | 4.5 | pass | **WRONG** — rounds to 4.77 |
| `DESIGN.md:595` | muted at `opacity:.75` on surface | 3.04 | **3.040** | 4.5 | fail (the point) | correct |
| `DESIGN.md:596` | ink on turmeric / gold-tint; white on turmeric | 11.33 / 15.41 / 1.61 | **11.330 / 15.412 / 1.608** | — | — | correct |
| `DESIGN.md:597` | white on vermillion; vermillion on gold-tint / turmeric; muted on gold-tint | 4.80 / 4.06 / 2.99 / 4.14 | **4.801 / 4.061 / 2.985 / 4.138** | — | — | correct |
| `DESIGN.md:602` | vermillion vs danger, CIEDE2000 normal → protanopia | 16.92 → 7.14 | **16.92 → 7.14** | — | — | correct |

### Claimed pairs — prototype headers

| Where | Pair | Claimed | Computed | Verdict |
|---|---|---|---|---|
| `guest-rsvp.html:101–111` | eleven pairs: ink/ground, ink/surface, muted/surface, muted/ground, vermillion/surface, vermillion/ground, focus rings, ink rule | 17.752, 18.222, 4.892, 4.766, 4.801, 4.677, … | identical to three decimals | all correct |
| `guest-rsvp.html:113–119` | turmeric/surface 1.608; hairline/surface 1.267; muted/gold-tint 4.138 | as printed | **1.608 / 1.267 / 4.138** | correct |
| `guest-rsvp.html:120` | muted at `opacity:.75` on surface | 3.281 | **3.040** | **WRONG** — off by +0.24 (8%) |
| `direction-failure-3.html:18–23` | muted/gold-tint 4.138; vermillion/gold-tint 4.061; ink/gold-tint 15.412; ink/white 18.222; danger/white 8.279; **danger/turmeric 5.148** | as printed | **4.138 / 4.061 / 15.412 / 18.222 / 8.279 / 5.148** | all correct |
| `direction-vendor-switch.html:18,23,206` | ink/gold-tint 15.41; muted/ground 4.77; vermillion/gold-tint 4.06 | as printed | **15.412 / 4.766 / 4.061** | correct |
| `direction-vendor-4.html`, `direction-vendor-desktop.html` | ink/gold-tint 15.41; vermillion/gold-tint 4.06; ink/hairline 14.38; muted/hairline 3.86 | as printed | **15.412 / 4.061 / 14.383 / 3.862** | correct |
| `direction-workspace-4.html:16–36,175` | 4.14, 15.41, 1.360, 4.77, 1.61, 2.99, 4.06, 4.80, 11.33, 14.38 | as printed | all match | correct |
| `direction-home-screen.html:14` | `--soft` `#736570` on surface | 5.49 | **5.491** | correct |
| `direction-home-screen.html:21` | `#2a242a` on the three service-dot fills | 5.81 / 8.19 / 9.86 | **5.809 / 8.186 / 9.857** | correct |
| `color-themes-1.html:12,194` | hairline/ground 1.234; white on `#E01B33` 4.8 | as printed | **1.234 / 4.801** | correct |
| `color-themes-1.html:230` | ink `#2E1606` on marigold `#FF8A00` | 7.7 | **7.205** | **WRONG** — off by 0.50 (6.9%) |
| `directions-4.html:14` | hairline boundary | 1.23 | **1.234** | correct |

**Four wrong figures**, at `DESIGN.md:364`, `DESIGN.md:595`, `guest-rsvp.html:120` and
`color-themes-1.html:230`. None crosses a threshold. The two `4.76:1` printings are the same
first-pass defect, unfixed: 4.766 rounds to **4.77**, and `DESIGN.md:364` still prints both figures
side by side as if they were two computations.

### Pairs the prototypes render that nothing claims — sub-floor product text

Swept in Chromium across all eighteen files. Presentation chrome (the dark working-artifact frame) is
excluded and listed separately at m-r5.

| Ratio | Pair | Size | Where |
|---|---|---|---|
| **1.871** | `#C8BCA9` on surface | 24px | `directions-4.html` `.names` — the first-run `— & —` (M4) |
| **2.177** | `#BBAE9C` on surface | 13.76px | `directions-4.html` `.ln.todo` (M3) |
| **3.037** | muted at `opacity:.75` on surface | 12.8px | `color-themes-1.html` `.ln.todo`, chosen theme (M3) |
| **3.325** | muted at `opacity:.8` on surface | 11.2–12.5px | `type-devanagari-pairing.html`, `-2.html` `.ln.todo` — **new since the first pass** |
| **3.862** | muted on hairline | 9.6–11.84px | `critical-four.html` `b.blk`, legend `i` (m2, reintroduced) |
| **4.138** | muted on gold-tint | 8.96–10.88px | `critical-four.html` `.fh .d span`, `.fh .nm span` × 6 (C3, reintroduced) |
| 1.608 | turmeric on surface | 9.9–11.8px | `.orn` ❁ ornaments — decorative, `aria-hidden`, exempt under 1.4.3 |
| 3.078 | `#9A9099` on surface | 13.76px | `direction-home-screen.html` search placeholder — provisional skin, declared untouched |

`direction-workspace-4.html`, `direction-family-record-3.html`, `direction-failure-3.html`,
`direction-vendor-switch.html`, `direction-vendor-desktop.html` and `availability-signal.html` now
sweep **completely clean** — zero product text below floor. That is the C3 fix, and it holds.

### Non-text contrast (SC 1.4.11, 3:1) — the new components

| Element | Computed | Result |
|---|---|---|
| **calendar bar — engaged, vermillion on surface** | **4.801** | pass |
| **calendar bar — enquiries pending, turmeric on surface** | **1.608** | **FAIL** — see C-r2 |
| calendar-bar legend swatch, turmeric gradient on ground | **1.567** | **FAIL** |
| availability-ring — free, 2px solid muted on surface | **4.892** | pass (fixed at 14:09) |
| availability-ring — taken, 1px solid muted on surface | **4.892** | pass |
| availability-ring — unstated, 1px dashed muted on surface | **4.892** | pass |
| availability-ring — gold-tint fill on surface | **1.182** | fail, but the spine now declares it decorative and non-load-bearing |
| `button-choice` border, muted on surface (guest RSVP answers) | **4.892** | pass |
| `button-choice` border, muted on ground at 430px | **4.766** | pass |
| recorded-answer border, ink on surface | **18.222** | pass |
| focus ring, vermillion on surface / ground | **4.801 / 4.677** | pass |
| lens switch, 1px muted container border on surface | **4.892** | pass (was turmeric at 1.608) |
| filter chip `.filt`, 1px muted border on gold-tint | **4.138** | pass at the 3:1 non-text floor |
| search field, `--soft` `#736570` on surface | **5.491** | pass (was hairline at 1.267) |
| tab active-indicator rule, vermillion on surface | **4.801** | pass |
| retry fills — ink/surface, white/clay, ink/turmeric | **18.222 / 8.279 / 11.330** | pass |
| span-card border, 2px turmeric on surface | **1.608** | **FAIL** — `DESIGN.md` `span-card.border`, see M-r3 |
| invitation-card double rule, turmeric + gold-tint on surface | **1.608 / 1.182** | fail, declared decorative, accepted |
| skeleton block, hairline on surface | **1.267** | fail; a loading placeholder conveys no state, so 1.4.11 does not bite |

### Dichromacy separation (CIEDE2000, Viénot simulation) — the new marks

| Pair | Normal | Protanopia | Deuteranopia |
|---|---|---|---|
| calendar bar: engaged vermillion vs pending turmeric | 51.03 | 43.84 | 25.45 |
| ring: free 2px muted vs taken 1px muted | 0 (same colour — separated by **geometry**) | — | — |
| ring free gold-tint fill vs taken white fill | 18.76 | 19.30 | 19.89 |
| vermillion vs danger — the S2 pair | 16.92 | **7.14** | 16.38 |
| turmeric bar vs surface | 31.15 | 31.52 | 30.94 |
| vermillion bar vs surface | 47.92 | 52.93 | 41.14 |
| RSVP answer border, muted vs surface | 41.93 | 42.70 | 41.00 |

The calendar's two live states stay 25–44 apart under both dichromacies, so C4 remains a plain 1.4.1
and 1.4.11 problem rather than a colour-vision one. Rebuilding the ring on a single muted stroke was
the right move: it removes the colour question from that component entirely and leaves geometry, and
geometry survives every simulation by construction. Note the turmeric bar's ΔE 31 against white:
it is a perfectly *distinguishable hue* and still a **1.608:1** contrast failure. Both are true, and
the criterion that governs is the second one — which is exactly the daylight-on-a-bleached-screen
case C4 was written about.

---

## Findings

Severity is user impact, not effort. `[NEW]` marks a finding that did not exist in the first pass.

### CRITICAL

#### C-r1 · The 44 × 44 hit overlay is destroyed on every "Enquiries pending" cell, and elsewhere delivers the column pitch rather than 44px `[NEW]`

`DESIGN.md:286` and `:567` specify `hit-area: 'centred 44x44 overlay; the visual box stays dense'`.
Measured, three ways.

**It is overwritten on `.ask`.** `vendor-calendar-bar.html:71–72`:

```css
.new .ask::after{content:"";position:absolute;right:15%;width:31%;bottom:3px;height:4px;
  background:var(--turmeric);left:auto;top:auto;transform:none}
```

`.new .ask::after` (two classes) outranks `.days b::after` (one class), so the second bar segment
takes the pseudo-element the hit area needs. Measured in Chromium:

| Cell | `::after` box |
|---|---|
| plain day | 44 × 44px |
| `.eng` engaged | 44 × 44px |
| **`.ask` enquiries pending** | **13.19 × 4px** |

Every date a Vendor is being asked about — the one class of cell he must act on — falls back to the
42.58 × 42.58 visual box, with no overlay at all.

**Where it survives, it is not 44px.** A centred overlay wider than its cell overlaps its neighbours,
and in the overlap the later sibling wins the hit test. So each cell's *reachable* area is the column
pitch, not 44px, and it is asymmetric about the visible number:

| Artifact | Cell | Col pitch | Overlay overlap | Reachable width | Offset from the visible centre |
|---|---|---|---|---|---|
| `direction-vendor-switch.html`, phone | 37.14 | 41.14 | 2.86px | **41.14** | 2.86px to the left |
| `direction-vendor-4.html` | 40.84 | 43.84 | 0.16px | **43.84** | 0.16px |
| `vendor-calendar-bar.html` at 334px | 42.58 | 44.58 | none | 44.00 | centred |
| `vendor-calendar-bar.html` at a 306px column | 38.58 | 40.58 | 3.42px | **40.58** | 3.42px |
| `vendor-calendar-bar.html` at 284px, the spine's own tight case | 35.44 | 37.44 | 6.56px | **37.44** | 6.56px |

Probed with `elementFromPoint` at 284px: a tap **on the visible right edge of "9" returns "10"**, and
a tap on its visible bottom edge returns "16". The overlay technique buys at most `pitch − cell` of
extra reach — 4px in the vendor prototype — and pays for it with a silently mis-centred target on a
grid of dates, where a mis-tap changes which day the Vendor is looking at.

**And nothing here is a control.** `.days b` is a `<b>` element. Across all eighteen files there are
**zero** `<button>`, `<a href>`, `role=` or `tabindex` outside `guest-rsvp.html`. The 44px is a
measurement on a `<b>`; there is no keyboard target, no focus, no name and no state to announce.

**Fix.** Give `.ask` its own element for the second segment (a child `<i>`, or `box-shadow` on
`::before`) so `::after` is free to be the hit area. Then state the honest rule in `DESIGN.md`: below
a 44px pitch, a centred overlay cannot deliver 44px and the month must fall back to the list of dates
the spine already names — the overlay must never be *wider* than the pitch, or the target silently
moves off the thing it marks.

#### C-r2 · The mark that closes C4 fails SC 1.4.11, and two incompatible C4 fixes ship at once `[NEW]`

`DESIGN.md` `calendar-day-bar` specifies `enquiries-pending: 'TWO countable segments, {colors.turmeric}'`.
Turmeric `#FFC300` on surface `#FFFFFF` computes **1.608:1**, against the 3:1 SC 1.4.11 requires of
"visual information required to identify … states". The legend swatch on ground is **1.567**. The
count idea is sound — one bar versus two survives greyscale and blur, and I confirmed that — but the
ink it is drawn in cannot be seen on the screen C4 was raised about.

Worse, the folder now holds two answers to the same finding and they cannot both be built:

| Artifact | Engaged | Pending | Unavailable |
|---|---|---|---|
| `vendor-calendar-bar.html` | one solid vermillion bar | **two turmeric segments** | struck number, no bar |
| `direction-vendor-switch.html`, `-4`, `-desktop` | `●` `U+25CF` under the number | **`○` `U+25CB`** | `×` `U+00D7` + strike |

`DESIGN.md` specifies only the first. The three vendor prototypes — the ones a builder will copy the
portal from — render the second, and it is not in the spine at all.

**Fix.** Pick one, put it in `DESIGN.md`, and delete the other from the folder. If the bar wins, it
needs a colour that clears 3:1 against white: `{colors.vermillion}` at 4.801 for both states with the
count carrying the difference, or `{colors.muted}` at 4.892. If the dot/ring wins, it must be drawn
as inline SVG (see C-r3) and `calendar-day-bar` must be replaced, not sat beside.

#### C-r3 · Unicode characters are used as state marks in six files, including `U+2713` on the guest RSVP page `[NEW]`

`DESIGN.md`'s Don'ts table and `availability-ring.icon` both forbid this, in terms:

> Draw every state glyph as **inline SVG** inheriting `currentColor` | Use a Unicode character for a
> state mark. `U+2713` renders with **emoji presentation** on several Android builds, putting an
> unchosen green tick into a system where nothing means *good* by being green

Rendered anyway:

| File | Marks | Where |
|---|---|---|
| `guest-rsvp.html:527,530,533,539` | **`U+2713` ✓**, `U+2717` ✗, `?` | the three RSVP answers and the recorded answer |
| `direction-vendor-switch.html:192–194` | `U+25CF` ● `U+25CB` ○ `U+00D7` × | the three calendar states |
| `direction-vendor-4.html`, `direction-vendor-desktop.html` | same three | same |
| `direction-home-screen.html:185–187` | **`U+2713`**, `U+25D1`, `U+2013` | the service-state dots |
| `critical-four.html:133,255–265,343–345` | `U+2714` ✔, `✓`, `—`, `?`, `–` | calendar option A and availability option A |
| `availability-signal.html:106,110,114` | `✓`, `—`, `?` | the availability ring, all three states |

The guest page is the worst of these. It is the highest-volume surface in the product, its answer
glyphs are the state marks, and the character used is the one the rule names by codepoint. On an
Android build that gives `U+2713` emoji presentation, the "Yes" answer renders a green tick — in a
system whose stated rule is that nothing means *good* by being green.

Two of the three availability artifacts already do this correctly, so the drawing exists; it simply
has not been carried into the files that ship the mark.

**Fix.** Replace every state mark with the inline SVG already drawn in `availability-icons-b.html`.
Keep `❁` — an ornament is not a state mark and is correctly `aria-hidden`.

#### C-r4 · The RSVP count control `EXPERIENCE.md` now requires does not exist `[NEW]`

`EXPERIENCE.md:206` is now explicit:

> **The count is asked only after Yes** — tapping *Yes* reveals a count control beneath the answers,
> **pre-filled with the household figure the Creator already recorded** … *No* and *Not sure* reveal
> nothing.

I drove the page: clicked `[data-a="yes"]` in frame 1, waited, and re-read the DOM. The answers hide,
the recorded answer appears, focus moves — and **no count control appears**. Searched the whole
document for `count`, `how many`, `household`, `number of`: absent before the answer and absent
after. `guest-rsvp.html:150–154` says so itself:

> UJ-5's HEADCOUNT HAS NO HOME. … No count control is invented here; the gap is recorded instead.

The prototype is honest; the sequencing is what failed. The spine gained the rule *after* the artifact
was drawn, and nothing went back to close the loop. So on the surface `EXPERIENCE.md:797` gives the
highest floor, one requirement is once again unbuilt and unmeasured — and it is the one that carries a
form control, a pre-filled value, a label, an error path and a keyboard interaction, none of which the
three-button page has to solve.

**Fix.** Build it in `guest-rsvp.html` and measure what it does to the fold, since it lands *inside*
the 98px of headroom the current page has. A `<label>` bound to a numeric stepper at 48px, pre-filled,
announced on reveal, and revealed only after *Yes*.

---

### SERIOUS

#### S-r1 · 27 inline SVGs carry no `aria-hidden`, and 13 are exposed to the accessibility tree as unnamed images `[NEW]`

All three availability artifacts state, in prose, that the icons are hidden from assistive tech:

> Each is `aria-hidden` — the word beside it is what a screen reader announces.
> — `availability-icons.html:246`, and the same claim at `availability-icons-b.html:225`

Counted from the markup:

| File | `<svg>` | without `aria-hidden` |
|---|---|---|
| `availability-icons.html` | 20 | **14** |
| `availability-icons-b.html` | 17 | **13** |

The four that carry it are the 40px display figures. **Every 16px in-context instance — the cut that
actually ships — lacks it.** Read back from Chromium's own accessibility tree over CDP,
`availability-icons-b.html` exposes **13 nodes with role `image` and no accessible name**. A screen
reader user hears an unlabelled graphic before each availability phrase.

**Fix.** `aria-hidden="true"` on every `<svg>`, or `focusable="false" aria-hidden="true"` for older
engines. Add it to the component contract in `DESIGN.md` — `availability-ring.icon` already says
`aria-hidden`, so the spine is right and the artifact is wrong.

#### S-r2 · `critical-four.html` reintroduces the two banned pairs seven times `[NEW]`

The six original C3 violations are fixed. A new file recreated them:

| Ratio | Pair | Size | Selector |
|---|---|---|---|
| **4.138** | muted on gold-tint | **8.96px** | `.fh .d span` — the "Nov" under the date |
| **4.138** | muted on gold-tint | 10.88px | `.fh .nm span` × 4 — "Morning · 150", "Evening · 600", "Morning", "Evening" |
| **4.138** | muted on gold-tint | 9.6px | legend `i` — the "?" pending swatch |
| **3.862** | muted on hairline | 11.84px | `b.blk` — the "you marked unavailable" day |
| **3.862** | muted on hairline | 9.6px | legend `i` — the unavailable swatch |

`DESIGN.md:380–381` and the Don'ts row forbid the first; m2 flagged the second. The 8.96px instance
is the worst: a date, below the legibility floor, at 4.14:1.

This is what happens when a rule lives only in a table. The file was drawn from "DESIGN.md tokens
only" — and it is true that every *token* used is legal; it is the *pairing* that is not.

**Fix.** `{colors.ink}` on both fills — 15.412 and 14.383. And note that the Function header
(`.fh`, gold-tint fill with muted meta) is a pattern that has now been drawn twice; it belongs in
`DESIGN.md` as a component with its label colour fixed, not re-invented per file.

#### S-r3 · S3 was fixed in the artifacts and not in `DESIGN.md`; the spine still specifies the failing boundaries `[NEW]`

The mocks moved: the lens switch takes `1px solid var(--muted)` at 4.892, the filter chip `.filt`
takes `1px solid var(--muted)`, the search fields re-point to `--soft`/`--muted` at 4.766–5.491.
Measured, all clear 3:1. Good work.

`DESIGN.md` did not move. Both the token block and the prose still specify the boundaries that fail:

```yaml
chip:
  border: '1px solid {colors.turmeric}'     # 1.608 on surface — DESIGN.md:203
search-field:
  border: '1px solid {colors.hairline}'     # 1.267 on surface — DESIGN.md:213
```

> **Chip** — {colors.gold-tint} fill, 1px {colors.turmeric} border … — `DESIGN.md:563`
> **Search field** — white, 1px {colors.hairline}, square … — `DESIGN.md:568`

A builder implementing from the spine will rebuild the defect. So will `packages/shared/src/tokens.js`
when it is generated from this document.

**Fix.** Change both component definitions and both prose paragraphs to `{colors.muted}`, and add a
one-line rule to the Don'ts: any element whose *shape* must be identified needs a ≥3:1 boundary;
hairline and turmeric are decorative rules only.

#### S-r4 · S7 was fixed in the artifacts and not in either spine; nothing records the `lang` decision `[NEW]`

Parsed with an HTML parser rather than grepped: across the six files containing Devanagari there are
**108 runs, and 108 are inside a `lang="mr"` element. Zero uncovered.** That is a complete fix in the
mocks, and better than S7 asked for.

Neither `DESIGN.md` nor `EXPERIENCE.md` mentions it. There is no `lang`, no "Language of Parts", no
"SC 3.1.2" anywhere in 1,780 lines of spine. `EXPERIENCE.md`'s Accessibility Floor lists eight
bullets and this is not one of them. The rule that makes TalkBack read Marathi with a Marathi voice
now exists only as an attribute in six throwaway HTML files.

**Fix.** One bullet in `EXPERIENCE.md`'s Accessibility Floor: *Devanagari runs carry `lang` derived
from the script at render time (`mr` where the Place is Marathi-primary, else `hi`), set on the run,
never on the page.* This is the single highest-value line-for-line edit available in this review.

#### S-r5 · `DESIGN.md` now contradicts itself on the Devanagari ramp, and the new size is rendered nowhere `[NEW]`

S6 asked for weight 400 at ≥0.94rem. The tokens moved, with a good rationale note:

```yaml
body-long-devanagari: { fontSize: 0.94rem, fontWeight: '400', lineHeight: '1.9' }
review-devanagari:    { fontSize: 0.92rem, fontWeight: '400', lineHeight: '1.85' }
```

Three other places in the same document still say the old values:

| Line | Text |
|---|---|
| `DESIGN.md:428` | "Inknut holds in all six places … Rules and reviews at **300**" |
| `DESIGN.md:445` | "Vendor Rules **0.84rem** at 1.85 line-height, reviews **0.82rem** at 1.8" |
| `DESIGN.md:601` (Do's) | "Set Devanagari user content in Inknut Antiqua at 700 / 500 / **300** by role" |

And no artifact renders the new value. `type-finalists-stress.html:82,101` still sets `.rules p` at
`0.84rem` / `font-weight:300`, deliberately — its header explains that changing the specimen would
erase the evidence the finding rests on, which is a defensible call for a comparison file. The
consequence is that **0.94rem/400 Inknut has never been seen**, and `DESIGN.md:431` records that
Inknut has no font file in the repo, so nothing in this ramp has been seen in its intended face at
all.

**Fix.** Reconcile the three prose lines to the tokens — the tokens are right. Then draw one specimen
at the new value, in a separate file if `type-finalists-stress.html` must stay frozen as evidence.

#### S-r6 · S1's fix diverges from the spine: the filled/outline icon is still specified and still absent `[NEW, carries S1]`

Every tab bar gained a genuine third signal — `.tab.on::before` / `.ptab.on::before`, a 3px indicator
rule at 20%–80% width, `background:currentColor`, measured at **4.801** non-text against the surface.
That is a shape, not a hue, and it works. Credit.

But the signal `DESIGN.md` specifies is a different one, and it is still not there:

> `active-indicator: 'filled icon + weight, never colour alone'` — `DESIGN.md:237`
> the active tab is {colors.vermillion} **and** weight 600 **and** a filled rather than outlined
> icon. Three signals, because one of them is colour. — `DESIGN.md:571`

Read from the rendered DOM in all four tab bars, the glyph is byte-identical at rest and active —
`✉` active and `✉` resting, `▦` active and `▦` resting, and so on for all ten destinations. There is
no filled/outline pair anywhere. So the spine names one signal, the artifacts ship another, and a
builder gets whichever document he opens.

**Fix.** Decide which. The indicator rule is cheaper and already drawn; if it wins, rewrite
`DESIGN.md:237` and `:571` to say so. Either way the icons must become inline SVG (C-r3), at which
point a filled/outline pair costs one extra path.

#### S-r7 · M7 is untouched: no `@media` exists in any vendor prototype, and both reflow tests still fail `[carries M7]`

Re-measured in Chromium. `@media` count per file: `guest-rsvp.html` 2, `directions-4.html` 1,
`color-themes-1.html` 1, **every other file 0** — including all three vendor prototypes, whose
`≥768px` two-column behaviour `EXPERIENCE.md:820` asserts.

| File | 320px viewport | 320px @ 32px root (200% text) |
|---|---|---|
| `direction-vendor-switch.html` | `.win` clips **520 → 284** (content unreachable) | `scrollWidth` **397** > 320; `.pscr` clips 342 → 334 |
| `direction-vendor-desktop.html` | `.win` clips **536 → 284** | `scrollWidth` **343** > 320 |
| `direction-vendor-4.html` | ok | `scrollWidth` **348**; `.scr` clips 439 → 358 |
| `direction-workspace-4.html` | ok | `scrollWidth` **348**; `.scr` clips 394 → 358 |
| `critical-four.html` | `.bar`/`.ph` clip | `scrollWidth` **388**; `.fn` clips 356 → 330 |
| `availability-signal.html` | `scrollWidth` **404** > 320 | **472** > 320 |
| `vendor-calendar-bar.html` | `scrollWidth` **378** > 320 | **378** > 320 |
| `guest-rsvp.html` product surface | — | `scrollWidth` **360** = `clientWidth` — **passes** |

`guest-rsvp.html` is the one artifact that passes both, and it passes them properly. Everything else
is unchanged from the first pass.

**Fix.** Unchanged: add the breakpoint, make both rails shrinkable, re-test at 320px and 200%. The
new artifacts should adopt `guest-rsvp.html`'s container-query approach, which is what makes it the
only file that survives the test.

#### S-r8 · M1 is untouched, and `critical-four.html` adds two infinite animations with no reduced-motion path `[carries M1]`

Still animating properties the Don'ts ban:

- `color-themes-1.html:88` — `@keyframes foil{…background-position:170% 0 → -70% 0}`
- `directions-4.html:132` — the same foil keyframes
- `directions-4.html:213` — `@keyframes fill{0%,10%{width:60%}42%,88%{width:100%}}`

New: `critical-four.html:108` (`@keyframes sh` — a `translateX` sheen, 1.5s, infinite) and `:114`
(`@keyframes sp` — `rotate(360deg)`, 0.9s, infinite). Both are transform-only, which is right. But
`critical-four.html` contains **no `prefers-reduced-motion` block at all**, against
`DESIGN.md` `skeleton.reduced-motion: 'sheen removed, blocks stay'` and `EXPERIENCE.md:450`. Three of
eighteen files carry a reduced-motion block: `color-themes-1`, `directions-4`, `guest-rsvp`.

**Fix.** Substitute `translateX` on an absolutely positioned overlay for the foil and `scaleX` with
`transform-origin:left` for the meter — both direct swaps. Add the reduced-motion block to
`critical-four.html`; the skeleton is the component `DESIGN.md` already writes the rule for.

#### S-r9 · M3 is not only still open, it has spread to two more files `[carries M3]`

The back-door fade `DESIGN.md:595` names by hand is live in four artifacts now:

| File | Declaration | Computed |
|---|---|---|
| `color-themes-1.html:65` | `.ln.todo{color:var(--soft);opacity:.75}` — **the chosen theme** | **3.037** |
| `directions-4.html:110` | `.ln.todo{color:#BBAE9C}` | **2.177** |
| `type-devanagari-pairing.html` | `.ln.todo` at `opacity:.8` | **3.325** |
| `type-devanagari-pairing-2.html` | same | **3.325** |

The last two are new since the first pass. The rule was written, the artifacts were never corrected,
and the pattern is now propagating between files as each new mock is copied from the last.

**Fix.** `{colors.muted}` at full strength in all four, or mark the files superseded in the files
themselves so the defect does not travel with the code someone lifts.

---

### MODERATE

#### M-r1 · `DESIGN.md:567`'s "vertical ones never overlap" is false for the artifact that authored the component `[NEW]`

`DESIGN.md:567`, repeated verbatim at `vendor-calendar-bar.html:156–158`:

> horizontal neighbours share about 2.9px of hit area while **vertical ones never overlap**

True in `direction-vendor-switch.html`, where `min-height:44px` and `gap:4px` give a 48px row pitch.
False in `vendor-calendar-bar.html`, where `.days b{aspect-ratio:1}` and `gap:2px` make row pitch and
column pitch **identically** `cell + 2`, so the two axes overlap by exactly the same amount, always:

| Column | Cell | Col pitch | Row pitch | H overlap | V overlap |
|---|---|---|---|---|---|
| 334px (the artifact's own width) | 42.58 | 44.58 | 44.58 | none | none |
| 306px (360px phone, 15px gutter) | 38.58 | 40.58 | 40.58 | **3.42px** | **3.42px** |
| 284px (the spine's stated tight case) | 35.44 | 37.44 | 37.44 | **6.56px** | **6.56px** |

The claim is stated as a measurement. It is a measurement of a different file. And the artifact is
pinned at `width:334px`, so it never renders the 284px case the sentence describes.

**Fix.** State the geometric truth: with square cells and a uniform gap the two overlaps are equal by
construction, and the overlay is safe only while the pitch is ≥ 44px. Then say what happens below
that, which the spine already knows — fall back to a list of dates.

#### M-r2 · `guest-rsvp.html` duplicates `id="q"` three times; `aria-labelledby` resolves to the wrong heading in two frames `[NEW]`

The page template is cloned into three device frames, so the document contains three `<h1>`, three
`<h2 id="q">` and three `role="group" aria-labelledby="q"`. `document.querySelectorAll('#q').length`
returns **3**. Duplicate ids are SC 4.1.1 Parsing, **Level A** under WCAG 2.1, and the practical
effect is that frames 2 and 3 label their answer group with frame 1's heading.

Chromium's tree does resolve a name for all three groups here, so the visible damage is small — but
the pattern is a template that will be instantiated more than once per page in the product too
(several invitations in a list, for instance), and the id is hard-coded inside it.

**Fix.** Generate the id per instance, or drop `aria-labelledby` and wrap the group in a `<fieldset>`
with a `<legend>`. One `<h1>` per document.

#### M-r3 · `span-card`'s 2px turmeric border is 1.608:1 and it is the card's only boundary `[NEW]`

`DESIGN.md` `span-card.border: '2px solid {colors.turmeric}'`. Computed **1.608** against surface,
**1.567** against ground. The Span card is the object `EXPERIENCE.md:798` calls out specifically —
*"a screen reader user must be able to tell it is one Selection covering two days"* — and the whole
reason it exists is to make one-ness perceivable. Its container edge is currently imperceptible; only
the words inside it carry the idea.

The same 2px turmeric border is drawn in `critical-four.html`'s option B.

**Fix.** The card is a container whose *shape* carries meaning, so it needs ≥3:1: `{colors.muted}`
at 4.892, or keep turmeric for warmth and add a muted rule. This is the same rule as S-r3 and should
be written once.

#### M-r4 · The availability ring separates two of three states by a 1px dashed border — the texture-below-6px case the spine's own Don't bans `[NEW]`

`DESIGN.md` `availability-ring.separator`: `'stroke WIDTH and STYLE — 2px solid / 1px solid / 1px dashed. Never colour, never fill'`, on a **16px** ring.

`DESIGN.md`'s Don'ts table, four rows up:

> Separate two states by a **count** … | Separate them by a **texture** — solid against dashed —
> anywhere below about 6px. A dash pattern averages into a solid line and the distinction disappears

Rendered at both densities and magnified: at `deviceScaleFactor` 2 the dashed ring is clearly dashed
and the three states separate cleanly. At `deviceScaleFactor` 1 the 1px dash sits on one device pixel
with sub-pixel gaps and degrades toward a lighter solid ring. It survives — but only because the word
is always beside it, which is the third signal, not the first.

**Fix.** Either add the exception to the Don't (a *circular* 1px dash at 16px is not the same case as
a 3px straight bar, and saying so costs one clause), or move `unstated` onto the same width axis as
the other two — 2px / 1px / none-with-a-dotted-icon — so the family separates on one property.

#### M-r5 · At 16px the small-cut icon fills the ring edge to edge and its stroke crosses the ring `[NEW]`

`.r16` is 16px with a 2px border, so the inner box is **12px**, and the small-cut SVG is drawn at
**12 × 12** — 100% of the available area, no optical padding. Computing the drawn extents: the
calendar body plus its binding tabs reaches 5.57px from the ring centre, and half the 2.4-unit stroke
adds another 0.66px, for **6.23px against a 6px inner radius**. The icon's corners sit on top of the
ring stroke.

Rendered and magnified, the practical consequence is the one `DESIGN.md`'s own Don't predicts —
*"two icons that differ only by an inner detail stop differing at all"*. At 1× density, *free* and
*taken* separate mainly by ring weight (2px vs 1px) and fill (gold-tint vs white), not by the tick
versus the bar, which is a ~3-device-pixel mark inside an otherwise identical calendar silhouette.

`availability-icons.html`'s own verdict on Set A says it plainly: *"Three completely different
silhouettes — diagonal, horizontal, dotted — so they separate by shape before anything else."* Set A
was marked recommended and Set B was chosen anyway; the two-cut rework rescued Set B's *identity*, not
its *differentiation*.

**Fix.** Draw the small cut at 10px inside the 12px box so it has a pixel of breathing room, and move
the distinguishing mark outside the body silhouette — a tick that breaks the frame, as icon systems
normally do — so the difference is not an interior detail.

#### M-r6 · `guest-rsvp.html` announces the recorded answer twice `[NEW]`

`.recorded` carries `role="status" aria-live="polite" tabindex="-1"`, and `record()` sets its text,
unhides it, **and** calls `rec.focus()`. A live region that is revealed and then focused is announced
by the live-region machinery and again by the focus change. The `Change your answer` button also
lives *inside* the live region, so every later change to that subtree is announced too.

Separately, `line.textContent` is rewritten from *"You can change your answer later"* to *"You can
change this at any time"* on the same interaction, outside any live region — a visible change with no
announcement.

**Fix.** Choose one mechanism. Moving focus to the confirmation is the stronger pattern here, since
the user just acted: keep `tabindex="-1"` and the `.focus()`, drop `role="status"`/`aria-live`. Move
the button outside whatever region announces. Leave the changeable line alone or fold its new wording
into the focused element.

#### M-r7 · M6 is half-closed: the filter chip exists, its selected state does not; the Featured band still does not exist `[carries M6]`

The chip is now real — `.filt` in `direction-vendor-switch.html`, gold-tint fill, 1px muted border,
ink label, 44px. That closes half of M6.

The rest is unchanged. `DESIGN.md:565` still marks the selected state `[ASSUMPTION]`, and the leading
check glyph — the entire reason selection is not carried by colour alone — has still never been drawn.
And `grep -ic "featured\|paid placement"` returns 0 across seventeen of eighteen files; the two hits in
`direction-home-screen.html` are the "Featured near you" browse rail, which is the anti-pattern
`EXPERIENCE.md:700` warns against by name. The component `EXPERIENCE.md:701` calls *"the most
essential thing on the screen to get right"*, with CCPA exposure attached, remains undesigned.

**Fix.** Draw both. The Featured band's three non-colour signals — bounded container, heading, per-card
chip — are the one place where getting the non-colour marking wrong has a consequence outside the
product.

#### M-r8 · M2 is untouched: the foil band still freezes across the invitation card under reduced motion `[carries M2]`

No `.foil{display:none}` rule was added to either file that ships the foil. With `animation:none`, the
overlay renders at its default `background-position`, leaving a permanent diagonal gold band across the
identity object. Contrast survives — ink over the foil tint is 15.250 — so nothing becomes unreadable.

**Fix.** `@media (prefers-reduced-motion:reduce){.inv .foil{display:none}}`. One line, two files.

#### M-r9 · M4 is untouched: the first-run `— & —` renders at 1.871:1 and still has no token `[carries M4]`

`directions-4.html` `.names` measures `#C8BCA9` on white — **1.871**. `DESIGN.md:543` specifies the
empty card and still assigns the dashes no colour token. The "nothing here yet" signal on the very
first screen a new user sees is the least legible thing in the system.

**Fix.** `{colors.muted}` at full strength, 4.892 on surface, and name it in `DESIGN.md`.

---

### MINOR

#### m-r1 · Four asserted contrast figures are wrong `[part NEW]`

| Where | Claimed | True | Error |
|---|---|---|---|
| `DESIGN.md:364` | 4.76:1 | 4.766 | rounds to 4.77 — carried from the first pass, unfixed |
| `DESIGN.md:595` | 4.76:1 | 4.766 | same |
| `guest-rsvp.html:120` | 3.281 | **3.040** | +0.24, 8% — `[NEW]` |
| `color-themes-1.html:230` | 7.7:1 | **7.205** | +0.50, 6.9% — `[NEW]` |

None crosses a threshold. The `guest-rsvp.html` one is worth fixing because that header is otherwise
the most rigorous contrast record in the repo — eleven other pairs on the same list match to three
decimals — and one wrong number in an otherwise exact table is the one a reader will trust.

#### m-r2 · The type ramp still bottoms out below any defensible floor, and the new files add to the bottom `[carries m1]`

`{typography.tab}` is still 0.61rem (9.76px). Below it, in the new artifacts: `.dow` weekday labels at
**9.28–9.6px** (`vendor-calendar-bar.html`, `critical-four.html`), `critical-four.html`'s calendar
corner glyphs at **8.8–9.6px**, and its `.fh .d span` at **8.96px** — carrying a month abbreviation at
4.138:1. WCAG sets no absolute minimum, so this remains judgement; the judgement is unchanged, and the
audience still includes Vasant kaka.

**Suggested floor:** 11px for any label, 12px for anything read as a sentence.

#### m-r3 · The guest page's growth link is 74 × 15px, and its obligation links are 44px against a 48dp floor `[NEW]`

Measured in frame 1: `.growth a` ("Have a look") is **74 × 15px**; `.obligations a` are **144 × 44**
and **94 × 44**. `EXPERIENCE.md:804` sets "≥ 44pt (iOS) / **48dp** (Android)" with no inline-text
exemption, so the first misses by a wide margin and the second two miss the Android half by 4px. WCAG
2.1 AA has no target-size criterion, so this is the product's own floor rather than an AA failure —
but it is on the surface the same document gives the highest floor.

**Fix.** `min-height:48px` on the obligation links; give the growth line's call to action its own
block-level target rather than an inline anchor, or write the inline-link exemption into the floor
explicitly, as WCAG 2.2's own 2.5.8 does.

#### m-r4 · `guest-rsvp.html` has no landmark elements `[NEW]`

Zero `<main>`, `<nav>`, `<header>`, `<footer>` or `role="main"` in the product markup. The page is
short enough that a skip link is not required, and `EXPERIENCE.md:806` scopes skip links to "long
surfaces" — but a screen-reader user has no way to jump to the reply, which is the only thing on the
page they came for.

**Fix.** Wrap the column in `<main>`; the reply is then two landmark jumps from the top.

#### m-r5 · m4 is half-closed: focus and semantics exist in exactly one of eighteen files `[carries m4]`

`guest-rsvp.html` does it properly and should be the template: a real `:focus-visible` rule at 2px
vermillion / 2px offset (4.801 on surface, 4.677 on ground, both clearing 3:1), five `<button>`, three
`<a href>`, `role="group"`, `role="status"`, `aria-hidden` on every decorative glyph, and accessible
names that read back from Chromium's tree exactly as the visible sentences. Verified, not asserted.

The other seventeen files still contain **zero** `:focus` rules, zero `<button>`, zero `<a href>` and
zero `role=`. So every claim in `EXPERIENCE.md:793–806` outside the guest page — TalkBack labelling
with role and state, the availability signal announcing its attribution, the invitation card announcing
"3 of 5 settled", the Span announcing its days, keyboard operability, focus order — still rests on
prose with no artifact behind it.

#### m-r6 · The working artifacts' own chrome sits at 3.458:1 `[NEW]`

`.note` and `.grayNote` render `#8D868B` on `#FFFCF2` at 10.08–10.24px — **3.458:1** — in
`vendor-calendar-bar.html`, `availability-icons.html` and `availability-icons-b.html`. These are the
"blurred" / "greyscale" captions under the specimens: presentation chrome, not product, and outside
the AA scope of NFR 5.8. They are also the labels that tell a reader which strip is which on the pages
whose entire purpose is judging legibility.

**Fix.** `#B3ADB1` on that ground is 4.98:1, and matches the chrome already used elsewhere in the same
files.

#### m-r7 · m3 remains an unclosed trap `[carries m3]`

Muted on danger-tint is **3.985:1**. Still not rendered anywhere — the failure banner keeps its body in
ink at 14.844 — and still not in the `DESIGN.md` Don'ts row beside the gold-tint pairs. The banner is a
tinted surface and `{typography.meta}` is muted by default, so the first timestamp or helper line added
to a banner will fail silently.

**Fix.** One clause in the existing Don'ts row: *"…or {colors.muted} on {colors.danger-tint} (3.99:1)"*.

---

## Reconciliation against the first pass

23 findings. **5 CLOSED · 11 CHANGED · 7 STILL OPEN.**

### CRITICAL

**C1 — no interactive element meets the 44pt/48dp floor. → CHANGED.**
Measured in Chromium: tab items now 48px in all four bars, lens-switch segments 44px, `.btn` 44px,
retry 70 × 44, left-rail rows 44px, `.filt` 44px, RSVP answers 48 × 330, `.chg` 300 × 48. The
27px calendar cell is gone — `min-height:44px` in the vendor files. That is a real fix and it covers
most of the table in the first pass. It is not CLOSED because the mechanism chosen for the density
case does not deliver: the overlay is overwritten on `.ask` cells (13.19 × 4px), yields the column
pitch rather than 44px everywhere it survives, and mis-centres the target (C-r1). And with no
`<button>` or `tabindex` in seventeen of eighteen files, every one of these boxes is still a
measurement rather than a control.

**C2 — the guest RSVP page has never been rendered. → CHANGED, and substantially closed.**
It exists, and I could verify every claim I was asked to. Card 325px; reply control ends at 542 of 640
with 98px of headroom; "you can change it" at 589; three answers at 48 × 330, identical `#FFFFFF` fill
and `#8C6A50` border, no `aria-pressed`, nothing disabled, nothing preselected; confirmation replaces
the control in place with no redirect; growth line below the answer; no app shell, no login affordance;
accessible names read from the a11y tree as the full sentences; at a 32px root `scrollWidth` 360 =
`clientWidth` 360, so SC 1.4.4 and 1.4.10 pass. `EXPERIENCE.md:216`'s own numbers — 325, 542, 702 —
all reproduce. Open: the count control (C-r4), the Unicode marks (C-r3), duplicate ids (M-r2), the
double announcement (M-r6), the 74 × 15 link (m-r3), no landmarks (m-r4).

**C3 — muted and vermillion rendered as text on gold-tint. → CHANGED.**
All six original instances fixed. `direction-workspace-4.html`, `direction-family-record-3.html` and
`direction-failure-3.html` each sweep with **zero** product text below floor. Reintroduced seven times
in `critical-four.html` (S-r2), and the spine's chip still specifies the gold-tint fill with a turmeric
border (S-r3).

**C4 — the vendor calendar separates engaged from pending by colour alone. → CHANGED.**
Both fixes work as *marks*: one bar versus two survives greyscale and blur; ● versus ○ versus × does
too. But the folder now ships two mutually exclusive answers, `DESIGN.md` specifies only one of them,
the one it specifies is drawn in turmeric at **1.608:1** against its surface, and the other is drawn in
banned Unicode characters (C-r2, C-r3).

### SERIOUS

**S1 — the active tab is colour plus weight; the filled icon never renders. → CHANGED.**
A 3px indicator rule was added to every tab bar and it is a legitimate third, non-colour signal at
4.801. But the glyph is still byte-identical at rest and active in all ten destinations, and
`DESIGN.md:237` and `:571` still specify the filled/outline swap (S-r6).

**S2 — the two warm reds collapse under protanopia at destructive confirmation. → CLOSED.**
`DESIGN.md:602` now carries exactly the rule asked for, with the arithmetic verified: *"In a
destructive confirmation, make the safe action a text or ghost button | Put a `{colors.danger}` fill
and a `{colors.vermillion}` fill beside each other as sibling actions. Under protanopia the two
collapse from CIEDE2000 16.92 to 7.14."* I recomputed both figures — 16.92 and 7.14 — and they are
right to two decimals.

**S3 — every turmeric and hairline boundary fails SC 1.4.11. → CHANGED.**
Fixed in the artifacts: lens switch 4.892, filter chip 4.138 (≥3:1 non-text), search fields 4.766–5.491,
and the availability ring rebuilt entirely on muted at 4.892. Not fixed in `DESIGN.md`, whose `chip`
and `search-field` still specify the failing values in both the tokens and the prose (S-r3), and whose
`span-card` introduces a new one (M-r3).

**S4 — the `n OF 5` label is missing from the only Workspace prototype. → CLOSED.**
`grep -c "OF 5"` on `direction-workspace-4.html` returns **2**, from 0. `direction-home-screen.html`
gained one too, and its header records the reason correctly: "Bar and label are one component."

**S5 — the failure retry is a 34 × 20 unstyled span. → CLOSED.**
Measured: `.rt` is now **70.3 × 44** and **68.9 × 44** in all three treatments, with an ink or clay
fill and a white or clay label. The photo placeholder's retry is its own 44px button rather than a
dashed box. Every fill in the header verifies — including `danger/turmeric 5.148`, which I recomputed
at 5.148.

**S6 — Inknut at weight 300, 0.84rem, is not defensible. → CHANGED.**
The tokens moved to 0.94rem/400 and 0.92rem/400, with a note that states the Indic optical-size
reasoning better than the finding did. But three other places in the same document still say 300 /
0.84rem / 0.82rem, and no artifact renders the new value (S-r5). The related tokens the same reasoning
governs — `chip-devanagari` at 0.7rem, identical to the Latin chip — were not revisited.

**S7 — no `lang` on Devanagari runs. → CHANGED.**
108 of 108 runs across six files are now inside `lang="mr"`, parsed rather than grepped. Complete in
the artifacts. Absent from both spines (S-r4).

### MODERATE

**M1 — two animations use properties the Don'ts ban. → STILL OPEN.**
`color-themes-1.html:88`, `directions-4.html:132` (`background-position`) and `directions-4.html:213`
(`width`) are unchanged. `critical-four.html` adds two more infinite animations with no reduced-motion
path (S-r8).

**M2 — reduced-motion leaves a frozen foil band. → STILL OPEN.** No `.foil{display:none}` was added
(M-r8).

**M3 — `opacity:.75` on the unsettled line. → STILL OPEN, and wider.** Now four files: 3.037, 2.177,
3.325, 3.325 (S-r9).

**M4 — the first-run `— & —` at 1.87:1 with no token. → STILL OPEN.** Re-measured at **1.871**;
`DESIGN.md` still assigns no colour (M-r9).

**M5 — unread Enquiries marked by a left rail and position. → CLOSED.**
`direction-vendor-switch.html`'s remediation header records the fix and the file carries the "Needs a
reply" heading, matching the pattern `direction-vendor-4.html` already had right.

**M6 — the Featured band and the filter chip are never prototyped. → CHANGED, half.**
The chip exists as `.filt`. Its selected state and the leading check glyph do not, and remain
`[ASSUMPTION]` in `DESIGN.md:565`. The Featured band still does not exist in any file (M-r7).

**M7 — reflow and 200% zoom are asserted and fail. → STILL OPEN.**
No `@media` in any vendor prototype; `.win` still clips 520 → 284 at 320px; every prototype except
`guest-rsvp.html` overflows horizontally at a 32px root (S-r7).

### MINOR

**m1 — the type ramp bottoms out below any defensible floor. → STILL OPEN.** `tab` still 0.61rem, and
the new files add glyphs at 8.8–9.6px (m-r2).

**m2 — muted on hairline, 3.86:1. → CHANGED.** Fixed in `direction-vendor-switch.html`, `-4` and
`-desktop` — `.blk{color:var(--ink)}`, measured 14.383, and all three files sweep clean. Reintroduced
twice in `critical-four.html` at 3.862 (S-r2).

**m3 — muted on danger-tint, 3.99:1, a trap. → STILL OPEN.** Still unrendered, still absent from the
Don'ts (m-r7).

**m4 — focus and screen-reader behaviour asserted and demonstrated nowhere. → CHANGED.**
`guest-rsvp.html` demonstrates all of it, and demonstrates it well enough to serve as the template.
The other seventeen files still have zero `:focus`, zero `<button>`, zero `<a href>`, zero `role=` —
and `availability-icons-b.html` actively regresses by exposing 13 unnamed `image` nodes (S-r1, m-r5).

**m5 — verified sound, recorded so it is not re-opened. → CLOSED, and re-verified.**
The rating-chip scrim still gives white 6.610 over `placeholder-start` and 7.792 over
`placeholder-end`; both warm gradients still carry ink at 10.682–14.966 at every stop; the chosen
failure treatment is still contrast-clean at 8.279 / 6.744 / 14.844 / 8.279; `{colors.danger}` still
clears 3:1 as a border against both its tint (6.744) and the ground (8.065).

### New findings

**19 NEW:** C-r1, C-r2, C-r3, C-r4 · S-r1, S-r2, S-r3, S-r4, S-r5, S-r6 · M-r1, M-r2, M-r3, M-r4,
M-r5, M-r6 · m-r1 (in part), m-r3, m-r4, m-r6.

Six of them — C-r1, C-r2, C-r3, S-r2, S-r5, m-r1 — are regressions the remediation itself introduced.
That is the shape of this pass: the fixes were real and mostly correct, and the damage was done at the
edges of them, in the files written last and in the sentences that were not updated when the tokens
were.

---

## What would clear the gate

In order of user impact:

1. Fix the calendar hit area — free the `::after` on `.ask`, and cap the overlay at the column pitch
   (C-r1).
2. Redraw the pending mark in a colour that clears 3:1, and delete one of the two calendar treatments
   (C-r2).
3. Replace every Unicode state mark with the inline SVG already drawn, starting with the RSVP's
   `U+2713` (C-r3).
4. Build the RSVP count control and re-measure the fold with it in place (C-r4).
5. Carry the four artifact-only fixes into the spine: chip and search-field boundaries, the `lang`
   rule, the tab indicator, and the three stale Devanagari sentences (S-r3, S-r4, S-r5, S-r6).
6. `aria-hidden` on the 27 SVGs (S-r1); the seven reintroduced pairs in `critical-four.html` (S-r2).
7. The four untouched carry-overs: the two banned animation properties plus `critical-four`'s missing
   reduced-motion block (S-r8), the four `opacity` fades (S-r9), the reflow breakpoint (S-r7), and the
   frozen foil (M-r8).

Nothing on this list requires changing a palette value. The palette is still computed correctly, and
after two passes and one wholesale rewrite of the `availability-ring`, that has not once been in doubt.
