---
title: Autonomous-Readiness Review 3
target: prd.md (Vivah Spot, updated 2026-09-05; 72 FRs, 3 UJs)
date: 2026-09-06
prior: review-autonomous-readiness.md (R1), review-autonomous-readiness-2.md (R2)
---

# Autonomous-Readiness Review 3

## Verdict

**Not yet safe to hand to an autonomous build — but for the first time the remaining PRD-layer work is a single focused session rather than a rewrite.**

Round 1: 18 critical. Round 2: 16 critical (9 of 18 closed, 5 new created by the round-1 fixes). Round 3: **5 of round 2's 16 criticals are fully closed, 11 remain open, and 9 of those 11 are genuinely PRD-layer.** Two — Admin bootstrap and the numeric rotation band — I am explicitly *not* counting against this document; they belong to architecture and to tuning respectively, and a requirements document that specified them would have overstepped.

The round-2 pattern — *a fix that stops short of the requirements it disturbs* — has recurred, at materially lower amplitude. Three flat contradictions now sit **inside the newest material**: the Glossary's Selection entry contradicts its own worked example under the new seed table; the Glossary's Tier entry contradicts FR-50 and the Glossary's own Subscription entry on the billing key; and the seed table contradicts FR-14 and FR-26 on how Décor is priced. Each is one or two clauses. None requires re-deciding anything — they are the residue of superseded drafts left in place.

What has genuinely improved: the Slot scheme is settled platform-wide and is now the single most useful ruling in the document; the Subscription is no longer priced by reach, which collapsed an entire cascade of undefined behaviour; account linking now has a key and a challenge; re-verification on change exists; FR-32's destructive ordering is fixed; a Wedding has a lifecycle. **State-machine underdetermination has halved: 4 of 11 objects, down from 8.**

---

# 1. Round 2's "minimum set to reach safe", walked item by item

Fifteen items. **Delivered: 3. Partial: 9. Not delivered: 3.**

Strictness rule applied throughout: a fix that creates a new ambiguity is not delivered.

---

### 1. Slot — **DELIVERED**

The decisive ruling was made, and made in the right direction.

> **Slot** — a named part of a day: **morning, afternoon, evening, night**. The same four everywhere, for every Service, every Function and every calendar. A day is not an atomic unit, and Slots are not configurable — a Family assigns a Function to a Slot before choosing any Vendor, so a Slot cannot belong to a Service. *(Glossary)*

FR-28 agrees verbatim ("**The four Slots are the same for every Service.** They are a property of the day, not of what is being sold"), and FR-9 is consistent ("Each Function holds its own day, Slot and guest count"). The awkward-hours case is answered rather than ignored:

> A Vendor whose real hours sit awkwardly inside a Slot marks the Slot they occupy and states the detail in their Listing. The platform matches on Slots; the parties settle the hour between themselves. *(FR-28)*

R2 also asked for **explicit clock boundaries and a stated time zone**. Neither exists — `IST`, `time zone` and any hour boundary return zero hits across the document. **I am not counting this against the PRD.** Once the platform matches on ordinal Slots and explicitly disclaims the hour, clock boundaries are a display convention (architecture/UX-layer). Slot *ordering* — morning < afternoon < evening < night — is required by FR-14's span arithmetic and is unambiguously derivable from the enumeration order used identically in three places. The time zone is a one-word architecture default for a single-country product.

This is the highest-leverage thing the author fixed. The whole matching engine, FR-9, FR-13, FR-14's span arithmetic and FR-28's availability schema are now determinate.

---

### 2. The engagement unit — **PARTIAL**, and the fix introduced a contradiction

Cardinality was restated:

> **Selection** — the Listing a Family has picked from a Shortlist to serve a particular need. **One Selection per Service per Function it serves.** A Service engaged as a Span across every Function carries one Selection; a per-Function Service carries one for each Function it serves, and they may be different Listings — the lawn for the Haldi and the hall for the Reception are two Selections in the same Service. *(Glossary)*

Three defects, all created or left by this text.

**(a) The worked example is unrepresentable under the seed table the same revision added.** The example is "the lawn for the Haldi and the hall for the Reception" — a Venue. FR-71's new seed table declares:

> | **Venue** | Span, across every Function it serves | per Span | capacity | yes |

A Span Service, by the rule's own second sentence, "carries one Selection". So the canonical Shrirampur case — the case UJ-2 is built on, Dattatray's two Spaces — is the one case the rule forbids. The Glossary illustrates its rule with an example its rule excludes.

**(b) The rule's two sentences give different counts for the same configuration.** "One Selection per Service per Function it serves" yields three Selections for a Venue serving Haldi, Wedding and Reception. "A Service engaged as a Span across every Function carries one Selection" yields one. An agent must choose the cardinality key — `(Service, Function)` or `(Service, engagement instance)` — and every downstream arithmetic turns on it.

**(c) FR-8 has no span-price de-duplication rule, so the choice is load-bearing on the headline constraint.** FR-8 says only:

> **A Selection contributes its all-in price**, automatically, the moment the Family picks it.

Under reading (a) — three Venue Selections at a ₹2.4L Span price — the running total posts ₹7.2L against Rutuja's ₹8L ceiling, and the budget tracker that is the Workspace's reason to exist reports a wedding that cannot happen. Nothing in FR-8 prevents this.

FR-8's arithmetic also remains incomplete for two of the five pricing models FR-26 declares. It covers per-head ("that price times the headcount of the Functions it serves"), Span and per-Function implicitly, and the unattached case ("A Selection not yet attached to any Function shows as not yet estimated — never as ₹0"). It says nothing about **per unit** (quantity unknown — who supplies it?) or **per rental period** (duration unknown). And it does not say what happens when an **Agreement exists with no Selection behind it** — reachable via FR-39, since terms are proposed from an Enquiry thread and FR-22 never makes a Selection a precondition of enquiring.

---

### 3. Seed configuration table for the frozen five — **PARTIAL** (4 of 8 axes), and it introduces two contradictions

The table exists and is correctly framed as data rather than code:

> **The five Services carrying frozen specifications configure as follows.** These are the seed configuration, not special cases in code — every value here is a setting any other Service could also take.

Four axes are seeded: engagement model, pricing model, sizing attribute, has-Spaces. The Slot-scheme axis is correctly gone (item 1 made it platform-wide). FR-71's prose seeds the required-capabilities axis for all five. **Two axes are still unseeded**: filters and comparison attributes. Both are stated as per-Service configuration —

> **The filters offered are configured per Service, not built per Service.** A venue filters on capacity; a photographer does not. *(FR-18)*
> **The attributes compared are the Service's own, configured per Service** *(FR-21)*

— and neither is ever populated. An agent building the Venue and Photography screens must invent both sets. That is product design, not architecture.

**New contradiction (i): Décor's engagement model and pricing model disagree with FR-14 and FR-26.** The table reads:

> | **Décor & Mandap** | Span, from build to strike | per Function served | the Space's own dimensions | no |

FR-14 states the opposite rule:

> A Vendor prices against the declared model: a span Service quotes for the span, a per-Function Service quotes per Function.

And FR-26 assumes a single model per Service — "Price is expressed per the Service's model: per span, per Function, per head, per unit, per rental period" — where the table now supplies two different models in two columns. "The Service's model" no longer resolves. FR-14 does establish that *engagement model and calendar* are separate questions; it does not establish that engagement model and *pricing* model are, and it explicitly couples them in the sentence above.

**New contradiction (ii): Décor's sizing attribute is a field that does not exist, on an object owned by a different Vendor.** "Sized by: the Space's own dimensions" — but FR-23 gives a Space exactly three properties:

> A Space holds its own capacity, its own all-in price and its own calendar.

There is no dimensions field, no requirement that a Venue supply one, no format, and no condition of listing that demands it. Consequently FR-18 ("Filters cover ... the Service's own Sizing Attribute") and FR-19 ("Every Listing shows ... the Service's sizing attribute") are both unimplementable for Décor: the sizing attribute belongs to someone else's Listing in another Service. This is R-C12's Space-dimensions finding, unmoved and now load-bearing on two more FRs.

---

### 4. Identity: three rulings and one flow — **PARTIAL** (1 of 4 rulings)

**Delivered — the linking key and the challenge.** This was the account-takeover path, and it is properly closed:

> **One person is one account, and the mobile number is the identity.** A second sign-in method links to an existing account only where it carries a **verified mobile number matching that account**. An email address alone never links anything.
> **Linking requires proof of control of the existing account** — a one-time code to its number — and the person is told what was linked and when.
> Where a second method cannot be linked, it creates a separate account rather than failing silently, and the person is told why.

Deterministic, safe, and the failure mode is stated. One consequence worth the author knowing rather than fixing: Google rarely and Apple-with-Hide-My-Email never carry a verified mobile, so in practice most social sign-ins will land on the separate-account branch — which is correct behaviour under the rule, but means "one person is one account" holds by policy and not in fact.

**Not delivered — whether one account may hold both a Family and a Vendor role.** Zero hits across the document. FR-1's "one person is one account" and FR-3's "A Vendor business has exactly one account" still conflate person and business. A venue owner planning his own daughter's wedding is an ordinary case in this market and the document has no answer. Schema-determining.

**Not delivered — Admin bootstrap.** Zero hits. FR-4 and FR-61 grant total authority to an actor nothing in the document brings into existence. **I am not counting this against the PRD** — see §5.

**Not delivered — recovery, number change, device or credential loss.** Zero hits for `recover`, `number change`, `sign out`, `lockout`, session revocation. The mobile number is the sole identity (FR-1), the sole route into a Wedding (FR-5: "There is no other route in"), and the key to an account holding Subscriptions, Listings, the calendar, and eight years of Agreement custody (FR-43). Number churn and shared handsets are routine in Shrirampur. Lockout duration after five OTP attempts, Vendor and Admin session lifetimes, and sign-out-everywhere are all still absent; FR-1's ninety-day session reads on its face as applying to Admin.

---

### 5. Subscription ↔ Place — **PARTIAL**, and a superseded clause was left in the Glossary

**The substantive correction is excellent and closes most of R-C3.** Subscription multiplicity is now per Service only, with Place demoted to a price input:

> **A Subscription is held for one Service.** A Vendor listing in two Services holds a Subscription for each. *(FR-50)*
> **A Subscription buys no territory and limits no reach.** What a Vendor pays is determined by their Service and by where their own business sits; who can find them is not restricted by it. *(FR-50)*
> The Place in that matrix is where the **Vendor's own business sits**, not anywhere they might be found. *(FR-62)*

This single change dissolves the entire R-C3 cascade: partial-lapse-per-Place, Tier-per-Place, portfolio-allowance ambiguity, plural FR-53 reminders, and multi-term FR-56 arithmetic all cease to exist as problems. It is the second-best fix in the revision.

**But the superseded model survives in the Glossary, two lines above its own corrected entry:**

> **Subscription** — a Vendor's prepaid twelve-month plan for one Service, priced by that Service and by the Vendor's own Place. **It buys no territory and limits no reach.**
> **Tier** — ... How many Services a Vendor lists in is not a Tier allowance — **a Subscription is held per Service per Place, so each is paid for.**

Two adjacent Glossary entries state two different billing models, and the second contradicts FR-50 outright. The Glossary is declared binding on every downstream artifact (§3). An agent generating the billing schema has to pick.

**Still open:** which **level of the Place hierarchy** the price matrix is keyed at. FR-33 holds Places as village/town → tehsil → district → state → country, and a Vendor's business sits in all five simultaneously. If Admin sets a district price and a town price, nothing states which applies. The same undefined level also keys FR-57's five-Vendor k-anonymity cohort ("their Service in their place") and FR-20's shrinkage prior ("the average for that Service in that Place"). One resolution rule — most-specific-ancestor-wins — closes all three.

**Also still open:** the term-start anchor (payment, Verification or publication — zero hits) and renewal-during-grace arithmetic (extend from old expiry or from payment date). Both were on R2's list.

---

### 6. Ranking: four numbers and one ruling — **PARTIAL** (3 of 5)

**Delivered — the shrinkage threshold**, stated as intent plus a number:

> **Rating, adjusted for the number of Reviews it rests on.** A rating drawn from few Reviews is pulled toward the average for that Service in that Place, with the pull fading as Reviews accumulate and becoming negligible by about **ten Reviews**. **A plain average must not be used** *(FR-20)*

"About ten" is loose, but the shrinkage form, the prior and the asymptote are all specified — an agent implements this without inventing product.

**Delivered — rotation in the mandated disclosure**, which was a compliance defect against FR-64:

> **and that vendors of similar standing are shown in a varying order, so no one holds the top place permanently.** *(FR-20)*

**Delivered — reply speed reconciled**, the ruling R2 said only the author could make:

> **Reply speed is a different thing from an outcome**, and it does affect ranking (FR-20). Whether Dattatray answered is something a Family experiences directly; whether he then won or lost the wedding is his own business. *(FR-37)*

§7.2 was not amended and still excludes "vendor standing scores", but FR-37 now draws the line explicitly and §7.2's surrounding clauses are all about service-quality complaint pipelines. Residual tension, not a blocker.

**Not delivered — the near-equal band**, which is the one parameter that determines the launch-market ordering:

> Where Vendors' adjusted scores sit **within a few percent of each other**, their order varies between searches

At launch every Vendor has zero Reviews, so every adjusted score equals the Service-and-Place prior and the band is irrelevant — rotation covers the whole set, which is the desired behaviour. It only starts to matter once reviews accumulate. Given that, and given the stated guard rail ("A Vendor who is genuinely better is not rotated below one who is not"), **I classify this as a tunable, architecture-layer, and do not count it against the PRD.** The rotation period is likewise stated adequately ("varies between searches").

---

### 7. Rating aggregation scope and zero-review display — **PARTIAL** (1 of 2)

**Delivered — scope**, with a good reason attached:

> A Family submits a rating and free text, published on the **Listing** they engaged. A Vendor holding Listings in several Services is rated separately in each: a caterer who also does décor may be excellent at one and poor at the other, and a single blended figure would tell a Family nothing. *(FR-46)*

**Not delivered — the zero-review display.** Nothing states what a Listing with no Reviews shows in FR-19's "rating and review count", or how it behaves under FR-18's rating filter. Ranking is now safe (a zero-review Listing shrinks to the Service-and-Place average, which is exactly right), so the remaining exposure is display and filtering. The two obvious inventions both cause harm the PRD elsewhere forbids: "0 stars" defames every new Vendor and destroys SM-1; exclusion from rating-filtered results makes every new Vendor invisible and destroys SM-2's distribution counter-measure — which FR-20 calls the detector for the exact failure rotation exists to prevent.

---

### 8. Re-verification on material edit — **DELIVERED**

> **Changing what was verified requires verifying it again.** New portfolio images, a change of business identity or a new Space are not publicly visible until Verification has covered them. Without this, a Vendor can pass Verification with real photographs and replace them the next day, which is the fraud FR-60 exists to remove. *(FR-58)*

"Material" is defined by enumeration rather than adjective, which is the right way to do it. FR-60's stolen-portfolio ground now has a detector. The one consequence not covered — new photographs sit invisible until a human gets to them, with no queue and no SLA — belongs to item 14 below.

---

### 9. FR-32's trigger point inside FR-39 — **DELIVERED**

> **Nothing is removed until the engagement actually completes.** Acceptance authorises the consequence; the consequence takes effect only when the Agreement is confirmed. If confirmation fails — because the Slots were taken first under FR-39 — the Family's Shortlist, Selections and existing Agreements are exactly as they were. *(FR-32)*

This closes R-C6 cleanly. The destructive-acceptance-before-a-failable-confirmation hole is gone, the rollback is explicit, and the Selection consequence is now correctly stated (the earlier version withdrew a Shortlist's budget contribution, which is zero by definition).

---

### 10. De-listing cascade table — **NOT DELIVERED** (1 of 4 exits)

The **Subscription-lapse** exit is covered, and the FR-53/FR-8 contradiction R2 flagged is fixed:

> A Family with the lapsed Listing on a Shortlist is told it is no longer available. **Where it was their Selection, the Selection is cleared and its contribution withdrawn from the running budget.** Nothing is removed silently. *(FR-53)*

The other three exits state a removal and no consequences:

- **FR-70 self-withdrawal:** "A Vendor may withdraw a Listing from discovery themselves at any time, without losing it." — nothing on Shortlists, Selections, budget, open Enquiries, live Agreements, blocked Slots or review windows.
- **FR-60 Admin removal:** "On removal, Reviews already published remain published." — the only stated consequence.
- **FR-59 condition lapse:** "A Listing that stops satisfying them stops being discoverable until it does again." — no cascade at all, and this exit is now *more* reachable because FR-58's re-verification can push a published Listing back into it.

Each of these silently strands a Family in a way FR-32 and FR-53 both go out of their way to forbid ("Nothing is ever removed silently"). One four-row table closes it.

---

### 11. Wedding lifecycle — **PARTIAL**, with a self-referential hole in the new text

FR-72 is new and covers most of what R2 asked for:

> A Wedding is **in planning** from creation until its Chosen Block's last Function has passed.
> It becomes **concluded** when that last Function has passed. Concluding is what starts the ninety-day review backstop (FR-45), the erasure of Guest contact details (NFR 5.5), and the ability to publish a Real Wedding (FR-65).
> The Creator can **abandon** a Wedding at any time. Abandoning cancels its Agreements under FR-42, releases the Slots, and erases the Guest list.

Three residues:

**(a) The dormant-Wedding rule does not say what it promises to say.**

> A Wedding with no Chosen Block never concludes on its own. Where one has seen no activity for a year and holds no confirmed Agreement, the Family is asked whether to keep it, and told what happens if they do not answer.

The document never states what happens if they do not answer. It states that the Family will be told — which the build cannot do, because the build does not know either. This is a requirement that describes the existence of a decision instead of making it.

Worse, the sentence's own conditions leave a hole it does not notice: a Wedding with **no Chosen Block but a confirmed Agreement** is excluded from the dormancy sweep *and* from concluding, so it never terminates by any route. That is reachable — FR-34 explicitly lets an Enquiry carry "the Chosen **or Candidate** Block", and FR-39 proposes terms from that thread.

**(b) "Close of RSVP" is still undefined.** §5.5 keys the erasure of Guest contact data — the one class of data subject "who never chose this platform" — to "the later of the last Function of that Wedding or **the close of RSVP**". No object in the document has an RSVP close. FR-12 defines the RSVP page and never ends it. This is a retention clock with no second hand.

**(c) FR-45's anchor is narrowed but not resolved** — see §3 below.

---

### 12. FR-71 reconciliation — **PARTIAL** (1 of 5 sub-items)

**Delivered — precedence between the two condition lists.** Not by folding, but by stating a relationship, which works:

> **These are additional conditions of listing, on top of the general ones in FR-59**, and they are configured with the Service. *(FR-71)*

FR-20 and FR-50 now cite both rather than restating either ("every condition of listing in FR-59 and FR-71"), which closes the Featured-exemption loophole. Good.

**Not delivered — Space dimensions as a field, with a consent rule.** FR-23 unchanged (see item 3). The cross-Vendor disclosure remains unaddressed: FR-71 makes one paying Vendor's property measurements available to another paying Vendor, and §5.5's own posture ("Consent is specific, informed and separately given for each purpose") would ordinarily require that decision to be made explicitly. It has not been.

**Not delivered — the catering recommendation formula.** FR-71 still says only that "the platform computes a recommended quantity from the Function's invited count and its confirmed RSVPs, and shows how it arrived at the figure." No formula, no buffer, no behaviour at zero RSVPs. This is not a minor omission: FR-71 makes it a **condition of listing**, §7.6 draws its central boundary through it ("the line is between *suggesting* and *deciding*"), and the seed table makes confirmed headcount Catering's sizing attribute. An agent will invent the buffer percentage that decides whether Rutuja's 600 guests get 620 plates or 660.

**Not delivered — the virtual tour.** "A Family can request a site visit or a virtual tour from the Listing itself." Still no media type, format, size, storage, lifecycle, or mention in §5.3's imagery commitments — and still a second entry point to a Site Visit that FR-38 places inside the Enquiry thread and that has no lifecycle of its own.

**Not delivered — whether Commitment is per-Service extensible.** Band Baaja Baraat's no-on-the-spot-demands declaration is "a Commitment like any other", while the Glossary and FR-59 both define Commitment as a fixed triple. FR-71's "additional conditions of listing" framing softens this considerably — the fourth item can be read as an additional condition rather than a fourth Commitment component — but the word *Commitment* is used for it in a document that declares synonym drift a discipline violation (§3).

---

### 13. Enquiry and Agreement-pending state sets — **PARTIAL**, and the new state set is ambiguous

A state set was authored:

> An Enquiry is **sent**, then **answered** or — after thirty days with no Vendor reply — **unanswered**. A Vendor marks its progress: **contacted**, **site visit arranged**, **won**, **lost**. An Enquiry that produced a confirmed Agreement is **won** whether or not the Vendor marked it so. *(FR-37)*

**But it conflates two different things without saying so.** `sent / answered / unanswered` is a platform-observed lifecycle; `contacted / site visit arranged / won / lost` is a Vendor-asserted outcome. The text presents them as one sequence ("then", "marks its progress"). An agent must decide whether these are one enum or two orthogonal fields, and the answer is not inferable: can an Enquiry be simultaneously `unanswered` (no in-platform reply for 30 days) and `won` (he phoned her and got the wedding)? Under FR-36 that is an entirely ordinary path. Does `contacted` supersede `answered` or coexist with it? And FR-39's `declined-by-conflict` — "the proposed terms return to the thread as declined-by-conflict" — belongs to neither set.

Still absent from R2's list: the Family-confirmed-Agreement pending timeout and withdrawal (she waits in the exposed position indefinitely); Vendor decline; Enquiry expiry; the duplicate rule; broadcast-sibling behaviour when a Selection is made; **the broadcast width cap** (FR-34 permits "one Enquiry to several Listings in a Service at once" with no maximum, no cooldown, no rate limit); and **the definition of *first reply* and its non-response value** — which FR-55 computes a median over and FR-20 ranks on.

---

### 14. UJ-4, the Admin journey — **NOT DELIVERED**

The document still carries UJ-1, UJ-2 and UJ-3 only. Everything R2 said this would close as a by-product is still open: the Verification queue, assignee, scheduled visit and SLA (while SM-1 measures its duration, and FR-58's new re-verification adds a second queue feeding it); the Admin-exclusive capability list; whether Admin may build or edit a Listing on a Vendor's behalf, which the launch story requires; and the operational half of C-07's residual.

§2.1 states the Admin jobs-to-be-done in four bullets and §4.13 states the capabilities, so this is not a vacuum — but the third persona is the only one whose day the document never walks, and it is the persona the entire trust spine rests on by the document's own account (§5.9: "The verification staffing is the one to watch").

---

### 15. The remaining quantities table — **NOT DELIVERED** as a table; roughly a quarter landed in prose

Landed since R2: five Anchor Dates (FR-9), FR-46's whole-star scale, ~ten Reviews shrinkage (FR-20), the rolling twenty-four-month cancellation window (FR-42), FR-45's later-of backstop.

Still missing, and split by layer — this split is the point:

**PRD-layer (the author's decisions):**
- **Portfolio allowance per tier ×3.** It is one of only *two* things that differ between tiers ("placement in the marked Featured band, and portfolio allowance. Nothing else."), so half the tier ladder is undefined. The memlog records this as a deliberate deferral to §5.9 — but **§5.9's dependency row says "Subscription prices per Tier, and the Founding Vendor cohort definition and expiry date" and does not mention allowances.** The deferral is real; it is just not written down where the build will look.
- **Whether video exists** in a portfolio at all (a product question, distinct from file-size limits).
- **Broadcast Enquiry width cap** — a supply-side experience decision, and the anti-spam boundary.
- **Contact Reveal counting rule** (FR-56 computes a business figure from it; FR-36 does not say whether repeat reveals count once or many times).
- **Real Wedding cost band width** (FR-66 requires a band and never sizes it).
- **The catering recommendation formula** (item 12).
- **The nudge's "period"** — FR-29 fires on "three or more [Enquiries] touching the same period" and never defines the period.

**Architecture-layer (not counted against this PRD):** lockout duration; Vendor and Admin session lifetimes; Slot clock boundaries and time zone; max Functions per Wedding; max Invited Members; guest-list and bulk-import limits; Enquiry rate limits; photo count, file size, formats, minimum resolution; free-text length limits; rounding and the lakh/crore display convention; peak-load SLO figures; the rotation band and period.

**Business-input, correctly deferred:** GST rate and invoice series (statutory); tier prices (§5.9 row exists); SM-2's "meaningful" and SM-7's threshold (§6 states targets are a business decision — an explicit, adequate deferral).

**One genuine oddity: currency is never named anywhere in the document.** Zero hits for `currency`, `INR`, `rupee`. It is unambiguous from the ₹ glyph and from a single-market launch, so this is trivial — but it is the sort of thing a schema needs a word for.

---

# 2. Round 2's sixteen criticals, verified

| # | Finding | R2 status | **R3 status** | Layer |
|---|---|---|---|---|
| R-C1 | Slot scheme per-Service, FR-9 unreconciled | open | **CLOSED** | — |
| R-C2 | Selection cardinality | new | **OPEN — reduced, re-contradicted** | PRD |
| R-C3 | Subscription ↔ Place | new | **OPEN — largely closed, one stale clause** | PRD |
| R-C4 | Account linking key + challenge | new | **CLOSED** | — |
| R-C5 | Re-verification on edit | open | **CLOSED** | — |
| R-C6 | FR-32 ordering | new | **CLOSED** | — |
| R-C7 | Admin bootstrap | open | **OPEN** | **Architecture** |
| R-C8 | Recovery / number change / device loss | open | **OPEN** | PRD (ruling) + arch (mechanics) |
| R-C9 | Ranking parameters + rotation disclosure | open | **OPEN — disclosure closed, band remains** | **Architecture** (tunable) |
| R-C10 | Reply speed vs §7.2 / FR-37 | open | **CLOSED** | — |
| R-C11 | Seed configuration | open | **OPEN — 4 of 6 axes, 2 new contradictions** | PRD |
| R-C12 | FR-71 vs FR-59 + three undeclared things | open | **OPEN — precedence closed, 3 of 4 remain** | PRD |
| R-C13 | One account, both roles? | open | **OPEN — untouched** | PRD |
| R-C14 | Rating scope + zero-review display | open | **OPEN — scope closed** | PRD |
| R-C15 | De-listing cascade | open | **OPEN — 1 of 4 exits** | PRD |
| R-C16 | Wedding lifecycle | open | **OPEN — object added, 3 residues** | PRD |

**5 fully closed. 11 open — 9 PRD-layer, 2 architecture-layer.**

## The five that round-1 fixes created — verified specifically

- **R-C1 Slot — CLOSED, and closed in the right direction.** The author reversed his own earlier per-Service fix. The reasoning recorded in the document is sound and matches the constraint that forced it (FR-9 assigns a Function to a Slot before any Vendor or Service exists).
- **R-C2 Selection cardinality — OPEN.** Fixed in the right direction, then contradicted by its own example and by the seed table added in the same pass. See item 2. This is now the single most consequential PRD-layer gap, because FR-8's running total is the Workspace's reason to exist.
- **R-C3 Subscription ↔ Place — OPEN, but 90% closed.** The model correction is correct and dissolved the cascade; a superseded clause was left in the Glossary Tier entry and contradicts FR-50. One clause deletion.
- **R-C4 Account linking — CLOSED.** Key defined, challenge required, non-linkable branch specified, user told. This was the security decision R2 said the author had to make, and he made it.
- **R-C6 FR-32 ordering — CLOSED.** Authorise-then-apply, with explicit rollback on a failed first-writer-wins confirmation.

**Four of five closed; the fifth is one clause and one worked example away.** That is a real improvement on round 2, where five of five were open.

---

# 3. The newest material, audited fresh

Everything below was written after review 2 and has never been reviewed.

**Platform-wide fixed Slots — sound.** Best decision in the revision. Ordering derivable; the awkward-hours escape is stated rather than left to an agent; the Glossary, FR-9 and FR-28 agree verbatim. Only gap is the time zone, which I treat as architecture.

**Selection per Service per Function — unsound as written.** Three defects, detailed in item 2: the worked example contradicts the rule under the new seed table; the rule's two sentences give different counts for the same case; and FR-8 has no span-price de-duplication, so the wrong choice silently inflates the running total by a factor equal to the Function count. This one has a blast radius across FR-8, FR-15, FR-22, FR-53, FR-32, SM-5 and UJ-1's climax.

**Subscription per Service, priced by the Vendor's own Place, no territory, no reach limit — sound and materially simplifying.** FR-50 and FR-62 agree. Two residues: the stale Glossary Tier clause, and the unstated hierarchy level for the pricing key (which also keys FR-57's k-anonymity cohort and FR-20's shrinkage prior — one rule fixes all three).

**FR-72 Wedding lifecycle — sound in structure, incomplete in one branch.** The concluded trigger, the three dependent clocks and the abandon cascade are all correct. The dormancy branch states that the Family will be told an outcome the document never states, and its conditions leave a no-Block-with-Agreement Wedding that terminates by no route at all.

**FR-45's later-of backstop — correct in intent, but the trigger it depends on has no anchor date.** The construction works:

> **It opens no later than the Vendor's committed delivery date, or ninety days after the last Function of the Chosen Block — whichever of those two is later.** The ninety days catches a Vendor who committed to nothing; a Vendor who honestly committed to a longer timeline is judged against their own promise rather than against an arbitrary date.

Two observations. First, the ninety-day arm is **dead logic by the document's own guarantee** — FR-45 itself says "Every Listing carries a delivery timeline, because FR-59 makes the Commitment a condition of listing. There is no Service for which this trigger is unavailable." A Vendor who committed to nothing cannot exist, so the arm the paragraph exists to justify is unreachable. Harmless, but an agent must implement a branch the document says cannot occur, and will reasonably wonder which statement is wrong.

Second, and substantively: **the delivery timeline has no stated anchor.** FR-59 says "Where a Service is rendered at the Function itself, the timeline is that Function; where work arrives later, it is the date the Vendor commits to." For a photographer committing to ninety days — ninety days from *what*? The Function, the last Function, Delivery of the venue, the Agreement? And for a Wedding with no Chosen Block, "that Function" has as many candidate dates as there are Candidate Blocks. R-C16's FR-45 sub-finding is narrowed (the committed-date arm always exists, so the window always opens eventually) but the date it opens on is not computable.

**Verification-recency ranking with a rotation band — sound.** Signal 4 changed from verification-and-completeness (constant across all published Listings, and so a signal that separated nobody) to verification *recency*, which does separate. The reasoning is stated in the document. Rotation now appears in the mandated disclosure, closing the FR-64 compliance defect. The band remains "a few percent"; I treat that as a tunable.

**Account linking on verified mobile plus challenge — sound.** See R-C4 above.

**FR-71's seed configuration table — partially sound; two contradictions.** See item 3. Correctly framed as data. Four of six needed axes. Décor's row contradicts FR-14 and FR-26 on pricing, and names a sizing attribute that has no field, on an object belonging to a different Vendor.

**Listing-level rating — sound, well-reasoned, and it closes half of R-C14.** The residual is display and filtering at zero reviews. One further consequence not addressed: FR-44's "One Agreement earns one Review from each side" plus multi-Function Selections means one Family can post two or three reviews onto one Listing for one Wedding — R2's H-29, now reachable through the new cardinality rule rather than despite it.

**FR-37's Enquiry state set — authored, but ambiguous.** See item 13. Two state vocabularies presented as one sequence, with a third term (`declined-by-conflict`) belonging to neither.

**FR-58 re-verification on change — sound.** Enumerated triggers, stated rationale, closes FR-60's detector gap. Its only cost is queue pressure with no queue defined (item 14).

---

# 4. State machines re-checked

Round 2: **8 of 11 underdetermined.** Round 3: **4 of 11.**

| Object | R2 | **R3** | What changed | What is still missing |
|---|---|---|---|---|
| **Agreement** | Nearly | **Nearly** | unchanged | Pending timeout; Family withdrawal of her confirmation; conflicts other than Slots; the anchor date for the committed delivery timeline |
| **Listing** | Partial | **Partial+** | Re-verification on material edit (FR-58) | Cascade for 3 of 4 exits; Space-level vs Listing-level price and capacity; deletion; FR-62/FR-59 on an incomplete Listing |
| **Subscription** | No | **Partial** | Multiplicity collapsed to per-Service; Place demoted to a price input — dissolves the whole R-C3 cascade | Glossary Tier contradiction; Place-hierarchy level of the pricing key; term-start anchor; renewal-in-grace; payment failure/duplicate/refund/upgrade/downgrade; what "cancelling" means (§5.5 promises it); Founding Vendor's landing tier |
| **Wedding** | No | **Partial** | FR-72: in planning → concluded → abandoned, with three dependent clocks named | Dormancy outcome (stated as existing, never stated); the no-Block-with-Agreement Wedding that never terminates; RSVP close; ownership transfer |
| **Enquiry** | No | **Partial** | FR-37 state set enumerated; won-on-Agreement rule | Two conflated axes; `declined-by-conflict` unplaced; viewed, withdrawn, declined, expired, duplicates, terminal states; broadcast-sibling behaviour and width cap; *first reply* definition and its non-response value |
| **Review** | No | **Partial** | Aggregation scope fixed at the Listing | Zero-review display and filter behaviour; edit or withdrawal before publication; removal side effects; several Reviews per Listing per Wedding (H-29); reply lifecycle; sort order; the structured form's answer types |
| **Amendment** | Partial | **Partial** | unchanged | Rejection and expiry; confirmation ordering; conflict on new Slots; post-Delivery amendments against an open review window |
| **Selection** | No | **No** | Cardinality authored — and self-contradictory | No states named. Cardinality key undecided. Reversion on Agreement cancellation; behaviour on Listing lapse/removal; whether an Agreement without a Selection creates one; whether a Selection precedes an Enquiry |
| **Candidate Block** | No | **No** | nothing | Discarded = deleted or inactive; unlock without relock; expiry when dates pass; past-dated Anchor Dates; whether a Block that clears nothing may be locked |
| **Shortlist / entry** | No | **No** | FR-53 Selection clause corrected | The other three exits; notification when a Listing is taken by another Family; limits; what FR-68's "removes its Shortlist" does to the Selection |
| **Vendor account** | No | **No** | nothing | Dual role (R-C13); recovery, number change, device and passkey loss (R-C8); deletion; what FR-60 removal does to the *account* vs its Listings; reinstatement |

**Still fully underdetermined: Candidate Block, Selection, Shortlist, Vendor account.**

Unmodelled objects the build needs, unchanged from R2: **Verification** (no queue, assignee, SLA — now with a second inflow from FR-58), **Preferred Vendor association** (no pending, decline or revoke; FR-24's permitted set can still empty and strand a Family), **Wedding member invitation** (no pending state, and FR-12's own rationale forbids the platform messaging the invitee), **Site Visit** (no states, and FR-71 added a second entry point). **Admin account** still has no existence.

---

# 5. Revised verdict

## Not yet safe — but close, and the remaining PRD-layer work is one session

The document is now decision-complete on every question that determines its *shape*: the Slot scheme, the engagement models, the availability semantics, the review mechanism end to end, the Agreement's non-party posture, the concurrency rule, the ranking signals and their disclosure, the erasure precedence, and the commercial model. Those were the round-1 and round-2 blockers and they are settled.

What remains is of a different and smaller kind: **six one-clause contradictions, three unmade rulings, and two missing tables.** No item below requires the author to rethink anything. Most require him to finish carrying a decision he already made into the places it touches — which is the same instruction round 2 gave, now applying to a third as much surface.

Two things stop me signing this off despite that. First, **the running budget can be wrong by a factor of three** under a plausible reading of the new Selection rule, and the budget is the Workspace's entire reason to exist. Second, **three of the newest paragraphs contradict other newest paragraphs** — which means a fourth pass is needed regardless, and it should be a consistency sweep over the diff rather than a fresh authoring effort.

## Remaining minimum set — PRD-layer only, ordered by leverage

Nine items. Total realistic size: **~45 lines of prose, one four-row table, one journey.** Everything else I found is architecture-layer and is listed after.

| # | Item | Size | Closes | Why it is PRD-layer |
|---|---|---|---|---|
| **1** | **Selection cardinality: pick one key and de-duplicate the price.** State whether a Selection is keyed `(Service, Function)` or `(Service, engagement instance)`; fix the Glossary's lawn/hall example to agree with the Venue seed row (or change the Venue row); add one FR-8 sentence saying a Span price contributes once however many Functions it spans; add per-unit and per-rental-period arithmetic and the Agreement-without-a-Selection case. | **~8 lines** | R-C2, the budget | It is the product's headline arithmetic against the Family's stated ceiling |
| **2** | **Delete the stale Glossary Tier clause** ("a Subscription is held per Service per Place") and add one Place-resolution rule — most-specific-ancestor-wins — applying to the pricing matrix, FR-57's cohort and FR-20's prior. | **~3 lines** | R-C3, and two silent uses of the same key | It is the billing model and the benchmarking cohort |
| **3** | **Finish the seed table: filters and comparison attributes for the five**, and reconcile Décor's two model columns with FR-14/FR-26 (or amend FR-14 to permit engagement ≠ pricing model explicitly). | **~20 cells + 2 lines** | R-C11 | Which attributes a Family filters and compares on is product design, not implementation |
| **4** | **Space dimensions: add the field to FR-23 as a Venue condition of listing, with the cross-Vendor consent rule.** Then FR-18/FR-19 resolve for Décor. | **~4 lines** | R-C12(a), R-C11 | It discloses one paying customer's data to another; §5.5 requires that decision to be explicit |
| **5** | **De-listing cascade: one four-row table** (lapse / self-withdrawal / Admin removal / condition lapse × Shortlist, Selection + budget, open Enquiries, live Agreements, blocked Slots, review windows). Row 1 already exists in FR-53. | **1 table** | R-C15 | Every cell is Family-visible behaviour the PRD elsewhere forbids leaving silent |
| **6** | **Three identity rulings.** (a) May one account hold both a Family and a Vendor role — and restate FR-3 as one login per Vendor *business* if so. (b) May a person change the mobile number that is their identity, and by what proof. (c) What happens when the number is gone — an attributable Admin recovery action, or nothing. | **~6 lines** | R-C13, R-C8 (ruling half) | Schema-determining; and (c) governs custody of an eight-year record |
| **7** | **Three FR-72 / FR-45 closures.** What actually happens to a dormant Wedding that gets no answer; how a no-Block Wedding holding an Agreement terminates; what date the delivery timeline is anchored to. Optionally note the ninety-day arm is a belt-and-braces branch. Define "close of RSVP" in FR-12. | **~5 lines** | R-C16, FR-45 | One is a stated-but-unmade decision; one is a data-protection clock |
| **8** | **Zero-review display, catering formula, portfolio allowance.** What a Listing with no Reviews shows and how the rating filter treats it; the catering recommendation's arithmetic and buffer; either the three allowance numbers or a §5.9 dependency row saying they are a business input (the memlog says they are — the PRD does not). | **~5 lines** | R-C14, R-C12(c), item 15 | All three are visible to a user and none is derivable |
| **9** | **UJ-4, the Admin journey** — a verification visit and a fraud removal, end to end. Closes the Verification queue, assignee and SLA (which SM-1 measures and FR-58 now feeds twice), the Admin-exclusive capability list, and whether Admin may build a Listing for a Vendor. | **~1 page** | item 14, C-07 residual | It is the only persona whose day is never walked, and the trust spine rests on it |

**Also worth one line each, not blocking:** disambiguate FR-37's two state axes and place `declined-by-conflict`; define *first reply* and its non-response value; cap broadcast Enquiry width; state the Contact Reveal counting rule; specify or drop the virtual tour; define FR-29's "period"; state the Real Wedding cost-band width; name the currency.

Items 1, 2 and 5 alone remove every way this document can produce a *wrong* build rather than an *incomplete* one. Items 1–8 make it safe. Item 9 stops the Admin epic being re-litigated in every story.

## What is architecture-layer and must NOT be counted against this PRD

Listed explicitly so the next pass does not chase them. A requirements document that specified these would have overstepped, and the round-2 audit was slightly over-broad in charging some of them to the author.

- **Admin account bootstrap (R-C7).** How the first Admin row comes to exist is deployment and seeding. The PRD establishes that Admin exists and what Admin may do; that is the requirement.
- **The rotation band's numeric value (R-C9).** FR-20 states the mechanism, the purpose, the disclosure and the guard rail ("A Vendor who is genuinely better is not rotated below one who is not"). The percentage is a tunable an architect sets and an operator adjusts.
- **Slot clock boundaries and the time zone.** The PRD explicitly matches on ordinal Slots and hands the hour to the parties. Boundaries are a display convention.
- **Session lifetimes beyond the ninety-day family case, lockout duration, sign-out-everywhere, session revocation mechanics.** The *ruling* on number change and recovery is PRD-layer (item 6); the session plumbing is not.
- **Rate limits, broadcast throttling mechanics, page sizes, cache policy, media file sizes, formats, minimum resolutions, free-text length caps, max Functions, max Invited Members, guest-list and import limits.** Guardrails, not requirements. (Whether *video* exists at all is product — that one stays on the list above.)
- **Peak-load SLO figures.** §5.4 states the shape of the requirement ("sized for peak muhurat load, not for average load"), which is the right altitude for a PRD.
- **GST rate, invoice series, place-of-supply default.** Statutory and accounting configuration; §5.9 already carries the registration dependency.
- **SM-2's "meaningful" and SM-7's threshold.** §6 states outright that targets are a business decision not set here. That is an explicit, adequate deferral, not a gap.

## One process note

Three rounds have now each closed most of what was named and re-opened part of it a clause away. The cause is visible in the memlog: fixes are applied at the FR that was cited, and the Glossary and the tables — both of which §0 and §3 declare binding on everything downstream — are updated separately or not at all. **Every one of this round's new contradictions is between a Glossary entry or a table cell and an FR.** A single mechanical sweep of §3 and FR-71's table against the FRs they govern would have caught all three, and would catch the next three.

---

*Findings this round: 11 critical open (9 PRD-layer, 2 architecture-layer), 5 closed. Minimum set delivered 3 of 15, partial 9, not delivered 3. State machines: 4 of 11 underdetermined, down from 8. Prior rounds: 18 critical, then 16.*
