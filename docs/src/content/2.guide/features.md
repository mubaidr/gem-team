---

title: Overview
description: Four pillars that make Gem Team an engineering-grade AI coding system.
navigation:
  icon: i-lucide-sparkles
seo:
  title: Features — Gem Team
  description: "Gem Team features: TDD by default, code review, security audits, cost-aware routing, resumable plans, model-agnostic."
  ogTitle: Features — Gem Team
  ogDescription: Gem Team features: TDD by default, code review, security audits, cost-aware routing.
---


## The Four Pillars

Gem Team is built on four foundational capabilities that transform AI coding from ad-hoc prompting into an engineering process.

```mermaid
flowchart LR
    A[Gem Team] --> B[Quality by Default]
    A --> C[Smart & Efficient]
    A --> D[Works With Your Tools]
    A --> E[Learns & Improves]
    
    style B fill:#e8f5e9
    style C fill:#e3f2fd
    style D fill:#fff3e0
    style E fill:#fce4ec
```

---

## Pillar Overview

| Pillar | Core Promise | Key Mechanisms |
|--------|--------------|----------------|
| **[Quality by Default](/guide/quality)** | TDD, reviews, and audits run automatically | Acceptance checks, risk-based review, security/a11y gates |
| **[Smart & Efficient](/guide/efficiency)** | Token cost proportional to new work | Scoped handoffs, cache optimization, model routing |
| **[Works With Your Tools](/guide/compatibility)** | One workflow, any AI coding tool | APM targets, universal agent definitions |
| **[Learns & Improves](/guide/learning)** | Patterns become reusable skills | Memory tiers, confidence gating, skill extraction |

---

## Quality by Default

**Core acceptance checks run automatically** — no configuration needed for basics. Specialist audits route by task requirements and changed-scope risk.

- **Library-first** — Prefer maintained libraries over custom implementations
- **Plan validation** — MEDIUM/HIGH plans validated for ordering, ownership, correctness, contracts
- **Risk-based review** — Standard, high, or critic review for high-risk signals or explicit requests
- **Security & compliance** — Review changed code, config, integrations; route security-sensitive work
- **Accessibility** — Configurable WCAG 2.2 AA checks (contrast, ARIA, focus, touch targets)
- **Visual regression** — Screenshot comparison against configurable threshold
- **Simplification** — Targeted design simplification, answer with action first

[Read Quality Details →](/guide/quality)

### Quality Scenario: Payment Endpoint (HIGH risk)

| Phase | Quality Action | Trigger |
|-------|---------------|---------|
| Plan | Risk signals: `security_sensitive`, `data_flow_change` → HIGH review | Phase 0 |
| Implement | TDD: success, decline, invalid card, webhook validation | Mandatory |
| Review | Critic mode: PCI compliance, idempotency, logging, error handling | Risk signal |
| Verify | Browser tester: payment flow E2E, visual regression on checkout | UI change |
| Output | Security findings promoted to repo memory (confidence ≥ 0.95) | Final success |

---

## Smart & Efficient

**Cost and performance are core design principles** — not afterthoughts.

- **Model routing** — Premium tier for planning/debugging/review; Explore tier for execution
- **Scoped handoffs** — Each agent receives only what it needs (~80% token reduction)
- **Cache optimization** — Stable prefixes, cache-lifetime field ordering, cluster-contiguous scheduling
- **Evidence by reference** — Logs, traces, screenshots in task artifacts; handoffs reference paths
- **Proportional architecture** — YAGNI/KISS: smallest agent set, wave sequence, validation path
- **Conditional learning** — Only stable, reusable findings promoted (confidence ≥ 0.95)

### Efficiency Scenario: Multi-endpoint API (5 endpoints)

| Approach | Tokens Sent | Approx Cost |
|----------|-------------|-------------|
| Direct chat (full history per task) | ~750K | ~$0.11 |
| Gem Team (scoped handoffs, 95% cached) | ~240K | ~$0.003 |

[Read Efficiency Details →](/guide/efficiency)

---

## Works With Your Tools

**One workflow, multiple AI coding tools** — install once, use everywhere.

| Target | Tool / Harness | Output Location |
|--------|----------------|-----------------|
| `copilot` | VS Code Copilot / GitHub Copilot CLI | `.github/agents/`, `.github/instructions/`, `.github/prompts/` |
| `claude` | Claude Code | `.claude/agents/`, `.claude/rules/`, commands, skills, hooks |
| `cursor` | Cursor | `.cursor/agents/`, `.cursor/rules/`, skills, commands, hooks |
| `opencode` | OpenCode | `.opencode/agents/`, commands, skills |
| `codex` | Codex CLI | `.codex/agents/`, `AGENTS.md`, Codex config |
| `gemini` | Gemini CLI | `GEMINI.md`, skills/instructions, config |
| `windsurf` | Windsurf / Cascade | `.windsurf/rules/`, skills, commands, hooks |

> APM compiles or skips unsupported primitives for each target.

[Read Compatibility Details →](/guide/compatibility)

### Multi-Tool Workflow Example

```bash
# Plan with Copilot (strong reasoning)
copilot chat --agent gem-orchestrator "Plan the user search feature"

# Implement with Cursor (fast editing)
# Cursor sees the same plan.yaml automatically

# Review with Claude Code (strong analysis)
claude
> /gem-reviewer Review plan 20261121-user-search-api

# All tools share: docs/plan/20261121-user-search-api/
```

---

## Learns & Improves

**Every successful task makes the next one faster** through structured learning.

- **Three-tier memory** — Repo (workspace), Session (conversation), Global (user)
- **Confidence gating** — Only findings ≥ 0.95 confidence promoted after success
- **Skill extraction** — Reusable workflows packaged as `SKILL.md` playbooks
- **Stable cache** — Structured handoffs maximize provider cache hit rates
- **Batch optimization** — Related work coalesced to share context

### Learning Scenario: Pagination Pattern

1. Task 1: Implement search endpoint → discovers pagination helper pattern
2. Task 2: Implement export endpoint → same pattern reused
3. Pattern confidence ≥ 0.95 → promoted to repo memory
4. Pattern packaged as `SKILL.md` by gem-skill-creator
5. Future tasks load pattern automatically via memory injection

[Read Learning Details →](/guide/learning)

---

## Quick Start by Pillar

| If You Want... | Start Here |
|----------------|------------|
| Automatic quality gates | [Quality →](/guide/quality) |
| Lower token costs | [Efficiency →](/guide/efficiency) |
| Use with your current tool | [Compatibility →](/guide/compatibility) |
| Build reusable knowledge | [Learning →](/guide/learning) |

---

## Related Pages

- [Core Concepts](/getting-started/concepts) — Mental model behind the pillars
- [Workflow](/guide/workflow) — How pillars execute in phases
- [Agents](/agents) — Specialists that deliver each pillar
- [Optimizations](/guide/optimizations) — Deep dive on efficiency principles