/**
 * The portal serves, and it serves without a hidden failure.
 *
 * This is the one spec in the suite that needs no backend, so it is the one that tells you
 * whether a red run means "the feature broke" or "nothing is running". Keep it that way:
 * it must never grow a dependency on a Frappe method.
 *
 * The network-error fixture is doing the real work. A Next.js page renders happily while a
 * data call behind it returns 500, and a test that only asserts on visible text calls that
 * green. Merging `networkErrorFixture` fails the test on any 4xx or 5xx the page made.
 */
import { expect, log, test } from '../support/merged-fixtures';

test.describe('Vendor portal availability', () => {
  // The auth fixture overrides `page`, so asking for a page normally acquires a vendor
  // session first. That would give this spec the backend dependency it exists to avoid.
  test.use({ authSessionEnabled: false });

  test('[P0] serves the portal without a failed request behind it', async ({ page }) => {
    await log.step('Open the portal');
    const response = await page.goto('/');

    expect(response?.status(), 'the portal should answer the first request').toBeLessThan(400);

    await log.step('Confirm the document actually rendered');
    await expect(page.locator('body')).toBeVisible();
  });
});
