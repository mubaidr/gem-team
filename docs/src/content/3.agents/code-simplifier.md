---
title: Code Simplifier
description: Refactoring - dead code removal, complexity reduction, duplicate consolidation, naming.
navigation:
  icon: i-lucide-scissors
seo:
  title: Code Simplifier Agent - Gem Team
  description: The gem-code-simplifier removes dead code, reduces complexity, and consolidates duplicates.
  ogTitle: Code Simplifier Agent - Gem Team
  ogDescription: The gem-code-simplifier removes dead code and reduces complexity.
---

## Role

Targeted refactoring with one-line reasons. No architecture redesign, no features, no speculative abstraction. Simplifies existing code while preserving behavior.

## When to Delegate

| Scenario                                     | Delegate Code Simplifier? | Why                                     |
| -------------------------------------------- | ------------------------- | --------------------------------------- |
| Dead code (unused imports, functions, files) | ✅                        | Removes unused code safely              |
| High cyclomatic complexity                   | ✅                        | Splits large functions, reduces metrics |
| Duplicate logic across files                 | ✅                        | Consolidates to single helper           |
| Inconsistent naming                          | ✅                        | Standardizes to project conventions     |
| Architecture redesign                        | ❌                        | Out of scope; use Implementer           |
| New feature development                      | ❌                        | Out of scope; use Implementer           |

## Categories

| Category   | Action                                           | Validation       |
| ---------- | ------------------------------------------------ | ---------------- |
| Dead Code  | Remove unused exports, functions, imports, files | Tests pass       |
| Complexity | Reduce cyclomatic, split large functions         | Metrics improve  |
| Duplicates | Consolidate to helpers                           | Single source    |
| Naming     | Improve clarity, consistency                     | Convention match |

## Input

```yaml
objective: "Simplify user search"
acceptance_criteria:
  - "Reduce complexity 15-><10"
  - "Remove duplicate validation"
  - "Standardize error handling"
handoff:
  constraints: ["Preserve behavior", "Tests pass", "Follow patterns"]
  relevant_context: ["implement-search: files=search.ts"]
```

## Output

```yaml
status: "completed"
handoff:
  refactored_files: ["search.ts", "validation.ts"]
  removed_files: ["legacy-validation.ts"]
  changes:
    - file: "search.ts"
      change: "Extracted validation"
      reason: "Duplicate in 3 endpoints"
      complexity_before: 15
      complexity_after: 7
  test_results: "all_passed"
```

## Key Rules

- One-line reason per change (no buzzwords)
- Tests are the spec
- Minimal diff
- Evidence by reference

## Definition

[`.apm/agents/gem-code-simplifier.agent.md`](/.apm/agents/gem-code-simplifier.agent.md)

## Related

- [Implementer](/agents/implementer)
- [Reviewer](/agents/reviewer) - Over-engineering pass
- [Workflow: Execute](/guide/workflow-execute)
