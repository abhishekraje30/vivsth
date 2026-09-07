---
name: Vivah Spot
description: Information architecture, behavior, states and journeys for the Vivah Spot family app, vendor portal and public guest pages.
status: draft
updated: 2026-09-07
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
> shipped FRs; both overrides are recorded in full below, and **both have since been carried into the
> PRD** (commit `76399ff`, 2026-09-07), each as a dated note quoting the consequence it replaced.

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
`i18next` from day one (`ARCHITECTURE-SPINE.md` **Consistency Conventions** §i18n), as insurance, at one locale.

The Devanagari face was chosen by setting the same content twice: `.working/type-devanagari-pairing.html`
and `.working/type-devanagari-pairing-2.html` are the specimens the comparison in
`DESIGN.md.Typography` rests on. **`type-devanagari-pairing.html` requires a network connection**
to load its webfonts, unlike every other artifact in `.working/`, which renders offline
(`.memlog.md:35`).

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
> **Both FRs have since been amended in the PRD** (commit `76399ff`, 2026-09-07): each carries a
> dated note quoting the consequence it replaced. The architecture spine still assumes
> Workspace-first. What survives of FR-68 unchanged: the Family still **selects Services onto the
> Wedding**, at Wedding level or per Function, and can add or remove one at any time — browsing does
> not create the Service set. What survives of FR-10 unchanged: everything it lists still sits in
> **one view**; only its position in the navigation moved.
>
> **This was resolved by looking, not by arguing** (`.memlog.md:20`):
> `.working/direction-home-screen.html` is the artifact the decision was made against. Read it as a
> **structural** reference only — it carries a provisional placeholder skin, not the Kumkum palette,
> and its six medallions are hardcoded where the real grid renders the configured catalogue.

| Surface | Reached from | Purpose |
|---|---|---|
| **Home** | App open (cold), Home tab | Invitation card strip · search · six category medallions · featured Vendors band · organic Vendors near the Wedding's Place |
| **Workspace — By Function** | Tap the invitation card · Wedding tab | The wedding organised by **Haldi / Wedding / Reception**, opening with **Across the wedding** (the Spans, priced once) and then the Functions in date order. Each Function opens to show which Services serve it and what is still missing. Running total in the header |
| **Function detail** | Tap a Function in the Workspace | One ceremony: its day, Slot, stated guest count, and every Service serving **it alone**, with its state. Spans appear once, in *Across the wedding*, above the Functions — never echoed down here |
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
| **Real Weddings** | A rail on Home · a Listing credited on one · the public URL from outside the app · Workspace, once the Wedding is concluded | Concluded weddings a Creator published: photographs, the Functions held, the Vendors engaged, a cost band, and the Reels. Read-only inspiration — no likes, comments, follows or counts (FR-67). **[ASSUMPTION]** the rail's position on Home is not fixed by any source; placement is open |
| **Reels** | Inside a Real Wedding · the Real Weddings rail | Vertical, full-screen, swipeable clips of a concluded Wedding. Poster frame first, no autoplay on cellular. Every clip names its Space and its credited Vendors and they are tappable into their Listings |
| **You** | You tab | Account, the Wedding switcher, Invited Members, the structured record Vendors hold about her (FR-47), grievance, disclosures |

**Composition reference.** `.working/directions-4.html` renders the four directions considered and
**Direction 1, the Invitation, was chosen** (`.memlog.md:26`) — it is what `DESIGN.md` specifies.
`.working/direction-home-screen.html` is the composed Home and `.working/direction-workspace-4.html`
the composed Workspace; `.working/color-themes-1.html` is where the Kumkum palette was picked
(theme T3, `.memlog.md:29`). All four are **structural** references — three of them carry a
provisional placeholder skin rather than the chosen palette, and all of them hardcode six
medallions, which the catalogue rule below forbids.

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

**Composition reference.** The two-lens decision was made by looking at three studies:
`.working/direction-vendor-4.html` (the phone portal), `.working/direction-vendor-desktop.html`
(the same portal above 768px, where the rail replaces the tab bar) and
`.working/direction-vendor-switch.html` — the only rendering of the lens switch itself, including
the `Inbox · 3` count and the switch's container boundary (`.memlog.md:54`, `:56`, `:58`). They are
structural references: their calendar marks predate the count-not-texture decision and are being
brought into line separately.

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
| Listing completeness | FR-59, FR-71, AD-27 | A publish gate of **four general items plus whatever this Service requires**. The four: completed Verification · an all-in price · published Rules · a published Commitment. **FR-71 adds per-Service conditions on top of these**, configured with the Service — so the editor shows a gate whose length depends on what is being listed, never a fixed four |
| Two classes of field | AD-20 | Verified fields (identity, business registration, portfolio images, Spaces with capacities and Stated Sizes) vs. declarations that publish immediately (price, Rules, Commitment, calendar, seasonal pricing). Visibly different classes |
| Verification standing | FR-70 | The Vendor can always see where they stand: what is missing, pending, succeeded, or **failed and why**. Failure is a state to act on, not a rejection |
| Calendar | FR-28, AD-11 | Availability in **Slots** — morning, afternoon, evening, night — per Space. Block without stating a reason. Whole-Slot **and** partial blocking (block one crew, keep selling the other) |
| Enquiries | FR-34, FR-35, FR-37 | One thread per Enquiry, arriving with the whole wedding. Outcome marks: contacted · site visit arranged · won · lost |
| Calendar health — **seeing where the year is empty** | FR-31 | Homed in **Performance**, not in the Calendar lens: it is a read on the season, not an act on a date, and the Calendar lens is where he answers today's Enquiries. He sees which Slots are empty and which are **drawing no interest**, and can price those periods differently (FR-30). **His own view only** — never shown to a Family, and empty availability is never marketed as distressed |
| Lead Dashboard | FR-55–57 | Views, Contact Reveals, Enquiries, **median** first-reply time, outcomes, cost per Enquiry, cost per won engagement, aggregate-only comparison behind a five-Vendor floor |
| Subscription | FR-52–54, AD-34 | Twelve-month prepaid term, bought by a deliberate act. No auto-renew toggle, no saved instrument, no mandate. GST invoice downloadable at any time |
| Portfolio | AD-20, FR-27 | Explicit reorder plus four states per image: published · held back (over allowance) · pending Verification · taken down. A takedown **leaves its gap** |

**What each Service must additionally carry (FR-71).** These are conditions of listing, not
features — a Listing without them is not really offering the Service. They are configured with the
Service, so adding a Service means deciding what it must carry. Five are named in the sources:

| Service | The capability | Where it surfaces |
|---|---|---|
| **Catering** | A **headcount recommendation** that shows what it was built from. Where only a stated number exists, that is the basis; where a guest list exists, confirmed RSVPs refine it and **the Family is told the figure will move as replies arrive**. They adjust or accept, and only then does it travel with an Enquiry | Family: the Enquiry composer for a Catering Listing. Vendor: the received Enquiry carries the accepted figure and its basis |
| **Photography** | **The named person who will actually shoot** — not only the studio. Where that person changes, **the Family is told before the wedding, not after** | Vendor: a required field on the Listing. Family: on the Listing and in the Agreement. A change fires the same notification class as an Amendment |
| **Décor & Mandap** | **Sizing against the real space.** Where the Family has engaged a Space, its **Stated Size** and the Vendor's Rules are available to Décor Vendors quoting for it | Vendor: carried into the Enquiry automatically, never re-asked. This is the venue-awareness the product has claimed from the beginning |
| **Band Baaja Baraat** | **A published declaration that no additional payment will be sought during the event.** It is a Commitment like any other — published, quotable back to them, and reviewable | Vendor: part of the publish gate for this Service. Family: on the Listing beside the Rules |
| **Venue** | **Seeing it before taking it** — a site visit or a virtual tour requestable **from the Listing itself**, not only from an Enquiry thread | Family: an action on the Listing detail surface |

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
| **At default text size the reply control is visible without scrolling on a 360×640 viewport** | The card leads, but "leads" cannot mean "buries". If the invitation cannot be both beautiful and compact at that size, the invitation shrinks — never the reply. **Measured, not asserted:** the card is 325px and the reply ends at 542 of 640 in `.working/guest-rsvp.html`. **The rule is scoped to default text size on purpose.** At 200% zoom — which SC 1.4.4 requires the page support — the card alone is 702px and the reply sits at 1099px. Scrolling there is correct, not a failure; what must hold at every zoom is that nothing overflows horizontally. **The measurement predates the count control** and still holds, because the control is revealed only after the answer and so cannot push the answer down; `.working/guest-rsvp.html` argues at its own `:150–154` that no such control exists, which was true when it was drawn and is not now. Re-measure once the control is drawn there |
| **The card is finished, not filling** | The Family app's invitation fills in as the wedding gets sorted. A Guest's copy is the completed one. No progress bar, no "3 of 5", nothing that implies the Guest has anything to complete |
| **The count is asked only after Yes** | Tapping *Yes* reveals `{components.stepper-count}` beneath the answers, **pre-filled with the household figure the Creator already recorded** — Vasant kaka is one of four travelling, and Rutuja already wrote four. He adjusts it or leaves it. This costs one extra tap only when her number was already right, so UJ-5's fifteen-second reply survives; without it her confirmed count moves by one when four people are coming, and she cannot see that it is wrong. *No* and *Not sure* reveal nothing — nobody is asked how many of them are not coming. **The fold rule above is measured in the unanswered state**, and the count may sit below the fold: by the time it exists the Guest has already acted, and the reveal scrolls it into view and announces it |
| **Three answers, each a full-width target, each labelled in words** | Yes · No · Not sure, each one `{components.button-choice}` — equal peers at its 48px floor, none filled, none primary, none preselected, none distinguished from its siblings by anything but its label. Never colour-coded alone (`Accessibility Floor`), never a single toggle, never a dark-pattern default. **These three are the only equal peers in the product today**; every other button in the system is a primary action, so a second use of `button-choice` anywhere is a prompt to check whether the choices really are peers |
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

**NEW SCOPE, since carried into the PRD.** Video appeared **nowhere** in the PRD when this was
decided — not once — so it was an addition rather than an interpretation, and Scope §11 put anything
unlisted out of scope. It has since been written into FR-65 (`prd.md:1231`, commit `22167c6`),
including the disclosed-ordering rule below. The Scope Document's §11 has **not** been revisited.

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

**The cost is accepted, not hidden:** transcoding, renditions, poster frames, storage, egress and
moderation a reviewer must watch rather than glance at — on a platform whose only payer is the
Vendor. The reasoning is in `.memlog.md:73`; it is not re-argued here.

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

This has one non-obvious consequence, and it has already been acted on upstream. AD-34
(`ARCHITECTURE-SPINE.md:409`) now reads *"the integration takes a single payment per term"*, with a
dated note recording that it previously used a banned word and that PRD §7.9 bans it across every
downstream document. **No button in this product carries that word.** It says *Pay for the term* or
*Renew*.

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
reaches a caller (`ARCHITECTURE-SPINE.md` **Consistency Conventions** §Errors). No technical detail on any surface.

---

## Component Patterns

Behavioral. Visual specs live in `DESIGN.md.Components`.

### Spans — the highest-risk pattern

A **Span Service** is engaged for a continuous period running from the start of the first Function it
serves to the end of the last, **including the nights between them** (§3, FR-14). Dattatray's lawn
across the Haldi and the Wedding is **one Selection**, contributing **once** (prd.md:244, prd.md:414,
FR-8, AD-19). Counting it per Function posts ₹7,20,000 for a ₹2,40,000 lawn.

**A Span never appears under a Function.** It appears once, as its own object, in a section named
**"Across the wedding"** sitting **above** the Functions in the Workspace. Each Function card below
then carries only the Services that serve that Function alone. There is nothing to join, because
there is nothing repeated.

Required behaviour:

- The Workspace opens with **Across the wedding**, then the Functions in date order. A Wedding with
  no Span Services shows no such section at all — it is not an empty state, it is absent.
- A Span renders as `{components.span-card}`: the Vendor, the price **once**, and **the days it
  covers listed inside it** as chips — *26 Nov · Haldi*, *27 Nov · Wedding*.
- A separate hall for the Reception is **a second Span and a second Selection** (§3). Two cards in
  the section is correct, not a bug.
- Tapping the card opens **the one Selection**. There is no per-Function copy to edit.
- Removing it names what goes, before it goes: *"This removes Shubhmangal Lawns from the Haldi and
  the Wedding."*
- The running total counts it once. Clients do not compute this; the server sends it (AD-19).

> **The cost of this shape, accepted deliberately.** A Function card is no longer complete on its
> own — someone reading only the Haldi card sees no venue. The mitigation is position, not repetition:
> *Across the wedding* sits directly above and is always in view when a Function is. **Do not
> "helpfully" echo a Span into its Functions.** The echo is the bug this shape exists to remove.

**Where this was decided.** `.working/critical-four.html` §1 draws the three shapes considered for a
Span. **Option B — one card with its days inside — won** (`.memlog.md:100`); option A, a joining
rail between Function cards, and option C, an italic line, were both rejected. The rail is not a
deferred idea, it is a discarded one.

### Every other component, and what it must do

Forty rows, plus the Span pattern above. Each row states its **states**, what it does **on
interaction**, and what it **must never do**. Where a rule is visual — a colour, a size, a border —
it is stated once in `DESIGN.md.Components` and referenced here by token, **never restated**. Where a
row carries no token, no visual entry exists for it and none is needed: it is a behaviour, not an
object with an appearance of its own.

**A note on focus, which applies to every row.** Every component listed here is either a target or
contains one, and every target carries the focus treatment specified in *State Patterns → Focus*.
No row repeats it.

#### Structure and navigation

| Component | Use | Behavioural rules |
|---|---|---|
| **Invitation card strip** — `{components.invitation-card}` | Pinned at the top of Home. The Guest's copy on the invitation page is the same object, finished | One line per settled fact in `{colors.ink}`; one line per open fact in `{colors.muted}` **at full strength** reading *"caterer not chosen"* — never faded, which breaks the contrast lock. A gold rule draws under each fact **once, as it settles**. Foil sweeps once when the last fact lands. Progress is a bar **plus its `3 OF 5` label**, always — the fill on the track is 1.36:1 and cannot carry state alone. **States:** first run (`— & —`, `0 OF 5`, one open line — a card waiting, not an onboarding prompt) · partial · complete · cold load (a `{components.skeleton}` of the same footprint, so nothing resizes when the facts arrive). **Interaction:** the whole card is one target and enters the Workspace; it carries no second control. **Never:** a percentage, a red, a "finish setting up" interstitial, a dismiss control, a foil sweep replayed for effect, or a progress element of any kind on the Guest's copy — a Guest has nothing to complete |
| **Tab bar** — `{components.tab-bar}` | Every Family surface; the Vendor portal below 768px | Five destinations on the Family app, four on the Vendor portal, in a fixed order that never reorders by usage. **States:** rest · active · pressed · a count on Enquiries (Family) and on Inbox (Vendor). The active destination carries **three signals** — its indicator rule, weight 600, and its label — and `DESIGN.md` owns which three. **Interaction:** tapping the active tab returns that stack to its root; it never re-fetches or re-seeds. **Never:** a hidden or auto-hiding bar, a sixth Family destination, a badge used as encouragement rather than as a count of things actually waiting, or a count that includes anything the person has already seen |
| **Left rail** — `{components.nav-rail}` | Vendor portal ≥768px, replacing the tab bar | The same four destinations plus the Subscription's standing — term end, and in Grace, the days left. **States:** rest · active · Grace · lapsed. It is persistent and never collapses to icons only: the labels are what make the portal legible to someone using it twice a month. **Never:** a different destination set from the phone's tab bar. One information architecture, two presentations |
| **Lens switch** — `{components.lens-switch}` | Top of the Vendor's Enquiries column, both form factors | A segmented control over **one** set of Enquiries — Calendar or Inbox. **States:** Calendar selected (the default, always, `.memlog.md:61`) · Inbox selected · Inbox carrying its waiting count `Inbox · 3` · a date selected in either lens. **Interaction:** switching **carries the selection across** — pick 27 November in Calendar, switch to Inbox, and the list is filtered to that date with a clearable chip saying so. Lens and date are URL state, `?view=calendar&date=2026-11-27`, so a nudge notification deep-links to the exact date and the back button behaves. **The count is live and never suppressed by the current lens.** **Never:** two screens with a toggle between them, a lens that loses the selection, a count that disappears while Calendar is showing, or a remembered "last lens" that defeats the Calendar-first decision |
| **Category medallion** — `{components.category-medallion}` | Home, the catalogue shortcut | Renders **the configured catalogue for the Place** — not a fixed six. **States:** rest · pressed (a lift under the thumb, transform only) · overflow, which is a *See all* into the rest of the catalogue and never a truncated grid. **Interaction:** opens Service results scoped to that Service. **Never:** a hardcoded Service list, an invented Service name, or a Service name that collides with a Function name |
| **Search field** — `{components.search-field}` | Home, and inside Service results | **What it searches over is scoped by where it is.** On Home it searches Listings and Vendor names across the configured catalogue for the Place and offers the Service itself as a result, so *"caterer"* lands on Catering rather than on nothing. Inside Service results it is **scoped to that Service** and says so in its placeholder; leaving that scope is an explicit act, never a silent widening (FR-18). **States:** empty · typing · submitted · zero matches (see *State Patterns*) · cold load · offline, where the last result set stays on screen with the offline band above it. **Interaction:** submit runs the search; there is **no live search-as-you-type**, because a request per keystroke on a two-bar connection is worse than a deliberate submit. Location may be detected, and detection is offered rather than assumed (FR-18). **Never:** a date input of any kind (there is no date filter anywhere in this product), a search over the guest list, or a search that reaches another Family's Wedding |
| **Filter chip** — `{components.chip}` | Service results, the compare surface, the Inbox's date filter | Filters cover **this Service's own configured attributes** — price within the Service, its Sizing Attribute, rating, verified status (FR-18, AD-8). **States:** unselected · selected (a leading glyph **and** the fill change, never the fill alone) · disabled with the reason stated · clearable, where the chip carries its own remove target at the tap-target floor. **Interaction:** selecting re-queries and **does not re-seed the result order** — the tie-break seed is fixed for the browsing session (AD-22). **Never:** a rating filter that silently drops unrated Listings (FR-18 — they are shown, marked as unrated, unless she asks to see only rated ones), a filter whose effect is invisible in the result count, or the per-Service price filter presented as the wedding budget |
| **Compare tray** | Auto-present wherever Vendor cards show, once 2 are picked | 2–3 slots. **States:** absent (nothing picked) · one picked, disabled, stating what is still needed · 2–3 picked, active · full, where a fourth pick asks which to drop rather than dropping one. Compares on the **Service's own configured attributes** (AD-8) plus each Listing's availability against **each** Candidate Block, so the collision is visible here too. **Interaction:** it is **persistent, not modal**, and follows her across results, rails and Shortlists. **Never:** comparing a caterer to a photographer, and never a ranking or a winner — it lays two things side by side and stops. **[ASSUMPTION]** the tray shape is salvaged from `compare.html`, a **repo-root** file rather than a `.working/` one; FR-21 requires the capability, not this container |
| **Skip link** | Every long surface, on all five | First focusable element, visible on focus, surface-specific wording — *"Skip to results"*, *"Skip to form"*. **Interaction:** moves focus, not just scroll position. **Never:** a skip link that is announced but never reachable, or a surface long enough to need one and lacking one. The published site does this well on nine pages; carry it, and add it to the four that lack one |

#### Controls

| Component | Use | Behavioural rules |
|---|---|---|
| **Primary button** — `{components.button-primary}` | The one consequential action in a view | Labels are fixed: **Enquire**, **Send**, **Shortlist**, **Compare**, and **Save**, which belongs **only to Boards** (FR-67). **States:** rest · pressed · disabled with the reason stated beside it, never a bare grey · pending, where the label becomes a progress state and the target stays put. **Interaction:** actions that cost money or commit — confirming an Agreement, obtaining a Contact Reveal, sending an Enquiry, paying for a term — **wait for the server and say so**; they are never optimistic. **Never:** two primary buttons competing in one view, a `{colors.danger}` fill beside a `{colors.vermillion}` fill as sibling actions, or any label from the retired transaction vocabulary |
| **Celebration button** — `{components.button-celebration}` | The one or two genuinely celebratory moments | Reserved, deliberately scarce: locking the Block, publishing a Real Wedding. **Interaction:** identical to the primary button in every behaviour; only its weight in the page differs. **Never:** used for a routine action, and never for a destructive or a failure path — turmeric is the colour of the thing being celebrated, never the colour of a warning |
| **Equal-peer button** — `{components.button-choice}` | A set of choices with **no primary among them** — today, only the Guest RSVP's Yes · No · Not sure | **States:** rest · pressed · chosen, which becomes the recorded answer in place with the date it was recorded. **Interaction:** full-width targets at the component's 48px floor, labelled in words, in a fixed order; the answer is changeable from the same link and the page says so. **Never:** preselected, filled, colour-coded alone, ordered to lead the eye to one answer, or turned into a single toggle. A second use anywhere in the product is a prompt to check whether those choices really are peers |
| **Count stepper** — `{components.stepper-count}` | The Guest's headcount, revealed after *Yes*. The only numeric control in the product | **States:** absent (before *Yes*, and after *No* or *Not sure*) · revealed and pre-filled with the household figure the Creator already recorded · edited · at its minimum of 1, where the decrement is disabled with the reason stated rather than silently inert · submission failure, which keeps the adjusted figure. **Interaction:** revealed on *Yes*, scrolled into view and announced; the centre value is keyboard-editable, not stepper-only; there is no platform maximum. **Never:** revealed before an answer, defaulted to zero or blank, cleared by a failed submission, or shown to someone who answered *No* — nobody is asked how many of them are not coming |

#### Objects on a surface

| Component | Use | Behavioural rules |
|---|---|---|
| **Function card** — `{components.function-card}` | Workspace, below *Across the wedding* | Day, Slot, stated guest count, then one row per Service serving **this Function alone**. **Three row states, each carrying a glyph *and* a word:** settled (a Selection or an Agreement, with its figure) · in progress (*"3 shortlisted"*) · nothing yet (`{components.price-unestimated}`). **States of the card itself:** complete · partly filled · no Services yet (an empty state, not a blank card) · cold load. **Interaction:** tapping a Service row opens that Service's Shortlist, or its results if nothing is shortlisted. **Never — and this is the rule the whole Span shape exists to protect — a Span is not echoed into a Function card.** A Function card is deliberately incomplete on its own; the mitigation is that *Across the wedding* sits directly above it and is always in view |
| **Span card** — `{components.span-card}` | The *Across the wedding* section, above the Functions | See *Spans* above for the full pattern. In summary: one card, one price, the days it covers listed **inside** it as chips. **States:** settled · agreed · being removed, which names what goes before it goes. **Interaction:** the card opens **the one Selection**; there is no per-Function copy to edit. **Never:** repeated under a Function, counted more than once in the running total, or joined to anything by a rail |
| **Vendor card** — `{components.vendor-card}` | Results, Featured band, rails, Shortlist | Whole card opens the Listing; secondary actions (Shortlist, Compare) are their own controls inside it with their own targets. Footer: price left, **Enquire** right. A verified Vendor carries a glyph **and** the word. **States:** rest · pressed · shortlisted · in the compare tray · Featured, which additionally carries `{components.badge-paid}` · cold load as a `{components.skeleton}` of the same footprint. **Interaction:** the photo never blocks the content around it — the placeholder gradient holds the space and the text renders first (NFR 5.3). **Never:** a computed trust badge, a "most popular" mark, an urgency line, or a price the Family did not see attributed to the Vendor |
| **Availability signal** — `{components.availability-ring}` | Vendor cards, list rows, Compare | **Three states, never two**, and the ring alone carries them: the treatment is specified once in `{components.availability-ring}` and is not restated here. The icon is the second signal and the word the third, and all three survive greyscale. **Copy on a card:** *Shows available* · *Shows unavailable* · *Not stated*. **On a list row it opens up:** *Shows available across all three days* · *Shows unavailable on 27 November* · *Hasn't set dates yet*. Never *available* unqualified — the platform does not assert on a Vendor's behalf (AD-10). **The third state is not a refusal** and is never styled as one: it fires when there are no Anchor Dates yet, the Service has no duration, or the Subscription has lapsed. **Where a Service has Spaces the signal is per Space**, and the UI must let her see **which** Space. **Never:** reduced to a boolean, greyed as though it were a disabled control, or shown at all before an Anchor Date exists. Drawn in `.working/availability-signal.html`; the icon set is `.working/availability-icons-b.html` — **Set B, cut twice** (`.memlog.md:101`, `:102`), and `.working/critical-four.html` §2 is the study the ring came out of |
| **Featured band** — `{components.featured-band}` | Top of Service results | A **separate, marked band**, never interleaved with organic results. **Three signals, none of them colour:** the bounded container, the heading, and a per-card `{components.badge-paid}`. The identifying line beneath the heading is **not optional and not collapsible** — it is the part that satisfies FR-20. **States:** populated · empty, in which case the band does not render at all rather than showing an empty container. **Interaction:** the ordering disclosure is reachable from inside the band. **Never:** interleaved, collapsed behind a tooltip or an info icon, ordered by anything but Tier, or exempt from availability or from any condition of listing. Founding Vendors at ₹0 are an active Subscription and get **no second-class treatment** anywhere (AD-35) |
| **Paid-placement badge** — `{components.badge-paid}` | On every card in the Featured band | The literal word *Featured*, on the card itself, so a card lifted out of context — screenshotted, shared, deep-linked — still says what it is. **Never** built from `{components.chip}`: a Featured mark that looks like a filter chip reads as a selected filter, which is the opposite of a disclosure. **Never** carried by colour, and never omitted from a card because the band around it is already labelled |
| **Ordering disclosure** | Reachable **from the results themselves** (FR-20, FR-64) | Plain language, no jargon: ordered by availability for your dates, then rating adjusted for how many reviews it rests on, then reply speed, then how recently the vendor was verified — and vendors of similar standing appear in a varying order, so nobody holds the top place permanently. States that vendors cannot pay for a position and that paid placements are separate and labelled. **Interaction:** it opens in place and returns her to the same scroll position and the same session seed. **Never:** behind a login, behind a settings screen, or worded as a legal notice. **[ASSUMPTION]** a link under the results list opening a plain sheet; the FR fixes the content and reachability, not the form |
| **Rules panel** | Listing detail, on the Listing itself — never a sub-page | `restrict_service` rows and `informational` rows render as **one list** the Family reads once (AD-36). Rules attach to the **Space** where the Service has Spaces — a lawn and an AC hall can carry different Rules, and the panel says which Space it is showing. **States:** published · none published, in which case the Listing is not publishable at all, so the empty case cannot reach a Family. Devanagari and Latin appear in the same field at every text size. **Never:** truncated with a *read more* that hides a restriction, summarised by the platform, or reordered by anything but the Vendor's own order |
| **Rule-conflict prompt** | Before engaging a Space or Listing (FR-32) | Names **every** Shortlist entry and every Agreement this Vendor's Rules would make impermissible, **by name**. The Family cannot proceed without accepting the consequence explicitly. **Nothing is ever removed silently.** Where the Preferred-Vendor set has narrowed since acceptance, the system **re-prompts rather than removing anything unnamed**, and it surfaces **before** the conflict takes effect, never after. **Never:** a checkbox with a count, a summary, or a prompt that can be dismissed into acceptance |
| **Shortlist** | Per Service, per Wedding | Adding costs nothing, commits to nothing, notifies nobody and **moves no money**. Availability shows per Listing while a Service is still at Shortlist stage. **States:** empty (see *State Patterns*) · populated · at the compare threshold. **Interaction:** adding requires a Wedding, and the ask comes **in place**, returning her to exactly what she was doing. **Never:** a cap presented as urgency, a count of what she is "missing", or a Shortlist shared between Weddings |
| **Collision view** | From the Workspace header, and wherever a Block is in question | Shows **which Selection blocks which Candidate Block, by name**. Blocks are **never ranked or scored** by partial availability and the platform never recommends one. The Family swaps Listings and **the view updates as she does**. **States:** one or more clean Blocks · no clean Block, which is shown explicitly rather than as an error · a Block locked, after which the discarded Candidates stop applying to browsing. **Never:** a per-Listing badge that hides a conflict, a "best match" mark, or a resolution performed for her |
| **Enquiry thread** | Both sides, same messages, same order | Immutable — neither party can alter or delete what was said. The Vendor's Quote, the Site Visit offer, the proposed terms, the declined-by-conflict return: all thread events. **The thread of record lives here.** **States:** sent · answered · unanswered at thirty days, marked neutrally · declined by conflict · carrying an Agreement. **Interaction:** WhatsApp and push carry a notification and a deep link **into** it and are never the conversation surface; a push that never arrives loses nothing. **Never:** an edit path, a delete, a read receipt presented as an obligation, or the Vendor's outcome marks shown to the Family |
| **Agreement record** | Read-only from the moment both confirm | No edit path anywhere. The only forward action is **Propose an Amendment**, which appends and never cancels. Download returns **the same stored bytes every time** — no regenerate, no template choice. A certificate surface exists (FR-43). **States:** awaiting the other side · confirmed · amended · cancelled by a Chosen Block change, which is named before she can proceed. **Never:** described as binding, guaranteed, or enforced by the platform. It says: *we recorded what you both agreed* |
| **Guest household row** | Guest list | The unit is a **household**, not a person: *"The Deshmukhs — four"* is one entry, one invitation, one reply. Attached per Function, RSVP state per Function. **States:** no count stated (*"not stated"*, never `0`) · count stated · no phone number, which still counts and still shows but cannot be sent an invitation · invited · replied yes with a confirmed count · replied no · not sure · no reply. **Never:** a count inferred from the name, a household merged automatically, or a confirmed count written over her stated number |
| **Pasted list import** | Guest list | **One line, one household. Nothing is parsed.** The line becomes the household's name exactly as pasted — Devanagari included, set in `{typography.title-card-devanagari}` — and the count is left **unstated** for the Creator to fill. Blank lines are skipped; that is whitespace, not parsing. **States:** the paste box, which says what it will do **before** she pastes · the editable review table · confirmed. **Interaction:** nothing is written until she confirms the table, and cancelling leaves the Wedding untouched. A second paste **appends** and never reconciles. **Never:** de-duplication, merging, a count inferred from digits, brackets, words or Devanagari numerals, or a revision to a Function's stated guest count (FR-11) |
| **Suggestion queue** | Guest list, and Listings suggested by Invited Members | Everything arrives as a **suggestion the Creator accepts or dismisses** — never written straight in. **States:** pending · accepted · dismissed, and a dismissed guest-form submission is **erased at once**. **Never:** a suggestion applied by default, a submitter shown the guest list or anything else, or a queue that pressures her with a count |
| **Portfolio image** | Vendor portal | Four states, each labelled **in words**: published · held back (over allowance) · pending Verification · taken down. Vendor's own order, defaulting to upload order, explicitly reorderable. **Interaction:** a takedown **leaves its gap** rather than promoting an unchosen image; a pending image never consumes a paid slot; new images are held back while the rest of the Listing stays live and keeps receiving Enquiries. Signed URLs are short-lived and are re-fetched, never rendered broken. **Never:** a state carried by opacity alone, or a silent removal |
| **Vendor calendar day** — `{components.calendar-day-bar}` | Vendor portal, both lenses | Three states told apart by a **count, not a texture** — Engaged, Enquiries pending, and marked unavailable. **The mark itself is specified once in `{components.calendar-day-bar}` and is not drawn here**; what this row fixes is that the count is what carries the state, that a dashed bar was rejected because at this size a dash averages into a solid line, and that the unavailable state is carried by the struck-through date number rather than by the bar. **The legend states all three in words** and renders the actual marks, not stand-in glyphs. **Interaction:** selecting a day filters the Inbox lens to it, and the selection survives the lens switch. **Never:** a Unicode glyph in place of the mark, a state told by colour alone, or a hit area that overlaps its neighbour — a tap landing on the wrong date is worse than a small target. Drawn in `.working/vendor-calendar-bar.html`; `.working/critical-four.html` §4 is the study, and **the underbar won** (`.memlog.md:106`) |
| **Vendor calendar Slot** | Vendor portal | Four Slots per day — morning, afternoon, evening, night — the same four for every Service. A morning Haldi does not consume an evening Reception. **States:** free · blocked whole-Slot · blocked partially (one crew stopped, the other still selling) · blocked automatically by a confirmed Agreement, which the Vendor does nothing to cause. **Interaction:** he may block **without stating a reason**, and the platform never changes his availability for him. **Never:** a clock time anywhere in it (AD-9), an auto-expiry of availability, or silence read as unavailability |
| **"Not yet estimated"** — `{components.price-unestimated}` | Anywhere a price would go and there is none | The literal words, in the exact slot the price would occupy. Never `₹0`, never blank, never a dash — **zero reads as free** (FR-8). Used identically on the Family side and in the Vendor's own editor |
| **Grievance entry point** | Every surface, without a login (AD-33, FR-63) | Names the grievance officer and returns a **reference the complainant can quote**. Acknowledged on receipt. **States:** the form · submitted with its reference · offline, where the entry point stays visible and says the submission will go when the connection returns. **Never:** behind a login, behind a support article, or reachable only from one surface. On the Guest pages it sits in the page frame with the see-and-correct link, and both are block-level targets |

#### Feedback and system

| Component | Use | Behavioural rules |
|---|---|---|
| **Skeleton** — `{components.skeleton}` | Every surface, on cold load | Occupies the **exact footprint** of the content it replaces, so nothing moves when the content lands. **States:** loading · resolved · unresolved after ~5s, which gains **one** line naming what is being waited on `[ASSUMPTION]` · `prefers-reduced-motion`, where the sheen goes and the blocks stay. **Never:** a spinner, a percentage, a skeleton whose shape differs from the content that replaces it, or a skeleton left on screen after a failure — a failure replaces it with `{components.banner-failure}`. `.working/critical-four.html` §3 is the study and **skeletons won over both a spinner and a narrated progress bar** (`.memlog.md:104`) |
| **Failure banner** — `{components.banner-failure}` | Everywhere something went wrong | A glyph, a sentence naming what happened, a sentence naming what happens next, and a retry. **Never colour alone** — the palette holds two warm reds and an eye that cannot separate them must still read the difference. **States:** failed with a retry · retrying · retry failed again, which says what is preserved rather than repeating itself · resolved, which removes the banner without a success toast. **Interaction:** it is **inline and persistent**, never a toast that fades and leaves someone acting on stale data. Copy is product language: *"Your quote didn't send. It's saved — we'll send it the moment you're back."* **Never:** the word *error*, blame, a traceback, a technical detail, or leaving someone unsure whether their work survived (NFR 5.5, `ARCHITECTURE-SPINE.md` **Consistency Conventions** §Errors) |
| **Empty state** — `{components.empty-state}` | Every surface that can be empty | One anatomy everywhere, salvaged from the published site: **circular icon → heading → one sentence → one button, capped and centred**. The button is the route out and it is always the same route the surface would offer when full. **States:** empty-because-new (first run) · empty-because-filtered (zero matches, which offers the filters back) · empty-because-nothing-exists-yet on the Vendor side. **Never:** a count of what is missing, an urgency line, an illustration that carries the only meaning, or a dead end with no button. Per-surface strings stay open (Open Questions); the anatomy does not |
| **Offline band** | Family app and Vendor portal, and now the Guest pages | A persistent inline band, not a toast. States what is still usable: *"No connection. Showing what was loaded."* **Interaction:** work in progress survives (FR-7, NFR 5.3); every state-changing action is safely retryable and an interrupted confirmation retried is a no-op, never a double-confirm (AD-31). **Never:** a blocking modal, a fading toast, or a claim that something was recorded when it was not |
| **Push notification** | Family only | Six events, each mapping to something she is already waiting for. **Interaction:** every push deep-links to the exact thing, never the home screen. **Never:** a re-engagement, an offer, a streak, a preview of a review's content on a lock screen, or a notification that serves the platform rather than the person |
| **Stale-calendar nudge** | Vendor portal (both lenses) and WhatsApp | Triggered by **three or more** Enquiries touching the same period; **at most one per Vendor per seven days**. Renders beside the date in the Calendar lens and in the rail in the Inbox lens — one component, two contexts. **A question, never a block:** the Enquiry still goes through, availability is never changed by the platform, and **silence is not treated as unavailability**. **Never:** a modal, a campaign, an escalating series, or a penalty for ignoring it |

---

## State Patterns

### Coverage, surface by surface

Every surface in the Information Architecture, against the six state classes that can apply. **A
cell reading *n/a* names why the state cannot occur on that surface** — an omission with a reason is
a decision; an omission without one is a hole. **Focus is global** and is specified once below, so
it is not a column: every surface carries the same treatment.

| Surface | Empty | Cold load | Failure | Offline | Permission |
|---|---|---|---|---|---|
| **Home** | *First run, no Wedding* | Cached, then refreshed | Failure banner in place of the failed band; the rest of Home still renders | Cached Home, offline band above it | Push, asked later; never at launch |
| **Workspace** | *A Wedding with no Services* | Never cached — money (AD-19) | Blocks the figure, never guesses it | Read-only from cache; the running total is marked as of its fetch time | n/a — no device capability is used here |
| **Function detail** | *A Function with no Services yet* | Never cached — money | As Workspace | As Workspace | n/a |
| **Service results** | *Zero matches* (search or filters) | Skeleton from cold — the order seed is per session (AD-22) | Failure banner replaces the list; filters stay operable | Last result set held with the offline band; a new search says it needs a connection | Location, only if she asks for *near me* |
| **Listing detail** | n/a — a Listing that reaches a Family has passed the publish gate, so it cannot be empty | Skeleton | Failure banner; the Listing does not part-render | Cached Listing; **Enquire is disabled with the reason stated**, never silently inert | n/a |
| **Shortlist (per Service)** | *Empty Shortlist* | Skeleton | Failure banner | Cached; adding is queued and says so | n/a |
| **Compare** | *Nothing to compare* | Skeleton | Failure banner | Cached for what is already in the tray | n/a |
| **Blocks / collision view** | n/a — a Wedding always has at least one Candidate Block once the shape is stated; before that the surface is not reachable | Never cached — availability is computed live | Failure banner; **never a partial collision picture**, which would read as a clean Block | **Not usable offline.** The surface says so plainly rather than showing a stale match | n/a |
| **Enquiries (tab)** | *No Enquiries sent yet* | Cached list, then refreshed | Failure banner above the list | Cached list with the offline band | Push |
| **Enquiry thread** | n/a — a thread exists because an Enquiry was sent | Cached, then refreshed | Failure banner; an unsent message is preserved and marked | Composing works; sending is queued and marked | n/a |
| **Agreement** | n/a — it exists only once both confirmed | Never cached | Failure banner; **confirmation is never optimistic** | Read-only from cache; confirming waits for a connection and says so | n/a |
| **Guest list** | *No households yet* | Cached, then refreshed | Failure banner | Cached; edits queue | **Contacts** — the one permission-denied path on the Family side that is a named FR route (FR-11) |
| **Boards** | *No Boards yet* / *A Board with nothing saved* | Cached, then refreshed | Failure banner | Cached; saving queues | **Photo library / camera** for saving an image |
| **You** | n/a — the account always exists; individual sections carry their own empties (*no record held yet*) | Cached | Failure banner per section, never one banner for the page | Cached | n/a |
| **Real Weddings** | *None published yet* | Cached, then refreshed | Failure banner | Cached; the public page is not reachable offline | n/a |
| **Reels** | *No clips on this Wedding* | Poster frames first | Failure banner in place of the clip | **No autoplay, no prefetch on cellular**; offline shows the poster and says why | n/a |
| **Vendor — Enquiries, both lenses** | *No Enquiries yet* (his first week) | Never cached — availability and the waiting count | Failure banner; **the count is hidden rather than shown stale** | Cached last view, offline band, replying queues | n/a |
| **Vendor — Listings** | *No Listing yet* / *A Listing that has not passed the gate* | Cached, then refreshed | Failure banner | Cached; edits queue | **Camera and photo library** for portfolio upload |
| **Vendor — Performance** | *Fewer than five Vendors in the Service and Place* · *No season yet* | Never cached — figures are the product | Failure banner; **no figure is ever estimated to fill a gap** | Not usable offline; says so | n/a |
| **Vendor — You / Subscription** | n/a — the account always exists | Cached | Failure banner | Cached | n/a |
| **Guest — Invitation / RSVP** | n/a — the page exists because an invitation was composed | Server-rendered; no skeleton, because a Guest has one decision and should never see a shell | *Link expired or revoked* · *Rate limited* · *Reply did not send* | The page is a single request; a lost connection shows the reply failure with the answer preserved | n/a — no account, no device capability |
| **Guest — Guest form** | n/a — the form is always the same form | Server-rendered | Same three as above | Same | n/a |
| **Guest — See-and-correct** | *Nothing held about this number* — which is an answer, not an error | Server-rendered | Failure and rate limiting as above | Same | n/a |
| **Guest — Grievance intake** | n/a — a form | Server-rendered | Failure; the reference is issued only on a real receipt | Same | n/a |
| **Sign-in (OTP)** | n/a | Server-rendered | *Code expired* · *Attempts exhausted* · *Resends exhausted* | Cannot proceed; says what to do | n/a |
| **Admin** | Frappe Desk's own | Desk's own | Desk's own | Desk's own | Not designed here (AD-2) |

### Empty and first run

| State | Surface | Treatment |
|---|---|---|
| **The shared anatomy** | Every empty surface | **Circular icon → heading → one sentence → one button, capped and centred**, as specified for `{components.empty-state}`. The button is the route out and it is the same route the surface offers when full. Per-surface copy stays open (Open Questions); the anatomy is closed |
| **First run, no Wedding** | Home | The invitation card, empty: `— & —`, `0 OF 5`, one open line reading *"date not set"*. The shop below it works fully — she can browse before creating anything. No modal, no tour, no "complete your profile" |
| **A Wedding with no Services** | Workspace | *Across the wedding* is **absent**, not empty — a section with no Spans does not render. The Functions render with no Service rows, each one an empty Function card routing to the Service picker. The running total reads `{components.price-unestimated}`, never `₹0` |
| **A Function with no Services yet** | Function detail | The day, Slot and stated guest count still render — they are hers and they are facts. Below them, the empty anatomy routing to the Service picker for this Function |
| **Zero matches** | Service results, and search anywhere | Names what was searched and **offers the filters back, one at a time**, in the order they were applied — *"Clear the ₹ filter"* — rather than a single Clear all that discards work. Where the Service itself has no Listings in this Place yet, that is said plainly and is **not** dressed as a search failure: it is a supply fact, and the Family is not asked to try harder. **Never** a suggestion to widen the dates, because there is no date filter to widen |
| **Empty Shortlist** | Shortlist tab | Names the Service and routes to its results. No count of what she is missing, no urgency |
| **Nothing to compare** | Compare | States the minimum plainly. Routes back to results |
| **No Enquiries sent yet** | Enquiries tab | Routes to the Service she has shortlisted most, or to Home if none. No count, no prompt to hurry |
| **No households yet** | Guest list | The three routes in — by hand, from contacts, pasted — offered as equal peers, with the paste box's promise visible before she commits to it |
| **No Boards yet** | Boards | One sentence saying what a Board is for, and that saving to one shortlists nothing and moves no money |
| **No record held yet** | You → the record Vendors hold (FR-47) | *"No Vendor has recorded anything about this wedding yet."* A standing promise with nothing in it is still the promise being kept, so the surface exists from day one rather than appearing later |
| **None published yet** | Real Weddings | Says publishing is available once a Wedding is **concluded**, and that it is never a condition of anything (FR-65) |
| **No Listing yet** | Vendor portal → Listings | The publish gate itself is the empty state: the four general items plus whatever this Service requires, each one a route to the thing that satisfies it |
| **No Enquiries yet** | Vendor portal → Enquiries | His first week. Says what makes a Listing reachable — completed Verification, a published price, Rules and Commitment — and links to whichever is outstanding. **Never** a figure he could have earned, and never a prompt to buy a Tier |
| **No season yet** | Vendor portal → Performance | Figures accumulate from the first view; an empty dashboard says so rather than rendering zeros that read as poor performance |
| **Fewer than five Vendors in the Service and Place** | Vendor Lead Dashboard | No comparison is shown at all. Say why; the Vendor's own figures still show |
| **Nothing held about this number** | Guest see-and-correct | An answer, not an error, and not styled as one: *"We hold nothing against this number."* No account is offered and none is created |

### Cold load

| State | Surface | Treatment |
|---|---|---|
| **Cold load — the treatment** | Every surface | **Skeletons, never a spinner.** `{components.skeleton}` and its rules are specified in Component Patterns; what belongs here is when it fires. `.working/critical-four.html` §3 is the options study, and **the skeleton won** over both a spinner and a narrated progress bar (`.memlog.md:104`) |
| **Cold load — what is cached, per surface class** | Three classes, and the difference matters | **Cache-then-refresh:** Home, the Enquiries list, Enquiry threads, Shortlists, Boards, Guest list, You, Real Weddings. Cached content renders **immediately**, the refresh is silent, and nothing jumps when it lands. **Skeleton from cold, never cached:** Service results — the tie-break seed is fixed per browsing session (AD-22) and a cached order would be a stale seed. **Never cached, never rendered stale:** anything carrying money (the Workspace total, Function figures, Agreements — AD-19) and anything carrying availability (the collision view, the Vendor's calendar and waiting count). A stale figure that looks live is worse than a wait |
| **A skeleton that does not resolve** | Every surface | `[ASSUMPTION]` after roughly five seconds it gains **one** line naming what is being waited on, because a skeleton with nothing changing reads as frozen. The Block match across three dates and five Services is the one wait long enough to reach it |

### Focus

| State | Surface | Treatment |
|---|---|---|
| **Focus** | Every interactive element on all five surfaces | **One treatment everywhere:** the focus ring specified for `{components.search-field}` in `DESIGN.md`, applied to every target — Vendor cards, filter chips, category medallions, tab items, the compare tray, the lens switch, calendar days, portfolio images, the three `{components.button-choice}` peers and `{components.stepper-count}`. It is **never removed** and **never signalled by a tint alone**. It must remain visible on every fill it can land on; `DESIGN.md` names the one fill it may not sit on and what is used instead there. **On a card whose whole surface is the target, the ring is drawn on the card**, not on the text inside it — one target, one ring. **Traversal follows reading order** on every surface, and a revealed control joins the order where it appears: `{components.stepper-count}` takes focus when *Yes* reveals it. **Never:** a focus ring suppressed because it is "ugly" on a photo, a focus order that follows visual position rather than reading order, or a modal that lets focus escape behind it — modals stack one level deep and trap focus for that one level |

### Failure, offline and the things that break

| State | Surface | Treatment |
|---|---|---|
| **Failure** | Everywhere | `{colors.danger}` `#8C2F1A` carries it — the one token in the system that means *something went wrong*, kept separate from vermillion because a red that means **action** cannot also mean danger. Rendered as `{components.banner-failure}`, whose behaviour is specified in Component Patterns. Copy is product language, never the word **error**, never blame, never leaving someone unsure whether their work survived (NFR 5.5). Drawn in `.working/direction-failure-3.html`, which is where the sixth colour token was chosen (`.memlog.md:65`) |
| **Destructive confirmation** | Everywhere | The only other use of `{colors.danger}`. Removing a Service that carries an Agreement, discarding a Candidate Block, taking a Listing down. Names the consequence and what is lost; the confirming action is the one that costs something, never the default |
| **Offline / lost signal** | Family app, Vendor portal **and the Guest pages** | Work in progress survives (FR-7, NFR 5.3). **No explicit save action exists anywhere in the Workspace** — every entry is preserved as it is made. Every state-changing action is safely retryable: an interrupted Agreement confirmation retried is a no-op, never a double-confirm (AD-31). Shown as the offline band specified in Component Patterns. **The Guest pages are included**, which they were not before: a Guest has no account, no app and no route to ask, so a reply that fails must say so on the page and keep the answer and the count |
| **A reply that did not send** | Guest invitation / RSVP | The answer **and any adjusted count stay on screen and stay editable**. One sentence saying it did not send and that nothing was lost, and one retry. The confirmation state is never shown until the platform has actually recorded it — a Guest who believes he has replied and has not is the one failure this page cannot afford |
| **The link is expired or revoked** | Guest invitation / RSVP, guest form | A plain page: the invitation is no longer open, no reason given about the Wedding, **nothing of the Wedding shown**, and a line saying to ask the person who sent it. Public links a Wedding issued die when it concludes, and this is what that looks like from the Guest's side. **Never** an account offer, a sign-in, or a suggestion that the Guest did something wrong |
| **Rate limited** | Guest pages, see-and-correct, grievance intake, sign-in | Says plainly that too many attempts have been made and when to try again. **Never** a silent failure, never a generic error, and never a hint about whether the token or the number was valid |
| **Image URL expiry** | Vendor portal, pending media | Signed URLs are short-lived. Re-fetch; never render a broken image |

### Permission

| State | Surface | Treatment |
|---|---|---|
| **Push permission** | Family app | Asked **in context, never on first launch** — at her first Enquiry, the first moment a reply can arrive. **Refusal is silent and permanent:** no second ask, no nag banner, no reduced functionality. The Enquiries tab count carries everything push would have |
| **Contacts permission** | Family app → Guest list (FR-11) | Asked **only when she chooses the contacts route**, never as part of set-up. **Refused:** the other two routes — by hand and paste — stay fully available and are shown, not merely mentioned; the contacts route stays visible and says it needs permission and where to grant it. **Nothing is imported without the review table**, so a granted permission still writes nothing until she confirms. **Never:** an upload of her entire contact list, a re-ask on every visit, or a route disabled without a reason |
| **Camera and photo-library permission** | Family app → saving an image to a Board · Vendor portal → portfolio upload | Asked at the moment of the act. **Refused:** the surface says what is unavailable and what still works — a Board still holds saved Listings, a Listing still publishes without new photographs, though the publish gate may not be satisfied and says which item is outstanding. **Never:** a permission asked twice, a permission asked for a capability the surface does not use, or a portfolio flow that dead-ends on refusal |
| **Location permission** | Family app → search (FR-18) | Only when she asks for results near her. **Refused:** she types a Place instead, and the field says so. Location is never used to reorder results silently |

### Sign-in and its limits

| State | Surface | Treatment |
|---|---|---|
| **The limits are on the screen, not in the docs** | Sign-in, both apps | Six digits, valid **ten minutes**, **five attempts**, **three resends per hour**. The screen shows the resend as a timed control rather than a button that fails, and it does not display an attempt counter until an attempt has been used — a counter shown cold reads as an accusation |
| **Code expired** | Sign-in | Says the code has expired, **keeps the number**, and offers a resend if resends remain. The entered digits are cleared; the number is not re-typed |
| **Attempts exhausted** | Sign-in | Says the code was entered incorrectly too many times and that a **new code** is needed. Offers the resend if resends remain, and if they do not, falls through to the row below. **Never** reveals whether the number is registered |
| **Resends exhausted** | Sign-in | Says how long until a resend is available, in plain words. **This is the one dead end in the product with no forward action**, so it also carries the grievance entry point and the recovery route: losing the number is recovered **through Admin**, deliberately manual and attributed |
| **Session** | Family app, Vendor portal | Ninety days of **inactivity**, refreshed on use. Never a "your session expires on ⟨date⟩" message. Returning entry is device biometric or screen lock |

### Availability and the Selection lifecycle

| State | Surface | Treatment |
|---|---|---|
| **Browsing with no Anchor Date** | Results, Listing | Listings show **no availability signal at all** — *not* greyed, *not* "unavailable" (FR-13, AD-10). One quiet line explains what would make it appear. The signal appears everywhere the moment the first Anchor Date exists |
| **No-duration Service** | Results, Listing | Presented **without any availability claim**, permanently. The only signal is whether the Vendor is currently accepting Enquiries |
| **No clean Block** | Collision view | The collision is shown explicitly, by name, and she swaps until one clears. Never ranked, never scored, never resolved for her, never hidden behind a per-Listing badge |
| **No reviews** | Listing | *"no reviews yet"* — plain words. Never a zero, never an empty star row, never a borrowed average. An unrated Listing is shown alongside rated ones in a rating-filtered list, **marked as unrated**, unless she explicitly asks to see only rated ones |
| **Enquiry unanswered at 30 days** | Family, in the thread and the Workspace | Marked **unanswered**, so she stops waiting. Neutral. **Nothing is held against the Vendor**, nothing changes in his ranking, and the Family is never shown his outcome marks |
| **Lost the Slot race** | Family, in the thread | Terms return as **declined by conflict**, never a silent expiry. Her Shortlist, Selections and Agreements are **exactly as they were** — nothing cascades until an engagement actually completes |
| **Invited Member** | Every Family surface | A visible, **non-punitive** read-only state. They see the dashboard, Functions, budget, guest list, Shortlists and Enquiry statuses; the Creator-only actions are absent or plainly marked, never present-and-failing. Their route forward is **Suggest**, which reaches the Creator to accept or dismiss |
| **Wedding concluded** | Workspace | Stays readable by Creator and Invited Members. Public links the Wedding issued are dead — and the Guest side of that is *The link is expired or revoked*, above |
| **Wedding about to be abandoned** | Workspace, and the account | Inactive and Agreement-less: she is asked whether to keep it, **and told before the thirty days start** that not answering ends it |

### The Vendor's own lifecycle

| State | Surface | Treatment |
|---|---|---|
| **Verification pending / failed** | Vendor portal | Always visible: what is missing, that it is pending, that it succeeded, or **that it failed and why**. Failure is actionable — correct and resubmit. A new photo is held back while the rest of the Listing stays live and keeps receiving Enquiries |
| **Vendor's stale calendar** | Vendor portal + WhatsApp | Fires on **three or more** Enquiries touching the same period, at most one per Vendor per seven days; the nudge's own behaviour is specified in Component Patterns. **A question, never a block**, and silence is not treated as unavailability |
| **In the Grace Period** | Vendor portal, every destination | The term has ended and the thirty-day Grace has started. **The Listing stays discoverable throughout Grace** and keeps receiving Enquiries. A persistent, non-modal line in the left rail or under the tab bar states the days remaining and carries one action: *Pay for the term*. Reminders go at **30 / 14 / 7 / 1 days** on WhatsApp with SMS fallback — with no auto-renewal, **the reminder is the renewal mechanism**, so it is the one recurring message the product sends on purpose. **Never:** a countdown timer, an escalating tone, a feature withdrawn early to force the payment, or a saved instrument offered as a way to stop the reminders (FR-54 forbids the instrument, AD-34 forbids the mandate) |
| **Past Grace — the Subscription has lapsed** | Vendor portal, and the Family side | **The Listing leaves discovery** and its availability signal falls to the third state, *not stated* — not to *taken*, because nothing about his calendar changed. In the portal every destination stays readable: his Enquiry history, his Agreements, his figures and his portfolio are all still there, because they are his. What stops is discoverability. One action, *Pay for the term*, restores it, and **re-entry notifies nobody** — no announcement, no "he's back" placement, no penalty in the ordering. **Never:** data withheld as leverage, an export blocked, or a Listing deleted |
| **Listing leaves discovery** | Family, all four routes | Lapse past Grace, Vendor withdrawal, Admin removal, a condition ceasing to hold — **one notification design covers all four** and they behave identically. The Family is told; where it was her **Selection, the Selection is cleared and its contribution withdrawn from the running budget**. Nothing is removed silently. Re-entry restores discoverability and notifies nobody |
| **Vendor removed by Admin** | Family holding an Agreement | The one route that adds a step: she is told the **Vendor was removed** — not that a listing is gone — and asked to find another Vendor for that Service. The platform does not cancel her Agreement; if she ends it, **that cancellation is not counted against her** |

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
| **Shows unavailable** | An Anchor Date exists and the calendar does not clear | Attributed the same way — *"vendor shows the evening of 27 Nov unavailable"* — never "unavailable" as a platform fact |
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

Two sources appear to disagree about *Invitations* and *Pandit / Priest*, and **neither is
authoritative**: the `CHANGELOG 0.3.0` removal is a change to the published placeholder site whose
IA this run superseded, and the brainstorming session predates the no-money model — its own legend
reads *"books via us, we take a cut"*, the abandoned commission model, in banned vocabulary.

**Invitations is already resolved** at `prd.md:466`: a Vendor may sell invitation-card design as a
Service, and the Workspace's own digital invite and RSVP is a separate capability — *"these compose
rather than collide"*. **Pandit / Priest is a catalogue decision, not a design one**: a business call
about supply and verification, and if it launches it is a per-Function Service like any other.
Neither changes anything below.

| Rule | |
|---|---|
| **The category grid renders the configured catalogue for the Place** | Not a fixed six. A Place opening with four Services shows four; one with eleven shows eleven |
| **Overflow is "See all", never a truncated grid** | The medallions are a shortcut into the catalogue, not the catalogue itself. What is shown first is configuration, not a design constant |
| **`[ASSUMPTION]` the grid shows at most six before "See all"** | Six is what the prototype used and what fits a 430px column at `{components.category-medallion}`'s 60px. Nothing in the sources sets a number |
| **A Service name is never invented in the UI** | It comes from configuration and must match the Glossary's usage. A Function and a Service never share a word — *Mehndi* is a Function, *Mehndi Artist* is a Service |

> **Correction to this run's own artifacts.** `.working/directions-4.html`,
> `.working/color-themes-1.html`, `.working/direction-workspace-4.html` and
> `.working/direction-home-screen.html` all render six hardcoded medallions, copying the published
> site. They illustrate the *component*, never the catalogue. A builder must read the list from
> configuration.

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

The mechanics are FR-46, FR-47 and FR-48 and are not restated here. What is restated is the one
distinction a builder collapses: two different things are written in the same blind window and
**published to two different places**, and confusing them is the most damaging mistake available on
this surface.

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

`.working/direction-family-record-3.html` is the only rendering of this — the three moments at which
the Family learns what a Vendor recorded — and the moment chosen was **the notification plus the
permanent home**, with disclosure inside the Enquiry composer rejected (`.memlog.md:78`).

| | |
|---|---|
| **The notification** | Fires at the moment the window closes and both become visible. It names the event, never the verdict: *"Your reviews are published. Your review of Shubhmangal Lawns is live, and they have recorded their answers about the wedding."* It never says a Vendor rated her poorly, and it never previews an answer in the notification body — a lock screen is not private |
| **The permanent home** | An entry under **You**, always reachable, never dependent on having caught the notification. FR-47's *"the Family can see everything recorded about them"* is a standing promise, not a moment |
| **The absence of appeal is stated, not hidden** | *"There is no dispute process — we do not decide between you. You can record what happened in your own words, and Vendors see it beside their answers."* Saying it plainly is kinder than letting her hunt for a complaint button that does not exist |
| **An unfavourable answer is never rendered in `{colors.danger}`** | The platform does not judge these answers and cannot change them. Colouring "No" as a failure would be Vivah Spot taking a side, which §7.2 excludes. It is a word in `{colors.ink}` — no red, no icon, no emphasis |
| **Not surfaced in the Enquiry composer** | Showing her what a Vendor will see, every time she enquires, turns a disclosure into a standing warning about herself. The record is hers to consult, not a toll gate on contacting anyone |

---

## Roles and What Each May Do

Roles are FR-2, FR-4, FR-5 and FR-6. What follows is the UX consequence of each, not the requirement.

| Role | May | May not |
|---|---|---|
| **Creator** | Everything on their own Wedding | — |
| **Invited Member** | View everything the Creator sees, and **Suggest** a Listing or a Guest | **Nothing that changes the Wedding or reaches a Vendor** — the full enumeration is FR-4 and FR-5 and is not copied here. The design decision is that the boundary is **read-only and non-punitive**: Creator-only actions are absent or plainly marked, never present-and-failing, and Suggest is always the route forward |
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
  the active tab and the availability ring each carry a glyph, a weight change or a word in
  addition to their colour. This is a hard constraint and it shapes every badge in the product.
- **TalkBack / VoiceOver:** every interactive element labelled with role **and state**. The
  availability signal announces attribution — *"Shubhmangal Lawns shows available"* — never a bare
  "available". The invitation card announces its progress as *"3 of 5 settled"*, not as a bar.
- **A Span announces the days it covers.** Its card reads *"Shubhmangal Lawns, across the Haldi and
  the Wedding"* — the days are inside the card as content, not conveyed by its position on the
  screen. A screen reader user must be able to tell it is one Selection covering two days.
- **Dynamic type** honoured through `DESIGN.md` typography tokens; nothing truncates at the largest
  setting. Every container must tolerate **Devanagari and Latin in the same field** at every size —
  Vendor Rules, reviews, Listing descriptions, Function names the Family typed herself.
- **Devanagari runs carry `lang`, derived from the script at render time** — `mr` where the Place is
  Marathi-primary, else `hi` — set **on the run, never on the page**, because the page is English on
  every surface and a page-level `lang` would mis-announce all of it. **The person is never asked to
  declare a language** (`.memlog.md:31`); deriving the script from the Unicode block is not asking.
  Without this a screen reader reads Devanagari with an English voice, which is unintelligible
  rather than merely wrong (SC 3.1.2).
- **Reduce Motion:** skip the foil sweep and the rule draw; the settled state renders immediately and
  reads identically.
- **Tap targets ≥ 44pt (iOS) / 48dp (Android)**, everywhere, with exactly one named exception. The
  Vendor portal holds the same floor — it is used on a phone at a function, one-handed. Note what
  these numbers are: **Apple HIG and Material platform guidelines, stricter than the standard.**
  WCAG 2.2 SC 2.5.8 (AA) requires 24×24 CSS px. Nothing here may fall below the standard; this floor
  is the higher bar the product sets itself.

  > **The exception: the Vendor month grid below 768px.** Seven columns need 308px of targets and a
  > 360px phone offers 284. There is no padding trick — an overlay wider than the column pitch steals
  > taps from the neighbouring date, which is a worse defect than a small target. So on the phone the
  > month grid renders **40×40 cells with a 2px gap, pitch 42px, no hit area overlapping another**.
  > That clears SC 2.5.8's 24px comfortably and misses the product's own 44px floor by 4px, knowingly.
  > **The month view is what makes a stale calendar visible at a glance**, and a stale calendar
  > silently corrupts every Family's cross-Service matching (UJ-1 cross-journey dependency) — so the
  > month is worth 4px. Above 768px the columns fit and the floor is met with no exception.
  > **This exception is bounded to that one grid.** It licenses nothing else.

  > **The one standing exemption, which is not an exception:** a link **inside a run of text** is
  > exempt, mirroring WCAG 2.2 SC 2.5.8's inline exception — its target is the text, and enlarging it
  > would break the line it sits in. **A standalone control is never exempt.** On the Guest pages
  > that distinction is load-bearing: the see-and-correct and grievance links in the page frame are
  > standalone obligations and **must reach 48px**, and the growth line at the foot is a call to
  > action, not prose, so **it is a block-level target** rather than a 74×15px inline link.
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
- **The empty-state anatomy.** Consistent across five instances, and now `{components.empty-state}`
  — the anatomy is specified there and in *State Patterns*, not restated here. Keep the shape;
  rewrite every string.
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
  most of the work, and a product whose only feedback is a green tick has not designed for the two-bar
  connection its users are actually on.
- **Streaks, urgency, countdowns, engagement mechanics.** Never present on the old site, and never to
  be added. The emotional register is relief, not delight.

**Lifted from outside the repo:** nothing. There is no "it should feel like X" anywhere in the source
corpus — no mood analogy, no brand comparison. The metaphor this product runs on is its own: **an
invitation card that fills itself in.**

---

## Key Flows

Each flow is the UJ named in its heading, walked as designed screens. **The persona and the entry
state are `prd.md` §2.2's and are not reproduced** — the flow starts where the first screen does.

### Flow 1 — Rutuja finds the one arrangement her brother's whole wedding actually fits into (UJ-1)

**UJ-1** (`prd.md:70`). What she is replacing: calling Vendors one at a time about the 22nd, then the
27th, then the 4th, and about the day either side of each — and starting the sequence over every time
one comes back unavailable.

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
   day and a Slot, five Shortlists, the budget tracked against ₹8L. Shubhmangal Lawns sits in
   **Across the wedding**, above the Functions, priced once, with
   *26 Nov · Haldi* and *27 Nov · Wedding* listed inside its card — one arrangement, never repeated
   under each day.

**Edge case — no clean Block.** The app shows the collision explicitly and lets her swap Vendors until
one clears. It does not rank Blocks by partial availability and it does not hide the conflict behind
per-Listing badges.

**Failure — she changes her mind about the Block after agreeing with someone.** Changing the Chosen
Block **cancels every Agreement made against it**. She is told that, in those words, naming what will
be cancelled, before she can proceed. The cancellations record on both profiles as neutral numbers.

### Flow 2 — Dattatray finds out what the platform is actually worth to him (UJ-2)

**UJ-2** (`prd.md:94`). He is a Founding Vendor at ₹0, verified in person, with two Spaces — an
800-capacity lawn and a 300-capacity AC hall — and one login, on a phone.

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

### Flow 3 — Rutuja and Dattatray put it in writing, and the reviews become worth reading (UJ-3)

**UJ-3** (`prd.md:121`). Entry: both in the same Enquiry thread, the lawn agreed at ₹2.4L all-in, no
money through the platform and none coming.

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

### Flow 4 — Kiran verifies a lawn, opens a Service, and takes a fraud off the platform (UJ-4)

**UJ-4** (`prd.md:148`). Entry: signed in as Admin. Dattatray has self-registered, built his Listing
and submitted it; it is visible to nobody. Her surface is Frappe Desk — there is no console designed
here (AD-2) — but four of her actions land on surfaces that are.

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
4. **The next town needs a Service the catalogue does not carry — Mehndi Artist.** She configures its
   declarations in Frappe Desk (`prd.md:157`); its fields and its behaviour are a developer's work, so
   the Service ships on the next release. **This step lands on no designed surface, deliberately.**
   Its only visible consequence is that the category grid in that Place grows by one, because the grid
   renders the configured catalogue and never a fixed six. The Family app is not versioned by it —
   Services are data (AD-8), and `api/family/v1/` does not move.
5. A complaint arrives about a decorator with a lifted portfolio.
6. **Climax.** She removes him. The removal carries her name, the ground and the date, and cannot be
   erased. **On the Family side** this is the one route out of discovery that adds a step: every
   Family holding an Agreement with him is told **that the Vendor was removed** — not merely that a
   listing is gone — and asked to find another decorator. The platform does not cancel their
   Agreements. A Family who ends hers is **not counted for it**; she did nothing.
7. **Resolution.** His Reviews stay published. Removal does not erase a record.

Removal grounds are narrow and closed: fraud, falsified Verification, stolen or misrepresented
portfolio, impersonation. **Never service quality** — that is answered by Reviews alone. There is no
complaint pipeline, no standing score and no automated delisting.

### Flow 5 — Vasant kaka replies in fifteen seconds, and finds his own daughter's wedding (UJ-5)

**UJ-5** (`prd.md:172`). Entry: a WhatsApp message from Rutuja's own number. He is not a user, has
never heard of the product, and is marrying his own daughter off next spring — which is the whole
point of step 7.

1. The message arrives **from Rutuja's own number** — because the platform never messages a
   Guest — carrying the invitation and a link. It is from family, so he reads it rather than ignoring
   it.
2. He taps. The link preview — image, title, description — was composed by the platform, and this is
   the platform's **principal public surface**: for most people who ever see Vivah Spot, this is the
   whole product.
3. He lands on a page Vivah Spot hosts. Omkar and Snehal, the 27th, the lawn on the Ahmednagar road,
   the three Functions and their times. No account. No install. No sign-in. No cookie wall.
4. **He taps *Yes*, and the count appears beneath it** — `{components.stepper-count}`, already reading
   **four**, because Rutuja recorded the Deshmukh household as four when she built the list. He is one
   of four travelling, so he changes nothing and confirms. Had she written three, this is the one
   screen in the product where that gets corrected by the person who actually knows.
5. **He sees nothing else.** Not the guest list. Not who else has replied. Not the budget. Not the
   Vendors. Not anything about the Wedding beyond his own invitation and his own answer. His answer
   becomes his recorded answer in place, with the date it was recorded, and it says he may change it
   from the same link.
6. **Climax.** In Rutuja's Workspace the confirmed count moves — **beside her stated number, never
   over it.** The count is hers, not the platform's.
7. **Resolution, and the only growth channel designed into the product** (`prd.md:183`). At the foot,
   below his answer, one quiet line for someone planning a wedding of their own — and one discreet
   line of attribution in the page frame, never inside the invitation artwork, never on a physical
   card, never removable and never sold, because a Family pays nothing for anything. **Tapping the
   quiet line starts a Wedding of his own**, landing on the same first-run Home every Creator sees:
   the shop, fully browsable, with the blank invitation card on top. **It carries exactly one thing
   from the invitation he just answered — his mobile number, which he entered nowhere.** It carries
   **no couple names, no dates, no Place, no Vendors and nothing of Omkar and Snehal's Wedding**: he
   was a Guest there and a Guest sees his own invitation and his own answer, and starting a Wedding
   does not widen that. He consented directly, by choosing to be there, which is a materially better
   footing than his number having been uploaded on his behalf. `[ASSUMPTION]` **whether even the
   number carries across is a consent question, not a convenience one** — if it does, the sign-in
   screen shows it pre-filled and says where it came from, so nothing is silently inherited.

**Edge case — the forwarded link.** His link is individual and cannot be altered to reach anyone
else's. A relative who was never invited has a different route: the guest form, whose submissions
arrive as **suggestions Rutuja accepts or dismisses**. A dismissed submission is erased at once, and a
submitter never sees the guest list or anything else.

**Failure — the reply does not send.** His answer and his count stay on screen and stay editable, and
the page says plainly that it did not send and that nothing was lost. **The confirmation state is
never shown until the platform has actually recorded it** — a Guest who believes he has replied and
has not is the one failure this page cannot afford, because he has no account, no app and no route to
ask.

---

## Open Questions

**Closed since the last revision, and recorded so nobody reopens them.** The **Span** pattern
(*Across the wedding*, one card, days inside — `.memlog.md:100`); the **availability signal**'s three
treatments and its Set B icon (`:101`, `:102`); **cold load** (skeletons — `:104`); the **vendor
calendar** mark (a count, not a texture — `:106`); the **guest count control** (revealed after *Yes*,
pre-filled — `:107`); the **phone month grid** (seven columns at 40×40, the one bounded tap-target
exception — `:116`); and the **empty-state anatomy**, which was Open Question 3 and is now a component
with per-surface states specified above. The **Family app's five PRD amendments** are made and
committed. None of these is open.

1. **Inside the vendor portal's other three destinations.** The landing surface, its two lenses, the
   four-destination bar, Performance's home for FR-31, and the in-Grace and post-Grace states are all
   decided. What is not: the **screen count and editing model** inside Listings and Performance. The
   density, column count and table treatment above 768px are a **visual** question and live in
   `DESIGN.md`'s Open Questions, not here. Also open: whether the invitation-card motif has any
   vendor-side counterpart — it is a Family object and nothing has claimed one.
2. **The strings inside the empty states.** The anatomy is closed and every surface that can be empty
   now has a specified state. What each one *says* is not written, and it is the half that decides
   whether an empty screen reads as a dead end or as a route.
3. **The growth line: its wording, and what it carries.** The line's position is decided (below the
   answer, never a modal) and its destination is decided (the first-run Home). Two things are not: the
   **wording**, and whether the Guest's mobile number travels with him into his own sign-in. It is
   tagged `[ASSUMPTION]` in Flow 5 that it may, shown pre-filled and attributed — and it is a consent
   question, not a convenience one.
4. **The guest form's own composition, and the link preview's image.** The invitation/RSVP page is
   decided; the guest form is not. The preview image is tagged `[ASSUMPTION]` as a rendering of the
   invitation card, and it is the platform's principal public impression.
5. **Whether the Family also gets WhatsApp.** Push is decided and scoped to six events. Whether
   WhatsApp backs it up when push is refused or the app is uninstalled is a cost and positioning
   call, tagged `[ASSUMPTION]` as *no* in Channels and Notification Routing.
6. **Whether browsing requires sign-in.** The first-run shape is decided — look around first, the
   blank invitation card invites her in, three acts require a Wedding. What is tagged
   `[ASSUMPTION]` and needs confirming is that browsing works *signed out*, which deviates from
   UJ-1's stated entry state of "new install, signed in with phone and OTP".
7. **Guests appearing in published photographs.** The Real Weddings surface is decided — public and
   indexed, plus in-app. FR-66 stops Guests being named or tagged, but nothing in the sources
   addresses a Guest's face in an uploaded image, or what a Guest who objects can do. Tagged
   `[ASSUMPTION]` that the Family confirms it holds the right to publish. **Reels sharpen this**: a
   photograph catches a few faces, a clip catches a room.
8. **Where Real Weddings and Reels sit on Home, and how long a clip may be.** Both now have an IA row
   with a `Reached from` value, and both values are tagged `[ASSUMPTION]` — no source places them. A
   length cap is likewise unset, and without one *reels* becomes video hosting.
9. **Where the Family writes her own account, and how long it can be.** How she *learns* of the
   record is decided, as is where it lives. FR-47 gives her "their own account of the engagement" as
   her only recourse but never says whether it is per-answer or per-Vendor, whether it has a length,
   or whether a Vendor can respond to it — which, if they could, would reopen the dispute §7.2
   excludes.
10. **Whether the review table may offer to lift a phone number out of a pasted line.** The import
    rule is decided — one line, one household, nothing parsed. The per-row offer is tagged
    `[ASSUMPTION]`; without it she retypes every number she already pasted, with it the importer is
    slightly cleverer than the decision intended.
11. **Whether the Featured band sits above or below the organic results.** The band's marking is
    decided — heading, mandatory identifying line, per-card `{components.badge-paid}`, bounded
    container, no reliance on colour. FR-20 keeps the band out of the organic ordering but never says
    where it goes; `above` is tagged `[ASSUMPTION]`.
12. **Whether Pandit / Priest is in the launch catalogue.** Not a design question — the Service
    catalogue is AD-8 configuration and nothing here hardcodes it. It is a business call about supply
    and verification, and it changes nothing in this document either way. Invitations is already
    resolved at `prd.md:466`.
13. **What the amendments did not reach.** FR-10, FR-68, NFR 5.10, FR-65's video clause and AD-34's
    banned word are all amended and committed (`76399ff`, `22167c6`, `7d7ed5f`, `e80b056`). Still
    outstanding: the **architecture spine** assumes Workspace-first throughout and was not revisited;
    the **Scope Document's §11** still excludes anything unlisted, which now includes video; and
    `apps/mobile/src/constants/theme.ts` remains the unmodified Expo starter palette imported by
    eight live modules, so the app renders off-brand whatever these documents say.
