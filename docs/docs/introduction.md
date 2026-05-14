---
title: Introduction
description: Get started with Gem Team
---

Gem Team is a self-learning multi-agent orchestration harness designed for spec-driven development and automated verification.

## Quick Start

To get started with Gem Team:

1. Install APM (if not already installed)
2. Install the gem-team plugin
3. Configure your settings

## Core Concepts

### Memory System

Gem Team uses a triple learning system:

- **Memory**: Facts and user preferences (auto-saved)
- **Skills**: Procedures with code examples
- **Conventions**: Static rules (requires approval)

#### Per-Agent Memory

Every agent self-serves memory via the `memory` tool. Orchestrator never manages memory:

- **gem-researcher** — checks cache on entry, self-validates staleness, writes findings on exit
- **gem-debugger** — reads diagnosis history on entry, writes root-cause on exit
- **gem-planner** — batch-reads research cache + decisions + reviews before planning
- **gem-reviewer** — reads prior findings, writes new review results
- **gem-critic** — reads prior architecture decisions, writes edge case discoveries
- **gem-implementer** — reads pattern library, writes gotchas via `learnings.facts[]`
- **gem-devops** — reads/writes deployment config for rollback safety
- **gem-code-simplifier** — reads/writes pattern library (anti-patterns, outcomes)
- **gem-browser-tester / gem-mobile-tester** — reads/writes flaky test registry

See [Memory Contracts](/docs/agents#memory-contracts) for full spec.

### Wave-Based Execution

Tasks are executed in parallel waves, with up to 4 concurrent agents working together.

### TDD-First Approach

Test-driven development is enforced via the workflow, ensuring quality from the start.

## Next Steps

- Read about the [Agent Team](/docs/agents)
- Learn about the [Installation](/docs/installation) process
- Explore the [Contributing](/docs/contributing) guidelines
