# Gem Team: Multi-Agent Orchestration Framework

A modular, high-performance multi-agent team designed for complex project execution, feature implementation, and automated verification.

## 🚀 Overview

Gem Team follows a **Strategic Planner/Dynamic Orchestrator** pattern. It decomposes high-level user goals into a Directed Acyclic Graph (DAG) of tasks, executes them in parallel across specialized agents, and maintains a rigorous state-controlled workflow.

## 🤖 Agent Roles

| Agent | Specialty | Primary Responsibility |
| :--- | :--- | :--- |
| **`gem-orchestrator`** | Coordination | Manages the team, delegates tasks, and synthesizes results. |
| **`gem-planner`** | Strategy | Research, Pre-Mortem analysis, and DAG-based `plan.yaml` creation. |
| **`gem-implementer`** | Execution | Atomic code changes, unit testing, and verification. |
| **`gem-chrome-tester`** | Testing | Browser-based UI/UX automation and accessibility audits. |
| **`gem-devops`** | Infrastructure | CI/CD pipelines, Dockerization, and cloud deployments. |
| **`gem-reviewer`** | Quality | Security audits, secrets detection, and deep code reviews. |
| **`gem-documentation-writer`** | Knowledge | API documentation, READMEs, and technical diagrams. |

## 🔄 Core Workflow

1. **Inception**: The Orchestrator receives a goal and invokes the **Planner**.
2. **Planning**: The Planner researches the codebase, simulates failure paths (Pre-Mortem), and generates a `plan.yaml` containing 3-7 atomic tasks with dependency mapping.
3. **Delegation**: The Orchestrator identifies "ready" tasks (all dependencies met) and launches them in parallel (max 4 concurrent agents).
4. **Dynamic Parallelization**: The Orchestrator applies an **Auto-Parallel Protocol** to split bulk tasks (like linting or refactoring) into granular sub-tasks to maximize throughput.
5. **Execution & Verification**: Workers (Implementer, DevOps, etc.) execute changes and run verification commands before handing back results.
6. **Synthesis**: The Orchestrator processes handoffs, updates the global state, and moves to the next batch of tasks.
7. **Delivery**: Results are presented via a structured `walkthrough_review`.

## 🛠 Key Features

### ⚡ Parallel Execution Engine

The system supports up to 4 concurrent agents. The Orchestrator uses a **Parallel Batch** protocol to ensure independent tasks are processed simultaneously.

### 🧠 Auto-Parallel Protocol

The Orchestrator can intelligently split "Parallel-Safe" tasks:

- **`lint_fix` / `format_code`**: Split by directory.
- **`typecheck_fix`**: Split by file.
- **`refactor`**: Split by module.
*Manual Override: Planners can set `parallel_force: false` to keep tasks monolithic.*

### 🛡 Verification-First

No task is considered complete without passing its defined `verification` command. Implementers are required to check `get_errors` after every edit to ensure zero regression.

### 📝 Plan Continuity

State is persisted in `docs/.tmp/{plan_id}/plan.yaml`. This allows the team to recover from interruptions, handle complex retries, and provide a clear audit trail of the project's evolution.

## 📁 Project Structure

- `gem-*.agent.md`: Detailed personas, protocols, and constraints for each agent.
- `plan.yaml`: The single source of truth for the current project state.
- `agent_analysis_report.md`: Deep dive into agent behaviors and system architecture.

---
*Built for Gem Team — Precision. Parallelism. Progress.*
