---
title: PRD Audit — Pass 4 (delta only)
target: prd.md
scope: changes recorded in .memlog.md entries 84–87 (round-3 fixes + the FR-11 guest-model reversal and guest self-service form)
date: 2026-09-06
---

# Pass 4 — narrow delta audit

**Method.** PRD read in full once. Only the ten changed rules listed in the brief were chased through the document, plus the quick pass on FR IDs, banned vocabulary and Glossary staleness. Prior audits consulted only to determine whether a named round-3 finding is closed.

**Verdict.** The round-3 fixes are, as edits, correct — every one of them landed where it was aimed. But the same failure mode recurs a fourth time: **eight of the ten changes stop at the FR that was edited** and do not reach the FRs, tables, Glossary entries or NFRs that consume the rule. Three of those stops are severe enough to invert the decision Abhishek made. One entirely new hazard (self-dealing) was created by the identity addition.

Counts: **3 CRITICAL, 6 HIGH, 7 MEDIUM, 5 LOW (21 total).**

---

## 1. Did the round-3 fixes hold?

| Round-3 fix (memlog 84–85) | Landed? | Reached its consumers? |
|---|---|---|
| Selection per **engagement**; FR-8 counts a Span once | Yes — Glossary 191, FR-8 313, FR-22 545 | **No** — "engagement" is not a constructible object (H-4) |
| De-listing cascade over all four exits | Yes — FR-53 block | **Partly** — overreaches into fraud removal (H-6); one-directional refs (M-7) |
| FR-72 dormancy consequence + no-Block conclusion | Yes — FR-72 331–332 | **No** — FR-45 still anchors on the Chosen Block only (C-1) |
| NFR 5.5 erasure = conclusion + 30 days | Yes — 1211 | **Partly** — abandoned Weddings never conclude (H-3); Glossary lacks the states (M-5) |
| FR-45 one-year ceiling | Yes — 866 | **No** — contradicts FR-45's own first bullet, Glossary `Delivery`, UJ-3 (C-1) |
| Space **stated size** (FR-23) as Décor's Sizing Attribute | Yes — FR-23 565–566, table 648 | **No** — breaks FR-19, FR-18 and the Glossary enum (H-5) |
| Identity: dual role, number change, Admin recovery | Yes — FR-1 236–238 | **No** — opens self-Agreement (C-3); outside the audit rules (M-2) |
| Zero-Review display | Yes — FR-19 503 | **No** — FR-18 rating filter and FR-20 shrinkage untouched (M-4) |
| Portfolio allowance as an image count per Tier | Yes — FR-50, Glossary 206 | **Partly** — FR-27 and NFR 5.9 silent (M-6) |
| FR-11 rewritten; guest self-service form added | Yes — FR-11 373–387 | **No** — FR-71 table, FR-8, FR-6, NFR 5.8, Glossary `Guest`, SM-6 (C-2, H-1, H-2, M-1, M-3, L-1) |

Round-3 finding **NEW-C3** (FR-45 needs a real upper bound *and* an anchor that always exists) is **half closed**: the bound exists, the anchor does not. Round-3 **H-5** (FR-72's three states missing from the Glossary) is **still open** and is now load-bearing for two new rules.

---

## 2. CRITICAL

### C-1. FR-45 now contradicts itself, the Glossary and UJ-3 about when the review window opens.

Three statements, all current, all irreconcilable:

- FR-45 bullet 1 (line 863): the window opens when the Vendor marks delivery **"or** when the delivery timeline … passes — **whichever comes first**".
- FR-45 bullet 2 (line 866): "It opens **at the later of** the Vendor's committed delivery date **or ninety days** after the last Function of the Chosen Block — and in no case later than one year after that last Function."
- Glossary `Delivery` (line 199): "Reached when the Vendor marks it delivered, or when the Vendor's committed delivery date passes, **whichever comes first**." UJ-3's constraint block (line 140) says the same, and FR-45's own closing bullet says "for a venue this is the end of the span".

For a venue committing to same-day delivery, bullet 1 and the Glossary open the window at the end of the Span; bullet 2 opens it ninety days later. For a photographer committing to thirty days, bullet 1 says day 30, bullet 2 says day 90. An autonomous builder will implement whichever bullet it reads first, and FR-40 makes this the sole gate on Review rights — the only consequence a Vendor faces.

Compounding it: bullet 2 still anchors on **"the last Function of the Chosen Block"**, the object round-3 established may not exist. FR-72 (line 331) supplies the substitute anchor — a confirmed Agreement's own days — but FR-45 does not cite FR-72 and does not repeat it. The fix reached FR-72 and stopped.

**Fix:** state the trigger once, in FR-45, as `open_at = min(marked_delivered, max(committed_date, last_function + 90d)) capped at last_function + 365d`, with `last_function` defined as FR-72's anchor (Chosen Block's last Function, else the latest confirmed Agreement's last day). Rewrite Glossary `Delivery` and UJ-3's constraint to cite FR-45 rather than restate a rule.

### C-2. FR-71's seed table reverses the FR-11 decision for Catering — the one Service where it matters most.

FR-71's prose bullet (line 634) is correctly updated: "Where the Family has only stated a number, that is the basis. Where a guest list exists, confirmed RSVPs refine it." Nine lines later the seed table (line 646) says:

| **Catering** | per Function | per head | **confirmed headcount** | no |

"Confirmed headcount" is the pre-rewrite rule stated as configuration — and configuration is what a builder implements. It makes an **optional** artefact (the guest list) a **precondition** for sizing the single highest-value Service, which is exactly the reversal memlog 86 records Abhishek rejecting.

It is also a **Glossary violation**: `Sizing Attribute` (line 180) is a closed enumeration — "capacity, crew bandwidth, headcount, quantity, or none". "Confirmed headcount" is not a member of it, and neither is Décor's "the engaged Space's stated size" (see H-5). FR-18 (line 492) restates the enum as "capacity, bandwidth, headcount, quantity" — a third variant, dropping "crew".

**Fix:** table cell → `headcount`. Reconcile the enum across Glossary 180, FR-18 492 and the table in one edit.

### C-3. One account holding both Family and Vendor roles has no bar against confirming both sides of its own Agreement — and therefore reviewing itself.

FR-1 (line 236) now says "One person may be both a Family and a Vendor on one account." Nothing downstream was adjusted:

- FR-39 requires "The Family confirms, then the Vendor confirms" — it never requires the two to be different accounts.
- FR-44 closes the competitor hole ("A competitor cannot review a rival by enquiring with them") but its gate is only "parties to an Agreement that reached Delivery".
- FR-45 lets the Vendor open the window himself by marking delivery.
- FR-46 publishes a Family's five-star free-text review on the Listing, "shown as" a verified party to a real Agreement.

So the path is: create a Wedding on your own account → enquire with your own Listing → propose and confirm terms on both sides → mark delivered → publish a verified five-star review of yourself. FR-20 weights rating second, so this also buys organic position. Reviews are the platform's only consequence mechanism (§4.9 preamble); this is a complete bypass of it, introduced by an identity convenience.

**Fix:** add to FR-39 — an Agreement cannot be confirmed where the Creator's account and the Vendor's account are the same, and the proposal is refused at composition, not at confirmation. Add the mirror to FR-44. Also decide (FR-25) whether a dual-role account may name itself a Preferred Vendor.

---

## 3. HIGH

### H-1. The guest self-service form is a public personal-data surface with none of the protections the other public surface carries.

FR-12's RSVP page — the only other unauthenticated surface — carries four explicit protections: each link **individual and unguessable**, no link reveals the guest list, no link can be altered to reach another's, and the page is **excluded from search engine indexing**. FR-11's form (lines 381–387) carries three rules only: submissions arrive as suggestions, the submitter sees nothing, the link is revocable and expires. Missing:

- **No unguessability requirement.** The link is *designed* to be forwarded through WhatsApp groups; a guessable or enumerable token exposes the submission endpoint of every live Wedding.
- **No search-engine exclusion.** A WhatsApp-forwarded link reaches Telegram, then a public group, then an index. FR-12 states the rule for the smaller surface and not for this one.
- **No abuse, rate or volume control.** Anyone with the link may submit unlimited households; the only defence stated is the Creator's manual dismissal, which is the attack's cost, not its deterrent.
- **Not named in NFR 5.8.** Line 1240 says "**Every surface** meets WCAG 2.1 AA" and then enumerates four — "the Family application, the Vendor portal, the admin panel, and the public RSVP page." The enumeration reads as the definition of "every surface"; the form is not in it, and its stated rationale ("the platform's largest public surface … none of them chose to be there") applies to the form verbatim.
- **FR-63's grievance officer** must be "reachable from every surface". The form is a surface reachable by people with no account and no other route to the platform.

**Fix:** extend FR-11 with the four FR-12 protections by reference, add the form to NFR 5.8's enumeration, and state a submission ceiling per link.

### H-2. Glossary `Guest` excludes exactly the people the new form collects, so none of the guest-data rules reach them.

`Guest` (line 156) is "**a household on a Wedding's guest list**, carrying a count of people." A form submission that the Creator has not yet accepted — or has dismissed — is by definition *not on the guest list*. Consequently:

- **FR-4 / FR-61**: "Access to Guest contact data is confined to Admin users with an operational need … and each access is logged." Pending and dismissed submissions are not Guest contact data.
- **FR-12 / NFR 5.5**: "Guest contact details are used to compose that Wedding's invitations and for nothing else." A dismissed submission composes no invitation, so the purpose limitation does not bind it.
- **NFR 5.5 erasure**: keyed to Guests, so a dismissed household's name and phone number have **no stated retention limit at all**.

FR-11 line 387 asserts "NFR 5.5 governs those details exactly as it governs any other Guest data" — but the Glossary definition it depends on does not admit them. This is the DPDP-facing surface of the whole change, and it currently holds unbounded personal data on people who consented to one specific purpose.

**Fix:** widen `Guest` to "a household on a Wedding's guest list **or submitted to it**"; state in FR-11 that a dismissed submission is deleted immediately and a pending one within the same clock as an accepted one.

### H-3. An abandoned Wedding leaves the public form live forever.

FR-11 line 386: the link "expires on its own once the Wedding **concludes**." FR-72 defines exactly two ways a Wedding concludes (last Function of the Chosen Block passes; failing that, the latest confirmed Agreement's days pass). **Abandonment is a third terminal state and is not conclusion.** FR-72's abandon bullet (line 333) cancels Agreements, releases Slots and erases the Guest list — it says nothing about the share link or about pending submissions.

So: Creator abandons the Wedding → guest list erased → link still live → strangers keep posting names and phone numbers into a Wedding that no longer exists, into the pending queue H-2 shows has no retention rule. Same hole for the dormancy path (line 332), which ends in abandonment.

**Fix:** FR-72's abandon bullet must revoke the link and delete pending submissions; state the link's lifetime as "revoked by the Creator, or on conclusion **or abandonment**, whichever comes first".

### H-4. "One Selection per engagement" rests on an object nothing in the document constructs.

Glossary 191 defines the cardinality against "what FR-14's Engagement Model defines". FR-14 defines the **model** (Span / per Function / rental period / lead time / no duration) — a property of a Service. It never defines an **engagement instance**, or how many exist within one Service on one Wedding. For a per-Function Service FR-14 line 441 supplies the count implicitly (one per Function). For a Span Service the count exists only inside a Glossary *example*: "A Family needing two different Spaces … makes two Span engagements and therefore two Selections."

Nothing states the rule that example illustrates, and nothing gives the Family a way to declare a second Span engagement. FR-68 (Service selection) offers only "A Service may be selected for the whole Wedding or for particular Functions" — which is not the same axis. So a builder cannot answer: how does Rutuja express "lawn for the Haldi, hall for the Reception"? FR-8's budget arithmetic, FR-22's Selection rule and FR-15's collision view all count over this undefined unit.

**Fix:** state the rule in FR-14 — an engagement is one Span (or one Function, per the model) over a contiguous set of Functions the Family declares; a Family may declare more than one engagement in a Service. Give FR-68 or FR-22 the surface where that declaration happens.

### H-5. Making the Space's stated size a Sizing Attribute broke three consumers of Sizing Attribute.

FR-23 defines the field cleanly and FR-71's table sets Décor's sizing to "the engaged Space's stated size". But Sizing Attribute is consumed in three places that now cannot function:

- **FR-19 (line 502):** "Every Listing shows … **the Service's Sizing Attribute**." A Décor Listing cannot display the engaged Space's stated size: the Space belongs to a *different* Vendor and, when the Family is browsing decorators, may not have been chosen yet.
- **FR-18 (line 492):** filters cover "the Service's own Sizing Attribute (capacity, bandwidth, headcount, quantity)". Filtering Décor Listings by the venue's size is meaningless, and the value is absent from the enum.
- **Glossary (line 180):** the enum is closed — "capacity, crew bandwidth, headcount, quantity, or none". Two of the five seed Services now sit outside it (see C-2).

Separately, FR-71's Décor bullet (line 636) still says "its **dimensions** and the Vendor's Rules are available" — `dimensions` is a synonym for the newly-defined `stated size`, which §3 line 147 makes a discipline violation.

**Fix:** either add `stated size` to the Glossary enum and exempt it from FR-18/FR-19 explicitly (it is a *quoting input*, not a *browse attribute*), or leave Décor's Sizing Attribute as `none` and carry stated size purely as the FR-23 quoting field. Replace "dimensions" with "stated size".

### H-6. The four-exit cascade applies lapse semantics to removal for fraud.

FR-53's cascade paragraph now governs all four exits identically, including "Admin removing the Vendor (FR-60)", and states: "existing Agreements, open threads and **review windows are untouched**", with the Family told only that the Listing is no longer available.

FR-60 limits removal to "fraud, falsified Verification, stolen or misrepresented portfolio, or impersonation". Uniformity therefore produces: a Vendor removed for **impersonation** keeps every confirmed Agreement, keeps the Slots blocked on a calendar nobody is maintaining, keeps open threads answerable, and the Family engaged with him is told only that a listing has gone. FR-53's own justification for the untouched clause — "A Vendor who lapses still owes the weddings they took" — is a statement about a lapsed subscriber and does not transfer to a fraud.

FR-60 was not updated to say what happens to Families holding Agreements with a removed Vendor, and the cascade answers it by default rather than by decision. This is a decision Abhishek should make explicitly, not one the generalisation should make silently.

**Fix:** carve fraud removal out of the uniform clause — at minimum, the Family holding an Agreement with a removed Vendor is told **that the Vendor was removed** (not merely that the listing is gone), and FR-60 states whether those Agreements stand.

---

## 4. MEDIUM

**M-1. FR-8 and FR-69 never name the stated count, and "headcount" is a floating synonym.** FR-8 line 316: "the figure is that price times **the headcount** of the Functions it serves." FR-11 line 373 says the stated number "is what the running budget uses" — but FR-8, the FR that does the arithmetic, does not say which number it multiplies, and the word it uses is not the word FR-11 uses. FR-69 line 828 ("Where a Function's **headcount moves** away from the figure in a confirmed Agreement, the Family is prompted to amend") is now readable as *RSVP drift triggers amendment prompts*, which is precisely the automatic behaviour FR-11 line 379 forbids. Fix: say "stated guest count" in FR-8 and FR-69, and in FR-69 state that only a Family's revision of the stated count triggers the prompt, never an RSVP.

**M-2. Admin-mediated account recovery is outside every audit rule in the document.** FR-1 line 238 creates it and records "what was done and by whom". But FR-61 line 1089 limits the attribution guarantee to actions that change "a Vendor's standing, a Listing's visibility, or published content", and NFR 5.7 line 1234 to "Agreements, Verifications, Reviews and Admin actions that change standing or visibility". Account recovery — the takeover of a passwordless identity by an internal staff member — is none of those, so the platform's strongest guarantee (attributable, not silently alterable) does not cover its most dangerous action. Fix: add identity actions to FR-61 and NFR 5.7's enumerations. Also unstated: what happens when the *new* number in a number change already belongs to an account (FR-1 says "one person is one account, and the mobile number is the identity"), and whether an Invited Member's FR-5 access — granted "to a mobile number" — survives that member changing their number.

**M-3. FR-6 was not updated for guest suggestions, and the share link has no stated owner.** FR-11 line 377 extends the suggestion mechanism from Listings to guests "exactly as they suggest Listings under FR-6" — but FR-6's own consequences (lines 286–287) still enumerate Listing suggestions only, and still list "guest list" among the things an Invited Member cannot change. Nothing states whether an Invited Member may create or share the self-service link (FR-11 says only that the Creator revokes it), which matters because sharing it is the action that exposes the surface.

**M-4. The zero-review rule reached the Listing display and stopped.** FR-19 line 503 is correct. But FR-18 line 492 still offers a **rating filter**, which at launch hides every Vendor — all of them paying subscribers — behind a filter they cannot satisfy, defeating FR-20's rotation rationale word for word ("without it whoever wins the first wedding compounds forever while the rest … receive nothing and leave"). And FR-20 signal 2 shrinks a rating "toward **the average for that Service in that Place**", a quantity that is undefined when no reviews exist anywhere — FR-57 states a five-Vendor floor for exactly this problem; FR-20 states none. Fix: FR-18 must say how the rating filter treats a no-review Listing (include, do not exclude); FR-20 must state the prior when the Service-Place average is unavailable.

**M-5. The Glossary still has no Wedding states.** `Wedding` (line 160) lists what a Wedding holds and not what it can be. FR-72 makes **in planning**, **concluded** and **abandoned** normative, and three other rules now key off them — FR-45's backstop, NFR 5.5's erasure clock (line 1211) and FR-11's link expiry (line 386). Carried over unfixed from round 3 (H-5); the two new dependencies raise it. §3 line 147 is explicit that FRs use Glossary terms verbatim.

**M-6. Portfolio allowance defined in FR-50, absent everywhere it is used.** FR-27 — the Portfolio FR — says nothing about a limit existing. FR-58's re-verification rule ("New portfolio images … are not publicly visible until Verification has covered them") does not say whether images that come back into publication after a Tier upgrade need re-Verification, nor which images publish when a downgrade truncates the set. NFR 5.9 lists subscription *prices* as a business input but not the allowance *numbers*, though FR-50 makes them exactly that.

**M-7. The cascade is stated once and cited never; and it orphans two bullets.** FR-59, FR-60 and FR-70 each create an exit and none references FR-53's cascade, so a builder implementing FR-70's self-withdrawal has no pointer to the Family-facing obligations. Structurally, the cascade is a bold paragraph dropped mid-list inside FR-53, after which two further bullets ("Nothing belonging to the Vendor is destroyed", "Reviews already published … remain published") resume — they read as belonging to the cascade rather than to FR-53's expiry list. Fix: promote the cascade to its own FR or a labelled sub-block, and cite it from FR-59/FR-60/FR-70.

---

## 5. LOW

**L-1. SM-6's growth channel now depends on an optional feature.** SM-6 calls itself "the only growth channel designed into the product" and measures "RSVP page visits per **published** Wedding". Making the guest list optional (FR-11) makes the entire channel opt-in, and the new form — which reaches more people, earlier — deliberately carries **no** growth route ("A submitter never sees … anything else about the Wedding"), where FR-12's RSVP page carries one by design. Worth an explicit decision. Also "published Wedding" borrows a verb the Glossary assigns to `Real Wedding` (FR-65); an Enquiry-stage Wedding is not published.

**L-2. FR-12 never states its dependency on the optional list.** The invitation flow is written as though a named list always exists. One sentence — "Where a Family has built a list" — closes it.

**L-3. FR-42's blameless-cancellation note is incomplete.** Line 812 says the count "now includes blameless date moves under FR-17". Abandonment (FR-72) and Rule-conflict cancellation (FR-32) also produce faultless cancellations and are not named.

**L-4. The §7.9 vocabulary carve-out is section-based where the real distinction is usage-based.** It exempts §7.1 and §7.9 only. Eight legitimate *prohibitive* uses sit outside those sections and will trip any automated sweep: lines 114 ("no guarantee the platform cannot honour"), 183 ("never underwritten"), 525 ("bans the escrow-era guarantees"), 813 (FR-41's central prohibition), 1227/1228/1230 (NFR 5.6), 1267 (an anti-example in quotes). Line 309's "without asking Rutuja to keep books" is a false positive of the same sweep. Fix: exempt negated and quoted uses, or mark them.

**L-5. Two new nouns have no Glossary entry.** `stated size` (FR-23) is a published field downstream must name and reference; the guest self-service form and its link are never given a term at all ("a short form and a link"), so every downstream artifact will invent its own name for a surface carrying personal data.

---

## 6. Quick pass results

- **FR IDs.** FR-1..FR-72 present, **no duplicates, no gaps, no dangling references.** Five FRs remain out of numeric order (FR-72, FR-68, FR-32, FR-71, FR-70, FR-69); §0 and the note at line 556 authorise this. Clean.
- **Banned vocabulary.** No genuine violation. Nine hits outside §7.1/§7.9 are prohibitions, negations, quoted anti-examples or the idiom "keep books" — see L-4 for the sweep-rule defect rather than a copy defect.
- **Glossary staleness.** `Guest` is now under-inclusive (H-2). `Sizing Attribute`'s enum is violated by the FR-71 table (C-2, H-5). `Delivery` contradicts FR-45 (C-1). Wedding states missing (M-5). `stated size` and the guest form missing (L-5). No Glossary term is unused: `Engagement Model`, `Amendment` and `Grace Period` — the three round-3 rescued — remain load-bearing in FR-14/FR-62, FR-69 and FR-53 respectively.
- **Carried over, unchanged since round 3 and outside this pass's remit:** FR-71's table makes Photography "per Function" while FR-45 anchors a photographer's Delivery on "the arrival of the album"; the catering recommendation still has no stated arithmetic or buffer.

## 7. Recommended order of fixes

1. **C-1** — one trigger statement in FR-45; Glossary and UJ-3 cite it.
2. **C-3** — same-account bar in FR-39 and FR-44.
3. **C-2 + H-5** — reconcile the Sizing Attribute enum across Glossary 180, FR-18 492 and the FR-71 table in a single edit.
4. **H-2 + H-3 + H-1** — widen `Guest`, bound pending submissions, revoke the link on abandonment, add the form to NFR 5.8 and give it FR-12's protections.
5. **H-4** — define an engagement instance in FR-14.
6. **H-6** — decide the fraud-removal carve-out.
7. Then M-1..M-7 as a sweep, checking each **against every consumer**, which is the step the last three rounds skipped.
