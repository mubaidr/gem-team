---
title: Quality Configuration
description: Visual regression, accessibility, and security gate settings.
navigation:
  icon: i-lucide-shield-check
seo:
  title: Quality Configuration - Gem Team
  description: Visual regression, accessibility, and security gate settings configuration.
  ogTitle: Quality Configuration - Gem Team
  ogDescription: Visual regression, accessibility, and security gate settings.
---

## Configuration

```yaml
quality:
  visual_regression_enabled: false
  visual_diff_threshold: 0.95
  a11y_audit_level: none
```

## Example: Visual Regression on a Dynamic Dashboard

```yaml
# Task input to gem-browser-tester
objective: "Verify dashboard visual regression"
acceptance_criteria:
  - "Screenshot matches baseline within threshold"
  - "Dynamic content areas excluded from comparison"
handoff:
  constraints: ["Staging env", "Chrome + Firefox"]
  relevant_context:
    - "baseline: wave-1/dashboard-baseline.png"
    - "threshold: 0.90 (dynamic content, lenient)"
```

## Example: Accessibility Audit (Full)

```yaml
# Task input to gem-browser-tester
objective: "WCAG 2.2 AA audit on search page"
acceptance_criteria:
  - "Contrast ratio >= 4.5:1 for all text"
  - "ARIA labels on all interactive elements"
  - "Focus indicators visible"
  - "Touch targets >= 44pt/48dp"
  - "Keyboard navigation complete"
  - "Reduced motion respected"
```

## Settings

| Setting                             | Type    | Default | Description                                        |
| ----------------------------------- | ------- | ------- | -------------------------------------------------- |
| `quality.visual_regression_enabled` | boolean | `false` | Enable screenshot comparison checks                |
| `quality.visual_diff_threshold`     | number  | `0.95`  | Visual comparison threshold (0.0 - 1.0)            |
| `quality.a11y_audit_level`          | enum    | `none`  | Accessibility audit depth: `none`, `basic`, `full` |

## Visual Regression

When enabled:

- Captures screenshots on UI changes
- Compares against baseline (stored in task artifacts)
- Fails if difference > threshold
- Configurable per-task via acceptance criteria

### Threshold Guidelines

| Threshold | Sensitivity        | Use Case                      |
| --------- | ------------------ | ----------------------------- |
| `0.99`    | Very strict        | Pixel-perfect, design systems |
| `0.95`    | Standard (default) | General UI testing            |
| `0.90`    | Lenient            | Dynamic content, animations   |
| `0.80`    | Very lenient       | Highly variable UIs           |

## Accessibility Audit Levels

| Level   | Checks Included                                                                       |
| ------- | ------------------------------------------------------------------------------------- |
| `none`  | No a11y checks                                                                        |
| `basic` | Contrast (4.5:1), ARIA labels, focus indicators, touch targets (44pt/48dp)            |
| `full`  | All basic + reduced motion, semantic HTML, screen reader testing, keyboard navigation |

## Security Gates

Security review triggers automatically via risk signals (not config):

| Risk Signal          | Review Triggered                     |
| -------------------- | ------------------------------------ |
| `auth_change`        | Authentication/authorization logic   |
| `security_sensitive` | Crypto, secrets, PII handling        |
| `data_flow_change`   | Data movement, storage, transmission |
| Config changes       | Infrastructure, permissions, network |

**Task criteria and explicit requests take precedence** over config defaults.

## Related Pages

- [Quality Features](/guide/quality) - Detailed quality gate behavior
- [Browser Tester](/agents/browser-tester) - Visual regression and a11y execution
- [Reviewer](/agents/reviewer) - Security review modes
- [Configuration Overview](/configuration) - Full config reference
