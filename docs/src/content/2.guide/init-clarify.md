---

title: Phase 0 - Init & Clarify
description: Classify the request, assess risk, assign complexity, and clarify only decision blockers.
navigation:
  icon: i-lucide-search
seo:
  title: Init & Clarify - Gem Team
  description: "Phase 0: classify requests, assess risk, assign complexity, and route work to the right specialist."
  ogTitle: Init & Clarify - Gem Team
  ogDescription: Phase 0: classify requests and route work to the right specialist.
---

## Purpose

Shallow, non-delegable classification using **only the request and supplied evidence** - no repository inspection, no delegation to improve confidence.

---

## What Happens

### 1. Load Configuration & Memory

- Reads `.gem-team.yaml` if present
- Loads continuity memory (repo + session)

### 2. Normalize Request

Extracts and validates:

| Field           | Values                                                         | Required                     |
| --------------- | -------------------------------------------------------------- | ---------------------------- |
| `plan_id`       | Exact string (YYYYMMDD-slug)                                   | For `continue_plan`/`extend` |
| `request_state` | `new_task` \| `continue_plan` \| `extend`                      | Yes                          |
| `intent`        | `execute` \| `debug` \| `research` \| `discuss` \| `challenge` | Yes                          |

### 3. Intent Priority Resolution

When multiple intents could apply, highest wins:

```
challenge > debug > research > execute > discuss
```

Ties → ask once. `discuss` only if explicitly requested.

### 4. Risk Signal Matching

Matches **explicit or strongly implied** signals from supplied evidence:

| Signal Category  | Examples                                                                            |
| ---------------- | ----------------------------------------------------------------------------------- |
| **Architecture** | `architecture`, `contract_change`, `breaking_change`, `api_change`, `schema_change` |
| **Security**     | `auth_change`, `security_sensitive`, `data_flow_change`                             |
| **Irreversible** | `migration`, `irreversible`, `shared_state`                                         |
| **Cross-Domain** | `cross_domain_impact`                                                               |

> **Critical**: Only matches from **supplied evidence**. Does NOT inspect repository.

:::warning[NO REPO INSPECTION]
Phase 0 never inspects the repository. Risk signals come only from the request and supplied context.
:::

### 5. Provisional Complexity Assignment

One-time assignment based on evidence only:

| Complexity  | Criteria                                                |
| ----------- | ------------------------------------------------------- |
| **TRIVIAL** | One bounded change, no runtime/dep/contract risk        |
| **LOW**     | Small, reversible, single domain                        |
| **MEDIUM**  | Multiple dependent tasks/files/components, no high-risk |
| **HIGH**    | Any high-risk signal match                              |

:::tip[COMPLEXITY DRIVES PROCESS]
TRIVIAL/LOW → Fast path or in-memory plan. MEDIUM/HIGH → Persistent `plan.yaml` with full workflow.
:::

Evidence may raise complexity during planning, but Phase 0 never lowers it.

### 6. Clarification (Only If Blocked)

Asks **only** when missing info blocks a routing decision (`decision_blocker`). Otherwise records one bounded assumption and routes immediately.

---

## Input Requirements by Intent

### `execute` (Most Common)

```yaml
objective: "Add user search endpoint with filtering and pagination"
acceptance_criteria:
  - "GET /api/users/search?q=... returns filtered results"
  - "Pagination with page/limit params"
  - "OpenAPI documentation"
constraints:
  - "Follow existing API conventions in src/api/"
  - "Use Prisma for database queries"
```

### `debug`

```yaml
failure: "Tests failing in CI after auth refactor"
expected_behavior: "All auth tests pass"
evidence:
  - "CI logs: authentication.test.ts:42 - token validation error"
  - "Recent changes: src/auth/token.ts refactored"
```

### `research`

```yaml
research_question: "How does the current caching layer work?"
expected_deliverable: "Architecture diagram + key interfaces + invalidation strategy"
```

### `challenge`

```yaml
proposal: "Replace Redis with in-memory cache for session storage"
decision_needed: "Approve or reject with tradeoffs"
```

### `discuss`

```yaml
topic: "Model routing strategy"
question: "Should we use different models for planning vs implementation?"
```

## Output: Phase 0 State

```yaml
phase_0_state:
  plan_id: "20261121-user-search-api"
  request_state: "new_task"
  intent: "execute"
  objective: "Add user search endpoint..."
  acceptance_criteria: [...]
  constraints: [...]
  provisional_complexity: "MEDIUM"
  high_risk_signals: ["api_change", "contract_change"]
  critic_signals: []
  clarification_needed: false
  assumptions:
    - "Existing user model has name/email fields"
    - "Pagination helper available in src/utils/pagination.ts"
```

## Concrete Classification Examples

| Request                              | Intent        | Complexity | Risk Signals                 | Path                      |
| ------------------------------------ | ------------- | ---------- | ---------------------------- | ------------------------- |
| "Fix typo in README"                 | execute       | TRIVIAL    | none                         | Fast path                 |
| "Extract validation helper"          | execute       | LOW        | none                         | Fast path                 |
| "Add /api/users/search endpoint"     | execute       | MEDIUM     | api_change                   | Full plan                 |
| "Migrate auth to OAuth2"             | execute       | HIGH       | auth_change, breaking_change | Full plan + critic review |
| "How does caching work?"             | research      | LOW        | none                         | Researcher → Phase 4      |
| "Should we use Redis or DB?"         | challenge     | MEDIUM     | architecture                 | Reviewer critic → Phase 4 |
| "Continue plan 20261121-user-search" | continue_plan | MEDIUM     | existing plan                | Phase 3 resume            |

---

## Edge Cases

| Situation                                  | Handling                                                               |
| ------------------------------------------ | ---------------------------------------------------------------------- |
| `discuss` intent                           | Phase 4 direct answer, no plan, no delegation                          |
| `research` standalone                      | gem-researcher → Phase 4; no plan unless promoted via `plan_follow_up` |
| `challenge` intent                         | gem-reviewer critic mode → Phase 4; read-only decision review          |
| `continue_plan` without valid `plan_id`    | Block; request exact ID; no fuzzy matching or inference                |
| Missing acceptance criteria on MEDIUM task | Planner cannot emit plan; ask once for criteria                        |
| High-risk signal on TRIVIAL task           | Complexity raised to MEDIUM; persistent plan required                  |
| `extend` with no scope change              | Treats as continue_plan (execution-only) → Phase 3                     |

---

## Key Rules

1. **No exploration** - Uses only request + supplied context + continuity memory
2. **Classify once** - No re-classification, no confidence-seeking
3. **Ask once** - Only for true decision blockers
4. **Route immediately** - To Phase 1 with normalized state

---

## Common Mistakes

| Mistake                                  | Correct Approach                   |
| ---------------------------------------- | ---------------------------------- |
| Inspecting repo to "be sure"             | Use only supplied evidence         |
| Asking clarifying questions preemptively | Only ask if decision blocked       |
| Lowering complexity to avoid planning    | Let evidence raise it; never lower |
| Inferring plan_id for continuation       | Require exact explicit plan_id     |

---

## Next Phase

→ [Phase 1: Route](/guide/route) - Determines execution path based on classification
