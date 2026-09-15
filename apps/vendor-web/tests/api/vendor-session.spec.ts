/**
 * Reference API sample: the whitelisted RPC contract, checked without a browser.
 *
 * Not a unit test. This exercises the same public surface the portal calls, over HTTP,
 * against a real bench — it just skips the rendering. It exists because a broken contract
 * is far cheaper to read here than three screens into a journey.
 *
 * What it demonstrates for later specs:
 *
 *   - `apiRequest` rather than the raw request context, so 5xx retries and JSON parsing
 *     are not re-implemented per spec
 *   - `rpcRequest` to build every backend call, so none can be sent to the portal by mistake
 *   - `unwrap` on every response, because /api/v2 wraps its payload in `data` and reading
 *     the body directly reads the envelope
 *   - the session sent as Frappe expects it, `sid` cookie plus `X-Frappe-CSRF-Token`, through
 *     `sessionHeaders` — never as a bearer token, which Frappe ignores
 *   - v2 pagination by `limit` and `start`, with `has_next_page` on the response. The v1
 *     names `limit_page_length` and `limit_start` fill the tutorials and are wrong here.
 *
 * The authenticated and unauthenticated cases sit in separate describes because
 * `test.use` binds at describe scope, not per test.
 *
 * No response schema exists for these methods yet, so the assertions cover the fields under
 * test only. When the zod contract lands in packages/shared, pass it to `apiRequest` and
 * validate the whole shape in one line instead.
 */
import { expect, log, test } from '../support/merged-fixtures';
import { BACKEND_READY, NEEDS_BENCH } from '../support/environment';
import { rpcRequest, unwrap } from '../support/frappe';

test.describe('Vendor RPC contract, signed in', () => {
  // Skipped only while no bench is reachable. The backend lives outside this repo, so
  // absence of a URL means "not running here", not "this test is broken".
  test.skip(!BACKEND_READY, NEEDS_BENCH);

  test('[P0] a signed-in vendor can page their Enquiries', async ({ apiRequest, frappeSession }) => {
    await log.step('Ask for the first page of Enquiries');

    const { status, body } = await apiRequest(
      rpcRequest('vendor', 'list_enquiries', { body: { start: 0, limit: 20 }, session: frappeSession }),
    );

    expect(status).toBe(200);

    const page = unwrap<{ items: unknown[]; has_next_page: boolean }>(body, 'list_enquiries');
    expect(Array.isArray(page.items), 'list_enquiries should return an items array').toBe(true);
    expect(typeof page.has_next_page, 'v2 list responses carry has_next_page').toBe('boolean');
  });
});

test.describe('Vendor RPC contract, signed out', () => {
  // Stated rather than assumed: this block is about the unauthenticated case, so it must
  // not inherit the suite's cached vendor session.
  test.use({ authSessionEnabled: false });
  // Skipped only while no bench is reachable. The backend lives outside this repo, so
  // absence of a URL means "not running here", not "this test is broken".
  test.skip(!BACKEND_READY, NEEDS_BENCH);

  test('[P1] the inbox is not readable without a session', async ({ apiRequest }) => {
    await log.step('Ask for Enquiries with no session at all');

    const { status } = await apiRequest({
      ...rpcRequest('vendor', 'list_enquiries', { body: { start: 0, limit: 20 } }),
      // Retries would turn a deliberate 403 into a slow deliberate 403.
      retryConfig: { maxRetries: 0 },
    });

    expect(
      [401, 403],
      'an unauthenticated caller must not read a vendor inbox',
    ).toContain(status);
  });
});
