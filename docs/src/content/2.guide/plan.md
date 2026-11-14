---
title: Phase 2 — Plan
description: Build a minimal wave plan with ordered waves, routing, handoffs, and risk gates.
navigation:
  icon: i-lucide-clipboard-list
---

## Purpose

Create a **decision-complete wave plan** for MEDIUM/HIGH complexity work. TRIVIAL/LOW uses fast path or in-memory plan only.

---

## Planning Depth by Complexity

| Complexity | Planning Approach | Artifacts |
|------------|-------------------|-----------|
| **TRIVIAL** | None (fast path) | Correlation ID only |
| **LOW** | In-memory wave plan | Correlation ID only |
| **MEDIUM** | `gem-planner` delegation | Persistent `plan.yaml` |
| **HIGH** | `gem-planner` delegation | Persistent `plan.yaml` + required review |

:::tip[COMPLEXITY DETERMINES PLANNING]
TRIVIAL/LOW = lightweight. MEDIUM/HIGH = full persistent plan with review gates.
:::

---

## Planner Responsibilities

The Planner (`gem-planner`) receives bounded `planning_context` and produces:

1. **Ordered waves** with explicit task ownership
2. **Scoped handoffs** per task (constraints, context, evidence)
3. **Risk signals** per task for review routing
4. **Task coalescing** where context overlaps
5. **Mechanical self-check** before emitting plan

---

## Planning Context (Bounded Input)

```yaml
planning_context:
  task_clarifications:
    - "Use existing pagination helper from src/utils/pagination.ts"
    - "Follow OpenAPI conventions in api/conventions.md"
  relevant_context:
    - "user-model: file=src/models/user.ts, fields=id,name,email,createdAt"
    - "api-conventions: file=src/api/conventions.md"
  baseline: {}  # For replans: immutable baseline
  current_plan: {}  # For replans: exact current plan
  review_findings: []  # For replans: reviewer findings
```

:::warning[BOUNDED CONTEXT]
The Planner never gets full repo context — only objective-aligned clarifications and sufficient discovery.
:::

---

## Task Coalescing (Context Optimization)

Tasks that share a **context base** merge into one:

| Merge Criteria | All Required |
|----------------|--------------|
| Same primary agent | ✅ |
| Overlapping files OR one shared research base | ✅ |
| No ordering dependency | ✅ |

**Result**: One task carrying **all acceptance criteria** of merged tasks.
**Benefit**: Saves invocation + duplicate context copy. No wall-clock cost (ownership overlap already prevented parallel execution).

**Cluster `shared_context`**: Findings consumed by ≥2 tasks inlined once per cluster, frozen for all consumers.

:::tip[CLUSTER OPTIMIZATION]
Tasks with shared context run contiguously. The `shared_context` block is inlined once and frozen for all consumers.
:::

---

## Wave Structure

```yaml
waves:
  - wave: 1
    tasks:
      - task_id: "research-api-patterns"
        agent: "gem-researcher"
        objective: "Explore API conventions and user schema"
        acceptance_criteria:
          - "Document REST patterns in src/api/"
          - "Identify pagination helper location"
        handoff:
          constraints: [...]
          relevant_context: [...]
  
  - wave: 2
    tasks:
      - task_id: "implement-search-endpoint"
        agent: "gem-implementer"
        objective: "Implement GET /api/users/search"
        acceptance_criteria:
          - "Filter by name/email (case-insensitive)"
          - "Pagination with page/limit"
          - "Sorting by createdAt/name/email"
          - "OpenAPI documentation"
        handoff:
          constraints: [...]
          relevant_context:
            - "research-api-patterns: patterns=REST, pagination=src/utils/pagination.ts"
          shared_context: "..."  # Inlined from Wave 1 producer
```

---

## Mechanical Self-Check (Before Plan Emission)

The Planner runs a **mechanical self-check** on every MEDIUM/HIGH plan:

| Check | Failure Action |
|-------|----------------|
| All tasks have assignable owners | Fix + re-run once |
| Waves are positive integers | Fix + re-run once |
| Per-task acceptance criteria exist | Fix + re-run once |
| Dependencies resolvable (no cycles) | Fix + re-run once |
| Cluster consistency (shared_context valid) | Fix + re-run once |

**Persistent failure** → `needs_revision` returned to Orchestrator.
**Routine MEDIUM** passes on self-check alone.
**HIGH / risky / explicit request / critic signals** → Still routes to Reviewer.

---

## Review Gate (Pre-Execution)

| Condition | Review Required? | Mode |
|-----------|------------------|------|
| HIGH complexity | Yes | `high` or `critic` |
| High-risk signals (`architecture`, `breaking_change`, `cross_domain_impact`) | Yes | `critic` |
| Explicit review request | Yes | `standard`/`high` |
| Critic signals from Phase 0 | Yes | `critic` |
| Insufficient/contradictory evidence | Yes | `standard` |
| Routine MEDIUM | No (self-check only) | — |

**Reviewer receives dedicated handoff** with `target_reference`, `criteria`, `risk_ref`, `evidence`.

---

## Plan Persistence

For MEDIUM/HIGH, plan saved to:
```
docs/plan/{plan_id}/
├── plan.yaml          # Authoritative task source
├── status.yaml        # Execution state
├── wave-1/            # Task artifacts
│   ├── research-api-patterns/
│   │   ├── findings.md
│   │   └── handoff.yaml
│   └── ...
└── wave-2/
    └── ...
```

**On resume**: Loads `plan.yaml` verbatim — never reconstructs from conversation.

---

## Replan Guardrails

| Guardrail | Rule |
|-----------|------|
| **Immutable baseline** | Objective + criteria never change |
| **Max 2 replans** | Default limit (configurable) |
| **Lineage tracked** | `revision`, `replan_count` in plan |
| **Reason recorded** | Each replan documents why |
| **Progress measurable** | Must show forward progress |
| **Empty/repetitive** | Escalates instead of looping |

**Replan types:**
- `needs_revision` → Revise plan/context (Planner or owning specialist)
- `needs_retry` → Retry execution within cap (Orchestrator manages)

---

## Example: MEDIUM Plan Output

```yaml
plan_id: "20250115-user-search-api"
objective: "Add user search endpoint with filtering and pagination"
acceptance_criteria:
  - "GET /api/users/search?q=... returns filtered results"
  - "Pagination with page/limit params"
  - "OpenAPI documentation"
complexity: "MEDIUM"
risk_signals: ["api_change", "contract_change"]
waves:
  - wave: 1
    tasks:
      - task_id: "research-api-patterns"
        agent: "gem-researcher"
        exploration_mode: "scan"
  - wave: 2
    tasks:
      - task_id: "implement-search"
        agent: "gem-implementer"
      - task_id: "write-search-tests"
        agent: "gem-implementer"
    # Coalesced: same agent, overlapping files, no dependency
  - wave: 3
    tasks:
      - task_id: "integration-review"
        agent: "gem-reviewer"
        review_mode: "standard"
        review_target: "integration"
        review_scope: "changed"
review_required: true
review_mode: "standard"
review_target: "integration"
review_scope: "changed"
```

---

## Key Rules

1. **Bounded input** — Planner gets only what's needed
2. **Coalesce aggressively** — Merge overlapping context
3. **Self-check first** — Mechanical validation before emission
4. **Review independent** — Self-check ≠ Reviewer
5. **Persist for MEDIUM/HIGH** — `plan.yaml` is authoritative
6. **Replan bounded** — Max 2, immutable baseline, measurable progress

---

## Next Phase

→ [Phase 3: Execute](/guide/workflow-execute) — Wave loop, delegation, verification, persistence