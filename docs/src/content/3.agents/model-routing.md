---
title: Model Routing
description: Configurable two-tier model routing matching capability to task demands.
navigation:
  icon: i-lucide-cpu
---

## Configuration

```yaml
# .gem-team.yaml
model_routing:
  enabled: true
  tiers:
    premium: "gpt-5.6-sol (openai)"
    explore: "gpt-5.6-luna (openai)"
```

**Orchestrator not routed** — uses session default.

## Tier Assignments

| Tier | Agents | Purpose |
|------|--------|---------|
| **Premium** | Planner, Debugger, Reviewer | Reasoning: planning, diagnosis, challenge |
| **Explore** | Researcher, Implementer, Browser Tester, Mobile Tester, DevOps, Documentation, Skill Creator, Code Simplifier | Fast execution & exploration |

## Why Two Tiers?

| Factor | Premium | Explore |
|--------|---------|---------|
| Task type | Planning, debugging, reviewing | Implementing, researching, testing |
| Context | Large (full plans, codebases) | Bounded (scoped handoffs) |
| Reasoning | Multi-step, counterfactual | Single-pass, pattern-match |
| Cost tolerance | Higher (few calls) | Lower (many calls) |

## Provider Examples

| Provider | Premium | Explore |
|----------|---------|---------|
| OpenAI | `gpt-5.6-sol`, `o1-pro` | `gpt-5.6-luna`, `gpt-4o-mini` |
| Anthropic | `claude-4`, `claude-3.5-sonnet` | `claude-3.5-haiku` |
| Google | `gemini-2.5-pro` | `gemini-2.5-flash` |

## Definition

[`.apm/agents/gem-orchestrator.agent.md`](/.apm/agents/gem-orchestrator.agent.md) (applies routing)

## Related

- [Configuration](/configuration/model-routing)
- [Orchestrator](/agents/orchestrator)
- [Optimizations](/guide/optimizations)