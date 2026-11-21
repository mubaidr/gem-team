---

title: Phase 3 — Execute
description: Run waves, delegate to specialists, verify results, and persist state.
navigation:
  icon: i-lucide-play-circle
seo:
  title: Execute — Gem Team
  description: Phase 3: run waves, delegate to specialists, verify results, and handle failures.
  ogTitle: Execute — Gem Team
  ogDescription: Phase 3: run waves and delegate to specialists.
---


## Purpose

Execute the wave plan through ordered waves with parallel task execution, scoped delegation, and verification gates.

---

## Wave Loop (Single Loop for All Planned Work)

```
Load plan.yaml
       │
       ▼
┌──────────────────┐
│  Lowest Incomplete │──► Schedule eligible tasks
│      Wave          │     (plan order, max_concurrent)
└────────┬───────────┘
         │
         ▼
┌──────────────────┐
│  Delegate Each   │──► Specialist receives:
│     Task         │     plan_id, config_snapshot,
└────────┬───────────┘     cluster shared_context,
         │                 task_id, task_definition,
         ▼                 handoff (cache-lifetime order)
┌────────────────__┐
│  Gate & Accept   │──► Aggregate criteria
│     Results      │     Invoke Reviewer if triggered
└────────┬──────────┘
         │
         ▼
┌──────────────────┐
│  Persist State   │──► Update plan.yaml / status.yaml
│   & Evidence     │     Track retries_used
└────────┬───────────┘
         │
         ▼
   Next wave or Done
```

:::tip[WAVE BARRIERS]
Each wave completes fully before the next starts. Within a wave, independent tasks run in parallel (up to `max_concurrent_agents`).
:::

---

## Delegation Payload (Cache-Lifetime Order)

Every task receives fields in **cache-lifetime order** for maximum prefix reuse:

```yaml
# Plan-constant (same for all tasks in plan)
plan_id: "20261121-user-search-api"
config_snapshot: { ... }

# Cluster-shared (same for tasks in cluster)
context_cluster: "api-search"
shared_context: "REST patterns: ...; Pagination: src/utils/pagination.ts"

# Per-task (differs per task)
task_id: "implement-search"
task_definition:
  objective: "Implement GET /api/users/search"
  acceptance_criteria: [...]
  handoff:
    constraints: [...]
    relevant_context:
      - "research-api-patterns: patterns=REST, pagination=src/utils/pagination.ts"
    plan_context:
      architectural_boundaries: ["api layer", "user module"]
      risk_decisions: ["stateless search", "cursor pagination"]
    global_findings:
      - finding: "Prisma case-insensitive: contains + mode: insensitive"
        confidence: 0.98
        source_task: "research-api-patterns"
    memory_injection:
      repo: ["API conventions: Zod for query validation"]
      session: []

# Per-attempt (only on retry)
retries_used: 1
```

---

## Scheduling Rules

| Rule                     | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| **Plan order**           | Waves execute sequentially (1 → 2 → 3)                  |
| **Parallel within wave** | Up to `orchestrator.max_concurrent_agents` (default: 2) |
| **Cluster contiguity**   | Tasks sharing `context_cluster` run back-to-back        |
| **Ownership protection** | Overlapping ownership → never parallel (serialized)     |
| **Retries count**        | Each retry consumes a concurrency slot                  |

---

## Specialist Delegation

| Agent                      | When Delegated                   | Key Handoff Fields                                         |
| -------------------------- | -------------------------------- | ---------------------------------------------------------- |
| `gem-implementer`          | Features, fixes, refactors (TDD) | `constraints`, `relevant_context`, `plan_context`          |
| `gem-debugger`             | Bug fixes (after diagnosis)      | `failure`, `expected_behavior`, `evidence`                 |
| `gem-researcher`           | Exploration tasks                | `exploration_mode`, `handoff`                              |
| `gem-reviewer`             | Review gates                     | `review_mode`, `review_target`, `review_scope`, `evidence` |
| `gem-browser-tester`       | UI/E2E testing                   | Test scope, visual regression config                       |
| `gem-devops`               | Infrastructure, CI/CD            | Deployment target, approval gates                          |
| `gem-documentation-writer` | Docs, API docs, diagrams         | Target audience, format, scope                             |
| `gem-code-simplifier`      | Refactoring, dead code removal   | Target files, preservation rules                           |

**All delegation via Orchestrator** — never direct agent-to-agent.

---

## Verification Gates

### Automatic Review Trigger (Per-Task)

Reviewer invoked when **any** condition met:

- HIGH complexity
- High-risk signals (`architecture`, `breaking_change`, `cross_domain_impact`)
- Critic signals from Phase 0
- Explicit review request
- Insufficient/contradictory evidence

### Review Handoff

```yaml
review_mode: "standard" # standard | high | critic
review_target: "integration" # plan | task | code | decision | docs | config | integration
review_scope: "changed" # changed | affected | full
handoff:
  target_reference: "src/api/users/search.ts"
  criteria:
    - "API conventions followed"
    - "Contract integrity (request/response types)"
    - "Security: input validation"
  risk_ref: "api_change, contract_change"
  evidence:
    - "tests/api/users/search.test.ts"
    - "src/api/conventions.md"
```

**Reviewer evaluates what it's handed** — `plan`/`task`/`decision` reviews don't gather more; `code`/`config`/`integration` reviews read the target as subject.

### Post-Wave Quality Gate

Runs after all tasks in a wave complete and before persisting state / starting the next wave. Triggered when plan complexity is `MEDIUM` or `HIGH`, or any high-risk signal is present.

`gem-reviewer` is invoked twice in parallel:

| Review      | Target        | Scope     | Purpose                             |
| ----------- | ------------- | --------- | ----------------------------------- |
| Integration | `integration` | `changed` | Full test suite across wave outputs |
| Code review | `code`        | `changed` | Review all modified files in wave   |

`review_mode` follows risk/complexity:

- `standard` — MEDIUM, no high-risk signals
- `high` — HIGH complexity or high-risk signals
- `critic` — `architecture`, `breaking_change`, `cross_domain_impact` signals

Failure routing: `gem-debugger` → `gem-implementer` for test failures; owning specialist for code review findings. Next wave is blocked until the gate passes.

### Final Plan-Wide Review Gate

Runs after all waves complete and before Phase 4 output. Triggered when plan complexity is `MEDIUM` or `HIGH`, or any high-risk signal is present.

`gem-reviewer` is invoked twice in parallel with `review_scope: full`:

| Review      | Target        | Scope  | Purpose                                 |
| ----------- | ------------- | ------ | --------------------------------------- |
| Integration | `integration` | `full` | Full test suite across all plan outputs |
| Code review | `code`        | `full` | Review all plan-modified files          |

Plus a plan review: `review_target: plan`, `review_scope: full` to validate architectural coherence and acceptance criteria coverage across all waves.

Failure routing: `gem-debugger` → `gem-implementer` for failures; planner for plan-level findings. Phase 4 output is blocked until the gate passes.

---

## Persistence & State Tracking

### Persistent Plans (MEDIUM/HIGH)

```
docs/plan/{plan_id}/
├── plan.yaml              # Authoritative (never modified after creation)
├── status.yaml            # Mutable execution state
├── wave-1/
│   ├── task-a/
│   │   ├── output.md      # Agent output
│   │   ├── handoff.yaml   # Typed handoff for downstream
│   │   └── artifacts/     # Logs, traces, screenshots
│   └── ...
└── wave-2/
    └── ...
```

### Status.yaml (Updated Each Wave)

```yaml
plan_id: "20261121-user-search-api"
current_wave: 2
completed_waves: [1]
completed_tasks:
  - task_id: "research-api-patterns"
    status: "completed"
    output_path: "wave-1/research-api-patterns/output.md"
    handoff_path: "wave-1/research-api-patterns/handoff.yaml"
pending_tasks:
  - task_id: "implement-search"
    status: "in_progress"
    retries_used: 0
blocked_tasks: []
```

### Ephemeral Plans (TRIVIAL/LOW)

- No `docs/plan/` artifacts
- State tracked in memory only
- `plan_id` used for correlation

---

## Result Classification & Routing

After each task, Orchestrator classifies result:

| Classification                            | Meaning                  | Handler                                              |
| ----------------------------------------- | ------------------------ | ---------------------------------------------------- |
| `completed`                               | Success, criteria met    | Continue to next task                                |
| `needs_retry`                             | Transient failure        | Retry same task (max 3x, increment `retries_used`)   |
| `needs_revision` + `clarification_needed` | Scope ambiguous          | Ask user, no retry                                   |
| `needs_revision` (plan)                   | Plan issue               | Planner with `revision_findings`                     |
| `needs_revision` (code)                   | Code issue               | Owning specialist with `revision_findings`           |
| `failed`                                  | Execution failure        | Infer: `fixable` (code) or `needs_replan` (analysis) |
| `fixable` / `regression` / `new_failure`  | Code bug                 | Debugger → Implementer                               |
| `needs_replan`                            | Scope/dependencies wrong | Planner (bounded replan)                             |
| `flaky`                                   | Intermittent             | Specialist re-runs once                              |
| `platform_specific`                       | Platform issue           | Specialist verifies criteria                         |
| `test_bug`                                | Test defect              | Debugger → Implementer                               |
| `blocked` / `escalate`                    | External dependency      | Stop path, escalate to user                          |

---

## Evidence Handling

### Task-Scoped Artifacts (Detailed Evidence)

```
wave-3/implement-search/
├── output.md              # Summary for Orchestrator
├── handoff.yaml           # Typed handoff for next wave
├── artifacts/
│   ├── test-results.xml   # Full test output
│   ├── lint-report.json   # Lint results
│   ├── typecheck.log      # TypeScript output
│   └── coverage/          # Coverage reports
└── handoff-relevant/      # Referenced by downstream tasks
    └── api-contract.json  # OpenAPI spec for reviewer
```

### Handoff References (Not Inlined)

```yaml
# In next task's handoff.relevant_context
- "implement-search: handoff=wave-3/implement-search/handoff.yaml"
- "implement-search: test_results=wave-3/implement-search/artifacts/test-results.xml"
```

**Exception**: `shared_context` findings (consumed by ≥2 tasks) inlined verbatim.

---

## Learning & Memory Promotion

After **final success** (all waves complete):

1. **Evaluate findings** for:
   - Stability (`stable: true`)
   - Reusability (applies beyond this task)
   - Repetition (seen in multiple tasks)
   - Persistence (durable pattern)

2. **Promote if confidence ≥ 0.95** to:
   - **Repo memory** (workspace-scoped, persists with repository)
   - **Session memory** (conversation-scoped, clears after)

3. **Package as skill** if workflow pattern is reusable:
   - `.apm/skills/new-skill/SKILL.md`
   - Scripts, references, assets as needed

---

## Scheduling Example: Wave 2 with Two Implementer Tasks

| Task | Agent | Files | Can Run Parallel? |
|------|-------|-------|-------------------|
| implement-search | gem-implementer | search.ts | Yes (with write-search-tests) |
| write-search-tests | gem-implementer | search.test.ts | Yes (same agent, overlapping files) → **serialized** |

**Result**: Both coalesced into one task, single invocation, one context copy.

## Concurrency Math

With `max_concurrent_agents: 2`:

| Wave | Tasks | Parallel Slots Used | Wall-Clock |
|------|-------|---------------------|------------|
| Wave 1 | 1 researcher | 1 | 1 task duration |
| Wave 2 | 2 implementers (coalesced to 1) | 1 | 1 task duration |
| Wave 3 | 1 reviewer | 1 | 1 task duration |

**Total**: 3 sequential waves = 3 task durations (no parallelism possible due to wave barriers).

With `max_concurrent_agents: 4` and independent tasks in a wave:

| Wave | Tasks | Parallel Slots Used | Wall-Clock |
|------|-------|---------------------|------------|
| Wave 1 | 2 researchers (independent) | 2 | 1 task duration |
| Wave 2 | 2 implementers (different files) | 2 | 1 task duration |

**Total**: 2 sequential waves = 2 task durations.

## Post-Wave Quality Gate: Concrete Example

Wave 2 completes (implement-search + write-search-tests). Plan complexity is MEDIUM with risk signal `api_change`.

**gem-reviewer invoked twice in parallel**:

| Review | Target | Scope | Mode | Purpose |
|--------|--------|-------|------|---------|
| Integration | `integration` | `changed` | `standard` | Full test suite across wave outputs |
| Code review | `code` | `changed` | `standard` | Review all modified files in wave |

**If integration review fails**: `gem-debugger` → `gem-implementer` for test failures. Wave 3 blocked until gate passes.

**If code review fails**: Owning specialist addresses findings. Wave 3 blocked until gate passes.

---

## Final Plan-Wide Review Gate: Concrete Example

All waves complete. Plan complexity MEDIUM, risk signal `api_change`.

**gem-reviewer invoked twice in parallel** with `review_scope: full`:

| Review | Target | Scope | Mode | Purpose |
|--------|--------|-------|------|---------|
| Integration | `integration` | `full` | `standard` | Full test suite across all plan outputs |
| Code review | `code` | `full` | `standard` | Review all plan-modified files |

**Plus plan review**: `review_target: plan`, `review_scope: full` — validates architectural coherence and acceptance criteria coverage across all waves.

**If any review fails**: Phase 4 output blocked. Debugger/Implementer or Planner addresses findings, then gate re-runs.

---

## Evidence Handling Example

**Implementer output (minimal)**:
```yaml
status: "completed"
handoff:
  implemented_files:
    - "src/api/users/search.ts"
  test_files:
    - "tests/api/users/search.test.ts"
  api_contract_path: "wave-3/implement-search/artifacts/api-contract.json"
  test_results_path: "wave-3/implement-search/artifacts/test-results.xml"
```

**Next task's handoff.relevant_context**:
```yaml
relevant_context:
  - "implement-search: handoff=wave-3/implement-search/handoff.yaml"
  - "implement-search: test_results=wave-3/implement-search/artifacts/test-results.xml"
```

**Exception**: `shared_context` findings (consumed by ≥2 tasks) inlined verbatim, not referenced by path.

---

## Learning & Memory Promotion Example

After final success for plan `20261121-user-search-api`:

| Finding | Confidence | Source Task | Memory Tier |
|---------|------------|-------------|-------------|
| Pagination helper pattern reusable across endpoints | 0.98 | implement-search | repo |
| Zod query validation convention for search params | 0.96 | implement-search | repo |
| Prisma case-insensitive search: contains + mode: insensitive | 0.99 | research-api-patterns | repo |

**Skill extraction**: If pagination pattern used in ≥2 tasks → gem-skill-creator packages `.apm/skills/api-pagination/SKILL.md`.

---

## Key Rules

1. **One wave loop** — Ordered waves, parallel within, clustered contiguously
2. **Cache-lifetime payload order** — Plan-constant → cluster → per-task → per-attempt
3. **Scoped delegation** — Each agent gets only what it needs
4. **Verification gates** — Reviewer only when triggered, not routine. Post-wave and final plan-wide gates run by default based on risk/complexity.
5. **Persist state before next wave** — `status.yaml` updated, evidence saved
6. **Classify every result** — No blind retries, route to correct handler
7. **Evidence by reference** — Artifacts in task paths, handoffs reference by path
8. **Learn after success** — Confidence-gated, stable findings only

---

## Next Phase

→ [Phase 4: Output](/guide/workflow-output) — Status reports, learnings, memory promotion
