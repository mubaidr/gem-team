---
title: Reviewer
description: Three-axis review (mode, target, scope) for quality, security, contracts, compliance.
navigation:
  icon: i-lucide-shield-check
seo:
  title: Reviewer Agent - Gem Team
  description: The gem-reviewer performs independent quality, security, and contract reviews before anything merges.
  ogTitle: Reviewer Agent - Gem Team
  ogDescription: The gem-reviewer performs independent quality and security reviews.
---

## Role

Evaluates plans, code, decisions, docs, config, integrations. Three independent axes. Critic mode is read-only - evaluates assumptions, counterexamples, risks, alternatives, reversibility. Does not implement or mutate files.

## When to Delegate

| Scenario                                              | Delegate Reviewer? | Why                           |
| ----------------------------------------------------- | ------------------ | ----------------------------- |
| HIGH complexity work                                  | ✅                 | Review gate required          |
| High-risk signals (`architecture`, `breaking_change`) | ✅                 | Critic or high mode           |
| Explicit review request                               | ✅                 | Per-request review            |
| Routine MEDIUM (no risk)                              | Optional           | Self-check may suffice        |
| Direct implementation                                 | ❌                 | Out of scope; use Implementer |

## Three Axes

| Axis              | Values                                                                          |
| ----------------- | ------------------------------------------------------------------------------- |
| **review_mode**   | `standard` \| `high` \| `critic` (read-only)                                    |
| **review_target** | `plan` \| `task` \| `code` \| `decision` \| `docs` \| `config` \| `integration` |
| **review_scope**  | `changed` \| `affected` \| `full`                                               |

## Review Modes

- **standard**: Routine MEDIUM, changed files
- **high**: HIGH/risk signals, affected files
- **critic**: Architecture/breaking/cross-domain, full scope, read-only

## Targets

| Target                        | Examines          |
| ----------------------------- | ----------------- |
| `plan`/`task`/`decision`      | Handed artifact   |
| `code`/`config`/`integration` | Target as subject |

## Trigger Conditions

| Condition         | Mode        | Target               |
| ----------------- | ----------- | -------------------- |
| HIGH complexity   | high/critic | integration          |
| High-risk signals | critic      | decision/integration |
| Explicit request  | per request | per request          |

## Over-Engineering Pass

Auto for `code`/`integration`: YAGNI, premature abstraction, unnecessary complexity.

## Output

```yaml
verdict: "pass" # pass | warning | blocking | needs_revision
# Critic:
critic_verdict: "proceed" # proceed | revise | defer | reject | needs_input
challenges: [...]
alternatives: [...]
```

## Definition

[`.apm/agents/gem-reviewer.agent.md`](/.apm/agents/gem-reviewer.agent.md)

## Related

- [Reviewer Routing](/agents/reviewer-routing)
- [Workflow: Plan](/guide/plan)
- [Workflow: Execute](/guide/workflow-execute)
