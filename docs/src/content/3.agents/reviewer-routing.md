---
title: Reviewer Routing
description: Three-axis review system (mode, target, scope) for precise quality, security, and compliance reviews.
navigation:
  icon: i-lucide-git-branch
---

## Three-Axis Review Model

The Reviewer (`gem-reviewer`) uses **three independent axes** that combine orthogonally for precise review targeting.

```mermaid
flowchart LR
    subgraph Axes [Three Independent Axes]
        A[review_mode\nstandard | high | critic]
        B[review_target\nplan | task | code | decision | docs | config | integration]
        C[review_scope\nchanged | affected | full]
    end
    
    A --> D[Review Configuration]
    B --> D
    C --> D
```

---

## Axis 1: Review Mode (Intensity)

| Mode | When Used | Depth |
|------|-----------|-------|
| **standard** | Routine MEDIUM, explicit request | Changed files, criteria verification |
| **high** | HIGH complexity, high-risk signals | Affected files, deep analysis, security focus |
| **critic** | Architecture decisions, `architecture`/`breaking_change`/`cross_domain_impact` | Full scope, read-only, challenges assumptions |

### Critic Mode Details

**Read-only** — evaluates without implementing:
- Assumptions and counterexamples
- Risks and alternatives
- Reversibility analysis
- Decision blockers
- Results: `critic_verdict` (proceed/revise/defer/reject/needs_input), `challenges`, `alternatives`, `decision_blockers`

**Requires in handoff:**
```yaml
handoff:
  critic_subject:
    objective: str
    proposal: str
    constraints: [str]
    alternatives: [str]
    evidence: [str]
    decision_needed: str
  critic_context:
    audience: str
    time_horizon: str
    success_criteria: [str]
    known_unknowns: [str]
```

---

## Axis 2: Review Target (What)

| Target | Description | Scope Behavior |
|--------|-------------|----------------|
| **plan** | Wave plan structure, ownership, dependencies | Evaluates handed plan |
| **task** | Task definition, acceptance criteria | Evaluates handed task |
| **code** | Implementation code | **Reads target as subject** |
| **decision** | Architectural/technical decision | Evaluates handed proposal |
| **docs** | Documentation content | Evaluates handed docs |
| **config** | Configuration files | **Reads target as subject** |
| **integration** | Cross-boundary contracts | **Reads target as subject** |

**Critical distinction**: `plan`/`task`/`decision` reviews evaluate **what they were handed**. `code`/`config`/`integration` reviews **read the target as their subject**.

---

## Axis 3: Review Scope (How Much)

| Scope | Meaning | Evidence Examined |
|-------|---------|-------------------|
| **changed** | Only modified files in task | Task's direct changes |
| **affected** | Changed + directly dependent files | Changes + immediate dependencies |
| **full** | Entire relevant codebase | All related code (critic default) |

**Not permission to gather more** — scope limits examination of supplied evidence.

---

## Common Combinations

| Scenario | Mode | Target | Scope | Trigger |
|----------|------|--------|-------|---------|
| Routine MEDIUM plan | standard | plan | changed | Pre-execution gate |
| HIGH complexity feature | high | integration | affected | Pre-execution gate |
| Architecture decision | critic | decision | full | Phase 0 critic signal |
| Security-sensitive code | high | code | affected | Risk signal `security_sensitive` |
| Config change review | standard | config | changed | Risk signal `data_flow_change` |
| Documentation review | standard | docs | changed | Explicit request |
| Integration contract | high | integration | affected | Risk signal `api_change` |

---

## Over-Engineering Pass

**Automatic for `code` and `integration` targets:**

- YAGNI violations (speculative features)
- Premature abstraction
- Unnecessary complexity
- Missing simplest solution
- Buzzword-driven design

---

## Review Handoff Examples

### Standard Integration Review
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

### Critic Decision Review
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

## Output Formats

### Standard/High Mode
```yaml
verdict: "pass"  # pass | warning | blocking | needs_revision
warnings: [...]
security_findings: [...]  # If _security_mode present
```

### Critic Mode
```yaml
critic_verdict: "proceed"  # proceed | revise | defer | reject | needs_input
challenges: [...]
alternatives: [...]
decision_blockers: [...]
```

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

- [Reviewer Agent](/agents/reviewer) — Full reviewer capabilities
- [Workflow: Plan](/guide/plan) — Pre-execution review gate
- [Workflow: Execute](/guide/workflow-execute) — Review gates in wave loop
- [Core Concepts](/getting-started/concepts) — Handoff structure