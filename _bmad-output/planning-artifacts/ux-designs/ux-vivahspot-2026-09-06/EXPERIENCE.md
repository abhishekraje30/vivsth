---
name: Vivah Spot
description: Information architecture, behavior, states and journeys for the Vivah Spot family app, vendor portal and public guest pages.
status: draft
updated: 2026-09-06
design: ./DESIGN.md
sources:
  - _bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/prd.md
  - _bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md
  - ./.memlog.md
---

# Vivah Spot — Experience Spine

> `DESIGN.md` owns how it looks. This owns how it works. Where a mock, a wireframe or the published
> `vivahspot.com` disagrees with either spine, the spine wins.
>
> **`.memlog.md` outranks this document, and outranks the PRD.** Two of its decisions override
> shipped FRs; both overrides are recorded in full below and both need a PRD edit that has not been
> made.

## Foundation

Five surfaces, three of them client code in this repo, one of them a Frappe Desk that nobody designs,
one of them a static marketing site that currently contradicts the product.

| Surface | Form factor | Who | Built as |
|---|---|---|---|
| **Family app** | Native mobile, Android **and** iOS, parity (NFR 5.2 — "iOS is not deferred") | The Family: one person doing the running, any age, pays nothing | `apps/mobile` — Expo, expo-router, NativeWind 4 / Tailwind 3 |
| **Vendor portal** | Responsive web, **phone-first** (NFR 5.2 — "designed for that case rather than tolerating it") | The Vendor: the only paying customer, on a phone between jobs | `apps/vendor-web` — Next.js, Tailwind 4 |
| **Guest pages** | Public web, no account, no install, no sign-in | The Guest: not a user of the platform, a distinct class of data subject (§3) | `apps/guest-web` — token-addressed (AD-30) |
| **Admin** | Frappe Desk | Admin staff, phone in the field + laptop at the office (UJ-4) | **Not a client.** No custom console to design (AD-2, Design Paradigm) |
| **vivahspot.com** | Static marketing site | Public | Repo root. Superseded by this work; see *Inspiration & Anti-patterns* |

No UI system is named for any surface. There is no shadcn, no MUI, no internal component library to
inherit from — every component below is specified from scratch and its appearance lives in
`DESIGN.md.Components`.

**Two constraints shape every screen before anything else does.**

1. **Clients never do money arithmetic** (AD-19). No total, no per-head multiplication, no budget
   rollup is computed in the app or the portal. Every figure arrives pre-computed and the UI
   renders it. There are no live-updating "as you type" totals unless a round trip backs them.
2. **The mobile app's data contract freezes on release** (AD-3, `api/family/v1/`). A family screen
   that needs a new field is a versioning event, not a tweak. Compose family screens for additive
   change. `vendor/` and `guest/` carry no version segment because those clients redeploy with the
   backend — their UX may evolve freely, and that asymmetry is deliberate.

The interface is **English on every surface** (NFR 5.1). There is no app-wide language switch and
none is offered. Devanagari appears only in **user content** — a Vendor's Rules and Commitment, a
Listing description, a Family's review, a Function the Family named herself, and the couple's own
names on the invitation card — shown exactly as the person wrote it, never translated, never
normalised, never asked to declare a language. Every user-facing string still routes through
`i18next` from day one (AD Conventions §i18n), as insurance, at one locale.

---

## Information Architecture

### Family app

**Home is the shop.** Rutuja lands on a browse-and-discover home: the invitation card strip pinned
at the top, then search, then six category medallions, then featured Vendors. It is meant to feel
exciting. The wedding lives one tap away, behind the card or the Wedding tab.

> **OVERRIDE — recorded, not silently applied.** This contradicts two shipped FRs and one
> architectural assumption:
> - **FR-10** — "It is the first thing the Family reaches after sign-in, not a screen they navigate
>   to." The Workspace is now a tap away, not the landing surface.
> - **FR-68** — "The Family never browses the catalog category by category." Home has six category
>   medallions and a See-all into the rest of the catalog.
>
> Both FRs require a PRD edit that **has not been made**. The architecture spine also assumes
> Workspace-first. What survives of FR-68 unchanged: the Family still **selects Services onto the
> Wedding**, at Wedding level or per Function, and can add or remove one at any time — browsing does
> not create the Service set. What survives of FR-10 unchanged: everything it lists still sits in
> **one view**; only its position in the navigation moved.

| Surface | Reached from | Purpose |
|---|---|---|
| **Home** | App open (cold), Home tab | Invitation card strip · search · six category medallions · featured Vendors band · organic Vendors near the Wedding's Place |
| **Workspace — By Function** | Tap the invitation card · Wedding tab | The wedding organised by **Haldi / Wedding / Reception**: each Function opens to show which Services serve it and what is still missing. Running total in the header |
| **Function detail** | Tap a Function in the Workspace | One ceremony: its day, Slot, stated guest count, and every Service serving it with its state |
| **Service results** | Category medallion · search · See all · "find a caterer" from a Function | The one results surface: search, per-Service filters, Featured band, organic results |
| **Listing detail** | Any Vendor card | Photos, all-in price, rating and Review count, verified status, Sizing Attribute, availability signal against her Blocks, Places served, **Rules on the Listing itself**, Commitment, Spaces, Preferred Vendors, reviews |
| **Shortlist (per Service)** | Shortlists tab · from a Service's results | The Listings saved in one Service. Compare from here |
| **Compare** | Compare tray, 2–3 selected | Side by side on the Service's own configured attributes, plus availability against each Candidate Block |
| **Blocks** | Workspace header · the collision prompt | Up to five Candidate Blocks, the collision view, the lock action |
| **Enquiries** | Enquiries tab | Every Enquiry across every Service with its current state — sent, answered, or unanswered at thirty days. Vendor outcomes are never shown here |
| **Enquiry thread** | Enquiries tab · Workspace · Function detail · Listing | One thread per Vendor. The thread of record |
| **Agreement** | Enquiry thread · Workspace Function row | Read-only after both confirm. Download, certificate, propose an Amendment |
| **Guest list** | Workspace | Households per Function, RSVP counts beside the stated number, the guest-form link, the submissions queue |
| **Boards** | Workspace · save from a Listing or image | Private inspiration. Saving here shortlists nothing and moves no money |
| **You** | You tab | Account, the Wedding switcher, Invited Members, the structured record Vendors hold about her (FR-47), grievance, disclosures |

**Tab bar, five tabs: Home · Wedding · Shortlists · Enquiries · You.**

> **DECIDED.** The two artifacts of this run disagreed — `DESIGN.md.Components.tab-bar` had
> *Home · Explore · Shortlists · Wedding · You*, the chosen Structure C mock had
> *Home · Wedding · Shortlists · Enquiries · You*. Abhishek chose the second, and `DESIGN.md` has
> been corrected to match. **Enquiries is a top-level destination**, not a badge on the Wedding tab:
> once she has sent them, checking whether anyone replied is the reason she opens the app. There is
> no Explore tab, because Home is already the shop and a second tab would point at the same place.
> Every Enquiry and its status still appears inside the Workspace as FR-10 requires — the tab is an
> additional route to them, not the only one.

Modals stack one level deep, never two. There are no breadcrumbs; the back affordance is the whole
upward path, as on the published site.

### First run

**She looks around first. The card invites her in.**

There is no set-up sequence. A cold open lands on the shop — search, the six category medallions,
featured Vendors — fully browsable, with the invitation card sitting blank on top of it:
*Omkar & Snehal* replaced by a dotted rule, and one line reading **"Tell us about the wedding · two
minutes."**

| Rule | |
|---|---|
| **Nothing is gated that does not need wedding context** | Browsing, searching, opening a Listing, reading Rules, Commitments and reviews all work with no Wedding and no account |
| **Three acts require a Wedding, and each one asks for it in place** | Saving to a **Shortlist** (a Shortlist exists per Service *per Wedding*), seeing an **availability signal** (it is computed against Candidate Blocks — there is no date filter to fall back on), and sending an **Enquiry** (it carries the Wedding with it, FR-34) |
| **The ask is the card, not a wall** | Tapping the blank card starts set-up. So does the first gated act, which returns her to exactly what she was doing afterwards — never to the home screen |
| **Set-up is one sitting for the Block, resumable for everything else** | Couple names, Place, guest count and budget can be given and left. **The Anchor Dates and the shape of the days belong together**: the platform derives the Candidate Blocks by shifting one shape across each date, so a half-stated shape produces nothing. That step completes or it does not start |
| **The card shows progress, never pressure** | It fills as facts arrive and carries its `n OF 5` label. No percentage nagging, no red, no "finish setting up" interstitial, no reward for completion beyond the card being finished |
| **"Help us find an auspicious date" appears at the dates step and is visibly deferred** | UJ-1 step 1 offers it; PRD §7.7 defers the astro service. It is named as coming, never as broken |

`[ASSUMPTION]` **Browsing works signed out.** UJ-1's entry state is *"New install, signed in with
phone and OTP"*, which assumes sign-in precedes everything. The home-is-the-shop decision makes that
assumption load-bearing rather than incidental: if a stranger must prove a phone number before seeing
a single lawn, the shop is not really the front door. So the account is created at the first act that
needs one — Shortlist, availability, or Enquiry — using the same phone-and-OTP flow (AD-28), and
never before. **This deviates from UJ-1's stated entry state and should be confirmed.**

### Vendor portal

**Identical in identity to the family app** — same Kumkum palette, same type system, same components,
same warmth. Dattatray opens it and knows instantly it is the same product his customers use. It is
phone-first, at the same 430px column, widening above 768px.

**Four destinations: Enquiries · Listings · Performance · You.** A tab bar on the phone, a
persistent left rail above 768px. The same five capabilities as before, minus one — because
Calendar is no longer a destination.

**Enquiries is the landing surface, and it has two lenses.**

The Calendar and the Inbox are not two screens with a toggle between them. They are two
arrangements of *the same set of Enquiries* — by date, or by recency. A segmented switch sits at the
top of the main column, and what makes it one surface rather than two is that **selection carries
across it**: choose 27 November in the Calendar lens, switch to Inbox, and the list is filtered to
that date with a clearable chip saying so.

| Rule | Why |
|---|---|
| **Opens in the Calendar lens, always** | A stale calendar silently corrupts every Family's cross-service matching, and the nudge is its sole safeguard (UJ-1 cross-journey dependency). Opening here makes keeping it honest the path of least resistance |
| **The Inbox segment carries the waiting count** — `Inbox · 3` | Reply speed is the one Vendor behaviour that moves ranking (FR-20). A Calendar-first default must not hide unanswered Enquiries, or it costs him rankings silently |
| **The rail is constant across both lenses** | It carries the stale-date nudge, the season's Lead Dashboard figures, and median reply time against the Vendor's Service in their Place. The subscription argues for itself whichever lens is showing |
| **A global needs-a-reply block stays in the rail** even while a date is selected | Same reason as the count. Date selection narrows the main column, never the obligation |
| **Lens and selected date are URL state** — `?view=calendar&date=2026-11-27` | A stale-calendar nudge notification deep-links to the exact date it asks about, and the back button behaves |
| **The nudge renders in both lenses** | Beside the date in Calendar; in the rail in Inbox. One component, two contexts, never a modal interruption |

Determined by the sources, and only this:

| Capability | Determined by | What is fixed |
|---|---|---|
| Listing + Spaces | FR-23, AD-11 | Spaces are set up **separately**, each with its own capacity, Stated Size, all-in price, calendar and explicit `concurrent_capacity` (min 1, never defaulted). The Family engages a Space, not a Listing |
| Listing completeness | FR-59, AD-27 | A four-item publish gate: completed Verification · an all-in price · published Rules · a published Commitment. The editor must show exactly these four |
| Two classes of field | AD-20 | Verified fields (identity, business registration, portfolio images, Spaces with capacities and Stated Sizes) vs. declarations that publish immediately (price, Rules, Commitment, calendar, seasonal pricing). Visibly different classes |
| Verification standing | FR-70 | The Vendor can always see where they stand: what is missing, pending, succeeded, or **failed and why**. Failure is a state to act on, not a rejection |
| Calendar | FR-28, AD-11 | Availability in **Slots** — morning, afternoon, evening, night — per Space. Block without stating a reason. Whole-Slot **and** partial blocking (block one crew, keep selling the other) |
| Enquiries | FR-34, FR-35, FR-37 | One thread per Enquiry, arriving with the whole wedding. Outcome marks: contacted · site visit arranged · won · lost |
| Lead Dashboard | FR-55–57 | Views, Contact Reveals, Enquiries, **median** first-reply time, outcomes, cost per Enquiry, cost per won engagement, aggregate-only comparison behind a five-Vendor floor |
| Subscription | FR-52–54, AD-34 | Twelve-month prepaid term, bought by a deliberate act. No auto-renew toggle, no saved instrument, no mandate. GST invoice downloadable at any time |
| Portfolio | AD-20, FR-27 | Explicit reorder plus four states per image: published · held back (over allowance) · pending Verification · taken down. A takedown **leaves its gap** |

**Still undetermined:** the internal screen structure of Listings, Performance and You; whether the
invitation-card motif has any vendor-side counterpart (it is a Family object, and nothing here has
claimed one); and the density, column count and table treatment above 768px
(`DESIGN.md` Open Question 2).

### Guest pages

Two public pages plus two obligations, all token-addressed, all `noindex` via a **server response
header** (AD-30). No guest account is ever created.

| Page | Reached from | Contains |
|---|---|---|
| **Invitation / RSVP** | A WhatsApp message **from the Family's own number** | Couple names, the date, the venue, the Functions and their times · the reply control · one quiet growth line at the foot · one discreet line of Vivah Spot attribution in the page frame |
| **Guest form** | A link the Creator shares in the family group | Who they are, how many are coming, a number to reach them on |
| **See-and-correct** | Any surface | Personal-data access for anyone, including people who never held an account. Two-step: returns nothing until a mobile number is entered and proved by one-time code (AD-32) |
| **Grievance intake** | **Every surface**, without a login (AD-33, FR-63) | The named grievance officer, and a reference the complainant can quote |

A Guest sees **their own invitation and their own answer and nothing else** — not the guest list, not
who else replied, not the budget, not the Vendors, not anything else of the Wedding.

**The invitation leads; the reply sits directly under it.** The card motif carries onto the one
surface strangers ever see — Vasant kaka lands on Omkar and Snehal's invitation, then answers.

This is the slowest of the shapes considered to reach a first tap, and UJ-5's climax is a reply in
about fifteen seconds. The composition therefore has to earn that back:

| Rule | Why |
|---|---|
| **The reply control is visible without scrolling on a 360×640 viewport** | The card leads, but "leads" cannot mean "buries". If the invitation cannot be both beautiful and compact at that size, the invitation shrinks — never the reply |
| **The card is finished, not filling** | The Family app's invitation fills in as the wedding gets sorted. A Guest's copy is the completed one. No progress bar, no "3 of 5", nothing that implies the Guest has anything to complete |
| **Three answers, each a full-width target, each labelled in words** | Yes · No · Not sure. Never colour-coded alone (`Accessibility Floor`), never a single toggle, never a dark-pattern default. Nothing is preselected |
| **The answer is changeable, and says so** | He replies in fifteen seconds; he may correct it later from the same link. The page states this plainly rather than warning him to be certain |
| **Confirmation is on the same page, in place** | No redirect, no success screen, no account offer. The control becomes his recorded answer with the date it was recorded |
| **One quiet growth line at the foot** | The only invitation to the product on the page, and it stays below the answer. It never precedes the reply and is never a modal |
| **No app shell** | No tab bar, no nav, no avatar, no login affordance. Nothing that implies an account exists or is wanted (NFR 5.8) |

**The link preview is the design surface that matters most**, because it is what he actually sees
first — in WhatsApp, before any page loads — and FR-12 makes it platform-controlled. It carries the
couple's names and the date, and it is the platform's principal public impression.
`[ASSUMPTION]` its image is a rendering of the same invitation card; nothing in the sources says so.

> **STILL OPEN:** the exact wording of the growth line, and the guest form's own composition
> (this decision covers the invitation/RSVP page only).

### Real Weddings

**Both: a public, indexed page and an in-app inspiration surface.** After a Wedding is **concluded**
— its last Function passed (`prd.md:476`) — the Creator may publish it. Published weddings live at a
public URL anyone can open, and appear inside the app as inspiration.

This is the **only surface in the product that is deliberately indexed.** The guest pages are
`noindex` by server header (AD-30) because they are private things reached by a token. A Real Wedding
is the opposite: a stranger searching for a lawn in Shrirampur can land on a real one, see the venue
and the caterer, and follow them into the product. After the invitation link, it is the second growth
channel the platform has.

| Published | Never published |
|---|---|
| Photographs the Family uploads | The guest list, or any Guest **named, tagged or identified** (FR-66) |
| The Vendors **engaged** — only those with an Agreement for that Wedding (FR-65) | A Vendor the Family did not engage. The Agreement record is what authorises the credit, and it cannot be omitted to credit someone else |
| The Functions held | Enquiry threads, Quotes, Shortlists, or the Vendors she considered and did not choose |
| An **approximate cost, as a band** (FR-66) | An exact figure, or another party's confidential number |

| Rule | |
|---|---|
| **Consent is explicit, separate, and withdrawable at any time** | FR-66. Its own act, not bundled into any other agreement. The consent screen names exactly what becomes public and that it is publicly indexed — a person consenting to "share my wedding" is not thereby consenting to appear in a search result |
| **Withdrawal removes what was derived from it** | Not just the page: the Vendor evidence built on it goes too (FR-66). One act, reachable from the Wedding, no negotiation and no retention offer |
| **A named Vendor can decline the credit** | Their name comes off; the wedding stays up (FR-66). The control lives in the Vendor portal, on the Listing that gained the evidence |
| **No interaction between Families, anywhere on it** | FR-67 forbids following, public boards and Family-to-Family interaction. So a Real Wedding page carries no likes, no comments, no follow, no saves-count, no "families who liked this". It is a page, not a feed |
| **Publishing is never a condition of anything** | FR-65. Not of a tier, a benefit, a discount or a prompt that implies obligation |
| **Boards are the private counterpart and stay private** | FR-67 — a Family's saved images and Listings are visible only to the Wedding and its Invited Members. A Board is never a draft Real Wedding and never becomes public by publishing one |

`[ASSUMPTION]` The Family confirms it holds the right to publish the photographs it uploads. FR-66
protects Guests from being *named*, but nothing in the sources addresses their appearing in an
image.

#### Reels — short video of her own wedding

**NEW SCOPE.** Video appears **nowhere** in the PRD — not once — so this is an addition, not an
interpretation. Scope §11 puts anything unlisted out of scope, which makes this a PRD change owed
alongside the others. It is recorded here because it was decided here.

**Format: vertical, full-screen, swipeable — YouTube Shorts.** Uploaded by the Creator, of her own
concluded Wedding, published under the same FR-66 consent that governs the rest of the Real Wedding.
Nothing else can be uploaded, by anyone.

| Rule | Why |
|---|---|
| **The ordering is disclosed, never opaque** | `research-india-regulatory.md:207` — Vivah Spot is an intermediary for third-party content but **not** for its own editorial curation, and safe harbour does not cover what it selects. A feed is a selection. So the ordering inherits FR-20's discipline: the parameters are published in plain language, reachable from the feed itself, nobody can pay for position, and near-equals are shuffled on a session seed so no clip owns the top |
| **No likes, no comments, no follows, no counts** `[ASSUMPTION]` | FR-67 forbids following, public boards and Family-to-Family interaction. The Shorts *format* is borrowed; the engagement mechanics are not. Reversing this is a product decision with regulatory weight, not a UI preference — see below |
| **Poster frame first. No autoplay on cellular** | NFR 5.3 — mid-range Android on patchy mobile data, where data is a household cost. Autoplay spends her money without asking. Wi-Fi autoplay is a setting she can turn off; cellular autoplay is off and stays off |
| **Every clip names the Space and the Vendors, and they are tappable** | This is the entire reason the feature earns its cost: a clip that cannot be traced to a Listing is entertainment, not discovery |
| **Only Vendors with an Agreement can be credited** | FR-65 applies unchanged. A clip cannot credit a Vendor the Family did not engage |
| **Guests are never named or tagged** | FR-66 applies unchanged — and video makes Open Question 6 sharper, not softer: a photograph catches a few faces, a clip catches a room |
| **Withdrawal removes the clips with everything else** | FR-66. Consent is one act covering the whole published wedding; there is no separate video consent to forget to revoke |
| **Takedown moves the object out of the public path** | AD-29 — promotion and demotion **move** the object rather than flipping a flag, with CDN invalidation inside AD-33's SLA. `is_publicly_visible()` is written for images and must be extended to cover a video, its poster frame and its transcodes as one unit, or a takedown will clear the clip and leave its thumbnail served |

**Costs this adds, stated plainly:** transcoding, multiple renditions, poster-frame extraction, far
higher storage and egress than images, and moderation that is materially harder — a reviewer can
scan a photograph in a second and must watch a clip. All of it lands on a platform whose only payer
is the Vendor.

`[ASSUMPTION]` A length cap exists and is short. Nothing in the sources sets one; without it,
"reels" becomes video hosting.


### Admin

**Frappe Desk is not a client.** There is no custom Admin console to design (AD-2, Capability Map
4.13). Admin has every capability with no role tiers; the control is attribution, not restriction.
The only UX obligations that reach a designed surface are the consequences Admin actions have on the
other three: the removal notice a Family receives (FR-60), the "your Listing needs one more thing"
prompt a Vendor receives after a configuration change (AD-8), and the four-routes-out notification
(FR-53).

---

## Voice and Tone

Microcopy. Brand voice and aesthetic posture live in `DESIGN.md.Brand & Style`.

The screen celebrates; the sentence stays calm. **Loud colour, quiet claims.** The tagline is
*"Big day, sorted."* — a task-completed promise, deliberately chosen over a lifelong-companion one.
The register the ideation corpus actually supports is **relief, not delight**: almost every promise
in the source material is a negation — no surprise charges, no shortage, the photographer you picked
is the one who shows up. Design copy against public-humiliation-in-front-of-your-relatives fear, not
against inconvenience.

| Do | Don't |
|---|---|
| "Shubhmangal Lawns **shows available** across all three days." | "Available." Availability is always attributed to the Vendor and never asserted by the platform (FR-13, FR-19, FR-29, NFR 5.6) |
| "**not yet estimated**" | `₹0`, a blank, or a dash. **Zero reads as free** (FR-8) |
| "**no reviews yet**" | A zero rating, an empty star row, or a borrowed average (FR-19) |
| "We recorded what you both agreed." | "Your booking is protected." "Guaranteed." "Legally binding." "Enforced by Vivah Spot." (NFR 5.6, FR-41) |
| "**Unanswered** — no reply in 30 days." | "This vendor ignored you." Nothing is held against the Vendor for it (FR-35) |
| "2 cancellations in the last 24 months." A number, on both profiles, either side. | Any fault language, any accusation, any inference (FR-17, FR-42, AD-13) |
| "You have 4 Enquiries for the 27th — still free?" Once, at most, per seven days. | A campaign. This is a prompt to the person paying you (FR-29) |
| "Terms returned — **declined by conflict**. Another engagement took the Slot first." | Silent expiry (FR-39, AD-11) |
| "**Paid placement**" on the Featured band, with a non-colour indicator | Mixing paid placement into the organic order, or marking it by colour alone (FR-20, NFR 5.8) |
| Haldi, Mehndi, Sangeet, Vidaai, muhurat, Chaturmas, baraat, aaher — used plainly, in Latin script | Translating them into generic wedding-industry English. Cultural specificity is a feature, not a localisation problem (NFR 5.10) |
| Short, complete sentences that state what is true | Exclamation marks, streaks, badge counts as encouragement, "Let's get planning!" |

### Vocabulary discipline

Two lists bind every string on every surface, and both are enforceable by a pre-commit sweep
(AD-24).

**Banned outright (§7.9), including in a toast, an empty state, a push, an aria-label, a filename or
a variable a designer names in a mock:** *book · booking · booked · Book Now · My Bookings · cart ·
checkout · legally binding · guaranteed · enforced by Vivah Spot · v1 · MVP · Phase N*.

This has one non-obvious consequence. The architecture describes the Vendor's Subscription payment as
"one-time checkout per term" (AD-34). That is architecture vocabulary. **The button may not say
Checkout.** It says *Pay for the term* or *Renew*.

**Binding vocabulary (§3 Glossary, AD-24), used verbatim, with no synonym anywhere:** Family ·
Creator · Invited Member · Vendor · Admin · Guest · Wedding · Function · Workspace · Board · Place ·
Anchor Date · Candidate Block · Chosen Block · Slot · Span · Service · Engagement Model · Sizing
Attribute · Order Basis · Stated Size · Listing · Space · Commitment · Rules · Preferred Vendor ·
Verification · Shortlist · Selection · Enquiry · Quote · Site Visit · Contact Reveal · Amendment ·
Agreement · Engage · Delivery · Review · Real Wedding · Subscription · Tier · Grace Period · Lead
Dashboard.

**Functions are ceremonies; Services are what is hired for them, and the same word must never name
both.** The Function is `Mehndi`; the Service is `Mehndi Artist`. The Function is `Sangeet`; the
Service is `DJ` or `Choreographer`. A screen that lets these collide is broken even if it renders.

Spelling: **Enquiry**, British, everywhere. Never *Inquiry*, never *Lead* in Family-facing copy —
"Lead Dashboard" is the Vendor's own screen name and the only place the word appears.

Mechanism record names — `Block Change`, `Cancellation`, `Vendor Block`, `Cascade Outbox`, `Wedding
Budget`, `Rule Acceptance`, `Rule Conflict`, `Listing Condition Change`, `Vendor Removal`, `Wedding
State Change` — are architecture. **They never appear in copy a Family or Vendor reads** (AD-24).

Error copy is product copy. A `frappe.throw` message is translated and a traceback's text never
reaches a caller (AD Conventions §Errors). No technical detail on any surface.

---

## Component Patterns

Behavioral. Visual specs live in `DESIGN.md.Components`.

### Span continuation — the highest-risk pattern in this document

A **Span Service** is engaged for a continuous period running from the start of the first Function it
serves to the end of the last, **including the nights between them** (§3, FR-14). Dattatray's lawn
across the Haldi and the Wedding is **one Selection**, contributing **once** (prd.md:244, prd.md:414,
FR-8, AD-19). Counting it per Function posts ₹7,20,000 for a ₹2,40,000 lawn.

The chosen Workspace is organised **By Function**, so the venue necessarily appears under every day
it serves. The UI must therefore make its single-ness visible, and
`.working/direction-workspace-4.html` Structure C **does not** — it repeats the venue under Haldi and
Wedding with no device tying them together and would mislead anyone building from it.

Required behaviour:

- The Span's rows across consecutive Functions are joined by a **continuation rail** — a single
  vertical connector running down the left edge of every Function card the Span touches, unbroken
  across the gap between cards. **[ASSUMPTION]** a rail rather than a bracket; the memlog names
  either as acceptable and does not choose.
- The **price renders once**, on the Function where the Span begins, in
  `{typography.price}`.
- Every later Function the Span serves shows the same Vendor with the word **"continuing"** in
  `{typography.meta}` `{colors.muted}` where the price would be, and **no figure of any kind** — not
  a repeat, not a share, not a zero.
- The connector is a **shape**, not a colour: it must read with colour removed, because
  `{colors.hairline}` is 1.23:1 and may never carry meaning. Pair it with the word.
- Tapping any row of the Span — the first or a continuing one — opens **the same single Selection**.
  There is no per-Function copy of it to edit.
- Removing the Selection removes the whole Span at once, and says so by name before it happens:
  *"This removes Shubhmangal Lawns from the Haldi and the Wedding."*
- A separate hall for the Reception is **a second Span and a second Selection** (§3), and gets its own
  rail and its own price. Two rails on one screen is correct, not a bug.
- The running total in the Workspace header counts the Span once. Clients do not compute this; the
  server sends it (AD-19).

### The other patterns

| Component | Use | Behavioral rules |
|---|---|---|
| **Invitation card strip** | Pinned at the top of Home | One line per settled fact in `{colors.ink}`; one line per open fact in `{colors.muted}` **at full strength** reading *"caterer not chosen"* — never faded, which breaks the contrast lock. A gold rule draws under each fact **once, as it settles**. Foil sweeps once when the last fact lands. Progress is a bar **plus its `3 OF 5` label**, always — the fill on the track is 1.36:1 and cannot carry state alone. Tap = enter the Workspace. First run is the same card, empty, `— & —`, `0 OF 5`: a card waiting, not an onboarding prompt |
| **Function card** | Workspace | Day, Slot, stated guest count, then one row per Service serving it. Three row states, each carrying a glyph **and** a word: settled (Selection or Agreement, with its figure) · in progress ("3 shortlisted") · nothing yet ("not yet estimated"). Tap a Service row → that Service's Shortlist or results |
| **Vendor card** | Results, Featured band, rails, Shortlist | Whole card opens the Listing. Footer: price left, **Enquire** right. A verified Vendor carries a glyph **and** the word. Photo never blocks the content around it — the placeholder gradient holds the space and the text renders first (NFR 5.3) |
| **Availability signal** | Vendor card, Listing, Compare | Three states, never two. See *Availability, Blocks and the Three States* |
| **Featured band** | Top of Service results | A **separate, marked band**, never interleaved with organic results. Labelled *Paid placement* in words, with a non-colour indicator. Founding Vendors at ₹0 are an active Subscription and get **no second-class treatment** anywhere (AD-35) |
| **Ordering disclosure** | Reachable **from the results themselves** (FR-20, FR-64) | Plain language, no jargon: ordered by availability for your dates, then rating adjusted for how many reviews it rests on, then reply speed, then how recently the vendor was verified — and vendors of similar standing appear in a varying order, so nobody holds the top place permanently. States that vendors cannot pay for a position and that paid placements are separate and labelled. **[ASSUMPTION]** a link under the results list opening a plain sheet; the FR fixes the content and reachability, not the form |
| **Rules panel** | Listing detail, on the Listing itself — never a sub-page | `restrict_service` rows and `informational` rows render as **one list** the Family reads once (AD-36). Rules attach to the **Space** where the Service has Spaces — a lawn and an AC hall can carry different Rules |
| **Rule-conflict prompt** | Before engaging a Space or Listing (FR-32) | Names **every** Shortlist entry and every Agreement this Vendor's Rules would make impermissible, **by name**. The Family cannot proceed without accepting the consequence explicitly. **Nothing is ever removed silently.** Where the Preferred-Vendor set has narrowed since acceptance, the system **re-prompts rather than removing anything unnamed** |
| **Shortlist** | Per Service, per Wedding | Adding costs nothing, commits to nothing, notifies nobody and **moves no money**. Availability shows per Listing while a Service is still at Shortlist stage |
| **Compare tray** | Auto-present wherever Vendor cards show, once 2 are picked | 2–3 slots. Disabled label states what is needed. Compares on the **Service's own configured attributes** (data-driven, AD-8) plus each Listing's availability against **each** Candidate Block, so the collision is visible here too. Nothing compares a caterer to a photographer. **[ASSUMPTION]** the tray shape is salvaged from `compare.html`; FR-21 requires the capability, not this container |
| **Collision view** | From the Workspace header, and wherever a Block is in question | Shows **which Selection blocks which Candidate Block, by name**. Blocks are **never ranked or scored** by partial availability and the platform never recommends one. The Family swaps Listings and **the view updates as she does**. No per-Listing badge may hide a conflict |
| **Enquiry thread** | Both sides, same messages, same order | Immutable — neither party can alter or delete what was said. The Vendor's Quote, the Site Visit offer, the proposed terms, the declined-by-conflict return: all thread events. **The thread of record lives here.** WhatsApp carries a notification and a link into it and is never the conversation surface |
| **Agreement record** | Read-only from the moment both confirm | No edit path anywhere. The only forward action is **Propose an Amendment**, which appends and never cancels. Download returns **the same stored bytes every time** — no regenerate, no template choice. A certificate surface exists (FR-43) |
| **Guest household row** | Guest list | The unit is a **household**, not a person: *"The Deshmukhs — four"* is one entry, one invitation, one reply. Attached per Function, RSVP state per Function |
| **Pasted list import** | Guest list | **One line, one household. Nothing is parsed.** The line becomes the household's name exactly as pasted — Devanagari included, set in `{typography.title-card-devanagari}` — and the count is left **unstated** for the Creator to fill. Blank lines are skipped; that is whitespace, not parsing. No de-duplication, no merging, no count inferred from digits, brackets, words or Devanagari numerals. Two identical lines become two households and she merges them if she wants |
| **Suggestion queue** | Guest list, and Listings suggested by Invited Members | Everything arrives as a **suggestion the Creator accepts or dismisses** — never written straight in. A dismissed guest-form submission is erased at once |
| **Portfolio image** | Vendor portal | Four states, each labelled in words: published · held back (over allowance) · pending Verification · taken down. Vendor's own order, defaulting to upload order. A takedown **leaves its gap** rather than promoting an unchosen image. A pending image never consumes a paid slot |
| **Vendor calendar Slot** | Vendor portal | Four Slots per day — morning, afternoon, evening, night — the same four for every Service. A morning Haldi does not consume an evening Reception. Whole-Slot and partial blocking both expressible. A confirmed Agreement blocks its Slots **automatically**; the Vendor does nothing |
| **"not yet estimated"** | Anywhere a price would go and there is none | The literal words, `{colors.muted}`, in the exact slot the price would occupy. Never `₹0`, never blank, never a dash |
| **Grievance entry point** | Every surface, without a login | Returns a **reference the complainant can quote**. Acknowledged on receipt |

---

## State Patterns

| State | Surface | Treatment |
|---|---|---|
| **First run, no Wedding** | Home | The invitation card, empty: `— & —`, `0 OF 5`, one open line reading *"date not set"*. The shop below it works fully — she can browse before creating anything. No modal, no tour, no "complete your profile" |
| **Browsing with no Anchor Date** | Results, Listing | Listings show **no availability signal at all** — *not* greyed, *not* "unavailable" (FR-13, AD-10). One quiet line explains what would make it appear. The signal appears everywhere the moment the first Anchor Date exists |
| **No-duration Service** | Results, Listing | Presented **without any availability claim**, permanently. The only signal is whether the Vendor is currently accepting Enquiries |
| **No clean Block** | Collision view | The collision is shown explicitly, by name, and she swaps until one clears. Never ranked, never scored, never resolved for her, never hidden behind a per-Listing badge |
| **Empty Shortlist** | Shortlist tab | Names the Service and routes to its results. No count of what she is missing, no urgency |
| **Nothing to compare** | Compare | States the minimum plainly. Routes back to results |
| **No reviews** | Listing | *"no reviews yet"* — plain words. Never a zero, never an empty star row, never a borrowed average. An unrated Listing is shown alongside rated ones in a rating-filtered list, **marked as unrated**, unless she explicitly asks to see only rated ones |
| **Fewer than five Vendors in the Service and Place** | Vendor Lead Dashboard | No comparison is shown at all. Say why; the Vendor's own figures still show |
| **Enquiry unanswered at 30 days** | Family, in the thread and the Workspace | Marked **unanswered**, so she stops waiting. Neutral. **Nothing is held against the Vendor**, nothing changes in his ranking, and the Family is never shown his outcome marks |
| **Vendor's stale calendar** | Vendor portal + WhatsApp | Triggered by **three or more** Enquiries touching the same period; **at most one per Vendor per seven days**. A question, never a block: the Enquiry still goes through, availability is never changed by the platform, and silence is not treated as unavailability |
| **Verification pending / failed** | Vendor portal | Always visible: what is missing, that it is pending, that it succeeded, or **that it failed and why**. Failure is actionable — correct and resubmit. A new photo is held back while the rest of the Listing stays live and keeps receiving Enquiries |
| **Listing leaves discovery** | Family, all four routes | Lapse past Grace, Vendor withdrawal, Admin removal, a condition ceasing to hold — **one notification design covers all four** and they behave identically. The Family is told; where it was her **Selection, the Selection is cleared and its contribution withdrawn from the running budget**. Nothing is removed silently. Re-entry restores discoverability and notifies nobody |
| **Vendor removed by Admin** | Family holding an Agreement | The one route that adds a step: she is told the **Vendor was removed** — not that a listing is gone — and asked to find another Vendor for that Service. The platform does not cancel her Agreement; if she ends it, **that cancellation is not counted against her** |
| **Lost the Slot race** | Family, in the thread | Terms return as **declined by conflict**, never a silent expiry. Her Shortlist, Selections and Agreements are **exactly as they were** — nothing cascades until an engagement actually completes |
| **Invited Member** | Every Family surface | A visible, **non-punitive** read-only state. They see the dashboard, Functions, budget, guest list, Shortlists and Enquiry statuses; the Creator-only actions are absent or plainly marked, never present-and-failing. Their route forward is **Suggest**, which reaches the Creator to accept or dismiss |
| **Offline / lost signal** | Everywhere in the Family app and the Vendor portal | Work in progress survives (FR-7, NFR 5.3). **No explicit save action exists anywhere in the Workspace** — every entry is preserved as it is made. Every state-changing action is safely retryable: an interrupted Agreement confirmation retried is a no-op, never a double-confirm (AD-31). Shown as a persistent inline band in `{colors.danger}`, not a toast — a toast that fades leaves someone acting on stale data. It states what is still usable: *"No connection. Showing what was loaded."* |
| **Image URL expiry** | Vendor portal, pending media | Signed URLs are short-lived. Re-fetch; never render a broken image |
| **Session** | Family app, Vendor portal | Ninety days of **inactivity**, refreshed on use. Never a "your session expires on ⟨date⟩" message. Returning entry is device biometric or screen lock |
| **Wedding concluded** | Workspace | Stays readable by Creator and Invited Members. Public links the Wedding issued are dead |
| **Wedding about to be abandoned** | Workspace, and the account | Inactive and Agreement-less: she is asked whether to keep it, **and told before the thirty days start** that not answering ends it |
| **Failure** | Everywhere | `{colors.danger}` `#8C2F1A` carries it — the one token in the system that means *something went wrong*, kept separate from vermillion because a red that means **action** cannot also mean danger. Rendered as `{components.banner-failure}`: a glyph, a sentence naming what happened, a sentence naming what happens next, and a retry. **Never colour alone** — the palette now holds two warm reds, and an eye that cannot separate them must still read the difference. Copy is product language: *"Your quote didn't send. It's saved — we'll send it the moment you're back."* Never the word **error**, never blame, never leaving someone unsure whether their work survived (NFR 5.5) |
| **Destructive confirmation** | Everywhere | The only other use of `{colors.danger}`. Removing a Service that carries an Agreement, discarding a Candidate Block, taking a Listing down. Names the consequence and what is lost; the confirming action is the one that costs something, never the default |

---

## Interaction Primitives

**Touch first, on a mid-range Android on patchy mobile data.**

- **Tap to act.** Long-press is reserved for system text selection.
- **The card is the target.** A Vendor card opens its Listing from anywhere on it; secondary actions
  (Shortlist, Compare) are their own controls inside it with their own 44pt/48dp targets.
- **Pull-to-refresh only where a refresh means something**, and never on Service results:
  the tie-break order is seeded once when she opens a Service and held for that browsing session
  (AD-22). Re-seeding is a **re-shuffle** and must be a deliberate new search, not an accidental
  gesture. Pagination reuses the session's seed.
- **The compare tray is persistent, not modal** — it follows her across results, rails and Shortlists.
- **No date input in a filter, anywhere, on any surface.** She never types a date into a filter.
  Availability is a pre-applied property of the whole Block. The only date entry in the product is
  supplying Anchor Dates and stating a Function's day; both are Wedding-shaping acts, not filters.
- **No clock time in date-picking, matching, Block selection, the Vendor calendar or an Agreement.**
  Wedding time is a date plus one of four Slots (AD-9). A Function carries **one optional display
  time, for the invitation only** — it never travels to a Vendor and matching never reads it.
- **Micro-animation throughout, transform and opacity only.** The rule drawing under a settled fact,
  the foil sweep on completion, a medallion lifting under a thumb, a Function card opening. Every one
  has a `prefers-reduced-motion` path that leaves the meaning intact — and **no animation is ever the
  only carrier of a state**.
- **Optimistic UI is banned on anything that costs money or commits.** Shortlisting may be
  optimistic. Confirming an Agreement, obtaining a Contact Reveal, sending an Enquiry and paying for
  a term may not — they wait for the server and say so.
- **Banned everywhere:** a date filter · infinite scroll that re-seeds order · countdown timers ·
  urgency copy ("3 people are viewing this") · pre-ticked consent · a cancel flow harder than the
  start flow · hover-only affordances · badge counts used as encouragement · streaks · any
  celebratory animation on a cancellation, a removal or a review.

---

## Availability, Blocks and the Three States

The capability that makes the product worth opening, and the one a builder is most likely to
reduce to a boolean.

**Three states, never two** (AD-10, FR-13):

| State | When | Rendering |
|---|---|---|
| **Shows available** | An Anchor Date exists and the Vendor's calendar clears every day and Slot the Block needs | *"shows available"*, attributed, with a glyph **and** the word |
| **Shows taken** | An Anchor Date exists and the calendar does not clear | Attributed the same way — *"vendor shows the evening of 27 Nov taken"* — never "unavailable" as a platform fact |
| **No signal** | No Anchor Date yet, **or** a no-duration Service, **or** a Listing without an active Subscription | **Nothing.** Not greyed, not "unknown" styled as a failure, not a disabled control. A distinct third state, visually neutral |

Five Engagement Models ask five different availability questions, and the UI shapes differ: **Span**
(whole closure including overnights) · **per Function** · **rental period** (a date range) ·
**lead time** (a required-by date) · **no duration** (excluded from matching entirely).

Where a Service has **Spaces**, availability is per Space and a Listing shows available if **any**
Space is. The UI must let her see **which** Space.

**Candidate Blocks.** She states the shape of the wedding once — Haldi the morning before, the
Wedding that evening, the Reception the following evening, each with its own guest count — and the
platform shifts that same shape onto each Anchor Date. Up to **five** Anchor Dates, so up to five
Blocks. A Block is **whole-or-nothing**. She may adjust one Block without disturbing the others.
Nothing about the arrangement is ever inferred.

**Collisions are shown, never resolved.** By name. Not ranked, not scored, not recommended. The
platform shows the collision; the Family resolves it, and the view updates as she does.

**Locking** fixes each Function's day and Slot, makes every later Enquiry carry the Chosen Block, and
stops the discarded Candidate Blocks applying to browsing. **Changing the Chosen Block afterwards
cancels every Agreement made against it** — say so before she does it, in those words, naming what
will be cancelled.

---

## Money and the Running Budget

Clients never do money arithmetic (AD-19). Money is rupees on every surface, formatted by the single
shared formatter, never paise. **No money moves between a Family and a Vendor, ever** — there is no
payment, cart, checkout, wallet, payout or refund surface anywhere on the Family side, and none is
deferred: it is the commercial model.

- **A Shortlist contributes nothing.** Only **Selections** and **confirmed Agreements** count.
- **A Selection contributes its all-in price once.** A **Span Selection contributes once for the
  whole Span**, however many Functions it covers.
- **Confirming an Agreement replaces the Selection's estimated figure with the agreed one**,
  automatically.
- **Per-head Services show the multiplication beside the total** — ₹420 × 600 — so she can see where
  the number came from.
- **An undecided Service reads "not yet estimated".** Never ₹0.
- **The running total is shown against the ceiling wherever she is browsing**, not only on a budget
  screen. It lives in the Workspace header and travels.
- **A Selection stores the price at the moment she picked it.** A Vendor raising his rate later does
  not re-price her plan, and the UI must not imply the figures are live.
- **Two distinct affordances, never collapsed into one.** An **adjustment** overrides a derived
  figure and stays corrected; an **addition** appends a cost the platform knows nothing about.
  Merging them into a single "add a line" control double-counts every correction.
- **She is never required to enter a figure for the platform's benefit.** The platform knows what was
  agreed, never what was paid; any record of actual payment is hers to volunteer and is never
  presented as authoritative.
- **A recommended quantity is suggested, never decided.** The platform may compute a headcount and
  **show what it was built from**; where a guest list exists, confirmed RSVPs refine it and she is
  told the figure will move as replies arrive. It is always visible, always adjustable, and **never
  travels to a Vendor until she has confirmed it**.

---

## Channels and Notification Routing

| Party | Channel | Rules |
|---|---|---|
| **Vendor** | **WhatsApp**, with **SMS fallback**, plus in-portal | The Enquiry summary and a link into the thread. Renewal reminders at 30 / 14 / 7 / 1 days — with no auto-renewal, **the reminder is the renewal mechanism**. The stale-calendar nudge, capped at one per seven days |
| **Family** | **Device push**, plus in the app | Enquiry replies, nudges and reminders reach **the owning account**, not the named couple. Push is what makes FR-20's reply-speed incentive mean anything: a Vendor who answers in four hours helps nobody if the Family learns of it three days later |
| **Guest** | **Never** | **Vivah Spot never sends a message to a Guest.** The platform composes the invitation and hands it to the Family to send from her own number — an invitation from Rutuja's number is opened and forwarded where the same message from a business number is ignored or reported. Guest contact details are used to compose that Wedding's invitations and for nothing else |

The Enquiry thread is the **thread of record**. WhatsApp carries a notification and a link; it is
never the conversation surface.

### Push to the Family

FR-35 says only "the Family in the app", which leaves a Vendor's four-hour reply sitting unread for
three days. Push closes that gap, and it is **scoped by design** — every push maps to something the
Family is already waiting for, and there is no other kind.

| Event | Why it earns an interruption |
|---|---|
| A Vendor replied in an Enquiry thread | The thing she is waiting for. Deep-links to that thread |
| A Quote arrived | The number she cannot plan without |
| An Agreement needs her confirmation | Nothing proceeds until she acts |
| A Vendor proposed an Amendment | A change to something already agreed |
| An Enquiry reached thirty days unanswered | So she stops waiting (FR-35). Never framed as the Vendor's fault |
| An accepted Rule now conflicts with a later choice | FR-32 — surfaced **before** it takes effect, never after |

**Nothing else, ever.** No re-engagement, no "vendors near you", no seasonal offers, no streaks, no
"you haven't opened the app in a week". NFR 5.5 bans dark patterns, and a notification that serves
the platform rather than the person is one.

| Rule | |
|---|---|
| **Permission is asked in context, never on first launch** | The ask comes when she sends her first Enquiry — the first moment a reply can arrive. Asking cold, before anything can happen, is how permission gets refused permanently |
| **Refusal is silent and permanent** | No second ask, no nag banner, no reduced functionality. The Enquiries tab count carries everything push would have |
| **Every push deep-links to the exact thing** | Never to the home screen. A Quote push opens that thread |
| **Quiet hours are respected** | A Vendor replying at 2am does not wake a Family. Held to morning |
| **Per-event control, not one switch** | She can silence Enquiry replies and keep Agreement confirmations. Off is always available and never penalised |
| **Push is never the record** | It is a pointer. The thread of record stays in the platform (FR-35). A push that never arrives loses nothing |

`[ASSUMPTION]` **The Family gets no WhatsApp.** The Vendor does; the Guest deliberately does not.
Sending to the Family too would work on any phone and survive an uninstall, but it costs per message
and puts the platform inside her personal WhatsApp — where FR-12's whole design is that invitations
come from *her own number*, not a business one. Push is free, revocable and already scoped; if push
is refused she falls back to the in-app count rather than to a paid channel. **This is a cost and
positioning call, not a UX one — overrule it if the economics say otherwise.**

---

## Bringing in a Guest List

A list can be built by hand, taken from her contacts, or **pasted from something she already has** —
a WhatsApp message, a note, last wedding's spreadsheet (FR-11). The paste is the one that needed
deciding, because real input looks like this:

```
Deshmukh kaka 4
Sunita mavshi - 3
Patil family (5)
Joshi 9822012345
अनिल काका ३
Mama's side — will confirm
Kulkarni 2 + maybe 2 more
```

**The importer reads none of it.** One line becomes one household, named exactly as pasted, count
unstated. It cannot misread *"Kulkarni 2 + maybe 2 more"* as four, and it cannot drop
*"Mama's side"* for having no number — because it never attempts either.

| Rule | Why |
|---|---|
| **Nothing is written until she confirms the table** | The paste produces an editable review table, not a list. Cancel leaves the Wedding untouched |
| **An unstated count reads "not stated"** | Never `0`, never blank, never a dash. Same discipline as `{components.price-unestimated}`: a zero would silently shrink a Function's headcount |
| **Importing never changes a Function's stated guest count** | FR-11 — the stated number is hers. RSVP counts and household totals sit *beside* it as better information arrives; the platform never revises it for her |
| **A number is required only to invite, never to count** | A household with no phone number still counts toward the list and still shows on a Function. It simply cannot be sent an invitation until she adds one |
| **The paste box says what it will do before she pastes** | *"Each line becomes one household. We won't try to read numbers out of it — you'll fill those in next."* An importer that surprises someone with six hundred households is worse than one that is slow |
| **She can paste again** | A second paste appends. It never replaces the list, and never reconciles against it |

`[ASSUMPTION]` **The review table may offer, per row, to lift a number out of the text** — *"this row
contains 9822012345 — use it as the phone number?"* — as an explicit per-row confirmation, never
automatic and never at import. That keeps "the importer reads nothing" intact while sparing her
retyping a number she already pasted. Strike this if it reads as the cleverness the decision rejected.

**The cost of this choice, stated plainly:** a line like `Joshi 9822012345` arrives as a household
*named* "Joshi 9822012345". Without the offer above, she edits every such row by hand. That is the
price of an importer that is never wrong.

---

## The Service Catalogue Is Configuration, Not Design

No source fixes a list of Services. FR-68 has the Family select *"Venue, Catering, Photography **and
whatever else this wedding requires**"*; FR-9 calls its Function set *"a starting set, and Families
name their own"*; AD-8 makes per-Service fields and filter sets configuration. **Nothing in this
document may hardcode a Service list, and neither may the app.**

Two sources appear to disagree about *Invitations* and *Pandit / Priest*. Neither is authoritative:

| Source | What it is |
|---|---|
| `CHANGELOG 0.3.0` — removed both from the grid | A change to the **published placeholder site**, whose IA this run superseded |
| The brainstorming session — both mapped back in | Predates the no-money model. Its own legend reads *"we manage, guarantee quality, take margin"* and *"books via us, we take a cut"* — the abandoned commission model, in banned vocabulary |

**Invitations is already resolved** at `prd.md:466`: a Vendor may sell invitation-card design as a
Service, and the Workspace's own digital invite and RSVP is a separate capability. *"These compose
rather than collide — a Vendor designs the card, the Workspace composes and tracks it."*

**Pandit / Priest is a catalogue decision, not a design one.** Whether it launches is a business
call about supply and verification. If it does, nothing here changes: it is a per-Function Service
like any other. Note only that the auspicious-date service it would sit beside is deferred at §7.7.

| Rule | |
|---|---|
| **The category grid renders the configured catalogue for the Place** | Not a fixed six. A Place opening with four Services shows four; one with eleven shows eleven |
| **Overflow is "See all", never a truncated grid** | The medallions are a shortcut into the catalogue, not the catalogue itself. What is shown first is configuration, not a design constant |
| **`[ASSUMPTION]` the grid shows at most six before "See all"** | Six is what the prototype used and what fits a 430px column at `{components.category-medallion}`'s 60px. Nothing in the sources sets a number |
| **A Service name is never invented in the UI** | It comes from configuration and must match the Glossary's usage. A Function and a Service never share a word — *Mehndi* is a Function, *Mehndi Artist* is a Service |

> **Correction to this run's own artifacts.** `directions-4.html`, `color-themes-1.html` and
> `direction-workspace-4.html` all render six hardcoded medallions, copying the published site. They
> illustrate the *component*, never the catalogue. A builder must read the list from configuration.

---

## The Featured Band

Paid placement exists, is sold by Tier, and sits **outside** the organic ordering (FR-20). It is
never interleaved with organic results — a Family scrolling past the band is scrolling past all of
it, not through it.

**The heading is "Featured."** It matches the Tier name and what a Vendor believes they bought. On
its own it would **not** satisfy FR-20, which requires the band be *"identified to the Family as paid
placement"* — "Featured" signals *special*, not *paid*. So the heading never appears alone:

> **Featured**
> Vendors pay for placement here. It does not affect the results below.
> *How results are ordered →*

| Rule | Why |
|---|---|
| **The identifying line is not optional and not collapsible** | It is the part that satisfies FR-20. A band headed "Featured" with the line hidden behind a tooltip, an info icon or a scroll is an undisclosed paid ranking |
| **Three signals, none of them colour** | The bounded container, the heading, and a per-card `Featured` chip. NFR 5.8 — nothing essential by colour alone, and this is the most essential thing on the screen to get right |
| **Every card carries the chip, not just the band** | A card lifted out of context — screenshotted, shared, or reached by a deep link — still says what it is |
| **The disclosure is reachable from the results themselves** | FR-20 requires the organic parameters be published in plain language *"reachable from the results"*. The link sits in the band, where the question naturally arises |
| **Within the band, order is by Tier and nothing else** | Tiers differ in *"placement in the Featured band and portfolio allowance, and in nothing else"* (PRD §Tier). No secondary auction, no per-deal bidding |
| **A Featured Listing meets every condition of listing** | FR-20 — paying buys visibility, never an exemption. It is verified, priced, ruled and committed exactly like any other |
| **Availability still applies** | A Featured Listing that cannot serve her Candidate Blocks is not shown as though it can. Paying does not buy an exemption from the three availability states either |

`[ASSUMPTION]` The band sits **above** the organic results. FR-20 says it is kept out of the organic
ordering but never says where it goes. Above is what is being sold and what a Vendor expects; below
would be defensible and worth less.

**Risk recorded.** "Featured" is the euphemism FR-20 was written against, and
`research-india-regulatory.md` treats undisclosed paid ranking as live CCPA exposure. The heading is
Abhishek's decision; the identifying line beneath it is what carries the requirement. If that line is
ever softened, shortened or hidden, the disclosure fails and the heading alone will not save it.

---

## Reviews and the Record Each Side Holds

Two different things are written in the same blind window and **published to two different places**.
Confusing them is the most damaging mistake available on this surface.

| | Her review of him (FR-46) | His record of her (FR-47) |
|---|---|---|
| **Form** | One to five **whole stars** plus her own words | Three fixed questions, **no free text ever** |
| **The questions** | — | Was the Family responsive · did the agreed headcount hold · were the premises left as agreed. **These three and no others.** No question touches money |
| **Published where** | **On the Listing**, publicly. Per Listing, not per Vendor — a caterer who also does décor is rated separately in each | **Nowhere public.** Only to Vendors receiving an Enquiry from her, and to her under **You** |
| **Attribution** | She is shown as a verified party to a real Agreement | Attributed to the Vendor who recorded it |
| **The other side's recourse** | A **right of reply, published alongside** (FR-46) | Her **own account**, travelling beside his answers. There is no dispute process (§7.2, FR-41) |
| **Mutability** | Never edited, never reordered by sentiment, never selectively published. He cannot suppress it | Immutable in the same way |

**Both go live at the same instant.** FR-48 makes the window blind: neither sees the other's before
submitting, and both publish when both have submitted **or** when the fourteen days close — whichever
comes first. Nothing can be written on the fifteenth day, and a review publishes even if the other
side never wrote one.

### How she learns what a Vendor recorded

**She is told when it publishes, and it lives under You permanently.** Both, not either.

| | |
|---|---|
| **The notification** | Fires at the moment the window closes and both become visible. It names the event, never the verdict: *"Your reviews are published. Your review of Shubhmangal Lawns is live, and they have recorded their answers about the wedding."* It never says a Vendor rated her poorly, and it never previews an answer in the notification body — a lock screen is not private |
| **The permanent home** | An entry under **You**, always reachable, never dependent on having caught the notification. FR-47's *"the Family can see everything recorded about them"* is a standing promise, not a moment |
| **The absence of appeal is stated, not hidden** | *"There is no dispute process — we do not decide between you. You can record what happened in your own words, and Vendors see it beside their answers."* Saying it plainly is kinder than letting her hunt for a complaint button that does not exist |
| **An unfavourable answer is never rendered in `{colors.danger}`** | The platform does not judge these answers and cannot change them. Colouring "No" as a failure would be Vivah Spot taking a side, which §7.2 excludes. It is a word in `{colors.ink}` — no red, no icon, no emphasis |
| **Not surfaced in the Enquiry composer** | Showing her what a Vendor will see, every time she enquires, turns a disclosure into a standing warning about herself. The record is hers to consult, not a toll gate on contacting anyone |

---

## Roles and What Each May Do

| Role | May | May not |
|---|---|---|
| **Creator** | Everything on their own Wedding | — |
| **Invited Member** | View dashboard, Functions, budget, guest list, Shortlists, Enquiry statuses. **Suggest** a Listing or a Guest | Edit the Wedding or Functions · add or remove a Candidate Block · add to a Shortlist · send an Enquiry · obtain a Contact Reveal · confirm or cancel an Agreement · write a Review · change budget or guest list |
| **Vendor** | One login per account | No additional users, roles, invitations or permission tiers exist |
| **Admin** | Every capability | Alter a confirmed Agreement · edit or suppress a Review · erase an audit record |

Access to a Wedding is granted by the Creator **to a mobile number**. There is no other route in — no
discovery, no search, no request, and **no share-a-link** (document sharing is off site-wide,
AD-17). Revocation removes visibility immediately.

**One account may hold both Family and Vendor roles.** What it may do follows from **the role it is
acting as**, not from which client it signed in from — so the role context must be explicit in the
UI on both surfaces.

**Sign-in is a mobile number and a code.** There is **no password field on any surface**, no forgot-
password, no magic email link. The OTP is six digits, valid ten minutes, five attempts, three resends
per hour — the screen must express those limits. Passkey, Google and Apple **link to an existing
account on a verified matching number**; they are never a standalone signup path, and Apple is offered
wherever Google is on iOS. Losing the number is recovered **through Admin** — deliberately manual,
attributed, and the single most sensitive thing Admin does.

**A Contact Reveal is an audited act** — every read of a Guest or Vendor contact field is logged. The
UI should make that felt rather than hide it.

---

## Accessibility Floor

Behavioral. Visual contrast lives in `DESIGN.md`.

**WCAG 2.1 AA on all five surfaces** — the Family app, the Vendor portal, the admin panel, **and both
public Guest pages**. The two public pages are included deliberately: the RSVP page is seen by
hundreds of Guests per Wedding, and the guest form is the stronger case still, because many who reach
it were forwarded the link and **none of them chose to be there at all**.

- **Nothing essential is conveyed by colour alone.** Verified status, availability, paid placement,
  the active tab and the Span continuation rail each carry a glyph, a weight change or a word in
  addition to their colour. This is a hard constraint and it shapes every badge in the product.
- **TalkBack / VoiceOver:** every interactive element labelled with role **and state**. The
  availability signal announces attribution — *"Shubhmangal Lawns shows available"* — never a bare
  "available". The invitation card announces its progress as *"3 of 5 settled"*, not as a bar.
- **The continuation rail is announced, not drawn only.** A continuing row reads *"Shubhmangal Lawns,
  continuing from the Haldi"*. A screen reader user must be able to tell it is one Selection.
- **Dynamic type** honoured through `DESIGN.md` typography tokens; nothing truncates at the largest
  setting. Every container must tolerate **Devanagari and Latin in the same field** at every size —
  Vendor Rules, reviews, Listing descriptions, Function names the Family typed herself.
- **Reduce Motion:** skip the foil sweep and the rule draw; the settled state renders immediately and
  reads identically.
- **Tap targets ≥ 44pt (iOS) / 48dp (Android).** The Vendor portal holds the same floor — it is used
  on a phone at a function, one-handed.
- **Focus** is never removed and never signalled by a tint alone. Traversal follows reading order on
  every surface. Skip links on every long surface (the published site already does this well; carry
  it, and fix the four pages that lack one).
- **The guest pages carry the highest floor and the least chrome.** No account, no install, no
  sign-in, one decision, keyboard-operable, readable at 200% zoom, and reachable in about fifteen
  seconds from opening the message.
- **No dark patterns** (NFR 5.5). Nothing is pre-ticked. Consent is specific, separately given per
  purpose, and **withdrawable as easily as it was given**. Paid placement is labelled. Cancelling is
  as easy as starting.
- **Where erasure is refused or limited, the person is told which retention basis applies** — and
  everyone whose data is held can see it and correct it, **including people who never held an
  account**.

---

## Responsive & Platform

| Surface | Behaviour |
|---|---|
| **Family app — phone** | Single column, always. `{spacing.phone-column}` (430px) is the content maximum; a wider viewport centres the column rather than stretching it. Safe area is explicit, not inherited |
| **Family app — iOS vs Android** | Parity. iOS is not deferred. Platform conventions for back navigation, system gestures and dynamic type; everything else identical |
| **Vendor portal — phone** | **The priority case, not the ceiling.** Same 430px column, same components, same identity. The four destinations are a bottom tab bar; the lens switch is a full-width segmented control at the top of the column, and the rail's contents stack beneath the list. Dattatray reads an Enquiry standing at someone else's function |
| **Vendor portal — ≥768px** | The tab bar becomes a **persistent left rail** carrying the same four destinations plus the subscription's standing. The main column keeps the lens switch; the rail's contents move to a right column. The month grid is only fully legible here — six weeks, three states, two Spaces. **[ASSUMPTION]** the 768px breakpoint itself is carried from `DESIGN.md.Layout & Spacing`, which marks it an assumption too. Table treatment and density inside Listings and Performance remain open — see Open Questions |
| **Guest pages** | Fluid, single column, no app shell, no tab bar, no chrome that implies an account exists |
| **Admin** | Frappe Desk's own responsive behaviour. Not designed here |

There is **no dark mode** on any surface. The system is white-card-on-cream by construction and
cannot be inverted by swapping tokens.

---

## Inspiration & Anti-patterns

The published `vivahspot.com` is the richest anti-pattern source available, because it is a complete,
coherent, working expression of **the wrong product**. It is a browse-and-book commission marketplace;
this is a planning workspace where no money moves. Its visual identity was a placeholder so the domain
would not be empty. **Its IA is superseded. Its components are worth salvaging.**

**Salvaged — the component vocabulary, not the model:**

- **The vendor card.** Media block with overlays, body with badges, name, meta, and a foot row of
  price beside an action. The single most reused component on the site and the right anatomy — with
  the action relabelled from **View / Book Now** to **Enquire**.
- **The compare tray.** A persistent floating tray that follows you across surfaces, states what it
  needs while disabled, and opens a label-column comparison grid. FR-21 needs exactly this shape.
- **The empty-state anatomy.** Circular icon → heading → one sentence → one button, capped and
  centred. Consistent across five instances. Keep it; rewrite every string.
- **The skip link discipline.** Present on nine pages with surface-specific wording ("Skip to
  results", "Skip to form"). Keep it, and add it to the four pages that lack one.
- **Explicit safe-area padding** — `calc(9px + env(safe-area-inset-bottom))`, used three times in
  `styles.css`. Carried into `DESIGN.md.Components.tab-bar` verbatim.
- **The category medallion and the horizontal rail.** Both survive the home-is-the-shop decision
  intact.

**Rejected — and why each one is a trap rather than a style disagreement:**

- **"Book Now" — the site's primary CTA, on the sticky bar of its most important page.** *Book,
  booking, booked* are banned outright by §7.9 and gated by a pre-commit sweep (AD-24). The site
  carries them in a headline, a button, a page title, a nav item, a badge (*Most Booked*), a calendar
  state (*booked*), a data field and a localStorage key. The whole chain — Book Now → "Request a
  booking" → "Confirm booking" → "Booking requested ✓" → "My Bookings" — oscillates between a
  transaction and a request inside one interaction, and **every link of it is unusable**. Replaced by
  **Enquire → Quote → Agreement**.
- **"Reserve your slot instantly with secure payments."** Three violations in eight words: a
  reservation the platform cannot make, a Slot used to mean a calendar date, and a payment that will
  never exist. §7.1 is not a deferral.
- **The vendor payout / bank-details section** on the partner form. An artifact of an abandoned
  commission model. Nothing on any surface collects a payout instrument.
- **The date-picker calendar with available/booked cells.** The single most seductive wrong pattern
  in the source material, and it is fabricated to boot — the site marks ~20% of dates busy by hashing
  the vendor id. FR-13 replaces it entirely: no date filter, availability pre-applied from the whole
  Block, three states, attributed.
- **"Packages."** Retired vocabulary and an excluded capability — §7.3 removes vendor-authored
  multi-service packages and platform-assembled bundles alike. A Family assembles her own set.
- **Category browse as the organising idea of the catalog.** The site's six tiles are a browse
  taxonomy. Six medallions survive on the new home as a shortcut into a ~50-Service catalog, but the
  Service set for a Wedding is **chosen onto the Wedding**, not discovered by tile-tapping.
- **"Smart" ranking with a hidden formula**, and a planner that splits a budget by weights it does not
  show. FR-20 requires the ordering parameters be disclosed in plain language, reachable from the
  results; §7.6 forbids the platform deciding for her.
- **"🔥 Most Booked" / "⚡ Quick Response" badges computed from a hash.** Every trust signal in this
  product must be true or absent. *Verified* means a person drove out and looked.
- **One shared demo phone number behind every Vendor's WhatsApp and Call button.** Contact is an
  audited, counted, attributed act here (FR-36).
- **No auth gate, no role separation** — the vendor dashboard reachable from the family account hub,
  with a "Viewing as" dropdown listing every vendor. Role context is explicit in this product and the
  Wedding is reachable by membership only.
- **Toasts that all end in ✓ and two validation messages in the entire site.** Failure states are
  most of the work. This document's *State Patterns* section is longer than the site's entire error
  vocabulary, and that ratio is the point.
- **Streaks, urgency, countdowns, engagement mechanics.** Never present on the old site, and never to
  be added. The emotional register is relief, not delight.

**Lifted from outside the repo:** nothing. There is no "it should feel like X" anywhere in the source
corpus — no mood analogy, no brand comparison. The metaphor this product runs on is its own: **an
invitation card that fills itself in.**

---

## Key Flows

### Flow 1 — Rutuja finds the one arrangement her brother's whole wedding actually fits into (UJ-1)

Home in Shrirampur for her brother Omkar's wedding to Snehal. The guruji has given three possible
days. About ₹8 lakh. Around 600 guests. She is the one doing the running around, which today means
calling Vendors one at a time to ask what is free on the 22nd, then the 27th, then the 4th — and for
each, asking again about the day before for the Haldi and the day after for the Reception. Every time
one comes back unavailable she starts the whole sequence over.

1. New install. She signs in with her phone number and a six-digit code. No password exists.
2. **Home is the shop**, and it opens on an empty invitation card: `— & —`, *"date not set"*,
   `0 OF 5`. Below it, search, six medallions, Vendors near Shrirampur. She browses first, because
   nothing stops her: with no Anchor Date, Listings show **no availability signal at all**.
3. She creates the Wedding — Omkar and Snehal, Shrirampur, ~600 guests, ₹8L — and enters her three
   days. The auspicious-date option is offered here and is not built.
4. She lays out the shape of the wedding **once**: Haldi the morning before, the Wedding that
   evening, the Reception the following evening, each with its own guest count. The platform shifts
   that same shape onto each of her three days. Three Candidate Blocks, built once.
5. She selects the Services the Wedding needs: Venue, Catering, Photography, Décor & Mandap, Band
   Baaja Baraat. The invitation card starts filling in.
6. She works through each Service. Verified photos, all-in pricing, Rules on the Listing itself,
   reviews written by people who actually hired them. **Availability already reflects the whole
   Block** — the caterer has to be free across all three days, the decorator across two — and
   **she never types a date into a filter.**
7. She shortlists several per Service and compares them side by side. **Nothing she is merely
   comparing touches her budget.** As she settles on one in each Service, the running total builds
   against ₹8L on its own, in the Workspace header, visible while she browses.
8. **Climax.** The collision view shows her what she could not work out by phone: of her three
   Blocks, only the one anchored on the **27th** has her shortlisted venue, caterer *and*
   photographer free across every day and Slot it needs, and lands inside ₹8L. The other two are not
   scored, not ranked, not greyed into second place — they simply name which Selection blocks them.
   She swaps nothing. She locks the 27th onto the Wedding, and the gold rule draws under the date on
   the invitation card.
9. **Resolution.** The Workspace holds a real wedding: the Block fixed, three Functions each with a
   day and a Slot, five Shortlists, the budget tracked against ₹8L. Shubhmangal Lawns appears under
   both the Haldi and the Wedding, joined by a continuation rail, priced once, the second row reading
   **continuing**.

**Edge case — no clean Block.** The app shows the collision explicitly and lets her swap Vendors until
one clears. It does not rank Blocks by partial availability and it does not hide the conflict behind
per-Listing badges.

**Failure — she changes her mind about the Block after agreeing with someone.** Changing the Chosen
Block **cancels every Agreement made against it**. She is told that, in those words, naming what will
be cancelled, before she can proceed. The cancellations record on both profiles as neutral numbers.

### Flow 2 — Dattatray finds out what the platform is actually worth to him (UJ-2)

Runs Shubhmangal Lawns on the Ahmednagar road: an 800-capacity lawn and a 300-capacity AC hall.
Business today comes from a hoarding on the highway and from people who attended a function there last
season. He joined as a Founding Vendor at ₹0 after Vivah Spot staff visited, checked his registration
and photographed the property. Vendor portal open on his phone. One login.

1. He sets up his **two Spaces separately** — lawn and hall — each with its own capacity, Stated Size,
   all-in pricing, calendar and concurrent capacity. The portal asks in plain terms how many weddings
   he will run in one Slot.
2. He states his **Rules on the Listing**: no outside caterer, DJ stops at ten, no fireworks. He
   publishes all-in pricing and the no-hidden-charges declaration. The publish gate shows him four
   items and which are still open.
3. He opens his **calendar**: blocks what is already taken, marks which of the day's four Slots each
   Space is free in, and sets lower pricing for the Chaturmas months when nothing moves. He blocks two
   Slots without stating a reason, because he does not have to.
4. He adds his **preferred caterer and decorator**. Neither association publishes until they accept.
5. **WhatsApp buzzes.** An Enquiry, already carrying the whole wedding — 27 November, 600 guests, ₹8L,
   Haldi and Wedding and Reception. He has to ask her nothing. He taps the link into the thread.
6. He replies **in the thread** with a Quote for the lawn and offers a Site Visit that Sunday. The
   Site Visit reserves nothing and blocks no Slot.
7. He marks the Enquiry as it moves — contacted, site visit, won. **Rutuja never sees any of those
   marks**, and they never touch his position in results. His reply speed is a different thing, and
   that does.
8. **Climax.** At the end of the season his Lead Dashboard reads **34 Enquiries · 6 site visits ·
   2 weddings won · ₹0 paid**. Median first-reply time, not mean — one bad fortnight does not define
   him. Cost per Enquiry: ₹0, and the figures still accumulate. He compares against aggregates for
   venues in his Place, no Vendor named. Nothing is curated: the flat weeks show as flat weeks,
   because a dashboard that only looks good stops being believed. **He decides whether to pay again
   with the real numbers in front of him.**

**Edge case — the stale calendar.** Three Enquiries land touching the 27th and his calendar has not
moved in weeks. The platform **nudges**, on WhatsApp and in the portal: *"You have 4 Enquiries for the
27th — still free?"* At most one such nudge in seven days. It does not block the Enquiry, does not
auto-expire his availability, and does not penalise him for ignoring it. **Silence is not treated as
unavailability.**

**Failure — he loses a Slot race.** Another Family confirms first. He is told **which engagement
conflicts**; the other Family's proposed terms return to their thread as **declined by conflict**,
never silently expired.

### Flow 3 — Rutuja and Dattatray put it in writing (UJ-3)

1. Dattatray sends the agreed terms into the thread: the days and Slots, the Space, the guest count,
   the all-in price, what is included, the delivery timeline from his Commitment, and the Rules that
   apply. **Every value in it is his.** The platform pre-fills nothing, suggests nothing, authors no
   standard form.
2. Rutuja reads the terms — and before she can confirm, she is shown **by name** every Shortlist entry
   his Rules would make impermissible. Her outside caterer is on that list. She accepts the
   consequence explicitly, or she does not proceed. **Nothing is removed silently.**
3. She confirms in-app. Dattatray confirms. **The Agreement does not exist until both have.**
4. **Climax.** Vivah Spot timestamps it and does nothing else. The record freezes verbatim; both sides
   can download the same bytes at any time, in 2026 and in 2034. In her Workspace the venue row moves
   from selected to **committed** and the agreed figure replaces her estimate in the running total. On
   his calendar the Slots block **automatically** — he touches nothing. No surface anywhere calls it
   binding, guaranteed, or enforced by Vivah Spot. It says: *we recorded what you both agreed.*
5. Money settles directly between them, off the platform, exactly as before.
6. After Delivery, the review window opens for fourteen days. **Neither writes into the other's
   shadow** — neither can see the other's review before submitting. She rates one to five whole stars
   with free text, published on the Listing, shown as written by a verified party to a real Agreement.
   He answers three fixed questions — responsiveness, whether the headcount held, whether the premises
   were left as agreed — and nothing else, with **no free text about a named Family anywhere**. It
   reaches other Vendors receiving an Enquiry from her, and her. It is never published.

**Edge case — it falls apart after signing.** Nobody adjudicates. The Agreement is a record, not a
lever. Neither side reviews. The cancellation is recorded as a plain fact on both profiles: a neutral
number over a rolling twenty-four months, no fault attributed or inferred.

### Flow 4 — Vasant kaka replies in fifteen seconds (UJ-5)

Omkar's father's cousin, in Pune. **Not a user of Vivah Spot, has never heard of it, and has no
intention of installing anything.** He is also, as it happens, marrying his own daughter off next
spring.

1. A WhatsApp message arrives **from Rutuja's own number** — because the platform never messages a
   Guest — carrying the invitation and a link. It is from family, so he reads it rather than ignoring
   it.
2. He taps. The link preview — image, title, description — was composed by the platform, and this is
   the platform's **principal public surface**: for most people who ever see Vivah Spot, this is the
   whole product.
3. He lands on a page Vivah Spot hosts. Omkar and Snehal, the 27th, the lawn on the Ahmednagar road,
   the three Functions and their times. No account. No install. No sign-in. No cookie wall.
4. He says yes — four of them travelling.
5. **He sees nothing else.** Not the guest list. Not who else has replied. Not the budget. Not the
   Vendors. Not anything about the Wedding beyond his own invitation and his own answer. At the foot,
   one quiet line for someone planning a wedding of their own, and one discreet line of attribution in
   the page frame — never inside the invitation artwork, never on a physical card, never removable and
   never sold, because a Family pays nothing for anything.
6. **Climax.** In Rutuja's Workspace the confirmed count moves — **beside her stated number, never
   over it.** The count is hers, not the platform's.

**Edge case — the forwarded link.** His link is individual and cannot be altered to reach anyone
else's. A relative who was never invited has a different route: the guest form, whose submissions
arrive as **suggestions Rutuja accepts or dismisses**. A dismissed submission is erased at once, and a
submitter never sees the guest list or anything else.

### Flow 5 — Kiran verifies a lawn and takes a fraud off the platform (UJ-4)

Field verification around Shrirampur. She works from a phone in the field and a laptop at the office.
**Every Admin user can do everything; what constrains her is that every action carries her name.** Her
surface is Frappe Desk — there is no console designed here — but three of her actions land on surfaces
that are.

1. She checks Dattatray's identity and business registration against his documents, walks the lawn and
   the AC hall, photographs both herself, and **compares his uploaded portfolio against what she is
   standing in**. She records the Verification against her own name, with the date and what she
   checked it on.
2. **On Dattatray's side** the standing display flips: his Listing becomes publicly visible, because
   Verification has completed, every condition of listing is satisfied, and his Founding Vendor
   Subscription is active. He never had to guess where he stood.
3. Later he uploads four new photographs. **The new images are held back until Verification has
   covered them** — while the rest of the Listing stays live and keeps receiving Enquiries. His
   portfolio manager labels them *pending*, in words.
4. A complaint arrives about a decorator with a lifted portfolio.
5. **Climax.** She removes him. The removal carries her name, the ground and the date, and cannot be
   erased. **On the Family side** this is the one route out of discovery that adds a step: every
   Family holding an Agreement with him is told **that the Vendor was removed** — not merely that a
   listing is gone — and asked to find another decorator. The platform does not cancel their
   Agreements. A Family who ends hers is **not counted for it**; she did nothing.
6. **Resolution.** His Reviews stay published. Removal does not erase a record.

Removal grounds are narrow and closed: fraud, falsified Verification, stolen or misrepresented
portfolio, impersonation. **Never service quality** — that is answered by Reviews alone. There is no
complaint pipeline, no standing score and no automated delisting.

---

## Open Questions

1. **Inside the vendor portal's other three destinations.** The landing surface, its two lenses and
   the four-destination bar are decided. Listings, Performance and You are not: screen count,
   editing model and desktop density remain open, as does whether the invitation-card motif has any
   vendor-side counterpart.
2. **The growth line's wording, the guest form's composition, and the link preview's image.** The
   invitation/RSVP page's composition is decided; these three are not. The preview image is tagged
   `[ASSUMPTION]` as a rendering of the invitation card.
3. **Empty states.** Failure and offline are decided — `{colors.danger}` `#8C2F1A`, fenced to
   failure and destructive confirmation only, rendered in `.working/direction-failure-3.html`.
   What a genuinely *empty* surface looks like is not: a Service with nothing shortlisted, a
   first-run Shortlists tab, a Vendor's first week with no Enquiries. The PRD names only two empty
   states, and an empty screen is the worst first impression a paid tool can give.
4. **Whether the Family also gets WhatsApp.** Push is decided and scoped to six events. Whether
   WhatsApp backs it up when push is refused or the app is uninstalled is a cost and positioning
   call, tagged `[ASSUMPTION]` as *no* in Channels and Notification Routing.
5. **Whether browsing requires sign-in.** The first-run shape is decided — look around first, the
   blank invitation card invites her in, three acts require a Wedding. What is tagged
   `[ASSUMPTION]` and needs confirming is that browsing works *signed out*, which deviates from
   UJ-1's stated entry state of "new install, signed in with phone and OTP".
6. **Guests appearing in published photographs.** The Real Weddings surface is decided — public and
   indexed, plus in-app. FR-66 stops Guests being named or tagged, but nothing in the sources
   addresses a Guest's face in an uploaded image, or what a Guest who objects can do. Tagged
   `[ASSUMPTION]` that the Family confirms it holds the right to publish.
7. **Where the Family writes her own account, and how long it can be.** How she *learns* of the
   record is decided, as is where it lives. FR-47 gives her "their own account of the engagement" as
   her only recourse but never says whether it is per-answer or per-Vendor, whether it has a length,
   or whether a Vendor can respond to it — which, if they could, would reopen the dispute §7.2
   excludes.
8. **Whether the review table may offer to lift a phone number out of a pasted line.** The import
   rule is decided — one line, one household, nothing parsed. The per-row offer is tagged
   `[ASSUMPTION]`; without it she retypes every number she already pasted, with it the importer is
   slightly cleverer than the decision intended.
9. **Two PRD edits this document forces and does not make.** FR-10 (Workspace-first) and FR-68 (never
   browses category by category) are overridden by the home-is-the-shop decision. `DESIGN.md` OQ 5
   carries a third, NFR 5.10. All three are logged as required PRD changes, unmade.
10. **Whether the Featured band sits above or below the organic results.** The band's marking is
    decided — heading, mandatory identifying line, per-card chip, bounded container, no reliance on
    colour. FR-20 keeps the band out of the organic ordering but never says where it goes; `above`
    is tagged `[ASSUMPTION]`.
11. **Whether Pandit / Priest is in the launch catalogue.** Not a design question — the Service
    catalogue is AD-8 configuration and nothing here hardcodes it. It is a business call about supply
    and verification, and it changes nothing in this document either way. Invitations is already
    resolved at `prd.md:466`.
