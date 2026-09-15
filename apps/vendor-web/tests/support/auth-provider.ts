/**
 * How the test suite becomes a signed-in vendor.
 *
 * Vivah Spot has no passwords. A vendor signs in with a mobile number and a six-digit code
 * delivered by MSG91, which means the normal sign-in path is unautomatable by construction:
 * no test runner can read an SMS. Every end-user journey in this suite starts after that
 * gate, so the gate has to be openable without a phone.
 *
 * The opening is a backend test mode: a small set of reserved mobile numbers whose code is
 * fixed and whose issuance never reaches MSG91, enabled only when the site is not
 * production. That belongs in `vivahspot_backend`, not here, and it does not exist yet —
 * see DEFERRED.md D-24. Until it does, `manageAuthToken` fails loudly and names what is
 * missing, rather than returning an empty session that fails three screens later.
 *
 * Why a provider rather than a login spec: `auth-session` caches the resulting session per
 * environment and user, so sign-in costs one request across the whole suite instead of one
 * per test. The cache lives in `.auth/` and is gitignored — it holds a live session.
 *
 * Frappe carries the session in a `sid` cookie, so `extractToken` reads a cookie rather
 * than a bearer token, and `extractStorage` is deliberately not implemented.
 *
 * A session alone cannot POST: Frappe also demands `X-Frappe-CSRF-Token`. The code-verification
 * method is assumed to return that token as `csrf_token` (DEFERRED.md D-24), and it is saved in
 * a `csrf-token` file beside the cached session so both are reused together.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import type { APIRequestContext } from '@playwright/test';
import {
  getStorageDir,
  getStorageStatePath,
  type AuthOptions,
  type AuthProvider,
} from '@seontechnologies/playwright-utils/auth-session';

import { API_URL, BASE_URL } from './environment';
import { methodPath, unwrap, type FrappeSession } from './frappe';

/** Frappe's session cookie. Renaming this is a backend change, not a test change. */
const SESSION_COOKIE = 'sid';

/**
 * The reserved test identity. Both values are environment-supplied because a committed
 * credential is a committed credential even when the account is fake.
 */
function testIdentity(): { mobile: string; code: string } {
  const mobile = process.env.VENDOR_TEST_MOBILE;
  const code = process.env.VENDOR_TEST_OTP;

  if (!mobile || !code) {
    throw new Error(
      'VENDOR_TEST_MOBILE and VENDOR_TEST_OTP must be set to run the vendor suite. ' +
        'Copy apps/vendor-web/.env.example and fill in the reserved test number and its ' +
        'fixed code. See DEFERRED.md D-24 for the backend side.',
    );
  }

  return { mobile, code };
}

function portalOrigin(baseUrl?: string): URL {
  return new URL(baseUrl ?? BASE_URL);
}

const environmentOf = (options?: Partial<AuthOptions>): string =>
  options?.environment ?? process.env.TEST_ENV ?? 'local';

// One vendor identity today. A second role (a vendor mid-verification, say) becomes a
// second identifier here and a second cached session, not a second provider.
const userOf = (options?: Partial<AuthOptions>): string => options?.userIdentifier ?? 'vendor';

function csrfTokenPath(options?: Partial<AuthOptions>): string {
  return path.join(getStorageDir({ environment: environmentOf(options), userIdentifier: userOf(options) }), 'csrf-token');
}

/**
 * Read the cached session for an identity: the `sid` from the saved storage state and the
 * CSRF token saved beside it. Throws with the fix when either half is missing.
 */
export function readFrappeSession(options?: Partial<AuthOptions>): FrappeSession {
  const identity = { environment: environmentOf(options), userIdentifier: userOf(options) };
  const statePath = getStorageStatePath(identity);
  const state = JSON.parse(readFileSync(statePath, 'utf8')) as { cookies?: Array<{ name: string; value: string }> };
  const sid = state.cookies?.find((c) => c.name === SESSION_COOKIE)?.value;
  if (!sid) {
    throw new Error(`No "${SESSION_COOKIE}" cookie in ${statePath}; the session was never obtained.`);
  }

  const tokenPath = csrfTokenPath(options);
  if (!existsSync(tokenPath)) {
    throw new Error(
      `${tokenPath} is missing, so this session cannot POST. Delete apps/vendor-web/.auth and ` +
        'rerun to sign in afresh.',
    );
  }
  return { sid, csrfToken: readFileSync(tokenPath, 'utf8').trim() };
}

export const vendorOtpProvider: AuthProvider = {
  getEnvironment: environmentOf,

  getUserIdentifier: userOf,

  extractToken: (tokenData) => {
    const cookies = (tokenData as { cookies?: Array<{ name: string; value: string }> }).cookies;
    return cookies?.find((c) => c.name === SESSION_COOKIE)?.value ?? null;
  },

  extractCookies: (tokenData) => {
    const cookies = (tokenData as { cookies?: Array<Record<string, unknown>> }).cookies ?? [];
    return cookies as ReturnType<AuthProvider['extractCookies']>;
  },

  // Frappe's `sid` is opaque — it carries no expiry a client can read. The session is
  // ninety days of inactivity (FR-1), far longer than any suite run, so the only honest
  // answer here is "not expired" and the real check is the 403 a request gets back.
  isTokenExpired: () => false,

  manageAuthToken: async (request: APIRequestContext, options) => {
    const { mobile, code } = testIdentity();
    const origin = portalOrigin(options?.baseUrl);
    const apiBase = API_URL ?? origin.origin;

    // Raw `request` is correct here: the provider runs before the fixtures exist, which is
    // the one place the playwright-utils mandate exempts from `apiRequest`.
    const issuePath = methodPath('vendor', 'request_login_code');
    const issued = await request.post(`${apiBase}${issuePath}`, {
      data: { mobile },
    });

    if (issued.status() === 404) {
      throw new Error(
        `${issuePath} does not exist on ${apiBase}. The vendor suite needs a backend test ` +
          'mode that issues a fixed code for reserved numbers without calling MSG91. ' +
          'See DEFERRED.md D-24.',
      );
    }
    if (!issued.ok()) {
      throw new Error(
        `Requesting a login code for the test vendor failed: ${issued.status()} ${issued.statusText()}. ` +
          `Body: ${(await issued.text()).slice(0, 400)}`,
      );
    }

    const verifyPath = methodPath('vendor', 'verify_login_code');
    const verified = await request.post(`${apiBase}${verifyPath}`, {
      data: { mobile, code },
    });

    if (!verified.ok()) {
      throw new Error(
        `Verifying the login code for the test vendor failed: ${verified.status()} ${verified.statusText()}. ` +
          'A 401 here usually means the reserved number is not registered as a test ' +
          `identity on this site. Body: ${(await verified.text()).slice(0, 400)}`,
      );
    }

    // The session arrives as a cookie; the body still matters. unwrap catches a v2 method that
    // "succeeds" while reporting errors, and the body carries the CSRF token POSTs need.
    const verification = unwrap<{ csrf_token?: string }>(await verified.json(), verifyPath);
    if (!verification.csrf_token) {
      throw new Error(
        `${verifyPath} signed in but returned no csrf_token. Without it every POST under this ` +
          'session is refused with 403. See DEFERRED.md D-24.',
      );
    }

    const sid = (await request.storageState()).cookies.find((c) => c.name === SESSION_COOKIE);
    if (!sid) {
      throw new Error(
        `${verifyPath} returned 2xx but set no "${SESSION_COOKIE}" cookie. The vendor ` +
          'portal cannot hold a session without it.',
      );
    }

    writeFileSync(csrfTokenPath(options), verification.csrf_token);

    return {
      cookies: [
        {
          name: SESSION_COOKIE,
          value: sid.value,
          domain: origin.hostname,
          path: '/',
          httpOnly: true,
          secure: origin.protocol === 'https:',
          sameSite: 'Lax' as const,
        },
      ],
      origins: [],
    };
  },

  clearToken: () => {
    // Sessions are held in the auth-session cache on disk, which `clearAuthToken` removes.
    // There is no in-memory session to drop here, and inventing one would hide that.
  },

  // The browser context takes its base URL from the Playwright config, not from here. This
  // answers auth-session's own lookups with the same value, read from environment.ts, so the
  // two can never disagree about which host the session cookie belongs to.
  getBaseUrl: (options) => options?.baseUrl ?? BASE_URL,
};

export default vendorOtpProvider;
