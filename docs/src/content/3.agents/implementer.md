---
title: Implementer
description: TDD implementation — writes tests first, minimal implementation, verifies, leaves runnable checks.
navigation:
  icon: i-lucide-code
---

## Role

Implements features, fixes, refactors using TDD. Bug fixes require Debugger diagnosis first.

## TDD Workflow (Mandatory)

1. **Red**: Write failing tests for all acceptance criteria + edge cases
2. **Green**: Shortest correct diff to pass
3. **Refactor**: Clean up, all tests pass
4. **Verify**: Runnable checks for non-trivial changes

## Input Handoff

```yaml
task_definition:
  objective: "Implement GET /api/users/search"
  acceptance_criteria: ["filter", "pagination", "sorting", "OpenAPI"]
  handoff:
    constraints: ["Follow conventions", "Use Prisma"]
    relevant_context: ["research-api-patterns: patterns=REST"]
    plan_context:
      architectural_boundaries: ["api layer"]
      risk_decisions: ["stateless search"]
```

## Output

```yaml
status: "completed"
handoff:
  implemented_files: ["src/api/users/search.ts"]
  test_files: ["tests/api/users/search.test.ts"]
  api_contract_path: "..."
  test_results_path: "..."
```

## Key Rules

- TDD always — no implementation without failing test
- Bug fixes: Debugger first, then Implementer
- Shortest correct diff
- One-line reason per decision
- Evidence by reference (artifact paths, not content)

## Definition

[`.apm/agents/gem-implementer.agent.md`](/.apm/agents/gem-implementer.agent.md)

## Related

- [Debugger](/agents/debugger) — Bug diagnosis before implementation
- [Code Simplifier](/agents/code-simplifier) — Complex refactoring
- [Workflow: Execute](/guide/workflow-execute)