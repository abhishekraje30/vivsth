/**
 * Prepares the on-disk auth cache once, before any worker starts.
 *
 * The provider registration is not here. It lives in `./auth-setup`, which registers at
 * import time, because Playwright runs this file in its own process and then starts worker
 * processes that never shared it. Importing that module here registers the provider for
 * *this* process; the workers get it through their own import of the same module.
 *
 * Order, as the module actually executes it: the `./auth-setup` import runs first and
 * configures the session and registers the provider, then `authStorageInit` creates the
 * cache directory using that configuration, then `authGlobalInit` pre-fetches the token.
 * Init before registration is the documented way to get a run that silently never
 * authenticates.
 *
 * `authGlobalInit` reaches the backend — it signs in once so the workers do not have to.
 * That makes it the one part of setup that cannot run without a bench, so it is skipped
 * when `API_URL` is unset. Without that guard a missing backend fails global setup, and a
 * failed global setup takes down every spec including the smoke test, whose whole purpose
 * is to tell you the portal is up when nothing else can run.
 */
import { authGlobalInit, authStorageInit } from '@seontechnologies/playwright-utils/auth-session';

import { AUTH_ENVIRONMENT, AUTH_USER } from './auth-setup';
import { BACKEND_READY } from './environment';

export default async function globalSetup(): Promise<void> {
  // The identity must be passed, not left to the default. Storage is keyed by
  // environment and user, and the fixtures read the 'vendor' path — an unqualified call
  // here writes the pre-fetched session to 'default' instead, where nothing looks for it.
  authStorageInit({ environment: AUTH_ENVIRONMENT, userIdentifier: AUTH_USER });

  if (!BACKEND_READY) {
    // Not an error, and not silent: the suite has a supported no-backend mode in which the
    // backend-dependent specs skip themselves and the smoke test still runs.
    console.info(
      '[auth] API_URL is unset, so no vendor session was pre-fetched. ' +
        'Backend-dependent specs will skip. See TESTING.md.',
    );
    return;
  }

  await authGlobalInit({
    environment: AUTH_ENVIRONMENT,
    userIdentifiers: [AUTH_USER],
  });
}
