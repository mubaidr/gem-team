---
title: Planner
description: Builds minimal wave plans with ordered waves, routing, handoffs, and risk gates for MEDIUM/HIGH complexity work.
navigation:
  icon: i-lucide-clipboard-list
---

## Role

The Planner creates **decision-complete wave plans** for MEDIUM/HIGH complexity work. It never implements — only plans.

---

## When Delegated

- MEDIUM complexity (multiple dependent tasks, no high-risk)
- HIGH complexity (any high-risk signal: architecture, security, breaking change, etc.)
- `extend` with scope/wave/criteria edits
- Replans triggered by `needs_replan` or review findings

---

## Input: Bounded Planning Context

```yaml
planning_context:
  task_clarifications:
    - "Use existing pagination helper from src/utils/pagination.ts"
    - "Follow OpenAPI conventions in api/conventions.md"
  relevant_context:
    - "user-model: file=src/models/user.ts, fields=id,name,email,createdAt"
    - "api-conventions: file=src/api/conventions.md"
  baseline: {}           # For replans: immutable baseline
  current_plan: {}      # For replans: exact current plan
  review_findings: []   # For replans: reviewer findings
```

**Never gets full repo context** — only objective-aligned clarifications and sufficient discovery.

---

## Output: Wave Plan

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
        acceptance_criteria:
          - "Document REST patterns in src/api/"
          - "Identify pagination helper location"
  - wave: 2
    tasks:
      - task_id: "implement-search"
        agent: "gem-implementer"
        acceptance_criteria:
          - "Filter by name/email (case-insensitive)"
          - "Pagination with page/limit"
          - "Sorting by createdAt/name/email"
          - "OpenAPI documentation"
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

## Key Capabilities

### Task Coalescing (Context Optimization)

Merges tasks sharing a **context base** (all required):
- Same primary agent
- Overlapping files OR one shared research base
- No ordering dependency

**Result**: One task carrying all acceptance criteria. Saves invocation + duplicate context copy.

### Mechanical Self-Check (Before Emission)

Every MEDIUM/HIGH plan validated for:

| Check | Failure Action |
|-------|----------------|
| All tasks have assignable owners | Fix + re-run once |
| Waves are positive integers | Fix + re-run once |
| Per-task acceptance criteria exist | Fix + re-run once |
| Dependencies resolvable (no cycles) | Fix + re-run once |
| Cluster consistency (shared_context valid) | Fix + re-run once |

**Routine MEDIUM passes on self-check alone**. HIGH/risky/explicit/critic signals still route to Reviewer.

### Bounded Exploration

Deep exploration becomes a **planned Researcher task** with explicit `exploration_mode` — research cost budgeted in plan, not spent silently.

---

## Replan Handling

For `needs_replan` or review-triggered replans:

```yaml
# Replan input (immutable baseline preserved)
baseline:
  plan_id: "20250115-user-search-api"
  objective: "Add user search endpoint..."
  acceptance_criteria: [...]
current_plan: { ... }  # Exact current plan
review_findings:
  - finding: "API contract changed"
    severity: "high"
    task: "implement-search"
```

**Guardrails**:
- Immutable baseline (objective + criteria never change)
- Max 2 replans (default)
- Must show measurable progress
- Records reason, task changes, preserved criteria, new risks
- Empty/repetitive → escalate

---

## Plan Persistence

Saved to `docs/plan/{plan_id}/plan.yaml` — **authoritative task source**.
On resume: loads verbatim, never reconstructs from conversation.

---

## Key Rules

1. **Bounded input** — Only objective-aligned context
2. **Coalesce aggressively** — Merge overlapping context
3. **Self-check first** — Mechanical validation before emission
4. **Review independent** — Self-check ≠ Reviewer
5. **Persist for MEDIUM/HIGH** — `plan.yaml` is authoritative
6. **Replan bounded** — Max 2, immutable baseline, measurable progress

---

## Related Pages

- [Workflow: Plan](/guide/plan) — Full planning phase detail
- [Workflow: Execute](/guide/workflow-execute) — How plans execute
- [Orchestrator](/agents/orchestrator) — Who delegates to Planner
- [Reviewer](/agents/reviewer) — Pre-execution review gate