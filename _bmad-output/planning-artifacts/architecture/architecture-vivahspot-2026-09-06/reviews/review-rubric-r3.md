---
review: rubric
round: 3
lens: 'The good-spine checklist (items 1-7), re-run against the twice-revised spine'
target: '_bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md'
prior: 'reviews/review-rubric.md (round 1, FAIL) · reviews/review-closure.md (round 2)'
driving_spec: '_bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/prd.md'
date: '2026-09-06'
verdict: FAIL
---

# Rubric review, round 3 — ARCHITECTURE-SPINE.md

## Verdict: FAIL

Narrowly, and for different reasons than round 1. Nine of my nineteen round-1 findings are genuinely
closed, two of the three CRITICALs among them. AD-28 (auth), AD-26 (cascades), AD-29 (media),
AD-31 (idempotency), AD-32 (consent), AD-33 (takedown), AD-34 (billing) and the AD-6/AD-8/AD-10/AD-11
rewrites turned four silent dimensions and two whole modelling gaps into decisions. AD-10's Engagement
Model table and AD-11's seat/sentinel/capacity rules are now the strongest work in the document.

It fails on **item 1** and **item 2**, on a shorter list than before:

- Three shapes two units still choose incompatibly — the **Place hierarchy**, the **Rules /
  Preferred Vendors** predicate, and the **running budget's** writer — are unfixed for the third
  round running, and all three are load-bearing for ADs that now exist (AD-22 shrinks toward a
  "Service-and-Place average"; AD-26 runs a cascade over Rules; AD-26 names five cascades that touch
  the budget).
- The **discoverability predicate** (A-5) has not been consolidated. It was split two ways in round 1
  and three ways after round 2; it is now split **five** ways — AD-10 (subscription gate), AD-20
  (verification read path), AD-26 (cascade), AD-27 (conditions of listing), AD-29 (public objects).
  FR-53 and FR-59 both require the four routes behave identically, and no single owner exists.
- The revision's largest new hole is item-2 shaped: **AD-8 now makes the Engagement Model, has-Spaces,
  Sizing Attribute and Order Basis runtime-editable, states that "a configuration change never
  rewrites what already happened", and provides no mechanism for it.** AD-10 and AD-11 both dispatch
  on those declarations. Whether a Listing reads them live or froze them at creation is undecided,
  and the two answers give different meanings to occupancy rows already in the table.
- **`User.name` still appears nowhere** (A-6). AD-28 makes the mobile number the identity and had the
  natural place to say what the Frappe `User` record is named; it does not, so AD-14's stated
  Prevents — "one missed table is an undiscovered leak" — is defeated by `owner`/`modified_by` on
  every row of every DocType.

Item 6 is close to a pass: one dimension is still silent (design tokens / NFR 5.10, the only NFR with
zero citations). Item 7 is a pass with findings — 8,087 words and 34 ADs is at the ceiling for this
altitude, and five ADs still restate Frappe mechanics the preamble says are "cited, never restated".

Every finding is marked `[STILL OPEN from round 1]` or `[NEW in round 3]`. Where a `[NEW]` finding
descends from a round-2 review finding, the lineage is noted.

---

## A. Findings

### F-1 · CRITICAL — AD-8 makes structural declarations runtime-editable, states a carry-forward rule, and gives it no mechanism `[NEW in round 3]`

*(descends from closure ND-11, which asked for the rule; the rule landed, the mechanism did not)*

AD-8's Rule now moves **Engagement Model**, **Sizing Attribute**, **Order Basis**, **pricing model**
and **whether the Service has Spaces** onto the Service row as "Admin-editable data on the Service
row, changed with no code release". Its second paragraph then carries FR-62's consequence:

> **A configuration change never rewrites what already happened** (FR-62). Existing Listings,
> Shortlists, Enquiries and Agreements keep the shape they were created under.

Nothing says how. The two available implementations are incompatible and both are compliant readings:

1. **Live read** — AD-10's dispatch and AD-11's expansion read `Service.engagement_model` at
   evaluation time. Then flipping Venue from Span to per Function retroactively changes the answer
   AD-10 gives for a confirmed Agreement, changes which Slots AD-11's already-written rows were
   supposed to occupy, and changes which resource the UNIQUE index is keyed on. The carry-forward
   sentence is false.
2. **Frozen at creation** — each Listing (or Agreement, or Enquiry) snapshots the declarations it was
   created under. Then the carry-forward sentence is true, but AD-8 never says the snapshot exists,
   AD-6's core field list does not include it, the ERD has no such column, and AD-10's "dispatches on
   the Service's declared Engagement Model" points at the wrong row.

This is the exact class item 2 tests: the Rule states an outcome the Rule cannot produce. It is also
item 1 — two epics ("venue configuration" and "availability") will pick opposite answers and both
cite AD-8. And the enforcement line, *"handler interface check (tier 1); review (tier 3)"*, cannot
see either choice: an interface check inspects handler signatures, not whether a Listing froze its
Service's declarations.

**Fix:** say which. If frozen, name where the snapshot lives and put it in AD-6's core (it is
cross-Service by construction, so AD-6 requires it on the core). If live, delete the carry-forward
sentence and record the conflict with FR-62 in the Conflicts table instead.

### F-2 · CRITICAL — The discoverability predicate is now split five ways `[STILL OPEN from round 1]` (A-5)

FR-53 closes with *"No route removes a Listing from a Family's view without telling them"*, and its
four routes *"behave identically for Families"*. FR-59 defers to it explicitly: *"A Listing that stops
satisfying them stops being discoverable until it does again, under the four-route rule at the end of
FR-53."*

Round 1 found the predicate in two places. Round 2 added a third. The current spine has five owners of
one fact:

| Owner | What it decides about visibility |
|---|---|
| AD-10 | "a Listing past its Grace Period shows no dates, because it is not discoverable"; Founding Vendor at ₹0 counts as active |
| AD-20 | "the public read path filters on it" — per-item verification state, identity exception takes the whole Listing pending |
| AD-26 | the cascade fired by four triggers when a Listing leaves discovery |
| AD-27 | "a Listing cannot be published without Verification, an all-in price, Rules and a Commitment" — the conditions of listing whose failure is route 4 |
| AD-29 | which media objects sit on the public path — three conditions, not the same three as AD-20 (see F-9) |

AD-26 is a genuine improvement: it gives the *cascade* one implementation and correctly insists route 4
raises an event rather than being a read-time check. But the *predicate* — the question "is this
Listing discoverable right now", asked by search, comparison, matching, the Shortlist, the Enquiry
gate and the media path — has no owner, so route 4's event has nothing canonical to evaluate and each
of the six callers will assemble its own conjunction from whichever ADs its epic read.

**Fix:** unchanged from round 1. One `is_discoverable(listing)` returning the predicate and the
reason; AD-10, AD-20, AD-27 and AD-29 cite it rather than restating their clause of it; AD-26's event
recomputes it.

### F-3 · HIGH — `User.name` and Frappe's identity trail are still unaddressed `[STILL OPEN from round 1]` (A-6)

Verified: zero occurrences of `User.name`, `modified_by`, `Activity Log`, `Route History`, `Access Log`
or `Email Queue` in the spine.

AD-28 arrived and settled everything about identity except the one thing that determines whether
AD-14 works. AD-28: *"The mobile number is the identity and one person is one account."* AD-14:
*"No record copies a person's name or number; every record references one person record."*

Frappe stamps `owner` and `modified_by` on every row of every DocType and copies the same value into
`Version`, `Comment`, `Activity Log`, `Communication`, `Email Queue`, `Access Log` and `Route History`.
That value is `User.name`. If a unit reads AD-28 literally and names the User record after the mobile
number — the obvious implementation, and the one a Frappe developer reaches for — the identifying
detail is copied into every table in the database, and AD-14's Rule declares the problem solved.

AD-14's Prevents names this failure precisely: *"one missed table is an undiscovered leak"*. It is not
one table; it is all of them.

**Fix:** one sentence in AD-28 — `User.name` is an opaque non-identifying id; the mobile number lives
only on the person record — plus a clause in AD-14 naming the Frappe-owned tables erasure must sweep,
or scoping them out with a reason.

### F-4 · HIGH — The Place hierarchy still has no representation decision `[STILL OPEN from round 1]` (A-10)

FR-33 is unambiguous and unimplemented by the spine: Places are *"a **hierarchy** — village and town,
tehsil, district, state, country"*; a Vendor declares coverage *"at whatever level fits them"* and
*"may declare several areas at different levels"*; a Family sees *"the Vendors whose declared area
**covers** that Place, at any level of the hierarchy"*; and *"Admin can open a new Place without a code
release"*.

That is an ancestor-containment query against a set of declared areas, on the hot search path. Nested
set (`is_tree`/NestedSet, `lft`/`rgt`) versus adjacency list versus materialised path determines the
query, the indexes, and whether AD-8's "opening a Place at any level" is a cheap insert or a tree
rebuild. `frappe-doctype` owns the mechanics; the choice is the spine's.

Three ADs now depend on the shape that is not fixed: AD-6 ("Place coverage" as a core Listing field —
one field or a child table?), AD-8 ("opening a Place at any level" asserted as data), and AD-22
("rating shrunk toward the Service-and-Place average" — at which level of the hierarchy?). The ERD
still has no `PLACE` entity, and the Conventions Migrations row cites "Place hierarchy roots" as
something a patch seeds, which presumes a representation nothing declares.

**Fix:** one Conventions row and a `PLACE` node in the ERD.

### F-5 · HIGH — Rules and Preferred Vendors have no shape, and AD-26 runs a cascade over them `[STILL OPEN from round 1]` (round-1 item-5 walk, §4.5)

AD-6 lists `Rules` as a Listing core field. That is the only thing the spine says about them.

FR-24 makes a Rule a **structured predicate**: *"A Rule may restrict a Service to the Vendor's
Preferred Vendors… Where such a Rule is in force for a Space the Family has taken, their choices in
that Service are limited to the permitted set."* FR-25 makes Preferred Vendors a **bilateral record
with state**: *"A named Vendor must accept the association before it is published"*, plus a
same-business disclosure flag. FR-32 requires the platform to enumerate, **by name**, every Shortlist
entry and Agreement a Rule would invalidate — computable only over structure.

AD-26 then names *"accepting a conflicting Rule (FR-32)"* as one of its six cascades. The cascade now
has exactly one home and nothing to compute over. Free text and a structured predicate are both
compliant readings of "Rules", they produce incompatible DocTypes, and the ERD has neither
`LISTING_RULE` nor `PREFERRED_VENDOR`.

**Fix:** one line deciding that a Rule is structured (subject Service, permitted set, scope: Listing or
Space) and that the published prose is never parsed; a `PREFERRED_VENDOR` association with an
accepted state and a same-business flag in the ERD.

### F-6 · HIGH — AD-26 does not carry FR-32's commit boundary `[STILL OPEN from round 1]` (A-11, residual)

FR-32: *"**Nothing is removed until the engagement actually completes.** Acceptance authorises the
consequence; the consequence takes effect only when the Agreement is confirmed. If confirmation fails
for any reason FR-39 allows — the Slots taken first, or the same-account bar — the Family's Shortlist,
Selections and existing Agreements are exactly as they were."*

AD-26 gives the cascade one implementation and says nothing about when it fires. AD-11 makes
confirmation a race decided by a unique-index violation with a seat retry. So the cascade must be
inside the same transaction as the winning occupancy insert, and must not run on acceptance.

A unit reading AD-26 alone will apply the cascade at the moment the Family accepts the consequence,
because that is where the user-visible act is — and a Family who loses the Slot race then loses her
Shortlist and her existing Agreements for nothing. This is destructive and silent, and AD-26's Prevents
does not reach it.

**Fix:** one sentence in AD-26: the Rule-conflict cascade is authorised on acceptance and applied only
in the transaction that wins AD-11's insert; nothing is written on acceptance.

### F-7 · HIGH — AD-30 and AD-32 contradict each other on the no-login rights surface `[NEW in round 3]`

*(the revision closed closure ND-12 by widening AD-30; widening it created this)*

AD-30 now governs **every** `allow_guest` method, and names AD-32's surface as one of the three it
covers:

> Every `allow_guest=True` method … returns only fields that are **safe to show an unauthenticated
> caller**. That covers … AD-32's see-and-correct surface for people who never held an account.

AD-32's surface exists to do the opposite:

> Every person, **including one who never held an account**, can see and correct what is held about
> them; `guest-web` carries that surface.

Its entire purpose is to return one identified person's personal data to a caller who by construction
has no account and no guest token. Under AD-30's return-shape rule the endpoint may return nothing
useful; under AD-32 it must return everything held. AD-30 supplies no identity-proof step (the obvious
one — an OTP to the number in question, which AD-28 already builds — is unstated), and AD-30's other
guarantees do not apply: there is no token to rate-limit per, and "addresses exactly one Guest of one
Wedding" is meaningless here.

Two units will resolve this in opposite directions, and one of the two directions is an unauthenticated
personal-data disclosure endpoint.

**Fix:** AD-30 carves out the rights surface and names its proof-of-control step, or AD-32 states it.
Either way one of the two must own it; today both claim it and they disagree.

### F-8 · MEDIUM-HIGH — The running budget still has no writer `[STILL OPEN from round 1]` (round-1 item-5 walk, §4.2)

FR-8 is one of the most shape-bearing FRs in the PRD and the spine cites it zero times. Its rules are
all cross-unit:

- a Shortlist contributes nothing; a Selection contributes its all-in price **once**;
- **"A Span Selection contributes once for the whole Span"** — the named failure is ₹7.2L posted for a
  ₹2.4L lawn;
- confirming an Agreement **replaces** the Selection's estimate with the agreed figure;
- per-head Services multiply by the stated guest count of the Functions served, and show the working;
- a Service whose Functions are undecided reads **"not yet estimated", never ₹0**;
- **the Family can override any derived figure** and add costs the platform knows nothing about.

The last one is decisive: the total is not purely derived, so a derived value and an override must
coexist somewhere, and nothing says where. Meanwhile the Conventions Mutation row says *"DocTypes
persist computed fields, written in `validate`"*, which invites every DocType that touches the total to
write it; AD-26 names five cascades that legitimately change it; AD-19 fixes only the units and that
the arithmetic is server-side.

Note also that "A Span Selection contributes once" presupposes the Selection→Function mapping the ERD
does not model (`SHORTLIST ||--o{ SELECTION`, no `SELECTION_FUNCTION`) — the same mapping AD-10's
phrase *"the Functions that Service serves within the Block"* also presupposes.

**Fix:** one AD or Conventions row naming the single writer of the running total, and the ERD edge that
makes "once per Span" expressible.

### F-9 · MEDIUM-HIGH — AD-20 and AD-29 state different predicates for the same fact `[NEW in round 3]`

*(descends from closure ND-14(a); the revision fixed AD-29 and left AD-20 behind)*

- **AD-20:** *"An image is publicly visible only if **verified** *and* **within the Tier's allowance** —
  two independent gates, neither implying the other."*
- **AD-29:** *"An object is served from the public path only while it is **verified** (AD-20), **within
  the Tier's allowance** (FR-27) and **not taken down** (AD-33) — all three."*

Two gates against three, for one fact, stated as exhaustive in both places ("two independent gates" /
"all three"). AD-20 does add *"Filtering the read path is not sufficient on its own — see AD-29"*,
which points at the right AD but does not repair its own enumeration; an implementer building the
Listing read path from AD-20 builds a two-gate filter and serves taken-down images in the listing
response, on the one axis with a three-hour statutory clock (FR-63).

This is UH-6 inside the spine: one predicate, two owners, already drifting one revision after the
last round flagged it.

**Fix:** AD-20 owns the verification axis only and cites AD-29 for the composite; or AD-29 owns the
composite and AD-20 stops enumerating.

### F-10 · MEDIUM-HIGH — The "tier 1" label is wrong on nine ADs, up from two `[STILL OPEN from round 1]` (A-12)

`coding-standards.md` §4 defines tier 1 as an **edit-time hook** ("seconds after the edit"), tier 2 as a
commit gate, tier 3 as a human read. The spine's preamble adopts that ladder and promises *"`does not
exist` is stated honestly rather than hidden"*.

Nine ADs now claim tier 1, and every one of them is a **runtime** mechanism:

| AD | Claim | Actually |
|---|---|---|
| AD-5 | startup registry + interface check (tier 1 by construction) | process start |
| AD-8 | handler interface check (tier 1) | process start — and it cannot see F-1's carry-forward at all |
| AD-11 | the database (tier 1 by construction) | a runtime constraint |
| AD-12 | controller guard per AD-27 (tier 1) | request time |
| AD-21 | type checking at the boundary (tier 1) | nothing — no Python type checker runs anywhere (D-6) |
| AD-27 | controller guards (tier 1) | request time |
| AD-28 | server-side rate limits (tier 1) | request time |
| AD-29 | storage bucket policy (tier 1 by construction) | runtime |
| AD-34 | controller guard on issued invoices (tier 1) | request time |

Tier 1 is the only tier in this document with **zero** genuine members, which is exactly what
`DEFERRED.md` D-5/D-6 report, and the spine's own Deferred section repeats. Relabelling runtime
enforcement as tier 1 makes the honesty scorecard read better than the codebase is. A database
constraint and a controller guard are strong — stronger than tier 3 — but they are outside this ladder,
and AD-21's is not enforcement at all.

**Fix:** as round 1 — "runtime, outside the ladder" for the eight real ones; AD-21 to tier 3, with its
rule tightened so it bites (the parameter must be a reference a Guest record cannot produce, not a
phone-number string).

### F-11 · MEDIUM-HIGH — AD-11's `resource` is polymorphic three ways and the shape is still unfixed `[STILL OPEN from round 1]` (A-13.1)

AD-11 now reads:

> **`resource` is the Space** where the Service has Spaces, and the **Listing** where it does not; for a
> rental-period Service it is the **inventory item**, which is a Space-like row of the same kind.

The rental clause contradicts the clause before it: a rental Service has no Spaces, so by the first
clause its resource is the Listing and by the third it is the inventory item. "A Space-like row of the
same kind" hints that inventory items *are* Space rows, which would resolve it — but AD-8 declares
has-Spaces per Service and a rental Service would then have to declare Spaces it does not have.

Under it, the column shape is still free. Frappe `name` values are unique per DocType, not globally, so
a single `resource` column over three parent DocTypes is not safe on its own; a Dynamic Link makes the
UNIQUE index five columns, not four, and AD-11 names four. The ERD models two parents
(`SPACE ||--o{ OCCUPANCY`, `LISTING ||--o{ OCCUPANCY`) and no inventory item at all, while labelling
the edge `unique(resource,day,slot,seat)`.

The revision fixed the sibling half of this finding well — the `all-day` sentinel with the MariaDB
NULL reasoning stated, and explicit "lead-time and no-duration create no rows". Credit for that. This
half is unmoved.

**Fix:** name the column set the index is over, and either make inventory item a Space or model it.

### F-12 · MEDIUM — The ERD hangs Enquiry off Selection, which FR-34 forbids `[NEW in round 3]`

*(closure adversarial H-6, still unmoved)*

`SELECTION ||--o{ ENQUIRY : "creator only"`.

FR-34: *"A Family can send **one Enquiry to several Listings** in a Service at once — the Shortlist she
is comparing"*, and *"The Lead Dashboard **distinguishes** an Enquiry sent to several Vendors from one
sent only to that Vendor"*, on which SM-2's counter-measure depends. An Enquiry is sent from a
**Shortlist**, before any Selection exists; FR-8 says a Shortlist contributes nothing to the budget
while a Selection contributes its price.

Parenting Enquiry to Selection forces five Selections for five shortlisted caterers, which posts five
caterers to the running budget — FR-8's named failure, arrived at from a different direction — and
leaves the multi-send distinction nowhere to live.

The ERD is seed, but this edge is a cardinality decision two units cannot choose independently, and it
is currently the wrong one.

**Fix:** `WEDDING`+`LISTING` parent the Enquiry, with a send-batch id carrying the multi-send fact.

### F-13 · MEDIUM — AD-32's breach clause is a requirement restated, not a rule `[NEW in round 3]`

AD-32's Rule ends: *"A personal-data breach is detectable and reportable within 72 hours."* Its
Enforced-by is *"schema review of any new personal-data field (tier 3)"*.

A schema review cannot produce detectability. Answering "who was affected" needs access logging over
personal-data reads, and the Conventions Logging row logs only *"every Admin action **changing**
standing, visibility, published content or account access"* — writes, not reads. Nothing in the spine
records who read what, and no incident record exists.

This is item 2 in its purest form: the sentence names an outcome, no rule produces it, and the
enforcement line cannot see it broken. Either the mechanism lands (read logging on personal-data
surfaces, an incident record) or the clause moves to Deferred with a trigger — it is currently neither
decided nor deferred.

### F-14 · MEDIUM — AD-27 presents an exhaustive list and two ADs cite it for rules it excludes `[NEW in round 3]`

*(closure ND-16, unmoved)*

AD-27's Rule enumerates with *"Named:"* — Agreement immutability, the two-different-accounts bar, the
conditions of listing, Review immutability, audit-entry permanence, and no platform-authored terms.

- AD-34: *"a correction is a credit note, never an edit **(AD-27)**"* — invoice immutability is not in
  the list.
- AD-33: a takedown *"is recorded per **AD-27**"* — takedown records are not in the list.

Both are correct in spirit and both point at an enumeration that excludes them, which is the
cross-reference failure mode the brief asks about: a reader implementing AD-27 from AD-27 builds five
controller guards and misses the two other ADs delegated to it.

**Fix:** two entries, or drop "Named:" and say the list is illustrative.

### F-15 · MEDIUM — AD-14 and AD-33 collide on guest data and AD-14 does not carry the precedence `[NEW in round 3]`

AD-33 states the winner for one collision: *"Removed content and its records are retained **180 days**
after removal, and where that collides with an erasure request, **retention wins**."*

AD-14 — the AD that owns the erase-versus-pseudonymise ladder and says *"NFR 5.5's precedence is
implemented here and **never re-derived**"* — was not amended. It still says: *"**Guest contact details
are erased outright** — … immediately when the Creator dismisses a guest-form submission."*

So a guest-form submission that is the subject of a grievance is erased immediately by AD-14 and
retained 180 days by AD-33, and AD-14 explicitly forbids re-deriving the precedence elsewhere — which
is precisely what AD-33 does. One of the two must move.

Related and unclosed: AD-33 keys the repeat-infringer register on AD-14's token, which AD-14 makes
*"stable per person"*. A removed infringer who erases and re-registers on the same number becomes a new
person record with a new token, so the register cannot link what it exists to link.

### F-16 · MEDIUM — NFR 5.10 is the one NFR with zero citations, and `packages/shared` carries no invariant `[NEW in round 3]`

Verified citation counts: NFR 5.1 ×3, 5.2 ×1, 5.3 ×3, 5.4 ×2, 5.5 ×7, 5.6 ×1, 5.7 ×2, 5.8 ×2, 5.9 ×2,
**5.10 ×0**.

NFR 5.10 carries two things that are exactly this altitude's business, and one of them is a hard
invariant:

- *"**One token in the palette is an accessibility decision, not an aesthetic one.** The muted text
  colour was deliberately darkened to meet contrast on white. **It must not be lightened**, whatever a
  future design pass prefers."* — a non-obvious constraint that a future unit will silently break, and
  the Accessibility Conventions row (colour-alone) does not cover it.
- The voice rule *"'vendor shows available', not 'available'"*, which AD-10 does carry.

`CLAUDE.md` §4 adds two more of the same kind: `tokens.js` is plain ESM **on purpose** and converting
it to `.ts` breaks both Tailwind configs; and the two apps run different Tailwind majors so config
syntax does not transfer. `packages/shared` is consumed by all three clients and the spine fixes exactly
one thing about it (generated zod, AD-4).

This is item 6: a dimension the initiative altitude owns, decided nowhere, deferred nowhere, and not in
"Not decided here, owned elsewhere" either.

**Fix:** one Conventions row — tokens.js is the single source for colour and type, stays `.js`, the
muted token is contrast-locked, Tailwind config does not transfer between the apps.

### F-17 · MEDIUM — Frappe mechanics are still restated, now in five ADs `[STILL OPEN from round 1]` (A-16)

Line 30: *"Frappe mechanics are owned by the six `frappe-*` skills — cited, never restated."* Three
restatements were flagged in round 1; none was removed and two more arrived:

- **AD-4** — *"Frappe validates them through Pydantic on every request and coerces"*. Still there, and
  still inaccurate in the way that matters: Frappe's typing validation applies to whitelisted method
  **arguments**; return annotations are not validated or coerced. AD-4's contract is "one
  request/response shape", so the generator's response half rests on a guarantee the framework does not
  give.
- **AD-16** — the `ignore_permissions`/row-cap/`db.*`-below-the-permission-layer paragraph.
- **AD-18** — *"Frappe commits only on POST/PUT/PATCH/DELETE, so a `GET` handler that writes has its
  writes rolled back, and CSRF is validated only on those verbs."*
- **AD-17** *(new)* — *"In v16.33 a share is OR-ed around the query conditions on the list path
  (`db_query.py`) and grants on the document path (`permissions.py`)"*. Version-pinned framework
  internals; it will be false at v17 and nothing here will notice.
- **AD-11** *(new)* — *"because MariaDB permits unlimited duplicate NULLs in a UNIQUE index and the
  constraint would silently never fire"*.

AD-11's is the most defensible (it justifies a non-obvious sentinel), but the count is going the wrong
way, and AD-15 remains the model: state the invariant, cite the skill, stop.

### F-18 · MEDIUM — AD-1 and AD-2 still claim to prevent business rules in clients, and neither rule can `[STILL OPEN from round 1]` (A-17)

- **AD-1 Prevents:** "business rules migrating into clients." **Rule:** import direction *inside the
  backend app*. It cannot express, let alone stop, logic appearing in a TypeScript client in a
  different repository.
- **AD-2 Prevents:** "business rules that are not permissions leaking into clients." **Rule:** no
  generic document API. A client calling a purpose-built method can reimplement any rule it likes on
  the response.

AD-19's "clients never do money arithmetic" remains the only rule in the spine that bites on this,
because it names a concrete forbidden operation. Either drop the claim from both Prevents lines or
generalise AD-19's shape.

### F-19 · MEDIUM — AD-24's gate cannot reach a third of its stated scope `[STILL OPEN from round 1]` (A-18.1)

AD-24: *"A pre-commit gate blocks [the banned words] across `apps/`, `packages/`, **the backend app**
and the root `.html` files."*

The spine's own Structural Seed says *"The backend is not in this repository… no Python, DocType JSON or
`hooks.py` is ever created here (`CLAUDE.md` §1)"*, and the source tree names `scripts/vocab-gate.sh`
in `vivsth/`. A pre-commit hook in this repo cannot scan a bench outside the tree — and the backend is
where the DocType and field names AD-24 most cares about actually live.

**Fix:** two gates, one per repo, or scope AD-24's gate to this repo and make the backend half a
Deferred entry with the hosting decision.

### F-20 · MEDIUM — Binds lists that do not match their Rules, and one that is now factually wrong `[NEW in round 3]`

*(closure ND-15; one entry got worse in this revision)*

- **AD-31 binds "AD-23's twelve jobs"** — AD-23 now ends *"Sixteen in total."* The cross-reference
  counts the wrong list, and it is the only Binds entry in the document that points at an AD rather
  than the spec.
- **AD-8 binds FR-71** — FR-71's required capabilities (headcount recommendation, named photographer,
  Stated Size sharing, no-demands declaration, site visit) appear nowhere in AD-8's Rule. FR-71 says
  they are *"configured with the Service, in the same act that defines its fields and filters"*; AD-5's
  Binds claims them as handler behaviour. The Conflicts table's AD-5/AD-6 row covers this in general
  terms, but AD-8 binds an FR its Rule does not touch.
- **AD-10 binds FR-34** (what an Enquiry carries — nothing in the Rule touches it) and omits **FR-53**,
  whose Grace Period rule the Rule implements.
- **AD-11** omits **FR-28**, the FR its Rule implements, and **FR-14**, whose Span-continuity sentence
  it quotes; it binds "occupancy rows", which is not a requirement.
- **AD-26** names FR-70, FR-59 and FR-71 inside its Rule and binds none of them.

### F-21 · LOW-MEDIUM — Terseness and ADs that are two decisions `[STILL OPEN from round 1]` (A-20)

8,087 words, 518 lines, 34 ADs. Dense rather than padded, and the growth bought real coverage — but it
is at the ceiling, and the round-1 tidy list is untouched:

- **`[ADOPTED]` still on AD-5's title.** No other AD carries a status tag.
- **AD-5's "Accepted cost" paragraph** still duplicates the Conflicts table row in substance. One is
  the record; the other belongs in `.memlog.md`.
- **AD-7** is still a restatement of UH-9, which `coding-standards.md` already owns as a MUST with a
  tier-2 gate. It fixes no divergence a compliant reading of UH-9 does not already fix; a Conventions
  line would do.
- **Really two decisions**, by their own titles: **AD-11** ("Concurrency is a database constraint, **and**
  capacity is part of it" — a uniqueness/resource-identity decision welded to a capacity/seat-allocation
  decision, in the spine's longest single Rule), **AD-17** (a `Wedding Member` data shape welded to a
  site-wide `disable_document_sharing` toggle that binds every DocType), **AD-24**, **AD-33**,
  **AD-34**. **AD-28** is six decisions in one Rule — identity, no-password, OTP parameters, federated
  linking, session lifetime, dual-role resolution and number recovery — and is the AD most likely to be
  read partially.
- **The no-mandate rule is stated three times** — AD-34's Rule, the Stack's unpinned list, the Conflicts
  table. The Conflicts row earns its place (it records a source contradiction); the Stack line
  duplicates the AD.

ID hygiene is clean: AD-1..AD-34 unique and gapless; every `UH-n` (1, 6, 7, 8, 9, 11, 12, 13, 14, 15,
16), `CL-n` (9, 10, 12) and `D-n` (1–6, 8) cited exists in its source and says what the spine says it
says; all `CLAUDE.md` §-citations now resolve correctly (round-1 A-19.3 closed).

### F-22 · LOW — Brownfield residue `[STILL OPEN from round 1]` (A-19)

1. **`api.mobile.v1` → `api/family/v1` is still not in the Conflicts table.** The old identifier is
   live on disk in `packages/shared/package.json`, `packages/shared/src/index.js`,
   `apps/mobile/src/mocks/catalog.ts` and `CLAUDE.md` §2, which carries it as the canonical example.
   The rename is right; it is a rename of a committed identifier and belongs beside the §6 noun-list
   row, not silently in a Conventions row.
2. **`apps/guest-web` still does not exist on disk** (only `mobile` and `vendor-web`), while the Stack
   table opens *"Client versions read from `package.json` on disk"*. One word ("new") fixes it.
3. **`DEFERRED.md` D-7 is now stale** — it says this spine *"still contains `{name}` and `{date}`
   placeholders and not one AD"*. The spine resolves D-3 and D-4 by name in AD-19; D-7 deserves the
   same courtesy.

### F-23 · LOW — The accessibility row asserts AA on a surface the product does not control `[NEW in round 3]`

Conventions: *"WCAG 2.1 AA on **all five surfaces**, the two public Guest pages included (NFR 5.8)."*
Per the spine's own `scope`, the fifth surface is **Frappe Desk**, whose conformance Vivah Spot does not
own. The honest form is four surfaces plus a Conflicts or Deferred line for Desk.

---

## B. Checklist walk

| # | Item | Round 1 | Round 3 |
|---|---|---|---|
| 1 | Fixes the real divergence points, misses none | FAIL | **FAIL** — F-2 (discoverability), F-3 (`User.name`), F-4 (Place), F-5 (Rules), F-8 (budget), F-11 (`resource`), F-12 (Enquiry parentage). Auth, Engagement Models, Agreement identity and the cascade seam are genuinely closed. |
| 2 | Every Rule enforceable and prevents its Prevents | FAIL | **FAIL** — F-1 (AD-8 carry-forward), F-6 (AD-26 commit boundary), F-7 (AD-30 vs AD-32), F-9 (AD-20 vs AD-29), F-10 (nine tier-1 claims), F-13 (AD-32 breach), F-18 (AD-1, AD-2) |
| 3 | Nothing under Deferred lets two units diverge | PASS | **PASS** — walked below |
| 4 | Ratifies rather than contradicts the brownfield | PASS w/ findings | **PASS with findings** — F-22; `CLAUDE.md` citations now all correct; F-10 undercuts the D-5/D-6 scorecard the spine otherwise reproduces faithfully |
| 5 | Covers prd.md 4.1–4.14 and NFR 5.1–5.10 | FAIL | **PASS with findings** — all fourteen groups now have a Capability-map row and an AD cluster; the gaps are substantive, not structural: 4.2 (F-8), 4.4/4.5 (F-4, F-5), 5.10 (F-16) |
| 6 | Every dimension decided, deferred, or an open question | FAIL | **PASS with findings** — the four round-1 silences (migrations, media, async/idempotency, observability) all landed. One dimension remains silent: design tokens / NFR 5.10 (F-16). Client-side draft survival under NFR 5.3 is implied by AD-31's server half and named by no owner. |
| 7 | Terse | PASS w/ findings | **PASS with findings** — F-17, F-21 |

### Item 3 — the Deferred section

Still the strongest part of the document, and the revision improved it: the hosting entry now carries the
Python/Node bench constraint as an argument for containerisation, observability is named rather than
skipped, and the "Findings not yet folded in" entry points at the review directory honestly rather than
pretending the tail is closed. Nothing under Deferred lets two units diverge.

Two notes, neither a finding:

- The **search seam** caveat from round 1 still applies and is still unstated: `search_listings()` is
  named as the one-file swap, but AD-22's ordering, AD-10's availability gate and F-2's predicate all
  live inside it. A swap relocates three.
- The **"Findings not yet folded in"** entry describes the round-2 tail as *"medium findings about
  FR-52's tax and invoice-numbering detail, per-AD `Binds` accuracy, and rules stated in two ADs at
  once"*. That undersells it: closure §1.3 lists five untouched adversarial HIGHs (Rules shape,
  Selection cardinality, Enquiry parentage, running budget, snapshot identity), four of which are
  findings in this report. Recording a tail is right; describing it as smaller than it is is not.

### Item 5 — where coverage is thin rather than absent

| Group | Round 3 |
|---|---|
| 4.1 Accounts & Access | **Yes**, minus F-3. AD-28 settles FR-1's four routes, OTP parameters, session lifetime and the dual-role question. |
| 4.2 Wedding Workspace | **Partial** — FR-8 has no owner (F-8); FR-7/FR-9/FR-10 are code-owned and fine |
| 4.3 Dates & Availability | **Yes** — AD-9/AD-10/AD-11 now cover all five Engagement Models, Spaces, the sentinel and capacity. Best-improved cluster. |
| 4.4 Discovery & Comparison | **Partial** — Featured band landed; Place shape missing (F-4) |
| 4.5 Vendor Listings | **Partial** — Rules and Preferred Vendors have no shape (F-5); FR-71's required capabilities float between AD-5 and AD-8 (F-20) |
| 4.6 Vendor Calendar | **Yes** |
| 4.7 Enquiries | **Partial** — ERD parentage contradicts FR-34's multi-send (F-12) |
| 4.8 Agreements | **Yes** — AD-12's abandonment of the amend flow plus AD-27's controller guards closes round 1's A-7 and A-8 cleanly |
| 4.9 Reviews | **Yes** |
| 4.10 Subscription & Billing | **Partial** — AD-34 lands the no-mandate and immutability rules; FR-52's per-financial-year reset, the 16-character ceiling and the no-gaps property are stated as prose, not as the database constraint AD-11 uses for the same class of problem |
| 4.11 Lead Dashboard | **Partial** — FR-34's multi-send distinction, on which SM-2 depends, has nowhere to live (F-12) |
| 4.12 Trust & Verification | **Yes** — AD-29 closes round 2's CDN bypass; AD-20's enumeration drift is F-9 |
| 4.13 Admin Console | **Yes** — AD-27 is the round-2 revision's best addition |
| 4.14 Real Weddings | **Yes** — AD-32's withdrawal propagation covers FR-66 |
| 5.1 / 5.2 / 5.6 / 5.7 / 5.9 | **Yes** |
| 5.3 Performance | **Partial** — AD-31 covers the server half of "work survives a lost connection"; client draft persistence has no owner |
| 5.4 Availability | **Deferred**, correctly, with observability named |
| 5.5 Data protection | **Yes**, minus F-3 and F-15 |
| 5.8 Accessibility | **Yes**, minus F-23 |
| 5.10 Identity and voice | **No** — F-16 |

---

## C. Round-1 closure ledger

| Round-1 finding | Sev | Status | Where |
|---|---|---|---|
| A-1 Auth/session silent | CRITICAL | **Closed** | AD-28 |
| A-2 Two of five Engagement Models | CRITICAL | **Closed** | AD-9/AD-10/AD-11 |
| A-3 AD-8's list ≠ FR-62's list | CRITICAL | **Closed** — new gap in its place | AD-8 / F-1 |
| A-4 Conflicts row understates AD-6 | HIGH | **Closed** | Conflicts table |
| A-5 Discoverability predicate split | HIGH | **Open — worse** | F-2 |
| A-6 `User.name` / identity trail | HIGH | **Open** | F-3 |
| A-7 AD-12 leaves the Desk path open | HIGH | **Closed** | AD-12 + AD-27 |
| A-8 Agreement identity across Amendment | HIGH | **Closed** | AD-12 |
| A-9 Four silent dimensions | HIGH | **Closed** | AD-29, AD-31, Conventions, Deferred |
| A-10 Place hierarchy | HIGH | **Open** | F-4 |
| A-11 Engagement cascade seam | MED-HIGH | **Closed**, minus the commit boundary | AD-26 / F-6 |
| A-12 Two wrong tier claims | MED-HIGH | **Open — worse (9)** | F-10 |
| A-13 AD-11's two under-specified halves | MED-HIGH | **Half closed** (sentinel), half open | F-11 |
| A-14 AD-23 short by two | MED | **Closed** (16 enumerated) | AD-23 |
| A-15 Featured band; seed carrier | MED | **Closed** (band); seed carrier still not client-vs-server | AD-22 |
| A-16 Frappe mechanics restated | MED | **Open — worse (5)** | F-17 |
| A-17 AD-1/AD-2 Prevents | MED | **Open** | F-18 |
| A-18.1 AD-24 backend scope | MED | **Open** | F-19 |
| A-18.2 Razorpay ambiguity | MED | **Closed** (over-closed — stated 3×) | AD-34 / F-21 |
| A-19.1 `api.mobile.v1` rename | LOW | **Open** | F-22 |
| A-19.2 `guest-web` not on disk | LOW | **Open** | F-22 |
| A-19.3 `CLAUDE.md` §1 miscitation | LOW | **Closed** | — |
| A-20 Tidy list | LOW | **Mostly open** | F-21 |

**9 closed · 2 half · 8 open · 7 new findings.**

---

## D. Minimum to reach PASS

1. **F-1** — say whether a Listing reads its Service's declarations live or froze them at creation, and
   where the snapshot lives. Nothing in AD-10 or AD-11 is deterministic until this is answered.
2. **F-2** — one `is_discoverable(listing)`; AD-10, AD-20, AD-27, AD-29 cite it instead of restating
   their clause.
3. **F-3** — one sentence in AD-28 on `User.name`, one clause in AD-14 on the Frappe-owned tables.
4. **F-4 / F-5 / F-8 / F-12** — four shape decisions the spine has now deferred three times: Place
   representation, Rule structure + Preferred Vendor association, the budget's single writer, and
   Enquiry parentage. Each is one line plus an ERD node.
5. **F-6 / F-7 / F-9** — three sentences: AD-26's commit boundary, AD-30's carve-out for AD-32's
   surface, AD-20 stops enumerating the composite predicate.
6. **F-10** — relabel nine "tier 1" claims as runtime, and fix AD-21's rule so it bites.
7. **F-16** — one Conventions row for `packages/shared`'s token contract, so NFR 5.10 is cited
   somewhere.
8. Editing pass: **F-13, F-14, F-15, F-17, F-18, F-19, F-20, F-21, F-22, F-23.**

## E. What the revision got right

Worth recording, because the next pass should not disturb it.

- **AD-12's abandonment of Frappe's cancel-and-amend flow.** It kills round 2's slot-release race by
  removing the step that causes it, rather than guarding it. The cleanest fix in either revision.
- **AD-27.** The insight that Frappe Desk sits on the DocTypes and therefore that any rule which must
  bind Admin belongs in the controller is the single most valuable thing added since round 1, and the
  Design Paradigm now states the cost of the Desk shortcut instead of selling it as free.
- **AD-10's Engagement Model table.** Five models, one dispatch, per-Space evaluation, no cache, and the
  attributed-signal rule restored with "never a boolean a caller can relabel" — stronger than the
  clause round 2 deleted.
- **AD-11's `all-day` sentinel**, with the MariaDB reason stated so nobody "simplifies" it back to NULL,
  and the seat retry that turns a lost race into the next free seat rather than a declined wedding.
- **AD-26's `doc_events` resolution.** Letting the controller emit its ordinary lifecycle event and
  binding it in `hooks.py` gives Desk a legal route to the cascade without a single upward import. It
  answers round 2's CRITICAL exactly, and AD-1 should name the same entry point for symmetry.
- **AD-29's promotion/demotion as object movement**, with the reason ("a flag does not stop a
  court-ordered image being served from cache") that stops the cheap implementation.
- **The Conflicts table and the Deferred section**, still the reason the rest of the document is
  trustworthy.
