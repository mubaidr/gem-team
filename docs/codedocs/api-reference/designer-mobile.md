---
title: "gem-designer-mobile"
description: "Reference for the mobile design agent that applies HIG, Material, safe-area, and touch-target rules."
---

`gem-designer-mobile` is the mobile UX counterpart to `gem-designer`. It is defined in `.apm/agents/gem-designer-mobile.agent.md` and covers platform-specific layout, navigation, touch targets, safe areas, gestures, and mobile accessibility requirements.

## Source

- Module path: `.apm/agents/gem-designer-mobile.agent.md`
- Invocation name: `gem-designer-mobile`

## Signature

```ts
gem-designer-mobile(input: {
  task_id: string;
  plan_id?: string;
  plan_path?: string;
  mode: "create" | "validate";
  scope: "component" | "screen" | "navigation" | "theme" | "design_system";
  target: string;
  context: {
    framework: string;
    library: string;
    existing_design_system: string;
    requirements: string;
  };
  constraints: {
    platform: "ios" | "android" | "cross-platform";
    responsive: boolean;
    accessible: boolean;
    dark_mode: boolean;
  };
}) => {
  status: "completed" | "failed" | "in_progress" | "needs_revision";
  task_id: string;
  plan_id: string | null;
  summary: string;
  failure_type: "transient" | "fixable" | "needs_replan" | "escalate";
  confidence: number;
  extra: {
    mode: "create" | "validate";
    platform: "ios" | "android" | "cross-platform";
    accessibility?: object;
    platform_compliance?: object;
  };
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mode` | `"create" \| "validate"` | — | Create mobile design specs or validate an existing mobile UI. |
| `scope` | `"component" \| "screen" \| "navigation" \| "theme" \| "design_system"` | — | The mobile design surface. |
| `target` | `string` | — | File paths or screen names. |
| `context` | `object` | — | Framework, UI library, and design-system context. |
| `constraints.platform` | `"ios" \| "android" \| "cross-platform"` | — | Target platform rules to apply. |

## Workflow summary

The source file adds mobile-only checks absent from the web designer:

- safe-area boundaries,
- 44pt and 48dp touch target minimums,
- HIG versus Material 3 compliance,
- gesture conflicts,
- reduced-motion and dynamic type behavior.

## Example

```json
{
  "task_id": "task-mobile-design-2",
  "mode": "validate",
  "scope": "screen",
  "target": "src/screens/ProfileScreen.tsx",
  "context": {
    "framework": "react-native",
    "library": "expo-router",
    "existing_design_system": "internal-mobile",
    "requirements": "Support large text and safe-area aware profile editing"
  },
  "constraints": {
    "platform": "cross-platform",
    "responsive": true,
    "accessible": true,
    "dark_mode": true
  }
}
```

Use this agent whenever mobile platform conventions are part of the acceptance criteria instead of treating mobile UI as a web variant.
