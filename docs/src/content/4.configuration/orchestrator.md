---
title: Orchestrator Configuration
description: Workflow execution controls — concurrency, git integration, and workflow behavior.
navigation:
  icon: i-lucide-command
---

## Configuration

```yaml
orchestrator:
  max_concurrent_agents: 2
  git_commit_on_gate_pass: false
```

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `orchestrator.max_concurrent_agents` | number | `2` | Maximum parallel agent executions per wave |
| `orchestrator.git_commit_on_gate_pass` | boolean | `false` | Auto-commit wave output when review gate passes |

## Concurrency Guidelines

| Project Type | Recommended Value | Rationale |
|--------------|-------------------|-----------|
| **Solo/small** | 2-3 | Lower resource contention |
| **Team/medium** | 2 | Balanced parallelism |
| **CI/CD heavy** | 3-4 | More parallel waves |
| **Resource constrained** | 1 | Sequential execution |

## Git Integration

When `git_commit_on_gate_pass: true`:

```mermaid
flowchart LR
    A[Wave Completes] --> B{Review Gate\nPassed?}
    B -->|Yes| C[Auto-Commit\nWave Output]
    B -->|No| D[Wait for Revision]
    C --> E[Tag: wave-{n}-complete]
    E --> F[Next Wave Starts]
```

**Commit message format**: `wave({n}): {objective}`

## Key Rules

1. **Max concurrency respected** — Never exceeds configured value
2. **Retries count toward limit** — Each retry consumes a slot
3. **Git commits are wave-level** — Not per-task
4. **Failures don't commit** — Only gate passes trigger commits

## Related Pages

- [Orchestrator Agent](/agents/orchestrator) — Workflow coordination
- [Workflow: Execute](/guide/workflow-execute) — Wave loop and concurrency
- [Configuration Overview](/configuration) — Full config reference