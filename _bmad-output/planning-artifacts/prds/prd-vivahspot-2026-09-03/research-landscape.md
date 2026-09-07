# Vivah Spot — Competitive & Category Landscape Research

**Date:** 2026-09-03
**Purpose:** Ground the PRD for Vivah Spot (mobile app for couples/families to discover & book Indian wedding vendors + web portal for vendors, monetized by **vendor subscription**, not commission).
**Author:** web-research pass (secondary sources only; no primary vendor interviews).

---

## 0. How to read this document

Every claim is tagged:

- **[VERIFIED]** — stated by a named source, URL inline.
- **[INFERENCE]** — my reasoning from the verified facts. Not sourced.
- **[UNVERIFIED]** — commonly repeated but I could not confirm from a source I trust.

### Source-reliability warning (read this before trusting any rupee/dollar figure)

A large share of the pricing and "is X worth it for vendors" content that ranks for these queries is **content marketing published by competing products** — e.g. `weddingkart.co` (sells wedding-management software), `planning.wedding`, `fullybookedvenue.com`, `wedypro.ai`, `savullc.com`, `pipelineon.com`, `grecolabs.com`, `baadigi.com`. These sites have a commercial incentive to make incumbent platforms look expensive and low-ROI.

Critically: **none of WedMeGood, WeddingWire India, WeddingBazaar or The Knot publishes a public rate card.** Every rupee/dollar figure below is vendor-reported and second-hand. Treat all pricing as **order-of-magnitude, not precise**. This is itself a finding — see §2.4.

---

## 1. Incumbents in India

### 1.1 Summary table

| Platform | Owner / status | What it actually is | Charges which side | Scale claims | Mobile vs web |
|---|---|---|---|---|---|
| **WedMeGood** | Independent (Gurgaon); ~$3.07M raised | Discovery marketplace + editorial/inspiration content + planning tools (checklist, budget, e-invites) | **Vendors only.** Couples free | 30k–135k vendors (claims vary wildly, see below); 1M+ Android installs | Strong on both; genuine app presence |
| **WeddingWire India** | The Knot Worldwide (Permira-owned), Gurugram office | Vendor directory, same playbook as US WeddingWire | **Vendors only** | ~73k vendors (third-party claim) | Web-led |
| **WeddingBazaar** | Matrimony.com (listed co.) | Wedding-services marketplace; absorbed ShaadiSaga | **Vendors only** | "2 lakh+ verified vendors", "2.8 lakh+ trusted vendors, 40+ cities" (own marketing) | Has consumer app + separate "Partners" app |
| **ShaadiSaga** | Acquired by Matrimony.com, Jul 2021, ₹11 crore | Was an independent Delhi listing platform; folded into WeddingBazaar 2.0 (2023) | **Vendors only** | Had 40k+ vendors at acquisition | Web-led |
| **Weddingz.in** | OYO (acquired 2018) | **Not a pure directory** — venue-led, full-inventory / managed model. 1,000+ venues, 30+ cities | **Commission on bookings** + premium listings | 1,000+ venues | Web-led |
| **ShaadiWish** | Independent | Curated vendor list + wedding blog; explicitly a "promotion and marketing platform" for vendors | **Vendors (marketing/promotion)** | 2,500+ partners, 17 categories, "4.5M eyeballs/month" (2018 self-reported) | Web-led |
| **Canvera** | Acquired; status unclear | Originally photo-book/print + photographer network (2007, Bengaluru), not a wedding marketplace | n/a | — | — |
| **Justdial / Sulekha** | Justdial (Reliance-controlled) | General local-business directories; wedding is one vertical | **Vendors, pay-per-lead** | Very large | Both |
| **Meragi** | Independent, $14.8M raised (Accel, Peak XV) | **Full-stack executor**, not a marketplace — design, 3D viz, vendor coordination, day-of execution | **Takes the customer's money** (GMV model) | 3,000+ events; ₹48 Cr GMV → ₹100 Cr target | App/web secondary to ops |
| **The Wedding Company** | Independent, $3.83M raised (pre-seed Jul 2025, $2.75M seed Jun 2026) | Tech-enabled services + vendor marketplace, aimed at middle-class India | GMV / services | GMV ₹51 Cr (FY25) → ₹115 Cr (FY26), +125% | App-forward |

### 1.2 Detail and citations

**WedMeGood** — Delhi/Gurgaon, founded 2014 by Anand & Mehak Shahani. Raised ₹2.7 Cr from Indian Angel Network (Sept 2015) and $2.6M Series A from Orchid India (2019), $3.07M total across 4 rounds.
Sources: [YourStory](https://yourstory.com/2019/04/online-wedding-platform-wedmegood-funding), [Entrackr](https://entrackr.com/2019/04/wedmegood-funding-orchid-india/), [Tracxn](https://tracxn.com/d/companies/wed-me-good/__MjbBDedv9m0PRlgj_heBs8hj48nFhlZKdRLTlCbaObE), [Google Play (1M+ installs)](https://play.google.com/store/apps/details?id=com.wedmegood.planner&hl=en_IN)

**[VERIFIED — but contradictory] Vendor-count claims for WedMeGood range from 23,000 to 135,000** depending on source: Tracxn-derived "23,000+ vendors, 1M+ monthly visitors"; a third-party review says "80,000+"; WedMeGood's own awards blog says its 2023 awards covered "more than 135,000 wedding experts across India" and its 2025 awards reached "100,000+ couples". **[INFERENCE]** The spread suggests the larger numbers count *scraped/claimed/unclaimed* profiles, while the smaller count *active or paying* vendors. This gap is strategically important — see §6.
Source: [WedMeGood business blog](https://business.wedmegood.com/), [weddingkart review](https://www.weddingkart.co/blog/is-wedmegood-worth-it-for-vendors)

**WeddingWire India** — a subsidiary of The Knot Worldwide, office in Gurugram; TKWW planned to grow its India team ~30% by end-2022. TKWW is owned by Permira and operates across 16 countries. **[INFERENCE]** India appears to be run substantially as a *global engineering/ops hub* as much as a market — TKWW's India office serves worldwide operations, so its India-market monetization intensity may be lower than its US intensity.
Sources: [Investment Monitor](https://www.investmentmonitor.ai/news/the-knot-worldwide-expands-india-office/), [WeddingWire.in About](https://www.weddingwire.in/aboutus/aboutus.php), [TKWW](https://www.theknotww.com/about-us)

**[VERIFIED] There is no evidence The Knot/WeddingWire has exited India** — the only recent news is expansion. I searched specifically for a shutdown and found none.

**WeddingBazaar / ShaadiSaga / Matrimony.com** — Matrimony.com acquired 100% of Boatman Tech (ShaadiSaga) in July 2021 for ₹11 crore, integrating it with WeddingBazaar.com and Mandap.com, then launched "WeddingBazaar 2.0" in 2023. ShaadiSaga had 40,000+ vendors and gave Matrimony North/West coverage.
Sources: [Business Standard](https://www.business-standard.com/article/companies/matrimony-com-to-buy-wedding-planning-firm-shaadisaga-for-rs-11-cr-121070700790_1.html), [Matrimony.com media release (PDF)](https://www.matrimony.com/sites/default/files/newsroom-assets/2023-02/07-07-2021-media-release-on-shaadi-saga.pdf), [YourStory](https://yourstory.com/2021/07/matrimonycom-acquires-wedding-services-aggregator-shaadisaga)

**[INFERENCE — important]** Matrimony.com's structural advantage is a **funnel from matchmaking to wedding services**: the same company knows who just got engaged. No pure-play wedding marketplace has that signal. Vivah Spot will not have it either.

**Weddingz.in (OYO)** — acquired by OYO in 2018; founded 2015 by Sandeep Lodha; full-inventory venue model, 1,000+ venues across 30+ cities; still listed as **Active** in 2026. Revenue described as **commissions on successful bookings plus premium listings/advertising**, with value-added packages.
Sources: [TechCrunch](https://techcrunch.com/2018/08/13/oyo-wedding-services), [Tracxn](https://tracxn.com/d/companies/weddingz/__kyo-t-eAFzaOY8ii30-8gbl1v435b6xlfNnjZfAUbpE), [Hotelier India](https://www.hotelierindia.com/operations/oyo-owned-weddingz-in-partners-with-lemon-tree-hotels)

**ShaadiWish** — self-describes as "a promotion and marketing platform that caters to service providers from the Indian wedding industry"; curation + blog + B2B marketing. 2,500+ partners across 17 categories.
Sources: [BW Disrupt](https://www.bwdisrupt.com/article/shaadiwish-a-promotion-and-marketing-platform-that-caters-to-service-providers-from-indian-wedding-industry-137454), [ShaadiWish list-your-business](https://shaadiwish.com/list-your-business)

**Canvera** — **[FLAG: mostly unverified]** Bengaluru, founded 2007, listed on Tracxn as "Acquired". I could **not** verify who acquired it, when, or whether it still operates. Canvera was historically a **photography print/album and photographer-network business**, not a couple-facing vendor marketplace — including it in an incumbent set may be a category error.
Source: [Tracxn](https://tracxn.com/d/companies/canvera/__q8FFdaHizf_CY1o4AE1Wl6pdRUhYiUYK3LXJAgdab8s)

### 1.3 Newer entrants (2024–2026) — the real competitive shift

**[VERIFIED] Funding in this space has moved away from directories and toward fulfilment.**

- **Meragi** — $14.8M across six rounds, Accel + Peak XV + Venture Highway + Anupam Mittal; $9.1M Series A (Jul 2024), latest round Apr 2025 at a **flat valuation**. Full-stack: design consultation, 3D venue renders, budget management, vendor coordination, day-of execution. 3,000+ events; ₹48 Cr GMV, targeting ₹100 Cr.
  Sources: [YourStory](https://yourstory.com/2024/07/wedding-services-startup-meragi-series-a-round-accel), [Entrackr — flat valuation](https://entrackr.com/exclusive/exclusive-wedding-services-startup-meragi-set-to-raise-fresh-funds-at-flat-valuation-12458866), [Outlook Business](https://www.outlookbusiness.com/corporate/meragi-secures-91-million-in-series-a-led-by-accel)
- **The Wedding Company** — $1M pre-seed (Jul 2025) + $2.75M seed (9 Jun 2026), $3.83M total. GMV ₹51 Cr (FY25) → ₹115 Cr (FY26), **+125%**. Explicitly targets middle-class India.
  Sources: [D2C Insider](https://pulse.d2cinsider.com/the-wedding-company-raises-2-75-million-seed-funding-to-scale-indias-tech-enabled-wedding-services-market/), [YourStory](https://yourstory.com/2025/07/startup-the-wedding-company-planning-indias-middle-class), [Tracxn](https://tracxn.com/d/companies/the-wedding-company/__dw_BvpTpKId4pH5aJb2bnniLVX7jE3zmMMR8OXGDsBg)
- **[VERIFIED] Wedding-vendor-marketplace funding is thin:** in 2026 through June, the category raised **$2.75M across 1 round** (vs $1.08M across 1 round in the comparable 2025 period).
  Source: [Tracxn category page](https://tracxn.com/d/trending-business-models/startups-in-wedding-vendor-marketplace/__gBEPgpNUJd8dQgbW9z_3RfO71hp8SJKpSp7jQ06Szik)

**[INFERENCE]** Two readings, both worth holding: (a) investors have concluded the pure directory model is played out and capital now follows GMV/fulfilment; or (b) the directory model is a quietly profitable, unfashionable business that doesn't need capital. WedMeGood raising only ~$3M total across 12 years and still leading discovery supports (b). Vivah Spot should not assume "low funding = weak incumbent."

---

## 2. Monetization models

### 2.1 The three models in this market

| Model | Who uses it | Vendor's risk | Platform's risk |
|---|---|---|---|
| **Vendor subscription / premium listing** | WedMeGood, WeddingWire India, WeddingBazaar, ShaadiWish, The Knot | Pays up front, no outcome guarantee | Must keep proving value or churn spikes at renewal |
| **Pay-per-lead** | Justdial, Sulekha, Zola (US), Bark, Thumbtack | Pays per contact, quality varies | Reputational — fake/dead leads destroy trust |
| **Commission on booking / GMV** | Weddingz.in (OYO), Meragi, The Wedding Company | Pays only on success | Must control fulfilment; leakage off-platform |

**[VERIFIED] The vendor-subscription model Vivah Spot proposes is not contrarian — it is the *dominant incumbent* model in Indian wedding discovery.** WedMeGood's revenue is described as "vendor subscriptions, advertising, and premium listing fees." Positioning must therefore be about *how* the subscription works, not *that* it's a subscription.
Source: [Tracxn/CB Insights profile summaries](https://tracxn.com/d/companies/wed-me-good/__MjbBDedv9m0PRlgj_heBs8hj48nFhlZKdRLTlCbaObE)

### 2.2 Publicly known Indian vendor pricing

**[VERIFIED-as-reported, NOT official]** No Indian platform publishes a rate card. Vendor-reported WedMeGood figures:

- Premium packages clustering around **₹50,000 and ₹85,000** for 6- or 12-month listings.
- One aggregation cites WMG membership plans spanning **₹2,999 to ₹99,900**.
- Sold on **EMI: ~20% down**, then 3-month EMI on a 6-month package or 6-month EMI on a 12-month package — WedMeGood promotes **interest-free loans via a financial partner**.
Sources: [WedMeGood business — interest-free loans](https://business.wedmegood.com/interest-free-loans-on-wmg-subscription-packages/), [weddingkart](https://www.weddingkart.co/blog/is-wedmegood-worth-it-for-vendors), [navdeepsoni.com](https://www.navdeepsoni.com/wedmegood-review/)

**[INFERENCE — high confidence, high strategic value] Financing the subscription is itself a signal.** You only need EMIs and a lending partner when the ticket is large relative to the buyer's cash flow. A ₹50k–₹85k annual ask against a small photographer/makeup artist's revenue is a **considered, painful purchase** — which is exactly why the sales process is high-touch and the complaints are bitter.

### 2.3 [VERIFIED] The contract terms are hostile — straight from WedMeGood's own vendor T&Cs

Quoted verbatim from [wedmegood.com/terms_vendor](https://www.wedmegood.com/terms_vendor):

> "Once a premium subscription is purchased & activated, the same cannot be cancelled. Subscription payment made to WedMeGood for any premium membership is non-refundable."

> "wedmegood does not guarantee leads generated by the vendors while they are a part of the handpicked and featured section."

> On review removal requests: "We shall investigate into the matter to ensure the validity and authenticity of such request, investigation will be based on certain internal parameters. If it's found genuine and relevant then the related review will be hidden or removed."

**This is the single most useful competitive artifact in this document.** A market leader that (a) takes ₹50k+ up front, (b) contractually disclaims any lead guarantee, and (c) makes it non-refundable and non-cancellable, has left an enormous positioning gap.

### 2.4 [VERIFIED] Known vendor friction points

Documented complaints against WedMeGood specifically:

- A Delhi photographer ("Navin") paid **₹50,000** and had **zero conversions**; he was persuaded to cut his price by ~40% and still converted nothing.
- A Mumbai makeup artist, **Tasneem Nulwala**, reports losing **₹11,800** after receiving **fewer than one lead in nine months**, against a promise of two leads per month.
- Another vendor, Mangesh Kathar, cited at **₹85,000** for a "popular package".
- **Budget mismatch** is the core mechanic: leads arriving for "₹10,000 for 3 bridal looks" or "₹2,000 for sliders" against professionally-priced vendors. Couples broadcast to many vendors across price bands, so effective **cost-per-booking** is far above cost-per-lead.
- **Sales-side traffic inflation:** vendors report being pitched "5.5 million monthly visitors" while (per the review) ~47% of that traffic was on designs/dresses content, irrelevant to photography conversion.
- **Coercive listing management:** vendors report profiles being **deactivated after refusing to buy premium plans**, and refund requests going unanswered.
- **[FLAG]** Vendors report **fear of blacklisting** if they complain publicly — which means public complaint volume *understates* real dissatisfaction.
Sources: [navdeepsoni.com WedMeGood review](https://www.navdeepsoni.com/wedmegood-review/), [weddingkart](https://www.weddingkart.co/blog/is-wedmegood-worth-it-for-vendors), [PissedConsumer](https://wedmegood.pissedconsumer.com/customer-service.html)

**[VERIFIED] The same pattern hits Matrimony's WeddingBazaar**, with an interesting split: vendor testimonials on its own site are positive ("giving me a great amount of leads"), while Trustpilot shows a **2/5 TrustScore** (small n = 9 reviews) with complaints of "not receiving genuine leads for almost a year after registration."
Sources: [WeddingBazaar vendor reviews](https://www.weddingbazaar.com/vendor-reviews), [Trustpilot](https://www.trustpilot.com/review/weddingbazaar.com)

**[VERIFIED] Justdial is the cautionary extreme** — 1.4/5 on Trustpilot, with structured complaints: leads that are competitors price-fishing, job-seekers, or fake numbers; promised 4 leads/day delivered as 4/week; and a refund mechanism narrowed to a **48-hour window to flag an irrelevant lead**, later removed entirely.
Sources: [Trustpilot](https://www.trustpilot.com/review/justdial.com), [Voxya complaint](https://voxya.com/view-complaint/fake-leads/117829), [MouthShut](https://www.mouthshut.com/review/justdial-review-oupomrquosn), [Infotyke case writeup](https://infotyke.com/2025/05/16/how-justdial-tricked-us-with-fake-leads-a-cautionary-tale/)

---

## 3. Comparable models elsewhere

### 3.1 The Knot / WeddingWire (US) — subscription, shared leads, locked contracts

**[VERIFIED-as-reported]** Pricing by quote, never rate card. Reported bands:

- Rural: **$50–$150/mo**; mid-size cities **$200–$450/mo**; major metros **$500–$1,200+/mo**.
- Venues in competitive markets: **$6,000–$12,000/year**.
- **12-month mandatory minimum, no early cancellation.**
- Post-2019 merger, The Knot and WeddingWire **share an identical lead pool**; bundling both costs "10–20% more."
- **Lead sharing:** one inquiry is distributed to multiple competing vendors simultaneously. One documented photographer's ROI went from positive (2016) to a **$1,285 net loss** after eight months.
Sources: [wedypro comparison](https://www.wedypro.ai/blog/wedding-vendor-marketplace-comparison), [planning.wedding](https://planning.wedding/is-the-knot-worth-it-for-vendors), [fullybookedvenue](https://www.fullybookedvenue.com/the-ultimate-guide-to-the-knot-vendor-pricing-in-2026/) — **all three are competitor-content sites; treat figures as indicative only.**

**[VERIFIED] TKWW has itself moved off pure subscription:** it introduced a **hybrid plan combining a low base subscription fee with a vendor-chosen pay-for-performance budget.**
Source: [The Knot Worldwide press release](https://www.theknotww.com/press-releases/the-knot-worldwide-announces-new-platform-features-to-drive-wedding-vendor-success)

**[INFERENCE — this is the most important comparable signal in the document.]** The largest pure vendor-subscription wedding marketplace on earth, after ~25 years, is **hedging its own model** toward performance pricing. That is evidence that flat subscription alone struggles to hold vendors once they can measure ROI.

### 3.2 Zola — free listing + pay-to-connect (the cold-start answer)

**[VERIFIED-as-reported]** Zola's model is the structural opposite of The Knot's:

- **Free marketplace listing** — so supply-side cold start costs the vendor nothing.
- Pay only to connect: Starter Pack **$27 for 24 credits**, ~**$13.50 per lead response**.
- **Vendor sees full lead details before paying** to connect — the opposite of blind shared leads.
- **No locked contract**, cancel anytime; credit-protection policy for bad leads.
- Zola reports **0.05% of leads sent in 2024 were reported as spam by vendors** (note: the source writes "$0.05%", evidently a typo).
Source: [wedypro comparison](https://www.wedypro.ai/blog/wedding-vendor-marketplace-comparison), [Zola vs The Knot for venues](https://www.fullybookedvenue.com/zola-vs-the-knot/)

**[INFERENCE] Zola solves cold-start by making listing free and monetizing only at the moment of demonstrated demand.** This is directly transferable and is probably the single best template for Vivah Spot's *early* phase, even if the endgame is subscription.

### 3.3 Thumbtack & Bark — how pay-per-lead decays

**[VERIFIED-as-reported]** Both are cited as case studies in lead-quality collapse:

- **Thumbtack:** 1,000+ BBB complaints through Jan 2026; leads shared with **up to 15 pros**; a reported **75% ghost rate** on direct leads; lead prices **$30+**, "tripled in price"; **every** shared pro is charged $30–$50 the moment the customer clicks; refunds issued as **platform credits, not money**, locking pros into continued spend.
- **Bark:** the single most consistent complaint across BBB/Trustpilot/Sitejabber is lead quality — leads that never respond, weren't real buyers, or appear fake. From **1 Nov 2025**, purchased credits **expire 3 months after purchase**. Trustpilot-style aggregate ~**2.6/5 across 1,644 reviews**.
Sources: [sidehustles.com Thumbtack review](https://sidehustles.com/is-thumbtack-worth-it/), [Thumbtack BBB](https://www.bbb.org/us/ca/san-francisco/profile/internet-service/thumbtack-inc-1116-367066/customer-reviews), [Thumbtack community thread](https://community.thumbtack.com/discussion/1818/anyone-else-struggling-with-expensive-leads-but-no-bookings), [Bark BBB complaints](https://www.bbb.org/us/tx/austin/profile/business-services/barkcom-global-limited-0825-1000224857/complaints), [smartcustomer aggregate](https://www.smartcustomer.com/reviews/bark.com)

**[INFERENCE] The failure mode is structural, not managerial.** Every pay-per-lead marketplace faces the same incentive: revenue = leads sold × price, so the platform is paid for *volume* while the vendor needs *quality*. Absent a hard constraint, the platform over-shares each lead. **A subscription model does not have this incentive — that is genuinely Vivah Spot's strongest argument** — but it substitutes a different one: subscription revenue is paid up front regardless of outcome, so the platform is paid for *sign-ups*, not outcomes. WedMeGood's disclaimer-plus-non-refundable clause is precisely that failure mode expressed in legal text.

### 3.4 Churn and take-rate — [FLAG: NOT VERIFIABLE]

**I could not find any credible published churn rate or take rate** for The Knot Worldwide, WedMeGood, WeddingBazaar, or WeddingWire India. TKWW is private (Permira-owned) and does not disclose. Matrimony.com is listed but **I did not find a segment-level revenue disclosure for its wedding-services business** — this is a gap worth closing by reading Matrimony.com's annual report / investor presentations directly, which is the one place real Indian numbers might exist.

---

## 4. Category dynamics a PM must know

### 4.1 Market size

- **[VERIFIED]** CAIT/CRTDS (survey across 75 cities): the **1 Nov – 14 Dec 2025** window alone was projected at **~46 lakh weddings and ₹6.5 lakh crore** of trade — up in value from ₹5.9 lakh crore in 2024 despite fewer weddings (48 lakh in 2024), i.e. **rising spend per wedding**. Delhi alone: ~4.8 lakh weddings, ₹1.8 lakh crore; Mumbai ~₹1.2 lakh crore. Expected to create 1 crore+ temporary jobs.
  Sources: [CAIT](https://cait.in/wedding-season-2025-to-generate-%E2%82%B96-5-lakh-crore-business-from-46-lakh-weddings-across-india-cait-delhi-alone-to-witness-%E2%82%B91-8-lakh-crore-trade-from-4-8-lakh-weddings-indian/), [ThePrint (2024 comparison)](https://theprint.in/economy/nov-dec-wedding-season-will-generate-business-of-rs-5-9-lakh-crore-cait/2290265/), [IANS](https://ianslive.in/indias-wedding-season-to-generate-rs-65-lakh-crore-from-46-lakh-weddings--20251030163903)
- **[VERIFIED — but treat with suspicion]** Analyst-firm sizings vary wildly: Custom Market Insights puts India wedding services at **USD 139.33 Bn in 2026, 15.32% CAGR to 2035**; Grand View projects **online bookings growing 15.1% CAGR 2025–2030**. **[INFERENCE]** These paid-report numbers are marketing for the reports themselves and should not anchor any business plan. CAIT's number is at least methodologically described.
  Sources: [CMI](https://www.custommarketinsights.com/report/india-wedding-services-market/), [Grand View](https://www.grandviewresearch.com/industry-analysis/india-wedding-services-market-report)

### 4.2 Seasonality — and a specific 2026 landmine

**[VERIFIED] Indian weddings are muhurat-gated, not weather-gated, and 2026 is an unusually constrained year.**

- **Adhik Maas 2026 runs 17 May – 15 Jun 2026** (a double Jyeshtha), during which weddings are traditionally prohibited.
- **Chaturmas** blocks roughly late July through November; **August, September and October 2026 are fully blocked.**
- Net effect per one source: **November–December is effectively the only remaining 2026 Hindu wedding window, with ~11 auspicious dates** — 4 in November (21, 24–26) and 7 in December (2–6, 11–12).
- Broader 2026 count: ~**63 auspicious dates** across the year, concentrated in Jan, Feb, Apr, May, Nov, Dec; February ~12 dates, April ~8, May ~8 (pre-Adhik Maas).
Sources: [Adhik Maas 2026 dates](https://www.smartpuja.com/blog/hindu-festival-calendar-2026/), [weddingkart muhurat list](https://www.weddingkart.co/blog/hindu-wedding-dates-muhurat), [theweddingfocus](https://www.theweddingfocus.com/blog/wedding-dates-2026/), [Drik Panchang](https://www.drikpanchang.com/shubh-dates/shubh-marriage-dates-with-muhurat.html)

**[FLAG]** The precise "only 11 dates left in 2026" figure comes from a single competitor-content site and the muhurat lists disagree with each other across sources (panchang tradition varies by region — Purnimanta vs Amanta, and by community). **Do not hard-code muhurat data.** But the *shape* — long dead months, extreme demand spikes — is robust and consistently reported.

**[INFERENCE — critical product implication]** This is the defining operational fact of the category and it cuts directly against annual subscriptions:

1. Vendor **revenue is violently seasonal** but a 12-month subscription bills flat. A vendor who buys in April and sees dead months May–October will churn in disgust before ever reaching peak season.
2. Demand-side app engagement is **spiky and then zero** — a couple uses the app intensely for weeks, books, and never returns. Retention metrics designed for consumer apps will look catastrophic and will be *misleading*.
3. A subscription priced/structured around **the season rather than the calendar year** (e.g. billing aligned to muhurat windows, or pausing in blocked months) would be a differentiator no incumbent appears to offer. **[UNVERIFIED — I found no incumbent doing this.]**

### 4.3 Regional and language fragmentation

**[VERIFIED]** Tier-2/3 India accounts for **60%+ of new internet users**, who are predominantly vernacular-first; rural India is now **55% of India's internet users**; **~90% of new internet users prefer their native language** online; regional-language content sees **1.5–2x higher engagement** than English. Vernacular messaging is specifically called out as critical for **WhatsApp** in Tier-2/3, where Hindi/regional messages get significantly higher response rates.
Sources: [MGID](https://www.mgid.com/blog/the-rise-of-vernacular-content-in-india), [Justwords](https://www.justwords.in/blog/regional-language-content-marketing-india/), [LS Digital](https://www.lsdigital.com/blog/vernacular-seo-the-key-to-tapping-into-indias-tier-2-and-tier-3-markets/)

**[INFERENCE]** Incumbents are English-first, metro-first, and SEO-driven (WedMeGood's moat is editorial/organic search in English). The wedding market is *not* concentrated where they are strong — CAIT's own numbers spread ₹6.5 lakh crore across 75 cities. Vernacular + Tier-2/3 is the most defensible wedge, and it is a wedge incumbents structurally struggle to copy because their SEO moat is English-language.

### 4.4 WhatsApp is the actual transaction layer

**[VERIFIED]** WhatsApp is where Indian wedding vendor–customer communication actually happens: vendors use it for quotes, packages with images and pricing, appointment scheduling and confirmation, and vendor coordination; a widely-cited stat says **86% of engaged couples prefer messaging over email** for wedding planning. A cottage industry of WhatsApp Business API providers (SecondTick, GetItSMS, Weddingkart, RichAutomate) serves Indian wedding vendors specifically.
Sources: [GetItSMS](https://getitsms.com/blogs/whatsapp-business-api-for-wedding-planners/), [SecondTick](https://secondtick.com/whatsapp-crm-for-event-planners-and-wedding-planners/), [RichAutomate India 2026 guide](https://richautomate.in/blog/whatsapp-wedding-event-planning-b2c-india-2026), [SchedulingKit](https://schedulingkit.com/whatsapp-booking/wedding-planners)
**[FLAG]** The "86%" figure appears in vendor marketing without a traceable primary study. Treat as directional.

**[INFERENCE — the hardest product problem in this PRD]** Every conversation leaves the platform for WhatsApp within one message. This has two consequences:
- **Attribution is destroyed.** The platform cannot prove it caused a booking, which is *exactly* why vendors dispute ROI and why WedMeGood contractually disclaims lead guarantees. Any subscription pitch that promises ROI must first solve measurement.
- **Disintermediation is total** — which is, ironically, *good* for a subscription model. Commission models are structurally unenforceable in a WhatsApp-mediated market because you cannot see the transaction. **This is the strongest first-principles argument for subscription over commission in India**, and it is a better argument than "vendors dislike commission."

### 4.5 Budget bands and categories

**[VERIFIED-as-reported; these are planner/blog estimates, not survey data]**

- Middle-class Indian wedding: **₹5–10 lakh**; a "well-rounded" wedding **₹10–20 lakh**.
- Typical allocation: **venue + catering 40–50%**, décor 10–12%, photography 8–10%, attire 8–10%, makeup / entertainment / guest hospitality 4–5% each, invitations & favours 3–4%, buffer 8–10%.
- Catering commonly **₹1,200–3,000 per plate**; photography **₹1.5–5 lakh**; décor ₹3–20 lakh.
Sources: [weddingplanning.in breakdown](https://www.weddingplanning.in/guides/indian-wedding-budget-breakdown.php), [Fiestro Events](https://fiestroevents.com/blog/average-wedding-cost-in-india), [Bajaj Finserv](https://www.bajajfinserv.in/average-indian-wedding-cost)

**[INFERENCE — pricing implication] The category is extremely unequal in vendor economics, and flat subscription pricing ignores this.** A venue or caterer captures ~45% of a ₹10 lakh wedding (₹4.5 lakh); a mehendi artist or pandit captures perhaps ₹5,000–25,000. A ₹50,000 annual subscription is ~1–2% of a caterer's single-wedding revenue and **multiples of a mehendi artist's**. Any single-price subscription will therefore be simultaneously under-priced for venues and unsellable to the long tail — which is likely *why* incumbents end up with high-touch sales and coercive tactics against small vendors. **Tiering by category economics, not by feature list, is the key pricing insight.**

Vendor categories to model: **venue, catering, photography/videography, décor & florals, bridal makeup, mehendi, pandit/priest, DJ & entertainment, invitations/e-invites, attire & jewellery, transport, choreography.** ShaadiWish operates 17 categories; WedMeGood's traffic is heavily skewed to **designs and dresses** content (reported ~47% of traffic) rather than service booking — **[INFERENCE]** a warning that inspiration traffic ≠ booking intent, and that a content-led acquisition strategy can produce vanity traffic that converts for nobody.

---

## 5. Trust and verification patterns

### 5.1 What incumbents actually do

- **[VERIFIED] OTP-verified contact:** WedMeGood states every venue and vendor's contact information is verified via **OTP**, so couples reach the right person. **[INFERENCE]** This verifies *reachability*, not *legitimacy, capability, or solvency* — a low bar dressed as trust.
  Source: [WedMeGood blog](https://www.wedmegood.com/blog/why-wedmegood-is-the-1-trusted-platform-to-find-finalise-verified-wedding-venues/)
- **[VERIFIED] Post-event review gating** is the recommended anti-fake-review pattern: enable reviews only after the event date has passed and the booking is confirmed complete; plus automated screening for reviews "not based on genuine experience."
- **[VERIFIED] "Verified" badges are largely a payment tier.** As one source puts it plainly: *"a paid badge mostly tells you the seller paid for a subscription and submitted some documents. The badge is a marketing tier, not a financial guarantee."*
  Source: [Vetrade on IndiaMART verification](https://www.vetrade.in/blog/indiamart-supplier-verification-avoiding-scams)
- **[VERIFIED] Review moderation is vendor-influenceable.** WedMeGood's own T&Cs allow vendors to request review removal, adjudicated against undisclosed "internal parameters" (see §2.3 quote).
- **[VERIFIED] WeddingBazaar markets "2 lakh+ verified vendors"** — **[INFERENCE]** at that scale "verified" cannot mean meaningfully vetted; it almost certainly means registered/contactable.
- **[VERIFIED]** Consumer-side advice universally recommends **cross-platform review checking**, because each platform surfaces different (and differently manipulable) experiences.
  Source: [Wedica](https://www.wedica.in/wedding-vendor-reviews-avoid-scams-india/)

### 5.2 Advance-payment disputes — the real Indian trust problem

**[VERIFIED — India-specific cases]**

- **Nuh (Haryana) wedding-package fraud:** two arrested in a syndicate that swindled **₹14 crore from ~1,400 victims**, offering "kanyadaan packages", building trust by delivering ~20 real weddings, then absconding with bookings taken **2–6 months in advance**. One complainant lost ₹1.1 lakh.
  Source: [Tribune India](https://www.tribuneindia.com/news/haryana/nuh-cops-bust-wedding-package-fraud-two-held-607197)
- **Banquet/venue advance disputes are routine consumer-forum matter:** a District Consumer Commission ordered a banquet hall to refund a **₹40,000 booking amount with interest** plus **₹10,000 compensation and ₹7,000 costs**; a Chandigarh case saw a venue-shift dispute penalised.
  Sources: [Tribune India](https://www.tribuneindia.com/news/chandigarh/event-venue-shifted-banquet-hall-owner-fined-for-denying-refund-524027), [LawyersClubIndia forum](https://www.lawyersclubindia.com/forum/consumer-fraud-banquet-advance-refund-deficiency-of-service-239370.asp)
- **Legal routes exist and are used:** complaints under **Consumer Protection Act 2019 s.2(11)** (deficiency in service) and **s.2(47)** (unfair trade practice), filed online at **e-daakhil.nic.in**; where a vendor double-books and takes multiple advances, criminal cheating under **BNS 318**.
  Source: [righttoinformation.wiki guide](https://righttoinformation.wiki/wedding-hall-booking-dispute-refund-india)

**[FLAG]** Most English-language "wedding vendor scam" content is US/UK (BBB, Norton, PetaPixel) and describes a *different* fraud pattern (fake photographers, cheque-overpayment scams). **Do not import US scam taxonomies into an India PRD.** The Indian pattern that is actually evidenced is: **large cash advances taken months ahead against a fixed, non-movable date, with no escrow and weak recourse.**

**[INFERENCE — the biggest unclaimed trust product]** Neither directories (no money flows through them) nor commission platforms (money flows but the platform is the counterparty) currently solve the advance-payment problem well. Because the wedding date is immovable and advances are paid 2–6 months out, **milestone escrow / protected advance** is disproportionately valuable here. It is also the one trust feature that would give a subscription platform *actual transaction visibility* — which fixes the attribution problem in §4.4. **[UNVERIFIED — I found no Indian wedding platform offering escrow on vendor advances; worth confirming before treating as white space.]**

---

## 6. Synthesis — what this means for a vendor-subscription model

**[INFERENCE throughout this section.]**

1. **Subscription is the incumbent model, so it cannot be the differentiator.** WedMeGood, WeddingWire India, WeddingBazaar and ShaadiWish all charge vendors for listing/visibility. The pitch "we don't take commission" will not land, because none of them do either. The differentiator must be **contract terms and accountability** — the exact things §2.3 shows WedMeGood contractually refuses.

2. **The incumbents' contracts are the attack surface.** Non-refundable, non-cancellable, no lead guarantee, opaque pricing, EMI-financed, with reported profile deactivation for non-payers. A credible counter-position writes itself: **published pricing, monthly or season-aligned terms, a stated lead-quality standard, and a real refund/pause mechanism.** Every one of those is verifiable against a public T&C page, so the claim is defensible.

3. **Attribution must be built before ROI can be sold.** WhatsApp eats every conversation, so vendors cannot see what the platform produced and platforms cannot prove it — hence disclaimers and hence churn. Whoever measures outcome (in-app enquiry → quote → booking confirmation, ideally with money or escrow touching the platform) can sell renewal on evidence rather than on a salesperson's traffic slide. This is the hardest and most valuable thing in the roadmap.

4. **Price by category economics and by season, not by feature tier.** A caterer and a mehendi artist cannot pay the same. A vendor billed flat through Adhik Maas and Chaturmas will churn before peak. Season-aligned or usage-linked pricing is unoccupied ground.

5. **Cold start: copy Zola, not The Knot.** Free listing removes supply-side friction entirely; monetize at the point of demonstrated demand, then graduate proven vendors to subscription. Charging for listings on day one against a platform with a 12-year SEO moat and 1M+ app installs is the losing version of this fight.

### Biggest strategic risk

**[INFERENCE]** Subscription revenue is collected **before** value is delivered, while the market's core failure is that value is unprovable (§4.4) and violently seasonal (§4.2). That combination is what turned WedMeGood's model into a high-pressure sales operation with non-refundable contracts and angry vendors — the incumbent didn't choose to be predatory so much as the model's incentives pulled it there. **Vivah Spot adopting the same revenue mechanic without solving attribution first will land in the same place, but with less traffic to sell.** The secondary risk is that capital and the strongest 2025–26 operators (Meragi, The Wedding Company) have moved to **fulfilment/GMV** models that *can* prove value because they control delivery — meaning the discovery-directory layer may be commoditising into a feature of someone else's stack.

---

## 7. What I could not verify — open questions for the PRD

1. **Any real churn or renewal rate** for any Indian wedding platform. Nothing published.
2. **Take rate / segment revenue** for wedding services at Matrimony.com — **[BEST NEXT STEP: read Matrimony.com's annual report and investor presentations directly.** It is the only listed company here and the only plausible source of audited Indian numbers.]
3. **Official pricing** for any Indian incumbent — no rate cards exist publicly. All figures here are vendor-reported.
4. **WedMeGood's true active/paying vendor count** — claims span 23,000 to 135,000.
5. **Canvera's current status, acquirer, and whether it belongs in this competitive set at all.**
6. **WeddingWire India's India-specific pricing** — only US figures are reported; I found none for India.
7. **Whether any Indian wedding platform offers escrow / protected advance payments.** Found none, but absence of evidence here is weak.
8. **The "86% of couples prefer messaging" stat** — no traceable primary study.
9. **Exact 2026 muhurat date counts** — sources disagree; regionally variable.
10. **Vendor-side app usage** — whether Indian wedding vendors actually run their business on a vendor web portal vs purely on WhatsApp. This directly determines whether Vivah Spot's vendor portal will be used at all, and I found no data on it. **Highest-value thing to test with real vendors.**
