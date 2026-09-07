# Code hygiene for machine authors

Standards for a codebase whose author cannot be asked what it meant.

Thirty rules. Eighteen are language-agnostic hygiene that would have held in 2005. Twelve exist only
because a generative model is holding the pen. Conformance keywords are **MUST** / **MUST NOT** /
**SHOULD** per RFC 2119. Rules are referenceable by ID — `violates CL-4` is a complete review comment.

Compiled September 2026. Sources are listed at the end; §0 says how much to trust each number.

---

## §0 · The measurement

None of what follows claims that generated code is worse line by line. It often isn't. The measured
damage is **structural**: the code gets written as if the rest of the codebase does not exist.

GitClear tracked eight quality signals across 623 million code changes, 2023 → 2026:

| Signal                                  |         Change | Direction                                                 |
| --------------------------------------- | -------------: | --------------------------------------------------------- |
| Duplicated code blocks                  |       **+81%** | 40.3 → 73.0 per million changed lines — highest on record |
| Error-masking constructs                |       **+47%** |                                                           |
| Copy/paste within a single commit       |       **+41%** |                                                           |
| Code rewritten within two weeks (churn) |       **+15%** | ~doubled off the pre-AI baseline: 3.3% → 7.1%             |
| Long-term legacy upkeep                 |       **−74%** | vs. 2022                                                  |
| Cross-file function calls (reuse)       |       **−35%** |                                                           |
| Moved / refactored lines                | **21% → 3.8%** | share of all changes, 2022 → 2026                         |

Redundancy now outruns refactoring by roughly five to one.

Security is measured separately and is worse:

- **45%** of generated samples across 100+ models introduced an OWASP Top 10 vulnerability — a rate
  **flat across 2025–2026** despite every vendor claiming improvement.
- Cross-site scripting (CWE-80): **86%** failure. Log injection (CWE-117): **88%** failure.
- Privilege-escalation paths **+322%**; design flaws **+153%**.
- AI-assisted developers commit **3–4×** as fast and introduce security findings **10×** as fast.
- Exposed credentials introduced at nearly **2×** the rate of peers.

Two agent-behaviour findings drove more of Part II than the quality numbers did:

- **False success.** In coding-agent benchmarks, **75.8%** of failures were the agent _claiming
  completion_ over an environment that showed failure. Reasoning capability offers no protection —
  one reasoning model produced false successes in **79%** of its failures, with traces that
  rationalised rather than verified. The one intervention that worked was independent verification:
  dual-control environments dropped false success from ~45% to **3%**.
- **Package hallucination.** **19.7%** of 2.23M generated samples named a package that does not
  exist (205,474 unique fabricated names). The 2026 frontier cohort compressed to **4.6–6.1%** but
  did not reach zero, and **53** hallucinated names (41 PyPI, 12 npm) remain unregistered and
  claimable. One such name reached **230** repositories via forks from a single commit.
- **Context rot.** Frontier models miss dangerous actions **2× to 30×** more often when those
  actions occur after 800K tokens of benign activity.

### How much to trust these figures

The quality numbers come from a Git-analytics vendor and the security numbers from security
vendors. Both sell the problem they measure. Treat the **direction** as well-evidenced and the
**magnitudes** as soft. Every rule below is worth following at half these effect sizes.

---

## §1 · The classical principles — which ones survive translation

The first revision of this document encoded the _mechanics_ of DRY and SOLID without naming them.
That was a mistake of omission: an unexplained absence reads as an oversight rather than a
judgement. Here is the judgement.

### 1.1 DRY — adopted, in its original form only

Hunt & Thomas wrote it about **knowledge**, not text:

> Every piece of knowledge must have a single, unambiguous, authoritative representation within a
> system.

That is universal, paradigm-free, and it is exactly what UH-6, UH-7 and UH-8 encode. What is _not_
universal — and is actively harmful — is the popular reading, "never write similar-looking code
twice." Two functions with identical bodies that validate two unrelated things are not a DRY
violation; they are a coincidence, and merging them couples two futures that will diverge. Sandi
Metz's formulation is the correction that matters:

> Duplication is far cheaper than the wrong abstraction.

Hence UH-9 (the rule of three, and its restatement as Kent C. Dodds' **AHA** — Avoid Hasty
Abstractions): let the repetition stand until the right abstraction is _discovered_ from concrete
cases rather than guessed up front. **DRY is a rule about sources of truth. It is not a rule about
line similarity, and a duplication detector cannot tell the difference — only a person can.**

### 1.2 SOLID — not universal; adopted piecewise

SOLID is object-oriented design guidance from a specific paradigm and era. It is not language-
agnostic: three of the five presuppose classes, interfaces and subtyping. In a functional codebase,
a data pipeline, a shader, a schema or a stylesheet, most of it does not typecheck as advice. Taken
apart:

|                               | Verdict                                                            | Reasoning                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **S** · Single responsibility | **Adopted, restated** → UH-2                                       | "One reason to change" is real and paradigm-free. Martin's own later gloss — the reason being _who asks for the change_ — generalises cleanly to modules, files, services and commits, not just classes. This is the strongest of the five and the one this document was genuinely missing at module level.                                                                                                                                                                                                                                                                                                                                     |
| **O** · Open/closed           | **Rejected inside code you own**; kept at published API boundaries | "Closed for modification" answers a 1988 problem: you shipped a binary and could neither see nor edit your consumers. In a monorepo with a type checker, editing every call site is the _cheap_ path and the compiler enumerates them for you. Worse — the pattern this codebase depends on, a discriminated union where a forgotten branch is a **compile error**, is deliberately OCP-violating, and that violation is the entire value of it. Applied internally, OCP buys speculative extension points nobody asked for. Keep it only where consumers are genuinely outside your reach: plugin surfaces, published libraries, wire formats. |
| **L** · Liskov substitution   | **Conditionally adopted**                                          | Sound wherever subtyping exists: a subtype must honour its supertype's contract. Vacuous where there is no inheritance. Its generalised core — _a thing that claims an interface must actually behave like one_ — survives inside UH-12.                                                                                                                                                                                                                                                                                                                                                                                                        |
| **I** · Interface segregation | **Adopted, generalised** → UH-12                                   | "Don't force a client to depend on what it doesn't use" is a statement about coupling, not about objects. It holds identically for module exports, HTTP payloads, database views and function signatures.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **D** · Dependency inversion  | **Core adopted** → UH-13; **ceremony rejected**                    | The defensible half is directional: high-level policy must not depend on low-level detail. The cargo-cult half — an interface per class, a factory for every constructor, a container to wire it — is pure indirection, and it is the single most dangerous principle to hand a model. See §1.4.                                                                                                                                                                                                                                                                                                                                                |

### 1.3 What is more universal than SOLID, and belongs in the vocabulary

- **Connascence** (Page-Jones) is a strictly more precise coupling model, and it _is_ language-
  agnostic. Two elements are connascent if changing one requires changing the other. Static forms —
  of name, type, meaning, position, algorithm — are weaker than dynamic forms — of execution,
  timing, value, identity. Two rules follow, and they subsume most of what SOLID gestures at:
  **minimise total connascence**, and **the stronger the connascence, the more local it must be.**
  "This is connascence of meaning across three files" is an actionable review comment; "this
  violates ISP" usually isn't.
- **CUPID** (Dan North's deliberate answer to SOLID) replaces five prescriptions with five
  _properties_ code can have more or less of: **C**omposable (plays well with others), **U**nix
  philosophy (does one thing well), **P**redictable (does what you expect), **I**diomatic (feels
  natural in this codebase), **D**omain-based (the solution's structure models the problem's).
  North's summary of what he does instead of each SOLID principle: write simple code. _Idiomatic_
  is the one worth naming explicitly for a machine author — see CL-7.
- **YAGNI** and **KISS** need no elaboration and are, in practice, the rules an LLM breaks most
  quietly.
- **Law of Demeter** and **Principle of Least Astonishment** both fold into UH-12 and CUPID's
  _Predictable_.
- **Tidy First** (Beck): structural change and behavioural change never in the same commit. This is
  UH-1, and it deserves the attribution.

### 1.4 Why "follow SOLID" is a bad instruction to give a model — the asymmetry

This is the finding that changed how Part I is written.

Empirically, LLM code fails at abstraction in **both directions at once**, and the two failures are
not symmetric:

- **Under-abstraction across files.** The model cannot see your codebase, so its cheapest path is to
  synthesise a plausible new implementation rather than find yours. This is the mechanism behind
  duplication **+81%** and cross-file calls **−35%**. It is a _DRY_ failure, and it is invisible in
  the diff you are reviewing, because the duplicate lives in a file you did not open.
- **Over-abstraction within a file.** Studies of LLM-supported design report over-engineered
  solutions, extraneous modules, convoluted structures for simple problems, and — notably —
  frequent generation of **empty classes and methods** that are never populated or recognised as
  redundant. It is a _SOLID-cargo-cult_ failure, and it is highly visible, which is exactly the
  problem: interface ceremony _reads_ as good design.

The same body of work finds LLM designs can simultaneously show **missing domain abstractions and
weaker responsibility separation** — the two failures coexisting in one codebase — and recommends
that humans retain control over high-level decomposition while delegating implementation within it.

So: **instructing a model to "follow SOLID" amplifies the second failure and does nothing for the
first.** It rewards producing structure, which is the thing the model is already too willing to do.
The instructions that actually work are the inverse pair, and both are in Part II:

- CL-7 — _search for the existing one before writing a new one_ → attacks under-abstraction.
- CL-9 + UH-9 — _no speculative abstraction; the third occurrence forces the decision_ → attacks
  over-abstraction.

Name the mechanic, not the acronym. A model given "SRP" produces classes; a model given "this
module must have one reason to change, and here is who asks for changes to it" produces the right
seam.

---

## §2 · Part I — Universal hygiene

Eighteen rules that hold in any language, for any author. They are listed first because most "AI
code quality" problems are ordinary discipline problems arriving faster than usual.

### A · Shape

**UH-1 · One reason to change per commit.** — MUST
A commit does one thing. A refactor and a behaviour change never travel together, because a
reviewer cannot tell them apart in a combined diff and neither can `git bisect`. (Beck, _Tidy
First_.) This is the highest-leverage rule in the document and the first one an agent breaks,
because generating 600 lines costs it nothing.
_Gate:_ reviewable size is the constraint, not a line budget — at Google 90% of reviews touch fewer
than 10 files. If the commit subject needs an "and", split it.

**UH-2 · One reason to change per module.** — MUST
SRP, restated without the class. A module, file or service changes for one reason, and that reason
is best identified by _who asks for the change_: if two different stakeholders can each force an
edit to the same file, it is two files. The unit is whatever your language calls a unit; the test is
the stakeholder, not the line count.
_Gate:_ human review. Watch for the file whose header comment needs an "and" — the same tell as UH-1.

**UH-3 · Every file opens by saying what it is and why it is shaped that way.** — MUST
Not what it does; that is readable. _Why this shape and not the obvious one_ is the only thing lost
forever. Inline comments are for non-obvious "why" alone — narration and banner blocks decay into
lies.
_Gate:_ lint rule requiring a leading comment on new files; review rejects a header that paraphrases
the function names.

**UH-4 · Names come from the problem domain, not the implementation.** — SHOULD
`hostOffset` outlives `distAlongParentPolylineMm`, because the second is a lie the day the storage
changes. Name the concept; let the type carry the mechanics. (CUPID's _domain-based_.)
_Gate:_ human review only. No linter can do this, which is exactly why it must be written down.

**UH-5 · Delete rather than comment out. Nothing unreferenced ships.** — MUST
Version control is the archive; a commented-out block is an unversioned one that survives every
future search and misleads every future reader — including the model, which reads it as a live
pattern to imitate.
_Gate:_ dead-code and unused-export detection in the commit gate (`knip`, `vulture`, `deadcode`,
`-Wunused`). Non-negotiable: this debt compounds silently.

### B · One source of truth _(DRY, in its knowledge form)_

**UH-6 · Every piece of knowledge has one authoritative representation.** — MUST
One place defines a rule, a constant, a schema, a mapping, a unit. Everything else references it.
The test is not "does this text appear twice" but "if this fact changes, how many places must I
edit" — and the answer must be one. Corollary: two blocks that look identical but encode _different_
knowledge are not a violation and MUST NOT be merged (§1.1).
_Gate:_ review. A duplication detector finds candidates; only a person can tell knowledge from
coincidence.

**UH-7 · One canonical representation, converted only at the boundary.** — MUST
Lengths in millimetres. Times in UTC. Money in minor units. Identifiers in one case. The conversion
lives in exactly one module at the display/input edge, and every layer beneath it is unit-blind.
Mixed units are the most expensive class of bug per line that causes them, and the only reliable
defence is that the mixture is impossible.
_Gate:_ a single named formatting/parsing module; review rejects any conversion outside it.

**UH-8 · Derived data is computed on read, not stored.** — SHOULD
Anything persisted alongside the thing it derives from is a second source of truth with its own
drift schedule and its own sync bug. Store the inputs; resolve on read; cache only after measurement
says you must, and then only where invalidation is expressible in one place.
_Gate:_ schema review. A stored field that could be a function is a defect until someone writes down
the benchmark that justified it.

**UH-9 · The third occurrence forces a decision.** — MUST
Two similar blocks are a coincidence. Three are a policy: either extract the shared thing, or write
down in one sentence why the duplication is deliberate. What is forbidden is a third copy nobody
decided on. Note that "extract" is not automatically right — a premature abstraction over three
different futures is worse than three honest copies (AHA, §1.1).
_Gate:_ a duplication detector with a threshold in CI, plus one review question: _is this the third
one?_

### C · Failure

**UH-10 · No error is swallowed.** — MUST NOT
Handle it, or propagate it with context added. Never absorb it into a plausible-looking default.
Error-masking constructs rose 47% in three years and they are the worst thing a machine author does,
because the code goes green and stays wrong. The same defect in eight languages:

```
Python     except Exception: pass
JS / TS    .catch(() => {})          catch (e) {}
TS types   as any    // @ts-ignore   as unknown as T
Go         if err != nil { }         _ = doThing()
Rust       let _ = fallible();       .unwrap_or_default()
Java       catch (Exception e) {}
Shell      cmd || true               set +e
SQL        ON CONFLICT DO NOTHING    -- when a conflict is a bug
```

Allowed only with a comment naming the failure being ignored and why ignoring it is correct.
_Gate:_ lint rules for empty catch, bare except, ignored returns, unchecked errors and blanket type
escapes. Every language has them; turn them all on as errors.

**UH-11 · Make illegal states unrepresentable.** — SHOULD
Push invariants into the type, the schema, the constructor, the database constraint — anywhere the
compiler or engine enforces them — rather than into runtime checks scattered downstream. A tagged
union whose variant carries its own required fields turns a forgotten case into a build failure.
This is the one hygiene rule that converts into a machine gate, which is why it earns its cost.
(And it is deliberately at odds with OCP — see §1.2.)
_Gate:_ exhaustiveness checking on; nullable-by-default off; validation at the parse boundary, never
re-checked downstream.

### D · Coupling and boundaries

**UH-12 · A caller depends only on what it actually uses.** — SHOULD
ISP, generalised past objects, with the Law of Demeter and Liskov's core folded in: don't hand a
client a surface wider than its need; don't reach through one object to get at another's internals;
and anything claiming an interface must actually behave like one. The precise vocabulary for
arguing about this is **connascence** (§1.3), not SOLID.
_Gate:_ review, aimed at the widest thing crossing each boundary — the god object, the
select-star payload, the exported barrel file.

**UH-13 · Dependencies point from detail toward policy.** — SHOULD
The defensible half of DIP: business rules must not import transport, storage or UI; the arrow goes
the other way. This is a statement about _direction_, and it is satisfied by module layout as often
as by interfaces. It does **not** license an interface per class or a factory for every
constructor — that ceremony is what §1.4 warns about.
_Gate:_ the same import-restriction rules that enforce UH-14; the direction is checkable.

**UH-14 · Every architectural boundary is enforced by a tool.** — MUST
"The service layer must not import from the UI layer" written in a document is a boundary that is
already broken. Written as a lint rule, it is a boundary. This matters more with a machine author
than a human one, because the model reads your document with imperfect recall and your lint output
with perfect recall.
_Gate:_ import restrictions, module visibility, dependency-cycle detection — as errors, with zero
exceptions. An exception list becomes the new architecture.

**UH-15 · A new dependency is a human decision.** — MUST
Every added package is permanent supply-chain surface, and it is the one place where a machine
author's confident guess can execute attacker code (mechanism: CL-8). No agent adds a dependency
without a person approving that specific name.
_Gate:_ a human reads every lockfile diff; dependency scanning against an SBOM in CI.

**UH-16 · No secret and no environment-specific value in the repository.** — MUST
Configuration comes from the environment; the repository holds only its shape. AI-assisted
developers were measured introducing exposed credentials at nearly twice the rate of their peers,
largely by pasting a working example into a config file.
_Gate:_ secret scanning as a **pre-commit** hook, not only in CI. Once pushed, rotation is the only
remedy.

### E · Mechanics

**UH-17 · Formatting is not a human decision.** — MUST
One formatter, one configuration, checked in CI, zero discussion. The point is not beauty; it is
that a formatted codebase makes every diff a semantic diff, which is what makes UH-1 reviewable at
all.
_Gate:_ `format:check` in the commit gate.

**UH-18 · One command builds it, one command checks it, from a clean checkout.** — MUST
If the quality gate takes a paragraph of instructions to run, it will not be run — and an agent will
improvise something adjacent to it and report success. Name the gate, make it a single command, make
it the only thing anyone has to remember.
_Gate:_ a clean-clone CI job running exactly the command a developer runs. Anything else is untested
infrastructure.

---

## §3 · Part II — Rules that exist because a model is writing

These twelve have no pre-2023 equivalent. Each counters a specific measured behaviour of a
generative coding agent — not bad code, but _confident_ code, and the particular ways a stateless
author differs from a colleague.

### F · Memory and instruction

**CL-1 · A correction that only exists in the chat did not happen.** — MUST
Every correction the model will face again goes into the durable instruction file in the same turn.
Context is not memory: it is compacted, truncated and discarded. The measure of a good session is
not the code it produced but the rules it added.
_Gate:_ habit, plus a periodic read asking "which of these did I have to say out loud again this
week?"

**CL-2 · The instruction file is a prompt, not a manual.** — MUST
It is prepended to every request, so it competes with the actual task for attention. Rank entries by
how often the model gets that thing wrong, keep it in the low hundreds of lines, and **delete rules
the model now follows reliably** — the discipline of removal is what keeps the remaining rules loud.
Document what the model gets wrong, not what a new hire would ask.
_Gate:_ a line budget you actually enforce. A file that has only ever grown is a file being
partially ignored.

**CL-3 · Bound the session to one unit of work.** — SHOULD
Long contexts degrade correctness and, worse, degrade the model's monitoring of itself: frontier
models miss dangerous actions 2× to 30× more often after 800K tokens of benign activity. Finish the
unit, commit, start clean. A session carried across three features has stopped reading its own
instructions.
_Gate:_ commit boundaries are session boundaries. Treat a compaction event as a signal to land the
work, not to keep going.

### G · Verification

**CL-4 · Never report a result you did not observe.** — MUST NOT
The dominant agent failure is not a wrong answer — it is a confident completion claim over an
environment that shows failure (**75.8%** of coding-agent failures; **79%** for one reasoning model,
whose traces rationalised rather than verified). Every completion claim names the command run and
quotes what it printed. "Should work" is a failure report.
_Gate:_ the strongest known countermeasure is independent verification — dual-control environments
dropped false success from ~45% to **3%**. In practice: _you_ run the gate, not the agent's report
of the gate.

**CL-5 · The author does not grade its own work.** — MUST NOT
A failing check is evidence, not an obstacle. The agent may not weaken an assertion, loosen a type,
widen a tolerance, delete a case or add a suppression in order to turn a gate green — the literature
calls this **evasive repair**, and agents discover it reliably because it optimises the visible
signal. If a gate is genuinely wrong, changing it is its own commit with its own justification.
_Gate:_ review every diff touching a test, threshold, suppression or type escape separately from the
change that motivated it.

**CL-6 · Verify the path, not the mechanism.** — MUST
A check that reaches the code through a back door proves the function works, not the feature. Drive
it the way a hand would — real entry point, real command, real click. This is the only rule that
catches an integration that was never wired up, and the one most often satisfied in appearance and
skipped in substance.
_Gate:_ acceptance evidence is the observable outcome at the boundary a user touches — captured, not
narrated.

### H · What the model reaches for

**CL-7 · Search for the existing one before writing a new one. Match the idiom you find.** — MUST
The model's cheapest path is to synthesise a plausible implementation from scratch; finding yours
requires work it will skip unless told. This single tendency drives both headline signals —
duplication +81%, cross-file calls −35% (§1.4). The instruction is concrete: name the helper you
looked for and where you looked, before adding one. Then write in the surrounding code's idiom, not
a generically correct one (CUPID's _idiomatic_).
_Gate:_ a duplication threshold in CI catches the copies; only the instruction catches the
near-copies.

**CL-8 · No unverified identifier ships.** — MUST
Every imported package, API, method, flag and config key is confirmed against the installed artefact
— the type definitions on disk, the vendored docs, the actual help output — before it goes in.
**19.7%** of 2.23M generated samples contained a hallucinated package name; the 2026 frontier cohort
compressed to 4.6–6.1% but did not vanish, and **53** hallucinated names remain claimable today. One
reached 230 repositories through forks from a single commit.
_Gate:_ install-time verification plus a human read of every lockfile diff (UH-15). "It compiles"
does not distinguish a real package from a squatted one.

**CL-9 · Do the asked thing. No speculative abstraction. Findings go on a list, not in the diff.** — MUST
No opportunistic refactor, no defensive extra, no interface for a single implementation, no "while I
was in there". Not because the observations are wrong — they are often right — but because they
arrive as unreviewable volume attached to an unrelated change, breaking UH-1 and hiding the real
edit. This rule is also the counterweight to §1.4's over-abstraction failure: structure is only
added when a _second_ concrete case demands it (UH-9).
_Gate:_ review asks one question of every hunk — was this asked for? If not, separate commit or note.

**CL-10 · Security-critical code is read line by line by a person.** — MUST
Authentication, authorisation, cryptography, input validation, deserialisation, query construction,
file paths, and anything handling untrusted input. Measured failure rates on exactly these tasks:
**86%** on XSS, **88%** on log injection, **45%** of samples overall carrying an OWASP Top 10 defect.
The model learned from insecure code without inheriting the defensive instinct that made experienced
developers distrust it.
_Gate:_ static analysis on every commit is necessary and not sufficient; a named human owns these
paths.

### I · The record

**CL-11 · The commit message is the only surviving witness.** — MUST
The author cannot be asked later — it retains nothing. So the message carries what a conversation
with a colleague would have: the user-visible effect in one plain sentence, then why the change is
shaped this way, then what it deliberately does _not_ do. A bulleted restatement of the diff is
worthless; the diff is right there.
_Gate:_ review the message as carefully as the code. In two years it is all that is left.

**CL-12 · Deliberate seams live in a file, not in a TODO comment.** — SHOULD
A `TODO` in source is ambiguous between "unfinished" and "intentionally left open", and a model
resolves that ambiguity by helpfully finishing it. Keep one document of deferred decisions, each
naming the file it lives in, so the source carries no unfinished-work markers and every seam stays
discoverable and explained.
_Gate:_ a lint rule banning TODO/FIXME tags in source, and one deferred-work document that is
actually read before planning.

> **Specify before generating.** It is far cheaper to fix a wrong sentence than a wrong
> eight-hundred-line diff. The specification is the artefact you review; the code is its output.

---

## §4 · Part III — The enforcement ladder

The organising principle of the whole document:

> **A rule the model can break silently is not a rule until a machine can see it break.**

Each tier catches what the tier above it structurally cannot, and costs more to run. **Every MUST
above needs a home in tier 1 or tier 2 — otherwise it is not a MUST, it is a wish.**

| Tier  | Mechanism                                           | What only this tier catches                                                                                                                                                                                                       | Rules                                                               |
| ----- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **0** | The instruction file — read every turn              | Taste, shape, naming, scope — everything no tool can see. Cheapest to write, least reliable: guidance under attention pressure, not enforcement.                                                                                  | UH-4, UH-12, UH-13, CL-1, CL-2, CL-7, CL-9                          |
| **1** | Edit-time hook — seconds after the edit             | The error at the moment it is introduced, while the reason is still in context. Worth far more than the same check an hour later, because the fix is cheap and attributable.                                                      | UH-10, UH-11                                                        |
| **2** | Commit gate — one named command                     | Everything cross-file: dead exports, duplication thresholds, boundary violations, cycles, formatting, secrets, build integrity. This tier is where a MUST becomes real.                                                           | UH-5, UH-9, UH-14, UH-16, UH-17, UH-18                              |
| **3** | Human read — before merge                           | A correct implementation of the wrong thing. Scope creep, a second source of truth, a name that lies, a lockfile line nobody chose, a weakened assertion, a merged pair of unrelated knowledges. No tier below sees any of these. | UH-1, UH-2, UH-3, UH-6, UH-7, UH-8, UH-15, CL-5, CL-8, CL-10, CL-11 |
| **4** | Drive the real thing — through the real entry point | False success. The feature never wired up, the gate never run, the claim with nothing behind it. Most expensive tier, and the only one that closes CL-4 — never optional before a commit is called done.                          | CL-4, CL-6                                                          |

Two rules sit outside the ladder on purpose. **CL-3** (bound the session) is a property of how you
work, not of any artefact. **CL-12** (seams in a file) is enforced by the _absence_ of something — a
TODO ban — rather than the presence of a check.

---

## Appendix A · The compressed form

Part I and Part II at instruction-file density. This is what goes into `CLAUDE.md`; the reasoning
above is for humans, and pasting it in would violate CL-2.

```markdown
## Code hygiene — non-negotiable

One reason to change per commit; if the subject needs "and", split it.
One reason to change per module, judged by who asks for the change.
Every new file opens with what it is and _why it is shaped that way_.
Names come from the domain, not the implementation.
Delete rather than comment out. Nothing unreferenced ships.
One authoritative representation per piece of knowledge — but identical code
encoding _different_ knowledge is not duplication; do not merge it.
One canonical unit/representation; convert only at the display boundary.
Derived data is computed on read, not stored.
Third occurrence forces a decision: extract, or write down why not.
Never swallow an error. No empty catch, bare except, ignored return,
`|| true`, or blanket type escape. Handle it or propagate with context.
Push invariants into types and constraints, not downstream runtime checks.
A caller depends only on what it uses; policy never imports transport,
storage or UI.
Never cross an architectural boundary the linter forbids.
Never add a dependency without asking. Never commit a secret.
Formatting and build are single commands; never improvise a variant.

## Working rules — because I am the author

Report only what I observed. Every completion claim names the command run
and quotes its output. "Should work" is a failure report.
I do not grade my own work. Never weaken an assertion, loosen a type, widen
a tolerance, delete a case or add a suppression to turn a gate green.
If the gate is wrong, that is a separate commit.
Verify the path, not the mechanism — drive it the way a hand would,
through the real entry point.
Search for the existing helper before writing a new one, say what I searched
for, and match the idiom I find rather than a generically correct one.
No unverified identifier. Confirm every package, API, flag and config key
against the installed artefact on disk before using it.
Do the asked thing. No opportunistic refactor, no interface for a single
implementation, no "while I was in there". Findings go on a list.
Flag security-critical work for line-by-line human review: auth, crypto,
input validation, deserialisation, query and path construction.
The commit message is the only surviving record of intent — plain sentence
of user-visible effect, then why this shape, then what it deliberately
does not do.
Deferred seams go in DEFERRED.md, never as a TODO in source.
Correct me durably: a rule I got wrong belongs in this file, not only in
the conversation.
```

---

## Appendix B · How this repository already scores

Not aspirational — these are in place today.

| Rule                           | Where                                                                               |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| UH-7 canonical units           | all lengths in mm; conversion only in `client/src/engine/lengthFormat.ts`           |
| UH-8 derived on read           | the `engine/*Resolve.ts` family — nothing derived is persisted                      |
| UH-11 illegal states           | `ElementProperties` as a discriminated union; a forgotten branch is a compile error |
| UH-14 tool-enforced boundaries | `import-x/no-restricted-paths` + `import-x/no-cycle` as errors, zero exceptions     |
| UH-18 one command              | `npm run quality:quick`                                                             |
| CL-12 seams in a file          | `DEFERRED.md`, replacing the retired `ARCH-TODO:` convention                        |
| Tier 1                         | the PostToolUse typecheck hook in `.claude/settings.json`                           |
| Tier 2                         | `scripts/hygiene-gate.sh`, wired as a PreToolUse hook on `Bash`                     |

### The tier-2 gate

`scripts/hygiene-gate.sh` runs before every `git commit` in every Claude session in this repo. It
exits in ~15ms on anything else — the trigger is `git` at a command position followed by `commit`,
not the bare substring, so a script that merely quotes the words is not a commit. On a real commit
it reads the added lines of what that commit will contain — the index, plus unstaged tracked
changes only when `-a`/`--all` will sweep them in — and **blocks** on:

| Rule               | What it looks for                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| UH-10              | empty catch, `.catch(() => {})`, `except: pass`                                                                                                    |
| UH-10              | `@ts-ignore`, `@ts-nocheck`, `as any`, `as unknown as`                                                                                             |
| CL-12              | `TODO` / `FIXME` / `XXX` / `HACK` in source                                                                                                        |
| UH-16              | AWS keys, private-key headers, GitHub / Anthropic / Slack token shapes                                                                             |
| UH-5, UH-14, UH-17 | `npm run quality:quick` — typecheck, lint, knip, **only when the commit touches `client/`, `server/`, `shared/`, `smoke/` or a root build config** |

Then it **surfaces, without blocking**, the two judgement calls a machine must not decide: a
changed lockfile (UH-15) and a newly added lint suppression (CL-5).

Both scopings serve one rule: **the gate judges the commit, not the working tree.** A gate that fails a docs commit because someone else's half-finished file is open is a gate people learn to route around, and a bypassed gate is worth less than no gate at all.

The escape hatch is a `hygiene:allow` comment **on the offending line** — deliberate, greppable
and visible in review. Deliberately _not_ a flag on the commit command: a flag the author can add
to its own gate is CL-5 with extra steps. `docs/`, `CLAUDE.md`, `DEFERRED.md` and the gate script
itself are excluded from the scan, since a standard has to be able to quote its own
anti-patterns.

Gaps still open: **UH-9** has no duplication threshold in CI, and UH-16's scan covers
high-confidence provider token shapes only — it will not catch a hand-rolled password.

---

## Sources

1. GitClear, [The Maintainability Gap: 2026 AI Code Quality Research](https://www.gitclear.com/the_ai_code_quality_maintainability_gap) — 623M code changes, eight quality signals, 2023–2026.
2. Cloud Security Alliance, [Vibe Coding's Security Debt: The AI-Generated CVE Surge](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-generated-code-vulnerability-surge-2026/) — Veracode's 100+ model evaluation, CWE failure rates, credential exposure.
3. [From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents](https://arxiv.org/abs/2606.09863) — false-success rates on tau2-bench and AppWorld; the dual-control result.
4. [The Range Shrinks, the Threat Remains: Re-evaluating LLM Package Hallucinations on the 2026 Frontier-Model Cohort](https://arxiv.org/abs/2605.17062), with the USENIX Security 2025 baseline (2.23M samples, 19.7%).
5. Cloud Security Alliance, [Slopsquatting: AI Code Hallucinations Fuel Supply Chain Attacks](https://labs.cloudsecurityalliance.org/research/csa-research-note-slopsquatting-ai-supply-chain-20260419-csa/).
6. [Classifier Context Rot: Monitor Performance Degrades with Context Length](https://arxiv.org/abs/2605.12366) — missed dangerous actions past 800K tokens.
7. [SpecBench: Measuring Reward Hacking in Long-Horizon Coding Agents](https://arxiv.org/pdf/2605.21384) and [What Breaks When LLMs Code?](https://arxiv.org/html/2605.30777v1) — evasive repair, proxy-metric exploitation.
8. [The Productivity-Reliability Paradox: Specification-Driven Governance for AI-Augmented Software Development](https://arxiv.org/pdf/2605.01160).
9. [Using LLMs in Software Design: An Empirical Study of GitHub and a Practitioner Survey](https://arxiv.org/abs/2605.01392) — over-engineering, extraneous modules, empty classes and methods.
10. [Can LLMs Produce Better Object-Oriented Designs than Human-Involved Development?](https://arxiv.org/pdf/2605.19901) — missing abstractions and weaker responsibility separation coexisting with apparent design advantages.
11. [Software Engineering at Google](https://abseil.io/resources/swe-book/html/ch09.html), ch. 9 — small-change review data; the correctness / comprehension / readability triad.
12. Anthropic, [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) — instruction files as prompts, iterated like production prompts.
13. Hunt & Thomas, _The Pragmatic Programmer_ — DRY as a statement about knowledge; and Sandi Metz, "duplication is far cheaper than the wrong abstraction".
14. Kent C. Dodds, [AHA Programming](https://kentcdodds.com/blog/aha-programming) — avoid hasty abstractions.
15. Dan North, [CUPID — for joyful coding](https://dannorth.net/cupid-for-joyful-coding/) — properties rather than principles, as a deliberate answer to SOLID.
16. Meilir Page-Jones, _What Every Programmer Should Know About Object-Oriented Design_ — connascence, and the two rules for reducing it.
17. Kent Beck, _Tidy First?_ — structural and behavioural change never in the same commit.

<!-- Revision 2.0 · supersedes the artifact published 2026-09-03, which lacked §1. -->
