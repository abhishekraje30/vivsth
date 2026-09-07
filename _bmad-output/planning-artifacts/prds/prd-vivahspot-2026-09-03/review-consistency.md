---
title: Consistency Audit — Vivah Spot PRD
target: prd.md (1154 lines, 67 FRs, 3 UJs, 7 SMs, 14 feature groups)
authority: .memlog.md (68 entries, updated 2026-09-05T17:36)
date: 2026-09-05
---

# Consistency Audit — Vivah Spot PRD

**Verdict: NOT YET AIRTIGHT.** The document is unusually disciplined for its size — FR numbering is complete and unduplicated, every UJ/FR/SM cross-reference resolves, and the memlog's major decisions (Block model, Agreement-as-record, asymmetric reviews, Delivery-gated window, family-sends invitations, paid-placement labelling, no-auto-renewal, non-party legal posture) are all faithfully realised. The defects are concentrated in three places: **the Glossary, which is stale relative to the FRs it governs**; **a small number of FRs that quietly re-open exclusions §7 makes**; and **two load-bearing mechanisms that depend on an FR that was never written**.

Because §0 states that "anywhere this document is silent or vague, an agent downstream will decide for itself", the silences below are graded as harshly as the contradictions.

**Severity counts: 7 Critical · 11 High · 17 Medium · 8 Low (43 findings).**

---

## 1. Glossary discipline

### 1a. Glossary terms used inconsistently, or with a synonym

---

**[CRITICAL] G-1. The Glossary says a Wedding holds a `city`. FR-33 says nothing in the platform may assume a city.**

§3 line 147:
> **Wedding** — the parent object a couple creates. Holds couple names, **city**, guest count, budget ceiling, Functions, Candidate Blocks, the Chosen Block, Shortlists and Agreements.

FR-33 lines 512–515:
> - Places are held as a **hierarchy** — village and town, tehsil, district, state, country — not as a flat list of cities.
> - A Wedding holds a **place**. A family sees the Vendors whose declared area **covers that place**, at any level of the hierarchy.
> - **Nothing in the platform assumes a single city.**

Memlog #56 is unambiguous: *"Geography is a HIERARCHY … NOT a flat city list … NOTHING in the model assumes a single city … Written as FR-33; FR-19 'cities served' changed to 'places served'."* FR-19 was duly changed (line 410, "the places served"). **The Glossary was not.** Since the Glossary is declared binding on every downstream artifact (§0 line 16), an architecture agent reading §3 will emit `Wedding.city: string` and the entire place hierarchy dies at the data model. Fix: `city` → `place`.

---

**[CRITICAL] G-2. "bookable" — the banned root word — is embedded in the two Glossary definitions that most directly become schema.**

§3 line 170 states the ban in the strongest available terms:
> **Deliberately not used:** *Booking*. … The word must not appear in any surface, **schema** or downstream document.

Yet the Glossary itself uses its adjectival form twice, in the two entries an ORM will translate literally:

- Line 153: **Space** — "a distinct **bookable** area within a venue Listing"
- Line 154: **Slot** — "a **bookable** division of a day on a Space's calendar. Morning and evening are separately **bookable**"

And again in the body:
- Line 108 (UJ-2 constraints): "A venue is **many bookable spaces**"
- Line 449 (§4.5 description): "A venue is not one thing but several **bookable** Spaces."
- Line 455 (FR-23): "one Listing carries several independently **bookable** Spaces"

This is the single highest-frequency banned-vocabulary leak in the document, and it sits in the section that declares the ban. It will surface downstream as `is_bookable`, `bookable_spaces`, `BookableSlot`. Suggested replacement: *engageable* / *separately engageable*, matching the verb the PRD already uses everywhere else ("the family engages a **Space**", FR-23 line 459).

---

**[HIGH] G-3. The demand-side actor has two names and no Glossary entry: "couple" and "family".**

The Glossary uses **couple** as the owning actor in six entries:

| Line | Entry | Text |
|---|---|---|
| 147 | Wedding | "the parent object a **couple** creates" |
| 149 | Workspace | "the **couple's** command centre over a Wedding" |
| 158 | Shortlist | "the set of Listings a **couple** has saved" |
| 159 | Enquiry | "**couple**-initiated contact with a Vendor" |
| 160 | Contact Reveal | "the point at which a **couple** obtains a Vendor's direct contact details" |
| 161 | Agreement | "terms confirmed by both a **couple** and a Vendor" |

Every FR body instead says **family** — FR-13 "Every Listing the family sees", FR-34 "When a family enquires", FR-39 "The family confirms, then the Vendor confirms", and 100+ more.

This is not merely a synonym violation; §4.1 and FR-2 make it a **factual contradiction**:

> Line 182: "The person planning a wedding is very often not the person getting married. … **The couple are names on the Wedding, not the owners of it.**"
> FR-2 line 201: "Couple names are stored as data on the Wedding, **independent of the account that owns it**."

So the Glossary attributes ownership, shortlisting, enquiring, contact reveal and Agreement confirmation to precisely the party FR-2 says does *not* own the Wedding. Memlog #29 settles the actor as the **creator** ("only Rutuja can"). Fix: add a Glossary entry for the demand-side actor (the PRD's own working term is **family**, with **creator** as the acting principal), and rewrite the six entries above.

---

**[HIGH] G-4. "Delivery" is used in FR-12 to mean message delivery, colliding head-on with the Glossary term.**

Glossary line 163:
> **Delivery** — the point at which a Service has actually been rendered.

FR-12 line 316:
> - **Delivery is not tracked**, because the platform is not the sender.

Read literally by a downstream agent, this states that the Delivery event — the sole gate on the review window (FR-40 line 658, FR-44, FR-45) — is not tracked. Fix: "Message receipt is not tracked" or "Whether a guest received the invitation is not tracked".

---

**[HIGH] G-5. "Review" is lowercased throughout §4.9, the group that defines it.**

FR-44 uses the term correctly ("A **Review** can be written only by parties to an Agreement"). Then:

- FR-46 line 728: "**Reviews** are never edited, reordered by sentiment, or selectively published. A Vendor cannot remove or suppress a **review** of themselves."
- FR-46 line 729: "The basis on which **reviews** are sorted is disclosed"
- FR-48 line 747: "Neither party can see the other's **review**"
- FR-48 line 749: "**A review is published when the window closes**"
- FR-49 lines 756–758: "**Reviews** are moderated only for unlawful content… **A review is never removed**… A removed **review** is recorded as removed"

Same drift elsewhere: FR-19 line 410 "rating and **review** count"; FR-57 line 845 "**enquiry** volume" (Enquiry); NFR 5.6 line 1023 "no guarantee about **vendor** performance"; §7.2 line 1102 "**vendor** standing scores"; UJ-2 constraints line 108 "many bookable **spaces**", "**slot**-based", line 110 "**Enquiries** are qualified" (correct) against line 98 "An **enquiry** arrives on WhatsApp"; UJ-2 path lines 94–100 "two **spaces**", "the **enquiry**". **[MEDIUM] M-11** covers the aggregate.

---

**[MEDIUM] G-6. Glossary `Slot` is bound to a Space's calendar; FR-28 puts Slots on Listings too.**

Glossary line 154: "a bookable division of a day on **a Space's calendar**."
FR-28 line 541: "Availability is held per **Space** where the Service has Spaces, and **per Listing where it does not**." Line 542: "Availability is expressed in **Slots**."

A Service without Spaces therefore has Slots on a Listing, which the Glossary definition forbids. Fix: "a division of a day on a Space's or Listing's calendar".

---

**[MEDIUM] G-7. Glossary `Space` is restricted to venue Listings; FR-23 makes it a per-Service configuration.**

Glossary line 153: "a distinct bookable area within a **venue** Listing".
FR-23 line 460: "**Whether a Service has Spaces at all is configured per Service**, not built per Service."

The Glossary hard-codes what FR-23 and FR-62 insist must be configurable.

---

**[MEDIUM] G-8. Glossary `Agreement` says "Blocks the Slot" (singular); FR-40 blocks "Slots or span".**

Line 161 vs FR-40 line 656 ("The relevant **Slots or span** are blocked") and FR-28 line 544 ("for a span Service, the whole span, overnight included"). The singular Glossary form loses the span case entirely — which is the case FR-14's overnight rationale (line 352) was built to protect.

---

**[MEDIUM] G-9. "Block" is used as unglossed shorthand for "Candidate Block" throughout.**

FR-13 line 335 "the whole **Block**"; FR-19 line 410 "against her **Blocks**"; FR-26 line 505 "their own **Block**"; FR-30 line 564 "their own **Block**"; FR-31 line 573 "whose **Blocks** fall there"; FR-34 line 589 "the Chosen or Candidate Block" (correct). §3 demands verbatim use; a bare "Block" is ambiguous between Candidate and Chosen at exactly the points where the distinction is load-bearing (FR-26/FR-30 pricing is quoted against a *Candidate* Block before locking).

---

### 1b. Domain nouns used in FRs that are NOT in the Glossary and should be

**[MEDIUM] M-12.** Each of the following is used as a defined concept in normative FR text, is capitalised or otherwise treated as a term of art, and has no Glossary entry:

| Term | Where used | Why it needs an entry |
|---|---|---|
| **Lead Dashboard** | Glossary line 160 (!), FR-36, FR-37, FR-51, FR-53, §4.11 | Referenced *by the Glossary itself* under Contact Reveal, but never defined. It is "the entire renewal argument" (line 762). |
| **span** | FR-13, FR-14, FR-26, FR-28, FR-40, FR-42, FR-45 | Slot is glossed; span is not — yet Agreements block "Slots **or span**". The overnight-inclusion rule (FR-14 line 348) lives entirely in this word. |
| **engagement model** | FR-14, FR-62 | The four-axis engine (memlog #37/38) turns on it. |
| **sizing attribute** | FR-18, FR-19, FR-21, FR-62 | One of the four axes. |
| **place** | FR-19, FR-33, FR-57, FR-62 | Replaces "city" everywhere per memlog #56 but was never glossed. |
| **Real Wedding** | NFR 5.5 line 1013 (capitalised), §4.14, FR-65, FR-66 | Capitalised as a term in one place, lowercase "published wedding" in FR-65/66. |
| **Guest** / **RSVP** | FR-11, FR-12, NFR 5.5, SM-6 | Guests are a distinct data subject class with their own retention rule (NFR 5.5 line 1010). |
| **Board** | FR-67, §7.4 line 1118 | The only Workspace object with no Glossary entry. |
| **site visit** | FR-37, FR-38, UJ-2 | An Enquiry outcome state and a Workspace object (FR-38 line 629). |
| **quote** | FR-35, FR-39, UJ-2, UJ-3 | The precursor object to an Agreement. |
| **Featured Listing** / **tier** | FR-20, FR-50 | Only enumerated inside the `Subscription` entry. |
| **grace period** | FR-53 | Determines when a Listing leaves discovery. |

---

### 1c. Glossary terms defined but never used

**[MEDIUM] G-10. `Commitment` is defined and then never used in a single FR.**

Glossary line 164:
> **Commitment** — a Vendor-declared, publicly published promise: delivery timeline, inclusions, no hidden charges.

Its only appearance outside §3 is NFR 5.1 line 978 ("a Vendor's Rules, **Commitments** and package descriptions"). No FR requires a Commitment, defines where it is published, or makes it a condition of listing. Worse, the FRs describe its component parts *without using the term* — a textbook synonym violation:

- FR-26 line 504: "The **no-hidden-charges declaration** is published on the Listing"
- FR-59 line 869: "an all-in price, published Rules, and the **no-hidden-charges declaration**"
- FR-21 line 431: "a photographer on deliverables and **delivery timeline**"
- FR-45 line 717: "the Vendor's **own committed delivery date**"

See **C-2** below — this omission is not cosmetic; it breaks FR-45.

*(All other Glossary terms — Wedding, Function, Workspace, Service, Vendor, Listing, Space, Slot, Anchor Date, Candidate Block, Chosen Block, Shortlist, Enquiry, Contact Reveal, Agreement, Review, Delivery, Rules, Preferred Vendor, Verification, Subscription — are used in at least one FR.)*

**[MEDIUM] G-11. Glossary `Workspace` lists a "checklist" that exists nowhere else in the PRD, and omits Boards.**

Line 149: "dashboard, budget tracker, guest list, **checklist**, Shortlists, Enquiry tracking."

"checklist" appears exactly once in 1154 lines — here. No FR creates, populates or displays one. FR-10 (the "one view of the whole wedding") enumerates the Workspace contents and omits it: "every Function with its day and Slot, every Shortlist, every Enquiry and its current status, the running total against the budget ceiling, and the Chosen Block". Conversely FR-67 puts inspiration **Boards** in the Workspace ("boards within their Workspace") and the Glossary omits them. An autonomous agent will either build a checklist from nothing or silently drop it.

---

## 2. Banned vocabulary (§7.9)

### Violations found

| # | Sev | Line | Text | Note |
|---|---|---|---|---|
| B-1 | **CRITICAL** | 153, 154, 108, 449, 455 | "**bookable**" ×6 | See **G-2**. In the Glossary and in FR-23 — i.e. in the text that becomes schema. |
| B-2 | LOW | 26 | "every vendor who turns out to be **booked** sends the family back to the start" | Literal banned word, Vision §1. |
| B-3 | LOW | 129 | "She cancels, or he **double-books**" | UJ-3 edge case. |
| B-4 | LOW | 1094 | "Excluded: **booking** payments … and any wallet, **cart** or **checkout**." | Meta-use inside an exclusion list. Defensible, but a naïve downstream grep-based vocabulary sweep will flag it; worth an explicit carve-out note. |
| B-5 | LOW | 262 | "without asking Rutuja to **keep books**" | Idiom, not the banned sense. No action. |

### Not violations (verified clean)

- **"legally binding" / "guaranteed" / "enforced by Vivah Spot" applied to an Agreement**: every occurrence is a *prohibition*, correctly framed — FR-41 line 666, NFR 5.6 line 1022, §7.9 line 1150. Line 1023 ("makes no guarantee about vendor performance") and line 1025 ("A guarantee the platform cannot honour is worse than none") are negations. Line 496 ("Rules are **enforced** going forward") and line 1124 ("declared and **enforced** by the Vendor") attribute enforcement to the Vendor, not to Vivah Spot — correct per memlog #17. **Clean.**
- **v1 / MVP / Phase N**: zero occurrences in the body. Line 16 ("It is **not** phased"), line 1088 ("Not a **phase** boundary") and lines 172/1151 are the ban itself. **Clean** — a notable achievement given memlog entries #6, #15, #22, #23 all used "v1" freely.

### Structural defect in the ban itself

**[MEDIUM] B-6. §3 and §7.9 publish two different ban lists.**

§3 line 170–172 declares only two: *Booking*, and *v1/MVP/Phase N*.
§7.9 line 1148–1151 declares four: *Booking/booked*, *Cart/checkout*, *Legally binding/guaranteed/enforced by Vivah Spot*, *v1/MVP/Phase N*.

Cart/checkout was added by memlog #59 ("VOCABULARY: 'cart' and 'checkout' are banned alongside 'Booking'") and reached §7.9 but not §3. Since §3 is the section declared "binding on every downstream artifact" (line 16), an agent that reads only the Glossary inherits an incomplete ban. Fix: make §3 point at §7.9 rather than restating a subset.

---

## 3. Cross-reference integrity

**All resolve. No dangling references.**

| Reference | Location | Target | Verdict |
|---|---|---|---|
| FR-15 | line 432 (FR-21) | FR-15 "Collisions are shown, never silently resolved" | ✅ accurate |
| FR-15 | line 442 (FR-22) | same | ✅ accurate |
| FR-17 | line 492 (FR-32) | FR-17 "Changing the Chosen Block cancels what was agreed against it" | ⚠️ see X-1 |
| FR-30 | line 573 (FR-31) | FR-30 "Pricing that moves with the season" | ✅ accurate |
| group 4.12 | line 526 (FR-27) | §4.12 Trust & Verification | ✅ accurate |
| §3 | line 16 | §3 Glossary | ✅ |
| §5 | line 18 | §5 Non-Functional Requirements | ✅ |
| §7 | line 18 | §7 Scope Boundary | ✅ |
| UJ-1/2/3 | 90 occurrences | all three exist | ✅ all resolve |
| SM-1..SM-7 | §6 only | defined, never cited elsewhere | ✅ no dangling |
| Scope §6 | lines 138, 320 | external | ✅ consistent with memlog #37 |
| Scope §8 | lines 112, 133 | external | ✅ |
| Scope §9, §11 | line 989 | external | ✅ per memlog #57 |
| §12 (scope doc) | line 851 | external | ✅ per memlog #25 |

---

**[MEDIUM] X-1. FR-32 cites FR-17 for a cancellation FR-17 does not cover.**

FR-32 line 492:
> - On acceptance, any impermissible **Agreement is cancelled under FR-17** — recorded on both profiles, Slots released, no Review unlocked.

FR-17 is titled and scoped exclusively to *"Changing the Chosen Block cancels what was agreed against it"*. A Rule-conflict cancellation is not a Block change. The FR that actually generalises cancellation semantics is **FR-42 "Cancelling"** (lines 671–680), whose four consequences are precisely the three FR-32 enumerates plus the budget withdrawal. The citation propagates from memlog #55, which used the same wording, so it is a faithful transcription of an imprecise decision — but downstream it invites an implementation that special-cases Block changes. Fix: cite FR-42, or state that FR-17's cancellation *is* FR-42 applied to a Block change.

---

**[MEDIUM] X-2. Line 1106's "§5.3" is ambiguous with the PRD's own §5.3 Performance.**

§7.2 line 1106:
> *This supersedes Scope §2 objective 4, **§5.3** and §8, which describe delisting as the primary enforcement lever.*

The "Scope" qualifier distributes only by charity. The PRD's own §5.3 is *Performance* (line 991), which has nothing to do with delisting. Memlog #17 confirms the intent is the Scope document's §5.3 ("Scope 5.3 admin 'vendor standing & delisting'"). Fix: "Scope §2 objective 4, Scope §5.3 and Scope §8".

---

## 4. FR ID continuity

**Clean on the criteria that matter. One ordering defect.**

- **67 FR headings, IDs FR-1 through FR-67.**
- **No duplicates.** Every ID appears exactly once as an `#### FR-N:` heading.
- **No gaps.** All of 1–67 present.

**[MEDIUM] N-1. FR-32 and FR-33 are physically out of sequence inside §4.5.**

Heading order in §4.5 Vendor Listings:

```
line 453  FR-23  A Listing can hold several Spaces
line 462  FR-24  Rules are published, and they bind what the family may choose
line 473  FR-25  Preferred Vendors
line 484  FR-32  A conflicting Rule is surfaced before it takes effect   ← out of order
line 498  FR-26  Pricing follows the Service's own model
line 507  FR-33  Where a Vendor works                                    ← out of order
line 519  FR-27  Portfolio
```

This is the visible residue of memlog #55 (FR-32) and #56 (FR-33) being appended to an already-numbered group. §0 line 18 explicitly licenses global numbering *"so that references survive any later reorganisation"*, so the IDs are correct and stable. The risk is narrower but real: **any downstream tool that infers group membership or ordering from document position, or that walks FRs sequentially to build an epic backlog, will mis-sequence §4.5.** Recommendation: leave the IDs alone (that is the whole point of them) but add a one-line note under §4.5 stating that FR-32 and FR-33 belong to this group and were numbered later, so no agent "corrects" them.

---

## 5. Memlog vs PRD — the divergence register

*The memlog is the authority on WHY. Walked all 68 entries. 52 are cleanly and fully realised. The 16 divergences follow.*

### 5a. Decisions logged but NOT reflected in the PRD

---

**[CRITICAL] C-2. Memlog #43's delivery-timeline mechanism has no FR requiring a delivery timeline to exist.**

Memlog #43:
> REVIEW WINDOW OPENS ON DELIVERY … WHO DECIDES: the Vendor marks it delivered, OR **the Vendor's own committed delivery date passes**, whichever comes FIRST. A late photographer cannot hold the review window shut … **Makes the Scope 6 'published delivery timeline, tracked and reviewed' promise actually enforceable.**

The PRD faithfully carries the *consumption* side:
- Glossary line 163: "or when **the Vendor's committed delivery date** passes"
- FR-45 line 717: "**or** when the Vendor's own committed delivery date passes"
- UJ-3 line 138: "**This is what makes the published delivery timeline in Scope §6 load-bearing rather than decorative.**"

But nothing in the PRD **produces** that date. FR-59 "Conditions of listing" (line 869) enumerates them exhaustively:
> A Listing cannot be published without: completed Verification, an all-in price, published Rules, and the no-hidden-charges declaration.

**No delivery timeline.** FR-26 (pricing), FR-27 (portfolio) and FR-23 (Spaces) do not require one either. The only other mention is FR-21 line 431, where delivery timeline is an optional *comparison attribute* configured per Service.

Consequence: for every Service whose Vendor never declared a timeline — which, absent an FR, is every Service — FR-45's second trigger can never fire, and the review window reverts to "whenever the Vendor chooses to mark it delivered". That is exactly the failure mode memlog #37 identified (Shape G work arriving months later) and memlog #43 was written to close. It also strands the `Commitment` Glossary term (**G-10**), which is where the delivery timeline was supposed to live.

**Fix: add the Commitment — delivery timeline, inclusions, no-hidden-charges — to FR-59's conditions of listing, and make FR-45 cite it.**

---

**[HIGH] C-4. The seven-shape Service taxonomy (memlog #38, explicitly confirmed) is absent, and FR-14's three engagement models cannot express two of the shapes.**

Memlog #38:
> SEVEN-SHAPE SERVICE TAXONOMY **CONFIRMED by Abhishek** ('this shapes looks right'): A Booked Space, B Booked Crew, C Per-Head Consumables, D Built Installations, E Rented Goods, F Produced Goods, G Post-Event Deliverables, H Advisory.

Memlog #39:
> Availability degrades by shape: A/B/C/D = real Slot availability and PARTICIPATE in Block matching; **E = rental period; F = delivery-by lead time**; H = no calendar at all … and H does NOT participate in Block matching.

The PRD carries the four *axes* well (FR-14 engagement model, FR-26 pricing model, FR-18/19/62 sizing attribute, FR-13/28 availability), which is arguably the right level of abstraction. But FR-14 line 346 offers exactly three engagement models:

> A Service declares one of: engaged as a **continuous span** …; engaged **per Function**; or **no duration** at all.

Neither **E (rental period)** nor **F (delivery-by lead time)** maps onto any of the three. A rented mandap held for four days is not a span across Functions, not per-Function, and emphatically not "no duration". And FR-26 line 503 *prices* against a rental period —

> Price is expressed per the Service's model: per span, per Function, per head, per unit, **per rental period**.

— so the pricing axis has five values while the engagement axis has three, and "rental period" appears in one and not the other. An agent configuring Shape E or F Services has no defined behaviour.

**Fix: extend FR-14 to the shapes memlog #39 actually enumerates, or state explicitly which shape collapses into which of the three models.**

---

**[HIGH] C-5. FR-13 says "no calendar"; FR-14 says "no duration". These are different axes, used as if they were one.**

- FR-14 line 346: a Service may declare "**no duration** at all".
- FR-13 line 338: "Services with **no calendar** are excluded from Block matching and presented without an availability claim, not as unavailable."
- FR-28 line 546: "For a Service with **no calendar**, availability reduces to whether the Vendor is currently accepting Enquiries."

Memlog #39 puts these on separate axes: Shape H has *no calendar*; Shapes E and F have calendars (rental period, lead time) but no Function-anchored duration. As written, an agent must guess whether "no duration" implies "no calendar" — and if it guesses yes, every Shape E and F Service silently drops out of Block matching, which memlog #39 reserves for H alone.

---

**[HIGH] C-6. Memlog #52's BSA s.63 Part A certificate generator is missing from FR-43.**

Memlog #52:
> For BSA s.63 evidential value: **SHA-256 at confirmation**, **frozen PDF/A**, **append-only log**, **NTP timestamps**, a **NAMED person in charge of the computer**, **Part A certificate generator**, **8-year retention**.

FR-43 delivers six of seven:

| Requirement | FR-43 | |
|---|---|---|
| SHA-256 at confirmation | line 688 "A cryptographic digest of the confirmed document is recorded at the moment of confirmation" | ✅ |
| NTP timestamps | line 689 "recorded from a trusted time source, not from a device clock" | ✅ |
| Append-only log | line 690 "The history of an Agreement is append-only" | ✅ |
| Named person in charge | line 692 "A named individual is accountable for the systems holding these records" | ✅ |
| 8-year retention | line 691 "retained for **eight years** beyond the wedding" | ✅ |
| Frozen PDF/A | line 687 "frozen at confirmation" + line 691 "retrievable in the form they were confirmed in" | ⚠️ capability-level; acceptable |
| **Part A certificate generator** | **absent** | ❌ |

The s.63 Part A certificate is the artifact that makes the whole apparatus admissible; without it the digest, the NTP timestamp and the named custodian are evidence of nothing in particular. It is a discrete capability, not an implementation detail, so it belongs in the PRD.

---

**[HIGH] C-7. Memlog #44's mandated correction to Scope §8 is not recorded as a supersession.**

Memlog #44:
> SEARCH RANKING IS FOR SALE … **CONSEQUENCE: Scope 8's stated differentiator 'no fee and no commission means search ranking is not for sale to the highest bidder' is now FALSE and must be struck from the scope document and from all marketing copy** — same category as the escrow-era guarantees Scope 8 itself prohibits.

Memlog #45 reaffirms: *"Scope 8's 'search ranking is not for sale' line still must be struck — ranking IS sold, just visibly."*

The PRD records its other supersessions explicitly and prominently — §7.2 line 1106 (delisting), §5.2 line 989 (iOS), §0 line 16 (general precedence). **This one is nowhere.** FR-20 correctly implements the *mechanism* (labelled Featured band, unpurchasable organic ordering) but never states that the Scope document's contrary marketing claim is now false and must be withdrawn. Given that NFR 5.6 line 1025 binds "Marketing copy, app copy and vendor-facing material" to the legal posture, and that memlog #44 places this line in the same category as the banned escrow guarantees, the omission is material. **Fix: add to §7.2 or FR-20 — "This supersedes Scope §8's claim that search ranking is not for sale; ranking is sold, visibly and separately."**

---

**[HIGH] C-8. Memlog #37/#38's Mehndi/Sangeet word collision is unresolved — and it is a Glossary problem.**

Memlog #37:
> **Word collision: Mehndi/Sangeet are BOTH a Function and a Service, must be renamed (Function=Mehndi, Service=Mehndi Artist).**

Memlog #38: *"Catalog defects accepted as real and **must be fixed**: Function-vs-Service mixing, Mehndi/Sangeet word collision, platform features listed as Services, gift registry unmodellable."*

Score:
- Gift registry — ✅ fixed, §7.8 line 1142.
- Platform features listed as Services — ⚠️ partially: §4.2 line 320 handles *Invitation cards* and *Digital invite + RSVP* ("These compose rather than collide"). Budget planning, thank-you tracking and the couple's website are not addressed.
- Function-vs-Service mixing — ❌ not addressed.
- **Mehndi/Sangeet collision — ❌ not addressed.** The PRD lists both as Functions in two places and never states the renaming rule:
  - Glossary line 148: "a distinct ceremony within a Wedding (Haldi, **Mehndi**, **Sangeet**, Wedding, Reception, or custom)"
  - FR-9 line 280: "Functions may be taken from a standard set — Haldi, **Mehndi**, **Sangeet**, Wedding, Reception"

Since §3 is binding on downstream artifacts, an agent building the Service catalog from the Scope §6 list will create a Service literally named "Mehndi" that collides with the Function "Mehndi" in the same namespace. **Fix: state the disambiguation rule in §3 — Functions are ceremonies; Services performing at them carry the practitioner form (Mehndi Artist, Sangeet Choreographer).**

---

**[MEDIUM] C-9. Memlog #60's guest accommodation and transport decision has no FR.**

Memlog #60:
> GUEST ACCOMMODATION AND GUEST TRANSPORT ARE IN, as ORDINARY SERVICES … the platform does NOT allocate rooms, assign guests to vehicles, or size the order from RSVP data. **It may surface the relevant guest count as context; the family decides quantity.**

The PRD carries only the negative half, in §7.6 line 1128 ("sizing an order from guest data without the family deciding"). The positive half — accommodation and transport are in-catalog, and the guest count may be surfaced as context — appears nowhere. Neither word ("accommodation", "transport") occurs in the PRD.

---

**[MEDIUM] C-10. Memlog #25's client-input dependencies are not recorded anywhere in the PRD.**

Memlog #25:
> NOTE: this covers product decisions only; the **Scope 12 CLIENT INPUTS remain real dependencies** (subscription pricing, Founding Vendor cohort definition, legal T&Cs incl. non-party disclaimer, business+GST registration, payment gateway merchant account, initial vendor pipeline, and staff to physically verify vendors/portfolios).

The PRD mentions §12 of the Scope document exactly once, at line 851, and only for verification staff. FR-50 line 775 handles pricing ("Tier prices are a business input, set outside this document"). The remaining five — legal T&Cs, GST registration, merchant account, Founding Vendor cohort definition, vendor pipeline — are unrecorded. FR-52 requires a GST-compliant invoice and online payment; FR-51 requires a Founding Vendor tier with "a real expiry date"; NFR 5.6 requires non-party T&Cs. **An autonomous build will hit all three as hard blockers with nothing in the chain-top artifact warning it.** A short "External dependencies" subsection would close this.

---

### 5b. PRD statements that CONTRADICT a logged decision

---

**[CRITICAL] C-11. FR-47 creates the dispute workflow memlog #20 and §7.2 exclude, and adds an unlogged payment question.**

Memlog #20:
> AGREEMENT SIZE = SMALL … Vivah Spot stays non-party, **NO mediation, NO liability, no dispute workflow**.

Memlog #54 enumerates the structured questions exactly:
> Vendor->Family: STRUCTURED responses to fixed questions only (**responsiveness, headcount held, venue left as agreed**)

§7.2 line 1102: *"Excluded: dispute mediation, **adjudication of fault**, any complaint pipeline that leads to a consequence…"*
UJ-3 line 136 repeats the three questions: *"did they respond, did the headcount hold, was the venue left as agreed"*.

FR-47 lines 737 and 740:
> - A Vendor answers a fixed set of questions — responsiveness, whether the agreed headcount held, whether the premises were left as agreed, **whether payment terms were met**.
> - The family can see everything recorded about them and **can dispute an entry with Admin**.

Two separate defects:

1. **"whether payment terms were met"** is a fourth question, present in no memlog entry, in no UJ constraint, and in no Glossary definition. It asks a business to record a factual assertion about a named private individual's **financial conduct** — precisely the DPDP/defamation exposure memlog #54 says the structured form exists to remove ("removes the defamation and DPDP exposure of a business writing prose about a named private individual"). It also concerns money that, per §7.1 and NFR 5.6, the platform never sees, cannot verify, and has no business recording.
2. **"can dispute an entry with Admin"** is a dispute workflow. It requires Admin to adjudicate a contested factual claim between a family and a Vendor. §7.2 excludes "adjudication of fault"; memlog #20 excludes "dispute workflow"; FR-41 line 667 says "Vivah Spot does not mediate disputes, determine fault, or offer any process for resolving a disagreement". FR-47 offers exactly such a process.

**This is the sharpest contradiction in the document — an FR reopening the exclusion the entire legal posture rests on.**

---

**[CRITICAL] C-12. §5's preamble tells downstream agents the section is incomplete.**

§5 line 969:
> *Cross-cutting requirements. Written as they are settled; **the section is incomplete**.*

Memlog #68:
> **PRD DRAFT COMPLETE**: Document Purpose, Vision, Jobs To Be Done, **NFRs 5.3-5.8 (performance, availability, data protection incl. no-dark-patterns, legal posture, records, accessibility)** and the full Scope Boundary written.

The preamble is a stale in-progress marker. Against §0 line 14 — *"Anywhere this document is silent or vague, an agent downstream will decide for itself, and that decision will be nobody's"* — it is worse than stale: it is a standing invitation for an autonomous agent to invent NFRs, in the section that contains the **legal posture** (§5.6) and **data protection** (§5.5). Delete the clause.

---

**[HIGH] C-13. NFR 5.1 references Vendor "package descriptions"; §7.3 and memlog #59 exclude packages entirely.**

Memlog #59:
> PACKAGES AND BUNDLES ARE OUT — **NEITHER kind** … No vendor-authored multi-service packages, no platform-assembled bundles.

§7.3 line 1110: *"Excluded: … platform-assembled multi-vendor bundles, **vendor-authored multi-service packages**…"*

NFR 5.1 line 978:
> - **Content is stored and shown exactly as the person wrote it** — a Vendor's Rules, Commitments and **package descriptions**, a family's review …

An agent reading §5.1 will build a `package_description` field on the Listing. Fix: replace with "inclusions" or "Listing descriptions".

---

**[HIGH] C-14. FR-11 auto-sizes the caterer's order from RSVP data; §7.6 and memlog #60 forbid exactly that.**

FR-11 line 302:
> - Confirmed RSVP counts update the Function's headcount **automatically**, and **that headcount is what travels with an Enquiry to a caterer or a venue**. The family is never asked to recount.

§7.6 line 1128:
> Excluded: … **sizing an order from guest data without the family deciding**.

Memlog #60: *"the platform does NOT … size the order from RSVP data. It may surface the relevant guest count as **context**; **the family decides quantity**."*

The headcount that travels to a caterer *is* the order size. FR-11 makes it automatic and explicitly removes the family from the loop ("never asked to recount"), which is the one thing memlog #60 preserved. This is defensible as a cognitive-load win (memlog #30) but it directly contradicts a later, more specific decision and its own §7. **Fix: FR-11 should surface the derived count and require the family to confirm it before it travels with an Enquiry.**

---

**[HIGH] C-15. FR-53 and FR-43 say nothing is ever destroyed or altered; NFR 5.5 grants an erasure and correction right.**

- FR-53 line 805: "**Nothing belonging to the Vendor is destroyed.** Listings, portfolio, calendar, Enquiry history, Lead Dashboard and Reviews are retained…"
- FR-53 line 806 / FR-60 line 882: "Reviews already published … remain published. A Vendor cannot erase their record by ceasing to pay."
- FR-43 line 687: "Neither party, nor Admin, **can alter an Agreement after the fact**."
- FR-61 line 897: Admin actions "**cannot be erased**".

Against NFR 5.5 line 1011:
> - Every person whose data is held can see it, **correct it, and have it erased**, including people who never held an account.

These are irreconcilable as written. The resolution is standard (erasure yields to a legal-obligation or legitimate-purpose retention basis — Agreements under FR-43's eight years, Reviews as published expression), but the PRD asserts both absolutes and adjudicates neither. Given §0's decision-closure standard, a downstream agent will implement whichever it reads last. **Fix: qualify NFR 5.5's erasure right with the retention categories, explicitly.**

---

**[MEDIUM] C-16. Two memlog items flagged for veto were written in as settled and never ratified.**

- Memlog #32: *"NOTE: per-Block individual adjustment included **by inference, flagged to Abhishek for veto**."* → written as FR-9 line 283 ("The family can adjust an individual Candidate Block…") with no marker that it is unratified.
- Memlog #47: *"**INFERRED AND FLAGGED**: a named Vendor must ACCEPT the association before publication."* → written as FR-25 line 479 ("**A named Vendor must accept the association before it is published.**") in bold, as settled.

Both are good calls. Neither has an "Abhishek confirmed" entry anywhere in the 68. They are now indistinguishable from ratified decisions. Low build risk, real governance risk.

---

## 6. Journey-to-FR coverage

Walked all 25 "Confirmed constraints" bullets across UJ-1 (7), UJ-2 (6) and UJ-3 (11), plus the cross-journey dependency at line 114.

### UJ-1 — 6 of 7 covered

| # | Line | Constraint | FR |
|---|---|---|---|
| 1 | 81 | Shape stated once; one Candidate Block per Anchor Date by shifting | FR-9 ✅ |
| 2 | 82 | Several days and Slots; each Function holds its own; nothing guessed | FR-9 ✅ (line 282 "Nothing about the arrangement is inferred") |
| 3 | 83 | Candidate Block whole-or-nothing; matching across every day+Slot per Service | FR-13 ✅ |
| 4 | 84 | Blocks stated once at Wedding level; availability pre-applied, never re-applied per Service | FR-13 line 336, FR-18 line 403 ✅ |
| 5 | 85 | Budget is a **portfolio-level** running constraint, **not a per-Vendor filter** | FR-8 ✅ — but see **J-2** |
| 6 | 86 | **Services are selected at the Wedding level before browsing** | ❌ **NO FR — see C-3** |
| 7 | 87 | Chosen Block is the **output** of cross-Service matching; Candidate Blocks the input | FR-13, FR-15, FR-16 ✅ |

---

**[CRITICAL] C-3 / J-1. UJ-1 constraint 6 — "Services are selected at the Wedding level" — has no FR, and the Wedding object has no place to hold them.**

The constraint, line 86:
> - **Services are selected at the Wedding level before browsing**, rather than discovered category by category.

It is load-bearing in at least three other places:

- UJ-1 path step 3, line 72: "**Selects the Services the wedding needs**: Venue, Catering, Photography, Décor & Mandap, Band Baaja Baraat."
- §4.4 description, line 389: "Discovery here is narrow and pre-loaded: **she picked her Services at the Wedding level**, her Block is already applied, her budget is already tracking."
- SM-5 measure, line 1069: "proportion of Weddings where **every Service the family selected** reached an Agreement."

And yet:
- **No FR creates, edits or displays a Wedding-level Service selection.** FR-9 covers Functions. FR-10's single view (line 290) enumerates Functions, Shortlists, Enquiries, running total and Chosen Block — no Services. FR-18 begins *inside* a Service with no FR saying how the family got there.
- **The Glossary's Wedding entry (line 147) does not list Services** among what a Wedding holds — Functions, Candidate Blocks, Chosen Block, Shortlists and Agreements, but not Services.

So the premise on which the whole of §4.4 rests, and the denominator of SM-5, exist only in prose. A downstream agent will build category-by-category discovery — the exact pattern line 86 rejects — because nothing normative says otherwise. **Fix: add an FR to §4.2 (Wedding-level Service selection, drives which Shortlists exist and what Block matching runs across) and add `Services` to the Glossary's Wedding entry.**

---

**[MEDIUM] J-2. UJ-1 constraint 5 says budget is "not a per-Vendor filter"; FR-18 offers budget as a filter.**

Line 85: "Budget is a **portfolio-level running constraint** across all Services, **not a per-Vendor filter**."
FR-18 line 401: "**Filters cover budget**, the Service's own sizing attribute (capacity, headcount, quantity), rating and verified status."

Reconcilable — a per-Service price filter is not the same thing as the portfolio constraint, and both are useful — but the PRD never says so, and the constraint's phrasing reads as a prohibition. One clarifying clause in FR-18 closes it.

### UJ-2 — 6 of 6 covered ✅

| # | Line | Constraint | FR |
|---|---|---|---|
| 1 | 107 | One login per vendor account; multi-user roles out | FR-3 ✅, §7.8 ✅ |
| 2 | 108 | Venue = many bookable spaces, independent capacity/pricing/calendar; slot-based | FR-23 ✅, FR-28 ✅ |
| 3 | 109 | Rules a condition of listing, same force as all-in pricing | FR-24 line 467 ✅, FR-59 ✅ |
| 4 | 110 | Enquiries qualified, carrying Wedding context | FR-34 ✅ |
| 5 | 111 | WhatsApp primary; portal phone-first | FR-29 line 554, FR-35 line 602, FR-53 line 802 ✅; NFR 5.2 ✅ |
| 6 | 112 | Platform never asserts availability as fact | FR-13 line 339, FR-19 line 413, FR-29 line 556, NFR 5.6 line 1024 ✅ (four-place reinforcement — exemplary) |

**Cross-journey dependency (line 114)** — "The nudge mechanism is the sole safeguard for dates agreed away from the platform" — realised by FR-29 and correctly bounded by UJ-3 line 140 and FR-28 line 544. ✅

### UJ-3 — 10 of 11 covered

| # | Line | Constraint | FR |
|---|---|---|---|
| 1 | 133 | Agreement is a record, not an instrument; no mediation, no fault, no liability | FR-41 ✅ — **but see C-11**, FR-47 reopens it |
| 2 | 134 | Requires confirmation from both sides | FR-39 ✅ |
| 3 | 135 | Review rights flow from the Agreement and nothing else | FR-44 ✅ |
| 4 | 136 | Two-way, double-blind, asymmetric in form | FR-46, FR-47, FR-48 ✅ — **but FR-47 adds a fourth question, see C-11** |
| 5 | 137 | Reviews publish when the window closes regardless | FR-48 line 749 ✅ |
| 6 | 138 | Window opens on Delivery; late delivery cannot hold it shut | FR-45 ✅ — **but the committed date has no source, see C-2** |
| 7 | 139 | Cancelled Agreement unlocks no reviews; cancellation a countable fact | FR-42, FR-44 line 709 ✅ |
| 8 | 140 | Agreement auto-blocks the calendar Slot | FR-28 line 544, FR-40 line 656 ✅ |
| 9 | 141 | Money never touches the platform | FR-41 line 668, §7.1, NFR 5.6 ✅ |
| 10 | 138 | "the published delivery timeline … load-bearing rather than decorative" | ❌ **no FR requires a published delivery timeline — C-2** |
| 11 | 124 (path) | Both sides can download a copy | FR-40 line 659 ✅ |

---

## 7. NFR vs FR conflicts

---

**[CRITICAL] C-1 / P-1. FR-4 and FR-61 give Admin unrestricted power; FR-43 and FR-46 explicitly restrict Admin.**

FR-4 line 219: "**No action in the platform is unavailable to Admin.**"
FR-61 line 895: "**No capability in the platform is unavailable to an Admin user.**"

Against:

FR-43 line 687: "The confirmed terms are frozen at confirmation. Neither party, **nor Admin**, can alter an Agreement after the fact."
FR-61 line 897 (self-limiting): Admin actions "**cannot be erased**."
FR-46 line 728: "**Reviews are never edited, reordered by sentiment, or selectively published.**"
NFR 5.7 line 1029: records are "**not silently alterable**".

FR-4 and FR-61 are stated as absolutes and are false as stated. The intent is clear and correct — memlog #22 ("no role granularity, no restricted admin tiers"), memlog #18 (Admin removal for fraud) — Admin has no *scoped roles*, which is a different claim from having no *limits*. But an agent implementing a permission model from FR-4's sentence will grant Agreement mutation and review editing. **Fix: "No capability is withheld from Admin by role. The integrity constraints in FR-43, FR-46 and NFR 5.7 bind Admin as they bind everyone."**

---

**[HIGH] P-2. FR-40 promises "four consequences and no others" and then lists five.**

FR-40 line 652:
> Confirmation has **four consequences and no others**. Realizes UJ-2, UJ-3.

Consequences, lines 655–659:
1. "The Agreement is **timestamped** and recorded against both parties."
2. "The relevant **Slots or span are blocked** on the Vendor's calendar automatically…"
3. "The engagement appears as committed in the family's Workspace, and its agreed figure replaces the estimate in the running budget."
4. "It becomes the **sole gate** for Review rights on both sides, once Delivery is reached."
5. "Both parties can download a copy at any time."

**Five.** The "and no others" clause is a closed-world assertion — it invites a downstream agent to reconcile the count by dropping one, and #5 (downloadability, which UJ-3 path step 4 line 124 explicitly requires) is the likeliest casualty. Fix: say "five", or fold #5 into #1.

---

**[HIGH] P-3. §7.2 excludes "any complaint pipeline that leads to a consequence"; FR-63 builds one.**

§7.2 line 1102: "Excluded: dispute mediation, adjudication of fault, **any complaint pipeline that leads to a consequence**, vendor standing scores, and delisting for poor service."

FR-63 lines 913–916:
> - **Complaints are acknowledged and disposed of within the periods required of an intermediary.**
> - Content identified as unlawful is **removed** within the required period…
> - Every removal is logged with its ground, its authority and the Admin user who acted.

A grievance mechanism that removes content is, verbatim, a complaint pipeline that leads to a consequence. The distinction intended — §7.2 means *service-quality* complaints, FR-63 means *unlawful-content* grievances — is correct and legally necessary, but the PRD never draws it. Line 1104 gets close ("Service quality is answered by Reviews alone") without naming the carve-out. **Fix: §7.2 → "any complaint pipeline **about service quality** that leads to a consequence. The intermediary grievance mechanism in FR-63 is separate and mandatory."** This matters because an over-literal agent may decline to build FR-63 — which is a statutory obligation, not a product choice.

---

**[MEDIUM] P-4. FR-39 has the platform prescribing the Agreement's term fields; NFR 5.6 says the platform "authors no terms".**

NFR 5.6 line 1021: "It takes no commission, holds no money, **authors no terms**, offers no assurance, and mediates no dispute. **Each of those is a line that, if crossed, moves liability onto the platform.**"
FR-41 line 669: "The platform authors no default terms. Every term in an Agreement comes from the Vendor's own proposal."

FR-39 line 645:
> - A Vendor **proposes terms from the Enquiry thread: the days and Slots, the Space or offering, the guest count, the all-in price, what is included, and the Rules that apply.**

Prescribing the *schema* of an agreement is not the same as authoring its *content*, and memlog #49's named killers are "platform-authored **default** terms" — defaults, not fields. So this is very likely fine. But memlog #49 records that Indian decisions "expressly overrode T&C disclaimers", and the distinction between structuring and authoring is exactly the kind an adversarial reading collapses. One sentence in FR-39 ("The platform supplies the structure; every value is the Vendor's") removes the ambiguity at zero cost.

---

**[MEDIUM] P-5. NFR 5.5 requires guest data be "erased once the purpose is exhausted"; FR-11 keeps a per-Function guest list with RSVP state indefinitely.**

NFR 5.5 line 1010: guest contact details "are **erased once the purpose is exhausted**."
FR-11 lines 299–302: guests "brought in in bulk from the family's own contacts", "attached per Function", "Each guest carries an RSVP state per Function", and confirmed counts drive the headcount that travels with Enquiries.

The Workspace guest list is part of the Wedding record and has no stated lifecycle. When is the purpose exhausted — at RSVP close, at the wedding, at the eight-year Agreement horizon? FR-11 does not say and NFR 5.5 assumes an answer. Related: FR-12 line 315 states the use limitation but not the erasure obligation, so an agent reading only §4.2 will miss it.

---

**[MEDIUM] P-6. NFR 5.8 scopes WCAG 2.1 AA to "family-facing surfaces", excluding the RSVP page — the platform's largest public surface.**

NFR 5.8 line 1035: "**Family-facing** surfaces meet WCAG 2.1 AA."

FR-12 line 311 describes the RSVP page as "**the platform's principal surface in front of guests**" — roughly 600 guests per wedding (memlog #53), none of whom are the family, and SM-6 makes it the sole growth channel. It is neither family-facing, vendor-facing nor Admin-facing, so it falls outside the accessibility NFR by construction. The Vendor portal is likewise excluded despite being phone-first by design (NFR 5.2).

---

**[LOW] P-7. FR-12's copy drifts from NFR 5.5's on the same guarantee.**

FR-12 line 315: "Guest contact details are used to compose **that wedding's** invitations and for nothing else."
NFR 5.5 line 1010: "Guest contact details are used to compose **that Wedding's** invitations and for nothing else."

Same sentence, different capitalisation of a Glossary term, in the document's most sensitive data-protection commitment.

---

## 8. Low-severity residue

| # | Sev | Location | Finding |
|---|---|---|---|
| L-1 | LOW | frontmatter lines 3, 5 | `status: draft`, `updated: 2026-09-03`. Memlog is `updated: 2026-09-05T17:36` and memlog #68 declares the draft complete; line 10 itself says "on 2026-09-03/05". |
| L-2 | LOW | memlog #68 | "1157 lines" — the file is 1154. |
| L-3 | LOW | line 214 | FR-4's title "Admin can do anything" is informal for a chain-top artifact and, per **C-1/P-1**, inaccurate. |
| L-4 | LOW | line 1112 | "**A family assembles her own set.**" — number/pronoun disagreement; also line 389 "she picked her Services" personalises a normative statement. |
| L-5 | LOW | lines 26, 129 | Banned-word prose leaks ("booked", "double-books") — see B-2, B-3. |
| L-6 | LOW | line 1094 | Banned words inside an exclusion list; defensible but needs a carve-out note for automated sweeps — see B-4. |
| L-7 | LOW | line 969 | See **C-12** — the same clause also makes §5 the only top-level section without a settled status. |
| L-8 | LOW | line 385, §7.7 | The auspicious-date deferral is stated twice with slightly different scope ("It is deferred and not built" vs "The option is presented; the path is not built"). Consistent, but two sources of truth for one deferral. |

---

## 9. What is right, and worth protecting

Recorded so no revision undoes it:

- **FR ID integrity is perfect** — 67 IDs, no duplicates, no gaps, and the global-numbering rationale in §0 line 18 is exactly why FR-32/FR-33 sitting out of order is harmless.
- **The non-party posture is enforced in depth**, not asserted once: FR-41, NFR 5.6, §7.1, §7.2, §7.3 and the Glossary's Agreement entry all restate it in compatible terms, and memlog #49's regulatory findings are visible in every one. FR-47 (C-11) is the single breach.
- **"Availability is never asserted as fact"** is reinforced in four independent places (FR-13, FR-19, FR-29, NFR 5.6) plus UJ-2's constraint — the strongest-held invariant in the document.
- **Every one of the 68 memlog entries was traceable into the PRD or explicitly scoped out of it** (memlog #27's build order is correctly excluded as epics-layer content; memlog #15's scope tension is correctly dissolved by #23). 52 land cleanly.
- **The banned "v1 / MVP / Phase N" vocabulary is genuinely absent** from the body despite the memlog using it freely throughout — a hard discipline to hold across 1154 lines.

---

## 10. Recommended fix order

**Before any downstream agent reads this document:**

1. **C-3** — write the missing Wedding-level Service selection FR; add `Services` to the Glossary Wedding entry.
2. **C-2** — add the Commitment (delivery timeline) to FR-59's conditions of listing; make FR-45 cite it.
3. **C-11** — delete "whether payment terms were met" and "can dispute an entry with Admin" from FR-47.
4. **C-12** — delete "the section is incomplete" from §5.
5. **G-1** — Glossary `Wedding`: `city` → `place`.
6. **C-1/P-1** — rewrite FR-4 and FR-61 to say "no role restriction" rather than "no limit".
7. **G-2/B-1** — sweep "bookable" out of §3, §4.5 and UJ-2.

**Before architecture:** C-4, C-5 (engagement models vs shapes E/F), G-3 (couple/family), C-14 (FR-11 vs §7.6), C-15 (retention vs erasure), P-2 (FR-40's count), P-3 (§7.2 vs FR-63).

**Before epics:** C-6, C-7, C-8, C-9, C-10, and the Glossary additions in M-12.
