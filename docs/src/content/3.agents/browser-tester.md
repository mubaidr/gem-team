---
title: Browser Tester
description: E2E browser testing - UI flows, visual regression, accessibility, performance, contract testing.
navigation:
  icon: i-lucide-monitor
seo:
  title: Browser Tester Agent - Gem Team
  description: "The gem-browser-tester performs UI/E2E testing: visual regression, accessibility, performance, and contract tests."
  ogTitle: Browser Tester Agent - Gem Team
  ogDescription: The gem-browser-tester performs UI/E2E testing.
---

## Role

Validates browser/UI flows with conditional testing across visual, a11y, performance, network, and contract dimensions. Runs on demand or as part of a wave plan's quality gate.

## When to Delegate

| Scenario                           | Delegate Browser Tester? | Why                                |
| ---------------------------------- | ------------------------ | ---------------------------------- |
| New UI feature with screenshots    | ✅                       | Visual regression against baseline |
| E2E user journey (login, checkout) | ✅                       | Flow assertions across pages       |
| Accessibility audit required       | ✅                       | WCAG 2.2 AA checks                 |
| API contract validation for UI     | ✅                       | Response matches OpenAPI schema    |
| Performance budget check           | ✅                       | TTI, memory, frame rate thresholds |
| Pure backend API change, no UI     | ❌                       | No browser interaction needed      |
| Static content only                | ❌                       | No dynamic flows to test           |

## Test Dimensions

| Dimension         | What                               | Config                                 |
| ----------------- | ---------------------------------- | -------------------------------------- |
| Flow Assertions   | User journeys, forms, navigation   | Acceptance criteria                    |
| Visual Regression | Screenshot vs baseline             | `visual_regression_enabled`, threshold |
| Accessibility     | WCAG 2.2 AA                        | `a11y_audit_level`                     |
| Performance       | TTI, memory, frame rate, bundle    | Criteria thresholds                    |
| Network           | API calls, timing, errors, caching | HAR capture                            |
| Contract          | API matches OpenAPI                | Schema validation                      |

## Input

```yaml
objective: "Verify user search UI"
acceptance_criteria:
  - "Results render within 500ms"
  - "Pagination works"
  - "Keyboard navigation"
  - "Visual match baseline (0.95)"
handoff:
  constraints: ["Staging env", "Chrome + Firefox"]
  relevant_context: ["implement-search: api_contract=..."]
```

## Output

```yaml
status: "completed"
handoff:
  test_results:
    flow_assertions: "passed"
    visual_regression: "passed (diff: 0.02)"
    accessibility: "passed (WCAG 2.2 AA)"
    performance: "passed (TTI: 320ms)"
  artifacts:
    screenshots: "..."
    har_file: "..."
    a11y_report: "..."
```

## Conditional Execution

Tests run only when configured + relevant (baseline exists, thresholds in criteria, level > none).

## Definition

[`.apm/agents/gem-browser-tester.agent.md`](/.apm/agents/gem-browser-tester.agent.md)

## Related

- [Quality Features](/guide/quality)
- [Workflow: Execute](/guide/workflow-execute)
- [Configuration](/configuration)
