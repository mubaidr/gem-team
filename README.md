# Gem Team: Multi-Agent Orchestration Framework

A modular, high-performance multi-agent team designed for complex project execution, feature implementation, and automated verification.

## 🚀 Overview

Gem Team follows a Strategic Planner/Dynamic Orchestrator pattern. It decomposes high-level user goals into a Directed Acyclic Graph (DAG) of tasks, executes them in parallel across specialized agents, and maintains a rigorous state-controlled workflow.

## 🤖 Agent Roles

| Agent | Specialty | Primary Responsibility |
| :--- | :--- | :--- |
| `gem-orchestrator` | Coordination | Coordinates multi-agent workflows, delegates tasks, synthesizes results via runSubagent |
| `gem-researcher` | Research | Gathers codebase context, identifies relevant files/patterns, returns structured findings |
| `gem-planner` | Strategy | Creates DAG-based plans with pre-mortem analysis and task decomposition from research findings |
| `gem-implementer` | Execution | Executes TDD code changes, ensures verification, maintains quality |
| `gem-chrome-tester` | Testing | Automates browser testing, UI/UX validation via Chrome DevTools |
| `gem-devops` | Infrastructure | Manages containers, CI/CD pipelines, and infrastructure deployment |
| `gem-reviewer` | Quality | Security gatekeeper for critical tasks—OWASP, secrets, compliance |
| `gem-documentation-writer` | Knowledge | Generates technical docs, diagrams, maintains code-documentation parity |

## 🔄 Core Workflow

1. Inception: The Orchestrator receives a goal and invokes the Researcher for context gathering, then the Planner creates the plan.
2. Planning: The Planner synthesizes research findings, designs the task DAG, simulates failure paths (Pre-Mortem), and generates a `plan.yaml` containing 3-7 atomic tasks with dependency mapping.
3. Plan Approval: Orchestrator presents plan via `plan_review` and waits for user confirmation (MANDATORY PAUSE).
4. Delegation: The Orchestrator identifies "ready" tasks (all dependencies met) and launches agents in parallel via `runSubagent` (max 4 concurrent agents).
5. Execution & Verification: Workers (Implementer, DevOps, etc.) execute changes and run verification commands before handing back results.
6. Synthesis: The Orchestrator processes handoffs, updates `plan.yaml`, triggers review when needed, and routes tasks for revision or retry.
7. Batch Confirmation: Orchestrator presents batch summary via `walkthrough_review` and waits for user confirmation (MANDATORY PAUSE).
8. Loop: Repeat steps 4-7 until all tasks complete. If stuck, orchestrator may trigger fresh research and replanning.
9. Delivery: Results are presented via a comprehensive `walkthrough_review` summary.

## 🛠 Key Features

### 🔍 Separation of Research & Planning

The Researcher agent autonomously gathers codebase context, identifying relevant files, patterns, and dependencies before the Planner creates the task DAG. This ensures planning is based on comprehensive, accurate context while keeping the Planner focused on architecture and decomposition.

### ⚡ Parallel Execution Engine

The system supports parallel execution with a maximum of 4 concurrent agents to ensure resource stability and manageable context.

### 🛡 Verification-First

No task is considered complete without passing its defined `verification` command. Implementers are required to check `get_errors` after every edit to ensure zero regression.

### 📝 Plan Continuity

State is persisted in `docs/plan/{PLAN_ID}/plan.yaml`. This allows the team to recover from interruptions, handle complex retries, and provide a clear audit trail of the project's evolution.

### 🔒 Agent Hierarchy

```text
User → Orchestrator → Subagents (via runSubagent)
```

- Orchestrator: `disable-model-invocation: true` - delegates via `runSubagent`, never executes tasks directly
- Subagents: `disable-model-invocation: false` - execute tasks via tools
- Subagents CANNOT call other subagents - all cross-agent collaboration mediated by orchestrator

## 📁 Project Structure

- `gem-*.agent.md`: Concise agent definitions with role, expertise, mission, workflow, and operating rules.
- `plan.yaml`: The single source of truth for the current project state.
- `README.md`: This file.

---
*Built for Gem Team — Precision. Parallelism. Progress.*
