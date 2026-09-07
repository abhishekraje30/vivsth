# Service Shapes — analysis of the full §6 catalog

*Working analysis for the Vivah Spot PRD, 2026-09-05. Question asked: does the §4 ten-part blueprint fit all ~50 Services, or are some a genuinely different shape?*

**Answer: no, it does not fit. There are seven distinct shapes, and three defects in the catalog itself that must be fixed before any of them can be modelled.**

---

## Part 1 — Three defects in the catalog

### Defect 1: §6 mixes Functions with Services

Our Glossary separates **Function** (a ceremony within a Wedding, holding its own day and Slot) from **Service** (a category of provision a Vendor sells). The §6 catalog does not. These entries are Functions, not Services:

> Sakharpuda · Kelvan · Haldi · Mehndi · Sangeet · Devak/Ganesh puja · Reception · Vidaai/Pathavni · Griha Pravesh / Satyanarayan puja

Left as they are, an autonomous build reading §6 creates "Haldi" as a Service *and* as a Function, and neither is right.

**Worse, some are both, under one word.** *Mehndi* is a Function (the ceremony on Thursday morning) **and** a Service (the artist you hire for it). Same for *Sangeet* (the evening) versus *DJ/orchestra* (who you hire). The word collision has to be broken by naming: the Function is `Mehndi`, the Service is `Mehndi Artist`.

### Defect 2: §6 lists platform features as Services

These are things the Workspace itself now provides, not things a Vendor sells:

| §6 entry | Already the platform's |
|---|---|
| Digital invite + RSVP + QR check-in | FR-12 |
| Budget planning | FR-8 |
| Thank-you & gift tracking | guest management, FR-11 |
| Couple's wedding app/website | overlaps the Workspace itself |

*Invitation cards* is genuinely a Vendor Service — someone designs and prints. But *digital invite + RSVP* is FR-12. These compose: the Vendor designs, the platform delivers.

### Defect 3: Gift registry has no model here at all

It implies guests paying money towards something. No money passes through Vivah Spot. Either it is a link out to something else, or it does not exist.

---

## Part 2 — The seven shapes

### Shape A — Booked Space
*Sized by headcount, occupies a Slot, has capacity.*

**Venue** — and only Venue, in its full form.

Distinguishing needs: multiple Spaces per Listing, per-Space capacity and calendar, venue Rules, venue-policy fields that other Services must read.

### Shape B — Booked Crew
*People who arrive for a Slot. No capacity of their own, but finite daily bandwidth.*

Photography · Band Baaja Baraat · DJ/orchestra · Anchor/emcee · Choreographer · Live artists · Makeup & beauty · Saree draping · Mehndi Artist · Guruji/pandit · Hospitality & ushers · Security · Parking & valet · On-ground event management · Pre-wedding shoot

Distinguishing needs: **bandwidth, not capacity** — Dattatray's lawn seats 800; a photographer can shoot two weddings a day and no more. Availability is "how many jobs already taken in this Slot", which Shape A does not express. Several are priced per person served rather than per event (makeup for eight women, ushers for a 600-guest reception).

### Shape C — Per-Head Consumables
*Quantity driven by confirmed headcount, delivered at a Slot.*

Catering · Return gifts (aaher) · Trousseau & gift hampers

Distinguishing needs: price is per plate or per unit, so the total moves with RSVP; a **headcount lock date** before which numbers can change and after which they cannot; minimum order quantities.

### Shape D — Built Installations
*Built at the venue, sized by the venue, and — critically — occupying time outside the Function's Slot.*

Décor & Mandap · Tent & seating · LED/AV/sound · Lighting · Cooling/heating · Power backup · Mobile toilets

Distinguishing needs: **setup and teardown windows that extend beyond the Slot.** A decorator striking the Haldi set and building the mandap overnight occupies the venue in a Slot nobody sold him. This is the single hardest availability problem in the catalog, and it is invisible in the current model. Also venue-aware sizing — these Services must read the venue's dimensions and Rules.

### Shape E — Rented Goods
*An item taken away and returned.*

Jewellery (rental) · Attire — Paithani, sherwani (rental or purchase)

Distinguishing needs: a rental **period** spanning several days rather than a Slot; per-item inventory, since one lehenga is one lehenga; deposits and returns, which are money the platform never sees.

### Shape F — Produced Goods
*Ordered ahead, delivered before the wedding.*

Invitation cards · Album & film printing

Distinguishing needs: **lead time, not Slot availability** — the question is "can you deliver by the 20th", not "are you free on the 27th"; quantity × unit price; proof and approval steps.

### Shape G — Post-Event Deliverables
*Work delivered weeks or months after the wedding.*

Album & film delivery · Social media teaser and reels · Post-event cleaning & waste management

Distinguishing needs: the engagement **completes long after the Block**. This breaks the review model — see Part 3.

### Shape H — Advisory & Professional
*No Slot, no capacity, no headcount. Sometimes no wedding date at all.*

Consultation & planning · Kundali matching & astrology · Muhurat/date (guruji) · Marriage registration assistance · Wedding insurance · Honeymoon planning · Guest accommodation¹ · Guest transport¹

Distinguishing needs: nothing to match on availability, so **the entire date-matching engine is inapplicable**. Discovery is by credential and review, not by calendar.

¹ *Accommodation and transport sit awkwardly here — both are really bulk-quantity purchases across the whole Block (rooms × nights, vehicles × trips) rather than either advisory or Slot-based. They may warrant a shape of their own, or fold into Shape C as per-unit consumables sized by guest count.*

---

## Part 3 — Two model breaks the shapes expose

### Break 1: setup and teardown are invisible (Shape D)

The Slot model assumes a Service occupies the Slot it was hired for. Shape D does not. The decorator needs the venue the night before, and the tent contractor needs the morning after to strike. Today the platform would show that venue as free, sell it, and create a physical collision on the ground — the exact failure the product exists to prevent.

This affects Shape A too, since it is the venue's calendar being consumed by someone else's Service.

### Break 2: the review window opens before the work is done (Shape G)

Reviews unlock when the Block's date passes. A photographer's album arrives three months later, and it is the main thing being paid for. Under the current model Rutuja reviews the photography before she has seen the photographs — and cannot revise it once she has.

Your §6 already promises Photography a *"published delivery timeline, tracked and reviewed."* That promise cannot be kept by a review written on the wedding night.

---

## Part 4 — What this means for the engine

The ten-part blueprint holds as a **spine** — discover, compare, shortlist, enquire, agree, review — for every shape. What varies is not the journey but four things underneath it:

1. **What availability means** — a Slot (A, B, D), a period (E), a lead time (F), or nothing at all (H).
2. **What drives the price** — the space, the event, the head, the unit, the day.
3. **What sizes the order** — capacity, bandwidth, headcount, inventory, or nothing.
4. **When the engagement completes** — at the Slot, or months later.

An engine parameterised on those four axes covers all fifty. An engine that assumes Venue's answers to all four covers one.
