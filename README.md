# Vivah Spot — Wedding Services Marketplace (UI Prototype)

**Big day, sorted.** A mobile-first web-app UI that connects couples with
wedding-service vendors — venues, catering, decoration, photography, makeup & mehndi, and
DJ & music. This is a **front-end prototype**: all data is mocked and runs in the browser.
There is **no backend, server, or database** — interactions persist only via `localStorage`.

## Tech

- Plain **HTML + CSS + vanilla JavaScript** (no frameworks, no build step).
- Single shared stylesheet (`styles.css`) as the design system.
- Shared mock data + render helpers in `assets/data.js`.
- Works offline — images and (system) fonts are local.

## Run it

Just open `index.html` in a browser. (For clean routing of relative URLs you can
optionally serve the folder, e.g. `npx serve` or VS Code Live Server, but it isn't required.)

## Project structure

```
Vivsathi/
├─ index.html              # Home: search, categories, featured vendors, how-it-works, register, about
├─ category.html           # Vendor listing — ?cat=<slug> or ?q=<search>, with sort/filter
├─ vendor.html             # Vendor detail — ?id=<vendor>, gallery, packages, reviews, booking
├─ 404.html                # Not-found page
├─ styles.css              # Design system + all component styles (shared by every page)
├─ assets/
│  └─ data.js              # Mock CATEGORIES + VENDORS, render helpers, favourites store
├─ account/
│  ├─ login.html           # Existing-user login
│  ├─ register.html        # Customer sign-up
│  ├─ bookings.html        # My bookings (reads localStorage)
│  ├─ favourites.html      # Saved vendors (reads localStorage)
│  └─ profile.html         # Account hub
├─ vendor/
│  └─ vendor-signup.html   # Vendor / partner onboarding (8-section form)
└─ images/                 # Local photos (hero, categories, featured)
```

## User journeys (all UI-only)

1. **Browse:** Home → tap a category tile → `category.html?cat=…` shows matching vendors.
2. **Search:** type in the home search bar → `category.html?q=…` filters by name/city/category.
3. **Sort/filter:** on the listing, chips re-order by rating / price or show verified only.
4. **Detail:** tap a vendor card → `vendor.html?id=…` with gallery, amenities, packages, reviews.
5. **Book:** "Book Now" opens a booking sheet; confirming saves to `localStorage` and shows in **My Bookings**.
6. **Save:** the heart on any card toggles a favourite (persisted) and appears in **Saved Vendors**.
7. **Account:** profile avatar (top-right on Home) → profile hub → bookings, saved, become a partner.

## Data & persistence (no backend)

- `CATEGORIES` and `VENDORS` are hard-coded arrays in `assets/data.js`.
- Favourites: `localStorage["vs_favs"]` (array of vendor ids).
- Bookings: `localStorage["vs_bookings"]` (array of booking objects).
- Pages set `window.IMG_BASE` (`""` at root, `"../"` one folder deep) so shared render
  helpers build correct relative paths.

## Design system (in `styles.css`)

- **Palette:** festive but tasteful — rose-pink `#e23e7a` primary with a pink→marigold
  gradient, plus per-category accents (green/orange/pink/blue/red/purple). CSS custom
  properties under `:root`.
- **Layout shell:** fixed-height app frame (`100dvh`); pinned top bar + bottom tab bar,
  the middle `.screen` scrolls. Mobile = full-bleed; tablet/desktop = full-bleed with the
  tab bar promoted to a top nav and content grids that auto-expand.
- **Components:** category image-cards, vendor cards, detail gallery, package cards,
  reviews, bottom-sheet modal, toasts, chips, list rows, empty states.
- **Accessibility:** skip links, `:focus-visible` rings, `aria-label`s, reduced-motion support.

## Notes / next steps for production

These would require a backend and are intentionally **not** implemented:
- Real authentication, vendor onboarding storage, payments, and booking confirmation.
- Server-side validation (PAN/GST/IFSC/OTP), image uploads, and search indexing.

Photos in `images/` are sourced from **Pexels** (free for commercial use, no
attribution required). Swap for owned/branded media anytime by replacing the files
in place (keep the same filenames). The home hero is a lightweight crossfading
photo slideshow (existing images, no video); it holds the first image for
reduced-motion users.

See `CHANGELOG.md` for the change history.
