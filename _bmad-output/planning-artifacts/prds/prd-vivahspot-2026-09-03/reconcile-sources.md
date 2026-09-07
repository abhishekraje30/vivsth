# Source Reconciliation — PRD vs. its inputs

**Date:** 2026-09-05
**PRD reconciled:** `prd.md` (draft, 2026-09-03/05)
**Sources:** `VivahSpot-Scope-Document.md` v2.0 (awaiting client sign-off) · `VivahSpot-Tech-Stack.md` · `brainstorming-session-2026-06-02-0603.md` · `research-landscape.md` · the prototype code and `packages/shared/src/tokens.js`

**Purpose:** find what the PRD silently lost. The PRD sets its own standard in §0 — "Anywhere this document is silent or vague, an agent downstream will decide for itself, and that decision will be nobody's." This document is a list of the places it is silent.

**Headline:** the PRD is exceptional on structure, logic and legal posture, and it is where every hard decision was actually made. What it lost is almost entirely of one kind: **the product's feel, its promises, and its cultural specificity.** The FR form kept every mechanism and discarded every adjective. Twenty-six divergences from the client-facing scope document are listed in §3; the author must take them to Pravin.

---

## 1. Dropped substance

Things a source states that the PRD does not carry and should.

### 1.1 The north star

Scope §1: "**North star:** a **hassle-free wedding** — transparency, trust, and one place to plan everything."
Brainstorm, Confirmed Direction: "**North star: Hassle-free wedding. Every service config must defend itself against this.**"

The word "hassle" appears **zero times** in the PRD.

This is not a missing sentence, it is a missing test. The brainstorm gave the north star a job — every service configuration has to defend itself against it — and the PRD commits to a ~50-Service catalog configured by Admin (FR-62) with no criterion at all for whether a configuration is any good. Scope §4 calls the Workspace "*the hassle-free layer (the moat)*"; PRD 4.2 calls it "the product's retention." Retention is a metric you measure afterwards; hassle-free is a promise you design against. The substitution is the whole qualitative loss in miniature.

The PRD's §1 Vision is very good prose, but it is a *problem statement* — it says what is broken and what the platform does. It never says what the family should feel. FR-8 comes closest ("the planner carries as little as possible", 4.2) and it is the best paragraph in the document for exactly that reason. It should be promoted to a stated principle governing every group, not left as one group's preamble.

### 1.2 The five frozen service specifications

Scope §6 froze five services and their signature features. The PRD's Glossary acknowledges them — "Five carry detailed frozen specifications in the scope document" — and then carries **none of the specifications**. Full audit in §2.4 below. This is the largest single drop in the document.

The mechanism the scope built for their survival is also half-empty. Scope §6: "Signature features are restated as **published vendor commitments**." The PRD created exactly the right vehicle — the Glossary term **Commitment**, "a Vendor-declared, publicly published promise" — and then populated it with three items only: "delivery timeline, inclusions, no hidden charges." Everything else that was supposed to ride in that vehicle was left on the platform.

### 1.3 Checklist and timeline

Scope §5.1: "**Checklist & timeline** (muhurat-aware)". Scope §4: the Workspace is "dashboard, budget tracker, guest management, **checklist/timeline**, shortlists, enquiry tracking, **reminders**". Scope §10 Phase 1 ships it. Tech-Stack §5 keeps it ("Wedding Workspace | **Strengthen.** Budget tracker, functions, checklist, guest list").

The PRD mentions "checklist" **once**, inside the Glossary definition of Workspace, and never again. There is no FR for it. FR-10 "One view of the whole wedding" enumerates what the view carries — Functions, Shortlists, Enquiries, running total, Chosen Block — and the checklist is not among them. The term is defined and then never required, which is the worst of both: a downstream agent reads the Glossary, sees a checklist is part of the Workspace, and invents one.

Same for **reminders** on the family's side. FR-29 nudges Vendors, FR-53 reminds Vendors about expiry. Nothing reminds Rutuja of anything.

### 1.4 Notifications as a capability

Scope §7 and §5.1: "**Notifications & reminders** (app + SMS/WhatsApp)". Tech-Stack §4: "WhatsApp Business API via Meta Cloud API ... as the primary channel, **SMS as fallback**, push via Expo Notifications."

The PRD names delivery channels in passing — FR-29 and FR-35 say WhatsApp for the Vendor, FR-35 says "in the app" for the family — and has **no notification requirement anywhere**. No FR governs delivery, fallback, failure, or what happens when a WhatsApp message does not land. SMS and push are not mentioned in the PRD at all.

This matters more than it looks. Two of the platform's load-bearing mechanisms are messages: FR-29's nudge is described in FR-13 and 5.6 as *the sole safeguard* for calendar accuracy, and FR-53's expiry reminder is what keeps a lapsing Vendor from vanishing silently. Both are specified as things the platform sends and neither is specified as a thing that must arrive.

### 1.5 Vendor self-onboarding

Scope §2 objective 3: "Enable **vendor self-onboarding** to grow supply asset-light." Scope §5.2, first bullet: "**Self-onboarding & KYC/verification**." Scope §3: vendors "**self-onboard**, subscribe, list offerings".

There is no FR for vendor sign-up or onboarding. FR-1 is phone+OTP sign-in for everyone; FR-58 is Admin-side Verification. The Vendor's own path — creating the account, entering the business, submitting for verification, reaching a published Listing — is unspecified.

**SM-1 measures it anyway:** "median time from a Vendor starting sign-up to their Listing being published; proportion of started onboardings that reach a published Listing." The PRD's first success metric measures a flow the PRD does not describe. For an autonomous build this is a guaranteed improvisation, on the supply side, which is the launch-critical path.

### 1.6 Admin business operations

Scope §5.3 gives Admin two responsibilities the PRD does not carry:

- "**Subscription & billing management:** plans, pricing, manual overrides, comps, expiry, GST invoicing, revenue reporting"
- "**Reports & analytics** (supply, demand, leads generated, subscription revenue, churn)"

PRD 4.13 has four FRs — attribution, catalog configuration, intermediary obligations, disclosure. There is no way for Admin to create a plan, set a price, issue a comp, override a term, or see revenue. FR-50 says "Tier prices are a business input, set outside this document," which settles *what the price is* and leaves unaddressed *where anyone types it in*.

The reporting gap is worse because the PRD's own metrics depend on it. SM-2 needs renewal rate, SM-7 needs "Vendors per Service per place" and "the proportion of Candidate Blocks that clear a family's whole Shortlist" — SM-7 calls that last one "the honest test of whether matching is doing anything." Nothing in the platform produces any of these numbers for the people running it. Vendors get a dashboard (4.11); the client does not.

### 1.7 Smaller drops

| Dropped | Source | Note |
|---|---|---|
| **Virtual tour request** | Scope §6 Venue signature features | Zero occurrences. FR-38 carries site visits only. |
| **Downloadable quote/agreement template for offline use** | Scope §4 blueprint step 6 | Replaced by the in-app Agreement. FR-40's "download a copy" of a *confirmed* Agreement is a different artifact — the template was for parties who never confirm anything in-app. |
| **QR check-in** | Scope §6, Digital & Money | Zero occurrences. FR-12 builds the RSVP page but nothing at the door. |
| **Budget tiers** | Scope §4 blueprint step 3; brainstorm Décor | FR-18 has a budget *filter*. The tier concept — "budget-tier packages showing realistic looks per price" — is gone, and with it the answer to "dream vs budget sticker shock". |
| **Leftover-donation NGO tie-up** | Brainstorm, Catering signature features | "CSR + marketing". Never reached the scope's frozen table, so lowest priority — but it was the only feature in the corpus that made the product likeable rather than merely useful. |
| **Performance numbers** | Tech-Stack §1 | "install size under ~30MB, cold start under 2s". PRD 5.3 is entirely qualitative. A document demanding "decision closure" left its only numeric NFR targets behind. |
| **Venue field set** | Brainstorm, frozen #1 | Comfortable/floating capacity vs seated, overtime rate/hr, power-backup scope in KVA, inclusions checklist, parking capacity, licence/compliance badge. PRD has one generic "sizing attribute". See §2.4. |
| **Catering engine** | Brainstorm, frozen #2 | Course-structured menu builder, community menu templates ("traditional Maharashtrian thali"), diet/religious profile (pure-veg / Jain / satvik no-onion-garlic / non-veg / halal), service style (pangat / buffet / plated), staff ratio, special meals. Zero occurrences of "menu". See §2.4 and 1.8. |

### 1.8 The qualified Enquiry is less qualified than the sources required

PRD 4.7 makes a strong claim: "An Enquiry is where Vivah Spot's advantage over every competing platform actually shows... **That is the answer to the lead-quality complaint that drives vendors off other platforms**."

FR-34's payload is: Chosen or Candidate Block, Functions with days and Slots, guest count, budget context, and which Space is being asked about.

Against the frozen specs, a caterer receiving that still cannot quote. The brainstorm's catering order carries meal type, menu, **diet/religious profile**, service style, staff ratio, special meals. A decorator cannot quote either — Scope §8 promises "**Venue-awareness** | Services auto-adapt to the chosen venue," and the brainstorm is specific about what that means: "platform auto-shares the chosen venue's **photos / dimensions / power** with the decorator → accurate quote, no space mismatch." FR-34 carries none of it.

The fix is structural and cheap: FR-62 already lets Admin configure a Service's fields. The Enquiry payload should be **per-Service configurable in the same act** — the Service declares what a Vendor needs in order to quote, and the Enquiry carries it. As written, every Service sends the same five facts, which is more than incumbents send and less than the scope promised.

### 1.9 Self-acknowledged incompleteness

PRD §5 carries its own warning: "*Cross-cutting requirements. Written as they are settled; **the section is incomplete**.*" Noted here so it is not mistaken for a finding — but against §0's standard, an incomplete NFR section in a chain-top artifact is the single most expensive kind of silence.

Minor: FR-32 and FR-33 appear inside group 4.5 between FR-25 and FR-26. The PRD promises global numbering "so that references survive any later reorganisation"; out-of-order insertion is harmless to references but signals the numbers were assigned after the fact.

---

## 2. Qualitative loss

This is the section that matters. Nothing below is a mechanism failure — the PRD's mechanisms are better than its sources'. What is gone is everything that told anyone downstream how the product should feel.

### 2.1 Brand identity: total loss

The PRD contains **zero** occurrences of: `Big day, sorted`, `pink`, `Playfair`, `tagline`, `brand`, or any colour value.

What exists, already built, already codified:

**Tagline** — `Big day, sorted.`
- `/home/abhishekraje30/.sspl/vivsth/index.html:167` — `<span class="brand-tagline">Big day, sorted.</span>`
- `/home/abhishekraje30/.sspl/vivsth/index.html:409` — `<p>© 2026 Vivah Spot · Big day, sorted.</p>`
- `/home/abhishekraje30/.sspl/vivsth/apps/mobile/src/app/index.tsx:66` — already shipping in the Expo app
- `CHANGELOG.md:27` records it as a deliberate replacement: *"**Tagline** changed site-wide from 'Your Digital Partner for Life' → 'Big day, sorted.'"*

Note what the tagline *is*: it is the north star of §1.1, compressed to three words. "Hassle-free wedding" and "Big day, sorted." are the same promise. The PRD dropped both halves of the same idea independently.

**Palette** — `/home/abhishekraje30/.sspl/vivsth/styles.css:13-42`, mirrored in `/home/abhishekraje30/.sspl/vivsth/packages/shared/src/tokens.js`:

```css
--bg: #fff7fb;          /* soft pink-tinted white */
--text: #3a2f37;        /* deep plum-grey */
--text-soft: #736570;   /* muted mauve-grey — darkened to meet WCAG AA (≈5.5:1 on white) */
--accent: #e23e7a;      /* vivid rose-pink */
--accent-dark: #c62368;
--accent-soft: #fde7f0; /* pink wash */
/* Festive palette (wedding) */
--c-pink: #e23e7a; --c-orange: #ff7a3d; /* marigold */ --c-gold: #f5b301;
--c-teal: #12b3a3; --c-purple: #8b5cf6; --c-blue: #3b9ae1;
--c-red: #ef4d5a;  --c-green: #2bb673;
--grad: linear-gradient(135deg, #e23e7a 0%, #ff7a3d 100%); /* pink → marigold */
--shadow: 0 4px 16px rgba(180, 50, 110, 0.08);
--font-head: 'Playfair Display', Georgia, 'Times New Roman', serif;
```

Body type is a system sans stack. The wordmark is two-tone: gradient "Vivah" + plum "Spot" (`styles.css:114-121`). The shadow is deliberately pink-tinted, not neutral grey. `tokens.js` declares itself *"THE single source of truth for colour and type"* and *"Mirrors the `:root` custom properties in the prototype's `styles.css`, which is the design spec for both clients."*

That is a real, coherent, culturally-argued identity: rose-pink and marigold are Indian wedding colours, and a display serif over system sans is a considered pairing, not a default.

**The PRD is the chain-top artifact for `bmad-ux`.** It says so in §0. It is silent on all of the above. `bmad-ux` will invent a palette, and it will be nobody's.

Sharpest instance: NFR 5.8 keeps the *accessibility rule* — "Family-facing surfaces meet WCAG 2.1 AA" — and drops the value that rule already produced. `tokens.js:24` carries the note verbatim: *"Darkened in the prototype to meet WCAG AA (~5.5:1 on white) — **do not lighten**."* The PRD kept the constraint and lost the answer, so the work will be redone and the specific instruction not to lighten `#736570` will not survive.

**Minimum fix:** one NFR subsection — "5.9 Identity" — naming the tagline, pointing at `packages/shared/src/tokens.js` as binding, and stating that the palette, the wordmark treatment and the Playfair/system-sans pairing are fixed. Three sentences closes the whole gap.

### 2.2 Voice: prohibitions without a register

The PRD gives downstream agents a great deal of guidance on **what they may not say**:

- 7.9 bans *booking*, *cart*, *checkout*, *legally binding*, *guaranteed*, *v1*, *MVP*, *Phase N*
- 5.6 bans any claim of enforcement, underwriting or assurance
- FR-13, FR-19, FR-29 mandate "shows available", never asserted

It gives them **nothing on what they should say**. There is no tone, no register, no example of good copy anywhere in 1,154 lines.

The sources are full of it. The brainstorm's five pain-point tables carry ~36 hooks written in the family's own voice, and they are the best-written thing in the corpus:

> *"The price you see is the price you pay"* · *"Your wedding, your vendors"* · *"No crowding, guaranteed"* · *"No sweating, no silence"* · *"Never run short"* · *"Feed guests, not the bin"* · *"Pay for the plates that matter"* · *"Taste before you trust"* · *"The photographer you pick is the one who shows up"* · *"Your memories, your files"* · *"Never lose a moment"* · *"Real weddings, not staged shoots"* · *"See what your budget really gets"* · *"Ready before your first guest"* · *"One price, paid — no drama on the road"* · *"On time, in tune"* · *"full josh"*

And the three marketing takeaways:

> "Vivah Spot's core pitch = **transparency + trust + freedom**"
> "Catering pitch = **no shortage, no waste, no surprises**"
> "Photography pitch = **on time · the real shooter · nothing lost · no surprises**"

Not one line survives. Several of these are now unsayable — *"guaranteed"* is banned by 7.9 and rightly so — but the register is not the problem; the register is the asset. "No crowding, guaranteed" becomes "No crowding." and loses nothing.

The prototype has a voice too, and it is consistent: warm, second-person, always offering a way forward.

> `No saved vendors` / `Tap the heart on any vendor to save them here for later.` (`account/favourites.html:33-35`)
> `We couldn't find that page. Let's get you back to planning.` (`404.html:30-33`)
> `Pick at least 2 vendors` / `Tap Compare on any vendor card, then come back here to see them side by side.` (`compare.html:71-73`)
> `It's free — takes less than a minute.` (`index.html:360`)

That register — never blame the user, always name the next tap — is a design decision worth one line in the PRD and currently has none.

**Consequence if unfixed:** the PRD's prohibitions are strong and its permissions are absent, so a downstream agent optimising for compliance will write a legally immaculate product that reads like a form. The emotional distance between "Never run short" and "the Service's own sizing attribute" is the distance between a product a family in Shrirampur wants and one it tolerates.

### 2.3 Cultural framing: flattened to generic Indian English

The sources are saturated with Maharashtrian specificity. Scope §6's catalog names **Sakharpuda · Kelvan · Devak/Ganesh puja · Vidaai/Pathavni · Griha Pravesh / Satyanarayan puja**, and the brainstorm adds **mangal karyalaya · pangat · aaher · Paithani · dhol-tasha · ghodi/baggi · traditional Maharashtrian thali · satvik (no onion-garlic)**.

The PRD's Function set is "**Haldi, Mehndi, Sangeet, Wedding, Reception**, or custom" (FR-9, Glossary). Everything else is "custom". Sakharpuda, Kelvan, Devak, Vidaai and Griha Pravesh — five named ceremonies from the client-facing document, in the launch market's own tradition — appear nowhere in the PRD.

Scope §6's ~90-item catalog is compressed to one Glossary sentence: "The platform carries the full wedding catalog across pre-wedding, wedding-day and post-wedding categories." That is a pointer, not a list. FR-62 says Admin configures Services without a release — correct — but there is no catalog for Admin to configure *from*, and the memlog is explicit that the full catalog is "the single largest engineering bet in the product." The bet is recorded; the thing being bet on is not.

What did survive, and deserves credit: **muhurat** (6 occurrences, load-bearing in FR-26, FR-30, NFR 5.4), **Chaturmas** (2, including Dattatray pricing his dead months), and the guruji in UJ-1. The seasonality framing is genuinely well carried. It is the *ritual vocabulary* that is gone.

The prototype code is already generic pan-Indian English — the only Indic words in any shipping string are the wordmark "Vivah", the category label "Makeup & Mehndi", and the ₹ glyph. So the drift is not new. But the PRD was the last artifact that could have arrested it, and instead it ratified it.

### 2.4 The five frozen services, feature by feature

Scope §6 is the client-facing table. Verdict per element:

#### Venue
*"All-in transparent pricing · availability calendar/badge · vendor-policy field (outside caterer allowed?) · verified real photos · site visit / virtual tour request · downloadable agreement template"*

| Feature | Verdict |
|---|---|
| All-in transparent pricing | **CARRIED, strengthened** — FR-19, FR-26, FR-59 make it a condition of listing at every tier |
| Availability calendar / badge | **CARRIED, transformed** — FR-28 + FR-13, now Block-level and attributed ("shows available"). The brainstorm's ✅/⚠️/❌ badge vocabulary is correctly superseded by 5.6's attribution rule |
| Vendor-policy field | **CARRIED, strongly elevated** — FR-24 makes Rules a condition of listing *and* an enforced constraint; FR-32 surfaces conflicts before they bite. The best upgrade in the document |
| Verified real photos | **CARRIED** — FR-27, FR-58 |
| Site visit | **CARRIED** — FR-38 |
| Virtual tour request | **DROPPED** — zero occurrences |
| Downloadable agreement template | **REPLACED** — by the in-app Agreement (4.8). The offline template is gone |

#### Catering
*"Per-function planning · **'no shortage, no waste' headcount calculator** · all-in per-plate pricing · tasting request · published hygiene & freshness commitment"*

| Feature | Verdict |
|---|---|
| Per-function planning | **CARRIED** — FR-14's per-Function engagement model |
| **"No shortage, no waste" headcount calculator** | **DROPPED — and affirmatively excluded** |
| All-in per-plate pricing | **CARRIED** — FR-26 ("per head") |
| Tasting request | **DROPPED** — zero occurrences; FR-38 covers site visits only |
| Published hygiene & freshness commitment | **DROPPED** — the Glossary's Commitment lists only delivery timeline, inclusions, no hidden charges. FSSAI appears nowhere |

The headcount calculator is **the single biggest qualitative loss in the PRD.** The phrase "no shortage, no waste" appears nowhere. Worse than absent, it is excluded: §7.6 rules out "**sizing an order from guest data without the family deciding**." FR-11 gets as far as "Confirmed RSVP counts update the Function's headcount automatically, and that headcount is what travels with an Enquiry" — a raw count. The brainstorm specified something else: guest count **plus a smart buffer for realistic attendance**, plus a final-count cutoff, answering the two loudest catering complaints ("Food runs out — a shameful shortage" and "Massive food waste (200–300 dishes)") on the largest line item in an Indian wedding.

7.6's principle is right and should stand. But a calculator that *suggests* and the family *confirms* satisfies 7.6 exactly, and no one appears to have considered it: there is no memlog entry for the headcount calculator at all. It was not decided against. It was lost.

#### Photography
*"Bundled photo+video packages · **published delivery timeline, tracked and reviewed** · **named-shooter lock** · all-in deliverables list · privacy toggle"*

| Feature | Verdict |
|---|---|
| Bundled photo+video packages | **UNADDRESSED** — "package" appears twice, both in exclusions. 7.3 rules out vendor-authored packages, so a bundled offer is now just a Listing with a price. Probably fine; unrecorded |
| **Published delivery timeline, tracked and reviewed** | **CARRIED AND MADE LOAD-BEARING** — the best carry in the document |
| **Named-shooter lock** | **DROPPED** — zero occurrences of "shooter" |
| All-in deliverables list | **PARTIAL** — FR-21 compares "deliverables and delivery timeline"; nothing requires them itemised on the Listing. RAW-file policy, album, drone, travel, extra copies all gone |
| Privacy / consent toggle | **DROPPED** |

Two notes.

**Delivery timeline is a genuine improvement** and the PRD knows it: the Delivery glossary term plus FR-45 ("A Vendor can open the window early by delivering early. **A Vendor cannot hold it shut by delivering late**") turns a published promise into an enforceable one, and the PRD says so — "This is what makes the published delivery timeline in Scope §6 load-bearing rather than decorative." That is the model of what should have happened to the other nineteen features.

**Named-shooter lock is a real loss.** The brainstorm calls it the answer to bait-and-switch ("junior shoots your day"), one of the most-cited complaints in the category, with the hook *"The photographer you pick is the one who shows up."* FR-39's Agreement terms are "the days and Slots, the Space or offering, the guest count, the all-in price, what is included, and the Rules" — no named individual. Note that 7.8's ban on multi-user Vendor accounts does **not** cover this: a named person on an Agreement is a data field, not a login.

**Privacy toggle is worse than a drop — it leaves an inconsistency.** FR-27 lets a Vendor publish "photographs of events the Vendor actually delivered" with **no couple consent gate at all**, while NFR 5.5 requires that "Consent is specific, informed and separately given for each purpose." FR-66 handles consent in the opposite direction (the family publishes, the Vendor may decline credit). The couple's control over the studio showcasing their wedding — the brainstorm's *"Your wedding, your call"* — is absent, and its absence contradicts the PRD's own data-protection posture.

#### Décor & Mandap
*"**Verified real-event portfolios** (our strongest anti-fraud check) · all-in line-item pricing · **auto venue-aware sizing** · published setup-time commitment"*

| Feature | Verdict |
|---|---|
| Verified real-event portfolios | **CARRIED** — FR-27, FR-58. The scope's emphasis ("our strongest anti-fraud check") is not carried |
| All-in **line-item** pricing | **PARTIAL** — FR-26 requires all-in pricing; the line-item breakdown (mandap / stage / floral / entrance / lighting) is required nowhere |
| **Auto venue-aware sizing** | **DROPPED — and quietly substituted** |
| Published setup-time commitment | **DROPPED** |

**Venue-awareness needs flagging carefully, because the memlog believes it was carried and it was not.** Scope §8 lists it as a standing differentiator: "Venue-awareness | Services auto-adapt to the chosen venue. **Pure software; unaffected by the model change.**" The brainstorm defines it: "platform auto-shares the chosen venue's photos / dimensions / power with the decorator → accurate quote, no space mismatch." The memlog (line 47) records FR-24/FR-25 as "the venue-awareness Scope 4/8 promised."

It is not the same feature. FR-24/FR-25 are **rule-based restriction** — the venue's Rules limit which caterer the family may choose. Venue-awareness is **data propagation** — the venue's dimensions and power reach the decorator so the quote fits. They solve different problems, and FR-34's Enquiry payload carries neither dimensions, nor power, nor venue photos. The decorator still quotes blind. This is the one place where a divergence was made by accident rather than by decision.

**Setup-time commitment** is half-answered elegantly and half-lost. FR-14's span model removes the *scheduling* problem outright — "a decorator striking the Haldi set and building the mandap overnight is working inside the family's own engagement... **There is no setup or teardown window to declare**." Genuinely excellent. But the *commitment* — décor ready X hours before the event, published and reviewable, *"Ready before your first guest"* — is gone, and the span model does not replace it.

#### Band Baaja Baraat
*"Baraat builder · all-in pricing · **published 'no on-the-spot demands' declaration** with complaint reporting that affects vendor standing · vetted crews"*

| Feature | Verdict |
|---|---|
| Baraat builder | **DROPPED** — zero occurrences. Arguably superseded by 7.3 (no bundles) + Shortlist assembly, but nobody wrote that down |
| All-in pricing | **CARRIED** |
| **"No on-the-spot demands" declaration** | **DROPPED**, and its enforcement **deliberately removed** |
| Vetted crews | **PARTIAL** — FR-58 verifies the Vendor's identity, registration and portfolio. Crews are not verified; "manager-led crews" is gone |

The "no on-the-spot demands" entry deserves its own note because it is **an unflagged divergence hiding inside a flagged one**. The declaration itself is simply absent (Commitment covers three things and this is not one). Its enforcement half — "with complaint reporting that affects vendor standing" — is explicitly excluded by 7.2 ("any complaint pipeline that leads to a consequence, vendor standing scores"). PRD 7.2 flags that it supersedes Scope §2 objective 4, §5.3 and §8. It does **not** flag Scope §6 Band Baaja, which is where that same mechanism was sold to the client as a frozen signature feature.

Also worth noting: the original guarantee rested on prepayment through the platform ("fully prepaid via platform, zero baksheesh extortion mid-procession"). With no money on the platform, the *guarantee* was always impossible — Scope §6's revision correctly downgraded it to a declaration. The PRD dropped the declaration too, which was not required.

#### Tally

Of ~24 named elements across the five frozen services: **8 carried intact · 4 carried and strengthened · 4 partial · 8 dropped outright.**

Every one of the five loses at least one named signature feature. Three of five lose the feature the scope itself set in bold as the differentiator: catering's headcount calculator, décor's venue-aware sizing, band's no-on-the-spot-demands declaration. Photography loses the named-shooter lock, which the brainstorm rated as the answer to the category's second-most-cited complaint.

**The structural fix is one change, not twenty.** The Glossary's **Commitment** is already the right vehicle — a Vendor-declared, publicly published promise, not underwritten by the platform. Widen it from three fixed items to **per-Service configurable declarations**, set by Admin under FR-62 alongside the Service's fields and filters, and require each frozen Service's declarations as configuration content in the PRD. Every dropped feature above except the headcount calculator and venue-aware data-sharing then flows through a mechanism the PRD already has.

---

## 3. Divergences from the client-facing scope document

The scope document is **v2.0, "Awaiting client sign-off," prepared for Pravin Revale**, and §14 makes any requirement outside it a Change Request. Every item below is a place where the document Pravin is being asked to sign promises something the build will not do, or the build does something the document does not describe.

**Count: 26.** The PRD flags 3 of them in its own text (D1, D4, D26-partial). The other 23 are undeclared.

The memlog (line 25) records that "Pravin has given Abhishek A FULL FREE HAND on product decisions" and that approval items are settled at Abhishek's discretion. That governs *whether* they need approval. It does not remove the need to **correct the document before signature** — a signed scope that contradicts the build is a change-control problem regardless of who had authority.

| # | Scope document promises | PRD says instead | Flagged? |
|---|---|---|---|
| **D1** | §2 obj.4 "removal of vendors who fail — as the **core differentiator**"; §5.3 "vendor standing & delisting — **the primary enforcement lever**"; §8 "**This is the enforcement lever**"; §4 step 7 "delisting for non-performance" | 7.2 + FR-60: removal only for fraud, falsified Verification, stolen portfolio, impersonation — "**not for service quality**". "No complaint pipeline, standing score or automated delisting exists." | ✅ 7.2 |
| **D2** | §3 and §5.3: Admin does "**complaint handling**" | 7.2 excludes any complaint pipeline leading to a consequence. Only FR-47 disputes and FR-63 grievance-officer obligations remain | ✗ |
| **D3** | §8 differentiator: "Free to couples \| No fee and no commission means **search ranking is not for sale to the highest bidder**" | FR-20 + FR-50: the Featured tier buys placement in a marked band. **Ranking is sold.** Organic position is not | ✗ |
| **D4** | §9 "Android-first... **iOS deferred**"; §11 "iOS application (deferred)"; §13 Deliverables "Customer application (**Android** mobile app)" | 5.2: "both Android and iOS. **iOS is not deferred.**" Expands §13 Deliverables | ✅ 5.2 |
| **D5** | §3 "Often **elder-led, low-to-medium digital literacy** → must be simple"; §9 "low-digital-literacy-friendly" | §2.1: "a sister, a son, a cousin... **of no particular age**." Memlog: "Do not design down; no age-based or literacy-based simplification premise" | ✗ |
| **D6** | §5.1 and §7: "Budget tracker (**couple-entered** planned vs actual)" | FR-8: "**The budget fills itself in**... She is never required to enter a figure for the platform's benefit" | ✗ |
| **D7** | §5.1 "Reviews & ratings (after an **enquiry** reaches completion)"; §8 "Reviews are tied to real **enquiries**" | FR-44: rights come from an **Agreement that reached Delivery**, "and from nothing else. **Enquiring... earns nothing**" | ✗ |
| **D8** | Not present. §5.1/§7 describe only couple-reviews-vendor | FR-47 adds **Vendor→family reviews** — structured, vendor-private, never free text. New scope; needs T&C cover | ✗ |
| **D9** | §4 step 6: "**downloadable quote/agreement template for the parties to use offline**"; §7 "Removed in v2.0: **digital contracts as a platform-enforced instrument**" | 4.8 builds an in-app two-sided Agreement that timestamps, blocks calendars, gates reviews, carries a cryptographic digest and trusted-source timestamps, is append-only and **retained 8 years** (FR-43), with "a named individual accountable for the systems holding these records" | ✗ |
| **D10** | §3 role "**Wedding Manager**"; §10 Phase 2 delivers it; §11 excludes only the *paid* treatment | 7.3 excludes the role entirely | ✗ |
| **D11** | §10 Phase 2 "**Packages / bundles** (pre-built multi-service shortcuts)"; §5.2 "packages"; all five frozen specs assume packages | 7.3 excludes both vendor-authored packages and platform-assembled bundles | ✗ |
| **D12** | §6 "**Gift registry**"; §10 Phase 3 "Add-on partners: insurance, gift registry" | 7.8: "**Removed entirely** — as a feature, as a partner integration, and as a wishlist" | ✗ |
| **D13** | §6 "**Wedding insurance**"; §10 Phase 3 add-on partner | 7.3 excludes platform distribution (IRDAI). Remains listable as an ordinary Service | ✗ |
| **D14** | §2A "auto-renew mandates considered later"; §10 Phase 2 "**Auto-renewal mandates (UPI Autopay)** if renewal volume justifies it" | 7.8 + FR-54: never. "No arrangement makes a Subscription non-cancellable." Directly affects §2 obj.5 (predictable revenue) | ✗ |
| **D15** | §10 Phase 3 "**Live streaming**, social features" | 7.4 excludes platform-hosted live streaming and all social features | ✗ |
| **D16** | §10 Phase 4 "**Compliance layer** (fireworks/permits/noise-curfew/animal-welfare)" | 7.5 excludes it as a capability, not as a phase. Constraints reach families as Vendor Rules only | ✗ |
| **D17** | §10 Phase 4 "**Re-evaluate transaction-based revenue** (bookings/commission) only if brand trust and scale make fund custody viable" | 7.1: "**This is not a deferral. It is the commercial model.**" (Consistent with §14's material-change clause, but closes a door §10 left open) | ✗ |
| **D18** | §4 step 10 "**City-scoped** replication"; §7 "Multi-city (city-scoped catalog)"; §9 "City-scoped, horizontally scalable" | FR-33: a **place hierarchy** — village/town, tehsil, district, state, country. "**Nothing in the platform assumes a single city.**" A better model and more build up front | ✗ |
| **D19** | §9 "vernacular-ready... regional languages phased (**Marathi first**)"; §7 "Multi-language (English + regional — phased)" | 5.1: English only, and "**No app-wide language switch is offered**" — stronger than "phased" | Partial (7.7 says "deferred", not "never offered") |
| **D20** | §4 step 2 "Supply shelves: **verified** / **standard** listings" | FR-58/FR-59: nothing lists without Verification, at any tier. There is no standard shelf. Strengthens trust; slows the §2 obj.3 supply path | ✗ |
| **D21** | §5.1 and §7: "Guest management (list; **RSVP and invitations phased**)"; Tech-Stack §5 MVP "**Flat list only.** No RSVP, no invitations, no QR" | FR-11/FR-12: RSVP per Function, bulk contact import, invitation composition, a platform-hosted RSVP page with platform-controlled link preview, an embedded growth surface, and permanent attribution. Substantial added build plus a DPDP obligation over non-user guest data (5.5) | ✗ |
| **D22** | §6 "Digital invite + RSVP + **QR check-in**" | Absent entirely | ✗ |
| **D23** | §6 Venue: "site visit / **virtual tour** request" | Absent entirely | ✗ |
| **D24** | §5.3 "**Subscription & billing management:** plans, pricing, manual overrides, comps, expiry, GST invoicing, revenue reporting" and "**Reports & analytics** (supply, demand, leads generated, subscription revenue, **churn**)" | No Admin FR covers any of it. 4.13 is attribution, catalog config, intermediary obligations and disclosure | ✗ |
| **D25** | §10 defines four phases; §12 makes "**Sign-off at each phase gate**" a client obligation; §13 Deliverables are phase-shaped | 7.9 bans "Phase N" as vocabulary; §0 removes sequencing to epics and sprint planning. The engagement's payment and approval structure rests on phase gates the PRD dissolves | ✗ |
| **D26** | §6 frozen signature features (see §2.4 above) | 8 of ~24 named elements dropped, 4 partial. Three of five services lose the feature the scope bolded as their differentiator | Partial (7.2 covers the Band enforcement half only) |

### Priority for the client conversation

Not all 26 are equal. In order:

1. **D3 (search ranking is for sale).** It sits in §8's differentiator table — the section Pravin will read as the product's ethical position — and it is now false. The memlog says it "must be struck from the scope document and from all marketing copy." It is the only divergence that makes a *client-facing claim* untrue rather than merely out of date.
2. **D1 + D2 + D26 (enforcement).** §2 objective 4 names removal of failing vendors as "**the core differentiator**." The PRD deletes the mechanism. The scope's entire §8 trust spine needs rewriting, and three of the five frozen services lose a promised feature with it.
3. **D9 + D21 + D18 + D4 (scope expansion).** Each is materially more build than the signed document describes: an 8-year records system, a full invitation-and-RSVP growth loop, a place hierarchy, and a second mobile platform. In a fixed-price engagement these are the ones that cost money.
4. **D25 (phasing).** A structural mismatch with §12's phase-gate sign-off and §13's deliverables. Someone has to map the epics back onto §10's phases or renegotiate how the engagement is approved and paid.
5. **D14 (auto-renewal never).** Cuts against §2 objective 5's "predictable subscription revenue base" and is a permanent decision presented as such. Pravin should own it.
6. The remainder are corrections to make before signature, not conversations.

---

## 4. The unused research

`research-landscape.md` was not read by the author, and no PRD decision was driven by it. Assessed on its own merits.

**Verdict: it overturns nothing, and it should change four things.**

### 4.1 What it confirms — do not reopen

- **Subscription vs commission.** §6.1: "Subscription is the incumbent model, so it cannot be the differentiator... The pitch 'we don't take commission' will not land, because none of them do either." The PRD never makes that pitch — §1 and 7.1 justify the no-money posture on non-party liability grounds. No change needed. **But the research hands the PRD a stronger argument than the one it uses**, in §4.4: "Commission models are structurally unenforceable in a WhatsApp-mediated market because you cannot see the transaction. **This is the strongest first-principles argument for subscription over commission in India**, and it is a better argument than 'vendors dislike commission.'" Worth one sentence in §1.
- **Escrow.** §5.2 calls protected advances "the biggest unclaimed trust product" in India, citing the Nuh ₹14 crore fraud and routine banquet-advance disputes. This is the research's most seductive finding and the PRD is right to refuse it — 7.1 and the scope's RBI Payment Aggregator reasoning already answer it, and the research itself flags the white space as **[UNVERIFIED]**. **Record the refusal explicitly**, so a downstream agent that reads the research does not re-litigate a settled decision.
- **Cold start.** §6.5: "copy Zola, not The Knot" — free listing, monetise at demonstrated demand. FR-51's Founding Vendor at ₹0 "with no strings" already is this, and the PRD's insistence that no obligation attach ("A free tier with obligations attached is not free") is exactly Zola's logic. Confirmed, no change.
- **Muhurat data.** §4.2 **[FLAG]**: "**Do not hard-code muhurat data**" — sources disagree, panchang tradition varies by region and community. The PRD already complies: 7.7 defers auspicious-date computation to an external astro service and FR-9 requires the family to assign every Function explicitly, "never assumed." Confirmed-correct; worth citing so the constraint survives into architecture.
- **Non-refundable, non-cancellable contracts.** §2.3 quotes WedMeGood's vendor T&Cs verbatim: *"Once a premium subscription is purchased & activated, the same cannot be cancelled... non-refundable."* The research calls this "the single most useful competitive artifact in this document" and "an enormous positioning gap." FR-54 already lands on the right side ("No arrangement makes a Subscription non-cancellable, and no term is presented as irrevocable"). Confirmed.

### 4.2 What should change — four items

**(a) The shape of a Subscription term. — FR-52**

§4.2 [INFERENCE]: "Vendor **revenue is violently seasonal** but a 12-month subscription bills flat. A vendor who buys in April and sees dead months May–October will **churn in disgust before ever reaching peak season**." §6.4: "A vendor billed flat through Adhik Maas and Chaturmas will churn before peak. **Season-aligned or usage-linked pricing is unoccupied ground.**"

FR-52 fixes terms at "6 or 12 months" from purchase and pushes price to the client. But **term shape is a product decision, not a price** — and the PRD models this seasonality everywhere else: FR-30 lets a Vendor price their own dead months, FR-31 shows them where the year is empty, NFR 5.4 sizes for peak muhurat, and UJ-2 has Dattatray setting lower Chaturmas pricing. The platform understands the vendor's year completely and then bills against the calendar year.

**Change:** amend FR-52 so a term may start and end on dates the Vendor chooses, or be defined against a season, rather than running 6 or 12 months from the date of purchase. Secondary: add a counter-measure to SM-2, since renewal rate is confounded by term-start date until this is fixed — a cohort that bought in April will churn for reasons that have nothing to do with the product.

**(b) Per-Service tier pricing. — FR-50**

§4.5 [INFERENCE]: "A venue or caterer captures ~45% of a ₹10 lakh wedding (₹4.5 lakh); a mehendi artist or pandit captures perhaps ₹5,000–25,000. A ₹50,000 annual subscription is ~1–2% of a caterer's single-wedding revenue and **multiples of a mehendi artist's**. Any single-price subscription will therefore be simultaneously under-priced for venues and unsellable to the long tail — which is likely *why* incumbents end up with high-touch sales and coercive tactics against small vendors. **Tiering by category economics, not by feature list, is the key pricing insight.**"

FR-50's three tiers differ on "placement in the marked Featured band, portfolio allowance, and how many Services the Vendor may list in" — a feature list, exactly what the research says fails. And because the PRD commits to the full ~50-Service catalog, the long tail is not hypothetical; it is most of the catalog.

**Change:** FR-50 need not set prices — that stays a client input per Scope §12 — but it must **permit tier pricing to vary by Service**, which it currently does not contemplate. One clause, and it protects the client from the commercial dead end §2.4 documents in detail (the ₹50,000 photographer with zero conversions; the makeup artist who lost ₹11,800 over nine months).

**(c) The budget number that rides on an Enquiry, and a stated position on broadcast. — FR-34, FR-22**

§2.4 identifies the mechanic behind the incumbents' bitterest complaints: "**Budget mismatch** is the core mechanic: leads arriving for '₹10,000 for 3 bridal looks' or '₹2,000 for sliders' against professionally-priced vendors. **Couples broadcast to many vendors across price bands**, so effective cost-per-booking is far above cost-per-lead." §3.3 adds the structural version: Thumbtack leads "shared with up to 15 pros", a reported 75% ghost rate.

The PRD's answer is genuinely strong and independently arrived at — FR-34's context-carrying Enquiry, and SM-2's counter-measure ("**Volume of Enquiries is trivially inflatable and worthless if they are junk**, which is the precise complaint that drives vendors off competing platforms"). Two gaps remain:

1. **FR-34 carries "the Wedding's budget context" — the ₹8L ceiling.** That is precisely the number that produces mismatch: a caterer reading ₹8L cannot tell whether ₹1L or ₹4L is meant for food. §4.5 supplies typical allocations (venue+catering 40–50%, décor 10–12%, photography 8–10%) and FR-8 already maintains a portfolio-level running budget, so a **Service-level** figure is derivable. Send that instead.
2. **Nothing in the PRD constrains or discloses broadcast.** FR-22 caps no Shortlist, FR-34 creates no obligation, FR-36's Contact Reveal is counted but bounded by nothing. The incumbent failure mode is reproducible on day one. Nothing needs forbidding — but the PRD should *decide*, explicitly, whether a Vendor is told how many others received the same Enquiry. Zola's contrast is instructive (§3.2: "**Vendor sees full lead details before paying** to connect — the opposite of blind shared leads").

**(d) State the attribution limit honestly, and make Agreement-derived figures primary. — 4.11, FR-37, FR-55–57**

§6.3: "**Attribution must be built before ROI can be sold.** WhatsApp eats every conversation, so vendors cannot see what the platform produced and platforms cannot prove it — hence disclaimers and hence churn." §4.4: "Every conversation leaves the platform for WhatsApp within one message... The platform cannot prove it caused a booking, which is *exactly* why vendors dispute ROI and why WedMeGood contractually disclaims lead guarantees."

**The PRD is better positioned here than it realises and never says so.** FR-35 puts both parties in one thread; FR-36 counts Contact Reveals; FR-37 records outcomes; FR-39–40 produce a two-sided confirmed Agreement carrying an agreed figure; FR-55–57 report all of it including cost per won engagement. That is *measured outcome without touching money* — the thing §6.3 says nobody in the category has.

But two PRD decisions leak it. FR-36: "**Nothing prevents the parties continuing off-platform.**" FR-37: outcomes are Vendor-self-reported, and "A Vendor's failure to mark outcomes reduces the usefulness of their own dashboard and **carries no other consequence**." So 4.11's entire renewal argument, and SM-2's "least gameable number in the product," rest on voluntary data entry in a market where every conversation moves to WhatsApp immediately.

**Change:** the PRD is admirably honest about the equivalent limit on calendar freshness — FR-29 and 5.6 require that availability never be asserted as fact because "freshness rests on this and nothing stronger." Apply the same honesty to the Lead Dashboard. Make **Agreement-derived figures the primary measure** (FR-40 already produces a two-sided confirmed figure that no self-report can fake) and mark self-reported outcomes as self-reported on the dashboard itself.

### 4.3 Two things to record, not act on

**Vernacular.** §4.3 [VERIFIED]: Tier-2/3 India is 60%+ of new internet users; rural India is 55% of all Indian internet users; ~90% of new internet users prefer their native language; regional content sees 1.5–2x higher engagement; vernacular is specifically critical on **WhatsApp** in Tier-2/3. [INFERENCE]: "**Vernacular + Tier-2/3 is the most defensible wedge, and it is a wedge incumbents structurally struggle to copy because their SEO moat is English-language.**"

PRD 5.1 ships English only **and offers no switch at all, ever**. Its reasoning is genuinely good — mixed-language use is the norm, a binary toggle serves nobody, user content is never translated or normalised, and NFR 5.1 already lets Vendors and families write in any language, which captures much of the value. I would not overturn it on secondary research.

But "English interface" and "no switch will ever exist" are two decisions, and the research argues only against the second. **Record that the PRD is making the deliberate opposite bet to the strongest documented wedge in the category**, so the decision is visible rather than incidental. This is Abhishek's call, not a reconciliation finding.

**The largest unvalidated assumption in the PRD.** §7, open question 10: "**Vendor-side app usage** — whether Indian wedding vendors actually run their business on a vendor web portal vs purely on WhatsApp. **This directly determines whether Vivah Spot's vendor portal will be used at all**, and I found no data on it. **Highest-value thing to test with real vendors.**"

The PRD bets the entire supply side on a phone-first web portal (5.2) with WhatsApp as a notification channel only. UJ-2 has Dattatray setting up spaces, opening calendars, marking enquiry outcomes and reading a dashboard — all in the portal. If vendors live in WhatsApp, FR-28's calendar, FR-37's outcomes and 4.11's whole dashboard go unmaintained, and with them SM-2, SM-3 and the renewal argument. No PRD change is required. It belongs in the risk record rather than buried in a research file nobody read, and it is worth one afternoon with three Shrirampur vendors before the build starts.

---

## 5. Recommended actions

**Before the client signs the scope document**
1. Strike Scope §8's "search ranking is not for sale" line (D3) and rewrite §8's Delisting row plus §2 objective 4 and §5.3 (D1, D2).
2. Correct §9/§11/§13 for iOS (D4) and §3/§9 for the persona (D5).
3. Reconcile §10's phases and §12's phase-gate sign-off against a non-phased PRD (D25), or state how epics map back onto the gates.
4. Take the four expansion items to Pravin as scope changes with cost attached: the Agreement records system, the invitation/RSVP loop, the place hierarchy, iOS (D9, D21, D18, D4).
5. Correct §6's frozen table to say what the platform will actually carry (D26).

**In the PRD, before it goes downstream**
6. Add **NFR 5.9 Identity** — tagline, `packages/shared/src/tokens.js` as binding, palette, wordmark, Playfair/system-sans pairing. Three sentences.
7. Add a **voice** paragraph: the register the prototype already uses, and at least one worked example of good copy alongside the existing prohibitions.
8. Restore the **north star** as a stated test, and the Function/Service vocabulary of the launch market (Sakharpuda, Kelvan, Devak, Vidaai, Griha Pravesh).
9. Widen **Commitment** to per-Service configurable declarations under FR-62, and list each frozen Service's declarations as configuration content. This recovers most of §2.4 in one change.
10. Decide the **headcount calculator** explicitly — suggest-and-confirm satisfies 7.6 — and decide the **named-shooter lock**, the **couple's privacy toggle** (which currently contradicts NFR 5.5), and **venue-aware data propagation** in the Enquiry payload. These four were not rejected; they were lost.
11. Add FRs for **vendor self-onboarding** (SM-1 measures it), **the family-side checklist** (the Glossary promises it), **notification delivery and fallback**, and **Admin subscription management and reporting** (SM-2 and SM-7 need it).
12. Apply the four research changes in §4.2: term shape (FR-52), per-Service tier pricing (FR-50), Service-level budget on the Enquiry plus a broadcast position (FR-34/FR-22), and an honest attribution statement with Agreement-derived figures made primary (4.11).
13. Complete NFR §5, which says of itself that it is incomplete.
