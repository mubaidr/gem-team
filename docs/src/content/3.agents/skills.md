---

title: Packaged Skills
description: Reusable SKILL.md playbooks compiled by APM, loaded for matching tasks.
navigation:
  icon: i-lucide-package
seo:
  title: Packaged Skills — Gem Team
  description: Packaged skills reference: devops-guidelines and other reusable SKILL.md playbooks.
  ogTitle: Packaged Skills — Gem Team
  ogDescription: Packaged skills reference for Gem Team.
---


## What Are Skills

Standard `SKILL.md` playbooks in `.apm/skills/<skill-name>/` loaded automatically for matching tasks. Skills package proven workflow patterns so agents don't rediscover them each time.

## When a Skill Is Created

| Condition | Threshold |
|-----------|-----------|
| Usage count | ≥ 2 successful tasks |
| Confidence | ≥ 0.95 |
| Self-contained | Not task-specific, includes validation |
| Progressive disclosure | Core in SKILL.md, extras in references/ |
| No secrets | No private task data or workarounds |

## Current Skills

| Skill                   | Purpose                                    | Activation                      | Source                                                                                      |
| ----------------------- | ------------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------- |
| `gem-devops-guidelines` | Deployment, CI/CD, health checks, rollback | DevOps, pipeline, release tasks | [`.apm/skills/gem-devops-guidelines/SKILL.md`](/.apm/skills/gem-devops-guidelines/SKILL.md) |

## Structure

```
.apm/skills/skill-name/
├── SKILL.md              # Required: name, description, activation_scope
├── scripts/              # Optional
├── references/           # Optional
└── assets/               # Optional
```

## Lifecycle

Successful pattern (≥2 tasks, confidence ≥0.95) → Orchestrator identifies → Skill Creator packages → APM compiles → Available for matching tasks.

## Activation

Skills load automatically when task matches `activation_scope` in frontmatter.

## Definition

[`.apm/agents/gem-skill-creator.agent.md`](/.apm/agents/gem-skill-creator.agent.md)

## Related

- [Skill Creator Agent](/agents/skill-creator)
- [Features: Learning](/guide/learning)
- [Workflow: Output](/guide/workflow-output)
