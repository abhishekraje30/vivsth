---
review: adversarial
round: 5
target: ARCHITECTURE-SPINE.md (architecture-vivahspot-2026-09-06)
driving_spec: prds/prd-vivahspot-2026-09-03/prd.md (amended 2026-09-06 on FR-62 / UJ-4)
reviewed_against:
  - reviews/review-adversarial-r4.md (round 4, 6 critical / 20 high / 14 medium / 5 low)
  - reviews/review-adversarial-r3.md
reviewer_lens: 'adversarial — two units one level down that each obey every AD to the letter and still build incompatibly'
frappe_claims_verified_against: '/home/abhishekraje30/frappe-bench/apps/frappe @ __version__ 16.33.0'
date: 2026-09-06
verdict: 'CHANGES REQUIRED — 6 critical, 18 high, 14 medium, 3 low. Five of the six criticals are defects in round 5''s own fixes. The pattern the spine warned about holds for the fourth consecutive round, and it now has a specific shape: each fix was adopted as its *mechanism* and dropped its *guard clause*. AD-35 took doc.save() and dropped the compare-and-return. AD-26 took "dispatch after commit" and dropped the durability. AD-33 took "or a person" and dropped the derivation. AD-11 took "one seat" and dropped the completeness test.'
---

# Adversarial Review, Round 5 — Architecture Spine, Vivah Spot

## Method

Unchanged. For each area, construct two units one level down — two epics, two dev agents six weeks
apart — that **each obey every AD to the letter** and still produce something that cannot be
assembled. Every such pair is a hole in the spine, not a defect in the units.

Every finding is marked **[NEW in r5]** or **[STILL OPEN from r4]**. Round-4 findings genuinely
closed are listed in §6 and not re-reported.

**Frappe mechanics were verified against source, not recalled.** The bench at
`/home/abhishekraje30/frappe-bench/apps/frappe` is `__version__ = "16.33.0"` — the tree the spine
cites. Line references are to that tree and were read this round, not carried from r4.

**What is different about this round.** The brief asked five questions about the new material. All
five have a defect behind them, and four of the five defects are the *same shape*: r4 supplied a
tightening in two clauses — a mechanism and the guard that makes the mechanism safe — and the
revision adopted the mechanism verbatim and dropped the guard.

| r4 tightening | Mechanism adopted | Guard clause dropped |
|---|---|---|
| C4-3 | `recompute_discoverable` writes via `doc.save()` | "compares the predicate to the stored flag, **returns immediately when they agree**" |
| C4-6 | "external effects … dispatched **after** commit" | "**keyed idempotently per AD-31**" + any durability or failure semantics |
| C4-5 | a hold names "a record **or a person**" | "placing a hold on a record therefore places a **derived hold on its parties**" |
| C4-4 | "one seat for the whole closure … one transaction" | "a retry **re-derives the closure and compares its cardinality**; a mismatch is a defect" |

The first of those is an unbounded recursion in three sentences of AD-35's own text.

---

## 1. Critical

### C5-1 — `recompute_discoverable` is unbounded self-recursion: `Listing` binds it, and it writes with an unconditional `doc.save()` **[NEW in r5]**

**ADs in play:** AD-35, AD-26, AD-10, AD-20, AD-29, FR-13, FR-53, FR-59.

This is the brief's third question, and the answer is worse than the question anticipates.

AD-35, three consecutive clauses:

> "**`recompute_discoverable(listing)` writes**, and it writes with `doc.save()` — **never `db_set`** …"

> "Its inputs … live on five other documents: **`Listing`** (conditions, withdrawal), `Verification`,
> `Subscription` …, `Vendor` (removal), and `Takedown`. **Each binds `recompute_discoverable`.**"

So `Listing` binds `recompute_discoverable`, and `recompute_discoverable` saves the `Listing`.

**Verified, not recalled.** `Document._save` calls `self.db_update()` (`document.py:608`) and
`self.run_post_save_methods()` (`document.py:612`) **unconditionally** — there is no
skip-if-unchanged branch anywhere in `_save`. `run_post_save_methods` (`document.py:1445`) runs
`on_update` whenever `_action == "save"` (`document.py:1453-1454`). And `frappe.flags.currently_saving`
is **not** a recursion guard: it is appended at `document.py:818` and its only functional read is at
`document.py:1532`, where it suppresses the `modified` bump inside `db_set`. Nothing in Frappe stops
`on_update → doc.save() → on_update`.

**Resulting failure — and it is not a two-unit disagreement, it is one behaviour.** Any binding that
honours AD-35's sentence recurses until Python's recursion limit and 500s the request, taking the
Vendor's ordinary Listing edit with it. Both units build it; neither can ship it; each patches it
privately and differently — unit A adds a compare-and-return (correct), unit B adds
`flags.ignore_recompute` (which then suppresses genuine recomputes when a cascade re-enters), unit C
reverts to `db_set` and silently kills FR-53's notification on all four routes, which is the exact
failure AD-35's `doc.save()` sentence exists to prevent.

The tell is in AD-35's own wording: "they live on **five other documents**" — and the first one
listed is `Listing`, which is not another document. The self-reference was not noticed.

**Tightening.** Restore the clause r4 supplied and the revision dropped:

> `recompute_discoverable(listing)` computes `is_discoverable(listing)`, compares it to the stored
> flag, and **returns without writing when they agree**. Only a genuine transition writes, and it
> writes through `doc.save()`.

That is necessary and not sufficient — see C5-5(c) for what the resulting `Listing.on_update` then
raises.

---

### C5-2 — After-commit dispatch does not survive the savepoint rollback AD-26 mandates: Frappe's `after_commit` queue is not reset by `rollback(save_point=…)` **[NEW in r5]**

**ADs in play:** AD-26, AD-21, AD-29, AD-31, AD-12, FR-53, FR-69.

This is the brief's fifth question. AD-26's C4-6 fix:

> "**Nothing irreversible happens inside the transaction.** … External effects are queued and
> dispatched **after commit**."

**Verified against the only after-commit machinery Frappe has.** `frappe.db.after_commit` is a
`CallbackManager` (`database.py:130`) run at the end of `commit()` (`database.py:1194`), and
`frappe.enqueue(..., enqueue_after_commit=True)` registers on exactly it
(`background_jobs.py:205-207`). Now read `rollback`:

```
1196  def rollback(self, *, save_point=None, chain=False):
1197      """`ROLLBACK` current transaction. Optionally rollback to a known save_point."""
1198      if save_point:
1199          self.sql(f"rollback to savepoint {save_point}")
1200          self.value_cache.clear()
1201      elif not self._disable_transaction_control:
1202          self.before_commit.reset()
1203          self.after_commit.reset()
```

**The reset lives in the `elif`.** A savepoint rollback — the *only* undo AD-26 permits a cascade —
rolls back the rows and leaves every queued effect armed. They fire at the request's eventual
commit.

And the cascade cannot flush or discard them itself: `commit()` returns early with a warning when
`_disable_transaction_control` is set (`database.py:1177-1180`), which is precisely the state a
`doc_events` handler runs in (`document.py:1638-1645`, verified again this round).

**Resulting failure.** Unit A builds FR-53's cascade exactly as AD-26 now prescribes: queue the forty
WhatsApp messages and the CDN demotion as after-commit effects, clear the Selections, adjust the
budgets, all inside the transaction, undoing with a savepoint if anything fails. Something fails.
The rows roll back — the Listing is still discoverable, the Selections are restored, the budgets are
back — and **the forty Families are told the Listing is gone anyway**, because their messages were
never unqueued. FR-53's "No route removes a Listing from a Family's view without telling them" is now
broken from the other side: they are told about a removal that did not happen, and the platform's own
record says nothing was removed.

C4-6 relocated the failure rather than removing it. Before, a rollback lost the rows and kept the
sends; now, a rollback loses the rows and *still* keeps the sends.

**The second half of the question is also unanswered.** AD-26 states no durability, no retry, no
failure semantics, and no owner for the effect queue. "after commit" occurs **once in the entire
spine**. If the dispatch fails after the transaction committed — Redis down at enqueue time, the
WhatsApp send rejected, the worker killed — the rows are permanent and nobody is told. No AD-23 job
sweeps undelivered effects; AD-31 makes effects *safe to retry* without making anything *retry them*.
The Family whose Selection was cleared is not notified and there is no record that she was not.

**Tightening.**

> A cascade's effects are recorded as **rows in the same transaction** — an outbox — and dispatched
> by an AD-23 job that reads that table. A savepoint rollback therefore removes the effects with the
> work, because they are rows. Dispatch is at-least-once, idempotent per AD-31, and an effect that
> has not dispatched after N attempts is an operational alarm, not a silent loss. `frappe.db.after_commit`
> is **not** the queue: `database.py:1198-1203` does not reset it on a savepoint rollback.

---

### C5-3 — AD-12's digest is unbuildable under AD-26's new prohibition **[NEW in r5]**

**ADs in play:** AD-12, AD-26, AD-27, AD-31, FR-40, FR-43.

AD-12, at confirmation (`docstatus` 0 → 1):

> "At that moment an `Agreement Record` row stores the serialised frozen terms verbatim, **the
> document rendered from them at that moment, kept as immutable bytes**, the SHA-256 digest **of those
> rendered bytes**, the digest of the previous row for that Agreement (a hash chain …)"

AD-26, new this round:

> "Savepoints undo database rows only …, so a WhatsApp message sent, a CDN object moved **or an
> Agreement document rendered** survives a rollback that pretends the operation failed. External
> effects are queued and dispatched **after commit**."

AD-26 names the render explicitly. So the render must happen after commit — and the digest of its
bytes must be inside the row that already committed. AD-27 makes `Agreement Record` append-only, and
AD-12 makes it non-deletable and hash-chained.

**Three compliant units, three different broken things.** Unit A renders inside the transaction
(violates AD-26, and a rollback leaves an orphan rendered document that a later confirmation's chain
will not match). Unit B renders after commit and has nowhere to put the digest: the row is
append-only and cannot be updated. Unit C appends a **second** chain row carrying the digest — which
advances the head digest and the record count for a confirmation that happened once, and AD-12's own
anti-tamper reasoning ("deleting the last row … passes AD-23's verification sweep") reads a
count/chain mismatch as tampering.

This is not a corner. FR-40 lets both parties download the stored bytes "at any time", FR-43 makes
the digest the certificate, and AD-12 says the trust model rests on it.

**Tightening.** Rendering is not an external effect in AD-26's sense — it is derived from the terms,
deterministic, and produces bytes the transaction must digest. Carve it out explicitly:

> Rendering the Agreement document is performed **inside** the transaction into a
> transaction-scoped buffer; the bytes and their digest are written as row data, and the object-store
> write of those bytes is the after-commit effect. A rollback discards the buffer with the row.
> AD-26's prohibition covers effects **observable outside the transaction** — sends, moves,
> invalidations — not derivations.

And state, as r4 asked and this revision did not: the chain append is the **last** step of an
amendment, after the occupancy transform has succeeded (M5-1).

---

### C5-4 — AD-26's list of who may write a transition row omits the controller, so Desk's cancel still writes no `Cancellation` row **[NEW in r5, C4-2 reinstated]**

**ADs in play:** AD-26, AD-12, AD-27, FR-42, FR-61.

The brief asks directly: *does the Cancellation row actually get written when an Admin sets docstatus
2 in Desk?* Under AD-26 as written, **no**.

AD-26's invocation clause names the writers:

> "a **named transition row** is written by whichever layer observes it (**`api/`, the scheduler, or a
> fan-out from an upstream document**), and `doc_events` on **that row** is the single invocation."

The **controller is not in that list**. The table row for cascade 3 says the `Cancellation` row is
"written wherever `docstatus` reaches 2 — Desk included", which states a *condition*, not a
*mechanism*, and every mechanism AD-26 authorises is one Desk does not go through.

**Verified: what actually fires on a Desk cancel.** `run_post_save_methods` branches on `_action`
(`document.py:1453-1462`). For `"cancel"` it runs **`on_cancel` only** — `on_update` is *not* run —
plus `on_change`. So the sole hook available on the Desk route is a controller or `doc_events` handler
on `on_cancel`. AD-12 helpfully deleted the prohibition on `on_cancel` this round ("the earlier
prohibition … was a fossil"), but **no AD replaced it with a positive instruction**, and AD-26's
enumeration excludes the layer it lives in.

**Two units.** Unit A follows AD-26's enumeration and writes the row in the `api/` cancellation
method. Admin cancels in Desk under FR-61: no row, no cascade — occupancy never released, the
counterparty never told, the budget never adjusted, no cancellation counted. That is C4-2's failure
verbatim, restored by the fix that was written to close it. Unit B infers the controller (correctly,
via AD-27) and writes the row in `Agreement.on_cancel` — and a careful reviewer flags it as violating
AD-26's enumeration.

**Tightening.** One clause, and it also fixes C5-5(b):

> Where the transition is a document lifecycle event, the transition row is written **by that
> document's controller**, in the hook that fires for every actor — `on_cancel` for a cancellation,
> `on_update` guarded by `has_value_changed` for a field transition. AD-27 governs: the row is the
> integrity constraint, so it lives where Desk cannot walk past it. `api/` and the scheduler write a
> transition row **only** where no document change exists to hang it on.

---

### C5-5 — The named transition rows are un-guarded DocTypes: nothing binds a row to its transition, nothing makes one unique, and Desk can insert one **[NEW in r5]**

**ADs in play:** AD-26, AD-27, AD-31, AD-35, AD-23, FR-53, FR-59, FR-60, FR-61.

Answering the brief's first question in full. Three of six cascades are now invoked by inserting a
row. **No AD gives those rows a controller guard, a uniqueness constraint, or an idempotency key** —
AD-31 requires one of "every state-changing operation" and these rows are the state-changing
operation for half the cascades. Three consequences, all reachable today:

**(a) They can be written twice, on the two most-exercised routes.** *FR-60:* `Vendor.on_update` fires
cascade 5, which "invokes cascade 4 per Listing" — i.e. writes one `Listing Condition Change` row per
Listing. But that same `Vendor.on_update` is also an AD-35 input ("`Vendor` (removal) … binds
`recompute_discoverable`"), whose `doc.save()` raises `Listing.on_update`, which AD-26 names as a
writer of the *same* row ("written **by the Listing**, by the Subscription-lapse job, or by a
Service-level fan-out"). **Two rows per Listing, two cascade-4 runs, every Family told twice.**
*FR-53 route 1:* identically — AD-23's expiry job raises the row, and AD-35's job-driven recompute
raises `Listing.on_update` which raises it again. Unit A writes the row in the cascade; unit B lets
the recompute's save write it; both are compliant, and running both is the default.

**(b) A Desk insert runs the cascade with no transition behind it.** FR-61 gives Admin every
capability and AD-27 exists so the integrity constraint still binds — here there is no constraint to
bind. An Admin inserting a `Cancellation` row in Desk releases a live Agreement's occupancy, tells
the counterparty, and counts a cancellation on both profiles, against an Agreement at `docstatus` 1.
Nothing in the spine says the row's controller must assert that the referenced Agreement is actually
cancelled, that the referenced Listing actually changed state, or that the referenced Agreement was
actually confirmed.

**(c) The rows carry no direction and no predicate.** Cascade 4's row is named *Listing Condition
Change*; the cascade is *"A Listing leaves discovery"*. FR-59 requires the other direction too — "stops
being discoverable **until it does again**". Nothing says the row carries which way it went, so unit
A's renewal notifies every Family that the Listing is gone. And nothing says the row is written only
on a real transition, so — even with C5-1 fixed — a Vendor editing his price raises `Listing.on_update`,
which AD-26 makes a writer of the row, which notifies forty Families. Unit B adds the predicate
privately and unit A does not.

**Tightening.** Give the three rows a stated shape in AD-26:

> A transition row names the entity, the transition **and its direction**, is unique on
> `(entity, transition, direction, idempotency key)`, and its controller asserts the transition
> actually occurred — an `Agreement` at `docstatus` 2 for a `Cancellation`, a changed
> `is_discoverable(listing)` for a `Listing Condition Change`, a confirmed `Agreement` for a
> `Rule Acceptance`. The row is written by exactly one layer per trigger, named in the table.

---

### C5-6 — A hold on a record still does not stop AD-14's erasure de-identifying its parties **[STILL OPEN from r4 — C4-5]**

**ADs in play:** AD-33, AD-14, AD-27, NFR 5.5, FR-43, FR-63.

AD-33 now permits a hold to name "a record **or a person**", and diagnoses the failure in its own
words:

> "A hold on a **person** is what makes it work at all: AD-14's erasure writes one field on the person
> record and would never touch a held Agreement, **so a hold placed only on records is defeated by a
> fully compliant erasure.**"

It states the failure and does not close it. r4's operative sentence — *"Placing a hold on a record
therefore places a **derived hold on its parties**, recorded as such and lifted with it"* — was not
adopted. Making the correct action **possible** while leaving it **optional** is not an invariant; it
is the definition of a convention, and AD-1's own framing ("what actually enforces it") is the
standard the spine set for itself.

**The scenario is unchanged and still runs.** A court order names the Agreement and its `Agreement
Record` chain — that is what a preservation order names. Kiran places the hold on those records,
because that is what she was ordered to preserve, and AD-33 permits it. The counterparty then
exercises erasure. AD-14 writes one field on the person record. No hold covers it. **The evidential
value the court ordered preserved is gone, by a compliant write, with no error and no log entry
naming the hold** — and now with an AD that told the operator, in prose, that this would happen.

Unit A implements exactly what is written: two hold kinds, both honoured, neither implying the other.
Unit B reads the diagnostic sentence as an instruction and derives the person hold. Two schemas, and
A's is the literal one.

**Tightening.** As r4:

> A hold on a record places a **derived hold on every person whose de-identification would reduce
> that record's evidential value**, recorded as derived, lifted with the parent. An erasure that
> would de-identify a party to a held record is refused under NFR 5.5 and the person is told which
> basis applies.

---

## 2. High

### H5-1 — The guard key is ambiguous, and under the natural reading it never fires for the three cascades that compose **[NEW in r5]**

The brief's second question, part one. The key is `(cascade_name, doctype, docname)` — of **which**
document? For cascades 1, 5 and 6 the transition *is* a change to the affected document and the two
readings coincide. For cascades 2, 3 and 4 the transition is a **freshly inserted row**, so under the
natural reading — the document `doc_events` fired on — the docname is new on every invocation and the
key is unique every time. **The guard is a no-op for exactly the three cascades that compose.** Under
the other reading (the affected entity: the Agreement, the Listing) it works. Two units, two readings,
one with no re-entrancy protection at all.

**The fan-out question is genuinely answered, though.** Cascade 5 → cascade 4 across four Listings
yields four distinct keys under *both* readings — `(4, Listing, L1..L4)` or `(4, Listing Condition
Change, LCC-1..4)`. C4-1's fan-out defect is closed. It is closed by the docname component, which is
also what defeats the guard in H5-1's first paragraph.

### H5-2 — The declared composition graph is not the actual graph: the budget re-enters cascades 1 and 6 **[NEW in r5]**

AD-26 declares composition as exactly **1→3, 2→3, 5→4, 6→3**, and the word "stated" is doing
load-bearing work ("Composition is allowed and stated"). But cascades 1, 2, 3, 4 and 6 all adjust the
running budget (FR-8, FR-17, FR-32, FR-42, FR-53); AD-19 makes `recompute_budget(wedding)` the only
writer; and any write to the Wedding raises `Wedding.on_update`, which AD-26 names as the transition
for **both cascade 1 and cascade 6**. So the real graph contains **3→1** and **3→6** — two edges the
spine declares do not exist, running the two most destructive cascades off the cheapest write in the
system. The loop terminates only under H5-1's second reading of the key.

### H5-3 — Cascades 1, 5 and 6 hang off a bare `on_update` with no field predicate, which AD-26's own rationale forbids **[NEW in r5]**

AD-26 argues for named rows by saying bare `on_update` is not the same route: *"binding `on_update` of
the affected document is not, because Desk can change that document without the transition."* It then
binds three of six cascades to bare `Wedding.on_update` and `Vendor.on_update`. `has_value_changed`
occurs **zero times** in the spine. Unit B binds as written: **every Wedding save cancels every
Agreement in the Wedding** (cascade 1 is "Chosen Block change") and runs conclude-or-abandon (cascade
6). Unit A adds the field test privately. The spine states the reason the bare binding is wrong and
then uses it.

### H5-4 — `recompute_budget` has a single writer and no invoker, and it races itself into `TimestampMismatchError` **[NEW in r5]**

The brief's fourth question. AD-19 names the writer and enumerates **no bindings** — the treatment
AD-35 was given this round and AD-19 was not. Its inputs sit on `Selection`, `Agreement`,
`Wedding Function` (stated guest counts, FR-11), `Listing` (per-head price) and the Family's own
rows; five cascades are required by the PRD to adjust it; and AD-19's *"Nothing else writes the total
— not a cascade"* forbids the cascade from writing while authorising nothing to call.

**On the race, verified.** Two Vendors confirm two Agreements for the same Wedding in two workers.
Both recompute and save the Wedding. `check_if_latest` (`document.py:1088`) compares the DB's
`modified` to the in-memory `_original_modified` and raises `frappe.TimestampMismatchError`
(`document.py:1113`). Inside a `doc_events` handler that propagates out of the *confirmation* — so
one Vendor's confirmation fails with "has been modified after you have opened it", for a reason that
has nothing to do with his Agreement, after AD-11's occupancy reasoning has run. A unit avoiding that
with `db_set` gets a lost update instead, and AD-26 notes `db_set` raises no `doc_events`. AD-19
states neither the invocation nor the concurrency discipline.

### H5-5 — AD-19 models a Family's adjustment as an extra row and never says it replaces the derived figure **[NEW in r5]**

FR-8 grants two distinct acts: *"She can adjust any figure the platform derived, **and** can add a
cost the platform knows nothing about."* AD-19 collapses them into one: *"Figures the Family has
adjusted or added themselves are their own rows: the function includes them and never overwrites
them."* Unit A adds — a ₹2.4L lawn the Family corrects to ₹2.6L totals ₹5.0L. Unit B replaces. FR-8
has explicit replacement semantics stated for the Agreement case ("replaces the Selection's estimated
figure with the agreed one") and none here, and the H4-19 fix closed the overwrite half while
creating the double-count half.

### H5-6 — "One seat for the whole closure" declines a Span the Vendor can actually serve **[NEW in r5]**

AD-11's C4-4 fix requires every row of a closure to take **"the same seat number on every one"**.
`concurrent_capacity = 2`, a photographer with two crews: crew 0 is booked on the 25th, crew 1 on the
26th. A Span across 25–26 has no single seat free on both rows and is **declined** — although both
days have capacity and the Vendor could put crew 1 on the 25th and crew 0 on the 26th. AD-11 justifies
the single seat purely on retry grounds and never acknowledges that it converts a capacity count into
a per-closure crew assignment, on the exact multi-crew case its own Prevents cites ("a photographer
can shoot two weddings a day"). Unit B reads the capacity rationale and implements per-row
lowest-free-seat, re-opening C4-4.

### H5-7 — C4-4's completeness test was dropped; a retry that re-derives a different closure hits the same-holder no-op and reports success **[STILL OPEN from r4]**

AD-11 now argues the no-op is safe because *"the set is inserted atomically, so a retry sees either the
complete set or none of it."* That is true of the set **as written** and not of the set **as
re-derived**. The closure is derived from the Functions the Service serves (AD-10, AD-11: "from the
first served Function's start Slot to the last one's end"), and FR-9 and FR-17 let the Family move
Functions. A retry after such a move derives a *different* closure, collides with the Agreement's own
row from the old one, takes the same-holder no-op branch and **returns success** — holding the old
days while the Agreement's terms name the new ones. r4's tightening carried the guard ("a retry
re-derives the closure and compares its cardinality to the rows held; a mismatch is a defect, not a
success") and the revision replaced it with the atomicity argument alone. AD-31's idempotency key
does not help: nothing says a retry replays a stored response rather than re-deriving.

### H5-8 — AD-35 still claims AD-29 as a caller of `is_discoverable`, while AD-20 now defines AD-29's predicate as three image-level terms **[STILL OPEN from r4 — H4-3]**

The H4-4 fix landed cleanly and, in landing, made this contradiction explicit. AD-20 now owns
`is_publicly_visible(image)` = verified ∧ within allowance ∧ not taken down — **no listing term**.
AD-35's closing paragraph still reads: *"AD-10's subscription gate, AD-20's public read path, AD-26's
cascade 4, AD-27's conditions of listing and **AD-29's public-object predicate** all call
`is_discoverable`."* If AD-29 calls it, a Subscription lapse **physically moves every portfolio object
out of the public path with CDN invalidation** (AD-29 forbids a flag beside an already-public URL) —
against FR-53's *"Nothing belonging to the Vendor is destroyed … portfolio … retained and reappear
intact on renewal"*, and against the open Enquiry thread FR-53 keeps answerable, whose Family loses
the portfolio she is corresponding about. If it does not, AD-35's sentence is false and one of its
five claimed callers is not a caller. Delete AD-29 from that list.

### H5-9 — "Within the Tier's allowance" is a rank predicate whose ranking population is unstated **[NEW in r5]**

AD-20 states the three terms as a conjunction and defines the allowance as *"the first N of the
Vendor's own ordering"*. First N of **which set**? Unit A ranks all M images, takes the first N, then
applies the other two terms — a pending image consumes a slot, and a court-ordered takedown of image
#1 leaves four visible. Unit B ranks the *eligible* subset — so a takedown **promotes image #6 into
publication**, which is a takedown causing a publication. Both implement "the first N of the Vendor's
own ordering", and the two published sets differ on every Listing that has ever had a pending or
taken-down image. Also unstated: what populates the ordering for images uploaded before it existed —
r4 asked for "defaulting to upload order" and *upload order* occurs **zero times**.

### H5-10 — Ancestor-or-self returns zero venues for a Wedding whose Place is a district **[STILL OPEN from r4 — H4-5, half closed]**

AD-36 fixes the direction, which was half of H4-5: *"the area is that Place **or an ancestor of it**"*,
with the `lft`/`rgt` span containment stated. r4 also asked it to *"name what happens when the
Wedding's Place is at a higher level than the Listing's"*, and it does not. A Family who has not yet
picked a town holds a district-level Place — FR-13 explicitly contemplates browsing before the dates
are settled and nothing requires the Place to be a leaf. Every Venue is a leaf serving the place it
stands in, and no leaf is an ancestor of a district. **She sees zero venues**, at launch, in the
Service the product exists for, and FR-20 ranks whatever set this predicate returns, so nothing
downstream disagrees visibly.

### H5-11 — AD-36 contradicts itself on where a Rule lives, and AD-6 still keeps Rules on the Listing **[NEW in r5]**

Within one AD: *"**A Rule attaches where the engagement does:** to the **Space** where the Service has
Spaces, to the Listing where it does not"* and, four paragraphs later, *"**A Rule is a typed row on the
Listing**, never prose alone."* AD-6's core enumeration also lists Rules as a Listing field ("Vendor,
Service, all-in price, **Rules**, Commitment, …"), and FR-23's Space contents (capacity, Stated Size,
price, calendar) do not include them. H4-7's fix was written into one sentence and not into the two
that contradict it — so Dattatray's lawn-only catering restriction is expressible under one sentence
of AD-36 and not under the other, or under AD-6.

### H5-12 — The permitted set is snapshotted at confirmation; FR-32's warning was shown at acceptance **[NEW in r5]**

AD-36 snapshots at confirmation and AD-26 correctly fires cascade 2 at confirmation (FR-32's
load-bearing timing). But the Family **accepted a named consequence set at acceptance time**. A Vendor
who narrows his Preferred list in the interval causes the cascade to remove Shortlist entries and
cancel Agreements the Family was never shown by name — against FR-32's *"Nothing is ever removed
silently. The Family never discovers a Vendor missing from their Shortlist without having been told
why and having agreed to it."* Neither AD says the cascade acts on the set the Family was shown, nor
that a divergence between the accepted set and the confirmation-time set re-prompts. The H4-8 fix
moved the race from post-engagement to pre-confirmation and left it a race.

### H5-13 — AD-13 is still a counter, and AD-27's new procedure now classifies it as derived **[STILL OPEN from r4 — H4-10]**

AD-13 is unchanged: *"its own explicit field, written only by an actual cancellation, displayed over a
rolling 24 months."* A counter cannot be rolled. AD-27's new question 2 answers the append-only half
correctly — the count is current state recomputed from cancellation records, which are (1) — and
therefore requires the events to exist. AD-13 still prescribes the field. The new decision procedure
and the AD it most obviously governs now give opposite answers, and AD-27's worked cases do not
include this one.

### H5-14 — `held_by` is still typed as an Agreement, so FR-28's Vendor block has nowhere to live and the retry branch has an undefined third case **[STILL OPEN from r4 — H4-15]**

Verified: *block Slots* and *vendor-declared* occur **zero times**; `held_by` is "the Agreement holding
it"; "cancellation deletes the rows held by that Agreement and nothing else". FR-28 grants without
qualification: *"A Vendor can block Slots for maintenance, family use or any reason, without stating
one."* The C4-4 fix **hardens** the two-case branch (same Agreement → no-op; another Agreement →
advance) and still has no third case. Unit A reads "not the same holder" as advance and books over the
Vendor's daughter's wedding; unit B reads "not another Agreement" as the no-op branch and reports a
successful confirmation holding nothing.

### H5-15 — AD-10 still never defines "free" and still never mentions a seat **[STILL OPEN from r4 — H4-16]**

Verified: `seat` and `concurrent_capacity` appear nowhere in AD-10; its table asks "Is every
`(day, slot)` … free?". Unit A reads `NOT EXISTS`; unit B reads `count < concurrent_capacity`. Under A
the photographer's second crew never sells and AD-11's entire reason for existing is defeated on the
read side. FR-20 makes availability the first ranking signal, so the catalog's ordering depends on
which unit shipped first. Third round.

### H5-16 — `WEDDING_SERVICE` exists in the ERD and in no AD; the Service→Function mapping is still not modelled **[STILL OPEN from r4 — H4-17, partially closed]**

The ERD gained `WEDDING ||--o{ WEDDING_SERVICE` and correctly re-hung `SHORTLIST` off it. But the
Function set is carried in a **relationship label** — "selected; whole wedding or named Functions" —
not a relationship: there is no `WEDDING_SERVICE }o--o{ WEDDING_FUNCTION` and no cardinality. AD-10
("only the Functions that Service serves within the Block"), AD-11 ("the first served Function's start
Slot"), AD-19 ("the stated guest count of the Functions that Service serves") and AD-36 all read that
mapping, and H5-7 shows it is now load-bearing for occupancy correctness. *"Wedding Service"* occurs
zero times in prose and FR-68 is cited **zero times** in the spine.

### H5-17 — AD-32's access-log retention now contradicts AD-27's own decision procedure **[NEW in r5]**

AD-32 closes H4-12 by deciding *"The log's own retention matches the Guest data it describes"* — so the
record of who read Guest contact data is destroyed with the data, 30 days after the Wedding concludes.
Now run AD-27's question 1 on that log: *would its absence change what a regulator, a court or a
counterparty could establish about what happened?* Plainly yes — it is the only evidence FR-61's
"access … is logged" was ever honoured, and it is what NFR 5.5 will be judged on. Question 1 makes it
append-only and retained; AD-32 erases it. Two ADs, two answers, and the new procedure was supposed to
be the tie-breaker.

### H5-18 — AD-16's cascade carve-out is still scoped by module, not by operation **[STILL OPEN from r4 — H4-1]**

Verified unchanged: *"`frappe.get_all`, **only inside `domain/`**"* and *"The cascade bypass is confined
to `domain/` and exists nowhere else."* Unit B passes ids down to a `notifications/` module, which is
not in `domain/`, so per rows 1 and 2 it must use `get_list`, and running as the withdrawing Vendor it
resolves nothing. FR-53's notification is empty again, one call below the carve-out. With C5-2's
after-commit dispatch this gets worse, not better: the effect now runs in a worker where the reading
context is further removed from the cascade that authorised it.

---

## 3. Medium

**M5-1 — AD-12 still does not state whether the chain append or the occupancy transform comes first [STILL OPEN from r4 — M4-4].** C5-3 makes the ordering load-bearing rather than merely unstated.

**M5-2 — `concurrent_capacity` is still absent from AD-6's core enumeration and still not a condition of listing [STILL OPEN from r4 — M4-6, H3-10].** AD-11 says it is "declared by the Vendor, minimum 1, and never implicitly defaulted"; FR-59's conditions of listing do not include it and AD-6's core field list does not carry it, so nothing stops a Listing publishing without one and AD-11's "never implicitly defaulted" has no gate to fail at.

**M5-3 — AD-16 still requires every cascade write to record "the person who triggered it"; three of FR-53's four routes have no person [STILL OPEN from r4 — M4-7].** C5-2's after-commit dispatch adds a fourth context with no person: the worker.

**M5-4 — Cascade composition still has no signature and no reason parameter [STILL OPEN from r4 — M4-9].** FR-60 requires cascade 4, when invoked from cascade 5, to tell the Family the Vendor was *removed* rather than that a Listing is gone — a difference the PRD states explicitly and the composition graph cannot carry.

**M5-5 — "Cleared in a `finally`" does not say *its own key only* [NEW in r5].** A `finally` that resets `frappe.flags.<guard>` wholesale breaks the nesting AD-26 authorises in the same paragraph: cascade 3, returning to cascade 2, would have cleared cascade 2's key.

**M5-6 — AD-11's seat-advance loop is MariaDB-dialect-dependent and hosting is still deferred [STILL OPEN from r4 — M4-2].** Compounded by H5-6: one seat per closure means each failed seat attempt must be undone, and AD-11 does not say how (savepoint per attempt, or delete-what-was-inserted).

**M5-7 — The Site Visit is still unmodelled [STILL OPEN from r4 — M4-14].** *Site Visit* occurs zero times; AD-11 still does not say it takes no Slot.

**M5-8 — AD-36's snapshot lands "onto the Agreement" and a Family holds several [NEW in r5].** Nothing says how conflicting snapshots from two engaged Vendors combine, and FR-25's *"Once a Family has engaged a Vendor, that Vendor's Preferred Vendors are surfaced distinctly to them"* becomes unreachable for anyone added after confirmation, because the snapshot is the only set the platform reads.

**M5-9 — AD-26's enumeration is still closed at six [STILL OPEN from r4 — M4-8].** FR-68's *"Removing a Service from a Wedding removes its Shortlist. Where an Agreement exists for it, FR-32's warn-and-accept applies"* is a seventh cross-entity operation spanning Wedding, Shortlist, Selection, Agreement and budget, with no cascade and no transition row.

**M5-10 — AD-35 says its inputs "live on five **other** documents" and lists `Listing` first [NEW in r5].** The wording is the tell for C5-1 and should be corrected with it.

**M5-11 — Admin opening a Place renumbers the NestedSet tree at runtime [STILL OPEN from r4 — M4-3].** AD-36 now makes `lft`/`rgt` the coverage predicate, so every cached or denormalised span is invalidated by an act FR-62 promises needs no release.

**M5-12 — AD-36 introduces vocabulary AD-24's binding Glossary does not carry [STILL OPEN from r4 — M4-13].** *Place*, *Preferred Vendor*, `restrict_service`, *Takedown*, *Legal Hold*, *Rule Acceptance*, *Cancellation*, *Listing Condition Change* — the last three created this round, and AD-24 says the Glossary is binding on "every DocType name".

**M5-13 — AD-22 still states the shrinkage target as "the Service-and-Place average" with no ladder; AD-36 carries the ladder [NEW in r5].** One fact, two homes, and a builder implementing ranking reads AD-22. The H4-6 fix put the correction in the AD that was being amended rather than the AD that is wrong.

**M5-14 — AD-35's Grace-Period boundary is still a scheduled window, not an evaluated one [STILL OPEN from r4 — H4-2, partially closed].** The input enumeration landed, but Grace ends at a per-Vendor timestamp while the flag moves when "AD-23's expiry job" runs. In between, search returns the lapsed Listing and AD-10 shows dates — FR-13 says "shows **no dates at all**". AD-35 states no relationship between the job's schedule and the boundary, and no requirement that `is_discoverable` be evaluated live at the read path for the Grace term.

---

## 4. Low

- **AD-20's "the Vendor's own ordering" names no field and no default.** See H5-9; the low half is that nothing says the ordering is Vendor-editable, which FR-27 implies and no AD states.
- **The review-history table needs a round-5 row**, and the standing sentence *"assume this round did too"* has now been confirmed for the fourth consecutive round — it should be promoted from a caveat to a stated property of this document.
- **"after commit" occurs once in the entire spine**, inside AD-26. Four ADs now depend on that dispatch (AD-12, AD-21, AD-26, AD-29) and it has no name, no owner and no AD of its own. See C5-2.

---

## 5. The brief's five questions, answered directly

**1 · The named transition rows — who writes them, can they be written twice, can Desk bypass them, and does the Cancellation row get written when Admin sets docstatus 2 in Desk?**

*Who writes them:* AD-26 enumerates `api/`, the scheduler and an upstream fan-out — and **omits the
controller**, which is the only layer Desk goes through. **C5-4.**

*Twice:* yes, demonstrably, on the two most-exercised routes. FR-60 and the Subscription-lapse route
each have two authorised writers for the same row — the cascade/job per AD-26 and AD-23, and
`Listing.on_update` per AD-26's own "written by the Listing", raised by AD-35's `doc.save()`. Every
Family is told twice. **C5-5(a).**

*Can Desk bypass them:* yes for cascade 3 under AD-26's literal enumeration (**C5-4**), and worse —
Desk can also *forge* one, because the rows are ordinary DocTypes with no controller guard asserting
the transition occurred. **C5-5(b).**

*Does the Cancellation row get written on a Desk cancel:* **not under AD-26 as written.** Verified:
`_action == "cancel"` runs `on_cancel` and `on_change` only (`document.py:1453-1462`) — `on_update`
does not fire — so the only available mechanism is a controller/`doc_events` hook on `on_cancel`,
which AD-12 stopped forbidding this round but which no AD now positively requires and AD-26's writer
list excludes.

**2 · The `(cascade, doctype, docname)` guard key — does it permit the 5→4 fan-out across four Listings, and does it stop FR-32→FR-42→? looping?**

*Fan-out:* **yes.** Four Listings give four distinct docnames under either reading of the key. C4-1 is
closed on this point.

*Looping:* **partially, and only under one of two readings.** The key's `doctype`/`docname` are
ambiguous between the transition document and the affected entity; under the natural reading the three
row-invoked cascades (2, 3, 4) never share a key and the guard is a no-op for them (**H5-1**). And the
declared graph is not the actual graph: `recompute_budget` raises `Wedding.on_update`, adding **3→1**
and **3→6**, which AD-26 declares do not exist (**H5-2**). The FR-32→FR-42 chain itself terminates —
cascade 3 does not call cascade 2 — but it reaches cascade 1 and cascade 6 through the budget, and
terminates there only under the affected-entity reading.

**3 · `recompute_discoverable` via `doc.save()` — does it raise `Listing.on_update`, does that raise a `Listing Condition Change` row, and is that a loop?**

*Raises `on_update`:* **yes, unconditionally** — `_save` calls `db_update()` and
`run_post_save_methods()` with no skip-if-unchanged branch (`document.py:608,612`), and
`currently_saving` is not a recursion guard (`document.py:818,1532`).

*Is it a loop:* **yes, and a direct one.** AD-35 names `Listing` among the documents binding
`recompute_discoverable`, so `Listing.on_update → recompute_discoverable → doc.save() →
Listing.on_update` recurses without termination. AD-26's guard does not cover it — `recompute_discoverable`
is not a cascade. r4's compare-and-return clause was dropped. **C5-1.**

*Does it raise the row:* **yes, and that is the second defect.** AD-26 names "the Listing" as a writer
of the `Listing Condition Change` row, with no direction and no transition predicate, so every Listing
save — a price edit included — notifies every Family that the Listing is gone. **C5-5(a),(c).**

**4 · `recompute_budget` — what invokes it, and can it race itself?**

*What invokes it:* **nothing named.** AD-19 enumerates no bindings at all, which is the treatment
AD-35 received this round and AD-19 did not, while forbidding the five cascades that must adjust the
budget from writing it. **H5-4.**

*Can it race:* **yes.** Two concurrent Agreement confirmations on one Wedding both save it;
`check_if_latest` raises `frappe.TimestampMismatchError` (`document.py:1088,1113`) inside a
`doc_events` handler, failing one Vendor's confirmation for a reason unrelated to his Agreement. The
`db_set` alternative is a silent lost update. **H5-4.** Separately, AD-19's treatment of a Family's
adjustment as an additional row double-counts every corrected figure. **H5-5.**

**5 · After-commit effect dispatch — what happens if the effect fails after the transaction committed?**

**The spine does not say, and the mechanism is worse than unspecified.** Frappe's only after-commit
queue, `frappe.db.after_commit`, is **not reset by `rollback(save_point=…)`**
(`database.py:1198-1203`) — the reset lives in an `elif` the savepoint path skips — so effects queued
by a cascade that then savepoint-rolls-back **still fire**. Forty Families are told a Listing is gone
that is still live, which is FR-53's promise broken from the other side. And a dispatch that fails
*after* commit has no outbox, no retry, no alarm and no record: the rows are permanent and nobody is
told. **C5-2.**

---

## 6. Verified closed since round 4 — not re-reported

- **H4-4** — `is_publicly_visible(image)` now exists in AD-20 with three terms, AD-29 defers to it, and the allowance is defined as the first N of the Vendor's ordering. Closed as a *definition* (see H5-9 for the ranking population, and H5-8 for the AD-35 sentence the fix exposed). Third round of asking; genuinely landed.
- **H4-6** — the travelling Vendor's Place for AD-22 and FR-57 is where the business sits, matching FR-62's Subscription-price matrix. Unambiguous, and consistent with the PRD.
- **H4-9** — AD-27's noun is replaced by a three-question procedure with three worked cases. This is the single best fix of the round: the procedure is runnable, the ordering of the questions matters and is right, and the worked cases are the three that divided people. Residual: H5-13 (AD-13 not brought into line) and H5-17 (AD-32 not brought into line).
- **H4-11** — hold status is evaluated at execution, a refused erasure stands refused, and the person is told. All three of (a), (b) and (c) answered. The chosen branch on (c) — no standing request — is a real decision with a DPDP cost, and is worth one sentence of accepted-cost framing rather than being left as a bare rule.
- **H4-12** — affected people are enumerated from the data model rather than the log, and the log's retention is decided. Closed as stated; see H5-17 for the AD-27 conflict the decision creates.
- **H4-13** — a Guest is a person record with a purpose-limited outcome, and the ERD now carries `PERSON ||--o| GUEST`. Reconciles AD-14, AD-32 and the ERD.
- **H4-14** — the guest carve-out is reconciled: the takedown record is retained, the contacted datum erased on schedule.
- **H4-18** — the ERD hangs `ENQUIRY` off `WEDDING` with `SELECTION }o--o| ENQUIRY : "may follow from"`. FR-34's five caterers no longer force five Selections.
- **M4-1** — AD-23 now says every job "raises a transition row rather than performing cascade work itself", and the misdescribed roster is gone.
- **C4-1 (fan-out half)** — the key's docname component permits 5→4 across four Listings, and the composition graph is stated. The lifetime is fixed in a `finally` with the `frappe.flags` scoping verified (`frappe/__init__.py:168-171`, confirmed this round).
- **C4-2 (cascades 2 and 4)** — cascade 2 firing on confirmation rather than acceptance is correct and its rationale is exactly FR-32's. The Service-level fan-out gives route 4d the transition it lacked. Only cascade 3's Desk route remains open (C5-4).
- **C4-3 (the split)** — `is_discoverable` pure / `recompute_discoverable` writing is the right split, and the five input documents are enumerated. The write is unguarded (C5-1).
- **AD-12's `on_cancel` fossil** — deleted, correctly. Nothing replaced it (C5-4).

---

## 7. Round-1..r4 items still open, in one place

| Item | First raised | Status |
|---|---|---|
| Vendor Slot block (FR-28) has no holder type | H3-4 → H4-15 | **H5-14** — third round |
| AD-10 never defines "free"; no seat, no capacity | H3-6 → H4-16 | **H5-15** — third round |
| Service→Function mapping (FR-68) unmodelled | H-5 → H4-17 | **H5-16** — entity added, mapping still absent |
| Running budget owner | H-7 → H4-19 | **H5-4, H5-5** — writer named, invoker and semantics absent |
| AD-16 carve-out scoped by module | H4-1 | **H5-18** |
| Three-homes criterion; controller rules over `session.user` | H3-8 → H4-20 | still open — `session.user` and "document state" occur zero times |
| AD-13 rolling count | H4-10 | **H5-13** |
| AD-29 as a caller of `is_discoverable` | H4-3 | **H5-8** |
| `concurrent_capacity` in AD-6 / as a condition of listing | H3-10, M3-3 → M4-6 | **M5-2** |
| Cascade composition signature / reason | M3-9 → M4-9 | **M5-4** |
| AD-26 enumeration closed at six | H3-5 → M4-8 | **M5-9** |
| Site Visit | M3-7 → M4-14 | **M5-7** |
| Chain-append vs occupancy-transform ordering | M4-4 | **M5-1** |
| MariaDB-dialect retry loop | M4-2 | **M5-6** |
| Place tree renumbering | M4-3 | **M5-11** |
| Cascade writes and "the triggering person" | M4-7 | **M5-3** |
| AD-36 vocabulary vs AD-24 | M4-13 | **M5-12** |

---

## 8. Shortest path

1. **C5-1** — one clause in AD-35: `recompute_discoverable` compares and returns when the predicate
   agrees with the flag. This is a recursion in the shipped text; nothing else in AD-35 matters until
   it is written.
2. **C5-4 + C5-5** — one pass over AD-26's transition rows. Add the controller to the writer list and
   name the hook per cascade; give each row a direction, a uniqueness key and a controller guard
   asserting the transition actually occurred; name exactly one writer per trigger so FR-60 and the
   lapse route stop double-firing. This is the same pass that closes the brief's first question in
   full.
3. **C5-2** — replace `frappe.db.after_commit` with an outbox table written in the same transaction
   and drained by an AD-23 job. Cite `database.py:1198-1203` so nobody rediscovers that a savepoint
   rollback does not unqueue. State what happens when a dispatch fails: at-least-once, idempotent,
   alarmed.
4. **C5-3** — carve rendering out of AD-26's prohibition as a derivation rather than an external
   effect, and state the ordering M4-4 asked for. Two sentences, and AD-12's chain becomes buildable
   again.
5. **C5-6** — one sentence in AD-33: a hold on a record derives a hold on its parties. The diagnosis
   is already in the AD; only the derivation is missing.
6. **H5-2 + H5-3 + H5-4** — one pass over the `Wedding.on_update` triangle: a field predicate on
   cascades 1, 5 and 6; `recompute_budget`'s bindings enumerated the way AD-35's now are; and a stated
   concurrency discipline for the Wedding total. These three are one problem seen from three ADs.
7. **H5-6 + H5-7** — AD-11's closure: say whether one seat per closure is intended given the multi-crew
   cost, and restore r4's completeness test for the re-derived retry.
8. **H5-8 + H5-9 + H5-11 + H5-13 + H5-17** — the follow-through pass. Five ADs now contradict a fix
   that landed correctly somewhere else: delete AD-29 from AD-35's caller list, name the ranking
   population for the allowance, remove AD-36's and AD-6's Listing-only Rule sentences, bring AD-13
   under AD-27's procedure, and decide the access log under it too. Each is one sentence, and each is
   a fix that was written in one AD and not propagated to the AD it invalidated. **This is the class
   of defect that has produced the next round's criticals four rounds running.**
9. **H5-10 + H5-16** — the two shape questions the spine still reads and does not model: what a
   district-level Wedding Place matches, and the Service→Function mapping four ADs depend on.
