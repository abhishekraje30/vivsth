---
review: compliance
round: 3
lens: 'Regulatory, legal-posture and data-protection compliance for an Indian online intermediary that holds no money and is not a party to any engagement'
target: '_bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md'
prior_rounds:
  - 'reviews/review-compliance.md (round 1)'
  - 'reviews/review-closure.md (round 2 verification)'
driving_spec: '_bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/prd.md'
supporting: '_bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/research-india-regulatory.md'
reviewer: compliance reviewer (architecture-spine quality gate)
date: '2026-09-06'
verdict: 'CHANGES REQUIRED — AD-27..AD-34 are real work and close six round-1 CRITICALs outright, but six of the seven findings review-closure.md recorded as NOT CLOSED are still not closed, the seventh only in wording; and the revision has added a Deferred paragraph asserting the opposite.'
---

# Compliance Review (Round 3) — ARCHITECTURE-SPINE.md

## Verdict

**The spine is now a genuinely compliant *design* and still not a compliant *architecture*, and the gap between those two is narrower than it was and in one place has been papered over.**

AD-27 through AD-34 do real work. AD-27 is the correct fix for my round-1 root cause and it is load-bearing; AD-29's three-gate media rule with a demotion path is better than what I asked for; AD-30 and AD-33 turn two whole silent dimensions into first-class records; AD-34 kills the Razorpay-Subscriptions misreading outright. Six round-1 CRITICALs are dead.

Three things stop this being a pass.

**First, the closure profile has not moved.** `review-closure.md` recorded seven of my CRITICAL/HIGH findings as NOT CLOSED. Six are still not closed — C-3.2 (breach), C-3.3 (Desk reads Guest contacts unlogged), C-3.5 (Guest as a data class), C-4.2 (digest over an artefact nobody holds), C-4.3 (clock), C-4.4 (certificate inputs) — verbatim, with no text added. The seventh, C-1.2, was repaired in wording only: NFR 5.6 is cited again and AD-10 now says the function "returns an attributed signal, never a boolean a caller can relabel", but the signal has no fields, AD-4's generated contract is not bound to it, and enforcement is still "review (tier 3)". The revision between round 2 and round 3 fixed a citation and left the mechanisms.

**Second, the revision reproduced the defect it was written to fix.** My round-1 root cause was: rules that must bind Admin were enforced where Desk does not go. AD-27 states the remedy precisely. The two new ADs that carry the statutory record-keeping — AD-32 (consent, the basis per datum) and AD-33 (grievance, takedown, the repeat-infringer register) — are enforced by *"schema review of any new personal-data field (tier 3)"* and *"review (tier 3)"*, and none of their records appear in AD-27's named list. Consent records, grievance records and takedown records are Desk-editable by every Admin. A consent record an Admin can write is not evidence of consent; a takedown log an Admin can edit is not the FR-63 log. AD-34 got this right and got a tier-1 controller guard. AD-32 and AD-33 did not.

**Third, and most consequential for everything below: the spine now tells its own reader the reviews are closed.** The Deferred section says *"The second round closed every critical and structural finding, and left a tail — chiefly in `review-compliance.md` and `review-adversarial.md` — of medium findings about FR-52's tax and invoice-numbering detail, per-AD `Binds` accuracy, and rules stated in two ADs at once."* `review-closure.md`, in the same directory, opens with *"17 of 43 CRITICAL/HIGH findings closed, 12 partially, 14 not closed; the revision introduced 8 new defects, two of them structural."* The paragraph is not a summary of the reviews, it is a contradiction of them, and it is the paragraph every downstream agent will read instead of the reviews. Fourteen open CRITICAL and HIGH findings — including the entire breach dimension and the entire evidential-artefact cluster — have been reclassified as a medium tail by assertion. This is the single most damaging line in the document, because it is the mechanism by which everything else on this list gets lost.

Severity: **CRITICAL** (posture-breaking, statutorily non-compliant, or not retrofittable), **HIGH** (statutory obligation with no architectural home), **MEDIUM** (real gap, retrofittable), **LOW** (clarity).

---

## Round-3 status at a glance

| # | Area | Round 1 | Round 3 | Movement |
|---|---|---|---|---|
| 1 | Non-party posture (NFR 5.6, FR-41, §7.1, §7.2) | PARTIALLY | **PARTIALLY COVERS** | Real gain (AD-27, AD-34); attribution repaired in words only |
| 2 | Intermediary obligations (FR-63) | DOES NOT | **PARTIALLY COVERS** | Largest single improvement in the document |
| 3 | Data protection (NFR 5.5) | PARTIALLY | **PARTIALLY COVERS** | Consent modelled; breach, Desk reads and the Guest data class untouched |
| 4 | Evidential records (FR-43) | PARTIALLY | **PARTIALLY COVERS** | Hash chain + AD-27 are a genuine gain; the cluster that decides admissibility is untouched |
| 5 | Guest data and consent (FR-11, FR-12, UJ-5) | PARTIALLY | **PARTIALLY COVERS** | AD-30 closes the authorization model; the data class and the two provenances do not exist |
| 6 | GST and billing (FR-52, FR-54) | DOES NOT | **PARTIALLY COVERS** | AD-34 states every rule and names no mechanism for any of them |
| 7 | Accessibility (NFR 5.8) | DOES NOT | **DOES NOT COVER** | One conventions row; it asserts more than the platform can deliver |

---

## 1. Non-party posture — NFR 5.6, FR-41, PRD §7.1, §7.2

**PARTIALLY COVERS.**

### What closed

- **AD-27's last clause** — *"The platform authors no Agreement terms (FR-41) — so no Agreement term field carries a Frappe `default`, and a Property Setter adding one is a defect, not configuration"* — is the rule I asked for, in the right place, and it is the strongest single sentence added in round 2. `[C-1.1 partially closed]`
- **AD-34** states the money bar as an invariant rather than a parenthetical (*"no money moves between a Family and a Vendor, ever"*), and the Razorpay ambiguity is dead in three places at once — AD-34, the Stack's unpinned list, and a new Conflicts row correcting Tech-Stack §4. `[C-6.4 CLOSED]`
- **AD-22** now carries *"Featured placement is a separate marked band, never inside the organic ordering."* `[C-1.3 partially closed]`

### Findings

**C-1.2 — Availability-as-attributed is repaired in wording and still not enforced. `[STILL OPEN from round 1 — HIGH]`**

Round 2 deleted the attribution clause; round 3 restored it and improved it. AD-10 now ends: *"No surface ever asserts availability as fact… The function returns an attributed signal, never a boolean a caller can relabel."* NFR 5.6 is cited again. That is the right rule.

It is not enforced. Three things are missing, and all three were in the round-1 finding:

1. **The signal has no shape.** "An attributed signal" is a phrase, not a type. Nothing says what fields it carries. `{state, attributed_to, as_of}` was the proposal; any three fields would do. Without fields there is nothing for a client to be unable to relabel.
2. **AD-4 is not bound to it.** The whole point of generating zod from the annotated Python signature is that a shape a client cannot bind to is a shape a client cannot render wrong. AD-10's Enforced-by is *"the single call site is the check; review (tier 3)"* — the same tier-3 enforcement I flagged in round 1. AD-4 is named nowhere in AD-10 and AD-10 is named nowhere in AD-4.
3. **The enforcement claim is still false.** "The single call site is the check" guarantees one *answer*. It guarantees nothing about three independently-built clients rendering it, which is the failure NFR 5.6 describes and the only failure that matters.

This is a one-line fix with a real mechanism behind it: state the fields, and say in AD-4 that `contract/family.v1.json` carries no boolean-availability variant. Do it before `api/family/v1` freezes (AD-3), because after that it is a `v2`.

**C-1.1 — The no-platform-terms rule covers Agreements and not Quotes. `[STILL OPEN from round 1 — HIGH]`**

FR-39: *"A Vendor proposes terms from the Enquiry thread: the days and Slots, the Space or offering, the guest count, the all-in price, what is included, the delivery timeline from their Commitment, and the Rules that apply."* The Quote is where every term is first authored. AD-27 binds only *"Agreement term field"*. A pre-filled default on a Quote field is the platform proposing terms in the one place a Vendor is actually composing them — and by the time it reaches the Agreement it is the Vendor's own value, indistinguishable and unguarded.

Amendments have the same hole: AD-12 makes an Amendment a `seq+1` append of the same term set, so if the Amendment form carries a default, so does the amended Agreement.

Second half of the round-1 finding, also still open: **enforcement**. AD-27's Enforced-by is *"controller guards (tier 1)"*. A controller guard fires when a document is saved. A Property Setter is set from Desk and saves no Quote, so no controller runs, and the defect sits in the metadata until the next Vendor opens the form and inherits it. AD-5 already has the pattern this needs — *"A Service whose handler is missing or fails the interface check fails at **startup**, not at request time."* The same startup assertion over `Property Setter` rows targeting `default` on the enumerated term fields makes this tier 2 for the cost of a for-loop.

**R3-1 — AD-8's Admin-editable "pricing model" and AD-27's no-platform-terms rule have no stated boundary. `[NEW in round 3 — MEDIUM]`**

AD-8 lists *"pricing model"* among the Service-row declarations *"Admin-editable data … changed with no code release"*, which the handler reads. AD-27 forbids the platform supplying a value on an Agreement term — and price is the first term FR-39 names.

Those two are compatible only under a distinction neither AD draws: a pricing *model* declares **how the Vendor's own numbers combine** (per head × stated guest count; per day × days), and never supplies a number. Nothing says that. An Admin who can edit the pricing model without a release, and a handler that reads it, is one configuration change away from a Service whose Quotes arrive with a platform-computed figure in the price field — which research §4.4 and R44 put on the *Louboutin* active-participant side of the line, and which no gate in this document would see, because the number would be computed at request time by a handler, not stored as a `default`.

**One sentence in AD-8:** a pricing model declares the arithmetic that combines a Vendor's declared rates; it never supplies a rate, a total or a floor, and no handler returns a suggested price the Vendor did not author.

**C-1.3 — The Featured band is separated in prose, not in the response. `[STILL OPEN from round 1 — MEDIUM]`**

AD-22's new sentence is the right rule and does not reach the wire. The response is still free to be one merged array with a `featured: true` flag, which three clients will interleave three ways, and the paid-placement label is still a client-side decoration rather than a required non-empty field. Research R13 requires the label on the card, on every surface, at the smallest viewport, in both themes; NFR 5.5 lists disguised advertisement among the dark patterns it forbids. Two disjoint collections in the contract makes it tier-1-by-shape, which is where AD-4 already puts everything else that crosses to three clients.

**C-1.4 — The money bar is words; the import restriction and the ERPNext question are unanswered. `[STILL OPEN from round 1 — MEDIUM]`**

AD-34's *"no money moves between a Family and a Vendor, ever"* is the correct statement of the constraint and has no enforcement clause. The realistic failure was never a decision to take commission; it was installing ERPNext for FR-52's invoicing and thereby installing Payment Entry, Sales Invoice-against-Customer and a ledger that will record a Family-to-Vendor settlement. `ERPNext` appears **zero times** in the spine, and AD-19 still leans on *"print formats, reports and FR-52's GST invoicing work natively"* — a sentence that reads as a reason to install it.

Two lines: the payment module is importable only from the Subscription handler, enforced by the same import lint AD-1 needs; and state whether ERPNext is installed, and if it is, that no accounting document may reference a Family.

---

## 2. Intermediary obligations — FR-63

**PARTIALLY COVERS.** From DOES NOT COVER — the largest improvement in the revision.

### What closed

- **AD-33** makes a grievance a first-class record with a quotable reference, reachable without a login from every surface, carrying acknowledgement, seven-day disposal, and the 36-hour / 3-hour / 72-hour clocks. `GRIEVANCE` and `TAKEDOWN` are in the ERD; the Capability map has a row. `[C-2.1 CLOSED]`
- **Takedown is its own axis**, never cleared by re-verification, carrying ground, authority and acting Admin — and **AD-29 makes it bite at the storage layer**, which is more than I asked for: *"demotion moves it out, with CDN invalidation, inside AD-33's SLA; neither is a flag flipped beside an already-public URL, because a flag does not stop a court-ordered image being served from cache."* That sentence is the difference between a 3-hour capability and a 3-hour intention. `[C-2.2 CLOSED, well]`
- **The quarterly advisory** is AD-23's twelfth entry, named. `[C-2.5 CLOSED]`
- **AD-30** gives the no-login intake a lawful home among the three named unauthenticated surfaces. `[ND-12 closed]`
- **AD-23's 180-day purge** now exists as a job. `[part of C-2.3 closed]`

### Findings

**R3-2 — The FR-63 records are enforced at tier 3, in a document that has AD-27. `[NEW in round 3 — CRITICAL]`**

AD-33's Enforced-by is **"review (tier 3)"**.

FR-63: *"Every removal is logged with its ground, its authority and the Admin user who acted."* FR-61: an audit entry *"cannot be erased"*. AD-1 puts Frappe Desk directly on the DocTypes and FR-61 gives every Admin every capability. So the grievance record, its SLA timestamps, the takedown's ground and authority, and the repeat-infringer register are all editable and deletable from Desk by the same Admin whose action they exist to attribute.

That is precisely the class of hole AD-27 was written for — its own Prevents says so: *"a rule enforced in an `api/` guard while AD-1 puts Frappe Desk directly on the DocTypes and FR-61 gives Admin every capability, so Desk walks straight past it."* AD-33 says its takedown *"is recorded per AD-27"*, which gestures at the mechanism without invoking it: AD-27's named list contains Agreements, Reviews, listing conditions, confirming parties, audit entries and Agreement terms. It does not contain grievances, takedowns, SLA clocks or the register.

The consequence is not abstract. The FR-63 record set is the evidence that the s.79(2)(c) due diligence was observed — and E-Commerce Rule 5(1) makes that safe harbour a condition of the consumer-law position, which is what the whole non-party posture in section 1 rests on. A due-diligence log the operator can rewrite proves the opposite of what it is kept for.

**Add to AD-27's named list, and change AD-33's Enforced-by to match:** a grievance's received-at, acknowledged-at and disposed-at are set once and never updated; a takedown's ground, authority and actor are immutable and the row cannot be deleted; a repeat-infringer entry cannot be removed.

**R3-3 — AD-23's new 180-day purge job has no legal hold, and will destroy material a court told the platform to preserve. `[NEW in round 3 — HIGH]`**

The revision created the job I asked for. IT Rules 3(1)(g) requires preservation for 180 days *"or such longer period as may be required by the court or by government agencies"* — and the whole reason content is under takedown is that somebody official asked. AD-23 says only *"AD-33's 180-day purge of removed content"*, and AD-31 makes every job idempotent, which guarantees it runs cleanly and deletes the evidence exactly once.

This is worse than the round-1 state. In round 1 the erasure job would have destroyed takedown evidence by accident, as a collision between two rules. Now there is a job whose *stated purpose* is to destroy it on a fixed clock, with no mechanism to stop it.

**Add:** a takedown record carries a hold flag with the authority that set it and no expiry; the purge job skips any record under hold and logs the skip; releasing a hold is an AD-27-bound, attributed act. And say in AD-33 that the 180 days runs from removal, is a floor and not a ceiling, and never runs while a hold is set.

**R3-4 — AD-33's "retention wins" is stated as a blanket and collides with AD-14's erase-outright rule for Guest contacts. `[NEW in round 3 — HIGH]`**

See §"Is AD-33 correct under Indian law?" below for the legal reading. The architectural point: AD-33 says *"Removed content and its records are retained **180 days** after removal, and where that collides with an erasure request, **retention wins**"* with no scope. AD-14 says Guest contact details are *"erased outright"* — 30 days after conclusion, immediately on abandonment, immediately on dismissal — and NFR 5.5 is explicit that Guests *"are not retained for the Agreement retention period"*. Research R80 says the retention basis *"must **not** extend to the guest list, which has no such justification."*

A guest list can come under takedown: FR-63's removal axis applies at the item level and AD-33 lists *"guest list"* nowhere but AD-29 and the round-1 finding both contemplate it, and a grievance about a forwarded guest form is a realistic complaint. Under AD-33 as written, retention wins and six hundred households' numbers are held for 180 days past the purpose that justified collecting them. Two ADs, two answers, no precedence — which is the exact defect AD-33 was written to remove for the Agreement case.

**Add to AD-33:** the 180-day retention applies to content that was removed under FR-63 and to its removal record; it does not extend the life of personal data whose purpose is exhausted and which was not itself the removed content. Where a guest list is the removed content, what is preserved is the takedown record and the fact of removal, and the contacts are erased on AD-14's clock.

**C-2.4 — The repeat-infringer register still cannot link what it exists to link. `[STILL OPEN from round 1 — HIGH]`**

AD-33 keys the register on AD-14's token, and AD-14 now closes with *"The token is **stable per person**, so FR-63's repeat-infringer register survives erasure."* That sentence asserts the conclusion and does not reach it.

Walk it: AD-28 says *"The mobile number is the identity and one person is one account."* A Vendor is removed under FR-60, requests erasure, and AD-14 *"replaces the identifying fields there with a stable non-identifying token"* — the number among them. The number is now free. He registers again on the same number, and AD-28 mints a **new** account, a new `PERSON`, and therefore a new token. The register holds the old token; nothing connects it to the new one. Research R20/E-Commerce Rule 5(5) requires the identity to *"survive account deletion and re-registration"*, and this one survives deletion and not re-registration — which is the half that matters, because the fraudster chooses when to re-register.

The fix is unchanged from round 1 and is small: a salted one-way hash over a re-registration-invariant identifier (the phone, and for Vendors the PAN/GSTIN), computed at registration, **retained through erasure as an explicit second exception in AD-14**, used as the register key. A digest honours erasure — the identifier is unreadable — while preserving exactly the linkage the Rule requires.

**R3-5 — The two statutory acknowledgement clocks are still collapsed into one. `[STILL OPEN from round 1, sharpened — HIGH]`**

AD-33 says *"carrying its acknowledgement, its disposal within seven days"* with a clock on disposal and none on acknowledgement. There are two clocks on two statutes and they run against different complainants:

- **IT Rules 3(2)(a)**: acknowledge a grievance within **24 hours**, dispose within 15 days (the PRD's 7 days is stricter, which is fine).
- **E-Commerce Rules 4(5)–(6)**: acknowledge a consumer complaint within **48 hours**, redress within **one month**.

A photographer whose portfolio was lifted, a person defamed in a review, and a Vendor complaining about a charge are three complainants on two tracks, and the record has one field. AD-33 needs the statutory track as a field on the grievance, with the acknowledgement clock derived from it — otherwise AD-23's timers have one due-at to count toward and will be set to whichever the implementer read first.

**C-2.3 — "Removal is a state transition, never a delete" is still not stated, and AD-14's ladder still does not carry the 180 days. `[STILL OPEN from round 1 — MEDIUM]`**

Half of this closed: AD-33 states the precedence and AD-23 has the job. The other half did not. AD-14's precedence ladder still reads *"consent-based data is erased; engagement records and legally-required records are pseudonymised and retained"* with no FR-63 entry beside the Agreement, Review and audit-log retentions — so an implementer reading AD-14 alone, which is the AD the erasure story lives in, will not find the takedown exception. And nothing anywhere says the removal is a state change rather than a delete, which is the natural implementation in a document store and the one that makes the 180 days unmeetable.

**C-2.6 — The FR-64 ranking disclosure has no home. `[STILL OPEN from round 1 — MEDIUM]`**

AD-33 closed the grievance-officer half: *"reachable **without a login** from every surface."* The other two public disclosures did not move. `FR-64` and the string `disclosure` appear **zero times** in the spine. FR-64 requires the organic-ranking parameters published in plain language and *"reachable by any Family"*, and research R12 wants the "we do not process payments, and here is why" statement public. Both are no-login routes on a public surface, which makes them a routing decision in the shared layer, not app copy — and AD-22 is the AD that knows what the parameters are.

**C-2.7 — Hosting is still not regulatorily constrained. `[STILL OPEN from round 1 — MEDIUM]`**

`India` appears once in the spine (regional language, in Deferred). `NTP` and `region` appear zero times in a hosting sense. The Deferred entry lists what waits on the hosting decision and does not list what constrains it: CERT-In directions require **180 days of ICT logs retained within India** and **NTP synchronisation to NIC/NPL** (research R22), and the same decision carries the 6-hour incident-reporting capability (R3-8 below). *"Choose before the first deploy"* should read *"choose from India-region, log-retaining, NTP-disciplined options, before the first deploy."*

---

## 3. Data protection — NFR 5.5

**PARTIALLY COVERS.** AD-32 closes the largest round-1 hole and leaves the three I flagged as not-closed untouched.

### What closed

- **AD-32** records the basis per datum, captures consent per purpose with what and when, makes withdrawal as easy as granting, propagates withdrawal to what was derived from it (FR-66), and states the right of a person who never held an account. `CONSENT` is in the ERD. This is the finding whose absence made AD-14's whole ladder undecidable, and it is now decidable. `[C-3.1 CLOSED]`
- **AD-30** gives the rights surface an endpoint home. `[ND-12 closed]`

### Findings

**R3-6 — AD-30's blanket rule forbids AD-32's rights surface from doing the thing it exists to do, and nothing supplies the missing identity proof. `[NEW in round 3 — CRITICAL]`**

AD-30 opens: *"**Every** `allow_guest=True` method on the platform … returns only fields that are **safe to show an unauthenticated caller**."* It then names, as one of the three unauthenticated surfaces it governs, *"AD-32's see-and-correct surface for people who never held an account."*

Those two clauses cannot both hold. NFR 5.5 requires that *"Every person whose data is held can see it and correct it, including people who never held an account"* — a surface whose entire output is that person's own personal data, which is by definition not safe to show an unauthenticated caller. The spine names the surface, applies a rule that forbids its output, and specifies **no identity-proof step anywhere**: `identity proof` appears zero times, and AD-28's OTP machinery is named only for sign-in.

An implementer facing a contradiction resolves it, and both resolutions are wrong:

- Obey AD-30 and return nothing useful — NFR 5.5's right, DPDP ss.11–13, and research R36 all fail silently, and nobody notices because the endpoint exists and returns 200.
- Obey AD-32 and return what is held about a submitted phone number — and the platform now has a **no-login enumeration oracle over every Guest, Family and Vendor on it**, rate-limited per IP and nothing more. Guest contact data, which FR-61 confines to those with an operational need and which DPDP Rule 6 requires access-controlled, becomes readable by anyone who can type a number. That is a worse outcome than the surface not existing, and it is what AD-30's own rate-limiting clause will be read as authorising.

**Add, and it is small:** the rights surface proves control of the identifier the request concerns before it discloses anything — an OTP to that number, reusing AD-28's issuance and its rate limits — and AD-30's "safe to show" clause carves out surfaces gated by proof-of-control rather than by login. State that a request that fails proof returns the same response as one for a number the platform does not hold, so the endpoint is not an existence oracle either. And name erasure alongside access and correction: NFR 5.5 lists Guest contacts among what is *"erasable on request"*, and AD-32 offers only "see and correct".

**C-3.2 — Breach: still the requirement restated, with no mechanism and no entity. `[STILL OPEN from round 1 — CRITICAL]`**

AD-32's last sentence is unchanged: *"A personal-data breach is detectable and reportable within 72 hours."* Its Enforced-by is *"schema review of any new personal-data field (tier 3)"*, which cannot produce detection, cannot produce a report, and cannot produce an affected-principal set.

`incident` appears zero times in the spine. There is no `BREACH` or `INCIDENT` entity in the ERD — the revision added `CONSENT`, `GRIEVANCE`, `TAKEDOWN` and `INVOICE`, which were the entities the round-1 findings named as nouns, and did not add the one whose finding named a capability instead.

Three quarters of breach response is operational and belongs outside a spine. The quarter that is architecture has not moved: **you cannot notify affected people in 72 hours if nothing can enumerate who was affected.** That requires access logging on personal-data reads and a queryable link from a compromised surface to the set of persons it exposed — and it is the same logging C-3.3 needs, which is why the two findings should be closed together.

**R3-7 — AD-32 collapses three breach clocks into one, and the shortest is six hours. `[NEW in round 3 — MEDIUM]`**

"72 hours" is the DPDP Board report. It is not the whole obligation:

- **DPDP Rule 7**: intimate each **affected Data Principal without delay** — before the Board report, not after it, and per person rather than per incident.
- **DPDP Rule 7 / s.8(6)**: the detailed report to the Board within **72 hours**, with facts, causes, mitigation, responsible parties, preventive steps and a summary of the notifications sent (research R39).
- **CERT-In Directions 28.04.2022**: report specified cyber incidents within **6 hours** of noticing (research R22).

Six hours is an availability requirement on a person and a channel, and it constrains the hosting and on-call decision that Deferred leaves open. One clock in the spine will produce one timer.

**C-3.3 — Desk still gives every Admin unrestricted, unlogged reads of Guest contacts, and the conflict is still not recorded. `[STILL OPEN from round 1 — CRITICAL]`**

Verbatim unchanged since round 1. `permlevel` appears **zero times**. The Logging convention row still reads *"every Admin action **changing** standing, visibility, published content or account access is attributed"* — reading is none of those, and the row's own verb is the gap. The Conflicts table has no FR-61 row. The Capability map's Guest-surfaces row cites AD-3, AD-14, AD-21, AD-30 and AD-32, and no access-control AD.

FR-61 is explicit and self-contradicting, and the architecture has silently chosen one side: *"No capability is withheld from an Admin user by role"* and, four lines later, *"Access to Guest contact data is confined to those with an operational need, and is logged."* DPDP Rule 6 requires the same. This is the one place where the spine's architecture directly contradicts a stated PRD consequence, and the honest move — which the spine already makes for AD-5-vs-FR-62 — is to record it upstream rather than resolve it silently.

Three concrete pieces, unchanged from round 1: put Guest contact fields at a `permlevel` above 0 so a Desk role gate exists at all; write a read-access log on every open and every list read that materialises contact fields; record the FR-61 tension in Conflicts. And note in AD-16 that `frappe.db.get_value` and `frappe.db.sql` sit below the permission layer *"entirely"* — its own words — so any read path built with them defeats both the permlevel and the log.

**C-3.5 — Guest is still not a data class, and AD-14's opening sentence still sweeps Guests into `PERSON`. `[STILL OPEN from round 1 — HIGH]`**

AD-14 still opens *"No record copies a person's name or number; every record references one person record."* Read literally — and an implementer will read it literally, because it is the rule's first sentence and it is absolute — a Guest's number becomes a `PERSON` row, at which point AD-14's erase-outright rule for Guests and its pseudonymise-and-retain rule for everyone else are two contradictory policies on one table, and AD-32's basis field is the only thing distinguishing them.

The sharper half also has not moved: nothing forbids **reconciling a Guest's phone number against `PERSON`**. "This guest is already a user"; "this guest's number matches a Vendor"; "how many of last season's guests came back". Each is audience-building from data collected for a single stated purpose — the DPDP s.6(1) breach FR-12 exists to prevent (*"never used to build an audience"*) — and each is a one-line join that no rule in this document prohibits and no reviewer would flag, because it looks like a feature.

FR-12's growth path is the tell that this must be explicit: a Guest who starts their own Wedding works by that Guest **signing up fresh and consenting directly**, never by the platform recognising them. State it: Guest is a data class of its own, scoped to one Wedding, never deduplicated across Weddings, never joined to `PERSON` for any purpose. Amend AD-14's opening sentence so it does not claim Guests. Make the no-join rule a checklist item on any query touching the Guest DocType.

**R3-8 — AD-32 records what was consented to and not the notice it was consented under. `[NEW in round 3 — HIGH]`**

AD-32: *"Consent is captured per purpose with what was consented to and when."* DPDP s.6(1) requires consent to be **informed**, and s.5 requires an itemised notice given at or before collection — which research R30 says must be presented *independently of the T&Cs*, covering the data, the purpose, how to withdraw, how to exercise rights and the route to the Board.

A consent record that stores the purpose but not the **version of the notice in force when it was given** cannot demonstrate the consent was informed, which is the only thing a consent record is for. Notice text will change — it must, because R80 requires the eight-year Agreement retention to be *stated in the notice*, and that sentence does not exist yet. When it changes, every consent taken under the old text becomes unattributable to any text at all.

`notice` appears zero times in the spine in this sense; there is no `NOTICE` entity beside `CONSENT` in the ERD. **Add:** the notice is a versioned, immutable record; a consent stores the notice version it was given under; a notice version is never edited (AD-27). This is cheap now and unreconstructible later, in exactly the way C-4.4's certificate inputs are.

**C-3.6 — No security-safeguard invariant. `[STILL OPEN from round 1 — MEDIUM]`**

`encryption` and `at rest` appear zero times. DPDP Rule 6 requires reasonable security safeguards including encryption for personal data; research R37 names the contact table specifically; R38 requires processing logs retained ≥1 year. Neither is in the spine. The first lands on the hosting decision, the second is a retention rule that belongs beside AD-23's list — and the second is also half of what C-3.2 needs to enumerate an affected-principal set, so it is not a separate cost.

**C-3.7 — Nothing pre-ticked has no architectural home. `[STILL OPEN from round 1 — MEDIUM]`**

NFR 5.5 carries it explicitly: *"No dark patterns… Paid placement is labelled. Nothing is pre-ticked. Cancelling is as easy as starting."* Research R23 grounds it in Rule 4(9) and DPDP s.6(1). `pre-tick` and `dark pattern` appear zero times.

This is a three-client contract of exactly the kind AD-24 already handles for vocabulary: a checkbox in the Expo app, a checkbox in the vendor portal and a checkbox on the guest form, three teams, three defaults. One rule fixes it — no consent control ships with a checked default, and consent controls come from `packages/shared` — and it is a lint away from tier 2.

---

## 4. Evidential records — FR-43

**PARTIALLY COVERS.** The record is now materially harder to tamper with and no closer to being admissible.

### Is AD-12 evidentially useful now, given the hash chain and AD-27's controller guard?

**More useful, and not yet sufficient — and the distinction is precise.** The chain plus AD-27 protect the record's **internal** integrity: an Admin editing a row in Desk is stopped by the controller, and an edit made beneath the controller with `db.sql` breaks the chain and is detected by AD-23's new sweep. That is a real gain over round 1, where "no update path in code" was an enforcement claim that Desk falsified.

What neither does is connect the record to **the document a court will be handed**. Three gaps, and they are the same three from round 1:

**C-4.2 — The digest is still over a serialisation nobody holds a copy of. `[STILL OPEN from round 1 — CRITICAL]`**

`PDF` and `artefact` appear **zero times** in the spine. AD-12 still digests *"the serialised frozen terms verbatim"*. FR-40 gives both parties a downloadable copy, rendered — on the current text — from whatever print format exists at download time.

So in year eight there are two artefacts and neither verifies the other: the stored serialisation, of which no party holds a copy and which no party ever saw; and the copy in evidence, re-rendered from a template that has moved, whose hash will not match. Research R74/R75 track BSA Schedule Part B and are unambiguous: SHA-256 of the **canonical rendered artefact**, freezing *"the exact rendered artefact each party saw, not the current template"*, because *"a hash computed later, from a re-render, proves nothing."*

The certificate AD-12 promises to generate would then attest a correspondence that does not hold — which is worse than no certificate, because it is an assertion the production party makes and cannot support.

**Add:** freeze the rendered artefact at confirmation (PDF/A), store it immutably beside the serialisation, digest **that**, serve **that** for FR-40's download rather than re-rendering, and log that each party took their copy. Keep the serialisation — it is the right schema-independent fallback and AD-12's best original insight — but the digest of record must be over the thing a party can produce.

This is the one finding in the document that is genuinely not retrofittable. Every Agreement confirmed before it lands is permanently in the unverifiable state, and there is no later fix.

**C-4.3 — The clock, and a deferral now justified by something orthogonal to it. `[STILL OPEN from round 1, worsened — HIGH]`**

Is the server clock defensible? **Literally yes, evidentially no**, and the revision has made the deferral harder to reopen.

FR-43 says *"not from a device clock"*, and a server clock satisfies that on its face. Everything that would make it stand up is absent: `NTP` and `UTC` appear **zero times**; the Conventions row still says only *"Asia/Kolkata"* where research R77 requires storing UTC and displaying IST; and there is no uptime, incident or deploy record to support BSA s.63(2)(c)'s assertion that the system *"was operating properly throughout the material period"* (research R81's quarterly signed attestation).

The Deferred entry now reads: *"Server clock satisfies FR-43's 'not from a device clock' literally, and **AD-12's hash chain makes tampering detectable**. … Trigger: the first time an Agreement record is needed as evidence."*

The new clause does not support the conclusion. **A hash chain proves ordering and integrity; it proves nothing about time.** Chaining a timestamp from an undisciplined VM clock makes a wrong timestamp tamper-evident, not correct — and a confirmation timestamp that precedes the proposal it accepts, which minutes of drift will eventually produce, is worse than no timestamp because it is affirmatively contradicted by the record it sits in. The chain has been used to justify keeping a deferral it is orthogonal to.

And the trigger is still structurally unfireable, which was the round-1 finding and is unrebutted. On the day an Agreement is needed as evidence, that Agreement was timestamped years earlier by whatever the system did then; adopting an RFC 3161 authority at that moment improves nothing about the record in dispute. **A deferral whose trigger cannot fire usefully is a decision.** Record it as one — "we accept a server clock for the life of the product, with these disciplines" — and name the disciplines: NTP to NIC/NPL, UTC storage, and an operating-properly record retained for the eight years.

**C-4.4 — The certificate's inputs are still not captured, while AD-12 still promises the certificate. `[STILL OPEN from round 1 — HIGH]`**

AD-12's snapshot gained the previous row's digest in round 2 and nothing since. It stores: serialised terms, their digest, the previous digest, a server timestamp. It still asserts *"FR-43's certificate is generated from these rows."*

It cannot be. BSA Schedule Part A, via research §8.4 and R79, requires identification of the record, **the manner of its production**, **particulars of the devices involved**, and the s.63(2)(a)–(d) matters; *Arjun Panditrao* makes the certificate mandatory for secondary electronic evidence, so without it eight years of retention buy nothing. Device particulars and manner of production are **contemporaneous facts** — in 2034 nobody can reconstruct which host, which app version and which deploy produced a 2026 row unless 2026 wrote it down.

**Add to the snapshot:** app/deploy version, host identity, terms/format version in force, and the custodian of record at the time (FR-43's named individual is a 2026 fact when a 2034 certificate needs it). Research R76's list is the right target. Then AD-12's claim becomes true.

**R3-9 — The hash chain does not detect truncation, and `on_trash` is still unguarded. `[NEW in round 3 — HIGH]`**

Round 1 asked for two controller guards. AD-27 delivered one — *"its record rows cannot be updated"* — and not the other. `on_trash` and `delete` appear zero times in this sense.

This is not redundant with the chain, and the reason is specific. A chain detects edits and **interior** deletions, because the next row's stored previous-digest no longer matches. It does not detect **tail truncation**: delete the last `Agreement Record` row and every remaining link still verifies, and AD-23's new chain-verification sweep passes cleanly.

Under AD-12, an Amendment is `seq+1` and *"the Agreement's current terms are the latest confirmed version"*. So deleting the tail **silently reverts the Agreement to the previous terms**, with an intact chain, a passing sweep, and no trace. That is not a theoretical attack: it is the single most attractive edit anyone would ever want to make to this table, and it is the one the current design does not see.

**Add:** `on_trash` throws unconditionally on `Agreement Record` (append-only with a delete path is not append-only); the sweep verifies the chain **and** that the highest `seq` present matches the Agreement's recorded count, so a missing tail is a mismatch rather than a shorter valid chain.

**C-4.1 residual — `db.set_value` / `db.sql` are still not forbidden on evidential DocTypes. `[STILL OPEN from round 1 — MEDIUM]`**

AD-16 states that these *"sit below the permission layer entirely and check nothing"* and does not say where they may not be used. AD-27 uses controllers, which they bypass. The chain downgrades this from undetectable to detectable-after-the-fact, which is why it is MEDIUM now and not CRITICAL — but naming the evidential DocTypes in AD-16 is one sentence and `check_whitelisted.py` could enforce it.

**C-4.5 — Custodian of record. `[STILL OPEN from round 1 — LOW]`** Fold into C-4.4's snapshot; a dated custodian register is the minimum.

**C-4.6 — CLOSED.** AD-23 now carries both the chain-verification sweep and the eight-year retention expiry.

---

## 5. Guest data and consent — FR-11, FR-12, UJ-5

**PARTIALLY COVERS.** The authorization model closed well; the data model did not.

### What closed

- **AD-30** promotes the whole guest-link model to an AD with per-clause enforcement: unguessable, revocable, expiring tokens; per-token and per-IP rate limits; a fixed DocType never from input; a token that *"addresses exactly one Guest of one Wedding and cannot be altered to reach another"*; a response limited *"by the method's return shape, not by what the page chooses to render"*; `noindex` served as a **response header**; and guest-form submissions arriving as suggestions the Creator accepts or dismisses. `[C-5.1, C-5.2, C-5.4 CLOSED]`
- **AD-23** carries guest-link expiry on conclusion or abandonment as its own job. `[C-5.3 CLOSED]`

That is a good AD. Three residuals and two new findings.

### Findings

**R3-10 — Guest data has two provenances on entirely different legal footings, stored as one class with one basis. `[NEW in round 3 — HIGH]`**

FR-11 draws the distinction and the spine does not carry it: *"People who enter their own details are consenting to Vivah Spot directly, **which is a stronger footing than a Family uploading numbers on their relatives' behalf.**"*

The research is blunt about how much stronger. On family-uploaded contacts, s.7(a) — data *"voluntarily provided by the Data Principal"* — **does not fit**, because *"the guest did not provide her number to Vivah Spot; the family did"*, and no other s.7 limb applies. Research §290's conclusion: *"On a strict reading, Vivah Spot needs each guest's consent before it processes that guest's contact — which is impossible to obtain before the first message."* On self-submitted contacts, the guest gave it directly and s.7(a) or consent fits cleanly.

One `GUEST` DocType, one AD-32 basis field, two footings. The mitigations differ too: research R31 requires *"an explicit, **non-pre-ticked** family attestation of permission to invite each contact"* at guest-list upload, which applies only to the uploaded path and appears nowhere in the spine.

**Add:** the Guest record carries its provenance — family-supplied, member-suggested, or self-submitted — because that is what determines its basis under AD-32, what the attestation attaches to, and what the invitation must say. This is a field, and it is the field that makes AD-32's basis decidable for the platform's most exposed data class.

**R3-11 — AD-21 owns invitation composition and binds none of its required content. `[NEW in round 3 — MEDIUM]`**

AD-21 is the strongest invariant in the document and stops at the send: *"Composing an invitation is a separate path returning text and a link to the Family, who sends it from their own WhatsApp."*

That composed text is the **only notice any Guest ever receives**, because AD-21 guarantees the platform never contacts them again. Research R32 sets its required contents: the family's name as sender, why the recipient is receiving it, a **one-tap opt-out**, and a privacy-notice link. Research §297 makes the point explicitly — the invitation *"is the closest available analogue to the s.3 notice"* for a person the platform cannot lawfully reach any other way.

`opt-out` appears zero times. Nothing in the spine says the composed text carries anything. And the opt-out is not copy: it is a live route into AD-32's rights surface (which under R3-6 has no identity proof), so it is an endpoint with a dependency, composed on one path, consumed by three clients.

**Add to AD-21:** the composition path returns text that always carries sender identity, the reason for receipt, the opt-out link and the notice link; these are not client-supplied and cannot be omitted; the opt-out resolves to AD-32's rights surface scoped to that Guest's own record.

**C-5.1 residual — entropy floor, constant-time comparison, and the link-preview carve-out. `[STILL OPEN from round 1 — MEDIUM]`**

AD-30 says *"unguessable"* and does not say how unguessable: no CSPRNG requirement, no ≥128-bit floor, no constant-time comparison (so token validity leaks through timing), no constant-work lookup. And FR-12 is a deliberate asymmetry that will be "fixed" by someone unless it is written down: *"That link's preview — image, title, description — **is controlled by the platform**, and is the platform's principal surface in front of Guests"* while *"the page is excluded from search-engine indexing."* These pages are intentionally crawled by WhatsApp's previewer and intentionally excluded from search. One sentence in AD-30 prevents a future agent tightening the header until previews break, or loosening it until the pages index.

**C-5.2 residual — two clauses are implied rather than stated. `[STILL OPEN from round 1 — MEDIUM]`**

AD-30 says the token *"addresses exactly one Guest of one Wedding and cannot be altered to reach another"*, which is the outcome. It does not say the mechanism: **no `allow_guest` method accepts an identifier of a Wedding, Guest or Function as a parameter** — scope comes from the token alone. That is the checkable rule, and it is the one `check_whitelisted.py` can assert. Similarly, *"expires when the Wedding concludes or is abandoned"* reads as a property; FR-11 and FR-12 require **revocation to take effect immediately**, which means re-validation against current Wedding state **on every request**, with no cache. AD-23's expiry job is a sweep, and a sweep is not "immediately".

---

## 6. GST and billing — FR-52, FR-54

**PARTIALLY COVERS.** From DOES NOT COVER. AD-34 states every rule I asked for and supplies a mechanism for exactly one of them.

### What closed

- **The mandate ban** is unambiguous in three places and correctly framed as a business decision rather than an implementation detail. `[C-6.4 CLOSED]`
- **Invoice immutability** has a tier-1 controller guard — the only new AD that applies AD-27 properly. `INVOICE` is in the ERD.

### Findings

**C-6.1 — Tax by recipient State: is AD-34 sufficient? No. `[STILL OPEN from round 1 — HIGH]`**

AD-34 says *"Tax is determined by the **recipient's** State, never assumed from the operator's."* That is the correct rule and it is not sufficient, for the reason the round-1 finding gave and the revision did not address: **this is a latent bug, and stating the rule does not make it non-latent.**

For a Shrirampur launch, CGST+SGST is right in essentially every case. An implementer hard-codes it, every test passes, and the defect surfaces the day the first Pune vendor with an out-of-State registration subscribes — as a filing error, discovered by a CA, months later. What makes it non-latent is a single server-side function that no surface duplicates, driven by inputs that must exist before a payment can be taken.

`GSTIN` appears **zero times** in the spine. There is no field, no capture point, and no gate. Research R57 is specific: *"Capture GSTIN + State at vendor onboarding. Never hard-code CGST+SGST."*

**Add:** tax determination is one server-side function keyed on the recipient's registration State and GSTIN; no surface and no handler computes or assumes a split; GSTIN and State are captured at Vendor onboarding and are **required before a paid Subscription can be taken**. The last clause is what makes the first enforceable.

**C-6.2 — The advance rule has the tax period and not the mechanism that produces it. `[STILL OPEN from round 1 — HIGH]`**

AD-34: *"a prepaid term is an advance whose full liability falls in the period of collection."* Correct, and it describes an outcome. The mechanism that produces it is one sentence and is missing: **the invoice is issued atomically with payment confirmation, and no period-based or deferred generation exists.** Research R58 gives the reasoning — issuing at the moment of payment avoids the Rule 50 Receipt Voucher path entirely, which is the clean design. The intuitive alternative (invoice on service period, or monthly recognition) puts the liability in the wrong month, and AD-34 as written does not exclude it.

**C-6.3 — Numbering, the Rule 46 field set, and credit notes. `[STILL OPEN from round 1 — HIGH]`**

AD-34 says *"consecutively numbered"*. Rule 46 requires more, and each piece is checkable:

- **A consecutive serial unique per financial year, ≤16 characters, restricted character set.** `financial year` appears zero times; there is no FY reset and no length ceiling.
- **No gaps.** This is a concurrency and allocation property, not a formatting one — the same class of problem AD-11 solved properly for Slot blocking with a database constraint, and AD-34 solves with a word. Two payments confirming in separate workers is the identical race. AD-31's idempotency key deduplicates a retried webhook and does nothing about serial allocation.
- **The mandatory field set**: `place of supply` (with State name) appears zero times, the reverse-charge flag is absent, and `SAC` appears zero times though research R56 requires separate lines for Featured (998365) and listing subscription (998439).
- **Credit notes and Refund Vouchers from day one.** AD-34 mentions the credit note only as the *manner* of correction — *"a correction is a credit note, never an edit"* — not as a document that must exist. `Refund` appears zero times. Research R59 is explicit that these are needed *"from day one"* because *"retrofitting GST document types is painful"*, and FR-54's no-non-cancellable-term rule makes a mid-term refund a real path.

**R3-12 — Nothing says when a serial is taken. `[NEW in round 3 — MEDIUM]`**

The gap-free property has a precondition AD-34 does not state: **the serial is allocated at issue, on a confirmed successful payment, and nothing else takes a number.** A draft Invoice created before payment confirmation, a failed payment that later succeeds, or a cancelled attempt each consume a serial under any naive design, and every consumed-and-unused serial is a gap in a per-FY consecutive series that a GST officer will ask about. This is cheap to state and expensive to discover.

**C-6.5 — The ₹0 tier's tax consequence. `[STILL OPEN from round 1 — MEDIUM]`**

AD-34's *"An issued invoice is immutable"* implies every payment produces one; nothing says the ₹0 Founding tier produces **no invoice and no tax document**, and a ₹0 tax invoice implies a supply. Research R60/R61: any condition attached to the free tier is non-monetary consideration making it taxable at open market value, and the cohort needs a **related-party screen** — relatives, employees, directors, controlled entities — which Schedule I para 2 makes taxable at OMV even at ₹0. That screen is a field on the Vendor, not a policy.

**C-6.6 — GST-inclusive display. `[STILL OPEN from round 1 — MEDIUM]`**

AD-19's mechanism is right (clients receive a number and render it). Research R25 and NFR 5.5's drip-pricing ban fix *which* number: the payment surface renders the **GST-inclusive all-in total**, with the split shown, never a pre-tax figure that grows at checkout.

---

## 7. Accessibility — NFR 5.8

**DOES NOT COVER.** A conventions row is not adequate, and this particular row asserts more than the platform can deliver.

The row reads: *"WCAG 2.1 AA on all five surfaces, the two public Guest pages included (NFR 5.8); nothing essential conveyed by colour alone — verified status, availability and paid placement each carry a non-colour indicator."*

**C-7.4 — The row claims AA on a surface the platform does not control. `[STILL OPEN from round 1 — REGRESSED — MEDIUM]`**

Per the spine's own `scope`, the five surfaces are the Expo app, the vendor portal, the guest pages, the Frappe backend and **Frappe Desk**. NFR 5.8 does include *"the admin panel"*, and the admin panel is Desk (AD-1, Capability map 4.13). Vivah Spot does not control Desk's conformance and cannot deliver AA on it.

Round 1 asked for one honest line in Deferred or Conflicts. The revision instead wrote the claim into the Conventions table, which is worse than the silence it replaced: an obligation that was visibly unaddressed is now visibly discharged, and no one will look again. Move it: *Desk's own WCAG conformance is a third-party property outside the platform's control* belongs in Conflicts beside the other four.

**C-7.1 — The indicator vocabulary has no shared home. `[STILL OPEN from round 1 — MEDIUM]`**

The row states the rule and names no owner. Verified status, availability and paid placement each render in the Expo app, the Next.js vendor portal and the Next.js guest pages — three stacks, three teams, three chances to ship a green dot. This is the same problem AD-24 solves for vocabulary and AD-19 solves for money formatting, and it has the same solution: the indicator vocabulary lives in `packages/shared` beside the tokens and the money formatter, each carrying a text or shape affordance and not only a colour. Paid placement is simultaneously a consumer-law obligation (research R13: legible at the smallest viewport, in both themes, on every surface), so it is the one that must not be left to three independent choices.

**C-7.2 — The contrast-locked token is still unprotected. `[STILL OPEN from round 1 — MEDIUM]`**

NFR 5.10: *"One token in the palette is an accessibility decision, not an aesthetic one. The muted text colour was deliberately darkened to meet contrast on white. It must not be lightened, whatever a future design pass prefers."* `packages/shared` is spine-governed — AD-4 generates into it, AD-19 puts the formatter in it — and the spine mentions the tokens file three times without ever saying one of its values is a compliance constraint. A future agent doing visual polish has, in this document, no reason not to lighten it. One line, and a contrast assertion in the commit gate makes it tier 2 cheaply.

**C-7.3 — The two public Guest pages get a claim and no architectural support. `[STILL OPEN from round 1 — MEDIUM]`**

NFR 5.8 includes them deliberately and gives the reason: *"many who reach it do so because someone forwarded the link, and none of them chose to be there at all."* Elderly relatives, cheap Android phones, poor connections, no onboarding, no account.

The architectural consequences belong here and not in a UX document: these pages render server-side, work without a client runtime for the primary action, and hold to AA on a low-end viewport as a release condition — and the FR-12 link preview is generated server-side for the same reason. The source tree still says only `apps/guest-web/ # Next.js · Guest — RSVP + guest form`, which leaves the rendering strategy open on the two pages where it is an accessibility and reach decision rather than a performance one.

---

## Is AD-33's "retention outranks erasure" correct under Indian law?

**Directionally correct, wrongly scoped, and missing the condition that makes it lawful.**

**Correct in direction.** DPDP s.8(7) requires erasure on withdrawal of consent or when the purpose is exhausted, *"unless retention is necessary for compliance with any law for the time being in force."* IT Rules 3(1)(g) is such a law. So preservation of removed content does outrank an erasure request, and AD-33's precedence is right where it applies. NFR 5.5's *"Where erasure is refused or limited, the person is told which retention basis applies"* is also correctly carried — AD-33 says the person is told which basis applies, which is the part most architectures omit.

**Wrongly scoped, three ways.**

1. **Rule 3(1)(g) is a preservation obligation for a stated purpose, not a general licence to keep and use.** The rule requires the intermediary to *preserve* removed information and associated records for 180 days *for investigation purposes*. AD-33 says "retained" with no purpose limitation, which under DPDP's own purpose-limitation principle is not the same thing. Preserved data should be access-restricted to the investigation purpose and not returned to ordinary processing — otherwise the takedown becomes a route by which data that should have been erased is retained and remains usable.
2. **It has no ceiling and AD-23 gives it one.** The rule reads *"180 days … **or such longer period as may be required by the court or by government agencies**."* AD-33 states a flat 180 and AD-23 now runs a job that enforces it. See R3-3: the architecture will delete on schedule what an authority told it to keep, which is spoliation.
3. **The blanket collides with the Guest-contact rule.** See R3-4. Research R80 says the retention basis *"must **not** extend to the guest list, which has no such justification"*, and NFR 5.5 says Guests *"are not retained for the Agreement retention period"*. AD-33 as written overrides both.

**Missing condition.** Research §643 and R80 both say the retention must be **stated in the DPDP notice** — a retention the person was never told about is not a retention basis they can be told applies. The spine has no notice record at all (R3-8), so the sentence AD-33 promises to say to the person has nothing to point at.

**Verdict:** keep the precedence, scope it to the removed content and its removal record, add the legal hold, add the purpose limitation on preserved data, and carve out data whose purpose is exhausted and which was not itself the removed content.

---

## Are AD-32's three bases the right classification?

**No. Two of the three are not DPDP bases, and the platform's most exposed data class fits none of them.**

AD-32: *"Personal data is held on one of three **recorded** bases: **consent** (erasable), **an engagement between two parties** (pseudonymised and retained), or **a legal obligation** (retained for its stated period)."*

**The DPDP Act recognises two grounds for processing, not three.** Consent (s.6), and the enumerated *"certain legitimate uses"* (s.7) — state functions, compliance with law or a court order, medical emergency, disaster, employment, and s.7(a) data voluntarily provided by the Data Principal for a specified purpose. **There is no contract or performance-of-contract basis and no legitimate-interests basis**; those are GDPR Article 6(1)(b) and (f), and DPDP deliberately omitted both. "An engagement between two parties" is a GDPR ground imported into an Act that does not have it.

The consequences are concrete, not academic:

1. **The Agreement retention loses its justification.** Under DPDP the parties' data in an Agreement is held on **consent** (s.6), and s.8(7) then requires erasure on withdrawal *unless retention is necessary for compliance with a law*. So the eight-year retention has to stand on the s.8(7) carve-out — Limitation Act Art. 55 (3 years for a contract claim), CGST s.36, Companies Act s.128(5) — which research §643 says *"is defensible … but it must be **stated in the notice**, scoped to the Agreement record only"*, and which it flags for counsel. AD-32's second basis lets an implementer skip that reasoning entirely: they will record "engagement", believe the retention is grounded, and never discover it is not. The classification does not merely mislabel the basis; it removes the prompt to establish one.
2. **Pseudonymisation is not an exit from DPDP.** AD-14 replaces identifying fields with a *stable non-identifying token* while the platform keeps the mapping — which means the data remains re-identifiable by the fiduciary and remains personal data under s.2(t)/s.2(x). DPDP has no pseudonymisation carve-out. So "pseudonymised and retained" discharges the erasure obligation only where retention is independently lawful; it is a mitigation, not a basis. AD-32 presents it as the basis.
3. **Guest contacts fit none of the three, and the enumeration is exhaustive.** Family-uploaded guest contacts are not consent (the guest gave nothing), not an engagement between two parties (the guest is party to nothing — NFR 5.5 says so explicitly), and not a legal obligation. Research §290's conclusion is that on a strict reading **no lawful basis exists** and the position is unresolved. AD-32 says data is held on *one of three* bases and requires the basis to be stored, so an implementer facing a required enum with no correct value will pick **consent** — and the platform will hold a consent record, for the data class it is most exposed on, for a consent no data principal ever gave. **A fabricated compliance record is materially worse than an absent one**, because it converts an acknowledged legal gap into a false attestation the platform will produce in its own defence.

**What to do.** Change the enumeration to DPDP's actual shape: **consent (s.6)**, and **a legitimate use under s.7**, with the specific limb recorded. Add a fourth, explicitly-named class — *unresolved / mitigated*, carrying the mitigation applied (purpose limitation, non-messaging under AD-21, erasure on the AD-14 clock, family attestation under R31) rather than a basis that does not exist. Separate **basis for processing** from **ground for retention beyond purpose**, because s.8(7) makes those two different questions and AD-32 currently answers them with one field. And add the resulting item to Conflicts: the PRD's NFR 5.5 precedence — *"records of an engagement between two parties … are pseudonymised and retained"* — is a policy the architecture must implement and a classification that does not correspond to the Act, and the PRD is where that gets fixed.

The first two bases being wrong does not break the *behaviour* AD-14 and AD-32 produce, which is sensible and mostly what a compliant platform would do anyway. It breaks the *record* of why, which is the only thing a basis field is for.

---

## Consolidated: what to add

| # | Add | Where | Severity | Marker |
|---|---|---|---|---|
| 1 | Correct the "Findings not yet folded in" paragraph — it contradicts `review-closure.md`'s own verdict and converts 14 open CRITICAL/HIGH findings into a medium tail by assertion | Deferred | CRITICAL | NEW r3 |
| 2 | Identity proof (OTP to the number in question) on AD-32's rights surface; carve it out of AD-30's "safe to show an unauthenticated caller"; same response for unproven and unknown | AD-30, AD-32 | CRITICAL | NEW r3 |
| 3 | Put AD-32's and AD-33's records in AD-27's named list — consent, grievance clocks, takedown ground/authority/actor, register entries — and raise both Enforced-by from tier 3 | AD-27, AD-32, AD-33 | CRITICAL | NEW r3 |
| 4 | Breach: incident record, access logging sufficient to enumerate affected principals, `INCIDENT` in the ERD | new AD / AD-32, ERD | CRITICAL | STILL OPEN |
| 5 | Guest-contact access: `permlevel` gate + read logging; FR-61 tension recorded in Conflicts | AD-14, Conventions, Conflicts | CRITICAL | STILL OPEN |
| 6 | Digest over the frozen rendered artefact (PDF/A); serve it for FR-40; log that each party took a copy | AD-12 | CRITICAL | STILL OPEN |
| 7 | Legal hold on takedown records; the 180 days is a floor; purge job skips held records and logs the skip | AD-33, AD-23 | HIGH | NEW r3 |
| 8 | Scope AD-33's "retention wins" to the removed content and its record; do not extend it to Guest contacts; preserved data is investigation-purpose only | AD-33, AD-14 | HIGH | NEW r3 |
| 9 | Reclassify AD-32's bases to DPDP's shape (s.6 consent / s.7 limb); separate basis from retention ground; add the unresolved-and-mitigated class for family-uploaded Guest contacts | AD-32, Conflicts | HIGH | NEW r3 |
| 10 | `on_trash` guard on `Agreement Record`; sweep verifies highest `seq` against the recorded count, so truncation is detectable | AD-27, AD-12, AD-23 | HIGH | NEW r3 |
| 11 | Capture certificate inputs at confirmation — app/deploy version, host identity, terms/format version, custodian of record | AD-12 | HIGH | STILL OPEN |
| 12 | Rewrite the RFC 3161 deferral as an accepted decision; add NTP-to-NIC/NPL, UTC storage, operating-properly evidence; drop the hash-chain justification, which is orthogonal to time | Deferred, Conventions | HIGH | STILL OPEN |
| 13 | Repeat-infringer anchor: salted one-way hash over phone (and PAN/GSTIN) surviving erasure **and re-registration**; second exception in AD-14 | AD-14, AD-33 | HIGH | STILL OPEN |
| 14 | Guest as a data class: never a `PERSON` row, never joined to `PERSON`, never deduplicated across Weddings; amend AD-14's opening sentence | AD-14 | HIGH | STILL OPEN |
| 15 | Guest provenance field (family-supplied / member-suggested / self-submitted) + R31's non-pre-ticked family attestation at upload | AD-32, AD-14 | HIGH | NEW r3 |
| 16 | Notice as a versioned immutable record; consent stores the notice version in force; `NOTICE` in the ERD | AD-32, ERD | HIGH | NEW r3 |
| 17 | Two grievance tracks with two acknowledgement clocks (24h intermediary, 48h consumer) as a field on the record | AD-33, AD-23 | HIGH | STILL OPEN |
| 18 | Availability signal's fields stated; AD-4's contract carries no boolean-availability variant — before `api/family/v1` freezes | AD-10, AD-4 | HIGH | STILL OPEN |
| 19 | Extend the no-platform-terms rule to Quote and Amendment fields; add a startup assertion over `Property Setter` defaults (the AD-5 pattern) | AD-27 | HIGH | STILL OPEN |
| 20 | Tax as one server-side function; GSTIN + State captured at onboarding and required before a paid Subscription | AD-34 | HIGH | STILL OPEN |
| 21 | Invoice issued atomically with payment confirmation; no period-based generation | AD-34 | HIGH | STILL OPEN |
| 22 | Rule 46 mechanics: per-FY reset, ≤16 chars, gap-freeness enforced by the database, place of supply, reverse-charge flag, SAC lines; credit note and Refund Voucher documents from day one | AD-34 | HIGH | STILL OPEN |
| 23 | Serial allocated at issue on a confirmed payment; nothing else consumes a number | AD-34 | MEDIUM | NEW r3 |
| 24 | Pricing model declares arithmetic over the Vendor's own rates and never supplies a value | AD-8 | MEDIUM | NEW r3 |
| 25 | AD-21's composed invitation always carries sender identity, reason for receipt, one-tap opt-out and notice link | AD-21 | MEDIUM | NEW r3 |
| 26 | Three breach clocks named separately: DPDP Rule 7 to principals without delay, 72h Board report, CERT-In 6h | AD-32, Deferred | MEDIUM | NEW r3 |
| 27 | Search returns organic and promoted as two disjoint collections; the paid label is a required non-empty field | AD-22, AD-4 | MEDIUM | STILL OPEN |
| 28 | "Removal is a state transition, never a delete"; FR-63's 180 days added to AD-14's ladder | AD-33, AD-14 | MEDIUM | STILL OPEN |
| 29 | Payment module importable only from the Subscription handler; state whether ERPNext is installed and what is in scope if so | AD-19, AD-34 | MEDIUM | STILL OPEN |
| 30 | Token entropy floor (CSPRNG ≥128 bits), constant-time comparison, constant-work lookup; state the FR-12 link-preview carve-out against `noindex` | AD-30 | MEDIUM | STILL OPEN |
| 31 | State the mechanism behind AD-30's scope rule: no `allow_guest` method takes a Wedding/Guest/Function identifier; revocation re-checked per request, uncached | AD-30 | MEDIUM | STILL OPEN |
| 32 | Non-colour indicators for verified / available / promoted defined once in `packages/shared` | Conventions | MEDIUM | STILL OPEN |
| 33 | Muted-text token marked contrast-locked; contrast assertion in the gate | Conventions | MEDIUM | STILL OPEN |
| 34 | Public Guest pages server-rendered, primary action works without client JS, AA as a release condition | AD-30 / Capability map | MEDIUM | STILL OPEN |
| 35 | Move the Desk-AA claim from Conventions to Conflicts — third-party conformance the platform does not control | Conventions → Conflicts | MEDIUM | STILL OPEN (regressed) |
| 36 | Hosting constrained to India-region, 180-day in-India ICT logs, NTP discipline, 6-hour incident capability | Deferred | MEDIUM | STILL OPEN |
| 37 | Encryption at rest for contact data; processing logs retained ≥1 year | Deferred / AD-23 | MEDIUM | STILL OPEN |
| 38 | No consent control ships pre-checked; consent controls come from `packages/shared` | Conventions | MEDIUM | STILL OPEN |
| 39 | FR-64 ranking disclosure and the R12 "no payments, and why" disclosure reachable without login from every surface | Capability map | MEDIUM | STILL OPEN |
| 40 | ₹0 Founding tier issues no tax document; related-party screening field on Vendor | AD-34 | MEDIUM | STILL OPEN |
| 41 | GST-inclusive all-in total is what the payment surface renders | AD-19, AD-34 | MEDIUM | STILL OPEN |
| 42 | Name the evidential DocTypes in AD-16 as forbidden to `db.set_value` / `db.sql` | AD-16 | MEDIUM | STILL OPEN |

## Conflicts to add to the spine's upstream table

| Conflict | Why it must be recorded |
|---|---|
| **FR-61 "no capability withheld by role" vs FR-61's own "Guest contact access is confined and logged", NFR 5.7 and DPDP Rule 6** | AD-27 closed the *write* side of the Desk hole. The *read* side is untouched and the PRD asserts both halves. Still absent from the table after two rounds. |
| **NFR 5.5's "engagement between two parties" as a retention basis vs DPDP's ss.6/7** | The Act has no contract or legitimate-interests ground. The PRD's precedence is implementable; its classification is not the Act's, and the eight-year retention needs the s.8(7) law-compliance carve-out stated in the notice instead. |
| **Family-uploaded Guest contacts have no lawful basis under DPDP** | Research §290 reaches this and calls it unresolved. AD-32's exhaustive three-basis enum will otherwise cause a false consent record to be written for the platform's most exposed data class. |
| **FR-63's 180-day preservation vs a court's "or such longer period"** | AD-23 now runs a purge job on a fixed clock with no hold. |
| **NFR 5.8 "every surface" vs Frappe Desk as the admin panel** | Third-party conformance outside the platform's control, now asserted in Conventions rather than recorded here. |
| **FR-12's mandatory Vivah Spot attribution line vs research R32's "zero Vivah Spot promotion"** | Meta policy and the guest's non-consent both argue for a bare invitation; the PRD requires an attribution line that cannot be removed. Small, but it is a decision someone made and should own. |

## What this review did not examine

Reviews (FR-44–FR-49) against IS 19000, and research R69's finding that vendor→family feedback must be structured, private to vendors and never free text — which reads as a data-model constraint the spine does not carry and which the round-1 review also left aside; the E-Commerce Rule 5(3) vendor-disclosure fields (geographic address, customer-care number) as required Listing data; the Rule 4(2) entity-disclosure surface; TRAI/DLT registration if the WhatsApp SMS fallback ever carries user-facing content; and the 2026 IT Rules amendments' synthetically-generated-content labelling, which bites the moment any invitation artwork or listing copy is AI-generated.

---

*Reviewed against `prd.md` FR-11, FR-12, FR-20, FR-39–FR-43, FR-50–FR-54, FR-58–FR-64, FR-66, FR-69, FR-72, NFR 5.5–5.10, §7.1, §7.2, §7.9; `research-india-regulatory.md` R1–R81; and the round-2 verification in `reviews/review-closure.md`.*
