---
title: "gem-documentation-writer"
description: "Reference for the agent that owns docs, PRDs, memory updates, skill extraction, and AGENTS.md maintenance."
---

`gem-documentation-writer` is the durable artifact owner in Gem Team. It lives in `.apm/agents/gem-documentation-writer.agent.md` and handles much more than README edits: walkthroughs, API documentation, PRD creation, AGENTS.md updates, memory updates, and skill creation all route through this agent.

## Source

- Module path: `.apm/agents/gem-documentation-writer.agent.md`
- Invocation name: `gem-documentation-writer`

## Signature

```ts
gem-documentation-writer(input: {
  task_id: string;
  plan_id: string;
  plan_path: string;
  task_definition: object;
  task_type: "documentation" | "walkthrough" | "update";
  audience: "developers" | "end_users" | "stakeholders";
  coverage_matrix: string[];
  action?: "create_prd" | "update_prd" | "update_agents_md";
  task_clarifications?: Array<{ question: string; answer: string }>;
  architectural_decisions?: Array<{ decision: string; rationale: string }>;
  findings?: Array<{ type: string; content: string }>;
  patterns?: Array<{
    name: string;
    when_to_apply: string;
    code_example: string;
    anti_pattern: string;
    context: string;
    confidence: number;
  }>;
}) => {
  status: "completed" | "failed" | "in_progress" | "needs_revision";
  task_id: string;
  plan_id: string;
  summary: string;
  failure_type: "transient" | "fixable" | "needs_replan" | "escalate";
  extra: {
    docs_created?: Array<{ path: string; title: string; type: string }>;
    docs_updated?: Array<{ path: string; title: string; changes: string }>;
    memory_updated?: Array<{ path: string; type: string; count: number }>;
    parity_verified: boolean;
    coverage_percentage: number;
  };
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `task_id` | `string` | — | Documentation task identifier. |
| `plan_id` | `string` | — | Parent plan identifier. |
| `plan_path` | `string` | — | Location of the plan file. |
| `task_definition` | `object` | — | Task-specific documentation context. |
| `task_type` | `"documentation" \| "walkthrough" \| "update"` | — | Core documentation mode. |
| `audience` | `"developers" \| "end_users" \| "stakeholders"` | — | Intended reader group. |
| `coverage_matrix` | `string[]` | `[]` | Required coverage checklist. |

## Behavior highlights

The file also supports extended actions beyond the base signature:

- PRD creation and updates,
- AGENTS.md maintenance,
- memory updates,
- skill creation and skill updates.

It is the only agent with a built-in `skill_format_guide`, which is why the orchestrator delegates skill extraction here.

## Example

```json
{
  "task_id": "task-7",
  "plan_id": "20260507-request-logging",
  "plan_path": "docs/plan/20260507-request-logging/plan.yaml",
  "task_type": "documentation",
  "audience": "developers",
  "coverage_matrix": ["configuration", "migration note", "failure modes"],
  "task_definition": {}
}
```

Use this agent whenever work needs to become durable project knowledge rather than a transient response.
