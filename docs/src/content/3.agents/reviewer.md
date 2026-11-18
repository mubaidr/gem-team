---
title: Reviewer
description: Three-axis review (mode, target, scope) for quality, security, contracts, compliance.
navigation:
  icon: i-lucide-shield-check
---

## Role

Evaluates plans, code, decisions, docs, config, integrations. Three independent axes.

## Three Axes

| Axis | Values |
|------|--------|
| **review_mode** | `standard` \| `high` \| `critic` (read-only) |
| **review_target** | `plan` \| `task` \| `code` \| `decision` \| `docs` \| `config` \| `integration` |
| **review_scope** | `changed` \| `affected` \| `full` |

## Review Modes

- **standard**: Routine MEDIUM, changed files
- **high**: HIGH/risk signals, affected files
- **critic**: Architecture/breaking/cross-domain, full scope, read-only

## Targets

| Target | Examines |
|--------|----------|
| `plan`/`task`/`decision` | Handed artifact |
| `code`/`config`/`integration` | Target as subject |

## Trigger Conditions

| Condition | Mode | Target |
|-----------|------|--------|
| HIGH complexity | high/critic | integration |
| High-risk signals | critic | decision/integration |
| Explicit request | per request | per request |

## Over-Engineering Pass

Auto for `code`/`integration`: YAGNI, premature abstraction, unnecessary complexity.

## Output

```yaml
verdict: "pass"  # pass | warning | blocking | needs_revision
# Critic:
critic_verdict: "proceed"  # proceed | revise | defer | reject | needs_input
challenges: [...]
alternatives: [...]
```

## Definition

[`.apm/agents/gem-reviewer.agent.md`](/.apm/agents/gem-reviewer.agent.md)

## Related

- [Reviewer Routing](/agents/reviewer-routing)
- [Workflow: Plan](/guide/plan)
- [Workflow: Execute](/guide/workflow-execute)