---
title: Autonomous-Readiness Review — Vivah Spot PRD
target: prd.md (2026-09-03, status draft)
reviewer: adversarial pass, 2026-09-05
verdict: NOT SAFE TO HAND TO AN AUTONOMOUS BUILD
---

# Autonomous-Readiness Review

## Verdict

**Not safe to hand to an autonomous build in its current state.**

This is an unusually good PRD. §0 states the correct standard ("anywhere this document is silent or vague, an agent downstream will decide for itself, and that decision will be nobody's"), and the document meets that standard on *policy* — what the platform refuses to do, who is liable for what, what may never be said in copy. §7 is genuinely load-bearing and §5.6 is the best-specified section in the document.

It fails that standard on *mechanics*. The PRD is written almost entirely in the declarative present tense of the happy path. It says what the system **is** and very rarely what it **does when something is missing, empty, late, concurrent, revoked, or already gone**. An autonomous agent cannot write a schema, a state machine, or a single API handler from the happy path alone — it will invent the rest, silently, and those inventions will be load-bearing before anyone reads them.

Concretely: **79 gaps found. 18 critical, 31 high, 25 medium, 5 low.** Roughly a third of the critical findings are not omissions but *contradictions* — two FRs that cannot both be implemented. An agent resolving a contradiction is not filling a gap; it is overruling the author.

Three structural observations that matter more than any individual finding:

1. **The document has no state machines.** Not one object in the Glossary (Wedding, Candidate Block, Shortlist, Enquiry, Agreement, Review, Subscription, Listing, Verification, Preferred Vendor association) has an enumerated set of states with named transitions. Every one of them is described by its steady state and one or two happy transitions. Appendix A enumerates what is missing per object.
2. **The document contains almost no numbers.** The only quantities in the entire PRD are: 6/12 month terms, ₹0 for Founding Vendor, eight-year retention, WCAG 2.1 AA, and the fictional ₹8L/600-guest example. Every other quantity the system needs — review window, grace period, OTP expiry, nudge threshold, tier allowances, rating scale, session lifetime, k-anonymity floor, statutory takedown periods — is absent. Appendix B is the full list. This is the single highest-density source of invented decisions.
3. **The word "engage" carries the entire Rules/Preferred-Vendor/budget mechanism and is not in the Glossary** — in a document whose §3 declares "introducing a synonym anywhere is a discipline violation." See C-01.

**What would make it safe:** the 18 criticals must be closed by the author. The 31 highs must be closed or explicitly delegated with a stated default (e.g. "grace period: agent may pick, 7–30 days, record the choice"). The mediums can be batched into a follow-up pass. Closing the criticals and highs is perhaps 60–90 decisions, most of them one line each — the document is close, not far.

---

## How to read this

Each finding: **ID | severity | location | what an agent must invent | suggested resolution.** Suggested resolutions are *proposals for the author to accept or overrule*, not decisions. Where a resolution is obvious from the PRD's own principles, it is marked **(derivable)** — those are the cheap ones.

---

# A. CRITICAL

*A wrong invention here is unrecoverable, or contaminates the schema, or overrules an explicit authorial decision.*

---

### C-01 — "Engage" is the load-bearing verb of the product and is undefined

**Location:** FR-24 ("before the family engages a Space"), FR-25 ("Once a family has engaged a Vendor"), FR-32 ("Before the family engages a Space or Listing"), FR-40, UJ-1, §3 Glossary (absent).

**The problem:** Three separate mechanisms fire on "engagement": Rules begin to bind and close off Services (FR-24), Preferred Vendors surface (FR-25), and the FR-32 blocking consequence-acceptance modal appears. Nowhere does the PRD say what act constitutes engagement. Candidates present in the document: adding to a Shortlist, obtaining a Contact Reveal, sending an Enquiry, a Vendor sending a quote, confirming an Agreement.

**What an agent must invent:** the trigger point for the entire Rules enforcement system. Each choice produces a different product. If engagement = Shortlist, a family exploring three venues has three mutually-exclusive Rule sets fighting each other and FR-32 fires constantly. If engagement = Agreement confirmation, FR-32's "before they commit" is too late by definition, since the Agreement is the commitment.

**Suggested resolution:** Add **Engagement** to the Glossary. Proposed: *"Engagement — the point at which a confirmed Agreement exists between a family and a Vendor for a Space or Listing. Rules bind from Engagement forward; Preferred Vendors surface from Engagement forward."* Then FR-32 must fire on the **family's confirmation step within FR-39**, not after — i.e. the consequence modal is part of the confirm action, shown before the family's confirmation is recorded. State this explicitly in FR-32 and FR-39, because the ordering is otherwise unresolvable.

---

### C-02 — The running budget is arithmetically undefined

**Location:** FR-8 ("Shortlisting a Listing contributes its all-in price to the running estimate automatically"), FR-22 (same), FR-26 (price expressed per span / per Function / per head / per unit / per rental period), UJ-1 ("watches the running total move against ₹8L on its own").

**Three independent undefined problems:**

1. **Multiple shortlisted Listings in one Service.** A Shortlist is explicitly a *working set* — Rutuja shortlists five caterers to compare them. FR-8 read literally adds all five all-in prices to the running total, which blows ₹8L on the second caterer and makes the headline feature of the Workspace produce nonsense. The PRD never says whether the contribution is the sum, the minimum, the maximum, the mean, or one representative per Service.
2. **Non-currency price models.** A caterer priced "per head" contributes what rupee figure? Multiplied by which number — the Wedding's guest count, the *Function's* guest count (FR-9 says they differ), the invited count or the RSVP-confirmed count (FR-11 says these differ and move)? A photographer priced "per Function" engaged for three Functions contributes 3×? The PRD gives five pricing models and no arithmetic for any of them.
3. **Which Functions.** A per-Function Service shortlisted but not yet assigned to Functions has no basis for a total at all.

**What an agent must invent:** the entire budget engine — the product's stated retention mechanism.

**Suggested resolution:** Author decision required on all three. Proposed defaults for approval: (a) contribution per Service = the **lowest** all-in price among shortlisted Listings in that Service, labelled "estimated from your shortlist", with the family able to pin a specific Listing as the one to count (this preserves FR-8's "she can adjust any figure the platform derived"); (b) per-head prices multiply by the **Function's own current headcount** as defined in FR-11's precedence (see H-26), and the multiplier is shown next to the figure so the derivation is legible; (c) a per-Function Service not yet assigned to Functions contributes nothing and is shown as "not yet estimated", never as ₹0.

---

### C-03 — The review window has no length

**Location:** FR-45, FR-48 ("Both publish when both have submitted, **or when the window closes**"), UJ-3, Glossary "Review".

**The problem:** The double-blind mechanism — described in §4.9 as the thing the entire trust spine rests on, since reviews are the only consequence a Vendor faces — is defined entirely in terms of a window whose duration is never stated. The memlog confirms it was never decided.

**What an agent must invent:** the number. It will pick 14 days (Airbnb's, which the memlog cites as the model). That number determines how long a Vendor can stall, how long a family's review sits invisible, and the entire retaliation-protection property.

**Suggested resolution:** Author sets it. Note the constraint the PRD itself creates: FR-45 lets a photographer's window open by committed-date timeout up to 90 days after the wedding, so the window length interacts with how stale a review may be. Proposed: 14 days from window open, stated in FR-45 and the Glossary. Also specify: does the window *close* for submission at the same moment it publishes (i.e. can you still write on day 15)? Proposed: no — window close is simultaneously the submission deadline and the publication event.

---

### C-04 — A Vendor can hold the review window shut forever, defeating FR-45's stated purpose

**Location:** FR-45 ("the window opens when the Vendor marks the work delivered, **or** when the Vendor's own committed delivery date passes"), FR-59 (Conditions of listing), Glossary "Commitment", Glossary "Delivery".

**The problem:** FR-45's entire anti-stalling property depends on every Vendor having a **committed delivery date**. FR-59 enumerates the conditions of listing exhaustively — "completed Verification, an all-in price, published Rules, and the no-hidden-charges declaration" — and a delivery commitment is **not among them**. The Glossary defines **Commitment** as "a Vendor-declared, publicly published promise: delivery timeline, inclusions, no hidden charges" but **no FR anywhere requires a Vendor to declare one, and the term "Commitment" appears in no FR in the document.**

Therefore: a photographer who never states a delivery timeline and never marks Delivery has a review window that never opens. He is permanently unreviewable. This is precisely the failure FR-45 was written to prevent, and it is reachable by omission rather than by malice.

**What an agent must invent:** either a default delivery timeline per Service (inventing a business rule the author explicitly reserved to Vendors), or a fallback trigger (e.g. "window opens 90 days after the last Function regardless"), or it will implement FR-45 literally and ship the hole.

**Suggested resolution:** Add the delivery Commitment to FR-59's conditions of listing for any Service whose Delivery is not intrinsically dated. Precisely: *a Service configured with a post-event deliverable must carry a Vendor-declared maximum delivery timeline, and a Listing in such a Service cannot be published without one.* Add a hard backstop regardless: the window opens no later than N days after the last Function of the Chosen Block, whatever the Service. Author sets N. Also add an FR that realizes the Glossary's **Commitment** term, which currently has no FR at all.

---

### C-05 — Concurrent Agreement confirmation on the same Slot is undefined

**Location:** FR-39 (family confirms, then Vendor confirms), FR-28 ("A confirmed Agreement blocks the relevant Slots or span automatically"), FR-40, FR-13.

**The problem:** Nothing in the platform holds a Slot before an Agreement exists. FR-38 is explicit that a site visit "reserves nothing and blocks no Slot." So between a family confirming terms and the Vendor confirming, and equally between two different families working with the same Vendor, two Agreements can be driven toward the same Slot. The PRD never says:

- Whether the family's confirmation places any provisional hold (FR-39's ordering — family first, then Vendor — makes the family wait in the exposed position).
- What happens when a Vendor confirms an Agreement for a Slot that is already blocked. Does confirmation fail? Is it permitted (a Vendor may legitimately double-use a space)? Is the Vendor warned?
- What the losing family sees, and when. She may have locked a Chosen Block around a venue she has now lost.
- Whether the platform even prevents it, given §5.6's insistence that the platform never asserts availability as fact.

**What an agent must invent:** the concurrency model of the most consequential write in the system, plus the entire losing-party notification path.

**Suggested resolution:** Author decision. Proposed, and consistent with the PRD's non-party posture: (a) no provisional hold exists — say so explicitly, because the absence is currently only inferable; (b) confirmation is **first-writer-wins** on the Slot: the Vendor's confirm action fails atomically if the Slot is blocked, with a message naming the conflict, and the Vendor may release the other Agreement first if they choose (which cancels it under FR-42 with all its consequences); (c) the family whose Agreement fails to complete is notified in-app and the proposed terms return to the thread as declined-by-conflict, which is a state FR-39 does not currently have. Note this means a Vendor can never accidentally double-commit through the platform, while remaining free to double-commit off it — which is exactly the line the PRD draws elsewhere.

---

### C-06 — The Enquiry thread is specified twice, incompatibly: WhatsApp transport vs in-app immutable thread

**Location:** UJ-2 steps 5–6 ("An **enquiry arrives on WhatsApp**, already carrying the whole wedding… **Replies in the thread** with a quote"), FR-35 ("Both parties see the same messages in the same order… Neither party can alter or delete what was said. The Vendor is notified on **WhatsApp**; the family in the app"), FR-29, FR-53, §4.7.

**The problem:** UJ-2 reads as though WhatsApp *is* the thread — the enquiry arrives there and he replies there. FR-35 reads as though the thread lives in the platform and WhatsApp is merely the notification channel. These produce completely different systems:

- If WhatsApp is the transport, FR-35's "neither party can alter or delete what was said" is unimplementable (WhatsApp permits deletion), FR-39's structured "propose terms" flow has no surface, and the platform is subject to WhatsApp's 24-hour customer-service window and template-message rules for every outbound message.
- If WhatsApp is only notification, then UJ-2's entire vendor experience — the thing sold to the paying customer as phone-first and low-friction — requires Dattatray to leave WhatsApp and open the portal for every reply, which is the friction the journey was written to avoid.

**What an agent must invent:** the messaging architecture. This is the single most architecture-determining ambiguity in the document, and it also determines whether FR-55's "the Vendor's own response times" is even measurable.

**Suggested resolution:** Author decision, and it should be stated in an FR rather than left to a journey. Proposed: WhatsApp carries **notification and deep-link only**; the thread of record is in the portal, which is what makes FR-35's immutability and FR-39's structured proposals possible. Then rewrite UJ-2 steps 5–6 so the journey stops implying otherwise, and add a consequence to FR-35 stating the WhatsApp message is a notification containing the Enquiry summary and a link, never a conversation surface.

---

### C-07 — "Admin can do anything" directly contradicts every immutability requirement

**Location:** FR-4 ("**No action in the platform is unavailable to Admin**"), FR-61 ("**No capability in the platform is unavailable to an Admin user**") versus FR-43 ("Neither party, **nor Admin**, can alter an Agreement after the fact"), FR-46 ("Reviews are never edited"), FR-49, §5.7 ("not silently alterable"), §7.2 (no adjudication).

**The problem:** FR-4 and FR-61 are stated as absolutes and are contradicted by name in FR-43. An agent implementing FR-61 literally builds an admin console that can edit Agreements and reviews — destroying the evidentiary property the whole §4.8 rationale rests on. An agent implementing FR-43 literally must carve exceptions into FR-4/FR-61, and must invent where the carve-outs stop: can Admin edit a Verification record? A Vendor's tier? A cancellation count? A published review's text (FR-49 lets them *remove* one; may they redact one)?

**What an agent must invent:** the actual admin authority boundary, in a system where attribution is stated to be the only control.

**Suggested resolution:** Rewrite FR-4/FR-61 from "Admin can do anything" to the narrower true statement: *"There are no Admin tiers — every Admin user holds the same authority. That authority is bounded by the immutability requirements in FR-43, FR-46 and §5.7: append-only records cannot be altered by anyone, including Admin. Admin may add, annotate, remove-with-record and change standing; Admin may never rewrite history."* Then enumerate the actions Admin holds that no one else does (Verification, removal under FR-60, review removal under FR-49, Service and place configuration under FR-62, grievance disposal under FR-63), because that enumeration is currently absent and an agent has no list to build a console from.

---

### C-08 — The organic ranking algorithm is undefined, and the PRD requires it to be published

**Location:** FR-20 ("**Organic results are ordered on their own merits, and position within them cannot be purchased**… The parameters that determine organic ordering are disclosed to families in plain language"), FR-64 ("The main parameters determining organic ordering are published in plain language"), §4.4.

**The problem:** "Merit" is never defined. Not one signal is named anywhere in the PRD. Yet FR-64 makes publishing those parameters a compliance obligation, so the agent cannot leave it unimplemented — it must invent an algorithm *and then write the public disclosure describing its own invention*.

**What an agent must invent:** the marketplace's ranking function. Every plausible choice has a policy consequence the author has views about: rating-weighted ordering punishes new Vendors and interacts with C-03/H-08; recency-weighted ordering rewards calendar-tending (which FR-29 explicitly refuses to enforce); response-time weighting creates a penalty that §7.2 says must not exist ("no standing score"); proximity weighting interacts with FR-33's hierarchy. Ordering by "merit" without saying what merit is means the agent silently authors the platform's incentive structure.

**Suggested resolution:** Author must name the signals and their rough priority. Proposed starting set for approval, chosen to avoid the §7.2 collision: place-match specificity (FR-33), availability against the family's Blocks, rating and review count with an explicit new-Vendor handling rule, Service-attribute match to the family's filters, and Listing completeness. Explicitly exclude: response time, calendar freshness, enquiry volume, tier — the first three because §7.2 forbids standing scores, the fourth because FR-20 forbids it. Add a consequence to FR-20 stating that ordering is deterministic and reproducible, so the FR-64 disclosure can be truthful.

---

### C-09 — The identity model is undefined: one phone number, three roles, no recovery

**Location:** FR-1 ("The same mechanism serves couples, Vendors and Admin — there is not a separate sign-in system per surface"), FR-2, FR-3 ("A Vendor business has exactly one account"), FR-5 (access granted to a mobile number), §5.2 (three separate surfaces).

**Four undefined things, all schema-determining:**

1. **Can one phone number be both a family account and a Vendor account?** Dattatray plans his own daughter's wedding on the platform he sells on. The PRD never says. If yes, the account/role model is many-to-many and FR-3's "one login per Vendor account" needs restating as "one login per Vendor *business*". If no, real users are locked out of half the product.
2. **How does a person become a Vendor?** No FR creates a Vendor account. UJ-2's entry state is "Identity and business verified" — already done, by an unspecified act. Self-signup, or Admin-created after the in-person visit? The launch story (staff drive out and photograph the property) implies the latter, but nothing says so. See also C-15.
3. **How does a person become Admin?** No FR anywhere creates an Admin account. Bootstrap is entirely undefined.
4. **Account recovery and number change.** The phone number is the sole identity and the sole access-granting key (FR-5: "There is no other route in"). A lost or changed number orphans the Wedding, its Agreements, its Reviews, and — for a Vendor — the Subscription, Listings and eight-year Agreement record. No recovery, transfer, or successor path exists anywhere in the document. In India, number churn and shared handsets are routine.

**What an agent must invent:** the entire identity schema, plus a recovery flow, plus admin bootstrap.

**Suggested resolution:** Author decisions on all four. Proposed: (a) one account per phone number, holding zero-or-more *roles*; a Vendor business is a separate object the account is attached to — this satisfies FR-3's intent without conflating identity with business; (b) Vendor accounts are self-registered but cannot publish until FR-58 Verification, with Admin able to complete a Listing on a Vendor's behalf (see C-15); (c) Admin accounts are created only by an existing Admin, with the first seeded at deployment; (d) a number-change flow gated on Admin verification, recorded as an attributable Admin action under FR-61 — deliberately manual, because it is the account-takeover vector for a system with no passwords.

---

### C-10 — "Slot" is used as both a fixed two-value enum and an open concept

**Location:** §3 Glossary ("**Slot** — a bookable division of a day… **Morning and evening are separately bookable**; a day is not an atomic unit"), FR-28 ("Availability is expressed in **Slots**, not whole days"), FR-9, FR-13, FR-14, UJ-2 ("splits days into morning and evening slots").

**The problem:** The Glossary's phrasing reads as a definition of a two-value enum {morning, evening}. FR-28's phrasing reads as an open division scheme. FR-62 says Services are configured, not built — is the Slot scheme part of that configuration? Can a Vendor define three Slots (morning/afternoon/evening)? Can a Space define its own? Does a Service?

**Why it is critical:** Slot is the atomic unit of the availability engine, of Block matching (FR-13), of Function assignment (FR-9), and of span computation (FR-14, including "the overnight between them"). If it is an enum, the whole matching engine is simple set arithmetic. If it is configurable, every Block match becomes an interval-overlap computation against per-Space schemes, and Functions cannot be assigned to a Slot until a Space is chosen — which breaks FR-9's "the family states the shape once, before browsing."

**What an agent must invent:** the fundamental unit of the product's hardest feature.

**Suggested resolution:** Author decision. Proposed, and strongly: a **platform-wide fixed enum**, {Morning, Evening}, exactly as the Glossary reads, with explicit clock boundaries stated (needed for FR-14's overnight span arithmetic). Configurable Slots would make FR-9's stated-once shape impossible. State the enum and the boundaries in the Glossary, and add a consequence to FR-28 that the scheme is not Vendor-configurable.

---

### C-11 — No cascade is defined when a Listing leaves discovery

**Location:** FR-53 (after grace, "withdrawn from discovery"), FR-59 ("A Listing that stops satisfying them stops being discoverable until it does again"), FR-60 (Admin removal), against FR-22 (Shortlists), FR-8 (running budget), FR-13 (Block matching), FR-34/FR-35 (open Enquiries), FR-40 (live Agreements), FR-44/FR-45 (pending reviews), FR-32 ("**Nothing is ever removed silently**").

**The problem:** Three separate FRs remove a Listing from discovery and **none of them says what happens to the families already holding it.** For each of the three exits, the PRD is silent on:

- Does it disappear from Shortlists? If yes, that is a silent removal, which FR-32 forbids in the strongest terms in the document. If no, the family holds a shortlisted Listing that no longer exists in search, with an availability signal that may or may not still evaluate.
- Does its budget contribution withdraw? FR-8 only withdraws on family action or cancellation.
- What happens to live Agreements against a removed or lapsed Vendor? Are Slots released? Is the family told? Do review rights survive? FR-60 says published reviews remain — it says nothing about Agreements.
- Can a lapsed Vendor still reply in an open thread, propose terms, or mark Delivery? (See also M-25.)
- Does an unreviewed Agreement with a removed Vendor still open its review window?

**What an agent must invent:** the entire de-listing cascade, across three trigger paths, touching six object types.

**Suggested resolution:** Author must specify per exit type. Proposed and derivable from the PRD's own principles: (a) **Nothing is removed from a family's Shortlist or Workspace by any of these events** — FR-32's rule is absolute; instead the entry is marked *unavailable* with the reason class shown (lapsed / withdrawn / removed), and its budget contribution is retained but flagged; (b) **live Agreements survive all three exits unchanged** — the Agreement is a record between two parties and the platform is not one of them (§5.6), so the platform has no standing to cancel it; Slots stay blocked; (c) **review rights survive**, since the Agreement survives — this is also what stops "stop paying to escape your reviews," which FR-53 already commits to; (d) a lapsed Vendor retains full read/write on existing Enquiries and Agreements and loses only discovery, which is what FR-53's "nothing belonging to the Vendor is destroyed" implies; (e) removal under FR-60 is the one case where the family should be actively notified, because fraud is the ground.

---

### C-12 — Service configuration can be changed against live data, with no stated effect

**Location:** FR-62 ("Admin can define a new Service — its taxonomy, fields, filters, comparison attributes, sizing attribute, **engagement model** and **pricing model** — without a code release"), FR-14, FR-23, FR-26, FR-43 (Agreements frozen).

**The problem:** FR-62 grants Admin the power to *define* Services. It never says whether Admin can **edit** an existing Service, and it says nothing about what happens to live data if they do. Consider: changing Catering's engagement model from per-Function to continuous span retroactively changes what every existing Catering Agreement means and how every Catering calendar block is computed — against records FR-43 declares frozen. Removing a field orphans data on every Listing. Changing the sizing attribute breaks every comparison (FR-21) and every filter (FR-18). Changing "has Spaces" (FR-23) on a Service with Spaces in use is unmodellable.

**What an agent must invent:** whether Service configuration is versioned, whether edits are permitted at all, whether live Listings migrate, and whether frozen Agreements are re-interpreted or pinned to the configuration in force at confirmation.

**Suggested resolution:** Author decision. Proposed: Service configuration is **versioned and additive**. New fields and filters may be added at any time. The engagement model, pricing model, sizing attribute and has-Spaces flag are **immutable once any Listing exists in the Service** — changing them requires defining a new Service. Every Agreement pins the Service configuration version in force at confirmation, which is what FR-43's "retrievable in the form they were confirmed in" actually requires. State this in FR-62 and FR-43.

---

### C-13 — Browsing before any Anchor Date exists is contradicted between FRs

**Location:** FR-7 ("A Wedding is usable before it is complete — **she can browse and Shortlist before every detail is filled in**") versus FR-13 ("**Every** Listing the family sees already reflects whether that Vendor can serve their Candidate Blocks… The Block is applied wherever they browse") and FR-19 ("**Every** Listing shows… the availability signal against her Blocks").

**The problem:** These cannot both hold. The first-run state of the entire family app — a Wedding created, no Anchor Dates yet, no Functions yet — is a state FR-13 and FR-19 have no defined behaviour for. What does the availability signal say when there are no Blocks? What does the collision view (FR-15) show? What does the "Availability against her Candidate Blocks is pre-applied" filter (FR-18) filter on?

Related and equally undefined: what happens with **one** Anchor Date and it fails; what happens when an Anchor Date is in the **past**, or passes during planning; whether zero Anchor Dates is even a permitted persisted state.

**What an agent must invent:** the first-run experience of the product, and the empty-Block semantics of the availability engine.

**Suggested resolution:** Author decision. Proposed: browsing with no Candidate Blocks is permitted (FR-7 wins), and every Listing shows availability as **"add your possible dates to see availability"** — never as available, never as unavailable, consistent with FR-13's own treatment of calendar-less Services ("presented without an availability claim, not as unavailable"). Add this as an explicit consequence of FR-13 and FR-19 so it is not left as an inference. Separately state whether past Anchor Dates are rejected at entry (proposed: yes) and what happens to a Candidate Block whose dates pass (proposed: it is marked expired, retained, and no longer applied to browsing — never silently deleted).

---

### C-14 — The RSVP page has no guest authentication, and its output drives caterer quotes

**Location:** FR-12 ("A guest opens the link and records an RSVP **without an account, an install or a sign-in**"), FR-11 ("**Confirmed RSVP counts update the Function's headcount automatically**, and that headcount is what travels with an Enquiry to a caterer or a venue").

**The problem:** The PRD specifies one shared link per invitation, opened without identification, whose output flows automatically into the Function headcount, which flows automatically into Enquiries and therefore into vendor quotes and, via C-02, into the budget. The document never says:

- Whether the link is **per-guest** or **per-Wedding**. FR-12 reads per-message, so per-guest is implied but never stated.
- How a guest is matched to their row in the family's guest list.
- Whether an RSVP can be edited or revoked after submission.
- What stops a forwarded link (FR-12 explicitly celebrates forwarding: "opened and forwarded") from producing unlimited unattributed RSVPs.
- Whether a "+N guests" input exists, and whether an unrecognised responder creates a new guest row.

**Why critical:** it is simultaneously a data-integrity hole (a poisoned headcount produces wrong quotes and a wrong budget with no human in the loop) and a personal-data exposure (an unauthenticated page revealing a named guest list, against §5.5's guest-data commitments).

**Suggested resolution:** Author decision. Proposed: **per-guest opaque tokenised links**, one per guest row, so the RSVP is attributable without a sign-in; the page reveals only the wedding's public details and that guest's own row, never the guest list; forwarded links resolve to the original guest and an RSVP can be updated by re-opening the same link; a "+N" field is permitted and counted separately; an unrecognised token shows a generic page and creates nothing. Then add the FR-11 consequence the document is missing: RSVP-derived headcount is a **suggestion the family accepts**, not a silent overwrite — because a silently-changing headcount that has already travelled to a Vendor is exactly the kind of platform decision §7.6 forbids.

---

### C-15 — Vendor onboarding and Verification have no lifecycle at all

**Location:** FR-58 ("Identity, business registration and portfolio authenticity are verified **before a Listing can be published**"), FR-3, FR-59, UJ-2 entry state ("Identity and business verified; portfolio checked in person"), §4.12, SM-1 ("median time from a Vendor starting sign-up to their Listing being published").

**The problem:** §4.12 describes Verification as a fact, never as a process. Entirely absent:

- Who creates the Vendor account (see C-09), and whether **Admin can build a Listing on a Vendor's behalf** — which is what the actual launch story requires, since staff visit the property and photograph it.
- What a Vendor sees and can do **while awaiting** Verification. Can they build a draft Listing? Upload a portfolio? Pay (see H-27)?
- Whether Verification has a **queue**, an assignee, a scheduled visit.
- What happens on **failure**. Is a failed Verification recorded? Can they reapply? Is there a cooling-off?
- Whether Verification **expires** or must be renewed.
- Critically: **whether editing a verified Listing invalidates Verification.** FR-58 verifies "portfolio authenticity" at a point in time. Nothing stops a Vendor adding stolen photographs the day after Verification. This is the fraud hole at the centre of the trust spine, and FR-60 lists "stolen or misrepresented portfolio" as a removal ground — implying it happens — with no detection mechanism specified anywhere.

**What an agent must invent:** the entire operational workflow of the team the §2.1 persona section calls "the people the entire trust spine actually rests on", plus the re-verification policy.

**Suggested resolution:** Author must specify the Verification state machine (Appendix A has the skeleton). At minimum, decide: (a) Admin may create and edit a Vendor's Listing, attributed under FR-61; (b) draft Listings exist pre-Verification and are invisible to families; (c) failed Verification is recorded with reason and permits reapplication; (d) **material edits to a verified Listing — new portfolio media, changed identity or registration details — return the Listing to a pending-review state and remove it from discovery until cleared**, which is the only mechanism in the document that would make FR-60's stolen-portfolio ground detectable. Define "material" explicitly, or an agent will.

---

### C-16 — Wedding-level Service selection is a required object that no FR creates

**Location:** UJ-1 step 3 and its confirmed constraint ("**Services are selected at the Wedding level before browsing**, rather than discovered category by category"), §4.4 description ("**she picked her Services at the Wedding level**"), SM-5 ("Services per Wedding fulfilled"; "proportion of Weddings where **every Service the family selected** reached an Agreement"), FR-9 (states Functions, not Services).

**The problem:** Three parts of the document depend on a set of Services selected at the Wedding level. No FR in §4.2 or §4.3 creates it, defines who may edit it, or says what it does. FR-9 covers Functions only. This is a straightforward missing requirement in the group whose FRs are otherwise complete.

**What an agent must invent:** whether Service selection exists at all; whether it is a filter or a commitment; whether Shortlists can exist for unselected Services; whether it gates the Workspace view (FR-10 never mentions it); whether adding a Service later disturbs anything; whether an invited member may change it (FR-6's prohibition list does not include it).

**Suggested resolution:** Add an FR to §4.2 — proposed: *"The Wedding holds the set of Services the family intends to engage. Selected at Wedding creation and editable at any time by the creator alone. The selection determines which Shortlists exist, what the Workspace view in FR-10 carries, what the collision view in FR-15 evaluates across, and what SM-5 measures. Selecting a Service creates its empty Shortlist; deselecting one requires the FR-32 consequence treatment if it holds Agreements."* Then add the selection to FR-6's prohibition list and to FR-10's enumerated view contents.

---

### C-17 — There is no way to amend an Agreement, so benign changes are recorded as cancellations

**Location:** FR-43 ("The confirmed terms are **frozen** at confirmation. Neither party, nor Admin, can alter an Agreement after the fact"), FR-42 (cancellation "recorded on both profiles as a countable fact"), FR-11 (headcount moves automatically as RSVPs arrive), FR-17.

**The problem:** Guest counts move. 600 becomes 720. The venue agrees. The only path the PRD provides is: cancel the Agreement — which stamps a countable cancellation on **both** profiles, in a system where the cancellation count is part of the only reputation mechanism that exists (§4.9) — and confirm a new one. A cooperative amendment is punished identically to a walk-out. The memlog records the author's care over exactly this asymmetry in the FR-17 case ("recording one against a Vendor who did nothing wrong would be unfair"), and the same problem recurs here unaddressed.

Compounding it: FR-11 moves the headcount automatically, so the Agreement's frozen guest count and the Workspace's live headcount silently diverge with nobody told.

**What an agent must invent:** either an amendment mechanism (violating FR-43 as written), or the cancel-and-recreate flow with its unfair reputational consequence, or a silent divergence.

**Suggested resolution:** Author decision. Proposed, and consistent with FR-43's append-only principle: an **Amendment** is a new confirmed-by-both-sides record that supersedes the prior terms, appended to the same Agreement's history — the original is never altered, satisfying FR-43 literally, and no cancellation is recorded because none occurred. Both parties must confirm, exactly as FR-39. Add it as an FR in §4.8 and add **Amendment** to the Glossary. Separately, add to FR-11 that a headcount change diverging from a confirmed Agreement is surfaced to the family as a prompt to amend, never applied to the Agreement.

---

### C-18 — The erasure right and the immutable record contradict each other, unresolved

**Location:** §5.5 ("Every person whose data is held **can see it, correct it, and have it erased**, including people who never held an account") versus FR-43 (eight-year retention, append-only, "Neither party, nor Admin, can alter"), FR-46 ("**Reviews are never edited**… A Vendor cannot remove or suppress a review of themselves"), FR-53 ("Reviews already published about a lapsed Vendor remain published"), §5.7.

**The problem:** A family exercises erasure. Their reviews are on Vendors' Listings, their name is on eight-year Agreement records, their cancellation counts are on Vendor profiles, their structured vendor-reviews are visible to other Vendors. §5.5 says erase; FR-43/FR-46/FR-53 say never. The document takes both positions with no precedence rule. The same conflict arises for a Vendor exercising erasure, where FR-53's "a Vendor cannot erase their record by ceasing to pay" is an explicit anti-erasure commitment.

**What an agent must invent:** which requirement wins, and the anonymisation strategy — an unavoidably legal decision.

**Suggested resolution:** Author decision, with counsel. Proposed: state the precedence explicitly in §5.5. *Erasure applies fully to data held on the basis of consent — guest contacts, inspiration boards, published Real Weddings, profile details. Records retained under a legal obligation or as the record of a transaction between two other parties — Agreements, invoices, Verification records, Admin action logs — are retained for their stated period and instead **pseudonymised**: the reviewing party's identity is replaced with a stable non-identifying token, the review text stands, the Agreement stands.* Say this in §5.5 and cross-reference it from FR-43, FR-46 and FR-53, because an agent will otherwise implement whichever it read last.

---

# B. HIGH

*An invented answer here ships a decision the author did not make, and is expensive but not impossible to reverse.*

---

### H-01 — The grace period has no length
**FR-53.** "After expiry a **grace period** runs, during which the Listing remains live." No duration. An agent will pick 7 or 30 days. Interacts with the renewal reminder schedule (H-05) and with C-11's cascade. **Resolution:** author sets it; state it in FR-53 and in the Vendor terms, since FR-53 promises the Vendor that what happens next is "knowable in advance" — which is unsatisfiable without a number.

### H-02 — The nudge has no threshold, cadence or cooldown
**FR-29**, UJ-2 edge case ("you have **N** enquiries for the 27th"). Undefined: the value of N; whether it counts Enquiries or Shortlist adds or views; how often a Vendor may be nudged for the same date; the cooldown after a Vendor responds; whether a nudge fires at all for a date with one Enquiry. An agent will invent all five. Given FR-29 is described as "the sole safeguard" for calendar freshness (UJ-2 cross-journey dependency), these numbers are the entire mechanism. **Resolution:** author sets N, cadence and cooldown. Proposed: nudge on the first Enquiry for a date, then no more than once per 7 days per date, suppressed for 30 days after any Vendor calendar action touching that date.

### H-03 — Sign-in has no parameters
**FR-1.** Undefined: OTP length, validity period, resend cooldown, maximum attempts before lockout, lockout duration, and — from "A person returning on the same device is not challenged again on every launch" — the session lifetime, whether it differs between family/Vendor/Admin surfaces, and what invalidates it. In a passwordless system these parameters *are* the security model. **Resolution:** author or delegated with a stated default. Proposed for approval: 6 digits, 10-minute validity, 60-second resend cooldown, 5 attempts then 15-minute lockout, 90-day family session, 30-day Vendor session, 12-hour Admin session with no long-lived token.

### H-04 — Tier allowances are unquantified
**FR-50.** "What differs between tiers is: placement in the marked Featured band, **portfolio allowance**, and **how many Services the Vendor may list in**." No numbers for either, at any of the three tiers. FR-50 says "Tier *prices* are a business input, set outside this document" — it makes no such statement about allowances, so an agent will read them as in-scope and invent six numbers. **Resolution:** author sets the allowance matrix, or explicitly extends the "business input" carve-out to allowances and specifies that they are configurable data rather than code (which FR-51's "change of data, not of code" principle already implies).

### H-05 — The Founding Vendor tier's expiry is undefined
**FR-51.** "a real tier with a **real expiry date**." Undefined: who sets it, whether it is per-Vendor (from their join date) or cohort-wide (a fixed calendar date), its duration, whether it can be extended, and what tier a Founding Vendor lands on at expiry. Also undefined: whether the cohort is capped. **Resolution:** author decides. Proposed: per-Vendor duration from Verification date, set as configuration, with no automatic transition — expiry moves the Vendor to an unsubscribed state under FR-53's grace-then-withdraw path, since FR-54 forbids anything that renews or charges by itself.

### H-06 — Subscription payment edge cases are absent, and one NFR is unimplementable
**FR-52, FR-54, §5.5.** Undefined: payment failure, duplicate payment, partial payment, mid-term tier upgrade or downgrade (and whether proration exists at all given "a prepaid term is an advance"), and refunds of a Subscription — §7.1 excludes refunds only *between a family and a Vendor*, leaving Subscription refunds unaddressed in either direction. Separately, §5.5's "**Cancelling is as easy as starting**" has no referent: FR-54 establishes there is nothing to cancel (no auto-renewal, no mandate), and no FR defines a cancel-subscription action or its effect. An agent will build a cancellation flow that refunds nothing and does nothing, or will build a pro-rata refund the author never approved. **Resolution:** author decides refunds and mid-term changes. Restate §5.5's clause to what it can actually mean here — proposed: *"Cancelling is as easy as starting: a Vendor may stop at any time by not renewing, and nothing in the product obstructs, delays or penalises that."*

### H-07 — Verification has no lifecycle
See **C-15**, of which this is the operational half. Even setting aside the account-creation question, the Verification object itself has no states, no assignee, no evidence attachment model, no failure record, no expiry, and no re-verification trigger. **Resolution:** specify the state machine in Appendix A's skeleton.

### H-08 — The rating model is undefined
**FR-19** ("rating and review count"), **FR-18** (filter on rating), **FR-21**, **FR-46**. Undefined: the scale (1–5? half-stars? a different scale for the structured vendor→family form?); whether free text is mandatory or optional; the aggregation function; and critically the **aggregation scope** — reviews attach to Agreements, which attach to a Space or Listing, but FR-19 shows a rating on the Listing and FR-60 speaks of a Vendor's record. Does a Vendor with a lawn and a hall have one rating or two? Does a Vendor with Listings in three Services have one rating or three? **Also undefined: what a Listing with zero reviews shows**, and what the rating filter does to it — an agent will either show "0 stars" (which defames every new Vendor and destroys SM-1) or exclude it from rating-filtered results (which makes every new Vendor invisible). **Resolution:** author sets the scale and aggregation scope. Proposed: 1–5 integer stars, free text optional; ratings aggregate **per Listing** (a Space inherits its Listing's rating, since the family engaged the business); a zero-review Listing displays "No reviews yet" with no numeric value and is **included** in rating-filtered results with an explicit "new" marker, never silently dropped.

### H-09 — Preferred Vendor associations have no lifecycle, and the restricted set can become empty
**FR-25, FR-24.** "A named Vendor must accept the association before it is published" — so there is a pending state, with no notification path, no expiry, no decline record, and no revocation by either party specified. Worse: FR-24 says where a restricting Rule is in force, "their choices in that Service are limited to the permitted set." Nothing prevents that set from becoming empty — every preferred caterer lapses (FR-53), is removed (FR-60), or revokes the association. The family then holds a venue Agreement and **cannot engage catering at all**, with no escape hatch defined. Also undefined: whether non-permitted Listings are hidden or shown-and-disabled (FR-32's transparency principle argues for the latter, but FR-24 says "limited"). **Resolution:** author specifies the association state machine and, critically, the empty-set behaviour. Proposed: when a restricting Rule's permitted set is empty or unavailable for the family's Block, the restriction is shown as unsatisfiable and the family is told to resolve it with the Vendor directly — the platform states the fact and takes no action, consistent with §7.6.

### H-10 — Availability is binary per Slot; crew-shaped Services cannot be expressed
**FR-28, FR-13, FR-14**, against `service-shapes-analysis.md` Shape B ("Booked Crew — bandwidth not capacity"). A photographer with three teams can serve three weddings on the same day. A caterer can serve two. FR-28 models availability as blocked/not-blocked per Slot, which forces such a Vendor to either appear unavailable when they are not, or to leave everything open and rely on FR-29 nudges. The four-axis parameterisation the analysis called for ("**what availability means**, what drives price, what sizes the order, when the engagement completes") reached the PRD on three axes — engagement model (FR-14), pricing model (FR-26), sizing attribute (FR-18/FR-62) — and **the availability axis was dropped.** **Resolution:** author decides whether capacity-per-Slot is in scope. If yes, add it to FR-28 and to FR-62's Service configuration list. If deliberately out, say so in §7 so an agent does not helpfully add it.

### H-11 — The engagement and pricing models of the five frozen Services are never stated
**FR-14** ("Admin sets this when configuring the Service. It is not hard-coded per Service anywhere"), **FR-26**, **FR-62**. Correct as architecture — but the *seed configuration* is a product decision, and the PRD never makes it. Is Catering per-Function or a span? Is Photography a span across all Functions, or per Function, and what is its post-event delivery Commitment default? Is Décor & Mandap a span (the FR-14 rationale strongly implies yes, via the overnight strike-and-build argument)? Is Band Baaja Baraat per Function? Does Venue have Spaces (yes, by FR-23's example) and do the others? An agent must invent five engagement models, five pricing models, five sizing attributes, five filter sets and five comparison attribute sets. **Resolution:** the author should supply the seed configuration for the five frozen Services as a table in the PRD or an annex. This is perhaps 40 cells and it removes the largest single block of invention in the document.

### H-12 — The Enquiry lifecycle is incomplete
**FR-34, FR-37, FR-35, FR-55.** FR-37 gives four Vendor-recorded outcomes (contacted, site visit arranged, won, lost). Missing entirely: can the family **withdraw** an Enquiry? Can a Vendor **decline** one (they are booked, or the Rules make it pointless)? Does an Enquiry **expire**? Is there a state for "never answered", and what does the family see meanwhile? Can a family send a **second** Enquiry to the same Listing? FR-55 measures "the Vendor's own response times" — response time is undefined (first message? quote? any action?) and has no defined value when no response ever arrives, which is the case the metric most needs to capture. **Resolution:** author enumerates the Enquiry states and the response-time definition. Proposed: states are Sent → Viewed → Responded → {Won, Lost, Withdrawn, Expired}; the family may withdraw; a Vendor may decline with a reason class; response time is measured to the Vendor's first message in the thread, and non-response is reported separately rather than as an infinite time.

### H-13 — Whether an Enquiry's wedding context is a snapshot or a live reference is undefined
**FR-34** ("An Enquiry **carries** the Chosen or Candidate Block… the guest count… the budget context") against **FR-17** (the family may change the Chosen Block at any time) and **FR-11** (headcount moves automatically). If it is a snapshot, the Vendor quotes against stale facts and the PRD's central promise — "A Vendor never has to ask a family for information the platform already holds" — degrades to "information the platform held last week." If it is live, the Vendor's quote silently becomes a quote for a different wedding. FR-17 addresses Agreements on a Block change and says **nothing about open Enquiries**. **Resolution:** author decides. Proposed: live reference with an explicit change event posted into the thread ("the family moved this wedding to 4 December; guest count now 720"), so both parties see the change in the immutable record FR-35 already requires. Add the Enquiry to FR-17's consequence list.

### H-14 — The family is never told when a shortlisted Listing becomes unavailable
**FR-13, FR-22, FR-15.** Availability is pre-applied and evaluated continuously, but no FR says the family is *notified* when a Listing they shortlisted — possibly the one their Chosen Block was built around — is taken by someone else. The collision view (FR-15) is a screen she must visit. In a product whose premise is that "every vendor who turns out to be booked sends the family back to the start," silently letting that happen is a product failure. **Resolution:** add a consequence to FR-13 or FR-22: a change in availability affecting a shortlisted Listing against a Candidate Block is surfaced to the family (in-app notification and on the Workspace view under FR-10). Author decides whether it is push or passive.

### H-15 — Empty and zero states are undefined across the product
**FR-15, FR-18, FR-19, FR-46, FR-55, FR-57, SM-7.** No behaviour is specified for: zero search results in a Service; **zero Vendors in a Service in the family's place** (which SM-7 concedes is the launch condition); a Service selected with an empty Shortlist and how FR-15 treats it (cleared, or blocking?); **no Candidate Block clearing anything** — the brief's explicit question, addressed in UJ-1 only for the two-Block swap case, never for the total-failure case; a Listing with zero reviews (H-08); a Lead Dashboard with zero Enquiries in the first weeks, which is FR-55's most likely real state and FR-56's cost-per-Enquiry divide-by-zero; FR-57's comparison when the Vendor is the only one in their Service and place. **Resolution:** the author should walk one pass through every screen at zero. At minimum, decide the two that carry policy: what the family sees when **no** Block clears (proposed: the full collision matrix by Service and Block, with no ranking, plus an explicit statement that no arrangement currently works and the family must swap or add a date — never a recommendation, per §7.6), and what a Vendor sees on an empty dashboard (proposed: the honest zero, per FR-55's "a poor period is shown as a poor period", with no encouragement copy).

### H-16 — Whether a Block that clears nothing can be locked is unstated
**FR-16** against **§7.6** ("Excluded: … recommending one Block over another"). FR-16 does not say locking requires the Block to clear the Shortlist. An agent will very plausibly gate locking on clearance — which is the platform making the family's decision for it, precisely what §7.6 forbids. **Resolution:** state it explicitly in FR-16. Proposed: any Candidate Block may be locked at any time, whether or not it clears; the platform shows the consequences and does not obstruct. Also state what happens to the *other* Candidate Blocks on lock (FR-16 says "discarded Blocks are no longer applied to browsing" — but "discarded" is undefined: deleted, or retained and inactive?). Proposed: retained and inactive, so FR-17's change-the-Block path has something to return to.

### H-17 — Where price lives when a Listing has Spaces
**FR-19** ("Every Listing shows… the all-in price") against **FR-23** ("A Space holds its own capacity, its **own all-in price** and its own calendar") and **FR-59** ("A Listing cannot be published without… an all-in price"). If Spaces hold prices, what price does the Listing show — the minimum, a range, the price of the Space matching her guest count? What does the comparison view (FR-21) compare? What does the budget take (C-02)? What does the FR-18 budget filter filter on? What does FR-59 validate? Same ambiguity applies to capacity, calendar and Rules. **Resolution:** author decides. Proposed: where a Service has Spaces, the Space is the priced, sized and scheduled unit; the Listing displays a range and the family's view resolves to the Space(s) matching their Functions' guest counts; FR-59's condition is satisfied when every Space has a price. State this in FR-19 and FR-23 rather than leaving it to inference.

### H-18 — An invited member has no way to learn they were invited
**FR-5** ("Access is granted by the creator to a mobile number. **There is no other route in**") against **FR-12**'s own rationale (the platform must not message people who have not opted in). The invited person may have no account. Nothing states how they find out — the platform arguably must not message them, and the PRD provides no share-a-link mechanism. There is also no pending-invitation state, no expiry, and no behaviour for revoking an invitation that was never accepted. **Resolution:** author decides. Proposed and consistent with FR-12: the creator is given an invitation **link to send themselves**, exactly as with invitations; the platform sends nothing. Add a pending state to FR-5 and say the link resolves on first sign-in with the matching number.

### H-19 — WhatsApp is a single point of failure with no fallback, and the family channel is unspecified
**FR-29, FR-35, FR-53, FR-52.** Every Vendor-facing notification — new Enquiry, calendar nudge, renewal reminder — is specified as WhatsApp. Undefined: what happens when the Vendor has no WhatsApp, blocks the business account, opts out, or the send fails; whether an in-portal fallback exists (FR-53 says "on WhatsApp **and** in the portal" for renewal only); whether SMS or email exists anywhere. Also, FR-35's "the family in the app" is the only statement of the family's channel — push notification? Undefined, as is the behaviour when push permission is denied, which on iOS is the default state. **Resolution:** author specifies the channel matrix per notification type with a stated fallback order, and whether email/SMS exist at all. This is also a hard external constraint worth pinning: WhatsApp Business messaging outside a 24-hour window requires approved templates, which shapes every message in FR-29, FR-35 and FR-53.

### H-20 — Statutory periods are left as "the required period" despite the research being on file
**FR-63** ("Complaints are acknowledged and disposed of **within the periods required**… removed **within the required period**… within the **shorter period** that applies to such orders"), **§5.5** ("breaches are reported **within the period required**"). `research-india-regulatory.md` (844 lines) exists alongside this PRD and presumably contains these numbers. Leaving them as prose means an agent looks them up, gets them from training data of uncertain vintage, or invents them — for obligations with legal consequence. **Resolution:** pin the actual periods in FR-63 and §5.5, with the instrument cited. An agent must never be the one deciding what a takedown deadline is.

### H-21 — Contact Reveal is ungated and unbounded
**FR-36.** No limit, no gate, no rate limit, no de-duplication rule. Undefined: whether a family must have an Enquiry open first; whether repeat reveals by the same family count once or many times on the dashboard (FR-55/FR-56 compute cost-per-lead from these numbers, so the counting rule is a business figure); whether the Vendor is notified; whether a daily cap exists. Since Contact Reveal exposes a Vendor's phone number to any signed-in account, it is also the scraping vector for the entire supply side — the platform's only real asset. **Resolution:** author decides. Proposed: reveal requires an Enquiry to that Listing; counted once per family per Listing on the dashboard; the Vendor is notified; a per-account daily cap exists as an anti-scraping measure and is not disclosed in the UI.

### H-22 — Peer comparison has no k-anonymity floor
**FR-57.** "Comparisons are **aggregate only**. No other Vendor is ever identified, **and no figure is shown that could identify one**." No minimum cohort size is stated. In a launch town with three caterers, every aggregate identifies the other two. An agent will pick 5, or will not implement a floor at all and ship the disclosure failure the FR explicitly forbids. **Resolution:** author sets the minimum cohort size and the behaviour below it (proposed: minimum 5 Vendors in the Service-and-place cohort; below that, widen the place level up the FR-33 hierarchy; if still below, show nothing and say why).

### H-23 — The vendor→family structured review asks about payment on a platform that never sees money
**FR-47** ("whether **payment terms were met**") against **FR-41** ("No money passes through the platform at any point in the life of an Agreement"), **§7.1**, and FR-47's own rationale (the structured form exists to remove the defamation and data-protection exposure of a business writing about a named private individual). A vendor-asserted, unverifiable, unadjudicated "did not pay" record about a named private individual, visible to every other Vendor they approach, is functionally a private credit blacklist — and §7.2 excludes standing scores and any complaint pipeline with a consequence. **Resolution:** author decides whether this question stays. If it stays, the answer format and the dispute outcome (H-24) become critical rather than high. Recommendation: remove it, or reframe to something the platform's own posture supports.

### H-24 — The dispute path in FR-47 has no permitted outcome
**FR-47** ("The family can see everything recorded about them and **can dispute an entry with Admin**") against **§7.2** (no adjudication of fault, no complaint pipeline leading to a consequence) and **§5.7** (records not silently alterable). Admin receives a dispute and the PRD gives them nothing they are permitted to do with it. An agent must invent the outcome — and any outcome it invents is either adjudication (forbidden) or nothing (which makes the dispute channel a lie). **Resolution:** author decides. Proposed: the family may attach an unedited response to the disputed entry, visible wherever the entry is visible; Admin's only power is removal under the FR-49 moderation grounds (unlawful, personal data, abuse) — never a finding on the merits. State it in FR-47.

### H-25 — Guest data erasure has a purpose test but no trigger
**§5.5 / FR-12** ("Guest contact details… are **erased once the purpose is exhausted**"). No definition of exhaustion, no retention period, no deletion job. An agent will either never delete (the failure mode) or invent a period. Note it interacts with FR-65: a published Real Wedding may reference the event long after. **Resolution:** author sets the trigger and period. Proposed: guest contact details are erased N days after the last Function of the Chosen Block; the Function's aggregate headcount survives, the contact details do not.

### H-26 — RSVP-confirmed headcount cannot precede Enquiries in the real timeline
**FR-11** ("Confirmed RSVP counts update the Function's headcount automatically, and **that headcount is what travels with an Enquiry** to a caterer or a venue"). Invitations go out after the date is fixed — i.e. after the Chosen Block is locked and after the venue Agreement exists. At the time Enquiries are sent, the RSVP-confirmed count is zero or near-zero. Taken literally, FR-11 sends caterers a headcount of 0. The PRD never states the precedence between the family's stated Function guest count and the RSVP-derived count. **Resolution:** state the precedence explicitly in FR-11. Proposed: the Function carries a family-stated **expected** headcount, which is what travels with an Enquiry; the RSVP-confirmed count is shown alongside it as it accumulates and never replaces it without the family accepting the change (see also C-14).

### H-27 — Whether a Vendor pays before or after Verification is unspecified, and failure has no path
**FR-52, FR-58, FR-51, SM-1.** If payment precedes Verification, a Vendor who fails Verification has paid for a Listing that can never publish, and refunds are unaddressed (H-06). If Verification precedes payment, the operational cost of an in-person visit is incurred before any revenue — a real business decision. SM-1 measures "median time from a Vendor **starting sign-up** to their Listing being **published**", which spans both. **Resolution:** author decides the order and the failure path. Proposed: Verification precedes payment; a Vendor builds a draft Listing, is verified, then chooses a tier and pays to publish — which also means no refund case ever arises, closing part of H-06.

### H-28 — The place hierarchy has no seed, no matching rule, and no ambiguity handling
**FR-33.** "Places are held as a **hierarchy** — village and town, tehsil, district, state, country." Undefined: where the initial hierarchy comes from (India has ~650k villages; someone must load it), whether it is the official administrative taxonomy or a curated subset, how "covers that place" is computed when a Vendor declares overlapping areas at different levels, how duplicate and variant place names are resolved (a real problem in Marathi transliteration), and what "detecting where she is" (FR-18) resolves to when GPS lands between towns. **Resolution:** author decides the source of truth and the initial coverage. Proposed: seed from the official Census/LGD administrative hierarchy for Maharashtra at launch, Admin-extensible per FR-33; coverage is ancestor-descendant containment; geolocation resolves to the nearest seeded town with the family able to override.

### H-29 — Multiple Agreements with one Vendor produce multiple reviews on one Listing
**FR-44** ("**One Agreement earns one Review from each side**") with **FR-23/FR-14**: a family may hold the lawn for the Wedding and the hall for the Reception — two Agreements, one Vendor, one Listing — or engage a per-Function Service across three Functions, which FR-14 explicitly calls "several engagements priced separately." FR-44 then yields two or three published reviews from the same family on the same Listing, each with its own rating, all feeding the aggregate (H-08). **Resolution:** author decides. Proposed: one review per family per Listing per Wedding, covering all Agreements with that Listing for that Wedding, with the window opening at the last Delivery among them.

### H-30 — The Wedding has no terminal state
**FR-7, FR-10, FR-65, FR-2, §3 Glossary.** A Wedding is created and then, per the document, exists forever in the same state. Undefined: what "after the wedding" means for FR-65's publishing right (the last Function of the Chosen Block passing? a family action? what if no Block was ever locked?); whether a Wedding can be deleted, archived, or abandoned; whether budget tracking, nudges and availability evaluation continue against a wedding that happened eight months ago; whether the creator can transfer ownership (C-09); whether one account may create several Weddings (FR-5 says a person may *hold access to* several — it does not say create); what SM-4's "abandonment" measure operates on. **Resolution:** author specifies the Wedding states. Proposed: Planning → Completed (automatic when the last Function of the Chosen Block passes, which is what unlocks FR-65) → Archived (family action). Deletion permitted, subject to the C-18 retention rule for any Agreements it holds.

### H-31 — The Admin persona has no journey, and the trust spine rests on them
**§2.1** names Admin and operations as one of three personas, with four jobs-to-be-done. **§2.2** provides UJ-1 (family) and UJ-2/UJ-3 (Vendor and family) and **no Admin journey at all**. Every FR in §4.12 and §4.13 says what Admin *can* do; nothing describes what they actually do in a day, in sequence. Consequently the workflows that matter most operationally — the verification visit, the fraud removal, opening a new town, disposing of a grievance within a statutory clock — have no narrative and no confirmed constraints, which is where every other part of this PRD gets its precision. **Resolution:** add UJ-4 (verify a Vendor in person, end to end, from the Vendor's first contact to a published Listing) and UJ-5 (a fraud report arrives; removal and record). The FR gaps in C-15, H-07 and C-07 would largely close themselves as a by-product.

---

# C. MEDIUM

### M-01 — FR-32 cites the wrong FR
"any impermissible **Agreement is cancelled under FR-17**" — FR-17 governs changing the Chosen Block. The cancellation mechanics live in **FR-42**. An agent following the reference lands in the wrong requirement. **Resolution:** change to FR-42.

### M-02 — Two actor gaps in FR-6's prohibition list
FR-6 enumerates what an invited member cannot do. The list omits **publishing a Real Wedding** (FR-65 says "the Wedding's creator can publish" — so it is creator-only by implication, not by statement) and **saving to Inspiration boards** (FR-67 says "Boards are private to the Wedding **and its invited members**", implying members can at least read, and probably write — which FR-6's "They can do nothing else" forbids). Also omitted: changing the Wedding's Service selection (C-16). **Resolution:** make FR-6's list exhaustive and reconcile with FR-65 and FR-67.

### M-03 — The grievance officer is a role in a system with no roles
**FR-63** requires "a named grievance officer" with published contact details; **§7.8** and **FR-61** state that every Admin user has every capability and no role tiers exist. Undefined: whether the grievance officer is a distinguished Admin, a person outside the system, or just a name on a page. **Resolution:** state it — proposed: a published name and contact, not a system role; grievance handling is an ordinary attributable Admin action.

### M-04 — Whether a family may originate Agreement terms is contradicted
**FR-39** says "A Vendor proposes terms" and then "**Either party** may decline or propose different terms." **FR-41** says "The platform authors no default terms. **Every term in an Agreement comes from the Vendor's own proposal.**" These disagree about whether a family counter-proposal is possible. **Resolution:** author decides. Proposed: the family may counter-propose; FR-41's clause should read "no term originates with Vivah Spot," which is what the liability argument actually requires.

### M-05 — Delivery can be marked before the service occurs
**FR-45** permits a Vendor to "open the window early by delivering early" with no constraint. Nothing stops a Vendor marking Delivery the week before the wedding — plausibly while the family is still happy — and starting the review clock early. **Resolution:** constrain Delivery to be markable no earlier than the start of the relevant Function or span.

### M-06 — Delivery cannot be corrected
**FR-45, FR-43.** A Vendor marks Delivery by mistake, opening a review window that cannot be closed. No un-mark, no correction, no Admin path (or an Admin path that collides with C-07). **Resolution:** decide. Proposed: markable-once, with an Admin correction recorded as an appended attributable action.

### M-07 — Whether a submitted review can be edited or withdrawn before publication is undefined
**FR-46, FR-48.** During the blind period the review exists but is unpublished. Can the author change it? Withdraw it? After publication, FR-46 says reviews are never edited — but that is stated as a platform obligation, not an author permission. **Resolution:** proposed: editable until the window closes, immutable after.

### M-08 — The review sort order is undefined but must be disclosed
**FR-46** ("The basis on which reviews are sorted **is disclosed to readers**"). Same shape as C-08: the agent invents the ordering and then writes the disclosure of its own invention. Lower severity because the blast radius is one screen. **Resolution:** author names the order (proposed: most recent first, with no sentiment weighting, which is also the easiest to disclose truthfully).

### M-09 — The right of reply has no rules
**FR-46.** Undefined: whether the reply is editable, whether it is moderated under FR-49, whether the family may respond to it, whether there is a length limit, whether a reply exists for the structured vendor→family form. **Resolution:** specify — proposed: one reply per review, moderated identically, no further response, no threading.

### M-10 — A removed review's side effects are undefined
**FR-49.** When a review is removed: does the aggregate rating recompute (yes, presumably)? Does the review count drop? If removed during the blind window, does the counterpart still publish on schedule? Is the removal visible on the Listing ("a review was removed") or invisible? **Resolution:** specify all four.

### M-11 — The suggestion object has no lifecycle
**FR-6.** A suggestion is sent, and the creator "accepts or dismisses it." Undefined: whether the suggester is told the outcome, whether other members see it, whether it expires, whether duplicates are permitted, whether there is a limit, and what "accepts" does mechanically (adds to Shortlist? just marks it read?). **Resolution:** specify; proposed: accept = add to the relevant Shortlist, which is the only reading consistent with FR-22.

### M-12 — Candidate Block limits and reversibility
**FR-9, FR-16, FR-17.** Undefined: maximum number of Anchor Dates; whether an Anchor Date can be removed; whether "discarded" Blocks (FR-16) are deleted or retained (see H-16); whether a Chosen Block can be **un**locked back to candidate state without choosing another; the maximum number of Functions per Wedding. **Resolution:** set the limits; state that unlocking is the same act as changing the Chosen Block and carries FR-17's consequences.

### M-13 — Time passing is not modelled
**FR-9, FR-13, FR-16.** No behaviour for: an Anchor Date entered in the past; a Candidate Block whose dates pass during planning; a Chosen Block whose wedding date passes (which is also H-30's trigger); an Agreement whose dates have passed but Delivery has not been marked. **Resolution:** specify each, and reject past-dated Anchor Dates at entry.

### M-14 — The budget ceiling's own semantics
**FR-8.** Undefined: whether a ceiling is mandatory at Wedding creation; whether it can be changed later and what that does to the display; what happens when the running total exceeds it (§7.6 argues display-only, never a block, but it is not stated); the currency (INR assumed everywhere, never stated); rounding and display convention (lakh/crore formatting is a real UI decision here). **Resolution:** state all five; proposed: optional, editable, display-only at any overage, INR only.

### M-15 — Real Wedding publication details
**FR-65, FR-66.** Undefined: the width of the cost "band"; whether a Vendor with a **cancelled** Agreement, or one that never reached Delivery, may be credited (FR-65 says only Vendors "with an Agreement" — which as written includes cancelled ones); whether the family may edit or unpublish (FR-66 covers consent withdrawal, which may or may not be the same act); whether photographs are moderated before publication. **Resolution:** specify; proposed: bands of ₹1L; only Agreements that reached Delivery may be credited; publication is moderated under FR-49's grounds.

### M-16 — Site visits have no lifecycle
**FR-38.** Offered and accepted — then nothing. No reschedule, no cancellation by either side, no no-show, no completion, no reminder. FR-37 lets a Vendor mark "site visit arranged" as an Enquiry outcome, and UJ-2's dashboard reports "6 site visits", so the count is a business figure with no defined source of truth. **Resolution:** specify the states and which of them the dashboard counts.

### M-17 — The trusted time source is a hard dependency with no failure behaviour
**FR-43** ("Confirmation times are recorded from a trusted time source, not from a device clock"). If it is unreachable at the moment of confirmation, does the Agreement fail to confirm? Confirm with a provisional time? Queue? **Resolution:** specify; proposed: confirmation blocks and retries, since FR-43's evidentiary purpose does not survive a fallback to an untrusted clock.

### M-18 — Third-party portfolio evidence has no consent or contest path
**FR-27** ("Where another Vendor's engagement took place at this Vendor's premises, that engagement can be reflected on this Listing as third-party evidence"). Undefined: whether the other Vendor consents, whether the family consents (their wedding is the evidence — cf. FR-66), whether either can contest it, and what happens when the source Agreement is cancelled or the Real Wedding's consent is withdrawn (FR-66 says withdrawal removes "any Vendor evidence derived from it" — which implies a derivation graph nothing else in the document describes). **Resolution:** specify the consent chain and the withdrawal cascade.

### M-19 — Space and Listing mutation with live commitments
**FR-23, FR-28, FR-43.** Can a Vendor delete a Space that has a confirmed Agreement or a blocked Slot? Change its capacity below an agreed guest count? Change its price after an Agreement (FR-43 freezes the Agreement, but the Listing display and every shortlisting family's budget move)? Delete a Listing with live Agreements? **Resolution:** specify; proposed: a Space with any live Agreement may not be deleted and its capacity may not be reduced below the largest agreed headcount; price changes are permitted and never retroact.

### M-20 — Time zone and Slot boundaries are never stated
**FR-14** ("a span Service is held continuously from the start of the first Function it serves to the end of the last — **the overnight between them included**"), **FR-28, FR-13.** Computing that span requires clock boundaries for Morning and Evening and a time zone. Neither appears anywhere in the PRD. Every date comparison in the availability engine depends on them. **Resolution:** state IST throughout, and give Morning/Evening explicit boundaries.

### M-21 — Media constraints are absent
**FR-27, FR-65, §5.3** ("Imagery is the bulk of this product's weight"). No photo count limits (beyond the unquantified per-tier "portfolio allowance", H-04), no file size, no accepted formats, no aspect-ratio or minimum-resolution rules, no statement of whether video is supported anywhere. §5.3's performance commitment cannot be met without these. **Resolution:** specify limits and formats; state explicitly whether video exists.

### M-22 — No length or content limits on any free-text field
**FR-46** (review text), **FR-24** (Rules), **FR-26** (inclusions), **FR-19**, **FR-65**. Every free-text field in the product is unbounded. Rules in particular are both free text and *semantically load-bearing* — FR-24 says a Rule "may restrict a Service to the Vendor's Preferred Vendors", which the platform must act on, meaning Rules cannot be pure prose. The PRD never says Rules have structure. **Resolution:** set length limits; and critically, specify that Rules comprise a **structured, machine-actionable part** (the Service restrictions the platform enforces) plus free text, or FR-24's enforcement is unimplementable.

### M-23 — The structured review's answer format is unspecified
**FR-47.** Four question topics are named; the answer type is not. Yes/no? Scale? Multiple choice? Whether all are mandatory? Whether the set is Service-dependent or configurable under FR-62? **Resolution:** specify the exact questions and their answer types — this is a small table and it removes an entire schema invention.

### M-24 — §5 declares itself incomplete
**§5** header: "*Written as they are settled; **the section is incomplete**.*" Absent from the NFRs entirely: security posture beyond sign-in (authorization model, PII handling at rest, media access control on a product whose core asset is photographs), rate limiting and abuse prevention, observability and alerting, backup and restore, disaster recovery, data residency (relevant in India and unmentioned), any quantified SLO for §5.4's "sized for peak muhurat load", and any browser/OS support matrix. An autonomous build will invent every one of these silently. **Resolution:** the author should either complete §5 or state explicitly which NFRs are delegated to architecture, so the gap is a handoff rather than a hole.

### M-25 — A lapsed Vendor's remaining capabilities are undefined
**FR-53** ("Nothing belonging to the Vendor is destroyed… reappear intact on renewal"). Undefined: can they read and reply in existing Enquiry threads; propose or confirm Agreements; mark Delivery (which gates the family's review right — a lapsed Vendor who cannot mark Delivery blocks a family's review); edit their calendar; receive new Enquiries against an old Chosen Block. Overlaps C-11 but is separately worth stating. **Resolution:** proposed: full retention of every existing-relationship capability, loss of discovery only.

---

# D. LOW

### L-01 — FR numbering is out of sequence
FR-32 sits between FR-25 and FR-26, and FR-33 between FR-26 and FR-27. Harmless to correctness — §0's stated rationale for global numbering (stable references) is preserved — but it costs a reader, and an agent generating an ordered epic backlog from document order will produce a confusing sequence. **Resolution:** leave the IDs (they are stable references, correctly), but note the interleave in §0.

### L-02 — The banned vocabulary leaves the central act unnamed
**§7.9** bans *booking* and *booked* absolutely, across UI, schema and downstream documents, and supplies replacements for the noun (Enquiry, Agreement) but not for the **verb** the family performs. The document itself falls back on "engage", which is undefined (C-01). An agent writing UI copy and method names will reach for something. **Resolution:** closing C-01 closes this — supply "engage / Engagement" as the approved verb and add it to §7.9's replacement list.

### L-03 — Glossary terms with no FR
**Commitment** is defined in §3 and appears in no FR (see C-04, where its absence is load-bearing). **Contact Reveal**, **Preferred Vendor**, **Rules**, **Verification** and **Delivery** are all realized by FRs; **Commitment** alone is not. **Resolution:** either add the FR that requires a Commitment (C-04's resolution does this) or remove the term.

### L-04 — Metric definitions carry unquantified thresholds
**SM-2** ("a **meaningful** number of Enquiries within a term"), **SM-7** ("against **the threshold** below which cross-Service Block matching produces no useful answer"). §6 states targets are a business decision, which covers the target values — but these are definitional thresholds an agent must pick to build the metric at all. **Resolution:** either quantify or state that the metric definitions are also deferred, so an agent knows not to build them yet.

### L-05 — UJ coverage of Admin FRs
FR-4 and FR-61 are tagged "Realizes the obligations behind UJ-2 and UJ-3" rather than realizing a journey — accurate, and a symptom of H-31. Included only as a traceability note.

---

# Appendix A — Object lifecycles: what the PRD defines vs what it omits

| Object | States the PRD implies | Transitions the PRD defines | **Missing** |
|---|---|---|---|
| **Wedding** | (one implicit state) | created (FR-2) | Every other state and transition. No completed, archived, abandoned or deleted state; no "after the wedding" trigger (FR-65 depends on one); no ownership transfer; no recovery; unclear whether one account may create several. **H-30, C-09.** |
| **Candidate Block** | candidate, chosen, "discarded" | created from Anchor Date (FR-9), locked (FR-16), changed (FR-17) | Deletion; whether "discarded" means deleted or inactive; unlock-without-relock; expiry when dates pass; maximum count; whether a non-clearing Block may be locked. **H-16, M-12, M-13.** |
| **Shortlist entry** | in / removed | added, removed (FR-22) | Effect of the Listing leaving discovery (**C-11**); notification when it becomes unavailable (**H-14**); removal under FR-32 acceptance is defined, all other removals are not; no limits. |
| **Enquiry** | sent, contacted, site visit, won, lost | sent (FR-34), outcome marked (FR-37) | Viewed; declined by Vendor; withdrawn by family; expired; never-answered; effect of a Block change or headcount change (**H-13**); duplicates; response-time definition. **H-12.** |
| **Agreement** | proposed, confirmed, cancelled | proposed (FR-39), family-confirms, vendor-confirms, cancelled (FR-42) | The pending state between the two confirmations and its timeout; Slot contention (**C-05**); amendment (**C-17**); effect of Vendor removal or lapse (**C-11**); superseded-by-Block-change is defined (FR-17) but only for cancellation, not for the Enquiry it came from. |
| **Delivery** | not reached, reached | marked by Vendor, or committed date passes (FR-45) | Vendors with no committed date (**C-04**); early marking (**M-05**); correction (**M-06**). |
| **Review** | unwritten, submitted-blind, published, removed | window opens (FR-45), submitted, published (FR-48), removed (FR-49) | **Window length (C-03)**; edit/withdraw before publication (**M-07**); removal side effects (**M-10**); aggregation into a rating (**H-08**); one-per-Agreement vs one-per-Listing (**H-29**); the vendor-side form's answer types (**M-23**). |
| **Subscription** | active, expired, in-grace, withdrawn | purchased (FR-52), expires (FR-53), renewed (FR-54) | **Grace length (H-01)**; reminder schedule; mid-term upgrade or downgrade; payment failure, duplicate, refund (**H-06**); Founding Vendor expiry mechanics (**H-05**); what "cancelling" means (**H-06**). |
| **Listing** | draft(?), published, not-discoverable, removed | published after Verification (FR-58/59), withdrawn after grace (FR-53), stops being discoverable (FR-59), removed (FR-60) | The draft state itself; Vendor-initiated unpublish or delete; re-verification on edit (**C-15**); the full downstream cascade of every exit (**C-11**); where price and capacity live when Spaces exist (**H-17**). |
| **Verification** | verified / not | performed by Admin (FR-58) | Requested, queued, scheduled, in-progress, failed, expired, re-verification. Nothing exists. **C-15, H-07.** |
| **Preferred Vendor association** | published / not | named, accepted (FR-25) | Pending; declined; revoked by either side; notification; effect on an in-force restricting Rule; empty permitted set. **H-09.** |
| **Wedding member invitation** | has access / revoked | granted, revoked (FR-5) | Pending-invite state; how the invitee is informed (**H-18**); expiry; revoking an unaccepted invitation; effect on their pending suggestions (**M-11**). |

---

# Appendix B — Every quantity an agent must invent

Ordered by blast radius. Each is a number the PRD does not contain.

| # | Quantity | Location | Severity |
|---|---|---|---|
| 1 | Review window length | FR-45, FR-48 | **C-03** |
| 2 | Grace period after Subscription expiry | FR-53 | H-01 |
| 3 | OTP length, validity, resend cooldown, attempt limit, lockout | FR-1 | H-03 |
| 4 | Session lifetime per surface | FR-1 | H-03 |
| 5 | Nudge threshold N, cadence, cooldown | FR-29, UJ-2 | H-02 |
| 6 | Portfolio allowance per tier (×3) | FR-50 | H-04 |
| 7 | Services-listable per tier (×3) | FR-50 | H-04 |
| 8 | Founding Vendor tier duration | FR-51 | H-05 |
| 9 | Renewal reminder lead time(s) and count | FR-53 | H-01 |
| 10 | Rating scale and precision | FR-19, FR-46 | H-08 |
| 11 | Minimum cohort size for peer comparison | FR-57 | H-22 |
| 12 | Backstop review-window open, days after last Function | FR-45 | **C-04** |
| 13 | Maximum Anchor Dates / Candidate Blocks | FR-9 | M-12 |
| 14 | Maximum Functions per Wedding | FR-9 | M-12 |
| 15 | Maximum invited members per Wedding | FR-5 | M-12 |
| 16 | Guest list size limit; bulk import batch limit | FR-11 | M-21 |
| 17 | Guest data retention trigger and period | §5.5, FR-12 | H-25 |
| 18 | Contact Reveal caps and counting rule | FR-36 | H-21 |
| 19 | Enquiry rate limits / anti-spam thresholds | FR-34 | H-21 |
| 20 | Grievance acknowledgement and disposal periods | FR-63 | H-20 |
| 21 | Unlawful-content takedown period; court-order period | FR-63 | H-20 |
| 22 | Breach notification period | §5.5 | H-20 |
| 23 | Slot clock boundaries; time zone | FR-14, FR-28 | M-20 |
| 24 | Photo count, file size, formats, min resolution | FR-27, §5.3 | M-21 |
| 25 | Free-text length limits (reviews, Rules, inclusions, replies) | FR-46, FR-24 | M-22 |
| 26 | Real Wedding cost band width | FR-65, FR-66 | M-15 |
| 27 | Currency, rounding, lakh/crore display convention | FR-8, FR-26 | M-14 |
| 28 | GST rate, place-of-supply default, invoice numbering series | FR-52 | M-24 |
| 29 | Peak-load SLO figures for §5.4 | §5.4 | M-24 |
| 30 | "Meaningful number of Enquiries" (SM-2); supply threshold (SM-7) | §6 | L-04 |

---

# Appendix C — Contradiction index

Nine places where two requirements cannot both be implemented as written.

| # | Requirement A | Requirement B | Finding |
|---|---|---|---|
| 1 | FR-4 / FR-61 — Admin can do anything | FR-43 / FR-46 / §5.7 — nothing may be altered, "nor Admin" | **C-07** |
| 2 | FR-7 — she can browse before every detail is filled in | FR-13 / FR-19 — *every* Listing shows availability against her Blocks | **C-13** |
| 3 | UJ-2 §5–6 — the enquiry arrives on WhatsApp and he replies in the thread | FR-35 — same thread, same order, nothing can be deleted | **C-06** |
| 4 | FR-45 — a Vendor cannot hold the review window shut | FR-59 — a delivery Commitment is not a condition of listing | **C-04** |
| 5 | §5.5 — every person can have their data erased | FR-43 / FR-46 / FR-53 — 8-year retention, reviews never removed | **C-18** |
| 6 | FR-39 — either party may propose different terms | FR-41 — every term comes from the Vendor's own proposal | M-04 |
| 7 | FR-47 — the family may dispute an entry with Admin | §7.2 — no adjudication, no complaint pipeline with a consequence | H-24 |
| 8 | FR-47 — "were payment terms met" | FR-41 / §7.1 — no money passes through the platform, ever | H-23 |
| 9 | FR-6 — an invited member "can do nothing else" | FR-67 — boards are private to the Wedding "and its invited members" | M-02 |

---

# Appendix D — Suggested order of resolution

The criticals are not equally expensive to close. In rough order of leverage:

1. **C-01 (define "engage")** — one Glossary entry; unblocks FR-24, FR-25, FR-32 and L-02.
2. **C-10 (fix Slot as an enum)** — one sentence; unblocks the whole matching engine's schema.
3. **C-03, C-04, H-01, H-02, H-03, H-05 (the numbers)** — a short table; the largest volume of invention removed for the least author effort.
4. **C-16 (the missing Service-selection FR)** and **C-17 (Amendment)** — two new FRs.
5. **C-07, C-13, C-06, C-18 (the four structural contradictions)** — each is one authorial ruling plus an edit to both sides.
6. **C-11 (de-listing cascade)** and **C-05 (Slot contention)** — each needs a short policy paragraph; both are proposed above in a form derivable from the PRD's own principles.
7. **H-11 (seed configuration for the five frozen Services)** — a ~40-cell table; the second-largest volume of invention removed.
8. **C-09, C-14, C-15, H-31** — these four are really one gap: the product has no specified account model and no Admin journey. Writing UJ-4 would close much of it as a by-product.
9. **C-08, C-12, C-02** — the three that need genuine product thinking rather than a ruling.

---

*Findings: 79 total — 18 critical, 31 high, 25 medium, 5 low.*
