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

Required sections per agent: Role, Knowledge Sources, Workflow, Input Format (defined in orchestrator's `<agent_input_reference>`), Output Format, Rules.

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
- **Status values**: `completed|failed|in_progress|needs_revision|needs_approval`
- **Confidence**: Always include 0-1 confidence on learnings/outputs

## Testing Instructions

- Agent definitions are validated by YAML frontmatter parsers and Markdown renderers.
- Run `apm install -g .` locally to test deployment to supported tools.
- Verify agents appear in tool: `copilot plugin list`, `/plugin list`, etc.
- Test agent invocation by triggering via chat (e.g., "Research the codebase structure").
- **Do NOT add code tests** — this is a configuration/metadata package.

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
