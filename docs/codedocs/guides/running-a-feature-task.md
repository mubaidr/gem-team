---
title: "Running A Feature Task"
description: "Follow the normal Gem Team path for delivering a feature from objective to summary."
---

This guide shows the intended happy path for Gem Team: describe an objective once, let the orchestrator collect clarifications, create a plan, execute waves, and finish with review plus documentation updates.

## Problem

You need a repeatable way to ship a feature without manually deciding when to research, when to plan, and when to run verification.

## Solution

Start with the orchestrator and let the source-defined phase model drive the workflow.

<Steps>
<Step>
### Send a concrete objective to the orchestrator

```text
Use gem-orchestrator.
Objective: add request logging to the admin API.
Constraints:
- preserve response payloads
- write tests first
- include security review
- update docs for new config
```

This matches the orchestrator contract in `.apm/agents/gem-orchestrator.agent.md`, which always starts with researcher clarify mode.
</Step>
<Step>
### Let Gem Team clarify and research

Typical clarify payload:

```json
{
  "plan_id": "20260507-admin-request-logging",
  "objective": "Add request logging to the admin API",
  "mode": "clarify",
  "task_clarifications": []
}
```

If the change spans multiple layers, the orchestrator routes into research mode for one or more focus areas and saves `research_findings_{focus_area}.yaml`.
</Step>
<Step>
### Review the generated plan

Gem Team plans are DAGs, not flat task lists:

```yaml
plan_id: 20260507-admin-request-logging
objective: Add request logging to the admin API
tasks:
  - id: task-1
    title: Add request logging tests
    wave: 1
    agent: gem-implementer
  - id: task-2
    title: Implement request logging middleware
    wave: 1
    agent: gem-implementer
  - id: task-3
    title: Review logging changes for security and PRD compliance
    wave: 2
    agent: gem-reviewer
    dependencies: [task-1, task-2]
  - id: task-4
    title: Update documentation for logging configuration
    wave: 3
    agent: gem-documentation-writer
    dependencies: [task-3]
```

For medium and high complexity plans, the orchestrator asks the reviewer and sometimes the critic to inspect the plan before execution.
</Step>
<Step>
### Let the orchestrator run the waves

The orchestrator handles:

- agent selection,
- up to four concurrent delegations,
- integration review after each wave,
- debugger-based retries when verification fails.

Expected status summary:

```text
Plan: 20260507-admin-request-logging | Add request logging to the admin API
Progress: 4/4 tasks (100%)
Waves: Wave 3 (1/1)
Blocked: 0
Next: none
```
</Step>
</Steps>

## Complete example with real Gem Team patterns

```text
Objective:
Add per-request audit logging to the admin API.
Do not log secrets or tokens.
Preserve current JSON response envelopes.
Generate user-facing documentation for the new environment variable.
```

That one request naturally exercises multiple source-backed behaviors:

- `gem-researcher` can clarify whether auth middleware or transport layers already own part of the logging surface.
- `gem-planner` can split tests, implementation, review, and docs into separate bounded tasks.
- `gem-reviewer` can grep for secret leakage patterns.
- `gem-documentation-writer` can close the loop with configuration docs.

## Common real-world pattern

Gem Team’s own planner document contains a specific routing rule: "New feature → Add gem-documentation-writer task (final wave)." That is worth leaning on. If you consistently omit documentation from feature objectives, the planner can still add it, but your plans become clearer when you state that expectation up front.

<Callout type="warn">Do not bypass the plan just because the implementation seems obvious. Gem Team’s planner carries the dependency graph, contract definitions, verification steps, and failure modes that the orchestrator needs later. Skipping it removes the structure that makes retries and review coherent.</Callout>

If the happy path breaks, continue to [Handling Failures](/docs/guides/handling-failures).
