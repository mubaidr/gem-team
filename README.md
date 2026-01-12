# gem-team: Multi-Agent Orchestration Blueprints

**gem-team** is a custom agent setup for VS Code designed for complex, autonomous software development workflows. It leverages the `runSubagent` tool to coordinate a hierarchical delegation model where a central **gem-orchestrator** manages specialized subagents using a **Concise Messaging Protocol (CMP)**.

## 🏗 System Architecture

The ecosystem consists of seven specialized roles:

| Agent                        | Responsibility                 | Key Strength        |
| :--------------------------- | :----------------------------- | :------------------ |
| **gem-orchestrator**         | High-level triage & delegation | Strategic oversight |
| **gem-planner**              | Research & WBS generation      | Pre-mortem analysis |
| **gem-implementer**          | Code execution & unit tests    | High throughput     |
| **gem-reviewer**             | Security audit & QA            | Confidence scoring  |
| **gem-chrome-tester**        | Browser automation & UI        | Visual verification |
| **gem-documentation-writer** | Documentation & Diagrams       | Parity maintenance  |
| **gem-devops**               | Infrastructure & CI/CD         | Idempotency first   |

## 🛠 Usage

1. Load **gem-orchestrator** as the entry point.
2. The **gem-orchestrator** will autonomously invoke subagents using the `runSubagent` tool.
3. All task-related data is persisted in `docs/tasks/[TASK_ID]/`.
