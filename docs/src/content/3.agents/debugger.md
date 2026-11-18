---
title: Debugger
description: Root cause analysis — reproduces failures, bisects regressions, recommends fixes with reproduction tests.
navigation:
  icon: i-lucide-bug
---

## Role

Diagnoses failures — reproduces, finds root cause, bisects regressions. **Never implements** — handoff to Implementer.

## When Delegated

- `fixable`/`regression`/`new_failure` → Debugger → Implementer
- `test_bug` → Debugger → Implementer
- Regression bisection, flaky analysis, platform-specific

## Input

```yaml
failure: "TypeError: Cannot read property 'email' of undefined"
expected_behavior: "User object with email field"
evidence: ["stack trace", "failing test", "recent change"]
```

## Output

```yaml
status: "completed"
failure_classification: "fixable"
handoff:
  debugger_diagnosis:
    root_cause: "User model email optional but search assumes required"
    evidence: ["user.ts email optional", "search.ts:45 no null check"]
    fix_recommendations:
      - "Add null check: user.email ?? 'unknown'"
      - "Update Zod schema: email optional"
    reproduction_test: "tests/debug/reproduction-user-email.test.ts"
    confidence: 0.98
```

## Key Rules

- Reproduction test mandatory
- Never implements
- Bisect for regressions
- Confidence 0.0-1.0
- Evidence by reference

## Definition

[`.apm/agents/gem-debugger.agent.md`](/.apm/agents/gem-debugger.agent.md)

## Related

- [Implementer](/agents/implementer) — Receives Debugger handoff
- [Failure Handling](/guide/failure-handling)
- [Workflow: Execute](/guide/workflow-execute)