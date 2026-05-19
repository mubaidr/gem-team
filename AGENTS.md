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

Required sections per agent: Role, Knowledge Sources, Workflow, Output Format, Rules. Input formats are centralized in the orchestrator's `<agent_input_reference>` — subagents receive structured JSON from the orchestrator, never raw user prompts.

## Build & Test Commands

```bash
# No build step — this is a configuration/metadata package.
# Agent definitions are Markdown + YAML frontmatter, no compilation needed.
```

### Validation

```bash
# 1. Check all 16 agent files exist
find .apm/agents -maxdepth 1 -name '*.agent.md' -print | wc -l
# Expected: 16

# 2. Check YAML frontmatter in all files
grep -r "^---" .apm/agents/*.agent.md -l | wc -l
# Expected: 16

# 3. Check all required YAML frontmatter keys present in every file
for key in description name argument-hint disable-model-invocation user-invocable mode hidden; do
  missing=$(grep -L "^$key:" .apm/agents/*.agent.md 2>/dev/null)
  if [ -n "$missing" ]; then echo "MISSING $key in: $missing"; fi
done

# 4. Check all required section tags present
for tag in role knowledge_sources workflow output_format rules; do
  missing=$(grep -L "<$tag>" .apm/agents/*.agent.md 2>/dev/null)
  if [ -n "$missing" ]; then echo "MISSING <$tag> in: $missing"; fi
done

# 5. Check balanced section tags (each open has matching close)
for tag in role knowledge_sources workflow output_format rules; do
  for f in .apm/agents/*.agent.md; do
    open=$(grep -c "<$tag>" "$f" 2>/dev/null || echo 0)
    close=$(grep -c "</$tag>" "$f" 2>/dev/null || echo 0)
    if [ "$open" -ne "$close" ] && [ "$open" -gt 0 ]; then
      echo "UNBALANCED <$tag> in $f ($open opens, $close closes)"
    fi
  done
done

# 6. Check failure type enum consistency (all agents match global)
# Global: transient|fixable|needs_replan|escalate|flaky|regression|new_failure|platform_specific|test_bug
grep "failure_type" .apm/agents/*.agent.md | grep -v "test_bug" && echo "WARN: agent missing test_bug in failure_type"

# 7. Check no agent self-references in its own available_agents
for f in .apm/agents/*.agent.md; do
  agent_name=$(grep "^name:" "$f" | head -1 | awk '{print $2}')
  if grep -q "$agent_name" <(sed -n '/<available_agents>/,/<\/available_agents>/p' "$f" 2>/dev/null); then
    echo "SELF-REF $f lists itself in available_agents"
  fi
done

# 8. Verify all orchestrator-referenced agents exist
grep "gem-" .apm/agents/gem-orchestrator.agent.md | grep -o "gem-[a-z-]*" | sort -u | while read -r agent; do
  test -f ".apm/agents/$agent.agent.md" || echo "MISSING: $agent.agent.md"
done
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
- **Failure types**: Use exact enum values: `transient|fixable|needs_replan|escalate|flaky|regression|new_failure|platform_specific|test_bug`
- **Status values**: `completed|failed|in_progress|needs_revision|needs_approval`
- **Confidence**: Always include 0-1 confidence on learnings/outputs

## Memory Optimization (Referenced by All Agents)

### Memory Ownership (Single Writer)

Only the **orchestrator** writes to memory (via `memory` tool at Phase 5). Subagents output `learnings` in their JSON response — the orchestrator collects, deduplicates, and persists them. This prevents duplicate writes, inconsistent deduplication, and skipped persistence.

### Memory Tiers

| Tier | Agents                                                 | Read Priority |
| ---- | ------------------------------------------------------ | ------------- |
| 1    | orchestrator, researcher, planner                      | Always        |
| 2    | implementer, debugger, simplifier                      | On init       |
| 3    | reviewer, critic, doc-writer, designer, tester, devops | Rarely        |

### Read Rules (Agent-Level Decision)

```yaml
# BEFORE memory read:
IF task involves unknown domain → SKIP memory (nothing relevant)
IF confidence already high (≥0.85) → SKIP memory read
IF session has fresh context → USE session, SKIP repo/user

# Memory read batching: Combine with file discovery in same parallel call
PARALLEL:
  - memory(view relevant scopes)
  - semantic_search(target)
  - file_search(patterns)

# BEFORE memory write (orchestrator only):
IF any subagent learnings have confidence < 0.85 → SKIP those
IF duplicate exists (view first) → SKIP
IF partial success → BATCH until Phase 5, then write

# Write format (orchestrator only):
# - Short keys: n=name, d=description, c=confidence
# - No prose, bullets only, max 3 items per write
```

### Scope Rules

- **user** (`/memories/`): Cross-project patterns, conventions, user prefs
- **repo** (`/memories/repo/`): Project-specific architecture, patterns, gotchas
- **session** (`/memories/session/`): Task context, in-progress notes, transient state
- **plan** (`docs/plan/{id}/`): Task-specific learnings, research findings

### Result Caching (Agent-Level)

```yaml
# Generate cache key from: objective + tech_stack[] + files_hash + ac_hash
# Cache key format: task:{agent}:{sha256_80chars}
#
# BEFORE execution:
IF memory.has(cache_key) AND cached.status == completed:
  PROMPT user: "Similar task completed {date}. Apply same solution?"
  # OR auto-apply if pattern matches bug fix
```

### Deduplication

- Check existence before create: `memory(view path)` → IF exists SKIP
- Tag entries for invalidation: `{ scope, invalidation_hints: [file_paths] }`
- Batch writes: Defer to wave end, orchestrator handles deduplication

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
