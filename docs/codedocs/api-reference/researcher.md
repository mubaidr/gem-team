---
title: "gem-researcher"
description: "Reference for the discovery agent that clarifies requests and produces structured codebase findings."
---

`gem-researcher` is Gem Team’s factual discovery layer. It is defined in `.apm/agents/gem-researcher.agent.md` and supports both clarification and full research modes. The file is careful to separate facts from recommendations, which makes it safe input for later planning and review.

## Source

- Module path: `.apm/agents/gem-researcher.agent.md`
- Invocation name: `gem-researcher`

## Signature

```ts
gem-researcher(input: {
  plan_id: string;
  objective: string;
  focus_area: string;
  mode: "clarify" | "research";
  task_clarifications?: Array<{ question: string; answer: string }>;
}) => {
  status: "completed" | "failed" | "in_progress" | "needs_revision";
  task_id: null;
  plan_id: string;
  summary?: string;
  failure_type: "transient" | "fixable" | "needs_replan" | "escalate";
  extra: {
    user_intent?: "continue_plan" | "modify_plan" | "new_task";
    gray_areas?: string[];
    complexity?: "simple" | "medium" | "complex";
    task_clarifications?: Array<{ question: string; answer: string }>;
    architectural_decisions?: Array<{ decision: string; affects: string }>;
  };
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `plan_id` | `string` | — | Identifier for the current run. |
| `objective` | `string` | — | User goal to clarify or research. |
| `focus_area` | `string` | — | Named subsystem or domain slice for deeper research. |
| `mode` | `"clarify" \| "research"` | — | Chooses intent clarification or full discovery. |
| `task_clarifications` | `Array<{ question: string; answer: string }>` | `[]` | Locked decisions to respect during research. |

## Return type

Clarify mode returns intent, gray areas, and scoped decisions. Research mode writes `research_findings_{focus_area}.yaml` and returns completion metadata plus optional learnings and gaps.

## Workflow notes

The source defines:

- confidence-based early exit for small, well-understood scopes,
- relationship discovery after initial search,
- a hard rule against recommendations in research output,
- a minimum confidence target of `0.85`.

## Example

```json
{
  "plan_id": "20260507-auth-refresh",
  "objective": "Harden token refresh behavior without changing login UX",
  "focus_area": "auth",
  "mode": "research",
  "task_clarifications": [
    {
      "question": "Keep cookie-based sessions?",
      "answer": "Yes"
    }
  ]
}
```

Use this agent whenever the orchestrator needs facts, dependencies, or ambiguity reduction before planning.
