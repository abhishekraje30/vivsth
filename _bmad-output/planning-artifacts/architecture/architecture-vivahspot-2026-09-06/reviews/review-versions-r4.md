---
review: versions-and-reality-check
round: 4
target: ARCHITECTURE-SPINE.md
lens: 'No claim asserted from training data. Verify every NEW technical claim against the bench on disk.'
reviewer: quality-gate
date: '2026-09-06'
prior: reviews/review-versions-r3.md
bench: /home/abhishekraje30/frappe-bench (frappe grafted at tag v16.33.0, commit 33bf510b, 2026-09-01)
verdict: 'CHANGES REQUIRED — six of the nine claim clusters confirm cleanly against the bench source, but three assert framework behaviour that does not exist: Frappe logs no reads (AD-32), Frappe has no startup hook (AD-27), and Frappe ships three guest-reachable alternate authentication paths that AD-28 says are absent.'
---

# Review — Version & Reality Check (Round 4)

## Verdict

**CHANGES REQUIRED.**

Round 3 verified the version pins and nine claim clusters against the GitHub tree at tag `v16.33.0`.
Round 4 read the **bench on disk** — `/home/abhishekraje30/frappe-bench/apps/frappe`, grafted at
`v16.33.0` (commit `33bf510b`, 2026-09-01) — and, where a claim was about the *database* rather than
the framework, executed it against the running MariaDB 11.8.6 the bench uses.

Six clusters confirm. Three carry a claim about what the framework provides that the framework does
not provide:

| # | Claim | Verdict | Severity |
| --- | --- | --- | --- |
| F-1 | AD-32 — "every read is logged, Desk included"; breach victims "enumerated from those logs" | **CONTRADICTED** | **CRITICAL** |
| F-2 | AD-27 — `allow_on_submit` forbidden by "a startup check that refuses to boot" | **CONTRADICTED** | **HIGH** |
| F-3 | AD-28 — "No password exists on any surface, so there is no reset flow to attack" | **CONTRADICTED** | **HIGH** |
| F-4 | AD-12 — `on_trash` closes the ordinary deletion route | **CONFIRMED, with the bypass list wrong** | MEDIUM |
| F-5 | AD-36 — `is_tree` / NestedSet gives a `lft`/`rgt` range query | **CONFIRMED, with two traps unstated** | MEDIUM |
| F-6 | Consistency Conventions — composite unique index "is a versioned patch in `patches.txt`" | **CONFIRMED but not idiomatic** | LOW |

Everything else — AD-26's three sub-claims, AD-11's index and NULL semantics, AD-28's `autoname` and
`mobile_no unique`, AD-32's `permlevel`, AD-35's `search_index`, and the whole Stack table — checks
out, several of them now by direct execution rather than by reading.

**Method.** 21 source files read from the bench at `/home/abhishekraje30/frappe-bench/apps/frappe`;
one live MariaDB 11.8.6 session against the site database `_620a1226bf56a69a` for the two claims that
are about the database and not about Frappe; `git describe` and the venv interpreter for the version
pins. Line numbers below are the bench's own. Nothing here is from memory or from the web.

---

## 1. AD-26 — cascades invoked only through `doc_events`

### 1a. `doc_events` fires on the ordinary save path, so an `api/` method that changes a document does trigger it — **CONFIRMED**

The chain is unbroken and has no branch that skips hooks:

`Document.save()` → `_save()` → `run_before_save_methods()` (`frappe/model/document.py:1391`) and
`run_post_save_methods()` (`document.py:1445`). Both bodies consist of `self.run_method(...)` calls
and nothing else:

```
document.py:1409-1418   _action "save"    → run_method("validate"), run_method("before_save")
document.py:1459-1461   _action "save"    → run_method("on_update")
document.py:1471        every action      → run_method("on_change")
```

`run_method` (`document.py:1245`) wraps the controller's own method in `Document.hook(fn)`
(`document.py:1613`), whose `composer` (`document.py:1651-1662`) reads
`frappe.get_doc_hooks()[self.doctype][method]` and resolves each dotted string with
`frappe.get_attr`. There is no `if frappe.local.request` guard, no `in_api` check, no way for the
call site to opt out.

So AD-26's central architectural bet holds exactly as written: **the API route and the Desk route are
the same route.** An `api/` method that does `frappe.get_doc(...).save()` fires the identical handler
list that a Desk form save fires. `api/` genuinely does not need to call the cascade, and if it did,
the cascade would run twice.

One boundary worth writing into AD-26 because it is the way this invariant will actually be broken:
`doc.db_set()` (`document.py:1543`) runs `before_change` and `on_change` while skipping validation
entirely, and `frappe.db.set_value()` runs no events at all (`frappe/database/database.py`,
`set_value` docstring: *"do not call the ORM triggers"*). AD-26 already names the second. It does not
name the first, and `db_set` is the one an implementer reaches for inside a controller.

### 1b. `frappe.flags` is a per-request object suitable as a re-entrancy guard — **CONFIRMED**

`frappe/__init__.py:76` — `local = Local()` (werkzeug). `frappe/__init__.py:115` —
`flags: LocalProxy[FlagsDict] = local("flags")`. So `frappe.flags` is greenlet/thread-scoped, not
process-scoped: two concurrent requests in the same gunicorn worker cannot see each other's flags.

**What resets it**, exhaustively:

| Boundary | Source | Effect |
| --- | --- | --- |
| HTTP request start | `frappe/app.py:217` — `frappe.init(site, …, force=True, is_request=True)` | `force=True` → `release_local(local)` (`__init__.py:157-158`), then `local.flags = _dict({…})` (`__init__.py:169`) — a **fresh dict** |
| Background job start | `frappe/utils/background_jobs.py:244` and `:310` — `frappe.init(site, force=True, is_job=True)` | same |
| Job / context teardown | `background_jobs.py:287`, `:317`; `frappe.destroy()` (`__init__.py:330-336`) | `release_local(local)` |

Nothing else resets it. Specifically **`frappe.db.rollback()` does not clear flags**, and neither
does `app.py`'s exception handler (`app.py:180-184` sets `response` and calls `db.rollback(chain=True)`,
and touches no flag). Consequence for AD-26: a guard flag set at the top of a cascade and left set by
a raising handler **stays set for the remainder of that request** — the next cascade on the same
request is then wrongly suppressed. The flag must be released in a `finally`, not on the success
path. It is safe *across* requests because `init(force=True)` discards the whole local.

Frappe uses this exact pattern itself, which is the prior art to imitate:
`frappe.flags.currently_saving` is a list of `(doctype, name)` appended at `document.py:818` and
removed at `document.py:1476-1477`, read at `document.py:1532` to decide whether a `db_set` should
bump `modified`. A `set` of the cascade's `(doctype, name)` rather than a boolean is the idiom here,
and it also gives the per-document granularity a boolean loses.

### 1c. Savepoints work inside a `doc_events` handler even though transaction control is disabled — **CONFIRMED**

Round 3 established that `Document.hook`'s runner increments `frappe.db._disable_transaction_control`
around each handler (`document.py:1636-1645`). Round 4 confirms the escape hatch is real and is not
accidental:

`frappe/database/database.py:1195-1216`, `rollback()`:

```python
def rollback(self, *, save_point=None, chain=False):
    """`ROLLBACK` current transaction. Optionally rollback to a known save_point."""
    if save_point:
        self.sql(f"rollback to savepoint {save_point}")
        self.value_cache.clear()
    elif not self._disable_transaction_control:
        ...
    else:
        warnings.warn(message=TRANSACTION_DISABLED_MSG, stacklevel=2)
```

The `save_point` branch is tested **first** and never consults `_disable_transaction_control`.
`savepoint()` (`database.py:1219-1227`) and `release_savepoint()` (`database.py:1229-1230`) are bare
`self.sql(...)` calls with no guard at all. The constructor comment (`database.py:134-136`) states the
intent in as many words: *"Setting this to true will disable full rollback and commit. You can still
use savepoint with partial rollback."*

There is a ready-made context manager: `frappe.database.database.savepoint(catch=Exception)`
(`database.py:1576-1598`), which generates a random 10-letter savepoint name, yields, rolls back to it
on `catch` and releases it otherwise. AD-12's set-difference amendment should use it by name rather
than hand-rolling savepoint strings.

**Two caveats AD-26 should carry**, both from the source:

1. `savepoint()`'s own docstring (`database.py:1224-1226`): *"rollback watchers can not work with save
   points. so only changes to database are undone when rolling back to a savepoint. Avoid using
   savepoints when writing to filesystem."* A cascade that has already written an object to R2 (AD-29)
   or queued a WhatsApp send does **not** get that undone by a savepoint rollback.
2. `frappe.db.add_unique` and `add_index` call `self.commit()` internally
   (`frappe/database/mariadb/database.py:437`, `:455`) — so they are patch-time calls only and must
   never appear on a request path or inside a handler, where the commit is a warned no-op.

---

## 2. AD-11 — `held_by` and a composite UNIQUE index

### 2a. A composite unique index can be created, and `frappe.db.add_unique`'s signature — **CONFIRMED**

`frappe/database/database.py:1382` declares the abstract signature; the MariaDB implementation is
`frappe/database/mariadb/database.py:444-459`:

```python
def add_unique(self, doctype, fields, constraint_name=None):
    if isinstance(fields, str):
        fields = [fields]
    if not constraint_name:
        constraint_name = "unique_" + "_".join(fields)

    if not self.sql(
        """select CONSTRAINT_NAME from information_schema.TABLE_CONSTRAINTS
        where table_name=%s and constraint_type='UNIQUE' and CONSTRAINT_NAME=%s""",
        ("tab" + doctype, constraint_name),
    ):
        self.commit()
        self.sql(
            """alter table `tab{}`
                add unique `{}`({})""".format(doctype, constraint_name, ", ".join(fields))
        )
```

So the call AD-11 needs is exactly:

```python
frappe.db.add_unique("Occupancy", ["resource", "day", "slot", "seat"])
```

`fields` is a list, joined with commas into one `ADD UNIQUE` — a genuine four-column composite. The
`information_schema` pre-check makes it **idempotent**, so re-running the patch is a no-op.

**It survives `bench migrate`, and this is not luck.** The schema syncer's drop-index logic
(`frappe/database/mariadb/schema.py:129-146`) only ever drops an index that
`frappe.db.get_column_index(table, fieldname, unique=…)` returns, and that function
(`mariadb/database.py:389-417`) filters `Seq_in_index = 1` and then explicitly discards any candidate
that has a row at `Seq_in_index = 2`:

```
# Same index can be part of clustered index which contains more fields
# We don't want those.
```

A four-column composite has `Seq_in_index` up to 4, so it is invisible to the syncer and is never a
drop candidate. A **single**-column unique added by hand would be dropped — `add_index` guards against
that by writing a `search_index` Property Setter (`mariadb/database.py:434-442`) and `add_unique`
writes no such guard — but AD-11's index is composite, so the exposure does not apply.

### 2b. MariaDB permits duplicate NULLs in a UNIQUE index — **CONFIRMED BY EXECUTION**

Not read, run. Against the bench's own server (`mysql --version` → `11.8.6-MariaDB`, server
`11.8.6-MariaDB-5ubuntu0.1`), in a session-scoped `TEMPORARY` table with AD-11's exact key shape:

```sql
CREATE TEMPORARY TABLE __t_null_probe (
  resource varchar(140), day date, slot varchar(140), seat int,
  UNIQUE KEY uq (resource, day, slot, seat)
) ENGINE=InnoDB;
INSERT ... VALUES ('L1','2026-01-01', NULL, 0);   -- ok
INSERT ... VALUES ('L1','2026-01-01', NULL, 0);   -- ok
INSERT ... VALUES ('L1','2026-01-01', NULL, 0);   -- ok
SELECT COUNT(*) → 3
INSERT ... VALUES ('L1','2026-01-01','all-day',0); -- ok
INSERT ... VALUES ('L1','2026-01-01','all-day',0);
  ERROR 1062 (23000): Duplicate entry 'L1-2026-01-01-all-day-0' for key 'uq'
```

Three identical rows inserted with `slot IS NULL` and no error; the same rows with the `all-day`
sentinel collide on the second insert. AD-11's stated reason for the sentinel — *"MariaDB permits
unlimited duplicate NULLs in a UNIQUE index and the constraint would silently never fire"* — is
**exactly right**, and now demonstrated rather than asserted. The rental-period rule (`slot` is never
NULL) is load-bearing and should be enforced with `not_nullable` on the DocField, not only by
convention.

Corollary AD-11 does not state but needs: **`resource`, `day` and `seat` must be non-nullable too.**
The same NULL hole exists on any of the four columns. `seat` defaulting to NULL rather than 0 would
reopen the double-booking AD-11 exists to close.

---

## 3. AD-12 — `Agreement Record` refuses deletion in `on_trash`

### 3a. `on_trash` is genuinely called on every ORM delete path — **CONFIRMED**

`frappe/model/delete_doc.py:169-178`:

```python
if not for_reload:
    update_flags(doc, flags, ignore_permissions)
    check_permission_and_not_submitted(doc)

    if not ignore_on_trash:
        doc.run_method("on_trash")
        doc.flags.in_delete = True
        doc.run_method("on_change")
```

and `run_method` means `doc_events` too, so a `on_trash` bound in `hooks.py` works as well as one in
the controller. Every Desk deletion route lands here:

| Route | Source | on_trash |
| --- | --- | --- |
| Desk form delete / `frappe.client.delete` | `frappe/client.py:296-302` → `client.py:547,569` → `frappe.delete_doc(…, ignore_missing=False)` | fires |
| Desk list bulk delete | `frappe/desk/reportview.py:706` `delete_items` → `:716-722` `delete_bulk` → `frappe.delete_doc(doctype, d)` | fires |
| `doc.delete()` | `frappe/model/document.py:1380-1389` → `frappe.delete_doc(…)` | fires |

### 3b. `force=True` does **not** bypass `on_trash` — the spine's worry is aimed at the wrong flag

This is the correction. `delete_doc`'s own docstring (`delete_doc.py:45-47`) says what `force` does:

> `force (bool, optional)`: When True, **bypasses link existence checks** and allows deletion of
> documents that are linked to other records. Also allows deletion of standard DocTypes.

and the code agrees — `force` is consulted only at `delete_doc.py:181` (`if not force:
check_if_doc_is_linked(...)`) and at `:127` (standard-DocType guard). It is **not** consulted anywhere
near the `on_trash` call. `frappe.delete_doc("Agreement Record", name, force=True)` runs `on_trash`
and is refused.

**The bypasses that actually exist**, in descending order of how likely each is to be hit:

1. **`frappe.db.delete(...)` / `frappe.db.sql("delete …")`** — `database.py:1432-1434`, docstring:
   *"Delete rows from a table in site which match the passed filters. **This does not trigger DocType
   hooks.** Simply runs a DELETE query in the database."* This is the one the spine already names, and
   it is correct to name it.
2. **Child-table row removal via the parent's save.** `Document.update_child_table`
   (`document.py:656-683`) deletes every child row not present in the in-memory document with a raw
   `frappe.qb … .delete()`, no controller, no `on_trash`. **This means `Agreement Record` must not be
   a child table of `Agreement`.** If it is (`istable: 1`), its `on_trash` is unreachable and AD-12's
   refusal is decorative: any Desk user with write on `Agreement` deletes chain rows by removing grid
   rows and saving. The ER diagram (`AGREEMENT ||--o{ AGREEMENT_RECORD`) is ambiguous on this point
   and AD-27's phrasing ("no child table **on** `Agreement Record`") implies a standalone DocType —
   but the spine never says so, and this is the single most consequential unstated fact in AD-12.
   Say `Agreement Record` is a standalone DocType with a `Link` to `Agreement`, and say why.
3. **`frappe.delete_doc(..., ignore_on_trash=True)`** — `delete_doc.py:32`, `:175`. Not reachable from
   any whitelisted method in core; a deliberate server-side call.
4. **`frappe.delete_doc(..., for_reload=True)`** — `delete_doc.py:29`, `:171`. Skips `on_trash`, the
   permission check *and* the submitted check, and forces `delete_permanently`. Used by the framework
   during DocType reloads.
5. **`frappe.db.truncate(doctype)`** (`database.py:1448`) and direct `mysql` access.

Also worth carrying: deletion of a **submitted** document is refused before `on_trash` is even reached
(`delete_doc.py:173` → `check_permission_and_not_submitted`, `delete_doc.py:301-309` throws for
`docstatus == 1`). So the confirmed `Agreement` itself (docstatus 1) is already undeletable through
the ORM by construction; the `on_trash` guard is doing its work on `Agreement Record`, which is not
submittable.

The head-digest-plus-count remains the right belt to the `on_trash` braces, since bypasses 1 and 2 are
both real.

---

## 4. AD-27 — forbidding `allow_on_submit` by "a startup check that refuses to boot"

### 4a. The risk AD-27 names is real — **CONFIRMED**

`frappe/model/document.py:1176-1179`, inside `validate_update_after_submit`:

```python
for d in self.get_all_children():
    if d.is_new() and self.meta.get_field(d.parentfield).allow_on_submit:
        # in case of a new row, don't validate allow on submit, if table is allow on submit
        continue
    d._validate_update_after_submit()
```

Exactly what AD-27 says: with `allow_on_submit` on the table field, **new** child rows appended to a
submitted document skip `_validate_update_after_submit` entirely
(`frappe/model/base_document.py:1270-1290`). The document drifts from the snapshot both parties
confirmed. The invariant is worth having.

### 4b. There is no startup — **CONTRADICTED**

I enumerated every hook name the framework consumes (`grep -o 'get_hooks("[a-z_]*"'` across
`frappe/`, 100 distinct names). **None of them runs at process or worker startup.** Frappe's gunicorn
workers execute no app-level hook when they come up; `frappe/app.py`'s `application()` goes straight
from `init_request` to routing. The nearest candidates and what each actually is:

| Hook | Where it runs | Is it a "startup check"? |
| --- | --- | --- |
| `after_migrate` | `frappe/migrate.py:200-203`, end of `bench migrate`, once per installed app | **No — but it is the right answer.** Raising here fails the migrate, i.e. fails the deploy |
| `before_migrate` | `migrate.py:121-123`, start of migrate, inside `@atomic` (`migrate.py:46-58`) | No — runs before the schema it would be checking is synced |
| `boot_session` | `frappe/boot.py:99`, every Desk bootinfo build, signature `fn(bootinfo)` | No — per Desk session. Raising there breaks Desk login for everyone and leaves `/api/v2` fully working |
| `before_tests` | `frappe/testing/environment.py:193`, `frappe/parallel_test_runner.py:66` | No — test runner only, and this repo has no tests (§8) |
| `before_request` / `after_request` | `app.py:244` / `app.py:210` | No — per HTTP request; a metadata scan on every request is absurd |
| `before_job` / `after_job` | `background_jobs.py:269` / `:312` | No — per background job |

**Fix:** AD-27 should say *"asserted in an `after_migrate` hook, which fails `bench migrate` and
therefore fails the deploy"*, not *"a startup check that refuses to boot"*. The distinction matters
operationally: an `after_migrate` assertion catches the defect at deploy time and leaves a running
site running, which is the behaviour you want anyway.

### 4c. Frappe already blocks half of this, and AD-27 should say which half — **CONFIRMED**

`frappe/custom/doctype/customize_form/customize_form.py:343-350` refuses to *enable*
`allow_on_submit` through Customize Form for a field that is not already `allow_on_submit` in
`DocField`:

```python
elif prop == "allow_on_submit" and df.get(prop):
    if not frappe.db.get_value("DocField", {...}, "allow_on_submit"):
        frappe.msgprint(_("Row {0}: Not allowed to enable Allow on Submit for standard fields"))
        return False
```

So the runtime Property-Setter route is already closed for app-shipped fields. The two routes that
remain open are (a) someone editing `agreement.json` and migrating, which `after_migrate` catches, and
(b) a **Custom Field** created with `allow_on_submit: 1` — `custom_field.json:326` carries the field
and `custom_field.py:28` types it `DF.Check`, with no equivalent guard. The assertion must therefore
read `DocField` **and** `Custom Field`, or it misses the only route Admin can actually take from Desk.

---

## 5. AD-28 — the User record's key must be opaque

### 5a. `User.autoname` — **RE-CONFIRMED, line number exact**

`frappe/core/doctype/user/user.py:191-197`, on the bench, verbatim:

```python
def autoname(self):
    """set name as Email Address"""
    if self.get("is_admin") or self.get("is_guest"):
        self.name = self.first_name
    else:
        self.email = self.email.strip().lower()
        self.name = self.email
```

`user.json` carries **no `naming_rule` and no `autoname`** — naming is entirely this controller
method — and `email` is `{"fieldname": "email", "fieldtype": "Data", "options": "Email", "reqd": 1}`.
AD-28's citation (`user.py:191`) and its conclusion both hold on the bench.

### 5b. `mobile_no` unique — **CONFIRMED, and confirmed to reach the database**

`user.json`: `{"fieldname": "mobile_no", "fieldtype": "Data", "options": "Phone", "unique": 1}`.

And on the live site DB:

```
SHOW INDEX FROM `tabUser` WHERE Column_name IN ('mobile_no','username','email');
tabUser  Non_unique=0  Key_name=username   Seq_in_index=1  Column_name=username   BTREE
tabUser  Non_unique=0  Key_name=mobile_no  Seq_in_index=1  Column_name=mobile_no  BTREE
```

`Non_unique = 0` — a real unique B-tree index. AD-28's "already carries `unique: 1` and is the lookup
key at sign-in" is sound: the lookup is indexed and the one-person-one-account rule is enforced by the
database, not by application code.

Note the NULL hole applies here too: `mobile_no` is nullable, so every User without a number shares
the NULL bucket. That is fine (it is what lets Admin and system users exist), but it means the unique
index does **not** enforce "one person, one account" for a row where the OTP flow failed to write the
number. Write it in `before_insert`, or make it `not_nullable` for the customer user type.

### 5c. Frappe's built-in login-by-mobile path, and three others — **CONTRADICTED**

AD-28 says: *"Frappe ships no phone auth, so there is no framework default to fall back on"* and
*"**No password exists on any surface**, so there is no reset flow to attack."*

The first is true in the sense that matters — there is no OTP-as-primary-factor login. The second is
**false as a statement about the deployed platform**. Four alternate authentication paths to the same
`User` rows ship in v16.33.0, three of them enabled by default:

| Path | Source | Guest? | Default |
| --- | --- | --- | --- |
| **Magic link.** `POST /api/method/frappe.www.login.send_login_link` emails a one-time key; `GET /api/method/frappe.www.login.login_via_key` redeems it and calls `login_manager.login_as(email)` — a full session, no password involved | `frappe/www/login.py:138-140`, `:183-185`, `:196` | `allow_guest=True` | `login_with_email_link` = **1** (`system_settings.json`) |
| **Password reset.** `POST /api/method/frappe.core.doctype.user.user.reset_password` mails a reset key; `update_password(key=…)` then sets a password | `user.py:1145-1147`, `user.py:926-931` | `allow_guest=True` on both | always on |
| **Username/password login** at `/api/method/login` | `frappe/auth.py` / `User.find_by_credentials` (`user.py:826-856`) | — | `disable_user_pass_login` = **0** |
| **Login by mobile number.** `find_by_credentials` adds `{"mobile_no": user_name}` to its `or_filters` | `user.py:835`, `:839-840`; surfaced at `frappe/www/login.py:106-112` | — | `allow_login_using_mobile_number` = **0** |

The first three are keyed on the **email address** — which, under AD-28, is the synthesised
`u-3f9a2c81@…`. Whether they are exploitable turns entirely on a fact AD-28's `u-3f9a2c81@…` sketch
leaves open: **is the synthesised domain deliverable, and who controls the mailbox?** If it routes
anywhere the platform does not control, `send_login_link` mints full sessions for accounts that were
supposed to be reachable only by OTP, and the OTP flow stops being "the product's sole authentication
factor". The rate limits are Frappe's own defaults (5/hour, `login.py:134-135`), which is not the
protection AD-28 is relying on.

`allow_login_using_mobile_number` defaults to 0 and must **stay** 0 — turning it on would put the real
mobile number back into the credential path AD-28 spent a paragraph keeping it out of.

**Fix — three sentences AD-28 needs, all of them enforceable settings on this bench:**

1. The synthesised address uses a domain that cannot receive mail (RFC 2606 `.invalid`), so no
   framework flow can deliver a key to it. `email`'s `options: "Email"` validates format only, and
   `u-3f9a2c81@users.vivahspot.invalid` passes.
2. `login_with_email_link = 0` and `disable_user_pass_login = 1` in System Settings, verified in the
   same place the OTP limits are.
3. `allow_login_using_mobile_number` stays 0, named so nobody enables it to be helpful.

Replace *"there is no reset flow to attack"* with *"Frappe's reset, magic-link and password flows are
disabled and the synthesised address is undeliverable"* — the claim is then true and, more usefully,
checkable.

### 5d. `session_expiry` — **RE-CONFIRMED**

`system_settings.json`: `{"default": "170:00", "fieldname": "session_expiry", "label": "Session
Expiry (idle timeout)", "description": "Example: Setting this to 24:00 will log out a user if they are
not active for 24:00 hours."}`. Frappe's own label and description say *idle timeout*. Round 3's
correction landed correctly in AD-28, and `2160:00` is the right value for ninety days.

---

## 6. AD-32 — `permlevel`, and whether a read can be logged

### 6a. `permlevel` field-level read restriction is real — **CONFIRMED**

`frappe/model/document.py:957-987`, `apply_fieldlevel_read_permissions()`: for every field with a
non-zero `permlevel` not in `self.get_permlevel_access("read")`, `delattr(self, df.fieldname)` — the
value never leaves the server. It is applied on every v2 document read path
(`frappe/api/v2.py:67, 187, 201, 237, 269`) and on the Desk form load
(`frappe/desk/form/load.py:49`). List reads are covered too: `frappe/model/db_query.py:714, 765` calls
`get_permitted_fields`, so `frappe.get_list` will not return a `permlevel`-restricted column. AD-32's
mechanism works, and AD-16's "use `get_list` from a request, `get_all` only for system work" is what
keeps it working.

**One exemption AD-32 must state: Administrator is not bound by it.** `document.py:959-960`:

```python
if frappe.session.user == "Administrator":
    return
```

Same at `frappe/model/meta.py:202-203` for field masking. So the account AD-1 puts directly on the
DocTypes reads every Guest number unmasked. That is not necessarily wrong — it is what AD-32's read
log is supposed to compensate for — but it makes §6b fatal rather than merely inconvenient.

Worth knowing and not currently in the spine: v16 also ships **field masking** — a `mask` property on
a DocField plus `mask` permlevel access, returning `XXXXXXXX` instead of the value
(`meta.py:199-218`, `document.py:311-336`, applied in list results at `db_query.py:251-273`). For
Guest contact fields, *masked for everyone except the operational role* is a strictly better default
than *absent*, because the UI can show that a number exists without disclosing it, and it works in
list view. It does not change the Administrator exemption.

### 6b. Frappe does not log reads — **CONTRADICTED. This is the critical finding.**

AD-32 claims: *"every read is logged, Desk included"*, and the `Breach Incident` carries *"the
affected people **enumerated from those logs**"*. Frappe has no such log. Stated plainly, because
AD-32's 72-hour duty rests on it: **Frappe cannot tell you who read what.**

What exists, and what each actually captures:

| DocType | What produces a row | What it records | Default retention |
| --- | --- | --- | --- |
| **Access Log** | **Exports only** — report export (`frappe/desk/reportview.py:485`), Data Export (`data_export/exporter.py:47`), print view (`www/printview.py:100`), PDF (`utils/print_format.py:266`), private-file download (`utils/response.py:305`), backup download (`response.py:278`), vCard (`contacts/doctype/contact/contact.py:281,304`) | user, timestamp, source doctype, filters, columns | **30 days** (`access_log.py:35`) |
| **View Log** | Opening **one** document in the Desk **form** view — `frappe/desk/form/load.py:50` → `Document.add_viewed()` (`document.py:1783`), which **returns immediately unless the DocType sets `track_views`** (`document.py:1786`) | `reference_doctype`, `reference_name`, `viewed_by` — and nothing else | **180 days** (`view_log.py:22`) |
| **Activity Log** | Login / logout / auth events (`activity_log.py:72-81`) and email-queue events | subject, operation, user, ip_address | **90 days** (`hooks.py:532`) |
| **API Request Log** | Every `/api/*` request — but only when `System Settings.log_api_requests` is on, and it **defaults to 0** (`frappe/api/__init__.py:46-55`) | `path`, `user`, `method`. **No arguments, no response, no record identity** | **90 days** (`hooks.py:535`) |
| **Version** | Document *writes* (`document.py:1595-1611`) | field-level diffs | — |

So a read leaves no trace when it happens through:

- **the Desk list view or a report** — the bulk case, and precisely how a hundred Guest numbers get
  read at once. `View Log` is form-view only;
- **any `/api/v2` read**, document or method — `frappe/api/v2.py:64-67` calls `check_permission` and
  `apply_fieldlevel_read_permissions` and never `add_viewed`;
- **any server-side `frappe.get_doc` / `get_list` / `get_value` / `get_all`** — including the app's own
  `api/guest` and `api/vendor` methods;
- **any Desk form open on a DocType that does not set `track_views: 1`** — which is the default.

And even in the one case that is logged, the row says *this user opened this document* — never *which
fields*, never *at what permlevel*, never *which of the eleven Guest numbers on it were on screen*.

**Consequence for the 72-hour duty.** "The affected people enumerated from those logs" cannot be
satisfied by Frappe. An enumeration built from `View Log` would under-count — silently, and in the
direction that under-notifies data principals, which is the direction that turns a breach into a
second violation. `Access Log` at 30 days would also have purged itself before many breaches are
discovered.

**Fix.** AD-32 must stop describing this as something the framework does and state it as something
this system builds:

> Guest contact fields are read through **exactly one accessor function**, which writes a
> `Guest Contact Read` row — who, when, which Guest, which field, which request — before returning.
> No other code path reads those columns; `frappe.get_all` is forbidden on them (AD-16), and Desk is
> denied read at that `permlevel` outright rather than logged, because Frappe logs no Desk read and
> Administrator is exempt from `permlevel` entirely (`document.py:959`). The log DocType is registered
> with a retention that outlives the discovery window, not Frappe's 30-day `Access Log` default.

Denying Desk the read is the honest resolution of the tension AD-32 already names. AD-1 says Desk sits
on the DocTypes; AD-32 wants every Desk read logged; the framework logs none of them. Two of those
three can hold. The spine currently asserts all three.

This also lands on AD-27's Enforced-by line ("schema review of any new personal-data field") and on
the Capability map's "Breach readiness (NFR 5.5) → `Breach Incident`, guest-contact access log" — that
access log is now a thing to build, with a named writer, not a thing Frappe hands over.

---

## 7. AD-35 — a stored indexed flag

**CONFIRMED, by source and by execution.**

Declaring it: `search_index: 1` on the DocField. `frappe/database/schema.py:105` maps it into the
column model (`set_index=field.get("search_index")`), and the syncer emits a real index — at table
creation via `get_index_definitions()` (`schema.py:68-78`, `"index `key`(`key`)"`) and on an existing
table via `DbColumn.build_for_alter_table` (`schema.py:277-278`, `:314-315` → `self.table.add_index`).

Two conditions, both from the same code: the index is skipped when the column type is `text` or
`longtext`, and it is not emitted separately when the field is also `unique` (the unique constraint
already indexes it).

Verified on the live site database. `User.last_active` carries `search_index = 1` in `tabDocField`:

```
SHOW INDEX FROM `tabUser` WHERE Column_name='last_active';
tabUser  Non_unique=1  Key_name=last_active  Seq_in_index=1  Column_name=last_active  BTREE
```

A real B-tree index. So AD-35's `Listing.discoverable` as `Check` + `search_index: 1` gives search a
genuinely indexed column, and *"search filters a column rather than evaluating five conditions per
row"* is true rather than aspirational.

One note for the implementer: a `Check` field is `int(1)` with two distinct values, so its selectivity
is poor and MariaDB may ignore the index on its own. If `discoverable` ends up in a compound predicate
with `service` and `place` — which every real search will — the index that matters is the composite,
declared through `frappe.db.add_index("Listing", ["discoverable", "service", "place"])`, not
`search_index` on one column. AD-35 is right that the flag is the seam; the index shape is a Deferred
item, not a decided one.

---

## 8. AD-36 — Place is a tree

**CONFIRMED as to mechanism, with two traps the spine should carry.**

Setting `is_tree: 1` on the DocType runs `validate_nestedset` (`frappe/core/doctype/doctype/doctype.py:965-977`)
→ `add_nestedset_fields` (`doctype.py:979-1030`), which auto-appends **`lft` (Int)**, **`rgt` (Int)**,
`is_group` (Check), `old_parent`, and a `parent_<doctype>` Link, and requires `nsm_parent_field` to
name a real field. So the columns AD-36 needs exist as ordinary indexed-capable integer columns, and
*"does this Vendor's declared area cover this Wedding's Place"* is `WHERE lft >= :p.lft AND rgt <=
:p.rgt` — a range query, exactly as AD-36 says. The maintenance is `frappe/utils/nestedset.py`:
`update_nsm` (`:41-64`), `update_add_node` (`:67-97`), `update_move_node` (`:100-165`),
`validate_loop`, and `NestedSet.on_trash` refuses to delete a node with children
(`nestedset.py:313-318`, `NestedSetChildExistsError`) — which is the right behaviour for a Place
hierarchy Admin edits live.

**Trap 1 — the controller must subclass `NestedSet` explicitly.** `frappe/model/base_document.py:103-106`:

```python
doctype_info = frappe.db.get_value("DocType", doctype, ("module", "custom", "is_tree"), as_dict=True)
if doctype_info:
    if doctype_info.custom:
        return NestedSet if doctype_info.is_tree else Document
```

The automatic `NestedSet` base class applies **only to `custom` DocTypes** — ones created through
Desk. `Place` will ship in `vivahspot_backend`, so it is not custom, and its controller must be
`class Place(NestedSet):` imported from `frappe.utils.nestedset`. Get that wrong and `is_tree` still
adds the columns, the Desk tree view still renders, and `lft`/`rgt` **stay 0 forever** — every
coverage query returns everything. It fails silently and it fails open, which for a Vendor's declared
service area means every Vendor covers every Place.

**Trap 2 — `NestedSet` owns `on_update` and `on_trash`.** `nestedset.py:283-284`:

```python
def on_update(self):
    update_nsm(self)
    self.validate_ledger()
```

A `Place` controller that defines its own `on_update` or `on_trash` without `super()` silently stops
maintaining the tree. Given AD-27 puts invariants in controllers and AD-26 binds cascades to lifecycle
events, this collision is likely rather than hypothetical.

**Trap 3 — `lft` and `rgt` get no index.** `add_nestedset_fields` sets no `search_index` on either.
A coverage range scan is a full table scan until someone adds one. Small for a Place hierarchy of a
few hundred rows; worth one line so it is a decision rather than an oversight.

---

## 9. Stack table — re-confirmation

All three **CONFIRMED**, read from the bench rather than from a tag on GitHub.

| Claim | Evidence on disk |
| --- | --- |
| Frappe Framework v16.33.0 | `apps/frappe/frappe/__init__.py:58` — `__version__ = "16.33.0"`. `git describe --tags` → `v16.33.0`. `git log -1` → `33bf510b17afcaaa857ed38b921d8e9e50dcd232 2026-09-01 (grafted, HEAD -> version-16, tag: v16.33.0)`. The bench venv imports it: `env/bin/python -c "import frappe; print(frappe.__version__)"` → `16.33.0` |
| Python ≥ 3.14, < 3.15 | `apps/frappe/pyproject.toml` — `requires-python = ">=3.14,<3.15"`. Installed: `env/bin/python --version` → `Python 3.14.7` |
| Node ≥ 24 | `apps/frappe/package.json` — `"engines": {"node": ">=24"}`. Installed: `node --version` → `v24.18.0` |

The spine's framing — *"a single-minor window, not a floor"* — is the right reading of
`>=3.14,<3.15`, and the Deferred note that this constrains hosting stands.

One cosmetic discrepancy, recorded so it is not mistaken for a version problem later: the venv's
metadata directory is `frappe-17.0.0.dev0.dist-info`, stale from an editable install made against the
develop branch before the tree was checked out at `v16.33.0`. The code that runs is 16.33.0 — the
editable install resolves through `frappe.pth` to the working tree — so the pin in the Stack table is
correct. Nothing to change; do not "fix" it by editing the spine.

---

## 10. One convention worth correcting

**Consistency Conventions → Migrations** says: *"Anything not expressible in `doctype.json` —
AD-11's composite unique index, seed Services, Slot values, Place hierarchy roots — is a versioned
patch in `patches.txt`, never a manual bench step."*

The rule is right; for indexes specifically, the framework has a better home. `on_doctype_update()` in
the DocType's controller module is called by `DocType.on_update` on every sync
(`frappe/core/doctype/doctype/doctype.py:559-561`, `self.run_module_method("on_doctype_update")`), and
Frappe uses it for exactly this — `frappe/core/doctype/activity_log/activity_log.py:66-69`:

```python
def on_doctype_update():
    """Add indexes in `tabActivity Log`"""
    frappe.db.add_index("Activity Log", ["reference_doctype", "reference_name"])
    frappe.db.add_index("Activity Log", ["timeline_doctype", "timeline_name"])
```

`add_unique` works there too, and both are idempotent. The advantage over a one-shot patch is that the
index is re-asserted on every migrate: if it is ever dropped by hand or lost in a restore, the next
deploy puts it back. For a constraint AD-11 describes as *"the database — a unique index, which no
code path can talk past"*, self-healing on every deploy is worth more than a patch that ran once in
2026. Seed data stays in `patches.txt`; indexes move to `on_doctype_update`.

---

## Summary of required changes

| # | AD | Change | Severity |
| --- | --- | --- | --- |
| F-1 | AD-32 | Delete "every read is logged, Desk included". State that Frappe logs no reads — `Access Log` is exports only (`access_log.py:49`, 7 call sites), `View Log` is form-opens on `track_views` DocTypes only (`document.py:1786`). Name the one accessor function that writes the read log, forbid every other path to those columns, and deny Desk the `permlevel` outright since Administrator is exempt (`document.py:959`) | **CRITICAL** |
| F-2 | AD-27 | Replace "a startup check that refuses to boot" with an `after_migrate` hook (`migrate.py:200-203`). Frappe has no startup hook. Have it read `Custom Field` as well as `DocField` — Customize Form already blocks the Property-Setter route (`customize_form.py:343`) | **HIGH** |
| F-3 | AD-28 | Delete "there is no reset flow to attack". Name the three enabled guest paths (`login.py:138,183`; `user.py:1145,926`) and the three settings that close them: undeliverable synthesised domain, `login_with_email_link = 0`, `disable_user_pass_login = 1`. Keep `allow_login_using_mobile_number = 0` | **HIGH** |
| F-4 | AD-12 | State that `Agreement Record` is a **standalone** DocType, not a child table — `update_child_table` (`document.py:656-683`) deletes child rows with raw SQL and no `on_trash`. Note that `force=True` does *not* bypass `on_trash`; the bypasses are `frappe.db.delete/sql`, child-row removal, `ignore_on_trash`, `for_reload` | MEDIUM |
| F-5 | AD-36 | `Place`'s controller must subclass `frappe.utils.nestedset.NestedSet` explicitly — the automatic base class applies only to `custom` DocTypes (`base_document.py:103-106`) — and any `on_update`/`on_trash` it defines must call `super()`. `lft`/`rgt` carry no index by default | MEDIUM |
| F-6 | AD-26 | Add: the re-entrancy flag is released in a `finally`. `frappe.flags` is reset only at request/job start (`app.py:217`, `background_jobs.py:244`), never by `db.rollback()` — a raising cascade leaves the flag set for the rest of the request. Prior art: `frappe.flags.currently_saving` (`document.py:818,1476`). Use `frappe.database.database.savepoint()` (`database.py:1576`); note it undoes DB writes only, not object-storage or queued sends | MEDIUM |
| F-7 | AD-11 | `slot`, `resource`, `day` and `seat` are all `not_nullable`. The sentinel closes the hole on one column; the other three have the same hole | LOW |
| F-8 | Conventions | Composite indexes go in `on_doctype_update()` (`doctype.py:561`; Frappe's own use at `activity_log.py:66`), not a one-shot patch — they are then re-asserted on every migrate. Seed data stays in `patches.txt` | LOW |
