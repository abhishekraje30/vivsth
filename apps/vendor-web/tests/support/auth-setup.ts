/**
 * Registers the vendor auth provider, at import time, in whichever process imports it.
 *
 * This file exists because of a process boundary that is easy to miss. Playwright runs
 * `globalSetup` in its own process and then starts worker processes that import the spec
 * files fresh. `createAuthFixtures()` resolves the provider the moment it is called, which
 * happens while a worker is importing its fixtures — long after `globalSetup` finished in a
 * process the worker never shared. Registering only in `globalSetup` therefore throws
 * "no auth provider" in every worker.
 *
 * Importing this module is the registration. Both `global-setup.ts` and `auth-fixture.ts`
 * do, so the provider is in place in every process before anything asks for a token.
 *
 * Ordering inside the module is load-bearing: configure, then register.
 */
import { configureAuthSession, setAuthProvider } from '@seontechnologies/playwright-utils/auth-session';

import { vendorOtpProvider } from './auth-provider';

export const AUTH_ENVIRONMENT = process.env.TEST_ENV ?? 'local';
export const AUTH_USER = 'vendor';

configureAuthSession({
  environment: AUTH_ENVIRONMENT,
  userIdentifier: AUTH_USER,
  storageDir: '.auth',
  cookieName: 'sid',
});

setAuthProvider(vendorOtpProvider);
