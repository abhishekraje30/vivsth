---
review: compliance
round: 4
lens: 'Regulatory, legal-posture and data-protection compliance for an Indian online intermediary that holds no money and is not a party to any engagement'
target: '_bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md'
prior_rounds:
  - 'reviews/review-compliance.md (round 1)'
  - 'reviews/review-closure.md (round 2 verification)'
  - 'reviews/review-compliance-r3.md (round 3)'
driving_spec: '_bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/prd.md (amended 2026-09-06)'
supporting: '_bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/research-india-regulatory.md'
reviewer: compliance reviewer (architecture-spine quality gate)
date: '2026-09-06'
verdict: 'CHANGES REQUIRED — five of six round-3 CRITICALs are genuinely closed and one of them was the only non-retrofittable finding in the document; but AD-35 opened a new CRITICAL that defeats FR-63''s three-hour removal clock, and twelve compliance HIGHs from round 3 are untouched while the Deferred paragraph asserts every one of them is closed.'
---

# Compliance Review (Round 4) — ARCHITECTURE-SPINE.md

## Verdict

**This is the first round where the fixes are mostly real fixes rather than restatements, and the first round where the new material is the biggest problem.**

Five of the six round-3 CRITICALs are closed, and two of them are closed *well*:

- **The evidential artifact (C-4.2) is dead.** AD-12 now renders the document once at confirmation, stores it as immutable bytes, digests those bytes, and returns the same bytes on every FR-40 download. That is exactly R74/R75 and it was the one finding in three rounds that was genuinely not retrofittable — every Agreement confirmed before this landed would have been permanently unverifiable. It landed before the first Agreement. That is the single most valuable thing this revision did.
- **AD-27's general property** — *"any record that evidences a legal obligation, or a person's standing, is append-only"* — is a better answer than the enumerated list I asked for, and the parenthetical that follows it (*"this spine's enumerated lists have been incomplete three times"*) shows the author understood why. The hash-chain truncation gap (R3-9) and the `allow_on_submit` hole are both closed with startup assertions and an `on_trash` refusal.
- **The no-login oracle (R3-6)** is closed by a carve-out written into AD-30 rather than bolted onto AD-32, which is the right place for it.
- **The DPDP misclassification** was not patched — it was withdrawn. AD-32 now records a retention *outcome* and a plain-language reason, and says outright that DPDP's grounds are counsel's determination. That is the correct move and it kills the fabricated-consent-record risk entirely.

Three things stop this being a pass.

**First, AD-35 quietly breaks the removal path.** `is_discoverable(listing)` enumerates five terms — verification, conditions of listing, Subscription, Vendor withdrawal, Admin removal of the Vendor — and **takedown is not one of them**, while the same AD says *"No other code restates any term of it."* AD-33 declares takedown an independent axis; AD-29 wires it into media only. So a Listing under a court-ordered takedown keeps its `discoverable` flag, keeps appearing in search, and AD-35 forbids search from filtering it any other way. FR-63's three-hour clock — the sharpest statutory deadline in the document, and the one s.79 safe harbour turns on — has no path to the surface it must clear. This is a one-clause fix and it is a CRITICAL until it is made.

**Second, the Deferred paragraph has been rewritten twice and is still not true.** It is much better: it says the reports are authoritative, it says the round-3 fixes have not been reviewed, and it warns a fourth round will find defects. Those three sentences are exactly what round 3 asked for and they are the important ones. But it then says *"Every critical and high finding raised in round 3 … is closed in the text above"* and describes the residue as *"medium findings on FR-52's tax and invoice-numbering detail"*. **Twelve HIGH findings from `review-compliance-r3.md` are open in the current text, and three of the twelve are the FR-52 findings the paragraph relabels as medium.** It also gives rounds 2 and 3 as counts rather than verdicts, so a reader never learns that the most recent rubric verdict on this document was **FAIL**. The paragraph no longer contradicts the closure report; it now under-states the residue instead. That is a smaller error than round 3's and it fails in the same direction, for the same reason: it is the paragraph a downstream agent reads instead of the reports.

**Third, the new ADs compose badly with the old ones.** AD-35 versus AD-33 is the worst case. But AD-36 makes Preferred Vendors load-bearing while carrying neither of FR-25's two anti-misleading guards; the legal hold is an indefinite Admin-settable suspension of every erasure right with a weaker record than a takedown; and AD-30's rights surface needs to send a one-time code to a Guest, which AD-21's type signature forbids. Round 3's adversarial reviewer named this class precisely — *"the ADs now compose, and nothing governs composition"* — and round 4's new material reproduces it.

Severity: **CRITICAL** (posture-breaking, statutorily non-compliant, or not retrofittable), **HIGH** (statutory obligation with no architectural home), **MEDIUM** (real gap, retrofittable), **LOW** (clarity).

---

## Round-4 status at a glance

| # | Area | R1 | R3 | **R4** | Movement |
|---|---|---|---|---|---|
| 1 | Non-party posture (NFR 5.6, FR-41, §7.1, §7.2) | PARTIALLY | PARTIALLY | **PARTIALLY COVERS** | Flat. AD-36 adds a new exposure |
| 2 | Intermediary obligations (FR-63) | DOES NOT | PARTIALLY | **PARTIALLY COVERS** | Records and holds better; **removal itself now broken by AD-35** |
| 3 | Data protection (NFR 5.5) | PARTIALLY | PARTIALLY | **PARTIALLY COVERS** | Largest gain in the revision — permlevel, read log, incident record, proof of control |
| 4 | Evidential records (FR-43) | PARTIALLY | PARTIALLY | **PARTIALLY COVERS** | The non-retrofittable finding is closed; the certificate's inputs still are not |
| 5 | Guest data and consent (FR-11, FR-12, UJ-5) | PARTIALLY | PARTIALLY | **PARTIALLY COVERS** | Proof of control closed; data class, provenance, invitation content untouched |
| 6 | GST and billing (FR-52, FR-54) | DOES NOT | PARTIALLY | **PARTIALLY COVERS** | **Verbatim unchanged**, and now described as a medium tail |
| 7 | Accessibility (NFR 5.8) | DOES NOT | DOES NOT | **DOES NOT COVER** | Verbatim unchanged, Desk over-claim included |

### Round-3 CRITICALs — closure verdict

| r3 item | Verdict | Note |
|---|---|---|
| Deferred paragraph misrepresents the reviews | **PARTIALLY CLOSED** | Authoritative-record and unreviewed-fixes sentences added; the closure claim is still false. R4-1 |
| Identity proof on AD-32's rights surface | **CLOSED** | Carved out in AD-30, at the right altitude. Four residuals below |
| AD-32/AD-33 records Desk-editable | **CLOSED** | The general property is a better answer than the list. Two residuals |
| Breach: record + enumeration capability | **PARTIALLY CLOSED** | Both now exist, for one data class out of all of them. R4-3 |
| Guest-contact `permlevel` + read logging | **CLOSED on mechanism** | The FR-61 Conflicts row is still absent, and the case for it is now stronger |
| Digest over the frozen rendered artifact | **CLOSED, well** | Matches R74/R75. The only non-retrofittable finding in three rounds |

---

## 1. Non-party posture — NFR 5.6, FR-41, PRD §7.1, §7.2

**PARTIALLY COVERS.** No movement since round 3, and AD-36 adds surface.

**R4-8 — AD-36 makes Preferred Vendors load-bearing and carries neither of FR-25's two guards. `[NEW in r4 — HIGH]`**

AD-36: *"The `restrict_service` kind names a Service and resolves to that Vendor's Preferred Vendors for it — this is what FR-32 reads to show the Family, by name, what engaging this Vendor would invalidate, and what limits her later choices once engaged."*

That makes the Preferred Vendor set a **permitted set** the platform renders to a Family at the moment of a commitment decision. `Preferred` appears exactly once in the spine — in that sentence — and FR-25 attaches two conditions to it that the spine does not carry:

1. **"A named Vendor must accept the association before it is published. No Vendor can claim another's endorsement unilaterally."** An endorsement published without the endorser's assent is a misrepresentation attributed to a real business. This is an AD-27-shaped rule (it must bind Admin, and it is a person's standing) and it is nowhere.
2. **"Where a Preferred Vendor is the same business, it is shown as the same business — never presented as an independent recommendation."** FR-25 spells out why: *"An in-house arrangement is fine; an in-house arrangement dressed as a third party's endorsement is not."* A venue naming its own catering Listing, combined with a `restrict_service` Rule, means engaging the venue means using that kitchen — presented to the Family as an independent recommendation unless something forces the disclosure. That is a misleading-endorsement exposure and it sits inside NFR 5.5's dark-pattern ban alongside disguised advertisement.

A third clause is also unrepresented: FR-25's *"Preferred surfacing is not paid placement and cannot be purchased."* AD-22 carries the equivalent bar for Featured placement (*"Neither what a Vendor pays nor how recently they joined is a signal"*); AD-36 introduces a second channel into a Family's view with no such bar, and no label.

**Add to AD-36:** a Preferred Vendor row is published only after the named Vendor accepts it; where the named Listing belongs to the same Vendor, the relationship is a required disclosed attribute of the row and every surface that renders it renders that; and no Tier, fee or add-on writes a Preferred Vendor row. The first two are controller rules under AD-27.

**C-1.2 — The availability signal still has no shape and AD-4 is still not bound to it. `[STILL OPEN from r1/r3 — HIGH]`**

Verbatim unchanged. AD-10 still ends *"The function returns an attributed signal, never a boolean a caller can relabel"* with no fields named, and its Enforced-by is still *"the single call site is the check; plus review."* `AD-4` appears nowhere in AD-10 and `AD-10` nowhere in AD-4. NFR 5.6 requires availability *"always attributed to the Vendor, never asserted by the platform"* across three independently-built clients, and one server-side answer does not constrain three renderings. The fix is unchanged and is two sentences: name the fields, and say in AD-4 that `contract/family.v1.json` carries no boolean-availability variant. **It must happen before `api/family/v1` freezes (AD-3), because after that it is a `v2`** — and AD-35 and AD-36 landing without it means one more round has been spent on that clock.

**C-1.1 — The no-platform-terms rule still covers Agreements only, and the Property Setter route is still unguarded. `[STILL OPEN from r1/r3 — HIGH]`**

AD-27 gained a startup assertion in this revision — for `allow_on_submit` on Agreement child tables. It is exactly the pattern C-1.1 asked for, applied to a different problem. The rule itself is unchanged: *"no **Agreement term** field carries a Frappe `default`, and a Property Setter adding one is a defect, not configuration."*

Two halves still open:

- **Quotes.** FR-39 makes the Quote the place every term is first authored — days and Slots, the offering, guest count, all-in price, what is included, the delivery timeline, the Rules. A default on a Quote field is the platform proposing terms where a Vendor is composing them, and by the time it reaches the Agreement it is indistinguishable from the Vendor's own value. AD-12's Amendment is a `seq+1` append of the same term set, so an Amendment form default carries straight through.
- **Enforcement.** A Property Setter is set from Desk and saves no Quote, so no controller runs and the defect sits in metadata until a Vendor inherits it. The revision proved it knows how to fix this — the `allow_on_submit` check refuses to boot. The same loop over `Property Setter` rows targeting `default` on the enumerated term fields is the same cost.

**R3-1 residual — AD-8's pricing model still has no boundary against AD-27. `[STILL OPEN from r3 — MEDIUM]`**

AD-8 still lists *"pricing model"* among the Admin-editable Service declarations a handler reads, and AD-27 still forbids the platform supplying an Agreement term — price being the first term FR-39 names. The distinction that reconciles them (a pricing model declares how a Vendor's own numbers combine and never supplies a number) is still unstated, and a handler computing a suggested figure at request time would evade every gate in the document, because nothing is stored as a `default`.

**C-1.4 — ERPNext is still unmentioned; the money bar is still words. `[STILL OPEN from r1/r3 — MEDIUM]`**

`ERPNext` appears **zero times**. AD-19 still leans on *"print formats, reports and FR-52's GST invoicing work natively"*, which reads as a reason to install it — and installing it brings Payment Entry and Sales-Invoice-against-Customer into a codebase whose central legal claim is that no money moves between a Family and a Vendor. Two lines: state whether ERPNext is installed and that no accounting document may reference a Family; and confine the payment module to the Subscription handler under AD-1's import lint.

---

## 2. Intermediary obligations — FR-63

**PARTIALLY COVERS.** Records and holds improved genuinely. Removal itself regressed.

### What closed this round

- **AD-27's general property** now covers grievances and their disposal, takedowns with their ground and authority, consent records and the repeat-infringer register — by naming them as examples of a property rather than as a list. `[R3-2 CLOSED]`
- **Legal hold** exists, suspends the 180-day purge, erasure and the eight-year expiry, for any duration including indefinitely, and AD-23 now says *"every deletion job skips records under legal hold."* `[R3-3 CLOSED]`
- **Retention-over-erasure is scoped to the same record**, with an explicit carve-out: *"a Guest's contact details are erased on AD-14's schedule regardless of anything removed elsewhere."* That is the right scoping and it is stated in the right place. `[R3-4 CLOSED]`
- The 180-day-as-ceiling problem is answered in substance: a court's *"or such longer period"* is expressed as a hold. `[part of R3-3 CLOSED]`

### Findings

**R4-2 — AD-35 omits takedown, and forbids anything else from filtering for it. A court-ordered Listing never leaves search. `[NEW in r4 — CRITICAL]`**

AD-35's rule, in full: *"`is_discoverable(listing)` is the **only** statement of the rule: verification complete, every condition of listing satisfied (FR-59, FR-71), a Subscription active or within its Grace Period, not withdrawn by the Vendor, not removed by Admin. … **No other code restates any term of it.**"*

Five terms. Takedown is not among them, `AD-33` is not in AD-35's Binds, and neither is `FR-63`.

AD-33 is unambiguous that this is a separate dimension: *"Content visibility has two independent axes: **verification** (AD-20) and **takedown**."* AD-29 wires takedown into the **media** predicate (*"verified … within the Tier's allowance … and **not taken down**"*), and AD-35 says AD-29 calls `is_discoverable`. So the picture is: a taken-down **image** is demoted out of the public path with CDN invalidation inside the SLA, and a taken-down **Listing** — its description, its name, its Rules, its Commitment text — keeps `discoverable = 1` and keeps appearing in every search result.

FR-63 makes no distinction: *"Content identified as unlawful is removed within thirty-six hours; content subject to a court order or a government direction, within three hours."* The Listing's own text is content. So is a Review — and `Review`'s Capability-map row cites AD-33 with no mechanism behind it either.

What makes this a CRITICAL rather than an omission is AD-35's last sentence. An implementer who notices the gap and adds a takedown filter to the search path is **violating AD-35**, which is the AD written specifically to stop the discoverability predicate being restated in five places. The architecture forbids the workaround and does not provide the fix. And the consequence is not a degraded feature: it is a court order the platform cannot honour, which is precisely the failure that costs s.79(2)(c) safe harbour, which is what E-Commerce Rule 5(1) hangs the consumer-law position on, which is what the entire non-party posture in §1 rests on.

**Add one term to `is_discoverable`** — *not under takedown (AD-33)* — cite FR-63 and AD-33 in AD-35's Binds, and say in AD-33 that a takedown of a Listing recomputes the flag immediately rather than waiting for the daily job.

**R4-4 — The legal hold is an indefinite, Admin-settable suspension of every erasure right, recorded more weakly than a takedown. `[NEW in r4 — HIGH]`**

AD-33: *"A record can be placed under legal hold, naming who ordered it and when. While a hold is in force **nothing automatic touches that record** — not the 180-day purge, not an erasure request, not AD-12's eight-year expiry — for as long as the hold lasts, **including indefinitely**."*

The mechanism is right and I asked for it. Its record is not. Compare the two states the same AD defines:

| | Takedown | Legal hold |
|---|---|---|
| Ground | required | — |
| Authority | required | "who ordered it" |
| Acting Admin | required | attributed (AD-27) |
| Scope | the removed content | any record |
| Duration | 180 days | unbounded |
| Effect on erasure | scoped to the same record | suspends it |
| Person told | NFR 5.5 sentence applies | — |

The weaker record has the stronger effect. Three consequences:

1. **"Naming who ordered it" is not a ground.** Under DPDP s.8(7), retention past the purpose is lawful only where *"necessary for compliance with any law for the time being in force."* A hold that records a name and a date does not record which law, so nothing in the record establishes the condition that makes the retention lawful — and nothing distinguishes a court's preservation order from an Admin who found a hold convenient.
2. **NFR 5.5's tell-the-person duty is not carried across.** The AD applies it to the retention-versus-erasure collision (*"retention wins and the person is told which basis applies"*) and not to the hold, which is the stronger override. A person whose erasure request is silently suspended indefinitely has been refused without being told, which NFR 5.5 forbids in terms.
3. **Guest contacts are back in scope through the side door.** AD-33 was carefully rewritten this round so that *"a Guest's contact details are erased on AD-14's schedule regardless of anything removed elsewhere"* — and a hold placed on a Guest record overrides exactly that, indefinitely, with no ground recorded. Sometimes that is correct (a court order over a guest list). Nothing in the text distinguishes the correct case.

**Add to AD-33:** a hold carries the same three fields a takedown does — its ground, the ordering authority, the acting Admin — plus its scope and a review date even where the hold itself is open-ended; an erasure request blocked by a hold is answered under NFR 5.5's tell-them rule rather than dropped; and lifting a hold is reviewed on the review date rather than only when someone remembers. AD-33's Enforced-by is *"review only"*, which for a mechanism that can suspend a statutory right is the wrong tier — the placing and lifting are already AD-27 controller work, so say so.

**R4-5 — AD-27's append-only property and a grievance's own lifecycle are in tension. `[NEW in r4 — MEDIUM]`**

AD-27: *"any record that evidences a legal obligation, or a person's standing, is **append-only** — a correction is appended and **nothing is ever overwritten or deleted**, by anyone, Admin included."* AD-33: a grievance carries *"its acknowledgement, its disposal within seven days, and its SLA clock."*

A grievance is created on receipt, acknowledged later, disposed later still. Under the property as worded, writing `acknowledged_at` onto an existing row is either forbidden (nothing is ever overwritten) or fine (it was empty, so this is not an overwrite) — and the two readings produce two different DocTypes. An implementer resolving it the strict way builds a Grievance that cannot record its own disposal; resolving it the loose way builds one where every field stays writable, which is the hole the property exists to close.

One sentence: **a field is written once and never rewritten; a lifecycle advances by filling fields that were empty, and a correction is a new appended row.** That is what the property means and it is what the grievance, takedown and hold records all need.

**C-2.4 — The repeat-infringer register still cannot survive re-registration. `[STILL OPEN from r1/r3 — HIGH]`**

Verbatim unchanged. AD-33 still says *"keyed on AD-14's stable token so erasure does not empty it"*, and AD-14 still says *"The token is stable per person."*

The walk is unchanged and unrebutted: AD-28 says *"the mobile number is the identity and one person is one account"*; erasure replaces the identifying fields — the number among them — so the number is free; the person registers again on it, AD-28 mints a new account and therefore a new person and a new token; the register holds the old one. Research **R20** requires the identity to survive *"account deletion **and re-registration**"* under E-Commerce Rule 5(5), and this survives deletion only — which is the half the infringer does not control the timing of.

Fix unchanged and small: a salted one-way hash over a re-registration-invariant identifier (the phone; for Vendors also the PAN/GSTIN), computed at registration, **retained through erasure as an explicit second exception in AD-14**, used as the register key. The digest honours erasure — the identifier is unreadable — while preserving the exact linkage the Rule requires.

**R3-5 — Two statutory acknowledgement clocks are still one field. `[STILL OPEN from r1/r3 — HIGH]`**

AD-33 still reads *"carrying its acknowledgement, its disposal within seven days, and its SLA clock — 36 hours … 3 hours … 72 hours"*. All three named clocks are **removal and furnishing** clocks. The **acknowledgement** clock is unnamed, and there are two of them on two statutes:

- **IT Rules 3(2)(a)** — acknowledge within **24 hours**, dispose within 15 days (the PRD's 7 days is stricter, which is fine).
- **E-Commerce Rules 4(5)–(6)** — acknowledge a consumer complaint within **48 hours**, redress within one month.

A photographer whose work was lifted, a person defamed in a Review, and a Vendor disputing a charge are three complainants on two tracks. AD-23's *"FR-63's grievance SLA timers"* will be built with one due-at, set to whichever the implementer read first. The statutory track belongs on the grievance record as a field, with the acknowledgement clock derived from it.

**C-2.6 — FR-64's ranking disclosure still has no home, and AD-35 has made the gap sharper. `[STILL OPEN from r1/r3 — MEDIUM]`**

`FR-64` and `disclosure` both appear **zero times** in the spine. FR-64 requires the organic-ranking parameters published in plain language and *"reachable by any Family"*, and FR-20 specifies the exact text. Research R12 wants the "we do not process payments, and here is why" statement public. Both are no-login routes on a public surface — a routing decision in the shared layer, not app copy.

It is sharper now because the ranking rule has been split across two ADs that both know part of it: AD-22 owns the ordering signals, AD-35 owns who is in the result set at all. The disclosure FR-20 mandates describes both. With no owner, three clients will write three versions of a statutorily-required disclosure.

**C-2.3 residual — "removal is a state transition, never a delete", and AD-14's ladder. `[STILL OPEN from r1/r3 — MEDIUM]`**

AD-14's precedence ladder is unchanged and still carries no FR-63 entry beside the Agreement, Review and audit retentions — so an implementer reading AD-14 alone, which is the AD the erasure story lives in, will not find the 180-day exception or the hold. And nothing anywhere says removal is a state change rather than a delete, which is the natural implementation and the one that makes the 180 days unmeetable.

**C-2.7 — Hosting is still not regulatorily constrained. `[STILL OPEN from r1/r3 — MEDIUM]`**

`India` appears twice — once inside AD-32's explanation that India has no contract ground, once as *"eMudhra is the Indian option"*. `NTP` appears **zero** times; `region` zero in a hosting sense. The Deferred hosting entry lists what waits on the decision and still not what constrains it: CERT-In requires **180 days of ICT logs retained within India** and **NTP synchronisation to NIC/NPL** (R22), and the same decision carries the six-hour incident-reporting capability. *"Choose before the first deploy"* should read *"choose from India-region, log-retaining, NTP-disciplined options, before the first deploy."*

**Preserved data has no purpose limitation. `[STILL OPEN from r3 — MEDIUM]`**

IT Rules 3(1)(g) is a preservation obligation *for investigation purposes*, not a general licence to keep and use. AD-33 says *"retained"* with no purpose limitation, so under DPDP's own purpose-limitation principle a takedown becomes a route by which data that should have been erased is retained *and remains in ordinary processing*. One clause: preserved content is access-restricted to the investigation purpose and is not returned to ordinary reads.

---

## 3. Data protection — NFR 5.5

**PARTIALLY COVERS.** The largest gain in this revision, and the largest remaining gap is the one it left half-scoped.

### What closed this round

- **Guest contact fields sit behind a `permlevel`** and **every read is logged, Desk included**. That is C-3.3's first two pieces, stated in AD-32 and mirrored in the Conventions Logging row, and the Logging row's verb problem is fixed — it now says *reads* as well as changes. `[C-3.3 CLOSED on mechanism]`
- **A `Breach Incident` record exists**, carrying discovery time, scope, affected people and when the regulator and those people were told; it has a Capability-map row. `[C-3.2 PARTIALLY CLOSED]`
- **The rights surface proves control before disclosing.** AD-30's carve-out is written into the AD that states the "public-safe fields only" rule, which is where a reader hits the contradiction. `[R3-6 CLOSED]`
- **The three-basis enum is gone**, replaced by a retention outcome plus a plain reason, with the lawful-basis question explicitly handed to counsel. `[r3 §"Are AD-32's three bases right" — resolved, see below]`

### Findings

**R4-3 — The breach record is scoped to one data class; the obligation is not. `[STILL OPEN from r3, partially closed — HIGH]`**

AD-32: *"A `Breach Incident` is a record carrying when it was discovered, its scope, the affected people **enumerated from those logs**, and when the regulator and those people were told. **The scope is Guest contact data as FR-61 words it, not all personal data**: logging every read of everything would be ruinous, and this is the class held about people who never chose to be here."*

**The logging scope is defensible. The record's scope is not, and the two have been collapsed into one sentence.**

The logging half is right, and the reasoning is right: FR-61 words the confinement-and-logging duty for Guest contact data specifically, research **R37** does the same (*"RBAC so no ordinary admin can browse guest lists; access logged"*), and read-logging every personal-data field on the platform is a real cost with a real performance consequence. Nobody should ask for that.

The record half does not follow. **NFR 5.5:** *"Personal data breaches are reported to the regulator and to affected people within seventy-two hours of becoming aware of them."* No scope qualifier. **DPDP s.8(6) and Rule 7** (research R39) likewise: intimate each affected Data Principal without delay, report to the Board within 72 hours. A Vendor is a Data Principal. A Family is a Data Principal.

Two concrete failures follow from the AD as worded:

1. **AD-29's private store holds identity documents and verification evidence.** *"Everything else — pending images, verification evidence, identity documents — is private and reachable only through a short-lived signed URL."* A misconfigured bucket policy or a leaked signing key exposes Vendor KYC material. Under AD-32 that breach has no `Breach Incident` record, no enumeration, no 72-hour clock and no notification duty, because it is not Guest contact data. It is the highest-sensitivity personal data on the platform.
2. **Enumeration-from-logs sees only breaches that used the logged read path.** A dumped backup, a compromised database credential, an exfiltration through `frappe.db.sql` (which AD-16 says *"sit[s] below the permission layer entirely"*, masking included) produces **zero read-log entries** — and AD-32's enumeration mechanism returns an empty affected set for the breach shapes that are most likely and most severe. The record would then affirmatively assert that nobody was affected.

**The fix separates the two scopes and is three sentences.** Read-access logging stays scoped to Guest contact fields, for the cost reason already stated. The `Breach Incident` record and the notification duty cover **any** personal data. Where a class has no read log, or where the breach did not go through the read path, the affected set is derived from **what the compromised store holds** — the object-storage prefix, the DocType, the backup — not from logs; say that, because it is the difference between a 72-hour capability and a 72-hour intention.

One more, small and cheap now: **the read log is itself a new personal-data store with no stated retention.** Research **R38** requires processing logs retained ≥1 year. AD-23's enumeration has no entry for it, so it will be either unbounded or swept by whatever purge someone writes.

**R4-6 — The rights surface is still an existence oracle, and still offers no erasure. `[STILL OPEN from r3 — HIGH]`**

AD-30's carve-out closed the disclosure half of R3-6 well. Two of that finding's three asks did not land:

1. **"State that a request that fails proof returns the same response as one for a number the platform does not hold."** Absent. AD-30 says *"The caller enters a mobile number, receives a one-time code by AD-28's mechanism, and only then is any personal data returned."* If a number the platform holds nothing for is answered differently — no code sent, "we have nothing for you", a different latency — the endpoint is a **no-login membership oracle over every phone number in India**: type a number, learn whether that person is on Vivah Spot, and for a Guest, learn they were invited to a wedding. Rate limiting slows that; it does not stop it. The surface built to serve a privacy right becomes a privacy leak, which is the same failure shape R3-6 identified and the fix is the same size: identical response, identical timing, code always issued.
2. **Erasure.** NFR 5.5 lists Guest contacts, Shortlists, Boards, guest lists and unconfirmed Weddings as *"erasable on request"*, and research **R36** requires a public no-login channel for *"access / correction / **erasure** / grievance"*. AD-32 still says only *"can see and correct what is held about them."* AD-14 erases Guest contacts **on a schedule** — 30 days after conclusion, on abandonment, on dismissal — which is a retention rule, not a right. A Guest who wants their number gone today has no route in this architecture.

**R4-7 — AD-21's type signature forbids the message AD-30's rights surface must send. `[NEW in r4 — MEDIUM]`**

AD-21, whose Enforced-by is *"the type signature — a Guest is not a type the function accepts"*: *"The outbound messaging function accepts only a Vendor, a Family user or an Admin as recipient. A Guest is not a type it can take, so an attempt fails before anything is sent."*

AD-30's rights surface sends a one-time code to a number that may belong to a Guest and to no account at all (*"No account is created"*). Substantively this is fine — the person asked for it, so AD-21's actual concern, an unsolicited platform message to a Guest and the WhatsApp account restriction that follows, does not arise. But AD-21 states an absolute, enforces it with a type, and names no exception; an implementer wiring the rights surface hits a compile error and will resolve it by widening the type, which removes the enforcement AD-21 calls its own.

One sentence in AD-21: the one-time code path is not the outbound messaging function, is reached only by a request the recipient made themselves in that same session, and carries no content beyond the code.

**Also in AD-30: "nothing is stored" is not true and conflicts with AD-32.** Issuing a code stores the code against the number; AD-28's per-number rate limits store attempt counts against the number; and returning that person's data is a read of Guest contact fields, which AD-32 requires to be **logged**. As written, the sentence forbids the audit trail the neighbouring AD mandates. Say what is meant: no account is created and no profile is retained beyond the code's lifetime and the access log AD-32 requires. `[NEW in r4 — MEDIUM]`

**C-3.3 residual — the FR-61 conflict is still not recorded, and the architecture has now taken a side. `[STILL OPEN from r1/r3 — MEDIUM]`**

The Conflicts table still has no FR-61 row. Its nine rows are the two FR-62 amendments, the `CLAUDE.md` noun list, four Tech-Stack supersessions and `coding-standards.md` Appendix B.

The case is stronger than it was. In round 3 the spine was **silent** on the tension. It is now **on one side of it**: FR-61 says *"No capability is withheld from an Admin user by role"*, and AD-32 says *"Guest contact fields sit behind a `permlevel` so only an operational role reads them."* That is a capability withheld from an Admin user by role — the right answer, required by DPDP Rule 6 and by FR-61's own fourth bullet, and flatly contrary to FR-61's headline sentence. I checked the amended PRD: the 2026-09-06 amendments are all FR-62/UJ-4 Service-configuration edits; **FR-61 is untouched and still self-contradicting.**

The spine's own convention is to record this rather than resolve it silently — it does exactly that for AD-5-versus-FR-62 and for four Tech-Stack claims. One row: *FR-61's "no capability withheld by role" versus FR-61's own confinement-and-logging duty, NFR 5.7 and DPDP Rule 6 — resolved in favour of the confinement duty; the PRD's headline sentence needs the carve-out written in.*

And one line in AD-16, unchanged from round 1: `frappe.db.get_value` and `frappe.db.sql` sit below the permission layer *"entirely"* — its own words, masking included — so any read path built with them defeats **both** the new permlevel and the new read log. AD-16 is where that must be said, because AD-32 will not be open when someone writes the query.

**R3-8 — Consent still does not record the notice it was given under, and the AD-32 rewrite makes this more load-bearing, not less. `[STILL OPEN from r3 — HIGH]`**

`notice` appears once in the spine, inside AD-32's explanation of why it is *not* classifying lawful bases. There is no `NOTICE` entity beside `CONSENT` in the ERD.

DPDP s.5 requires an itemised notice at or before collection, presented independently of the T&Cs (research **R30**); s.6(1) requires consent to be **informed**. A consent record storing purpose and timestamp but not the **version of the notice in force** cannot demonstrate the consent was informed, which is the only thing a consent record is for. Notice text will change — R80 requires the eight-year Agreement retention to be *stated in the notice*, and that sentence does not exist yet — and when it changes, every consent taken under the old text becomes unattributable to any text at all.

This got **more** important in this revision, not less. With the lawful-basis question deferred to counsel, the notice version stored on the consent record is now the **only** architectural artifact that would let the platform demonstrate anything at all about a consent after the fact. Add it: the notice is a versioned immutable record under AD-27; a consent stores the version it was given under. Cheap now, unreconstructible later, exactly like the certificate inputs in §4.

**C-3.5 — Guest is still not a data class, and the `PERSON` join is still unforbidden. `[STILL OPEN from r1/r3 — HIGH]`**

AD-14's opening sentence is unchanged: *"No record copies a person's name or number; every record references one person record."* Read literally — and it is the rule's first sentence and it is absolute — a Guest's number becomes a `PERSON` row, at which point AD-14's erase-outright rule for Guests and its pseudonymise-and-retain rule for everyone else are two contradictory policies on one table.

The sharper half also has not moved: nothing forbids **reconciling a Guest's number against `PERSON`**. "This guest is already a user"; "this guest's number matches a Vendor"; "how many of last season's guests came back". Each is audience-building from data collected for a single stated purpose — the DPDP s.6(1) breach FR-12 exists to prevent (*"never used to build an audience"*, research **R33**) — and each is a one-line join no rule in this document prohibits and no reviewer would flag, because it looks like a feature. FR-12's growth path is the tell: a Guest who starts their own Wedding does so by **signing up fresh and consenting directly**, never by the platform recognising them.

State it: Guest is a data class of its own, scoped to one Wedding, never deduplicated across Weddings, never joined to `PERSON` for any purpose; and amend AD-14's opening sentence so it does not claim Guests.

**R3-7 — Three breach clocks, still one. `[STILL OPEN from r3 — MEDIUM]`**

AD-32 still carries only *"reportable within 72 hours"*. The obligation is three: **DPDP Rule 7** — intimate each affected Data Principal **without delay**, before the Board report and per person; **DPDP s.8(6)/Rule 7** — the detailed Board report within **72 hours**; **CERT-In Directions 28.04.2022** — specified cyber incidents within **6 hours** of noticing (R22). Six hours is an availability requirement on a person and a channel, and it constrains the hosting and on-call decision Deferred leaves open.

**C-3.6 — No security-safeguard invariant. `[STILL OPEN from r1/r3 — MEDIUM]`** `encryption` and `at rest` still appear zero times. DPDP Rule 6 requires reasonable safeguards including encryption; **R37** names contact data specifically. Lands on the hosting decision.

**C-3.7 — Nothing pre-ticked still has no home, and now two rules depend on it. `[STILL OPEN from r1/r3 — MEDIUM]`** `pre-tick` and `dark pattern` appear zero times. NFR 5.5 states it outright. It is now load-bearing twice over: **R31** requires a non-pre-ticked family attestation at guest-list upload, and **R70** a non-pre-ticked consent that Vendors may rate Families. This is a three-client contract of exactly the kind AD-24 handles for vocabulary — one rule (no consent control ships with a checked default; consent controls come from `packages/shared`) and it is a lint away from tier 2.

### Is dropping the lawful-basis question the right call?

**Yes for the record, and it leaves two gaps that are now more visible rather than less.**

AD-32 now says: *"Every personal datum records what happens to it on an erasure request — `erase`, or `keep, person anonymised` — together with the reason in plain terms: consent, purpose-limited, engagement record, or legal duty. **This is a retention classification, not a lawful-basis one.** DPDP's actual grounds … are a legal determination belonging to the client's counsel."*

**This is correct and it is the right call.** Round 3's finding was that an exhaustive three-basis enum would force a **fabricated consent record** for family-uploaded Guest contacts — the platform's most exposed data class, for which research §290 concludes no lawful basis cleanly exists. A false attestation the platform would produce in its own defence is materially worse than an acknowledged gap. Recording the retention *outcome* and a plain-language *reason*, and saying in the AD that the grounds are counsel's, removes that risk completely. The Guest answer AD-32 now gives — `erase`, *purpose-limited*, when the purpose ends — is honest, decidable at request time, and matches R34. The AD even explains **why** the earlier version was wrong, which is the sort of thing that stops it being reintroduced. Nothing here needs undoing.

Two things it does not solve, and one of them the AD names without closing:

**R4-9 — The deferral to counsel has no addressee. `[NEW in r4 — MEDIUM]`**

AD-32 says the grounds are a legal determination and that *"NFR 5.9 already carries legal terms as a business dependency."* I checked NFR 5.9. Its legal row is **"Legal terms and privacy policy, including the non-party statement | NFR 5.6, FR-41"** — scoped to the non-party posture. It does not name the DPDP notice, the lawful-basis determination, or the retention basis for the eight-year Agreement retention. The spine's Deferred section then points back at the same row (*"every business input in NFR 5.9 — … legal terms"*).

So the deferral is circular: AD-32 defers to NFR 5.9, and NFR 5.9 does not carry it. Nothing in either document creates the task of asking counsel, names its trigger, or says what is blocked until it is answered. A deferral nobody is assigned is a decision to skip. Either add a row to NFR 5.9 — *DPDP notice text, lawful-basis determination and the retention basis for the eight-year Agreement retention → blocks FR-43's retention, FR-66, NFR 5.5* — or add a Deferred entry with a trigger that can fire (before the first real user, not "when needed").

**R4-10 — NFR 5.5's "told which retention basis applies" has nothing to resolve to. `[NEW in r4 — MEDIUM]`**

NFR 5.5: *"Where erasure is refused or limited, the person is told which retention basis applies."* AD-33 repeats it. What the architecture now stores is a plain reason — *engagement record*, *legal duty*. Told to a person who has asked for erasure, "engagement record" is a description of what the platform is keeping, not a basis for keeping it.

The underlying question is the one round 3 raised and this rewrite correctly declined to answer in the AD: under DPDP there is no contract ground, so refusing erasure of an Agreement rests on s.8(7)'s *"necessary for compliance with any law"* — Limitation Act Art. 55, CGST s.36, Companies Act s.128(5) — which research §643 says *"is defensible … but it must be stated in the notice, scoped to the Agreement record only."* That is counsel's answer to write, and the architecture's job is to have somewhere to put it. Right now it does not: no notice record (R3-8), and a reason field whose values are not bases. **One sentence closes the architectural half:** the reason a person is told is looked up from the notice version their data was collected under, not composed at request time — which is the same field R3-8 asks for.

Note also that **AD-14 still states the old vocabulary as a precedence** — *"consent-based data is erased; engagement records and legally-required records are pseudonymised and retained"* — without AD-32's disclaimer, and AD-14 is the AD an implementer opens for erasure. Add the pointer.

---

## 4. Evidential records — FR-43

**PARTIALLY COVERS.** The finding that could not be retrofitted is closed. The one that decides whether the certificate can be produced is not.

### What closed this round, and it is the most important close in the document

**C-4.2 is dead, and correctly.** AD-12 now stores *"the document rendered from them at that moment, kept as immutable bytes, the SHA-256 digest **of those rendered bytes**"*, and: *"FR-40 lets both download a copy at any time, and **every download returns those same stored bytes — never a re-render.**"* Plus the reasoning: *"Rendering on demand would make the 2034 copy a different document from the 2026 one as templates, fonts and libraries move, leaving the certificate attesting to a serialisation nobody has ever looked at."*

That is **R74** (SHA-256 of the canonical rendered artifact at confirmation) and **R75** (freeze the exact artifact each party saw, not the current template) exactly. The serialisation is kept as the schema-independent fallback, which was AD-12's best original insight. Round 3 called this the one finding in the document that was genuinely not retrofittable — every Agreement confirmed before it landed would have been permanently unverifiable, with no later fix. It landed before the first Agreement exists. Two small notes rather than findings: R74 words the artifact as **PDF/A**, and the spine says "immutable bytes" without naming a format, which leaves the archival-format question to the implementer; and *"log that each party took their copy"* did not land, which BSA s.63(2) reasoning wants and which is one row.

**R3-9 is dead.** *"A chain proves nothing about its own length"*, the head digest and record count on the `Agreement`, and `on_trash` refusing deletion, with the reason stated: deleting the tail leaves a valid chain, silently reverts the Agreement to its previous terms, and passes the verification sweep. The AD also says why both halves are needed — the refusal closes the ordinary route, the head and count survive `frappe.db.sql`. That is a better answer than the finding asked for.

**The `allow_on_submit` hole is closed with a startup assertion** that refuses to boot, with the Frappe mechanism named (child rows appendable to a submitted document, exempt from after-submit validation). Right mechanism, right tier, right explanation.

### Findings

**C-4.4 — The certificate's inputs are still not captured, and AD-12 still promises the certificate. `[STILL OPEN from r1/r3 — HIGH]`**

This is now the **only** thing standing between AD-12 and FR-43's last consequence, and it is the finding this revision walked past while fixing everything around it.

The snapshot stores: serialised terms, rendered bytes, digest of those bytes, previous digest, server timestamp — plus head digest and count on the parent. AD-12 still asserts *"FR-43's certificate is generated from these rows."*

It cannot be. **FR-43** requires *"a certificate attesting how the record was produced and by which system"* and says outright: *"Without it the rest of this FR proves nothing in particular."* BSA Schedule Part A, via research §8.4 and **R79**, requires identification of the record, **the manner of its production**, **particulars of the devices involved**, and the s.63(2)(a)–(d) matters; *Arjun Panditrao* makes the certificate mandatory for secondary electronic evidence, so without it the eight years of retention buy nothing.

Research **R76** gives the target list for what the append-only log must carry: *"user id, role, server timestamp, IP, user-agent, device id, app version, document id, document hash, terms version."* The snapshot has three of ten. Device particulars and manner of production are **contemporaneous facts** — in 2034 nobody can reconstruct which host, which app build and which deploy produced a 2026 row unless 2026 wrote it down. This is the same shape as R3-8's notice version: cheap now, unreconstructible later.

**Add to the snapshot:** confirming user and acting role for each of the two confirmations, app/deploy version, host identity, terms/format version in force, and the custodian of record at the time (NFR 5.9's named individual is a 2026 fact when a 2034 certificate needs it).

**C-4.3 — The clock, and a deferral still justified by something orthogonal to it. `[STILL OPEN from r1/r3 — HIGH]`**

The Deferred entry is **verbatim unchanged**, including the sentence round 3 flagged: *"Server clock satisfies FR-43's 'not from a device clock' literally, and **AD-12's hash chain makes tampering detectable**."*

The clause still does not support the conclusion. **A hash chain proves ordering and integrity; it proves nothing about time.** Chaining a timestamp from an undisciplined VM clock makes a wrong timestamp tamper-evident, not correct — and a confirmation timestamp that precedes the proposal it accepts, which minutes of drift will eventually produce, is worse than no timestamp because the record affirmatively contradicts itself.

Everything that would make a server clock stand up is still absent. `NTP` appears **zero** times; `UTC` appears once, inside an unrelated sentence; the Conventions Dates row still says only *"Asia/Kolkata"* where **R77** requires storing UTC and displaying IST; and there is no uptime, incident or deploy record to support BSA s.63(2)(c)'s *"operating properly throughout the material period"* (**R81**'s quarterly signed attestation).

And the trigger is still structurally unfireable: *"the first time an Agreement record is needed as evidence."* On that day, the Agreement in dispute was timestamped years earlier by whatever the system did then, and adopting an RFC 3161 authority at that moment improves nothing about it. **A deferral whose trigger cannot fire usefully is a decision.** Record it as one — "we accept a server clock for the life of the product, with these disciplines" — and name the disciplines: NTP to NIC/NPL, UTC storage, IST display, and an operating-properly record retained the eight years.

**C-4.1 residual — `db.set_value` / `db.sql` still not forbidden on evidential DocTypes. `[STILL OPEN from r1/r3 — MEDIUM]`**

AD-16 still states that these *"sit below the permission layer entirely and check nothing"* without saying where they may not be used, and AD-27's guards are controllers, which they bypass. AD-12's head-and-count design explicitly anticipates this (*"what remain when `frappe.db.sql` bypasses controllers entirely"*) — which makes it stranger that AD-16 still does not name the DocTypes. One sentence, and `check_whitelisted.py` could assert it. The same sentence covers the new permlevel and read log (§3).

---

## 5. Guest data and consent — FR-11, FR-12, UJ-5

**PARTIALLY COVERS.** The authorization model is now good. The data model is unchanged since round 1.

**R3-10 — Guest data still has two provenances on different legal footings, stored as one class. `[STILL OPEN from r3 — HIGH]`**

`provenance` and `attestation` both appear **zero times**.

FR-11 draws the distinction the spine does not carry: *"People who enter their own details are consenting to Vivah Spot directly, **which is a stronger footing than a Family uploading numbers on their relatives' behalf.**"* Research §290 is blunt about how much stronger: on family-uploaded contacts, DPDP s.7(a) — data *"voluntarily provided by the Data Principal"* — does not fit, because *"the guest did not provide her number to Vivah Spot; the family did"*; on self-submitted contacts it fits cleanly.

This survives the AD-32 rewrite intact, and in one respect the rewrite sharpens it. AD-32 now correctly refuses to assert a lawful basis — but it still gives **one** answer for all Guest data (*"`erase`, purpose-limited, when the purpose ends"*), and the two provenances differ in what mitigations attach, not only in basis. Research **R31** requires *"an explicit, non-pre-ticked family attestation of permission to invite each contact"* at guest-list upload — which applies only to the uploaded path, and appears nowhere.

**Add:** the Guest record carries its provenance — family-supplied, member-suggested, or self-submitted. It is one field, and it is what the attestation attaches to, what the invitation must say, and what counsel will need when the s.7 question in R4-9 finally gets asked.

**R3-11 — AD-21 owns invitation composition and binds none of its required content. `[STILL OPEN from r3 — MEDIUM]`**

`opt-out` appears **zero times**. AD-21 still stops at the send: *"Composing an invitation is a separate path returning text and a link to the Family, who sends it from their own WhatsApp."*

That composed text is the **only notice any Guest ever receives**, because AD-21 guarantees the platform never contacts them again — research §297 makes the point directly: the invitation *"is the closest available analogue to the s.3 notice"* for a person the platform cannot lawfully reach any other way. **R32** sets its required contents: the family's name as sender, why the recipient is receiving it, a **one-tap opt-out**, and a privacy-notice link.

And the opt-out is not copy — it is a live route into AD-32's rights surface, which under R4-6 still has no erasure verb for it to land on. The two findings close together.

**C-5.1 residual — entropy floor, constant-time comparison, and the link-preview carve-out. `[STILL OPEN from r1/r3 — MEDIUM]`** AD-30 still says *"unguessable"* and not how: no CSPRNG requirement, no ≥128-bit floor, no constant-time comparison (so token validity leaks through timing), no constant-work lookup. And FR-12's deliberate asymmetry — the link preview *"is controlled by the platform, and is the platform's principal surface in front of Guests"* while *"the page is excluded from search-engine indexing"* — is still unwritten, so a future agent will either tighten the `noindex` header until WhatsApp previews break or loosen it until the pages index.

**C-5.2 residual — two clauses still stated as outcomes rather than mechanisms. `[STILL OPEN from r1/r3 — MEDIUM]`** AD-30 says the token *"addresses exactly one Guest of one Wedding and cannot be altered to reach another"* — the outcome. The checkable rule is the mechanism: **no `allow_guest` method accepts an identifier of a Wedding, Guest or Function as a parameter**; scope comes from the token alone. That is what `check_whitelisted.py` can assert. Similarly *"expires when the Wedding concludes or is abandoned"* reads as a property, while FR-11 and FR-12 require revocation to take effect **immediately** — re-validation against current Wedding state on every request, uncached. AD-23's expiry job is a sweep, and a sweep is not immediately.

---

## 6. GST and billing — FR-52, FR-54

**PARTIALLY COVERS.** AD-34 is **verbatim unchanged** since round 3. Every finding below is quoted from the round-3 report because nothing in the text moved.

`GSTIN`, `financial year`, `place of supply` and `Refund` all still appear **zero times**; `credit note` appears once, as the manner of a correction rather than as a document that must exist.

**C-6.1 — Tax by recipient State is stated, not made non-latent. `[STILL OPEN from r1/r3 — HIGH]`** *"Tax is determined by the recipient's State"* is the right rule and does not make the bug non-latent. For a Shrirampur launch CGST+SGST is right in essentially every case; an implementer hard-codes it, every test passes, and the defect surfaces as a filing error the day the first out-of-State registration subscribes. Research **R57**: *"Capture GSTIN + State at vendor onboarding. Never hard-code CGST+SGST."* Make it one server-side function keyed on the recipient's registration State and GSTIN, and make GSTIN + State **required before a paid Subscription can be taken** — the last clause is what makes the first enforceable.

**C-6.2 — The advance rule has the tax period and not the mechanism. `[STILL OPEN from r1/r3 — HIGH]`** *"A prepaid term is an advance whose full liability falls in the period of collection"* is an outcome. The mechanism is one sentence: the invoice is issued **atomically with payment confirmation**, and no period-based or deferred generation exists — which also avoids the Rule 50 Receipt Voucher path entirely (**R58**). As written, the intuitive alternative (invoice on service period, monthly recognition) is not excluded.

**C-6.3 — Rule 46 mechanics and the missing documents. `[STILL OPEN from r1/r3 — HIGH]`** *"Consecutively numbered"* is not Rule 46. Missing: a serial unique **per financial year**, ≤16 characters, restricted character set; **gap-freeness as a database property**, not a word — the identical concurrency problem AD-11 solved properly with a unique index, and AD-31's webhook dedup does not touch serial allocation; **place of supply** with State name; the reverse-charge flag; separate **SAC** lines (998365 Featured, 998439 listing subscription, **R56**); and **credit note and Refund Voucher as documents from day one**, which **R59** requires because *"retrofitting GST document types is painful"* and FR-54's no-non-cancellable-term rule makes a mid-term refund a real path.

**R3-12 — Nothing says when a serial is taken. `[STILL OPEN from r3 — MEDIUM]`** The gap-free property has a precondition: the serial is allocated **at issue, on a confirmed successful payment**, and nothing else takes a number. A draft Invoice, a failed payment that later succeeds, or a cancelled attempt each consume one under a naive design, and every consumed-and-unused serial is a gap a GST officer will ask about.

**C-6.5 — The ₹0 tier's tax consequence. `[STILL OPEN from r1/r3 — MEDIUM]`** AD-34's *"An issued invoice is immutable"* implies every payment produces one; nothing says the ₹0 Founding tier produces **no invoice and no tax document**, and a ₹0 tax invoice implies a supply. **R60/R61**: any condition attached to the free tier is non-monetary consideration making it taxable at open market value, and the cohort needs a **related-party screen** (relatives, employees, directors, controlled entities) which Schedule I para 2 makes taxable at OMV even at ₹0. That screen is a field on the Vendor, not a policy.

**C-6.6 — GST-inclusive display. `[STILL OPEN from r1/r3 — MEDIUM]`** AD-19's mechanism is right; **R25** and NFR 5.5's drip-pricing ban fix *which* number: the payment surface renders the **GST-inclusive all-in total** with the split shown, never a pre-tax figure that grows at checkout.

---

## 7. Accessibility — NFR 5.8: is a conventions row adequate, or does it need an AD?

**DOES NOT COVER.** The row is verbatim unchanged, Desk over-claim included.

> *"WCAG 2.1 AA on all five surfaces, the two public Guest pages included (NFR 5.8); nothing essential conveyed by colour alone — verified status, availability and paid placement each carry a non-colour indicator."*

**Answer: the row is not adequate — but a new AD-37 is the wrong remedy, and would make the document worse.**

A row is the right home for a *rule that one team applies inside one codebase*. It is the wrong home for a *mechanism that must hold across three independently-built clients*, which is this spine's own stated test: *"Fixes only what two independently-built units could otherwise choose incompatibly."* Three of the four things NFR 5.8 needs are that second kind, and each already has an AD whose shape fits it. So the fix is three sentences in three existing ADs plus one Conflicts row — not a new AD that would restate the NFR at greater length and bind nothing.

**What belongs where:**

1. **The non-colour indicator vocabulary → `packages/shared`, beside AD-19's money formatter. `[C-7.1 STILL OPEN — MEDIUM]`** Verified status, availability and paid placement each render in the Expo app, the vendor portal and the guest pages: three stacks, three teams, three chances to ship a green dot. The row states the rule and names no owner, which is precisely the failure AD-24 solves for vocabulary and AD-19 solves for money. One sentence in the Conventions row naming `packages/shared` as the owner turns a convention into something a reviewer can check.
2. **The paid-placement label → AD-4's contract as a required non-empty field, and AD-22's two disjoint collections. `[C-1.3 STILL OPEN — MEDIUM]`** This is the one that is not really an accessibility item at all: it is simultaneously NFR 5.5's dark-pattern ban, FR-20's *"distinctly marked band, identified to the Family as paid placement"*, and research **R13** (legible at the smallest viewport, in both themes, on every surface). AD-22 states the band rule in prose and it does not reach the wire — the response is still free to be one merged array with a `featured: true` flag, which three clients will interleave three ways. Two disjoint collections in the contract makes it tier-1-by-shape, which is where AD-4 already puts everything else crossing to three clients.
3. **The two public Guest pages' rendering strategy → AD-30. `[C-7.3 STILL OPEN — MEDIUM]`** NFR 5.8 includes them deliberately and gives the reason: *"many who reach it do so because someone forwarded the link, and none of them chose to be there at all."* Elderly relatives, cheap Androids, poor connections, no account. That these pages render server-side, work without a client runtime for the primary action, and hold AA at a low-end viewport as a release condition is an architecture decision about reach, not a UX preference — and it is the same server-side requirement FR-12's link preview already implies. The source tree still says only `apps/guest-web/ # Next.js · Guest — RSVP + guest form`.
4. **The Desk claim → Conflicts. `[C-7.4 STILL OPEN, regressed — MEDIUM]`** Per the spine's own `scope`, the five surfaces include **Frappe Desk**, and NFR 5.8 does say *"the admin panel"*. Vivah Spot does not control Desk's WCAG conformance and cannot deliver AA on it. Round 1 asked for one honest line in Deferred or Conflicts; the revision instead wrote the claim into Conventions, which is worse than the silence it replaced — an obligation that was visibly unaddressed is now visibly discharged, and nobody will look again. *Desk's own WCAG conformance is a third-party property outside the platform's control* belongs in Conflicts beside the other nine.
5. **The contrast-locked token → the Conventions row that already mentions tokens. `[C-7.2 STILL OPEN — MEDIUM]`** NFR 5.10: *"One token in the palette is an accessibility decision, not an aesthetic one. The muted text colour was deliberately darkened to meet contrast on white. It must not be lightened."* `packages/shared` is spine-governed — AD-4 generates into it, AD-19 puts the formatter in it — and the spine mentions the tokens file three times without ever saying one of its values is a compliance constraint. A future agent doing visual polish has, in this document, no reason not to lighten it.

What *does* stay a conventions row, correctly: "nothing essential conveyed by colour alone" as a rule, and "WCAG 2.1 AA" as the standard — once the surface list is honest.

---

## New compliance gaps created by AD-35, AD-36 and the legal hold

Asked directly, so answered directly. **Yes, in all three, and one of them is the round's CRITICAL.**

| Source | Gap | Severity |
|---|---|---|
| **AD-35** | Takedown is not a term of `is_discoverable`, and *"no other code restates any term of it"* forbids filtering for it elsewhere — FR-63's 3-hour court-order clock has no path to search results (R4-2) | CRITICAL |
| **AD-35** | `discoverable` is a **denormalised stored flag** recomputed on input change and by a **daily** job, with no reconciliation sweep and Enforced-by *"one definition, one writer; plus review."* AD-12's chain gets a verification sweep because a silent divergence matters; a Listing that must be gone and is not is the same class of silent divergence, on a statutory clock. Add a reconciliation job to AD-23's list, or state that every write path recomputes synchronously | MEDIUM |
| **AD-36** | Preferred Vendors made load-bearing without FR-25's acceptance requirement or its same-business disclosure (R4-8) | HIGH |
| **AD-36** | A second placement channel into a Family's view with no purchasability bar, where AD-22 has one for Featured (part of R4-8) | MEDIUM |
| **Legal hold** | Weaker record than a takedown (no ground, no authority as such, no scope, no review date), unbounded duration, suspends erasure with no NFR 5.5 tell-the-person duty, and reopens Guest contacts through the side door the same AD just closed (R4-4) | HIGH |
| **Legal hold** | AD-33's Enforced-by is *"review only"* for a mechanism that can suspend a statutory right indefinitely; the placing and lifting are already AD-27 controller work and the AD does not say so (part of R4-4) | MEDIUM |
| **AD-27's general property** | Append-only versus a grievance's own lifecycle is ambiguous, and the two readings build two different DocTypes (R4-5) | MEDIUM |

---

## The Deferred paragraph: does it now state the position accurately?

**R4-1 — Better in the three ways that matter most, and still false in two. `[STILL OPEN from r3 — HIGH]`**

Current text:

> *"Three gate rounds ran against this spine; every report is in `reviews/`, and **those reports are the authoritative record, not this paragraph**. Round 1 returned FAIL (rubric) and CHANGES REQUIRED (adversarial, compliance); round 2's revision closed 17 of 43 critical-and-high findings and introduced 8 new defects; round 3 found 4 further criticals, all of them created by round 2's own fixes. Every critical and high finding raised in round 3 was then worked through decision by decision with Abhishek and is closed in the text above — **but those fixes have not themselves been reviewed.** A fourth round has not run, and the two previous rounds each found real defects in the round before, so assume this one did too."*
>
> *"What remains open and unworked, chiefly in `review-compliance-r3.md` and `review-adversarial-r3.md`: medium findings on FR-52's tax and invoice-numbering detail, per-AD `Binds` accuracy, and rules stated in two ADs at once."*

**What is now right, and it is the important part.** Three sentences do what round 3 asked: the reports are named as authoritative *over this paragraph*; the fixes are stated as unreviewed; and a reader is told to assume a fourth round would find defects. Round 3's version reclassified fourteen open CRITICAL/HIGH findings as a medium tail by assertion and pointed the reader away from the reports. This version points *at* them. That is a real repair and it should not be undone.

**What is still wrong, in two specific ways.**

**(a) "Every critical and high finding raised in round 3 … is closed in the text above" is false.** Twelve HIGH findings from `review-compliance-r3.md` are open in the text I just read:

| r3 finding | Still open because |
|---|---|
| C-1.1 — no-platform-terms covers Agreements, not Quotes; no Property Setter assertion | AD-27 unchanged on both halves |
| C-1.2 — availability signal has no fields; AD-4 not bound | AD-10 unchanged; `AD-4` absent from it |
| C-2.4 — repeat-infringer register dies at re-registration | AD-33/AD-14 unchanged |
| R3-5 — two acknowledgement clocks (24h / 48h) | AD-33 carries removal clocks only |
| C-3.5 — Guest is not a data class; `PERSON` join unforbidden | AD-14's opening sentence unchanged |
| R3-8 — consent does not record the notice version | `notice` absent; no `NOTICE` entity |
| R3-10 — Guest provenance + R31 family attestation | `provenance`, `attestation` absent |
| C-4.3 — clock: NTP, UTC, operating-properly record | Deferred entry **verbatim unchanged** |
| C-4.4 — certificate inputs (R76) | Snapshot carries 3 of 10 |
| C-6.1 — GSTIN + State captured; one tax function | `GSTIN` absent |
| C-6.2 — invoice atomic with payment | AD-34 unchanged |
| C-6.3 — Rule 46 mechanics; credit note and Refund Voucher | `financial year`, `place of supply`, `Refund` absent |

Even on the narrowest reading — that "raised in round 3" means only the findings *first* raised in round 3 — it is still false: **R3-8** and **R3-10** are both marked `[NEW in round 3]`, both HIGH, and both untouched.

**(b) The residue is described as medium-only, and three of the twelve are relabelled.** *"Medium findings on FR-52's tax and invoice-numbering detail"* names C-6.1, C-6.2 and C-6.3, which `review-compliance-r3.md` rates **HIGH** — tax computed from the wrong State is a filing error, and Rule 46 non-compliance is a defect in the platform's only revenue document. This is round 3's C-1 defect in reduced form: reclassification by assertion, in the paragraph a downstream agent reads instead of the reports.

**(c) On verdicts, asked directly: round 1 yes, rounds 2 and 3 no.** Round 1 is given as verdicts (*FAIL (rubric) and CHANGES REQUIRED (adversarial, compliance)*), though `review-versions.md`'s *PASS with corrections* is omitted. Rounds 2 and 3 are given as **counts, not verdicts**. So a reader never learns that `review-closure.md` returned **CHANGES REQUIRED**, nor that `review-rubric-r3.md` returned **FAIL** — the most recent verdict of the checklist lens on this document, and the one a downstream agent most needs.

**(d) "Round 3 found 4 further criticals, all of them created by round 2's own fixes" is an undercount and a mischaracterisation.** Four is `review-adversarial-r3.md`'s count. `review-compliance-r3.md` raised **three more** new CRITICALs (R3-1, R3-2, R3-6) and recorded **three round-1 CRITICALs as still not closed** (C-3.2 breach, C-3.3 Desk reads, C-4.2 digest). Those last three are the refutation of *"all of them created by round 2's own fixes"* — they were round-1 findings that survived two revisions. It is worth being accurate about this precisely *because* all three are now genuinely fixed: the paragraph undersells the round's actual achievement while overstating its completeness.

**Rewrite it to say what is true, which is a better story than the one it tells:** round 1 FAIL (rubric) / CHANGES REQUIRED (adversarial, compliance) / PASS with corrections (versions); round 2 closure CHANGES REQUIRED, 17 of 43 closed, 8 new defects; round 3 FAIL (rubric) / CHANGES REQUIRED (adversarial, compliance) / PASS with corrections (versions), seven new criticals across two lenses plus three round-1 criticals still open. **Every round-3 CRITICAL is closed in the text above, including the evidential-artifact finding that could not have been retrofitted after the first Agreement.** A tail of round-3 HIGHs is not: the FR-52 GST mechanics, the certificate's contemporaneous inputs, the clock disciplines, the notice version, Guest provenance and data-class isolation, the repeat-infringer anchor, the acknowledgement clocks, the availability signal's shape, and the Quote-side no-platform-terms rule. **None of these fixes has been reviewed.**

---

## Consolidated: what to add

| # | Add | Where | Severity | Marker |
|---|---|---|---|---|
| 1 | `not under takedown (AD-33)` as a term of `is_discoverable`; cite FR-63 and AD-33 in Binds; takedown recomputes the flag immediately | AD-35, AD-33 | CRITICAL | NEW r4 |
| 2 | Correct the Deferred paragraph: rounds 2 and 3 verdicts (incl. rubric FAIL), criticals closed / HIGHs open, drop the medium relabelling | Deferred | HIGH | STILL OPEN r3 |
| 3 | Separate breach scopes: read logging stays Guest-scoped; the `Breach Incident` record and the 72-hour duty cover any personal data; affected set derived from the compromised store where no read log exists; `BREACH INCIDENT` in the ERD; read-log retention ≥1 year (R38) | AD-32, AD-23, ERD | HIGH | STILL OPEN r3 |
| 4 | Legal hold carries ground, authority, scope and a review date; an erasure blocked by a hold is answered under NFR 5.5; placing/lifting are AD-27 controller work, not "review only" | AD-33 | HIGH | NEW r4 |
| 5 | Preferred Vendor row published only on the named Vendor's acceptance; same-business relationship a required disclosed attribute; no fee writes one | AD-36 | HIGH | NEW r4 |
| 6 | Rights surface: identical response and timing for unproven and unknown numbers; add **erasure** beside access and correction (R36) | AD-30, AD-32 | HIGH | STILL OPEN r3 |
| 7 | Certificate inputs in the snapshot — confirming user and role, app/deploy version, host identity, terms/format version, custodian (R76) | AD-12 | HIGH | STILL OPEN r1/r3 |
| 8 | Rewrite the RFC 3161 deferral as an accepted decision; NTP to NIC/NPL, UTC storage + IST display, operating-properly record; drop the hash-chain justification | Deferred, Conventions | HIGH | STILL OPEN r1/r3 |
| 9 | Notice as a versioned immutable record; consent stores the version in force; the NFR 5.5 "which basis" sentence resolves from it | AD-32, ERD | HIGH | STILL OPEN r3 |
| 10 | Repeat-infringer anchor: salted one-way hash over phone (and PAN/GSTIN) surviving erasure **and re-registration**; second exception in AD-14 (R20) | AD-14, AD-33 | HIGH | STILL OPEN r1/r3 |
| 11 | Guest as a data class: never a `PERSON` row, never joined to `PERSON`, never deduplicated across Weddings; amend AD-14's opening sentence | AD-14 | HIGH | STILL OPEN r1/r3 |
| 12 | Guest provenance field (family-supplied / member-suggested / self-submitted) + R31's non-pre-ticked attestation at upload | AD-14, AD-32 | HIGH | STILL OPEN r3 |
| 13 | Two grievance tracks with two acknowledgement clocks (24h intermediary, 48h consumer) as a field | AD-33, AD-23 | HIGH | STILL OPEN r1/r3 |
| 14 | Availability signal's fields stated; AD-4's contract carries no boolean-availability variant — **before `api/family/v1` freezes** | AD-10, AD-4 | HIGH | STILL OPEN r1/r3 |
| 15 | Extend no-platform-terms to Quote and Amendment fields; startup assertion over `Property Setter` defaults | AD-27 | HIGH | STILL OPEN r1/r3 |
| 16 | Tax as one server-side function; GSTIN + State captured at onboarding, required before a paid Subscription (R57) | AD-34 | HIGH | STILL OPEN r1/r3 |
| 17 | Invoice issued atomically with payment confirmation; no period-based generation (R58) | AD-34 | HIGH | STILL OPEN r1/r3 |
| 18 | Rule 46 mechanics: per-FY reset, ≤16 chars, DB-enforced gap-freeness, place of supply, reverse-charge flag, SAC lines; credit note and Refund Voucher from day one (R56, R59) | AD-34 | HIGH | STILL OPEN r1/r3 |
| 19 | Append-only means a field is written once; a lifecycle fills empty fields; a correction is an appended row | AD-27 | MEDIUM | NEW r4 |
| 20 | `discoverable` flag reconciliation sweep in AD-23, or synchronous recompute on every write path | AD-35, AD-23 | MEDIUM | NEW r4 |
| 21 | One-time-code path carved out of AD-21's recipient type, reachable only by a request the recipient made | AD-21, AD-30 | MEDIUM | NEW r4 |
| 22 | AD-30's "nothing is stored" corrected — the code, the per-number counters and AD-32's access log all persist | AD-30 | MEDIUM | NEW r4 |
| 23 | NFR 5.9 row (or a triggered Deferred entry) for the DPDP notice text, lawful-basis determination and the eight-year retention basis, so the counsel deferral has an addressee | Deferred / PRD NFR 5.9 | MEDIUM | NEW r4 |
| 24 | FR-61 tension recorded in Conflicts — the permlevel resolves it in favour of the confinement duty, against FR-61's headline sentence | Conflicts | MEDIUM | STILL OPEN r1/r3 |
| 25 | Name the evidential DocTypes, and the permlevel-restricted Guest fields, as forbidden to `db.set_value` / `db.sql` | AD-16 | MEDIUM | STILL OPEN r1/r3 |
| 26 | Preserved (180-day) content is investigation-purpose only and not returned to ordinary reads | AD-33 | MEDIUM | STILL OPEN r3 |
| 27 | Search returns organic and promoted as two disjoint collections; paid label a required non-empty field (R13) | AD-22, AD-4 | MEDIUM | STILL OPEN r1/r3 |
| 28 | "Removal is a state transition, never a delete"; FR-63's 180 days and the hold added to AD-14's ladder | AD-33, AD-14 | MEDIUM | STILL OPEN r1/r3 |
| 29 | AD-21's composed invitation always carries sender identity, reason for receipt, one-tap opt-out and notice link (R32) | AD-21 | MEDIUM | STILL OPEN r3 |
| 30 | Three breach clocks named separately: Rule 7 to principals without delay, 72h Board, CERT-In 6h (R22, R39) | AD-32, Deferred | MEDIUM | STILL OPEN r3 |
| 31 | Token entropy floor (CSPRNG ≥128 bits), constant-time comparison, constant-work lookup; state the FR-12 link-preview carve-out against `noindex` | AD-30 | MEDIUM | STILL OPEN r1/r3 |
| 32 | No `allow_guest` method takes a Wedding/Guest/Function identifier; revocation re-checked per request, uncached | AD-30 | MEDIUM | STILL OPEN r1/r3 |
| 33 | Hosting constrained to India-region, 180-day in-India ICT logs, NTP discipline, 6-hour incident capability (R22) | Deferred | MEDIUM | STILL OPEN r1/r3 |
| 34 | Encryption at rest for contact data (R37) | Deferred / AD-29 | MEDIUM | STILL OPEN r1/r3 |
| 35 | No consent control ships pre-checked; consent controls come from `packages/shared` (R31, R70) | Conventions | MEDIUM | STILL OPEN r1/r3 |
| 36 | FR-64 ranking disclosure and the R12 "no payments, and why" statement reachable without login from every surface | Capability map | MEDIUM | STILL OPEN r1/r3 |
| 37 | Serial allocated at issue on a confirmed payment; nothing else consumes a number | AD-34 | MEDIUM | STILL OPEN r3 |
| 38 | ₹0 Founding tier issues no tax document; related-party screening field on Vendor (R60, R61) | AD-34 | MEDIUM | STILL OPEN r1/r3 |
| 39 | GST-inclusive all-in total is what the payment surface renders (R25) | AD-19, AD-34 | MEDIUM | STILL OPEN r1/r3 |
| 40 | Pricing model declares arithmetic over a Vendor's own rates and never supplies a value | AD-8 | MEDIUM | STILL OPEN r3 |
| 41 | Non-colour indicators for verified / available / promoted defined once in `packages/shared` | Conventions | MEDIUM | STILL OPEN r1/r3 |
| 42 | Muted-text token marked contrast-locked; contrast assertion in the gate (NFR 5.10) | Conventions | MEDIUM | STILL OPEN r1/r3 |
| 43 | Public Guest pages server-rendered, primary action works without client JS, AA a release condition | AD-30 / Capability map | MEDIUM | STILL OPEN r1/r3 |
| 44 | Move the Desk-AA claim from Conventions to Conflicts | Conventions → Conflicts | MEDIUM | STILL OPEN r1/r3 |
| 45 | State whether ERPNext is installed; no accounting document references a Family; payment module importable only from the Subscription handler | AD-19, AD-34 | MEDIUM | STILL OPEN r1/r3 |
| 46 | Name the archival format for the frozen artifact (R74 says PDF/A); log that each party took their copy | AD-12 | LOW | NEW r4 |

## Conflicts to add to the spine's upstream table

| Conflict | Why it must be recorded |
|---|---|
| **FR-61's "no capability withheld by role" vs FR-61's own confinement-and-logging duty, NFR 5.7 and DPDP Rule 6** | The architecture has now **taken a side** — AD-32's permlevel withholds a read capability by role — where in round 3 it was merely silent. The PRD is unamended and still self-contradicting. Third round asked for. |
| **Family-uploaded Guest contacts have no clean lawful basis under DPDP** | Research §290 reaches this and calls it unresolved. AD-32 correctly stops asserting a basis; the *conflict* it stops asserting still needs recording, because it is what R4-9's counsel question exists to answer. |
| **NFR 5.5's "engagement between two parties" as a retention basis vs DPDP ss.6/7** | The Act has no contract ground. The PRD's precedence is implementable; its classification is not the Act's, and the eight-year retention needs the s.8(7) carve-out stated in the notice. AD-32 now says so about itself; the PRD does not. |
| **NFR 5.8 "every surface" vs Frappe Desk as the admin panel** | Third-party conformance outside the platform's control, currently asserted in Conventions rather than recorded here. |
| **FR-12's mandatory Vivah Spot attribution line vs research R32's "zero Vivah Spot promotion"** | Meta policy and the guest's non-consent both argue for a bare invitation; the PRD requires an attribution line. Small, and it is a decision someone made and should own. |

## What this review did not examine

Reviews (FR-44–FR-49) against IS 19000, including **R70**'s non-pre-ticked consent that Vendors may rate Families with an appeal route, **R71**'s published review T&Cs, **R72**'s vendor right of reply and **R73**'s incentivised-review marking — none of which appears in the spine and all of which read as data-model constraints; **R69**'s finding that vendor→family feedback must be structured and private to vendors; the E-Commerce Rule 5(3) vendor-disclosure fields (geographic address, customer-care number) as required Listing data; the Rule 4(2) entity-disclosure surface; TRAI/DLT registration if the SMS fallback ever carries user-facing content; and the 2026 IT Rules amendments' synthetically-generated-content labelling, which bites the moment any invitation artwork or listing copy is AI-generated. AD-35's and AD-36's non-compliance consequences (the discoverability predicate's correctness, the NestedSet choice) belong to the rubric and adversarial lenses.

---

*Reviewed against `prd.md` (amended 2026-09-06) FR-11, FR-12, FR-20, FR-24, FR-25, FR-32, FR-39–FR-43, FR-50–FR-54, FR-58–FR-64, FR-66, FR-69, FR-72, NFR 5.5–5.10, §7.1, §7.2, §7.9; `research-india-regulatory.md` R1–R81; and the round-3 reports in `reviews/`.*
