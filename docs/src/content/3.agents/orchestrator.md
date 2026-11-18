---
title: Orchestrator
description: Central coordinator — classifies, routes, delegates, tracks state, enforces gates.
navigation:
  icon: i-lucide-command
---

## Role

Entry point for every task. Coordinates Phase 0-4 workflow. **Never executes specialist work** — only classifies, routes, synthesizes, reports.

## Responsibilities

| Phase | Action |
|-------|--------|
| 0: Init | Parse request → `plan_id`, `intent`, provisional complexity, risk signals (evidence only) |
| 1: Route | Fast path vs full plan, research/challenge paths, continue/extend |
| 2: Plan | Delegate to Planner (MEDIUM/HIGH), self-check, Reviewer if triggered |
| 3: Execute | Wave loop: schedule → delegate → gate → persist |
| 4: Output | Structured status, memory promotion, skill extraction |

## Key Behaviors

- Evidence-only classification (Phase 0) — no repo inspection
- Fast path when: single owner, bounded scope, clear criteria, no risk signals
- Relational invariant fallbacks — infer intent, don't reject valid work
- Failure classification routes to correct handler (Debugger, Planner, escalate)

## Configuration

```yaml
# .gem-team.yaml
orchestrator:
  max_concurrent_agents: 2
  git_commit_on_gate_pass: false
model_routing:
  enabled: false
```

## Definition

[`.apm/agents/gem-orchestrator.agent.md`](/.apm/agents/gem-orchestrator.agent.md)

## Related

- [Workflow](/guide/workflow) — Phase 0-4 detail
- [Failure Handling](/guide/failure-handling) — Classification taxonomy
- [Core Concepts](/getting-started/concepts) — Handoffs, memory, waves