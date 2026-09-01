/**
 * @vivahspot/shared — the contract both clients import.
 *
 * Rule (tech-stack §2): clients call only whitelisted methods under
 * `vivahspot_backend.api.mobile.v1.*`, never Frappe's generic document API. A Next.js app
 * can be redeployed the moment a DocType changes; a binary on ten thousand budget Androids
 * cannot. The zod schemas that will live here are that contract.
 */

export * from './tokens.js';
