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

## 📦 Installation

Available in [awesome-copilot](https://github.github.com/awesome-copilot/) — the official GitHub repository for Copilot extensions.

---

## ⚡ Why Gem Team?

### The Problem with Single-Agent AI

Traditional AI coding assistants hit walls when projects get complex:

- Context overload — One agent trying to hold everything leads to mistakes
- No specialization — Jack of all trades, master of none
- Sequential bottlenecks — Tasks execute one-by-one, wasting time
- Missing verification — Changes ship without proper testing
- Intent misalignment — AI builds what's reasonable, not what's wanted
- No audit trail — What changed? Why? Who knows...

### The Gem Team Solution

| Challenge                     | Gem Team Approach                                                                                         |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------- |
| 🧠 Context Overload       | Specialized agents with focused expertise — each holds only what it needs                                 |
| 🎯 Lack of Specialization | 7 expert agents: researcher, planner, implementer, tester, reviewer, devops, and documentation specialist |
| 🐢 Sequential Bottlenecks | DAG-based parallel execution — up to 4 agents work simultaneously                                         |
| ❌ Missing Verification   | Verification-first: no task completes without passing its verification command                            |
| 🎯 Intent Misalignment    | Discuss phase captures intent; plan gate verifies alignment before execution                              |
| 📜 No Audit Trail         | Persistent `plan.yaml` state file tracks every decision, status, and outcome                              |

### Key Benefits

- 🚀 10x Faster Execution — Parallel agent execution eliminates bottlenecks
- 🎯 Higher Quality Output — Specialized agents + mandatory verification + plan gate = fewer bugs, less rework
- 🔒 Built-in Security — Dedicated reviewer agent applies OWASP scanning on critical tasks
- 📊 Full Visibility — Real-time plan status, clear approval gates, comprehensive summaries
- 🔄 Resilient Workflows — Pre-mortem analysis, failure handling, and automatic replanning
- 📋 Strict Communication Protocol — Standardized input/output formats for reliable delegation and handoffs
- 🎯 Autonomous Execution — Most agents work independently without user intervention (except approval gates)
- 🔧 Context-Efficient Operations — Smart file reading (semantic search, 200-line limits) and batch operations for speed
- 📄 PRD Support — Machine-readable Product Requirements Document with state machines, error codes, and decision tracking
- 🎯 Intent Capture — Discuss phase locks user intent before planning, reducing rework from "reasonable defaults"

---

## 🚀 Overview

Gem Team follows a **Delegation-First** pattern. The Orchestrator never executes—it only detects phase, routes to agents, and synthesizes results. All state operations are managed directly by the Orchestrator via `plan.yaml`.

```text
┌─────────────────────────────────────────────────────────┐
│                      USER GOAL                           │
└──────────────────────────┬──────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────┐
│                      ORCHESTRATOR                         │
│  • Phase Detection    • Route to agents (runSubagent)   │
│  • Synthesize results • Manage plan.yaml state           │
│  • Manage todos       • Never execute directly           │
└──────────────────────────┬───────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  DISCUSS PHASE  │ │  PRD CREATION   │ │  other agents  │
│  (medium|complex│ │  (source truth) │ │  (Phase 3)    │
│  Intent capture │ │  → docs/prd.yaml│ │  Execute tasks│
│  → AGENTS.md   │ └────────┬────────┘ └─────────────────┘
└─────────────────┘          │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  RESEARCHER     │ │    PLANNER      │ │   plan.yaml     │
│  (Phase 1)     │ │  (Phase 2)     │ │  (Task DAG     │
│  Focus areas   │ │  DAG + Pre-mort│ │   + State)     │
│  + PRD scope   │ │  validates PRD │ │                 │
└─────────────────┘ └────────┬────────┘ └─────────────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │    REVIEWER     │
                     │  (Plan Gate)   │
                     │  Verify plan   │
                     │  → Loop if fail│
                     └─────────────────┘
```

---

## 🤖 Agent Roles

| Agent | Role | Primary Responsibility |
| :------------------------- | :--- | :-------------------------------------------------------------------------------------------- |
| `gem-orchestrator` | ORCHESTRATOR | Team Lead - Coordinate workflow with energetic announcements. Detect phase → Route to agents → Synthesize results. Manage plan.yaml state and todos. Never execute. |
| `gem-researcher` | RESEARCHER | Explore codebase, identify patterns, map dependencies. Deliver structured findings in YAML. Never implement. |
| `gem-planner` | PLANNER | Design DAG-based plans, decompose tasks, identify failure modes. Create plan.yaml. Never implement. |
| `gem-implementer` | IMPLEMENTER | Write code using TDD. Follow plan specifications. Ensure tests pass. Never review. |
| `gem-browser-tester` | BROWSER TESTER | Run E2E scenarios in browser (Chrome DevTools MCP, Playwright, Agent Browser). Verify UI/UX, accessibility. Deliver test results. Never implement. |
| `gem-devops` | DEVOPS | Deploy infrastructure, manage CI/CD, configure containers. Ensure idempotency. Never implement. |
| `gem-reviewer` | REVIEWER | Scan for security issues, detect secrets, verify PRD compliance. Also reviews plans pre-execution (coverage, atomicity, deps). Deliver audit report. Never implement. |
| `gem-documentation-writer` | DOCUMENTATION WRITER | Write technical docs, generate diagrams, maintain code-documentation parity. Never implement. |

---

## 🔄 Core Workflow

The Orchestrator follows a **4-Phase** workflow:

### Phase Detection (Automatic)

| Current State | Next Phase |
| :------------ | :--------- |
| No plan exists | Discuss Phase (if medium\|complex) → PRD Creation → Phase 1: Research |
| Plan + user feedback | Phase 2: Planning |
| Plan + pending tasks | Phase 3: Execution Loop |
| All tasks complete/blocked | Phase 4: Summary |

### Discuss Phase (medium|complex only)

- Orchestrator identifies gray areas from objective (API formats, edge cases, data conventions, visual patterns)
- Asks 3-5 targeted questions in chat — one at a time
- Architectural decisions → saved to `AGENTS.md`
- Task-specific clarifications → fed directly to researcher and planner
- Skipped for simple tasks

### PRD Creation (before planning)

- Created from Discuss Phase answers — source of truth for research and planning
- Includes: user stories, IN SCOPE / OUT OF SCOPE, acceptance criteria, 🚨 NEEDS CLARIFICATION markers
- Researchers read PRD for scope context
- Planners validate against PRD — plan must satisfy all acceptance criteria

### Phase 1: Research

- Orchestrator detects complexity (simple/medium/complex)
- Identifies focus areas from user goal
- Passes task clarifications and PRD scope to researchers
- Delegates to gem-researcher (up to 4 concurrent) per focus area
- Output: `docs/plan/{plan_id}/research_findings_{focus_area}.yaml`

### Phase 2: Planning

- **Complex tasks**: Delegates to gem-planner 3x (variants a/b/c), selects best
- **Simple/Medium**: Delegates to gem-planner once
- Reads PRD for user stories, scope boundaries, acceptance criteria — these are the source of truth
- Validates against existing PRD and task clarifications
- **Plan Verification Gate**: Delegates to gem-reviewer (`review_scope=plan`) to verify coverage, atomicity, deps, PRD alignment
- If reviewer finds issues → loops to planner for fixes (max 2 iterations)
- Output: `docs/plan/{plan_id}/plan.yaml` with DAG tasks and waves

### Phase 3: Execution Loop

- Reads plan.yaml, gets pending tasks (dependencies=completed)
- Executes in waves (wave 1 first, wave 2 after wave 1 completes, etc.)
- Up to 4 agents work in parallel per wave
- Contracts presented for verification (wave > 1)
- Loops until all tasks done or blocked

### Phase 4: Summary

- Presents status, summary, next steps
- User feedback routes back to Phase 2: Planning

---

## 🛠 Key Features

### 🎯 VS Code Copilot Steer Support

Send a steer message to `gem-orchestrator` and it automatically redirects to the appropriate agent — researcher for new context, planner for plan updates — integrating your request into the active workflow.

### 🎯 Intent Capture (Discuss Phase)

Before planning on medium|complex tasks, the orchestrator asks 3-5 clarifying questions to lock in user intent. Architectural decisions persist in `AGENTS.md` for future tasks. Task-specific clarifications feed into PRD creation — which becomes the source of truth for research and planning.

### 🎯 Team Lead Personality

The Orchestrator acts as an energetic team lead — announces phase/wave starts, celebrates wins, acknowledges setbacks. Keeps the team motivated with concise, action-oriented updates.

### 🔍 Focus-Based Context Gathering

The Orchestrator identifies key domains or features and launches multiple Researcher agents in parallel, each targeting a specific `focus_area`. This ensures deep, specific context is gathered for every part of the system before the Planner synthesizes it all into a unified `plan.yaml`.

### 🧪 Verification-First (TDD)

No task completes without passing its defined `verification` command. Implementers follow strict TDD discipline:

- Write tests FIRST
- Confirm tests FAIL
- Write MINIMAL code to pass
- Check `get_errors` after every edit

### 🌐 Multi-Browser Testing

Browser Tester supports Chrome DevTools MCP, Playwright, and Agent Browser — run E2E tests across different browser tools for maximum coverage.

### 🛡️ Security-First Review

The Reviewer agent acts as a security gatekeeper for critical tasks:

- OWASP Top 10 scanning
- Secrets/PII detection
- Compliance verification
- Tiered review depth (Full → Standard → Lightweight)

### 📊 Pre-Mortem Analysis

Planner identifies failure modes (likelihood, impact, mitigation) for complex plans BEFORE execution.

### 📝 Plan Continuity & Audit Trail

State in `docs/plan/{plan_id}/plan.yaml` provides recovery, retry handling, and full decision traceability.

### 📋 Product Requirements Document (PRD)

Machine-readable spec at `docs/prd.yaml` — Created from Discuss Phase *before* planning as the source of truth. Contains user stories, IN SCOPE / OUT OF SCOPE, acceptance criteria, state machines, error codes, and decision log. Updated after plan completion with completed features and decisions.

### 🔒 Agent Hierarchy

```text
User → ORCHESTRATOR → WORKERS (execute)
```

- **Orchestrator**: `disable-model-invocation: true` — delegates ALL work, manages plan.yaml state and todos, never executes
- **Workers**: `disable-model-invocation: false` — execute tasks via tools
  - RESEARCHER, PLANNER, IMPLEMENTER, BROWSER TESTER, DEVOPS, REVIEWER, DOC WRITER
- Isolation: Workers cannot call other subagents — all collaboration mediated by Orchestrator

---

## 📁 Project Structure

```text
gem-team/
├── gem-*.agent.md               # Agent definitions (7 agents)
├── docs/
│   ├── prd.yaml                 # Product Requirements Document (project-level)
│   └── plan/{plan_id}/
│       ├── plan.yaml             # Task DAG + state
│       ├── research_findings_*.yaml    # Researcher output
│       ├── walkthrough-*.md      # Completion documentation
│       ├── evidence/{task_id}/   # Browser test failures
│       └── logs/                  # Failure logs
└── README.md
```

### Generated Artifacts by Agent

| Agent | Generates | Path |
| :--- | :--- | :--- |
| **gem-orchestrator** | PRD (initial) | `docs/prd.yaml` |
| **gem-planner** | plan.yaml | `docs/plan/{plan_id}/plan.yaml` |
| **gem-researcher** | findings YAML | `docs/plan/{plan_id}/research_findings_{focus}.yaml` |
| **gem-documentation-writer** | walkthrough, PRD (final) | `docs/plan/{plan_id}/walkthrough-*.md`, `docs/prd.yaml` |
| **gem-browser-tester** | evidence (on failure) | `docs/plan/{plan_id}/evidence/{task_id}/` |
| **All agents** | failure logs | `docs/plan/{plan_id}/logs/{agent}_{task_id}_{ts}.yaml` |

---

## 📋 Agent Protocol

### Input → Output

**Delegation (Input):**

```yaml
task_id, plan_id, plan_path, task_definition (agent-specific)
```

**Completion (Output):**

```json
{"status": "completed|failed|needs_revision", "task_id", "plan_id", "summary": "≤3 sentences", "extra": {}}
```

### Core Rules

- Output ONLY requested deliverable (code: code ONLY)
- Think-Before-Action via internal `<thought>` block
- Batch independent operations; context-efficient reads (≤200 lines)
- Agent-specific `verification` criteria from plan.yaml

### Verification by Agent

| Agent | Verification |
| :--- | :--- |
| Implementer | get_errors → typecheck → unit tests |
| Browser Tester | validation matrix → console → network → accessibility |
| Reviewer | OWASP scan → code quality → logic |
| DevOps | deployment → health checks → idempotency |
| Doc Writer | completeness → code parity → formatting |

### Autonomous Execution

- **Most agents**: Fully autonomous
- **DevOps**: Approval gates for production/security
- **Plan Verification Gate**: Reviewer validates plan (coverage, atomicity, deps, PRD alignment) before execution — loops to planner if issues found (max 2 iterations)
- **Orchestrator**: Delegates all via `runSubagent`

---


## 🎯 Use Cases

| Scenario                     | How Gem Team Helps                                                              |
| :--------------------------- | :------------------------------------------------------------------------------ |
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
