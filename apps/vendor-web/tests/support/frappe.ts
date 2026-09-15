/**
 * The Frappe v2 transport seam for the test suite.
 *
 * Exists because every response from the backend is wrapped. `/api/v2` returns
 * `{ "data": ... }` on success and carries an `errors` array on failure, so a test that
 * reads the response body directly is reading the envelope, not the payload. Unwrapping in
 * one place keeps that detail out of every spec.
 *
 * Two rules from CLAUDE.md §2 are enforced here rather than trusted to the caller:
 *
 *   - Only whitelisted RPC. `methodPath()` builds paths under
 *     `vivahspot_backend.api.*` and there is no helper for `/api/v2/document/{doctype}`.
 *     The generic document API returns the schema, and a binary on ten thousand budget
 *     Androids cannot be redeployed the day a DocType field is renamed.
 *   - `family/v1` keeps its version segment, `vendor` and `guest` do not. That asymmetry is
 *     deliberate: the frozen namespace is the one whose client cannot be redeployed.
 *
 * The app-level `v1` and the transport-level `v2` are different things. Do not unify them.
 */

import { API_URL } from './environment';

/** The three namespaces the clients are allowed to call. */
export type FrappeNamespace = 'family/v1' | 'vendor' | 'guest';

/** Shape of a `/api/v2` response body, both outcomes. */
type FrappeEnvelope<T> = {
  data?: T;
  errors?: Array<{ message?: string; type?: string }>;
  exception?: string;
};

/**
 * Build the path for a whitelisted method.
 *
 * @param namespace  `family/v1`, `vendor` or `guest`
 * @param method     the whitelisted function name, e.g. `list_enquiries`
 */
export function methodPath(namespace: FrappeNamespace, method: string): string {
  const dotted = namespace.replace('/', '.');
  return `/api/v2/method/vivahspot_backend.api.${dotted}.${method}`;
}

/**
 * Pull the payload out of a v2 envelope.
 *
 * Throws rather than returning `undefined` when the envelope carries errors or has no
 * `data` key. A test that silently proceeds on an empty payload reports a UI failure three
 * assertions later, naming the wrong cause.
 */
export function unwrap<T>(body: unknown, context: string): T {
  if (body === null || typeof body !== 'object') {
    throw new Error(`${context}: expected a JSON object from /api/v2, received ${typeof body}`);
  }

  const envelope = body as FrappeEnvelope<T>;

  if (envelope.errors?.length) {
    const detail = envelope.errors.map((e) => e.message ?? e.type ?? 'unnamed error').join('; ');
    throw new Error(`${context}: backend returned errors — ${detail}`);
  }

  if (envelope.exception) {
    throw new Error(`${context}: backend raised ${envelope.exception}`);
  }

  if (!('data' in envelope)) {
    throw new Error(
      `${context}: response has no "data" key. /api/v2 always wraps its payload, so this is ` +
        `either a v1 endpoint or an error shape this helper does not recognise. Body: ` +
        JSON.stringify(body).slice(0, 400),
    );
  }

  return envelope.data as T;
}

/**
 * Page a list response.
 *
 * v2 paginates with `limit` / `start` and reports `has_next_page`. The v1 names
 * (`limit_page_length`, `limit_start`) appear in most tutorials and are wrong here.
 */
export type FrappePage<T> = {
  items: T[];
  has_next_page: boolean;
};

export function pageParams(start: number, limit: number): Record<string, string> {
  return { start: String(start), limit: String(limit) };
}

/**
 * A signed-in Frappe session, in the form a client outside the browser must present it.
 *
 * Frappe's session is the `sid` cookie, and any POST under session auth must also carry
 * `X-Frappe-CSRF-Token`; without it Frappe answers 403, which reads like a permission problem
 * and is not one. `Authorization: Bearer` means nothing to Frappe — its token header is
 * `token key:secret` — so a session is never sent that way.
 */
export type FrappeSession = { sid: string; csrfToken: string };

export function sessionHeaders(session: FrappeSession): Record<string, string> {
  return {
    Cookie: `sid=${session.sid}`,
    'X-Frappe-CSRF-Token': session.csrfToken,
  };
}

/**
 * Everything `apiRequest` needs to call a whitelisted method on the backend.
 *
 * Exists because the portal and the backend sit at different addresses, and `apiRequest`
 * resolves a bare path against Playwright's `baseURL`, which is the portal. Sent there, a method
 * call reaches Next.js and comes back 404 — a failure that reads like a missing endpoint rather
 * than a wrong host. Building the request here pins every call to `API_URL` in one place.
 *
 * Spread the result into `apiRequest` and put per-call options such as `retryConfig` beside it.
 * Omit `session` for a deliberately signed-out call.
 */
export function rpcRequest(
  namespace: FrappeNamespace,
  method: string,
  options: { body?: unknown; session?: FrappeSession } = {},
): { method: 'POST'; baseUrl: string; path: string; body?: unknown; headers: Record<string, string> } {
  if (!API_URL) {
    throw new Error(`rpcRequest(${namespace}, ${method}) needs API_URL. Set it in apps/vendor-web/.env.`);
  }
  return {
    method: 'POST',
    baseUrl: API_URL,
    path: methodPath(namespace, method),
    body: options.body,
    headers: options.session ? sessionHeaders(options.session) : {},
  };
}
