---
title: Skill Creator
description: Packages high-confidence patterns into reusable SKILL.md playbooks with scripts, references, and assets.
navigation:
  icon: i-lucide-package
---

## Role

The Skill Creator extracts **high-confidence patterns** from successful workflows and packages them as reusable `SKILL.md` playbooks with scripts, references, and assets.

---

## When Delegated

- After successful task completion with reusable pattern (confidence ≥ 0.95)
- Pattern used in ≥2 successful tasks
- Explicit skill extraction request
- Orchestrator identifies reusable workflow pattern

---

## Skill Criteria

| Criterion | Requirement |
|-----------|-------------|
| **Usage count** | ≥ 2 successful tasks |
| **Confidence** | ≥ 0.95 |
| **Self-contained** | Not task-specific, includes validation |
| **Progressive disclosure** | Core in SKILL.md, extras in references/ |
| **No secrets** | No private task data or one-off workarounds |

---

## Input Handoff

```yaml
task_definition:
  objective: "Extract API pagination pattern as skill"
  acceptance_criteria:
    - "SKILL.md with pagination implementation guide"
    - "Script to generate pagination boilerplate"
    - "Reference to pagination RFC"
  handoff:
    constraints:
      - "Based on implement-search + 2 other tasks"
      - "Confidence: 0.98 (repo memory)"
    relevant_context:
      - "repo_memory: pagination_helper_reusable=true"
      - "implement-search: files=src/utils/pagination.ts, src/api/users/search.ts"
      - "implement-products: files=src/api/products/list.ts"
      - "implement-orders: files=src/api/orders/history.ts"
```

---

## Output

```yaml
status: "completed"
failure_classification: null
handoff:
  skill_created: "api-pagination"
  skill_path: ".apm/skills/api-pagination/"
  files:
    - "SKILL.md"
    - "scripts/generate-pagination.ts"
    - "references/pagination-rfc.md"
    - "assets/pagination-flow.svg"
```

---

## Skill Structure

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

### SKILL.md Template

```markdown
---
name: api-pagination
description: Implement consistent cursor/offset pagination for REST APIs with TypeScript/Prisma
activation_scope: "API endpoint implementation with list/search endpoints"
---

## When to Use

- New list/search endpoints returning collections
- Existing endpoints needing pagination standardization
- Migration from offset-only to cursor+offset

## Prerequisites

- Prisma ORM (or adaptable to other ORMs)
- Zod for query validation
- Express/Fastify-compatible request/response

## Implementation

### 1. Query Validation (Zod)

```typescript
const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  cursor: z.string().optional(),
  sortBy: z.enum(['createdAt', 'name', 'email']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})
```

### 2. Database Query (Prisma)

```typescript
async function paginate<T>(model: PrismaModel, args: PaginationArgs) {
  const { page, limit, cursor, sortBy, sortOrder } = args
  
  const where = cursor ? { id: { gt: cursor } } : {}
  const orderBy = { [sortBy]: sortOrder }
  
  const [data, total] = await Promise.all([
    model.findMany({ where, orderBy, take: limit + 1, cursor: cursor ? { id: cursor } : undefined }),
    model.count({ where })
  ])
  
  const hasNext = data.length > limit
  const items = hasNext ? data.slice(0, -1) : data
  const nextCursor = hasNext ? items[items.length - 1].id : null
  
  return { data: items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit), nextCursor } }
}
```

### 3. Response Format

```typescript
interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    nextCursor?: string | null
  }
}
```

## Validation

- [ ] Tests cover: first page, middle page, last page, empty results, cursor pagination
- [ ] Performance: < 50ms for 100 items on indexed column
- [ ] Edge cases: invalid cursor, limit > max, sortBy not in index

## References

- [Pagination RFC](https://github.com/mubaidr/gem-team/blob/main/.apm/skills/api-pagination/references/pagination-rfc.md)
- [Prisma Pagination Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

## Assets

- [Flow Diagram](./assets/pagination-flow.svg)
```

---

## Key Rules

1. **Confidence ≥ 0.95** — Only high-certainty patterns
2. **Used ≥ 2 times** — Proven reuse, not speculative
3. **Self-contained SKILL.md** — Core guidance in main file
4. **Progressive disclosure** — Extras in references/, scripts/, assets/
5. **No secrets/task data** — Generalized, reusable guidance
6. **Validation included** — Checklist for skill consumers

---

## Related Pages

- [Features: Learning](/guide/learning) — Skill extraction in learning pillar
- [Workflow: Output](/guide/workflow-output) — Where skills are created
- [Packaged Skills](/agents/skills) — Skills catalog
- [Local Development](/resources/local-development) — Skill development