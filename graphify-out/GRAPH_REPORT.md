# Graph Report - vivsth  (2026-09-06)

## Corpus Check
- Large corpus: 1220 files · ~1,963,322 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 866 nodes · 1453 edges · 47 communities (43 shown, 3 thin omitted)
- Extraction: 86% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 195 edges (avg confidence: 0.86)
- Token cost: 504,713 input · 0 output

## Community Hubs (Navigation)
- PRD Quality Review Findings
- Coding Standards Rules
- Prototype Data Layer
- Vendor-Web Build Config
- Architecture Spine Template
- Agreement & Engagement Glossary
- Mobile Home Screen
- Vendor Subscription Economics
- PRD Feature Groups
- Themed UI Primitives
- Indian Regulatory Compliance
- Expo Dependencies
- Expo App Config
- Mobile Package Manifest
- Autonomous Readiness Reviews
- Static Site Prototype Pages
- PRD Decision Memlog
- Vendor-Web TypeScript Config
- Shared Package Manifest
- Tab Navigation & Theming
- Backend Architecture Decisions
- Guest Invitation Growth Loop
- Dates & Availability Matching
- PRD Consistency Audits
- Shared TypeScript Config
- Scope Document & MVP Cut
- Service Engine Taxonomy
- Frozen Service Pain Points
- Enforcement Gates & Deferred Work
- Root Workspace Manifest
- Web Tab Components
- Service Marketplace & Frappe Model
- Frappe v2 API Contract
- Money Units & Lead Revenue
- Reset Project Script
- Repository Topology
- Mobile NPM Scripts
- Animated Icon Web Variant
- Mobile TypeScript Config
- Trust Spine & Reviews
- Agent Instruction Files
- Metro Bundler Config
- Dev Dependencies
- NativeWind Type Declarations
- ESLint Config
- PostCSS Config

## God Nodes (most connected - your core abstractions)
1. `Vivah Spot PRD` - 77 edges
2. `Glossary (binding vocabulary)` - 49 edges
3. `Code Hygiene for Machine Authors` - 36 edges
4. `Vivah Spot PRD Decision Memlog` - 31 edges
5. `Vivah Spot — Competitive & Category Landscape Research` - 25 edges
6. `Vivah Spot — India Legal & Regulatory Research` - 19 edges
7. `react-native` - 16 edges
8. `compilerOptions` - 16 edges
9. `PRD Quality Review — Vivah Spot` - 15 edges
10. `expo` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Category listing page (?cat= / ?q= with sort, speciality filter, empty state)` --semantically_similar_to--> `Customer application scope (free to use, phone/OTP, discovery, compare, enquiry)`  [INFERRED] [semantically similar]
  category.html → _bmad-output/planning-artifacts/VivahSpot-Scope-Document.md
- `Inspiration gallery page (lightbox, category-tagged looks)` --semantically_similar_to--> `Décor pain points (Pinterest vs reality, hidden costs, fake flowers, venue misfit)`  [INFERRED] [semantically similar]
  inspiration.html → _bmad-output/brainstorming/brainstorming-session-2026-06-02-0603.md
- `Budget Planner page (guest count, budget split, per-service recommendations)` --semantically_similar_to--> `Wedding Workspace (the hassle-free layer and customer-side moat)`  [INFERRED] [semantically similar]
  budget.html → _bmad-output/planning-artifacts/VivahSpot-Scope-Document.md
- `Category listing page (?cat= / ?q= with sort, speciality filter, empty state)` --semantically_similar_to--> `search_listings() seam (MariaDB now, Meilisearch/Typesense swap as one file)`  [INFERRED] [semantically similar]
  category.html → _bmad-output/planning-artifacts/VivahSpot-Tech-Stack.md
- `Compare page (side-by-side vendor comparison from the compare tray)` --semantically_similar_to--> `Venue pain points (hidden charges, forced vendors, misleading photos, inflated capacity)`  [INFERRED] [semantically similar]
  compare.html → _bmad-output/brainstorming/brainstorming-session-2026-06-02-0603.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Static localStorage-only prototype surface** — index_home_page, category_listing_page, vendor_detail_page, compare_page, budget_planner_page, inspiration_gallery_page, readme_mock_data_layer, readme_localstorage_persistence, readme_img_base_convention [EXTRACTED 1.00]
- **The five frozen service specifications** — _bmad_output_brainstorming_brainstorming_session_2026_06_02_0603_frozen_venue, _bmad_output_brainstorming_brainstorming_session_2026_06_02_0603_frozen_catering, _bmad_output_brainstorming_brainstorming_session_2026_06_02_0603_frozen_photography, _bmad_output_brainstorming_brainstorming_session_2026_06_02_0603_frozen_decor_mandap, _bmad_output_brainstorming_brainstorming_session_2026_06_02_0603_frozen_band_baaja_baraat, _bmad_output_planning_artifacts_vivahspot_scope_document_frozen_service_specifications [EXTRACTED 1.00]
- **Quality-gate reality: typecheck is the only working gate** — claude_enforcement_scorecard, deferred_d1_vendor_web_lint_crash, deferred_d2_set_state_in_effect, deferred_d5_no_commit_gate, deferred_d6_backend_no_gate, _bmad_output_party_mode_memories_installed__memlog_gate_verification_findings, _bmad_output_planning_artifacts_architecture_architecture_vivahspot_2026_09_06__memlog_enforcement_reality [INFERRED 0.85]
- **The Trust Spine — what stands in for money the platform never holds** — _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_verification, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_commitment, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_rules, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_review, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_agreement, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_7_1_money [INFERRED 0.85]
- **Cross-Service Block Matching — the hardest feature in the product** — _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_anchor_date, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_candidate_block, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_chosen_block, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_slot, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_span, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_function, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_fr_9, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_prd_fr_15 [EXTRACTED 1.00]
- **The Enforcement Ladder — every MUST needs a tier-1 or tier-2 home** — _bmad_output_planning_artifacts_architecture_coding_standards_enforcement_ladder, _bmad_output_planning_artifacts_architecture_coding_standards_uh_10, _bmad_output_planning_artifacts_architecture_coding_standards_uh_11, _bmad_output_planning_artifacts_architecture_coding_standards_uh_14, _bmad_output_planning_artifacts_architecture_coding_standards_uh_17, _bmad_output_planning_artifacts_architecture_coding_standards_uh_18, _bmad_output_planning_artifacts_architecture_coding_standards_cl_4, _bmad_output_planning_artifacts_architecture_coding_standards_cl_6, _bmad_output_planning_artifacts_architecture_coding_standards_hygiene_gate_sh [EXTRACTED 1.00]
- **The seven service shapes and the four-axis engine that covers them** — _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_service_shapes_analysis_shape_a_booked_space, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_service_shapes_analysis_shape_b_booked_crew, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_service_shapes_analysis_shape_c_per_head_consumables, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_service_shapes_analysis_shape_d_built_installations, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_service_shapes_analysis_shape_e_rented_goods, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_service_shapes_analysis_shape_f_produced_goods, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_service_shapes_analysis_shape_g_post_event_deliverables, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_service_shapes_analysis_shape_h_advisory_professional, _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_service_shapes_analysis_four_axis_engine [EXTRACTED 1.00]
- **Password show/hide toggle hand-copied into three prototype pages** — account_login_pw_toggle, account_register_pw_toggle, vendor_vendor_signup_pw_toggle [INFERRED 0.85]
- **Prototype surfaces carrying the vocabulary and money model the PRD §7.9 bans** — _bmad_output_planning_artifacts_prds_prd_vivahspot_2026_09_03_review_rubric_prototype_vocabulary_ban, account_bookings_bookings_screen, account_profile_account_screen, vendor_dashboard_booking_requests_panel, vendor_vendor_signup_bank_details [INFERRED 0.85]

## Communities (47 total, 3 thin omitted)

### Community 0 - "PRD Quality Review Findings"
Cohesion: 0.06
Nodes (56): Commitment — Glossary Term With No Requirement, Empty Permitted Vendor Set Under a Venue Rule, FR-47 Dispute Route Conflicts With the §7.2 Exclusion, Glossary couple/family Ownership Drift, Guest RSVP Growth Channel Without a Protagonist, No Glossary Entry for Any Actor or Role, Admin Surface With Eight FRs and No User Journey, No Security or Authentication Requirement Anywhere (+48 more)

### Community 1 - "Coding Standards Rules"
Cohesion: 0.07
Nodes (54): The Abstraction Asymmetry, AHA — Avoid Hasty Abstractions, Appendix A — The Compressed Form, CL-1 A correction that only exists in the chat did not happen, CL-10 Security-critical code is read line by line by a person, CL-11 The commit message is the only surviving witness, CL-12 Deliberate seams live in a file, not in a TODO comment, CL-2 The instruction file is a prompt, not a manual (+46 more)

### Community 2 - "Prototype Data Layer"
Cohesion: 0.08
Nodes (38): CATEGORIES, VENDORS, VS_SPECIALITIES, vsAddReview(), vsAlsoViewed(), vsBadges(), vsBadgesHTML(), vsBase() (+30 more)

### Community 3 - "Vendor-Web Build Config"
Cohesion: 0.05
Nodes (39): nextConfig, dependencies, next, react, react-dom, @vivahspot/shared, description, devDependencies (+31 more)

### Community 4 - "Architecture Spine Template"
Cohesion: 0.08
Nodes (32): Spine Altitude, Architecture Decision (AD-N), Build Substrate Purpose, Capability to Architecture Map, Consistency Conventions, Decisions Not Rationale, Deferred Decisions, Dependency-Direction Diagram (+24 more)

### Community 5 - "Agreement & Engagement Glossary"
Cohesion: 0.12
Nodes (32): Invited Members Are Advisory Only, Admin, Agreement, Amendment, Board, Chosen Block, Commitment, Contact Reveal (+24 more)

### Community 6 - "Mobile Home Screen"
Cohesion: 0.09
Nodes (18): VendorCard(), badgesFor(), CATEGORIES, Category, formatPrice(), Vendor, VENDORS, { tailwindColors, fonts, radius } (+10 more)

### Community 7 - "Vendor Subscription Economics"
Cohesion: 0.10
Nodes (30): Subscription Per Service, Buys No Territory, 4.7 Enquiries, NFR 5.1 Language, NFR 5.4 Availability, SM-2 Vendors find value for money, Tier, Advance-Payment Disputes — the Indian trust problem, The Attribution Problem (+22 more)

### Community 8 - "PRD Feature Groups"
Cohesion: 0.10
Nodes (30): 4.11 Lead Dashboard, 4.12 Trust & Verification, 4.13 Admin Console, 4.14 Real Weddings & Inspiration, 4.1 Accounts & Access, 4.5 Vendor Listings, 4.6 Vendor Calendar, 4.8 Agreements (+22 more)

### Community 9 - "Themed UI Primitives"
Cohesion: 0.17
Nodes (21): styles, TabTwoScreen(), HintRowProps, styles, styles, ThemedText(), ThemedTextProps, ThemedView() (+13 more)

### Community 10 - "Indian Regulatory Compliance"
Cohesion: 0.11
Nodes (28): Organic Ranking Design, Paid Placement Labelled and Separated, 4.10 Subscription & Billing, 4.4 Discovery & Comparison, FR-20 Paid placement is visibly separate from merit, Bharatiya Sakshya Adhiniyam 2023, CCPA Guidelines on Dark Patterns, 2023, Consolidated PRD Requirements R1–R81 (+20 more)

### Community 11 - "Expo Dependencies"
Cohesion: 0.07
Nodes (27): dependencies, expo, expo-constants, expo-device, expo-font, expo-glass-effect, expo-image, expo-linking (+19 more)

### Community 12 - "Expo App Config"
Cohesion: 0.08
Nodes (25): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, reactCompiler (+17 more)

### Community 13 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (25): description, react, react-dom, tailwindcss, @types/react, typescript, @vivahspot/shared, main (+17 more)

### Community 14 - "Autonomous Readiness Reviews"
Cohesion: 0.10
Nodes (25): Evasive Repair, False Success, From Confident Closing to Silent Failure, SpecBench — Reward Hacking in Long-Horizon Coding Agents, A Fix That Stops Short of the Requirements It Disturbs, Minimum Set to Reach Safe, Autonomous-Readiness Review 2, What Is Architecture-Layer and Must Not Count Against the PRD (+17 more)

### Community 15 - "Static Site Prototype Pages"
Cohesion: 0.21
Nodes (23): 404 Not Found Page, Mobile package set (expo-router, nativewind, TanStack Query, zustand, MMKV, FlashList, i18next), React Native + Expo over Flutter (no Mac in the toolchain, skill transfer, OTA updates), Budget Planner page (guest count, budget split, per-service recommendations), Category listing page (?cat= / ?q= with sort, speciality filter, empty state), Vivah Spot UI Prototype Change History, v0.5.0 — Multi-page prototype (mock data + localStorage), v0.6.0 — Desktop web-view layout (document scroll above 1024px) (+15 more)

### Community 16 - "PRD Decision Memlog"
Cohesion: 0.14
Nodes (21): Agreement as a Record, Not an Instrument, Asymmetric Double-Blind Review Model, Wedding as a Block of Days, Build Order — Vendor Portal and Admin First, Client Mandate from Pravin, Delivery-Gated Review Window, Vivah Spot PRD Decision Memlog, No Delisting for Service Quality (+13 more)

### Community 17 - "Vendor-Web TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 18 - "Shared Package Manifest"
Cohesion: 0.11
Nodes (17): dependencies, zod, description, devDependencies, typescript, exports, ./tokens, ./tokens.css (+9 more)

### Community 19 - "Tab Navigation & Theming"
Cohesion: 0.15
Nodes (9): AnimatedSplashOverlay(), glowKeyframe, keyframe, logoKeyframe, styles, AppTabs(), expo-splash-screen, react-native (+1 more)

### Community 20 - "Backend Architecture Decisions"
Cohesion: 0.17
Nodes (15): Availability computed at query time (NOT EXISTS over blocking facts, one server-side function), First-writer-wins enforced by a MariaDB unique constraint, never SELECT-then-INSERT, Shared Listing DocType + per-Service detail DocType with real columns (EAV and JSON rejected), prd.md is chain-top and decision-complete (FR-1..FR-72, binding glossary), Record-scoped access as a spine convention (not RBAC, not a module), Service engine Reading C — per-Service behaviour in code (not config-driven), Service handler interface + registry/dispatch is the load-bearing AD under Reading C, Vocabulary conflict: CLAUDE.md domain nouns vs the PRD glossary (+7 more)

### Community 21 - "Guest Invitation Growth Loop"
Cohesion: 0.18
Nodes (15): Family-Sends Invitation Model, Guest Self-Service Form, Invitation Growth Loop, Minimise the Planner's Cognitive Load, The Stated Guest Count Is Primary, 4.2 Wedding Workspace, FR-11 The stated guest number comes first; the list is optional, FR-12 The Family sends the invitations; replies come back to the platform (+7 more)

### Community 22 - "Dates & Availability Matching"
Cohesion: 0.19
Nodes (15): Geography as a Hierarchy of Places, The Selection Object, 4.3 Dates & Availability Matching, 7.10 Assumptions Index (A-1..A-5), Anchor Date, Candidate Block, FR-15 Collisions are shown, never silently resolved, FR-9 The shape of the wedding is stated once (+7 more)

### Community 23 - "PRD Consistency Audits"
Cohesion: 0.13
Nodes (15): 7.9 Vocabulary That Must Not Appear, Consistency Re-Audit (round 2), Selection Added, Budget FRs Not Updated, FR-ID Continuity Verified Clean, Consistency Audit — Round 3, Banned-Vocabulary Violations, Cross-Reference and FR-ID Integrity, Divergence Register — memlog vs PRD (+7 more)

### Community 24 - "Shared TypeScript Config"
Cohesion: 0.13
Nodes (14): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, lib, module (+6 more)

### Community 25 - "Scope Document & MVP Cut"
Cohesion: 0.18
Nodes (14): Stale-input conflict: Tech-Stack contradicts the PRD in five places, Admin / Operations panel scope (verification, billing, catalog, moderation, reports), Customer application scope (free to use, phone/OTP, discovery, compare, enquiry), v2.0 revision — commission/escrow model replaced (no fund custody, no RBI PA exposure), Founding Vendor (₹0) tier for the launch cohort, Out of scope — any handling of booking payments between couples and vendors, Phase 1 MVP — Shrirampur single-city launch, Trust spine (vetting, verified portfolios, all-in pricing, published commitments, delisting) (+6 more)

### Community 26 - "Service Engine Taxonomy"
Cohesion: 0.21
Nodes (14): Full Configurable ~50-Service Catalog Bet, Seven-Shape Service Taxonomy, Span Engagement Dissolves the Setup/Teardown Collision, The Five Frozen Services, Service Engine — the 10-part blueprint, Engagement Model, FR-14 A Service declares how it is engaged, FR-62 The catalog is configured, not built (+6 more)

### Community 27 - "Frozen Service Pain Points"
Cohesion: 0.22
Nodes (13): Band Baaja Baraat pain points (on-the-spot cash demands, unruly crews, no-shows), Catering pain points (shortage, waste, headcount gamble, hidden per-plate inflation), Décor pain points (Pinterest vs reality, hidden costs, fake flowers, venue misfit), Escrow-backed guarantees (token via escrow, on-time delivery, on-time setup, no-demands) — superseded, Frozen Service #5 — Band Baaja Baraat, Frozen Service #2 — Catering, Frozen Service #4 — Décor & Mandap, Frozen Service #3 — Photography (photo + video bundled) (+5 more)

### Community 28 - "Enforcement Gates & Deferred Work"
Cohesion: 0.27
Nodes (13): Party verdict: coding-standards.md transfer failed (ideas mainstream, encoding bespoke), Gate verification findings (two real lint breaks, expo lint dependency drift), Architecture spine run (coaching path, spine-only deliverable), Enforcement reality: every AD must name its enforcement tier or be marked unenforced-today, Enforcement scorecard: typecheck is the only working gate, Never swallow an error (no empty catch, no as any, no @ts-ignore), Working rules (report only what was observed; deferred seams go in DEFERRED.md, never a TODO), D-1 · npm run lint crashes in vendor-web (eslint 10.9.1 vs eslint-plugin-react 7.37.5) (+5 more)

### Community 29 - "Root Workspace Manifest"
Cohesion: 0.15
Nodes (12): description, engines, node, name, private, scripts, lint, mobile (+4 more)

### Community 30 - "Web Tab Components"
Cohesion: 0.20
Nodes (6): styles, ExternalLink(), Props, MaxContentWidth, expo-router, expo-web-browser

### Community 31 - "Service Marketplace & Frappe Model"
Cohesion: 0.22
Nodes (10): Service handling models (in-house / managed vendor / marketplace / add-on partner), End-to-end wedding service map (~50 services across the lifecycle), Adopted: persisted computed fields on the Frappe backend settles budget/rating/lead counters, Paradigm: document-centric core behind a versioned RPC facade (four one-way layers), Service Engine 10-part blueprint (one engine × N services, configured not re-built), Service Marketplace layer (~50+ service modules attached per function), Frappe Framework v16 backend + Desk admin (DocType model is the service engine), User media on Cloudflare R2/S3 + CDN, never Frappe's file store (+2 more)

### Community 32 - "Frappe v2 API Contract"
Cohesion: 0.28
Nodes (9): Inherited locked stack (Frappe v16, MariaDB, Expo, Next.js, R2, Razorpay, WhatsApp, phone+OTP), Naming wart: the contract is called mobile.v1 but both clients call it, Frappe HTTP API v2 surface (document, method RPC, count, bulk), Maps: evaluate Mappls / Ola Maps over Google Maps (Indian POI data, USD billing), Stack decisions at a glance (Expo, Next.js, Frappe Desk, MariaDB, R2, Razorpay, MSG91), WhatsApp Business Cloud API primary, SMS fallback, Expo push, Rule: clients call purpose-built mobile.v1 RPC, not the generic document API, Frappe v16 /api/v2 conventions (wrapped data, object filters, limit/start, has_next_page) (+1 more)

### Community 33 - "Money Units & Lead Revenue"
Cohesion: 0.33
Nodes (9): Open spine question: store integer paise, convert once at the display boundary, Vendor lead dashboard (views, contact reveals, enquiries, conversion — the renewal argument), Vendor portal scope (KYC, subscription billing, listings, availability, enquiry inbox), Lead Event table + reveal-contact-on-tap (lead tracking is the revenue engine), Play Store billing trap sidestepped by selling subscriptions on the web portal, Razorpay standard checkout for vendor subscriptions only (ordinary SaaS billing, no Route/escrow), One canonical money unit, converted only at the display boundary, D-3 · Canonical money unit, before Razorpay lands (+1 more)

### Community 34 - "Reset Project Script"
Cohesion: 0.22
Nodes (7): exampleDirPath, fs, oldDirs, path, readline, rl, root

### Community 35 - "Repository Topology"
Cohesion: 0.29
Nodes (8): Repo reality at spine time (monorepo scaffold exists, backend greenfield), Adopted topology: three deployable things, two repos, one shared root, Repository layout (apps/mobile, apps/vendor-web, packages/shared, backend/vivahspot_backend), packages/shared zod schemas mirroring the mobile.v1 API contract, Backend is not in this repo (vivahspot_backend lives in a Frappe bench outside the tree), tokens.js is the single source of truth for colour and type (plain ESM so Tailwind configs can import it), Repo topology: published static site and product monorepo share one root, D-6 · Backend has no gate at all (auth, KYC, payment code uncovered)

### Community 36 - "Mobile NPM Scripts"
Cohesion: 0.25
Nodes (8): scripts, android, ios, lint, reset-project, start, typecheck, web

### Community 37 - "Animated Icon Web Variant"
Cohesion: 0.25
Nodes (5): glowKeyframe, keyframe, logoKeyframe, styles, react-native-reanimated

### Community 38 - "Mobile TypeScript Config"
Cohesion: 0.25
Nodes (7): compilerOptions, paths, strict, extends, include, @/assets/*, expo/tsconfig.base

### Community 39 - "Trust Spine & Reviews"
Cohesion: 0.33
Nodes (7): Fourteen Ratified Thresholds, The Trust Spine, 4.9 Reviews, Delivery, FR-45 The review window opens on Delivery, Review, Trust Built Before the Engagement, Not Enforced During It

### Community 40 - "Agent Instruction Files"
Cohesion: 0.47
Nodes (6): Expo HAS CHANGED — Read the v57.0.0 Versioned Docs First, Mobile CLAUDE.md — single @AGENTS.md include, Unmodified create-expo-app Starter README, This Is NOT the Next.js You Know — auto-regenerated agent rules block, Vendor-web CLAUDE.md — single @AGENTS.md include, Unmodified create-next-app Starter README

### Community 41 - "Metro Bundler Config"
Cohesion: 0.40
Nodes (4): config, { getDefaultConfig }, NOTE: Expo SDK 52+ configures Metro for npm-workspace monorepos automatically —, { withNativeWind }

### Community 42 - "Dev Dependencies"
Cohesion: 0.50
Nodes (4): devDependencies, @expo/ngrok, @types/react, typescript

## Ambiguous Edges - Review These
- `Architecture Spine Template` → `Vivah Spot PRD`  [AMBIGUOUS]
  _bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md · relation: references
- `Design Paradigm` → `Technical and Architectural Addendum Material`  [AMBIGUOUS]
  _bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md · relation: conceptually_related_to
- `Tier-2 hygiene gate (scripts/hygiene-gate.sh)` → `Handover List — obligations that do not belong in a PRD`  [AMBIGUOUS]
  _bmad-output/planning-artifacts/architecture/coding-standards.md · relation: conceptually_related_to
- `Shape C — Per-Head Consumables (headcount lock date)` → `Guest Accommodation and Transport — Shape Unresolved`  [AMBIGUOUS]
  _bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/service-shapes-analysis.md · relation: conceptually_related_to
- `Shape H — Advisory & Professional (no Slot at all)` → `Guest Accommodation and Transport — Shape Unresolved`  [AMBIGUOUS]
  _bmad-output/planning-artifacts/prds/prd-vivahspot-2026-09-03/service-shapes-analysis.md · relation: conceptually_related_to

## Knowledge Gaps
- **256 isolated node(s):** `name`, `slug`, `version`, `orientation`, `icon` (+251 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 302 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Architecture Spine Template` and `Vivah Spot PRD`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Design Paradigm` and `Technical and Architectural Addendum Material`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Tier-2 hygiene gate (scripts/hygiene-gate.sh)` and `Handover List — obligations that do not belong in a PRD`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Shape C — Per-Head Consumables (headcount lock date)` and `Guest Accommodation and Transport — Shape Unresolved`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Shape H — Advisory & Professional (no Slot at all)` and `Guest Accommodation and Transport — Shape Unresolved`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Vivah Spot PRD` connect `PRD Feature Groups` to `Architecture Spine Template`, `Agreement & Engagement Glossary`, `Vendor Subscription Economics`, `Trust Spine & Reviews`, `Indian Regulatory Compliance`, `Autonomous Readiness Reviews`, `PRD Decision Memlog`, `Guest Invitation Growth Loop`, `Dates & Availability Matching`, `PRD Consistency Audits`, `Service Engine Taxonomy`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `Glossary (binding vocabulary)` connect `Agreement & Engagement Glossary` to `Coding Standards Rules`, `Architecture Spine Template`, `Trust Spine & Reviews`, `Vendor Subscription Economics`, `PRD Feature Groups`, `Guest Invitation Growth Loop`, `Dates & Availability Matching`, `PRD Consistency Audits`, `Service Engine Taxonomy`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._