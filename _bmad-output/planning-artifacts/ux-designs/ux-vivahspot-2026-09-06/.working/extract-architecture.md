# UX-relevant constraint extraction — Vivah Spot

Working note for the UX design workflow. Source documents, read in this order:

1. `_bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md` (676 lines, AD-1..AD-36) — **authoritative**
2. `_bmad-output/planning-artifacts/VivahSpot-Scope-Document.md` (374 lines)
3. `_bmad-output/planning-artifacts/VivahSpot-Tech-Stack.md` (298 lines) — **§3 data model and four other sections are explicitly superseded**; anything taken from it is flagged `[TECH-STACK — VERIFY]`

Nothing here is inferred. Every line carries the AD id or the document section it comes from.
Where a claim is a **preference** rather than a **hard constraint**, it is marked *(preference)*.

Status: complete — all three documents read in full. Pass 1 ARCHITECTURE-SPINE (§1–§7), pass 2 Scope
Document (§S-1–§S-9), pass 3 Tech-Stack (§T-1–§T-4), then a consolidated do-not-draw table.

---

## 1 · Architecture Decisions a UX designer must obey

Ordered by how much each one shapes a screen. "Forbids / requires" is stated in UI terms only.

### The ones that change what you can draw at all

| AD | What it forbids or requires in the UI |
| --- | --- |
| **AD-19** | **Clients never do money arithmetic.** No total, no per-head multiplication, no budget rollup, no tax line may be computed in the app or the portal — every figure arrives from the server pre-computed and the UI only renders it. Design consequence: no live-updating "as you type" totals unless a round trip backs them. |
| **AD-19** | Money is rupees (Frappe `Currency`), never paise, on every surface. A **single display formatter lives in `packages/shared`** — one price format across mobile, vendor portal and guest pages. |
| **AD-19** | The running budget totals **Selections and confirmed Agreements only** — Shortlist entries are never in the total (FR-8). A Service whose Functions are undecided must render **"not yet estimated", never ₹0**. A Span Selection counts **once** for the whole Span however many Functions it covers. |
| **AD-19** | FR-8's two acts are distinct UI affordances: an **adjustment** (override a derived figure — sticky, the corrected figure stays corrected) and an **addition** (append a cost the platform knows nothing about). They must not be collapsed into one "add a line" control — that double-counts every correction. |
| **AD-19** | A Selection stores the price at the moment the Family picked it; a Vendor later raising his rate does **not** re-price an existing plan. The UI must not imply prices in a plan are live. |
| **AD-10** | **No surface ever asserts availability as fact.** Every availability rendering is attributed to the Vendor — copy is **"vendor shows available"**, never "available". The API returns an attributed signal, not a boolean the client may relabel. |
| **AD-10** | A Family with **no Anchor Date yet** sees Listings **without an availability signal** — not as unavailable. Needs a distinct third visual state (unknown), not a greyed-out "unavailable". |
| **AD-10** | **"no duration" Engagement Model Services are presented without any availability claim** — never as unavailable. Their only signal is whether the Vendor is currently accepting Enquiries (FR-28). |
| **AD-10** | Availability answers differ per Engagement Model — Span (whole closure incl. overnights), per Function, rental period (date range), lead time (deliver-by date), no duration (excluded from matching). Five different question shapes on the availability UI, not one. |
| **AD-10 / AD-36** | Where a Service has **Spaces**, availability is per Space and a Listing shows available if **any** Space is. The UI must let a Family see which Space. |
| **AD-9** | **Wedding time is a `DATE` + a `Slot` enum — morning, afternoon, evening, night — the same four Slots for every Service (FR-28).** No clock time anywhere in date-picking, matching, Block selection, Vendor calendar or Agreement UI. A Function has an *optional display-time field for the invitation only* (UJ-5) which never travels to a Vendor and is never read by matching. Rental-period Services show a `DATE` **range**; lead-time Services show a required-by `DATE`; neither has a time of day. |
| **AD-9** | Timestamps appear only on records — Agreement confirmation, audit entries — never on the wedding itself. |
| **AD-24** | **The PRD §3 Glossary is binding UI copy vocabulary:** Listing, Service, Space, Slot, Span, Candidate Block, Chosen Block, Shortlist, Selection, Enquiry, Quote, Agreement, Amendment, Commitment, Rules, Subscription, Tier, Verification. No synonyms. |
| **AD-24** | **Banned words, gated by a pre-commit check across `apps/`, `packages/` and the root `.html` files:** *book now, booking, booked, cart, checkout, legally binding, guaranteed, enforced by Vivah Spot*. A designer must not label any button or state with them. |
| **AD-24** | Mechanism record names (`Block Change`, `Cancellation`, `Vendor Block`, `Cascade Outbox`, `Wedding Budget`, `Rule Acceptance`, `Rule Conflict`, `Listing Condition Change`, `Vendor Removal`, `Wedding State Change`) are architecture, **never shown in copy a Family or Vendor reads**. |
| **AD-34 / PRD §7.1** | **The platform collects Subscriptions only. No money ever moves between a Family and a Vendor.** No payment UI on the Family side at all. |
| **AD-34 / FR-54** | Vendor Subscription is a **twelve-month prepaid term bought by a deliberate act** — **no auto-renewal, no standing mandate, no e-mandate, no UPI Autopay, no stored card**. So: no "manage auto-renew" toggle, no saved-instrument list, no "your card will be charged" copy. One-time checkout per term only. |
| **AD-34** | An issued invoice is immutable and consecutively numbered; a correction is a **credit note**, never an edit. No "edit invoice" affordance. Tax is by the **recipient's** State. A price change never alters what a Vendor already bought. |
| **AD-12** | **A confirmed Agreement is frozen.** No edit path, no `PATCH`, no Admin edit. An **Amendment appends** a new record; it never cancels. So the Agreement screen is read-only after both-party confirmation, with "propose an Amendment" as the only forward action. |
| **AD-12** | FR-40's download **returns the same stored bytes every time — never a re-render**. A downloaded Agreement copy is byte-identical in 2034 and 2026. No "regenerate PDF" control; no template/theme choice on the document. |
| **AD-12** | The Agreement carries a hash chain + head digest; FR-43's certificate is generated from those rows. There is a certificate surface to design. |
| **AD-27 / FR-41** | **The platform authors no Agreement terms.** No Agreement term field carries a default — so no pre-filled boilerplate, no suggested clauses, no template terms in the Agreement compose UI. |
| **AD-27 / FR-46** | A Review **cannot be edited, removed or reordered**. No edit/delete affordance on a posted Review. |
| **AD-27 / FR-59, FR-71** | A Listing **cannot be published without Verification, an all-in price, Rules and a Commitment.** The Listing editor needs a completeness gate showing exactly these four. |
| **AD-27 / FR-39** | The two confirming parties are different accounts, and **no account transacts with its own Listing**. |
| **AD-13 / FR-42** | The profile-visible cancellation count is **a neutral number over a rolling 24 months, with no fault attributed or inferred**. An Amendment (FR-69) writes nothing to it. A cancellation following FR-60 Admin removal is not counted against the Family. Copy must not blame. |

### Auth, identity, session

| AD | What it forbids or requires in the UI |
| --- | --- |
| **AD-28** | **Mobile number is the identity; one person is one account.** **No password exists on any surface** — no password field, no "forgot password", no magic-email-link, no username+password fallback (all three Frappe doors are explicitly disabled). |
| **AD-28** | OTP: **six digits, valid ten minutes, at most five attempts and three resends per hour per number.** The OTP screen must express those limits. (Rate limits are *deliberately absent in development* and required before the first real user — see Deferred.) |
| **AD-28** | **Session ends after ninety days of *inactivity*, not ninety days from sign-in** — refreshed on activity. A planner who opens the app once a quarter is never signed out. Do not design a "your session expires on <date>" message. Not per-device. |
| **AD-28** | Passkey, Google and Apple are **additional sign-in methods that only *link* to an existing account on a verified matching mobile number**; an email address alone links nothing. So they are never a standalone signup path. |
| **AD-28** | **One account may hold both Family and Vendor roles**, and what it may do follows from **the role it is acting as**, not which client it signed in from. Implies a role context that is explicit in the UI. |
| **AD-28** | Changing a number requires proof of control of both; losing it is recovered **through Admin**, attributed and recorded — i.e. a human-assisted recovery flow, not self-service. |
| **AD-17 / FR-5** | Wedding access is a **`Wedding Member` membership table with an explicit role** (Creator + Invited Members). Frappe document sharing is **off site-wide** — there is no "share this with a link" affordance for a Wedding. The model must express **"may view everything, may commit to nothing"**. |
| **AD-18 / FR-6** | **Creator-only actions:** raising an Enquiry, contact reveal, confirmation, cancellation, and review. Invited Members see but cannot do these — the UI needs a visible, non-punitive read-only state for them. |
| **AD-30** | Guest surfaces are **token-addressed**: an unguessable link addresses exactly one Guest of one Wedding, is revocable by the Creator, and **expires when the Wedding concludes or is abandoned**. No guest login, no guest account. |
| **AD-30** | A guest response exposes **that Guest's own invitation and answer and nothing else about the Wedding.** |
| **AD-30** | The guest-list form's submissions arrive as **suggestions the Creator accepts or dismisses** — never written straight into the list. Design a review queue. |
| **AD-30 / AD-32** | The see-and-correct (personal-data) surface lives on `guest-web`, is reachable **without a login**, and returns **nothing** until the caller has entered a mobile number and proved control by one-time code. Two-step by construction. |
| **AD-33 / FR-63** | A **grievance is reachable without a login from every surface**, gets a **reference the complainant can quote**, and is acknowledged and disposed within seven days. Every surface needs that entry point. |

### Media, portfolio, verification

| AD | What it forbids or requires in the UI |
| --- | --- |
| **AD-20** | **Verification gates each item, not the Listing.** A new photo is hidden while the rest of the Listing stays live and keeps receiving Enquiries. The verified set is: identity, business registration, portfolio images, Spaces with capacities and Stated Sizes. |
| **AD-20** | A change of **identity** is the sole exception — it takes the whole Listing pending. |
| **AD-20** | **Price, Rules, Commitment, calendar and seasonal pricing are Vendor declarations — not verified, publish immediately.** The Listing editor must show two visibly different classes of field. |
| **AD-20 / FR-27** | A Listing **over its Tier allowance keeps every image**; the published set is the **first N of the Vendor's own ordering (default upload order) over the verified images**. A pending image never consumes a paid slot. A **takedown leaves its gap** rather than promoting an unchosen image. The portfolio manager needs explicit reorder + a clear "published / held back / pending / taken down" state per image. |
| **AD-20** | A Listing that **lapses or is withdrawn keeps its images served** — the portfolio "reappears intact on renewal" (FR-53) and the Family still corresponding must still see it. Admin removal (FR-60) and takedown (FR-63) **do** demote the media. |
| **AD-29** | Pending images, verification evidence and identity documents are **private, reachable only through a short-lived signed URL** issued after a permission check. Any UI showing them must tolerate URL expiry (re-fetch, not a broken image). |
| **AD-29** | Object keys are **opaque and never enumerable** — no gallery-by-guessing, no predictable image URLs. |

### Discovery, search, ordering

| AD | What it forbids or requires in the UI |
| --- | --- |
| **AD-22** | **The result-order seed is fixed per search** — the tie-break shuffle is seeded once when a Family opens a Service's results, held for that browsing session, re-seeded on a new search. So pagination/infinite scroll must reuse the session's seed; a pull-to-refresh that re-seeds is a re-shuffle and must be a deliberate "new search". |
| **AD-22** | Ordering above the tie-break is fixed: **availability → rating (shrunk toward the Service average at the Listing's own Place level) → median first-reply time → verification freshness.** Median first-reply time is a real ranking signal, so it is presentable. |
| **AD-22** | **Neither what a Vendor pays nor how recently they joined is a ranking signal at any weight.** |
| **AD-22** | **Featured placement is a separate, marked band — never inside the organic ordering.** Paid placement must be visually and semantically separated and labelled. |
| **AD-35** | Discoverability is one flag with six terms: verification complete; every condition of listing satisfied; Subscription active or in Grace Period; not withdrawn by the Vendor; not removed by Admin; not under takedown. A Listing failing any of these is simply absent from search. |
| **AD-35 / AD-10** | A Listing past its Grace Period **shows no dates**, because it is not discoverable. **Founding Vendor at ₹0 is an active Subscription and shows dates like any other** — no second-class visual treatment. |
| **AD-36** | **Place is a tree** (village–tehsil–district–state). Two different questions with different answers: **`covers(area, place)`** — "will he come to mine?", ancestor-or-self, used for matching, Enquiry and Agreement; and **`within(place, subtree)`** — the browsing question before she has chosen a town, **a discovery convenience only, never the coverage test.** The place picker and the vendor coverage declaration are different controls. |
| **AD-36 / FR-33** | A Vendor may declare **several areas at different levels**; coverage is *any* of them. |
| **AD-36 / FR-19, FR-24, FR-32** | **A Rule is a typed row, never prose alone.** Two kinds: `restrict_service` (names a Service, resolves to that Vendor's Preferred Vendors, and is what FR-32 reads to show the Family **by name** what engaging this Vendor would invalidate) and `informational` (text, binds nothing). **Both display together on the Listing so the Family reads one list.** Rules attach to the **Space** where the Service has Spaces, to the Listing where it does not — a lawn and an AC hall can carry different Rules. |
| **AD-36 / FR-25** | Preferred Vendor guards, all three UI-visible: **a named Vendor must accept before the association is published**; **where a Preferred Vendor is the same business it is shown as the same business**, never as an independent recommendation; and **preferred surfacing is never purchasable**. |
| **AD-6** | One `Listing` core + one detail DocType per Service, with **real indexed columns**. Cross-Service reads (Block matching, running budget, Workspace) touch only the core — so the cross-Service surfaces can only show core fields: Vendor, Service, all-in price, Commitment, verification state, portfolio, Place coverage. |
| **AD-8** | Which detail columns appear **as filters** and **as comparison attributes** is Admin-editable data per Service — the filter panel and comparison table are **data-driven, not hand-drawn per Service**. Also data: Engagement Model, Sizing Attribute, Order Basis, pricing model, whether the Service has Spaces. |
| **AD-8 / FR-62** | For *presentational* declarations, existing Listings, Shortlists, Enquiries and Agreements **keep the shape they were created under**; where a change makes a published Listing incomplete, the Listing keeps its published state and **its Vendor is asked to supply what is now needed** — a design surface (a "your Listing needs one more thing" prompt). Same shape when Order Basis or pricing model changes: **the Vendor is asked to restate his price before the Listing publishes again.** |

### Concurrency, calendar, Agreements

| AD | What it forbids or requires in the UI |
| --- | --- |
| **AD-11** | **Every Space carries an explicit `concurrent_capacity`, declared by the Vendor, minimum 1, never implicitly defaulted.** The Vendor onboarding must ask for it in plain terms ("how many weddings will you shoot in one Slot?"). |
| **AD-11 / FR-28** | A Vendor may **block Slots without stating a reason** (maintenance, family use). A Vendor's block **fills every seat**. A **partial block** is expressible — block one crew, keep selling the other. The calendar UI must offer both whole-Slot and partial blocking. |
| **AD-11 / FR-39** | When every seat is taken, **the Vendor is told which engagement conflicts**, and **the Family's proposed terms return to the thread as declined-by-conflict — never silently expired.** A losing race is a visible, explained thread event. |
| **AD-11** | Every bookable thing is a Space: a Service with real Spaces has them (lawn, AC hall); one without gets **one implicit Space per Listing**; a rental-period Service's **inventory item is a Space** (one lehenga is one lehenga). |
| **AD-12** | An Amendment that moves days applies a set difference — **there is never a moment when the Agreement's own days are unheld**. Copy may say the dates are held throughout. |
| **AD-26 / FR-53** | Four routes out of discovery (lapse past Grace, Vendor withdrawal, Admin removal, a condition ceasing to hold) behave **identically for Families** — one notification design covers all four. **Re-entry (FR-59) restores discoverability and notifies nobody.** |
| **AD-26 / FR-60** | Admin removal adds the one step nothing else has: **telling every Family holding an Agreement that the Vendor was *removed*.** A distinct message. |
| **AD-26 / FR-32** | Cascade 2 fires on **confirmation**, not acceptance — a Family who accepts and then **loses the Slot race must find her Shortlist, Selections and Agreements exactly as they were.** Nothing is removed until the engagement actually completes. |
| **AD-36 / FR-32** | Where the confirmation-time Preferred-Vendor set has narrowed since acceptance, the system **re-prompts rather than removing anything unnamed.** A Family must never discover a Vendor missing from her Shortlist without having been told and having agreed. |

### Versioning — what freezes a shipped client's UI contract

| AD | What it forbids or requires in the UI |
| --- | --- |
| **AD-3** | **`api/family/v1/` is frozen once shipped** — a breaking change adds `v2` beside it and never edits `v1` in place, **because the phone cannot be redeployed**. Consequence for UX: a mobile screen's data contract is effectively permanent once released; adding a field to an existing family screen is a versioning event, not a tweak. Design for additive change. |
| **AD-3** | `api/vendor/` and `api/guest/` carry **no** version segment because those clients redeploy with the backend — vendor-portal and guest-page UX can evolve freely. **The asymmetry is deliberate.** |
| **AD-2** | Every client read and write goes through a **purpose-built whitelisted method**; no client touches the generic document API. Practical UX effect: a screen that needs a new combination of data needs a new server method — screen composition is not free. |
| **AD-4** | The annotated Python signature is the contract; **zod schemas in `packages/shared` are generated from it, never hand-written.** UI shapes follow the contract, not the reverse. |
| **AD-6** | Adding or removing a detail field is **a schema change and therefore a release** — a new Service attribute on a form is not configuration. |
| **AD-5 / FR-62 / UJ-4** | **Accepted cost, stated in the spine:** the PRD's promise that Admin ships a Service "without a developer and without a release" holds for a Service's **declarations** (AD-8) only, **not its behaviour or its field set**. **The PRD needs amending** (and was amended 2026-09-06). A designer must not draw a self-service "create a new Service" admin flow that produces a fully working Service. |

### i18n, accessibility, identity/voice — from "Consistency Conventions"

| Source | Constraint |
| --- | --- |
| Conventions §i18n / NFR 5.1 | **Every user-facing string goes through `i18next` from day one**, while English is the only locale. No hard-coded strings, including in mockups handed to devs. |
| Conventions §Accessibility / NFR 5.8 | **WCAG 2.1 AA on all five surfaces, the two public Guest pages included.** |
| Conventions §Accessibility | **Nothing essential is conveyed by colour alone — verified status, availability and paid placement each carry a non-colour indicator.** This is a hard constraint and directly shapes badge design. |
| Conventions §Identity & voice / NFR 5.10 | `packages/shared/src/tokens.js` is **the single source for colour and type**, plain ESM. **The muted text token is contrast-locked — darkened to meet WCAG AA on white — and must not be lightened by any later design pass.** Explicitly aimed at a design pass. |
| Conventions §Identity & voice | **"Copy states what is true: 'vendor shows available', never 'available'."** |
| Conventions §Dates & time | Timezone is **Asia/Kolkata**. |
| Conventions §Errors | `frappe.throw` messages are translated (`_()`), and **a traceback's text never reaches a caller** — error states show product copy, never technical detail. |
| Conventions §Response envelope | `/api/v2/method/*` wraps everything in `data`. |
| Conventions §Logging | Guest contact fields are `permlevel`-restricted and **every read is logged** — a contact-reveal is an audited act, which the UI should make felt. |

---

## 2 · The three (five) surfaces

The spine counts **five surfaces** (Conventions §Accessibility: "all five surfaces, the two public Guest pages included"), across the client repo and the bench.

| Surface | Repo path | For whom | What it is for | What it is explicitly NOT for |
| --- | --- | --- | --- | --- |
| **`apps/mobile`** — Expo, Family | `apps/mobile/` (Structural Seed) | Families / planners | The Wedding Workspace, dates & availability, discovery & comparison, Shortlist/Selection, Enquiries, Agreements, running budget, guest list composition | Not a payment surface (AD-34: no money moves between Family and Vendor). Not redeployable on demand — its API is frozen at `family/v1` (AD-3). Not a place any money arithmetic happens (AD-19). |
| **`apps/vendor-web`** — Next.js, Vendor | `apps/vendor-web/` | Vendors | Listing management, Spaces + capacities, calendar & blocking, Enquiries/Lead Dashboard, Quotes, Agreements, Subscription & billing, Verification | Not versioned/frozen — evolves with the backend (AD-3). Still may not call the generic document API (AD-2) and still may not do money arithmetic (AD-19). Not a place with recurring-payment UI (AD-34). |
| **`apps/guest-web`** — Next.js, Guest | `apps/guest-web/` | Wedding guests + **any person exercising data rights** | Two public pages: the **invitation/RSVP** (FR-11, FR-12, UJ-5) and the **guest-list form**; plus **AD-32's see-and-correct personal-data surface** and (per AD-33) grievance intake | Not authenticated — token-addressed only (AD-30). Never exposes anything about the Wedding beyond that Guest's own invitation and answer. `noindex` is a **server response header**, not a client meta tag. No guest account is ever created. |
| **Frappe Desk** — Admin | bench, not this repo | Admin | Configuration (AD-8 declarations, Places, Tiers, prices), Verification, removals, takedowns, grievances, holds | **"Frappe Desk is not a client"** (Design Paradigm) — it sits directly on the DocTypes and is never a client of `api/`. This is *why* AD-27 exists. There is no custom Admin UI to design; Desk is the Admin console (Capability Map 4.13). |
| **Static site** — `vivahspot.com` | repo root: `index.html`, `vendor/`, `account/`, `styles.css` | Public / marketing | Marketing, deploys independently of the monorepo | **Currently contradicts the product** — see Contradictions below. |

The dependency arrow (Design Paradigm, AD-1) is one-way: clients → `api/` → `domain/` → `services/` → DocTypes. **No business rule lives in a client** (AD-2's stated caveat: neither AD-1 nor AD-2 can see client code, which is why AD-19's "clients never do money arithmetic" is phrased as a forbidden *operation*).

---

## 3 · Scope — in and out (spine pass; Scope Document pass appended below)

**In scope, per the Capability → Architecture Map** (14 numbered areas + 4 extras):

4.1 Accounts & Access · 4.2 Wedding Workspace · 4.3 Dates & Availability · 4.4 Discovery & Comparison ·
4.5 Vendor Listings · 4.6 Vendor Calendar · 4.7 Enquiries · 4.8 Agreements · 4.9 Reviews ·
4.10 Subscription & Billing · 4.11 Lead Dashboard · 4.12 Trust & Verification · 4.13 Admin Console ·
4.14 Real Weddings · Guest surfaces (FR-11, FR-12) · Grievance & takedown (FR-63) ·
Breach readiness (NFR 5.5) · Discoverability (FR-53, FR-59) · Places & Rules (FR-24, FR-33).

**Explicitly out / forbidden (spine):**

- **Any Family↔Vendor payment** — AD-34, PRD §7.1.
- **Auto-renewal, standing mandate, e-mandate, UPI Autopay, stored payment instruction, tokenisation** — AD-34 / FR-54. "A reviewer seeing any subscription, mandate, autopay or tokenisation call in the payment path should treat it as a breach of FR-54, not a feature."
- **Editing a confirmed Agreement** — AD-12; no `PATCH` on an Agreement exists at all (AD-2).
- **Editing, removing or reordering a Review** — AD-27 / FR-46.
- **Erasing an audit entry** — AD-27 / FR-61.
- **Document sharing / share-a-link for a Wedding** — AD-17 (`disable_document_sharing` on site-wide).
- **Sending any outbound message to a Guest** — AD-21: the messaging function's recipient is a link to a `User` record and a Guest is never a Frappe user. **Composing an invitation returns text and a link to the Family, who sends it from her own WhatsApp.** No platform-sent guest messaging, ever.
- **Regional language and the auspicious-date service** — Deferred, "owned elsewhere" (PRD §7.7, deferred there).
- **Rate limiting in development** — deliberately absent, required before the first real user (AD-28, AD-30, Deferred).
- **Meilisearch/Typesense search** — deferred; search stays on MariaDB behind `search_listings()`.
- **RFC 3161 external timestamping** — deferred.

**Deferred and explicitly "owned elsewhere" (Deferred §):** per-Service field lists and filter sets (AD-8 configuration); **UX and screens (`bmad-ux`)** — i.e. this workflow; epic/story sequencing; and every business input in NFR 5.9 (subscription prices, Founding Vendor cohort, legal terms, GST registration, merchant account, verification staff, grievance officer, named custodian).

---

## 4 · The no-money / no-liability model

**The mechanism** (AD-34, AD-12, AD-27, AD-24):

1. **No money moves between a Family and a Vendor, ever** (AD-34, PRD §7.1). The platform's only revenue is a Vendor **Subscription**: a twelve-month prepaid term, bought by a deliberate act, **one-time checkout, no mandate** (FR-54).
2. **An Agreement is a record, not a transaction.** Both parties confirm; the terms freeze verbatim into an append-only, hash-chained `Agreement Record` with the rendered document kept as immutable bytes (AD-12). The platform **authors no terms** (AD-27 / FR-41) — no defaults on any Agreement term field.
3. **The platform never enforces.** AD-24 bans *legally binding*, *guaranteed*, *enforced by Vivah Spot* from all copy.
4. **The platform never asserts availability.** Every availability rendering is attributed to the Vendor (AD-10, Conventions §Identity & voice), because freshness rests only on FR-29's nudge.
5. **Cancellation is neutral.** A rolling-24-month count derived from records, "with no fault attributed or inferred" (AD-13). Amendments write nothing to it; an FR-60-caused cancellation is not counted against the Family.

**What that forces the UI to do:**

- Use **Enquiry → Quote → Agreement**, never *book / booking / booked / cart / checkout* (AD-24).
- Say **"vendor shows available"**, never "available" (AD-10, Conventions).
- Never render a Family-side price as a charge, a deposit, or an amount due — the budget is a **planning total** the Family may adjust and add to (AD-19 / FR-8).
- Show no fault language around cancellation on either profile (AD-13).
- Present the Agreement as **a record both parties confirmed**, downloadable as the exact bytes they saw (AD-12 / FR-40), with a certificate (FR-43) — not as a contract the platform stands behind.
- Give the Vendor no "charge the customer" affordance and the Family no "pay" affordance anywhere.

**Known live defect:** the published `vivahspot.com` still advertises **"Book Now", "My Bookings" and a vendor bank-details payout section** from the abandoned commission model. The spine calls this "a live defect, not a false positive" (Deferred). Any redesign of the static site must remove all three.

---

## 5 · Performance, devices, network, data volumes (spine pass)

Hard, from the spine:

- **Device/stack targets** (Stack table, read from `package.json` on disk 2026-09-06): Expo SDK 57.0.11, React Native 0.86.2, React 19.2.3, expo-router 57.0.11, **NativeWind 4.2.6 + Tailwind CSS 3.4.17** (mobile); Next.js 16.3.0, React 19.2.8, **Tailwind CSS 4.3.3** (web). **The two apps run different Tailwind majors — config syntax does not transfer.**
- **iOS is not deferred** — NFR 5.2 supersedes Tech-Stack §1's "Android-only at launch" (Conflicts table). Design for both platforms.
- **NFR 5.3 guarantees work survives a lost connection**, which is *why* AD-31 requires every state-changing operation to be idempotent. Offline/retry is a stated product guarantee — the UI must support resumable, safely-retryable actions (an interrupted Agreement confirmation retried is a no-op, not a double-confirm).
- **NFR 5.4 sizes for peak muhurat** against Chaturmas idle — a strongly seasonal load profile. Observability for it is **deferred** and "nothing currently measures whether that holds".
- **Catalog volume:** the Service catalog is **50–60 Services, bounded and not expected to grow** (AD-5 accepted cost). Slots are **4** per day (AD-9). Candidate Blocks are **up to 5** per Wedding (Core entities ERD). Subscriptions are **one per Service** per Vendor (ERD).
- **FR-57 has a five-vendor aggregate floor** (AD-2, AD-36) — comparison/aggregate surfaces must handle a "not enough vendors yet" state.
- **Retention:** Agreements 8 years (FR-43); removed content 180 days (AD-33); Guest data erased 30 days after the Wedding concludes, immediately on abandonment, immediately on dismissal (AD-14).
- **SLA clocks the UI must surface** (AD-33 / FR-63): **36 hours** unlawful content, **3 hours** court order or government direction, **72 hours** information request, **7 days** grievance disposal, **72 hours** breach notification (NFR 5.5).
- **Session:** 90 days idle (AD-28). **OTP:** 6 digits, 10 minutes, 5 attempts, 3 resends/hour (AD-28).
- Search remains **MariaDB-backed** behind the `search_listings()` seam (Deferred) — a soft ceiling on filter/facet richness *(the spine states the seam, not a latency budget)*.

*Not found in the spine:* explicit latency budgets, bundle-size budgets, named minimum Android device, or a stated network-speed target. Check the Scope and Tech-Stack passes below.

---

## 6 · UX/UI decisions already made in the spine

1. **Copy voice** — "Copy states what is true: 'vendor shows available', never 'available'" (Conventions §Identity & voice / NFR 5.10).
2. **Design tokens** — `packages/shared/src/tokens.js` is the single source for colour and type; **the muted text token is contrast-locked and must not be lightened by a later design pass** (same row). This is an explicit instruction *to* the UX pass.
3. **Non-colour indicators required** for verified status, availability and paid placement (Conventions §Accessibility).
4. **WCAG 2.1 AA on all five surfaces** including both public Guest pages (NFR 5.8).
5. **Featured placement is a separate, marked band**, never mixed into organic results (AD-22).
6. **Rules render as one list** on the Listing — typed `restrict_service` rows and `informational` rows together (AD-36 / FR-19).
7. **Four Slot names, same for every Service:** morning, afternoon, evening, night (AD-9 / FR-28).
8. **Three availability states, not two:** shown-available, not-available, and **no-signal** (no Anchor Date; or a no-duration Service) (AD-10).
9. **An image carries four states** in the portfolio manager: verified & published, verified but over allowance, pending, taken down — with a takedown **leaving its gap** (AD-20 / FR-27).
10. **Vendor ordering of portfolio images is the Vendor's own, defaulting to upload order** (AD-20).
11. **i18n from day one** even at one locale (Conventions §i18n / NFR 5.1).
12. **Preferred Vendors that are the same business are shown as the same business** (AD-36 / FR-25).
13. **A grievance entry point on every surface, without a login, returning a quotable reference** (AD-33 / FR-63).
14. **Timezone Asia/Kolkata** (Conventions §Dates & time).

---

## 7 · Contradictions and open conflicts (spine's own list)

The spine records these in "Conflicts to resolve upstream" — all UX-relevant:

| Conflict | Spine's resolution |
| --- | --- |
| AD-5/AD-6 vs **FR-62, UJ-4** — Admin ships a Service "without a developer and without a release" | Holds only for **declarations** (AD-8), not behaviour or field set. **PRD amended 2026-09-06.** Do not design a full self-service Service-creation flow. |
| AD-8 vs **FR-62** — "a configuration change never rewrites what already happened" | True for presentational declarations, **false for behaviour declarations** (Engagement Model, has-Spaces), read live. Accepted deliberately. PRD amended. |
| `CLAUDE.md` §6 noun list vs **PRD §3 Glossary** | PRD wins (AD-24). `CLAUDE.md` §6 rewritten 2026-09-06. |
| **Tech-Stack §7** hand-maintained zod mirror | Superseded by AD-4. |
| **Tech-Stack §1** "Android-only at launch" | Superseded by **NFR 5.2 — iOS is not deferred.** |
| **Tech-Stack §3** data model (`Booking`, `Service Category`, `Package`) | Superseded by the PRD Glossary; **`Booking` is banned by §7.9.** |
| **Tech-Stack §5** "ruthless MVP cut" — flat guest list, no RSVP; delisting as enforcement | Superseded by **FR-11, FR-12 and §7.2** — RSVP and a structured guest list ARE in scope. |
| **Tech-Stack §4** "Later: Razorpay Subscriptions with UPI Autopay / e-mandate" | **Forbidden by FR-54 (AD-34).** Tech-Stack headed as superseded 2026-09-06. |
| `coding-standards.md` Appendix B | Describes ArchDesign, not this repo. |

**Reliability warning the spine gives about itself** (Deferred §Review history): seven review rounds, every round found defects in the round before it, the final round's fixes were **not re-gated**, and "a reader should assume this pass carries defects too. **Treat any AD touched by `reviews/review-*-r7.md` as provisional, and read the reports before cutting epics.**"

---

# Scope Document pass

`_bmad-output/planning-artifacts/VivahSpot-Scope-Document.md` — v2.0, August 2026, "Awaiting client sign-off"
(§0 Document Control). Client is Pravin Revale; prepared by Abhishek Bankar / Anvayro.

**Status caveat.** §0's revision note says v1.0 assumed **commission + escrow** and v2.0 replaced it with a
**vendor subscription model**. §0 also names the brainstorm artifact
`_bmad-output/brainstorming/brainstorming-session-2026-06-02-0603.md` as predating this and still describing
escrow-backed guarantees — **retained as history; this document governs over it.** The ARCHITECTURE-SPINE in
turn governs over this document where they conflict (it is the later artifact and the PRD is its binding source).
Several Scope statements are already superseded — listed in §S-9 below.

## S-1 · Product framing and market (hard, §1)

- **Modular wedding-services marketplace for India.** A couple assembles the wedding **service-by-service, within
  their budget** — discover, compare, shortlist verified vendors for each service in one place (§1).
- **North star: a hassle-free wedding** — transparency, trust, one place to plan everything (§1).
- **Launch market: Tier 4 / 3 / 2 cities, beginning with Shrirampur, Maharashtra**, built to scale city-by-city (§1).
- **Free for couples**; funded by vendor subscriptions (§1, §2A).
- Problem framing, useful for tone: "juggling 15+ fragmented, informal, word-of-mouth vendors with opaque pricing,
  hidden charges, no accountability, and constant fear of being cheated or let down on the day" (§1).

## S-2 · Users — the single most important UX constraint in this document (§3)

| Role | What the document says |
| --- | --- |
| **Couple / Family (Customer)** | "**Often elder-led, low-to-medium digital literacy → must be simple.**" Uses the platform free of charge. **Hard constraint on complexity.** |
| **Vendor (Supply)** | Self-onboards, subscribes, lists offerings, manages availability, responds to enquiries. "**The paying customer.**" |
| **Admin / Operations** | Vivah Spot staff: verification, subscription & billing, catalog, moderation, complaints, analytics. |
| **Wedding Manager** | A Vivah Spot-side coordinator who can assist a customer's planning. **Phase 2; commercial treatment undecided** (§3, §11). |

## S-3 · The three-layer solution shape (§4)

1. **Wedding Workspace — "the hassle-free layer (the moat)."** Wedding → Functions → unified dashboard, budget
   tracker, guest management, checklist/timeline, shortlists, enquiry tracking, reminders. **"Elevated in v2.0…
   With no escrow or transaction layer, the Workspace is the primary reason a couple uses Vivah Spot rather than a
   search engine or a plain directory. It is a core deliverable, not a companion feature."** — the strongest
   product-priority statement in any of the three documents.
2. **Service Marketplace — the catalog.** ~50+ service modules, each an instance of the same engine, **attached per
   function**.
3. **Vendor Supply — self-onboarding + subscription.**

**The "Service Engine" 10-part blueprint (§4)** — every service module follows the same shape, so **new services are
configured, not re-built**. UX-relevant items: (1) taxonomy + filters; (2) supply shelves verified/standard
*(first-party shelf deferred)*; (3) budget tiers; (4) **listing card data: price, photos, ratings, capacity, badge,
service cities, availability calendar**; (5) **discover → compare → shortlist → enquire → vendor responds**;
(6) **vendor commitments published on the listing** + a downloadable quote/agreement template *(see conflict S-9.4)*;
(7) vetting + verified badges + reviews + delisting; (8) enquiry tracking and reminders in the Workspace;
(9) subscription tier scales **visibility and allowances** *(see conflict S-9.5)*; (10) city-scoped replication.

**First-party supply is deferred out of the engagement** (§4 note, §11) — the platform must never appear as a
supplier competing with the vendors funding it.

## S-4 · Functional scope, per surface (§5)

**5.1 Customer Application (free to use)** — auth & onboarding (phone/OTP, WhatsApp-friendly); **Create Wedding**
(couple names, date(s)/muhurat, city, guest count, budget) **auto-saved as draft, resume anytime**; **Functions
layer** (Haldi, Mehndi, Sangeet, Wedding, Reception + custom, each with its own date/time, venue, guest count —
*see conflict S-9.3*); **service discovery** (search by name OR location / **detect current location**, rich filters,
**date-availability pre-applied from the Wedding**, availability badges); **Compare** side by side; **enquiry flow**
(browse → compare → shortlist → **send enquiry / reveal contact** → vendor responds → couple deals with the vendor
directly); per-service modules; **Dashboard** (all functions, shortlists, enquiries, statuses, estimated cost);
**Budget tracker** *(see conflict S-9.2)*; **Guest management** (list; RSVP and invitations phased — *see conflict
S-9.6*); **Checklist & timeline (muhurat-aware)**; **Reviews & ratings after an enquiry reaches completion**;
**Notifications & reminders (app + SMS/WhatsApp)**.

> **Removed in v2.0 (§5.1, explicit):** in-app booking payments, token payments, escrow, milestone releases, payment
> status tracking. "**The platform records an *enquiry*, not a *transaction*.**"

**5.2 Vendor Portal (responsive web)** — self-onboarding & KYC/verification for the verified badge, **"no payout/bank
KYC required"**; **subscription & billing** (plan selection, online payment, **GST invoice download, renewal
reminders, expiry/grace handling**); service listings (service-specific fields, photos/portfolio, packages, all-in
pricing); **published commitments** shown on the public listing; **availability calendar** (block/open dates,
**slot/bandwidth management**); **enquiry inbox** (respond, mark **contacted / site visit / won / lost**);
**📊 Lead dashboard — named a core deliverable:** listing views, contact reveals, enquiries received, response time,
conversion — "**how a vendor sees the value of the subscription and decides to renew**"; reviews management.

> **Removed in v2.0 (§5.2):** payouts, settlement reports, escrow release. **Added:** subscription management and the
> lead dashboard.

**5.3 Admin / Operations Panel** — vendor verification & KYC approvals; subscription & billing management (plans,
pricing, manual overrides, comps, expiry, GST invoicing, revenue reporting); **catalog / category management
("configure new services without a code release" — *see conflict S-9.7*)**; enquiry oversight and complaint handling;
**vendor standing & delisting — "the primary enforcement lever"**; content/reviews moderation; reports & analytics.

## S-5 · The catalog and the five frozen services (§6)

**★ = designed in detail ("frozen") in this engagement: Venue, Catering, Photography (Photo+Video), Décor & Mandap,
Band Baaja Baraat.** Full vision is grouped Pre-Wedding / Wedding Day / Post-Wedding / Digital & Money — 80+ named
services. Signature features (§6, "frozen — revised in v2.0") are concrete UI asks:

| Service | Signature features a designer must accommodate |
| --- | --- |
| **Venue** | All-in transparent pricing · availability calendar/badge · **vendor-policy field (outside caterer allowed?)** · verified real photos · **site visit / virtual tour request** · downloadable agreement template |
| **Catering** | **Per-function planning** · **"no shortage, no waste" headcount calculator** · all-in **per-plate** pricing · **tasting request** · published hygiene & freshness commitment |
| **Photography** | **Bundled photo+video packages** · **published delivery timeline, tracked and reviewed** · **named-shooter lock** · all-in deliverables list · **privacy toggle** |
| **Décor & Mandap** | **Verified real-event portfolios ("our strongest anti-fraud check")** · all-in **line-item** pricing · **auto venue-aware sizing** · published setup-time commitment |
| **Band Baaja Baraat** | **Baraat builder** · all-in pricing · **published "no on-the-spot demands" declaration** with **complaint reporting that affects vendor standing** · vetted crews |

> **Changed from v1.0 (§6):** the five escrow-backed *guarantees* are restated as **vendor-declared, publicly
> published commitments**. Vivah Spot verifies what it can verify, publishes the declaration, collects reviews
> against it, and removes vendors who repeatedly fail. **"It does not underwrite the outcome financially. Marketing
> copy must reflect this distinction."**

**Note:** the headcount calculator and auto venue-aware sizing are **arithmetic** and therefore server-side under
AD-19 (clients never do money arithmetic) and AD-8 (Sizing Attribute is a Service declaration the handler reads).

## S-6 · Cross-cutting platform features (§7)

Search & filters (location, date availability, budget, capacity, type, ratings) · availability calendars (per
vendor/team, **vendor-maintained**) · compare shortlisted vendors · **enquiry & lead tracking — "both sides see the
same thread and status"** · vendor subscriptions (plans, payment, GST invoicing, expiry & grace, plan-based
visibility and allowances) · budget tracker · guest management (list; RSVP, invitations phased) · reviews & verified
badges · notifications (app + SMS/WhatsApp) · multi-city (city-scoped catalog) · **multi-language (English +
regional — phased)**.

> **Removed in v2.0 (§7):** escrow payments, milestone releases, **digital contracts as a platform-enforced
> instrument**, and platform-mediated payment disputes.

## S-7 · No-money / no-liability — the Scope Document's own statement (§2A, §8, §12, §14)

**§2A:** "Vendors pay to be listed. Couples pay nothing. **Vivah Spot never handles booking money.**" Couple pays
**₹0 — no booking fee, no convenience fee, no commission.** Booking money is settled **directly** between couple and
vendor, **outside the platform**.

**Why (§2A):** no leakage problem (a once-in-a-lifetime purchase gives both sides every incentive to go offline
under a commission model); **no fund custody — "Holding customer money pending delivery requires an RBI Payment
Aggregator licence"**; predictable revenue; materially faster to build.

**§8 — the trust spine, "rewritten in v2.0".** "In v1.0 the trust spine rested on money… Without escrow, trust must
be built **before** the transaction rather than enforced during it. **This is a weaker instrument, honestly
stated.**" What still stands: **vetted supply · verified real portfolios · mandatory all-in pricing as a *condition
of listing* · published commitments, "stated publicly and permanently on the listing — quotable back to the
vendor" · honest reviews tied to real enquiries and moderated, not open to anonymous posting · venue-awareness ·
delisting · free to couples ("search ranking is not for sale to the highest bidder on a per-deal basis").**

**§8 — "What Vivah Spot no longer claims — and must not market" (a designer's do-not-draw list):**

- ❌ Escrow or held payments of any kind
- ❌ Financial guarantee of on-time delivery, setup, or freshness
- ❌ Backup-vendor guarantee
- ❌ Refund or compensation for vendor non-performance
- ❌ Any liability for payments made directly between couple and vendor

> **§8 action required, addressed directly at this workflow:** "**all customer-facing copy, the app UI, and the five
> frozen service specifications must be reviewed against this list before launch.** A guarantee the platform cannot
> honour is worse for trust than no guarantee at all — and, if it induces a payment, is a legal exposure. **Terms &
> Conditions must state plainly that Vivah Spot is a listing and discovery platform and is not a party to any
> transaction between a couple and a vendor.**"

**§14:** reintroducing platform-handled payments, escrow or commission is a **material change**, not a minor
revision.

This is fully consistent with AD-34 and AD-24 — the Scope Document and the spine agree on the no-money model. They
disagree only on **auto-renewal mandates** (S-9.1).

## S-8 · Non-functional requirements, phasing, deliverables

**§9 NFRs (all stated as requirements, not preferences, except where noted):**

| Area | Requirement | UX consequence |
| --- | --- | --- |
| **Platform** | "**Confirmed:** Android-first mobile app for customers; responsive web portal for vendors; web panel for admin. **iOS deferred.**" | **Contradicted by the spine — see S-9.8.** |
| **Usability** | "Simple, **low-digital-literacy-friendly, vernacular-ready, WhatsApp-centric**" | Large touch targets, minimal chrome, plain language, WhatsApp as the sharing/notification default. |
| **Performance** | "**Fast search & listing on low-bandwidth / low-end devices**" | The only device/network target stated in any of the three documents. **No numeric budget is given anywhere.** |
| **Scalability** | City-scoped, horizontally scalable for multi-city growth | City scoping is visible in the UI (city-scoped catalog, §7). |
| **Security** | KYC data protection, role-based access, secure subscription payment handling | — |
| **Reliability** | **High availability around peak muhurat seasons** | Matches the spine's NFR 5.4 seasonality. |
| **Localization** | **English at launch; regional languages phased (Marathi first)** | Layouts must survive Devanagari; i18n from day one (spine, NFR 5.1). |
| **Compliance** | GST-compliant invoicing for vendor subscriptions; **T&Cs establishing non-party status** | A non-party disclaimer surface. |

**§10 Phasing — what a designer may draw *now* (Phase 1 / MVP, Shrirampur + nearby):** auth · **Wedding + Functions**
· search/discovery · compare · **enquiry flow** · reviews · notifications · **customer app + vendor portal + admin
panel (core)** · **vendor subscription system with the ₹0 Founding Vendor tier active** · **vendor lead dashboard** ·
**5 launch services (Venue, Catering, Photography, Décor & Mandap, Band Baaja Baraat)** · **Wedding Workspace:
dashboard, budget tracker, guest list, checklist** · **single city**.

**Phase 2** (do not draw as MVP): begin charging / Founding tier expiry · 6 new services (Makeup & Beauty, Mehndi,
Invitations incl. digital + RSVP, Pandit/Guruji, DJ/Sound, Lighting/AV) · **Wedding Manager** · **Packages / bundles**
· **full guest management (RSVP, accommodation, transport)** · auto-renewal mandates *(forbidden — S-9.1)* ·
multi-city.

**Phase 3:** remaining catalog · **featured placement, sponsored listings, lead-boost add-ons** · insurance and gift
registry partners · **live streaming**, social features.
**Phase 4:** compliance layer (fireworks/permits/noise-curfew/animal-welfare) · premium/metro · multi-language at
scale · re-evaluating transaction revenue.

**§11 Out of scope for the current engagement (a designer must not draw these):**

- **Any handling of booking payments between couples and vendors** — no escrow, no token payments, no commission, no
  split settlement, **no payouts**
- **First-party service supply by Vivah Spot**
- Metro-grade regulatory/compliance machinery (Phase 4)
- **iOS application (deferred)** — *contradicted, S-9.8*
- **Wedding Manager as a paid service** (the coordination feature is Phase 2; the commercial treatment is undecided)
- **"Any service or feature not explicitly listed above"** — a catch-all; new features are Change Requests (§14)
- Commercial/marketing operations and vendor acquisition
- Custom integrations not listed in §12

**§12 Assumptions.** Client provides branding, content, **legal T&Cs/privacy policy including the non-party
disclaimer**, GST registration, a merchant account, **subscription plan pricing and the Founding Vendor cohort
definition**, an initial vendor pipeline, **and the field capacity to verify vendors and portfolios in person**.
Third parties: payment gateway (e.g. Razorpay), **SMS / WhatsApp Business API**, **Maps & geolocation**, cloud
hosting & push, **media storage/CDN**. Removed in v2.0: escrow provider, split-settlement onboarding, **vendor
bank-account/payout verification**.

> **§12 operational dependency:** "the trust spine in §8 rests on *human* verification — someone must physically vet
> vendors and confirm portfolios. **The platform provides the workflow; the client provides the people. Trust claims
> are only as good as this process.**" Verification turnaround is therefore human-paced; the UI must show a pending
> state honestly (matches AD-20's per-item gating).

**§13 Deliverables:** customer application (Android mobile app *— see S-9.8*), vendor portal (responsive web incl.
subscription billing and lead dashboard), **admin / operations panel (web)** *— see S-9.9*, **UI/UX designs**, source
code, technical documentation, deployment + handover.

## S-9 · Contradictions between the Scope Document and the ARCHITECTURE-SPINE

Every one of these is UX-visible. **The spine governs** (it is the later artifact, it binds the PRD, and CLAUDE.md
names it the architecture of record) — but the Scope Document is the signed-off client contract, so each of these is
a change the client has to be told about, not a detail to resolve silently.

**S-9.1 — Auto-renewal mandates. HARD CONTRADICTION.**
Scope §2A: "Prepaid plan period (**6 or 12 months**) at launch; **auto-renew mandates considered later**."
Scope §10 Phase 2: "**Auto-renewal mandates (UPI Autopay) if renewal volume justifies it.**"
Spine **AD-34**: "A Subscription is a **twelve-month** prepaid term… **There is no auto-renewal, standing mandate,
e-mandate, UPI Autopay or stored instruction to collect** — adopting a recurring-mandate product would be a change
to FR-54, not an implementation detail." The spine's Conflicts table separately records the same forbidding against
Tech-Stack §4. **Two sub-contradictions:** the **6-month** option (spine says twelve-month only) and **UPI Autopay**
(spine forbids outright). *Design consequence: no plan-length chooser offering 6 months, and no auto-renew toggle at
any phase.*

**S-9.2 — Who computes the budget. HARD CONTRADICTION.**
Scope §5.1 / §7: "**Budget tracker (couple-entered planned vs actual** across all services)".
Spine **AD-19**: the running budget has **one writer, `recompute_budget(wedding)` server-side**; it totals Selections
and confirmed Agreements; the Family's inputs are two specific, distinct acts — an **adjustment** (override a derived
figure) and an **addition** (a cost the platform knows nothing about) — not free-form entry, and **clients never do
money arithmetic**. *Design consequence: the budget tracker is a derived total with two override affordances, not a
spreadsheet.*

**S-9.3 — Functions carry a time of day. HARD CONTRADICTION.**
Scope §5.1: functions "each with its own **date/time**, venue, and guest count".
Spine **AD-9**: a Function holds a **`DATE` and a `Slot` enum** (morning/afternoon/evening/night); "no datetime
appears anywhere" in matching; the optional display-time field "exists for the invitation (UJ-5), is never read by
matching, and never travels to a Vendor as a constraint". *Design consequence: the Function editor picks a date and
one of four Slots; a free-text time is invitation copy only and must be labelled as such.*

**S-9.4 — A downloadable agreement template. HARD CONTRADICTION.**
Scope §4 blueprint item 6 and §6 (Venue): "**downloadable quote/agreement template** for the parties to use offline".
Spine **AD-27 / FR-41**: "**The platform authors no Agreement terms** — so no Agreement term field carries a Frappe
`default`, and a Property Setter adding one is a defect, not configuration." Spine **AD-12**: the Agreement is a
first-class in-product record both parties confirm, frozen and downloadable **as the exact stored bytes**.
Also spine **§7 conflict row**: Tech-Stack §5's "digital contracts as a platform-enforced instrument" is removed by
Scope §7 itself. *Design consequence: there is an in-product Agreement, not an offline blank template; and no
platform-supplied boilerplate clauses anywhere.*

**S-9.5 — Paid placement in search. CONTRADICTION OF DEGREE.**
Scope §2A ("**Featured — Priority placement in search**"), §4 item 9 ("visibility and allowances scale with plan"),
§7 ("plan-based visibility"), §10 Phase 3 ("featured placement, **sponsored listings, lead-boost add-ons**").
Spine **AD-22**: "**Neither what a Vendor pays nor how recently they joined is a signal at any weight. Featured
placement is a separate marked band, never inside the organic ordering.**" Spine **AD-36 / FR-25**: "preferred
surfacing is never purchasable". Scope §8 itself agrees in spirit ("search ranking is not for sale to the highest
bidder on a per-deal basis"). *Design consequence: "Featured" is a labelled band above/beside organic results, never
a boost within them; portfolio allowance and multi-service listing are the honest tier levers.*

**S-9.6 — Is RSVP in the MVP? CONTRADICTION.**
Scope §5.1 / §7: "Guest management (list; **RSVP and invitations phased**)"; §10 puts "full guest management (RSVP…)"
in **Phase 2**; §10 Phase 1 lists only "guest list".
Spine: **`apps/guest-web` is one of the five surfaces**, its two public Guest pages are named in the WCAG scope, and
the Conflicts table records "Tech-Stack §5 'ruthless MVP cut' — flat guest list, no RSVP … **Superseded by FR-11,
FR-12 and §7.2**". AD-14, AD-21, AD-30 and AD-32 all build substantial guest machinery. *The spine treats guest
invitation + RSVP as in scope now; the Scope Document defers it. Flag for the client.*

**S-9.7 — "Configure new services without a code release." ALREADY-RECORDED CONTRADICTION.**
Scope §4 ("new services are configured, not re-built") and §5.3 ("catalog / category management — configure new
services without a code release").
Spine **AD-5 accepted cost** + Conflicts table: true for a Service's **declarations** (AD-8) only, **not its
behaviour (`services/<service>/handler.py`) nor its field set (AD-6, a schema change and therefore a release)**. The
spine says "**The PRD needs amending**" and records it amended 2026-09-06. *Design consequence: the Admin
"add a Service" flow produces a configured Service, and must show honestly that behaviour and fields need a release.*

**S-9.8 — Android-only / iOS deferred. CONTRADICTION, and only half of it is recorded.**
Scope §9 ("**Confirmed:** Android-first… **iOS deferred**"), §11 ("**iOS application (deferred)**"), §13
("Customer application (**Android mobile app**)").
Spine Conflicts table records only **"Tech-Stack §1 'Android-only at launch' — Superseded by NFR 5.2, iOS is not
deferred."** It **does not name the Scope Document**, which says the same thing in three places and marks it
"Confirmed". *This is an unrecorded contradiction: the spine's fix covers the Tech-Stack but leaves the signed Scope
Document asserting the opposite. Design consequence: design for both platforms per NFR 5.2, and flag the Scope
Document for the same amendment the Tech-Stack already got.*

**S-9.9 — The Admin panel. CONTRADICTION.**
Scope §5.3, §10 and §13 promise a built **"Admin / Operations panel (web)"** as a deliverable.
Spine Capability Map 4.13: "**Admin Console → Frappe Desk on DocTypes**", and the Design Paradigm says "**Frappe Desk
is not a client**". The Structural Seed's source tree contains **no admin app**. *Design consequence: there is no
custom Admin UI to design — Admin uses Frappe Desk. The Scope Document's Admin deliverable is satisfied by Desk plus
configuration, which is a materially different user experience and must be said to the client.*

**S-9.10 — Retired vocabulary carried through the Scope Document. VOCABULARY CONFLICT.**
Scope uses **"Packages"** (§5.2, §6 Photography, §10 Phase 2), **"Service Category" / "category management"** (§5.3),
**"booking"** (§2A "Booking money", §11 "booking payments"), and **"Bookings"** implicitly in the phase-4 revisit.
Spine **AD-24**: the PRD §3 Glossary is binding; `Package` and `Service Category` are **retired** nouns; and
*booking / booked / book now / cart / checkout* are **gated by a pre-commit check** across `apps/`, `packages/` and
the root `.html` files. The Scope Document is a planning artifact and is not in the gate's path, but **no UI string
may reuse its wording.** *Design consequence: "Packages" → the Service's own price/inclusions model; "category" →
Service; never "booking".*

**S-9.11 — Geolocation and maps vs the Place tree. UNRESOLVED TENSION (not a flat contradiction).**
Scope §5.1 offers "search by name OR location / **detect current location**" and §12 names **Maps & geolocation** as
a third-party dependency.
Spine **AD-36** models Place as a **Frappe tree** (village–tehsil–district–state) with two predicates —
`covers(area, place)` for matching and `within(place, subtree)` for browsing — and **no coordinates, radius or map
appear anywhere in the spine.** *The spine neither provides nor forbids a map; a designer should treat
"detect current location" as resolving to a **Place in the tree**, not to a radius search, and raise it if a map view
is wanted.*

**S-9.12 — Delisting as the enforcement lever.**
Scope §5.3 and §8 name **delisting** "the primary enforcement lever". The spine's Conflicts table supersedes
Tech-Stack §5's "delisting as enforcement" (via FR-11, FR-12 and §7.2) but does not name the Scope Document. The
spine's own machinery (**AD-33 takedown, AD-35 discoverability, FR-60 Admin removal, FR-63 grievance + repeat-
infringer register**) is richer and more procedural than a single "delist" action. *Design consequence: Admin
enforcement is several distinct, recorded, attributed acts — withdrawal, removal, takedown, hold — not one button.*

---

# Tech-Stack pass

`_bmad-output/planning-artifacts/VivahSpot-Tech-Stack.md` — "Technology Stack Decision", decided August 2026.

**Read this document with the header on.** Its own banner says
**`[SUPERSEDED IN PART — 2026-09-06]`** — "the **stack choices in it stand**; five things in it do not":

| Superseded here | By |
| --- | --- |
| §1 "Android-only at launch" | NFR 5.2 — **iOS is not deferred** |
| **§3 data model** (`Booking`, `Service Category`, `Package`, `Availability Block`) | PRD Glossary §3; `Booking` **banned outright** by §7.9; spine AD-6, AD-11, AD-24 |
| §4 "Later: Razorpay Subscriptions with UPI Autopay / e-mandate" | **Forbidden by FR-54**, spine AD-34 |
| §5 "ruthless MVP cut" — flat guest list, no RSVP; delisting as enforcement | FR-11, FR-12 build both; §7.2 excludes delisting for service quality |
| §7 hand-maintained zod mirror | spine AD-4 — Python is the source, zod is generated |

> "**Do not treat any of those five as specification.**"

Everything below is flagged `[TECH-STACK — VERIFY]` where it comes only from this document, and
`[TECH-STACK — RETIRED]` where it falls inside one of the five superseded areas.

## T-1 · The only numeric performance budget in any of the three documents

**§1 "Non-obvious constraints" — `[TECH-STACK — VERIFY]`, and this section is *not* in the superseded five:**

- "**Test on a real budget Android phone from week 1. The emulator lies about scroll performance and cold start.**"
- "**Target: install size under ~30MB, cold start under 2s.**" — stated as a *target*, i.e. a **preference with a
  number**, not a gated requirement. It is nevertheless the only quantified budget available; the spine gives none
  and the Scope Document gives only "fast search & listing on low-bandwidth/low-end devices" (§9).
- "**No SSR, no DOM, no CSS cascade. Everything is client-side rendering against a cache.**" (mobile)
- §8's mental shifts, same effect: "navigation is a stack rather than a URL bar, **lists are virtualised not
  `.map()`ed**, and there is no server rendering."

**Device-target consequences visible in the package set (§1) — `[TECH-STACK — VERIFY]`:**

| Concern | Package | Design consequence |
| --- | --- | --- |
| Lists | `@shopify/flash-list` | "**Long vendor lists on low-RAM devices**" — search results must be a flat, uniform, virtualisable row. Heterogeneous card heights and interleaved non-list content are expensive. |
| Images | `expo-image` | "**Disk caching, blurhash placeholders**" — portfolio galleries should be designed with a blurhash placeholder state, not a spinner. |
| Server state | `@tanstack/react-query` | "Caching, retry, **offline-ish behaviour**" — stale-then-fresh is the default rendering model; screens need a "showing cached" affordance. |
| Storage | `react-native-mmkv` | Local persistence for drafts (Scope §5.1's "auto-saved as draft, resume anytime"). |
| i18n | `i18next` + `expo-localization` | "**Wire in from day 1**, translate later" — matches spine NFR 5.1. |
| Errors | `@sentry/react-native` | "Non-negotiable for a device fleet you can't see." |
| Build/ship | EAS Build + EAS Update | **OTA updates** ship JS fixes without a Play Store review — but note AD-3: the *API contract* is still frozen at `family/v1` regardless of OTA, so OTA does not relax the versioning constraint. |
| Payments | Razorpay React Native SDK | "**Requires a dev build, not Expo Go.**" (Also `CLAUDE.md` §5.) |

Also §1: "**booking and listing flows hit 60fps on budget Android**" — a stated performance expectation, using retired
vocabulary.

## T-2 · Hard UI constraints from this document that are NOT superseded

1. **The Play Store billing trap, already sidestepped (§4).** Google Play requires Play Billing (15–30%) for digital
   subscriptions sold **inside an Android app**. Because the vendor portal is a **Next.js web app**, vendors
   subscribe on the web and the question never arises. "**The customer app… now has zero payment surface of any
   kind — the cleanest possible Play Store review story.**" And: "**Do not later 'helpfully' add subscription
   payment into a vendor mobile app without re-reading Google's policy first.**"
   *Design consequence: no payment UI in the Expo app under any circumstance, and subscription checkout exists only
   on `vendor-web`. This agrees with AD-34 and is the operational reason for it.*
2. **Contact details must not be plainly visible (§4).** "**To count leads at all, contact details must not be
   plainly visible. MVP approach: reveal-contact-on-tap, logged as a `Lead Event`, plus an in-app enquiry form that
   hands off to WhatsApp.**" Masked calling (Exotel/Knowlarity) is **deferred** "until vendors dispute your
   numbers". *Agrees with spine AD-18 (contact reveal is a Creator-only gated action) and AD-32 (every read of
   contact data is logged in `api/`). A phone number is never printed on a card.*
3. **Lead tracking is the product (§4, §5).** "A vendor renews if and only if you can show them what they got.
   '**You received 47 enquiries and 12 contact reveals this month**' *is* the renewal argument… the vendor dashboard
   built on it **is the revenue engine**." *The lead dashboard is a first-class design surface, not analytics
   chrome.*
4. **The Wedding Workspace is the entire customer-side moat (§4, §5).** "Without escrow and guarantees, the
   marketplace layer alone is a directory — and a couple with a directory-shaped need will use Google or WedMeGood.
   **The budget tracker, function planner, checklist and guest list are the reason someone opens *your* app.**
   Strengthen this in MVP rather than trimming it." *Same conclusion as Scope §4; two documents agree.*
5. **Auth is phone+OTP only, for a stated user reason (§4).** "**Elder-led, low-digital-literacy users means
   phone+OTP only — no passwords, no email.**" *Agrees with AD-28.*
6. **Notifications (§4).** WhatsApp Business API (Meta Cloud, via a BSP) **primary**, SMS **fallback**, push via
   Expo Notifications. "In Tier 3/4 WhatsApp open rates dwarf SMS." *Note the hard limit from spine AD-21: outbound
   messaging cannot address a Guest at all — invitations are composed and handed to the Family to send from her own
   WhatsApp.*
7. **Admin is Frappe Desk (§0, §2).** "Admin / Ops panel — **Frappe Desk (built-in)** — ~40% of functional scope
   arrives free." *This **agrees with the spine** (Capability Map 4.13) and **contradicts the Scope Document's**
   promise of a built Admin panel (S-9.9) — two of three documents say Desk.*
8. **Search stays on MariaDB behind one seam (§2, §0).** "MariaDB filtering is fine for Shrirampur. **It will not
   survive multi-city with geo + date-availability + capacity + budget facets.** Define `search_listings()` as a
   single seam." *Agrees with the spine's Deferred section. Practical UX consequence: rich faceting is a
   post-MVP capability; design filters that degrade gracefully.*
9. **Reviews: text + rating, admin-moderated, no photo reviews at MVP (§5)** — "retrofitting photo reviews is
   trivial", stated as the reason. *(preference/trim, not an architectural rule)*
10. **Multi-language: i18n wired day 1; English only translated at launch; Marathi Phase 2 (§5).** "**Retrofitting
    i18n is brutal**" is the stated reason. *Agrees with Scope §9 and spine NFR 5.1.*
11. **Compare: "Keep. Cheap to build, and it's a visible differentiator." (§5)** *(explicit MVP inclusion)*
12. **Cold-start reality / Founding Vendor (§5).** Ship a **₹0 "Founding Vendor" plan with a fixed expiry date**,
    "modelled as a real plan — rather than a hardcoded bypass". *Agrees with AD-10/AD-35: "Founding Vendor at ₹0 is
    an active Subscription and shows dates like any other" — no second-class visual treatment.*
13. **Maps (§4) — `[TECH-STACK — VERIFY]`.** "Google Maps is the default but bills in USD. Evaluate **Mappls
    (MapmyIndia)** or **Ola Maps** — better Indian address/POI data at materially lower cost." *Undecided. See
    S-9.11: the spine's Place tree has no coordinates at all, so whether any map appears in the UI is genuinely
    open.*
14. **Subscription lifecycle (§3) — `[TECH-STACK — RETIRED as a data model]`, but the UX rule survives:** "On
    `Expired`, **listings auto-hide rather than delete — a vendor who renews must get their portfolio back intact,
    or they won't renew.**" *This is exactly spine AD-20 + FR-53 ("reappears intact on renewal"), reached
    independently. Treat the principle as confirmed; ignore the state names.*

## T-3 · What in this document a designer must NOT use

- **`[TECH-STACK — RETIRED]` §3 entity names.** `Booking`, `Service Category`, `Service Category Field`,
  `Vendor Listing`, `Listing Attribute Value`, `Package`, `Availability Block`, `Vendor Subscription`,
  `Subscription Plan`, `Subscription Invoice`, `Lead Event`, `Budget Line`. Replaced by the PRD §3 Glossary
  (AD-24). `Booking` is a **banned word** (PRD §7.9).
- **`[TECH-STACK — RETIRED]` §3 storage shape.** "`Listing Attribute Value` (child: key/value)" is explicitly
  forbidden by **AD-6**: "There is no second storage shape for Service attributes: **no key/value child table, no
  JSON blob**" — detail fields are **real indexed columns**. *The idea that survives is §3's "**the mobile app
  renders filters and listing detail sections dynamically from that config**", which is exactly AD-8's
  Admin-editable filter and comparison-attribute declarations. The rendering is dynamic; the storage is not.*
- **`[TECH-STACK — RETIRED]` §3 Enquiry workflow states.** `New → Contacted → Site Visit → Won → Delivered →
  Closed` (+ `Lost`). This sits inside the superseded §3 and predates the spine's Enquiry → Quote → Agreement →
  Amendment/Cancellation model (AD-12, AD-26) and FR-37's private lead outcome. **Do not draw this state machine.**
  What survives is §3's honest note that `Won`/`Delivered` are **vendor-declared** rather than payment-derived —
  which is why AD-27 classifies a Vendor's lead outcome as private-to-that-Vendor data "never shown to a Family".
- **`[TECH-STACK — RETIRED]` §2/§7 API paths.** `api.mobile.v1.search_listings`, `.get_listing`,
  `.create_booking`. The spine's namespaces are `api/family/v1/`, `api/vendor/`, `api/guest/` (AD-3) — "mobile" is
  now "family", and `create_booking` is banned vocabulary.
- **`[TECH-STACK — RETIRED]` §7 repository layout.** Missing `apps/guest-web` and `contract/family.v1.json`,
  wrong root, and the hand-maintained zod mirror is superseded by AD-4's generated schemas.
- **`[TECH-STACK — RETIRED]` §5 "Guest management: flat list only. No RSVP, no invitations, no QR."** Superseded by
  FR-11/FR-12 — see S-9.6, where the Scope Document defers the same thing and the spine builds it.
- **`[TECH-STACK — RETIRED]` §5 "Vendor subscriptions: one-time payment per 6/12-month plan"** and **§4 "MVP:
  one-time payment per plan period (6 or 12 months)"**. AD-34 says **twelve-month**. The "no mandates, no autopay"
  half of the same line is correct and is the rule.
- **`[TECH-STACK — RETIRED]` §5 "Budget tracker: manual entry by the couple."** Superseded by AD-19 — see S-9.2.
- **§2's stale Admin list** — "booking and dispute management, **payout handling**, manager assignment" — all
  removed by the v2.0 model (Scope §5.2, §11).

## T-4 · Contradictions found in the Tech-Stack pass

**T-4.1 — "The prototype is the design spec." DIRECT CONTRADICTION WITH THE SPINE, and it lands on this workflow.**
Tech-Stack **§8**: "**The prototype in this repo is the design spec — the screens, the flows, and the design tokens
already exist. The mobile work is porting, not designing.**" §8's week plan is "**Port `index.html` and
`category.html` with mocked data**" and "**NativeWind port of the `styles.css` design tokens**".
Against that, the spine's **Deferred** section says the published site "**advertises 'Book Now', 'My Bookings' and a
vendor bank-details payout section from the abandoned commission model. AD-24's gate fails on them by design. **A
live defect, not a false positive.**" And the spine's Deferred explicitly assigns "**UX and screens**" to
**`bmad-ux`** — i.e. this workflow — rather than to a port.
*Resolution for the designer: the **design tokens** in `styles.css` / `packages/shared/src/tokens.js` are the
surviving spec (spine NFR 5.10 row confirms it, with the muted-token contrast lock). The **screens and flows** of
the prototype encode the abandoned commission model and must not be ported as-is.*

**T-4.2 — 6-month plan period.** §4 and §5 vs **AD-34**'s twelve-month term. Same as S-9.1.

**T-4.3 — UPI Autopay / e-mandate "later".** §4 vs **FR-54 / AD-34**. Already recorded in both the Tech-Stack's own
banner and the spine's Conflicts table; repeated here only because Scope §10 Phase 2 says the same thing (S-9.1) and
so the mistake is in **two** documents.

**T-4.4 — Android-only.** §0 and §1 vs **NFR 5.2**. Recorded in the Tech-Stack's own banner. Note that Scope §9/§11/
§13 say the same and are **not** recorded anywhere (S-9.8).

**T-4.5 — Delisting as the enforcement lever.** §4: "Your remaining lever over vendor behaviour is **delisting**…
It does **not** support the outcome guarantees in scope §8 — on-time delivery, no-shortage-no-waste, no on-the-spot
demands, on-time setup. **Those claims must come out of the marketing copy and the frozen service specs, or they
become promises you cannot keep.**" The Tech-Stack banner marks "delisting as enforcement" superseded because
**PRD §7.2 excludes delisting for service quality**. *So the Tech-Stack's warning stands (the guarantee copy must
go — this agrees with Scope §8's do-not-market list) while its remedy does not (delisting is not the answer to a
quality failure). This is a real, unresolved gap: what **does** happen when a Vendor breaks a published Commitment?
The spine answers only for unlawful content (AD-33 takedown) and Admin removal (FR-60). **Raise this with the
product owner before designing any "report a problem with this vendor" flow.***

**T-4.6 — Filters render from config, but attributes are columns.** §3's "the mobile app renders filters and listing
detail sections dynamically from that config" is compatible with **AD-8**; §3's key/value storage and its stated
trade-off ("the attribute-value child table makes SQL filtering awkward. That is the concrete reason the search seam
exists") is **not** — AD-6 uses real indexed columns, which removes that reason. *The search seam still exists in
the spine, for a different reason (multi-city facets). Do not repeat §3's justification.*

---

# Summary of everything a designer must not draw

Consolidated, with the citation that forbids it.

| Do not draw | Forbidden by |
| --- | --- |
| Any Family-side payment, fee, deposit, token, or "pay now" | AD-34, PRD §7.1, Scope §2A/§5.1/§11, Tech-Stack §4 |
| Escrow, milestone release, refund, payout, settlement, bank/IFSC entry | Scope §5.1/§5.2/§11/§12, Tech-Stack §4 |
| Auto-renew toggle, saved card, UPI Autopay, e-mandate, standing instruction | AD-34 / FR-54 *(contradicting Scope §2A/§10 and Tech-Stack §4)* |
| A 6-month plan option | AD-34 *(contradicting Scope §2A and Tech-Stack §4/§5)* |
| Any payment UI inside the Expo app | AD-34; Tech-Stack §4 (Play Billing) |
| The words *book now / booking / booked / cart / checkout / legally binding / guaranteed / enforced by Vivah Spot* | AD-24 (pre-commit gated) |
| The nouns *Package, Service Category, Vendor Listing, Availability Block, Booking* | AD-24 (PRD §3 Glossary binding) |
| "Available" as a bare claim | AD-10, Conventions §Identity & voice |
| An availability claim on a "no duration" Service, or on a Listing when the Family has no Anchor Date | AD-10 |
| A clock time on a Function that reaches matching or a Vendor | AD-9 |
| Editing a confirmed Agreement; regenerating its PDF; platform-supplied Agreement boilerplate | AD-12, AD-27/FR-41 |
| Editing, deleting or reordering a posted Review | AD-27 / FR-46 |
| Photo reviews at MVP | Tech-Stack §5 *(preference/trim)* |
| A "share this Wedding by link" control | AD-17 |
| A platform-sent message to a Guest | AD-21 |
| Paid boost inside organic results; purchasable Preferred-Vendor placement | AD-22, AD-36/FR-25 |
| A vendor phone number printed on a card without a reveal action | Tech-Stack §4; AD-18, AD-32 |
| Outcome guarantees — on-time delivery, freshness, no-shortage-no-waste, on-time setup, no on-the-spot demands, backup vendor | Scope §8 "must not market"; Tech-Stack §4; AD-24 |
| First-party Vivah Spot services | Scope §4 note, §11 |
| A paid Wedding Manager | Scope §3, §11 |
| A bespoke Admin console UI | Spine Capability Map 4.13, Design Paradigm; Tech-Stack §0/§2 *(contradicting Scope §5.3/§13)* |
| A self-service "create a Service and it works" Admin flow | AD-5 accepted cost, AD-6, AD-8 *(contradicting Scope §4/§5.3)* |
| A free-form couple-entered budget spreadsheet | AD-19 *(contradicting Scope §5.1/§7 and Tech-Stack §5)* |
| A port of the current `index.html` / `category.html` screens | Spine Deferred ("a live defect"), AD-24 *(contradicting Tech-Stack §8)* |

