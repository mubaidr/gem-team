---

title: Orchestrator
description: Central coordinator — classifies, routes, delegates, tracks state, enforces gates.
navigation:
  icon: i-lucide-command
seo:
  title: Orchestrator Agent — Gem Team
  description: "The gem-orchestrator coordinates phases 0-4: classify, route, plan, execute, report."
  ogTitle: Orchestrator Agent — Gem Team
  ogDescription: The gem-orchestrator coordinates phases 0-4.
---


## Role

Entry point for every task. Coordinates Phase 0-4 workflow. **Never executes specialist work** — only classifies, routes, synthesizes, reports. The Orchestrator is the engineering lead: it breaks down work, assigns specialists, checks quality, and learns.

## When to Delegate

| Scenario | Delegate Orchestrator? | Why |
|----------|----------------------|-----|
| Every new task | ✅ | Entry point; classifies and routes |
| Continue existing plan | ✅ | Resumes via exact `plan_id` |
| Direct implementation | ❌ | Never writes code; delegates to specialists |

## Responsibilities

| Phase | Action |
|-------|--------|
| 0: Init | Parse request → `plan_id`, `intent`, provisional complexity, risk signals (evidence only) |
| 1: Route | Fast path vs full plan, research/challenge paths, continue/extend |
| 2: Plan | Delegate to Planner (MEDIUM/HIGH), self-check, and select a pre-execution plan reviewer only for HIGH, high-risk, critic-signal, or explicitly requested work |
| 3: Execute | Wave loop: schedule -> delegate -> persist -> gate. Read-only-only and documentation-only waves skip post-wave gates; other MEDIUM/HIGH or high-risk work runs them. Each gate has at most two attempts with durable state persisted before reviewer invocation. The final review runs at most two parallel code and integration reviewers, with a plan reviewer only for HIGH or critic-risk work. |
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