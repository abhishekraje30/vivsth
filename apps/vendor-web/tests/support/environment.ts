/**
 * Where the suite points, resolved once.
 *
 * Two consumers need the same answer: Playwright's config sets `use.baseURL`, and the auth
 * provider needs the portal's host as the domain of the session cookie. If those disagree,
 * the browser holds a cookie it never sends and every signed-in test fails as if signed out,
 * with nothing in the error pointing at a URL.
 *
 * So the value lives here and both read it. If this needs to change, it changes in one
 * place.
 *
 * It is also where `apps/vendor-web/.env` gets loaded, because every process that reads the
 * environment imports this module first: the config, global setup, each worker and the
 * narration reporter. Nothing else loads it — `playwright-utils` calls dotenv against its own
 * package folder, which is why runs used to print "injected env (0)". Variables already set
 * in the real environment win over the file, so CI secrets are never shadowed by a stray
 * local `.env`.
 *
 * `API_URL` has no default on purpose. Unset means "no bench is reachable", which is a
 * supported state: the backend-dependent specs skip themselves and the smoke test runs.
 * Defaulting it would turn that clear skip into a pile of connection-refused failures.
 */
import path from 'node:path';

import { config as loadEnv } from 'dotenv';

loadEnv({ path: path.resolve(__dirname, '../../.env'), quiet: true });

/** The vendor portal itself. */
export const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

/** The Frappe bench serving /api/v2, or undefined when none is reachable. */
export const API_URL = process.env.API_URL;

/** Whether the backend-dependent specs can run at all. */
export const BACKEND_READY = !!API_URL;

export const NEEDS_BENCH =
  'Needs a running vivahspot_backend bench. Set API_URL in apps/vendor-web/.env to run it.';
