---
review: versions-and-reality-check
round: 3
target: ARCHITECTURE-SPINE.md
lens: 'Was every committed decision web-researched or reality-checked, or asserted from training data?'
reviewer: quality-gate
date: '2026-09-06'
prior: reviews/review-versions.md
verdict: 'PASS with corrections — all nine new claim clusters check out against the v16.33.0 source and live vendor docs, but three carry a mechanism the spine has mis-stated (rate limiting, session lifetime, transaction control inside doc_events) and one AD names an enforcement that does not touch the risk it names.'
---

# Review — Version & Reality Check (Round 3)

## Verdict

**PASS with corrections.** The nine new ADs are not asserted from training data — every technical claim in them resolves to real machinery in `frappe/frappe@v16.33.0` or to a live vendor page. Round 1's Stack-table corrections have all landed correctly (Frappe v16.33.0, Python `>=3.14,<3.15`, Node ≥24 for the bench).

Three defects are mechanism-level, not fact-level: the spine assumes `@rate_limit` isolates counters per endpoint (it does not, on `/api/v2` routes); it describes `session_expiry` as a per-device 90-day lifetime (it is one site-wide *idle* timeout); and it routes six cross-entity cascades through `doc_events` without noticing that Frappe disables transaction control inside those handlers. A fourth is an enforcement gap: AD-34's stated guard does not defend against the accident AD-34 exists to prevent.

**Method.** `raw.githubusercontent.com/frappe/frappe/v16.33.0` reads of 18 source files; the full recursive git tree at that tag (4302 paths, `truncated: false`) for negatives; GitHub releases and tags API for currency; `frappe/frappe_docker@main` for the MariaDB pin; MariaDB KB and Jira for the NULL semantics; Razorpay's own docs for the payment claims. Nothing below is from memory.

---

## 1. AD-26 — `doc_events` binding a lifecycle event to a handler in another module

### 1a. Binding without the controller importing anything — **CONFIRMED**

`frappe/model/document.py:1651-1662`:

```python
def composer(self, *args, **kwargs):
    hooks = []
    method = f.__name__
    doc_events = frappe.get_doc_hooks()
    for handler in doc_events.get(self.doctype, {}).get(method, []) + doc_events.get("*", {}).get(
        method, []
    ):
        hooks.append(frappe.get_attr(handler))
```

`frappe.get_attr(handler)` resolves a **dotted string** at call time. The controller module contains no reference to the handler, and `frappe.get_doc_hooks()` (`frappe/__init__.py`) reads `get_hooks("doc_events", {})` from every installed app's `hooks.py`, expanding tuple keys to multiple DocTypes and supporting a `"*"` wildcard DocType. AD-26's "the controller imports nothing, so AD-1's direction holds" is exactly right, and the wildcard is an extra affordance the spine does not use.

### 1b. Fires for Frappe Desk edits — **CONFIRMED**

Every core Desk write path goes through the ORM, so `run_method` — and therefore `doc_events` — fires:

| Desk path | Source | Verdict |
| --- | --- | --- |
| Form save / submit / cancel | `frappe/desk/form/save.py:17-42` — `frappe.get_doc(json.loads(doc))` → `doc.submit()` / `doc.save()` | fires |
| Quick edit / list inline edit (`frappe.client.set_value`) | `frappe/client.py` — `doc.update(values)` → `doc.save()` | fires |
| List-view bulk update / bulk submit / bulk cancel | `frappe/desk/doctype/bulk_update/bulk_update.py:_bulk_action` — `frappe.get_doc(...)` → `doc.save()` / `doc.submit()` / `doc.cancel()` | fires |
| Data Import | `frappe/core/doctype/data_import/importer.py:289,291,309` — `new_doc.insert()`, `new_doc.submit()`, `updated_doc.save()` | fires (with `frappe.flags.in_import = True` and emails muted) |

### 1c. Fires for submit and cancel — **CONFIRMED**

`document.py:1391-1419` and `1445-1474`. Every one of these is a `run_method` call and therefore hookable:

| `_action` | before-save phase | post-save phase |
| --- | --- | --- |
| `save` | `before_validate`, `validate`, `before_save` | `on_update`, `on_change` |
| `submit` | `before_validate`, `validate`, `before_submit` | `on_update`, `on_submit`, `on_change` |
| `cancel` | `before_cancel` | `on_cancel`, `on_change` |
| `update_after_submit` | `before_update_after_submit` | `on_update_after_submit`, `on_change` |

`_submit()` / `_cancel()` (`document.py:1327-1335`) set `docstatus` then call `save()`, so submit and cancel are ordinary saves with a different `_action`. AD-12's occupancy-release-on-explicit-cancellation-not-`on_cancel` is therefore a deliberate choice against a hook that genuinely exists and genuinely fires.

### 1d. Does **not** fire for `frappe.db.set_value` — **CONFIRMED**

`frappe/database/database.py`, `set_value()` docstring, verbatim:

> Set a single value in the database, **do not call the ORM triggers** but update the modified timestamp (unless specified not to).
>
> **Warning:** this function will not call Document events and should be avoided in normal cases.

The implementation builds a `frappe.qb` UPDATE and clears the document cache. No `run_method`. AD-16's "`frappe.db.get_value`, `set_value` and `sql` sit below the permission layer entirely" is correct and should be extended one clause: they sit below the *event* layer too, so AD-26's cascades and AD-27's controller guards are both invisible to them.

### 1e. The nuance the spine does not carry — `doc.db_set()` fires two events

`document.py:1543,1567` — `doc.db_set()` runs `before_change` **and** `on_change` while explicitly skipping validation ("*WARNING: This method does not trigger controller validations and should be used very carefully*"). So `db_set` is not silent: a `doc_events` handler bound to `on_change` sees it, but no controller guard does. Anything AD-27 names as "must bind Admin" must not be relied on to also catch a `db_set` write.

### F-1 — `doc_events` handlers cannot commit or roll back — **MEDIUM-HIGH, CONFIRMED**

`document.py:1636-1648`, inside the composed runner:

```python
for f in hooks:
    try:
        frappe.db._disable_transaction_control += 1
        ...
    finally:
        frappe.db._disable_transaction_control -= 1
```

and `database.py:1176-1180`:

```python
def commit(self, *, chain=False):
    """Commit current transaction. Calls SQL `COMMIT`."""
    if self._disable_transaction_control:
        warnings.warn(message=TRANSACTION_DISABLED_MSG, stacklevel=2)
        return
```

`rollback()` behaves the same way. The controller's own method body runs *outside* the counter; only the `doc_events` handlers run inside it.

AD-26 routes **six cross-entity cascades** into `domain/`, and names `doc_events` as the way Desk reaches them. Two of those six — cancelling an Agreement (FR-42) and removing a Vendor (FR-60) — are multi-entity writes where a partial application is the expensive failure. Inside a `doc_events` handler neither `frappe.db.commit()` nor `frappe.db.rollback()` does anything except emit a warning; the only isolation available is `frappe.db.savepoint()` / partial rollback (the comment at `database.py:134-136` says so in as many words: *"Setting this to true will disable full rollback and commit. You can still use savepoint with partial rollback."*).

This is not a contradiction of AD-26 — it is a constraint AD-26 must state, because a `domain/` function written for the `api/` call site (where commit is legal) and then reused from `doc_events` (where it is not) silently loses its transaction boundary.

**Fix:** one clause in AD-26 — *"a `domain/` handler never commits or rolls back; Frappe disables transaction control inside `doc_events` handlers (`document.py:1639`), so isolation inside a cascade is `frappe.db.savepoint()` and nothing else."*

---

## 2. AD-27 — controller hooks genuinely bind Admin

### 2a. They run for Desk edits — **CONFIRMED** (see §1b; the Desk form save path is `doc.save()`).

### 2b. They run for Administrator and System Manager — **CONFIRMED**

`frappe/model/document.py` contains exactly three `Administrator` special cases, at lines 959, 992 and 1026. All three are **permlevel and field-masking** concessions:

- `apply_fieldlevel_read_permissions()` — early return for Administrator
- `_restore_masked_fields_from_db()` — early return for Administrator
- `validate_higher_perm_levels()` — early return for Administrator

None of them touches `run_before_save_methods`, `run_post_save_methods` or `_validate`. **There is no path by which being Administrator skips `validate`, `before_save` or `before_submit`.** `ignore_permissions=True` sets `self.flags.ignore_permissions`, which suppresses `check_permission` and `validate_higher_perm_levels` — and nothing else. AD-27's central premise is sound: the controller is the one layer FR-61's all-capable Admin cannot walk past from Desk.

### 2c. Execution order — **CONFIRMED**, with one ordering the spine should know

`_save()` (`document.py:559-618`) and `insert()` (`438-520`), in order:

```
insert:  _set_defaults → set_user_and_timestamp → set_docstatus → check_permission("create")
         → check_if_latest → _validate_links → before_insert → set_new_name
         → set_parent_in_children → validate_higher_perm_levels
         → [run_before_save_methods] → _validate() → db_insert → children
         → after_insert → [run_post_save_methods]

save:    check_if_locked → _set_defaults → _restore_masked_fields_from_db
         → check_permission("write","save") → set_user_and_timestamp → set_docstatus
         → check_if_latest (sets _action, enforces docstatus transition, re-checks
           "submit"/"cancel" permission) → set_parent_in_children → set_name_in_children
         → validate_higher_perm_levels → _validate_links
         → [run_before_save_methods] → _validate() (unless cancelling)
         → validate_update_after_submit (if applicable) → db_update → update_children
         → [run_post_save_methods]
```

**The ordering worth naming:** the framework's own `_validate()` — mandatory fields, select options, link validity, length, sanitisation — runs **after** the controller's `validate`. A controller guard therefore sees values that have not yet been checked for mandatoriness or option validity. For AD-27's named invariants (an Agreement's two parties are different accounts; a Listing cannot publish without Verification, price, Rules, Commitment) the guard must not assume a field is non-empty because it is marked `reqd`.

### 2d. Paths that skip them — **CONFIRMED, four of them**

| Path | Skips | Reachable from Desk? |
| --- | --- | --- |
| `frappe.db.set_value` / `db.sql` / `qb` update | everything — no ORM triggers at all | No (bench/Server Script only) |
| `doc.db_set()` | `validate`, `before_save`, `before_submit`, `on_update`, `on_submit`; runs `before_change` + `on_change` | No (server code only) |
| `self.flags.ignore_validate = True` | `validate`, `before_save`, `before_submit`, `before_cancel`, `before_update_after_submit` — early return at `document.py:1407`. `before_validate` **still runs** for save/submit | No (server code only) |
| `flags.ignore_validate_update_after_submit` | the `allow_on_submit` immutability check (`document.py:1172`) | No (server code only) |

Bulk operations are **not** on this list — `_bulk_action` and Data Import both use `doc.save()`/`doc.insert()`/`doc.submit()`, so controllers run. This closes the question the round-3 brief raised: AD-27 does not have a bulk-edit hole.

### 2e. The one Desk-adjacent bypass, and its gate — worth one line in the spine

**Server Scripts** run at the same events as `doc_events` (`frappe/core/doctype/server_script/server_script_utils.py` — an `EVENT_MAP` covering `validate`, `before_submit`, `on_submit`, `on_cancel` and 20 more), are authored **in Desk**, and their sandbox exposes `frappe.db.set_value`, `frappe.db.commit` and `frappe.db.rollback` (`frappe/utils/safe_exec.py:565-580`). They cannot delete a controller guard, but a Server Script can write past one.

They are **disabled unless `server_script_enabled` is set** — and, decisively, `is_safe_exec_enabled()` (`safe_exec.py:86-88`) reads it from `common_site_config.json` only: *"server scripts can only be enabled via common_site_config.json"*. An Admin cannot turn them on from Desk. AD-27 holds; the spine should record `server_script_enabled: false` as a deployment invariant beside AD-25, because turning it on silently reopens every AD-27 guard to anyone with the Script Manager role.

---

## 3. AD-11 — duplicate NULLs, and composite UNIQUE in Frappe

### 3a. MariaDB permits unlimited duplicate NULLs in a UNIQUE index — **CONFIRMED**

MariaDB Knowledge Base, *NULL Values*, section "Primary Keys and UNIQUE Indexes", verbatim: **"UNIQUE indexes can contain multiple NULL values."**

This is not version-specific and has not changed: [MDEV-31397](https://jira.mariadb.org/browse/MDEV-31397) — *Implement DISTINCT and NOT DISTINCT for unique NULL handling* — is **Open, Fix Version/s: None** as of today. The SQL:2023 `UNIQUE NULLS NOT DISTINCT` syntax that would let you opt out is unimplemented in every shipping MariaDB. So the spine's stated reason for the `all-day` sentinel is correct for the version Frappe v16 runs and for every version it could plausibly run.

**Version, since the spine leaves `MariaDB | Frappe v16 default` unspecified:** the floor is **10.6** (raised for the v16 line); `frappe/frappe_docker@main` pins **`mariadb:11.8`** in both `pwd.yml` and `overrides/compose.mariadb.yaml`. Given hosting is the spine's top Deferred item and containerised `frappe_docker` is the option it argues for, `11.8` is the concrete number to carry.

### 3b. The Frappe half is *stronger* than the spine says — **CONFIRMED, and worth stating**

The risk is not hypothetical in Frappe v16, because Frappe columns are nullable by default. `frappe/database/schema.py:182`:

```python
NOT_NULL_TYPES = ("Check", "Int", "Currency", "Float", "Percent")
```

Only those five fieldtypes get `NOT NULL`. **`Data`, `Select`, `Link` and `Date` columns are created NULLable.** A `Slot` field — whichever of `Select` or `Link` it is — is nullable unless something intervenes, so an occupancy row written with no slot lands as `NULL` and the four-column UNIQUE index silently permits an unbounded number of them. AD-11's sentinel is load-bearing, not belt-and-braces.

There is a second lever the spine could name: the DocField `not_nullable` checkbox (`frappe/core/doctype/docfield/docfield.json:613`), which makes `schema.py:242-247` emit `NOT NULL DEFAULT <type default>`. **But its `depends_on` excludes `Select`** (along with Check, Currency, Float, Int, Percent, Rating, Table, Table MultiSelect, Attachment Gallery) — so for a `Select` slot column the checkbox is not offered in the UI at all. The sentinel is the right answer; `not_nullable` is the cheaper answer only if `slot` is modelled as a `Link` to a Slot DocType.

### 3c. Composite UNIQUE can only be declared in a patch — **CONFIRMED**

- **`doctype.json`: no.** `frappe/core/doctype/doctype/doctype.json` has no composite-unique or table-constraint field; the string `unique` does not appear in it.
- **DocField `unique`: single column only.** `schema.py:248-249` appends a bare ` UNIQUE` to one column definition. Four fields each marked `unique` gives four independent single-column constraints — which for `(resource, day, slot, seat)` would be catastrophically wrong, not merely insufficient.
- **`frappe.db.add_unique`: yes, and it is a real public API.** `frappe/database/database.py:1382` declares it; `frappe/database/mariadb/database.py` implements it:

  ```python
  def add_unique(self, doctype, fields, constraint_name=None):
      if isinstance(fields, str):
          fields = [fields]
      if not constraint_name:
          constraint_name = "unique_" + "_".join(fields)
      if not self.sql("""select CONSTRAINT_NAME from information_schema.TABLE_CONSTRAINTS
          where table_name=%s and constraint_type='UNIQUE' and CONSTRAINT_NAME=%s""",
          ("tab" + doctype, constraint_name)):
          self.commit()
          self.sql("""alter table `tab{}` add unique `{}`({})""".format(...))
  ```

  It checks `information_schema` first, so the patch is idempotent and safe to re-run — which matters because `bench migrate` will not re-derive it from `doctype.json`, ever.

The Consistency Conventions row ("AD-11's composite unique index ... is a versioned patch in `patches.txt`, never a manual bench step") is therefore **correct and is the only available route**. It should name `frappe.db.add_unique` so the patch author does not reach for raw DDL. Index width is not a concern: `resource` varchar(140) + `day` DATE + `slot` varchar(140) + `seat` int ≈ 1.1 KB against InnoDB's 3072-byte key limit.

---

## 4. AD-12 — `docstatus` immutability and child rows on a submitted document

### 4a. Submitted documents are immutable except `allow_on_submit` fields — **CONFIRMED**

`frappe/model/base_document.py:1272-1290`, `_validate_update_after_submit()`:

```python
if df and not df.allow_on_submit and not df.is_virtual and (self.get(key) or db_value):
    if df.fieldtype in table_fields:
        # just check if the table size has changed
        self_value = len(self.get(key)); db_value = len(db_value)
    else:
        self_value = self.get_value(key)
    if self_value != db_value:
        frappe.throw(_("{0} Not allowed to change {1} after submission from {2} to {3}"),
                     frappe.UpdateAfterSubmitError, title=_("Cannot Update After Submit"))
```

And the `docstatus` transition table itself is enforced independently of any controller, at `document.py:1128-1157`:

- `0 → 0` save · `0 → 1` submit (re-checks `submit` permission) · `0 → 2` raises `DocstatusTransitionError`
- `1 → 1` update-after-submit (re-checks `submit` permission) · `1 → 2` cancel (re-checks `cancel` permission) · `1 → 0` raises `DocstatusTransitionError`
- `2 → anything` raises `ValidationError("Cannot edit cancelled document")`

AD-12's "both-party confirmation moves `docstatus` 0 → 1" and "`docstatus` 2 means a real cancellation and nothing else" are both mechanically supported. The only bypass is `doc.db_set("docstatus", …)`, which skips the transition check entirely — server code only, unreachable from Desk.

### 4b. Frappe **does** permit appending child rows to a submitted document — **CONFIRMED, and it is a hole AD-12 should name**

`frappe/model/document.py:1174-1180`:

```python
for d in self.get_all_children():
    if d.is_new() and self.meta.get_field(d.parentfield).allow_on_submit:
        # in case of a new row, don't validate allow on submit, if table is allow on submit
        continue
    d._validate_update_after_submit()
```

So: a child table field marked `allow_on_submit` accepts **brand-new rows** on a submitted parent, and those rows skip field-level after-submit validation entirely. A table field *not* marked `allow_on_submit` rejects any change in row count (the `len()` comparison above).

The spine's ER diagram models `AGREEMENT ||--o{ AGREEMENT_RECORD` as a separate DocType, not a child table, so AD-12 does not depend on this — and separate linked documents insert freely against a submitted parent, since `get_invalid_links` rejects only links to **cancelled** (`docstatus 2`) documents, never to submitted ones (`base_document.py:1067-1072`). AD-12's design works.

But the corollary is a real defect class for AD-27's "an Agreement's terms are immutable after confirmation": **any child table on `Agreement` marked `allow_on_submit` is a silent hole in that guarantee** — rows can be appended after confirmation and are exempt from after-submit validation. One clause in AD-27: *"no child table on Agreement carries `allow_on_submit`, and no Agreement field does either except those FR-69 explicitly amends."*

---

## 5. AD-17 — `disable_document_sharing` — **CONFIRMED** (re-verified at v16.33.0)

`frappe/core/doctype/system_settings/system_settings.json`: present in `field_order` at index 17, and defined at line 559-564 as `{"default": "0", "fieldname": "disable_document_sharing", "fieldtype": "Check", "label": "Disable Document Sharing"}`. Round 1 confirmed the enforcement point at `frappe/permissions.py:111` and the two share-escape paths (`db_query.py` OR-ing the share condition around `permission_query_conditions`; `false_if_not_shared()` on the document path). AD-17's rewritten wording — "In v16.33 a share is OR-ed around the query conditions on the list path (`db_query.py`) and grants on the document path (`permissions.py`)" — now cites the mechanism rather than the imagined comment round 1 flagged. **Round 1's F-4 is closed.**

---

## 6. AD-28 — session lifetime, phone auth, and minting a session

### 6a. Frappe v16 ships no phone/OTP authentication — **CONFIRMED, strongly**

Full recursive git tree at `v16.33.0`: **4302 paths, `truncated: false`**. Regex over every path for `otp|passwordless|phone_login|sms_login|two_factor|twofactor|webauthn|passkey` returns exactly two files: `frappe/twofactor.py` and `frappe/tests/test_twofactor.py`.

`frappe/twofactor.py` is a **second factor after a password**, not a first factor — `LoginManager.authenticate()` (`auth.py:257-292`) requires `usr` **and** `pwd`, and `should_run_2fa` is consulted only after `User.find_by_credentials(user, pwd)` succeeds. The adjacent System Settings fields are not phone auth either:

- `allow_login_using_mobile_number` — makes the mobile number an alternate *identifier* for a password login.
- `login_with_email_link` — passwordless, but **email**, not phone.

There is **no WebAuthn/passkey support in core at all**, which is a second thing AD-28 must build rather than configure. Google and Apple can go through `User Social Login` + the OAuth machinery under `frappe/integrations/doctype/oauth_*`; passkey cannot.

**AD-28's premise — "Frappe ships no phone auth, so there is no framework default to fall back on" — is CONFIRMED and, if anything, understated.**

### 6b. `@frappe.whitelist(allow_guest=True)` + `frappe.local.login_manager` is the supported way to mint a session — **CONFIRMED**

`frappe/auth.py`:

- `HTTPRequest.set_session()` (line 79) sets `frappe.local.login_manager = LoginManager()` on **every** request, guest included.
- `LoginManager.login_as(user, session_end=None, audit_user=None)` (line 356) — `self.user = user; self.post_login(session_end, audit_user)`.
- `post_login()` (line 171) runs `on_login` triggers, `validate_ip_address`, `validate_hour`, `get_user_info`, `make_session(...)`, `setup_boot_cache`, `set_user_info` — and `set_user_info` calls `cookie_manager.init_cookies()`, which sets the `sid` cookie (`auth.py:394`).

Core uses this exact call for `login_as_guest()` and `impersonate()`. A guest OTP-verify endpoint doing `frappe.local.login_manager.login_as(user)` is using the framework's own mechanism, not a workaround.

Two mechanics AD-28 should absorb:

1. **`login_as` takes `session_end`** — an ISO datetime giving that session an **absolute** expiry, checked at `sessions.py:370-373`. This is the only per-session lifetime lever Frappe has, and it is exactly what "sessions last ninety days per device" needs.
2. **CSRF is not validated for a guest POST.** `validate_csrf_token` (`auth.py`) returns early when `frappe.session.data.csrf_token` is falsy, which it is for the shared Guest session. AD-18's "CSRF is validated only on those verbs" is correct but incomplete — it is validated only on unsafe verbs *and* only for sessions that carry a csrf_token. Every `allow_guest` POST is unprotected by CSRF by construction, which is precisely why AD-30's per-IP rate limiting and fixed-DocType rules are the whole defence. See F-2.

### F-2 — "Sessions last ninety days per device" is not what `session_expiry` is — **MEDIUM, CONFIRMED-with-correction**

Ninety days is **configurable** — `session_expiry` is `hh:mm` with an unbounded hour field (`system_settings.py:129-132` validates only the shape; `sessions.py:501-506` parses `hours*3600 + minutes*60 + seconds`), so `2160:00` is valid. But three properties contradict the spine's sentence:

1. **It is an idle timeout, not a lifetime.** The field's own description: *"Example: Setting this to 24:00 will log out a user if they are not active for 24:00 hours."* `sessions.py:365-373` compares `now - last_updated` against the expiry, and `SessionManager.update()` refreshes `last_updated`. A user who opens the app weekly is never logged out. Default is `170:00` (≈7 days).
2. **It is site-wide, not per device or per client.** One System Settings value governs the Expo app, the vendor portal and Frappe Desk alike. AD-28 binds all three clients; they cannot have different session lifetimes through this setting. The `sid` cookie's `max_age` is derived from the same number (`auth.py:394`).
3. **The per-session lever exists but is different.** `login_as(user, session_end=...)` sets an absolute end stored in the session and enforced at `sessions.py:370-373`. If "ninety days per device" is meant literally — a device signed in on day 0 must re-authenticate on day 90 regardless of use — that is `session_end`, set at OTP-verify time, not `session_expiry`.

**Fix:** replace "Sessions last ninety days per device" with the mechanism actually chosen. Either *"a session idles out after ninety days of inactivity (`session_expiry = 2160:00`, site-wide)"* or *"OTP verification mints a session with an absolute ninety-day `session_end`; idle timeout is separate and site-wide."* They are different products for the user and only one of them is per-device.

---

## 7. AD-30 / AD-31 — `@rate_limit` and background-job idempotency

### 7a. `@rate_limit` exists in v16 — **CONFIRMED**

`frappe/rate_limiter.py:105-114`:

```python
def rate_limit(
    key: str | None = None,
    limit: int | Callable = 5,
    seconds: int = 24 * 60 * 60,
    methods: str | list = "ALL",
    ip_based: bool = True,
):
```

`limit` accepts a callable (so it can read a Settings DocType). Exceeding it raises `frappe.RateLimitExceededError`, which carries `http_status_code = 429` (`frappe/exceptions.py:138-139`). Counters live in Redis with a fixed TTL window — `cache.setex(cache_key, seconds, 0)` then `incrby` — so it is a fixed window, not a sliding one: a caller can spend `limit` at the end of one window and `limit` again at the start of the next.

This is a **different mechanism** from `frappe.conf.rate_limit`, the site-wide `RateLimiter` class in the same file, which is CPU-duration-based (`self.limit = int(limit * 1000000)`, incremented by request microseconds) and returns a bare 429 `Response`. Both are real; only the decorator is per-endpoint.

### F-3 — `@rate_limit` collapses to **one counter per IP across all endpoints** on `/api/v2` routes — **HIGH, CONFIRMED**

`rate_limiter.py:151`:

```python
cache_key = frappe.cache.make_key(f"rl:{frappe.form_dict.cmd}:{identity}")
```

The endpoint's identity in that key is `frappe.form_dict.cmd`. Where does `cmd` come from?

- **v1** sets it: `frappe/api/v1.py:40` — `frappe.form_dict.cmd = method`.
- **v2 does not.** `frappe/api/v2.py handle_rpc_call()` resolves the method and calls `frappe.call(method, **frappe.form_dict)` without ever assigning `cmd`. The string `cmd` does not appear anywhere in `frappe/api/v2.py` or `frappe/api/__init__.py`.
- The only other writer is the legacy `?cmd=` query parameter, which `frappe/app.py:146-152` now answers with a deprecation warning: *"Sending `cmd` for RPC calls is deprecated, call REST API instead"*.

`frappe.form_dict` is a `frappe._dict`, so the missing attribute resolves to `None` rather than raising. **On every `/api/v2/method/...` call the cache key is `rl:None:<ip>[:<key value>]:<seconds>`.**

Consequences, and they land squarely on two ADs:

- **AD-28** commits to "at most five attempts and three resends per hour per number — enforced server-side". Decorate `verify_otp` with `@rate_limit(key="mobile_no", limit=5, seconds=3600)` and `resend_otp` with `@rate_limit(key="mobile_no", limit=3, seconds=3600)` and, on v2, **both share the counter** `rl:None:<ip>:<mobile_no>:3600`. Five total requests across both endpoints, not five and three. The tighter limit silently wins and the looser one is never reached.
- **AD-30** commits to "**Every** `allow_guest=True` method ... is rate-limited per IP", naming OTP issuance, OTP verification, grievance intake, the see-and-correct surface, and the token-addressed guest surfaces. Every one of those decorated with the same `seconds` shares **one bucket per IP**. A family behind a shared CGNAT address filling in an RSVP can exhaust the grievance-intake allowance. Conversely, an attacker gets one budget to spend wherever it is cheapest.
- The `seconds` value is the *only* discriminator, because `cache_key += f":{seconds}"` (line 158). Two endpoints differ only if their windows differ.

This is not a Frappe bug the spine can wait out — it is the interaction between a v1-era decorator and the v2 router, and `CLAUDE.md`/memory commit this project to **v2 only**.

**Fix — one of:**
1. Give every rate-limited endpoint a **distinct `seconds`** (fragile, and abuses a parameter that means something else); or
2. Set `frappe.form_dict.cmd` at the top of each rate-limited method before the decorator body runs — impossible with a bare decorator, so in practice: or
3. **Write a thin project wrapper** — `api/_ratelimit.py` exposing `vs_rate_limit(bucket, limit, seconds, key=None)` that composes its own Redis key from an explicit `bucket` string plus IP plus `form_dict[key]`, and use that everywhere instead of `frappe.rate_limiter.rate_limit`. Roughly twenty lines, and it makes AD-28's "five attempts and three resends" mean what it says.

AD-30's *"Enforced by: `check_whitelisted.py` guest rules (tier 2, once wired)"* should also gain a rule: **a guest endpoint that is rate-limited must name its bucket**, so the gate can catch a bare `@rate_limit` that silently joins the shared counter.

### 7b. `frappe.enqueue` deduplication and `job_id` — **CONFIRMED, with a boundary the spine should know**

`frappe/utils/background_jobs.py:76-133`:

```python
def enqueue(..., job_id: str | None = None, deduplicate=False, ...):
    if deduplicate:
        if not job_id:
            frappe.throw(_("`job_id` paramater is required for deduplication."))
        job = get_job(job_id)
        if job and job.get_status(refresh=False) in (JobStatus.QUEUED, JobStatus.STARTED):
            frappe.logger().error(f"Not queueing job {job.id} because it is in queue already")
            return
        elif job:
            job.delete()
```

- `deduplicate=True` **requires** `job_id` and throws otherwise.
- `create_job_id()` (line 649-661) namespaces every id to the site: `f"{frappe.local.site}||{job_id}"` — so ids are site-scoped and `:` is escaped to `|`.
- `is_job_enqueued(job_id)` (line 664) is the public predicate.

**The boundary:** dedup suppresses only jobs currently `QUEUED` or `STARTED`. A **finished or failed** job with the same id is `job.delete()`d and the new one is enqueued. This is "not already in flight", **not** "run at most once ever". A Subscription-reminder job for the same period, re-enqueued after the first run completed, will run again.

That is precisely why AD-31's *"`frappe.enqueue` jobs are gated **before** enqueueing, not inside the worker"* and *"scheduled jobs are keyed on the period they cover, so a re-run does nothing"* are the right rules — `deduplicate=True` is a cheap first line, not the idempotency guarantee. AD-31 should say so explicitly rather than leave a reader to assume `deduplicate=True` suffices.

**AD-31's worker-context claim is also CONFIRMED:** `execute_job(site, method, event, job_name, kwargs, user=None, ...)` calls `frappe.init(site, force=True, is_job=True)`, `frappe.connect()`, then `frappe.set_user(user)` (lines 239-252). The session user is carried; `frappe.request` is not — so `@rate_limit` (which no-ops without `frappe.request`) and anything reading request headers are inert in a worker.

---

## 8. AD-34 — Razorpay one-time checkout, and Subscriptions as a separate product

### 8a. One-time checkout with no mandate exists — **CONFIRMED**

Razorpay's Payment Gateway / Standard Checkout is the one-time flow: an order is created, the customer authorises that single payment, and no instrument is stored and no mandate registered. It is documented and integrated independently of any recurring product. AD-34's "the integration is one-time checkout per term" is buildable exactly as written.

### 8b. Subscriptions / UPI Autopay is a separate product — **CONFIRMED**

Razorpay's Recurring Payments documentation distinguishes recurring from one-time explicitly — *"Recurring Payments allow you to charge your customers repeatedly without requiring them to enter payment details each time"* — and presents a comparison table separating **Recurring Payments** from the **Subscriptions** product (different scheduling and control models). The mandate rails are four: **UPI Autopay, Cards (tokenised per RBI guidelines), Emandate (netbanking / debit card / Aadhaar), and Paper NACH**. Subscriptions' own docs confirm mandates and tokenisation are integral to that flow.

So the spine's Conflicts row — "Tech-Stack §4 *Later: Razorpay Subscriptions with UPI Autopay / e-mandate* → Forbidden by FR-54 (AD-34). **Tech-Stack needs correcting**" — is factually right, and AD-34's Stack-table line ("Razorpay one-time checkout per term — explicitly not Razorpay Subscriptions, e-mandate or UPI Autopay") names the correct three things.

### F-4 — the accident AD-34 names has no guard — **MEDIUM, gap not error**

Razorpay's recurring-payments documentation states, verbatim: **"All recurring payments methods — Cards, UPI Autopay, Emandate and Paper NACH — are available by default on your Razorpay account."**

So there is **no account-level switch** standing between this platform and a mandate. Adopting one is a matter of passing different parameters to the same SDK — a change an agent implementing FR-13's renewal reminders could make while trying to reduce renewal friction, which is exactly the drift AD-34 exists to prevent.

AD-34's stated enforcement is *"controller guard on issued invoices (tier 1); CL-10 human read (tier 3)"*. A guard on `Invoice` immutability is a good guard for invoice immutability. **It does not touch the mandate risk at all** — a mandate is established at the Razorpay call site, in `api/` or `domain/`, and never appears on an Invoice row.

**Fix:** add a second enforcement to AD-34 that binds where the risk lives:
- a **single Razorpay call site** (the same shape AD-10 uses for availability and AD-21 for messaging) that exposes only order-creation and one-time-payment verification, with no method that can create a Plan, a Subscription, a Token or a mandate; and
- a **repository gate** on the tokens `subscription`, `autopay`, `emandate`, `e-mandate`, `nach`, `mandate`, `recurring` and `token` in the payment module — the same mechanism AD-24 already builds for the banned vocabulary, which makes it nearly free.

That converts "would be a change to FR-54, not an implementation detail" from a statement of intent into something a machine can see broken (UH-14).

---

## 9. Stack table — re-confirmed as of 2026-09-06

| Row | Verdict | Evidence |
| --- | --- | --- |
| Frappe Framework **v16.33.0** | **CONFIRMED — still the head of the line** | GitHub releases: `v16.33.0` published `2026-09-01T17:50:53Z`; GitHub tags: `v16.33.0` is the newest tag on the v16 line, ahead of `v16.32.0` (2026-08-26). `frappe/__init__.py:58` at that tag: `__version__ = "16.33.0"`. No v16.34 tag exists. |
| Python (bench) **≥ 3.14, < 3.15** | **CONFIRMED, verbatim** | `pyproject.toml:7` — `requires-python = ">=3.14,<3.15"` |
| Node (bench) **≥ 24** | **CONFIRMED, verbatim** | `package.json:18-20` — `"engines": { "node": ">=24" }` |
| Node (monorepo) ≥ 20 | CONFIRMED (round 1) | root `engines.node` |
| MariaDB "Frappe v16 default" | CONFIRMED but still under-specified | floor 10.6; `frappe_docker@main` pins `mariadb:11.8` in `pwd.yml` and `overrides/compose.mariadb.yaml` |

**Round 1's F-1 is closed.** The Stack table now splits bench Node from monorepo Node, states Python as a single-minor window rather than a floor, and the Deferred hosting paragraph carries *"The bench needs Python ≥3.14,<3.15 and Node ≥24 — stricter than the monorepo's Node ≥20, a real constraint on the choice, and one that argues for the containerised option."* That is the correction as filed.

**One clause still missing:** the MariaDB row. Given the spine's own argument for `frappe_docker`, `mariadb:11.8` is the number the hosting decision will actually be made against, and `≥ 10.6` is the floor a VPS install must clear. `Frappe v16 default` tells a reader nothing they can check.

---

## 10. Round-1 findings — closure status

| # | Round-1 finding | Status in the current spine |
| --- | --- | --- |
| F-1 | `Node ≥ 20` presented as the platform's constraint | **Closed.** Bench Node ≥24 and Python `>=3.14,<3.15` are separate rows; the Deferred hosting paragraph names them as selection criteria. |
| F-2 | TypeScript 6/7 split forfeits typed linting, unstated | **Closed.** Deferred carries *"The TypeScript 6 / 7 split forfeits typed linting"* with the `<6.1.0` peer range and the tie to AD-4's commit gate. |
| F-3 | "`npm run lint` broken in both apps" was half wrong | **Closed.** Deferred now reads *"crashes in **vendor-web only** — `eslint-plugin-react` against ESLint 10.9.1 (D-1); mobile's lint runs and reports one real `react-hooks/set-state-in-effect` error (D-2)."* |
| F-4 | AD-17 quoted a Frappe comment that does not exist | **Closed.** AD-17 now cites `db_query.py` and `permissions.py` mechanisms instead. |
| F-5 | India recurring-mandate rail unnamed | **Closed by inversion, and better than asked.** AD-34 now forbids mandates outright rather than naming a rail. See F-4 above for the enforcement gap that remains. |
| LOW | Meilisearch BUSL-1.1 / Typesense GPL-3 licences | **Closed.** Deferred: *"Note the licence difference — BUSL-1.1 against GPL-3 — at the point of choosing."* |
| LOW | zod 4.4.3 pinned vs 4.5.4 installed; two React versions; `packages/shared` namespace drift | **Open.** Still not noted anywhere in the spine. Lowest priority of anything in this report, but AD-4 makes zod the client half of the contract and the pinned version is not the resolved one. |

---

## 11. Findings, in priority order

| # | Finding | Severity | Verdict |
| --- | --- | --- | --- |
| **F-3** | `@rate_limit` keys on `frappe.form_dict.cmd`, which `/api/v2` never sets — every rate-limited endpoint shares one counter per IP per window. Breaks AD-28's "five attempts and three resends per hour" and AD-30's per-endpoint guest limits. | **HIGH** | **CONFIRMED** (`rate_limiter.py:151`, `api/v2.py`, `api/v1.py:40`, `app.py:146`) |
| **F-1** | `doc_events` handlers run with `frappe.db._disable_transaction_control` raised; `commit()` and `rollback()` are warned no-ops inside them. AD-26's six cascades reach `domain/` this way and must use savepoints. | **MEDIUM-HIGH** | **CONFIRMED** (`document.py:1639-1646`, `database.py:134-136,1176-1180`) |
| **F-2** | "Sessions last ninety days per device" describes `session_expiry`, which is a single site-wide **idle** timeout in `hh:mm`, refreshed on activity. Per-session absolute expiry is `login_as(..., session_end=…)` — a different lever. | **MEDIUM** | **CONFIRMED-with-correction** (`system_settings.json:252-257`, `sessions.py:365-373,501-506`, `auth.py:356`) |
| **F-4** | AD-34 forbids mandates but enforces only invoice immutability. Razorpay: *"All recurring payments methods … are available by default on your Razorpay account"* — no account-level switch, no repository gate, no single call site. | **MEDIUM** | **CONFIRMED** (product facts) / **gap** (enforcement) |
| **F-5** | A child table on a submitted document marked `allow_on_submit` accepts brand-new rows exempt from after-submit validation. AD-27's "an Agreement's terms are immutable after confirmation" needs the corollary stated. | **MEDIUM** | **CONFIRMED** (`document.py:1174-1180`, `base_document.py:1272-1290`) |
| **F-6** | `server_script_enabled` (common_site_config only) is the one setting that reopens every AD-27 controller guard to a Desk-authored Server Script. Belongs beside AD-25 as a deployment invariant. | **LOW-MEDIUM** | **CONFIRMED** (`safe_exec.py:86-88,565-580`, `server_script_utils.py` EVENT_MAP) |
| **F-7** | MariaDB row still says "Frappe v16 default". Floor is 10.6; `frappe_docker` pins `mariadb:11.8`. The hosting decision the spine defers will be made against a number the spine does not carry. | **LOW** | **CONFIRMED** |
| **F-8** | AD-31 should say that `deduplicate=True` suppresses only `QUEUED`/`STARTED` jobs — a finished job with the same `job_id` is deleted and re-enqueued. It is "not in flight", not "run once". | **LOW** | **CONFIRMED** (`background_jobs.py:119-133`) |
| **F-9** | AD-11 could gain one sentence: Frappe's `NOT_NULL_TYPES` covers only Check/Int/Currency/Float/Percent, so a `Select` slot column is nullable by default and the `not_nullable` checkbox is not offered for `Select`. The sentinel is load-bearing, not defensive. | **LOW** | **CONFIRMED** (`schema.py:182,242-247`, `docfield.json:611-616`) |
| **F-10** | Consistency Conventions should name `frappe.db.add_unique(doctype, fields, constraint_name)` as the composite-index API, since `doctype.json` has no composite option and four `unique` DocFields would produce four wrong constraints. | **LOW** | **CONFIRMED** (`database.py:1382`, `mariadb/database.py`) |
| **F-11** | Carried from round 1, still open: `zod` pinned 4.4.3 / installed 4.5.4 under AD-4; two React versions unremarked; `packages/shared` description says `api.mobile.v1` against AD-3's `api/family/v1`. | **LOW** | CONFIRMED (round 1) |

---

## 12. What the new ADs got right that deserves saying

- **AD-26's central mechanism is exactly right and non-obvious.** "The controller emits its ordinary lifecycle event and `hooks.py` binds that event to the `domain/` handler through `doc_events`. The controller imports nothing" is precisely what `Document.hook`'s `frappe.get_attr(handler)` does. This is the correct way to keep AD-1's arrow pointing one way while still letting Desk trigger a cascade, and it is not the way most Frappe apps are written.
- **AD-27's premise survives every bypass check.** Four write paths skip controller hooks and **none of them is reachable from Frappe Desk**; the three `Administrator` special cases in `document.py` are all permlevel/masking and none touches validation; bulk edit and Data Import both go through `doc.save()`. The rule "any invariant that must bind Admin lives in the controller" is not merely a good idea here — it is the only layer with that property.
- **AD-11's sentinel is better-founded than the spine claims.** The MariaDB fact is true (MDEV-31397 still Open, no `NULLS NOT DISTINCT` in any shipping version) *and* Frappe makes Select/Data/Link columns nullable by default, so the failure mode is one un-set field away rather than hypothetical.
- **AD-28 correctly identifies a genuine absence.** 4302 paths at v16.33.0 and the only OTP-adjacent files are `twofactor.py` and its test. No passwordless phone login, no passkey, nothing. "There is no framework default to fall back on" is exact.
- **AD-31's worker claim is precise.** "The worker inherits the session user but not the request" matches `execute_job`'s `frappe.set_user(user)` after `frappe.init(site, is_job=True)` line for line — including the consequence, which is that `@rate_limit` is inert in a worker.
- **The Stack table's round-1 corrections all landed, verbatim.** `>=3.14,<3.15` and `>=24` are quoted from `pyproject.toml` and `package.json` at the pinned tag, not approximated.

---

## Sources

**Frappe source, `raw.githubusercontent.com/frappe/frappe/v16.33.0`**
`pyproject.toml` · `package.json` · `frappe/__init__.py` · `frappe/app.py` · `frappe/auth.py` · `frappe/sessions.py` · `frappe/permissions.py` · `frappe/rate_limiter.py` · `frappe/exceptions.py` · `frappe/client.py` · `frappe/handler.py` · `frappe/api/__init__.py` · `frappe/api/v1.py` · `frappe/api/v2.py` · `frappe/model/document.py` · `frappe/model/base_document.py` · `frappe/model/db_query.py` · `frappe/database/database.py` · `frappe/database/schema.py` · `frappe/database/mariadb/database.py` · `frappe/database/mariadb/schema.py` · `frappe/utils/background_jobs.py` · `frappe/utils/safe_exec.py` · `frappe/desk/form/save.py` · `frappe/desk/doctype/bulk_update/bulk_update.py` · `frappe/core/doctype/data_import/importer.py` · `frappe/core/doctype/server_script/server_script_utils.py` · `frappe/core/doctype/system_settings/system_settings.{json,py}` · `frappe/core/doctype/docfield/docfield.json` · `frappe/core/doctype/doctype/doctype.json`

**GitHub API** — `repos/frappe/frappe/releases`, `repos/frappe/frappe/tags`, `repos/frappe/frappe/git/trees/v16.33.0?recursive=1` (4302 paths, `truncated: false`)

**frappe_docker** — `raw.githubusercontent.com/frappe/frappe_docker/main/pwd.yml`, `overrides/compose.mariadb.yaml` (`mariadb:11.8`)

**MariaDB**
- [NULL Values — MariaDB Knowledge Base](https://mariadb.com/kb/en/null-values/) — *"UNIQUE indexes can contain multiple NULL values."*
- [MDEV-31397 — Implement DISTINCT and NOT DISTINCT for unique NULL handling](https://jira.mariadb.org/browse/MDEV-31397) — Open, Fix Version/s: None
- [Getting Started with Indexes Guide | MariaDB Documentation](https://mariadb.com/docs/server/mariadb-quickstart-guides/mariadb-indexes-guide)
- [PSA: MariaDB minimum version requirement changed to 10.6 — Frappe Forum](https://discuss.frappe.io/t/psa-mariadb-minimum-version-requirement-changed-to-10-6/98097)

**Razorpay**
- [Recurring Payments](https://razorpay.com/docs/payments/recurring-payments/) — *"All recurring payments methods - Cards, UPI Autopay, Emandate and Paper NACH, are available by default on your Razorpay account."*
- [Subscriptions](https://razorpay.com/docs/payments/subscriptions/) — card tokenisation per RBI guidelines, UPI AutoPay, Emandate
- [Payment Gateway — Standard Web Integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/)
- [UPI Autopay vs Card e-Mandates: 2026 Decision Guide](https://razorpay.com/blog/upi-autopay-vs-card-e-mandates/)
- [Payment Gateway Support for Subscription Businesses: Key Considerations in 2026](https://razorpay.com/blog/payment-gateway-support-for-subscription-businesses-key-considerations-in-2026/)

**Prior round** — `reviews/review-versions.md` (round 1)
