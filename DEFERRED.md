# Deferred work

Decisions and fixes intentionally left open, each naming where it lives. This file exists so that
source carries no `TODO` markers: a `TODO` is ambiguous between "unfinished" and "intentionally left
open", and an agent resolves that ambiguity by helpfully finishing it.

Read before planning. Append when a finding arrives that is real but not what was asked for.

---

## Blocking the quality gate

### D-1 · ~~`npm run lint` crashes in vendor-web~~ — RESOLVED 2026-09-15
`apps/vendor-web` now declares `eslint` `^9.39.5`, matching the root. Waiting was never an option:
`eslint-plugin-react` 7.37.5 is its latest release and supports ESLint up to `^9.7` only. A stale
nested ESLint 10.9.1 survived `npm install` and needed an explicit `npm install -D eslint@9.39.5`.
Playwright tests and generated test output are excluded from both lint and typecheck by decision.

### D-2 · ~~`react-hooks/set-state-in-effect` in the mobile app~~ — RESOLVED 2026-09-15
`apps/mobile/src/hooks/use-color-scheme.web.ts` now reads hydration state through
`useSyncExternalStore` instead of setting it inside an effect. `npm run lint` passes in the mobile app
with no suppression.

## Decisions with a deadline

### D-3 · ~~Canonical money unit~~ — RESOLVED 2026-09-06
Decided in AD-19: money is Frappe `Currency` in rupees everywhere; conversion to integer paise happens
at the Razorpay call and nowhere else; **clients never do money arithmetic** — every total is computed
server-side where Currency is exact decimal. `priceFrom: 85000` in the mocks still means ₹85,000 and
needs no change.

### D-4 · `formatPrice` lives in a mocks file
`apps/mobile/src/mocks/catalog.ts:74` holds the only price formatter, and both web clients will need
the same one. It belongs in `packages/shared` alongside the tokens. **No longer blocked** — D-3 is
resolved, and the input unit is rupees.

## Infrastructure not yet built

### D-5 · No commit gate
No formatter, no CI, no secret scanning, no duplication threshold. `npm run typecheck` and
`npm run lint` work, but nothing runs them automatically, and the end-user suite has no product tests
yet. Highest value first: secret scanning as a pre-commit hook, since MSG91,
Razorpay, WhatsApp and R2 keys are the live exposure and rotation is the only remedy after a push.

### D-6 · Backend has no gate at all
`vivahspot_backend` is a Frappe v16 app outside this repo. Everything in the quality story here is
npm and TypeScript, so auth, KYC and payment code is entirely uncovered. Needs its own linting and
its own decision about where that runs.

## Planning artifacts

### D-7 · ~~`ARCHITECTURE-SPINE.md` is an unfilled template~~ — RESOLVED 2026-09-06
Written: 36 ADs, three review rounds, reports in `reviews/` beside it. Still `status: draft` pending a
fourth gate round. Its **Deferred** section and its **Conflicts to resolve upstream** table are the
live parts — read both before cutting epics.

### D-8 · `coding-standards.md` was copied unadapted from another repo
`_bmad-output/planning-artifacts/architecture/coding-standards.md` is a verbatim copy of ArchDesign's
`docs/code-hygiene.md`. Its Appendix B asserts six things about this repo that are false, all six
resolve in ArchDesign instead. `CLAUDE.md` now carries the adapted, operational subset. Outstanding:
delete Appendix B, move the file out of `_bmad-output/` (a generated-artifacts directory), and decide
whether to keep the essay at all.

Its citations were checked. No source is fabricated, but roughly five of eleven carry a number
borrowed from a neighbouring paper, and one claim is unsupported: the over-engineering and
empty-classes finding attributed to arXiv 2605.01392 does not appear in that paper. Re-point or drop
the numbers in §0 before quoting them anywhere.

### D-9 · ~~`expo lint` silently adds a dependency~~ — RESOLVED 2026-09-15
`eslint-config-expo` `~57.0.2` is now declared in `apps/mobile/package.json`. `expo lint` was run
afterwards with both files backed up and changed neither. Until then the package sat in `node_modules`
undeclared, so an `npm install` pruned it and broke the mobile lint outright.

## From the architecture spine

Each names the AD it belongs to. The spine's own Deferred section carries the reasoning.

### D-10 · Backend hosting is undecided
Frappe Cloud, a self-hosted VPS bench, or containerised `frappe_docker`. Blocks: where CI stands up a
bench for the AD-4 contract generator and for D-6; NFR 5.4 peak-muhurat sizing; FR-43's eight-year
retention and its restore story; observability. The bench needs **Python ≥3.14,<3.15 and Node ≥24** —
stricter than this repo's Node ≥20, and an argument for the containerised option.
**Choose before the first deploy, not by it.**

### D-11 · No rate limiting until production
Deliberate (AD-28, AD-30). Trigger: the first non-test account. Two traps already known — Frappe's
`@rate_limit` keys on `frappe.form_dict.cmd`, which `/api/v2` never sets, so every decorated endpoint
would share one bucket; and it counts per IP while FR-1's limit is per number.

### D-12 · The contract generator is not built
AD-4 makes the annotated Python signature the source and zod generated from it. Build the emitter once
`api/family/v1` has its first three methods — there is nothing to generate from yet.

### D-13 · The banned-vocabulary gate is not built
AD-24. It fails today on the published site: `index.html`, `vendor/` and `account/` still carry
"Book Now", "My Bookings" and a bank-details payout section from the abandoned commission model.
**Real visitors see that now** — it advertises a flow the product will never have.

### D-14 · TypeScript 6 / 7 split forfeits typed linting
`typescript-eslint` declares a peer of `<6.1.0`; vendor-web pins TS 7.0.2. Lands on AD-4's codegen
commit gate. Resolve alongside D-1.

### D-15 · RFC 3161 timestamping for Agreement records
AD-12 ships on server clock plus a hash chain, which satisfies FR-43's "not from a device clock".
External evidential timestamping (eMudhra is the Indian option) is a paid dependency — UH-15, so ask
first. Trigger: the first time an Agreement record is actually needed as evidence.

### D-16 · Two accepted risks, recorded not closed
AD-8 reads Service declarations live, so changing an Engagement Model reinterprets occupancy rows
already written — treat such a change as a data migration, not a config edit. AD-34's no-mandate rule
is review-enforced only; Razorpay ships every recurring method enabled by default, so any
subscription, mandate, autopay or tokenisation call in the payment path is an FR-54 breach.

## From the UX design run

The spine pair at `_bmad-output/planning-artifacts/ux-designs/ux-vivahspot-2026-09-06/` carries its
own Open Questions — five in `DESIGN.md`, thirteen in `EXPERIENCE.md` — each stating what is decided
and what precisely is not. **Those lists are authoritative and are not restated here.** What follows
is only what blocks work, and where to look.

### D-17 · Inknut Antiqua is specified and not installed
`DESIGN.md` sets Devanagari user content in Inknut Antiqua at five weights. There is no font file in
this repo, no `expo-font` load in `apps/mobile`, and `apps/mobile/tailwind.config.js` separately
declares Playfair Display with nothing behind it — so neither face renders on the phone today.
`apps/vendor-web` is the cheap case: it already loads Playfair through `next/font/google`, so Inknut
is a one-line `subsets: ["devanagari", "latin"]` change there. Mobile needs a real file and a load.
**Adding either is a dependency decision and needs an explicit yes.** A five-weight Devanagari family
is not small; a subset may be required for NFR 5.3's target device.

### D-18 · `tokens.js` is the old palette while the PRD points at the new one
NFR 5.10 was amended (`76399ff`) to name `DESIGN.md` the single source of truth for colour and type,
with `packages/shared/src/tokens.js` as its projection. **The projection has never been generated.**
`tokens.js` still carries the placeholder rose-pink palette, so the PRD points at one answer and the
code at another, and `apps/vendor-web/src/app/globals.css` paints from those stale variables today.
Regenerating it is a code change and was not authorised in the UX run.

### D-19 · `apps/mobile/src/constants/theme.ts` is still the Expo starter
Unmodified template palette — `#000000`, `#ffffff`, `#F0F0F3`, `#60646C` — imported by eight live
modules, so `explore.tsx` and both tab bars render off-brand regardless of what any document says. It
also ships a full dark palette the design system does not have, reachable in code and suppressed only
by `app.json`'s `userInterfaceStyle: "light"`.

### D-20 · The amendments did not reach two documents
The UX run amended the PRD and the scope document. Not revisited: the **architecture spine** still
assumes Workspace-first throughout, which the home-is-the-shop decision overrode; and the **scope
document's §11** still excludes anything unlisted, which now includes the video added to FR-65.

### D-21 · The brand mark is a Unicode heart
Every state and navigation glyph in the prototypes is inline SVG, because `♥` and `✓` render with
emoji presentation on several Android builds — unchosen colour in a system where colour carries
meaning. The app-bar brand mark is still `♥`, eleven times. `favicon.svg` already draws that heart as
a path; the app bar does not use it. Converting it is a brand decision, not a remediation.

## From the Admin surface decision, 2026-09-08

### D-22 · A Desk read of Guest contact data cannot be logged
FR-61 requires that access to Guest contact data be confined to those with an operational need and
be logged. AD-32 implements that log in `api/`, because Frappe logs no reads of its own: `Access Log`
records exports only, and `View Log` records Desk form opens without recording which fields were
seen. AD-32 already accepted the gap and named it a residual risk carried by attribution and
operational discipline rather than by a technical control.

That risk was small while Desk had no routine users. Admin is now Pravin's staff working in Desk
daily, so the unlogged path is the normal one for exactly the data NFR 5.5 protects most. Nothing
here is broken — the decision stands and the alternative was a custom Admin console the architecture
deliberately does not build. What changes is the size of the gap between what NFR 5.5 promises and
what the system enforces, and it is recorded rather than discovered later.

Compounding it: `Administrator` is exempt from `permlevel` entirely (`document.py:959`), so the field
restriction protecting Guest contact fields does not bind the one account that reaches everything.

Revisit if the staff count grows beyond a handful, or if a breach notification ever needs to
enumerate what a person actually read.

### D-23 · Password reset is off, so a forgotten staff password is a developer's job
AD-28 keeps `reset_password` / `update_password` disabled, because both mint access keyed on an email
address the account holder does not control. Staff hold Desk passwords, so a forgotten one is reset
by a developer from the User form. Cheap at a handful of staff; it stops being cheap if the operator
grows a real support team, and the answer then is a reset flow scoped to staff accounts alone, never
one reachable by a Family or Vendor.

**Unverified.** That a disabled `reset_password` still leaves `Administrator` able to set a password
from the User form is taken from Frappe's documented behaviour and has not been checked against the
bench at v16.33.0. Check it before the first staff account exists, because the fallback if it is
wrong is that nobody can recover a staff login.

## Blocking the end-user test suite

### D-24 · No backend test mode for phone + OTP sign-in
Sign-in is a mobile number and a six-digit code over MSG91 (FR-1). No test runner can read an
SMS, and every end-user journey on both surfaces starts behind that gate, so the whole suite
stops at screen one.

Needed in `vivahspot_backend`, not here: a small set of reserved mobile numbers whose code is
fixed and whose issuance never reaches MSG91, refused outright when the site is production.
`apps/vendor-web/tests/support/auth-provider.ts` already calls
`vivahspot_backend.api.vendor.request_login_code` and `...verify_login_code` and fails with
that method name when they 404, so the shape is decided and only the backend half is missing.

`verify_login_code` is also assumed to return the session's CSRF token as `csrf_token` in its
`data`. Frappe refuses any POST under session auth without `X-Frappe-CSRF-Token`, and a client
outside a desk page has no other way to learn the token. If the backend supplies it differently,
`auth-provider.ts` is the one place that changes.

The suite also needs two seeding methods, gated the same way and refused on production:
`vivahspot_backend.api.vendor.seed_test_enquiry` and `...delete_test_enquiry`. The reference
journey creates an Enquiry through the first and removes it in `afterEach` through the second,
because a suite that leaves its fixtures behind poisons every later inbox count.

This is security-critical surface: OTP issuance and verification are on the list in CLAUDE.md
§7 that gets human review line by line. A test mode that can be reached on production is worse
than having no tests.

### D-25 · Mobile flows cannot run on this machine yet
`apps/mobile/.maestro/` holds a reference flow that has never executed. Three prerequisites,
none satisfied:

- `adb` is not installed, so Maestro cannot reach an Android device.
- `MAESTRO_APP_ID` is `com.vivahspot.app`, which needs a dev client or release build. Expo Go
  is `host.exp.exponent`, and `clearState` would wipe Expo Go instead of the app. A dev client
  is required regardless once Razorpay's native SDK lands.
- The screens carry no `testID`, so the accessibility ids the flow selects on do not exist.

### D-26 · Playwright's Chromium has no system libraries
`npx playwright install chromium` succeeded; `--with-deps` needs sudo and was not run. If a
run fails to launch a browser, `sudo npx playwright install-deps chromium` once.

### D-27 · Namespace drift between the shared contract and CLAUDE.md
`packages/shared/src/index.js` documents the whitelisted namespace as
`vivahspot_backend.api.mobile.v1.*`. CLAUDE.md §2 says `...api.family.v1.search_listings`.
The test suite followed CLAUDE.md. One of the two is stale and they must not both stand.


### D-28 · The mobile app gets no narrated guide
Narrated how-to guides exist only for the vendor portal. The pipeline reads step markers from the
Playwright reporter and a recording start stamp from the page fixture, and Maestro has neither.
Maestro's own recording command was never verified here, because this machine has no device
(D-25). Once flows can run, the same idea applies — voice each step, hold the frame until the line
ends — with Maestro's step timing as the source.

### D-29 · Guides show the Next.js dev-mode badge
Guides are recorded against `next dev`, which draws its "N" indicator in the bottom-left corner of
every frame. Two fixes, and the choice is about the product rather than the tests:
`devIndicators: false` in `apps/vendor-web/next.config`, which hides it for every developer too,
or recording guides against a production build, which is slower to start but closer to what a
vendor actually sees.
