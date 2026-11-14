---
title: DevOps Configuration
description: Deployment strategies, approval gates, and rollback settings.
navigation:
  icon: i-lucide-server
---

## Configuration

```yaml
devops:
  approval_required_for: [production]
  deployment_strategy: rolling
  auto_rollback_on_failure: false
```

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `devops.approval_required_for` | enum[] | `[production]` | Environments requiring explicit approval |
| `devops.deployment_strategy` | enum | `rolling` | Strategy: `rolling`, `blue_green`, `canary` |
| `devops.auto_rollback_on_failure` | boolean | `false` | Attempt rollback after deployment failure |

## Approval Gates

| Environment | Default | Configurable |
|-------------|---------|--------------|
| `production` | Required | Yes |
| `staging` | Not required | Yes |
| `development` | Not required | Yes |
| Custom | Not required | Yes |

```yaml
# Require approval for staging + production
devops:
  approval_required_for: [staging, production]
```

## Deployment Strategies

| Strategy | Description | Rollback Speed | Use Case |
|----------|-------------|----------------|----------|
| **rolling** | Gradual pod replacement | Medium | Stateless services, zero-downtime |
| **blue_green** | Full parallel environment | Instant | Critical services, instant rollback |
| **canary** | Gradual traffic shift | Fast | Risk mitigation, metric-based promotion |

### Strategy Comparison

```mermaid
flowchart LR
    subgraph Rolling [Rolling]
        R1[V1] --> R2[V2] --> R3[V2] --> R4[V2]
    end
    
    subgraph BlueGreen [Blue-Green]
        B1[Blue: V1] --> B2[Green: V2] --> B3[Switch Traffic]
    end
    
    subgraph Canary [Canary]
        C1[90% V1, 10% V2] --> C2[50% V1, 50% V2] --> C3[100% V2]
    end
```

## Auto Rollback

When `auto_rollback_on_failure: true`:
- Triggers on health check failure post-deployment
- Rolls back to previous stable version
- Requires `deployment_strategy: blue_green` or `canary` for instant rollback
- Rolling strategy rolls back via reverse rolling update

## Key Rules

1. **Production always requires approval** unless explicitly disabled
2. **Blue-green/canary enable instant rollback** — Rolling is slower
3. **Health checks mandatory** — No deployment without verification
4. **Approval gates enforced by DevOps agent** — Not configurable at runtime

## Related Pages

- [DevOps Agent](/agents/devops) — Infrastructure and deployment execution
- [Workflow: Execute](/guide/workflow-execute) — DevOps in wave loop
- [Resources: Operational Notes](/resources/operational-notes) — Production practices
- [Configuration Overview](/configuration) — Full config reference