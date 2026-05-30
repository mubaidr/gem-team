# AGENTS.md

Static conventions, rules, and agent definitions for the Gem Team multi-agent framework. Requires approval for changes.

> **Agent files:** `.apm/agents/*.agent.md` (16 agents)

---

## Core

- **`gem-orchestrator`** — Team lead. Orchestrates plan → implement → verify. Never executes or validates work directly; delegates to sub-agents. User-facing primary agent.
  - Args: `objective`, `plan_id` (if resuming)
  - Sources: PRD, AGENTS.md

- **`gem-planner`** — DAG execution plans. Decomposes tasks, schedules waves, analyzes risk. Outputs `plan.yaml`. Special seed interface — receives direct objective + memory seed from orchestrator.
  - Args: `plan_id`, `objective`, `task_clarifications`

- **All other agents** — Uniform input reference: `plan_id` + `task_definition`. All mode, scope, target, constraints, and other fields live inside `task_definition`. Agents hydrate their full context from `docs/plan/{plan_id}/context_envelope.json`.
  - Args: `plan_id`, `task_definition`

## Quality & Review

- **`gem-reviewer`** — Zero-hallucination filter. Security auditing, OWASP scanning, PRD compliance, code review.
  - Args: `plan_id`, `task_definition`
- **`gem-critic`** — Challenges assumptions, finds edge cases, detects over-engineering and logic gaps.
  - Args: `plan_id`, `task_definition`
- **`gem-debugger`** — Root-cause analysis, stack-trace diagnosis, regression bisection, error reproduction.
  - Args: `plan_id`, `task_definition`
- **`gem-browser-tester`** — E2E browser testing, UI/UX validation, visual regression.
  - Args: `plan_id`, `task_definition`
- **`gem-code-simplifier`** — Refactoring specialist. Removes dead code, reduces complexity, consolidates duplicates.
  - Args: `plan_id`, `task_definition`

## Skill Management

- **`gem-skill-creator`** — Pattern-to-skill extraction. Creates `SKILL.md` files from high-confidence learnings.
  - Args: `plan_id`, `task_definition`

## Specialized

- **`gem-devops`** — Infrastructure deployment, CI/CD pipelines, container management. Idempotent with approval gates.
  - Args: `plan_id`, `task_definition`
- **`gem-documentation-writer`** — Technical docs, READMEs, API docs, diagrams, walkthroughs.
  - Args: `plan_id`, `task_definition`
- **`gem-designer`** — UI/UX design. Layouts, themes, color schemes, design systems, accessibility (WCAG).
  - Args: `plan_id`, `task_definition`
- **`gem-implementer-mobile`** — Mobile implementation. React Native, Expo, Flutter with TDD.
  - Args: `plan_id`, `task_definition`
- **`gem-designer-mobile`** — Mobile UI/UX. HIG, Material Design, safe areas, touch targets.
  - Args: `plan_id`, `task_definition`
- **`gem-mobile-tester`** — Mobile E2E testing. Detox, Maestro, iOS/Android simulators.
  - Args: `plan_id`, `task_definition`

## Key Rules

1. **Knowledge priority**: PRD → codebase → AGENTS.md → Context7 → docs
2. **Memory ownership**: Orchestrator owns memory. It reads memory during planning and seeds the planner's context envelope. Planner never reads memory directly. All other subagents receive cross-session knowledge via the context envelope only. Memory stores: routing hints, pre-wave guards, facts, patterns, gotchas, failure_modes, decisions, conventions. Orchestrator progressively enriches the envelope between waves via `gem-documentation-writer` (`task_type: update_context_envelope`). Subagents return `learnings`; orchestrator dedups and persists only high-confidence, reusable entries.
3. **Orchestrator never executes or validates** work directly — always delegates execution, plan validation, code review, and verification.
4. **Implementer never reviews** own work — reviewer/critic handle verification.
5. **Diagnose-then-fix**: debugger diagnoses → implementer fixes → re-verify. Diagnose-then-fix is enforced at multiple levels:
   - **Planner**: MUST pair every debugger task with a `gem-implementer` task in a later wave; implementer task MUST include `debugger_diagnosis` field populated from debugger output.
   - **Orchestrator**: Pre-wave gate verifies `debugger_diagnosis` is populated with `root_cause`, `target_files`, `fix_recommendations`. Missing → blocked task; confidence < 0.85 → escalate to user.
   - **Implementer**: Bug-Fix Mode validation gate runs first: validates diagnosis fields. Missing → `needs_revision`. Uses `implementation_handoff` as authoritative scope. Minimal change, no redundant RCA.
   - **Reviewer**: Plan review verifies diagnose-then-fix pairing exists for all debugger tasks.
6. **Contract-first**: contract tests written before implementation.
7. **Approval gates**: DevOps tasks require explicit approval for prod deployments.
8. **File-based outputs**: Researcher/Planner save to files, not inline-only results.
9. **Context Envelope Handoff**: Orchestrator must instruct subagents to read `docs/plan/{plan_id}/context_envelope.json` during Init. Envelope is a progressive cache — enriched after each wave. Orchestrator maintains in-memory cache during session; reads from disk once at start, writes after each wave update to avoid stale reads/races.
10. **Standard Output Contract**: All task-level agents (implementer, reviewer, debugger, etc.) return JSON with required fields: `plan_id`, `task_id`, `status`, `confidence`, `failure_type`. Planner returns `plan_id` only (runs before tasks exist). Researcher can return `task_id: null` when running standalone. Orchestrator returns markdown (human-readable).

---

## Release

- **Tool:** Release Please (Manifest Strategy) — fully automated
- **Trigger:** Conventional Commits on `main`; PR titles become commit messages (squash merge)
- **Version bumps:** `feat` → minor · `fix`/`perf` → patch · `BREAKING CHANGE` → major · `docs`/`refactor`/`test`/`chore` → no release
- **Output:** Version auto-bumps in `version.txt` + git tags (`gem-team-v{version}`)
- **Format:** `<type>(<scope>): <description>` — imperative mood, lowercase, ≤72 chars

## Contributing

- **Code:** Fork → branch → PR against `main`
- **Commits:** Conventional Commits (see [Release](#release) above)
- **Agent changes:** Edit `.apm/agents/<agent-name>.agent.md`
- **Docs/plans:** `docs/` directory
- **Config:** `apm.yml` — package manifest
- **PR titles** become the squash-merge commit — keep them conventional
- See `CONTRIBUTING.md` for full details
