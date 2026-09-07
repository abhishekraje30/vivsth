# UX Extract — PRD: Vivah Spot

Source: `_bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/prd.md` (1492 lines, status `final`, amended 2026-09-06).
Scope of this file: **only** what bears on user experience and visual design. Everything is cited by PRD section / FR / UJ / NFR id.
Where the PRD is silent on something a designer would want, that silence is recorded explicitly as a finding.

> STATUS: complete. All 1492 lines read. §11 lists what the PRD is silent on; those silences are findings, not gaps to fill.

---

## 0. Surfaces implied

The PRD does not name the three clients as products in §1–§4; the surfaces are implied by the personas and by which party acts:

- **Family app** — UJ-1 entry state: "New install, signed in with phone and OTP." Workspace, discovery, comparison, shortlists, enquiries, agreements, reviews, guest list/invitations.
- **Vendor portal** — UJ-2: "Vendor portal open on his phone." Explicitly: "the portal is **phone-first**, not desktop-first" (UJ-2 confirmed constraints).
- **Admin console** — UJ-4 Kiran "works from a phone in the field and a laptop at the office". FR group 4.13 Admin Console (FR-61..64).
- **Public guest pages** — UJ-5: RSVP page, hosted by Vivah Spot, "without an account, an install or a sign-in" (FR-12); plus the **guest form** (FR-11), a separate public page for households to submit themselves.

---

## 1. Users / personas (§2.1 Jobs To Be Done; personas inline in §2.2)

*§2.2 states: "Persona context lives inline; there is no separate persona section."*

### 1.1 The Family (§2.1)

- "Usually one person doing the running: a sister, a son, a cousin — whoever has the phone and the patience. They are **not necessarily the couple**, and they are **of no particular age**. **They pay nothing**." (§2.1)
- Jobs, verbatim (§2.1):
  - "Find a day that works — one the guruji allows, that every vendor they want is free across, and that the budget survives."
  - "Stop repeating themselves. Say the guest count, the budget and the dates once, not to fifteen Vendors in turn."
  - "Compare prices that actually mean the same thing, without discovering the transport was extra."
  - "Know before committing what a venue will not allow — outside caterers, a DJ after ten, fireworks."
  - "Keep the whole wedding in one place: every function, every shortlist, what has been agreed, what it now costs."
  - "Let the Family help without letting the Family take over."
  - "Find Vendors who will not disappear, and know that the reviews were written by people who actually hired them."

**Named persona — Rutuja (UJ-1).** Home in Shrirampur for her brother Omkar's wedding to Snehal. Guruji has given **three possible wedding days**; ceiling **about ₹8 lakh**; **~600 guests**. "She is the one doing the running around, which today means calling Vendors one at a time to ask what is free on the 22nd, then the 27th, then the 4th — and for each of those, asking again about the day before for the Haldi and the day after for the Reception. Every time one comes back unavailable she starts the whole sequence over."
FR-7 context: "Rutuja is running a wedding across five Services and three Functions while holding down the rest of her life." (§4.2 Description)

### 1.2 The Vendor (§2.1)

- "A venue owner, caterer, photographer, decorator or band. **The only paying customer**, often working from a phone between jobs, whose year is shaped by muhurat and empty for months at a stretch."
- Jobs, verbatim (§2.1):
  - "Be found by Families who are actually planning a wedding, not by browsers."
  - "Receive an Enquiry that already says the date, the guest count, the budget and the functions — so a quote can be given rather than negotiated toward."
  - "Show real work to people who can tell it is real."
  - "State the rules of the property once, and have them respected without an argument on the day."
  - "See what the subscription produced, in numbers, before deciding whether to pay again."
  - "Keep a calendar that does not need constant tending."
  - "Fill the dead months at a price that suits them."

**Named persona — Dattatray Shinde (UJ-2).** Runs Shubhmangal Lawns on the Ahmednagar road — "an 800-capacity lawn and a 300-capacity AC hall. Business today comes from a hoarding on the highway and from people who attended a function there last season. He joined as a Founding Vendor at ₹0 after Vivah Spot staff visited, checked his registration and photographed the property." Entry state: "Vendor portal open on his phone… Single login on the account."

### 1.3 Admin / operations (§2.1)

- "The client's own staff — the people the entire trust spine actually rests on."
- Jobs: verify in person and record it; "Add a service or open a new town without waiting for a release"; "Remove a fraud quickly, and leave the record of why"; "Meet the obligations of hosting other people's content in India."

**Named persona — Kiran (UJ-4).** Field verification around Shrirampur. "She is the reason every trust claim on the platform is true: nothing this product says about a Vendor survives her not having driven out and looked. **She works from a phone in the field and a laptop at the office**, and she has no manager to approve anything — **every Admin user can do everything, and what constrains her is that every action carries her name**."

### 1.4 The Guest (§2.2 UJ-5; Glossary §3)

**Named persona — Vasant kaka (UJ-5).** "Omkar's father's cousin, in Pune. He is **not a user of Vivah Spot, has never heard of it, and has no intention of installing anything**. He is also, as it happens, marrying his own daughter off next spring."
- Entry: "A WhatsApp message **from Rutuja's own number** — because the platform never messages a Guest — carrying the invitation and a link."
- "He replies in about fifteen seconds, on a page he has never seen before, without an account, an install or a sign-in."
- Glossary: "**Not a user of the platform, and a distinct class of data subject**."

---

## 2. Glossary (§3) — verbatim, binding on UI copy

*§3 preamble: "Downstream workflows and readers must use these terms exactly. FRs, UJs and SMs use Glossary terms verbatim; **introducing a synonym anywhere is a discipline violation**. The vocabulary that must **not** be used is listed in §7.9, which is authoritative — this section does not restate it."*

### The people

- **Family** — the demand-side party: the household planning a wedding. Free of charge, always. The Family is not necessarily the couple.
- **Creator** — the person who created a Wedding. **The only party who may act on it** — enquire, obtain a Contact Reveal, confirm or cancel an Agreement, review. Frequently not one of the people getting married.
- **Invited Member** — a person the Creator has granted access to a Wedding. May view it and suggest Listings; may take no action.
- **Vendor** — a supply-side business. **The paying customer.** One login per account.
- **Admin** — the operator's own staff.
- **Guest** — a household the Family intends to invite, carrying a count of people, whether accepted onto the guest list or still awaiting the Creator's decision. **A submission to the guest form is a Guest from the moment it arrives**, whether the Creator has accepted it, is yet to look at it, or has dismissed it — every rule governing Guest data applies to all three. Not a user of the platform, and a distinct class of data subject: contact details are used to compose that Wedding's invitations and for nothing else. **The guest list is optional**; a Function's guest count is stated by the Family and exists whether or not anyone is named.

### The wedding

- **Wedding** — the parent object a Creator creates. Holds couple names, its **Place**, guest count, budget ceiling, **the Services selected for it**, Functions, Candidate Blocks, the Chosen Block, Shortlists, Selections, Boards, Guests and Agreements. One per event. A Wedding is **in planning**, **concluded** or **abandoned** — the three states are defined in FR-72, and four rules elsewhere key off them.
- **Function** — a distinct ceremony within a Wedding (Haldi, Mehndi, Sangeet, Wedding, Reception, or custom), each holding its own day, Slot and guest count. A Wedding has many.
  - *Functions are ceremonies; Services are what is hired for them, and **the same word must never name both**. The Function is `Mehndi`, the Service is `Mehndi Artist`. The Function is `Sangeet`, the Service is `DJ` or `Choreographer`.*
- **Workspace** — the Family's command centre over a Wedding: dashboard, budget tracker, guest list, Shortlists, Boards and Enquiry tracking.
- **Board** — a private collection of saved images and Listings within a Workspace. Visible to the Creator and Invited Members, and to nobody else.
- **Place** — a location in the hierarchy village or town → tehsil → district → state → country. A Wedding holds one Place; a Vendor declares the Places they serve, at any level.

### Dates

- **Anchor Date** — a possible wedding day the Family supplies. Each Anchor Date yields one Candidate Block.
- **Candidate Block** — a complete arrangement of the Wedding: every Function assigned to a day and a Slot, stated explicitly by the Family. The Family states the arrangement once and the platform derives one Block per Anchor Date by shifting it. Whole-or-nothing. Input.
- **Chosen Block** — the single Candidate Block locked onto the Wedding. **Output** of cross-Service availability matching run across every day and Slot the Block occupies.
- *Where this document says **Block** alone, it means whichever Block is in force: the Chosen Block once one is locked, and the Family's Candidate Blocks before that. Where the distinction carries weight — pricing quoted before locking, matching, the collision view — the full term is used and must be.*
- **Slot** — a named part of a day: **morning, afternoon, evening, night**. The same four everywhere, for every Service, every Function and every calendar. A day is not an atomic unit, and Slots are not configurable — a Family assigns a Function to a Slot before choosing any Vendor, so a Slot cannot belong to a Service.
- **Span** — a continuous period running from the start of the first Function a Service serves to the end of the last, **including the nights between them**. What a Span Service is engaged for.

### Supply

- **Service** — a category of wedding provision. The platform carries the full wedding catalog across pre-wedding, wedding-day and post-wedding categories. Five carry detailed frozen specifications in the scope document: Venue, Catering, Photography, Décor & Mandap, Band Baaja Baraat.
- **Engagement Model** — how a Service is engaged, declared per Service: as a **Span**, **per Function**, for a **rental period**, against a **lead time**, or with **no duration**. Governs how availability is checked and how Vendors price.
- **Sizing Attribute** — what a Listing publishes about its own size, so a Family can filter and compare on it. One of: **capacity**, **crew bandwidth**, **quantity**, **stated size**, or **none**. Declared per Service.
- **Order Basis** — what determines how much a Family actually needs, which is a different thing and lives on the Family's side. One of: **the Function's stated guest count**, **the engaged Space's stated size**, **a quantity the Family states**, or **none**. Declared per Service.
- **Stated Size** — the size of a Space as its own Vendor declares it, published on the Listing and visible to Vendors quoting to work in that Space. The Vendor's declaration about their own property, not a platform measurement.
- **Listing** — a Vendor's published offer within one Service. A Vendor may hold Listings in several Services.
- **Space** — a distinct engageable area within a Listing — lawn, hall, terrace — each with its own capacity, pricing and calendar. Whether a Service has Spaces at all is configured per Service.
- **Commitment** — the promise a Vendor declares and publishes on a Listing: **the delivery timeline, what is included, and the no-hidden-charges declaration.** A condition of listing. Declared by the Vendor, never underwritten by Vivah Spot.
- **Rules** — a Vendor's stated restrictions, such as no outside caterer or a DJ cutoff. A condition of listing, and binding on what the Family may subsequently choose.
- **Preferred Vendor** — a Vendor another Vendor publicly recommends, with that Vendor's acceptance.
- **Verification** — the human check of a Vendor's identity, business registration and portfolio authenticity, performed by Admin staff in person.

### The engagement

- **Shortlist** — the set of Listings a Family has saved within one Service for one Wedding. Candidates under comparison. **Contributes nothing to the running budget.**
- **Selection** — the Listing a Family has picked from a Shortlist to serve a particular need. **How many a Service carries follows its Engagement Model directly**: a Span Service carries one Selection per Span — the lawn across the Haldi and the Wedding is one, and a separate hall for the Reception is a second Span and so a second Selection — while a per-Function Service carries one per Function it serves. **What the running budget counts, once each.** A Selection is a decision, not a commitment: it binds nobody, it does not engage the Vendor, and it can be changed until an Agreement is confirmed against it.
- **Enquiry** — Creator-initiated contact with a Vendor about a Listing. Always carries the Wedding context — the Chosen or Candidate Block, guest count, budget, Functions. **Not a transaction.**
- **Quote** — a Vendor's priced response within an Enquiry thread. The precursor to an Agreement, and binding on nobody.
- **Site Visit** — an arranged viewing of a Space. Reserves nothing and blocks no Slot.
- **Contact Reveal** — the point at which a Family obtains a Vendor's direct contact details. Counted on the Lead Dashboard.
- **Amendment** — a change to an Agreement's terms, confirmed by both parties and appended to that Agreement's history. The prior version is never altered, and no cancellation is recorded.
- **Agreement** — a timestamped record of terms confirmed by both a Creator and a Vendor. **A record, not an instrument** — Vivah Spot hosts it and is not a party to it. Blocks the relevant **Slots or Span**, and gates Review rights.
- **Engage** — a Family engages a Vendor at the moment an Agreement with them is confirmed. Engagement is what binds that Vendor's Rules on the Family's later choices and what surfaces that Vendor's Preferred Vendors. Shortlisting, enquiring and revealing contact are not engagement.
- **Delivery** — the point at which a Service has actually been rendered. Service-dependent: the end of the Span for a venue, the Function itself for catering, the arrival of the album for photography. **Delivery is the real event and nothing deems it to have happened.** A Vendor who never delivers has never delivered. What the committed date and the one-year ceiling do is open the **review window** without waiting for Delivery — see FR-45, which is where those triggers live. A Review written on an undelivered engagement is exactly the signal the mechanism exists to permit.

### Reputation and money

- **Review** — feedback tied to one Agreement. Two-way, double-blind, and **asymmetric in form**: a Family's review of a Vendor is a rating and free text, published on the Listing; a Vendor's review of a Family is a **structured** response to fixed questions, visible to other Vendors and to the Family itself, never published and never free text. The window opens on **Delivery** and runs for fourteen days. A cancelled Agreement yields none.
- **Real Wedding** — a completed Wedding the Family has chosen to publish, naming only Vendors with an Agreement for it.
- **Subscription** — a Vendor's twelve-month plan for one Service, priced by that Service and by the Vendor's own Place. Prepaid, except at the Founding Vendor Tier, whose price is ₹0. **It buys no territory and limits no reach.** Renewed only by an active decision.
- **Tier** — the level of a Subscription: **Founding Vendor** (₹0), **Basic**, or **Featured**. Tiers differ in **placement in the Featured band and portfolio allowance, and in nothing else.** How many Services a Vendor lists in is not a Tier allowance — a Subscription is held per Service, so each Service is paid for separately. **No Tier alters a condition of listing.**
- **Grace Period** — the thirty days after a Subscription expires during which the Listing remains live.
- **Lead Dashboard** — a Vendor's own record of what the platform produced for them: views, Contact Reveals, Enquiries, response times, outcomes, cost per Enquiry and comparison against their Service in their Place. Private to that Vendor.

---

## 3. §7.9 Vocabulary that must not appear — verbatim

Heading: **"7.9 Vocabulary that must not appear"**
Preamble: *"Enforced across the PRD, the UI, the schema and every downstream document."*

- **Booking / booked** — the platform records Enquiries and Agreements. It books nothing.
- **Cart / checkout** — nothing is purchased.
- **Legally binding / guaranteed / enforced by Vivah Spot** — applied to an Agreement, these create the liability the model exists to avoid.
- **v1 / MVP / Phase N** — this document describes the complete platform.

*"The existing prototype code contains "Book Now", "My Bookings" and a bank-details payout section. All are artifacts of the abandoned commission model and must not be treated as specification."*

*Carve-out: "§7.1 and this section necessarily contain the banned words in order to ban them. An automated vocabulary sweep should exempt §7.1 and §7.9 and check everything else."*

**Related copy prohibitions stated elsewhere (not part of the §7.9 list, but binding on copy):**
- FR-41 / NFR 5.6: "**No surface, document, notification or item of copy describes the Agreement as legally binding, enforceable, guaranteed or underwritten by Vivah Spot.**"
- FR-13 / FR-19 / FR-29 / NFR 5.6: availability copy is always "**shows available**" — "**Availability is always attributed to the Vendor, never asserted by the platform.**"
- NFR 5.10: "It states what is true — 'vendor shows available', not 'available'; 'we recorded what you both agreed', not '**your booking is protected**'."
- §7.1 excluded surfaces (so the words cannot appear because the things do not exist): "booking payments, token or advance payments, escrow, milestone releases, commission, split settlement, payouts, payout KYC, refunds, and any wallet, cart or checkout."
- Glossary §3: "Functions are ceremonies; Services are what is hired for them, and **the same word must never name both**."
- Glossary §3 preamble: "**introducing a synonym anywhere is a discipline violation**."

---

## 4. Stated journeys (§2.2 UJ-1..UJ-5)

### UJ-1 — "Rutuja finds the one arrangement her brother's whole wedding actually fits into."

Path, verbatim steps:
1. "Creates the **Wedding** — Omkar and Snehal, Shrirampur, ~600 guests, ₹8L budget — and enters the three wedding days her guruji gave her. The 'help us find an auspicious date' option is offered at this point; that path is powered by an external astro service and **is deferred**."
2. "Lays out the shape of the wedding **once**: Haldi on the morning before, the Wedding that evening, the Reception the following evening, each with its own guest count. The platform shifts that same shape onto each of her three days, giving her three **Candidate Blocks** without her building anything three times."
3. "Selects the Services the wedding needs: Venue, Catering, Photography, Décor & Mandap, Band Baaja Baraat."
4. "Works through each Service. Verified real photos, all-in pricing with nothing hidden behind it, reviews, verified badges. Availability already reflects the **whole Block** — the caterer has to be free for all three days, the decorator for two, and **she never types a date into a filter**."
5. "Shortlists several per Service and compares them side by side. **Nothing she is merely comparing touches her budget.** As she settles on one in each Service, the running total builds against ₹8L on its own."
- **Climax:** "The app surfaces what she could not work out by phone — that of her three Blocks, only the one anchored on the 27th has her shortlisted venue, caterer *and* photographer free across every day and Slot it needs, and lands inside budget. She locks that Block onto the Wedding."
- **Resolution:** "The Workspace holds a real wedding: the Block fixed, three Functions each with their day and Slot, five Shortlists, budget tracked against ₹8L."
- **Edge case — no clean Block:** "The app **shows the collision explicitly and lets her swap Vendors** until one Block clears. It does not rank Blocks by partial availability, and it does not hide the conflict behind per-Listing badges."

UX-load-bearing constraints carried by UJ-1: shape stated once; a wedding spans several days and Slots; Candidate Block is whole-or-nothing; **availability filtering is pre-applied everywhere, never a filter the user re-applies per Service**; budget is a portfolio-level running constraint counting **Selections and Agreements only**; Services selected at Wedding level before browsing.

### UJ-2 — "Dattatray finds out what the platform is actually worth to him."

1. "Sets up his **two Spaces separately** — lawn and hall — each with its own capacity, all-in pricing and calendar."
2. "States his **rules on the listing**: no outside caterer, DJ stops at 10, no fireworks. Publishes all-in pricing and the no-hidden-charges declaration."
3. "Opens his **calendar**: blocks what is already taken, marks which of the day's four Slots each Space is free in, and sets lower pricing for the Chaturmas months when nothing moves."
4. "Adds his **preferred caterer and decorator**."
5. "**WhatsApp buzzes**: an Enquiry, already carrying the whole wedding — 27 November, 600 guests, ₹8L budget, Haldi and Wedding and Reception. He taps through into the thread."
6. "Replies there with a Quote for the lawn and offers a Site Visit that Sunday."
7. "Marks the Enquiry as it moves — contacted, site visit, won."
- **Climax:** "At the end of the season his dashboard reads **34 Enquiries, 6 site visits, 2 weddings won, ₹0 paid**."
- **Edge case — the stale calendar:** "the platform **nudges him** ('you have N Enquiries for the 27th — still free?') rather than blocking the Enquiry or auto-expiring his availability."
- Constraints: one login per Vendor; venue is many engageable Spaces; **Slot-based** availability; Rules + all-in pricing are conditions of listing; Enquiries are qualified; **WhatsApp is the Vendor's primary notification channel; the portal is phone-first, not desktop-first**; "**the platform never asserts availability as fact. All copy reads 'vendor shows available'.**"

### UJ-3 — "Rutuja and Dattatray put it in writing, and the reviews become worth reading."

1. Dattatray sends agreed terms into the thread — "date, space, guest count, all-in price, what is included, and his rules".
2. "Rutuja reads the terms and **confirms in-app**." 3. "Dattatray **confirms**."
4. "Vivah Spot timestamps the **Agreement**… Both sides can download a copy."
5. "The date moves from shortlisted to committed in her Workspace, and **the Agreement blocks the Slot on his calendar automatically**."
6. "Money settles directly between them, off the platform, exactly as before."
- **Climax:** double-blind reviews; "For the first time the star rating on the Listing means something."
- **Edge case — it falls apart after signing:** "**Nobody adjudicates** — the Agreement is a record, not a lever… **Neither side reviews**… The cancellation is recorded as a plain fact on both profiles."
- Constraints: Agreement is a record, not an instrument; both-sides confirmation; review rights flow only from an Agreement; reviews two-way, double-blind, **asymmetric in form**; reviews publish when the window closes; **window opens on Delivery, not the wedding day**; a cancelled Agreement unlocks no reviews; Agreement auto-blocks the calendar; money never touches the platform.

### UJ-4 — "Kiran verifies a lawn, opens a Service, and takes a fraud off the platform."

1–3. Field verification: identity + business registration checked against documents; walks the lawn and AC hall, photographs both herself, "**compares his uploaded portfolio against what she is standing in**"; records the Verification "against her own name, with the date and what she checked it on".
4. "His Listing becomes publicly visible, because Verification has completed, every condition of listing in FR-59 and FR-71 is satisfied, and his Founding Vendor Subscription is active."
5. Configures a new Service (**Mehndi Artist**) — declarations: "taxonomy, filters, comparison attributes, Sizing Attribute, Order Basis, Engagement Model and pricing model". **[AMENDED]** fields and behaviour are a developer's work; ships on the next release.
6. Complaint about a decorator with a lifted portfolio.
- **Climax:** "She removes him. The removal carries her name, the ground, and the date, and it cannot be erased. **Every Family holding an Agreement with him is told he was removed and asked to find another decorator** — not merely that a listing has gone."
- **Resolution:** "His Reviews stay published; removal does not erase a record."
- **Edge case — the portfolio that changes after verification:** "The new images are not publicly visible until Verification has covered them."
- Constraints: Verification is human and in person; every standing/visibility/access-changing Admin action is attributed and cannot be erased; **Admin has no role tiers**; removal grounds narrow and closed (fraud, falsified Verification, stolen or misrepresented portfolio, impersonation — "**Never service quality**").

### UJ-5 — "Vasant kaka replies in fifteen seconds, and finds his own daughter's wedding."

1. "Opens the message. It is from family, so he reads it rather than ignoring it."
2. "Taps the link and lands on a page Vivah Spot hosts. Omkar and Snehal, the 27th, the lawn on the Ahmednagar road, the three Functions and their times."
3. "Says yes — four of them travelling."
4. "**Sees nothing else.** Not the guest list, not who else has replied, not the budget, not the Vendors, not anything about the Wedding beyond his own invitation and his own answer."
5. "At the foot of the page, **one quiet line** for someone planning a wedding of their own."
- **Climax:** "…Rutuja's confirmed count moves — **beside her stated number, not over it**."
- **Edge case — the forwarded link:** "the link is individual and cannot be altered to reach anyone else's. A relative who was never invited has a different route: the guest form, whose submissions reach Rutuja as suggestions she accepts or dismisses."
- Constraints: no account/install/sign-in ever; each link individual, unguessable, **excluded from search-engine indexing**, rate-limited; a Guest sees only their own invitation and response; **the RSVP page is the platform's growth surface**; RSVP counts never overwrite the stated guest count; links revocable and expiring.

---

## 5. User-facing functional requirements

*Every FR below implies at least one screen, control or piece of copy. FR numbering is global and deliberately non-sequential (§4 FR index) — do not renumber.*

**FR index by group (§4):**

| Group | FRs, in the order they appear |
|---|---|
| 4.1 Accounts & Access | 1, 2, 3, 4, 5, 6 |
| 4.2 Wedding Workspace | 7, 9, 68, 10, 8, 11, 12, 72 |
| 4.3 Dates & Availability Matching | 13, 14, 15, 16, 17 |
| 4.4 Discovery & Comparison | 18, 19, 20, 21, 22 |
| 4.5 Vendor Listings | 23, 24, 25, 32, 26, 33, 71, 27 |
| 4.6 Vendor Calendar | 28, 29, 30, 31 |
| 4.7 Enquiries | 34, 35, 36, 37, 38 |
| 4.8 Agreements | 39, 40, 41, 69, 42, 43 |
| 4.9 Reviews | 44, 45, 46, 47, 48, 49 |
| 4.10 Subscription & Billing | 50, 51, 52, 53, 54 |
| 4.11 Lead Dashboard | 55, 56, 57 |
| 4.12 Trust & Verification | 58, 70, 59, 60 |
| 4.13 Admin Console | 61, 62, 63, 64 |
| 4.14 Real Weddings & Inspiration | 65, 66, 67 |

### 4.1 Accounts & Access

Group framing: "Nobody signs up for a wedding platform twice, and nobody remembers a password they set once. Everyone… gets in the same way: a phone number and a code. What differs is what they can reach once inside."

- **FR-1 Sign in with a phone number** (UJ-1, UJ-2). **No password field exists on any surface**; no password reset flow. Routes offered: **mobile number + one-time code; a passkey where supported; Google; Apple**. "The mobile number route always works and is never the only option offered." "**Sign in with Apple is offered wherever Google is**, on iOS." OTP is **six digits, valid for ten minutes**, **five attempts**, **three resends per hour**. Delivered over **WhatsApp with SMS fallback**. Returning users re-enter with **device biometric or screen lock** and **stay signed in for ninety days** ("re-authenticating a planner mid-season is hostile"). One person = one account, **mobile number is the identity**. Linking requires an OTP challenge to the existing number, and "the person is told what was linked and when". Where linking fails, a separate account is created "rather than failing silently, and the person is told why". **One person may be both a Family and a Vendor on one account** — "What he can do at any moment follows from what he is acting as, not from which account he signed into." A person can **change their mobile number** (proving control of both). **Losing the number goes through Admin** — "deliberately manual". "A person who abandons sign-up partway resumes without creating a duplicate account."
- **FR-2 A Wedding belongs to the person who created it** (UJ-1). Couple names are data on the Wedding, not the account. "Enquiry replies, nudges and reminders reach the owning account, not the named couple."
- **FR-3 One login per Vendor account** (UJ-2). "No additional users, roles, invitations or permission tiers exist on a Vendor account."
- **FR-4 Admin can do anything** (UJ-4). "**No capability is withheld from Admin by role.**… the control is attribution rather than restriction." Authoritative statement at FR-61.
- **FR-5 The Wedding Creator controls who else gets in** (UJ-1). "Access is granted by the Creator to a mobile number. There is no other route in." Not discoverable/searchable/requestable. Revocable, "a revoked member loses visibility immediately". One person may hold access to several Weddings.
- **FR-6 Invited Members advise, they do not act** (UJ-1). Can view "dashboard, Functions, budget, guest list, Shortlists and Enquiry statuses". Can send a suggestion **naming a Listing, or naming a Guest to invite** — "It appears to the Creator, who accepts or dismisses it. A suggestion has no effect until the Creator acts on it." Cannot edit the Wedding or Functions, add/remove Candidate Blocks, add to a Shortlist, send an Enquiry, obtain a Contact Reveal, confirm/cancel an Agreement, write a Review, or change budget or guest list.

### 4.2 Wedding Workspace

Group framing: "The Workspace is the reason a Family opens Vivah Spot rather than a search engine… it is the product's retention: the one place where the whole wedding — every Function, every Shortlist, every Enquiry, the running cost — sits in a single view." Governing principle: "**the planner carries as little as possible.** … Anything the platform already knows, the platform fills in. She is never asked to retype something it could have carried across, and never asked to maintain a record for the platform's benefit."

- **FR-7 A Wedding is never lost and never has to be finished in one sitting** (UJ-1). "Every entry is preserved as it is made. **No explicit save action exists anywhere in the Workspace.**" "Closing the app, losing signal or switching devices does not lose work in progress." "A Wedding is usable before it is complete."
- **FR-9 The shape of the wedding is stated once** (UJ-1). Each Function holds its own day, Slot and guest count. Functions from a standard set — **Haldi, Mehndi, Sangeet, Wedding, Reception** — "or named freely by the Family". "**Up to five Anchor Dates, and so up to five Candidate Blocks, per Wedding.**" "Nothing about the arrangement is inferred by the platform." The Family can adjust an individual Candidate Block without disturbing the others `[ASSUMPTION A-1]`.
- **FR-68 The Family chooses its Services at the Wedding, before browsing any of them** (UJ-1). "The Family selects Services onto the Wedding… and can add or remove one at any time." "A Service may be selected for the whole Wedding or for particular Functions." "**The Family never browses the catalog category by category** looking for what a wedding might need." Removing a Service removes its Shortlist; FR-32's warn-and-accept applies where an Agreement exists.
- **FR-10 One view of the whole wedding** (UJ-1). Carries "the Services selected for this Wedding, every Function with its day and Slot, every Shortlist and the Selection made from it, every Enquiry and its current status, the running total against the budget ceiling, and the Chosen Block once locked." "**It is the first thing the Family reaches after sign-in, not a screen they navigate to.**" Reflects changes immediately.
- **FR-8 The budget fills itself in** (UJ-1). "**A Shortlist contributes nothing.**" "**A Selection contributes its all-in price once**… **A Span Selection contributes once for the whole Span**." "**Confirming an Agreement replaces the Selection's estimated figure with the agreed one**, automatically." "**Where a Service is priced per head, the figure is that price times the stated guest count of the Functions it serves**, and **the multiplication is shown beside the total** so the Family can see where the number came from." "**A Service whose Functions the Family has not yet decided shows as not yet estimated — never as ₹0. Zero reads as free.**" "The running total is shown against the Wedding's budget ceiling **wherever she is browsing, not only on a budget screen**." She can adjust any derived figure and add unknown costs. "She is never required to enter a figure for the platform's benefit." **Known limit:** the platform knows what was agreed, never what was paid; "Any record of actual payment is hers to volunteer, never required, and never presented as authoritative."
- **FR-11 The number comes first; the list is optional** (UJ-1, UJ-5). "**Each Function carries a guest count the Family simply states**". "**A guest list is optional and is never required for anything.**" "**entries are households, not individuals.** '_The Deshmukhs — four_' is one entry, one invitation and one reply. Six hundred guests is usually about a hundred and fifty households". A list can be built by hand, imported from contacts, or "**pasted in from a list they already have** — a message, a note, a spreadsheet from the last wedding". "**Invited Members can suggest guests**". "A household is attached per Function… and carries an RSVP state per Function". "**RSVP counts never overwrite the stated guest count.** They are shown beside it… The count is theirs, not the platform's."
  - **Guest form (public page):** "The Workspace produces a short form and a link the Creator shares wherever their family already talks — the family WhatsApp group, usually." Submitter gives "who they are, how many are coming, and a number to reach them on. **No account, no install, no sign-in.**" Link unguessable, not alterable to another Wedding's form, **excluded from search-engine indexing**, rate-limited. "**Every submission arrives as a suggestion for the Creator to accept or dismiss**". "**A submitter never sees the guest list**, who else has submitted, or anything else about the Wedding." Revocable; expires on conclusion **or abandonment**.
- **FR-12 The Family sends the invitations; the replies come back to the platform** (UJ-5, UJ-1). "The platform composes the invitation and hands it to the Family to send from their own account. **Vivah Spot never sends a message to a Guest.**" "**That link's preview — image, title, description — is controlled by the platform**, and is the platform's principal surface in front of Guests." Each Guest link individual, unguessable, unalterable, noindex, rate-limited. Revocable; expires on conclusion or abandonment. "A Guest sees the invitation and their own response. They never see the guest list, other Guests' responses, the budget, the Vendors or anything else of the Wedding." "The RSVP page carries **a quiet route** for a Guest planning a wedding of their own. **This is the platform's growth surface**." Attribution: "**a single discreet line** of Vivah Spot attribution in the message and page frame. It never appears inside the invitation artwork a Vendor designed, and never on a physical card. It cannot be removed, and no fee to remove it is ever offered — a Family pays nothing for anything." "**Guest contact details are used to compose that wedding's invitations and for nothing else.**" Receipt is not tracked; "Reach is measured by RSVP page visits and by Guests who go on to start their own Wedding."
  - *Why the Family sends (WhatsApp opt-in rules):* "an invitation arriving from Rutuja's own number is opened and forwarded, where the same message from an unknown business number is ignored or reported."
  - **Guest accommodation and guest transport** are ordinary Services; "The platform does not allocate rooms, assign Guests to vehicles, or size the order."
- **FR-72 A Wedding has a life, and it ends** (UJ-1). **in planning** → **concluded** (last Function of the Chosen Block passed) → or **abandoned**. Inactive, Agreement-less Weddings: "the Family is asked whether to keep it. **If they do not answer within thirty days it is abandoned**… and they are told that before the thirty days start." Abandoning "cancels its Agreements under FR-42, releases the Slots, erases the Guest list, and **kills every public link the Wedding issued** — RSVP links and the guest form alike." "A concluded Wedding stays readable by its Creator and Invited Members."

### 4.3 Dates & Availability Matching

Group framing: "This is the capability that makes Vivah Spot worth opening… She states the shape once, supplies her possible wedding days, and every Listing she looks at thereafter already knows whether it can serve her."

- **FR-13 Availability is evaluated against the whole Block, everywhere** (UJ-1). "**The Family never types a date into a filter.**" "**A Family may browse before supplying any Anchor Date.** Listings are shown **without an availability signal — not as unavailable** — and the signal appears everywhere the moment the first Anchor Date exists." Services with **no duration** are "presented without an availability claim, not as unavailable". Availability shown only for a Listing with an active Subscription. "**No availability is ever presented as fact.** Every availability display is attributed to the Vendor — '**shows available**'."
- **FR-14 A Service declares how it is engaged** (UJ-1, UJ-2). Five Engagement Models. Span held continuously "**the overnight between them included**".
- **FR-15 Collisions are shown, never silently resolved** (UJ-1). "The Family sees **which Selection blocks which Candidate Block, by name**." "Candidate Blocks are **not** ranked or scored by partial availability, and the platform never recommends one over another." "The Family resolves the collision by swapping Listings, and **the view updates as they do**." "The platform never chooses a Block, drops a Listing, or resolves the conflict on the Family's behalf."
- **FR-16 Locking the Block** (UJ-1). Locking fixes each Function's day and Slot; every later Enquiry carries the Chosen Block; discarded Candidate Blocks stop applying to browsing.
- **FR-17 Changing the Chosen Block cancels what was agreed against it** (UJ-1, UJ-3). Every Agreement on the old Block is **cancelled**, recorded on both profiles "as a countable fact… **the count is shown as a neutral number, never as an accusation**". No Review unlocked. Slots released immediately.
- **Auspicious-date path:** offered "where Anchor Dates are supplied. **It is deferred and not built.**"

### 4.4 Discovery & Comparison

Group framing: "Rutuja is not browsing. She is looking for a specific thing… **every screen that makes her restate what the platform already knows is a screen that wastes her time**. Discovery here is narrow and pre-loaded."

- **FR-18 Finding Vendors within a Service** (UJ-1). Search by Listing/Vendor name or location, "including detecting where she is". Filters: "price within this Service, the Service's own Sizing Attribute, rating and verified status". "**A rating filter never silently excludes an unrated Listing.**… Unrated Listings are shown alongside, **marked as unrated**, unless the Family explicitly asks to see only rated ones." "**A per-Service price filter is not the portfolio budget.**" "**The filters offered are configured per Service, not built per Service.** A venue filters on capacity; a photographer does not." Availability pre-applied, never a filter she sets.
- **FR-19 What a Listing shows her** (UJ-1). Every Listing shows "photos, the all-in price, rating and Review count, verified status, the Service's Sizing Attribute, the availability signal against her Blocks, and the places served". "**A Listing with no Reviews says so plainly** — '**no reviews yet**' — and never shows a zero, a blank rating, or a borrowed average." "**A Listing without an all-in price cannot be published.**" "**A Listing's Rules are shown on the Listing itself**, not buried in a sub-page." "Availability is always attributed to the Vendor — 'shows available' — never asserted by the platform."
- **FR-20 Paid placement is visibly separate from merit** (UJ-2). "Featured Listings appear in **a distinctly marked band, identified to the Family as paid placement**." Organic order signals, in weight order: (1) availability for the Family's Candidate Blocks; (2) rating adjusted for review count (negligible pull by ~ten Reviews `[A-3]`); (3) median time to first reply; (4) recency of Verification; (5) **rotation among near-equals** ("their order varies between searches"). "**Neither what a Vendor pays nor how recently they joined is a signal**." **Disclosure copy is a requirement:** "The parameters that determine organic ordering are disclosed to Families in plain language, **reachable from the results themselves**. That disclosure states: results are ordered by availability for your dates, then by rating adjusted for how many reviews it is based on, then by reply speed, then by how recently the vendor was verified — **and that vendors of similar standing are shown in a varying order, so no one holds the top place permanently.** It states that vendors cannot pay for a position, and that paid placements appear separately and are labelled."
- **FR-21 Comparing a Shortlist side by side** (UJ-1). "**The attributes compared are the Service's own, configured per Service** — a venue compares on capacity and Rules, a photographer on deliverables and delivery timeline." "The comparison shows each Listing's availability against each Candidate Block, so the collision in FR-15 is visible here too." "Comparison is within a Service. Nothing compares a caterer to a photographer."
- **FR-22 Shortlists** (UJ-1). "**Adding to a Shortlist costs nothing and commits to nothing.** It does not move the running budget." Selecting "does not notify the Vendor, reserve anything, bind anybody, or **engage** anyone". "**An account cannot select its own Listing**" (FR-39). "While a Service is still at the Shortlist stage, availability is shown per Listing." Invited Members can suggest a Listing only.

### 4.5 Vendor Listings

Group framing: "A Listing is what Dattatray is actually paying for. It has to carry enough for Rutuja to decide **without phoning him** — real photographs of real events, a price with nothing hidden behind it, what he will and will not allow on his property, and who he trusts to work there."

- **FR-23 A Listing can hold several Spaces** (UJ-2). Each Space: own capacity, **Stated Size**, all-in price and calendar. "**The Family engages a Space, not a Listing.**"
- **FR-24 Rules are published, and they bind what the Family may choose** (UJ-1, UJ-2). "Rules are a **condition of listing**." "Rules are visible on the Listing **before** the Family engages, never afterwards only." A Rule may restrict a Service to Preferred Vendors. "**The Family can see, before engaging a Space, which Services that Space will close off.**"
- **FR-25 Preferred Vendors** (UJ-2). "**A named Vendor must accept the association before it is published.**" "**Where a Preferred Vendor is the same business, it is shown as the same business** — never presented as an independent recommendation." "Preferred surfacing is not paid placement and cannot be purchased."
- **FR-32 A conflicting Rule is surfaced before it takes effect, never after** (UJ-1, UJ-3). "Before the Family engages a Space or Listing, they are shown **by name** every Shortlist entry and every Agreement that this Vendor's Rules would make impermissible." "They cannot proceed without accepting that consequence explicitly." "**Nothing is ever removed silently.** The Family never discovers a Vendor missing from their Shortlist without having been told why and having agreed to it."
- **FR-26 Pricing follows the Service's own model** (UJ-2). "Price is expressed per the Service's model: per Span, per Function, per head, per unit, per rental period." "**The price is all-in.** The no-hidden-charges declaration is published on the Listing." "the Family always sees the price applicable to their own Block."
- **FR-33 Where a Vendor works** (UJ-1, UJ-2). Place hierarchy village/town → tehsil → district → state → country. "**A service area says where a Vendor is willing to travel to work. It is not a paywall and is never sold.**" "**Nothing in the platform assumes a single city.**"
- **FR-71 What each Service is required to carry** (UJ-1, UJ-2). Additional conditions of listing, per Service:
  - **Catering — a headcount recommendation.** "The platform recommends a quantity for a Function and **shows what it was built from**… Where a guest list exists, confirmed RSVPs refine it and **the Family is told the figure will move as replies arrive**. They adjust or accept it, and only then does it travel with an Enquiry."
  - **Photography — the named person.** "A Listing states **who will actually shoot**… Where the named person changes, the Family is told before the wedding, not after."
  - **Décor & Mandap — sizing against the real space.** Space's Stated Size and Rules available to Décor Vendors quoting.
  - **Band Baaja Baraat — no demands on the day.** "The Vendor publishes a declaration that no additional payment will be sought during the event."
  - **Venue — seeing it before taking it.** "A Family can request a site visit or a virtual tour from the Listing itself."
  - Seed configuration table (FR-71): Venue = Span / per Span / capacity / Function's stated guest count / has Spaces. Catering = per Function / per head / capacity `[A-4]` / Function's stated guest count / no Spaces. Photography = per Function / per Function / crew bandwidth / none / no. Décor & Mandap = per Function `[A-5]` / per Function / none / engaged Space's Stated Size / no. Band Baaja Baraat = per Function / per Function / crew bandwidth / none / no.
- **FR-27 Portfolio** (UJ-2, UJ-3). "Photographs are of events the Vendor actually delivered." "**How many a Listing may publish is its Tier's portfolio allowance (FR-50).** A Listing over its allowance after a Tier change **keeps every image and publishes up to the allowance**; nothing a Vendor uploaded is destroyed by a change of plan."

### 4.6 Vendor Calendar

Group framing: "Everything Rutuja is promised rests on this one screen being honest… The platform's answer is to make the calendar **cheap to keep** — Agreements block it without him touching anything, and where he might have drifted **it asks rather than assumes**. It never presents his availability as its own claim."

- **FR-28 Keeping availability** (UJ-2). Per Space where the Service has Spaces, per Listing where not. "Availability is expressed in **Slots** — morning, afternoon, evening, night `[ASSUMPTION A-2]` — not whole days. **A morning Haldi does not consume an evening Reception.**" "**The four Slots are the same for every Service.**" "A Vendor can block Slots for maintenance, family use or any reason, **without stating one**." "A confirmed **Agreement blocks the relevant Slots or Span automatically**… The Vendor does nothing." "For a Service with no calendar, availability reduces to whether the Vendor is currently accepting Enquiries."
- **FR-29 Nudging a calendar that may have drifted** (UJ-2). Trigger: "**three or more** [Enquiries] touching the same period". "**At most one nudge per Vendor per seven days**… This is a prompt to the person paying you, not a campaign." Reaches them on **WhatsApp**, "not only inside the portal". "**A Vendor who does not respond is not penalised, and their availability is not changed by the platform.** Silence is not treated as unavailability."
- **FR-30 Pricing that moves with the season** (UJ-2). Vendor-defined periods. "A Family always sees the price applicable to **their own Block**, not a headline price they will later be quoted differently against."
- **FR-31 Seeing where the year is empty** (UJ-2). "A Vendor can see which of their Slots are empty, and which are drawing no interest." "**This view is the Vendor's own. It is never shown to Families, and empty availability is never marketed as distressed.**"

### 4.7 Enquiries

Group framing: "Elsewhere a Vendor receives 'someone is interested in your venue' and has to start from nothing. Here Dattatray receives a wedding: 27 November through the 28th, 600 guests, ₹8L across the whole event, Haldi and Wedding and Reception, and a Family who has already read his Rules and shortlisted him anyway."

- **FR-34 An Enquiry carries the wedding with it** (UJ-1, UJ-2). Carries Block, Functions with days and Slots, guest count, budget context, and which Space/offering. "**A Vendor never has to ask a Family for information the platform already holds.**" "**A Family can send one Enquiry to several Listings in a Service at once**… without composing it repeatedly." "**Each Vendor receives their own thread.** No Vendor sees which others were approached, how many, or what they quoted." "**The Lead Dashboard distinguishes an Enquiry sent to several Vendors from one sent only to that Vendor.**" "An Enquiry is contact, not a transaction."
- **FR-35 One thread, both sides, one truth** (UJ-2, UJ-3). "Both parties see the same messages in the same order." "**The thread of record lives in the platform.** WhatsApp carries a notification containing the Enquiry summary and a link into that thread; **it is never itself the conversation surface**." "The Vendor is notified on **WhatsApp**; the Family **in the app**." WhatsApp failure falls back to SMS. "Neither party can alter or delete what was said." "**An Enquiry with no Vendor reply after thirty days is shown to the Family as unanswered**, so she stops waiting. **Nothing is held against the Vendor for it.**"
- **FR-36 Contact Reveal** (UJ-2). Obtainable from the Listing or thread; counted and attributed on the Lead Dashboard. "Nothing prevents the parties continuing off-platform."
- **FR-37 The Vendor records what became of it** (UJ-2). States: **sent** → **answered** or **unanswered** (30 days). Vendor marks **contacted**, **site visit arranged**, **won**, **lost**. "**An outcome is never shown to the Family**, and never affects the Vendor's public standing or their position in results." "Reply speed is a different thing from an outcome, and it does affect ranking (FR-20)."
- **FR-38 Site visits** (UJ-2). Offered from within the thread; the Family accepts a time; "An arranged visit appears in the Family's Workspace alongside the Wedding." "A site visit reserves nothing and blocks no Slot."

### 4.8 Agreements

Group framing: "The Agreement is the quietest thing in this product and it carries the most weight… It is also the point at which Vivah Spot **most carefully does nothing**."

- **FR-39 Terms are proposed, then confirmed by both sides** (UJ-3). Vendor proposes: "the days and Slots, the Space or offering, the guest count, the all-in price, what is included, **the delivery timeline from their Commitment**, and the Rules that apply." "**The platform supplies the structure; every value in it is the Vendor's.** No term is pre-filled, suggested or defaulted by Vivah Spot, and there is no standard form of agreement the platform authors." "The Family confirms, then the Vendor confirms. **An Agreement does not exist until both have.**" "**The two confirming parties must be different accounts.**" "**Nothing holds a Slot before an Agreement exists.**" "**Confirmation is first-writer-wins.**… the Vendor is told which engagement conflicts." "The Family whose confirmation is overtaken **is told**, and the proposed terms return to the thread as **declined-by-conflict** rather than silently expiring."
- **FR-40 What an Agreement does** (UJ-2, UJ-3). Timestamped; Slots/Span blocked automatically; "appears as committed in the Family's Workspace, and its agreed figure replaces the estimate in the running budget"; sole gate for Review rights; "**Both parties can download a copy at any time.**"
- **FR-41 What an Agreement is not** (UJ-3). "**No surface, document, notification or item of copy describes the Agreement as legally binding, enforceable, guaranteed or underwritten by Vivah Spot.** The platform states what it did — recorded terms both parties confirmed — and nothing beyond that." No mediation, no fault determination, no dispute resolution process. No money. No default terms.
- **FR-69 Amending an Agreement** (UJ-3). Either party proposes; both confirm. "**The original is never altered.**… every prior version stays retrievable." "**No cancellation is recorded**… A cooperative change is not a walk-out and must not be counted as one." "**Where the Family revises a Function's stated guest count away from the figure in a confirmed Agreement, they are prompted to amend.** Arriving RSVPs never trigger this on their own… **the divergence is never left unshown**."
- **FR-42 Cancelling** (UJ-3). Either party, at any time. Slots released immediately. "A cancellation is recorded on both profiles as a countable fact, **with no fault attributed or inferred, displayed as a neutral number**." "**The displayed count covers a rolling twenty-four months.**" No Review unlocked. Figure removed from running budget.
- **FR-43 The record has to survive being needed** (UJ-3). Frozen at confirmation; cryptographic digest; trusted time source; append-only history; **retained eight years** beyond the wedding; named accountable custodian; a certificate attesting how the record was produced.

### 4.9 Reviews

Group framing: "Reviews are **the only consequence a Vendor faces** on Vivah Spot. There is no money to withhold and no delisting for poor service."

- **FR-44 Only a real engagement earns a review** (UJ-3). "A competitor cannot review a rival by enquiring with them." "One Agreement earns one Review from each side."
- **FR-45 The window opens on Delivery** (UJ-3). Opens when the Vendor marks delivered **or** the published delivery timeline passes — whichever first. "**In no case does it open later than one year after the Wedding's last day**… **There is no path to being unreviewable.**" "**The timeline is a duration, and it runs from the last day the Service was engaged for**". "**The timeline that governs is the one captured in the Agreement at confirmation, not the Listing's current value.**" "A Vendor can open the window early by delivering early. **A Vendor cannot hold it shut by delivering late.**"
- **FR-46 A Family reviews a Vendor publicly** (UJ-3). Rating + free text, published on the **Listing** engaged; a Vendor with Listings in several Services "is rated separately in each". "The rating is **one to five whole stars**. Nothing finer, because nothing finer is meaningful." "The reviewer is a verified party to a real Agreement, and **is shown as such**." "**Reviews are never edited, reordered by sentiment, or selectively published.**" "**The basis on which reviews are sorted is disclosed to readers.**" "The Vendor has a **right of reply**, published alongside."
- **FR-47 A Vendor reviews a Family through structured questions only** (UJ-3). "A Vendor answers a fixed set of questions — **responsiveness, whether the agreed headcount held, and whether the premises were left as agreed. These three and no others.** **No question asks about money**". "**No free text.** A Vendor cannot write prose about a named Family anywhere in the platform." "The result is visible to other Vendors receiving an Enquiry from that Family, **and to the Family itself. It is never published publicly.**" "The Family can see everything recorded about them. **There is no dispute process**".
- **FR-48 Neither side writes into the other's shadow** (UJ-3). "Neither party can see the other's review before submitting their own." "**The window is fourteen days from opening.**" "Nothing can be written on the fifteenth day." "**A review is published when the window closes even if the other side never wrote one.**"
- **FR-49 Moderation is neutral** (UJ-3). "Reviews are moderated only for unlawful content, personal data that should not be public, and abuse." "**A review is never removed, delayed or demoted for being negative**, and moderation criteria do not vary with rating." "A removed review is recorded as removed, with the reason, and **the author is told**."

### 4.10 Subscription & Billing

Group framing: "This is the only money the platform ever touches. Dattatray pays to be listed; **no one else pays anything, ever**. Because there is no auto-renewal, he makes a fresh decision every term — which means the Lead Dashboard in 4.11 is not a nice extra, **it is the entire renewal argument**."

- **FR-50 Tiers, and what actually differs between them** (UJ-2). Tiers: **Founding Vendor**, **Basic**, **Featured**. "What differs between Tiers is: **placement in the marked Featured band, and portfolio allowance** — how many images a Listing may publish. **Nothing else.**" "A Listing that exceeds its allowance after a Tier change keeps its images and publishes them up to the new allowance." "**A Subscription is held for one Service.**" "**A Subscription buys no territory and limits no reach.**" "**What never differs is any condition of listing.**… Paying buys visibility and allowances, never an exemption." "**No tier buys position within organic results.**" "Price is set per Service, per the Vendor's own Place, per Tier — by Admin, without a code release." "**Price is never a function of reach.**" A price change "never alters what a Vendor already bought". "The actual figures are a business input, set outside this document." → **PRD is silent on the actual prices; a designer must not show example figures as if decided.**
- **FR-51 The Founding Vendor tier carries no strings** (UJ-2). "**Expiry is a fixed calendar date set per cohort**, not a term running from each Vendor's sign-up." "**No obligation of any kind attaches to it** — no testimonial, no exclusivity, no minimum term, no lock-in, no commitment to convert." "A Founding Vendor sees the same Lead Dashboard as any other."
- **FR-52 Paying, and being invoiced properly** (UJ-2). "**The term is twelve months.**" "A **GST-compliant tax invoice** is issued for every payment and is **downloadable at any time**." "Tax is determined by the recipient's State." "The platform collects no money other than Subscriptions."
- **FR-53 Expiry** (UJ-2). "A Vendor is reminded **thirty, fourteen, seven and one day** before their term ends, **on WhatsApp and in the portal**. With no auto-renewal, **the reminder is the renewal mechanism**." **Grace Period thirty days**, Listing stays live. After it, the Listing is **withdrawn from discovery** — no search, comparison or matching, no new Enquiry. "**Existing engagements are untouched.**… A Vendor who lapses still owes the weddings they took." "A Family with the lapsed Listing on a Shortlist **is told** it is no longer available. **Where it was their Selection, the Selection is cleared and its contribution withdrawn from the running budget. Nothing is removed silently.**" "**Nothing belonging to the Vendor is destroyed.**" "Reviews already published about a lapsed Vendor remain published."
  - **The four-route rule (UX-critical, referenced repeatedly):** "**Leaving discovery — all four routes, and they behave identically for Families.** A Subscription lapsing past its Grace Period; the Vendor withdrawing it themselves (FR-70); Admin removing the Vendor (FR-60); and a condition of listing ceasing to be satisfied (FR-59, FR-71). In every case: the Listing stops appearing and accepts no new Enquiry; existing Agreements, open threads and review windows are untouched; and every Family holding it on a Shortlist or as a Selection is told, with the Selection cleared and the budget adjusted. **No route removes a Listing from a Family's view without telling them.**"
- **FR-54 Renewal is an active decision** (UJ-2). "There is no auto-renewal, standing mandate or stored instruction to collect. Every term is paid by a deliberate act." "No arrangement makes a Subscription non-cancellable, and no term is presented as irrevocable."

### 4.11 Lead Dashboard

Group framing: "Dattatray is asked to pay again every year with nothing compelling him to. **This screen is the whole argument.** It has to answer one question honestly: *what did I get for my money?* — and it has to keep answering it when the answer is unflattering, **because a dashboard that only looks good stops being believed**."

- **FR-55 What the Vendor can see about their own performance** (UJ-2). Shows "Listing views, Contact Reveals, Enquiries received, the Vendor's own response times, and outcomes as the Vendor recorded them". "**Response time is the median time to first reply**, not the mean. One bad fortnight should not define a good Vendor." "Figures are shown over time, so a Vendor can see a season rather than a snapshot." "**Figures are not curated. A poor period is shown as a poor period.**"
- **FR-56 What it cost per lead** (UJ-2). "The dashboard states what the Vendor paid for the term and what it produced — Enquiries received, and the resulting **cost per Enquiry**." "Where the Vendor has recorded outcomes, **cost per won engagement** is shown too." "For a Founding Vendor the cost is ₹0, and the figures still accumulate."
- **FR-57 How they compare** (UJ-2). Compares against aggregates for the Vendor's Service in their Place — "response time, conversion, enquiry volume". "**Comparisons are aggregate only.** No other Vendor is ever identified." "**No comparison is shown at all unless at least five Vendors are active in that Service and Place.**" "Comparisons are framed to be actionable — a Vendor who replies slowly is told what fast replies look like."

### 4.12 Trust & Verification

Group framing: "Everything the platform claims about a Vendor is only as good as a person who drove out and looked… The platform provides the workflow and the record; it cannot provide the diligence."

- **FR-58 Nothing lists without Verification** (UJ-4, UJ-2, UJ-3). Identity, business registration and portfolio authenticity verified before publication. Recorded against the Admin user, with when and on what basis. "Verification is not a self-declaration a Vendor can make about themselves." "**Changing what was verified requires verifying it again.** New portfolio images, a change of business identity or a new Space are **not publicly visible** until Verification has covered them."
- **FR-70 Becoming a Vendor** (UJ-2, UJ-4; measured by SM-1). "A Vendor **self-registers**, builds their Listing, and submits it for Verification. **No Admin action is needed before that point.**" "Work in progress is saved as it is entered. A Vendor can leave and return without losing anything, as a Family can." "**A Vendor can always see where they stand: what is still missing, that Verification is pending, that it has succeeded, or that it has failed and why.**" "**Verification failure is a state a Vendor can act on**, not a rejection. They correct what was wrong and resubmit." "A Vendor may **withdraw a Listing from discovery** themselves at any time, without losing it."
- **FR-59 Conditions of listing** (UJ-4, UJ-1, UJ-2). "A Listing cannot be published without: **completed Verification, an all-in price, published Rules, and a published Commitment** — the delivery timeline, what is included, and the no-hidden-charges declaration." "**The delivery timeline is not optional.**" "It is stated as a duration running from the last day the Service was engaged for… **Zero is a valid answer and is the common one.**" "These apply identically at every tier including Founding Vendor."
- **FR-60 Removal** (UJ-4). Grounds: "fraud, falsified Verification, stolen or misrepresented portfolio, or impersonation — **not for service quality**, which is answered by Reviews alone." "**A Family holding an Agreement with a removed Vendor is told that the Vendor was removed** — not merely that a Listing is gone — and asked to find another Vendor for that Service." "The platform **does not cancel the Agreement**… The Family ends it if they choose, and **that cancellation is not counted against them** — they did nothing." "**No complaint pipeline, standing score or automated delisting exists.**" "On removal, Reviews already published remain published."

### 4.13 Admin Console

Group framing: "Admin is a small team doing three jobs: verifying Vendors in person, configuring the catalog as it grows, and meeting the obligations that fall on any Indian platform hosting other people's content. Everything is available to every Admin user; what matters is that actions are attributable."

- **FR-61 Admin has every capability** (UJ-4). "**No scoped roles, permission tiers or approval chains exist.**" Admin still cannot alter a confirmed Agreement, edit or suppress a Review, or erase an audit record. "Access to Guest contact data is confined to those with an operational need, and is **logged**." "**Every Admin action that changes a Vendor's standing, a Listing's visibility, published content, or a person's access to their own account is attributed to the individual who took it**, with a timestamp, and cannot be erased. **Account recovery under FR-1 is such an action**… the single most sensitive thing Admin does."
- **FR-62 The catalog is configured, not built** (UJ-4). **[AMENDED]** Admin configures a Service's **declarations** — "its taxonomy, filters, comparison attributes, Sizing Attribute, Order Basis, Engagement Model and pricing model" — without a release; **field set and behaviour are code**. Admin can open a new Place at any level without a release. Admin sets Subscription prices per Service, per Place, per Tier. "**A configuration change never rewrites what already happened — for presentational declarations.** Existing Listings, Shortlists, Enquiries and Agreements keep the shape they were created under… Where a change would make an existing Listing incomplete, **that Listing keeps its published state and its Vendor is asked to supply what is now needed.**"
- **FR-63 The obligations of hosting other people's content** (UJ-4, UJ-3). **UX-visible:** "A named **grievance officer** is published, with contact details **reachable from every surface**." "Every complaint is **acknowledged on receipt, given a reference the complainant can quote**, and disposed of within **seven days**." Unlawful content removed within **thirty-six hours**; court/government order within **three hours**; government information requests within **seventy-two hours**; removed content retained **one hundred and eighty days**. "Users are **reminded of the platform's terms and the rules governing what may be posted at least once a quarter**." Every removal logged with ground, authority and Admin user.
- **FR-64 Disclosure** (UJ-4, UJ-1, UJ-2). "The main parameters determining organic ordering are published in plain language, **reachable by any Family**" (content specified at FR-20). "Any differentiated treatment between Vendors is stated in the **Vendor terms**." "**These are two separate disclosures to two separate audiences, and both exist.**"

### 4.14 Real Weddings & Inspiration

Group framing: "A Family that has just finished a wedding is holding the most persuasive thing on the platform… **What this is not is a social network. There is no feed to follow, no comment thread, no guest posting, no hashtag and no stream.**"

- **FR-65 A Family can publish their wedding** (UJ-1, UJ-3). "The Wedding's Creator can publish photographs, the Vendors engaged, the Functions held and an **approximate cost**." "**Only Vendors with an Agreement for that Wedding can be named as having worked on it.**" "Published weddings are browsable by others, and a Vendor named in one gains verified evidence of real work on their Listing." "**Publishing is entirely optional and never a condition of anything.**"
- **FR-66 Consent governs what is published** (UJ-3). "The Family gives **explicit consent to publish, separately from any other consent**, and can withdraw it at any time." Withdrawal removes it from discovery "including any Vendor evidence derived from it". "**A named Vendor can decline to be credited**, and their name is removed without removing the wedding." "**Guests are not named, tagged or identified.**" "**Approximate cost is published as a band**, never as another party's confidential figure."
- **FR-67 Inspiration** (UJ-1). "A Family can save images and Listings to **boards** within their Workspace." "Boards are private to the Wedding and its Invited Members." "**Saving a Listing to a board does not shortlist it, enquire about it, or affect the budget.**" "**There is no following, no public board, and no interaction between Families.**"

---

## 6. Non-Functional Requirements (§5) — the constraints that shape every screen

### 6.1 Language (NFR 5.1)

- "**The interface ships in English.** Marathi and other regional languages are not shipped."
- "Language is deliberately **not** modelled as an app-wide switch that flips everything into one language. **Mixed-language use is the norm among these users, not an edge case**, and a binary toggle serves nobody well."
- "The interface is English throughout, on every surface."
- "**Content is stored and shown exactly as the person wrote it** — a Vendor's Rules, Commitments and Listing descriptions, a Family's review — in whatever language or mixture of languages they used. The platform does not translate it, normalise it, or require a language to be declared for it."
- "**No app-wide language switch is offered.**"
- *Technical note:* i18n is wired from day one as insurance, "not a commitment to ship a second language now."
- **Design consequence:** every text container must tolerate Devanagari and Latin script mixed in the same field (Vendor Rules, reviews, Listing descriptions, Function names) while the chrome stays English.

### 6.2 Surfaces (NFR 5.2)

- "**Families** are served by a mobile application on **both Android and iOS**. **iOS is not deferred.**"
- "**Vendors** are served by a **responsive web portal that is phone-first**. Dattatray works from his phone at a function, not from a desk, and '**responsive' here means designed for that case rather than tolerating it**."
- "**Admin** is served by a web panel."
- Plus two public pages named in NFR 5.8: **the RSVP page and the guest form**.
- "*This supersedes Scope §9 and §11, which deferred iOS.*"

### 6.3 Performance / device class / connectivity (NFR 5.3)

- "**Families are on mid-range Android phones on patchy mobile data, often at a venue or in a market. Vendors are on phones between jobs.**"
- "Search, comparison and Block matching remain usable on **low-bandwidth connections and low-end devices**."
- "**Imagery is the bulk of this product's weight** and is delivered accordingly — **sized for the device, cached, and never blocking the content around it**."
- "**Work in progress survives a lost connection.** Nothing a Family has entered is lost to a dropped signal." (also FR-7, FR-70)

### 6.4 Availability / seasonality (NFR 5.4)

- "The wedding calendar is **violently seasonal**. Muhurat clusters demand into a handful of weeks, and Chaturmas empties months at a stretch."
- "The platform is sized for **peak muhurat load**, not for average load."
- "Vendor-facing surfaces stay available during peak, because that is when a missed Enquiry costs a Vendor a wedding."

### 6.5 Data protection (NFR 5.5) — the UX-visible parts

- "**Guest contact details are used to compose that Wedding's invitations and for nothing else.** They are never used for marketing, never messaged by the platform, and never used to build an audience."
- Erasure: "thirty days after the Wedding concludes under FR-72, or **immediately on abandonment**. **A dismissed guest-form submission is erased at once**."
- "**Every person whose data is held can see it and correct it, including people who never held an account.**"
- Erasure is available except for a confirmed Agreement and its evidence trail (eight years), a published Review, and an Admin action log; "Everything else — Guest contacts, Shortlists, Boards, guest lists, an unconfirmed Wedding — is erasable on request."
- "Where a record must be retained, the person is **pseudonymised within it rather than refused**… A Review's text stands with its author de-identified."
- "**Where erasure is refused or limited, the person is told which retention basis applies.**"
- "**Consent is specific, informed and separately given for each purpose, and withdrawable as easily as it was given.**"
- Breaches reported to regulator and affected people within **seventy-two hours**.
- **"No dark patterns. Nothing is designed to obtain a consent, a subscription or a permission the person did not intend to give. Paid placement is labelled. Nothing is pre-ticked. Cancelling is as easy as starting."**

### 6.6 Legal posture (NFR 5.6) — binding on copy

- "**Vivah Spot is not a party to any engagement between a Family and a Vendor.** It takes no commission, holds no money, authors no terms, offers no assurance, and mediates no dispute."
- "**No surface anywhere describes an Agreement as legally binding, guaranteed, enforced or underwritten by Vivah Spot.**"
- "The platform makes **no guarantee about vendor performance, delivery, quality or attendance**. It publishes what Vendors themselves declare, and **it says who is speaking**."
- "**Availability is always attributed to the Vendor, never asserted by the platform.**"
- "**Marketing copy, app copy and vendor-facing material are all bound by this.**"

### 6.7 Records (NFR 5.7)

- Agreements, Verifications, Reviews, account recoveries and standing/visibility-changing Admin actions are "retained, attributable, and **not silently alterable**". "Corrections are appended. Nothing is overwritten."

### 6.8 Accessibility (NFR 5.8)

- "**Every surface** meets **WCAG 2.1 AA** — the Family application, the Vendor portal, the admin panel, and the two public pages: **the RSVP page and the guest form**. Both public pages are included deliberately. The RSVP page is the platform's largest public surface, seen by hundreds of Guests per Wedding. **The guest form is the stronger case still: many who reach it do so because someone forwarded the link, and none of them chose to be there at all.**"
- "**Nothing essential is conveyed by colour alone — verified status, availability and paid placement each carry a non-colour indicator.**"

### 6.9 External dependencies with UX consequences (NFR 5.9)

Named as hard blockers, all business-owned: subscription prices and portfolio allowance per Tier (blocks FR-50, FR-27); Founding Vendor cohort definition and expiry date (FR-51); legal terms and privacy policy including the non-party statement (NFR 5.6, FR-41); GST registration and a payment gateway merchant account (FR-52); an initial Vendor pipeline (SM-7); **staff who physically visit and verify Vendors** (FR-58, "and with it the whole trust spine"); a named grievance officer (FR-63); a named individual accountable for evidential records (FR-43).

---

## 7. Identity, tone, voice, trust, emotional intent

### 7.1 NFR 5.10 Identity and voice — verbatim, the primary source

*Preamble: "Recorded here because this PRD is the chain-top artifact and the identity currently exists only in code. It is not restated in full — `packages/shared/src/tokens.js` calls itself the single source of truth for colour and type, and it remains so. **Downstream UX work reads that file; it does not invent a palette.**"*

- "**The product is Vivah Spot.** The tagline is **"Big day, sorted."** — the tone the whole product is written in: **calm, capable, unfussy. Not romantic, not corporate.**"
- "**The palette is festive, not corporate.** A vivid rose-pink accent, a pink-to-marigold gradient, a warm pink-tinted shadow rather than a neutral grey one, and a soft pink-tinted white ground. **Headings are set in a display serif, body text in the system sans stack.** Exact values live in the tokens file."
- "**One token in the palette is an accessibility decision, not an aesthetic one.** The muted text colour was deliberately darkened to meet contrast on white. **It must not be lightened, whatever a future design pass prefers.**"
- "**The voice is plain and confident.** It states what is true — 'vendor shows available', not 'available'; 'we recorded what you both agreed', not 'your booking is protected'. **The restraint the legal posture demands is also the tone the brand wants**, which is convenient: **this product's credibility comes from not overclaiming.**"
- "**Cultural specificity is a feature, not a localisation problem.** **Muhurat, Chaturmas, Haldi, Sangeet, Vidaai, Griha Pravesh, Sakharpuda, Kelvan, aaher, baraat** — these are the vocabulary of the market, and **the product uses them plainly rather than translating them into generic wedding-industry English**. The Function set is not limited to the five named in FR-9; those are a starting set, and **Families name their own**."

### 7.2 Emotional intent stated elsewhere

- §1 Vision: "**The north star is a hassle-free wedding**, and it is meant to be **used rather than admired**." "**every Service configuration, every screen and every requirement must be able to defend itself against the question of whether it actually makes the wedding less of an ordeal.** A Service that merely lists Vendors has not earned its place."
- §1: "the day cannot be rerun, so every one of those decisions is made once, under pressure, with no way to compare and no recourse if it goes wrong."
- §1 on trust: built "**before the engagement rather than enforced during it**… **It is a weaker instrument than holding the money, and it is stated as such.** It is also far more than the town has now."
- §4.2: "**the planner carries as little as possible.**… She is never asked to retype something it could have carried across, and never asked to maintain a record for the platform's benefit."
- §4.4: "**every screen that makes her restate what the platform already knows is a screen that wastes her time.**"
- §4.5: a Listing "has to carry enough for Rutuja to decide **without phoning him**."
- §4.6: make the calendar "**cheap to keep**… where he might have drifted **it asks rather than assumes**."
- §4.8: "The Agreement is the quietest thing in this product and it carries the most weight… **the point at which Vivah Spot most carefully does nothing.** That restraint is not timidity."
- §4.11: "**a dashboard that only looks good stops being believed.**"

### 7.3 Specific copy decisions, with the stated reason

| Copy | Reason given | Cite |
|---|---|---|
| "**shows available**" (never "available") | freshness rests on a nudge, not enforcement | FR-13, FR-19, FR-29, UJ-2, NFR 5.6, 5.10 |
| "**no reviews yet**" (never a zero, blank rating or borrowed average) | "a display implying they scored badly would be false" | FR-19 |
| "**not yet estimated**" (never ₹0) | "**Zero reads as free.**" | FR-8 |
| Cancellation count as "**a neutral number, never as an accusation**", rolling 24 months | no fault is attributed or inferred | FR-17, FR-42 |
| Nudge copy "you have N Enquiries for the 27th — still free?" | "a prompt to the person paying you, **not a campaign**"; max 1 per 7 days | UJ-2, FR-29 |
| "**a single discreet line**" of Vivah Spot attribution on the invitation | never inside Vendor artwork, never on a physical card, never removable, never sold | FR-12 |
| "**one quiet line**" on the RSVP page for a Guest planning their own wedding | the only designed growth channel; must be earned | UJ-5, FR-12, SM-6 |
| Enquiry shown to the Family as "**unanswered**" after 30 days | "so she stops waiting. **Nothing is held against the Vendor for it.**" | FR-35 |
| Terms returned to the thread as "**declined-by-conflict**" | never "silently expiring" | FR-39 |
| "**we recorded what you both agreed**", not "your booking is protected" | the legal posture and the brand voice coincide | NFR 5.10 |

---

## 8. Explicit non-goals (§7 Scope Boundary)

*§7 preamble: "Not a phase boundary. This PRD describes the complete platform; this section states what that platform deliberately does not do… **An agent that finds a gap here should treat it as a gap, not as permission.**"*

- **§7.1 Money.** "**No money passes between a Family and a Vendor through Vivah Spot. Ever.**" Excluded: "booking payments, token or advance payments, escrow, milestone releases, commission, split settlement, payouts, payout KYC, refunds, and any wallet, cart or checkout." "This is not a deferral. It is the commercial model." Only Vendor Subscriptions are collected. → **No payment, cart, checkout, wallet, payout or refund screen exists anywhere on the Family side.**
- **§7.2 Standing between the parties.** Excluded: "dispute mediation, adjudication of fault, **any complaint pipeline about service quality** that leads to a consequence, vendor standing scores, and delisting for poor service." **Not excluded and not optional:** the statutory grievance and takedown mechanism (FR-63). "Service quality is answered by Reviews alone."
- **§7.3 Supply the platform provides itself.** Excluded: "first-party services supplied by Vivah Spot, **platform-assembled multi-vendor bundles**, **vendor-authored multi-service packages**, the **Wedding Manager** role, and insurance or any other product distributed by the platform." "**A Family assembles her own set.**" → **No "packages", no bundle cards, no all-in-one wedding plan UI.**
- **§7.4 Social.** Excluded: "following, feeds of other people's activity, hashtags, guest posting, platform-hosted live streaming, comments, likes, and **any interaction between Families**." Included and not to be confused: publishing one's own completed wedding, and private inspiration Boards.
- **§7.5 Guidance the platform is not qualified to give.** Excluded: "any compliance layer covering permits, noise curfews, firework restrictions or animal welfare; any statement of local law; any legal guidance." "Those constraints reach Families as **a Vendor's own published Rules**."
- **§7.6 Automation of the Family's judgement.** Excluded: "ranking or scoring Candidate Blocks by partial availability, recommending one Block over another, choosing or substituting a Vendor, silently removing anything from a Shortlist, and **placing an order at a quantity the Family did not decide**." **Not excluded:** "helping the Family arrive at that quantity. The platform may compute and show a recommended figure — plates, rooms, vehicles — from what it already knows, **and explain how it got there**. The line is between *suggesting* and *deciding*: **the recommendation is always visible, always adjustable, and never travels to a Vendor until the Family has confirmed it.**" "**The platform shows the collision. The Family resolves it.**"
- **§7.7 Deferred, with the path left open.** **Auspicious-date computation** — "The option is presented; the path is not built." **Regional language** — English only; i18n wired as insurance; "**There is no app-wide language switch, and user content is never translated or normalised.**"
- **§7.8 Structural exclusions.** "**Multi-user Vendor accounts.** One login per Vendor. No roles, no invitations." "**Admin role tiers.** Every Admin user has every capability. Attribution, not restriction, is the control." "**Auto-renewal.** No mandates, no stored instructions, no non-cancellable terms." "**Gift registry.** Removed entirely — as a feature, as a partner integration, and as a wishlist."

---

## 9. Success metrics with UX consequences (§6)

*"Targets are a business decision and are not set here."* → **PRD is silent on numeric targets.**

- **SM-1** Onboarding a Vendor is effortless — "median time from a Vendor starting sign-up to their Listing being published; proportion of started onboardings that reach a published Listing." Counter-measure: falsified listings. "**Onboarding speed that comes from checking less is not success.**" (Realized by FR-70.)
- **SM-2** Vendors find value for money — renewal rate at the first paid term; cost per Enquiry; **Enquiry quality**: "**Volume of Enquiries is trivially inflatable and worthless if they are junk**"; **distribution across Vendors** (the reason FR-20 rotation exists).
- **SM-3** Vendors are happy — proportion actively maintaining calendar and responding; response times over a season.
- **SM-4** Families are happy — "proportion of Weddings that reach a **locked Chosen Block**; proportion that reach **at least one Agreement**"; ratings **distribution rather than mean**. Counter-measure: abandonment, especially "Weddings that lock a Block but produce no Agreement".
- **SM-5** A Family can build the wedding they wanted — "**Services per Wedding** fulfilled through the platform"; proportion where every selected Service reached an Agreement. Counter-measure: "**Breadth achieved by pushing Families toward whoever is available is worse than narrowness.**"
- **SM-6** Growth through the weddings it serves — "**RSVP page visits per Wedding that issued invitations**, and the proportion of Guests who go on to start a Wedding of their own." "this number can only be earned, since the Family sends the invitations and **no one can be messaged into the funnel**."
- **SM-7** Supply density — Vendors per Service per Place; counter-measure: "**the proportion of Candidate Blocks that clear a Family's whole set of Selections. This is the honest test of whether matching is doing anything.**"

---

## 10. Assumptions index (§7.10) — the five inferred values

*"treat these five as decided, because they are written normatively in the FRs above."* Two of them are directly UX-shaping:

| # | Assumption | Where | What changes if wrong |
|---|---|---|---|
| **A-1** | A Family may adjust one Candidate Block on its own, leaving the others as they are | FR-9 | "Blocks become strictly identical shapes shifted across Anchor Dates; a Family whose 22nd needs an evening Haldi cannot express it" |
| **A-2** | The four Slots are **morning, afternoon, evening, night** | FR-28, Glossary | "A different division of the day — three parts, or six — changes every calendar, every Function assignment and the matching engine's granularity" |
| **A-3** | Rating shrinkage becomes negligible at about ten Reviews | FR-20 | new-Vendor suppression window changes |
| **A-4** | Catering's Sizing Attribute is capacity — the most they can serve | FR-71 | caterers filtered/compared on a different attribute |
| **A-5** | Décor is engaged per Function rather than as a Span | FR-71 | "Décor becomes a Span Service, and the overnight build between Haldi and Wedding needs an explicit rule again" |

---

## 11. What the PRD is silent on — findings for the UX designer

These are gaps, not permissions (§7 preamble). Recorded so nobody fills them silently.

1. **PRD is silent on screen inventory, navigation structure, information architecture and any wireframe.** It names capabilities and one composite view (FR-10) and nothing else. No tab bar, no menu, no screen list.
2. **PRD is silent on onboarding/first-run for the Family app** beyond FR-1 sign-in and UJ-1 step 1 ("New install, signed in with phone and OTP"). No empty states are specified except FR-19's "no reviews yet" and FR-13's no-Anchor-Date browsing state.
3. **PRD is silent on any specific colour value, type scale, spacing scale, icon set or component library.** NFR 5.10 explicitly redirects: "`packages/shared/src/tokens.js`… is the single source of truth for colour and type… Downstream UX work reads that file; it does not invent a palette." One constraint is stated: the muted text colour "must not be lightened".
4. **PRD is silent on push notifications to the Family.** FR-35 says only "the Family in the app". WhatsApp and SMS are specified for Vendors (FR-29, FR-35, FR-53); nothing anywhere authorises a message to a Guest (FR-12 forbids it). Whether the Family gets a device push is not stated.
5. **PRD is silent on offline behaviour beyond persistence.** FR-7 / NFR 5.3 require work in progress to survive a lost connection; nothing states whether browsing, Listings or the Workspace are readable offline.
6. **PRD is silent on the Real Weddings browse surface** — where it lives, who reaches it, whether it is public or in-app (FR-65 says only "browsable by others").
7. **PRD is silent on the visual treatment of the Featured band** beyond "a distinctly marked band, identified to the Family as paid placement" (FR-20) plus NFR 5.8's requirement that it carry a non-colour indicator.
8. **PRD is silent on the RSVP page's content beyond UJ-5 step 2** (couple names, the date, the venue, "the three Functions and their times"), the platform-controlled link preview (FR-12), and the one quiet growth line.
9. **PRD is silent on numeric targets for every success metric** (§6 preamble) and on all subscription prices (FR-50).
10. **PRD is silent on how the Vendor's structured review of a Family is surfaced to the next Vendor** — FR-47 says it "is visible to other Vendors receiving an Enquiry from that Family, and to the Family itself", but not where or in what form.
11. **PRD is silent on the Admin console's own layout**, beyond FR-61's attribution requirement and Kiran's dual phone/laptop context (UJ-4).
12. **PRD is silent on the guest-list import mechanics** beyond "built by hand, brought in from the Family's own contacts, or **pasted in from a list they already have**" (FR-11).

---

## 12. Top design risks — the things this PRD makes it easy to get wrong

Ranked by how load-bearing the PRD makes them.

1. **Building a date filter.** FR-13: "**The Family never types a date into a filter.**" Availability is a pre-applied property of the whole Block, shown as "shows available" — not a control.
2. **Letting a Shortlist touch the budget.** FR-8/FR-22: a Shortlist "contributes nothing"; only Selections and Agreements count, a Span Selection once for the whole Span, and an undecided Service reads "not yet estimated", never ₹0.
3. **Ranking, scoring or recommending a Candidate Block, or resolving a collision.** FR-15 / §7.6: the platform shows the collision **by name** and the Family resolves it; no ranking, no per-Listing badge hiding the conflict, nothing removed silently.
4. **Overclaiming in copy.** NFR 5.6 / FR-41 / §7.9: no "booking", "cart", "checkout", "legally binding", "guaranteed", "enforced by Vivah Spot", "v1/MVP/Phase N"; availability always attributed to the Vendor; Agreement described only as a record of terms both parties confirmed.
5. **Treating the Guest pages as secondary.** NFR 5.8 puts the RSVP page and the guest form under WCAG 2.1 AA deliberately; UJ-5 requires a fifteen-second reply with no account, no install, no sign-in, revealing nothing but the Guest's own invitation and answer — and FR-12 makes the link preview the platform's principal public surface.
