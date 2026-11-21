---
title: Quick Start
description: Run your first Gem Team task in 5 minutes.
navigation:
  icon: i-lucide-rocket
seo:
  title: Quick Start — Gem Team
  description: Install Gem Team, run your first task, and verify results in 5 minutes.
  ogTitle: Quick Start — Gem Team
  ogDescription: Install Gem Team and run your first task.
---


## 5-Minute Quick Start

Go from zero to your first completed task with Gem Team.

### Prerequisites

- A Git repository (any project)
- One of: VS Code Copilot, Claude Code, Cursor, Codex, Gemini, Windsurf, or OpenCode

---

## Step 1: Install Gem Team

In your project root:

```bash
curl -sSL https://aka.ms/apm-unix | sh
apm install mubaidr/gem-team --target copilot,claude,cursor
```

> Using a different tool? See [full installation guide](/getting-started/installation).

Verify:

```bash
apm list | grep gem-team
```

You should see `gem-team` listed with a version.

---

## Step 2: Create Your First Task

Create a task file describing what you want:

```bash
cat > my-task.md << 'EOF'
## Task: Add a greeting helper

Create a TypeScript function `greet(name: string): string` in `src/utils/greet.ts`
that returns `Hello, {name}!`. Write a failing test first (TDD), then implement,
then verify the test passes.
EOF
```

---

## Step 3: Run It

### VS Code Copilot / Copilot CLI

```bash
copilot chat --agent gem-orchestrator "Read my-task.md and execute the task"
```

### Claude Code

```bash
claude
> /gem-orchestrator Read my-task.md and execute the task
```

### Cursor

1. Open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Select "Gem Team: Orchestrator"
3. Paste: `Read my-task.md and execute the task`

---

## Step 4: Verify the Result

You should see a structured status report:

```text
## Execution Status

Plan: `20261121-greeting-helper` | Add a greeting helper
Progress: `1/1` tasks (100%)
Waves: Wave 1 (1/1)
Blocked: 0
Next: Complete
```

And new files in your project:

```
src/utils/greet.ts          # implementation
src/utils/greet.test.ts     # TDD test (written first)
```

---

## Step 5: Clean Up

```bash
rm my-task.md
```

---

## What Just Happened?

1. **Phase 0** — Orchestrator classified the task (TRIVIAL, fast path).
2. **Phase 1** — Routed directly to the Implementer agent (no planner needed).
3. **Phase 3** — Implementer wrote a failing test (Red), then minimal code to pass (Green), then verified (Refactor).
4. **Phase 4** — Structured status report; findings promoted to session memory.

No persistent `plan.yaml` was created — TRIVIAL tasks use the fast path without plan artifacts.

---

## Common First Tasks

| Type | Example |
|------|---------|
| New feature | "Add a `/api/users/search` endpoint with filtering and pagination" |
| Bug fix | "Fix the off-by-one error in `src/utils/date.ts:42`" |
| Refactor | "Extract validation logic from `api/users.ts` into a reusable module" |
| Research | "Find all usages of the deprecated `legacyApi` and suggest replacements" |
| Documentation | "Write API docs for the `/users` endpoints" |

---

## Next Steps

| Want to... | Go to |
|------------|-------|
| Build a real feature end-to-end | [First Steps Walkthrough](/getting-started/first-steps) |
| Understand the mental model | [Core Concepts](/getting-started/concepts) |
| Customize behavior | [Configuration](/configuration) |
| Install for another tool | [Compatible Tools](/resources/compatible-tools) |

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| `gem-orchestrator not found` | Gem Team not installed for this tool | `apm install mubaidr/gem-team --target <tool>` |
| `plan_id not found` | Exact `plan_id` required; no fuzzy matching | Use the exact ID from the original run |
| No tests written | TDD not triggered | Check acceptance criteria are testable |
| Review gate keeps failing | Criteria don't match implementation | Align criteria, then re-run |

> Tip: TRIVIAL tasks use the fast path (no planner, no persistent plan). Real features with multiple files or risk signals trigger the full MEDIUM/HIGH workflow. Continue to [First Steps](/getting-started/first-steps) for a complete example.