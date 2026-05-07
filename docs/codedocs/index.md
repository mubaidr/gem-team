---
title: "Getting Started"
description: "Learn what Gem Team is, why it exists, and how to get the orchestration harness running."
---

Gem Team is a manifest-driven multi-agent harness that turns a plugin host into a spec-first software delivery pipeline with built-in research, planning, implementation, testing, review, and documentation.

## The Problem

- One chat agent is easy to prompt but hard to control once the task becomes multi-step, cross-file, or risk-sensitive.
- Ad hoc implementation skips clarification, so teams start coding before requirements, acceptance criteria, and failure modes are explicit.
- Verification usually happens late, which means regressions, security issues, and missing docs show up after code is already merged.
- Useful learnings from one task are often lost instead of being promoted into reusable skills, memory, or conventions.

## The Solution

Gem Team packages a fixed team of agent specs under `.apm/agents/`, then registers that directory through `plugin.json`, `.claude-plugin/plugin.json`, `.cursor-plugin/plugin.json`, and `.github/plugin/plugin.json`. The public entry point is `gem-orchestrator`, which always routes work through `gem-researcher`, `gem-planner`, execution agents, and verification agents instead of letting one model improvise the whole workflow.

```text
User request
  -> gem-orchestrator
  -> gem-researcher (clarify or research)
  -> gem-planner (plan.yaml with waves and contracts)
  -> execution agents
  -> gem-reviewer / gem-critic / gem-debugger
  -> gem-documentation-writer
```

That structure gives Gem Team a stable operating model: plan IDs, wave-based execution, failure classification, documentation ownership, and learning persistence are all described directly in source, not implied by README marketing.

## Installation

" "bun"]}>
<Tab value="npm">
```bash
# Gem Team is not published as an npm registry package.
# Clone the repository, then install it into your tool as a plugin.
git clone https://github.com/mubaidr/gem-team.git
cd gem-team
```
</Tab>
<Tab value="pnpm">
```bash
# Gem Team is consumed as a plugin directory, not as a pnpm package.
git clone https://github.com/mubaidr/gem-team.git
cd gem-team
```
</Tab>
<Tab value="yarn">
```bash
# Gem Team is consumed from source.
git clone https://github.com/mubaidr/gem-team.git
cd gem-team
```
</Tab>
<Tab value="bun">
```bash
# Gem Team is consumed from source.
git clone https://github.com/mubaidr/gem-team.git
cd gem-team
```
</Tab>
</Tabs>

For actual runtime installation commands, use the tool-specific workflow in [Installation Guide](/docs/guides/installation). The README currently documents APM, GitHub Copilot, Claude Code, OpenCode, Cursor, and manual copy flows.

## Quick Start

The smallest meaningful Gem Team run is not a code snippet inside your app. It is a routed task that enters through `gem-orchestrator` and produces a plan summary.

```text
Objective:
Add request logging to the Express API without changing response bodies.
Write tests first, review security implications, and document the new config.
```

Expected output:

```text
Plan: 20260507-request-logging | Add request logging to the Express API
Progress: 0/4 tasks (0%)
Waves: Wave 1 (0/2)
Blocked: 0
Next: Wave 1 (2 tasks)
```

Internally that request triggers the exact sequence documented in `.apm/agents/gem-orchestrator.agent.md`: clarification, optional research, DAG planning, wave execution, summary, and optional final review.

## Key Features

- Cross-tool packaging through multiple plugin manifests that all point at the same `.apm/agents` directory.
- A strict orchestrator that delegates everything and marks itself `user-invocable: true` while disabling direct model work.
- Research and planning artifacts that persist as `research_findings_{focus_area}.yaml` and `plan.yaml`.
- Specialized implementation, testing, design, debugging, critique, review, refactoring, and documentation agents.
- Built-in failure handling with retry budgets, debugger handoff, and `failure_type` classification.
- Learning persistence through documentation-writer workflows for memory updates, skill extraction, and AGENTS.md proposals.

## Where To Go Next

<Cards>
  <Card title="Architecture" href="/docs/architecture">See how the manifests, agents, plans, and evidence artifacts fit together.</Card>
  <Card title="Core Concepts" href="/docs/orchestration-lifecycle">Start with the orchestrator lifecycle, then move into planning, waves, and learning.</Card>
  <Card title="API Reference" href="/docs/api-reference/orchestrator">Read the per-agent contracts, inputs, outputs, and usage examples.</Card>
</Cards>
