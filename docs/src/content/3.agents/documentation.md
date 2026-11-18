---
title: Documentation
description: Technical docs — READMEs, API docs, architecture diagrams, walkthroughs, PRD updates.
navigation:
  icon: i-lucide-book-open
---

## Role

Creates technical documentation. No buzzwords, no fabricated stats, runnable examples, diagrams as code.

## Types

| Type | Format | Tools |
|------|--------|-------|
| API Docs | OpenAPI 3.0, GraphQL SDL | Code annotations, schema gen |
| Architecture | Mermaid, ADRs | Mermaid.js, Markdown |
| Guides | Markdown/MDC | Nuxt Content, Vue |
| READMEs | Markdown | Standard format |
| PRDs | YAML/Markdown | Structured requirements |

## Input

```yaml
objective: "Document user search API"
acceptance_criteria:
  - "OpenAPI spec for GET /api/users/search"
  - "Architecture diagram"
  - "Frontend integration guide"
handoff:
  constraints: ["Follow style guide", "Use Mermaid", "Include examples"]
  relevant_context: ["api_contract=...", "patterns=REST"]
```

## Output

```yaml
status: "completed"
handoff:
  created_files: ["docs/api/users/search.md", "docs/architecture/search-flow.md"]
  updated_files: ["CHANGELOG.md"]
  diagrams: ["search-flow.mmd"]
  api_spec: "openapi.yaml"
```

## Standards

- No buzzwords ("seamless", "robust", "leverage" banned)
- No fabricated stats — only real measurements
- Action-first — lead with what to do
- Runnable examples — copy-paste and execute
- Diagrams as code — Mermaid source in repo
- Versioned with implementation — same PR

## Definition

[`.apm/agents/gem-documentation-writer.agent.md`](/.apm/agents/gem-documentation-writer.agent.md)

## Related

- [Workflow: Execute](/guide/workflow-execute)
- [Resources: Local Development](/resources/local-development)