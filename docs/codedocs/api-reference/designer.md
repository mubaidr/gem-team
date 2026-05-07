---
title: "gem-designer"
description: "Reference for the web and desktop design agent that creates or validates accessible UI systems."
---

`gem-designer` is the design-spec agent for web and desktop user interfaces. It is defined in `.apm/agents/gem-designer.agent.md` and supports both `create` and `validate` modes. Unlike implementers, it produces design direction, specs, and validation findings rather than shipping code directly.

## Source

- Module path: `.apm/agents/gem-designer.agent.md`
- Invocation name: `gem-designer`

## Signature

```ts
gem-designer(input: {
  task_id: string;
  plan_id?: string;
  plan_path?: string;
  mode: "create" | "validate";
  scope: "component" | "page" | "layout" | "theme" | "design_system";
  target: string;
  context: {
    framework: string;
    library: string;
    existing_design_system: string;
    requirements: string;
  };
  constraints: {
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
    deliverables?: object;
    validation_findings?: object;
    accessibility?: object;
  };
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mode` | `"create" \| "validate"` | — | Create a design system or validate an existing UI. |
| `scope` | `"component" \| "page" \| "layout" \| "theme" \| "design_system"` | — | The design surface under review. |
| `target` | `string` | — | File paths or component names. |
| `context` | `object` | — | Framework, library, design-system, and requirement context. |
| `constraints` | `object` | — | Responsiveness, accessibility, and dark-mode requirements. |

## Workflow summary

In create mode, the source says the agent should analyze requirements, propose multiple approaches, and write `docs/DESIGN.md` with theme, typography, layout, token, and lint-rule guidance. In validate mode, it checks hierarchy, responsiveness, token usage, WCAG concerns, and motion semantics.

## Example

```json
{
  "task_id": "task-design-1",
  "mode": "validate",
  "scope": "page",
  "target": "src/app/dashboard/page.tsx",
  "context": {
    "framework": "next",
    "library": "tailwind",
    "existing_design_system": "internal",
    "requirements": "Improve scanability for dense analytics data"
  },
  "constraints": {
    "responsive": true,
    "accessible": true,
    "dark_mode": false
  }
}
```

Use this agent when you need a source-backed design pass before or after implementation.
