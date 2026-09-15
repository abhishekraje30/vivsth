/**
 * Reference journey: a vendor opens the enquiry inbox and sees a new Enquiry.
 *
 * This is the shape every later journey copies, so read it for the pattern rather than the
 * feature. Three things are deliberate:
 *
 *   1. Setup is an API call, the assertion is a click. Seeding the Enquiry through
 *      whitelisted RPC keeps the test about "can a vendor find this", not about driving a
 *      family's enquiry form for two minutes to produce a fixture.
 *   2. The interception is declared *before* the navigation that triggers it. Declared
 *      after, it races the request and flakes on a fast machine.
 *   3. Selectors are `data-testid`, never visible copy. Every user-facing string in this
 *      product goes through i18n, so a test anchored on English text breaks the day a
 *      Marathi locale ships and proves nothing in the meantime.
 *   4. What it seeds, it removes. A suite that leaves its fixtures behind poisons the next
 *      run's inbox counts and grows a bench nobody can reason about. Cleanup runs in
 *      `afterEach` so it happens even when the assertions fail.
 *
 * The inbox does not exist yet. Until the backend test mode and the screen both land, this
 * spec reports itself as skipped with the reason rather than failing the suite for a
 * feature nobody has written.
 */
import { expect, log, test } from '../support/merged-fixtures';
import { makeEnquiry } from '../support/factories/vendor';
import { BACKEND_READY, NEEDS_BENCH } from '../support/environment';
import { methodPath, rpcRequest, unwrap } from '../support/frappe';

test.describe('Enquiry inbox', () => {
  // Skipped, not deleted: this is the reference journey every later spec copies, and the
  // screen plus the backend test mode both still have to land. It runs the moment API_URL
  // points at a bench.
  test.skip(!BACKEND_READY, NEEDS_BENCH);

  // Records this spec created, torn down in reverse so a dependent record never outlives
  // the one it points at.
  const seeded: string[] = [];

  test.afterEach(async ({ apiRequest, frappeSession }) => {
    while (seeded.length) {
      const name = seeded.pop();
      const { status } = await apiRequest(
        rpcRequest('vendor', 'delete_test_enquiry', { body: { name }, session: frappeSession }),
      );
      // Reported, never swallowed: a failed cleanup leaves the next run a dirty inbox, and
      // finding that out here is much cheaper than debugging a count three runs later.
      expect(status, `cleanup of Enquiry ${name} should succeed`).toBe(200);
    }
  });

  test('[P0] a new Enquiry reaches the vendor inbox', async ({ page, apiRequest, frappeSession, interceptNetworkCall }) => {
    const enquiry = makeEnquiry();

    await log.step('Seed an Enquiry against the signed-in vendor');
    const seedResponse = await apiRequest(
      rpcRequest('vendor', 'seed_test_enquiry', { body: enquiry, session: frappeSession }),
    );

    expect(seedResponse.status, 'seeding an Enquiry should succeed').toBe(200);
    const created = unwrap<{ name: string }>(seedResponse.body, 'seed_test_enquiry');
    seeded.push(created.name);

    await log.step('Open the inbox, watching the call it makes');
    // Declared before goto, awaited after. Order is the point.
    const inboxCall = interceptNetworkCall({
      method: 'POST',
      url: `**${methodPath('vendor', 'list_enquiries')}`,
    });

    await page.goto('/enquiries');
    const { status, responseJson } = await inboxCall;

    expect(status, 'the inbox should load its Enquiries').toBe(200);
    const inbox = unwrap<{ items: Array<{ name: string }> }>(responseJson, 'list_enquiries');
    expect(inbox.items.map((e) => e.name)).toContain(created.name);

    await log.step('Confirm the vendor can see it on screen');
    await expect(page.getByTestId(`enquiry-row-${created.name}`)).toBeVisible();
  });
});
