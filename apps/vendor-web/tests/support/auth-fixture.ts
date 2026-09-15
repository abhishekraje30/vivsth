/**
 * Gives every test a vendor session through Playwright's own browser context.
 *
 * The import of `./auth-setup` registers the provider in this process before any fixture
 * asks for a session.
 *
 * This file deliberately does not use `createAuthFixtures()` from playwright-utils, and the
 * reasons were found by running it, not by preference:
 *
 *   - Its `context` fixture replaces Playwright's with a bare `browser.newContext()` that
 *     omits `recordVideo`. Every test using it recorded nothing, so no failure evidence and
 *     no how-to guide could exist. It also took `baseURL` from a private Playwright field
 *     that no longer carries it.
 *   - Its `authToken` fixture calls the provider directly, skipping the library's own
 *     `getAuthToken`, which is the function that loads a saved session, checks expiry and
 *     saves a new one. Through that fixture every test signed in again.
 *
 * So this overrides Playwright's `storageState` option instead. Playwright's context then
 * builds itself exactly as configured — video, trace, base URL — and simply starts with the
 * session loaded. `getAuthToken` sits behind both fixtures, so a run signs in once per
 * identity and every later test reads the saved file.
 *
 * `frappeSession` is what API calls use: the `sid` and CSRF token together, sent through
 * `sessionHeaders()`. `authToken` stays for the library's contract and is the bare `sid`.
 *
 * `authOptions` and `authSessionEnabled` are Playwright option fixtures, declared as the
 * tuple `[defaultValue, { option: true }]`. A block that must run signed out sets
 * `authSessionEnabled` to false with `test.use`.
 */
import { test as base } from '@playwright/test';
import {
  getAuthProvider,
  getAuthToken,
  getStorageStatePath,
  type AuthFixtures,
} from '@seontechnologies/playwright-utils/auth-session';

import { AUTH_ENVIRONMENT, AUTH_USER } from './auth-setup';
import { readFrappeSession } from './auth-provider';
import type { FrappeSession } from './frappe';

export const test = base.extend<AuthFixtures & { frappeSession: FrappeSession }>({
  authOptions: [{ environment: AUTH_ENVIRONMENT, userIdentifier: AUTH_USER }, { option: true }],
  authSessionEnabled: [true, { option: true }],

  authToken: async ({ request, authOptions, authSessionEnabled }, use) => {
    if (!authSessionEnabled) {
      // A signed-out block has no token by definition. An empty string is that answer, and
      // a test that sends it gets the 401 or 403 it is there to assert.
      await use('');
      return;
    }

    const session = await getAuthToken(request, authOptions);
    const token = getAuthProvider().extractToken(session);
    if (!token) {
      throw new Error(
        `A session was obtained for "${authOptions.userIdentifier}" but it carries no token. ` +
          'The provider returned a storage state without the session cookie.',
      );
    }
    await use(token);
  },

  storageState: async ({ request, authOptions, authSessionEnabled }, use) => {
    if (!authSessionEnabled) {
      await use(undefined);
      return;
    }

    // Ensures the saved session exists and is current; signs in only when it is not.
    await getAuthToken(request, authOptions);
    await use(getStorageStatePath(authOptions));
  },

  frappeSession: async ({ request, authOptions, authSessionEnabled }, use) => {
    if (!authSessionEnabled) {
      throw new Error(
        'frappeSession was requested in a signed-out block. A signed-out test sends no session; ' +
          'drop the fixture from that test or leave the session enabled.',
      );
    }
    await getAuthToken(request, authOptions);
    await use(readFrappeSession(authOptions));
  },
});
