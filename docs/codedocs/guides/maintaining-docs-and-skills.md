---
title: "Maintaining Docs And Skills"
description: "Use Gem Team's documentation writer, release workflow, and skill extraction flow to keep the harness current."
---

Gem Team treats documentation as an operational artifact, not a side task. The planner auto-includes documentation work for new features, and the documentation writer owns PRD updates, AGENTS.md maintenance, walkthroughs, memory updates, and skill creation.

## Problem

You want Gem Team changes to stay documented, releasable, and reusable across future tasks instead of leaving knowledge stranded in one run.

## Solution

Route long-lived updates through `gem-documentation-writer`, then follow the repo’s contribution and release conventions.

<Steps>
<Step>
### Add a documentation task to the plan

The planner source explicitly states:

```text
New feature/API tasks: Add gem-documentation-writer task (final wave)
```

A plan task can look like this:

```yaml
- id: task-7
  title: Update API docs and configuration guide
  wave: 3
  agent: gem-documentation-writer
  task_type: documentation
  audience: developers
  coverage_matrix:
    - new env var
    - migration note
    - failure mode docs
```
</Step>
<Step>
### Persist learnings from successful execution

The documentation writer supports `memory_update`, `skill_create`, and `skill_update`. High-confidence patterns can become reusable skills under `docs/skills/{skill-name}/SKILL.md`.

```json
{
  "task_type": "skill_create",
  "patterns": [
    {
      "name": "wave-safe-auth-refactor",
      "when_to_apply": "Auth refactors spanning tests, implementation, and security review",
      "code_example": "Plan contracts before changing middleware order",
      "anti_pattern": "Refactor auth sequencing without a contract or reviewer task",
      "context": "Express auth middleware",
      "confidence": 0.9
    }
  ]
}
```
</Step>
<Step>
### Follow the contribution rules for repo changes

`CONTRIBUTING.md` requires Conventional Commits because Release Please drives changelog and versioning.

```bash
git commit -m "feat(gem-reviewer): add deeper PRD compliance checks"
git commit -m "docs: update installation instructions"
git commit -m "fix(gem-debugger): improve regression evidence capture"
```

The document also describes the shared `.agent.md` skeleton so contributors know which sections are mandatory.
</Step>
<Step>
### Verify the release-facing files

Check the files that external tooling consumes:

```bash
sed -n '1,120p' plugin.json
sed -n '1,120p' apm.yml
sed -n '1,120p' .github/plugin/plugin.json
```

Those files should still point at `.apm/agents` and reflect the intended version metadata.
</Step>
</Steps>

## Complete workflow example

A realistic Gem Team maintenance cycle looks like this:

1. Update one or more agent specs in `.apm/agents/`.
2. Add or update README, PRD, or skill docs through the documentation writer.
3. Use a Conventional Commit with a meaningful scope.
4. Let Release Please generate changelog entries and version bumps.

That workflow is visible in the repo itself: `CHANGELOG.md` shows frequent documentation-focused and agent-focused releases, and `release-please-config.json` plus `.release-please-manifest.json` back that automation.

## Why Gem Team centralizes this work

The documentation writer exists because documentation, memory, and skill extraction all require repository-wide awareness. An implementer can discover a useful pattern, but it should not also decide how to encode that pattern into durable project knowledge. Centralizing those mutations keeps the system more auditable.

<Callout type="warn">Do not auto-promote every interesting implementation detail into AGENTS.md. The orchestrator explicitly requires user approval for convention changes, because AGENTS.md is governance, not scratch space.</Callout>

If you are new to the harness, pair this guide with [Installation](/docs/guides/installation) and the [Documentation Writer API page](/docs/api-reference/documentation-writer).
