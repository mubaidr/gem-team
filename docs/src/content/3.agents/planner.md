---
title: Planner
description: Builds minimal wave plans with ordered waves, routing, handoffs, risk gates.
navigation:
  icon: i-lucide-clipboard-list
seo:
  title: Planner Agent - Gem Team
  description: The gem-planner creates wave plans for MEDIUM/HIGH complexity tasks with handoffs and acceptance criteria.
  ogTitle: Planner Agent - Gem Team
  ogDescription: The gem-planner creates wave plans for MEDIUM/HIGH complexity tasks.
---

## Role

Creates decision-complete wave plans for MEDIUM/HIGH work. **Never implements** - only plans. Produces ordered waves, scoped handoffs, task coalescing, and mechanical self-check.

## When to Delegate

| Scenario                         | Delegate Planner? | Why                             |
| -------------------------------- | ----------------- | ------------------------------- |
| MEDIUM/HIGH complexity task      | ✅                | Persistent plan.yaml required   |
| Multi-task dependent work        | ✅                | Ordered waves with dependencies |
| High-risk feature needing review | ✅                | Review gate configuration       |
| TRIVIAL/LOW task                 | ❌                | Fast path, no planner needed    |
| Direct implementation            | ❌                | Never implements; only plans    |

## Input

```yaml
planning_context:
  task_clarifications: [...]
  relevant_context: [...]
  baseline: {} # replans: immutable
  current_plan: {} # replans: exact current
  review_findings: [] # replans
```

## Output: Wave Plan

```yaml
plan_id: "20261121-user-search-api"
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
