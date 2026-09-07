---
review: versions-and-reality-check
target: ARCHITECTURE-SPINE.md
lens: 'Was every committed decision web-researched or reality-checked, or asserted from training data?'
reviewer: quality-gate
date: '2026-09-06'
verdict: 'PASS with corrections — the research is real, the Frappe claims are all verifiably true against v16.33.0 source, but three runtime facts in the Stack table are wrong or under-specified.'
---

# Review — Version & Reality Check

## Verdict

**PASS with corrections.** Every version in the Stack table is a real published artefact, and all eight Frappe-specific claims are confirmed line-by-line against the actual `frappe/frappe` v16.33.0 source — this is not training-data assertion. Three defects: the `Node ≥ 20` row is wrong for the bench half of the system (Frappe v16 needs Node ≥ 24 and Python 3.14 exactly), the TypeScript 6/7 split silently forfeits typed linting on the vendor portal for reasons the spine never states, and the spine's own gate audit mischaracterises one of the two lint failures it cites.

Method: npm registry `dist-tags` and publish timestamps for every JS pin; `raw.githubusercontent.com/frappe/frappe/v16.33.0` source reads for every Frappe claim; the full v16.33.0 git tree (4302 paths, untruncated) for the OpenAPI negative; live re-runs of `npm run typecheck` and both lint commands; web search for release status and vendor/product currency.

---

## 1. Stack table vs. reality

### 1a. Client versions vs. what is on disk

Every row matches the declared dependency in `package.json`. The spine's sentence "Client versions read from `package.json` on disk, 2026-09-06" is **accurate**.

| Spine row | Declared on disk | Installed in `node_modules` | npm `latest` | Verdict |
| --- | --- | --- | --- | --- |
| Expo SDK 57.0.11 | `expo: ~57.0.11` | 57.0.18 | 57.0.20 | CONFIRMED |
| React Native 0.86.2 | `0.86.2` (exact) | 0.86.2 | 0.87.1 (`0.86-stable` = 0.86.3) | CONFIRMED |
| React (mobile) 19.2.3 | `19.2.3` (exact) | 19.2.3 | 19.2.8 | CONFIRMED |
| expo-router 57.0.11 | `~57.0.11` | 57.0.17 | — | CONFIRMED |
| NativeWind 4.2.6 | `^4.2.6` | 4.2.6 | — | CONFIRMED |
| Tailwind (mobile) 3.4.17 | `^3.4.17` | 3.4.19 | `v3-lts` = 3.4.19 | CONFIRMED |
| TypeScript (mobile) 6.0.3 | `~6.0.3` | 6.0.3 | (6.0.3 pub. 2026-04-16) | CONFIRMED |
| Next.js 16.3.0 | `16.3.0` (exact) | 16.3.0 | 16.3.4 | CONFIRMED |
| React (web) 19.2.8 | `19.2.8` (exact) | 19.2.8 | 19.2.8 | CONFIRMED |
| Tailwind (web) 4.3.3 | `^4.3.3` | 4.3.3 | 4.3.3 | CONFIRMED |
| TypeScript (web) 7.0.2 | `^7.0.2` | 7.0.2 | 7.0.2 (GA 2026-07-08) | CONFIRMED |
| zod 4.4.3 | `^4.4.3` | 4.5.4 | 4.5.4 | CONFIRMED |
| Node ≥ 20 | root `engines.node: ">=20"` | — | — | **CONTRADICTED — see F-1** |

Source: npm registry `dist-tags` and `time` fields, queried live 2026-09-06.

**Coherence between them: CONFIRMED.** Expo SDK 57 was released 2026-06-30 and is the React Native 0.86 SDK, carrying React 19.2 unchanged from SDK 56 — exactly the triple the spine pins. `next@16.3.0` declares `peerDependencies.react: "^18.2.0 || ... || ^19.0.0"`, so React 19.2.8 is in range. None of these numbers is implausible or unconfirmable.

**LOW — the pins are floors, not what runs.** Four rows drifted upward at install time: `expo` 57.0.11 → 57.0.18, `expo-router` 57.0.11 → 57.0.17, mobile Tailwind 3.4.17 → 3.4.19, `zod` 4.4.3 → **4.5.4** (a minor, hoisted at the workspace root). The zod one matters most: AD-4 makes generated zod schemas the client half of the contract, and the spine pins a version that is not the one in the lockfile tree.

**LOW — two React versions in one workspace.** `19.2.3` (mobile, hoisted to root) and `19.2.8` (vendor-web, nested under `apps/vendor-web/node_modules`). Legitimate for two independent apps, but the Stack table lists both without a word, and a reader will assume a typo. One clause fixes it.

**LOW — `packages/shared` on disk contradicts AD-3.** Its `package.json` description reads *"the zod contract for `vivahspot_backend.api.mobile.v1.*`"*, while AD-3 and AD-4 commit to `api/family/v1`. The spine claims to have read this file; it read the versions but not the namespace drift sitting one line above them.

### 1b. Frappe Framework v16 — CONFIRMED, and currently pinned

- v16 beta 2025-11-15, **final release 2026-01-12**. Fully released and in active maintenance.
- Latest tag as of today: **v16.33.0, published 2026-09-01** (GitHub releases API, `frappe/frappe`). The next tags down are v16.32.0 (2026-08-26) and v16.31.0 (2026-08-11).
- The spine's "v16 (skills verified against v16.33)" is therefore **not merely current — it is the head of the release line, five days old.** The `frappe-whitelisted` skill's footer ("Targets Frappe v16+, verified against v16.33") and `frappe-permissions`' LICENSE note ("the three v16.33 corrections") both check out.

Sources: [Frappe v16 release dates](https://discuss.frappe.io/t/erpnext-hrms-frappe-framework-v16-release-dates/156349), [Announcing Version 16](https://frappe.io/blog/engineering/announcing-version-16), `GET api.github.com/repos/frappe/frappe/releases`.

### 1c. `MariaDB | Frappe v16 default` — CONFIRMED but under-specified

MariaDB remains the production default; `frappe/database/__init__.py` in v16.33.0 dispatches over `mariadb` / `sqlite` / postgres, and **v16 newly ships native SQLite support**. MariaDB ≥ 10.4 and Redis 8 are the stated floors. AD-11's `UNIQUE` index on `(space_or_listing, day, slot)` is supported without qualification.

### 1d. `Python | Frappe v16 default` — CONFIRMED but the number is load-bearing and missing

`pyproject.toml` at v16.33.0: `requires-python = ">=3.14,<3.15"`. That is not a floor, it is a **single-minor window**. See F-1.

---

## 2. Findings

### F-1 — `Node ≥ 20` is the monorepo's constraint presented as the platform's — **MEDIUM-HIGH**

The Stack table interleaves bench rows (Frappe, MariaDB, Python) and client rows (Expo, Next.js) in one list, then gives a single `Node | ≥ 20`. That figure is the root `package.json` `engines` field — the client constraint. The bench has its own, and it is stricter:

- `frappe/frappe@v16.33.0` `package.json`: `"engines": { "node": ">=24" }`. Node 22 or lower will not build v16 assets.
- `pyproject.toml`: `requires-python = ">=3.14,<3.15"` — Python 3.12 and 3.13 both fail.

Two consequences the spine should carry rather than leave to discovery:

1. **This is a hosting constraint, and hosting is the spine's own top Deferred item.** "Frappe Cloud, a self-hosted VPS bench, or containerised `frappe_docker` — choose before the first deploy" is a decision whose feasibility turns on whether the candidate base image ships Python 3.14 *and only* 3.14. On a stock LTS distro that is not a given; it is a live argument for the containerised option the Deferred section already calls out as "most directly unblocks the first two."
2. The row as written will be read by an agent building CI as "Node 20 is fine everywhere," and the bench asset build will fail.

**Fix:** split the row — `Node (clients) ≥ 20` / `Node (bench) ≥ 24` / `Python 3.14.x (Frappe v16 pins `>=3.14,<3.15`)` — and add one clause to the Deferred hosting paragraph naming Python 3.14 as a selection criterion.

Sources: `raw.githubusercontent.com/frappe/frappe/v16.33.0/{pyproject.toml,package.json}`; [Upgrading to Frappe v16](https://medium.com/@prasantpant/how-to-upgrade-frappe-to-v16-a-complete-safe-guide-for-developers-30365fc896f0).

### F-2 — TypeScript 7 on the vendor portal forfeits typed linting, and the spine does not say so — **MEDIUM-HIGH**

Both versions are real: TypeScript **6.0.3** published 2026-04-16 (mobile), TypeScript **7.0.2** GA 2026-07-08 (web) — the native Go compiler, 8–12× faster full builds. Neither is implausible. But the split is a committed decision whose cost is not recorded:

- **TypeScript 7.0 ships without a stable programmatic compiler API** (expected in 7.1). `typescript-eslint` declined support on GA day; the installed `typescript-eslint@8.69.0` in this repo declares `peerDependencies.typescript: ">=4.8.4 <6.1.0"`.
- `apps/vendor-web` pins `typescript: ^7.0.2` **and** `eslint: ^10.8.1` + `eslint-config-next: 16.3.0`, whose `eslint.config.mjs` composes `eslint-config-next/typescript`. Every type-aware rule in that config is outside the supported range.
- `apps/mobile` pins `~6.0.3` — inside the range. This is precisely why mobile lint works and vendor-web's does not.

The Stack table presents `TypeScript (mobile) 6.0.3` and `TypeScript (web) 7.0.2` as neutral facts. They are a fork with a consequence, and the consequence lands on AD-4: the codegen-diff commit gate and the "reviewable diff" that makes generated zod trustworthy both assume a working lint/tooling chain on the web side.

**Fix:** add one sentence to the Stack section — *"vendor-web is on TypeScript 7 (native compiler); `typescript-eslint` does not support it until the 7.1 programmatic API, so typed lint rules are unavailable there. Deliberate; revisit at 7.1."* Or downgrade vendor-web to the 6.0.x line and align both apps. Either is fine; silence is not.

Sources: [Microsoft Releases TypeScript 7.0](https://www.infoq.com/news/2026/08/typescript-7-released/), [Why Your TypeScript 7 Upgrade Broke ESLint](https://devencyclopedia.com/blog/typescript-7-broke-eslint-ts-jest-ts-morph); `node_modules/typescript-eslint/package.json` peer range read locally.

### F-3 — "npm run lint is broken in both apps" is half wrong — **MEDIUM**

The spine's Deferred section states: *"Verified 2026-09-06: only `npm run typecheck` passes. `npm run lint` is broken in both apps (D-1, D-2)."* Re-run today:

- `npm run typecheck` — **exit 0** across all three workspaces. CONFIRMED.
- `apps/vendor-web` — **genuinely crashes.** `ESLint: 10.9.1 → TypeError: Error while loading rule 'react/display-name': contextOrFilename.getFilename is not a function` in `eslint-plugin-react/lib/util/version.js`. A plugin-vs-ESLint-10 API break, *not* a TypeScript 7 problem — so D-1 is fixable independently of F-2, and the two blockers should not be conflated.
- `apps/mobile` — **`expo lint` runs correctly** and reports one real finding: `react-hooks/set-state-in-effect` at `src/hooks/use-color-scheme.web.ts:11`. The linter is healthy; the code has a defect.

`DEFERRED.md` gets this right (D-1 is "`npm run lint` crashes in vendor-web", D-2 is "`react-hooks/set-state-in-effect` in the mobile app"). The spine compressed a crashed linter and a working linter's finding into one phrase, which understates the mobile tooling and hides the vendor-web root cause. A reader trusting the spine would go looking for two broken linters and find one.

### F-4 — The share-precedence claim is right; the attribution is not — **LOW**

AD-17 says: *"Frappe's own comment is that shared docs trump all other restrictions."* That wording does not appear in v16.33.0. The nearest actual comment, at `frappe/model/db_query.py:1085`, is:

```python
# share is an OR condition, if there is a role permission
if not only_if_shared and self.shared and conditions:
    conditions = f"(({conditions}) or ({self.get_share_condition()}))"
```

**The substance is nonetheless CONFIRMED, on both paths**, which is what AD-17 actually needs:

- **List path:** `conditions` at that point already contains the match conditions *and* `get_permission_query_conditions()`. The share condition is OR'd around the whole thing — so a DocShare row does escape `permission_query_conditions`.
- **Document path:** `frappe/permissions.py:207-209` — `if not perm and not ignore_share_permissions: perm = false_if_not_shared()`. A share grants read where role permissions and User Permissions denied.

So AD-17's decision (turn `disable_document_sharing` on site-wide because FR-5 promises a Wedding is unreachable without access) is correctly grounded. Only the quotation should go — reword to cite the mechanism rather than an imagined comment.

### F-5 — Razorpay is confirmed, but the India recurring-mandate rail is an unnamed dependency — **LOW-MEDIUM (gap, not error)**

Razorpay Standard Checkout is the current, non-deprecated integration for Subscriptions; the official integration guide names it as *the* flow for obtaining authorisation to charge at periodic intervals, with no deprecation notice anywhere on the page. CONFIRMED.

What the docs page does **not** cover, and the spine does not either: what actually authorises a recurring rupee charge in India — UPI Autopay vs. card e-mandate vs. net-banking e-mandate, each with its own limits, pre-debit notification rules and success rates. For a product whose entire revenue model is FR-13's vendor Subscription with 30/14/7/1-day reminders and a Grace Period (AD-23), the mandate rail is the thing that determines how often a renewal silently fails. It belongs beside NFR 5.9's "payment merchant account" business input, named.

Source: [Razorpay — Integrate With Subscriptions](https://razorpay.com/docs/payments/subscriptions/integration-guide/).

---

## 3. Frappe-specific claims — all eight CONFIRMED against v16.33.0 source

Read directly from `raw.githubusercontent.com/frappe/frappe/v16.33.0`. This is the strongest part of the spine: none of it is asserted from memory.

| # | Claim (spine location) | Verdict | Evidence |
| --- | --- | --- | --- |
| 1 | Annotations on `@frappe.whitelist()` are validated via Pydantic and **coerce** (AD-4) | **CONFIRMED** | `frappe/utils/typing_validations.py` — `from pydantic import TypeAdapter as PydanticTypeAdapter`; `transform_parameter_types()` runs `TypeAdapter(current_arg_type).validate_python(current_arg_value)` and writes back with the comment *"update the args and kwargs with possibly casted value"*. AD-4's "load-bearing, not documentation" is exactly right. |
| 2 | `has_permission` hooks cannot grant; a `None` return **denies** (AD-15) | **CONFIRMED** | `frappe/permissions.py:489-498` — `for method in reversed(methods): controller_permission = frappe.call(...)`; `if not controller_permission: return bool(controller_permission)`. `None` is falsy → returns `False`. All-truthy returns `True`, which is then AND-ed with the role/User-Permission/share layers in `has_permission()`, so a hook can only decline to deny. |
| 3 | `frappe.get_all` forces `ignore_permissions=True` and removes the row cap (AD-16) | **CONFIRMED, verbatim** | `frappe/__init__.py:1403-1406` — `kwargs["ignore_permissions"] = True`; `if "limit_page_length" not in kwargs: kwargs["limit_page_length"] = 0`. Docstring: *"Will **not** check for permissions."* |
| 4 | Frappe commits only on POST/PUT/PATCH/DELETE; a `methods=["GET"]` handler that writes is rolled back (AD-18) | **CONFIRMED** | `frappe/auth.py:28-29` — `SAFE_HTTP_METHODS = {"GET","HEAD","OPTIONS"}`, `UNSAFE_HTTP_METHODS = {"POST","PUT","DELETE","PATCH"}`. `frappe/app.py:458-468` `sync_database()` — `if frappe.local.request.method in UNSAFE_HTTP_METHODS or frappe.local.flags.commit: db.commit() else: db.rollback(chain=True)`. |
| 5 | `/api/v2/method` wraps responses in `data` (Consistency Conventions) | **CONFIRMED** | `frappe/api/__init__.py` `handle()` — `if data is not None: frappe.response["data"] = data` before `build_response("json")`. The convention "return a plain dict and let Frappe wrap it — never build the envelope by hand" is correct. |
| 6 | `disable_document_sharing` exists in System Settings (AD-17) | **CONFIRMED** | `frappe/core/doctype/system_settings/system_settings.json` — `{"fieldname": "disable_document_sharing", "fieldtype": "Check", "default": "0"}`, in `field_order`. Enforced at `frappe/permissions.py:111`. Also `DF.Check` in the v16 type stub. |
| 7 | Submittable: `docstatus` 0/1/2; amendment is cancel-then-amend via `amended_from` (AD-12, AD-13) | **CONFIRMED** | `frappe/model/docstatus.py` — `DRAFT=0, SUBMITTED=1, CANCELLED=2`. `frappe/model/document.py:620-625` `validate_amended_from()` throws *"cannot be amended because it is not cancelled"* unless the source doc's `docstatus == 2`. **This is the exact mechanism AD-13 is built on** — `docstatus 2` genuinely does mean "amended" as often as "cancelled", so AD-13's separate cancellation-count field is well-founded, not defensive. |
| 8 | Frappe core ships **no** OpenAPI/Swagger endpoint | **CONFIRMED** | Full recursive git tree at tag v16.33.0: **4302 paths, `truncated: false`, zero matches** for `openapi` or `swagger`. Also absent from `frappe/api/__init__.py` and `frappe/api/v2.py`. Only community apps exist ([omkardarves/swagger](https://github.com/omkardarves/swagger), `frappe_doc`), and the 2020 request [frappe/frappe#9805](https://github.com/frappe/frappe/issues/9805) is still the state of the art. AD-4's "generate `contract/family.v1.json` from the annotated signatures" is therefore genuinely necessary, not reinvention. |

### Two caveats worth one clause each (neither contradicts the spine)

- **#1 — Pydantic validation is looser than it reads.** `transform_parameter_types()` *skips* `ForwardRef`/`str` annotations entirely; applies `SLACK_DICT` slack for `bool` (accepts `int`/`bool`/`float`); and **unions the default's type into the accepted set**, so `def f(x: int = None)` accepts `None`. Annotations are real validation, but they are not a strict schema — AD-18's "every method gates every document it touches" is doing more work than AD-4's annotations, and should stay that way.
- **#4 — there is an escape hatch.** `frappe.local.flags.commit` also forces a commit, so a `GET` handler *can* commit if it sets that flag. The spine's claim holds for the default path; "unless it sets `frappe.local.flags.commit`" makes it precise.

---

## 4. Named technology — real, current, and appropriate for India, September 2026

| Technology | Stated use | Verdict | Notes |
| --- | --- | --- | --- |
| **Razorpay standard checkout** | Subscriptions only | **CONFIRMED** | Current documented integration; no deprecation. Gap: mandate rail unnamed (F-5). |
| **WhatsApp Business Cloud API** | Vendor/Family notifications (AD-21) | **CONFIRMED** | Per-message pricing since 2025-07-01. India moved to INR billing 2026-01-01: ≈ ₹1.09 marketing, ≈ ₹0.145 utility/authentication per delivered template; utility/auth have monthly volume tiers, marketing has none by design. Two things this validates: (a) AD-21's account-restriction risk is live and correctly identified as a single point of failure for the whole vendor side; (b) enquiry notifications fall in the cheap **utility** category, and the discipline of never addressing a Guest is exactly what keeps them there. |
| **MSG91 for OTP** | Phone OTP | **CONFIRMED** | India's largest SMS infrastructure provider, DLT-compliant, with managed DLT template registration. Note: MSG91 itself offers multi-channel OTP with SMS/WhatsApp/voice failover — which partly overlaps the spine's separately-named "WhatsApp Business Cloud API + SMS fallback" and may collapse one integration. |
| **MariaDB** | Frappe default DB | **CONFIRMED** | Production default in v16; ≥ 10.4 floor. v16 also ships native SQLite (dev/lightweight). Supports AD-11's `UNIQUE` index. |
| **Meilisearch / Typesense** | Deferred search swap behind `search_listings()` | **CONFIRMED** | Both actively maintained in 2026. Meilisearch: Rust, MIT/BUSL-1.1, memory-mapped storage (working set not RAM-capped). Typesense: C++, **GPL-3**, index held in RAM. The licences differ materially — BUSL-1.1 and GPL-3 are both things that decide a swap for a commercial product, and neither is mentioned. Worth one clause in the Deferred entry, since the spine's whole argument is that the swap stays a one-file change. |
| **RFC 3161 timestamp authority** | Deferred, for AD-12 evidential timestamping | **CONFIRMED** | RFC 3161 (IETF, X.509 PKI Time-Stamp Protocol) is current and widely implemented. India-appropriate providers exist — **eMudhra** delivers RFC 3161 timestamping domestically, alongside GlobalSign, DigiCert and the open-source sigstore TSA. RFC 3161 is also what Indian DSC-signed PDFs embed for long-term validity, which is directly the FR-43 use case. The deferral is sound and the trigger ("first time an Agreement record is needed as evidence") is actionable — the dependency is real and procurable, not speculative. |

---

## 5. What the spine got right that deserves saying

- **Nothing in the Stack table is invented.** Every version resolves to a real published artefact with a real publish date. Given how easily a 2026 stack table becomes fiction, this is the finding that matters most.
- **The Frappe claims are source-verified, not remembered.** All eight check out against v16.33.0 line-for-line, including the two subtle ones — `None` denying in `has_permission`, and `get_all` removing the row cap as well as the permission check. AD-13's premise (that `docstatus 2` conflates "amended" with "cancelled") is confirmed by `validate_amended_from()` and is the kind of thing that is normally discovered in production.
- **The version pin is at the head of the line.** v16.33 was tagged five days before this spine was written.
- **The gate audit is honest and mostly accurate.** `npm run typecheck` does pass, today, exit 0. Only the "broken in both apps" phrasing needs correcting (F-3).

---

## 6. Recommended edits, in priority order

1. **F-1** — Split the `Node ≥ 20` row into client (≥ 20) and bench (≥ 24); add `Python 3.14.x` with the `>=3.14,<3.15` pin; add Python 3.14 to the Deferred hosting selection criteria.
2. **F-2** — One sentence in the Stack section recording that vendor-web's TypeScript 7 forfeits `typescript-eslint` support until the 7.1 programmatic API, or align both apps on 6.0.x.
3. **F-3** — Correct the Deferred line: vendor-web's linter crashes (`eslint-plugin-react` × ESLint 10); mobile's linter works and reports one real finding.
4. **F-4** — Reword AD-17 to cite the mechanism (`db_query.py` OR-ing the share condition around `permission_query_conditions`; `false_if_not_shared()` on the document path) instead of a Frappe comment that does not exist.
5. **F-5** — Name the India recurring-mandate rail (UPI Autopay / e-mandate) beside NFR 5.9's payment merchant account.
6. **LOW** — Note the two React versions; note the installed-vs-declared drift, especially `zod` 4.4.3 → 4.5.4 given AD-4; fix `packages/shared`'s description (`api.mobile.v1` → `api/family/v1`) or record it as drift; add the Meilisearch BUSL-1.1 / Typesense GPL-3 licence note to the search Deferred entry.

---

## Sources

- npm registry (`registry.npmjs.org`) — `dist-tags` and `time` for next, expo, react-native, react, typescript, zod, tailwindcss; peer ranges for `next@16.3.0`, `typescript-eslint@8.69.0`
- `raw.githubusercontent.com/frappe/frappe/v16.33.0` — `frappe/__init__.py`, `frappe/permissions.py`, `frappe/auth.py`, `frappe/app.py`, `frappe/api/__init__.py`, `frappe/api/v2.py`, `frappe/model/db_query.py`, `frappe/model/document.py`, `frappe/model/docstatus.py`, `frappe/utils/typing_validations.py`, `frappe/database/__init__.py`, `frappe/core/doctype/system_settings/system_settings.{json,py}`, `pyproject.toml`, `package.json`
- GitHub API — `repos/frappe/frappe/releases`, `repos/frappe/frappe/tags`, `repos/frappe/frappe/git/trees/v16.33.0?recursive=1`
- Local repo — `package.json` ×4, `node_modules` resolved versions, `apps/vendor-web/eslint.config.mjs`, `DEFERRED.md`; live runs of `npm run typecheck`, `npx eslint .`, `npx expo lint`
- Skills — `~/.claude/skills/frappe-whitelisted/{SKILL.md,references/*}`, `~/.claude/skills/frappe-permissions/references/permission-hooks-reference.md`
- [Frappe v16 release dates](https://discuss.frappe.io/t/erpnext-hrms-frappe-framework-v16-release-dates/156349) · [Announcing Version 16](https://frappe.io/blog/engineering/announcing-version-16) · [Upgrading to Frappe v16](https://medium.com/@prasantpant/how-to-upgrade-frappe-to-v16-a-complete-safe-guide-for-developers-30365fc896f0)
- [Expo SDK 57 changelog](https://expo.dev/changelog/sdk-57) · [Expo SDK 57](https://expo.dev/sdk/57)
- [Microsoft Releases TypeScript 7.0 with a Native Go Compiler](https://www.infoq.com/news/2026/08/typescript-7-released/) · [Why Your TypeScript 7 Upgrade Broke ESLint, ts-jest, and ts-morph](https://devencyclopedia.com/blog/typescript-7-broke-eslint-ts-jest-ts-morph)
- [Razorpay — Integrate With Subscriptions](https://razorpay.com/docs/payments/subscriptions/integration-guide/)
- [WhatsApp Business API Pricing in 2026](https://blueticks.co/blog/whatsapp-business-api-pricing-2026) · [AiSensy — India pricing](https://aisensy.com/pricing)
- [MSG91 OTP Authentication API](https://msg91.com/in/otp) · [OTP SMS API India (2026), DLT-compliant](https://www.springedge.com/otp-sms-api-india)
- [Meilisearch vs Typesense](https://www.meilisearch.com/docs/resources/comparisons/typesense) · [Meilisearch vs Typesense vs Elasticsearch 2026](https://ossalt.com/blog/meilisearch-vs-typesense-vs-elasticsearch-search-2026)
- [eMudhra — Time Stamping Services](https://emudhra.com/en/blog/time-stamping-services-signed-documents) · [RFC 3161 Timestamp in PDF Signing in India](https://pdfsign.in/blog/rfc-3161-timestamp-pdf-india) · [sigstore/timestamp-authority](https://github.com/sigstore/timestamp-authority)
- [OpenAPI/Swagger generation for Frappe REST API (#9805)](https://github.com/frappe/frappe/issues/9805) · [omkardarves/swagger](https://github.com/omkardarves/swagger)
