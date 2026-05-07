---
title: "gem-debugger"
description: "Reference for the diagnosis agent that reproduces failures, traces root causes, and recommends fixes."
---

`gem-debugger` is Gem Team’s failure analysis specialist. It is defined in `.apm/agents/gem-debugger.agent.md` and exists to prevent blind retry loops. The source file starts from an “Iron Law”: no fixes without root-cause investigation first.

## Source

- Module path: `.apm/agents/gem-debugger.agent.md`
- Invocation name: `gem-debugger`

## Signature

```ts
gem-debugger(input: {
  task_id: string;
  plan_id: string;
  plan_path: string;
  task_definition: object;
  error_context: {
    error_message: string;
    stack_trace?: string;
    failing_test?: string;
    reproduction_steps?: string[];
    environment?: string;
    flow_id?: string;
    step_index?: number;
    evidence?: string[];
    browser_console?: string[];
    network_failures?: string[];
  };
}) => {
  status: "completed" | "failed" | "in_progress" | "needs_revision";
  task_id: string;
  plan_id: string;
  summary: string;
  failure_type: "transient" | "fixable" | "needs_replan" | "escalate";
  extra: {
    root_cause: {
      description: string;
      location: string;
      error_type: string;
    };
    reproduction: {
      confirmed: boolean;
      steps: string[];
    };
    fix_recommendations: Array<{ approach: string; location: string }>;
    lint_rule_recommendations?: Array<{ rule_name: string; affected_files: string[] }>;
    prevention: { suggested_tests: string[] };
    confidence: number;
  };
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `task_id` | `string` | — | Failed task identifier. |
| `plan_id` | `string` | — | Parent plan identifier. |
| `plan_path` | `string` | — | Location of the plan file. |
| `task_definition` | `object` | — | Original task body for context. |
| `error_context` | `object` | — | Structured error evidence, reproduction details, and optional browser data. |

## Workflow summary

The debugger walks through:

1. reproduce,
2. diagnose,
3. bisect if complex,
4. synthesize root cause and fix recommendations,
5. propose prevention tests or lint rules if recurrence is likely.

The file also contains mobile-specific debugging guidance for Android logcat, iOS crash logs, ANR analysis, and React Native diagnostics.

## Example

```json
{
  "task_id": "task-2",
  "plan_id": "20260507-request-logging",
  "plan_path": "docs/plan/20260507-request-logging/plan.yaml",
  "task_definition": {},
  "error_context": {
    "error_message": "Expected 200, received 500",
    "failing_test": "returns validation error without crashing",
    "environment": "ci"
  }
}
```

This agent should be your first stop after a failed wave review, not your last resort.
