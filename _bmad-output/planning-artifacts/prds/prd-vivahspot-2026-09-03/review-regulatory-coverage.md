# Regulatory Coverage Audit — PRD vs `research-india-regulatory.md`

**Audited:** 2026-09-05
**Subject:** `prd.md` (Vivah Spot, draft, updated 2026-09-03)
**Against:** `research-india-regulatory.md` — consolidated requirements R1–R81
**Method:** Full read of both documents. Each requirement scored on what the PRD *actually says*, not on what a reasonable reader would assume it implies. Where the PRD states a posture but no testable consequence, the requirement is scored Partial or Omitted, not Implemented.

---

## Scorecard

| Status | Count | Meaning |
|---|---:|---|
| **Implemented** | **21** | The PRD carries the requirement as a stated, testable consequence. |
| **Partial** | **27** | The PRD gestures at it, or covers one limb of a multi-limb requirement, or states the posture without the mechanism. |
| **Omitted** | **26** | The PRD does not say it anywhere. |
| **Not applicable** | **2** | A product decision (family-sends; no platform-initiated guest messaging) legitimately removes the obligation. |
| **Handover** | **5** | Corporate or operational, not a PRD defect. Listed in §3. |
| | **81** | |

**Headline:** the PRD is strongest exactly where the founder's instincts were engaged — the non-party posture (R43, R44), the ₹0 tier (R60), the family-sends invitation model (R49), the review mechanism (R64–R69, R72) and the Agreement's evidential spine (R74, R75, R77, R80). It is weakest in the boring compliance floor — mandatory disclosure surfaces, takedown/retention plumbing, and DPDP machinery for guest data — where nobody's product intuition was firing. Two requirements are contradicted outright by structural decisions in §7, not merely omitted.

---

## 1. Coverage matrix

Legend: **I** implemented · **P** partial · **O** omitted · **N/A** inapplicable by product decision · **H** handover (corporate/operational)

### Corporate & registration (R1–R7)

| # | Requirement (short) | Status | Where in the PRD / what is missing |
|---|---|:---:|---|
| R1 | Incorporate as a company (Rule 4(1)) | **H** | Founding-structure decision. Not a PRD matter. |
| R2 | Appoint **and publish** a nodal person resident in India | **O** | FR-63 publishes a grievance officer only. The nodal person is a distinct Rule 4(1) role and appears nowhere. Appointment → handover; the publication half is a PRD gap. |
| R3 | Appoint and publish a Grievance Officer on app, portal and site | **I** | FR-63: "A named grievance officer is published, with contact details reachable from every surface." |
| R4 | Publish a DPDP contact (s.8(9)) | **O** | §5.5 covers rights but names no published contact for data-processing questions. |
| R5 | GST registration before ₹20L aggregate turnover | **H** | Corporate. Monitor against *paid* revenue (the ₹0 cohort contributes nothing). |
| R6 | NCH convergence partner | **H** | Corporate. |
| R7 | Designate the "person in charge of the computer" (BSA s.63(4)) | **I** | FR-43: "A named individual is accountable for the systems holding these records." Naming the human is handover. |

### Disclosure surfaces (R8–R14)

| # | Requirement (short) | Status | Where in the PRD / what is missing |
|---|---|:---:|---|
| R8 | Display legal name, HQ + branch addresses, website name, email/fax/landline/mobile | **O** | Nothing in the PRD requires an entity-identity disclosure surface at all. |
| R9 | Public "How search results are ranked" page — parameters **in order**, **relative importance**, no login, linked from every results screen | **P** | FR-20 and FR-64 require the parameters be "published in plain language, reachable by any family." Missing: relative importance, ordering, no-login guarantee, link from every results screen. |
| R10 | Differentiated-treatment clause in the **vendor** T&Cs | **I** | FR-64: "Any differentiated treatment between Vendors is stated in the Vendor terms" — and explicitly notes these are two disclosures to two audiences. |
| R11 | Vendor profiles carry business name, **verified geographic address**, **customer-care number**, aggregated rating | **P** | FR-19 lists photos, price, rating, review count, verified status, sizing attribute, availability, places served. **No address. No phone number.** Contact details are instead gated behind FR-36 Contact Reveal — see Contradiction C4. |
| R12 | Public "we do not process payments / take commission / fulfil orders / offer chargeback or shipment — and here is why" disclosure page | **O** | The posture is stated internally (§5.6, §7.1, FR-52) but no public disclosure surface is required. The research is explicit that a silent blank is not defensible; an express "not applicable, and here is why" is. |
| R13 | Paid placement labelled **"Promoted"/"Sponsored"**, **on the card**, legible at smallest viewport and in dark mode, on **every** surface, plus "Why am I seeing this?" | **P** | FR-20: "Featured Listings appear in a distinctly marked **band**, identified to the family as paid placement." §5.8 adds a non-colour indicator. Missing: card-level label, every-surface persistence, "Why am I seeing this?", and the PRD uses the exact word the research advised against. See Contradiction C3. |
| R14 | Publish rules, privacy policy, user agreement; **quarterly** advisory to all users | **P** | FR-63: "Users are **periodically** informed of the platform's terms and the rules governing what may be posted." No quarterly cadence, no privacy policy named, no advisory job/template/log. |

### Grievance & takedown (R15–R22)

| # | Requirement (short) | Status | Where in the PRD / what is missing |
|---|---|:---:|---|
| R15 | Consumer complaint: ack ≤48h, redress ≤1 month, **ticket number** displayed | **P** | FR-63 states "within the periods required **of an intermediary**" — that is the IT Rules regime, not the CP Rules 4(5) consumer regime. The two are conflated. No ticket number anywhere. |
| R16 | Intermediary grievance: ack ≤24h, dispose ≤7d, unlawful ≤36h, NCII ≤2h | **P** | FR-63 delegates to "the periods required." No numbers, and no NCII/2-hour path is contemplated. |
| R17 | Court/government order **≤3 hours**; monitored always-on legal inbox; escalation path | **P** | FR-63: "within the shorter period that applies to such orders." No always-on inbox, no escalation path, no acknowledgement that 3 hours is an operational (staffing) fact. |
| R18 | Admin **kill switch** — listing, review, photo, **guest list**, whole account — immediately, no deploy, by a non-engineer, audited | **P** | Implied by FR-61 ("no capability unavailable to Admin") and FR-60/FR-49. But immediacy is not stated, "without a deploy" is promised only for Services and places (FR-62), and guest-list disablement is not named. |
| R19 | Retain removed content + records **180 days** | **O** | FR-49 records that a review was removed and why; §5.7 retains admin actions. The removed *content* and its 180-day retention are absent. |
| R20 | **Repeat-infringer register** keyed to a vendor identity surviving deletion and re-registration | **O** | Nothing. FR-60 attributes removals but no persistent identity, and nothing prevents a removed vendor re-registering clean. This is a **schema** requirement — cheapest now, expensive later. |
| R21 | Respond to lawful government information requests **within 72 hours** | **O** | Nothing. |
| R22 | CERT-In: 6-hour incident report; 180-day ICT logs held in India; NTP sync | **P** | FR-43's "trusted time source" covers the NTP limb only. No incident reporting, no log retention, no data-residency statement. |

### Consent, dark patterns, UI integrity (R23–R28)

| # | Requirement (short) | Status | Where in the PRD / what is missing |
|---|---|:---:|---|
| R23 | **No pre-ticked checkbox anywhere**, ever | **I** | §5.5: "Nothing is pre-ticked." |
| R24 | No false urgency / confirm-shaming / drip pricing / subscription trap; cancellation as easy as subscription | **I** | §5.5 blanket prohibition + "Cancelling is as easy as starting"; FR-54 removes auto-renewal entirely, which kills the subscription-trap class at the root. |
| R25 | Subscription price shown **inclusive of GST**, all-in, before payment | **O** | FR-52 covers invoicing and place of supply but never requires the displayed price to be tax-inclusive or all-in. Notable irony: the PRD makes all-in pricing a condition of listing for *vendors* (FR-19, FR-26, FR-59) and does not apply the same rule to *itself*. |
| R26 | No cancellation charge on a consumer unless the platform bears an equivalent charge | **O** | Silent. See Contradiction C5 — FR-54 promises cancellability while §7.1/FR-52 exclude refunds entirely. |
| R27 | Same plan price for comparable vendors; no arbitrary classification; no undisclosed personalised pricing | **O** | FR-50: "Tier prices are a business input, set outside this document." Nothing constrains differential or negotiated pricing between comparable vendors — which is squarely Rule 4(11) territory for a subscription business. |
| R28 | Documented dark-pattern self-audit against all 13 Annexure-1 patterns; file a self-declaration | **O** | Nothing. Launch-checklist item → also on the handover list. |

### DPDP — guest list and personal data (R29–R42)

| # | Requirement (short) | Status | Where in the PRD / what is missing |
|---|---|:---:|---|
| R29 | Treat Vivah Spot as **Data Fiduciary** for guest data; do not architect around a processor role | **P** | §5.5 behaves like a fiduciary (rights for non-users, erasure on purpose exhaustion) but never states the posture. FR-11's title — "**The guest list belongs to the family**" — is precisely the framing the research says does not work under the Act, and a downstream agent reading only that heading will build a processor model. |
| R30 | DPDP **notice** presented independently of the T&Cs: itemised data, purpose, withdrawal, rights, Board complaint route | **P** | §5.5 has "Consent is specific, informed and separately given for each purpose, and withdrawable as easily as it was given." No notice artefact, no itemisation, no Board route, no independence-from-T&Cs requirement. |
| R31 | Non-pre-ticked **family attestation** at guest-list upload | **O** | FR-11 permits bulk import from the family's contacts with no attestation of any kind. This is one of the two mitigations that make the guest-list position defensible at all. **Top-5 gap.** |
| R32 | Invitation: family named as sender, why receiving, one-tap opt-out, privacy-notice link, **zero Vivah Spot promotion** | **O** | FR-12 requires a permanent, non-removable Vivah Spot attribution line and a growth CTA on the RSVP page, and SM-6 makes that funnel a measured success metric. No opt-out, no privacy link. See Contradiction C2. **Top-5 gap.** |
| R33 | Guest contacts used **only** to deliver that wedding's invitations | **I** | FR-12 and §5.5 both state it near-verbatim: no marketing, no lead-gen, no audience building. |
| R34 | **Automated erasure job**: purge 30 days after last event date; export to family first; log the erasure | **P** | §5.5: "erased once the purpose is exhausted." No trigger, no window, no job, no export, no erasure log. A use restriction is not a deletion. |
| R35 | Global suppression list (salted hashes), permanent, honouring STOP / block / unsubscribe | **N/A** | The family-sends model (FR-12) means the platform never messages a guest, so there is no outbound channel to suppress. **Residual:** a re-upload of the same contact for a later wedding, and a guest who objects via the RSVP page, still need somewhere to land — currently nowhere. |
| R36 | **Public, no-login rights channel** reachable from the invitation itself | **P** | §5.5 grants the right ("including people who never held an account") but requires no channel, and nothing routes a guest to it from the invitation or RSVP page. |
| R37 | Encryption at rest for contacts; **RBAC so no ordinary admin can browse guest lists**; access logged | **O** | Directly contradicted by FR-4, FR-61 and §7.8. See Contradiction C1. **Top-5 gap.** |
| R38 | Retain processing logs **≥1 year** (Rule 6) | **O** | §5.7 covers Agreements, Verifications, Reviews and admin actions. Processing logs and their retention period are absent. |
| R39 | Written **breach runbook**: notify without delay; Board report within 72h with prescribed contents | **P** | §5.5: "Personal data breaches are reported within the period required." No runbook, no Board, no content specification, no 72 hours. |
| R40 | **Written processor contracts** — WhatsApp BSP, email provider, cloud host, analytics | **O** | Nothing. Note the family-sends model does *not* remove the BSP from the chain: FR-29, FR-35 and FR-53 all route vendor notifications over WhatsApp. |
| R41 | RSVP links = unguessable per-guest tokens, `noindex`, never enumerate the guest list to a guest | **O** | FR-12 hosts the RSVP page but says nothing about tokens, indexing or enumeration — and states the link preview is "controlled by the platform" and is its "principal surface in front of guests," which reads as a shareable link rather than a per-guest secret. **Top-5 gap** (with R31). |
| R42 | Ship DPDP compliance ahead of 14 May 2027 | **H** | Sequencing. The PRD is deliberately unphased; this belongs to epics/sprint planning. |

### Non-party posture (R43–R48)

| # | Requirement (short) | Status | Where in the PRD / what is missing |
|---|---|:---:|---|
| R43 | **No money touches the platform** | **I** | §7.1 in full, §5.6, FR-52, FR-41, the Glossary's exclusion of *Booking*, and §7.9's vocabulary ban. The single best-executed requirement in the document. |
| R44 | Agreement's substantive terms authored by the parties; platform supplies structure only | **I** | FR-41: "The platform authors no default terms. Every term in an Agreement comes from the Vendor's own proposal." FR-39 gives the field structure without defaults. |
| R45 | Ban assurance language; "Verified" only where defined, performed, documented | **P** | §5.6 bans guarantees and assurance generally; §7.9's explicit vocabulary blacklist covers only *legally binding / guaranteed / enforced*. Missing from the blacklist: *protected*, *safe*, *trusted*, *book with confidence*, *we ensure*. "Verified" is properly earned (FR-58 defines, performs and records it), so that limb holds. |
| R46 | Published, consistent no-mediation policy; **never mediate informally** | **P** | §7.2 and FR-41 exclude mediation as a capability. Missing: the requirement to *publish* the policy, and any instruction against informal founder-level intervention — which is the actual failure mode the research names. See also Contradiction C6. |
| R47 | Describe the Agreement functionally **plus** an on-screen statement that Vivah Spot is not a party, does not verify terms, will not resolve disputes | **P** | FR-41 covers the negative (no binding/guaranteed claims). The affirmative on-screen non-party statement, on the same screen as the confirmation, is not required anywhere. |
| R48 | Disclose the Agreement may require stamping under the Maharashtra Stamp Act; make no court-readiness claim | **P** | The court-readiness claim is properly forbidden (FR-41, §7.9). The stamping disclosure is absent. |

### Messaging (R49–R54)

| # | Requirement (short) | Status | Where in the PRD / what is missing |
|---|---|:---:|---|
| R49 | **Family-sends** invitation model | **I** | FR-12, with the reasoning stated inline ("Why the family sends"). Exemplary: it eliminates the Meta opt-in problem, the DLT problem and the platform-initiated-messaging half of the DPDP problem in one decision. |
| R50 | Per-guest opt-in to Vivah Spot if platform-initiated WhatsApp is used | **N/A** | FR-12 forbids the platform ever messaging a guest. |
| R51 | Never use unofficial WhatsApp APIs or bulk-sender tools | **O** | Silent — and still live, because the vendor leg is entirely WhatsApp-based (UJ-2, FR-29, FR-35, FR-53). |
| R52 | DLT registration / DND scrubbing if SMS is used; prefer email | **P** | Invitation SMS does not exist, so that limb is moot. But **FR-1 signs everyone in by SMS OTP**, which is a commercial communication over a telecom network and needs a registered header and template. Unaddressed. |
| R53 | Email: SPF/DKIM/DMARC, warmed domain, one-click unsubscribe | **O** | The PRD contains no email channel at all — yet R14's quarterly advisory, FR-53's renewal reminders and FR-52's invoices all imply one. |
| R54 | Per-wedding cap (~600), one list per wedding, per-day send limits, monitored block/report rate | **P** | One list per Wedding is implicit in the data model (FR-11). No cap is stated (600 appears only as narrative colour in UJ-1/UJ-2). Send rate limits are moot under family-sends. |

### GST (R55–R63)

| # | Requirement (short) | Status | Where in the PRD / what is missing |
|---|---|:---:|---|
| R55 | **18%** on subscription and Featured revenue | **P** | FR-52 requires a "GST-compliant tax invoice" but never states the rate. Defensible at PRD altitude; noted because the research made it a MUST. |
| R56 | Separate invoice lines: Featured → SAC 998365; listing → SAC 998439 | **O** | Nothing. Worse, FR-50 models Featured as a **tier attribute**, not a separable line item — so the invoice split the research recommends is architecturally awkward from day one. CA sign-off is handover; the line-item split is a PRD/schema decision. |
| R57 | Tax computed from the **recipient's** registration State; never hard-code CGST+SGST; capture GSTIN + State at onboarding | **P** | FR-52: "Tax is determined by the recipient's State, not assumed from the operator's." The onboarding capture of GSTIN and State is not required in any vendor-onboarding FR (FR-58, FR-59). |
| R58 | Issue the tax invoice at the moment of payment; full GST on the advance in the month of collection | **I** | FR-52 states both limbs explicitly, including "A prepaid term is an advance. The full tax liability falls in the period of collection and is not spread across the term." Traceable straight from the research. |
| R59 | Rule 46-compliant invoice (serial ≤16 chars unique per FY, place of supply, reverse-charge flag); **credit notes / Refund Vouchers from day one** | **P** | "GST-compliant tax invoice" carries the Rule 46 limb by reference. The credit-note / Refund-Voucher capability is absent, and §7.1 + FR-52 exclude refunds entirely. See Contradiction C5. |
| R60 | Keep the ₹0 Founding Vendor tier **unconditional** | **I** | FR-51 states it and *states the reason*: "A free tier with obligations attached is not free, and would be treated as a supply for consideration." Model traceability from research to PRD. |
| R61 | Screen the Founding cohort for related persons (Sch. I para 2) | **O** | Nothing. Operational → also on the handover list. |
| R62 | Make the invoice/serial structure IRN-shaped now | **O** | Nothing. Cheap now, rework later. |
| R63 | Written CA view on ITC in periods with a large free cohort | **H** | Advisory. |

### Reviews (R64–R73)

| # | Requirement (short) | Status | Where in the PRD / what is missing |
|---|---|:---:|---|
| R64 | Reviews only from a party to a recorded Enquiry | **I** | FR-44 goes **further** than the research asked: only from an Agreement that reached Delivery. Enquiring, contact reveal and shortlisting earn nothing. |
| R65 | Verify review authors — phone OTP minimum; one account per person | **I** | FR-1 (phone + OTP for every account) + FR-46 ("a verified party to a real Agreement, and is shown as such"). One-account-per-person follows from phone-number identity rather than being stated outright. |
| R66 | Moderate with equal treatment regardless of sentiment; no suppression; no editing | **I** | FR-46 and FR-49: "A review is never removed, delayed or demoted for being negative, and moderation criteria do not vary with rating." |
| R67 | Publish the **double-blind rule** and the sorting criteria on the reviews page | **P** | FR-46 requires the sorting basis be disclosed. The double-blind/window rule is described in the PRD but never required to be published to readers. |
| R68 | Publish after a fixed window even if the counterparty never submits | **I** | FR-48, with the research's own reasoning quoted: "Withholding one indefinitely because the other is missing would be selective publication." |
| R69 | Vendor→family feedback structured only, private, never free text, never publicly attributed | **I** | FR-47 in full, and the Glossary makes the asymmetry a binding term. |
| R70 | Explicit non-pre-ticked consent at signup that vendors may rate the family; visibility of own score; appeal | **P** | FR-47 gives visibility and a dispute route with Admin. §5.5 gives generic per-purpose consent. The **specific consent at signup for being rated** is not required. |
| R71 | Written, published review submission T&Cs (personal experience, factually correct, no defamation, no marketing) | **O** | FR-49 moderates output; nothing governs input. IS 19000's first requirement. |
| R72 | Vendor **right of reply** | **I** | FR-46: "The Vendor has a right of reply, published alongside." |
| R73 | Mark incentivised reviews; exclude from the aggregate | **O** | No incentivised-review programme is described — but nothing forbids a vendor offering a discount for a good review, which is exactly the vendor-incentive risk the research flags (7.3(f)) given that tier value depends on rating. |

### Evidence & records (R74–R81)

| # | Requirement (short) | Status | Where in the PRD / what is missing |
|---|---|:---:|---|
| R74 | SHA-256 hash of the rendered Agreement at second confirmation | **I** | FR-43: "A cryptographic digest of the confirmed document is recorded at the moment of confirmation." Algorithm left to architecture — correct altitude. |
| R75 | Freeze the exact rendered artefact each party saw, not the template | **I** | FR-43: frozen at confirmation; unalterable by either party or Admin; "remain retrievable in the form they were confirmed in." |
| R76 | **Append-only** audit log with the BSA field set (user id, role, server time, IP, user-agent, device id, app version, doc id, doc hash, terms version) | **P** | FR-43 secures the append-only property ("Corrections are added; nothing is overwritten"). The field set — which is what makes a s.63(2) assertion provable — is absent. |
| R77 | Server-side, NTP-synchronised timestamps only; never a client clock | **I** | FR-43: "Confirmation times are recorded from a trusted time source, not from a device clock." |
| R78 | Terms fully visible **and downloadable before** the confirm button; button reads "I agree to these terms"; no pre-tick; no assent by continued use | **P** | UJ-3 and FR-39 establish read-then-confirm and §5.5 bans pre-ticking. Download is promised *after* confirmation (FR-40), not before, and the affirmative-assent button wording is unspecified. |
| R79 | Admin **BSA s.63 Part A certificate generator** | **O** | Nothing. The whole evidential chain (R74–R77) terminates at a certificate the platform cannot currently produce. |
| R80 | Retain Agreements + audit logs **8 years**, scoped to the Agreement record only | **I** | FR-43 and §5.7 both state eight years, and scope it to Agreement records — correctly not extending it to the guest list. The one missing limb ("state this in the DPDP notice") falls under R30. |
| R81 | Quarterly signed system-integrity attestation | **O** | Nothing. This is what turns the s.63(2)(c) "operating properly throughout the material period" claim into something evidenced rather than asserted. |

---

## 2. Contradictions

Where the PRD **requires or permits** something the research says is prohibited or risky. These are not gaps — they are decisions pointing the other way, and each needs an explicit resolution before the architecture is derived.

### C1 — "Admin can do anything" vs DPDP access control (R37) · **Severe**

- **Research:** R37 requires RBAC "so no ordinary admin can browse guest lists," under DPDP s.8(5) + Rule 6. Failure of reasonable security safeguards carries the Act's highest penalty ceiling (₹250 crore).
- **PRD:** FR-4 "Admin can do anything… **No action in the platform is unavailable to Admin**." FR-61 "No scoped roles, permission tiers or approval chains exist." §7.8 lists **Admin role tiers** as a *structural exclusion*.
- **Why this is worse than an omission:** §7.8 tells downstream agents that unrestricted admin is a decision, not an oversight. An architecture derived from this PRD will build exactly that, and guest contact data — the one dataset in the product belonging to people who never consented to anything — will be browsable by every staff member.
- **The PRD's own control is attribution, not restriction.** That is a defensible answer for vendor standing and content moderation. It is not an answer to Rule 6, which is about *preventing* access, not recording it.
- **Resolution:** carve guest contact data (and only that) out of §7.8's blanket. One narrow exception preserves the "no admin tiers" simplicity everywhere it actually buys something.

### C2 — Vivah Spot promotion inside the invitation surface (R32) · **Severe**

- **Research:** R32 requires "**Zero Vivah Spot promotion of any kind**," and 3.3(3) explains why: "The instant it carries a commercial message, it becomes marketing to a non-consenting individual and the position collapses."
- **PRD:** FR-12 — "The invitation carries a single discreet line of Vivah Spot attribution in the message and page frame… **It cannot be removed**"; "The RSVP page carries a quiet route for a guest planning a wedding of their own. **This is the platform's growth surface**"; and the link preview is "the platform's principal surface in front of guests." SM-6 then makes that funnel a tracked success metric — so the contradiction is not incidental, it is a measured objective.
- **The honest nuance:** because the **family** sends the message, the platform is not messaging a non-consenting person, which is what the research's argument is actually about. The exposure is narrower than R32's flat wording implies — but it is not zero. Vivah Spot still processed those contacts to build the per-guest link, and the RSVP page is Vivah Spot's own surface, shown to a person who never consented, carrying a customer-acquisition call to action.
- **Resolution:** this is a counsel question, not an engineering one. A defensible middle: attribution stays (a sender-identification line arguably *helps* under R32's own "self-identifying" mitigation), the acquisition CTA appears only *after* the guest has submitted their RSVP, and the page carries the privacy-notice link and rights channel R30/R36 require. Do not let this be settled silently downstream.

### C3 — "Featured" vs the disguised-advertisement pattern (R13) · **Material**

- **Research:** R13 requires the label "**Promoted**" or "**Sponsored**" — "preferred over 'Featured'" — because *"'Featured' alone is arguably a weak label: it reads as an editorial merit signal, not a paid one."* The label must be **on the card itself**, must survive every surface, and must be joined by a tappable "Why am I seeing this?".
- **PRD:** "Featured" is the tier name (FR-50), the band name and the family-facing label (FR-20). The label attaches to the **band**, not the card. No "Why am I seeing this?". No every-surface persistence rule.
- **Why it matters:** disguised advertisement is an enumerated Annexure-1 dark pattern and the one most directly on point for this product. Penalties run through CP Act s.21(2) — ₹10 lakh, ₹50 lakh on repeat.
- **In the PRD's favour:** FR-20 does something better than most platforms — organic position is **not for sale at any price**, and Featured is kept out of the organic ordering entirely. That is a stronger structural answer than labelling. It just does not substitute for the label the Guidelines ask for.
- **Resolution:** rename the family-facing label to "Promoted" (the *tier* can keep any commercial name), move it to the card, add the disclosure tap. Cheap; the research calls it "a low-cost change" that "materially reduces the disguised-advertisement exposure."

### C4 — Contact Reveal vs Rule 5(3) prominent seller disclosure (R11) · **Material**

- **Research:** R11 requires vendor profiles to carry a verified geographic address and a customer-care number, "in a clear and accessible manner, displayed prominently."
- **PRD:** FR-19's Listing core contains neither. FR-36 makes obtaining contact details a discrete gated event, **counted and reported to the vendor as a lead metric**, and the Contact Reveal is a Glossary term and a Lead Dashboard KPI (FR-55, FR-56).
- **The tension:** a disclosure the Rules require to be prominent is being withheld in order to manufacture a countable lead event that the subscription's value proposition rests on. This is not fatal — the address is arguably distinct from the direct contact — but it is a real conflict between the compliance requirement and the commercial mechanic, and the PRD does not acknowledge it.
- **Resolution:** publish the business address and a customer-care number on the Listing unconditionally; keep Contact Reveal for the vendor's *direct working number*. The lead metric survives.

### C5 — "Nothing is non-cancellable" vs "no refunds" (R26, R59) · **Material**

- **PRD:** FR-54 — "No arrangement makes a Subscription non-cancellable, and no term is presented as irrevocable." §7.1 excludes refunds; FR-52 — the platform "never collects, holds, routes or **refunds** money between a family and a Vendor" (that clause is about the couple–vendor leg, but no subscription-refund path is described anywhere either).
- **Research:** R26 — no cancellation charge on a consumer unless the platform bears an equivalent charge (Rule 4(8)). R59 — Refund Voucher / credit-note capability from day one (Rule 51).
- **The contradiction:** a prepaid 6- or 12-month term that can be cancelled but never refunded is, in substance, a 100% cancellation charge. And per §2.4 of the research, solo vendors in Shrirampur will often qualify as consumers under the self-employment exception — so Rule 4(8) is live against exactly the cohort this product is built for.
- **Resolution:** decide and state what cancellation produces — pro-rata credit note, no refund with the term run out, or something else — and build the credit-note document type. R59 warns that retrofitting GST document types is painful.

### C6 — "Never adjudicate" vs FR-47's dispute route · **Minor, worth reconciling**

§7.2 excludes "adjudication of fault" and "any complaint pipeline that leads to a consequence"; FR-41 says the platform does not determine fault. FR-47 then gives a family the right to "dispute an entry with Admin" about a vendor's structured feedback — which is Admin adjudicating a factual disagreement between two users. This is defensible (it concerns platform-hosted content, not the couple–vendor deal, and R70 actually *requires* an appeal route) but the two statements need reconciling in the text so a downstream agent does not resolve it by deleting the appeal.

### C7 — RSVP link preview vs per-guest tokens (R41) · **Minor, but design-forcing**

FR-12 makes the link's rich preview "the platform's principal surface in front of guests" — i.e. a link designed to be forwarded and re-shared. R41 requires per-guest unguessable tokens, `noindex`, and no enumeration. A forwardable link with a rich preview and a per-guest secret token are not impossible together, but they pull in opposite directions and the PRD resolves neither. Decide before the architecture does it by accident.

---

## 3. Handover list — obligations that do not belong in a PRD

Not PRD defects. They must not be lost.

**Corporate / founding structure**
1. **R1 — Incorporate as a company under the Companies Act 2013.** Rule 4(1) presumes a company; a sole proprietorship is non-compliant on its face from day one. This is a decision for Pravin *before* incorporation, not a launch-week item.
2. **R2 — Appoint a nodal person of contact / senior designated functionary resident in India.** (The *publish* half is a PRD gap — see R2 in the matrix.)
3. **R3, R4, R7 — Name the humans:** grievance officer, DPDP contact, and the BSA s.63(4) "person in charge of the computer" plus a documented deputy. One person may hold several of these. Without the third, no s.63 certificate can ever be issued and the entire evidential chain built by FR-43 fails at the last step.

**Registrations and filings**
4. **R5 — GST registration** before *paid* revenue crosses ₹20 lakh aggregate turnover. Monitor monthly; the ₹0 cohort contributes nothing to the threshold, so the trigger must be watched against paid revenue only, and registration obtained *before* crossing.
5. **R6 — Endeavour to become a National Consumer Helpline convergence partner.**
6. **R28 — Dark-pattern self-audit** against all 13 Annexure-1 patterns, documented, plus a filed self-declaration (CCPA advisory of 05.06.2025). Cheap regulatory goodwill; strong first-line defence.

**Contracts and professional sign-off**
7. **R40 — Written processor contracts** with the WhatsApp BSP, email provider, cloud host and any analytics vendor. Check the BSP's own message/contact retention terms *before signing*. (The PRD gap is that it never requires these to exist; signing them is the handover.)
8. **R63 — Written CA view on ITC** in periods with a large free cohort (s.17(5)(h) is expressed in terms of goods; departmental views vary).
9. **R56 — CA sign-off on SAC classification** (998365 vs 998439). The rate is 18% either way, so the exposure is classification-mismatch penalty, not tax.
10. **R61 — Screen the Founding Vendor cohort for related persons** — relatives, employees, directors, controlled entities. Schedule I para 2 makes a ₹0 supply to a related person taxable at open market value.
11. **R48 — Maharashtra advocate on the Article 5(h) stamp duty rate** for a general agreement.
12. **Counsel opinion on the marketplace-entity question** (research open item 1) before the T&Cs are drafted. The research calls it "the single biggest unresolved question in this document."

**Operational runbooks**
13. **R22 — CERT-In runbook:** verify the current text of the 28.04.2022 Directions, then build 6-hour incident reporting, 180-day in-India ICT logs, and NIC/NPL NTP sync.
14. **R17 — Always-on legal inbox and escalation path** to make the 3-hour takedown window achievable with a small team in Shrirampur. This is a staffing commitment, not a feature.
15. **R42 — DPDP readiness by 14 May 2027.** Sequencing belongs to epics and sprint planning, which the PRD correctly refuses to do.

---

## 4. The unverified items — where the PRD is betting

The research flagged twelve items it could not verify. These are the ones where a resolution the other way **forces a PRD change**, ranked by how exposed the PRD currently is.

### 4.1 The bets the PRD is actually making

**A. Meta's template categorisation of vendor notifications (research open item 6) — the sharpest live bet.**
The family-sends decision moots this for *invitations*. But the PRD makes platform-initiated WhatsApp the **sole** vendor channel: enquiry notifications (FR-35), calendar nudges (FR-29), renewal reminders (FR-53), and UJ-2's whole narrative. A calendar nudge and a renewal reminder are plausibly **Marketing**, not Utility — which requires explicit marketing opt-in from each vendor and changes the price. The PRD nowhere requires vendor WhatsApp opt-in capture, and specifies no fallback channel. If the BSP comes back "Marketing," FR-29 and FR-53 need an opt-in gate and a second channel, and R51's ban on unofficial APIs (currently omitted) becomes urgent. **Ask the BSP for a written view now** — this is the one unverified item that bites in the vendor experience, not the guest one.

**B. Are families "consumers" of Vivah Spot? (open item 11 — *IMA v. V.P. Shantha* applied to a zero-price platform).**
The PRD takes no position, which is itself a bet. If families *are* consumers — the research's own reading, by analogy to a vendor-funded free service — then the full consumer apparatus applies to the family leg: R15's 48-hour/one-month SLA **and complaint ticket numbers**, R26 cancellation rules, R27 non-discrimination. The PRD carries none of these for families; FR-63 only addresses the *intermediary* timelines. If they are not consumers, nothing changes. Currently silent, and the silence favours the outcome that costs less.

**C. Is Vivah Spot a "marketplace e-commerce entity"? (open item 1 — the research's biggest open question).**
Good news: the PRD does **not** bet on being outside. FR-63 and FR-64 accept intermediary and disclosure duties. The bet is narrower and subtler — the PRD implements the Rule 4/5 duties *partially*, so if the answer is "inside" (which the research says is the stronger reading), the platform is non-compliant on **R8** (entity identity disclosure), **R11** (address and phone on the profile), **R12** (the "not applicable and why" page), **R15** (ticket numbers), **R19**, **R20** and **R21**. All seven are cheap to add now. R20 in particular is a **schema** decision — a persistent vendor identity that survives deletion and re-registration cannot be bolted on later.

**D. Whether a QCO has made IS 19000:2022 mandatory (open item 3).**
If notified, **R71** (published review submission T&Cs) and **R73** (marking incentivised reviews and excluding them from the aggregate) move from SHOULD to MUST — and both are currently Omitted. **R67**'s criteria disclosure and **R65**'s author-verification controls would also need tightening. The PRD's review mechanism (FR-44 through FR-49) is otherwise strong enough that a QCO would be near-costless; these two omissions are the entire exposure. Adding them now makes the question moot.

**E. Maharashtra stamp duty on the Agreement (open item 7).**
The PRD correctly makes no court-readiness claim. But if Article 5(h) turns out to require meaningful duty, R48's disclosure becomes materially more important — a family may reasonably believe the timestamped, downloadable Agreement is usable in court, and s.34 renders an insufficiently stamped instrument inadmissible until duty and penalty are paid. One disclosure line closes it. Currently absent.

**F. Which DPDP *Act* sections are in force today (open item 4).**
Does not change *what* is required, only *when*. But it changes whether R31, R37, R38 and R41 are architecture debt or live liability. The PRD is unphased and therefore takes no position — correct at PRD altitude, but the epics must not treat DPDP as a 2027 problem while shipping guest-contact bulk import in sprint three.

### 4.2 The bets the PRD deliberately and correctly took off the table

- **Open item 12 — does the WhatsApp invitation feature fall outside IT Act s.79(2)(b)?** FR-12's family-sends model makes this moot for invitations. This is the single best regulatory decision in the PRD: it resolves an unsettled legal question by removing the conduct rather than by arguing about it.
- **CGST s.52 TCS / s.24(x) compulsory registration.** §7.1's absolute no-money constraint means the platform never collects the consideration, so TCS never applies and registration falls on the ordinary ₹20 lakh threshold. Structural, not argued.
- **DLT/TCCCPR on invitations.** No SMS invitation exists, so the whole DLT regime is avoided for that feature. (It remains live for OTP — see R52.)

### 4.3 Not PRD-affecting

Open items 2 (clause lettering in Rule 5(3)), 5 (12 vs 13 dark patterns), 8 (ITC on free services), 9 (Notification 10/2017-IT and inter-State registration) and 10 (current CERT-In text) affect drafting, tax filings or runbooks — none forces a change to the product requirements.

---

## 5. Recommended order of work

Not a sprint plan — the sequence in which the PRD text should be amended, cheapest-and-most-load-bearing first.

1. **Resolve C1.** One carve-out in §7.8 for guest contact data. Everything else in §7.8 stands.
2. **Add R31 and R41 to FR-11/FR-12.** The upload attestation and the per-guest token / `noindex` / no-enumeration rules. These are the two mitigations that make the guest-list feature defensible; both are one bullet each.
3. **Resolve C2 with counsel**, then write the answer into FR-12 and SM-6 so the growth surface and the DPDP position are decided together rather than by whoever builds the RSVP page.
4. **Fix C3.** Rename the family-facing label to "Promoted", move it to the card, add "Why am I seeing this?", add the every-surface rule.
5. **Add the compliance-floor FRs** the PRD is missing under an intermediary/e-commerce reading: R8, R11 (address + phone on the Listing), R12, R15 (ticket numbers and the *consumer* SLA distinct from the intermediary one), R19, **R20 (schema — do this before the data model is derived)**, R21, R38.
6. **Close the subscription-side gaps:** R25 (GST-inclusive all-in price before payment — apply to yourself the rule you impose on vendors), C5/R26/R59 (decide what cancellation produces; build the credit note), R27 (published rule-based pricing), R56/R62 (line-item split and IRN-shaped serials).
7. **Complete the evidence chain:** R76's field set and R79's Part A generator. Without R79 the whole of FR-43 terminates in a document nobody can produce.
8. **Add R71 and R73** to §4.9 — two bullets that make an IS 19000 QCO a non-event.

---

*This audit reads the PRD as written. Where it scores a requirement Partial or Omitted, that is a statement about the document, not about anyone's intent — several of these are things the team plainly means to do and has not yet written down. The distinction matters because §0 of the PRD is right: "Anywhere this document is silent or vague, an agent downstream will decide for itself, and that decision will be nobody's."*
