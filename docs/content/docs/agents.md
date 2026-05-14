---
title: Agents - Gem Team
description: Gem Team specialized agents
---

Gem Team consists of 14 specialized agents, each trained for specific development tasks.

## Core Agents

| Agent                 | Purpose                                       |
| --------------------- | --------------------------------------------- |
| `gem-researcher`      | Gathers information and analyzes requirements |
| `gem-planner`         | Creates detailed implementation plans         |
| `gem-implementer`     | Writes code using TDD methodology             |
| `gem-reviewer`        | Reviews code for quality and standards        |
| `gem-debugger`        | Diagnoses and fixes issues                    |
| `gem-critic`          | Challenges assumptions and finds edge cases   |
| `gem-code-simplifier` | Refactors complex code into simpler forms     |

## Specialized Agents

| Agent                      | Purpose                                |
| -------------------------- | -------------------------------------- |
| `gem-devops`               | Handles deployment and infrastructure  |
| `gem-documentation-writer` | Creates comprehensive documentation    |
| `gem-designer`             | Designs web UI/UX                      |
| `gem-designer-mobile`      | Designs mobile UI/UX                   |
| `gem-implementer-mobile`   | Implements React Native and Flutter    |
| `gem-mobile-tester`        | Tests iOS and Android applications     |
| `gem-browser-tester`       | Tests web applications across browsers |

## Memory Contracts

All agents self-serve memory via their tool's native memory mechanism. The `MEMORY://` prefix is an abstract reference — each tool resolves it to its own storage. See `docs/memory/mapping.md` for details.

Format: **dense, abbreviated, bulleted**. No prose.

### Memory Scope

| Scope                   | Path                | TTL               | What goes here                                                                                          |
| ----------------------- | ------------------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| **User** (global)       | `MEMORY://user/`    | Permanent         | Cross-project user preferences, coding style, agent behavior rules                                      |
| **Repo** (project)      | `MEMORY://repo/`    | Per-major-version | Codebase-specific: research cache, diagnoses, decisions, patterns, infra, flaky, conventions, learnings |
| **Session** (transient) | `MEMORY://session/` | Per-conversation  | Current plan context, in-progress notes, temporary findings                                             |

| Agent                              | Read                                                     | Write                                            | Purpose                                                                                                                                                |
| ---------------------------------- | -------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| gem-researcher                     | `MEMORY://repo/research/{topic}.md`                      | `MEMORY://repo/research/{plan_id}-{focus}.md`    | Cache architecture patterns across plans. Self-validates staleness: file checks, import resolve, git log. IF stale: re-research, DELETE old, WRITE new |
| gem-debugger                       | `MEMORY://repo/diagnoses/{module}-{slug}.md`             | `MEMORY://repo/diagnoses/{module}-{bug_slug}.md` | Save root-cause. IF pattern match >0.8: return cached diagnosis. WRITE on root cause found                                                             |
| gem-planner                        | `MEMORY://repo/research/*` + `decisions/*` + `reviews/*` | —                                                | Batch-read all prior research, decisions, reviews before planning                                                                                      |
| gem-reviewer                       | `MEMORY://repo/reviews/{module}*`                        | `MEMORY://repo/reviews/{module}-{plan_id}.md`    | Cross-plan consistency. Persist findings per module                                                                                                    |
| gem-critic                         | `MEMORY://repo/decisions/*` + `reviews/*`                | `MEMORY://repo/reviews/{module}-{plan_id}.md`    | Prior architecture context. Write discovered edge cases                                                                                                |
| gem-implementer                    | `MEMORY://repo/patterns/{module}.md`                     | (via `learnings.facts[]` in output)              | Codebase conventions. Gotchas discovered during impl                                                                                                   |
| gem-devops                         | `MEMORY://repo/infra/{env}-{service}.md`                 | `MEMORY://repo/infra/{env}-{service}.md`         | Config history. Deployment records for rollback safety                                                                                                 |
| gem-code-simplifier                | `MEMORY://repo/patterns/{module}.md`                     | `MEMORY://repo/patterns/{module}.md`             | Known anti-patterns. Simplification outcomes                                                                                                           |
| gem-browser-tester                 | `MEMORY://repo/flaky/{test_suite}.md`                    | `MEMORY://repo/flaky/{test_suite}.md`            | Known flaky tests. New flaky detections                                                                                                                |
| gem-mobile-tester                  | `MEMORY://repo/flaky/{test_suite}.md`                    | `MEMORY://repo/flaky/{test_suite}.md`            | Same as browser-tester                                                                                                                                 |
| gem-documentation-writer           | —                                                        | `MEMORY://repo/` (via task_type=memory_update)   | Persists learnings from all agents into structured memory                                                                                              |
| gem-designer / gem-designer-mobile | —                                                        | —                                                | Design decisions are project-specific. Low ROI for cross-project memory                                                                                |
| gem-implementer-mobile             | `MEMORY://repo/patterns/{module}.md`                     | (via `learnings.facts[]`)                        | Same as implementer                                                                                                                                    |
| gem-orchestrator                   | —                                                        | —                                                | No memory involvement. Pure task delegator                                                                                                             |

### Staleness Protocol

Researcher owns cache validation on entry:

1. File existence check (does discovered file still exist?)
2. Import resolution (does import path resolve?)
3. git log check (has file been modified since cache written?)
4. IF any fail → re-research, DELETE stale entry, WRITE new

All other agents calling memory: check `Updated:` field. IF >7d: flag as potentially stale, treat as low confidence.

### Additional Memory Paths (Orchestrator-Managed)

These paths are written by the orchestrator after specific workflow phases — not by agents autonomously:

| Path                                         | Written      | Phase     | Content                                                       |
| -------------------------------------------- | ------------ | --------- | ------------------------------------------------------------- |
| `MEMORY://repo/decisions/{area}.md`          | Orchestrator | Phase 2   | Architectural decisions from researcher's clarify mode        |
| `MEMORY://repo/learnings/facts-{plan_id}.md` | Orchestrator | Phase 7.2 | All `learnings.facts[]` from completed tasks (any confidence) |
| `MEMORY://repo/conventions/{slug}.md`        | Orchestrator | Phase 7.3 | Staged conventions pending human approval for AGENTS.md       |
| `MEMORY://repo/reviews/final-{plan_id}.md`   | Orchestrator | Phase 8.4 | Critic + reviewer final findings after Phase 8                |

## Workflow

Agents work together following the orchestration workflow:

1. **Orchestrate** - gem-orchestrator coordinates
2. **Research** - gem-researcher gathers info
3. **Plan** - gem-planner creates plan
4. **Execute** - gem-implementer builds
5. **Verify** - gem-reviewer validates
