# AGENTS.md

Static conventions, rules, and agent definitions for the Gem Team multi-agent framework. Requires approval for changes.

> **Agent files:** `.apm/agents/*.agent.md` (16 agents)

---

## Core

- **`gem-orchestrator`** — Team lead. Orchestrates research → plan → implement → verify. Never executes directly; delegates to sub-agents. User-facing primary agent.
  - Args: `objective`, `plan_id` (if resuming)
  - Sources: PRD, AGENTS.md

- **`gem-researcher`** — Codebase exploration. Discovers patterns, dependencies, architecture. Self-validating cache.
  - Args: `plan_id`, `objective`, `focus_area`, `task_clarifications[]`

- **`gem-planner`** — DAG execution plans. Decomposes tasks, schedules waves, analyzes risk. Outputs `plan.yaml`.
  - Args: `plan_id`, `objective`, `task_clarifications`

- **`gem-implementer`** — TDD implementation (Red-Green-Refactor). Features, bugs, refactoring. Never reviews own work.
  - Args: `task_id`, `plan_id`, `plan_path`, `task_definition` (+ `tech_stack`)

## Quality & Review

- **`gem-reviewer`** — Zero-hallucination filter. Security auditing, OWASP scanning, PRD compliance, code review.
  - Args: `task_id`, `plan_id`, `plan_path`, `review_scope` (plan\|task\|wave), review criteria

- **`gem-critic`** — Challenges assumptions, finds edge cases, detects over-engineering and logic gaps.
  - Args: `plan_id`, `plan_path`, `target`

- **`gem-debugger`** — Root-cause analysis, stack-trace diagnosis, regression bisection, error reproduction.
  - Args: `task_id`, `plan_id`, `plan_path`, `error_context` (message, stack trace, failing test)

- **`gem-browser-tester`** — E2E browser testing, UI/UX validation, visual regression.
  - Args: `task_id`, `plan_id`, `plan_path`, `validation_matrix` or `flow_definitions`

- **`gem-code-simplifier`** — Refactoring specialist. Removes dead code, reduces complexity, consolidates duplicates.
  - Args: `task_id`, `scope` (single_file\|multiple_files\|project_wide), `targets`, `focus` (dead_code\|complexity\|duplication\|naming\|all)

## Skill Management

- **`gem-skill-creator`** — Pattern-to-skill extraction. Creates `SKILL.md` files from high-confidence learnings.
  - Args: `task_id`, `plan_id`, `plan_path`, `patterns`, `source_task_id`

## Specialized

- **`gem-devops`** — Infrastructure deployment, CI/CD pipelines, container management. Idempotent with approval gates.
  - Args: `task_id`, `plan_id`, `plan_path`, `task_definition`, `environment` (dev\|staging\|prod), `requires_approval`, `devops_security_sensitive`

- **`gem-documentation-writer`** — Technical docs, READMEs, API docs, diagrams, walkthroughs.
  - Args: `task_id`, `plan_id`, `plan_path`, `task_definition` (+ `task_type`, `audience`, `coverage_matrix`)

- **`gem-designer`** — UI/UX design. Layouts, themes, color schemes, design systems, accessibility (WCAG).
  - Args: `task_id`, `plan_id`, `plan_path`, `mode` (create\|validate), `scope` (component\|page\|layout\|design_system), `target`, `context`, `constraints`

- **`gem-implementer-mobile`** — Mobile implementation. React Native, Expo, Flutter with TDD.
  - Args: `task_id`, `plan_id`, `plan_path`, `mobile_task_definition`

- **`gem-designer-mobile`** — Mobile UI/UX. HIG, Material Design, safe areas, touch targets.
  - Args: `task_id`, `plan_id`, `plan_path`, `mode` (create\|validate), `scope` (component\|screen\|navigation\|design_system), `target`, `context`, `constraints`

- **`gem-mobile-tester`** — Mobile E2E testing. Detox, Maestro, iOS/Android simulators.
  - Args: `task_id`, `plan_id`, `plan_path`, `mobile_test_definition`

---

## Key Rules

1. **Knowledge priority**: PRD → codebase → AGENTS.md → Context7 → docs
2. **Memory tiers**: Tier-1 (orchestrator/researcher/planner) — always R/W. Tier-2 (implementer/debugger/simplifier) — on init. Tier-3 (reviewer/critic/doc) — rarely.
3. **Orchestrator never executes** code directly — always delegates.
4. **Implementer never reviews** own work — reviewer/critic handle verification.
5. **Diagnose-then-fix**: debugger diagnoses → implementer fixes → re-verify.
6. **Contract-first**: contract tests written before implementation.
7. **Approval gates**: DevOps tasks require explicit approval for prod deployments.
8. **File-based outputs**: Researcher/Planner save to YAML, not inline JSON.

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
