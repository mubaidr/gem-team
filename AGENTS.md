# AGENTS.md

Static conventions, rules, and agent definitions for the Gem Team multi-agent framework. Requires approval for changes.

> Agent files: `.apm/agents/*.agent.md` (16 agents)

---

## Core

- `gem-orchestrator` — Team lead. Orchestrates plan → implement → verify. Never executes or validates work directly; delegates to sub-agents. User-facing primary agent.
  - Mode: `primary` (user-invocable)
  - Argument-hint: `Describe your objective or task. Include plan_id if resuming.`
  - Sources: PRD, AGENTS.md, Memory, `docs/plan/{plan_id}/plan.yaml`
  - Workflow: Phase 0 (Init & Clarify) → routing → planning → execution → verification

- `gem-planner` — DAG execution plans. Decomposes tasks, schedules waves, analyzes risk. Outputs `plan.yaml`. Special seed interface — receives direct objective + memory seed from orchestrator.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Plan_id, objective.`
  - Sources: PRD, AGENTS.md, Official docs, Memory seed from orchestrator

- `gem-researcher` — Codebase exploration. Discovers patterns, dependencies, architecture. Returns structured JSON findings.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter plan_id, objective, focus_area (optional), and context_envelope_snapshot.`

- `gem-implementer` — TDD code implementation (features, bugs, refactoring). Never reviews own work.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter task_id, plan_id, plan_path, and task_definition with tech_stack to implement.`
  - Sources: PRD, AGENTS.md, Official docs, `docs/DESIGN.md` (UI tasks), `docs/skills/*/SKILL.md`

## Quality & Review

- `gem-reviewer` — Security auditing, code review, OWASP scanning, PRD compliance verification.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter task_id, plan_id, plan_path, review_scope (plan|wave), and review criteria for compliance and security audit.`
  - Review scopes: `plan` | `wave`
- `gem-critic` — Challenges assumptions, finds edge cases, detects over-engineering and logic gaps.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter plan_id, plan_path, and target to critique.`
- `gem-debugger` — Root-cause analysis, stack-trace diagnosis, regression bisection, error reproduction.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter task_id, plan_id, plan_path, and error_context (error message, stack trace, failing test) to diagnose.`
- `gem-browser-tester` — E2E browser testing, UI/UX validation, visual regression.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter task_id, plan_id, plan_path, and test validation_matrix or flow definitions.`
- `gem-code-simplifier` — Refactoring specialist. Removes dead code, reduces complexity, consolidates duplicates.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter task_id, scope (single_file|multiple_files|project_wide), targets (file paths/patterns), and focus (dead_code|complexity|duplication|naming|all).`

## Skill & Docs

- `gem-skill-creator` — Pattern-to-skill extraction. Creates `SKILL.md` files from high-confidence learnings.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter task_id, plan_id, plan_path, patterns, source_task_id.`
- `gem-documentation-writer` — Technical docs, READMEs, API docs, diagrams, walkthroughs.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter task_id, plan_id, plan_path, task_definition with task_type (documentation|update|prd|agents_md|update_context_envelope), audience, coverage_matrix.`

## Specialized

- `gem-devops` — Infrastructure deployment, CI/CD pipelines, container management. Idempotent with approval gates.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter task_id, plan_id, plan_path, task_definition, environment (dev|staging|prod), requires_approval flag, and devops_security_sensitive flag.`
- `gem-designer` — UI/UX design. Layouts, themes, color schemes, design systems, accessibility (WCAG).
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter task_id, plan_id (optional), plan_path (optional), mode (create|validate), scope (component|page|layout|design_system), target, context (framework, library), and constraints (responsive, accessible, dark_mode).`
- `gem-implementer-mobile` — Mobile implementation. React Native, Expo, Flutter with TDD.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter task_id, plan_id, plan_path, and mobile task_definition to implement for iOS/Android.`
- `gem-designer-mobile` — Mobile UI/UX. HIG, Material Design, safe areas, touch targets.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter task_id, plan_id (optional), plan_path (optional), mode (create|validate), scope (component|screen|navigation|design_system), target, context (framework, library), and constraints (platform, responsive, accessible, dark_mode).`
- `gem-mobile-tester` — Mobile E2E testing. Detox, Maestro, iOS/Android simulators.
  - Mode: `subagent` (hidden)
  - Argument-hint: `Enter task_id, plan_id, plan_path, and mobile test definition to run E2E tests on iOS/Android.`

## Key Rules

1. Knowledge priority: PRD → codebase → AGENTS.md → Context7 → docs
2. Memory ownership: Orchestrator owns memory. It reads memory during planning and seeds the planner's context envelope. Planner never reads memory directly. All other subagents receive cross-session knowledge via the context envelope only. Memory stores: routing hints, pre-wave guards, facts, patterns, gotchas, failure_modes, decisions, conventions. Orchestrator progressively enriches the envelope between waves via `gem-documentation-writer` (`task_type: update_context_envelope`). Subagents return `learnings`; orchestrator dedups and persists only high-confidence, reusable entries.
3. Orchestrator never executes or validates work directly — always delegates execution, plan validation, code review, and verification.
4. Implementer never reviews own work — reviewer/critic handle verification.
5. Diagnose-then-fix: debugger diagnoses → implementer fixes → re-verify. Diagnose-then-fix is enforced at multiple levels:
   - Planner: MUST pair every debugger task with a `gem-implementer` task in a later wave; implementer task MUST include `debugger_diagnosis` field populated from debugger output.
   - Orchestrator: Pre-wave gate verifies `debugger_diagnosis` is populated with `root_cause`, `target_files`, `fix_recommendations`. Missing → blocked task; confidence < 0.85 → escalate to user.
   - Implementer: Bug-Fix Mode validation gate runs first: validates diagnosis fields. Missing → `needs_revision`. Uses `implementation_handoff` as authoritative scope. Minimal change, no redundant RCA.
   - Reviewer: Plan review verifies diagnose-then-fix pairing exists for all debugger tasks.
6. Contract-first: contract tests written before implementation.
7. Approval gates: DevOps tasks require explicit approval for prod deployments.
8. File-based outputs: Researcher/Planner save to files, not inline-only results.
9. Context Envelope Handoff: Orchestrator must instruct subagents to read `docs/plan/{plan_id}/context_envelope.json` during Init. Envelope is a progressive cache — enriched after each wave. Orchestrator maintains in-memory cache during session; reads from disk once at start, writes after each wave update to avoid stale reads/races.
10. Standard Output Contract: All task-level agents (implementer, reviewer, debugger, etc.) return JSON with required fields: `plan_id`, `task_id`, `status`, `confidence`, `failure_type`. Planner returns `plan_id` only (runs before tasks exist). Researcher can return `task_id: null` when running standalone. Orchestrator returns markdown (human-readable).

---

## Release

- Tool: Release Please (Manifest Strategy) — fully automated
- Trigger: Conventional Commits on `main`; PR titles become commit messages (squash merge)
- Version bumps: `feat` → minor · `fix`/`perf` → patch · `BREAKING CHANGE` → major · `docs`/`refactor`/`test`/`chore` → no release
- Output: Version auto-bumps in `version.txt` + git tags (`gem-team-v{version}`)
- Format: `<type>(<scope>): <description>` — imperative mood, lowercase, ≤72 chars

## Contributing

- Code: Fork → branch → PR against `main`
- Commits: Conventional Commits (see [Release](#release) above)
- Agent changes: Edit `.apm/agents/<agent-name>.agent.md`
- Docs/plans: `docs/` directory
- Config: `apm.yml` — package manifest
- PR titles become the squash-merge commit — keep them conventional
- See `CONTRIBUTING.md` for full details
