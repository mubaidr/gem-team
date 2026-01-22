# gem-team: Multi-Agent Orchestration Blueprints

**gem-team** is a custom agent setup for VS Code designed for complex, autonomous software development workflows. It leverages the `runSubagent` tool to coordinate a hierarchical delegation model where a central **gem-orchestrator** manages specialized subagents using a **Concise Messaging Protocol (CMP)**.

## 🏗 System Architecture

The ecosystem consists of seven specialized roles:

| Agent                        | Responsibility                 | Key Strength        |
| :--------------------------- | :----------------------------- | :------------------ |
| **gem-orchestrator**         | High-level triage & delegation | Strategic oversight |
| **gem-planner**              | Research & WBS generation      | Pre-mortem analysis |
| **gem-implementer**          | Code execution & unit tests    | High throughput     |
| **gem-chrome-tester**        | Browser automation & UI        | Visual verification |
| **gem-documentation-writer** | Documentation & Diagrams       | Parity maintenance  |
| **gem-devops**               | Infrastructure & CI/CD         | Idempotency first   |

## 🛠 Usage

1. Load **gem-orchestrator** as the entry point.
2. The **gem-orchestrator** will autonomously invoke subagents using the `runSubagent` tool.
3. All task-related data is persisted in `docs/.tmp/[TASK_ID]/`.

## 🧠 Design Principles

This agent system follows best practices from 2025 research on agentic AI:

| Principle                 | Implementation                                                  |
| ------------------------- | --------------------------------------------------------------- |
| **Clear Role Definition** | Each agent has explicit `<role>`, `<mission>`, `<constraints>`  |
| **Explicit Tool Guidance** | `<protocols>` section defines tool preferences                  |
| **Anti-Patterns**         | `<anti_patterns>` specifies what NOT to do                      |
| **Structured Handoffs**   | `<handoff_examples>` with JSON samples                          |
| **Context Engineering**   | `<context_requirements>` defines input contracts                |
| **Safety Protocols**      | `<error_handling>` with escalation routes                       |

## 📐 Agent Definition Structure

Each `.agent.md` file follows this structure:

```text
---
YAML frontmatter (name, description, infer)
---
<agent>
  <glossary>             - Key terms and definitions
  <context_requirements> - Input contract
  <role>                 - Title, skills, domain
  <mission>              - Core objectives
  <workflow>             - Step-by-step execution
  <protocols>            - Handoff and tool usage
  <anti_patterns>        - What NOT to do
  <constraints>          - Operational limits
  <checklists>           - Entry/Exit criteria
  <error_handling>       - Failure routes
  <handoff_examples>     - Concrete output samples
</agent>
```

## 🔧 Customization

To add a new agent:

1. Copy template structure from existing agent
2. Define unique `<role>` and `<mission>`
3. Specify `<context_requirements>` for input contract
4. Add relevant `<anti_patterns>` for your domain
5. Include `<handoff_examples>` with JSON samples
6. Set `infer: false` in frontmatter for worker agents
