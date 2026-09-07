# Vivah Spot — Project Scope Document

> **Modular Wedding-Services Marketplace · India**

---

## 0. Document Control

| Field | Detail |
|---|---|
| **Project** | Vivah Spot — Wedding Management & Services Marketplace |
| **Prepared by** | Abhishek Bankar — Anvayro Organisation |
| **Prepared for (Client)** | Pravin Revale |
| **Version** | 2.0 (Draft for review) |
| **Date** | August 2026 |
| **Status** | Awaiting client sign-off |

> _Placeholders in italics/brackets are for you to fill before sending._

### Revision note — what changed in v2.0

Version 1.0 assumed a **commission + escrow** business model: couples would pay through the platform, funds would be held, and Vivah Spot would take a cut and enforce delivery guarantees against the money it held.

**Version 2.0 replaces this with a vendor subscription model.** Vendors pay a recurring listing fee; couples pay Vivah Spot nothing; and no booking money passes through the platform at any point. Deals are settled directly between the couple and the vendor.

Sections materially revised: **§2** (objectives), **§2A** (new — revenue model), **§4** (service engine blueprint), **§5** (all three applications), **§6** (frozen service specifications), **§7** (platform features), **§8** (trust spine — substantially rewritten), **§10** (phasing), **§11** (out of scope), **§12** (assumptions).

> ⚠️ **Downstream artifact notice:** the brainstorm artifact `_bmad-output/brainstorming/brainstorming-session-2026-06-02-0603.md` predates this decision and still describes escrow-backed guarantees. It is retained as a historical record of the product exploration; where it conflicts with this document, **this document governs**.

Technical decisions arising from this scope are recorded separately in `VivahSpot-Tech-Stack.md`.

---

## 1. Project Overview

**Vivah Spot** is a **modular wedding-services marketplace** for India. Instead of opaque, all-or-nothing wedding planners, Vivah Spot lets a couple/family **assemble their entire wedding service-by-service, within their budget** — discovering, comparing and shortlisting verified vendors for each service in one place.

- **North star:** a **hassle-free wedding** — transparency, trust, and one place to plan everything.
- **Launch market:** **Tier 4 / 3 / 2 cities**, beginning with **Shrirampur, Maharashtra**, built to scale city-by-city across India.
- **Two-sided platform:** couples/families on the demand side; vendors (venues, caterers, photographers, decorators, bands, and more) self-onboard on the supply side.
- **Free for couples.** The platform is funded by vendor subscriptions, not by taking a cut of the wedding.

### Problem it solves
Today, planning a wedding means juggling 15+ fragmented, informal, word-of-mouth vendors with opaque pricing, hidden charges, no accountability, and constant fear of being cheated or let down on the day. Vivah Spot replaces that chaos with a single, transparent, vetted platform — plus a planning workspace that keeps the whole wedding in one view.

---

## 2. Objectives & Goals

1. Deliver a **hassle-free, transparent** wedding-planning experience for Tier 4/3/2 India, free to couples.
2. Build a **scalable, multi-city, multi-vendor marketplace** on a single repeatable engine.
3. Enable **vendor self-onboarding** to grow supply asset-light.
4. Establish **trust mechanisms** — vendor vetting, verified real portfolios, publicly declared commitments, honest reviews, and removal of vendors who fail — as the core differentiator. _(See §8.)_
5. Build a **predictable subscription revenue base** from vendors, and prove its value with hard lead data. _(See §2A.)_

---

## 2A. Revenue Model *(new in v2.0)*

**Vendors pay to be listed. Couples pay nothing. Vivah Spot never handles booking money.**

| Aspect | Detail |
|---|---|
| **Who pays** | Vendors (venues, caterers, photographers, decorators, bands, etc.) |
| **What for** | The right to list services, appear in search, and receive enquiries from couples |
| **Billing cycle** | Prepaid plan period (6 or 12 months) at launch; auto-renew mandates considered later |
| **Collection** | Online payment via the vendor web portal; GST invoice issued per payment |
| **Couple pays** | ₹0. No booking fee, no convenience fee, no commission. |
| **Booking money** | Settled **directly** between couple and vendor, outside the platform |

### Plan structure (tiers indicative; pricing is a client decision)

| Tier | Intent |
|---|---|
| **Founding Vendor (₹0)** | Launch cohort in Shrirampur, fixed expiry date. Builds initial supply before demand exists. |
| **Basic** | Listing, standard photo allowance, unlimited enquiries |
| **Featured** | Priority placement in search, larger portfolio allowance, multiple service categories |

### Why subscription rather than commission

- **No leakage problem.** A wedding is a once-in-a-lifetime, high-value purchase. Under a commission model, both sides have a strong incentive to complete the deal offline and bypass the platform — and there is no repeat-purchase relationship to discourage it. A subscription is not avoidable this way.
- **No fund custody.** Holding customer money pending delivery requires an RBI Payment Aggregator licence and the compliance machinery around it. Not holding money removes that exposure entirely.
- **Predictable revenue** with no per-transaction reconciliation, refunds, or payment disputes.
- **Materially faster to build**, which matters for a single-city launch on a fixed timeline.

### The commercial risk this creates

A vendor in Shrirampur will not pay a listing fee before seeing couples on the platform. The launch sequence must therefore be **free listings → build couple demand → begin charging**. The ₹0 Founding Vendor tier exists for exactly this, and the vendor lead dashboard (§5.2) exists to make the eventual conversion to paid defensible with data.

---

## 3. Target Users & Roles

| Role | Description |
|---|---|
| **Couple / Family (Customer)** | Plans the wedding; the primary demand-side user. Often elder-led, low-to-medium digital literacy → must be simple. Uses the platform free of charge. |
| **Vendor (Supply)** | Multi-type service providers (venue owners, caterers, photographers, decorators, band/baraat, etc.) who self-onboard, subscribe, list offerings, manage availability, and respond to enquiries. **The paying customer.** |
| **Admin / Operations** | Vivah Spot staff: vendor verification, subscription & billing management, catalog management, content moderation, complaint handling, analytics. |
| **Wedding Manager** | A Vivah Spot-side coordinator who can assist a customer's planning. _(Phase 2; commercial treatment to be decided — see §11.)_ |

---

## 4. Solution Architecture

Vivah Spot is built as **three layers** over a single reusable "service engine":

**① Wedding Workspace** — *the hassle-free layer (the moat)*
The customer's command centre: Wedding → Functions → unified dashboard, budget tracker, guest management, checklist/timeline, shortlists, enquiry tracking, reminders.

> **Elevated in v2.0.** With no escrow or transaction layer, the Workspace is the primary reason a couple uses Vivah Spot rather than a search engine or a plain directory. It is a core deliverable, not a companion feature.

**② Service Marketplace** — *the catalog*
~50+ service modules, each an instance of the same engine, attached **per function**, listing verified vendors.

**③ Vendor Supply** — *self-onboarding + subscription*
Multi-type vendors subscribe, list portfolios, packages, pricing and date-wise availability, and manage incoming enquiries through their own dashboards.

### The "Service Engine" (one engine × N services)
Every service module follows the **same 10-part blueprint** — so new services are configured, not re-built:

1. Taxonomy + filters
2. Supply shelves: **verified** / **standard** listings _(first-party shelf deferred — see note)_
3. Budget tiers
4. Listing card data (price, photos, ratings, capacity, badge, service cities, availability calendar)
5. Discover → compare → shortlist → **enquire** → vendor responds
6. **Vendor commitments published on the listing** + downloadable quote/agreement template for the parties to use offline
7. Vetting + verified badges + reviews + delisting for non-performance
8. Enquiry tracking and reminders in the customer's Workspace
9. Revenue lever: **vendor subscription tier** (visibility and allowances scale with plan)
10. City-scoped replication (scaling engine)

> **Note on first-party offerings.** v1.0 envisaged Vivah Spot supplying some services itself. Under a subscription model this puts the platform in direct competition with the vendors funding it, which undermines both the revenue base and the neutrality of search ranking. **First-party supply is deferred out of the current engagement** and should be reconsidered only alongside a deliberate change of commercial model.

---

## 5. Functional Scope

### 5.1 Customer Application *(free to use)*
- **Auth & onboarding** (phone/OTP; WhatsApp-friendly)
- **Create Wedding** (parent object): couple names, date(s)/muhurat, city, guest count, budget — **auto-saved as draft**, resume anytime
- **Functions layer:** add functions (Haldi, Mehndi, Sangeet, Wedding, Reception + custom), each with its own date/time, venue, and guest count
- **Service discovery:** search by name OR location / detect current location; rich filters; **date-availability pre-applied** from the Wedding; availability badges
- **Compare** shortlisted vendors side by side
- **Enquiry flow:** browse → compare → shortlist → **send enquiry / reveal contact** → vendor responds → the couple deals with the vendor directly
- **Per-service modules** (see Catalog)
- **Dashboard:** all functions, all shortlists and enquiries, statuses, estimated cost
- **Budget tracker** (couple-entered planned vs actual across all services)
- **Guest management** (list; RSVP and invitations phased)
- **Checklist & timeline** (muhurat-aware)
- **Reviews & ratings** (after an enquiry reaches completion)
- **Notifications & reminders** (app + SMS/WhatsApp)

> **Removed in v2.0:** in-app booking payments, token payments, escrow, milestone releases, and payment status tracking. The platform records an *enquiry*, not a *transaction*.

### 5.2 Vendor Portal *(responsive web)*
- **Self-onboarding & KYC/verification** (identity and business verification for the verified badge; **no payout/bank KYC required**)
- **Subscription & billing:** plan selection, online payment, GST invoice download, renewal reminders, expiry/grace handling
- **Service listings** (service-specific fields, photos/portfolio, packages, all-in pricing)
- **Published commitments** (delivery timelines, inclusions, no-hidden-charges declaration) shown on the public listing
- **Availability calendar** (block/open dates; slot/bandwidth management)
- **Enquiry inbox** (respond, mark contacted / site visit / won / lost)
- **📊 Lead dashboard — core deliverable:** listing views, contact reveals, enquiries received, response time, conversion. This is how a vendor sees the value of the subscription and decides to renew.
- **Reviews management**

> **Removed in v2.0:** payouts, settlement reports, escrow release. **Added:** subscription management and the lead dashboard.

### 5.3 Admin / Operations Panel
- **Vendor verification & KYC** approvals
- **Subscription & billing management:** plans, pricing, manual overrides, comps, expiry, GST invoicing, revenue reporting
- **Catalog / category management** (configure new services without a code release)
- **Enquiry oversight** and complaint handling
- **Vendor standing & delisting** — the primary enforcement lever (§8)
- **Content / reviews moderation**
- **Reports & analytics** (supply, demand, leads generated, subscription revenue, churn)

---

## 6. Service Catalog (Full Vision)

Grouped across the wedding lifecycle. **★ = designed in detail ("frozen") in this engagement.**

### Pre-Wedding
Consultation & planning · Budget planning · Muhurat/date (guruji) · Invitation cards · Digital invite + RSVP · Sakharpuda · Kelvan · Haldi · Mehndi · Sangeet/DJ night · Devak/Ganesh puja · Pre-wedding shoot · Kundali matching/astrology

### Wedding Day
**★ Venue** · **★ Catering** · **★ Décor & Mandap** · **★ Photography (Photo+Video)** · **★ Band Baaja Baraat** · Tent/seating · Power backup · Cooling/heating · Mobile toilets · Guruji + pooja samagri · DJ / orchestra · Anchor/emcee · Makeup & beauty · Saree draping · Attire (Paithani/sherwani) · Jewellery (rental) · Guest accommodation · Guest transport · Hospitality/ushers · Security · Parking/valet · Return gifts (aaher) · On-ground event management · Choreographer · LED/AV/sound · Live artists (caricature/magician/kids' zone)

### Post-Wedding
Reception · Vidaai/Pathavni · Griha Pravesh / Satyanarayan puja · Album & film delivery · Honeymoon planning · Marriage registration assistance · Thank-you & gift tracking · Post-event cleaning & waste management · Social media (hashtag/teaser/reels)

### Digital & Money (cross-cutting)
Couple's wedding app/website · Digital invite + RSVP + QR check-in · Wedding insurance · Gift registry · Trousseau & gift hampers

### Designed service specifications (frozen — revised in v2.0)

Signature features are restated as **published vendor commitments**, verified where verifiable and enforced by reputation and delisting rather than by withheld payment.

| Service | Signature features |
|---|---|
| **Venue** | All-in transparent pricing · availability calendar/badge · vendor-policy field (outside caterer allowed?) · **verified real photos** · site visit / virtual tour request · downloadable agreement template |
| **Catering** | Per-function planning · "no shortage, no waste" **headcount calculator** · all-in per-plate pricing · tasting request · published hygiene & freshness commitment |
| **Photography** | Bundled photo+video packages · **published delivery timeline, tracked and reviewed** · named-shooter lock · all-in deliverables list · privacy toggle |
| **Décor & Mandap** | **Verified real-event portfolios** (our strongest anti-fraud check) · all-in line-item pricing · auto venue-aware sizing · published setup-time commitment |
| **Band Baaja Baraat** | Baraat builder · all-in pricing · **published "no on-the-spot demands" declaration** with complaint reporting that affects vendor standing · vetted crews |

> **Changed from v1.0:** the escrow-backed *guarantees* (on-time delivery guarantee, freshness guarantee, no-shortage-no-waste guarantee, on-time setup guarantee, no-on-the-spot-demands guarantee) are restated as **vendor-declared, publicly published commitments**. Vivah Spot verifies what it can verify, publishes the declaration, collects reviews against it, and removes vendors who repeatedly fail. It does **not** underwrite the outcome financially. Marketing copy must reflect this distinction. _(See §8.)_

---

## 7. Cross-Cutting / Platform Features

- **Search & filters** (location, date availability, budget, capacity, type, ratings)
- **Availability calendars** (per vendor/team, vendor-maintained)
- **Compare** shortlisted vendors
- **Enquiry & lead tracking** (both sides see the same thread and status)
- **Vendor subscriptions** (plans, payment, GST invoicing, expiry & grace, plan-based visibility and allowances)
- **Budget tracker** (couple-entered, across all services)
- **Guest management** (list; RSVP, invitations phased)
- **Reviews & verified badges**
- **Notifications** (app + SMS/WhatsApp)
- **Multi-city** support (city-scoped catalog)
- **Multi-language** (English + regional — phased)

> **Removed in v2.0:** escrow payments, milestone releases, digital contracts as a platform-enforced instrument, and platform-mediated payment disputes.

---

## 8. Key Differentiators (Trust Spine — rewritten in v2.0)

In v1.0 the trust spine rested on money: Vivah Spot held the funds, so it could compel performance. Without escrow, trust must be built **before** the transaction rather than enforced during it. This is a weaker instrument, honestly stated — but it is the model every successful Indian listing platform operates on, and it is still far beyond what a plain directory or a word-of-mouth contractor offers.

### What Vivah Spot still guarantees

| Mechanism | How it works |
|---|---|
| **Vetted supply** | Vendors are identity- and business-verified before listing. Not everyone gets on. |
| **Verified real portfolios** | Photos are checked against real events. Directly attacks the most common wedding-vendor fraud — showing work that isn't yours. |
| **Mandatory all-in pricing** | Publishing a complete, hidden-charge-free price is a **condition of listing**, not a courtesy. |
| **Published commitments** | Delivery timelines, inclusions and no-hidden-charge declarations are stated publicly and permanently on the listing — quotable back to the vendor. |
| **Honest reviews** | Reviews are tied to real enquiries and moderated, not open to anonymous posting. |
| **Venue-awareness** | Services auto-adapt to the chosen venue. Pure software; unaffected by the model change. |
| **Delisting** | A vendor who repeatedly breaks commitments loses their listing, their visibility, and their subscription. This is the enforcement lever. |
| **Free to couples** | No fee and no commission means the platform has no stake in any particular deal. **Position inside the organic results cannot be bought — by any tier, add-on or arrangement (PRD FR-20).** Paid placement exists and is sold by Tier, but it sits in a separate band, outside the organic ordering and labelled as paid. *(Amended 2026-09-06. This row previously read "search ranking is not for sale to the highest bidder on a per-deal basis"; PRD FR-20 requires that claim be struck here and from all marketing copy, because ranking IS sold — visibly, separately, and never inside the organic results.)* |

### What Vivah Spot no longer claims — and must not market

- ❌ Escrow or held payments of any kind
- ❌ Financial guarantee of on-time delivery, setup, or freshness
- ❌ Backup-vendor guarantee
- ❌ Refund or compensation for vendor non-performance
- ❌ Any liability for payments made directly between couple and vendor

> **Action required:** all customer-facing copy, the app UI, and the five frozen service specifications must be reviewed against this list before launch. A guarantee the platform cannot honour is worse for trust than no guarantee at all — and, if it induces a payment, is a legal exposure. Terms & conditions must state plainly that Vivah Spot is a listing and discovery platform and is not a party to any transaction between a couple and a vendor.

---

## 9. Non-Functional Requirements

| Area | Requirement |
|---|---|
| **Platform** | **Confirmed:** Android-first mobile app for customers; responsive web portal for vendors; web panel for admin. iOS deferred. |
| **Usability** | Simple, low-digital-literacy-friendly, vernacular-ready, WhatsApp-centric |
| **Performance** | Fast search & listing on low-bandwidth/low-end devices |
| **Scalability** | City-scoped, horizontally scalable for multi-city growth |
| **Security** | KYC data protection, role-based access, secure subscription payment handling |
| **Reliability** | High availability around peak muhurat seasons |
| **Localization** | English at launch; regional languages phased (Marathi first) |
| **Compliance** | GST-compliant invoicing for vendor subscriptions; T&Cs establishing non-party status (§8) |

---

## 10. Phase-Wise Delivery Plan

> Indicative phasing. Timelines depend on team size and are to be finalised jointly.

### Phase 1 — MVP / Launch *(Shrirampur + nearby Tier 4/3/2)*
**Goal:** prove the engine end-to-end in one city, with free listings building supply.
- Platform foundation: auth, **Wedding + Functions**, search/discovery, compare, **enquiry flow**, reviews, notifications
- **Customer app + Vendor portal + Admin panel** (core)
- **Vendor subscription system** — plans, online payment, GST invoicing, expiry/grace — shipped with the **₹0 Founding Vendor tier** active for the launch cohort
- **Vendor lead dashboard** — views, contact reveals, enquiries, conversion
- **5 launch services:** Venue, Catering, Photography, Décor & Mandap, Band Baaja Baraat
- **Wedding Workspace:** dashboard, budget tracker, guest list, checklist
- Single city

### Phase 2 — Service & Workspace Expansion
**Goal:** broaden the catalog, deepen "hassle-free," and convert the launch cohort to paid.
- **Begin charging** — Founding Vendor tier expires; conversion argued from lead-dashboard data
- New services: Makeup & Beauty, Mehndi, Invitations (cards + digital + RSVP), Pandit/Guruji, DJ/Sound, Lighting/AV
- **Wedding Manager** (assisted planning; commercial treatment to be decided)
- **Packages / bundles** (pre-built multi-service shortcuts)
- Full **guest management** (RSVP, accommodation, transport)
- Auto-renewal mandates (UPI Autopay) if renewal volume justifies it
- **Multi-city** rollout across Tier 4/3/2 towns

### Phase 3 — Full Catalog + Value-Added Revenue
**Goal:** complete the ecosystem and open new revenue lines.
- Remaining services: Kundali/astrology, choreographer, LED/AV, live artists, trousseau/gifts/favours, social-media/teaser, cleaning, calligraphy, honeymoon, marriage registration, accommodation & transport at scale
- **Additional vendor-side revenue:** featured placement, sponsored listings, lead-boost add-ons
- **Add-on partners:** insurance, gift registry
- **Live streaming**, social features

### Phase 4 — Metro Expansion & Premium
**Goal:** move up-market and up-scale.
- **Compliance layer** (fireworks/permits/noise-curfew/animal-welfare)
- Premium venues/vendors, advanced infra, multi-language at scale
- Re-evaluate transaction-based revenue (bookings/commission) only if brand trust and scale make fund custody viable

---

## 11. Out of Scope (Current Engagement)

- **Any handling of booking payments between couples and vendors** — no escrow, no token payments, no commission, no split settlement, no payouts
- **First-party service supply** by Vivah Spot (deferred — see §4 note)
- Metro-grade regulatory/compliance machinery (Phase 4)
- iOS application (deferred)
- Wedding Manager as a paid service — the commercial treatment is undecided; Phase 2 covers the coordination feature only
- Any service or feature not explicitly listed above
- Commercial/marketing operations, vendor acquisition (business-side, not product)
- Custom integrations not listed in Assumptions
- _Anything new = a Change Request (see §14)_

---

## 12. Assumptions & Dependencies

**Client provides:**
- Branding, content, **legal T&Cs/privacy policy — including the non-party disclaimer required by §8**
- Business registration, **GST registration**, and a payment-gateway merchant account **for collecting vendor subscriptions**
- **Subscription plan pricing** and the Founding Vendor cohort definition
- Initial vendor pipeline for onboarding, and the field capacity to verify vendors and portfolios in person
- Sign-off at each phase gate

**Third-party services:**
- Payment gateway for subscription collection (e.g. Razorpay)
- SMS / WhatsApp Business API
- Maps & geolocation
- Cloud hosting & push notifications
- Media storage/CDN

> **Removed in v2.0:** escrow provider, split-settlement/marketplace payment onboarding, and vendor bank-account/payout verification.

**Operational dependency:** the trust spine in §8 rests on *human* verification — someone must physically vet vendors and confirm portfolios. The platform provides the workflow; the client provides the people. Trust claims are only as good as this process.

---

## 13. Deliverables

- **Customer application** (Android mobile app)
- **Vendor portal** (responsive web, incl. subscription billing and lead dashboard)
- **Admin / Operations panel** (web)
- UI/UX designs, source code, technical documentation
- Deployment to client-owned cloud + handover

---

## 14. Change Control

Any requirement outside this document will be handled as a **Change Request**: documented, estimated (effort/cost/timeline), and approved before work begins. This keeps scope, budget, and timeline predictable for both sides.

> Reintroducing platform-handled payments, escrow, or commission is a **material change** affecting architecture, regulatory posture, and timeline. It cannot be absorbed as a minor revision.

---

## 15. Acceptance & Sign-Off

| | Name | Signature | Date |
|---|---|---|---|
| **Client** | Pravin Revale | | |
| **Service Provider** | Abhishek Bankar (Anvayro Organisation) | | |

---

_Derived from the Vivah Spot product brainstorm. For the original service-level explorations and research-backed marketing pain-points see `_bmad-output/brainstorming/brainstorming-session-2026-06-02-0603.md` — noting the precedence caveat in §0. For technology decisions see `VivahSpot-Tech-Stack.md`._
