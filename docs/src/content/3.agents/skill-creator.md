---
title: Skill Creator
description: Packages high-confidence patterns into reusable SKILL.md playbooks with scripts, references, assets.
navigation:
  icon: i-lucide-package
seo:
  title: Skill Creator Agent - Gem Team
  description: The gem-skill-creator packages proven patterns into reusable SKILL.md playbooks.
  ogTitle: Skill Creator Agent - Gem Team
  ogDescription: The gem-skill-creator packages proven patterns into reusable skills.
---

## Role

Extracts patterns from successful workflows into reusable `SKILL.md` playbooks. Confidence ≥ 0.95, used ≥ 2 times. Delegated by the Orchestrator when a stable pattern is identified.

## When to Delegate

| Scenario                            | Delegate Skill Creator? | Why                                   |
| ----------------------------------- | ----------------------- | ------------------------------------- |
| Pattern used in ≥2 successful tasks | ✅                      | Proven reuse justifies packaging      |
| Confidence ≥ 0.95 on a pattern      | ✅                      | High-certainty finding                |
| One-off task-specific workaround    | ❌                      | Not reusable; stays in session memory |
| Speculative pattern (not validated) | ❌                      | Below confidence threshold            |

## Skill Criteria

| Criterion              | Requirement                             |
| ---------------------- | --------------------------------------- |
| Usage count            | ≥ 2 successful tasks                    |
| Confidence             | ≥ 0.95                                  |
| Self-contained         | Not task-specific, includes validation  |
| Progressive disclosure | Core in SKILL.md, extras in references/ |
| No secrets             | No private task data/workarounds        |

## Input

```yaml
objective: "Extract API pagination pattern as skill"
acceptance_criteria:
  - "SKILL.md with guide"
  - "Script for boilerplate"
  - "Reference to RFC"
handoff:
  constraints: ["Based on 3+ tasks", "Confidence: 0.98"]
  relevant_context:
    [
      "repo_memory: pagination_helper_reusable=true",
      "implement-search: files=...",
    ]
```

## Output

```yaml
status: "completed"
handoff:
  skill_created: "api-pagination"
  skill_path: ".apm/skills/api-pagination/"
  files:
    [
      "SKILL.md",
      "scripts/generate-pagination.ts",
      "references/pagination-rfc.md",
      "assets/pagination-flow.svg",
    ]
```

## Skill Structure

```
.apm/skills/skill-name/
├── SKILL.md              # Required: name, description, activation_scope
├── scripts/              # Optional automation
├── references/           # Optional external docs
└── assets/               # Optional diagrams/templates
```

## Key Rules

1. Confidence ≥ 0.95
2. Used ≥ 2 times (proven reuse)
3. Self-contained SKILL.md
4. Progressive disclosure
5. No secrets/task data
6. Validation checklist included

## Definition

[`.apm/agents/gem-skill-creator.agent.md`](/.apm/agents/gem-skill-creator.agent.md)

## Related

- [Agents: Skills](/agents/skills) - Skills catalog
- [Features: Learning](/guide/learning) - Skill extraction
