# Changelog

All notable changes to the Vivah Spot UI prototype. Dates are approximate to the build session.

## [0.7.0] — Auth/account redesign, navbar & brand refresh (current)

Modernised the sign-up flow, account hub, navigation and brand without adding any
framework — all new styling is plain CSS using the existing design tokens, mostly
page-scoped so shared components stay safe.

### Added
- **Password show/hide toggles** on login, register and vendor-signup (vanilla JS, accessible).
- **Social / OTP sign-in** buttons (Google + OTP) on login and register.
- Landing **"Join Vivah Spot"** section rebuilt as a two-column promo (benefit bullets + form card).
- Account page: **Settings** menu entry; gradient **profile hero**; **Member since** badge.

### Changed
- **Login, register & vendor-signup** redesigned as modern glass cards: icon-led inputs,
  focus rings, gradient buttons, decorative background blobs, and (vendor-signup) frosted
  section cards with a staggered entrance.
- **Account page** redesigned: gradient hero with avatar, surface stat cards, and a grouped
  menu with colored icon chips, subtitles and a distinct red **Log out** action.
- **Navbar refresh** (shared `styles.css`): frosted app bar + bottom tab bar; active tab gets
  a soft accent pill and a gradient indicator (mobile), kept clean on the desktop top-nav.
- **Brand wordmark** restyled to a two-tone "Vivah Spot" (gradient "Vivah" + plum "Spot").
  A ring/sparkle logo mark was trialled and then removed per design direction.
- **Tagline** changed site-wide from "Your Digital Partner for Life" → "Big day, sorted."

## [0.6.0] — Desktop "web view" layout

Optimised the large-screen experience to behave like a real website instead of a stretched
mobile app. Gated at **≥1024px**; mobile and tablet keep the app-shell.

### Changed
- **Document scroll on desktop** (was a fixed-height app with internal scrolling).
- **Sticky two-row header**: brand bar + global navigation bar.
- **Centered max-width content container** (1240px, 1320px on ultra-wide) instead of edge-to-edge.
- **Hero** scales up like a landing banner; roomier section rhythm and grid gaps.
- **Footer** styled as a proper site footer.
- **Booking modal** becomes a centered dialog (fixed to viewport) on desktop; book bar sticks to the viewport bottom.
- Vendor detail constrained to a readable column (`.screen-narrow`, 880px).

## [0.5.0] — Multi-page prototype

Turned the single-screen UI into a navigable, production-style **front-end** (no backend;
mock data + `localStorage` only).

### Added
- **`assets/data.js`** — mock `CATEGORIES` (6) and `VENDORS` (16) with packages, amenities,
  ratings; shared helpers (`vsVendorCard`, params, price formatting) and a `localStorage`
  favourites store (`vs_favs`).
- **`category.html`** — vendor listing driven by `?cat=` or `?q=`, with sort/filter chips
  (recommended / top-rated / price / verified), live result count, and an empty state.
- **`vendor.html`** — vendor detail: image gallery with thumbnails, verified badge, rating,
  amenities, package cards, reviews, a sticky **Book Now** bar, and a booking bottom-sheet
  that saves to `localStorage` (`vs_bookings`) and confirms with a toast.
- **`account/register.html`** — customer sign-up (separate from vendor onboarding).
- **`account/bookings.html`** — "My Bookings", rendered from `localStorage`, with empty state.
- **`account/favourites.html`** — "Saved Vendors", rendered from favourites, with empty state.
- **`account/profile.html`** — account hub: avatar, stats, and menu (bookings, saved, become a partner, logout).
- **`404.html`** — friendly not-found page.
- **`README.md`** and **`CHANGELOG.md`**.
- Production polish in `styles.css`: skip links, `:focus-visible` outlines,
  `prefers-reduced-motion` support, and new component styles (listing chips, detail gallery,
  packages, reviews, modal, toast, account list rows, empty states).
- Home: profile **avatar** in the app bar, working **search form**, "See all" link.

### Changed
- Home category tiles now link to `category.html?cat=…` (were no-op `#services`).
- Home "Featured near you" cards are now rendered from `assets/data.js` so cards, links,
  and favourites stay consistent app-wide; each links to its `vendor.html`.
- Favourites now persist in `localStorage` and sync across all pages (was per-card only).

## [0.4.0] — Featured cards redesign
- Reworked "Featured near you" into image-top cards: category tag, favourite heart, overlaid
  rating, location with pin, price + View button, hover lift.

## [0.3.0] — Services + How-it-works enhancements
- Category tiles became image cards with label overlay, colored top accent, and hover zoom.
- "How it works" became 4 colorful icon cards (Browse → Compare → Book → Celebrate) with
  watermark step numbers.
- Removed **Invitations** and **Pandit / Priest** categories (home grid + vendor dropdown).
- Moved **About** section to the bottom of the home page.

## [0.2.0] — Responsive & layout
- Added large-screen support: full-bleed canvas, top navigation, auto-expanding content grids.
- Made the app shell fixed-height so the top bar and bottom tabs stay pinned while the
  middle scrolls (mobile included); locked page scroll, added `overscroll-behavior`.

## [0.1.0] — Foundation
- Mobile-first app shell (phone frame on desktop) with bottom tab bar.
- Festive, colorful theme; default system font.
- Pages organised into `account/` and `vendor/` folders with a shared `styles.css` and
  local `images/`.
- Initial pages: Home, Login, Vendor sign-up; city picker; sectioned home (hero, services,
  featured, how-it-works, register, about).
