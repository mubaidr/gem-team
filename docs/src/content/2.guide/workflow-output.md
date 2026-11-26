---

title: Phase 4 - Output
description: Structured status reports, learnings promotion, and workflow completion.
navigation:
  icon: i-lucide-check-circle
seo:
  title: Output - Gem Team
  description: "Phase 4: structured status reports, progress tracking, and learnings capture."
  ogTitle: Output - Gem Team
  ogDescription: Phase 4: structured status reports and learnings.
---

## Purpose

Produce a structured final report, promote reusable learnings, and complete the workflow.

---

## Output by Intent

| Intent                                     | Output                                                    |
| ------------------------------------------ | --------------------------------------------------------- |
| `discuss`                                  | Direct answer - no plan status                            |
| `research` (standalone, `return_findings`) | Research results - no execution status                    |
| `research` (standalone, `needs_input`)     | Questions for user - no continuation                      |
| `challenge`                                | Critic synthesis + evidence + tradeoffs + decision needed |
| `execute` / `debug` / planned work         | **Full execution status report**                          |

---

## Execution Status Report Format

For all planned/executed work:

```markdown
## Execution Status

Plan: `{plan_id}` | `{objective}`
Progress: `{completed}/{total}` tasks (`{percent}%`)
Waves: Wave `{n}` (`{completed}/{total}`)
Blocked: `{count}` | `{list_task_ids_if_any}`
Next: Wave `{n+1}` (`{pending_count}` tasks)

## Blocked Tasks

| Task ID   | Why Blocked   | Waiting Time       |
| --------- | ------------- | ------------------ |
| {task_id} | {why_blocked} | {how_long_waiting} |

## Completed Tasks

| Task ID   | Agent   | Wave   | Criteria Met | Evidence            |
| --------- | ------- | ------ | ------------ | ------------------- |
| {task_id} | {agent} | {wave} | ✅/❌        | {path_to_artifacts} |

## Promoted Learnings

| Finding   | Confidence | Source Task | Memory Tier         |
| --------- | ---------- | ----------- | ------------------- |
| {finding} | {0.95+}    | {task_id}   | repo/session/global |

## Next Actions

- [ ] Continue plan `{plan_id}` with additional scope
- [ ] Extend plan for follow-up work
- [ ] New task (independent)
```

:::tip[ALWAYS STRUCTURED OUTPUT]
Even for fast path (TRIVIAL/LOW), the Orchestrator produces a structured status report in this format.
:::

---

## Example: Complete Feature Output

```markdown
## Execution Status

Plan: `20261121-user-search-api` | Add user search endpoint with filtering and pagination
Progress: `5/5` tasks (100%)
Waves: Wave 3 (2/2)
Blocked: 0
Next: Complete

## Completed Tasks

| Task ID               | Agent              | Wave | Criteria Met | Evidence                      |
| --------------------- | ------------------ | ---- | ------------ | ----------------------------- |
| research-api-patterns | gem-researcher     | 1    | ✅           | wave-1/research-api-patterns/ |
| implement-search      | gem-implementer    | 2    | ✅           | wave-2/implement-search/      |
| write-search-tests    | gem-implementer    | 2    | ✅           | wave-2/write-search-tests/    |
| integration-review    | gem-reviewer       | 3    | ✅           | wave-3/integration-review/    |
| api-contract-test     | gem-browser-tester | 3    | ✅           | wave-3/api-contract-test/     |

## Blocked Tasks

_None_

## Promoted Learnings (confidence ≥ 0.95)

| Finding                                                        | Confidence | Source Task           | Memory Tier |
| -------------------------------------------------------------- | ---------- | --------------------- | ----------- |
| Pagination helper pattern reusable across endpoints            | 0.98       | implement-search      | repo        |
| Zod query validation convention for search params              | 0.96       | implement-search      | repo        |
| Prisma case-insensitive search: contains + mode: 'insensitive' | 0.99       | research-api-patterns | repo        |

## Created Files

| File                                           | Purpose                        |
| ---------------------------------------------- | ------------------------------ |
| `src/api/users/search.ts`                      | Search endpoint implementation |
| `tests/api/users/search.test.ts`               | Comprehensive test suite       |
| `docs/plan/20261121-user-search-api/plan.yaml` | Persistent plan artifact       |

## Next Actions

- [ ] Extend plan for CSV export feature (`?format=csv`)
- [ ] New task: Add search analytics endpoint
```

---

## Output Examples by Scenario

### Scenario 1: Fast Path (TRIVIAL)

```markdown
## Execution Status

Plan: `20261121-typo-fix` | Fix typo in README
Progress: `1/1` tasks (100%)
Waves: Wave 1 (1/1)
Blocked: 0
Next: Complete

## Completed Tasks

| Task ID  | Agent           | Wave | Criteria Met | Evidence        |
| -------- | --------------- | ---- | ------------ | --------------- |
| fix-typo | gem-implementer | 1    | ✅           | N/A (fast path) |

## Blocked Tasks

_None_

## Promoted Learnings

_None (fast path, session memory only)_

## Next Actions

- [ ] New task (independent)
```

### Scenario 2: MEDIUM Plan Complete

```markdown
## Execution Status

Plan: `20261121-user-search-api` | Add user search endpoint with filtering and pagination
Progress: `5/5` tasks (100%)
Waves: Wave 3 (2/2)
Blocked: 0
Next: Complete

## Completed Tasks

| Task ID               | Agent              | Wave | Criteria Met | Evidence                      |
| --------------------- | ------------------ | ---- | ------------ | ----------------------------- |
| research-api-patterns | gem-researcher     | 1    | ✅           | wave-1/research-api-patterns/ |
| implement-search      | gem-implementer    | 2    | ✅           | wave-2/implement-search/      |
| write-search-tests    | gem-implementer    | 2    | ✅           | wave-2/write-search-tests/    |
| integration-review    | gem-reviewer       | 3    | ✅           | wave-3/integration-review/    |
| api-contract-test     | gem-browser-tester | 3    | ✅           | wave-3/api-contract-test/     |

## Blocked Tasks

_None_

## Promoted Learnings (confidence ≥ 0.95)

| Finding                                                        | Confidence | Source Task           | Memory Tier |
| -------------------------------------------------------------- | ---------- | --------------------- | ----------- |
| Pagination helper pattern reusable across endpoints            | 0.98       | implement-search      | repo        |
| Zod query validation convention for search params              | 0.96       | implement-search      | repo        |
| Prisma case-insensitive search: contains + mode: 'insensitive' | 0.99       | research-api-patterns | repo        |

## Created Files

| File                                           | Purpose                        |
| ---------------------------------------------- | ------------------------------ |
| `src/api/users/search.ts`                      | Search endpoint implementation |
| `tests/api/users/search.test.ts`               | Comprehensive test suite       |
| `docs/plan/20261121-user-search-api/plan.yaml` | Persistent plan artifact       |

## Next Actions

- [ ] Extend plan for CSV export feature (`?format=csv`)
- [ ] New task: Add search analytics endpoint
```

### Scenario 3: Blocked Plan

```markdown
## Execution Status

Plan: `20261121-deploy-staging` | Deploy to staging
Progress: `3/5` tasks (60%)
Waves: Wave 2 (2/3)
Blocked: 1 | deploy-to-staging
Next: Wave 3 (blocked)

## Blocked Tasks

| Task ID           | Why Blocked                 | Waiting Time |
| ----------------- | --------------------------- | ------------ |
| deploy-to-staging | Staging cluster unavailable | ~2 hours     |

## Completed Tasks

| Task ID        | Agent          | Wave | Criteria Met | Evidence               |
| -------------- | -------------- | ---- | ------------ | ---------------------- |
| research-infra | gem-researcher | 1    | ✅           | wave-1/research-infra/ |
| build-image    | gem-devops     | 2    | ✅           | wave-2/build-image/    |
| smoke-tests    | gem-devops     | 2    | ✅           | wave-2/smoke-tests/    |

## Promoted Learnings

_None (plan not complete)_

## Next Actions

- [ ] Unblock staging cluster
- [ ] Resume plan `20261121-deploy-staging`
```

---

## Agent Output Policy

Agents return **minimal, role-specific schemas**:

| Principle                 | Implementation                                     |
| ------------------------- | -------------------------------------------------- |
| **Smallest schema**       | Only workflow state + required handoffs            |
| **No input repetition**   | Never echo back criteria, instructions, or context |
| **No empty fields**       | Omit optional fields entirely                      |
| **Evidence by reference** | Return artifact paths, not content                 |
| **No universal `learn`**  | Learnings handled by Orchestrator post-success     |

### Example: Implementer Output

```yaml
# Minimal - only what Orchestrator needs
status: "completed"
failure_classification: null
handoff:
  implemented_files:
    - "src/api/users/search.ts"
  test_files:
    - "tests/api/users/search.test.ts"
  api_contract_path: "wave-3/implement-search/artifacts/api-contract.json"
  test_results_path: "wave-3/implement-search/artifacts/test-results.xml"
# No: criteria, objective, full context, analysis, learnings
```

---

## Memory Promotion Rules

### Promotion Criteria (All Required)

1. **Final success** - All waves complete, no blocked tasks
2. **Confidence ≥ 0.95** - High certainty finding is correct
3. **Stable** - `stable: true` (not task-specific, not speculative)
4. **Reusable** - Applies beyond this specific task
5. **Not already known** - Not duplicate of existing memory

### Promotion Tiers

| Tier        | Scope        | Persistence        | Promoted By                 |
| ----------- | ------------ | ------------------ | --------------------------- |
| **Repo**    | Workspace    | With repository    | Orchestrator (post-success) |
| **Session** | Conversation | Until session ends | Orchestrator (post-success) |
| **Global**  | User         | Across workspaces  | User action / explicit      |

### What Gets Promoted

```yaml
# Repo memory entry
- finding: "Pagination helper in src/utils/pagination.ts handles cursor + offset"
  confidence: 0.98
  source_task: "implement-search"
  tags: ["pagination", "api", "convention"]
  ttl_days: 30 # Auto-expire to prevent stale accumulation
```

---

## Skill Extraction

When a **workflow pattern** proves reusable (not just a finding):

```
Successful Pattern (multiple tasks, high confidence)
                    │
                    ▼
         ┌─────────────────────┐
         │ gem-skill-creator   │  (delegated by Orchestrator)
         └──────────┬──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │ .apm/skills/        │
         │   new-pattern/      │
         │     SKILL.md        │  ← Packaged playbook
         │     scripts/        │
         │     references/     │
         └─────────────────────┘
```

**Skill criteria:**

- Used in ≥2 successful tasks
- Confidence ≥ 0.95
- Self-contained guidance (not task-specific)
- Includes validation checks and edge cases

---

## Plan Artifact Finalization

On completion, `docs/plan/{plan_id}/` contains:

```
docs/plan/20261121-user-search-api/
├── plan.yaml              # Immutable baseline
├── status.yaml            # Final state: all completed
├── wave-1/
│   └── research-api-patterns/
│       ├── output.md
│       ├── handoff.yaml
│       └── artifacts/
├── wave-2/
│   ├── implement-search/
│   │   ├── output.md
│   │   ├── handoff.yaml
│   │   └── artifacts/
│   └── write-search-tests/
│       └── ...
└── wave-3/
    ├── integration-review/
    └── api-contract-test/
```

**These persist permanently** - available for:

- Audit trail
- Resumption via exact `plan_id`
- Learning extraction
- Debugging history

---

## Ephemeral vs Persistent Output

| Aspect           | TRIVIAL/LOW (Ephemeral) | MEDIUM/HIGH (Persistent)   |
| ---------------- | ----------------------- | -------------------------- |
| Status report    | Yes                     | Yes                        |
| Plan artifacts   | No                      | Yes (`docs/plan/`)         |
| Memory promotion | Session only            | Repo + Session             |
| Skill extraction | No                      | Yes (if pattern qualifies) |
| Resumability     | Correlation only        | Full state via `plan_id`   |

---

## Key Rules

1. **Intent determines output format** - Discuss/Research/Challenge differ from Execute
2. **Minimal agent output** - Role-specific, no repetition, evidence by reference
3. **Promote after final success only** - Confidence ≥ 0.95, stable, reusable
4. **Three memory tiers** - Repo/Session/Global with different persistence
5. **Skills from patterns, not findings** - Workflow patterns → SKILL.md
6. **Plan artifacts immutable** - `plan.yaml` never modified after creation
7. **Structured status always** - Even for fast path, use standard format

---

## Next: Failure Handling

→ [Failure Handling](/guide/failure-handling) - Classification, routing, replan guardrails
