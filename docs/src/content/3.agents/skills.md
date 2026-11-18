---
title: Packaged Skills
description: Reusable SKILL.md playbooks compiled by APM, loaded for matching tasks.
navigation:
  icon: i-lucide-package
---

## What Are Skills

Standard `SKILL.md` playbooks in `.apm/skills/<skill-name>/` loaded automatically for matching tasks.

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
