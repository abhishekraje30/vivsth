# Editorial review — `prd.md` (1,398 lines)

**Scope:** readability only. Structure first, then prose. No factual, logical or consistency defects are reported — five correctness audits already cover those. No finding here changes the meaning of any requirement, and no rationale passage is stripped.

**Date:** 2026-09-06

---

## Overall judgement

The document reads far better than 1,400 lines of accreted spec has any right to. The voice is consistent and genuinely good — declarative, concrete, unafraid of a short sentence. The FR pattern (title / one-line statement / `Realizes UJ-n` / testable consequences) is applied without deviation across all 72 FRs, which is the single biggest reason it stays navigable. The rationale interludes ("Why this exists", "Why the Family sends") are doing real work and should stay.

What has degraded is **navigation and proportion**, not prose. Three specific problems account for most of the friction:

1. **The reader cannot find an FR.** Seven FRs (32, 33, 68, 69, 70, 71, 72) sit far from their numeric neighbours, by design, but there is no index. Only §4.5 explains this, and it explains it incompletely. In a document whose whole purpose is to be cited by ID from downstream artifacts, this is the highest-cost defect.
2. **Two groups have lost their shape.** §4.2 and §4.5 have had late FRs bolted in at arbitrary positions, and §4.5's description now covers two of its eight FRs.
3. **One requirement is stated twice in full** (FR-4 / FR-61) rather than once with a cross-reference.

Prose defects are minor and mostly mechanical: glossary-term capitalisation drift, two comma splices, four sentences that need a second pass to parse, and one verbatim duplicated bullet. Nothing in the prose is bad enough to mislead a reader; the structural findings are where the value is.

**Deliberate reinforcement I checked and left alone** (do not "fix" these):
- *Availability is never asserted as fact* — L114, L432, L509, L694, L1236. Five statements, each in the surface it governs, each with its own reason. Intentional.
- *Guest contact data used for invitations and nothing else* — L156, L405, L1217. Three, each at a different altitude (glossary / FR / NFR). Intentional.
- *Vivah Spot is not a party* — L135, L781, L817, L1233, L1335. Intentional, and legally load-bearing.
- *No money passes through the platform* — L24, L143, L819, L974, L1331. Intentional.

---

# Pass 1 — Structure

## S-1 (HIGH) — FR-4 and FR-61 are the same requirement, written out twice

**Lines 261–269 and 1090–1098.**

These are not reinforcement of an invariant; they are one requirement drafted twice with the same four consequences in the same order:

| | FR-4 (L265–269) | FR-61 (L1094–1098) |
|---|---|---|
| no role tiers | L266 | L1095 |
| absence of restriction ≠ absence of limits (FR-43/FR-46/NFR 5.7) | L267 | L1096 |
| Guest contact access confined + logged | L268 | L1097 |
| Admin actions attributable | L269 | L1098 |

Even the titles diverge in register — "Admin can do anything" vs "Admin has every capability" — which makes them read as two different rules until you compare them line by line.

**Fix:** keep FR-61 as the full statement (it sits in §4.13 Admin Console, where an Admin-capability rule belongs, and its wording is tighter). Reduce FR-4 to a pointer.

Replace **lines 261–269** with:

```markdown
#### FR-4: Admin can do anything

**No capability is withheld from Admin by role.** Every Admin user can reach every capability, and the control is attribution rather than restriction. Realizes the Verification and removal obligations behind UJ-2 and UJ-3.

**Consequences (testable):** stated in full at FR-61. This entry exists so that the access model can be read whole in this group; FR-61 is authoritative and the two must not drift apart.
```

## S-2 (HIGH) — There is no way to find an FR, and the numbering is deliberately non-sequential

FR IDs are stable by design (§0, L18) and that is right. The consequence is that seven FRs sit away from their numeric neighbours:

| Group | FR order as written | Inserted late |
|---|---|---|
| 4.2 Wedding Workspace | 7, 8, **72**, 9, **68**, 10, 11, 12 | 72, 68 |
| 4.5 Vendor Listings | 23, 24, 25, **32**, 26, **33**, **71**, 27 | 32, 33, 71 |
| 4.8 Agreements | 39, 40, 41, **69**, 42, 43 | 69 |
| 4.12 Trust & Verification | 58, **70**, 59, 60 | 70 |

A reader or agent told to "satisfy FR-71" has no way to locate it except a text search, and the only note explaining the scheme (L559) is buried inside §4.5 and names only FR-32 and FR-33 — not FR-71, which is in the same group.

**Fix A — add an FR index.** Insert after **line 213** (the §4 preamble), before `### 4.1`:

```markdown
**FR index.** FR IDs are global and permanently stable, so several FRs sit away from their numeric neighbours. Do not renumber them to restore sequence.

| Group | FRs, in the order they appear |
|---|---|
| 4.1 Accounts & Access | 1, 2, 3, 4, 5, 6 |
| 4.2 Wedding Workspace | 7, 8, 72, 9, 68, 10, 11, 12 |
| 4.3 Dates & Availability Matching | 13, 14, 15, 16, 17 |
| 4.4 Discovery & Comparison | 18, 19, 20, 21, 22 |
| 4.5 Vendor Listings | 23, 24, 25, 32, 26, 33, 71, 27 |
| 4.6 Vendor Calendar | 28, 29, 30, 31 |
| 4.7 Enquiries | 34, 35, 36, 37, 38 |
| 4.8 Agreements | 39, 40, 41, 69, 42, 43 |
| 4.9 Reviews | 44, 45, 46, 47, 48, 49 |
| 4.10 Subscription & Billing | 50, 51, 52, 53, 54 |
| 4.11 Lead Dashboard | 55, 56, 57 |
| 4.12 Trust & Verification | 58, 70, 59, 60 |
| 4.13 Admin Console | 61, 62, 63, 64 |
| 4.14 Real Weddings & Inspiration | 65, 66, 67 |
```

**Fix B — delete the now-redundant local note.** Delete **line 559** and the blank line after it.

## S-3 (HIGH) — §4.2 ordering no longer follows the narrative

**Lines 299–412.** Current order: FR-7 (never lost) → FR-8 (budget) → **FR-72 (lifecycle)** → FR-9 (shape) → FR-68 (services) → FR-10 (one view) → FR-11 (guests) → FR-12 (invitations).

Two problems:

- **FR-72 "A Wedding has a life, and it ends" sits third**, between the budget and the shape of the wedding. It is a lifecycle capstone that references FR-42, FR-43, FR-45, FR-65 and NFR 5.5 — none of which the reader has met. It was clearly appended late and inserted at the wrong seam. It belongs last in the group.
- **FR-8 "The budget fills itself in" sits second**, before FR-9 and FR-68 have established that a Wedding has Functions and Services. FR-8's consequences depend on both (L314 Spans, L317 per-head × Function headcount, L318 "a Service whose Functions the Family has not yet decided"). It reads backwards.

**Fix (pure move, no text change):**
1. Move the FR-8 block (**lines 308–323**, `#### FR-8:` through the `**Known limit:**` paragraph) to sit immediately after FR-10 (i.e. after **line 367**).
2. Move the FR-72 block (**lines 325–335**) to the end of the group, after FR-12's trailing paragraphs (i.e. after **line 412**).

Resulting order: FR-7, FR-9, FR-68, FR-10, FR-8, FR-11, FR-12, FR-72. Every dependency then points backwards.

## S-4 (HIGH) — §4.5 Vendor Listings is a grab-bag whose description covers two of its eight FRs

**Lines 553–661.**

The description (L555–557) promises exactly two things: Spaces, and Rules-that-bind. The group actually holds eight FRs: Spaces (23), Rules (24), Preferred Vendors (25), the conflicting-Rule flow (32), pricing model (26), service area (33), per-Service required capabilities plus the only table in §4 (71), and portfolio (27).

Two specific consequences:

- **FR-71 is the largest FR in the document and is in the wrong neighbourhood.** Its own first line (L634) says "These are additional conditions of listing, on top of the general ones in FR-59" — and FR-59 is 428 lines away in §4.12. A reader hits the extension before the base rule and cannot see them together.
- **The seed-configuration table (L644–652)** is a catalog-configuration artifact. It is closer kin to FR-62 ("The catalog is configured, not built") than to anything in §4.5.

**Fix — minimum viable (recommended):** leave FR-71 where it is but repair the signposting.

Replace **line 557** with:

```markdown
Four things make a Listing here unlike a directory entry. A venue is not one thing but several engageable Spaces (FR-23). A Vendor's Rules do not merely inform the Family — they govern what the Family may go on to choose (FR-24, FR-32). A Vendor declares where they will travel rather than being confined to a city (FR-33). And some Services must carry a capability specific to them before they can be listed at all (FR-71, which extends the general conditions in FR-59).
```

**Fix — stronger option (your call):** move the FR-71 block (**lines 632–652**) into §4.12, immediately after FR-59 (i.e. after **line 1071**). §4.12's order then reads 58, 70, 59, 71, 60, and the two conditions-of-listing rules sit together. If you take this, §4.5's description should name three things rather than four.

## S-5 (MEDIUM-HIGH) — FR-11 is two requirements sharing an ID

**Lines 369–389.** The FR statement is "The number comes first; the list is optional" — and bullets L374–380 deliver exactly that. Then **L382** opens a second, unrelated capability with a bolded paragraph ("A Family can also collect the list rather than compile it"), followed by six more bullets covering a public web form: unguessable links, search-engine exclusion, rate limiting, suggestion semantics, submitter isolation, revocation, and a consent rationale.

That second half is a public-internet surface with its own security posture. It is as substantial as most FRs in the document and it is invisible to anyone scanning FR titles.

**Fix (light, no renumbering):** promote the second half to a signposted sub-heading so it appears in any outline. Replace **line 382** with:

```markdown
**Collecting the list rather than compiling it.** The Workspace produces a short form and a link the Creator shares wherever their family already talks — the family WhatsApp group, usually.
```

...and immediately before it (as a new **line 381.5**, i.e. between the blank line and the paragraph) insert nothing further; the bold lead-in plus the FR-11 title amendment below is enough.

Also replace the FR-11 title, **line 369**:

```markdown
#### FR-11: The number comes first; the list is optional, and can be collected rather than compiled
```

## S-6 (MEDIUM) — FR-1's consequence list has grown to fifteen unstructured bullets

**Lines 227–241.** The longest consequence list in the document, on sign-in — which is table stakes — covering six distinct concerns with no internal grouping: the passwordless principle, which methods are offered, one-time-code mechanics, session and biometric behaviour, identity and account linking, and number change / recovery.

For comparison, FR-13 (whole-Block availability matching — the product's central claim) gets six bullets.

The content is right; the presentation defeats scanning. **Fix:** insert bolded run-in group labels as standalone bullets. Insert before **line 228**:

```markdown
- **The principle.**
```

Insert before **line 229**:

```markdown
- **What is offered.**
```

Insert before **line 231**:

```markdown
- **One-time codes.**
```

Insert before **line 233**:

```markdown
- **Staying signed in.**
```

Insert before **line 234**:

```markdown
- **One person, one account.**
```

Insert before **line 238**:

```markdown
- **Changing or losing the number.**
```

(If you prefer not to introduce label-only bullets, the alternative is six `**bold run-in.**` prefixes on the first bullet of each cluster — but the standalone labels scan better in a list this long.)

## S-7 (MEDIUM) — NFR 5.7 restates FR-43 instead of citing it

**Lines 1239–1243.** Three bullets; two of them are FR-43 verbatim or near-verbatim:

- L1242 "Corrections are appended. Nothing is overwritten." ≈ L854 "The history of an Agreement is append-only. Corrections are added; nothing is overwritten."
- L1243 "Agreement records are retained for eight years beyond the wedding and remain retrievable in the form they were confirmed in." ≈ L855, verbatim.

Only L1241 (which generalises the rule to Verifications, Reviews and Admin actions) does work FR-43 does not.

**Fix — replace lines 1241–1243 with:**

```markdown
- Agreements, Verifications, Reviews and Admin actions that change standing or visibility are retained, attributable, and not silently alterable.
- Corrections are appended. Nothing is overwritten.
- The evidential requirements for Agreement records specifically — the eight-year retention, the digest, the trusted timestamp, the named custodian and the certificate — are stated in full at FR-43 and are not restated here.
```

## S-8 (MEDIUM) — §6's preamble contradicts its own contents

**Line 1279** opens "*Five outcomes, stated by Abhishek*", and the section then carries seven headings. SM-6 and SM-7 each apologise inline for not being one of the five (L1313, L1320), which is a reader stumbling twice over a promise the preamble made.

**Replace line 1279 with:**

```markdown
*Five outcomes, stated by Abhishek — SM-1 to SM-5. Each carries measures and a counter-measure, because every one of these numbers can be moved by damaging something else. SM-6 and SM-7 follow them: not outcomes, but the growth mechanism and the supply precondition the five depend on. Targets are a business decision and are not set here.*
```

Then delete the now-redundant inline apologies at **line 1313** (`*Not one of the five, but the mechanism the others depend on, and the only growth channel designed into the product.*`) — replace it with `*The only growth channel designed into the product.*` — and leave L1320 (`*A precondition rather than an outcome.*`) as it is, since it still adds information.

## S-9 (MEDIUM) — the "four routes out of discovery" rule is parked inside FR-53

**Line 987.** This paragraph is one of the most useful things in the document: it consolidates four separate exit paths (FR-53, FR-70, FR-60, FR-59/FR-71) and asserts that all four behave identically. It is cross-cutting.

It currently sits mid-way through FR-53's consequence bullets, which does two bad things: it makes a general rule look like a subscription-lapse rule, and it orphans the two bullets that follow it (L988–989) out of the list they belong to. See also **P-1**.

**Fix:** move **line 987** so that it follows **line 989** (the end of FR-53's consequence list), and give it a label. Replace the moved paragraph's opening with:

```markdown
**Leaving discovery — the general rule, which is not specific to expiry.** A Listing leaves discovery by four routes, and all four behave identically for Families: a Subscription lapsing past its Grace Period; the Vendor withdrawing it themselves (FR-70); Admin removing the Vendor (FR-60); and a condition of listing ceasing to be satisfied (FR-59, FR-71). In every case: the Listing stops appearing and accepts no new Enquiry; existing Agreements, open threads and review windows are untouched; and every Family holding it on a Shortlist or as a Selection is told, with the Selection cleared and the budget adjusted. **No route removes a Listing from a Family's view without telling them.**
```

Then add a pointer at the three other sites so the rule is findable from them. Append to **line 1060** (FR-70): ` See the four-routes rule under FR-53.` Append to **line 1071** (FR-59): ` See the four-routes rule under FR-53.` Append to **line 1082** (FR-60): ` See the four-routes rule under FR-53.`

## S-10 (MEDIUM) — FR-64 restates FR-20's disclosure bullet

**Line 1131** ("The main parameters determining organic ordering are published in plain language, reachable by any family") is a compressed restatement of **line 526**, which already specifies the disclosure and quotes its substance. FR-64 adds one genuinely new thing: L1132's *vendor-facing* differentiation disclosure, and L1133's insistence that the two are separate.

**Replace line 1131 with:**

```markdown
- The main parameters determining organic ordering are published in plain language, reachable by any Family. What that disclosure must contain is specified at FR-20 and is not restated here.
```

## S-11 (MEDIUM) — §4.12 opens in the middle of the Vendor's path

**Lines 1040–1082.** Order is FR-58 (nothing lists without Verification) → FR-70 (Becoming a Vendor) → FR-59 (Conditions of listing) → FR-60 (Removal).

FR-70 is the entry point — self-registration, building the Listing, submitting it, seeing where you stand. FR-58 is a gate partway along that path, and it is stated before the path exists. A reader meets "a Vendor is verified before their Listing is visible" before learning that a Vendor self-registers at all.

**Fix (pure move):** move the FR-70 block (**lines 1050–1060**) to the head of the group, immediately after **line 1038** (`**Functional Requirements:**`). Order becomes 70, 58, 59, 60 — sign up, get verified, satisfy the conditions, and the one way you can be removed.

## S-12 (MEDIUM) — guest accommodation and transport are parked in the invitations FR

**Line 412.** This paragraph states that accommodation and transport are ordinary catalog Services, that the platform does not allocate rooms or assign vehicles, and that quantity is the Family's decision. It has nothing to do with FR-12 (composing and sending invitations); it landed there because it contains the word "guest".

It is really a scope statement about the boundary between showing a recommended quantity and deciding one — which is exactly §7.6's subject (L1367–1373).

**Fix:** move **line 412** to §7.6, appending it after **line 1371**, and re-lead it so it reads as an instance of the rule rather than a new topic:

```markdown
**Guest accommodation and guest transport are the clearest case of that line.** They are ordinary Services in the catalog, listed by whoever provides them and chosen by the Family like any other. The platform does not allocate rooms, assign Guests to vehicles, or size the order. It may surface the relevant Guest count as context; the Family decides the quantity.
```

## S-13 (MEDIUM-LOW) — FR-26's seasonal-pricing bullet duplicates FR-30

**Line 617** ("A Vendor may set different pricing for off-season and off-muhurat periods, and the Family sees the price applicable to their own Block") restates FR-30's first two bullets (L701, L702) in a group 80 lines earlier.

**Replace line 617 with:**

```markdown
- Pricing may vary by season and by muhurat; how a Vendor sets that, and what the Family is shown, is FR-30.
```

## S-14 (MEDIUM-LOW) — one UJ-3 constraint bullet is doing three jobs

**Line 140.** A single bullet covering: (a) the Delivery trigger and its early/late asymmetry; (b) why the published delivery timeline is load-bearing; (c) the double-blind publication rule; (d) why retaliation protection matters. Six sentences, the last three of which restate what L139 already said about window close.

**Replace line 140 with two bullets:**

```markdown
- **The review window opens on Delivery, not on the wedding day.** A Vendor marks the work delivered, or their own committed delivery date passes and the window opens regardless. A photographer who commits to ninety days is reviewable on day ninety whether or not he has delivered — he can open the window early by delivering early, but he cannot hold it shut by delivering late. This is what makes the published delivery timeline in Scope §6 load-bearing rather than decorative.
- **Retaliation protection is load-bearing, not a nicety.** Neither review publishes until both are submitted or the window closes, so no review can be written in answer to another. Reviews are the only consequence a Vendor faces, so anything that discourages an honest one breaks the mechanism.
```

## S-15 (LOW) — FR-50 mixes what a Tier is with how price is set

**Lines 941–952.** Bullets L942–948 define Tiers and what differs between them. Bullets L949–952 are a separate subject: how Subscription price is determined (per Service, per Place, per Tier), that price is never a function of reach, that a change never alters what was already bought, and that the figures live outside the document.

Both belong in the FR, but the seam is invisible. **Fix:** insert a label bullet before **line 949**:

```markdown
- **How the price itself is set — a separate matter from what a Tier contains:**
```

...and indent L949–952 one level beneath it.

## S-16 (LOW) — FR-53 leans on a rule FR-54 has not yet stated

**Line 981** says "With no auto-renewal, the reminder is the renewal mechanism" — but "no auto-renewal" is established by FR-54, which follows. The same forward reference appears in §4.10's description (L933) and in SM-2 (L1288), so the reader does eventually get it; it is a small stumble, not a gap.

**Fix (optional, pure move):** swap the FR-53 and FR-54 blocks, so the group reads 50, 51, 52, 54, 53. Renewal-is-an-active-decision then precedes what happens when nobody takes it. If you prefer not to move blocks, append `(FR-54)` to **line 981**.

## S-17 (LOW) — §4.4 compares Shortlists before defining them

**Lines 531–551.** FR-21 "Comparing a Shortlist side by side" precedes FR-22 "Shortlists", which is where the Shortlist/Selection distinction and the budget consequence are established. The Glossary covers it (L191–192), so nothing is unclear — but the natural order is define, then compare.

**Fix (optional, pure move):** move the FR-22 block (**lines 541–551**) to precede FR-21 (i.e. insert after **line 529**).

---

# Pass 2 — Prose

**Counts: 6 high, 15 medium, 12 low — 33 findings.**

## High

### P-1 (HIGH) — L987 and L528: interposed paragraphs orphan the bullets that follow

In both places a full-width paragraph is inserted mid-list, and bullets resume after it. Markdown renders the resumed bullets as a *new* list, visually attaching them to the interposed paragraph rather than to the requirement's consequence list.

- **L985 / L987 / L988–989** — FR-53. Bullets L988 ("Nothing belonging to the Vendor is destroyed") and L989 ("Reviews already published about a lapsed Vendor remain published") belong to FR-53's consequences, not to the four-routes paragraph. **Fix: see S-9** — move L987 to after L989.
- **L526 / L528 / L529** — FR-20. Bullet L529 ("A Featured Listing satisfies every condition of listing…") belongs to the ranking consequence list, not to the scope-supersession note. **Fix: move line 528 to after line 529.** No text change; it becomes the closing note of the FR, which is where the parallel notes at L446, L479 and L608 already sit.

### P-2 (HIGH) — L1122 and L1124: the same obligation, twice, two bullets apart

```
1122  - Users are reminded of the platform's terms and the rules governing what may be posted **at least once a quarter**.
...
1124  - Users are periodically informed of the platform's terms and the rules governing what may be posted.
```

L1124 is L1122 with the frequency removed. **Delete line 1124.**

### P-3 (HIGH) — L14: two hard-to-parse constructions in the document's opening paragraph

Current:
> It is the chain-top artifact for an autonomous build — UX, architecture, epics and stories are all derived from it — which sets its standard. Anywhere this document is silent or vague, an agent downstream will decide for itself, and that decision will be nobody's.

`which sets its standard` dangles off a parenthetical, and `that decision will be nobody's` requires a second reading to recover the intended sense (unowned). This is the first substantive paragraph in the document; it should be the easiest one to read.

**Replace lines 14 with:**

```markdown
This PRD describes the complete Vivah Spot platform: what it does, for whom, and where it deliberately stops. It is the chain-top artifact for an autonomous build — UX, architecture, epics and stories are all derived from it — and that is what sets the standard it has to meet. Anywhere this document is silent or vague, an agent downstream will decide for itself, and nobody will own that decision. So the intent here is decision closure rather than description.
```

### P-4 (HIGH) — L331: zeugma ("starts the ability")

Current:
> Concluding is what starts the review backstop in FR-45, the erasure of Guest contact details (NFR 5.5), and the ability to publish a Real Wedding (FR-65).

"Starts an ability" does not work. **Replace line 331 with:**

```markdown
- It becomes **concluded** when that last Function has passed. Concluding is what starts the review backstop in FR-45 and the erasure of Guest contact details (NFR 5.5), and what makes publishing a Real Wedding possible (FR-65).
```

### P-5 (HIGH) — Glossary-term capitalisation has drifted, in a document that binds it

§3's preamble (L147) states that "FRs, UJs and SMs use Glossary terms verbatim; introducing a synonym anywhere is a discipline violation." Capitalisation is part of "verbatim" — a downstream agent generating schema from this document will see `Creator` and `creator` as different things.

Six terms drift. All fixes are one-word substitutions; none changes meaning.

**`Creator`** → capitalise at:
- L271 `The Wedding creator controls` → `The Wedding Creator controls`
- L276 `granted by the creator` → `granted by the Creator`
- L278 `The creator can revoke` → `The Creator can revoke`
- L283 `suggest Listings to its creator` → `suggest Listings to its Creator`
- L289 `available to the creator alone` → `available to the Creator alone`
- L1148 `The Wedding's creator can publish` → `The Wedding's Creator can publish`

**`Family`** → capitalise at:
- L323 `between family and Vendor` → `between Family and Vendor`
- L908 `prose about a named family` → `prose about a named Family`
- L909 `an Enquiry from that family` → `an Enquiry from that Family`
- L1131 `reachable by any family` → `reachable by any Family`

**`Guest`** → capitalise at:
- L396 `never sends a message to a guest` → `never sends a message to a Guest`
- L398 `principal surface in front of guests` → `principal surface in front of Guests`
- L403 `a quiet route for a guest planning` → `a quiet route for a Guest planning`; and `a guest who follows it` → `a Guest who follows it`
- L1315 `the proportion of guests who go on` → `the proportion of Guests who go on`

*(Leave `guest count`, `guest list` and `guest form` lowercase throughout — they are consistent compounds, not the defined term.)*

**`Vendor`** → capitalise at (UJ text, which §3 binds):
- L109 `One login per vendor account` → `One login per Vendor account`
- L130 `the next vendor she approaches` → `the next Vendor she approaches`
- L114 `All copy reads "vendor shows available"` — **leave as is**; this is quoted user-facing copy, and L1274 quotes it identically.
- L416, L485, L526 — **leave as is.** L416/L485 are group descriptions written in the persona's register; L526 is the plain-language disclosure text shown to Families.

**`Slot` / `listing`** → capitalise at:
- L127 `blocks the slot on his calendar` → `blocks the Slot on his calendar`
- L129 `the star rating on the listing means something` → `the star rating on the Listing means something`
- L130 `His listing carries reviews` → `His Listing carries reviews`
- L142 `auto-blocks the Vendor's calendar slot` → `auto-blocks the Vendor's calendar Slot`

**`Place`** → capitalise at:
- L491 `by name or by place` → `by name or by Place`
- L627 `A Wedding holds a place… covers that place` → `A Wedding holds a Place… covers that Place`
- L629 `open a new place` → `open a new Place`
- L1026 `their own category and place` → `their own Service and Place`
- L1029 `their Service in their place` → `their Service in their Place`
- L1106 `open a new place` → `open a new Place`
- L1322 `Vendors per Service per place` → `Vendors per Service per Place`

**`Span`** → capitalise at:
- L174 `What a span Service is engaged for` → `What a Span Service is engaged for`
- L430 `engaged as a span is evaluated as one continuous span` → `engaged as a Span is evaluated as one continuous Span`
- L442 `A span Service is held… No part of that span` → `A Span Service is held… No part of that Span`
- L443 `a span Service quotes for the span` → `a Span Service quotes for the Span`
- L444 `not one span` → `not one Span`
- L446 `the venue is a span Service` → `the venue is a Span Service`
- L615 `per span, per Function` → `per Span, per Function`
- L681 `Slots or span automatically — for a span Service, the whole span` → `Slots or Span automatically — for a Span Service, the whole Span`
- L807 `Slots or span are blocked` → `Slots or Span are blocked`
- L840 `Slots or span are released` → `Slots or Span are **released immediately**` (keep existing bold)
- L888 `the end of the span` → `the end of the Span`
- L129 `for a venue, the end of the span` → `for a venue, the end of the Span`
- L701 `any span of their choosing` — **leave lowercase**; here "span" means an ordinary period of time, not the defined term. Consider `any period of their choosing` to remove the collision entirely.

### P-6 (HIGH) — L114: elliptical clause that inverts on first reading

Current:
> This follows Scope §8: no guarantee the platform cannot honour.

On first pass this reads as though the platform *is* guaranteeing something. **Replace line 114 with:**

```markdown
- Because calendar freshness is maintained by nudging rather than enforcement, **the platform never asserts availability as fact.** All copy reads "vendor shows available". This follows Scope §8: the platform makes no guarantee it cannot honour.
```

## Medium

### P-7 (MEDIUM) — L77: the climax sentence needs a second reading

Current: `The app surfaces what she could not work out by phone — that of her three Blocks, only the one anchored on the 27th has her shortlisted venue, caterer *and* photographer free across every day and Slot it needs, and lands inside budget. She locks that Block onto the Wedding.`

The `— that of her three Blocks, only…` construction stalls the reader at the very moment the journey is supposed to land.

**Replace line 77 with:**

```markdown
- **Climax:** The app surfaces what she could not work out by phone. Of her three Blocks, only the one anchored on the 27th has her shortlisted venue, caterer *and* photographer free across every day and Slot it needs — and only that one lands inside budget. She locks it onto the Wedding.
```

### P-8 (MEDIUM) — L318: relative clause reads as though the Family decides Functions rather than which Functions a Service serves

**Replace line 318 with:**

```markdown
- **A Service whose Functions the Family has not yet chosen shows as not yet estimated — never as ₹0.** Zero reads as free.
```

### P-9 (MEDIUM) — L863: bare "It is:" strands the reader

Current:
> It is: only a real Agreement earns a review, the window opens when the work is actually delivered rather than when the wedding ends, and neither side can see the other's before writing their own.

The referent ("harder to game") is in the previous paragraph and the colon-after-copula construction is jarring. **Replace line 863 with:**

```markdown
And it is harder to game: only a real Agreement earns a review, the window opens when the work is actually delivered rather than when the wedding ends, and neither side can see the other's before writing their own.
```

### P-10 (MEDIUM) — L389: faulty comparison (a footing compared to a Family)

**Replace line 389 with:**

```markdown
- People who enter their own details consent to Vivah Spot directly, which is firmer ground than a Family supplying its relatives' numbers on their behalf. NFR 5.5 governs those details exactly as it governs any other Guest data.
```

### P-11 (MEDIUM) — L639: "needs the venue's own data to be real" is ambiguous

Reads either as "needs the data to be genuine" or "cannot be real without the data". The second is meant.

**Replace line 639 with:**

```markdown
- **Décor & Mandap — sizing against the real space.** Where the Family has engaged a Space, its dimensions and the Vendor's Rules are available to Décor Vendors quoting for it, so a decorator quotes for the space that exists rather than guessing. This is the venue-awareness the platform has claimed since the beginning, and it cannot be real without the venue's own data.
```

### P-12 (MEDIUM) — L691: second-person address breaks the document's register

Current: `This is a prompt to the person paying you, not a campaign.` The document never addresses the reader as "you" outside quoted UI copy, and "you" here silently means the operator.

**Replace line 691 with:**

```markdown
- **At most one nudge per Vendor per seven days**, however many periods are drawing interest. This is a prompt to a paying customer, not a campaign.
```

### P-13 (MEDIUM) — L494: dangling participle

Current: `She can search by Listing or Vendor name, or by location, including detecting where she is.`

**Replace line 494 with:**

```markdown
- She can search by Listing or Vendor name, or by location — either typed, or detected from where she is.
```

### P-14 (MEDIUM) — L824: comma splice

Current: `Terms change. Guest counts move, a Function shifts an hour.`

**Replace line 824 with:**

```markdown
Terms change: guest counts move, a Function shifts an hour. An Agreement can be amended without either party being recorded as having broken it. Realizes UJ-3.
```

### P-15 (MEDIUM) — L933: comma splice

Current: `…is not a nice extra, it is the entire renewal argument.`

**Replace the final clause of line 933 with:**

```markdown
…— which means the Lead Dashboard in 4.11 is not a nice extra; it is the entire renewal argument.
```

### P-16 (MEDIUM) — L376: "families" collides with the defined term `Family`

Current: `…asking a Family to type six hundred names when they mean a hundred and fifty families is exactly the work this product exists to remove.`

The sentence uses `Family` (the planning household) and `families` (the guest households) fourteen words apart. The bullet's own opening establishes the right word: *households*.

**Replace the final clause of line 376 with:**

```markdown
…and asking a Family to type six hundred names when they mean a hundred and fifty households is exactly the work this product exists to remove.
```

### P-17 (MEDIUM) — L1271: a tagline is not a tone

Current: `The tagline is **"Big day, sorted."** — the tone the whole product is written in: calm, capable, unfussy. Not romantic, not corporate.`

The appositive equates the tagline with the tone. **Replace line 1271 with:**

```markdown
- **The product is Vivah Spot.** The tagline is **"Big day, sorted."** — and it sets the tone the whole product is written in: calm, capable, unfussy. Not romantic, not corporate.
```

### P-18 (MEDIUM) — L229: "offered by" should be "offered through"

Current: `Sign-in is offered by: **a mobile number and a one-time code**; **a passkey**…`

"Offered by" names an agent, not a method. **Replace the opening of line 229 with:**

```markdown
- Sign-in is offered through four routes: **a mobile number and a one-time code**; **a passkey** on devices that support one; **Google**; and **Apple**. The mobile number route always works and is never the only option offered.
```

### P-19 (MEDIUM) — L637: "Neither shortage nor waste is anybody's surprise on the day"

Grammatically fine, semantically inverted — it reads as though shortage and waste are expected. **Replace the final sentence of line 637 with:**

```markdown
Nobody is surprised on the day by a shortage or by waste.
```

### P-20 (MEDIUM) — L276: passive with the agent buried

Current: `Access is granted by the creator to a mobile number. There is no other route in.`

**Replace line 276 with:**

```markdown
- The Creator grants access to a mobile number. There is no other route in.
```

### P-21 (MEDIUM) — L237: "what he is acting as" is awkward and vague

**Replace the final sentence of line 237 with:**

```markdown
What he can do at any moment follows from the role he is acting in, not from which account he signed in with.
```

## Low

### P-22 (LOW) — L333: "under the rule below" is a vague pointer

The rule is the very next bullet, but "below" is unresolvable if the bullets are ever reordered or extracted.

**Replace the middle of line 333 with:**

```markdown
- Where it holds no Agreement and has seen no activity for a year, the Family is asked whether to keep it. **If they do not answer within thirty days it is abandoned**, with exactly the consequences of a Creator abandoning it, and they are told that before the thirty days start.
```

### P-23 (LOW) — L624 vs L165: the Place hierarchy is written two ways

L165 (Glossary): `village or town → tehsil → district → state → country`
L624 (FR-33): `village and town, tehsil, district, state, country`

The Glossary is authoritative. **Replace the opening of line 624 with:**

```markdown
- Places are held as a **hierarchy** — village or town, then tehsil, district, state, country — not as a flat list of cities.
```

### P-24 (LOW) — bold-label punctuation is inconsistent across the rationale interludes

Three parallel constructions, two punctuations:
- L446 `**Why this removes a whole class of failure:**` (colon)
- L408 `**Why the Family sends.**` (period)
- L608 `**Why this exists.**` (period)

Period wins two to one. **Replace the label on line 446 with `**Why this removes a whole class of failure.**`** (keep the rest of the sentence, capitalising `a decorator` → `A decorator`).

### P-25 (LOW) — L105: the bold swallows the label

Every other edge-case resolution in §2.2 bolds only the claim (L79, L131). L105 bolds `**Resolution: the platform nudges him**`, label included.

**Replace the relevant span of line 105 with:**

```markdown
**Resolution:** the platform **nudges him** ("you have N Enquiries for the 27th — still free?") rather than blocking the Enquiry or auto-expiring his availability.
```

### P-26 (LOW) — L1001: punctuation pile-up

Current: `It has to answer one question honestly: *what did I get for my money?* — and it has to keep answering it when…`

Colon, italic question, question mark, em dash in eleven words. **Replace line 1001's middle with:**

```markdown
**Description:** Dattatray is asked to pay again every year with nothing compelling him to. This screen is the whole argument. It has to answer one question honestly — *what did I get for my money?* — and it has to keep answering it when the answer is unflattering, because a dashboard that only looks good stops being believed.
```

### P-27 (LOW) — L943 and L207: `is:` and a bold span that swallows the qualifier

- L943 `What differs between Tiers is: **placement in the marked Featured band, and portfolio allowance** — how many images a Listing may publish. Nothing else.` → **replace with:**

```markdown
- Two things differ between Tiers, and nothing else: **placement in the marked Featured band**, and **portfolio allowance** — how many images a Listing may publish.
```

- L207 `Tiers differ in **placement in the Featured band and portfolio allowance, and in nothing else.**` → **replace that sentence with:**

```markdown
Tiers differ in **placement in the Featured band** and **portfolio allowance**, and in nothing else.
```

### P-28 (LOW) — L192: the `Selection` definition needs unpacking

The em-dash aside inside the colon clause inside the sentence makes the Span example hard to follow at speed.

**Replace the middle of line 192 with:**

```markdown
**How many a Service carries follows its Engagement Model directly.** A Span Service carries one Selection per Span: the lawn across the Haldi and the Wedding is one Selection, and a separate hall for the Reception is a second Span and so a second Selection. A per-Function Service carries one Selection per Function it serves.
```

### P-29 (LOW) — L156: the `Guest` definition is a paragraph wearing a bullet

Six clauses covering: what a Guest is, when a submission becomes one, that Guests are not users, the purpose limitation, and that the list is optional. It is the longest entry in the Glossary by some way.

**Replace line 156 with:**

```markdown
- **Guest** — a household the Family intends to invite, carrying a count of people, whether accepted onto the guest list or still awaiting the Creator's decision.
  - **A submission to the guest form is a Guest from the moment it arrives**, whether the Creator has accepted it, is yet to look at it, or has dismissed it — every rule governing Guest data applies to all three.
  - Not a user of the platform, and a distinct class of data subject: contact details are used to compose that Wedding's invitations and for nothing else.
  - **The guest list is optional**; a Function's guest count is stated by the Family and exists whether or not anyone is named.
```

### P-30 (LOW) — L1218: five sentences in one NFR bullet

**Replace line 1218 with:**

```markdown
- They are erased when the purpose is exhausted: thirty days after the Wedding concludes under FR-72, or immediately on abandonment. Until then a Family may still be chasing replies; after it there is nothing left to invite anyone to.
- **A dismissed guest-form submission is erased at once.** The Family has said this person is not coming, so no purpose remains for holding their number.
- Guest details are not retained for the Agreement retention period — Guests are not party to any Agreement.
```

### P-31 (LOW) — L172: a usage note formatted as a Glossary entry

L172 sits in the `### Dates` bullet list as `- *Where this document says **Block** alone…*`. It defines nothing; it is a reading instruction. L162 handles the identical case correctly, as an indented sub-bullet under its parent term.

**Fix:** indent line 172 by two spaces so it becomes a sub-bullet of `Chosen Block` (L171), matching L162's treatment.

### P-32 (LOW) — L1169: `boards` lowercase two lines above `Boards`

**Replace line 1169 with:**

```markdown
- A Family can save images and Listings to Boards within their Workspace.
```

### P-33 (LOW) — `Realizes` is the document's one American spelling

The house style is consistently British: `organisation` (L18), `reorganised` (L213), `modelled` (L1182), `normalise` (L1185), `pseudonymised` (L1221, L1223), `labelled` (L526, L1227), `colour` (L1248, L1269, L1273), `travelling` (L630). Against that, `Realizes` appears 72 times.

**Recommendation: leave it.** It functions as a structural keyword rather than prose, downstream tooling may match on it literally, and 72 edits for an -ise/-ize preference is not worth the churn. Recorded so it is a decision rather than an oversight. If you do change it, change all 72 — a half-converted keyword is worse than either state.

Three of the 72 also deviate in form (`Realizes the Verification and removal obligations behind…` at L263, `Realizes UJ-2, and is what SM-1 measures.` at L1052, `Realizes the obligations behind…` at L1092). These read fine and carry real information; leave them.

---

## Things I deliberately did not flag

- **The rationale interludes.** Every "Why this exists" / "Why the Family sends" / "Without this…" passage earns its place and several are explicitly there to stop a downstream agent from "fixing" a rule. Untouched.
- **Repeated invariants.** Listed at the top of this review. All five clusters are intentional and correctly placed.
- **Named-persona register** (Rutuja/she, Dattatray/he) in group descriptions. It is consistent, it is a deliberate device, and it makes those paragraphs the most readable in the document.
- **Sentence fragments** used for emphasis ("Nothing finer, because nothing finer is meaningful." L896; "Nothing else." L943). Consistent with the voice.
- **§7's terseness relative to §4.** §7 is short because exclusions do not need consequence lists. Correct as-is.
- **The two tables** (L646–652, L1254–1263). Both well-formed, both correctly placed relative to their prose. The only quibble is the `Priced` column header at L646, which is terser than its neighbours — `Priced by` would read better, but this is beneath the threshold.

---

## Application order

If applying mechanically, do it in this order to avoid line-number drift:

1. **All Pass 2 in-place text replacements** (P-2 through P-33), working from the **bottom of the file upward**.
2. **S-1** (FR-4 rewrite), **S-5** (FR-11 title + label), **S-7** (NFR 5.7), **S-8** (§6 preamble), **S-10** (FR-64), **S-13** (FR-26) — all in-place, also bottom-up.
3. **Block moves**, one at a time, re-locating each block by its `#### FR-n:` heading rather than by line number: S-3 (FR-8, FR-72), S-9 (L987 paragraph), S-11 (FR-70), S-12 (L412), and optionally S-4 (FR-71), S-16 (FR-53/54), S-17 (FR-22).
4. **S-2** last — the FR index table needs the final group orders, so build it after every move has landed. If you take the optional moves in step 3, update the table's 4.5, 4.10, 4.12 and 4.4 rows accordingly.
