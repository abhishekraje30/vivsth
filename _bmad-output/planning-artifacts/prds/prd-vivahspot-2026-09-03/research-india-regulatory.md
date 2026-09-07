# Vivah Spot — India Legal & Regulatory Research

**Prepared:** 2026-09-05
**Scope:** Indian wedding-services discovery marketplace. Shrirampur, Maharashtra. Android app (families, free), responsive vendor web portal (prepaid 6/12-month subscription), admin panel. **No booking money passes through the platform.** Platform records "Enquiries" and hosts a two-sided timestamped "Agreement" it does not mediate. Two-way double-blind reviews. Guest list ≤600 contacts; invitations sent over WhatsApp + email with a platform-hosted RSVP page. Paid "Featured" placement, labelled and separated.

**Reading key — every finding is tagged:**

- **[LAW]** — what the statute, rule or notified guideline actually says.
- **[SETTLED]** — established judicial or regulatory interpretation.
- **[INFER]** — my reasoning applied to Vivah Spot's specific facts. Not authority. Needs Indian counsel sign-off before it becomes a legal position in the T&Cs.
- **[UNVERIFIED]** — could not confirm from a primary/official source in this pass.

> **This is engineering research, not legal advice.** Anything that ends up in the T&Cs, the privacy notice, the GST classification, or the "we are not a party" assertion must be reviewed by an Indian advocate and a Chartered Accountant before launch. Several items below are genuinely unsettled in Indian law and I have flagged them as such rather than papering over them.

> **Access note:** `consumeraffairs.nic.in` was unreachable (connection refused) throughout this research pass, and several official PDFs (Trilegal, MeitY mirrors) returned as compressed binary that could not be text-extracted. Verbatim quotations of the Consumer Protection (E-Commerce) Rules 2020 below therefore come from reputable secondary reproductions (legitquest, ICSI, TaxTMI, consumerprotection.in) and **the clause lettering in particular should be re-checked against the gazette notification G.S.R. 462(E) dated 23 July 2020** before it is relied on in a compliance document.

---

## Q1 — Ranking, paid placement, and dark patterns

### 1.1 Consumer Protection (E-Commerce) Rules 2020 — ranking disclosure

**[LAW]** Rule 5(3)(f) requires a marketplace e-commerce entity to provide, in a clear and accessible manner, displayed prominently to users at the appropriate place on its platform:

> "an explanation of the main parameters which, individually or collectively, are most significant in determining the ranking of goods or sellers on its platform and the relative importance of those main parameters through an easily and publicly available description drafted in plain and intelligible language."

**[LAW]** Rule 5(4):

> "Every marketplace e-commerce entity shall include in its terms and conditions generally governing its relationship with sellers on its platform, a description of any differentiated treatment which it gives or might give between goods or services or sellers of the same category."

**[INFER]** Paid "Featured" placement *is* differentiated treatment between sellers of the same category. Rule 5(4) puts the disclosure obligation in the **vendor-facing T&Cs** (not the consumer-facing page), and Rule 5(3)(f) puts the ranking-parameter explanation in the **consumer-facing** surface. Vivah Spot needs **both**, and they are different documents. Most Indian platforms get 5(4) wrong by burying it in a help-centre article rather than the seller agreement.

**[LAW]** Note what Rule 5(3)(f) does *not* say: it does not require disclosure of the algorithm, weights, or source code. "Main parameters ... and the relative importance of those main parameters" in "plain and intelligible language" is the standard. A short, honest, ordered list satisfies it.

- Source: https://www.legitquest.com/act/consumer-protection-e-commerce-rules-2020/91C8
- Rule 4 text: https://www.consumerprotection.in/rule-4-duties-of-e-commerce-entities/
- Analysis: https://trilegal.com/knowledge_repository/consumer-protection-e-commerce-rules-2020/

### 1.2 CCPA Guidelines for Prevention and Regulation of Dark Patterns, 2023

**[LAW]** Issued by the Central Consumer Protection Authority under **section 18 of the Consumer Protection Act, 2019**, notified and effective **30 November 2023**.

**[LAW]** Definition (clause 2(1)(e)):

> "any practices or deceptive design pattern using user interface or user experience interactions on any platform that is designed to mislead or trick users to do something they originally did not want to do, by subverting or impairing consumer autonomy, decision making or choice, amounting to misleading advertisement or unfair trade practice or violation of consumer rights."

**[LAW]** **Yes — "disguised advertisement" IS enumerated.** It is one of the specified dark patterns in **Annexure 1**. The Annexure lists **13** patterns (some secondary sources count 12 by merging "SaaS billing" into "subscription trap"; the CCPA's own public communications and its June 2025 advisory refer to 13):

1. False urgency
2. Basket sneaking
3. Confirm shaming
4. Forced action
5. Subscription trap
6. Interface interference
7. Bait and switch
8. Drip pricing
9. **Disguised advertisement**
10. Nagging
11. Trick question / trick wording
12. SaaS billing
13. Rogue malware

**[LAW]** Disguised advertisement is defined as the practice of disguising advertisements as user-generated content, news articles, or other types of content, blending them with the rest of the interface so as to trick users into clicking on the advertisement. The illustration given is publishing a paid advertisement as user-generated content without sufficient disclosure.

**[LAW]** The Guidelines state that the Annexure illustrations are **"only for guidance and must not be considered as a binding opinion"** — determination is case-by-case.

**[INFER — directly on point for Vivah Spot]** Paid "Featured" vendor cards placed inside an organic search results list, without a persistent and legible label, is close to the textbook case of *disguised advertisement*. The stated design (labelled and visually separated from organic results) is the right answer, but three things must hold to stay clear of it:

- The label must be **on the card itself**, not only in a legend, footer, or tooltip.
- The label must survive **every** surface the card appears on — list, map pin, carousel, share preview, push notification, WhatsApp/email digest.
- The label must be **legible at the smallest supported viewport** and in dark mode. A 9px grey "Ad" on a light-grey chip is the exact failure the CCPA is targeting.

**[INFER]** "Featured" alone is arguably a weak label — it reads as an editorial merit signal, not a paid one. Safer: **"Promoted"**, **"Sponsored"**, or **"Ad"**, plus a tappable "Why am I seeing this?" that states the vendor paid for placement. This is a low-cost change and materially reduces the disguised-advertisement exposure.

- Guidelines analysis: https://www.scconline.com/blog/post/2023/12/04/ccpa-notifies-guidelines-for-prevention-and-regulation-of-dark-patterns-2023-legal-news/
- Definitions: https://www.dalaw.in/Guidelines%20for%20prevention%20and%20regulation%20of%20dark%20patterns,%202023
- Trilegal note: https://trilegal.com/wp-content/uploads/2023/12/Guidelines-for-Prevention-and-Regulation-of-Dark-Patterns-2023.pdf

### 1.3 CCPA self-audit advisory, 5 June 2025

**[LAW]** On **5 June 2025** the CCPA issued an advisory directing all e-commerce platforms to conduct a **self-audit within three months** to identify and eliminate dark patterns, and to submit **self-declarations** confirming their platforms are free of dark patterns. It followed a stakeholder meeting convened by the Department of Consumer Affairs on 28 May 2025. Twenty-six-plus platforms (Flipkart, Zomato and others) filed declarations.

**[INFER]** The advisory is addressed to platforms generally, not to a named list. If Vivah Spot is (or is treated as) an e-commerce entity — see Q2 — a documented dark-pattern self-audit and a filed self-declaration is cheap regulatory goodwill and a strong first-line defence if the CCPA ever writes. Build the audit artefact into the launch checklist.

- https://www.azbpartners.com/bank/central-consumer-protection-authority-issues-advisory-to-e-commerce-platforms-for-self-audit-to-detect-dark-patterns-on-their-platforms/
- https://chambers.com/articles/central-consumer-protection-authority-advisory-on-self-audit

### 1.4 Penalties

**[LAW]** The Dark Patterns Guidelines carry **no penalty of their own**. Rule 8 of the E-Commerce Rules 2020 states: *"The provisions of the Consumer Protection Act, 2019 (35 of 2019) shall apply for any violation of the provisions of these rules."* The teeth come from the parent Act:

| Provision | Trigger | Consequence |
|---|---|---|
| CP Act s.2(47) | Unfair trade practice | Basis for CCPA action and consumer complaints |
| CP Act s.20 | CCPA recall / refund / discontinuation orders | Directions binding on the entity |
| CP Act s.21(1) | False or misleading advertisement | CCPA may direct discontinuation or modification |
| CP Act s.21(2) | False/misleading advertisement penalty | Up to **₹10,00,000**; **₹50,00,000** for subsequent contravention |
| CP Act s.88 | Non-compliance with a s.20 or s.21 direction | Imprisonment up to **6 months**, fine up to **₹20,00,000**, or both |
| CP Act s.89 | Manufacturer/service provider false or misleading ad | Up to **2 years** + **₹10,00,000**; subsequent **5 years** + **₹50,00,000** |

**[SETTLED]** There is live commentary that the Dark Patterns Guidelines are "soft law" — guidelines under s.18 are not subordinate legislation in the same sense as rules under s.101, so their direct enforceability is contested. **[INFER]** This is a bad thing to rely on. The CCPA does not need the Guidelines to act: it can characterise the same conduct as an unfair trade practice under s.2(47) or a misleading advertisement under s.2(28) and proceed under ss.20/21 directly. Treat the Guidelines as binding.

- https://lawschoolpolicyreview.com/2025/07/11/decoding-the-ccpas-dark-patterns-advisory-binding-guidelines-or-just-soft-law/
- https://iapp.org/news/a/india-s-ccpa-guidelines-on-dark-patterns-welcome-signal-but-law-is-still-soft
- Penalties: https://www.lexology.com/library/detail.aspx?g=e644c9ae-68a6-4385-8f89-dfcde0beb54c

---

## Q2 — Is Vivah Spot a "marketplace e-commerce entity"? Is it an "intermediary"?

### 2.1 The definitional question

**[LAW]** CP Act 2019 **s.2(16)**: *"e-commerce" means buying or selling of goods or services including digital products over digital or electronic network.*

**[LAW]** E-Commerce Rules 2020 **rule 2(1)**:

> "These rules shall apply to: (a) all goods and services bought or sold over digital or electronic network including digital products; (b) all models of e-commerce, including marketplace and inventory models of e-commerce; (c) all e-commerce retail, including multi-channel single brand retailers and single brand retailers in single or multiple formats; and (d) all forms of unfair trade practices across all models of e-commerce."

**[LAW]** **Rule 2(2)**: the rules also apply to an e-commerce entity not established in India that systematically offers goods or services to consumers in India. (Not relevant here — Vivah Spot is Indian.)

**[LAW]** **Rule 3(1)(b)** — *"e-commerce entity"*: any person who owns, operates or manages a digital or electronic facility or platform for electronic commerce (excluding a seller offering goods on a marketplace).

**[LAW]** **Rule 3(1)(g)** — *"marketplace e-commerce entity"*: an e-commerce entity **"which provides an information technology platform on a digital or electronic network to facilitate transactions between buyers and sellers."**

**[LAW]** **Rule 3(1)(f)** — *"inventory e-commerce entity"*: owns the inventory of goods or services and sells directly to consumers.

### 2.2 The argument that Vivah Spot is OUTSIDE

**[INFER]** The strongest out-of-scope argument runs:

1. Rule 2(1)(a) applies to goods and services *"bought or sold over"* a digital network. No wedding service is bought or sold over Vivah Spot — the couple pays the vendor off-platform, in cash or by direct UPI/bank transfer, and the platform never touches consideration, never issues an order, never confirms a booking, and has no order state machine.
2. "E-commerce" in s.2(16) is defined by the *act of buying or selling* occurring over the network. Discovery, contact and a record of terms are none of those.
3. On this reading Vivah Spot is closer to a classifieds/directory service than to a marketplace.

### 2.3 The argument that Vivah Spot is INSIDE — and why it wins

**[INFER]** The in-scope argument is stronger, on four grounds:

1. **The definition is "facilitate transactions", not "process transactions."** Rule 3(1)(g) captures an entity that *provides an IT platform to facilitate transactions between buyers and sellers*. The Enquiry flow, the vendor profile with pricing signals, and — decisively — the hosted **Agreement**, are facilitation of a transaction. Nothing in the definition requires payment rails. A platform that gets a couple and a caterer to a mutually confirmed set of terms has facilitated a transaction, whatever happens to the money.
2. **Rule 2(1)(d) is a catch-all**: "all forms of **unfair trade practices** across all models of e-commerce." Even if the couple–vendor leg were held outside, the CCPA can reach Vivah Spot's own conduct — ranking, labelling, review handling, subscription terms — under this limb.
3. **The vendor leg is unambiguously e-commerce.** Vivah Spot *sells* a 6/12-month subscription online. That is a service bought and sold over a digital network. Vivah Spot is, at minimum, an **inventory e-commerce entity** with respect to its own subscription product. Rule 4 (duties of e-commerce entities) applies to *every* e-commerce entity, marketplace or inventory. **[INFER]** This alone brings Rule 4 into play regardless of how the couple–vendor leg is characterised.
4. **[UNVERIFIED]** I could not find any Indian judgment, CCPA order, or DoCA clarification squarely deciding whether a listing-only / no-payment discovery platform is a "marketplace e-commerce entity." Indian practitioners generally treat classifieds and listing platforms (OLX, Quikr, JustDial, matrimonial sites) as in scope, but I found no authority I can cite for that proposition. **This is the single biggest unresolved question in this document.**

**RECOMMENDATION [INFER]:** Assume in scope. The compliance cost of Rule 4 + Rule 5 is small (a grievance officer, a nodal person, some disclosure pages, an SLA). The cost of guessing wrong is a CCPA proceeding. Do not build a business model that depends on being outside the Rules.

### 2.4 A useful sub-point: are the *vendors* "consumers"?

**[LAW]** CP Act **s.2(7)**: a consumer is one who buys goods or avails services for consideration, *"but does not include a person who ... avails of such services for any commercial purpose."* The Explanation preserves consumer status for those using the goods/services **exclusively for earning a livelihood by means of self-employment**.

**[INFER]** A vendor buying a Vivah Spot subscription is availing a service for a commercial purpose — generally *not* a consumer, so no consumer-forum remedy against Vivah Spot for the subscription. **But** the self-employment exception is broad and Shrirampur vendors (a solo photographer, a one-band operator) will very often fall inside it. Do not design the vendor T&Cs assuming vendors can never file a consumer complaint. Small vendors frequently can.

- s.2(7): https://indiankanoon.org/doc/26796719/
- Commercial-purpose analysis: https://disputeresolution.cyrilamarchandblogs.com/2024/04/commercial-purchases-conundrum-under-consumer-protection-laws/

### 2.5 Concrete obligations if inside — Rule 4 (every e-commerce entity)

**[LAW]**

| Sub-rule | Obligation |
|---|---|
| 4(1) | Be a company incorporated under the Companies Act 1956/2013 (or a foreign company under s.2(42)); **appoint a nodal person of contact or an alternate senior designated functionary resident in India** |
| 4(2) | Display prominently: legal name of the entity, address of headquarters and all branches, name and details of the website, and contact details — **email address, fax, landline and mobile numbers** |
| 4(3) | Shall not adopt any unfair trade practice, on the platform or otherwise |
| 4(4) | Establish an adequate grievance redressal mechanism; **appoint a grievance officer**; display name, contact details and designation on the platform |
| 4(5) | Grievance officer must **acknowledge receipt of a complaint within 48 hours** and **redress within one month** of receipt |
| 4(6) | Imported goods — importer details (N/A) |
| 4(7) | Endeavour to become a **convergence partner of the National Consumer Helpline** |
| 4(8) | No cancellation charges on a consumer cancelling after confirming purchase, unless the entity bears equivalent charges itself |
| 4(9) | Record consent **only by explicit and affirmative action** — **no pre-ticked checkboxes** |
| 4(10) | Effect refunds within reasonable periods per RBI guidelines |
| 4(11) | No **manipulation of price** to gain unreasonable profit; **no discrimination between consumers of the same class**; no arbitrary classification affecting rights |

**[INFER]** 4(1) matters commercially: the Rules assume a **company**. A proprietorship or LLP does not fit rule 4(1) as drafted. If Vivah Spot launches as a sole proprietorship, it is technically non-compliant with 4(1) from day one. Raise this with Pravin before incorporation is decided — this is a founding-structure decision, not a launch-week decision.

**[INFER]** 4(11) has real bite for a subscription business: if Featured slots are sold at different prices to comparable vendors, or if two identical families see different vendor sets for reasons the platform cannot articulate, that is discrimination/arbitrary classification territory. Keep pricing published and rule-based.

**[INFER]** 4(9) is the pre-ticked-box prohibition and overlaps exactly with the "forced action" and "basket sneaking" dark patterns. One control satisfies both: **no checkbox in the product is ever pre-checked, ever** — subscription auto-renew, marketing consent, guest-list sharing, review publication, all of it.

### 2.6 Concrete obligations if inside — Rule 5 (marketplace)

**[LAW]**

- **5(1)** — A marketplace e-commerce entity seeking exemption from liability under **s.79(1) of the IT Act 2000** shall comply with **ss.79(2) and 79(3)** of that Act. *(This is the hinge: the Rules make the consumer-law safe harbour conditional on the IT Act safe harbour.)*
- **5(2)** — Obtain an **undertaking from every seller** that descriptions, images and other content pertaining to goods or services are accurate and correspond directly with the appearance, nature, quality, purpose and other general features.
- **5(3)** — Provide, in a clear and accessible manner, displayed prominently at the appropriate place: seller details including name of the business (registered or not), **geographic address**, customer care number, rating or other aggregated feedback about the seller; ticket/complaint number for grievance tracking; information on return, refund, exchange, warranty and guarantee, delivery and shipment, modes of payment, grievance redressal, payment-method security, charge-back options and country of origin; **and 5(3)(f) the ranking-parameters explanation quoted in Q1**.
- **5(4)** — Differentiated-treatment description in the seller-facing T&Cs.
- **5(5)** — Take reasonable efforts to maintain a record of information identifying sellers who have **repeatedly offered goods or services previously removed or disabled** under the Copyright Act 1957, the Trade Marks Act 1999 or the IT Act 2000.

**[UNVERIFIED]** Clause lettering within rule 5(3) — re-check against G.S.R. 462(E).

**[INFER]** Several 5(3) items are transactional and simply do not exist on Vivah Spot (charge-back, country of origin, shipment). The correct handling is **not** to omit them silently but to state, on the disclosure page, that the platform does not process payments or fulfil orders and therefore has no charge-back or shipment mechanism, and to point to the vendor's own terms. An explicit "not applicable, and here is why" is defensible; a blank is not.

**[INFER]** 5(3)'s "geographic address ... customer care number" for every seller is a real product requirement: **vendor profiles must carry a verified physical address and a working phone number**, and the platform must have a process for keeping them current. This is a KYC-lite obligation on the vendor onboarding flow.

**[INFER]** 5(5) requires a **repeat-infringer register**. Two takedowns of the same vendor for IP or unlawful content must be linked to a persistent vendor identity that survives account deletion and re-registration. Design the vendor identity (PAN/GSTIN/phone hash) so this is possible.

### 2.7 Is Vivah Spot an "intermediary" under IT Act s.79?

**[LAW]** IT Act 2000 **s.2(1)(w)** defines "intermediary" as *"any person who on behalf of another person receives, stores or transmits that record or provides any service with respect to that record"* and the enumerated list **expressly includes "online-market places"**.

**[LAW]** **s.79(1)** — an intermediary shall not be liable for any third-party information, data or communication link made available or hosted by it, subject to ss.79(2) and 79(3).

**[LAW]** **s.79(2)** — the exemption applies only where (a) the function is limited to providing access to a communication system; or (b) the intermediary **does not initiate the transmission, does not select the receiver, and does not select or modify the information** contained in the transmission; and (c) the intermediary **observes due diligence** and any guidelines prescribed by the Central Government.

**[LAW]** **s.79(3)** — the exemption is lost if the intermediary conspired, abetted, aided or induced the unlawful act, or, **on receiving actual knowledge** (or on being notified by the appropriate Government) that a resource controlled by it is being used to commit an unlawful act, **fails to expeditiously remove or disable access** to that material.

**[INFER — critical distinction for Vivah Spot]** Vivah Spot is an intermediary **only in respect of third-party content**: vendor listings, vendor-uploaded photos, reviews written by either side, the guest list, the Agreement text agreed between couple and vendor. It is **not** an intermediary in respect of **its own** content and its own decisions: the search ranking it computes, the Featured labels it sells, its own marketing copy, its editorial curation, badges it awards ("Verified", "Top rated"), and its own subscription terms. Safe harbour does not cover any of those. **This is the line the product must not blur.**

**[INFER]** s.79(2)(b) — *does not select the receiver* — deserves a hard look for the WhatsApp invitation feature. When Vivah Spot's own WhatsApp Business account initiates a template message to 600 guests chosen by the family, is Vivah Spot "selecting the receiver"? Arguably the family selects. But Vivah Spot **initiates the transmission** from its own sender identity. **[INFER]** I read this as taking the invitation-sending feature *outside* s.79(2)(b) safe harbour — Vivah Spot is a sender there, not a conduit. That does not create liability by itself, but it means the WhatsApp feature must stand on its own compliance (Meta policy + DPDP), not on intermediary immunity. Flag for counsel.

### 2.8 IT (Intermediary Guidelines and Digital Media Ethics Code) Rules 2021 — due diligence

**[LAW]** Rule 3 due diligence applies to **every** intermediary, regardless of size. Vivah Spot will be far below the **Significant Social Media Intermediary** threshold of **50 lakh registered users** (rule 2(1)(v)), so **rule 4 (Chief Compliance Officer, Nodal Contact Person, Resident Grievance Officer, automated screening, traceability) does not apply**.

**[LAW] — as amended.** Two amendment rounds are now in force and both change the numbers:

- **IT Amendment Rules 2025**, notified **22 October 2025**, in force **15 November 2025** — reworked rule 3(1)(d): takedown intimations must be in writing, reasoned, specify the legal basis and the exact URLs/identifiers, be authorised at a senior level, and be subject to monthly review by a Secretary-level officer.
  https://www.pib.gov.in/PressReleasePage.aspx?PRID=2181719 · https://www.meity.gov.in/static/uploads/2025/10/8e40cdd134cd92dd783a37556428c370.pdf
- **IT Amendment Rules 2026**, notified **16 February 2026**, **in force 20 February 2026** — primarily synthetically generated information (SGI), but it **compresses timelines for all intermediaries**.
  https://www.khaitanco.com/thought-leadership/MeitY-notifies-the-IT-Amendment-Rules-2026 · https://www.amsshardul.com/insight/information-technology-intermediary-guidelines-and-digital-media-ethics-code-amendment-rules-2026/

**Current operative timelines [LAW, as amended 2026]:**

| Obligation | Old | **Current** |
|---|---|---|
| Grievance acknowledgement (rule 3(2)(a)(i)) | 24 hours | **24 hours** |
| Grievance disposal | 15 days | **7 days** |
| Grievance re unlawful content | 72 hours | **36 hours** |
| Non-consensual intimate imagery / nudity / CSAM | 24 hours | **2 hours** |
| Court order or reasoned government intimation (rule 3(1)(d)) | 36 hours | **3 hours** |
| Periodic user advisory on rules/privacy policy (rule 3(1)(c)) | annually | **at least quarterly** |
| Information to a lawfully authorised government agency (rule 3(1)(j)) | 72 hours | 72 hours |
| Retain removed content + records (rule 3(1)(g)) | 180 days | 180 days |

**[INFER]** The **3-hour** court/government takedown window is an operational fact, not a policy statement. For a small team in Shrirampur it means a monitored, always-on legal inbox with a documented escalation path and an admin-panel capability to disable a listing, a review, a photo, or an entire vendor account **immediately** and without a deploy. Build the kill switch before launch.

**[INFER]** The **quarterly** user advisory (rule 3(1)(c)) is a scheduled, recurring product obligation — an in-app notice and email to every registered user, four times a year, restating the rules, the privacy policy, and the consequences of non-compliance. It needs a job, a template, and a log.

**[INFER]** SGI labelling: if the product ever generates invitation artwork, vendor photos, or copy with AI, the 2026 amendments' labelling obligations bite ("prominent, easily noticeable, adequately perceivable" visual labels; prefixed audio disclosure). Worth deciding now whether AI generation is in scope for v1.

**[LAW — related, not IT Rules]** **CERT-In Directions dated 28 April 2022** (No. 20(3)/2022-CERT-In): mandatory reporting of specified cyber incidents to CERT-In **within 6 hours** of noticing; enable and securely maintain **ICT system logs for a rolling 180 days within India**; synchronise all systems to NIC/NPL NTP. **[UNVERIFIED]** — I did not re-confirm the current text of these Directions in this pass; verify before writing them into the runbook, but plan for them.

---

## Q3 — DPDP Act 2023 and the 600-contact guest list

### 3.1 Status of the law as of September 2026

**[LAW]** The Digital Personal Data Protection Act, 2023 (Act 22 of 2023) received assent 11 August 2023. The **Digital Personal Data Protection Rules, 2025** were notified **13 November 2025** and published in the Gazette **14 November 2025** under s.40.
https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655 · https://www.dpdpa.com/DPDP_Rules_2025_English_only.pdf

**[LAW]** Enforcement is **phased across three dates — 14 November 2025, 14 November 2026, and 14 May 2027**:

| Phase | Date | What comes into force |
|---|---|---|
| 1 | **14 Nov 2025** | Rules 1, 2 and 17–21. Data Protection Board of India constituted. Definitions and procedural framework live. |
| 2 | **14 Nov 2026** | Rule 4 — Consent Manager registration opens. |
| 3 | **14 May 2027** | Rules 3, 5–16, 22, 23 — notice, consent standards, Data Principal rights, security safeguards, breach reporting, retention and erasure, children's data, cross-border. **Full compliance. Penalties bite.** |

**[UNVERIFIED]** The precise mapping of which *Act* sections (as opposed to Rules) are in force today, 5 September 2026, could not be confirmed against the MeitY commencement notification in this pass. **[INFER]** The safe reading: substantive obligations are largely not yet enforceable *today*, but the deadline is **14 May 2027** — roughly eight months out. A product being architected now should be built DPDP-compliant from the first commit; retrofitting consent, erasure and audit is far more expensive than building them in.

**[LAW]** Penalties (the Schedule): up to **₹250 crore** for failure to take reasonable security safeguards; up to **₹200 crore** for failure to notify a breach; up to **₹200 crore** for children's-data breaches; up to **₹150 crore** for Significant Data Fiduciary obligations; up to **₹50 crore** residuary; **₹10,000** on a Data Principal breaching her duties. These are ceilings per instance, set case-by-case by the Board, and they stack.
https://www.dpdpa.com/theschedule.html

### 3.2 Who is Data Fiduciary and who is Data Processor?

**[LAW]** s.2(i) — **Data Fiduciary**: *"any person who alone or in conjunction with other persons determines the purpose and means of processing of personal data."*
**[LAW]** s.2(k) — **Data Processor**: *"any person who processes personal data on behalf of a Data Fiduciary."*
**[LAW]** s.2(j) — **Data Principal**: the individual to whom the personal data relates.
**[LAW]** s.2(x) — **processing**: a wholly or partly automated operation including collection, recording, organisation, storage, retrieval, use, **sharing, disclosure by transmission, dissemination or otherwise making available**, erasure or destruction.

**[LAW]** s.3(c)(i) — the Act **does not apply** to *"personal data processed by an individual for any personal or domestic purpose."*
**[LAW]** s.3(c)(ii) — nor to personal data *made or caused to be made publicly available* by the Data Principal herself, or by a person under a legal obligation to publish it.
https://www.dpdpa.com/dpdpa2023/chapter-1/section3.html

**[INFER — and this is the important structural point]** The intuitive answer — "the family is the Data Fiduciary, Vivah Spot is its Processor" — **does not work under the DPDP Act**, and it is worth being precise about why:

1. The family's handling of its own guest list is processing by an individual for a **personal or domestic purpose**, exempt under **s.3(c)(i)**. An exempt individual is not a Data Fiduciary.
2. A Data Processor is defined as one who processes *"on behalf of a Data Fiduciary."* If the family is not a Data Fiduciary, **there is no Data Fiduciary for Vivah Spot to be a Processor of.** The processor role has no anchor.
3. Vivah Spot is a commercial entity. It determines the **means** entirely (its systems, its WhatsApp Business account, its templates, its RSVP page, its retention schedule) and it shares in determining the **purpose** (delivering invitations *and* running its own product). "Alone or in conjunction with other persons" in s.2(i) is satisfied.

**Conclusion [INFER]: Vivah Spot is the Data Fiduciary for guest personal data.** It cannot contract that away by calling the family the controller in the T&Cs. Build on this assumption. **This is my inference, not settled law — it needs counsel sign-off, because it is the load-bearing assumption for the entire guest-list feature.**

### 3.3 Whose consent is required for the guests?

**[LAW]** s.6(1) — consent must be *"free, specific, informed, unconditional and unambiguous with a clear affirmative action,"* and must signify agreement to processing **for the specified purpose**. Consent is given by the **Data Principal** — here, **each guest**.

**[LAW]** s.7 lists the "certain legitimate uses" that permit processing without consent. The closest is **s.7(a)**: personal data **voluntarily provided by the Data Principal to the Data Fiduciary** for a specified purpose, where she has not indicated objection.

**[INFER]** s.7(a) **does not fit**. The guest did not provide her number to Vivah Spot; the family did. No other s.7 limb (state functions, medical emergency, disaster, employment) applies. On a strict reading, **Vivah Spot needs each guest's consent before it processes that guest's contact — which is impossible to obtain before the first message, because the first message is the only way to reach her.**

**This is a genuine, unresolved gap, not a formality.** It is the same gap every contact-upload product in India faces (invite-a-friend flows, CRM uploads, event tools). I found **no** Indian authority, DPB order, or MeitY clarification resolving it. **[UNVERIFIED]**

**[INFER] Practical risk-mitigation posture** — none of these fully cures the gap; together they make the position defensible:

1. **Make the family attest.** A specific, non-pre-ticked declaration at upload: *"I confirm each person on this list is personally known to me and I have their permission to send them my wedding invitation."* This does not transfer legal liability but it is contemporaneous evidence of good faith and it makes the family's role explicit.
2. **Make the first message self-identifying and consent-bearing.** The invitation itself must say who is sending (the family, by name), on whose system, why the recipient is receiving it, and how to stop — a one-tap opt-out and a link to the privacy notice. This is the closest available analogue to the s.3 notice under Rule 3.
3. **Deliver value, not marketing.** The message must contain *only* the invitation and the RSVP link. **No Vivah Spot promotion of any kind** — no "invitations powered by Vivah Spot, download the app", no vendor ads, no follow-up sequence. The instant it carries a commercial message, it becomes marketing to a non-consenting individual and the position collapses.
4. **Hard-cap and rate-limit.** ~600 per wedding, one guest list per wedding, one wedding per family account, per-day send caps. This bounds the blast radius and evidences that the feature is not a bulk-messaging tool.
5. **Honour objection immediately.** Any guest reply of STOP/opt-out, any WhatsApp block, any email unsubscribe → suppress permanently, across all weddings, via a global suppression list keyed on a hash of the contact.
6. **Never seed anything else from this data.** No people-you-may-know, no vendor lead generation, no lookalike audiences, no analytics beyond delivery/RSVP counts, no enrichment against the user table.

### 3.4 Retention: what may be kept, and for how long

**[LAW]** s.8(7) — a Data Fiduciary shall **erase** personal data upon the Data Principal withdrawing consent, or **as soon as it is reasonable to assume that the specified purpose is no longer being served**, whichever is earlier, unless retention is necessary for compliance with any law.

**[LAW]** **DPDP Rule 8 + Third Schedule** set default retention periods, but only for named classes at scale: e-commerce entities with **≥ 2 crore** registered users (3 years from last transaction/login), online gaming with **≥ 50 lakh** users, social media with **≥ 2 crore** users. Rule 8 also requires **48 hours' advance notice** to the Data Principal before erasure, and requires the Data Fiduciary to ensure its Processors erase too.

**[INFER]** Vivah Spot is **orders of magnitude below** every Third Schedule threshold — a Shrirampur launch is not going to hit 2 crore users. **The Third Schedule therefore does not apply, and there is no prescribed retention period.** The governing rule is the general one in **s.8(7)**: erase when the purpose is exhausted.

**[LAW]** **Rule 6** — reasonable security safeguards: encryption, obfuscation, masking, virtual tokens, role-based access control; and **retention of logs and processing records for a minimum of one year**.
**[LAW]** **Rule 7** — breach: intimate affected Data Principals **without delay**; detailed report to the Data Protection Board **within 72 hours**, covering facts, causes, mitigation, responsible parties, preventive steps, and a summary of notifications issued.
https://www.dpdpa.com/dpdparules/rule6.html · https://www.dpdpa.com/dpdparules/rule7.html · https://www.dpdpa.com/dpdparules/rule8.html

**[INFER] Recommended retention schedule for guest data:**

| Data | Retention | Basis |
|---|---|---|
| Guest name + phone + email | **Purge 30 days after the last wedding event date** | s.8(7) — purpose exhausted once the wedding is over and RSVPs closed |
| RSVP responses | Purge with the guest list; export to the family (CSV) before purge | Same |
| Suppression list (opt-outs) | **Retain indefinitely, as a salted one-way hash only** | Necessary to *honour* the objection; storing the hash is less intrusive than storing the contact |
| Delivery/audit logs (event, timestamp, template id, status — **no message body, no contact in clear**) | **1 year minimum**, then purge | Rule 6 |
| Aggregate counts (invites sent, RSVP rate) | Indefinite, **non-identifying only** | Not personal data once aggregated |

### 3.5 Is the stated rule sufficient?

The operator's stated rule — *"use guest contacts ONLY to deliver that wedding's invitations, never retain for marketing"* — is **necessary but not sufficient**. [INFER] It correctly implements **purpose limitation** (s.6(1) "specified purpose") and points at **s.8(7)** erasure. It leaves out, at minimum:

- **Notice** (s.5 + Rule 3): itemised description of the personal data, the specified purpose, how to withdraw consent as easily as it was given, how to exercise rights, and how to complain to the Board — presented **independently of other information**, not buried in the T&Cs, in clear and plain language.
  https://www.dpdpa.com/dpdparules/rule3.html
- **A defined erasure trigger and an actual erasure job.** "Never retain for marketing" is a use restriction; s.8(7) requires **deletion**. A cron that runs, logs, and can be evidenced.
- **Data Principal rights machinery** (ss.11–14): access (what do you hold about me), correction, erasure, grievance redressal, and nomination. A guest who was never a user must still be able to exercise these — so there must be a **public, no-login rights channel**, reachable from the invitation message itself.
- **Security safeguards** (s.8(5) + Rule 6): encryption at rest for the contact table, RBAC so no ordinary admin can browse guest lists, and one-year logs.
- **Breach notification** (s.8(6) + Rule 7): a written 72-hour runbook, drafted before it is needed.
- **Published contact** (s.8(9)): the business contact of the person able to answer questions about processing, published on the site and in the notice.
- **Processor contracts** (s.8(2)): a written contract with every processor in the chain — the WhatsApp BSP, the email sender (SES/Sendgrid), the cloud host, any analytics vendor. **[INFER]** A BSP that retains message content or contact data beyond delivery is a live problem; check the BSP's own retention terms before signing.

**[INFER]** One more, easy to miss: **the guest list itself is also personal data about the family**. And the **RSVP page** — if it is publicly addressable and shows guest names or responses, that is disclosure. Make RSVP links unguessable per-guest tokens, `noindex`, and never enumerate the guest list on a page any guest can see.

---

## Q4 — The non-party claim

### 4.1 What the platform is asserting

That the Agreement is a contract between couple and vendor; that Vivah Spot is a record-keeper and not a party; that it does not mediate, adjudicate or underwrite; and that its T&Cs say so.

### 4.2 What holds the claim up

**[LAW]** **Privity of contract.** The Indian Contract Act 1872 makes the parties to a contract those who offer, accept and furnish consideration. Vivah Spot offers nothing to the couple under the Agreement, accepts nothing, and receives no consideration under it. On orthodox privity, Vivah Spot is not a party. Merely providing the stationery does not make the stationer a party.

**[LAW]** **IT Act s.79** safe harbour, subject to ss.79(2) and 79(3) — see 2.7.

**[LAW]** **E-Commerce Rules rule 5(1)** expressly contemplates a marketplace availing s.79(1), conditioned on s.79(2)–(3) compliance. The regulatory architecture *accepts* that a marketplace can be a non-party.

**[INFER]** The strongest factual support for non-party status in Vivah Spot's design: **no money passes through the platform.** Across the case law below, the recurring hook for liability is that the platform **collected the consideration** or **took a commission on the transaction**. Vivah Spot does neither. That is a materially better position than Goibibo, Amazon or MakeMyTrip.

### 4.3 What knocks the claim down — the case law and regulatory practice

**[SETTLED] *Christian Louboutin SAS v. Nakul Bajaj & Ors.*, Delhi High Court, 2018 (2018 SCC OnLine Del 12215).** The court drew the line between a platform that is a passive **intermediary** and one that is an **active participant**, and listed the activities that push a platform across: identification of the seller, transportation, quality assurance, collection of payment, authenticity guarantees, advertisement and promotion of the product, membership schemes, member-only discounts, uploading the listing entry itself, booking ad space, deep-linking. **The more of these a platform does, the less it is an intermediary.**
https://www.lexology.com/library/detail.aspx?g=35bf6d36-2c8d-45de-9f42-476bc7885f21

**[SETTLED] *Goibibo.com v. Amrit Pal Jaiswal*, NCDRC, R.P. No. 2544/2023, decided 4 September 2024.** Goibibo argued it was *"merely a facilitator between consumers and airlines"* with *"no control over the actions or omissions of the service provider,"* and pointed to its User Agreement disclaiming *"liability for the non-operation of flights by the airline,"* plus IT Act intermediary immunity. **The NCDRC rejected all of it**, holding that an intermediary earning a commission *"is not simply a facilitator but also earns a commission, implying a responsibility to manage refunds"* — and effectively invalidated the contractual disclaimer.
https://www.livelaw.in/consumer-cases/intermediary-can-be-held-liable-refunding-customers-ncdrc-holds-goibibo-liable-deficiency-in-service-268545

**[SETTLED]** NCDRC has repeatedly held that in a tripartite arrangement the platform cannot escape by saying it was not privy to the negotiation, where it had the ability to control quality or withhold payment.
https://www.scconline.com/blog/post/2022/09/26/ncdrc-tripartite-contract-seller-service-provider-consumer-liability-of-seller-and-service-provider-defective-deficient-product-service-consumer-protection-legal-news-and-updates/

**[SETTLED] The general principle:** contractual disclaimers and safe-harbour provisions **cannot override public-law obligations under consumer protection law and tort.** A term is not effective merely because a user tapped past it — and under CP Act **s.2(46)** an "unfair contract term" is independently reviewable.

**[INFER] The zero-price defence — and why it probably fails.** CP Act **s.2(42)** defines "service" to exclude *"the rendering of any service free of charge."* Families pay ₹0, so on a literal reading a family is not a "consumer" of Vivah Spot's service and cannot bring a consumer complaint against it. **Do not rely on this.** The Supreme Court in ***Indian Medical Association v. V.P. Shantha*, (1995) 6 SCC 651** held that service rendered free of charge to some recipients, where the cost is borne by other paying recipients, **is** "service" under the Act. **[INFER]** By direct analogy, families are served free but the cost is borne by paying vendor subscribers — a consumer forum is very likely to hold that families *are* consumers of Vivah Spot. The analogy is mine; the case is real and well-known, but **[UNVERIFIED]** I did not find it applied to a zero-price digital platform.

### 4.4 Verdict

**[INFER]** **The non-party claim survives — but only if the product behaves like a non-party.** The T&C wording is the least important part of it. What actually decides it, on the *Louboutin* factors and the *Goibibo* reasoning:

**Preserves non-party status:**
- No money touches the platform. No commission, no escrow, no split, no "convenience fee" on the couple–vendor deal. **This is the single most important design constraint in the product — protect it absolutely.**
- The Agreement's substantive terms (price, dates, deliverables, cancellation) are **authored by the parties**, not proposed, templated-with-defaults, or recommended by the platform.
- No guarantee, warranty, refund promise, quality assurance, insurance or "protection" of any kind on the couple–vendor transaction.
- Paid placement labelled honestly, and clearly not an endorsement.
- Neutral, published, rule-based dispute posture: the platform records, it does not adjudicate.

**Destroys non-party status:**
- Any commission, cut, escrow or payment facilitation. Ever.
- Marketing language implying assurance — *"Book with confidence"*, *"Vivah Spot guarantees"*, *"Verified vendors"* (unless "verified" is defined precisely and the verification is actually performed and documented), *"Safe"*, *"Protected"*, *"Trusted"*.
- Supplying the Agreement's commercial terms as platform-authored defaults. **[INFER]** A template with pre-filled cancellation terms is the platform proposing terms. Provide **structure** (fields, headings, a checklist of what to agree) but not **substance** (numbers, percentages, favoured positions).
- Intervening in disputes ad hoc. Occasional informal mediation — a founder WhatsApping a vendor to "sort it out" — is exactly the conduct that creates a course of dealing, a duty of care, and reliance. **Either never mediate, or build a published, consistent, disclosed process. Do not do it informally.**
- Awarding badges, rankings or "recommended" flags that a consumer would read as vetting.

**[INFER — the sharpest risk]** The word **"Agreement"** and the act of **timestamping it** are, on balance, protective — they create evidence of what the parties agreed and reduce he-said-she-said. But the moment the feature is *marketed* as protection ("your booking is protected by a Vivah Spot Agreement"), it induces reliance, and reliance is how a facilitator becomes a guarantor. **Describe it functionally, never protectively:** "a record of what you and the vendor agreed, timestamped and downloadable by both of you." Then say plainly, in the same screen, that Vivah Spot is not a party, does not verify the terms, and will not resolve disputes about them.

---

## Q5 — WhatsApp Business API and the invitations

### 5.1 Meta's opt-in requirement — the operative text

**[LAW — contractual, not statutory]** WhatsApp Business Messaging Policy:

> "You may only contact people on WhatsApp if: (a) they have given you their mobile phone number; and (b) you have received opt-in permission from the recipient."

> "You are solely responsible for determining the method of opt-in, that you have obtained opt-in in a manner that complies with laws applicable to your communications."

Both conditions run to **the business operating the WhatsApp Business Account** — here, Vivah Spot — and both are satisfied by **the recipient**, not by a third party.
https://whatsappbusiness.com/policy/

**[SETTLED]** Business-initiated messages (outside the 24-hour customer service window) require a **pre-approved template** in the correct category — Marketing, Utility, or Authentication. Marketing templates require **explicit marketing opt-in**. Miscategorising marketing content as Utility is an enumerated ban trigger.

### 5.2 Can invitations be sent to 600 non-users?

**[INFER] Not from Vivah Spot's own WhatsApp Business Account, not compliantly.** The analysis is short and unforgiving:

- Condition (a) fails — the guests gave their numbers to the **family**, not to Vivah Spot.
- Condition (b) fails — no guest has opted in to Vivah Spot.
- 600 template messages to cold numbers from a new WABA is the exact pattern Meta's anti-spam machinery is built to catch: **block-and-report rate** against volume, **quality rating** (green/yellow/red), **messaging tier limits**, then flagging, throttling, and permanent ban of the number and potentially the business.
- A ban is not merely a feature outage. It takes the WABA, the display name, and the phone number with it — and re-establishing a WABA after a policy ban is difficult.

**[INFER]** Meta's enforcement posture is **automated, signal-driven and unforgiving**, and it does not care that the underlying message is benign. A wedding invitation from an unknown business number reads to a recipient exactly like spam, and one in fifty will tap "Report". At 600 sends per wedding across dozens of weddings, that ratio is fatal.

### 5.3 Whose opt-in counts

**[LAW/INFER]** **Each guest's opt-in, to Vivah Spot.** The family's consent is legally and contractually irrelevant to Meta's requirement — Meta's condition is about the relationship between *the business* and *the recipient*. (Note this is exactly parallel to the DPDP analysis in Q3.3, which lands in the same place for the same underlying reason: the guest is the one whose rights are engaged.)

### 5.4 Viable designs

**[INFER] Ranked, best first:**

1. **Family-sends, platform-composes (recommended for v1).** Vivah Spot generates the invitation and a per-guest RSVP link; the **family** sends it from **their own personal WhatsApp**, via `wa.me` deep links, the native share sheet, or a copy-ready message. Vivah Spot's WABA never touches a guest. **This is entirely outside the Business Messaging Policy, outside DLT, and outside the DPDP consent problem for outbound sending** — though the platform still processes the contacts to build the links, so Q3 still applies to storage. Cost: the family does more work, and the send is not automated. Benefit: the risk goes to approximately zero.
2. **Guest-initiated (opens the 24-hour service window).** The family shares a single link; the guest taps it and messages Vivah Spot's WhatsApp first ("Hi, I'm attending Priya & Rohan's wedding"). That inbound message opens a 24-hour customer-service window during which free-form replies are permitted and no template opt-in issue arises. Compliant and elegant, but conversion depends on the guest taking the first step.
3. **Email + SMS instead of WhatsApp for the cold first touch.** Email is far more permissive. **SMS is not** — see 5.5.
4. **Explicit per-guest opt-in captured on the RSVP page**, then WhatsApp for *subsequent* messages (venue change, reminders). This is the only clean path to platform-initiated WhatsApp at scale, and it inverts the flow: first contact by another channel, WhatsApp only after consent.

**[INFER]** Whatever is chosen, **do not** buy a "bulk WhatsApp sender" or an unofficial API. Those use unofficial clients, breach the Business Terms outright, and get numbers banned faster than the official API does.

### 5.5 TRAI, TCCCPR and DLT — does it apply?

**[LAW]** The **Telecom Commercial Communications Customer Preference Regulations, 2018 (TCCCPR 2018)**, issued 19 July 2018, in force 28 February 2019, regulate **commercial communications carried over the networks of telecom access providers** — i.e. **SMS, voice calls, and RCS**. DLT registration (sender/header/template/consent registration on a blockchain platform maintained by the access providers) is mandatory for anyone sending commercial communications over those channels.
https://trai.gov.in/tcccpr

**[LAW]** The **TCCCPR (Second Amendment) Regulations, 2025**, notified **12 February 2025**, tightened the framework — mixed-content messages are now all treated as promotional, senders must be authenticated and traceable, each sender is limited to two telemarketers, and complaint-mechanism refinements took effect 13 April 2025.
https://www.trai.gov.in/sites/default/files/2025-02/Regulation_12022025.pdf

**[SETTLED]** **TCCCPR does NOT apply to WhatsApp or other OTT messaging apps.** TRAI's jurisdiction runs to telecom service providers and their networks, not to applications over the internet. Telcos (Airtel and others) have publicly and repeatedly demanded that OTT platforms be brought in; **TRAI has declined, stating that OTT apps fall under MeitY, not TRAI**, and that it has informed MeitY accordingly.
https://inc42.com/buzz/telecos-question-trais-latest-spam-rules-excluding-whatsapp-other-otts/ · https://telecomtalk.info/airtel-trai-regulate-whatsapp-ott-combat-spam/990872/

**[INFER] Practical upshot:**

- **WhatsApp leg** → governed by **Meta's contract** and by **DPDP**. No DLT. No TRAI. The enforcement risk is commercial (ban) not regulatory (penalty) — but a ban is existential for the feature.
- **SMS leg** → **fully inside TCCCPR/DLT.** If Vivah Spot ever sends an SMS invitation or reminder, it needs a **registered sender/header**, **registered templates**, and **registered consent** on a DLT platform, scrubbed against the DND/preference registers, and correctly classified transactional vs promotional. **[INFER]** A wedding invitation sent by a business on a family's behalf is very likely **promotional** under the 2025 amendment's mixed-content rule, which means it must be scrubbed against DND — and a large share of 600 Indian numbers will be DND-registered. **SMS is therefore a poor channel for this feature.** Prefer email and family-sent WhatsApp.
- **Email leg** → no Indian statutory opt-in regime equivalent to CAN-SPAM or GDPR e-Privacy. DPDP applies. Deliverability (SPF/DKIM/DMARC, a warmed sending domain, one-click unsubscribe) is the real constraint, not law.

**[INFER] Monitor:** TRAI/MeitY have been circling OTT spam regulation for two years. If MeitY extends a UCC-style regime to OTT apps, the family-sends design (option 1) remains safe while any platform-initiated design does not. Another reason to prefer option 1.

---

## Q6 — GST on vendor subscriptions

### 6.1 Rate

**[LAW]** **18%.** The GST Council's rationalisation announced **3 September 2025** and effective **22 September 2025** ("GST 2.0") collapsed the 12% and 28% slabs into a two-rate structure of 5% and 18%, with a 40% demerit rate. **Services were largely excluded from the restructuring**, and **digital advertising and online content services expressly remain at 18%.** (Print advertising in newspapers/magazines stays at 5% — irrelevant here.)
https://www.socialsamosa.com/industry-updates/gst-2-keeps-digital-ads-at-18-print-at-5-9903038 · https://cleartax.in/s/gst-rates

### 6.2 SAC classification

**[LAW]** Candidate codes, **all at 18%**:

| SAC | Description | Best fit for |
|---|---|---|
| **998365** | Sale of internet advertising space (banner ads, search ads, placements charged by impression/click/time) | **Paid "Featured" placement** |
| **998439** | Other on-line contents n.e.c. (group 99843 — on-line content services) | Listing subscription (content/profile hosting view) |
| **998599** | Other support services n.e.c. | Listing subscription (business-support view) |

**[SETTLED]** AAR rulings have confirmed sale of internet advertising space attracts 18%.
https://www.taxscan.in/sale-of-internet-advertising-space-attracts-18-gst/191165

**[INFER] Recommendation:** invoice **Featured placement under 998365** and the **base listing subscription under 998439**, and put them on **separate invoice lines** even when bundled in a single plan. Two reasons: (a) it matches the economic substance and survives scrutiny better than a single blended line; (b) if rates ever diverge between advertising and content services, the split is already in place. **[UNVERIFIED]** Classification is fact-specific and I found no ruling squarely on "online vendor directory subscription". **Since the rate is 18% either way, the exposure is classification-mismatch penalty risk, not tax risk.** Get a CA to sign off; consider an advance ruling under CGST s.97 only if the amounts justify it (they likely will not at launch).

### 6.3 Place of supply

**[LAW]** **IGST Act s.12(2)** — where supplier and recipient are both in India, the place of supply of services is:
- **(a)** made to a **registered person** → **the location of such person**;
- **(b)** made to **any other person** → the location of the recipient where the address on record exists, and **the location of the supplier** in other cases.
https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_IGST_Act/active/chapterv/section12_v1.00.html

**[INFER] For a Maharashtra operator selling to Maharashtra vendors:**

| Vendor | Place of supply | Tax |
|---|---|---|
| Registered, Maharashtra | Maharashtra | **Intra-State → CGST + SGST (9% + 9%)** |
| Unregistered, address on record in Maharashtra | Maharashtra | **Intra-State → CGST + SGST** |
| Unregistered, no address on record | Location of supplier (Maharashtra) | **Intra-State → CGST + SGST** |
| Registered, outside Maharashtra | That State | **Inter-State → IGST 18%** |

**[INFER]** For a Shrirampur launch this is CGST + SGST in essentially every case — but **capture the vendor's GSTIN and State at onboarding anyway**, because the moment one Pune or Nashik vendor with an out-of-state registration signs up, the invoice must flip to IGST. Hard-coding CGST+SGST is a latent bug. The tax computation must be driven by the recipient's registration State, not assumed.

### 6.4 Registration threshold

**[LAW]** **₹20 lakh** aggregate turnover for a **service** supplier. Maharashtra is not a special-category State. Aggregate turnover is computed **PAN-India across all GSTINs** and includes taxable, exempt, export and inter-State supplies, excluding taxes and inward reverse-charge supplies.

**[LAW]** **CGST s.24** compulsory registration irrespective of threshold. **s.24(x)** covers *"every electronic commerce operator who is required to collect tax at source under section 52"* — as substituted by the CGST (Amendment) Act 2018 **w.e.f. 1 February 2019**. **s.52** TCS applies to an ECO **"where the consideration with respect to such supplies is to be collected by the said operator."**

**[INFER — and this is a genuinely favourable consequence of the no-money-on-platform design]** Vivah Spot does **not** collect the consideration for the couple–vendor supply. Therefore **s.52 TCS does not apply**, therefore **s.24(x) compulsory registration does not bite**, and Vivah Spot registers on the ordinary **₹20 lakh** threshold like any other service provider. **[UNVERIFIED]** Worth a CA's explicit confirmation, because the definition of "electronic commerce operator" in s.2(45) (*owns, operates or manages a digital or electronic facility or platform for electronic commerce*) is broad enough that Vivah Spot may well *be* an ECO — it just isn't one **required to collect TCS**. Also note **s.9(5)** reverse charge applies only to notified services (passenger transport, accommodation, housekeeping, restaurant) — **wedding services are not notified**, so no s.9(5) exposure.

**[INFER]** Also check **s.24(i)** — persons making **inter-State taxable supply** must register irrespective of turnover. If a single out-of-Maharashtra vendor subscribes before turnover reaches ₹20 lakh, registration may become compulsory immediately. There is a notification exempting inter-State suppliers of **services** below the threshold (Notification 10/2017-IT), so this probably does not bite — **[UNVERIFIED]**, confirm with the CA.

### 6.5 Invoicing

**[LAW]** **Rule 46, CGST Rules 2017** — a tax invoice must contain: supplier name, address, GSTIN; a **consecutive serial number**, unique for the financial year, not exceeding 16 characters (alphanumeric, `-` and `/` only); date of issue; recipient name, address, GSTIN/UIN if registered; **for unregistered recipients where taxable value ≥ ₹50,000: name, address, address of delivery, State and State code**; **SAC**; description; taxable value; **rate and amount of CGST/SGST/IGST separately**; **place of supply with State name** (for inter-State); whether tax is payable on reverse charge; signature or digital signature.

**[LAW]** **Rule 47** — invoice for services within **30 days** of supply.
**[LAW]** **s.13(2) CGST** — time of supply of services is the **earliest** of the date of invoice (if issued within the Rule 47 period) or **the date of receipt of payment**. **GST is payable on advances received for services.**
**[LAW]** **Rule 50** — on receipt of an advance, issue a **Receipt Voucher**. **Rule 51** — on refunding an advance where no supply is made, issue a **Refund Voucher**.

**[INFER — this is the trap in a prepaid subscription model.]** A 12-month subscription paid up front on 1 April is an **advance**. GST on the **entire** amount is payable in the April return, not spread across twelve months. Deferred revenue recognition in the books does **not** defer the GST liability. Two concrete consequences:

1. **Cash-flow:** 18% of every annual plan goes out in the month of collection. Model this.
2. **Product:** the system must issue a **Receipt Voucher at the moment of payment** (or a tax invoice, if issued within 30 days — simpler: issue the tax invoice immediately on payment and skip the receipt voucher entirely, which is the cleaner design), and must be able to issue a **Refund Voucher** on cancellation. Build refund/credit-note handling from day one; retrofitting GST document types is painful.

**[LAW]** **E-invoicing (IRN)** — mandatory where **aggregate annual turnover exceeds ₹5 crore** in any financial year from 2017-18 onwards; the obligation is sticky once crossed. A **30-day reporting window** to the IRP applies at **AATO ≥ ₹10 crore** (from 1 April 2025). **[INFER]** Vivah Spot will be nowhere near ₹5 crore at launch — **e-invoicing does not apply initially**, but the invoice numbering and data model should be IRN-shaped so the switch is configuration, not rework.

### 6.6 The ₹0 "Founding Vendor" tier

**[LAW]** **CGST s.7(1)(a)** — supply requires **consideration** (in the course or furtherance of business). **s.7(1)(c) + Schedule I** deems certain things to be supply **even without consideration**: permanent transfer/disposal of business assets where ITC has been availed; **supply between related persons or distinct persons** in the course or furtherance of business; principal–agent supplies; import of services from a related person.

**[INFER] A ₹0 Founding Vendor tier given to an unrelated third-party vendor is NOT a supply, and no GST is payable on it.** Schedule I does not reach it: the vendor is not a "related person" under the s.15 Explanation, not a "distinct person" (that means the same PAN in another State), and a listing is not a business asset being permanently transferred.

**Three caveats [INFER], and the first is the one that actually bites:**

1. **Watch for non-monetary consideration.** "Consideration" under **s.2(31)** includes *"the monetary value of any act or forbearance."* If the Founding Vendor tier is conditional — the vendor must supply photographs for the platform's marketing, give a testimonial, appear in a launch video, grant exclusivity, refer other vendors, or accept a lock-in — **that is consideration**, the supply becomes taxable, and value must be determined under **Valuation Rules 27–31** (open market value; the price of a comparable paid plan would be the obvious benchmark). **Keep the free tier genuinely unconditional and document it that way.** A no-strings free tier is clean; a barter is a tax event.
2. **Related parties.** If any Founding Vendor is a relative, an employee, a director, or a business Pravin/Abhishek control, Schedule I para 2 applies and GST is payable on open market value. Screen the founding cohort for this.
3. **ITC.** **s.17(5)(h)** blocks ITC on **goods** disposed of by way of free samples or gifts. It is expressed in terms of goods, and does not on its face block ITC on inputs used to provide a **free service** that is part of the business. **[UNVERIFIED]** — the position on ITC apportionment for free services is not free from doubt and departmental views vary; get the CA's written view before claiming full ITC in a period with a large free cohort.

**[INFER]** Also: aggregate turnover for the ₹20 lakh threshold is measured on the **value of supplies**. A ₹0 supply contributes ₹0. A large free cohort therefore delays registration — which is fine, but means the registration trigger must be monitored against **paid** revenue, and registration obtained *before* crossing, not after.

---

## Q7 — Online consumer reviews (IS 19000:2022) and two-way reviews

### 7.1 Status: voluntary

**[LAW]** **IS 19000:2022, "Online Consumer Reviews — Principles and Requirements for their Collection, Moderation and Publication"**, published by the Bureau of Indian Standards in **November 2022** (effective 25 November 2022). **Compliance is voluntary.** It is an Indian Standard, not a Quality Control Order and not subordinate legislation.
Full text: https://archive.org/details/gov.in.is.19000.2022

**[LAW]** The Department of Consumer Affairs has publicly said it will consider making it **mandatory** if fake reviews persist, held a consultation in **May 2024** on drafting a **Quality Control Order** to that effect, and major platforms (Amazon, Flipkart, Google, Meta) endorsed mandatory compliance.
https://www.medianama.com/2024/05/223-consumer-affairs-department-holds-consultation-on-reducing-fake-reviews-online/

**[UNVERIFIED]** I could **not** confirm whether a QCO making IS 19000 mandatory has been notified as of September 2026. Searches surfaced QCOs in unrelated sectors but nothing on online reviews. **Treat as still voluntary, monitor, and build to the standard anyway** — see 7.4.

### 7.2 What the standard requires

**[LAW]** Scope: any organisation that publishes consumer reviews online — a supplier collecting reviews from its own customers, a third party contracted by the supplier, or an independent third party. It defines duties for both the **review author** and the **review administrator** (the platform).

**[LAW]** Core requirements:

- **Written terms and conditions** for review submission: the review must be the author's **personal consumer experience**, factually correct to the best of her knowledge, and must not contain defamatory language or marketing material.
- **Verification of authors** — email confirmation links, phone/SMS OTP, single sign-on through trusted platforms, CAPTCHA and anti-fraud tooling, IP/geolocation checks, one-account-per-user controls.
- **Moderation** — automated or manual screening for fraudulent content, applied with **equal treatment regardless of sentiment**. Negative reviews may not be screened more aggressively than positive ones.
- **Publication** — publish without undue delay (**within 72 hours where possible**); allow filtering by verification status; **disclose the criteria used to order/sort reviews**; no selective publication of favourable reviews; no editing of review content.
- **Incentivised reviews must be marked as such** and should not influence the overall rating.
- **Prohibited**: buying reviews, offering incentives for reviews (without disclosure), suppressing negative feedback, selective publication.
- **Right of reply** for the business being reviewed.

Sources: https://ssrana.in/articles/bis-standards-for-verifying-consumer-reviews-ensuring-transparency-integrity/ · https://www.jsalaw.com/newsletters-and-updates/bis-standard-on-online-consumer-reviews/

### 7.3 Two-way, double-blind reviews — the issues

**[INFER] (a) IS 19000 does not cover the vendor→family direction.** The standard is about **consumer** reviews of goods and services. A vendor's review of a *family* is a business's assessment of a natural person. It falls **outside** the standard's scope entirely — which means IS 19000 neither blesses it nor prohibits it, and the operator gets no comfort from compliance in that direction.

**[INFER] (b) Double-blind is compatible with IS 19000 — with one caveat.** Withholding both reviews until both are submitted (or until a window closes) is a well-established anti-retaliation design, and IS 19000's "publish within 72 hours where possible" is qualified, not absolute. But if a review is **never** published because the other side never submitted, that is functionally **selective publication** and it skews the visible rating. **Fix: publish after a fixed window (e.g. 14 days) regardless of whether the counterparty submitted.** Disclose the rule on the reviews page. This satisfies the sorting/criteria disclosure requirement at the same time.

**[INFER] (c) DPDP applies to reviews of families.** A vendor's review of an identified family is **personal data** about identifiable individuals, published by Vivah Spot. That needs: a lawful basis (consent, obtained at signup with a specific, non-pre-ticked disclosure that vendors may review them and that those reviews may be visible), notice, correction rights (s.12), and erasure on withdrawal (s.8(7)). **[INFER]** Erasure creates a direct tension: a family withdrawing consent can force deletion of a vendor's negative review of them. There is no clean answer. **Mitigation: never publish a family's identity with a vendor's review.** Aggregate it — a reliability score, a "responds to enquiries" badge, or a count — visible only to vendors, never as free text naming a private individual. This kills the defamation risk and most of the DPDP risk in one move, and it is a better product besides.

**[INFER] (d) Defamation.** Free-text negative reviews about private individuals are the highest-defamation-risk content a platform can host (**BNS 2023 s.356**, plus civil defamation). Indian courts have been willing to order intermediaries to remove defamatory reviews on notice, and platforms that do not act promptly face liability — and the takedown window is now **3 hours** for court/government orders and **36 hours** for unlawful-content grievances (Q2.8). **[INFER]** A private individual has far more to lose from a public bad review than a business does, and far more incentive to sue. **Strongly recommend: vendor→family feedback is structured (ratings/tags), private to vendors, and never free text.**

**[INFER] (e) Consumer-protection angle on gating.** If a low family score degrades a family's access to the free service, that is arguably an **unfair contract term** (CP Act s.2(46)) or an unfair trade practice — a consumer penalised by an opaque score assigned by a counterparty with a commercial interest. If family scores affect anything, the criteria must be published, the family must be able to see her own score, and there must be an appeal.

**[INFER] (f) Vendor incentives.** Vendors pay for listing. If subscription tier, Featured eligibility, or ranking depends on review score, vendors have a direct financial motive to farm reviews. IS 19000's anti-fake-review controls (verified authors, one account per user, anti-fraud tooling) become load-bearing, not decorative. **Tie reviews to a real Enquiry record** — only a family that actually enquired with that vendor can review it. That single control does more than every other measure combined.

---

## Q8 — In-app confirmation as an electronic record

### 8.1 Legal status of the record

**[LAW]** **IT Act 2000 s.4** — where any law requires information to be **in writing**, that requirement is satisfied if the information is rendered or made available in an **electronic form** and **accessible so as to be usable for a subsequent reference**.

**[LAW]** **s.5** — where any law requires a **signature**, that requirement is satisfied by an **electronic signature** affixed in the prescribed manner. (Note: s.5 is engaged only where a signature is *required by law*. A wedding-services contract requires no signature by law — so s.5 is not a barrier, and a tap does not need to be a s.3/s.3A digital signature to bind.)

**[LAW]** **s.10A** (inserted by the IT (Amendment) Act 2008) — where in a contract formation the communication of proposals, acceptance of proposals, revocation of proposals and acceptances is expressed in **electronic form or by means of an electronic record**, *"such contract shall not be deemed to be unenforceable solely on the ground that such electronic form or means was used for that purpose."*

**[LAW]** **First Schedule** to the IT Act — documents/transactions to which the Act's electronic-record provisions do **not** apply. As amended by notification dated **26 September 2022**, the entry *"any contract for the sale or conveyance of immovable property or any interest in such property"* was **omitted**. The remaining exclusions are negotiable instruments (other than a cheque), powers-of-attorney, trusts, and wills/testamentary dispositions.
https://www.leegality.com/blog/first-schedule · https://www.lexology.com/library/detail.aspx?g=2df1ea2e-86f7-46db-b9f2-fd24a0989b8f

**[INFER]** **A wedding-services agreement is not in the First Schedule.** s.10A applies fully. There is no legal obstacle to forming it electronically.

### 8.2 Is it an enforceable contract between the two parties?

**[SETTLED]** **Yes, subject to ordinary contract law.** Indian courts have consistently accepted electronically formed and clickwrap contracts where offer, acceptance, consideration, lawful object, capacity and free consent are present. ***Trimex International FZE v. Vedanta Aluminium Ltd.*, (2010) 3 SCC 1** — the Supreme Court held that a contract concluded by exchange of emails was a valid and binding contract, no formal signed document being necessary. ***LIC of India v. Consumer Education & Research Centre*, (1995) 5 SCC 482** — standard-form contracts with unequal bargaining power are open to judicial scrutiny.

**[INFER]** So: a tap-to-confirm by both parties on a set of terms **is** a contract. What makes it *robust* is not the tap but the surrounding evidence — and evidence is a product decision:

- The **exact terms as rendered to each party at the moment of confirmation**, stored immutably (not the current version of a template that has since changed).
- Unambiguous, affirmative assent — a button labelled *"I agree to these terms"*, **never** a pre-ticked box (also required by E-Commerce Rule 4(9)) and never assent inferred from continued use.
- The terms **visible before the button**, scrollable, and downloadable *before* confirming — not behind a link.
- Both parties' confirmations captured as separate, independently timestamped events.

**[INFER]** **Stamp duty is the sleeper issue.** Under the **Maharashtra Stamp Act 1958**, **s.2(l)** includes **electronic records** in the definition of "instrument", and "signed"/"signature" include attribution of electronic records under IT Act s.11. An agreement not otherwise specifically provided for is chargeable under **Article 5(h)** of Schedule I. **s.34** makes an **insufficiently stamped instrument inadmissible in evidence** until duty and penalty are paid. **[UNVERIFIED]** — I could not confirm the current rate under Article 5(h)(B) for a general agreement (commonly cited as ₹100, but Maharashtra has amended the Schedule repeatedly). **[INFER]** The exposure is not Vivah Spot's — it is the couple's and the vendor's, and it arises only if one of them tries to *produce* the Agreement in a Maharashtra court. But it is a real limitation on the feature's value proposition and should be disclosed: *"This record may need to be stamped under the Maharashtra Stamp Act before it can be produced in court."* **Ask a Maharashtra advocate.** Do not let the product imply the Agreement is court-ready as-is.
https://www.indiacode.nic.in/bitstream/123456789/22026/1/the_maharashtra_stamp_act,_1958.pdf · https://vinodkothari.com/2020/01/stamp-duty-implications-on-e-agreements/

### 8.3 Does the platform acquire liability by hosting it?

**[INFER]** **Hosting, by itself, does not.** Hosting a record created by two other parties is paradigmatic intermediary activity under IT Act s.2(1)(w), protected by s.79 provided ss.79(2)–(3) are met. See Q4.4 for what forfeits it. The short version:

- **Hosting + timestamping + serving a download** → intermediary function. Protected.
- **Authoring or defaulting the commercial terms** → the platform is proposing terms; drifts toward s.79(2)(b) "selects or modifies the information", and toward *Louboutin* "active participant".
- **Promising the record is legally enforceable, court-admissible, or protective** → a representation by the platform in its own right. Not third-party content. **No safe harbour**, and a potential misleading-advertisement exposure under CP Act s.2(28)/s.21.

**[INFER]** So: host it, timestamp it, let both sides download it, describe it accurately — and **make no legal claims about it**. If the UI says "legally binding", that is Vivah Spot's own statement about a legal matter, made to consumers, and it is both unprotected and quite possibly wrong in a given case (unstamped, or vitiated by some defect in formation).

### 8.4 Record-keeping for evidential value — Bharatiya Sakshya Adhiniyam 2023

**[LAW]** **BSA 2023 s.61** — an electronic or digital record shall not be denied admissibility merely on the ground that it is electronic, and shall have the same legal effect as paper records.

**[LAW]** **s.63** (successor to s.65B, Indian Evidence Act 1872):
- **63(1)** — information contained in an electronic record which is printed on paper, or stored, recorded or copied in optical or magnetic media or produced by a computer or communication device, **shall be deemed to be a document** and admissible without further proof of the original, if the 63(2) conditions are satisfied.
- **63(2)** — the conditions: (a) the computer output was produced during the period the device was used **regularly** to create, store or process information for activities regularly carried on; (b) information of that kind was **regularly fed** into it in the ordinary course of those activities; (c) the device was **operating properly** throughout the material period, or any malfunction did not affect the accuracy of the record; (d) the information reproduces or is derived from information fed in in the ordinary course.
- **63(3)** — where multiple computers/communication devices performed these functions, whether in combination, in succession, or over a network, **all are treated as a single device**.
- **63(4)** — a **certificate** must accompany the electronic record: identifying the record, describing the manner of its production, giving particulars of the devices involved, addressing the 63(2) matters, **signed by a person in charge of the computer or communication device or the management of the relevant activities**, *and* by an expert.
- **The Schedule to the BSA prescribes the certificate format: Part A** (completed by the party producing the record) **and Part B** (completed by an **expert**). The certificate requires the **hash value** of the electronic record (SHA-256, SHA-1 or MD5 being the recognised algorithms in the prescribed form).

**[SETTLED]** ***Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal*, (2020) 7 SCC 1** — the certificate is **mandatory** for secondary electronic evidence; without it the record is inadmissible. The BSA carries this regime forward and adds the prescribed two-part format and the expert signature.
https://indiankanoon.org/doc/125020475/ · https://www.livelaw.in/articles/electronic-evidence-admissibility-section-63-bhartiya-saksha-adhiniyam-2023-261511

**[INFER — the requirements that follow, and these are real product requirements, not documentation]:**

1. **Hash every Agreement at the moment of second confirmation.** Compute and store **SHA-256** of the canonical rendered document (PDF/A). The Part B certificate asks for it; a hash computed later, from a re-render, proves nothing.
2. **Freeze the rendered artefact, not the template.** Store the exact PDF each party saw. Template versions change; the evidence must not.
3. **Append-only audit log.** Per confirmation event: user id, role, timestamp, IP, user-agent, device id, app version, document id, **document hash**, and the terms version. Append-only (or hash-chained), no UPDATE path, no DELETE path.
4. **Trusted, synchronised time.** Server-side timestamps only — never client clocks. NTP-synchronised (NIC/NPL, which is also the CERT-In direction), stored in UTC, displayed in IST. The whole value of a "timestamped" Agreement is that the timestamp is trustworthy, and a client-supplied time is worthless.
5. **Name a "person in charge of the computer."** s.63(4) requires a signature from a person in charge of the device or the management of the relevant activities. **Designate that role by name in the org, and document the deputy.** If nobody holds this role, no certificate can be issued and the entire evidential chain fails at the last step. This is a one-line organisational decision that is very easy to forget.
6. **Build a certificate generator.** An admin function that, for a given Agreement, emits a pre-filled **Part A** in the BSA Schedule format: record identification, manner of production, device particulars, the 63(2) matters, and the hash. Part B needs an expert — but Part A should be one click, not a scramble two years later when a summons arrives.
7. **Retain long enough.** Limitation for a contract claim is **3 years** from breach (Limitation Act 1963, Art. 55). **[INFER]** Retain Agreements and their audit logs **8 years** — comfortably beyond limitation plus appeal, and aligned with the 8-year books-of-account retention under CGST s.36 and Companies Act s.128(5). Note this sits in tension with DPDP s.8(7) erasure: **[INFER]** retention for the purpose of establishing a legal claim is defensible ("necessary for compliance with any law... or for enforcing any legal right or claim" — check the exact s.8(7)/s.17 carve-out wording with counsel), but it must be **stated in the notice**, scoped to the Agreement record only, and must **not** extend to the guest list, which has no such justification.
8. **System-integrity attestation.** Periodic (quarterly) signed record that the system operated properly — uptime, incident log, deploy log. This is what makes the 63(2)(c) assertion ("operating properly throughout the material period") something more than a bare claim.
9. **Give both parties the download at the time**, and log that they took it. A party's own contemporaneous copy is independently useful and reduces reliance on the platform's production.

---

## Consolidated PRD requirements

Numbered for traceability into the PRD. **[MUST]** = legal obligation or clear-and-present risk. **[SHOULD]** = strong risk reduction. **[DECIDE]** = a founder/counsel decision, not an engineering one.

### Corporate & registration
| # | Requirement | Source |
|---|---|---|
| R1 | **[DECIDE]** Incorporate as a **company** under the Companies Act 2013. E-Comm Rule 4(1) presumes a company; a proprietorship is non-compliant on its face. | Rule 4(1) |
| R2 | **[MUST]** Appoint and publish a **nodal person of contact / alternate senior designated functionary resident in India**. | Rule 4(1) |
| R3 | **[MUST]** Appoint and publish a **Grievance Officer** — name, designation, contact — on the app, the vendor portal and the website. | Rule 4(4); IT Rules 3(2) |
| R4 | **[MUST]** Publish a **DPDP contact** — the person able to answer questions about personal-data processing. May be the same human. | DPDP s.8(9) |
| R5 | **[MUST]** Register for GST **before** paid revenue crosses **₹20 lakh** aggregate turnover. Monitor monthly. | CGST s.22 |
| R6 | **[SHOULD]** Endeavour to become a **convergence partner of the National Consumer Helpline**. | Rule 4(7) |
| R7 | **[SHOULD]** Designate, by name, the **"person in charge of the computer"** for BSA s.63(4) certificates, plus a deputy. | BSA s.63(4) |

### Disclosure surfaces
| # | Requirement | Source |
|---|---|---|
| R8 | **[MUST]** Display prominently: legal name, **address of HQ and all branches**, website name, **email, fax, landline and mobile**. | Rule 4(2) |
| R9 | **[MUST]** Public **"How search results are ranked"** page — main ranking parameters in order, their relative importance, plain language, no login required, linked from every results screen. | Rule 5(3)(f) |
| R10 | **[MUST]** **Differentiated-treatment clause in the vendor T&Cs** describing Featured placement and any other differential treatment between vendors of the same category. Separate from R9. | Rule 5(4) |
| R11 | **[MUST]** Vendor profiles carry **business name, verified geographic address, customer-care number, aggregated rating**. | Rule 5(3) |
| R12 | **[MUST]** Disclosure page stating **explicitly** that the platform does not process payments, take commission, fulfil orders, or offer charge-back/shipment — with reasons, in place of the inapplicable Rule 5(3) items. | Rule 5(3) |
| R13 | **[MUST]** Every paid placement labelled **"Promoted"** or **"Sponsored"** (preferred over "Featured"), **on the card itself**, legible at the smallest viewport, in light and dark themes, on **every** surface — list, map, carousel, share preview, notification, email/WhatsApp digest. Plus a tappable "Why am I seeing this?". | Dark Patterns Guidelines, Annexure 1 §9 |
| R14 | **[MUST]** Publish rules, privacy policy and user agreement; **quarterly** advisory to all users restating them and the consequences of non-compliance. | IT Rules 3(1)(a), 3(1)(c) as amended 2026 |

### Grievance & takedown
| # | Requirement | Source |
|---|---|---|
| R15 | **[MUST]** Consumer complaint: **acknowledge ≤48 hours**, **redress ≤1 month**. Issue and display a **ticket number** for tracking. | Rule 4(5), 5(3) |
| R16 | **[MUST]** Intermediary grievance: **acknowledge ≤24 hours**, **dispose ≤7 days**; **unlawful content ≤36 hours**; **NCII/nudity ≤2 hours**. | IT Rules 3(2), as amended 2026 |
| R17 | **[MUST]** Court order / reasoned government intimation: **act within 3 hours**. Requires a monitored always-on legal inbox and a documented escalation path. | IT Rules 3(1)(d), as amended 2026 |
| R18 | **[MUST]** Admin panel **kill switch**: disable a listing, review, photo, guest list, or entire vendor/family account **immediately**, without a deploy, by a non-engineer, with an audit trail. | R17 is unachievable without it |
| R19 | **[MUST]** Retain removed content and associated records **180 days**. | IT Rules 3(1)(g) |
| R20 | **[MUST]** **Repeat-infringer register** keyed to a persistent vendor identity that survives account deletion and re-registration. | Rule 5(5) |
| R21 | **[MUST]** Respond to lawful government information requests within **72 hours**. | IT Rules 3(1)(j) |
| R22 | **[SHOULD]** CERT-In: incident reporting **within 6 hours**; **180 days** of ICT logs retained **in India**; NTP sync to NIC/NPL. *(verify current directions)* | CERT-In Directions 28.04.2022 |

### Consent, dark patterns, UI integrity
| # | Requirement | Source |
|---|---|---|
| R23 | **[MUST]** **No pre-ticked checkbox anywhere in the product**, ever — auto-renew, marketing, guest-list sharing, review publication. Consent only by explicit affirmative action. | Rule 4(9); DPDP s.6(1); Dark Patterns |
| R24 | **[MUST]** No false urgency ("3 vendors left!"), no confirm-shaming on decline, no drip pricing on subscriptions, no subscription trap — **cancellation must be as easy as subscription, self-serve, in-app**. | Dark Patterns Annexure 1 |
| R25 | **[MUST]** Subscription price shown **inclusive of GST**, all-in, before payment. No fees revealed after confirmation. | Drip pricing; Rule 4(11) |
| R26 | **[MUST]** No cancellation charge on a consumer unless Vivah Spot bears an equivalent charge. | Rule 4(8) |
| R27 | **[MUST]** Same plan price for comparable vendors; no arbitrary classification; no undisclosed personalised pricing. | Rule 4(11) |
| R28 | **[SHOULD]** Conduct and **document a dark-pattern self-audit** against all 13 Annexure-1 patterns before launch; file a self-declaration. | CCPA Advisory 05.06.2025 |

### DPDP — guest list and personal data
| # | Requirement | Source |
|---|---|---|
| R29 | **[MUST]** Treat Vivah Spot as **Data Fiduciary** for guest personal data. Do not architect around a processor role. | DPDP s.2(i) + s.3(c)(i) *[INFER]* |
| R30 | **[MUST]** DPDP **notice** presented **independently** of the T&Cs: itemised description of data, specified purpose, withdrawal as easy as consent, rights exercise, Board complaint route. | DPDP s.5; Rule 3 |
| R31 | **[MUST]** At guest-list upload: an explicit, **non-pre-ticked** family attestation of permission to invite each contact. | *[INFER]* mitigation |
| R32 | **[MUST]** Invitation content: family's name as sender, why the recipient is receiving it, **one-tap opt-out**, privacy-notice link. **Zero Vivah Spot promotion of any kind.** | *[INFER]* mitigation; Meta policy |
| R33 | **[MUST]** Guest contacts used **only** to deliver that wedding's invitations and RSVPs. No marketing, no lead-gen, no enrichment, no lookalikes, no cross-wedding reuse. | DPDP s.6(1) purpose limitation |
| R34 | **[MUST]** **Automated erasure job**: purge guest contacts and RSVP data **30 days after the last wedding event date**; export to the family before purge; log the erasure. | DPDP s.8(7) |
| R35 | **[MUST]** **Global suppression list** as salted one-way hashes; permanent; honours STOP, WhatsApp block, email unsubscribe; applied across all weddings. | DPDP s.6(1); Meta policy |
| R36 | **[MUST]** **Public, no-login rights channel** for access / correction / erasure / grievance, reachable from the invitation message itself — guests are not users. | DPDP ss.11–14 |
| R37 | **[MUST]** Encryption at rest for contact data; **RBAC** so no ordinary admin can browse guest lists; access logged. | DPDP s.8(5); Rule 6 |
| R38 | **[MUST]** Retain processing logs **≥1 year**. | DPDP Rule 6 |
| R39 | **[MUST]** Written **breach runbook**: notify affected Data Principals **without delay**; report to the Board **within 72 hours** with facts, causes, mitigation, responsible parties, preventive steps, notification summary. | DPDP s.8(6); Rule 7 |
| R40 | **[MUST]** **Written processor contracts** with WhatsApp BSP, email provider, cloud host, analytics. Check the BSP's own retention terms before signing. | DPDP s.8(2) |
| R41 | **[MUST]** RSVP links = unguessable per-guest tokens, `noindex`, never enumerate the guest list to a guest. | DPDP; *[INFER]* |
| R42 | **[SHOULD]** Ship all of the above ahead of **14 May 2027**. Build it in now — retrofitting consent, erasure and audit is far costlier. | DPDP phased commencement |

### Non-party posture
| # | Requirement | Source |
|---|---|---|
| R43 | **[MUST]** **No money touches the platform** for couple–vendor transactions. No commission, escrow, split, or convenience fee. **Treat as an inviolable architectural constraint.** | *Goibibo*; *Louboutin*; CGST s.52 |
| R44 | **[MUST]** Agreement **substantive terms authored by the parties**. Platform supplies structure (fields, headings, prompts) — never numbers, percentages, or default commercial positions. | *Louboutin* active-participant factors |
| R45 | **[MUST]** Ban assurance language across product, marketing and app-store copy: "guaranteed", "book with confidence", "protected", "safe", "trusted", "we ensure". "Verified" only where a defined, performed, documented verification exists. | CP Act s.2(28); *Louboutin* |
| R46 | **[MUST]** Published, consistent no-mediation policy. **Never mediate informally.** Either never, or via a documented disclosed process. | *[INFER]*; duty of care |
| R47 | **[MUST]** Describe the Agreement **functionally** — "a record of what you and the vendor agreed, timestamped, downloadable by both" — plus an on-screen statement that Vivah Spot is not a party, does not verify terms, and will not resolve disputes. | *[INFER]* |
| R48 | **[SHOULD]** Disclose that the Agreement **may require stamping** under the Maharashtra Stamp Act before production in court. Make no court-readiness claim. | Maharashtra Stamp Act s.34 *[UNVERIFIED rate]* |

### Messaging
| # | Requirement | Source |
|---|---|---|
| R49 | **[DECIDE — recommended]** v1 invitations use the **family-sends** model: platform composes, family sends from their own WhatsApp via `wa.me` / share sheet. Vivah Spot's WABA never messages a non-opted-in guest. | Meta Business Messaging Policy |
| R50 | **[MUST]** If any platform-initiated WhatsApp is used, obtain **per-guest opt-in to Vivah Spot** first. The family's consent does not satisfy Meta's requirement. | Meta policy |
| R51 | **[MUST]** Never use unofficial WhatsApp APIs or bulk-sender tools. | Meta Business Terms |
| R52 | **[MUST]** If SMS is ever used: **DLT registration** of sender header, templates and consent; DND scrubbing; correct transactional/promotional classification. **[SHOULD]** Prefer email — a wedding invitation sent by a business is likely promotional post-2025 amendment. | TCCCPR 2018; 2nd Amendment 2025 |
| R53 | **[MUST]** Email: SPF/DKIM/DMARC, warmed domain, one-click unsubscribe honoured into R35. | *[INFER]* deliverability + DPDP |
| R54 | **[MUST]** Per-wedding cap (~600), one list per wedding, per-day send rate limits, monitored block/report rate. | Meta enforcement; *[INFER]* |

### GST
| # | Requirement | Source |
|---|---|---|
| R55 | **[MUST]** **18%** on all subscription and Featured revenue. | GST 2.0, 22.09.2025 |
| R56 | **[MUST]** Separate invoice lines: **Featured → SAC 998365**; **listing subscription → SAC 998439**. CA sign-off on classification. | Rule 46; *[UNVERIFIED]* |
| R57 | **[MUST]** Tax computed from the **recipient's registration State**: Maharashtra → CGST+SGST; other State → IGST. **Never hard-code CGST+SGST.** Capture GSTIN + State at vendor onboarding. | IGST s.12(2) |
| R58 | **[MUST]** **Issue the tax invoice at the moment of payment** for prepaid plans (avoids the Receipt Voucher path). GST on the **full** advance is payable in the month of collection — **not** spread over the term. | CGST s.13(2); Rules 47, 50 |
| R59 | **[MUST]** Rule 46-compliant invoice: consecutive serial ≤16 chars unique per FY, all mandatory fields, place of supply, reverse-charge flag. Support **credit notes / Refund Vouchers** on cancellation from day one. | Rules 46, 51 |
| R60 | **[MUST]** Keep the **₹0 Founding Vendor tier unconditional** — no testimonial, photos, exclusivity, referral or lock-in obligation. Any such condition is non-monetary consideration and makes it taxable at open market value. | CGST s.2(31), s.7, Sch. I; Rules 27–31 |
| R61 | **[MUST]** Screen the Founding cohort for **related persons** (relatives, employees, directors, controlled entities) — Schedule I para 2 makes those taxable at OMV even at ₹0. | CGST Sch. I para 2 |
| R62 | **[SHOULD]** Model invoice/serial structure to be **IRN-shaped** now; e-invoicing switches on above **₹5 crore** AATO. | Rule 48(4) |
| R63 | **[SHOULD]** Get a written CA view on **ITC** in periods with a large free cohort. | CGST s.17(5)(h) *[UNVERIFIED]* |

### Reviews
| # | Requirement | Source |
|---|---|---|
| R64 | **[MUST]** Reviews permitted **only from a party to a recorded Enquiry** with that vendor. Single highest-value anti-fake control. | IS 19000; *[INFER]* |
| R65 | **[MUST]** Verify review authors — phone OTP at minimum; one account per person. | IS 19000 |
| R66 | **[MUST]** Moderate with **equal treatment regardless of sentiment**. No suppression of negative reviews. No editing of review text. | IS 19000 |
| R67 | **[MUST]** Publish the **double-blind rule and the sorting criteria** on the reviews page. | IS 19000 |
| R68 | **[MUST]** **Publish after a fixed window (e.g. 14 days) even if the counterparty never submits** — otherwise the double-blind mechanism becomes selective publication. | IS 19000; *[INFER]* |
| R69 | **[MUST]** **Vendor→family feedback is structured only** (ratings/tags), **private to vendors**, **never free text**, **never publicly attributed to a named individual**. | Defamation (BNS s.356); DPDP; *[INFER]* |
| R70 | **[MUST]** Explicit non-pre-ticked family consent at signup that vendors may rate them, with visibility of their own score and an appeal route. | DPDP s.6; CP Act s.2(46) |
| R71 | **[MUST]** Written, published review T&Cs: personal experience only, factually correct, no defamatory language, no marketing material. | IS 19000 |
| R72 | **[SHOULD]** Vendor **right of reply** to any review about them. | IS 19000 |
| R73 | **[SHOULD]** Mark any incentivised review and exclude it from the aggregate rating. | IS 19000 |

### Evidence & records
| # | Requirement | Source |
|---|---|---|
| R74 | **[MUST]** **SHA-256** hash of the canonical rendered Agreement PDF/A computed at second confirmation and stored. | BSA Sch. Part B |
| R75 | **[MUST]** Freeze and store the **exact rendered artefact each party saw**, not the current template. | BSA s.63(2) |
| R76 | **[MUST]** **Append-only** (or hash-chained) audit log: user id, role, server timestamp, IP, user-agent, device id, app version, document id, document hash, terms version. No UPDATE or DELETE path. | BSA s.63(2)(a)–(d) |
| R77 | **[MUST]** **Server-side, NTP-synchronised timestamps only.** Never trust a client clock. Store UTC, display IST. | BSA s.63; *[INFER]* |
| R78 | **[MUST]** Terms rendered fully visible and downloadable **before** the confirm button; button reads "I agree to these terms"; no pre-tick; no assent by continued use. | Contract Act; Rule 4(9) |
| R79 | **[SHOULD]** Admin **BSA s.63 Part A certificate generator** — one click, pre-filled in the Schedule format. | BSA s.63(4) |
| R80 | **[SHOULD]** Retain Agreements + audit logs **8 years**; state this in the DPDP notice; scope it to the Agreement record only — **never** to the guest list. | Limitation Act Art. 55; CGST s.36; DPDP s.8(7) |
| R81 | **[SHOULD]** **Quarterly signed system-integrity attestation** (uptime, incidents, deploys) to support the s.63(2)(c) assertion. | BSA s.63(2)(c) |

---

## Could NOT verify — open items

1. **Whether a listing-only, no-payment discovery platform is a "marketplace e-commerce entity."** No Indian judgment, CCPA order or DoCA clarification found either way. **The single biggest open question here.** Practitioners treat classifieds as in scope, but I have no citable authority. → Counsel opinion before the T&Cs are drafted.
2. **`consumeraffairs.nic.in` was unreachable throughout** (connection refused). All E-Commerce Rules 2020 text is from reputable secondary reproductions. **Clause lettering inside rule 5(3) in particular must be re-checked against G.S.R. 462(E) dated 23.07.2020.**
3. **Whether a QCO has made IS 19000:2022 mandatory.** DoCA consulted on one in May 2024 and platforms endorsed it; no notification found. Treat as voluntary, monitor.
4. **Exactly which DPDP *Act* sections (as opposed to Rules) are in force on 5 September 2026.** The Rules' three-phase schedule (14.11.2025 / 14.11.2026 / 14.05.2027) is confirmed; the Act-section commencement mapping is not. Assume full compliance needed by **14 May 2027**.
5. **Whether 12 or 13 dark patterns are in Annexure 1.** Sources split on whether "SaaS billing" is separate or merged into "subscription trap". Immaterial — disguised advertisement is enumerated on every reading.
6. **Whether Meta treats a wedding invitation template as Marketing or Utility.** Category determines price and opt-in strictness. → Ask the BSP for a written view before building any platform-initiated flow.
7. **Current Article 5(h) stamp duty rate for a general agreement in Maharashtra.** Commonly cited as ₹100; the Schedule has been amended repeatedly. → Maharashtra advocate.
8. **ITC position on inputs used for free services to unrelated parties.** s.17(5)(h) is expressed in terms of goods; departmental views vary. → Written CA view.
9. **Whether Notification 10/2017-IT exempts a sub-threshold inter-State supplier of services from compulsory s.24(i) registration** in Vivah Spot's exact circumstances. → CA.
10. **Current text of the CERT-In Directions of 28.04.2022** (6-hour reporting, 180-day logs). Not re-confirmed in this pass — plan for them, verify before the runbook is finalised.
11. ***Indian Medical Association v. V.P. Shantha*, (1995) 6 SCC 651 applied to a zero-price digital platform.** The case is real and well known; the analogy to a vendor-funded free consumer service is mine and is untested in this context.
12. **Whether the WhatsApp invitation feature falls outside IT Act s.79(2)(b)** ("does not select the receiver" / initiates the transmission). My reading is that it does fall outside. Untested. → Counsel.

---

## Primary and official sources

**Consumer protection**
- Consumer Protection (E-Commerce) Rules 2020, G.S.R. 462(E), 23.07.2020 — https://www.legitquest.com/act/consumer-protection-e-commerce-rules-2020/91C8 · https://www.consumerprotection.in/rule-4-duties-of-e-commerce-entities/ · https://www.consumerprotection.in/rule-5-liabilities-of-marketplace-e-commerce-entities/
- Consumer Protection Act 2019, s.2(7) — https://indiankanoon.org/doc/26796719/
- CCPA Dark Patterns Guidelines 2023 (s.18 CP Act; 30.11.2023) — https://www.dalaw.in/Guidelines%20for%20prevention%20and%20regulation%20of%20dark%20patterns,%202023 · https://www.scconline.com/blog/post/2023/12/04/ccpa-notifies-guidelines-for-prevention-and-regulation-of-dark-patterns-2023-legal-news/
- CCPA self-audit advisory, 05.06.2025 — https://www.azbpartners.com/bank/central-consumer-protection-authority-issues-advisory-to-e-commerce-platforms-for-self-audit-to-detect-dark-patterns-on-their-platforms/
- Draft E-Commerce Amendment Rules 2021 (**never notified**; fallback liability, flash sales) — https://prsindia.org/billtrack/draft-amendments-to-the-consumer-protection-e-commerce-rules-2020

**IT Act / intermediaries**
- IT Act 2000 (updated) — https://www.indiacode.nic.in/bitstream/123456789/13116/1/it_act_2000_updated.pdf
- IT Rules 2021 (MeitY consolidated to 06.04.2023) — https://www.meity.gov.in/static/uploads/2024/02/Information-Technology-Intermediary-Guidelines-and-Digital-Media-Ethics-Code-Rules-2021-updated-06.04.2023-.pdf
- Rules 3 and 4 — https://indiankanoon.org/doc/125230782/ · https://indiankanoon.org/doc/115512526/
- IT Amendment Rules 2025 (22.10.2025, i/f 15.11.2025) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2181719 · https://www.meity.gov.in/static/uploads/2025/10/8e40cdd134cd92dd783a37556428c370.pdf · FAQs https://www.meity.gov.in/static/uploads/2025/10/065b6deb585441b5ccdf8be42502a49c.pdf
- IT Amendment Rules 2026 (16.02.2026, i/f 20.02.2026) — https://www.khaitanco.com/thought-leadership/MeitY-notifies-the-IT-Amendment-Rules-2026 · https://www.amsshardul.com/insight/information-technology-intermediary-guidelines-and-digital-media-ethics-code-amendment-rules-2026/
- First Schedule amendment 26.09.2022 — https://www.leegality.com/blog/first-schedule

**Data protection**
- DPDP Act 2023 (Act 22 of 2023), MeitY — https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf
- DPDP Rules 2025 (notified 13.11.2025; gazette 14.11.2025) — https://www.dpdpa.com/DPDP_Rules_2025_English_only.pdf · PIB https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655
- Schedule (penalties) — https://www.dpdpa.com/theschedule.html
- Commencement phasing — https://www.amsshardul.com/insight/enforcement-of-the-dpdp-act-and-notification-of-the-dpdp-rules/

**Case law**
- *Christian Louboutin SAS v. Nakul Bajaj*, Delhi HC 2018 — https://www.lexology.com/library/detail.aspx?g=35bf6d36-2c8d-45de-9f42-476bc7885f21
- *Goibibo.com v. Amrit Pal Jaiswal*, NCDRC R.P. 2544/2023, 04.09.2024 — https://www.livelaw.in/consumer-cases/intermediary-can-be-held-liable-refunding-customers-ncdrc-holds-goibibo-liable-deficiency-in-service-268545
- NCDRC tripartite liability — https://www.scconline.com/blog/post/2022/09/26/ncdrc-tripartite-contract-seller-service-provider-consumer-liability-of-seller-and-service-provider-defective-deficient-product-service-consumer-protection-legal-news-and-updates/

**Messaging**
- WhatsApp Business Messaging Policy — https://whatsappbusiness.com/policy/
- TRAI TCCCPR 2018 — https://trai.gov.in/tcccpr
- TCCCPR Second Amendment 2025 (12.02.2025) — https://www.trai.gov.in/sites/default/files/2025-02/Regulation_12022025.pdf
- TRAI on OTT jurisdiction — https://inc42.com/buzz/telecos-question-trais-latest-spam-rules-excluding-whatsapp-other-otts/

**GST**
- CGST Act s.24 — https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter6/section24_v1.00.html
- CGST Act s.52 — https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter10/section52_v1.00.html
- CGST Act s.13 (time of supply of services) — https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter4/section13_v1.00.html
- IGST Act s.12 (place of supply) — https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_IGST_Act/active/chapterv/section12_v1.00.html
- GST Council e-commerce FAQ — https://gstcouncil.gov.in/sites/default/files/2024-02/faq-e-commerc.pdf
- CBIC TCS FAQs — https://cbic-gst.gov.in/pdf/FAQs-TCS-30-11-2018.pdf
- GST 2.0, digital ads at 18% — https://www.socialsamosa.com/industry-updates/gst-2-keeps-digital-ads-at-18-print-at-5-9903038

**Reviews**
- IS 19000:2022 full text (BIS) — https://archive.org/details/gov.in.is.19000.2022
- Analyses — https://ssrana.in/articles/bis-standards-for-verifying-consumer-reviews-ensuring-transparency-integrity/ · https://www.jsalaw.com/newsletters-and-updates/bis-standard-on-online-consumer-reviews/

**Evidence & stamp**
- BSA 2023 s.63 — https://indiankanoon.org/doc/125020475/
- s.63 practitioner guidance — https://www.livelaw.in/articles/electronic-evidence-admissibility-section-63-bhartiya-saksha-adhiniyam-2023-261511
- Maharashtra Stamp Act 1958 (text as on 08.04.2025) — https://www.indiacode.nic.in/bitstream/123456789/22026/1/the_maharashtra_stamp_act,_1958.pdf
- Stamp duty on e-agreements — https://vinodkothari.com/2020/01/stamp-duty-implications-on-e-agreements/
