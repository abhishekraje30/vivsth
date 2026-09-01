# VivahSathi — Technology Stack Decision

> Companion to `VivahSathi-Scope-Document.md`. Decided August 2026.
> Context: solo developer, client delivery deadline, Phase 1 = Shrirampur single-city MVP.

---

## 0. Decisions at a glance

| Layer | Choice | Why |
|---|---|---|
| **Customer app** | React Native + Expo (managed, New Architecture), **Android-only at launch** | Existing React skill transfers; cloud builds (no Mac needed); OTA updates |
| **Vendor portal** | Next.js responsive web app / PWA | No store review; one mobile app instead of two; plays to existing strength |
| **Admin / Ops panel** | Frappe Desk (built-in) | ~40% of functional scope arrives free |
| **Backend** | Frappe Framework v16 (custom app `vivahsathi`) | DocType model *is* the service engine; existing expertise |
| **Database** | MariaDB (Frappe default) | Don't fight the framework |
| **Search** | MariaDB at MVP → Meilisearch/Typesense behind an interface | Deferred, but designed for |
| **Media** | Cloudflare R2 (or S3) + CDN | Photo-heavy product; never use Frappe's file store for user media |
| **Payments** | Razorpay standard checkout — **vendor subscriptions only** | Platform never touches booking money; no Route, no escrow, no split |
| **Revenue model** | Vendor subscription (listing fee). Couples pay nothing. | Decided Aug 2026 — replaces the commission/escrow model |
| **Messaging** | WhatsApp Business API (Meta Cloud) + SMS fallback | Tier 3/4 reality; scope already says WhatsApp-centric |
| **Auth** | Phone + OTP via MSG91, custom Frappe login flow | Frappe has no phone auth out of the box |

---

## 1. Mobile app

### Chosen: React Native + Expo

Rejected Flutter. Reasons, in order of weight:

1. **No Mac in the toolchain.** Development happens on Linux/WSL. Expo EAS builds iOS in the cloud; Flutter requires macOS for iOS artifacts. This is a hard blocker, not a preference.
2. **Skill transfer.** React + `expo-router` (file-based, same mental model as the Next.js App Router) vs. learning Dart and the widget tree from zero. With a client deadline this is weeks of difference.
3. **OTA updates.** `expo-updates` ships JS fixes without a Play Store review cycle — high value for a first release in an unfamiliar market.
4. **Hiring.** If the team grows, React Native roles fill in roughly half the time of Flutter roles in India.

Performance is not a deciding factor in 2026. The New Architecture (Fabric + TurboModules) has been default since RN 0.76 and Hermes V1 since 0.84; booking and listing flows hit 60fps on budget Android on both frameworks.

### Package set

| Concern | Package | Note |
|---|---|---|
| Framework | `expo` (latest SDK), `react-native` | Managed workflow + dev client |
| Routing | `expo-router` | File-based, mirrors Next.js App Router |
| Styling | `nativewind` | Tailwind syntax — reuses the prototype's design tokens |
| Server state | `@tanstack/react-query` | Caching, retry, offline-ish behaviour |
| Client state | `zustand` | Already used in ArchDesign |
| Storage | `react-native-mmkv` | Fast; replaces the prototype's `localStorage` |
| Lists | `@shopify/flash-list` | Long vendor lists on low-RAM devices |
| Images | `expo-image` | Disk caching, blurhash placeholders |
| Forms | `react-hook-form` + `zod` | Share zod schemas with the Next.js portal |
| i18n | `i18next` + `expo-localization` | **Wire in from day 1**, translate later |
| Payments | Razorpay React Native SDK | Requires a dev build, not Expo Go |
| Errors | `@sentry/react-native` | Non-negotiable for a device fleet you can't see |
| Build/ship | EAS Build + EAS Update | Cloud builds, OTA channel per environment |

### Non-obvious constraints

- **Test on a real budget Android phone from week 1.** The emulator lies about scroll performance and cold start. Target: install size under ~30MB, cold start under 2s.
- Once Razorpay's native SDK is added, Expo Go stops working. Move to a **dev client** early so this isn't a surprise mid-build.
- No SSR, no DOM, no CSS cascade. Everything is client-side rendering against a cache.

---

## 2. Backend — Frappe v16

### Why Frappe is the right call here (not a compromise)

The scope's §5.3 Admin/Ops panel — vendor verification, KYC approval, catalog management, booking and dispute management, payout handling, manager assignment, moderation, reports — is roughly 40% of the functional surface and 0% of the visible product. Frappe Desk generates all of it from DocType definitions, with role permissions, workflow states, and an audit trail included.

Equally, §4's "one engine × N services — services are *configured, not re-built*" is precisely the DocType + metadata model. Building that engine from scratch on Node would mean reimplementing what Frappe already is.

### API surface — what the clients actually call

Frappe's current HTTP API is **v2**:

| Purpose | Endpoint |
|---|---|
| Document CRUD | `GET/POST/PUT/PATCH/DELETE /api/v2/document/{doctype}[/{name}]` |
| Document method | `GET/POST /api/v2/document/{doctype}/{name}/method/{method}` |
| Whitelisted method (RPC) | `GET/POST /api/v2/method/{dotted.python.path}` |
| Count | `GET /api/v2/doctype/{doctype}/count` |
| Bulk | `POST /api/v2/document/{doctype}/bulk_update` · `bulk_delete` |

v2 differs from the legacy v1 (`/api/resource`, `/api/method`) in more than the path — `filters` takes object form, pagination is `limit`/`start` rather than `limit_page_length`/`limit_start`, and list responses carry `has_next_page`. Ignore v1 examples found in older blog posts and SDK wrappers.

### Rule: the mobile app calls purpose-built RPC, not the generic document API

Both clients hit **whitelisted methods only**:

```
POST /api/v2/method/vivahsathi.api.mobile.v1.search_listings
GET  /api/v2/method/vivahsathi.api.mobile.v1.get_listing
POST /api/v2/method/vivahsathi.api.mobile.v1.create_booking
```

*(App-level `v1` is versioned independently of Frappe's transport-level `v2` — they are different things and will drift apart.)*

Why this matters more for mobile than for web: `/api/v2/document/Vendor Listing` returns your schema. A Next.js app can be redeployed the instant that schema changes; a binary sitting on ten thousand budget Androids cannot. Every DocType field rename becomes a breaking change for users who haven't updated. Purpose-built methods give you a contract you control and can version.

Secondary benefits: one round-trip instead of N (a listing screen needs vendor + packages + availability + review aggregate), no over-fetching on metered mobile data, and permission logic in one auditable place.

### Two more rules from day one

1. **User media goes to R2/S3 + CDN**, never Frappe's file store. Vendor portfolios are the heaviest asset class in this product.
2. **Search sits behind an interface.** MariaDB filtering is fine for Shrirampur. It will not survive multi-city with geo + date-availability + capacity + budget facets. Define `search_listings()` as a single seam so swapping in Meilisearch/Typesense is one file.

### Known weak spots (accepted, mitigated)

| Weakness | Mitigation |
|---|---|
| Weak full-text / geo search | The interface seam above |
| Basic realtime (socket.io) | Wedding-manager chat is Phase 2 — punt, or route it through WhatsApp |
| Smaller hiring pool than Node | Acceptable at solo/small-team scale |
| Python monolith | Fine at one city; the service seams above are the escape hatches |

---

## 3. The service engine — data model spine

The single most important design decision. Category-specific fields must **not** become one DocType per service, or "50+ services" becomes 50 builds.

```
Wedding  (parent object — couple, city, budget, guest count, draft-first)
  └─ Wedding Function  (Haldi / Mehndi / Sangeet / Wedding / Reception / custom)
        │  date, time, venue, guest count
        └─ Enquiry  ──────────────┐   the lead. No money flows through it.
                                  │
Service Category  (Venue, Catering, Photography, Décor, Band)
  └─ Service Category Field  (config: which filters/attributes this category has)
                                  │
Vendor  (KYC, verification workflow, service cities)
  ├─ Vendor Listing  ─────────────┤  links Vendor + Service Category
  │     ├─ Listing Attribute Value (child: key/value, driven by Category Field)
  │     ├─ Package                 (child: tiers + all-in pricing)
  │     └─ Availability Block      (date-wise open/blocked, vendor-declared)
  │                               │
  └─ Vendor Subscription  ────────┘  plan, period, status, expiry
        └─ Subscription Plan         tier, price, listing/photo/lead limits
        └─ Subscription Invoice      Razorpay payment + GST invoice

Lead Event   ← the revenue-critical table: view, contact-reveal, enquiry, call
Review         post-delivery, admin-moderated
Budget Line    couple's own planned-vs-actual (manual, since we see no payments)
```

**Key mechanic:** `Service Category Field` is configuration data. Adding "Makeup & Beauty" in Phase 2 means creating a category row and its field definitions — an admin action, not a deploy. The mobile app renders filters and listing detail sections dynamically from that config.

**Trade-off, acknowledged:** the attribute-value child table makes SQL filtering awkward. That is the concrete reason the search seam exists — the search index flattens attributes into filterable facets.

**Enquiry workflow** (a Frappe Workflow):
`New → Contacted → Site Visit → Won → Delivered → Closed` (+ `Lost` from any pre-Won state).

Note what changed: there is no `Token Paid` state, because no money passes through the platform. `Won` and `Delivered` are **vendor-declared** (and optionally couple-confirmed) rather than payment-derived. That weakens their reliability — but they are what unlocks review collection and what feeds the vendor's conversion stats, so both sides have a reason to mark them honestly.

**Subscription lifecycle:** `Trial → Active → Grace → Expired → Suspended`. On `Expired`, listings auto-hide rather than delete — a vendor who renews must get their portfolio back intact, or they won't renew.

---

## 4. Integrations — India-specific

### Payments — vendor subscriptions only

**Revenue model (decided Aug 2026):** vendors pay a recurring listing fee. Couples pay nothing, and no booking money passes through the platform. Deals are settled directly between couple and vendor, offline.

This deletes an enormous amount of work and risk:

| Gone | Why it mattered |
|---|---|
| Razorpay Route, linked accounts, split settlement | Weeks of integration + reconciliation |
| Escrow ledger, milestone releases, release-on-delivery | The single most complex subsystem in the old design |
| Payout KYC (bank account, IFSC penny-drop) | Vendor onboarding drops to identity/business KYC only |
| RBI Payment Aggregator licence exposure | No longer holding customer funds — question doesn't arise |
| Money disputes, refunds, chargebacks | Not our transaction, not our dispute |

What replaces it is ordinary SaaS billing: **you are the merchant, the vendor is the customer, one Razorpay account, no marketplace complexity.**

- **MVP:** one-time payment per plan period (6 or 12 months) via Razorpay standard checkout, with expiry reminders over WhatsApp. Simpler than mandates and avoids autopay failure handling entirely.
- **Later:** Razorpay Subscriptions with UPI Autopay / e-mandate, once renewal volume makes manual chasing painful.
- **GST:** you are selling an advertising/listing service, so you must issue GST invoices (18% is the standard rate for this category — confirm with your CA). Frappe handles invoice generation and GST fields natively; this is one of the things it is genuinely best at.

### The Play Store billing trap — already sidestepped

Google Play requires Play Billing (15–30%) for digital subscriptions sold **inside an Android app**. Because the vendor portal is a **Next.js web app**, vendors subscribe on the web and this question never arises.

The customer app, meanwhile, now has **zero payment surface of any kind** — the cleanest possible Play Store review story.

This retroactively makes the vendor-portal-as-web decision more valuable than it looked when we made it. Do not later "helpfully" add subscription payment into a vendor mobile app without re-reading Google's policy first.

### What the subscription model demands in return

Removing escrow removes work, but it moves the burden of proof. Two things become MVP-critical that were previously deferrable:

**1. Lead tracking is now the product.** A vendor renews if and only if you can show them what they got. "You received 47 enquiries and 12 contact reveals this month" *is* the renewal argument. So the `Lead Event` table and the vendor dashboard built on it are not Phase 2 analytics — they are the revenue engine. This reverses the earlier MVP cut that trimmed vendor analytics to a booking count.

To count leads at all, contact details must not be plainly visible. MVP approach: **reveal-contact-on-tap**, logged as a `Lead Event`, plus an in-app enquiry form that hands off to WhatsApp. Cheap, and it produces the metric. Masked calling (Exotel/Knowlarity) proves call volume properly but costs per-minute — defer until vendors dispute your numbers.

**2. The Wedding Workspace is now the entire customer-side moat.** Without escrow and guarantees, the marketplace layer alone is a directory — and a couple with a directory-shaped need will use Google or WedMeGood. The budget tracker, function planner, checklist and guest list are the reason someone opens *your* app instead. Strengthen this in MVP rather than trimming it; the escrow work you just deleted more than pays for it.

**Enforcement, honestly assessed.** Your remaining lever over vendor behaviour is **delisting**, not withheld money. That is weaker, but it is real and it is exactly what every Indian listing platform runs on. It still supports: verified vendors, verified real portfolios, reviews from confirmed enquiries, and mandatory all-in pricing as a condition of listing. It does **not** support the outcome guarantees in scope §8 — on-time delivery, no-shortage-no-waste, no on-the-spot demands, on-time setup. Those claims must come out of the marketing copy and the frozen service specs, or they become promises you cannot keep.

### Auth

Frappe ships no phone/OTP auth. Build: MSG91 (or Firebase Phone Auth) issues and verifies the OTP → a whitelisted Frappe method mints the session/token. Elder-led, low-digital-literacy users means phone+OTP only — no passwords, no email.

### Notifications

WhatsApp Business API via Meta Cloud API (AiSensy / Interakt / Gupshup as BSP) as the primary channel, SMS as fallback, push via Expo Notifications. In Tier 3/4 WhatsApp open rates dwarf SMS, and the scope already commits to WhatsApp-centric.

### Maps

Google Maps is the default but bills in USD. Evaluate **Mappls (MapmyIndia)** or **Ola Maps** — better Indian address/POI data at materially lower cost.

---

## 5. Ruthless MVP cut (solo + deadline)

Phase 1 in the scope doc is still too wide for one developer. Recommended trims:

| Feature | MVP treatment |
|---|---|
| Escrow / booking payments | **Deleted entirely.** Not in any phase. |
| Vendor lead dashboard | **Build properly.** Enquiries, contact reveals, conversion. This is the renewal argument. |
| Wedding Workspace | **Strengthen.** Budget tracker, functions, checklist, guest list — the only customer-side moat left. |
| Vendor subscriptions | One-time payment per 6/12-month plan. No mandates, no autopay. |
| Guest management | Flat list only. No RSVP, no invitations, no QR. |
| Budget tracker | Manual entry by the couple (we no longer see payments to derive from). |
| Multi-language | i18n wired from day 1; **English only** translated at launch. Marathi in Phase 2. |
| Reviews | Post-enquiry, text + rating, admin-moderated. No photo reviews. |
| Wedding Manager | Already Phase 2 — hold the line. |
| Compare | **Keep.** Cheap to build, and it's a visible differentiator. |

Retrofitting i18n is brutal; retrofitting photo reviews is trivial. That asymmetry drives the list above.

**Net effect of dropping escrow:** roughly 4–6 weeks of the hardest, highest-risk work removed; roughly 1.5–2 weeks of subscription billing and lead tracking added. Spend part of the difference on the Workspace.

### Cold-start reality

A Shrirampur vendor will not pay a listing fee before seeing any couples. The honest launch sequence is free listings first, demand second, charging third. Build the subscription system in MVP, but ship a **₹0 "Founding Vendor" plan with a fixed expiry date** for the launch cohort. Modelling that as a real plan — rather than a hardcoded bypass — means switching them to paid later is a data change, not a code change.

---

## 6. Start the paperwork in week 1

Three external approvals sit on the critical path and none of them are code:

1. **Google Play developer account — register as an organisation (Anvayro), not a personal account.** New *personal* accounts must run a closed test with 12+ testers for 14 continuous days before production access is granted. An organisation account is exempt. Getting this wrong costs ~2 weeks at the worst possible moment. *(Verify current policy at registration — Google adjusts this.)*
2. **Razorpay merchant account** — plain standard checkout, no Route, no marketplace onboarding. Much faster than the old path. Client provides the business registration (scope §12).
3. **Meta Business verification** for WhatsApp Business API — typically 1–3 weeks.
4. **GST registration + invoicing setup** — you are now selling a taxable service to vendors. Confirm the rate and invoice format with the client's CA before the first rupee is collected.

All four are client-dependency items. Raise them at sign-off.

---

## 7. Repository layout

```
vivahsathi/
├─ apps/
│  ├─ mobile/          # Expo app (customer, Android-first)
│  └─ vendor-web/      # Next.js vendor portal (responsive/PWA)
├─ packages/
│  └─ shared/          # zod schemas + TS types for the mobile.v1 API contract
└─ backend/
   └─ vivahsathi/      # Frappe custom app
      └─ api/mobile/v1/  # whitelisted methods — the only surface clients touch
```

The `shared` package is the discipline that keeps three surfaces honest against one API. Hand-maintain zod schemas mirroring the `mobile.v1` methods; both clients import them.

---

## 8. Learning path (zero prior mobile experience)

The prototype in this repo is the design spec — the screens, the flows, and the design tokens already exist. The mobile work is porting, not designing.

- **Week 1** — Expo tutorial; `expo-router`; get a dev client running on a real budget Android phone; set up EAS Build. Port `index.html` and `category.html` with mocked data.
- **Week 2** — NativeWind port of the `styles.css` design tokens; FlashList for the vendor listing; `expo-image` for the gallery.
- **Week 3** — TanStack Query against the first real `mobile.v1` methods; phone+OTP login.

Mental shifts from Next.js: no CSS cascade (`View`/`Text`/`Pressable` only), navigation is a stack rather than a URL bar, lists are virtualised not `.map()`ed, and there is no server rendering — everything is client-side against a cache.
