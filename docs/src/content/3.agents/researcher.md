---
title: Researcher
description: Codebase exploration specialist with five budgeted modes: scan, deep, audit, trace, and question.
navigation:
  icon: i-lucide-search
---

## Role

The Researcher explores **patterns, dependencies, architecture, and docs** in five budgeted modes. Runs directly for standalone research or inside a persistent wave plan under Planner-set budget.

---

## When Delegated

- Standalone research (`intent: research`)
- Wave 1 of MEDIUM/HIGH plans (exploration budget set by Planner)
- Pre-planning discovery for complex tasks
- Audit and trace tasks

---

## Exploration Modes

| Mode | Purpose | Budget | Output |
|------|---------|--------|--------|
| **scan** | High-level pattern discovery | Low (1-2 min) | Key files, patterns, conventions |
| **deep** | Comprehensive architecture analysis | Medium (5-10 min) | Dependency graphs, data flows, boundaries |
| **audit** | Compliance/security review | Medium (5-10 min) | Findings with evidence, risk ratings |
| **trace** | Follow specific flow/call chain | Variable | Step-by-step execution path |
| **question** | Answer specific technical question | Low (1-3 min) | Direct answer with references |

---

## Input

```yaml
# Standalone research
exploration_mode: "deep"
research_question: "How does the current caching layer work?"
expected_deliverable: "Architecture diagram + key interfaces + invalidation strategy"

# In wave plan (from Planner)
exploration_mode: "scan"
acceptance_criteria:
  - "Document REST patterns in src/api/"
  - "Identify pagination helper location"
```

---

## Output (Standalone)

```yaml
next_action: "return_findings"  # return_findings | plan_follow_up | needs_input
findings:
  - finding: "Caching uses Redis with 5-min TTL, keys prefixed by 'cache:'"
    confidence: 0.95
    evidence: ["src/cache/redis.ts", "src/config/cache.ts"]
    tags: ["caching", "redis", "architecture"]
  - finding: "Invalidation via pub/sub on data mutations"
    confidence: 0.90
    evidence: ["src/events/cache-invalidation.ts"]
    tags: ["caching", "invalidation"]
stable_findings: []  # Confidence ≥ 0.95, promoted to memory on success
```

---

## Output (In Wave Plan)

```yaml
# Handoff for downstream tasks
handoff:
  shared_context: |
    REST patterns: GET/POST/PUT/DELETE in src/api/
    Pagination helper: src/utils/pagination.ts (cursor + offset)
    Query validation: Zod schemas in src/validation/
  patterns:
    - "API conventions: Zod for query validation"
    - "Error handling: ApiError class from src/errors/"
  files:
    - "src/api/conventions.md"
    - "src/utils/pagination.ts"
    - "src/validation/query.ts"
```

---

## Budgeted Exploration

| Control | Mechanism |
|---------|-----------|
| **Time budget** | Planner sets max time per mode |
| **Depth budget** | `exploration_mode` limits scope |
| **Output budget** | Findings capped at relevant discoveries |
| **Tool budget** | Native flags (`--quiet`, `maxResults`) preferred |

**Researcher never explores indefinitely** — budget enforced by Planner or Orchestrator.

---

## Research Patterns

### Scan Mode (High-Level)
```bash
# Find API patterns
grep -r "export.*GET\|export.*POST" src/api/ --include="*.ts"
# Find conventions
cat src/api/conventions.md
# Find helpers
ls src/utils/
```

### Deep Mode (Architecture)
```bash
# Dependency graph
npx madge --image graph.svg src/
# Data flow trace
grep -r "prisma\." src/ --include="*.ts" | head -50
# Boundary detection
grep -r "architectural_boundary\|module_boundary" src/
```

### Audit Mode (Compliance)
```bash
# Security patterns
grep -r "eval\|exec\|dangerous" src/ --include="*.ts"
# Auth checks
grep -r "auth\|permission\|role" src/middleware/ --include="*.ts"
# Data handling
grep -r "PII\|personal\|sensitive" src/ --include="*.ts"
```

---

## Key Rules

1. **Budgeted modes** — scan/deep/audit/trace/question with explicit limits
2. **Evidence-based findings** — Every finding references source files
3. **Confidence scores** — 0.0-1.0, only ≥0.95 promoted after success
4. **No implementation** — Pure exploration, no code changes
5. **Shared context optimization** — Findings for ≥2 tasks inlined once
6. **Stable findings tracked** — Separated from task-specific discoveries

---

## Related Pages

- [Workflow: Plan](/guide/plan) — Researcher in wave planning
- [Workflow: Execute](/guide/workflow-execute) — How research feeds implementation
- [Core Concepts](/getting-started/concepts) — Shared context and handoffs
- [First Steps](/getting-started/first-steps) — Researcher in walkthrough