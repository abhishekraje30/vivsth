---
review: adversarial
round: 3
target: ARCHITECTURE-SPINE.md (architecture-vivahspot-2026-09-06)
driving_spec: prds/prd-vivahspot-2026-09-03/prd.md
reviewed_against:
  - reviews/review-adversarial.md (round 1, 27 findings)
  - reviews/review-closure.md (round 2 verification, 18 new defects)
reviewer_lens: 'adversarial — two units one level down that each obey every AD to the letter and still build incompatibly'
date: 2026-09-06
verdict: 'CHANGES REQUIRED — 4 critical, 10 high, 12 medium, 4 low. The new material (AD-26 through AD-34, and the AD-8/AD-10/AD-11/AD-12 rewrites) closed round 2 and opened a new class of hole: the ADs now compose, and nothing governs composition.'
---

# Adversarial Review, Round 3 — Architecture Spine, Vivah Spot

## Method

Unchanged from round 1: for each area, construct two units one level down — two epics, two dev agents weeks apart — that **each obey every AD to the letter** and still produce something that cannot be assembled. Every such pair is a hole in the spine, not a defect in the units.

Every finding is marked **[NEW in round 3]** or **[STILL OPEN from round 1]**. Findings closed by the round-2 revision are not re-reported; they are listed in §6 so the reader can see they were checked.

**What is different about this round.** Rounds 1 and 2 attacked a spine of isolated rules. The revision turned it into a spine of *interacting* rules: `domain/` cascades that fire from four layers (AD-26), an occupancy row with a seat dimension (AD-11), idempotency as a global obligation (AD-31), a three-term media predicate (AD-29), a three-basis privacy ladder (AD-32), and a takedown axis that outranks erasure (AD-33). Each is individually well-reasoned. **Almost every finding below is a collision between two of them.** The spine has no composition rules: nothing says whether a cascade may call a cascade, whether a `domain/` handler may re-enter itself, whether a retry inside AD-11 is the same operation as a retry under AD-31, or which of AD-20 / AD-29 / AD-33 owns the one predicate all three state.

---

## 1. Critical

### C3-1 — AD-26's `doc_events` binding makes every cascade with an `api/` route fire twice **[NEW in round 3]**

**ADs in play:** AD-26, AD-1, AD-31, FR-53, FR-42, FR-60.

**Scenario.** AD-26's Rule authorises two call paths, and requires both:

> "`api/` and the scheduler call them directly. **A controller never imports `domain/`** — where a cascade must originate at the DocType layer (an Admin acting in Desk, a condition of listing ceasing to hold), the controller emits its ordinary lifecycle event and `hooks.py` binds that event to the `domain/` handler through `doc_events`."

Unit A builds the Admin epic. FR-60 removal and FR-53 route 4 (a condition of listing ceasing to hold) can only originate at the DocType layer, so per AD-26 it binds `Listing.on_update → domain.listing_leaves_discovery` in `hooks.py`. This is not optional — AD-26 says route 4 "raises an event like the other three; it is never a passive read-time check", and `on_update` is the only ordinary lifecycle event a Listing field change emits.

Unit B builds the Vendor Listings epic six weeks later. FR-70's Vendor withdrawal is a client action, so per AD-26 `api/vendor/listings.withdraw()` calls `domain.listing_leaves_discovery` **directly**, then saves the Listing to record the withdrawal.

Both obey AD-26 exactly. Neither can see the other's wiring.

**Resulting incompatibility.** A `doc_events` binding in Frappe is global per `(doctype, event)`. It fires on *every* occurrence of that event regardless of origin. So unit B's save re-enters unit A's binding, and the cascade runs **twice**: every Family holding the Listing is notified twice, the Selection is cleared twice, and the running budget is adjusted twice — the second adjustment against a Selection that is already gone, so the total is wrong by one Selection's price and stays wrong.

The same double-fire hits four of the six cascades, because four have both a client route and a Desk route:

| Cascade | `api/` route | DocType-layer route AD-26 requires be bound |
|---|---|---|
| Listing leaves discovery (FR-53) | `api/vendor` withdrawal | `Listing.on_update` — Admin removal, condition ceasing |
| Cancelling an Agreement (FR-42) | `api/family`, `api/vendor` cancel | `Agreement.on_cancel` — Admin acting in Desk (FR-61) |
| Removing a Vendor (FR-60) | — | `Vendor.on_update` |
| Concluding/abandoning a Wedding (FR-72) | `api/family` abandon | `Wedding.on_update` — Admin acting in Desk |

**And it is worse than double-firing, because two of these loop.** `domain.listing_leaves_discovery` must write `Listing.discoverable = 0` — which fires `Listing.on_update` — which is bound to `domain.listing_leaves_discovery`. `domain.cancel_agreement` sets `docstatus = 2` — which fires `Agreement.on_cancel` — which is bound to the same handler. `domain.conclude_wedding` and the budget adjustment in cascades 2, 3 and 4 all write the `Wedding` document, which fires `Wedding.on_update`, which AD-26 requires be bound to the conclude/abandon cascade. So **a cancellation inside a Rule-conflict cascade can re-enter the Wedding-conclusion cascade**, which erases the guest list and kills every public link (FR-72) on a Wedding that is mid-planning.

The spine contains no re-entrancy rule at all: `doc.flags` appears zero times, "re-entrant" zero times, and AD-31's idempotency is defined for *retries carrying a key*, not for in-transaction re-entry — and a `doc_events` handler has no request and therefore no natural key source. AD-31's "safe to apply twice" is also the wrong guarantee here: sending a Family two notifications *is* applying twice, and it is not safe.

AD-26's own Prevents names this failure — "the same cascade written two or three times because it is reachable from `api/`, the scheduler and Desk with no shared layer authorised to hold it". The revision gave the cascade one *implementation* and two *invocations*, which is a different bug with the same symptom.

**Tightening.** AD-26 needs a composition rule, and it has to pick one direction:

> **One trigger, one invocation.** For every cascade, exactly one of the two paths is wired. Where a cascade has any DocType-layer trigger, **`doc_events` is the only entry point** — `api/` performs its gate and its own write and does **not** call `domain/`; the write raises the event and the event runs the cascade. Where a cascade has no DocType-layer trigger (only the scheduler, only a client), `domain/` is called directly and no `doc_events` binding exists for it. A cascade wired both ways is the defect.
>
> **Every `domain/` handler is re-entrancy-guarded.** A handler sets `doc.flags.in_cascade` before any write and returns immediately if it is already set, and every cascade is keyed on `(entity, transition, transition_id)` so a second invocation within the same transaction is a no-op rather than a second effect. Extend AD-31 to say that in-transaction re-entry is covered by the same key, and name the key's source for an event-triggered operation (the document's `modified` version, or the transition row).

Also state the cascade graph, because it is not derivable from the six names: **cascade 1 (Chosen Block change) and cascade 6 (conclude/abandon) both invoke cascade 3 (cancel Agreement); cascade 2 (Rule conflict) invokes cascade 3; cascade 5 (remove Vendor) invokes cascade 4.** AD-26 authorises `api/` and the scheduler as callers and says nothing about `domain/ → domain/`, so a literal reader concludes cascade 1 must *inline* the cancellation — producing the second implementation AD-26's "each has exactly one implementation" forbids. Say explicitly that a cascade may call another cascade, and that the inner cascade's parameters carry the outer cascade's reason (see M3-9 on the cancellation count).

---

### C3-2 — A retried confirmation takes a second seat: AD-31's idempotency and AD-11's seat retry cancel each other out **[NEW in round 3]**

**ADs in play:** AD-11, AD-31, FR-39, NFR 5.3.

**Scenario.** AD-11: "confirmation takes the lowest free seat and **retries the next free seat on a unique violation**, declining only when every seat is taken — so two workers racing for seat 1 with seat 2 free do not both fail." Enforced by "the database (tier 1 by construction)".

AD-31: "Every operation that changes state carries an idempotency key and is safe to apply twice." Enforced by "review (tier 3)".

NFR 5.3 guarantees work survives a lost connection, which — as AD-31 itself says — guarantees retries.

Unit A builds Agreements. It implements AD-11's seat loop exactly, and relies on the mechanism AD-11 declares to be tier-1: the `UNIQUE` index. AD-11's own words are that the constraint is what makes confirmation "first-writer-wins" *by construction*, so A does not build a second dedupe layer above a tier-1 guarantee — that would be belt-and-braces over a database invariant, and CL-9/UH-9 discourage machinery nobody has demonstrated a need for. Unit B builds the client retry per NFR 5.3: the confirmation POST is retried on a dropped connection with the same idempotency key, as AD-31 requires.

Both obey every AD.

**Resulting incompatibility.** Dattatray's photographer Listing declares `concurrent_capacity = 2`. The Vendor confirms; the transaction commits and inserts seat 0; the response is lost on patchy mobile data (NFR 5.3's exact scenario). The client retries. The retry recomputes the lowest free seat, finds seat 0 taken, hits the unique violation, and **AD-11 instructs it to retry the next free seat** — so it inserts seat 1. One Agreement now holds both crews. The photographer's second crew is consumed by a network hiccup, silently, with a successful response.

At `concurrent_capacity = 1` the same retry produces the opposite failure and a worse message: the retry exhausts the seats, and AD-11 fires "when every seat is taken the Vendor is told which engagement conflicts (FR-39), and the Family's proposed terms return to the thread as declined-by-conflict". The conflicting engagement the Vendor is shown **is his own confirmation from four seconds ago**, and the Family whose Agreement was in fact successfully confirmed is told it was declined.

The root cause is that **an occupancy row carries no owner.** AD-11's row is `(resource, day, slot, seat)`; nothing on it says which Agreement holds it. So the retry cannot distinguish a violation caused by a rival from one caused by itself, which is precisely the distinction the retry rule needs to be correct. The ERD's `AGREEMENT ||--o{ OCCUPANCY : auto-blocks` implies the link but AD-11's Rule — which is the thing an implementer reads — does not state it, does not put it in the key, and does not use it in the retry predicate.

**Tightening.** In AD-11:

> An occupancy row carries its **holder**: the Agreement chain that took it, or the Vendor declaration that took it (see H3-4). The retry predicate is **"the conflicting row is held by a different holder"** — a violation against a row this same holder already owns is proof the operation already succeeded, and the operation returns that success rather than advancing a seat. `seat` is allocated once per holder per resource and is constant across every row that holder writes (see H3-3).

And in AD-31, close the loop the other way:

> The idempotency key is checked, and the operation's outcome recorded, **inside the same transaction as the state change** — a key checked before an uncommitted write is not idempotent. For an operation whose only dedupe is a database constraint (AD-11's confirmation), the constraint is the key only if the row identifies its holder.

---

### C3-3 — An Amendment that moves days collides with its own occupancy rows, and at capacity 1 it cannot be confirmed **[NEW in round 3]** *(round-1 C-1 resurfacing through the seat model)*

**ADs in play:** AD-12, AD-11, FR-69, FR-28.

**Scenario.** Round 2 killed round-1 C-1 outright and correctly: AD-12 now says "An Amendment appends `seq+1` and never touches `docstatus`. Frappe's built-in cancel-and-amend flow is not used for Agreements at all." The slot-release race is structurally gone.

FR-69 still permits an Amendment to move the wedding: "Where an amendment changes the days, Slots or Span, the calendar is adjusted on confirmation and the released time becomes available to others." AD-12 says nothing about how the row set is transformed. AD-11 says how rows are inserted (lowest free seat, retry on violation) and nothing about how they are replaced.

Unit A builds Amendments. Rutuja's Haldi moves from the 26th to the 25th; the Wedding stays on the 27th. The old Span closure was 26-morning … 27-evening (7 rows). The new closure is 25-morning … 27-evening (11 rows), of which 7 are the old rows unchanged. A implements the safe ordering round 1 asked for — **insert new before releasing old**, so no third party can slip into the gap.

Unit B, building the same thing from the same ADs, releases old rows first and then inserts, because that is the reading of "the released time becomes available to others" that does not require holding two row sets at once.

**Resulting incompatibility.**

Under **A**, the amendment's insert of the 7 unchanged rows collides with **its own existing rows**. AD-11's retry rule then does exactly what it says: retry the next free seat. At `concurrent_capacity = 1` there is no next seat, and the amendment is declined-by-conflict against itself — a guest-count-adjacent change that FR-69 promises records no cancellation now cannot be confirmed at all, and the Vendor is shown "which engagement conflicts": his own Agreement. At capacity 2 it silently consumes the second seat, and the venue that could host two events now hosts one.

Under **B**, the exact failure round-1 C-1 identified is back, through a different door: between the release and the insert, all 7 rows are free, AD-11 makes confirmation first-writer-wins by database constraint, and a third party's confirmation in flight legitimately takes 26-evening. The amendment then cannot be confirmed and the couple has lost the venue — on a cooperative change, which FR-69 exists to make safe.

Both units are compliant. There is no third reading of AD-12 that avoids both.

**Tightening.** In AD-12, alongside the amendment sentence:

> **An Amendment that changes days, Slots or Span transforms the occupancy row set in one transaction, holding the Agreement chain's seat throughout.** The transform is computed as a difference against the chain's existing rows: rows in both the old and the new closure are **left untouched** (never released and re-taken), rows only in the old closure are released, rows only in the new closure are inserted at the chain's existing seat. The chain's seat number does not change across an Amendment. A transform that releases before inserting, or that re-inserts a row the chain already holds, is the defect.

---

### C3-4 — AD-16 has no category for a cascade, and the compliant reading makes all six notify nobody **[NEW in round 3]**

**ADs in play:** AD-16, AD-26, AD-31, FR-53, FR-60, FR-32, FR-72.

**Scenario.** AD-16's dichotomy is binary: "**Anything derived from a request uses `frappe.get_list`.** `get_all` is for genuine system work — a scheduled job, a migration, an aggregate no user reads — and carries a comment saying which."

AD-31 adds: "`frappe.enqueue` jobs are gated **before** enqueueing, not inside the worker; **the worker inherits the session user** but not the request."

Now take AD-26's cascade 4. Dattatray withdraws his lawn. `api/vendor/listings.withdraw()` runs as Dattatray, gates per AD-18, and invokes `domain.listing_leaves_discovery`. The cascade must now find **every Family holding that Listing on a Shortlist or as a Selection** — rows belonging to other people entirely, on Weddings Dattatray has no permission to see, protected by AD-17's membership table and AD-15's hook pair.

Unit A obeys AD-16 literally. The read is derived from a request, so it uses `frappe.get_list`. Unit B reasons that a cascade is system work and uses `frappe.get_all` with the required comment.

Both readings are defensible and both are literal.

**Resulting incompatibility.** Under A the cascade notifies **nobody**. `get_list` applied as Dattatray returns zero Shortlist rows and zero Selection rows, because AD-15's `permission_query_conditions` on `Wedding`-derived DocTypes correctly excludes him. No error is raised. No empty result is noticed, because an empty result is a perfectly normal outcome for a Listing nobody shortlisted. FR-53's load-bearing sentence — "**No route removes a Listing from a Family's view without telling them**" — is silently false on the route that will be exercised most often, and the Selection is never cleared, so the Family's running budget keeps counting a Listing that no longer exists.

AD-16's Prevents names this failure verbatim: "silently returning records the caller may never see, with no error and no empty result to notice." The AD produces its own named failure mode, in the opposite direction, because it has no category for an operation that is **request-triggered and system-scoped**. All six cascades are in that category by construction — every one of them reads or writes rows belonging to a principal other than the actor:

| Cascade | Rows it must reach that the actor cannot see |
|---|---|
| Chosen Block change (FR-17) | every counterparty Vendor's Agreements and occupancy |
| Rule conflict (FR-32) | the Family's Shortlist entries across other Vendors |
| Cancel Agreement (FR-42) | the counterparty's profile count and calendar |
| Listing leaves discovery (FR-53) | every Family's Shortlist and Selection |
| Remove Vendor (FR-60) | every Family holding an Agreement |
| Conclude/abandon (FR-72) | every counterparty Vendor's Agreements |

AD-31 aggravates it: if the cascade is enqueued (and cascade 4 must be — notifying every Family holding a popular Listing is not request-latency work), "the worker inherits the session user", so the under-scoped read happens in the worker too, further from anyone's attention.

**Tightening.** Extend AD-16 with a third category, and bind it to AD-26:

> A **cascade** (AD-26) is request-triggered and system-scoped: the actor's permission governs *whether the operation may run*, and never *which rows it reaches*. A `domain/` handler therefore reads with `frappe.get_all`, carries the comment AD-16 requires, and **is gated once, at its entry point, before any read** — by `api/`'s guard (AD-18), by the controller (AD-27), or by the scheduler's own authority. Applying `get_list` inside a cascade is the defect, because it silently scopes a platform obligation to one party's visibility.

Add the corresponding sentence to AD-26 ("a `domain/` handler runs with system scope and is gated by its caller, once") and to AD-31 ("an enqueued cascade runs as the system, not as the enqueuing user").

---

## 2. High

### H3-1 — AD-8's carry-forward and AD-27's controller guard resolve a config change in opposite directions, and one of them makes FR-53 route 4 unfireable forever **[NEW in round 3]**

**ADs in play:** AD-8, AD-27, AD-20, FR-59, FR-62, FR-71, FR-53.

**Scenario.** AD-8's new closing paragraph: "**A configuration change never rewrites what already happened** (FR-62). Existing Listings … keep the shape they were created under; a changed Service applies only to what follows it. Where a change would make a published Listing incomplete, that Listing **keeps its published state** and its Vendor is asked to supply what is now needed."

AD-27's Named list: "a Listing cannot be published without Verification, an all-in price, Rules and a Commitment (FR-59, FR-71)" — implemented in the DocType controller, `validate` / `before_save`, so it binds Admin and every actor.

Kiran adds a required capability to Photography under FR-71 (a named-person field). Two hundred published Photography Listings now lack it.

Unit A builds Vendor Listings and implements AD-27 literally: `Listing.validate` refuses to save a Listing whose `published` flag is set and whose conditions of listing are unsatisfied. Unit B builds Admin/config and implements AD-8's carry-forward by freezing the condition set into the Listing at creation, so what a Listing must satisfy is what its Service required when it was published.

**Resulting incompatibility.**

Under **A**, all two hundred Listings become **unsaveable**. The Vendor cannot edit the price, cannot answer a nudge, cannot add the very field he is being asked for if the form saves atomically — every write path through `validate` fails. And AD-8 explicitly promised the opposite: the Listing "keeps its published state". A controller guard cannot both refuse the state and preserve it.

Under **B**, the condition set is frozen per Listing, so **FR-53 route 4 can never fire for any existing Listing** — "a condition of listing ceasing to be satisfied" is unreachable when each Listing carries its own conditions, which it satisfies by construction. AD-26 insists route 4 "raises an event like the other three; it is never a passive read-time check", and there is now no transition to raise. FR-59's "A Listing that stops satisfying them stops being discoverable until it does again" is dead code, permanently and invisibly, on the trust spine.

Note this is inherited from an unresolved contradiction **inside the PRD** — FR-62's "keeps its published state" against FR-59 + FR-53 route 4's "stops being discoverable" — which the spine now restates on both sides, in two different ADs, for two different epics to read. The Conflicts table does not carry it.

**Tightening.** Decide it, in AD-8, and record the PRD conflict:

> A configuration change applies **prospectively to shape** and **immediately to conditions of listing**. A Listing's *field set* and *stored values* are what its Service declared when they were written (FR-62). A Listing's *discoverability* is evaluated against the Service's **current** conditions of listing (FR-59, FR-71), continuously: a Listing that stops satisfying them leaves discovery through AD-26's cascade 4 and returns when it satisfies them again. **A published Listing is never made unsaveable by a configuration change** — AD-27's controller guard blocks the *publish transition* and blocks *becoming discoverable*, and never blocks a save. The Vendor keeps the Listing, keeps every field, is told what is now needed, and is out of discovery until he supplies it.

Add the FR-62-versus-FR-59 conflict to the Conflicts table, marked **PRD needs amending**. Also add the *return* to discovery to AD-26's cascade list — it is a transition with the same four routes reversed (renewal, re-publication, un-removal, condition satisfied again) and it currently has no owner anywhere; three units will build three restores (see M3-2).

### H3-2 — AD-20 and AD-29 state one predicate with two different definitions, and AD-33 supplies the term only one of them carries **[NEW in round 3]**

**ADs in play:** AD-20, AD-29, AD-33, FR-27, FR-49, FR-58, FR-63.

**Scenario.** Three ADs govern whether an image is visible, and they do not agree on how many terms the predicate has.

- **AD-20:** "An image is publicly visible only if **verified** *and* **within the Tier's allowance** — two independent gates, neither implying the other." Enforced by "one public read path".
- **AD-29:** "An object is served from the public path only while it is **verified** (AD-20), **within the Tier's allowance** (FR-27) and **not taken down** (AD-33) — all three."
- **AD-33:** takedown is "a separate state … never cleared by re-verification", with a three-hour clock for a court order.

Unit A builds the Listings read path and implements AD-20's predicate verbatim — two terms, because AD-20 says "two independent gates" and is the AD whose title is *Verification gates each item*. Unit B builds media storage and implements AD-29's three-term movement.

**Resulting incompatibility.** A court-ordered image that is verified and within allowance passes A's two-term filter and is **still returned in the API response**, with its URL, its caption and its position in the portfolio. B has moved the object, so the client renders a broken tile — and the *fact* of the image, its alt text and the portfolio count still leak, on the one case with a three-hour statutory clock. Round-2 ND-4 flagged AD-29 as not knowing about AD-33; the revision fixed AD-29 and left AD-20 at two terms, so the drift moved rather than closed. One predicate with two owners is now one predicate with two **definitions**, which is strictly worse.

A second divergence sits inside the same predicate. **"Within the Tier's allowance" is not a property of an image.** It is a property of an image relative to an ordering: the first N of M. Neither AD says which N. FR-27 says only "publishes up to the allowance" and "a Listing over its allowance keeps every image". Unit A publishes the N oldest; unit B lets the Vendor mark which N; unit C publishes the N most recently verified. On a Tier downgrade from 20 to 5, AD-29 requires 15 objects to be physically moved out of the public path with CDN invalidation — and each unit moves a different 15.

**Tightening.** Give the predicate one owner and one definition:

> **One function answers `is_publicly_visible(image)`** — verified (AD-20) **and** within the Tier's allowance **and** not taken down (AD-33) — and both the read path and the storage layer call it; neither restates its terms. AD-20 states the verification term and defers; AD-29 states the storage consequence and defers; AD-33 states the takedown term and defers.
>
> **The allowance is a Vendor-ordered list.** The Vendor sets the publication order of their portfolio; the allowance takes the first N of it. Where no order has been set it is upload order. A Tier change re-evaluates the predicate for every image on the Listing and moves objects accordingly.

And give that re-evaluation a home: it is a cross-entity operation (Subscription → Listing → images → object storage) and it appears in neither AD-26's six cascades nor AD-23's sixteen jobs. See M3-2.

### H3-3 — AD-33's "retention wins" is unscoped, so it swallows the consent erasure AD-32 and NFR 5.5 guarantee **[NEW in round 3]**

**ADs in play:** AD-33, AD-32, AD-14, NFR 5.5, FR-63, FR-66.

**Scenario.** AD-33: "Removed content and its records are retained **180 days** after removal, and **where that collides with an erasure request, retention wins and the person is told which basis applies** (NFR 5.5)."

AD-32: personal data sits on one of three recorded bases — consent (erasable), an engagement between two parties (pseudonymised and retained), a legal obligation (retained for its stated period) — and "withdrawal removes what was derived from it — a published Real Wedding included (FR-66)".

NFR 5.5 is unambiguous about precedence: "**consent-based data is erased**; records of an engagement between two parties, and records held under a legal obligation, are pseudonymised and retained."

Unit A builds moderation and implements AD-33's rule as written: any removed content, any erasure request, retention wins for 180 days. Unit B builds privacy and implements AD-32: a consent withdrawal erases what was derived from it, now.

**Resulting incompatibility.** Rutuja withdraws consent for her published Real Wedding (FR-66). Under A, the Real Wedding is "removed content", AD-33's blanket retention applies, and she is told a retention basis outranks her withdrawal — for 180 days, on data held **only** on her consent. That is a direct breach of NFR 5.5's stated precedence and of FR-66, and NFR 5.5 says explicitly that this precedence "must not be re-derived downstream". Under B the moderation record of a court-ordered removal is destroyed on an unrelated erasure request, and FR-63's 180-day obligation is breached in the other direction.

The defect is that AD-33's sentence is **unscoped**. FR-63's 180 days attaches to content removed under the *intermediary obligations* — unlawful content, a court order, a government direction — not to everything that ever leaves a public surface. AD-33 states it as a universal rule about "removed content" while AD-32 has just established that the basis is what decides, and the two ADs were written in the same pass.

**Tightening.** In AD-33:

> The 180-day retention attaches to content removed under a **takedown** — the intermediary axis — and to that content's moderation records, which are held on the **legal obligation** basis (AD-32). It does not attach to content withdrawn on any other ground. A consent withdrawal (AD-32, FR-66) erases what was derived from that consent, and takedown records covering the same content are retained and pseudonymised, not the content itself. Where the two do collide — a taken-down item whose subject also withdraws consent — retention of the *takedown record* wins, the *content* is erased, and the person is told which basis applies to which.

### H3-4 — FR-28's vendor-declared Slot block has vanished from the spine, and under the seat model it no longer means what the Vendor thinks **[NEW in round 3]**

**ADs in play:** AD-10, AD-11, FR-28, FR-31.

**Scenario.** The pre-revision AD-10 read "Only blocking facts are stored — **vendor-declared Slot blocks and Agreement-derived blocks**." The rewritten AD-10 reads "Only blocking facts are stored." The enumeration is gone. Verified: the strings *vendor-declared*, *Slot block* and *block Slots* now occur **zero times** in the spine, and AD-11's Rule describes only Agreement-derived expansion. FR-28's "A Vendor can block Slots for maintenance, family use or any reason, without stating one" is constrained by no AD.

Unit A builds the Vendor Calendar epic and implements a manual block as a single occupancy row on the resource — which is what AD-11's row shape offers. Unit B implements it as a distinct `Vendor Block` DocType outside the occupancy table, because AD-11's Rule is written entirely about Agreements and its `Enforced by` is "the database", and B does not want a Vendor's family-function note participating in a UNIQUE index it does not understand.

**Resulting incompatibility.** Under **B**, AD-10's availability function reads occupancy and never sees the block: Dattatray marks 27-evening blocked for his nephew's engagement, the platform keeps showing him available, and a Family confirms an Agreement into it — which is exactly the class of failure the spine's occupancy design exists to prevent.

Under **A**, a manual block consumes **one seat**, not the Slot. A photographer with `concurrent_capacity = 3` who blocks a Friday evening because he is at a family wedding still shows two free crews and receives two Agreements he cannot serve. Under the pre-seat model a block was a block; the seat dimension silently converted "I am not available" into "one of my crews is unavailable", and no AD says which the Vendor is declaring.

Compounding: with no owner column (C3-2), AD-11 cannot state release semantics — round-1 **M-9** asked for an origin, and the revision added `AGREEMENT ||--o{ OCCUPANCY` to the ERD without adding it to AD-11's Rule. So a cancellation that releases "those Slots" (FR-42) deletes rows by `(resource, day, slot)` and un-blocks the Vendor's own manual block along with the Agreement's.

**Tightening.** In AD-11:

> Occupancy has exactly **two origins**: an Agreement chain, and a Vendor declaration (FR-28). Both write rows into the same table and the same UNIQUE index, so one Slot is blocked once and by one fact; each row carries its **holder** and its **origin**. A Vendor declaration **takes every seat on the resource for that `(day, slot)`** — a Vendor declaring themselves unavailable is unavailable, not partially available — unless the Vendor explicitly declares a reduced capacity for that Slot, which is a separate act. **Release deletes only rows of the releasing holder.** Where a Vendor's declaration is refused because an Agreement holds a seat, he is told which engagement holds it (the same message FR-39 already requires).

### H3-5 — AD-26's "there are six of them" is a closed enumeration, and at least five real cross-entity operations sit outside it **[NEW in round 3]**

**ADs in play:** AD-26, AD-8, AD-12, AD-29, AD-69/FR-69, FR-11, FR-53.

**Scenario.** AD-26's title, Rule and Prevents all present six as the complete set: "Operations spanning more than one entity live in `domain/`, and each has exactly one implementation. … **Six operations:** …". A closed enumeration is the right instinct — it is what makes AD-23 valuable — but it must actually be closed.

Unit A builds Amendments (FR-69). An Amendment that moves days transforms occupancy (AD-11), moves the agreed figure in the running budget (FR-40), and changes the inputs to the review window (FR-45, FR-48). That is three entities. AD-26 does not name it, so A puts it in `api/family/v1/agreements.py`. Unit B builds the Wedding Workspace and implements FR-69's guest-count divergence prompt ("Where the Family revises a Function's stated guest count away from the figure in a confirmed Agreement, they are prompted to amend") — Wedding Function ↔ Agreement, two entities, unnamed by AD-26 — and puts it in `Wedding Function.validate`. Unit C builds Billing and implements the Tier-change allowance re-evaluation from H3-2 — Subscription ↔ Listing ↔ images ↔ object storage — and puts it in `api/vendor/subscriptions.py`.

All three obey AD-26, because AD-26 does not name their operations and therefore does not claim them.

**Resulting incompatibility.** The layer AD-26 created to stop cascades scattering now applies to six operations while at least five more scatter exactly as before:

| Unnamed cross-entity operation | Entities | Where a compliant unit will put it |
|---|---|---|
| Amendment confirmation (FR-69) | Agreement, Occupancy, Wedding budget, review window | `api/` |
| **Return** to discovery (FR-53 renewal, FR-59 condition satisfied, un-removal) | Subscription/Listing, Shortlist, Selection, budget | wherever the triggering epic sits |
| Tier-change allowance re-evaluation (FR-27, FR-50) | Subscription, Listing, portfolio images, object storage | `api/vendor` or a controller |
| Guest-count divergence prompt (FR-69, FR-11) | Wedding Function, Agreement | a controller |
| Preferred-Vendor acceptance/withdrawal (FR-25) changing a permitted set | two Listings, Shortlist, Agreement | `api/vendor` |

And because AD-26 is closed, a careful unit reading it concludes its operation is *not* a cascade and must live elsewhere — which is the opposite of what the AD wants.

**Tightening.** Make the enumeration honestly open-ended with a test, the way AD-23 does:

> An operation that changes state in **more than one entity**, or that has **more than one entry point**, is a `domain/` cascade. The six below exist on day one; **an operation meeting that test and absent from this list is a defect in this AD, not a licence to place it elsewhere.** Adding one is a structural commit of its own (UH-1).

Then add at least the five above, or state why each is not a cascade.

### H3-6 — AD-10 asks whether a `(day, slot)` is "free" and AD-11 writes rows with a seat dimension AD-10 never mentions **[NEW in round 3]**

**ADs in play:** AD-10, AD-11, FR-23, FR-28.

**Scenario.** AD-10's Engagement Model table asks, for Span, "Is every `(day, slot)` … **free**?" and for per Function, "Is each served Function's own `(day, slot)` **free**?" The word *free* is the entire semantic content of the availability function, and AD-10 defines it nowhere. AD-11 then makes occupancy a row per `(resource, day, slot, **seat**)` with a declared `concurrent_capacity`.

Unit A builds discovery and implements *free* as AD-10 literally reads: a `NOT EXISTS` over occupancy for that `(resource, day, slot)`. Unit B builds the vendor calendar and implements *free* as "fewer than `concurrent_capacity` rows exist" — which is the only reading consistent with AD-11's purpose, since AD-11 exists precisely so a photographer can shoot two weddings a day.

**Resulting incompatibility.** Under **A**, the entire seat model is invisible to the Family: the photographer with two crews and one engagement is shown unavailable, his second crew never sells, and AD-11's stated Prevents ("a crew-bandwidth Vendor being capped at one engagement per Slot") is defeated at the read side while being solved at the write side. Under **B** the numbers agree — until the Space case, where AD-10 adds "a Listing is available if **any** of its Spaces is": is a Listing available when every Space has one seat left of two? A and B answer differently again, and FR-20 makes availability the first ranking signal, so half the catalog's ordering depends on which unit shipped first.

This is the round-2 ND-9 defect (no Space dimension) fixed on the Space axis and left open on the seat axis, one revision later.

**Tightening.** One sentence in AD-10, and it must use AD-11's vocabulary:

> "Free" means **at least one seat is unallocated** on that resource for that `(day, slot)` — never "no row exists". Where a Service has Spaces, the question is asked per Space and the Listing is available if any Space has a free seat. The availability function and the occupancy writer read the same `concurrent_capacity` from the same field.

### H3-7 — AD-32's rights surface and AD-30's guest rules cannot both govern the same endpoint, and the compliant reading is a data-enumeration hole **[NEW in round 3]**

**ADs in play:** AD-30, AD-32, AD-28, NFR 5.5.

**Scenario.** AD-30 (rewritten in round 2 to close ND-12) now claims the whole unauthenticated surface: "**Every** `allow_guest=True` method … restricts `methods`, is rate-limited per IP, takes a **fixed DocType** never one from input, and returns only fields that are safe to show an unauthenticated caller. That covers … AD-32's see-and-correct surface for people who never held an account."

AD-32 requires that surface to do something AD-30's shape cannot: "Every person, **including one who never held an account**, can see and correct what is held about them." What is held about a Guest spans Guest, Wedding, the invitation, the RSVP answer and any guest-form submission — many DocTypes, not a fixed one — and "everything held about you" is by definition not "only fields that are safe to show an unauthenticated caller".

Unit A builds the privacy surface as an OTP-gated flow: the caller proves control of the number, and then sees the footprint. Unit B builds it as AD-30 describes — an `allow_guest` method, rate-limited per IP, fixed DocType — taking a mobile number and returning what is held against it.

**Resulting incompatibility.** Under **B** the endpoint is a mass-enumeration oracle over the platform's entire personal-data set, protected by an IP rate limit, on a product where **the mobile number is the identity** (AD-28). Iterating a number range returns who is a Vendor, who is planning a wedding, and who was invited to whose. Under **A** the surface is correct but is not an `allow_guest`-shaped method at all, and AD-30 — which claims to govern every one — offers it no rules, no rate-limit shape and no identity-proof rule. There is no identity-proof requirement anywhere in the spine for the rights surface: AD-28's OTP rules bind sign-in, and AD-32 says only that the right exists.

**Tightening.** Split AD-30's Rule explicitly into three tiers rather than one, and add the missing tier:

> `allow_guest` methods are of three kinds and the rules differ. **Unaddressed** (OTP issue/verify, grievance intake): fixed DocType, per-IP rate limit, no scope taken from input, explicit response shape. **Token-addressed** (invitation, RSVP, guest form): the above plus per-token rate limiting and single-Guest scope. **Identity-asserting** (AD-32's see-and-correct surface): reachable without an account but **never without proof of control of the identifier** — a one-time code to the number or address in question, under AD-28's issuance limits — and the footprint is returned only after that proof. An `allow_guest` method that returns personal data keyed on an identifier supplied in the request, without proof of control, is the defect.

### H3-8 — AD-18 and AD-27 both name confirmation, and no criterion tells a unit which to obey **[STILL OPEN from round 1 — M-11, aggravated]**

**ADs in play:** AD-18, AD-27, AD-15, FR-6, FR-39, FR-61.

**Status.** Round 1's M-11 asked for the three-way criterion — *who may act* (guard), *who may see* (hook pair), *what states may exist* (controller). The revision adopted the **conclusion** (AD-27 exists, and it is a good AD) and never wrote the **criterion**. AD-18 now says only "A gate that must also bind Admin belongs in the controller instead — see AD-27", and AD-27 says "any rule that must hold regardless of who is acting".

**Scenario.** Both ADs name **confirmation**:

- AD-18: "Action rules the framework has no home for — FR-6's Creator-only enquiry, contact reveal, **confirmation**, cancellation and review — live in one guard module called at the top of the method."
- AD-27: "the two confirming parties are different accounts and no account transacts with its own Listing (FR-39)" — in the controller.

Unit A builds Agreements from AD-18: confirmation is on the list, so the whole confirmation gate — Creator-only *and* different-accounts — goes in `guards.py`. Unit B builds from AD-27: the different-accounts bar is on *its* list, so it goes in `Agreement.validate`. Both citations are literal, and both units read the other AD and conclude it is talking about the other half.

**Resulting incompatibility.** Under **A**, FR-39's self-dealing bar is absent from the Desk path — which is round-1 C-3 verbatim, on the one rule FR-39 says the platform's whole consequence model rests on ("a Vendor could manufacture an engagement with himself, mark Delivery, and publish a verified Review of his own Listing"). Under **B**, the Creator-only rule migrates into `validate` too (it is the other half of the same gate), where it reads `frappe.session.user` — and then **every legitimate system write fails**: AD-26's cascade 2 clears a Selection while the session user is an Invited Member, and AD-23's scheduled jobs run as Administrator, which is neither party.

There is a further ambiguity in AD-18's own criterion. "A gate that must also **bind Admin**" is unusable as a test, because FR-61 says Admin has *every capability*: on that reading no actor rule binds Admin, and yet AD-27's list contains FR-39's different-accounts bar, which is an actor rule. The spine names one actor rule as a controller rule and one as a guard rule and never says what separates them.

**Tightening.** Write the criterion once, in AD-18, and have AD-27 and AD-15 point at it:

> Three homes, three questions, and every rule answers exactly one. **Who may act** — Creator-only, Vendor-owns-this-Listing, contact reveal — is a guard in `api/`, and does not bind Admin, because FR-61 grants Admin every capability. **Who may see** is the AD-15 hook pair, per `ptype`. **What states may exist** — a confirmed Agreement between one account and its own Listing, an unverified published Listing, an edited Review, an altered audit entry — is the controller (AD-27), binds every actor including Admin and including a cascade, and is expressed **over document state, never over `frappe.session.user`**. A controller rule that reads the session user is the defect, and a rule in two of the three homes is the defect.

Also stop presenting AD-27's list as closed (round-2 ND-16 is still open: AD-33 and AD-34 both cite AD-27 for rules it does not name).

### H3-9 — A Span allocates seats row by row, so it can half-succeed and leave orphan blocks **[NEW in round 3]**

**ADs in play:** AD-11, AD-31, FR-14, FR-39.

**Scenario.** A Span expands to one row per `(day, slot)` in the closure — seven rows for the Haldi-morning-to-Wedding-evening case AD-11 describes. AD-11 states seat allocation as a single-row rule: "confirmation takes the lowest free seat and retries the next free seat on a unique violation, declining only when every seat is taken." Nothing says whether the seven rows take **one** seat number or seven independently chosen ones, and nothing says the seven inserts are atomic.

Unit A allocates per row: each `(day, slot)` gets its own lowest free seat. Unit B allocates once per confirmation: the Span takes seat *k* on all seven rows, where *k* is the lowest seat free across the whole closure.

**Resulting incompatibility.** Under **A**, on a hall with `concurrent_capacity = 2`, two Spans can interleave — Span 1 on seat 0 for days 26–27 and seat 1 for day 28, Span 2 filling the gaps — which is correct capacity arithmetic for a photographer and nonsense for a hall, where "seat" means a simultaneous event. Under **B** the interleaving is impossible and some genuinely servable combinations are refused. More seriously, under **A** a partial failure is reachable: rows 1–5 insert, row 6 finds every seat taken, and AD-11's decline path fires — but AD-11 says nothing about rolling back rows 1–5. A compliant implementation leaves five orphan occupancy rows for an Agreement that was never confirmed. The Vendor is now silently unavailable on five Slots he never sold, with nothing in the model pointing at why, and FR-29's nudge asks him to confirm availability he cannot explain.

**Tightening.** In AD-11: "A confirmation allocates **one seat number for the whole engagement** and writes every row of its closure at that seat, **in one transaction**; a closure that cannot be satisfied at any single seat is declined and writes nothing. Partial row sets never exist."

### H3-10 — `capacity` now names two different things on the same document, and AD-24 makes the Glossary binding for both **[NEW in round 3]**

**ADs in play:** AD-11, AD-6, AD-24, AD-8, FR-23, FR-71.

**Scenario.** FR-23: "A Space holds its own **capacity**, its own Stated Size, its own all-in price and its own calendar" — how many guests fit. FR-71's frozen table gives Catering the Sizing Attribute "**capacity** — the most they can serve" and Venue "capacity". AD-11 introduces `concurrent_capacity` — how many simultaneous engagements — and puts it "on the **core** Listing or Space".

Unit A builds Spaces from FR-23 and names the field `capacity` (guests). Unit B builds occupancy from AD-11 and, reading "a lawn declares 1", names its field `capacity` too, because AD-11's prose alternates between "capacity" and "concurrent_capacity" and AD-24 binds the Glossary — which contains neither term.

**Resulting incompatibility.** One word, two quantities, on the same document, differing by three orders of magnitude. A caterer's Sizing Attribute is 600 heads; his `concurrent_capacity` is 2 Functions. A unit that conflates them gives him 600 seats and the UNIQUE index stops constraining anything. A unit that keeps them separate needs a second field — which **AD-6's core enumeration does not contain**: "a single `Listing` DocType holds what every Service has — Vendor, Service, all-in price, Rules, Commitment, verification state, portfolio, Place coverage." AD-11 requires the field on the core and AD-6's enumeration of the core omits it, one revision after round-2 ND-5 moved it there.

**Tightening.** Add `concurrent_capacity` to AD-6's core enumeration explicitly; add both terms to the PRD Glossary through AD-24 (`concurrent capacity` vs `capacity`/Sizing Attribute); and state in AD-11 that `concurrent_capacity` is **never** the Sizing Attribute, whatever the Sizing Attribute happens to be called for that Service.

---

## 3. Medium

### M3-1 — Rental-period occupancy has three unowned decisions **[NEW in round 3]**
AD-10 asks "Is the required date range free, **per inventory item**?"; AD-11 makes the inventory item the resource, one row per day at the sentinel Slot `all-day`.
(a) **The aggregation rule is unstated.** "Any item free on each day" and "any single item free across the whole range" are different predicates, and a Family renting a car for four days needs the second. Unit A writes the per-day `NOT EXISTS` and over-reports availability; unit B walks items.
(b) **An inventory item has no capacity.** AD-11 requires `concurrent_capacity` "on the **core** Listing or Space — never on a per-Service detail DocType", and an inventory item is neither, so the field it says is "never implicitly defaulted" has nowhere to live.
(c) **"Inventory item" is still modelled nowhere** — not in AD-6's core, not in AD-8's declarations, not in the ERD, not in the naming conventions. Round-2 ND-7 raised it; the revision fixed the NULL trap (correctly, and the `all-day` sentinel with the MariaDB rationale is good) and left the entity unmodelled.
**Tightening.** State the aggregation rule in AD-10; make the inventory item an explicit Space-like child of Listing in AD-6 and the ERD, carrying its own `concurrent_capacity`.

### M3-2 — Three transitions created by the revision have neither a cascade nor a job **[NEW in round 3]**
AD-23 claims completeness ("a job with no listing is the defect"); AD-26 claims six. Neither carries: **return to discovery** (renewal, re-publication, condition satisfied again — FR-53, FR-59); **Tier-change allowance re-evaluation and object demotion** (H3-2, FR-27, FR-50, and round-2 ND-4's second half, which AD-29 states as a rule with no trigger); **Subscription active → Grace transition at term end** (round-1 M-2, still open — the reminders and the Grace *end* are listed and the transition *into* Grace is not, so nothing moves the state). Three units will own the first, and the second will be discovered when a Vendor downgrades and fifteen images stay on the CDN.

### M3-3 — `concurrent_capacity` is required for insertion and is not a condition of listing **[NEW in round 3]**
AD-11: "declared by the Vendor, minimum 1, and **never implicitly defaulted**." AD-27's Named list of publish conditions is Verification, all-in price, Rules and Commitment — not capacity. So a Listing publishes with a null capacity, and the failure surfaces at the single worst moment: the Vendor's confirmation of an Agreement, where AD-11 cannot compute a seat range. Unit A adds it to the controller's publish conditions (but AD-27's list reads as closed — see H3-8); unit B leaves the field nullable and defaults to 1 at insertion time, which AD-11 forbids in the same sentence. Add it to AD-27's list, or state the default and delete "never implicitly defaulted".

### M3-4 — Lead-time and no-duration Services must declare a capacity that means nothing, and the Engagement Model can change under them **[NEW in round 3]**
AD-11 requires an explicit capacity on "every resource"; lead-time and no-duration Services create no occupancy rows, so the number is unused. Under AD-8 the Engagement Model is now Admin-editable data: a Service flipped from lead-time to per-Function turns every existing Listing into a resource with no declared capacity, and "never implicitly defaulted" makes every subsequent confirmation fail. AD-8's carry-forward paragraph (H3-1) covers the *shape* of existing rows and says nothing about a declaration that only becomes required after the change.

### M3-5 — "Currently accepting Enquiries" is a state with no home **[NEW in round 3]**
AD-10's no-duration row (correctly restored in round 2 from FR-28) makes this the only availability signal for a whole Engagement Model, and the flag appears in no AD's field list: not AD-6's core enumeration, not AD-8's declarations. Unit A puts it on the core Listing; unit B derives it from Subscription status, which makes it unsettable by the Vendor and breaks FR-28's plain reading. It also interacts with AD-22: for a no-duration Service every Listing ties on signal 1, handing the whole ordering to the seeded shuffle (round-1 M-8, still open).

### M3-6 — AD-22 must collapse AD-10's attributed signal into an ordinal, which AD-10 forbids **[STILL OPEN from round 1 — M-8, aggravated]**
AD-10's restored NFR 5.6 clause is right and welcome: "The function returns an **attributed signal**, never a boolean a caller can relabel." AD-22's first ordering signal is "availability". Sorting requires a total order over the signal's states, which is relabelling. Unit A orders `AVAILABLE > NO_SIGNAL > BLOCKED`; unit B treats `NO_SIGNAL` as available and orders on the next signal. Round-1 **H-2** (enumerate the states before AD-3 freezes them into `api/family/v1`) remains open — AD-10 now forbids a boolean and still does not enumerate the alternative, and two units will invent two enumerations, one of which is frozen.

### M3-7 — A Site Visit is unmodelled, and nothing says it must not take a Slot **[NEW in round 3]**
FR-38 and FR-71 (Venue: "A Family can request a site visit or a virtual tour from the Listing itself"). FR-39 is explicit: "**Nothing holds a Slot before an Agreement exists.** A Quote reserves nothing, a Site Visit reserves nothing." AD-11 says which Engagement Models create no occupancy rows and never says a Site Visit creates none. Unit A (Enquiries) models a visit as an appointment on the Vendor's calendar — the natural product decision — writes an occupancy row, and consumes a seat FR-39 says nothing may consume. `SITE_VISIT` is absent from the ERD and FR-38 is cited nowhere in the spine.

### M3-8 — The `AD-14` token's derivation decides two requirements in opposite directions, and the spine does not name it **[NEW in round 3 — extends compliance C-2.4]**
AD-14: the token is "**stable per person**, so FR-63's repeat-infringer register survives erasure". AD-28: the mobile number is the identity. AD-33 keys the register on the token. If the token derives from the *person record*, a removed fraudster who erases and re-registers on the same number gets a new record and a new token, and the register cannot link what it exists to link. If it derives from the *number*, a legitimate new owner of a recycled number inherits a stranger's infringer history — and AD-14's erasure has not actually erased, because the token is a reversible function of the identifier. Two units, two derivations, one of the two requirements broken either way. AD-14 must name the derivation (a salted one-way anchor over a re-registration-invariant identifier, held separately from the erased record) and record it as its second stated exception.

### M3-9 — Cascade composition has no reason parameter, so one cancellation writes the wrong count in three cases **[STILL OPEN from round 1 — M-12, aggravated by AD-26]**
AD-13 assigns FR-17 date moves to the count and exempts FR-69 amendments and FR-60-driven cancellations. AD-26 now makes cascades 1, 2 and 6 all invoke cascade 3 (`cancel_agreement`). AD-26 states no signature and no reason parameter. Unit A calls `cancel_agreement(agreement)` from the abandonment cascade; every Vendor whose Wedding was abandoned takes a walk-out on a publicly displayed rolling 24-month count. Unit B threads a reason through. FR-32's Rule-conflict cancellation ("recorded on both profiles") and FR-60's Vendor side remain unassigned, exactly as in round 1.

### M3-10 — Round-1 M-1's discoverability gate now has four owners, not one **[STILL OPEN from round 1 — M-1]**
AD-10 carries the Grace Period gate ("a Listing past its Grace Period shows no dates, because it is not discoverable"); AD-20 carries the verification read path; AD-26 carries the leaving-discovery cascade; AD-29 carries the object-visibility predicate. Round 1 and the rubric's A-5 both asked for one `is_publicly_visible(listing)` predicate that every read path calls first. The revision added owners. FR-53's third consequence — "no new Enquiry can be sent to it" — is still gated by none of them and lives in `api/family/v1/enquiries.py` by default.

### M3-11 — FR-64's published ranking disclosure is bound to nothing **[NEW in round 3]**
FR-64 requires "the main parameters determining organic ordering are published in plain language, reachable by any Family", and "any differentiated treatment between Vendors is stated in the Vendor terms". AD-22 fixes the ordering in `search_listings()`; no AD ties the published text to it. Unit A changes a tie-break weight in a sprint; unit B wrote the disclosure page six months earlier in `apps/mobile` copy. The disclosure is a regulatory statement about ranking that drifts silently from the ranking. FR-64 is cited nowhere in the spine.

### M3-12 — Twenty-one FRs are cited by no AD, and two of them are load-bearing for ADs that were rewritten **[NEW in round 3 framing]**
Never cited: FR-7, FR-8, FR-9, FR-10, FR-16, FR-22, FR-24, FR-25, FR-26, FR-30, FR-31, FR-36, FR-37, FR-38, FR-44, FR-55, FR-56, FR-64, FR-65, FR-67, FR-68. Two matter immediately:
- **FR-68** ("the Family chooses its Services at the Wedding, before browsing any of them", and a Service may be selected for the whole Wedding or for particular Functions) is the **source of the Service→Functions mapping that AD-10 and AD-11 now both depend on** — "only the Functions that Service serves within the Block", "the first served Function's start Slot". The mapping is unmodelled (round-1 **H-5**, still open) and is now load-bearing for the two ADs the product's core calculation lives in.
- **FR-8** (the running budget) is round-1 **H-7**, still open: no owner, no derived-versus-persisted decision, and AD-26 now names five cascades that each legitimately mutate the total.

---

## 4. Low

- **L3-1 [NEW]** AD-11's `Binds` still omits **FR-28** (the FR its Rule implements) and **FR-14** (whose Span-continuity sentence it quotes); AD-10's binds **FR-34** and omits **FR-53**. Round-2 ND-15 asked for this pass; it did not happen.
- **L3-2 [STILL OPEN from round 1 — L-2 / M-3]** `contract/family.v1.json` is a single file, so AD-3's `v2` has nowhere to land without editing `v1`; and AD-4 still does not require `TypedDict`/dataclass return annotations, so the response half of the contract — the half a phone cannot renegotiate — is ungeneratable.
- **L3-3 [NEW]** AD-26's `doc_events` sentence is the only mention of `hooks.py` binding in the spine, and the source tree comments `hooks.py # scheduler_events (AD-23)` only. A unit reading the tree will not know `doc_events` lives there.
- **L3-4 [NEW]** The Deferred section says the second review round "closed every critical and structural finding" — the closure review it refers to says the opposite in its own verdict line (17 of 43 closed, 8 new defects, two structural). The spine should not carry a claim its own review file contradicts.

---

## 5. The composition question, answered directly

The brief asked three specific questions. The short answers:

**Does AD-26's `doc_events` routing work for all six cascades?** No. It works for the two that have *only* a DocType-layer trigger. For the four that also have an `api/` route it double-fires (C3-1), because AD-26 requires both wirings and a `doc_events` binding cannot tell which caller raised the event.

**Can two cascades fire each other, or loop?** Both. The required composition is `1 → 3`, `2 → 3`, `5 → 4`, `6 → 3`, and AD-26 authorises only `api/` and the scheduler as callers, so composition is either unauthorised or forces a second implementation. Three self-loops exist as written — `cancel_agreement` writes `Agreement` and `Agreement.on_cancel` is bound to it; `listing_leaves_discovery` writes `Listing` and `Listing.on_update` is bound to it; `conclude_wedding` is bound to `Wedding.on_update` while cascades 2, 3 and 4 all write the Wedding's budget. The third is the dangerous one: **a Rule-conflict cancellation can re-enter the Wedding-conclusion cascade and erase a live guest list.** The spine contains no re-entrancy rule (`flags`: 0 occurrences; "re-entrant": 0).

**Is a retried confirmation idempotent, or does it take a second seat?** It takes a second seat (C3-2), because AD-11's retry rule advances on any unique violation and an occupancy row does not record who holds it, so the retry cannot recognise its own row. AD-31's idempotency does not save it: AD-11 declares the constraint to be tier-1 "by construction", which is exactly the signal that tells a careful unit not to build a second dedupe layer above it.

---

## 6. Verified closed since round 1 — not re-reported

Checked against the current file, and genuinely dead:

- **C-1** (cancel-then-amend releases the Slot) — killed at the root by abandoning Frappe's amend flow. The *residual* is C3-3 above, which is a different mechanism.
- **C-2** (no home for cross-entity operations) — `domain/` exists. The residuals are C3-1 and H3-5.
- **C-3** (Desk bypasses every `api/` guard) — AD-27 is the right AD, well written. The residual is H3-8's missing criterion.
- **C-4** (two storage shapes for per-Service attributes) — decided one way, cost recorded, PRD amendment noted. Clean.
- **H-1** (Block-wide occupancy set; Span closure ambiguity) — both halves closed in AD-10 and AD-11's text.
- Round-2 **ND-1** (controllers forbidden from firing their own cascades), **ND-2** (FR-60 misstatement), **ND-3** (NFR 5.6 deleted — restored, and the "attributed signal, never a boolean" phrasing is stronger than what was removed), **ND-6** (Catering capped at 1), **ND-8** (retryable collision as a user-visible decline), **ND-10** (no-duration lost FR-28's half), **ND-11** (config change rewriting history — the paragraph landed, though see H3-1), **ND-12** (un-tokened `allow_guest`), **ND-13** (four missing jobs, now sixteen).

Also worth saying plainly: **AD-11's `all-day` sentinel with the MariaDB NULL rationale, AD-12's hash chain, AD-27 as a whole, AD-29's move-the-object-not-a-flag rule, and AD-33's two-axis separation are each the right mechanism stated at the right altitude.** The findings above are collisions between good rules, not bad rules.

## 7. Still open from round 1, in one place

| Round-1 finding | Status | Where it now bites |
|---|---|---|
| H-2 five availability states, frozen into `api/family/v1` | **open** | M3-6; AD-10 forbids a boolean and enumerates no alternative |
| H-3 AD-12's verbatim snapshot copies identity AD-14 forbids | **open, aggravated** | the hash chain now makes pseudonymising the snapshot break the chain |
| H-4 Rules have no structured shape | **open** | AD-26 cascade 2 computes over data that does not exist |
| H-5 Selection cardinality and Function set | **open, now load-bearing** | AD-10 and AD-11 both depend on the Service→Functions mapping (M3-12) |
| H-6 ERD hangs Enquiry off Selection | **open** | FR-34 multi-send still forces five Selections and five budget lines |
| H-7 running budget has no owner | **open** | five AD-26 cascades now mutate it (M3-12) |
| M-1 discoverability gate | **open, worse** | four owners (M3-10) |
| M-2 AD-23 completeness | **partial** | active→Grace transition still missing (M3-2) |
| M-3 `TypedDict` returns | **open** | L3-2 |
| M-4 k-anonymous aggregates (FR-57, FR-20 prior) | **open** | AD-16 gained no carve-out; C3-4 shows the same dichotomy failing again |
| M-5 review window owner | **open** | FR-69 amendments now move its inputs (H3-5) |
| M-6 Preferred Vendor entity and evaluation time | **open** | H3-5 lists it as an unnamed cascade |
| M-7 which day sets the seasonal price | **open** | — |
| M-8 AD-22 seed home and "a new search" | **open** | M3-6 |
| M-9 occupancy origin and release semantics | **partial** | ERD gained `AGREEMENT ||--o{ OCCUPANCY`; AD-11's Rule did not (C3-2, H3-4) |
| M-10 AD-15 enumerates nothing | **open** | — |
| M-11 AD-15 / AD-18 boundary | **open** | H3-8 |
| M-12 cancellation count attribution | **open, worse** | M3-9 |

---

## 8. Shortest path

1. **C3-1** — write AD-26's composition rule: one trigger one invocation, re-entrancy guard, and an explicit cascade-calls-cascade authorisation with the graph. Nothing else in AD-26 is safe until this is answered, and it is a three-sentence fix.
2. **C3-2 + H3-4 + H3-9** — one pass over AD-11: the row carries its **holder** and **origin**; the retry predicate is "held by a different holder"; one seat per engagement across its whole closure, in one transaction; a Vendor declaration takes every seat.
3. **C3-4** — AD-16's third category (cascades are request-triggered and system-scoped, gated once at entry). Two sentences, and it unblocks all six cascades.
4. **H3-2 + M3-2** — one `is_publicly_visible(image)` function owned by one AD, the allowance ordering rule, and the Tier-change re-evaluation added to AD-26 or AD-23.
5. **H3-1** — split AD-8's carry-forward: shape is prospective, conditions of listing are current, a config change never makes a Listing unsaveable. Add the FR-62-versus-FR-59 conflict to the Conflicts table.
6. **H3-3 + H3-7** — scope AD-33's retention to the takedown axis; add AD-30's identity-asserting tier with proof of control.
7. **H3-8** — write the three-homes criterion once in AD-18 and stop presenting AD-27's list as closed.
8. **H-4 / H-5 / H-6 / H-7** — the four untouched shape decisions from round 1. H-5 is now the most urgent of them, because AD-10 and AD-11 both read a mapping the spine does not model.
