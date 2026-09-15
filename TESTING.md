# Testing Vivah Spot

This file is the single description of how this repo is tested. The repo has two test roots,
one per app, so the shared story lives here rather than under either of them.

## The one decision everything follows from

**There are no unit tests and no component tests, by choice.** Every test drives the product the
way a person does: taps and clicks on a real screen, against a real backend.

The cost is real and worth stating so nobody is surprised later. A red run tells you which screen
broke, not which function returned the wrong value. Every meaningful test needs a running
`vivahspot_backend` bench. The suite gets slower as it grows. The mitigation is never a quiet unit
layer. It is setting up state through the API and spending the clicking on the journey under test.

## Two surfaces, two drivers

| Surface | Lives in | Driver | Runs on |
| --- | --- | --- | --- |
| Vendor portal (Next.js) | `apps/vendor-web/tests/` | Playwright 1.63 | Headless Chromium |
| Family app (Expo) | `apps/mobile/.maestro/` | Maestro 2.10 | Android emulator or device |

Playwright cannot drive the Expo app: React Native renders native Android views, with no DOM and
no browser. Maestro is the equivalent, equally black-box. Do not test the Expo web build instead.
The app already forks per platform (`src/components/app-tabs.web.tsx`), so the web build is a
different app from the one that ships.

## Before any signed-in test can run

Sign-in is a mobile number and a six-digit code over MSG91 (FR-1). No test runner can read an SMS.
The suite depends on a backend test mode: reserved mobile numbers with a fixed code, never sent,
refused outright on production. **It does not exist yet** — DEFERRED.md D-24. It is backend work
in the bench, and security-critical.

D-24 also records two assumptions this suite makes about that backend. `verify_login_code` returns
the session's CSRF token as `csrf_token`. Seeding goes through `seed_test_enquiry` and
`delete_test_enquiry`. If the backend does either differently, `tests/support/auth-provider.ts`
and the reference journey are the places that change.

## Running the vendor portal suite

```bash
cp apps/vendor-web/.env.example apps/vendor-web/.env   # then fill it in
npm run test:e2e                                        # from the repo root
npm run test:e2e:headed -w @vivahspot/vendor-web        # watch it drive the browser
npm run test:e2e:ui     -w @vivahspot/vendor-web        # pick and step through tests
npm run test:e2e:report -w @vivahspot/vendor-web        # open the last HTML report
```

`apps/vendor-web/.env` is loaded by `tests/support/environment.ts`, which every test process
imports first. Real environment variables win over the file, so CI secrets are never shadowed.

Leaving `API_URL` unset is a supported mode: backend-dependent specs skip with the reason, and the
portal smoke test still runs. The runner starts `next dev` locally and expects `BASE_URL` from the
deploy step on CI.

Chromium's system libraries are not installed on this machine (D-26). If a browser fails to
launch, run `sudo npx playwright install-deps chromium` once.

Test code is excluded from `npm run lint` and `npm run typecheck`, by decision. That covers
`apps/vendor-web/tests/`, `playwright.config.ts` and the generated report, result and guide folders.
Playwright strips types without checking them, so a type error in a test shows up only when that
test runs.

## What every run records, and why

Every test is recorded, pass or fail, because the recording has two jobs.

**A failed test is evidence.** Each failed attempt keeps `trace.zip`, `video.webm` and
`error-context.md` under `apps/vendor-web/test-results/`. The trace holds the DOM, network and
console at every step. `error-context.md` is written by Playwright as a diagnosis prompt, and it is
the input for working out a fix automatically. A fix changes product code, never the test.
Sign-in and payment code still stop for human review.

**A passing journey becomes a how-to guide.** `tests/support/narration-reporter.ts` takes each
passing spec under `tests/journeys/`, voices every `log.step` title with Piper, and burns the same
line in as a subtitle. Each video segment holds on its last frame until its line finishes, so tests
run at machine speed while the guide is paced for a person. Guides land in
`apps/vendor-web/guides/`, which is regenerated output and gitignored.

Write step titles as instructions to a vendor, because they are the script. "Open the enquiry
inbox" makes a good guide; "Assert list length" does not.

Three deliberate limits:

- **Journeys only.** API specs still open a browser, because `apiRequest`'s fixture depends on
  `page`, so they record a blank window. Narrating that teaches nothing.
- **No Playwright overlays.** The action overlay prints each action with its arguments, such as
  `Fill "123456"`, which would show a one-time code on screen. The test overlay shows the spec path
  and priority tag over the page heading.
- **Failed tests get no guide.** Narrating a broken feature would teach the wrong thing.

Guides currently show Next.js's dev-mode badge in the bottom-left corner (D-29). The mobile app has
no guides yet (D-28).

## Setting up narration

```bash
uv tool install piper-tts        # installs the `piper` binary, no sudo
```

Then fetch the voice. `en_US-ljspeech-high` is used because it is public domain, and these guides
are client deliverables. Several Piper voices are non-commercial and must not be used.

```bash
python3 - <<'PY'
import json, os, urllib.request
base = "https://huggingface.co/rhasspy/piper-voices/resolve/main/"
dest = os.path.expanduser("~/.local/share/piper-voices"); os.makedirs(dest, exist_ok=True)
voice = json.load(urllib.request.urlopen(base + "voices.json"))["en_US-ljspeech-high"]
for path in voice["files"]:
    urllib.request.urlretrieve(base + path, os.path.join(dest, os.path.basename(path)))
PY
```

`ffmpeg` and the DejaVu Sans font must also be present. Settings in `.env`:

| Variable | Default | Meaning |
| --- | --- | --- |
| `NARRATED_GUIDES` | on locally, off on CI | `1` renders guides, `0` skips them |
| `PIPER_BIN` | `piper` | Path to the Piper binary |
| `PIPER_VOICE` | `~/.local/share/piper-voices/en_US-ljspeech-high.onnx` | Voice model |

When guides are on and Piper, the voice, the font or ffmpeg is missing, the run is reported failed
with the fix. A quietly silent guide would be worse.

## Running the family app flows

```bash
cp apps/mobile/.env.example apps/mobile/.env   # then fill it in
npm run test:flows                             # every flow
npm run test:flows:p0 -w @vivahspot/mobile     # the pull-request subset
npm run maestro:studio -w @vivahspot/mobile    # inspect elements, author flows
```

Flows are not part of any default command, because they need a device and an installed build.
None of the three prerequisites is met yet (D-25): `adb` is not installed, there is no dev client
build, and the screens carry no `testID`. The flows pass `maestro check-syntax` and have never run.

## Architecture

```
apps/vendor-web/
  playwright.config.ts          timeouts, recording, reporters, dev server
  tests/
    support/
      environment.ts            loads .env; BASE_URL and API_URL resolved once
      merged-fixtures.ts        the ONLY thing specs import `test` from
      auth-setup.ts             registers the auth provider in every process
      auth-provider.ts          mobile number + code sign-in; saves sid and CSRF token
      auth-fixture.ts           session fixtures on Playwright's own context
      global-setup.ts           prepares the session cache once per run
      frappe.ts                 /api/v2 envelope, method paths, rpcRequest, session headers
      narration-reporter.ts     passing journeys into narrated, subtitled guides
      factories/vendor.ts       Vendor, Listing and Enquiry seeds with overrides
    journeys/                   UI tests: what a vendor does; these become guides
    api/                        contract tests over HTTP
  guides/                       generated guide videos (gitignored)

apps/mobile/.maestro/
  config.yaml                   which flows run, tag selection
  flows/                        one journey per file
  subflows/                     shared setup invoked by runFlow
```

### Sessions

Nobody signs in through the screen except a test whose subject is signing in.

The first test that needs a session triggers one sign-in. The session cookie is saved under
`apps/vendor-web/.auth/<environment>/<user>/`, with the CSRF token beside it. Every later test in
that run, and in later runs, reuses the saved session until it stops working. `.auth/` holds a live
session and is gitignored.

| Fixture | Gives a test |
| --- | --- |
| `page`, `context` | Playwright's own browser context, already signed in, recorded as configured |
| `frappeSession` | The `sid` and CSRF token, for API calls |
| `authToken` | The bare `sid`, kept for the library's contract |
| `authSessionEnabled` | Set to `false` with `test.use` for a signed-out block |
| `apiRequest` | HTTP calls with parsing and retries; pass it `rpcRequest(...)` |
| `interceptNetworkCall` | The real request a click produced |
| `networkErrorMonitor` | Fails a test on a 4xx or 5xx the UI swallowed |
| `recurse` | Waiting out eventual consistency without a sleep |

This deliberately does not use playwright-utils' `createAuthFixtures()`. Running it showed that its
context fixture drops video recording, and that its token fixture bypasses the library's own session
cache. Sessions are instead handed to Playwright through its `storageState` option.

### The Frappe seam

`tests/support/frappe.ts` is the only place that knows the transport.

- **`rpcRequest(namespace, method, { body, session })`** builds every backend call. It pins the call
  to `API_URL`. Without it, `apiRequest` resolves paths against the portal and the call returns a
  404 from Next.js that reads like a missing endpoint.
- **Sessions travel as Frappe expects them:** the `sid` cookie plus `X-Frappe-CSRF-Token`.
  `Authorization: Bearer` means nothing to Frappe. A POST under session auth without the CSRF token
  gets a 403 that looks like a permission problem.
- **Only whitelisted RPC** under `vivahspot_backend.api.*`. There is no helper for
  `/api/v2/document/{doctype}` and there should never be one.
- **`family/v1` keeps its version segment; `vendor` and `guest` do not.** The frozen namespace is
  the one whose client cannot be redeployed.
- **`unwrap()` throws** when the v2 envelope carries errors or has no `data`, so a test never
  proceeds on an empty payload.

## Seed data

Two kinds, handled differently.

**Reference data** changes rarely: Services, Places, Subscription Tiers. It belongs in a Frappe
fixture set exported from the bench, restored once when a test site is built, and shared by every
test. That is backend work.

**Transactional data** is what a test is about: a Vendor, a Listing, an Enquiry. Each test seeds its
own through whitelisted test-mode methods and deletes it in `afterEach`, even when assertions fail.
`tests/journeys/enquiry-inbox.spec.ts` is the reference. Sharing transactional data between tests is
what makes suites flaky.

## Practices this suite holds to

**Select on test ids, never on visible text.** Every user-facing string goes through i18n. Playwright
uses `data-testid`; Maestro uses the accessibility id React Native sets from `testID`.

**Each test owns its starting state.** Maestro flows begin with `clearState` and `launchApp`.
Playwright specs seed what they need through the API.

**Wait on conditions, never on the clock.** A web-first assertion, `recurse`, or `extendedWaitUntil`.

**Declare interceptions before the navigation that triggers them.**

**Clients never do money arithmetic, and neither do tests.** Totals are computed server-side (AD-19).

**Use the PRD Glossary's words.** PRD §7.9 bans *book, booking, cart, checkout, legally binding,
guaranteed* in test names as much as in product copy.

## Write-time enforcement

`.claude/hooks/tea-enforce.cjs` blocks a write that introduces a focused test, a hard wait, an
undocumented skip, or the other rules from `bmad-testarch-test-review`'s criteria registry. It runs
before a write, after a write (catching writes made through Bash), and at the end of a turn. It fails
open: a malformed payload or unreadable config allows the write.

`.tea/enforce-config.json` is the gate: rules fire only on files matching `testGlobs`. To switch a
rule off, add its id to `disabledRules` there and say why in the commit.

## CI

There is no CI yet (DEFERRED.md D-5). The config already assumes its shape. `CI=true` turns on two
retries, two workers and `forbidOnly`, stops Playwright from owning the dev server, and turns guide
rendering off unless `NARRATED_GUIDES=1`. Reports land in `apps/vendor-web/playwright-report/` as HTML
and JUnit XML. The portal suite needs no emulator; the flow suite needs an Android lane, running
`--include-tags P0` on pull requests and the whole set nightly.

## How this machinery was verified

The dated record of every check, the defects it found and the fixes, is in
`_bmad-output/test-artifacts/framework-setup-progress.md`.

## Knowledge sources

Patterns come from the TEA knowledge base in
`.claude/skills/bmad-testarch-framework/resources/knowledge/`, chiefly `playwright-utils-mandate.md`,
`maestro-flows.md`, `mobile-test-strategy.md`, `auth-session.md`, `api-request.md` and
`data-factories.md`. `mobile-test-strategy.md` puts device flows at 5 to 15 percent of mobile
coverage; this repo runs at 100 percent end-user tests by deliberate choice.
