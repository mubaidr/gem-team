---
title: Features
description: Gem Team features and capabilities
---

Gem Team is a self-learning multi-agent orchestration harness designed for spec-driven development and automated verification.

## Performance

- **4x Faster** — Parallel execution with wave-based execution
- **Pattern Reuse** — Codebase pattern discovery prevents reinventing wheels

## Quality & Security

- **Higher Quality** — Specialized harness agents + TDD + verification gates + contract-first
- **Built-in Security** — OWASP scanning, secrets/PII detection on critical tasks
- **Resilient** — Pre-mortem analysis, failure handling, auto-replanning
- **Accessibility-First** — WCAG compliance validated at spec and runtime layers
- **Safe DevOps** — Idempotent operations, health checks, mandatory approval gates
- **Constructive Critique** — gem-critic challenges assumptions, finds edge cases

## Intelligence

- **Established Patterns** — Uses library/harness conventions over custom implementations
- **Source Verified** — Every factual claim cites its source; no guesswork
- **Knowledge-Driven** — Prioritized sources (PRD → codebase → AGENTS.md → Context7 → docs)
- **Continuous Learning** — Memory tool persists patterns, gotchas, user preferences across sessions
- **Agent Memory Contracts** — Every agent reads/writes structured memory autonomously. Researcher caches findings, debugger logs diagnoses, planner aggregates prior knowledge, reviewers persist patterns. Orchestrator stays out — agents self-serve via `memory` tool
- **Self-Validating Cache** — Researcher checks `MEMORY://repo/research/` before searching. Validates via file existence, import resolution, git log. IF stale: re-research, DELETE old, WRITE new
- **Diagnosis History** — Debugger saves root-cause analyses. IF same bug pattern returns (>0.8 match): cached diagnosis returned instead of re-trace
- **Flaky Registry** — Browser/mobile testers record flaky tests. Future test runs skip known flaky patterns
- **Auto-Skills** — Agents extract reusable SKILL.md files from successful tasks (high confidence: auto, medium: confirm)
- **Skills & Guidelines** — Built-in skill & guidelines (web-design-guidelines)
- **Context7 Integration** — Real-time library documentation via Context7

## Process

- **Spec-Driven** — Multi-step refinement defines "what" before "how"
- **Verified-Plan** — Complex tasks: Plan → Verification → Critic
- **Traceable** — Self-documenting IDs link requirements → tasks → tests → evidence
- **Intent vs. Compliance** — Shifts the burden from writing "perfect prompts" to enforcing strict, YAML-based approval gates
- **Diagnose-then-Fix** — gem-debugger diagnoses → gem-implementer fixes → re-verifies
- **Pre-Mortem** — Failure modes identified BEFORE execution
- **Contract-First** — Contract tests written before implementation

## Token Efficiency

Optimized for reduced LLM token consumption without quality loss:

- **Concise Output** — No preamble, no meta commentary, no verbose explanations
- **Strict Formats** — JSON/YAML exactly matching schemas — eliminates parse errors and retries
- **Empty is OK** — Skip empty arrays, nulls, verbose fields where not needed
- **File-Based** — Researcher/Planner save to YAML files (not all in JSON output)
- **Learnings** — Empty patterns/conventions unless critical

> **Result:** ~40-60% reduction on output tokens while maintaining quality.

## Design

- **Design Agents** — Dedicated agents for web and mobile UI/UX with anti-"AI slop" guidelines for distinctive aesthetics
- **Mobile Agents** — Native mobile implementation (React Native, Flutter) + iOS/Android testing

## Triple Learning System

| Type            | Storage        | Description                          |
| :-------------- | :------------- | :----------------------------------- |
| **Memory**      | `/memories/`   | Facts & user preferences (auto-save) |
| **Skills**      | `docs/skills/` | Procedures with code examples        |
| **Conventions** | `AGENTS.md`    | Static rules (requires approval)     |

## Harness Architecture

```text
User Goal → Orchestrator → [Simple: Research/Plan] or [Complex: Discuss → PRD → Research → Plan → Approve] → Execute (waves) → Summary → Final Review
                ↓
            Diagnose → Fix → Re-verify
```

## Next Steps

- Read about the [Agent Team](/docs/agents)
- Learn about the [Installation](/docs/installation) process
- Explore the [Contributing](/docs/contributing) guidelines
