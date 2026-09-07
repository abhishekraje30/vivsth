---
title: Autonomous-Readiness Review 2 — Vivah Spot PRD (post-revision)
target: prd.md (updated 2026-09-05, status draft, 1343 lines, FR-1..FR-71)
prior: review-autonomous-readiness.md (79 findings — 18 critical, 31 high, 25 medium, 5 low)
reviewer: adversarial re-audit, 2026-09-05
verdict: STILL NOT SAFE TO HAND TO AN AUTONOMOUS BUILD — but materially closer
---

# Autonomous-Readiness Review 2

## Verdict

**Still not safe. Closer than it was, and failing differently.**

The first audit's charge was that the PRD met its own standard on policy and failed it on mechanics. That charge is now half-answered. Nine of the eighteen criticals are genuinely closed, and several are closed well — FR-39's first-writer-wins, FR-48's fourteen-day window, FR-69's Amendment and §5.5's erasure precedence are the kind of writing that leaves an agent nothing to invent. The Agreement is now the only object in the document with a derivable lifecycle, and it got there by exactly the method the rest of the document needs.

But the revision has a characteristic failure, and it is worth naming because it will recur on the next pass. **Most of the fixes closed a contradiction by making a choice, and then did not follow the choice into the requirements the choice touches.** Four examples, all load-bearing:

- **Slot** was resolved as *configurable per Service* (FR-28). That is the option the prior audit said would break FR-9's state-the-shape-once. FR-9 was not amended, the Glossary's morning/evening phrasing was not amended, and no mapping from a Wedding-level Function Slot to a per-Service scheme exists. The matching engine is less buildable than before the fix.
- **The budget** was resolved by inventing **Selection**, which is defined as *at most one per Service per Wedding*. FR-14, FR-23 and the new FR-68 each require more than one engagement per Service. The budget, the collision view and SM-5 all sit on an object that cannot represent the wedding in UJ-1's own edge case.
- **Ranking** was resolved by naming five signals. Two of them are unquantified in ways that are the whole algorithm (the shrinkage prior, the near-equal band), one collides with §7.2, and the fifth — rotation, stated as "a requirement, not a refinement" — is silently absent from the plain-language disclosure FR-64 makes a compliance obligation.
- **Sign-in** was expanded to four methods and account linking, and the linking rule ("a second method that resolves to a person already known") has no defined key and no verification challenge, in a system with no passwords and ninety-day sessions.

The second characteristic: **the revision created new quantities faster than it retired old ones.** Fourteen thresholds were ratified, which is real progress and the single best thing in this pass. But roughly twenty-three quantities remain unset, and at least six of them are *new* — created by the fixes themselves (shrinkage constant, rotation band and period, near-equal epsilon, Service-average scope, catering recommendation formula, Subscription-to-Place mapping level).

Third: **the structural finding survives almost intact.** Of the eleven objects asked about, one is nearly determined, two are partial, and eight are still underdetermined. The document still has no Wedding lifecycle — and FR-45's ninety-day review backstop, §5.5's guest-data erasure trigger and FR-65's publishing right now all key off "the last Function of the Chosen Block", an anchor that does not exist for a Wedding that never locked one.

**Findings: 77 total — 16 critical, 31 high, 24 medium, 6 low.** Eleven of the sixteen criticals are carried forward or are direct consequences of a carried-forward gap; five are new, introduced by this revision.

**What would make it safe:** roughly fifteen additions, listed in §5 in leverage order. Most are three to ten lines. Two are tables, one is a journey. It is a smaller job than the last one.

---

# 1. The eighteen CRITICAL findings, verified

| ID | Subject | Status |
|---|---|---|
| C-01 | "Engage" undefined | **Partially fixed** — term defined, trigger point still unresolvable |
| C-02 | Running budget arithmetically undefined | **Partially fixed** — new object, new contradiction |
| C-03 | Review window has no length | **FIXED** |
| C-04 | Vendor can hold the review window shut | **FIXED** — one residual anchor gap |
| C-05 | Concurrent Agreement confirmation | **FIXED** — pending state still untimed |
| C-06 | WhatsApp vs in-app thread | **FIXED** |
| C-07 | Admin can do anything vs immutability | **FIXED as a contradiction** — enumeration half still open |
| C-08 | Organic ranking undefined | **Partially fixed** — three new gaps, one new contradiction |
| C-09 | Identity model undefined (4 parts) | **Partially fixed** — 1 of 4; one new critical introduced |
| C-10 | Slot: enum or open concept | **STILL OPEN** — the chosen option broke FR-9 |
| C-11 | De-listing cascade | **Partially fixed** — 1 of 3 exits; a 4th exit added with no cascade |
| C-12 | Service config changed against live data | **Partially fixed** — new contradiction with FR-59 |
| C-13 | Browsing before any Anchor Date | **FIXED** — sub-questions still open |
| C-14 | RSVP page has no guest authentication | **FIXED** — medium residuals |
| C-15 | Vendor onboarding / Verification lifecycle | **Partially fixed** — the fraud hole is untouched |
| C-16 | Wedding-level Service selection | **Partially fixed** — new dimension, wrong cross-reference |
| C-17 | No way to amend an Agreement | **FIXED** — minor residuals |
| C-18 | Erasure vs immutable record | **FIXED** |

**Genuinely closed: 9 of 18** (C-03, C-04, C-05, C-06, C-07, C-13, C-14, C-17, C-18).
**Partially fixed: 8** (C-01, C-02, C-08, C-09, C-11, C-12, C-15, C-16).
**Still open: 1** (C-10).

---

### C-01 — "Engage" — PARTIALLY FIXED

**Fixed half.** The Glossary now carries it, and the memlog records the ratification:

> **Engage** — a Family engages a Vendor at the moment an Agreement with them is confirmed. Engagement is what binds that Vendor's Rules on the Family's later choices and what surfaces that Vendor's Preferred Vendors. Shortlisting, enquiring and revealing contact are not engagement.

That is exactly the closure the standard asks for. FR-24 and FR-25 are now determinate.

**Open half — and it is worse than a residual.** The prior audit said the definition alone would not close it: *"Then FR-32 must fire on the family's confirmation step within FR-39... State this explicitly in FR-32 and FR-39, because the ordering is otherwise unresolvable."* Neither FR was amended. FR-32 still reads:

> Before the family engages a Space or Listing, they are shown **by name** every Shortlist entry and every Agreement that this Vendor's Rules would make impermissible. They cannot proceed without accepting that consequence explicitly. On acceptance, impermissible Shortlist entries are removed and their contribution withdrawn from the running budget. On acceptance, any impermissible **Agreement is cancelled under FR-42**.

With engagement now defined as *Agreement confirmed*, and FR-39 now defining confirmation as a two-step, fail-able act, "before the family engages" has three candidate moments and the PRD picks none. See **R-C6**, which is the new critical this creates.

Also unclosed: §7.9 supplies no approved verb, so L-02 stands; and the Glossary headword is *Engage* while the FRs use *engagement* as a noun with no headword.

---

### C-02 — The running budget — PARTIALLY FIXED

**Fixed.** FR-8 is now arithmetic rather than prose, and the introduction of **Selection** is the right move:

> **A Shortlist contributes nothing.** ... **A Selection contributes its all-in price**, automatically, the moment the Family picks it. **Confirming an Agreement replaces the Selection's estimated figure with the agreed one** ... **Where a Service is priced per head, the figure is that price times the headcount of the Functions it serves**, and the multiplication is shown beside the total ... **A Selection not yet attached to any Function shows as not yet estimated — never as ₹0.**

Sub-problems (1) and (3) of the original finding are closed. H-26's headcount precedence is closed by FR-11's "the derived count is offered, not imposed."

**Open.** Sub-problem (2) is closed only for per-head. FR-26 declares five pricing models — *per span, per Function, per head, per unit, per rental period* — and FR-8 gives arithmetic for one and a half of them:

- **Per unit.** No quantity source exists. FR-71 supplies a recommendation for Catering only. For a generic per-unit Service the budget has no multiplicand.
- **Per Function.** FR-14 says engaging a per-Function Service across three Functions is "several engagements priced separately, not one span." FR-8 never says whether the Selection contributes 1× or 3×.
- **Per rental period.** The period is "need not align with any Function" (FR-14). Nothing states where its duration comes from.
- **An Agreement with a Listing that was never Selected.** Nothing requires a Selection before an Enquiry or an Agreement; broadcast Enquiries (FR-34) make the un-Selected Agreement the ordinary case. FR-8 only knows how to *replace a Selection's estimate*.

**And a new contradiction, which is the more serious half.** See **R-C2**.

---

### C-03 — Review window length — FIXED

> **The window is fourteen days from opening.** Both publish when both have submitted, **or when the window closes** — whichever comes first. Window close is simultaneously the submission deadline and the publication moment. Nothing can be written on the fifteenth day. (FR-48)

The Glossary agrees ("runs for fourteen days"). Both the duration and the close/deadline coincidence the prior audit asked for are stated. Clean close.

---

### C-04 — Holding the review window shut — FIXED

FR-59 now makes the Commitment a condition of listing and says so twice:

> A Listing cannot be published without: completed Verification, an all-in price, published Rules, and a published **Commitment** — the delivery timeline, what is included, and the no-hidden-charges declaration. **The delivery timeline is not optional.**

And FR-45 adds the backstop:

> **It opens no later than ninety days after the last Function of the Chosen Block**, whatever the Service and whatever the Vendor has or has not done. There is no path to being unreviewable.

L-03 closes with it — *Commitment* now has an FR.

**One residual, escalated elsewhere.** The backstop is anchored on *the last Function of the Chosen Block*. An Agreement can be confirmed before a Block is locked — FR-34 says an Enquiry carries "the Chosen **or Candidate** Block" — and FR-16 only says every Enquiry sent *thereafter* carries the Chosen Block. A Wedding that never locks a Block has Agreements with no backstop anchor. Also unaddressed: FR-69 permits amending the committed delivery date, which moves the FR-45 trigger and partially reopens the stalling vector inside the ninety days. See **R-C16**.

M-05 (early Delivery marking) and M-06 (Delivery correction) remain untouched, and are now load-bearing because Delivery gates the only consequence a Vendor faces.

---

### C-05 — Concurrent Agreement confirmation — FIXED

FR-39 now carries the whole mechanism:

> **Nothing holds a Slot before an Agreement exists.** ... **Confirmation is first-writer-wins.** If the Slots or Span are already blocked when the Vendor confirms, the confirmation fails, and the Vendor is told which engagement conflicts. ... The Family whose confirmation is overtaken is told, and the proposed terms return to the thread as declined-by-conflict rather than silently expiring. A Vendor therefore cannot double-commit *through* the platform.

All four of the original sub-questions are answered. This is the best-written fix in the pass.

**Residuals (high, not critical):**
- The pending state between the Family's confirmation and the Vendor's has **no timeout** and **no Family withdrawal**. A Family's confirmation sits exposed indefinitely, which is precisely the position FR-39's own ordering puts her in.
- FR-39 handles Slot conflict only. Confirmation against a Space whose capacity is below the agreed guest count, against a Listing whose Subscription lapsed mid-thread, against a removed Vendor, or where the Family's own Rules position changed under FR-32 — all unhandled.
- "declined-by-conflict" is a state named in one bullet and belonging to a state set the document never enumerates.
- FR-69 amendments that move days or Slots carry **no** first-writer-wins rule.

---

### C-06 — Messaging architecture — FIXED

> **The thread of record lives in the platform.** WhatsApp carries a notification containing the Enquiry summary and a link into that thread; it is never itself the conversation surface. This is what makes immutability, structured proposals and measurable response times possible at all. ... If WhatsApp delivery fails, the notification falls back to SMS. (FR-35)

UJ-2 step 5 was rewritten to match ("**WhatsApp buzzes** ... He taps through into the thread"). The architecture-determining ambiguity is gone.

**Residual (high, H-19):** no channel matrix. The FR-29 nudge is WhatsApp-only with no fallback. The Family's channel is still only "the Family in the app" — push, permission-denied and iOS's default-off state are all unaddressed. And the hard external constraint the prior audit flagged — WhatsApp Business messaging outside a 24-hour window requires approved templates — appears nowhere in the document, though it shapes every message in FR-1's OTP delivery, FR-29, FR-35 and FR-53.

---

### C-07 — Admin authority vs immutability — FIXED (as a contradiction)

Both FRs were rewritten with the same construction:

> **This is the absence of role restriction, not the absence of limits.** The integrity constraints elsewhere in this document bind Admin exactly as they bind everyone: an Agreement cannot be altered after confirmation (FR-43), a Review cannot be edited or suppressed (FR-46), and records are not silently alterable (NFR 5.7). (FR-4)

The contradiction is closed cleanly, on both sides.

**Open half.** The prior audit's second ask — *"enumerate the actions Admin holds that no one else does ... because that enumeration is currently absent and an agent has no list to build a console from"* — was not done. Verification, removal, review removal, Service and place configuration, price setting and grievance disposal are scattered across FR-58/60/49/62/63 with no consolidated list, and the question of whether Admin may build or edit a Listing on a Vendor's behalf (which the launch story requires) is still unanswered — FR-70 says only that "no Admin action is needed before that point."

---

### C-08 — Organic ranking — PARTIALLY FIXED

**Fixed.** FR-20 now names five signals in weight order, states two exclusions ("Neither what a Vendor pays nor how recently they joined is a signal"), and writes the disclosure text. The rotation rationale is well argued and the ban on plain averages is exactly right.

**Open, and three of these are new — created by the fix:**

1. **The shrinkage is unquantified.** "A rating drawn from few Reviews is pulled toward the Service's average **until enough have accumulated**." No prior weight, no constant, no definition of *enough*. This is not a parameter of the algorithm; for a launch market where every Vendor starts at zero Reviews, it substantially *is* the algorithm.
2. **"The Service's average" has no scope.** Across all Places? The Family's Place? Which level of FR-33's hierarchy? Different answers rank differently in a district town.
3. **Rotation has no band, period, seed or determinism rule.** "Where Vendors score **comparably**, their order **varies between searches**." No epsilon defines comparable; nothing says whether rotation is per-search, per-session or per-day, or whether it is stable within a Family's comparison session — which matters, because FR-21 puts a Shortlist side by side and FR-15 reports collisions across it.
4. **Rotation is missing from the mandated disclosure.** FR-64 requires "the main parameters determining organic ordering" be published; FR-20 calls rotation "a requirement, not a refinement" — a main parameter by the document's own words — and the disclosure text it writes omits it entirely. That is a compliance defect in the exact register §5.5 and FR-20 elsewhere police.
5. **Signal 1 has no value in the state FR-13 explicitly permits.** "A Family may browse before supplying any Anchor Date." Then availability, the heaviest signal, is undefined and the ordering degrades to something unstated.
6. **Signals 2 and 3 have no zero-state.** A new Vendor has no reviews and no replies. The prior audit's H-08 and H-15 both bear here and both are still open.

**And a new contradiction.** Signal 3 is "**Median time to first reply**, which is the responsiveness a Family actually experiences." §7.2 excludes "vendor standing scores"; FR-37 says a Vendor's outcomes "never affect the Vendor's public standing." Search position *is* public standing, and reply speed is now a component of it. The prior audit named this collision in advance and recommended excluding response time for this reason. The revision included it without addressing §7.2. See **R-C10**.

---

### C-09 — The identity model — PARTIALLY FIXED (1 of 4)

**Sub-part 2 — how a person becomes a Vendor — FIXED** by FR-70.

**Sub-part 1 — one number, two roles — STILL OPEN, and now harder.** FR-1 states "**One person is one account**"; FR-3 states "A Vendor business has exactly **one account** and one set of credentials." Read together they conflate person and business, and the Dattatray-plans-his-daughter's-wedding case has no representation. Nothing anywhere says whether an account may hold both roles. See **R-C13**.

**Sub-part 3 — Admin bootstrap — STILL OPEN.** No FR anywhere creates an Admin account. FR-4 and FR-61 describe Admin authority; FR-70 creates Vendors; nothing creates Admins. See **R-C7**.

**Sub-part 4 — recovery and number change — STILL OPEN, and the surface is larger.** The revision added passkeys, Google and Apple and ninety-day device sessions. It added no recovery, no number change, no device-loss path, no passkey-loss path, no sign-out, no session revocation and no device list. See **R-C8**.

**And it introduced a new critical.** FR-1's linking rule:

> Signing in by a second method that resolves to a person already known links to the existing account rather than creating a second one, and the person is told it was linked.

There is no defined key for "resolves to a person already known", and no verification challenge before the link. Google supplies an email and no phone; Apple supplies a relay address under Hide My Email and no phone. Automatic linking on an unverified provider-supplied identifier is a textbook account-takeover path, and this system has no password to fall back on and a ninety-day session on the far side. See **R-C4**.

---

### C-10 — Slot — STILL OPEN

The author chose configurability, which is his call to make:

> **How a day divides into Slots is configured per Service, not fixed.** Morning and evening is the common case, not the definition. A Service may have one Slot a day or several. (FR-28)

But the consequence the prior audit named as the reason to choose otherwise was not addressed, and nothing downstream was reconciled:

- **FR-9 is unchanged.** The Family still states each Function's day and Slot once, at the Wedding level, before browsing any Service. If the Slot scheme is per Service, **whose scheme is a Function's Slot expressed in?** Venue may have two Slots a day, Catering three, Photography one. Matching a Wedding-level Function Slot against a Vendor's calendar requires a mapping between schemes that the PRD does not provide and an agent will have to invent — and its invention silently determines what "the caterer has to be free for all three days" means.
- **The Glossary was not updated.** It still reads "Morning and evening are separately engageable", which reads as the two-value enum FR-28 explicitly denies.
- **No clock boundaries and no time zone anywhere in the document** (M-20, unmoved). FR-14's span is "from the start of the first Function it serves to the end of the last — **the overnight between them included**", and the Glossary's Span says "including the nights between them". Neither is a computable interval without boundaries, and the whole availability engine is interval arithmetic.
- **A Vendor with Listings in two Services now holds two Slot schemes on one calendar.** FR-28 says availability is held per Space where Spaces exist and per Listing otherwise; it does not say what happens when the schemes disagree.
- **FR-62 permits Service configuration change**; changing a live Service's Slot scheme against existing calendars and blocked Slots is unmodellable and unmentioned.

This is the single most schema-determining gap in the document, and it is the one critical that did not move.

---

### C-11 — De-listing cascade — PARTIALLY FIXED (1 of 3 exits, and a 4th exit added)

**The expiry exit is now well specified.** FR-53:

> **Existing engagements are untouched.** Confirmed Agreements stand, their Slots stay blocked, open Enquiry threads stay open and answerable, and review windows still open on Delivery. A Vendor who lapses still owes the weddings they took. A Family with the lapsed Listing on a Shortlist is told it is no longer available ... It is never removed silently. **Nothing belonging to the Vendor is destroyed.**

That closes the expiry path and most of M-25 with it.

**Still open:**
- **FR-59's exit** — "A Listing that stops satisfying them stops being discoverable until it does again" — has **no cascade at all**. It is reachable by an ordinary Vendor edit and by an Admin configuration change (FR-62).
- **FR-60's removal exit** says only that published Reviews remain. Nothing about Shortlists, Selections, live Agreements, blocked Slots, open threads, review windows or family notification — and the prior audit identified this as the one exit where the family *should* be told, because fraud is the ground.
- **FR-70 added a fourth exit** — "A Vendor may withdraw a Listing from discovery themselves at any time, without losing it" — with no cascade specified.

**And the fix left a stale clause that now contradicts FR-8.** FR-53 says a lapsed Listing on a Shortlist "stops contributing to the running budget." Under the revised FR-8 **a Shortlist contributes nothing**, so the clause is inoperative — and the case that *does* contribute, a lapsed Listing that is the Family's **Selection**, is not covered anywhere.

---

### C-12 — Service configuration against live data — PARTIALLY FIXED

FR-62 gained a real principle:

> **A configuration change never rewrites what already happened.** Existing Listings, Shortlists, Enquiries and Agreements keep the shape they were created under; a changed Service applies to what comes after it. Where a change would make an existing Listing incomplete, that Listing keeps its published state and its Vendor is asked to supply what is now needed.

**Open.** The specific question the prior audit asked — whether the *engagement model, pricing model, sizing attribute and has-Spaces flag* may be changed once Listings exist — is not answered. "Keeps the shape they were created under" implies configuration versioning, but nothing states that configurations are versioned, that an Agreement pins the version in force at confirmation, or how FR-43's "retrievable in the form they were confirmed in" is satisfied. Nor does anything cover changing a live Service's Slot scheme (now a per-Service property under FR-28), or retiring a Service that Weddings have selected under FR-68.

**And the fix created a contradiction.** FR-62: an incomplete Listing "**keeps its published state**". FR-59: "A Listing that **stops satisfying** them **stops being discoverable** until it does again." An agent must pick one, and the choice determines whether an Admin adding a required field silently dark-launches a compliance failure or silently dark-launches an outage.

---

### C-13 — Browsing before any Anchor Date — FIXED

> **A Family may browse before supplying any Anchor Date.** Listings are shown without an availability signal — not as unavailable — and the signal appears everywhere the moment the first Anchor Date exists. (FR-13)

The contradiction is closed, and closed in the direction the document's own principles argue for.

**Residuals:** FR-19 was not amended and still reads "**Every** Listing shows ... the availability signal against her Blocks", so the two FRs still disagree on their face and only FR-13 carries the exception. The sub-questions remain open (M-13): a past-dated Anchor Date, a Candidate Block whose dates pass during planning, whether zero Anchor Dates is a persisted state, and — new — what the ranking function does with its heaviest signal undefined (C-08 item 5).

---

### C-14 — RSVP page — FIXED

> **Each Guest's link is individual and unguessable.** No link reveals the guest list, no link can be altered to reach another Guest's, and the page is excluded from search engine indexing. A Guest sees the invitation and their own response. (FR-12)

Combined with FR-11's "**The derived count is offered, not imposed** ... the Family confirms or adjusts it", both halves of the original finding — the data-integrity hole and the personal-data exposure — are closed.

**Medium residuals:** whether an RSVP can be edited or revoked after submission; whether a "+N guests" field exists (FR-71's catering recommendation reads "invited count and its confirmed RSVPs", so plus-ones matter to a number that travels to a Vendor); forwarded-link semantics, which FR-12 elsewhere celebrates ("opened and forwarded") and which under per-guest links means the recipient answers as someone else; link expiry; and what happens to a link when the Family deletes that Guest. §5.5's erasure trigger is "the later of the last Function of that Wedding or **the close of RSVP**" — and no RSVP close date object exists anywhere in the document.

---

### C-15 — Vendor onboarding and Verification — PARTIALLY FIXED

**FR-70 is a real addition** and closes most of the onboarding half:

> A Vendor self-registers, builds their Listing, and submits it for Verification. ... A Vendor can always see where they stand: what is still missing, that Verification is pending, that it has succeeded, or that it has failed and why. **Verification failure is a state a Vendor can act on**, not a rejection.

**The most important sub-item is untouched.** The prior audit: *"whether editing a verified Listing invalidates Verification ... This is the fraud hole at the centre of the trust spine, and FR-60 lists 'stolen or misrepresented portfolio' as a removal ground — implying it happens — with no detection mechanism specified anywhere."* Neither FR-58 nor FR-70 nor FR-59 says anything about re-verification on edit. A Vendor can be verified on Monday and upload a stolen portfolio on Tuesday, and no requirement in the document detects it. See **R-C5**.

**Also still open:** Verification has no queue, no assignee, no scheduled visit and no SLA — while SM-1 measures "median time from a Vendor starting sign-up to their Listing being published", a metric with no source object. Verification has no expiry. Resubmission after failure has no limit or cooling-off. Whether Admin may create or complete a Listing on a Vendor's behalf — which the actual launch story requires — is unstated. And FR-70's publication condition contains a new undefined term: "**where a Tier is required**, when a Subscription is active." Founding Vendor is itself a Tier at ₹0, so it is not clear that a Tier is ever *not* required.

---

### C-16 — Wedding-level Service selection — PARTIALLY FIXED

**FR-68 exists and is mostly right.** It creates the object, scopes everything downstream to it, and FR-10's view was updated to carry it. That closes the missing-requirement half.

**Three things open:**

1. **Who may edit it.** FR-68 says the Family "can add or remove one at any time" without naming the actor. The prior audit asked specifically for FR-6's prohibition list to gain it; **FR-6 was not amended** and still reads: "cannot edit the Wedding or its Functions, add or remove Candidate Blocks, add to a Shortlist, send an Enquiry, obtain a Contact Reveal, confirm or cancel an Agreement, write a Review, or change the budget or guest list." Service selection is absent, and so is **Selection** — the new object, and the one that moves the budget. FR-6's "They can do nothing else" catch-all cannot be relied on, because it already contradicts FR-67 ("Boards are private to the Wedding **and its invited members**").
2. **A wrong cross-reference.** "Removing a Service from a Wedding removes its Shortlist. Where an Agreement exists for it, **FR-32's warn-and-accept applies**." FR-32 is the Rules-conflict cascade — its trigger is "before the family engages a Space or Listing" and its consequence is that impermissible entries are removed. Removing a Service is neither an engagement nor a Rules conflict. The reference is a category error and an agent following it lands in a requirement whose preconditions do not hold. What is actually needed is a general warn-and-accept-then-cancel, which does not exist as its own requirement.
3. **A new undefined dimension.** "A Service may be selected for the whole Wedding **or for particular Functions**." Nothing states what that does to the Shortlist ("belongs to one Service within one Wedding" — or per Function now?), to the Selection ("at most one per Service per Wedding" — or one per Function?), to Block matching (FR-13 evaluates per Service across the whole Block — or across only the chosen Functions?), to the budget, or to SM-5. This is the same fault line as **R-C2** and they should be closed together.

---

### C-17 — Amendment — FIXED

FR-69 is a clean addition and does exactly what the prior audit proposed:

> **The original is never altered.** The amendment is appended to the same Agreement's history ... **No cancellation is recorded**, on either profile, because nothing was cancelled. A cooperative change is not a walk-out and must not be counted as one. ... Where a Function's headcount moves away from the figure in a confirmed Agreement, the Family is prompted to amend. **The Agreement is never updated silently to match.**

Both halves of the finding — the amendment mechanism and FR-11's silent divergence — are closed.

**Residuals (high/medium):**
- No first-writer-wins rule when an amendment moves days or Slots onto time that may already be blocked.
- No confirmation ordering (FR-39 fixes family-then-Vendor; FR-69 says only "both confirm"), no timeout on a pending amendment, no rejection state, no cap.
- Whether an amendment may be proposed after Delivery or during the review window, and what an amendment to the committed delivery date does to an already-open window. "Review rights, and the Delivery that gates them, follow the current version" is the only guidance and it points the wrong way for stalling.
- FR-43 still reads "The confirmed terms are frozen at confirmation. Neither party, nor Admin, can alter an Agreement after the fact" without acknowledging versions; FR-40's "Both parties can download a copy at any time" does not say which version, which matters for FR-43's evidential certificate.
- "Either party may propose an amendment **from the Enquiry thread**" — an Enquiry may have been shown as unanswered and closed months earlier (FR-35), and nothing says the thread persists for the life of the Agreement.

---

### C-18 — Erasure vs the immutable record — FIXED

§5.5 now states the precedence and forbids re-derivation:

> **Erasure is available except where a record must be retained**, and those exceptions are stated rather than implied ... Where a record must be retained, the person is **pseudonymised within it rather than refused** ... This precedence is deliberate and must not be re-derived downstream: **consent-based data is erased; records of an engagement between two parties, and records held under a legal obligation, are pseudonymised and retained.**

The best-closed critical in the pass.

**Minor residuals:** FR-43, FR-46 and FR-53 were not given the cross-reference the prior audit asked for, so an agent reading FR-46's flat "Reviews are never edited" without reaching §5.7 will refuse a lawful pseudonymisation. And cancellation counts displayed on a Vendor's profile (FR-42) are not in the retained-category list, so a Family's erasure has undefined effect on them.

---

# 2. The prior HIGH findings, by category

| Category | Findings | Status |
|---|---|---|
| **Quantities** | H-01 grace, H-02 nudge, H-03 sign-in, H-05 Founding expiry, H-08 rating scale, H-20 statutory, H-22 k-anonymity | **Closed** — 30-day grace, 3-Enquiry nudge at most weekly, 6-digit/10-min/5-attempt/3-resend OTP with 90-day device session, per-cohort fixed expiry date, 1–5 whole stars, 7d/36h/3h/72h/180d/quarterly/72h, k=5 |
| **Quantities, residual** | H-03 (lockout duration, Vendor/Admin session lifetimes, sign-out), H-04 (portfolio allowance ×3), H-02 ("the same period" undefined; post-response cooldown dropped), H-05 (landing tier at expiry) | **Open** |
| **Review mechanics** | H-23 payment question | **Closed** — FR-47 now three questions, "No question asks about money" |
| | H-24 dispute path | **Partially** — the process is correctly removed, but "their own account of the engagement" has no surface, and FR-47 forbids Family-visible prose everywhere |
| | H-08 aggregation scope, zero-review display | **Open — and escalated**, now load-bearing for ranking |
| | H-29 several Agreements → several Reviews on one Listing | **Open** |
| **Data protection** | H-25 guest erasure trigger | **Closed as a trigger** — "the later of the last Function or the close of RSVP"; both anchors can be absent |
| | H-26 RSVP headcount precedence | **Closed** |
| **Lifecycle** | H-07 Verification, H-09 Preferred Vendor association + empty permitted set, H-12 Enquiry, H-16 Block locking and "discarded", H-18 pending invitation, H-30 Wedding terminal state, H-31 Admin journey | **All open** |
| **Cascade / propagation** | H-13 Enquiry context snapshot vs live, H-14 notify on a shortlisted Listing being taken | **Open** — FR-17 still says nothing about open Enquiries; FR-53 covers only the lapse case, not the taken-by-another-family case |
| **Model shape** | H-10 crew bandwidth / capacity-per-Slot, H-11 seed configuration for the frozen five, H-17 price and capacity when Spaces exist, H-28 place hierarchy seed and matching | **All open** — H-11 and H-28 are both *larger* than before |
| **Commercial** | H-06 payment failure, refund, upgrade/downgrade; H-27 pay before or after Verification | **Open** — H-27 partially implied by FR-70's ordering; H-06 now multiplied by per-Service-per-Place Subscriptions |
| **Access and abuse** | H-21 Contact Reveal ungated, H-19 channel matrix | **Open** |
| **Empty states** | H-15 | **Partially** — FR-13 and FR-57 closed two cases; zero results, zero Vendors in a Service+Place, the total no-Block-clears case, and the empty Lead Dashboard (FR-56's divide-by-zero) remain |

**Roughly 9 of 31 highs are genuinely closed; 3 partially; 19 remain.** The closed ones are almost entirely the quantities, which is consistent with the fourteen-threshold ratification being the pass's main event.

---

# 3. New material — same class of defect

Sixteen criticals for this review, of which five are new. Then the highs and mediums the new material adds.

## 3.1 New CRITICAL findings

### R-C1 — The Slot scheme is per-Service, and FR-9 was not reconciled to it
Carried from C-10. **The single most schema-determining gap in the document.** Detail above.

### R-C2 — Selection cardinality cannot represent engagements the PRD elsewhere requires
**Location:** Glossary ("**Selection** — the one Listing a Family has picked from a Shortlist within one Service. **At most one per Service per Wedding**"), FR-8, FR-15, FR-22, against FR-23, FR-14, FR-68, UJ-1, UJ-3, SM-5.

Three requirements each need more than one engagement in a single Service:
- **FR-23 / UJ-2:** Dattatray's lawn and hall are two Spaces on one Listing in one Service. UJ-1's own resolution has Rutuja holding the venue across three Functions; the ordinary Shrirampur case is the lawn for the Wedding and the hall for the Reception.
- **FR-14:** "The family may engage a per-Function Service for several Functions. That is **several engagements priced separately**, not one span."
- **FR-68:** "A Service may be selected for the whole Wedding **or for particular Functions**."

The Selection is *at most one per Service per Wedding*. So:
- **FR-8 cannot total the budget** for a Wedding with two venue engagements — it has one slot for the Service's contribution and two prices.
- **FR-15's collision view** "reports across the Family's **Selections**", so a Service with two required engagements collides with itself and the view has nothing to report.
- **SM-5** measures "proportion of Weddings where every Service the family selected reached an Agreement" — undefined when a Service needs two.
- **FR-44's** "One Agreement earns one Review from each side" then puts two or three reviews from one Family on one Listing (H-29, still open), all feeding an aggregate whose scope is undefined (H-08, still open).

An agent must invent the engagement unit — the object between Service and Agreement — and every downstream arithmetic depends on which it picks.

### R-C3 — Per-Service-per-Place Subscriptions have no mapping from a Vendor's declared service areas
**Location:** FR-50 ("**A Subscription is held for one Service in one Place.** A Vendor listing in two Services, or in two Places, holds a Subscription for each"), FR-62, against FR-33 and FR-19.

FR-33 lets a Vendor declare service areas "at whatever level fits them: a single town, a whole tehsil, several districts. One Vendor may declare several areas at different levels." FR-50 charges per Place. **Nothing states which Place a Subscription is bought at.** A photographer covering Ahmednagar district: one Subscription for the district, or one per town in it? If the district, a Vendor buys a district cheaply and appears everywhere; if per town, the long-tail Vendor FR-50's own rationale exists to protect cannot afford the tehsil he actually serves.

Cascading, all undefined:
- A Listing carries "the places served" (FR-19) but a Subscription is per Place — is a Listing discoverable only in Places with an active Subscription, and what does a partial lapse look like?
- Tier is a property of the Subscription, so a Vendor is Featured in one Place and Basic in another. **Portfolio allowance is per Tier and portfolio is per Listing** — which allowance applies?
- FR-53 is written in the singular throughout ("A Subscription ends", "the Listing is withdrawn from discovery"). With N Subscriptions at N expiry dates, reminders, grace, withdrawal and "nothing is destroyed" all need per-Subscription scoping and none is stated.
- FR-56 reports "what the Vendor paid for the term" and cost per Enquiry — undefined across N terms at N prices with N start dates.
- FR-51's Founding Vendor: is it per Subscription? A Vendor Founding in one Service and paying in another? "A fixed calendar date set **per cohort**" — cohort of what: Vendors, Subscriptions, Places?
- FR-57's benchmarking cohort is "their Service in their place" — at which level of the hierarchy? The same undefined key.

This is the billing model. It is not derivable from the document.

### R-C4 — Automatic account linking on an undefined identity key, with no verification challenge
**Location:** FR-1.

> **One person is one account.** Signing in by a second method that **resolves to a person already known** links to the existing account rather than creating a second one, and the person is told it was linked.

No key is defined and no challenge is required. Across the four offered methods the available identifiers do not intersect reliably: phone+OTP yields a number; Google yields an email; Apple yields a relay address under Hide My Email; a passkey yields neither until it is bound. An agent must therefore invent the matching key, and every plausible invention (match on provider email; match on any previously seen email) is an account-takeover path into a system that has **no password**, **no recovery flow** (R-C8) and a **ninety-day session** on the far side. The failure is silent and unrecoverable — a linked account cannot be unlinked by any requirement in the document.

Note this is a security decision the author did not make, in the one area where §0's "that decision will be nobody's" has a named consequence.

### R-C5 — Editing a verified Listing does not re-trigger Verification, so FR-60's stolen-portfolio ground has no detector
Carried from C-15, unmoved. FR-58 verifies "portfolio authenticity" at a point in time; FR-70 permits unlimited subsequent editing; FR-59's conditions are all structural (present/absent), none of them freshness. FR-60 removes for "stolen or misrepresented portfolio", implying it occurs, and no requirement anywhere would surface it. The trust spine's own §4.12 preamble concedes "the platform provides the workflow and the record; it cannot provide the diligence" — but the workflow it provides has no re-entry point.

### R-C6 — FR-32's consequence-acceptance is irreversible and fires before an engagement that may never complete
**Location:** FR-32, Glossary *Engage*, FR-39.

Engagement is now Agreement confirmation. FR-39 makes confirmation a two-step act that **can fail**: the Family confirms, then the Vendor confirms, and "if the Slots or Span are already blocked when the Vendor confirms, the confirmation fails."

FR-32 fires "before the family engages" and its acceptance is destructive: "impermissible Shortlist entries are **removed** and their contribution withdrawn from the running budget ... any impermissible **Agreement is cancelled under FR-42**" — which stamps a countable cancellation on both profiles and releases the Slots to other families.

So on the sequence the PRD makes ordinary — Family accepts consequences, Family confirms, Vendor's confirmation fails on conflict — the Family has destroyed her Shortlist and cancelled a live Agreement in exchange for an engagement that does not exist. **No rollback is specified.** The released Slots may be gone. FR-32's own governing principle ("Nothing is ever removed silently") is satisfied in letter and defeated in effect.

An agent must invent: the exact moment the modal fires, whether acceptance is provisional pending the Vendor's confirmation, whether a declined-by-conflict confirmation reverses it, and what happens if the Vendor simply never confirms.

### R-C7 — No Admin account can be created
Carried from C-09. No FR creates one, no bootstrap is described, and FR-4/FR-61 grant total authority to a role nothing brings into existence. An agent will seed one and choose the mechanism.

### R-C8 — No account recovery, number change, or device/credential loss path
Carried from C-09, and the surface grew with FR-1's expansion. The phone number is the sole identity and the sole access-granting key for a Wedding (FR-5: "There is no other route in"). A Vendor's account holds the Subscriptions, the Listings, the calendar, the Lead Dashboard and the eight-year Agreement record. There is no recovery, no transfer, no number change, no successor path, no device list, no sign-out, no session revocation and no passkey-loss fallback. Number churn and shared handsets are routine in the launch market.

### R-C9 — The ranking function's two decisive parameters are unquantified, and rotation is excluded from the mandated disclosure
Detail under C-08 items 1–4. The shrinkage prior and the near-equal band together determine the entire launch-market ordering, in which every Vendor starts at zero Reviews. The disclosure omission is a compliance defect against FR-64.

### R-C10 — Reply speed as a ranking signal contradicts §7.2 and FR-37
FR-20 signal 3 vs §7.2 ("Excluded: ... vendor standing scores") and FR-37 ("An outcome is never shown to the family, and never affects the Vendor's public standing"). Search position is public standing. The prior audit warned against this signal for exactly this reason; the revision adopted it without reconciling either statement. One of the three must be amended, and only the author can choose which.

### R-C11 — The seed configuration for the five frozen Services is still absent, and the configuration surface has grown
Carried from H-11 and escalated. Correct as architecture — "Admin sets this when configuring the Service. It is not hard-coded per Service anywhere" (FR-14) — but the seed is a product decision the PRD never makes. An agent must invent, for each of Venue, Catering, Photography, Décor & Mandap and Band Baaja Baraat: the engagement model, the pricing model, the sizing attribute, whether it has Spaces, **its Slot scheme (new, FR-28)**, its filters, its comparison attributes, and **its required capabilities (new, FR-71)**. Eight axes × five Services ≈ 40 cells, plus filter and attribute sets. This is now the largest single block of invention in the document, and the whole of §4.3, §4.4 and §4.6 is expressed relative to it.

### R-C12 — FR-71 and FR-59 each claim to state the conditions of listing, and FR-71 introduces three undeclared things
**Location:** FR-71 vs FR-59, FR-23, §7.4, FR-38.

FR-59 enumerates the conditions of listing exhaustively — Verification, all-in price, published Rules, published Commitment. FR-71 says its own requirements "are **conditions of listing** in that Service, configured with it." Two exhaustive lists. An agent validating publication has two sources and no precedence.

FR-71 also introduces, each with no supporting requirement:
- **Space dimensions.** "Where the Family has engaged a Space, **its dimensions** and the Vendor's Rules are available to Décor Vendors quoting for it." FR-23 gives a Space "its own capacity, its own all-in price and its own calendar" — **there is no dimensions field**, no requirement that a Venue supply one, no format, and no condition of listing that demands it. And this discloses one paying Vendor's property data to another paying Vendor with **no consent path anywhere in the document** — a data-sharing decision that the §5.5 posture would ordinarily require the author to make explicitly.
- **A virtual tour.** "A Family can request a site visit **or a virtual tour** from the Listing itself." A new media type with no format, no storage requirement, no size limit, no mention in §5.3's imagery commitments, and no lifecycle. It also creates a **second entry point** to the Site Visit, which FR-38 places inside the Enquiry thread and which still has no lifecycle at all (M-16).
- **A fourth Commitment kind.** Band Baaja Baraat's no-on-the-spot-demands declaration is called "a Commitment like any other", but the Glossary and FR-59 define Commitment as a fixed triple. Commitment is now implicitly per-Service extensible and neither FR says so.

Plus: the Catering requirement — "the platform computes a recommended quantity from the Function's invited count and its confirmed RSVPs, and shows how it arrived at the figure" — **has no formula**, no buffer rule and no behaviour at zero RSVPs, while "only then does it travel with an Enquiry" appears to gate FR-34's broadcast Enquiry on the Family first accepting a quantity. And the Décor capability depends on the Family having *engaged* a Space, i.e. after Agreement confirmation — by which time the decorator comparison it exists to serve has already happened.

### R-C13 — Whether one account may be both a Family and a Vendor is still unstated, and FR-1 now collides with FR-3
Carried from C-09. FR-1's "one person is one account" and FR-3's "a Vendor business has exactly one account" together conflate person and business. Either the model is account-holds-roles with the business as a separate object (which requires restating FR-3 as one login per Vendor *business*), or real users are locked out of half the product. Schema-determining, and the schema is written from this document.

### R-C14 — Rating aggregation scope and zero-review display are undefined, and are now inputs to the ranking function
Carried from H-08 and escalated. The scale is fixed (1–5 whole stars, FR-46) but not the scope: a Vendor with a lawn and a hall, or with Listings in three Services, has how many ratings? Reviews attach to Agreements, Agreements attach to a Space or Listing, FR-19 shows a rating on the Listing, FR-60 speaks of a Vendor's record. And a zero-review Listing's display is undefined while FR-18 offers a rating filter and FR-20 ranks on a shrunk rating — the two obvious inventions are "0 stars" (which defames every new Vendor and destroys SM-1) or exclusion from rating-filtered results (which makes every new Vendor invisible and destroys SM-2's distribution counter-measure).

### R-C15 — The de-listing cascade is open for three of four exits, and FR-53 contradicts the new FR-8
Carried from C-11. Detail above. FR-59, FR-60 and FR-70's self-withdrawal each remove a Listing with no stated effect on Shortlists, Selections, budgets, open Enquiries, live Agreements, blocked Slots or review windows.

### R-C16 — The Wedding still has no lifecycle, and three clocks now depend on one
Carried from H-30 and escalated, because the revision added dependents rather than an object. Nothing anywhere defines a Wedding's states, its completion event, archival, deletion or ownership transfer. Now keyed to a completion the document does not model:
- **FR-45's ninety-day review backstop** — "no later than ninety days after the last Function of the **Chosen Block**". A Wedding may hold Agreements and never lock a Block (FR-34 permits enquiring against a Candidate Block). The backstop then has no anchor, and C-04's closure lapses back open for that Wedding.
- **§5.5's guest-data erasure** — "the later of the last Function of that Wedding or the close of RSVP". Same missing anchor, plus an RSVP close date that no object defines. This is the retention clock for the one class of data subject "who never chose this platform."
- **FR-65's publishing right** — "After the wedding, the family can publish it" with no trigger stated.
- **SM-4's abandonment measure** — "Weddings created and never returned to" has no state to count.

## 3.2 New and carried HIGH findings (31)

1. **The Family-confirmed Agreement state has no timeout and no withdrawal** (FR-39). She waits in the exposed position indefinitely.
2. **The Enquiry lifecycle is still incomplete** (FR-34/35/37). No viewed, no Family withdrawal, no Vendor decline, no expiry, no duplicate rule, no terminal state; "declined-by-conflict" belongs to no enumerated set; "median time to first reply" (FR-55) does not define *reply* and has no value for non-response — which is the case the metric most needs.
3. **Broadcast Enquiries are uncapped and unrate-limited** (FR-34). No maximum breadth, no cooldown, no cross-Service rule, and no auto-close of the siblings when the Family makes a Selection. Combined with FR-36's ungated Contact Reveal this is the supply-side scraping and spam surface.
4. **Whether an Enquiry's wedding context is a snapshot or a live reference is still undefined** (H-13). FR-17 still says nothing about open Enquiries; FR-69 solved the equivalent problem for Agreements and the same fix was not carried across.
5. **The Family is not told when a shortlisted or Selected Listing is taken by another family** (H-14). FR-53 covers the lapse case only. In a product whose premise is that a booked-out vendor "sends the family back to the start", this is silence at the moment that matters.
6. **Empty and zero states remain undefined** (H-15). Zero results in a Service; zero Vendors in a Service and Place (SM-7 concedes this is the launch condition); the **total** no-Block-clears case, which UJ-1 addresses only for the two-Block swap; the empty Lead Dashboard and FR-56's cost-per-Enquiry divide-by-zero.
7. **Whether a Block that clears nothing may be locked is still unstated** (H-16, FR-16), as is whether "discarded" Blocks are deleted or retained, and whether a Chosen Block can be unlocked without choosing another — which FR-17 needs somewhere to return to.
8. **Price, capacity, calendar and Rules when a Listing has Spaces** (H-17). FR-19 shows one all-in price, FR-23 puts the price on the Space, FR-59 validates "an all-in price". What FR-21 compares, what FR-8 counts and what FR-18 filters are all undetermined.
9. **An invited member has no way to learn they were invited** (H-18). No pending state, no expiry, no revocation of an unaccepted invitation, and FR-12's own rationale forbids the platform messaging them.
10. **No notification channel matrix** (H-19). FR-29's nudge is WhatsApp-only with no fallback; the Family's channel is "in the app"; push permission denial is unaddressed; the WhatsApp 24-hour/template constraint appears nowhere despite shaping FR-1, FR-29, FR-35 and FR-53.
11. **Contact Reveal is ungated, uncapped and has no counting rule** (H-21) — while FR-56 computes a business figure from it.
12. **Preferred Vendor associations have no lifecycle, and the permitted set can become empty** (H-09). FR-25 states acceptance and nothing else: no pending state, no notification, no decline record, no revocation by either side. FR-24 still says a restricted Family's "choices in that Service are limited to the permitted set" with no behaviour when that set empties — leaving a Family holding a venue Agreement and unable to engage catering at all.
13. **Capacity-per-Slot / crew bandwidth is absent and not excluded** (H-10). A photographer with three teams must appear unavailable or leave everything open. §7 does not exclude it, so an agent may helpfully add it.
14. **The seed configuration for the frozen five** — see R-C11; listed here because the *filters and comparison attributes* half is high rather than critical.
15. **Subscription payment edge cases** (H-06): failure, duplicate, partial, mid-term upgrade or downgrade, proration, refunds. §5.5 still promises "Cancelling is as easy as starting" with no cancel action defined anywhere.
16. **Term-start anchor and renewal-during-grace arithmetic** are undefined (FR-52/53). Does a twelve-month term run from payment, Verification or publication; does a renewal in grace extend from the old expiry or the payment date?
17. **Portfolio allowance per tier is unquantified** (H-04). FR-50's "The actual figures are a business input" follows the price bullet and most naturally reads as prices; §5.9's dependency row says "Subscription prices per Tier", not allowances.
18. **What tier a Founding Vendor lands on at cohort expiry** is unstated (FR-51), as is whether Founding is per Vendor or per Subscription (R-C3).
19. **Several Agreements with one Listing produce several Reviews on it** (H-29), now compounded by R-C2.
20. **The Admin journey is still absent** (H-31) and Verification has no queue, assignee, scheduled visit or SLA — while SM-1 measures its duration.
21. **The place hierarchy has no seed, no matching rule and no ambiguity handling** (H-28) — and is now also the **billing key** (FR-50) and the **k-anonymity cohort key** (FR-57), at an unstated level.
22. **Session policy beyond the family case** (H-03 residual): no lockout duration after five OTP attempts, no Vendor or Admin session lifetime (FR-1's ninety days reads as applying to Admin), no sign-out, no revocation, no passkey-loss fallback.
23. **FR-62 vs FR-59** on whether a Listing made incomplete by a configuration change stays published or stops being discoverable; and Service configuration versioning / Agreement pinning is still unstated (C-12 residual).
24. **FR-68's "for particular Functions"** dimension is undefined across Shortlist, Selection, matching, budget and SM-5.
25. **FR-71's catering recommendation has no formula** and appears to gate Enquiry sending.
26. **FR-71's named-shooter change notification** has no audience (Agreement holders? Selections? Shortlists?), no channel, no deadline definition beyond "before the wedding", and no stated consequence — in particular, no cancellation without a countable cancellation.
27. **Amendment conflict, ordering and timing** (C-17 residuals): no first-writer-wins on new Slots, no confirmation order, no timeout, no rejection state, and no rule on post-Delivery amendments.
28. **The Admin-exclusive capability set is not enumerated** (C-07 residual), and whether Admin may build or edit a Listing on a Vendor's behalf — required by the launch story — is unstated.
29. **FR-47's "their own account of the engagement"** has no surface, and FR-47 simultaneously forbids Family-visible prose about the engagement. The recourse is stated and not provided.
30. **UJ-1's climax now disagrees with FR-15.** The journey turns on "her **shortlisted** venue, caterer *and* photographer free across every day"; FR-15 now "reports across the Family's **Selections**". The headline journey and the requirement that realizes it describe different mechanisms.
31. **Delivery has no floor and no correction** (M-05/M-06), now high rather than medium because Delivery gates the only consequence in the product: a Vendor may mark it before the event, and a mistaken mark cannot be undone by anyone.

## 3.3 MEDIUM (24)

1. FR-6's prohibition list is not exhaustive — omits Service selection and Selection — and its "can do nothing else" catch-all contradicts FR-67's "Boards are private to the Wedding **and its invited members**".
2. FR-41 ("Every term in an Agreement comes from the Vendor's own proposal") still contradicts FR-39 ("Either party may decline or propose different terms"). FR-39 was fixed; FR-41 was not.
3. Delivery may be marked before the service occurs (no floor).
4. Delivery cannot be corrected; no un-mark, no Admin path.
5. Whether a submitted review can be edited or withdrawn during the blind period is undefined.
6. Review sort order is undefined but FR-46 requires it be disclosed.
7. The right of reply has no rules — editability, moderation, length, threading, whether one exists for the structured form.
8. A removed review's side effects are undefined — aggregate recompute, review count, counterpart publication during the blind window, visibility of the removal.
9. The suggestion object has no lifecycle (FR-6): outcome notification, visibility, expiry, duplicates, and what "accepts" does mechanically.
10. Maximum Functions per Wedding; unlocking a Chosen Block; whether "discarded" Blocks are retained (partially closed — five Anchor Dates is now set).
11. Time passing is not modelled: past-dated Anchor Dates, Blocks expiring during planning, an Agreement whose dates passed without Delivery.
12. The budget ceiling's own semantics: mandatory at creation?, editable?, overage behaviour, **currency is never stated anywhere in the document**, lakh/crore display convention.
13. Real Wedding publication: cost band width, whether a cancelled or non-delivered Agreement may be credited, edit/unpublish vs consent withdrawal, photo moderation.
14. Site Visit has no lifecycle — and FR-71 adds a second entry point outside the Enquiry thread while UJ-2's dashboard reports "6 site visits" as a business figure.
15. FR-43's trusted time source has no failure behaviour.
16. Third-party portfolio evidence (FR-27) has no consent chain and no withdrawal cascade, though FR-66 promises one ("removes ... any Vendor evidence derived from it").
17. Space and Listing mutation with live commitments: deleting a Space with a confirmed Agreement, reducing capacity below an agreed headcount, deleting a Listing with live Agreements.
18. Media constraints absent throughout — photo counts, file sizes, formats, minimum resolution, whether video exists — against §5.3's explicit performance commitment; now including FR-71's virtual tour.
19. No length limits on any free text, and **Rules still have no stated machine-actionable structure** although FR-24's restriction and FR-32's cascade both require the platform to act on them.
20. FR-47 names three questions and no answer types (yes/no, scale, choice; mandatory or not; Service-dependent or fixed).
21. §5 no longer declares itself incomplete, but security posture beyond sign-in, authorization, media access control, rate limiting, observability, backup and restore, disaster recovery, data residency, §5.4's SLO figures and a support matrix are all still absent. Removing the warning without adding the content makes the gap harder to see.
22. A lapsed Vendor's calendar-edit and Delivery-marking rights are implied by FR-53 but not stated (M-25 residual).
23. The grievance officer is a named role in a system that states it has no roles (FR-63 vs FR-61 and §7.8).
24. FR-63 carries a duplicated advisory bullet ("at least once a quarter" and "periodically informed"), and "acknowledged on receipt" carries no acknowledgement clock although the other five periods are now numeric.

## 3.4 LOW (6)

1. FR ID interleaving is materially worse — FR-68 sits between FR-9 and FR-10, FR-71 between FR-33 and FR-27, FR-69 between FR-41 and FR-42, FR-70 between FR-58 and FR-59. §0's stability rationale is correct and the IDs should stay; only §4.5 carries a local note, and an agent generating an ordered backlog from document order will produce a confusing sequence.
2. §7.9 still supplies no approved verb for the central act; "engage" is not listed as the replacement for the banned *book*.
3. The Glossary headword is *Engage*; the FRs use *engagement* as a noun that is not itself a headword, in a section that declares synonym introduction a discipline violation.
4. SM-2's "meaningful number of Enquiries" and SM-7's "the threshold" remain unquantified definitional thresholds.
5. FR-19 was not amended for the no-Anchor-Date case; only FR-13 carries it, so the two read as contradictory on their face.
6. FR-4 and FR-61 are near-verbatim duplicates in two feature groups; a downstream agent may model two admin authorities.

---

# 4. State machines

The prior audit's headline structural finding was that no object has a lifecycle. **One now does.**

| Object | Derivable? | What is now determined | What is still missing |
|---|---|---|---|
| **Agreement** | **Nearly** | proposed → family-confirmed (pending) → confirmed → {amended, cancelled}; Delivery reached; Slots blocked on confirm and released on cancel; first-writer-wins on the Vendor's confirm; declined-by-conflict on failure; append-only history | Pending-state timeout; Family withdrawal of her confirmation; conflicts other than Slots; whether an Agreement can exist without a Chosen Block and what anchors the FR-45 backstop then; which version FR-40's downloadable copy is |
| **Amendment** | **Partial** | proposed by either party → both confirm → appended; original never altered; no cancellation recorded; calendar adjusted on confirmation | Rejection and expiry states; confirmation ordering; conflict on the new Slots; post-Delivery amendments and their effect on an open review window |
| **Listing** | **Partial** | draft → submitted → {failed → resubmit} → published (Verification + FR-59 + active Subscription) → {self-withdrawn, not-discoverable, lapsed, removed} | Re-verification on material edit (**R-C5**); cascade for three of four exits (**R-C15**); Space-level price and capacity (H-17); deletion; the FR-62/FR-59 conflict on an incomplete Listing |
| **Wedding** | **No** | created; holds Services, Functions, Blocks | Everything else. No completion event, archive, deletion, transfer or recovery — and FR-45's backstop, §5.5's guest erasure, FR-65 and SM-4 all now depend on one (**R-C16**) |
| **Candidate Block** | **No** | created per Anchor Date; max five; locked to Chosen; changed under FR-17 | Whether "discarded" is deleted or inactive; unlock without relock; expiry when dates pass; past dates; whether a non-clearing Block may be locked |
| **Selection** | **No** | created from a Shortlist; contributes to the budget; changeable until an Agreement is confirmed against it | No states named at all. Cardinality is broken (**R-C2**). Undefined: reversion on Agreement cancellation; behaviour on Listing lapse or removal; behaviour on Service removal; whether an Agreement without a Selection creates one; whether Selection is required before an Enquiry. **The newest object is the least specified.** |
| **Shortlist / entry** | **No** | added; removed; removed on FR-32 acceptance; marked unavailable on Subscription lapse | Removal or marking on the other three exits; notification when taken by another family (H-14); limits; what "removes its Shortlist" (FR-68) does to the Selection |
| **Enquiry** | **No** | sent (sole or broadcast); shown unanswered after 30 days; Vendor outcomes {contacted, site visit arranged, won, lost}; proposal declined-by-conflict | Viewed; withdrawn; declined; expired; duplicate rule; terminal states; effect of a Block, headcount or Selection change; broadcast sibling behaviour; response-time definition and its non-response value |
| **Review** | **No** | window opens on Delivery / committed date / 90-day backstop; 14-day window; blind; publishes on both-submitted or window close; 1–5 whole stars; right of reply; removal recorded | Edit or withdrawal before publication; removal side effects; **aggregation scope (R-C14)**; zero-review display; one-per-Agreement vs one-per-Listing (H-29); reply lifecycle; sort order; the structured form's answer types |
| **Subscription** | **No** | active → expired → grace (30 days) → withdrawn from discovery; reminders at 30/14/7/1; renewed only by an active decision; existing engagements untouched | **The entire per-Service-per-Place multiplicity (R-C3)**; term-start anchor; renewal-during-grace arithmetic; payment failure, duplicate, refund, upgrade, downgrade; what "cancelling" means; Founding Vendor's landing tier |
| **Vendor account** | **No** | a business self-registers and builds a Listing (FR-70) | The account-to-business relationship (**R-C13**); whether it may also be a Family account; recovery, number change, device and passkey loss (**R-C8**); deletion; what FR-60 removal does to the *account* as against its Listings; reinstatement |

**Still underdetermined: 8 of the 11 named** — Wedding, Candidate Block, Selection, Shortlist, Enquiry, Review, Subscription, Vendor account. Listing and Amendment are partial. Agreement is nearly there.

Four further objects the build needs and the document does not model at all: **Verification** (no queue, assignee, expiry or re-verification), **Preferred Vendor association** (no pending, decline or revoke), **Wedding member invitation** (no pending state), and **Site Visit** (no states, two entry points). **Admin account** has no existence whatsoever.

---

# 5. Revised verdict, and the minimum set

## Verdict

**Not yet safe to hand to an autonomous build.**

The document is meaningfully better than it was: the four architecture-determining contradictions that made it unbuildable (messaging transport, admin authority, concurrency, erasure) are resolved, the review mechanism is now complete end to end, and the fourteen ratified thresholds removed the largest single block of arbitrary invention. Nine of eighteen criticals are genuinely closed and none of the closures is cosmetic.

What stops it is narrower and more tractable than last time. Three of the remaining criticals are **carried-forward gaps that were not touched** (Slot, re-verification, identity). Five are **new, and every one of them is a fix that stopped short of the requirements it disturbed** — a Selection that cannot count, a Subscription that cannot be priced, a ranking function missing its two decisive constants, an account-linking rule with no key, and an FR-71 that reopens the conditions of listing. That is a pattern worth acting on directly: the next pass should be organised as *follow each ratified decision into every requirement it touches*, not as *close the remaining findings*.

## The minimum set, ordered by leverage

Fifteen items. Most are three to ten lines. Two are tables, one is a journey.

1. **Slot: one paragraph.** Either fix a platform-wide scheme, or state how a Wedding-level Function Slot maps onto a per-Service scheme. Give the scheme explicit clock boundaries and state IST. Amend the Glossary and FR-9 to agree. *Unblocks: the whole matching engine, FR-9, FR-13, FR-14's span arithmetic, FR-28, the availability schema.* — **R-C1**
2. **The engagement unit: three lines.** Restate Selection's cardinality so it can represent a venue's two Spaces and a per-Function Service across three Functions, then give FR-8 arithmetic for per-Function, per-unit and per-rental-period prices and for an Agreement with no Selection. *Unblocks: the budget, FR-15, FR-22, SM-5, H-29, FR-68's per-Function dimension.* — **R-C2, C-02**
3. **Seed configuration table for the frozen five: ~40–50 cells.** Engagement model, pricing model, sizing attribute, has-Spaces, Slot scheme, filters, comparison attributes, required capabilities. *Removes the largest remaining block of invention.* — **R-C11**
4. **Identity: three rulings and one flow, ~10 lines.** Whether an account may hold both roles (and restate FR-3 accordingly); the linking key and the verification challenge that must precede an automatic link; Admin bootstrap; a number-change and device-loss path as an attributable Admin action. Add per-surface session lifetimes, lockout duration and sign-out-everywhere. — **R-C4, R-C7, R-C8, R-C13**
5. **Subscription ↔ Place: five lines.** Which hierarchy level a Subscription is bought at, what a multi-area Vendor owes, partial-lapse discovery behaviour, Tier and portfolio-allowance scoping, and FR-53/FR-56 restated in the plural. Add the term-start anchor and the renewal-during-grace rule. — **R-C3**
6. **Ranking: four numbers and one ruling, six lines.** The shrinkage prior and the *enough reviews* threshold; the scope of "the Service's average"; the near-equal band and the rotation period; whether reply speed survives §7.2 (and amend §7.2 or FR-37 if it does); and add rotation to FR-20's disclosure text. — **R-C9, R-C10**
7. **Rating aggregation scope and the zero-review display: three lines.** Per Listing, per Space or per Vendor; and what a Listing with no reviews shows and does under a rating filter. — **R-C14**
8. **Re-verification on material edit: three lines**, with "material" defined. This is the only mechanism that would make FR-60's stolen-portfolio ground detectable. — **R-C5**
9. **FR-32's trigger point inside FR-39: three lines.** The consequence modal fires at the Family's confirm; acceptance takes effect only when the Agreement completes; a conflict-declined confirmation rolls it back. — **R-C6, C-01**
10. **De-listing cascade: one short table**, four exits × six affected objects. Delete FR-53's stale Shortlist-budget clause and cover the Selection case. — **R-C15**
11. **Wedding lifecycle: four lines.** Planning → Completed (with the trigger stated, including the no-Chosen-Block case) → Archived; deletion; and what anchors FR-45's backstop, §5.5's guest erasure and FR-65 when no Block was locked. Define RSVP close. — **R-C16**
12. **FR-71 reconciliation: six lines.** Fold its requirements into FR-59 (one list, not two); add Space dimensions to FR-23 as a Venue field with a consent rule for cross-Vendor disclosure; give the catering recommendation a formula; specify or drop the virtual tour; state whether Commitment is per-Service extensible. — **R-C12**
13. **Enquiry and Agreement-pending state sets: one small table.** The states already implied, plus pending timeout, Family withdrawal, Vendor decline, expiry, duplicates, broadcast width cap, and the definition of *first reply* and its non-response value. — highs 1–3
14. **UJ-4, the Admin journey: about a page.** A verification visit end to end and a fraud removal. Closes the Verification queue and SLA, the Admin-exclusive capability list, whether Admin may build a Listing for a Vendor, and much of H-31 and C-07's residual as a by-product.
15. **The remaining quantities: one table**, in exactly the form of the fourteen already ratified. Roughly twenty-three: portfolio allowance ×3; lockout duration; Vendor and Admin session lifetimes; Slot clock boundaries and time zone; max Functions per Wedding; max Invited Members; guest list and bulk-import limits; Contact Reveal cap and counting rule; Enquiry rate limits and broadcast width; photo count, file size, formats, minimum resolution, video; free-text length limits; Real Wedding cost band width; currency, rounding and lakh/crore convention; GST rate, place-of-supply default and invoice series; peak-load SLO; SM-2's "meaningful" and SM-7's threshold; the rating shrinkage constant; the rotation band and period; the k-anonymity cohort's Place level; the nudge's "period"; and the catering recommendation formula.

Items 1–3 alone would move the document from *not buildable* to *buildable with known risk*. Items 1–12 would make it safe. Items 13–15 are what stop the build re-litigating the same decisions in every epic.

---

*Findings: 77 total — 16 critical, 31 high, 24 medium, 6 low. Prior: 79 total — 18 critical, 31 high, 25 medium, 5 low. Nine of eighteen criticals genuinely closed; five new criticals introduced by the revision.*
