---
title: Configuration Examples
description: Annotated .gem-team.yaml configurations for common scenarios.
navigation:
  icon: i-lucide-file-code
seo:
  title: Configuration Examples — Gem Team
  description: Annotated .gem-team.yaml configurations for team project, solo developer, and CI/CD scenarios.
  ogTitle: Configuration Examples — Gem Team
  ogDescription: Annotated .gem-team.yaml configurations for common scenarios.
---

## Team Project (Recommended)

Balanced settings for collaborative development with quality gates.

```yaml
# .gem-team.yaml
orchestrator:
  max_concurrent_agents: 2 # Balanced parallelism
  git_commit_on_gate_pass: true # Audit trail

model_routing:
  enabled: true # Cost optimization
  tiers:
    premium: "claude-4 (anthropic)" # Strong reasoning for planning/review
    explore: "claude-3.5-haiku (anthropic)" # Fast execution

quality:
  visual_regression_enabled: true # Catch UI regressions
  visual_diff_threshold: 0.98 # Strict for design consistency
  a11y_audit_level: basic # WCAG 2.2 AA basics

devops:
  approval_required_for: [production] # Production gate
  deployment_strategy: blue_green # Instant rollback
  auto_rollback_on_failure: true # Safety net

testing:
  screenshot_on_failure: true # Debug evidence
```

---

## Solo Developer (Fast)

Minimal overhead for individual development.

```yaml
# .gem-team.yaml
orchestrator:
  max_concurrent_agents: 3 # More parallelism
  git_commit_on_gate_pass: false # Manual commits

model_routing:
  enabled: false # Single model, simpler

quality:
  visual_regression_enabled: false # Skip unless needed
  a11y_audit_level: none # Skip unless needed

devops:
  approval_required_for: [] # No gates
  deployment_strategy: rolling # Simple deployment

testing:
  screenshot_on_failure: true # Still useful for debugging
```

---

## CI/CD Optimized

Maximum automation for continuous integration pipelines.

```yaml
# .gem-team.yaml
orchestrator:
  max_concurrent_agents: 4 # Maximize CI parallelism
  git_commit_on_gate_pass: true # Automated commits

model_routing:
  enabled: true # Cost control at scale
  tiers:
    premium: "gpt-5.6-sol (openai)" # Best reasoning
    explore: "gpt-5.6-luna (openai)" # Cheap execution

quality:
  visual_regression_enabled: true # Mandatory in CI
  visual_diff_threshold: 0.95 # Standard threshold
  a11y_audit_level: full # Full a11y in CI

devops:
  approval_required_for: [production] # Only prod gated
  deployment_strategy: canary # Safe progressive rollout
  auto_rollback_on_failure: true # Automatic recovery

testing:
  screenshot_on_failure: true # CI artifacts
```

---

## Open Source Project

Community-friendly with contributor onboarding.

```yaml
# .gem-team.yaml
orchestrator:
  max_concurrent_agents: 2
  git_commit_on_gate_pass: false # Contributors control commits

model_routing:
  enabled: true
  tiers:
    premium: "claude-4 (anthropic)" # Accessible via API
    explore: "claude-3.5-haiku (anthropic)"

quality:
  visual_regression_enabled: false # Optional for contributors
  a11y_audit_level: basic # Encourage a11y

devops:
  approval_required_for: [production]
  deployment_strategy: rolling
  auto_rollback_on_failure: false

testing:
  screenshot_on_failure: true
```

---

## High-Security Project

Maximum security review and compliance.

```yaml
# .gem-team.yaml
orchestrator:
  max_concurrent_agents: 1 # Sequential for audit
  git_commit_on_gate_pass: true # Full audit trail

model_routing:
  enabled: true
  tiers:
    premium: "claude-4 (anthropic)" # Best security reasoning
    explore: "claude-3.5-haiku (anthropic)"

quality:
  visual_regression_enabled: true
  visual_diff_threshold: 0.99 # Strictest
  a11y_audit_level: full # Full compliance

devops:
  approval_required_for: [staging, production] # Dual gates
  deployment_strategy: blue_green
  auto_rollback_on_failure: true

testing:
  screenshot_on_failure: true
```

---

## Mobile-First Project

Optimized for iOS/Android development.

```yaml
# .gem-team.yaml
orchestrator:
  max_concurrent_agents: 2
  git_commit_on_gate_pass: true

model_routing:
  enabled: true
  tiers:
    premium: "claude-4 (anthropic)"
    explore: "claude-3.5-haiku (anthropic)"

quality:
  visual_regression_enabled: true
  visual_diff_threshold: 0.95
  a11y_audit_level: full # Mobile a11y critical

devops:
  approval_required_for: [production]
  deployment_strategy: canary # Phased mobile rollouts
  auto_rollback_on_failure: true

testing:
  screenshot_on_failure: true # Device screenshots
```

---

## Monorepo (Multiple Projects)

Shared config with project-specific overrides.

```yaml
# .gem-team.yaml (root)
orchestrator:
  max_concurrent_agents: 4
  git_commit_on_gate_pass: true

model_routing:
  enabled: true
  tiers:
    premium: "claude-4 (anthropic)"
    explore: "claude-3.5-haiku (anthropic)"

quality:
  visual_regression_enabled: true
  visual_diff_threshold: 0.95
  a11y_audit_level: basic

devops:
  approval_required_for: [production]
  deployment_strategy: rolling
  auto_rollback_on_failure: true

testing:
  screenshot_on_failure: true
```

```yaml
# apps/web/.gem-team.yaml (override)
quality:
  visual_regression_enabled: true
  a11y_audit_level: full

devops:
  deployment_strategy: blue_green
```

```yaml
# apps/mobile/.gem-team.yaml (override)
quality:
  a11y_audit_level: full

devops:
  deployment_strategy: canary
```

---

## Environment-Specific Overrides

Base config with environment merges.

```yaml
# .gem-team.yaml (base)
orchestrator:
  max_concurrent_agents: 2
model_routing:
  enabled: true
quality:
  a11y_audit_level: basic
devops:
  approval_required_for: [production]
```

```yaml
# .gem-team.staging.yaml (override)
orchestrator:
  max_concurrent_agents: 4
quality:
  a11y_audit_level: full
devops:
  approval_required_for: [] # No approval for staging
```

```yaml
# .gem-team.production.yaml (override)
orchestrator:
  max_concurrent_agents: 1 # Sequential for safety
quality:
  visual_regression_enabled: true
  a11y_audit_level: full
devops:
  approval_required_for: [production]
  deployment_strategy: blue_green
  auto_rollback_on_failure: true
```

**Usage**:

```bash
# Staging
GEM_TEAM_CONFIG=.gem-team.staging.yaml copilot chat --agent gem-orchestrator "..."

# Production
GEM_TEAM_CONFIG=.gem-team.production.yaml copilot chat --agent gem-orchestrator "..."
```

---

## Key Takeaways

| Scenario          | Key Settings                                  |
| ----------------- | --------------------------------------------- |
| **Team**          | Model routing + blue-green + basic a11y       |
| **Solo**          | No routing, no gates, fast concurrency        |
| **CI/CD**         | Max concurrency + canary + full a11y          |
| **Open Source**   | Contributor-friendly, optional quality        |
| **High-Security** | Sequential, dual gates, strictest quality     |
| **Mobile**        | Full a11y, canary rollout, device screenshots |
| **Monorepo**      | Base + project overrides                      |

---

## Configuration Anti-Patterns

| Anti-Pattern                                    | Why It Fails                            | Correct Approach                           |
| ----------------------------------------------- | --------------------------------------- | ------------------------------------------ |
| `max_concurrent_agents: 10` on a small project  | Resource contention, slower than needed | Use 2-3 for solo/team                      |
| `visual_diff_threshold: 0.99` on dynamic UI     | False positives on animations/content   | Use 0.90-0.95 for dynamic content          |
| `a11y_audit_level: none` on user-facing UI      | Excludes users with disabilities        | Use `basic` minimum                        |
| `auto_rollback_on_failure: true` with `rolling` | Rolling rollback is slow, not instant   | Use blue_green/canary for instant rollback |
| Model routing enabled for single-task fast path | Unnecessary complexity                  | Disable; session default suffices          |

---

## Related Pages

- [Configuration Overview](/configuration) — Full settings reference
- [Model Routing](/configuration/model-routing) — Tier configuration
- [Quality](/configuration/quality) — Visual regression and a11y
- [DevOps](/configuration/devops) — Deployment and approval gates
