---
title: Reviewer Routing
description: Three-axis review system (mode, target, scope) for precise quality, security, compliance reviews.
navigation:
  icon: i-lucide-git-branch
---

## Three Axes (Orthogonal)

| Axis | Values |
|------|--------|
| **review_mode** | `standard` \| `high` \| `critic` (read-only) |
| **review_target** | `plan` \| `task` \| `code` \| `decision` \| `docs` \| `config` \| `integration` |
| **review_scope** | `changed` \| `affected` \| `full` |

## Mode Details

| Mode | When | Depth |
|------|------|-------|
| `standard` | Routine MEDIUM, explicit | Changed files, criteria check |
| `high` | HIGH, risk signals | Affected files, deep analysis |
| `critic` | Architecture/breaking/cross-domain | Full scope, read-only, challenges assumptions |

## Target Behavior

| Target | Examines |
|--------|----------|
| `plan`/`task`/`decision` | Handed artifact |
| `code`/`config`/`integration` | Target as subject |

## Scope Meaning

| Scope | Evidence |
|-------|----------|
| `changed` | Task's direct changes |
| `affected` | Changes + immediate deps |
| `full` | All relevant code (critic default) |

## Common Combinations

| Scenario | Mode | Target | Scope |
|----------|------|--------|-------|
| Routine MEDIUM plan | standard | plan | changed |
| HIGH feature | high | integration | affected |
| Architecture decision | critic | decision | full |
| Security code | high | code | affected |
| Config change | standard | config | changed |
| Docs review | standard | docs | changed |

## Over-Engineering Pass

Auto for `code`/`integration`: YAGNI, premature abstraction, unnecessary complexity, missing simplest solution.

## Definition

[`.apm/agents/gem-reviewer.agent.md`](/.apm/agents/gem-reviewer.agent.md)

## Related

- [Reviewer Agent](/agents/reviewer)
- [Workflow: Plan](/guide/plan)
- [Workflow: Execute](/guide/workflow-execute)