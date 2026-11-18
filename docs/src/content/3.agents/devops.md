---
title: DevOps
description: Infrastructure, CI/CD, containers, deployments, health checks, rollback, mobile releases.
navigation:
  icon: i-lucide-server
---

## Role

Handles infrastructure, deployment pipelines, container management, production operations, mobile releases.

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