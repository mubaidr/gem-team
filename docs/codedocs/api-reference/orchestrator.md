---
title: "gem-orchestrator"
description: "Reference for the public coordinator that routes all Gem Team work through research, planning, execution, and review."
---

`gem-orchestrator` is the only user-invocable agent in the repository. It is defined in `.apm/agents/gem-orchestrator.agent.md`, marked `user-invocable: true`, and explicitly told to never execute work directly. In practice, this is the public entry point for the entire harness.

## Source

- Module path: `.apm/agents/gem-orchestrator.agent.md`
- Registered through: `plugin.json` and tool-specific plugin manifests
- Public name: `gem-orchestrator`

## Signature

Gem Team does not expose typed runtime imports, so the usable signature is synthesized from the file’s `argument-hint` plus its status summary format:

```ts
gem-orchestrator(input: {
  objective: string;
  plan_id?: string;
}) => {
  plan_id: string;
  progress: string;
  waves: string;
  blocked: string;
  next: string;
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `objective` | `string` | — | Natural-language task, feature request, or follow-up instruction. |
| `plan_id` | `string` | generated as `{YYYYMMDD}-{slug}` | Existing plan identifier when resuming or modifying work. |

## Return shape

The source file’s `Status Summary Format` returns a terse status block rather than a large object. Key fields are:

- plan identifier and objective
- completed versus total tasks
- current wave progress
- blocked task count
- next wave summary

## Internal behavior

The workflow is fixed:

1. Generate `plan_id` if needed.
2. Clarify intent with `gem-researcher`.
3. Persist clarifications through `gem-documentation-writer` if necessary.
4. Route to research, planning, or execution.
5. Execute all waves without pausing between them.
6. Summarize, persist learnings, and optionally run final review.

The file also sets retry ceilings, debugger escalation, and parallel delegation limits.

## Example

```text
Use gem-orchestrator.
Objective: add caching to the product API and document the invalidation rules.
```

Typical output:

```text
Plan: 20260507-product-api-cache | Add caching to the product API
Progress: 0/5 tasks (0%)
Waves: Wave 1 (0/2)
Blocked: 0
Next: Wave 1 (2 tasks)
```

## Related agents

Start here, then read [gem-researcher](/docs/api-reference/researcher), [gem-planner](/docs/api-reference/planner), and [gem-reviewer](/docs/api-reference/reviewer).
