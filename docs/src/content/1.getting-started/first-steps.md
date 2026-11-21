---

title: First Steps Walkthrough
description: Complete guided example — build a real feature with Gem Team.
navigation:
  icon: i-lucide-footprints
seo:
  title: First Steps Walkthrough — Gem Team
  description: Complete guided example — build a real user search API feature with Gem Team end to end.
  ogTitle: First Steps Walkthrough — Gem Team
  ogDescription: Build a real feature with Gem Team end to end.
---


## Build a Real Feature: User Search API

This walkthrough shows the full Gem Team workflow by building a **user search endpoint** with filtering, pagination, and tests.

---

## The Scenario

> **Task**: "Add a `/api/users/search` endpoint that supports filtering by name/email, pagination, and returns typed results. Follow existing API conventions."

This is a **MEDIUM** complexity task — multiple files, dependencies, and quality requirements.

---

## Step 1: Submit the Task

```bash
# Create task description
cat > search-task.md << 'EOF'
## Task: User Search API Endpoint

Create a `/api/users/search` endpoint with:
- Query params: q (search name/email), page, limit, sortBy, sortOrder
- Filter users by name or email (case-insensitive partial match)
- Pagination with page/limit (default page=1, limit=20, max 100)
- Sorting by createdAt, name, email (default createdAt desc)
- Return typed response: { data: User[], pagination: { page, limit, total, totalPages } }
- Follow existing patterns in src/api/
- Write tests first (TDD)
- Add OpenAPI documentation
EOF
```

---

## Step 2: Run with Orchestrator

```bash
# Copilot CLI
copilot chat --agent gem-orchestrator "Read search-task.md and execute"

# Claude Code
claude
> /gem-orchestrator Read search-task.md and execute
```

---

## Step 3: Watch the Workflow

### Phase 0: Init & Clarify (Automatic)
```
📋 Classifying request...
   Intent: execute
   Complexity: MEDIUM (multiple files, API conventions, tests)
   Risk signals: api_change, contract_change
   Plan ID: 20250115-user-search-api
```

### Phase 1: Route
```
🔀 Routing to Phase 2 (Planning) — MEDIUM complexity requires persistent plan
```

### Phase 2: Planning (gem-planner)
```
📝 Creating wave plan...

Wave 1: [Researcher] Explore API conventions & user schema
Wave 2: [Planner] Self-check + create detailed plan
Wave 3: [Implementer] Write tests + implementation
Wave 4: [Reviewer] Integration review (api_change triggered)
Wave 5: [Browser Tester] API contract test (optional)
```

**Plan saved to** `docs/plan/20250115-user-search-api/plan.yaml`

---

## Step 4: Wave Execution

### Wave 1: Research (gem-researcher)
```
🔍 Exploring codebase...
   Found: src/api/conventions.md, src/models/user.ts, src/api/users.ts
   Patterns: REST conventions, Zod schemas, pagination helpers
   → Shared context created for Wave 3
```

### Wave 2: Plan Validation (gem-planner)
```
✅ Mechanical self-check passed:
   - All tasks have owners
   - Waves are positive integers
   - Dependencies resolvable
   - Criteria per task
   - Clusters consistent

🔀 Review required: HIGH risk (api_change) → gem-reviewer (standard, integration)
```

### Wave 3: Implementation (gem-implementer)
```
🔨 Implementing...

Task 1: Write tests (Red)
   ✅ Created tests/api/users/search.test.ts
   - Filter by name/email
   - Pagination edge cases
   - Sorting variations
   - Error handling

Task 2: Implement endpoint (Green)
   ✅ Created src/api/users/search.ts
   - Query validation with Zod
   - Database query with Prisma
   - Pagination helper reused
   - OpenAPI JSDoc comments

Task 3: Verify (Refactor)
   ✅ All tests passing
   ✅ Lint clean
   ✅ Type check clean
```

### Wave 4: Integration Review (gem-reviewer)
```
🔍 Reviewing integration...
   Target: src/api/users/search.ts + tests
   Scope: changed + affected
   Mode: standard

   Checks:
   ✅ API conventions followed
   ✅ Contract integrity (request/response types)
   ✅ Security: input validation, no SQL injection
   ✅ Performance: indexed query, pagination limits
   ✅ Accessibility: N/A (API)
   ✅ Error handling: proper HTTP codes

   Verdict: PASS
```

---

## Step 5: Final Output

```
## Execution Status

Plan: `20250115-user-search-api` | User Search API Endpoint
Progress: `5/5` tasks (100%)
Waves: Wave 1 (1/1) → Wave 2 (1/1) → Wave 3 (2/2) → Wave 4 (1/1)
Blocked: 0
Next: Complete

## Created Files

| File | Purpose |
|------|---------|
| `src/api/users/search.ts` | Search endpoint implementation |
| `tests/api/users/search.test.ts` | Comprehensive test suite |
| `docs/plan/20250115-user-search-api/plan.yaml` | Persistent plan artifact |

## Promoted Learnings (confidence ≥ 0.95)

- Pagination helper pattern reusable across endpoints
- Zod query validation convention for search params
- Prisma case-insensitive search: `contains` + `mode: 'insensitive'`
```

---

## Step 6: Verify the Result

```bash
# Run the tests
npm test -- tests/api/users/search.test.ts

# Test the endpoint manually
curl "http://localhost:3000/api/users/search?q=john&page=1&limit=10"

# Expected response:
{
  "data": [
    { "id": "1", "name": "John Doe", "email": "john@example.com", "createdAt": "2025-01-15T10:30:00Z" }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 1, "totalPages": 1 }
}
```

---

## What You Learned

| Concept | In This Example |
|---------|-----------------|
| **Complexity classification** | MEDIUM → persistent plan |
| **Risk signals** | `api_change` triggered integration review |
| **Scoped handoffs** | Researcher found conventions → passed to Implementer |
| **Wave execution** | Ordered waves, parallel tasks within wave 3 |
| **Failure classification** | None — but would route to Debugger if tests failed |
| **Memory promotion** | Pagination pattern saved for reuse |

---

## Try It Yourself

Now modify the task and re-run:

```bash
# Extend the plan (adds to existing plan ID)
cat > extend-task.md << 'EOF'
## Extend: Add export to CSV

Add `?format=csv` to the search endpoint that streams CSV download.
Reuse the search logic, add CSV serializer.
EOF

# Continue the same plan
copilot chat --agent gem-orchestrator "Continue plan 20250115-user-search-api with extend-task.md"
```

This demonstrates **resumable plans** — same `plan_id`, new wave added, previous work preserved.

---

## Anti-Patterns & Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Plan never created | Task classified TRIVIAL/LOW; no persistent plan needed | Add high-risk signal or use `extend` for scope |
| Specialist returns no code | TDD blocked — no test file created | Check acceptance criteria are testable |
| Tests pass but code wrong | Tests too narrow; missing edge cases | Add boundary/error/empty-state tests |
| Reviewer keeps flagging same issue | Acceptance criteria don't match implementation | Align criteria before re-running |
| Cache miss on retry | Per-task field placed before stable field | Reorder: plan-constant → cluster → per-task → per-attempt |
| `plan_id` not found | Fuzzy matching not supported | Use exact ID from original execution |

## Before / After: Scoped Handoff

**Before** (full history sent to Implementer — wasteful):
```
Context: entire conversation + all previous waves + repo file listing
Task: implement search endpoint
```
**After** (Gem Team scoped handoff):
```yaml
plan_id: "20250115-user-search-api"
task_id: "implement-search"
handoff:
  constraints: ["Follow API conventions", "Use Prisma"]
  relevant_context:
    - "research-api-patterns: patterns=REST, pagination=src/utils/pagination.ts"
  plan_context:
    architectural_boundaries: ["api layer"]
    risk_decisions: ["stateless search"]
```

## Try It Yourself: Variations

```bash
# Variation 1: Add CSV export to existing search plan
cat > extend-task.md << 'EOF'
## Extend: Add CSV export

Add `?format=csv` to the search endpoint that streams CSV download.
Reuse the search logic, add CSV serializer.
EOF

copilot chat --agent gem-orchestrator "Extend plan 20250115-user-search-api with extend-task.md"

# Variation 2: Add a new test dimension
cat > new-test.md << 'EOF'
## Task: Add performance test to search endpoint

Add a performance test asserting results return within 200ms.
Use the existing test file as base.
EOF

copilot chat --agent gem-orchestrator "Continue plan 20250115-user-search-api with new-test.md"
```

---

## Common Patterns You'll Use

| Pattern | When | Example |
|---------|------|---------|
| **Fast path** | TRIVIAL/LOW, single file | Bug fixes, small refactors |
| **Full plan** | MEDIUM/HIGH, multi-file | New features, architecture changes |
| **Continue plan** | Add to existing work | Extend feature, fix follow-up |
| **Research only** | Exploration, no code | "How does auth work?" |
| **Challenge** | Decision review | "Should we use Redis or DB for cache?" |

---

## Next Steps

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="p-4 border rounded-lg">
    <h3>📚 Workflow Reference</h3>
    <p>Complete phase-by-phase documentation</p>
    <a href="/guide/workflow" class="text-primary">Read Workflow →</a>
  </div>
  <div class="p-4 border rounded-lg">
    <h3>🤖 Meet the Agents</h3>
    <p>Detailed capabilities of each specialist</p>
    <a href="/agents" class="text-primary">View Agents →</a>
  </div>
  <div class="p-4 border rounded-lg">
    <h3>⚙️ Configuration</h3>
    <p>Customize behavior for your project</p>
    <a href="/configuration" class="text-primary">Configure →</a>
  </div>
</div>

---

> **Key Takeaway**: Gem Team doesn't just "write code" — it follows an engineering process with planning, verification, and learning. The first run takes longer; subsequent runs on the same plan are faster due to cached context and promoted patterns.