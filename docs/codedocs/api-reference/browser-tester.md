---
title: "gem-browser-tester"
description: "Reference for the browser testing agent that executes flows, scenarios, and visual checks."
---

`gem-browser-tester` is the web UI validation agent in Gem Team. It is defined in `.apm/agents/gem-browser-tester.agent.md` and combines flow execution, scenario validation, console and network checks, accessibility inspection, and visual regression evidence capture.

## Source

- Module path: `.apm/agents/gem-browser-tester.agent.md`
- Invocation name: `gem-browser-tester`

## Signature

```ts
gem-browser-tester(input: {
  task_id: string;
  plan_id: string;
  plan_path: string;
  task_definition: {
    validation_matrix: unknown[];
    flows: unknown[];
    fixtures: Record<string, unknown>;
    visual_regression: Record<string, unknown>;
    contracts: unknown[];
  };
}) => {
  status: "completed" | "failed" | "in_progress" | "needs_revision";
  task_id: string;
  plan_id: string;
  summary: string;
  failure_type:
    | "transient"
    | "flaky"
    | "regression"
    | "new_failure"
    | "fixable"
    | "needs_replan"
    | "escalate";
  extra: {
    console_errors: number;
    network_failures: number;
    retries_attempted: number;
    accessibility_issues: number;
    evidence_path: string;
    flows_executed: number;
    flows_passed: number;
  };
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `task_id` | `string` | — | Browser-test task identifier. |
| `plan_id` | `string` | — | Parent plan identifier. |
| `plan_path` | `string` | — | Location of the plan file. |
| `task_definition.validation_matrix` | `unknown[]` | — | Scenario-driven validation checklist. |
| `task_definition.flows` | `unknown[]` | — | Step-based browser flows with setup, steps, and teardown. |
| `task_definition.fixtures` | `Record<string, unknown>` | `{}` | Test data and interpolated fixture values. |
| `task_definition.visual_regression` | `Record<string, unknown>` | `{}` | Baseline and screenshot comparison settings. |

## Workflow summary

The source file splits work into setup, flow execution, scenario execution, per-page verification, failure handling, cleanup, and output. It also defines a reusable flow DSL with step types like `navigate`, `interact`, `assert`, `branch`, `extract`, `wait`, and `screenshot`.

## Example

```json
{
  "task_id": "task-ui-4",
  "plan_id": "20260507-checkout-redesign",
  "plan_path": "docs/plan/20260507-checkout-redesign/plan.yaml",
  "task_definition": {
    "validation_matrix": [],
    "fixtures": {
      "user": {
        "email": "buyer@example.com"
      }
    },
    "visual_regression": {},
    "contracts": [],
    "flows": [
      {
        "flow_id": "checkout-submit",
        "steps": [
          { "type": "navigate", "url": "/checkout", "wait": "network_idle" },
          { "type": "interact", "action": "click", "selector": "#submit-order" }
        ]
      }
    ]
  }
}
```

Use this agent for evidence-based browser verification, not for implementation.
