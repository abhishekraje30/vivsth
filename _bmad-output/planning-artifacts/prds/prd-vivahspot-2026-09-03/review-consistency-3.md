---
title: Consistency Audit — Round 3
target: prd.md
authority: .memlog.md
verified-against: review-consistency-2.md (Critical + High only)
date: 2026-09-06
---

# Consistency Audit — Round 3

## Verdict

**The pattern held for a third round.** Round 2's fixes closed most of what they aimed at, but the newest decisions — the ten rule changes landed after round 2 and never audited — were written into their home FR and not chased through the document. Every Critical below is a rule that is stated correctly in one place and stated in its superseded form somewhere else.

The characteristic failure is now precise enough to name: **a rule change is applied to the FR that owns it, to the Glossary entry that names it, and to nothing else.** Three of this round's four Criticals are the *residue of a round-2 fix* — old wording that survived inside a sentence the fixer rewrote for a different reason.

**Counts: 4 Critical · 10 High · 17 Medium · 5 Low (36 findings).**
**Round-2 status: 1 of 5 Criticals fully closed, 1 substantially closed, 3 partial. Of 10 Highs: 4 fixed, 3 partial, 3 still open.**

FR IDs are clean: FR-1..FR-72 all present, no duplicates, no gaps, no dangling cross-references.

---

## Part A — Round 2's Critical and High findings, verified

### A.1 Criticals

**N-C1 — Glossary `Tier` carries a removed allowance. → PARTIAL, and the fix regressed.**

The allowance clause is gone. Its replacement is stale under a rule that landed *after* round 2:

> §3 line 206: "How many Services a Vendor lists in is not a Tier allowance — **a Subscription is held per Service per Place**, so each is paid for."

Against the corrected model two lines above it:

> §3 line 205: "**Subscription** — a Vendor's prepaid twelve-month plan for **one Service**, priced by that Service and by the Vendor's own Place."
> FR-50 line 922: "**A Subscription is held for one Service.** A Vendor listing in two Services holds a Subscription for each."

See **NEW-C1**.

---

**N-C2 — Two FRs withdrew a budget contribution from a Shortlist. → FIXED.**

> FR-32 line 583: "impermissible Shortlist entries are removed, and **any Selection among them is cleared and its contribution withdrawn from the running budget**."
> FR-53 line 962: "**Where it was their Selection, the Selection is cleared and its contribution withdrawn from the running budget.** Nothing is removed silently."

---

**N-C3 — FR-15 contradicted itself; SM-7 measured the wrong set. → PARTIAL.**

Both normative sites fixed:

> FR-15 line 433: "When no Candidate Block can serve **the Family's Selections**, they are shown exactly what is in the way."
> SM-7 line 1297: "the proportion of Candidate Blocks that clear **a Family's whole set of Selections**."

UJ-1's climax was not:

> line 77: "only the one anchored on the 27th has her **shortlisted** venue, caterer *and* photographer free across every day and Slot it needs."

Under FR-22 a Shortlist is candidates under comparison and will essentially never "clear"; the journey still narrates the pre-Selection mechanism. **Medium residue (M-16).**

---

**N-C4 — "One Selection per Service per Wedding" contradicted per-Function Services. → FIXED at the definition, chase incomplete.**

> §3 line 191: "**One Selection per Service per Function it serves.** A Service engaged as a Span across every Function carries one Selection; a per-Function Service carries one for each Function it serves… the lawn for the Haldi and the hall for the Reception are two Selections in the same Service."
> FR-22 line 530: "the Family picks a **Selection** for each Function that Service must serve — one for the whole Wedding where the Service is engaged as a Span."

Two sites still encode the singular. See **NEW-C4** and **M-1**.

---

**N-C5 — "Conditions of listing" enumerated three times, disagreeing. → PARTIAL.**

The two citing FRs were fixed:

> FR-20 line 511: "A Featured Listing satisfies **every condition of listing in FR-59 and FR-71**."
> FR-50 line 924: "The conditions in **FR-59 and FR-71** apply identically at every Tier."

The two round-2 named as also needing it were not:

> FR-70 line 1034: "A Listing becomes publicly visible only when Verification has completed and every condition of listing **in FR-59** is satisfied."
> FR-62 line 1078: "Admin can define a new Service — its taxonomy, fields, filters, comparison attributes, sizing attribute, engagement model and pricing model" — no required capabilities.

FR-71 line 615 now says its requirements are "**additional conditions of listing, on top of the general ones in FR-59**" and "configured with the Service" — but the FR that gates publication does not check them and the FR that defines configuration does not carry them. A Catering Listing with no headcount recommendation still publishes cleanly. **Still High (H-2).**

### A.2 Highs

| # | Finding | Status | Evidence |
|---|---|---|---|
| N-H1 | §4.11 offers a six-month term | **FIXED** | §4.11 line 976: "asked to pay again **every year**" |
| N-H2 | Founding Vendor ≠ Subscription definition; "where a Tier is required" undefined | **STILL OPEN** | Glossary 205 "**prepaid twelve-month**" vs FR-51 "₹0" + "fixed calendar date set per cohort"; FR-70 line 1034 still reads "**where a Tier is required**" with no tier-less state defined anywhere |
| N-H3 | Subscription held per Place, Listing is not | **FIXED in the FRs** | FR-50 line 922–923 "held for one Service… **buys no territory and limits no reach**"; FR-62 line 1081 "The Place in that matrix is where the **Vendor's own business sits**". Residue in Glossary Tier — see NEW-C1 |
| N-H4 | Glossary banned bare "Block", FRs broke it 18× | **FIXED** | §3 line 172 replaced with a reading rule: "Where this document says **Block** alone, it means whichever Block is in force" |
| N-H5 | FR-32 destroyed the Family's work before FR-39 could fail | **FIXED** | FR-32 line 586: "**Nothing is removed until the engagement actually completes.** Acceptance authorises the consequence; the consequence takes effect only when the Agreement is confirmed. If confirmation fails — because the Slots were taken first under FR-39 — the Family's Shortlist, Selections and existing Agreements are exactly as they were." |
| N-H6 | 90-day backstop overrode the Commitment; anchored on an object that may not exist | **PARTIAL — and the fix opened a larger hole** | Commitment half fixed (FR-45 line 863 "**whichever of those two is later**"). Anchor half untouched: still "ninety days after the last Function of **the Chosen Block**". See NEW-C3 |
| N-H7 | Sign-in contradicted FR-5 and FR-3 | **PARTIAL** | Linking fixed — FR-1 line 233–234: "**the mobile number is the identity**… links only where it carries a **verified mobile number matching that account**"; "**Linking requires proof of control** — a one-time code to its number". FR-3 line 250 unchanged: "one account and **one set of credentials**". Vendor-who-is-also-a-Family still unaddressed |
| N-H8 | Signal 4 could not discriminate; signal 1 undefined pre-Anchor-Date | **PARTIAL** | Signal 4 fixed — FR-20 line 504: "**How recently Verification was confirmed.** Every published Listing is verified, so verification itself separates nobody; how fresh that check is does." Signal 1 fallback still absent while FR-13 line 412 still permits browsing with no Anchor Date. New consequences: see H-3 |
| N-H9 | New Glossary terms used lowercase in the FRs defining them | **STILL OPEN** | `creator` lowercase 7×; `Slots or span` at FR-28 line 662, FR-40 line 787, FR-42 line 820; `place` lowercase at FR-19 line 488, FR-33 lines 608/611, FR-57 line 1004; `tier` lowercase 12×; `guest` lowercase 4× |
| N-H10 | `Real Wedding` and `Amendment` defined but unused | **STILL OPEN** | `Real Wedding` appears only at Glossary 204, FR-72 line 327, the §4.14 heading and NFR 5.5 line 1199 — never in FR-65/FR-66, which say "publish their wedding" and "**Published weddings** are browsable". `Amendment` appears only at Glossary 196; FR-69 says "an amendment" throughout |

---

## Part B — Chasing the newest rule changes

### B.1 CRITICAL

---

**[CRITICAL] NEW-C1. The Glossary contradicts itself on how a Subscription is held, and the wrong half is the one an architect reads for the schema.**

Memlog 87 is the authority and is unambiguous:

> CORRECT MODEL: a Subscription is held **per SERVICE**, priced by that Service and by the **VENDOR'S OWN PLACE**… My previous wording implied a Subscription was bought per Place of appearance, i.e. reach-based charging, which Abhishek explicitly rejects.

The rule landed in Glossary `Subscription` (205), FR-50 (922–927) and FR-62 (1081). It did not land eighteen words later in the same Glossary block:

> §3 line 206: "a Subscription is held **per Service per Place**, so each is paid for."

Two adjacent Glossary entries now define the same object's cardinality differently. §0 line 16 makes the Glossary "binding on every downstream artifact", and this is the entry that becomes `subscription.tier` — an agent reading it emits a `(service, place)` composite key, which is the reach-based charging Abhishek rejected by name.

**Fix: "a Subscription is held per Service, so each Service is paid for separately."**

---

**[CRITICAL] NEW-C2. FR-71's seed table declares Décor a Span Service priced per Function, which FR-14 forbids, and which re-opens the setup/teardown collision FR-14 exists to dissolve.**

The seed table (line 632):

> | **Décor & Mandap** | **Span, from build to strike** | **per Function served** | the Space's own dimensions | no |

Against FR-14 line 426:

> "A Vendor prices against the declared model: **a span Service quotes for the span, a per-Function Service quotes per Function.**"

A Service cannot be engaged as a Span and priced per Function; the table's Décor row is the one row that violates the rule the same FR states. Worse, the engagement model itself is wrong twice over:

- **Against the Glossary.** `Span` (174) is "from the start of the **first Function a Service serves** to the end of the last". "From build to strike" begins *before* the first Function — it is exactly the setup/teardown window the Span model was chosen to eliminate.
- **Against FR-14's own rationale**, line 429: "a decorator striking the Haldi set and building the mandap overnight is **working inside the Family's own engagement, because the venue is a span Service and the Family holds it throughout**. There is no setup or teardown window to declare, no buffer to configure."

FR-14 says the decorator holds *no span of their own*; the seed table gives them one. Memlog 40 records the whole point of the decision: "This DISSOLVES the setup/teardown collision entirely." The table re-creates it, and it is the row a downstream agent will implement literally.

**Fix: Décor is engaged per Function (or against the Space's engagement), priced per Function served. If Décor genuinely needs its own span, FR-14's rationale paragraph must be withdrawn.**

---

**[CRITICAL] NEW-C3. FR-45's "later of" backstop removed the cap it was, and FR-72 restores the old rule by restating it. There are now two paths to being unreviewable, in an FR that says there are none.**

FR-45 line 863 (the round-2 fix):

> "It opens no later than the Vendor's committed delivery date, **or ninety days after the last Function of the Chosen Block — whichever of those two is later.** … **There is no path to being unreviewable.**"

Three defects, all created or aggravated by that sentence:

1. **The backstop is now unbounded.** Taking the *later* of the two makes the committed date the ceiling, not the floor. FR-59 imposes no maximum on a published delivery timeline. A Vendor who publishes a 900-day Commitment is unreviewable for 900 days, entirely within the rules — the exact stonewalling FR-45 line 866 forbids ("A Vendor **cannot hold it shut by delivering late**"). Round 2's complaint was that 90 days truncated an honest 120-day Commitment; the fix removed the cap rather than raising it.
2. **The anchor still may not exist** (N-H6, unfixed). FR-34 line 708 permits an Enquiry — and therefore an Agreement — carrying "the **Chosen or Candidate** Block". An Agreement confirmed before locking has no Chosen Block, so "ninety days after the last Function of the Chosen Block" has nothing to measure from.
3. **FR-72 makes (2) permanent and restates the pre-fix rule.** FR-72 line 327: "Concluding is what starts **the ninety-day review backstop (FR-45)**" — the "later of" qualifier is gone, so the two FRs now state different backstops. And FR-72 line 328: "**A Wedding with no Chosen Block never concludes on its own.**" Chained together: no Chosen Block → never concluded → backstop never starts → the review window never opens. That is a second, structural path to being unreviewable, in the FR added to give FR-45 its anchor.

**Fix: state the backstop once, in FR-45, as an upper bound with a stated maximum; anchor it on the last Function of the Block the Agreement was confirmed against, not on the Chosen Block; make FR-72 cite rather than restate it.**

---

**[CRITICAL] NEW-C4. FR-8 budgets a Selection attached to no Function, which the Selection definition makes impossible.**

> FR-8 line 314: "**A Selection not yet attached to any Function shows as not yet estimated — never as ₹0.**"
> §3 line 191: "**One Selection per Service per Function it serves.**"

Under the current rule a Selection is *constituted by* the Function it serves — a Selection attached to no Function is not an under-specified Selection, it is not a Selection. FR-8's bullet is the pre-change model (one Selection per Service per Wedding, Functions attached later) preserved verbatim.

This is load-bearing: it is the rule that stops the running budget showing ₹0, and it names a state the object model no longer has. A downstream agent must either make Function optional on Selection — reopening N-C4 — or drop the ₹0 guard.

**Fix: the "not yet estimated" state belongs to a Selection whose Function has no headcount or no price yet, not to one with no Function.**

---

### B.2 HIGH

**[HIGH] H-1. UJ-2 still has Dattatray configuring his own slots, and only two of the four.**

> UJ-2 line 98: "Opens his **calendar**: blocks what is already taken, **splits days into morning and evening slots**, and sets lower pricing for the Chaturmas months."

Against the decision (memlog 86, "slots fix for everyone") as written into the Glossary and FR-28:

> §3 line 173: "**morning, afternoon, evening, night**. The same four everywhere, for every Service, every Function and every calendar… **Slots are not configurable**."
> FR-28 line 659: "**The four Slots are the same for every Service.** They are a property of the day, not of what is being sold."

The journey is the surviving instance of the reversed rule, and it is doubly wrong: it has the Vendor *creating* slots, and it names a two-slot day. §0 makes journeys normative ("Confirmed constraints carried by UJ-2" derive from the path). This is the only place in the document where the old per-Service slot model still lives.

**Fix: "Opens his calendar: blocks the Slots already taken, and sets lower pricing for the Chaturmas months."**

---

**[HIGH] H-2. FR-70 and FR-62 still do not know FR-71 exists.** (N-C5 residue — see A.1.) FR-71 declares itself a condition of listing and is configured with the Service; the FR that gates publication checks only FR-59, and the FR enumerating what Admin configures on a Service omits required capabilities. Both were named in round 2's fix instruction and neither was applied.

---

**[HIGH] H-3. Ranking signal 4 is now verification recency, and nothing in the document lets a compliant Vendor's verification stay recent.**

FR-20 line 504 makes recency a ranking signal. The only refresh mechanism in the document is FR-58 line 1023:

> "**Changing what was verified requires verifying it again.** New portfolio images, a change of business identity or a new Space are not publicly visible until Verification has covered them."

There is no periodic re-verification, no expiry, no Vendor-initiated re-check. Three consequences the change was never chased into:

- A Vendor who changes nothing decays down the ranking permanently, with no defined remedy.
- The only way to refresh is to *change something*, so the signal rewards portfolio churn — and every refresh consumes the resource §5.9 names as the scarcest in the business ("Staff who physically visit and verify Vendors and portfolios… the whole trust spine").
- **Level mismatch.** Verification is defined at the Vendor (§3 line 186: "the human check of **a Vendor's** identity, business registration and portfolio authenticity"), but ranking orders Listings. A Vendor with three Listings carries one verification date across all three — the same Vendor-vs-Listing confusion the rating-scope decision was made to remove.

**Fix: FR-58 needs a re-verification cadence, or signal 4 needs a Listing-level basis.**

---

**[HIGH] H-4. FR-72 tells the Family what happens if they do not answer, and the document never says what that is.**

> FR-72 line 328: "Where one has seen no activity for a year and holds no confirmed Agreement, the Family is asked whether to keep it, **and told what happens if they do not answer**."

Nothing anywhere states the outcome. §0 line 14 is explicit about the standard: "Anywhere this document is silent or vague, an agent downstream will decide for itself, and that decision will be nobody's." Deletion, archival, and abandonment are all defensible and all different — and the choice cascades into NFR 5.5's Guest erasure and FR-43's retention.

---

**[HIGH] H-5. FR-72's three states are not in the Glossary, and "abandoned" collides with SM-4's existing measure.**

FR-72 introduces **in planning**, **concluded** and **abandoned** as normative states that FR-45, NFR 5.5 and FR-65 are said to key off. §3 line 147 is binding: "FRs, UJs and SMs use Glossary terms verbatim; introducing a synonym anywhere is a **discipline violation**." None of the three is defined there, and the `Wedding` entry (160) lists what a Wedding holds without mentioning a lifecycle.

The collision:

> FR-72 line 329: "The Creator can **abandon** a Wedding at any time" — a deliberate act with consequences (Agreements cancelled, Slots released, Guest list erased).
> SM-4 line 1277: "**Counter-measure: abandonment** — Weddings created and never returned to, and Weddings that lock a Block but produce no Agreement."

SM-4's "abandonment" is precisely the case FR-72 says is *not* abandoned — it is the stale Wedding of H-4, which the Family is asked about. The metric and the state now share a word and mean opposite things.

---

**[HIGH] H-6. Banned vocabulary appears three times outside the exempt sections, including in the Vision.**

§7.9 bans "Booking / booked" and exempts only §7.1 and itself.

> §1 line 26: "every vendor who turns out to be **booked** sends the Family back to the start."
> UJ-3 line 131: "She cancels, or he **double-books**."
> FR-20 line 506: "without it whoever gets the **first booking** compounds forever."

FR-20's is the worst placed — it is the rationale sentence for rotation being a requirement, i.e. normative text an agent reads to justify a mechanism. The Vision instance is the document's opening argument.

---

**[HIGH] H-7. FR-3 still claims one set of credentials.** (N-H7, unfixed.) FR-3 line 250: "A Vendor business has exactly one account and **one set of credentials**." FR-1 gives every person up to four sign-in methods plus linking. The claim FR-3 wants is one *identity*, which FR-1 line 233 already states correctly.

---

**[HIGH] H-8. FR-20's heaviest signal is still undefined in the state FR-13 expressly allows.** (N-H8, unfixed.) Signal 1 is availability for the Candidate Blocks; FR-13 line 412 permits browsing before any Anchor Date exists, in which case there are no Candidate Blocks and FR-20 states no fallback ordering.

---

**[HIGH] H-9. The seed table's Sizing Attribute for Décor is outside the closed enumeration.**

> §3 line 180: "**Sizing Attribute** — what determines the size of an order in a Service: **capacity, crew bandwidth, headcount, quantity, or none.** Declared per Service."
> FR-18 line 478: "the Service's own Sizing Attribute (**capacity, bandwidth, headcount, quantity**)" — the filter set, also closed.
> FR-71 table line 632: Décor sized by "**the Space's own dimensions**".

A sixth value that neither the Glossary enumeration nor the filter list admits, introduced by the seed table the same pass added. Either the enumeration opens (and FR-18's filter list follows) or Décor's sizing attribute is `capacity` derived from the Space.

---

**[HIGH] H-10. Founding Vendor still fails the Subscription definition, and "where a Tier is required" is still undefined.** (N-H2, unfixed — see A.2.) A ₹0 cohort-dated tier is neither prepaid nor twelve months; FR-56 line 995 ("For a Founding Vendor the cost is ₹0, and the figures still accumulate") implies a Subscription row exists, while the Glossary definition says it cannot.

---

### B.3 MEDIUM

**M-1.** FR-10 line 360: "every Shortlist and **the Selection made from it**" — singular, pre-change. A Shortlist for a per-Function Service now yields several Selections.

**M-2.** FR-8 line 313: per-head price × "the headcount of **the Functions it serves**" — plural, presuming one Selection spanning Functions. Under FR-71's table Catering is per Function, so each Catering Selection serves exactly one.

**M-3.** No budget arithmetic exists for FR-71's "**per Function served**" pricing model (Décor). FR-8 handles per-head and flat; nothing says how a Span Selection priced per Function contributes.

**M-4.** NFR 5.5 line 1192 erases Guest contacts at "the later of the last Function of that Wedding **or the close of RSVP**"; FR-72 line 327 says erasure is started by *concluding*, which line 326 defines as the last Function passing. Two different triggers for the same erasure. NFR 5.5 is also silent on abandonment, which FR-72 line 329 says erases the Guest list.

**M-5.** FR-65 does not gate on `concluded`: "After the wedding, the Family can publish it for others." FR-72 line 327 asserts concluding is what enables it. One-way reference.

**M-6.** SM-4 line 1276: "ratings Families give **Vendors**" — stale after the rating-of-Listing decision (FR-46 line 873: "published on the **Listing** they engaged. A Vendor holding Listings in several Services is rated separately in each").

**M-7.** FR-63 states the user-advisory obligation twice, once numerically and once vaguely: line 1095 "**at least once a quarter**" and line 1097 "Users are **periodically** informed of the platform's terms and the rules governing what may be posted." Delete the second.

**M-8.** Capitalisation drift (N-H9, unfixed): `creator` ×7, `Slots or span` ×3 (FR-28, FR-40, FR-42 — the phrase that becomes the calendar-blocking schema), `place` ×5, `tier` ×12, `guest` ×4.

**M-9.** `Real Wedding` and `Amendment` remain unused by FR-65/66 and FR-69 (N-H10, unfixed).

**M-10.** FR-68 line 353 still cites FR-32 for Service removal, which FR-32 does not cover (its trigger is a conflicting Rule at engagement); and FR-68 is still silent on the removed Service's **Selection** and its budget contribution.

**M-11.** "Profile" carries the cancellation count in four places (FR-17 line 457, FR-32 line 584, FR-69 line 809, FR-42 line 821) and is not a Glossary term. Now that rating is Listing-level, whether a cancellation lands on the Vendor or the Listing is undefined.

**M-12.** FR-37's state set reads as one sequence but is two axes: `sent → answered | unanswered` is platform-derived, `contacted / site visit arranged / won / lost` is Vendor-marked. The document never says they are orthogonal, so an agent may build a single enum in which marking "contacted" clears "answered". `Enquiry` (§3 line 192) carries no states at all. UJ-2 line 102 says "site visit", not "site visit arranged".

**M-13.** The thirty-day unanswered rule is stated in both FR-35 line 728 and FR-37 line 744. Currently consistent; two sites for one threshold is how they stop being.

**M-14.** FR-71's table makes Photography "per Function", leaving the album — the Shape G case that FR-45 line 867 names explicitly ("for a photographer **the arrival of the album**") and that memlog 43 says the whole Delivery mechanism exists for — with no engagement model. FR-14's `lead time` model is not exercised by any seed row.

**M-15.** §5.9 line 1230 lists the blocking dependency as "**Subscription prices per Tier**", omitting per Service and per the Vendor's own Place — the axes FR-50 and FR-62 now require before a single price can be set.

**M-16.** UJ-1's climax still says "shortlisted" where it means Selections (N-C3 residue).

**M-17.** FR-57 line 1006 suppresses benchmarking below "five Vendors active in that Service and **Place**". With Subscription Place now meaning the Vendor's own business location while reach is global, which Place scopes the comparison is undefined — and at village level in the hierarchy the suppression threshold will bite almost everywhere.

### B.4 LOW

**L-1.** §7.9's carve-out exempts only §7.1 and §7.9, but FR-41 line 797, NFR 5.6 lines 1208–1211 and NFR 5.10 line 1248 ("not 'your booking is protected'") all necessarily quote banned phrases in order to forbid them. As written the document fails its own sweep. Extend the carve-out to prohibitive quotation, or the rule is unenforceable.

**L-2.** FR-72 is placed out of numeric order in §4.2 with no note. §4.5 line 541 carries exactly such a note for FR-32/FR-33 ("do not renumber them to restore sequence"); FR-68, FR-69, FR-70, FR-71 and FR-72 have none.

**L-3.** FR-72's "no activity for **a year**" is a new threshold outside the fourteen ratified in memlog 72.

**L-4.** UJ-3 lines 127 and 142 say the Agreement "blocks the **slot**" — singular and lowercase — for a venue, which FR-71's table makes a Span Service blocking the whole span including overnights.

**L-5.** The seed table exercises 2 of the 5 engagement models (Span, per Function). Rental period, lead time and no duration have no worked example anywhere, and FR-14 line 423 warns specifically that "An agent must not infer 'no calendar' from 'no duration'."

---

## Part C — The four audited dimensions

**Glossary vs FRs.** One internal contradiction (NEW-C1). Three FR-72 states missing (H-5). One closed enumeration violated by a new table (H-9). `Delivery` (199) carries the marks-delivered / committed-date pair but not FR-45's backstop, so the Glossary and FR-45 define window-opening differently. Two terms defined and unused (M-9). `Profile` used normatively and undefined (M-11). `Enquiry` carries no state set though FR-37 now enumerates one (M-12).

**Numbers.** No threshold is stated twice with conflicting *values*. Two conflicting *rules* around numbers: FR-45's "later of committed date or 90 days" restated by FR-72 as "the ninety-day review backstop" (NEW-C3), and FR-63's quarterly advisory stated numerically and then vaguely (M-7). All fourteen ratified thresholds are present and singular. FR-40's "five consequences" matches its five bullets; FR-47's "three and no others" matches its three questions.

**FR IDs.** FR-1..FR-72 complete: no duplicates, no gaps, no dangling references. Five FRs sit out of numeric order with only one covered by a note (L-2). Reference asymmetries: FR-72 → FR-45/NFR 5.5/FR-65 with no return path (NEW-C3, M-4, M-5); FR-71 cited by FR-20 and FR-50 but not by FR-70 or FR-62 (H-2); FR-68 → FR-32 mis-cited (M-10).

**Banned vocabulary.** Three violations outside the exempt sections (H-6). No `cart`, `checkout`, `v1`, `MVP` or `Phase N` anywhere. The carve-out itself is under-specified (L-1).

---

## Part D — Is the document internally consistent?

**No.** It is closer than after round 2 — the arithmetic, the collision view, the conditions-of-listing citations, the FR-32 ordering and the account-linking hole are genuinely closed, and the FR numbering is clean. But four Criticals remain, and every one is the same failure: **the newest rule reached its own FR and stopped.** The Subscription rule reached the Glossary entry above and not the one below it. The Selection rule reached FR-22 and not FR-8. The Slot rule reached FR-28 and not the journey that motivates it. The FR-45 rule reached FR-45 and was then restated in its superseded form by the brand-new FR-72.

The document is not yet safe for an autonomous build. The four Criticals plus H-1, H-2 and H-4 would each cause a downstream agent to build the wrong thing without ever detecting a contradiction, because in each case the stale text reads as internally coherent.

## Part E — Fix order

1. **NEW-C1** — one clause in Glossary `Tier`.
2. **NEW-C4** — one bullet in FR-8.
3. **H-1** — one clause in UJ-2 step 3.
4. **H-6** — three words.
5. **NEW-C3** — FR-45 needs a real upper bound and an anchor that always exists; FR-72 must cite it, not restate it.
6. **NEW-C2** — decide whether Décor holds its own span; the answer changes FR-14's rationale or the table's Décor row.
7. **H-2, H-4, H-5, H-3, H-9** — the FR-71 and FR-72 chase-through.
8. Mediums, then Lows. **M-8's `Slots or span` is the highest-value Medium**: it is one phrase in three FRs and it becomes the calendar-blocking schema.

**Process note.** Three rounds have now produced the same failure mode. A rule change should be applied by grepping the document for the *old* rule's vocabulary before the new wording is written — for this round: `per Service per Place`, `not yet attached to any Function`, `morning and evening`, `ninety-day`, `shortlisted`, `ratings Families give Vendors`. Every Critical in this audit would have been caught by that grep.
