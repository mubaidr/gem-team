<p align="center">
  <img src="https://img.shields.io/badge/Multi--Agent-Orchestration-blueviolet?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOGwtOSA5eiIvPjwvc3ZnPg==" alt="Multi-Agent Orchestration"/>
  <img src="https://img.shields.io/badge/DAG--Based-Planning-success?style=for-the-badge" alt="DAG-Based Planning"/>
  <img src="https://img.shields.io/badge/Parallel-Execution-orange?style=for-the-badge" alt="Parallel Execution"/>
  <img src="https://img.shields.io/badge/TDD-Verified-blue?style=for-the-badge" alt="TDD Verified"/>
</p>

# 💎 Gem Team: Multi-Agent Orchestration Framework

> Transform complex projects into coordinated, verified, production-ready deliverables — with intelligent agents that research, plan, implement, test, and document autonomously.

A modular, high-performance multi-agent team designed for complex project execution, feature implementation, and automated verification.

---

## ⚡ Why Gem Team?

### The Problem with Single-Agent AI

Traditional AI coding assistants hit walls when projects get complex:

- Context overload — One agent trying to hold everything leads to mistakes
- No specialization — Jack of all trades, master of none
- Sequential bottlenecks — Tasks execute one-by-one, wasting time
- Missing verification — Changes ship without proper testing
- No audit trail — What changed? Why? Who knows...

### The Gem Team Solution

| Challenge                     | Gem Team Approach                                                                                         |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------- |
| 🧠 Context Overload       | Specialized agents with focused expertise — each holds only what it needs                                 |
| 🎯 Lack of Specialization | 8 expert agents: researcher, planner, implementer, tester, reviewer, devops, and documentation specialist |
| 🐢 Sequential Bottlenecks | DAG-based parallel execution — up to 4 agents work simultaneously                                         |
| ❌ Missing Verification   | Verification-first: no task completes without passing its verification command                            |
| 📜 No Audit Trail         | Persistent `plan.yaml` state file tracks every decision, status, and outcome                              |

### Key Benefits

- 🚀 10x Faster Execution — Parallel agent execution eliminates bottlenecks
- 🎯 Higher Quality Output — Specialized agents + mandatory verification = fewer bugs
- 🔒 Built-in Security — Dedicated reviewer agent applies OWASP scanning on critical tasks
- 📊 Full Visibility — Real-time plan status, clear approval gates, comprehensive summaries
- 🔄 Resilient Workflows — Pre-mortem analysis, failure handling, and automatic replanning

---

## 🚀 Overview

Gem Team follows a Strategic Planner/Dynamic Orchestrator pattern. It decomposes high-level user goals into a Directed Acyclic Graph (DAG) of tasks, executes them in parallel across specialized agents, and maintains a rigorous state-controlled workflow.

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER GOAL                               │
└──────────────────────────────┬──────────────────────────────────┘
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                      🎭 ORCHESTRATOR                             │
│  • Coordinates workflow    • Delegates via runSubagent          │
│  • Maintains plan.yaml     • Synthesizes results                │
└──────────────────────────────┬───────────────────────────────────┘
                               ▼
        ┌──────────────────────┴──────────────────────┐
        ▼                                             ▼
┌───────────────────┐                     ┌────────────────────────┐
│  🔍 RESEARCHER    │ ──────────────────▶ │    📋 PLANNER          │
│  Context Mapping  │     findings        │  DAG Task Decomposition│
└───────────────────┘                     └────────────┬───────────┘
                                                       ▼
                                          ┌────────────────────────┐
                                          │  📄 plan.yaml          │
                                          │  (Task DAG + State)    │
                                          └────────────┬───────────┘
                                                       ▼
        ┌────────────────────┬─────────────────────────┼─────────────────────────┬────────────────────┐
        ▼                    ▼                         ▼                         ▼                    ▼
┌──────────────┐    ┌──────────────┐         ┌──────────────┐         ┌──────────────┐      ┌──────────────┐
│ 💻 IMPLEMENTER│    │ 🌐 CHROME    │         │ ⚙️ DEVOPS    │         │ 🛡️ REVIEWER  │      │ 📝 DOC WRITER │
│ TDD Execution │    │ TESTER       │         │ CI/CD + Infra│         │ Security Gate│      │  Technical    │
└──────────────┘    └──────────────┘         └──────────────┘         └──────────────┘      └──────────────┘
```

---

## 🤖 Agent Roles

| Agent                      | Specialty      | Primary Responsibility                                                                        |
| :------------------------- | :------------- | :-------------------------------------------------------------------------------------------- |
| `gem-orchestrator`         | Coordination   | Coordinates multi-agent workflows, delegates tasks, synthesizes results via `runSubagent`     |
| `gem-researcher`           | Research       | Gathers codebase context, identifies relevant files/patterns, returns structured findings     |
| `gem-planner`              | Strategy       | Creates DAG-based plans with pre-mortem analysis, presents for approval, iterates on feedback |
| `gem-implementer`          | Execution      | Executes TDD code changes, ensures verification, maintains quality                            |
| `gem-browser-tester`        | Testing        | Automates browser testing, UI/UX validation via Chrome DevTools                               |
| `gem-devops`               | Infrastructure | Manages containers, CI/CD pipelines, and infrastructure deployment                            |
| `gem-reviewer`             | Quality        | Security gatekeeper — OWASP scanning, secrets detection, compliance                           |
| `gem-documentation-writer` | Knowledge      | Generates technical docs, diagrams, maintains code-documentation parity                       |

---

## 🔄 Core Workflow

```mermaid
flowchart TD
    A[🎯 User Goal] --> B[🎭 Orchestrator]
    B --> C[🔍 Researcher]
    D -->|Feedback| C
    D -->|Approved| E[📋 Planner]
    E --> F[📄 plan.yaml]
    F --> G{⏸️ Plan Approval}
    G -->|Feedback| F
    G -->|Approved| H[🚀 Parallel Execution]
    H --> I[💻 Implementer]
    H --> J[🌐 Chrome Tester]
    H --> K[⚙️ DevOps]
    H --> L[🛡️ Reviewer]
    H --> M[📝 Doc Writer]
    I & J & K & L & M --> N[🔄 Synthesize Results]
    N --> O{All Tasks Done?}
    O -->|No| H
    O -->|Yes| P[📊 Walkthrough Summary]
```

### Workflow Stages

1. Inception — Orchestrator receives goal → delegates to multiple Researchers (by focus area)
2. Planning — Planner synthesizes findings, creates 3-7 atomic tasks with dependencies, runs pre-mortem analysis, saves `plan.yaml`
3. Plan Approval — Planner presents plan via `plan_review` → MANDATORY PAUSE → iterates on feedback until approved
4. Delegation — Orchestrator identifies "ready" tasks (dependencies met) → launches up to 4 agents in parallel via `runSubagent`
5. Execution — Workers execute changes and run verification commands before returning results
6. Synthesis — Orchestrator processes handoffs, updates `plan.yaml`, routes failures for revision/retry
7. Loop — Repeat delegation/synthesis until all tasks complete. Triggers replanning if stuck.
8. Delivery — Final comprehensive walkthrough file created and presented

---

## 🛠 Key Features

### 🎯 VS Code Copilot Steer Support

Send a steer message to `gem-orchestrator` and it automatically redirects to the appropriate agent — researcher for new context, planner for plan updates — integrating your request into the active workflow.

### 🔍 Focus-Based Context Gathering

The Orchestrator identifies key domains or features and launches multiple Researcher agents in parallel, each targeting a specific `focus_area`. This ensures deep, specific context is gathered for every part of the system before the Planner synthesizes it all into a unified `plan.yaml`.

### ⚡ Parallel Execution Engine

Up to 4 concurrent agents execute independent tasks simultaneously, dramatically reducing total execution time while maintaining resource stability.

### 🧪 Verification-First (TDD)

No task completes without passing its defined `verification` command. Implementers follow strict TDD discipline:

- Write tests FIRST
- Confirm tests FAIL
- Write MINIMAL code to pass
- Check `get_errors` after every edit

### 🛡️ Security-First Review

The Reviewer agent acts as a security gatekeeper for critical tasks:

- OWASP Top 10 scanning
- Secrets/PII detection
- Compliance verification
- Tiered review depth (Full → Standard → Lightweight)

### 📊 Pre-Mortem Analysis

For complex plans, the Planner runs pre-mortem analysis — identifying potential failure modes, their likelihood, impact, and mitigation strategies BEFORE execution begins.

### 📝 Plan Continuity & Audit Trail

State persists in `docs/plan/{plan_id}/plan.yaml`, providing:

- Recovery from interruptions
- Complex retry handling
- Clear audit trail of project evolution
- Full traceability of decisions

### 🧠 Cross-Agent Memory

Agents share knowledge via a memory system with citations:

- Researcher reads memories to understand project context before exploration
- Planner stores architectural decisions, design patterns, tech stack choices
- Orchestrator stores project-level decisions, product vision, norms
- Just-in-time verification: Citations (file:line) are checked before using memories

### 🔒 Agent Hierarchy

```text
User → Orchestrator → Subagents (via runSubagent)
```

- Orchestrator: `disable-model-invocation: true` — delegates only, never executes
- Subagents: `disable-model-invocation: false` — execute tasks via tools
- Isolation: Subagents cannot call other subagents — all collaboration mediated by Orchestrator

---

## 📁 Project Structure

```
gem-team/
├── gem-orchestrator.agent.md      # Coordination hub
├── gem-researcher.agent.md        # Context gathering
├── gem-planner.agent.md           # DAG-based planning
├── gem-implementer.agent.md       # TDD code execution
├── gem-browser-tester.agent.md     # Browser automation
├── gem-devops.agent.md            # Infrastructure & CI/CD
├── gem-reviewer.agent.md          # Security gatekeeper
├── gem-documentation-writer.agent.md  # Technical docs
├── docs/
│   └── plan/{plan_id}/
│       ├── research_findings_*.yaml   # Research output
│       └── plan.yaml              # Task DAG state
└── README.md
```

---

## 🎯 Use Cases

| Scenario                         | How Gem Team Helps                                                              |
| :------------------------------- | :------------------------------------------------------------------------------ |
| Large Feature Implementation | Decomposes into parallel subtasks, implements with TDD, verifies each component |
| Codebase Refactoring         | Researches patterns, plans migration, executes incrementally with tests         |
| Security Audit               | Reviewer scans for OWASP issues, secrets, compliance gaps                       |
| Documentation Overhaul       | Doc Writer generates accurate docs maintaining code-documentation parity        |
| CI/CD Pipeline Setup         | DevOps agent creates containers, pipelines, deploys with health checks          |
| UI/UX Testing                | Chrome Tester automates validation matrix, captures visual evidence             |

---

## 📄 License

This project is licensed under the Apache License 2.0 — see the [LICENSE](LICENSE) file for details.

---

Built for Gem Team — Precision. Parallelism. Progress.

*Transform complexity into coordinated execution.*
