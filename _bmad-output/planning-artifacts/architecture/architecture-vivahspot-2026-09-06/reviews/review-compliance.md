---
review: compliance
lens: 'Regulatory, legal-posture and data-protection compliance for an Indian online intermediary'
target: '_bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md'
driving_spec: '_bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/prd.md'
supporting: '_bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/research-india-regulatory.md'
reviewer: compliance reviewer (architecture-spine quality gate)
date: '2026-09-06'
---

# Compliance Review — ARCHITECTURE-SPINE.md

## Verdict

**The spine protects the non-party posture well and the statutory obligations badly.** The commercial invariants that keep Vivah Spot outside the *Goibibo*/*Louboutin* liability line — no money path, no platform-authored terms, no mediation, attributed availability, a banned-vocabulary gate — are present and mostly load-bearing. But the obligations that make the safe harbour *available in the first place* (IT Rules 2021 rule 3 due diligence, DPDP consent/erasure/breach machinery, BSA s.63 evidential integrity, GST document rules, WCAG) are either reduced to entries in a scheduler list or absent from the document entirely. Four of the seven areas reviewed are **DOES NOT COVER** or worse than they appear.

The structural cause is one design choice that the spine states twice and never guards: **Frappe Desk sits directly on the DocTypes, and FR-61 gives every Admin every capability.** The spine treats that as a pure win ("what makes FR-62's configuration editing free"). It is also the hole through which the append-only Agreement record, the un-erasable audit log, the RBAC on Guest contacts, and the ban on platform-authored terms all leak. Every one of those is asserted in the spine as "no path in code" or "review (tier 3)" — enforcement claims that are true of `api/` and false of Desk.

Severity scale: **CRITICAL** (posture-breaking or statutory non-compliance that cannot be retrofitted), **HIGH** (statutory obligation with no architectural home), **MEDIUM** (real gap, retrofittable), **LOW** (clarity/wording).

---

## 1. Non-party posture — NFR 5.6, FR-41, PRD §7.1, §7.2

**PARTIALLY COVERS.**

### What genuinely holds

- **AD-24** gates the words. *book now / booking / booked / cart / checkout / legally binding / guaranteed / enforced by Vivah Spot* are blocked pre-commit across `apps/`, `packages/`, the backend and the root `.html` files, with the §7.1/§7.9 carve-out handled correctly. This is the right enforcement tier for a copy-level rule, and the spine is honest that it fails today on the published site. Good.
- **AD-13** is a genuine posture protection that a less careful architecture would have missed: deriving the FR-42 cancellation count from `docstatus` would have printed "cancelled" on both parties' profiles for every cooperative FR-69 amendment. Recording fault the platform did not adjudicate is exactly the *Louboutin* active-participant drift. Correct call.
- **AD-19** confines Razorpay to Subscriptions and forbids client-side money arithmetic.
- **AD-21** makes "Vivah Spot never messages a Guest" a type-level (tier 1) impossibility rather than a policy. This is the strongest compliance invariant in the document, and it is the right pattern for all of them.

### Findings

**C-1.1 — Nothing forbids the platform authoring or defaulting an Agreement term. `[CRITICAL]`**

FR-39: *"No term is pre-filled, suggested or defaulted by Vivah Spot, and there is no standard form of agreement the platform authors."* NFR 5.6: *"authors no terms."* Research R44 and §4.4 identify platform-supplied commercial defaults as a **non-party-destroying** factor: *"A template with pre-filled cancellation terms is the platform proposing terms."*

No AD binds this. Worse, the spine actively creates the mechanism: **AD-8** guarantees Admin-editable configuration without a release, and Frappe delivers that through `default` on a DocType field and through **Property Setter**, which lets an Admin set or change a field default from Desk with no code change, no review and no deploy. Under AD-1 Desk reaches the DocTypes directly, so setting a default on the Quote/Agreement price, cancellation, or inclusions field is a two-click operation by a non-engineer. The vocabulary gate does not see Property Setters — they are database rows, not repository files.

This is the single easiest way for the product to walk across the *Louboutin* line, and it can happen by accident, from the admin console, on a Tuesday.

**Add — AD-26 (proposed):** *No commercial term of a Quote, Agreement or Amendment carries a platform-supplied value.* On every field holding a term the parties author — days, Slots, Space, guest count, price, inclusions, delivery timeline, Rules, cancellation position — `default` is empty, `fetch_from` is unset, and no `Property Setter` may set one. The platform supplies field, label, help text and required-ness; it never supplies a value. Enforced by: a DocType-JSON check in the backend gate over the enumerated term fields **plus** a startup/scheduled assertion that no `Property Setter` targets a `default` on those fields — because the JSON check alone does not see Desk. Tier 2, and it must be tier 2, not review: review does not run when an Admin edits a Property Setter.

**C-1.2 — "Availability is attributed, never asserted" is a rendering convention, not a shape. `[HIGH]`**

AD-10 closes with *"Availability is never asserted as fact — every surface renders it attributed to the Vendor (NFR 5.6),"* enforced by "review (tier 3); the single call site is the check". The single call site guarantees one *answer*; it guarantees nothing about how three independently-built clients render it. A boolean crossing the wire is an invitation to render "Available" — which is the platform asserting a fact about a third party's capacity, precisely what NFR 5.6 and research §4.4 forbid. NFR 5.10 already spells the required voice: *"'vendor shows available', not 'available'."*

**Add:** make the shape carry the attribution. The availability function returns an attributed structure, not a bare boolean — minimally `{state, attributed_to: "vendor", as_of}` — and the zod schema generated under AD-4 has no boolean-availability variant for a client to bind to. A client that wants to print a word has to print the vendor's claim. This is the AD-21 pattern (make the wrong thing untypeable) applied to the second-most-likely posture leak.

**C-1.3 — The Featured band is not architecturally separated from organic results. `[MEDIUM]`**

FR-20 and FR-50 establish that **ranking is sold** — a marked Featured band beside organic results. Research R13 requires the paid label on the card itself, on every surface, at the smallest viewport, in both themes; a disguised advertisement is an enumerated dark pattern with CCPA penalties (research §1.2, §1.4).

AD-22 governs organic ordering thoroughly and correctly ("neither what a Vendor pays nor how recently they joined is a signal at any weight") — but it is silent on the paid band. Nothing stops `search_listings()` returning one merged array with a `featured: true` flag, which three clients will then interleave three different ways, and one of them will eventually drop the label on a carousel or a share preview.

**Add to AD-22 (or a new AD):** the search response returns **two disjoint collections**, organic and promoted; no client may merge them; the paid-placement label is a required non-empty field on every promoted item, not a client-side decoration. Enforced by the generated contract (tier 1-by-shape) rather than review.

**C-1.4 — No architectural bar on a Family→Vendor money path. `[MEDIUM]`**

PRD §7.1 and research R43 call this *"the single most important design constraint in the product — protect it absolutely."* The spine's only money statement is AD-19, which is about **units** (Currency vs paise), not about **direction**. It names Razorpay as reachable and does not say from where.

The realistic failure is not someone deciding to take commission. It is installing ERPNext for FR-52's GST invoicing — a natural move, since AD-19 leans on "print formats, reports and FR-52's GST invoicing work natively" — and thereby installing Payment Entry, Sales Invoice against a Customer, and a general ledger that will happily record a Family-to-Vendor settlement. From there it is one well-meaning feature ("let the Family record what she paid") to a payment path.

**Add to AD-19 or a new AD:** the payment integration module is importable from exactly one place, the Subscription handler; no method under `api/family/**` or `api/guest/**` may import it, enforced by the same import-restriction lint AD-1 needs; and the spine must state whether ERPNext is installed at all, because that decision determines what money machinery exists on the site by default. If ERPNext is installed for invoicing, name explicitly which DocTypes are in scope and state that no accounting document may reference a Family.

**C-1.5 — `[LOW]`** "Featured" as the tier and band name is PRD-owned, but research R13 prefers "Promoted"/"Sponsored" as the consumer-facing label. Worth one line upstream; not an architecture defect.

---

## 2. Intermediary obligations — FR-63

**DOES NOT COVER.** This is the weakest area in the document.

FR-63 is a rule-3 due-diligence checklist, and rule 3 compliance is what conditions the s.79 safe harbour, which E-Commerce Rule 5(1) in turn makes a condition of the consumer-law position. It is load-bearing for everything in section 1 above. The spine's entire treatment is one clause inside AD-23: *"FR-63's grievance SLA timers (7 days, 36 hours, 3 hours, 72 hours)."*

Timers are the least of it. A timer needs something to count against, something to escalate, and something to record. None of that exists in this architecture. There is no Grievance/Complaint entity in the ER diagram, no `api/` surface for a complaint, no removal state on any content, no removal record, and no repeat-infringer anchor.

### Findings

**C-2.1 — No grievance entity, no ticket, no public intake. `[CRITICAL]`**

FR-63 requires acknowledgement on receipt, *"a reference the complainant can quote"*, and disposal within seven days. Research R15/R16 add the 24-hour intermediary acknowledgement and the 48-hour/1-month consumer track — **two different clocks on two different statutes**, which the spine's single "7 days" collapses.

A complainant is very often not a user: a photographer whose portfolio was stolen, a person defamed in a review, a Guest who received an invitation. Research R36 and NFR 5.5 both require a **no-login channel**. `api/guest/` exists but is described only as "allow_guest, token-addressed" — a stolen-portfolio complainant holds no token.

**Add:** a `Grievance` DocType (complainant, channel, subject reference, statutory track, received-at, acknowledged-at, due-at, disposed-at, ground, outcome, acting Admin), a public reference number, and an `allow_guest`, rate-limited, un-tokened intake method. Route the timers in AD-23 against this record rather than against nothing. Name the two tracks separately.

**C-2.2 — There is no takedown state on content, and therefore no 3-hour capability. `[CRITICAL]`**

The 3-hour court/government window is, as research §2.8 puts it, *"an operational fact, not a policy statement"*, and R18 makes the requirement explicit: disable a listing, review, photo, guest list or entire account **immediately, without a deploy, by a non-engineer, with an audit trail**.

The spine's only visibility mechanism is **AD-20**, which is a *verification* gate — "a new photo is hidden while the rest of the Listing stays live". Verification state is the wrong axis for a takedown. A court-ordered removal is not "pending verification", it must not be curable by re-verification, it must not be reversible by the Vendor, and it must record its ground and authority. Reusing AD-20's state for takedown would let a Vendor resubmit their way out of a court order.

**Add:** a removal axis independent of verification, applied at the item level (Listing, portfolio image, Review, Real Wedding, guest list, account), with ground, authority, acting Admin and timestamp — and state in AD-20 that the public read path ANDs both gates. Frappe Desk gives you the non-engineer, no-deploy operation for free; the missing piece is the state and the record.

**C-2.3 — 180-day retention of removed content collides head-on with AD-14. `[CRITICAL]`**

FR-63 requires removed content and its associated records to be retained 180 days (IT Rules 3(1)(g)). AD-14's erasure rule and AD-23's erasure jobs have no exception for it, and the natural implementation of "remove" in a document store is a delete.

The two rules will be implemented by different stories, months apart, and the erasure job will silently destroy the evidence the takedown rule is required to preserve. This is exactly the class of contradiction a spine exists to prevent, and it is not recorded anywhere — not in AD-14, not in AD-23, not in "Conflicts to resolve upstream".

**Add:** state it as an invariant — **removal is a state transition, never a delete**; removed content and its removal record are retained 180 days and then purged by a job that is itself in the AD-23 list; and add "content removed under FR-63, 180 days" to AD-14's precedence ladder beside the Agreement/Review/audit-log retentions.

**C-2.4 — The repeat-infringer register is defeated by AD-14 as written. `[HIGH]`**

FR-63 requires a register of repeat infringers; research R20 requires it *"keyed to a persistent vendor identity that survives account deletion and re-registration"* (E-Commerce Rule 5(5)).

AD-14 gives every person one record and erases identifying fields into *"a stable non-identifying token"*. Stable **per person record** — a fraudster who is removed, erases, and re-registers with the same phone gets a **new** person record and a **new** token. The register cannot link them, which is the only thing the register is for. AD-14 and FR-63 are in direct conflict and the spine does not notice.

**Add:** a persistent, salted one-way anchor derived from a re-registration-invariant identifier (phone, and for Vendors PAN/GSTIN), computed at registration, **retained through erasure and outside AD-14's clearing rule**, and used as the register key. Note it explicitly in AD-14 as the second exception beside Guest contacts. A hash is the right shape: it honours erasure (the identifier is unreadable) while preserving the linkage the Rule requires — the same pattern research R35 prescribes for the suppression list.

**C-2.5 — The quarterly terms advisory is not in AD-23's list. `[HIGH]`**

AD-23 enumerates "the eleven the PRD requires" and the quarterly advisory (FR-63, IT Rules 3(1)(c) as amended 2026, research R14) is **not among them** — the FR-63 entry covers only the SLA timers. AD-23's own stated failure mode is *"a requirement with a time trigger silently never shipping, because no document lists them"*. The rule caught nine of ten and then demonstrated the failure it was written to prevent.

**Add:** the quarterly advisory to all registered users (Families and Vendors), with a template and a send log, as a twelfth entry. Re-count the list against FR-63 while you are there.

**C-2.6 — `[MEDIUM]`** Grievance officer contact *"reachable from every surface"* includes the two public Guest pages, which are token-scoped, no-login and served from `apps/guest-web`. That is a cross-client contract and belongs in the spine's shared layer, not in three separate UX decisions. Same for the FR-64 / R9 ranking-disclosure page and the R12 "we do not process payments, and here is why" disclosure — both must be reachable **without login**, which makes them a routing decision on a public surface, not app copy.

**C-2.7 — `[MEDIUM]`** The Deferred section leaves backend hosting open without noting that the choice is regulatorily constrained: CERT-In directions require 180 days of ICT logs retained **within India** and NTP sync to NIC/NPL (research R22, and see C-4.3 below). "Choose before the first deploy" should say India-region, log-retaining, NTP-disciplined.

---

## 3. Data protection — NFR 5.5

**PARTIALLY COVERS.** AD-14 and AD-21 are good and do real work. Between them they cover perhaps half of NFR 5.5, and the missing half is not small.

### What genuinely holds

- **AD-14** is the right shape for the erasure-vs-retention precedence. One person record, references not copies, erasure clears that record, referring records keep their content with the author de-identified. It implements NFR 5.5's precedence *"and does not re-derive it"*, which is exactly what the PRD asked for. The Guest-contacts-erased-outright exception is stated with all three triggers (30 days after conclusion, immediately on abandonment, immediately on dismissal).
- **AD-21** makes Guest-directed messaging impossible by type.
- **AD-17** turning off `disable_document_sharing` site-wide is a genuinely good catch — a DocShare row ORs past every query-condition hook and would have quietly defeated the guest-list isolation.

### Findings

**C-3.1 — Consent is not modelled at all. `[CRITICAL]`**

NFR 5.5: *"Consent is specific, informed and separately given for each purpose, and withdrawable as easily as it was given."* FR-66: a published Real Wedding *"rests on explicit consent that can be withdrawn, and withdrawal removes what was derived from it."* Research R23 (no pre-ticked anything, DPDP s.6(1) + E-Commerce Rule 4(9)), R30 (notice presented independently of the T&Cs), R31 (family attestation at guest-list upload).

The word "consent" appears **once** in the spine, inside AD-14, as the adjective in "consent-based data is erased". There is no `Consent` entity in the core-entity diagram, no per-purpose grant record, no withdrawal path, and no rule that a consent is timestamped and versioned against the notice text in force when it was given.

AD-14's whole precedence ladder is built on the distinction between consent-based data and legally-retained data. **You cannot implement that distinction without a record of which consent covered what.** AD-14 is currently resting on a classification that nothing in the architecture stores.

**Add — AD-27 (proposed):** consent is a first-class, append-only record: data principal, purpose, the notice version shown, granted-at, withdrawn-at, and the mechanism. One record per purpose — never a single blanket flag. Withdrawal is an append, not an update. Any processing that depends on consent reads this record; nothing infers consent from the existence of an account. Add `CONSENT` to the core-entity diagram beside `PERSON`. Note that this is also what makes AD-14's classification computable rather than assumed.

**C-3.2 — Breach detection and 72-hour notification appear nowhere. `[CRITICAL]`**

NFR 5.5: *"Personal data breaches are reported to the regulator and to affected people within seventy-two hours of becoming aware of them."* Research R39 spells out the report contents (facts, causes, mitigation, responsible parties, preventive steps, notification summary); DPDP Rule 7 requires intimating affected principals *without delay*; CERT-In adds a 6-hour incident-reporting direction on top.

The string "breach" occurs once in the spine, in AD-21, and refers to breaching **Meta's** messaging policy — not a personal data breach. There is no detection story, no incident record, no notification path, no way to answer "which data principals were affected" (which requires access logs you are not keeping — see C-3.3), and no runbook trigger.

Three quarters of this is operational and correctly sits outside a spine. One quarter is not: **you cannot notify affected people in 72 hours if the architecture cannot enumerate who was affected.** That is a data-model requirement — access logging on personal-data reads, and a queryable link from a compromised surface to the set of persons whose data it exposed.

**Add:** an incident record; access logging on Guest-contact and person-identifier reads sufficient to compute an affected-principal set; and a line in Deferred acknowledging the 72-hour DPDP Rule 7 report and the 6-hour CERT-In direction as operational obligations the hosting decision must support. NFR 5.9's dependency table has no entry for this and should.

**C-3.3 — Desk gives every Admin unrestricted, unlogged access to Guest contacts. `[CRITICAL]`**

FR-61: *"Access to Guest contact data is confined to those with an operational need, and is logged."* Research R37: *"RBAC so no ordinary admin can browse guest lists; access logged."* DPDP Rule 6 requires it.

AD-1 and the Capability map put Admin on Frappe Desk **directly on the DocTypes**, and FR-61 says no capability is withheld by role. So every Admin user can open the Guest list view and browse every wedding's contacts, and Frappe does not log document *reads* the way it logs writes — the Version doctype records changes, not views. The spine's Logging convention row confirms the gap in its own words: it commits to attributing *"every Admin action changing standing, visibility, published content or account access"*. **Reading is none of those.**

This is the only place where the spine's architecture directly contradicts an explicit PRD consequence, and it does so silently — the Capability map row for Guest surfaces cites AD-3, AD-14, AD-21 and no access-control AD at all.

**Add:** Guest contact data is the one place where FR-61's no-role-restriction rule cannot hold, and the spine must say so and escalate it upstream. Concretely: put Guest contact fields at a `permlevel` above 0 so a Desk role gate exists at all; give the Guest DocType an explicit read-access log written on every open and every list read that materialises contact fields; and record the FR-61 tension in "Conflicts to resolve upstream", where AD-5-vs-FR-62 already sets the precedent. Note that `frappe.db.get_value` and `frappe.db.sql` sit below the permission layer entirely (AD-16 says so) — so any read path built with them defeats both the permlevel and the log.

**C-3.4 — There is no access/correction channel for people who never held an account. `[HIGH]`**

NFR 5.5: *"Every person whose data is held can see it and correct it, including people who never held an account."* Research R36 requires it reachable **from the invitation message itself**.

The architecture gives `apps/guest-web` exactly two pages — "RSVP + guest form" (source tree, line comment). There is no third surface, no `api/guest` method, and no Admin queue for a rights request. A Guest who wants to know what is held about them, or to correct a wrong number, or to be erased before the 30-day job runs, has nowhere to go. Erasure-on-request for Guest contacts is required by NFR 5.5's own list of erasable things.

**Add:** a third public Guest surface — a no-login rights channel for access, correction and erasure — linked from the invitation and the guest form, rate-limited, with identity proof scoped to the phone number the request is about (an OTP to the number in question is the natural proof and reuses MSG91). Route it into the same Grievance record as C-2.1 so one queue and one clock serve both. Add it to the source tree and the Capability map.

**C-3.5 — Guest is not established as a distinct data class, and nothing prevents linking it to PERSON. `[HIGH]`**

The prompt's framing is right: Guest contact details are *"a distinct data class used only to compose invitations."* The ER diagram does model `GUEST` separately from `PERSON`, which is correct — but **AD-14's rule text contradicts it**: *"No record copies a person's name or number; every record references one person record."* Read literally, a Guest's number should be a PERSON row. If an implementer follows AD-14 literally, Guest contacts land in the identity table, and then AD-14's erase-outright exception and its pseudonymise-and-retain rule are two conflicting policies on one table.

The sharper risk is the one FR-12 and research R33 exist to prevent. Nothing in the spine forbids **reconciling a Guest's phone number against PERSON** — "this guest is already a user", "this guest's number matches a Vendor", "how many of last season's guests came back". Every one of those is audience-building from data collected for a single stated purpose, which is precisely the DPDP s.6(1) purpose-limitation breach FR-12 forbids: *"Never retained for marketing, never messaged by the platform, never used to build an audience."*

**Add:** state Guest as a data class of its own, scoped to one Wedding, never deduplicated across Weddings and **never joined to PERSON for any purpose**, with the growth path in FR-12 (a Guest who starts their own Wedding) working by that Guest signing up fresh and consenting directly — never by the platform recognising them. Amend AD-14's opening sentence so it does not sweep Guests into the person record. Make the no-join rule a review checklist item on any query touching the Guest DocType.

**C-3.6 — `[MEDIUM]`** No security-safeguard invariant: research R37 requires encryption at rest for the contact table; Rule 6 requires processing logs retained ≥1 year (R38). Neither appears. The hosting decision in Deferred is where the first lands; the second is a data-retention rule that belongs beside AD-23.

**C-3.7 — `[MEDIUM]`** The "no dark patterns / nothing pre-ticked" rule (NFR 5.5, research R23, Rule 4(9)) is a cross-client invariant of exactly the kind AD-24 already handles for vocabulary — three clients could each choose differently. Nothing in the spine binds it. A shared-component rule ("no consent control ships with a checked default; consent controls come from `packages/shared`") would make it structural rather than a per-screen UX hope.

---

## 4. Evidential records — FR-43

**PARTIALLY COVERS — and the gap between how evidential AD-12 looks and how evidential it is, is the most dangerous thing in this document,** because the failure is invisible until an Agreement is actually needed, by which time nothing can be fixed retrospectively.

### What genuinely holds

AD-12's core insight is correct and non-obvious: storing the **serialised frozen terms verbatim** beside the Agreement makes year-eight reproduction schema-independent, which is what FR-43's *"remain retrievable in the form they were confirmed in"* actually requires. Most architectures get this wrong by assuming the schema will still parse. And AD-13 correctly prevents Frappe's cancel-then-amend from corrupting the record. Good work.

### Findings

**C-4.1 — "Append-only" is enforced by "no update path in code", and Desk is not code. `[CRITICAL]`**

AD-12: *"That row is never `UPDATE`d… Enforced by: no update path in code; review (tier 3)."*

Three ways that claim fails, all of them live in this architecture:

1. **Frappe Desk.** AD-1 puts Desk directly on the DocTypes and FR-61 gives every Admin every capability. Unless `Agreement Record` carries controller-level guards, an Admin opens the row in Desk and edits it. FR-43 says *"Neither party, nor Admin, can alter an Agreement after the fact"*, and NFR 5.7 says the same. Desk is not "a path in code" — it is the framework, and the spine's own AD-1 rationale celebrates that Desk needs no code to reach the data.
2. **`frappe.db.set_value` and `frappe.db.sql`.** AD-16 states plainly that these *"sit below the permission layer entirely and check nothing."* They also bypass controllers. So even a controller guard is only as good as the discipline of never using them here.
3. **Deletion.** Nothing prevents an `Agreement Record` row being deleted. Append-only with a delete path is not append-only.

FR-43's whole point is that the record *"has to survive being needed"*. A record that Admin can edit proves nothing about what the parties agreed — it proves what Admin last said they agreed. Under BSA s.63(2)(c) the production party must assert the system *"was operating properly"*; a system where the operator can rewrite the evidence undermines that assertion rather than supporting it.

**Add, and make it tier 1:**
- Controller guards on `Agreement Record`: `before_save` throws if not `is_new()`; `on_trash` throws unconditionally. These fire for Desk, for `api/`, and for any handler — everything except raw SQL.
- **Hash-chain the rows.** Each `Agreement Record` stores the digest of the previous row in that Agreement's sequence alongside its own. A silent edit — even one made with `db.sql` beneath every controller — then breaks the chain and is *detectable*, which is the difference between an evidential record and a plausible-looking one. Add a scheduled chain verification to AD-23 and an alert on mismatch. This is a small change that converts AD-12 from a convention into evidence.
- Say explicitly in AD-16's convention row that `db.set_value`/`db.sql` are forbidden on evidential DocTypes, and name them.

**C-4.2 — The digest is over the serialisation, not over the artefact the parties saw. `[HIGH]`**

AD-12 hashes *"the serialised frozen terms verbatim"*. FR-40 gives both parties a downloadable copy. Research R74/R75, tracking the BSA Schedule Part B, require the SHA-256 of **the canonical rendered artefact** and require freezing *"the exact rendered artefact each party saw, not the current template"* — because *"a hash computed later, from a re-render, proves nothing."*

As written, the downloadable copy is presumably rendered from whatever print format exists at download time. In year eight the document produced to a court will be a re-render from a template that has moved, and its hash will not match the stored digest — so the digest verifies something no one has a copy of, and the copy in evidence verifies against nothing. The certificate then attests a correspondence that does not hold.

**Add:** freeze the rendered artefact at confirmation (PDF/A), store it immutably beside the serialisation, digest **that**, and serve the frozen artefact for FR-40's download rather than re-rendering. Log that each party took their copy (research R9). Keeping the serialisation as well is right — it is the schema-independent fallback — but the digest of record must be over the thing a party could produce.

**C-4.3 — The server clock is defensible only in the weakest possible sense, and the deferral trigger fires after it is too late. `[HIGH]`**

The spine's Deferred entry: *"Server clock satisfies FR-43's 'not from a device clock' literally… Trigger: the first time an Agreement record is actually needed as evidence."*

Two problems.

First, the trigger is structurally wrong. Timestamping is not retrofittable. On the day an Agreement is needed as evidence, that Agreement was already timestamped — years ago, by whatever the system did then. Adopting an RFC 3161 authority at that moment improves nothing about the record in dispute. **The trigger can never fire usefully.** A deferral whose trigger cannot fire is not a deferral, it is a decision — and it should be recorded as one: "we accept a server clock for the life of the product, with the following disciplines."

Second, "literally satisfies" understates what is missing. Even accepting a server clock, the assertion needs support:
- **NTP discipline.** Research R77 and the CERT-In directions require synchronisation to NIC/NPL NTP. Nothing in the spine says the host is time-disciplined, and the hosting decision is open. An undisciplined VM clock can drift minutes, and a confirmation timestamp that precedes the proposal it accepts is worse than no timestamp.
- **Storage in UTC.** Research R77: store UTC, display IST. The spine's convention row says only "Asia/Kolkata".
- **Clock-continuity evidence.** BSA s.63(2)(c) requires asserting the device *"was operating properly throughout the material period"*. Research R81 recommends a quarterly signed system-integrity attestation (uptime, incidents, deploys). Nothing captures this, and it cannot be reconstructed later.

**Add:** state NTP-to-NIC/NPL and UTC storage as invariants; add the operating-properly evidence (uptime/incident/deploy record retained for the eight years) as a requirement on the hosting decision in Deferred; and rewrite the RFC 3161 entry as an accepted-cost decision with an honest statement of what a bare server timestamp does and does not establish, rather than a deferral with an unreachable trigger.

**C-4.4 — The certificate is asserted but not specified, and its inputs are not being captured. `[HIGH]`**

FR-43's last bullet is emphatic: without the certificate *"the rest of this FR proves nothing in particular."* AD-12 disposes of it in eight words: *"FR-43's certificate is generated from these rows."*

It cannot be, because the rows do not contain what the certificate needs. Research §8.4 and R79, tracking the BSA Schedule Part A, require: identification of the record, **the manner of its production**, **particulars of the devices involved**, and the s.63(2)(a)–(d) matters. *Arjun Panditrao* makes the certificate mandatory for secondary electronic evidence — without it the record is inadmissible, and the eight years of retention buy nothing.

Device particulars and manner of production are **contemporaneous facts**. In year eight you cannot reconstruct which host, which app version, which deploy produced a 2026 record — unless you wrote it down in 2026. AD-12 does not.

**Add to AD-12's snapshot row:** app/deploy version, host identity, and the terms/format version in force, captured at confirmation. Research R76's fuller list (user id, role, server timestamp, IP, user-agent, device id, app version, document id, document hash, terms version) is the right target. Then the certificate generator is genuinely a projection of stored rows rather than a promise.

**C-4.5 — `[MEDIUM]`** The named custodian (FR-43, NFR 5.9, BSA s.63(4)) is correctly routed to the business-input list. But the architecture should record *where the name lives* — the custodian at the time of confirmation is part of the record's provenance, and a certificate produced in 2034 for a 2026 record needs to state who was in charge in 2026, not who is in charge now. Capture the custodian of record on the snapshot, or at minimum a dated custodian register.

**C-4.6 — `[LOW]`** AD-12's eight-year retention is asserted in the AD's binding but the retention *job* is not in AD-23's list, and neither is the eventual purge at eight years. AD-23's stated failure mode applies.

---

## 5. Guest data and consent — FR-11, FR-12, UJ-5

**PARTIALLY COVERS.** AD-21 is excellent. Everything else about the Guest surfaces has been demoted to a table row.

### Findings

**C-5.1 — The entire Guest-link security model is a Conventions row with no enforcement tier. `[CRITICAL]`**

The Identifiers row: *"guest links are unguessable tokens, `noindex`, rate-limited."* That single clause is carrying FR-11 and FR-12's unguessability, non-alterability, non-indexing and flood protection. It is not an AD, it has no "Prevents", no "Enforced by", and nothing binds to it. Compare AD-21, which gets a full AD with tier-1 enforcement for a narrower obligation.

Two consequences follow. First, an implementer reads a conventions table as guidance and an AD as a rule. Second — and this is the substantive gap — **`noindex` as written is a client obligation.** It will be implemented as a meta tag in `apps/guest-web`, which is right but insufficient: the correct posture is `X-Robots-Tag: noindex, noarchive` on the response from the server plus the meta tag, so a link previewer, an alternate route, or a future rendering path cannot leak the page into an index. FR-12 additionally hands the platform control of the link **preview** (image, title, description) — which means these pages are deliberately crawled by WhatsApp's previewer while being excluded from search engines, a distinction that needs stating or someone will "fix" it in one direction or the other.

**Add — AD-28 (proposed):** promote the whole Guest-link model to an AD with per-clause enforcement. Unguessable tokens (CSPRNG, ≥128 bits) are the *sole* authorization for `api/guest` — see C-5.2. `noindex` is set server-side as a header and in the markup, with the link-preview carve-out stated. `@rate_limit` is mandatory on every `allow_guest` method, per token and per IP. Token comparison is constant-time and lookup is constant-work, so timing does not leak validity.

**C-5.2 — `api/guest` has no authorization invariant at all. `[CRITICAL]`**

AD-18 is the spine's gate rule, and it is explicitly about authenticated methods: *"`@frappe.whitelist()` establishes only that someone is logged in."* Every `allow_guest` method falls outside its reasoning, and the spine says nothing else about them. The source tree's entire specification is `api/guest/  # allow_guest, token-addressed`.

FR-11 and FR-12 impose hard rules that are pure server-side authorization and cannot be left to a client:
- *"cannot be altered to reach another Wedding's form"* / *"no link can be altered to reach another Guest's"* — every read and write must derive its scope **from the token alone**, never from a Wedding id, Guest id or Function id in the request. If any `api/guest` method takes an identifier as a parameter, this rule is broken.
- *"A submitter never sees the guest list"* / *"A Guest sees the invitation and their own response"* and nothing else of the Wedding — the response shape must be incapable of carrying another Guest's data, the budget, the Vendors or the member list.
- Revocation at any time, and expiry on conclusion **or abandonment** — checked on **every** request, server-side, against current Wedding state. A previously issued token must stop working the instant the Creator revokes or abandons, with no client involvement and no cache.

None of this is stated. Given AD-16's warning about `frappe.get_all` and AD-18's own observation that a whitelisted method *"checks no DocType, no document and no role"*, an `allow_guest` method with a `get_all` in it and a wedding id parameter is a plausible first implementation, and it exposes every guest list on the platform.

**Add:** an AD saying the token is the sole authorization and the sole scope for `api/guest`; no `allow_guest` method accepts any identifier of a Wedding, Guest or Function; token validity is re-checked against Wedding state on every request (revoked / concluded / abandoned all deny); and the guest response schemas are defined so that cross-guest data has no field to travel in. Extend `check_whitelisted.py`'s remit to assert `allow_guest` methods take no scope parameter and carry `@rate_limit`.

**C-5.3 — `[MEDIUM]`** Link revocation and expiry are not in AD-23's list. Abandonment-triggered kill is action-driven and correct as such, but FR-72's "concluded" transition **is** time-triggered ("Wedding conclusion when the Chosen Block's last Function passes" is in the list) — the spine should say that conclusion is what expires the links, and that the Guest-contact erasure job at +30 days is a second, later step. As written, a reader could implement conclusion without killing the links, leaving live RSVP pages for thirty days past purpose.

**C-5.4 — `[MEDIUM]`** FR-11 requires every guest-form submission to arrive as a **suggestion** the Creator accepts or dismisses, never writing straight to the list — the spine's ER diagram shows `WEDDING ||--o{ GUEST` with no suggestion/pending state. This is the mechanism that stops a forwarded link handing away control of the guest list, and it is also the trigger for the immediate-erasure-on-dismissal rule AD-14 already commits to. Model the pending state, or AD-14's dismissal trigger has nothing to fire on.

---

## 6. GST and billing — FR-52, FR-54

**DOES NOT COVER.** The spine's entire treatment is a dependent clause inside AD-19 — *"so Desk formatting, print formats, reports and FR-52's GST invoicing work natively"* — plus an `Invoice` mentioned once in the Capability map. `Invoice` does not appear in the core-entity diagram at all.

"Works natively" is doing a great deal of unearned work. Currency formatting is not GST compliance.

### Findings

**C-6.1 — Tax by recipient State is unconstrained, and the default implementation is wrong. `[HIGH]`**

FR-52: *"Tax is determined by the recipient's State, not assumed from the operator's."* Research §6.3 and R57: Maharashtra recipient → CGST+SGST; out-of-State registered recipient → IGST; *"Never hard-code CGST+SGST"*; capture GSTIN and State at vendor onboarding.

Research §6.3 spells out why this is a **latent** bug: for a Shrirampur launch, CGST+SGST is correct in essentially every case. An implementer will hard-code it, every test will pass, and the defect surfaces the day the first Pune vendor with an out-of-State registration subscribes. This is precisely the "two units could choose incompatibly, and the wrong choice is invisible" situation a spine exists for, and the spine is silent.

**Add:** tax determination is a single server-side function driven by the recipient's registration State and GSTIN; no surface computes or assumes a tax split; GSTIN and State are captured at Vendor onboarding and are required before a paid Subscription can be taken.

**C-6.2 — The prepaid-term-as-advance rule has no architectural expression. `[HIGH]`**

FR-52: *"A prepaid term is an advance. The full tax liability falls in the period of collection and is not spread across the term."* Research §6.5 calls this *"the trap in a prepaid subscription model"* and R58 gives the clean design: issue the tax invoice **at the moment of payment**, which avoids the Rule 50 Receipt Voucher path entirely.

Nothing in the spine says when the invoice is issued relative to payment. The intuitive implementation — invoice on service period, or monthly recognition — produces a GST liability in the wrong period, which is a filing defect, not a display bug.

**Add:** invoice issuance is atomic with payment confirmation; there is no deferred or period-based invoice generation; the invoice date is the payment date.

**C-6.3 — Rule 46 invoice mechanics are unspecified, and the numbering rule is an integrity invariant. `[HIGH]`**

FR-52 requires a GST-compliant invoice downloadable at any time. Research R59 enumerates Rule 46: a **consecutive serial unique per financial year, ≤16 characters**, restricted character set, all mandatory fields, place of supply with State name, reverse-charge flag — plus credit-note/Refund-Voucher support **from day one** (*"retrofitting GST document types is painful"*), and R62's advice to shape the numbering for IRN now.

A consecutive-per-FY serial with no gaps is a concurrency and immutability requirement, not a formatting one — it is the same class of problem AD-11 solved properly for Slot blocking with a database constraint, and it deserves the same treatment. Frappe's naming series gets close; the FY reset, the 16-character ceiling and the no-gaps property need stating.

An issued invoice is also **immutable** — a correction is a credit note, never an edit. That is the same append-only problem as C-4.1, with the same Desk-shaped hole: an Admin editing an issued invoice in Desk is a tax offence, not a data-entry correction.

**Add:** an AD covering invoice numbering (per-FY series, ≤16 chars, no gaps, enforced by the database), invoice immutability once issued (controller guards, corrections as credit notes only), the Rule 46 required-field set as a validation, and credit-note/Refund-Voucher documents present from the first release. Add `INVOICE` to the core-entity diagram.

**C-6.4 — The stack line invites the exact Razorpay product FR-54 forbids. `[HIGH]`**

Stack: *"Razorpay standard checkout (subscriptions only)"*. FR-54: *"There is no auto-renewal, standing mandate or stored instruction to collect. Every term is paid by a deliberate act."* FR-53 turns the reminder into the renewal mechanism precisely because nothing collects automatically.

"Razorpay … subscriptions" reads, to anyone who knows the vendor, as Razorpay **Subscriptions** — the recurring-mandate product built on eMandate/UPI AutoPay, which is a standing instruction to collect. The intended meaning is "checkout, used only for Subscription payments", but the phrasing is one word away from the opposite, and this is the kind of ambiguity a spine is supposed to remove. Research R24 also lists the subscription trap among the dark patterns, and requires cancellation to be as easy as subscription and self-serve.

**Add:** state it as an invariant, not a parenthetical — *one-time Razorpay Orders only; no Subscriptions API, no eMandate, no UPI AutoPay, no saved payment instrument, no stored token*. It is a one-line change that removes a genuinely costly misreading. Add self-serve in-portal cancellation as an explicit requirement.

**C-6.5 — `[MEDIUM]`** The ₹0 Founding Vendor tier: AD-10 correctly treats it as an active Subscription for availability purposes, and FR-51 requires it to carry no obligations (research R60: any condition is non-monetary consideration and makes the supply taxable). The architectural consequence worth stating is that the ₹0 tier must produce **no invoice and no tax document** — a ₹0 tax invoice implies a supply. And per R61 the cohort needs a related-party screen, which is a data field on the Vendor, not a policy.

**C-6.6 — `[MEDIUM]`** Research R25 requires the subscription price shown **inclusive of GST, all-in, before payment** (drip pricing). AD-19 says clients never compute money and receive a number to render — which is the right mechanism — but the spine should say which number: the GST-inclusive total is what the payment surface displays, with the split shown, never a pre-tax figure that grows at checkout.

---

## 7. Accessibility — NFR 5.8

**DOES NOT COVER.** The strings "WCAG" and "accessib*" appear **zero times** in the spine.

The Deferred section routes *"UX, screens and component structure"* to `bmad-ux`, and most of WCAG genuinely belongs there. But three parts of NFR 5.8 are cross-client contracts of exactly the kind this spine exists to fix — things two independently-built units will otherwise choose incompatibly — and one of them is already sitting in a spine-governed artifact.

### Findings

**C-7.1 — The non-colour-indicator rule is a three-client contract with no shared home. `[MEDIUM]`**

NFR 5.8: *"Nothing essential is conveyed by colour alone — verified status, availability and paid placement each carry a non-colour indicator."*

Those three states appear in the Family app (Expo/NativeWind), the vendor portal (Next.js/Tailwind 4) and the Guest pages. Three teams, three stacks, three chances to render a green dot and call it done — and paid placement is simultaneously a consumer-law obligation (research R13: legible at the smallest viewport, in light and dark themes, on every surface). This is the same problem AD-24 solves for vocabulary and AD-19 solves for money formatting, and it deserves the same solution.

**Add:** the indicator vocabulary for verified / available / promoted lives in `packages/shared` beside the tokens and the money formatter, and each carries a text or shape affordance, not only a colour. One definition, three consumers.

**C-7.2 — The accessibility-locked token is not protected. `[MEDIUM]`**

NFR 5.10: *"One token in the palette is an accessibility decision, not an aesthetic one. The muted text colour was deliberately darkened to meet contrast on white. It must not be lightened, whatever a future design pass prefers."*

`packages/shared` is a spine-governed artifact — AD-4 governs its generated zod, AD-19 puts the money formatter there. The spine mentions the tokens file three times and never mentions that one of its values is a compliance constraint that a routine design pass will otherwise revert. A future agent doing a visual polish has, in this document, no reason not to lighten it.

**Add:** one line in the Conventions table or beside AD-19's formatter — the muted text token is contrast-locked; changing it requires a contrast check, not a design preference. A contrast assertion in the commit gate would make it tier 2 cheaply.

**C-7.3 — The two public Guest pages are the hardest accessibility case and get no architectural support. `[MEDIUM]`**

NFR 5.8 includes them *"deliberately"*, and gives the reason: *"many who reach it do so because someone forwarded the link, and none of them chose to be there at all."* These pages are opened by elderly relatives, on cheap Android phones, over poor connections, with no onboarding and no account.

The architectural implications are real and belong here rather than in a UX doc: these pages should render server-side and be usable without a heavy client runtime, must degrade to a working form, and must meet contrast and target-size requirements on a low-end viewport. The spine specifies `apps/guest-web` as "Next.js · Guest — RSVP + guest form" and says nothing about rendering strategy — which is, for these two pages specifically, an accessibility and reach decision as much as a performance one.

**Add:** a line in the Guest-surfaces row of the Capability map or in AD-28 (C-5.1) stating that the public Guest pages render server-side, work without client-side JavaScript for the primary action, and are held to WCAG 2.1 AA as a release condition — and note that the FR-12 link preview is generated server-side for the same reason.

**C-7.4 — `[LOW]`** NFR 5.8 covers *"the admin panel"* too. The admin panel is Frappe Desk, whose accessibility Vivah Spot does not control. Worth one honest line in Deferred or Conflicts rather than an unexamined claim of AA across every surface.

---

## Consolidated: what to add

Ordered by severity. Nine of these are new or amended invariants; the rest are one-line additions to existing ADs.

| # | Add | Where | Severity |
|---|---|---|---|
| 1 | Controller guards (`before_save`/`on_trash` throw) **plus a hash chain** on `Agreement Record`; forbid `db.set_value`/`db.sql` on evidential DocTypes | AD-12, AD-16 | CRITICAL |
| 2 | No platform-supplied value on any Agreement/Quote term — no `default`, no `fetch_from`, no `Property Setter` — gated at tier 2 | new AD-26 | CRITICAL |
| 3 | Grievance entity + reference number + no-login intake; two statutory tracks with two clocks | new AD + ER + `api/guest` | CRITICAL |
| 4 | Removal as a state independent of verification, with ground/authority/actor; **removal is never a delete**; 180-day retention added to AD-14's ladder and AD-23's jobs | new AD, AD-14, AD-20, AD-23 | CRITICAL |
| 5 | Consent as a first-class, per-purpose, append-only, withdrawable record; add `CONSENT` to the entity diagram | new AD-27 | CRITICAL |
| 6 | Guest-link model promoted to an AD: token is sole authorization and sole scope for `api/guest`; no scope parameters; revocation/expiry checked per request; mandatory `@rate_limit`; server-side `noindex` header | new AD-28 | CRITICAL |
| 7 | Guest-contact access control: `permlevel` gate + read logging; record the FR-61 conflict upstream | AD-14, Conflicts | CRITICAL |
| 8 | Breach: incident record, access logging sufficient to enumerate affected principals, 72-hour DPDP / 6-hour CERT-In noted as hosting constraints | new AD + Deferred + NFR 5.9 | CRITICAL |
| 9 | Repeat-infringer anchor: salted one-way hash surviving erasure and re-registration; second exception in AD-14 | AD-14 | HIGH |
| 10 | Digest over the **frozen rendered artefact**; serve that artefact for FR-40 downloads; log that each party took a copy | AD-12 | HIGH |
| 11 | Capture certificate inputs at confirmation — app/deploy version, host identity, terms version, custodian of record | AD-12 | HIGH |
| 12 | Rewrite the RFC 3161 deferral as an accepted-cost decision; add NTP-to-NIC/NPL, UTC storage, and operating-properly evidence | Deferred, Conventions | HIGH |
| 13 | No-login rights channel (access / correction / erasure) as a third public Guest surface, linked from the invitation | source tree, Capability map | HIGH |
| 14 | Guest as a distinct data class: never a PERSON row, never joined to PERSON, never deduplicated across Weddings | AD-14 | HIGH |
| 15 | Tax determined by recipient State from a single function; GSTIN + State required before a paid Subscription | new AD | HIGH |
| 16 | Invoice issued atomically with payment (advance treatment); no period-based generation | new AD | HIGH |
| 17 | Invoice numbering (per-FY, ≤16 chars, no gaps, DB-enforced) and invoice immutability; credit notes / Refund Vouchers from day one; add `INVOICE` to the entity diagram | new AD, ER | HIGH |
| 18 | "One-time Razorpay Orders only — no Subscriptions API, no eMandate, no AutoPay, no stored instrument"; self-serve cancellation | Stack, AD-19 | HIGH |
| 19 | Quarterly terms advisory added to AD-23's list (and re-count the list against FR-63) | AD-23 | HIGH |
| 20 | Availability returned as an attributed structure, never a bare boolean | AD-10, AD-4 | HIGH |
| 21 | Search returns organic and promoted as two disjoint collections; label is a required field | AD-22 | MEDIUM |
| 22 | Payment module importable only from the Subscription handler; state whether ERPNext is installed | AD-19, AD-1 | MEDIUM |
| 23 | Non-colour indicators for verified / available / promoted defined once in `packages/shared` | Conventions | MEDIUM |
| 24 | Muted-text token marked contrast-locked; contrast assertion in the gate | Conventions | MEDIUM |
| 25 | Public Guest pages: server-rendered, work without client JS for the primary action, WCAG 2.1 AA as a release condition | Capability map / AD-28 | MEDIUM |
| 26 | Guest-form submissions modelled as pending suggestions (gives AD-14's dismissal trigger something to fire on) | ER, AD-14 | MEDIUM |
| 27 | Link expiry tied explicitly to the conclusion transition, ahead of the +30-day erasure | AD-23 | MEDIUM |
| 28 | Encryption at rest for contact data; processing logs retained ≥1 year | Deferred / new AD | MEDIUM |
| 29 | No consent control ships pre-checked; consent controls come from `packages/shared` | Conventions | MEDIUM |
| 30 | Hosting decision constrained to India-region with 180-day in-India ICT logs and NTP discipline | Deferred | MEDIUM |
| 31 | Grievance-officer contact, ranking disclosure (R9) and the "no payments, and why" disclosure (R12) reachable without login from every surface, Guest pages included | Capability map | MEDIUM |
| 32 | ₹0 Founding tier issues no tax document; related-party screening field on Vendor | AD-8 / AD-19 | MEDIUM |
| 33 | GST-inclusive all-in price is what the payment surface renders | AD-19 | MEDIUM |
| 34 | Frappe Desk's own WCAG conformance is outside the platform's control — state it | Deferred / Conflicts | LOW |
| 35 | Eight-year Agreement retention and its purge added to AD-23's job list | AD-23 | LOW |

## Conflicts to add to the spine's upstream table

| Conflict | Why it must be recorded |
|---|---|
| **FR-61 "Admin has every capability" vs FR-61's own "Guest contact access is confined and logged", NFR 5.7, FR-43 and DPDP Rule 6** | Desk-on-DocTypes plus unrestricted Admin defeats append-only records, the un-erasable audit log, and Guest-contact RBAC. The PRD asserts both sides of this and the architecture has silently chosen the first. |
| **FR-63's 180-day retention of removed content vs AD-14 / AD-23 erasure** | Two rules, two stories, no stated precedence. The erasure job will destroy the takedown evidence. |
| **FR-63's repeat-infringer register vs AD-14's per-record erasure token** | The register requires an identity that survives erasure and re-registration; AD-14 as written guarantees it does not. |
| **NFR 5.8 "every surface" vs Frappe Desk as the admin panel** | Third-party conformance the platform does not control. |

## What this review did not examine

Reviews (FR-44..FR-49) against IS 19000 and the defamation exposure in FR-47's structured vendor→family feedback; the E-Commerce Rule 5(3) vendor-disclosure fields (geographic address, customer-care number) as a Listing data requirement; TRAI/DLT if SMS fallback is ever used for anything user-facing; and the Rule 4(2) entity-disclosure surface. Each touches the architecture lightly, and each is a live obligation in the research.

---

*Reviewed against `prd.md` FR-11, FR-12, FR-20, FR-39–FR-43, FR-50–FR-54, FR-58–FR-64, FR-69, FR-72, NFR 5.5–5.10, §7.1, §7.2, §7.9; and `research-india-regulatory.md` R1–R81.*
