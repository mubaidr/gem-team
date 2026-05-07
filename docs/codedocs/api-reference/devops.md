---
title: "gem-devops"
description: "Reference for the infrastructure agent that handles deployments, CI/CD work, and approval-gated operations."
---

`gem-devops` is Gem Team’s infrastructure and deployment specialist. It is defined in `.apm/agents/gem-devops.agent.md` and is intentionally narrow: it verifies environment readiness, respects approval gates, executes idempotent operations, and validates the resulting system state.

## Source

- Module path: `.apm/agents/gem-devops.agent.md`
- Invocation name: `gem-devops`

## Signature

```ts
gem-devops(input: {
  task_id: string;
  plan_id: string;
  plan_path: string;
  task_definition: {
    environment: "development" | "staging" | "production";
    requires_approval: boolean;
    devops_security_sensitive: boolean;
  };
}) => {
  status:
    | "completed"
    | "failed"
    | "in_progress"
    | "needs_revision"
    | "needs_approval";
  task_id: string;
  plan_id: string;
  summary: string;
  failure_type: "transient" | "fixable" | "needs_replan" | "escalate";
  extra: object;
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `task_id` | `string` | — | DevOps task identifier from the plan. |
| `plan_id` | `string` | — | Parent plan identifier. |
| `plan_path` | `string` | — | Path to the plan file. |
| `task_definition.environment` | `"development" \| "staging" \| "production"` | — | Target environment for the operation. |
| `task_definition.requires_approval` | `boolean` | — | Signals that orchestration must secure approval first. |
| `task_definition.devops_security_sensitive` | `boolean` | — | Flags sensitive infrastructure changes. |

## Workflow summary

The agent file is deliberately short:

1. run preflight checks,
2. stop immediately with `needs_approval` when required,
3. execute idempotent operations,
4. verify health and allocation state,
5. log failures if needed.

The orchestration layer, not the DevOps agent, owns approval interaction with the user.

That split is important. The DevOps agent is allowed to know whether an operation is sensitive, but it is not allowed to improvise approval UX or silently continue into production work. In Gem Team, approval is a coordination concern, not an infrastructure concern.

## Example

```json
{
  "task_id": "task-deploy-1",
  "plan_id": "20260507-release-cut",
  "plan_path": "docs/plan/20260507-release-cut/plan.yaml",
  "task_definition": {
    "environment": "production",
    "requires_approval": true,
    "devops_security_sensitive": true
  }
}
```

Use this agent only for real infrastructure and deployment work. For application code, the planner should route to an implementer instead.
