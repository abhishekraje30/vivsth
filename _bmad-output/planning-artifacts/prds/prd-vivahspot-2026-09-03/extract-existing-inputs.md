---
title: Vivah Spot PRD — Extract of Existing Inputs
status: extract
created: 2026-09-03
purpose: Source-attributed extraction of all pre-existing planning material, for PRD authoring. Nothing here is invented; gaps are marked as gaps.
---

# Extract: Existing Inputs for the Vivah Spot PRD

## 0. Sources read

| Tag | Document | Date / version | Authority |
|---|---|---|---|
| `[SCOPE]` | `_bmad-output/planning-artifacts/VivahSpot-Scope-Document.md` | v2.0 Draft, August 2026, "Awaiting client sign-off" | **Governing document.** §0 states: where the brainstorm conflicts, "this document governs". |
| `[TECH]` | `_bmad-output/planning-artifacts/VivahSpot-Tech-Stack.md` | Decided August 2026 | Companion to SCOPE. Technology + data-model decisions. |
| `[BRAIN]` | `_bmad-output/brainstorming/brainstorming-session-2026-06-02-0603.md` | 2026-06-02 | **Historical record only.** Predates the revenue-model change; still describes escrow. Retained for service-level detail and research-backed pain points. |
| `[CODE]` | `apps/`, `packages/`, root static prototype (`index.html`, `vendor/`, `account/`, …) | scaffolded Aug 2026 | What actually exists. |

Note on file state: `[BRAIN]` is modified-uncommitted; the diff is purely the "VivahSathi" → "Vivah Spot" rename (8 lines). No content drift.

---

## 1. Product definition & positioning

- **What it is:** "a **modular wedding-services marketplace** for India. Instead of opaque, all-or-nothing wedding planners, Vivah Spot lets a couple/family **assemble their entire wedding service-by-service, within their budget** — discovering, comparing and shortlisting verified vendors for each service in one place." `[SCOPE §1]`
- **North star:** "a **hassle-free wedding** — transparency, trust, and one place to plan everything." `[SCOPE §1]`; restated in `[BRAIN — Confirmed Direction]` as "**Hassle-free wedding.** Every service config must defend itself against this."
- **Launch market:** "**Tier 4 / 3 / 2 cities**, beginning with **Shrirampur, Maharashtra**, built to scale city-by-city across India." `[SCOPE §1]`. `[BRAIN]` adds Shrirampur is the "founder's native place" and calls it a "Tier-3 town".
- **Two-sided:** couples/families on demand; vendors self-onboard on supply. `[SCOPE §1]`
- **Free for couples**, funded by vendor subscriptions. `[SCOPE §1, §2A]`
- **Problem statement (verbatim, SCOPE §1):** "planning a wedding means juggling 15+ fragmented, informal, word-of-mouth vendors with opaque pricing, hidden charges, no accountability, and constant fear of being cheated or let down on the day."
- **Three-layer solution architecture** `[SCOPE §4]`:
  1. **Wedding Workspace** — "the hassle-free layer (the moat)". Elevated in v2.0: "With no escrow or transaction layer, the Workspace is the primary reason a couple uses Vivah Spot rather than a search engine or a plain directory. It is a core deliverable, not a companion feature."
  2. **Service Marketplace** — "~50+ service modules, each an instance of the same engine, attached **per function**".
  3. **Vendor Supply** — self-onboarding + subscription.
- **Positioning against alternatives** `[TECH §4]`: "a couple with a directory-shaped need will use Google or WedMeGood" — named competitive reference points.
- **Objectives (5), SCOPE §2:** hassle-free transparent experience free to couples; scalable multi-city multi-vendor marketplace on one repeatable engine; vendor self-onboarding to grow supply asset-light; trust mechanisms as the core differentiator; predictable subscription revenue proven with hard lead data.

### Historic positioning now superseded (do NOT carry into the PRD body)
`[BRAIN — frontmatter + Session Overview]` framed the product as "an end-to-end Wedding Management Platform … a hassle-free, **fully-managed** wedding experience … **sold as packages** … built into a **multi-stream revenue** business", with an in-house wedding manager and ~90% managed-vendor operations. `[SCOPE §4 note, §11]` deletes first-party supply and demotes packages to Phase 2. **This is a positioning contradiction — see §10.1.**

---

## 2. Target users & roles

Four roles, `[SCOPE §3]` (verbatim descriptions condensed):

| Role | Detail | Source |
|---|---|---|
| **Couple / Family (Customer)** | Demand side. "Often elder-led, low-to-medium digital literacy → must be simple." Uses platform free of charge. | `[SCOPE §3]` |
| **Vendor (Supply)** | "Multi-type service providers (venue owners, caterers, photographers, decorators, band/baraat, etc.) who self-onboard, subscribe, list offerings, manage availability, and respond to enquiries. **The paying customer.**" | `[SCOPE §3]` |
| **Admin / Operations** | "Vivah Spot staff: vendor verification, subscription & billing management, catalog management, content moderation, complaint handling, analytics." | `[SCOPE §3]` |
| **Wedding Manager** | "A Vivah Spot-side coordinator who can assist a customer's planning. *(Phase 2; commercial treatment to be decided.)*" | `[SCOPE §3, §10 Phase 2, §11]` |

Supporting user characteristics scattered elsewhere:
- "Elder-led, low-digital-literacy users means phone+OTP only — no passwords, no email." `[TECH §4 Auth]`
- "In Tier 3/4 WhatsApp open rates dwarf SMS." `[TECH §4 Notifications]`
- Vendor sub-types enumerated for Band Baaja Baraat: "band · dhol-tasha troupe · baraat/procession contractor · ghodi/baggi/vintage-car provider · DJ-on-wheels · lighting & effects · dancers." `[BRAIN — Frozen #5]`
- Photography supply "ranges from **solo photographers → full studios**", studios have team members each with own portfolio. `[BRAIN — Frozen #3]`

**Gap:** no named personas, no demographic/segment profiles, no user-count or market-size figures anywhere. `[BRAIN]` declared a "Role Playing — surface what every wedding stakeholder expects, fears, and will pay for" phase but its output is not in the document (`ideas_generated: []`).

---

## 3. Monetization model & pricing specifics

**Model (SCOPE §2A, "new in v2.0"; TECH §4):** "**Vendors pay to be listed. Couples pay nothing. Vivah Spot never handles booking money.**"

| Aspect | Detail | Source |
|---|---|---|
| Who pays | Vendors | `[SCOPE §2A]` |
| What for | "The right to list services, appear in search, and receive enquiries from couples" | `[SCOPE §2A]` |
| Billing cycle | "Prepaid plan period (**6 or 12 months**) at launch; auto-renew mandates considered later" | `[SCOPE §2A]`, `[TECH §4]` |
| Collection | "Online payment via the vendor web portal; GST invoice issued per payment" | `[SCOPE §2A]` |
| Couple pays | "**₹0.** No booking fee, no convenience fee, no commission." | `[SCOPE §2A]` |
| Booking money | "Settled **directly** between couple and vendor, outside the platform" | `[SCOPE §2A]` |

**Plan tiers ("tiers indicative; pricing is a client decision")** `[SCOPE §2A]`:
- **Founding Vendor (₹0)** — "Launch cohort in Shrirampur, fixed expiry date. Builds initial supply before demand exists."
- **Basic** — "Listing, standard photo allowance, unlimited enquiries"
- **Featured** — "Priority placement in search, larger portfolio allowance, multiple service categories"

**Rationale for subscription over commission** `[SCOPE §2A]`: (a) no leakage — "A wedding is a once-in-a-lifetime, high-value purchase… both sides have a strong incentive to complete the deal offline and bypass the platform — and there is no repeat-purchase relationship to discourage it"; (b) no fund custody — avoids "an RBI Payment Aggregator licence"; (c) predictable revenue, no reconciliation/refunds/disputes; (d) "materially faster to build".

**Commercial risk stated openly** `[SCOPE §2A]`, `[TECH §5 Cold-start reality]`: "A vendor in Shrirampur will not pay a listing fee before seeing couples on the platform. The launch sequence must therefore be **free listings → build couple demand → begin charging**." The ₹0 tier must be "modelled as a real plan — rather than a hardcoded bypass — [so] switching them to paid later is a data change, not a code change."

**Only hard pricing numbers present anywhere:**
- ₹0 Founding Vendor plan. `[SCOPE §2A]`
- GST: "18% is the standard rate for this category — **confirm with your CA**." `[TECH §4]`
- Google Play billing avoided entirely: "Google Play requires Play Billing (**15–30%**) for digital subscriptions sold **inside an Android app**" — sidestepped because the vendor portal is web. `[TECH §4]`
- No plan prices, no photo/listing/lead allowance numbers, no Founding-Vendor expiry date. **Gap.**

**Future / deferred revenue lines** `[SCOPE §10 Phase 3]`: "featured placement, sponsored listings, lead-boost add-ons"; add-on partners (insurance, gift registry). `[SCOPE §10 Phase 4]`: "Re-evaluate transaction-based revenue (bookings/commission) only if brand trust and scale make fund custody viable."

**Dead monetization ideas from `[BRAIN]` (historical, must not resurface):** commission ("🛒 Marketplace — customer picks from listed options, books via us, **we take a cut**"), managed-vendor margin ("we manage, guarantee quality, **take margin**"), wedding loan / EMI, escrow-held token payments, "fully prepaid via platform" for baraat.

---

## 4. Scope boundary

### 4.1 In scope — Phase 1 / MVP `[SCOPE §10 Phase 1]`
Goal: "prove the engine end-to-end in one city, with free listings building supply."
- Platform foundation: auth, **Wedding + Functions**, search/discovery, compare, **enquiry flow**, reviews, notifications
- **Customer app + Vendor portal + Admin panel** (core)
- **Vendor subscription system** — plans, online payment, GST invoicing, expiry/grace — shipped with the **₹0 Founding Vendor tier** active
- **Vendor lead dashboard** — views, contact reveals, enquiries, conversion
- **5 launch services:** Venue, Catering, Photography, Décor & Mandap, Band Baaja Baraat
- **Wedding Workspace:** dashboard, budget tracker, guest list, checklist
- Single city

### 4.2 The "ruthless MVP cut" `[TECH §5]` — narrower than SCOPE Phase 1
TECH states plainly: "Phase 1 in the scope doc is **still too wide for one developer**." Its per-feature MVP treatment:

| Feature | MVP treatment (TECH §5) |
|---|---|
| Escrow / booking payments | **Deleted entirely.** Not in any phase. |
| Vendor lead dashboard | **Build properly.** Enquiries, contact reveals, conversion. "This is the renewal argument." |
| Wedding Workspace | **Strengthen.** Budget tracker, functions, checklist, guest list. |
| Vendor subscriptions | One-time payment per 6/12-month plan. No mandates, no autopay. |
| Guest management | **Flat list only.** No RSVP, no invitations, no QR. |
| Budget tracker | Manual entry by the couple. |
| Multi-language | i18n wired from day 1; **English only** translated at launch. Marathi Phase 2. |
| Reviews | Post-enquiry, text + rating, admin-moderated. **No photo reviews.** |
| Wedding Manager | Phase 2 — "hold the line". |
| Compare | **Keep.** "Cheap to build, and it's a visible differentiator." |

Governing asymmetry, verbatim: "Retrofitting i18n is brutal; retrofitting photo reviews is trivial."
Effort delta claimed: "roughly **4–6 weeks** of the hardest, highest-risk work removed; roughly **1.5–2 weeks** of subscription billing and lead tracking added."

### 4.3 Explicitly OUT of scope `[SCOPE §11]`
- "**Any handling of booking payments between couples and vendors** — no escrow, no token payments, no commission, no split settlement, no payouts"
- "**First-party service supply** by Vivah Spot (deferred)"
- Metro-grade regulatory/compliance machinery (Phase 4)
- **iOS application (deferred)**
- "Wedding Manager as a paid service — the commercial treatment is undecided; Phase 2 covers the coordination feature only"
- "Any service or feature not explicitly listed above"
- Commercial/marketing operations, vendor acquisition ("business-side, not product")
- Custom integrations not listed in Assumptions
- "Anything new = a Change Request (§14)"

Also removed by the v2.0 revision `[SCOPE §5.1, §5.2, §7]`: in-app booking payments, token payments, escrow, milestone releases, payment status tracking, payouts, settlement reports, escrow release, "digital contracts as a **platform-enforced** instrument", platform-mediated payment disputes.

Deferred within the frozen specs `[BRAIN — Frozen #5]`: "Fireworks legality (green crackers / permitted window), noise-curfew automation, road-procession permits, animal-welfare options — enforcement is light in Tier 4/3/2, so out of scope for launch." Confirmed by `[SCOPE §10 Phase 4]` "Compliance layer".

### 4.4 Later phases (for PRD context, not v1)
- **Phase 2** `[SCOPE §10]`: begin charging (Founding tier expires, conversion argued from lead-dashboard data); new services — Makeup & Beauty, Mehndi, Invitations (cards + digital + RSVP), Pandit/Guruji, DJ/Sound, Lighting/AV; Wedding Manager; **packages/bundles**; full guest management (RSVP, accommodation, transport); UPI Autopay mandates; multi-city rollout.
- **Phase 3**: remaining catalog; featured placement / sponsored listings / lead-boost; insurance & gift-registry partners; live streaming; social features.
- **Phase 4**: compliance layer; premium venues; multi-language at scale; re-evaluate transaction revenue.

---

## 5. Feature / capability list as stated

### 5.1 Customer application (free) `[SCOPE §5.1]`
- Auth & onboarding (phone/OTP; WhatsApp-friendly)
- **Create Wedding** (parent object): couple names, date(s)/muhurat, city, guest count, budget — "**auto-saved as draft**, resume anytime"
- **Functions layer:** add functions (Haldi, Mehndi, Sangeet, Wedding, Reception + custom), each with own date/time, venue, guest count
- **Service discovery:** search by name OR location / detect current location; rich filters; "**date-availability pre-applied** from the Wedding"; availability badges
- **Compare** shortlisted vendors side by side
- **Enquiry flow:** browse → compare → shortlist → **send enquiry / reveal contact** → vendor responds → couple deals with the vendor directly
- Per-service modules
- **Dashboard:** all functions, all shortlists and enquiries, statuses, estimated cost
- **Budget tracker** (couple-entered planned vs actual across all services)
- **Guest management** (list; RSVP and invitations phased)
- **Checklist & timeline** (muhurat-aware)
- **Reviews & ratings** ("after an enquiry reaches completion")
- **Notifications & reminders** (app + SMS/WhatsApp)

### 5.2 Vendor portal (responsive web) `[SCOPE §5.2]`
- Self-onboarding & KYC/verification — "identity and business verification for the verified badge; **no payout/bank KYC required**"
- Subscription & billing: plan selection, online payment, GST invoice download, renewal reminders, expiry/grace handling
- Service listings (service-specific fields, photos/portfolio, packages, all-in pricing)
- **Published commitments** (delivery timelines, inclusions, no-hidden-charges declaration) shown on the public listing
- Availability calendar (block/open dates; slot/bandwidth management)
- Enquiry inbox (respond; mark contacted / site visit / won / lost)
- **📊 Lead dashboard — core deliverable:** "listing views, contact reveals, enquiries received, response time, conversion. This is how a vendor sees the value of the subscription and decides to renew."
- Reviews management

### 5.3 Admin / Operations panel `[SCOPE §5.3]`
Vendor verification & KYC approvals · subscription & billing management (plans, pricing, manual overrides, comps, expiry, GST invoicing, revenue reporting) · **catalog/category management "without a code release"** · enquiry oversight & complaint handling · **vendor standing & delisting** ("the primary enforcement lever") · content/reviews moderation · reports & analytics (supply, demand, leads generated, subscription revenue, churn).

### 5.4 Cross-cutting platform features `[SCOPE §7]`
Search & filters (location, date availability, budget, capacity, type, ratings) · availability calendars (vendor-maintained) · compare · **enquiry & lead tracking ("both sides see the same thread and status")** · vendor subscriptions (plans, payment, GST invoicing, expiry & grace, plan-based visibility and allowances) · budget tracker · guest management · reviews & verified badges · notifications (app + SMS/WhatsApp) · multi-city (city-scoped catalog) · multi-language (English + regional, phased).

### 5.5 The Service Engine — the 10-part blueprint `[SCOPE §4]`
"Every service module follows the **same 10-part blueprint** — so new services are configured, not re-built":
1. Taxonomy + filters
2. Supply shelves: verified / standard listings *(first-party shelf deferred)*
3. Budget tiers
4. Listing card data (price, photos, ratings, capacity, badge, service cities, availability calendar)
5. Discover → compare → shortlist → **enquire** → vendor responds
6. **Vendor commitments published on the listing** + downloadable quote/agreement template for offline use
7. Vetting + verified badges + reviews + delisting for non-performance
8. Enquiry tracking and reminders in the customer's Workspace
9. Revenue lever: vendor subscription tier (visibility and allowances scale with plan)
10. City-scoped replication

### 5.6 The five frozen services

**SCOPE §6 (governing, escrow-stripped):**

| Service | Signature features `[SCOPE §6]` |
|---|---|
| **Venue** | All-in transparent pricing · availability calendar/badge · vendor-policy field (outside caterer allowed?) · verified real photos · site visit / virtual tour request · downloadable agreement template |
| **Catering** | Per-function planning · "no shortage, no waste" headcount calculator · all-in per-plate pricing · tasting request · published hygiene & freshness commitment |
| **Photography** | Bundled photo+video packages · published delivery timeline, tracked and reviewed · named-shooter lock · all-in deliverables list · privacy toggle |
| **Décor & Mandap** | Verified real-event portfolios ("our strongest anti-fraud check") · all-in line-item pricing · auto venue-aware sizing · published setup-time commitment |
| **Band Baaja Baraat** | Baraat builder · all-in pricing · published "no on-the-spot demands" declaration with complaint reporting that affects vendor standing · vetted crews |

**BRAIN adds field-level detail SCOPE does not repeat** (usable for requirements, but escrow references must be stripped):

- **Venue** `[BRAIN Frozen #1]` — config fields: "Capacity (seated & **comfortable/floating**) · venue type (hall/lawn/farmhouse/hotel/resort) · peak/off-peak rent · **all-inclusive price breakdown** (rent + taxes + service charge + generator + valet) · **overtime rate/hr** · **power-backup scope** (lights-only / partial / full AC + KVA) · amenities (AC, parking capacity, guest rooms) · **inclusions checklist** (hours window, setup, cleanup, chairs/tables/AV) · **vendor policy** (outside caterer allowed? penalty?) · décor/music/alcohol rules · verified photos · reviews · availability calendar · location/map · **license/compliance badge**". Availability badge states: "✅ Free / ⚠️ Few slots / ❌ Booked". Booking spectrum: "Enquire → Site visit → Token → Confirm" *(Token step now dead)*.
- **Catering** `[BRAIN Frozen #2]` — one order **per function**, different caterer per function allowed. Meal type (breakfast/lunch/hi-tea/dinner/snacks) · course-structured menu builder (welcome drinks → starters → mains → live counters → sweets → paan; "pick N per course"; presets + custom; **community menu templates**, e.g. traditional Maharashtrian thali) · diet/religious profile (pure-veg / Jain / satvik no-onion-garlic / non-veg / halal) · headcount from function guest count + **smart buffer**, final-count cutoff · service style (**pangat** / buffet / plated) + **staff ratio** (waiters per 100) + serviceware tier · special meals (kids, elderly/diabetic sugar-free, satvik for rituals) · add-ons (live counters per head, welcome drinks, halwai/dessert/cake, paan, bar if venue allows). Supply: FSSAI + hygiene + insurance, capacity (max events/plates per day), date-wise availability, service cities. Process: tasting logistics · menu-lock date · change/cancellation policy · "final billing on actual headcount". Also: **leftover-donation NGO tie-up** and **auto venue-compatibility check** (kitchen / power / space + vendor policy) — *neither appears in SCOPE §6; see gaps.*
- **Photography** `[BRAIN Frozen #3]` — bundled photo+video, coverage across Functions + optional pre-wedding shoot. Deliverables itemized: "# edited photos · album (size/pages/material) · film length · teaser/reels · drone · **RAW files (included / add-on)** · prints/extra copies"; pricing = base + explicit overtime rate + travel/stay. Supply: style tags (candid / cinematic / traditional / documentary), team members each with own portfolio, "**date-wise team availability** (a team shoots one wedding/day)", "**full sample gallery** required (matching coverage level), verified". Also **backup-shooter + dual-card/cloud-backup guarantee** and album revision rounds — *not carried into SCOPE §6.*
- **Décor & Mandap** `[BRAIN Frozen #4]` — gated by "the venue's décor policy: **open / empanelled-only / in-house-only**"; per-function (Haldi backdrop / Sangeet stage / mandap / reception stage). Style/theme browse (floral / royal / rustic / minimal / traditional) · budget-tier packages · line-item (mandap / stage / floral / entrance / lighting) · all-in pricing covering "travel, power/electricity, cleanup/restoration, overtime" · **flower-type field (real / fake / mix)** · "platform auto-shares the chosen venue's photos / dimensions / power with the decorator" · **mandatory site visit** · setup-crew size · power requirements. Trust approach "kept light": "lean on verified real-event portfolios (no staged inspiration shoots), not per-couple mockups → frictionless decorator onboarding + supply growth."
- **Band Baaja Baraat** `[BRAIN Frozen #5]` — **baraat builder**: "band / dhol-tasha + groom's ride (ghodi / baggi / vintage car) + light-boys + DJ-on-wheels + effects (cold-pyro / sparklers / flower shower) + dancers; à la carte **or** prebuilt packages". All-in pricing spelling out GST, travel, equipment (mics/speakers/amps), duration; add-ons (extra hours, costumes, lighting). Supply: past-work videos/photos, crew size, date-wise availability, service cities.

### 5.7 Full service catalog `[SCOPE §6]` — ~50+ services
- **Pre-Wedding:** Consultation & planning · Budget planning · Muhurat/date (guruji) · Invitation cards · Digital invite + RSVP · Sakharpuda · Kelvan · Haldi · Mehndi · Sangeet/DJ night · Devak/Ganesh puja · Pre-wedding shoot · Kundali matching/astrology
- **Wedding Day:** ★Venue · ★Catering · ★Décor & Mandap · ★Photography · ★Band Baaja Baraat · Tent/seating · Power backup · Cooling/heating · Mobile toilets · Guruji + pooja samagri · DJ/orchestra · Anchor/emcee · Makeup & beauty · Saree draping · Attire (Paithani/sherwani) · Jewellery (rental) · Guest accommodation · Guest transport · Hospitality/ushers · Security · Parking/valet · Return gifts (aaher) · On-ground event management · Choreographer · LED/AV/sound · Live artists (caricature/magician/kids' zone)
- **Post-Wedding:** Reception · Vidaai/Pathavni · Griha Pravesh / Satyanarayan puja · Album & film delivery · Honeymoon planning · Marriage registration assistance · Thank-you & gift tracking · Post-event cleaning & waste management · Social media (hashtag/teaser/reels)
- **Digital & Money (cross-cutting):** Couple's wedding app/website · Digital invite + RSVP + QR check-in · Wedding insurance · Gift registry · Trousseau & gift hampers
- `[BRAIN]` additionally lists: live streaming, welcome drinks & water, serving staff & crockery, fireworks/cold pyro, groom grooming, **wedding loan / EMI** *(dead — financing)*.

### 5.8 Trust spine `[SCOPE §8]` — the differentiator set
Framing sentence: "Without escrow, trust must be built **before** the transaction rather than enforced during it. This is a weaker instrument, honestly stated — but it is the model every successful Indian listing platform operates on."

| Mechanism | How it works `[SCOPE §8]` |
|---|---|
| Vetted supply | "Vendors are identity- and business-verified before listing. **Not everyone gets on.**" |
| Verified real portfolios | "Photos are checked against real events. Directly attacks the most common wedding-vendor fraud." |
| Mandatory all-in pricing | "Publishing a complete, hidden-charge-free price is a **condition of listing**, not a courtesy." |
| Published commitments | "Stated publicly and permanently on the listing — **quotable back to the vendor**." |
| Honest reviews | "Reviews are tied to real enquiries and moderated, not open to anonymous posting." |
| Venue-awareness | "Services auto-adapt to the chosen venue. Pure software; unaffected by the model change." |
| Delisting | "A vendor who repeatedly breaks commitments loses their listing, their visibility, and their subscription." |
| Free to couples | "No fee and no commission means search ranking is not for sale to the highest bidder on a per-deal basis." |

**Prohibited claims — "what Vivah Spot no longer claims, and must not market"** `[SCOPE §8]`: ❌ escrow or held payments · ❌ financial guarantee of on-time delivery/setup/freshness · ❌ backup-vendor guarantee · ❌ refund or compensation for non-performance · ❌ any liability for direct payments.
**Action item raised but not closed:** "all customer-facing copy, the app UI, and the five frozen service specifications must be reviewed against this list before launch… Terms & conditions must state plainly that Vivah Spot is a listing and discovery platform and is not a party to any transaction."

### 5.9 Non-functional requirements `[SCOPE §9]`
| Area | Requirement |
|---|---|
| Platform | "Android-first mobile app for customers; responsive web portal for vendors; web panel for admin. **iOS deferred.**" |
| Usability | "Simple, low-digital-literacy-friendly, vernacular-ready, WhatsApp-centric" |
| Performance | "Fast search & listing on low-bandwidth/low-end devices" |
| Scalability | "City-scoped, horizontally scalable for multi-city growth" |
| Security | "KYC data protection, role-based access, secure subscription payment handling" |
| Reliability | "High availability around **peak muhurat seasons**" |
| Localization | "English at launch; regional languages phased (**Marathi first**)" |
| Compliance | "GST-compliant invoicing for vendor subscriptions; T&Cs establishing non-party status" |

Quantified NFR targets exist only in `[TECH §1]`: "**install size under ~30MB, cold start under 2s**"; "Test on a real budget Android phone from week 1. The emulator lies about scroll performance and cold start."

### 5.10 Deliverables `[SCOPE §13]`
Customer Android app · vendor portal (responsive web, incl. subscription billing + lead dashboard) · admin/ops panel (web) · UI/UX designs, source code, technical documentation · deployment to client-owned cloud + handover.

---

## 6. User journeys, personas, narrative scenes present

### Journeys explicitly described
1. **Customer core journey** `[SCOPE §4 blueprint step 5, §5.1]`: "Discover → compare → shortlist → **enquire** → vendor responds" → couple deals with the vendor directly.
2. **Venue journey, step-by-step** `[BRAIN Frozen #1 "Demand side"]` — the only fully narrated flow in any document:
   1. Create a **Wedding** (couple names, date/muhurat, city, guest count, budget) — auto-saved draft, resume anytime. "Date + city + guest count flow down to every service as pre-applied filters."
   2. From the Wedding → open **Venue**.
   3. Entry: search by venue name OR enter location / detect current location → venue list.
   4. Filters with date availability pre-applied: capacity vs guest count, rent/budget, type, amenities, vendor policy.
   5. Card shows availability badge for the date (✅/⚠️/❌).
   6. Detail: photos, peak/off-peak pricing, capacity, rules, reviews, availability calendar, request site visit / virtual tour.
   7. *(dead)* "Pay token → date fixed → digital agreement (token via escrow)."
3. **Structural journey layer** `[BRAIN — Structural Update]`: "**Wedding → Functions → Services.** Each Wedding contains user-added functions… each with its **own date/time, venue, and guest count**. **Every service attaches per function**." Illustrative scene given: "Haldi at home, Reception at a hall."
4. **Vendor journey** `[SCOPE §5.2]`: self-onboard → KYC → choose plan → pay → list → set availability → receive enquiry → respond → mark contacted / site visit / won / lost → see lead dashboard → renew.
5. **Vendor renewal argument, narrated** `[TECH §4]`: "'You received 47 enquiries and 12 contact reveals this month' *is* the renewal argument."
6. **Enquiry lifecycle** `[TECH §3]`: `New → Contacted → Site Visit → Won → Delivered → Closed` (+ `Lost` from any pre-Won state).
7. **Subscription lifecycle** `[TECH §3]`: `Trial → Active → Grace → Expired → Suspended`. "On `Expired`, listings **auto-hide rather than delete** — a vendor who renews must get their portfolio back intact, or they won't renew."
8. **Launch sequence as a journey** `[SCOPE §2A]`, `[TECH §5]`: "free listings → build couple demand → begin charging".
9. **Prototype journeys** `[CODE — root README]`, UI-only: Browse → category → vendor detail → "Book Now" → booking sheet → localStorage → "My Bookings"; heart to favourite; account hub. *(The "Book" journey is now invalid — §10.2.)*

### Personas
**Gap.** No named personas anywhere. The nearest things are the role descriptions `[SCOPE §3]` and the user-characteristic fragments in §2 above. `[BRAIN]` planned a Role Playing phase; `stepsCompleted: [1, 2]` confirms only phases 1–2 ran, so **Morphological Analysis (packages + revenue streams) and Resource Constraints (lean MVP + rollout) were never completed** and their outputs do not exist.

### Narrative scenes / vignettes worth preserving
- The 41 research-backed pain points across five services `[BRAIN — 5× "MARKETING GOLD" tables]` — each pairs a real complaint with a feature and a marketing hook. These are the richest customer-voice material in the corpus. Examples: "Food runs out — a shameful shortage"; "Hidden charges — generator, GST, service charge, overtime (₹1–2L for 2 hrs), valet, cleanup"; "Inflated capacity ('fits 300' really seats 220)"; "Bait-and-switch (junior shoots your day)"; "Pinterest vs reality (75% disappointed)"; "On-the-spot cash demands / baksheesh extortion"; "Massive food waste (200–300 dishes)"; "Lost footage (sick shooter / corrupt cards)"; "Power backup = lights only, not AC/sound".
- Cited sources for the pain research `[BRAIN]`: Quora, The Knot, WeddingWire, PS Decor, BollyWeds, Platinum Crown, Aurum, The Grange Hall, Plannersy, Shaadidukaan, Bharat Gangaram, District Events, Velvet Knot, Mini Punjab, Stephanie Richer, B. Jones, Sudhir Rao (legal, India), EventBazaar, WedMeGood, DesiWeds, FiftyFlowers, Madhyamam, TheShaadiCoordinators, BookDholWala, LegalKart, BWC India.

---

## 7. Domain vocabulary → candidate PRD glossary

**Platform objects** `[TECH §3]`, `[SCOPE]`: Wedding (parent object) · Wedding Function · Service Category · Service Category Field (configuration, not code) · Vendor · Vendor Listing · Listing Attribute Value · Package · Availability Block · Vendor Subscription · Subscription Plan · Subscription Invoice · **Lead Event** ("the revenue-critical table: view, contact-reveal, enquiry, call") · Review · Budget Line · **Enquiry** ("the lead. No money flows through it.").

**Platform concepts:** Wedding Workspace · Service Engine ("one engine × N services") · Functions layer · shortlist · compare · **contact reveal** / reveal-contact-on-tap · availability badge · verified badge · all-in pricing · **published commitment** (vs. "guarantee") · vendor standing · **delisting** · **Founding Vendor** tier · grace / expiry / auto-hide · city-scoped catalog · supply shelves (verified / standard) · budget tier · lead dashboard · response time · conversion.

**Wedding-domain / cultural terms used as first-class product nouns:** Muhurat (and "muhurat-aware" checklist, "peak muhurat seasons") · Haldi / Halad · Mehndi · Sangeet · Sakharpuda (engagement) · Kelvan (family feast) · Devak / Ganesh puja · Baraat / Varat · Band Baaja Baraat · dhol-tasha · ghodi / baggi · Vidaai / Pathavni · Griha Pravesh · Satyanarayan puja · Mandap · Aaher (return gifts) · Pangat (service style) · Halwai · Paan · Satvik (no onion-garlic) · Jain / pure-veg / halal diet profiles · Paithani · sherwani · Kundali matching · Guruji / Pandit · Mangal karyalaya · Shamiana · Baksheesh · Josh · Thali (community menu template).

**Trade / regulatory terms:** FSSAI · GST · KYC · PAN · RBI Payment Aggregator licence · Play Billing · UPI Autopay / e-mandate · comfortable (floating) capacity vs seated capacity · peak/off-peak rent · KVA (power-backup scope) · empanelled-only / in-house-only (venue vendor policy) · Tier 2/3/4 city.

---

## 8. ⚠️ ADDENDUM MATERIAL — technical & architectural decisions

> **Flag for the PRD author:** everything in this section is implementation-layer. It belongs in a **PRD technical addendum**, not the PRD body. It is recorded here so it is not lost, and because several items carry *product* consequences that DO belong in the body (marked **[product consequence]**).

### 8.1 Stack decisions `[TECH §0]`
| Layer | Choice | Rationale (condensed) |
|---|---|---|
| Customer app | React Native + Expo (managed, New Architecture), **Android-only at launch** | React skill transfers; cloud builds (no Mac); OTA updates |
| Vendor portal | Next.js responsive web / PWA | "No store review; one mobile app instead of two" |
| Admin / Ops | **Frappe Desk (built-in)** | "~40% of functional scope arrives free" |
| Backend | Frappe Framework v16, custom app `vivahspot_backend` | "DocType model *is* the service engine" |
| Database | MariaDB (Frappe default) | "Don't fight the framework" |
| Search | MariaDB at MVP → Meilisearch/Typesense behind an interface | "Deferred, but designed for" |
| Media | **Cloudflare R2 (or S3) + CDN** | "never use Frappe's file store for user media" |
| Payments | Razorpay standard checkout — vendor subscriptions only | "no Route, no escrow, no split" |
| Messaging | WhatsApp Business API (Meta Cloud) + SMS fallback | "Tier 3/4 reality" |
| Auth | Phone + OTP via MSG91, custom Frappe login flow | "Frappe has no phone auth out of the box" |

Flutter was evaluated and rejected `[TECH §1]`, in weight order: no Mac in toolchain ("a hard blocker, not a preference"), skill transfer, OTA updates, hiring pool. "Performance is not a deciding factor in 2026."

### 8.2 Mobile package set `[TECH §1]`
expo + react-native · expo-router · nativewind · @tanstack/react-query · zustand · react-native-mmkv · @shopify/flash-list · expo-image · react-hook-form + zod · i18next + expo-localization ("**Wire in from day 1**, translate later") · Razorpay RN SDK · @sentry/react-native ("Non-negotiable") · EAS Build + EAS Update.
Constraint: "Once Razorpay's native SDK is added, **Expo Go stops working**. Move to a dev client early."

### 8.3 API contract `[TECH §2]`
- Frappe's current HTTP API is **v2**: `/api/v2/document/{doctype}[/{name}]`, `/api/v2/document/{dt}/{name}/method/{m}`, `/api/v2/method/{dotted.path}`, `/api/v2/doctype/{dt}/count`, bulk_update / bulk_delete.
- v2 differs from v1 beyond the path: "`filters` takes object form, pagination is `limit`/`start`… list responses carry `has_next_page`. Ignore v1 examples."
- **Rule:** "the mobile app calls purpose-built RPC, not the generic document API" — both clients hit whitelisted methods only, e.g. `vivahspot_backend.api.mobile.v1.search_listings`, `.get_listing`, `.create_booking`.
- **[product consequence]** Why: "A Next.js app can be redeployed the instant that schema changes; a binary sitting on ten thousand budget Androids cannot. Every DocType field rename becomes a breaking change for users who haven't updated." → implies an app-version compatibility / forced-update requirement the PRD body should own.
- App-level `v1` is versioned independently of transport-level `v2`.

### 8.4 Data-model spine `[TECH §3]`
The hierarchy is reproduced in §7 above. Key mechanics:
- **[product consequence]** "`Service Category Field` is configuration data. Adding 'Makeup & Beauty' in Phase 2 means creating a category row and its field definitions — **an admin action, not a deploy**. The mobile app renders filters and listing detail sections dynamically from that config." → a hard product requirement: dynamic, config-driven filter/detail rendering on mobile.
- Acknowledged trade-off: "the attribute-value child table makes SQL filtering awkward. That is the concrete reason the search seam exists."
- **[product consequence]** "`Won` and `Delivered` are **vendor-declared** (and optionally couple-confirmed) rather than payment-derived. That weakens their reliability — but they are what unlocks review collection and what feeds the vendor's conversion stats, so both sides have a reason to mark them honestly."
- **[product consequence]** "On `Expired`, listings **auto-hide rather than delete**."

### 8.5 Integrations `[TECH §4]`
- **Payments:** "you are the merchant, the vendor is the customer, one Razorpay account, no marketplace complexity." MVP = one-time payment per plan period with WhatsApp expiry reminders; later = Razorpay Subscriptions + UPI Autopay. GST invoices required (18%, confirm with CA).
- **Play Store billing trap "already sidestepped":** vendors subscribe on the web, so Play Billing (15–30%) never applies; "The customer app… now has **zero payment surface of any kind** — the cleanest possible Play Store review story." Warning: "Do not later 'helpfully' add subscription payment into a vendor mobile app without re-reading Google's policy first."
- **[product consequence] Lead tracking as MVP requirement:** "To count leads at all, contact details **must not be plainly visible**. MVP approach: **reveal-contact-on-tap**, logged as a `Lead Event`, plus an in-app enquiry form that hands off to WhatsApp. Cheap, and it produces the metric. Masked calling (Exotel/Knowlarity) proves call volume properly but costs per-minute — **defer until vendors dispute your numbers**."
- **Auth:** MSG91 (or Firebase Phone Auth) issues/verifies OTP → whitelisted Frappe method mints session/token. "phone+OTP only — no passwords, no email."
- **Notifications:** WhatsApp Business API via Meta Cloud (BSP: AiSensy / Interakt / Gupshup) primary, SMS fallback, push via Expo Notifications.
- **Maps:** "Google Maps is the default but bills in USD. Evaluate **Mappls (MapmyIndia)** or **Ola Maps**."

### 8.6 Accepted weaknesses `[TECH §2]`
Weak full-text/geo search (mitigated by the search interface seam) · basic realtime socket.io ("Wedding-manager chat is Phase 2 — punt, or route it through WhatsApp") · smaller hiring pool than Node · Python monolith ("Fine at one city").

### 8.7 Critical-path external approvals `[TECH §6]` — "none of them are code"
1. **Google Play developer account — register as an organisation (Anvayro), not personal.** "New *personal* accounts must run a closed test with 12+ testers for 14 continuous days before production access… An organisation account is exempt. Getting this wrong costs ~2 weeks at the worst possible moment. *(Verify current policy at registration.)*"
2. **Razorpay merchant account** — standard checkout, no Route.
3. **Meta Business verification** for WhatsApp Business API — "typically 1–3 weeks".
4. **GST registration + invoicing setup** — confirm rate and format with the client's CA.
(Listed as 3 in the heading, 4 in the list — minor internal inconsistency.)

### 8.8 Intended repository layout `[TECH §7]`
```
vivahspot_backend/
├─ apps/mobile/          # Expo app (customer, Android-first)
├─ apps/vendor-web/      # Next.js vendor portal
├─ packages/shared/      # zod schemas + TS types for the mobile.v1 API contract
└─ backend/vivahspot_backend/   # Frappe custom app
   └─ api/mobile/v1/     # whitelisted methods — the only surface clients touch
```
"The `shared` package is the discipline that keeps three surfaces honest against one API."

### 8.9 Assumptions & dependencies `[SCOPE §12]`
**Client provides:** branding, content, "legal T&Cs/privacy policy — including the non-party disclaimer required by §8" · business registration, **GST registration**, payment-gateway merchant account · **subscription plan pricing and the Founding Vendor cohort definition** · "initial vendor pipeline for onboarding, and the field capacity to verify vendors and portfolios **in person**" · sign-off at each phase gate.
**Third-party:** payment gateway (e.g. Razorpay) · SMS/WhatsApp Business API · maps & geolocation · cloud hosting & push · media storage/CDN.
**Operational dependency, verbatim:** "the trust spine in §8 rests on *human* verification — someone must physically vet vendors and confirm portfolios. The platform provides the workflow; the client provides the people. **Trust claims are only as good as this process.**"

### 8.10 Change control `[SCOPE §14]`
Anything outside the document is a Change Request (documented, estimated, approved). "Reintroducing platform-handled payments, escrow, or commission is a **material change** affecting architecture, regulatory posture, and timeline. It cannot be absorbed as a minor revision."

---

## 9. Open questions, TODOs, unresolved decisions

### Client decisions outstanding
1. **Subscription plan pricing** — "pricing is a client decision" `[SCOPE §2A, §12]`. No number exists anywhere.
2. **Founding Vendor cohort definition and its "fixed expiry date"** `[SCOPE §2A, §12]` — undefined.
3. **Plan allowances** — "standard photo allowance", "larger portfolio allowance", listing/photo/lead limits `[SCOPE §2A]`, `[TECH §3]` — no numbers.
4. **Wedding Manager commercial treatment** — "to be decided" `[SCOPE §3, §10, §11]`.
5. **GST rate** — "18% is the standard rate for this category — confirm with your CA" `[TECH §4, §6]`.
6. **Document sign-off itself** — SCOPE is "v2.0 (Draft for review)", "Awaiting client sign-off", signature block blank `[SCOPE §0, §15]`.
7. **Timelines** — "Indicative phasing. Timelines depend on team size and are to be finalised jointly" `[SCOPE §10]`.

### Product decisions left hanging
8. **Delisting thresholds** — "a vendor who **repeatedly** breaks commitments" `[SCOPE §8]`; "complaint reporting that affects vendor standing" `[SCOPE §6]`. No threshold, appeal path, or standing/score model defined.
9. **Review eligibility** — SCOPE §5.1 says reviews come "after an enquiry reaches completion"; TECH §3 makes `Won`/`Delivered` vendor-declared and "optionally couple-confirmed" — the optionality is unresolved, and it gates the entire review system.
10. **Search ranking model** — "Featured: priority placement in search" `[SCOPE §2A]` with no ranking algorithm, and no reconciliation with the neutrality claim in §8 (see §10.1).
11. **Marketing-copy audit against the prohibited-claims list** — "**Action required**" `[SCOPE §8]`, not yet done; the five frozen specs and the app UI are named as needing review.
12. **Masked calling** — deferred "until vendors dispute your numbers" `[TECH §4]`; no trigger metric.
13. **Auto-renew mandates (UPI Autopay)** — "considered later" / "once renewal volume makes manual chasing painful" `[SCOPE §2A]`, `[TECH §4]`; no threshold.
14. **Search engine swap** (MariaDB → Meilisearch/Typesense) — "deferred, but designed for" `[TECH §0, §2]`; no trigger.
15. **Maps provider** — Google vs Mappls vs Ola: "Evaluate" `[TECH §4]`. Undecided.
16. **OTP provider** — "MSG91 (or Firebase Phone Auth)" `[TECH §4]`. Undecided.
17. **WhatsApp BSP** — "AiSensy / Interakt / Gupshup" `[TECH §4]`. Undecided.
18. **Media store** — "Cloudflare R2 (or S3)" `[TECH §0]`. Undecided.
19. **First-party supply** — deferred, "should be reconsidered only alongside a deliberate change of commercial model" `[SCOPE §4 note]`.
20. **Realtime / wedding-manager chat** — "punt, or route it through WhatsApp" `[TECH §2]`. Undecided.

### Structural gaps in the inputs themselves
21. **The brainstorm was never finished.** `stepsCompleted: [1, 2]` of 4; `ideas_generated: []`. **Morphological Analysis (packages + revenue streams)** and **Resource Constraints (lean Shrirampur MVP + phased rollout)** produced no output. `[BRAIN frontmatter]` Also noted in-line: "Pending: Shrirampur-specific gaps, in-house vs. asset-light decisions for core services, and conversion into packages (Phase 3)."
22. **No success metrics / KPIs anywhere.** Nothing on target vendor count, couple signups, enquiry volume, conversion, renewal rate, or launch date. The only quantified targets in the whole corpus are the mobile install-size/cold-start numbers `[TECH §1]`. **Gap.**
23. **No competitive analysis.** WedMeGood and Google are named once as the alternative `[TECH §4]`; no analysis exists.
24. **No pricing/market sizing for Shrirampur** — vendor population, wedding volume, willingness to pay: absent.
25. **Anti-bypass strategy is unresolved.** `[BRAIN Frozen #1]` deferred it ("mask owner contact, route payments & comms through platform, anti-circumvention clause, on-platform-only value"). Under the subscription model bypass is no longer a revenue threat, but contact-reveal gating survives *as the lead metric* `[TECH §4]` — the PRD must state which rationale governs the UX.
26. **Décor "auto venue-aware sizing"** `[SCOPE §6]` requires the platform to "auto-share the chosen venue's photos / **dimensions** / power with the decorator" `[BRAIN Frozen #4]` — but venue dimensions are **not** in the venue config-field list `[BRAIN Frozen #1]`, which has capacity but no dimensions. Missing data dependency.
27. **Photography "published delivery timeline, tracked and reviewed"** `[SCOPE §6]` implies a delivery-tracker feature; no such feature appears in the customer app list `[SCOPE §5.1]` or MVP cut `[TECH §5]`. Gap.
28. **"Both sides see the same thread and status"** `[SCOPE §7]` implies in-app messaging, but the only messaging path described is enquiry → WhatsApp handoff `[TECH §4]`. Unresolved.
29. **No data-retention / privacy requirements** beyond "KYC data protection" `[SCOPE §9]`; no DPDP Act reference despite Indian PII + KYC document storage.
30. **No offline/low-connectivity behaviour** specified, despite the Tier 3/4 low-bandwidth NFR — only "@tanstack/react-query … offline-ish behaviour" `[TECH §1]`.

---

## 10. ⚠️ CONTRADICTIONS — read this section first

### 10.1 Between / within the planning documents

| # | Contradiction | Detail | Resolution rule |
|---|---|---|---|
| **C1** | **Whole business model: managed/commission vs. listing/subscription** | `[BRAIN]` is built on four handling models (in-house, managed-vendor-with-margin, marketplace-with-a-cut, add-on partner), "sold as packages", "~90% managed-vendor + in-house manager", and a plan to "later pull highest-margin / highest-failure-risk services… toward exclusive or in-house". `[SCOPE §2A, §4 note, §11]` deletes all of it: pure listing marketplace, subscription only, first-party supply deferred, packages moved to Phase 2. | SCOPE governs `[SCOPE §0]`. BRAIN is historical. **But BRAIN is the only source of the field-level service detail in §5.6 — it must be mined, and escrow/commission stripped line by line.** |
| **C2** | **Escrow-backed guarantees vs. published commitments** | `[BRAIN]` frozen specs promise: "Escrow-backed on-time delivery guarantee… final payment held until the gallery/album is delivered"; "on-site freshness guarantee"; "on-time setup guarantee (escrow-backed)"; "No on-the-spot-demands guarantee — **fully prepaid via platform**"; "backup-shooter guarantee"; "no shortage guaranteed"; "Pay token → date fixed (token via escrow)". `[SCOPE §6, §8]` restates every one as a vendor-**declared, published commitment**, and `[SCOPE §8]` explicitly forbids marketing them as guarantees. | SCOPE §8 governs. Every marketing hook quoted in `[BRAIN]` ("Your album, on time — **guaranteed**", "No crowding, **guaranteed**", "Fresh on the day, **guaranteed**", "Never run short") is now **prohibited copy**. The pain-point tables are still valid as customer-voice research; their right-hand columns are not. |
| **C3** | **`create_booking` in the API contract** | `[TECH §2]` lists the example whitelisted methods as `search_listings`, `get_listing`, **`create_booking`** — while `[TECH §3]` and `[SCOPE §5.1]` insist the platform records "an *enquiry*, not a *transaction*" and "No money flows through it." | Internal contradiction inside TECH. The method should be `create_enquiry`. Flag for the addendum. |
| **C4** | **Neutral ranking vs. paid priority placement** | `[SCOPE §8]` claims as a trust mechanism: "No fee and no commission means **search ranking is not for sale** to the highest bidder on a per-deal basis." `[SCOPE §2A]` sells a **Featured** tier = "**Priority placement in search**", and `[SCOPE §10 Phase 3]` adds "sponsored listings, lead-boost add-ons". | The qualifier "per-deal" is doing all the work. The PRD must state the ranking policy explicitly and make paid placement visibly labelled, or drop the neutrality claim. |
| **C5** | **SCOPE Phase 1 vs. TECH "ruthless MVP cut"** | `[SCOPE §10]` Phase 1 includes full reviews, notifications, guest management, checklist, multi-language. `[TECH §5]` states Phase 1 "is **still too wide for one developer**" and trims guest management to a flat list, reviews to text-only, languages to English-only. | Two different MVP definitions. **The PRD must pick one.** TECH is later and more specific; SCOPE is the client-facing signed artifact. Unresolved — needs a decision. |
| **C6** | **Wedding Manager: Phase 2 feature vs. out of scope** | `[SCOPE §3]` lists it as a role ("Phase 2"); `[SCOPE §10 Phase 2]` schedules it; `[SCOPE §11]` lists "Wedding Manager as a paid service" as out of scope. | Reconcilable (the *feature* is Phase 2; the *paid service* is undecided), but it reads as a contradiction and needs one sentence in the PRD. |
| **C7** | **Tier classification of Shrirampur** | `[BRAIN]` calls it "a Tier-3 town"; `[SCOPE §1]` says the launch market is "Tier 4 / 3 / 2 cities, beginning with Shrirampur". | Cosmetic, but the PRD should fix one label. |
| **C8** | **Approval count** | `[TECH §6]` heading says "**Three** external approvals sit on the critical path" then lists **four**. | Cosmetic. |
| **C9** | **Reviews tied to "real bookings" vs. real enquiries** | `[BRAIN]` venue pain #10 answer: "Verified reviews from **real bookings**". `[SCOPE §8]`: "Reviews are tied to real **enquiries**". | SCOPE governs; a "booking" no longer exists as an object. |
| **C10** | **Décor onboarding friction vs. verification burden** | `[BRAIN Frozen #4]` chose verified real-event portfolios explicitly to keep onboarding "frictionless… → supply growth". `[SCOPE §12]` says verification requires "field capacity to verify vendors and portfolios **in person**" — the opposite of frictionless. | Real tension between supply growth and the trust spine. Needs an explicit verification-SLA decision in the PRD. |

### 10.2 Between the documents and the scaffolded code

| # | Contradiction | Detail |
|---|---|---|
| **X1** | **The prototype still sells bookings.** | `vendor.html` has a "**Book Now**" button, a "Request a booking" modal, "Confirm booking", toast "Booking request sent ✓", writes `localStorage["vs_bookings"]`, and `account/bookings.html` is "My bookings". `[SCOPE §5.1]` removed booking entirely: "The platform records an *enquiry*, not a *transaction*." The prototype is named as the design spec (`[TECH §8]`: "The prototype in this repo is the design spec — the screens, the flows, and the design tokens already exist. The mobile work is porting, not designing"), so this invalid flow will be ported unless the PRD kills it explicitly. |
| **X2** | **Vendor signup collects payout bank details.** | `vendor/vendor-signup.html` §6 is "**Bank Details (Payouts)**" — account holder name, account number, IFSC, UPI ID. `[SCOPE §5.2]` states "**no payout/bank KYC required**"; `[TECH §4]` lists "Payout KYC (bank account, IFSC penny-drop)" among the things now **gone**. This is a live data-collection surface that must be deleted (and is a PII-collection liability if shipped). |
| **X3** | **No subscription surface exists in the prototype vendor flow.** | The 8-section signup (Business Info, Contact, Location, Pricing, Legal/KYC, **Bank Details**, Portfolio, Account Security) has **no plan selection, no payment, no GST invoice** — yet subscription billing is the entire revenue model and an MVP deliverable `[SCOPE §10]`. The Next.js portal `apps/vendor-web/src/app/page.tsx` names the right four surfaces (Enquiry inbox, Lead dashboard, Listings, Subscription) but is a static landing page with zero implementation. |
| **X4** | **Scaffolded categories ≠ the 5 launch services.** | `apps/mobile/src/mocks/catalog.ts` ships six categories: venues, catering, **decoration**, photography, **makeup** ("Makeup & Mehndi"), **music** ("DJ & Music"). `[SCOPE §10]` Phase 1 is Venue, Catering, Photography, Décor & Mandap, **Band Baaja Baraat**. Makeup and DJ/Music are **Phase 2** `[SCOPE §10]`; **Band Baaja Baraat is entirely absent from the code.** |
| **X5** | **Wrong launch city in all seed data.** | Every mock vendor is in **Pune / Kothrud / Lonavala**, and the app bar city chip is hard-coded "**Pune**" (`apps/mobile/src/app/index.tsx`). The launch market is **Shrirampur, Maharashtra** `[SCOPE §1]`. |
| **X6** | **"Most Booked" badge derives from a concept that no longer exists.** | `badgesFor()` in `mocks/catalog.ts` emits `🔥 Most Booked` when `reviews >= 150`. There are no bookings, and reviews are enquiry-derived. Also `vsTrack(v.id, "bookings")` in `vendor.html`. |
| **X7** | **No backend exists.** | `[TECH §7]` specifies `backend/vivahspot_backend/` with `api/mobile/v1/`. There is **no `backend/` directory** and no Frappe app in the repo. `packages/shared/src/index.js` is honest about it: "The zod schemas that will live here are that contract" — it currently exports only design tokens; **zero API schemas exist** despite `zod` being a declared dependency. `apps/mobile/src/mocks/catalog.ts`: "Placeholder until `vivahspot_backend.api.mobile.v1.*` exists." |
| **X8** | **None of the mandated mobile packages are installed.** | `[TECH §1]` names a required package set. `apps/mobile/package.json` is **missing all of**: `@tanstack/react-query`, `zustand`, `react-native-mmkv`, `@shopify/flash-list`, `react-hook-form`, `zod`, `i18next`, `expo-localization`, `@sentry/react-native`. Note especially **i18n, which TECH says must be "wired in from day 1"** because "retrofitting i18n is brutal" — it is not wired in. |
| **X9** | **The mobile app is still partly the Expo template.** | `apps/mobile/src/app/explore.tsx` is the stock `TabTwoScreen` starter (Collapsible, ExternalLink, WebBadge, `expo-symbols`). Only `index.tsx` is a real ported screen. The scaffold covers **one screen of the customer app**; Wedding, Functions, Workspace, budget, checklist, guest list, enquiry, compare — **none exist in code**. |
| **X10** | **Prototype surfaces with no scope coverage.** | `inspiration.html` ("Wedding Inspiration") exists in the prototype and appears in **no planning document** — not in the catalog, feature list, or any phase. `budget.html` is titled "**Smart Wedding Planner**" while `[SCOPE §5.1]` / `[TECH §5]` specify a plain manual planned-vs-actual budget tracker. `compare.html` and `vendor/dashboard.html` (with "Conversion funnel / Booking requests / Recent leads") do map to scoped features, but the dashboard's "Booking requests" is again X1. |
| **X11** | **iOS/web build surface in an Android-only product.** | `app.json` configures an `ios.icon` and `web.output: "static"`, and `package.json` includes `react-native-web` + `react-dom` with an `ios` script. `[SCOPE §9, §11]` and `[TECH §0]` say **Android-only at launch, iOS deferred**. Harmless as scaffold, but the PRD should state the platform boundary so it is not quietly widened. |
| **X12** | **Root README describes the dead product.** | The repo root README documents the prototype as "Vivsathi/" with booking/favourites localStorage flows — it uses the dead directory name and the dead booking model. Also the tagline "**Big day, sorted.**" appears in the README and the app UI but in **no planning document** (see §11). |

---

## 11. Qualitative material a requirements structure would silently drop

> These are the things that will vanish the moment this becomes a numbered FR list. Preserve them deliberately.

### Brand voice & taglines
- **"Big day, sorted."** — the product tagline, live in `apps/mobile/src/app/index.tsx` under the wordmark and in the root README. **It appears in no planning document.** If the PRD doesn't capture it, it exists only in code.
- Wordmark treatment: "Vivah" in text colour + "Spot" in accent pink `[CODE: index.tsx AppBar]`.
- **The marketing hook library** `[BRAIN — 5 pain tables]` — ~35 short, punchy, quotable lines written in a distinct voice: *"The price you see is the price you pay" · "Your wedding, your vendors" · "What you see is what you get" · "No crowding, guaranteed" · "Everything in writing, always" · "No sweating, no silence" · "Compare in minutes, not weeks" · "Never run short" · "Pay for the plates that matter" · "Feed guests, not the bin" · "Every plate, right" · "Taste before you trust" · "The photographer you pick is the one who shows up" · "Your memories, your files" · "Never lose a moment" · "Your wedding, your call" · "Real weddings, not staged shoots" · "See what your budget really gets" · "Designed to fit your venue" · "Ready before your first guest" · "One price, paid — no drama on the road" · "Professional, every step" · "On time, in tune" · "Build your baraat in one place" · "Full josh".* **Caveat: every hook containing "guaranteed", "prepaid", or an outcome promise is now prohibited copy per `[SCOPE §8]` and must be rewritten, not reused.**
- **Per-service pitch summaries** `[BRAIN]`: venue = "**transparency + trust + freedom**"; catering = "**no shortage, no waste, no surprises**" + "a feel-good donation angle"; photography = "**on time · the real shooter · nothing lost · no surprises**"; décor = "**real looks · real flowers · real fit**"; baraat = "**one fixed price · no roadside demands · on time · full josh**".

### Emotional / cultural framing
- The product is aimed at **fear**, not convenience: "constant fear of being cheated or let down on the day" `[SCOPE §1]`; "Food runs out — **a shameful shortage**" `[BRAIN]` — social shame, not inconvenience, is the driver; "baksheesh extortion mid-procession" `[BRAIN]`; "no lost-footage nightmares" `[BRAIN]`.
- **A wedding is once-in-a-lifetime** — used as the core commercial argument (no repeat purchase → no loyalty lever → subscription over commission) `[SCOPE §2A]`, and it also means every user is a first-time user with no learning curve to amortise.
- **Elder-led households with low digital literacy** `[SCOPE §3]` → "phone+OTP only — no passwords, no email" `[TECH §4]`.
- **WhatsApp is the real interface** `[SCOPE §9, TECH §4]` — "WhatsApp-centric", "In Tier 3/4 WhatsApp open rates dwarf SMS", enquiry "hands off to WhatsApp".
- **Marathi-first vernacular intent** `[SCOPE §9]` — English at launch, Marathi first among regional languages; Maharashtrian ritual vocabulary is used natively throughout (Sakharpuda, Kelvan, Devak, Pathavni, pangat, aaher, Paithani, mangal karyalaya) — these are **product nouns, not flavour text**.
- **Founder's-hometown launch** — Shrirampur is "founder's native place" `[BRAIN]`. This is why a Tier-3/4 town is the beachhead rather than a metro.
- **Muhurat-shaped seasonality** — "muhurat-aware" checklist `[SCOPE §5.1]`, "High availability around **peak muhurat seasons**" `[SCOPE §9]`. Traffic is astrologically, not calendrically, distributed.
- **CSR angle** — "Leftover-donation tie-up (NGO) — CSR + marketing" `[BRAIN Frozen #2]`; dropped from SCOPE entirely.

### Document voice (worth preserving in the PRD's own tone)
Both v2.0 documents are written with unusual candour, and that honesty is itself a product asset:
- "This is a weaker instrument, **honestly stated**." `[SCOPE §8]`
- "A guarantee the platform cannot honour is worse for trust than no guarantee at all — and, if it induces a payment, is a legal exposure." `[SCOPE §8]`
- "**Enforcement, honestly assessed.** Your remaining lever over vendor behaviour is delisting, not withheld money." `[TECH §4]`
- "A vendor in Shrirampur will not pay a listing fee before seeing any couples." `[TECH §5]`
- "Trust claims are only as good as this process." `[SCOPE §12]`
- "**Not everyone gets on.**" `[SCOPE §8]`

### Design system (in code, not in any doc)
`packages/shared/src/tokens.js` is declared "THE single source of truth for colour and type", mirroring the prototype's `styles.css`:
- Background `#fff7fb` ("soft pink-tinted white"), text `#3a2f37` ("deep plum-grey"), textSoft `#736570` (with the note: "Darkened in the prototype to meet **WCAG AA (~5.5:1 on white)** — do not lighten" — the only accessibility requirement in the entire corpus, and it lives in a code comment).
- Accent `#e23e7a` ("primary festive accent — vivid rose-pink"), accentDark `#c62368`, accentSoft `#fde7f0`, border `#f4e3ec`.
- A "**festive wedding palette**" (pink, marigold, …) for category chips, badges, status colours.
- Splash `#e23e7a`, Android adaptive-icon background `#fff7fb` `[CODE: app.json]`.
- Indian digit grouping for money: `formatPrice` → `₹85,000` via `toLocaleString('en-IN')` `[CODE: mocks/catalog.ts]`.
- Badge vocabulary in the UI: `🏆 Verified`, `⭐ Top Rated`, `🔥 Most Booked` (max 2 per card) `[CODE: badgesFor()]`.

**None of the above design/brand material appears in SCOPE or TECH.** A PRD written only from the planning docs would drop the entire visual identity, the tagline, the accessibility contract, and the currency-format convention.

---

## 12. Summary of gaps to raise during PRD authoring

1. No success metrics or KPIs of any kind (§9.22).
2. No personas; the brainstorm's Role Playing output was never written down (§2, §9.21).
3. No packages/bundles design — Morphological Analysis never ran, yet packages are a Phase 2 commitment (§9.21).
4. No pricing numbers, no allowance numbers, no Founding-Vendor expiry (§3, §9.1–3).
5. Two conflicting MVP definitions (SCOPE Phase 1 vs TECH §5 cut) — must be reconciled (§10.1 C5).
6. Prohibited-claims audit of copy, UI and frozen specs is an open action item (§9.11).
7. The scaffolded code encodes the **dead** model (bookings, payout bank details, wrong cities, wrong categories) and is simultaneously designated "the design spec" — the PRD must say which parts of the prototype are normative (§10.2).
8. Delisting, review eligibility, ranking policy, and in-app messaging are all undefined but load-bearing for the trust spine (§9.8–10, §9.28).
