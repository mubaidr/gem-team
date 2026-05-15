# Gem Team — Agent Instructions

Self-Learning Multi-agent orchestration harness for spec-driven development and automated verification.

## Project Overview

Gem Team is a multi-agent AI coding harness that orchestrates specialized agents (researcher, planner, implementer, reviewer, tester, etc.) through a wave-based DAG execution model. It follows spec-driven development (PRD → Plan → Tasks → Verification) with built-in security auditing, TDD, and continuous learning via a memory/persistence layer.

- **Package:** `mubaidr/gem-team` (APM)
- **License:** Apache-2.0
- **Source:** [github.com/mubaidr/gem-team](https://github.com/mubaidr/gem-team)
- **Release strategy:** Release Please with Manifest Strategy (conventional commits)

## Repository Structure

```
.apm/agents/          # Agent definition files (*.agent.md)
.github/workflows/    # CI/CD (release.yml)
AGENTS.md             # This file — agent instructions
apm.yml               # APM package metadata
CONTRIBUTING.md       # Commit conventions & PR guide
README.md             # Human-facing docs
context7.json         # Library ID resolution config
```

## Agent Team (16 Agents)

Agents live in `.apm/agents/` and are deployed via APM to VS Code, Copilot CLI, Claude Code, Cursor, OpenCode, Codex CLI, Gemini CLI, and Windsurf.

| Agent                      | Role                                                          | Mode     |
| -------------------------- | ------------------------------------------------------------- | -------- |
| `gem-orchestrator`         | Team lead: route tasks, manage waves, synthesize results      | primary  |
| `gem-researcher`           | Codebase exploration, patterns, dependencies, architecture    | subagent |
| `gem-planner`              | DAG plan design, task decomposition, wave scheduling          | subagent |
| `gem-implementer`          | TDD code implementation (features, bugs, refactoring)         | subagent |
| `gem-implementer-mobile`   | Mobile TDD (React Native, Expo, Flutter)                      | subagent |
| `gem-reviewer`             | Security audit, code review, PRD compliance, OWASP            | subagent |
| `gem-debugger`             | Root-cause analysis, stack trace diagnosis, bisection         | subagent |
| `gem-critic`               | Challenge assumptions, find edge cases, spot over-engineering | subagent |
| `gem-designer`             | UI/UX design, design systems, accessibility (web)             | subagent |
| `gem-designer-mobile`      | Mobile UI/UX (HIG, Material 3, safe areas)                    | subagent |
| `gem-devops`               | Infrastructure, CI/CD, containers, deployment                 | subagent |
| `gem-browser-tester`       | E2E browser testing, visual regression                        | subagent |
| `gem-mobile-tester`        | Mobile E2E (Detox, Maestro, iOS/Android simulators)           | subagent |
| `gem-documentation-writer` | Tech docs, README, API docs, AGENTS.md, PRD maintenance       | subagent |
| `gem-skill-creator`        | Pattern-to-skill extraction (SKILL.md files)                  | subagent |
| `gem-code-simplifier`      | Dead code removal, complexity reduction, dedup, renaming      | subagent |

### Key Constraints

- **gem-orchestrator** never executes code — always delegates to subagents
- **gem-researcher, gem-reviewer, gem-debugger, gem-critic, gem-designer, gem-designer-mobile, gem-documentation-writer, gem-browser-tester, gem-mobile-tester** never implement code — read-only review/analysis
- **gem-implementer, gem-implementer-mobile, gem-code-simplifier, gem-devops** may write code (within their scope)
- All agents follow TDD where applicable (Red → Green → Refactor)
- Never review own work (separation of concerns)

## Workflow Architecture

```
User Goal
  └─→ Orchestrator (gem-orchestrator)
        ├─→ [Simple] Research → Plan → Execute → Verify
        └─→ [Complex] Discuss → PRD → Research → Plan → Approve → Execute Waves → Final Review
                     │                                     │
                     └─→ Debug ──→ Fix ──→ Re-verify       │
                       (gem-debugger → gem-implementer)     │
                                                            └─→ Doc Extraction
                                                              (gem-skill-creator,
                                                               gem-documentation-writer)
```

### Execution Flow (Orchestrator)

1. **Phase 0: Init & Route** — Generate plan_id, detect intent, route to agent
2. **Phase 1: Research** — Delegate to gem-researcher for codebase exploration
3. **Phase 2: Planning** — Delegate to gem-planner for DAG design; review by gem-reviewer/gem-critic for medium/high complexity
4. **Phase 3: Execution Loop** — Execute waves: delegate, integration check, synthesize, skill extraction, AGENTS.md proposal
5. **Phase 4: Summary** — Present status, next steps

## Agent Definition Format

Each agent file in `.apm/agents/` uses YAML frontmatter + Markdown sections:

```yaml
---
description: "One-line role description"
name: agent-name
argument-hint: "CLI argument hint"
disable-model-invocation: false
user-invocable: false
mode: subagent
hidden: true
---
```

Required sections per agent: Role, Knowledge Sources, Workflow, Input Format, Output Format, Rules.

### Common Sections Shared by All Agents

All agent definitions include these rule sets:

- **Execution** — Tool priority (Tools > Tasks > Scripts > CLI), retry 3x, batch I/O
- **Constitutional** — Always use established patterns, state assumptions explicitly
- **Anti-Patterns** — Behaviors to avoid (scope creep, skipping tests, hardcoded values)
- **Directives** — No preamble/meta commentary; output only valid JSON
- **Memory Usage** — Read on init, write on completion (confidence ≥0.85, dedup, max 3, YAML frontmatter)
- **I/O Optimization** — Batch independent calls, OR-regex patterns, efficient reads

### Agent-Specific Variations

| Section                       | Where it appears                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------- |
| Anti-Rationalization table    | gem-implementer, gem-implementer-mobile, gem-browser-tester                      |
| Skills/Guidelines (embedded)  | gem-debugger, gem-devops, gem-designer, gem-designer-mobile, gem-code-simplifier |
| Confidence Calculation Helper | gem-researcher                                                                   |
| Flow Definition Format        | gem-browser-tester                                                               |
| Test Definition Format        | gem-mobile-tester                                                                |
| Research Format Guide         | gem-researcher                                                                   |
| Plan Format Guide             | gem-planner                                                                      |
| PRD Format Guide              | gem-documentation-writer                                                         |
| Skill Format Guide            | gem-skill-creator, gem-documentation-writer                                      |

### Input/Output Contract

Every agent returns a JSON response with the same top-level shape:

```jsonc
{
  "status": "completed|failed|in_progress|needs_revision",
  "task_id": "string",
  "plan_id": "string",
  "summary": "≤3 sentences",
  "failure_type": "transient|fixable|needs_replan|escalate|flaky|regression|new_failure|platform_specific",
  "extra": {
    "confidence": "number (0-1)",
    "learnings": { "patterns": [], "gotchas": [] },
    // agent-specific fields
  },
}
```

## Build & Test Commands

```bash
# No build step — this is a configuration/metadata package.
# Agent definitions are Markdown + YAML frontmatter, no compilation needed.
```

### Validation

```bash
# Validate YAML frontmatter in all agent files
grep -r "^---" .apm/agents/*.agent.md -l | wc -l
# Expected: 16 (all agent files)

# Check for missing required sections
grep -L "<role>" .apm/agents/*.agent.md

# Verify all agents referenced in orchestrator exist
grep "gem-" .apm/agents/gem-orchestrator.agent.md | grep -o "gem-[a-z-]*" | sort -u
```

### Release

```bash
# Release Please handles automated version bumps via conventional commits.
# See CONTRIBUTING.md for commit format.
```

## Code Style Guidelines

- **Agent definitions**: YAML frontmatter + Markdown. Keep sections concise.
- **Output format**: JSON only, no preamble/commentary. Dense, abbreviated, bulleted.
- **Memory format**: YAML frontmatter with `updatedAt`, dense bullets, max 3 items per write.
- **Failure types**: Use exact enum values: `transient|fixable|needs_replan|escalate|flaky|regression|new_failure|platform_specific`
- **Status values**: `completed|failed|in_progress|needs_revision`
- **Confidence**: Always include 0-1 confidence on learnings/outputs

## Testing Instructions

- Agent definitions are validated by YAML frontmatter parsers and Markdown renderers.
- Run `apm install -g .` locally to test deployment to supported tools.
- Verify agents appear in tool: `copilot plugin list`, `/plugin list`, etc.
- Test agent invocation by triggering via chat (e.g., "Research the codebase structure").
- **Do NOT add code tests** — this is a configuration/metadata package.

## PR Instructions

- **Title format**: `feat(<agent-name>): <description>` or `fix(<agent-name>): <description>`
- **Scope**: Use the agent name (e.g., `feat(gem-researcher): add mode=clarify support`)
- **Always run validation** (YAML frontmatter check) before committing
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for full commit conventions

| Type              | Description          | Release Impact |
| ----------------- | -------------------- | -------------- |
| `feat`            | New agent or feature | Minor release  |
| `fix`             | Bug fix              | Patch release  |
| `perf`            | Performance          | Patch release  |
| `docs`            | Documentation        | No release     |
| `refactor`        | Refactoring          | No release     |
| `test`            | Tests                | No release     |
| `chore`           | Maintenance          | No release     |
| `BREAKING CHANGE` | Breaking change      | Major release  |

## Deployment

Gem Team is distributed via APM (Azure Package Manager) as a universal package. Agents auto-deploy to all detected tools:

| Tool                  | Landing Path              |
| --------------------- | ------------------------- |
| VS Code / Copilot CLI | `.github/agents/`         |
| Claude Code           | `.claude/agents/`         |
| Cursor                | `.cursor/agents/`         |
| OpenCode              | `.opencode/agents/`       |
| Codex CLI             | `.codex/agents/`          |
| Gemini CLI            | Compiled into `GEMINI.md` |
| Windsurf              | `.windsurf/skills/`       |

## Knowledge Sources (Priority Order)

When agents need information, consult in this order:

1. **PRD** — `docs/PRD.yaml` (product requirements, scope, acceptance criteria)
2. **Codebase** — Direct file reading, semantic search, grep
3. **AGENTS.md** — This file (conventions, rules, instructions)
4. **Memory** — Persistent memory tool (facts, patterns, gotchas)
5. **Context7** — Official library docs via `mcp_io_github_ups_query-docs`
6. **Online docs** — Web search, official documentation, llms.txt

## Agent-Specific Conventions

### gem-orchestrator

- Never execute code — always delegate
- Batch up to 4 concurrent subagents
- Retry failed tasks 3x, then escalate
- Present plans via `vscode_askQuestions` for medium/high complexity

### gem-researcher

- Two modes: `clarify` (understand intent) and `research` (explore codebase)
- Early exit if confidence ≥ 0.9 and scope is small
- Save findings to `docs/plan/{plan_id}/research_findings_{focus_area}.yaml`

### gem-planner

- DAG-based: no deps = wave 1; deps = min(dep.wave) + 1
- Target ~100 lines per task, max 300
- Each task must have verification + acceptance_criteria
- Assess if PRD update is recommended

### gem-implementer / gem-implementer-mobile

- TDD: Red (test fails) → Green (minimal code) → Refactor
- Surgical changes only — no scope creep
- Before modifying shared components: run `vscode_listCodeUsages`
- Document "NOTICED BUT NOT TOUCHING" for out-of-scope improvements

### gem-reviewer

- Four scopes: `plan`, `task`, `wave`, `final`
- Security audit via grep_search FIRST (secrets, PII, SQLi, XSS)
- PRD compliance: verify all acceptance_criteria met
- Mobile: check 8 security vectors (keychain, pinning, jailbreak, etc.)

### gem-debugger

- Four phases: Investigation → Pattern → Hypothesis → Recommendation
- Never implement fixes — only diagnose and recommend
- Same-bug cache: if >0.8 match to cached diagnosis, reuse
- Learn and persist root causes to memory

### gem-critic

- Balanced critique: always include `what_works[]` alongside findings
- Severity levels: blocking | warning | suggestion
- Over-engineering (+50% complexity for <10% benefit) = blocking

### gem-designer / gem-designer-mobile

- Never use default fonts (Inter, Roboto, Arial) or cookie-cutter layouts
- Distinctive aesthetics with accessibility-first mindset
- Output to `docs/DESIGN.md` with 9 section format
- Validate WCAG 2.1 AA minimum

### gem-devops

- All operations must be idempotent
- Approval gate for production/security-sensitive deploys
- Verify health checks pass before completing

### gem-browser-tester / gem-mobile-tester

- Snapshot before every action
- Capture evidence on failure (screenshots, logs, traces)
- Classify failures: transient/flaky/regression/new_failure
- Never skip wait after navigation

### gem-documentation-writer

- Four task types: `documentation`, `update`, `prd`, `agents_md`
- Never use generic boilerplate — match project style
- Keep markdown under 500 tokens per skill; overflow to `references/`

### gem-skill-creator

- Only create skills for confidence ≥ 0.85
- Deduplicate: skip if `docs/skills/{skill-name}/SKILL.md` exists
- Output format: SKILL.md + optional references/, scripts/, assets/

### gem-code-simplifier

- Chesterton's Fence: understand before removing
- Preserve behavior — never change inputs/outputs
- Test after each change (run existing tests)

## Shared Rules (All Agents)

### Output Discipline

- No preamble, no meta commentary, no explanations unless failed
- Output only valid JSON matching the exact Output Format
- Dense, abbreviated, bulleted. No prose.

### Error Handling

- Retry 3x before escalating
- Transient → retry; Fixable → debugger → fix → re-verify; Escalate → user
- Log failures to `docs/plan/{plan_id}/logs/` (or `docs/logs/` if no plan context)

### I/O Optimization

- Batch independent calls (read_file, file_search, grep_search, etc.)
- Use OR-regex for related patterns
- Read related files in batches; avoid line-by-line reads
- Narrow searches with includePattern/excludePattern

### Memory

- Read on init for task-relevant context
- Write on completion only if: confidence ≥ 0.85, not duplicate, max 3 items
- Format: YAML frontmatter with `updatedAt`, dense bullets

### Constitutional

- Always use established library/framework patterns
- State assumptions explicitly; never guess silently
- Minimum code, nothing speculative
- Cite sources for every claim
