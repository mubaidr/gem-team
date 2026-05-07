---
title: "gem-implementer-mobile"
description: "Reference for the mobile implementation agent covering React Native, Expo, and Flutter tasks."
---

`gem-implementer-mobile` is the mobile counterpart to the general implementer. It lives in `.apm/agents/gem-implementer-mobile.agent.md` and adds platform-specific validation, simulator recovery steps, and performance benchmarking expectations that do not belong in the web or backend agent.

## Source

- Module path: `.apm/agents/gem-implementer-mobile.agent.md`
- Invocation name: `gem-implementer-mobile`

## Signature

```ts
gem-implementer-mobile(input: {
  task_id: string;
  plan_id: string;
  plan_path: string;
  task_definition: object;
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
    platform_verification: {
      ios: "pass" | "fail" | "skipped";
      android: "pass" | "fail" | "skipped";
      metro_output: string;
    };
  };
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `task_id` | `string` | — | Mobile task identifier from `plan.yaml`. |
| `plan_id` | `string` | — | Parent plan identifier. |
| `plan_path` | `string` | — | Path to the plan file. |
| `task_definition` | `object` | — | The mobile task body, including acceptance criteria and platform context. |

## Workflow summary

The file follows the same Red → Green → Refactor pattern as the main implementer, then adds:

- iOS-specific checks for safe areas, keyboard behavior, permissions, haptics, and dark mode,
- Android-specific checks for bars, back behavior, permissions, and power management,
- cross-platform checks for deep links, biometrics, and offline mode,
- recovery commands for Metro, Xcode, Gradle, and simulators.

## Example

```json
{
  "task_id": "task-mobile-3",
  "plan_id": "20260507-mobile-auth",
  "plan_path": "docs/plan/20260507-mobile-auth/plan.yaml",
  "task_definition": {
    "acceptance_criteria": [
      "Biometric prompt appears on foreground return",
      "Offline login state remains readable"
    ],
    "tech_stack": ["react-native", "expo", "detox"]
  }
}
```

Use this agent when the planner detects `.dart`, `.swift`, `.kt`, `.tsx`, or `.jsx` mobile-oriented work and when platform-specific validation matters.
