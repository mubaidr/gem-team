# gem-team: Multi-Agent Orchestration Blueprints

gem-team is a custom agent setup for VS Code designed for complex, autonomous software development workflows. It leverages the `runSubagent` tool to coordinate a hierarchical delegation model where a central gem-orchestrator manages specialized subagents using a Concise Messaging Protocol (CMP).

## 🏗 System Architecture

The ecosystem consists of seven specialized roles:

| Agent                        | Responsibility                 | Key Strength        |
| :--------------------------- | :----------------------------- | :------------------ |
| gem-orchestrator         | High-level triage & delegation | Strategic oversight |
| gem-planner              | Research & plan generation      | Pre-mortem analysis |
| gem-implementer          | Code execution & unit tests    | High throughput     |
| gem-chrome-tester        | Browser automation & UI        | Visual verification |
| gem-documentation-writer | Documentation & Diagrams       | Parity maintenance  |
| gem-devops               | Infrastructure & CI/CD         | Idempotency first   |
| gem-reviewer             | Security review for critical tasks | OWASP scanning     |

## 🛠 Usage

1. Load gem-orchestrator as the entry point.
2. The gem-orchestrator will autonomously invoke subagents using the `runSubagent` tool.
3. All task-related data is persisted in `docs/.tmp/[PLAN_ID]/`.
4. Tasks use simple sequential IDs (e.g., task-001, task-002) with DAG-based dependencies.

## 🧠 Design Principles

This agent system follows modern agentic AI design patterns:

| Principle                 | Implementation                                                  |
| ------------------------- | --------------------------------------------------------------- |
| Clear Role Definition | Each agent has explicit `<role>`, `<mission>`, `<constraints>`  |
| Interleaved Thinking | `<thinking_protocol>` for consistent reasoning quality          |
| Spec-Driven Development | plan.yaml includes Specification section (Requirements, Design) |
| Explicit Tool Guidance | `<protocols>` section defines tool preferences                  |
| Anti-Patterns         | `<anti_patterns>` specifies what NOT to do                      |
| Structured Handoffs   | CMP v2.0 with reasoning, reflection, metadata                   |
| Context Engineering   | `<context_requirements>` defines input contracts                |
| Critical-Task Gating | gem-reviewer for security review of critical tasks              |
| Safety Protocols      | `<error_handling>` with escalation routes                       |
| Web Research Integration | All agents use `mcp_tavily-remote_tavily_search` and `fetch_webpage` |
| Parallel Execution | Batch independent tool calls for maximum throughput            |
| Timeout Strategy | Effort-based timeouts (XS: 30s → XL: 10min)                    |
| System Constraints    | max_parallel_agents: 4 enforced by Orchestrator                 |

## 🌐 Web Research Protocol

All agents integrate web research for real-time knowledge:

| Agent | Primary Research Use Cases |
| ----- | -------------------------- |
| gem-planner | Best practices, architecture patterns, tech decisions |
| gem-implementer | Debugging errors, API docs, security fixes |
| gem-devops | Cloud docs, K8s specs, CI/CD patterns |
| gem-chrome-tester | WCAG standards, UI patterns, performance benchmarks |
| gem-documentation-writer | Style guides, API doc standards, diagram syntax |
| gem-reviewer | OWASP Top 10, CVE lookups, security advisories |

Tools Used:

- `mcp_tavily-remote_tavily_search` - Primary search for current information
- `fetch_webpage` - Retrieve specific documentation pages

Query Best Practices:

- Always include current year/month in queries
- Include framework/library versions
- Cross-reference web findings with codebase patterns

## 📐 Agent Definition Structure

Each `.agent.md` file follows this structure:

```text
---
YAML frontmatter (name, description, infer)
---
<agent>
  <thinking_protocol>    - Interleaved thinking before tool calls
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
  <handoff_examples>     - Concrete output samples (CMP v2.0)
</agent>
```

### CMP v2.0 Handoff Format

All agents use the standardized Concise Messaging Protocol v2.0 (see detailed glossary in individual agents):

```json
{
  "status": "completed|blocked|failed",
  "plan_id": "PLAN-YYMMDD-HHMM",
  "completed_tasks": ["task-001", "task-002"],
  "failed_tasks": ["task-003"],
  "agent": "gem-implementer",
  "metadata": {
    "timestamp": "2026-01-25T14:30:00Z",
    "model_used": "claude-sonnet-4.5",
    "retry_count": 0,
    "duration_ms": 45000
  },
  "reasoning": {
    "approach": "Used multi_replace_string_in_file for batch edits",
    "why": "Minimized tool calls, reduced context fragmentation",
    "confidence": 0.9
  },
  "artifacts": { ... },
  "reflection": {
    "self_assessment": "All acceptance criteria met",
    "issues_identified": [],
    "self_corrected": []
  },
  "issues": []
}
```

## 🔧 Customization

## 📋 Task Structure

Tasks in the system use:

- Simple Sequential IDs: task-001, task-002, task-003 (no hierarchical numbering)
- DAG Dependencies: Tasks reference other tasks by ID via `dependencies` field
- Status Tracking: pending | in-progress | completed | blocked | failed | spec_rejected
- Priority Levels: HIGH | MEDIUM | LOW (affects scheduling order)
- Effort Estimation: XS | S | M | L | XL (guides timeout strategies)

Example plan.yaml:

```yaml
plan_id: "PLAN-260128-1430"
objective: "Add authentication feature"
tech_stack: ["react", "typescript", "express"]

tasks:
  - id: "task-001"
    title: "Create auth interfaces"
    agent: "gem-implementer"
    priority: "HIGH"
    status: "pending"
    dependencies: []
    effort: "S"
    acceptance_criteria: ["Interfaces exported", "TypeScript compiles"]
    verification: "npm run type-check"

  - id: "task-002"
    title: "Implement login endpoint"
    agent: "gem-implementer"
    priority: "HIGH"
    status: "pending"
    dependencies: ["task-001"]
    effort: "M"
    acceptance_criteria: ["Login returns token", "Tests pass"]
    verification: "npm test tests/login.test.ts"
```

## 🆕 Adding New Agents

To add a new agent:

1. Copy template structure from existing agent
2. Define unique `<role>` and `<mission>`
3. Specify `<context_requirements>` for input contract
4. Add relevant `<anti_patterns>` for your domain
5. Include `<handoff_examples>` with samples
