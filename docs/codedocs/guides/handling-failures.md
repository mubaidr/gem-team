---
title: "Handling Failures"
description: "Use Gem Team's debugger, reviewer, and tester agents to recover from failed execution waves."
---

Gem Team is opinionated about failure recovery: failed work should not be retried blindly. The orchestrator source states, "IF task fails: Always diagnose via gem-debugger before retry." This guide shows how that recovery loop works in practice.

## Problem

A wave or task failed during implementation, testing, or review, and you need to recover without losing the structured plan.

## Solution

Keep the existing `plan_id`, route the failure through the debugger, then let the orchestrator retry the correct execution agent with the diagnosis injected into task context.

<Steps>
<Step>
### Capture the failure in structured form

Debugger input is explicit in `.apm/agents/gem-debugger.agent.md`:

```json
{
  "task_id": "task-2",
  "plan_id": "20260507-admin-request-logging",
  "plan_path": "docs/plan/20260507-admin-request-logging/plan.yaml",
  "task_definition": {},
  "error_context": {
    "error_message": "Expected 200, received 500",
    "failing_test": "returns validation error without crashing",
    "reproduction_steps": [
      "POST /admin/logs with malformed body",
      "Observe server error and failed contract assertion"
    ],
    "environment": "ci"
  }
}
```
</Step>
<Step>
### Let the debugger produce a root cause

Expected debugger output shape:

```json
{
  "status": "completed",
  "task_id": "task-2",
  "plan_id": "20260507-admin-request-logging",
  "extra": {
    "root_cause": {
      "description": "Logger middleware assumes validated payload shape",
      "location": "src/admin/logging.ts",
      "error_type": "logic"
    },
    "fix_recommendations": [
      {
        "approach": "Guard malformed payloads before logging fields",
        "location": "src/admin/logging.ts"
      }
    ]
  }
}
```

The critical point is that the debugger must diagnose before the implementer retries.
</Step>
<Step>
### Re-run the correct specialist

Gem Team uses routing rules from the planner and orchestrator:

- code fix: `gem-implementer` or `gem-implementer-mobile`
- browser flow failure: `gem-browser-tester`
- mobile flow failure: `gem-mobile-tester`
- infrastructure failure: `gem-devops`

After the retry, the orchestrator re-runs wave review.
</Step>
<Step>
### Escalate only after retry budget is exhausted

The orchestrator and multiple agents use a three-retry ceiling. If the issue remains blocked after debugger-guided retries, escalate with the preserved `plan_id` and current findings instead of restarting from scratch.
</Step>
</Steps>

## Browser failure example

`gem-browser-tester.agent.md` supports step-level evidence collection:

```json
{
  "task_id": "task-ui-4",
  "plan_id": "20260507-checkout-redesign",
  "task_definition": {
    "flows": [
      {
        "flow_id": "checkout-submit",
        "steps": [
          { "type": "navigate", "url": "/checkout", "wait": "network_idle" },
          { "type": "interact", "action": "click", "selector": "#submit-order" },
          { "type": "assert", "selector": ".toast", "expected": "Order placed" }
        ]
      }
    ]
  }
}
```

If this fails, the tester can capture screenshots, traces, console errors, and network failures, then the debugger can inspect that evidence for root cause.

## Why this pattern matters

The source files encode a distinction between failure types:

- `transient`
- `flaky`
- `regression`
- `new_failure`
- `fixable`
- `needs_replan`
- `escalate`

That classification makes retries deliberate. A flaky browser test should not force the same response as a structural architecture problem.

<Callout type="warn">Do not restart with a fresh plan when the failure belongs to the current plan. Gem Team stores retries, logs, evidence paths, and diagnoses under the existing `plan_id`. Throwing that away makes the next attempt less informed than the failed one.</Callout>

For the steady-state path after recovery, return to [Running A Feature Task](/docs/guides/running-a-feature-task).
