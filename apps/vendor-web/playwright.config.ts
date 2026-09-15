/**
 * Playwright config for the vendor portal's end-user suite.
 *
 * Shaped by one decision (see TESTING.md): this project has no unit or component layer by
 * choice. Every test here drives the real portal through the browser the way a vendor would.
 *
 * Every test is recorded, pass or fail, because the recording has two jobs. A failed run's
 * video, with its trace, is the evidence a fix is worked out from — a manual tester's
 * report, produced automatically. A passed run's video becomes the how-to guide for that
 * feature: the narration reporter voices each `log.step` title over it and burns the same line
 * in as a subtitle, so the guide reads with the sound off.
 *
 * `globalSetup` registers the auth provider before any worker starts, because
 * `auth-session` resolves its provider once per process and a provider set inside a
 * fixture arrives too late.
 *
 * Not in scope here: the Expo app. It renders native Android views, not a DOM, and is
 * driven by Maestro from `apps/mobile/.maestro/`.
 */
import { defineConfig, devices } from '@playwright/test';

import { BASE_URL } from './tests/support/environment';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  // `support/` holds fixtures and factories, never specs; without this the runner
  // tries to execute the factory modules as empty test files.
  testIgnore: ['**/support/**'],
  globalSetup: './tests/support/global-setup.ts',

  // A vendor journey crosses several screens and a real Frappe round trip, so the
  // per-test budget is deliberately wider than the per-action one.
  timeout: 60_000,
  expect: { timeout: 10_000 },

  fullyParallel: true,
  // A `test.only` left in a spec silently shrinks the suite to one test. On CI that is a
  // failure, not a convenience.
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'playwright-report/junit.xml' }],
    // Outside playwright-report/ on purpose: the HTML reporter clears its own folder, and
    // a guide rendered in the same onEnd could be deleted by it.
    ['./tests/support/narration-reporter.ts', { outputDir: 'guides', journeysDir: 'tests/journeys' }],
  ],

  use: {
    baseURL: BASE_URL,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    // The trace is what a fix is diagnosed from: DOM, network and console at every step.
    // It is only useful when something broke, so it is only kept then.
    trace: 'retain-on-failure-and-retries',
    screenshot: 'only-on-failure',
    // Size matches the Desktop Chrome viewport, so nothing is scaled or letterboxed.
    //
    // No `show` overlays, on purpose, and both were tried. The action overlay prints every
    // action with its arguments — `Fill "123456" getByTestId(...)` — which would put a one-time
    // code on screen in a client-facing guide. The test overlay shows the spec path and priority
    // tag over the page's own heading. Subtitles come from the narration reporter instead.
    video: { mode: 'on', size: { width: 1280, height: 720 } },
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  // Vendors reach the portal through `next dev` locally. On CI the URL is supplied by the
  // deploy step, so the runner must not try to own the server.
  webServer: isCI
    ? undefined
    : {
        command: 'npm run dev',
        url: BASE_URL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
