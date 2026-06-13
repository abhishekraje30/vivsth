# VivahSathi — Project Scope Document

> **Modular Wedding-Services Marketplace · India**

---

## 0. Document Control

| Field | Detail |
|---|---|
| **Project** | VivahSathi — Wedding Management & Services Marketplace |
| **Prepared by** | Abhishek Bankar — Anvayro Organisation |
| **Prepared for (Client)** | Pravin Revale |
| **Version** | 1.0 (Draft for review) |
| **Date** | June 2026 |
| **Status** | Awaiting client sign-off |

> _Placeholders in italics/brackets are for you to fill before sending._

---

## 1. Project Overview

**VivahSathi** is a **modular wedding-services marketplace** for India. Instead of opaque, all-or-nothing wedding planners, VivahSathi lets a couple/family **assemble their entire wedding service-by-service, within their budget** — choosing, for each service, between **VivahSathi's own (first-party) offerings and verified third-party vendors**.

- **North star:** a **hassle-free wedding** — transparency, trust, and one place to plan everything.
- **Launch market:** **Tier 4 / 3 / 2 cities**, beginning with **Shrirampur, Maharashtra**, built to scale city-by-city across India.
- **Two-sided platform:** couples/families on the demand side; vendors (venues, caterers, photographers, decorators, bands, and more) self-onboard on the supply side.

### Problem it solves
Today, planning a wedding means juggling 15+ fragmented, informal, word-of-mouth vendors with opaque pricing, hidden charges, no accountability, and constant fear of being cheated or let down on the day. VivahSathi replaces that chaos with a single, transparent, trustworthy platform.

---

## 2. Objectives & Goals

1. Deliver a **hassle-free, transparent** wedding-planning experience for Tier 4/3/2 India.
2. Build a **scalable, multi-city, multi-vendor marketplace** on a single repeatable engine.
3. Enable **vendor self-onboarding** to grow supply asset-light.
4. Establish **trust mechanisms** (verified vendors, escrow, guarantees) as the core differentiator.
5. Lay the foundation for **multiple revenue streams** (commissions, packages, add-ons, value-added partners). _(Commercial model to be detailed separately.)_

---

## 3. Target Users & Roles

| Role | Description |
|---|---|
| **Couple / Family (Customer)** | Plans and books the wedding; the primary demand-side user. Often elder-led; low-to-medium digital literacy → must be simple. |
| **Vendor (Supply)** | Multi-type service providers (venue owners, caterers, photographers, decorators, band/baraat, etc.) who self-onboard, list offerings, manage availability, and fulfil bookings. |
| **Admin / Operations** | VivahSathi staff: vendor verification, catalog management, dispute & payment handling, content moderation, analytics. |
| **Wedding Manager** | A VivahSathi-side coordinator who can own and run a customer's wedding end-to-end (assisted/managed tier). |

---

## 4. Solution Architecture

VivahSathi is built as **three layers** over a single reusable "service engine":

**① Wedding Workspace** — *the hassle-free layer (the moat)*
The customer's command centre: Wedding → Functions → unified dashboard, budget tracker, guest management, checklist/timeline, wedding manager, unified payments/escrow, reminders.

**② Service Marketplace** — *the catalog*
~50+ service modules, each an instance of the same engine, attached **per function**, offering first-party + third-party options.

**③ Vendor Supply** — *self-onboarding*
Multi-type vendors list portfolios, packages, pricing and date-wise availability, and manage bookings through their own dashboards.

### The "Service Engine" (one engine × N services)
Every service module follows the **same 10-part blueprint** — so new services are configured, not re-built:

1. Taxonomy + filters
2. Three supply shelves: **first-party / verified-managed / marketplace**
3. Budget tiers
4. Listing card data (price, photos, ratings, capacity, badge, service cities, availability calendar)
5. Discover → compare → customize → instant quote → book
6. Escrow payments + digital contract
7. Vetting + verified badges + reviews + backup/quality guarantee
8. Manager-supported, day-of fulfilment
9. Revenue levers (commission + first-party margin + upsells)
10. City-scoped replication (scaling engine)

---

## 5. Functional Scope

### 5.1 Customer Application
- **Auth & onboarding** (phone/OTP; WhatsApp-friendly)
- **Create Wedding** (parent object): couple names, date(s)/muhurat, city, guest count, budget — **auto-saved as draft**, resume anytime
- **Functions layer:** add functions (Haldi, Mehndi, Sangeet, Wedding, Reception + custom), each with its own date/time, venue, and guest count
- **Service discovery:** search by name OR location / detect current location; rich filters; **date-availability pre-applied** from the Wedding; availability badges
- **Booking flow:** browse → compare → customize → instant quote → book → **token / escrow payment**
- **Per-service modules** (see Catalog)
- **Dashboard:** all functions, all booked services, statuses, combined cost
- **Budget tracker** (planned vs actual across all services)
- **Guest management** (list, RSVP, invitations)
- **Checklist & timeline** (muhurat-aware)
- **Wedding manager / support chat**
- **Payments & escrow** (token, milestones, release on delivery)
- **Reviews & ratings**
- **Notifications & reminders** (app + SMS/WhatsApp)

### 5.2 Vendor Portal
- **Self-onboarding & KYC/verification**
- **Service listings** (service-specific fields, photos/portfolio, packages, pricing)
- **Availability calendar** (block/open dates; slot/bandwidth management)
- **Booking requests** (accept / decline / fulfil; Enquire → Site visit → Token → Confirm spectrum)
- **Payouts** (released post-delivery via escrow)
- **Reviews management**
- **Dashboard & basic analytics**

### 5.3 Admin / Operations Panel
- **Vendor verification & KYC** approvals
- **Catalog / category management**
- **Booking & dispute management**
- **Payments, escrow & payout management**
- **Wedding Manager assignment**
- **Content / reviews moderation**
- **Reports & analytics**

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
Couple's wedding app/website · Digital invite + RSVP + QR check-in · Wedding insurance · Wedding loan / EMI · Gift registry · Trousseau & gift hampers

### Designed service specifications (frozen)
The following five are fully specified (config + features + signature differentiators + marketing pain-points) in the brainstorm artifact `_bmad-output/brainstorming/brainstorming-session-2026-06-02-0603.md`:

| Service | Signature features |
|---|---|
| **Venue** | All-in transparent pricing · availability calendar/badge · vendor-policy field · verified photos · digital contract · site visit/virtual tour |
| **Catering** | Per-function · "no shortage, no waste" headcount calculator · all-in per-plate · freshness guarantee · tasting · leftover-donation |
| **Photography** | Bundled photo+video · **escrow-backed on-time delivery guarantee** · named-shooter lock · all-in deliverables · backup/redundancy · privacy toggle |
| **Décor & Mandap** | Verified real-event portfolios · all-in line-item pricing · fresh-flower guarantee · auto venue-aware · on-time setup guarantee |
| **Band Baaja Baraat** | Baraat builder · all-in pricing · **no on-the-spot-demands guarantee** · vetted crews · on-time arrival _(metro compliance deferred)_ |

---

## 7. Cross-Cutting / Platform Features

- **Search & filters** (location, date availability, budget, capacity, type, ratings)
- **Availability calendars** (per vendor/team)
- **Escrow payments** (token, milestones, release-on-delivery) + digital contracts
- **Budget tracker** (across all services)
- **Guest management** (list, RSVP, invitations)
- **Reviews & verified badges**
- **Wedding manager / assisted booking**
- **Notifications** (app + SMS/WhatsApp)
- **Multi-city** support (city-scoped catalog)
- **Multi-language** (English + regional — phased)

---

## 8. Key Differentiators (Trust Spine)

Consistent across every service — and what a local contractor or plain directory **cannot** replicate:

- **Transparent all-in pricing** (no hidden charges)
- **Escrow + guarantees** (on-time delivery, backup vendor, no-shortage-no-waste, no on-the-spot demands, on-time setup)
- **Verified vendors, real portfolios, real reviews**
- **Venue-awareness** (services auto-adapt to the chosen venue)
- **Single accountable wedding manager**

---

## 9. Non-Functional Requirements

| Area | Requirement |
|---|---|
| **Platform** | _Assumption:_ Mobile-first (**Android-first** for Tier 4/3/2) + responsive web for customers; web + mobile for vendors; web for admin. _(Confirm with client.)_ |
| **Usability** | Simple, low-digital-literacy-friendly, vernacular-ready, WhatsApp-centric |
| **Performance** | Fast search & listing on low-bandwidth/low-end devices |
| **Scalability** | City-scoped, horizontally scalable for multi-city growth |
| **Security** | Secure payments/escrow, KYC data protection, role-based access |
| **Reliability** | High availability around peak muhurat seasons |
| **Localization** | English at launch; regional languages phased |

---

## 10. Phase-Wise Delivery Plan

> Indicative phasing. Timelines depend on team size and are to be finalised jointly.

### Phase 1 — MVP / Launch *(Shrirampur + nearby Tier 4/3/2)*
**Goal:** prove the engine end-to-end in one city.
- Platform foundation: auth, **Wedding + Functions**, search/discovery, **escrow payments**, reviews, notifications
- **Customer app + Vendor portal + Admin panel** (core)
- **5 launch services:** Venue, Catering, Photography, Décor & Mandap, Band Baaja Baraat
- Core workspace: dashboard, **basic budget tracker**, **basic guest list**
- Single city

### Phase 2 — Service & Workspace Expansion
**Goal:** broaden the catalog and deepen "hassle-free."
- New services: Makeup & Beauty, Mehndi, Invitations (cards + digital + RSVP), Pandit/Guruji, DJ/Sound, Lighting/AV
- **Wedding Manager** (assisted/managed bookings)
- **Packages / bundles** (pre-built multi-service shortcuts)
- Full **guest management** (RSVP, accommodation, transport), **checklist & timeline**
- **Multi-city** rollout across Tier 4/3/2 towns

### Phase 3 — Full Catalog + Value-Added Revenue
**Goal:** complete the ecosystem and open new revenue lines.
- Remaining services: Kundali/astrology, choreographer, LED/AV, live artists, trousseau/gifts/favours, social-media/teaser, cleaning, calligraphy, honeymoon, marriage registration, accommodation & transport at scale
- **Add-on partners:** financing/EMI, insurance, gift registry
- **Live streaming**, social features

### Phase 4 — Metro Expansion & Premium
**Goal:** move up-market and up-scale.
- **Compliance layer** (fireworks/permits/noise-curfew/animal-welfare)
- Premium venues/vendors, advanced infra, multi-language at scale

---

## 11. Out of Scope (Current Engagement)

- Metro-grade regulatory/compliance machinery (Phase 4)
- Any service or feature not explicitly listed above
- Commercial/marketing operations, vendor acquisition (business-side, not product)
- Custom integrations not listed in Assumptions
- _Anything new = a Change Request (see §14)_

---

## 12. Assumptions & Dependencies

**Client provides:**
- Branding, content, legal T&Cs/privacy policy
- Business registration & payment-gateway merchant account
- Initial vendor pipeline for onboarding
- Sign-off at each phase gate

**Third-party services:**
- Payment gateway + escrow (e.g., Razorpay/PayU)
- SMS / WhatsApp Business API
- Maps & geolocation (e.g., Google Maps)
- Cloud hosting & push notifications
- Media storage/CDN

---

## 13. Deliverables

- **Customer application** (Android-first mobile + responsive web)
- **Vendor portal** (web + mobile)
- **Admin / Operations panel** (web)
- UI/UX designs, source code, technical documentation
- Deployment to client-owned cloud + handover

---

## 14. Change Control

Any requirement outside this document will be handled as a **Change Request**: documented, estimated (effort/cost/timeline), and approved before work begins. This keeps scope, budget, and timeline predictable for both sides.

---

## 15. Acceptance & Sign-Off

| | Name | Signature | Date |
|---|---|---|---|
| **Client** | Pravin Revale | | |
| **Service Provider** | Abhishek Bankar (Anvayro Organisation) | | |

---

_Derived from the VivahSathi product brainstorm. For full service-level specifications and research-backed marketing pain-points, see `_bmad-output/brainstorming/brainstorming-session-2026-06-02-0603.md`._
