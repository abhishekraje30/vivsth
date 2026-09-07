---
review: rubric
round: 4
lens: 'The good-spine checklist (items 1-7), re-run against the thrice-revised spine'
target: '_bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md'
prior: 'reviews/review-rubric-r3.md (round 3, FAIL) · reviews/review-closure.md (round 2)'
driving_spec: '_bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/prd.md (amended 2026-09-06)'
also_read: 'CLAUDE.md (§2/§3/§6 rewritten) · DEFERRED.md (D-3/D-7 resolved, D-10..D-16 added) · coding-standards.md'
date: '2026-09-06'
verdict: FAIL
---

# Rubric review, round 4 — ARCHITECTURE-SPINE.md

## Verdict: FAIL

Narrower than round 3, and for a shorter list. Twelve of my twenty-three round-3 findings are closed
or materially closed, including both CRITICALs. The work since round 3 is the best-targeted of the
three revisions: AD-8's live-read scoping, AD-28's `User.name` archaeology, AD-27's and AD-23's
promotion from enumeration to property, AD-32's read log and `Breach Incident`, AD-30's carve-out,
and the wholesale removal of the nine false "tier 1" labels are all exactly what was asked for and
several are better than what was asked for.

It fails on **item 1** and **item 2** again, and it now also fails **item 7**.

- **Item 1.** Five shapes two units can still choose incompatibly. Two are untouched since round 1
  — the **running budget's writer** (FR-8 is *still* cited zero times in the spine) and the **ERD's
  Enquiry parentage**. Three are new halves of finding pairs AD-36 half-closed: **Place coverage
  cardinality**, **Rule scope (Listing vs Space)**, and the **Preferred Vendor association**
  (FR-25, also cited zero times). AD-11's `resource` column set is unmoved from round 3.
- **Item 2.** AD-26 still carries no commit boundary for FR-32, so a Family who loses AD-11's Slot
  race loses her Shortlist and her existing Agreements for nothing — the most destructive single
  gap left in the document, and unchanged since round 1. AD-8's new presentational/behaviour
  partition leaves **Order Basis and pricing model in neither bucket**, and Order Basis is what
  FR-8's per-head arithmetic reads. AD-35 asserts five callers and three of them do not cite it.
  AD-35 also creates a cross-entity write that AD-26's closed list of six cascades excludes, with no
  stated writer. AD-20 still enumerates two gates where AD-29 enumerates three.
- **Item 7.** **10,568 words, 580 lines, 36 ADs** — up 31% in words from round 3's 8,087, which I
  called "at the ceiling". It is now over it. Section C.1 below says plainly what to cut.

Item 3 still passes. Items 4, 5 and 6 pass with findings; item 6's single round-3 silence
(NFR 5.10) is unchanged.

Every finding is marked `[STILL OPEN from r3]` or `[NEW in r4]`.

---

## A. Round-3 closure ledger

| r3 finding | Sev | Status in r4 | Where |
|---|---|---|---|
| F-1 AD-8 carry-forward has no mechanism | CRITICAL | **Closed** — scoped, risk accepted, PRD amended, D-16 records it | AD-8 / R4-4 residual |
| F-2 Discoverability split five ways | CRITICAL | **Materially closed** — AD-35 owns it; wiring one-directional | AD-35 / R4-5 |
| F-3 `User.name` / identity trail | HIGH | **Closed** — opaque local part, verified at `user.py:191` | AD-28 |
| F-4 Place hierarchy | HIGH | **Half closed** — representation decided, cardinality not | AD-36 / R4-8 |
| F-5 Rules / Preferred Vendors | HIGH | **Half closed** — Rule typed; association unmodelled | AD-36 / R4-9 |
| F-6 AD-26 commit boundary (FR-32) | HIGH | **Open — unmoved** | R4-1 |
| F-7 AD-30 vs AD-32 rights surface | HIGH | **Closed** — OTP proof-of-control carve-out | AD-30 |
| F-8 Running budget writer | MED-HIGH | **Open — unmoved** | R4-2 |
| F-9 AD-20 two gates vs AD-29 three | MED-HIGH | **Open — unmoved, verbatim** | R4-6 |
| F-10 Nine false "tier 1" labels | MED-HIGH | **Closed** — zero occurrences of "tier 1"; AD-21 residual | AD-* / R4-12 |
| F-11 AD-11 `resource` polymorphic | MED-HIGH | **Open — unmoved, verbatim** | R4-7 |
| F-12 ERD Enquiry off Selection | MED | **Open — unmoved** | R4-11 |
| F-13 AD-32 breach clause unenforceable | MED | **Closed** — permlevel + read log + `Breach Incident`, scoped honestly | AD-32 |
| F-14 AD-27 "Named:" exhaustive | MED | **Closed** — general property, "examples, not the definition" | AD-27 |
| F-15 AD-14 vs AD-33 precedence | MED | **Half closed** — "on the same record" carve-out lands; legal hold and the register are not | R4-18 |
| F-16 NFR 5.10 zero citations | MED | **Open — unmoved** (verified: 5.10 appears only in `scope` and `binds`) | R4-13 |
| F-17 Frappe mechanics restated ×5 | MED | **Open — worse (8)** | R4-17 |
| F-18 AD-1 / AD-2 Prevents | MED | **Open — unmoved** | R4-15 |
| F-19 AD-24 gate scope | MED | **Open — unmoved** | R4-16 |
| F-20 Binds accuracy | MED | **Mostly closed** — AD-31 and AD-26 fixed; AD-8/FR-71 and AD-11/FR-28 remain | R4-20 |
| F-21 Terseness, tidy list | LOW-MED | **Open — worse** | R4-14, R4-21 |
| F-22 Brownfield residue | LOW | **Half closed** — `CLAUDE.md` §2/§6 genuinely rewritten on disk; D-7 resolved | R4-21 |
| F-23 WCAG on five surfaces | LOW | **Open — unmoved** | R4-21 |

**12 closed or materially closed · 3 half · 8 open · 5 new findings.**

---

## B. Findings

### R4-1 · HIGH — AD-26 still carries no commit boundary for FR-32 `[STILL OPEN from r3]` (F-6, and round-1 A-11)

Verified: the string "acceptance" appears nowhere in AD-26 outside the six-operation list. AD-26's
Rule now settles *where* the cascade lives, *how* it is invoked (`doc_events`), *re-entrancy* (a
`frappe.flags` suppression), and *transaction control* (savepoints, not `rollback()`). It still does
not say *when* the Rule-conflict cascade takes effect.

FR-32 is explicit, and it is the last bullet under its Consequences:

> **Nothing is removed until the engagement actually completes.** Acceptance authorises the
> consequence; the consequence takes effect only when the Agreement is confirmed. If confirmation
> fails for any reason FR-39 allows — the Slots taken first, or the same-account bar — the Family's
> Shortlist, Selections and existing Agreements are exactly as they were.

AD-11 makes confirmation a race resolved by a unique-index violation with a seat retry, which can
decline. So the cascade must run *inside the transaction that wins the insert*, and must write
nothing on acceptance. A unit reading AD-26 alone will fire it on acceptance, because that is where
the user-visible act is and because `doc_events` on the acceptance record is the idiom AD-26 itself
prescribes. The result is a Family who is told her lawn was taken, and separately discovers her
caterer Shortlist and a confirmed Agreement with her photographer are gone — silently, destructively,
and with FR-42 cancellation counts written to two profiles.

AD-26's Prevents does not reach this and its enforcement ("import-restriction lint; plus review")
cannot see it. This is item 2 in its most expensive form.

**Fix, unchanged from round 1:** one sentence in AD-26 — the Rule-conflict cascade is authorised on
acceptance and applied only in the transaction that wins AD-11's insert; nothing is written on
acceptance.

### R4-2 · HIGH — The running budget still has no writer; FR-8 is cited zero times `[STILL OPEN from r3]` (F-8)

Verified by grep: `FR-8` (as distinct from FR-80+) appears **nowhere** in the spine, in the third
round running. FR-8 is one of the most shape-bearing requirements in the PRD and every one of its
rules is cross-unit:

- a Shortlist contributes nothing; a Selection contributes its all-in price **once**;
- **a Span Selection contributes once for the whole Span** (the named failure is ₹7.2L posted for a
  ₹2.4L lawn);
- confirming an Agreement **replaces** the estimate with the agreed figure; cancelling withdraws it;
- per-head Services multiply by the stated guest count **of the Functions they serve**, showing the
  working;
- a Service whose Functions are undecided reads **"not yet estimated", never ₹0**;
- **the Family can override any derived figure** and add costs the platform knows nothing about.

The last one is decisive: the total is not purely derived, so a derived value and an override must
coexist, and nothing says where. Against that, the Conventions Mutation row says DocTypes persist
computed fields written in `validate` — which invites every DocType touching the total to write it —
AD-26 names cascades that legitimately change it ("the Selection cleared and the budget adjusted"),
and AD-19 fixes only the units and that the arithmetic is server-side.

"A Span Selection contributes once" also presupposes a Selection→Function mapping the ERD does not
model, which is the same mapping AD-10's phrase *"only the Functions that Service serves within the
Block"* presupposes, and the same one AD-36's Rule would need to know which Space a Rule is in force
for. Three ADs lean on an edge that does not exist.

**Fix:** one Conventions row or one AD naming the single writer of the running total and where the
override sits, plus the `SELECTION`→`WEDDING_FUNCTION` edge in the ERD.

### R4-3 · MEDIUM-HIGH — AD-35's stored flag has no writer, and maintaining it is a seventh cascade AD-26 excludes `[NEW in r4]`

AD-35 is the right decision (see C.2) and it is under-specified in two ways that will diverge.

**(a) Who writes the flag.** AD-35: *"That same function maintains an indexed `discoverable` flag on
the Listing, recomputed whenever an input changes."* Its inputs live on at least five different
DocTypes — Subscription (active / Grace Period), the per-item Verification states of AD-20, the
Listing itself (withdrawal), the Vendor record (Admin removal), and AD-27's conditions of listing.
Recomputing a Listing field when a Subscription row changes is, by AD-26's own definition, *"an
operation spanning more than one entity"*, which AD-26 says lives in `domain/` — and AD-26's title
and Rule both say **there are six of them** and enumerate all six. Discoverability recompute is not
among them. So the writer is either a seventh cascade (contradicting AD-26's closed enumeration) or
it lives outside `domain/` (contradicting AD-26's Rule). Both readings are compliant; they produce
different code.

Worse, if it *is* a cascade, AD-26's re-entrancy rule bites it: *"A cascade in flight suppresses
further cascades on the same request."* The FR-53 cascade (a Listing leaving discovery) is precisely
the moment the flag must change, and it is precisely the moment a nested recompute would be
suppressed. The flag then goes stale exactly when it matters.

**(b) Function or column — which does a caller consult.** AD-35 also says the flag is recomputed
*"by the daily job that handles Subscription expiry"*, so the column can trail the function by up to
a day. AD-35 says search filters the column; AD-10 calls the function. FR-53 requires the four
routes to behave **identically for Families**; a Family can therefore be shown a Listing in search
results (column stale, still true) that returns no availability signal when she opens it (function
live, now false), which is the reshuffling-class defect AD-22 exists to prevent, one level up.

**Fix:** name the writer and its layer, say explicitly whether it is a seventh cascade or an
exception to AD-26's six, and state which of function-or-column a caller must consult and what the
permitted staleness is (the honest answer is probably: the function is the truth, the column is a
search index and must be recomputed synchronously in the same transaction as any input change, with
the daily job as a repair sweep, not the primary writer).

### R4-4 · MEDIUM-HIGH — AD-8's presentational / behaviour partition leaves two declarations in neither bucket `[NEW in r4]`

AD-8's Rule names six Admin-editable declarations: **Engagement Model, Sizing Attribute, Order
Basis, pricing model, whether the Service has Spaces**, and which detail columns are exposed as
filters and comparison attributes.

Its second and third paragraphs then partition them, and the partition is not exhaustive:

- *presentational* — "filters, comparison attributes, Sizing Attribute display" → FR-62 holds as
  written;
- *behaviour* — "Engagement Model, has-Spaces" → FR-62 does not hold; live read; treat as a data
  migration.

**Order Basis and pricing model appear in neither list.** They are not presentational. FR-26 makes
the pricing model determine how a price is expressed (per Span, per Function, per head, per unit,
per rental period) and FR-8 makes per-head pricing multiply by the stated guest count of the
Functions served. Changing a Service from per-unit to per-head therefore reinterprets every stored
all-in price and every running-budget figure derived from one — the same class of retroactive
reinterpretation the behaviour bucket exists to flag, with money instead of Slots.

The gap is exactly the one F-1 identified, one layer down: the Rule states an outcome (FR-62 holds /
does not hold) for a partition that does not cover its own list, so a unit will pick a bucket for
Order Basis by inference and two units will infer differently.

**Fix:** move Order Basis and pricing model into the behaviour bucket explicitly (they belong
there), or say why they are presentational. One clause.

### R4-5 · MEDIUM-HIGH — AD-35 names five callers; three of them do not cite it and still state their own clause `[STILL OPEN from r3, narrowed]` (F-2)

AD-35 closes the ownership question — *"`is_discoverable(listing)` is the **only** statement of the
rule… **No other code restates any term of it.**"* That is the right sentence and it is why F-2 is
materially closed.

The wiring is one-directional. Verified by grep: `AD-35` appears in exactly three places — its own
heading, AD-10's Rule, and the Capability map. The other three ADs it claims as callers were not
amended:

| Claimed caller | What it still says |
|---|---|
| **AD-20** | *"the public read path filters on it"* — no mention of AD-35; still owns its own verification-state gate |
| **AD-27** | still enumerates *"a Listing cannot be published without Verification, an all-in price, Rules and a Commitment (FR-59, FR-71)"* — the conditions AD-35 refers to as a term of its predicate |
| **AD-29** | *"An object is served from the public path only while it is verified… within the Tier's allowance… and not taken down — all three"* — three terms, none of them `is_discoverable`, and none of them the Listing-level predicate |

AD-29 is the sharpest case: `is_discoverable(listing)` is a *Listing* predicate and AD-29's is an
*object* predicate. If AD-29 genuinely must call AD-35 — and it should, since an image of a
non-discoverable Listing must not be public — then AD-29's "all three" is really four, which is also
R4-6. As it stands AD-35 asserts a call graph the cited ADs do not acknowledge, and a builder
working AD-20's epic has no reason to open AD-35 at all.

**Fix:** one clause in each of AD-20, AD-27 and AD-29 citing AD-35 for the composite and keeping
only the term each genuinely owns. Three sentences; this is what "no other code restates any term of
it" costs to actually mean.

### R4-6 · MEDIUM-HIGH — AD-20 still says two gates where AD-29 says three `[STILL OPEN from r3]` (F-9)

Verbatim unmoved since round 3:

- **AD-20:** *"An image is publicly visible only if **verified** *and* **within the Tier's allowance**
  — two independent gates, neither implying the other."*
- **AD-29:** *"…**verified** (AD-20), **within the Tier's allowance** (FR-27) and **not taken down**
  (AD-33) — **all three**."*

Both enumerate exhaustively and they disagree. AD-20's added pointer (*"Filtering the read path is
not sufficient on its own — see AD-29"*) names the right AD without repairing its own count. A unit
building the Listing read path from AD-20 builds a two-gate filter and serves taken-down images in
the listing response — on the one axis carrying a three-hour statutory clock (FR-63, AD-33).

**Fix:** AD-20 owns the verification axis and cites AD-29 (and now AD-35) for the composite; or
AD-29 owns the composite and AD-20 stops enumerating.

### R4-7 · MEDIUM-HIGH — AD-11's `resource` is still polymorphic three ways and the index column set is still unnamed `[STILL OPEN from r3]` (F-11, round-1 A-13.1)

Verbatim unmoved:

> **`resource` is the Space** where the Service has Spaces, and the **Listing** where it does not;
> for a rental-period Service it is the **inventory item**, which is a Space-like row of the same
> kind.

The rental clause still contradicts the clause before it (a rental Service has no Spaces, so clause
one says Listing and clause three says inventory item), and "a Space-like row of the same kind"
still stops short of saying inventory items *are* Space rows — which AD-8's per-Service has-Spaces
declaration would then make awkward.

The column shape is still free, and this is the one AD in the document whose enforcement is *"the
database — a unique index, which no code path can talk past"*. Frappe `name` values are unique per
DocType, not globally, so a single `resource` column over three parent DocTypes is unsafe on its
own; a Dynamic Link makes the index **five** columns and AD-11 names four; the ERD models two
parents and no inventory item while labelling the edge as a four-column uniqueness constraint. An
enforcement mechanism this strong deserves its column list written down.

**Fix:** name the column set the UNIQUE index is over, and either make inventory item a Space row or
model it as its own entity.

### R4-8 · MEDIUM — AD-36 decides Place's representation but not its cardinality, and asserts a Place a Listing "sits at" `[STILL OPEN from r3]` (F-4) `+ [NEW in r4]`

**Closed:** the representation. *"Place is a Frappe tree (`is_tree`, NestedSet)"* is exactly the
decision F-4 asked for, with the right reason (range comparison, not recursive walk) and the right
consequence (Admin opens a Place at any level without a release). Good.

**Still open, and the half that actually diverges:** FR-33 says *"One Vendor may declare **several
areas at different levels**."* AD-36 says *"a Vendor may declare an area at any level"* — singular —
and AD-6 lists *"Place coverage"* as one of the core Listing fields. Single `Link` or child table is
precisely the choice F-4 named ("one field or a child table?"), it is unresolved, and it changes the
join on the hot search path.

**New, and a contradiction rather than a gap:** AD-36 closes with *"AD-22's rating shrinkage and
FR-57's five-vendor floor are computed over **the Place a Listing sits at**, not over its
ancestors."* A Listing does not sit at a Place. A **Wedding** holds a Place (FR-33); a **Vendor**
declares coverage areas, plural, at mixed levels. So the sentence presupposes exactly the
single-Place cardinality FR-33 forbids, and it is load-bearing for two things: which average AD-22
shrinks a rating toward, and whether FR-57's five-vendor comparison floor is ever reached (at
village level, with vendors declaring at district level, it will not be).

The ERD still has no `PLACE` node.

**Fix:** say whether coverage is one Place or a child table of Places; replace "the Place a Listing
sits at" with the Place the aggregate is actually keyed on (most likely the Wedding's Place, or a
declared aggregation level); add `PLACE` to the ERD.

### R4-9 · MEDIUM — Preferred Vendors is still unmodelled and Rule scope is still undecided `[STILL OPEN from r3]` (F-5)

**Closed:** *"A Rule is a typed row on the Listing, never prose alone"*, with a `restrict_service`
kind and an `informational` kind, and the explicit statement that published prose is never parsed.
That is the decision, and it is right.

**Still open, both halves that FR-24/FR-25/FR-32 make cross-unit:**

1. **Scope.** FR-24: *"Where such a Rule is in force **for a Space** the Family has taken, their
   choices in that Service are limited to the permitted set."* AD-36 puts the Rule row *on the
   Listing* and is silent on Space scope. A venue with a lawn and a hall that restricts catering on
   the hall only cannot be expressed, and FR-32's by-name enumeration cannot be computed correctly.
2. **The association.** AD-36 says the Rule *"resolves to that Vendor's Preferred Vendors for it"* —
   naming a thing the spine never models. Verified: **`FR-25` is cited zero times** and there is no
   `PREFERRED_VENDOR` node in the ERD. FR-25 makes it a bilateral record with state that no unit can
   infer: *"A named Vendor must accept the association before it is published"*; a same-business
   disclosure flag that FR-25 requires be shown *"as the same business"*; and a Vendor may name
   **their own Listing** in another Service. Acceptance state and the same-business flag are exactly
   the fields two units will otherwise choose differently, and the same-business flag is the one
   with a fairness consequence FR-25 spells out.

**Fix:** one clause adding Rule scope (Listing or Space), and a `PREFERRED_VENDOR` association with
an accepted state and a same-business flag in the ERD and in AD-36.

### R4-10 · MEDIUM — The Deferred review-history paragraph over-claims closure and under-claims the tail `[NEW in r4]`

The paragraph is much better than the one `review-compliance-r3.md` called *"the single most
damaging line in the document"*. Naming the reports as authoritative, and admitting *"those fixes
have not themselves been reviewed"* and *"assume this one did too"*, is genuinely good practice.

Three of its factual claims do not survive checking.

1. **"round 3 found 4 further criticals, all of them created by round 2's own fixes."** The count
   "4" is `review-adversarial-r3.md`'s alone. `review-rubric-r3.md` raised two CRITICALs of its own
   and `review-compliance-r3.md` records six round-1 CRITICAL/HIGHs *"still not closed… verbatim,
   with no text added"*. And "all of them created by round 2's own fixes" is false on the rubric's
   face: F-2 (discoverability) is marked `[STILL OPEN from round 1]`, as is the whole compliance
   cluster. The sentence flatters round 2 and understates the carry-over.
2. **"Every critical and high finding raised in round 3… is closed in the text above."** R4-1 is a
   counterexample: `review-rubric-r3.md` F-6 is a HIGH and AD-26 is unmoved. R4-2 (MED-HIGH), R4-6
   (MED-HIGH) and R4-7 (MED-HIGH) are three more, all verbatim-unmoved.
3. **The "what remains open and unworked" list** — *"medium findings on FR-52's tax and
   invoice-numbering detail, per-AD `Binds` accuracy, and rules stated in two ADs at once"* — is the
   round-3 sentence with its framing corrected and its content unchanged. Round 3 flagged that it
   *"undersells it"*; it still does. It omits the budget writer, the Enquiry parentage, AD-11's
   `resource` shape, NFR 5.10 and FR-32's commit boundary.

This matters more than an ordinary accuracy finding because this paragraph is what a downstream
epic-cutting agent reads instead of the reports.

**Fix:** replace both counts with "see the reports"; change "is closed" to "was worked, and the
report list below names what was not"; and either enumerate the open tail honestly or delete the
attempt and point at the reviews directory.

### R4-11 · MEDIUM — The ERD still hangs Enquiry off Selection, which FR-34 forbids `[STILL OPEN from r3]` (F-12)

`SELECTION ||--o{ ENQUIRY : "creator only"`, unmoved.

FR-34: a Family sends **one Enquiry to several Listings** in a Service at once — the Shortlist she is
comparing — and the Lead Dashboard **distinguishes** a multi-send from a single send, which is what
SM-2's counter-measure rests on. An Enquiry is sent from a **Shortlist**, before any Selection
exists. Parenting Enquiry to Selection forces five Selections for five shortlisted caterers, which
posts five caterers to the running budget — FR-8's named failure reached from a second direction —
and leaves the multi-send distinction with nowhere to live. It also strands 4.11 (Lead Dashboard).

**Fix:** `WEDDING` + `LISTING` parent the Enquiry, with a send-batch id carrying the multi-send fact.

### R4-12 · MEDIUM — AD-21's enforcement is "the type signature", and nothing type-checks Python `[STILL OPEN from r3]` (F-10 residual)

The tier-1 relabelling is genuinely done — zero occurrences of "tier 1" in the document, and the
preamble's new paragraph explaining why runtime enforcement sits outside the ladder is the right
answer, better than the relabel I asked for. AD-11 ("the database"), AD-27 ("controller guards"),
AD-29 ("the storage bucket policy") and AD-5 ("a startup registry and interface check") now name
real mechanisms.

**AD-21 is the one that did not survive the relabel.** Its Enforced-by is now *"**the type
signature** — a Guest is not a type the function accepts"*. A Python annotation is inert at runtime;
`DEFERRED.md` D-6 records that the backend has **no gate of any kind**, so no checker reads it. If
the recipient is passed as a phone-number string — which is what an outbound messaging call looks
like — nothing fails, and AD-21's Rule promises *"an attempt fails before anything is sent"*.

Round 3 asked for the rule to be tightened so it bites; it was not. **Fix:** make the parameter a
reference a Guest record cannot produce (a `Vendor` / `User` link, never a string), and say the
function raises on anything else — that is a runtime guard, which the document now knows how to
describe honestly.

### R4-13 · MEDIUM — NFR 5.10 is still the one NFR with zero citations `[STILL OPEN from r3]` (F-16)

Verified: `5.10` appears only in the front-matter `scope` and `binds` lines. `packages/shared` is
consumed by all three clients and the spine fixes exactly one thing about it (generated zod, AD-4).

Two constraints at this altitude have no home, and both are the kind a future unit silently breaks:

- NFR 5.10: *"One token in the palette is an accessibility decision, not an aesthetic one… **It must
  not be lightened**, whatever a future design pass prefers."* The Accessibility Conventions row
  covers colour-alone, not this.
- `CLAUDE.md` §4: `tokens.js` is plain ESM **on purpose** because Tailwind configs execute in Node
  and cannot import TypeScript — converting it breaks both Tailwind configs; and the two apps run
  different Tailwind majors so config syntax does not transfer.

**Fix:** one Conventions row. It is the cheapest open finding in this report.

### R4-14 · MEDIUM — Terseness has broken `[STILL OPEN from r3 — worse]` (F-21)

10,568 words / 580 lines / 36 ADs, against round 3's 8,087 / 518 / 34. See section C.1 for what to
cut and why.

### R4-15 · MEDIUM — AD-1 and AD-2 still claim to prevent business rules in clients `[STILL OPEN from r3]` (F-18)

- **AD-1 Prevents:** "business rules migrating into clients." **Rule:** import direction *inside the
  backend app*. It cannot express, let alone stop, logic appearing in a TypeScript client in a
  different repository.
- **AD-2 Prevents:** "business rules that are not permissions leaking into clients." **Rule:** no
  generic document API. A client calling a purpose-built method can reimplement any rule it likes on
  the response.

AD-19's *"clients never do money arithmetic"* is still the only rule in the spine that bites here,
because it names a concrete forbidden operation. Either drop the claim from both Prevents lines or
generalise AD-19's shape into a Conventions row.

### R4-16 · MEDIUM — AD-24's gate still claims a scope it cannot reach `[STILL OPEN from r3]` (F-19)

AD-24 still says the pre-commit gate blocks the banned words *"across `apps/`, `packages/`, **the
backend app** and the root `.html` files"*, while the Structural Seed says the backend is not in this
repository and the source tree puts `scripts/vocab-gate.sh` in `vivsth/`. A pre-commit hook here
cannot scan a bench outside the tree — and the backend is where the DocType and field names AD-24
most cares about live. `DEFERRED.md` D-13 inherits the same over-scope.

### R4-17 · MEDIUM — Frappe mechanics restated, now in eight ADs `[STILL OPEN from r3 — worse]` (F-17)

Line 30: *"Frappe mechanics are owned by the six `frappe-*` skills — cited, never restated."* Round 1
found three, round 3 five, round 4 eight: AD-4 (Pydantic), AD-11 (MariaDB NULL/UNIQUE), AD-12
(`docstatus`, cancel-and-amend), AD-16 (`ignore_permissions`, row cap), AD-17 (`db_query.py` /
`permissions.py` internals, version-pinned to 16.33), AD-18 (commit-on-verb, CSRF), AD-26
(`doc_events` commit/rollback no-ops, `set_value` not firing events), AD-27 (`allow_on_submit`
semantics), AD-28 (`user.py:191`, `session_expiry`, `login_as`).

Most are load-bearing — AD-11's and AD-27's justify non-obvious choices and should stay. Two should
not. **AD-17's** version-pinned internals will be false at v17 and nothing here will notice.
**AD-4's** is still inaccurate in the way that matters: Frappe's typing validation applies to
whitelisted method **arguments**; return annotations are not validated or coerced, and AD-4's
contract is "one request/response shape", so the generator's response half rests on a guarantee the
framework does not give. That sentence has now survived three rounds.

### R4-18 · MEDIUM — AD-14 was not amended for AD-33's legal hold, and the infringer register is still defeated by erasure `[STILL OPEN from r3, half closed]` (F-15)

AD-33's new *"on the same record"* carve-out and its closing clause (*"a Guest's contact details are
erased on AD-14's schedule regardless of anything removed elsewhere"*) resolve the grievance-elsewhere
collision cleanly. Two halves remain:

1. **AD-14 still says** *"NFR 5.5's precedence is implemented here and never re-derived"* and *"Guest
   contact details are **erased outright**"* with no exception, while AD-33's legal hold says
   *"nothing automatic touches that record — not the 180-day purge, **not an erasure request**"*.
   AD-33 is right and AD-14 forbids it saying so. One clause in AD-14 pointing at AD-33's hold fixes
   it.
2. **The register.** AD-33 keys the repeat-infringer register on AD-14's *"stable per person"* token.
   But AD-14's erasure *"replaces the identifying fields there"* — including `mobile_no`, which
   AD-28 makes the unique sign-in key. Clearing it frees the number, so a removed infringer who
   erases and re-registers on the same number becomes a **new** person record with a **new** token,
   and the register cannot link what it exists to link. Either erasure retains a one-way hash of the
   number for this single purpose (and AD-32 records the basis), or the register is keyed on
   something erasure does not touch.

### R4-19 · LOW-MEDIUM — `Binds` residuals `[STILL OPEN from r3]` (F-20)

Fixed since round 3: AD-31 now binds "AD-23's scheduled jobs" rather than a wrong count; AD-23 no
longer asserts a total; AD-26 now binds the FRs its Rule names. Remaining:

- **AD-8 binds FR-71** and its Rule touches none of FR-71's required capabilities (headcount
  recommendation, named photographer, Stated Size sharing, no-demands declaration, site visit).
  AD-5's Binds claims them as handler behaviour; FR-71 says they are *"configured with the Service"*.
  One of the two must own them.
- **AD-11** omits **FR-28** (the FR its Rule implements) and **FR-14** (whose Span-continuity
  sentence it quotes), and binds "occupancy rows", which is not a requirement.
- **AD-10 binds FR-34**, which nothing in its Rule touches.

### R4-20 · LOW — Enforced-by lines that under-claim what AD-27 now gives them `[NEW in r4]`

AD-27's promotion to a general property explicitly pulls in *"grievances and their disposal,
takedowns with their ground and authority, consent records, and the repeat-infringer register (AD-32,
AD-33)"*. That closes `review-compliance-r3.md`'s second structural point. But **AD-32's**
Enforced-by is still *"schema review of any new personal-data field"* and **AD-33's** is still
*"review only"* — neither mentions the controller guard AD-27 now guarantees them, and a reader of
AD-33 alone concludes its records are Desk-editable. Two words each.

### R4-21 · LOW — Residue and tidy `[STILL OPEN from r3]` (F-21, F-22, F-23)

1. **Conflicts table says "six sentences marked `[AMENDED]` inline".** Verified in `prd.md`: **five**
   inline `[AMENDED]` markers (lines 157, 169, 1185, 1188, 1189) plus the `[AMENDED 2026-09-06]`
   header note at line 11. Off by one, in a table whose value is that it is checkable. `[NEW in r4]`
2. **`api.mobile.v1` is still live on disk** in `packages/shared/package.json:6`,
   `packages/shared/src/index.js:5` and `apps/mobile/src/mocks/catalog.ts:4`. `CLAUDE.md` §2 was
   genuinely rewritten to `api.family.v1` (verified on disk — good, and the Conflicts row claiming it
   is accurate), but the rename of a **committed identifier in `packages/shared`** still has no
   Conflicts row of its own.
3. **AD-24 still describes a `CLAUDE.md` §6 noun list that no longer exists.** §6 on disk now carries
   the PRD Glossary verbatim. The sentence *"`CLAUDE.md` §6's noun list (`Vendor Listing`, `Package`,
   `Availability Block`, `Service Category`)… is retired"* is now archaeology; the Conflicts row is
   the right home for it. `[NEW in r4]`
4. **`apps/guest-web` still does not exist on disk** (`apps/` holds `mobile` and `vendor-web`), while
   the Stack table opens *"Client versions read from `package.json` on disk"*. One word ("new") in
   the source tree fixes it.
5. **WCAG AA is still claimed on "all five surfaces"**, the fifth being Frappe Desk, whose
   conformance Vivah Spot does not own. Four surfaces plus a Deferred line for Desk is the honest
   form.
6. **`[ADOPTED]` is still on AD-5's title** — the only status tag in the document — and **AD-5's
   "Accepted cost" paragraph still duplicates the Conflicts table row** in substance. The Conflicts
   row is the record; the paragraph belongs in `.memlog.md`.

---

## C. The three questions asked

### C.1 · Is it too long? Yes. Cut it.

**10,568 words, 580 lines, 36 ADs**, up 31% in words since round 3. Round 3's verdict was "at the
ceiling"; this is over it. The failure mode of a long spine is not that it is unreadable — it is that
a builder reads the AD their epic is named after and nothing else, which is precisely what R4-5
(AD-35's three uncited callers) and R4-6 (AD-20 vs AD-29) show already happening *inside* the
document.

Nothing needs to be cut for correctness. About **1,800–2,200 words** can go without losing a single
decision. In priority order:

**1. The decision-log layer that has grown inside the ADs (~400 words). Move it to `.memlog.md`,
which already exists at 70 KB for exactly this.** Five passages are commentary about the document's
own history, not instructions to a builder:

- AD-8: *"Abhishek accepted this on 2026-09-06 rather than copy the settings onto each Listing or
  freeze them after the first Listing."*
- AD-34: *"Abhishek accepted that risk on 2026-09-06 rather than build a guard."*
- AD-23: *"(This enumeration has lagged the rule three times during this document's own history…)"*
- AD-27: *"(This spine's enumerated lists have been incomplete three times…)"*
- AD-32: the whole GDPR-versus-DPDP paragraph — *"An earlier draft of this AD used consent /
  contract / legal-obligation, which are GDPR categories…"*

The **rule** each of these justifies must stay. The rationale for why an *earlier draft* was wrong is
the memlog's job, and `DEFERRED.md` D-16 already carries both accepted risks. Two of these are
self-referential apologies inside normative text, which is the clearest sign the document has started
talking to its reviewers rather than its builders.

**2. AD-23's enumeration (~250 words).** AD-23 itself now says the list is *"its current contents
rather than a guarantee of completeness"*. Once the property is stated, sixteen job names in a
paragraph are a checklist, not an invariant — and the spine has admitted three times that the list
lags. Keep the sentence, delete the list, let `hooks.py` be the list.

**3. Three ADs that are requirement- or standard-restatement, not invariants.** These are the ones
that would not be missed:

- **AD-7** ("shared behaviour is discovered from handlers") — a restatement of UH-9, which
  `coding-standards.md` owns as a MUST with a tier-2 gate (line 226, and the §4 ladder). It fixes no
  divergence a compliant reading of UH-9 does not already fix. → one Conventions line. Flagged in
  rounds 1 and 3; still there.
- **AD-25** ("configuration comes from the environment") — three sentences restating UH-16 and
  `CLAUDE.md` §6, and the Conventions table **already** has a `Config | Environment only (AD-25)`
  row pointing at an AD that says nothing the row does not. → delete the AD, keep the row, cite
  UH-16 and D-5.
- **AD-13** ("the cancellation count is never derived from `docstatus`") — a genuine and correct
  decision, but it is one field's design, its Enforced-by is "review only", and it reads as FR-42
  restated. → Conventions row, or fold into AD-12 which already owns `docstatus` semantics.

**4. The no-mandate rule is still stated three times** — AD-34's Rule, the Stack's unpinned list, the
Conflicts table. The Conflicts row earns its place (it records a source contradiction); the Stack
line duplicates the AD.

**Do not cut** AD-11, AD-12, AD-26, AD-27, AD-28, AD-29 or AD-35 for length, even though AD-28 is
~700 words and six decisions. They are long because the decisions are load-bearing. If AD-28 is
touched at all, split it — identity + session mechanics are one AD, OTP parameters and rate limits
another — rather than shortening it.

### C.2 · Are AD-35 and AD-36 genuine invariants, or restatement?

**Both are genuine invariants. Neither is finished.**

**AD-35 is genuine, and it is the best single addition since AD-27.** The test is whether two units
obeying every other AD could build incompatibly, and before AD-35 they demonstrably would have:
five ADs each owned one term of a five-term conjunction and FR-53 requires all four routes to behave
identically. AD-35 names one artefact (`is_discoverable(listing)`), one stored consequence (an
indexed column), and the sentence that makes it bind (*"No other code restates any term of it"*). It
is also correctly reconciled with `CLAUDE.md` §6's Frappe-divergence rule about persisting computed
fields, which is the kind of cross-reference that shows the decision was actually thought through.
Its two gaps (R4-3, R4-5) are wiring, not concept.

**AD-36 is genuine but is two ADs welded together, and each half is about 60% done.** The Place half
makes a real representation choice with a real consequence (NestedSet range comparison on the hot
search path). The Rule half makes a real shape choice (typed row, `restrict_service` kind, prose
never parsed) that FR-32's cascade could not be computed without. Neither is restatement — the PRD
says *what* a Rule does and *that* Places are a hierarchy; AD-36 says *how they are stored*, which is
exactly the spine's job. But it inherits the "two decisions in one AD" pattern already flagged on
AD-11, AD-17, AD-24, AD-33 and AD-34, and it leaves the cardinality (R4-8), the scope (R4-9) and the
Preferred Vendor association (R4-9) undecided while introducing one contradiction of FR-33.

**Split AD-36 into AD-36 (Place) and AD-37 (Rules and Preferred Vendors)** and finish both. That is
the one place the AD count should *go up*, and it is affordable out of the ~2,000 words C.1 frees.

### C.3 · Does the Deferred review-history paragraph describe the state accurately?

**No — it over-claims closure and under-claims what remains.** Full detail in **R4-10**. In short:
"4 further criticals, all created by round 2's own fixes" is wrong on both halves; "every critical
and high finding raised in round 3… is closed in the text above" has at least four counterexamples
in this report alone, the flagship being FR-32's commit boundary (R4-1); and the open-tail sentence
is round 3's undersell carried forward with better framing and unchanged content.

Credit where it is due: *"those reports are the authoritative record, not this paragraph"*, *"those
fixes have not themselves been reviewed"* and *"assume this one did too"* are the right instincts and
should stay. The counts around them should go.

---

## D. Checklist walk

| # | Item | r3 | r4 |
|---|---|---|---|
| 1 | Fixes the real divergence points, misses none | FAIL | **FAIL** — R4-2 (budget writer), R4-7 (`resource` shape), R4-8 (Place cardinality), R4-9 (Rule scope, Preferred Vendors), R4-11 (Enquiry parentage). Discoverability, `User.name`, Place representation and Rule typing are genuinely closed. |
| 2 | Every Rule enforceable and prevents its Prevents | FAIL | **FAIL** — R4-1 (AD-26 commit boundary), R4-3 (AD-35 writer), R4-4 (AD-8 partition), R4-5 (AD-35 uncited callers), R4-6 (AD-20 vs AD-29), R4-12 (AD-21), R4-15 (AD-1/AD-2), R4-16 (AD-24 scope). The tier-1 dishonesty is fully closed and the preamble's replacement paragraph is better than what was asked for. |
| 3 | Nothing under Deferred lets two units diverge | PASS | **PASS** — walked below |
| 4 | Ratifies rather than contradicts the brownfield | PASS w/ findings | **PASS with findings** — improved: `CLAUDE.md` §2/§3/§6 verified rewritten on disk and the Conflicts rows describing them are accurate; `DEFERRED.md` D-10..D-16 mirror the spine's Deferred section faithfully. Residue in R4-21. |
| 5 | Covers 4.1–4.14 and NFR 5.1–5.10 | PASS w/ findings | **PASS with findings** — unchanged shape; the two structural holes are 4.2 (FR-8, R4-2) and 5.10 (R4-13). 4.5 and 4.7 improved but still partial. |
| 6 | Every dimension decided, deferred or open | PASS w/ findings | **PASS with findings** — one silence unchanged: design tokens / NFR 5.10 (R4-13). Client-side draft survival under NFR 5.3 still has no owner. |
| 7 | Terse | PASS w/ findings | **FAIL** — C.1 |

### Item 3 — the Deferred section

Still the strongest part of the document, and the strongest it has been. The hosting entry carries
its blocking list and the bench Python/Node constraint; observability is named rather than skipped;
rate limiting is a dated decision with a named trigger and its two Frappe traps recorded; every entry
now has a matching `DEFERRED.md` D-number. Nothing under Deferred lets two units diverge.

Two notes, neither a finding:

- The **search seam** caveat from rounds 1 and 3 is still unstated, and AD-35 makes it sharper:
  `search_listings()` is named as the one-file swap, and AD-22's ordering, AD-10's availability gate
  **and now AD-35's `discoverable` column** all live inside it. A swap relocates three.
- The **review-history paragraph** is R4-10, not an item-3 failure — it does not let two units
  diverge, it lets one agent skip the reports.

### Item 5 — where coverage is thin rather than absent

| Group | r4 |
|---|---|
| 4.1 Accounts & Access | **Yes** — R4-3's `User.name` gap closed at the source, verified against the bench |
| 4.2 Wedding Workspace | **Partial** — FR-8 still has no owner (R4-2) |
| 4.3 Dates & Availability | **Yes** — still the strongest cluster |
| 4.4 Discovery & Comparison | **Partial** — AD-35 and AD-36 land; Place cardinality open (R4-8) |
| 4.5 Vendor Listings | **Partial** — Rule typed; scope and Preferred Vendors open (R4-9); FR-71 floats between AD-5 and AD-8 (R4-19) |
| 4.6 Vendor Calendar | **Yes** |
| 4.7 Enquiries | **Partial** — ERD parentage still contradicts FR-34 (R4-11) |
| 4.8 Agreements | **Yes** |
| 4.9 Reviews | **Yes** |
| 4.10 Subscription & Billing | **Partial** — FR-52's per-year reset, 16-character ceiling and no-gaps property are still prose, not the constraint AD-11 uses for the same class of problem |
| 4.11 Lead Dashboard | **Partial** — depends on R4-11 |
| 4.12 Trust & Verification | **Partial** — AD-20 vs AD-29 (R4-6) |
| 4.13 Admin Console | **Yes** — AD-27's property restatement is the round's best edit |
| 4.14 Real Weddings | **Yes** |
| 5.1 / 5.2 / 5.4 / 5.6 / 5.7 / 5.8 / 5.9 | **Yes** (5.4 deferred correctly; 5.8 minus R4-21.5) |
| 5.3 Performance | **Partial** — client draft persistence still has no owner |
| 5.5 Data protection | **Yes**, minus R4-18. AD-32's read log and `Breach Incident` close the round-3 hole properly and the scoping argument for why it is Guest contact data only is sound. |
| 5.10 Identity and voice | **No** — R4-13 |

---

## E. Minimum to reach PASS

Six edits, four of them one sentence.

1. **R4-1** — AD-26: the Rule-conflict cascade is authorised on acceptance and applied only in the
   transaction that wins AD-11's insert. *One sentence. This is the highest-value edit in the list
   and has been open since round 1.*
2. **R4-2** — name the single writer of the running total and where the Family's override sits; add
   the `SELECTION`→`WEDDING_FUNCTION` edge. *One Conventions row plus one ERD edge.*
3. **R4-3 / R4-5** — AD-35: name the flag's writer and its layer (and whether it is a seventh
   cascade or an exception to AD-26's six), and say which of function-or-column a caller consults;
   then add the citing clause to AD-20, AD-27 and AD-29. *Four sentences.*
4. **R4-4** — AD-8: put Order Basis and pricing model in the behaviour bucket. *One clause.*
5. **R4-6 / R4-7 / R4-8 / R4-9 / R4-11** — the five shape decisions: AD-20 stops enumerating; AD-11
   names its index columns and resolves inventory item; AD-36 splits, fixes coverage cardinality and
   drops "the Place a Listing sits at"; Rule scope; `PREFERRED_VENDOR` and `PLACE` in the ERD;
   Enquiry reparented.
6. **R4-13** — one Conventions row for the `packages/shared` token contract.

Then the editing pass: **R4-10** (the review-history paragraph), **R4-12**, **R4-14 / C.1** (the
cut), **R4-15** through **R4-21**.

## F. What this round got right — do not disturb it

- **AD-27's promotion from list to property.** *"Any record that evidences a legal obligation, or a
  person's standing, is append-only… A record nobody thought to list is still covered by this
  sentence."* This is the correct answer to a class of finding, not to a finding, and it retires
  round 3's F-14 and the compliance review's Desk-editable-consent-records point in one move.
- **The tier-1 removal and its replacement paragraph.** *"…most enforcement here is runtime… which
  the ladder was never meant to cover and which is stronger than an edit-time hook rather than equal
  to it."* That is a better answer than the relabel round 3 asked for, and it makes the honesty
  scorecard match the codebase.
- **AD-28's `user.py:191` finding.** Verified against the installed framework, with the erasure
  consequence spelled out (`owner`/`modified_by` on thousands of rows) and the concrete form of the
  fix (`u-3f9a2c81@…`, not `9822012345@…`). This is what "no unverified identifier" looks like.
- **AD-8's honest split.** Scoping FR-62 to presentational declarations, stating the behaviour case
  is *not* covered, naming the concrete failure (a per-Function Service switched to Span swallowing
  the overnight), amending the PRD rather than the spine, and recording it as an accepted risk in
  D-16 — that is the right shape for a conflict that cannot be designed away.
- **AD-32's `Breach Incident` scoping argument.** *"logging every read of everything would be
  ruinous, and this is the class held about people who never chose to be here."* A defensible
  boundary with the reason attached.
- **AD-33's legal hold.** *"Without this, AD-23's purge job destroys on day 181 exactly what a court
  ordered preserved."* Correct, and the sentence that stops someone deleting it later.
- **`DEFERRED.md` D-10..D-16.** The spine's Deferred section and the repo's ledger now agree entry
  for entry. That is the mechanism by which any of this survives compaction.
