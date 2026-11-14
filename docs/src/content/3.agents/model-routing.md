---
title: Model Routing
description: Configurable two-tier model routing matching model capability to task demands.
navigation:
  icon: i-lucide-cpu
---

## Two-Tier Model Routing

The Orchestrator supports configurable model tiers through `model_routing` in `.gem-team.yaml`. When enabled, each delegated agent receives a model matched to its task demands.

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

**Orchestrator not routed** — uses session default model.

---

## Tier Assignments

| Tier | Agents | Purpose | Recommended Models |
|------|--------|---------|-------------------|
| **Premium** | Planner, Debugger, Reviewer | Reasoning-heavy: planning, diagnosis, challenge, verification | `gpt-5.6-sol`, `claude-4`, `gemini-2.5-pro`, `o1-pro` |
| **Explore** | Researcher, Implementer, Browser Tester, Mobile Tester, DevOps, Documentation, Skill Creator, Code Simplifier | Fast exploration & bounded execution | `gpt-5.6-luna`, `claude-3.5-haiku`, `gemini-2.5-flash`, `gpt-4o-mini` |

---

## Why Two Tiers?

| Factor | Premium (Reasoning) | Explore (Speed) |
|--------|---------------------|-----------------|
| **Task type** | Planning, debugging, reviewing | Implementing, researching, testing |
| **Context size** | Large (full plans, codebases) | Bounded (scoped handoffs) |
| **Reasoning depth** | Multi-step, counterfactual | Single-pass, pattern-match |
| **Cost tolerance** | Higher (few calls) | Lower (many calls) |
| **Latency tolerance** | Higher | Lower |

---

## Model Selection Guidelines

### Premium Tier (Planner, Debugger, Reviewer)

**Planner**: Needs to understand full context, create coherent wave plans, validate dependencies, apply YAGNI/KISS across boundaries.

**Debugger**: Needs to trace through code, form hypotheses, bisect regressions, reason about root causes from limited evidence.

**Reviewer**: Needs to evaluate assumptions, find counterexamples, assess risks, check contracts across boundaries.

### Explore Tier (Researcher, Implementer, Testers, DevOps, Docs, Skill Creator, Code Simplifier)

**Researcher**: Pattern matching, code search, bounded exploration — speed matters more than deep reasoning.

**Implementer**: TDD implementation follows patterns — fast, focused edits with clear constraints.

**Testers**: Scripted test execution — deterministic, repeatable.

**DevOps**: Infrastructure as code — pattern-based, template-driven.

**Documentation**: Structured generation from artifacts — template-following.

**Skill Creator**: Pattern extraction — recognition and packaging.

**Code Simplifier**: Mechanical refactoring — pattern-based transformations.

---

## Provider Examples

| Provider | Premium | Explore |
|----------|---------|---------|
| **OpenAI** | `gpt-5.6-sol`, `o1-pro` | `gpt-5.6-luna`, `gpt-4o-mini` |
| **Anthropic** | `claude-4`, `claude-3.5-sonnet` | `claude-3.5-haiku` |
| **Google** | `gemini-2.5-pro` | `gemini-2.5-flash` |
| **OpenRouter** | `openrouter/auto` (premium) | `openrouter/auto` (explore) |

**Swap with equivalent models** from your provider — tier semantics matter, not specific model names.

---

## Cost Impact

| Scenario | Without Routing | With Routing |
|----------|-----------------|--------------|
| MEDIUM feature (5 tasks) | 5 × premium model | 1 × premium (Planner) + 4 × explore |
| HIGH feature (8 tasks + review) | 9 × premium | 3 × premium + 6 × explore |
| Bug fix (Debugger + Implementer) | 2 × premium | 1 × premium + 1 × explore |

**Typical savings**: 40-60% token cost reduction for multi-agent workflows.

---

## Enabling Model Routing

```bash
# 1. Add to .gem-team.yaml
cat >> .gem-team.yaml << 'EOF'
model_routing:
  enabled: true
  tiers:
    premium: "claude-4 (anthropic)"
    explore: "claude-3.5-haiku (anthropic)"
EOF

# 2. Verify models available in your environment
# 3. Run a test task to confirm routing works
```

---

## Key Rules

1. **Orchestrator not routed** — Uses session default
2. **Tier semantics fixed** — Premium=reasoning, Explore=execution
3. **Provider-agnostic** — Swap equivalent models freely
4. **Optional feature** — Disabled by default (`enabled: false`)
5. **Cost optimization** — Primary benefit is token cost reduction

---

## Related Pages

- [Configuration](/configuration/model-routing) — Full config reference
- [Orchestrator](/agents/orchestrator) — Who applies routing
- [Agents Catalog](/agents) — Which agents get which tier
- [Optimizations](/guide/optimizations) — Cost principles