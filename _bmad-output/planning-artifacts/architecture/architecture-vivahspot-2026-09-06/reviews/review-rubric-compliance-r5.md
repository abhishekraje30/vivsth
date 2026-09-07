---
review: rubric + compliance (two lenses, one pass)
round: 5
target: '_bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md'
prior:
  - 'reviews/review-rubric-r4.md (FAIL)'
  - 'reviews/review-compliance-r4.md (CHANGES REQUIRED)'
driving_spec: '_bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/prd.md (amended 2026-09-06, FR-62/UJ-4)'
supporting: 'research-india-regulatory.md · CLAUDE.md · DEFERRED.md · coding-standards.md'
measured: '11,817 words · 631 lines · 36 ADs (AD-1..AD-36), 2026-09-06'
verdict_rubric: FAIL
verdict_compliance: 'CHANGES REQUIRED'
---

# Rubric + Compliance review, round 5 — ARCHITECTURE-SPINE.md

Two lenses, one pass. Every finding is marked `[STILL OPEN from r4]` or `[NEW in r5]`.
Severity: **CRITICAL** (posture-breaking or not retrofittable) · **HIGH** (obligation or divergence
with no architectural home) · **MEDIUM** (real gap, retrofittable) · **LOW** (clarity).

---
---

# LENS A — RUBRIC

## Verdict: FAIL

**This is the best-targeted revision of the five, and it fails on the same three items.**

Round 4 named five shapes two units could still choose incompatibly. **Four are genuinely closed** —
the running budget's writer (AD-19's `recompute_budget`, and `FR-8` is cited for the first time in
five rounds), the ERD's Enquiry parentage (now `WEDDING ||--o{ ENQUIRY`), Place coverage cardinality
(*"several areas at different levels (FR-33), so coverage is any of them"*), and Rule scope (*"to the
Space where the Service has Spaces, to the Listing where it does not"*). Round 4's flagship item-2
finding — AD-26's missing commit boundary for FR-32, open since round 1 — is closed properly, and
closed at a better altitude than I asked for: instead of a sentence about transactions, cascade 2's
transition row is *defined* as being written on Agreement confirmation rather than on acceptance, so
the race cannot be lost and the Shortlist cleared. That is the single best edit in this revision.

- **Item 1 — FAIL.** Two shapes remain and two are new. AD-11's `resource` is verbatim unmoved for
  the third round (R5-6). **New:** AD-14 makes a Guest a `PERSON` row without saying whether Guest
  person records deduplicate across Weddings or merge with an account holder's — and the two answers
  build two different databases with two different legal postures (R5-1). **New:** AD-35 asserts a
  call graph that AD-20, AD-27 and AD-29 still do not acknowledge, and AD-20's new
  `is_publicly_visible(image)` enumerates three terms that demonstrably exclude the one AD-35 claims
  it calls (R5-4).
- **Item 2 — FAIL.** R4-1 and R4-6 are closed. Still open verbatim: AD-21's inert type signature
  (R5-8), AD-1/AD-2's unreachable Prevents (R5-12), AD-24's out-of-tree gate scope (R5-11),
  AD-32/AD-33's Enforced-by lines that under-claim the controller guard AD-27 now gives them (R5-13).
  **New:** AD-26's own invocation rule and its composition graph disagree about whether a composed
  cascade writes a transition row or is called directly (R5-2), and AD-35's writer is not joined to
  AD-26's cascade-4 transition row (R5-3).
- **Item 7 — FAIL, and worse than round 4.** **11,817 words, 631 lines, 36 ADs**, against round 4's
  10,568 / 580 / 36 — **up 11.8%** on a document I called over the ceiling at 10,568 and asked to cut
  by 1,800–2,200 words. Section C below names the passages. Answering plainly, as asked: **item 7
  does not pass.**

Item 3 passes. Items 4, 5 and 6 pass with findings; item 6's single silence (NFR 5.10) is unchanged
for the third round.

## A. Round-4 closure ledger

| r4 finding | Sev | Status in r5 | Where |
|---|---|---|---|
| R4-1 AD-26 commit boundary (FR-32) | HIGH | **Closed, well** — cascade 2's transition is written *on confirmation, not on acceptance*; the load-bearing reason is stated | AD-26 |
| R4-2 Running budget writer; FR-8 uncited | HIGH | **Closed** — `recompute_budget(wedding)` is the single writer; Span-once, per-head, *not yet estimated*, overrides as own rows; FR-8 cited | AD-19 |
| R4-3 AD-35 flag writer / seventh cascade | MED-HIGH | **Half closed** — `recompute_discoverable` named and forced onto `doc.save()`; its **layer** is still unnamed and AD-26's closed six still excludes it | R5-3 |
| R4-4 AD-8 partition not exhaustive | MED-HIGH | **Half closed** — a third bucket exists; its FR-62 outcome does not | R5-7 |
| R4-5 AD-35's callers do not cite it | MED-HIGH | **Open — and now contradicted** | R5-4 |
| R4-6 AD-20 two gates vs AD-29 three | MED-HIGH | **Closed** — one function, `is_publicly_visible(image)`, three terms, AD-29 restates none | AD-20/AD-29 |
| R4-7 AD-11 `resource` polymorphic | MED-HIGH | **Open — unmoved, verbatim, third round** | R5-6 |
| R4-8 Place cardinality; "Place a Listing sits at" | MED | **Closed** — several areas; the travelling Vendor's Place is where the business sits. ERD still has no `PLACE` | R5-14 |
| R4-9 Rule scope; Preferred Vendors | MED | **Mostly closed** — Rule attaches per Space; two of FR-25's three guards carried | R5-5 |
| R4-10 Deferred review-history over-claims | MED | **Closed on the table, open on the sentence beside it** | R5-9 |
| R4-11 ERD hangs Enquiry off Selection | MED | **Closed** — `WEDDING ||--o{ ENQUIRY`; multi-send batch still unmodelled | R5-14 |
| R4-12 AD-21 "the type signature" | MED | **Open — unmoved** | R5-8 |
| R4-13 NFR 5.10 zero citations | MED | **Open — unmoved** (verified: `5.10` appears only in `scope` and `binds`) | R5-10 |
| R4-14 / C.1 Terseness | MED | **Open — worse (+11.8%)** | §C |
| R4-15 AD-1 / AD-2 Prevents | MED | **Open — unmoved** | R5-12 |
| R4-16 AD-24 gate scope | MED | **Open — unmoved** | R5-11 |
| R4-17 Frappe mechanics restated ×8 | MED | **Open — unchanged in count**; AD-4's return-annotation claim survives a fourth round | R5-15 |
| R4-18 AD-14 vs AD-33 hold; infringer register | MED | **Half closed** — the hold now outranks erasure explicitly; the register's anchor is unchanged | Lens B R5-B4 |
| R4-19 `Binds` residuals | LOW-MED | **Half closed** — AD-11 still omits FR-28/FR-14; AD-8/FR-71 unresolved | R5-16 |
| R4-20 AD-32/AD-33 Enforced-by under-claim | LOW | **Open — unmoved** | R5-13 |
| R4-21 Residue and tidy | LOW | **Open — 5 of 6 unmoved**; only the decision-log narration was cut | R5-17 |

**7 closed · 5 half · 9 open · 4 new.**

## B. Findings

### R5-1 · HIGH — "A Guest is a person record like any other" is an unfinished decision, and the two readings build two different databases `[NEW in r5]`

AD-14: *"**A Guest is a person record like any other**, carrying AD-32's retention outcome `erase`…
so there is one erasure mechanism, not two."* The ERD adds `PERSON ||--o| GUEST : "is a person
record"`.

The economy is real and the motive is right. What is missing is the cardinality, and every
surrounding rule pushes the two readings apart:

- AD-14's own first sentence — *"No record copies a person's name or number; **every record
  references one person record**"* — read literally makes the number the identity of the row, so a
  Guest invited to two Weddings, or a Guest who is also a Vendor, is **one** row.
- AD-28 reinforces it: *"The mobile number is the identity and **one person is one account**"*, with
  `mobile_no` unique.
- AD-30 contradicts it for the guest path: *"No account is created and nothing is stored."*

So unit A builds one `PERSON` per number and deduplicates Guests across Weddings; unit B builds one
`PERSON` per (Guest, Wedding) and never reconciles. Three consequences, and they are not cosmetic:

1. **Under reading A, AD-32's outcome field is unsatisfiable on a shared row.** The same row is
   `erase / purpose-limited` as a Guest and `keep, person anonymised / engagement record` as a
   Vendor. AD-14's Guest trigger — *"30 days after the Wedding concludes"* — would then clear the
   identifying fields of a live Vendor account. AD-32 records the outcome *per datum*; AD-14 erases
   *per person record*. Those two granularities have to meet and do not.
2. **Under reading A the FR-12 join is not merely permitted, it is structural.** "This guest is
   already a user" is not a feature someone has to build — it is what the schema returns. Lens B
   §3 carries this as a compliance finding (R5-B1); at rubric altitude it is the plainest item-1
   divergence in the document.
3. **Under reading B, the "one erasure mechanism, not two" claim is false**, because the Guest rows
   are a disjoint population with a different trigger, a different outcome and no account.

**Fix:** one clause. Either *a Guest person record is scoped to one Wedding, is never deduplicated
across Weddings and is never reconciled against an account holder's* — which keeps AD-14's mechanism
and closes the join — or *the outcome field is per (person, purpose) and erasure clears only the
fields held for the purpose that ended*, which is a bigger change. The first is almost certainly the
intended one and is not written down.

### R5-2 · MEDIUM-HIGH — AD-26's invocation rule and its composition graph disagree `[NEW in r5]`

The rebuilt AD-26 is the strongest single AD in the document and it now says two things that cannot
both hold:

> *"A cascade is invoked by `doc_events` on the document whose change *is* the transition — **never by
> a direct call from `api/`**. Where a trigger is not a change to the cascading document, the trigger
> is *made* one: a **named transition row** is written… and `doc_events` on **that row** is the single
> invocation."*
>
> *"**Composition is allowed and stated.** A cascade **may call another**: 1→3, 2→3, 5→4, 6→3."*

"May call another" is a direct call. If composition really is a direct call, then a cancellation
reached through cascade 1 does **not** write a `Cancellation` row — and AD-26's own table makes that
row the thing that identifies a cancellation *"wherever `docstatus` reaches 2 — Desk included"*,
which is also what AD-12 keys occupancy release to. A Desk cancel and a cascade-1 cancel then travel
different routes, which is the exact failure the named-transition-row design exists to abolish.

**Fix:** say that composition is expressed by writing the downstream cascade's transition row, not by
calling its function — one clause, and it makes the graph and the invocation rule the same rule.

### R5-3 · MEDIUM-HIGH — `recompute_discoverable`'s layer is still unnamed, and it is not joined to cascade 4's transition row `[STILL OPEN from r4, narrowed]` (R4-3)

Genuinely closed: the pure/writing split, `doc.save()` over `db_set` with the reason (*"would leave
search correct while AD-26's cascade 4 never fires"*), and the enumerated inputs on five documents.
That is most of what R4-3 asked for.

Two joints are still open, and they are adjacent:

1. **Which layer holds the function.** Recomputing a `Listing` field when a `Subscription` or
   `Vendor` row changes is, in AD-26's own words, *"an operation spanning more than one entity"*,
   which AD-26 says lives in `domain/` — and AD-26's title and Rule both still say **there are six**
   and enumerate all six. `recompute_discoverable` is not among them. Seventh cascade, or exception?
   Both readings are compliant and they produce different code.
2. **Who writes the `Listing Condition Change` row.** AD-26 gives cascade 4 that named transition and
   says it is written *"by the Listing, by the Subscription-lapse job, or by a Service-level
   fan-out"*. AD-35 instead relies on `doc.save()` on the Listing firing `doc_events`. AD-26
   explicitly rejects that shape: *"binding `on_update` of the affected document is not [the same
   route], because Desk can change that document without the transition."* So either
   `recompute_discoverable` writes the transition row (and AD-35 should say so) or cascade 4 is bound
   to `Listing.on_update` (and AD-26 forbids it). **Fix: one clause in AD-35 — `recompute_discoverable`
   writes the `Listing Condition Change` row when the computed value changes, and nothing else does.**

Also unaddressed from round 4: no reconciliation sweep for the stored flag appears in AD-23's four
spine-created jobs, and nothing states the permitted staleness between the column search filters on
and the function AD-10 calls.

### R5-4 · MEDIUM-HIGH — AD-35 still asserts a call graph its callers do not carry, and AD-20's new function contradicts it `[STILL OPEN from r4 — now a contradiction]` (R4-5)

Verified by grep: `AD-35` appears in exactly three places — its own heading, AD-10's Rule, and the
Capability map. AD-20, AD-27 and AD-29 were **not** amended, while AD-35 still closes:

> *"AD-10's subscription gate, AD-20's public read path, AD-26's cascade 4, AD-27's conditions of
> listing and **AD-29's public-object predicate all call `is_discoverable`**."*

Round 4 called this one-directional wiring. Round 5 made it a contradiction, because AD-20 now
*defines* the counterpart function:

> AD-20: *"**`is_publicly_visible(image)` is the only statement of image visibility** — three terms:
> **verified**, **within the Tier's allowance**, and **not under takedown**."*
> AD-29: *"An object is served from the public path only while `is_publicly_visible(image)` holds
> (AD-20)… **this AD restates none of them**."*

Three terms, exhaustively enumerated, and `is_discoverable(listing)` is not one of them. So a Listing
withdrawn by its Vendor, removed by Admin under FR-60, or past its Grace Period keeps every
portfolio image served from the public CDN path indefinitely. Takedown is safe — it is a term of both
predicates — so this is not the statutory failure round 4 found, but it is the same shape one notch
down, and it is FR-53's *"the Listing stops appearing"* leaking on three of its four routes.

**Fix:** add *the Listing is discoverable (AD-35)* as a fourth term of `is_publicly_visible`, and put
the one-clause citation into AD-20, AD-27 and AD-29 that round 4 asked for. Until AD-35's claim and
its callers' text agree, the sentence *"No other code restates any term"* is enforcing nothing.

### R5-5 · MEDIUM — Preferred Vendors: two of FR-25's three guards, and still no entity `[STILL OPEN from r4, mostly closed]` (R4-9)

AD-36 now carries the two that matter most — *"a named Vendor must accept before the association is
published"* and *"where a Preferred Vendor is the same business it is shown as the same business"* —
and the snapshot-at-confirmation decision is right and well argued. Remaining:

- FR-25's third clause — *"Preferred surfacing is not paid placement and cannot be purchased"* — has
  no home. AD-22 carries the equivalent bar for Featured (*"Neither what a Vendor pays… is a signal"*);
  AD-36 introduces a second channel into a Family's view without one.
- There is still no `PREFERRED_VENDOR` node in the ERD, so the acceptance state and the same-business
  flag — the two fields the guards are *about* — are prose in an AD rather than a modelled relation.

### R5-6 · MEDIUM-HIGH — AD-11's `resource` is polymorphic three ways, verbatim, for the third round `[STILL OPEN from r4]` (R4-7)

> *"**`resource` is the Space** where the Service has Spaces, and the **Listing** where it does not;
> for a rental-period Service it is the **inventory item**, which is a Space-like row of the same
> kind."*

Unmoved. The rental clause still contradicts the clause before it, and *"a Space-like row of the same
kind"* still stops short of saying inventory items **are** Space rows. `(resource, day, slot, seat)`
names four columns, but Frappe `name` values are unique **per DocType, not globally**, so one
`resource` column over three parent DocTypes is unsafe on its own and a Dynamic Link makes the index
five. This is the one AD whose Enforced-by is *"**the database** — a unique index, which no code path
can talk past"*; that claim is only as good as the column list, and the column list is wrong or
under-specified. The ERD still models two parents and no inventory item.

### R5-7 · MEDIUM — AD-8's third bucket has a name but no FR-62 outcome `[STILL OPEN from r4, narrowed]` (R4-4)

Round 4 asked for Order Basis and pricing model to be placed in a bucket. Round 5 invented a third:
*"**Order Basis and pricing model are presentational-and-arithmetic**: they feed AD-19's
`recompute_budget`… changing one re-derives figures rather than reinterpreting stored occupancy."*

The distinction is defensible. The consequence is not stated, and the consequence is the whole point
of the partition. Buckets one and two each carry an explicit FR-62 verdict (*"FR-62 holds as
written"* / *"it does not"*). Bucket three carries neither, and its label contains the word
*presentational*, which points at bucket one, while its explanation (*"re-derives figures"*) points at
bucket two — because an all-in price authored under a per-unit model does not mean the same number
under a per-head one. **One clause:** say whether an existing Listing's stored price is re-derived
under the new model or kept as authored. Two units will otherwise infer differently, about money.

### R5-8 · MEDIUM — AD-21's enforcement is still an inert annotation `[STILL OPEN from r4]` (R4-12)

Verbatim: *"**Enforced by: the type signature** — a Guest is not a type the function accepts."* A
Python annotation is inert at runtime and `DEFERRED.md` D-6 records that the backend has no gate of
any kind, so nothing reads it. Pass a phone-number string and the message goes. Round 4's fix stands
unchanged: make the parameter a link a Guest record cannot produce, and say the function raises.

### R5-9 · MEDIUM — The Deferred verdict table is accurate; the sentence beside it is not `[STILL OPEN from r4, mostly closed]` (R4-10)

Answering the question asked directly. **The table is accurate.** I checked all thirteen cells
against the front matter of every report in `reviews/`:

| Claim | Verified |
|---|---|
| r1 rubric FAIL / adversarial CR / compliance CR / versions PASS w/ corrections | ✓ |
| r2 closure CR — 17 of 43 closed, 8 new defects | ✓ (`review-closure.md`) |
| r3 rubric FAIL / adversarial CR — 4 critical / compliance CR / versions PASS w/ corrections | ✓ |
| r4 rubric FAIL / adversarial CR — 6 critical / compliance CR / versions CR — 3 claims contradicted | ✓ |

Replacing the narration with a verdict table is the right move and it closes the finding three
rounds have carried. Two things stop it being **sufficient**:

1. **"Round 5 addressed round 4's six criticals and its named highs."** The second half is false and
   is the same over-claim in shorter form. Of `review-compliance-r4.md`'s eighteen HIGH rows, I can
   verify **five** as addressed (the AD-35 takedown CRITICAL, the legal hold's record, two of three
   Preferred Vendor guards, the breach record's scope, the Deferred paragraph). Thirteen are
   untouched, several verifiable by a single grep: `GSTIN`, `financial year`, `place of supply`,
   `Refund`, `NTP`, `provenance`, `attestation` and `notice`-as-a-record all appear **zero times**.
   The instruction that follows (*"Read `reviews/review-*-r4.md` before cutting epics"*) is the right
   answer; the sentence before it tells the reader they need not.
2. **The critical counts are adversarial-only**, so a reader learns compliance raised none — it
   raised one in r4 and three in r3. Either column the counts per lens or drop them; the verdicts
   alone do the job.

**Fix:** delete *"and its named highs"*. Six words, and the section becomes true.

### R5-10 · MEDIUM — NFR 5.10 is still the one NFR with zero citations `[STILL OPEN from r4]` (R4-13)

Verified: `5.10` appears only in the front-matter `scope` and `binds`. The contrast-locked muted text
token (*"It must not be lightened"*), and `CLAUDE.md` §4's reason `tokens.js` is plain ESM, still have
no home — while `packages/shared` is spine-governed by AD-4 and AD-19. One Conventions row. This is
the cheapest open finding in the document for the third round running.

### R5-11 · MEDIUM — AD-24's gate still claims a scope it cannot reach `[STILL OPEN from r4]` (R4-16)

Unmoved: the pre-commit gate blocks the banned words *"across `apps/`, `packages/`, **the backend
app** and the root `.html` files"*, while the Structural Seed says the backend is a bench outside this
tree and puts `scripts/vocab-gate.sh` in `vivsth/`. `DEFERRED.md` D-13 inherits the over-scope.

### R5-12 · MEDIUM — AD-1 and AD-2 still claim to prevent business rules in clients `[STILL OPEN from r4]` (R4-15)

Unmoved. AD-1's rule is import direction inside the backend app; AD-2's is the absence of a generic
document API. Neither can see a TypeScript client in another repository. AD-19's *"clients never do
money arithmetic"* is still the only rule in the spine that bites, because it names a forbidden
operation.

### R5-13 · LOW-MEDIUM — AD-32 and AD-33 still under-claim the guard AD-27 gives them `[STILL OPEN from r4]` (R4-20)

AD-33's Rule now says *"Placing and lifting are attributed, recorded and append-only under AD-27"* —
good — but its **Enforced by** is still *"review only"*, and AD-32's is still *"schema review of any
new personal-data field"*. A reader of either Enforced-by line alone concludes these records are Desk-
editable. Two words each.

### R5-14 · LOW — ERD residuals `[STILL OPEN from r4]`

`ENQUIRY` is correctly reparented to `WEDDING`. Still absent: `PLACE`, `PREFERRED_VENDOR`,
`BREACH_INCIDENT`, `NOTICE`, a `SELECTION`→`WEDDING_FUNCTION` edge (AD-19's Span-once and AD-10's
*"only the Functions that Service serves"* both presuppose it; `WEDDING_SERVICE`'s label gestures at
it), and any representation of FR-34's multi-send — `batch` appears zero times in the document.

### R5-15 · LOW-MEDIUM — Frappe mechanics restated, and AD-4's return-annotation claim survives a fourth round `[STILL OPEN from r4]` (R4-17)

Line 30 still promises *"Frappe mechanics are owned by the six `frappe-*` skills — cited, never
restated"*, and eight ADs restate them. Most are load-bearing and should stay. Two are not:
AD-17's version-pinned `db_query.py` / `permissions.py` internals will be false at v17 with nothing
to notice, and **AD-4 still says Frappe *"validates them through Pydantic on every request and
coerces"*** of a contract it describes as *"one request/response shape"*. Frappe's typing validation
applies to **arguments**; return annotations are not validated or coerced. The generator's response
half rests on a guarantee the framework does not give, and this sentence has now survived four
rounds.

### R5-16 · LOW — `Binds` residuals `[STILL OPEN from r4]` (R4-19)

**AD-11** still omits **FR-28** (the FR its Slot enum implements) and **FR-14** (whose Span-continuity
sentence it quotes), and binds *"occupancy rows"*, which is not a requirement. **AD-8 binds FR-71**
and its Rule touches none of FR-71's required capabilities, which AD-5 also claims. **AD-10 binds
FR-34**, which nothing in its Rule touches. **AD-35 does not bind FR-63** although takedown is now
one of its six terms.

### R5-17 · LOW — Residue and tidy `[STILL OPEN from r4]` (R4-21)

Only item 6's first half moved — the decision-log narration is genuinely gone (`Abhishek` now appears
once, in Deferred, where it belongs; the GDPR-versus-DPDP archaeology is cut). Five remain:

1. Conflicts still says *"six sentences marked `[AMENDED]` inline"*; `prd.md` carries **five** inline
   markers (lines 157, 169, 1185, 1188, 1189) plus the `[AMENDED 2026-09-06]` header note at line 11.
2. `api.mobile.v1` is still live on disk in `packages/shared/package.json:6`,
   `packages/shared/src/index.js:5` and `apps/mobile/src/mocks/catalog.ts:4`. `CLAUDE.md` §2 is
   verified rewritten to `api.family.v1`; the committed identifier still has no Conflicts row.
3. AD-24 still describes *"`CLAUDE.md` §6's noun list… is retired"*. Verified on disk: §6 already says
   so itself. Archaeology; the Conflicts row is its home.
4. `apps/guest-web` still does not exist on disk (`apps/` holds `mobile` and `vendor-web`) while the
   Stack table opens *"Client versions read from `package.json` on disk"*. One word — "new".
5. `[ADOPTED]` is still the only status tag in the document, on AD-5; AD-5's *"Accepted cost"*
   paragraph still duplicates the Conflicts row in substance.
6. WCAG AA is still claimed on *"all five surfaces"*, the fifth being Frappe Desk, whose conformance
   Vivah Spot does not own.

## C. Item 7 — the terseness answer, and what to cut

**It does not pass. 11,817 words / 631 lines / 36 ADs — up 11.8% from round 4's 10,568, which was
already over the ceiling.** Section-level: Invariants & Rules is **9,255 words** of the 11,817.
Round 4's C.1 asked for a cut of 1,800–2,200 words. One of its five items was taken (the decision-log
narration, ~400 words); the revision then added ~1,650 elsewhere.

The failure mode is not readability. It is that a builder reads the AD their epic is named after and
nothing else — which is exactly what R5-4 shows happening *inside* the document, where AD-35 names
five callers and none of them was amended.

Largest ADs, measured: **AD-26 704 · AD-28 599 · AD-12 553 · AD-32 515 · AD-27 504 · AD-11 496 ·
AD-36 416 · AD-33 400 · AD-10 361 · AD-8 315.** Do **not** cut these for length — they are long
because the decisions are load-bearing. AD-28 should be *split* (identity + session mechanics; OTP
parameters and rate limits) rather than shortened, and AD-36 is still two ADs welded together (Place;
Rules and Preferred Vendors) as round 4 said.

**Cut these, in priority order — about 1,400 words, no decision lost:**

1. **AD-25 in its entirety (~90 words).** Three sentences restating UH-16, whose Rule is literally
   *"UH-16, unmodified"*. The Conventions table already has `Config | Environment only (AD-25)`
   pointing at an AD that adds nothing to the row. Delete the AD; keep the row; cite UH-16 and D-5.
2. **AD-7 in its entirety (~90 words).** Its Rule is *"UH-9 governs the handlers"* — a restatement of
   a `coding-standards.md` MUST that already carries a tier-2 gate. One Conventions line. Flagged in
   rounds 1, 3 and 4.
3. **AD-13 (~110 words).** A correct decision about one field, Enforced-by *"review only"*, reading as
   FR-42 restated. Fold into AD-12, which already owns `docstatus` semantics.
4. **AD-23's roster (~110 words).** The AD itself says the list *"is not restated here"* and then
   restates nine PRD jobs. Keep the four *"that exist only because this spine created them"* — those
   are genuinely unfindable elsewhere — and delete the nine derivable ones. `hooks.py` is the list.
5. **AD-5's "Accepted cost" paragraph (~85 words)** — duplicates the Conflicts row; and **the `[ADOPTED]`
   tag**.
6. **AD-28's session paragraph (~120 words)** — the `session_expiry` / `login_as` archaeology. Keep
   *"ninety days of inactivity, `2160:00`, site-wide, applies to Admin too"*; the rest is memlog.
7. **AD-17's version-pinned internals (~60 words)** and **AD-12's `force=True` / `ignore_on_trash`
   enumeration (~70 words)** — Frappe mechanics the six skills own (line 30's own promise).
8. **The no-mandate rule is still stated three times** — AD-34's Rule, the Stack's unpinned list, the
   Conflicts row (~60 words). The Conflicts row records a source contradiction and earns its place;
   the Stack line duplicates the AD.
9. **AD-26's closing six-operation sentence (~45 words)** — it re-lists the six operations the table
   directly above it already names, with the same FR numbers.

## D. Checklist walk

| # | Item | r4 | r5 |
|---|---|---|---|
| 1 | Fixes the real divergence points, misses none | FAIL | **FAIL** — R5-1 (Guest person-record cardinality), R5-4 (image predicate vs discoverability), R5-6 (`resource`). Budget writer, Enquiry parentage, Place cardinality and Rule scope are genuinely closed. |
| 2 | Every Rule enforceable and prevents its Prevents | FAIL | **FAIL** — R5-2, R5-3, R5-4, R5-7, R5-8, R5-11, R5-12, R5-13. R4-1 and R4-6 closed; the FR-32 boundary is closed better than asked. |
| 3 | Nothing under Deferred lets two units diverge | PASS | **PASS** — hosting, observability, gates, generator, RFC 3161, search seam, the published site's contradiction and rate limiting each carry a trigger and a `DEFERRED.md` D-number. |
| 4 | Ratifies rather than contradicts the brownfield | PASS w/ findings | **PASS with findings** — `CLAUDE.md` §2/§6 verified rewritten on disk and the Conflicts rows describing them are accurate; D-1..D-16 mirror the Deferred section. Residue in R5-17. |
| 5 | Covers 4.1–4.14 and NFR 5.1–5.10 | PASS w/ findings | **PASS with findings** — 4.2 closed by AD-19; 4.7 closed by the ERD reparenting; 4.4/4.5 improved. Open: 5.10 (R5-10), 4.10 (GST mechanics, Lens B §6), 5.3 client draft survival. |
| 6 | Every dimension decided, deferred or open | PASS w/ findings | **PASS with findings** — one silence unchanged for three rounds: design tokens / NFR 5.10. |
| 7 | Terse | FAIL | **FAIL — worse.** 11,817 words, +11.8%. §C. |

## E. Minimum to reach PASS (Lens A)

1. **R5-1** — say whether a Guest person record is scoped to one Wedding or deduplicated by number.
   *One clause; it is also Lens B's top finding.*
2. **R5-4** — add discoverability as a term of `is_publicly_visible`, and put the citing clause into
   AD-20, AD-27 and AD-29. *Four sentences; round 4 asked for three of them.*
3. **R5-3** — name `recompute_discoverable`'s layer and make it the writer of cascade 4's transition
   row. *Two sentences.*
4. **R5-2** — composition writes the downstream transition row; it is not a direct call. *One clause.*
5. **R5-6** — name the UNIQUE index's real column set and resolve inventory item. *Two sentences.*
6. **R5-7** — the third bucket's FR-62 outcome. **R5-10** — one Conventions row for the token contract.
7. **§C** — the cut. Then R5-8, R5-11 through R5-17.

---
---

# LENS B — COMPLIANCE

## Verdict: CHANGES REQUIRED

Round 4's CRITICAL is closed at the source: **takedown is now the sixth term of `is_discoverable`**,
so a court-ordered Listing leaves search on the same predicate everything else uses, and FR-63's
three-hour clock has a path to the surface. That was the finding that mattered and it was fixed the
way I asked.

Three more round-4 HIGHs are genuinely closed: the legal hold now carries ground, authority, scope
and a review date, names a **person** as well as a record, is **evaluated when the deletion
executes**, and a refused erasure **stands refused with the person told**; the `Breach Incident`
record now covers **all personal data** and enumerates affected people **from the data model**; and
the Deferred paragraph is a verdict table.

Against that, one round-4 HIGH was closed in the wrong direction (Guest as a `PERSON` row, R5-B1),
one obligation lost its only deadline in this revision (R5-B2), and thirteen round-4 HIGHs are
untouched — verifiable by grep, since `GSTIN`, `financial year`, `place of supply`, `Refund`, `NTP`,
`UTC`, `provenance`, `attestation`, `pre-tick`, `dark pattern`, `encryption`, `FR-64` and `ERPNext`
all appear **zero times** in the document.

## Seven areas

| # | Area | R3 | R4 | **R5** | Movement |
|---|---|---|---|---|---|
| 1 | Non-party posture (NFR 5.6, FR-41, §7.1/§7.2) | PARTIALLY | PARTIALLY | **PARTIALLY COVERS** | Improved — FR-25's two anti-misleading guards landed. Availability signal's shape, Quote defaults, ERPNext unchanged |
| 2 | Intermediary obligations (FR-63) | PARTIALLY | PARTIALLY | **PARTIALLY COVERS** | **Best movement of the round** — removal path repaired, hold now person-scoped and execution-time. Ack clocks, infringer anchor, FR-64 unchanged |
| 3 | Data protection (NFR 5.5) | PARTIALLY | PARTIALLY | **PARTIALLY COVERS** | Breach enumeration and scope closed; Guest-as-PERSON opened; the 72-hour clock **lost** |
| 4 | Evidential records (FR-43) | PARTIALLY | PARTIALLY | **PARTIALLY COVERS** | Verbatim unchanged since r4 apart from the child-table refusal. Certificate inputs and the clock disciplines untouched |
| 5 | Guest data and consent (FR-11, FR-12, UJ-5) | PARTIALLY | PARTIALLY | **PARTIALLY COVERS** | Regressed on the data-class question; provenance, attestation, opt-out, erasure-on-request unchanged |
| 6 | GST and billing (FR-52, FR-54) | PARTIALLY | PARTIALLY | **PARTIALLY COVERS** | **AD-34 verbatim unchanged for a third round** |
| 7 | Accessibility (NFR 5.8) | DOES NOT | DOES NOT | **DOES NOT COVER** | **Verbatim unchanged**, Desk over-claim included |

## The four questions asked

### (a) Is the new breach design sound, and is Desk-as-residual-risk acceptable or a gap?

**The enumeration change is sound and is the right fix. Two things around it are not, and one of them
is new in r5.**

**Sound.** *"Affected people are enumerated from the data model, not from the log… A log tells you
what was touched; it cannot tell you who is in scope for an incident that bypassed it."* That is
exactly right, and it answers the sharpest half of round 4's R4-3: a dumped backup, a compromised
credential or an exfiltration through `frappe.db.sql` produces zero read-log entries, and the r4
design would have returned an empty affected set for the most likely breach shapes. Scoping the
`Breach Incident` to **all personal data** — *"not only Guest contacts, since AD-29's identity
documents and KYC evidence are in scope too"* — while keeping *read logging* Guest-scoped for the
cost reason is the correct separation of the two scopes, and it is stated in one place.

**R5-B2 · HIGH · `[NEW in r5]` — the breach obligation lost its deadline.** Round 4's AD-32 carried
*"reportable within 72 hours"*. Round 5's carries *"…and when the regulator and those people were
told"* — a field, not a clock. Verified: every `72 hours` / `36 hours` / `3 hours` in the document is
now in AD-33's FR-63 removal and information-request list; AD-32 contains no time limit at all, and
`without delay` and `6 hours` appear nowhere. The obligation is three clocks, not one: **DPDP Rule 7**
— intimate each affected Data Principal **without delay**, per person, before the Board report;
**DPDP s.8(6)/Rule 7** — the detailed Board report within **72 hours**; **CERT-In Directions
28.04.2022 (R22)** — specified cyber incidents within **6 hours** of noticing, which is an on-call and
hosting constraint, not a form field. Restoring the 72 and adding the other two is one sentence, and
losing the one that was there is the kind of regression a rewrite makes and nobody notices.

**R5-B3 · MEDIUM-HIGH · `[NEW in r5]` — the read log's retention is now set below its own purpose.**
New sentence: *"The log's own retention matches the Guest data it describes."* AD-14 erases Guest
data **30 days after the Wedding concludes**. So the log that exists to establish who accessed Guest
contacts is destroyed on roughly the same schedule as the data — before most breaches are discovered,
and against **R38** (*"Retain processing logs ≥1 year"*, DPDP Rule 6). It also has no entry in AD-23,
so whatever purge someone writes will be the policy. **Fix:** the log is retained ≥1 year, holds only
the opaque person key it already references (so it is not the copy AD-14 forbids), and gets a line in
AD-23.

**Desk as residual risk: acceptable as honesty, a gap as engineering, and the named compensating
control does not cover it.** Stating it beats hiding it, and *"Administrator is exempt from
`permlevel` entirely (`document.py:959`)"* is exactly the kind of verified, uncomfortable fact this
document should carry. But:

- **R5-B4 · MEDIUM-HIGH · `[NEW in r5]` — the compensating control named is the wrong one.** AD-32:
  *"Desk access to Guest contact data is therefore a residual risk carried by **FR-61's attribution**
  and by operational discipline."* FR-61's attribution, as the spine's own Conventions row words it,
  covers *"every Admin action **changing** standing, visibility, published content or account
  access"* — it is a **write** log. A Desk **read** of a guest list produces nothing under it. The
  risk is therefore carried by operational discipline alone, and the AD should say that rather than
  name a control that does not reach it.
- **Two mitigations the AD declines without saying why**, both cheap and both already known to this
  document: `View Log` **does** record Desk form opens when a DocType sets `track_views` — AD-32
  states this itself, two sentences earlier, then does not use it; and Desk access to the Guest
  DocType can be withheld from the operational role entirely, for which AD-17's site-wide
  `disable_document_sharing` is the precedent. Neither is complete (neither logs which fields were
  seen, and neither binds Administrator), but *"cannot be logged at all"* is stronger than the facts
  the same paragraph establishes.
- **The FR-61 Conflicts row is still absent** — a fourth-round finding. FR-61's headline is *"No
  capability is withheld from an Admin user by role"*; AD-32 withholds one, correctly, under DPDP
  Rule 6. The spine records exactly this kind of source contradiction nine times over and not this
  one. `[STILL OPEN from r4 — MEDIUM]`

### (b) Does the person-scoped legal hold close the erasure defeat?

**Yes. This is closed, and closed properly.** All three of round 4's asks landed:

- *"A legal hold names a record **or a person**… A hold on a **person** is what makes it work at all:
  AD-14's erasure writes one field on the person record and would never touch a held Agreement, so a
  hold placed only on records is defeated by a fully compliant erasure."* The defeat is named and
  shut.
- The record is now the takedown's equal — *"its ground, its scope, the authority that ordered it,
  when it was placed, and a review date"* — which was the asymmetry round 4 tabulated.
- *"Hold status is evaluated when the deletion actually executes, not when it was requested"*, and
  *"a **refused erasure stands refused**: the person is told which basis applies (NFR 5.5) and the
  request is not silently queued to run when the hold lifts."* That is the NFR 5.5 tell-the-person
  duty carried across, plus a race condition I had not raised, closed pre-emptively.

Two residuals, neither reopening the defeat:

- **R5-B5 · MEDIUM · `[STILL OPEN from r4]`** — AD-33's **Enforced by** is still *"review only"* for a
  mechanism that can suspend a statutory right indefinitely, even though the Rule now says placing
  and lifting are AD-27 controller work. Move the sentence into the Enforced-by line.
- **Preserved data still has no purpose limitation.** IT Rules 3(1)(g) is preservation *for
  investigation*; AD-33 says *"retained"* with no restriction, so a takedown becomes a route by which
  data that should have been erased stays in ordinary reads. One clause. `[STILL OPEN from r4 —
  MEDIUM]`
- **AD-14 still does not point at the hold.** It says *"NFR 5.5's precedence is implemented here and
  never re-derived"*, and AD-14 is the AD an implementer opens for erasure. One cross-reference.
  `[STILL OPEN from r4 — LOW-MEDIUM]`

### (c) Is AD-32's DPDP framing now correct?

**Yes — the framing is correct, and dropping the NFR 5.9 pointer removed a false claim rather than
answering the question behind it.**

*"This is a retention classification, not a lawful basis. DPDP's grounds are a legal determination for
counsel — an open business input, not settled here — so nothing downstream should read these four
reasons as lawful bases."* Every part of that is right. Round 4's objection was that it deferred to
an NFR 5.9 row scoped to the non-party statement, which does not carry the DPDP notice or the
lawful-basis determination — a circular deferral. Round 5 deleted the pointer. The circularity is
gone and the framing is now accurate.

**What the deletion did not do is give the deferral an addressee.** `[STILL OPEN from r4 — MEDIUM]`
*"An open business input"* points at Deferred's *"every business input in NFR 5.9 — subscription
prices, the Founding Vendor cohort, legal terms, GST registration, the merchant account, verification
staff, the grievance officer, the named custodian"* — and I checked: the DPDP notice text, the
lawful-basis determination and the retention basis for the eight-year Agreement retention are in none
of those. So nothing in either document creates the task, names a trigger, or says what is blocked
until it is answered. A deferral nobody is assigned is a decision to skip. **Fix:** one Deferred entry
with a trigger that can fire — *before the first real user*, not *when needed*.

Two consequences of the framing that are still unclosed and are now the only artefacts that could
substantiate anything after the fact:

- **R5-B6 · HIGH · `[STILL OPEN from r4]` — consent still does not record the notice it was given
  under.** `notice` appears **once** in the whole document, and it is the word *"notice"* in AD-16's
  Prevents line. There is no `NOTICE` entity beside `CONSENT` in the ERD. DPDP s.5 requires an
  itemised notice at or before collection presented independently of the T&Cs (**R30**); s.6(1)
  requires consent to be **informed**. With the lawful-basis question deferred to counsel, the notice
  version stored on the consent record is now the **only** architectural artifact that would let the
  platform demonstrate anything at all about a consent afterwards. Cheap now, unreconstructible
  later — the same shape as AD-12's rendered bytes, which this document already understood.
- **NFR 5.5's *"told which retention basis applies"* still has nothing to resolve to.** What is
  stored is a plain reason — *engagement record* — which is a description of what is kept, not a
  basis for keeping it. AD-33 now correctly *promises* the sentence in two places. One clause: the
  reason a person is told is looked up from the notice version their data was collected under.
  `[STILL OPEN from r4 — MEDIUM]`

### (d) Do the round-5 changes create a new compliance gap?

**Yes — three, and the first is the most consequential thing this revision did.**

**R5-B1 · HIGH · `[NEW in r5]` — "A Guest is a person record like any other" makes the FR-12 join
structural.** Round 4 asked for the opposite: *Guest is a data class of its own, never a `PERSON` row,
never joined to `PERSON`, never deduplicated across Weddings.* Round 5 chose the merge and the ERD
now carries `PERSON ||--o| GUEST`. The motive — one erasure mechanism, not two — is good, and if the
row is scoped per Wedding the decision is defensible. Nothing says it is. And the surrounding rules
push hard the other way: AD-14's *"every record references one person record"*, AD-28's *"one person
is one account"* with `mobile_no` unique.

Under that reading:

1. *"This guest is already a user"*, *"this guest's number matches a Vendor"*, *"how many of last
   season's guests came back"* are not features anyone must build — they are what the schema returns.
   That is audience-building from data collected for a single stated purpose, the DPDP s.6(1) breach
   FR-12 exists to prevent (*"never used to build an audience"*, **R33**), and FR-12's growth path is
   the tell: a Guest who starts their own Wedding does so by **signing up fresh and consenting
   directly**, never by the platform recognising them.
2. AD-32 records the retention outcome **per datum**; AD-14 erases **per person record**. On a shared
   row the same record is `erase / purpose-limited` as a Guest and `keep, person anonymised /
   engagement record` as a Vendor, and AD-14's Guest trigger — *30 days after the Wedding concludes* —
   would clear a live account holder's identifying fields.
3. A **person-scoped legal hold** (b) placed for one Wedding's guest list would then suspend that
   person's account-level erasure rights indefinitely.

**Fix:** one clause in AD-14 — *a Guest person record is scoped to one Wedding, is never deduplicated
across Weddings, and is never reconciled or joined against an account holder's record for any
purpose.* That keeps the single erasure mechanism and closes the join.

**R5-B2 (breach deadline) and R5-B3 (read-log retention)** are the other two, both stated under (a).

One further composition effect, more posture than statute: **AD-20's `is_publicly_visible` is a
three-term predicate that excludes Listing discoverability** while AD-35 asserts AD-29 calls
`is_discoverable` (Lens A R5-4). Takedown is a term of both, so the statutory clock is safe. Media of
a Vendor removed under FR-60 is not.

## Findings by area — what remains, with markers

**§1 Non-party posture.** `[STILL OPEN from r4 — HIGH]` The **availability signal still has no
shape**: AD-10 ends *"an attributed signal, never a boolean a caller can relabel"* with no fields
named; `AD-4` appears nowhere in AD-10 and `AD-10` nowhere in AD-4. NFR 5.6 requires attribution
across three independently built clients and one server-side answer does not constrain three
renderings. **This must land before `api/family/v1` freezes (AD-3), because after that it is a `v2`.**
`[STILL OPEN from r4 — HIGH]` **The no-platform-terms rule still covers Agreements only** — FR-39
makes the **Quote** where every term is first authored, and AD-12's Amendment appends the same term
set; and a `Property Setter` adding a `default` is set from Desk with no controller in the path, while
the same AD proves it knows the fix (the `allow_on_submit` assertion in `after_migrate`).
`[STILL OPEN from r4 — MEDIUM]` **ERPNext is still unmentioned** (zero occurrences) while AD-19 leans
on *"print formats, reports and FR-52's GST invoicing work natively"*; say whether it is installed and
that no accounting document may reference a Family. `[STILL OPEN from r4 — MEDIUM]` **AD-8's pricing
model still has no boundary against AD-27** — a handler computing a suggested figure at request time
evades every gate, because nothing is stored as a `default`.

**§2 Intermediary obligations.** `[STILL OPEN from r4 — HIGH]` **Two acknowledgement clocks are still
one field.** AD-33's three named clocks (36h / 3h / 72h) are all **removal and furnishing** clocks;
the **acknowledgement** clocks are unnamed and there are two on two statutes — IT Rules 3(2)(a) **24
hours**, E-Commerce Rules 4(5)–(6) **48 hours**. `acknowledg` appears once in the document.
`[STILL OPEN from r4 — HIGH]` **The repeat-infringer register still cannot survive re-registration.**
AD-33 keys it on AD-14's *"stable per person"* token; erasure frees the number; the person
re-registers; AD-28 mints a new account, a new person and a new token. **R20** requires survival of
*"account deletion **and re-registration**"* under E-Commerce Rule 5(5). Fix unchanged: a salted
one-way hash over the phone (and PAN/GSTIN for Vendors), retained through erasure as an explicit
second exception in AD-14. `[STILL OPEN from r4 — MEDIUM]` **FR-64's ranking disclosure has no home**
— `FR-64` and `disclosure` both appear zero times; the parameters must be published in plain language
and reachable by any Family, and AD-22 and AD-35 now own half each. `[STILL OPEN from r4 — MEDIUM]`
**Nothing says removal is a state transition rather than a delete**, which is the natural
implementation and the one that makes the 180 days unmeetable. `[STILL OPEN from r4 — MEDIUM]`
**AD-27's append-only versus a grievance's own lifecycle is still ambiguous** — one sentence closes
it: *a field is written once and never rewritten; a lifecycle advances by filling fields that were
empty; a correction is a new appended row.* `[STILL OPEN from r4 — MEDIUM]` **Hosting is still not
regulatorily constrained** — `NTP` zero, `India` once; CERT-In requires 180 days of ICT logs retained
**within India** and NTP sync to NIC/NPL (**R22**), and the same decision carries the six-hour
capability. *"Choose before the first deploy"* should read *"choose from India-region, log-retaining,
NTP-disciplined options."*

**§3 Data protection.** R5-B1, R5-B2, R5-B3, R5-B4 above, plus: `[STILL OPEN from r4 — HIGH]` **the
rights surface is still an existence oracle and still offers no erasure.** AD-30 does not say that a
number the platform holds nothing for gets the **identical response and timing** — without it the
endpoint is a no-login membership oracle over every phone number in India, and for a Guest it
discloses that they were invited to a wedding. And AD-32 still offers only *"see and correct"*;
**R36** requires a public no-login channel for *access / correction / **erasure** / grievance*, and
AD-14's scheduled Guest erasure is a retention rule, not a right. `[STILL OPEN from r4 — MEDIUM]`
**AD-30's "nothing is stored" is false and now conflicts more sharply than it did** — issuing a code
stores it, AD-28's per-number limits store counters, and r5 *strengthened* AD-32's requirement that
the read be logged **in `api/`**, which is the very path this surface uses. `[STILL OPEN from r4 —
MEDIUM]` **AD-21's type signature forbids the message AD-30's rights surface must send** — one
sentence carving out the one-time-code path, reachable only by a request the recipient made in that
session. `[STILL OPEN from r4 — MEDIUM]` **`db.set_value` / `db.sql` still not forbidden anywhere** —
AD-16 says they *"sit below the permission layer entirely… masking included"* and names no DocTypes
they may not touch, so any read path built with them defeats both the new `permlevel` and the new
read log, and any write path defeats AD-27's controller guards on the evidential DocTypes. AD-16 is
where it must be said. `[STILL OPEN from r4 — MEDIUM]` **No security-safeguard invariant** —
`encryption` and `at rest` zero occurrences; DPDP Rule 6, **R37**. `[STILL OPEN from r4 — MEDIUM]`
**Nothing pre-ticked has no home** — `pre-tick` and `dark pattern` zero; **R31** (family attestation
at guest-list upload) and **R70** (Vendors may rate Families) both need it, and it is a three-client
contract of exactly the kind AD-24 handles for vocabulary.

**§4 Evidential records.** `[STILL OPEN from r4 — HIGH]` **The certificate's inputs are still not
captured** while AD-12 still asserts *"FR-43's certificate is generated from these rows."* The
snapshot holds serialised terms, rendered bytes, digest, previous digest and a server timestamp —
three of **R76**'s ten. Missing and **contemporaneous**: confirming user and acting role for each of
the two confirmations, app/deploy version, host identity, terms/format version, and the custodian of
record at the time. BSA Schedule Part A requires the manner of production and the particulars of the
devices; *Arjun Panditrao* makes the certificate mandatory for secondary electronic evidence. In 2034
nobody can reconstruct which host and which build produced a 2026 row unless 2026 wrote it down.
`[STILL OPEN from r4 — HIGH]` **The clock deferral is verbatim unchanged**, including the sentence
that does not support its conclusion (*"AD-12's hash chain makes tampering detectable"* — a chain
proves ordering and integrity, never time). `NTP` zero, `UTC` zero; the Conventions Dates row still
says only *"Asia/Kolkata"* where **R77** requires storing UTC and displaying IST; there is no
operating-properly record for s.63(2)(c) (**R81**). And the trigger — *"the first time an Agreement
record is needed as evidence"* — cannot fire usefully, because on that day the Agreement was
timestamped years earlier. Record it as an accepted decision with named disciplines instead.
`[STILL OPEN from r4 — LOW]` No log that **each party took their copy** (BSA s.63(2) reasoning); the
archival format of the *"immutable bytes"* is unnamed where **R74** words it PDF/A.

**§5 Guest data and consent.** R5-B1 above, plus `[STILL OPEN from r4 — HIGH]` **Guest data still has
two provenances on different legal footings stored as one class** — `provenance` and `attestation`
zero occurrences. FR-11 draws the distinction the spine does not carry (*"a stronger footing than a
Family uploading numbers on their relatives' behalf"*), and **R31** requires a non-pre-ticked family
attestation at upload, which attaches only to the uploaded path. One field.
`[STILL OPEN from r4 — MEDIUM]` **AD-21 owns invitation composition and binds none of its required
content** — `opt-out` zero occurrences. `[STILL OPEN from r4 — MEDIUM]` **AD-30's token clauses are
outcomes, not mechanisms** — the checkable rule is *no `allow_guest` method accepts an identifier of a
Wedding, Guest or Function as a parameter; scope comes from the token alone*, which
`check_whitelisted.py` can assert; and revocation must take effect **immediately** by re-validating
against current Wedding state per request, where AD-23's expiry job is a sweep.

**§6 GST and billing. AD-34 is verbatim unchanged for a third round.** `GSTIN`, `financial year`,
`place of supply` and `Refund` all appear **zero times**. `[ALL STILL OPEN from r4]` — **HIGH:** tax as
one server-side function keyed on the recipient's registration State, with GSTIN + State **required
before a paid Subscription can be taken** (**R57**); the invoice issued **atomically with payment
confirmation**, no period-based generation (**R58**); Rule 46 mechanics — serial unique **per financial
year**, ≤16 characters, **gap-freeness as a database property** (the identical concurrency problem
AD-11 solved properly with a unique index), place of supply, reverse-charge flag, separate **SAC**
lines (998365 / 998439, **R56**), and **credit note and Refund Voucher as documents from day one**
(**R59**). **MEDIUM:** when a serial is taken (at issue, on confirmed payment, and nothing else takes
one); the ₹0 Founding tier produces **no** invoice and needs a related-party screen as a field on the
Vendor (**R60/R61**); the payment surface renders the **GST-inclusive** all-in total (**R25**).

**§7 Accessibility. DOES NOT COVER — the row is verbatim unchanged.** `[ALL STILL OPEN from r4 —
MEDIUM]` A new AD is still the wrong remedy; three sentences in three existing ADs plus one Conflicts
row is the right one: the **non-colour indicator vocabulary** owned by `packages/shared` beside
AD-19's formatter; **organic and promoted returned as two disjoint collections** in AD-4's contract
with the paid label a required non-empty field (**R13**, and it is NFR 5.5's dark-pattern ban as much
as an accessibility item); the **two public Guest pages' server-side rendering** as a release
condition in AD-30 (NFR 5.8 includes them deliberately — *"none of them chose to be there at all"*);
the **contrast-locked token** (NFR 5.10, and Lens A R5-10); and **Frappe Desk's WCAG conformance in
Conflicts**, since it is a third-party property the platform does not own and *"all five surfaces"*
discharges an obligation it cannot meet.

## Consolidated — what to add, ordered

| # | Add | Where | Sev | Marker |
|---|---|---|---|---|
| 1 | A Guest person record is scoped to one Wedding; never deduplicated across Weddings; never joined to an account holder's record | AD-14 | HIGH | NEW r5 |
| 2 | Restore the breach clocks: without-delay intimation per person, 72h Board report, CERT-In 6h | AD-32 | HIGH | NEW r5 |
| 3 | Read log retained ≥1 year (R38), holds the opaque key only, listed in AD-23 | AD-32, AD-23 | MED-HIGH | NEW r5 |
| 4 | Desk residual risk rests on operational discipline, not FR-61's write attribution; say why `track_views` and role withholding are not used | AD-32 | MED-HIGH | NEW r5 |
| 5 | Discoverability as a fourth term of `is_publicly_visible`; AD-20/AD-27/AD-29 cite AD-35 | AD-20, AD-29, AD-27 | MED-HIGH | NEW r5 (r4 R4-5) |
| 6 | Certificate inputs in the snapshot — confirming user and role, app/deploy version, host identity, terms version, custodian (R76) | AD-12 | HIGH | STILL OPEN r4 |
| 7 | Clock deferral rewritten as an accepted decision — NTP to NIC/NPL, UTC storage + IST display, operating-properly record | Deferred, Conventions | HIGH | STILL OPEN r4 |
| 8 | Notice as a versioned immutable record; consent stores the version; NFR 5.5's "which basis" resolves from it | AD-32, ERD | HIGH | STILL OPEN r4 |
| 9 | Repeat-infringer anchor surviving erasure **and re-registration** (R20); second exception in AD-14 | AD-14, AD-33 | HIGH | STILL OPEN r4 |
| 10 | Rights surface: identical response and timing for unknown numbers; add **erasure** (R36) | AD-30, AD-32 | HIGH | STILL OPEN r4 |
| 11 | Two grievance tracks, two acknowledgement clocks (24h / 48h) as a field | AD-33, AD-23 | HIGH | STILL OPEN r4 |
| 12 | Guest provenance field + R31's non-pre-ticked attestation at upload | AD-14, AD-32 | HIGH | STILL OPEN r4 |
| 13 | Availability signal's fields named; AD-4 carries no boolean variant — **before `api/family/v1` freezes** | AD-10, AD-4 | HIGH | STILL OPEN r4 |
| 14 | No-platform-terms extended to Quote and Amendment; `Property Setter` default assertion in `after_migrate` | AD-27 | HIGH | STILL OPEN r4 |
| 15–17 | GST: one tax function + GSTIN/State before a paid Subscription (R57); invoice atomic with payment (R58); Rule 46 mechanics + credit note and Refund Voucher (R56, R59) | AD-34 | HIGH ×3 | STILL OPEN r4 |
| 18 | Append-only means write-once per field; a lifecycle fills empty fields; a correction is an appended row | AD-27 | MED | STILL OPEN r4 |
| 19 | AD-33 Enforced-by names the AD-27 controller guard; preserved content is investigation-purpose only | AD-33 | MED | STILL OPEN r4 |
| 20 | FR-61 tension recorded in Conflicts; `db.set_value`/`db.sql` forbidden on evidential and permlevel-restricted fields | Conflicts, AD-16 | MED | STILL OPEN r4 |
| 21 | Deferred entry with a fireable trigger for the DPDP notice text and lawful-basis determination | Deferred | MED | STILL OPEN r4 |
| 22 | Hosting constrained: India-region, 180-day ICT logs, NTP to NIC/NPL (R22); encryption at rest (Rule 6) | Deferred | MED | STILL OPEN r4 |
| 23 | No consent control ships pre-ticked; consent controls come from `packages/shared` | Conventions | MED | STILL OPEN r4 |
| 24 | FR-64 ranking disclosure and the no-money statement as no-login public routes | AD-22/AD-30 | MED | STILL OPEN r4 |
| 25 | Removal is a state transition, never a delete | AD-33 | MED | STILL OPEN r4 |
| 26 | Accessibility: five fixes in existing ADs + the Desk Conflicts row (§7) | several | MED | STILL OPEN r4 |
| 27 | FR-25's third guard — Preferred surfacing is not purchasable; `PREFERRED_VENDOR` in the ERD | AD-36, ERD | MED | STILL OPEN r4 |
| 28 | `BREACH_INCIDENT` and `NOTICE` in the ERD | ERD | LOW | STILL OPEN r4 |

## What this round got right — do not disturb it

- **Takedown as the sixth term of `is_discoverable`.** The round-4 CRITICAL, fixed at the source
  rather than by adding a filter somewhere, with the reason stated (*"would leave a court-ordered
  Listing in search with its flag intact, defeating FR-63's three-hour clock"*).
- **The pure/writing split in AD-35, and `doc.save()` over `db_set`** with the failure named. That is
  the shape a rule takes when someone has thought about how it breaks.
- **The person-scoped legal hold, evaluated at execution, with a refused erasure standing refused.**
  Three separate defeats closed in one paragraph, one of which I had not raised.
- **Enumerating affected people from the data model.** *"A log tells you what was touched; it cannot
  tell you who is in scope for an incident that bypassed it."* Correct, and it retires the mechanism
  that would have reported an empty affected set for the most likely breaches.
- **AD-26's named transition rows, and cascade 2 written on confirmation.** The FR-32 finding has been
  open since round 1 and is now fixed at a better altitude than any of the four fixes proposed for it.
- **AD-27's three-question decision procedure.** Replacing an undecidable noun with an ordered
  procedure, and working the three examples that actually divided people, is how you close a class of
  finding rather than a finding.
- **The Deferred verdict table.** Thirteen cells, all of them true, replacing three rounds of prose
  that were not.
