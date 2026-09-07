# Ideation extract — feel, metaphor, closed doors

Mined 2026-09-06 for the UX design workflow. Sources read in full:

| Source | Verdict |
|---|---|
| `_bmad-output/brainstorming/brainstorming-session-2026-06-02-0603.md` (329 lines) | **Rich, but operational.** A service map + five frozen service specs + five pain-point tables. Almost no mood, colour or metaphor content. The *pain-point tables are the emotional gold* — they are written in the voice of a couple being let down. |
| `_bmad-output/party-mode/memories/installed/.memlog.md` (10 lines) | **Not about the product.** Five bullets about a Sept 2026 party-mode session judging a copied `coding-standards.md`. One usable process lesson. No product feel content. |
| `CHANGELOG.md` (96 lines) | **Usable.** It is the honest record of the site's visual and voice history, including two explicit rejections. |
| `README.md` (84 lines) | **Usable.** Names the design system, the palette intent and the prototype's boundaries. |
| Supporting (not requested, quoted where load-bearing): `styles.css` `:root`, `index.html` body copy | The only place an actual palette and voice exists on disk. |

---

## 1 · Emotional intent — verbatim

### The north star, stated once and never softened

> **North star:** **Hassle-free wedding.** Every service config must defend itself against this.
> — brainstorming, line 106

> a **hassle-free, fully-managed wedding experience**
> — brainstorming frontmatter, `session_topic`, line 4

> **Marketing takeaway:** Vivah Spot's core pitch = **transparency + trust + freedom** vs. the opaque, restrictive, surprise-fee status quo.
> — brainstorming, line 151

### The dominant emotional register is *relief*, not delight

This is the single most important finding for design direction. Count the marketing hooks:
almost every one is a **negation** — the promise is the removal of a fear, not the addition of a joy.

> _"The price you see is the price you pay"_ · _"What you see is what you get"_ · _"No crowding, guaranteed"_
> _"No sweating, no silence"_ · _"Compare in minutes, not weeks"_ (venue table, lines 140–149)

> _"Never run short"_ · _"No surprise bills"_ · _"Feed guests, not the bin"_ · _"No long lines"_ · _"Every plate, right"_
> — catering table, lines 198–205

> _"Your album, on time — guaranteed"_ · _"The photographer you pick is the one who shows up"_
> _"Your memories, your files"_ · _"Never lose a moment"_ · _"Your wedding, your call"_
> — photography table, lines 244–250

> _"No surprise add-ons"_ · _"Fresh on the day, guaranteed"_ · _"Ready before your first guest"_
> — décor table, lines 284–287

> _"One price, paid — no drama on the road"_ · _"Professional, every step"_ · _"On time, in tune"_
> — baraat table, lines 321–324

Compressed summaries, verbatim:

> **no shortage, no waste, no surprises** + a feel-good donation angle (line 207)
> **on time · the real shooter · nothing lost · no surprises** (line 252)
> **real looks · real flowers · real fit — no surprises** (line 289)
> **one fixed price · no roadside demands · on time · full josh** (line 327)

### The three positive-affect moments in the entire corpus

1. > **full josh** — baraat takeaway, line 327. The only Hindi/Marathi emotion-word used about the product.
2. > Relax and enjoy a perfectly planned celebration. — `index.html`, how-it-works step 4
3. > Browse → Compare → Book → **Celebrate** — CHANGELOG 0.3.0, the four-step model

Everything else is anxiety management. A designer should treat "calm, in control, nothing hidden"
as the primary feeling and "festive" as the *skin*, not the substance.

### The naming of the shame

The word choices about the failure state are stronger than the word choices about success:

> Food runs out — **a shameful shortage** (line 198)
> **baksheesh extortion** mid-procession (line 302) · **drunk / unruly band members** (line 322)
> **bait-and-switch** (junior shoots your day) (line 245) · **lost-footage nightmares** (line 228)
> Pinterest vs reality (**75% disappointed**) (line 282)
> Late / non-delivery (**months, sometimes never**) (line 244)
> Inflated capacity ("**fits 300**" really seats **220**") (line 143)
> Hidden charges — generator, GST, service charge, overtime (**₹1–2L for 2 hrs**), valet, cleanup (line 140)

These are the emotions the interface is competing with. They are public-humiliation-in-front-of-your-relatives
emotions, not inconvenience emotions.

### Voice: the tagline was deliberately de-sentimentalised

> **Tagline** changed site-wide from "Your Digital Partner for Life" → "**Big day, sorted.**"
> — CHANGELOG 0.7.0

A lifelong-companion promise was swapped for a *task-completed* promise. This is a direct,
recorded decision about how the product should feel: competent and done, not romantic and eternal.
`README.md` opens with **"Big day, sorted."** as the product's first line.

---

## 2 · Metaphors and analogies

**Honest finding: there is no "it should feel like X" metaphor anywhere in these documents.**
Nobody wrote a mood analogy, a brand comparison, or a spatial metaphor for the experience.
Do not invent one from the material below — these are structural, not emotional, metaphors.

What does exist:

- **The builder / kit-of-parts.** > **Baraat builder** — band / dhol-tasha + groom's ride (ghodi / baggi / vintage car) + light-boys + DJ-on-wheels + effects (cold-pyro / sparklers / flower shower) + dancers; à la carte **or** prebuilt packages (line 301). Catering repeats it: > **Menu:** course-structured builder — welcome drinks → starters → mains → live counters → sweets/dessert → paan; "pick N per course" (line 169). Assembly-with-guardrails is the recurring interaction shape.
- **The container hierarchy.** > **Wedding → Functions → Services.** (line 158) — a Wedding is a parent object; Functions (Haldi, Mehndi, Sangeet, Wedding, Reception + custom) each carry *their own date/time, venue and guest count*; every service attaches per function. The stated example is domestic and concrete: > (Haldi at home, Reception at a hall) (line 159).
- **The commitment ladder, not a checkout.** > Spectrum supported: _Enquire → Site visit → Token → Confirm._ (line 120)
- **The four-beat journey.** > Browse → Compare → Book → Celebrate (CHANGELOG 0.3.0)
- **A real website, not a stretched app.** > Optimised the large-screen experience to behave **like a real website instead of a stretched mobile app**. (CHANGELOG 0.6.0) — the only explicit "should be like X" in the corpus, and it is about layout.
- **Costume of discipline** — memlog line 6, Victor on the copied standards doc. About process, not the product. Noted so it is not mistaken for product material.

---

## 3 · The user's real situation

**Honest finding: there is no named couple, no anecdote, no transcript of a real person planning a wedding.**
The "Role Playing" technique was listed (line 43) but its output is not in the file. What survives is
demographic and cultural, not personal.

- **The founder's own town is the launch market.** > First launch market: Shrirampur, Maharashtra (**founder's native place**) (line 19). > **Shrirampur = launch city only;** built to scale to any city. (line 107)
- **Tier-3/Tier-4, not metro.** > Tier-3 town launch (Shrirampur, Maharashtra) (line 30) · > simplified for **Tier 4/3/2 launch** (line 295) · > enforcement is light in Tier 4/3/2 (line 311). Enforcement, permits and regulation are assumed *absent*, not present.
- **Maharashtrian, specifically — not generic North Indian.** The ritual vocabulary is regional and untranslated: **Sakharpuda** (engagement), **Kelvan** (family feasts), **Haldi / Halad**, **Devak / Ganesh puja**, **Vidaai / Pathavni**, **Griha Pravesh / Satyanarayan puja**, **mangal karyalaya**, **pangat** service style, **Paithani** attire, **aaher** return gifts, **dhol-tasha**, **ghodi / baggi**, **guruji + pooja samagri**, > traditional Maharashtrian thali (line 169). This is a design mandate: the UI cannot ship a generic "Indian wedding" taxonomy.
- **The extended family is the real user, not the couple.** The whole model is family-scale: guest counts, > **Kelvan / family feasts**, > saree draping/**family styling** (line 82), > **elderly/diabetic (sugar-free)** and **kids** special meals (line 173), > **satvik for rituals**. Diet is a religious constraint, not a preference: > pure-veg-only / Jain / satvik (no onion-garlic) / non-veg / halal (line 171).
- **Absent relatives are a first-class case.** > live streaming (**NRI kin**) (line 222).
- **Money is a real constraint, not a filter.** > user picks & chooses services **within a budget** (line 105) · > **Budget planning & tracking** 🧑‍💼 In-house (app) (line 66) · > **wedding loan / EMI** (➕) (line 97) · > **Budget-tier packages showing realistic looks per price** — _"See what your budget really gets"_ (lines 265, 283).

---

## 4 · Rejected — doors already closed

| Rejected | Where | Why / what replaced it |
|---|---|---|
| **The fully-managed package business** the session was convened to design | brainstorming lines 5, 19 vs. line 105 | Superseded by > **Product:** modular wedding-services **marketplace** — user picks & chooses services within a budget; each service offers multiple alternatives (first-party + 3rd-party vendors). The session's own stated goal ("Design hassle-free, **packaged** offerings") was overtaken by pick-and-choose. Hassle-free survived as the *feeling*; packages did not survive as the *mechanism*. |
| **Capex-heavy, own-everything operations** | line 60 | > Start ~90% managed-vendor + in-house manager (**asset-light, near-zero capex**). Pull services in-house only later. |
| **Separate photo and video vendors** | line 215 | > one **bundled photo + video** booking (not separate photo/video vendors). |
| **Per-couple décor mockups** | line 261 | > **Trust approach (kept light):** lean on verified real-event portfolios … **not per-couple mockups** → frictionless decorator onboarding + supply growth. Supply growth beat demand-side reassurance, deliberately. |
| **Staged inspiration shoots in décor portfolios** | lines 261, 282 | > **verified real-event portfolios** (no staged inspiration shoots) — _"Real weddings, not staged shoots"_. |
| **The tagline "Your Digital Partner for Life"** | CHANGELOG 0.7.0 | → "Big day, sorted." |
| **A ring / sparkle logo mark** | CHANGELOG 0.7.0 | > A ring/sparkle logo mark was **trialled and then removed per design direction**. The wordmark carries the brand instead: > two-tone "Vivah Spot" (gradient "Vivah" + plum "Spot"). |
| **Desktop as a stretched mobile app** | CHANGELOG 0.6.0 | Replaced at ≥1024px by document scroll, sticky two-row header, 1240px centred container, centred dialog instead of bottom-sheet. Mobile/tablet keep the app-shell. |
| **"Invitations" and "Pandit / Priest" as home categories** | CHANGELOG 0.3.0 | > Removed **Invitations** and **Pandit / Priest** categories (home grid + vendor dropdown). ⚠️ **Live contradiction** — the later brainstorming still maps both as services (line 68 invitation cards 🤝, line 81 Guruji + pooja samagri 🤝). UX must decide whether they return. |
| **Running a round-table when a direct question was asked** | memlog line 8 | > Abhishek cut the party short ('**my simple question was is this applicable**') … Lesson: **he wants the answer, not the round-table, when he asks a direct question.** Process note for how to run the UX workflow with him. |

### Deferred, explicitly out of scope for launch (not rejected)

> **Deferred to metro expansion:** Fireworks legality (green crackers / permitted window), noise-curfew automation, road-procession permits, animal-welfare options — enforcement is light in Tier 4/3/2, so out of scope for launch. (line 311)

---

## 5 · Raised and never resolved — open threads for UX

1. **The session stopped halfway.** Frontmatter says `stepsCompleted: [1, 2]` and `ideas_generated: []`. Phase 3 (Morphological Analysis → packages + revenue streams) and Phase 4 (Resource Constraints → lean Shrirampur MVP) **were never run**. Packages, pricing model and MVP scope do not exist in ideation.
2. **Anti-bypass is the biggest unresolved UX constraint.** > _Anti-bypass / revenue model: **deferred** (notes for later — **mask owner contact**, route payments & comms through platform, anti-circumvention clause, on-platform-only value)._ (line 130) Masking vendor phone numbers changes every screen in the app. Undecided.
3. **Named pending list.** > Pending: Shrirampur-specific gaps, in-house vs. asset-light decisions for core services, and conversion into packages (Phase 3). (line 99)
4. **Five services frozen out of ~50.** > _~50 services across the full lifecycle, each tagged with a handling model._ (line 99) Frozen: Venue, Catering, Photography, Décor & Mandap, Band Baaja Baraat. Everything else — makeup, mehndi, DJ, transport, accommodation, invites, gifting, honeymoon — is untouched.
5. **Escrow is invoked five times and specified nowhere.** > token via escrow (line 120) · > **Escrow-backed on-time delivery guarantee** — final payment held until the gallery/album is delivered … **delay penalty**; in-app **delivery tracker** (line 225) · > **On-time setup guarantee** (décor ready X hrs before the event, escrow-backed) (line 269). No flow, no dispute path, no refund UI.
6. **Headcount and billing rules are named, not decided.** > **smart buffer** (realistic attendance); **final-count cutoff** (line 172) · > **final billing on actual headcount** (per-plate × confirmed count; **buffer billing rules**) (line 188). The "no shortage, no waste" promise depends entirely on rules that were never written.
7. **Availability truth.** Every service demands > **date-wise availability** from the supply side, and cards show > ✅ Free / ⚠️ Few slots / ❌ Booked (line 118). Nothing says how a vendor keeps that honest, or what the badge means when they don't.
8. **⚠️ Vocabulary collision with the binding glossary.** The ideation doc and the live site are built on *booking*: "Book Now", "My Bookings", > Reserve your slot instantly with **secure payments** (index.html), > **Pay token → date fixed** (line 120), > **guaranteed** (used 8 times as a marketing hook). `CLAUDE.md` §6 records that **PRD §7.9 bans *booking, booked, cart, checkout, legally binding, guaranteed, enforced by Vivah Spot* outright**, and that the domain vocabulary is Enquiry / Quote / Agreement / Commitment / Shortlist / Selection. **Every marketing hook quoted in this file that contains "guaranteed" is currently unusable as UI copy.** This must be resolved before any screen copy is written — it is the largest single gap between the ideation feel and the shipped contract.

---

## 6 · Visual style, mood, colour, cultural register

**Honest finding: the brainstorming document contains no visual direction at all.** No colour, no
typography, no mood, no imagery brief. Everything below comes from `CHANGELOG.md`, `README.md`
and `styles.css` — i.e. from what was *built*, not from what was *imagined*.

### The one piece of visual vocabulary in ideation — and it belongs to the customer, not the brand

> style tags (**candid / cinematic / traditional / documentary**) — photography, line 231
> style/theme browse (**floral / royal / rustic / minimal / traditional**) — décor, line 264

Both ladders run traditional → modern and let the *user* choose. The product's own register is
never stated. That is a decision left open for UX.

### The built palette — "festive but tasteful"

> **Palette:** festive but tasteful — rose-pink `#e23e7a` primary with a pink→marigold gradient, plus per-category accents (green/orange/pink/blue/red/purple). — `README.md`

From `styles.css` `:root`:
`--bg: #fff7fb` (> soft pink-tinted white) · `--text: #3a2f37` (> deep plum-grey) · `--text-soft: #736570`
(> muted mauve-grey — darkened to meet WCAG AA) · `--accent: #e23e7a` (> vivid rose-pink) ·
`--grad: linear-gradient(135deg, #e23e7a 0%, #ff7a3d 100%)` (> pink → marigold) ·
festive set: `--c-orange: #ff7a3d` (> marigold), `--c-gold: #f5b301`, `--c-teal: #12b3a3`,
`--c-purple: #8b5cf6`, `--c-blue: #3b9ae1`, `--c-red: #ef4d5a`, `--c-green: #2bb673`.
Desktop backdrop: > soft, refined backdrop — `linear-gradient(135deg, #fbe7dd, #fad8e6, #e8defb)`.

**Marigold and rose are the culturally loaded choices** and they are the two colours in the primary
gradient. That is the only place the ideation's Indian-wedding register touched the pixels.

### Typography

`--font-head: 'Playfair Display'` (self-hosted variable serif, > no third-party requests) for
`h1, h2, .brand-name, .auth-title, .page-title`; body stays a system sans stack.
CHANGELOG 0.1.0 began > Festive, colorful theme; **default system font** — the display serif was added later.
**Trajectory: festive → festive-but-refined.**

### Surface treatment, as of the most recent pass (CHANGELOG 0.7.0)

> modern **glass cards**: icon-led inputs, focus rings, **gradient buttons**, **decorative background blobs**, and … **frosted section cards** with a staggered entrance
> **frosted app bar** + bottom tab bar; active tab gets a **soft accent pill** and a gradient indicator (mobile)
> gradient **profile hero** … **colored icon chips** … a distinct red **Log out** action

### Internal voice

The brainstorming document itself is written in an informal, emoji-led register —
🧑‍💼 in-house · 🤝 managed · 🛒 marketplace · ➕ add-on partner (lines 55–58), plus
✅ FROZEN · 🎯 MARKETING GOLD · 🧱 Structural Update · ⏱️ 🔒 🧾 🔐 💾 🚫💵 on features.
Warm, brisk, unceremonious. Not reverent about weddings.

### Imagery

> Photos in `images/` are sourced from **Pexels** (free for commercial use…). Swap for owned/branded media anytime — `README.md`.
Stock now, owned later. The ideation's own imagery demand runs the other way and is strict:
> **Verified real photos** + virtual tour — _"What you see is what you get"_ (line 142) ·
> **real food/plating photos** (line 177) · > **Full sample gallery** required (matching coverage level), verified (line 231) ·
> **verified real-event portfolios** (no staged inspiration shoots) (line 261).
**Design implication: the product's own marketing may not use aspirational stock imagery for vendor content
without contradicting its central promise.**

### Accessibility already committed

> skip links, `:focus-visible` outlines, `prefers-reduced-motion` support (CHANGELOG 0.5.0);
`--text-soft` was > darkened to meet WCAG AA (≈5.5:1 on white); the hero slideshow > holds the first image for reduced-motion users.

---

## 7 · Competitor and reference products named

**Honest finding: every name in the document is a *research source* for pain points, not a competitor
that was evaluated. Not one carries an opinion — nothing is called good, bad, admired or disliked.**
There is no competitive positioning material here.

| Named | Context | Sentiment recorded |
|---|---|---|
| **The Knot** (×4), **WeddingWire** (×3), **Quora** | > Sources: Quora, The Knot, WeddingWire + Indian venue/planner blogs (line 136) | none |
| **WedMeGood**, **Shaadidukaan**, **EventBazaar**, **DesiWeds**, **BollyWeds** | source lines 153, 209, 291 | none |
| **Velvet Knot** (×2), **District Events**, **Plannersy**, **Bharat Gangaram**, **Mini Punjab** | catering sources, line 209 | none |
| **PS Decor**, **Platinum Crown**, **Aurum**, **The Grange Hall** | > PS Decor (hidden charges; contract checklist) — line 153 | none |
| **FiftyFlowers**, **Stephanie Richer**, **B. Jones**, **Sudhir Rao (legal, India)** | décor + photography sources, lines 254, 291 | none |
| **Madhyamam**, **TheShaadiCoordinators**, **BookDholWala**, **LegalKart**, **BWC India** | baraat sources, line 329 | none |
| **Pinterest** | > Pinterest vs reality (75% disappointed) (line 282) | **The only negatively-framed named product** — and it is framed as a *cause of disappointment*, the expectation-gap the décor feature exists to close. |
| **Pexels** | `README.md` — prototype image source | neutral |

The only thing explicitly positioned *against* is unnamed and structural:

> vs. the **opaque, restrictive, surprise-fee status quo** (line 151)

---

## 8 · Business and trust concerns that shape the interface

Trust is not a feature area here — it is the product. Every frozen service carries a trust mechanism.

**Verification gates (supply cannot go live without them)**
> **Verified before going live** (real owner, real photos, license/compliance) — venue, line 125
> **license/compliance badge** — venue config, line 128
> **FSSAI + hygiene + insurance** — caterer onboarding, line 177
> **Full sample gallery** required (matching coverage level), **verified** — photography, line 231
> Tasting + FSSAI/insurance badges + real reviews — _"Taste before you trust"_ — line 205
> **Verified reviews from real bookings** — _"Reviews you can trust"_ — line 149

**Escrow and guarantees (money as the trust instrument)**
> **Pay token → date fixed** → digital agreement (**token via escrow**) — line 120
> **⏱️ Escrow-backed on-time delivery guarantee** — final payment held until the gallery/album is delivered by the promised date; **delay penalty**; in-app **delivery tracker** — line 225
> **On-time setup guarantee** (décor ready X hrs before the event, escrow-backed) + **mandatory site visit** — line 269
> **🚫💵 No on-the-spot-demands guarantee** — **fully prepaid via platform, zero baksheesh extortion mid-procession** — line 302

**Anti-substitution and anti-circumvention**
> **🔒 Named-shooter lock** — the specific photographer/team is locked in the contract … **kills bait-and-switch** — line 226
> **💾 Backup-shooter + dual-card/cloud-backup guarantee** — no lost-footage nightmares — line 228
> _Anti-bypass … **mask owner contact**, route payments & comms through platform, anti-circumvention clause, on-platform-only value_ — line 130 (**deferred**)

**Price legibility as a trust device — the most repeated demand in the document**
> **all-inclusive price breakdown** (rent + taxes + service charge + generator + valet) · **overtime rate/hr** — line 128
> **All-in transparent per-plate** + line-item breakdown (**no 25–40% hidden inflation**) — line 181
> Pricing: base + **explicit overtime rate** + travel/stay; **no hidden album/RAW/copy charges** — line 220
> **All-in transparent pricing** — travel, power/electricity, cleanup/restoration, overtime spelled out — line 267
> **All-in transparent pricing** — GST, travel, equipment (mics/speakers/amps), duration spelled out — line 303
> Side-by-side compare on standard fields — _"Compare in minutes, not weeks"_ — line 148

Every service specifies pricing as a **line-item breakdown**, never a single number. The UI's
central object is arguably the itemised, comparable price card.

**Freedom from lock-in**
> Vendor policy shown upfront + filter for open venues — _"**Your wedding, your vendors**"_ — line 141
> **vendor policy** (outside caterer allowed? penalty?) · décor/music/alcohol rules — line 128
> restricted only when a venue contractually limits outside décor (gated by the venue's décor policy: **open / empanelled-only / in-house-only**) — line 260

**Consent and privacy**
> **🔐 Privacy/consent toggle** — couple controls whether the studio may showcase their wedding publicly — _"Your wedding, your call"_ — lines 227, 250
> usage-rights consent captured — line 234
> Explicit **RAW policy** upfront — _"Your memories, your files"_ — line 248

**Cross-vendor coordination as a trust promise**
> **Auto venue-compatibility check** (kitchen / power / space + vendor policy) — catering, line 185
> **Auto venue-aware** — platform auto-shares the chosen venue's photos / dimensions / power with the decorator → accurate quote, no space mismatch — line 268
> **On-time arrival guarantee** + **slot coordination with venue & DJ** — line 304

**Social good, used as a marketing asset**
> **Leftover-donation** tie-up (NGO) — CSR + marketing — line 183 · _"Feed guests, not the bin"_ — line 202

---

## 9 · Honest assessment of what was here

- The brainstorming document is **a strong requirements artefact and a weak mood artefact.** It is 329 lines
  of service taxonomy, config fields and pain-point tables. The *feel* has to be reverse-engineered from
  its marketing hooks — which, fortunately, are quotable and consistent.
- **The single strongest usable signal** is that ~35 of the ~36 marketing hooks are negations. The product's
  emotional job is removing dread. "Festive" is the decoration; "nothing will go wrong in front of your family"
  is the promise.
- **There is no metaphor, no persona, no anecdote, no mood board, and no colour direction in ideation.**
  A designer asking "what should this feel like, in the founder's words?" gets exactly two answers:
  *hassle-free* and *big day, sorted*. Anything richer must be created, not recovered.
- **The regional specificity is the most under-exploited asset.** Sakharpuda, Kelvan, pangat, Paithani,
  aaher, dhol-tasha, mangal karyalaya, Devak — this vocabulary is precise, Maharashtrian and completely
  absent from the built prototype's six generic categories.
- **The party-mode memlog is irrelevant to product feel.** It documents a September session about a
  copied coding-standards file. Its one transferable line is that the founder wants answers, not round-tables.
- **The most urgent open item is not aesthetic but lexical**: the ideation's entire vocabulary
  (*book, booking, guaranteed, secure payments, pay token*) is banned by the current PRD §7.9 glossary
  recorded in `CLAUDE.md`. Screen copy cannot be written from these hooks as-is.
