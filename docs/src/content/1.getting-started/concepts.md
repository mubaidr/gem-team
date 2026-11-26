---
title: Core Concepts
description: Understand the mental model behind Gem Team's engineering workflow.
navigation:
  icon: i-lucide-brain
seo:
  title: Core Concepts - Gem Team
  description: "Understand the mental model behind Gem Team: orchestrator, five-phase workflow, scoped handoffs, waves, and skills."
  ogTitle: Core Concepts - Gem Team
  ogDescription: Understand the mental model behind Gem Team.
---

## The Mental Model

Gem Team treats AI coding like **software engineering** - not chat. Here are the core concepts that make it work.

These are just agent definitions and system instructions - nothing complex, nothing hidden, no magic.

---

## 1. Orchestrator + Specialists

```
┌─────────────────────────────────────┐
│         ORCHESTRATOR                │
│  (Plans, Routes, Tracks, Reports)   │
└──────────────┬──────────────────────┘
               │ delegates
     ┌─────────┼─────────┐
     ▼         ▼         ▼
┌────────┐ ┌────────┐ ┌────────┐
│Planner │ │Implement│ │Reviewer│
└────────┘ └────────┘ └────────┘
     ▲         ▲         ▲
     │         │         │
┌────────┐ ┌────────┐ ┌────────┐
│Debugger│ │Researcher│ │DevOps  │
└────────┘ └────────┘ └────────┘
```

**The Orchestrator never writes code.** It classifies, plans, delegates, and verifies. Specialists do the actual work.

---

## 2. Five-Phase Workflow

Every task follows this pipeline:

| Phase                 | Purpose                                          | Key Decision                          |
| --------------------- | ------------------------------------------------ | ------------------------------------- |
| **0. Init & Clarify** | Classify request, assess risk, assign complexity | What kind of work is this?            |
| **1. Route**          | Send to right path (fast path vs full plan)      | Direct to specialist or plan first?   |
| **2. Plan**           | Build wave plan with handoffs (MEDIUM/HIGH only) | How to break down and order the work? |
| **3. Execute**        | Run waves, delegate to specialists, verify       | Do the work, wave by wave             |
| **4. Output**         | Structured status report + learnings             | What happened and what's reusable?    |

---

## 3. Complexity Tiers

Phase 0 assigns one of four tiers based on **supplied evidence only** (no repo inspection):

| Tier        | When                                          | Planning               | Review            | Persistence         |
| ----------- | --------------------------------------------- | ---------------------- | ----------------- | ------------------- |
| **TRIVIAL** | One bounded change, no risk                   | None (fast path)       | None              | Correlation ID only |
| **LOW**     | Small, reversible, single domain              | In-memory wave plan    | None              | Correlation ID only |
| **MEDIUM**  | Multiple dependent tasks, no high-risk        | Persistent `plan.yaml` | If risky/explicit | Full plan artifacts |
| **HIGH**    | Architecture, contracts, security, migrations | Persistent `plan.yaml` | Required          | Full plan artifacts |

---

## 4. Scoped Handoffs (The Secret to Efficiency)

Instead of dumping full context, each agent receives **exactly what it needs**:

```yaml
task_definition:
  objective: "Add user authentication"
  acceptance_criteria:
    - "Login endpoint returns JWT"
    - "Passwords hashed with bcrypt"
  handoff:
    constraints:
      - "Use existing user schema"
      - "Follow API conventions in api/conventions.md"
    relevant_context:
      - "auth-middleware: file=src/middleware/auth.ts"
      - "user-model: schema=User, fields=id,email,password_hash"
    plan_context:
      architectural_boundaries: ["auth module", "api layer"]
      risk_decisions: ["stateless JWT", "refresh token rotation"]
```

**Benefits:**

- ~80% token reduction vs full history
- High cache hit rates (stable prefix)
- No context bloat across waves

---

## 5. Three-Tier Memory

| Tier        | Scope        | Persistence        | What Gets Stored                                |
| ----------- | ------------ | ------------------ | ----------------------------------------------- |
| **Repo**    | Workspace    | With repository    | Conventions, decisions, patterns, failure modes |
| **Session** | Conversation | Until session ends | Task evidence, intermediate findings            |
| **Global**  | User         | Across workspaces  | Cross-project learnings, preferences            |

**Promotion rule**: Only findings with **confidence ≥ 0.95** after final success become repo memory.

---

## 6. Wave-Based Execution

Planned work runs in **ordered waves** - each completes before the next starts:

```
Wave 1: [Researcher] Explore codebase
                 ↓
Wave 2: [Planner] Create plan (if MEDIUM/HIGH)
                 ↓
Wave 3: [Implementer] Write code + [Tester] Verify
                 ↓
Wave 4: [Reviewer] Security/a11y check (if triggered)
                 ↓
Done: [Orchestrator] Report + promote learnings
```

**Parallel within wave**: Independent tasks run simultaneously (up to `max_concurrent_agents`).

**Cluster optimization**: Tasks sharing context merge into one - saves invocation + context copy.

---

## 7. Failure Classification (No Blind Retries)

Every failure gets a **specific classification** and routes to the right handler:

| Classification         | Meaning                               | Handler                         |
| ---------------------- | ------------------------------------- | ------------------------------- |
| `needs_retry`          | Transient issue (network, flaky test) | Retry same task (max 3x)        |
| `fixable`              | Code bug                              | Debugger → Implementer          |
| `regression`           | Previously working, now broken        | Debugger (bisect) → Implementer |
| `needs_replan`         | Scope wrong, dependencies missed      | Planner (bounded replan)        |
| `flaky`                | Intermittent failure                  | Specialist re-runs once         |
| `platform_specific`    | Works on one platform, not another    | Specialist verifies criteria    |
| `test_bug`             | Test itself is wrong                  | Debugger → Implementer          |
| `blocked` / `escalate` | External dependency / needs human     | Stop, escalate to user          |

---

## 8. Skills = Reusable Patterns

When a workflow pattern proves stable and reusable, it becomes a **Skill**:

```
Successful Pattern
        │
        ▼
┌───────────────┐
│ Skill Creator │  (packages as SKILL.md)
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ .apm/skills/  │  (available for matching tasks)
│ my-skill/     │
│   SKILL.md    │
└───────────────┘
```

Skills keep agent definitions focused while providing task-specific guidance.

---

## Mental Model Summary

| Concept          | Key Insight                                      |
| ---------------- | ------------------------------------------------ |
| **Orchestrator** | Coordinator, not executor                        |
| **Phases**       | Structured pipeline, not free-form chat          |
| **Complexity**   | Drives planning depth and review requirements    |
| **Handoffs**     | Scoped, cache-friendly, evidence-by-reference    |
| **Memory**       | Tiered, confidence-gated, promotes after success |
| **Waves**        | Ordered barriers, parallel within                |
| **Failures**     | Classified → routed to correct specialist        |
| **Skills**       | Extracted from success, not designed upfront     |

---

## Common Mistakes & Anti-Patterns

| Mistake                                     | Why It Fails                                         | Correct Approach                           |
| ------------------------------------------- | ---------------------------------------------------- | ------------------------------------------ |
| Inspecting repo during Phase 0 to "be sure" | Phase 0 is evidence-only; no repo inspection allowed | Use only supplied context and request      |
| Asking clarifying questions preemptively    | Phase 0 asks only for true decision blockers         | Ask once, only when blocked                |
| Lowering complexity to skip planning        | Evidence may raise complexity; never lower           | Let evidence drive the tier                |
| Reusing one `plan_id` for unrelated work    | Plan identity ties state to one objective            | New task = new `plan_id`                   |
| Sending full history to every agent         | Breaks cache, wastes tokens                          | Scoped handoffs with evidence by reference |
| Retrying without classification             | Blind retries hide root causes                       | Classify → route to correct handler        |
| Implementing without a failing test         | TDD is mandatory for code tasks                      | Red → Green → Refactor                     |

## Edge Cases

| Situation                                  | Handling                                              |
| ------------------------------------------ | ----------------------------------------------------- |
| `discuss` intent                           | Phase 4 direct answer, no plan, no delegation         |
| `research` standalone                      | gem-researcher → Phase 4; no plan unless promoted     |
| `challenge` intent                         | gem-reviewer critic mode → Phase 4; read-only         |
| `continue_plan` without valid `plan_id`    | Block; request exact ID; no inference                 |
| Missing acceptance criteria on MEDIUM task | Planner cannot emit plan; ask once for criteria       |
| High-risk signal on TRIVIAL task           | Complexity raised to MEDIUM; persistent plan required |
| Flaky test                                 | Specialist re-runs once; second failure blocks        |

## Decision Table: Choose Your Path

| Your Situation                       | Path                            | Example                            |
| ------------------------------------ | ------------------------------- | ---------------------------------- |
| One-line bug fix, single file        | Fast path (TRIVIAL)             | "Fix typo in README.md"            |
| Small refactor, one domain           | Fast path (LOW)                 | "Extract validation helper"        |
| New API endpoint, multiple files     | Full plan (MEDIUM)              | "Add /api/users/search"            |
| Architecture change, breaking change | Full plan (HIGH)                | "Migrate auth to OAuth2"           |
| Research question, no code           | Research path                   | "How does caching work?"           |
| Decision review, tradeoffs           | Challenge path                  | "Should we use Redis or DB?"       |
| Continue existing work               | Continue plan (exact `plan_id`) | "Resume plan 20261121-user-search" |

---

## Next Steps

- [First Steps Walkthrough](/getting-started/first-steps) - See concepts in action
- [Workflow Deep Dive](/guide/workflow) - Full phase-by-phase reference
- [Agents Catalog](/agents) - Meet all the specialists
