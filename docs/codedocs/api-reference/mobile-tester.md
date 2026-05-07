---
title: "gem-mobile-tester"
description: "Reference for the mobile testing agent that validates flows, gestures, lifecycle behavior, and device-farm runs."
---

`gem-mobile-tester` is the mobile E2E validation specialist in Gem Team. It is defined in `.apm/agents/gem-mobile-tester.agent.md` and supports iOS and Android flow testing, gesture checks, lifecycle events, performance baselines, push notifications, and optional device-farm execution.

## Source

- Module path: `.apm/agents/gem-mobile-tester.agent.md`
- Invocation name: `gem-mobile-tester`

## Signature

```ts
gem-mobile-tester(input: {
  task_id: string;
  plan_id: string;
  plan_path: string;
  task_definition: {
    platforms: Array<"ios" | "android">;
    test_framework: "detox" | "maestro" | "appium";
    test_suite: object;
    device_farm?: object;
    performance_baseline?: object;
    fixtures?: object;
    cleanup: boolean;
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
    | "platform_specific"
    | "new_failure"
    | "fixable"
    | "needs_replan"
    | "escalate";
  extra: {
    execution_details: {
      platforms_tested: string[];
      framework: string;
      tests_total: number;
      time_elapsed: string;
    };
    evidence_path: string;
  };
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `platforms` | `Array<"ios" \| "android">` | — | Target mobile platforms. |
| `test_framework` | `"detox" \| "maestro" \| "appium"` | — | Mobile automation framework. |
| `test_suite` | `object` | — | Flows, scenarios, gestures, lifecycle cases, and push tests. |
| `device_farm` | `object` | `undefined` | Remote execution provider settings. |
| `cleanup` | `boolean` | — | Whether to remove temporary fixtures and artifacts. |

## Workflow summary

The file covers setup, flow execution, gesture testing, lifecycle validation, push notifications, performance capture, retry handling, and cleanup. It also distinguishes platform-specific failures from generic regressions.

## Example

```json
{
  "task_id": "task-mobile-test-2",
  "plan_id": "20260507-mobile-auth",
  "plan_path": "docs/plan/20260507-mobile-auth/plan.yaml",
  "task_definition": {
    "platforms": ["ios", "android"],
    "test_framework": "detox",
    "test_suite": {
      "flows": ["login", "foreground-resume"],
      "gestures": ["swipe-dismiss"]
    },
    "cleanup": true
  }
}
```

Route mobile verification here instead of to the browser tester whenever native lifecycle or gesture semantics matter.
