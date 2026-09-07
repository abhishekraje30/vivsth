---
review: adversarial
round: 4
target: ARCHITECTURE-SPINE.md (architecture-vivahspot-2026-09-06)
driving_spec: prds/prd-vivahspot-2026-09-03/prd.md (amended 2026-09-06 on FR-62 / UJ-4)
reviewed_against:
  - reviews/review-adversarial-r3.md (round 3, 4 critical / 10 high / 12 medium / 4 low)
  - reviews/review-closure.md (round 2 verification)
reviewer_lens: 'adversarial — two units one level down that each obey every AD to the letter and still build incompatibly'
frappe_claims_verified_against: '/home/abhishekraje30/frappe-bench/apps/frappe @ __version__ 16.33.0'
date: 2026-09-06
verdict: 'CHANGES REQUIRED — 6 critical, 20 high, 14 medium, 5 low. Every round-3 critical was answered with a mechanism, and four of the six new criticals are defects *in those mechanisms*. The pattern is now three rounds old: each revision converts a coordination problem into a mechanism, and the mechanism composes with a neighbouring AD in a way nobody checked.'
---

# Adversarial Review, Round 4 — Architecture Spine, Vivah Spot

## Method

Unchanged. For each area, construct two units one level down — two epics, two dev agents six weeks
apart — that **each obey every AD to the letter** and still produce something that cannot be
assembled. Every such pair is a hole in the spine, not a defect in the units.

Every finding is marked **[NEW in r4]** or **[STILL OPEN]**. Round-3 findings genuinely closed by
the revision are listed in §7 and not re-reported.

**Frappe mechanics in this report were verified against source, not recalled.** The bench at
`/home/abhishekraje30/frappe-bench/apps/frappe` is `__version__ = "16.33.0"` — the same tree the
spine cites. Line references are to that tree.

**What is different about this round.** Round 3 found four criticals, all of them created by round
2's fixes. Round 4 finds six, and **four are created by round 3's fixes**: the re-entrancy guard
(C4-1), the "exactly one way" invocation rule (C4-2), the `held_by` no-op (C4-4) and the savepoint
mandate (C4-6). The two ADs that have never been adversarially reviewed — AD-35 and AD-36 — supply
one critical and seven highs between them. The spine's own warning is now empirically confirmed
three times over: *"assume this one did too."*

---

## 1. Critical

### C4-1 — AD-26's re-entrancy guard suppresses the nested cascades AD-26 itself requires, and its lifetime is unstated **[NEW in r4]**

**ADs in play:** AD-26, AD-23, AD-31, FR-32, FR-42, FR-53, FR-60, FR-17, FR-72.

**Scenario.** AD-26 now carries two sentences that cannot both be obeyed:

> "**A cascade in flight suppresses further cascades on the same request** (a flag on
> `frappe.flags`), so one cascade updating a record cannot re-enter another."

> "FR-60 removal **invokes that same cascade** for each of the Vendor's Listings and adds one step
> nothing else has …"

The first forbids what the second requires, in the same AD, three paragraphs apart. And the
composition graph round 3 established is unchanged and still mandatory: FR-32's acceptance
**cancels an impermissible Agreement under FR-42** (the PRD says so verbatim); FR-17's Chosen Block
change **cancels what was agreed against it**; FR-72's conclusion closes out live Agreements; FR-60
removal fans out to cascade 4 per Listing.

Unit A builds Admin/moderation and implements the guard as written — *further cascades*, plural, any
of them: `if frappe.flags.get("in_cascade"): return`. Unit B builds Agreements and implements it as
"a cascade cannot re-enter **itself**", keyed per cascade name, because that is the only reading
under which the FR-60 sentence three paragraphs down still works.

Both are literal readings of AD-26. Neither can see the other's wiring.

**Resulting incompatibility.** Under **A**, Kiran removes a fraudulent Vendor with four Listings.
Cascade 5 fires, sets the flag, and every one of the four cascade-4 invocations returns immediately.
No Family is told. No Selection is cleared. No budget is adjusted. FR-53's load-bearing sentence —
"**No route removes a Listing from a Family's view without telling them**" — is silently false on
the route that matters most, and nothing errors, because a suppressed cascade is indistinguishable
from a cascade with nothing to do. Under **A** the same suppression eats FR-32's cancellation: the
Family accepts the consequence, the Agreement is not cancelled, its occupancy is never released, and
the Vendor's calendar holds Slots for an engagement the Family has been told is gone.

Under **B**, the self-loops the guard was created to close are back: `listing_leaves_discovery`
writes `Listing.discoverable`, which raises `Listing.on_update`, which is bound to
`listing_leaves_discovery` — *the same cascade*, so B's per-name guard does stop that one. But
cascade 6 (conclude/abandon, bound to `Wedding.on_update`) is re-entered by cascades 2, 3 and 4,
each of which writes the Wedding's running budget. Round 3's dangerous case is untouched: **a
Rule-conflict cancellation can still re-enter the Wedding-conclusion cascade and erase a live guest
list.**

**And the flag's lifetime is unstated, which breaks the scheduler.** Verified:
`frappe.flags` is `local("flags")` (`frappe/__init__.py:115`), initialised once in `frappe.init()`
behind `if getattr(local, "initialised", None): return` (`frappe/__init__.py:160,169`). It is **not**
per-document and **not** per-loop-iteration. AD-23's nightly Grace-Period job iterates every lapsed
Listing in one job context. A unit that sets the flag on entry and does not clear it in a `finally`
— which is the natural implementation, because in a request the flag dies with the request —
produces this: **the first lapsed Listing cascades, and every other lapsed Listing that night does
not.** Silently, every night, forever. AD-26 says "on the same request"; a scheduled job is not a
request, and the phrase supplies no lifetime at all.

**Tightening.** AD-26 must distinguish re-entry from composition, and must state the guard's scope:

> A cascade **may call another cascade**, and the graph is stated: 1→3, 2→3, 5→4, 6→3. The guard
> suppresses **re-entry into the same cascade on the same entity**, keyed on
> `(cascade_name, doctype, docname)` — never "any further cascade". The key is **cleared in a
> `finally`** when the cascade returns, because `frappe.flags` is per-`frappe.init()`
> (`frappe/__init__.py:169`) and a scheduled job processes many documents in one context. A guard
> that outlives the cascade that set it is the defect.

---

### C4-2 — "A cascade is invoked exactly one way" has no lifecycle event for three of the six triggers, and AD-12 forbids the only event the fourth has **[NEW in r4]**

**ADs in play:** AD-26, AD-12, AD-27, AD-35, FR-32, FR-42, FR-53, FR-59, FR-61, FR-71.

The brief asks directly whether "`api/` never calls a cascade directly" works for all six. It does
not. Walked one at a time:

| Cascade | Document change that raises the event | Verdict |
|---|---|---|
| 1 · Chosen Block change (FR-17) | `Wedding.on_update` | works |
| 2 · Accepting a conflicting Rule (FR-32) | **none — see below** | broken |
| 3 · Cancelling an Agreement (FR-42) | `Agreement.on_cancel` — **which AD-12 forbids** | broken |
| 4a · Subscription lapses past Grace (FR-53) | **none — time passes; see C4-3** | broken |
| 4d · A condition of listing ceases (FR-59, FR-71) | **none when the *Service* changed** | broken |
| 5 · Removing a Vendor (FR-60) | `Vendor.on_update` | works, then C4-1 |
| 6 · Conclude / abandon (FR-72) | `Wedding.on_update` | works |

**Cascade 2 has no event, and the obvious one is the wrong one.** FR-32 is unusually precise:
"**Nothing is removed until the engagement actually completes.** Acceptance authorises the
consequence; the consequence takes effect only when the Agreement is confirmed. If confirmation
fails for any reason FR-39 allows … the Family's Shortlist, Selections and existing Agreements are
exactly as they were." So the cascade must fire on **confirmation**, not on acceptance — but AD-26
names the cascade *"accepting a conflicting Rule"*, and under "`api/` never calls a cascade
directly" a unit must find a document change to bind. Unit A creates a `Rule Acceptance` DocType and
binds `after_insert` — the acceptance *is* the document change, and the cascade's own name says so.
Unit B stores acceptance on the Enquiry and binds `Agreement.on_submit`. **Under A, the Family's
Shortlist entries and existing Agreements are destroyed at the moment she clicks accept, and if the
confirmation then loses the Slot to a rival (FR-39's first-writer-wins, AD-11), she has lost her
caterer and not gained the venue.** That is the exact failure FR-32's most carefully written
consequence exists to prevent, reached by the shortest compliant path.

**Cascade 3's only event is one AD-12 prohibits.** AD-12: "Occupancy release is keyed to the
explicit cancellation event, **never to `on_cancel` as a proxy**." AD-26: a cascade is invoked
exactly one way, from a DocType lifecycle event. `on_cancel` is the only lifecycle event a
cancellation raises. Unit A binds `Agreement.on_cancel` (AD-26 wins) and a careful reviewer will
call it an AD-12 violation. Unit B creates a `Cancellation` record and binds `after_insert` (AD-12
wins) — **and then Admin pressing Cancel in Desk sets `docstatus = 2` with no `Cancellation` row, so
no cascade runs at all**: occupancy is never released, the counterparty is never told, the budget is
never adjusted, and FR-42 is silently unimplemented on the one path AD-27 exists to cover. Both
units cite the spine correctly. AD-12's sentence is a fossil of the pre-revision world where
`on_cancel` was ambiguous between amend and cancel; AD-12 itself removed that ambiguity
("`docstatus` 2 means a real cancellation and nothing else") and left the prohibition standing.

**Cascade 4's route 4 has no event when the trigger is upstream.** A condition of listing ceases to
be satisfied *either* because the Listing changed (fine — `Listing.on_update`) *or* because Admin
added a required capability to the **Service** under FR-71, which is the case FR-62/UJ-4 is written
around. Two hundred Photography Listings now fail a condition and **not one of them is written**.
Unit A binds `Service.on_update` to a fan-out that saves all 200 Listings — 200 `Listing.on_update`
events, 199 of which C4-1's guard eats. Unit B concludes there is no transition to raise, and FR-59's
"A Listing that stops satisfying them stops being discoverable until it does again" is dead code,
permanently and invisibly, on the trust spine. This is round-3 H3-1's unit-B failure, returning
through the door the C3-1 fix opened.

**Tightening.** AD-26's invocation rule needs a second clause for triggers that are not document
changes:

> Where a cascade's trigger is **not** a change to the cascading document, the trigger is made one:
> a named transition row (`Rule Acceptance`, `Cancellation`, `Listing Condition Change`) is written
> by whichever layer observes the trigger — `api/`, the scheduler, or a fan-out from the upstream
> document — and `doc_events` on **that** row is the single invocation. Naming the transition is
> what makes the Desk route and the API route the same route; binding `on_update` of the affected
> document is not, because Desk can change that document without the transition and the scheduler
> can cause the transition without changing that document.

Then delete AD-12's `on_cancel` prohibition, or restate it as "release is keyed to the cancellation
transition, which `docstatus` 2 now uniquely identifies."

---

### C4-3 — AD-35's flag write is the only thing that can raise cascade 4's event, and AD-35 does not say how it writes **[NEW in r4]**

**ADs in play:** AD-35, AD-26, AD-10, AD-16, FR-13, FR-53.

**Scenario.** AD-35: "That same function maintains an indexed `discoverable` flag on the Listing,
recomputed whenever an input changes and by the daily job that handles Subscription expiry."

AD-26: cascade 4 is invoked from a DocType lifecycle event and no other way. The nightly job does
not call the cascade; it "change[s] documents".

So `Listing.discoverable = 0` is the write that raises the event that runs FR-53's cascade. **How
that single indexed flag is written decides whether FR-53 works.** AD-35 does not say.

Unit A (Billing) writes it with `frappe.db.set_value` / `doc.db_set` — the ordinary Frappe idiom for
a denormalised flag, and the one the spine's own Consistency Conventions row invites ("DocTypes
persist computed fields"). Unit B (Trust) writes it with `doc.save()`.

**Resulting incompatibility.** Under **A** no cascade ever fires, on any of FR-53's four routes.
AD-26 says so in its own text: "`doc_events` does not fire for `frappe.db.set_value`." The Listing
drops out of search — the column is correct — and **not one Family is told**, no Selection is
cleared, no budget is adjusted. FR-53's "No route removes a Listing from a Family's view without
telling them" fails on all four routes at once, and the symptom is invisible because search is
correct.

Under **B** the cascade fires — and now the other half bites. AD-35 gives one function two jobs:
it is named as a predicate, `is_discoverable(listing)`, and specified to write. AD-10's availability
function "applies FR-13's subscription gate **by calling AD-35**". AD-20's read path calls it.
AD-29's object predicate calls it. So **a read calls a function that saves a document, which raises
`Listing.on_update`, which AD-26 binds to cascade 4.** A Family scrolling a results page notifies
Families. C4-1's guard makes it worse rather than better: the first Listing evaluated in a request
sets the flag and every subsequent Listing's genuine transition that request is suppressed.

**Tightening.** Split the two jobs and name the write:

> `is_discoverable(listing) -> bool` is **pure** and never writes. A separate
> `recompute_discoverable(listing)` compares the predicate to the stored flag, returns immediately
> when they agree, and **on a change writes through `doc.save()`** — never `db_set`, never
> `frappe.db.set_value` — because that write is the transition AD-26 binds cascade 4 to. Any caller
> may call the predicate; only the recomputer writes.

---

### C4-4 — AD-11's same-holder no-op cannot tell "already done" from "half done", so a retried Span confirmation reports success holding a partial closure **[NEW in r4]** *(created by the C3-2 fix; H3-9 was never written)*

**ADs in play:** AD-11, AD-31, AD-12, FR-14, FR-39, NFR 5.3.

**Scenario.** The C3-2 fix landed: "a unique violation against a row **held by the same Agreement**
is a no-op, **because the work is already done and this is a retry** (AD-31)."

Round 3's H3-9 asked for the other half and it is not in the text. Verified: AD-11 says nothing
about one seat per closure, nothing about atomicity, and the words "one transaction" occur exactly
once in the whole spine — in AD-12's *amendment* paragraph, not in AD-11's *confirmation* rule. So
the initial confirmation of a Span still writes its seven rows one at a time with no stated
atomicity.

Dattatray's hall, `concurrent_capacity = 1`. Rutuja's Span runs Haldi-morning (25th) to
Wedding-evening (27th) — seven rows. The confirmation writes rows 1–5, and row 6 (27-morning)
collides with another Agreement. AD-11: "declining only when every seat is taken" — it declines.
AD-11 says nothing about undoing rows 1–5, so five rows survive holding `held_by = this Agreement`,
an Agreement that was never confirmed.

The connection is dropped (NFR 5.3's stated scenario). The client retries with the same idempotency
key (AD-31).

**Resulting incompatibility.** Unit A implements the no-op as AD-11's rationale states it — the work
is already done, **return success**. The retry's first insert collides with the Agreement's own row
1, A returns success, and **the Agreement is confirmed holding five of its seven Slots.** 27-morning
and 27-evening are free, a third party takes the wedding day, and the couple has lost the venue on
the exact mechanism the occupancy design exists to prevent — with a successful response and no error
anywhere.

Unit B implements the no-op per row: skip this row, continue the closure. B's retry reaches row 6,
finds it still taken, and declines — correctly — but now declines *forever*, because the five orphan
rows are permanent (nothing releases rows held by an unconfirmed Agreement) and they are invisible
on the Vendor's calendar as anything but "held". FR-29's nudge then asks Dattatray to confirm
availability he cannot explain.

`held_by` made the failure *addressable* and simultaneously made it *look like success*. The
sentence "because the work is already done" is an assertion the model cannot check: nothing on an
occupancy row says whether the closure it belongs to is complete.

**Tightening.** AD-11 needs both halves of H3-9 and a completeness test:

> A confirmation allocates **one seat number for the whole closure** and writes **every row of that
> closure in one transaction**, at that seat. A closure that cannot be satisfied at a single seat is
> declined and **writes nothing**; partial row sets never exist. The same-holder no-op is therefore
> safe: a violation against this holder's own row can only mean the whole closure was already
> written. A retry re-derives the closure and compares its cardinality to the rows held; a mismatch
> is a defect, not a success.

---

### C4-5 — AD-33's legal hold is placed on a record; AD-14's erasure never touches the held record **[NEW in r4]**

**ADs in play:** AD-33, AD-14, AD-32, AD-27, NFR 5.5, FR-43, FR-63.

**Scenario.** AD-33: "**A record can be placed under legal hold**, naming who ordered it and when.
While a hold is in force **nothing automatic touches that record** — not the 180-day purge, not an
erasure request, not AD-12's eight-year expiry."

AD-14: "No record copies a person's name or number; every record references one person record …
**Erasure replaces the identifying fields there** with a stable non-identifying token, and every
referring record shows the token while keeping its content."

Unit A builds moderation and implements the hold exactly: a `Legal Hold` row referencing the held
document, and every deletion path checks it. Unit B builds privacy and implements erasure exactly:
one write to the **person record**, replacing the identifying fields with the token.

Both are fully compliant. Neither is wrong about anything.

**Resulting incompatibility.** A court orders the preservation of an Agreement and its `Agreement
Record` chain — the whole point of FR-43. Kiran places a hold on those documents. The counterparty
then exercises erasure. Unit B's erasure writes **one field on a different document**, and every
referring record — the held Agreement included — now shows a token. The held record was never
touched, so unit A's check never ran, so the hold never fired. **The evidential value the court
ordered preserved is gone, by a compliant write, with no error and no log entry naming the hold.**

The hold is on the wrong object. Under AD-14's design, identity lives in exactly one place, so the
only object whose preservation preserves anything is **the person record** — and AD-33 does not say
a person can be held. It says "a record".

The mirror case is as bad. Unit A holds the person record (the only reading that works), and now
**no erasure request against that person can ever be honoured**, including for data held purely on
consent, which NFR 5.5 says must be erased and says explicitly must not be re-derived downstream.

**Tightening.** In AD-33:

> A hold names **a record or a person**. A hold on a person suspends AD-14's erasure of that person
> record for as long as it lasts; a hold on a record suspends every deletion path that reaches it
> **and** AD-14's de-identification of any person that record's evidential value depends on. Placing
> a hold on a record therefore places a derived hold on its parties, recorded as such and lifted
> with it. An erasure that would de-identify a party to a held record is refused, and the person is
> told which basis applies (NFR 5.5).

---

### C4-6 — AD-26 mandates savepoints as the only undo, and a savepoint undoes only the database half **[NEW in r4]**

**ADs in play:** AD-26, AD-12, AD-21, AD-29, AD-31, FR-53, FR-69.

**Scenario.** AD-26: "`doc_events` handlers run with Frappe's transaction control disabled …
so a cascade that must undo part of its own work uses **savepoints**, never `rollback()`."

The claim about `doc_events` is **correct** and verified: `frappe.db._disable_transaction_control` is
incremented only around `doc_events` hook handlers (`frappe/model/document.py:1638–1645`), and
`commit()` / `rollback()` warn and return when it is set (`frappe/database/database.py:1176–1216`).

What AD-26 does not carry is the rest of the mechanism, which Frappe's own docstring states at
`frappe/database/database.py:1219`:

> "Note: **rollback watchers can not work with save points.** so only changes to database are undone
> when rolling back to a savepoint. **Avoid using savepoints when writing to filesystem.**"

Unit A builds FR-53's cascade: notify every Family (AD-21, WhatsApp), clear the Selections, adjust
the budgets, demote the portfolio objects (AD-29 — "promotion **moves the object** … and demotion
moves it out, with CDN invalidation"). It wraps the whole thing in a savepoint per AD-26. Unit B
builds FR-69's amendment: AD-12 says the day-move "applies a set difference, **in one transaction**
… if any new row collides with another Agreement **the whole amendment fails and the original days
remain held**. The transaction uses savepoints, per AD-26."

**Resulting incompatibility.** Under **A**, a failure late in the cascade rolls back the rows.
Forty Families have already been told a Listing is gone that is still live; the portfolio objects
have already been moved out of the public path and the CDN invalidated; and none of that comes back,
because a savepoint rollback runs no watchers and touches no object store. FR-53's "Nothing is
removed silently" becomes "things are un-removed silently", which is the same promise broken from
the other side, and the Vendor's live Listing now serves broken image tiles.

Under **B**, AD-12's guarantee is true of occupancy rows and false of everything else the amendment
did: the rendered immutable bytes (AD-12 requires "the document rendered from them at that moment,
kept as immutable bytes"), the WhatsApp notification to both parties, and — worst — **the appended
`Agreement Record` row**, if the append happened before the transform. AD-12 does not state the
order (see M4-4), and `Agreement Record` "refuses deletion in `on_trash`" under AD-27's append-only
property. So a failed amendment can leave a permanent, hash-chained, undeletable record of terms
that were never effected, with the head digest and count already advanced.

**Tightening.** In AD-26, alongside the savepoint sentence:

> A savepoint undoes **rows only** (`frappe/database/database.py:1219`). A cascade therefore does
> **no irreversible work inside its transaction**: no message send, no object move, no CDN
> invalidation, no rendered-bytes write. Those are queued as effects and dispatched **after** the
> enclosing transaction commits, keyed idempotently per AD-31. A cascade that sends or moves before
> its rows are durable is the defect.

And in AD-12: state that the chain append is the **last** step of the amendment, after the occupancy
transform has succeeded.

---

## 2. High

### H4-1 — AD-16's cascade carve-out is scoped by module location, not by call stack, and evaporates one function below `domain/` **[NEW in r4]**

AD-16's new third row reads `frappe.get_all`, **only inside `domain/`**. Unit A's cascade resolves
the affected Families itself and passes rows down to the notifier. Unit B passes ids and lets a
`notifications/` module resolve names, numbers and locale — that module is not in `domain/`, so per
AD-16 rows 1 and 2 it must use `get_list` (the read is request-derived) and, running as the
withdrawing Vendor, **it resolves nothing**. FR-53's notification is empty again, one call below the
carve-out, and C3-4 is closed at the layer and open at the boundary.

**Tightening.** Scope the carve-out to the *operation*, not the module: "a read performed **on behalf
of a cascade**, wherever it executes, is category 3 and carries the comment naming the cascade."
Better still, make the cascade's entry point set an explicit system-scope context that the notifier
inherits and that `check_whitelisted.py` can see.

### H4-2 — AD-35 says "one writer" in its enforcement line and "recomputed whenever an input changes" in its rule; the inputs live on four other DocTypes and none is named **[NEW in r4]**

`is_discoverable` reads: verification complete, every condition of listing satisfied, a Subscription
active or in Grace, not withdrawn, not removed. Those inputs live on `Verification`, `Service` (via
FR-71's required capabilities), `Subscription` and `Vendor` — **none on the Listing**. So "recomputed
whenever an input changes" is N writers, one per input DocType, and "one definition, one writer" is
false as stated. Unit A (Billing) recomputes on `Subscription.on_update`; unit B (Trust) recomputes
on `Verification.on_update`; nobody recomputes on Vendor removal or on the Service change that
FR-62/UJ-4 makes routine. Search filters a stale column, and the staleness is invisible.

The Grace boundary is worse than a race, it is a scheduled window. Grace ends at a **per-Vendor**
timestamp; the flag is recomputed by "the daily job". Between the two, search returns the lapsed
Listing and AD-10 shows dates — FR-13 says "shows **no dates at all**". AD-35 states no relationship
between the job's run time and the boundary.

**Tightening.** Enumerate the inputs as an explicit list of `(doctype, event)` bindings in AD-35 and
require the recomputer be bound to each; state that the daily job's role is a **sweep for
correctness**, not the primary writer, and that the flag is a cache whose authority is the function.

### H4-3 — AD-35 claims callers whose predicate is not the same predicate **[NEW in r4]**

AD-35: "AD-10's subscription gate, AD-20's public read path, AD-26's cascade, AD-27's conditions of
listing **and AD-29's public-object predicate** all call it." AD-29's predicate is
`verified AND within allowance AND not taken down` — three *image-level* terms, none of which is
`is_discoverable(listing)`.

If AD-29 genuinely calls it, then a Subscription lapse **physically moves every portfolio object out
of the public path with CDN invalidation** (AD-29 forbids a flag beside an already-public URL), and
FR-53 says "Nothing belonging to the Vendor is destroyed … portfolio … retained and reappear intact
on renewal", while existing Agreements and open threads stay live and the Family on the other side
of one loses the portfolio she is corresponding about. If AD-29 does not call it, AD-35's sentence
is false and one of its five claimed callers is not a caller.

Two units, two readings, and one of them moves thousands of objects on every lapse and back on every
renewal, at an unbudgeted cost nobody has costed.

### H4-4 — The image predicate still has two definitions; `is_publicly_visible(image)` does not exist **[STILL OPEN — H3-2 not closed]**

The brief records H3-2 as addressed by "AD-29 now includes not-taken-down; AD-35 centralises
discoverability." Verified against the text: **AD-20 still reads "An image is publicly visible only
if verified *and* within the Tier's allowance — two independent gates"** — two terms, no takedown.
AD-29 reads three. `is_publicly_visible` occurs **zero times** in the spine. AD-35 centralises a
*Listing* predicate, which is a different predicate about a different entity, and none of its five
terms is an image term.

So round 3's finding is unchanged: unit A implements AD-20's two-term filter on the read path, a
court-ordered image passes it, and its URL, caption and portfolio position are returned in the API
response — on the one case carrying a three-hour statutory clock.

The second half is also untouched. "Within the Tier's allowance" is a property of an image
*relative to an ordering*, and no AD says which N of M. Verified: "publication order" and "upload
order" occur **zero times**. On a downgrade from 20 images to 5, AD-29 requires 15 objects moved and
each unit moves a different 15.

**Tightening.** As round 3: one `is_publicly_visible(image)` owning all three terms, with AD-20,
AD-29 and AD-33 each stating their term and deferring; and the allowance defined as the first N of a
Vendor-ordered list, defaulting to upload order.

### H4-5 — AD-36 asserts "covers" is a range comparison and never says which direction **[NEW in r4]**

AD-36's Prevents is "two epics … disagreeing on what 'covers' means", and the Rule resolves it only
to "a range comparison rather than a recursive walk". A NestedSet range comparison is
**directional**, and both directions are defensible against FR-33:

- *Ancestor-or-self*: the Vendor's declared node contains the Wedding's Place. Dattatray declares
  Pune district; a Wedding in Baner matches.
- *Overlap in either direction*: FR-33's "A Family sees the Vendors whose declared area covers that
  Place, **at any level of the hierarchy**" reads as symmetric.

The case that separates them is the common one at launch: **Rutuja has not picked a town yet, so her
Wedding's Place is Pune district.** Under ancestor-or-self, every Venue — each of which "serves the
place it stands in", a leaf — fails to cover a district, and she sees **zero venues**. Under
overlap, she sees every venue in the district, including ones four hours away. Unit A ships one,
unit B ships the other, and FR-20 makes this the *set* being ranked, so nothing downstream agrees
either.

**Tightening.** State the predicate as one line of set logic covering both a travelling Vendor's
declared areas and an immovable Space, and name what happens when the Wedding's Place is at a higher
level than the Listing's.

### H4-6 — "The Place a Listing sits at" is undefined for a travelling Vendor, and FR-57's floor is a privacy floor **[NEW in r4]**

AD-36: "AD-22's rating shrinkage and FR-57's five-vendor floor are computed over the Place a Listing
sits at, not over its ancestors." FR-33 gives a travelling Vendor **several declared areas at
different levels** and no single Place. So "the Place a Listing sits at" is defined for a Venue and
undefined for the four other seed Services.

Unit A uses the Vendor's registered address Place. Unit B counts the Listing once per declared area,
so a photographer declaring three districts appears in three aggregates. Unit C uses the lowest
common ancestor of the declared areas.

FR-57's five-vendor floor is not a quality threshold, it is a **privacy** threshold — "Below that,
an average identifies the competition." Unit B's reading inflates every district's count with the
same travelling Vendors and **shows a comparison that identifies a competitor's figures**, which is
the one thing FR-57 exists to prevent. Unit A's reading suppresses comparisons that are legitimately
available. There is no way to tell from AD-36 which is intended.

Compounding: **AD-22 states the shrinkage target as "the Service-and-Place average" and omits FR-20's
fallback ladder entirely** — FR-20 requires Service-and-Place → Service-across-all-Places →
platform-overall → other signals alone, and says explicitly that the first is missing "for every
Service on the day a Place opens", i.e. for every Service at launch. A unit implementing AD-22
verbatim has no average on day one.

### H4-7 — AD-36 puts the Rule on the Listing; FR-24 binds it per Space **[NEW in r4]**

AD-36: "A Rule is a typed row **on the Listing**." FR-24: "Where such a Rule is in force **for a
Space the Family has taken**, their choices in that Service are limited to the permitted set", and
"The Family can see, before engaging a Space, which Services **that Space** will close off."

Dattatray's Listing has a lawn and a hall. The lawn forbids outside caterers because of the kitchen
arrangement; the hall does not. **This cannot be expressed.** Unit A puts Rules only on the Listing
per AD-36 and over-restricts every Space, so FR-32 warns Rutuja that engaging the hall closes her
caterer when it does not, and she declines an engagement for a false reason. Unit B adds a Rules
child table to `Space`, contradicting AD-36 and AD-6's core enumeration (FR-23's list of what a
Space holds is capacity, Stated Size, price and calendar — not Rules).

**Tightening.** Say where a Rule attaches, and if it is per-Space, say that FR-59's "published
Rules" condition of listing is satisfied at the Listing level while `restrict_service` binds at
whatever level it is declared.

### H4-8 — `restrict_service` resolves live to a set FR-25 makes acceptance-gated and withdrawable, while FR-32's warning fires once **[NEW in r4]**

AD-36: `restrict_service` "**resolves to** that Vendor's Preferred Vendors for it". FR-25: a
Preferred association requires the named Vendor's acceptance and is a relationship that changes.
FR-32: the Family is shown the consequence **before she engages**, must accept it explicitly, and
"**Nothing is ever removed silently.**"

Unit A resolves live (AD-36's plain reading). Three weeks after Rutuja engages the lawn, Dattatray
drops a caterer from his Preferred list. Rutuja's Selection is now impermissible, **with no event, no
warning and no cascade** — FR-32's promise breaks in the interval AD-36 created. Unit B snapshots
the permitted set at engagement, which keeps FR-32 honest and breaks FR-25's "Once a Family has
engaged a Vendor, that Vendor's Preferred Vendors are surfaced distinctly to them" for every later
addition.

This is round-3 H3-5's unnamed Preferred-Vendor cascade, now made continuous rather than episodic by
AD-36's live resolution.

### H4-9 — AD-27's general property is not decidable by a builder; three worked cases go three ways **[NEW in r4]**

The brief asks whether the property is decidable. It is not. The property:

> "any record that evidences a legal obligation, **or a person's standing**, is **append-only** — a
> correction is appended and nothing is ever overwritten or deleted, by anyone, Admin included."

**Case 1 — the verification state.** AD-20: "Each verifiable item carries **its own state**", and
FR-70 makes failure "a state a Vendor can act on … They correct what was wrong and resubmit." A
verification state flips: pending → verified → pending → verified. Is the platform's published claim
about a business "a person's standing"? Obviously arguable both ways. Unit A implements AD-20's
mutable per-item state; unit B refuses the update in `validate` and appends. Two schemas on the trust
spine, and B's schema makes AD-20's "filters on it" a query over the latest row per item, which is
different code everywhere it is read.

**Case 2 — the person record.** AD-14's erasure "replaces the identifying fields **there**" — an
overwrite of the record that carries FR-42's publicly displayed cancellation count, which is the
most literal "record of a person's standing" the platform has. If it is covered, erasure is
impossible. If it is not, the property excludes the record that most obviously satisfies its own
words. Unit A erases; unit B's controller refuses; both cite AD-27 and AD-14.

**Case 3 — the lead outcome.** FR-37's "what became of it" feeds FR-55, FR-56, FR-57's aggregates and
**AD-22's median-first-reply ranking signal**, which FR-64 requires be published as a determinant of
standing. Append-only, or a correctable field? Unit A lets a Vendor fix a mis-tap; unit B makes every
mis-tap permanent and visible in the aggregate.

The property is stated as if it removes the need for judgement — "*A record nobody thought to list is
still covered by this sentence*" — and it in fact relocates the judgement into every builder's head,
one document at a time, where two people exercise it differently and neither is wrong.

**Tightening.** Replace the open-ended noun with a decision procedure a builder can run without
judgement: a record is append-only iff **(a)** a third party — a regulator, a court, a counterparty —
could be expected to rely on its content as of a past date, **or (b)** the spine's `Binds` for it
names FR-43, FR-46, FR-61 or FR-63. Then apply the procedure to the three cases above **in the AD**,
because they are the ones a builder will actually hit, and record the answers.

### H4-10 — AD-13's cancellation count cannot express "rolling 24 months" as a counter, and AD-27's new property now forbids it being one **[NEW in r4]**

AD-13: "FR-42's profile-visible count is **its own explicit field**, written only by an actual
cancellation, displayed over a **rolling 24 months**."

A counter cannot be rolled. Decrementing it as an event ages past 24 months requires knowing the
events, which a counter by definition does not hold — so AD-13's stated mechanism cannot produce
AD-13's stated display. And AD-27's new property makes a publicly displayed record of a person's
standing append-only, which forbids the counter outright.

Unit A implements AD-13 verbatim (a field, incremented) and the display is a lifetime count
mislabelled as 24 months. Unit B implements an append-only `Cancellation Event` table with a derived
count — correct, and now in tension with the Consistency Conventions row that says Frappe persists
computed fields and with AD-35's just-established precedent for storing a derived flag.

**Tightening.** Make it an append-only event table with the count derived over the window, and say
so in AD-13; note it as the case where the store-the-computed-value convention does not apply,
because the value is time-dependent rather than input-dependent.

### H4-11 — AD-33's hold clause contradicts its own list, and the hold/erasure race has no evaluation rule **[NEW in r4]**

The brief asks whether a hold and an erasure request can race. Three ways.

**(a) The general clause and the list disagree.** "While a hold is in force **nothing automatic**
touches that record — not the 180-day purge, **not an erasure request**, not AD-12's eight-year
expiry." An erasure request is the least automatic thing on that list: it is a person exercising a
right, arriving at a human. Unit A reads the list and blocks it. Unit B reads the operative
adjective — *automatic* — and lets the human-initiated erasure through, breaching a preservation
order. The sentence contains both answers.

**(b) No evaluation time.** The request arrives at T; the hold lands at T+1 minute; DPDP's response
window means execution is at T+n days. Unit A snapshots eligibility at request time and erases held
material. Unit B re-evaluates at execution. AD-33 does not say.

**(c) No re-queue.** A hold lifted after an erasure was refused — is the erasure re-queued, or has
the person's request been consumed? AD-33 requires only that the person be told which basis applies.
Unit A drops the request; the person is never erased and is never told the basis has lapsed. Unit B
queues it and erases material a second hold now covers.

**Tightening.** State that hold status is evaluated **at execution**, that a refused erasure is
**retained as a standing request** re-evaluated when the hold lifts, and that the person is told both
at refusal and at completion.

### H4-12 — AD-32's guest-contact access log is a copy of the identifier AD-14 forbids, and AD-14 erases the only thing that makes the log usable **[NEW in r4]**

AD-32 requires that every read of a Guest contact field is logged, Desk included, and that a `Breach
Incident` enumerates "the affected people **from those logs**". AD-14 requires that guest contact
details are **erased outright** 30 days after the Wedding concludes.

Unit A logs the Guest record's key. A breach discovered on day 40 covering day 20 enumerates keys
whose contact fields were erased on day 30: the affected people are identified and **unreachable**,
so the 72-hour notification to *those people* cannot be made. Unit B logs enough to notify — the
number — which is a copy of an identifier outside the person record, which AD-14's first sentence
bans and which survives every erasure path the spine has.

Both units satisfy the AD they were built from and neither satisfies both.

**Tightening.** Decide it: either the access log is itself within AD-14's erasure schedule and the
breach obligation is scoped to incidents discovered while the data is live (say so, and record it as
an accepted limit), or the log carries a retained contact under a stated legal-duty basis (AD-32) and
AD-14's "erased outright" gains its one named exception.

### H4-13 — AD-14 gives a Guest two incompatible erasure semantics, and the ERD gives a Guest no person record **[NEW in r4]**

AD-14 in one paragraph: "**every record references one person record**, whose key is opaque … Erasure
replaces the identifying fields there with a stable non-identifying token" **and** "**Guest contact
details are erased outright**".

If a Guest is a person record, the two sentences prescribe different operations on the same row
(tokenise vs. erase) and AD-14 does not say which wins for a Guest. If a Guest is not a person
record, then the Guest row carries a name and a number — the exact copy AD-14's first sentence
forbids — and the ERD confirms this reading: `WEDDING ||--o{ GUEST` with **no `PERSON` link**, while
`PERSON` links only to Agreement, Review and Consent.

AD-32's see-and-correct surface then has to find "a person who never held an account" by mobile
number, which is only possible in the second reading. So the ERD and AD-32 both assume Guests are
outside the person model, and AD-14's universal says they are not.

**Tightening.** State that a Guest is a **person record with a purpose-limited retention outcome**
(AD-32: `erase`, *purpose-limited*), so erasure of a Guest is the same operation as any other
erasure, executed early. That reconciles all three ADs and makes AD-32's surface findable by design.

### H4-14 — AD-33's guest carve-out contradicts its own same-record clause, in the same paragraph **[NEW in r4]**

AD-33: "Where a retention duty and an erasure request collide **on the same record**, retention wins
… it never reaches a record under no retention duty: a Guest's contact details are erased on AD-14's
schedule regardless of anything removed elsewhere."

The carve-out holds only while the removal is *elsewhere*. A Guest complains under FR-63 that their
number was uploaded to a guest list without consent. The grievance produces a takedown of **that
submission**, which carries the 180-day retention. Now the retention duty and the erasure are on the
**same record** and AD-33's first clause says retention wins — over the erasure of the platform's
most exposed data class, for the person who complained, as a direct consequence of complaining.

Unit A applies the same-record clause; unit B applies the carve-out. Both quote AD-33.

**Tightening.** Say that the takedown *record* (its ground, authority and disposal) is retained 180
days and the *contacted datum* is erased on AD-14's schedule — which is exactly what H3-3's
tightening said for content generally and which this paragraph did not apply to its own example.

### H4-15 — Occupancy still has one holder type, so FR-28's Vendor block has nowhere to live and the retry predicate has an undefined third case **[STILL OPEN — H3-4]**

Verified: `held_by` is typed as "**the Agreement** holding it", and the words *vendor-declared*,
*Slot block* and *block Slots* occur **zero times** in the spine. FR-28 — "A Vendor can block Slots
for maintenance, family use or any reason" — is constrained by no AD.

The `held_by` fix makes this worse rather than better. AD-11's retry now branches on two cases: same
Agreement (no-op) and **another Agreement** (advance a seat). A collision against a Vendor block is
neither. Unit A treats "not the same holder" as "advance" and books over the Vendor's family
function at seat 1. Unit B treats "not another Agreement" as the no-op branch and **reports a
successful confirmation that holds nothing**. And "cancellation deletes the rows held by that
Agreement and nothing else" gives release semantics to Agreements and none to Vendor blocks.

### H4-16 — AD-10 still never defines "free", and never mentions a seat **[STILL OPEN — H3-6]**

Verified: AD-10's Engagement Model table asks "Is every `(day, slot)` … **free**?" and the words
*seat* and *concurrent_capacity* do not appear in AD-10 at all. Unit A implements `NOT EXISTS`;
unit B implements `count < concurrent_capacity`. Under A the photographer's second crew never sells
and AD-11's entire reason for existing is defeated on the read side. FR-20 makes availability the
first ranking signal, so the catalog's ordering depends on which unit shipped first.

### H4-17 — The Service→Function mapping FR-68 creates is still unmodelled, and AD-36 now reads it too **[STILL OPEN — H-5]**

Verified: "Wedding Service" occurs zero times; the ERD's only trace is
`WEDDING ||--o{ SHORTLIST : "one per selected Service"`. FR-68 — "A Service may be selected for the
whole Wedding **or for particular Functions**" — is cited by no AD (FR-68 occurs zero times in the
spine). Yet AD-10 reads "only the Functions that Service serves within the Block" and AD-11 reads
"the first served Function's start Slot", and AD-36's `restrict_service` must know which Services the
Wedding has selected before it can tell the Family what engaging a venue closes off.

Three ADs now depend on a mapping with no entity, no cardinality and no owner.

### H4-18 — The ERD still hangs Enquiry off Selection **[STILL OPEN — H-6]**

Verified: `SELECTION ||--o{ ENQUIRY : "creator only"`. FR-34 lets a Family send one Enquiry to
several Vendors; FR-8 says a Shortlist contributes nothing and a Selection contributes its price.
Enquiring five caterers therefore forces five Selections and five budget lines, or forces the
implementer to break the ERD.

### H4-19 — The running budget still has no owner, and five cascades mutate it **[STILL OPEN — H-7]**

Verified: "running budget" occurs twice, both as a passing reference (AD-6, AD-19); no AD owns it and
no entity carries it. FR-8 requires more than a sum: a Span contributes once for the whole Span, a
confirmed Agreement replaces the Selection's estimate, per-head lines show their multiplication,
"not yet estimated" must not render as ₹0, and **the Family can adjust any derived figure and add a
cost the platform knows nothing about** — so the budget is not purely derived and holds user rows.

AD-26's cascades 1, 2, 3, 4 and 6 all mutate it. Unit A persists a total on `Wedding` (per the
Consistency Conventions row and AD-35's new precedent) and the cascades' adjustments silently
overwrite the Family's manual overrides on the next recompute. Unit B derives on read and the five
cascades have nothing to adjust, so FR-53's "the budget adjusted" is a no-op.

### H4-20 — The three-homes criterion was never written, and AD-16 has now made a controller rule reading `session.user` actively dangerous **[STILL OPEN — H3-8]**

Verified: AD-18 still ends at "A gate that must also bind Admin belongs in the controller instead —
see AD-27", and AD-27 still says "any rule that must hold regardless of who is acting". Neither
carries round 3's three-question criterion, and AD-27's list still reads as closed while AD-33 and
AD-34 cite it for rules it does not name.

The round-3 failure is unchanged and one part is now worse. AD-16's third category ends "**Every
write a cascade makes still records the person who triggered it**" — so a cascade writes as a user
who is not a party to the document being written. A controller rule expressed over
`frappe.session.user` (unit B's reading of the confirmation gate) now fails on every cascade write,
and the spine still nowhere says a controller rule must be expressed over document state only.

---

## 3. Medium

### M4-1 — AD-23's job descriptions still have jobs performing cascade work, which AD-26's new rule forbids **[NEW in r4]**
AD-23 lists "Grace Period end → **withdraw from discovery and notify every Family holding it**" —
the job doing the cascade's work. AD-26 now says the scheduler "change[s] documents and never call[s]
a cascade directly". Unit A implements AD-23's description and writes the cascade a second time,
which AD-26's "each has exactly one implementation" forbids. Unit B implements AD-26 and AD-23's
entry misdescribes what the job does. Rewrite every AD-23 entry whose description overlaps a cascade
as "writes X", with the effect owned by AD-26.

### M4-2 — AD-11's retry loop is MariaDB-dialect-dependent and the hosting decision is deferred **[NEW in r4]**
A unique-key violation leaves a MariaDB transaction usable; in PostgreSQL it aborts the transaction
and every subsequent statement fails until rollback. AD-11's "advance to the next free seat" loop
therefore works on one driver and not the other, and Frappe v16.33 ships `frappe/database/mariadb`,
`postgres`, `sqlite` and `duckdb` (verified). The Deferred section leaves hosting undecided among
Frappe Cloud, a VPS bench and `frappe_docker`. Either pin MariaDB as an architectural constraint in
the Stack table with this as the reason, or require a savepoint per insert attempt.

### M4-3 — Admin opening a Place at runtime renumbers the tree, and AD-6's indexed columns invite denormalising it **[NEW in r4]**
Verified in `frappe/utils/nestedset.py:90–97`: `update_add_node` runs
`UPDATE … SET rgt = rgt + 2 WHERE rgt >= right` and the same for `lft` — **inserting one Place
renumbers every node to its right**, and `update_move_node` renumbers more. AD-8 says Admin opens a
Place at any level "without a release", i.e. at runtime in production; AD-36 says coverage is a range
comparison; AD-6 says detail fields are "real indexed columns" and the Deferred section keeps a
Meilisearch/Typesense swap open. A unit that denormalises `lft`/`rgt` into the Listing or the search
index — the obvious optimisation for FR-18's Place filter — has its coverage silently corrupted the
next time Kiran adds a village. State that `lft`/`rgt` are never copied out of the `Place` table, and
that a Place insert invalidates any derived index.

### M4-4 — AD-12 does not state whether the chain append or the occupancy transform comes first **[NEW in r4]**
Unit A appends `seq+1` and then transforms (natural: the record *is* the amendment). Unit B
transforms and then appends. Under A a failed transform must remove the record row, which `on_trash`
refuses and AD-27's append-only property forbids — so A cannot fail cleanly, and produces a
hash-chained record of terms that were never effected with the head digest and count already
advanced. See C4-6.

### M4-5 — The amendment set difference does not fix the seat number **[NEW in r4 — C3-3 partially closed]**
AD-12's transform says which rows are inserted and deleted and never says at which seat. Unit A
inserts the new rows at "the lowest free seat" per AD-11, which may differ from the seat the
untouched rows hold; at a Venue with `concurrent_capacity = 2` one Agreement then occupies seat 0 on
the 26th–27th and seat 1 on the 25th, which means two simultaneous events for one wedding and
consumes the hall's remaining capacity. Round 3's tightening ("the chain's seat number does not
change across an Amendment") was not carried into the text.

### M4-6 — `concurrent_capacity` is still absent from AD-6's core enumeration and is still not a condition of listing **[STILL OPEN — H3-10, M3-3]**
Verified: `concurrent_capacity` occurs **once** in the whole spine, in AD-11. AD-11 requires it "on
the **core** Listing or Space"; AD-6's enumeration of the core is "Vendor, Service, all-in price,
Rules, Commitment, verification state, portfolio, Place coverage" — it is not there. AD-27's publish
conditions are Verification, all-in price, Rules and Commitment — it is not there either. So a
Listing publishes with a null capacity and the failure surfaces at the Vendor's first confirmation,
where AD-11 "never implicitly defaulted" leaves no seat range to compute.

### M4-7 — AD-16 requires a cascade's writes to record "the triggering person", and three of the four FR-53 routes have no person **[NEW in r4]**
Route 1 is time; route 4 may be a Service edit by an Admin who never saw the Listing. AD-26 promises
the four routes "behave **identically** for Families"; AD-16 makes their attribution differ. Unit A
stamps `Administrator` for scheduler-triggered cascades; unit B stamps the last acting user. FR-61's
audit then reads differently per route, and Frappe stamps `modified_by` on the Family's own Selection
row with a Vendor's user id under route 2. State the attribution rule for a cascade with no human
trigger.

### M4-8 — AD-26's enumeration is still closed at six, while AD-27 gained the escape clause AD-26 needs **[STILL OPEN — H3-5]**
AD-27 now says "*A record nobody thought to list is still covered by this sentence*"; AD-23 says "a
job with no listing is the defect"; AD-26 still says "**Six operations**" with no test and no
"absent from this list is a defect in this AD". Still unnamed and still cross-entity: Amendment
confirmation (FR-69), **return** to discovery, Tier-change allowance re-evaluation (H4-4),
guest-count divergence (FR-69/FR-11), Preferred-Vendor change (H4-8, FR-25). A careful unit reading
a closed list of six concludes its operation is not a cascade and puts it in `api/`.

### M4-9 — Cascade composition still has no signature and no reason parameter **[STILL OPEN — M3-9]**
AD-26 now explicitly composes cascades (FR-60 → FR-53) and still states no signature. AD-13 exempts
FR-69 amendments and FR-60-driven cancellations from FR-42's count and assigns FR-17 moves to it;
FR-32's Rule-conflict cancellation is "recorded on both profiles" and is assigned nowhere. Without a
reason parameter, a cancellation reached through cascade 6 (abandonment) writes a walk-out onto a
Vendor's publicly displayed rolling count.

### M4-10 — AD-27 still reads as "a Listing cannot be published", which is the unsaveable reading **[STILL OPEN — H3-1, partial]**
AD-35 supplies the right lever (discoverability), but AD-27's text is unchanged: "a Listing cannot be
published without Verification, an all-in price, Rules and a Commitment". Unit A reads it as a guard
on the *publish transition*; unit B reads it as an invariant on the *published state* and refuses
every save of the two hundred Photography Listings that now fail FR-71, so the Vendor cannot supply
the field he is being asked for. Add the sentence round 3 asked for: "AD-27's controller guard blocks
the publish transition and blocks becoming discoverable, and never blocks a save."

### M4-11 — AD-32's classification is per datum; AD-14 says the data is in one place **[NEW in r4]**
"Every personal datum records what happens to it on an erasure request" implies personal data spread
across DocTypes; AD-14 says identifying data lives only on the person record and no record copies it.
Unit A puts one retention outcome on the person record; unit B adds a per-field classification to
every DocType. Both are compliant; only one is auditable. Say which grain the classification lives
at, and reconcile it with H4-13's Guest question.

### M4-12 — The one endpoint that returns personal data to an unauthenticated caller is protected by the rate limit the spine defers **[NEW in r4]**
AD-30's identity-asserting tier (a genuine improvement, and H3-7 is closed by it) rests entirely on
AD-28's OTP issuance limits — "at most five attempts and three resends per hour per number" — and
AD-28 says those limits are "configuration: **off in development**, required before the first real
user". The see-and-correct surface with limits off is the mass-enumeration oracle H3-7 identified.
Name this surface explicitly in the Deferred rate-limiting paragraph as one that must not ship before
the limits, rather than leaving it inside a general "before the first real user".

### M4-13 — AD-36 introduces vocabulary AD-24's binding Glossary does not carry **[NEW in r4]**
`Place`, `restrict_service`, `informational`, and (from AD-11) `concurrent_capacity`, `seat`,
`held_by`. AD-24 makes PRD §3 binding "in DocType names, fields, zod schemas and UI copy" and §3
carries none of these. Either extend the Glossary through AD-24 or say that spine-introduced
identifiers are outside its scope — the current text says the Glossary is exhaustive and it is not.

### M4-14 — The Site Visit is still unmodelled and AD-11 still does not say it takes no Slot **[STILL OPEN — M3-7]**
Verified: "site visit" occurs zero times; FR-38 is cited nowhere. FR-39 says "Nothing holds a Slot
before an Agreement exists. A Quote reserves nothing, a Site Visit reserves nothing." AD-11 lists
which Engagement Models create no occupancy rows and never lists the Site Visit, so the natural
product decision — a visit is an appointment on the Vendor's calendar — writes a row and consumes a
seat.

---

## 4. Low

- **L4-1 [STILL OPEN — L3-3]** The source tree still comments `hooks.py # scheduler_events (AD-23)`.
  `doc_events` is now the **entire** invocation mechanism for six cascades and appears nowhere in the
  tree. A unit reading the tree will not know it lives there.
- **L4-2 [STILL OPEN — L3-1, partial]** AD-11's `Binds` still omits **FR-28** (whose Vendor block its
  rows must carry) and **FR-14** (whose Span-continuity sentence it quotes); AD-10 gained FR-28 and
  still omits **FR-53**. AD-35's `Binds` omits **FR-70** despite carrying the Vendor's own
  withdrawal.
- **L4-3 [NEW]** `is_discoverable(listing)` and the column `discoverable` differ by an underscore and
  by freshness. A call site reading `listing.discoverable` and one calling `is_discoverable(listing)`
  are indistinguishable in review and can disagree (H4-2). Name the column something the eye
  separates — `discoverable_cached`, or similar.
- **L4-4 [NEW]** AD-27's parenthetical "*This spine's enumerated lists have been incomplete three
  times*" is now in two ADs and is doing real work in both. It should be a stated convention in the
  preamble to *Invariants & Rules*, applied to every list including AD-26's six (M4-8), rather than
  an aside repeated where someone remembered it.
- **L4-5 [NEW]** The Deferred "Review history" paragraph is now honest and well written — it says a
  fourth round has not run and to assume it will find defects. It has. Update it rather than deleting
  it; the honesty is the most useful sentence in the section.

---

## 5. The brief's questions, answered directly

**Does "`api/` never calls a cascade directly" work for all six cascades, including ones with no
obvious document change?** No — it works for three. Cascade 2 (FR-32 acceptance) has no document
change and the obvious one fires at the wrong moment, destroying the Family's Shortlist before
confirmation, which FR-32 forbids in terms. Cascade 3's only lifecycle event is the one AD-12
prohibits, and the alternative leaves Desk cancellation running no cascade at all. Cascade 4's
Subscription-lapse route has no document change (time passes) and its condition-ceasing route has
none when the trigger is a Service edit. See C4-2.

**Is the re-entrancy guard's scope (per request) correct?** No, twice over. Its *breadth* is wrong —
"suppresses further cascades" forbids the composition AD-26 requires three paragraphs later for
FR-60, and FR-32 and FR-17 both require a nested cancellation. Its *lifetime* is wrong — verified,
`frappe.flags` is per-`frappe.init()` (`frappe/__init__.py:115,169`), not per document, so in AD-23's
nightly job the first lapsed Listing cascades and the rest silently do not. See C4-1.

**AD-35: who writes the flag, when, and can it go stale?** Unstated, N writers, and yes. The rule
says "recomputed whenever an input changes" while the enforcement line says "one definition, one
writer"; the inputs live on `Subscription`, `Verification`, `Vendor` and `Service`, none of them
named. **The larger finding is that the write mechanism decides whether FR-53 works at all**:
`db_set` raises no `doc_events`, so the flag would be correct and no Family would ever be told (C4-3).

**Do two units — one calling the function, one trusting the flag — ever disagree?** Yes, and AD-35
sanctions both. Any staleness window produces AD-15's list/document mismatch one layer up: search
returns a Listing the detail page then refuses, or a discoverable Listing is absent from search and
the Vendor's Lead Dashboard reads zero. AD-35 does not say which source wins.

**What recomputes it when a Subscription lapses at midnight?** "The daily job." Grace Period end is a
per-Vendor timestamp, not a global midnight, and AD-35 states no relationship between the job's run
time and the boundary. Until the job runs, search returns the Listing and AD-10 shows dates — FR-13
says "shows no dates at all".

**AD-36: can two units disagree on what "covers" means across levels?** Yes — the range comparison's
direction is unstated, and the case that separates the readings (a Wedding whose Place is a district)
gives one unit every venue and the other none (H4-5). "The Place a Listing sits at" is additionally
undefined for every travelling Vendor, and FR-57's five-vendor floor is a privacy threshold, so one
reading leaks a competitor's figures (H4-6).

**Does `restrict_service` interact correctly with FR-32's warn-and-accept and AD-26's cascade?** No,
in three ways: the permitted set resolves live to a relationship FR-25 makes withdrawable, so a
Selection can become impermissible silently after the one-shot acceptance (H4-8); the Rule sits on
the Listing while FR-24 binds it per Space (H4-7); and the cascade that must fire on acceptance has
no correct lifecycle event (C4-2).

**Is AD-27's general property decidable by a builder?** No. Three cases a builder will actually hit —
the verification state, the person record under erasure, and the lead outcome that feeds a published
ranking signal — each go two ways on "a person's standing", and both readings are defensible (H4-9).
The property reads as if it removes judgement; it relocates it into every builder's head.

**Can a legal hold and an erasure request race?** Yes, and worse: **the hold cannot see the erasure
at all.** AD-14's erasure writes one field on the person record and never touches the held document,
so a hold placed on an Agreement is defeated by a compliant write elsewhere (C4-5). On top of that,
AD-33's general clause says "nothing **automatic**" while its list says "not an erasure request",
which is not automatic; there is no evaluation-time rule; and there is no re-queue rule (H4-11).

**Does AD-14's guest erasure interact correctly with AD-33's scoped retention?** The scoping fix
(H3-3) landed and is right. Two corners defeat it: a grievance about a guest submission puts the
retention duty and the erasure **on the same record**, where AD-33's own first clause says retention
wins (H4-14); and AD-32's mandatory access log is either erased with the contact — making breach
notification impossible — or retains the identifier AD-14's first sentence bans (H4-12).

---

## 6. Verified closed since round 3 — not re-reported

- **C3-1's double-fire.** Genuinely dead. "Exactly one way" removes the two-invocation problem
  cleanly, and the self-loops it created are addressed by the guard. The residuals are C4-1 (the
  guard's breadth and lifetime) and C4-2 (three triggers with no event).
- **C3-2's cross-holder collision.** Closed. A violation against another Agreement's row advancing a
  seat is correct, and `held_by` is the right column. The residual is C4-4 — the *same*-holder branch,
  which is unsound only because H3-9 was never written.
- **C3-3's amendment window.** Closed at the root. The set difference is the right mechanism, stated
  well, with the delete-then-insert prohibition and the reason for it. Residuals: the seat (M4-5) and
  the ordering against the chain append (M4-4).
- **C3-4's cascade read scope.** Closed at the layer. AD-16's third category is the right shape and
  the "every write still records the triggering person" clause is a good instinct. Residuals: the
  call-stack boundary (H4-1) and the no-human-trigger case (M4-7).
- **H3-3.** AD-33's retention is now scoped to the takedown axis with an explicit "it never reaches a
  record under no retention duty". Correct, and the guest sentence was the right example to add. The
  residual is H4-14's same-record corner.
- **H3-7.** Closed and closed well. AD-30's identity-asserting tier — a mobile number, a one-time
  code, and only then any personal data, with "No account is created and nothing is stored" — is
  exactly right, and the sentence explaining why is the best paragraph added this round. The residual
  is M4-12 (it depends on a deferred rate limit).
- **AD-27's `allow_on_submit` startup check** and **AD-12's head digest plus record count** are the
  two best mechanisms in the document: both close a hole that ordinary controller guards cannot reach,
  both name the Frappe behaviour that makes them necessary, and both fail closed.

Worth saying again, since three rounds of findings can obscure it: **the mechanisms this round
attacks are the right mechanisms.** `held_by`, the set difference, the third AD-16 category, the
savepoint observation, `is_discoverable`, Place-as-NestedSet and typed Rules are each the correct
choice at the correct altitude. Every critical above is a composition defect between two good rules,
not a bad rule.

---

## 7. Round-1 and round-3 items still open, in one place

| Finding | Status | Where it bites now |
|---|---|---|
| H-2 five availability states frozen into `api/family/v1` | **open** | AD-10 forbids a boolean and still enumerates no alternative |
| H-3 AD-12's verbatim snapshot copies identity AD-14 forbids | **open** | plus C4-5: the snapshot is what a hold protects and erasure walks past |
| H-4 Rules have no structured shape | **partially closed** | AD-36 types them; H4-7 (attachment level) and H4-8 (live resolution) are new |
| H-5 Selection/Function mapping | **open, three ADs deep** | H4-17 |
| H-6 Enquiry parentage | **open** | H4-18 |
| H-7 running budget owner | **open, five cascades mutate it** | H4-19 |
| M-1 one discoverability predicate | **closed for Listings (AD-35), open for images** | H4-4 |
| M-2 active→Grace transition | **open** | no job creates the Grace state |
| M-3 `TypedDict` returns for AD-4 | **open** | — |
| M-4 k-anonymous aggregates (FR-57) | **open, now sharper** | H4-6: the floor's denominator is undefined |
| M-5 review window owner | **open** | FR-69 amendments move its inputs |
| M-6 Preferred Vendor entity | **open** | H4-8 |
| M-7 which day sets the seasonal price | **open** | — |
| M-8 AD-22 seed home; FR-20's fallback ladder | **open, aggravated** | H4-6 |
| M-9 occupancy origin and release | **half closed** | `held_by` exists; origin does not (H4-15) |
| M-10 AD-15 enumerates nothing | **open** | — |
| M-11 / H3-8 three-homes criterion | **open, aggravated** | H4-20 |
| M-12 / M3-9 cancellation reason | **open, aggravated** | M4-9 |
| H3-1 config change vs conditions of listing | **half closed** | AD-35 is the lever; AD-27's wording is not (M4-10) |
| H3-2 image predicate | **open** | H4-4 |
| H3-4 Vendor block | **open, aggravated** | H4-15 |
| H3-5 closed enumeration of six | **open** | M4-8 |
| H3-6 "free" undefined | **open** | H4-16 |
| H3-9 one seat, one transaction | **open — and now load-bearing** | C4-4 |
| H3-10 `capacity` naming and AD-6's core | **half closed** | M4-6 |
| M3-1 rental-period aggregation and the inventory item | **open** | still unmodelled in AD-6 and the ERD |
| M3-2 three transitions with no cascade and no job | **open** | M4-8 |
| M3-5 "currently accepting Enquiries" has no home | **open** | still in no field list |
| M3-7 Site Visit | **open** | M4-14 |
| M3-8 the AD-14 token's derivation | **open** | AD-14 still does not name it |
| M3-11 FR-64's published ranking disclosure | **open** | FR-64 still cited nowhere; AD-22 now also omits FR-20's ladder |
| M3-12 twenty-one uncited FRs | **open** | FR-68 and FR-8 are the two that bite (H4-17, H4-19) |

---

## 8. Shortest path

1. **C4-1 + C4-2** — one pass over AD-26. Re-entrancy keyed on `(cascade, doctype, docname)` and
   cleared in a `finally`; the composition graph authorised explicitly; and a **named transition row**
   for every trigger that is not a change to the cascading document. Nothing else in AD-26 is safe
   until this is answered, and it also deletes AD-12's stale `on_cancel` prohibition.
2. **C4-3** — split `is_discoverable` (pure) from `recompute_discoverable` (writes, via `doc.save()`,
   never `db_set`), and enumerate the four input bindings. Two sentences, and FR-53 stops depending on
   an unstated choice of write call.
3. **C4-4** — write H3-9 at last: one seat for the whole closure, every row in one transaction,
   nothing written on decline. The `held_by` no-op is only sound once this exists.
4. **C4-6** — no irreversible work inside a cascade's transaction; effects dispatched after commit.
   Cite `frappe/database/database.py:1219` so nobody re-discovers it.
5. **C4-5 + H4-11 + H4-12 + H4-13 + H4-14** — one pass over the privacy trio. A hold names a record
   **or a person**; hold status is evaluated at execution and a refused erasure stands; a Guest is a
   person record with a purpose-limited outcome; the access log's own retention is decided.
6. **H4-4** — `is_publicly_visible(image)` with one owner and three terms, and the allowance defined
   as the first N of a Vendor-ordered list. This is the third round it has been asked for.
7. **H4-5 … H4-8** — one pass over AD-36: the direction of "covers"; what Place a travelling Listing
   sits at for FR-57 and AD-22 (with FR-20's fallback ladder); where a Rule attaches; and whether the
   permitted set is snapshotted at engagement.
8. **H4-9** — replace AD-27's noun with a decision procedure, and apply it in the AD to the
   verification state, the person record and the lead outcome.
9. **H-5 / H-6 / H-7** — the three shape decisions from round 1, now depended on by AD-10, AD-11,
   AD-36 and five cascades. H-5 first: three ADs read a mapping the spine does not model.
