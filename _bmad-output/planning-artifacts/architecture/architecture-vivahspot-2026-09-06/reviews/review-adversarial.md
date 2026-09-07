---
review: adversarial
target: ARCHITECTURE-SPINE.md (architecture-vivahspot-2026-09-06)
driving_spec: prds/prd-vivahspot-2026-09-03/prd.md
reviewer_lens: adversarial — two AD-compliant units that still build incompatibly
date: 2026-09-06
verdict: CHANGES REQUIRED
findings: 4 critical, 7 high, 12 medium, 4 low
---

# Adversarial Review — Architecture Spine, Vivah Spot

## Method

The spine's own stated job is to fix "only what two independently-built units could otherwise choose incompatibly." So the test applied here is exactly that, run backwards: for each area, construct two units one level down — two epics, two feature teams, two dev agents working weeks apart — that **each obey every AD to the letter** and still produce something that cannot be assembled. Every such pair is a hole in the spine, not a defect in the units.

Findings are ordered by severity. Each carries a **Scenario** (what unit A builds, what unit B builds, and the ADs each is obeying), a **Resulting incompatibility**, and a **Tightening** — a new AD or a tightened Rule that closes it.

The spine is genuinely good: AD-9, AD-11, AD-12, AD-19, AD-21 and AD-24 each close a real hole with a real mechanism, and the honesty about enforcement tiers is unusual. The findings below are what remains open, not a judgement on what is there.

---

## Critical

### C-1 — Frappe's cancel-then-amend releases the Slot, and another Family can take it

**ADs in play:** AD-11, AD-12, AD-13, FR-42, FR-69, FR-28.

**Scenario.** Unit A builds the Agreements epic. AD-11 makes blocking rows the mechanism, FR-42 says a cancellation "releases the Slots immediately", and FR-28 says "a cancelled Agreement releases those Slots immediately". A implements slot release in `Agreement.on_cancel` — the only correct Frappe home, and AD-1-compliant (a controller must not reach into `api/`). Unit B, four weeks later, builds FR-69 Amendments. AD-12 says the Agreement is submittable and "an Amendment appends `seq+1`", and AD-13 confirms this rides Frappe's amendment flow, which is **cancel-then-amend**: the original moves to `docstatus` 2, then an amended document is created and submitted.

Both obey every AD. AD-13 anticipates exactly one consequence of the cancel step — that `docstatus` 2 must not be read as a cancellation for FR-42's profile count — and closes it. It says nothing about the *other* things that fire on cancel.

**Resulting incompatibility.** A cooperative Amendment — the Family revises the Haldi guest count from 180 to 210 under FR-69 — runs `on_cancel`, which deletes the Agreement's blocking rows. Between that delete and the amended document's `on_submit`, the `(space, day, slot)` rows are free. AD-11 makes confirmation first-writer-wins **by database constraint**, so any other Vendor confirmation in flight for that Slot wins the race legitimately. The amended Agreement then fails to re-insert its rows and cannot be confirmed. A guest-count change loses the couple their venue, and FR-69's explicit promise — "no cancellation is recorded, because nothing was cancelled" — is honoured on the profile count while the calendar has already treated it as a cancellation. The same trap catches FR-42's budget withdrawal (the Workspace briefly reads the wedding as ₹2.4L cheaper), the FR-53 "Selection cleared" notification, and any cancellation notification to the Family.

This is the single most damaging thing in the document, because both units are correct, the failure is intermittent, and it destroys the one outcome the product exists to protect.

**Tightening.** Amend AD-12 to state that **an Amendment holds the blocking rows across the amend transition** — either by carrying the amendment through a flag (`doc.flags.is_amendment`) that `on_cancel` reads and skips every cancellation side effect, or by reparenting blocking rows to the Agreement *chain* (a stable `agreement_chain` identifier) rather than to the `Agreement` document name, so the rows survive `docstatus` transitions untouched. State it as a rule, not a note, and enumerate the side effects it suppresses: slot release, cancellation count, budget withdrawal, Selection clearing, notification. Add: **where an Amendment changes days, Slots or Span (FR-69), the row set is transformed in one transaction — new rows inserted before old rows are released — so the constraint is never momentarily satisfiable by a third party.** AD-13's carve-out is the right instinct applied to one field; it needs to be applied to the whole cancel path.

---

### C-2 — There is no home for a cross-Service, cross-entity domain operation, and six of them exist

**ADs in play:** AD-1, AD-5, AD-23, and the source-tree seed.

**Scenario.** The spine names exactly four layers: clients → `api/` → `services/<service>/handler.py` → DocTypes. AD-1 forbids any upward import. AD-5 says `services/` is **per-Service**, keyed by a registry, and "no Service-specific branch appears anywhere else". AD-1 further states, as a feature, that Frappe Desk "consumes DocTypes directly and is never a client of `api/`". The scheduler (AD-23) is likewise not a client.

Now take FR-53's four routes out of discovery, which the PRD says "behave identically for Families": tell every Family holding the Listing, clear the Selection, adjust the running budget, leave existing Agreements and threads untouched. The four triggers sit at four different layers:

| Route | Trigger | Layer it fires from |
|---|---|---|
| Grace Period ends | scheduled job (AD-23) | below `api/` |
| Vendor withdraws (FR-70) | client action | `api/vendor/` |
| Admin removes (FR-60) | Desk action on the DocType | DocType layer, `api/` unreachable |
| FR-59/FR-71 condition ceases | a predicate over Listing fields flipping | no event at all |

Unit A builds the Subscription epic and puts the cascade in the scheduled job. Unit B builds the Vendor Listings epic and puts it in `api/vendor/listings.withdraw()`, per AD-18's rule that every method carries its own gate and its own logic. Unit C builds the Admin epic and, because AD-1 makes Desk bypass everything above DocTypes, puts it in `Listing.on_update`.

Every one of them obeys every AD. There is no layer the spine authorises them to share.

**Resulting incompatibility.** Three implementations of one cascade, each drifting: A notifies but forgets the budget adjustment; B clears the Selection but sends a different message; C, in `on_update`, fires on *every* Listing save including B's, so the cascade runs twice and the Family gets two notifications and a doubly-withdrawn budget line. The fourth route never fires at all, because nobody owns a predicate with no event — and FR-53's load-bearing sentence, "**No route removes a Listing from a Family's view without telling them**", is silently false.

The same structural hole swallows five more cascades: FR-17 (Chosen Block change → cancel every Agreement, count on both profiles, release Slots, withdraw budget, re-evaluate), FR-32 (Rule conflict → remove Shortlist entries, clear Selection, cancel Agreements, only on successful confirmation), FR-42 (cancel), FR-60 (removal, which behaves *differently* from FR-53's uniform rule), FR-72 (abandonment → cancel Agreements, release Slots, erase the guest list, kill every public link). Each has at least two legitimate entry points at different layers.

**Tightening.** Add an AD that names the missing layer:

> **AD-26 — Cross-cutting domain operations live in `domain/`, below `services/` and above the DocTypes.**
> A state change with more than one consequence, or more than one entry point, is a named function in `domain/<operation>.py`. Every entry point — a whitelisted method, a scheduled job, a DocType controller hook, a Desk action — calls the same function; none reimplements it. `domain/` imports DocTypes only and is imported by `api/`, `services/` and controllers alike. The operations that must exist on day one are enumerated: `withdraw_listing_from_discovery` (FR-53's four routes plus FR-60's variant), `cancel_agreement` (FR-42, FR-17, FR-32, FR-72), `change_chosen_block` (FR-17), `apply_rule_conflict` (FR-32), `conclude_wedding` (FR-72), `abandon_wedding` (FR-72). A consequence that fires from a controller hook rather than from one of these is the defect.

Also tighten AD-5 to say explicitly that it governs **per-Service** behaviour and is not the home for anything cross-Service — as written, "no Service-specific branch appears anywhere else" is read by a careful agent as "`services/` is the only behaviour layer", which is what pushes cascades into controllers.

And add to AD-20 or the new AD: **the FR-59/FR-71 predicate is evaluated on every write to the fields it depends on, and the transition is an event** — otherwise route four has no trigger in any design.

---

### C-3 — AD-1 makes Frappe Desk bypass every rule above the DocType layer, including the ones that prevent fraud

**ADs in play:** AD-1, AD-5, AD-18, FR-39, FR-61, FR-71.

**Scenario.** AD-1 states, approvingly, that "Frappe Desk is not a client — it sits directly on the DocTypes, which is what makes FR-62's configuration editing free." AD-18 then puts the platform's most important business rules in `api/`: "Action rules the framework has no home for — FR-6's Creator-only enquiry, contact reveal, confirmation, cancellation and review; **FR-39's bar on transacting with one's own Listing** — live in one guard module called at the top of the method."

Unit A builds the Agreements epic exactly as AD-18 instructs: `api/family/v1/agreements.py` calls `guards.assert_not_own_listing()` and `guards.assert_is_creator()` before touching anything. Unit B builds the Admin epic per AD-1 and FR-62: Frappe Desk on the DocTypes, no `api/` involvement, because that is the whole point.

Both obey every AD.

**Resulting incompatibility.** Every rule in AD-18's guard module is unenforced on the Desk path. FR-39 says without the self-dealing bar "a Vendor could manufacture an engagement with himself, mark Delivery, and publish a verified Review of his own Listing — defeating the only consequence this platform has and buying rank with it." That is now reachable: an Admin user, or any script or Desk action running as Administrator, can create and submit an Agreement between an account and its own Listing. FR-61 explicitly says the opposite — "The integrity constraints in FR-43, FR-46 and NFR 5.7 bind Admin as they bind every other actor" — and the spine's own gate for that class of rule sits in a layer Admin does not traverse.

The same hole applies to FR-71's per-Service required capabilities. Unit A puts each Service's required-capability check in its handler, per AD-5 ("Each Service's behaviour lives in exactly one module"). Unit B puts it in `Listing.validate()` as a config-driven check, per AD-8 and FR-71's "configured with the Service". Under A, a Listing edited in Desk publishes without the capability FR-59/FR-71 make a condition of listing — no error, no signal.

**Tightening.** Add to AD-18, and mirror it in AD-5:

> A rule that must hold for **every** actor, including Admin acting in Desk and including a scheduled job, is enforced in the DocType controller (`validate`, `before_submit`) or by a database constraint — never only in a guard called from `api/`. The guard module in `api/` gates *who may invoke an action*; the controller gates *what states may exist*. FR-39's self-dealing bar, FR-59's and FR-71's conditions of listing, FR-46's un-editability of a Review and FR-43's freeze are state invariants and belong in the controller. FR-6's Creator-only restriction is an actor rule and belongs in the guard.

Then close the loop on AD-1: it currently sells the Desk bypass as pure upside. Add its cost honestly, the way AD-5 does: **"Accepted cost: Desk traverses no gate above the DocType layer. Every invariant that must bind Admin is therefore a controller or database constraint, per AD-18."**

---

### C-4 — Per-Service attributes have two AD-compliant storage shapes, and the spine endorses both

**ADs in play:** AD-6, AD-8, FR-62, FR-71.

**Scenario.** AD-6: "Each Service adds one detail DocType, 1:1 with Listing, whose fields are **real indexed columns**." AD-8: "These remain Admin-editable data with no code change: per-Service filters and comparison attributes…". FR-62: "Admin can define a new Service — its taxonomy, **fields**, filters, comparison attributes, Sizing Attribute, Order Basis, Engagement Model and pricing model — without a code release."

AD-8's list conspicuously carries filters and comparison attributes but **not fields**. FR-62's list carries fields. The spine's "Conflicts to resolve upstream" table records AD-5 versus FR-62 for *behaviour*, and explicitly says the exception "holds for a Service's configuration". A Service's fields are, on the PRD's own account, configuration.

Unit A builds the Admin Console epic. It reads FR-62 and the conflicts table (which resolves the FR-62 tension for behaviour only, leaving configuration intact) and implements Service fields as data: a `Service Field` child table on `Service`, values stored in a generic `Listing Attribute Value` child table on `Listing`, rendered dynamically. No release needed to add the fiftieth Service. Unit B builds the Discovery epic and implements per-Service attributes exactly as AD-6 says: `Venue Listing Detail` with `capacity`, `stated_size`, `has_ac_hall` as real indexed columns.

Both obey every AD. Neither is being lazy.

**Resulting incompatibility.** Two storage shapes for one concept, in two epics that must read each other's data. Unit B's filter builder cannot see A's attribute values; A's Admin screen cannot create B's columns. FR-18's "the filters offered are configured per Service" and FR-21's "the attributes compared are the Service's own, configured per Service" straddle both. Whichever ships second either rewrites the other or bolts on a translation layer nobody owns. And the deferred note "Search stays on MariaDB… AD-6's real indexed columns are what keep the Meilisearch swap a one-file change" is silently invalidated under A.

**Tightening.** Decide it, and record the cost the way AD-5 does. The honest resolution is a split, because both halves have real requirements behind them:

> **AD-6 (extended).** A Service's attributes divide into **indexed** and **descriptive**. Indexed attributes — those a filter, a sort or Block matching touches — are real columns on the Service's detail DocType, and adding one is a migration and therefore a release. Descriptive attributes — those only rendered and compared side by side — are Admin-configurable data with no code change. AD-8's configurable list is extended to descriptive attributes; **it does not extend to indexed ones.** Every Service's Sizing Attribute is indexed by construction (FR-18 filters on it).
>
> **Accepted cost.** FR-62's "adding the fiftieth Service is the same act as adding the sixth" holds for taxonomy, descriptive fields, filters over already-indexed columns, Sizing Attribute selection, Order Basis, Engagement Model, pricing model and Place — and does **not** hold for a new indexed attribute. **The PRD needs amending**, alongside the AD-5 amendment already recorded.

Add it to the "Conflicts to resolve upstream" table. The FR-62 row currently reads as though behaviour is the only casualty; it is not.

---

## High

### H-1 — AD-10 checks the Block's occupancy set, not the Service's; and AD-11's Span expansion is ambiguous where FR-14 is not

**ADs in play:** AD-10, AD-11, FR-13, FR-14.

**Scenario, part one.** AD-10: "Availability is a `NOT EXISTS` over **the Candidate Block's** `(day, slot)` occupancy set." FR-13 says something narrower: "across every day and Slot that Block occupies **for that Service**." The qualifier was dropped.

Unit A implements AD-10 literally: for each Candidate Block, collect every `(day, slot)` any Function in the Block occupies, and check the Listing against all of them. Unit B implements FR-13: collect only the `(day, slot)` pairs of the Functions *this Service serves* under FR-68's per-Function Service selection.

**Resulting incompatibility.** Under A, a photographer engaged only for the Wedding evening is shown unavailable because he is booked on the Haldi morning two days earlier — a slot he was never being asked about. Every per-Function Service in a multi-day Block is over-restricted; with FR-20 making availability the first ranking signal, half the catalog silently drops out of results, and SM-7's honest test ("the proportion of Candidate Blocks that clear a Family's whole set of Selections") reads as a supply-density failure when it is an arithmetic one. A and B disagree on every multi-Function wedding, and A's is what the AD literally says.

**Scenario, part two.** AD-11: "A Span blocks by expanding to one row per `(day, slot)` **it occupies**, overnight included." FR-14 is unambiguous: a Span is "held continuously from the start of the first Function it serves to the end of the last — the overnight between them included. No part of that Span is available to anyone else." "It occupies" reads two ways: the slots of the Functions the Span serves (2 rows for a Haldi-morning + Wedding-evening venue), or the continuous closure between them (7 rows). Unit A reads it the first way; unit B the second. "Overnight included" nudges toward B but is satisfiable by A's reading if the last Function is a night Slot.

**Resulting incompatibility.** Under A the venue's Haldi-day afternoon and evening, and the Wedding-day morning and afternoon, are sellable to another Family — the platform sells an overnight it has already committed, which is verbatim the failure FR-14 declares this model removes ("no way for the platform to sell an overnight it has already committed"). AD-11's `UNIQUE` constraint faithfully protects the wrong row set.

**Tightening.** Two sentences into the ADs:

- AD-10: "…over the `(day, slot)` set **the Candidate Block occupies for that Service** — the Functions this Service serves under FR-68, and for a Span Service the continuous closure of those Functions."
- AD-11: "A Span expands to one row for **every** `(day, slot)` from the first Slot of the first Function it serves to the last Slot of the last, inclusive of every Slot between, overnight included — not merely the Slots of the Functions themselves."

State the worked example in the AD, because it is the calculation the product exists to get right: a venue serving a morning Haldi on the 26th and an evening Wedding on the 27th blocks 26-morning, 26-afternoon, 26-evening, 26-night, 27-morning, 27-afternoon, 27-evening — seven rows, not two.

### H-2 — The availability function returns a boolean; FR-13 needs five states, and the answer is frozen into `api/family/v1`

**ADs in play:** AD-10, AD-3, AD-4, FR-13, NFR 5.6.

**Scenario.** AD-10 defines availability as a `NOT EXISTS` — a boolean — evaluated by one server-side function every surface calls. FR-13 requires four distinguishable non-boolean cases:

1. A Family browsing **before supplying any Anchor Date**: "Listings are shown without an availability signal — **not as unavailable**."
2. A **no-duration** Service: "excluded from Block matching and presented **without an availability claim**, not as unavailable."
3. A Listing **past its Grace Period**: "shows no dates at all" (and, per FR-53, is not in the result set at all — see M-1).
4. Genuinely blocked.

Unit A implements the boolean AD-10 describes and, with no Candidate Block, returns `True` — nothing blocks. Unit B returns `None` and the client renders nothing. Both obey AD-10.

**Resulting incompatibility.** Under A, a Family who has not yet given a date sees "shows available" on every Listing — an availability claim the platform is not entitled to make, breaking FR-13's explicit "not as unavailable / no signal" rule and NFR 5.6's "availability is always attributed to the Vendor, never asserted by the platform." Under B, the mobile client must handle a null the contract did not promise. And because this is `api/family/v1`, AD-3 freezes it: "frozen once shipped — a breaking change adds `v2` beside it and never edits `v1` in place." A two-valued return that needed to be five-valued is a `v2` and a phone release, on the one client AD-4 exists to protect.

**Tightening.** Put the enumeration in AD-10, not in a story:

> The availability function returns one of five states, and every surface renders each distinctly: `AVAILABLE` (vendor shows available), `BLOCKED`, `NO_BLOCK_SUPPLIED` (the Family has no Anchor Date yet — no signal, never "unavailable"), `NO_CALENDAR` (a no-duration Service — no availability claim), `NOT_DISCOVERABLE` (past Grace Period, withdrawn, removed, or a condition of listing unsatisfied). A boolean return is the defect. Because this shape enters `api/family/v1` and AD-3 freezes it, the enumeration is fixed before the first method ships.

### H-3 — AD-12's verbatim snapshot copies the identity AD-14 forbids copying, and erasure cannot reach it

**ADs in play:** AD-12, AD-14, FR-39, FR-43, NFR 5.5.

**Scenario.** AD-14: "**No record copies a person's name or number**; every record references one person record. Erasure replaces the identifying fields on that record with a stable non-identifying token, and every referring record shows the token." AD-12: at confirmation an `Agreement Record` row stores "the **serialised frozen terms verbatim**, their SHA-256 digest, and a server-side timestamp. That row is never `UPDATE`d… so year eight reproduces year one exactly and the digest still verifies."

FR-39 says an Agreement is a record of "**these two parties**, this date, these terms", and FR-43 requires it to "remain retrievable in the form they were confirmed in" and to support a certificate attesting how the record was produced. Unit A, building Agreements, serialises the parties' names into the snapshot — without them the artefact proves nothing about who agreed, which is the entire evidential point. Unit B, building the privacy epic, implements NFR 5.5 erasure exactly as AD-14 prescribes: tokenise the `PERSON` record and rely on the no-copies rule.

Both obey their AD. The two ADs cannot both be true of the same row.

**Resulting incompatibility.** Erasure leaves the person's name in `Agreement Record` permanently and undetectably, because AD-14's whole design is "there is nothing else to find". NFR 5.5's stated precedence — engagement records are **pseudonymised** and retained, not merely retained — is unimplementable against an append-only, never-`UPDATE`d, digest-verified row. And if unit B does redact it, AD-12's digest no longer verifies and FR-43's certificate attests to a document that no longer exists.

**Tightening.** Reconcile them explicitly, in AD-12:

> The snapshot stores the **terms** verbatim and the parties by **reference to their `PERSON` record**, never by copied name or number. Identity at the moment of confirmation is preserved by a separate `Agreement Party Attestation` row — name, number and role as they stood — which sits **outside** the digested payload and is the row NFR 5.5 pseudonymises. The digest therefore covers what must not change (the terms) and not what the law may require to change (the identity). Where a party is pseudonymised, the certificate under FR-43 states that pseudonymisation occurred, on what date and under which retention basis, and the terms digest still verifies unchanged.

Then add the corresponding sentence to AD-14: "**Exception:** `Agreement Party Attestation` holds identity by copy, is enumerated here, and is the only such record. Any second one is a defect."

### H-4 — Rules have no structured shape, and FR-24 / FR-25 / FR-32 are unimplementable on prose

**ADs in play:** AD-6, AD-24, NFR 5.1, FR-24, FR-25, FR-32.

**Scenario.** AD-6 lists what the `Listing` core holds: "Vendor, Service, all-in price, **Rules**, Commitment, verification state, portfolio, Place coverage." Nothing says Rules are anything but a field. NFR 5.1 says content is "stored and shown **exactly as the person wrote it**… The platform does not translate it, normalise it, or require a language to be declared for it" — and names "a Vendor's Rules" as its first example.

Unit A builds Vendor Listings and models `Listing.rules` as a `Text Editor` field, obeying AD-6 and NFR 5.1 to the letter. Unit B, six weeks later, builds FR-32's conflict cascade: "Before the Family engages a Space or Listing, they are shown **by name** every Shortlist entry and every Agreement that this Vendor's Rules would make impermissible." That requires a machine-readable predicate — `(restricted_service, permitted_vendor_set)` — over which the platform computes a set difference against the Family's Shortlist and Agreements.

**Resulting incompatibility.** FR-24's Rule-restricts-a-Service, FR-25's "Where a Rule restricts a Service, the Preferred Vendors are the permitted set", and FR-32's entire warn-and-accept flow are not implementable against A's field, and A had no reason to build anything else. Unit B either adds a second, parallel Rules model — two owners of one concept, drifting the moment a Vendor edits the prose and not the structure — or blocks. This is the most load-bearing unimplementable requirement in the PRD: FR-32's cascade cancels Agreements and moves money in the running budget.

**Tightening.** New AD:

> **AD-27 — Rules are prose plus a declared restriction set; the prose is never parsed.**
> A Listing's Rules carry (a) free text, stored and displayed exactly as written per NFR 5.1, and (b) zero or more structured `Listing Rule` rows, each naming a Service it restricts and the permitted set — by construction the Vendor's accepted Preferred Vendors in that Service (FR-25). Only (b) is ever evaluated by the platform; the prose is never parsed, inferred from, or normalised. A Rule that exists only in prose binds nobody, and the Vendor is told so at publication. FR-24's "the Family can see, before engaging a Space, which Services that Space will close off" reads (b) alone.

Add `LISTING ||--o{ LISTING_RULE` to the ERD, and add "Listing Rule" to the naming conventions.

### H-5 — Selection cardinality and Span grouping are unmodelled, and FR-8's budget arithmetic depends on them

**ADs in play:** AD-6, AD-19, the ERD seed, FR-8, FR-22, FR-68, Glossary.

**Scenario.** The Glossary is precise: "**How many a Service carries follows its Engagement Model directly**: a Span Service carries one Selection per Span — the lawn across the Haldi and the Wedding is one, and a separate hall for the Reception is a second Span and so a second Selection — while a per-Function Service carries one per Function it serves." FR-68 adds that "a Service may be selected for the whole Wedding or for particular Functions."

The ERD models `SHORTLIST ||--o{ SELECTION` and nothing else. A Selection has no stated relationship to Functions. Unit A builds Selection with a child table of the Functions it covers, so a Span Selection carries {Haldi, Wedding} and a second carries {Reception}. Unit B builds Selection 1:1 with Function and represents a Span by flagging one row primary. Both are consistent with the ERD and with every AD.

**Resulting incompatibility.** FR-8's controlling sentence — "**A Span Selection contributes once for the whole Span**, however many Functions it covers — counting a venue's Span price once per Function would post ₹7.2L for a ₹2.4L lawn" — is a direct statement about A's shape. Under B it is a special case someone must remember to write, and the PRD names the exact failure that follows when they do not. AD-19 forbids the *client* doing money arithmetic; it says nothing about the shape the server sums over. Beyond the budget: AD-10's per-Service occupancy set (H-1) needs to know which Functions a Service serves, and the two shapes answer it differently; FR-15's collision report ("which Selection blocks which Candidate Block, **by name**") enumerates different things.

A second, subtler split: is the Function grouping of a Span a property of the Wedding, or of each Candidate Block? Assumption A-1 lets a Family adjust one Candidate Block independently, so the same Span may occupy different day/slot sets in different Blocks. Unit A stores the grouping once on the Selection; unit B stores it per Block. Under A, an adjusted Block silently reuses the wrong Function days.

**Tightening.** Put it in AD-6 or a new AD:

> A `Selection` names the Service, the chosen Listing (and Space where the Service has them), and **the set of Functions it serves**, held as a child table. Its cardinality follows the Engagement Model: one Selection per Span for a Span Service, one per Function otherwise. The running budget sums over Selections, **once each** (FR-8), never over Functions. The Function set is a property of the Selection and is constant across Candidate Blocks; a Block supplies the day and Slot for each Function, never the grouping.

Add `SELECTION ||--o{ SELECTION_FUNCTION` to the ERD.

### H-6 — The ERD hangs Enquiry off Selection; FR-34 requires enquiring from a Shortlist to several Listings at once

**ADs in play:** the ERD seed, FR-22, FR-34, FR-8.

**Scenario.** The spine's core-entities diagram states `SELECTION ||--o{ ENQUIRY : "creator only"`. FR-34 states: "**A Family can send one Enquiry to several Listings in a Service at once** — the Shortlist she is comparing — without composing it repeatedly", and "Each Vendor receives their own thread." FR-22 makes the Shortlist the pre-Selection working set, and UJ-2 has Dattatray receiving an Enquiry before any Agreement exists.

Unit A builds Enquiries against the spine's ERD, as instructed: an Enquiry belongs to a Selection. Unit B builds against FR-34: an Enquiry belongs to a Wedding + Service + Listing, with a shared broadcast identifier so the Lead Dashboard can tell a multi-send from a single one.

**Resulting incompatibility.** Under A, enquiring with five shortlisted caterers requires creating five Selections — and FR-8 says "**A Selection contributes its all-in price once**, automatically, the moment the Family picks it", so the running budget posts five caterers against an ₹8L ceiling. The PRD's very first budget rule ("A Shortlist contributes nothing. Five caterers under comparison are five candidates, not five costs") is broken by following the spine's own diagram. Unit A also has nowhere to put FR-34's required distinction: "The Lead Dashboard distinguishes an Enquiry sent to several Vendors from one sent only to that Vendor… **SM-2's Enquiry-quality counter-measure depends on the distinction being made.**"

**Tightening.** Correct the ERD to `WEDDING ||--o{ ENQUIRY` with a Service and a Listing on the Enquiry, and add the broadcast group:

```
WEDDING ||--o{ ENQUIRY : "creator only"
ENQUIRY_BATCH ||--o{ ENQUIRY : "one compose, N threads"
ENQUIRY }o--|| LISTING : addresses
```

and a sentence: "An Enquiry references a Listing, never a Selection — a Family enquires from a Shortlist, before selecting (FR-22, FR-34). A Selection is a budget fact; an Enquiry is a contact fact; neither implies the other."

### H-7 — The running budget total has no owner, no derived-versus-persisted decision, and six mutators across five epics

**ADs in play:** AD-19, AD-10, the Mutation convention, FR-8, FR-32, FR-40, FR-42, FR-53, FR-17.

**Scenario.** AD-19 fixes the *unit* (Currency, rupees) and the *side* (server, never the client). It says nothing about where the number lives. The spine's Consistency Conventions row is explicit in the other direction: "**Mutation** — Frappe's grain: DocTypes persist computed fields, written in `validate`. UH-8 ('derive on read') is **client-side only**." AD-10, meanwhile, establishes the opposite precedent for the other cross-cutting computed value: "No materialised availability matrix, no cache… the single call site is the check."

Unit A builds the Workspace epic and persists `Wedding.running_total`, recomputed in `Wedding.validate()` per the Mutation convention. Unit B builds Agreements and implements FR-40 ("its agreed figure replaces the estimate in the running budget") by writing a delta from `Agreement.on_submit`, per the same convention. Both obey every AD.

**Resulting incompatibility.** Two writers, no ordering rule. A's next recompute either clobbers B's delta or double-counts it, depending on whether A's recompute reads Agreements. And there are four more legitimate mutators in four more epics: FR-32 (Rule conflict clears a Selection), FR-53 (a lapsed Listing's Selection is cleared), FR-42 (cancellation withdraws), FR-17 (Block change cancels every Agreement). Each will be built by whoever owns that FR, each will reach for the same field, and none of them is wrong under the spine.

Two further unbound decisions in the same area, each of which two units will resolve oppositely:

- **The Family's manual override versus the agreed figure.** FR-8: "She can adjust any figure the platform derived, and can add a cost the platform knows nothing about." FR-40: "its agreed figure **replaces** the estimate in the running budget." She adjusted the venue estimate from ₹2.4L to ₹2.6L to cover something she knows about; the Agreement confirms at ₹2.4L. Unit A overwrites her figure; unit B keeps it and shows a variance. No rule.
- **The per-head basis.** FR-8: "the figure is that price times **the stated guest count** of the Functions it serves." FR-71 (Catering): the platform recommends a headcount, RSVPs refine it, "they adjust or accept it, **and only then does it travel with an Enquiry**." Unit A (budget) multiplies by the stated count; unit B (catering handler) multiplies by the confirmed recommendation. The Workspace and the Enquiry show different money for the same Selection.

**Tightening.** New AD, and follow AD-10's precedent rather than the Mutation convention's:

> **AD-28 — The running budget is derived, in one place, from Selections and Agreements alone.**
> No total is persisted. One server-side function computes the Wedding's running total from its Selections (each contributing once, per its Engagement Model — AD/H-5), the confirmed Agreements that supersede them, and the Family's own manual lines. Every surface calls it; nothing writes a total. A Selection or Agreement changing state is therefore the whole mutation, and the six cascade paths (FR-17, FR-32, FR-40, FR-42, FR-53, FR-69) touch only their own row. **The Family's manual adjustment is a separate stored field that survives a Selection becoming an Agreement**, and where the two differ the difference is shown, never silently resolved (FR-8's "she can adjust any figure"; FR-69's "the divergence is never left unshown"). **The per-head multiplier is the Function's stated guest count** (FR-8); FR-71's recommended headcount is a quantity that travels with an Enquiry and does **not** move the budget until the Family accepts it into a Selection.
>
> This is a deliberate exception to the Mutation convention's "persist computed fields", stated here so an agent does not "correct" it — the same signal AD-3 carries about its missing version segment.

---

## Medium

### M-1 — Two ADs each claim the subscription gate, and the discovery gate has no owner

AD-10: the availability function "applies FR-13's subscription gate: a Listing past its Grace Period **shows no dates at all**." AD-20: "the public read path filters on it… the public read path is one function." FR-53 is stronger than either: after the Grace Period the Listing "is **withdrawn from discovery** — it does not appear in search, comparison or matching, and no new Enquiry can be sent to it."

**Scenario.** Unit A (Discovery) reads AD-20 and filters lapsed Listings out of the result set. Unit B (Availability) reads AD-10 and returns empty availability for them. If only B gates, lapsed Listings appear in search with no dates — visible, comparable, shortlistable — violating FR-53 while obeying AD-10 verbatim. If both gate, the rule is implemented twice and will drift on the next route (a Vendor withdrawal is not a subscription lapse, and AD-10's clause covers only subscriptions).

A third path is gated by neither: FR-53's "no new Enquiry can be sent to it" lives in `api/family/v1/enquiries.py`.

**Tightening.** Move the gate out of AD-10 and give it a single owner in AD-20: "**One function answers `is_publicly_visible(listing)`**, evaluating all four routes of FR-53 plus FR-59/FR-71's conditions, and every read path — search, comparison, matching, Listing detail, enquiry-send — calls it before anything else. AD-10's availability function assumes visibility and does not re-check it." Strike the subscription clause from AD-10.

### M-2 — AD-23's "eleven the PRD requires" is not the complete set, and completeness is the AD's entire value

AD-23's own justification is that "a requirement with a time trigger silently never shipping" is the failure mode, and "a job with no listing is the defect." An incomplete enumeration inverts it: a *requirement* with no listing becomes invisible.

Missing from the eleven:

| Missing trigger | Source | Consequence of omission |
|---|---|---|
| Quarterly reminder of terms and posting rules | FR-63 ("at least once a quarter") | A stated intermediary obligation never ships |
| 180-day retention of removed content, then purge | FR-63 | Retained forever, or purged early |
| Invitation and guest-form **link expiry** on conclusion / abandonment | FR-11, FR-12, UJ-5 | Distinct from guest *contact* erasure, which runs 30 days **after** conclusion; links must die **at** conclusion. Live pages keep collecting numbers |
| Subscription **active → Grace** transition at term end | FR-53 | Reminders and Grace *end* are listed; the transition into Grace is not, so nothing moves the state |
| Eight-year Agreement retention boundary | FR-43 | No purge, no attested end of custody |

And one listed trigger is listed incompletely: "**Wedding conclusion when the Chosen Block's last Function passes**" drops FR-72's second branch — "Where it holds a confirmed Agreement, **that Agreement's own days serve as the anchor**, so no Agreement is ever left without a review window." A unit implementing AD-23 literally leaves every Wedding that reached an Agreement without ever locking a Block permanently in-planning: guest contacts never erased (NFR 5.5), review windows never backstopped (FR-45), Real Wedding never publishable (FR-65).

**Tightening.** Add the five, correct the conclusion entry to carry both anchors, and add a closing sentence: "**This list is complete by construction: an FR carrying a time trigger and absent here is a defect in this AD, not in the FR.**"

### M-3 — AD-4 generates zod from Python annotations, but the response convention makes responses ungeneratable

AD-4: "Every whitelisted method carries full type annotations — Frappe validates them through Pydantic on every request… zod schemas in `packages/shared` are **generated** from it, **never hand-written**." The Consistency Conventions row: "**Response envelope** — return a plain dict and let Frappe wrap it."

**Scenario.** Frappe's Pydantic coercion covers the *arguments*. A method annotated `-> dict` yields nothing to generate from. Unit A annotates responses with `TypedDict`/dataclass returns and generates both directions. Unit B follows the convention literally, returns `dict`, and hand-writes the response zod — which AD-4 explicitly forbids — or ships no response validation at all.

**Resulting incompatibility.** The half of the contract that matters most is the half the phone cannot renegotiate: UH-6's "failing at runtime on a phone that cannot be redeployed" is about response shape drift, not request shape. Under B the mechanism AD-4 exists for does not exist. Under A, generated response schemas and hand-written ones coexist in `packages/shared` with no rule about which wins.

**Tightening.** In AD-4: "**Every whitelisted method annotates its return type as a `TypedDict` or dataclass** — never bare `dict`. The plain-dict convention governs the envelope (never build `{'data': …}` by hand), not the annotation. Both request and response zod are generated; a hand-written zod schema anywhere in `packages/shared` is the defect." Also rename `contract/family.v1.json` to `contract/family/<version>.json` so AD-3's `v2` has somewhere to land without editing `v1`.

### M-4 — AD-16's carve-out excludes the two aggregates the product actually needs, and its failure mode is silence

AD-16: "`frappe.get_all` is for genuine system work — a scheduled job, a migration, **an aggregate no user reads** — and carries a comment saying which. Anything derived from a request uses `frappe.get_list`."

Two required aggregates are read by users and necessarily span other parties' rows:

- **FR-57**: a Vendor's comparison against "aggregates for their Service in their Place — response time, conversion, enquiry volume", suppressed below five active Vendors.
- **FR-20**: the shrunk rating's prior — "the average for that Service in that Place", with a three-level fallback — read by every Family on every search.

**Scenario.** Unit A obeys AD-16 literally, uses `frappe.get_list` because the call is request-derived, and gets back only rows the caller may see — for FR-57, the Vendor's own. The dashboard then compares Dattatray against Dattatray. AD-16 names this exact failure ("with no error and no empty result to notice") and its own carve-out wording causes it. Unit B uses `get_all` behind the five-vendor floor. Both are defensible readings.

Note also that the five-vendor floor appears in the spine **only in AD-2's prose, as a justification for why clients cannot call raw documents** — it is nowhere stated as a rule anybody must implement.

**Tightening.** Extend AD-16's carve-out and promote the floor:

> `get_all` is also correct for a **k-anonymous aggregate**: a computation over rows the caller may not see individually, returned only in aggregate form. Every such aggregate names its minimum cohort in code and returns nothing below it. **FR-57's comparison is suppressed below five active Vendors in that Service and Place; FR-20's rating prior falls back Service×Place → Service → platform → no prior.** An aggregate over `get_list` results is the defect, because it silently returns the caller's own rows.

### M-5 — The review window has three openers on two sides of the marketplace and no stated owner

FR-45 gives three opening triggers — the Vendor marks delivered; the Agreement's frozen delivery timeline passes; one year after the Wedding's last day — "whichever comes first", plus a 14-day close (FR-48). AD-23 lists them as jobs. AD-12 freezes the governing timeline into the Agreement. Nothing says whether the window is a **stored** pair of dates or a **derived** function.

**Scenario.** Unit A (Reviews) computes `window_opens_on` at confirmation from the frozen timeline and stores it; a nightly job flips `published` at close. Unit B (Vendor portal) implements "the Vendor marks the work delivered" by writing `delivered_on` and opening the window immediately. Both obey AD-12, AD-23 and FR-45.

**Resulting incompatibility.** Two writers to one window. If B's early delivery lands after A's job already opened the window on the timeline, does the 14-day close move earlier, later, or not at all? FR-48 says "the window is fourteen days from opening" and "nothing can be written on the fifteenth day" — with two openings there are two fifteenth days. And the one-year ceiling's anchor is the Wedding's last day, whose definition is itself two-branched (FR-72; see M-2) and which **moves** when the Family changes the Chosen Block under FR-17.

**Tightening.** In AD-23 or a new AD: "The review window is **derived, not stored**: `opens_at = min(delivered_at, agreement_timeline_end, wedding_last_day + 365d)`, `closes_at = opens_at + 14d`, evaluated by one function. `delivered_at` is the only writable input; the other two are frozen at confirmation (AD-12) and do not move when the Wedding's Chosen Block changes. A stored `window_opens_on` is the defect." Freezing `wedding_last_day` into the Agreement at confirmation is also what stops FR-17's Block change from retroactively reopening or closing windows on Agreements it cancelled.

### M-6 — Preferred Vendor is absent from the model, and the permitted set has no evaluation time

FR-25 is a bidirectional, accepted, Service-scoped edge that may point at the same business ("A Vendor may name their own Listing in another Service… Where a Preferred Vendor is the same business, it is shown as the same business"). The ERD carries no such entity, and no AD names one.

**Scenario one — shape.** Unit A models it as a child table on `Listing` linking to `Listing`. Unit B models it as a standalone Vendor→Vendor DocType with a Service. FR-24's permitted set, FR-25's post-engagement surfacing and FR-32's conflict computation all read it, from different epics. FR-46 rates a Vendor **per Listing**, which argues for A; FR-25 says "a Vendor may name Preferred **Vendors**", which argues for B. Acceptance state lives on the edge and is written by the *other* party — whose row is it?

**Scenario two — evaluation time.** A Family engages the venue in week 1. In week 30 the venue's preferred caterer withdraws acceptance. Unit A evaluates the permitted set live: the Family's already-confirmed catering Agreement is now impermissible and FR-32's cascade fires retroactively — cancelling an Agreement nobody touched. Unit B freezes the permitted set at engagement, per AD-12's freeze of "the Rules that apply" (FR-39). FR-32's own framing supports B ("the only honest place to raise it is the moment the venue is engaged"), but AD-12 never says the frozen Rules are the *enforcement basis for later choices*, and FR-24 is written in the present tense.

**Tightening.** Add `PREFERRED_VENDOR` to the ERD as `LISTING }o--o{ LISTING` with `service`, `accepted_at`, `accepted_by` and a `same_business` flag derived from the Vendor link. Then, in AD-27 (H-4) or AD-12: "**The permitted set is frozen into the Wedding at the moment of engagement.** A later change to a Vendor's Preferred list governs future choices only and never invalidates a choice already made. FR-32's cascade fires at engagement and at no other time."

### M-7 — Which day of a multi-day Block sets the seasonal price

FR-30 lets a Vendor price arbitrary periods; FR-26 and FR-30 both promise "the Family always sees the price applicable to **their own Block**". A Candidate Block spanning 29 October to 1 November can straddle a season boundary.

**Scenario.** Unit A (Discovery) prices from the first Function's day. Unit B (Workspace/budget) prices from the day the Span starts, or takes the maximum across the days, or prorates. All are defensible; AD-19 constrains only the unit and the side. The Family sees one price on the search screen and a different total in the Workspace — on the one number the product asks her to trust, against the one ceiling it asks her to plan within.

**Tightening.** One sentence in AD-19: "**Seasonal pricing (FR-30) resolves against the first day the Service is engaged for** — the first day of a Span, or the Function's day for a per-Function Service — evaluated once by the same function every surface calls. A Block that straddles a pricing boundary takes the price of its first engaged day; the platform never prorates, never maximises, and never shows two prices for one Selection."

### M-8 — AD-22's seed has no stated home, and "a new search" is undefined

AD-22: "a tie-break shuffle **seeded once when a Family opens a Service's results, held for that browsing session, and re-seeded on a new search.**"

**Scenario one.** Unit A holds the seed server-side keyed by user+Service. Unit B has the mobile client generate it and pass it as a request parameter. Under AD-4 the parameter is part of the frozen `api/family/v1` contract (AD-3) — so getting it wrong is a `v2` and a phone release, on the client the whole versioning scheme exists to protect. AD-22 does not decide it.

**Scenario two.** "A new search" is undefined. Unit A re-seeds on any filter change; a Family toggling "verified only" mid-scroll gets a reshuffled list — the exact failure AD-22 exists to prevent, restated in its own Prevents line. Unit B re-seeds only on a new text query, so a Family who changes Service inherits a stale seed.

Also unspecified: signal 1 (availability) when the Family has supplied no Anchor Date (FR-13) or the Service has no calendar — a tie across the whole result set, which hands the entire ordering to the shrunk rating, whose prior may not exist either at launch (FR-20's three-level fallback). At cold start in one town, AD-22's ordering may be undefined at every level and the seed is doing all the work.

**Tightening.** Decide both in AD-22: the seed is **a request parameter minted by the server on the first page and echoed by the client** (so it is in the contract deliberately, and pagination is stateless); and "**a new search** means a change of Service or of the free-text query — a filter or sort change is the same search and keeps the seed." Add: "Where availability is not a signal (no Anchor Date, or a no-duration Service), ordering proceeds from the next signal; where no rating prior exists, the seeded shuffle is the ordering, and that is intended at cold start."

### M-9 — `Slot Block` has two parents and two origins, and release-on-cancel deletes rows the Vendor wanted

AD-10: "Only blocking facts are stored — **vendor-declared Slot blocks and Agreement-derived blocks**." AD-11: a `UNIQUE` index on `(space_or_listing, day, slot)` **over blocking rows**. The ERD gives `SLOT_BLOCK` two parents: `SPACE ||--o{ SLOT_BLOCK` and `AGREEMENT ||--o{ SLOT_BLOCK`. FR-28 adds a third axis: availability is per Space where a Service has Spaces and per **Listing** where it does not.

**Scenario one — the link shape.** Unit A models `space_or_listing` as a Dynamic Link (`link_doctype` + `link_name`); unit B as two nullable Link columns. B cannot carry AD-11's single `UNIQUE` index as stated; A can. Cross-epic reads break.

**Scenario two — origin.** Dattatray blocks 27-evening for a family function (FR-28: "for any reason, without stating one"). The row exists. A Family's Agreement confirmation for 27-evening then fails on the constraint — correct. Reverse the order: the Agreement's row exists first, and Dattatray's manual block fails — a Vendor cannot annotate his own calendar, with no rule saying what he should see. Now cancel the Agreement: FR-42 releases "those Slots". Unit A deletes by `(day, slot)`; unit B deletes only rows whose origin is that Agreement. If the Vendor had also wanted the Slot blocked, A un-blocks it and the platform advertises a Vendor as free on a day he told it he was not.

**Tightening.** In AD-11: "A blocking row carries its **origin** — `VENDOR_DECLARED` or `AGREEMENT`, with the Agreement chain where applicable — and its subject as a single Dynamic Link (`Space` where the Service has Spaces, `Listing` otherwise). The `UNIQUE` index spans `(subject_doctype, subject_name, day, slot)` regardless of origin, so one Slot is blocked once and by one fact. **Release deletes only rows of the releasing origin**, and where a Vendor's manual block is refused because an Agreement holds the Slot, he is told which engagement holds it (the same message FR-39 already requires)."

### M-10 — AD-15 mandates hook pairs but, unlike AD-23, enumerates nothing

AD-23's strength is that it names all eleven jobs and says "a job with no listing is the defect." AD-15 has the identical failure mode and no list: "Any DocType needing a runtime rule registers both." Everything reachable from a Wedding needs one — Function, Candidate Block, Selection, Shortlist, Enquiry, Quote, Agreement, Agreement Record, Guest, Board, Review, Site Visit — plus the Vendor-scoped set (Listing, Space, Slot Block, Subscription, Lead Dashboard reads).

**Scenario.** Unit A registers the pair on the six DocTypes its epic touches. Unit B adds `Quote` four weeks later and registers neither, because `Quote` is only ever read through an Enquiry — until FR-55's dashboard reads Quotes directly. `audit_permissions.py` (tier 2, once wired) can detect a **half** pair; it cannot detect a **missing** pair, because a DocType with no runtime rule is legitimate.

**Tightening.** Add the enumeration to AD-15 with AD-23's closing sentence: "The DocTypes requiring a hook pair are enumerated here; one absent from this list and lacking a pair is a defect in this AD, not in the DocType. Everything reachable from a `Wedding` through `Wedding Member` is on it by construction."

### M-11 — The AD-15 / AD-18 boundary is stated by example only, and one reading breaks FR-6

AD-15 owns list/document access; AD-18 owns "action rules the framework has no home for", illustrated with FR-6's Creator-only set. The boundary is a set of examples, not a rule.

**Scenario.** "Only the Creator may confirm an Agreement" is legitimately readable as a *document* rule about an Agreement. Unit A puts it in `has_permission` on `Agreement`. A naive implementation returns `False` for a non-Creator regardless of `ptype` — and FR-6 explicitly grants Invited Members visibility of "Enquiry statuses" and, through the Workspace, the wedding's committed state. Invited Members lose read access to Agreements they are entitled to see. Unit B puts it in the guard, per AD-18, and reads correctly.

AD-15 already carries the right principle — "`has_permission` cannot grant — it can only decline to deny" — but not the ptype discipline that follows from it.

**Tightening.** In AD-15: "**A hook decides per `ptype` and never returns a single verdict for all of them.** `has_permission` receiving `read` answers only the read question." And in AD-18: "The split is: **who may act** (Creator-only, self-dealing bar, Vendor owns this Listing) is a guard in `api/`; **who may see** is the AD-15 hook pair; **what states may exist** is the controller (AD-18 / C-3). A rule in the wrong one of the three is the defect."

### M-12 — The cancellation count's attribution is stated for FR-69 and left open for FR-32 and FR-60

AD-13 closes the amendment case precisely: "FR-69 amendments write nothing to it." Two other cases are open.

- **FR-60.** A fraud Vendor is removed; the Family ends the Agreement. FR-60: "**that cancellation is not counted against them** — they did nothing." Silent on the Vendor's side. Unit A counts it against the Vendor (he caused it); unit B counts it against neither (the Family cancelled, and counting it against a party who did not act is what FR-60 just forbade in the other direction). Two vendors' profiles carry different numbers for the same event class, on a number FR-42 displays publicly as a rolling 24-month count.
- **FR-32.** A Rule conflict cancels an Agreement. FR-32 says "cancelled under FR-42 — recorded on both profiles". So both. But the Vendor being counted here did nothing at all — the Family engaged a venue whose Rule excluded him. FR-17's parallel case is explicitly reasoned as blameless-but-counted; FR-32's is not reasoned at all.

**Tightening.** Make AD-13 exhaustive rather than exemplary: "The count is written by exactly these events, and by no others: FR-42 (either party cancels), FR-17 (Chosen Block change — both profiles, blameless), FR-32 (Rule conflict — both profiles, blameless), FR-72 (abandonment — both profiles). It is **not** written by FR-69 (amendment) or FR-60 (removal — neither party, since the Vendor is off the platform and the Family did nothing). An event not on this list writing to the count is the defect."

---

## Low

- **L-1 — The Guest's NFR 5.5 rights have no channel AD-21 permits.** NFR 5.5: "Every person whose data is held can see it and correct it, **including people who never held an account**." AD-21 makes it impossible for the platform to address a Guest at all. Unit A builds a token-addressed guest self-service page (no outbound message — compliant); unit B routes it through the grievance officer as a human process. Both obey AD-21; the Family-facing product differs. Worth one sentence in AD-21 naming the intended route.

- **L-2 — `contract/family.v1.json` does not survive AD-3's `v2`.** AD-4 names one file; AD-3 guarantees a second namespace will exist. Path it as `contract/family/v1.json` now, before the generator is built.

- **L-3 — `PERSON` is in the ERD but not in the DocType conventions.** AD-14 turns on a single identity record; the Consistency Conventions table has an Identifiers row ("Frappe `name` is the identifier everywhere") but never names the Person DocType or its relation to Frappe's own `User`. Two units will pick differently (extend `User`; a separate `Person` linked to `User`; `Contact`). Given AD-14 is the whole erasure design, the choice deserves a line.

- **L-4 — AD-20's two independent portfolio gates need a stated evaluation order for the Tier-change case.** "Verified **and** within the Tier's allowance — two independent gates, neither implying the other, and a Listing over its allowance keeps every image." FR-27 adds "publishes **up to** the allowance". Which images? Unit A takes the oldest; unit B the Vendor's chosen order; unit C the most recently verified. FR-58 adds that images newly published by a Tier *upgrade* need re-verification. One sentence: "the Vendor orders their portfolio; the allowance takes the first N of that order among verified images."

---

## What is already closed, and closed well

Recorded so the tightenings above are not read as a verdict on the whole:

- **AD-11** is the right shape for FR-39 — a database constraint rather than a Python check — and C-1 is a gap in what rides on it, not in the choice.
- **AD-9** removes an entire bug class (timezones, DST, midnight-crossing Spans) by refusing timestamps for the wedding, and explicitly quarantines the display-time field so it cannot leak into matching.
- **AD-13** is a genuinely non-obvious catch: Frappe's cancel-then-amend would otherwise have recorded every cooperative Amendment as a walk-out on both profiles, permanently and visibly.
- **AD-21** makes FR-12's constraint a type error rather than a convention — the strongest enforcement tier in the document, applied to the risk that could take down the vendor side of the product.
- **AD-5's "Accepted cost"** paragraph and the **Conflicts to resolve upstream** table are the right pattern for every tightening proposed above: state the cost, name the amendment the PRD needs, do not resolve it silently. C-4 asks for exactly that treatment for a second FR-62 conflict the table currently misses.

## Summary of proposed changes

| # | Severity | Change |
|---|---|---|
| C-1 | Critical | AD-12: an Amendment holds its blocking rows across the cancel-then-amend transition; enumerate every suppressed side effect |
| C-2 | Critical | New **AD-26**: `domain/` layer for cross-cutting operations, with the six enumerated; tighten AD-5's scope |
| C-3 | Critical | AD-18 + AD-5 + AD-1: state invariants live in the controller or the database, never only in an `api/` guard; record the Desk-bypass cost in AD-1 |
| C-4 | Critical | AD-6/AD-8: split indexed from descriptive Service attributes; add the FR-62 conflict row and the PRD amendment |
| H-1 | High | AD-10: occupancy set is per-Service; AD-11: a Span expands to the continuous closure, with the worked example |
| H-2 | High | AD-10: five-state availability return, fixed before `api/family/v1` ships |
| H-3 | High | AD-12/AD-14: parties by reference; identity in an `Agreement Party Attestation` outside the digest |
| H-4 | High | New **AD-27**: Rules are prose plus a structured restriction set; the prose is never parsed |
| H-5 | High | Selection carries its Function set; cardinality follows the Engagement Model; ERD updated |
| H-6 | High | ERD: Enquiry hangs off Wedding + Listing, not Selection; add the batch entity |
| H-7 | High | New **AD-28**: the running budget is derived, never persisted; manual adjustment survives; per-head basis fixed |
| M-1 | Medium | One `is_publicly_visible()` owner in AD-20; strike the subscription clause from AD-10 |
| M-2 | Medium | AD-23: add five missing triggers, correct the conclusion anchor, add the completeness clause |
| M-3 | Medium | AD-4: annotate return types; generate response zod; path the contract file for `v2` |
| M-4 | Medium | AD-16: k-anonymous aggregate carve-out; promote FR-57's five-vendor floor to a rule |
| M-5 | Medium | Review window derived from three frozen inputs, not stored |
| M-6 | Medium | Preferred Vendor in the ERD; permitted set frozen at engagement |
| M-7 | Medium | AD-19: seasonal price resolves against the first engaged day |
| M-8 | Medium | AD-22: seed is a server-minted request parameter; define "a new search" |
| M-9 | Medium | AD-11: blocking rows carry origin and a Dynamic Link subject; release by origin |
| M-10 | Medium | AD-15: enumerate the DocTypes requiring hook pairs |
| M-11 | Medium | AD-15/AD-18: per-`ptype` verdicts; state the three-way split as a rule |
| M-12 | Medium | AD-13: make the count's writer list exhaustive |
| L-1..L-4 | Low | Guest rights channel; contract path; `PERSON` DocType convention; portfolio allowance ordering |
