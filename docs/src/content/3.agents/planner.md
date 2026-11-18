---
title: Planner
description: Builds minimal wave plans with ordered waves, routing, handoffs, risk gates.
navigation:
  icon: i-lucide-clipboard-list
---

## Role

Creates decision-complete wave plans for MEDIUM/HIGH work. **Never implements** — only plans.

## When Delegated

- MEDIUM/HIGH complexity
- `extend` with scope/wave/criteria edits
- Replans from `needs_replan` or review findings

## Input

```yaml
planning_context:
  task_clarifications: [...]
  relevant_context: [...]
  baseline: {}      # replans: immutable
  current_plan: {}  # replans: exact current
  review_findings: []  # replans
```

## Output: Wave Plan

```yaml
plan_id: "20250115-user-search-api"
objective: "..."
acceptance_criteria: [...]
complexity: "MEDIUM"
risk_signals: ["api_change"]
waves:
  - wave: 1
    tasks:
      - task_id: "research-api-patterns"
        agent: "gem-researcher"
        exploration_mode: "scan"
        acceptance_criteria: [...]
```

## Key Capabilities

- **Task Coalescing**: merge tasks sharing context base
- **Mechanical Self-Check**: assignable owners, valid deps, positive wave ints
- **Bounded Exploration**: Researcher tasks with explicit mode + budget

## Replan Guardrails

Immutable baseline, max 2 replans, measurable progress.

## Definition

[`.apm/agents/gem-planner.agent.md`](/.apm/agents/gem-planner.agent.md)

## Related

- [Workflow: Plan](/guide/plan)
- [Workflow: Execute](/guide/workflow-execute)
- [Orchestrator](/agents/orchestrator)
- [Reviewer](/agents/reviewer)