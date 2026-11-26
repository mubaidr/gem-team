---
title: Researcher
description: "Codebase exploration with five budgeted modes: scan, deep, audit, trace, question."
navigation:
  icon: i-lucide-search
seo:
  title: Researcher Agent - Gem Team
  description: "The gem-researcher explores codebases: patterns, relationships, architecture discovery across 5 modes."
  ogTitle: Researcher Agent - Gem Team
  ogDescription: The gem-researcher explores codebases across 5 modes.
---

## Role

Explores patterns, dependencies, architecture. Runs standalone or in wave plan under Planner budget. Produces evidence-based findings with confidence scores; never implements code.

## When to Delegate

| Scenario                                      | Delegate Researcher? | Why                                          |
| --------------------------------------------- | -------------------- | -------------------------------------------- |
| Codebase exploration (patterns, dependencies) | ✅                   | Budgeted modes, evidence-based findings      |
| Standalone research question                  | ✅                   | Direct answer with references                |
| Planning context discovery                    | ✅                   | Provides shared_context for downstream tasks |
| Architecture audit / compliance               | ✅                   | `audit` mode with evidence                   |
| Implementation work                           | ❌                   | Out of scope; use Implementer                |

## Exploration Modes

| Mode       | Purpose               | Budget   | Output                        |
| ---------- | --------------------- | -------- | ----------------------------- |
| `scan`     | Pattern discovery     | 1-2 min  | Key files, conventions        |
| `deep`     | Architecture analysis | 5-10 min | Dependency graphs, data flows |
| `audit`    | Compliance/security   | 5-10 min | Findings with evidence        |
| `trace`    | Follow call chain     | Variable | Step-by-step path             |
| `question` | Specific technical Q  | 1-3 min  | Direct answer + refs          |

## Input

```yaml
# Standalone
exploration_mode: "deep"
research_question: "How does caching layer work?"
expected_deliverable: "Diagram + interfaces + invalidation strategy"

# In wave
exploration_mode: "scan"
acceptance_criteria: ["Document REST patterns", "Find pagination helper"]
```

## Output

- Standalone: `next_action`, `findings` (finding, confidence, evidence), `stable_findings` (≥0.95)
- In wave: `handoff` with `shared_context`, `patterns`, `files`

## Key Rules

- Budgeted modes with explicit limits
- Evidence-based findings with source refs
- Confidence 0.0-1.0, only ≥0.95 promoted after success
- No implementation
- Shared context inlined once for ≥2 tasks

## Definition

[`.apm/agents/gem-researcher.agent.md`](/.apm/agents/gem-researcher.agent.md)

## Related

- [Workflow: Plan](/guide/plan)
- [Workflow: Execute](/guide/workflow-execute)
- [Core Concepts](/getting-started/concepts)
