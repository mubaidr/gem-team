---
title: Packaged Skills
description: Reusable SKILL.md playbooks compiled by APM, loaded for matching tasks to keep agent definitions focused.
navigation:
  icon: i-lucide-package
---

## What Are Skills?

Skills are **standard `SKILL.md` playbooks** stored under `.apm/skills/<skill-name>/` that provide reusable, task-specific guidance. They're compiled by APM and loaded automatically for matching tasks.

```
.apm/skills/
├── gem-devops-guidelines/
│   ├── SKILL.md
│   ├── scripts/
│   ├── references/
│   └── assets/
└── your-custom-skill/
    ├── SKILL.md
    ├── scripts/
    ├── references/
    └── assets/
```

---

## Current Packaged Skills

| Skill | Purpose | Activation Scope | Source |
|-------|---------|------------------|--------|
| `gem-devops-guidelines` | Deployment strategies, CI/CD, containers, health checks, rollback, production readiness | DevOps, platform, container, pipeline, release tasks | `.apm/skills/gem-devops-guidelines/SKILL.md` |

---

## Skill Structure

```
.apm/skills/skill-name/
├── SKILL.md              # Main playbook (required)
├── scripts/              # Automation scripts (optional)
├── references/           # External docs, RFCs (optional)
└── assets/               # Diagrams, templates (optional)
```

### SKILL.md Frontmatter (Required)

```markdown
---
name: skill-name              # Must match directory name
description: Capability and activation context
activation_scope: When this skill loads
---
```

---

## Skill Lifecycle

```mermaid
flowchart LR
    A[Successful Pattern\n(≥2 tasks, confidence ≥0.95)] --> B[Orchestrator Identifies]
    B --> C[Delegates to Skill Creator]
    C --> D[Creates .apm/skills/\nskill-name/SKILL.md]
    D --> E[APM Compiles\nfor All Targets]
    E --> F[Available for\nMatching Tasks]
```

---

## Creating a Skill

### 1. Identify Reusable Pattern
- Used in ≥2 successful tasks
- Confidence ≥ 0.95
- Self-contained guidance (not task-specific)

### 2. Delegate to Skill Creator
```yaml
# Orchestrator automatically delegates when criteria met
task_definition:
  objective: "Extract API pagination pattern as skill"
  acceptance_criteria:
    - "SKILL.md with pagination implementation guide"
    - "Script to generate pagination boilerplate"
    - "Reference to pagination RFC"
```

### 3. Skill Creator Produces
```
.apm/skills/api-pagination/
├── SKILL.md
├── scripts/generate-pagination.ts
├── references/pagination-rfc.md
└── assets/pagination-flow.svg
```

### 4. APM Compiles
```bash
apm run pack  # Validates and packages
```

---

## Skill Activation

Skills load **automatically** when task matches `activation_scope`:

```yaml
# In SKILL.md frontmatter
activation_scope: "API endpoint implementation with list/search endpoints"
```

**Matching**: Orchestrator checks task objective/acceptance criteria against activation scopes.

---

## Skill Content Guidelines

| Guideline | Rule |
|-----------|------|
| **Frontmatter name** | Must match directory name exactly |
| **Description** | States capability AND activation context |
| **Progressive disclosure** | Core in SKILL.md, extras in references/scripts/assets |
| **Validation included** | Checklist for skill consumers |
| **No secrets** | No private task data or one-off workarounds |
| **Workflow in skill** | Reusable guidance; task execution in agents |

---

## Example: DevOps Guidelines Skill

**Activation**: `DevOps, platform, container, pipeline, or release tasks`

**Contents**:
- Deployment strategies (rolling, blue-green, canary)
- CI/CD pipeline patterns (PR → staging → smoke → prod)
- Health check configuration (liveness, readiness, startup)
- Rollback strategies and verification
- Mobile release workflows (EAS, Fastlane, TestFlight, Play Store)
- Production approval gates
- Idempotent operation patterns

---

## Using Skills in Tasks

When a skill activates, its guidance is **injected into the task handoff**:

```yaml
# Task handoff includes skill guidance
handoff:
  skill_guidance:
    - skill: "gem-devops-guidelines"
      relevant_sections:
        - "deployment-strategies"
        - "health-checks"
        - "rollback-verification"
```

Agents receive this guidance alongside their normal handoff.

---

## Skill Development

### Local Development
```bash
# Edit skill source
edit .apm/skills/my-skill/SKILL.md

# Validate package
apm run check

# Test install
apm install . --target claude --dry-run
```

### Adding New Skills
1. Create `.apm/skills/new-skill/` directory
2. Write `SKILL.md` with required frontmatter
3. Add scripts/references/assets as needed
4. Run `apm run check` to validate
5. Commit and push — APM handles compilation

---

## Key Rules

1. **Name matches directory** — `name: skill-name` = `.apm/skills/skill-name/`
2. **Activation scope specific** — Enables automatic loading
3. **Progressive disclosure** — Core in SKILL.md, details in subdirs
4. **Validation included** — Checklist for consumers
5. **No secrets/task data** — Generalized, reusable only
6. **Rebuild after changes** — `apm run pack` validates generated targets

---

## Related Pages

- [Skill Creator Agent](/agents/skill-creator) — Who creates skills
- [Features: Learning](/guide/learning) — Skill extraction in learning pillar
- [Workflow: Output](/guide/workflow-output) — Where skills are created
- [Local Development](/resources/local-development) — Building and testing skills