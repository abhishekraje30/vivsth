---
name: Vivah Spot UX — Reconciliation Contract
description: The single canonical answer for every place the two spines and the eighteen prototypes disagree, so three agents can each bring one artifact to it without consulting each other.
status: contract
updated: 2026-09-07
covers:
  - ./DESIGN.md
  - ./EXPERIENCE.md
  - ./.working/*.html
sources:
  - ./review-rubric.md
  - ./review-rubric-r2.md
  - ./review-accessibility.md
  - ./review-accessibility-r2.md
  - ./.memlog.md
---

# Reconciliation Contract

## Why this document exists

Two review passes produced ~94 findings. The fixes were applied by different hands to different
artifacts: a remediation agent could edit prototypes but not spines, and the author edited spines but
not prototypes. So they diverged repeatedly — the availability ring, the calendar treatment, the
Unicode glyphs, the Devanagari ramp, the chip and search boundaries, the tab indicator. Every one is
now *two artifacts, two answers* (`.memlog.md:115`).

**This document fixes nothing. It decides everything.** Three agents implement it, one artifact each:

| Agent | Artifact | Reads |
|---|---|---|
| **A** | `DESIGN.md` | Part 1 (canonical column), Part 2, Part 3 §A |
| **B** | `EXPERIENCE.md` | Part 1 (canonical column), Part 2, Part 3 §B |
| **C** | `.working/*.html` (18 files) | Part 1 (canonical column), Part 2, Part 3 §C |

No agent needs to read another agent's section, and no agent may change an artifact that is not
theirs. If an agent believes a canonical answer is wrong, it records the objection and implements the
answer anyway — a fourth divergent opinion is the failure this document exists to end.

## Precedence, in force for all three agents

1. **A `(decision by user)` line in `.memlog.md` is binding and is never overturned by a review
   finding.** Where a reviewer disagrees with one, this contract implements the decision and states
   how to satisfy the reviewer's concern *inside* it. Every such case is marked **[DECISION HELD]**.
2. This contract outranks both spines and every prototype.
3. `DESIGN.md` owns appearance; `EXPERIENCE.md` owns behaviour. Where both must state a fact,
   `DESIGN.md` states it and `EXPERIENCE.md` references it by token — never restates it. That rule is
   what caused half of Part 1 and is the only structural fix that prevents a third divergence.
4. **No palette value changes.** All eighteen colour tokens in `DESIGN.md:6–24` are a user decision
   (`.memlog.md:29`, `.memlog.md:65`) and stand. Every fix below re-points a *usage*, never a hex.

## Decisions held against a review finding

These reviewers asked for something a user already decided against. The decision wins.

| Decision | Recorded | Reviewer wanted | How the concern is met inside the decision |
|---|---|---|---|
| Availability ring: **solid / thin / dashed**, three treatments | `.memlog.md:101` | `M-r4` — drop dashed, or move `unstated` onto the width axis | Dashed stays. Add an exception clause to `DESIGN.md:609` (Part 1 §D4) and require the dash arc ≥2px with ≥2px gaps so it cannot average at 1× density |
| Availability icons: **Set B**, the calendar, cut twice | `.memlog.md:101`, `:102` | `M-r5` — Set A separated better by silhouette | Set B stays. Draw the small cut at 10px inside the 12px box and let the distinguishing mark break the body silhouette (Part 1 §D5) |
| Vendor calendar: **the underbar, a count not a texture** | `.memlog.md:106` | `C-r2` offers dots ●/○/× as an alternative | Bars win, dots die (Part 2 §2.4). The count carries the state; the colour is re-pointed (Part 2 §2.3) |
| Tab bar: **Home · Wedding · Shortlists · Enquiries · You** | `.memlog.md:52` | `m1`/`m-r2` — raise `tab` to 0.7rem by "shortening Shortlists or dropping to four destinations" | Five destinations stay, labels stay. The type-ramp floor is recorded as a stated limit, not actioned (Part 3 §C22) |
| Devanagari: **shown as written, never asked to declare a language** | `.memlog.md:31`, `EXPERIENCE.md:49–54` | `S7`/`S-r4` — set `lang` on the run | Compatible, not conflicting: the *script* is derived at render, the *person* is never asked. Adopted (Part 1 §D14) |
| Featured band heading is **"Featured"** | `.memlog.md:84` | `FR-20` risk — "Featured" signals special, not paid | Heading stays. The identifying line beneath it is non-optional and non-collapsible, and is what satisfies FR-20 |
| Guest count **revealed after Yes** | `.memlog.md:107` | — | Build it (Part 2 §2 note, Part 1 §D19) |
| Span pattern: **one card, days inside** | `.memlog.md:100` | — | `critical-four.html` §1 must stop advertising the rejected rail (Part 1 §D26) |

---

# Part 1 — Divergences

Twenty-six subjects on which two artifacts currently give different answers. **The canonical column is
the answer. Implement it; do not re-derive it.**

Line numbers are re-verified against the files as they stand (`DESIGN.md` 651 lines, `EXPERIENCE.md`
1129 lines). **The reviews' own line citations drift** — `review-rubric-r2.md` read a 642-line
`DESIGN.md` and its citations run ~8 low; `review-accessibility-r2.md` is 1–2 low on the Do's/Don'ts
table and ~8 low on `## Components`. Use the numbers in this table, not the reviews'.

| # | Subject | `DESIGN.md` says | `EXPERIENCE.md` says | Prototypes render | **CANONICAL** | Why |
|---|---|---|---|---|---|---|
| **D1** | Availability ring — stroke treatment | `:255–259` — all three strokes `{colors.muted}`; `free` 2px solid, `taken` 1px solid, `unstated` 1px dashed; separator is "stroke WIDTH and STYLE — never colour, never fill" | `:409` — "solid for *shows free*, thin for *shows taken*, dashed for *not stated*" — names no widths, and mixes two axes (solid/thin), so "thin" could be read as thin-dashed | `availability-signal.html:60–62` — `.g-y` 2px solid muted + gold-tint fill, `.g-n` 1px solid muted, `.g-u` 1px dashed muted | **`DESIGN.md:255–259` as written.** `EXPERIENCE.md:409` must stop restating the three treatments and instead reference `{components.availability-ring}` for them, keeping only the behaviour (three states, the copy, the third state is not a refusal) | The 14:09 correction (`.memlog.md:110`) already landed in `DESIGN.md` and the prototype; **`review-rubric-r2.md` N2 is stale and must not be re-applied**. What survives is that two documents still describe one geometry. One statement, inherited, is the structural fix |
| **D2** | Availability ring — the icon | `:264` — "inline SVG calendar, currentColor, aria-hidden. **NEVER a Unicode glyph**" | `:409` — "`{components.availability-ring}`'s calendar icon as a second signal" (silent on form) | `availability-signal.html:106,110,114,118,127,144` renders Unicode `✓` / `—` / `?`. The SVGs exist only in `availability-icons.html` and `availability-icons-b.html` | **Inline SVG, from `availability-icons-b.html` (Set B, two cuts).** `availability-signal.html` re-cuts its three rings with those SVGs. No Unicode | `DESIGN.md:607` and `:264` both forbid it; the drawing already exists, it simply was never carried into the file that ships the mark |
| **D3** | Availability ring — `aria-hidden` on the icon | `:264` requires it | `:794` requires the ring carry "a glyph, a weight change or a word in addition to their colour" — silent on ARIA | `availability-icons.html` 20 `<svg>`, **0** with `aria-hidden`; `availability-icons-b.html` 17 `<svg>`, **0** — yet both assert in prose that the icons are hidden. Chromium exposes 13 unnamed `image` nodes | **`aria-hidden="true" focusable="false"` on every `<svg>` in every file.** The word beside it is what is announced. Add the requirement to the new `availability-ring` prose entry in `DESIGN.md`, not only the token | `S-r1`. The spine is right and the artifact is wrong; a screen-reader user currently hears an unlabelled graphic before each availability phrase |
| **D4** | Availability ring — 1px dashed at a 16px diameter | `:259` mandates the dash; `:609` (Don'ts) bans "a texture — solid against dashed — anywhere below about 6px" | silent | `availability-signal.html:62` — `.g-u` 1px dashed | **The dash stays** — `.memlog.md:101` is a user decision. `DESIGN.md:609` gains an exception clause: *a circular 1px dash at ≥16px diameter is not the straight-bar case, because the arc length between gaps is set by circumference rather than by a repeat period; the dash must render ≥2px of arc with ≥2px gaps, and the word is always present as the third signal.* | **[DECISION HELD].** `M-r4`. The Don't was written for the 3px calendar bar and then not scoped; scoping it is one clause and costs nothing |
| **D5** | Availability ring — the small icon cut at 16px | `:266` — "<=20px — inner grid REMOVED, stroke 2.4" | silent | `availability-icons-b.html:145,148,154` — stroke 2.4/2.6 present, but the 12×12 drawing fills the 12px inner box edge to edge: drawn extents reach 6.23px against a 6px inner radius, so the icon corners sit on the ring stroke | **Set B stays. Draw the small cut at 10×10 inside the 12px inner box (1px of optical padding each side), and move the distinguishing mark so it breaks the body silhouette** rather than sitting inside it as an interior detail | **[DECISION HELD].** `M-r5`. `DESIGN.md:608`'s own Don't predicts the failure — "two icons that differ only by an inner detail stop differing at all". Set A is not reopened |
| **D6** | Availability signal — duplicated in Component Patterns | — | **two rows for one component**: `:409` is the full specification, `:412` is a three-word stub with a different `Use` column | — | **Delete `EXPERIENCE.md:412`.** Keep `:409` | `N15`. The old row survived the insertion of the new one. Two places to edit one fact |
| **D7** | Calendar treatment — bars vs dots | `:276–286` — `calendar-day-bar`: one solid bar (engaged), two countable segments (pending), no bar + struck number (unavailable) | `:426` — identical: "a **count, not a texture** … **one** solid bar … **two** countable segments … **no bar at all**" | **Two incompatible treatments ship.** Bars: `vendor-calendar-bar.html:65–72`. Dots: `direction-vendor-switch.html:192–194`, `direction-vendor-4.html`, `direction-vendor-desktop.html` — `\25CF` ● / `\25CB` ○ / `\00D7` × ; plus `critical-four.html:343` `✔` and `direction-home-screen.html:286` `●` | **BARS. The dots die.** See Part 2 §2.4 for the exact removal list | `.memlog.md:106` is a user decision and it chose the underbar. Both spines already agree. Only the prototypes dissent, and they dissent in banned Unicode |
| **D8** | Calendar pending bar — colour | `:281` — "TWO countable segments, **{colors.turmeric}**, 31% each side" | `:426` — silent on colour | `vendor-calendar-bar.html:70–72` — `background:var(--turmeric)` | **`{colors.vermillion}` `#E01B33` for BOTH bars.** See Part 2 §2.3 | Turmeric on surface recomputes **1.608:1** — a sixth of the 3:1 SC 1.4.11 floor, on the mark introduced to close a colour-alone finding. The count, not the colour, is the state |
| **D9** | Calendar hit area — the `::after` collision | `:286` — "centred 44x44 overlay; the visual box stays dense"; `:575` repeats it | `:806` — "Tap targets ≥ 44pt (iOS) / 48dp (Android). The Vendor portal holds the same floor" | `vendor-calendar-bar.html:49–50` defines the overlay on `.days b::after`; `:71–72` `.new .ask::after` (two classes) outranks it and takes the pseudo-element. Measured: plain day 44×44, `.eng` 44×44, **`.ask` 13.19 × 4px** | **The second segment gets its own element. See Part 2 §2.1** | `C-r1`. The one class of cell a Vendor must act on has no hit area at all |
| **D10** | Calendar hit area — pitch and centring | `:286`, `:575` claim a centred 44×44 | `:806` claims the floor holds | Measured: `direction-vendor-switch.html:183–184` reachable width **41.14px**, off-centre **2.86px left**; `vendor-calendar-bar.html` at a 284px column **37.44px**, off-centre **6.56px**; `elementFromPoint` at 284px — a tap on the visible right edge of "9" returns **"10"** | **The overlay is capped at the column pitch and centred on the visible cell. See Part 2 §2.2**, and the 360px grid question goes to Part 4 §Q1 | `C-r1`. An overlay wider than its pitch overlaps its neighbour, the later sibling wins the hit test, and the target silently moves off the thing it marks |
| **D11** | "vertical ones never overlap" | `:575` states it as a measurement | — | **False for the artifact that authored the component.** `vendor-calendar-bar.html` uses `.days b{aspect-ratio:1}` with `gap:2px`, so row pitch and column pitch are identically `cell + 2` and the two overlaps are equal at every width. It is a measurement of `direction-vendor-switch.html`, which has `min-height:44px` and `gap:4px`. `vendor-calendar-bar.html:156–158` repeats the false sentence verbatim | **Replace the claim with the geometric truth in `DESIGN.md:575`:** *with square cells and a uniform gap the horizontal and vertical overlaps are equal by construction; the overlay is safe only while the pitch is ≥44px.* Then state what happens below that (Part 4 §Q1). `vendor-calendar-bar.html:156–158` must carry the corrected sentence | `M-r1`. A stated measurement that measures a different file is worse than an assumption, because nobody re-checks it |
| **D12** | Unicode state marks | `:607` (Don'ts) bans them by codepoint; `:264` bans them for the ring | **silent** — no equivalent rule anywhere in 1129 lines | **Six files render them**: `guest-rsvp.html:527,530,533,539` (`U+2713`, `U+2717`, `?`); `direction-vendor-switch.html:192–194`, `direction-vendor-4.html:359–361`, `direction-vendor-desktop.html:347–349` (●○×); `direction-home-screen.html:185–187,286`; `critical-four.html:133,255,263,343`; `availability-signal.html:101,106,110,114,118,127,144` | **Inline SVG everywhere, `currentColor`, `aria-hidden="true"`.** Source drawings: `availability-icons-b.html`. `❁` ornaments stay — an ornament is not a state mark and is correctly `aria-hidden`. `EXPERIENCE.md` adds nothing; this is a `DESIGN.md` rule the prototypes must obey | `C-r3`. `U+2713` is the exact codepoint the rule names, for the exact reason it names — emoji presentation on Android puts an unchosen green tick into a system whose stated rule is that nothing means *good* by being green. The RSVP page is the highest-volume surface in the product |
| **D13** | Devanagari type ramp | **Contradicts itself.** Tokens `:74–78` `body-long-devanagari` 0.94rem / 400 / 1.9 and `:90–94` `review-devanagari` 0.92rem / 400 / 1.85, with a rationale note. Prose `:428` "Rules and reviews at **300**"; `:445` "Vendor Rules **0.84rem** at 1.85, reviews **0.82rem** at 1.8"; `:603` (Do's) "700 / 500 / **300** by role" | silent on sizes | `type-finalists-stress.html:82,101` renders `.rules p` at 0.84rem / weight 300 — **deliberately frozen**, because changing the specimen would erase the evidence the finding rests on | **The TOKENS win: 0.94rem/400 and 0.92rem/400.** `DESIGN.md:428`, `:445` and `:603` are rewritten to match. `type-finalists-stress.html` stays frozen as comparison evidence and gains a supersession header naming the token values that superseded it. **A new specimen file renders the current values** so 0.94rem/400 Inknut has been seen at least once | `S-r5`, carrying `S6`. `.memlog.md:98` records the token change and its reasoning; the prose was never brought along. Freezing a comparison file is right; leaving it uncaptioned is not |
| **D14** | `lang` on Devanagari runs | silent | silent — the Accessibility Floor `:792–819` lists eight bullets and this is not one | **108 of 108 Devanagari runs across six files are inside `lang="mr"`** — parsed, zero uncovered. A complete fix that exists only in throwaway HTML | **Add one bullet to `EXPERIENCE.md`'s Accessibility Floor** (after `:803`): *Devanagari runs carry `lang` derived from the script at render time — `mr` where the Place is Marathi-primary, else `hi` — set on the run, never on the page. The person is never asked to declare a language (SC 3.1.2).* Prototypes: no change, they are already correct | `S-r4`, carrying `S7`. **[DECISION HELD]** — `.memlog.md:31` decides content is never asked to declare a language; deriving the script from the Unicode block is not asking. This is the single highest-value line-for-line edit in the review set, and it is currently one attribute away from being lost |
| **D15** | Chip boundary | `:203` `border: '1px solid {colors.turmeric}'`; prose `:563` repeats it. Turmeric on surface **1.608** | silent — `chip` has **no Component Patterns row at all** | `direction-vendor-switch.html:92` — `.filt{background:var(--gold-tint);border:1px solid var(--muted)}`, measured **4.138** against the gold-tint fill, clearing the 3:1 non-text floor | **`{colors.muted}`.** Change `DESIGN.md:203` and the prose at `:563`. The gold-tint fill stays | `S-r3`. A builder implementing from the spine rebuilds the defect, and so will `packages/shared/src/tokens.js` when it is generated from this document |
| **D16** | Search-field boundary | `:213` `border: '1px solid {colors.hairline}'`; prose `:568` repeats it. Hairline on surface **1.267** | silent — `search-field` has **no Component Patterns row**, and search is a top-level element of Home (`:82`) and Service results (`:85`) | `direction-home-screen.html:164` `.search{border-color:var(--soft)}` **5.491**; `color-themes-1.html:90` and `directions-4.html:69` both `border:1px solid var(--soft)` | **`{colors.muted}`.** Change `DESIGN.md:213` and the prose at `:568` | `S-r3`. A text input with a 1.27:1 outline has no visible edge |
| **D17** | `span-card` boundary | `:301` `border: '2px solid {colors.turmeric}'` — **1.608** on surface, **1.567** on ground | `:798` — "a screen reader user must be able to tell it is one Selection covering two days"; the card exists to make one-ness perceivable | `critical-four.html` option B draws the same 2px turmeric border | **`{colors.muted}` as the card's boundary.** Turmeric may remain as a second, inner rule for warmth, but it may not be the only edge | `M-r3`. The card's *shape* is what carries the idea; its container edge is currently imperceptible and only the words inside it carry it |
| **D18** | Tab active indicator | `:237` `active-indicator: 'filled icon + weight, never colour alone'`; prose `:578–580` "vermillion **and** weight 600 **and** a filled rather than outlined icon. Three signals" | `:792–794` — generic: the active tab carries "a glyph, a weight change or a word in addition to their colour" | **Six files ship a different third signal**: a 3px indicator rule at 20%–80% width, `background:currentColor`, measured **4.801** non-text — `directions-4.html:239`, `direction-workspace-4.html:163`, `direction-home-screen.html:171`, `direction-family-record-3.html:129`, `direction-vendor-4.html:186`, `direction-vendor-switch.html:201`. The glyph is byte-identical at rest and active in all ten destinations | **The 3px indicator rule wins.** `DESIGN.md:237` becomes `active-indicator: '3px rule above the tab, 20%–80% width, {colors.vermillion} — 4.801 non-text on {colors.surface}. Plus weight 600. Never colour alone'`, and `:578–580` is rewritten to match. The filled/outline icon pair is **permitted but never required** once the icons become inline SVG (D12) | `S-r6`, carrying `S1`. Three signals is the requirement; which three is not a user decision. The rule is drawn, measured and already in six files; the filled/outline pair has never been drawn and would cost a second drawing per destination for a signal the rule already carries |
| **D19** | Guest count control | **no visual spec of any kind** — no stepper, no number input, no numeric control anywhere in the document | `:219` requires it: "Tapping *Yes* reveals a count control beneath the answers, **pre-filled with the household figure the Creator already recorded** … *No* and *Not sure* reveal nothing" | **Does not exist.** `guest-rsvp.html:150–154` records the gap deliberately: "UJ-5's HEADCOUNT HAS NO HOME … No count control is invented here; the gap is recorded instead" | **Build it, and specify it once in `DESIGN.md` as `stepper-count`:** `{colors.surface}` fill, `1px solid {colors.muted}` (4.892), `{rounded.none}`, min-height 48px; a visible `<label>` above in `{typography.body}` bound by `for`/`id`; a 48×48 square `−` and `+` flanking a keyboard-editable centre value in `{typography.price}`; minimum 1 (he said Yes); no platform maximum; both `−`/`+` glyphs inline SVG, `aria-hidden`, with accessible names on the buttons. Revealed only after *Yes*, pre-filled, announced on reveal. **`EXPERIENCE.md:219` gains one clause: the fold rule at `:217` is measured in the unanswered state, and the count may sit below the fold because by then the Guest has already acted.** `EXPERIENCE.md:219` must reference `{components.stepper-count}` | `C-r4` + `N14`. The spine gained the rule *after* the artifact was drawn and nothing closed the loop. This is the one requirement on the guest page that carries a form control, a pre-filled value, a label, an error path and a keyboard interaction — none of which the three-button page had to solve. **[DECISION HELD]** — `.memlog.md:107` |
| **D20** | Whether the PRD edits are owed | `:640` — correct: "NFR 5.10 **has been amended** (commit `76399ff`)" | **contradicts itself.** `:19` (top matter) — "both overrides … **need a PRD edit that has not been made**". But `:73–77` says "Both FRs have since been amended in the PRD (commit `76399ff`)"; `:268–271` says video "has since been written into FR-65 (`prd.md:1231`, commit `22167c6`)"; `:1116–1117` lists all of them as "amended and committed" | — | **Delete the false clause at `EXPERIENCE.md:19`.** The sentence becomes: *Two of its decisions override shipped FRs; both overrides are recorded in full below, and both FRs have since been amended in the PRD (commit `76399ff`).* | `N1`. Four of the five statements were corrected at 14:09 (`.memlog.md:111`); the top matter — the first thing a downstream consumer reads — was missed. **Verified against the current file: `:19` still carries it** |
| **D21** | AD-34's "one-time checkout per term" | — | `:343` quotes it as AD-34's wording to draw the banned-word rule from | — | **Re-source it.** `ARCHITECTURE-SPINE.md:409` now reads "the integration takes a single payment per term *(wording amended 2026-09-06: this read 'one-time checkout per term', and PRD §7.9 bans checkout across every downstream document)*". Cite the amendment note, or state the rule (the button says *Pay for the term* or *Renew*) without the quote | `N8`. The rule is right; the premise quotes a sentence that no longer exists |
| **D22** | `prd.md:1353` — the muted contrast lock | cited twice, `:365` and `:595`, both one line off | — | — | **Cite `prd.md:1354`, and name the bullet rather than only the line** so the next PRD amendment does not break the pointer again | `N19`. The §5.10 amendment shifted the section; `prd.md:1353` is now the *palette* bullet |
| **D23** | Function detail IA row vs the Span rule | `:299–309` — a Span "appears ONCE, as its own object, never repeated under each Function it serves" | **contradicts itself.** `:84` (IA table) — "One ceremony: … and **every Service serving it** with its state". But `:381` — "**A Span never appears under a Function**", and `:402` — "**Do not 'helpfully' echo a Span into its Functions.**" | — | **Qualify `EXPERIENCE.md:84`:** *…and every Service serving **it alone**, with its state. Spans appear once, in* Across the wedding*, above the Functions.* | `N5`. The IA table is where a builder starts, and it currently instructs the echo the pattern exists to remove |
| **D24** | Workspace IA row vs *Across the wedding* | — | `:83` still describes the Workspace as "the wedding organised by **Haldi / Wedding / Reception**: each Function opens to show which Services serve it" — no *Across the wedding*, no Spans, though `:387–391` requires the section to open the Workspace | — | **Add the clause to `EXPERIENCE.md:83`:** *…opening with* Across the wedding *(the Spans, priced once) then the Functions in date order.* | `N9`. The structural description of the surface the pattern lives on does not mention the pattern |
| **D25** | Flow 1 step 9 — a half-completed edit | — | `:942–943` — "**Shubhmangal Lawns appears under / Shubhmangal Lawns sits in Across the wedding**, above the Functions…" The old rail sentence was cut mid-clause and the replacement appended after it | — | **Delete "Shubhmangal Lawns appears under" from `EXPERIENCE.md:942`** | `N10`. This is the resolution beat of the flagship flow |
| **D26** | `critical-four.html` §1 heading names the rejected pattern | `:299–309` ships `span-card` (option B) | `:381` ships *Across the wedding* (option B) | `critical-four.html:169` is still headed **"1 · The Span continuation rail"** — option A's name — and the file is referenced nowhere, so a reader who opens `.working/` unprompted finds a document that appears to specify the rail | **Re-head it "1 · Where a Span lives" and mark option B as chosen inline.** Then link the file from `EXPERIENCE.md:374`, `:409`, `:426` and `:452`, naming which option won in each section | `N6`. Four of this revision's five decisions were made in this file and none of them can be traced to it. **[DECISION HELD]** — `.memlog.md:100` chose option B |

**Two review findings are stale and must NOT be re-applied.** `review-rubric-r2.md` was written at 14:07
against a `DESIGN.md` that was rewritten at 14:09.

- **N2 / §3-critical** — "`DESIGN.md` makes free and taken both 2px solid, separating them by colour
  alone". **Closed.** `DESIGN.md:255–259` now draws all three rings in `{colors.muted}` and separates
  by width and style. Confirmed independently by `review-accessibility-r2.md`'s non-text table
  ("fixed at 14:09") and by `availability-signal.html:60–62`.
- **N3, in part** — "the *shows free* ring is 1.57:1". **Closed for the ring** (now 4.892 on surface).
  **Open for the calendar bar** — Part 2 §2.3.

---

# Part 2 — The four pass-2 criticals

## 2.1 · C-r1a — the 44×44 overlay collapses to 13.19×4px on every "Enquiries pending" cell

**What is wrong.** `vendor-calendar-bar.html:49–50` puts the hit area on `.days b::after`.
`vendor-calendar-bar.html:71–72` puts the second turmeric bar segment on `.new .ask::after`. Two
classes outrank one, so the bar takes the pseudo-element the hit area needs.

```
plain day      ::after = 44 × 44px
.eng engaged   ::after = 44 × 44px
.ask pending   ::after = 13.19 × 4px      ← the overlay is gone
```

Every date a Vendor is being asked about — the one class of cell he must act on — falls back to the
42.58 × 42.58 visual box with no overlay at all.

**The technique that works.** Stop competing for one pseudo-element. A cell needs three drawn things
(two bar segments and a hit area) and has two pseudo-elements, so one of them must become a real
element.

**Specified fix — apply all four clauses:**

1. **The second segment gets its own element.** The pending cell's markup becomes
   `<b class="ask">9<i></i></b>`, and `.ask i` draws the right-hand segment. `::before` keeps the
   left-hand segment, `::after` keeps the hit area, and nothing collides at any specificity.
   *(Equivalent and also acceptable: draw both segments as one `::before` using a hard-stop
   `linear-gradient` — `linear-gradient(90deg, var(--vermillion) 0 42%, transparent 42% 58%,
   var(--vermillion) 58% 100%)` — leaving `::after` untouched. Prefer this where markup cannot
   change; it needs no extra node and is a single paint.)*
2. **`::after` is reserved, in one place, for the hit area, and the reservation is written down.**
   `DESIGN.md:286` becomes:
   `hit-area: 'a dedicated overlay element or ::after reserved for it alone; never shared with a state mark. The visual box stays dense'`.
3. **The rule is stated in `DESIGN.md`'s Don'ts** as a new row:
   *Do — give every state mark its own element or gradient stop | Don't — draw a state mark on the
   pseudo-element that carries a hit area. Specificity decides which one survives, and the one that
   loses is the one nobody can see is missing.*
4. **The three vendor prototypes are re-measured after the change** and each records its own
   `::after` box per cell class, the way `guest-rsvp.html` records its fold measurement.

## 2.2 · C-r1b — where the overlay survives it is off-centre and delivers column pitch, not 44px

**What is wrong.** A centred overlay wider than its cell overlaps its neighbours, and in the overlap
the later sibling wins the hit test. So each cell's *reachable* area is the column pitch, and it is
asymmetric about the visible number.

| Artifact | Cell | Col pitch | Reachable width | Offset from the visible centre |
|---|---|---|---|---|
| `direction-vendor-switch.html`, phone | 37.14 | 41.14 | **41.14** | 2.86px left |
| `direction-vendor-4.html` | 40.84 | 43.84 | **43.84** | 0.16px |
| `vendor-calendar-bar.html` at 334px | 42.58 | 44.58 | 44.00 | centred |
| `vendor-calendar-bar.html` at 306px | 38.58 | 40.58 | **40.58** | 3.42px |
| `vendor-calendar-bar.html` at 284px | 35.44 | 37.44 | **37.44** | 6.56px |

Probed with `elementFromPoint` at 284px: a tap **on the visible right edge of "9" returns "10"**, and
a tap on its visible bottom edge returns "16". The overlay buys at most `pitch − cell` of extra reach
— 4px — and pays with a silently mis-centred target on a grid of dates, where a mis-tap changes which
day the Vendor is looking at.

**Specified fix — apply all four clauses:**

1. **Cap the overlay at the pitch. It may never exceed it.** Replace the fixed
   `width:44px;height:44px` with `inset:-<gap/2>px` — i.e. the overlay expands by exactly half the
   gap on each side and no further. With `gap:2px` that is `inset:-1px`; with `gap:4px`,
   `inset:-2px`. No two overlays ever intersect, so the hit test never crosses a cell boundary and
   every target stays concentric with its own number.
2. **The 44px floor is then met by the *cell*, not by the overlay.** `min-height` / `min-width` of
   44px on `.days b`, exactly as `direction-vendor-switch.html:182` already does — the overlay is a
   convenience for the gap, never the mechanism that reaches the floor.
3. **`DESIGN.md:575` states the honest rule**, replacing both the "2.9px" sentence and the false
   "vertical ones never overlap" (D11):
   > The hit area is the cell itself at a minimum of 44×44, plus an overlay expanding into half the
   > gap on each side. **The overlay is never wider than the column pitch** — an overlay that
   > overlaps its neighbour hands the overlap to the later sibling and moves the target off the date
   > it marks. With square cells and a uniform gap the horizontal and vertical overlaps are equal by
   > construction. **Below a 44px pitch the overlay cannot reach the floor and the month must not
   > render as a grid** — see the fallback.
4. **The fallback below a 44px pitch is Part 4 §Q1**, because at 360px the grid is already below it
   and the memlog's "below 360px" escape hatch never fires on the target device.

## 2.3 · C-r2a — the turmeric pending bar is 1.608:1 and fails SC 1.4.11

**Recomputed** (sRGB linearisation, `L = 0.2126R + 0.7152G + 0.0722B`, `(L1+0.05)/(L2+0.05)`), not
carried from any review:

| Candidate | Hex | on `{colors.surface}` `#FFFFFF` | on `{colors.ground}` `#FFFCF2` | 3:1? |
|---|---|---|---|---|
| `{colors.turmeric}` — **current** | `#FFC300` | **1.608** | **1.567** | **FAIL** |
| `{colors.gold-tint}` | `#FFEBB0` | 1.182 | 1.152 | FAIL |
| `{colors.hairline}` | `#F6E2C2` | 1.267 | 1.234 | FAIL |
| **`{colors.vermillion}`** | **`#E01B33`** | **4.801** | **4.677** | **PASS** |
| `{colors.muted}` | `#8C6A50` | 4.892 | 4.766 | PASS |
| `{colors.shadow-tint}` | `#BE1E32` | 6.138 | 5.980 | PASS |
| `{colors.danger}` | `#8C2F1A` | 8.279 | 8.065 | PASS |
| `{colors.ink}` | `#2B0A0E` | 18.222 | 17.752 | PASS |

**Specified fix: `{colors.vermillion}` `#E01B33` — for BOTH the engaged bar and the two pending
segments. 4.801:1 on `{colors.surface}`, 4.677:1 on `{colors.ground}`. The count is the only
differentiator.**

Rejected, with reasons:

- **Turmeric, kept and darkened.** Rejected. A new hex is a nineteenth colour token, and the palette
  is a user decision (`.memlog.md:29`). No palette value changes.
- **`{colors.danger}` / `{colors.ink}` / `{colors.shadow-tint}`.** Rejected. `danger` is fenced by
  `DESIGN.md:393–399` to failure and destructive confirmation only — a pending Enquiry is neither.
  `shadow-tint` is defined as a shadow tint and reaches no component as a fill. `ink` is body text.
- **`{colors.muted}` at 4.892** — the marginally higher figure, and the reviewer's second option.
  Rejected on meaning: `{colors.muted}` is the de-emphasis colour and is already carrying the
  out-of-month day numbers in the same grid (`vendor-calendar-bar.html:51`), so a muted bar would
  read as *inactive* under the very days that most need acting on.

Why vermillion for both, rather than two colours:

- It applies the precedent the user already blessed. `.memlog.md:110` fixed the availability ring by
  drawing **all three states in one colour and separating them by geometry**, explicitly to "remove
  the colour question from that component entirely". The calendar bar is the same defect and takes
  the same medicine.
- It obeys `.memlog.md:106` literally — *a count, not a texture*, and now not a colour either. Two
  colours are a standing invitation for a builder to see the hue and drop the count.
- `DESIGN.md:374–378` forbids turmeric here on its own terms: turmeric "is the colour of the thing
  being celebrated, **never the colour of a thing to tap**", and a day with Enquiries pending is
  precisely a thing to tap.

**Carry it through, all five places:**

1. `DESIGN.md:280–281` — `engaged` and `enquiries-pending` both `{colors.vermillion}`; add
   `contrast: '4.801:1 on {colors.surface} — the count, never the colour, carries the state'`.
2. `DESIGN.md:283–285` — extend the note: *A count, never a texture, and never a colour. Both bars
   are drawn in one ink so nothing tempts a builder to drop the count.*
3. `vendor-calendar-bar.html:70–72` — `var(--turmeric)` → `var(--vermillion)`, and the legend swatch
   with it (currently a turmeric gradient at **1.567**).
4. **Geometry, because the count must survive the tight case.** The current segments are `left:15%
   width:31%` and `right:15% width:31%`, leaving an **8%** gap — 3.4px at a 42.58px cell, 2.8px at
   35.44px, which is inside the dash-averaging range `.memlog.md:106` rejected. Widen the gap to
   **12%**: `left:15% width:29%` and `right:15% width:29%`. Total bar stays ~70% of the cell; the gap
   becomes 5.1px at 42.58px and 4.25px at 35.44px, clear of the averaging threshold at every pitch at
   which the grid is permitted to render.
5. `EXPERIENCE.md:426` — no colour is stated there and none should be added; it must reference
   `{components.calendar-day-bar}` and stop describing the mark.

## 2.4 · C-r2b — two incompatible calendar treatments ship; specify which dies

**BARS LIVE. DOTS DIE.**

`.memlog.md:106` is a `(decision by user)` and it chose the underbar. Both spines already specify only
the bar (`DESIGN.md:276–286`, `EXPERIENCE.md:426`). The dots exist only in prototypes, they were never
in either spine, and they are drawn in the Unicode characters `DESIGN.md:607` bans outright — so they
lose on the decision, on the spine and on the rule, independently.

**Every place the dots must be removed:**

| File | Lines | What is there | Replace with |
|---|---|---|---|
| `direction-vendor-switch.html` | `:189–191` | the shared `::before` positioning block for the three marks | the `calendar-day-bar` rules: `.eng::before` one bar; `.ask::before` + `.ask i` two segments; `.blk` no bar |
| `direction-vendor-switch.html` | `:192` | `.eng::before{content:"\25CF"}` ● | one solid `{colors.vermillion}` bar, 4px tall, 70% of the cell, 3px from the foot |
| `direction-vendor-switch.html` | `:193` | `.ask::before{content:"\25CB"}` ○ | two `{colors.vermillion}` segments, 29% each, 12% gap |
| `direction-vendor-switch.html` | `:194` | `.blk::before{content:"\00D7"}` × | **no bar.** The struck-through number at `:195` already carries it |
| `direction-vendor-switch.html` | `:316–318`, `:403–405` | two legends whose `<i>` swatches are ●, ○, × | legend swatches that render the actual marks — one bar, two segments, a struck number — beside the three words |
| `direction-vendor-4.html` | the same `::before` block, and `:359–361` | ●, ○, × plus its legend | as above |
| `direction-vendor-desktop.html` | the same `::before` block, and `:347–349` | ●, ○, × plus its legend | as above |
| `critical-four.html` | `:343–345` | section 4's legend `<i>` swatches, including `✔` `U+2714` | the bar marks; and mark option B (the underbar) as chosen inline, since section 4 is the study this decision came from |
| `direction-home-screen.html` | `:286` | `&#9679;` ● in "27 November block locked" | an inline SVG mark, or drop the glyph and keep the words — this is a lock line, not a calendar state, but it is still a Unicode state mark under D12 |

**Nothing about the *colour* of the cell changes.** `.eng` keeps its vermillion fill, `.ask` its
gold-tint fill, `.blk` its hairline fill — `C4`'s original fix explicitly preserved that ("Keep the
colour — it is what makes the month scannable"), and the fills are what make a month readable at a
glance. What changes is that the second, non-colour signal becomes the bar rather than a Unicode
glyph.

---

# Part 3 — Every remaining finding, by artifact

Findings already settled in Part 1 or Part 2 are **not** repeated here; where a finding spans both, a
pointer is given. Finding ids: `R#n` = `review-rubric.md` (pass 1, numbered as in
`review-rubric-r2.md`'s reconciliation tables); `N-n` = `review-rubric-r2.md`'s new findings;
`C-rn / S-rn / M-rn / m-rn` = `review-accessibility-r2.md`; bare `C1…m5` = `review-accessibility.md`
(pass 1), cited where r2 carries them.

## §A — `DESIGN.md` · 25 findings

| id | source | sev | location | the change |
|---|---|---|---|---|
| **A1** | `R#6` / rubric-r2 §2 | high | `:161`, `:193`, `:225` use `elevation-2` / `elevation-1` as literal values; the three CSS values live only in prose at `:491–498`. Top-level frontmatter keys confirmed: `colors, components, description, name, rounded, spacing, status, typography, updated` | Add an `elevation:` frontmatter group carrying the three values verbatim from `:491–498`, and change the three component entries to `{elevation.1}` / `{elevation.2}`. A machine extractor currently mirrors the literal string into `tokens.js` |
| **A2** | `R#7` / rubric-r2 §2 | high | `fontFamily: system-sans` on nine roles — `:65`, `:70`, `:86`, `:96`, `:101`, `:106`, `:117`, `:127`, `:133`. The real stack is prose-only at `:438–440` | Put the literal stack in the frontmatter on each role, or add one `note:` naming it once and referenced by the nine. `system-sans` resolves to nothing |
| **A3** | `R#8` | medium | `:557–558` — the vendor card's rating chip sits "on a `rgba(0,0,0,0.6)` scrim" over an arbitrary photograph, with no label colour and no contrast target | Name the label colour and the floor the scrim is sized to hold. Verified sound at the two worst gradient stops (white over the scrim: 6.610 and 7.792 — `m5`), so this is a statement to write, not a value to change |
| **A4** | `R#9` + rubric-r2 §2 | medium | `:219` (`search-field.focus-ring`) and `:570–573` are the only focus specs; `button-choice` `:287–298` carries no focus value at all — and it is the guest RSVP's three peers, the surface where focus does the most work | State the ring's non-text floor (≥3:1) and name the one fill it may not sit on. Add `focus-ring` to `button-choice`. Vermillion clears ground 4.677, surface 4.801, gold-tint 4.061, danger-tint 3.911 — recomputed; all pass 3:1 |
| **A5** | `R#13` / `M-r7` | high | `:201–210` — `chip` is defined as the *filter* chip (gold-tint fill, turmeric border, vermillion when selected). `EXPERIENCE.md:703–704` requires a per-card `Featured` chip as one of three non-colour signals carrying FR-20 | Add two components. **`badge-paid`** — `{colors.surface}` fill, `1px solid {colors.muted}`, `{colors.ink}` label at `{typography.meta}`, **`{rounded.none}`** (square, so it cannot be mistaken for the one pill in the system, `:523–526`), the literal word *Featured*. **`featured-band`** — a bounded container with `1px solid {colors.muted}`, the heading, and the non-collapsible identifying line. A Featured chip built from `chip` reads as a selected filter |
| **A6** | `R#14` | high | nothing in `## Components` describes the **Function card**, the Workspace's primary object, whose three row states each require "a glyph **and** a word" (`EXPERIENCE.md:410`) | Add it, with its three row states and its relationship to the *Across the wedding* section above it — it is now the object that must **not** show the Span |
| **A7** | `R#16` | medium | the empty-state anatomy is explicitly salvaged at `EXPERIENCE.md:853` — "Circular icon → heading → one sentence → one button, capped and centred" — and has no component in either spine | Promote the anatomy to a component even while the per-surface strings stay open (OQ6 / `EXPERIENCE.md` OQ3) |
| **A8** | `R#17` | medium | the vendor portal's **lens switch** and **left rail** are load-bearing structural components with no entry. The switch carries a count (`Inbox · 3`, `EXPERIENCE.md:157`) with no spec of how the count renders | Add both. The switch's container border is already drawn at `1px solid var(--muted)` (4.892) in `direction-vendor-switch.html` — carry that value in |
| **A9** | rubric-r2 §3 | medium | the guest count control has no visual spec of any kind — no stepper, no number input | **See Part 1 §D19** for the full `stepper-count` specification |
| **A10** | `R#33` | high | `:457–463` declares "a plain 4px grid that the existing values round onto without visible change" and sets 4/8/12/16/24/32/48; `:469–471` then specifies a 13px row gap, a 6px column gap, an 11px card gap, and 20px/11px around section heads. Three of four are off the grid and none is a token | Round them onto the scale — which the section claims is lossless — or drop the grid claim. Do not leave both |
| **A11** | `R#34` + `N18` | high | half-tokenised component padding: `:160` `'{spacing.4} 15px 15px'`, `:178` `'{spacing.2} 14px'`, `:206` `'{spacing.1} 10px'`, `:231` `'7px {spacing.1} 9px'`, `:243` `'{spacing.3} 13px'`, `:303` `'{spacing.3} 11px'`; plus `:253` `size-large: 40px` (the scale has 32 and 48), `:279` `offset: 3px`, `:278` `width: '70% of cell'` (prose in a token slot) | Tokenise, or state **once** — in Layout & Spacing — that component dimensions are deliberately hand-tuned and off-scale. The half-tokenised form is worse than either pure alternative, and it spread into three of the five new components |
| **A12** | `N20` | medium | edit-scar run-on sentences: `:399` (~380 chars, the danger-token naming rationale), `:477–481` (~400 chars, the three-region correction spliced in), `:549` (the Save scoping spliced into the middle of the button-label list) | Break each into two or three sentences. Every one is a correct fact in a sentence nobody will read to the end of |
| **A13** | `R#45` | medium | no `sources:` frontmatter key. Provenance — `styles.css`, `.working/extract-*.md`, the memlog, the published site — exists only in prose | Add `sources:`. `EXPERIENCE.md:7–10` does this correctly, and D20/D22 are the concrete cost of not doing it |
| **A14** | `R#44` | medium | one component, three names: `price-unestimated` (`:310`), "**Not yet estimated**" (`:585`), `"not yet estimated"` (`EXPERIENCE.md:428`), referenced as `{components.price-unestimated}` at `EXPERIENCE.md:634` and by prose name in three others | One name in all five places |
| **A15** | `R#47` | low | "Invitation card" (`:533`) vs "Invitation card strip" (`EXPERIENCE.md:62`, `:408`) — two names for the product's signature object | Pick one; `DESIGN.md` states it, `EXPERIENCE.md` inherits |
| **A16** | `R#46` + `N12` | medium | six of the fifteen frontmatter components have no `## Components` prose entry — `banner-failure`, `availability-ring`, `skeleton`, `calendar-day-bar`, `button-choice`, `span-card`. `banner-failure` is described inside the Colors section (`:393–405`) instead; `Calendar day cell` (`:575`) specifies the hit area, not the bar | Add all six. `## Components` currently describes 10 of 15 objects and four of the five newest are absent, so a consumer reading it as the inventory misses a third of the system. The `availability-ring` entry must carry the `aria-hidden` requirement (D3) |
| **A17** | `R#49` | low | `:434–436` says "`apps/mobile/tailwind.config.js` already declares `Playfair Display` with **no font file behind it**". Verified: the config sources `fontFamily: { heading: [fonts.headingFamily] }` from `@vivahspot/shared/tokens` | Say "via `packages/shared/src/tokens.js`". Substance correct, sentence one indirection off |
| **A18** | `M-r9` / `M4` | moderate | `:543–544` specifies the first-run empty card — `— & —` and `0 OF 5` — and assigns the dashes **no colour token**. The only rendering, `directions-4.html:114`, uses `#C8BCA9` at **1.871:1** | Name the token: `{colors.muted}` at full strength — recomputed **4.892** on surface, **4.766** on ground. It matches the rule already governing every other open fact on the card. The "nothing here yet" signal on the first screen a new user sees is currently the least legible thing in the system |
| **A19** | `m-r7` / `m3` | minor | the Don'ts row at `:597` lists the gold-tint traps but not `{colors.muted}` on `{colors.danger-tint}`, recomputed **3.985:1**. The banner is a tinted surface and `{typography.meta}` is muted by default, so the first timestamp added to a banner fails silently | One clause in the existing row: *…or `{colors.muted}` on `{colors.danger-tint}` (3.99:1)* |
| **A20** | `m-r1` | minor | `:364` prints "4.76:1 … (recomputed here at 4.77:1 — rounding; both clear the floor)" as if two computations; `:595` prints 4.76 again. Recomputed: muted on ground is **4.766**, which rounds to **4.77**. One value, one wrong rounding | Print **4.77** in both places and delete the two-figures sentence at `:364`. Nothing else in the Colors section changes |
| **A21** | rubric-r2 mechanical | low | `:4–5` — `status: draft`, `updated: 2026-09-06`. Actual mtime 2026-09-07, across two revision rounds | `updated: 2026-09-07`. Leave `status` for the author |
| **A22** | rubric-r2 §3 | low | the *Across the wedding* section header is a new named structural element of the Workspace with no `{typography.…}` assignment | Assign it — `{typography.heading-section}` is the obvious candidate — in the `span-card` note or in Layout & Spacing |
| **A23** | `R#40` | low | Open Questions 2, 5 and 6 duplicate `EXPERIENCE.md`'s 1, 9 and 3. Four facts, two places each to edit — and that duplication is exactly what propagated the false PRD claims | Keep each question in one spine and cross-reference. `DESIGN.md` keeps the visual ones |
| **A24** | `R#10` | low | `on-turmeric` is the only colour token no component entry reaches; `foil`, `shadow-tint` and the two gradients reach components only as literal strings | **No action required.** Recorded so a token-diffing tool is not surprised |
| **A25** | `N1`, `DESIGN.md` half | — | `:640` — OQ5 now correctly reads "NFR 5.10 **has been amended** (commit `76399ff`)" | **Verified closed. No action.** The `EXPERIENCE.md` half is still open — Part 1 §D20 |

## §B — `EXPERIENCE.md` · 36 findings

| id | source | sev | location | the change |
|---|---|---|---|---|
| **B1** | `R#2` | high | Flow 4 (`:1023–1044`) ends at Rutuja's count moving. `prd.md:183` is explicit — "He taps the quiet line, and starts a Wedding of his own… **This is the only growth channel designed into the product**" | Add a step 7 covering where the growth line's tap lands and what it carries from the invitation he just answered |
| **B2** | `R#3` | high | FR-31 ("Seeing where the year is empty") is cited nowhere. Grep for *drawing no interest*, *where the year is empty*, *empty Slot* returns zero across 1129 lines. The capability was never re-homed after Calendar was demoted from a destination to a lens | Place it in **Performance** or in the **Calendar lens**, and say which |
| **B3** | `R#4` | medium | UJ-4 path step 5 — Kiran configuring a new Service (`prd.md:157`) — has no step in Flow 5 (`:1051–1078`) | One line saying the act happens in Frappe Desk and lands on no designed surface (AD-2). The omission is probably right; it is silent rather than stated |
| **B4** | `R#5` | low | flows run 1·2·3·5·4 — Flow 4 is UJ-5 (`:1023`), Flow 5 is UJ-4 (`:1051`) | Reorder or renumber |
| **B5** | `N11` | medium | Flow 4 step 4 (`:1037`) still reads only "He says yes — four of them travelling" — the sentence that motivated the count control now decided at `:219` | One clause in step 4 showing the reveal and the pre-filled figure |
| **B6** | `N13` | medium | `button-choice` is named nowhere in `EXPERIENCE.md` — grep returns one hit total, the `DESIGN.md` frontmatter definition. The behaviour exists at `:220` but never references the component, never states the 48px floor, never says where else equal peers may occur | Reference `{components.button-choice}` from `:220`, as the other four new components are referenced |
| **B7** | `R#19` | high | **no search-empty / no-results state.** Grep for *no results*, *no matches*, *nothing matched*: zero. Home carries a search field (`:82`) and Service results carry per-Service filters (`:85`) | Add a State Patterns row for Service results with zero matches and one for search with zero matches, and say whether filters are offered back. Distinct from "Empty Shortlist" (`:441`), which is covered |
| **B8** | `R#20` | high | **the Guest pages have no failure, offline or dead-link state.** The Offline row `:453` scopes itself to "Everywhere in the Family app and the Vendor portal", explicitly excluding the two public surfaces. And the surface gained a **count control** since, so it has a second failure mode | Add rows for expired/revoked link, rate-limited, and RSVP submission failure (including a submission failure carrying an adjusted count). A Guest has no account, no app and no route to ask |
| **B9** | `R#21` | high | empty states are an acknowledged hole (OQ3, `:1091`) rather than a covered one. The IA implies more than the three named: Boards, the Enquiries tab, Guest list, Function detail with no Services, Vendor Listings, Real Weddings with none published, You | Specify the shared anatomy (see §A7) and let per-surface copy stay open. The document's own judgement applies — "an empty screen is the worst first impression a paid tool can give" |
| **B10** | `R#22` | medium | permission-denied is covered for push only (`:593–600`, which is excellent). FR-11 names contacts as a guest-list import route (`:613` — "taken from her contacts") with no permission state; portfolio upload and Board image save need camera and photo-library permission. Grep for *camera*: zero | Add the rows. Contacts matters most — it is a named path in a decided section |
| **B11** | `R#23` | medium | focus has no State Patterns row. Asserted at `:808` and specified visually for `search-field` only. Vendor cards, chips, medallions, tab items, the compare tray, the lens switch and the three `button-choice` peers have none | One row stating the global treatment and its exceptions |
| **B12** | `R#24` | medium | `:771–772` — "six digits, valid ten minutes, five attempts, three resends per hour — the screen must express those limits" — and does not say how. Code expired, attempts exhausted and resends exhausted are three distinct dead ends on the only auth surface in the product | Add the three states |
| **B13** | `R#25` | medium | the Vendor's own Grace Period state is missing. The Family side is covered by "Listing leaves discovery" (`:448`); the Vendor's thirty-day Grace with reminders at 30/14/7/1 days appears only in Channels routing (`:567`), with no portal state | Add in-Grace and post-Grace rows. Given "the reminder **is** the renewal mechanism", this is the surface the business model runs on |
| **B14** | `R#26` | low | Real Weddings (`:234`) and Reels (`:266`) get major sections and Real Weddings "appears inside the app as inspiration", but neither appears in the Family app IA table (`:80–95`) and no surface links to them | Add IA rows with a `Reached from` value, or state that placement is open |
| **B15** | `N16` | medium | the Cold load row (`:452`) scopes itself to "Every surface" and specifies the treatment — the important half — but does not say whether cached content renders first and is then refreshed, or whether every surface skeletons from cold. That decision differs between Home (heavily cacheable), Service results (seeded per session, AD-22) and the Workspace (money, AD-19) | One clause per surface class |
| **B16** | `R#15` | medium | `button-primary`, `button-celebration`, `chip` and `search-field` have no Component Patterns row (table verified: 22 rows, none of the four). **Search is the consequential one** — a top-level element of Home (`:82`) and Service results (`:85`), realising FR-18, and no spine says what it searches over, whether it is scoped to a Service, what happens on submit, or what it does with no matches. FR-18 is uncited in either spine | Add all four rows. Search is not optional |
| **B17** | `R#16` | medium | the empty-state anatomy has no behavioural counterpart | Add the Component Patterns row referencing the new component (§A7) |
| **B18** | `R#17` | medium | the lens switch and the left rail have no Component Patterns row, though the switch is what makes Enquiries "one surface rather than two" (`:150`) and now carries a count (`:157`) | Add both rows |
| **B19** | `R#43` | medium | three UJ names truncated in Key Flow titles: UJ-3 loses "and the reviews become worth reading" (`:996` vs `prd.md:121`), UJ-5 loses "and finds his own daughter's wedding" (`:1023` vs `prd.md:172`), UJ-4 loses "opens a Service" (`:1051` vs `prd.md:148`). In two of three the dropped clause corresponds to a beat the flow also omits (B1, B3) | Restore the full names |
| **B20** | `R#48` | low | `:54` and `:366` cite "AD Conventions §i18n" and "AD Conventions §Errors". The section is titled **"Consistency Conventions"** (`ARCHITECTURE-SPINE.md:442`) | Use the real name. Content is accurate |
| **B21** | `R#35` | high | editorial voice the rubric reserves for `DESIGN.md`, verbatim and unchanged: "the highest-risk pattern in this document" (`:374`), "Confusing them is the most damaging mistake available on this surface" (`:724`), "a dashboard that only looks good stops being believed" (`:983`), and — self-referential — "This document's *State Patterns* section is longer than the site's entire error vocabulary, and that ratio is the point" (`:896–897`) | Keep the emphasis that ranks risk; cut the commentary about the document |
| **B22** | `R#36` | medium | each of the five Key Flows opens with a persona paragraph restating `prd.md` §2.2 near-verbatim; Flow 1's opener (`:911–915`) reproduces ~50 consecutive words from `prd.md:71` | Cite the UJ and start at step 1 |
| **B23** | `R#37` | medium | "The Service Catalogue Is Configuration, Not Design" (`:651–682`) spends ~35 lines arguing whether *Invitations* and *Pandit / Priest* belong, then concludes in OQ11 (`:1126`) that "it changes nothing in this document either way". The actionable content is the four-row rule table at `:673–678` | Keep the table and the medallion correction at `:680–682`; move the argument to the memlog |
| **B24** | `R#38` | medium | "Roles and What Each May Do" (`:754`) and "Reviews and the Record Each Side Holds" (`:721`) restate FR-2/4/5/6 and FR-46/47/48 around their genuine decisions | Keep the decisions, cite the FRs for the rest |
| **B25** | `R#39` / `N-rubric §6` | medium | the Reels subsection (`:266–294`) is ~30 lines including its cost analysis. Its scope premise has **inverted** — `:268–271` now correctly records the PRD change as made, so it is oversized rather than out-of-scope | Compress to the decision and the disclosed-ordering rule; move the cost analysis to the memlog. **Note: `:270` is already corrected. Do not "fix" it back** |
| **B26** | `R#27` | high | `direction-home-screen.html` is what resolved the home-screen decision by looking (`.memlog.md:20`) — the decision that overrides FR-10 and FR-68 — and `:62–78` states the override without linking it | Inline link at `:62–78`, with the caveat that the file carries a **provisional placeholder skin**, not the Kumkum palette: it is a *structural* reference only |
| **B27** | `R#27` | high | `direction-vendor-4.html` and `direction-vendor-desktop.html` (`.memlog.md:54`, `:56`) are the studies behind the Enquiries-with-two-lenses decision; `:141–161` states it without linking either | Inline links at `:141–161` |
| **B28** | `R#28` | high | `direction-vendor-switch.html` (the lens switch) and `direction-family-record-3.html` (the three moments at which the Family learns what a Vendor recorded) are the only renderings of two patterns specified in prose and nowhere visually. Both orphans | Link at `:146` and `:740` |
| **B29** | `N6` | high | `critical-four.html` — the options study behind four of this revision's five decisions — is referenced nowhere | Link at `:374`, `:409`, `:426` and `:452`, naming what each section shows and which option won. See Part 1 §D26 for the heading fix |
| **B30** | `N7` | high | `availability-icons-b.html` is the sole evidence for `DESIGN.md:265–266`'s two-cut icon system (verified: `stroke-width="1.7"` and `"2.4"` both present at two optical sizes), and `vendor-calendar-bar.html` is the sole evidence for the count-not-texture rule. Neither is referenced | Link both — from `:409` and `:426` respectively. These are the two most specific, least self-evident claims in the new frontmatter |
| **B31** | `R#29` + `R#30` | medium | no composition reference anywhere; all six existing references are argumentative. `directions-4.html` remains a set of directions with nothing saying which was chosen | Add a composition-reference line to the Family app IA and Vendor portal IA sections, and name the chosen direction (D1, the Invitation — `.memlog.md:26`) in `DESIGN.md` |
| **B32** | `R#31` | low | `:680–681` names `directions-4.html`, `color-themes-1.html` and `direction-workspace-4.html` without the `.working/` prefix used elsewhere; `:418` references `compare.html` with no path (repo root — verified present) | One prefix form throughout; qualify `compare.html` as a repo-root file |
| **B33** | `R#32` | low | the two Devanagari pairing mocks are orphans though `DESIGN.md:422–429` makes a substantive comparative argument they are the evidence for. `.memlog.md:35` records that `type-devanagari-pairing.html` **requires network** while every other artifact renders offline | Link both with the network caveat |
| **B34** | `N17` | medium | `guest-rsvp.html` is cited at `:217` as evidence for the fold, which reproduces exactly — but the file predates the count-control decision and argues against it at its own `:150–154` | Once the control is built (Part 1 §D19), re-measure and update `:217`. Until then, add a supersession note at `:217`: the measured figures predate the control and still hold, because the control appears only after the answer |
| **B35** | `m-r3` | minor | `:806` sets "≥ 44pt (iOS) / **48dp** (Android)" with no inline-text exemption. Measured on the guest page: `.growth a` is **74 × 15px**, `.obligations a` are **144 × 44** and **94 × 44** | Write the exemption explicitly, mirroring WCAG 2.2 SC 2.5.8: *an inline link inside a run of text is exempt; a standalone control is not.* Then the two obligation links must reach 48px (§C21) and the growth line's call to action must become a block-level target |
| **B36** | rubric-r2 mechanical | low | `:5` — `updated: 2026-09-06`; actual mtime 2026-09-07 across two revision rounds | `updated: 2026-09-07` |

## §C — `.working/*.html` · 22 findings

Prototype-wide rules first, then per-file.

**Rule C-0 — supersession, not silent update.** A file whose purpose is to record a comparison or a
rejected option is **evidence** and must not be quietly brought up to date; a file that specifies a
live pattern must be. Every file in the first class gains a header block naming what it predates and
which decision superseded it. First class: `directions-4.html`, `color-themes-1.html`,
`type-devanagari-pairing.html`, `type-devanagari-pairing-2.html`, `type-finalists-stress.html`,
`availability-icons.html`, `direction-home-screen.html` (provisional placeholder skin — structural
reference only). Second class: everything else. **Contrast and accessibility defects are fixed in
both classes**; only *design* content is frozen in the first.

| id | source | sev | location | the change |
|---|---|---|---|---|
| **C1** | `C-r1` | critical | `vendor-calendar-bar.html:49–50`, `:71–72` | **Part 2 §2.1** |
| **C2** | `C-r1` | critical | `vendor-calendar-bar.html:49–50`; `direction-vendor-switch.html:183–184`; `direction-vendor-4.html:170`; `direction-vendor-desktop.html:158` | **Part 2 §2.2** — `inset:-<gap/2>px`, never a fixed 44px box |
| **C3** | `C-r2` | critical | `vendor-calendar-bar.html:70–72` and its legend swatch | **Part 2 §2.3** — vermillion, 29%/12%/29% |
| **C4** | `C-r2` | critical | `direction-vendor-switch.html:189–195,316–318,403–405`; `direction-vendor-4.html:359–361`; `direction-vendor-desktop.html:347–349`; `critical-four.html:343–345`; `direction-home-screen.html:286` | **Part 2 §2.4** — the dots die |
| **C5** | `C-r3` | critical | six files, listed at Part 1 §D12 | Replace every Unicode state mark with the inline SVG from `availability-icons-b.html`. Keep `❁` |
| **C6** | `C-r4` | critical | `guest-rsvp.html` — absent; the gap is recorded at `:150–154` | Build `stepper-count` per Part 1 §D19, revealed only after *Yes*, and **re-measure the fold with it in place** — it lands inside the current 98px of headroom |
| **C7** | `S-r1` | serious | `availability-icons.html` — 20 `<svg>`, **0** with `aria-hidden`; `availability-icons-b.html` — 17 `<svg>`, **0**. Both assert in prose (`:246` / `:225`) that the icons are hidden. Chromium's tree exposes **13 unnamed `image` nodes** | `aria-hidden="true" focusable="false"` on every `<svg>` in every file |
| **C8** | `S-r2` | serious | `critical-four.html` reintroduces the two banned pairs seven times: `.fh .d span` muted-on-gold-tint at **8.96px** (recomputed 4.138); `.fh .nm span` × 4 at 10.88px (4.138); legend `i` at 9.6px (4.138); `b.blk` muted-on-hairline at 11.84px (**3.862**); legend `i` at 9.6px (3.862) | `{colors.ink}` on both fills — recomputed **15.412** on gold-tint and **14.383** on hairline. The 8.96px instance is the worst: a date, below the legibility floor, at 4.14:1. Every *token* used is legal; the *pairing* is not |
| **C9** | `S-r7` / `M7` | serious | **no `@media` rule in any vendor prototype.** At 320px `direction-vendor-switch.html` `.win` clips 520 → 284 (content unreachable) and `direction-vendor-desktop.html` clips 536 → 284. At a 32px root, `scrollWidth` exceeds a 320px viewport in eight files: vendor-switch 397, vendor-desktop 343, vendor-4 348, workspace-4 348, critical-four 388, availability-signal 404/472, vendor-calendar-bar 378 | Add the breakpoint, make both rails shrinkable, re-test at 320px and at 200%. `EXPERIENCE.md:830` asserts the ≥768px behaviour and nothing demonstrates it. **`guest-rsvp.html` is the one file that passes both** (`scrollWidth` 360 = `clientWidth` 360) — its container-query approach is the template |
| **C10** | `S-r8` / `M1` | serious | animating properties `DESIGN.md:600` bans: `color-themes-1.html:88` and `directions-4.html:132` — `@keyframes foil{…background-position:170% 0 → -70% 0}`; `directions-4.html:213` — `@keyframes fill{…width:60% → 100%}` | Foil → `translateX` on an absolutely positioned overlay. Meter → `scaleX` with `transform-origin:left`. Both are direct substitutions. **This is a defect, not design content — fix it despite C-0** |
| **C11** | `S-r8` | serious | `critical-four.html:108` (`@keyframes sh`, translateX sheen, 1.5s infinite) and `:114` (`@keyframes sp`, rotate 360deg, 0.9s infinite). Both transform-only, which is right — but the file contains **no `prefers-reduced-motion` block at all**, against `DESIGN.md:275` (`skeleton.reduced-motion`) and `EXPERIENCE.md:452`. Only 3 of 18 files carry one: `color-themes-1`, `directions-4`, `guest-rsvp` | Add the block. The skeleton is the component `DESIGN.md` already writes the rule for |
| **C12** | `S-r9` / `M3` | serious | the back-door fade `DESIGN.md:595` names by hand, now in four files: `color-themes-1.html:79` `.inv .ln.todo{color:var(--soft);opacity:.75}` — **the chosen theme**, recomputed **3.040** on surface (and **2.996** on ground); `directions-4.html:121` `.ln.todo{color:#BBAE9C}` — **2.177**; `type-devanagari-pairing.html:69` and `type-devanagari-pairing-2.html:69` at `opacity:.8` — recomputed **3.319**. The last two are new since pass 1; the pattern is propagating as each mock is copied from the last | `{colors.muted}` at full strength in all four. **Fix despite C-0** — it is the defect the rule exists to stop travelling |
| **C13** | `M-r1` | moderate | `vendor-calendar-bar.html:156–158` repeats `DESIGN.md:575`'s false "vertical ones never overlap" verbatim, and the artifact is pinned at `width:334px` so it never renders the 284px case the sentence describes | Carry the corrected sentence from Part 1 §D11, and add a second rendering at 284px so the claimed case is actually shown |
| **C14** | `M-r2` | moderate | `guest-rsvp.html` clones its template into three device frames, so the document holds three `<h1>`, three `<h2 id="q">` and three `role="group" aria-labelledby="q"`. `querySelectorAll('#q').length` returns **3**. Duplicate ids are SC 4.1.1 Parsing, **Level A** | Generate the id per instance, or drop `aria-labelledby` and wrap the group in `<fieldset>`/`<legend>`. One `<h1>` per document. The product will instantiate this template more than once per page too |
| **C15** | `M-r3` | moderate | `critical-four.html` option B draws the same `2px solid turmeric` span-card border, recomputed **1.608** on surface | `{colors.muted}` — recomputed **4.892**. Same change as Part 1 §D17 |
| **C16** | `M-r5` | moderate | `availability-icons-b.html` — `.r16` is 16px with a 2px border, so the inner box is 12px and the small-cut SVG is drawn at 12 × 12, 100% of the area. Drawn extents reach 6.23px against a 6px inner radius: the icon corners sit on the ring stroke | Draw the small cut at **10 × 10** inside the 12px box, and move the distinguishing mark so it breaks the body silhouette. **[DECISION HELD]** — Set B is not reopened (Part 1 §D5) |
| **C17** | `M-r6` | moderate | `guest-rsvp.html` — `.recorded` carries `role="status" aria-live="polite" tabindex="-1"` **and** `record()` calls `rec.focus()`, so the answer is announced twice. `Change your answer` lives *inside* the live region, so later changes to that subtree announce too. Separately, `line.textContent` is rewritten outside any live region — a visible change with no announcement | Choose one mechanism. Keep `tabindex="-1"` and `.focus()`, drop `role="status"`/`aria-live` — the user just acted, so moving focus is the stronger pattern. Move the button outside the announcing region. Fold the changed line's new wording into the focused element |
| **C18** | `M-r7` / `M6` | moderate | `grep -ic "featured\|paid placement"` returns **0 across seventeen of eighteen files**; the two hits in `direction-home-screen.html` are the "Featured near you" browse rail, which is the anti-pattern `EXPERIENCE.md:702` names. The chip's **selected state** and its leading check glyph — the entire reason selection is not carried by colour alone — have still never been drawn (`DESIGN.md:565`) | Draw both: the Featured band with its three non-colour signals (bounded container, heading, per-card `badge-paid` — §A5), and the chip's selected state with the leading check as **inline SVG**. The band is the one place where getting non-colour marking wrong has a consequence outside the product |
| **C19** | `M-r8` / `M2` | moderate | no `.foil{display:none}` rule in either file that ships the foil (`color-themes-1.html`, `directions-4.html`). With `animation:none`, the overlay renders at its default `background-position`, leaving a permanent diagonal gold band across the identity object | `@media (prefers-reduced-motion:reduce){.inv .foil{display:none}}` — one line, two files. Contrast survives (ink over the foil tint is 15.250) so nothing becomes unreadable; it is a visible defect on the brand object |
| **C20** | `m-r2` / `m1` | minor | the type ramp bottoms out below any defensible floor and the new files add to the bottom: `.dow` weekday labels at **9.28–9.6px** (`vendor-calendar-bar.html`, `critical-four.html`), `critical-four.html`'s calendar corner glyphs at **8.8–9.6px**, `.fh .d span` at **8.96px**. `{typography.tab}` is 0.61rem = 9.76px | **The tab bar and its five destinations are a user decision (`.memlog.md:52`) and do not change.** Raise only the *new* artifact labels to the suggested floor — 11px for any label, 12px for anything read as a sentence — and record the `tab` value as a stated limit in `DESIGN.md`, not as an action |
| **C21** | `m-r3` + `m-r4` | minor | `guest-rsvp.html` — `.growth a` is **74 × 15px**; `.obligations a` are **144 × 44** and **94 × 44** against a 48dp floor; and the file has **zero** `<main>`, `<nav>`, `<header>`, `<footer>` or `role="main"` | `min-height:48px` on `.obligations a`; give the growth line's call to action its own block-level target. Wrap the column in `<main>` so the reply is two landmark jumps from the top. See §B35 for the matching spine clause |
| **C22** | `m-r1` + `m-r6` | minor | two wrong asserted figures — `guest-rsvp.html:120` claims 3.281 for muted at `opacity:.75` on surface (recomputed **3.040**, +0.24 / 8%) and `color-themes-1.html:230` claims 7.7 for ink `#2E1606` on marigold `#FF8A00` (**7.205**, +0.50 / 6.9%). Separately, `.note` / `.grayNote` render `#8D868B` on `#FFFCF2` at 10.08–10.24px — **3.458:1** — in `vendor-calendar-bar.html`, `availability-icons.html` and `availability-icons-b.html` | Correct both figures — `guest-rsvp.html`'s header is otherwise the most rigorous contrast record in the repo (eleven other pairs match to three decimals) and one wrong number is the one a reader will trust. Re-point the chrome to `#B3ADB1` on that ground (**4.98:1**), matching the chrome already used elsewhere in the same files. These are the captions telling a reader which strip is which on pages whose entire purpose is judging legibility |

**Verified closed — take no action.** `availability-signal.html:60–62` already draws the corrected
ring (2px solid / 1px solid / 1px dashed, all `{colors.muted}`) and its caption at `:155` — "In grey
the three rings are still solid, thin and dashed" — is now **true**. `direction-workspace-4.html`,
`direction-family-record-3.html`, `direction-failure-3.html`, `direction-vendor-switch.html`,
`direction-vendor-desktop.html` and `availability-signal.html` sweep **clean** for text contrast.
`lang="mr"` covers 108 of 108 Devanagari runs. The `n OF 5` label, the 44px tab items, the 70×44
retry, and the "Needs a reply" heading are all in. Do not re-open any of these.

---

# Part 4 — Decisions the author must make

Two. Everything else in this document is resolved from the sources or the memlog.

## Q1 · At 360px, can the vendor calendar stay a seven-column month grid, or must the phone lens become a list of dates?

**This is flagged as a probable real conflict.** `.memlog.md:99` records a fallback "below 360px",
but 360px **is** the target device — it is the width every guest-page measurement uses and the width
NFR 5.3's mid-range Android presents — so the fallback never fires, and at exactly 360px the grid
ships below the product's own floor. Meanwhile `.memlog.md:61` is a user decision that the portal
**opens on the Calendar lens, always**, so this is the landing surface of the only paying customer's
phone.

The arithmetic, restated from `DESIGN.md:575` and re-measured: seven 44px columns need **308px** of
cell width alone, before any inter-cell gap; **284px** exists at the spine's stated tight case.
Measured cells: **35.44px** at 284px, **38.58px** at a 306px column, **37.14px** in
`direction-vendor-switch.html`. Part 2 §2.2 removes the overlay's ability to paper over this — an
overlay capped at the pitch cannot exceed the pitch, and the pitch is 37–41px.

| Option | What it costs |
|---|---|
| **A · Keep the grid at 360px and document a sub-44px exception** | Cheapest; nothing is redrawn. But it breaks `EXPERIENCE.md:806`, which sets the floor with no exception and says "The Vendor portal holds the same floor — it is used on a phone at a function, one-handed." A documented exception on the one surface the floor was written for reads as the floor not meaning anything. WCAG 2.1 AA has no target-size criterion, so this is not an AA failure — it is the product's own promise |
| **B · The phone lens becomes a list of dates; the grid appears only ≥768px** | Honest, and `EXPERIENCE.md:830` already half-concedes it ("The month grid is only fully legible here"). Every target clears 44px trivially. Costs: the month-at-a-glance scan is what makes a stale calendar visible, and the list is a scroll rather than a glance; `calendar-day-bar` needs a list-row form; and the "always opens on Calendar" decision now opens on a list, which may weaken the nudge's whole purpose |
| **C · Fewer columns on the phone — a two-week or horizontally paged view at 44px+** | Keeps a grid and the glance, and clears the floor: 4 columns at 44px need 176px, 7 across two pages need no compression. Costs: a paged month is a new interaction to design and to teach, and "which fortnight am I looking at" is a real orientation problem on the surface whose job is orientation |
| **D · Keep seven columns, shrink the row count and let cells be wider than tall** | Cells become e.g. 40×48 — still under 44 horizontally. Does not actually solve it. Listed only so it is visibly rejected |

**What the answer changes:** `DESIGN.md:575` and `:286`; `EXPERIENCE.md:830` and the Calendar-lens
rules at `:155–161`; `vendor-calendar-bar.html`, `direction-vendor-switch.html`,
`direction-vendor-4.html`, `direction-vendor-desktop.html`. Part 2 §2.1 and §2.3 are unaffected —
the `::after` collision and the bar colour must be fixed under every option.

## Q2 · Does the Devanagari optical-size rule apply to every Devanagari role, or only to long-form?

`DESIGN.md:79–84` states the rule as general — *"Indic typography needs roughly 1.15–1.3× the Latin
optical size for equivalent legibility"* — and then applies it to exactly two tokens.
`body-long-devanagari` rose to 0.94rem and `review-devanagari` to 0.92rem, both at weight 400. The
other three Devanagari roles were not revisited and remain at parity with their Latin siblings:
`display-names-devanagari` 1.35rem (`:37–41`), `title-card-devanagari` 0.95rem (`:59–63`), and
**`chip-devanagari` 0.7rem / 400 (`:121–125`) — identical to the Latin chip, and the smallest
Devanagari in the system at 11.2px**, where matras above and below the shirorekha have the least room.

| Option | What it costs |
|---|---|
| **A · The rule is general; raise the remaining three** | Consistent with the reasoning already written down, and fixes the worst case first. Costs: `chip-devanagari` at ~0.8rem makes a Devanagari filter chip visibly taller than its Latin neighbour in the same row, so either chips get a fixed height that suits the larger (loosening every Latin chip) or a filter row becomes ragged. `title-card-devanagari` rising changes vendor-card and list-row heights across every results surface |
| **B · The rule is long-form only; scope the note to say so** | Costs nothing to implement and is defensible — the note's own argument is about *walls* of Rules and about weight 300 landing on one device pixel, neither of which applies to a two-word chip at weight 400. Costs: the smallest Devanagari in the product stays at 11.2px on a mid-range Android, and the document states a general rule it then does not follow, which is the same class of defect as D13 |

**What the answer changes:** `DESIGN.md:37–41`, `:59–63`, `:121–125` and the note at `:79–84`; and
whichever specimen file is drawn under Part 1 §D13.

---

## Closing note for all three agents

`.memlog.md:115` records why this document exists: *"the remediation agent could edit prototypes but
not spines; I edited spines but not prototypes. So they diverged repeatedly… Any future fix pass must
change BOTH or neither."* This contract is the "both". If an agent finds something this document does
not cover, it **records it and stops** — it does not decide. A twenty-seventh divergence invented
while closing twenty-six is the only way this pass can fail.
