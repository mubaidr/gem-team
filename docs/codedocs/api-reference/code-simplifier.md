---
title: "gem-code-simplifier"
description: "Reference for the refactoring agent that removes dead code, reduces complexity, and preserves behavior."
---

`gem-code-simplifier` is Gem Team’s cleanup specialist. It is defined in `.apm/agents/gem-code-simplifier.agent.md` and is intentionally constrained: it never adds features, and it must preserve behavior while simplifying code structure.

## Source

- Module path: `.apm/agents/gem-code-simplifier.agent.md`
- Invocation name: `gem-code-simplifier`

## Signature

```ts
gem-code-simplifier(input: {
  task_id: string;
  plan_id?: string;
  plan_path?: string;
  scope: "single_file" | "multiple_files" | "project_wide";
  targets: string[];
  focus: "dead_code" | "complexity" | "duplication" | "naming" | "all";
  constraints: {
    preserve_api: boolean;
    run_tests: boolean;
    max_changes: number;
  };
}) => {
  status: "completed" | "failed" | "in_progress" | "needs_revision";
  task_id: string;
  plan_id: string | null;
  summary: string;
  failure_type: "transient" | "fixable" | "needs_replan" | "escalate";
  extra: {
    changes_made: Array<{
      type: string;
      file: string;
      description: string;
      lines_removed: number;
      lines_changed: number;
    }>;
    tests_passed: boolean;
    validation_output: string;
    preserved_behavior: boolean;
    confidence: number;
  };
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `scope` | `"single_file" \| "multiple_files" \| "project_wide"` | — | How broadly the simplifier may search and edit. |
| `targets` | `string[]` | — | File paths or patterns to inspect. |
| `focus` | `"dead_code" \| "complexity" \| "duplication" \| "naming" \| "all"` | — | Which kind of cleanup to prioritize. |
| `constraints` | `object` | — | Behavior-preservation guardrails. |

## Workflow summary

The simplifier searches for dead code, complexity, duplication, and naming issues, then applies safe changes in a strict order: unused imports, dead code, naming, flattening, extraction, complexity reduction, and consolidation. The file also includes Chesterton’s Fence as an explicit rule before removal.

## Example

```json
{
  "task_id": "task-cleanup-1",
  "scope": "multiple_files",
  "targets": ["src/api/*.ts", "src/lib/logger.ts"],
  "focus": "duplication",
  "constraints": {
    "preserve_api": true,
    "run_tests": true,
    "max_changes": 6
  }
}
```

Use this agent when the plan calls for cleanup work without behavior changes. For new functionality, the planner should route to an implementer instead.
