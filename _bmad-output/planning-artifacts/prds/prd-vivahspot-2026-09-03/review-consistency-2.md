---
title: Consistency Re-Audit — Vivah Spot PRD (post-revision)
target: prd.md (1342 lines, 71 FRs, 3 UJs, 7 SMs, 14 feature groups) — md5 975c7d9bee3d61f6686ffbdfccf433a6
authority: .memlog.md (79 entries, updated 2026-09-05T18:58)
prior: review-consistency.md (43 findings, 2026-09-05T17:48)
date: 2026-09-05
---

# Consistency Re-Audit — what the fixes broke or missed

**Note on the target.** `prd.md` was still being edited during this audit. It changed under me at 18:58:10 (memlog entry 79, a vocabulary-capitalisation sweep) and the line count fell from 1343 to 1342. Everything below is verified against the 18:58:10 state (md5 above), re-read in full after the change.

**Verdict: the fix pass landed, and it opened a new seam.** All 7 prior Critical findings are genuinely fixed. Nine of the 13 prior High findings are fully fixed and four are partial. But the new material — 4 new FRs, a rewritten Glossary, 14 thresholds, the Selection object, per-Service-per-Place Subscriptions, expanded sign-in — was inserted without conforming the text that already spoke about the same things. The damage clusters in four places:

1. **The Selection object was added to the Glossary and to five FRs, and the FRs that spend the budget were not updated.** Two FRs (FR-32, FR-53) still withdraw a Shortlist's budget contribution, which is by definition zero.
2. **Enumerations that were closed lists before are now stale.** "Conditions of listing" is stated three times with three different contents; the Glossary `Tier` entry still carries an allowance the memlog explicitly removed.
3. **New rules were written without conforming the text they govern.** The Glossary now says "'Block' is never used alone" — and the FRs use it alone eighteen times.
4. **New mechanisms interact badly with old ones.** FR-39's first-writer-wins makes FR-32's warn-and-accept destroy things for an engagement that may never exist; FR-45's 90-day backstop overrides the Commitment trigger it was written to protect.

**New/regressed severity counts: 5 Critical · 10 High · 15 Medium · 9 Low (39 findings).**
**Prior findings still open or partial: 4 High · 3 Medium · 4 Low.**

---

## Part A — Did the prior findings actually get fixed?

### A.1 Critical — 7 of 7 fixed

| # | Prior finding | Verdict | Evidence in current text |
|---|---|---|---|
| G-1 | Glossary `Wedding` holds a `city` | **FIXED** | §3 line 160: "Holds couple names, its **Place**, guest count…". New `Place` entry at line 165. |
| G-2 / B-1 | "bookable" ×6, including in the Glossary | **FIXED** | Zero occurrences of `bookable` in the file. Replaced with "engageable" at lines 110, 173, 182, 528, 534. |
| C-2 | No FR requires a delivery timeline to exist | **FIXED** | FR-59 line 1012 adds "a published **Commitment** — the delivery timeline, what is included, and the no-hidden-charges declaration"; FR-45 line 835 cites it. *But see N-C5 and N-H6 — the fix is undermined downstream.* |
| C-11 | FR-47's payment question + Admin dispute route | **FIXED** | FR-47 line 858: "**These three and no others.** No question asks about money…"; line 861: "**There is no dispute process**". |
| C-12 | §5 preamble declares itself incomplete | **FIXED** | Line 1116: "*Cross-cutting requirements. Binding on every surface and on every downstream artifact.*" |
| C-3 / J-1 | No FR for Wedding-level Service selection | **FIXED** | New FR-68 (line 331); Glossary `Wedding` now holds "**the Services selected for it**"; FR-10 line 347 carries them. |
| C-1 / P-1 | FR-4 / FR-61 Admin absolutes | **FIXED** | FR-4 line 257: "**No capability is withheld from Admin by role**" + line 261 "the absence of role restriction, not the absence of limits". FR-61 line 1036 matches. |

### A.2 High — 9 of 13 fixed, 4 partial

| # | Prior finding | Verdict | Note |
|---|---|---|---|
| G-4 | "Delivery" collision in FR-12 | **FIXED** | Line 376 now reads "Whether a Guest received the invitation is not tracked…" with an explicit parenthetical disambiguating the Glossary term. |
| C-5 | "no calendar" vs "no duration" | **FIXED** | FR-14 line 410 states the two axes are separate and forbids the inference. FR-13 line 401 matches. |
| C-6 | BSA s.63 Part A certificate | **FIXED** | FR-43 line 809, and it explains why the rest of the FR is worthless without it. |
| C-7 | Scope §8 ranking-not-for-sale supersession | **FIXED** | FR-20 line 497 records it in the same italic supersession form the document uses elsewhere. |
| C-13 | NFR 5.1 "package descriptions" | **FIXED** | Line 1126 now "Listing descriptions". |
| C-14 | FR-11 auto-sizes the caterer's order | **FIXED** | FR-11 line 360: "**The derived count is offered, not imposed.**" §7.6 line 1309 carves it out correctly. |
| C-15 | Retention absolutes vs erasure right | **FIXED** | NFR 5.5 lines 1163–1167 state the precedence explicitly and forbid re-deriving it downstream. |
| P-2 | FR-40 "four consequences" then lists five | **FIXED** | Line 756 now says five. *But "and no others" now collides with FR-69 — see N-M8.* |
| P-3 | §7.2 excludes a complaint pipeline FR-63 builds | **FIXED** | §7.2 line 1283 narrowed to "about service quality" + an explicit not-excluded carve-out for FR-63. |
| **G-3** | couple/family actor drift | **PARTIAL** | Glossary rewritten correctly; the sweep caught the rest. **One residue:** FR-12 line 374 — "couples pay nothing for anything". The non-paying party is the Family; per FR-2 and the Glossary the couple are names on a Wedding, not users. See N-M12. |
| **G-5** | "Review" lowercased throughout §4.9 | **STILL OPEN** | FR-46 line 848–850, FR-48 lines 869–871, FR-49 lines 875–877 all lowercase. Memlog 79 records this as a deliberate non-sweep ("review… has a legitimate ordinary-English use"). That is defensible prose reasoning, but §3 line 147 says "FRs, UJs and SMs use Glossary terms verbatim; introducing a synonym anywhere is a discipline violation" — so the document now has a binding rule it deliberately breaks. Either the rule needs a stated exception list or the uses need fixing. |
| **C-4** | Engagement models cannot express Shapes E/F | **PARTIAL** | The engagement axis is fixed — FR-14 line 409 now lists five models including rental period and lead time. **The pricing axis was not.** FR-26 line 582 still reads "per span, per Function, per head, per unit, per rental period": there is no pricing model for a lead-time or a no-duration Service, and "per head"/"per unit" are Sizing Attribute values sitting on the engagement axis. See N-M10. |
| **C-8** | Mehndi/Sangeet collision + catalog defects | **PARTIAL** | The word collision is **fixed** — Glossary line 162 states the rule with worked examples. The other catalog defects memlog 38 called "must be fixed" are still unaddressed: platform features listed as Services (budget planning, thank-you tracking, couple's website) are nowhere in the PRD; only invitation cards and digital invite are reconciled (line 380). |

### A.3 Medium/Low — spot-check of the ones that mattered

**Fixed:** X-1 (FR-32 now cites FR-42, line 571) · X-2 (§7.2 line 1289 now reads "the scope document's §2 objective 4, **its** §5.3 and **its** §8") · B-6 (§3 line 147 now delegates the ban list to §7.9 instead of restating a subset) · G-6 (Slot: "a Space's **or a Listing's** calendar") · G-7 (Space: "within a Listing… configured per Service") · G-8 (Agreement: "Blocks the relevant **Slots or Span**") · G-10 (Commitment now used in FR-20, FR-45, FR-59, FR-71, NFR 5.1) · G-11 (checklist removed, Boards added) · C-10 (NFR 5.9 dependency table added) · J-2 (FR-18 line 466 separates the per-Service price filter from the portfolio budget) · P-4 (FR-39 line 745: "The platform supplies the structure; every value in it is the Vendor's") · P-5 (NFR 5.5 line 1162 gives Guest data a lifecycle) · P-6 (NFR 5.8 now "**Every surface**", RSVP page named) · N-1 (§4.5 note added, line 528 — but incomplete, see N-M13) · M-12 (Lead Dashboard, Span, Engagement Model, Sizing Attribute, Place, Real Wedding, Guest, Board, Site Visit, Quote, Tier, Grace Period all glossed).

**Still open:**
- **M-12 residue:** `RSVP` and `Featured Listing` are still used as terms of art and are still unglossed (FR-11, FR-12, SM-6; FR-20, FR-50).
- **C-9 partial:** guest accommodation and transport now appear as normative prose at line 382, but still with no FR ID. A downstream agent walking FRs to build epics will not see it.
- **C-16 partial:** two of the three unratified inferences are now ratified in the memlog (Engage, Preferred Vendor acceptance). FR-9's per-Block individual adjustment (line 329) remains unratified and is still written as settled — memlog 82 acknowledges this.
- **P-7:** FR-12 line 375 "that **wedding's** invitations" vs NFR 5.5 line 1161 "that **Wedding's** invitations". Same sentence, same guarantee, two capitalisations.
- **G-9:** unglossed bare "Block" — **worse than before**, see N-H4.
- **B-2, B-3, L-4, L-8:** unchanged.

---

## Part B — New and regressed defects

### B.1 CRITICAL

---

**[CRITICAL] N-C1. The Glossary `Tier` entry still carries the allowance the per-Service-per-Place decision removed.**

§3 line 206:
> **Tier** — the level of a Subscription: **Founding Vendor** (₹0), **Basic**, or **Featured**. Tiers differ in placement, portfolio allowance **and how many Services may be listed in**.

FR-50 line 895:
> - What differs between tiers is: **placement in the marked Featured band, and portfolio allowance. Nothing else.**

Memlog 79 (subscription-pricing matrix) is explicit about why:
> Therefore 'how many Services the Vendor may list in' has been **REMOVED** from the tier differences, since it is now the pricing axis rather than an allowance; **otherwise Featured would grant free Services that Basic must pay for.**

The Glossary is declared binding on every downstream artifact (§0 line 16), and it is the section an architecture agent reads first. As written it will produce a `tier.max_services` allowance that FR-50 says must not exist and that breaks the pricing model — a Featured Vendor would get Services free that a Basic Vendor buys one Subscription at a time. **Fix: strike the clause from the Glossary and add "A Subscription is held for one Service in one Place" to the `Subscription` entry, where FR-50 line 896 already puts it.**

---

**[CRITICAL] N-C2. Two FRs still withdraw a budget contribution from a Shortlist, which by definition contributes nothing.**

The Selection object was inserted precisely to move the budget off the Shortlist:

> Glossary line 190 — **Shortlist** … "**Contributes nothing to the running budget.**"
> FR-8 line 307 — "**A Shortlist contributes nothing.** Five caterers under comparison are five candidates, not five costs."
> FR-22 line 516 — "**Adding to a Shortlist costs nothing and commits to nothing.** It does not move the running budget."

Two FRs were not updated and still encode the pre-Selection arithmetic:

> FR-32 line 570 — "On acceptance, impermissible **Shortlist entries** are removed and **their contribution withdrawn from the running budget**."
> FR-53 line 933 — "A Family with the lapsed Listing **on a Shortlist** is told it is no longer available, and **it stops contributing to the running budget**."

Both are subtracting zero, and both are silent on the case that actually matters — a **Selection** made impermissible by a Rule (FR-32) or stranded on a lapsed Listing (FR-53). That is the entry carrying real money, and neither FR says it is removed, warned about, or withdrawn.

**Fix: both FRs must speak about the Selection as well as the Shortlist, and only the Selection's contribution is withdrawn.**

---

**[CRITICAL] N-C3. FR-15 contradicts itself, and SM-7 measures the wrong set.**

FR-15's opening sentence and its first bullet disagree about what the collision view operates on:

> Line 420 — "When no Candidate Block can serve the whole **Shortlist**, the Family is shown exactly what is in the way."
> Line 423 — "The Family sees which **Selection** blocks which Candidate Block, by name."

FR-22 line 519 settles it in favour of Selections: "**The collision view in FR-15 reports across the Family's Selections**, since that is the set they are actually trying to make fit."

Two other places are still on the old model:

> SM-7 counter-measure, line 1267 — "the proportion of Candidate Blocks that clear a Family's whole **Shortlist**. **This is the honest test of whether matching is doing anything.**"
> UJ-1 climax, line 77 — "only the one anchored on the 27th has her **shortlisted** venue, caterer *and* photographer free…"

A Shortlist is five caterers under comparison; it will essentially never "clear" a Block, and it was never meant to. SM-7's counter-measure is described in the document as the single honest test of the product's hardest feature, and it is measuring a set the mechanism no longer uses. **Fix: FR-15's title sentence and SM-7's counter-measure both change to Selections; UJ-1's climax should say the Listings she has selected.**

---

**[CRITICAL] N-C4. "At most one Selection per Service per Wedding" contradicts per-Function Services.**

> Glossary line 191 — **Selection** — "the one Listing a Family has picked from a Shortlist within one Service. **At most one per Service per Wedding.**"
> FR-22 line 517 — "From a Shortlist the Family picks **one Selection** for that Service."

Against:

> FR-68 line 337 — "A Service may be selected for the whole Wedding **or for particular Functions**."
> FR-14 line 415 — "The Family may engage a per-Function Service for several Functions. **That is several engagements priced separately**, not one span."

A photographer engaged for the Haldi and a different one for the Reception is exactly what FR-14 licenses, and the Selection model forbids it. FR-8's per-head arithmetic compounds the problem: line 311 computes "that price times the headcount of **the Functions it serves**", which presumes one Selection spanning several Functions — the opposite of FR-14's several separately-priced engagements.

Nothing in the document resolves whether a Selection is per Service or per Service-per-Function, and the budget, the collision view (FR-15), the Workspace view (FR-10) and SM-5 all read off it. **This is the largest single gap the Selection insertion left.**

---

**[CRITICAL] N-C5. "Conditions of listing" is enumerated three times, and the three disagree.**

| Where | Contents |
|---|---|
| **FR-59** line 1012 (the authoritative one; FR-70 gates publication on it) | Verification · all-in price · published Rules · **published Commitment** |
| **FR-20** line 498 | "Verification, all-in pricing, published Rules" |
| **FR-50** line 896 | "Verification, all-in pricing and published Rules" |
| **FR-71** line 600 | Declares a **fifth class** — per-Service required capabilities — "These are conditions of listing in that Service" |

The Commitment was added to FR-59 by the last pass (the C-2 fix) and to nowhere else, so FR-20's promise that "A Featured Listing satisfies **every** condition of listing that any other Listing does" and FR-50's "**What never differs is any condition of listing**" are both now false as enumerated — they permit a Featured Listing without a Commitment, which is the exemption FR-20 exists to forbid.

FR-71 is worse: it declares its own requirements to be conditions of listing, but **FR-70 line 1004 gates visibility on "every condition of listing in FR-59"**, which does not include them. A Catering Listing with no headcount recommendation, or a Photography Listing with no named shooter, publishes cleanly. **FR-62 line 1049** — the list of what Admin can configure on a Service — also omits required capabilities, though FR-71 line 608 says they are "configured with the Service".

**Fix: make FR-59 the single enumeration, have FR-20, FR-50 and FR-70 reference it rather than restate it, and add FR-71's per-Service set to both FR-59 and FR-62.**

---

### B.2 HIGH

---

**[HIGH] N-H1. §4.11 still offers a six-month subscription term.**

§4.11 description, line 947:
> Dattatray is asked to pay again **every six or twelve months** with nothing compelling him to.

Against FR-52 line 917 ("**The term is twelve months.**"), Glossary line 205 ("a Vendor's prepaid **twelve-month** plan period"), and memlog 78, which drops the six-month option outright and gives the muhurat-seasonality reason. This is the one stale number the twelve-month decision left behind, and it sits in the description of the group that owns it.

---

**[HIGH] N-H2. The Founding Vendor tier does not satisfy the definition of a Subscription, and FR-70 gates on a condition that is never defined.**

> Glossary line 205 — **Subscription** — "a Vendor's **prepaid twelve-month** plan period."
> FR-51 line 904 — Founding Vendor expiry "is a **fixed calendar date set per cohort**, not a term running from each Vendor's sign-up".
> FR-51 line 903 — the tier is ₹0.

A ₹0 cohort-dated tier is neither prepaid nor twelve months. Then:

> FR-70 line 1004 — "A Listing becomes publicly visible only when Verification has completed and every condition of listing in FR-59 is satisfied — and, **where a Tier is required**, when a Subscription is active."

"Where a Tier is required" is undefined. FR-50 and the Glossary enumerate three tiers with no tier-less state, so either every Listing needs an active Subscription (which a Founding Vendor cannot hold under the Glossary definition) or some Listings need none (which contradicts FR-50). A downstream agent must guess whether Founding Vendors carry a Subscription row at all — and FR-56 line 966 ("For a Founding Vendor the cost is ₹0") implies they do.

---

**[HIGH] N-H3. A Subscription is held per Place; a Listing is not, and Places are hierarchical.**

> FR-50 line 896 — "**A Subscription is held for one Service in one Place.** A Vendor listing in two Services, or in two Places, holds a Subscription for each."

Against:

> FR-33 line 592 — "A Vendor declares their service area **at whatever level fits them**: a single town, a whole tehsil, several districts. **One Vendor may declare several areas at different levels.**"
> Glossary line 181 — **Listing** — "a Vendor's published offer **within one Service**." (No Place.)

So a photographer covering a tehsil of forty villages holds — one Subscription for the tehsil, or forty? At which level of the hierarchy does the Subscription's Place sit, and does a district-level Subscription subsume the towns inside it? Nothing says. The consequences propagate: FR-53's expiry "withdraws the Listing from discovery", but a Listing spans several declared Places and a Subscription covers one, so expiry has no defined effect; FR-57's five-Vendor benchmarking suppression is "in that Service and Place" with the same ambiguity; and FR-62 has Admin setting prices "per Service, per Place, per Tier" over a Place set of unbounded cardinality.

This is a genuinely new structural gap created by the pricing-matrix decision, and §0's standard means a downstream agent will invent an answer.

---

**[HIGH] N-H4. The Glossary added the rule "'Block' is never used alone" and the FRs break it eighteen times.**

§3 line 172:
> *"Block" is never used alone. Every use is **Candidate Block** or **Chosen Block**.*

Bare uses in normative text: FR-13 heading (line 392) and line 398 "The Block is applied wherever they browse"; line 401 "Block matching"; FR-15 line 426 "never chooses a Block"; FR-16 heading "Locking the Block"; FR-17 line 443 "the old Block"; FR-19 line 475 "against her Blocks"; FR-26 line 584 "their own Block"; FR-30 line 657 "**their own Block**"; FR-31 line 666 "whose Blocks fall there"; FR-44 line 827 "moved their Block"; FR-68 line 338 "Block matching"; NFR 5.3 line 1146; SM-4 line 1247 "lock a Block"; SM-7 line 1266; plus UJ-1 lines 75, 77, 78, 79 and UJ-2 line 105.

Before the rewrite this was a Medium drift (prior G-9). Now the document states the rule and violates it, which is worse: it is a self-contradiction rather than an omission. And it is load-bearing where it appears — **FR-26 and FR-30 quote a price "applicable to their own Block"**, which must mean a *Candidate* Block, since pricing is seen before locking. An agent that reads "Chosen Block" there builds pricing that only resolves after the Block is locked, which is backwards.

---

**[HIGH] N-H5. FR-32's warn-and-accept destroys the Family's work before FR-39's new first-writer-wins can fail.**

FR-39 line 747 (new, from the concurrency pass):
> **Confirmation is first-writer-wins.** If the Slots or Span are already blocked when the Vendor confirms, the confirmation fails… The Family whose confirmation is overtaken is told, and the proposed terms return to the thread as declined-by-conflict.

FR-39 line 743 puts the Family's confirmation **first**: "The Family confirms, then the Vendor confirms."

FR-32 lines 568–571 fires at that same moment ("Before the Family engages a Space or Listing…") and is irreversible on acceptance:
> - On acceptance, impermissible Shortlist entries are removed and their contribution withdrawn…
> - On acceptance, any impermissible **Agreement is cancelled under FR-42** — recorded on both profiles, Slots or Span released, no Review unlocked.

So the sequence is: Family accepts the consequence → their Shortlist entries are deleted and their other Agreements are cancelled, with a **countable cancellation recorded against blameless Vendors** under FR-42 → the Vendor then fails to confirm because someone else got the Slot first → the engagement never exists. The Family has lost everything for nothing, and the Vendors who were cancelled cannot get their counts back. FR-32 line 572's promise — "**If they decline, the engagement does not proceed and nothing about their Wedding changes**" — has no counterpart for the accept-then-conflict path.

**Fix: FR-32's destructive step must be deferred until the Agreement actually exists, or FR-39's declined-by-conflict path must roll it back.**

---

**[HIGH] N-H6. FR-45's new 90-day backstop overrides the Commitment trigger it was written to protect, and anchors on an object that may not exist.**

FR-45 lines 835–837:
> - The window opens when the Vendor marks the work delivered, **or** when the delivery timeline in the Vendor's own published Commitment (FR-59) passes — whichever comes first.
> - **It opens no later than ninety days after the last Function of the Chosen Block**, whatever the Service and whatever the Vendor has or has not done.

Memlog 37 identifies the failure this whole mechanism exists to close: Shape G work — "album, film, reels" — **arrives months later**. A Vendor whose published Commitment is a 120-day album is now reviewed at day 90, before delivery, and their Commitment becomes unreachable: it can never be the trigger, only the marking-delivered path can. That inverts the incentive the mechanism was built on. UJ-3 line 140's worked example ("A photographer who commits to ninety days is reviewable on day ninety") happens to sit exactly at the cap, which conceals the problem rather than resolving it.

Second defect in the same bullet: the backstop is measured from "the last Function of the **Chosen Block**". FR-34 line 682 expressly allows an Enquiry — and therefore an Agreement — carrying "the **Chosen or Candidate** Block", and FR-16 only says every Enquiry sent *thereafter* carries the Chosen Block. An Agreement confirmed before a Block is locked has no Chosen Block, so the backstop has no anchor and "there is no path to being unreviewable" is not true.

---

**[HIGH] N-H7. The expanded sign-in contradicts FR-5's invitation route and FR-3's single-credential claim.**

FR-1 line 228 now permits an account created by **passkey, Google or Apple** with no mobile number ever supplied. Against:

> FR-5 line 270 — "Access is granted by the creator **to a mobile number. There is no other route in.**"

An Invited Member who signed up with Google cannot be invited to a Wedding. Either FR-1's non-mobile routes must guarantee a verified mobile number, or FR-5 needs a second route.

> FR-3 line 248 — "A Vendor business has exactly one account and **one set of credentials**."

FR-1 gives every person up to four sign-in methods on one account, plus account linking. "One set of credentials" is now false; the intended claim is one *identity*, which FR-1 line 233 already states better ("**One person is one account**").

Third, unresolved: FR-1 line 234 says "The same mechanism serves Families, Vendors and Admin. There is not a separate sign-in system per surface", and line 233 says one person is one account. Dattatray planning his own daughter's wedding is therefore one account holding both a Vendor Listing and a Wedding — which FR-3's one-login-per-Vendor rule and §7.8's structural exclusion never contemplate. Nothing says whether that is permitted, forbidden, or two accounts.

---

**[HIGH] N-H8. Ranking signal 4 cannot discriminate, and signal 1 is undefined in the case FR-13 expressly allows.**

FR-20 line 491:
> 4. **Verification and completeness** — verified portfolio, published Commitment, all-in price.

All three are conditions of publication under FR-59 (line 1012). Every Listing in the organic results has all three by construction, so the signal is a constant and contributes nothing to ordering. Either it must rank on something that legitimately varies (portfolio depth, Rules specificity, response-rate completeness) or it must be struck — leaving it in means a downstream agent implements a weight that can never move.

FR-20 line 488:
> 1. **Whether the Vendor is available for the Family's Candidate Blocks.**

FR-13 line 399 expressly permits browsing before any Anchor Date exists: "**A Family may browse before supplying any Anchor Date.** Listings are shown without an availability signal — not as unavailable." In that state there are no Candidate Blocks, so the heaviest ranking signal is undefined and FR-20 does not say what the ordering falls back to.

A related tension worth recording: ordering results by availability makes the platform *act on* availability as fact, while NFR 5.6 line 1179 and FR-13 line 402 insist it is never asserted as fact, only attributed. The two are reconcilable, but the document never reconciles them.

---

**[HIGH] N-H9. The new Glossary actor and object terms are used lowercase in the FRs that define their powers.**

§3 line 147 is unambiguous: "FRs, UJs and SMs use Glossary terms verbatim; introducing a synonym anywhere is a **discipline violation**." The 18:58 capitalisation sweep covered Family, Vendor, Enquiry, Shortlist, Slot and Invited Member, and left the rest:

| Term | Lowercase in | Capitalised in |
|---|---|---|
| **Creator** | FR-5 title + lines 270, 272; FR-6 lines 277, 281 ×2, 283; FR-65 line 1092 | Glossary 152; FR-34 line 685; FR-39 line 746 |
| **Guest** | FR-11 lines 357, 358; FR-12 lines 367, 369, 373 ×2 | Glossary 156; FR-12 lines 371, 372, 382 |
| **Place** | 36 uses — FR-19 line 475 "places served", FR-33 lines 593, 595, FR-57 line 975, FR-62 line 1050, SM-7 line 1266 | Glossary 165; FR-50 line 896; FR-57 line 977; FR-62 line 1051 |
| **Span** | FR-28 line 636, FR-40 line 758, FR-42 line 793 — all "Slots **or span**" | Glossary 174, 197; FR-32 line 571, FR-39 line 747 — "Slots **or Span**" |
| **Tier** | FR-50 lines 890, 895, 897, 898 | Glossary 206; FR-70 line 1004 |
| **Board** | FR-67 lines 1110, 1112, 1113 | Glossary 164; FR-67 line 1111 |
| **Quote** | FR-35 line 697; UJ-3 line 121 | Glossary 193; UJ-2 line 101; FR-39 line 746 |
| **Site Visit** | FR-37 line 718; FR-38 title + lines 727, 729; FR-71 line 607 | Glossary 194; UJ-2 line 101; FR-39 line 746 |
| **Sizing Attribute** | FR-19 line 475; FR-62 line 1049 | Glossary 180; FR-18 line 465 |
| **Engagement Model** | FR-14 line 406; FR-62 line 1049 | Glossary 179 |
| **Grace Period** | FR-53 line 930 | Glossary 207 |

The `Slots or span` / `Slots or Span` split matters most: it is the same phrase in five FRs, half capitalised, and it is the phrase that becomes the calendar-blocking schema.

---

**[HIGH] N-H10. Two new Glossary terms are defined and then never used by the FRs that create them.**

- **Real Wedding** (Glossary line 204). FR-65 and FR-66 — the FRs that create the object — say "publish their wedding" (title), "the Family can publish it for others" (1089), "**Published weddings** are browsable" (1094), "the **published wedding**" (1103). The term appears only in the §4.14 heading and NFR 5.5 line 1169. UJ-1 line 78 additionally uses "a real wedding" in the ordinary-English sense, which now collides.
- **Amendment** (Glossary line 196). FR-69's title is "**Amending** an Agreement" and its body says "an amendment" three times, never the capitalised term.

This is the exact failure mode the last pass fixed for `Commitment` (prior G-10), reintroduced by the new material. Both terms are objects with their own history and lifecycle, and both will be built from the FR text, not from the Glossary.

---

### B.3 MEDIUM

**[MEDIUM] N-M1. FR-68 cites FR-32 for something FR-32 does not cover.**
FR-68 line 340: "Removing a Service from a Wedding removes its Shortlist. Where an Agreement exists for it, **FR-32's warn-and-accept applies** before anything is removed." FR-32 is scoped entirely to *a conflicting Rule surfaced at the moment of engagement* — its trigger is "Before the Family engages a Space or Listing" and its consequence set is Rule-driven. Removing a Service is neither. The general mechanism FR-68 wants is FR-42's cancellation plus a warn-and-accept that no FR defines. Same class of imprecise citation as prior X-1. FR-68 is also silent on the removed Service's **Selection** and its budget contribution.

**[MEDIUM] N-M2. After a cancellation, the Selection's estimate is left in limbo.**
FR-8 line 310 — "Changing or clearing a Selection, **or cancelling an Agreement**, withdraws its contribution automatically." FR-42 line 797 — "The withdrawn figure is removed from the Family's running budget." But cancelling an Agreement does not clear the Selection, and Glossary line 191 plus FR-8 line 308 say a Selection contributes its all-in price. So does the estimate come back, or does a live Selection now contribute nothing? Both readings are supported; neither is stated.

**[MEDIUM] N-M3. FR-17 and FR-53 never say what becomes of Selections.**
FR-17 cancels every Agreement pointing at the old Block and releases the Slots, and says nothing about the Selections that produced them. FR-53's lapse handles Shortlists and Agreements, not Selections. In both cases the running budget's state after the event is undefined.

**[MEDIUM] N-M4. FR-63 states the user-advisory obligation twice, at two levels of precision.**
Line 1066: "Users are reminded of the platform's terms and the rules governing what may be posted **at least once a quarter**." Line 1068: "Users are periodically informed of the platform's terms and the rules governing what may be posted." The second is the pre-threshold wording that the quarterly number replaced, left in place. A downstream agent reading a closed consequence list will treat them as two obligations.

**[MEDIUM] N-M5. FR-71's Décor requirement depends on Space data that no FR creates and no FR authorises sharing.**
Line 605: "Where the Family has engaged a Space, **its dimensions** and the Vendor's Rules are available to Décor Vendors quoting for it." FR-23 line 536 and Glossary line 182 give a Space "its own capacity, its own all-in price and its own calendar" — no dimensions, and no FR requires a Vendor to supply them. The bullet also discloses one Vendor's property data to a competing Vendor with no consent or scoping rule anywhere in §4.5, §4.12 or NFR 5.5. Same shape as the prior C-2 defect: a mechanism that consumes a field nothing produces.

**[MEDIUM] N-M6. FR-71's Venue requirement contradicts FR-38, and introduces an unsupported capability.**
FR-71 line 607: "A Family can **request** a site visit or a **virtual tour from the Listing itself**." FR-38 line 727: "**A Vendor can offer a site visit from within the thread**, and the Family can accept a time." Two different initiators and two different surfaces for the same object. "Virtual tour" occurs nowhere else in 1342 lines — FR-19's Listing core (line 475) does not carry one, FR-27's Portfolio does not mention one, and no condition of listing requires one.

**[MEDIUM] N-M7. The broadcast/sole Enquiry distinction exists in FR-34 and nowhere it is consumed.**
FR-34 line 688: "**The Lead Dashboard distinguishes an Enquiry sent to several Vendors from one sent only to that Vendor** … SM-2's Enquiry-quality counter-measure depends on the distinction being made." But FR-55 (what the dashboard shows, line 953), FR-56 (cost per Enquiry, line 964) and the Glossary `Lead Dashboard` entry (line 208) all enumerate their contents without it, and SM-2 line 1233 measures "cost per Enquiry" without saying which denominator. The FR that raises the concern is the only place that carries it.

**[MEDIUM] N-M8. FR-43 and FR-40 are stated as absolutes that FR-69 now breaks.**
FR-43 line 803: "The confirmed terms are frozen at confirmation. **Neither party, nor Admin, can alter an Agreement after the fact.**" FR-69 changes an Agreement's current terms. FR-69 line 779 reconciles this correctly for itself ("The original is never altered… appended to the same Agreement's history"), but FR-43 does not cite FR-69, and FR-4 line 261 and FR-61 line 1038 both cite **FR-43** as the integrity constraint that binds everyone. An agent building the mutation rules from FR-43 alone forbids amendments outright. Likewise FR-40 line 756's "five consequences **and no others**" is a closed-world claim that FR-69's amendment consequences (calendar adjusted, released time made available) now fall outside.

**[MEDIUM] N-M9. NFR 5.9's dependency table is stale against the pricing matrix and silent on the messaging dependencies.**
Row 1 reads "Subscription prices **per Tier**"; FR-50 line 897 and FR-62 line 1050 now make it per Service × per Place × per Tier, which is a materially larger business input. The table also omits a **WhatsApp Business API account** and an **SMS gateway**, on which FR-1 (OTP delivery), FR-29 (nudges), FR-35 (Enquiry notification and its SMS fallback) and FR-53 (renewal reminders) all depend — and which memlog 50 identifies as the single hardest external constraint in the product.

**[MEDIUM] N-M10. The pricing axis was never brought into line with the five engagement models.**
FR-26 line 582: "per span, per Function, per head, per unit, per rental period." FR-14 line 409: Span, per Function, rental period, **lead time**, **no duration**. Lead-time and no-duration Services have no stated pricing model, while "per head" and "per unit" are Sizing Attribute values (Glossary line 180) sitting on the engagement axis. FR-62 line 1049 lets Admin configure "sizing attribute, engagement model and **pricing model**" as three separate things, which is right — but the PRD never enumerates the pricing model's values consistently with either of the other two. (Partial carry-over of prior C-4.)

**[MEDIUM] N-M11. A Vendor can self-withdraw a Listing silently, which FR-53 and §7.6 forbid for every other disappearance.**
FR-70 line 1005: "A Vendor may withdraw a Listing from discovery themselves at any time, without losing it." FR-53 line 933 requires that a Family holding a lapsed Listing "is told it is no longer available… **It is never removed silently.**" FR-32 line 573 states the governing principle: "**Nothing is ever removed silently.**" §7.6 line 1307 excludes "silently removing anything from a Shortlist". Self-withdrawal is the one route out of discovery with no notice obligation attached.

**[MEDIUM] N-M12. FR-12 says "couples pay nothing for anything".**
Line 374. The non-paying party is the **Family** (Glossary line 151, Vision line 24, §2.1 line 36). Per FR-2 and §4.1 line 218 the couple are names on a Wedding, not users of the platform and not the account holder. Residual pre-Glossary actor drift, in the FR that governs the platform's largest public surface.

**[MEDIUM] N-M13. The out-of-sequence-FR note is incomplete.**
§4.5 line 528 names FR-32 and FR-33. **FR-71 was inserted into the same group** (line 598, between FR-33 and FR-27) and is not mentioned. FR-68 (§4.2), FR-69 (§4.8) and FR-70 (§4.12) are out of sequence in their groups with no equivalent note. The note exists specifically so no downstream tool "corrects" the ordering; as written it protects three of the six cases.

**[MEDIUM] N-M14. UJ-3 was not updated for the Selection object, and re-introduces the singular Slot.**
UJ-3 path step 5, line 127: "The date moves from **shortlisted to committed** in her Workspace" — the old two-step Shortlist→Agreement model, with no Selection between them. UJ-1 path step 5 (line 76) describes a Selection without naming it ("As she settles on one in each Service"). Separately, UJ-3 line 127 and constraint line 142 both say the Agreement "blocks the **slot**" / "auto-blocks the Vendor's calendar **slot**" — singular, losing the Span case that the Glossary `Agreement` fix (prior G-8) restored.

**[MEDIUM] N-M15. FR-37's site-visit outcome state is unreachable for Services without Spaces.**
FR-37 line 718 gives every Enquiry the outcome states "contacted, site visit arranged, won or lost", for any Service. Glossary line 194 defines **Site Visit** as "an arranged viewing of **a Space**", and FR-71 line 607 makes it a required capability of the **Venue** Service only. A Service with no Spaces (Glossary line 182: "Whether a Service has Spaces at all is configured per Service") has an outcome state it can never legitimately enter.

---

### B.4 LOW

| # | Finding |
|---|---|
| N-L1 | **Banned word in new text.** FR-20 line 493: "whoever gets the first **booking** compounds forever". §7.9's carve-out exempts only §7.1 and §7.9; FR-20 is in scope. |
| N-L2 | Prior banned-word residue unchanged: Vision line 26 "every vendor who turns out to be **booked**"; UJ-3 line 131 "he **double-books**". (Prior B-2, B-3.) NFR 5.10 line 1218's "your **booking** is protected" is a quoted counter-example and is defensible, but will trip a naïve sweep. |
| N-L3 | FR-12 line 375 "that **wedding's** invitations" vs NFR 5.5 line 1161 "that **Wedding's** invitations". (Prior P-7, unfixed.) |
| N-L4 | Lowercase term-of-art uses the sweep missed: **slot(s)** — UJ-2 line 98, UJ-3 lines 127, 142; **enquiry** — UJ-3 line 121 "enquiry thread", FR-57 line 975 "enquiry volume"; **family** — FR-8 line 317, FR-47 lines 859, 860, FR-64 line 1075; **vendor** — Vision line 30, NFR 5.6 line 1179, §7.2 lines 1283, 1287; **space** — UJ-3 line 123. |
| N-L5 | UJ-1 line 78 "The Workspace holds a **real wedding**" now collides in lowercase with the new Glossary term **Real Wedding**. |
| N-L6 | Prior M-12 residue: **RSVP** and **Featured Listing** are used as terms of art and are still unglossed. |
| N-L7 | FR-20's mandated public disclosure text (line 495) lists four signals and omits **rotation**, which line 493 insists is "a requirement, not a refinement". The disclosed parameters are therefore not the parameters used — the precise defect FR-64 and the CCPA framing exist to prevent. |
| N-L8 | Frontmatter still `status: draft` (line 3) though memlog 68 declares the draft complete; `updated: 2026-09-05` is now correct. (Prior L-1, half-fixed.) |
| N-L9 | §7.3 line 1297 "**A Family assembles her own set**" — number/pronoun disagreement. (Prior L-4, unfixed.) |

---

## Part C — What the fixes got right, and should not be undone

- **All seven prior Criticals are genuinely closed**, and several were closed better than asked: FR-59's Commitment bullet explains *why* the delivery timeline is not optional, FR-4/FR-61 state the "role restriction, not limits" distinction rather than merely softening the absolute, and NFR 5.5 forbids re-deriving the erasure precedence downstream.
- **FR-14's five engagement models with the explicit "an agent must not infer 'no calendar' from 'no duration'"** is the single best-written fix in the pass — it names the wrong inference and forbids it.
- **The Glossary's `Function` disambiguation** (line 162) resolves the Mehndi/Sangeet collision with worked examples rather than a rule, which is what makes it usable.
- **FR-71's closing bullet** ("Adding a Service means deciding what that Service must carry") turns a list of five special cases into a general rule about the engine. That is the right altitude; only its wiring into FR-59/FR-62/FR-70 is missing.
- **FR IDs remain perfect** — 71 headings, FR-1..FR-71, no duplicates, no gaps, and every internal FR reference resolves to an existing FR. Four FRs were inserted out of sequence without renumbering, exactly as §0 requires.
- **Every one of the 14 ratified thresholds appears in the PRD, and none is stated twice with different values.** The only numeric contradiction in the document is §4.11's "six or twelve months" (N-H1), which is a leftover, not a duplicated threshold.

---

## Part D — Recommended fix order

**Before any downstream agent reads this document:**

1. **N-C1** — strike "how many Services may be listed in" from the Glossary `Tier` entry; add the per-Service-per-Place rule to `Subscription`.
2. **N-C4** — decide whether a Selection is per Service or per Service-per-Function, and conform Glossary, FR-22, FR-8, FR-14 and FR-68.
3. **N-C2 / N-C3** — sweep Shortlist→Selection through FR-32, FR-53, FR-15's title sentence, SM-7's counter-measure and UJ-1's climax.
4. **N-C5** — make FR-59 the single enumeration of conditions of listing; have FR-20, FR-50, FR-62 and FR-70 reference it and absorb FR-71's set.
5. **N-H1** — "six or twelve months" → twelve months in §4.11.
6. **N-H5** — defer FR-32's destructive step until the Agreement exists, or make FR-39's declined-by-conflict path roll it back.

**Before architecture:** N-H2 (Founding Vendor vs Subscription), N-H3 (Subscription Place cardinality), N-H4 (bare "Block"), N-H6 (90-day backstop vs Commitment; Chosen Block anchor), N-H7 (sign-in vs FR-5/FR-3), N-H9 (Creator/Guest/Place/Span capitalisation — these become schema), N-M9 (dependency table).

**Before UX:** N-H8 (ranking signal 4), N-H10, N-M5, N-M6, N-M11, N-M15.
