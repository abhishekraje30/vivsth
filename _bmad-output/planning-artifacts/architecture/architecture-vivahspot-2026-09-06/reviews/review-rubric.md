# Rubric review — ARCHITECTURE-SPINE.md

- **Target:** `_bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md` (draft, 2026-09-06)
- **Reviewed against:** the good-spine checklist (items 1–7), `prd.md` (FR-1..FR-72, NFR 5.1..5.10, §3 Glossary, §7.9), `CLAUDE.md`, `DEFERRED.md`, `coding-standards.md`, and the monorepo on disk.
- **Verdict: FAIL.** Not for what it says — most of what it says is good, and several ADs (AD-9, AD-15, AD-16, AD-20, AD-23, AD-24) are exactly the kind of non-obvious invariant this altitude exists to fix. It fails on item 1 and item 6: three of the highest-traffic divergence points below it are absent (authentication and session, the Engagement Model, the discoverability predicate), and four whole dimensions the initiative altitude owns are silent with no Deferred entry (auth, migrations/fixtures, media storage, async work and idempotency). A spine is judged by what two units could still choose incompatibly after reading it, and here they could choose the login mechanism.

Findings are ordered by severity, not by checklist item. The checklist walk is in §B.

---

## A. Findings

### A-1 · CRITICAL — Authentication and session is a whole dimension left silent (item 1, item 6)

The word "auth" appears three times in the spine; every occurrence is "author" or "authority". `session` appears once, meaning "browsing session" in AD-22. `OTP` appears once, in the unpinned-dependency list. `login` appears zero times.

FR-1 is one of the densest FRs in the PRD and every clause of it is a cross-unit decision:

- four sign-in routes (mobile + OTP, passkey, Google, Apple), with Apple mandatory on iOS;
- a six-digit code, ten-minute validity, five attempts, three resends per hour on a number;
- **ninety-day sessions** with biometric re-entry;
- one person = one account = the mobile number, with linking gated on a challenge to the existing number;
- the same mechanism for Families, Vendors *and* Admin — "There is not a separate sign-in system per surface."

`CLAUDE.md` §5 already flags the hardest part: *"Phone + OTP via MSG91 is a custom Frappe login flow. Frappe has no phone auth built in, so there is no framework default to lean on."* That is the definition of a spine-level invariant — a dimension with no framework default, three clients, and no way to converge by accident.

Unfixed and therefore free for each unit to choose: the Frappe auth mechanism per client (API key/secret pair vs `sid` session cookie vs OAuth2+PKCE — the `frappe-api` skill lists all three); how a 90-day session is represented when Frappe's default `session_expiry` is 06:00 hours; whether the mobile app holds a long-lived token or a refresh pair; whether CSRF applies (AD-18 mentions CSRF in one clause and never says which clients are exposed to it); how `allow_guest` guest-token requests authenticate at all; where OTP rate limits live (Frappe's `@rate_limit` vs a custom counter); and what `User.name` is set to — which is not cosmetic, see A-6.

This is the single largest gap. Everything in 4.1 and every `permission_query_conditions` hook in AD-15 sits downstream of it.

**Fix:** one AD fixing the auth mechanism per client and the session representation, one convention row for OTP issuance limits, and an explicit statement of what `User.name` is.

### A-2 · CRITICAL — AD-9/AD-10/AD-11 model two of FR-14's five Engagement Models; FR-14 is never cited (item 1, item 5)

`FR-14` does not appear anywhere in the spine, and neither does the Glossary term **Engagement Model** (the string "Engagement" appears twice, both times as "which engagement conflicts" / "engagement records").

FR-14 and the §3 Glossary declare five Engagement Models per Service: **Span**, **per Function**, **rental period**, **lead time**, **no duration**. FR-14 adds a warning aimed squarely at this failure: *"Engagement model and calendar are separate questions… An agent must not infer 'no calendar' from 'no duration'."*

The date/availability triad only covers two of them:

- **AD-9** — "Matching, blocking and Agreements read **only** those two [`DATE` + `Slot`]." A **rental period** *"need not align with any Function"*, so it needs its own start and end. AD-9 forbids the field it requires.
- **AD-10** — "Availability is a `NOT EXISTS` over the Candidate Block's `(day, slot)` occupancy set." A **lead-time** Service's question is *"whether the Vendor can deliver by a date rather than whether they are free on one"* — a `NOT EXISTS` over slot occupancy answers the wrong question, and it answers `available` for a printer who is at capacity. For a **no-duration** Service, FR-28 says availability *"reduces to whether the Vendor is currently accepting Enquiries"*; AD-10 has no branch for it.
- **AD-11** — "one constraint covers Span and per-Function alike." It says so explicitly, and those are exactly the two models it covers. Applied to a lead-time or crew-bandwidth Service the `UNIQUE` index is actively wrong: it caps a photographer with three crews at one engagement per Slot, which no FR asks for.

This is the calculation the product exists to get right (AD-9's own words) and the spine fixes it for 40% of the catalog. Two epics — "venue availability" and "printer availability" — will now diverge structurally, which is precisely what item 1 asks about.

**Fix:** AD-9/AD-10/AD-11 need an explicit Engagement-Model dispatch: which of the five participate in `(day, slot)` occupancy, which carry a period, which carry a capacity, and which have no calendar. Naming FR-14 in the Binds of all three is the minimum.

### A-3 · CRITICAL — AD-8's configurable list contradicts FR-62's configurable list, and AD-8 exists to prevent exactly that (item 2, item 5)

AD-8's stated **Prevents** is *"AD-5 being read as licence to hard-code everything per Service."* Its Rule then enumerates four configurables: per-Service filters and comparison attributes; Subscription price per Service × Place × Tier; portfolio allowance per Tier; opening a new Place.

FR-62 enumerates more, normatively:

> Admin can define a new Service — its taxonomy, **fields, filters, comparison attributes, Sizing Attribute, Order Basis, Engagement Model and pricing model** — without a code release.

**Engagement Model, Sizing Attribute, Order Basis, pricing model and fields are all missing from AD-8.** All five are §3 Glossary terms declared *per Service*. The Glossary also declares *"Whether a Service has Spaces at all is configured per Service"* — also missing.

Under AD-5 ("no Service-specific branch appears anywhere else"), anything not on AD-8's list lands in `services/<service>/handler.py` — i.e. code. So AD-8's Rule does not prevent the thing AD-8's Prevents names; it licenses it for five of the nine axes FR-62 lists. A unit reading AD-5 + AD-8 together will hard-code the Engagement Model per handler, which FR-14 forbids in terms: *"Admin sets this when configuring the Service. **It is not hard-coded per Service anywhere.**"*

Note also that AD-5's Binds says "availability, pricing, sizing, order basis" — lowercase paraphrases of the Glossary's **Sizing Attribute** and **Order Basis**, and silently dropping **Engagement Model**. AD-24 makes the Glossary binding on "every DocType name, every field name, every zod schema, every UI string"; the spine breaks its own AD-24 in AD-5's Binds line.

**Fix:** AD-8's list must be the FR-62 list, or the Conflicts table must record which FR-62 items the spine is deliberately overriding. As drafted it does neither — the Conflicts row covers only the behaviour-vs-configuration framing, not the five named axes.

### A-4 · HIGH — The Conflicts table understates AD-5+AD-6 vs FR-62, because AD-6 is the harder half

The recorded conflict is "AD-5 vs FR-62 / UJ-4 — holds for configuration, not behaviour." But **AD-6** requires each Service to add *"one detail DocType, 1:1 with Listing, whose fields are real indexed columns."* A DocType with real columns is a schema artefact, a `bench migrate`, and a deploy — not configuration, and not behaviour either. FR-62's test is *"adding the fiftieth Service is the same act as adding the sixth"*; under AD-5 + AD-6 it is a handler module **plus** a DocType **plus** a migration.

AD-6 is defensible on its merits (the 50-way-union argument is real). What is not defensible is that the conflicts ledger names only half of the conflict, so the PRD amendment it calls for will be written too narrow.

**Fix:** extend the Conflicts row to name AD-6 and the schema half of the cost.

### A-5 · HIGH — FR-53's four routes out of discovery are split across AD-10 and AD-20, and FR-53 requires they behave identically

FR-53 is explicit:

> **Leaving discovery — all four routes, and they behave identically for Families.** A Subscription lapsing past its Grace Period; the Vendor withdrawing it themselves (FR-70); Admin removing the Vendor (FR-60); and a condition of listing ceasing to be satisfied (FR-59, FR-71). In every case: the Listing stops appearing and accepts no new Enquiry; existing Agreements, open threads and review windows are untouched; and every Family holding it on a Shortlist or as a Selection is told, with the Selection cleared and the budget adjusted.

The spine models this in two disconnected places: AD-10 puts the **subscription/Grace Period** gate inside the availability function; AD-20 puts the **verification** gate in "the public read path is one function". FR-70 (vendor withdrawal), FR-60 (Admin removal) and FR-59/FR-71 (conditions of listing) are named nowhere.

There is no AD saying these are one predicate. Two units will implement four routes in at least two places, and FR-53's "identically" will fail on the third route someone adds.

**Fix:** one AD — a single `is_discoverable(listing)` predicate with all four routes as inputs — and fold AD-10's subscription clause and AD-20's verification clause into it rather than stating them separately.

### A-6 · HIGH — AD-14's rule does not reach Frappe's own identity trail

AD-14's Rule: *"No record copies a person's name or number; every record references one person record."* Its Prevents: *"identifying details copied across records so that erasure has to find every table, and one missed table is an undiscovered leak."*

Frappe stamps `owner` and `modified_by` on **every row of every DocType**, and populates `Version`, `Comment`, `Activity Log`, `Communication`, `Email Queue`, `Access Log` and `Route History` with the same value. That value is `User.name`. FR-1 says *"the mobile number is the identity."* If `User.name` is the phone number — the obvious reading, and the one a unit will pick absent a rule — then the identifying detail **is** copied across every table in the database, and AD-14's rule as written declares the problem solved while the leak is systemic.

This also interacts with A-1: what `User.name` is set to is an auth-layer decision the spine never makes.

**Fix:** state that `User.name` is an opaque non-identifying id, that the phone lives only on the person record, and name the Frappe-owned tables that erasure must sweep (or explicitly scope them out with a reason).

### A-7 · HIGH — AD-12's Rule does not prevent what AD-12's Prevents claims (item 2)

- **Prevents:** *"anyone, **Admin included**, altering confirmed terms."*
- **Rule enforcement:** *"no update path in code; review (tier 3)."*

But AD-1 establishes that **Frappe Desk sits directly on the DocTypes and is not a client of `api/`**, and FR-4/FR-61 give every Admin every capability. "No update path in code" therefore governs `api/` and `services/` and leaves the Desk path — the one Admin actually uses — wide open. A System Manager can edit `Agreement Record` in Desk, or reach it with `frappe.db.set_value`, which AD-16 itself notes "sits below the permission layer entirely."

FR-43 is unambiguous: *"Neither party, nor Admin, can alter an Agreement after the fact."* FR-61 repeats it: *"Admin cannot alter a confirmed Agreement, edit or suppress a Review, or erase an audit record."*

The gap is closable but needs stating: `Agreement Record` with no write permission at any permlevel for any role, plus an `on_update`/`before_save` throw so `db_set` and Desk both fail, plus `Agreement` relying on Frappe's submitted-docstatus protection with `allow_on_submit` off on every terms field.

**Fix:** replace "no update path in code" with the mechanism. As drafted this is the spine's weakest enforcement claim on its most evidential requirement.

### A-8 · HIGH — Agreement identity across an Amendment is left undecided, and the spine implies both answers

FR-69: *"The original is never altered. The Amendment is appended to **the same Agreement's** history."* Frappe's amend flow does the opposite — it cancels the document and creates a **new** document with a new `name` and `amended_from`.

- AD-12 says *"an Amendment appends `seq+1`"* (same Agreement, new snapshot row).
- AD-13 says *"Frappe's amendment flow is cancel-then-amend, so `docstatus` 2 means 'amended' as often as it means 'cancelled'"* — which only makes sense if the framework flow is being used, i.e. a new document.

Both readings are on the page. Everything hanging off Agreement identity forks on the answer: the Enquiry→Agreement link, review gating (FR-40 "sole gate"), the running-budget replacement (FR-8), the Slot blocks (AD-11), and the certificate in FR-43. This is a textbook item-1 divergence — two epics will pick different answers and both will cite the spine.

**Fix:** decide it. Either the framework flow is used and `Agreement` identity is the amendment chain root, or amendments are `Agreement Record` rows on a never-amended parent and AD-13's `docstatus 2` reasoning needs rewriting.

### A-9 · HIGH — Four dimensions the altitude owns are silent with no Deferred entry (item 6)

Zero occurrences in the spine: `observab*`, `monitor*`, `idempot*`, `offline`, `enqueue`, `background`, `queue`, `webhook`, `accessib*`, `WCAG`. `migrat*` appears twice, neither about migrations. `upload` appears once, in AD-20's prose.

The Deferred section handles the operational envelope honestly *for hosting* — "Backend hosting is undecided… Choose before the first deploy, not by it" is a good entry, and it correctly hangs CI, NFR 5.4 sizing, FR-43 retention/backup and TLS/secrets/patching off it. That covers roughly half of item 6. The other half is missing:

1. **Migrations and fixtures.** Nothing says how DocTypes, roles, permission rules, the Service catalog, the Place hierarchy and custom indexes move between environments. This is not academic: **AD-11's composite `UNIQUE (space_or_listing, day, slot)` cannot be expressed in `doctype.json`** — Frappe's `unique: 1` is single-field — so it requires a patch or a `after_migrate` hook. The spine's tier-1 enforcement claim depends on a mechanism the spine never provides a home for.
2. **Media and file storage.** `CLAUDE.md` §5 is a standing rule — *"User media goes to R2/S3 + CDN, never Frappe's file store"* — and the spine demotes it to a parenthetical in the unpinned list ("object storage + CDN for user media"). No AD, no convention row. Left open: the upload path (direct-to-bucket presigned vs through Frappe), public vs signed URLs, and, sharply, **AD-20's per-item verification gate**. AD-20 says "the public read path filters on it" — but if portfolio images live at stable public CDN URLs, an unverified image is still fetchable by anyone who has the URL, and the gate filters the listing page only. That is a real hole in the trust spine.
3. **Async work and idempotency.** Nothing says whether outbound WhatsApp/SMS (AD-21), Razorpay webhook handling (FR-52), and the FR-53/FR-17/FR-32 cascades run inline or via `frappe.enqueue`, nor what happens on retry. NFR 5.3 says *"Work in progress survives a lost connection"* — so client writes will be retried, and no idempotency convention exists to stop a retried confirm creating two Agreements or a retried Enquiry double-notifying. AD-11's `UNIQUE` index accidentally covers one case; nothing covers the rest.
4. **Observability.** The Conventions table's Logging row is `frappe.log_error` and an audit statement. There is no error-reporting, metrics or alerting decision for any of the four surfaces, and NFR 5.4 ("sized for peak muhurat load", "Vendor-facing surfaces stay available during peak") cannot be met by something nobody is watching. Not decided, not deferred, not an open question.

Two more, lower but also unclaimed: **NFR 5.8 (WCAG 2.1 AA on every surface including the two public pages)** appears nowhere, and the "Not decided here" list delegates "UX, screens and component structure" to `bmad-ux` without naming accessibility — so no artefact owns it. And **NFR 5.5's access-and-correction right for people who never held an account** has no surface anywhere; AD-14 covers erasure only.

**Fix:** four short Deferred entries at minimum. Migrations and media probably deserve ADs — both are true cold-start decisions that get expensive to reverse.

### A-10 · HIGH — The Place hierarchy has no representation decision (item 1)

FR-33 makes Places a hierarchy (village/town → tehsil → district → state → country), lets a Vendor declare coverage *at any level*, and requires that a Family sees *"the Vendors whose declared area **covers** that Place, at any level of the hierarchy."* That is an ancestor-containment query on the hot search path, and FR-33 closes with *"Nothing in the platform assumes a single city."*

The spine mentions Place six times and never fixes its shape. There is no `PLACE` entity in the ER diagram at all. Nested set (`is_tree` / NestedSet, `lft`/`rgt`) versus adjacency list versus materialised path is exactly a "two units choose incompatibly" decision — it determines the coverage query, the indexes, and whether AD-8's "opening a new Place at any level" is cheap or a tree rebuild. `frappe-doctype` owns the *mechanics* of NestedSet; the *choice* is the spine's.

**Fix:** one line in Conventions or the ER diagram naming the representation.

### A-11 · MEDIUM-HIGH — The engagement cascade is described by five FRs and owned by no AD

FR-32, FR-17, FR-42, FR-53 and FR-69 all describe the same fan-out with the same required properties: clear the Selection, withdraw its budget contribution, release Slots, tell the Family, never silently. FR-32 adds a transactional twist — *"Nothing is removed until the engagement actually completes… If confirmation fails for any reason FR-39 allows… the Family's Shortlist, Selections and existing Agreements are exactly as they were"* — so the cascade is authorised in advance and fires only if the AD-11 race is won.

Five FRs describing one mechanism, with a commit boundary tied to another AD, is the shape of a spine invariant. Nothing in the spine names it, so each of the five will be built where its epic happens to land.

**Fix:** an AD naming one cascade seam (a domain-event or a single `apply_engagement_consequences` call) invoked from exactly one place — the successful confirmation — and stating that it is transactional with it.

### A-12 · MEDIUM-HIGH — Two enforcement-tier claims are wrong, and they are the only two claiming automation

The spine's preamble promises honesty: *"`unenforced` is stated honestly, not hidden."* It mostly delivers — AD-1, AD-4, AD-7, AD-24 and AD-25 all say plainly that the gate does not exist. Two do not:

- **AD-21 — "Enforced by: type checking at the boundary (tier 1)."** Tier 1 in `coding-standards.md` §4 is an *edit-time hook*. No Python type checker runs anywhere: `DEFERRED.md` D-6 says *"Backend has no gate at all"* and the spine's own Deferred section repeats it. A Python annotation is not checked at runtime, and Frappe's pydantic coercion applies to **whitelisted method arguments only**, not to an internal messaging function. So AD-21 is tier 3 today, stated as tier 1. Worse, the *rule* is under-specified: if the function takes a phone-number string, nothing stops `send(guest.phone, …)`. The rule only bites if the parameter is a `User` reference that a Guest record cannot produce — say so.
- **AD-11 — "Enforced by: the database (tier 1 by construction)."** A database constraint is genuinely strong, but it is not tier 1 in this ladder's sense, and calling it that sends a reader looking for an edit-time hook. It also has a prerequisite the spine never provides (A-9.1) and an ambiguity (A-13).

**Fix:** AD-21 → tier 3 with the type stated; AD-11 → "the database (runtime, outside the ladder)".

### A-13 · MEDIUM-HIGH — AD-11's constraint has two under-specified halves that will be resolved differently

1. **`space_or_listing` is a polymorphic column.** FR-28: *"Availability is held per Space where the Service has Spaces, and per Listing where it does not."* If a unit implements this as two nullable columns plus a composite index, MariaDB permits **unlimited duplicate rows containing NULL in a UNIQUE index** — the constraint silently never fires for the non-Space case, which is most of the catalog. The spine's naming hints at one column holding either id, but hinting is not fixing, and this is the exact class of thing the spine exists to nail down.
2. **"over blocking rows."** MariaDB has no partial or filtered indexes. So either cancelled/released blocks are **hard-deleted** (FR-42 and FR-17 both say Slots are released *immediately*, which is compatible), or a status column joins the index — at which point the constraint stops preventing double-booking. The spine must say which; "over blocking rows" reads as a partial index that cannot exist.

### A-14 · MEDIUM — AD-23's "eleven" is short by at least two, in the AD whose whole point is completeness

AD-23's Prevents: *"a requirement with a time trigger silently never shipping, because no document lists them."* The enumeration is the AD, so a gap in it is the defect it names. FR-63 contributes two recurring rules that are not in the list:

- *"Users are reminded of the platform's terms and the rules governing what may be posted **at least once a quarter**."* — a recurring job, not an SLA timer.
- *"Removed content and its associated records are **retained for one hundred and eighty days** after removal."* — a retention expiry, so a purge job.

AD-23 folds FR-63 into "grievance SLA timers (7 days, 36 hours, 3 hours, 72 hours)", which covers neither.

### A-15 · MEDIUM — AD-22 omits the Featured band, and its closing sentence reads as banning paid placement

FR-20 has two structures: a **Featured band**, marked as paid and kept out of organic ordering, and the organic list. NFR 5.5 requires paid placement be labelled; NFR 5.8 requires it carry a non-colour indicator.

AD-22 covers only the organic list, then ends: *"Neither what a Vendor pays nor how recently they joined is a signal at any weight."* In FR-20 that sentence scopes to organic ordering. Standing alone in an AD titled "The result-order seed is fixed per search", it reads as "paid placement does not exist" — and FR-20 is emphatic that *"**Ranking is sold** — visibly, separately"*, superseding an earlier scope-document claim to the contrary. An implementer following AD-22 literally builds no Featured band and deletes the Tier's only differentiator (§3 Glossary: *"Tiers differ in placement in the Featured band and portfolio allowance, and in nothing else"*).

Separately, the AD leaves the seed's **carrier** unfixed — client-supplied on each page request, or server-side session state. Pagination stability across requests is the whole point, so this is load-bearing and one line would settle it.

### A-16 · MEDIUM — Three restatements of Frappe mechanics the spine says it delegates (explicit flag)

Line 30: *"Frappe mechanics are owned by the six `frappe-*` skills — this spine cites them and never restates them."* Three places do restate them:

- **AD-4** — *"Frappe validates them through Pydantic on every request and coerces, so they are load-bearing."* This is `frappe-whitelisted` territory, and as stated it is also **inaccurate in a way that matters**: Frappe's typing validation applies to whitelisted method **arguments**. Return annotations are not validated or coerced. AD-4's contract covers *"one request/response shape"*, so the generator's response half rests on a guarantee the framework does not give.
- **AD-16** — *"`frappe.get_all` forces `ignore_permissions=True` and removes the row cap… `frappe.db.get_value`, `set_value` and `sql` sit below the permission layer entirely."* Pure `frappe-database`/`frappe-whitelisted` mechanics. The *invariant* ("`get_all` is a security boundary; requests use `get_list`") is spine-worthy; the paragraph explaining why is not.
- **AD-18** — *"`methods=` is always restricted: Frappe commits only on POST/PUT/PATCH/DELETE, so a `GET` handler that writes has its writes rolled back, and CSRF is validated only on those verbs."* Verbatim `frappe-whitelisted` material.

AD-15 gets this right — it states the invariant, then says "Mechanics are owned by `frappe-permissions`" — and is the model the other three should follow.

### A-17 · MEDIUM — Two ADs claim to prevent "business rules in clients" and neither rule does (item 2)

- **AD-1 Prevents:** "…business rules migrating into clients." **Rule:** import direction inside the backend app. Import direction across a repo boundary to a TypeScript client is not a thing the rule can express, let alone stop.
- **AD-2 Prevents:** "…business rules that are not permissions leaking into clients." **Rule:** no generic document API; everything through whitelisted methods. A client calling a purpose-built method can still reimplement any rule it likes on the response.

The only rule in the spine that genuinely stops a class of client-side business logic is **AD-19** ("clients never do money arithmetic"), which is enforceable because it names a concrete forbidden operation. Either drop the claim from AD-1 and AD-2, or generalise AD-19's shape into a rule that bites.

### A-18 · MEDIUM — AD-24's gate cannot reach the backend, and the Razorpay line invites an FR-54 violation

Two separable points:

1. AD-24's Rule: *"A pre-commit gate blocks [the banned words] across `apps/`, `packages/`, **the backend app** and the root `.html` files."* The backend app is in a different bench, outside this tree (`CLAUDE.md` §1, restated in the spine's own Structural Seed). A pre-commit hook in `vivsth` cannot scan it. As written the rule is unimplementable for a third of its stated scope — and the backend is where the DocType and field names AD-24 most cares about actually live.
2. Stack, unpinned list: *"Razorpay standard checkout (subscriptions only)."* Intended reading: used only for platform Subscriptions. Available misreading: Razorpay **Subscriptions**, which is Razorpay's recurring-mandate product — and FR-54 forbids exactly that: *"There is no auto-renewal, standing mandate or stored instruction to collect."* One clarifying word ("for Subscription payments only; no mandate — FR-54") removes a costly wrong turn.

### A-19 · LOW-MEDIUM — Brownfield ratification gaps (item 4)

The spine ratifies the brownfield well in most respects: it honours `CLAUDE.md` §1's backend-is-elsewhere rule, adopts `CLAUDE.md` §2's whitelisted-RPC-only rule as AD-2, resolves `DEFERRED.md` D-3/D-4 in AD-19, reproduces D-5/D-6's honest scorecard, and records the `CLAUDE.md` §6 noun-list retirement in the Conflicts table. Three smaller things are unratified:

1. **`api.mobile.v1` → `api/family/v1`.** The existing artefacts use the old path in three places on disk — `apps/mobile/src/mocks/catalog.ts:4`, `packages/shared/package.json:6`, `packages/shared/src/index.js:4-5` — and `CLAUDE.md` §2 carries it as the canonical example. AD-24 makes "Family" correct and "mobile" wrong, so the rename is right; but it is a rename of a committed identifier and belongs in the Conflicts table beside the §6 noun list, not silently in a Conventions row.
2. **`apps/guest-web` does not exist.** Only `apps/mobile` and `apps/vendor-web` are on disk. Legitimate as seed — but the Stack table says *"Client versions read from `package.json` on disk"*, which invites a reader to think all three were read. One word ("new") fixes it.
3. **`CLAUDE.md` §1 miscited.** The Design Paradigm says *"`CLAUDE.md` §1 says don't fight the framework."* §1 is "What this repo is"; the Frappe-divergence rule is in §6 ("**Frappe divergence — do not fight the framework**"). The spine cites §1 correctly elsewhere, so this is a slip — but under CL-8 it is the kind of unverified citation that propagates.

### A-20 · LOW — Structure and terseness (item 7, and the "really two decisions" flag)

Mostly good. The spine is dense, it resists rationale-in-the-artifact almost everywhere, and its Prevents lines are unusually concrete. Residual:

- **`[ADOPTED]` on AD-5** is a leftover decision-log marker. No other AD carries a status tag, so it reads as though the other 24 are not adopted.
- **AD-5's "Accepted cost" paragraph** duplicates the Conflicts table row verbatim in substance. One of the two is the record; the other is rationale that belongs in `.memlog.md`.
- **AD-7** is a restatement of UH-9, which `coding-standards.md` already owns and which the Conventions table could cite in a line. It fixes no divergence a compliant reading of UH-9 would not already fix.
- **Really two decisions:** **AD-17** pairs a data-shape decision (`Wedding Member` child table with an explicit role) with a site-wide platform toggle (`disable_document_sharing` on). The second binds every DocType in the system, not Wedding — it belongs on its own, or in Conventions. **AD-24** likewise pairs "the Glossary is binding" with "the banned words are gated"; the title admits it with an "and". **AD-19**'s three-clause title is fine — it is one canonical-representation decision stated in three consequences.
- **ID collisions:** none. AD-1..AD-25 are unique and gapless. All cited `UH-n` (1, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16), `CL-n` (9, 10, 12) and `D-n` (3, 4, 5, 6, 8) exist in their sources. `coding-standards.md` §1.4 exists and says what the spine says it says.

---

## B. Checklist walk

| # | Item | Result |
|---|---|---|
| 1 | Fixes the real divergence points, misses none | **FAIL** — A-1 (auth/session), A-2 (Engagement Model), A-5 (discoverability predicate), A-8 (Agreement identity), A-10 (Place hierarchy), A-11 (engagement cascade) |
| 2 | Every Rule enforceable and actually prevents its Prevents | **FAIL** — A-3 (AD-8), A-7 (AD-12), A-12 (AD-11, AD-21), A-17 (AD-1, AD-2) |
| 3 | Nothing under Deferred could let two units diverge | **PASS** — see below |
| 4 | Ratifies rather than contradicts the brownfield | **PASS with findings** — A-19 |
| 5 | Covers the driving spec's capabilities | **FAIL** — see the 4.x / 5.x walk below |
| 6 | Every dimension decided, deferred, or an open question | **FAIL** — A-9 (migrations, media, async/idempotency, observability; plus NFR 5.8 and NFR 5.5's access right) |
| 7 | Terse | **PASS with findings** — A-16, A-20 |

### Item 3 — the Deferred section, entry by entry

This is the strongest part of the document and I found nothing under it that lets two units diverge.

| Entry | Divergence risk | Note |
|---|---|---|
| Backend hosting undecided | None — it names the blocked decisions and sets a deadline ("before the first deploy, not by it") | Model entry |
| Quality gates do not exist | None — it is a scorecard, and it correctly retro-labels every "does not exist" AD as convention | Matches D-1/D-2/D-5/D-6 exactly |
| Contract generator (AD-4) | None — the rule binds now, the machinery waits, trigger stated (first three methods), CL-9 cited | Correct shape |
| RFC 3161 timestamp authority | None — server clock is the stated interim, trigger named | Correct shape |
| Search stays on MariaDB | None — `search_listings()` named as the single seam, inherited from `CLAUDE.md` §5 | Correct shape |
| Published site contradicts the product | None — declared a live defect, not a false positive | Good |
| "Not decided here, owned elsewhere" | None — each item names its owner | Good |

The one thing to watch: **`search_listings()` is named as the swap seam, but AD-22's ordering, AD-10's availability gate and A-5's discoverability predicate all live inside it.** A swap to Meilisearch relocates all three. Worth a sentence saying the seam is the *filtering*, not the ordering.

### Item 5 — coverage walk, prd.md §4.1–§4.14 and §5.1–§5.10

| Group | Covered? | Gap |
|---|---|---|
| 4.1 Accounts & Access | **No** | FR-1 entirely unaddressed (A-1). FR-2/FR-5/FR-6 covered by AD-17/AD-18. FR-3 + FR-1's dual Family/Vendor account ("what he can do follows from what he is acting as") has no acting-as decision, and AD-15's DocType hooks cannot see which `api/` namespace called |
| 4.2 Wedding Workspace | Partial | FR-8's running budget: AD-19 fixes units and server-side computation, but the recompute triggers (Selection change, Agreement confirm, cancel, Rule cascade) are the A-11 gap. FR-11/FR-12 guest tokens covered in Conventions; FR-72 states covered via AD-23 |
| 4.3 Dates & Availability | Partial | Strong for Span/per-Function (AD-9/10/11), absent for the other three Engagement Models (A-2). FR-15 collisions, FR-16 locking: code-owned, fine |
| 4.4 Discovery & Comparison | Partial | AD-6/AD-22 good; Featured band missing (A-15); FR-21's per-Service comparison attributes are on AD-8's list, correctly |
| 4.5 Vendor Listings | Partial | AD-6/AD-20 good. FR-24/FR-32 Rules: the spine treats Rules as a Listing core field and never decides whether a Rule is free text or a structured predicate over Preferred Vendors — FR-24/FR-25/FR-32 require the latter. FR-33 Place hierarchy absent (A-10). FR-71's per-Service required capabilities unaddressed |
| 4.6 Vendor Calendar | Partial | AD-10/AD-11/AD-23 good for two Engagement Models (A-2) |
| 4.7 Enquiries | Yes | AD-18 gates, AD-21 messaging |
| 4.8 Agreements | Partial | AD-11/AD-12/AD-13 are the strongest cluster in the document, undercut by A-7 (Desk path) and A-8 (amendment identity) |
| 4.9 Reviews | Yes | AD-12 gates, AD-14 de-identifies, AD-23 windows. FR-48 double-blind reveal is code-owned |
| 4.10 Subscription & Billing | Partial | FR-52's **GST invoice numbering** — a gapless, immutable, per-financial-year statutory sequence — is a spine-grade invariant and is unaddressed; AD-19 covers units only. FR-54's no-mandate rule vs the Razorpay line (A-18.2). Webhook receipt/idempotency (A-9.3) |
| 4.11 Lead Dashboard | Yes | AD-15/AD-16; FR-57's five-vendor aggregate floor cited in AD-2 |
| 4.12 Trust & Verification | Yes, with a hole | AD-20 is excellent; the CDN-URL bypass (A-9.2) is the hole |
| 4.13 Admin Console | Partial | FR-61's non-erasable attributed log is a Conventions line with no mechanism, and A-7 shows the Desk path is the unmodelled one |
| 4.14 Real Weddings | Yes | AD-14/AD-20; FR-66 consent withdrawal → AD-14's erasure path |
| 5.1 Language | Yes | i18n Conventions row. Minor: "content stored exactly as written" implies utf8mb4 + a collation choice for mixed Devanagari/Latin search — worth a line given search stays on MariaDB |
| 5.2 Surfaces | Yes | Conflicts table supersedes Tech-Stack §1's Android-only |
| 5.3 Performance | **No** | Offline/draft survival and low-bandwidth delivery unaddressed (A-9.3). Image delivery is part of the missing media dimension (A-9.2) |
| 5.4 Availability | Deferred only | Peak sizing hangs off the hosting decision — acceptable; but no observability to know whether it holds (A-9.4) |
| 5.5 Data protection | Partial | AD-14 is strong on erasure and precedence; the access-and-correction right for non-account holders has no surface; A-6 is the systemic hole |
| 5.6 Legal posture | Yes | AD-10's attribution clause, AD-24's banned words, AD-12 |
| 5.7 Records | Partial | AD-12; undercut by A-7 |
| 5.8 Accessibility | **No** | Zero mentions; not delegated by name to `bmad-ux` |
| 5.9 External dependencies | Yes | Correctly pushed out in "Not decided here" |
| 5.10 Identity and voice | Yes | tokens.js referenced; `CLAUDE.md` §4's don't-convert-to-.ts constraint is not carried forward, but that is instruction-file altitude |

---

## C. What is genuinely good

Recorded so the rewrite does not lose it.

- **AD-9** — day + Slot, never a timestamp, with the display-time field explicitly quarantined from matching. Non-obvious, unreadable off compliant code, and it kills a whole bug class.
- **AD-15** — the hook pair, "neither runs on the other's path", `None` denies, `"1=0"` over `""`. This is the single most valuable AD in the document and it delegates mechanics correctly.
- **AD-16** — "`frappe.get_all` is a security boundary" is a genuinely non-obvious framework trap stated as an invariant.
- **AD-13** — the `docstatus` 2 ambiguity is exactly the kind of thing that is invisible until someone's profile shows twelve cancellations. Excellent catch.
- **AD-20** — two independent gates on a portfolio image (verified AND within allowance), neither implying the other, with the identity exception carved out. Precise.
- **AD-21** — inverting a WhatsApp compliance risk into a type constraint is the right instinct, even though the enforcement claim needs fixing (A-12).
- **AD-3** — "the absence of a segment is meaningful and must not be 'corrected'" anticipates a real agent failure mode.
- **The Deferred section and the Conflicts table.** Recording conflicts rather than silently resolving them, and stating honestly that almost nothing is gated, is what makes the rest of the document trustworthy. Keep both.

---

## D. Minimum to reach PASS

1. **One AD for authentication and session** — mechanism per client, session representation, `User.name` shape, OTP limits. (A-1, A-6)
2. **Engagement Model into AD-8, and Engagement-Model dispatch into AD-9/AD-10/AD-11.** Cite FR-14. (A-2, A-3)
3. **One AD for the discoverability predicate**, absorbing AD-10's subscription clause and AD-20's verification clause, covering all four FR-53 routes. (A-5)
4. **Decide Agreement identity across an Amendment**, and reconcile AD-12 with AD-13. (A-8)
5. **Fix AD-12's enforcement** to close the Frappe Desk path. (A-7)
6. **Four Deferred entries or ADs**: migrations/fixtures, media storage, async work + idempotency, observability. Migrations and media most likely want ADs. (A-9)
7. **One line for the Place hierarchy representation.** (A-10)
8. **One AD or Conventions row for the engagement cascade seam.** (A-11)
9. **Correct the two tier claims** (AD-11, AD-21). (A-12)
10. Tidy: Featured band into AD-22; AD-23's two missing FR-63 jobs; AD-24's backend-scope impossibility; the Razorpay/FR-54 ambiguity; `[ADOPTED]`; the three Frappe-mechanics restatements; the `api.mobile.v1` rename into the Conflicts table; the `CLAUDE.md` §1/§6 miscitation. (A-14 to A-20)
