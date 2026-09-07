---
review: closure
lens: 'Did the revision actually close the four review gates, and what did it break doing so?'
target: '_bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md'
reviewed_against:
  - reviews/review-rubric.md
  - reviews/review-versions.md
  - reviews/review-compliance.md
  - reviews/review-adversarial.md
driving_spec: '_bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/prd.md'
date: '2026-09-06'
verdict: 'CHANGES REQUIRED — 17 of 43 CRITICAL/HIGH findings closed, 12 partially, 14 not closed; the revision introduced 8 new defects, two of them structural.'
---

# Closure Review — ARCHITECTURE-SPINE.md (revised)

## Verdict

The revision does real work. AD-26 through AD-34 close whole dimensions that were silent — auth, media, guest surfaces, idempotency, consent, takedown, billing — and three of the four adversarial CRITICALs are genuinely dead: abandoning Frappe's cancel-and-amend flow (AD-12) kills the slot-release race outright, AD-27 shuts the Frappe Desk bypass, and AD-6 now decides the per-Service storage shape one way and records the cost.

But the closure is uneven along one axis: **findings that needed a decision are closed; findings that needed a mechanism are restated.** AD-32 says a breach "is detectable and reportable within 72 hours" and enforces it by schema review. AD-34 says tax follows the recipient's State and names no function. The evidential cluster (C-4.2, C-4.3, C-4.4) — the frozen rendered artefact, the certificate's contemporaneous inputs, the unreachable RFC 3161 trigger — is untouched, and it is the cluster whose failure is invisible until an Agreement is needed in court. Five of the seven adversarial HIGHs (Rules shape, Selection cardinality, Enquiry parentage, running budget, snapshot identity) are untouched.

And nine new ADs plus ten rewrites bought new surface. Two of the new defects are structural, not cosmetic: **AD-26 forbids the exact entry points two of its six cascades must fire from**, and **the AD-10 rewrite silently deleted the spine's only home for NFR 5.6** — the rule that no availability is ever presented as fact, which FR-13 and FR-29 both state and which the spine now mentions nowhere.

---

## Part 1 — Closure

Scored strictly: an AD closes a finding only when its **Rule** prevents the divergence. Naming the topic, restating the requirement, or enforcing by "review (tier 3)" what the finding said review cannot catch is **PARTIALLY CLOSED** at best.

### Tally

| Review | CRITICAL | HIGH | Closed | Partial | Not closed |
|---|---|---|---|---|---|
| Rubric | 3 | 7 | 6 | 2 | 2 |
| Compliance | 10 | 12 | 7 | 8 | 7 |
| Adversarial | 4 | 7 | 4 | 2 | 5 |
| Versions | 0 | 0 | (5 of 5 non-critical closed) | — | — |
| **Total** | **17** | **26** | **17** | **12** | **14** |

The versions review carried no CRITICAL or HIGH; its five findings are all closed and are walked in §1.4 for completeness.

---

### 1.1 Rubric review

| # | Sev | Verdict | Basis |
|---|---|---|---|
| A-1 Auth/session silent | CRITICAL | **PARTIALLY CLOSED** | AD-28 fixes identity (mobile number), no password, OTP issuance in `api/`, six digits / ten minutes / five attempts / three resends per hour server-side, ninety-day sessions per device, passkey/Google/Apple as linking-only, dual Family+Vendor roles with the acting role resolved explicitly. Three of the finding's four required outputs are there. **Missing:** the finding's own fix list ends with "an explicit statement of what `User.name` is" — absent (see A-6, which is the same hole). Also unstated: how a ninety-day session is represented against Frappe's default `session_expiry`, and which clients are exposed to CSRF (AD-18 mentions CSRF without saying to whom it applies). |
| A-2 Only 2 of FR-14's 5 Engagement Models modelled | CRITICAL | **CLOSED** | AD-10's Engagement Model table dispatches on all five; AD-9 gives rental period a `DATE` range and lead time a required-by `DATE`; AD-11 states which models create occupancy rows and which create none. FR-14 is cited in AD-10's Binds and quoted in AD-11's Rule. Residual (cosmetic): FR-14 is still absent from AD-9's and AD-11's Binds, which the finding named as "the minimum". |
| A-3 AD-8's list ≠ FR-62's list | CRITICAL | **CLOSED** | AD-8 now carries Engagement Model, Sizing Attribute, Order Basis, pricing model, has-Spaces, filters and comparison attributes, and says explicitly what is **not** data (field set, behaviour). The Conflicts row names both halves. Residual: AD-5's Binds still reads "availability, pricing, sizing, order basis" in lower case, which is the AD-24 Glossary breach the finding also flagged. |
| A-4 Conflicts row understates AD-6 | HIGH | **CLOSED** | Row now reads "AD-5 / AD-6 vs FR-62, UJ-4 … not for its behaviour or its field set." |
| A-5 FR-53's four routes split across AD-10/AD-20 | HIGH | **PARTIALLY CLOSED** | AD-26 gives the **cascade** one owner and names all four routes plus the FR-59/FR-71 condition as an event rather than a read-time check. But the finding asked for one `is_discoverable(listing)` **predicate**, folding AD-10's subscription clause and AD-20's verification clause into it. AD-10 still carries the Grace Period gate; AD-20 still says "the public read path filters on it"; AD-26 adds a third owner. The read-time predicate is now split three ways, not one. (Adversarial M-1 asked for the same fix and is equally open.) |
| A-6 AD-14 does not reach Frappe's identity trail | HIGH | **NOT CLOSED** | AD-14 is unchanged on this point. `User.name` appears nowhere in the spine. AD-28 makes the mobile number the identity and never says what the Frappe `User` record is named — so the obvious reading (phone as `User.name`) still stamps the identifier onto `owner`/`modified_by` of every row and into `Version`, `Comment`, `Activity Log`, `Communication`, `Email Queue`, `Access Log` and `Route History`, which AD-14 declares solved. |
| A-7 AD-12's "no update path in code" leaves Desk open | HIGH | **CLOSED** | AD-12 now enforces by "controller guard per AD-27 (tier 1)", and AD-27 names Agreement immutability and un-updatable record rows in its list. The hash chain makes a sub-controller edit detectable. Residual: deletion of an `Agreement Record` row is still unnamed (`on_trash`), and no chain-verification job exists (see ND-13). |
| A-8 Agreement identity across an Amendment undecided | HIGH | **CLOSED** | Decided, and decisively: "Frappe's built-in cancel-and-amend flow is not used for Agreements at all; `docstatus` 2 means a real cancellation and nothing else." AD-13 rewritten so both ADs now say one thing. This also closes adversarial C-1. |
| A-9 Four silent dimensions + NFR 5.8 + 5.5 access right | HIGH | **CLOSED** | Migrations → Conventions row (naming AD-11's composite index, seed Services, Slot values, Place roots, `patches.txt`). Media → AD-29. Async/idempotency → AD-31. Observability → a Deferred entry hung off hosting. NFR 5.8 → Conventions row. NFR 5.5 access right → AD-32. The finding's stated minimum was four Deferred entries; it got two ADs and two entries. |
| A-10 Place hierarchy has no representation | HIGH | **NOT CLOSED** | "Place" appears four times (AD-6's coverage field, AD-8's "opening a Place at any level", AD-22's shrinkage prior, the Migrations row's "Place hierarchy roots"). No nested-set / adjacency / materialised-path decision, and no `PLACE` entity in the ER diagram. FR-33's ancestor-containment query sits on the hot search path and is still free for two units to choose. |

Out of scope for the strict walk but verified, since they were the rubric's next tier: **A-11** (engagement cascade seam) is largely closed by AD-26, minus FR-32's commit boundary — AD-26 never says the cascade is transactional with the successful confirmation, which FR-32 requires. **A-12** (two wrong tier claims) is **not closed**: AD-21 still says "type checking at the boundary (tier 1)" with no Python type checker anywhere, and AD-11 still says "the database (tier 1 by construction)". **A-13** (polymorphic column, "over blocking rows") is **partially closed** — the phrase "over blocking rows" is gone, but the polymorphic `resource` column is unchanged and the NULL trap has moved into the rental case (ND-7). **A-14** is closed (twelfth job added). **A-18.1** (AD-24's gate cannot reach the out-of-tree backend) is unchanged.

### 1.2 Compliance review

**CRITICAL**

| # | Verdict | Basis |
|---|---|---|
| C-1.1 No bar on platform-authored/defaulted terms | **PARTIALLY CLOSED** | AD-27's last clause states the rule and names a Property Setter as "a defect, not configuration" — the right rule. But (a) it covers **Agreement** term fields only; the finding named Quote and Amendment fields too, and a Quote is where a Vendor's terms are first proposed; (b) the enforcement is "controller guards (tier 1); review" — a controller cannot distinguish a Property-Setter default from a value the Vendor typed, and the finding said explicitly "it must be tier 2, not review: review does not run when an Admin edits a Property Setter." No startup or scheduled assertion over Property Setters exists. |
| C-2.1 No grievance entity or public intake | **CLOSED** | AD-33 makes a grievance a first-class record with a quotable reference, no-login reachability from every surface, acknowledgement, seven-day disposal and the SLA clocks; `GRIEVANCE` is in the ERD; the Capability map has a row. Residual: the two statutory tracks (24-hour intermediary acknowledgement vs the consumer 48-hour/1-month clock) are still collapsed, and the intake endpoint has no home (ND-12). |
| C-2.2 No takedown state | **CLOSED** | AD-33: "Content visibility has two independent axes: verification (AD-20) and takedown. A takedown … is never cleared by re-verification", carrying ground, authority and acting Admin, recorded per AD-27. |
| C-2.3 180-day retention collides with erasure | **PARTIALLY CLOSED** | AD-33 states the precedence ("retention wins and the person is told which basis applies") — the important half. But AD-14's ladder was not amended to carry it, "removal is a state transition, never a delete" is not stated anywhere, and the 180-day purge is **absent from AD-23's twelve** (ND-13) — so the erasure job the finding predicted would destroy the evidence still has no counterpart job to stop it. |
| C-3.1 Consent not modelled | **CLOSED** | AD-32 records the basis per datum, captures consent per purpose with what and when, makes withdrawal as easy as granting, and propagates withdrawal to what was derived (FR-66); `CONSENT` is in the ERD. Residual: not stated as append-only, and the notice version in force is only implied by "what was consented to". |
| C-3.2 Breach detection and 72-hour notification | **NOT CLOSED** | AD-32's Rule ends "A personal-data breach is detectable and reportable within 72 hours." That is the requirement restated, not a mechanism, and the AD's Enforced-by ("schema review of any new personal-data field") cannot produce it. The finding's architectural quarter — access logging sufficient to enumerate affected principals, and an incident record — is absent. Nothing in the spine can answer "who was affected". |
| C-3.3 Desk gives every Admin unlogged Guest-contact access | **NOT CLOSED** | No `permlevel` on Guest contact fields, no read logging (the Logging convention row still attributes only actions that **change** things), and the FR-61 tension is still not in the Conflicts table. AD-27 closed the write side of the Desk hole and left the read side exactly as the compliance review found it. |
| C-4.1 Append-only enforced by "no update path in code" | **PARTIALLY CLOSED** | Two of the finding's three fixes landed: controller guards via AD-27, and the hash chain (with the previous row's digest stored) that converts a sub-controller edit into a detectable one. Not landed: the `on_trash` guard (append-only with a delete path is not append-only — the finding's own words), the statement in AD-16 that `db.set_value`/`db.sql` are forbidden on evidential DocTypes, and the scheduled chain verification the finding asked be added to AD-23. |
| C-5.1 Guest-link model is a Conventions row | **CLOSED** | Promoted to AD-30 with Prevents and Enforced-by: unguessable, revocable, expiring tokens; `@rate_limit` per token and per IP; `noindex` served as a response **header** rather than a client meta tag. Residual: no entropy floor (CSPRNG ≥128 bits), no constant-time comparison, and the FR-12 link-preview carve-out is not stated, so a future agent may "fix" the previewer in one direction or the other. |
| C-5.2 `api/guest` has no authorization invariant | **CLOSED** | AD-30: fixed DocType never from input; a token addresses exactly one Guest of one Wedding and cannot be altered to reach another; the response shape — not the page — is what limits exposure; guest-form submissions arrive as suggestions the Creator accepts or dismisses (which also gives AD-14's dismissal trigger something to fire on, closing C-5.4). Residual: "no `allow_guest` method accepts a Wedding/Guest/Function identifier" is implied, not stated, and per-request revalidation against current Wedding state is implied by "expires when the Wedding concludes or is abandoned" rather than required. |

**HIGH**

| # | Verdict | Basis |
|---|---|---|
| C-1.2 Availability attributed, not asserted | **NOT CLOSED — regressed** | The finding said AD-10's attribution clause was a rendering convention rather than a shape. The rewrite deleted the clause. See ND-3: NFR 5.6 is now cited nowhere in the spine, and neither is the word "attributed" in an availability sense. |
| C-2.4 Repeat-infringer anchor | **PARTIALLY CLOSED** | AD-33 keys the register on AD-14's token and AD-14 says the token is "stable **per person**". The finding's failure mode is precisely that a removed fraudster who erases and re-registers on the same number gets a **new** person record and therefore a new token. No salted one-way anchor over a re-registration-invariant identifier (phone, PAN/GSTIN) exists, and AD-14 records no second exception. The register still cannot link what it exists to link. |
| C-2.5 Quarterly terms advisory | **CLOSED** | Twelfth entry in AD-23, named explicitly. |
| C-3.4 No-login rights channel | **PARTIALLY CLOSED** | AD-32 states the right ("including one who never held an account … `guest-web` carries that surface"). But erasure-on-request is not named alongside access and correction; the source tree still describes `apps/guest-web` as "RSVP + guest form"; there is no identity-proof rule (the finding proposed an OTP to the number in question); and the endpoint has no lawful home under AD-30 (ND-12). |
| C-3.5 Guest as a distinct data class | **NOT CLOSED** | AD-14's opening sentence is unchanged — "every record references one person record" — which read literally puts Guest numbers in `PERSON`, where the erase-outright rule and the pseudonymise-and-retain rule then collide on one table. No rule forbids joining GUEST to PERSON or deduplicating Guests across Weddings, which is the purpose-limitation breach FR-12 exists to prevent. |
| C-4.2 Digest over the rendered artefact | **NOT CLOSED** | AD-12 still digests "the serialised frozen terms verbatim". No frozen PDF/A, no rule that FR-40's download serves the frozen artefact instead of a re-render, no log that each party took a copy. |
| C-4.3 RFC 3161 trigger unreachable; NTP/UTC/operating-properly | **NOT CLOSED** | The Deferred entry is unchanged, including the trigger the finding proved can never fire usefully ("the first time an Agreement record is needed as evidence"). No NTP-to-NIC/NPL discipline, no UTC storage rule (Conventions still says only "Asia/Kolkata"), no uptime/incident/deploy evidence for BSA s.63(2)(c). |
| C-4.4 Certificate inputs not captured | **NOT CLOSED** | AD-12's snapshot row gained the previous digest and nothing else. App/deploy version, host identity, terms/format version and custodian of record — all contemporaneous facts, none reconstructible in year eight — are still uncaptured, while AD-12 still asserts "FR-43's certificate is generated from these rows." |
| C-6.1 Tax by recipient State | **PARTIALLY CLOSED** | AD-34 states the rule ("determined by the **recipient's** State, never assumed from the operator's"). Not stated: that it is a single server-side function no surface duplicates, and that GSTIN + State are captured at onboarding and required before a paid Subscription. The latent hard-coded CGST+SGST the finding predicted is still available to a Shrirampur-only implementer. |
| C-6.2 Prepaid term as advance | **PARTIALLY CLOSED** | AD-34 carries the tax-period rule ("an advance whose full liability falls in the period of collection"). It does not say the invoice is issued **atomically with payment confirmation** and that no period-based generation exists, which is the mechanism that produces the right period. |
| C-6.3 Rule 46 numbering and immutability | **PARTIALLY CLOSED** | "An issued invoice is immutable and consecutively numbered; a correction is a credit note, never an edit" plus a tier-1 controller guard; `INVOICE` is now in the ERD. Missing: the per-financial-year reset, the ≤16-character ceiling, the no-gaps property enforced by the database (the finding's point was that this is the same class of problem AD-11 solved with a constraint), the Rule 46 field set, and credit-note/Refund-Voucher documents present from day one. |
| C-6.4 Razorpay line invites the forbidden product | **CLOSED** | AD-34, the Stack's unpinned list and the Conflicts table all now say one-time checkout per term and name what is forbidden. Over-closed, in fact — see ND-14(b). |

Non-CRITICAL/HIGH spot checks: **C-1.3** (Featured band) partially closed — AD-22 now carries "a separate marked band, never inside the organic ordering", but not the two-disjoint-collections shape. **C-1.4** partially closed — AD-34 bars the money path in words; the import restriction and the ERPNext question are unanswered. **C-2.7** and **C-3.6** not closed (hosting is not constrained to India-region, no in-India ICT log retention, no encryption-at-rest rule). **C-7.1/7.2/7.3** partially closed by one Conventions row; the shared-component home, the contrast-locked token and the guest-page rendering strategy are unstated. **C-7.4** regressed — see ND-18.

### 1.3 Adversarial review

**CRITICAL**

| # | Verdict | Basis |
|---|---|---|
| C-1 Cancel-then-amend releases the Slot | **CLOSED** | AD-12: "An Amendment appends `seq+1` and never touches `docstatus`. Frappe's built-in cancel-and-amend flow is not used for Agreements at all… Occupancy release is keyed to the explicit cancellation event, never to `on_cancel` as a proxy." The race is structurally impossible because the cancel step no longer happens. Residual: an Amendment that **moves** days or Slots (FR-69 permits it) still needs the row-set transformed in one transaction, new rows before old — AD-12 does not say so. |
| C-2 No home for cross-entity operations | **PARTIALLY CLOSED** | AD-26 creates `domain/`, names six cascades, gives each exactly one implementation, and correctly insists the FR-59/FR-71 condition raises an event rather than being a read-time check. But its Rule authorises only `api/` and the scheduler to call it and forbids controllers — and two of its six cascades can only originate at the DocType layer. See ND-1; this is the most serious thing in Part 2. |
| C-3 Desk bypasses every `api/` guard | **CLOSED** | AD-27 is exactly the tightening asked for, including the actor-rule/state-invariant split (FR-39's self-dealing bar, FR-59/FR-71 conditions of listing, FR-46 review immutability, FR-43's freeze all named), and the Design Paradigm now records the cost ("what makes AD-27 mandatory") instead of selling the bypass as pure upside. |
| C-4 Two storage shapes for per-Service attributes | **CLOSED** | AD-6: "There is no second storage shape for Service attributes: no key/value child table, no JSON blob. Adding or removing a field is a schema change and therefore a release." Decided one way rather than split; the Conflicts table records the PRD amendment. Legitimate resolution of the finding. |

**HIGH**

| # | Verdict | Basis |
|---|---|---|
| H-1 Occupancy set per Service; Span closure | **CLOSED** | AD-10 evaluates "**only** the Functions that Service serves within the Block — never the whole Block". AD-11 expands a Span "from the first served Function's start Slot to the last one's end Slot, **inclusive of every Slot between them and the overnights**". Both ambiguities gone. The worked example is not in the AD, but the rule no longer admits the wrong reading. |
| H-2 Boolean return; FR-13 needs five states | **PARTIALLY CLOSED** | AD-10's prose now covers three of the states (no Anchor Date, no duration, past Grace Period) and forbids rendering them as unavailable. It does **not** enumerate the return type, does not forbid a boolean, and — with the attribution clause deleted (ND-3) — has lost the shape argument entirely. The finding's point was that this enumeration must be fixed before it is frozen into `api/family/v1` under AD-3. It is not fixed. |
| H-3 Snapshot copies identity AD-14 forbids copying | **NOT CLOSED — aggravated** | AD-12 still stores the terms "verbatim"; AD-14 still says no record copies a person's name or number and has no `Agreement Party Attestation` exception. The revision made it worse: the new hash chain means pseudonymising a snapshot under NFR 5.5 now breaks a chain the spine relies on to detect tampering. The two ADs still cannot both be true of the same row, and the digest raises the cost of choosing either. |
| H-4 Rules have no structured shape | **NOT CLOSED** | AD-6 still lists "Rules" as a Listing core field with no shape. No `Listing Rule` entity, nothing in the ERD, no rule that the prose is never parsed. AD-26 names "accepting a conflicting Rule (FR-32)" as a cascade — which gives the cascade a home while leaving it computing over data that does not exist. |
| H-5 Selection cardinality and Function set | **NOT CLOSED** | The ERD is unchanged (`SHORTLIST ||--o{ SELECTION`, no `SELECTION_FUNCTION`). Nothing says a Span Selection contributes once, and FR-8's named failure (₹7.2L posted for a ₹2.4L lawn) is still available. Note that AD-10's new phrase "the Functions that Service serves within the Block" **presupposes** the mapping this finding asked the spine to model — so the availability rule now depends on a shape the spine leaves free. |
| H-6 ERD hangs Enquiry off Selection | **NOT CLOSED** | `SELECTION ||--o{ ENQUIRY : "creator only"` is unchanged. FR-34's "one Enquiry to several Listings at once" still forces five Selections and five budget lines for five shortlisted caterers, and the Lead Dashboard still has nowhere to record the multi-send distinction SM-2 depends on. |
| H-7 Running budget has no owner | **NOT CLOSED** | No budget AD. The Mutation convention still says "DocTypes persist computed fields, written in `validate`", which is the reading that produces two writers. AD-26 arguably makes it worse by naming five cascades that each legitimately touch the total without saying who owns it. |

Verified spot checks on the mediums: **M-1** open (see A-5). **M-2** partially closed — the quarterly advisory landed, but four of the five missing triggers did not, and the conclusion anchor still drops FR-72's Agreement-days branch. **M-4**, **M-5**, **M-6**, **M-7**, **M-8**, **M-9**, **M-10**, **M-11**, **M-12** all unchanged. **M-3** partially closed (AD-4 still does not require `TypedDict` returns; the contract path is still `contract/family.v1.json`, so L-2 is open too).

### 1.4 Versions review

No CRITICAL or HIGH. All five findings closed:

- **F-1** — Stack now splits `Python (bench) ≥3.14,<3.15 — a single-minor window, not a floor`, `Node (bench) ≥24`, `Node (monorepo) ≥20`, and the Deferred hosting paragraph names both as a constraint that argues for the containerised option. Closed exactly as asked.
- **F-2** — Deferred entry "The TypeScript 6 / 7 split forfeits typed linting", with the `<6.1.0` peer range and the landing point on AD-4. Closed.
- **F-3** — "crashes in **vendor-web only** … mobile's lint runs and reports one real `react-hooks/set-state-in-effect` error". Closed.
- **F-4** — AD-17 now cites the mechanism (`db_query.py` OR-ing the share around the query conditions; the document path in `permissions.py`) with the version, and the invented Frappe quotation is gone. Closed.
- **F-5** — Moot and better than closed: AD-34 removes the recurring-mandate rail from the product entirely.
- LOW residuals still open: zod is pinned at 4.4.3 while 4.5.4 is what resolves in the tree (and AD-4 makes zod the client half of the contract); two React versions are listed without a word; `packages/shared`'s `api.mobile.v1` description drift is still not in the Conflicts table (also rubric A-19.1); and the Stack still says "Client versions read from `package.json` on disk" when `apps/guest-web` has no `package.json` (rubric A-19.2).

---

## Part 2 — New defects introduced by the revision

### ND-1 · CRITICAL — AD-26 forbids the entry points two of its six cascades must fire from

AD-26's Rule: *"Operations spanning more than one entity live in `domain/`, called by `api/` and by the scheduler, **never by a controller**."* The Design Paradigm agrees: *"A controller never imports `domain/`, `services/` or `api/`."* AD-1 adds: *"Frappe Desk consumes DocTypes directly and is never a client of `api/`."*

Now take AD-26's own six:

- **Removing a Vendor (FR-60)** is an Admin action. Admin acts in Desk. Desk sits on the DocTypes and may not call `api/`. The controller may not call `domain/`. There is no legal path from the act to the cascade.
- **A condition of listing ceasing to hold (FR-53 route 4)**, which AD-26 explicitly insists *"raises the same event as the other three; it is not a passive read-time check"*. The only place a Listing field change can be detected is the controller — which may not call `domain/`.

AD-26's Prevents names this exact problem — *"reachable from `api/`, the scheduler and Desk with no shared layer authorised to hold it"* — and its Rule then authorises `api/` and the scheduler and not Desk. **The Rule does not prevent its Prevents.** The adversarial finding it answers (C-2) was explicit that *every* entry point, "a whitelisted method, a scheduled job, a DocType controller hook, a Desk action", must call the same function.

Two units following the spine will produce exactly the outcome C-2 predicted: the scheduler route in `domain/`, the vendor-withdrawal route in `api/vendor/`, and the Admin and condition routes reimplemented in `Listing.on_update` because that is the only place they can live — three implementations, and FR-53's "no route removes a Listing from a Family's view without telling them" false on the two Admin cannot reach.

**Fix:** either allow controllers to import `domain/` (a downward import, so AD-1 is not violated — `domain/` sits above DocTypes and the controller would be reaching up, which is the real objection: state the carve-out and its bound), or route Desk actions through a `domain/` call in a Desk-side hook (`doc_events`) that AD-26 names as a fourth authorised caller. Either way the sentence "never by a controller" cannot stand beside cascades 4 and 5.

### ND-2 · HIGH — AD-26 gives one event two implementations, and misstates FR-60

The same sentence lists Admin removal twice:

> **a Listing leaving discovery** (FR-53 — all four routes, lapse, Vendor withdrawal, **Admin removal**, and a condition of listing ceasing to hold, behaving identically for Families); **removing a Vendor** (FR-60, the one route that also tells every affected Family)

Two defects in one line, in the AD whose rule is *"each has exactly one implementation"*:

1. **Admin removal is inside cascade 4 and is also cascade 5.** Two named cascades own one trigger.
2. **"the one route that also tells every affected Family" is wrong.** FR-53 says *"In every case … every Family holding it on a Shortlist or as a Selection is told"* and closes with *"No route removes a Listing from a Family's view without telling them."* FR-60's actual distinction is narrower and different: a Family holding an **Agreement** with a removed Vendor is told *the Vendor was removed* rather than merely that a Listing is gone, and the platform does not cancel the Agreement. As written, AD-26 tells an implementer that three of the four routes need not notify — contradicting FR-53, contradicting the clause immediately before it ("behaving identically for Families"), and contradicting AD-26's own Prevents.

### ND-3 · HIGH — The AD-10 rewrite deleted the spine's only home for NFR 5.6

The pre-revision AD-10 closed with *"Availability is never asserted as fact — every surface renders it attributed to the Vendor (NFR 5.6)."* The rewritten AD-10 does not contain it. Verified against the revised file: **`5.6` occurs zero times in the spine**, and "attributed"/"asserted" now appear only about Admin actions and account recovery.

This is not a minor deletion. FR-13 ends with *"**No availability is ever presented as fact.** Every availability display is attributed to the Vendor"*; FR-29 restates it as the reason the nudge model is honest (*"Because freshness rests on this and nothing stronger, no surface anywhere states availability as fact"*); NFR 5.10 gives the required wording. Three clients render this. It is the textbook cross-unit convention, and the spine now says nothing about it anywhere — not in AD-10, not in the Conventions table, not in the Capability map.

The compliance review's C-1.2 asked for the rule to be **strengthened** from a rendering convention into a return shape. The revision removed it instead.

### ND-4 · HIGH — AD-29 does not know about AD-33, so a court-ordered takedown stays on the CDN

AD-29: *"**Verified-and-within-allowance images are the only objects served from a public path.**"* AD-33, added in the same pass: *"Content visibility has two independent axes: verification (AD-20) and takedown."*

An image that is verified, within allowance and **taken down** satisfies AD-29's predicate. AD-29's Rule therefore leaves it on the public path — reachable by direct URL, which is precisely the bypass AD-29 exists to close, in the one case with a three-hour statutory clock (FR-63). AD-29's Binds (FR-27, FR-58, NFR 5.3, UJ-4) does not mention FR-63 or FR-49, and AD-33's Rule speaks about state and records but never about object storage.

Second half of the same defect: AD-29 defines only **promotion** — *"Promotion on verification **moves the object** into the public path"*. There is no demotion. An image that falls out of allowance on a Tier downgrade, on a Subscription lapse, or on a takedown must move back to private, and no AD says so. That movement is a cross-entity consequence of a subscription or moderation event and appears in neither AD-26's six cascades nor AD-23's twelve jobs.

### ND-5 · HIGH — AD-11's capacity has no declared source, and lives where AD-6 forbids reading it

AD-11: *"`seat` runs `0..capacity-1`, where capacity is 1 for a Space and **the declared bandwidth for a crew Service**."*

Walking Photography (FR-71's frozen table: per Function, Sizing Attribute **crew bandwidth**, no Spaces), three problems compound:

1. **"crew Service" is undefined.** It is not in the PRD Glossary, not an AD-8 declaration, and appears nowhere else in the spine. Nothing tells a unit which Services are crew Services. FR-71 gives crew bandwidth as a *Sizing Attribute*, and Sizing Attribute is per-Service data (AD-8); but Band Baaja Baraat shares it while Catering's Sizing Attribute is also "capacity", so the class boundary is genuinely unclear.
2. **The value is per Vendor, not per Service.** This photographer has two crews; that one has five. So the number is a Listing-level datum. AD-8's list of what is data does not include it, and AD-6 says the Listing core holds "Vendor, Service, all-in price, Rules, Commitment, verification state, portfolio, Place coverage" — no capacity. It can only live on the per-Service detail DocType.
3. **AD-6 then forbids reading it where it is needed.** *"Cross-Service reads (Block matching, running budget, Workspace) touch only the core."* Occupancy insertion at confirmation and AD-10's availability function are both cross-Service by construction — AD-10 dispatches over all five Engagement Models in one function. So the seat model requires a per-Service detail read from exactly the code path AD-6 says must not make one.

### ND-6 · HIGH — Every non-Space resource defaults to capacity 1, which caps Catering at one Function per Slot

AD-11's default is *"1 for a Space and the declared bandwidth for a crew Service"*. FR-71 configures **Catering** as per Function, no Spaces, Sizing Attribute *"capacity — the most they can serve"*. Catering is not a crew Service by any reading, so its capacity is 1, and a caterer who can serve two morning Haldis at two different weddings is refused the second by a database constraint.

This is verbatim the failure AD-11's own Prevents names — *"a crew-bandwidth Vendor being capped at one engagement per Slot when a photographer can shoot two weddings a day"* — relocated from photographers to caterers. The seat model fixed the case it was written for and left the general case worse, because it now looks decided.

### ND-7 · HIGH — Rental-period rows have no Slot, so the UNIQUE index silently never fires for them

AD-11: index over `(resource, day, slot, seat)`; *"A **rental period** expands to one row per day in the range, per inventory item, so the same index covers it."*

A rental day has no Slot — AD-9 says so explicitly (*"neither carries a time of day"*). So the `slot` column takes NULL or a sentinel, and the spine does not say which. **MariaDB permits unlimited duplicate rows containing NULL in a UNIQUE index**, so under the natural implementation the constraint never fires for the entire rental-period model, and jewellery rental double-books with no error and no signal. This is the same trap the rubric's A-13 identified for the polymorphic column, unfixed and relocated.

Two further gaps in the same clause. **"Inventory item" is a resource type modelled nowhere** — not in AD-6's core, not in AD-8's declarations, not in the ERD, not in the Conventions naming table. And rental capacity is expressed by *multiplying resources* (one row per item) while crew capacity is expressed by *seats on one resource* — two mechanisms for one concept, in the AD whose title is "capacity is part of it".

### ND-8 · MEDIUM-HIGH — Seat allocation turns a retryable collision into a user-visible decline

*"Confirmation takes the lowest free seat, and a unique violation is what makes it first-writer-wins."* With capacity ≥ 2, two workers both read "lowest free seat = 1" and both attempt seat 1; one wins, and the loser gets a unique violation even though seat 2 is free. AD-11's next sentence then fires the wrong consequence: *"On violation the Vendor is told which engagement conflicts (FR-39), and the Family's proposed terms return to the thread as declined-by-conflict."* A photographer with two free crews declines a wedding because of a millisecond. The rule needs "retry the next free seat; decline only when every seat is taken."

### ND-9 · MEDIUM-HIGH — AD-10's Engagement Model table has no Space dimension

FR-28: *"Availability is held per **Space** where the Service has Spaces, and per Listing where it does not"*, and AD-8 makes has-Spaces a Service declaration. AD-11 keys occupancy on a generic `resource`. But AD-10's table dispatches on Engagement Model **only**, and its Span row asks "is every `(day, slot)` … free" without saying of what.

Walk a Venue: three Spaces — a lawn, a hall, a smaller hall. A Family with a Candidate Block browsing the Listing before choosing a Space gets an answer the spine does not define: is the Listing available if *any* Space is free, or only if the one she has not yet chosen is? Discovery, comparison and the Shortlist all call this function (AD-10's Binds), and two units will answer differently — the exact failure AD-10's Prevents names ("four surfaces answering 'is this vendor free' differently").

### ND-10 · MEDIUM-HIGH — AD-10's no-duration row drops half of FR-28

AD-10 binds FR-28 and says of no duration: *"Excluded from matching. Presented **without an availability claim** — never as unavailable."* That is FR-13's half. FR-28 adds the other half: *"For a Service with no calendar, availability reduces to whether the Vendor is currently accepting Enquiries."*

Walking astrology: under AD-10 as written the astrologer is excluded from matching and carries no state at all, so a Vendor who has stopped taking work has no way to say so and keeps receiving Enquiries — and AD-22's first ordering signal (availability) is a flat tie across every astrology Listing, handing the whole ordering to the seeded shuffle. The dropped clause is the one that gives no-duration Services a signal.

### ND-11 · MEDIUM-HIGH — AD-8 makes structural declarations runtime-editable and nothing freezes them into existing rows

The revision moved **Engagement Model**, **has Spaces**, **Sizing Attribute** and **Order Basis** onto the Service row as Admin-editable data with no release. FR-62's closing consequence is unbound anywhere in the spine:

> **A configuration change never rewrites what already happened.** Existing Listings, Shortlists, Enquiries and Agreements keep the shape they were created under; a changed Service applies to what comes after it.

An Admin flipping Venue from Span to per Function, or turning has-Spaces off for a Service, changes the shape of occupancy rows already written, changes the answer AD-10 gives for a confirmed Agreement, and changes which resource AD-11's index is keyed on — retroactively, from a Desk form, with no release and no gate. Before the revision this could not happen because the Engagement Model was not declared data. AD-8 cites FR-62 in its Binds and does not carry FR-62's carry-forward rule.

### ND-12 · MEDIUM — AD-30 claims the whole `allow_guest` surface and governs only part of it

AD-30's Prevents: *"the whole guest model resting on a client — AD-18 governs logged-in methods, so **every `allow_guest` endpoint** would otherwise sit outside the only gate rule the spine has."* Its Rule then governs only token-addressed guest methods: rate-limited *per token*, addressing *exactly one Guest of one Wedding*, returning *that Guest's own invitation and answer*.

Three unauthenticated surfaces the same revision created fit none of that:

- **AD-28's OTP issue and verify.** By construction the caller is not logged in. These are the most-attacked endpoints in the product and they fall between AD-18 (logged-in) and AD-30 (token-addressed).
- **AD-33's grievance intake**, required *"reachable without a login from every surface"* — a photographer whose portfolio was stolen holds no guest token.
- **AD-32's rights surface** for *"one who never held an account"*.

AD-30 even Binds FR-63 while its Rule says nothing about grievances. Either AD-30's Rule must cover un-tokened `allow_guest` methods (rate limit per IP only, no scope from input, fixed DocType, explicit response shape), or a second rule must, and AD-30's Prevents must stop claiming the whole surface.

### ND-13 · MEDIUM — AD-23 claims completeness and omits the jobs the same revision created

AD-23's Prevents and closing line make completeness the whole point (*"a job with no listing is the defect"*). The twelve do not include:

| Missing timed job | Created by |
|---|---|
| 180-day purge of removed content and its records | AD-33 (new) |
| Agreement hash-chain verification and alert on mismatch | AD-12 (rewritten) |
| Eight-year Agreement retention boundary and purge | AD-12 / FR-43 |
| Guest-link expiry **at** conclusion — distinct from the +30-day contact erasure already listed | AD-30 (new) |
| Subscription active → Grace transition at term end | FR-53 (adversarial M-2, still open) |

Two ADs written in the same pass introduce timed obligations that the AD guaranteeing their existence does not list.

### ND-14 · MEDIUM — Three rules now stated in two or three places (UH-6, inside the spine)

- **(a) The public-image predicate.** AD-20: *"An image is publicly visible only if **verified** and **within the Tier's allowance**."* AD-29: *"Verified-and-within-allowance images are the only objects served from a public path."* One predicate, two owners — and ND-4 is what drift between them already looks like, one revision in.
- **(b) The no-mandate rule.** Stated in AD-34's Rule, again in the Stack's unpinned list (*"explicitly not Razorpay Subscriptions, e-mandate or UPI Autopay, which FR-54 forbids"*), and again in the Conflicts table. Three statements of one invariant; the Conflicts row is the one that earns its place (it records a source-document contradiction), and the Stack line duplicates the AD.
- **(c) Discoverability gating.** AD-10 owns the Grace Period gate, AD-20 owns the verification read path, AD-26 owns the leaving-discovery cascade. Rubric A-5 and adversarial M-1 both asked for one owner; the revision added a third.

### ND-15 · MEDIUM — Binds lists that do not match their Rules

- **AD-11** binds FR-39, FR-40, FR-42, FR-69 — but not **FR-28**, which is the FR its Rule implements (availability per Space or per Listing, vendor blocks, automatic Agreement blocking, release on cancel), and not **FR-14**, whose Span-continuity sentence the Rule quotes by name.
- **AD-10** binds **FR-34** (what an Enquiry carries — nothing in the Rule touches it) and omits **FR-53**, whose Grace Period rule the Rule actually implements.
- **AD-26** names FR-70, FR-59 and FR-71 as routes inside its Rule and binds none of them.
- **AD-30** binds **FR-63** though its Rule never addresses grievances (ND-12).
- **AD-31** binds *"AD-23's twelve jobs"* — an AD inside a list of requirements. Harmless, but it is the only Binds entry in the document that points at another AD rather than at the spec.

### ND-16 · MEDIUM — Cross-references point at an AD whose enumerated scope excludes them

No AD number in the revised spine is literally wrong — all `AD-n` citations resolve to the AD they intend. But **AD-27's list is written as exhaustive** (*"Named: …"*) and two other ADs cite it for rules it does not name:

- AD-34: *"a correction is a credit note, never an edit (AD-27)"* — invoice immutability is not in AD-27's list.
- AD-33: a takedown *"is recorded per AD-27"* — takedown records are not in AD-27's list either (the nearest is "an audit entry cannot be erased").

Either AD-27's list gains the two entries, or it stops presenting itself as closed.

### ND-17 · LOW — AD-13 now guards a divergence AD-12 has eliminated

With the amend flow abandoned and *"`docstatus` 2 means a real cancellation and nothing else"* (AD-12), AD-13's stated Prevents — a cooperative Amendment recorded as a walk-out — can no longer occur. What is left of AD-13 is its writer list, which is still non-exhaustive: FR-32's Rule-conflict cancellation and FR-60's Vendor side are both unassigned (adversarial M-12, still open). The AD should be re-pointed at the surviving problem or folded into AD-12.

### ND-18 · LOW — The accessibility row converted a silence into an unsupportable claim

New Conventions row: *"WCAG 2.1 AA on **all five surfaces**"*. Per the spine's own `scope`, the fifth surface is **Frappe Desk**, whose conformance Vivah Spot does not control. Compliance C-7.4 asked for the opposite — one honest line in Deferred or Conflicts. The revision instead asserts AA on a surface it cannot deliver AA on.

---

## Part 3 — Mermaid validity

All three blocks were extracted from the revised file and parsed programmatically with `mermaid.parse()` under jsdom, against **mermaid 11.17.2** and **mermaid 10.9.x** (GitHub's renderer line). **All three parse cleanly on both.**

| Block | Type | mermaid 10 | mermaid 11 |
|---|---|---|---|
| Design Paradigm | `flowchart-v2` (`graph TD`) | OK | OK |
| Surfaces and repositories | `flowchart-v2` (`graph LR`) | OK | OK |
| Core entities | `er` (`erDiagram`) | OK | OK |

Detail on the constructs that looked risky:

**Block 1 — `graph TD`.** Every label is quoted, so the commas, em dashes and `<br/>` tags are safe. `H["services/&lt;service&gt;/handler.py<br/>per-Service behaviour"]` uses HTML entities, which render as `<service>` under the default `htmlLabels: true`. **One rendering caveat, not a parse error:** a pipeline that sets `htmlLabels: false` (required by `flowchart-elk`, and used by some hardened doc renderers) prints `&lt;service&gt;` literally. `<br/>` degrades correctly in both modes. Declaring node `D` on its own line after it has been used as an edge target is legal.

**Block 2 — `graph LR`.** `subgraph vivsth["vivsth repo"]` uses the id-plus-quoted-title form, which needs mermaid ≥ 9.4 — satisfied by both versions tested. The `·` separator and the em dash in `subgraph bench["Frappe bench — separate repo"]` sit inside quoted strings and are inert. `-.->` dotted edges from `S` are well-formed, no subgraph/node id collides, and `OBJ` declared outside both subgraphs is legal.

**Block 3 — `erDiagram`.** Every cardinality token is valid: `||--o{` (one to zero-or-more), `||--||` (one to one), `||--o|` (one to zero-or-one). The unquoted role labels — `has`, `optional`, `publishes`, `categorises`, `carries`, `party`, `author`, and the hyphenated `auto-blocks` — all lex correctly at both versions. The quoted labels containing commas, parentheses, `+`, digits and a colon (`"1:1 real columns"`, `"unique(resource,day,slot,seat)"`, `"append-only, hash-chained"`) are safe because the lexer consumes the whole quoted string after the `:` separator has already been matched.

**Two semantic defects in the ER diagram** — these render, but they are wrong:

1. **`SPACE ||--o{ OCCUPANCY` gives occupancy a single Space parent, contradicting AD-11.** AD-11 keys occupancy on a generic `resource` that is a Space *or* a Listing (FR-28) *or* a rental "inventory item" (ND-7). The diagram models only the Space case, which is the reading that produced rubric A-13's polymorphic-column ambiguity in the first place. The edge label `"unique(resource,day,slot,seat)"` names a column set the diagram itself contradicts.
2. **`SELECTION ||--o{ ENQUIRY` is unchanged** and is adversarial H-6 verbatim — an Enquiry must hang off Wedding + Listing so a Family can enquire from a Shortlist before selecting, or FR-8's budget posts five caterers.

Also worth noting for the next pass: the diagram still has no `PLACE` (rubric A-10), no `LISTING_RULE` (H-4), no `SELECTION_FUNCTION` (H-5) and no `PREFERRED_VENDOR` (M-6) — four entities four separate findings asked for. `GRIEVANCE`, `TAKEDOWN`, `CONSENT`, `INVOICE`, `PERSON` and `AGREEMENT_RECORD` did land.

---

## What to do next, shortest path

1. **ND-1** — decide how a Desk action and a controller reach `domain/`, and rewrite AD-26's "never by a controller". Nothing else in AD-26 works until this is answered.
2. **ND-3** — restore NFR 5.6, and take C-1.2's advice this time: make the availability return an attributed structure with the five states H-2 enumerated, before it freezes into `api/family/v1`.
3. **ND-5 / ND-6 / ND-7 / ND-9** — one pass over AD-10's table and AD-11's index: where capacity is declared and how a cross-Service read reaches it, the default for a non-Space non-crew Service, the Slot value on a rental row (and the NULL trap), and the Space-vs-Listing resource dispatch.
4. **ND-4** — AD-29 gains the takedown gate and a demotion path; the object movement joins AD-26 or AD-23.
5. **The evidential cluster (C-4.2, C-4.3, C-4.4)** — frozen rendered artefact, contemporaneous certificate inputs, and the RFC 3161 deferral rewritten as a decision. Not retrofittable, unlike almost everything else on this list.
6. **A-6 / A-10 / H-4 / H-5 / H-6 / H-7** — six untouched shape decisions: `User.name`, Place representation, Rules, Selection cardinality, Enquiry parentage, the running budget.
7. **ND-2, ND-13, ND-15, ND-16** — one editing pass over AD-26's sentence, AD-23's list, four Binds lines and AD-27's "Named:" enumeration.
