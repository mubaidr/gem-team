---
title: "gem-critic"
description: "Reference for the critique agent that challenges assumptions, over-engineering, and logic gaps."
---

`gem-critic` is not a reviewer clone. It is the adversarial reasoning layer in Gem Team, defined in `.apm/agents/gem-critic.agent.md`. The file focuses on assumptions, missing edge cases, over-engineering, and holistic architecture concerns instead of pure compliance checks.

## Source

- Module path: `.apm/agents/gem-critic.agent.md`
- Invocation name: `gem-critic`

## Signature

```ts
gem-critic(input: {
  task_id?: string;
  plan_id: string;
  plan_path: string;
  scope: "plan" | "code" | "architecture";
  target: string;
  context: string;
}) => {
  status: "completed" | "failed" | "in_progress" | "needs_revision";
  task_id: string | null;
  plan_id: string;
  summary: string;
  failure_type: "transient" | "fixable" | "needs_replan" | "escalate";
  extra: {
    verdict: "pass" | "needs_changes" | "blocking";
    blocking_count: number;
    warning_count: number;
    suggestion_count: number;
    findings: Array<{
      severity: string;
      category: string;
      description: string;
      location: string;
      recommendation: string;
      alternative: string;
    }>;
    what_works: string[];
    confidence: number;
  };
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `plan_id` | `string` | — | Plan under critique. |
| `plan_path` | `string` | — | Path to the plan or related artifacts. |
| `scope` | `"plan" \| "code" \| "architecture"` | — | Chooses the critique level. |
| `target` | `string` | — | File paths, plan section, or special target like `all_changes`. |
| `context` | `string` | — | What is being built and what trade-offs matter. |

## Behavior highlights

The source file instructs the critic to:

- group findings by severity,
- always offer alternatives,
- never sugarcoat blocking issues,
- flag YAGNI violations at warning minimum,
- consider a change blocking if it adds more than 50 percent complexity for less than 10 percent benefit.

## Example

```json
{
  "plan_id": "20260507-auth-hardening",
  "plan_path": "docs/plan/20260507-auth-hardening/plan.yaml",
  "scope": "plan",
  "target": "plan.yaml",
  "context": "Security-sensitive auth hardening without UX regression"
}
```

Use `gem-critic` when you need pressure testing, not just checklist verification. It complements the reviewer instead of replacing it.
