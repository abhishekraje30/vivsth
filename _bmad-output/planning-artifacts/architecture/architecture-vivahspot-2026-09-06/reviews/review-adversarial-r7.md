---
review: adversarial
round: 7
target: ARCHITECTURE-SPINE.md (architecture-vivahspot-2026-09-06)
driving_spec: prds/prd-vivahspot-2026-09-03/prd.md
reviewed_against:
  - reviews/review-adversarial-r6.md (round 6, 7 critical / 18 high / 15 medium / 4 low)
  - reviews/review-adversarial-r5.md, -r4.md, -r3.md, review-closure.md, review-adversarial.md
reviewer_lens: 'adversarial — two units one level down that each obey every AD to the letter and still build incompatibly'
frappe_claims_verified_against: '/home/abhishekraje30/frappe-bench/apps/frappe @ __version__ 16.33.0'
date: 2026-09-06
method_under_test: 'two structural simplifications — uniform transition-row invocation, and bypass-by-argument'
spine_size: '13,551 words (10,568 at r4, +28%)'
verdict: 'CHANGES REQUIRED — 7 critical, 14 high, 13 medium, 4 low. Closure is the best of seven rounds by a wide margin: 19 of 25 fully closed, 6 partially, ZERO not closed, and zero criticals left open. The delete step worked. The neighbour step was not run, and the two structural simplifications were not traced past their own paragraph. All seven new criticals are defects in round-7 material — but unlike round 6 they are not seven independent gaps: SIX OF SEVEN trace to exactly two sentences (AD-26 line 286, the row-shape sentence; and the has_value_changed binding in the table). The count did not fall; the blast radius collapsed from seven places to two.'
---

# Adversarial Review, Round 7 — Architecture Spine, Vivah Spot

## Method

Unchanged. For each area, construct two units one level down — two epics, two dev agents six weeks
apart — that **each obey every AD to the letter** and still produce something that cannot be
assembled.

Every finding is marked **[STILL OPEN from r6]** or **[NEW in r7]**.

**Frappe mechanics re-verified against source this round, not carried.** Bench at
`/home/abhishekraje30/frappe-bench/apps/frappe`, `__version__ = "16.33.0"`.

Three verifications were run because round-7 material depends on them, and one of the three
**falsifies a load-bearing claim**:

1. **`has_value_changed` returns `True` on insert.** `document.py:699-706`:

   ```python
   def has_value_changed(self, fieldname):
       previous = self.get_doc_before_save()
       if not previous:
           return True
   ```

   And `get_doc_before_save` (`:696-697`) returns `self._doc_before_save`, which
   `load_doc_before_save` (`:1423-1429`) sets to `None` and returns early from **when the document
   is new**. This is C7-2 and it is fatal to three of the six new bindings.

2. **`on_update` runs on the insert path.** `insert()` calls `check_if_latest()` (`:477`), which
   sets `self._action = "save"` when unset (`:1099-1100`), and then calls `run_post_save_methods()`
   (`:513`), which runs `on_update` for `_action == "save"` (`:1453-1454`). There is no separate
   action value for an insert. So "`on_update` guarded by `has_value_changed`" fires, with the guard
   returning `True`, on every document creation.

3. **`check_if_latest` still raises where AD-19 says it would.** `:1108-1113` compares
   `previous.modified` against `self._original_modified` and raises `TimestampMismatchError`. AD-19's
   stated reason for choosing a field update over `doc.save()` is accurate. Its stated *consequence*
   is not (H7-6).

---

## 0. Did the two structural simplifications work?

**The delete step worked, and it is the reason this is the best closure round of seven.** Round 6's
diagnosis was that the verbatim method "has no *delete* step — it inserts a correct sentence and
leaves the incorrect one standing." This round the superseded sentences were actually removed:
AD-11's *"One seat for the whole closure"* is gone (C6-2), AD-26's *"the after-commit effect"* is
gone (C6-4), AD-36's three-way contradiction collapsed to two named predicates (C6-7), AD-16's
`C5-2` review-report identifier is gone (H6-12), AD-19 lost the false no-collision claim (C6-5).
**Zero findings are NOT CLOSED for the first time in seven rounds**, and the four criticals round 6
called "one-clause repairs" are all four repaired.

**The neighbour step was not run, and it is the reason there are still seven criticals.** Round 6
prescribed two steps. Step 1 (delete what you replace) was applied. Step 2 — *"after the pass, each
amended AD is read end to end against every AD it names"* — was not, and the proof is C7-6: AD-20
line 236 correctly deletes discoverability as a term of image visibility, and AD-26 line 311, edited
in the same pass, says *"re-entry restores discoverability **and image visibility** by the same
cascade."* One sequential read of the two ADs finds it. This is verbatim the round-6 failure mode,
recurring.

**On the structural simplifications themselves the result splits.**

**Uniform row invocation: the right idea, wired to the wrong predicate.** Making all six cascades
row-invoked genuinely closed H6-1, H6-2, H6-3, H6-4 and H6-13 in one move — five highs for one
structural decision, which is the best trade in the series. But the binding chosen for cascades 1, 5
and 6 is a bare `has_value_changed`, and `has_value_changed` does not mean "changed" on the insert
path (C7-2). Note precisely which cascade escapes: **cascade 4 is the only one that does not use a
bare predicate** — it routes through `recompute_discoverable`'s compare-and-return, which cannot fire
on an insert because the computed and stored flags agree. Round 7 made 1, 5 and 6 *look* like 4
without giving them 4's guard.

**Bypass by argument: correct about leaking, silent about reaching.** `bypass=True` cannot leak,
which was H6-11's defect and is closed. What the AD does not say is the price: **an argument cannot
cross a stack frame you do not own**, and round 7's other change inserted Frappe's own document
machinery directly into the cascade-5 → cascade-4 path. The two simplifications interact, and neither
paragraph mentions the other (C7-4).

**One thing genuinely and permanently better.** Six of the seven criticals live in **two sentences** —
AD-26 line 286 (C7-1, C7-3, C7-5) and the `has_value_changed` binding in the cascade table (C7-2,
C7-4, C7-7). Round 6's seven criticals were in six different ADs. This is two decisions to make, not
seven.

---

## 1. Part 1 — closure of C6-1..C6-7 and H6-1..H6-18

**Counts: 19 CLOSED · 6 PARTIALLY CLOSED · 0 NOT CLOSED.**
Criticals: 4 closed, 3 partially, 0 open. Highs: 15 closed, 3 partially, 0 open.

For comparison: r6 was 13 closed / 10 partially / 1 open of 24; r5 was 13 of 43.

Judged on whether the *named defect* is gone. Where the fix introduced a new one, that is a Part 2
finding, not a re-opening.

### C6-1 — AD-20's fourth term demotes the whole portfolio on lapse — **PARTIALLY CLOSED**

The lapse half landed, and landed well. AD-20 line 236 now:

> **`is_publicly_visible(image)` is the only statement of image visibility** … three terms:
> **verified**, **within the Tier's allowance**, and **not under takedown** (AD-33).
> **Discoverability is deliberately not a term**: a lapsed Listing stops being found, but FR-53 keeps
> its open Enquiry threads answerable and promises the portfolio "reappears intact on renewal", so
> moving every object off the CDN on lapse would destroy what the Vendor is told is retained.

FR-53's promise is safe and the AD-20/AD-35 contradiction is gone.

**What was dropped rather than answered.** The r6 tightening said in terms: *"Withdrawal, Admin
removal and takedown should demote. **Lapse should not**."* The spine deleted the listing term
**entirely**, so AD-20's own stated concern — its round-6 justification read *"without the last,
images of a Listing withdrawn, Admin-removed or lapsed past its Grace Period stay served from the
public CDN"* — is now unanswered for two of its three cases. **A Vendor removed by Admin for fraud
(FR-60) keeps his entire portfolio on the public CDN, permanently, at a URL that never expires.** The
PRD draws exactly this distinction and the spine now erases it — FR-60: *"This is the one route out
of discovery that does not inherit the uniform rule at the end of FR-53: that rule rests on 'a Vendor
who lapses still owes the weddings they took', which is true of a late payer and **false of a
fraud**."* See H7-1.

### C6-2 — AD-11 states both seat models in one paragraph — **CLOSED**

Line 153 now opens *"**Written in one transaction, nothing written on decline.**"* The contradicting
clause is deleted, exactly as the tightening asked. The cheapest critical in seven rounds, and it is
shut.

### C6-3 — a Vendor block occupies one seat, so at capacity ≥ 2 it blocks nothing — **PARTIALLY CLOSED**

The **read** is fixed, in both ADs. AD-11 line 151:

> **A Vendor's block is not a seat: it makes the whole `(resource, day, slot)` unavailable regardless
> of `concurrent_capacity`.**

AD-10 line 130:

> **"Free" means no Vendor block, and seats not exhausted** — `no vendor block on (resource, day,
> slot)` **and** `count(agreement-held rows) < concurrent_capacity` …

Both halves of C6-3's demonstration are answered on the availability path: the block is excluded from
the seat count, and its presence alone makes the row unavailable.

**The write is not fixed, and AD-11's enforcement claim is now false for the block case.** The block
is still an **occupancy row** — *"every row carries `held_by`, typed as `Agreement` **or** `Vendor
Block`"*, and the ERD carries `VENDOR_BLOCK ||--o{ OCCUPANCY : "held_by — FR-28, whole row"`. Every
occupancy row has a `seat` in `0..concurrent_capacity-1` and the unique index is over
`(resource, day, slot, seat)`. **A unique index over four columns cannot express "this row blocks all
seats."** So AD-11's *"Enforced by: **the database** — a unique index, which no code path can talk
past"* is true for Agreement-vs-Agreement and **false for Agreement-vs-block**: nothing at the
database layer stops an Agreement inserting at seat 1 on a blocked row. The r6 tightening's
`seats_blocked` column was declined without argument, and declining it also makes a partial block —
withdraw one crew, keep selling the other — inexpressible, which is unit B's cost that r6 named. See
H7-4.

### C6-4 — the outbox and the render carve-out cannot both hold — **CLOSED**

Line 307 now:

> the bytes and their digest are written as row data, and the object-store write of those bytes is
> **an outbox row like any other effect**. A rollback discards the buffer with the row. **FR-40's
> download is served from the row until the outbox has dispatched**, so there is no window in which
> an Agreement exists with no retrievable document.

(a) closed — no window. (c) closed — the row is the authoritative copy, so a permanently failed
dispatch cannot leave a chain verifying over bytes nobody holds. (b) is a residual: it is still not
stated whether the outbox row carries the payload or a reference to the `Agreement Record` row, and
under the first reading the multi-megabyte blob is row data twice in a polled table. See M7-2.

### C6-5 — moving the budget relocates the race; AD-19 asserts it removes it — **PARTIALLY CLOSED**

The false claim is gone. Line 229 no longer says a collision cannot happen; it says:

> It is written as a **field update, not a document save**, because `check_if_latest`
> (`document.py:1088`) would otherwise raise `TimestampMismatchError` into one of two Vendors
> confirming into the same Wedding … Last write wins, and that is **correct rather than tolerated**:
> the total is derived, every writer computes it from committed state, so a lost update is re-derived
> by the next recompute and by AD-23's reconciliation sweep.

That is an honest answer where r5 had silence and r6 had a denial, and the mechanism is right — a
field update raises no `TimestampMismatchError` because it never calls `check_if_latest`.

**The justification does not hold, on two counts.** *"Every writer computes it from committed state"*
does not make last-write-wins correct: the read and the write are not serialised, so worker A reading
before B's Agreement commits and writing after B has committed leaves a total that is **permanently**
missing a confirmed Agreement's cost. And the two stated repairs are not available — *"the next
recompute"* may never come (a Family who has finished selecting never triggers one), and **AD-23's
reconciliation sweep does not exist in AD-23** (H7-6). See H7-6.

### C6-6 — cascade 4's controller assertion is unassertable — **CLOSED**

Line 286 replaced the delta assertion with a state assertion, and says why:

> for a `Listing Condition Change`, that the row's stated `from`/`to` direction matches the flag
> transition `recompute_discoverable` wrote in the same transaction — asserting "`is_discoverable`
> has changed" is unassertable, because AD-35's compare-and-return guarantees flag and predicate
> already agree by the time the row exists

The named defect — an assertion that either always passes or always fails — is gone. Residual: the
`to` half is checkable against the stored flag and the **`from` half is not** (the previous value was
overwritten in the same transaction and the Listing's in-flight `_doc_before_save` is not reachable
from the row's controller), and the spine does not say the Listing's controller sources `from` from
`get_doc_before_save()`. On a Listing insert there is no `_doc_before_save` at all (C7-2). See M7-3.

### C6-7 — AD-36 states three mutually incompatible coverage rules — **CLOSED**

Line 414 now names two predicates and gives each one job:

> **`covers(area, place)`** is FR-33's question — will he come to mine? — and is **ancestor-or-self
> only**: the area's `lft`/`rgt` span contains the Place's, so a Vendor declaring "Ahmednagar
> district" serves every town within it and one declaring a town does not serve the district. This is
> the test used for matching, Enquiry and every Agreement. **`within(place, subtree)`** is the
> browsing question … It is a **discovery convenience only** and is never the coverage test.

All three round-6 statements now agree: the range comparison, the prose and the stated exception are
one rule. H5-10's "she sees zero venues" is answered for browsing.

**The asymmetry the tightening asked for was declined**, and the consequence moved from search to
Enquiry rather than disappearing. See H7-2.

---

### H6-1 — "written by exactly one layer per trigger, named in the table", and the table named none — **CLOSED**

Every row now names a writer, and cascade 4's three writers collapsed to one:

> | 4 · A Listing **enters or leaves** discovery (FR-53, FR-59) | `Listing Condition Change` row —
> written by the **`Listing` controller** whenever `recompute_discoverable` changes the flag, **and by
> nothing else**; the lapse job and the Service fan-out act by calling `recompute_discoverable` |

Routing every route through one function is the correct shape and it kills both duplicate-notification
paths r5 and r6 demonstrated.

### H6-2 — the uniqueness tuple is vacuous or redundant, and nothing says which — **CLOSED**

The ambiguity is resolved: *"**the key is derived from the transition, never generated per
invocation**"*. Something now says which. **The branch chosen is the broken one** (C7-1), and its two
worked examples contradict each other, but that is a Part 2 finding.

### H6-3 — half the cascades have no transition row — **CLOSED**

Line 299: *"**Every cascade is invoked by a transition row — all six, with no exceptions**, so the
shape below governs uniformly and AD-31's idempotency reaches the two most destructive operations in
the system."* This is the round's best structural move.

### H6-4 — the row carries a direction and nothing consumes one of its values — **CLOSED**

Cascade 4's table row is now *"A Listing **enters or leaves** discovery (FR-53, FR-59)"* and line 311
states the consumption: *"**The row's direction is consumed, not decorative:** … re-entry restores
discoverability and image visibility by the same cascade. Re-entry notifies nobody — a Family already
told the Listing was gone has moved on."* The re-entry semantics are decided and justified. The
*"image visibility"* clause is C7-6, and line 309's list still says *"a Listing **leaving**
discovery"* only (M7-1).

### H6-5 — AD-13's derived count is underivable from the records it derives from — **PARTIALLY CLOSED**

The data now exists: the `Cancellation` row *"**also carries its cause**, because AD-13 must tell an
FR-17 date move (counted) from a Family ending an Agreement with a removed Vendor (FR-60, explicitly
not counted against her), and the two are otherwise identical rows."* The column is named and
justified. **Nothing sets it** — the row is written by the `Agreement` controller in `on_cancel`,
which does not know why, and **M5-4 [STILL OPEN, fifth round]** is the missing channel. See C7-5.

### H6-6 — `Listing` binding `recompute_budget` is an unbounded cross-Wedding fan-out — **CLOSED**

Line 229: *"**`Listing` is deliberately not an invoker:** a Selection stores the price at the moment
the Family picked it (FR-8), so a Vendor raising his per-head rate does not silently re-price weddings
already planned."* This is the right answer and it is grounded in FR-8 rather than in the mechanics.
**M5-9's eighth cascade candidate is withdrawn with it.**

### H6-7 — the budget document exists only in one clause — **CLOSED**

`Wedding Budget` is named (line 229), in the ERD (`WEDDING ||--|| WEDDING_BUDGET`, line 521), in
AD-24's mechanism-record list (line 266), and in the Capability map (4.2: *"`Wedding` + children,
`Wedding Budget`"*). All four asks answered in one pass.

### H6-8 — AD-19 lost "never overwrites them" — **CLOSED**

Line 229: *"an **adjustment is an override column on the `Selection`** which the function reads *in
place of* the derived figure rather than recomputing over it, and an **addition appends** a cost the
platform knows nothing about, which the function includes and never overwrites. **Both are sticky**:
FR-8 says every automatic figure is usable as-is, which means a figure she corrected stays
corrected."* Third flip of this field, and the first time both halves hold at once. The r6 tightening's
exact wording ("an override column on the `Selection`") was used.

### H6-9 — bidirectional coverage makes AD-22's shrinkage population heterogeneous — **CLOSED**

Two fixes. AD-36's descendant half is gone from `covers()`, and AD-22 line 250 gained the rule and the
ladder: *"rating shrunk toward the average for that Service **at the Listing's own Place level** — a
result set spanning levels shrinks each Listing toward its own level's population, and where none
exists FR-20's ladder applies (the Service across all Places, then the platform, then the remaining
signals alone)."* **M5-13 CLOSED with it** — AD-22 now carries the ladder a ranking builder reads.
Residual: the branch chosen means a town-level and a district-level Listing in one `within()` result
set are shrunk toward different populations and their scores are not comparable; the spine picks the
branch without naming the cost (M7-5).

### H6-10 — the acceptance-time permitted set has no artefact — **CLOSED**

Cascade 2's table row: *"Its **input** is the `Rule Acceptance` row, written *at acceptance* with the
set the Family was shown."* The storage exists and the two-sided comparison H5-12 needs is now
possible. **Nothing says who writes it, and its stated assertion cannot hold at acceptance** — C7-3.

### H6-11 — "scoped to the cascade operation" names no mechanism, and the only mechanism leaks — **CLOSED**

Line 204: *"**The bypass travels as an explicit argument, never as ambient state.** A cascade passes
`bypass=True` down its own call chain, so it reaches the notification path and cannot leak."* The r6
alternative was adopted verbatim and the leak is structurally impossible. **M5-5 [STILL OPEN]** is
now narrower — it only governs AD-26's re-entrancy guard, not AD-16.

### H6-12 — the spine cites a review-report identifier and a superseded mechanism — **PARTIALLY CLOSED**

`C5-2` is gone. The **argument was not**: line 204 still reads *"Scoping it by module location instead
would leave FR-53's notification resolving nothing one function below `domain/`, and **the outbox
dispatcher (AD-26) runs further away still**."* The superseded mechanism was swapped for the current
one and the sentence kept — but the outbox dispatcher is a **scheduled job in another process**, which
is (a) the one place an argument provably cannot reach, so it argues for argument-scoping with an
example argument-scoping does not cover, and (b) AD-16's own row 2 (system work → `frappe.get_all`
with a comment), so it needs no bypass at all. The clause is now wrong in a new way. See H7-3.

### H6-13 — AD-23 says every job raises a transition row; three cascades have no row — **CLOSED**

All six cascades have rows, and cascade 6's is written by the `Wedding` controller under
`has_value_changed("state")`, so the FR-72 job saves a document and the controller raises the row.
AD-23's rule and AD-26's model agree for the first time. (The `db_set` branch that concluded a Wedding
with no cascade at all is unreachable.)

### H6-14 — the derived hold's scope is an undecidable noun — **CLOSED**

AD-33 line 382: *"A hold on a record places a **derived hold on the parties to that record and on
anyone named in its frozen terms** — decidable by inspection rather than by judging evidential value,
which is the undecidable noun AD-27's procedure exists to replace."* Structural, enumerable from the
ERD, and it names the procedure it is obeying. Exactly the r6 ask.

### H6-15 — the outbox is not modelled anywhere — **PARTIALLY CLOSED**

Named (`Cascade Outbox`, AD-24 line 266) and in the ERD (line 544). Still missing: **it is not in
AD-23's roster**, which still reads *"**Four** exist only because this spine created them"* and names
AD-33's purge, AD-12's verification sweep, AD-12's retention expiry and AD-30's link expiry. AD-26
says the effects are *"dispatched by an AD-23 job"*; AD-23 does not know about it. That is verbatim
the failure AD-23 exists to prevent. `N` in *"has not dispatched after N attempts"* is still
undefined, and the outbox row still has no AD-27 classification. See H7-6, which now covers two
missing jobs.

### H6-16 — a court-ordered takedown publishes a previously unpublished image — **CLOSED**

AD-20 line 236: *"**a takedown leaves its gap rather than promoting an image nobody chose to
publish** — a court order must not cause a publication."* The branch was chosen deliberately and
justified in one clause. Correct.

### H6-17 — `held_by` has no type and the ERD models half of it — **CLOSED**

*"typed as `Agreement` **or** `Vendor Block` and never a bare id"*, and the ERD gained
`VENDOR_BLOCK ||--o{ OCCUPANCY`. Residual (Low): a Dynamic Link and two nullable FK columns both
satisfy "typed as A or B", and AD-12's *"cancellation deletes the rows held by that Agreement"* reads
naturally under either.

### H6-18 — the Capability map names `Listing Rule` after AD-36 moved Rules to the Space — **CLOSED**

Line 600: *"`Place` tree; **`Space Rule`** (or `Listing Rule` where the Service has no Spaces)"*. The
map now says what AD-36 says. Neither name is in the ERD (M7-8).

---

## 2. Part 2 — new defects

### C7-1 — the derived idempotency key makes a *legitimate repeat* of a transition a database error, and FR-17, FR-53 and FR-59 all require repetition **[NEW in r7]**

**ADs in play:** AD-26, AD-31, AD-35; FR-17, FR-53, FR-59, FR-70.

Line 286, the round-7 resolution of H6-2:

> A transition row names the entity, the transition **and its direction**, is unique on
> `(entity, transition, direction, idempotency key)` — and **the key is derived from the transition,
> never generated per invocation** (`agreement + docstatus 2`; `listing + before/after flag + the
> source event's id`), so the constraint is a genuine dedup and a double write is a database error
> rather than a duplicate notification …

**A second legitimate occurrence and a double write are the same row.** The constraint cannot tell
them apart, because a key derived from the transition is by construction identical for both.

`agreement + docstatus 2` is safe only because an Agreement is cancelled once. **Four of the six
cascades have transitions the PRD requires to recur:**

- **FR-17, cascade 1.** *"The Family can change the Chosen Block **at any time**."* She has up to five
  Candidate Blocks. She moves B1→B2, then B2→B1, then B1→B2 again. The third move's derived key is
  the first move's key. **The row insert raises a duplicate-key error, cascade 1 never runs, and every
  Agreement confirmed against B1 survives a move away from B1** — against FR-17's opening line,
  *"Nothing agreed against the old days survives the move."* Her photographer is held on days her
  wedding has left, she believes she is covered, and the Vendor's Slots are consumed for a wedding
  that is not happening.
- **FR-53 and FR-59, cascade 4.** FR-53 has four routes out of discovery and FR-59 says a Listing
  *"stops being discoverable **until it does again**."* Every exit derives the same
  `listing + true→false` key. A Vendor withdraws his Listing (FR-70), re-publishes it, and eleven
  months later his Subscription lapses past its Grace Period. **The second exit's row is rejected, no
  cascade runs, and no Family holding that Listing is told** — against the sentence AD-26's own
  *Prevents* clause quotes: *"No route removes a Listing from a Family's view without telling them."*
  With annual Subscriptions the lapse/renew cycle guarantees this by year two for every Vendor on the
  platform.
- **FR-60, cascade 5, and FR-72, cascade 6** are once-per-entity in practice and survive.

**The two worked examples in the same parenthesis contradict each other.** `agreement + docstatus 2`
is pure state and contains no event identifier. `listing + before/after flag + **the source event's
id**` contains one — which is neither "derived from the transition" nor stable across two writers, and
it is not threaded anywhere: the Listing's controller is reached through
`recompute_discoverable` → `doc.save()` → Frappe's `run_post_save_methods`, and nothing carries a
source-event id across that. Both branches fail:

| If the key includes a source-event id | If it does not |
| --- | --- |
| Repetition works; **dedup is gone** — two writers produce two ids, two rows, two cascade runs. H6-1's double notification returns. | Dedup works; **repetition is a database error** — FR-17's third move and FR-53's second route are silent. |

**Tightening.**

> The uniqueness tuple is `(entity, transition, direction, idempotency key)` where the key is derived
> from **the transition and the instant it occurred** — for a `Cancellation`,
> `agreement + docstatus 2` (which can occur once); for a repeatable transition,
> `entity + from + to + the source document's `modified` timestamp`, which is identical for two
> writers racing on the same change and different for two genuine occurrences a month apart. A
> transition that can recur must have a key that recurs with it; a key derived from state alone can
> only serve a transition that happens once, and only two of six do.

### C7-2 — `has_value_changed` returns `True` on insert, so creating a Wedding or a Vendor fires cascades 1, 5 and 6 **[NEW in r7]**

**ADs in play:** AD-26, AD-27, AD-31, AD-35; FR-60, FR-72, FR-17.

Verified against source, twice, because the whole uniform-invocation change rests on it.

`document.py:699-706`:

```python
def has_value_changed(self, fieldname):
    previous = self.get_doc_before_save()
    if not previous:
        return True
```

`document.py:1423-1429`:

```python
def load_doc_before_save(self, *, raise_exception: bool = False):
    self._doc_before_save = None
    if self.is_new():
        return
```

And `on_update` runs on the insert path: `insert()` → `check_if_latest()` sets `_action = "save"`
(`:1099-1100`) → `run_post_save_methods()` (`:513`) → `run_method("on_update")` (`:1453-1454`).

**So on every insert, `has_value_changed(anything)` is `True` and `on_update` fires.** Three of the
six bindings the spine added this round are bare `has_value_changed`:

| Cascade | Binding | What runs when the document is *created* |
| --- | --- | --- |
| 1 | `Wedding.on_update` + `has_value_changed("chosen_block")` | `Block Change` row → cascade 1 → *"cancel every Agreement pointing at the old Block"*, where "old Block" does not exist |
| 5 | `Vendor.on_update` + `has_value_changed("removed")` | `Vendor Removal` row → cascade 5 → composes 5→4 per Listing |
| 6 | `Wedding.on_update` + `has_value_changed("state")` | `Wedding State Change` row → cascade 6 → composes 6→3, *"cancels its Agreements, releases the Slots, erases the Guest list, kills every public link"* (FR-72) |

FR-72 makes the last one concrete: *"A Wedding is **in planning** from creation."* The field is
populated at insert, so `has_value_changed("state")` is `True`, and **every Wedding ever created
raises the cascade whose job is to end it.**

**The honest limit, stated because an adversarial finding that overstates is worthless:** a
newly-created Wedding has no Agreements, no Guests and no links, and a newly-created Vendor has no
Listings and no Families — so the *fan-out* is empty and no user sees anything today. The defect is
not the blast radius, it is that **the spine's stated guard does not do what the spine says it
does**, in the AD whose entire round-7 claim is uniformity:

> Where the trigger *is* a document change, the controller writes the row under a
> `has_value_changed` predicate; a bare `on_update` is not the transition, and **without the predicate
> every Wedding save would cancel every Agreement in the Wedding.**

The predicate is presented as the whole guard. It is not a guard at all on one of the two paths
`on_update` takes. Three concrete consequences today:

1. **Every Wedding and every Vendor carries a spurious transition row from birth**, with a null
   `from`, dispatching outbox rows and consuming a guard key. AD-27's question 1 makes those rows
   append-only, so they cannot be cleaned up.
2. **The row's direction assertion has nothing to assert.** C6-6's fix requires the row's stated
   `from`/`to` to match a real flag transition. On insert there is no `from`, and
   `get_doc_before_save()` is `None`.
3. **A Wedding or Vendor created by a migration, a bulk import or a Desk paste that already carries
   dependents** — the exact shape of any data-migration patch under AD-8's *"treat a change to a
   behaviour declaration on a Service that already has Listings as a data migration"* — fires cascade
   6 on a live Wedding and cascade 5 on a Vendor with Listings, at full fan-out.

**Note which cascade escapes and why.** Cascade 4 is the only one that does not bind a bare predicate:
its row is written *"whenever `recompute_discoverable` changes the flag"*, and AD-35's
compare-and-return cannot fire on an insert because the computed and stored flags agree. **The one
cascade with a real transition test is the one immune to this.** Round 7 made 1, 5 and 6 look uniform
with 4 without giving them 4's test.

**Tightening.**

> A field-transition binding is `not doc.is_new() and doc.has_value_changed(field)`. State the reason
> in the AD, because it is not obvious and it is the load-bearing half of the uniformity claim:
> `has_value_changed` returns `True` when there is no prior document (`document.py:705-706`), and
> `on_update` runs on the insert path (`:1453-1454`), so an unqualified predicate makes every
> document creation a transition. Better still, follow cascade 4: bind a **compare function** that
> reads current state and the stored flag and returns without writing when they agree, so an insert
> is structurally incapable of producing a row.

### C7-3 — nothing writes the `Rule Acceptance` row, and the assertion it must pass cannot be true at acceptance **[NEW in r7]**

**ADs in play:** AD-26, AD-36, AD-18; FR-32, FR-25.

`Rule Acceptance` appears three times in the spine and the three do not compose.

AD-24 line 266 names it as a mechanism record. Cascade 2's table row says: *"Its **input** is the
`Rule Acceptance` row, **written *at acceptance*** with the set the Family was shown."* And line 286
says every transition row's *"controller asserts the transition actually occurred — … **a confirmed
`Agreement` for a `Rule Acceptance`**."*

**FR-32 puts acceptance strictly before confirmation, and says so twice:**

> They cannot proceed without accepting that consequence explicitly. … **Nothing is removed until the
> engagement actually completes.** Acceptance authorises the consequence; the consequence takes effect
> only when the Agreement is confirmed.

So at the moment the `Rule Acceptance` row is written there is **by construction no confirmed
Agreement**. Its controller assertion is false for every legitimate row.

**Two units.** Unit A implements the assertion as written: every acceptance row is rejected, cascade
2 has no input, and FR-32's warn-and-accept — the mechanism the PRD calls *"the only honest place to
raise it"* — never fires. Unit B drops the assertion as obviously wrong: the row is now forgeable
from Desk, which is C5-5(b) re-opened on the one row type that decides what a Family loses.

**And no layer is named to write it.** Line 284: *"Where the transition is a document lifecycle
event, the row is written **by that document's controller** … `api/` and the scheduler write a
transition row **only** where no document change exists to hang it on."* Acceptance is a click in the
engage flow with no document change (the Agreement is not yet created or is at `docstatus` 0), so
`api/` is permitted — but nothing **says** so, and the table's "written by" column, which the guard
clause calls authoritative (*"written by exactly one layer per trigger, named in the table"*), names
a writer for the `Rule Conflict` row and none for its input.

**A structural note.** `Rule Acceptance` is a seventh transition row for six cascades, and it invokes
none. AD-26's round-7 claim is a bijection — *"Every cascade is invoked by a transition row — all six,
with no exceptions"* — and this row breaks it in the other direction: a transition row that is only
ever read. Two units will disagree on whether `doc_events` binds anything to it.

**Tightening.**

> The `Rule Acceptance` row is written by **`api/`**, at acceptance, because FR-32's acceptance is an
> act with no document change to hang it on. It is an **evidence row, not a cascade trigger** — it
> invokes nothing and `doc_events` binds nothing to it — and it is the one row type whose controller
> asserts nothing about a confirmed Agreement, because none exists yet. What it asserts instead is
> that the acting user is the Creator of the Wedding (FR-6) and that the named set is the set
> `restrict_service` resolved to at that instant. Distinguish the two kinds in the AD: **trigger rows**
> carry the full C5-5 shape; **evidence rows** carry the entity, the instant and the payload.

### C7-4 — `bypass=True` cannot cross Frappe's document machinery, which round 7 put in the middle of the cascade-5 → cascade-4 path **[NEW in r7]**

**ADs in play:** AD-16, AD-26, AD-35, AD-31; FR-53, FR-60, FR-70.

The two structural changes were made in the same pass and neither paragraph mentions the other.

AD-16 line 204:

> **The bypass travels as an explicit argument, never as ambient state.** A cascade passes
> `bypass=True` down **its own call chain**, so it reaches the notification path and cannot leak …

AD-26's cascade-4 row:

> written by the **`Listing` controller** whenever `recompute_discoverable` changes the flag, and by
> nothing else; **the lapse job and the Service fan-out act by calling `recompute_discoverable`**

**Trace the FR-70 route — a Vendor withdraws his own Listing.**

```
api/vendor/listing.withdraw()          bypass is not in scope; this is a request
  → listing.save()                     Frappe. Takes (self). No bypass parameter exists.
    → Listing.on_update                Frappe calls run_method("on_update"). No bypass.
      → recompute_discoverable(doc)    flag flips, doc.save() again
        → controller writes the row    doc.insert(). No bypass.
          → doc_events on the row      Frappe calls handler(doc, method). No bypass.
            → cascade 4                runs with bypass unset ⇒ False
              → frappe.get_list(...)   as the Vendor
```

The Vendor cannot see other people's Weddings. `frappe.get_list` returns **zero** Families holding
his Listing on a Shortlist or as a Selection. **Nobody is told, the cascade reports success, and the
Selections are never cleared** — which is, verbatim, the failure AD-16's own table row was written to
prevent: *"a lapse cascade running as the Vendor cannot see the Families holding his Listing, so
FR-53 would notify nobody and report success."*

**Four `doc_events`/`run_method` frames sit between the request and the cascade, and none of them
takes a keyword argument.** The bypass cannot leak — and it cannot travel either. AD-16 states the
first property and not the second, and round 7's uniform row invocation is precisely what inserted
those frames: in the round-6 model cascade 5 called cascade 4 **directly**, and an argument would
have threaded.

**Route by route:**

| FR-53 route | Actor | `bypass` reaches cascade 4? | Result |
| --- | --- | --- | --- |
| Subscription lapse | AD-23 job, Administrator | irrelevant — Administrator sees all | works |
| Vendor withdraws (FR-70) | the Vendor | **no** | **notifies nobody** |
| Admin removes Vendor (FR-60) | Admin, via cascade 5 | **no** — but Admin sees all | works by accident |
| Condition ceases (FR-59, FR-71) | whoever changed the condition — often the Vendor | **no** | **notifies nobody** |

Two of four routes silently fail, and FR-53's closing line is *"they behave identically for
Families."*

**Two further boundaries the AD does not address.** `frappe.enqueue` (AD-31) serialises its arguments
into a job payload — a `bypass` kwarg would have to be declared on the job function, and nothing says
it is. And **the outbox dispatcher is in a different process entirely**: AD-16 cites it as a reason
for argument-scoping (H7-3), when it is the clearest case where an argument cannot arrive.

**Tightening.**

> An argument cannot cross a frame you do not own, and `doc_events` is such a frame. State the
> boundary: **the bypass is an argument within `domain/`, and every cascade entry point is a
> `domain/` function that sets it, not a `doc_events` handler that inherits it.** The `doc_events`
> handler on a transition row does exactly one thing — call the `domain/` cascade with `bypass=True` —
> so the argument originates at the boundary rather than travelling through Frappe. The outbox
> dispatcher is a scheduled job and falls under AD-16 row 2 (`frappe.get_all` with a comment); it
> needs no bypass and must not be cited as one.

### C7-5 — nothing can set the `Cancellation` row's cause, and a Desk cancellation certainly cannot **[NEW in r7]**

**ADs in play:** AD-26, AD-13, AD-27, AD-12; FR-17, FR-42, FR-60, FR-61.

The round-7 clause, spliced mid-sentence into line 286:

> an `Agreement` at `docstatus` 2 for a `Cancellation` — **which also carries its cause**, because
> AD-13 must tell an FR-17 date move (counted) from a Family ending an Agreement with a removed Vendor
> (FR-60, explicitly not counted against her), and the two are otherwise identical rows

**Who sets it?** The row is written by the `Agreement` controller in `on_cancel` (table, cascade 3).
The controller sees one Agreement moving to `docstatus` 2. The cause is known only to the caller:

| Caller | Cause | Counted? |
| --- | --- | --- |
| cascade 1 (FR-17 Block change) | date move | **yes**, per FR-17 |
| cascade 6 (FR-72 abandonment) | wedding abandoned | ? |
| cascade 2 (FR-32 Rule conflict) | rule conflict | ? |
| cascade 5 → the Family ends it (FR-60) | vendor removed | **no**, not against the Family |
| `api/` — an ordinary cancellation | plain cancellation | **yes** |
| **Frappe Desk — Admin** | **unknown** | **?** |

**There is no channel.** Cascade 1 calls `agreement.cancel()`; Frappe's `cancel()` runs
`run_post_save_methods` → `on_cancel` (`document.py:1458-1459`) and passes no parameter.
**M5-4 [STILL OPEN, fifth round] — cascade composition has no signature and no reason parameter** — is
exactly the missing channel, and line 301 still states composition as four bare arrows,
*"**1→3, 2→3, 5→4, 6→3**"*, with no signature.

The only alternatives are: (a) ambient state read by the controller, which AD-16 bans one AD earlier
in this same revision; or (b) a `cancellation_cause` field set on the Agreement *before* `cancel()` —
which nothing states, which makes the cause a mutable field on a frozen document (AD-12), and which
Desk can leave blank.

**The Desk case is not an edge case — it is AD-26's whole justification.** Cascade 3 exists in
`on_cancel` precisely *"so Desk cannot walk past it"* (table, cascade 3), and AD-27 exists because
*"Frappe Desk sits directly on the DocTypes and FR-61 gives Admin every capability."* An Admin
cancelling an Agreement in Desk — to unwind a fraud, to help a Family whose Vendor absconded —
produces a `Cancellation` row with no cause. Then:

- **If the cause has a default**, AD-13's rolling 24-month count records a fault against a Family or a
  Vendor **permanently and visibly on their profile** (FR-42), which is the exact defect AD-13's
  *Prevents* clause names: *"a cooperative Amendment being recorded as a walk-out on both profiles,
  permanently and visibly."*
- **If the cause is mandatory**, the controller throws and **Admin cannot cancel an Agreement in
  Desk**, against FR-61's *"Admin has every capability"* and against AD-27's own framing that the
  controller binds Admin to *integrity* constraints, not to a field the UI never offered.

**Two units, and both ship a permanent user-visible defect.**

**A grammatical defect in the same clause.** *"an `Agreement` at `docstatus` 2 for a `Cancellation` —
**which also carries its cause**"* — the antecedent of *which* is ambiguous between the Agreement and
the row, and the two readings put the field on different DocTypes. Line 286 is a single ~250-word
sentence carrying three different assertions and this clause is spliced between the first and the
second.

**Tightening.**

> Split line 286 into three statements, one per row type, and give the `Cancellation` its cause a
> channel: **`Agreement.flags.cancellation_cause` is set by the caller immediately before
> `cancel()`, and the controller reads it, defaulting to `unspecified` when absent.** A Desk
> cancellation is `unspecified`, and **`unspecified` is not counted against either party by AD-13** —
> a cancellation nobody attributed is not evidence of a walk-out, and FR-42's number is explicitly
> *"a neutral number with no fault attributed or inferred."* Where Admin knows the cause, Desk offers
> it; where Admin does not, the count is unaffected rather than wrong. Document flags, unlike
> `frappe.flags`, are per-document and die with it, so this is not the ambient state AD-16 bans.

### C7-6 — "re-entry restores … image visibility" reinstates the AD-20 ↔ AD-29 coupling that C6-1's fix deleted, in the same revision **[NEW in r7]**

**ADs in play:** AD-26, AD-20, AD-29, AD-35; FR-53, FR-59.

AD-20 line 236, closing C6-1:

> **Discoverability is deliberately not a term**: a lapsed Listing stops being found, but FR-53 keeps
> its open Enquiry threads answerable and promises the portfolio "reappears intact on renewal", so
> moving every object off the CDN on lapse would destroy what the Vendor is told is retained.

AD-26 line 311, edited in the same pass, closing H6-4:

> **The row's direction is consumed, not decorative:** FR-59 says a Listing stops being discoverable
> *until it does again*, so **re-entry restores discoverability and image visibility** by the same
> cascade.

**If discoverability is not a term of image visibility, leaving discovery never changed image
visibility, and re-entry has nothing to restore.**

**Two units.** Unit A reads AD-26 literally and wires cascade 4 to promote images on re-entry — which
requires that leaving discovery demoted them, which is **C6-1 re-created exactly, one AD away**: on
lapse, AD-29 physically moves every portfolio object out of the public path and invalidates the CDN,
destroying FR-53's *"reappear intact on renewal"* and blanking the portfolio a Family is
corresponding about in an open Enquiry thread AD-26 itself promises stays answerable. Unit B reads
AD-20 literally, wires nothing, and the clause is dead text in a normative document.

This is **round 6's diagnosed failure mode recurring in round 7**: a tightening landed in one AD and
its consequence was not read in the neighbour amended in the same pass. C6-1 was AD-20 vs AD-35;
C7-6 is AD-20 vs AD-26. One sequential read of the two ADs finds it, and round 6 prescribed exactly
that read as step 2.

**Tightening.** Delete two words:

> so re-entry restores discoverability by the same cascade. **Image visibility is unaffected in either
> direction** (AD-20): nothing moves on or off the CDN when a Listing enters or leaves discovery.

### C7-7 — cascade 1 is bound to `chosen_block`, and FR-17's transition happens without `chosen_block` changing **[NEW in r7]**

**ADs in play:** AD-26, AD-9, AD-11, AD-17; FR-9, FR-17, FR-72.

The table:

> | 1 · Chosen Block change (FR-17) | `Block Change` row — written by the **`Wedding` controller** when
> `has_value_changed("chosen_block")` |

`chosen_block` is a **link to a Candidate Block**. The Glossary: a Candidate Block is *"a complete
arrangement of the Wedding: every Function assigned to a day and a Slot"*, and AD-9 puts the `DATE`
and the `Slot` **on the Function**. So the Family can move the wedding without the link changing:
she edits the Sangeet from the 25th evening to the 27th evening, which is a `Wedding Function` save.
`Wedding.on_update` does not fire; `has_value_changed("chosen_block")` is not consulted; **no
`Block Change` row is written; cascade 1 never runs; every Agreement confirmed against the 25th
stands, holding Slots for a day the wedding has left.**

**The spine knows Functions move.** AD-11 line 153, in the H5-7 clause: *"the Family may have moved a
Function (**FR-9, FR-17**) between attempts, so the old rows must not be mistaken for the new
closure."* Two ADs disagree about whether an FR-17 move is a `Wedding` field change.

**AD-26's own argument names this failure and then commits it.** Line 286 closes:

> binding `on_update` of the affected document is not [the transition], because Desk can change that
> document without the transition and **the scheduler can cause the transition without changing that
> document**.

Here it is a third party — **another document's change causes the transition** — and the round-7
binding is precisely `on_update` of the affected document. Round 6's H5-3 fix ("every binding carries
a field predicate") and round 7's row change together locked the most destructive Family-facing
cascade to a field that the transition does not have to touch.

**Two units.** Unit A binds `Wedding.chosen_block` as written; moving a Function silently strands
Agreements. Unit B also binds `Wedding Function.on_update` on `date`/`slot`; now every Function edit
during initial planning — before any Agreement exists — raises a `Block Change` row, and under C7-1's
derived key the *second* edit of the same Function to the same day is a duplicate-key error.

**Tightening.**

> Cascade 1's transition is **"the days the Chosen Block occupies changed"**, which is a derived set,
> not a field. Follow cascade 4's shape, which is the only one that works: a
> `recompute_chosen_days(wedding)` function computes the `(day, slot)` set of the Chosen Block,
> compares it to the stored set on the Wedding, and writes — and therefore raises a `Block Change`
> row carrying the old and new sets — **only on a genuine difference**. It is bound from both
> `Wedding` (the link changed) and `Wedding Function` (a day or Slot changed). A cascade whose
> transition is a derived value must be invoked by a compare-and-return over that value; three of the
> six now are, and the other three are the ones that misfire.

---

## 3. High

### H7-1 — an Admin-removed Vendor's portfolio stays on the public CDN forever **[NEW in r7 — C6-1's fix]**

AD-20 dropped the listing term entirely rather than scoping it. FR-60 removal is the fraud route, and
the PRD separates it explicitly: *"This is the one route out of discovery that does not inherit the
uniform rule at the end of FR-53: that rule rests on 'a Vendor who lapses still owes the weddings
they took', which is true of a late payer and **false of a fraud**."* Nothing in AD-20, AD-29 or
AD-33 moves a removed Vendor's images off the public path — removal is not a takedown, which AD-33
defines as *"a separate state carrying its ground, its authority and the acting Admin"*. AD-29's
object keys are *"opaque and never enumerable"*, so this is not a live exposure, but it is
indefinite retention of published content belonging to an account removed for fraud, and it is the
one case AD-20's own round-6 justification named. **Scope the term to withdrawal and removal, not to
discoverability**: the difference between the cases is reversibility, and lapse and withdrawal are
reversible while an Admin removal is not.

### H7-2 — `covers()` is ancestor-or-self for a Space too, so an immovable Venue serves places it cannot reach and a district Family cannot engage the Venue she can see **[NEW in r7 — C6-7's fix]**

AD-36 now has one `covers()` for all Services, and AD-11 line 151 still says *"A **Space**, being
immovable, serves the place it stands in. A **travelling Vendor** serves the areas they declare."*
Two consequences, opposite directions:

- **Rutuja's Place is Ahmednagar district** (FR-13 contemplates browsing before a town is settled).
  A Venue whose Space stands in Sangamner declares Sangamner. `covers(Sangamner, Ahmednagar)` is
  false — Sangamner is not an ancestor of Ahmednagar. `within()` shows her the Venue; AD-36 says
  `within()` *"is never the coverage test"* and `covers()` is *"the test used for matching, Enquiry
  and every Agreement."* **She can browse a Venue she can never enquire with.** H5-10 moved from
  search to Enquiry rather than closing.
- **The Venue's workaround makes it worse.** He declares "Ahmednagar district" instead.
  `covers(Ahmednagar, Shrirampur)` is now true, and his immovable lawn appears for a Family 60 km
  away, which is the failure AD-11's immovability sentence exists to prevent, and it corrupts AD-22's
  shrinkage population (his business Place is now a district).

The r6 tightening's asymmetry — Spaces match on `place.lft ≤ space_place.lft ∧ place.rgt ≥
space_place.rgt`, travelling Vendors on the opposite containment — was declined without a stated
reason. **Either adopt it, or state that a Family with a Place coarser than a town is asked to narrow
before she can enquire, and say so on the screen rather than returning an empty Enquiry path.**

### H7-3 — AD-16 argues for argument-scoping using the one example an argument cannot reach **[NEW in r7 — H6-12 partially closed]**

Line 204: *"Scoping it by module location instead would leave FR-53's notification resolving nothing
one function below `domain/`, and **the outbox dispatcher (AD-26) runs further away still**."* The
dispatcher is a scheduled job in another process. No argument from any cascade reaches it, so it is
not evidence against module-scoping; it is evidence against argument-scoping. And it is AD-16's own
row 2 — system work, `frappe.get_all` with a comment — so it needs no bypass at all. The r6 finding
was that the clause cited a superseded mechanism; the mechanism was updated and **the argument it
was attached to was not re-read**. Delete the clause: the FR-53 half stands on its own.

### H7-4 — a Vendor block is an occupancy row with a `seat`, and a four-column unique index cannot block a whole row **[NEW in r7 — C6-3 partially closed]**

AD-11's *Enforced by* is *"**the database** — a unique index, which no code path can talk past."*
That claim now covers only Agreement-vs-Agreement. A block occupies some seat value; an Agreement
inserting at a different seat violates nothing. The whole-row semantics live **only** in AD-10's
availability function, which is application code on the read path — and AD-10 itself says *"No
surface ever asserts availability as fact"* and that the confirmation path is AD-11's insert. **Two
units:** unit A writes one block row at seat 0 and relies on AD-10 (correct until any path inserts
without consulting AD-10 — an Amendment's set-difference in AD-12, for one, which is described purely
as an occupancy transform); unit B writes `concurrent_capacity` rows, which makes
`concurrent_capacity` un-raisable while a block stands and makes a partial block inexpressible.
The r6 `seats_blocked` column resolves both and restores the database as the enforcer; it was
declined without argument.

### H7-5 — every cascade now runs synchronously nested inside whatever request touched an input document **[NEW in r7]**

Uniform row invocation means the row is inserted inside the parent's `on_update`, and `doc_events` on
the row runs the cascade **inside that same frame**. Worked, for FR-60:

```
Admin saves Vendor in Desk
  → Vendor.on_update → Vendor Removal row → cascade 5
    → for each Listing: recompute_discoverable → listing.save()
      → Listing.on_update → Listing Condition Change row → cascade 4
        → for each Family holding it: clear Selection, recompute_budget, write outbox rows
```

A Vendor with 6 Listings each held by 40 Families is 240 Selection saves, 240 budget writes and 240+
outbox rows, three document-saves deep, inside one Desk button press, in one transaction, holding row
locks on every affected `Wedding Budget`. NFR 5.4 sizes for peak muhurat; nothing here is bounded and
nothing is enqueued. Round 6's model had the same shape for cascade 4 alone; **round 7 put cascades
1, 5 and 6 into it**, and 5 and 6 are the two highest-fan-out operations in the system. The outbox
correctly defers the *sends*; it does not defer the *writes*. State a bound: either the cascade's
per-target work is itself an outbox row drained by the AD-23 job, or the cascade enqueues per target
with AD-31's idempotency key.

### H7-6 — two jobs the spine depends on are absent from AD-23's roster, and AD-19's correctness argument rests on one of them **[NEW in r7; supersedes H6-15]**

AD-23 is *"Time-triggered rules are enumerated in one place"* and its *Prevents* is *"a requirement
with a time trigger silently never shipping, because nothing fails when one is absent."* It says
**four** jobs exist only because this spine created them and names them: AD-33's 180-day purge,
AD-12's verification sweep, AD-12's retention expiry, AD-30's guest-link expiry.

Two more are now cited by their consumers and absent from the roster:

1. **The outbox drain.** AD-26: *"dispatched by an **AD-23 job** that reads that table."* [STILL OPEN
   from r6 as H6-15.]
2. **The budget reconciliation sweep.** AD-19: *"a lost update is re-derived by the next recompute and
   by **AD-23's reconciliation sweep**."* [NEW in r7.] `grep -n "reconcil"` over the spine returns
   exactly one line — the citation. There is no sweep.

The second is worse than a missing job, because **AD-19's claim that last-write-wins is "correct
rather than tolerated" depends on it.** Without the sweep, a lost update on a `Wedding Budget` is
permanent unless some later edit happens to re-trigger `recompute_budget`, and the Family's running
total silently omits a confirmed Agreement — FR-8's central promise. Either add the sweep to AD-23
(with its period and its idempotency key) or drop the "correct" claim and take a row lock.

### H7-7 — `Wedding Budget` is written by a call that no controller can see, so AD-27 cannot bind it **[NEW in r7]**

AD-19 mandates a field update. The spine says two things about that call elsewhere. AD-26 line 307:
*"`doc_events` does not fire for `frappe.db.set_value`, one more reason AD-16 keeps that call out of
request paths."* AD-16 line 204: *"`frappe.db.get_value`, `set_value` and `sql` sit **below the
permission layer entirely** and check nothing, masking included."* The budget write is in a request
path (a Vendor's confirmation), so AD-19 mandates exactly what AD-26 gives as the reason to avoid it.

Consequences: `Wedding Budget` has **no controller hook that ever runs**, so AD-19's *"Nothing else
writes the total — not a cascade, not a controller, not a client"* is unenforceable even in
principle — a stray `db_set` from anywhere is indistinguishable from the sanctioned one — and AD-27's
*"controller guards run for Desk and for Administrator alike"* does not reach this document at all.
Say so in AD-19 as an accepted cost, or make `Wedding Budget` a submittable-free document written by
`doc.save()` with an explicit row lock (H7-6's alternative), which restores both the controller and
the audit trail.

### H7-8 — the guard is keyed on the affected entity, and cascade 6 → cascade 3 → cascade 6 is suppressed rather than handled **[NEW in r7]**

FR-72: a Wedding with no Chosen Block *"concludes when the latest [Agreement's days] have passed"*,
and abandonment *"cancels its Agreements under FR-42"*. So cascade 6 → cascade 3 (declared), and
cascade 3 cancelling the last Agreement can change what the Wedding's state should be, raising a
`Wedding State Change` row and cascade 6 on the same Wedding. The guard, keyed
`(cascade_name, affected_entity)`, suppresses the re-entry — correctly, to terminate — but **the row
was already written and is append-only**, so the system now holds a transition row whose cascade
provably never ran, with nothing that notices. AD-26 says an undispatched *effect* after N attempts is
an alarm; it says nothing about a row whose cascade was suppressed. Under C7-1's derived key that row
also **burns the key**, so the transition can never be processed later. Either the guard records the
suppression on the row (a `suppressed` reason the AD-23 drain can re-drive) or the AD states that a
suppressed re-entry is a completed no-op and why that is safe for each of the four composition edges.

### H7-9 — Admin opening a Place renumbers `lft`/`rgt` at runtime, and `lft`/`rgt` is now *the* coverage predicate **[STILL OPEN from r6 as M5-11, escalated]**

AD-8: *"opening a Place at any level"* is Admin-editable data changed *"with no code release."*
AD-36 now makes `covers()` a live `lft`/`rgt` containment test and calls it *"the test used for
matching, Enquiry and every Agreement."* Frappe's NestedSet rewrites `lft`/`rgt` across the affected
subtree on insert, under a write lock. So an ordinary Admin action re-numbers the column every
availability query, every search and every Enquiry gate reads, mid-flight. This was a Medium while
`covers()` had three formulations and one of them was set membership; C6-7's fix made the range
comparison the single normative form, which escalates it. State the discipline: Place inserts happen
in a maintenance window, or `covers()` is evaluated over a materialised ancestor set rather than over
live `lft`/`rgt`.

### H7-10 — the ERD's outbox model contradicts AD-26 and invents a supertype the schema does not have **[NEW in r7]**

Line 544: `CASCADE_OUTBOX }o--|| TRANSITION_ROW : "effects, dispatched **after commit**"`. Three
problems. (a) *"after commit"* is the mechanism C5-2 abolished and C6-4 removed from the prose — the
same residue, surviving in the diagram. (b) `TRANSITION_ROW` is a generic entity; AD-24 line 266 names
**seven** concrete row DocTypes and there is no supertype, so the ERD models a table that will not
exist. (c) Hanging the outbox off the transition row is wrong for composition: a cascade-3 run invoked
by cascade 1 produces effects, and the row it hangs off is cascade 1's `Block Change`, not a
`Cancellation` — nothing says which. Model it as `CASCADE_OUTBOX` standing alone with an entity
reference and an effect kind.

### H7-11 — `WEDDING ||--|| WEDDING_BUDGET` is a mandatory 1:1 with no stated creator **[NEW in r7]**

The ERD asserts exactly one budget document per Wedding. Nothing says when it is created. If it
appears on the first `recompute_budget`, every reader must handle its absence and the ERD is wrong;
if it is created with the Wedding, the `Wedding` controller creates it — inside the same insert that
C7-2 makes fire cascades 1 and 6. Say which, and say what a Wedding with no Selections reads: AD-19
says a Service with undecided Functions reads *"not yet estimated, never ₹0"*, and a whole Wedding
with no budget row needs the same treatment.

### H7-12 — cascade 2's hook is not among the hooks AD-26 enumerates **[NEW in r7]**

Line 284 names two hooks: *"`on_cancel` for a cancellation, `on_update` guarded by
`has_value_changed` for a field transition."* Cascade 2's row is *"written by the **`Agreement`
controller** on confirmation"*, and confirmation is `docstatus` 0 → 1, which Frappe runs as
`_action == "submit"`: `on_update` **then** `on_submit` (`document.py:1455-1457`). Both work;
`has_value_changed("docstatus")` is true on submit because `_doc_before_save` exists. But the AD
names neither `on_submit` nor the `docstatus` predicate, so two units pick different hooks — and they
differ in ordering against `on_submit`'s own work and against AD-12's chain append, which line 166
says *"is the last step of an amendment."* Name the hook.

### H7-13 — AD-24's mechanism-record carve-out leaves the spine's *domain* inventions uncovered **[STILL OPEN from r6 as M5-12, re-scoped]**

The new rule is right — *"The Glossary binds domain entities; mechanism records are named freely"* —
and it correctly covers the ten row/outbox/budget names. `Place`, `Preferred Vendor` and
`Verification` are genuine PRD §3 Glossary terms and were never the problem. What is still uncovered
are the **domain** nouns this spine invented, which the new sentence explicitly does *not* exempt:
`Takedown`, `Legal Hold`, `Grievance`, `Breach Incident`, `Occupancy`, `Agreement Record`,
`Space Rule`/`Listing Rule`, and `Wedding Service` (FR-68). AD-24 says the Glossary is binding on
every DocType name; eight DocTypes have no Glossary entry to be bound to. Either add them to PRD §3
or extend AD-24's carve-out to name them.

### H7-14 — "Wedding Service" still occurs zero times in prose **[STILL OPEN from r6 as H5-16]**

`grep -c "Wedding Service"` returns **0**. It exists only as `WEDDING_SERVICE` in the ERD, where two
relationships now depend on it (`SHORTLIST` hangs off it, and the Function mapping four ADs read).
FR-68 is cited once, in a diagram label. A builder reading the ADs will not know the entity exists;
a builder reading the ERD will not know what governs it. Fifth round.

---

## 4. Medium

**M7-1 — line 309's "Six operations" list still says "a Listing **leaving** discovery" [NEW in r7].**
The table two lines above now says *"enters or leaves"*. The list is the third statement of the same
enumeration in one AD (the heading, the table, the list) and it is the stale one. Delete it — the
table is authoritative and the heading already says six.

**M7-2 — the outbox row's payload shape is unstated [NEW in r7, C6-4 residual].** AD-26 says the
rendered bytes are *"written as row data"* on the `Agreement Record` **and** that the object-store
write is *"an outbox row like any other effect."* Whether the outbox row carries the bytes or a
reference decides whether a scheduled job polls a table of multi-megabyte blobs. Say "a reference."

**M7-3 — the `Listing Condition Change` row's `from` value has no stated source [NEW in r7, C6-6
residual].** The assertion compares the row's `from`/`to` against *"the flag transition
`recompute_discoverable` wrote in the same transaction"*; the previous value is only reachable from
the Listing's in-flight `_doc_before_save`. Say that the Listing's controller writes both values from
`get_doc_before_save()`, and say what happens when there is none (C7-2).

**M7-4 — AD-26 still refers to itself in the third person [STILL OPEN from r6 as M6-2].** Line 307:
*"AD-26's prohibition covers effects observable outside the transaction…"*, inside AD-26. It reads as
a cross-reference and will be followed as one.

**M7-5 — AD-22's per-level shrinkage makes scores in one `within()` result set incomparable [NEW in
r7, H6-9 residual].** Each Listing shrinks toward its own level's population — a town photographer
against thirty peers, a district photographer against four hundred — and FR-20 then ranks them
against each other. The branch is chosen; the cost is not named. AD-5 and AD-8 give their equivalents
an accepted-cost paragraph.

**M7-6 — `concurrent_capacity` is still absent from AD-6's core enumeration and is still not a
condition of listing [STILL OPEN from r6 as M5-2, fifth round].** AD-11: *"never implicitly
defaulted."* Nothing gates a Listing publishing without one, and AD-27's conditions-of-listing list
(line 328) does not include it.

**M7-7 — AD-16 still requires every cascade write to record "the person who triggered it" [STILL OPEN
from r6 as M5-3].** The outbox drain job has no person, and now neither does the AD-23 job that
raises cascade 4 through `recompute_discoverable`.

**M7-8 — the ERD is still materially behind the prose [STILL OPEN from r6 as M6-1, partially
addressed].** Added this round: `WEDDING_BUDGET`, `VENDOR_BLOCK`, `CASCADE_OUTBOX`, `TRANSITION_ROW`,
`WEDDING_SERVICE`'s Function mapping. Still absent: `PLACE`, the Rule entity (`Space Rule` /
`Listing Rule`), `VERIFICATION`, `LEGAL_HOLD`, `BREACH_INCIDENT`, `REAL_WEDDING`, the guest-contact
access log, and `WEDDING_MEMBER`'s role column. Seven ADs read entities the ERD does not carry.

**M7-9 — the Site Visit is still unmodelled [STILL OPEN from r6 as M5-7, fifth round].**
`grep -c "Site Visit"` returns 0. AD-11 still does not say it takes no Slot.

**M7-10 — AD-36's snapshot lands "onto the Agreement" and a Family holds several [STILL OPEN from r6
as M5-8].** No combination rule; FR-25's distinct surfacing is still unreachable for a Vendor added
after confirmation.

**M7-11 — AD-26's enumeration is still closed at six [STILL OPEN from r6 as M5-9, narrowed].** H6-6's
withdrawal removes the eighth candidate. FR-68's Service removal — PRD line 397, *"Removing a Service
from a Wedding removes its Shortlist. Where an Agreement exists for it, FR-32's warn-and-accept
applies before anything is removed"* — is a cross-entity operation spanning Wedding Service,
Shortlist, Selection, Agreement and the budget, and it is not one of the six.

**M7-12 — AD-35 still says "five **other** documents" and lists `Listing` first [STILL OPEN from r6 as
M5-10, fourth round].** Cosmetic, and it is the sentence that hid C5-1 for two rounds.

**M7-13 — AD-35's Grace-Period boundary is a scheduled window, not an evaluated one [STILL OPEN from
r6 as M5-14].** Between a Vendor's expiry timestamp and the job's tick, search returns the lapsed
Listing and AD-10 shows dates, against FR-13's *"no dates at all."*

---

## 5. Low

- **The review-history table still ends at round 4** (line 622-629), and the prose still reads *"Round
  5 addressed round 4's six criticals… Read `reviews/review-*-r4.md` before cutting epics."* Three
  rounds and roughly fifty tightenings later, a builder is being pointed at the wrong reports. Raised
  in r5 and r6; still not done. Two lines to fix.
- **"assume this round did too"** has now been confirmed for the sixth consecutive round. Make it a
  stated property, not a caveat.
- **`held_by`'s physical shape is still unstated** — Dynamic Link, two nullable FKs, or a holder
  table. The type union closed H6-17; the schema is still two units' choice.
- **`session.user` appears once and "document state" zero times** — the three-homes criterion from
  H3-8/H4-20 is still unwritten. Seventh round.
- **`N` in "has not dispatched after N attempts" is still a letter.**

---

## 6. Part 3 — convergence, and terseness

### The series

| Round | Criticals | Defects in *that round's own* fixes | Source |
| --- | --- | --- | --- |
| 1 | 4 | 0 (baseline) | `review-adversarial.md` C-1..C-4 |
| 2 (closure) | — | **8 new defects, two structural** | `review-closure.md` verdict |
| 3 | 4 | **4** — all marked *[NEW in round 3]* | `review-adversarial-r3.md` |
| 4 | 6 | **4** | `review-adversarial-r4.md` verdict |
| 5 | 6 | **5** | `review-adversarial-r5.md` verdict |
| 6 | 7 | **7** — every one | `review-adversarial-r6.md` C6-1..C6-7 |
| **7** | **7** | **7** — every one | this report, C7-1..C7-7 |

Criticals per round: **4, 8, 4, 6, 6, 7, 7.** Self-inflicted: **0, 8, 4, 4, 5, 7, 7.** Seven rounds,
no downward trend on either series, and the second consecutive round at 100% self-inflicted.

### Did round 7 break the pattern?

**Not on the count. Decisively on everything the count does not measure.** Closure went from 13-of-24
with one item never closed to **19-of-25 with zero not closed and zero criticals open** — the delete
step round 6 prescribed was applied and it worked, and items that had been open three, four and five
rounds (H5-8/C6-1's image predicate, H6-8's budget adjustment for the third time, H6-1's cascade table
untouched since round 4) all shut. And the seven new criticals are **not seven independent design
gaps**: six of the seven live in two sentences — AD-26 line 286 (C7-1's key, C7-3's assertion, C7-5's
cause) and the `has_value_changed` binding in the cascade table (C7-2, C7-4, C7-7). Round 6's seven
were in six different ADs. **The failure moved from "the spine contradicts itself in six places" to
"two structural decisions were not traced past their own paragraph," which is two fixes rather than
seven.**

The mechanical cause is precise and it is the half of round 6's prescription that was skipped. Step 1
— *"every tightening names the text it replaces"* — was applied, and C6-2, C6-4, C6-7 and H6-12 all
closed by deletion. Step 2 — *"after the pass, each amended AD is read end to end against every AD it
names"* — was not, and C7-6 is the proof: AD-20 and AD-26 were amended in the same pass to say
opposite things about image visibility, exactly as AD-20 and AD-35 were in round 6. **Add a third
step for structural changes specifically: when a change alters *how* something is invoked, trace one
complete call path end to end, naming every frame, and check the framework's actual behaviour at each
one.** Both C7-2 and C7-4 are visible from a single traced path, and C7-2 is visible from four lines
of `document.py`.

**Two of the seven want an answer from the author rather than a process:** what sets a `Cancellation`'s
cause when Admin cancels in Desk (C7-5), and whether cascade 1's transition is a link field or a
derived set of days (C7-7).

### Terseness: 13,551 words, up from 10,568 at round 4

**The growth is roughly two-thirds load-bearing and one-third residue, and the residue is now
concentrated enough to remove in one pass.** Measured:

| AD | Words | Verdict |
| --- | --- | --- |
| AD-26 | **1,318** | 12% of all AD text for six cascades. Normative content is perhaps 600. |
| AD-11 | 643 | Load-bearing — every sentence answers a demonstrated divergence. |
| AD-28 | 609 | Load-bearing — four one-shot Frappe facts a builder would otherwise get wrong. |
| AD-32 | 594 | Load-bearing — the logging verification is the reason the AD exists. |
| AD-12 | 583 | Load-bearing. |
| AD-36 | ~543 | Load-bearing after C6-7's collapse; it was two rules pretending to be one. |
| AD-19 | 471 | Three reasons given where one suffices. |

**Cut these, in order, for about 500 words with no rule lost:**

1. **AD-26 line 309, the "Six operations" list (~45 words).** The third statement of the same
   enumeration in one AD, and the stale one (M7-1). Delete.
2. **AD-26 line 311's FR-53 restatement (~150 of its 230 words).** *"the Listing stops appearing,
   accepts no new Enquiry, existing Agreements and open threads are untouched, and every Family
   holding it on a Shortlist or as a Selection is told, with the Selection cleared and the budget
   adjusted"* is FR-53's four-route paragraph copied verbatim. The spine's own opening rule is that it
   *"fixes only what two independently-built units could otherwise choose incompatibly"*; two units
   both reading FR-53 do not diverge here. Keep the two sentences that *are* architecture — that a
   condition ceasing to hold raises an event rather than being a read-time check, and the direction
   semantics — and cite FR-53 for the rest.
3. **AD-16 line 204's module-scoping counter-argument (~35 words).** Wrong as well as unnecessary
   (H7-3).
4. **AD-19's second and third reasons for `Listing` not being an invoker (~55 words).** The FR-8
   reason is sufficient and is the only one that survives a change of mechanism.
5. **The review-history table and its prose (lines 620-629, ~200 words).** Stale by three rounds and
   actively misdirecting (Low). Replace with one sentence: *"Seven gate rounds; the reports in
   `reviews/` are the record."*

**And one rewrite that shortens while fixing two defects.** AD-26 **line 286 is a single ~250-word
sentence** carrying three different controller assertions with a fourth clause spliced between the
first and the second, whose antecedent is ambiguous (C7-5). Broken into one bullet per row type it is
shorter, unambiguous, and it makes C7-1's and C7-3's contradictions visible on sight. **The longest
sentence in the document is also the location of three of this round's seven criticals**, and that is
not a coincidence — nobody, human or agent, re-reads a 250-word sentence against its neighbours.

**The honest headline on size.** The spine grew 28% since round 4 because seven review rounds appended
*justification* to existing ADs and almost nothing was cut until this round. The justification is
mostly worth keeping — it is what stops a later agent "simplifying" a rule back into the defect it was
written for — but six ADs (AD-11, AD-16, AD-19, AD-20, AD-26, AD-35) now read as an archaeological
record of the review series embedded in normative text. "Cut it" has been a finding since round 4 and
it has never once been acted on. The five cuts above plus the line-286 rewrite are the whole of what
this reviewer would remove today; everything else earns its words.

### Shortest path

1. **C7-2 and C7-6** — two deletions and one guard. `not doc.is_new() and doc.has_value_changed(...)`;
   delete *"and image visibility"*. Ten minutes, and they are two of the seven criticals.
2. **C7-1** — one clause in AD-26: the key must include the instant, or repeatable transitions cannot
   recur. This is the one that silently breaks FR-17 and FR-53 in production rather than at build
   time.
3. **C7-3 and C7-5** — both inside line 286, both fixed by the rewrite above: `Rule Acceptance` is an
   evidence row written by `api/` asserting nothing about an Agreement; the `Cancellation`'s cause
   arrives on a document flag and defaults to `unspecified`, which AD-13 does not count.
4. **C7-4** — one sentence in AD-16: the `doc_events` handler is the boundary that sets `bypass=True`;
   an argument never travels through Frappe. Delete the outbox-dispatcher clause with it (H7-3).
5. **C7-7** — the design question: cascade 1's transition is a derived day-set, compared and returned
   like cascade 4's flag.
6. **H7-6 + H7-7** — one pass over AD-19 and AD-23: name the two missing jobs, or drop the claim that
   rests on one of them.
7. **The five cuts and the line-286 rewrite** — one editing pass, ~500 words out, three criticals made
   visible.
