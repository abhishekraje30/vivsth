---
title: PRD Audit — Pass 5 (delta only)
target: prd.md
scope: changes recorded in .memlog.md entry 88 (round-4 fixes)
date: 2026-09-06
---

# Pass 5 — narrow delta audit

**Method.** PRD read in full once. Only the eight changed rules in memlog 88 were chased through the document, plus the quick pass on FR IDs, banned vocabulary and Glossary staleness. Prior audit (`review-pass4.md`) consulted only to determine whether a named round-3/4 finding is closed.

**Verdict.** Round 4's grep verification worked — for the one class of defect grep can see. Every deleted string is genuinely gone: no residue of the 90-day clause, no residue of "confirmed headcount", FR-18's third enum variant removed, no duplicate/stale restatement of any edited sentence anywhere. That class is 100% clean for the first time in five rounds.

It did nothing for the dominant class. **A consumer of a changed rule does not contain the changed string**, so grep cannot find it, and the same failure recurs a fifth time: six of the eight round-4 fixes stop at the FR they edited. Worse, three fixes created defects of a kind the previous four rounds did not produce — they collide with *existing* vocabulary rather than leaving stale text behind. One of them contradicts a decision Abhishek ratified in memlog 80.

Counts: **3 CRITICAL, 5 HIGH, 7 MEDIUM, 7 LOW (22 total).** Seventeen are new or newly aggravated by round 4; five are carried-over items round 4 did not attempt.

---

## 1. Did the round-4 fixes hold?

| Round-4 fix (memlog 88) | Landed? | Reached its consumers? |
|---|---|---|
| FR-39 self-dealing bar (different accounts) | Yes — line 792, well placed (blocks at Enquiry, so no thread can exist to propose from) | **Mostly** — FR-34 and FR-22 carry no pointer (M-5); FR-25 decision still not made (M-6) |
| FR-45 rewritten; 90-day clause deleted | Yes — lines 881–882; no residue anywhere | **No** — the deletion removed the only date anchor the trigger had (**C-1**) |
| Glossary `Delivery` mirrors the cap | Yes — line 199 | **Partly** — head clause and FR-45 bullet 5 still state the old sense (M-4) |
| FR-71 table: Catering → the Function's guest count | Yes — line 648 | **No** — FR-19 and FR-18 cannot consume it (**C-3**) |
| Sizing Attribute set closed | Yes — line 180; every seed value inside it | **No** — the set now mixes two incompatible kinds (**C-3**); `dimensions`/`stated size` synonym persists (M-2) |
| Guest form hardened | Yes — line 385, all four protections | **No** — the reciprocal never reached FR-12's RSVP page (**H-1**); FR-72 silent (**H-2**) |
| Glossary `Guest` widened | Yes — line 156 | **Partly** — head clause unwidened, so "guest list"-phrased rules miss it (**H-4**); FR-6 never updated (**H-5**) |
| "Engagement" constructed by a Selection | Yes — FR-8 line 313 | **No** — collides with Glossary `Engage` and reverses memlog 80 (**C-2**); construction is circular (**H-3**) |
| NFR 5.8 names both public pages | Yes — line 1243 | **Yes** — closed (rationale sentence still one-sided, L-2) |

**Pass-4 findings closed:** C-1's three-way contradiction (closed, replaced), C-2's FR-11 reversal (closed), C-3's self-Agreement path (closed), H-1's four missing form protections (closed), H-3 at FR-11 (closed at one end only).
**Pass-4 findings still open:** H-2 (partly), H-4 (answered circularly), H-5 (half), H-6 (not attempted — out of round-4 scope), M-1, M-2, M-3, M-4, M-5, M-6, M-7, L-1, L-4, L-5.

---

## 2. CRITICAL

### C-1. Deleting the 90-day clause removed the only anchor FR-45's trigger had. The review window can no longer be computed.

FR-45 now has exactly two arms:

- line 881: "The window opens when the Vendor marks the work delivered, **or when the delivery timeline in the Vendor's own published Commitment (FR-59) passes** — whichever comes first."
- line 882: the one-year cap, anchored on "the Wedding's last day".

A **delivery timeline** is a duration, not a date. Glossary `Commitment` (183) calls it "the delivery timeline"; FR-21 (536) compares photographers on "delivery timeline"; UJ-3 (140) illustrates it as "ninety days". A duration cannot "pass" — it must run from something. **Nothing in the document says from what.** The wedding day? The last Function it serves? Agreement confirmation? The Function the Service was engaged for?

The deleted bullet was the only place that supplied one: "ninety days **after the last Function of the Chosen Block**". Round 4 removed the arm that carried the anchor and left the arm that needs it. Glossary `Delivery` (199) papers over this by saying "their committed delivery **date** passes" — a date, not a timeline — so the Glossary and FR-45 are now computing different quantities from the same field.

**Second facet, equally serious.** The trigger is a **Listing field the Vendor can edit at any time**, and it is not among the terms an Agreement freezes:

- FR-39 (789) lists an Agreement's terms: "the days and Slots, the Space or offering, the guest count, the all-in price, what is included, and the Rules that apply." The delivery timeline is **not** among them.
- FR-43 (850) freezes the Agreement. It does not reach a field the Agreement does not contain.
- FR-58 (1045) requires re-Verification for "new portfolio images, a change of business identity or a new Space." It does not cover the Commitment.

So a photographer who published a 30-day timeline can, the week after the wedding, edit it to 300 days and push his own review window out by nine months — bounded only by the one-year cap. FR-45 line 884 says in terms "**A Vendor cannot hold it shut by delivering late.**" He does not have to deliver late. He edits the field the rule reads. FR-40 (808) makes this the sole gate on Review rights, and §4.9's preamble makes Reviews the only consequence a Vendor faces.

**Fix:** (a) state the anchor once in FR-45 — `open_at = min(marked_delivered, agreement_anchor + committed_timeline, wedding_last_day + 365d)`, with `agreement_anchor` named explicitly and `wedding_last_day` defined as FR-72's anchor; (b) add the delivery timeline to FR-39's list of Agreement terms so it is frozen at confirmation, and say in FR-45 that the window reads the Agreement's copy, never the live Listing.

### C-2. "Engagement" now names two different things, one of which is a Glossary term — and FR-8's new sentence reverses Abhishek's ratified decision.

FR-8 line 313, new in round 4: "**Making a Selection creates the engagement it belongs to.**"

Glossary `Engage` line 198, unchanged: "a Family **engages** a Vendor at the moment an Agreement with them is confirmed. **Engagement is what binds that Vendor's Rules on the Family's later choices and what surfaces that Vendor's Preferred Vendors.** Shortlisting, enquiring and revealing contact are not engagement."

memlog 80 records this as Abhishek's own ratified decision: engagement is at Agreement confirmation — "not at shortlist, **not at Selection**, not at Enquiry", so that the Family "shops freely until she signs".

The two senses are irreconcilable and both are load-bearing:

- **Sense (a), Glossary `Engage`** — the state of having engaged a Vendor. Gates FR-24's Rules binding, FR-25's Preferred Vendor surfacing, FR-32's warn-and-accept ("Nothing is removed until the engagement actually completes… when the Agreement is confirmed", 604), FR-39 (796), FR-40 (807), FR-53 (981), FR-56 (1018), NFR 5.5 (1219), NFR 5.6 (1229).
- **Sense (b), new** — the unit of ordering within a Service. Used in FR-8 (313–314), FR-22 (547), Glossary `Selection` (191), FR-14 (443).

A builder reading FR-8 plus Glossary `Engage` concludes that **making a Selection binds the venue's Rules and clears the Family's caterer Shortlist** — the exact behaviour memlog 80 rejected and FR-32 exists to prevent. Note that Glossary `Engage`'s exclusion list names shortlisting, enquiring and contact reveal but **not Selection**, so the text gives a reader no way to rule the reading out.

§3 line 147 forbids introducing a synonym for a Glossary term. This is the inverse and worse: one word carrying two Glossary-relevant meanings, with the third use (`Engagement Model`) sitting between them.

**Fix:** rename sense (b). Call it a **Service Line**, an **Order Unit**, or anything not built on `Engage`; give it a Glossary entry; sweep FR-8, FR-22, FR-14 and Glossary `Selection`. Reaffirm in FR-8 that a Selection is not an engagement in the Glossary sense and binds no Rules.

### C-3. The Sizing Attribute set is now closed over two incompatible kinds of value, and FR-19 and FR-18 break for two of the five frozen Services.

Glossary line 180 defines Sizing Attribute as "**what determines the size of an order** in a Service" — an order-sizing input. Its two consumers treat it as a **Listing attribute**:

- FR-19 (504): "Every Listing shows photos, the all-in price, rating and Review count, verified status, **the Service's Sizing Attribute**, the availability signal…"
- FR-18 (494): "Filters cover price within this Service, **the Service's own Sizing Attribute**, rating and verified status." FR-18's rationale (496): "A venue filters on capacity."

The closed set now mixes:

| Value | Kind | Whose data | FR-19 displayable? | FR-18 filterable? |
|---|---|---|---|---|
| capacity | supply attribute | this Vendor | yes | yes |
| crew bandwidth | supply attribute | this Vendor | yes | yes |
| quantity | supply attribute | this Vendor | yes | yes |
| **the Function's guest count** | **demand input** | **the Family** | **no** | **no** |
| **dimensions** | **third-party input** | **the venue Vendor** | **no** | **no** |

Round 4 fixed which *word* Catering uses and left both consumers untouched — and in doing so propagated the defect from one seed Service to two:

- **Catering.** FR-19 requires every Catering Listing to show "the Function's guest count". That is Rutuja's own number. It is identical on every caterer's card and tells her nothing. FR-18 requires it as a filter: filtering caterers by her own guest count either means nothing or silently means "caterers who can serve 600" — which is `capacity`, a *different* member of the same set. An autonomous builder will pick one and it will be nobody's decision. This half is **new in round 4**; before, the value was `confirmed headcount`, which at least read as a Listing property.
- **Décor & Mandap.** `dimensions` resolves, per Glossary 180, to "the engaged Space's stated size" — a field on a **different Vendor's** Listing, available per FR-71 (638) only "Where the Family has **engaged** a Space", i.e. after an Agreement with the venue. While Rutuja is browsing decorators there is no value at all, and FR-19 states no fallback. This is pass-4 **H-5**, still open: round 4 granted the value enum membership and left the two FRs that cannot consume it.

**Fix:** split the roles. Keep `Sizing Attribute` as the *order-sizing* input (Glossary 180's own definition), introduce a separate per-Service **Browse Attribute** for FR-18/FR-19, and state that where the two differ — Catering, Décor — FR-19 shows the Browse Attribute and FR-18 filters on it. Then say explicitly what a Catering Listing shows and what a Décor Listing shows.

---

## 3. HIGH

### H-1. The hardening reached the guest form and stopped at the RSVP page — which NFR 5.8 itself calls the larger surface.

Round 4 gave FR-11's form four protections. Compare, protection by protection, against FR-12's RSVP page:

| Protection | Guest form (FR-11 385, 388) | RSVP page (FR-12 400) |
|---|---|---|
| Unguessable | yes | yes |
| Non-enumerable | yes | yes |
| Excluded from indexing | yes | yes |
| Reveals nothing else | yes | yes |
| **Rate-limited** | **yes** | **absent** |
| **Revocable by the Creator** | **yes** | **absent** |
| **Expires on conclusion or abandonment** | **yes** | **absent** |

The last three are the round-4 additions, and none reached FR-12. Consequences:

- **An abandoned Wedding leaves every RSVP link live forever.** This is pass-4 **H-3** verbatim, closed for the form and left open for the page. FR-72 (334) erases the Guest list on abandonment; NFR 5.5 (1214) erases contact details; **nothing takes the pages down**, and each page still renders "the invitation" (FR-12 401) for a wedding that will not happen.
- **No rate limit on a write endpoint.** The RSVP page records a response. FR-11 justifies its own limit as "so the form cannot be flooded"; the same argument applies unchanged.
- **No revocation.** A Creator who realises a link was forwarded can revoke the form and cannot revoke an RSVP link.

NFR 5.8 (1243) calls the RSVP page "the platform's largest public surface, seen by hundreds of Guests per Wedding, and none of them chose to be there" — so the document's own reasoning says this is the surface that most needed the hardening.

**Fix:** state the three properties once, as a rule over both public pages, and have FR-11 and FR-12 cite it.

### H-2. FR-72's abandon bullet was not updated, so the form's new expiry rule has no implementation.

FR-11 (388): the link "expires on its own when the Wedding concludes **or is abandoned**."
FR-72 (334), untouched: "Abandoning cancels its Agreements under FR-42, releases the Slots, and **erases the Guest list**."

FR-72 is the FR that owns abandonment and enumerates its consequences. It does not revoke the link and does not mention pending or dismissed submissions. A builder implementing the lifecycle from FR-72 — the correct place to implement it from — produces an abandonment that leaves the form live. The dormancy path (333) ends in the same abandonment and inherits the same gap.

Compounded by H-4: "erases the Guest list" does not clearly reach a submission that was never accepted onto the list.

**Fix:** FR-72's abandon bullet must revoke both public links, delete pending submissions, and cite NFR 5.5.

### H-3. Constructing the engagement from the Selection made the cardinality rule circular; pass-4 H-4 is not closed.

Round 4's construction:

- FR-8 (313): "Making a Selection **creates** the engagement it belongs to, whose unit follows the Service's Engagement Model."
- Glossary `Selection` (191): "**One Selection per engagement.**"

Read together: an engagement exists because a Selection was made, and there is one Selection per engagement. The rule is now unfalsifiable — it cannot be violated and therefore constrains nothing. The question pass-4 H-4 asked is still unanswered: **how many engagements may a Family declare in one Service, and where does she declare which Functions each covers?**

Three statements, none authoritative and no two the same:

- FR-8 (313): "one engagement covering **every** Function a Span serves, one per Function otherwise" — reads as one Span engagement per Service.
- Glossary (191): "A Family needing two different Spaces — the lawn for the Haldi, the hall for the Reception — makes **two** Span engagements" — two Span engagements per Service, each over a subset.
- FR-22 (547): "one covering every Function a Span engagement serves, **one per Function for a per-Function Service**" — the only statement that actually bounds anything, and only for the per-Function case.

**The lost constraint matters.** Under round 3's rule (one Selection per Service per Function it serves) nothing could be double-counted. Under round 4's rule nothing prevents a Family making two Catering Selections for the same Function: each creates its own engagement, and FR-8 (314) counts each once — posting the meal twice against the ₹8L ceiling. FR-22's per-Function clause survives as the only guard, and FR-8, the FR that does the arithmetic, does not repeat it.

**Fix:** state the rule once, in FR-14, as a property of the Service and the Functions it covers — not as a by-product of the Selection act — and give the Family an explicit surface (FR-68 or FR-22) for declaring a second Span engagement.

### H-4. Glossary `Guest` was widened by an appended sentence whose head clause still excludes the people it adds.

Line 156: "**Guest** — **a household on a Wedding's guest list**, carrying a count of people. **A submission to the guest form is a Guest from the moment it arrives**, whether the Creator has accepted it, is yet to look at it, or has dismissed it — **every rule governing Guest data applies to all three.**"

The bolted-on sentence rescues rules phrased over **Guest data** — FR-4 (267) and FR-61 (1093) access logging, FR-12 (404) purpose limitation, NFR 5.5 (1213) — and those are now genuinely closed. It does **not** rescue rules phrased over **the guest list**, because the head clause still defines a Guest as someone on it, and a pending submission by construction is not:

- **FR-72 (334):** abandonment "erases **the Guest list**" — pending and dismissed submissions are not on it. Compounds H-2.
- **NFR 5.5 (1216):** "Everything else — Guest contacts, Shortlists, Boards, **guest lists**, an unconfirmed Wedding — is erasable on request."
- **FR-6 (285, 287):** an Invited Member may view "**guest list**" and may not change "**guest list**".
- **FR-11 (375):** "A **guest list** is optional and is never required for anything."

**Fix:** widen the head clause — "a household on a Wedding's guest list **or submitted to it**" — and delete the appended sentence's need to carry the whole load. Then decide whether "guest list" in FR-72 and NFR 5.5 means the accepted set or the whole store, and say which.

### H-5. FR-6 was never updated, so the suggestion mechanism the round-4 Guest widening depends on does not exist for guests.

FR-11 (378): "**Invited Members can suggest guests**, exactly as they suggest Listings under FR-6."
FR-11 (386): "**Every submission arrives as a suggestion** for the Creator to accept or dismiss, **exactly as an Invited Member's suggestion does**."

Both delegate to FR-6. FR-6 (280–288) is unchanged and Listing-only: it grants "a suggestion **naming a Listing**" and it explicitly forbids an Invited Member to "change the budget or **guest list**". Read literally, FR-6 forbids the capability FR-11 grants by reference to it, and the guest-form submission queue — the object H-4 and NFR 5.5's erase-at-once rule now govern — has no FR that creates it.

This is pass-4 **M-3**, carried unclosed into a round where two new rules were built on top of it.

Also still unstated: **who may share the form link.** FR-11 says only that the Creator revokes it. Sharing is the act that exposes the surface, and FR-6's advisory-only principle has no answer.

**Fix:** extend FR-6's suggestion bullet to cover guests and the guest-form queue, carve the queue out of its "cannot change the guest list" prohibition, and state whether an Invited Member may share the link.

---

## 4. MEDIUM

**M-1. "Headcount" is still a floating synonym, and round 4 made the mismatch sharper.** The Glossary and the FR-71 table now say **"the Function's guest count"**; FR-11 (374, 380) says "a guest count the Family simply states" / "the stated guest count". But FR-8 (317) — the FR that does the arithmetic — still says "that price times **the headcount** of the Functions it serves", and FR-69 (831) still says "Where a Function's **headcount** moves away from the figure in a confirmed Agreement, the Family is prompted to amend." FR-69 is still readable as *RSVP drift triggers amendment prompts*, the automatic behaviour FR-11 (380) forbids. Pass-4 M-1, unclosed and now further from the canonical term. Fix: say "stated guest count" in both, and state in FR-69 that only a Family's revision triggers the prompt.

**M-2. `dimensions` and `stated size` are two names for one field.** Glossary (180) says the Sizing Attribute value is `dimensions` and that "the figure comes from the engaged Space's **stated size** (FR-23)"; FR-23 (567–568) publishes the field as `stated size`; FR-71 (638) says "its **dimensions**". A Glossary bridge is not one name, and §3 (147) forbids the synonym. `stated size` still has no Glossary entry (pass-4 L-5). Fix: pick one word, sweep three lines, add the entry.

**M-3. Glossary `Selection` cites the wrong FR for the definition round 4 wrote.** Line 191: "an engagement is what **FR-14's Engagement Model** defines". FR-14 defines the *model* (a property of a Service); the *instance* is now constructed in FR-8 (313). The citation points a downstream reader at the FR that does not contain the rule.

**M-4. `Delivery` now names two things.** Glossary (199) opens "the point at which a Service has **actually been rendered** … the arrival of the album for photography" and closes with a deeming clause — reached at the committed date, and in any case at one year — under which Delivery occurs for a photographer who never delivered. FR-45's bullet 5 (885) restates only the first sense: "for a photographer the arrival of the album", which bullets 1 and 4 explicitly override. FR-12 (405) also cross-references "the Glossary term **Delivery**, which concerns a Service being rendered." Fix: name the trigger something else (`Review Window Open`) and keep `Delivery` for the real-world event, or delete FR-45 bullet 5 and the head clause's service-by-service gloss.

**M-5. The self-dealing bar lives only in the FR that does not own two of the three actions it bars.** FR-39 (792) forbids a dual-role account to "**enquire with, select or agree with** its own Listing." Enquiries are FR-34's; Selections are FR-22's. Neither carries a pointer, and a builder implementing FR-34 ("A Family can send one Enquiry to several Listings in a Service at once") has nothing to tell them a Listing must be excluded. The placement happens to be safe — barring the Enquiry blocks the thread FR-39 (789) requires a proposal to originate from — but it is safe by accident, not by statement.

**M-6. FR-25 self-nomination is still undecided, and the safeguard is vacuous in that case.** Pass-4 C-3 asked for this decision explicitly; round 4 did not make it. FR-25 (589): "**A named Vendor must accept the association before it is published.** No Vendor can claim another's endorsement unilaterally." A Vendor naming its own second-Service Listing accepts its own association — which *is* unilateral, so the safeguard's own rationale does not bind the case. Combined with FR-24 (579), a venue can publish a Rule restricting catering to Preferred Vendors and name only its own Catering Listing, so engaging the lawn ties the Family to the same account's caterer. This may well be a legitimate in-house-catering arrangement — FR-32 discloses it before the Family commits — but it is a business decision that is currently being made by silence.

**M-7. The Glossary still has no Wedding states.** Pass-4 M-5 and round-3 H-5, now open in a third round. `Wedding` (160) lists what a Wedding holds, not what it can be, while FR-72 makes **in planning**, **concluded** and **abandoned** normative and four rules key off them — FR-45's cap anchor (882), NFR 5.5's erasure clock (1214), FR-11's link expiry (388) and FR-65 (331). §3 (147) requires FRs to use Glossary terms verbatim; three terms they must use verbatim are not in it.

---

## 5. LOW

**L-1.** UJ-3's constraint block (140) states the trigger and omits the one-year cap that round 4 added. It is incomplete rather than contradictory, but §0 makes UJ constraint blocks binding.

**L-2.** NFR 5.8 (1243) now names both public pages; its justifying sentence still argues only for the RSVP page. The guest form is the stronger case — its submitters are strangers who reached it by forward.

**L-3.** FR-32 (604) names one way confirmation can fail ("because the Slots were taken first under FR-39"). FR-39 now has a second — the same-account bar. The recovery guarantee should cover both.

**L-4.** The FR-39 bar is **account**-scoped, but FR-1 (235) permits one person to hold separate accounts: "Where a second method cannot be linked, it creates a separate account rather than failing silently." The bar is therefore weaker than "a Vendor cannot review himself" reads. Worth stating as an accepted limit rather than leaving it to be discovered.

**L-5.** FR-12 (411) says the platform "may surface the relevant **Guest** count as context" for accommodation and transport. Under the widened Glossary `Guest`, that is the named/submitted household count, not the Function's stated guest count — which is what is meant.

**L-6.** The §7.9 sweep carve-out (1394) is still section-based. Seven hits outside §7.1/§7.9 are prohibitions, negations or quoted anti-examples (114, 816, 1230, 1231, 1233, 1270, 1361) and will trip any automated sweep. Pass-4 L-4, unclosed. **No genuine banned-vocabulary violation exists.**

**L-7.** SM-6 (1311) still measures "RSVP page visits per **published** Wedding", borrowing the verb the Glossary assigns to `Real Wedding` (FR-65). Pass-4 L-1, unclosed.

---

## 6. Quick pass results

- **FR IDs.** All 72 headings present, FR-1..FR-72, **no duplicates, no gaps, no dangling references.** Every `FR-n` cited in the body resolves to a heading. Five FRs remain out of numeric order (FR-72, FR-68, FR-32, FR-71, FR-70, FR-69); §0 and the note at line 558 authorise this. UJ-1..UJ-3, SM-1..SM-7 and NFR 5.5/5.6/5.7 references all resolve. Clean.
- **Banned vocabulary.** Zero genuine violations. All seven hits outside §7.1/§7.9 are the ban being stated, a negation, or a quoted anti-example. Line 1361's "enforced by the Vendor" is outside the ban, which covers "enforced by Vivah Spot". See L-6 for the sweep-rule defect.
- **Deleted-text residue.** Clean for the first time. No trace of the 90-day clause (the three "ninety" hits are FR-1's session length and UJ-3's illustrative Vendor timeline), no trace of "confirmed headcount", and FR-18's third Sizing-Attribute enum variant is gone. **The grep discipline worked exactly as far as grep reaches.**
- **Glossary staleness.** No term is unused — the least-cited (`Amendment`, `Quote`, `Site Visit`, `Grace Period`, 3–4 uses each) are all load-bearing. `Guest` under-inclusive at the head clause (H-4). `Sizing Attribute` internally coherent but broken at its consumers (C-3). `Delivery` carries two senses (M-4). `Engage` collides with FR-8's new noun (C-2). `Selection` cites the wrong FR (M-3). Wedding states absent (M-7). `stated size` still has no entry (M-2).
- **Carried over, not attempted by round 4, outside this pass's remit:** pass-4 H-6 (fraud removal inherits lapse semantics via FR-53's uniform cascade), M-2 (Admin account recovery outside FR-61 and NFR 5.7's audit enumerations), M-4 (FR-18's rating filter hides every zero-review Vendor at launch; FR-20's shrinkage prior undefined when no Service-Place average exists), M-6 (portfolio allowance absent from FR-27, FR-58, NFR 5.9), M-7 (the four-exit cascade cited by nothing). All confirmed still open.

## 7. Recommended order of fixes

1. **C-1** — anchor the delivery timeline, and freeze it into the Agreement at FR-39.
2. **C-2** — rename the ordering unit off the word `Engage`; reaffirm memlog 80.
3. **C-3** — split Sizing Attribute from a Browse Attribute; say what a Catering and a Décor Listing show.
4. **H-1 + H-2** — one rule over both public pages; FR-72 owns the abandonment consequences.
5. **H-4 + H-5** — widen `Guest`'s head clause; extend FR-6 to guests and name the queue.
6. **H-3** — bound the engagement count in FR-14, not in the Selection act.
7. Then M-1..M-7.

## 8. Judgement — are further rounds still finding real defects?

**Yes for this round, and the profile has changed in a way that says what to do next.**

Round 4's grep verification eliminated one whole class: stale duplicates of edited text, which drove several findings in each of rounds 1–3, produced **zero** findings here. That is a real, measurable improvement and the discipline should be kept.

But the total did not fall (21 → 22), because grep cannot see the class that dominates: **a consumer of a changed rule does not contain the changed string.** FR-19 does not contain "the Function's guest count"; it contains "the Service's Sizing Attribute". FR-12 does not contain "rate-limited"; it is missing it. FR-72 does not contain "the link". No textual search finds any of these.

Three of this round's defects are also of a **new and more expensive kind**: round 4 was the first round whose fixes collided with *existing* vocabulary rather than leaving stale text behind (C-2's `engagement`, C-3's mixed enum, M-4's two-sense `Delivery`). Defining a term is riskier than deleting a sentence, and rounds 1–3 were mostly deleting.

**Not yet diminishing returns — but a fifth round of the same method will be.** The remaining defects are structural, not textual, and three of them (C-2, C-3, H-3) are the same defect wearing different clothes: **a term was given a second job without being given a second name.** The next round should not be another read-and-chase. It should be a mechanical closure pass: build the term → consumer table (for each Glossary term, every FR that reads it), and for each round-5 fix walk that table rather than the document. That is a check a grep cannot do and a fifth read-through keeps missing.

One further observation for Abhishek: **five of the twenty-two findings are pass-4 items round 4 chose not to attempt**, and pass-4's H-6 (fraud removal) is a decision only he can make. Those should be scheduled, not re-audited — re-finding them is now pure cost.
