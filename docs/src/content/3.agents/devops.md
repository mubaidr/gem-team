---

title: DevOps
description: Infrastructure, CI/CD, containers, deployments, health checks, rollback, mobile releases.
navigation:
  icon: i-lucide-server
seo:
  title: DevOps Agent — Gem Team
  description: The gem-devops handles infrastructure, CI/CD pipelines, deployment, health checks, and rollback.
  ogTitle: DevOps Agent — Gem Team
  ogDescription: The gem-devops handles infrastructure, CI/CD, and deployment.
---


## Role

Handles infrastructure, deployment pipelines, container management, production operations, mobile releases. Enforces approval gates; production always requires approval unless explicitly disabled.

## When to Delegate

| Scenario | Delegate DevOps? | Why |
|----------|-----------------|-----|
| Deploy to staging/production | ✅ | Deployment strategy + health checks |
| CI/CD pipeline setup | ✅ | PR → staging → smoke → production |
| Rollback after failure | ✅ | Tested rollback procedures |
| Health check / monitoring | ✅ | Endpoint verification, alerting |
| Mobile release (TestFlight, Play Store) | ✅ | EAS/Fastlane, store submission |
| Write application code | ❌ | Out of scope; use Implementer |

## Capabilities

| Area | Tasks |
|------|-------|
| Infrastructure | Dockerfiles, K8s, Terraform, cloud resources |
| CI/CD | PR → staging → smoke → production with gates |
| Health & Recovery | Endpoint verification, monitoring, alerting, rollback |
| Mobile Release | EAS/Fastlane, TestFlight, Play Store, OTA |

## Strategies

| Strategy | Rollback | Use Case |
|----------|----------|----------|
| rolling | Medium | Stateless, zero-downtime |
| blue_green | Instant | Critical, instant rollback |
| canary | Fast | Risk mitigation, metrics |

## Input

```yaml
objective: "Deploy user search API to staging"
acceptance_criteria: ["Staging deploy", "Health checks", "Smoke tests", "Rollback tested"]
handoff:
  constraints: ["Existing K8s", "Approval for prod", "Blue-green"]
  relevant_context: ["image=...", "cluster=staging"]
```

## Output

```yaml
status: "completed"
handoff:
  deployment: { environment: "staging", strategy: "blue_green", url: "..." }
  health_checks: [{ endpoint: "/health", status: "passed", latency_ms: 45 }]
  smoke_tests: "passed"
  rollback_verified: true
  approval_required_for_production: true
```

## Key Rules

- Idempotent operations
- Approval gates enforced (prod always)
- Rollback tested
- Health checks mandatory

## Definition

[`.apm/agents/gem-devops.agent.md`](/.apm/agents/gem-devops.agent.md)

## Related

- [DevOps Guidelines Skill](/agents/skills)
- [Workflow: Execute](/guide/workflow-execute)
- [Configuration](/configuration)