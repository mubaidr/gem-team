---

title: Debugger
description: Root cause analysis — reproduces failures, bisects regressions, recommends fixes with reproduction tests.
navigation:
  icon: i-lucide-bug
seo:
  title: Debugger Agent — Gem Team
  description: The gem-debugger performs root-cause analysis, stack trace diagnosis, and regression bisection.
  ogTitle: Debugger Agent — Gem Team
  ogDescription: The gem-debugger performs root-cause analysis and regression bisection.
---


## Role

Diagnoses failures — reproduces, finds root cause, bisects regressions. **Never implements** — handoff to Implementer. Always produces a reproduction test before recommending a fix.

## When to Delegate

| Scenario | Delegate Debugger? | Why |
|----------|-------------------|-----|
| `fixable` / `regression` / `new_failure` | ✅ | Root cause before fix |
| `test_bug` | ✅ | Diagnoses defective test |
| Regression bisection (find breaking commit) | ✅ | Bisects history to isolate change |
| Flaky test analysis | ✅ | Determines if intermittent or real |
| Platform-specific failure | ✅ | Verifies criteria on target platform |
| Direct implementation | ❌ | Never implements; hands to Implementer |

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