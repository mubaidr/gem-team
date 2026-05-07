---
title: "gem-implementer"
description: "Reference for the general implementation agent that follows a TDD cycle for code changes."
---

`gem-implementer` is the default code-writing agent for non-mobile tasks. It is defined in `.apm/agents/gem-implementer.agent.md` and is constrained to TDD plus post-change verification. The planner routes ordinary feature and bug tasks here, while the orchestrator forbids it from reviewing its own work.

## Source

- Module path: `.apm/agents/gem-implementer.agent.md`
- Invocation name: `gem-implementer`

## Signature

```ts
gem-implementer(input: {
  task_id: string;
  plan_id: string;
  plan_path: string;
  task_definition: {
    tech_stack: string[];
    test_coverage: string | null;
  } & Record<string, unknown>;
}) => {
  status: "completed" | "failed" | "in_progress" | "needs_revision";
  task_id: string;
  plan_id: string;
  summary: string;
  failure_type: "transient" | "fixable" | "needs_replan" | "escalate";
  extra: {
    execution_details: {
      files_modified: number;
      lines_changed: number;
      time_elapsed: string;
    };
    test_results: {
      total: number;
      passed: number;
      failed: number;
      coverage: string;
    };
    learnings?: {
      facts?: string[];
      patterns?: unknown[];
      conventions?: unknown[];
    };
  };
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `task_id` | `string` | — | Task identifier from `plan.yaml`. |
| `plan_id` | `string` | — | Parent plan identifier. |
| `plan_path` | `string` | — | Path to the plan file containing the task. |
| `task_definition` | `object` | — | Planner-defined task body, including tech stack, verification, and acceptance criteria. |

## Workflow summary

The source file encodes a short TDD loop:

1. Read inputs and inspect reusable patterns.
2. Write a failing test.
3. Write minimal code to pass.
4. Refactor only if warranted.
5. Run validation and tests.

The agent can emit learnings, but durable persistence is delegated later to `gem-documentation-writer`.

## Example

```json
{
  "task_id": "task-2",
  "plan_id": "20260507-request-logging",
  "plan_path": "docs/plan/20260507-request-logging/plan.yaml",
  "task_definition": {
    "tech_stack": ["node", "express", "vitest"],
    "test_coverage": "targeted unit tests",
    "acceptance_criteria": [
      "Log request metadata without leaking secrets",
      "Preserve existing response payloads"
    ]
  }
}
```

Pair this page with [gem-reviewer](/docs/api-reference/reviewer), because implementation is only considered done after external verification.
