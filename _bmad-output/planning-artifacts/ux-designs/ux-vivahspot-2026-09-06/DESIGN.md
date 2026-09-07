---
name: Vivah Spot
description: Visual identity for the Vivah Spot family app and vendor portal. The Invitation — a wedding card that fills in as the wedding gets sorted. Kumkum red for the actions, turmeric for the celebration.
status: draft
updated: 2026-09-06
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
typography:
  display-screen:
    fontFamily: Playfair Display
    fontSize: 1.5rem
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  display-names:
    fontFamily: Playfair Display
    fontSize: 1.35rem
    fontWeight: '400'
    lineHeight: '1.35'
  display-names-devanagari:
    fontFamily: Inknut Antiqua
    fontSize: 1.35rem
    fontWeight: '700'
    lineHeight: '1.35'
  brand-wordmark:
    fontFamily: Playfair Display
    fontSize: 1.04rem
    fontWeight: '400'
    lineHeight: '1.05'
    letterSpacing: 0.01em
  heading-section:
    fontFamily: Playfair Display
    fontSize: 1.06rem
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  title-card:
    fontFamily: Playfair Display
    fontSize: 0.95rem
    fontWeight: '400'
    lineHeight: '1.35'
  title-card-devanagari:
    fontFamily: Inknut Antiqua
    fontSize: 0.95rem
    fontWeight: '500'
    lineHeight: '1.35'
  body:
    fontFamily: system-sans
    fontSize: 0.86rem
    fontWeight: '400'
    lineHeight: '1.55'
  body-long:
    fontFamily: system-sans
    fontSize: 0.84rem
    fontWeight: '400'
    lineHeight: '1.85'
  body-long-devanagari:
    fontFamily: Inknut Antiqua
    fontSize: 0.84rem
    fontWeight: '300'
    lineHeight: '1.85'
  review:
    fontFamily: system-sans
    fontSize: 0.82rem
    fontWeight: '400'
    lineHeight: '1.8'
  review-devanagari:
    fontFamily: Inknut Antiqua
    fontSize: 0.82rem
    fontWeight: '300'
    lineHeight: '1.8'
  price:
    fontFamily: system-sans
    fontSize: 0.88rem
    fontWeight: '700'
    lineHeight: '1.2'
  meta:
    fontFamily: system-sans
    fontSize: 0.74rem
    fontWeight: '400'
    lineHeight: '1.4'
  button:
    fontFamily: system-sans
    fontSize: 0.78rem
    fontWeight: '700'
    lineHeight: '1'
  eyebrow:
    fontFamily: Playfair Display
    fontSize: 0.72rem
    fontWeight: '400'
    lineHeight: '1.3'
    letterSpacing: 0.16em
  chip:
    fontFamily: system-sans
    fontSize: 0.7rem
    fontWeight: '400'
    lineHeight: '1.3'
  chip-devanagari:
    fontFamily: Inknut Antiqua
    fontSize: 0.7rem
    fontWeight: '400'
    lineHeight: '1.3'
  progress-label:
    fontFamily: system-sans
    fontSize: 0.68rem
    fontWeight: '400'
    lineHeight: '1.3'
    letterSpacing: 0.06em
  tab:
    fontFamily: system-sans
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
components:
  invitation-card:
    background: '{colors.surface}'
    border: '1px solid {colors.turmeric}'
    inner-rule: '1px solid {colors.gold-tint} inset {spacing.card-inset}'
    radius: '{rounded.none}'
    padding: '{spacing.4} 15px 15px'
    shadow: elevation-2
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
    padding: '{spacing.2} 14px'
    typography: '{typography.button}'
    min-target: 44px
    pressed: 'opacity 0.88 + scale(0.98)'
  button-celebration:
    background: '{colors.turmeric}'
    color: '{colors.on-turmeric}'
    radius: '{rounded.none}'
    padding: '{spacing.2} 14px'
    typography: '{typography.button}'
    note: 'Dark ink label only. Never white.'
  vendor-card:
    background: '{colors.surface}'
    border: '1px solid {colors.hairline}'
    radius: '{rounded.md}'
    shadow: elevation-1
    photo-height: 104px
    photo-placeholder: 'linear-gradient(150deg, {colors.placeholder-start}, {colors.placeholder-end})'
    title: '{typography.title-card}'
    meta: '{typography.meta}'
    meta-color: '{colors.muted}'
    price: '{typography.price}'
    cta: button-primary
  chip:
    background: '{colors.gold-tint}'
    border: '1px solid {colors.turmeric}'
    color: '{colors.ink}'
    radius: '{rounded.full}'
    padding: '{spacing.1} 10px'
    typography: '{typography.chip}'
    selected-background: '{colors.vermillion}'
    selected-color: '{colors.on-vermillion}'
    selected-glyph: leading check
  search-field:
    background: '{colors.surface}'
    border: '1px solid {colors.hairline}'
    radius: '{rounded.none}'
    padding: '{spacing.1} {spacing.1} {spacing.1} {spacing.3}'
    placeholder-color: '{colors.muted}'
    typography: '{typography.body}'
    action: button-primary
    focus-ring: '2px solid {colors.vermillion}, offset 2px'
  category-medallion:
    size: 60px
    radius: '{rounded.circle}'
    fill: 'linear-gradient(160deg, {colors.medallion-start}, {colors.medallion-end})'
    ring: '2px solid {colors.surface}'
    shadow: elevation-1
    label: '{typography.chip}'
    label-color: '{colors.ink}'
  tab-bar:
    background: '{colors.surface}'
    border-top: '1px solid {colors.hairline}'
    padding: '7px {spacing.1} 9px'
    safe-area: 'calc(9px + env(safe-area-inset-bottom))'
    typography: '{typography.tab}'
    rest-color: '{colors.muted}'
    active-color: '{colors.vermillion}'
    active-weight: '600'
    active-indicator: 'filled icon + weight, never colour alone'
  banner-failure:
    background: '{colors.danger-tint}'
    border: '1px solid {colors.danger}'
    border-left: '4px solid {colors.danger}'
    radius: '{rounded.none}'
    padding: '{spacing.3} 13px'
    glyph: '22px square, {colors.danger} fill, white mark — always present'
    title: '{typography.title-card}'
    title-color: '{colors.danger}'
    body: '{typography.body}'
    body-color: '{colors.ink}'
    retry: 'button-primary with {colors.danger} background'
    note: 'Never colour alone. The glyph and the sentence carry it; the colour only makes it faster to find.'
  price-unestimated:
    label: 'not yet estimated'
    color: '{colors.muted}'
    typography: '{typography.meta}'
    note: 'Never a currency symbol, never a zero, never a dash.'
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
  contrast-locked.** It computes 4.76:1 on {colors.ground} (recomputed here at 4.77:1 — rounding;
  both clear the 4.5:1 floor) and 4.89:1 on {colors.surface}. `prd.md:1353` records this as an
  accessibility decision rather than an aesthetic one: *it must not be lightened, whatever a future
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
  A sixth token is a standing invitation to misuse, so the fence is part of the definition — and the token is named for its **rule**, not its hue, for the same reason. It is not called *clay*: {colors.muted} is already described as a warm clay in this document, and a builder reading two clays will pick the wrong one.
- **Danger-tint `#F7E4DE`** is its banner ground and appears nowhere else.

**A failure is never carried by `{colors.danger}` alone.** Every failure state renders a glyph, a sentence naming
what happened, and what happens next. The colour makes it faster to find; it never makes it legible. This
matters more here than elsewhere: the palette now holds two warm reds, and an eye that cannot
separate them must still be able to read the difference.

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
holds in all six places Devanagari actually lands: names at 700, vendor row at 500, Rules and
reviews at 300, chips at 400.

**`Inknut Antiqua` is specified, not installed.** There is no font file in this repo and no
`expo-font` load for it. Adding one to `apps/mobile` and `apps/vendor-web` is a separate step that
needs an explicit yes under the CLAUDE.md dependency rule. Until it lands, Devanagari falls back to
the platform's Devanagari face and the card is visually wrong but readable. In the same state:
`apps/mobile/tailwind.config.js` already declares `Playfair Display` with **no font file behind
it** — a live defect, not a plan.

**System sans** carries everything functional: body, long-form, prices, buttons, meta, tabs. Stack
is `"Segoe UI", system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif` — zero network
cost, which matters on the target connection.

The ramp is dense on purpose; this is a browse product on a phone. Sizes below are lifted from
`.working/type-finalists-stress.html` (which sets the six real Devanagari contexts) and
`.working/directions-4.html` (which renders the chrome at device width): names 1.35rem, section
heads 1.06rem, card titles 0.95rem, mixed-script body 0.86rem, Vendor Rules 0.84rem at 1.85
line-height, reviews 0.82rem at 1.8, chips 0.7rem, tabs 0.61rem. **[ASSUMPTION]**
`{typography.display-screen}` at 1.5rem is proposed, not lifted — no mock renders a screen title,
and 1.5rem is the next step above the card names and matches `.vendor-intro h1` in the published
site.

Rules that hold across the ramp: long-form runs at 1.8–1.85 line-height because Devanagari
matras need the room and the same measure has to serve both scripts; the eyebrow is the only
uppercase in the system; nothing is set in Playfair below 0.72rem.

## Layout & Spacing

**[ASSUMPTION] — the spacing scale is proposed, not decided.** The extraction found that
`styles.css` tokenises exactly one dimension (`--app-w: 430px`); every pad and gap in both the
published site and the direction mocks is a hand-tuned literal. The mocks cluster tightly around
4 / 8 / 12 / 14–16 / 20 px, so the scale above is `4 / 8 / 12 / 16 / 24 / 32 / 48` — a plain 4px
grid that the existing values round onto without visible change. `{spacing.gutter}` is set at 16px:
the mocks use 15px in the scroll body and 16px in the app bar, and a single 16px reads identically
while landing on the grid.

Single column, always, on the family app. `{spacing.phone-column}` (430px) is the maximum content
width; on a wider viewport the column centres rather than stretching. The invitation card is the
only full-bleed-to-gutter element at the top of home; everything below it sits inside the gutter.

Category medallions run a 3-column grid with a 13px row gap and a 6px column gap — the tight column
gap is deliberate, since a circle already carries its own optical margin. Vendor cards stack with
an 11px gap. Section heads take 20px above and 11px below.

Safe area is explicit, not inherited: the tab bar pads
`calc(9px + env(safe-area-inset-bottom))`, matching the pattern already used three times in
`styles.css`.

Vendor portal: **[ASSUMPTION]** the portal is greenfield — no prototype and no prior visual or IA
work exists for it — so it inherits this identity unchanged and is specified here as **phone-first
at the same 430px column**, widening to a two-column layout above 768px. NFR 5.2 is explicit that
"responsive" for Dattatray means *designed for the phone at a function*, not *tolerating* it. The
desktop density is genuinely open; see Open Questions.

## Elevation & Depth

Shadows are **warm-tinted, never neutral grey** — `{colors.shadow-tint}` at 15%
(`rgba(190, 30, 50, 0.15)`), lifted from the chosen theme. A neutral shadow on a cream ground reads
as dirt.

Three levels, and only three:

- **elevation-1** `0 2px 9px rgba(190,30,50,0.15)` — vendor cards, list rows, category medallions,
  the search field. The resting state of anything on the ground.
- **elevation-2** `0 3px 12px rgba(190,30,50,0.15)` — the invitation card. One step above
  everything, because it is the one object on the screen that is not a list of other things.
- **elevation-3** — sheets, menus and the compare tray. **[ASSUMPTION]** no T3 mock renders one;
  `0 12px 30px rgba(43,10,14,0.18)` is proposed, tinted with {colors.ink} rather than the shadow
  tint, following the published site's grammar of *neutral-plum for things that float above
  everything*.

Hierarchy comes from tone and from the gold rule, not from stacking shadows. There is no
elevation-4. Hover lift is `translateY(-3px)`; press is `scale(0.98)` — both transform-only.

There is **no dark mode**. The system is single-mode by construction: {colors.surface} is literally
white and the whole design depends on white-card-on-cream-ground. Inverting it is a new design, not
a token swap.

## Shapes

**Square is the brand.** The invitation card, the primary button, the Search action and the search
field are all `{rounded.none}` — a printed card has corners, and the moment they round the whole
letterpress reading collapses into a generic marketplace.

**[ASSUMPTION]** the radius reconciliation below is mine: `.working/color-themes-1.html` renders
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

**Primary button** — {colors.vermillion} fill, white `{typography.button}` label, square,
`8px 14px` padding, minimum 44px touch target. White on vermillion is 4.80:1. Pressed state is
opacity 0.88 plus `scale(0.98)`. Labels are verbs the platform can honestly perform: **Enquire**,
**Send**, **Shortlist**, **Compare**, **Save**. Never *Book*, *Book Now*, *Add to cart*,
*Checkout* — see Do's and Don'ts.

**Celebration button** — {colors.turmeric} fill with an {colors.ink} label, for the one or two
moments that are a celebration rather than an action (an Agreement recorded, a Wedding completed).
It is a different thing from the primary button, not a variant of it, and it never carries white.

**Vendor card** — white, 1px {colors.hairline}, `{rounded.md}`, elevation-1. A 104px photo band
(placeholder gradient while loading — imagery never blocks the content around it, NFR 5.3) with the
rating chip top-right on a `rgba(0,0,0,0.6)` scrim. Below: name in `{typography.title-card}`
(Devanagari: `{typography.title-card-devanagari}`), category and capacity in `{typography.meta}`
{colors.muted}, then a footer row with the price left and an **Enquire** primary button right. A
verified vendor carries a glyph and the word, never a colour swap alone.

**Chip** — {colors.gold-tint} fill, 1px {colors.turmeric} border, {colors.ink} label at
`{typography.chip}` (Devanagari: `{typography.chip-devanagari}`), `{rounded.full}`, `4px 10px`.
**[ASSUMPTION]** the selected state is proposed, not decided: {colors.vermillion} fill, white
label, and a leading check glyph so selection is not carried by colour alone.

**Search field** — white, 1px {colors.hairline}, square, placeholder in {colors.muted} at
`{typography.body}`, with the Search primary button sitting flush inside on the right. Placeholder
copy is concrete: *"Search venues, caterers, decorators…"*. **[ASSUMPTION]** focus is a 2px
{colors.vermillion} outline at 2px offset — the pattern is carried from the global
`:focus-visible` rule already in `styles.css`; only the colour is re-pointed. Focus is never
removed and never signalled by the tinted glow alone.

**Tab bar** — white, 1px {colors.hairline} top rule, five tabs (Home · Wedding · Shortlists ·
Enquiries · You) at `{typography.tab}`. Resting labels {colors.muted}; the active tab is
{colors.vermillion} **and** weight 600 **and** a filled rather than outlined icon. Three signals,
because one of them is colour.

**Category medallion** — a 60px circle filled with the medallion gradient, ringed 2px in
{colors.surface}, elevation-1, label beneath in {colors.ink}. Press lifts `translateY(-3px)`.

**"Not yet estimated"** — the money display for a Listing with no price set. Renders the literal
words *"not yet estimated"* in `{typography.meta}` {colors.muted}, in the exact slot the price
would occupy. **Never `₹0`, never a blank, never a dash** — FR-8 gives the reason in three words:
*zero reads as free*. Real prices render as the server sent them (`₹1,80,000`, `₹420 / plate`) in
`{typography.price}`; clients never compute money.

## Do's and Don'ts

| Do | Don't |
|---|---|
| Keep `{colors.muted}` at exactly `#8C6A50` — 4.76:1 on ground, contrast-locked at `prd.md:1353` | Lighten it, and do not lighten it by the back door: the mock's `opacity: .75` on an unsettled line renders 3.04:1 and **breaks the lock**. Set the colour, never fade it |
| Put {colors.ink} labels on {colors.turmeric} (11.33:1) and on {colors.gold-tint} (15.41:1) | Put **white** on {colors.turmeric} — 1.61:1. It fails, badly, at every size |
| Put white on {colors.vermillion} (4.80:1) — the one brand fill that takes it | Put {colors.vermillion} text on {colors.gold-tint} (4.06:1) or on {colors.turmeric} (2.99:1), or {colors.muted} on {colors.gold-tint} (4.14:1) |
| Carry every state in a glyph, a weight or a word **as well as** its colour | Signal verified, available, paid placement or the active tab by colour alone (NFR 5.8) |
| Pair the progress bar with its `3 OF 5` label | Let the turmeric fill on the gold-tint track carry progress alone — 1.36:1, below the 3:1 non-text floor |
| Animate with `transform` and `opacity` only, and give every animation a `prefers-reduced-motion` path that leaves the meaning intact | Animate `width`, `height`, `top`, `background-position` on layout, or box-shadow. Mid-range Android on patchy data (NFR 5.3) |
| Keep the invitation card, buttons and search field square | Round the brand. A rounded card is a different product |
| Keep the double gold rule at 1px + 1px inset 4px | Thicken it, gradient it, or replace it with a shadow |
| Set Devanagari user content in Inknut Antiqua at 700 / 500 / 300 by role | Set the **interface** in Devanagari. The chrome is English throughout (NFR 5.1) and there is no app-wide language switch |
| Show `not yet estimated` in {colors.muted} | Render `₹0`, a blank, or a dash. Zero reads as free (FR-8) |
| Label actions **Enquire**, **Send**, **Shortlist**, **Compare**, **Save** | Use **book**, **booking**, **booked**, **My Bookings**, **cart**, **checkout**, **guaranteed**, **legally binding**, or **enforced by Vivah Spot** anywhere — button, toast, empty state or push copy (§7.9). The live prototype's "Book Now" and "My Bookings" are artifacts of the abandoned commission model, not specification |
| Say **"shows available"**, **"no reviews yet"**, **"we recorded what you both agreed"** | Say "available", show a zero rating, or imply Vivah Spot stands behind the Agreement (NFR 5.6) |
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

2. **Vendor portal density above 768px.** The portal's structure is now decided in
   `EXPERIENCE.md` — four destinations, a persistent left rail above 768px, Enquiries as the landing
   surface with a Calendar/Inbox lens switch. What is still undecided here is *visual*: the desktop
   grid, table treatment and information density inside Listings and Performance. The
   invitation-card motif remains a Family object with no vendor-side counterpart.

3. **Dark mode.** None exists anywhere today and none is specified here. The design is
   white-card-on-cream by construction and cannot be inverted by swapping tokens. Whether the
   product ships one is open; if it does, it is a second DESIGN.md, not a variant block.

4. **Latin numerals inside Devanagari runs.** Prices, dates and capacities are Latin digits inside
   a line that may be set in Inknut. Whether digits stay in the sans (a script switch mid-line) or
   ride the serif (a face switch mid-line) was tested visually but never decided.

5. **Downstream PRD edits this document forces.** NFR 5.10 still points at
   `packages/shared/src/tokens.js` as the source of truth for colour and type and instructs
   downstream UX work not to invent a palette. That instruction is superseded: DESIGN.md is now the
   source and `tokens.js` becomes its projection. FR-10 and FR-68 are separately overridden by the
   home-screen decision. All three are logged as required PRD changes and are **not** made here.

6. **Empty states beyond the two the PRD names.** Failure and offline are now decided —
   `{colors.danger}` carries them, fenced by the rule above, and rendered in
   `.working/direction-failure-3.html`. What a genuinely *empty* surface looks like — a Service with
   nothing shortlisted, a first-run Shortlists tab, a Vendor's first week with no Enquiries — is
   still open, and an empty screen is the worst first impression a paid tool can give.
