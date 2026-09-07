---
title: Vivah Spot
status: final
created: 2026-09-03
updated: 2026-09-06
amended: 2026-09-06
---

# PRD: Vivah Spot

> Final, with one amendment. **[AMENDED 2026-09-06]** FR-62 and UJ-4 overstated what Admin can ship without a release; the architecture spine chose per-Service handler modules, so a Service's *declarations* are configuration while its *behaviour* and *field set* are code. The affected sentences are marked inline. See `../../architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md`, AD-5, AD-6 and AD-8.
>
> Produced in a journey-led coaching session with Abhishek Bankar, 2026-09-03 to 2026-09-06. Five correctness audits, one editorial pass and a closure pass were run against it; the reviews are retained alongside this file. The closure pass verified the last unaudited edit set by walking the term-to-consumer table rather than re-reading, added UJ-4 and UJ-5, and indexed every inferred value at §7.10. Every decision, and the reasoning behind it, is recorded in `.memlog.md`. Supporting analysis: `service-shapes-analysis.md`, `research-india-regulatory.md`, `research-landscape.md`.

## 0. Document Purpose

This PRD describes the complete Vivah Spot platform: what it does, for whom, and where it deliberately stops. It is the chain-top artifact for an autonomous build — UX, architecture, epics and stories are all derived from it — and that is what sets the standard it has to meet. Anywhere this document is silent or vague, an agent downstream will decide for itself, and nobody will own that decision. So the intent here is decision closure rather than description.

It is **not** phased. Sequencing belongs to epics and sprint planning. It carries capabilities, not implementation: technology choices live in `VivahSpot-Tech-Stack.md` and in the architecture that follows this. It builds on `VivahSpot-Scope-Document.md` v2.0 without duplicating it, and **supersedes that document wherever the two disagree** — the decisions that diverge are recorded, with their reasons, in `.memlog.md`. Vocabulary is fixed by the Glossary in §3 and is binding on every downstream artifact.

Features are grouped, with Functional Requirements nested and numbered globally as FR-1 to FR-N so that references survive any later reorganisation. **§7.10 indexes the five places where a value was inferred rather than decided** — everything else in this document was chosen deliberately. Journeys are numbered UJ-1 to UJ-N and referenced by ID. Cross-cutting requirements are in §5; what the platform will not do is in §7, and that section is as load-bearing as the features.

## 1. Vision

Planning a wedding in a town like Shrirampur means assembling fifteen or more Vendors by phone, from memory, on the strength of who someone's cousin used last year. Prices are quoted differently to different people. What is included is never written down. And the day cannot be rerun, so every one of those decisions is made once, under pressure, with no way to compare and no recourse if it goes wrong.

**Vivah Spot lets a Family build a wedding service by service, inside a budget, from Vendors who have been checked by a person.** Not a planner who takes the whole thing and hands back a number — a place where a venue, a caterer, a photographer and a decorator can each be found, compared on prices that mean the same thing, and engaged directly. The Family deals with the Vendor. No money passes through the platform, and no commission is taken from anybody's wedding.

The hard part is not the list. It is that a wedding is not one decision but a dozen interlocking ones: the days a guruji allows, the venue free across all of them, the caterer free on the same days, and the whole thing inside what the Family can afford. Today that is solved with a phone and a notebook, and every vendor who turns out to be unavailable sends the Family back to the start. **Vivah Spot treats the whole wedding as the unit** — the Family states its shape once and its possible days, and the platform works out which combination actually fits.

The north star is **a hassle-free wedding**, and it is meant to be used rather than admired. The platform will carry roughly fifty Services, each one configured rather than built, and configuration is exactly the kind of work that drifts into box-ticking. So the test is this: **every Service configuration, every screen and every requirement must be able to defend itself against the question of whether it actually makes the wedding less of an ordeal.** A Service that merely lists Vendors has not earned its place.

Vendors pay to be listed, and only Vendors pay. That is a deliberate choice with a consequence the platform accepts: with no money held, it can never compel a Vendor to perform. So trust is built before the engagement rather than enforced during it — verification by someone who visited, portfolios checked against real events, all-in pricing as a condition of being listed at all, rules published where a Family reads them before committing, and reviews that only someone who genuinely engaged that vendor can write. It is a weaker instrument than holding the money, and it is stated as such. It is also far more than the town has now.

## 2. Target User

### 2.1 Jobs To Be Done

**The Family planning the wedding.** Usually one person doing the running: a sister, a son, a cousin — whoever has the phone and the patience. They are not necessarily the couple, and they are of no particular age. They pay nothing.

- Find a day that works — one the guruji allows, that every vendor they want is free across, and that the budget survives.
- Stop repeating themselves. Say the guest count, the budget and the dates once, not to fifteen Vendors in turn.
- Compare prices that actually mean the same thing, without discovering the transport was extra.
- Know before committing what a venue will not allow — outside caterers, a DJ after ten, fireworks.
- Keep the whole wedding in one place: every function, every shortlist, what has been agreed, what it now costs.
- Let the Family help without letting the Family take over.
- Find Vendors who will not disappear, and know that the reviews were written by people who actually hired them.

**The Vendor.** A venue owner, caterer, photographer, decorator or band. **The only paying customer**, often working from a phone between jobs, whose year is shaped by muhurat and empty for months at a stretch.

- Be found by Families who are actually planning a wedding, not by browsers.
- Receive an Enquiry that already says the date, the guest count, the budget and the functions — so a quote can be given rather than negotiated toward.
- Show real work to people who can tell it is real.
- State the rules of the property once, and have them respected without an argument on the day.
- See what the subscription produced, in numbers, before deciding whether to pay again.
- Keep a calendar that does not need constant tending.
- Fill the dead months at a price that suits them.

**Admin and operations.** The client's own staff — the people the entire trust spine actually rests on.

- Verify a Vendor in person and record that it was done, by whom, on what basis.
- Add a service or open a new town without waiting for a release.
- Remove a fraud quickly, and leave the record of why.
- Meet the obligations of hosting other people's content in India.

### 2.2 Key User Journeys

*Numbered globally UJ-1..UJ-5. Persona context lives inline; there is no separate persona section. Every FR names the journeys it realizes. The five cover both sides of the marketplace, the trust loop between them, the operations staff the trust spine actually rests on, and the Guest — who never signs in and never sees the product, but is the only growth channel it has.*

#### UJ-1. Rutuja finds the one arrangement her brother's whole wedding actually fits into.

- **Persona + context:** Rutuja, home in Shrirampur for her brother Omkar's wedding. Their guruji has given three possible wedding days and the Family has a ceiling of about ₹8 lakh. She is the one doing the running around, which today means calling Vendors one at a time to ask what is free on the 22nd, then the 27th, then the 4th — and for each of those, asking again about the day before for the Haldi and the day after for the Reception. Every time one comes back unavailable she starts the whole sequence over.
- **Entry state:** New install, signed in with phone and OTP. No Wedding created yet.
- **Path:**
  1. Creates the **Wedding** — Omkar and Snehal, Shrirampur, ~600 guests, ₹8L budget — and enters the three wedding days her guruji gave her. The "help us find an auspicious date" option is offered at this point; that path is powered by an external astro service and is deferred.
  2. Lays out the shape of the wedding **once**: Haldi on the morning before, the Wedding that evening, the Reception the following evening, each with its own guest count. The platform shifts that same shape onto each of her three days, giving her three **Candidate Blocks** without her building anything three times.
  3. Selects the Services the wedding needs: Venue, Catering, Photography, Décor & Mandap, Band Baaja Baraat.
  4. Works through each Service. Verified real photos, all-in pricing with nothing hidden behind it, reviews, verified badges. Availability already reflects the **whole Block** — the caterer has to be free for all three days, the decorator for two, and she never types a date into a filter.
  5. Shortlists several per Service and compares them side by side. Nothing she is merely comparing touches her budget. As she settles on one in each Service, the running total builds against ₹8L on its own.
- **Climax:** The app surfaces what she could not work out by phone — that of her three Blocks, only the one anchored on the 27th has her shortlisted venue, caterer *and* photographer free across every day and Slot it needs, and lands inside budget. She locks that Block onto the Wedding.
- **Resolution:** The Workspace holds a real wedding: the Block fixed, three Functions each with their day and Slot, five Shortlists, budget tracked against ₹8L. She sends Enquiries, Vendors respond, and she deals with them directly.
- **Edge case — no clean Block:** The venue she wants is free only in the 22nd Block, the photographer only in the 27th. The app **shows the collision explicitly and lets her swap Vendors** until one Block clears. It does not rank Blocks by partial availability, and it does not hide the conflict behind per-Listing badges.

**Confirmed constraints carried by UJ-1:**

- The Family states the **shape** of the wedding once — which Functions, in what relative order, in which Slots — and the platform derives one Candidate Block per Anchor Date by shifting that shape. She never lays out the same arrangement twice.
- A wedding spans **several days and Slots**, not one date. Every Function holds its own day and Slot explicitly; nothing about the arrangement is guessed by the platform.
- A Candidate Block is **whole-or-nothing**. Availability matching runs across every day and Slot the Block occupies, per Service.
- The Candidate Blocks are stated once at the Wedding level; availability filtering is **pre-applied everywhere**, never a filter the user re-applies per Service.
- Budget is a **portfolio-level running constraint** across all Services, not a per-Vendor filter. It counts **Selections and Agreements only** — never candidates under comparison.
- Services are selected at the Wedding level before browsing, rather than discovered category by category.
- The Chosen Block is an **output** of cross-Service availability matching. Candidate Blocks are the input.

#### UJ-2. Dattatray finds out what the platform is actually worth to him.

- **Persona + context:** Dattatray Shinde runs Shubhmangal Lawns on the Ahmednagar road — an 800-capacity lawn and a 300-capacity AC hall. Business today comes from a hoarding on the highway and from people who attended a function there last season. He joined as a Founding Vendor at ₹0 after Vivah Spot staff visited, checked his registration and photographed the property.
- **Entry state:** Vendor portal open on his phone. Identity and business verified; portfolio checked in person. Single login on the account.
- **Path:**
  1. Sets up his **two Spaces separately** — lawn and hall — each with its own capacity, all-in pricing and calendar.
  2. States his **rules on the listing**: no outside caterer, DJ stops at 10, no fireworks. Publishes all-in pricing and the no-hidden-charges declaration. Rules and all-in pricing are both conditions of being listed, not optional fields.
  3. Opens his **calendar**: blocks what is already taken, marks which of the day's four Slots each Space is free in, and sets lower pricing for the Chaturmas months when nothing moves.
  4. Adds his **preferred caterer and decorator** — the two he has worked with for years.
  5. **WhatsApp buzzes**: an Enquiry, already carrying the whole wedding — 27 November, 600 guests, ₹8L budget, Haldi and Wedding and Reception. He taps through into the thread.
  6. Replies there with a Quote for the lawn and offers a Site Visit that Sunday.
  7. Marks the Enquiry as it moves — contacted, site visit, won.
- **Climax:** At the end of the season his dashboard reads 34 Enquiries, 6 site visits, 2 weddings won, ₹0 paid. When the Founding Vendor tier expires and Vivah Spot asks him to pay, that number is the entire conversation.
- **Resolution:** He renews on a paid tier, or he does not — either way the decision is made against his own numbers rather than against a salesman.
- **Edge case — the stale calendar:** He agrees a date by phone at a function and forgets to block the Slot. A Family still sees him free, builds her Block around him, and enquires. **Resolution: the platform nudges him** ("you have N Enquiries for the 27th — still free?") rather than blocking the Enquiry or auto-expiring his availability.

**Confirmed constraints carried by UJ-2:**

- **One login per Vendor account.** Multi-user access with roles is explicitly out.
- A venue is **many engageable Spaces**, each with independent capacity, pricing and calendar. Availability is **Slot-based**, not whole-day.
- **Rules and regulations are a condition of listing**, carrying the same force as mandatory all-in pricing.
- Enquiries are **qualified** — they arrive carrying the Wedding context (date, guest count, budget, functions).
- The Vendor's primary notification channel is **WhatsApp**; the portal is **phone-first**, not desktop-first.
- Because calendar freshness is maintained by nudging rather than enforcement, **the platform never asserts availability as fact.** All copy reads "vendor shows available". This follows Scope §8: the platform makes no guarantee it cannot honour.

**Cross-journey dependency:** UJ-1's date-matching is only as accurate as the least disciplined Vendor's calendar in UJ-2. The nudge mechanism is the sole safeguard for dates agreed away from the platform.

#### UJ-3. Rutuja and Dattatray put it in writing, and the reviews become worth reading.

- **Persona + context:** Rutuja has settled on Shubhmangal Lawns for the 27th after a site visit. The lawn is agreed at ₹2.4L all-in. No money has passed through Vivah Spot and none will.
- **Entry state:** Both parties in the same enquiry thread. Dattatray has already sent a quote.
- **Path:**
  1. Dattatray sends the agreed terms into the thread — date, space, guest count, all-in price, what is included, and his rules (no outside caterer, DJ stops at 10).
  2. Rutuja reads the terms and **confirms in-app**.
  3. Dattatray **confirms**.
  4. Vivah Spot timestamps the **Agreement**: these two parties, this date, these terms. Both sides can download a copy.
  5. The date moves from shortlisted to committed in her Workspace, and **the Agreement blocks the Slot on his calendar automatically**.
  6. Money settles directly between them, off the platform, exactly as before.
- **Climax:** Once the lawn has been delivered — for a venue, the end of the Span — both are prompted to review. Each writes without seeing the other's, and neither publishes until both have submitted or the window closes. Every review is anchored to a real Agreement — the rival lawn down the road cannot review him, because it never engaged him. For the first time the star rating on the Listing means something.
- **Resolution:** His Listing carries reviews only from people who actually hired him, and none of them were written under threat of retaliation. Her account carries a history that makes her a known quantity to the next Vendor she approaches.
- **Edge case — it falls apart after signing:** She cancels, or he commits the Space to someone else. **Nobody adjudicates** — the Agreement is a record, not a lever, and Vivah Spot is not a party. **Neither side reviews**, because no wedding took place and a review would only be a weapon. The cancellation is recorded as a plain fact on both profiles.

**Confirmed constraints carried by UJ-3:**

- The **Agreement is a record, not an instrument.** Vivah Spot hosts and timestamps it, and does nothing else with it. No mediation, no dispute workflow, no determination of fault, no liability. Scope §8's non-party status is preserved unchanged.
- An Agreement requires **confirmation from both sides** before it exists.
- **Review rights on both sides flow from the Agreement**, and from nothing else. Enquiring is not sufficient. This closes the bad-faith review hole that opened when reviews became the only consequence a Vendor faces.
- **Reviews are two-way and double-blind, but not symmetric in form.** A Family reviews a Vendor with a rating and free text, published on the Listing. A Vendor reviews a Family through **structured questions only** — did they respond, did the headcount hold, was the venue left as agreed — visible to other Vendors and to the Family, never published publicly and never free text. Prose written by a business about a named private individual carries defamation and data-protection exposure that the structured form removes.
- **Reviews publish when the window closes**, whether or not both sides submitted. Holding one back indefinitely because the other never wrote would be selective publication.
- **The review window opens on Delivery, not on the wedding day.** A Vendor marks the work delivered, or their own committed delivery date passes and the window opens regardless — and in no case later than one year after the Wedding's last day. A photographer who commits to ninety days is reviewable on day ninety whether or not he has delivered — he can open the window early by delivering early, but he cannot hold it shut by delivering late. This is what makes the published delivery timeline in Scope §6 load-bearing rather than decorative. Neither review publishes until both are submitted or the window closes, so no review can be written in retaliation for another. Retaliation protection is load-bearing here: reviews are the only consequence a Vendor faces, so anything that discourages an honest one breaks the mechanism.
- **A cancelled Agreement unlocks no reviews at all.** No service was delivered, so there is nothing to describe. The cancellation is instead recorded as a countable fact on both profiles — a signal that costs the canceller something without requiring anyone to adjudicate fault. Rejected alternative: letting the non-cancelling party review, which rewards stonewalling, because the system can detect who clicked cancel but not who was at fault.
- An Agreement **auto-blocks the Vendor's calendar Slot**, which removes calendar staleness for every engagement that originates on the platform. The UJ-2 nudge remains the only safeguard for dates agreed offline.
- Money never touches the platform at any point in this journey.

#### UJ-4. Kiran verifies a lawn, opens a Service, and takes a fraud off the platform.

- **Persona + context:** Kiran does field verification for Vivah Spot around Shrirampur. She is the reason every trust claim on the platform is true: nothing this product says about a Vendor survives her not having driven out and looked. She works from a phone in the field and a laptop at the office, and she has no manager to approve anything — every Admin user can do everything, and what constrains her is that every action carries her name.
- **Entry state:** Signed in as Admin. Dattatray has self-registered, built his Listing and submitted it. It is not visible to anybody yet.
- **Path:**
  1. Drives to Shubhmangal Lawns with his submitted Listing open. Checks his identity and his business registration against the documents in front of her.
  2. Walks the lawn and the AC hall, photographs both herself, and **compares his uploaded portfolio against what she is standing in.** This is the check that makes "verified real photographs" mean anything.
  3. Records the Verification — against her own name, with the date and what she checked it on. His two Spaces, their capacities and their Stated Sizes are confirmed as his own declarations about his own property.
  4. His Listing becomes publicly visible, because Verification has completed, every condition of listing in FR-59 and FR-71 is satisfied, and his Founding Vendor Subscription is active.
  5. Back at the office, the next town needs a Service the catalog does not carry: **Mehndi Artist**. She configures its declarations — taxonomy, filters, comparison attributes, Sizing Attribute, Order Basis, Engagement Model and pricing model. **[AMENDED]** Its fields and its behaviour are a developer's work — one detail DocType and one handler module — so the Service ships on the next release rather than the same afternoon. Adding the fiftieth is still the same act as adding the sixth.
  6. A complaint arrives about a decorator: his portfolio is lifted from a Pune studio's public feed. She compares, and it is.
- **Climax:** She removes him. The removal carries her name, the ground, and the date, and it cannot be erased. **Every Family holding an Agreement with him is told he was removed and asked to find another decorator** — not merely that a listing has gone. This is the trust spine doing the one thing it can actually do.
- **Resolution:** His Reviews stay published; removal does not erase a record. The Families he was working with know where they stand while there is still time to act. Kiran's own actions sit in a log nobody, including her, can quietly amend.
- **Edge case — the portfolio that changes after verification:** A Vendor passes Verification with real photographs and replaces them a week later. The new images are not publicly visible until Verification has covered them. Without that rule, the check Kiran drove out to perform would be worth nothing the day after she performed it.

**Confirmed constraints carried by UJ-4:**

- **Verification is human, in person, and supplied by the client.** The platform provides the workflow and the record; it cannot provide the diligence, and every trust claim it makes resolves to somebody having gone and looked.
- **Every Admin action that changes standing, visibility, published content or a person's access to their own account is attributed and cannot be erased.** Attribution is the control, not restriction — Admin has no role tiers.
- **Removal grounds are narrow and closed**: fraud, falsified Verification, stolen or misrepresented portfolio, impersonation. Never service quality, which Reviews answer alone.
- **Fraud removal is the one exit that does not behave like the others.** Affected Families are told the Vendor was removed, and asked to find another.
- **[AMENDED]** **A Service's declarations are configured; its fields and behaviour are built.** Adding one is a developer's act, bounded and repeatable — the same act at the fiftieth Service as at the sixth (AD-5, AD-6, AD-8).
- **Changing what was verified requires verifying it again**, before the change is publicly visible.

#### UJ-5. Vasant kaka replies in fifteen seconds, and finds his own daughter's wedding.

- **Persona + context:** Vasant is Omkar's father's cousin, in Pune. He is not a user of Vivah Spot, has never heard of it, and has no intention of installing anything. He is also, as it happens, marrying his own daughter off next spring.
- **Entry state:** A WhatsApp message **from Rutuja's own number** — because the platform never messages a Guest — carrying the invitation and a link.
- **Path:**
  1. Opens the message. It is from family, so he reads it rather than ignoring it.
  2. Taps the link and lands on a page Vivah Spot hosts. Omkar and Snehal, the 27th, the lawn on the Ahmednagar road, the three Functions and their times.
  3. Says yes — four of them travelling.
  4. **Sees nothing else.** Not the guest list, not who else has replied, not the budget, not the Vendors, not anything about the Wedding beyond his own invitation and his own answer.
  5. At the foot of the page, one quiet line for someone planning a wedding of their own.
- **Climax:** He replies in about fifteen seconds, on a page he has never seen before, without an account, an install or a sign-in. Four hundred kilometres away, Rutuja's confirmed count moves — beside her stated number, not over it.
- **Resolution:** He taps the quiet line, and starts a Wedding of his own. **He consented to Vivah Spot directly, by choosing to be there** — which is a materially better footing than his number having been uploaded on his behalf. This is the only growth channel designed into the product, and it is earned rather than bought.
- **Edge case — the forwarded link:** His link is his household's alone. If he forwards it to another cousin, that cousin answers *Vasant's* invitation rather than reaching their own — the link is individual and cannot be altered to reach anyone else's. A relative who was never invited has a different route: the guest form, whose submissions reach Rutuja as suggestions she accepts or dismisses.

**Confirmed constraints carried by UJ-5:**

- **A Guest needs no account, no install and no sign-in**, ever. The moment a reply requires either, most of six hundred people stop replying.
- **Each Guest's link is individual and unguessable**, cannot be altered to reach another Guest's, is excluded from search-engine indexing, and is rate-limited.
- **A Guest sees their own invitation and their own response, and nothing else about the Wedding.**
- **The RSVP page is the platform's growth surface**, and a Guest who follows it consents to Vivah Spot directly.
- **RSVP counts never overwrite the Family's stated guest count.** They arrive beside it as better information; the Family decides whether to revise.
- **Links are revocable by the Creator and expire when the Wedding concludes or is abandoned.**


## 3. Glossary

*Downstream workflows and readers must use these terms exactly. FRs, UJs and SMs use Glossary terms verbatim; introducing a synonym anywhere is a discipline violation. The vocabulary that must **not** be used is listed in §7.9, which is authoritative — this section does not restate it.*

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

## 4. Features

*Feature groups agreed with Abhishek on 2026-09-03. FRs are numbered globally (FR-1..FR-N) so downstream artifacts keep stable references even if groups are reorganised. Journeys are referenced by ID.*

**FR index.** FR IDs are global and permanently stable, so several FRs sit away from their numeric neighbours. **Do not renumber them to restore sequence** — downstream artifacts reference these IDs.

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

**Description:** Nobody signs up for a wedding platform twice, and nobody remembers a password they set once. Everyone — the Family planning a wedding, the Vendor selling into it, and the Admin staff behind it — gets in the same way: a phone number and a code. What differs is what they can reach once inside.

The person planning a wedding is very often not the person getting married. Rutuja creates the Wedding for her brother Omkar and his fiancée Snehal, and she is the one who will hold the account, take the Enquiry replies and confirm the Agreement. The couple are names on the Wedding, not the owners of it.

**Functional Requirements:**

#### FR-1: Sign in with a phone number

Any person can create an account and sign in without ever setting a password. Realizes UJ-1, UJ-2.

**Consequences (testable):**
- **No password is ever set, stored or requested.** No password field exists on any surface, and there is no password reset flow to attack.
- Sign-in is offered by: **a mobile number and a one-time code**; **a passkey** on devices that support one; **Google**; and **Apple**. The mobile number route always works and is never the only option offered.
- **Sign in with Apple is offered wherever Google is**, on iOS. This is Apple's condition for shipping at all, not a preference.
- A one-time code is **six digits, valid for ten minutes**, with at most **five attempts** and **three resends per hour** on a number.
- A one-time code may be delivered over **WhatsApp with SMS as the fallback**. Neither channel is the sole path to an account.
- After the first sign-in, a returning person may re-enter with their **device's own biometric or screen lock**, and **stays signed in for ninety days on that device**. Weddings are planned over months; re-authenticating a planner mid-season is hostile.
- **One person is one account, and the mobile number is the identity.** A second sign-in method links to an existing account only where it carries a **verified mobile number matching that account**. An email address alone never links anything.
- **Linking requires proof of control of the existing account** — a one-time code to its number — and the person is told what was linked and when. Without that challenge, a platform with no passwords and ninety-day sessions would hand over accounts to anyone who could obtain a matching sign-in.
- Where a second method cannot be linked, it creates a separate account rather than failing silently, and the person is told why.
- **One person may be both a Family and a Vendor on one account.** A venue owner planning his own daughter's wedding does not need a second identity, and the platform does not make him invent one. What he can do at any moment follows from what he is acting as, not from which account he signed into.
- **A person can change the mobile number on their account**, by proving control of both the old number and the new one. Numbers change constantly in India, and an account that cannot follow its owner is an account they lose.
- **Losing the number is a recoverable state, not a dead end.** Where the old number is gone, recovery goes through Admin, who verifies the person by other means and records what was done and by whom. It is deliberately manual: there is no password to reset, so an automated route here would be the whole platform's weakest point.
- The same mechanism serves Families, Vendors and Admin. There is not a separate sign-in system per surface.
- A person who abandons sign-up partway resumes without creating a duplicate account.

#### FR-2: A Wedding belongs to the person who created it

The person who creates a Wedding owns it, whether or not they are getting married. Realizes UJ-1.

**Consequences (testable):**
- Couple names are stored as data on the Wedding, independent of the account that owns it.
- The owning account is the party that confirms an Agreement on the Family's side.
- Enquiry replies, nudges and reminders reach the owning account, not the named couple.

#### FR-3: One login per Vendor account

A Vendor business has exactly one account and one set of credentials. Realizes UJ-2.

**Consequences (testable):**
- No additional users, roles, invitations or permission tiers exist on a Vendor account.
- Every Vendor-side capability in this document is available to that single login.
- A Vendor operating in several Services still holds one account.

#### FR-4: Admin can do anything

**No capability is withheld from Admin by role.** Every Admin user can reach every capability, and the control is attribution rather than restriction. Realizes UJ-4.

**Consequences (testable):** stated in full at **FR-61**. This entry exists so the access model can be read whole within this group; FR-61 is authoritative, and the two must not drift apart.
- Admin actions that change a Vendor's standing — Verification, removal — are attributable to the staff member who took them.

#### FR-5: The Wedding Creator controls who else gets in

The person who created a Wedding can grant other people access to it, and can take that access away. Realizes UJ-1.

**Consequences (testable):**
- Access is granted by the Creator to a mobile number. There is no other route in.
- A Wedding cannot be discovered, searched for, or requested by anyone who has not been given access.
- The Creator can revoke access at any time; a revoked member loses visibility immediately.
- One person may hold access to several Weddings.

#### FR-6: Invited Members advise, they do not act

An Invited Member can see the Wedding and suggest Listings to its Creator. They can do nothing else. Realizes UJ-1.

**Consequences (testable):**
- An Invited Member can view the Workspace: dashboard, Functions, budget, guest list, Shortlists and Enquiry statuses.
- An Invited Member can send a suggestion naming a Listing, **or naming a Guest to invite**. It appears to the Creator, who accepts or dismisses it. A suggestion has no effect until the Creator acts on it.
- An Invited Member cannot edit the Wedding or its Functions, add or remove Candidate Blocks, add to a Shortlist, send an Enquiry, obtain a Contact Reveal, confirm or cancel an Agreement, write a Review, or change the budget or guest list.
- Every action that commits the Family to something — Enquiry, Contact Reveal, Agreement — is available to the Creator alone.

### 4.2 Wedding Workspace

**Description:** The Workspace is the reason a Family opens Vivah Spot rather than a search engine. With no money moving through the platform, it is the product's retention: the one place where the whole wedding — every Function, every Shortlist, every Enquiry, the running cost — sits in a single view.

Its governing principle is that **the planner carries as little as possible.** Rutuja is running a wedding across five Services and three Functions while holding down the rest of her life. Anything the platform already knows, the platform fills in. She is never asked to retype something it could have carried across, and never asked to maintain a record for the platform's benefit.

**Functional Requirements:**

#### FR-7: A Wedding is never lost and never has to be finished in one sitting

Rutuja can start a Wedding, leave, and pick it up exactly where she left off. Realizes UJ-1.

**Consequences (testable):**
- Every entry is preserved as it is made. No explicit save action exists anywhere in the Workspace.
- Closing the app, losing signal or switching devices does not lose work in progress.
- A Wedding is usable before it is complete — she can browse and Shortlist before every detail is filled in.

#### FR-9: The shape of the wedding is stated once

Rutuja states which Functions the wedding has, in what relative order and in which Slots, one time. The platform carries that shape onto every Anchor Date she supplies. Realizes UJ-1.

**Consequences (testable):**
- Each Function holds its own day, Slot and guest count, and a Function's guest count may differ from the Wedding's.
- Functions may be taken from a standard set — Haldi, Mehndi, Sangeet, Wedding, Reception — or named freely by the Family.
- The arrangement is stated once. Supplying a second or third Anchor Date produces a further Candidate Block automatically, without the Family rebuilding anything.
- **Up to five Anchor Dates, and so up to five Candidate Blocks, per Wedding.** A guruji rarely offers more than three or four.
- Nothing about the arrangement is inferred by the platform. Even the near-universal pattern of Haldi on the morning before the Wedding is assigned explicitly by the Family, never assumed.
- The Family can adjust an individual Candidate Block where one Anchor Date needs a different arrangement, without disturbing the others. `[ASSUMPTION A-1]`

#### FR-68: The Family chooses its Services at the Wedding, and that choice scopes everything downstream

The Family decides which Services the wedding needs at the Wedding level, and everything downstream is scoped by that choice. Realizes UJ-1.

**Consequences (testable):**
- The Family selects Services onto the Wedding — Venue, Catering, Photography and whatever else this wedding requires — and can add or remove one at any time.
- A Service may be selected for the whole Wedding or for particular Functions.
- **The selected Services are what exists downstream.** A Shortlist exists only for a selected Service; Block matching runs across the selected Services and no others; the running budget totals them; and SM-5 measures against them.
- Discovery begins on the home screen, which is the catalog: search, Service categories and featured Listings, browsable before a Wedding exists. Selecting Services onto the Wedding remains what scopes Shortlists, Block matching and the running budget — that is unchanged. *(Amended 2026-09-06 by the UX run. This consequence previously read "Discovery begins inside a selected Service. The Family never browses the catalog category by category looking for what a wedding might need." The remaining consequences of FR-68 stand: Services are still chosen at the Wedding and still determine what exists downstream.)*
- Removing a Service from a Wedding removes its Shortlist. Where an Agreement exists for it, FR-32's warn-and-accept applies before anything is removed.

#### FR-10: One view of the whole wedding

The Workspace shows the entire wedding in a single view. Realizes UJ-1.

**Consequences (testable):**
- The view carries the Services selected for this Wedding, every Function with its day and Slot, every Shortlist and the Selection made from it, every Enquiry and its current status, the running total against the budget ceiling, and the Chosen Block once locked.
- It is reached in one tap from the invitation card on the home screen, or from the Wedding tab. *(Amended 2026-09-06 by the UX run. This consequence previously read "It is the first thing the Family reaches after sign-in, not a screen they navigate to." The home screen is now the browsable catalog with the invitation card above it; see the amendment note under FR-68.)*
- It reflects a change the moment the change is made, including changes made by the platform on the Family's behalf.

#### FR-8: The budget fills itself in

The Workspace maintains the running cost of the wedding from what it already knows, without asking Rutuja to keep books. Realizes UJ-1.

**Consequences (testable):**
- **A Shortlist contributes nothing.** Five caterers under comparison are five candidates, not five costs, and the running total never pretends otherwise.
- **A Selection contributes its all-in price once**, automatically, the moment the Family picks it. **A Span Selection contributes once for the whole Span**, however many Functions it covers — counting a venue's Span price once per Function would post ₹7.2L for a ₹2.4L lawn.
- **Confirming an Agreement replaces the Selection's estimated figure with the agreed one**, automatically.
- Changing or clearing a Selection, or cancelling an Agreement, withdraws its contribution automatically.
- **Where a Service is priced per head, the figure is that price times the stated guest count of the Functions it serves**, and the multiplication is shown beside the total so the Family can see where the number came from.
- **A Service whose Functions the Family has not yet decided shows as not yet estimated — never as ₹0.** Zero reads as free.
- The running total is shown against the Wedding's budget ceiling wherever she is browsing, not only on a budget screen.
- She can adjust any figure the platform derived, and can add a cost the platform knows nothing about.
- She is never required to enter a figure for the platform's benefit. Every automatic figure is usable as-is.

**Known limit:** money settles directly between Family and Vendor, so the platform knows what was **agreed** and can never know what was **paid** — the advance, the extra two hundred plates on the day, the cash settlement. Any record of actual payment is hers to volunteer, never required, and never presented as authoritative.

#### FR-11: The number comes first; the list is optional, and can be collected rather than compiled

A Family states how many people are coming. Naming them is a separate convenience they may never want. Realizes UJ-1, UJ-5.

**Consequences (testable):**
- **Each Function carries a guest count the Family simply states** — five hundred, a thousand — available from the moment the Function exists. That number is what travels with an Enquiry, what sizes a quote, and what the running budget uses.
- **A guest list is optional and is never required for anything.** A Family that never builds one still gets every other capability in this document, undiminished.
- Where a Family does build a list, **entries are households, not individuals.** "The Deshmukhs — four" is one entry, one invitation and one reply. Six hundred guests is usually about a hundred and fifty households, and asking a Family to type six hundred names when they mean a hundred and fifty families is exactly the work this product exists to remove.
- A list can be built by hand, brought in from the Family's own contacts, or **pasted in from a list they already have** — a message, a note, a spreadsheet from the last wedding.
- **Invited Members can suggest guests**, exactly as they suggest Listings under FR-6: a name and a number arrive for the Creator to accept or dismiss. The mother-in-law knows half the relatives and their correct numbers, and can offer them without being able to change anything.
- A household is attached per Function — the hundred and fifty invited to the Wedding are not the twenty at the Haldi — and carries an RSVP state per Function once invitations have gone out.
- **RSVP counts never overwrite the stated guest count.** They are shown beside it as better information arrives, and the Family decides whether to revise the number. The count is theirs, not the platform's.

**Collecting the list rather than compiling it.** The Workspace produces a short form and a link the Creator shares wherever their family already talks — the family WhatsApp group, usually.

- Anyone with the link submits a household: who they are, how many are coming, and a number to reach them on. **No account, no install, no sign-in.**
- **The link is unguessable and cannot be altered to reach another Wedding's form.** The page is excluded from search-engine indexing, and submissions are rate-limited so the form cannot be flooded.
- **Every submission arrives as a suggestion for the Creator to accept or dismiss**, exactly as an Invited Member's suggestion does. A link shared in a group gets forwarded — to another group, to a neighbour, to a cousin who assumed they were invited — and a form that wrote straight into the list would hand away control of who is coming to the wedding.
- **A submitter never sees the guest list**, who else has submitted, or anything else about the Wedding.
- The Creator can **revoke the link at any time**. It expires on its own when the Wedding concludes **or is abandoned** — a Wedding that never happens must not leave a live form collecting people's numbers.
- People who enter their own details are consenting to Vivah Spot directly, which is a stronger footing than a Family uploading numbers on their relatives' behalf. NFR 5.5 governs those details exactly as it governs any other Guest data.

#### FR-12: The Family sends the invitations; the replies come back to the platform

The Workspace composes the invitation. **The Family sends it from their own WhatsApp.** Guests reply on a page Vivah Spot hosts, without installing or signing into anything. Realizes UJ-5, UJ-1.

**Consequences (testable):**
- The platform composes the invitation and hands it to the Family to send from their own account. **Vivah Spot never sends a message to a Guest.**
- The invitation carries a link to an RSVP page hosted by Vivah Spot.
- **That link's preview — image, title, description — is controlled by the platform**, and is the platform's principal surface in front of Guests.
- A Guest opens the link and records an RSVP without an account, an install or a sign-in.
- **Each Guest's link is individual and unguessable.** No link reveals the guest list, no link can be altered to reach another Guest's, and the page is excluded from search-engine indexing. Submissions are rate-limited.
- **The Creator can revoke invitation links at any time**, and they expire on their own when the Wedding concludes **or is abandoned**. A wedding that is not happening must not leave live pages collecting replies.
- A Guest sees the invitation and their own response. They never see the guest list, other Guests' responses, the budget, the Vendors or anything else of the Wedding.
- The RSVP page carries a quiet route for a Guest planning a wedding of their own. **This is the platform's growth surface**, and a Guest who follows it consents to Vivah Spot directly.
- The invitation carries a single discreet line of Vivah Spot attribution in the message and page frame. It never appears inside the invitation artwork a Vendor designed, and never on a physical card. It cannot be removed, and no fee to remove it is ever offered — a Family pays nothing for anything.
- **Guest contact details are used to compose that wedding's invitations and for nothing else.** Never retained for marketing, never messaged by the platform, never used to build an audience.
- Whether a Guest received the invitation is not tracked, because the platform is not the sender. Reach is measured by RSVP page visits and by Guests who go on to start their own Wedding. *(This is message receipt, not the Glossary term **Delivery**, which concerns a Service being rendered.)*

**Why the Family sends.** WhatsApp requires that a recipient have both given the business their number and opted in before a business may message them. A Family's consent does not transfer. Sending several hundred invitations per wedding from a Vivah Spot account would breach that and cost the account. Handing the send to the Family removes the problem rather than managing it — and an invitation arriving from Rutuja's own number is opened and forwarded, where the same message from an unknown business number is ignored or reported.

**Composition note:** the scope document lists *Invitation cards* and *Digital invite + RSVP* as Services that Vendors sell. These compose rather than collide — a Vendor designs the card, the Workspace composes and tracks it.

**Guest accommodation and guest transport** are ordinary Services in the catalog, listed by whoever provides them and chosen by the Family like any other. The platform does not allocate rooms, assign Guests to vehicles, or size the order. It may surface the relevant Function's stated guest count as context; the Family decides the quantity.

#### FR-72: A Wedding has a life, and it ends

A Wedding moves through states, and several rules elsewhere depend on knowing which one it is in. Realizes UJ-1.

**Consequences (testable):**
- A Wedding is **in planning** from creation until its Chosen Block's last Function has passed.
- It becomes **concluded** when that last Function has passed. Concluding is what starts the review backstop in FR-45 and the erasure of Guest contact details (NFR 5.5), and what makes publishing a Real Wedding possible (FR-65).
- A Wedding with no Chosen Block has no last Function to conclude from. **Where it holds a confirmed Agreement, that Agreement's own days serve as the anchor**, so no Agreement is ever left without a review window and the Wedding concludes when the latest of them has passed.
- Where it holds no Agreement and has seen no activity for a year, the Family is asked whether to keep it. **If they do not answer within thirty days it is abandoned** under the rule below, and they are told that before the thirty days start.
- The Creator can **abandon** a Wedding at any time. Abandoning cancels its Agreements under FR-42, releases the Slots, erases the Guest list, and **kills every public link the Wedding issued** — RSVP links and the guest form alike.
- A concluded Wedding stays readable by its Creator and Invited Members. Its Agreements are retained under FR-43 regardless.

### 4.3 Dates & Availability Matching

**Description:** This is the capability that makes Vivah Spot worth opening. Rutuja's problem is not finding a venue — it is finding a *combination*: a venue, a caterer, a photographer and a decorator who are all free across the same run of days, inside her budget, on a day her guruji allows. Today she solves it with a phone and a notebook, and every vendor who comes back unavailable sends her to the start.

The platform solves it by treating the whole wedding as the unit. She states the shape once, supplies her possible wedding days, and every Listing she looks at thereafter already knows whether it can serve her.

**Functional Requirements:**

#### FR-13: Availability is evaluated against the whole Block, everywhere

Every Listing the Family sees already reflects whether that Vendor can serve their Candidate Blocks. Realizes UJ-1.

**Consequences (testable):**
- Availability is evaluated per Candidate Block, across every day and Slot that Block occupies for that Service.
- The Family never types a date into a filter. The Block is applied wherever they browse, compare or shortlist.
- **A Family may browse before supplying any Anchor Date.** Listings are shown without an availability signal — not as unavailable — and the signal appears everywhere the moment the first Anchor Date exists.
- A Service engaged as a Span is evaluated as one continuous Span; a Service engaged per Function is evaluated per Function.
- Services with **no duration** — those with no calendar in any sense — are excluded from Block matching and presented without an availability claim, not as unavailable. Rental-period and lead-time Services are **not** excluded: they are matched on the period or the date they need.
- **Availability is shown only for a Listing with an active Subscription.** A Vendor whose Subscription has lapsed past its Grace Period shows no dates at all, because they are not discoverable. The Founding Vendor Tier is an active Subscription at ₹0 and shows dates like any other.
- **No availability is ever presented as fact.** Every availability display is attributed to the Vendor — "shows available" — because calendar freshness rests on a nudge, not on enforcement.

#### FR-14: A Service declares how it is engaged

Each Service carries its own engagement model, and that model governs how availability is checked and how Vendors price. Realizes UJ-1, UJ-2.

**Consequences (testable):**
- A Service declares its **Engagement Model**, one of five: engaged as a **Span** across every Function it serves; engaged **per Function**; engaged for a **rental period** that need not align with any Function; engaged against a **lead time**, where the question is whether the Vendor can deliver by a date rather than whether they are free on one; or with **no duration** at all.
- **Engagement model and calendar are separate questions.** A rental-period or lead-time Service has a calendar and participates in matching; only a no-duration Service has no calendar at all. An agent must not infer "no calendar" from "no duration".
- Admin sets this when configuring the Service. It is not hard-coded per Service anywhere.
- A Span Service is held continuously from the start of the first Function it serves to the end of the last — **the overnight between them included.** No part of that Span is available to anyone else.
- A Vendor prices against the declared model: a Span Service quotes for the Span, a per-Function Service quotes per Function.
- The Family may engage a per-Function Service for several Functions. That is several engagements priced separately, not one Span.

**Why this removes a whole class of failure:** a decorator striking the Haldi set and building the mandap overnight is working inside the Family's own engagement, because the venue is a Span Service and the Family holds it throughout. There is no setup or teardown window to declare, no buffer to configure, and no way for the platform to sell an overnight it has already committed.

#### FR-15: Collisions are shown, never silently resolved

When no Candidate Block can serve the Family's Selections, they are shown exactly what is in the way. Realizes UJ-1.

**Consequences (testable):**
- The Family sees which Selection blocks which Candidate Block, by name.
- Candidate Blocks are **not** ranked or scored by partial availability, and the platform never recommends one over another.
- The Family resolves the collision by swapping Listings, and the view updates as they do.
- The platform never chooses a Block, drops a Listing, or resolves the conflict on the Family's behalf.

#### FR-16: Locking the Block

The Family locks one Candidate Block, and it becomes the Chosen Block. Realizes UJ-1.

**Consequences (testable):**
- Locking fixes each Function's day and Slot.
- Every Enquiry sent thereafter carries the Chosen Block.
- Discarded Candidate Blocks are no longer applied to browsing.

#### FR-17: Changing the Chosen Block cancels what was agreed against it

The Family can move the wedding. Nothing agreed against the old days survives the move. Realizes UJ-1, UJ-3.

**Consequences (testable):**
- The Family can change the Chosen Block at any time.
- Every Agreement pointing at the old Block is **cancelled**. None is rewritten, migrated or carried across.
- Each of those cancellations is recorded on both profiles as a countable fact, exactly as any other cancellation. No fault is attributed and none is inferred — the count is shown as a neutral number, never as an accusation.
- No Review is unlocked by any of them, since no wedding took place on those days.
- The Slots those Agreements held are **released immediately** and become available to other Families.
- Every Vendor the Family still wants must confirm afresh against the new Block. Availability is re-evaluated for the new Block as it would be for any Candidate Block, and a Vendor who is not free on the new days is simply not available.

**Note on the auspicious-date path:** the Family may instead ask Vivah Spot to find auspicious days for them, computed by an external astro service from birth details. That option is presented where Anchor Dates are supplied. **It is deferred and not built.** Nothing else in this group depends on it — Anchor Dates arrive the same way whether the Family chose them or a guruji did.

### 4.4 Discovery & Comparison

**Description:** Rutuja is not browsing. She is looking for a specific thing — a caterer who can feed 600 people on the 27th inside what is left of ₹8 lakh — and every screen that makes her restate what the platform already knows is a screen that wastes her time. Discovery here is narrow and pre-loaded: she picked her Services at the Wedding level, her Block is already applied, her budget is already tracking.

What she is comparing on is unusual for a marketplace. Because all-in pricing is a condition of listing, the prices in front of her are actually comparable — no vendor is cheaper because they left the transport out.

**Functional Requirements:**

#### FR-18: Finding Vendors within a Service

Rutuja searches inside a Service by name or by Place, and narrows on the things that matter for that Service. Realizes UJ-1.

**Consequences (testable):**
- She can search by Listing or Vendor name, or by location, including detecting where she is.
- Filters cover price within this Service, the Service's own Sizing Attribute, rating and verified status.
- **A rating filter never silently excludes an unrated Listing.** At launch almost every Vendor has no Reviews, and a filter that dropped them would empty the results and bury the entire launch cohort. Unrated Listings are shown alongside, marked as unrated, unless the Family explicitly asks to see only rated ones.
- **A per-Service price filter is not the portfolio budget.** The running total across all Services (FR-8) is a constraint the Family watches, never a filter that hides Listings.
- **The filters offered are configured per Service, not built per Service.** A venue filters on capacity; a photographer does not.
- Availability against her Candidate Blocks is pre-applied and is never a filter she sets herself.

#### FR-19: What a Listing shows her

Every Listing carries the same core, whatever the Service. Realizes UJ-1.

**Consequences (testable):**
- Every Listing shows photos, the all-in price, rating and Review count, verified status, the Service's Sizing Attribute, the availability signal against her Blocks, and the places served.
- **A Listing with no Reviews says so plainly** — "no reviews yet" — and never shows a zero, a blank rating, or a borrowed average. At launch nearly every Vendor is in this state, and a display implying they scored badly would be false.
- **A Listing without an all-in price cannot be published.** All-in pricing is a condition of listing, not a field a Vendor may leave empty.
- **A Listing's Rules are shown on the Listing itself**, not buried in a sub-page. Rutuja learns that outside caterers are not allowed before she shortlists, not after.
- Availability is always attributed to the Vendor — "shows available" — never asserted by the platform.

#### FR-20: Paid placement is visibly separate from merit

Featured Listings are marked as paid and kept out of the organic ordering. Realizes UJ-2.

**Consequences (testable):**
- Featured Listings appear in a distinctly marked band, identified to the Family as paid placement.
- **Organic results are ordered on their own merits, and position within them cannot be purchased** — by any tier, add-on or arrangement.
- Organic ordering uses these signals, in this order of weight:
  1. **Whether the Vendor is available for the Family's Candidate Blocks.** A Vendor who cannot serve her dates is of no use to her however good they are.
  2. **Rating, adjusted for the number of Reviews it rests on.** A rating drawn from few Reviews is pulled toward the average for that Service in that Place, with the pull fading as Reviews accumulate and becoming negligible by about **ten Reviews** `[ASSUMPTION A-3]`. **Where that average does not yet exist** — which is the case for every Service on the day a Place opens — the pull falls back to the Service's average across all Places, then to the platform's overall average, and where neither exists yet, ranking rests on the other signals alone. **A plain average must not be used**: it lets two five-star Reviews outrank forty averaging 4.6, which is both wrong and trivially arranged among friends.
  3. **Median time to first reply**, which is the responsiveness a Family actually experiences.
  4. **How recently Verification was confirmed.** Every published Listing is verified, so verification itself separates nobody; how fresh that check is does.
  5. **Rotation among near-equals.** Where Vendors' adjusted scores sit **within a few percent of each other**, their order varies between searches, so position is not settled permanently by a first-mover advantage. A Vendor who is genuinely better is not rotated below one who is not.
- **Rotation is a requirement, not a refinement.** The platform launches in one town with every Vendor at zero Reviews, and without it whoever wins the first wedding compounds forever while the rest — all of them paying subscribers — receive nothing and leave. SM-2's distribution counter-measure is what detects this failing.
- **Neither what a Vendor pays nor how recently they joined is a signal**, at any weight.
- The parameters that determine organic ordering are disclosed to Families in plain language, reachable from the results themselves. That disclosure states: results are ordered by availability for your dates, then by rating adjusted for how many reviews it is based on, then by reply speed, then by how recently the vendor was verified — **and that vendors of similar standing are shown in a varying order, so no one holds the top place permanently.** It states that vendors cannot pay for a position, and that paid placements appear separately and are labelled.

- A Featured Listing satisfies **every condition of listing in FR-59 and FR-71**, exactly as any other Listing does. Paying buys visibility, never an exemption.

*This supersedes the scope document's §8 claim that "search ranking is not for sale to the highest bidder". **Ranking is sold** — visibly, separately, and never inside the organic results. That claim must be struck from the scope document and from all marketing copy, for the same reason §8 itself bans the escrow-era guarantees: it is no longer true.*

#### FR-21: Comparing a Shortlist side by side

Rutuja puts her Shortlist for one Service next to itself and sees where they actually differ. Realizes UJ-1.

**Consequences (testable):**
- Listings within one Service can be compared side by side.
- **The attributes compared are the Service's own, configured per Service** — a venue compares on capacity and Rules, a photographer on deliverables and delivery timeline.
- The comparison shows each Listing's availability against each Candidate Block, so the collision in FR-15 is visible here too.
- Comparison is within a Service. Nothing compares a caterer to a photographer.

#### FR-22: Shortlists

A Shortlist is the Family's working set within one Service. Realizes UJ-1.

**Consequences (testable):**
- A Shortlist belongs to one Service within one Wedding, and holds the candidates the Family is comparing.
- **Adding to a Shortlist costs nothing and commits to nothing.** It does not move the running budget.
- From a Shortlist the Family picks a **Selection** — one per Span for a Span Service, one per Function otherwise. Selecting moves the running budget (FR-8); it does not notify the Vendor, reserve anything, bind anybody, or **engage** anyone in the sense the Glossary defines. Only a confirmed Agreement does that.
- A Selection can be changed for another Listing at any time until an Agreement is confirmed against it.
- **An account cannot select its own Listing** (FR-39).
- **The collision view in FR-15 reports across the Family's Selections**, since that is the set they are actually trying to make fit. While a Service is still at the Shortlist stage, availability is shown per Listing.
- An Invited Member cannot change a Shortlist or make a Selection. They can suggest a Listing.

### 4.5 Vendor Listings

**Description:** A Listing is what Dattatray is actually paying for. It has to carry enough for Rutuja to decide without phoning him — real photographs of real events, a price with nothing hidden behind it, what he will and will not allow on his property, and who he trusts to work there.

Four things make a Listing here unlike a directory entry. A venue is not one thing but several engageable Spaces (FR-23). A Vendor's Rules do not merely inform the Family — they govern what the Family may go on to choose (FR-24, FR-32). A Vendor declares where they will travel rather than being confined to a city (FR-33). And some Services must carry a capability specific to them before they can be listed at all (FR-71, which extends the general conditions in FR-59).

**Functional Requirements:**

#### FR-23: A Listing can hold several Spaces

Where a Service works that way, one Listing carries several independently engageable Spaces. Realizes UJ-2.

**Consequences (testable):**
- A Space holds its own capacity, its own **Stated Size**, its own all-in price and its own calendar.
- **A Space's Stated Size is visible to Vendors quoting to work in it**, so a decorator quotes for the space that exists rather than guessing. It is the Vendor's own declaration about their own property, published like any other Listing field.
- The Family engages a **Space**, not a Listing. Dattatray's lawn being held does not make his hall unavailable.
- Whether a Service has Spaces at all is configured per Service, not built per Service.

#### FR-24: Rules are published, and they bind what the Family may choose

A Vendor's Rules appear on the Listing and constrain the Family's later choices. Realizes UJ-1, UJ-2.

**Consequences (testable):**
- Rules are a **condition of listing**. A Listing cannot be published without them, and they carry the same force as all-in pricing.
- Rules are visible on the Listing before the Family engages, never afterwards only.
- A Rule may **restrict a Service to the Vendor's Preferred Vendors** — "no outside caterer" being the ordinary case. Where such a Rule is in force for a Space the Family has taken, their choices in that Service are limited to the permitted set.
- Where no such Rule is in force, the Family chooses freely and the Preferred Vendors are a recommendation only.
- The Family can see, before engaging a Space, which Services that Space will close off.

#### FR-25: Preferred Vendors

A Vendor names other Vendors it recommends, and those recommendations reach Families who have engaged it. Realizes UJ-2.

**Consequences (testable):**
- A Vendor may name Preferred Vendors in the Services relevant to its own.
- **A named Vendor must accept the association before it is published.** No Vendor can claim another's endorsement unilaterally.
- **A Vendor may name their own Listing in another Service.** A venue with its own kitchen naming its own Catering Listing is in-house catering, which is ordinary and legitimate, and combined with a Rule restricting catering to Preferred Vendors it means engaging the venue means using that kitchen.
- **Where a Preferred Vendor is the same business, it is shown as the same business** — never presented as an independent recommendation. A Family sees that the caterer is the venue's own before they engage the venue, because FR-32 puts the Rule and its consequences in front of them at that moment. An in-house arrangement is fine; an in-house arrangement dressed as a third party's endorsement is not.
- Once a Family has engaged a Vendor, that Vendor's Preferred Vendors are surfaced distinctly to them in the Services they cover.
- **Preferred surfacing is not paid placement and cannot be purchased.** It is the Vendor's own recommendation, and no tier, fee or add-on buys a place on anyone's Preferred list.
- Where a Rule restricts a Service, the Preferred Vendors are the permitted set.

#### FR-32: A conflicting Rule is surfaced before it takes effect, never after

Where engaging a Vendor would invalidate choices the Family has already made, they are told before they commit and must accept the consequence. Realizes UJ-1, UJ-3.

**Consequences (testable):**
- Before the Family engages a Space or Listing, they are shown **by name** every Shortlist entry and every Agreement that this Vendor's Rules would make impermissible.
- They cannot proceed without accepting that consequence explicitly.
- On acceptance, impermissible Shortlist entries are removed, and **any Selection among them is cleared and its contribution withdrawn from the running budget.**
- On acceptance, any impermissible **Agreement is cancelled under FR-42** — recorded on both profiles, Slots or Span released, no Review unlocked.
- If they decline, the engagement does not proceed and nothing about their Wedding changes.
- **Nothing is removed until the engagement actually completes.** Acceptance authorises the consequence; the consequence takes effect only when the Agreement is confirmed. If confirmation fails for any reason FR-39 allows — the Slots taken first, or the same-account bar — the Family's Shortlist, Selections and existing Agreements are exactly as they were.
- **Nothing is ever removed silently.** The Family never discovers a Vendor missing from their Shortlist without having been told why and having agreed to it.

**Why this exists.** Rules are enforced going forward — once the lawn is engaged, catering is closed to the permitted list. But a Family can shortlist a caterer in week one and choose the venue in week three, when no Rule existed at the time of the earlier choice. The constraint arrives after the decision, so the only honest place to raise it is the moment the venue is engaged.

#### FR-26: Pricing follows the Service's own model

A Listing's all-in price is expressed the way that Service is actually sold. Realizes UJ-2.

**Consequences (testable):**
- Price is expressed per the Service's model: per Span, per Function, per head, per unit, per rental period.
- **The price is all-in.** The no-hidden-charges declaration is published on the Listing, and the price a Family compares is the price they will be quoted.
- A Vendor may set different pricing for off-season and off-muhurat periods (FR-30), and the Family always sees the price applicable to their own Block.

#### FR-33: Where a Vendor works

A Vendor declares the places they will travel to, and Families see the Vendors who will come to theirs. Realizes UJ-1, UJ-2.

**Consequences (testable):**
- Places are held as a **hierarchy** — village and town, tehsil, district, state, country — not as a flat list of cities.
- A Vendor declares their service area at whatever level fits them: a single town, a whole tehsil, several districts. One Vendor may declare several areas at different levels.
- **A service area says where a Vendor is willing to travel to work. It is not a paywall and is never sold.** Any Family anywhere can find, compare and enquire with any Vendor; the declared area tells her whether he will come to hers.
- A Wedding holds a Place. A Family sees the Vendors whose declared area **covers that Place**, at any level of the hierarchy.
- **Nothing in the platform assumes a single city.** Launching in one town is an operational choice about where supply is onboarded, not a constraint expressed anywhere in the model.
- Admin can open a new Place without a code release, in the same way a new Service is configured rather than built.
- A Space, being immovable, serves the place it stands in. A travelling Vendor serves the areas they declare.

#### FR-71: What each Service is required to carry

Some Services carry a capability without which the Service is not really being offered. **These are additional conditions of listing, on top of the general ones in FR-59**, and they are configured with the Service. Realizes UJ-1, UJ-2.

**Consequences (testable):**
- **Catering — a headcount recommendation.** The platform recommends a quantity for a Function and **shows what it was built from**. Where the Family has only stated a number, that is the basis. Where a guest list exists, confirmed RSVPs refine it and the Family is told the figure will move as replies arrive. They adjust or accept it, and only then does it travel with an Enquiry. Neither shortage nor waste is anybody's surprise on the day.
- **Photography — the named person.** A Listing states **who will actually shoot**, not only which studio was hired. Where the named person changes, the Family is told before the wedding, not after.
- **Décor & Mandap — sizing against the real space.** Where the Family has engaged a Space, its **Stated Size** and the Vendor's Rules are available to Décor Vendors quoting for it, so a decorator quotes for the space that exists rather than guessing. This is the venue-awareness the platform has claimed since the beginning, and it needs the venue's own data to be real.
- **Band Baaja Baraat — no demands on the day.** The Vendor publishes a declaration that no additional payment will be sought during the event. It is a Commitment like any other: published, quotable back to them, and reviewable.
- **Venue — seeing it before taking it.** A Family can request a site visit or a virtual tour from the Listing itself.
- **A Service's required capabilities are configured with the Service**, in the same act that defines its fields and filters. Adding a Service means deciding what that Service must carry.

**The five Services carrying frozen specifications configure as follows.** These are the seed configuration, not special cases in code — every value here is a setting any other Service could also take.

| Service | Engagement Model | Priced | Sizing Attribute | Order Basis | Has Spaces |
|---|---|---|---|---|---|
| **Venue** | Span, across every Function it serves | per Span | capacity | the Function's stated guest count | yes |
| **Catering** | per Function | per head | capacity — the most they can serve `[A-4]` | the Function's stated guest count | no |
| **Photography** | per Function | per Function | crew bandwidth | none | no |
| **Décor & Mandap** | per Function `[A-5]` | per Function | none | the engaged Space's Stated Size | no |
| **Band Baaja Baraat** | per Function | per Function | crew bandwidth | none | no |

#### FR-27: Portfolio

A Listing carries photographs of the Vendor's own work. Realizes UJ-2, UJ-3.

**Consequences (testable):**
- Photographs are of events the Vendor actually delivered.
- **How many a Listing may publish is its Tier's portfolio allowance (FR-50).** A Listing over its allowance after a Tier change keeps every image and publishes up to the allowance; nothing a Vendor uploaded is destroyed by a change of plan.
- Where another Vendor's engagement took place at this Vendor's premises, that engagement can be reflected on this Listing as third-party evidence of real work.
- Portfolio authenticity is established by Verification, not by the Vendor's assertion. See group 4.12.

### 4.6 Vendor Calendar

**Description:** Everything Rutuja is promised rests on this one screen being honest. The Block matching in 4.3 is only ever as good as the least disciplined Vendor's calendar, and no money moves through the platform, so nothing compels Dattatray to record a date he agreed by phone at somebody else's wedding.

The platform's answer is to make the calendar cheap to keep — Agreements block it without him touching anything, and where he might have drifted it asks rather than assumes. It never presents his availability as its own claim.

**Functional Requirements:**

#### FR-28: Keeping availability

A Vendor maintains availability for what they actually sell. Realizes UJ-2.

**Consequences (testable):**
- Availability is held per **Space** where the Service has Spaces, and per Listing where it does not.
- Availability is expressed in **Slots** — morning, afternoon, evening, night `[ASSUMPTION A-2]` — not whole days. A morning Haldi does not consume an evening Reception.
- **The four Slots are the same for every Service.** They are a property of the day, not of what is being sold, because a Family assigns her Functions to Slots before she has chosen a single Vendor.
- A Vendor whose real hours sit awkwardly inside a Slot marks the Slot they occupy and states the detail in their Listing. The platform matches on Slots; the parties settle the hour between themselves.
- A Vendor can block Slots for maintenance, family use or any reason, without stating one.
- A confirmed **Agreement blocks the relevant Slots or Span automatically** — for a Span Service, the whole Span, overnight included. The Vendor does nothing.
- A cancelled Agreement **releases** those Slots immediately.
- For a Service with no calendar, availability reduces to whether the Vendor is currently accepting Enquiries.

#### FR-29: Nudging a calendar that may have drifted

Where a Vendor's stated availability is attracting interest, the platform asks them to confirm it rather than assuming it. Realizes UJ-2.

**Consequences (testable):**
- Where a Vendor shows available on days drawing Enquiries — **three or more touching the same period** — they are prompted to confirm that availability still holds.
- **At most one nudge per Vendor per seven days**, however many periods are drawing interest. This is a prompt to the person paying you, not a campaign.
- The prompt reaches them on **WhatsApp**, their primary channel, not only inside the portal.
- **A Vendor who does not respond is not penalised, and their availability is not changed by the platform.** Silence is not treated as unavailability.
- Because freshness rests on this and nothing stronger, **no surface anywhere states availability as fact.** Every availability display is attributed to the Vendor.

#### FR-30: Pricing that moves with the season

A Vendor prices their own dead months. Realizes UJ-2.

**Consequences (testable):**
- A Vendor can set different pricing for periods they define — off-season, off-muhurat, or any period of their choosing.
- A Family always sees the price applicable to **their own Block**, not a headline price they will later be quoted differently against.
- Seasonal pricing is the Vendor's own decision. The platform neither sets it, suggests it, nor requires it.

#### FR-31: Seeing where the year is empty

A Vendor can see their own calendar's health and act on it. Realizes UJ-2.

**Consequences (testable):**
- A Vendor can see which of their Slots are empty, and which are drawing no interest.
- They can price those periods differently under FR-30, which is what surfaces them to Families whose Blocks fall there.
- This view is the Vendor's own. It is never shown to Families, and empty availability is never marketed as distressed.

### 4.7 Enquiries

**Description:** An Enquiry is where Vivah Spot's advantage over every competing platform actually shows. Elsewhere a Vendor receives "someone is interested in your venue" and has to start from nothing. Here Dattatray receives a wedding: 27 November through the 28th, 600 guests, ₹8L across the whole event, Haldi and Wedding and Reception, and a Family who has already read his Rules and shortlisted him anyway.

That is the answer to the lead-quality complaint that drives Vendors off other platforms, and it costs nothing to provide, because the Workspace already knows all of it.

**Functional Requirements:**

#### FR-34: An Enquiry carries the wedding with it

When a Family enquires, the Vendor receives the context needed to quote without asking for it. Realizes UJ-1, UJ-2.

**Consequences (testable):**
- An Enquiry carries the Chosen or Candidate Block, the relevant Functions with their days and Slots, the guest count that applies to those Functions, and the Wedding's budget context.
- It carries which of the Vendor's Spaces or offerings the Family is asking about.
- **A Vendor never has to ask a Family for information the platform already holds.**
- An Enquiry is sent by the Creator alone. Invited Members cannot send one.
- **A Family can send one Enquiry to several Listings in a Service at once** — the Shortlist she is comparing — without composing it repeatedly.
- **An account cannot enquire with its own Listing.** Where one account holds both Family and Vendor roles, its own Listings are excluded from the Listings it can enquire with. See FR-39, which owns this rule and states why.
- **Each Vendor receives their own thread.** No Vendor sees which others were approached, how many, or what they quoted.
- **The Lead Dashboard distinguishes an Enquiry sent to several Vendors from one sent only to that Vendor.** Both are real, but they are not worth the same, and a renewal argument built on an inflated count would be a dishonest one. SM-2's Enquiry-quality counter-measure depends on the distinction being made.
- An Enquiry is contact, not a transaction, and creates no obligation on either side.

#### FR-35: One thread, both sides, one truth

The Family and the Vendor work in the same thread and see the same history. Realizes UJ-2, UJ-3.

**Consequences (testable):**
- Both parties see the same messages in the same order.
- The Vendor can send a quote into the thread, and can propose terms for an Agreement from it.
- **The thread of record lives in the platform.** WhatsApp carries a notification containing the Enquiry summary and a link into that thread; it is never itself the conversation surface. This is what makes immutability, structured proposals and measurable response times possible at all.
- The Vendor is notified on **WhatsApp**; the Family in the app.
- If WhatsApp delivery fails, the notification falls back to SMS. A Vendor is never left unaware of an Enquiry because one channel was unavailable.
- Neither party can alter or delete what was said.
- **An Enquiry with no Vendor reply after thirty days is shown to the Family as unanswered**, so she stops waiting. Nothing is held against the Vendor for it.

#### FR-36: Contact Reveal

The Family obtains the Vendor's direct contact and the platform records that it happened. Realizes UJ-2.

**Consequences (testable):**
- A Family can obtain a Vendor's direct contact details from the Listing or thread.
- Each Contact Reveal is counted and attributed, and appears on the Vendor's Lead Dashboard.
- Nothing prevents the parties continuing off-platform. The platform records that contact was made, not what followed.

#### FR-37: The Vendor records what became of it

A Vendor marks each Enquiry's outcome as it moves. Realizes UJ-2.

**Consequences (testable):**
- An Enquiry is **sent**, then **answered** or — after thirty days with no Vendor reply — **unanswered**. A Vendor marks its progress: **contacted**, **site visit arranged**, **won**, **lost**. An Enquiry that produced a confirmed Agreement is **won** whether or not the Vendor marked it so.
- Outcomes feed the Vendor's own Lead Dashboard and nothing else. **An outcome is never shown to the Family**, and never affects the Vendor's public standing or their position in results.
- **Reply speed is a different thing from an outcome**, and it does affect ranking (FR-20). Whether Dattatray answered is something a Family experiences directly; whether he then won or lost the wedding is his own business.
- A Vendor's failure to mark outcomes reduces the usefulness of their own dashboard and carries no other consequence.

#### FR-38: Site visits

A Family can arrange to see the place before committing. Realizes UJ-2.

**Consequences (testable):**
- A Vendor can offer a site visit from within the thread, and the Family can accept a time.
- An arranged visit appears in the Family's Workspace alongside the Wedding.
- A site visit reserves nothing and blocks no Slot.

### 4.8 Agreements

**Description:** The Agreement is the quietest thing in this product and it carries the most weight. It is what converts an Enquiry into a real engagement, what blocks a calendar, and what earns both sides the right to review each other. It is also the point at which Vivah Spot most carefully does nothing.

The platform hosts the record. It does not mediate it, enforce it, adjudicate it, or stand behind it. That restraint is not timidity — it is the specific thing that keeps the platform a non-party, and Indian decisions on marketplace liability have turned on precisely this distinction.

**Functional Requirements:**

#### FR-39: Terms are proposed, then confirmed by both sides

An Agreement exists only when both parties have confirmed the same terms. Realizes UJ-3.

**Consequences (testable):**
- A Vendor proposes terms from the Enquiry thread: the days and Slots, the Space or offering, the guest count, the all-in price, what is included, **the delivery timeline from their Commitment**, and the Rules that apply. All of it is frozen at confirmation under FR-43.
- **The platform supplies the structure; every value in it is the Vendor's.** No term is pre-filled, suggested or defaulted by Vivah Spot, and there is no standard form of agreement the platform authors.
- The Family confirms, then the Vendor confirms. **An Agreement does not exist until both have.**
- **The two confirming parties must be different accounts.** One account holding both a Family and a Vendor role cannot confirm both sides of the same Agreement, and cannot enquire with, select or agree with its own Listing.
- **This bar is account-scoped, and that is an accepted limit.** FR-1 permits one person to end up holding two accounts where a sign-in method could not be linked. A determined person could therefore engage themselves across two accounts. The bar removes the accidental and the casual case; it is not proof against deliberate collusion, which Verification and Admin removal (FR-60) are. Without this a Vendor could manufacture an engagement with himself, mark Delivery, and publish a verified Review of his own Listing — defeating the only consequence this platform has and buying rank with it.
- Either party may decline or propose different terms; nothing is created until both agree on the same version.
- On the Family's side, only the Creator may confirm. Invited Members cannot.
- **Nothing holds a Slot before an Agreement exists.** A Quote reserves nothing, a Site Visit reserves nothing, and a Family's confirmation reserves nothing while it waits on the Vendor.
- **Confirmation is first-writer-wins.** If the Slots or Span are already blocked when the Vendor confirms, the confirmation fails, and the Vendor is told which engagement conflicts. The Vendor may cancel that other Agreement first — with every consequence FR-42 carries — and then confirm.
- The Family whose confirmation is overtaken is told, and the proposed terms return to the thread as declined-by-conflict rather than silently expiring.
- A Vendor therefore cannot double-commit *through* the platform. They remain free to double-commit outside it, which is the line drawn everywhere else in this document.

#### FR-40: What an Agreement does

Confirmation has five consequences and no others. Realizes UJ-2, UJ-3.

**Consequences (testable):**
- The Agreement is **timestamped** and recorded against both parties.
- The relevant **Slots or Span are blocked** on the Vendor's calendar automatically, with no action by the Vendor.
- The engagement appears as committed in the Family's Workspace, and its agreed figure replaces the estimate in the running budget.
- It becomes the **sole gate** for Review rights on both sides, once Delivery is reached.
- Both parties can download a copy at any time.

#### FR-41: What an Agreement is not

The platform's role ends at hosting the record. Realizes UJ-3.

**Consequences (testable):**
- **No surface, document, notification or item of copy describes the Agreement as legally binding, enforceable, guaranteed or underwritten by Vivah Spot.** The platform states what it did — recorded terms both parties confirmed — and nothing beyond that.
- Vivah Spot does not mediate disputes, determine fault, or offer any process for resolving a disagreement about an Agreement.
- No money passes through the platform at any point in the life of an Agreement.
- The platform authors no default terms. Every term in an Agreement comes from the Vendor's own proposal.

#### FR-69: Amending an Agreement

Terms change. Guest counts move, a Function shifts an hour. An Agreement can be amended without either party being recorded as having broken it. Realizes UJ-3.

**Consequences (testable):**
- Either party may propose an **Amendment** from the Enquiry thread, and it takes effect only when **both confirm** — exactly as the original did.
- **The original is never altered.** The Amendment is appended to the same Agreement's history, which remains append-only and frozen at each confirmation. The Agreement's current terms are the latest confirmed version; every prior version stays retrievable.
- **No cancellation is recorded**, on either profile, because nothing was cancelled. A cooperative change is not a walk-out and must not be counted as one.
- Where an amendment changes the days, Slots or Span, the calendar is adjusted on confirmation and the released time becomes available to others.
- Review rights, and the Delivery that gates them, follow the current version.
- **Where the Family revises a Function's stated guest count away from the figure in a confirmed Agreement, they are prompted to amend.** Arriving RSVPs never trigger this on their own — they are information the Family may act on, and FR-11 forbids them moving the stated count by themselves. The Agreement is never updated silently to match, and the divergence is never left unshown.

#### FR-42: Cancelling

Either party can end an Agreement, and the platform records that it ended. Realizes UJ-3.

**Consequences (testable):**
- Either party may cancel at any time.
- The blocked Slots or Span are **released immediately**.
- A cancellation is recorded on both profiles as a countable fact, with no fault attributed or inferred, displayed as a neutral number.
- **The displayed count covers a rolling twenty-four months.** A cancellation from four years ago says nothing, and the count now includes blameless date moves under FR-17.
- **No Review is unlocked by a cancelled Agreement.**
- The withdrawn figure is removed from the Family's running budget.

#### FR-43: The record has to survive being needed

An Agreement is kept in a form that remains meaningful years later. Realizes UJ-3.

**Consequences (testable):**
- The confirmed terms are frozen at confirmation. Neither party, nor Admin, can alter an Agreement after the fact.
- A cryptographic digest of the confirmed document is recorded at the moment of confirmation.
- Confirmation times are recorded from a trusted time source, not from a device clock.
- The history of an Agreement is append-only. Corrections are added; nothing is overwritten.
- Records are retained for **eight years** beyond the wedding, and remain retrievable in the form they were confirmed in.
- A named individual is accountable for the systems holding these records.
- The platform can produce, for any Agreement, a certificate attesting how the record was produced and by which system — the artifact that makes the digest, the timestamp and the named custodian mean anything if the record is ever needed as evidence. Without it the rest of this FR proves nothing in particular.

### 4.9 Reviews

**Description:** Reviews are the only consequence a Vendor faces on Vivah Spot. There is no money to withhold and no delisting for poor service, so everything the trust spine promises rests here — which means the mechanism has to be harder to game than a rating on a directory.

It is: only a real Agreement earns a review, the window opens when the work is actually delivered rather than when the wedding ends, and neither side can see the other's before writing their own.

**Functional Requirements:**

#### FR-44: Only a real engagement earns a review

Review rights come from an Agreement that reached Delivery, and from nothing else. Realizes UJ-3.

**Consequences (testable):**
- A Review can be written only by parties to an Agreement that reached Delivery.
- Enquiring, revealing contact, or shortlisting earns nothing. A competitor cannot review a rival by enquiring with them.
- A cancelled Agreement earns nothing, including one cancelled because the Family moved their Block.
- One Agreement earns one Review from each side.

#### FR-45: The window opens on Delivery

Reviews become available when the work has actually been done. Realizes UJ-3.

**Consequences (testable):**
- The window opens when the Vendor marks the work delivered, **or** when the delivery timeline in the Vendor's own published Commitment (FR-59) passes — whichever comes first.
- **In no case does it open later than one year after the Wedding's last day** — the last Function of the Chosen Block, or where there is none, the latest day of a confirmed Agreement (FR-72). A Vendor cannot publish a three-year delivery timeline and escape review by it. **There is no path to being unreviewable.**
- Every Listing carries a delivery timeline, because FR-59 makes the Commitment a condition of listing. There is no Service for which this trigger is unavailable.
- **The timeline is a duration, and it runs from the last day the Service was engaged for** — the end of a Span, or the Function it served. A ninety-day photography timeline means ninety days after the wedding, not ninety days after something unstated.
- **The timeline that governs is the one captured in the Agreement at confirmation, not the Listing's current value.** A Vendor editing their published timeline afterwards changes what they promise future Families, and changes nothing about a wedding already agreed. Without this a Vendor could push his own review window out by editing a field.
- A Vendor can open the window early by delivering early. **A Vendor cannot hold it shut by delivering late.**
- Delivery itself, where it occurs, is the end of the Span for a venue, the Function for catering, the arrival of the album for a photographer. **The other two triggers open the window without Delivery having occurred**, and do not assert that it has.

#### FR-46: A Family reviews a Vendor publicly

The Family's review is a rating and their own words, published on the Listing. Realizes UJ-3.

**Consequences (testable):**
- A Family submits a rating and free text, published on the **Listing** they engaged. A Vendor holding Listings in several Services is rated separately in each: a caterer who also does décor may be excellent at one and poor at the other, and a single blended figure would tell a Family nothing.
- The rating is **one to five whole stars**. Nothing finer, because nothing finer is meaningful.
- The reviewer is a verified party to a real Agreement, and is shown as such.
- **Reviews are never edited, reordered by sentiment, or selectively published.** A Vendor cannot remove or suppress a review of themselves.
- The basis on which reviews are sorted is disclosed to readers.
- The Vendor has a **right of reply**, published alongside.

#### FR-47: A Vendor reviews a Family through structured questions only

The Vendor's assessment is structured, private to Vendors, and never prose. Realizes UJ-3.

**Consequences (testable):**
- A Vendor answers a fixed set of questions — responsiveness, whether the agreed headcount held, and whether the premises were left as agreed. **These three and no others.** No question asks about money: the platform never sees a payment, cannot verify one, and has no business recording an assertion about a named private individual's financial conduct.
- **No free text.** A Vendor cannot write prose about a named Family anywhere in the platform.
- The result is visible to other Vendors receiving an Enquiry from that Family, and to the Family itself. **It is never published publicly.**
- The Family can see everything recorded about them. **There is no dispute process**, because adjudicating a contested claim between a Family and a Vendor is precisely what §7.2 and FR-41 exclude. A Family who disagrees with a structured entry has the same recourse a Vendor has against a review: their own account of the engagement, not a ruling from Vivah Spot.

#### FR-48: Neither side writes into the other's shadow

Reviews are written blind and published together. Realizes UJ-3.

**Consequences (testable):**
- Neither party can see the other's review before submitting their own.
- **The window is fourteen days from opening.** Both publish when both have submitted, **or when the window closes** — whichever comes first.
- Window close is simultaneously the submission deadline and the publication moment. Nothing can be written on the fifteenth day.
- **A review is published when the window closes even if the other side never wrote one.** Withholding one indefinitely because the other is missing would be selective publication.

#### FR-49: Moderation is neutral

Reviews are moderated for legality, not for sentiment. Realizes UJ-3.

**Consequences (testable):**
- Reviews are moderated only for unlawful content, personal data that should not be public, and abuse.
- **A review is never removed, delayed or demoted for being negative**, and moderation criteria do not vary with rating.
- A removed review is recorded as removed, with the reason, and the author is told.

### 4.10 Subscription & Billing

**Description:** This is the only money the platform ever touches. Dattatray pays to be listed; no one else pays anything, ever. Because there is no auto-renewal, he makes a fresh decision every term — which means the Lead Dashboard in 4.11 is not a nice extra, it is the entire renewal argument.

**Functional Requirements:**

#### FR-50: Tiers, and what actually differs between them

A Vendor chooses a tier, and the tier changes what they get. Realizes UJ-2.

**Consequences (testable):**
- Tiers are **Founding Vendor**, **Basic** and **Featured**.
- What differs between Tiers is: **placement in the marked Featured band, and portfolio allowance** — how many images a Listing may publish. Nothing else.
- **The allowance is a number Admin sets per Tier, without a code release.** A Listing that exceeds its allowance after a Tier change keeps its images and publishes them up to the new allowance; nothing a Vendor uploaded is destroyed by a change of plan.
- **A Subscription is held for one Service.** A Vendor listing in two Services holds a Subscription for each. That is how a venue and a mehndi artist come to pay different amounts for the same platform.
- **A Subscription buys no territory and limits no reach.** What a Vendor pays is determined by their Service and by where their own business sits; who can find them is not restricted by it. A Family anywhere may search, see and enquire with any Vendor.
- **What never differs is any condition of listing.** The conditions in FR-59 and FR-71 apply identically at every Tier, including the free one. Paying buys visibility and allowances, never an exemption.
- **No tier buys position within organic results**, which are ordered on merit and are not for sale at any price.
- **Price is set per Service, per the Vendor's own Place, per Tier — by Admin, without a code release.** A venue in a district town and a mehndi artist in a village are not the same business and cannot carry the same fee. With fifty Services in the catalog most Vendors are small ones, and a single price would either underprice where the money is or exclude the long tail that makes the catalog worth having.
- **Price is never a function of reach.** Nothing a Vendor pays widens or narrows who can find them, and no Tier or fee grants territory.
- Admin can change a price at any time. **A change never alters what a Vendor already bought** — an active Subscription runs to its end at the price paid, and the new price applies at renewal.
- The actual figures are a business input, set outside this document.

#### FR-51: The Founding Vendor tier carries no strings

The launch cohort lists at ₹0, and that is genuinely free. Realizes UJ-2.

**Consequences (testable):**
- The Founding Vendor tier is a real tier with a real expiry date, not a bypass or a hardcoded exemption. Moving a Vendor to a paid tier is a change of data, not of code.
- **Expiry is a fixed calendar date set per cohort**, not a term running from each Vendor's sign-up, so the conversation about paying happens once rather than trickling across a year.
- **No obligation of any kind attaches to it** — no testimonial, no exclusivity, no minimum term, no lock-in, no commitment to convert. A free tier with obligations attached is not free, and would be treated as a supply for consideration.
- A Founding Vendor sees the same Lead Dashboard as any other, because that record is what the conversation about paying will rest on.

#### FR-52: Paying, and being invoiced properly

A Vendor pays online and receives a compliant invoice. Realizes UJ-2.

**Consequences (testable):**
- **The term is twelve months.** A Vendor pays online, in advance, for a year.
- A year is the term because a year always contains a full wedding season. A shorter term bought in Chaturmas would charge a Vendor for months in which the platform cannot deliver anything, and ask him to renew at the moment his experience of it has been worst.
- A **GST-compliant tax invoice** is issued for every payment and is downloadable at any time.
- Tax is determined by the recipient's State, not assumed from the operator's.
- **A prepaid term is an advance.** The full tax liability falls in the period of collection and is not spread across the term.
- The platform collects no money other than Subscriptions. It never collects, holds, routes or refunds money between a Family and a Vendor.

#### FR-53: Expiry

A Subscription ends, and what happens next is knowable in advance. Realizes UJ-2.

**Consequences (testable):**
- A Vendor is reminded **thirty, fourteen, seven and one day** before their term ends, on WhatsApp and in the portal. With no auto-renewal, the reminder is the renewal mechanism.
- After expiry the **Grace Period** runs — thirty days — during which the Listing remains live.
- After the Grace Period, the Listing is **withdrawn from discovery** — it does not appear in search, comparison or matching, and no new Enquiry can be sent to it.
- **Existing engagements are untouched.** Confirmed Agreements stand, their Slots stay blocked, open Enquiry threads stay open and answerable, and review windows still open on Delivery. A Vendor who lapses still owes the weddings they took.
- A Family with the lapsed Listing on a Shortlist is told it is no longer available. **Where it was their Selection, the Selection is cleared and its contribution withdrawn from the running budget.** Nothing is removed silently.

- **Nothing belonging to the Vendor is destroyed.** Listings, portfolio, calendar, Enquiry history, Lead Dashboard and Reviews are retained and reappear intact on renewal.
- Reviews already published about a lapsed Vendor remain published. A Vendor cannot erase their record by ceasing to pay.

**Leaving discovery — all four routes, and they behave identically for Families.** A Subscription lapsing past its Grace Period; the Vendor withdrawing it themselves (FR-70); Admin removing the Vendor (FR-60); and a condition of listing ceasing to be satisfied (FR-59, FR-71). In every case: the Listing stops appearing and accepts no new Enquiry; existing Agreements, open threads and review windows are untouched; and every Family holding it on a Shortlist or as a Selection is told, with the Selection cleared and the budget adjusted. **No route removes a Listing from a Family's view without telling them.**

#### FR-54: Renewal is an active decision

Nothing renews by itself. Realizes UJ-2.

**Consequences (testable):**
- There is no auto-renewal, standing mandate or stored instruction to collect. Every term is paid by a deliberate act.
- No arrangement makes a Subscription non-cancellable, and no term is presented as irrevocable.

### 4.11 Lead Dashboard

**Description:** Dattatray is asked to pay again every year with nothing compelling him to. This screen is the whole argument. It has to answer one question honestly: *what did I get for my money?* — and it has to keep answering it when the answer is unflattering, because a dashboard that only looks good stops being believed.

**Functional Requirements:**

#### FR-55: What the Vendor can see about their own performance

A Vendor sees what the platform actually produced for them. Realizes UJ-2.

**Consequences (testable):**
- The dashboard shows Listing views, Contact Reveals, Enquiries received, the Vendor's own response times, and outcomes as the Vendor recorded them.
- **Response time is the median time to first reply**, not the mean. One bad fortnight should not define a good Vendor.
- Figures are shown over time, so a Vendor can see a season rather than a snapshot.
- **Figures are not curated.** A poor period is shown as a poor period.

#### FR-56: What it cost per lead

The subscription is expressed in the terms the Vendor actually thinks in. Realizes UJ-2.

**Consequences (testable):**
- The dashboard states what the Vendor paid for the term and what it produced — Enquiries received, and the resulting cost per Enquiry.
- Where the Vendor has recorded outcomes, cost per won engagement is shown too.
- For a Founding Vendor the cost is ₹0, and the figures still accumulate — that record is what the renewal conversation is built on.

#### FR-57: How they compare

A Vendor sees where they stand against their own Service and Place. Realizes UJ-2.

**Consequences (testable):**
- The dashboard compares the Vendor's own figures against aggregates for their Service in their Place — response time, conversion, enquiry volume.
- Comparisons are **aggregate only**. No other Vendor is ever identified, and no figure is shown that could identify one.
- **No comparison is shown at all unless at least five Vendors are active in that Service and Place.** Below that, an average identifies the competition.
- Comparisons are framed to be actionable — a Vendor who replies slowly is told what fast replies look like.

### 4.12 Trust & Verification

**Description:** Everything the platform claims about a Vendor is only as good as a person who drove out and looked. §12 of the scope document is explicit that this is human work the client supplies. The platform provides the workflow and the record; it cannot provide the diligence.

**Functional Requirements:**

#### FR-58: Nothing lists without Verification

A Vendor is verified before their Listing is visible to anyone. Realizes UJ-4, UJ-2, UJ-3.

**Consequences (testable):**
- Identity, business registration and portfolio authenticity are verified before a Listing can be published.
- Verification is recorded against the Admin user who performed it, with when and on what basis.
- Verification covers the images a Listing publishes. Where a Tier change raises the portfolio allowance, the newly published images are covered by the re-verification rule below like any other change to what was verified.
- Verification is not a self-declaration a Vendor can make about themselves.
- **Changing what was verified requires verifying it again.** New portfolio images, a change of business identity or a new Space are not publicly visible until Verification has covered them. Without this, a Vendor can pass Verification with real photographs and replace them the next day, which is the fraud FR-60 exists to remove.

#### FR-70: Becoming a Vendor

A business signs itself up, and the path from arriving to being listed is visible to them throughout. Realizes UJ-2 and UJ-4, and is what SM-1 measures.

**Consequences (testable):**
- A Vendor self-registers, builds their Listing, and submits it for Verification. No Admin action is needed before that point.
- Work in progress is saved as it is entered. A Vendor can leave and return without losing anything, as a Family can.
- A Vendor can always see where they stand: what is still missing, that Verification is pending, that it has succeeded, or that it has failed and why.
- **Verification failure is a state a Vendor can act on**, not a rejection. They correct what was wrong and resubmit.
- A Listing becomes publicly visible only when Verification has completed and every condition of listing in FR-59 is satisfied — and, where a Tier is required, when a Subscription is active.
- A Vendor may withdraw a Listing from discovery themselves at any time, without losing it. What Families holding it then see is the four-route rule at the end of FR-53.

#### FR-59: Conditions of listing

Some things are not optional at any tier. Realizes UJ-4, UJ-1, UJ-2.

**Consequences (testable):**
- A Listing cannot be published without: completed Verification, an all-in price, published Rules, and a published **Commitment** — the delivery timeline, what is included, and the no-hidden-charges declaration.
- **The delivery timeline is not optional.** It is what FR-45 relies on to stop a Vendor holding the review window shut, and a Listing without one cannot be published.
- **It is stated as a duration running from the last day the Service was engaged for** — the end of a Span, or the Function it served. A Service rendered at the Function itself states zero days; a photographer states however long the album takes. **Zero is a valid answer and is the common one.**
- These apply identically at every tier including Founding Vendor.
- A Listing that stops satisfying them stops being discoverable until it does again, under the four-route rule at the end of FR-53.

#### FR-60: Removal

Admin can remove a Vendor, and the grounds are narrow and stated. Realizes UJ-4.

**Consequences (testable):**
- Admin can remove a Vendor from the platform.
- Removal is for fraud, falsified Verification, stolen or misrepresented portfolio, or impersonation — **not for service quality**, which is answered by Reviews alone.
- **A Family holding an Agreement with a removed Vendor is told that the Vendor was removed** — not merely that a Listing is gone — and asked to find another Vendor for that Service. This is the one route out of discovery that does not inherit the uniform rule at the end of FR-53: that rule rests on "a Vendor who lapses still owes the weddings they took", which is true of a late payer and false of a fraud.
- The platform **does not cancel the Agreement**, because it is not a party to it and terminating other people's agreements is the one thing this posture never does. The Family ends it if they choose, and **that cancellation is not counted against them** — they did nothing.
- Everything else about the Family's position — Shortlists, Selections, the budget — follows the four-route rule at the end of FR-53.
- **No complaint pipeline, standing score or automated delisting exists.** There is no process by which poor performance leads to removal.
- A removal is attributed to the Admin user who made it and the reason is recorded.
- On removal, Reviews already published remain published.

### 4.13 Admin Console

**Description:** Admin is a small team doing three jobs: verifying Vendors in person, configuring the catalog as it grows, and meeting the obligations that fall on any Indian platform hosting other people's content. Everything is available to every Admin user; what matters is that actions are attributable.

**Functional Requirements:**

#### FR-61: Admin has every capability

**No capability is withheld from an Admin user by role** — and that is a different claim from having no limits. Realizes UJ-4.

**Consequences (testable):**
- No scoped roles, permission tiers or approval chains exist.
- The integrity constraints in FR-43, FR-46 and NFR 5.7 bind Admin as they bind every other actor. Admin cannot alter a confirmed Agreement, edit or suppress a Review, or erase an audit record.
- Access to Guest contact data is confined to those with an operational need, and is logged.
- **Every Admin action that changes a Vendor's standing, a Listing's visibility, published content, or a person's access to their own account is attributed to the individual who took it**, with a timestamp, and cannot be erased. Account recovery under FR-1 is such an action: it hands one person control of another's account, and it is the single most sensitive thing Admin does.

#### FR-62: The catalog is configured, not built

Admin extends the platform without a release. Realizes UJ-4.

**Consequences (testable):**
- **[AMENDED]** Admin can define a new Service's **declarations** — its taxonomy, filters, comparison attributes, Sizing Attribute, Order Basis, Engagement Model and pricing model — without a code release. Its **field set** and its **behaviour** are code: adding a Service means one detail DocType and one handler module (AD-5, AD-6, AD-8).
- Admin can open a new Place at any level of the hierarchy without a code release.
- Admin sets and changes **Subscription prices per Service, per Place, per Tier** without a code release, and can see what a Vendor is currently paying and under which price. The Place in that matrix is where the **Vendor's own business sits**, not anywhere they might be found.
- **[AMENDED]** Adding the fiftieth Service is the same act as adding the sixth — but that act includes a detail DocType and a handler module, not configuration alone. Chosen deliberately against a bounded catalog of 50–60 (AD-5).
- **[AMENDED]** **A configuration change never rewrites what already happened — for presentational declarations.** Existing Listings, Shortlists, Enquiries and Agreements keep the shape they were created under; a changed Service applies to what comes after it. Where a change would make an existing Listing incomplete, that Listing keeps its published state and its Vendor is asked to supply what is now needed. **This does not hold for the behaviour declarations** (Engagement Model, whether the Service has Spaces), which are read live: changing one reinterprets occupancy already written, so it is a data migration rather than a configuration edit (AD-8).

#### FR-63: The obligations of hosting other people's content

The platform meets what is required of an intermediary operating in India. Realizes UJ-4, UJ-3.

**Consequences (testable):**
- A named grievance officer is published, with contact details reachable from every surface.
- Every complaint is acknowledged on receipt, given a reference the complainant can quote, and **disposed of within seven days**.
- Content identified as unlawful is **removed within thirty-six hours**; content subject to a court order or a government direction, **within three hours**.
- Information sought by an authorised government agency is furnished **within seventy-two hours**.
- Removed content and its associated records are **retained for one hundred and eighty days** after removal.
- A register of repeat infringers is kept.
- Users are reminded of the platform's terms and the rules governing what may be posted **at least once a quarter**.
- Every removal is logged with its ground, its authority and the Admin user who acted.

#### FR-64: Disclosure

What the platform does with ranking and differentiation is stated publicly. Realizes UJ-4, UJ-1, UJ-2.

**Consequences (testable):**
- The main parameters determining organic ordering are published in plain language, reachable by any Family. What that disclosure must contain is specified at FR-20 and is not restated here.
- Any differentiated treatment between Vendors is stated in the Vendor terms.
- These are two separate disclosures to two separate audiences, and both exist.

### 4.14 Real Weddings & Inspiration

**Description:** A Family that has just finished a wedding is holding the most persuasive thing on the platform — proof that this venue, this caterer and this photographer actually delivered. And because Vivah Spot holds the Agreements, it knows the proof is real. A published wedding here is evidence in a way a competitor's gallery is not.

What this is not is a social network. There is no feed to follow, no comment thread, no guest posting, no hashtag and no stream.

**Functional Requirements:**

#### FR-65: A Family can publish their wedding

After the wedding, the Family can publish it for others. Realizes UJ-1, UJ-3.

**Consequences (testable):**
- The Wedding's Creator can publish photographs, the Vendors engaged, the Functions held and an approximate cost.
- **Only Vendors with an Agreement for that Wedding can be named as having worked on it.** A Family cannot credit a Vendor they did not engage, and cannot omit the Agreement record to credit another.
- Published weddings are browsable by others, and a Vendor named in one gains verified evidence of real work on their Listing.
- Publishing is entirely optional and never a condition of anything, including any tier or benefit.
- **The Creator can publish short vertical video of their own Wedding**, under the same FR-66 consent and alongside the photographs. Only the Creator uploads, and only of their own concluded Wedding. Clips name the Space and the credited Vendors and are tappable through to those Listings. **The ordering of any feed of published clips is disclosed in plain language on the same terms as FR-20's search ordering, and no position can be paid for** — an undisclosed ordering would be the platform's own editorial selection rather than hosted third-party content. *(Added 2026-09-06 by the UX run. Video appeared nowhere in this document before this date; §11 therefore excluded it. Behaviour is specified in EXPERIENCE.md under Real Weddings.)*

#### FR-66: Consent governs what is published

Publishing a wedding publishes real people, and that is treated accordingly. Realizes UJ-3.

**Consequences (testable):**
- The Family gives explicit consent to publish, separately from any other consent, and can withdraw it at any time.
- Withdrawal removes the published wedding from discovery, including any Vendor evidence derived from it.
- A named Vendor can decline to be credited, and their name is removed without removing the wedding.
- Guests are not named, tagged or identified.
- Approximate cost is published as a band, never as another party's confidential figure.

#### FR-67: Inspiration

A Family collects what they like as they plan. Realizes UJ-1.

**Consequences (testable):**
- A Family can save images and Listings to boards within their Workspace.
- Boards are private to the Wedding and its Invited Members.
- Saving a Listing to a board does not shortlist it, enquire about it, or affect the budget.
- There is no following, no public board, and no interaction between Families.

## 5. Non-Functional Requirements

*Cross-cutting requirements. Binding on every surface and on every downstream artifact.*

### 5.1 Language

**The interface ships in English.** Marathi and other regional languages are not shipped.

Language is deliberately **not** modelled as an app-wide switch that flips everything into one language. Mixed-language use is the norm among these users, not an edge case, and a binary toggle serves nobody well.

- The interface is English throughout, on every surface.
- **Content is stored and shown exactly as the person wrote it** — a Vendor's Rules, Commitments and Listing descriptions, a Family's review — in whatever language or mixture of languages they used. The platform does not translate it, normalise it, or require a language to be declared for it.
- No app-wide language switch is offered.

*Technical note: the Tech-Stack document instructs that i18n be wired from day one and translated later, on the grounds that retrofitting it is brutal. That instruction stands and belongs to architecture; it is insurance against a future decision, not a commitment to ship a second language now.*

### 5.2 Surfaces

- **Families** are served by a mobile application on **both Android and iOS**. iOS is not deferred.
- **Vendors** are served by a responsive web portal that is **phone-first**. Dattatray works from his phone at a function, not from a desk, and "responsive" here means designed for that case rather than tolerating it.
- **Admin** is served by a web panel.

*This supersedes Scope §9 and §11, which deferred iOS.*

### 5.3 Performance

Families are on mid-range Android phones on patchy mobile data, often at a venue or in a market. Vendors are on phones between jobs.

- Search, comparison and Block matching remain usable on low-bandwidth connections and low-end devices.
- Imagery is the bulk of this product's weight and is delivered accordingly — sized for the device, cached, and never blocking the content around it.
- Work in progress survives a lost connection. Nothing a Family has entered is lost to a dropped signal.

### 5.4 Availability

The wedding calendar is violently seasonal. Muhurat clusters demand into a handful of weeks, and Chaturmas empties months at a stretch.

- The platform is sized for peak muhurat load, not for average load.
- Vendor-facing surfaces stay available during peak, because that is when a missed Enquiry costs a Vendor a wedding.

### 5.5 Data protection

The platform holds two very different kinds of personal data: that of people who chose to use it, and that of wedding guests who did not.

- **Guest contact details are used to compose that Wedding's invitations and for nothing else.** They are never used for marketing, never messaged by the platform, and never used to build an audience.
- They are erased when the purpose is exhausted, which is thirty days after the Wedding concludes under FR-72, or immediately on abandonment. **A dismissed guest-form submission is erased at once** — the Family has said this person is not coming, and there is no purpose left to hold their number for. Until then a Family may still be chasing replies; after it there is nothing left to invite anyone to. They are not retained for the Agreement retention period — Guests are not party to any Agreement.
- Every person whose data is held can see it and correct it, including people who never held an account.
- **Erasure is available except where a record must be retained**, and those exceptions are stated rather than implied: a confirmed Agreement and its evidence trail (FR-43, eight years), a published Review, and an Admin action log. Everything else — Guest contacts, Shortlists, Boards, guest lists, an unconfirmed Wedding — is erasable on request.
- Where a record must be retained, the person is **pseudonymised within it rather than refused**: their identifying details are replaced with a stable non-identifying token. A Review's text stands with its author de-identified; an Agreement stands as the record of an engagement between two parties; an invoice stands. What is erased is the person's identity, not the other party's history.
- Where erasure is refused or limited, the person is told which retention basis applies.
- This precedence is deliberate and must not be re-derived downstream: **consent-based data is erased; records of an engagement between two parties, and records held under a legal obligation, are pseudonymised and retained.**
- Consent is specific, informed and separately given for each purpose, and withdrawable as easily as it was given.
- A published Real Wedding rests on explicit consent that can be withdrawn, and withdrawal removes what was derived from it.
- Personal data breaches are reported to the regulator and to affected people **within seventy-two hours** of becoming aware of them.
- **No dark patterns.** Nothing is designed to obtain a consent, a subscription or a permission the person did not intend to give. Paid placement is labelled. Nothing is pre-ticked. Cancelling is as easy as starting.

### 5.6 Legal posture

This is a requirement, not a disclaimer, and it constrains what may be built.

- **Vivah Spot is not a party to any engagement between a Family and a Vendor.** It takes no commission, holds no money, authors no terms, offers no assurance, and mediates no dispute. Each of those is a line that, if crossed, moves liability onto the platform.
- **No surface anywhere describes an Agreement as legally binding, guaranteed, enforced or underwritten by Vivah Spot.**
- The platform makes no guarantee about vendor performance, delivery, quality or attendance. It publishes what Vendors themselves declare, and it says who is speaking.
- **Availability is always attributed to the Vendor, never asserted by the platform.**
- Marketing copy, app copy and vendor-facing material are all bound by this. A guarantee the platform cannot honour is worse than none, and inducing a payment on the strength of one is an exposure.

### 5.7 Records

- Agreements, Verifications, Reviews, account recoveries, and Admin actions that change standing or visibility are retained, attributable, and not silently alterable.
- Corrections are appended. Nothing is overwritten.
- The evidential requirements for Agreement records specifically — the eight-year retention, the digest, the trusted timestamp, the named custodian and the certificate — are stated in full at FR-43 and are not restated here.

### 5.8 Accessibility

- **Every surface** meets WCAG 2.1 AA — the Family application, the Vendor portal, the admin panel, and the two public pages: the RSVP page and the guest form. Both public pages are included deliberately. The RSVP page is the platform's largest public surface, seen by hundreds of Guests per Wedding. The guest form is the stronger case still: many who reach it do so because someone forwarded the link, and none of them chose to be there at all.
- Nothing essential is conveyed by colour alone — verified status, availability and paid placement each carry a non-colour indicator.

### 5.9 External dependencies

*Things this platform requires that no amount of building supplies. Each is a hard blocker on a capability specified above, and each belongs to the business rather than to the build. Recorded here so that no downstream agent discovers them as a surprise.*

| Dependency | Blocks |
|---|---|
| Subscription prices per Service, Place and Tier, and the portfolio allowance per Tier | FR-50, FR-27 |
| The Founding Vendor cohort definition and its expiry date | FR-51 |
| Legal terms and privacy policy, including the non-party statement | NFR 5.6, FR-41 |
| Business and GST registration | FR-52 |
| A payment gateway merchant account | FR-52 |
| An initial pipeline of Vendors willing to list | SM-7, and the cold start entirely |
| **Staff who physically visit and verify Vendors and portfolios** | FR-58, and with it the whole trust spine |
| A named grievance officer | FR-63 |
| A named individual accountable for evidential records | FR-43 |

The verification staffing is the one to watch. Every trust claim this platform makes resolves to a person having driven out and looked. The platform supplies the workflow and the record; it cannot supply the diligence.

### 5.10 Identity and voice

*Recorded here because this PRD is the chain-top artifact. The identity is owned by `_bmad-output/planning-artifacts/ux-designs/ux-vivahspot-2026-09-06/DESIGN.md`, which is the single source of truth for colour and type; `packages/shared/src/tokens.js` is its projection and is regenerated from it. This section records the register, not the values.* *(Amended 2026-09-06 by the UX run. This note previously named `tokens.js` as the source and instructed downstream UX work not to invent a palette. That instruction was written when the published prototype was all that existed; the prototype's palette was a placeholder and has been replaced.)*

- **The product is Vivah Spot.** The tagline is **"Big day, sorted."** — the tone the whole product is written in: calm, capable, unfussy. Not romantic, not corporate.
- **The palette is festive, not corporate.** Kumkum vermillion carries every action, turmeric carries celebration, on a warm cream ground with a warm-tinted shadow rather than a neutral grey one. Headings are set in a display serif, body text in the system sans stack, and Devanagari user content in a paired Devanagari serif. Exact values live in `DESIGN.md`. *(Amended 2026-09-06 by the UX run; previously described the placeholder rose-pink palette.)*
- **One token in the palette is an accessibility decision, not an aesthetic one.** The muted text colour was deliberately darkened to meet contrast on white. It must not be lightened, whatever a future design pass prefers.
- **The voice is plain and confident.** It states what is true — "vendor shows available", not "available"; "we recorded what you both agreed", not "your booking is protected". The restraint the legal posture demands is also the tone the brand wants, which is convenient: this product's credibility comes from not overclaiming.
- **Cultural specificity is a feature, not a localisation problem.** Muhurat, Chaturmas, Haldi, Sangeet, Vidaai, Griha Pravesh, Sakharpuda, Kelvan, aaher, baraat — these are the vocabulary of the market, and the product uses them plainly rather than translating them into generic wedding-industry English. The Function set is not limited to the five named in FR-9; those are a starting set, and Families name their own.

## 6. Success Metrics

*Five outcomes, stated by Abhishek — SM-1 to SM-5. Each carries measures and a counter-measure, because every one of these numbers can be moved by damaging something else. SM-6 and SM-7 follow them: not outcomes, but the growth mechanism and the supply precondition the five depend on. Targets are a business decision and are not set here.*

### SM-1. Onboarding a Vendor is effortless

- **Measure:** median time from a Vendor starting sign-up to their Listing being published; proportion of started onboardings that reach a published Listing.
- **Counter-measure:** proportion of published Listings later found to carry a falsified identity, business registration or portfolio. **Onboarding speed that comes from checking less is not success** — Verification is the whole trust spine, and it is the easiest thing to sacrifice for this number.

### SM-2. Vendors find value for money

- **Measure:** renewal rate at the first paid term. With no auto-renewal, every renewal is a deliberate vote and this is the least gameable number in the product.
- **Measure:** cost per Enquiry, and the proportion of Vendors receiving a meaningful number of Enquiries within a term rather than none.
- **Counter-measure:** Enquiry quality — the proportion of Enquiries a Vendor acts on rather than ignores. **Volume of Enquiries is trivially inflatable and worthless if they are junk**, which is the precise complaint that drives Vendors off competing platforms.
- **Counter-measure:** distribution across Vendors. If a handful receive nearly all the Enquiries, an encouraging average conceals a market that does not work for the people paying for it.

### SM-3. Vendors are happy on the platform

- **Measure:** proportion of Vendors actively maintaining their calendar and responding to Enquiries, rather than dormant.
- **Measure:** Vendor response times, and their movement over a season.
- **Counter-measure:** complaints and voluntary departures, counted separately from expiries. A Vendor who leaves quietly is not the same as one who forgot to renew.

### SM-4. Families are happy

- **Measure:** proportion of Weddings that reach a locked Chosen Block; proportion that reach at least one Agreement.
- **Measure:** ratings Families give Vendors, and their distribution rather than their mean.
- **Counter-measure:** abandonment — Weddings created and never returned to, and Weddings that lock a Block but produce no Agreement. The second is the important one: it means the platform was used to research a decision that was then taken elsewhere.

### SM-5. A Family can build the wedding they wanted

- **Measure:** Services per Wedding fulfilled through the platform. The premise is a wedding assembled service by service, so breadth is the test of whether that premise holds in practice.
- **Measure:** proportion of Weddings where every Service the Family selected reached an Agreement.
- **Counter-measure:** review ratings as breadth rises. **Breadth achieved by pushing Families toward whoever is available is worse than narrowness**, and the ratings will show it before anything else does.

### SM-6. The platform grows through the weddings it serves

*The only growth channel designed into the product.*

- **Measure:** RSVP page visits per Wedding that issued invitations, and the proportion of Guests who go on to start a Wedding of their own.
- **Counter-measure:** none needed — but note that this number can only be earned, since the Family sends the invitations and no one can be messaged into the funnel.

### SM-7. Supply is dense enough for the product to work

*A precondition rather than an outcome.*

- **Measure:** Vendors per Service per Place, against the threshold below which cross-Service Block matching produces no useful answer.
- **Counter-measure:** the proportion of Candidate Blocks that clear a Family's whole set of Selections. **This is the honest test of whether matching is doing anything.** With too little supply it will approach zero, and no other metric will reveal that.

## 7. Scope Boundary

*Not a phase boundary. This PRD describes the complete platform; this section states what that platform deliberately does not do. Each exclusion was decided, and the reasoning is in `.memlog.md`. An agent that finds a gap here should treat it as a gap, not as permission.*

### 7.1 Money

**No money passes between a Family and a Vendor through Vivah Spot. Ever.**

Excluded: booking payments, token or advance payments, escrow, milestone releases, commission, split settlement, payouts, payout KYC, refunds, and any wallet, cart or checkout.

This is not a deferral. It is the commercial model, and it is what keeps the platform a non-party — Indian decisions on marketplace liability have turned on exactly this point, overriding platforms' own disclaimers where the platform collected money. Reintroducing it is a material change to the engagement, the architecture and the regulatory posture.

The platform collects one thing only: **Vendor Subscriptions.**

### 7.2 Standing between the parties

Excluded: dispute mediation, adjudication of fault, **any complaint pipeline about service quality** that leads to a consequence, vendor standing scores, and delisting for poor service.

**Not excluded, and not optional:** the statutory grievance and takedown mechanism in FR-63. That handles unlawful content and legal orders, which is a different thing entirely from judging whether a caterer was late. It is an obligation of operating in India, not a product choice, and it must be built.

Service quality is answered by Reviews alone. Admin removal exists, and is for fraud, falsified verification, stolen portfolios and impersonation — not for performance.

*This supersedes the scope document's §2 objective 4, its §5.3 and its §8, which describe delisting as the primary enforcement lever.*

### 7.3 Supply the platform provides itself

Excluded: first-party services supplied by Vivah Spot, platform-assembled multi-vendor bundles, vendor-authored multi-service packages, the Wedding Manager role, and insurance or any other product distributed by the platform rather than listed by a Vendor.

The platform lists other people's services. It does not sell its own, and it does not assemble other people's into something it appears to stand behind. A Family assembles her own set.

### 7.4 Social

Excluded: following, feeds of other people's activity, hashtags, guest posting, platform-hosted live streaming, comments, likes, and any interaction between Families.

Included, and not to be confused with the above: a Family publishing their own completed wedding, and private inspiration boards within their own Workspace.

### 7.5 Guidance the platform is not qualified to give

Excluded: any compliance layer covering permits, noise curfews, firework restrictions or animal welfare; any statement of local law; any legal guidance to Families or Vendors.

Those constraints reach Families as a Vendor's own published Rules, declared and enforced by the Vendor.

### 7.6 Automation of the Family's judgement

Excluded: ranking or scoring Candidate Blocks by partial availability, recommending one Block over another, choosing or substituting a Vendor, silently removing anything from a Shortlist, and **placing an order at a quantity the Family did not decide**.

**Not excluded: helping the Family arrive at that quantity.** The platform may compute and show a recommended figure — plates, rooms, vehicles — from what it already knows, and explain how it got there. The line is between *suggesting* and *deciding*: the recommendation is always visible, always adjustable, and never travels to a Vendor until the Family has confirmed it.

The platform shows the collision. The Family resolves it.

### 7.7 Deferred, with the path left open

- **Auspicious-date computation.** A Family may ask for muhurat days to be found from birth details, computed by an external astro service. The option is presented; the path is not built. Nothing depends on it — Anchor Dates arrive identically whether a Family chose them or a guruji did.
- **Regional language.** The interface ships in English. i18n is wired from the start as insurance, and no second language is translated. There is no app-wide language switch, and user content is never translated or normalised.

### 7.8 Structural exclusions

- **Multi-user Vendor accounts.** One login per Vendor. No roles, no invitations.
- **Admin role tiers.** Every Admin user has every capability. Attribution, not restriction, is the control.
- **Auto-renewal.** No mandates, no stored instructions, no non-cancellable terms.
- **Gift registry.** Removed entirely — as a feature, as a partner integration, and as a wishlist.

### 7.9 Vocabulary that must not appear

*Enforced across the PRD, the UI, the schema and every downstream document.*

- **Booking / booked** — the platform records Enquiries and Agreements. It books nothing.
- **Cart / checkout** — nothing is purchased.
- **Legally binding / guaranteed / enforced by Vivah Spot** — applied to an Agreement, these create the liability the model exists to avoid.
- **v1 / MVP / Phase N** — this document describes the complete platform.

*The existing prototype code contains "Book Now", "My Bookings" and a bank-details payout section. All are artifacts of the abandoned commission model and must not be treated as specification.*

*Carve-out: §7.1 and this section necessarily contain the banned words in order to ban them. An automated vocabulary sweep should exempt §7.1 and §7.9 and check everything else.*

### 7.10 Assumptions Index

*Everything in this PRD is a decision Abhishek made, with one class of exception: the five entries below. Each is an inference I made and he did not explicitly rule on, tagged inline at the point it applies. **The shortness of this list is the point** — it is the complete set of places where an autonomous build would be following my judgement rather than his. Anything not listed here was decided.*

| # | Assumption | Where | Why it was inferred | What changes if it is wrong |
|---|---|---|---|---|
| **A-1** | A Family may adjust one Candidate Block on its own, leaving the others as they are | FR-9 | Flagged twice as standing unless objected to; never objected to, never affirmed | Blocks become strictly identical shapes shifted across Anchor Dates; a Family whose 22nd needs an evening Haldi cannot express it |
| **A-2** | The four Slots are morning, afternoon, evening, night | FR-28, Glossary | He ruled that Slots are fixed platform-wide rather than per Service; the specific four are mine | A different division of the day — three parts, or six — changes every calendar, every Function assignment and the matching engine's granularity |
| **A-3** | Rating shrinkage becomes negligible at about ten Reviews | FR-20 | He approved the ranking design; this number sits inside it | A higher figure suppresses new Vendors for longer; a lower one lets a handful of Reviews decide the top of the page |
| **A-4** | Catering's Sizing Attribute is capacity — the most they can serve | FR-71 | Derived when the seed table was built; never put to him | Caterers are filtered and compared on a different attribute, or on none |
| **A-5** | Décor is engaged per Function rather than as a Span | FR-71 | FR-14 forbids the Span-engagement-with-per-Function-pricing pairing that was there before; per Function was the reading that did not re-create the setup-teardown collision | Décor becomes a Span Service, and the overnight build between Haldi and Wedding needs an explicit rule again |

**For downstream agents:** treat these five as decided, because they are written normatively in the FRs above. This index exists so that if one of them turns out to be wrong, it can be found and changed deliberately rather than discovered by its consequences.
