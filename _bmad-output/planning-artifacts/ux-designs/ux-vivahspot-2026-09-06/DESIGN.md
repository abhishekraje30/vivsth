---
name: Vivah Spot
description: Visual identity for the Vivah Spot family app and vendor portal. The Invitation — a wedding card that fills in as the wedding gets sorted. Kumkum red for the actions, turmeric for the celebration.
status: final
updated: 2026-09-07
sources:
  - styles.css
  - _bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/prd.md
  - ./.memlog.md
  - ./.working/extract-visual-identity.md
  - ./.working/extract-prd.md
  - ./.working/extract-architecture.md
  - ./.working/extract-site-ia.md
  - ./.working/extract-ideation.md
  - 'https://vivahspot.com — the published static site, IA only'
colors:
  ground: '#FFFCF2'
  surface: '#FFFFFF'
  ink: '#2B0A0E'
  muted: '#8C6A50'
  vermillion: '#E01B33'
  turmeric: '#FFC300'
  gold-tint: '#FFEBB0'
  hairline: '#F6E2C2'
  on-vermillion: '#FFFFFF'
  on-turmeric: '#2B0A0E'
  foil: '#FFEB96'
  danger: '#8C2F1A'
  danger-tint: '#F7E4DE'
  shadow-tint: '#BE1E32'
  medallion-start: '#FFE49C'
  medallion-end: '#FFB3AE'
  placeholder-start: '#FFE7A8'
  placeholder-end: '#FFBDB6'
fonts:
  display: 'Playfair Display'
  devanagari: 'Inknut Antiqua'
  system-sans: '"Segoe UI", system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif'
typography:
  display-screen:
    fontFamily: '{fonts.display}'
    fontSize: 1.5rem
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  display-names:
    fontFamily: '{fonts.display}'
    fontSize: 1.35rem
    fontWeight: '400'
    lineHeight: '1.35'
  display-names-devanagari:
    fontFamily: '{fonts.devanagari}'
    fontSize: 1.35rem
    fontWeight: '700'
    lineHeight: '1.35'
  brand-wordmark:
    fontFamily: '{fonts.display}'
    fontSize: 1.04rem
    fontWeight: '400'
    lineHeight: '1.05'
    letterSpacing: 0.01em
  heading-section:
    fontFamily: '{fonts.display}'
    fontSize: 1.06rem
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  title-card:
    fontFamily: '{fonts.display}'
    fontSize: 0.95rem
    fontWeight: '400'
    lineHeight: '1.35'
  title-card-devanagari:
    fontFamily: '{fonts.devanagari}'
    fontSize: 1.05rem
    fontWeight: '500'
    lineHeight: '1.35'
  body:
    fontFamily: '{fonts.system-sans}'
    fontSize: 0.86rem
    fontWeight: '400'
    lineHeight: '1.55'
  body-long:
    fontFamily: '{fonts.system-sans}'
    fontSize: 0.84rem
    fontWeight: '400'
    lineHeight: '1.85'
  body-long-devanagari:
    fontFamily: '{fonts.devanagari}'
    fontSize: 0.94rem
    fontWeight: '400'
    lineHeight: '1.9'
    note: >-
      Carries the Devanagari optical correction (see Typography). Weight 300 is Inknut's Light,
      and at 13.44 CSS px on a density-2.0 Android its thin strokes land on about one device
      pixel, so this role is 400 and never lighter. Never set Vendor Rules below this size.
  review:
    fontFamily: '{fonts.system-sans}'
    fontSize: 0.82rem
    fontWeight: '400'
    lineHeight: '1.8'
  review-devanagari:
    fontFamily: '{fonts.devanagari}'
    fontSize: 0.92rem
    fontWeight: '400'
    lineHeight: '1.85'
  price:
    fontFamily: '{fonts.system-sans}'
    fontSize: 0.88rem
    fontWeight: '700'
    lineHeight: '1.2'
  meta:
    fontFamily: '{fonts.system-sans}'
    fontSize: 0.74rem
    fontWeight: '400'
    lineHeight: '1.4'
  button:
    fontFamily: '{fonts.system-sans}'
    fontSize: 0.78rem
    fontWeight: '700'
    lineHeight: '1'
  eyebrow:
    fontFamily: '{fonts.display}'
    fontSize: 0.72rem
    fontWeight: '400'
    lineHeight: '1.3'
    letterSpacing: 0.16em
  chip:
    fontFamily: '{fonts.system-sans}'
    fontSize: 0.7rem
    fontWeight: '400'
    lineHeight: '1.3'
  chip-devanagari:
    fontFamily: '{fonts.devanagari}'
    fontSize: 0.8rem
    fontWeight: '400'
    lineHeight: '1.3'
  progress-label:
    fontFamily: '{fonts.system-sans}'
    fontSize: 0.68rem
    fontWeight: '400'
    lineHeight: '1.3'
    letterSpacing: 0.06em
  tab:
    fontFamily: '{fonts.system-sans}'
    fontSize: 0.61rem
    fontWeight: '400'
    lineHeight: '1.35'
rounded:
  none: '0'
  sm: 4px
  md: 6px
  circle: 50%
  full: 9999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 24px
  '6': 32px
  '8': 48px
  gutter: 16px
  card-inset: 4px
  phone-column: 430px
elevation:
  '1': '0 2px 9px rgba(190, 30, 50, 0.15)'
  '2': '0 3px 12px rgba(190, 30, 50, 0.15)'
  '3': '0 12px 30px rgba(43, 10, 14, 0.18)'
components:
  invitation-card:
    background: '{colors.surface}'
    border: '1px solid {colors.turmeric}'
    inner-rule: '1px solid {colors.gold-tint} inset {spacing.card-inset}'
    radius: '{rounded.none}'
    padding: '16px 15px 15px'
    shadow: '{elevation.2}'
    names: '{typography.display-names}'
    ampersand-color: '{colors.vermillion}'
    ornament-color: '{colors.turmeric}'
    eyebrow: '{typography.eyebrow}'
    line-color-known: '{colors.ink}'
    line-color-unknown: '{colors.muted}'
    ink-rule: '1px {colors.turmeric}, inset 24% each side'
    foil: 'linear-gradient(105deg, transparent 38%, {colors.foil} at 90% alpha 50%, transparent 62%)'
    progress-track: '{colors.gold-tint}'
    progress-fill: '{colors.turmeric}'
    progress-height: 3px
    progress-label: '{typography.progress-label}'
  button-primary:
    background: '{colors.vermillion}'
    color: '{colors.on-vermillion}'
    radius: '{rounded.none}'
    padding: '8px 14px'
    typography: '{typography.button}'
    min-target: 44px
    pressed: 'opacity 0.88 + scale(0.98)'
  button-celebration:
    background: '{colors.turmeric}'
    color: '{colors.on-turmeric}'
    radius: '{rounded.none}'
    padding: '8px 14px'
    typography: '{typography.button}'
    note: 'Dark ink label only. Never white.'
  vendor-card:
    background: '{colors.surface}'
    border: '1px solid {colors.hairline}'
    radius: '{rounded.md}'
    shadow: '{elevation.1}'
    photo-height: 104px
    photo-placeholder: 'linear-gradient(150deg, {colors.placeholder-start}, {colors.placeholder-end})'
    title: '{typography.title-card}'
    meta: '{typography.meta}'
    meta-color: '{colors.muted}'
    price: '{typography.price}'
    cta: '{components.button-primary}'
    rating-chip: 'white {typography.meta} label on a rgba(0, 0, 0, 0.6) scrim, top-right of the photo band'
    rating-chip-floor: >-
      The scrim alpha is a floor, not a taste. At 0.6 the worst case a photograph can present —
      a pure white pixel — composites to #666666 and white on it is 5.742:1; over the
      placeholder gradient it is 6.610 at the light stop and 7.792 at the dark one. At 0.5 the
      worst case falls to 3.949 and the label fails. Never lighten it.
  chip:
    background: '{colors.gold-tint}'
    border: '1px solid {colors.muted}'
    color: '{colors.ink}'
    radius: '{rounded.full}'
    padding: '4px 10px'
    height: '26px, fixed — sized to {typography.chip-devanagari} so a mixed-script filter row stays even. The visual box is not the tap target; that floor is held separately'
    typography: '{typography.chip}'
    selected-background: '{colors.vermillion}'
    selected-color: '{colors.on-vermillion}'
    selected-glyph: leading check
  search-field:
    background: '{colors.surface}'
    border: '1px solid {colors.muted}'
    radius: '{rounded.none}'
    padding: '{spacing.1} {spacing.1} {spacing.1} {spacing.3}'
    placeholder-color: '{colors.muted}'
    typography: '{typography.body}'
    action: '{components.button-primary}'
    focus-ring: '2px solid {colors.vermillion}, offset 2px — >=3:1 against whatever it sits on'
  category-medallion:
    size: 60px
    radius: '{rounded.circle}'
    fill: 'linear-gradient(160deg, {colors.medallion-start}, {colors.medallion-end})'
    ring: '2px solid {colors.surface}'
    shadow: '{elevation.1}'
    label: '{typography.chip}'
    label-color: '{colors.ink}'
  tab-bar:
    background: '{colors.surface}'
    border-top: '1px solid {colors.hairline}'
    padding: '7px 4px 9px'
    safe-area: 'calc(9px + env(safe-area-inset-bottom))'
    typography: '{typography.tab}'
    rest-color: '{colors.muted}'
    active-color: '{colors.vermillion}'
    active-weight: '600'
    active-indicator: >-
      3px rule above the tab, 20%-80% of the tab width, {colors.vermillion} — 4.801 non-text on
      {colors.surface}. Plus weight 600. Never colour alone. A filled-rather-than-outlined icon
      is permitted as a fourth signal but is not required.
  banner-failure:
    background: '{colors.danger-tint}'
    border: '1px solid {colors.danger}'
    border-left: '4px solid {colors.danger}'
    radius: '{rounded.none}'
    padding: '12px 13px'
    glyph: '22px square, {colors.danger} fill, white mark — always present'
    title: '{typography.title-card}'
    title-color: '{colors.danger}'
    body: '{typography.body}'
    body-color: '{colors.ink}'
    retry: 'button-primary with {colors.danger} background'
    note: 'Never colour alone. The glyph and the sentence carry it; the colour only makes it faster to find.'
  availability-ring:
    size: 16px
    size-large: 40px
    radius: '{rounded.circle}'
    stroke-colour: '{colors.muted} on all three — 4.77:1 on {colors.ground}, the only value here that clears the 3:1 non-text floor'
    free: 'border 2px SOLID {colors.muted}; fill {colors.gold-tint}; icon {colors.ink}'
    taken: 'border 1px SOLID {colors.muted}; fill {colors.surface}; icon {colors.muted}'
    unstated: 'border 1px DASHED {colors.muted}; fill {colors.surface}; icon {colors.muted}'
    separator: 'stroke WIDTH and STYLE — 2px solid / 1px solid / 1px dashed. Never colour, never fill'
    forbidden: >-
      A {colors.turmeric} border is 1.57:1 on {colors.ground} and a {colors.gold-tint} fill is
      1.15:1. Neither is perceivable, so neither may carry the state. The gold-tint fill on the
      free ring is warmth and nothing else; remove it and the state still reads.
    icon: >-
      inline SVG calendar, currentColor, aria-hidden="true" focusable="false". NEVER a Unicode
      glyph. The word beside the ring is what a screen reader announces.
    icon-cut-large: '>=24px — body, two binding tabs, header bar, inner grid line, mark; stroke 1.7'
    icon-cut-small: >-
      <=20px — inner grid REMOVED, stroke 2.4. The grid line is the first thing to alias. Drawn
      at 10x10 inside the 16px ring's 12px inner box, 1px of optical padding each side, so no
      corner sits on the ring stroke; the distinguishing mark BREAKS the body silhouette rather
      than sitting inside it as an interior detail.
    note: >-
      The ring geometry carries the state on its own; the icon is the second signal and the word
      the third. All three survive greyscale, which is the test this component exists to pass.
  skeleton:
    fill: '{colors.hairline}'
    radius: '{rounded.sm}'
    sheen: 'translateX sweep, 1.5s, transform only — never a background-position animation'
    rule: 'Occupies the exact footprint of the content it replaces, so nothing moves on arrival'
    reduced-motion: 'sheen removed, blocks stay'
  calendar-day-bar:
    height: 4px
    width: '70%'
    offset: '3px from the cell foot'
    engaged: 'one solid bar, {colors.vermillion}, the full 70%'
    enquiries-pending: 'TWO countable segments, {colors.vermillion}, 29% each side with a 12% gap'
    unavailable: 'no bar; the date number is struck through'
    contrast: >-
      4.801:1 on {colors.surface} and 4.677:1 on {colors.ground} — the count, never the colour,
      carries the state.
    note: >-
      A count, never a texture, and never a colour. A dashed 3px bar averages into a solid line
      at this size, which collapses engaged and pending into one mark in greyscale. Both bars
      are drawn in one ink so nothing tempts a builder to drop the count. {colors.turmeric} is
      forbidden here on two counts: 1.608:1 on {colors.surface}, and turmeric is the colour of
      the thing being celebrated, never the colour of a thing to tap. The 12% gap is 5.1px at a
      42.58px cell and 4.25px at 35.44px, clear of the width at which two segments average into
      one bar.
    hit-area: >-
      a dedicated overlay element, or ::after reserved for it alone — never shared with a state
      mark, and never wider than the column pitch. Each state mark takes its own element or its
      own gradient stop. The visual box stays dense.
  button-choice:
    background: '{colors.surface}'
    border: '1px solid {colors.muted}'
    color: '{colors.ink}'
    radius: '{rounded.none}'
    min-height: 48px
    width: full
    typography: '{typography.body}'
    focus-ring: '2px solid {colors.vermillion}, offset 2px — >=3:1 against whatever it sits on'
    note: >-
      For a set of EQUAL choices with no primary among them — the Guest RSVP's Yes / No / Not sure.
      Every button in the rest of the system is a primary action; these are peers, so none may be
      filled, pre-selected, or distinguished from its siblings by anything but its label.
  span-card:
    background: '{colors.surface}'
    border: '1px solid {colors.muted}'
    inner-rule: '2px solid {colors.turmeric}, inset {spacing.card-inset} — warmth only, never the only edge'
    radius: '{rounded.md}'
    padding: '12px 11px'
    title: '{typography.title-card}'
    price: '{typography.price}'
    days: 'each day a {components.chip}, listed inside the card'
    section-heading: '"Across the wedding" set in {typography.heading-section}'
    note: >-
      A Span Service appears ONCE, as its own object, never repeated under each Function it serves.
      Lives in the Workspace's "Across the wedding" section above the Functions. The card's SHAPE
      is what carries the one-ness, so its container edge has to be perceivable: 1px
      {colors.muted} is 4.892 on {colors.surface}, where 2px {colors.turmeric} was 1.608.
  price-unestimated:
    label: 'not yet estimated'
    color: '{colors.muted}'
    typography: '{typography.meta}'
    note: >-
      Never a currency symbol, never a zero, never a dash. The component is called
      price-unestimated everywhere, in both spines; the words it renders are the literal
      lowercase "not yet estimated". One name, one string.
  badge-paid:
    background: '{colors.surface}'
    border: '1px solid {colors.muted}'
    color: '{colors.ink}'
    radius: '{rounded.none}'
    padding: '2px 6px'
    typography: '{typography.meta}'
    label: 'Featured'
    note: >-
      Square on purpose. {components.chip} is the one pill in the system, so a paid-placement
      badge shaped like one reads as a selected filter. Never a {colors.turmeric} fill, never a
      star, never colour alone — the literal word is the signal, on every card in the band.
  featured-band:
    background: '{colors.ground}'
    border: '1px solid {colors.muted}'
    radius: '{rounded.none}'
    padding: '12px 15px'
    heading: '{typography.heading-section}'
    heading-label: 'Featured'
    identifying-line: '{typography.meta} in {colors.muted}, directly under the heading'
    per-card-badge: '{components.badge-paid}'
    note: >-
      Three non-colour signals carry FR-20 together: the bounded container, the heading, and a
      {components.badge-paid} on every card inside. The identifying line is non-optional and
      non-collapsible — it is what makes "Featured" mean paid rather than merely special.
  function-card:
    background: '{colors.surface}'
    border: '1px solid {colors.hairline}'
    radius: '{rounded.md}'
    shadow: '{elevation.1}'
    padding: '12px 13px'
    title: '{typography.title-card}'
    date: '{typography.meta}'
    row-settled: 'inline SVG glyph + the Service name, both {colors.ink}'
    row-waiting: 'inline SVG glyph {colors.muted} + the Service name {colors.ink} + the status word'
    row-missing: 'inline SVG glyph + the word, both {colors.muted}'
    note: >-
      One card per Function — Haldi, Wedding, Reception — and the Workspace's primary object.
      Every row state carries a glyph AND a word, so none of the three depends on colour. It
      shows only what serves that Function ALONE; a Span is never echoed into it, because it
      already sits once in "Across the wedding" above (see {components.span-card}). The
      accepted cost of that rule is that a Function card is no longer complete by itself.
  empty-state:
    icon: '48px {rounded.circle}, {colors.gold-tint} fill, inline SVG mark in {colors.muted}'
    heading: '{typography.title-card}, {colors.ink}'
    body: 'one sentence, {typography.body}, {colors.muted}'
    action: 'one {components.button-primary}, never two'
    layout: 'centred, capped at 280px, {spacing.5} above and below'
    note: >-
      Anatomy only. The per-surface wording is behaviour and lives in EXPERIENCE.md; what is
      fixed here is that an empty surface is always these four things in this order, never a
      bare line of grey text.
  stepper-count:
    background: '{colors.surface}'
    border: '1px solid {colors.muted}'
    radius: '{rounded.none}'
    min-height: 48px
    label: 'a visible label above, {typography.body}, bound to the field by for/id'
    value: '{typography.price}, centred, keyboard-editable'
    decrement: '48x48 square, inline SVG minus, aria-hidden, accessible name on the button'
    increment: '48x48 square, inline SVG plus, aria-hidden, accessible name on the button'
    minimum: 1
    maximum: 'none'
    focus-ring: '2px solid {colors.vermillion}, offset 2px — >=3:1 against whatever it sits on'
    note: >-
      The Guest RSVP's count, revealed only after Yes and pre-filled with the household figure
      the Creator already recorded. Minimum 1, because he has just said he is coming. Announced
      on reveal.
  lens-switch:
    background: '{colors.surface}'
    border: '1px solid {colors.muted}'
    radius: '{rounded.none}'
    segment-min-height: 44px
    typography: '{typography.button}'
    rest: '{colors.ink} on {colors.surface}'
    selected: '{colors.on-vermillion} on {colors.vermillion}, weight 700'
    count: 'part of the label text — "Inbox · 3" — never a coloured dot and never a bare badge'
    note: >-
      Two lenses on one set of Enquiries, by date or by recency. Selection carries the weight as
      well as the fill, so it survives greyscale, and the waiting count is inside the label so it
      is read in order rather than announced as a stray number.
  nav-rail:
    background: '{colors.surface}'
    border-right: '1px solid {colors.hairline}'
    width: 224px
    breakpoint: '>=768px — replaces {components.tab-bar} on the vendor portal'
    item-min-height: 44px
    typography: '{typography.body}'
    rest-color: '{colors.muted}'
    active-color: '{colors.vermillion}'
    active-weight: '600'
    active-indicator: >-
      3px {colors.vermillion} rule on the item's leading edge — 4.801 non-text on
      {colors.surface}. Plus weight 600. Never colour alone.
    note: >-
      Four destinations — Enquiries, Listings, Performance, You — with the Subscription's
      standing at the foot. Same three-signal rule as {components.tab-bar}; only the axis turns.
---

## Brand & Style

Vivah Spot is **the Invitation**. The home screen opens on a wedding card that starts blank and
fills itself in as the wedding gets sorted — the couple's names, the date, the venue, the caterer,
each fact ink-writing onto the card as it becomes true, with a single sweep of gold foil when the
card completes. Nobody has to be taught what an unfinished invitation means.

The register is **festive first**. This is a wedding and the product should feel like one: warmth,
saturated colour and imagery carry the screen. Anything too sober reads as foreign in this market.
The PRD's *"calm, capable, unfussy — not romantic, not corporate"* is binding, and it lives in the
**copy and the clarity**, not in visual restraint. Loud colour, quiet claims. The screen may
celebrate; the sentence on it still says *"vendor shows available"*, not *"available"*.

The craft reference is letterpress, not a dashboard. Playfair Display set at a normal weight,
square corners everywhere the brand speaks, a hairline gold rule inside a gold border, a
paper-white card floating on a warm cream ground. It should feel **printed rather than rendered**.
Micro-animation is wanted throughout — the ink rule drawing under a settled fact, the foil sweep,
a medallion lifting under a thumb — but every one of them is transform and opacity only, because
the audience is on a mid-range Android on patchy mobile data (NFR 5.3), and every one has a
`prefers-reduced-motion` path that leaves the meaning intact.

The interface is **English throughout** (NFR 5.1). Devanagari is not a translation layer; it is
**user content** — a Vendor's Rules and Commitments, a Listing description, a family's review, and
the couple's own names on the invitation card. The identity therefore ships two serifs, one per
script, so a card set in Marathi does not fall back mid-rule into a system face.

## Colors

The palette is **Kumkum & Turmeric** — vermillion and haldi, the two substances physically present
at every ceremony. Ritual colour rather than decorative colour. It is deliberately not the pink
that is live on vivahspot.com today; that skin was a placeholder so the domain would not be empty.
It was picked by looking, in [`mockups/color-themes-1.html`](mockups/color-themes-1.html) — the same
invitation-card home set in five bright palettes, every brand fill carrying a label that clears
4.5:1. **T3, Kumkum & Turmeric**, is this one.

- **Ground `#FFFCF2`** is the app canvas — a warm, barely-there cream that reads as paper stock
  rather than as white. Everything scrolls on it. It is never used as a card fill; the difference
  between ground and {colors.surface} is the only tonal separation this system has, and spending it
  on a fill throws it away.
- **Surface `#FFFFFF`** is every raised thing: the invitation card, vendor cards, list rows, the
  search field, the app bar and the tab bar. Pure white on warm cream is what makes the card look
  like a card. Not used for the page background, and not used for text on any brand fill except
  {colors.vermillion}.
- **Ink `#2B0A0E`** is all primary text — a red-black, not a neutral black, so it belongs to the
  same family as the vermillion. 17.75:1 on {colors.ground}, 18.22:1 on {colors.surface}. It is
  also the **only** label colour permitted on {colors.turmeric} and {colors.gold-tint}. It is not
  used as a surface fill anywhere; there is no dark mode in this system.
- **Muted `#8C6A50`** is secondary text — vendor category and capacity, timestamps, the eyebrow
  under the couple's names, the "not yet estimated" price, the resting tab label. It is a warm
  clay, not a grey, so de-emphasised text still belongs to the palette. **This token is
  contrast-locked.** It computes 4.77:1 on {colors.ground} and 4.89:1 on {colors.surface}, both
  clearing the 4.5:1 floor. `prd.md:1354` — the muted-text bullet of NFR 5.10, not the palette
  bullet above it — records this as an accessibility decision rather than an aesthetic one: *it must not be lightened, whatever a future
  design pass prefers*. That includes lightening it by the back door — see Don'ts on opacity.
- **Vermillion `#E01B33`** is the action colour and the only colour that carries white text.
  Primary buttons, the Search action, the active tab, the ampersand between the couple's names,
  links. White on it computes 4.80:1 (the memlog records 4.81:1). It is **not** the celebration
  colour and it is **not** the failure colour — a red that means *action* cannot also mean danger,
  which is exactly why {colors.danger} exists as a separate, darker token — and it is never used as
  a large area fill behind body text.
- **Turmeric `#FFC300`** is celebration: the invitation card's border and inner rule, the ornament,
  the ink rule that draws under a settled fact, the progress fill, the foil. It is the colour of
  the thing being celebrated, never the colour of a thing to tap. **It cannot carry white text**
  (1.61:1 computed here; the memlog records 2.0:1 — either figure fails badly). Labels on turmeric
  are {colors.ink} at 11.33:1, and that reads as deliberate rather than as a compromise.
- **Gold-tint `#FFEBB0`** is turmeric at low volume: chip fills, the progress track, the card's
  inner hairline rule. {colors.ink} on it is 15.41:1. {colors.muted} on it is only 4.14:1 and
  {colors.vermillion} on it only 4.06:1 — **neither is permitted as text on this fill.**
- **Hairline `#F6E2C2`** separates card from ground and row from row at the lowest contrast the
  design can bear (1.23:1 on ground). It is a boundary, never a state and never a divider carrying
  meaning; anything a person must perceive needs 3:1 and therefore needs a different device.
- **Foil `#FFEB96` at 90% alpha** exists only inside the gradient that sweeps the invitation card
  when it completes. It is not a fill and not a border.
- **Shadow-tint `#BE1E32` at 15%** is the colour every resting shadow is tinted with. See
  *Elevation & Depth*.
- **Medallion `#FFE49C → #FFB3AE`** and **placeholder `#FFE7A8 → #FFBDB6`** are the two warm
  gradients: the first fills a category medallion, the second stands in for a Listing photo that
  has not loaded. They are decorative surfaces only and never sit behind text.
- **Danger `#8C2F1A`** is the only colour in the system that means *something went wrong*. It exists
  because {colors.vermillion} already means **action** — it sits on every primary button — so red
  cannot also mean danger. It is a dark, earthy oxblood, deliberately unlike vermillion: white on it is
  8.3:1, it reads 8.1:1 as text on {colors.ground}, and 6.7:1 on its own {colors.danger-tint}. It is
  used for **failure and destructive confirmation, and for nothing else** — not for emphasis, not
  for a warning, not for a required field, not for anything a designer merely wants to feel urgent.
  A sixth token is a standing invitation to misuse, so the fence is part of the definition. The
  token is named for its **rule** rather than its hue for the same reason. It is deliberately not
  called *clay*: {colors.muted} is already described as a warm clay here, and a builder reading two
  clays picks the wrong one.
- **Danger-tint `#F7E4DE`** is its banner ground and appears nowhere else.

**A failure is never carried by `{colors.danger}` alone.** Every failure state renders a glyph, a sentence naming
what happened, and a sentence naming what happens next. The colour makes it faster to find; it never makes it legible. This
matters more here than elsewhere: the palette now holds two warm reds, and an eye that cannot
separate them must still be able to read the difference.

**Six tokens are reached only obliquely, and that is correct.** `{colors.foil}` and the four
gradient stops — `{colors.medallion-start}`/`-end` and `{colors.placeholder-start}`/`-end` — reach
components inside gradient strings rather than as a field's own value, and `{colors.shadow-tint}`
reaches them only as the literal `rgba(190, 30, 50, 0.15)` inside `{elevation.1}` and
`{elevation.2}`. A tool diffing tokens against component usage will report six orphans; they are not
orphans. `{colors.on-turmeric}` is **not** one of them — `{components.button-celebration}` names it
— and every other component that needs that value says `{colors.ink}`, the same value and the rule
the Do's table states.

**Nothing essential is carried by colour alone** (NFR 5.8). Verified status, availability, paid
placement and the active tab each carry a glyph, a weight change or a word in addition to their
colour.

## Typography

Three faces, one job each.

**Playfair Display** carries Latin display: the wordmark, section heads, card titles, the couple's
names, and the uppercase eyebrow. It is already self-hosted in this repo at
`fonts/playfair-display.woff2` (38,404 bytes, variable, axis 400–900). It is set at **400** — the
letterpress reading comes from the shape of the face and the square corners around it, not from
weight. Letter-spacing is `0.01em` on the chrome sizes, which opens the caps just enough to look
set rather than typed.

**Inknut Antiqua** carries Devanagari **user content** — weights 300 / 400 / 500 / 700 / 900,
verified live against `fonts.googleapis.com` on 2026-09-06. It was chosen over Rozha One and Amita
on the stress test rather than on the card: Rozha One ships a single weight, so a vendor's name in
a list row could never be heavier than the review text beneath it and the whole hierarchy would
fall onto size and colour; Amita's connected strokes make a wall of Rules — load-bearing text a
family must read correctly before enquiring — real work at 0.84rem on a mid-range screen. Inknut
holds in all five places Devanagari actually lands: names at 700, vendor row at 500, Rules and
reviews at 400, chips at 400.

**The Devanagari optical correction, stated once.** Devanagari carries meaning above and below the
shirorekha — matras, anusvara, the vowel signs — and those are what degrade first: they lose their
room, then their identity, while the base letterforms are still perfectly legible. The correction
is therefore **absolute, not proportional**. The marks need a floor of vertical space measured in
device pixels, and that floor does not shrink because the run happens to be two words long. So
**every Devanagari role is set +0.10rem (1.6px) above its Latin sibling wherever the Latin role
renders below 1rem, and at parity above it**, where the marks already have room. **[ASSUMPTION]** —
`.memlog.md:98` records the reasoning and the two long-form values it produced, but never says
whether the rule is general, and nothing else in the sources settles it. Applied consistently:

- `{typography.display-names-devanagari}` — **1.35rem, parity**. 21.6px is far above the threshold.
  What rises here is weight, not size: 700 against Playfair's 400, so two different faces match in
  colour at display size.
- `{typography.title-card-devanagari}` — **0.95rem → 1.05rem** at 500 (16.8px).
- `{typography.body-long-devanagari}` — **0.84rem → 0.94rem** at 400, and
  `{typography.review-devanagari}` **0.82rem → 0.92rem** at 400. Already applied; the +0.10rem step
  is theirs, and it is where the rule comes from.
- `{typography.chip-devanagari}` — **0.7rem → 0.8rem** at 400. This was the worst case in the
  system: 11.2px, the smallest Devanagari shipped, with the least room of anything for its matras.

The corrected ramp is drawn in
[`mockups/type-devanagari-ramp-current.html`](mockups/type-devanagari-ramp-current.html) — every
Devanagari role at its current size, with the superseded 0.84rem/300 setting of a Vendor's Rules
beside the 0.94rem/400 that replaced it, so the correction is visible rather than argued.

Two costs, accepted here rather than discovered on a screen later. A Devanagari chip is taller than
its Latin neighbour, so **the chip takes a fixed height sized to the Devanagari one** and a mixed
filter row stays even — the Latin label is not enlarged, only its box. And a Devanagari card title
adds roughly 1.6px per line to vendor cards and list rows on every results surface. Both are
cheaper than the alternative, which is a document stating a general rule and then following it in
two tokens out of five.

**`Inknut Antiqua` is specified, not installed.** There is no font file in this repo and no
`expo-font` load for it. Adding one to `apps/mobile` and `apps/vendor-web` is a separate step that
needs an explicit yes under the CLAUDE.md dependency rule. Until it lands, Devanagari falls back to
the platform's Devanagari face and the card is visually wrong but readable. In the same state:
`apps/mobile/tailwind.config.js` already declares `Playfair Display` — sourced from
`packages/shared/src/tokens.js`, which is where the family name it reads actually lives — with
**no font file behind it**. That is a live defect, not a plan.

**System sans** carries everything functional: body, long-form, prices, buttons, meta, tabs. The
stack is written once, in the frontmatter, as `{fonts.system-sans}`, and the nine roles that use it
reference it rather than repeating it — `"Segoe UI", system-ui, -apple-system, Roboto, Helvetica,
Arial, sans-serif`. Zero network cost, which matters on the target connection. All three faces
resolve through `{fonts.*}` for the same reason: a family name written into twenty roles is twenty
places to edit when one of them changes.

The ramp is dense on purpose; this is a browse product on a phone. The **Latin** sizes in the
frontmatter are lifted from `.working/directions-4.html` (which renders the chrome at device width)
and `.working/type-finalists-stress.html`. The **Devanagari** sizes are no longer those files'
figures — the optical correction above supersedes them, and `type-finalists-stress.html` is frozen
as the comparison evidence the finding rested on rather than as a current specimen. **[ASSUMPTION]**
`{typography.display-screen}` at 1.5rem is proposed, not lifted — no mock renders a screen title,
and 1.5rem is the next step above the card names and matches `.vendor-intro h1` in the published
site.

Rules that hold across the ramp: long-form runs at 1.8–1.9 line-height because Devanagari matras
need the room and the same measure has to serve both scripts; the eyebrow is the only uppercase in
the system; nothing is set in Playfair below 0.72rem.

**A stated limit, not an oversight.** `{typography.tab}` is 0.61rem — 9.76px — which is below the
11px any label should hold and well below the 12px anything read as a sentence should hold. It is
where it is because the tab bar carries five destinations with their real words (`.memlog.md:52` is
a user decision: Home · Wedding · Shortlists · Enquiries · You), and shortening a label or dropping
a destination to buy back a tenth of a rem was rejected. The limit is recorded, it licenses nothing
else, and no other label in the system may go below 11px on its authority.

## Layout & Spacing

**[ASSUMPTION] — the spacing scale is proposed, not decided.** The extraction found that
`styles.css` tokenises exactly one dimension (`--app-w: 430px`); every pad and gap in both the
published site and the direction mocks is a hand-tuned literal. The mocks cluster tightly around
4 / 8 / 12 / 14–16 / 20 px, so the scale above is `4 / 8 / 12 / 16 / 24 / 32 / 48`.
`{spacing.gutter}` is set at 16px: the mocks use 15px in the scroll body and 16px in the app bar,
and a single 16px reads identically while landing on the scale.

**The scale governs page rhythm. Component dimensions are hand-tuned and deliberately off it, and
that is stated here once rather than half-hidden in the token block.** A padding written as
`{spacing.4} 15px 15px` is worse than either pure form: it looks tokenised, so a builder trusts the
first number and invents the other two. So every component dimension is now a plain literal, and
these are the values that do not land on the scale, in one list:

- Card and control padding — invitation card `16px 15px 15px`, buttons `8px 14px`, chip `4px 10px`,
  tab bar `7px 4px 9px`, failure banner and Function card `12px 13px`, Span card `12px 11px`.
- Optical sizes — the availability ring's large cut at 40px (between the scale's 32 and 48), the
  calendar day bar at 4px tall offset 3px from the cell foot, the chip's fixed 26px box, the
  medallion at 60px, the vendor card's photo band at 104px.
- Grid gaps — the medallion grid's 13px row gap and 6px column gap, the 11px vendor-card stack, and
  20px above / 11px below a section head. The tight column gap is deliberate, since a circle already
  carries its own optical margin.

Nothing else may be off the scale without joining this list.

Single column, always, on the family app. `{spacing.phone-column}` (430px) is the maximum content
width; on a wider viewport the column centres rather than stretching. The invitation card is the
only full-bleed-to-gutter element at the top of home; everything below it sits inside the gutter.

Category medallions run a 3-column grid.

Safe area is explicit, not inherited: the tab bar pads
`calc(9px + env(safe-area-inset-bottom))`, matching the pattern already used three times in
`styles.css`.

Vendor portal: **[ASSUMPTION]** the portal is greenfield. No prototype and no prior visual or IA
work exists for it, so it inherits this identity unchanged and is specified here as **phone-first at
the same 430px column**. Above 768px it widens into **three regions**: a persistent left rail
(`{components.nav-rail}`) carrying the four destinations and the Subscription's standing, a main
column, and a right rail holding the stale-date nudge and the season's figures. NFR 5.2 is explicit
that "responsive" for Dattatray means *designed for the phone at a function*, not *tolerating* it.
The desktop density is genuinely open; see Open Questions.

## Elevation & Depth

Shadows are **warm-tinted, never neutral grey** — `{colors.shadow-tint}` at 15%
(`rgba(190, 30, 50, 0.15)`), lifted from the chosen theme. A neutral shadow on a cream ground reads
as dirt.

Three levels, and only three:

- **`{elevation.1}`** `0 2px 9px rgba(190, 30, 50, 0.15)` — vendor cards, list rows, category medallions,
  the search field. The resting state of anything on the ground.
- **`{elevation.2}`** `0 3px 12px rgba(190, 30, 50, 0.15)` — the invitation card. One step above
  everything, because it is the one object on the screen that is not a list of other things.
- **`{elevation.3}`** — sheets, menus and the compare tray. **[ASSUMPTION]** no T3 mock renders
  one; `0 12px 30px rgba(43, 10, 14, 0.18)` is proposed, tinted with {colors.ink} rather than the shadow
  tint, following the published site's grammar of *neutral-plum for things that float above
  everything*.

Hierarchy comes from tone and from the gold rule, not from stacking shadows. There is no
`{elevation.4}`. Hover lift is `translateY(-3px)`; press is `scale(0.98)` — both transform-only.

## Shapes

**Square is the brand.** The invitation card, the primary button, the Search action and the search
field are all `{rounded.none}` — a printed card has corners, and the moment they round the whole
letterpress reading collapses into a generic marketplace.

**[ASSUMPTION]** the radius reconciliation below is mine:
[`mockups/color-themes-1.html`](mockups/color-themes-1.html) renders
every surface square, while the later `.working/type-finalists-stress.html` puts 6px on list rows
and 4px on thumbnails. The rule that satisfies both:

- `{rounded.none}` — the invitation card, anything filled with {colors.vermillion} or
  {colors.turmeric}, and the search field. Square is reserved for where the brand speaks.
- `{rounded.md}` (6px) — content containers that are merely holding things: vendor cards, list
  rows, review blocks, the Rules panel.
- `{rounded.sm}` (4px) — small thumbnails inside a row.
- `{rounded.circle}` — category medallions and avatars only.
- `{rounded.full}` — filter chips only. Chips are the one pill in the system; they are the one
  component that is genuinely a token rather than a surface.

Nothing else is pill-shaped. Buttons are not pills. Imagery follows its container's corner exactly.

The card's **double rule** is the signature: a 1px {colors.turmeric} border with a second 1px
{colors.gold-tint} rule inset 4px. Both are square. Do not soften either.

## Components

**Invitation card** — the top of home and the identity in one object. White on the ground, gold
border, gold inner rule inset 4px, three `❁` ornaments in {colors.turmeric} tracked at `0.4em`.
Couple's names centred in `{typography.display-names}` (Devanagari:
`{typography.display-names-devanagari}`), with the joining word in {colors.vermillion} italic. City
below in `{typography.eyebrow}`, uppercase, {colors.muted}. Then one line per settled fact in
{colors.ink}, and one line per open fact in {colors.muted} at **full strength** reading
*"caterer not chosen"*. A 1px {colors.turmeric} rule draws left-to-right under each settled line
(`scaleX(0) → scaleX(1)`, 7s loop in the mock; once, on the fact settling, in the product). The
foil gradient sweeps once across the card when the last fact lands. Progress is a 3px bar,
{colors.gold-tint} track and {colors.turmeric} fill, **always accompanied by its `3 OF 5` label** —
the fill against the track is 1.36:1 and cannot carry that state on its own. First run is the same
card, empty, with `—  &  —` and `0 OF 5`: a card waiting to be filled, not an onboarding prompt.
Those dashes and that label are `{colors.muted}` at **full strength** — 4.89:1 on
{colors.surface}, 4.77:1 on {colors.ground} — under the same rule as every other open fact on the
card. They are the "nothing here yet" signal on the first screen a new user sees, so they are the
last thing that may be faded.

**One name.** The object is the **invitation card**, here and in `EXPERIENCE.md` and in code. On
Home it sits as the top strip; that placement does not rename it, and *invitation card strip* is
not a second component.

**Primary button** — {colors.vermillion} fill, white `{typography.button}` label, square,
`8px 14px` padding, minimum 44px touch target. White on vermillion is 4.80:1. Pressed state is
opacity 0.88 plus `scale(0.98)`. Labels are verbs the platform can honestly perform: **Enquire**,
**Send**, **Shortlist**, **Compare** and **Save**. *Save* belongs **only to Boards** — FR-67,
saving an image or a Listing to a private board. Nothing in the Workspace is ever labelled Save:
entries persist as they are made, and no explicit save action exists there (`EXPERIENCE.md`, State
Patterns). Never *Book*, *Book Now*, *Add to cart* or *Checkout* — see Do's and Don'ts.

**Celebration button** — {colors.turmeric} fill with an {colors.ink} label, for the one or two
moments that are a celebration rather than an action (an Agreement recorded, a Wedding completed).
It is a different thing from the primary button, not a variant of it, and it never carries white.

**Vendor card** — white, 1px {colors.hairline}, `{rounded.md}`, `{elevation.1}`. A 104px photo band
(placeholder gradient while loading — imagery never blocks the content around it, NFR 5.3) with the
rating chip top-right, a **white** `{typography.meta}` label on a `rgba(0, 0, 0, 0.6)` scrim. That
alpha is a floor rather than a taste: the worst thing a photograph can put under it is a white
pixel, which composites to `#666666` and holds white at **5.74:1**; over the placeholder gradient
it is 6.61 at the light stop and 7.79 at the dark one. At `0.5` the worst case falls to **3.95** and
the label fails, so the scrim is never lightened and the label is never {colors.ink}. Below: name in `{typography.title-card}`
(Devanagari: `{typography.title-card-devanagari}`), category and capacity in `{typography.meta}`
{colors.muted}, then a footer row with the price left and an **Enquire** primary button right. A
verified vendor carries a glyph and the word, never a colour swap alone.

**Chip** — {colors.gold-tint} fill, **1px {colors.muted} border** (4.89:1 on {colors.surface}; a
turmeric border was 1.61 and had no visible edge at all), {colors.ink} label at
`{typography.chip}` (Devanagari: `{typography.chip-devanagari}`), `{rounded.full}`, `4px 10px`.
**[ASSUMPTION]** the selected state is proposed, not decided: {colors.vermillion} fill, white
label, and a leading check glyph so selection is not carried by colour alone.

**Search field** — white, **1px {colors.muted}** (4.89:1; hairline was 1.27, which is not an edge
a person can see on a text input), square, placeholder in {colors.muted} at
`{typography.body}`, with the Search primary button sitting flush inside on the right. Placeholder
copy is concrete: *"Search venues, caterers, decorators…"*. **[ASSUMPTION]** focus is a 2px
{colors.vermillion} outline at 2px offset — the pattern is carried from the global
`:focus-visible` rule already in `styles.css`; only the colour is re-pointed. Focus is never
removed and never signalled by the tinted glow alone.

**The focus ring is a non-text mark and holds the 3:1 floor.** Vermillion at 2px, offset 2px,
clears it on every ground it can land on: {colors.ground} 4.68, {colors.surface} 4.80,
{colors.gold-tint} 4.06, {colors.danger-tint} 3.91. **The one fill it may not sit on is
{colors.turmeric} — 2.99, below the floor.** On turmeric, and on a {colors.vermillion} fill itself,
the ring is {colors.ink}. The same ring is carried by `{components.button-choice}` and
`{components.stepper-count}`, which is where focus does the most work: three equal peers and a
number a Guest is editing.

**Calendar day cell** — the visual box stays dense. The hit area is **the cell itself**, at a
minimum of 44×44 wherever the pitch allows it, plus an overlay expanding by at most half the gap on
each side. **The overlay is never wider than the column pitch.** One that overlaps its neighbour
hands the overlap to the later sibling and silently moves the target off the date it marks — probed
at a 284px column, a tap on the visible right edge of "9" returns "10". With square cells and a
uniform gap the horizontal and vertical overlaps are **equal by construction**, so there is no axis
on which overlapping is free.

**At 360px a seven-column month cannot give seven 44px targets** — 308px of cell width is needed
before any gap, and 284px exists. So below 768px the cell is **40×40 with a 2px gap, pitch 42px, and
no overlay at all** — clearing WCAG 2.2 SC 2.5.8's 24px and knowingly missing the product's own 44px
floor by 4px, under the bounded exception in `EXPERIENCE.md`'s Accessibility Floor. Above 768px the
columns fit, the cell reaches the floor on its own, and the overlay is a convenience for the gap
rather than the mechanism that reaches it. Drawn in
[`mockups/vendor-calendar-360.html`](mockups/vendor-calendar-360.html) — the month at a real 360px,
40×40 cells at a 42px pitch, against the two shapes rejected for it: a list of dates, and one week
at a time.

**`::after` is reserved for the hit area and is never shared with a state mark.** A cell needs three
drawn things — two bar segments and a hit area — and has two pseudo-elements, so one mark takes its
own element, or both segments are drawn as one hard-stop gradient. Specificity decides which one
survives a collision, and the one that loses is the invisible one: a two-class `.new .ask::after`
outranking `.days b::after` collapsed the overlay to **13.19 × 4px** on exactly the cells a Vendor
has to act on.

**Calendar day bar** — the mark inside the cell (`{components.calendar-day-bar}`): 4px tall, 70% of
the cell, 3px from its foot. **One** solid bar for engaged, **two** countable segments — 29% each
with a 12% gap — for Enquiries pending, and **no bar** for unavailable, whose struck-through number
already separates it, so only two of the three states depend on the bar at all. Both bars are
{colors.vermillion}: 4.80:1 on {colors.surface}, 4.68:1 on {colors.ground}. **A count carries the
state — never a colour and never a texture.** Turmeric was 1.61:1 here, and is barred from this role
by the rule in *Colors*; drawing both bars in one ink also removes the temptation to see the hue and
drop the count. A dashed bar was rejected earlier for the
same family of reason: at 3–4px a dash averages into a solid line. The cell *fills* do not change —
they are what makes a month scannable at a glance. Drawn in
[`mockups/vendor-calendar-bar.html`](mockups/vendor-calendar-bar.html) — the 3px dashed bar as first
drawn beside the strengthened one-bar-against-two-segments count, both rendered at the tight 284px
column where the distinction has to survive.

**Tab bar** — white, 1px {colors.hairline} top rule, five tabs (Home · Wedding · Shortlists ·
Enquiries · You) at `{typography.tab}`. Resting labels {colors.muted}. The active tab is
{colors.vermillion} **and** weight 600 **and** a 3px {colors.vermillion} rule above it, 20%–80% of
the tab width — 4.80:1 as a non-text mark on {colors.surface}. Three signals, because one of them
is colour. A filled-rather-than-outlined icon is permitted as a fourth and is not required: the
rule is drawn, measured and already in six prototypes, while a filled/outline pair would cost a
second drawing for each of the ten destinations to carry a signal the rule already carries.

**Category medallion** — a 60px circle filled with the medallion gradient, ringed 2px in
{colors.surface}, `{elevation.1}`, label beneath in {colors.ink}. Press lifts `translateY(-3px)`.

**Failure banner** — {colors.danger-tint} ground, 1px {colors.danger} border with a 4px
{colors.danger} left edge, square, `12px 13px`. A 22px square {colors.danger} glyph with a white
mark is **always present**, never optional: the title sits in `{typography.title-card}`
{colors.danger}, the sentence in `{typography.body}` {colors.ink}, and any retry is a primary button
recoloured to {colors.danger}. The glyph and the sentence carry the failure; the colour only makes
it faster to find. Note that `{typography.meta}` defaults to {colors.muted}, which is **3.99:1** on
this tint — a timestamp in a banner has to be set in {colors.ink}. Drawn in
[`mockups/direction-failure-3.html`](mockups/direction-failure-3.html) — this banner against the two
treatments rejected for it, over three real failures, with the copy held identical so only the
treatment varies.

**Availability ring** — one ring, three states, and the geometry alone tells them apart: 2px solid
for *shows available*, 1px solid for *shows unavailable*, 1px dashed for *not stated*. **All three strokes are
{colors.muted}** — 4.77:1 on {colors.ground}, the only value in this palette that clears the 3:1
non-text floor. A {colors.turmeric} stroke is 1.57:1 and a {colors.gold-tint} fill 1.15:1, so
neither may ever carry the state; the gold-tint fill on the free ring is warmth, and removing it
changes nothing a person can read. The word beside the ring is the third signal, and it is what a
screen reader announces — **every icon SVG carries `aria-hidden="true" focusable="false"`**, or a
screen-reader user hears an unlabelled graphic before each availability phrase. The icon is a
calendar drawn as **inline SVG** inheriting `currentColor`; never a Unicode glyph. It is cut twice:
at ≥24px the body, two binding tabs, header bar, inner grid line and mark at stroke 1.7; at ≤20px
the inner grid is removed and the stroke thickens to 2.4. The small cut is drawn at **10×10 inside
the 16px ring's 12px inner box**, leaving 1px of optical padding on each side so no corner lands on
the ring stroke, and its distinguishing mark **breaks the body silhouette** rather than sitting
inside it — two icons that differ only by an interior detail stop differing at 16px. Drawn in
[`mockups/availability-signal.html`](mockups/availability-signal.html) — the three rings where they
actually live, on a Vendor card and a list row, beside the words-alone alternative; the icon itself
is in [`mockups/availability-icons-b.html`](mockups/availability-icons-b.html), which sets the two
cuts side by side at real size.

**Skeleton** — {colors.hairline} blocks at `{rounded.sm}`, occupying the exact footprint of the
content they replace so nothing moves on arrival. The sheen is a `translateX` sweep over 1.5s,
transform only, never an animated `background-position`. Under `prefers-reduced-motion` the sheen
goes and the blocks stay. Chosen over a spinner, which jumps the layout and says nothing about how
much is coming.

**Choice button** — `{components.button-choice}`, for a set of **equal** choices with no primary
among them: the Guest RSVP's *Yes / No / Not sure*. White fill, 1px {colors.muted}, {colors.ink}
label, square, full width, minimum height 48px. Every other button in this system is a primary
action; these are peers, so **none may be filled, pre-selected, or distinguished from its siblings
by anything but its label**. Focus is the standard 2px {colors.vermillion} ring at 2px offset, and
this is the surface where that matters most — three identical targets on the one page strangers see.
Drawn, with `{components.stepper-count}` beside it, in
[`mockups/guest-rsvp.html`](mockups/guest-rsvp.html) — the invitation and the reply at 360×640,
unanswered and answered, with the measured fold and the WhatsApp link preview.

**Count stepper** — `{components.stepper-count}`, the Guest's headcount. White fill, 1px
{colors.muted} (4.89:1), square, minimum height 48px. A visible `<label>` sits above it in
`{typography.body}`, bound by `for`/`id`; a 48×48 `−` and a 48×48 `+` flank a keyboard-editable
centre value in `{typography.price}`. Both glyphs are inline SVG, `aria-hidden`, with the accessible
name on the button rather than on the mark. Minimum 1 — he has just said he is coming — and no
platform maximum. It is revealed only after *Yes*, pre-filled with the household figure the Creator
recorded, and announced on reveal.

**Span card** — `{components.span-card}`, the object that makes one Selection covering several days
**visibly one thing**. White, `{rounded.md}`, **1px {colors.muted}** as the container edge (4.89:1),
with the 2px {colors.turmeric} rule surviving inset 4px as warmth — turmeric alone was 1.61:1 on
surface and 1.57:1 on ground, so it may not be the only edge. The title, one price, and each day it
covers as a chip inside the card. It lives in the Workspace's **Across the wedding** section, above
the Functions; that section header is set in `{typography.heading-section}`. A Span appears here
once and is never echoed into the Function cards below.

**Function card** — `{components.function-card}`, the Workspace's primary object: one card per
Function, Haldi and Wedding and Reception, in date order. White, 1px {colors.hairline},
`{rounded.md}`, `{elevation.1}`. Each Service row carries an inline SVG glyph **and** a word —
settled, waiting, missing — so none of the three states rests on colour. It shows **only what serves
that Function alone**. The accepted cost of the Span rule is that a Function card is no longer
complete by itself: someone scanning only the Haldi card sees no venue, and the Spans directly above
it are what complete the answer.

**Featured band and Featured badge** — `{components.featured-band}` and
`{components.badge-paid}`, which carry FR-20 together. The band is a bounded container on
{colors.ground} with a 1px {colors.muted} edge, the heading **Featured** in
`{typography.heading-section}`, and an identifying line beneath it in `{typography.meta}`
{colors.muted} that is **non-optional and non-collapsible** — the heading alone says *special*, and
it is the line that says *paid*. Every card inside also carries a `badge-paid`: white fill, 1px
{colors.muted}, {colors.ink} at `{typography.meta}`, the literal word *Featured*, and **square**.
Square is the point — `{components.chip}` is the one pill in the system, so a Featured chip built
from `chip` reads as a selected filter. Both are drawn in
[`mockups/featured-band.html`](mockups/featured-band.html), which sets the band and its badge
directly beside the thing they must never be mistaken for: a chip in its selected state.

**Empty state** — `{components.empty-state}`, one anatomy everywhere: a 48px circle filled
{colors.gold-tint} with an inline SVG mark in {colors.muted}, a heading in `{typography.title-card}`,
**one** sentence in `{typography.body}` {colors.muted}, and **one** primary button. Centred, capped
at 280px. What each surface says is behaviour and lives in `EXPERIENCE.md`; what is fixed here is
that an empty surface is always these four things in this order and never a bare line of grey text.

**Lens switch and left rail** — the vendor portal's two structural components. The switch
(`{components.lens-switch}`) sits at the top of the main column and holds two lenses on one set of
Enquiries, Calendar and Inbox: white, 1px {colors.muted} (4.89:1, the value the prototype already
draws), square, each segment at least 44px tall, the selected segment {colors.on-vermillion} on
{colors.vermillion} **and** weight 700. The waiting count is **part of the label text** — `Inbox · 3`
— never a coloured dot and never a bare badge, so it survives greyscale and is read in order. Above
768px `{components.nav-rail}` replaces the tab bar: a 224px white column, 1px {colors.hairline} on
its trailing edge, four destinations at `{typography.body}` with the Subscription's standing at the
foot, and the active item marked by a 3px {colors.vermillion} rule on its leading edge plus weight
600. Same three-signal rule as the tab bar; only the axis turns. The switch is drawn in
[`mockups/direction-vendor-switch.html`](mockups/direction-vendor-switch.html) — both lenses over one
set of Enquiries, `Inbox · 3` inside the label, the rail constant across the switch, and the same
control at 360px.

**`price-unestimated`** — the money display for a Listing with no price set. **One name**: the
component is `price-unestimated` in both spines and in code, and the words it renders are the
literal lowercase *not yet estimated*. Neither is a synonym for the other. They render in
`{typography.meta}` {colors.muted}, in the exact slot the price would occupy. **Never `₹0`, never a blank, never a dash** — FR-8 gives the reason in three words:
*zero reads as free*. Real prices render as the server sent them (`₹1,80,000`, `₹420 / plate`) in
`{typography.price}`; clients never compute money.

## Do's and Don'ts

| Do | Don't |
|---|---|
| Keep `{colors.muted}` at exactly `#8C6A50` — 4.77:1 on ground, contrast-locked at `prd.md:1354`, the muted-text bullet of NFR 5.10 | Lighten it, and do not lighten it by the back door: the mock's `opacity: .75` on an unsettled line renders 3.04:1 and **breaks the lock**. Set the colour, never fade it |
| Put {colors.ink} labels on {colors.turmeric} (11.33:1) and on {colors.gold-tint} (15.41:1) | Put **white** on {colors.turmeric} — 1.61:1. It fails, badly, at every size |
| Put white on {colors.vermillion} (4.80:1) — the one brand fill that takes it | Put {colors.vermillion} text on {colors.gold-tint} (4.06:1) or on {colors.turmeric} (2.99:1), or {colors.muted} on {colors.gold-tint} (4.14:1), or {colors.muted} on {colors.danger-tint} (3.99:1) — `{typography.meta}` is muted by default, so a banner timestamp fails silently |
| Carry every state in a glyph, a weight or a word **as well as** its colour | Signal verified, available, paid placement or the active tab by colour alone (NFR 5.8) |
| Pair the progress bar with its `3 OF 5` label | Let the turmeric fill on the gold-tint track carry progress alone — 1.36:1, below the 3:1 non-text floor |
| Animate with `transform` and `opacity` only, and give every animation a `prefers-reduced-motion` path that leaves the meaning intact | Animate `width`, `height`, `top`, `background-position` on layout, or box-shadow. Mid-range Android on patchy data (NFR 5.3) |
| Keep the invitation card, buttons and search field square | Round the brand. A rounded card is a different product |
| Keep the double gold rule at 1px + 1px inset 4px | Thicken it, gradient it, or replace it with a shadow |
| Set Devanagari user content in Inknut Antiqua at 700 / 500 / 400 by role | Set the **interface** in Devanagari. The chrome is English throughout (NFR 5.1) and there is no app-wide language switch |
| Set a Devanagari role **+0.10rem above its Latin sibling** wherever the Latin role renders below 1rem — the matras need an absolute floor of room, not a proportional one | Set a Devanagari role at parity below 1rem, or at weight 300. At 13.44 CSS px on a density-2.0 Android, Inknut's Light lands on about one device pixel |
| Show `not yet estimated` in {colors.muted} | Render `₹0`, a blank, or a dash. Zero reads as free (FR-8) |
| Label actions **Enquire**, **Send**, **Shortlist**, **Compare**, and **Save** on Boards only | Use **book**, **booking**, **booked**, **My Bookings**, **cart**, **checkout**, **guaranteed**, **legally binding**, or **enforced by Vivah Spot** anywhere — button, toast, empty state or push copy (§7.9). The live prototype's "Book Now" and "My Bookings" are artifacts of the abandoned commission model, not specification |
| Say **"shows available"**, **"no reviews yet"**, **"we recorded what you both agreed"** | Say "available", show a zero rating, or imply Vivah Spot stands behind the Agreement (NFR 5.6) |
| Draw every state glyph as **inline SVG** inheriting `currentColor` | Use a Unicode character for a state mark. `U+2713` renders with **emoji presentation** on several Android builds, putting an unchosen green tick into a system where nothing means *good* by being green — and a webfont for three glyphs is a download on a connection that cannot spare one |
| Cut an icon twice when it is used below 20px | Scale one drawing down. At 16px on a density-2.0 Android a 1.7px inner line lands on roughly one device pixel and either aliases or vanishes, and two icons that differ only by an inner detail stop differing at all |
| Separate two states by a **count** — one bar against two | Separate them by a texture — solid against dashed — anywhere below about 6px. A dash pattern averages into a solid line and the distinction disappears in greyscale. **One scoped exception**: a circular 1px dash at ≥16px diameter is not the straight-bar case, because the arc between gaps is set by the circumference rather than by a repeat period. It must render ≥2px of arc with ≥2px gaps, and the word is always present as the third signal |
| Give every state mark its own element, or its own hard stop in one gradient | Draw a state mark on the pseudo-element that carries a hit area. Specificity decides which one survives, and the one that loses is the one nobody can see is missing — a two-class `.new .ask::after` took the overlay from 44×44 to 13.19×4px on every cell a Vendor had to act on |
| In a destructive confirmation, make the safe action a **text or ghost** button | Put a `{colors.danger}` fill and a `{colors.vermillion}` fill beside each other as sibling actions. Under protanopia the two collapse from CIEDE2000 16.92 to **7.14** — two near-identical dark olive blocks, on the one class of interaction that cannot be undone. The button text becomes the only separator |
| Use `{colors.danger}` for failure and destructive confirmation only, always with a glyph and a sentence | Use it for emphasis, a warning, a required field, or anything that merely feels urgent. It is the one token whose meaning is a rule, not a preference |
| Write failure copy that says what happened and what happens next — *"Your quote didn't send. It's saved — we'll send it the moment you're back."* | Say **error**, blame the user, or leave them not knowing whether their work survived (NFR 5.5) |
| Tint every resting shadow with `{colors.shadow-tint}` | Use a neutral grey shadow on the cream ground |
| Let the celebration live in colour, ornament and motion | Let it live in the copy. The sentence stays calm, capable and unfussy while the screen celebrates |

---

## Open Questions

1. **Font installation.** Inknut Antiqua has no file in this repo and no `expo-font` load, and
   `apps/mobile/tailwind.config.js` declares Playfair Display with no file behind it. Both need an
   explicit yes before anything is added (CLAUDE.md dependency rule). Which cut — a `.ttf`/`.otf`
   for RN via `expo-font`, `next/font/google` for vendor-web, or a self-hosted subset for both —
   is undecided. A five-weight Devanagari family is not small; a subset may be needed for NFR 5.3.

2. **Vendor portal density above 768px.** Structure is settled and is not restated here — see
   `EXPERIENCE.md` Open Question 1. What is open *visually* is the desktop grid, the table treatment
   and the information density inside Listings and Performance. The invitation-card motif remains a
   Family object with no vendor-side counterpart.

3. **Dark mode.** None exists anywhere today and none is specified here. The design is
   white-card-on-cream by construction and cannot be inverted by swapping tokens. Whether the
   product ships one is open; if it does, it is a second DESIGN.md, not a variant block.

4. **Latin numerals inside Devanagari runs.** Prices, dates and capacities are Latin digits inside
   a line that may be set in Inknut. Whether digits stay in the sans (a script switch mid-line) or
   ride the serif (a face switch mid-line) was tested visually but never decided.

5. **Regenerating `tokens.js` from this document.** NFR 5.10 now names DESIGN.md as the source of
   truth for colour and type, with `packages/shared/src/tokens.js` as its projection. **The
   projection has not been generated.** `tokens.js` still carries the placeholder rose-pink palette,
   so the amended PRD points at this document while the code points at the old one. Regenerating it
   is a code change and was not authorised here. The state of the PRD amendments themselves is
   tracked once, in `EXPERIENCE.md` Open Question 9, and is deliberately not restated here — two
   copies of that fact are what produced the false "not yet amended" claims this revision removed.

**Closed since the last revision, recorded so they are not reopened:**

- **Empty-state anatomy** is now `{components.empty-state}` — circular icon, heading, one sentence,
  one button. What each surface *says* is copy and stays open in `EXPERIENCE.md` Open Question 3.
- **The Devanagari ramp.** The optical correction is stated once in Typography as a principle and
  applied to all five Devanagari roles, `[ASSUMPTION]`-tagged because the sources establish the
  reasoning but not its scope.
- **The phone calendar at 360px.** Decided: a seven-column month at 40×40 with a 2px gap and no
  overlay below 768px, as a named, bounded exception to the product's own 44px floor.
- **The tab bar's third signal.** Decided: a 3px {colors.vermillion} rule at 20%–80% width, drawn
  and measured, with the filled/outline icon pair permitted but not required.
- **Four boundaries that were not perceivable.** The chip border, the search-field border and the
  Span card's edge are `{colors.muted}`; both calendar bars are `{colors.vermillion}`. No palette
  value changed — every one of these re-points a usage.
