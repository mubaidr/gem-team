---
title: Learns & Improves
description: Three-tier memory, confidence-gated promotion, and skill extraction from successful patterns.
navigation:
  icon: i-lucide-brain
seo:
  title: Learning - Gem Team
  description: "How Gem Team learns from success: memory tiers, skill extraction, confidence-gated promotion."
  ogTitle: Learning - Gem Team
  ogDescription: How Gem Team learns from success and extracts reusable skills.
---

## Continuous Learning Architecture

Every successful task makes the next one faster through structured, confidence-gated learning.

```mermaid
flowchart TD
    A[Task Completes Successfully] --> B{Evaluate Findings}
    B -->|Confidence ≥ 0.95| C[Promote to Memory]
    B -->|Pattern Reusable| D[Extract as Skill]
    B -->|Neither| E[Discard]
    C --> F[Repo Memory\n(Workspace)]
    C --> G[Session Memory\n(Conversation)]
    C --> H[Global Memory\n(User)]
    D --> I[.apm/skills/\nSKILL.md + scripts]

    style C fill:#e8f5e9
    style D fill:#e3f2fd
```

---

## Three-Tier Memory

| Tier        | Scope               | Persistence           | What Gets Stored                                                          |
| ----------- | ------------------- | --------------------- | ------------------------------------------------------------------------- |
| **Repo**    | Workspace-scoped    | With repository (Git) | Conventions, decisions, patterns, failure modes, architectural boundaries |
| **Session** | Conversation-scoped | Until session ends    | Task evidence, intermediate findings, transient context                   |
| **Global**  | User-scoped         | Across all workspaces | Cross-project preferences, tool configurations, personal patterns         |

> **Repo memory is committed to Git** - Team-shared, version-controlled, survives across sessions.

---

## Promotion Rules

**Only after final success** (all waves complete, no blocked tasks):

```yaml
# Evaluation criteria (ALL required)
promotion_criteria:
  - final_success: true # All waves complete
  - confidence: ">= 0.95" # High certainty
  - stable: true # Not task-specific, not speculative
  - reusable: true # Applies beyond this task
  - not_duplicate: true # Not already in memory
```

> **Confidence gate at 0.95** prevents noise accumulation. Only high-certainty, validated patterns become reusable knowledge.

### What Gets Promoted

```yaml
# Example repo memory entry
- finding: "Pagination helper in src/utils/pagination.ts handles both cursor and offset pagination with consistent response format"
  confidence: 0.98
  source_task: "implement-search"
  tags: ["pagination", "api", "convention", "helper"]
  ttl_days: 30
  promoted_at: "2025-01-15T11:00:00Z"
```

### Memory Injection (Automatic)

Orchestrator pre-filters relevant repo memory into planning context:

```yaml
planning_context:
  memory_injection:
    repo:
      - "API conventions: Zod for query validation"
      - "Pagination helper: src/utils/pagination.ts"
      - "User model: email field optional since 2025-01-10"
    session:
      - "Previous search task used Prisma contains + mode: insensitive"
```

---

## Skill Extraction

When a **workflow pattern** (not just a finding) proves reusable:

```
Successful Pattern (used in ≥2 tasks, high confidence)
                    │
                    ▼
         ┌─────────────────────┐
         │ gem-skill-creator   │  ← Delegated by Orchestrator
         └──────────┬──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │ .apm/skills/        │
         │   new-pattern/      │
         │     SKILL.md        │  ← Packaged playbook
         │     scripts/        │  ← Automation scripts
         │     references/     │  ← External docs
         │     assets/         │  ← Diagrams, templates
         └─────────────────────┘
```

### Skill Criteria

| Criterion                  | Requirement                                      |
| -------------------------- | ------------------------------------------------ |
| **Usage count**            | ≥ 2 successful tasks                             |
| **Confidence**             | ≥ 0.95                                           |
| **Self-contained**         | Not task-specific, includes validation           |
| **Progressive disclosure** | Core guidance in SKILL.md, extras in references/ |
| **No secrets**             | No private task data or one-off workarounds      |

### Example Skill Structure

```
.apm/skills/api-pagination/
├── SKILL.md              # Main playbook
├── scripts/
│   └── generate-pagination.ts
├── references/
│   └── pagination-rfc.md
└── assets/
    └── pagination-flow.svg
```

---

## Memory in Action

### During Planning

```yaml
# Planner receives relevant memory automatically
planning_context:
  memory_injection:
    repo:
      - "API conventions: Zod for query validation"
      - "Error handling: Use ApiError class from src/errors/"
    session:
      - "User search task established Prisma pattern"
```

### During Implementation

```yaml
# Implementer can check memory for directly relevant findings
# Agent queries: "Any memory about Prisma case-insensitive search?"
memory_result:
  - finding: "Prisma case-insensitive: contains + mode: 'insensitive'"
    confidence: 0.99
    source_task: "research-api-patterns"
```

### After Success

```yaml
# Orchestrator promotes stable findings
promoted_findings:
  - finding: "Pagination helper pattern reusable across endpoints"
    confidence: 0.98
    memory_tier: "repo"
    tags: ["pagination", "api", "helper"]
  - finding: "Zod query validation convention for search params"
    confidence: 0.96
    memory_tier: "repo"
    tags: ["validation", "zod", "api"]
```

---

## TTL & Cleanup

| Tier        | TTL            | Cleanup                              |
| ----------- | -------------- | ------------------------------------ |
| **Repo**    | 30 days        | Auto-expire; manual refresh on reuse |
| **Session** | Session end    | Cleared automatically                |
| **Global**  | No auto-expire | User-managed                         |

**Stale prevention**: Memory entries accessed within TTL get refreshed. Unused entries expire.

---

## What Doesn't Get Promoted

| Category                | Reason                                       |
| ----------------------- | -------------------------------------------- |
| Task-specific paths     | Not reusable (`wave-3/implement-search/...`) |
| Transient assumptions   | Not stable                                   |
| Low confidence (< 0.95) | Not reliable                                 |
| Speculative patterns    | Not validated                                |
| Duplicate findings      | Already in memory                            |
