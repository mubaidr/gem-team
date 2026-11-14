---
title: Documentation
description: Technical documentation specialist — creates docs, READMEs, API docs, diagrams, walkthroughs, and PRD updates.
navigation:
  icon: i-lucide-book-open
---

## Role

The Documentation agent creates **technical documentation** — READMEs, API docs, architecture diagrams, walkthroughs, and PRD updates. No buzzwords, no fabricated statistics.

---

## When Delegated

- API documentation (OpenAPI, GraphQL schemas)
- Architecture documentation (diagrams, decisions)
- User guides and walkthroughs
- README creation/update
- PRD updates from implementation
- Changelog generation

---

## Documentation Types

| Type | Format | Tools |
|------|--------|-------|
| **API Docs** | OpenAPI 3.0, GraphQL SDL | Code annotations, schema generation |
| **Architecture** | Mermaid diagrams, ADRs | Mermaid.js, Markdown |
| **Guides** | Markdown/MDC | Nuxt Content, Vue components |
| **READMEs** | Markdown | Standard format |
| **PRDs** | YAML/Markdown | Structured requirements |

---

## Input Handoff

```yaml
task_definition:
  objective: "Document user search API"
  acceptance_criteria:
    - "OpenAPI spec for GET /api/users/search"
    - "Architecture diagram for search flow"
    - "Integration guide for frontend teams"
  handoff:
    constraints:
      - "Follow docs style guide in docs/STYLE.md"
      - "Use Mermaid for diagrams"
      - "Include request/response examples"
    relevant_context:
      - "implement-search: api_contract=wave-3/implement-search/artifacts/api-contract.json"
      - "research-api-patterns: patterns=REST, pagination=src/utils/pagination.ts"
```

---

## Output

```yaml
status: "completed"
failure_classification: null
handoff:
  created_files:
    - "docs/api/users/search.md"
    - "docs/architecture/search-flow.md"
    - "docs/guides/frontend-integration.md"
  updated_files:
    - "docs/api/README.md"
    - "CHANGELOG.md"
  diagrams:
    - "docs/architecture/search-flow.mmd"
  api_spec: "docs/api/openapi.yaml"
```

---

## Documentation Standards

| Standard | Rule |
|----------|------|
| **No buzzwords** | "Seamless", "robust", "leverage" — banned |
| **No fabricated stats** | Only real measurements from artifacts |
| **Action-first** | Lead with what to do, not explanation |
| **Code examples** | Runnable, copy-pasteable |
| **Diagrams as code** | Mermaid source committed |
| **Versioned with code** | Docs in same PR as implementation |

---

## Diagram Types (Mermaid)

```mermaid
%% Architecture flow
flowchart TD
    A[Client] --> B[API Gateway]
    B --> C[Search Service]
    C --> D[Database]
    C --> E[Cache]

%% Sequence
sequenceDiagram
    Client->>API: GET /search?q=term
    API->>Cache: Check cache
    alt Cache hit
        Cache-->>API: Return results
    else Cache miss
        API->>DB: Query
        DB-->>API: Results
        API->>Cache: Store
        API-->>Client: Return results
    end
```

---

## API Documentation Template

```markdown
# GET /api/users/search

Search users with filtering, pagination, and sorting.

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| q | string | No | Search query (name/email, case-insensitive) |
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Results per page (default: 20, max: 100) |
| sortBy | string | No | Sort field: createdAt, name, email |
| sortOrder | string | No | asc or desc (default: desc) |

## Response

```json
{
  "data": [
    { "id": "1", "name": "John Doe", "email": "john@example.com", "createdAt": "2025-01-15T10:30:00Z" }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }
}
```

## Errors

| Code | Condition |
|------|-----------|
| 400 | Invalid query parameters |
| 500 | Server error |

## Example

```bash
curl "https://api.example.com/api/users/search?q=john&page=1&limit=10"
```
```

---

## Key Rules

1. **No buzzwords** — Concrete, actionable language only
2. **No fabricated statistics** — Only real data from artifacts
3. **Examples runnable** — Copy-paste and execute
4. **Diagrams as code** — Mermaid source in repo
5. **Versioned with implementation** — Same PR, same commit
6. **Evidence by reference** — Source artifacts in task paths

---

## Related Pages

- [Workflow: Execute](/guide/workflow-execute) — Documentation in wave loop
- [Resources: Local Development](/resources/local-development) — Docs site development
- [First Steps](/getting-started/first-steps) — Documentation in walkthrough