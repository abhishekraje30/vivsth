# Visual identity extraction — Vivah Spot

Source of record for this file: the published site's `styles.css` (1139 lines), plus the monorepo
token mirrors. Every value below is copied verbatim from disk — nothing is rounded or inferred.
Report of what IS, not what should be.

Status: PART 1 complete (styles.css). Parts 2-6 appended below as each source is read.

---

## 1 · Colors

### 1.1 The `:root` block, verbatim (`styles.css:13-42`)

| Token | Value | Author's inline comment |
| --- | --- | --- |
| `--bg` | `#fff7fb` | soft pink-tinted white |
| `--surface` | `#ffffff` | app surface |
| `--text` | `#3a2f37` | deep plum-grey |
| `--text-soft` | `#736570` | muted mauve-grey — darkened to meet WCAG AA (≈5.5:1 on white) |
| `--accent` | `#e23e7a` | vivid rose-pink |
| `--accent-dark` | `#c62368` | — |
| `--accent-soft` | `#fde7f0` | pink wash |
| `--c-pink` | `#e23e7a` | (festive palette) |
| `--c-orange` | `#ff7a3d` | marigold |
| `--c-gold` | `#f5b301` | — |
| `--c-teal` | `#12b3a3` | — |
| `--c-purple` | `#8b5cf6` | — |
| `--c-blue` | `#3b9ae1` | — |
| `--c-red` | `#ef4d5a` | — |
| `--c-green` | `#2bb673` | — |
| `--grad` | `linear-gradient(135deg, #e23e7a 0%, #ff7a3d 100%)` | pink → marigold |
| `--border` | `#f4e3ec` | hairline |
| `--shadow` | `0 4px 16px rgba(180, 50, 110, 0.08)` | — |
| `--app-w` | `430px` | phone frame width |
| `--font-head` | `'Playfair Display', Georgia, 'Times New Roman', serif` | Display serif for headings; body stays the system sans |

19 custom properties. `--c-pink` and `--accent` are the **same hex** (`#e23e7a`) — two names, one colour.

### 1.2 Grouped by role

- **Brand / accent** — `--accent` `#e23e7a`, `--accent-dark` `#c62368`, `--accent-soft` `#fde7f0`, `--grad`.
- **Surface** — `--bg` `#fff7fb` (app canvas), `--surface` `#ffffff` (cards, bars).
- **Text** — `--text` `#3a2f37`, `--text-soft` `#736570`.
- **Border** — `--border` `#f4e3ec` (single hairline value; also reused as a *disabled fill* and as an
  *off-state star colour*, see below).
- **Elevation** — `--shadow` (one token; ten more shadows are written raw, §3.3).
- **Semantic / festive** — the eight `--c-*` hues. They are not named semantically in the token block;
  semantics are attached at the use site (`--c-green` = verified/available/confirmed,
  `--c-red` = required/booked/remove, `--c-gold` = stars/top-rated/pending).
- **Layout** — `--app-w` `430px`.
- **Type** — `--font-head`.

### 1.3 Local (component-scoped) custom properties

These are declared *outside* `:root`, as per-component slots with a fallback:

| Var | Fallback | Set by | Purpose |
| --- | --- | --- | --- |
| `--cc` | `var(--accent)` | `.cat:nth-child(1..8)`, `.step:nth-child(1..4)` | per-category / per-step hue |
| `--bc` | `var(--accent)` | `.vbadge-verified/-top/-booked/-premium/-quick` | badge hue |
| `--mc` | `var(--accent)` | dashboard metric cards (set in HTML) | metric icon hue |
| `--rc` | `var(--accent)` | `.rec-head`, `.rec-dot` (set in HTML) | recommendation row hue |
| `--sc` | (none) | `.svc-chip.on` (set in HTML) | service-chip hue |
| `--n` | `2` | `.cmp-grid` | compare-table column count |

Category → hue map (`styles.css:309-316`): 1 green, 2 orange, 3 pink, 4 blue, 5 red, 6 purple,
7 teal, 8 gold. Step → hue map (`styles.css:590-593`): 1 orange, 2 pink, 3 purple, 4 teal.

### 1.4 Token usage counts (`grep -o "var(--X[,)]"`)

| Token | in styles.css | in *.html |
| --- | --- | --- |
| `--accent` | 56 | 36 |
| `--text-soft` | 49 | 21 |
| `--border` | 46 | 25 |
| `--text` | 33 | 14 |
| `--surface` | 27 | 20 |
| `--accent-dark` | 27 | 4 |
| `--accent-soft` | 20 | 9 |
| `--c-green` | 15 | 3 |
| `--shadow` | 12 | 6 |
| `--bg` | 11 | 6 |
| `--grad` | 10 | 2 |
| `--c-red` | 7 | 5 |
| `--c-gold` | 6 | 0 |
| `--c-orange` | 3 | 5 |
| `--c-purple` | 3 | 4 |
| `--c-pink` | 2 | 7 |
| `--c-teal` | 2 | 1 |
| `--c-blue` | 2 | 5 |
| `--app-w` | 2 | 0 |
| `--font-head` | 1 | 0 |

Every token is used. Nothing in `:root` is dead.

### 1.5 Colors used in rules but NOT tokenized

Raw literals appear 100+ times. Ranked by count:

**Opaque hex**
- `#fff` — 45 occurrences (button faces, on-accent text, gradient-wash second stop in every
  `color-mix(... , #fff)`).
- `#e23e7a` — 3 raw uses: `body` is not one; it is the `.field select` chevron data-URI
  (`stroke='%23e23e7a'`, `styles.css:674`) plus the `--accent`/`--c-pink` declarations themselves.
- `#ff7a3d` — 2 (the `--c-orange`/`--grad` declarations).
- `#25d366` — 2, **WhatsApp brand green**, `.contact-btn.wa` background + border. Never tokenized.
- `#b07d00` — 1, `.status.pending` text (a dark gold that is not `--c-gold`).
- `#1c8a55` — 1, `.cal-cell.avail` text (a dark green that is not `--c-green`).
- `#c4313d` — 1, `.cal-cell.booked` text (a dark red that is not `--c-red`).
- `#000` — 1, inside `color-mix(in srgb, var(--bc) 72%, #000)` for `.vbadge` label colour.

**Untokenized desktop backdrop gradient** (`styles.css:51`) —
`linear-gradient(135deg, #fbe7dd 0%, #fad8e6 45%, #e8defb 100%)`. Three colours
(`#fbe7dd` peach, `#fad8e6` pink, `#e8defb` lilac) that exist nowhere else and have no token.

**Raw rgba shadows / scrims** (all untokenized)
- Brand-tinted elevation: `rgba(180, 50, 110, …)` at `.08` (the `--shadow` token itself), `.05` ×2
  (appbar, tabbar), `.04` (desktop tabbar), `.12` (`.step:hover`), `.15` (`.vcard:hover`),
  `.16` (`.cat:hover`).
- Accent glow: `rgba(226, 62, 122, …)` at `.16 .28 .30 ×3 .32 .35` (promo hover, hero, loc-pill /
  promo-ico / vcard-btn, btn-block, auth-logo).
- Hero overlay: `rgba(226, 62, 122, 0.82)` → `rgba(226, 62, 122, 0.58)` → `rgba(255, 122, 61, 0.38)`.
- Hero text shadows: `rgba(45, 12, 30, 0.42)` (h1), `rgba(45, 12, 30, 0.38)` (p).
- Image-caption scrims: `linear-gradient(to top, rgba(20, 10, 15, 0.85|0.82), rgba(20, 10, 15, 0))`.
- Neutral overlays: `rgba(40, 25, 35, 0.5)` (modal overlay), `.3` (desktop modal shadow), `.18`
  (cmp-tray), `.16` (city-menu); `rgba(70, 50, 45, 0.22)` (device frame shadow);
  `rgba(15, 8, 12, 0.92)` (lightbox); `rgba(0, 0, 0, 0.5|0.45|0.25|0.2)`.
- Glassy chips: `rgba(255, 255, 255, 0.92)` ×3, `rgba(255, 255, 255, 0.16)` (lb-close),
  `rgba(255,255,255,0.6)` (device frame border — note: no spaces, inconsistent formatting).
- Calendar tints written as raw rgba of the token hues rather than `color-mix`:
  `rgba(43, 182, 115, 0.14)` = `--c-green` @14%, `rgba(239, 77, 90, 0.14)` = `--c-red` @14%.

### 1.6 `color-mix` is the tint mechanism

Wherever a soft tint of a hue is needed the site uses `color-mix(in srgb, <hue> N%, #fff)` rather
than a token. The recurring percentages: **7%** (`.rec-head` background), **9%** (`.svc-chip.on`),
**14%** (`.vbadge` bg, `.cmp-best`, `.rec-av--yes/no`, `.badge-verified`), **15%**
(`.status.confirmed`), **18%** (`.status.pending`), **20%** (`.promo` border), **22%**
(`.amenity--spec` border), **26%** (`.vbadge` border), **45%** (`.svc-chip.on` border, mixed against
`--border` not white), **72%** (`.vbadge` text, mixed against `#000`), **35%** (icon glow shadows,
mixed against `transparent`).

### 1.7 Brand assets

- `favicon.svg` — `<rect rx="7" fill="#e23e7a"/>` + a white heart path. Two colours: `#e23e7a`, `#fff`.
- `site.webmanifest` — `"background_color": "#fff7fb"` (= `--bg`), `"theme_color": "#e23e7a"`
  (= `--accent`), `display: standalone`, name `Vivah Spot — Wedding Services Marketplace`.

---

## 2 · Typography

### 2.1 Families

**Declared and loaded:** exactly one webfont.

```
@font-face {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400 900;          /* variable */
  font-display: swap;
  src: url('fonts/playfair-display.woff2') format('woff2');
}
```

`fonts/` contains a single file: `playfair-display.woff2` (38,404 bytes). It is a **variable** font,
axis 400–900, self-hosted, preloaded from `index.html:10`:

```html
<link rel="preload" href="/fonts/playfair-display.woff2" as="font" type="font/woff2" crossorigin />
```

No `fonts.googleapis.com` link exists anywhere — the comment on line 1 says so explicitly
("self-hosted, no third-party requests").

**Body stack** (`body`, `styles.css:47`):
`"Segoe UI", system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif` — pure system sans,
zero network cost.

**Head stack** (`--font-head`): `'Playfair Display', Georgia, 'Times New Roman', serif`.

**Where the serif is applied** — one selector list only (`styles.css:61`):
`h1, h2, .brand-name, .auth-title, .page-title`. `h3`, `h4`, card titles and every body element stay
on the system sans. Form controls, chips and buttons force `font-family: inherit` (8 occurrences) so
the sans propagates into native widgets.

### 2.2 Size ramp — every value used, exact

Base `1rem` = 16px browser default; nothing resets `html { font-size }`.

| rem | ≈px | Used by (representative) | Count |
| --- | --- | --- | --- |
| `clamp(2.4rem, 3.4vw, 3.6rem)` | 38.4–57.6 | `.hero h1` @≥1024px | 1 |
| `clamp(2rem, 3vw, 3.2rem)` | 32–51.2 | `.hero h1` @≥768px | 1 |
| `2.1rem` | 33.6 | `.step-no` (ghost numeral, opacity .15) | 1 |
| `1.7rem` | 27.2 | `.hero h1` (mobile), `.star-input .star` | 2 |
| `1.6rem` | 25.6 | `.profile-avatar` initial | 1 |
| `1.5rem` | 24 | `.dash-card strong`, `.vendor-intro h1`, `.lb-close` | 3 |
| `1.45rem` | 23.2 | `.auth-title` | 1 |
| `1.4rem` | 22.4 | `.brand-name`, `.bp-intro h1`, `.detail-head h1` | 3 |
| `1.25rem` | 20 | `.profile-head h1` | 1 |
| `1.2rem` | 19.2 | `.section-head h2`, `.results-head h1`, `.stat strong` | 3 |
| `1.15rem` | 18.4 | `.detail-section h2`, `.modal h3` | 2 |
| `1.1rem` | 17.6 | `.detail-rating strong`, `.bb-price strong`, `.cmp-empty`, `.cal-arrow`, `.register-card h2` | 6 |
| `1.05rem` | 16.8 | `.vcard-body h3`, `.vcard-price`, `.pkg-price`, `.promo-text h3`, `.bp-stat strong`, `.empty h3`, `.page-title`, `.lb-figure figcaption strong` | 9 |
| `1rem` | 16 | `.btn-lg` | 1 |
| `0.98rem` | 15.68 | `.step h4`, `.form-section h3`, `.pkg-top h4` | 3 |
| `0.95rem` | 15.2 | `.btn-block`, `.list-row h4`, `.cal-title`, `.search input` @≥768px | 4 |
| `0.92rem` | 14.72 | `.menu-item`, `.rec-v-info strong`, `#rev-form textarea` | 3 |
| `0.9rem` | 14.4 | `.search input`, `.field input/select/textarea`, `.register-form input`, `.bp-intro p`, `.hero p`, `.rec-svc`, `.rec-amt`, `.bp-amt`, `.about-text`, `.review-avatar`, `.tab` @≥768px | 11 |
| `0.88rem` | 14.08 | `.btn`, `.auth-sub`, `.detail-section p`, `.vendor-intro p`, `.contact-btn` | 6 |
| `0.85rem` | 13.6 | `.city-opt`, `.toast`, `.review-name`, `.empty p`, `.register-card > p`, `.input-prefix span`, `.skip-link`, `.lb-browse`, `.reviews-avg`, `.check a` region | 10 |
| `0.82rem` | 13.12 | `.detail-meta`, `.promo-text p`, `.promo-cta`, `.pkg-features li`, `.review p`, `.modal-sub`, `.dash-muted`, `.rec-none`, `.file-drop`, `.insp-cap`, `.cmp-go`, `.cmp-view`, `.step p`, `.rec-none a` | 14 |
| `0.8rem` | 12.8 | `.link-more`, `.chip`, `.amenity`, `.svc-chip`, `.check`, `.vendor-cta`, `.results-count`, `.cmp-rowlabel/cell`, `.cmp-name`, `.funnel-val`, `.cal-cell`, `.vcard-btn`, `.lb-figure figcaption > span` | 13 |
| `0.78rem` | 12.48 | `.loc-pill`, `.auth-divider`, `.sec-no`, `.field label`, `.form-aside a`, `.cmp-clear`, `.cmp-stars`, `.funnel-label`, `.list-row p`, `.vcard-meta`, `.rec-more`, `.cal-legend` | 12 |
| `0.76rem` | 12.16 | `.bp-note`, `.rec-v-meta` | 2 |
| `0.75rem` | 12 | `.rating`, `.foot p` | 2 |
| `0.74rem` | 11.84 | `.dash-label` | 1 |
| `0.72rem` | 11.52 | `.cat-label`, `.stat span`, `.review-stars`, `.badge-verified`, `.cmp-rowlabel`, `.cmp-services li`, `.bp-label small`, `.vcard-price small`, `.foot-credit` | 9 |
| `0.7rem` | 11.2 | `.hint`, `.page-sub`, `.bp-stat span`, `.cmp-cell small`, `.bb-price`, `.status`, `.cal-dow` | 7 |
| `0.68rem` | 10.88 | `.vcard-tag` | 1 |
| `0.66rem` | 10.56 | `.brand-tagline`, `.vbadge`, `.vcard-cmp`, `.rec-amt small`, `.rec-av`, `.bp-amt small` | 6 |
| `0.65rem` | 10.4 | `.review-you` | 1 |
| `0.64rem` | 10.24 | `.tab` (mobile) | 1 |
| `0.62rem` | 9.92 | `.detail-rating span` | 1 |
| `0.6rem` | 9.6 | `.insp-tag`, `.cmp-best` | 2 |
| `12px` | 12 | `.cmp-col-remove` glyph | 1 |
| `10px` | 10 | `.cmp-remove` glyph | 1 |

37 distinct sizes. **No modular scale** — the ramp is hand-tuned in 0.02rem steps in the small end
(0.6 / 0.62 / 0.64 / 0.65 / 0.66 / 0.68 / 0.7 / 0.72 / 0.74 / 0.75 / 0.76 / 0.78 / 0.8 / 0.82).
Densest band: **0.66rem–0.9rem**, which is where most of the interface lives.

### 2.3 Weights

Only four values appear, and **`400`/`500` are never written**:

| Weight | Count | Meaning in this system |
| --- | --- | --- |
| `600` | 20 | de-emphasised labels, hints, meta, secondary links |
| `700` | 42 | default emphasis — buttons, card titles, labels, chips |
| `800` | 33 | section heads, stats, prices, numerals, `h1`-class display |
| `400 900` | 1 | the Playfair variable-font axis declaration |

Body text runs at the browser default (`400`) because nothing declares it.

### 2.4 Line-heights

| Value | Count | Where |
| --- | --- | --- |
| `1.5` | 5 | `body` global, `.dash-muted`, `.review p`, `.bp-note`, `.rec-none` |
| `1.55` | 1 | `.detail-section p` (longest prose block) |
| `1.45` | 1 | `.step p` |
| `1.3` | 1 | `.cmp-services li` |
| `1.2` | 2 | `.vcard-body h3`, `.rec-v-info strong` |
| `1.16` | 1 | `h1, h2` global |
| `1.15` | 6 | `.appbar-brand`, `.hero h1`, `.cat-label`, `.detail-head h1`, `.cmp-name`, `.bp-amt` |
| `1.1` | 2 | `.page-title`, `.bp-stat strong` |
| `1.05` | 1 | `.brand-name` |
| `1` | 8 | icon-adjacent numerals and glyph buttons (`.vbadge`, `.dash-card strong`, `.step-no`, `.lb-close`, `.cal-arrow`, `.cmp-remove`, `.cmp-col-remove`, `.star`) |

Rule of thumb the code follows: prose 1.45–1.55, headings 1.05–1.2, glyphs 1.

### 2.5 Letter-spacing

Three declarations only:

| Value | Selector |
| --- | --- |
| `-0.005em` | `h1, h2, .brand-name, .auth-title, .page-title` (the serif set) |
| `-0.01em` | `.brand-name`, `.bp-intro h1` (tighter override) |
| `0.05em` | `.insp-tag` (uppercase micro-label, paired with `text-transform: uppercase`) |

`text-transform: uppercase` appears exactly once, on `.insp-tag`.

---

## 3 · Radii, spacing, shadows, borders, motion

### 3.1 Radii

Only `--app-w` is a dimensional token; **radii are not tokenized**. Every literal in use:

| Radius | Count | Role |
| --- | --- | --- |
| `999px` | 18 | pills — chips, badges, status, loc-pill, bars, desktop tabs |
| `50%` | 11 | circles — avatars, fav button, dots, cal arrows |
| `28px` | 1 | `.app` device frame @≥480px |
| `24px` | 1 | `.hero` @≥1024px |
| `22px` | 2 | `.hero` @≥768px; `.modal` (`22px 22px 0 0` sheet) |
| `20px` | 3 | `.auth-logo`, `.empty-ico`, `.modal` @≥1024px |
| `18px` | 4 | `.hero`, `.vcard`, `.register-card`, `.promo` |
| `16px` | 10 | `.cmp-tray`, `.dash-card`, `.bp-stat`, `.step`, `.stat`, `.form-section`, `.rec`, `.cat`, `.gallery-main`, `.cal` |
| `14px` | 9 | `.cmp-grid`, `.insp-item`, `.promo-ico`, `.step-ico`, `.pkg`, `.review`, `.list-row`, `.lb-figure img`, `.tab` |
| `12px` | 10 | `.city-menu`, `.search input`, `.insp-s`, `.rec-vendor img`, `.bp-row`, `.detail-rating`, `.toast`, `.contact-btn`, `.review-photo`, `#rev-form textarea` |
| `10px` | 9 | `.back-btn`, `.btn`, `.cmp-thumb`, `.dash-ico`, `.field input/select/textarea`, `.register-form input`, `.gallery-thumbs img`, `.list-row img`, `.input-prefix` (split) |
| `9px` | 2 | `.vcard-btn`, `.cal-cell` |
| `8px` | 3 | `.city-opt`, `.rating`, `.cmp-photo` |
| `4px` | 2 | `.section-head h2::before`, `.modal-handle` |
| `3px` | 1 | `.cal-legend .cdot` |

Legible pattern: **big containers 16–18px, inner elements 10–14px, everything interactive-and-small
is a 999px pill or a 50% circle**.

### 3.2 Spacing

Also untokenized. Padding/gap/margin are rem values on a de-facto 0.05rem grid. The gutter that
repeats structurally is **`1.1rem`** (`.appbar` and `.screen` horizontal padding, and the `.bookbar`).
Common gaps: `0.3rem 0.4rem 0.5rem 0.6rem 0.7rem 0.85rem 1rem`. Grid gaps: `.cat-grid 0.7rem`,
`.cards 1rem`, `.steps 0.85rem`, `.rail 0.8rem`.

Safe-area handling is explicit and repeated three times:
`calc(0.4rem + env(safe-area-inset-bottom))` (`.tabbar`),
`calc(0.7rem + env(safe-area-inset-bottom))` (`.bookbar`),
`calc(1.25rem + env(safe-area-inset-bottom))` (`.modal`),
plus `bottom: calc(62px + env(safe-area-inset-bottom, 0px))` (`.cmp-tray`).

Container widths: `--app-w: 430px`; `.auth` 340px; `.cal` 340px; `.lb-figure` 560px;
`.search` 560px @≥1024; `.register-card/.vendor-form/.vendor-intro` 640px @≥768;
`.screen-narrow` 880px; `.screen` 1240px @≥1024 → 1320px @≥1500; prose `72ch`/`52ch`/`46ch`.

### 3.3 Shadows

One token, eleven raw. Full inventory:

| Value | Where |
| --- | --- |
| `--shadow` = `0 4px 16px rgba(180, 50, 110, 0.08)` | cards, chips, inputs, stats (12 uses) |
| `0 2px 12px rgba(180, 50, 110, 0.05)` | `.appbar` |
| `0 -2px 14px rgba(180, 50, 110, 0.05)` | `.tabbar` |
| `0 4px 12px rgba(180, 50, 110, 0.04)` | `.tabbar` @≥1024 |
| `0 12px 24px rgba(180, 50, 110, 0.16)` | `.cat:hover` |
| `0 14px 28px rgba(180, 50, 110, 0.15)` | `.vcard:hover` |
| `0 12px 24px rgba(180, 50, 110, 0.12)` | `.step:hover` |
| `0 3px 10px rgba(226, 62, 122, 0.3)` | `.loc-pill` |
| `0 6px 16px rgba(226, 62, 122, 0.3)` | `.promo-ico` |
| `0 4px 12px rgba(226, 62, 122, 0.3)` | `.vcard-btn` |
| `0 6px 16px rgba(226, 62, 122, 0.32)` | `.btn-block` |
| `0 8px 20px rgba(226, 62, 122, 0.35)` | `.auth-logo` |
| `0 10px 24px rgba(226, 62, 122, 0.28)` | `.hero` |
| `0 10px 24px rgba(226, 62, 122, 0.16)` | `.promo:hover` |
| `0 12px 30px rgba(40, 25, 35, 0.16)` | `.city-menu` |
| `0 12px 30px rgba(40, 25, 35, 0.18)` | `.cmp-tray` |
| `0 24px 60px rgba(40, 25, 35, 0.3)` | `.modal` @≥1024 |
| `0 20px 60px rgba(70, 50, 45, 0.22)` | `.app` device frame @≥480 |
| `0 20px 50px rgba(0, 0, 0, 0.5)` | `.lb-figure img` |
| `0 8px 24px rgba(0,0,0,0.25)` | `.toast` |
| `0 2px 8px rgba(0, 0, 0, 0.2)` | `.rating` |
| `0 1px 0 var(--border)` | `.appbar` @≥1024 (hairline, not a shadow) |
| `0 0 0 3px var(--accent-soft)` | focus ring — `.search input:focus`, `.field *:focus` |
| `0 0 0 4px var(--accent-soft)` | focus ring — `#rev-form textarea:focus` (inconsistent with the 3px above) |
| `0 6px 14px color-mix(in srgb, var(--cc) 35%, transparent)` | `.step-ico` |
| `0 4px 10px color-mix(in srgb, var(--mc) 35%, transparent)` | `.dash-ico` |

Elevation grammar: **pink-tinted** (`rgba(180,50,110,…)`) for resting surfaces,
**accent-glow** (`rgba(226,62,122,…)`) for anything painted in the brand colour,
**neutral plum** (`rgba(40,25,35,…)`) for overlays/menus that float above everything.

### 3.4 Borders

Widths used: `1px` (default hairline, ~30 uses, always `var(--border)`), `1.5px`
(`.svc-chip`, `.contact-btn`, `.file-drop` dashed, `.cmp-remove` ring), `2px` (`.gallery-thumbs img`
transparent → `--accent` on active), `4px` (`.cat::after` top accent, `.rec-head` left rule,
`.section-head h2::before` bar). Dashed appears twice: `.file-drop` (`1.5px dashed var(--accent)`)
and `.cmp-thumb.cmp-empty` (`border-style: dashed`).

Focus is explicit and global: `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }`
plus a `.skip-link` that is off-canvas at `left: -999px` until focused.

### 3.5 Motion

**Durations in use:** `0.1s 0.12s 0.15s 0.18s 0.2s 0.25s 0.28s 0.35s 0.4s 0.5s 0.6s 1.2s 6s`.

**Easings:** `ease` is the overwhelming default; `cubic-bezier(0.22, 1, 0.36, 1)` (a decel/back-out
curve) is the "expressive" curve, used 4×: `.cmp-tray` slide, `.modal` sheet slide, `.funnel-fill`
width, `.reveal` entrance.

Named motions:
- Press feedback — `transform: translateY(1px)` (`.btn:active`, `.contact-btn:active`) or
  `scale(0.96 | 0.98 | 0.995)` (`.vcard-cmp`, `.cat`, `.vcard`, `.bp-row`).
- Lift on hover — `translateY(-3px)` (`.cat`, `.vcard`, `.step`), `-2px` (`.promo`), `-1px` (`.list-row`).
- Image zoom on hover — `scale(1.06 | 1.07 | 1.08)` over `0.35s`/`0.4s`.
- Hero Ken Burns — `.hero-slide` `opacity 1.2s ease, transform 6s ease`, `scale(1.05)` → `scale(1.12)`
  when `.active`.
- Scroll reveal — `.reveal { opacity:0; transform: translateY(18px) }` → `.reveal.in`, `0.6s`.
  JS adds the class, so content is visible without JS.
- Reduced motion is honoured globally:
  `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }`

---

## 4 · Breakpoints

Five `@media` blocks total, all `min-width` (mobile-first), plus one preference query.

| Threshold | What changes |
| --- | --- |
| `480px` | `.app` becomes a floating device: `border-radius: 28px`, `min-height/height: min(900px, calc(100vh - 48px))`, `box-shadow: 0 20px 60px rgba(70,50,45,0.22)`, `border: 1px solid rgba(255,255,255,0.6)`; `body { padding: 24px 0; align-items: center }` |
| `768px` | Frame drops (`max-width: none`, full-bleed, no radius/shadow). Tab bar reorders from bottom bar → **top nav strip** (`order: 1`, pills, horizontal). Gutters become `clamp(1.5rem, 4vw, 5rem)`. Hero `padding: clamp(2rem, 4vw, 4.5rem)`, `h1: clamp(2rem, 3vw, 3.2rem)`. Grids go `auto-fit`. |
| `1024px` | Real website mode. `html/body` release `overflow` so document scroll + `position: sticky` work (a comment explains this explicitly). Two-row sticky header: `.appbar` `height: 66px` `top: 0` `z-index: 30`; `.tabbar` `top: 66px` `z-index: 29`. `.screen` `max-width: 1240px`, centred. `.hero` `padding: clamp(3rem, 5vw, 5.5rem)`, `h1: clamp(2.4rem, 3.4vw, 3.6rem)`. Modal becomes a centred dialog (`max-width: 460px`). Footer gets a top border. |
| `1500px` | `.screen { max-width: 1320px }` — one rule. |
| `prefers-reduced-motion: reduce` | Kills all animation/transition/smooth-scroll. |

The responsive block sits **last in the file on purpose** — comment at line 746:
"placed LAST so they correctly override the component defaults above".

Stacking order is deliberate and documented: `.tabbar` z-10, `.appbar` z-20 (so the city dropdown
escapes the nav strip), desktop `.appbar` z-30 / `.tabbar` z-29, `.city-menu` z-40, `.modal-overlay`
z-50, `.cmp-tray`/`.toast` z-60, `.lightbox` z-80, `.skip-link` z-100.

---

## 5 · Dark mode

**It does not exist.** Verified by grep across `styles.css`:

- No `prefers-color-scheme` query anywhere in the file (the only preference query is
  `prefers-reduced-motion`).
- No `.dark` / `[data-theme]` selector.
- No `color-scheme` property.
- `:root` is declared exactly once and never re-declared under any condition.

`site.webmanifest` commits to light: `"background_color": "#fff7fb"`, `"theme_color": "#e23e7a"`.

The palette is single-mode by construction — `--surface` is literally `#ffffff` and roughly forty
`color-mix(…, #fff)` calls and forty-five raw `#fff` literals bake white in at the use site, so the
design cannot be inverted by swapping `:root` alone.


---

## 6 · The mirror sources (what the monorepo actually holds)

### 6.1 `packages/shared/src/tokens.js` (126 lines) — declared canonical

Header says: *"THE single source of truth for colour and type. Mirrors the `:root` custom properties
in the prototype's `styles.css`, which is the design spec for both clients."* Plain ESM `.js` because
Tailwind configs execute in Node.

Seven named exports plus a `tokens` barrel:

- `colors` — `bg #fff7fb`, `surface #ffffff`, `text #3a2f37`, `textSoft #736570`, `accent #e23e7a`,
  `accentDark #c62368`, `accentSoft #fde7f0`, `border #f4e3ec` (8 keys, camelCase).
- `festive` — `pink #e23e7a`, `orange #ff7a3d`, `gold #f5b301`, `teal #12b3a3`, `purple #8b5cf6`,
  `blue #3b9ae1`, `red #ef4d5a`, `green #2bb673` (8 keys).
- `gradient` — `css: 'linear-gradient(135deg, #e23e7a 0%, #ff7a3d 100%)'`,
  `stops: ['#e23e7a', '#ff7a3d']`, `start: {x:0,y:0}`, `end: {x:1,y:1}` (RN has no CSS gradients).
- `radius` — `sm: 8, md: 12, lg: 16, xl: 24, pill: 999` (**numbers, unitless — RN convention**).
- `shadow` — `css: '0 4px 16px rgba(180, 50, 110, 0.08)'` plus a `native` object:
  `shadowColor: '#b4326e'`, `shadowOffset: {0,4}`, `shadowOpacity: 0.08`, `shadowRadius: 16`,
  `elevation: 3`. **`#b4326e` is `rgb(180,50,110)` promoted to a hex — a colour that appears nowhere
  in `styles.css` as a hex.**
- `fonts` — `heading: "'Playfair Display', Georgia, 'Times New Roman', serif"`,
  `headingFamily: 'Playfair Display'`, `body: '"Segoe UI", system-ui, -apple-system, Roboto,
  Helvetica, Arial, sans-serif'`. A doc-comment flags that RN cannot load woff2 and needs a
  `.ttf`/`.otf` cut via `expo-font`.
- `tailwindColors` — flat kebab map. **Renames `festive.orange` → `marigold`** and flattens the
  eight festive hues to bare names (`pink`, `gold`, `teal`, `purple`, `blue`, `red`, `green`).

### 6.2 `packages/shared/src/tokens.css` (45 lines) — Tailwind 4 `@theme` for vendor-web

Header: *"`tokens.js` remains canonical — if you change a colour, change it there first, then mirror
it here. Only the colour/font values are duplicated; nothing else."* It is a hand-copy, not generated.

Contains 16 `--color-*` (the 8 core + 8 festive, festive orange again renamed `--color-marigold`),
5 `--radius-*` (`8px 12px 16px 24px 999px` — same numbers as `tokens.js`, with units),
and 2 font vars: `--font-heading: var(--font-playfair), Georgia, 'Times New Roman', serif` and
`--font-sans: 'Segoe UI', system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif`.

`--font-playfair` is injected by `next/font/google` in `apps/vendor-web/src/app/layout.tsx`
(`Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" })`) — so
vendor-web self-hosts Playfair at build time rather than reusing the prototype's woff2.

`apps/vendor-web/src/app/globals.css` is the only other vendor-web style file, 15 lines:
`@import "tailwindcss"; @import "@vivahspot/shared/tokens.css";` then `body { background:
var(--color-bg); color: var(--color-text); font-family: var(--font-sans) }` and
`h1, h2 { font-family: var(--font-heading); letter-spacing: -0.005em; line-height: 1.16 }` —
a faithful port of the prototype's two heading rules.

**There is no `@theme` file inside `apps/vendor-web`.** The Tailwind 4 theme lives entirely in
`packages/shared/src/tokens.css`, imported. No hardcoded hex exists anywhere in `apps/vendor-web/src`.

### 6.3 `apps/mobile/tailwind.config.js` — Tailwind 3 + NativeWind 4

Consumes the shared tokens correctly and hardcodes nothing:

```js
const { tailwindColors, fonts, radius } = require('@vivahspot/shared/tokens');
...
colors: tailwindColors,
borderRadius: { sm: `${radius.sm}px`, md: ..., pill: `${radius.pill}px` },
fontFamily: { heading: [fonts.headingFamily] },
```

`apps/mobile/src/global.css` is the three `@tailwind` directives, nothing else.

### 6.4 `apps/mobile/src/constants/theme.ts` (65 lines) — **the Expo starter template, unmodified**

Its own header still reads *"Below are the colors that are used in the app… For example,
[Nativewind]…"* — the boilerplate comment. It contains **no Vivah Spot colour at all**:

```ts
export const Colors = {
  light: { text:'#000000', background:'#ffffff', backgroundElement:'#F0F0F3',
           backgroundSelected:'#E0E1E6', textSecondary:'#60646C' },
  dark:  { text:'#ffffff', background:'#000000', backgroundElement:'#212225',
           backgroundSelected:'#2E3135', textSecondary:'#B0B4BA' },
} as const;
```

It also defines `Fonts` (a `Platform.select` of `system-ui`/`ui-serif`/`ui-rounded`/`ui-monospace`,
web branch pointing at `var(--font-display)` etc. — **variables that are defined nowhere in this
repo**), `Spacing = { half:2, one:4, two:8, three:16, four:24, five:32, six:64 }`,
`BottomTabInset = Platform.select({ ios: 50, android: 80 })`, `MaxContentWidth = 800`.

This file is **live, not dead**. It is imported by `themed-text.tsx`, `themed-view.tsx`,
`app-tabs.tsx`, `app-tabs.web.tsx`, `collapsible.tsx`, `hint-row.tsx`, `web-badge.tsx` and
`app/explore.tsx` (via `useTheme()`). So the Explore tab and the tab bar render in Expo-template
black/white/grey while `app/index.tsx` — the only screen ported from the prototype — renders in the
brand palette via `className="bg-bg"` NativeWind utilities plus a direct
`import { colors, shadow } from '@vivahspot/shared/tokens'`.

Other unbranded hexes live in mobile source: `themed-text.tsx:66 '#3c87f7'` (link blue),
`animated-icon.tsx` `#3C9FFE`/`#0274DF`/`#208AEF`, `animated-icon.module.css`
`linear-gradient(180deg, #3c9ffe, #0274df)` — all Expo template leftovers.

### 6.5 Native app shell config (`apps/mobile/app.json`)

Brand values appear here and are **not** drawn from any token file:
`"userInterfaceStyle": "light"`, `android.adaptiveIcon.backgroundColor: "#fff7fb"` (= `--bg`),
`expo-splash-screen backgroundColor: "#e23e7a"` (= `--accent`), `imageWidth: 76`.

---

## 7 · DIVERGENCE AUDIT

Legend — **theme.ts** = `apps/mobile/src/constants/theme.ts`. "—" means the token has no counterpart
in that file at all.

### 7.1 Colour tokens

| Token | styles.css `:root` | tokens.js | tokens.css | theme.ts | Verdict |
| --- | --- | --- | --- | --- | --- |
| bg | `#fff7fb` | `colors.bg #fff7fb` | `--color-bg #fff7fb` | — | **Match** (3-way). Absent from theme.ts. |
| surface | `#ffffff` | `colors.surface #ffffff` | `--color-surface #ffffff` | — | **Match.** |
| text | `#3a2f37` | `colors.text #3a2f37` | `--color-text #3a2f37` | `light.text #000000` | **Conflict.** theme.ts uses pure black, not the plum-grey. |
| text-soft | `#736570` | `colors.textSoft #736570` | `--color-text-soft #736570` | `light.textSecondary #60646C` | **Conflict.** Different hue *and* the WCAG note does not travel. |
| accent | `#e23e7a` | `colors.accent #e23e7a` | `--color-accent #e23e7a` | — | **Match.** No accent concept in theme.ts. |
| accent-dark | `#c62368` | `colors.accentDark #c62368` | `--color-accent-dark #c62368` | — | **Match.** |
| accent-soft | `#fde7f0` | `colors.accentSoft #fde7f0` | `--color-accent-soft #fde7f0` | — | **Match.** |
| border | `#f4e3ec` | `colors.border #f4e3ec` | `--color-border #f4e3ec` | — | **Match.** |
| c-pink | `#e23e7a` | `festive.pink` / `tailwindColors.pink` | `--color-pink` | — | **Match.** |
| c-orange | `#ff7a3d` | `festive.orange` → **`tailwindColors.marigold`** | **`--color-marigold`** | — | **Name divergence.** Same hex, three names: `--c-orange` / `festive.orange` / `marigold`. |
| c-gold | `#f5b301` | `festive.gold` | `--color-gold` | — | **Match.** |
| c-teal | `#12b3a3` | `festive.teal` | `--color-teal` | — | **Match.** |
| c-purple | `#8b5cf6` | `festive.purple` | `--color-purple` | — | **Match.** |
| c-blue | `#3b9ae1` | `festive.blue` | `--color-blue` | — | **Match.** |
| c-red | `#ef4d5a` | `festive.red` | `--color-red` | — | **Match.** |
| c-green | `#2bb673` | `festive.green` | `--color-green` | — | **Match.** |
| grad | `linear-gradient(135deg, #e23e7a 0%, #ff7a3d 100%)` | `gradient.css` identical + `stops`/`start`/`end` | **absent** | — | **Gap in tokens.css.** vendor-web cannot get the gradient from `@theme`; `page.tsx` imports `gradient.css` from JS instead. |
| shadow | `0 4px 16px rgba(180, 50, 110, 0.08)` | `shadow.css` identical + `shadow.native` (`#b4326e`) | **absent** | — | **Gap in tokens.css.** Also: `#b4326e` exists only in tokens.js. |
| — | *(none)* | — | — | `backgroundElement #F0F0F3`, `backgroundSelected #E0E1E6`, `dark.*` ×5 | **Foreign.** 9 Expo-template colours with no design-spec origin. |
| — | `#25d366` (WhatsApp), `#b07d00`, `#1c8a55`, `#c4313d`, `#fbe7dd`/`#fad8e6`/`#e8defb` | absent | absent | absent | **Untokenized in every file.** 7 real colours the prototype ships that no token file knows about. |

### 7.2 Radius

| Token | styles.css | tokens.js | tokens.css | theme.ts | Verdict |
| --- | --- | --- | --- | --- | --- |
| sm | *no token; `8px` used 3×* | `8` | `8px` | — | Invented downstream — a token that never existed upstream. |
| md | *no token; `12px` used 10×* | `12` | `12px` | — | Invented downstream. |
| lg | *no token; `16px` used 10×* | `16` | `16px` | — | Invented downstream. |
| xl | *no token; `24px` used once (`.hero` @≥1024)* | `24` | `24px` | — | Invented downstream; the prototype's dominant large radius is **18px** (4 uses) and **14px** (9 uses), neither of which has a token. |
| pill | *no token; `999px` used 18×* | `999` | `999px` | — | Invented downstream, and correct. |
| *(missing)* | `9px 10px 14px 18px 20px 22px 28px`, `50%` | absent | absent | — | **7 radii + the circle case have no token.** `10px` (9 uses) and `14px` (9 uses) are the two biggest gaps. |

Units diverge deliberately: `tokens.js` numbers (RN), `tokens.css` px strings,
`tailwind.config.js` re-adds `px` by template literal.

### 7.3 Typography

| Aspect | styles.css | tokens.js | tokens.css | theme.ts | Verdict |
| --- | --- | --- | --- | --- | --- |
| Heading stack | `'Playfair Display', Georgia, 'Times New Roman', serif` | `fonts.heading` — **string-identical** | `--font-heading: var(--font-playfair), Georgia, 'Times New Roman', serif` | `serif: 'ui-serif'` / `'serif'` / `var(--font-serif)` | **Two-way match, one substitution, one conflict.** tokens.css swaps the literal family for a next/font variable — same face, different delivery. theme.ts knows nothing of Playfair. |
| Body stack | `"Segoe UI", system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif` | `fonts.body` — identical | `--font-sans` — identical | `sans: 'system-ui'` / `'normal'` / `var(--font-display)` | **Conflict** in theme.ts; the web branch references `var(--font-display)`, `var(--font-rounded)`, `var(--font-mono)` which are **undefined anywhere in this repo**. |
| Font delivery | self-hosted `fonts/playfair-display.woff2`, variable 400–900, preloaded | doc-comment warns RN needs a ttf/otf via `expo-font` | `next/font/google` self-host at build | n/a | **Three different delivery mechanisms for one typeface.** The mobile `.ttf` does not exist yet — `apps/mobile/assets/` has no font file, so `fontFamily: heading` in the mobile Tailwind config resolves to nothing on device. |
| Size ramp | 37 distinct values | **absent** | **absent** | — | **Total gap.** No file mirrors the type scale. |
| Weights | 600/700/800 | **absent** | **absent** | — | **Total gap.** |
| Line-heights | 10 values | **absent** | `line-height: 1.16` on `h1,h2` in globals.css only | — | **Near-total gap.** |
| Letter-spacing | `-0.005em`, `-0.01em`, `0.05em` | **absent** | `-0.005em` on `h1,h2` in globals.css only | — | **Near-total gap.** |

### 7.4 Everything else

| Aspect | styles.css | mirrored? | Verdict |
| --- | --- | --- | --- |
| `--app-w: 430px` | yes | **no file** | Gap. Mobile has `MaxContentWidth = 800` in theme.ts, unrelated. |
| Spacing scale | rem, ad-hoc, `1.1rem` gutter | `Spacing = {2,4,8,16,24,32,64}` in theme.ts only | **Conflict.** A 4-px-base numeric scale that does not derive from the rem gutters at all. |
| Breakpoints (480/768/1024/1500) | yes | **no file** | Gap. Both apps use their Tailwind defaults (`sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`) — only `768` and `1024` coincide. |
| Motion (durations, `cubic-bezier(0.22,1,0.36,1)`) | yes | **no file** | Gap. |
| Elevation set (21 distinct shadows) | yes | only the single `--shadow` is mirrored | Gap. |
| Border widths (1 / 1.5 / 2 / 4px) | yes | **no file** | Gap. |
| Focus ring (`2px solid accent`, offset 2, `0 0 0 3px accent-soft`) | yes | **no file** | Gap. |
| `color-mix` tint percentages (7/9/14/15/18/20/22/26/35/45/72%) | yes | **no file** | Gap. The clients have no way to reproduce the badge/status tints. |
| Dark mode | **does not exist** | `theme.ts` ships a **full dark palette**; `useColorScheme` reads the OS scheme; `use-color-scheme.web.ts` returns `'light'` pre-hydration | **Direct contradiction.** `app.json` pins `"userInterfaceStyle": "light"`, so the dark branch is reachable in code but suppressed by config. |

### 7.5 Divergence scorecard

Counted as distinct findings, not as cells.

| Severity | Count | Findings |
| --- | --- | --- |
| **Critical — a client renders off-brand today** | 2 | (1) `theme.ts` is the unmodified Expo template and is imported by 8 modules, so `explore.tsx` and both tab bars paint `#000000`/`#ffffff`/`#F0F0F3`/`#60646C` instead of the Vivah Spot palette. (2) `theme.ts` ships a dark mode the design system does not have; only `app.json`'s `userInterfaceStyle: "light"` keeps it off screen. |
| **High — value conflicts between files** | 3 | `text` `#3a2f37` vs `#000000`; `text-soft` `#736570` vs `#60646C` (also loses the WCAG-AA note); body/heading font stacks vs `system-ui`/`ui-serif` + three undefined CSS vars (`--font-display`, `--font-serif`, `--font-rounded`, `--font-mono`). |
| **High — Playfair is unusable on mobile** | 1 | `tailwind.config.js` sets `fontFamily.heading = ['Playfair Display']` but no `.ttf`/`.otf` is present under `apps/mobile/assets/` and no `expo-font` load exists; the token's own comment predicts this. |
| **Medium — present upstream, missing downstream** | 8 | Type ramp (37 sizes), weights, line-heights, letter-spacing, `--app-w`, breakpoints, motion curves/durations, the 20 non-`--shadow` elevations. Also: `gradient` and `shadow` are in `tokens.js` but **not** in `tokens.css`, so vendor-web reaches them only through a JS import. |
| **Medium — invented downstream, no upstream basis** | 2 | The `sm/md/lg/xl/pill` radius scale (`8/12/16/24/999`) exists in no `:root`; the prototype's two most-used radii, `10px` and `14px` (9 uses each) and its card radius `18px`, are absent from it. `Spacing = {2,4,8,16,24,32,64}` likewise has no upstream basis. |
| **Medium — untokenized in the source of truth itself** | 7 | `#25d366` (WhatsApp), `#b07d00`, `#1c8a55`, `#c4313d`, and the desktop backdrop trio `#fbe7dd`/`#fad8e6`/`#e8defb`. Plus ~21 raw `rgba()` shadow/scrim values and 45 raw `#fff`. |
| **Low — naming drift, same value** | 2 | `--c-orange` → `festive.orange` → `marigold` / `--color-marigold` (3 names, one hex). `--accent` and `--c-pink` are the same hex under two names upstream, which propagates as `accent` + `pink`. |
| **Low — derived value that exists only downstream** | 1 | `shadow.native.shadowColor: '#b4326e'` — the hex form of `rgba(180,50,110,…)`, present in `tokens.js` and nowhere else. |

**Totals: 26 distinct divergences — 2 critical, 4 high, 17 medium, 3 low.**

Directionally: `tokens.js` → `tokens.css` → `tailwind.config.js` is a clean, faithful chain for the
**16 colours + gradient + shadow + 5 radii + 2 font stacks** it covers. Everything else in
`styles.css` — the entire type scale, spacing, motion, elevation and breakpoint system — has no
downstream representation, and `apps/mobile/src/constants/theme.ts` is a second, contradictory theme
sitting inside the app that consumes the first.

---

## Appendix A · Asset inventory (filenames only)

**`fonts/`** — 1 file: `playfair-display.woff2` (38,404 B, variable 400–900).

**`images/`** — 22 JPEGs, three naming families:
- `cat-*` (6): `cat-catering.jpg`, `cat-decoration.jpg`, `cat-makeup.jpg`, `cat-music.jpg`,
  `cat-photography.jpg`, `cat-venues.jpg`
- `feat-*` (3): `feat-catering.jpg`, `feat-decor.jpg`, `feat-venue.jpg`
- `insp-*` (12): `insp-bridal-1..3`, `insp-decor-1..3`, `insp-photo-1..3`, `insp-theme-1..3`
- plus `hero.jpg`

**`assets/`** — 1 file: `data.js` (23,979 B). Not an image directory; it holds the mock catalogue.

**Root brand files** — `favicon.svg` (281 B, `#e23e7a` rounded rect `rx=7` + white heart),
`site.webmanifest`, `vivahspot-mobile-home.png` (a 300 KB screenshot, not a shipped asset).

**Fonts loaded over the network: none.** `index.html` has no `fonts.googleapis.com` link; the only
font-related tag is the self-host preload on line 10.
