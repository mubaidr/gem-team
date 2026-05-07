---
title: "gem-reviewer"
description: "Reference for the verification agent that checks plans, tasks, waves, and final outputs for compliance and security."
---

`gem-reviewer` is Gem Team’s formal verification layer. It is defined in `.apm/agents/gem-reviewer.agent.md` and supports four scopes: `plan`, `task`, `wave`, and `final`. This is the agent that turns Gem Team’s verification-first posture into an enforceable contract.

## Source

- Module path: `.apm/agents/gem-reviewer.agent.md`
- Invocation name: `gem-reviewer`

## Signature

```ts
gem-reviewer(input: {
  review_scope: "plan" | "task" | "wave" | "final";
  task_id?: string;
  plan_id: string;
  plan_path: string;
  wave_tasks?: string[];
  changed_files?: string[];
  task_definition?: object;
  review_depth: "full" | "standard" | "lightweight";
  review_security_sensitive: boolean;
  review_criteria: object;
  task_clarifications?: Array<{ question: string; answer: string }>;
}) => {
  status: "completed" | "failed" | "in_progress" | "needs_revision";
  task_id: string;
  plan_id: string;
  summary: string;
  failure_type: "transient" | "fixable" | "needs_replan" | "escalate";
  extra: {
    review_scope: "plan" | "task" | "wave" | "final";
    findings?: Array<{ category: string; severity: string; description: string }>;
    security_issues?: Array<{ type: string; location: string }>;
    prd_compliance_issues?: Array<{ criterion: string; status: "pass" | "fail" }>;
    confidence: number;
  };
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `review_scope` | `"plan" \| "task" \| "wave" \| "final"` | — | Chooses which part of the lifecycle to verify. |
| `plan_id` | `string` | — | Parent plan identifier. |
| `plan_path` | `string` | — | Location of the current plan file. |
| `review_depth` | `"full" \| "standard" \| "lightweight"` | — | Controls verification intensity. |
| `review_security_sensitive` | `boolean` | — | Flags changes that need deeper security scrutiny. |
| `review_criteria` | `object` | — | Scope-specific validation criteria. |

## Scope behavior

- `plan`: checks task coverage, dependencies, agent validity, estimates, and simplicity.
- `wave`: runs filtered validation and integration checks after a wave completes.
- `task`: audits a single task against PRD, logic, and security expectations.
- `final`: runs whole-change review, security scans, and planned-versus-actual analysis.

## Example

```json
{
  "review_scope": "wave",
  "task_id": "task-3",
  "plan_id": "20260507-request-logging",
  "plan_path": "docs/plan/20260507-request-logging/plan.yaml",
  "wave_tasks": ["task-1", "task-2"],
  "review_depth": "standard",
  "review_security_sensitive": true,
  "review_criteria": {
    "must_preserve_response_shapes": true
  }
}
```

Read this page together with [gem-critic](/docs/api-reference/critic) and [gem-debugger](/docs/api-reference/debugger), which become the escalation path when reviewer findings fail execution.
