---
title: "gem-planner"
description: "Reference for the DAG planner that turns findings and clarifications into plan.yaml."
---

`gem-planner` is the planning engine behind Gem Team’s wave-based execution model. It is defined in `.apm/agents/gem-planner.agent.md` and emits a `plan.yaml` file whose schema is included directly in the agent source.

## Source

- Module path: `.apm/agents/gem-planner.agent.md`
- Invocation name: `gem-planner`

## Signature

```ts
gem-planner(input: {
  plan_id: string;
  objective: string;
  task_clarifications: Array<{ question: string; answer: string }>;
}) => {
  status: "completed" | "failed" | "in_progress" | "needs_revision";
  task_id: null;
  plan_id: string;
  failure_type: "transient" | "fixable" | "needs_replan" | "escalate";
  extra: {
    complexity: "simple" | "medium" | "complex";
  };
  metrics?: object;
  learnings?: {
    risks?: string[];
    patterns?: string[];
  };
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `plan_id` | `string` | — | Stable identifier for the plan file and artifacts. |
| `objective` | `string` | — | The work to decompose into tasks and waves. |
| `task_clarifications` | `Array<{ question: string; answer: string }>` | `[]` | Resolved decisions that become DAG constraints. |

## Output artifact

The most important output is not the JSON summary. It is `docs/plan/{plan_id}/plan.yaml`, which includes:

- plan metrics
- open questions and gaps
- pre-mortem and assumptions
- implementation specification
- contracts between tasks
- task definitions with waves, dependencies, conflicts, estimates, and verification

## Design constraints

The planner source enforces several unusually concrete rules:

- `estimated_files <= 3`
- `estimated_lines <= 300`
- no circular dependencies
- failure modes for high and medium priority work
- auto-inclusion of documentation tasks for new features or APIs

## Example

```json
{
  "plan_id": "20260507-request-logging",
  "objective": "Add request logging to the admin API",
  "task_clarifications": [
    {
      "question": "Preserve existing response envelopes?",
      "answer": "Yes"
    }
  ]
}
```

Read this page together with [Wave Execution](/docs/wave-execution), because the planner defines the data model that wave execution consumes.
