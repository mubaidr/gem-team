---
title: Reviewer
description: Three-axis review system (mode, target, scope) for quality, security, contracts, compliance, and regressions.
navigation:
  icon: i-lucide-shield-check
---

## Role

The Reviewer evaluates **plans, code, decisions, docs, config, and integrations** using three independent axes for precise targeting.

---

## Three Review Axes

| Axis | Values | Purpose |
|------|--------|---------|
| **review_mode** | `standard` \| `high` \| `critic` | Review intensity |
| **review_target** | `plan` \| `task` \| `code` \| `decision` \| `docs` \| `config` \| `integration` | What to review |
| **review_scope** | `changed` \| `affected` \| `full` | How much evidence to examine |

---

## Review Modes

| Mode | When Used | Intensity |
|------|-----------|-----------|
| **standard** | Routine MEDIUM, explicit request | Changed files, criteria check |
| **high** | HIGH complexity, high-risk signals | Affected files, deep analysis |
| **critic** | Architecture decisions, `architecture`/`breaking_change`/`cross_domain_impact` | Full scope, read-only, challenges assumptions |

### Critic Mode (Read-Only)
- Evaluates assumptions, counterexamples, risks, alternatives, reversibility
- **Does not implement** or mutate files
- Results: `critic_verdict`, `challenges`, `alternatives`, `decision_blockers`
- Requires `handoff.critic_subject` and `handoff.critic_context`

---

## Review Targets

| Target | What's Reviewed | Scope Behavior |
|--------|-----------------|----------------|
| `plan` | Wave plan structure, ownership, dependencies | Evaluates handed plan |
| `task` | Task definition, acceptance criteria | Evaluates handed task |
| `code` | Implementation code | Reads target as subject |
| `decision` | Architectural/technical decision | Evaluates handed proposal |
| `docs` | Documentation content | Evaluates handed docs |
| `config` | Configuration files | Reads target as subject |
| `integration` | Cross-boundary contracts | Reads target as subject |

**Key distinction**: `plan`/`task`/`decision` reviews evaluate **what they were handed**. `code`/`config`/`integration` reviews **read the target as their subject**.

---

## Review Scope

| Scope | Meaning |
|-------|---------|
| `changed` | Only modified files in task |
| `affected` | Changed + directly dependent files |
| `full` | Entire relevant codebase (critic mode default) |

**Not permission to gather more** — scope limits examination of supplied evidence.

---

## When Review Triggered

| Condition | Review Mode | Target |
|-----------|-------------|--------|
| HIGH complexity | `high`/`critic` | `integration` |
| High-risk signals (`architecture`, `breaking_change`, `cross_domain_impact`) | `critic` | `decision`/`integration` |
| Explicit review request | `standard`/`high` | Per request |
| Critic signals from Phase 0 | `critic` | `decision` |
| Insufficient/contradictory evidence | `standard` | `integration` |
| Routine MEDIUM | None (self-check only) | — |

---

## Over-Engineering Pass (Code/Integration)

For `code` and `integration` targets, Reviewer runs **over-engineering pass**:

- YAGNI violations (speculative features)
- Premature abstraction
- Unnecessary complexity
- Missing simplest solution
- Buzzword-driven design

---

## Input Handoff

```yaml
review_mode: "standard"
review_target: "integration"
review_scope: "changed"
handoff:
  target_reference: "src/api/users/search.ts"
  criteria:
    - "API conventions followed"
    - "Contract integrity (request/response types)"
    - "Security: input validation"
    - "Performance: indexed query, pagination limits"
  risk_ref: "api_change, contract_change"
  evidence:
    - "tests/api/users/search.test.ts"
    - "src/api/conventions.md"
```

### Critic Mode Handoff

```yaml
review_mode: "critic"
review_target: "decision"
review_scope: "full"
handoff:
  critic_subject:
    objective: "Choose caching strategy for session storage"
    proposal: "Replace Redis with in-memory cache"
    constraints:
      - "Must survive single-instance restarts"
      - "Sub-millisecond latency required"
    alternatives:
      - "Redis with local fallback"
      - "Distributed in-memory (e.g., Dragonfly)"
    evidence:
      - "Current Redis latency: 2-5ms p99"
      - "Session data < 1KB per user"
    decision_needed: "Approve in-memory with persistence tradeoff"
  critic_context:
    audience: "Platform team + security"
    time_horizon: "Next sprint"
    success_criteria:
      - "Latency < 1ms p99"
      - "Zero data loss on restart"
    known_unknowns:
      - "Memory pressure under peak load"
```

---

## Output

```yaml
verdict: "pass"  # pass | warning | blocking | needs_revision
# Critic mode:
critic_verdict: "proceed"  # proceed | revise | defer | reject | needs_input
challenges: [...]
alternatives: [...]
decision_blockers: [...]
warnings: [...]
security_findings: [...]  # If _security_mode present
```

**Reviewer never implements** — only evaluates and reports.

---

## Key Rules

1. **Three independent axes** — mode, target, scope combine orthogonally
2. **Critic = read-only** — No implementation, no file mutations
3. **Scope limits examination** — Not permission to gather more
4. **Over-engineering pass** — For code/integration targets
5. **Evaluates handed evidence** — plan/task/decision reviews don't explore
6. **Security findings separate** — `_security_mode` surfaces as critical

---

## Related Pages

- [Reviewer Routing](/agents/reviewer-routing) — Detailed axis combinations
- [Workflow: Plan](/guide/plan) — Pre-execution review gate
- [Workflow: Execute](/guide/workflow-execute) — Review gates in wave loop
- [Core Concepts](/getting-started/concepts) — Handoff structure