---
title: DevOps
description: Infrastructure, CI/CD, containers, production approvals, health checks, and rollback strategies.
navigation:
  icon: i-lucide-server
---

## Role

The DevOps agent handles **infrastructure, deployment pipelines, container management, production operations, and release workflows**.

---

## When Delegated

- Infrastructure provisioning (Docker, Kubernetes, cloud)
- CI/CD pipeline creation/modification
- Deployment execution with approval gates
- Health check configuration and monitoring
- Rollback strategies and execution
- Mobile release workflows (EAS, Fastlane, TestFlight, Play Store)

---

## Capabilities

| Area | Tasks |
|------|-------|
| **Infrastructure** | Dockerfiles, K8s manifests, Terraform, cloud resources (AWS/GCP/Azure) |
| **CI/CD** | PR → staging → smoke → production with configurable gates |
| **Health & Recovery** | Endpoint verification, resource monitoring, alerting, rollback triggers |
| **Mobile Release** | EAS Build/Update, Fastlane, TestFlight, phased Google Play rollouts |
| **Idempotent Operations** | Safe to re-run, no side effects on retry |

---

## Input Handoff

```yaml
task_definition:
  objective: "Deploy user search API to staging"
  acceptance_criteria:
    - "Staging deployment successful"
    - "Health checks pass"
    - "Smoke tests pass"
    - "Rollback tested"
  handoff:
    constraints:
      - "Use existing Kubernetes manifests in infra/k8s/"
      - "Require approval for production"
      - "Blue-green deployment strategy"
    relevant_context:
      - "implement-search: image=gem-team/user-search:20250115"
      - "infrastructure: cluster=staging-gem-team, namespace=api"
```

---

## Output

```yaml
status: "completed"
failure_classification: null
handoff:
  deployment:
    environment: "staging"
    strategy: "blue_green"
    image: "gem-team/user-search:20250115"
    url: "https://staging-api.gem-team.example.com"
  health_checks:
    - endpoint: "/health"
      status: "passed"
      latency_ms: 45
    - endpoint: "/api/users/search?q=test"
      status: "passed"
      latency_ms: 120
  smoke_tests: "passed"
  rollback_verified: true
  approval_required_for_production: true
```

---

## Deployment Strategies

| Strategy | Description | Rollback Speed | Use Case |
|----------|-------------|----------------|----------|
| **rolling** | Gradual replacement (default) | Medium | Stateless services, zero-downtime |
| **blue_green** | Full parallel environment | Instant | Critical services, instant rollback |
| **canary** | Gradual traffic shift | Fast | Risk mitigation, metric-based promotion |

---

## Approval Gates

```yaml
# .gem-team.yaml
devops:
  approval_required_for: [production]  # environments requiring approval
  deployment_strategy: rolling
  auto_rollback_on_failure: false
```

- **Production always requires approval** (configurable)
- **Staging auto-deploys** on merge to main (configurable)
- **Manual trigger** for production promotion

---

## Health Checks & Monitoring

| Check Type | Configuration | Alert Threshold |
|------------|---------------|-----------------|
| **Liveness** | HTTP endpoint | > 30s = restart |
| **Readiness** | HTTP + dependencies | > 10s = remove from LB |
| **Startup** | Initialization complete | > 5min = kill |
| **Custom** | Business metrics | Per-service SLOs |

---

## Mobile Release Workflows

| Platform | Tool | Workflow |
|----------|------|----------|
| **iOS** | EAS Build / Fastlane | Build → TestFlight → Phased App Store |
| **Android** | EAS Build / Fastlane | Build → Internal → Phased Play Store |
| **OTA Updates** | EAS Update | JavaScript bundle updates without store review |

---

## Key Rules

1. **Idempotent operations** — Safe to re-run, no side effects
2. **Approval gates enforced** — Production never auto-deploys without approval
3. **Rollback tested** — Every deployment verifies rollback works
4. **Health checks mandatory** — No deployment without verification
5. **Evidence by reference** — Logs, manifests, metrics in task artifacts

---

## Related Pages

- [DevOps Guidelines Skill](/agents/skills) — Packaged DevOps guidance
- [Workflow: Execute](/guide/workflow-execute) — DevOps in wave loop
- [Configuration](/configuration) — DevOps settings
- [Resources: Operational Notes](/resources/operational-notes) — Production practices