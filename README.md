# Gem Team: Multi-Agent Orchestration Framework

A modular, high-performance multi-agent team designed for complex project execution, feature implementation, and automated verification.

---

## Quick Look

```mermaid
flowchart TB
    subgraph USER["👤 USER"]
        goal["User Goal"]
    end

    subgraph ORCH["💎 ORCHESTRATOR"]
        detect["Phase Detection"]
        route["Route to agents"]
        synthesize["Synthesize results"]
        state["Manage plan.yaml"]
        todos["Manage todos"]
        exec["Never execute"]
    end

    subgraph DISCUSS["💬 Discuss Phase"]
        dir1["medium|complex only"]
        intent["Intent capture"]
        arch["→ AGENTS.md"]
        clar["Clarifications"]
    end

    subgraph PRD["📋 PRD Creation"]
        prd["docs/PRD.yaml"]
        stories["User Stories"]
        scope["IN/OUT SCOPE"]
    end

    subgraph PHASE1["🔬 Phase 1: Research"]
        focus["Focus areas (≤4∥)"]
        res["gem-researcher"]
    end

    subgraph PHASE2["📐 Phase 2: Planning"]
        dag["DAG + Pre-mortem"]
        valid["Validates PRD"]
        multi["3 variants (complex)"]
    end

    subgraph REVIEW["🛡️ Reviewer - Plan Gate"]
        ver["Verify plan"]
        loop["→ Loop if fail"]
        scopes["plan | wave | task"]
    end

    subgraph EXEC["⚡ Phase 3: Execution"]
        waves["Wave-based (1→n)"]
        parallel["≤4 agents ∥"]
        contracts["Task contracts"]
        integ["Wave integration"]
    end

    subgraph SUMMARY["📊 Phase 4: Summary"]
        status["Status report"]
        next["Next steps"]
    end

    goal --> detect
    detect --> |"No plan (med|complex)"| DISCUSS
    detect --> |"Plan + feedback"| PHASE2
    detect --> |"Plan + pending"| EXEC
    detect --> |"All done"| SUMMARY

    DISCUSS --> |"Architectural"| arch
    DISCUSS --> |"Clarifications"| PRD

    PRD --> PHASE1
    PHASE1 --> PHASE2
    PHASE2 --> REVIEW
    REVIEW --> |"Approved"| EXEC
    REVIEW --> |"Issues"| PHASE2

    EXEC --> |"Complete"| SUMMARY
    EXEC --> |"Blocked"| SUMMARY
    SUMMARY --> |"Feedback"| PHASE2

    style ORCH fill:#9b59b6,color:#fff,stroke:#7d3c98,stroke-width:3px
    style USER fill:#27ae60,color:#fff,stroke:#1e8449,stroke-width:2px
    style REVIEW fill:#c0392b,color:#fff,stroke:#a93226,stroke-width:2px
    style EXEC fill:#2980b9,color:#fff,stroke:#1a5276,stroke-width:2px
    style DISCUSS fill:#8e44ad,color:#fff,stroke:#6c3483,stroke-width:2px
    style PRD fill:#16a085,color:#fff,stroke:#117a65,stroke-width:2px
    style PHASE1 fill:#d35400,color:#fff,stroke:#a04000,stroke-width:2px
    style PHASE2 fill:#c0392b,color:#fff,stroke:#a93226,stroke-width:2px
    style SUMMARY fill:#2c3e50,color:#fff,stroke:#1a252f,stroke-width:2px
```

---

## The Agent Team

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

## Key Differentiators

| Feature | What It Does |
|:--------|:-------------|
| 🧪 **Verification-First (TDD)** | Tests first → fail → minimal code → verify |
| 🛡️ **Security-First Review** | OWASP scanning, secrets/PII detection, tiered depth |
| 📊 **Pre-Mortem Analysis** | Failure modes identified BEFORE execution |
| 🎯 **Intent Capture** | Discuss phase locks user intent, architectural decisions persist |
| 🔐 **Approval Gates** | Security + deployment approval for sensitive ops |
| 🌐 **Multi-Browser Testing** | Chrome MCP, Playwright, Agent Browser support |
| 🧠 **Sequential Thinking** | Chain-of-thought for complex analysis (>50 files) |
| 📊 **Research Confidence** | High/medium/low confidence scoring for research reliability |

---

## Why Gem Team?

### Single-Agent Problems → Gem Team Solutions

| Problem | Solution |
|:--------|:--------|
| Context overload | Specialized agents with focused expertise |
| No specialization | 7 expert agents (researcher, planner, implementer, tester, reviewer, devops, docs) |
| Sequential bottlenecks | DAG-based parallel execution (≤4 agents simultaneously) |
| Missing verification | TDD + mandatory verification gates |
| Intent misalignment | Discuss phase captures intent before planning |
| No audit trail | Persistent `plan.yaml` and `PRD.yaml` tracks every decision & outcome |

### Why It Works

- 🚀 **10x Faster** — Parallel execution eliminates bottlenecks
- 🎯 **Higher Quality** — Specialized agents + verification = fewer bugs
- 🔒 **Built-in Security** — OWASP scanning on critical tasks
- 📊 **Full Visibility** — Real-time status, clear approval gates
- 🔄 **Resilient** — Pre-mortem analysis, failure handling, auto-replanning

---

## Core Workflow

The Orchestrator follows a 4-Phase workflow with phase detection at the start:

### Phase Detection

- User provides plan id OR plan path → Load plan → Execution Loop
- No plan → Discuss Phase (medium|complex) or Research (simple)
- Plan + user_feedback → Planning
- Plan + all tasks completed → Summary

### Discuss Phase (medium|complex only)

- Identifies gray areas → generates 2-4 context-aware options per question
- Asks 3-5 targeted questions → Architectural decisions → `AGENTS.md`
- Task clarifications → PRD creation

### PRD Creation

- Source of truth for research & planning
- Includes: user stories, IN/OUT SCOPE, acceptance criteria, NEEDS CLARIFICATION

### Phase 1: Research

- Detects complexity (simple/medium/complex)
- Delegates to gem-researcher (≤4 concurrent) per focus area
- Output: `docs/plan/{plan_id}/research_findings_{focus}.yaml`

### Phase 2: Planning

- Complex: 3 planner variants (a/b/c) → selects best
- Simple/Medium: 1 planner run
- Plan Verification Gate: gem-reviewer validates (coverage, atomicity, deps, PRD)
- Output: `docs/plan/{plan_id}/plan.yaml` (DAG + waves)

### Phase 3: Execution Loop

- Executes in waves (wave 1 first, wave 2 after, etc.)
- ≤4 agents parallel per wave
- Wave Integration Check: build/lint/typecheck/tests after each wave

### Phase 4: Summary

- Presents status, next steps
- User feedback → routes back to Planning

---

## Key Features

| Feature | Description |
|:--------|:------------|
| 🎯 **Copilot Steer** | Send steer to orchestrator → auto-routes to correct agent |
| 🎯 **Team Lead Personality** | Energetic announcements, phase/wave status, celebrates wins |
| 🔍 **Focus-Based Gathering** | Multiple researchers in parallel, each targeting specific `focus_area` |
| 📝 **Plan Continuity** | `docs/plan/{plan_id}/plan.yaml` provides recovery, retry, full audit trail |
| 📋 **PRD Support** | Machine-readable spec: user stories, scope, acceptance criteria, state machines |
| 🔒 **Agent Hierarchy** | Orchestrator (`disable-model-invocation: true`) → Workers (execute via tools) |
| 🔧 **Context-Efficient** | Semantic search, ≤200-line reads, batch operations |

### Review Scopes

| Scope | Purpose |
|:------|:--------|
| `plan` | Pre-execution validation (coverage, atomicity, deps, PRD alignment) |
| `wave` | Integration checks (build, lint, typecheck, tests) |
| `task` | Individual code review (OWASP, secrets, logic) |

---

### Generated Artifacts by Agent

| Agent | Generates | Path |
| :--- | :--- | :--- |
| gem-orchestrator | PRD (initial) | `docs/PRD.yaml` |
| gem-planner | plan.yaml | `docs/plan/{plan_id}/plan.yaml` |
| gem-researcher | findings YAML | `docs/plan/{plan_id}/research_findings_{focus}.yaml` |
| gem-documentation-writer | PRD (final) | `docs/PRD.yaml` |
| gem-browser-tester | evidence (on failure) | `docs/plan/{plan_id}/evidence/{task_id}/` |

---

## Agent Protocol

### Input → Output

Delegation (Input):

```yaml
task_id, plan_id, plan_path, task_definition (agent-specific)
```

Completion (Output):

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
| Reviewer (task) | OWASP scan → code quality → logic |
| Reviewer (wave) | build → lint → typecheck → tests |
| Reviewer (plan) | coverage → atomicity → deps → PRD alignment |
| DevOps | deployment → health checks → idempotency |
| Doc Writer | completeness → code parity → formatting |

---

## Installation

Available in [awesome-copilot](https://github.github.com/awesome-copilot/) — the official GitHub repository for Copilot extensions.

---

## License

This project is licensed under the Apache License 2.0 — see the [LICENSE](LICENSE) file for details.

---

Built for Gem Team — Precision. Parallelism. Progress.

*Transform complexity into coordinated execution.*
