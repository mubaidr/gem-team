---
title: Phase 3 — Execute
description: Run waves, delegate to specialists, verify results, and persist state.
navigation:
  icon: i-lucide-play-circle
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
plan_id: "20250115-user-search-api"
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

| Rule | Description |
|------|-------------|
| **Plan order** | Waves execute sequentially (1 → 2 → 3) |
| **Parallel within wave** | Up to `orchestrator.max_concurrent_agents` (default: 2) |
| **Cluster contiguity** | Tasks sharing `context_cluster` run back-to-back |
| **Ownership protection** | Overlapping ownership → never parallel (serialized) |
| **Retries count** | Each retry consumes a concurrency slot |

---

## Specialist Delegation

| Agent | When Delegated | Key Handoff Fields |
|-------|----------------|-------------------|
| `gem-implementer` | Features, fixes, refactors (TDD) | `constraints`, `relevant_context`, `plan_context` |
| `gem-debugger` | Bug fixes (after diagnosis) | `failure`, `expected_behavior`, `evidence` |
| `gem-researcher` | Exploration tasks | `exploration_mode`, `handoff` |
| `gem-reviewer` | Review gates | `review_mode`, `review_target`, `review_scope`, `evidence` |
| `gem-browser-tester` | UI/E2E testing | Test scope, visual regression config |
| `gem-devops` | Infrastructure, CI/CD | Deployment target, approval gates |
| `gem-documentation-writer` | Docs, API docs, diagrams | Target audience, format, scope |
| `gem-code-simplifier` | Refactoring, dead code removal | Target files, preservation rules |

**All delegation via Orchestrator** — never direct agent-to-agent.

---

## Verification Gates

### Automatic Review Trigger

Reviewer invoked when **any** condition met:
- HIGH complexity
- High-risk signals (`architecture`, `breaking_change`, `cross_domain_impact`)
- Critic signals from Phase 0
- Explicit review request
- Insufficient/contradictory evidence

### Review Handoff

```yaml
review_mode: "standard"  # standard | high | critic
review_target: "integration"  # plan | task | code | decision | docs | config | integration
review_scope: "changed"  # changed | affected | full
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
plan_id: "20250115-user-search-api"
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

| Classification | Meaning | Handler |
|----------------|---------|---------|
| `completed` | Success, criteria met | Continue to next task |
| `needs_retry` | Transient failure | Retry same task (max 3x, increment `retries_used`) |
| `needs_revision` + `clarification_needed` | Scope ambiguous | Ask user, no retry |
| `needs_revision` (plan) | Plan issue | Planner with `revision_findings` |
| `needs_revision` (code) | Code issue | Owning specialist with `revision_findings` |
| `failed` | Execution failure | Infer: `fixable` (code) or `needs_replan` (analysis) |
| `fixable` / `regression` / `new_failure` | Code bug | Debugger → Implementer |
| `needs_replan` | Scope/dependencies wrong | Planner (bounded replan) |
| `flaky` | Intermittent | Specialist re-runs once |
| `platform_specific` | Platform issue | Specialist verifies criteria |
| `test_bug` | Test defect | Debugger → Implementer |
| `blocked` / `escalate` | External dependency | Stop path, escalate to user |

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

## Key Rules

1. **One wave loop** — Ordered waves, parallel within, clustered contiguously
2. **Cache-lifetime payload order** — Plan-constant → cluster → per-task → per-attempt
3. **Scoped delegation** — Each agent gets only what it needs
4. **Verification gates** — Reviewer only when triggered, not routine
5. **Persist state before next wave** — `status.yaml` updated, evidence saved
6. **Classify every result** — No blind retries, route to correct handler
7. **Evidence by reference** — Artifacts in task paths, handoffs reference by path
8. **Learn after success** — Confidence-gated, stable findings only

---

## Next Phase

→ [Phase 4: Output](/guide/workflow-output) — Status reports, learnings, memory promotion