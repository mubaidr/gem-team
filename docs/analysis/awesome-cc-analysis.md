# Awesome Claude Code Analysis: Gem-Team Improvement Opportunities

## Sources Analyzed

- [undeadlist/claude-code-agents](https://github.com/undeadlist/claude-code-agents) — Parallel auditors, micro-checkpoint protocols
- [avifenesh/agentsys](https://github.com/avifenesh/agentsys) — 47 agents, 19 plugins, task-to-production pipeline
- [maxritter/claude-codepro](https://github.com/maxritter/claude-codepro) — Spec-driven, TDD enforcement, quality hooks
- [automazeio/ccpm](https://github.com/automazeio/ccpm) — 7.7k stars, GitHub Issues, bash scripts, worktree isolation
- [NeoLabHQ/context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit) — Token-efficient patterns, MAKER, voting
- [glittercowboy/taches-cc-resources](https://github.com/glittercowboy/taches-cc-resources) — Meta-prompting, Ralph loop
- [ThibautMelen/agentic-workflow-patterns](https://github.com/ThibautMelen/agentic-workflow-patterns) — Anthropic taxonomy, 6 workflow patterns
- [tony/claude-code-riper-5](https://github.com/tony/claude-code-riper-5) — RIPER 5-phase, mode restrictions, memory bank
- [FlineDev/ContextKit](https://github.com/FlineDev/ContextKit) — 4-phase, quality agents, constitutional compliance
- [ryoppippi/ccusage](https://github.com/ryoppippi/ccusage) — Usage monitoring, token tracking
- [vaporif/parry](https://github.com/vaporif/parry) — Prompt injection scanner
- [ldayton/Dippy](https://github.com/ldayton/Dippy) — Auto-approve shell commands via AST parsing

---

## 1. PRD Creation Before Planning (High Impact)

**Problem:** gem-team creates PRD *after* planning from the planner. ccpm and ContextKit create the spec *before* planning — with user stories, scope boundaries, and acceptance criteria upfront.

**What ccpm does:** `5-Phase Discipline: Brainstorm → Document (specs that leave nothing to interpretation) → Plan → Execute → Track`

**What ContextKit does:** `Phase 1: Business Case (what + why, no tech) → Phase 2: Tech → Phase 3: Steps → Phase 4: Implementation`

**gem-team's current approach:** PRD is created from planner's output, not the source of truth.

**Fix:** Move PRD creation *before* planning. Discuss Phase → PRD creation → Research → Planning. Add to PRD:
- User stories ("As a [User], I want [Goal] so that [Benefit]")
- IN SCOPE / OUT OF SCOPE sections
- Acceptance criteria upfront
- `🚨 NEEDS CLARIFICATION` markers for unresolved decisions

This makes PRD the source of truth, planner validates against it (already does), but it exists *before* planning.

---

## 2. Interactive Clarification in Discuss Phase (Medium Impact)

**Problem:** Discuss phase asks static questions. ContextKit generates suggestions with options.

**What ContextKit does:**
```
🚨 [NEEDS CLARIFICATION: What authentication method?]
Options:
  A) JWT with refresh tokens
  B) Session-based cookies
  C) OAuth 2.0
  D) Skip for now
```

**gem-team currently:** Presents questions one at a time, user types freeform answer.

**Fix:** Enhance Discuss Phase — for each question, generate 2-4 context-aware options before asking. User picks or writes custom. Reduces back-and-forth, surfaces decisions faster.

---

## 3. Parallelization Metadata (Medium Impact)

**Problem:** gem-team determines parallelism from DAG dependencies (wave assignment). But it can't detect *file conflicts* or sub-wave parallelism.

**What ccpm/ContextKit do:**
```yaml
# ccpm
depends_on: [123, 456]
parallel: true
conflicts_with: [789]  # File-level conflicts

# ContextKit
[P] # Parallelizable marker
[S] # Sequential marker
```

**gem-team could add to plan.yaml tasks:**
```yaml
- id: task_001
  parallelizable: true  # Can sub-agent parallelize within wave?
  conflicts_with: [task_003]  # Both touch shared/store.ts
```

This gives the orchestrator more information for wave optimization.

---

## 4. Bash Scripts for Deterministic Ops (Medium Impact)

**Problem:** gem-team has no non-LLM status/standup operations. Every status check costs tokens. ccpm solves this with 14 bash scripts that parse plan.yaml.

**What ccpm does:** `standup.sh`, `status.sh`, `search.sh` — all parse frontmatter, run in <100ms, zero LLM cost.

**gem-team could add:**
- `gem-status.sh` — parse plan.yaml, show task counts, wave progress, blocked items
- `gem-standup.sh` — show today's work, next tasks, blockers
- `gem-progress.sh` — completion %, tasks per wave, effort summary

These could be invoked via a slash command or Copilot trigger.

---

## 5. Quality Agents in Execution Waves (Medium Impact)

**Problem:** gem-team has reviewer as post-execution gate. ContextKit has quality *agents* that run *during* execution: `build-project`, `run-test-suite`, `check-accessibility`.

**What ContextKit does:**
```
- build-project: Execute builds, filter verbose output, report SUCCESS/FAIL/PARTIAL
- run-test-suite: Full test validation with clean output
- check-accessibility: VoiceOver, contrast, keyboard nav
```

**gem-team already has:** browser tester, reviewer, implementer. But no dedicated build-checker or test-runner agent integrated into waves.

**Fix:** Add quality sub-agents to execution waves:
- After wave completes: `gem-build-checker` runs build, reports filtered output
- After implementation tasks: `gem-test-runner` executes full test suite
- These run as part of wave completion check, not just reviewer gate

---

## 6. Shell Permission Handler — Dippy (Medium Impact)

**Problem:** Copilot prompts for every bash command. Dippy solves this with AST-based auto-approval for safe commands.

**What Dippy does:** Parses bash commands with a hand-written AST parser. Auto-approves safe operations (ls, git status, cat). Custom denial messages guide Claude back on track. 14,000+ tests.

**gem-team context:** This is a Copilot-level setting, not gem-team agent-level. But could be documented/recommended for gem-team users.

**Fix:** Document Dippy as recommended setup for gem-team users. Add to setup instructions.

---

## Summary: Priority Ranking

| # | Improvement | Impact | Effort | Copilot Fit |
|---|-------------|--------|--------|-------------|
| 1 | PRD Creation Before Planning | High | Medium | Strong |
| 2 | Interactive Clarification in Discuss | Medium | Low | Strong |
| 3 | Parallelization Metadata (conflicts_with) | Medium | Low | Strong |
| 4 | Bash Scripts for Status/Standup | Medium | Low | Strong |
| 5 | Quality Agents in Waves (build/test) | Medium | Medium | Strong |
| 6 | Shell Permission Handler (Dippy docs) | Medium | Low | Strong |

---

## Already Covered by Existing Implementation

These were considered but gem-team already handles them:

- **Quality Hooks Pipeline** — Implementer already runs `get_errors, tests, typecheck, lint` in Verify step
- **Mode Restrictions** — Each agent already has scoped `<tools>` section
- **AI Slop Detection** — Implementer directive: "No TBD/TODO as final code" + review verification
- **Token/Context Limits** — Constraints already enforce: selective research, 200-line reads, semantic search

---

## What NOT to Borrow

- **GitHub Issues integration** (ccpm) — gem-team uses plan.yaml, external DB adds complexity
- **Git Worktree isolation** (ccpm) — over-engineering for most projects
- **Slash Commands** — gem-team is chat-native
- **Milestone/release tagging** — over-engineering
- **Multi-runtime support** — gem-team is Copilot-specific
- **Fresh context per task** — already handled by runSubagent
- **Memory Bank** — plan.yaml + AGENTS.md already cover this
- **Prompt Injection Scanner** (parry) — security hardening was skipped
- **Usage Monitoring** (ccusage) — out of gem-team scope
- **Skill creation system** (pilot-shell) — future consideration
