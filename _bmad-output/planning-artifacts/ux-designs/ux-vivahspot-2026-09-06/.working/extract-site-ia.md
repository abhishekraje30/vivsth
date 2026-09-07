# Vivah Spot — live site information architecture (extraction)

Source: the published static site at the repo root (`vivahspot.com`). Read as a **design artifact**
— this is the prototype the Expo family app is built toward. Everything below is *what is built*,
quoted verbatim where copy matters. No recommendations.

Extraction date: 2026-09-06. Files as of commit on `feat/monorepo-scaffold`.

> **Vocabulary warning up front.** The site says **Book / Booking / Book Now / Confirm booking /
> Package / My Bookings / Inquiry**. Several of these are banned by PRD §7.9 and the Glossary (§3).
> A per-word list with Glossary collisions is in **§21** at the bottom. Do not carry the site's
> words forward without checking them against the Glossary.

---

## 0 · Shared render layer — `assets/data.js`

Every page that shows a vendor loads `assets/data.js` first, then sets `window.IMG_BASE`
(`""` at root, `"../"` one folder deep). This single file *is* the component library and the mock
database. It defines the entire vendor vocabulary the UI can express.

**Mock data shape.**

- `CATEGORIES` — 6 entries, each `{ slug, name, img, color }`:
  `venues` "Lawns & Venues", `catering` "Catering", `decoration` "Decoration",
  `photography` "Photography", `makeup` "Makeup & Mehndi", `music` "DJ & Music".
- `VENDORS` — 14 entries. Fields: `id, cat, name, city, rating, reviews, priceFrom, unit,
  verified, tags?, img, gallery[], about, amenities[], packages[]`.
  - `unit` is one of `"day"` (venues), `"plate"` (catering), `"event"` (decor / photo / music),
    `"booking"` (makeup & mehndi). **Price is always "from X per unit".**
  - `packages[]` is `{ name, price, features[] }` — e.g. Green Meadows has
    "Day Booking" ₹85,000, "Evening Booking" ₹1,10,000, "Full Day" ₹1,75,000.
  - `tags[]` exists only on photography and decoration vendors — rendered as "Specialities".
- `VS_SPECIALITIES` — speciality filter chips, defined for **only two** categories:
  - photography: `Pre-Wedding, Candid, Traditional, Drone, Cinematic`
  - decoration: `Mandap, Haldi, Mehendi, Reception, Destination Wedding`
- All cities in the data are Pune-area (`Kothrud, Pune`, `Baner, Pune`, `PCMC, Pune`,
  `Wakad, Pune`, `Hadapsar, Pune`, `Pune`) plus one `Lonavala`.

**Derived badges** — `vsBadges(v)` computes, in order:

| Badge | Rule as built | Rendered |
| --- | --- | --- |
| Verified | `v.verified` | `🏆 Verified` |
| Top Rated | `rating >= 4.8` | `⭐ Top Rated` |
| Most Booked | `reviews >= 150` | `🔥 Most Booked` |
| Premium | `verified && rating >= 4.7 && reviews >= 140` | `💎 Premium` |
| Quick Response | `vsHashStr(id) % 3 === 0` — a deterministic stand-in; the code comment says "the prototype has no real response-time data" | `⚡ Quick Response` |

Cards show at most 2 badges (`vsBadgesHTML(v, 2)`); the vendor detail page shows all.

**Persistence — all `localStorage`, no backend.** The complete key set (verified by grep across
every HTML and JS file): `vs_city`, `vs_favs`, `vs_compare`, `vs_bookings`, `vs_inquiries`,
`vs_reviews_<vendorId>`, `vs_stats_<vendorId>`. **There is no account, session or vendor-signup
key** — auth is entirely cosmetic.

**Money.** `vsFormatPrice(n)` → `"₹" + n.toLocaleString("en-IN")`. Integer rupees, no decimals,
Indian digit grouping. No paise anywhere.

**Contact links.** One shared demo phone for every vendor:
`VS_DEMO_PHONE = "919112233445"`. `vsWaLink()` → `https://wa.me/<phone>?text=<encoded>`;
`vsTelLink()` → `tel:+<phone>`.

**Recommendation logic** (rule-based, deterministic, client-side):
- `vsTrending(excludeId, n)` — "proxy for 'trending': most-reviewed (most booked) vendors".
- `vsTopRatedInCity(v, n)` — same city key, sorted by rating.
- `vsAlsoViewed(v, n)` — same category first, then same city different category.
- `vsRecommendVendors(slug, opts)` — the budget planner's ranker.
  `score = rating*10 + min(reviews,200)/50`, `+4` verified, `+15` city match,
  `+6` free on the date / `-25` booked on the date. Filters by `priceFrom <= cap`,
  where cap is `perPlate` for catering and `maxPrice` otherwise.
- `vsIsBooked(vendorId, dateISO)` — **fake availability**: `hash(id + "|" + date) % 5 === 0`
  marks ~20% of future dates booked, plus any date the user has already requested.
- `vsDashStats(v)` — vendor dashboard numbers: `views = reviews*7 + (hash % 240) + tracked`,
  then whatsapp 18%, calls 9%, leads 6%, bookings 3% of views.

**Analytics stub.** `vsTrack(vendorId, metric)` increments a counter in localStorage. Metrics
fired: `views`, `whatsapp`, `calls`, `leads`, `bookings`. Comment: "feeds the future vendor
dashboard".

---

## 1 · index.html — home / landing

- **URL:** `/` (`index.html`), canonical `https://vivahspot.com/`
- **Audience:** family (public, unauthenticated)
- **Purpose:** one-screen phone-shaped landing that sells the marketplace, funnels into category
  browse, and carries an inline signup.
- **Title:** `Vivah Spot — Wedding Services Marketplace | Big day, sorted`
- **Meta description:** "Vivah Spot connects couples with trusted wedding-service vendors — venues,
  catering, decoration, photography, makeup & mehndi and DJ. Big day, sorted."
- **OG description:** "Book trusted wedding vendors — venues, catering, decoration, photography,
  makeup & mehndi and DJ — all in one place."
- **Structured data:** `Organization` + `WebSite` with a `SearchAction` pointing at
  `https://vivahspot.com/category.html?q={search_term_string}`.

### Section walk, top to bottom

The whole page sits inside `<div class="app">` — a **phone frame visible on desktop, full-bleed on
mobile**. This is the strongest signal that the site was designed as an app mock.

1. **App bar** (`header.appbar`, fixed)
   - Brand lockup: `Vivah` + `Spot` (two-tone spans) over tagline **"Big day, sorted."**
   - **City pill** — map-pin icon, current city, caret. Default **"Pune"**, persisted to
     `vs_city`. Dropdown `role="listbox"` with 10 cities: Pune, Mumbai, Delhi, Bengaluru,
     Hyderabad, Chennai, Kolkata, Ahmedabad, Jaipur, Lucknow. `aria-label="Change city"`.
   - **Avatar** → `account/profile.html`, `aria-label="My account"`, letter `A` hard-coded.

2. **Search bar** (`form.search`, `action="category.html"` GET, `name="q"`, `role="search"`)
   - Placeholder: **"Search venues, caterers, decor…"**
   - Button label: **"Search"**. Magnifier icon inside the pill on the left.
   - Sticky on mobile; becomes a wide centred 720px field at ≥1024px.

3. **Hero** (`#home`) — 4-image crossfade slideshow on a 4.2 s interval
   (`hero.jpg`, `feat-decor.jpg`, `feat-venue.jpg`, `insp-decor-1.jpg`).
   - H1: **"Plan your perfect wedding"**
   - Sub: **"Book trusted vendors for every part of your big day — all in one place."**
   - CTA: **"Explore Services"** → `#services` (in-page smooth scroll)

4. **Services** (`#services`)
   - Section head **"Services"** + link **"See all"** → `category.html`
   - 6-tile category grid, each an image tile + label, linking to `category.html?cat=<slug>`:
     **Lawns & Venues, Catering, Decoration, Photography, Makeup & Mehndi, DJ & Music**

5. **Featured near you**
   - Section head **"Featured near you"** (no "See all")
   - `#featured` filled by JS with three hard-coded vendor cards:
     `green-meadows`, `annapurna`, `blossom`.

6. **Trending now**
   - Head **"Trending now"** + **"See all"** → `category.html`
   - `#trending` = horizontal `.rail` of 8 cards from `vsTrending(null, 8)`

7. **Budget planner promo** — a full-width `a.promo` → `budget.html`
   - H3: **"Smart Wedding Planner"**
   - Body: **"Per-service budgets *and* recommended vendors — from your city, guests & budget."**
   - CTA text: **"Plan your wedding →"**
   - Calendar/list icon on the right.

8. **Get inspired**
   - Head **"Get inspired"** + **"See all"** → `inspiration.html`
   - 4-image horizontal strip, every image also links to `inspiration.html`.

9. **How it works** — 4 numbered steps, each with number chip + icon + h4 + body:
   1. **"Browse"** — "Explore service categories for every part of your big day."
   2. **"Compare"** — "Check verified vendors, real prices & genuine reviews."
   3. **"Book"** — "Reserve your slot instantly with secure payments."
   4. **"Celebrate"** — "Relax and enjoy a perfectly planned celebration."

   > Step 3 promises *"Reserve your slot instantly with secure payments"* — the site's own
   > statement of a transactional booking model.

10. **Register** (`#register`) — two-column at ≥768px
    - Pitch column: **"Join Vivah Spot"** (Spot gradient-highlighted),
      **"Create your free account to find trusted vendors and book your big day faster."**
    - Three perks with coloured icon chips:
      - "Save & compare your favourite vendors"
      - "Book in minutes & track every booking"
      - "Verified vendors & transparent pricing"
    - Form card: H3 **"Create your account"**, sub **"It's free — takes less than a minute."**
      - Fields (icon-leading, placeholder-only labels via `aria-label`):
        **"Full name"**, **"Mobile number"** (`type=tel`, `maxlength=10`, numeric inputmode),
        **"Email address"**
      - Submit: **"Create Account"**
      - `onsubmit="return false;"` — **no backend.** Fires the toast **"Account created ✓"**
        and resets the form.
    - Footer links inside the card:
      - "Already a member? **Log in →**" → `account/login.html`
      - "Are you a vendor? **List your service →**" → `vendor/vendor-signup.html`

11. **About** (`#about`)
    - Head **"About"**
    - Body: "Vivah Spot connects you with trusted wedding-service providers — lawns, caterers,
      decorators, photographers and more — so you can plan every detail of your celebration from
      one simple app. Verified vendors, transparent pricing, no hassle."
    - Stat row: **500+ Vendors · 12 Cities · 4.8★ Avg. rating**

12. **Footer** (`footer.foot`)
    - "© 2026 Vivah Spot · Big day, sorted."
    - "Co created by **Aaknav** in collaboration with **Anvayro**"

13. **Bottom tab bar** (`nav.tabbar`) — 5 tabs, four of them in-page anchors:
    **Home** (`#home`) · **Services** (`#services`) · **Register** (`#register`) ·
    **Login** (`account/login.html`) · **About** (`#about`).
    An `IntersectionObserver` scroll-spy highlights the active tab.

### Behaviour worth carrying

- Scroll-reveal on `.hero, .cat, .vcard, .step, .stat, .reg-pitch, .reg-card, .about-text`,
  with a 2 s safety timeout that un-hides everything if the observer never fires.
- Reduced-motion is handled globally in `styles.css`.

---

## 2 · vendor.html — vendor detail

- **URL:** `vendor.html?id=<vendorId>` (e.g. `vendor.html?id=green-meadows`)
- **Audience:** family
- **Purpose:** the full listing — gallery, badges, packages, availability calendar, reviews,
  three contact routes, and a sticky book bar.
- **Title:** static `Vendor — Vivah Spot`, rewritten by JS to `<vendor name> — Vivah Spot`.
- Per-vendor canonical + OG are **rewritten client-side** after load; the description template is
  `"<name> · <category> in <city>. From ₹X/<unit> · ★ <rating> (<n> reviews)."`

### Chrome

- `a.skip-link` — **"Skip to content"** → `#main`
- App bar: **back chevron** (`href="javascript:history.back()"`, `aria-label="Go back"`),
  centre title **"Vendor details"**, right **heart** button
  (`aria-label="Save to favourites"`, fills solid when favourited).
- No bottom tab bar — this page is a pushed detail screen, not a tab root.

### Sticky book bar (`.bookbar`, hidden until a vendor resolves)

- Left: **"Starting from"** + `₹85,000 / day`
- Right: primary button **"Book Now"**

### Body, top to bottom (all rendered by JS into `#main`)

1. **Gallery** — one large `#g-main` image plus a thumbnail strip; tapping a thumb swaps the main
   image and moves the `.active` class. 1–3 images per vendor.
2. **Detail head** — H1 vendor name, full badge row, meta row (map-pin + city, category name),
   and a right-aligned rating block: big `rating` number over `"<n> reviews"`.
3. **About** — H2 **"About"** + `v.about` prose.
4. **What's included** — H2 **"What's included"**, amenity chips
   (e.g. "Up to 800 guests", "Valet parking", "In-house catering", "Power backup",
   "Bridal room", "DJ allowed").
5. **Specialities** — H2 **"Specialities"**, `.amenity--spec` chips from `v.tags`.
   **Conditional** — only rendered when the vendor has tags (photography + decoration only).
6. **Contact** — H2 is interpolated: **"Contact "** + the vendor's first word
   (e.g. "Contact Green"). Three side-by-side buttons:
   - **"WhatsApp"** — `a.contact-btn.wa`, opens `wa.me` in a new tab with the prefilled message
     **"Hi, I'm interested in `<name>` (`<category>`) on Vivah Spot. Could you share availability
     and pricing?"** Tracks `whatsapp`.
   - **"Call"** — `a.contact-btn.call`, `tel:` link. Tracks `calls`.
   - **"Inquiry"** — `button.contact-btn.inq`. Pushes `{vendorId, vendor, at}` onto
     `vs_inquiries`, tracks `leads`, and toasts **"Inquiry sent ✓  The vendor will get back to
     you"**.
7. **Packages** — H2 **"Packages"**. Each `.pkg` card: name + price
   (`₹85,000 / day`) and a `<ul>` of features.
8. **Check availability** — H2 **"Check availability"**. A month calendar built in JS:
   - `‹` / `›` month arrows (prev disabled at the current month), title `"September 2026"`,
     `S M T W T F S` day-of-week row.
   - Cells are `.past` (inert span), `.avail` (button) or `.booked` (disabled button).
   - Legend: **"Available"**, **"Booked"**, hint **"Tap an available date to request it"**.
   - Tapping an available date prefills `#b-date` and **opens the booking modal**.
9. **Reviews** — H2 **"Reviews"** with a right-aligned average `★ 4.7 · 3 reviews`.
   - Three hard-coded seed reviews: "Priya & Rohan" (5★), "Sneha Kulkarni" (5★),
     "Amit Deshmukh" (4★). User reviews from localStorage are prepended and tagged **"You"**.
   - Each review: initial-letter avatar, name, `★★★★★`/`☆` string, body, optional photo.
   - Button **"✍ Write a review"** toggles an inline form:
     - **"Your rating"** — 5 tappable stars with hover paint
     - **"Your name"** / placeholder "Full name"
     - **"Your review"** / textarea placeholder **"Share your experience…"**
     - **"Add a photo (optional)"** — `input[type=file][accept=image/*]`, read as a data URL
     - Submit **"Submit review"**; validation toasts **"Please pick a star rating"**;
       success toast **"Thanks! Your review was added ✓"**
10. **Recommendation rails** (`#rails`) — four titled horizontal rails of vendor cards:
    **"Similar vendors"**, **"Top rated in `<city>`"**, **"People also viewed"**,
    **"Trending now"**. Empty rails render as nothing.

### Booking modal (`#book-modal`, bottom-sheet style with a drag handle)

- H3 **"Request a booking"**, sub-line `"<vendor name> · <category>"`
- Fields: **"Event date"** (`type=date`), **"Package"** (`select`, options
  `"<pkg name> — ₹<price>"`), **"Your name"** (placeholder "Full name"),
  **"Mobile number"** (placeholder **"10-digit mobile"**, `maxlength=10`)
- Submit: **"Confirm booking"**
- On submit: writes `{vendorId, vendor, img, category, date, pkg, status: "pending"}` to
  `vs_bookings`, closes the modal, re-renders the calendar so the date now shows booked, tracks
  `bookings`, and toasts **"Booking requested ✓  See My Bookings"**.
- Dismiss: click the overlay or press `Escape`.

### Not-found state

When `?id` is missing or unknown, the whole body is replaced with an `.empty` block:
icon, H3 **"Vendor not found"**, body **"This listing may have been removed."**, and a
**"Back to home"** button → `index.html`. The book bar stays hidden.

---

## 3 · category.html — browse / search results

- **URL:** `category.html`, `category.html?cat=<slug>`, `category.html?q=<query>`
- **Audience:** family
- **Purpose:** the one results surface — it serves category browse *and* free-text search *and*
  "all vendors" from the same page, switched entirely on query string.
- **Title:** static `Browse Wedding Vendors — Vivah Spot`; JS rewrites it to
  `"<Category name> — Vivah Spot"` or `"Browse — Vivah Spot"`.

### Three header modes (JS-driven)

| Condition | `page-title` | `page-sub` |
| --- | --- | --- |
| `?cat=venues` | `Lawns & Venues` | `Trusted lawns & venues` (category name lowercased) |
| `?q=lonavala` | `Search` | `“lonavala”` (curly quotes) |
| neither | `All Services` | `Every wedding vendor` |

Static fallback in the HTML before JS runs: title **"Services"**, sub **"Find trusted vendors"**.

### Sections, top to bottom

1. `a.skip-link` — **"Skip to results"** → `#results`
2. App bar: back chevron → `index.html` (`aria-label="Back to home"`), centre title + sub,
   right `appbar-spacer` (an empty balancing element — no action).
3. **Sort chip bar** (`#sortbar`, `role="toolbar"`, `aria-label="Sort vendors"`), single-select,
   `Recommended` active by default:
   **"Recommended"**, **"Top rated"**, **"Price: low to high"**, **"Price: high to low"**,
   **"Verified only"**
   > "Verified only" sits in the *sort* bar but is implemented as a filter (`a.filter(v => v.verified)`).
4. **Speciality chip bar** (`#specbar`), `hidden` unless the category has specialities. Rendered as
   an **"All"** chip plus one chip per speciality — so only `?cat=photography`
   (Pre-Wedding / Candid / Traditional / Drone / Cinematic) and `?cat=decoration`
   (Mandap / Haldi / Mehendi / Reception / Destination Wedding) ever show it.
5. **Results count** — `"14 vendors"` / `"1 vendor"` (singular handled).
6. **Card grid** (`#cards`) — `vsVendorCard` for each result.
7. **Empty state** (`#empty`, hidden unless zero results):
   magnifier icon, H3 **"No vendors found"**, body **"Try a different category or clear your
   filters."**, button **"Back to home"** → `index.html`.
8. **Bottom tab bar** — Home / Services / Register / Login / About (see §8 for the full map).

### Search semantics as built

`?q=` matches against vendor **name**, **city** and **category name**, case-insensitively.
There is no relevance ranking — matches are then sorted by whichever sort chip is active.
The city pill from the home page does **not** filter these results; `vs_city` is read only by
`budget.html`.

---

## 4 · compare.html — side-by-side comparison

- **URL:** `compare.html` (no params — reads the `vs_compare` localStorage list)
- **Audience:** family
- **Purpose:** put 2–3 chosen vendors in a comparison table.
- **`<meta name="robots" content="noindex, follow">`** — deliberately kept out of search.
- **Max 3** vendors (`VS_COMPARE_MAX`), enforced at the point of adding.

### Chrome

App bar: back chevron (`history.back()`), title **"Compare Vendors"**, sub
**"Side by side"** — JS rewrites the sub to `"2 selected"` or **"Nothing to compare"**.
Right button is a **trash icon**, `aria-label="Clear all"`.

### Comparison grid rows, in order

Header row is a photo + vendor name linking to `vendor.html?id=…`, each with an `×`
`cmp-col-remove` button (`aria-label="Remove <name>"`).

| Row label | Cell contents |
| --- | --- |
| `Category` | category name |
| `Price from` | **₹85,000** `/ day`, plus a **"Lowest"** pill on the minimum |
| `Rating` | `★★★★★` string + numeric rating, plus a **"Best"** pill on the max |
| `Reviews` | count, plus a **"Most"** pill on the max |
| `Location` | `v.city` |
| `Badges` | full badge row, or `—` |
| `Top services` | first **4** amenities as a `<ul>` |
| `Next available` | first non-booked date in the next 120 days, formatted `en-IN` as `Sat, 12 Sep`; `—` if none |
| *(unlabelled)* | a **"View"** button per column → `vendor.html?id=…` |

### Empty state (fewer than 2 selected)

Compare-arrows icon, H3 **"Pick at least 2 vendors"**, body
**"Tap Compare on any vendor card, then come back here to see them side by side."**,
button **"Browse vendors"** → `category.html`.

The floating compare tray is explicitly hidden on this page ("we're already comparing").

---

## 5 · budget.html — Smart Wedding Planner

- **URL:** `budget.html`
- **Audience:** family
- **Purpose:** split a total budget across services by weight, then recommend one vendor per
  service that fits the allocation.
- **Title:** `Smart Wedding Planner & Budget — Vivah Spot`
- App bar title **"Smart Planner"**, sub **"Budget & vendor suggestions"**, back → `index.html`.

### Sections, top to bottom

1. **Intro** — H1 **"Smart Wedding Planner"**, body
   **"Tell us your city, guests, budget and date, then pick the services you need — we'll split
   your budget and recommend the best-matched vendors."**
2. **Form** (`#bp-form`, `onsubmit="return false;"` — live-updating, never submitted):
   - **"City"** — `select`, the same 10 cities as the home pill; initialised from `vs_city`
     and written back on change.
   - **"Guest count — 250"** — the label carries the live value; `range` 50–1000 step 10,
     default 250.
   - **"Total budget (₹)"** — `number`, min 100000, step 50000, **default 1000000**.
   - **"Wedding date (optional)"** — `date`, `min` = today.
   - **"Services you need"** — six toggle chips, **all on by default**:
     **Venue, Catering, Decoration, Photography, Makeup & Mehndi, DJ & Music**
     (note: the chip says **"Venue"** where the category says "Lawns & Venues").
3. **Summary stat row** (`#bp-summary`) — four tiles:
   **Budget**, **Guests**, **Per guest**, **Services**.
4. **"Your plan"** (`#rec-list`) — one `.rec` block per selected service:
   - Head: coloured dot + service label, and the allocated amount.
     For catering the amount line reads `₹2,50,000 ≈ ₹1,000/plate`, appending
     **" · tight"** when the per-plate figure drops below ₹350.
   - Body: the top-ranked vendor as a `rec-vendor` row — thumbnail, name,
     `★ 4.9 · ₹450/plate · Pune`, up to 2 badges, and when a date is set an availability pill
     **"Available 2026-10-14"** (green) or **"Booked on 2026-10-14"** (red).
   - Link: **"+3 more in budget →"** or **"Browse all →"** → `category.html?cat=<slug>`
   - No match: **"No decoration vendors within this allocation. See all options →"**
   - No services selected: **"Select at least one service above to see your plan."**
5. **Note**: "“Smart” picks rank by rating, popularity, your city and (if set) availability on
   your date. We also keep a small buffer for misc costs — add ~10% on top for a safety margin."
6. Bottom tab bar (standard 5).

### Budget weights as built

Venue **30**, Catering **25**, Decoration **12**, Photography **11**, Makeup & Mehndi **6**,
DJ & Music **6** — re-normalised over whatever the user leaves selected. `perGuest = budget / guests`.
Catering is the only service treated per-plate.

> All of this arithmetic runs **client-side in float** — the divide-by-weight split, the per-guest
> figure and the per-plate figure.

---

## 6 · inspiration.html — idea gallery

- **URL:** `inspiration.html`
- **Audience:** family (public)
- **Purpose:** a filterable photo grid with a lightbox that funnels each idea to the matching
  vendor category.
- App bar title **"Inspiration"**, sub **"Ideas for your big day"**, back → `index.html`.

### Sections

1. **Filter chip bar** (`role="toolbar"`, `aria-label="Filter inspiration"`):
   **"All"** (active), **"Decoration"**, **"Photography"**, **"Themes"**, **"Bridal Looks"**
2. **Grid** — 12 hard-coded items, each a button with an image and a caption overlay
   (`insp-tag` pill + title). Filtering toggles `hidden` on the tiles; there is no empty state.

   Titles verbatim: "Floral mandap stage", "Colour-smoke ceremony", "Maang tikka & gold",
   "Golden-hour couple", "Chandelier mandap", "Golden pillars & garlands", "Bridal henna & glow",
   "Heritage fort shoot", "Royal red & gold stage", "Palace grandeur", "Red & gold bridal",
   "Mountaintop romance".
3. **Lightbox** (`role="dialog"`, `aria-modal="true"`) — full-bleed image, `×` close
   (`aria-label="Close"`), caption with title + category and a CTA
   **"Browse Decoration vendors →"** → `category.html?cat=<mapped slug>`.
   Dismiss by backdrop click or `Escape`; scroll is locked while open.

   The idea→category map: `decor → decoration`, `photo → photography`,
   **`theme → decoration`**, **`bridal → makeup`**. So "Themes" and "Bridal Looks" are
   presentation-only facets that borrow another category's vendors.
4. **Bottom tab bar — different here.** Tab 3 is **"Planner"** → `budget.html`, not "Register".
   This is the only page whose tab bar deviates.

---

## 7 · 404.html — not found

- **URL:** `404.html` (served for unknown paths; GitHub Pages convention, `.nojekyll` present)
- **Audience:** public
- **`robots: noindex, follow`**. All asset paths are root-relative on purpose — the file comment
  says "so the page styles correctly even when served for a deep unknown URL".
- Content: brand lockup app bar (no city pill, no avatar), heart logo mark, H1 **"404"**,
  body **"We couldn't find that page. Let's get you back to planning."**,
  primary button **"Back to home"** → `/`, and a footer line
  **"Looking for vendors? Browse services →"** → `/category.html`.
- **No tab bar.**

---

## 8 · account/login.html — log in

- **URL:** `account/login.html` · **Audience:** family
- **Purpose:** email/mobile + password login, with Google and OTP as alternatives.
- Skip link **"Skip to login"**. App bar: back → `../index.html`, brand lockup with tagline
  **"Big day, sorted."**, spacer.
- Visual treatment: frosted glass card on a blurred pink/marigold blob wash, `login-rise`
  entrance animation.

### Card contents, in order

1. Heart logo mark
2. H1 **"Welcome back"**, sub **"Log in to manage your bookings and saved vendors."**
3. Form (`onsubmit="return false;"` — **inert**):
   - Envelope-icon field, placeholder **"Email or mobile number"**, `autocomplete="username"`
   - Lock-icon field, placeholder **"Password"**, with an eye **show/hide toggle**
     (`aria-pressed` and `aria-label` flip between "Show password" / "Hide password")
   - Row: checkbox **"Remember me"** · link **"Forgot password?"** → **`login.html`** (itself)
   - Submit **"Log In"**
4. Divider **"or continue with"**
5. Social row: **"Continue with Google"** (full-colour Google mark),
   **"Continue with OTP"** (phone icon). Both are `type="button"` with **no handler**.
6. Footer: "New to Vivah Spot? **Create an account →**" → `../index.html#register`
   (note: to the *home page's* inline form, **not** `register.html`)
7. Bottom tab bar with **Login** marked `active`.

---

## 9 · account/register.html — create account

- **URL:** `account/register.html` · **Audience:** family
- Same frosted-card treatment (pink/purple blobs). Skip link **"Skip to sign-up"**.
  App bar tagline is overridden to **"Create your account"**.
- H1 **"Join Vivah Spot"**, sub **"Save vendors, manage bookings & plan faster."**
- Fields, in order: **"Full name"**, **"Email address"**, **"Mobile number"**
  (`maxlength=10`, numeric), **"Create password"** with show/hide toggle.
- Submit **"Create Account"** → shows the toast **"Account created ✓"** then
  **redirects to `../index.html` after 1200 ms**. Nothing is stored.
- Divider **"or continue with"**; social buttons **"Sign up with Google"**,
  **"Sign up with OTP"** — both inert.
- Footer links: "Already a member? **Log in →**" → `login.html`;
  "Are you a vendor? **List your service →**" → `../vendor/vendor-signup.html`
- Tab bar with **Register** `active`.

> **The two registration forms differ.** The home page's inline form has *no password field*
> (name / mobile / email only) and merely toasts. This page adds a password and redirects.
> The home tab bar's "Register" tab points at `#register` (the inline form), while
> category / compare / budget / inspiration tab bars point at `account/register.html`.

---

## 10 · account/profile.html — account hub

- **URL:** `account/profile.html` · **Audience:** family · `robots: noindex, follow`
- App bar title **"My Account"**, back → `../index.html`.
- **Hard-coded identity:** avatar "A", H1 **"Aanya Sharma"**,
  `aanya.sharma@email.com`, star pill **"Member since 2026"**.
- Stat row: **Bookings** (live count of `vs_bookings`), **Saved** (live count of `vs_favs`),
  **4.8★ Avg. rating** (hard-coded).
- Group label **"Account"**:
  - **"My Bookings"** / *"View & manage your reservations"* → `bookings.html`
  - **"Saved Vendors"** / *"Vendors you've hearted"* → `favourites.html`
- Group label **"More"**:
  - **"Become a Partner"** / *"List your service on Vivah Spot"* → `../vendor/vendor-signup.html`
  - **"Vendor Dashboard"** / *"Views, clicks, leads & bookings"* → `../vendor/dashboard.html`
  - **"Help & Support"** / *"FAQs and contact us"* → **`#`** (dead link)
  - **"Settings"** / *"Notifications & preferences"* → **`#`** (dead link)
- **"Log out"** → `login.html`. The click handler is an empty function with the comment
  "demo logout — keep saved data; just navigate".

> This is the **only place a family user can reach the vendor dashboard** — the family account
> hub links straight into a vendor-side screen. There is no role separation in the prototype.

---

## 11 · account/favourites.html — saved vendors

- **URL:** `account/favourites.html` · **Audience:** family · `robots: noindex, follow`
- App bar title **"Saved Vendors"**, back → `profile.html`.
- Body: a card grid of `VENDORS` filtered by `vs_favs`, using the same `vsVendorCard`.
  Un-hearting a card re-draws the list so it disappears immediately.
- Empty state: heart icon, H3 **"No saved vendors"**,
  body **"Tap the heart on any vendor to save them here for later."**,
  button **"Browse services"** → `../index.html#services`.
- Standard tab bar (no tab is marked active).

---

## 12 · account/bookings.html — my bookings

- **URL:** `account/bookings.html` · **Audience:** family · `robots: noindex, follow`
- App bar title **"My Bookings"**, back → `profile.html`.
- Body: `vs_bookings` rendered as `list-row` items, each linking to `../vendor.html?id=…`:
  thumbnail, H4 vendor name, `"<Category> · <Package name>"`, `"📅 2026-11-14"`, and a
  status pill on the right — **"Confirmed"** or **"Pending"**.
  Every booking created by the prototype is written with `status: "pending"`; nothing in the
  site ever sets `"confirmed"`, so **"Confirmed" is unreachable state**.
- Empty state: calendar icon, H3 **"No bookings yet"**,
  body **"Find a vendor you love and request a booking — it'll show up here."**,
  button **"Browse services"** → `../index.html#services`.
- No cancel, reschedule or detail action on a booking row.

---

## 13 · vendor/dashboard.html — vendor dashboard

- **URL:** `vendor/dashboard.html`, optionally `?id=<vendorId>` to preselect
- **Audience:** vendor · `robots: noindex, follow`
- App bar title **"Vendor Dashboard"**, sub **"Your performance at a glance"**,
  back → `../account/profile.html`.

### Sections

1. **"Viewing as"** — a `select` listing **all 14 vendors** as
   `"Green Meadows Lawn · Lawns & Venues"`. Hint: *"Demo view — figures combine sample
   baselines with activity tracked on this device."* This stands in for auth.
2. **Metric cards** — five, each a coloured icon + big number + label:
   **"Profile Views"**, **"WhatsApp Clicks"**, **"Call Clicks"**,
   **"Leads Generated"**, **"Booking Requests"**. Numbers `toLocaleString("en-IN")`.
3. **"Conversion funnel"** — five horizontal bars, each `label · bar · value`,
   scaled against Views: **Views, WhatsApp, Calls, Leads, Bookings**.
4. **"Booking requests"** — rows from `vs_bookings` filtered to this vendor:
   package name (or the literal "Booking"), `📅 <date>`, status pill.
   Empty: *"No booking requests yet for this vendor on this device. Request one from the
   vendor page to see it here."*
5. **"Recent leads"** — rows from `vs_inquiries`: H4 **"New inquiry"**, relative time
   (`just now` / `5m ago` / `3h ago` / `2d ago`), pill **"Lead"**.
   Empty: *"No leads yet. Tap “Inquiry” on the vendor page to generate one."*

### Tab bar — vendor-flavoured

**Home · Services · Partner (`vendor-signup.html`) · Login · Account (`../account/profile.html`)**.
This is the only tab bar with an **Account** tab and one of two with a **Partner** tab.

> The dashboard is read-only: a vendor cannot accept, decline or reply to anything.

---

## 14 · vendor/vendor-signup.html — become a partner

- **URL:** `vendor/vendor-signup.html` · **Audience:** vendor
- **Title:** `Become a Partner — Vivah Spot`
- **Meta description:** "List your wedding service on Vivah Spot and reach thousands of couples
  planning their big day. **Free vendor registration.**"
- Skip link **"Skip to form"**. App bar tagline overridden to **"Partner Registration"**.
- Intro: H1 **"Become a Partner"**, body **"List your service on Vivah Spot and reach thousands
  of couples planning their big day."**
- An **8-section single-page form**, numbered with `sec-no` chips. Required fields carry a
  red `*`. `onsubmit="return false;"`.

| # | Section heading | Fields (label — placeholder / options; `*` = required) |
| --- | --- | --- |
| 1 | **Business Information** | "Business / Brand name" * — *e.g. Green Meadows Lawn*; "Owner / Contact person" * — *Full name*; "Service category" * — select: *Select a category / Lawns & Venues / Catering / Decoration / **Photography & Videography** / Makeup & Mehndi / DJ & Music / Other*; "Services offered" — *e.g. Veg & Non-veg buffet, live counters*, hint "Comma-separated list of what you offer."; "Established year" — *2015*; "Team size" — *10*; "About your business" — textarea *Tell couples what makes your service special…* |
| 2 | **Contact Details** | "Mobile number" * — `+91` prefix, *10-digit mobile*, hint **"We'll send an OTP to verify this number."**; "Alternate phone" — *Optional*; "Email address" * — *business@email.com*; "Website" — *https://*; "Instagram" — *@handle* |
| 3 | **Location & Service Area** | "Business address" * — *Shop / building, street, area*; "City" * — *Pune*; "Pincode" * — *411001* (`maxlength=6`); "State" * — select of 9 states + Other; "Cities / areas you serve" — *e.g. Pune, PCMC, Lonavala*, hint **"Where can couples book you?"** |
| 4 | **Pricing** | "Pricing model" — select: *Per plate / Per day / Per event / Per hour / Package based*; "Starting price (₹)" — *25000*; "Capacity" — *e.g. 500 guests* |
| 5 | **Legal & Verification (KYC)** | "GST number" — *22AAAAA0000A1Z5* (`maxlength=15`); "PAN number" * — *ABCDE1234F* (`maxlength=10`); "Owner ID proof" — select: *Aadhaar card / Passport / Voter ID / Driving licence*; "Upload ID document" * — file drop **"Tap to upload (PDF / JPG / PNG)"**; "Business licence / registration" — file drop **"Tap to upload (optional)"** |
| 6 | **Bank Details (Payouts)** | "Account holder name" * — *As per bank records*; "Account number" * ; "IFSC code" * — *HDFC0001234* (`maxlength=11`); "UPI ID" — *name@bank (optional)* |
| 7 | **Portfolio & Media** | "Business logo" — file drop **"Upload logo"**; "Work photos / portfolio" — multi-file drop **"Add up to 10 photos of your work"** |
| 8 | **Account Security** | "Password" * — *Create password* with show/hide; "Confirm" * — *Re-enter* with show/hide |

- **Agreements** — two required checkboxes:
  1. "I confirm the above details are accurate and I'm authorised to represent this business."
  2. "I agree to the **Partner Terms** & **Privacy Policy**." — **both links point at
     `vendor-signup.html`**, i.e. back to this page. Neither document exists.
- Submit: **"Submit for Verification"**
- Footer link: "Already a partner? **Log in →**" → `../account/login.html`
- Page footer repeats "© 2026 Vivah Spot · Big day, sorted." + the Aaknav / Anvayro credit.
- Tab bar with **Register** `active` → `../index.html#register`.

### Behaviour

The only JS on the page is the password show/hide toggles and a file-input label updater
("shows selected file name(s) on the upload tiles"; multi-select shows `"3 files selected"`).
**There is no submit handler at all** — pressing "Submit for Verification" does nothing
visible. No toast, no redirect, no storage. This is the single largest form on the site and
the least functional.

---

## 15 · Page inventory

14 published pages. Every one is a hand-written static HTML file; there is no build step,
no router and no server.

| # | Page | URL | For | Purpose (one line) |
| --- | --- | --- | --- | --- |
| 1 | Home | `/` (`index.html`) | family / public | Landing: search, 6 categories, featured + trending vendors, planner promo, inspiration teaser, how-it-works, inline signup, about. |
| 2 | Browse / Search | `category.html` `?cat=` `?q=` | family | The single results surface — category browse, free-text search, or all vendors, with sort and speciality chips. |
| 3 | Vendor detail | `vendor.html?id=` | family | Full listing: gallery, badges, amenities, packages, availability calendar, reviews, three contact routes, sticky Book Now. |
| 4 | Compare | `compare.html` | family | 2–3 vendors side by side across 8 attribute rows with Lowest / Best / Most winners. |
| 5 | Smart Planner | `budget.html` | family | Split a total budget across chosen services by weight and surface the top-matched vendor per service. |
| 6 | Inspiration | `inspiration.html` | family / public | Filterable 12-photo idea gallery with a lightbox that routes to the matching vendor category. |
| 7 | Not found | `404.html` | public | 404 with routes back to home and to browse. |
| 8 | Log in | `account/login.html` | family | Email/mobile + password, plus Google and OTP buttons. Inert. |
| 9 | Create account | `account/register.html` | family | Name / email / mobile / password sign-up. Toasts and redirects; stores nothing. |
| 10 | My Account | `account/profile.html` | family | Account hub: hard-coded identity, live counts, and the menu into bookings, saved, partner signup and the vendor dashboard. |
| 11 | Saved Vendors | `account/favourites.html` | family | Vendor cards filtered to `vs_favs`. |
| 12 | My Bookings | `account/bookings.html` | family | List of locally-stored booking requests with a Pending / Confirmed pill. |
| 13 | Vendor Dashboard | `vendor/dashboard.html` `?id=` | vendor | Five metric cards, a conversion funnel, booking requests and recent leads for a selected vendor. Read-only. |
| 14 | Become a Partner | `vendor/vendor-signup.html` | vendor | The 8-section partner onboarding form (business, contact, location, pricing, KYC, bank, portfolio, security). |

---

## 16 · Global navigation

The shell is the same on every page: **fixed app bar → scrolling `.screen` → bottom tab bar**,
all inside a `.app` frame that is a visible phone on desktop and full-bleed on mobile.

### App bar — two variants

| Variant | Left | Centre | Right | Used on |
| --- | --- | --- | --- | --- |
| **Brand bar** | *(nothing)* or back chevron | `Vivah`/`Spot` lockup + tagline | city pill + avatar (home only) | `index.html`, `404.html`, `account/login.html`, `account/register.html`, `vendor/vendor-signup.html` |
| **Page bar** | back chevron | `page-title` (+ optional `page-sub`) | contextual action or an empty `appbar-spacer` | `category.html`, `vendor.html`, `compare.html`, `budget.html`, `inspiration.html`, `account/*`, `vendor/dashboard.html` |

Contextual right-hand actions: **heart** (vendor detail, "Save to favourites"), **trash**
(compare, "Clear all"). Everywhere else it is a spacer that exists only to keep the title centred.

Back targets vary and are worth noting: `index.html` from category / budget / inspiration /
login / register / profile / vendor-signup; `history.back()` from vendor detail and compare;
`profile.html` from bookings and favourites; `account/profile.html` from the vendor dashboard.

**There are no breadcrumbs anywhere on the site.** The back chevron is the entire upward path.

### Bottom tab bar — four variants

The tab bar is 5 tabs on mobile. At ≥768px CSS reorders it to a **top navigation strip**
(pill tabs, centred, border-bottom instead of border-top); at ≥1024px it becomes sticky
under the app bar. Same markup, different position.

| Variant | Tabs | Pages |
| --- | --- | --- |
| **A · Home (anchors)** | Home `#home` · Services `#services` · Register `#register` · Login `account/login.html` · About `#about` | `index.html` — the only page whose tabs are in-page anchors driven by a scroll-spy |
| **B · Standard** | Home · Services (`index.html#services`) · Register (`account/register.html`) · Login · About (`index.html#about`) | `category.html`, `compare.html`, `budget.html`, `account/login.html`*, `account/register.html`*, `account/profile.html`, `account/favourites.html`, `account/bookings.html`, `vendor/vendor-signup.html`* |
| **C · Inspiration** | Home · Services · **Planner (`budget.html`)** · Login · About | `inspiration.html` only |
| **D · Vendor** | Home · Services · **Partner (`vendor-signup.html`)** · Login · **Account (`account/profile.html`)** | `vendor/dashboard.html` only |

\* login / register / vendor-signup use variant B but point "Register" at `../index.html#register`
rather than `account/register.html`, so the same tab label leads to two different signup forms
depending on which page you are standing on.

**Pages with no tab bar at all:** `vendor.html` (replaced by the sticky book bar) and `404.html`.

### Footer

Only two pages carry one — `index.html` and `vendor/vendor-signup.html`. Identical content:
"© 2026 Vivah Spot · Big day, sorted." and
"Co created by **Aaknav** in collaboration with **Anvayro**". No footer nav links anywhere.

### Reachability

- **Compare** is reachable *only* through the floating compare tray after adding 2 vendors —
  it is in no nav, no tab bar and not in the sitemap.
- **Inspiration** is reachable only from the home "Get inspired" section.
- **Budget planner** is reachable from the home promo card and the inspiration tab bar.
- **Vendor dashboard** is reachable only from `account/profile.html` — a family-side screen.
- **Saved Vendors / My Bookings** are reachable only from `account/profile.html`.
- The **avatar** on the home app bar is the only entry to the account area from the home screen,
  and it is present on **no other page**.

---

## 17 · Component vocabulary

Anatomy as built. Names are the site's own class names.

### Vendor card — `.vcard` (`vsVendorCard()`)
The single most reused component; the whole card is an `<a>` to `vendor.html?id=…`.
- **Media block** (`.vcard-media`): 16:9-ish photo, and four overlays —
  - `.vcard-tag` — category name pill, top-left
  - `.vcard-fav` — heart button, `aria-label="Save to favourites"`, toggles `.active`
  - `.rating` — `★ 4.8` pill
  - `.vcard-cmp` — a **"Compare"** button with an up/down-arrows icon
- **Body** (`.vcard-body`): up to 2 badges, `<h3>` name, `.vcard-meta` (map-pin + city),
  and a foot row of `.vcard-price` (`₹85,000 / day`) beside a `.vcard-btn` reading **"View"**.

Used in three layouts, all from the same markup:
`.cards` (responsive grid) · `.rail` (horizontal scroll strip) · category grid pages.

### Badge — `.vbadge`
Emoji + label pill in five deterministic flavours (see §0). Grouped in a `.vbadges` row.

### Category tile — `.cat`
Square-ish image tile with a `.cat-label` beneath. Links to `category.html?cat=<slug>`.
Six of them in a `.cat-grid`.

### Chip — `.chip`
A single-select pill used in three toolbars: **sort** (category), **speciality** (category),
**inspiration filter**. Always exactly one `.active` at a time. Two variants exist:
`.svc-chip` on the planner is a **multi-select toggle** (`.on` class) with a coloured dot,
and `.amenity` is a **non-interactive** display chip on the vendor detail page
(`.amenity--spec` for specialities).

### Rating displays — three distinct treatments
1. `.rating` — `★ 4.8` pill on a card photo
2. `.detail-rating` — big number over "128 reviews" on the detail head
3. `.review-stars` / `stars(n)` — literal `★★★★☆` glyph string in reviews and in compare cells

### Price display
Always `vsFormatPrice(n)` — `₹85,000` — followed by a `<small>` unit: `/ day`, `/ plate`,
`/ event`, `/ booking`. On the sticky bar it is prefixed **"Starting from"**;
in compare, the row label is **"Price from"**.

### Package card — `.pkg`
`.pkg-top` (name + `.pkg-price` with the unit) over a `<ul class="pkg-features">` of bullet
strings. Purely presentational — there is no per-package CTA; the modal's `select` is where a
package is chosen.

### Availability calendar — `.cal`
`.cal-nav` (‹ month year ›) + a 7-column `.cal-grid` of `.cal-dow` headers and `.cal-cell`s in
four states: `empty` (leading blanks), `past` (inert), `avail` (button), `booked` (disabled).
A `.cal-legend` explains the dots and carries the hint "Tap an available date to request it".

### Bottom-sheet modal — `.modal-overlay` / `.modal`
Drag `.modal-handle`, `<h3>`, `.modal-sub`, a stacked `.field` form, one full-width primary
button. Dismissed by overlay click or `Escape`. Used once — the booking sheet.

### Lightbox — `.lightbox`
Full-bleed image dialog with `×` close, `<figcaption>` carrying title + category + a
"Browse … vendors →" link. Used once — inspiration.

### Form field — `.field` vs `.ifield`
Two different form idioms coexist:
- `.field` — a visible `<label>` above the control, with an optional `<small class="hint">`
  and a red `<span class="req">*</span>`. Used on vendor-signup, the planner, the booking modal
  and the review form. `.field-row` puts two side by side.
- `.ifield` — a bordered pill with a **leading icon and a placeholder in place of a label**
  (the label survives only as `aria-label`). Used on login, register and the home signup card.

Sub-parts: `.pw-toggle` (eye show/hide, flips `aria-pressed` and `aria-label`),
`.input-prefix` (the `+91` box), `.file-drop` (tap-to-upload tile that rewrites its own label
to the chosen filename), `.check` (checkbox + wrapped text), `.star-input` (5 tappable stars).

### Compare tray — `.cmp-tray`
Auto-injected into `<body>` by `vsInitCompare()` on every page that shows vendor cards.
Shows 3 slots (filled thumbnails with an `×`, empties render as `+`), a **"Clear"** button and
a primary action that reads **"Pick 2+"** while disabled and **"Compare 2"** / **"Compare 3"**
once ready.

### Comparison grid — `.cmp-grid`
A label column plus one column per vendor, driven by `--n`. Winner pills `.cmp-best` read
**"Lowest"**, **"Best"**, **"Most"**.

### List row — `.list-row`
Thumbnail + `.lr-body` (h4, one or two `<p>`) + a right-hand `.status` pill. Used for bookings
(family and vendor sides) and leads. Status values rendered: **Pending**, **Confirmed**, **Lead**.

### Account menu item — `.acct-item`
Coloured icon square + `.acct-text` (bold label over a small description) + chevron.
Grouped under `.acct-group-label` headers ("Account", "More").

### Stat tiles — three near-identical variants
`.stat` (about section: `500+` / `Vendors`), `.acct-stat` (profile), `.bp-stat` (planner
summary), `.dash-card` (dashboard, adds a coloured icon).

### Funnel — `.funnel-row`
Label · proportional bar · value. Dashboard only.

### Empty state — `.empty`
Consistent 4-part anatomy everywhere it appears: **circular icon** → **`<h3>`** →
**one-sentence `<p>`** → **one full-width button** capped at 260px and centred.
Five instances exist (see §19).

### Toast — `.toast`
A single `#toast` element per page, or created on demand by `vsToast()`. Adds `.show` for
~2.4–2.6 s. Always a sentence ending in `✓` for success.

### Section head — `.section-head`
`<h2>` on the left, an optional `.link-more` reading **"See all"** on the right.

### Rail — `.rail`
Horizontal scroll strip of vendor cards. `vsRailHTML(title, vendors)` wraps it in a titled
`.detail-section` and returns `""` when the list is empty, so empty rails vanish silently.

### Skip link — `.skip-link`
Present on category ("Skip to results"), vendor / compare / budget / inspiration / dashboard
("Skip to content"), login ("Skip to login"), register ("Skip to sign-up"), vendor-signup
("Skip to form") and profile ("Skip to account"). **Absent** from `index.html`, `404.html`,
`account/favourites.html` and `account/bookings.html`.

---

## 18 · Implied user flows

Traced from actual `href` and JS navigation. Nothing here is inferred.

### Flow A · Family — landing to contacting a vendor (the primary path)

1. **Home** (`index.html`) — land on the hero "Plan your perfect wedding".
2. Choose one of three entries into browse:
   - a **category tile** → `category.html?cat=venues`
   - the **search bar** (GET submit) → `category.html?q=lonavala`
   - **"See all"** / **"Explore Services"** → `category.html` (all 14 vendors)
   - *(or skip browse entirely: tap a **Featured near you** or **Trending now** card and jump
     straight to step 5)*
3. **Browse** (`category.html`) — narrow with the sort chips
   (Recommended / Top rated / Price: low to high / Price: high to low / Verified only) and,
   in photography or decoration, the speciality chips.
4. Tap a vendor card → the whole card is a link.
5. **Vendor detail** (`vendor.html?id=…`) — gallery, badges, About, What's included,
   Specialities, Packages, Check availability, Reviews, and four recommendation rails.
6. **Contact happens three ways, and they are not equivalent:**
   - **"WhatsApp"** → leaves the site to `wa.me` with a prefilled message. *This is the only
     route that puts the family in direct contact with a human.*
   - **"Call"** → `tel:` link, also leaves the site.
   - **"Inquiry"** → stays on-page, writes to `vs_inquiries`, toasts "Inquiry sent ✓  The
     vendor will get back to you". Nothing is actually sent.
7. **Or take the booking path:** tap **"Book Now"** on the sticky bar (or tap an available
   date on the calendar, which prefills the date and opens the same sheet).
8. **Booking sheet** — "Request a booking": Event date, Package, Your name, Mobile number →
   **"Confirm booking"**.
9. Toast **"Booking requested ✓  See My Bookings"**; the date immediately shows as booked on
   the calendar.
10. **My Bookings** (`account/bookings.html`) — reached via
    home avatar → **My Account** → **My Bookings**. The row shows **Pending**.
    *The toast names "My Bookings" but is not a link; the user must navigate there manually.*

**Side paths off the main flow**
- **Save:** heart on any card or in the vendor app bar → `account/favourites.html`
  via My Account → **Saved Vendors**.
- **Compare:** "Compare" on ≥2 cards → the floating tray's **"Compare 2"** →
  `compare.html` → **"View"** back into a vendor.
- **Plan first:** Home → promo **"Plan your wedding →"** → `budget.html` → set city / guests /
  budget / date → tap the recommended vendor row → `vendor.html?id=…`, or
  **"+3 more in budget →"** → `category.html?cat=…`.
- **Browse by idea:** Home → **"Get inspired"** → `inspiration.html` → tap a photo →
  lightbox → **"Browse Decoration vendors →"** → `category.html?cat=decoration`.

### Flow B · Vendor — signing up

1. Arrive at **"Become a Partner"** from any of three places:
   - Home register card → "Are you a vendor? **List your service →**"
   - `account/register.html` → the same link
   - `account/profile.html` → **"Become a Partner"** menu item
   - *(also the dashboard's **Partner** tab)*
2. **`vendor/vendor-signup.html`** — H1 "Become a Partner".
3. Fill 8 sections in one long scroll: **Business Information → Contact Details →
   Location & Service Area → Pricing → Legal & Verification (KYC) → Bank Details (Payouts) →
   Portfolio & Media → Account Security**.
4. Tick both agreement checkboxes ("I confirm the above details are accurate…" and
   "I agree to the Partner Terms & Privacy Policy.").
5. Press **"Submit for Verification"** — **and nothing happens.** There is no submit handler,
   no toast, no redirect, no persistence. The flow dead-ends here.
6. The implied-but-unbuilt continuation, from copy on the page: OTP verification of the mobile
   number ("We'll send an OTP to verify this number."), then a verification review that would
   eventually produce the 🏆 **Verified** badge.
7. A vendor who wants to see performance goes to **`vendor/dashboard.html`** — but the only
   link to it is inside the *family* account hub, and the page identifies the vendor with a
   **"Viewing as"** dropdown of all 14 demo vendors rather than a session.

### Flow C · Family — account (cosmetic)

1. Home avatar → `account/profile.html` (**no login required** — the avatar links straight in).
2. Or Home tab **Login** / **"Log in →"** → `account/login.html` → **"Log In"** does nothing.
3. Or Home **"Create Account"** → toast only; or `account/register.html` **"Create Account"** →
   toast then redirect to home.
4. `profile.html` **"Log out"** → navigates to `login.html`, keeping all local data.

There is **no gate anywhere**. Every "authenticated" page is reachable directly by URL.

---

## 19 · The site's own words

Verbatim microcopy, grouped. This is the existing voice.

### Brand and taglines
- **"Vivah Spot"** — always two-tone, `Vivah` + `Spot`
- **"Big day, sorted."** — the tagline, in the app bar and both footers
- "Wedding Services Marketplace" (title / manifest)
- "© 2026 Vivah Spot · Big day, sorted."
- "Co created by **Aaknav** in collaboration with **Anvayro**"

### Headlines
- "Plan your perfect wedding"
- "Book trusted vendors for every part of your big day — all in one place."
- "Join Vivah Spot" · "Create your account" · "It's free — takes less than a minute."
- "Welcome back" / "Log in to manage your bookings and saved vendors."
- "Join Vivah Spot" / "Save vendors, manage bookings & plan faster."
- "Smart Wedding Planner" / "Tell us your city, guests, budget and date, then pick the services
  you need — we'll split your budget and recommend the best-matched vendors."
- "Become a Partner" / "List your service on Vivah Spot and reach thousands of couples planning
  their big day."
- "Vivah Spot connects you with trusted wedding-service providers — lawns, caterers, decorators,
  photographers and more — so you can plan every detail of your celebration from one simple app.
  Verified vendors, transparent pricing, no hassle."

### Section headings
"Services" · "Featured near you" · "Trending now" · "Get inspired" · "How it works" ·
"About" · "Vendor details" · "What's included" · "Specialities" · "Packages" ·
"Check availability" · "Reviews" · "Similar vendors" · "Top rated in Pune" ·
"People also viewed" · "Your plan" · "Conversion funnel" · "Booking requests" · "Recent leads" ·
"Compare Vendors" · "Side by side" · "Inspiration" / "Ideas for your big day" ·
"Smart Planner" / "Budget & vendor suggestions" · "My Account" · "My Bookings" ·
"Saved Vendors" · "Vendor Dashboard" / "Your performance at a glance"

### Buttons and links
| Copy | Where |
| --- | --- |
| "Search" | home search |
| "Explore Services" | hero |
| "See all" | section heads (services, trending, inspiration) |
| "Plan your wedding →" | budget promo |
| "View" | vendor card foot, compare column |
| "Compare" / "Pick 2+" / "Compare 2" / "Clear" | card overlay + tray |
| "Book Now" | sticky bar |
| "Confirm booking" | booking sheet |
| "WhatsApp" / "Call" / "Inquiry" | vendor contact row |
| "✍ Write a review" / "Submit review" | reviews |
| "Create Account" | home card + register page |
| "Log In" | login |
| "Continue with Google" / "Continue with OTP" | login |
| "Sign up with Google" / "Sign up with OTP" | register |
| "Log in →" / "Create an account →" / "List your service →" | cross-links |
| "Forgot password?" / "Remember me" | login |
| "Submit for Verification" | vendor signup |
| "Log out" | profile |
| "Back to home" / "Browse services" / "Browse vendors" | empty states |
| "+3 more in budget →" / "Browse all →" / "See all options →" | planner |
| "Browse Decoration vendors →" | inspiration lightbox |
| "Skip to content" / "Skip to results" / "Skip to login" / "Skip to sign-up" / "Skip to form" / "Skip to account" | skip links |

### Sort, filter and chip labels
"Recommended" · "Top rated" · "Price: low to high" · "Price: high to low" · "Verified only" ·
"All" · "Pre-Wedding" · "Candid" · "Traditional" · "Drone" · "Cinematic" · "Mandap" · "Haldi" ·
"Mehendi" · "Reception" · "Destination Wedding" · "Decoration" · "Photography" · "Themes" ·
"Bridal Looks" · "Venue" · "Catering" · "Makeup & Mehndi" · "DJ & Music"

### Badge labels
"🏆 Verified" · "⭐ Top Rated" · "🔥 Most Booked" · "💎 Premium" · "⚡ Quick Response" ·
"Lowest" · "Best" · "Most" · "Pending" · "Confirmed" · "Lead" · "You" · "Member since 2026"

### Placeholders
"Search venues, caterers, decor…" · "Full name" · "Mobile number" · "Email address" ·
"Email or mobile number" · "Password" · "Create password" · "Re-enter" · "10-digit mobile" ·
"Share your experience…" · "e.g. Green Meadows Lawn" · "e.g. Veg & Non-veg buffet, live
counters" · "Tell couples what makes your service special…" · "business@email.com" ·
"https://" · "@handle" · "Shop / building, street, area" · "Pune" · "411001" ·
"e.g. Pune, PCMC, Lonavala" · "25000" · "e.g. 500 guests" · "22AAAAA0000A1Z5" · "ABCDE1234F" ·
"HDFC0001234" · "As per bank records" · "Account number" · "name@bank (optional)" ·
"Optional" · "2015" · "10"

### Form labels (visible `<label>`s)
"Event date" · "Package" · "Your name" · "Mobile number" · "Your rating" · "Your review" ·
"Add a photo (optional)" · "City" · "Guest count — 250" · "Total budget (₹)" ·
"Wedding date (optional)" · "Services you need" · "Viewing as" ·
"Business / Brand name" · "Owner / Contact person" · "Service category" · "Services offered" ·
"Established year" · "Team size" · "About your business" · "Alternate phone" · "Website" ·
"Instagram" · "Business address" · "Pincode" · "State" · "Cities / areas you serve" ·
"Pricing model" · "Starting price (₹)" · "Capacity" · "GST number" · "PAN number" ·
"Owner ID proof" · "Upload ID document" · "Business licence / registration" ·
"Account holder name" · "Account number" · "IFSC code" · "UPI ID" · "Business logo" ·
"Work photos / portfolio" · "Confirm"

### Hints
- "Comma-separated list of what you offer."
- "We'll send an OTP to verify this number."
- "Where can couples book you?"
- "Demo view — figures combine sample baselines with activity tracked on this device."
- "Tap an available date to request it"
- "“Smart” picks rank by rating, popularity, your city and (if set) availability on your date.
  We also keep a small buffer for misc costs — add ~10% on top for a safety margin."

### Toasts (all success, all end in ✓)
- "Account created ✓"
- "Booking requested ✓  See My Bookings"
- "Inquiry sent ✓  The vendor will get back to you"
- "Thanks! Your review was added ✓"
- "Booking request sent ✓" *(the static default in `vendor.html`, overwritten before it shows)*

### Validation / error text — the complete set
Only **two** messages exist in the entire site:
- "Please pick a star rating"
- "You can compare up to 3 vendors"

Everything else is silent: the booking form returns early on invalid input with no message; the
login and register forms never validate at all beyond native `required`.

### Empty states — the complete set
| Page | Heading | Body | Button |
| --- | --- | --- | --- |
| `category.html` | "No vendors found" | "Try a different category or clear your filters." | "Back to home" |
| `vendor.html` | "Vendor not found" | "This listing may have been removed." | "Back to home" |
| `compare.html` | "Pick at least 2 vendors" | "Tap **Compare** on any vendor card, then come back here to see them side by side." | "Browse vendors" |
| `account/favourites.html` | "No saved vendors" | "Tap the heart on any vendor to save them here for later." | "Browse services" |
| `account/bookings.html` | "No bookings yet" | "Find a vendor you love and request a booking — it'll show up here." | "Browse services" |
| `404.html` | "404" | "We couldn't find that page. Let's get you back to planning." | "Back to home" |

Inline empties (no icon, no button):
- "Select at least one service above to see your plan." (planner)
- "No decoration vendors within this allocation. See all options →" (planner)
- "No booking requests yet for this vendor on this device. Request one from the vendor page to
  see it here." (dashboard)
- "No leads yet. Tap “Inquiry” on the vendor page to generate one." (dashboard)
- "Nothing to compare" (compare app bar sub)

### How-it-works copy (the site's own model of itself)
1. **Browse** — "Explore service categories for every part of your big day."
2. **Compare** — "Check verified vendors, real prices & genuine reviews."
3. **Book** — "Reserve your slot instantly with secure payments."
4. **Celebrate** — "Relax and enjoy a perfectly planned celebration."

### Perk copy
- "Save & compare your favourite vendors"
- "Book in minutes & track every booking"
- "Verified vendors & transparent pricing"

### Seed review text (three hard-coded reviews on every vendor)
- **Priya & Rohan** ★5 — "Absolutely wonderful experience from start to finish. Highly
  professional and exactly what we wanted for our big day."
- **Sneha Kulkarni** ★5 — "Punctual, courteous and great value. Our guests are still talking
  about it!"
- **Amit Deshmukh** ★4 — "Really good service overall. Communication could be a little quicker,
  but the quality was top-notch."

### Prefilled WhatsApp message
"Hi, I'm interested in **`<vendor name>`** (`<category>`) on Vivah Spot. Could you share
availability and pricing?"

---

## 20 · Gaps

### Dead links — `href` that goes nowhere useful

| Link text | On | Points at | Reality |
| --- | --- | --- | --- |
| "Help & Support" | `account/profile.html` | `#` | No page exists |
| "Settings" | `account/profile.html` | `#` | No page exists |
| "Forgot password?" | `account/login.html` | `login.html` | Reloads the same page |
| "Partner Terms" | `vendor/vendor-signup.html` | `vendor-signup.html` | Reloads the same page |
| "Privacy Policy" | `vendor/vendor-signup.html` | `vendor-signup.html` | Reloads the same page |

There is **no Terms, no Privacy Policy, no Help/FAQ, no Contact page** anywhere on the site,
yet the signup form requires the user to agree to two of them.

### Forms that submit nowhere

| Form | Button | What actually happens |
| --- | --- | --- |
| Home signup card | "Create Account" | Toast + reset. No storage. |
| `account/register.html` | "Create Account" | Toast + redirect to home after 1200 ms. No storage. |
| `account/login.html` | "Log In" | `onsubmit="return false;"` — **nothing at all** |
| Login/register social | "Continue with Google", "Continue with OTP", "Sign up with Google", "Sign up with OTP" | `type="button"`, **no event listener** |
| `vendor/vendor-signup.html` | "Submit for Verification" | **No submit handler.** No feedback of any kind. |

Only three interactions on the whole site actually persist anything: **favourite**, **compare**,
**booking request / inquiry / review** — all to `localStorage`, all device-local.

### Features shown but not real

- **Availability** is fabricated: `hash(vendorId + date) % 5 === 0` marks ~20% of dates booked.
  A vendor's calendar is deterministic fiction.
- **"Quick Response"** badge is `hash(id) % 3 === 0` — the code comment says so outright.
- **Dashboard metrics** are `reviews * 7 + hash` with fixed conversion percentages layered on.
- **Vendor phone** is one shared demo number (`+91 91122 33445`) for all 14 vendors — both the
  WhatsApp and Call buttons on every vendor reach the same number.
- **"Confirmed"** booking status is rendered but never assigned; every booking is `"pending"`.
- **Profile identity** ("Aanya Sharma", "aanya.sharma@email.com", "Member since 2026",
  the "A" avatar, "4.8★ Avg. rating") is hard-coded HTML.
- **"500+ Vendors · 12 Cities · 4.8★ Avg. rating"** on the About section against 14 vendors in
  one metro.
- The **city pill** persists a choice to `vs_city` but only `budget.html` ever reads it —
  changing the city does not change what `category.html` or the home rails show.
- **"Featured near you"** is three hard-coded vendor ids, unrelated to the selected city.

### Structural gaps

- **No search on the results page.** Once you are on `category.html` there is no way to change
  the query — you must go back to home. The search bar exists on exactly one page.
- **No price, city, capacity or rating filter** — only sort chips plus "Verified only".
  Speciality chips exist for 2 of 6 categories.
- **No pagination or lazy loading** — 14 vendors render at once.
- **No role separation.** The vendor dashboard is linked from the family account hub; the
  dashboard's "Viewing as" dropdown exposes every vendor.
- **No auth gate.** Every account and vendor page is directly URL-reachable.
- **No booking detail, cancel or reschedule.** A booking row links back to the vendor page.
- **No messaging.** "Inquiry" writes a record with no message body — no subject, no text, no
  reply channel. WhatsApp is the only real conversation route.
- **Vendors cannot act.** The dashboard has no accept / decline / quote / reply affordance.
- **No listing management.** A vendor can sign up but there is no screen to edit a listing,
  packages, photos or availability afterwards.
- **`compare.html` is orphaned** — not in the sitemap, not in any nav; only the tray reaches it.

### Sitemap vs reality

`sitemap.xml` lists 13 URLs (home, `category.html`, its six `?cat=` variants, inspiration,
budget, vendor-signup, login, register). All of them exist. But it **omits** seven published
pages:
`vendor.html`, `compare.html`, `404.html`, `account/profile.html`, `account/favourites.html`,
`account/bookings.html` and `vendor/dashboard.html`.
Most of those omissions are deliberate — `robots.txt` disallows `account/profile.html`,
`account/favourites.html` and `account/bookings.html`, and `compare.html`, `404.html`,
`vendor/dashboard.html`, `account/profile.html`, `account/favourites.html` and
`account/bookings.html` all carry `<meta name="robots" content="noindex, follow">` — but **`vendor.html` — the most
important page on the site — is in neither the sitemap nor `robots.txt`**, despite the page
building per-vendor canonical and Open Graph tags client-side (which crawlers will not execute).

`site.webmanifest` declares `display: standalone`, `theme_color: #e23e7a`,
`background_color: #fff7fb` and a **single SVG icon** — no PNG icons, so installability is
partial. There is no service worker, so the "works offline" claim in the README is only true in
the sense that all assets are local.

### Naming inconsistencies inside the site

- Category is **"Photography"** in `CATEGORIES` but **"Photography & Videography"** in the
  vendor-signup dropdown.
- Category is **"Lawns & Venues"** everywhere except the planner chip, which says **"Venue"**.
- The signup dropdown adds an **"Other"** category that no browse surface can display.
- **"Saved Vendors"** (page title, menu) vs **"favourites"** (`vs_favs`, `aria-label="Save to
  favourites"`, filename `favourites.html`) vs **"hearted"** (menu description).
- **"Inquiry"** (button, toast) vs **"Leads"** / **"Leads Generated"** (dashboard) vs
  **"New inquiry"** (lead row) — one concept, three names.
- **"Book Now"** (button) → **"Request a booking"** (sheet title) → **"Confirm booking"**
  (submit) → **"Booking requested ✓"** (toast) → **"Booking requests"** (dashboard) —
  the copy oscillates between a transaction and a request within a single interaction.

---

## 21 · Domain vocabulary the site uses

Recorded exactly as built, with a flag where it collides with the PRD Glossary (§3) or the
PRD §7.9 ban list. **Flagging is not a recommendation — it is a record of the conflict.**

| Site word | Where it appears | Status |
| --- | --- | --- |
| **Book / Book Now / Booking / Bookings / Booked / booking request** | "Book Now" sticky bar, "Confirm booking", "Booking requested ✓", "My Bookings", "Booking Requests", "Most Booked" badge, "Booked" calendar state, "Book in minutes & track every booking", "Book trusted vendors…", "Day Booking"/"Evening Booking" package names, `unit: "booking"`, `vs_bookings`, "Where can couples book you?" | **BANNED** by PRD §7.9 (*booking, booked*). Pervasive — this is the site's central verb and it appears in headline copy, button labels, page titles, nav items, data fields and a badge. |
| **Package / Packages** | "Packages" section, "Package" modal field, package select options, "Package based" pricing model, `packages[]` | **RETIRED** term per CLAUDE.md §6 (from the superseded Tech-Stack model). The Glossary has no direct replacement — the site uses it for a priced bundle of features. |
| **Vendor Listing** *(implied)* | "This listing may have been removed.", "List your service", `search_listings` | "Listing" survives in the Glossary; the retired compound "Vendor Listing" does not appear on the site. |
| **Inquiry / Inquiries / Leads** | "Inquiry" button, "Inquiry sent ✓", "New inquiry", "Leads Generated", "Recent leads", `vs_inquiries` | Glossary word is **Enquiry** (British spelling). The site consistently uses American **"Inquiry"** and separately calls the same thing a **"Lead"**. |
| **Reserve / reservation** | "Reserve your slot instantly with secure payments." (How it works step 3), "View & manage your reservations" (profile menu) | Not in the Glossary. Reads as a transactional commitment; adjacent to the banned *booked*. |
| **secure payments / payments** | "Reserve your slot instantly with secure payments.", "Bank Details (Payouts)" | The site promises in-app payment. Note the no-money model this collides with. |
| **Verified / Verification** | 🏆 Verified badge, "Verified only" filter, "Verified vendors & transparent pricing", "Legal & Verification (KYC)", "Submit for Verification" | **Glossary-clean.** Matches *Verification*. |
| **Vendor** | Everywhere — "vendor card", "Vendor details", "Saved Vendors", "Vendor Dashboard" | **Glossary-clean.** |
| **Partner** | "Become a Partner", "Partner Registration", "Partner Terms", "Already a partner?", Partner tab | A **second name for Vendor**, used exclusively on the vendor-facing side. Not in the Glossary. |
| **Service / Services** | "Services", "Services you need", "Service category", "Services offered", "Top services", "wedding-service vendors" | **Glossary-clean** — but the site uses "Services" to mean *category* (the six tiles) as well as *what a vendor offers*, which the Glossary separates. |
| **Category** | `?cat=`, "Service category", `CATEGORIES` | Not a Glossary term; the retired model's "Service Category". |
| **Speciality / Specialities** | "Specialities" section, speciality chips | Not in the Glossary. |
| **Amenities / What's included** | `amenities[]`, "What's included" heading | The heading is user-facing; "amenities" is internal only. |
| **Availability / Available / Check availability** | Calendar section, legend, "Next available", prefilled WhatsApp message | Adjacent to Glossary *Slot / Span / Candidate Block*. The site has none of those concepts — only a per-date available/booked binary. |
| **Slot** | "Reserve your slot instantly" | **Glossary word used loosely** — here it means a calendar date, not the Glossary's Slot. |
| **Compare / Comparison** | "Compare", "Compare Vendors", "Side by side" | Not a Glossary term. Note the Glossary has *Shortlist* and *Selection* for adjacent ideas; the site has neither word. |
| **Favourite / Saved / hearted** | "Save to favourites", "Saved Vendors", "Vendors you've hearted" | Closest Glossary word is *Shortlist* — the site never says it. |
| **Review / Rating / Reviews** | Reviews section, star input, "genuine reviews" | Not Glossary terms; no obvious conflict. |
| **Couples** | "reach thousands of couples", "Tell couples what makes your service special…", "Where can couples book you?", "connects couples with…" | The site's word for the customer. The Glossary/product framing is **family**. |
| **Pending / Confirmed** | Booking status pills | Adjacent to Glossary *Commitment*; "Confirmed" is never actually set. |
| **Quote / Agreement / Amendment / Commitment / Shortlist / Selection / Span / Candidate Block / Chosen Block / Subscription / Tier / Rules** | — | **None of these Glossary words appear anywhere on the site.** The prototype has no concept for any of them. |

### One-line summary of the vocabulary conflict

The prototype is built end-to-end around **booking a package and paying for it**. The product
vocabulary is built around **enquiry, quote, agreement and commitment with no money changing
hands**. Every user-facing string in §19 that contains *book*, *package*, *reserve* or
*payment* is a place where the prototype's model and the product's model disagree — and those
strings are on the hero, the primary CTA, the how-it-works steps, a nav item, a page title and
a badge.
