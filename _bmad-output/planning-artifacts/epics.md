---
stepsCompleted: [1, 2]
storiesWrittenFor: [1]
storiesPending: [2, 3, 4, 5, 6, 7, 8, 9, 10]
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/prd.md
  - _bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md
  - _bmad-output/planning-artifacts/ux-designs/ux-vivahspot-2026-09-06/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-vivahspot-2026-09-06/EXPERIENCE.md
  - _bmad-output/planning-artifacts/ux-designs/ux-vivahspot-2026-09-06/RECONCILIATION.md
  - _bmad-output/planning-artifacts/architecture/coding-standards.md
---

# Vivah Spot - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Vivah Spot, decomposing the requirements from the PRD, the UX design contract and the Architecture Spine into implementable stories.

**Identifier policy.** FR, NFR, SM, UJ and AD identifiers are reproduced from their source documents verbatim and are never renumbered. `prd.md` §4 states it directly — *"FR IDs are global and permanently stable... Do not renumber them to restore sequence"* — and `ARCHITECTURE-SPINE.md` binds `FR-1..FR-72` and `NFR 5.1..5.10` by those exact ids. The template's `FR1:` / `NFR1:` sample format is therefore not applied; renumbering would break every downstream reference and the architecture's own `binds:` block.

**Vocabulary.** `prd.md` §3 Glossary is binding on every epic title, story title and acceptance criterion (AD-24). The words banned by PRD §7.9 — *book, booking, booked, cart, checkout, legally binding, guaranteed, enforced by Vivah Spot, v1, MVP, Phase N* — must not appear in any story or criterion.

## Requirements Inventory

### Functional Requirements

Seventy-two, in `prd.md` §4 order. Group headings are the PRD's feature groups.

#### 4.1 Accounts & Access

FR-1: Any person creates an account and signs in with a mobile number and a six-digit one-time code, valid ten minutes, five attempts, three resends per hour. No password is ever set, stored or requested on any surface. Passkey, Google and Apple are additional methods that link to an existing account only on a verified matching mobile number and only after proof of control; Apple is offered wherever Google is on iOS. One person is one account, the mobile number is the identity, a session lasts ninety days of inactivity, a number can be changed with proof of both, and a lost number recovers through Admin.

FR-2: A Wedding belongs to the account that created it, whether or not that person is getting married. Couple names are data on the Wedding, independent of the owning account; the owning account is what confirms an Agreement and what every reply, nudge and reminder reaches.

FR-3: A Vendor business has exactly one account and one set of credentials. No additional users, roles, invitations or permission tiers exist, and a Vendor operating in several Services still holds one account.

FR-4: No capability is withheld from Admin by role; the control is attribution rather than restriction. Admin actions changing a Vendor's standing are attributable to the staff member who took them. *(Consequences stated in full at FR-61, which is authoritative.)*

FR-5: The Creator grants access to a Wedding to a mobile number and can revoke it at any time, with revoked members losing visibility immediately. A Wedding cannot be discovered, searched for or requested by anyone who has not been given access. One person may hold access to several Weddings.

FR-6: An Invited Member can view the Workspace and send a suggestion naming a Listing or a Guest, which has no effect until the Creator accepts it. They cannot edit the Wedding, change Blocks, shortlist, select, enquire, reveal contact, confirm or cancel an Agreement, review, or change the budget or guest list.

#### 4.2 Wedding Workspace

FR-7: Every entry is preserved as it is made and no explicit save action exists anywhere in the Workspace. Closing the app, losing signal or switching devices loses no work in progress, and a Wedding is usable before it is complete.

FR-9: The Family states which Functions the wedding has, in what relative order and in which Slots, one time; the platform derives one Candidate Block per Anchor Date by shifting that shape, up to five Anchor Dates. Each Function holds its own day, Slot and guest count. Nothing about the arrangement is inferred, and the Family can adjust an individual Block without disturbing the others.

FR-68: The Family selects Services onto the Wedding, for the whole Wedding or for particular Functions, and can add or remove one at any time. The selected Services are what exists downstream — Shortlists, Block matching, the running budget and SM-5 all scope to them. Discovery begins on the home screen, which is the catalog and is browsable before a Wedding exists.

FR-10: A single view carries the whole wedding: the Services selected, every Function with its day and Slot, every Shortlist and its Selection, every Enquiry and status, the running total against the ceiling, and the Chosen Block once locked. It is reached in one tap from the invitation card or the Wedding tab and reflects a change the moment it is made.

FR-8: The Workspace maintains the running cost from what it already knows. A Shortlist contributes nothing; a Selection contributes its all-in price once; a Span Selection contributes once for the whole Span; confirming an Agreement replaces the estimate with the agreed figure; changing or cancelling withdraws the contribution. Per-head Services show the multiplication beside the total, an undecided Service reads *not yet estimated* and never ₹0, and the Family can adjust any derived figure or add a cost the platform knows nothing about.

FR-11: Each Function carries a guest count the Family simply states, and that number is what travels with an Enquiry. A guest list is optional and never required for anything; entries are households, not individuals, built by hand, from contacts, or pasted. Invited Members may suggest guests. A short form and an unguessable, noindexed, rate-limited link collect households as suggestions the Creator accepts or dismisses; a submitter never sees the guest list. RSVP counts never overwrite the stated count.

FR-12: The Workspace composes the invitation and the Family sends it from their own WhatsApp — Vivah Spot never sends a message to a Guest. Each Guest's link is individual, unguessable, noindexed, rate-limited, revocable and expiring; its preview is platform-controlled. A Guest records an RSVP with no account, install or sign-in, sees only their own invitation and answer, and is offered one quiet route to start a Wedding of their own. Guest contact details compose that Wedding's invitations and are used for nothing else.

FR-72: A Wedding is *in planning*, *concluded* or *abandoned*. It concludes when the Chosen Block's last Function has passed, or where there is none, the latest day of a confirmed Agreement. An inactive Agreement-less Wedding is asked about after a year and abandoned after a further thirty days, with warning. Abandoning cancels Agreements, releases Slots, erases the guest list and kills every public link the Wedding issued.

#### 4.3 Dates & Availability Matching

FR-13: Every Listing the Family sees already reflects whether that Vendor can serve their Candidate Blocks, evaluated across every day and Slot the Block occupies for that Service. The Family never types a date into a filter. Browsing before any Anchor Date shows no availability signal — not unavailable. No-duration Services are excluded from matching and presented without an availability claim. Availability shows only for a Listing with an active Subscription, and is never presented as fact.

FR-14: Each Service declares one Engagement Model of five — Span, per Function, rental period, lead time, or no duration — which governs how availability is checked and how Vendors price. Engagement model and calendar are separate questions: only a no-duration Service has no calendar. A Span is held continuously from the first served Function's start to the last one's end, the overnight included.

FR-15: Where no Candidate Block can serve the Family's Selections, they are shown which Selection blocks which Block, by name. Blocks are never ranked or scored by partial availability, the platform never recommends one, and the view updates as the Family swaps Listings.

FR-16: The Family locks one Candidate Block and it becomes the Chosen Block, fixing each Function's day and Slot. Every Enquiry sent thereafter carries it, and discarded Candidate Blocks stop applying to browsing.

FR-17: The Family can change the Chosen Block at any time. Every Agreement pointing at the old Block is cancelled — none rewritten, migrated or carried across — each recorded on both profiles as a neutral countable fact with no fault attributed. No Review is unlocked, the Slots release immediately, and every Vendor must confirm afresh against the new Block.

#### 4.4 Discovery & Comparison

FR-18: The Family searches inside a Service by Listing or Vendor name or by location, including detected location, and narrows on that Service's own configured filters — price within the Service, its Sizing Attribute, rating and verified status. A rating filter never silently excludes an unrated Listing. The per-Service price filter is not the portfolio budget. Availability is pre-applied and never a filter she sets.

FR-19: Every Listing shows photos, the all-in price, rating and Review count, verified status, the Service's Sizing Attribute, the availability signal against her Blocks, and the places served. A Listing with no Reviews says *no reviews yet* — never a zero, blank rating or borrowed average. A Listing without an all-in price cannot be published. Rules appear on the Listing itself, not a sub-page.

FR-20: Featured Listings appear in a distinctly marked band identified to the Family as paid placement, and are kept out of the organic ordering. Organic order weights availability, then rating shrunk toward the Service-and-Place average with the pull negligible by about ten Reviews, then median time to first reply, then verification freshness, then rotation among near-equals. Neither what a Vendor pays nor how recently they joined is a signal. The parameters are disclosed in plain language reachable from the results. A Featured Listing satisfies every condition of listing.

FR-21: Listings within one Service compare side by side on that Service's own configured attributes, showing each Listing's availability against each Candidate Block. Comparison never crosses Services.

FR-22: A Shortlist belongs to one Service within one Wedding and holds the candidates being compared. Adding costs nothing, commits to nothing and does not move the running budget. From it the Family picks a Selection — one per Span for a Span Service, one per Function otherwise — which moves the budget but notifies nobody, reserves nothing and engages no one. An account cannot select its own Listing, and an Invited Member cannot change a Shortlist or make a Selection.

#### 4.5 Vendor Listings

FR-23: Where the Service is configured for them, one Listing carries several independently engageable Spaces, each with its own capacity, Stated Size, all-in price and calendar. A Space's Stated Size is visible to Vendors quoting to work in it. The Family engages a Space, not a Listing.

FR-24: Rules are a condition of listing, carry the same force as all-in pricing, and are visible before the Family engages. A Rule may restrict a Service to the Vendor's Preferred Vendors, limiting the Family's later choices in that Service. The Family can see, before engaging a Space, which Services that Space will close off.

FR-25: A Vendor may name Preferred Vendors in relevant Services, and a named Vendor must accept before the association publishes. A Vendor may name their own Listing in another Service, which is shown as the same business and never as an independent recommendation. Preferred surfacing is not paid placement and cannot be purchased.

FR-32: Before the Family engages a Space or Listing they are shown by name every Shortlist entry and every Agreement the Vendor's Rules would make impermissible, and cannot proceed without accepting explicitly. On acceptance impermissible entries are removed, any Selection among them is cleared and withdrawn from the budget, and any impermissible Agreement is cancelled. Nothing is removed until the engagement actually completes, and nothing is ever removed silently.

FR-26: A Listing's all-in price is expressed the way that Service is sold — per Span, per Function, per head, per unit or per rental period. The price is all-in and the no-hidden-charges declaration is published. A Vendor may set off-season and off-muhurat pricing, and the Family always sees the price applicable to their own Block.

FR-33: Places are a hierarchy — village or town, tehsil, district, state, country — not a flat list. A Vendor declares service areas at whatever level fits, possibly several. A Family sees Vendors whose declared area covers her Wedding's Place. A service area says where a Vendor will travel; it is never a paywall and is never sold. Nothing assumes a single city, and Admin opens a Place without a release.

FR-71: Some Services carry an additional condition of listing configured with the Service: Catering a headcount recommendation showing what it was built from; Photography the named person who will shoot, with the Family told before the wedding if it changes; Décor & Mandap sizing against the engaged Space's Stated Size and Rules; Band Baaja Baraat a published declaration that no additional payment will be sought during the event; Venue a site visit or virtual tour requestable from the Listing itself.

FR-27: A Listing carries photographs of events the Vendor actually delivered. How many publish is the Tier's portfolio allowance; a Listing over its allowance keeps every image and publishes up to the allowance. Another Vendor's engagement at this Vendor's premises can be reflected as third-party evidence. Authenticity is established by Verification, not assertion.

#### 4.6 Vendor Calendar

FR-28: Availability is held per Space where the Service has Spaces and per Listing where it does not, expressed in the four Slots — morning, afternoon, evening, night — the same four for every Service. A Vendor can block Slots without stating a reason. A confirmed Agreement blocks the relevant Slots or Span automatically, overnight included, and a cancellation releases them immediately. For a Service with no calendar, availability reduces to whether the Vendor is accepting Enquiries.

FR-29: Where a Vendor shows available on days drawing three or more Enquiries touching the same period, they are prompted on WhatsApp to confirm the availability still holds — at most one nudge per Vendor per seven days. A Vendor who does not respond is not penalised and their availability is not changed; silence is not treated as unavailability.

FR-30: A Vendor can set different pricing for periods they define — off-season, off-muhurat or any period of their choosing. The Family always sees the price applicable to their own Block. The platform neither sets, suggests nor requires seasonal pricing.

FR-31: A Vendor can see which of their Slots are empty and which are drawing no interest, and can price those periods differently. This view is the Vendor's own, never shown to a Family, and empty availability is never marketed as distressed.

#### 4.7 Enquiries

FR-34: An Enquiry carries the Chosen or Candidate Block, the relevant Functions with days and Slots, the guest count applying to them, the budget context, and which Space or offering is being asked about. A Vendor never has to ask for information the platform already holds. Only the Creator sends one; she may send one Enquiry to several Listings in a Service at once; an account cannot enquire with its own Listing; each Vendor receives their own thread and sees no other; and the Lead Dashboard distinguishes a multi-Vendor Enquiry from a single one.

FR-35: Both parties see the same messages in the same order, and neither can alter or delete what was said. The Vendor can send a Quote and propose terms from the thread. The thread of record lives in the platform; WhatsApp carries a notification and a link, with SMS fallback, and is never the conversation surface. An Enquiry with no Vendor reply after thirty days shows to the Family as unanswered, with nothing held against the Vendor.

FR-36: A Family can obtain a Vendor's direct contact details from the Listing or thread. Each Contact Reveal is counted and attributed and appears on the Vendor's Lead Dashboard. The platform records that contact was made, not what followed.

FR-37: An Enquiry is *sent*, then *answered* or — after thirty days with no reply — *unanswered*; a Vendor marks its progress as *contacted*, *site visit arranged*, *won* or *lost*, and one producing a confirmed Agreement is won regardless. Outcomes feed only that Vendor's dashboard, are never shown to the Family and never affect public standing or ranking. Reply speed is a different thing and does affect ranking.

FR-38: A Vendor can offer a Site Visit from within the thread and the Family can accept a time. An arranged visit appears in the Family's Workspace, reserves nothing and blocks no Slot.

#### 4.8 Agreements

FR-39: A Vendor proposes terms from the thread — days and Slots, the Space or offering, guest count, all-in price, what is included, the delivery timeline from their Commitment, and the applicable Rules. The platform supplies the structure and every value is the Vendor's; nothing is pre-filled, suggested or defaulted, and there is no standard form. The Family confirms, then the Vendor; the Agreement does not exist until both have. The two confirming parties must be different accounts. Nothing holds a Slot beforehand. Confirmation is first-writer-wins: a losing confirmation fails, the Vendor is told which engagement conflicts, and the Family's terms return to the thread as declined-by-conflict rather than silently expiring.

FR-40: Confirmation has exactly five consequences and no others: the Agreement is timestamped and recorded against both parties; the relevant Slots or Span block automatically with no Vendor action; the engagement shows as committed in the Workspace with its agreed figure replacing the estimate; it becomes the sole gate for Review rights once Delivery is reached; and both parties can download a copy at any time.

FR-41: No surface, document, notification or item of copy describes the Agreement as legally binding, enforceable, guaranteed or underwritten by Vivah Spot. The platform mediates no disputes, determines no fault, offers no resolution process, passes no money, and authors no default terms.

FR-69: Either party may propose an Amendment from the thread, taking effect only when both confirm. The original is never altered — the Amendment appends to an append-only history, every prior version stays retrievable, and no cancellation is recorded on either profile. A change to days, Slots or Span adjusts the calendar on confirmation. Where the Family revises a Function's stated guest count away from a confirmed figure they are prompted to amend; arriving RSVPs never trigger this, and the Agreement is never updated silently.

FR-42: Either party may cancel at any time. The blocked Slots or Span release immediately, the cancellation records on both profiles as a countable fact with no fault attributed or inferred, displayed as a neutral number over a rolling twenty-four months. No Review is unlocked, and the withdrawn figure leaves the running budget.

FR-43: The confirmed terms freeze at confirmation and neither party nor Admin can alter them. A cryptographic digest of the confirmed document is recorded at confirmation, confirmation times come from a trusted source rather than a device clock, the history is append-only, records are retained eight years beyond the wedding and remain retrievable in the form confirmed, a named individual is accountable for the systems holding them, and the platform can produce a certificate attesting how the record was produced and by which system.

#### 4.9 Reviews

FR-44: A Review can be written only by parties to an Agreement that reached Delivery. Enquiring, revealing contact or shortlisting earns nothing, a cancelled Agreement earns nothing including one cancelled by a Block move, and one Agreement earns one Review from each side.

FR-45: The window opens when the Vendor marks the work delivered, or when the delivery timeline in the Vendor's published Commitment passes — whichever comes first — and in no case later than one year after the Wedding's last day. The timeline is a duration running from the last day the Service was engaged for, and the one that governs is the one captured in the Agreement at confirmation, not the Listing's current value. A Vendor can open the window early by delivering early and cannot hold it shut by delivering late. There is no path to being unreviewable.

FR-46: A Family submits one to five whole stars plus free text, published on the Listing engaged — a Vendor holding Listings in several Services is rated separately in each. The reviewer is shown as a verified party to a real Agreement. Reviews are never edited, reordered by sentiment or selectively published, and a Vendor cannot remove or suppress one. The sort basis is disclosed, and the Vendor has a published right of reply.

FR-47: A Vendor answers three fixed questions about a Family — was she responsive, did the agreed headcount hold, were the premises left as agreed — and no others; no question touches money. There is no free text anywhere. The result is visible to other Vendors receiving an Enquiry from her and to the Family itself, and is never published publicly. The Family can see everything recorded about her, and there is no dispute process.

FR-48: Neither party can see the other's Review before submitting their own. The window is fourteen days from opening; both publish when both have submitted or when the window closes, whichever comes first. Nothing can be written on the fifteenth day, and a Review publishes even if the other side never wrote one.

FR-49: Reviews are moderated only for unlawful content, personal data that should not be public, and abuse. A Review is never removed, delayed or demoted for being negative, and moderation criteria do not vary with rating. A removed Review is recorded as removed with the reason and the author is told.

#### 4.10 Subscription & Billing

FR-50: Tiers are Founding Vendor, Basic and Featured, and what differs between them is placement in the marked Featured band and portfolio allowance — nothing else. The allowance is a number Admin sets per Tier without a release, and a Listing over its allowance keeps its images. A Subscription is held per Service. It buys no territory and limits no reach. No condition of listing differs at any Tier, and no Tier buys organic position. Price is set per Service, per the Vendor's own Place, per Tier by Admin without a release, is never a function of reach, and a change never alters what a Vendor already bought.

FR-51: The Founding Vendor tier is a real tier at ₹0 with a real expiry — a fixed calendar date set per cohort, not a term running from each Vendor's sign-up. No obligation of any kind attaches to it: no testimonial, exclusivity, minimum term, lock-in or commitment to convert. A Founding Vendor sees the same Lead Dashboard as any other.

FR-52: The term is twelve months, paid online in advance. A GST-compliant tax invoice is issued for every payment and is downloadable at any time. Tax is determined by the recipient's State, not the operator's. A prepaid term is an advance whose full liability falls in the period of collection. The platform collects no money other than Subscriptions and never routes money between a Family and a Vendor.

FR-53: A Vendor is reminded thirty, fourteen, seven and one day before the term ends, on WhatsApp and in the portal — with no auto-renewal, the reminder is the renewal mechanism. After expiry a thirty-day Grace Period keeps the Listing live; after it the Listing is withdrawn from discovery and accepts no new Enquiry. Existing engagements are untouched: Agreements stand, Slots stay blocked, threads stay answerable, review windows still open. A Family holding the Listing is told; where it was her Selection it is cleared and withdrawn from the budget. Nothing belonging to the Vendor is destroyed, and published Reviews remain published. All four routes out of discovery behave identically for Families and none removes a Listing from a Family's view without telling them.

FR-54: Nothing renews by itself. There is no auto-renewal, standing mandate or stored instruction to collect; every term is paid by a deliberate act. No arrangement makes a Subscription non-cancellable and no term is presented as irrevocable.

#### 4.11 Lead Dashboard

FR-55: The dashboard shows Listing views, Contact Reveals, Enquiries received, the Vendor's own response times and outcomes as they recorded them. Response time is the median time to first reply, not the mean. Figures are shown over time and are not curated — a poor period is shown as a poor period.

FR-56: The dashboard states what the Vendor paid for the term and what it produced — Enquiries received and the resulting cost per Enquiry — and, where outcomes were recorded, cost per won engagement. For a Founding Vendor the cost is ₹0 and the figures still accumulate.

FR-57: The dashboard compares the Vendor's figures against aggregates for their Service in their Place — response time, conversion, enquiry volume. Comparisons are aggregate only, never identify another Vendor, and are not shown at all unless at least five Vendors are active in that Service and Place. They are framed to be actionable.

#### 4.12 Trust & Verification

FR-58: Identity, business registration and portfolio authenticity are verified before a Listing can be published, recorded against the Admin user who performed it with when and on what basis. Verification covers the images a Listing publishes and is not a self-declaration. Changing what was verified requires verifying it again before the change is publicly visible.

FR-70: A Vendor self-registers, builds their Listing and submits it for Verification with no Admin action needed first. Work in progress saves as it is entered. The Vendor can always see where they stand — what is missing, that Verification is pending, that it succeeded, or that it failed and why — and Verification failure is a state to act on rather than a rejection. A Listing becomes publicly visible only when Verification has completed, every condition of listing is satisfied, and a Subscription is active. A Vendor may withdraw a Listing from discovery without losing it.

FR-59: A Listing cannot be published without completed Verification, an all-in price, published Rules, and a published Commitment — the delivery timeline, what is included, and the no-hidden-charges declaration. The delivery timeline is not optional and is stated as a duration running from the last day the Service was engaged for; zero is valid and common. These apply identically at every Tier including Founding Vendor, and a Listing that stops satisfying them stops being discoverable until it does again.

FR-60: Admin can remove a Vendor for fraud, falsified Verification, stolen or misrepresented portfolio, or impersonation — never for service quality, which Reviews answer alone. A Family holding an Agreement with a removed Vendor is told the Vendor was removed, not merely that a Listing is gone, and asked to find another. The platform does not cancel the Agreement, and a Family who ends it is not counted for it. No complaint pipeline, standing score or automated delisting exists. A removal is attributed with its reason, and published Reviews remain published.

#### 4.13 Admin Console

FR-61: No capability is withheld from an Admin user by role — no scoped roles, permission tiers or approval chains exist — and Admin is still bound by the integrity constraints: Admin cannot alter a confirmed Agreement, edit or suppress a Review, or erase an audit record. Access to Guest contact data is confined to those with an operational need and is logged. Every Admin action that changes a Vendor's standing, a Listing's visibility, published content or a person's access to their own account is attributed to the individual who took it, timestamped, and cannot be erased — account recovery included.

FR-62: Admin can define a new Service's declarations — taxonomy, filters, comparison attributes, Sizing Attribute, Order Basis, Engagement Model and pricing model — without a code release; its field set and behaviour are code, being one detail DocType and one handler module. Admin can open a new Place at any level and set Subscription prices per Service, Place and Tier without a release. A configuration change never rewrites what already happened for presentational declarations; where a change makes a Listing incomplete the Listing keeps its published state and its Vendor is asked to supply what is now needed. This does not hold for behaviour declarations, which are read live and are a data migration.

FR-63: A named grievance officer is published with contact details reachable from every surface. Every complaint is acknowledged on receipt, given a quotable reference, and disposed of within seven days. Unlawful content is removed within thirty-six hours; content under a court order or government direction within three hours; information sought by an authorised agency furnished within seventy-two hours. Removed content and its records are retained one hundred and eighty days. A repeat-infringer register is kept, users are reminded of the terms at least quarterly, and every removal is logged with its ground, its authority and the acting Admin user.

FR-64: The main parameters determining organic ordering are published in plain language reachable by any Family, and any differentiated treatment between Vendors is stated in the Vendor terms. These are two separate disclosures to two separate audiences and both exist.

#### 4.14 Real Weddings & Inspiration

FR-65: A concluded Wedding's Creator can publish photographs, the Vendors engaged, the Functions held and an approximate cost. Only Vendors with an Agreement for that Wedding can be named as having worked on it, and the Agreement record cannot be omitted to credit another. Published weddings are browsable and give a named Vendor verified evidence on their Listing. Publishing is entirely optional and never a condition of anything. The Creator can publish short vertical video of their own concluded Wedding under the same consent, with clips naming the Space and credited Vendors and tappable through to their Listings; any feed's ordering is disclosed in plain language on FR-20's terms and no position can be paid for.

FR-66: The Family gives explicit consent to publish, separately from any other consent, and can withdraw it at any time; withdrawal removes the published wedding from discovery including any Vendor evidence derived from it. A named Vendor can decline to be credited and their name is removed without removing the wedding. Guests are not named, tagged or identified. Approximate cost is published as a band, never as another party's confidential figure.

FR-67: A Family can save images and Listings to Boards within their Workspace, private to the Wedding and its Invited Members. Saving a Listing to a Board does not shortlist it, enquire about it, or affect the budget. There is no following, no public board and no interaction between Families.

### NonFunctional Requirements

Ten, in `prd.md` §5. Ids are the PRD's section numbers and are what `ARCHITECTURE-SPINE.md` binds.

NFR 5.1 — **Language.** The interface ships in English on every surface. Language is deliberately not an app-wide switch and none is offered. User content — a Vendor's Rules, Commitments and Listing descriptions, a Family's review — is stored and shown exactly as written, in whatever language or mixture, never translated, normalised, or required to declare a language. Every user-facing string still routes through i18next from day one while English is the only locale.

NFR 5.2 — **Surfaces.** Families are served by a mobile application on both Android and iOS, with iOS not deferred. Vendors are served by a responsive web portal that is phone-first, meaning designed for the phone at a function rather than tolerating it. Admin is served by a web panel.

NFR 5.3 — **Performance.** Search, comparison and Block matching remain usable on low-bandwidth connections and low-end devices. Imagery is sized for the device, cached, and never blocks the content around it. Work in progress survives a lost connection.

NFR 5.4 — **Availability.** The platform is sized for peak muhurat load, not average load. Vendor-facing surfaces stay available during peak, because that is when a missed Enquiry costs a Vendor a wedding.

NFR 5.5 — **Data protection.** Guest contact details compose that Wedding's invitations and nothing else — never marketing, never messaged by the platform, never an audience — and are erased thirty days after the Wedding concludes, immediately on abandonment, and immediately when a guest-form submission is dismissed. Every person whose data is held, including those who never held an account, can see and correct it. Erasure is available except where a record must be retained, and those exceptions are stated: a confirmed Agreement and its evidence trail, a published Review, an Admin action log. Where a record must be retained the person is pseudonymised within it rather than refused, and told which retention basis applies. The precedence is fixed and must not be re-derived downstream: consent-based data is erased; records of an engagement between two parties and records held under a legal obligation are pseudonymised and retained. Consent is specific, informed, separately given per purpose and withdrawable as easily as given. Breaches are reported to the regulator and to affected people within seventy-two hours. No dark patterns: nothing pre-ticked, paid placement labelled, cancelling as easy as starting.

NFR 5.6 — **Legal posture.** Vivah Spot is not a party to any engagement between a Family and a Vendor: no commission, no money held, no terms authored, no assurance offered, no dispute mediated. No surface anywhere describes an Agreement as legally binding, guaranteed, enforced or underwritten. The platform makes no guarantee about vendor performance, delivery, quality or attendance; it publishes what Vendors declare and says who is speaking. Availability is always attributed to the Vendor. Marketing, app and vendor-facing copy are all bound by this.

NFR 5.7 — **Records.** Agreements, Verifications, Reviews, account recoveries, and Admin actions that change standing or visibility are retained, attributable and not silently alterable. Corrections are appended; nothing is overwritten. The evidential requirements for Agreement records specifically are stated in full at FR-43.

NFR 5.8 — **Accessibility.** Every surface meets WCAG 2.1 AA — the Family application, the Vendor portal, the admin panel, and both public pages, the RSVP page and the guest form. Nothing essential is conveyed by colour alone: verified status, availability and paid placement each carry a non-colour indicator.

NFR 5.9 — **External dependencies.** Each is a hard blocker on a capability and belongs to the business rather than the build: Subscription prices per Service, Place and Tier and the portfolio allowance per Tier (FR-50, FR-27); the Founding Vendor cohort definition and expiry date (FR-51); legal terms and privacy policy including the non-party statement (NFR 5.6, FR-41); business and GST registration (FR-52); a payment gateway merchant account (FR-52); an initial pipeline of Vendors willing to list (SM-7 and the cold start); staff who physically visit and verify Vendors and portfolios (FR-58 and the whole trust spine); a named grievance officer (FR-63); a named individual accountable for evidential records (FR-43).

NFR 5.10 — **Identity and voice.** The product is Vivah Spot; the tagline is *"Big day, sorted."* The palette is festive, not corporate — kumkum vermillion for every action, turmeric for celebration, on a warm cream ground with a warm-tinted shadow. Headings are a display serif, body the system sans stack, Devanagari user content a paired Devanagari serif. Exact values live in `DESIGN.md`, which is the single source of truth for colour and type, with `packages/shared/src/tokens.js` as its projection. The muted text colour is contrast-locked — darkened to meet contrast on white — and must not be lightened. The voice is plain and confident, stating what is true. Cultural specificity is a feature, not a localisation problem.

### Additional Requirements

From `ARCHITECTURE-SPINE.md` (36 ADs, cited by id — never re-derived here) and the repository as it stands.

**Starter template.** The Architecture specifies no starter or greenfield template to adopt, because the monorepo is already scaffolded. Verified on disk 2026-09-07: `apps/mobile` (Expo), `apps/vendor-web` (Next.js) and `packages/shared` exist; the branch is `feat/monorepo-scaffold`. **What does not exist and the Structural Seed requires:** `apps/guest-web` (Next.js, the RSVP page, guest form, see-and-correct and grievance intake), `contract/family.v1.json` (AD-4, `DEFERRED.md` D-12) and `scripts/vocab-gate.sh` (AD-24, D-13). Epic 1 Story 1 is therefore scaffolding `apps/guest-web` and wiring the gates, not choosing a template.

**Layering and API surface**
- AD-1 — Imports flow clients → `api/` → `domain/` → `services/` → DocTypes; the scheduler enters at `domain/`; no module imports a layer above it. Frappe Desk consumes DocTypes directly and is never a client of `api/`.
- AD-2 — No client calls `/api/v2/document/:doctype`. Every client read and write goes through a whitelisted method under `api/`, the vendor portal included.
- AD-3 — `api/family/v1/` is frozen once shipped; a breaking change adds `v2` beside it. `api/vendor/` and `api/guest/` carry no version segment because those clients redeploy with the backend. The absence is meaningful and must not be "corrected".
- AD-4 — The annotated Python signature is the contract. Every whitelisted method carries full type annotations and both halves are checked, with a custom decorator validating the returned value in development and test. A bench script emits `contract/family.v1.json`; zod schemas in `packages/shared` are generated from it, never hand-written.
- AD-18 — Every whitelisted method carries its own gate, before it reads data; `methods=` is always restricted; action rules live in one guard module.

**Service model**
- AD-5 — Each Service's behaviour lives in exactly one `services/<service>/handler.py` reached through a registry implementing one declared interface. No Service-specific branch appears anywhere else. A missing or non-conforming handler fails the deploy, checked in `after_migrate`.
- AD-6 — One `Listing` core DocType plus one detail DocType per Service, 1:1, whose fields are real indexed columns. No key/value child table and no JSON blob. Cross-Service reads touch only the core.
- AD-7 — Shared behaviour is extracted from handlers on the third occurrence (UH-9), never guessed ahead of them, and extraction is its own commit.
- AD-8 — A Service's declarations are Admin-editable data: Engagement Model, Sizing Attribute, Order Basis, pricing model, whether it has Spaces, and which detail columns are filters and comparison attributes. The field set and behaviour are not. Engagement Model and has-Spaces are the behaviour pair and are read live, so changing one on a Service with Listings is a data migration.

**Time, availability and concurrency**
- AD-9 — A Function holds a `DATE` and a Slot enum; Span and per-Function matching read only those two and no datetime appears in them. Rental-period Services carry a `DATE` range, lead-time a required-by `DATE`. A Function's optional display time is for the invitation only and never travels to a Vendor. Timezone is Asia/Kolkata; timestamps are for records only.
- AD-10 — Availability is evaluated by one server-side function dispatching on the declared Engagement Model, evaluating only the Functions that Service serves within the Block. No materialised matrix, no cache. "Free" means no Vendor block **and** seats not exhausted. Per Space where the Service has Spaces. It calls AD-35 for the subscription gate and returns an attributed signal, never a bare boolean.
- AD-11 — Occupancy is one row per `(space, day, slot, seat)` with a UNIQUE index over all four; the database is the enforcement. Every bookable thing is a Space — real, implicit, or an inventory item. Every Space carries an explicit `concurrent_capacity`, Vendor-declared, minimum 1, never defaulted. Every row carries `held_by`, typed Agreement or Vendor Block. A Vendor block fills every seat. A Span expands to one row per `(day, slot)` including overnights, written atomically, each taking the lowest free seat on its own row; a retry re-derives the closure and compares cardinality. A rental period expands per day with the sentinel Slot `all-day` — never NULL. Lead-time and no-duration Services create no occupancy rows.

**Records, money and cascades**
- AD-12 — `Agreement` is submittable; both-party confirmation moves docstatus 0 → 1 and writes an `Agreement Record` row holding the frozen terms, the rendered document as immutable bytes, the SHA-256 of those bytes, the previous row's digest, and a server-side timestamp. The Agreement carries the head digest and record count; `Agreement Record` refuses deletion and is never a child table. An Amendment appends `seq+1` and never touches docstatus; Frappe's cancel-and-amend flow is not used. An Amendment moving days applies a set difference in one transaction. Downloads return the stored bytes, never a re-render.
- AD-13 — The profile-visible cancellation count is derived from `Cancellation` rows and their cause, never stored as a counter. Amendments write nothing to it; FR-17 moves do; an FR-60 removal is not counted against the Family.
- AD-19 — Every money field is Frappe `Currency` in rupees; integer paise exist only at the Razorpay call. Clients never do money arithmetic. The running budget has one writer, `recompute_budget(wedding)`, invoked from Selection, Agreement, Wedding Function and the Family's own rows — never from Listing. The total lives on its own `Wedding Budget` document written as a field update under a row lock held to commit. An adjustment is an override column; an addition appends. The single display formatter lives in `packages/shared`.
- AD-26 — Cross-entity cascades live in `domain/` and there are exactly six: Chosen Block change, a conflicting Rule taking effect, cancelling an Agreement, a Listing entering or leaving discovery, removing a Vendor, and concluding or abandoning a Wedding. Each is invoked by `doc_events` on its own transition row, never by a direct call. Transition rows are unique on `(entity, transition, direction, occurrence)`, are written by the controller under a `has_value_changed` predicate guarded by `not is_new()`, and assert the transition occurred. Composition 1→3, 2→3, 5→4, 6→3 is allowed. Re-entry is guarded on `(cascade_name, affected_entity)` and cleared in a `finally`. Nothing irreversible happens inside the transaction: effects are outbox rows dispatched by a scheduled job.
- AD-27 — Any invariant that must bind Admin lives in the DocType controller, not in `api/` or `domain/`, because Frappe Desk sits directly on the DocTypes. The three-question procedure decides append-only versus derived versus mutable. No child table on `Agreement` or `Agreement Record` carries `allow_on_submit`, asserted in `after_migrate`. No Agreement term field carries a Frappe default.
- AD-31 — Every state-changing operation carries an idempotency key and is safe to apply twice. Payment webhooks are signature-verified and deduplicated on the provider's event id. Scheduled jobs are keyed on the period they cover. `frappe.enqueue` jobs are gated before enqueueing.

**Identity, permissions and privacy**
- AD-14 *(amended 2026-09-12)* — Two identity records and no more: an account holder is a Frappe `User` carrying their number in `mobile_no`, a `Guest` is never a `User` and carries theirs on its own row. Nothing else copies a name or number. Erasure replaces identifying fields with a stable non-identifying token and every referring record shows the token while keeping its content — two erasure paths, one per shape. A `Guest` is scoped to one Wedding, never deduplicated across Weddings and never joined to a `User`. `Consent` and `Breach Incident` reach both shapes and carry a Dynamic Link naming which.
- AD-15 — Runtime access rules ship as a hook pair: `permission_query_conditions` filters lists, `has_permission` gates documents, and any DocType needing a runtime rule registers both applying the same rule. Every hook returns an explicit boolean; query fragments escape and return `"1=0"` rather than `""`.
- AD-16 — `frappe.get_all` is a security boundary. `frappe.get_list` for anything derived from a request; `frappe.get_all` with a comment for system work; and for a cascade, a named context established at the transition row's handler and released in a `finally`.
- AD-17 — Wedding access is a `Wedding Member` child table read by the AD-15 hook pair; `disable_document_sharing` is on site-wide.
- AD-28 — One identity, one session mechanism, issued server-side. The mobile number is the identity but never the `User` record's key: a synthesised email carries an opaque local part. Frappe's magic login link, password reset and username-password login are each disabled explicitly, as is Frappe's own login-by-mobile. OTP issuance and verification happen in `api/` and mint a Frappe session. `session_expiry` is set to `2160:00` — ninety days of inactivity, not an absolute lifetime. One account may hold both Family and Vendor roles and every gate resolves the acting role explicitly.
- AD-30 — Every `allow_guest=True` method restricts `methods`, is rate-limited, takes a fixed DocType never one from input, and returns only fields safe for an unauthenticated caller. A guest token is unguessable, addresses one Guest of one Wedding, cannot be altered to reach another, is revocable and expiring. `noindex` is served as a response header, not a client meta tag. The see-and-correct surface proves identity by one-time code before returning anything.
- AD-32 — Every personal datum records what happens to it on an erasure request — `erase` or `keep, person anonymised` — with the reason: consent, purpose-limited, engagement record, or legal duty. The outcome is stored, never inferred. Frappe logs no reads, so the Guest-contact access log is ours and lives in `api/`, referencing the `User` or the `Guest` row rather than copying the number, and is append-only outliving the data it describes. A `Breach Incident` record carries the discovery date, data classes, enumerated affected people and when the regulator and those people were told.
- AD-33 — Takedown is an axis independent of verification, carrying its ground, authority and acting Admin, never cleared by re-verification. A grievance is a first-class record with a quotable reference, reachable without a login from every surface, carrying its acknowledgement, disposal and SLA clock. Removed content is retained 180 days. Where retention and erasure collide on the same record, retention wins and the person is told which basis applies. A legal hold names a record or a person, places a derived hold on parties and anyone named in frozen terms, and while in force nothing automatic touches what it covers. Hold status is evaluated when the deletion executes, and a refused erasure stands refused.

**Discovery, media and presentation**
- AD-20 — Verification gates each item, not the Listing. Each verifiable item carries its own state and the public read path filters on it; only an identity change takes the whole Listing pending. `is_publicly_visible(image)` is the only statement of image visibility — verified, within the Tier allowance, and neither taken down nor belonging to a removed Vendor. Discoverability is deliberately not a term. The published set is the first N of the Vendor's own ordering over the verified images, and a takedown leaves its gap.
- AD-22 — The result-order seed is fixed once when a Family opens a Service's results, held for that browsing session and re-seeded on a new search. Ordering above the tie-break is fixed, with rating shrunk toward the average at the Listing's own Place level.
- AD-29 — User media lives in object storage with a CDN, never Frappe's file store. An object is served from the public path only while `is_publicly_visible` holds; everything else is private behind a short-lived signed URL issued after a permission check. Promotion and demotion **move** the object with CDN invalidation inside AD-33's SLA. Object keys are opaque and never enumerable.
- AD-35 — `is_discoverable(listing)` is pure and the only statement of the rule, with six terms: verification complete, every condition of listing satisfied, a Subscription active or in Grace, not withdrawn, not removed, and not under takedown. `recompute_discoverable` compares and returns without writing when they agree, and writes through `doc.save()` — never `db_set`. Its inputs live on five documents and each binds it.
- AD-36 — Place is a Frappe tree. `covers(area, place)` is ancestor-or-self only and is the matching test; `within(place, subtree)` is a browsing convenience and never the coverage test. A travelling Vendor's Place for shrinkage and the five-Vendor floor is where their own business sits. A Rule attaches to the Space where the Service has Spaces and to the Listing where it does not. The permitted set is snapshotted onto the Agreement at confirmation. A Rule is a typed row — `restrict_service` or `informational` — never prose alone.

**Cross-cutting**
- AD-21 — The outbound messaging function's recipient is a link to a `User` record, so a Guest cannot be addressed: the database refuses. Composing an invitation is a separate path returning text and a link to the Family.
- AD-23 — Any rule with a time trigger is registered in one `scheduler_events` block. Five jobs exist only because the spine created them: the outbox dispatcher, the 180-day purge, the hash-chain verification sweep, the eight-year retention expiry, and guest-link expiry. Every job is idempotent, skips anything under legal hold, and raises a transition row rather than performing cascade work itself.
- AD-24 — The PRD Glossary is binding on every DocType name, field name, zod schema and UI string. Mechanism record names are architecture and never appear in copy. A pre-commit vocabulary gate blocks the banned words across `apps/`, `packages/` and the root `.html` files.
- AD-25 — Configuration comes from the environment; the repository holds only the shape of configuration.
- AD-34 — Billing records are immutable: an issued invoice is consecutively numbered and a correction is a credit note, never an edit. There is no auto-renewal, standing mandate, e-mandate, UPI Autopay or stored instruction to collect — the integration takes a single payment per term. Tax is determined by the recipient's State. A price change never alters what a Vendor already bought.

**Infrastructure, integration and gates**
- The backend is **not in this repository**. `vivahspot_backend` is a Frappe v16 app in a bench outside this tree; no Python, DocType JSON or `hooks.py` is ever created here.
- Stack is pinned: Frappe v16.33.0, Python ≥3.14 <3.15 and Node ≥24 on the bench (stricter than the monorepo's Node ≥20), MariaDB, Expo SDK 57.0.11, React Native 0.86.2, Next.js 16.3.0, Tailwind 3 + NativeWind 4 on mobile against Tailwind 4 on web, TypeScript 6 on mobile against 7 on web, zod 4.4.3.
- External integrations, named but unpinned: Razorpay taking a single payment per term; WhatsApp Business Cloud API with SMS fallback; MSG91 for OTP; object storage with CDN.
- Migrations: anything not expressible in `doctype.json` — AD-11's composite unique index, seed Services, Slot values, Place hierarchy roots — is a versioned patch in `patches.txt`, never a manual bench step.
- **Backend hosting is undecided** and blocks CI standing up a bench for AD-4's generator, NFR 5.4's peak sizing, FR-43's retention and backup story, observability, and ownership of TLS, secrets and patching. Choose before the first deploy.
- **Observability is deferred with hosting** and nothing currently measures whether NFR 5.4 holds.
- **Most of the quality gates the spine assumes do not exist.** *(Updated 2026-09-15 to `CLAUDE.md` §8.)* `npm run typecheck` and `npm run lint` both pass clean across the workspaces, neither covering test code. `npm run test:e2e` is a framework with no product tests yet, and every signed-in journey is blocked on a backend test mode that does not exist (`DEFERRED.md` D-24). There is no formatter, no CI, no secret scanning and no duplication threshold, and the backend has no gate of any kind. Every AD marked *does not exist* is a convention until that changes.
- **Rate limiting is deliberately absent in development** and is required before the first real user, with two Frappe traps recorded in AD-28.
- `coding-standards.md` supplies the hygiene vocabulary — 18 `UH-n` and 12 `CL-n` rules with an enforcement ladder — and is citable by id in a definition of done. Its Appendix B describes a different repository and is not cited.
- **The published static site contradicts the product**, carrying *Book Now*, *My Bookings* and a vendor bank-details payout section from the abandoned commission model. AD-24's gate fails on them by design; this is a live defect.
- **Review history warning:** seven adversarial gate rounds each found real defects in the round before, the final closure work was never re-gated, and the spine instructs that any AD touched by round 7 be treated as provisional and the reports read before cutting epics.

### UX Design Requirements

From the `DESIGN.md` + `EXPERIENCE.md` spine pair, with `RECONCILIATION.md` as the tie-breaker. Each is scoped to generate a story with testable criteria.

**Design tokens and their projection**

UX-DR1: Regenerate `packages/shared/src/tokens.js` from `DESIGN.md` as its projection — 18 colour tokens, 3 font families, 20 typography roles, 5 radii, 9 spacing values and 3 elevations. `tokens.js` currently carries the superseded placeholder rose-pink palette while NFR 5.10 names `DESIGN.md` as the source of truth, so the amended PRD points at one palette and the code at another (`DEFERRED.md` D-18). It stays plain ESM because both Tailwind configs execute in Node and cannot import TypeScript.

UX-DR2: Replace `apps/mobile/src/constants/theme.ts`, which is still the unmodified Expo starter palette imported by eight live modules, so the app renders off-brand whatever the spines say (`DEFERRED.md` D-19).

UX-DR3: Enforce the contrast lock on `muted #8C6A50` — 4.77:1 on ground, 4.89:1 on surface. It must never be lightened, including by the back door: `opacity: .75` on it renders 3.04:1 and breaks the lock. Set the colour, never fade it.

UX-DR4: Encode the forbidden colour pairings so they cannot be reintroduced: white on turmeric (1.61:1), vermillion on gold-tint (4.06:1), vermillion on turmeric (2.99:1), muted on gold-tint (4.14:1), muted on danger-tint (3.99:1 — and `meta` is muted by default, so a banner timestamp fails silently), turmeric as any non-text mark (1.61:1 on surface, 1.57:1 on ground).

UX-DR5: Fence `danger #8C2F1A` to failure and destructive confirmation only — never emphasis, a warning, a required field, or anything that merely feels urgent — because vermillion already means *action* and a red that means action cannot also mean danger. Never place a danger fill and a vermillion fill beside each other as sibling actions: under protanopia they collapse from CIEDE2000 16.92 to 7.14.

UX-DR6: Install the two typefaces or decide against them. Inknut Antiqua is specified with no file in the repo and no `expo-font` load, and `apps/mobile/tailwind.config.js` declares Playfair Display via `packages/shared/src/tokens.js` with no font file behind it — a live defect, not a plan (`DEFERRED.md` D-17). Both need an explicit yes under the dependency rule, and a five-weight Devanagari family may need subsetting for NFR 5.3.

UX-DR7: Apply the Devanagari optical correction — every Devanagari role set +0.10rem above its Latin sibling wherever the Latin role renders below 1rem, and at parity above it — across all five Devanagari roles, never at weight 300. Accept its two costs: a fixed 26px chip height sized to the Devanagari label so a mixed-script filter row stays even, and roughly 1.6px per line added to card titles on every results surface.

**Component inventory — 22 with visual specifications**

UX-DR8: `invitation-card` — the identity object and the top of Home. Settled facts in ink, open facts in muted at full strength, a turmeric rule drawing under each fact once as it settles, a foil sweep once when the last lands, and a 3px progress bar always accompanied by its `3 OF 5` label because the fill on the track is 1.36:1. First run is the same card with `— & —` and `0 OF 5`. The whole card is one target into the Workspace. The Guest's copy is the finished card with no progress element of any kind. One name — *invitation card* — in both spines and in code.

UX-DR9: `button-primary` — vermillion fill, white label, square, 44px minimum target. Labels are fixed and honest: Enquire, Send, Shortlist, Compare, and Save which belongs only to Boards. Disabled states state the reason beside them; pending keeps the target in place.

UX-DR10: `button-celebration` — turmeric fill with an ink label, never white, reserved for locking the Block and publishing a Real Wedding. A different component from the primary button, not a variant.

UX-DR11: `button-choice` — equal peers with no primary among them, today only the Guest RSVP's Yes / No / Not sure. Full width, 48px minimum, none filled, none preselected, none distinguished from its siblings by anything but its label.

UX-DR12: `stepper-count` — the Guest's headcount, the only numeric control in the product. Visible label bound by `for`/`id`, 48×48 decrement and increment flanking a keyboard-editable centre value, minimum 1, no maximum. Revealed only after *Yes*, pre-filled with the household figure the Creator recorded, scrolled into view and announced. Never cleared by a failed submission.

UX-DR13: `vendor-card` — 104px photo band with a placeholder gradient so imagery never blocks the text, a rating chip whose `rgba(0,0,0,0.6)` scrim is a floor never to be lightened, and a footer of price left and Enquire right. Verified carries a glyph and the word.

UX-DR14: `chip` — the one pill in the system. Gold-tint fill, 1px muted border, fixed 26px box, selected state carrying a leading check glyph as well as the fill change.

UX-DR15: `search-field` — 1px muted border, square, concrete placeholder copy, the Search action flush inside on the right. Scoped by where it sits: on Home across the configured catalogue and offering the Service itself as a result; inside Service results scoped to that Service and saying so. Submit runs the search — no live search-as-you-type on a two-bar connection — and no date input exists anywhere.

UX-DR16: `category-medallion` — a 60px circle on a 3-column grid rendering **the configured catalogue for the Place**, never a hardcoded six, with overflow as *See all* rather than a truncated grid.

UX-DR17: `tab-bar` — five Family destinations, Home · Wedding · Shortlists · Enquiries · You, in a fixed order that never reorders by usage. The active tab carries three signals: a 3px vermillion rule at 20–80% width, weight 600, and its label. Explicit safe-area padding. Tapping the active tab returns that stack to its root.

UX-DR18: `nav-rail` — 224px, replacing the tab bar on the vendor portal above 768px, carrying the same four destinations plus the Subscription's standing, never collapsing to icons only.

UX-DR19: `lens-switch` — one segmented control over one set of Enquiries, Calendar or Inbox, defaulting always to Calendar. Selection carries across the switch, lens and date are URL state so a nudge deep-links to the exact date, and the waiting count is part of the label text (`Inbox · 3`) rather than a coloured dot or bare badge.

UX-DR20: `availability-ring` — three states told apart by stroke geometry alone: 2px solid, 1px solid, 1px dashed, all in muted, with the icon as the second signal and the word as the third. The icon is an inline SVG calendar inheriting `currentColor` with `aria-hidden="true" focusable="false"`, cut twice — inner grid at ≥24px, removed with stroke 2.4 at ≤20px, the small cut drawn 10×10 inside the 12px box with its distinguishing mark breaking the body silhouette. All three survive greyscale.

UX-DR21: `calendar-day-bar` — a **count, never a texture and never a colour**: one solid vermillion bar for engaged, two countable segments at 29% each with a 12% gap for Enquiries pending, no bar and a struck-through number for unavailable. `::after` is reserved for the hit area and never shared with a state mark.

UX-DR22: `span-card` — the object that makes one Selection covering several days visibly one thing. 1px muted container edge with the turmeric rule surviving inset as warmth only. Title, one price, and each day it covers as a chip inside the card. It lives in *Across the wedding* above the Functions and appears exactly once.

UX-DR23: `function-card` — the Workspace's primary object, one per Function in date order, each Service row carrying a glyph **and** a word for settled, waiting or missing. It shows only what serves that Function alone; a Span is never echoed into it.

UX-DR24: `featured-band` and `badge-paid` — the two components that carry FR-20 together. A bounded container, the heading *Featured*, and a non-optional non-collapsible identifying line beneath it saying vendors pay for placement here. Every card inside also carries a square `badge-paid` reading the literal word, never built from `chip`, so a card lifted out of context still says what it is.

UX-DR25: `banner-failure` — danger-tint ground, 1px danger border with a 4px left edge, an always-present 22px danger glyph with a white mark, a sentence naming what happened and a sentence naming what happens next. Inline and persistent, never a toast that fades and leaves someone acting on stale data. Never the word *error*, never blame, never a traceback.

UX-DR26: `skeleton` — hairline blocks occupying the exact footprint of the content they replace so nothing moves on arrival, with a transform-only translateX sheen removed under `prefers-reduced-motion`. Chosen over a spinner. Never left on screen after a failure.

UX-DR27: `empty-state` — one anatomy everywhere: 48px circular icon, heading, one sentence, one primary button, centred and capped at 280px. Never a count of what is missing, never an urgency line, never a dead end with no button.

UX-DR28: `price-unestimated` — one component name in both spines and in code, rendering the literal lowercase *not yet estimated* in the exact slot the price would occupy. Never ₹0, never blank, never a dash, because zero reads as free.

**Behavioural patterns without a visual object**

UX-DR29: Compare tray — persistent and not modal, following the Family across results, rails and Shortlists; 2–3 slots; stating what is still needed while disabled; asking which to drop on a fourth pick. Never a ranking or a winner, and never across Services.

UX-DR30: Skip link on every long surface across all five surfaces, first focusable, visible on focus, surface-specific wording, moving focus rather than only scroll position.

UX-DR31: Ordering disclosure reachable from the results themselves, in plain language, opening in place and returning to the same scroll position and session seed. Never behind a login, a settings screen, or worded as a legal notice.

UX-DR32: Rules panel on the Listing itself, never a sub-page, rendering `restrict_service` and `informational` rows as one list in the Vendor's own order, naming which Space it is showing. Never truncated with a *read more* that hides a restriction.

UX-DR33: Rule-conflict prompt naming every impermissible Shortlist entry and Agreement by name, unproceedable without explicit acceptance, re-prompting where the permitted set has narrowed. Never a checkbox with a count or a prompt dismissible into acceptance.

UX-DR34: Collision view showing which Selection blocks which Candidate Block, by name, updating as she swaps, with no ranking, scoring, recommendation or per-Listing badge hiding a conflict.

UX-DR35: Enquiry thread as the immutable thread of record with no edit or delete path, carrying Quote, Site Visit offer, proposed terms and declined-by-conflict as thread events. WhatsApp and push carry a notification and a deep link and are never the conversation surface. Vendor outcome marks are never shown to the Family.

UX-DR36: Agreement record read-only from the moment both confirm, with *Propose an Amendment* as the only forward action, downloads returning the same stored bytes every time, and a certificate surface. Never described as binding, guaranteed or enforced.

UX-DR37: Guest household row with the household as the unit, attached per Function with an RSVP state per Function, and an unstated count reading *not stated* — never 0. A household with no phone number still counts and still shows.

UX-DR38: Pasted list import that reads nothing — one line becomes one household named exactly as pasted, count unstated, blank lines skipped. The paste box says what it will do before she pastes; nothing is written until she confirms the review table; a second paste appends and never reconciles. No de-duplication, no merging, no count inferred.

UX-DR39: Suggestion queue where everything from an Invited Member or the guest form arrives as a suggestion the Creator accepts or dismisses, never written straight in, with a dismissed guest-form submission erased at once.

UX-DR40: Portfolio image manager with four states each labelled in words — published, held back over allowance, pending Verification, taken down — in the Vendor's own explicitly reorderable order. A takedown leaves its gap; a pending image never consumes a paid slot; signed URLs are re-fetched, never rendered broken.

UX-DR41: Vendor calendar Slot control — four Slots per day, the same four for every Service, blockable whole or partially without stating a reason, blocked automatically by a confirmed Agreement. No clock time anywhere in it, no auto-expiry, silence never read as unavailability.

UX-DR42: Grievance entry point on every surface without a login, naming the officer and returning a quotable reference, staying visible offline and saying the submission will go when the connection returns.

UX-DR43: Offline band — a persistent inline band, never a toast, stating what is still usable, on the Family app, the Vendor portal **and** the Guest pages.

UX-DR44: Push notification scoped to exactly six events, each deep-linking to the exact thing: a Vendor reply, a Quote, an Agreement needing confirmation, a proposed Amendment, an Enquiry reaching thirty days unanswered, and an accepted Rule now conflicting. Nothing else, ever. Permission asked in context at her first Enquiry and never at launch; refusal silent and permanent; quiet hours respected; per-event control; never the record.

UX-DR45: Stale-calendar nudge triggered by three or more Enquiries touching one period, capped at one per Vendor per seven days, rendering beside the date in the Calendar lens and in the rail in the Inbox lens. A question, never a block, never a modal, never an escalating series.

**State coverage**

UX-DR46: Specify every surface against the five state classes — empty, cold load, failure, offline, permission — for all 24 surfaces in the IA, with any inapplicable cell naming why the state cannot occur there.

UX-DR47: Implement the three cold-load classes correctly: cache-then-refresh for Home, Enquiries, threads, Shortlists, Boards, Guest list, You and Real Weddings; skeleton-from-cold for Service results because the tie-break seed is per session; and **never cached, never rendered stale** for anything carrying money or availability.

UX-DR48: Write the twenty named empty states, from first run through zero matches — which offers the filters back one at a time in the order applied, never a single Clear all — to the Vendor's first week and the sub-five-Vendor comparison floor. The anatomy is closed; the per-surface strings are the open half.

UX-DR49: Implement the four sign-in dead ends on the only auth surface in the product: code expired keeping the number, attempts exhausted without revealing whether the number is registered, resends exhausted carrying the grievance entry point and the Admin recovery route, and the ninety-day inactivity session never announced as an expiry date.

UX-DR50: Implement the four permission paths — push, contacts, camera and photo library, location — each asked at the moment of the act, never at set-up, with refusal leaving a stated route forward and never a re-ask.

UX-DR51: Implement the Guest-page failure set, which has no equivalent elsewhere because a Guest has no account, no app and no route to ask: a reply that did not send keeping the answer and the adjusted count editable, an expired or revoked link showing nothing of the Wedding, and rate limiting that never hints whether the token or the number was valid.

**Accessibility**

UX-DR52: WCAG 2.1 AA on all five surfaces including both public Guest pages, with nothing essential conveyed by colour alone — verified status, availability, paid placement, the active tab and the availability ring each carrying a glyph, a weight change or a word.

UX-DR53: Label every interactive element with role **and** state for TalkBack and VoiceOver. The availability signal announces attribution — *"Shubhmangal Lawns shows available"* — never a bare "available"; the invitation card announces *"3 of 5 settled"*, not a bar; a Span announces the days it covers so a screen-reader user can tell it is one Selection over two days.

UX-DR54: Derive `lang` on Devanagari runs from the script at render time — `mr` where the Place is Marathi-primary, else `hi` — set on the run and never on the page, because the page is English on every surface. The person is never asked to declare a language.

UX-DR55: Hold tap targets at ≥44pt iOS / 48dp Android everywhere, with exactly one bounded exception — the Vendor month grid below 768px at 40×40 cells on a 42px pitch with no overlapping hit area — and one standing exemption for a link inside a run of text. A standalone control is never exempt, so the Guest pages' see-and-correct and grievance links must reach 48px and the growth line must be a block-level target.

UX-DR56: One focus treatment on every target across all five surfaces — a 2px vermillion ring at 2px offset holding the 3:1 non-text floor on every ground it can land on, with ink substituted on turmeric and on a vermillion fill. Never removed, never a tint alone, drawn on the card where the whole card is the target, traversal following reading order, revealed controls joining the order where they appear.

UX-DR57: Honour dynamic type through the typography tokens with nothing truncating at the largest setting, and make every container tolerate Devanagari and Latin in the same field at every size.

UX-DR58: Give every animation a `prefers-reduced-motion` path that leaves the meaning intact, and animate with transform and opacity only — never width, height, top, `background-position` or box-shadow. No animation is ever the only carrier of a state.

UX-DR59: Ship no dark patterns: nothing pre-ticked, consent specific and separately given per purpose and withdrawable as easily as given, paid placement labelled, cancelling as easy as starting.

**Responsive and platform**

UX-DR60: Family app single column always, 430px content maximum centring rather than stretching on a wider viewport, explicit safe-area padding, and Android/iOS parity with iOS not deferred.

UX-DR61: Vendor portal phone-first at the same 430px column, widening at 768px into three regions — the persistent left rail, the main column keeping the lens switch, and a right rail holding the nudge and the season's figures.

UX-DR62: Guest pages fluid and single column with no app shell, no tab bar and no chrome implying an account exists, readable at 200% zoom with nothing overflowing horizontally.

UX-DR63: No dark mode on any surface. The design is white-card-on-cream by construction and cannot be inverted by swapping tokens.

**Interaction discipline**

UX-DR64: Ban optimistic UI on anything that costs money or commits — confirming an Agreement, obtaining a Contact Reveal, sending an Enquiry and paying for a term all wait for the server and say so. Shortlisting may be optimistic.

UX-DR65: Ban across every surface: a date filter, infinite scroll that re-seeds order, countdown timers, urgency copy, pre-ticked consent, a cancel flow harder than the start flow, hover-only affordances, badge counts used as encouragement, streaks, and any celebratory animation on a cancellation, a removal or a review.

UX-DR66: Never re-seed result order accidentally — no pull-to-refresh on Service results, and pagination reuses the session's seed.

**Copy and vocabulary**

UX-DR67: Build the pre-commit vocabulary gate blocking *book, booking, booked, Book Now, My Bookings, cart, checkout, legally binding, guaranteed, enforced by Vivah Spot, v1, MVP, Phase N* across `apps/`, `packages/` and the root `.html` files — including in a toast, an empty state, a push, an aria-label, a filename or a variable name — exempting PRD §7.1 and §7.9. It fails today on the published site, which is a live defect.

UX-DR68: Enforce the attributed-voice copy rules: *shows available* never *available*; *no reviews yet* never a zero rating; *we recorded what you both agreed* never *your booking is protected*; *unanswered — no reply in 30 days* never blame; a neutral cancellation count with no fault language; British *Enquiry* everywhere and *Lead* only in the Vendor's own screen name.

UX-DR69: Keep Function and Service names from ever colliding — the Function is *Mehndi*, the Service is *Mehndi Artist* — and never invent a Service name in the UI; it comes from configuration.

**Surfaces still to be created**

UX-DR70: Scaffold `apps/guest-web` (Next.js), which does not exist. It carries four surfaces: the invitation/RSVP page whose reply control is visible without scrolling at 360×640 default text size, the guest form, the see-and-correct surface, and the grievance intake.

UX-DR71: Build the Real Weddings surface as both a public indexed page — the only deliberately indexed surface in the product — and an in-app inspiration surface, with no likes, comments, follows or counts.

UX-DR72: Build Reels as vertical full-screen swipeable clips with poster frame first and no autoplay on cellular, every clip naming its Space and credited Vendors tappable into their Listings, with the feed ordering disclosed on FR-20's terms because a feed is a selection and safe harbour does not cover editorial curation.

**Open UX questions carried into story writing**

UX-DR73: Thirteen questions remain open in `EXPERIENCE.md` and five in `DESIGN.md`. The ones that change what gets built: whether browsing works signed out (deviates from UJ-1's stated entry state); the vendor portal's screen count and editing model inside Listings, Performance and You; the empty-state strings; the growth line's wording and whether the Guest's number travels into his own sign-in; the guest form's composition and the link preview image; whether the Family also gets WhatsApp; a Reels length cap; where Real Weddings and Reels sit on Home; whether the Featured band sits above or below organic results; and where the Family writes her own account of an engagement and how long it can be.

### FR Coverage Map

Every FR maps to exactly one epic, with one deliberate exception noted at FR-11.

| FR | Epic | What that epic does with it |
|---|---|---|
| FR-1 | 1 | Phone-and-code sign-in, one identity, number change, Admin recovery |
| FR-2 | 3 | The Wedding belongs to the account that created it |
| FR-3 | 1 | One login per Vendor account |
| FR-4 | 1 | Admin capability model — stated in full at FR-61 |
| FR-5 | 3 | The Creator grants and revokes Wedding access by mobile number |
| FR-6 | 3 | Invited Members view and suggest, never act |
| FR-7 | 3 | Nothing is lost; no save action exists in the Workspace |
| FR-8 | 3 | The running budget builds itself from Selections and Agreements |
| FR-9 | 3 | The shape stated once, one Candidate Block per Anchor Date |
| FR-10 | 3 | One view of the whole wedding |
| FR-11 ◐ | 3 | The stated guest count per Function |
| FR-11 ◐ | 9 | The optional guest list, the paste import and the collection form |
| FR-12 | 9 | The Family sends the invitation; Guests reply on a hosted page |
| FR-13 | 4 | Availability evaluated against the whole Block, everywhere |
| FR-14 | 4 | Five Engagement Models govern how availability is checked |
| FR-15 | 4 | Collisions shown by name, never ranked or resolved |
| FR-16 | 4 | Locking the Chosen Block |
| FR-17 | 6 | Changing the Chosen Block cancels what was agreed against it |
| FR-18 | 4 | Search and per-Service filters, availability never a filter |
| FR-19 | 4 | What a Listing shows, including Rules on the Listing itself |
| FR-20 | 4 | The Featured band, organic ordering, and the disclosure |
| FR-21 | 4 | Side-by-side comparison on the Service's own attributes |
| FR-22 | 4 | Shortlists, and the Selection that moves the budget |
| FR-23 | 2 | A Listing holds several independently engageable Spaces |
| FR-24 | 2 | Rules published as a condition of listing |
| FR-25 | 2 | Preferred Vendors, acceptance-gated and never purchasable |
| FR-26 | 2 | All-in pricing per the Service's own model |
| FR-27 | 2 | Portfolio within the Tier's allowance |
| FR-28 | 4 | Slot-based availability per Space, auto-blocked by Agreements |
| FR-29 | 4 | The stale-calendar nudge, capped at one per seven days |
| FR-30 | 4 | Seasonal and off-muhurat pricing |
| FR-31 | 4 | Seeing where the year is empty |
| FR-32 | 6 | A conflicting Rule surfaced before it takes effect |
| FR-33 | 2 | Place hierarchy and declared service areas |
| FR-34 | 5 | An Enquiry carries the wedding with it |
| FR-35 | 5 | One immutable thread of record, both sides |
| FR-36 | 5 | Contact Reveal, counted and attributed |
| FR-37 | 5 | The Vendor records the outcome, for himself alone |
| FR-38 | 5 | Site visits that reserve nothing |
| FR-39 | 6 | Terms proposed, then confirmed by both sides |
| FR-40 | 6 | The five consequences of confirmation |
| FR-41 | 6 | What an Agreement is not |
| FR-42 | 6 | Cancelling, and the neutral count |
| FR-43 | 6 | The record that survives being needed |
| FR-44 | 7 | Only a real engagement earns a Review |
| FR-45 | 7 | The window opens on Delivery |
| FR-46 | 7 | The Family's public Review and the right of reply |
| FR-47 | 7 | The Vendor's structured, unpublished record |
| FR-48 | 7 | The blind, fourteen-day window |
| FR-49 | 7 | Neutral moderation |
| FR-50 | 2 | Tiers as records, and what actually differs between them |
| FR-51 | 2 | The Founding Vendor tier at ₹0, a real tier with a real expiry |
| FR-52 | 8 | Paying for the term and the GST invoice |
| FR-53 | 8 | Expiry, the Grace Period and the four routes out of discovery |
| FR-54 | 8 | Renewal is an active decision |
| FR-55 | 8 | What the Vendor can see about their own performance |
| FR-56 | 8 | What it cost per lead |
| FR-57 | 8 | Aggregate comparison behind a five-Vendor floor |
| FR-58 | 2 | Nothing lists without Verification |
| FR-59 | 2 | The conditions of listing |
| FR-60 | 2 | Removal, on narrow and stated grounds |
| FR-61 | 1 | Admin has every capability, and is bound by the integrity constraints |
| FR-62 | 2 | The catalog is configured; field set and behaviour are code |
| FR-63 | 10 | Grievance, takedown, retention and the obligations of an intermediary |
| FR-64 | 4 | Disclosure of the ordering parameters |
| FR-65 | 9 | Publishing a Real Wedding, photographs and clips |
| FR-66 | 9 | Consent governs what is published |
| FR-67 | 9 | Private inspiration Boards |
| FR-68 | 3 | Services chosen at the Wedding scope everything downstream |
| FR-69 | 6 | Amending an Agreement without recording a cancellation |
| FR-70 | 2 | Becoming a Vendor, with standing visible throughout |
| FR-71 | 2 | What each Service is additionally required to carry |
| FR-72 | 3 | A Wedding has a life, and it ends |

**72 of 72 FRs covered.** FR-11 is the only FR split across two epics, and the PRD splits it itself — *"The number comes first; the list is optional, and can be collected rather than compiled."* The stated count is load-bearing for the Enquiry and the budget and lands in Epic 3; the optional list, the paste import and the collection form land in Epic 9 beside the invitations they feed.

**Dependencies run strictly forward.** No epic requires a later one to function: Epic 3's budget reads *not yet estimated* with no Vendors chosen, Epic 4 works with an empty Shortlist, and Epic 6's cancellation cascade has nothing to cancel until Agreements exist.

## Epic List

**Stories are written one epic at a time.** Epic N's stories are written, developed and retrospected before Epic N+1's stories are written, so each epic's decomposition is informed by what the previous one actually cost. An epic below with no stories beneath it is waiting on that pass, not overlooked.

### Epic 1: Anyone can get in, once, by phone

Rutuja, Dattatray and Kiran each create an account and sign in with a mobile number and a six-digit code, on their own surface. No password exists anywhere. One person is one account, and one account can be both Family and Vendor. A number can be changed with proof of both, and a lost one recovered through Admin — attributed and recorded.

**FRs covered:** FR-1, FR-3, FR-4, FR-61

### Epic 2: A Vendor gets listed, verified, and findable

Dattatray self-registers, sets up his lawn and hall as separate Spaces, publishes all-in prices, Rules, his Commitment and his portfolio, declares where he will travel, and submits. Kiran verifies in person and the Listing goes live. Admin configures a Service, opens a Place, and can remove a fraud — every action carrying a name.

**FRs covered:** FR-23, FR-24, FR-25, FR-26, FR-27, FR-33, FR-50, FR-51, FR-58, FR-59, FR-60, FR-62, FR-70, FR-71

### Epic 3: The Family's wedding takes shape

Rutuja creates the Wedding, states its shape once and gets a Candidate Block per Anchor Date, selects the Services it needs, states her guest counts, and watches the running total build itself against her ceiling. She brings in family who can advise but not act. Nothing is ever lost, and the Wedding can conclude or be abandoned.

**FRs covered:** FR-2, FR-5, FR-6, FR-7, FR-8, FR-9, FR-10, FR-11 *(the stated count)*, FR-68, FR-72

### Epic 4: A Vendor keeps a calendar, and she finds the ones who can actually serve her days

Dattatray marks which Slots each Space is free in, prices his dead months, and gets nudged rather than policed when his calendar may have drifted. Rutuja searches inside a Service, reads Rules on the Listing itself, sees paid placement marked and separate, compares side by side, shortlists and selects — with availability against her whole Block already applied everywhere, never a date she types into a filter.

**FRs covered:** FR-13, FR-14, FR-15, FR-16, FR-18, FR-19, FR-20, FR-21, FR-22, FR-28, FR-29, FR-30, FR-31, FR-64

### Epic 5: A qualified Enquiry reaches the Vendor and they talk

WhatsApp buzzes and Dattatray receives a wedding rather than a name — the days, the guest count, the budget and the Functions — and has to ask her nothing. One immutable thread per Vendor, a Quote, a Site Visit, a Contact Reveal that is counted, and outcomes he marks for himself alone.

**FRs covered:** FR-34, FR-35, FR-36, FR-37, FR-38

### Epic 6: They put it in writing, and the calendar reflects it

He proposes terms — every value his — she is shown by name what his Rules would invalidate and accepts explicitly, both confirm, and Vivah Spot timestamps it and does nothing else. The Slots block themselves. The record freezes verbatim and downloads identically eight years later. Amendments append; cancellations release the time and count neutrally.

**FRs covered:** FR-17, FR-32, FR-39, FR-40, FR-41, FR-42, FR-43, FR-69

### Epic 7: Both sides answer for how it went

The window opens on Delivery — or on the Vendor's own published timeline, so there is no path to being unreviewable. Neither writes into the other's shadow. Her rating and her words publish on the Listing; his three structured answers reach only other Vendors and her.

**FRs covered:** FR-44, FR-45, FR-46, FR-47, FR-48, FR-49

### Epic 8: The Vendor decides whether it was worth paying for

Enquiries received, site visits, weddings won and what it cost — median reply time, cost per Enquiry, and an aggregate comparison that stays silent below five Vendors. Then a twelve-month term paid by a deliberate act, a GST invoice, a Grace Period, and reminders that are the renewal mechanism because nothing renews by itself.

**FRs covered:** FR-52, FR-53, FR-54, FR-55, FR-56, FR-57

### Epic 9: The Guests reply, and the wedding brings the next one

Rutuja collects or pastes a guest list, the Workspace composes the invitation and she sends it from her own number, and a Guest replies in about fifteen seconds with no account and no install. Later she publishes the wedding, and a stranger searching for a lawn finds a real one.

**FRs covered:** FR-11 *(the list and the form)*, FR-12, FR-65, FR-66, FR-67

### Epic 10: The obligations of operating in India

A complainant reaches a named grievance officer from any surface without a login and gets a reference they can quote, disposed within seven days. Takedowns, legal holds, breach records, and a see-and-correct surface for anyone whose data is held — including people who never had an account.

**FRs covered:** FR-63

---

## Epic 1: Anyone can get in, once, by phone

Rutuja, Dattatray and Kiran each create an account and sign in with a mobile number and a six-digit code, on their own surface. No password exists for a Family or a Vendor. One person is one account, and one account can be both Family and Vendor. A number can be changed with proof of both, and a lost one recovered through Admin — attributed and recorded.

> **This epic is foundation, and says so.** At the end of it a person can sign in and reach nothing — there is no Wedding, no Listing, nothing to browse. That is deliberate. AD-28's identity model is security-critical, needs a line-by-line human read, and everything after it inherits whatever it gets wrong; buried inside a fourteen-FR Vendor epic it would be rushed. The epic also lands the two gates the rest of the build depends on — AD-4's generated contract and AD-24's vocabulary sweep. **Do not read the goal above as a delivered destination.** The product opens for a Family at Epic 3 and for a Vendor at Epic 2.

**FRs covered:** FR-1, FR-3, FR-4, FR-61
**NFRs in force:** 5.1 (every string through i18next), 5.2 (Android and iOS parity; phone-first vendor portal), 5.5 (no dark patterns), 5.7 (attributable, append-only records), 5.8 (WCAG 2.1 AA), 5.10 (identity and voice)
**ADs governing:** AD-2, AD-3, AD-4, AD-14, AD-15, AD-16, AD-18, AD-24, AD-25, AD-27, AD-28, AD-30, AD-31, AD-32
**UX-DRs covered:** 1, 2, 3, 4, 5, 9, 25, 26, 27, 30, 43, 49, 52, 53, 55, 56, 57, 58, 59, 67, 68

> **Repo boundary.** Stories 1.3, 1.4, 1.5, 1.6, 1.7, 1.13 and 1.14 land mostly or wholly in `vivahspot_backend`, a Frappe v16 bench outside this tree. No Python, DocType JSON or `hooks.py` is created in this repository. Where a story names backend work, that work is done in the bench.
>
> **Amendment carried.** PRD FR-1 and AD-28 were amended 2026-09-08: Admin staff sign in to Frappe Desk with a password, while Family and Vendor accounts hold none and are Frappe Website Users. Stories 1.3, 1.13 and 1.14 implement the amended text, not the original.
>
> **The CL-10 reads are a Definition of Done, not a criterion.** Stories 1.3, 1.5, 1.13 and 1.14 each require a line-by-line human read of security-critical code. No machine can see that read happen — it is tier 3 on the enforcement ladder, and `coding-standards.md` is explicit that a rule no machine can see broken is a convention. So none of those four is done until its commit message names the read: who read it, on what date, and what they were looking for. That sentence in the commit is the only evidence the read ever existed, which is exactly what CL-11 says a commit message is for.
>
> **Story size is not capped at one small session, and 1.3 is the deliberate case.** Story 1.3 carries the identity model, the opaque email synthesis, the `user_type` separation and three Frappe settings together. It was reviewed for splitting on 2026-09-12 and left whole: every part of it is the same invariant, and splitting it produces two stories that are each individually meaningless with a hole between them. A large story is acceptable here because the implementing agent has the context window to hold it. Do not split it to hit a size target.
>
> **Tests are end-user tests only, per `TESTING.md`.** There are no unit, component or programmatic backend tests, by decision. Where a story says a test asserts something, that test drives the product the way a person does — Playwright against the vendor portal, Maestro against the Family app — with state seeded through the API. Every signed-in journey depends on a backend test mode of reserved numbers with a fixed code, which does not exist yet (`DEFERRED.md` D-24). Nothing runs either suite automatically, because there is no CI (D-5, D-6).

### Story 1.1: The product's own identity reaches every screen

As a person opening the Family app or the Vendor portal,
I want every screen set in Vivah Spot's own colours and type,
So that what I see is the product rather than a starter template's palette.

**Acceptance Criteria:**

**Given** `DESIGN.md` is the single source of truth for colour and type under NFR 5.10
**When** `packages/shared/src/tokens.js` is regenerated from it
**Then** it carries all 18 colour tokens, 3 font families, 20 typography roles, 5 radii, 9 spacing values and 3 elevations at the values `DESIGN.md` states
**And** it remains plain ESM, because both Tailwind configs execute in Node and cannot import TypeScript
**And** `DEFERRED.md` D-18 is closed

**Given** `apps/mobile/src/constants/theme.ts` is the unmodified Expo starter palette imported by eight live modules
**When** it is replaced by the generated tokens
**Then** no module imports a colour that is not in `tokens.js`
**And** the dark palette the starter shipped is removed, because the design system has none
**And** `DEFERRED.md` D-19 is closed

**Given** mobile runs Tailwind 3 with NativeWind 4 and vendor-web runs Tailwind 4 with `@theme`
**When** both configs are pointed at the shared tokens
**Then** each reads the same values through its own major's syntax, and neither config's syntax is copied into the other

**Given** the muted text token is contrast-locked at `#8C6A50`
**When** any surface renders secondary text
**Then** the token is set as a colour and never faded by opacity, because `opacity: .75` on it renders 3.04:1 and breaks the lock

**Given** `npm run typecheck` and `npm run lint` are the gates that currently exist
**When** the change is complete
**Then** `npm run typecheck` and `npm run lint` both pass, and each command and its output are quoted in the completion report

### Story 1.2: No banned word can reach a screen

As the author of this product,
I want a gate that refuses a commit carrying the retired transaction vocabulary,
So that no screen ships a word that creates the liability the no-money model exists to avoid.

**Acceptance Criteria:**

**Given** PRD §7.9 bans *book, booking, booked, Book Now, My Bookings, cart, checkout, legally binding, guaranteed, enforced by Vivah Spot, v1, MVP, Phase N*
**When** `scripts/vocab-gate.sh` runs against a commit touching `apps/`, `packages/` or a root `.html` file
**Then** it blocks on any of those words in any added line
**And** it scans strings a person never sees as well as ones they do — a toast, an empty state, a push, an `aria-label`, a filename, a variable name

**Given** PRD §7.1 and §7.9 contain the banned words in order to ban them
**When** the gate scans the planning artifacts
**Then** those two sections are exempt and everything else is checked

**Given** the published static site at the repository root carries "Book Now", "My Bookings" and a vendor bank-details payout section
**When** the gate runs against it
**Then** it fails, and that failure is recorded as a live defect rather than suppressed — the site contradicts the product and AD-24 says the gate fails on it by design

**Given** the escape hatch must be visible in review
**When** a line genuinely needs to carry a banned word
**Then** it carries an inline allow comment on the offending line, never a flag on the commit command

### Story 1.3: One person, one account, and only the door we built

As a Family or a Vendor,
I want my account reachable only by the sign-in that was designed for it,
So that no path nobody designed can open it.

**Acceptance Criteria:**

**Given** Frappe's `User.autoname` hardcodes `self.name = self.email` for every non-admin user, with `email` mandatory and validated as a real address
**When** a product account is created
**Then** the synthesised address carries an opaque local part — `u-3f9a2c81@…`, never `9822012345@…`
**And** the real mobile number lives in `mobile_no`, which carries `unique: 1` and is the lookup key at sign-in
**And** no other record copies that person's name or number — everything else links to the `User` — because Frappe stamps `owner` and `modified_by` on every row and AD-14's erasure must have one place to clear for an account holder
**And** this story creates no `Guest` record and no `Person` record: AD-14 was amended 2026-09-12 to two identity records, and the `Guest` shape is Epic 9's work where guest lists first exist

**Given** Frappe gates Desk access on `user_type`
**When** a Family or Vendor account is created
**Then** its `user_type` is Website User and no password is set on it
**And** that account cannot open `/app`
**And** an end-user test proves both through a real browser — a Family account signs in and is refused at `/app` — because a product user created as a System User can reach Desk and that is the hole this story closes

**Given** Frappe ships other ways into an account keyed on the synthesised email
**When** the site is configured
**Then** the magic login link is disabled, `login_with_email_link` having defaulted to 1 and `login_via_key` minting a full session
**And** password reset — `reset_password` and `update_password` — is disabled
**And** Frappe's own login-by-mobile at `user.py:839` stays off, because OTP verification is ours

**Given** Admin staff and developers reach Frappe Desk, which authenticates against Frappe's own login, and `disable_user_pass_login` is site-wide with no per-role form
**When** the site is configured
**Then** username-password login stays **enabled**
**And** the property it protected is asserted directly instead: no Family or Vendor account holds a password, so the door opens onto nothing for them
**And** this divergence from AD-28's original text is the amendment of 2026-09-08, not an oversight

**Given** this is security-critical work under CL-10
**When** the story is complete
**Then** it is read line by line by a person before it is called done

### Story 1.4: A person asks for a one-time code

As anyone arriving at the product,
I want a six-digit code sent to my mobile number,
So that I can get in without ever inventing a password.

**Acceptance Criteria:**

**Given** the caller is not signed in
**When** they request a code for a mobile number
**Then** the endpoint is `allow_guest`, restricts `methods` to POST, takes a fixed DocType never one from input, and returns only fields safe to show an unauthenticated caller

**Given** FR-1 fixes the code's shape
**When** a code is issued
**Then** it is six digits, valid for ten minutes
**And** it is delivered over WhatsApp with SMS as the fallback, so neither channel is the sole path to an account

**Given** an attacker can probe which numbers are registered
**When** a code is requested for any number, registered or not
**Then** the response is identical in both cases and reveals nothing about whether an account exists

**Given** rate limits are configuration, off in development and required before the first real user
**When** the limits are wired
**Then** they are enforced server-side and never by a client
**And** two known Frappe traps are handled: `@rate_limit` keys its counter on `frappe.form_dict.cmd`, which `/api/v2` never sets, so every decorated endpoint would otherwise share one bucket; and it counts per IP while FR-1's limit is per number

**Given** every user-facing string routes through i18next from day one under NFR 5.1
**When** any message reaches a person
**Then** it goes through i18next even though English is the only locale

### Story 1.5: A person signs in with that code and stays signed in

As Rutuja planning a wedding across months,
I want to enter the code once and stay signed in,
So that the platform never logs me out mid-season.

**Acceptance Criteria:**

**Given** a valid code was issued to a number
**When** it is submitted before expiry
**Then** a Frappe session is minted server-side, never by a client
**And** where no account exists for that number, one is created per Story 1.3's rules
**And** where sign-up was abandoned partway earlier, the person resumes without a duplicate account being created

**Given** FR-1 caps attempts and resends
**When** a code is entered wrongly
**Then** at most five attempts are accepted on that code, and at most three resends per hour on that number

**Given** `session_expiry` is one site-wide idle timeout in `hh:mm`, refreshed on activity
**When** it is configured
**Then** it is set to `2160:00`
**And** the result is ninety days of **inactivity**, not ninety days from sign-in, and no code describes it as an absolute lifetime
**And** the same generosity reaching Admin is a known and accepted cost of one site-wide setting

**Given** NFR 5.3 guarantees work survives a lost connection, which guarantees retries
**When** a verification request is retried after a dropped connection
**Then** it carries an idempotency key and applying it twice is safe — never a second session, never a consumed second code

**Given** this is the product's sole authentication factor
**When** the story is complete
**Then** it is read line by line by a person under CL-10

### Story 1.6: One account, both roles — and one login per Vendor

As a venue owner planning his own daughter's wedding,
I want one account that is both Family and Vendor,
So that I do not have to invent a second identity.

**Acceptance Criteria:**

**Given** one account may hold both roles
**When** any gate runs
**Then** it resolves the acting role explicitly and never assumes it from the endpoint the request arrived on

**Given** FR-3 gives a Vendor business exactly one account
**When** the Vendor surfaces are built
**Then** no additional users, roles, invitations or permission tiers exist on a Vendor account — this requirement is satisfied by building none of it
**And** a Vendor operating in several Services still holds one account

**Given** FR-39 bars an account from transacting with its own Listing
**When** role resolution is built
**Then** it exposes what a later gate needs to compare the acting party against a Listing's owner, so that Epic 6 has the seam it requires and this story does not build that gate

**Given** AD-2 forbids a client calling `/api/v2/document/:doctype`
**When** a client asks what it may act as
**Then** it calls a purpose-built whitelisted method under `api/`, which gates every document it touches before it reads data

### Story 1.7: Three clients parse against a contract that is actually checked

As the author of a phone application that cannot be redeployed on demand,
I want one generated contract the three clients parse against,
So that a field rename is a reviewable diff rather than a runtime failure on ten thousand Androids.

**Acceptance Criteria:**

**Given** AD-4 defers the generator until `api/family/v1` has its first three methods
**When** code issuance, code verification and role resolution exist
**Then** the generator is built, and `DEFERRED.md` D-12 is closed

**Given** Frappe's `validate_argument_types` covers the request half only and explicitly skips a function whose only annotation is a return type
**When** a method under `api/` returns
**Then** our own decorator validates the returned value against its own annotation
**And** it is active in development and test where a mismatch fails the build, and off in production where it would tax every request

**Given** a bench script emits `contract/family.v1.json`
**When** zod schemas are produced in `packages/shared`
**Then** they are **generated** from that file and never hand-written
**And** drift between the Python signature and the client schema appears as a diff a reviewer can see

**Given** AD-3 freezes `api/family/v1` once shipped
**When** the namespaces are laid out
**Then** `api/vendor/` and `api/guest/` carry no version segment, and that absence is left alone rather than "corrected" to match

### Story 1.8: Rutuja signs in on the Family app

As Rutuja on a mid-range Android with two bars of signal,
I want a sign-in screen that tells me exactly where I stand,
So that I am never stuck without knowing what to do next.

**Acceptance Criteria:**

**Given** the screen asks for a mobile number and then a code
**When** it renders
**Then** it carries no password field, no forgot-password link and no magic-link option, because none exists
**And** it offers passkey, Google and Apple as additional methods, with Apple offered wherever Google is on iOS
**And** the mobile number route always works and is never the only option offered

**Given** the resend limit is three per hour
**When** the screen shows the resend control
**Then** the control is timed rather than a button that fails
**And** no attempt counter is displayed until an attempt has been used, because a counter shown cold reads as an accusation

**Given** a code expires after ten minutes
**When** the person submits an expired code
**Then** the screen says the code has expired, **keeps the number**, clears the entered digits, and offers a resend if resends remain

**Given** five attempts are exhausted
**When** the person submits a sixth
**Then** the screen says a new code is needed and offers a resend if resends remain
**And** it never reveals whether the number is registered

**Given** resends are exhausted
**When** the person has no forward action left
**Then** the screen says in plain words how long until a resend is available
**And** it carries the grievance entry point and the recovery route, because this is the one dead end in the product with no forward action

**Given** NFR 5.8 requires WCAG 2.1 AA
**When** the screen is used with TalkBack
**Then** every interactive element is labelled with role and state, focus follows reading order, the focus ring is never removed and never signalled by a tint alone, and nothing essential is carried by colour alone

**Given** the connection drops
**When** the person is mid-sign-in
**Then** the offline band appears inline and persistent, never a toast, stating what is still usable
**And** any failure renders as the failure banner — a glyph, a sentence naming what happened, a sentence naming what happens next — never the word *error*, never blame, never a traceback

### Story 1.9: Dattatray signs in on the Vendor portal

As Dattatray reading a message standing at someone else's function,
I want the portal to sign me in on my phone as easily as the app does,
So that I am not sent to a desk to answer an Enquiry.

**Acceptance Criteria:**

**Given** NFR 5.2 makes the portal phone-first — designed for the phone at a function rather than tolerating it
**When** the sign-in screen renders at 360px
**Then** it is single column at the 430px content maximum, nothing overflows horizontally, and every target holds 44pt/48dp

**Given** the same mechanism serves Families and Vendors
**When** the portal signs someone in
**Then** it calls the same methods Story 1.5 built, and no second auth mechanism exists on this surface

**Given** the portal is Next.js on Tailwind 4 while the app is Expo on Tailwind 3
**When** both screens render
**Then** both read the same tokens from `packages/shared`, and the portal is visibly the same product

**Given** the four dead ends are the same four
**When** a code expires, attempts run out, resends run out, or the connection drops
**Then** the portal behaves as Story 1.8 specifies, in the same words

**Given** NFR 5.8 covers every surface
**When** the screen is used with a keyboard and a screen reader
**Then** it meets WCAG 2.1 AA, carries a skip link, and holds focus visibly on every ground it can land on

### Story 1.10: She returns without typing a code

As a returning person,
I want my own phone's lock to let me back in,
So that I am not re-entering a code every time I open the app.

**Acceptance Criteria:**

**Given** the person has signed in once on this device
**When** they return
**Then** they may re-enter with the device's own biometric or screen lock
**And** the session is the one Story 1.5 minted, not a second mechanism

**Given** the device has no biometric or screen lock configured
**When** they return
**Then** the phone-and-code route works unchanged, and nothing is gated behind a capability the device lacks

**Given** the session ends after ninety days of inactivity
**When** it has expired
**Then** the person signs in again by code, and no screen ever announces a session expiry date

### Story 1.11: Linking a passkey, Google or Apple to an account I already have

As someone who would rather tap once than type a code,
I want to add a passkey or a Google or Apple sign-in to my existing account,
So that getting in is quicker without becoming less safe.

**Acceptance Criteria:**

**Given** one person is one account and the mobile number is the identity
**When** a second sign-in method is presented
**Then** it links to an existing account **only** where it carries a verified mobile number matching that account
**And** an email address alone never links anything

**Given** a platform with no passwords and ninety-day sessions would otherwise hand over an account to anyone who obtained a matching sign-in
**When** a link is attempted
**Then** it requires proof of control of the existing account — a one-time code to its number
**And** the person is told what was linked and when

**Given** a second method may not be linkable
**When** the match fails
**Then** it creates a separate account rather than failing silently, and the person is told why

**Given** Apple's condition for shipping at all
**When** Google is offered on iOS
**Then** Sign in with Apple is offered beside it

### Story 1.12: Changing the mobile number on my account

As someone whose number just changed,
I want to move my account to the new one,
So that I do not lose the wedding I have been planning for months.

**Acceptance Criteria:**

**Given** numbers change constantly and an account that cannot follow its owner is an account they lose
**When** a person changes the number on their account
**Then** it requires proof of control of **both** the old number and the new one

**Given** `mobile_no` carries `unique: 1`
**When** the new number already belongs to another account
**Then** the change is refused with a message that does not reveal whose account holds it

**Given** NFR 5.7 requires records that change a person's access to be attributable and not silently alterable
**When** the change completes
**Then** it is recorded, and the person is told what changed and when

### Story 1.13: Pravin's staff reach product Admin capability in Desk, and nothing of the framework

As Pravin,
I want my staff to do every Admin job in Desk without reaching Frappe's internals,
So that the people who verify Vendors cannot alter the system that records the verification.

**Acceptance Criteria:**

**Given** PRD §7.8 and FR-61 forbid role tiers **within** Admin
**When** the staff role is defined
**Then** every staff member reaches every product Admin capability, with no scoped Admin, no permission tier and no approval chain between them

**Given** the staff–developer line is a framework boundary rather than an Admin tier
**When** the role is granted
**Then** staff hold record-level write on the documents FR-62 makes configuration — Service, Place, Subscription price and portfolio allowance — plus Verification, removal, grievance and account recovery
**And** staff never hold System Manager, so DocType schema, Customize Form, Property Setter and bench stay with developers

**Given** staff sign in to Desk with a password under the amendment of 2026-09-08
**When** a staff account is created
**Then** its `user_type` is System User and a password is set by a developer from the User form
**And** password reset stays disabled, so a forgotten password is reset the same way

**Given** AD-32 records that a Desk read cannot be logged and that `Administrator` is exempt from `permlevel` entirely
**When** staff work in Desk daily
**Then** the residual risk is the one recorded at `DEFERRED.md` D-22, carried by attribution and operational discipline rather than by a technical control
**And** no story in this epic claims to have closed it

**Given** this is security-critical work
**When** the story is complete
**Then** the role's permission set is read line by line by a person under CL-10

### Story 1.14: Every Admin action carries a name, and recovery is the first one

As Pravin,
I want every action my staff take on someone's standing or account to carry their name permanently,
So that the control on a team where everyone can do everything is that nothing is anonymous.

**Acceptance Criteria:**

**Given** FR-61 requires attribution rather than restriction
**When** an Admin action changes a Vendor's standing, a Listing's visibility, published content, or a person's access to their own account
**Then** it is attributed to the individual who took it, timestamped, and cannot be erased
**And** the record is append-only: corrections append and nothing is overwritten

**Given** AD-27 puts any invariant that must bind Admin in the DocType controller rather than in `api/` or `domain/`
**When** the log is built
**Then** its guard is a controller guard, because Frappe Desk sits directly on the DocTypes and would walk past a guard in `api/`
**And** Admin cannot erase an audit record, alter a confirmed Agreement, or edit or suppress a Review — the latter two being assertions this story makes now and Epics 6 and 7 rely on

**Given** losing a mobile number is a recoverable state rather than a dead end
**When** the old number is gone
**Then** recovery goes through Admin, who verifies the person by other means and records what was done and by whom
**And** it is deliberately manual, because an automated route here would be the platform's weakest point

**Given** FR-61 calls recovery the single most sensitive thing Admin does
**When** a recovery completes
**Then** it is attributed and unerasable like any other Admin action
**And** the person whose account was recovered is told that it happened

**Given** FR-61 requires access to Guest contact data be confined to those with an operational need and logged
**When** that access happens through `api/`
**Then** it is logged there, referencing the `Guest` row rather than copying the number, and the log is append-only and outlives the data it describes
**And** access through Desk is not logged, which is the accepted gap at `DEFERRED.md` D-22
