# Vivah Spot — working rules

Read every turn. This file is a **prompt, not a manual**: it competes with the actual task for
attention. It records what gets got wrong *in this repo*, ranked by how often. Keep it in the low
hundreds of lines, and **delete a rule once it stops being needed** — removal is what keeps the rest
loud.

Product scope, stack rationale and the data model live in `_bmad-output/planning-artifacts/`.
Do not restate them here. **Architecture decisions live in
`_bmad-output/planning-artifacts/architecture/architecture-vivahspot-2026-09-06/ARCHITECTURE-SPINE.md`**
— 36 numbered ADs. Cite them by id; do not re-derive them here.

---

## 1 · What this repo is

Two different things share this root. Confusing them is the most expensive mistake available.

| Path                                                          | What it is                                                                                |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `index.html`, `category.html`, `vendor/`, `account/`, `styles.css` | The **published site** at vivahspot.com. Static, hand-written, no build step. Edits go live. |
| `apps/`, `packages/`                                          | The **product monorepo**. Expo customer app, Next.js vendor portal, shared contract.        |

`styles.css`'s `:root` block is the design spec that `packages/shared/src/tokens.js` mirrors.
Changing one without the other splits the source of truth.

**The backend is not in this repo.** `vivahspot_backend` is a Frappe v16 app in a bench outside this
tree. Never create Python, DocType JSON or `hooks.py` here. If a task needs backend work, say so and
stop rather than scaffolding it in the wrong place.

## 2 · Frappe API — what training data gets wrong

Frappe v16 serves **`/api/v2`**. Almost every blog post, tutorial and SDK wrapper in training data
uses v1 (`/api/resource`, `/api/method`). Those are wrong here. Never copy one.

- Responses are **wrapped**: read `data`, not the body.
- `filters` takes **object** form.
- Pagination is `limit` / `start`, **not** `limit_page_length` / `limit_start`.
- List responses carry `has_next_page`.

**All three clients call whitelisted RPC only**, in three namespaces:

```
POST /api/v2/method/vivahspot_backend.api.family.v1.search_listings   # Expo app
POST /api/v2/method/vivahspot_backend.api.vendor.list_enquiries       # Next.js portal
GET  /api/v2/method/vivahspot_backend.api.guest.get_invitation        # public pages
```

**The version segment exists only where the client cannot be redeployed.** `family/v1/` is frozen
once shipped — a breaking change adds `v2` beside it, never edits `v1`. `vendor/` and `guest/` carry
no segment because they redeploy with the backend. That absence is meaningful; do not "correct" it.

Never call `/api/v2/document/{doctype}` from a client. The generic document API returns your schema,
and a binary sitting on ten thousand budget Androids cannot be redeployed the day a DocType field is
renamed. Purpose-built methods are a contract you own and can version.

The app-level `v1` and the transport-level `v2` are **different things** and will drift apart. Do not
unify them.

## 3 · Money

**Decided:** every money field is Frappe `Currency` in rupees — exact decimal, and Desk formatting,
print formats and GST invoicing all work natively. Conversion to integer **paise happens at the
Razorpay call and nowhere else**.

**Clients never do money arithmetic.** Every total, per-head multiplication and budget rollup is
computed server-side where Currency is exact; clients receive a number and render it. This is what
keeps float64 out of a fifteen-line budget total.

Still to do: `formatPrice` lives in `apps/mobile/src/mocks/catalog.ts:74` and belongs in
`packages/shared` beside the tokens, since the vendor portal needs the same one.

## 4 · Design tokens

`packages/shared/src/tokens.js` is the single source of truth for colour and type.

It is plain ESM `.js` **on purpose**: Tailwind configs execute in Node and cannot import raw
TypeScript. Do not convert it to `.ts` — it breaks both Tailwind configs. TypeScript consumers still
get inference via `allowJs`.

The two apps run **different Tailwind majors**. Mobile is Tailwind 3 + NativeWind 4
(`apps/mobile/tailwind.config.js`); vendor-web is Tailwind 4 (`@theme` in `tokens.css`). Config
syntax does not transfer between them.

## 5 · Stack traps

- Razorpay's native SDK **breaks Expo Go**. Move to a dev client before adding it, not after.
- i18n (`i18next` + `expo-localization`) is wired from day one. New user-facing strings go through it
  even while English is the only locale.
- User media goes to **R2/S3 + CDN**, never Frappe's file store.
- `search_listings()` is a deliberate seam. MariaDB filtering is fine for one city; keep the swap to
  Meilisearch/Typesense a one-file change.
- Phone + OTP via MSG91 is a **custom** Frappe login flow. Frappe has no phone auth built in, so
  there is no framework default to lean on.

## 6 · Code hygiene

One reason to change per commit. If the subject needs an "and", split it.
One reason to change per module, judged by who asks for the change.

Every new file opens with **what it is and why it is shaped that way** — not what it does, that is
readable. `packages/shared/src/tokens.js` and `src/index.js` already do this well. Match them.

Names come from the domain, and **the domain vocabulary is the PRD Glossary (§3), which is binding
on DocType names, fields, zod schemas and UI copy**: Vendor, Listing, Service, Space, Slot, Span,
Candidate Block, Chosen Block, Shortlist, Selection, Enquiry, Quote, Agreement, Amendment,
Commitment, Rules, Subscription, Tier, Verification. Do not invent synonyms.

The old list here — `Vendor Listing`, `Package`, `Availability Block`, `Service Category` — came from
the superseded Tech-Stack §3 model and is **retired**. PRD §7.9 also bans *booking, booked, cart,
checkout, legally binding, guaranteed, enforced by Vivah Spot* outright: applied to an Agreement
those create the liability the whole no-money model exists to avoid.

Delete rather than comment out. Nothing unreferenced ships.

One authoritative representation per piece of knowledge. The test is not "does this text appear
twice" but "if this fact changes, how many places must I edit" — the answer must be one. Two blocks
that look identical but encode *different* knowledge are not duplication; do not merge them.

One canonical unit or representation, converted only at the display boundary. Money, dates, phone
numbers, ids.

The third occurrence forces a decision: extract, or write down in one sentence why the duplication is
deliberate. A premature abstraction over three different futures is worse than three honest copies.

**Never swallow an error.** No `catch (e) {}`, no `.catch(() => {})`, no `as any`, no
`as unknown as T`, no `@ts-ignore`, no ignored promise rejection. Handle it, or propagate it with
context added. Allowed only with a comment naming the failure being ignored and why ignoring it is
correct.

Push invariants into types and schemas rather than runtime checks scattered downstream. Validate with
`zod` at the parse boundary, then trust the parsed value.

**Frappe divergence — do not fight the framework.** "Derived data is computed on read, not stored" is
a good default in the clients. It is *not* how Frappe works: DocTypes persist computed fields by
design, written in `validate`. Follow Frappe's grain on the backend and keep this rule for client
code.

A caller depends only on what it uses. Business logic never imports transport or UI.

Never add a dependency without asking. Never commit a secret — MSG91, Razorpay, WhatsApp and R2 keys
all live in `.env`, which is gitignored. Pasting a working key into a config file is how this goes
wrong.

## 7 · Working rules — because I am the author

**Report only what I observed.** Every completion claim names the command run and quotes what it
printed. "Should work" is a failure report.

**I do not grade my own work.** Never weaken an assertion, loosen a type, widen a tolerance, delete a
case or add a suppression to turn a gate green. If a gate is genuinely wrong, changing it is its own
commit with its own justification.

**Verify the path, not the mechanism.** Drive it the way a hand would — real screen, real request,
real tap. A check that reaches the code through a back door proves the function works, not that the
feature is wired up.

**Search for the existing one before writing a new one.** Say what I searched for and where, before
adding a helper. Then write in the surrounding code's idiom rather than a generically correct one.

**No unverified identifier.** Confirm every package, Frappe method path, Expo SDK API, config key and
flag against the artefact on disk — installed type definitions, the bench, actual help output —
before using it. "It compiles" does not distinguish a real package from a squatted one.

**Do the asked thing.** No opportunistic refactor, no interface for a single implementation, no
"while I was in there". Findings go on a list, not into the diff.

**Security-critical work gets human review, line by line.** Every whitelisted method is a public API
surface; `allow_guest=True` makes it an unauthenticated one. OTP issuance and verification, KYC
handling, subscription and payment webhooks, and any query built from user input are in this set.

**The commit message is the only surviving witness.** Plain sentence of user-visible effect, then why
the change is shaped this way, then what it deliberately does not do. A bulleted restatement of the
diff is worthless.

**Deferred seams go in `DEFERRED.md`, never as a `TODO` in source.** A TODO is ambiguous between
"unfinished" and "intentionally left open", and I resolve that ambiguity by helpfully finishing it.

**Correct me durably.** A rule I got wrong belongs in this file in the same turn, not only in the
conversation. Context is compacted and discarded; this file is not.

## 8 · What is actually enforced today

Honest scorecard, verified 2026-09-15. A rule with no gate is a convention, not a guarantee — do not
describe the rules above as enforced.

| Path                                                          | What it is                                                                                |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Typecheck, all 3 workspaces                                   | `npm run typecheck`                                                                       |
| Lint, both apps                                               | `npm run lint`                                                                            |
| Formatter                                                     | —                                                                                         |
| CI                                                            | —                                                                                         |
| Secret scanning                                               | —                                                                                         |
| Tests                                                         | —                                                                                         |
| Duplication threshold                                         | —                                                                                         |

Typecheck and lint are the gates that exist. Nothing runs either automatically, because there is no
CI. Say so rather than implying more.
