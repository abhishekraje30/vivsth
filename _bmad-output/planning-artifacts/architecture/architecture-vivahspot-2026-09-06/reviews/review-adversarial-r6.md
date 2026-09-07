---
review: adversarial
round: 6
target: ARCHITECTURE-SPINE.md (architecture-vivahspot-2026-09-06)
driving_spec: prds/prd-vivahspot-2026-09-03/prd.md
reviewed_against:
  - reviews/review-adversarial-r5.md (round 5, 6 critical / 18 high / 14 medium / 3 low)
  - reviews/review-adversarial-r4.md, -r3.md, review-closure.md, review-adversarial.md
reviewer_lens: 'adversarial — two units one level down that each obey every AD to the letter and still build incompatibly'
frappe_claims_verified_against: '/home/abhishekraje30/frappe-bench/apps/frappe @ __version__ 16.33.0'
date: 2026-09-06
method_under_test: 'round-5 Tightening blocks applied verbatim rather than paraphrased'
verdict: 'CHANGES REQUIRED — 7 critical, 18 high, 15 medium, 4 low. The verbatim method WORKED on its target: 23 of 24 tightenings landed as written and only one guard clause was dropped again (H5-5). 13 of 24 findings are fully closed, 10 partially, 1 not closed — the best closure rate of six rounds. It did not work on the spine: all seven new criticals are defects in round-6 tightenings, and five of the seven arise from two tightenings landing in the same AD without being read against each other. The failure mode changed from "the guard clause was dropped" to "the sentence the tightening contradicts was not deleted."'
---

# Adversarial Review, Round 6 — Architecture Spine, Vivah Spot

## Method

Unchanged. For each area, construct two units one level down — two epics, two dev agents six weeks
apart — that **each obey every AD to the letter** and still produce something that cannot be
assembled.

Every finding is marked **[STILL OPEN from r5]** or **[NEW in r6]**.

**Frappe mechanics were re-verified against source this round, not carried.** The bench at
`/home/abhishekraje30/frappe-bench/apps/frappe` is `__version__ = "16.33.0"`. Every line reference
the spine newly acquired was checked: `database.py:1196-1203` (the `after_commit.reset()` in the
`elif`) is accurate; `customize_form.py:343` (`allow_on_submit`) is accurate;
`frappe/__init__.py:169` (`local.flags`) is accurate; `document.py:959` for the Administrator
`permlevel` exemption is one line off (the guard is at 957-958, in
`apply_fieldlevel_read_permissions`) but the claim is correct.

**What was verified in the affirmative, because C5-1's fix depends on it.** A nested `doc.save()`
on the same in-memory document inside its own `on_update` does **not** raise
`TimestampMismatchError`: `_save` calls `set_user_and_timestamp()` at `document.py:586` **before**
`check_if_latest()` at `:588`, and `set_user_and_timestamp` re-points `self._original_modified` at
the current `self.modified` (`:797-798`) — which the outer save already advanced to the value now in
the database. So the compare-and-return in AD-35 is sufficient to terminate the recursion, and the
second-order failure I might have predicted does not exist. C5-1 is genuinely closed.

---

## 0. Did the verbatim method work?

**On its target, yes, and decisively.** Of the twenty-four tightenings, **twenty-three landed as
written**, most of them word for word. The r5 diagnosis — "each r4 tightening was adopted as its
*mechanism* and shipped without its *guard clause*" — has **exactly one** recurrence this round
(H5-5, §2.8), against five in round 5. That is the single clearest improvement in six rounds and it
should be kept.

**On the spine, no.** All seven new criticals are defects in round-6 material, and the mechanism is
visible in the text:

- A tightening was **inserted next to the sentence it contradicts**, and the old sentence was not
  deleted. AD-11 line 153 now opens *"One seat for the whole closure"* and continues *"each takes
  the lowest free seat on its own row"* — in one paragraph, in consecutive clauses (C6-2). AD-36
  line 410 states three mutually incompatible coverage rules in five sentences (C6-7).
- A tightening was **written against a mechanism a later tightening in the same AD abolished.**
  AD-26 replaced after-commit dispatch with an outbox in the paragraph at line 301, and the
  render carve-out two lines below at 303 still ends *"the object-store write of those bytes is the
  after-commit effect"* (C6-4).
- A tightening **landed in one AD and its consequence was not read in the neighbour.** AD-35 line
  402 now correctly says *"**AD-29 does not**"* call `is_discoverable` — while AD-20 line 236 gained
  a fourth term, *"**its Listing is discoverable** (AD-35)"*, which reinstates the identical failure
  one hop further along (C6-1).

Verbatim application removed the *transcription* error. It cannot remove the *composition* error,
and landing twenty-four changes in one pass into five ADs (AD-11, AD-19, AD-26, AD-35, AD-36) is the
maximum possible exposure to it.

**One qualitative improvement worth recording.** Four of this round's seven criticals (C6-2, C6-4,
C6-6, C6-7) are **one-clause repairs** — delete a superseded sentence, move a clause above the
paragraph that abolished it. Three (C6-1, C6-3, C6-5) are genuine unanswered design questions. In
round 5 that split was 1:5. The spine is accumulating editorial residue faster than it is
accumulating design debt, which is a better problem than it had.

---

## 1. Part 1 — closure of C5-1..C5-6 and H5-1..H5-18

**Counts: 13 CLOSED · 10 PARTIALLY CLOSED · 1 NOT CLOSED.**
Criticals: 5 closed, 1 partially, 0 open. Highs: 8 closed, 9 partially, 1 open.

Judged on whether the *named defect* is gone. Where the fix introduced a new one, that is a Part 2
finding, not a re-opening.

### C5-1 — unbounded self-recursion in `recompute_discoverable` — **CLOSED**

Landed verbatim at line 398:

> **`recompute_discoverable(listing)` computes `is_discoverable(listing)`, compares it to the stored
> flag, and returns without writing when they agree.** Only a genuine transition writes, and it
> writes through `doc.save()` — **never `db_set`** …

The recursion terminates at depth two, and the nested save is safe (see Method). Residual, unfixed:
line 400 still reads *"they live on five **other** documents: `Listing` (conditions, withdrawal), …"*
— **M5-10 [STILL OPEN from r5]**. Cosmetic now, but it is the sentence that hid the bug for two
rounds and it is still there.

### C5-2 — after-commit dispatch does not survive a savepoint rollback — **CLOSED**

Landed verbatim at line 301, citation included:

> A cascade's effects are recorded as **rows in the same transaction** — an outbox — and dispatched
> by an AD-23 job that reads that table. … Dispatch is at-least-once, idempotent per AD-31, and an
> effect that has not dispatched after N attempts is an operational alarm, not a silent loss.
> `frappe.db.after_commit` is **not** the queue: `database.py:1198-1203` does not reset it on a
> savepoint rollback.

Citation verified accurate. The outbox is the right answer. What it acquired instead of a durability
gap is a **modelling** gap (H6-16) and a contradiction with C5-3 (C6-4).

### C5-3 — AD-12's digest unbuildable under AD-26's prohibition — **CLOSED**

Both halves landed. The carve-out is at line 303 and the ordering M5-1 asked for three rounds is
now in AD-12: *"**The chain append is the last step of an amendment**, after the occupancy transform
has succeeded."* **M5-1 CLOSED.** The carve-out's final clause is now wrong (C6-4).

### C5-4 — the controller omitted from AD-26's writer list — **CLOSED**

Landed verbatim at line ~280:

> Where the transition is a document lifecycle event, the transition row is written **by that
> document's controller**, in the hook that fires for every actor — `on_cancel` for a cancellation,
> `on_update` guarded by `has_value_changed` for a field transition.

Re-verified: `run_post_save_methods` runs `on_cancel` and `on_change` only for `_action == "cancel"`
(`document.py:1445-1474`), so `on_cancel` is the correct and only hook, and a Desk cancel now writes
the `Cancellation` row. Residual: the clause's own guard — *"The row is written by exactly one layer
per trigger, **named in the table**"* — points at a table that was not edited (H6-1).

### C5-5 — un-guarded transition rows — **PARTIALLY CLOSED**

The shape landed verbatim at line 282. Sub-finding by sub-finding:

- **(c) direction and transition predicate — CLOSED.** *"names the entity, the transition **and its
  direction**"*. The `Listing Condition Change` row can now say which way it went.
- **(b) Desk can forge one — PARTIALLY.** The controller assertion landed — *"its controller asserts
  the transition actually occurred"* — and is assertable for `Cancellation` (`docstatus` 2) and
  `Rule Acceptance` (a confirmed Agreement). It is **not assertable** for `Listing Condition Change`
  (C6-6).
- **(a) written twice on the two most-exercised routes — NOT CLOSED.** The dedup mechanism is
  *"written by exactly one layer per trigger, named in the table"*, and the table still names three
  writers for cascade 4 and no layer at all for cascades 2 and 3 (H6-1). The uniqueness tuple cannot
  substitute (H6-2). Both duplicate-notification routes r5 demonstrated still run.

### C5-6 — a hold on a record does not stop erasure de-identifying its parties — **CLOSED**

Landed verbatim in AD-33 at line 378, both sentences. This was three rounds open (C4-5 → C5-6) and
is now shut. Its scope predicate is a new problem (H6-14), not a re-opening.

---

### H5-1 — ambiguous guard key — **CLOSED**

Line 299: *"keyed `(cascade_name, affected_entity)` — the Agreement or the Listing the cascade acts
on, **never the document `doc_events` fired on**, which for a freshly inserted transition row is new
every time and would make the guard a no-op for exactly the three cascades that compose."*
Unambiguous, and it preserves C4-1's fan-out closure (four Listings, four keys).

### H5-2 — the declared composition graph is not the actual graph — **CLOSED**

Line 297: *"The graph is complete because the running budget lives on its own document (AD-19) and so
raises neither cascade 1 nor cascade 6."* The 3→1 and 3→6 edges are gone. The move that removed them
is C6-5, H6-6 and H6-7.

### H5-3 — bare `on_update` with no field predicate — **CLOSED**

`has_value_changed` now appears five times; cascades 1, 5 and 6 each carry the predicate in the
table, and the AD states the rule generally: *"**Every binding carries a field predicate.**"*

### H5-4 — `recompute_budget` has no invoker and races itself — **PARTIALLY CLOSED**

*Invoker:* **closed.** Line 229 enumerates `Selection`, `Agreement`, `Wedding Function`, `Listing`
and the Family's own rows.
*Race:* **not closed, and now denied.** See C6-5. The same line asserts the race is impossible, and
it is not.

### H5-5 — a Family's adjustment double-counted — **PARTIALLY CLOSED, and the guard was dropped again**

The distinction landed: *"an **adjustment replaces** the derived figure for that Selection, and an
**addition appends** a cost the platform knows nothing about."* The double-count is gone. But r4's
clause *"the function includes them and never overwrites them"* — which is what stopped the *other*
half — was deleted in the same edit and nothing replaced it (H6-8). **This is the single recurrence
of the round-5 failure mode**, and it is the same field, flipping for the third time: r4 closed the
overwrite half and opened the double-count half; r6 closed the double-count half and re-opened the
overwrite half.

### H5-6 — "one seat for the whole closure" declines a servable Span — **CLOSED**

Line 153: *"each takes **the lowest free seat on its own row**"*, with the crew-0/crew-1 rationale
stated. The contradicting lead sentence survives in the same paragraph (C6-2).

### H5-7 — the completeness test was dropped — **PARTIALLY CLOSED; the tightening itself is insufficient**

It landed verbatim: *"**a retry re-derives the closure and compares its cardinality to the rows
held; a mismatch is a defect, not a success**"*. It is my own wording from r4 and it is too weak.
**Cardinality is preserved by the exact move it was written to catch.** The Family moves the Sangeet
from the 25th evening to the 27th evening (FR-9, FR-17): the re-derived closure has the same number
of `(day, slot)` rows as the closure held, the test passes, the same-holder no-op fires, and the
confirmation reports success holding the 25th while the Agreement's terms name the 27th. Two units
implement the sentence as written and both ship the bug. **The test must compare the set, not its
cardinality.** [NEW in r6 as a defect in the fix; the underlying failure is H5-7 unclosed.]

### H5-8 — AD-35 claims AD-29 as a caller of `is_discoverable` — **NOT CLOSED**

The sentence was fixed (line 402: *"**AD-29 does not**"*) and the failure was re-created one hop
away by AD-20's fourth term. See C6-1. Fourth round on this item (H4-3 → H5-8 → open).

### H5-9 — the ranking population for the Tier allowance — **CLOSED**

Line 236: *"the published set is the **first N of the Vendor's own ordering — defaulting to upload
order — taken over the verified, not-taken-down images only**."* Both r5 asks answered: the
population is named and the default ordering exists. The branch chosen has a cost nobody framed
(H6-17), and the low half (is the ordering Vendor-editable?) is still unstated.

### H5-10 — ancestor-or-self returns zero venues for a district-level Place — **PARTIALLY CLOSED**

The descendant half landed. But the same paragraph still carries *"As a range comparison: the area's
`lft`/`rgt` span contains the Place's"* — which is the ancestor-only test, and a unit implementing
the range comparison (the only executable formulation offered) **still shows her zero venues**. The
named defect survives in one of the paragraph's three statements. See C6-7.

### H5-11 — AD-36 contradicts itself on where a Rule lives — **CLOSED**

Both offending sentences fixed. AD-36's second statement now reads *"attached as above — to the Space
where the Service has Spaces"*, and AD-6's enumeration now reads *"Place coverage (Rules attach per
AD-36)"*. The Capability map was not brought along (H6-18).

### H5-12 — the permitted set snapshot races the acceptance-time warning — **PARTIALLY CLOSED**

The rule landed: *"**The cascade acts on the set the Family was shown at acceptance**, and where the
confirmation-time set has narrowed since, it re-prompts."* Correct, and unbuildable: nothing in the
spine stores what she was shown at acceptance (H6-10). **M5-8 [STILL OPEN]** — two engaged Vendors'
snapshots still have no combination rule.

### H5-13 — AD-13 is a counter that AD-27 classifies as derived — **PARTIALLY CLOSED**

Line 175 now: *"**derived from the cancellation records, never stored as a counter**"*, with the
AD-27 question-2 reasoning stated. The classification conflict is resolved. The derivation is not
performable (H6-5).

### H5-14 — `held_by` typed as an Agreement; the retry branch has an undefined third case — **PARTIALLY CLOSED**

The third case landed verbatim: *"**every row carries `held_by`** — an Agreement, **or a Vendor's own
block** … and **a Vendor block is never advanced past**"*. FR-28 now has somewhere to live. It does
not compose with capacity ≥ 2 (C6-3), the field's type is still unstated, and the ERD still models
only `AGREEMENT ||--o{ OCCUPANCY : "held_by — auto-blocks"`.

### H5-15 — AD-10 never defines "free" — **CLOSED**

Line 130: *"**\"Free\" means the row's seats are not exhausted** — `count(occupancy) <
concurrent_capacity` for that `(resource, day, slot)`, never `NOT EXISTS` (AD-11)."* Third round of
asking; landed. It is exactly this definition that makes a Vendor block invisible (C6-3).

### H5-16 — `WEDDING_SERVICE` in the ERD and in no AD — **PARTIALLY CLOSED**

The ERD gained the relationship r5 asked for:
`WEDDING_SERVICE }o--o{ WEDDING_FUNCTION : "which Functions it serves"`. The mapping four ADs read
is now modelled. Still true: **"Wedding Service" occurs zero times in prose**, FR-68 is cited once
(in the ERD label), and the name is absent from AD-24's binding vocabulary list.

### H5-17 — the access log's retention contradicts AD-27 — **CLOSED**

AD-32 now: *"**The log itself is append-only and outlives the data it describes** — AD-27's question
1 settles it."* The tie-breaker was applied to the AD it was supposed to break, which is what r5
asked for.

### H5-18 — AD-16's carve-out scoped by module — **PARTIALLY CLOSED**

The scope changed: *"**The bypass is scoped to the cascade operation, not to a directory**"*. The
FR-53 notification is no longer stranded one function below `domain/`. But the sentence names no
mechanism a builder could implement, and it leaks (H6-11); and it now cites a review-report
identifier and a mechanism the same document abolished (H6-12).

---

## 2. Part 2 — new defects

### C6-1 — AD-20's fourth term makes a Subscription lapse physically demote the whole portfolio, which AD-35 says in terms must not happen **[NEW in r6]**

**ADs in play:** AD-20, AD-29, AD-35, AD-33, FR-53, FR-27.

Two tightenings landed in two ADs and they are direct contradictions.

AD-35, line 402, closing H5-8:

> **No other code restates any term.** AD-10's subscription gate, AD-20's public read path, AD-26's
> cascade 4 and AD-27's conditions of listing all call `is_discoverable`. **AD-29 does not** — its
> predicate is image-level (AD-20), and making a Subscription lapse physically move every portfolio
> object out of the public path would destroy what FR-53 promises is retained and reappears intact
> on renewal.

AD-20, line 236:

> **`is_publicly_visible(image)` is the only statement of image visibility**, owned here and called
> by AD-29 at the storage layer — **four terms**: **verified**, **within the Tier's allowance**,
> **not under takedown** (AD-33), and **its Listing is discoverable** (AD-35) …

AD-29:

> An object is served from the public path only while `is_publicly_visible(image)` holds (AD-20),
> **re-evaluated on any change to its terms** … Promotion **moves the object** into the public path
> and **demotion moves it out**, with CDN invalidation …

Compose them. Grace Period ends → `is_discoverable(listing)` goes false → AD-20's fourth term goes
false for every image → AD-29 re-evaluates on a change to its terms → **every portfolio object is
physically moved out of the public path and the CDN is invalidated.** That is precisely the sentence
AD-35 wrote to forbid, reached through AD-20 instead of through AD-29's own predicate. r5 recorded
AD-20 as having **three** terms with **no listing term**; the fourth was added this round, and its
stated justification (*"without the last, images of a Listing withdrawn, Admin-removed or lapsed past
its Grace Period stay served from the public CDN"*) is a direct denial of AD-35's sentence.

**The PRD is unambiguous** (FR-53): *"**Nothing belonging to the Vendor is destroyed.** Listings,
portfolio, calendar, Enquiry history, Lead Dashboard and Reviews are retained and **reappear intact
on renewal**"* — and *"open Enquiry threads stay open and answerable"*, whose Family loses the
portfolio she is corresponding about.

**Two units.** Unit A reads AD-20 and demotes on lapse. Unit B reads AD-35 and does not, so a
withdrawn Listing's images stay on the CDN, which is AD-20's stated concern. Both are literal.

**This is not the same defect the fourth term was written for.** Withdrawal, Admin removal and
takedown *should* demote. **Lapse should not** — a lapse is temporary and reversible by definition,
and FR-53 promises reversal. The two cases were merged into one predicate.

**Tightening.**

> `is_publicly_visible(image)` carries **four terms**: verified, within the Tier's allowance, not
> under takedown, and **its Listing is not withdrawn, removed or taken down**. A Subscription lapse
> is deliberately **not** a term: it removes the Listing from discovery (AD-35) without moving a
> single object, because FR-53 promises the portfolio reappears intact on renewal and an open
> Enquiry thread stays answerable through it. The public object of an undiscoverable-by-lapse
> Listing is reachable only by a URL nobody is given, which is the accepted cost.

### C6-2 — AD-11 states both seat models in one paragraph, and the bolded one is the wrong one **[NEW in r6]**

**ADs in play:** AD-11, AD-10, FR-39, FR-14.

Line 153, verbatim, first thirty words:

> **One seat for the whole closure, written in one transaction, nothing written on decline.** A Span
> occupies many `(day, slot)` rows; each takes **the lowest free seat on its own row**, because
> forcing one seat across the whole closure would decline a Span the Vendor can serve …

The H5-6 tightening was inserted into the sentence that follows the r5-era lead, and the lead was not
rewritten. The paragraph now opens by asserting the model it spends the next clause refuting, **in
bold**, which in this document is the convention for the rule itself.

**Two units, and the bolded reading is the plausible one.** Unit A implements the bold sentence: one
seat number across the whole closure, and re-opens H5-6 (a two-crew photographer's 25–26 Span is
declined although both days have capacity). Unit B implements the clause: per-row lowest free seat.
The two produce different occupancy tables for the same confirmations, different decline behaviour on
the same request, and different answers from AD-10's `count(occupancy) < concurrent_capacity`.

**Tightening.** Delete the first clause of the lead sentence. It becomes:

> **Written in one transaction, nothing written on decline.** A Span occupies many `(day, slot)`
> rows; each takes the lowest free seat on its own row …

### C6-3 — a Vendor block occupies one seat, so at capacity ≥ 2 it blocks nothing **[NEW in r6]**

**ADs in play:** AD-11, AD-10, FR-28, FR-39.

The H5-14 tightening landed:

> **every row carries `held_by`** — an Agreement, **or a Vendor's own block** (FR-28 lets a Vendor
> block Slots for maintenance or family use without stating a reason). The retry branch therefore
> has three cases … and **a Vendor block is never advanced past** — it is not capacity, it is the
> Vendor's daughter's wedding.

It landed beside two others: AD-11's *"Occupancy is one row per `(resource, day, slot, seat)`"* with
`seat` in `0..concurrent_capacity-1`, and AD-10's H5-15 fix, *"count(occupancy) <
concurrent_capacity"*.

**Compose them.** A photographer declares `concurrent_capacity = 2`. His daughter marries on the
14th; he blocks the afternoon Slot. The block is an occupancy row, so it takes **one seat** — seat 0.
`count(occupancy) = 1 < 2`, so AD-10 answers **available**. A Family confirms; AD-11's insertion
takes seat 1. It never "advances past" the block — it never needed to. **The Vendor is engaged on his
daughter's wedding day**, by a fully compliant implementation of all three sentences.

"Never advanced past" is only meaningful at capacity 1, where the branch is unreachable anyway
because there is no next seat. At capacity ≥ 2 — the entire population AD-11 exists for — it is a
no-op.

**FR-28 is at Slot granularity, not seat granularity:** *"A Vendor can block Slots for maintenance,
family use or any reason, without stating one"*, and, in the same list, *"A confirmed Agreement
blocks the relevant Slots or Span automatically."* A block is not one unit of crew bandwidth
consumed; it is the Vendor saying he is not working.

**Two units.** Unit A writes one row (the literal reading of "every row carries `held_by`"); the
photographer gets booked. Unit B writes `concurrent_capacity` rows, one per seat — which then makes
`concurrent_capacity` un-raisable while a block stands, and makes a partial block (block one crew,
keep selling the other) inexpressible, which is a real Vendor need AD-11's own rationale implies.

**Tightening.**

> A Vendor block is not an occupancy row. It is a **separate blocking fact** on the
> `(resource, day, slot)` with an explicit `seats_blocked` (default: all of them), and AD-10's
> predicate becomes `count(occupancy) + seats_blocked < concurrent_capacity`. A block that covers
> every seat makes the Slot unavailable, which is what FR-28 means; a block of fewer seats is how a
> Vendor withdraws one crew without withdrawing the day. The retry branch reverts to two cases,
> because a block is no longer something a seat search can encounter.

### C6-4 — the outbox and the render carve-out are two tightenings in one AD that cannot both hold **[NEW in r6]**

**ADs in play:** AD-26, AD-12, AD-23, FR-40, FR-43.

AD-26 line 301 (C5-2's fix) abolishes after-commit dispatch in favour of an outbox. AD-26 line 303
(C5-3's fix) ends:

> Rendering the Agreement document is performed **inside** the transaction into a transaction-scoped
> buffer; the bytes and their digest are written as row data, and the object-store write of those
> bytes **is the after-commit effect**.

There is no longer an after-commit effect. Under the outbox, the object-store write is an **outbox
row drained by a scheduled job**. Three consequences, all reachable:

**(a) FR-40 has a window with no document.** *"FR-40 lets both download a copy at any time, and every
download returns those same stored bytes — never a re-render"* (AD-12). Between commit and the next
drain — a scheduler tick, minutes at best — the Agreement is confirmed, the digest is chained, and a
download has nothing to return. Unit A 404s. Unit B re-renders, which AD-12 forbids in the sentence
that defines the trust model.

**(b) The outbox carries multi-megabyte blobs.** *"the bytes and their digest are written as row
data"* plus *"a cascade's effects are recorded as rows in the same transaction"* means the rendered
PDF is row data twice, in a table a scheduled job polls. Nothing in AD-26 contemplates an effect
payload of that size, and AD-23's job is now an object-storage uploader.

**(c) A permanently failed dispatch produces a verifying chain over bytes that do not exist.**
AD-26: *"an effect that has not dispatched after N attempts is an operational alarm."* The alarm
fires; the `Agreement Record` row is append-only and cannot be withdrawn; AD-12's verification sweep
finds a valid chain; FR-43's certificate attests to a document nobody can produce. That is the exact
failure AD-12 was written to prevent, arrived at from the other side.

**Tightening.** The bytes belong to the row, not to the queue:

> The rendered bytes are stored **as row data on the `Agreement Record`**, written inside the
> transaction with their digest. FR-40's download reads them from the row. The object-store copy is
> an **optimisation** dispatched through the outbox and is never the authoritative copy, so a failed
> or delayed dispatch degrades latency and never evidence. AD-12's *"never a re-render"* is satisfied
> by the row.

### C6-5 — moving the budget to "its own document" relocates the race; AD-19 asserts it removes it **[NEW in r6]**

**ADs in play:** AD-19, AD-26, FR-39, FR-8.

Line 229, the H5-2 and H5-4 fixes in one sentence:

> **The total lives on its own document, not on the Wedding**, so recomputing it raises no
> `Wedding.on_update` (and therefore no cascade 1 or 6) **and two Vendors confirming into one
> Wedding in two workers cannot collide on the Wedding's `modified` and fail each other's
> confirmation with `TimestampMismatchError`.**

The first half is true and closes H5-2. **The second half is false.** The two workers now both load
and save *the same budget document* for that Wedding. Verified again this round: `check_if_latest`
(`document.py:1088`) compares the database's `modified` against `self._original_modified` and raises
`frappe.TimestampMismatchError` at `:1108-1113`. The document that collides changed; that a collision
occurs did not. r5 asked for *"a stated concurrency discipline for the Wedding total"* and the spine
supplied a relocation instead, together with a claim that the relocation is the discipline.

**This is worse than r5's silence.** A builder reading H5-4's original state would defend against the
race; a builder reading line 229 is told it cannot happen. When it happens, the Vendor sees *"has
been modified after you have opened it"* on a confirmation, which contradicts FR-39's promise that a
losing confirmation is told **which engagement conflicts**.

**Tightening.**

> Two confirmations into one Wedding will contend for the budget document. State the discipline:
> the recompute takes a **row lock** on the budget document (`frappe.db.get_value(..., for_update=True)`)
> before reading, so the second worker waits rather than failing; or the recompute is **enqueued**
> per Wedding with an idempotency key on `(wedding, period)` per AD-31, so the confirmation never
> carries the total's write at all. Pick one and name it. `db_set` is not a third option — it is a
> lost update, and AD-26 notes it raises no `doc_events`.

### C6-6 — cascade 4's controller assertion is unassertable, because C5-1's fix removed the difference it must observe **[NEW in r6]**

**ADs in play:** AD-26, AD-35, AD-27, FR-53, FR-61.

Two tightenings, one in each AD.

AD-26 line 282: *"its controller asserts the transition actually occurred — an `Agreement` at
`docstatus` 2 for a `Cancellation`, **a changed `is_discoverable(listing)` for a `Listing Condition
Change`**, a confirmed `Agreement` for a `Rule Acceptance`."*

AD-35 line 398: `recompute_discoverable` *"compares it to the stored flag, and returns without
writing when they agree."*

**Trace the only route that writes the row.** `recompute_discoverable` computes P, finds the stored
flag F ≠ P, writes P through `doc.save()`, which raises `Listing.on_update`, in which
`has_value_changed("discoverable")` is true and the controller writes the `Listing Condition Change`
row. **At the moment that row's own controller runs, `is_discoverable(listing)` equals the stored
flag** — C5-1's compare-and-return guarantees it. There is no "changed" for the row's controller to
observe: it is a different document, `get_doc_before_save` on a new row is `None`, and the Listing's
in-flight `_doc_before_save` is not reachable from it.

The other two assertions are fine — `docstatus` 2 and a confirmed Agreement are both current state.
Only cascade 4's is a *delta*, and the delta was consumed one document earlier.

**Two units.** Unit A implements the assertion literally against current state, so it always passes
and **C5-5(b) is re-opened** — Admin inserts a row in Desk, the assertion sees a discoverable
Listing, cascade 4 tells forty Families a live Listing is gone. Unit B implements it as "the
predicate disagrees with the flag", which after a correct write is never true, so **the row's
controller rejects every legitimate row and cascade 4 never runs on any of FR-53's four routes** —
FR-53's central promise, silent.

**Tightening.**

> A `Listing Condition Change` row carries the **before and after values** of the flag as row data,
> written by the Listing's controller from `get_doc_before_save()`. Its own controller asserts
> `before != after` and that `after` equals the Listing's current stored flag. A transition row
> asserting a *delta* must carry the delta; only a row asserting *state* can re-derive it.

### C6-7 — AD-36's coverage rule states three mutually incompatible things in five sentences **[NEW in r6]**

**ADs in play:** AD-36, AD-22, FR-33, FR-57, FR-20.

Line 410, unedited:

> A Vendor's declared area **covers** a Wedding's Place when the two lie on one root-to-leaf path —
> the area is that Place, an ancestor of it, **or a descendant of it**. The descendant half is not
> optional: … a Vendor declaring "Ahmednagar district" serves every town within it, **and one
> declaring a town does not serve the district**. As a range comparison: **the area's `lft`/`rgt`
> span contains the Place's**.

Three statements:

1. **covers ⟺ area ∈ {Place} ∪ ancestors(Place) ∪ descendants(Place)** — the formal predicate.
2. **a town-level area does not cover a district-level Place** — the stated exception, which is a
   direct denial of the descendant half of (1), since a town is a descendant of its district.
3. **`area.lft ≤ place.lft ∧ area.rgt ≥ place.rgt`** — the range comparison, which is
   ancestor-or-self **only** and denies the descendant half as well.

Three units, three coverage functions, and (3) is the only executable form offered, so the most
likely implementation is the one that re-produces H5-10 verbatim.

**And the semantics of (1) are wrong on their own terms.** FR-33: *"A service area says where a
Vendor is **willing to travel to work**. … the declared area tells her whether he will come to
hers."* Under (1), a Family holding a state-level Place — which nothing forbids, and FR-13
contemplates browsing before dates are settled — matches **every Vendor in the state**, including the
single-town photographer who will not travel. "Will he come to mine?" becomes unanswerable by the
one field that exists to answer it.

**The real distinction is in FR-33's own last line**, and the spine already carries it in AD-11:
*"A **Space**, being immovable, serves the place it stands in. A **travelling Vendor** serves the
areas they declare."* The descendant half is right for immovable resources and wrong for travelling
ones.

**What it does to AD-22 — see H6-9.**

**Tightening.**

> Coverage is asymmetric by resource kind, which is the distinction FR-33 draws and AD-11 already
> models. For a Service **with Spaces**, the Space is immovable and serves the Place it stands in:
> a Wedding Place covers it when the Place is that Place **or an ancestor of it** — the Family's
> district-level Place finds every Venue inside it. For a Service **without Spaces**, the Vendor
> travels: the declared area covers the Wedding Place when the area is that Place **or an ancestor
> of it**. As range comparisons these are opposite containments, so state both:
> Spaces `place.lft ≤ space_place.lft ∧ place.rgt ≥ space_place.rgt`; travelling Vendors
> `area.lft ≤ place.lft ∧ area.rgt ≥ place.rgt`. Where the Wedding's Place is coarser than any
> travelling Vendor's area, the Family is shown that she is browsing a district and asked to narrow —
> never an empty list.

---

## 3. High

### H6-1 — "written by exactly one layer per trigger, **named in the table**" — and the table names none **[NEW in r6]**

The C5-5 guard clause landed and the artefact it governs was not touched. Reading the table as
shipped:

| Cascade | Layer named? |
|---|---|
| 1 | `Wedding.on_update` — a hook, not a layer, but unambiguous |
| 2 | *"written on Agreement confirmation, not on acceptance"* — a **time**, no layer |
| 3 | *"written wherever `docstatus` reaches 2 — Desk included"* — a **condition**, no layer |
| 4 | *"written by the Listing, by the Subscription-lapse job, or by a Service-level fan-out"* — **three layers** |
| 5 | `Vendor.on_update` |
| 6 | `Wedding.on_update` |

Cascade 4's three writers are the C5-5(a) double-write, unchanged. The lapse route: AD-23's expiry
job writes the row (table), **and** AD-35 makes the Subscription job bind `recompute_discoverable`,
whose `doc.save()` raises `Listing.on_update`, which AD-26's own invocation clause makes a writer of
the same row. **Two rows, two cascade-4 runs, every Family told twice.** The FR-60 route: cascade 5
*"invokes cascade 4 per Listing"* (a direct call) while `Vendor.on_update` also binds
`recompute_discoverable`, producing the row. The re-entrancy guard does not help — it suppresses
*re-entry during* a cascade, and these are sequential.

### H6-2 — the uniqueness tuple is either vacuous or redundant, and nothing says which **[NEW in r6]**

*"unique on `(entity, transition, direction, idempotency key)`"*. If the key is generated per
invocation, two writers produce two keys, both rows insert, and the constraint prevents nothing it
was written to prevent. If the key is derived from the transition, it is a function of the other
three columns and adds nothing. AD-31 requires *"every state-changing operation carries an
idempotency key"* and never says what generates one. Say it: the key is derived from the transition
(`agreement + docstatus 2`, `listing + before/after flag + the source event's id`), which makes the
tuple a genuine dedup and H6-1's double-write a database error rather than a duplicate notification.

### H6-3 — half the cascades have no transition row, so half the C5-5 shape does not apply **[NEW in r6]**

Cascades 1, 5 and 6 are bound to `on_update` with a field predicate — no row. So they carry no
direction, no uniqueness key, no idempotency key and no controller assertion, while AD-26 states all
four as properties of "a transition row" without saying they govern three of six. AD-31's *"every
state-changing operation carries an idempotency key"* is unmet for cancelling every Agreement in a
Wedding (cascade 1) and for removing a Vendor (cascade 5) — the two most destructive operations in
the system. And AD-26's own argument against bare `on_update` has a second half the field predicate
does not answer: *"the scheduler can cause the transition without changing that document."*

### H6-4 — the row carries a direction and nothing consumes one of its two values **[NEW in r6]**

Cascade 4 is *"A Listing leaves discovery (FR-53)"*. FR-59: *"A Listing that stops satisfying them
stops being discoverable **until it does again**."* The C5-5 fix gives the row a direction; AD-26's
enumeration — *"Six operations: … a Listing leaving discovery"* — has no operation for the other
direction. Nothing re-admits the Listing to search, re-promotes its images through AD-29, or tells
the Families who were told it was gone. Unit A treats re-entry as "the flag flips and search picks it
up", which under AD-20/AD-29 leaves every image demoted (C6-1). Unit B invents an unnamed cascade 7.

### H6-5 — AD-13's derived count is underivable from the records it now derives from **[NEW in r6]**

AD-13 requires three distinctions: FR-69 Amendments write nothing; **FR-17 date moves do write**;
**a cancellation following FR-60 removal is not counted against the Family**. The only cancellation
record the spine models is AD-26's `Cancellation` transition row, whose stated columns are entity,
transition, direction and idempotency key — **no reason, no cause, no originating cascade**.
**M5-4 [STILL OPEN from r5, fourth round]** is now load-bearing: composition has no signature and no
reason parameter, so a row produced by 1→3 (FR-17, counted) is indistinguishable from a row produced
by a Family ending an Agreement with a removed Vendor (FR-60, not counted). The H5-13 fix made AD-13
depend on data the H5-13-era model does not carry.

### H6-6 — `Listing` binding `recompute_budget` is an unbounded cross-Wedding fan-out that AD-16 makes resolve nothing **[NEW in r6]**

AD-19 line 229 lists **`Listing` (per-head price)** among recompute_budget's invokers. A caterer
edits his per-head rate. That must recompute the budget of **every Wedding holding a Selection of
that Listing** — an unbounded fan-out inside a Vendor's ordinary save, each target a separate
document save, each a C6-5 collision candidate.

Three further problems, each from a different AD. **AD-26:** this is an operation spanning more than
one entity, so it belongs in `domain/` as a cascade, and the enumeration is closed at six
(**M5-9 [STILL OPEN]**). **AD-16:** it is a read derived from a request (the Vendor's save), so row 1
applies and it must use `frappe.get_list` — running as the Vendor, who cannot see other people's
Weddings, so it resolves **nothing** and every budget silently stays stale. The cascade carve-out
does not cover it because it is not a cascade. **AD-19 itself:** *"Nothing else writes the total — not
a cascade"*, so the correct-looking fix is unavailable.

### H6-7 — the budget document is a DocType that exists only in one clause **[NEW in r6]**

*"The total lives on its own document, not on the Wedding."* It has **no name**; it is **absent from
the ERD** (which still shows `WEDDING` with no budget node); it is **absent from AD-24's binding
vocabulary**, whose rule is *"the Glossary is binding on every DocType name"*; and it is absent from
the Capability map, where 4.2 Wedding Workspace still reads *"`Wedding` + children"* — and a child
table would defeat the entire purpose, since saving a child saves the parent. **M5-12 [STILL OPEN]**
grows by one.

### H6-8 — AD-19 lost "never overwrites them"; a Family's correction now has no stated stickiness **[NEW in r6 — the one recurrence of the r5 failure mode]**

r4's clause read *"the function includes them and never overwrites them"*. It is gone, replaced by
*"an **adjustment replaces** the derived figure for that Selection"*. Nothing says the replacement
survives. `recompute_budget` is *"the one writer"* and is invoked from `Listing` on a per-head price
change: the caterer raises his rate, the function re-derives ₹2.6L for a figure Rutuja had corrected
to ₹2.4L, and — with no stickiness rule — overwrites her. FR-8: *"She can adjust any figure the
platform derived"* and *"Every automatic figure is usable as-is."* State where the adjustment lives
(an override column on the `Selection`) and that the function reads it in place of the derived value
rather than recomputing over it. **Third flip of this field in three rounds.**

### H6-9 — bidirectional coverage makes AD-22's shrinkage population heterogeneous by construction **[NEW in r6]**

AD-22 ranks by *"rating shrunk toward the **Service-and-Place average**"*; AD-36 fixes the Place as
*"where the Vendor's own business sits"*. Before C6-7's descendant half, a result list was
approximately one Place and one shrinkage target. After it, **every district-level search returns
Vendors whose business Places sit at three different levels**, each shrunk toward a different
population — a town photographer against thirty peers, a district photographer against four hundred.
The shrunken ratings are not comparable, and AD-22 gives no rule for which level's average applies
when a result set spans levels. FR-20 ranks whatever set this returns, so nothing downstream
disagrees visibly. **M5-13 [STILL OPEN]** compounds it: AD-22 still states the target with no ladder
while AD-36 carries the ladder, and a builder implementing ranking reads AD-22.

### H6-10 — the acceptance-time permitted set has no artefact to live on **[NEW in r6]**

AD-36: *"**The permitted set is snapshotted onto the Agreement at confirmation**"* and, two sentences
later, *"**The cascade acts on the set the Family was shown at acceptance**."* The only record of
acceptance the spine models is the `Rule Acceptance` transition row — which AD-26's table says is
*"written **on Agreement confirmation, not on acceptance**"*. So at acceptance nothing is written,
and at confirmation the only thing written is the confirmation-time set. The rule that closes H5-12
has no storage. Give the acceptance its own row, written when the Family accepts, carrying the named
set she was shown; the confirmation-time comparison then has two sides.

### H6-11 — "scoped to the cascade operation" names no mechanism, and the only mechanism the spine has leaks **[NEW in r6 — H5-18's fix]**

`frappe.get_all` is a framework call that always ignores permissions; there is nothing to "scope".
What AD-16 must mean is: *a read helper consults ambient state to decide between `get_all` and
`get_list`.* The only ambient-state primitive the spine names is `frappe.flags`, and AD-26 records
that it is per-`frappe.init()` — **not per-request** — which is why AD-26 clears its own guard in a
`finally`. **AD-16 states no clearing discipline at all.** A nightly job that processes many Listings
in one context, an exception path, or a `finally` that resets wholesale (**M5-5 [STILL OPEN]** — the
spine still says only *"cleared in a `finally`"*, not *its own key only*) leaves the flag set, and the
next read on that worker — including a request path — silently returns rows the caller may not see,
with no error and no empty result to notice, which is AD-16's own stated failure. Name the mechanism
(a context manager that sets and clears one named flag, and a read helper that reads it), or scope
the bypass by **argument** — the cascade passes an explicit `bypass=True` down the call chain, which
cannot leak because it is not ambient.

### H6-12 — the spine now cites a review-report identifier and a superseded mechanism **[NEW in r6]**

AD-16 line 204: *"Scoping it by module location instead would leave FR-53's notification resolving
nothing one function below `domain/`, and **C5-2's after-commit dispatch** runs further away still."*
Two defects in one clause. `C5-2` is an identifier in `reviews/review-adversarial-r5.md`, meaningless
to anyone building from the spine. And **after-commit dispatch no longer exists** — AD-26 replaced it
with the outbox in the same revision. The correct sentence is that the outbox drain runs in a
scheduled job, which falls under AD-16's row 2 (system work) and needs no carve-out at all — so the
clause argues for operation-scoping using an example that operation-scoping does not cover.

### H6-13 — AD-23 says every job raises a transition row; three cascades have no row **[NEW in r6]**

AD-23: *"Every job … **raises a transition row rather than performing cascade work itself** (AD-26)."*
Cascade 6 (FR-72 conclusion and abandonment) is time-triggered and its transition is
`Wedding.on_update` guarded by `has_value_changed("state")` — no row. So the FR-72 job must change the
Wedding directly, which AD-23 forbids, or write a row that AD-26 does not define. Unit A uses
`doc.save()` and works while violating AD-23; unit B uses `db_set` — AD-26 notes `doc_events` does not
fire for it — and **the Wedding concludes with no cascade at all**: Agreements uncancelled, Slots
unreleased, guest list unerased, public links live, against FR-72 and NFR 5.5.

### H6-14 — the derived hold's scope is the undecidable noun AD-27's procedure was created to replace **[NEW in r6 — C5-6's fix]**

AD-33: *"A hold on a record places a derived hold on **every person whose de-identification would
reduce that record's evidential value**."* AD-27 introduced its three-question procedure precisely
because *"a noun like 'evidences an obligation' is not decidable, and three builders answered it
three ways"*. This is that noun. Unit A derives holds on `PERSON ||--o{ AGREEMENT : party` only. Unit
B includes Review authors, Enquiry participants and the Admin who acted. Unit C includes any person
referenced from any retained record, which holds most of the platform. And under the H4-11 decision a
**refused erasure stands refused** and is never re-run when the hold lifts, so unit C's over-derivation
permanently denies a right the law grants. Make it structural: *the parties to the held record and
any person named in it*, enumerated from the ERD the way AD-32's affected-person enumeration is.

### H6-15 — the outbox is not modelled anywhere **[NEW in r6]**

No DocType name, no ERD node, no AD-27 classification (is a dispatched-effect row (1), (2) or (3)?),
and `N` in *"has not dispatched after N attempts"* is undefined. AD-23 says *"**Four** exist only
because this spine created them"* and names them; the outbox drain is a **fifth** and is not in the
list, which is exactly the failure AD-23 exists to prevent — *"a requirement with a time trigger
silently never shipping, because nothing fails when one is absent."*

### H6-16 — a court-ordered takedown now publishes a previously unpublished image **[NEW in r6]**

AD-20: *"a takedown **closes its gap** rather than leaving one"*, with the published set taken over
the not-taken-down images. So a takedown of image #1 on a five-image Tier promotes image #6 into
publication, and AD-29 **physically moves it onto the public CDN**, inside AD-33's three-hour SLA,
unreviewed. r5 named this as unit B's absurdity; the spine chose it without argument. It may be the
right branch — the Vendor paid for five slots — but it is a takedown causing a publication and it
needs the accepted-cost framing AD-5 and AD-8 give their equivalents, plus a statement that the
promoted image must itself be verified (it is, by the population rule) and not itself under a
grievance.

### H6-17 — AD-11's `held_by` has no type and the ERD models only half of it **[NEW in r6]**

*"an Agreement, **or a Vendor's own block**"* — a Dynamic Link, two nullable columns, or a
polymorphic holder table? AD-12's *"cancellation deletes the rows held by that Agreement"* reads as a
single link. The ERD carries `AGREEMENT ||--o{ OCCUPANCY : "held_by — auto-blocks"` and nothing for
the block. Two units, two schemas, and AD-11's unique index is over `(resource, day, slot, seat)`
which does not depend on the answer — so the divergence surfaces only at release time.

### H6-18 — the Capability map names `Listing Rule` after AD-36 moved Rules to the Space **[NEW in r6]**

*"Places & Rules (FR-24, FR-33) | `Place` tree, **`Listing Rule`** | AD-36"*. H5-11's fix moved a
Rule to the Space where the Service has Spaces; the DocType name in the map says otherwise, and AD-24
makes DocType names binding. The ERD carries neither `PLACE` nor a Rule entity at all.

---

## 4. Medium

**M6-1 — The ERD is now materially behind the prose [NEW in r6].** Absent from it: `PLACE`, the Rule
entity, the budget document, the outbox, `VERIFICATION`, the three transition rows, `LEGAL HOLD`, the
Vendor-block holder, `WEDDING_MEMBER`'s role column. Nine ADs read entities the ERD does not carry.
The ERD closed H4-13, H4-18 and H5-16 in three consecutive rounds and has not been swept since.

**M6-2 — AD-26 refers to itself in the third person [NEW in r6].** *"AD-26's prohibition covers
effects observable outside the transaction…"*, inside AD-26. A verbatim-application artefact; it
reads as a cross-reference to another AD and will be followed as one.

**M5-2 [STILL OPEN] — `concurrent_capacity` is still absent from AD-6's core enumeration and is
still not a condition of listing.** AD-11 says it is *"never implicitly defaulted"*; nothing gates a
Listing publishing without one. Fourth round.

**M5-3 [STILL OPEN] — AD-16 still requires every cascade write to record "the person who triggered
it"**, and the outbox adds the same fourth context the after-commit worker did: the drain job has no
person.

**M5-4 [STILL OPEN] — cascade composition has no signature and no reason parameter.** Now
load-bearing for AD-13 (H6-5) and for FR-60's *"told that the Vendor was removed — not merely that a
Listing is gone"*.

**M5-5 [STILL OPEN] — "cleared in a `finally`" still does not say *its own key only*.** Now also the
missing half of AD-16's operation scope (H6-11).

**M5-6 [STILL OPEN] — AD-11's seat-advance loop is MariaDB-dialect-dependent and hosting is
deferred.** Improved by the per-row fix (each row's retry is independent), so the undo question
C5-6-era M5-6 raised is narrower: one row's failed attempt, not a whole closure's.

**M5-7 [STILL OPEN] — the Site Visit is still unmodelled.** *Site Visit* occurs zero times; AD-11
still does not say it takes no Slot. Fourth round.

**M5-8 [STILL OPEN] — AD-36's snapshot lands "onto the Agreement" and a Family holds several.** No
combination rule; FR-25's distinct surfacing is still unreachable for a Vendor added after
confirmation.

**M5-9 [STILL OPEN] — AD-26's enumeration is still closed at six.** FR-68's Service removal is the
seventh; H6-6's Listing→budget fan-out is an eighth.

**M5-10 [STILL OPEN] — AD-35 still says "five **other** documents" and lists `Listing` first.**

**M5-11 [STILL OPEN] — Admin opening a Place renumbers the NestedSet tree at runtime**, and `lft`/`rgt`
is now the stated coverage predicate in one of AD-36's three formulations.

**M5-12 [STILL OPEN] — AD-24's vocabulary list does not carry the nouns the spine invented.** Now
missing: *Place*, *Preferred Vendor*, *Takedown*, *Legal Hold*, *Rule Acceptance*, *Cancellation*,
*Listing Condition Change*, *Wedding Service*, *Grievance*, *Breach Incident*, the outbox, the budget
document.

**M5-13 [STILL OPEN] — AD-22 states the shrinkage target with no ladder; AD-36 carries the ladder.**
Escalated by H6-9.

**M5-14 [STILL OPEN] — AD-35's Grace-Period boundary is a scheduled window, not an evaluated one.**
`is_discoverable` is pure and the flag is written by a job; between the per-Vendor expiry timestamp
and the job's tick, search returns the lapsed Listing and AD-10 shows dates, against FR-13's *"no
dates at all"*.

---

## 5. Low

- **The review-history table still ends at round 4**, and the prose still reads *"Round 5 addressed
  round 4's six criticals… Read `reviews/review-*-r4.md` before cutting epics."* Twenty-four
  tightenings landed since. A builder is being pointed at the wrong reports. Raised in r5's low
  section; not done.
- **"assume this round did too"** has now been confirmed for the fifth consecutive round and should
  be a stated property of the document, not a caveat.
- **AD-20's "the Vendor's own ordering" still names no field** and does not say it is Vendor-editable,
  which FR-27 implies.
- **`session.user` appears once and "document state" zero times** — the three-homes criterion from
  H3-8/H4-20 is still unwritten. Sixth round.

---

## 6. Part 3 — is this spine converging?

**No — not on criticals. Yes — on closure rate and on defect cost.**

Criticals per round, and how many were defects in *that round's own fixes*:

| Round | Criticals | Introduced by that round's own fixes | Source |
|---|---|---|---|
| 1 | 4 | 0 (baseline) | `review-adversarial.md` C-1..C-4 |
| 2 (closure) | — | **8 new defects, two structural** | `review-closure.md` verdict |
| 3 | 4 | **4** — all marked *[NEW in round 3]* | `review-adversarial-r3.md` |
| 4 | 6 | **4** — *"four of the six new criticals are defects in those mechanisms"* | `review-adversarial-r4.md` verdict |
| 5 | 6 | **5** — *"Five of the six criticals are defects in round 5's own fixes"* | `review-adversarial-r5.md` verdict |
| **6** | **7** | **7** — every one | this report, C6-1..C6-7 |

**Round 6 did not break the pattern. It is the first round in which 100% of the criticals are
self-inflicted**, and the absolute count rose for the first time since round 4. Six rounds of
critical counts — 4, 8, 4, 6, 6, 7 — have no downward trend. On that measure the process has reached
a fixed point of its own, not of the artefact.

**Three things genuinely improved, and they are not noise.**

1. **Closure.** 13 of 24 fully closed, 10 partially, 1 open — and **zero of the six criticals fully
   open**, the first round that is true. Round 5 closed 13 of 43 by comparison. Items open three and
   four rounds (C4-5/C5-6 the legal hold, H3-6/H4-16/H5-15 the definition of "free", H3-4/H4-15/H5-14
   the Vendor block, H4-9's procedure applied to AD-13 and AD-32) closed this round.
2. **The verbatim method killed the failure mode it was aimed at.** Five dropped guard clauses in
   round 5; **one** in round 6 (H5-5/H6-8). Keep the method.
3. **The criticals got cheaper.** Four of seven (C6-2, C6-4, C6-6, C6-7) are repaired by deleting or
   moving a sentence. In round 5 that ratio was 1 of 6. The spine is now failing on *editorial
   residue* — a tightening inserted beside the sentence it contradicts — more than on *unanswered
   design*. Three real design gaps remain (C6-1 what a lapse does to media, C6-3 what a Vendor block
   is, C6-5 how the budget is written concurrently), and all three are one paragraph each.

**Why it still is not converging, mechanically.** The verbatim method has no *delete* step. It
inserts a correct sentence and leaves the incorrect one standing, because the tightening block says
what to add and not what it replaces. Five of seven criticals are exactly that shape. And it has no
*neighbour* step: twenty-four changes landed into five ADs with no pass that re-read each amended AD
end to end afterwards. AD-11 took three tightenings and now contradicts itself in one paragraph;
AD-26 took five and two of them cannot both hold; AD-20 and AD-35 were amended in the same pass to
say opposite things about the same predicate.

**What would break the pattern, and it is not another review round.** Two mechanical steps added to
the same verbatim method:

1. **Every tightening names the text it replaces**, and the replacement is a deletion, not an
   addition. C6-2, C6-4, C6-7 and H6-12 would not exist.
2. **After the pass, each amended AD is read end to end against every AD it names**, once, as its own
   step. C6-1, C6-6 and H6-1 would not exist — each is visible from a single sequential read of two
   ADs.

Those two steps address five of this round's seven criticals. The remaining two (C6-3, C6-5) are
genuine open design questions and want an answer from the author, not a process.

**Shortest path.**

1. **C6-2 and C6-7** — two deletions, five minutes. Delete *"One seat for the whole closure"* from
   AD-11's lead; delete AD-36's `lft`/`rgt` sentence and its "does not serve the district" exception,
   and replace with the asymmetric predicate. These are the two cheapest criticals in six rounds.
2. **C6-1** — one paragraph in AD-20: lapse is not a term of `is_publicly_visible`. It is the only
   critical that breaks an explicit PRD promise (FR-53's *"reappear intact on renewal"*).
3. **C6-4 and C6-6** — one clause each, both inside AD-26: the rendered bytes live on the row, and the
   `Listing Condition Change` row carries before/after.
4. **C6-3 and C6-5** — the two design questions. What is a Vendor block (a blocking fact with
   `seats_blocked`, not an occupancy row)? How is the budget document written under contention (row
   lock or per-Wedding enqueue)?
5. **H6-1 + H6-2 + H6-3 + H6-4** — one pass over AD-26's cascade table, which has now been the target
   of six criticals across three rounds and has not itself been edited since round 4. One writer per
   row, the idempotency key defined, and a statement of which parts of the row shape govern the three
   cascades that have no row.
6. **H6-6 + H6-7 + H6-8** — one pass over AD-19. The budget document needs a name, an ERD node, a
   Glossary entry and a concurrency rule; the `Listing` binding needs a mechanism that AD-16 permits;
   and the Family's adjustment needs its stickiness back.
7. **M6-1** — sweep the ERD once against the prose. Nine ADs read entities it does not carry.
