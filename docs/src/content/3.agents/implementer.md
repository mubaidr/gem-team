---
title: Implementer
description: TDD implementation specialist — writes tests first, then minimal implementation, verifies, and leaves runnable checks.
navigation:
  icon: i-lucide-code
---

## Role

The Implementer handles **features, fixes, and refactors** using Test-Driven Development. Bug fixes require Debugger diagnosis first.

---

## When Delegated

- Feature implementation (new endpoints, modules, components)
- Bug fixes (after Debugger diagnosis)
- Refactoring (with Code Simplifier for complex cases)
- Any task requiring code changes with tests

---

## TDD Workflow (Mandatory)

```mermaid
flowchart LR
    A[Receive Task] --> B[Write Failing Tests\nRed Phase]
    B --> C[Run Tests\nConfirm Red]
    C --> D[Minimal Implementation\nGreen Phase]
    D --> E[Run Tests\nConfirm Green]
    E --> F[Refactor\nClean Up]
    F --> G[Verify All Tests Pass]
    G --> H[Output + Handoff]
```

### Red Phase
- Write tests for **all acceptance criteria**
- Test edge cases, errors, boundaries
- Tests must fail initially

### Green Phase
- **Shortest correct diff** to make tests pass
- No over-engineering, no speculative features
- Follow existing patterns and conventions

### Refactor Phase
- Clean up, optimize, improve naming
- All tests must still pass
- Leave runnable verification for non-trivial changes

---

## Input Handoff

```yaml
task_definition:
  objective: "Implement GET /api/users/search"
  acceptance_criteria:
    - "Filter by name/email (case-insensitive)"
    - "Pagination with page/limit"
    - "Sorting by createdAt/name/email"
    - "OpenAPI documentation"
  handoff:
    constraints:
      - "Follow API conventions in src/api/conventions.md"
      - "Use Prisma for database queries"
    relevant_context:
      - "research-api-patterns: patterns=REST, pagination=src/utils/pagination.ts"
    plan_context:
      architectural_boundaries: ["api layer", "user module"]
      risk_decisions: ["stateless search", "cursor pagination"]
    global_findings:
      - finding: "Prisma case-insensitive: contains + mode: 'insensitive'"
        confidence: 0.98
        source_task: "research-api-patterns"
```

---

## Output (Minimal)

```yaml
status: "completed"
failure_classification: null
handoff:
  implemented_files:
    - "src/api/users/search.ts"
  test_files:
    - "tests/api/users/search.test.ts"
  api_contract_path: "wave-3/implement-search/artifacts/api-contract.json"
  test_results_path: "wave-3/implement-search/artifacts/test-results.xml"
```

**No repetition of input** — only workflow state + downstream handoffs.

---

## Key Principles

| Principle | Application |
|-----------|-------------|
| **TDD always** | No implementation without failing test first |
| **Shortest correct diff** | Minimal change satisfying criteria |
| **One-line reasons** | Every major decision documented |
| **Runnable verification** | Non-trivial changes leave test script |
| **SOLID pragmatically** | Applied where it reduces complexity |
| **No AI-slop comments** | No "this function does X" comments |

---

## Bug Fix Protocol

For bugs: **Debugger first, then Implementer**

```
Debugger → Root cause + reproduction test + fix recommendation
    ↓
Implementer → Implements fix, verifies with reproduction test + original suite
```

Implementer **never diagnoses** — only implements based on Debugger handoff.

---

## Test Dimensions (All Validated)

1. **Correctness** — Expected behavior
2. **Contracts** — API schemas, TypeScript types
3. **Edge cases** — Boundaries, errors, empty states
4. **Performance** — Latency, memory, bundle size
5. **Security** — Input validation, auth, injection
6. **Accessibility** — WCAG 2.2 AA (when UI involved)

---

## Configuration

```yaml
# .gem-team.yaml (affects Implementer behavior)
quality:
  a11y_audit_level: basic  # Triggers a11y tests for UI tasks
testing:
  screenshot_on_failure: true  # For browser-tester integration
```

---

## Key Rules

1. **TDD mandatory** — Red → Green → Refactor, every time
2. **Diagnosis before fix** — Bugs route through Debugger first
3. **Minimal output** — Only state + handoffs, no analysis repetition
4. **Evidence by reference** — Artifacts in task paths, not inlined
5. **One-line reasons** — Every architectural decision documented
6. **Runnable checks** — Non-trivial changes leave verification script

---

## Related Pages

- [Workflow: Execute](/guide/workflow-execute) — Where Implementer runs
- [Debugger](/agents/debugger) — Bug diagnosis before implementation
- [Code Simplifier](/agents/code-simplifier) — Complex refactoring
- [First Steps](/getting-started/first-steps) — Implementer in action