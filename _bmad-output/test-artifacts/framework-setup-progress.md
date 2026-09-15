---
stepsCompleted:
  [
    'step-01-preflight',
    'step-02-select-framework',
    'step-03-scaffold-framework',
    'step-04-docs-and-scripts',
    'step-05-validate-and-summary',
  ]
lastStep: 'step-05-validate-and-summary'
lastSaved: '2026-09-15'
executionMode: 'sequential'
---

# Test framework setup — Vivah Spot

Run on 2026-09-12 by the Master Test Architect workflow, create mode, sequential execution.
Sequential was chosen over the parallel modes because the scaffold's three work units import
each other by exact path, and a fixture index that disagrees with the fixtures it merges is
the one failure that is hardest to read.

## Step 1 — Preflight

**Stack detected: `mobile` + `frontend`.** The auto-detection algorithm resolves a project
carrying both to `mobile`, and its stated tie-break covers mobile-plus-backend rather than
mobile-plus-web. Two client surfaces are present, so the question went to the user and both
were scaffolded in one pass at their direction.

| Surface | Manifest | Identified as |
| --- | --- | --- |
| `apps/mobile` | `app.json` | Expo 57, expo-router, React Native 0.86.2, NativeWind 4 |
| `apps/vendor-web` | `package.json` | Next.js 16.3.0, React 19.2.8, Tailwind 4 |
| `packages/shared` | `package.json` | zod 4 contract and design tokens, no runner |

**Backend is out of tree.** No `pyproject.toml`, `go.mod`, `pom.xml`, `Gemfile`, `Cargo.toml`
or `*.csproj` anywhere. `vivahspot_backend` is a Frappe v16 app in a bench outside this
repository (CLAUDE.md §1), so no backend framework was selected and none should be.

**Prerequisites passed.** No `playwright.config.*`, no `cypress.config.*`, no Maestro or
Appium configuration, no existing test directory.

**Context documents read.** `ARCHITECTURE-SPINE.md`, `prd.md`, `epics.md`. Authentication is
mobile number plus one-time code over MSG91; all three clients call whitelisted RPC on
`/api/v2/method` in the `family/v1`, `vendor` and `guest` namespaces.

## Step 2 — Framework selection

| Surface | Selected | Why |
| --- | --- | --- |
| `apps/vendor-web` | Playwright 1.63.0 | Browser surface, large repo, CI parallelism matters |
| `apps/mobile` | Maestro 2.10.0 | Native Android views; Playwright cannot reach them at all |

The user's stated position was end-user testing only, no unit or component layer. That is
honoured on both surfaces. The correction offered and accepted was that Playwright cannot
drive a React Native app, and that Maestro is the equivalent device-level tool rather than a
step down toward programmatic testing.

**Rejected: Playwright against the Expo web build.** `react-native-web` is installed and
`app.json` declares a static web output, so the option exists. The app already imports
`expo-symbols` in three modules and already keeps a platform fork at
`src/components/app-tabs.web.tsx`, so the web build and the shipped Android build are
different applications.

**Pact contract testing: gate closed, nothing scaffolded.** Applying
`pactjs-utils-mandate.md` § _Relevance Before Scaffolding_: no `pact/` or `tests/contract/`
directory, no `@pact-foundation/pact`, no `PACT_BROKER_*` variable, and no two independently
deployable services inside this repository. The backend having no source here satisfies only
the first half of the weak-evidence rule and the required second signal is absent. The
`framework` workflow can add it later if a real consumer-provider boundary appears.

## Step 3 — Scaffold

```
apps/vendor-web/
  playwright.config.ts
  .env.example  .nvmrc
  tests/
    support/
      environment.ts        BASE_URL / API_URL, resolved once for config and provider alike
      merged-fixtures.ts    the only entry point specs import `test` from
      auth-setup.ts         configure + setAuthProvider, at import time, in every process
      auth-provider.ts      mobile number and one-time code, all AuthProvider members
      auth-fixture.ts       createAuthFixtures with option tuples restated
      global-setup.ts       storage init and token pre-fetch, guarded on API_URL
      frappe.ts             /api/v2 envelope, whitelisted method paths
      factories/vendor.ts   Vendor, Listing, Enquiry seeds with overrides
    journeys/portal-smoke.spec.ts     runs with no backend
    journeys/enquiry-inbox.spec.ts    reference UI journey
    api/vendor-session.spec.ts        reference API contract sample

apps/mobile/
  .env.example  .nvmrc
  .maestro/
    config.yaml                 flows glob, tag selection, execution order
    flows/sign-in.yaml          reference device flow, P0
    subflows/sign-in.yaml       reusable sign-in invoked by runFlow
```

**Dependencies added, all approved beforehand.** `@playwright/test` 1.63.0,
`@seontechnologies/playwright-utils` 4.4.0, and its peers `ajv` 8.20.0, `js-yaml` 4.3.2,
`zod` 4.6.2, all in the `@vivahspot/vendor-web` workspace so the mobile app never resolves a
browser runner. Maestro 2.10.0 installed to `~/.maestro` and added to `PATH` in `.bashrc`.

**One unapproved-by-name addition, forced rather than chosen.** `dotenv` 17.4.2.
`@seontechnologies/playwright-utils@4.4.0` requires it at
`dist/cjs/auth-session/internal/auth-configure.js:11` but declares it in neither
`dependencies` nor `peerDependencies`. Without it every run fails at import with
`Cannot find module 'dotenv'`. This is an upstream packaging defect, and installing it
executes the already-approved decision rather than making a new one.

**Deviations from the knowledge base, each deliberate.**

1. **No unit or component layer.** `mobile-test-strategy.md` puts device flows at 5 to 15
   percent of mobile coverage with unit and component tests carrying the rest; step 2 calls
   the unit config "not optional". This repository runs at 100 percent end-user tests at the
   user's explicit direction, stated twice. The cost is recorded in `TESTING.md` so the next
   reader knows it was chosen rather than overlooked.
2. **No `@faker-js/faker`.** Adding a dependency needs a decision, and faker's generators are
   wrong for this domain: an Indian mobile number is ten digits beginning 6 to 9, and a rupee
   amount is an exact decimal that clients never compute. Factories are hand-written with a
   deterministic per-run counter, so a failed run reproduces from its artefacts.
3. **`TESTING.md` at the repository root rather than `tests/README.md`.** There are two test
   roots. Putting the shared half under `apps/vendor-web/` would hide it from every mobile
   reader and split one piece of knowledge across two files.
4. **Option fixtures restated in `auth-fixture.ts`.** `createAuthFixtures()` declares
   `authOptions` and `authSessionEnabled` as Playwright option tuples, and the package's
   generated declarations widen the tuple to a plain array, which `test.extend` refuses. The
   two declarations are restated with their real shape; the implementations of `authToken`,
   `context` and `page` come from the library untouched. No cast, no suppression.

## Step 4 — Documentation, scripts and enforcement

**`TESTING.md`** covers the single architectural decision and its cost, both surfaces and why
they need different drivers, the sign-in blocker, how to run each suite, the fixture
architecture, the practices the suite holds to, the enforcement hook, and the CI shape the
config already assumes.

**Scripts.** `test:e2e`, `test:e2e:headed`, `test:e2e:ui`, `test:e2e:report` on vendor-web;
`test:flows`, `test:flows:p0`, `maestro:studio` on mobile; `test:e2e` and `test:flows`
delegating from the root. Device flows are deliberately absent from any default test command
because they need a booted emulator and an installed build.

**Write-time enforcement installed.** `.claude/hooks/tea-enforce.cjs` copied byte for byte
and verified with `cmp`. `.tea/enforce-config.json` scopes every rule to the two stacks that
actually exist here, with `hookSha256` set to
`f2ede9d399358d8810c660a29590f0c1683f7164bb3199038d26787f8324491c`. All three events merged
into the existing `.claude/settings.json`, preserving the four bmad-loop hooks already there,
including its `Stop` entry.

`excludeGlobs` is empty because no k6 scripts exist. `pactConfigGlobs` is empty because no
pact config exists. `disabledRules` is empty.

## Step 5 — Validation

Every claim below names the command that produced it.

| Check | Command | Result |
| --- | --- | --- |
| Typecheck, all 3 workspaces | `npm run typecheck` | Passes clean |
| Vendor portal suite | `npm run test:e2e` | 1 passed, 3 skipped |
| Maestro flow syntax | `maestro check-syntax` on each file | `OK` for both |
| Enforcement, all 5 test files | `tea-enforce.cjs --post` | No findings |
| Enforcement blocks a violation | `--pre` on a spec with `test.only` | Exit 2, C2 and H1 reported |
| Enforcement fails open | `--pre` with a malformed payload | Exit 0 |
| Secrets in scaffolded files | grep for numeric literals | None |
| Session cache ignored by git | `git check-ignore` | `.auth/`, reports, results ignored |
| Env examples tracked | `git check-ignore` | Both tracked |

The three skipped specs are the backend-dependent ones, and they skip with the reason rather
than failing. That is the designed no-backend mode, not a broken setup.

**Two defects were found and fixed during validation, not worked around.**

1. `createAuthFixtures()` resolves the auth provider the moment it is called, which happens
   while a worker imports its fixtures. Playwright runs `globalSetup` in a separate process,
   so registering only there threw "no auth provider" in every worker. Registration moved to
   `auth-setup.ts`, which registers at import time in whichever process imports it.
2. `auth-session` reads the configured base URL from a private Playwright field that no
   longer carries it, falls back to `process.env.BASE_URL`, finds nothing, and every relative
   navigation dies as "Cannot navigate to invalid URL" without naming a base URL anywhere.
   `environment.ts` now holds the value and both the config and the provider read it.

A third was fixed pre-emptively: `authStorageInit()` and `authGlobalInit()` were called
without the identity, which writes the pre-fetched session to `.auth/local/default/` while
the fixtures read `.auth/local/vendor/`. Latent until a bench exists, so it was fixed before
it could become a confusing first failure.

## What blocks a green suite, and where it lives

Recorded as DEFERRED.md D-24 through D-27. D-24 is the one that matters: sign-in is a mobile
number and a six-digit code over MSG91, no test runner can read an SMS, and every journey on
both surfaces starts behind that gate. The backend needs a test mode with reserved numbers
and a fixed code, refused outright on production. That is security-critical surface and gets
human review line by line.

## Knowledge fragments applied

`playwright-utils-mandate.md`, `auth-session.md`, `api-request.md`,
`intercept-network-call.md`, `fixtures-composition.md`, `network-first.md`,
`data-factories.md`, `fixture-architecture.md`, `playwright-config.md`, `test-quality.md`,
`maestro-flows.md`, `mobile-test-strategy.md`, `mobile-ci-device-lab.md`,
`pactjs-utils-mandate.md` (for its relevance gate, which closed).

## Suggested next workflows

`ci` — there is no `.github/workflows` at all (DEFERRED.md D-5), and the Playwright config
already assumes the shape a CI lane would take. `test-design` — to decide which journeys
earn a device flow, now that flows are the entire mobile strategy and each one is expensive.

## 2026-09-15 — Video, narration and a full verification pass

The user set two jobs for recordings. A failed run's video is evidence for working out a fix
automatically. A passing run's video becomes the how-to guide for that feature, with English
narration. Piper was chosen as the voice source, local and free, using the public-domain voice
`en_US-ljspeech-high` because guides are client deliverables.

The user then asked for the machinery to be verified. No product features exist yet, so this pass
verified the harness, not the product. Backend-dependent paths were exercised against a throwaway
fake Frappe backend kept in the session scratchpad and never committed. It proves the harness
reaches, authenticates and unwraps correctly; it asserts nothing about product behaviour.

### Defects found and fixed

| Defect | How it surfaced | Fix |
| --- | --- | --- |
| No video was ever recorded | Reporter saw `attachments: []` | playwright-utils' `context` fixture omits `recordVideo`; sessions now reach Playwright's own context via `storageState` |
| Every test signed in again | Library source: its `authToken` fixture calls the provider directly | Both fixtures go through the library's caching `getAuthToken` |
| `apps/vendor-web/.env` never loaded | Runs printed `injected env (0)` | `environment.ts` loads it before anything reads the environment |
| Sessions sent as `Authorization: Bearer` | frappe-api skill: Frappe has no bearer session auth | `sid` cookie plus `X-Frappe-CSRF-Token` via `sessionHeaders` |
| No CSRF token captured | Same source: POST under session auth needs it | Provider saves `csrf_token` from verification beside the session |
| API calls went to the portal | Next.js log showed the RPC path answered 404 | `rpcRequest` pins calls to `API_URL` |
| API specs produced "guides" | Guides appeared for blank browser windows | Reporter renders only specs under `tests/journeys/` |
| Captions showed spec path and `[P0]`, covering the heading | Frame inspection | Playwright overlays removed; reporter burns subtitles |
| Action overlay printed typed values | Scratch recording of a fill and click | Same removal; a one-time code must never appear in a guide |
| Missing-glyph box at subtitle line ends | Frame inspection | One drawtext filter per line |
| Duplicate DEFERRED ids D-7 to D-10 | Status check | Renumbered to D-24 to D-27 |

### Evidence

| Check | Result |
| --- | --- |
| Typecheck, all three workspaces | Clean |
| Enforcement hook on every spec | No findings; hook byte-identical to the skill resource, sha256 matches config |
| Fake backend, cold cache | 3 passed; exactly 1 code request and 1 verification |
| Fake backend, warm cache | 3 passed; sign-in calls unchanged, so the saved session was reused |
| Signed-in call | Accepted with `sid` and CSRF token; 0 CSRF rejections |
| Signed-out call | Refused with 403 as asserted |
| `.env` present, then removed | Backend specs ran, then skipped with their reason |
| Default mode, no `.env` | 3 skipped, 1 passed |
| Passing journey guide | H.264 1280x720 and AAC; mean -22 dB, peak -2.9 dB; subtitles match narration |
| Guides limited to journeys | One guide for three passing tests, the journey's |
| Guides on, Piper missing | Test passed; run exit 1 with install instructions; no guide written |
| Failing journey, three attempts | Each kept `trace.zip`, `video.webm`, `error-context.md`; no guide |
| Maestro flows | `check-syntax` OK on both files; never executed, no device |

### Not verified

- The narration itself was measured for level and duration but not listened to.
- Real Frappe behaviour: the CSRF token source and test-mode methods are assumptions in D-24.
- Mobile recording and guides, D-25 and D-28.

### Deviations added

- **`createAuthFixtures()` is no longer used.** `playwright-utils-mandate.md` rates auth-session as
  RECOMMENDED; the library's own fixtures broke video and caching, so the provider contract and
  `getAuthToken` are kept and the fixtures are project-owned.
- **Dependencies added:** Piper via `uv tool install piper-tts` 1.8.0, outside npm, approved by the
  user's choice of voice source. `dotenv` is now imported directly by `environment.ts`.

