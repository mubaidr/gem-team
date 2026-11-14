---
title: Quick Start
description: Run your first Gem Team task in 5 minutes.
navigation:
  icon: i-lucide-rocket
---

## 5-Minute Quick Start

This guide gets you from zero to your first completed task.

### Prerequisites

- Node.js 26+ (for docs site development)
- One of: VS Code Copilot, Claude Code, Cursor, Codex, Gemini, or Windsurf
- A Git repository to work in

---

## Step 1: Install Gem Team (30 seconds)

```bash
# In your project root
curl -sSL https://aka.ms/apm-unix | sh
apm install mubaidr/gem-team --target copilot,claude,cursor
```

> **Using a different tool?** See [full installation guide](/getting-started/installation).

---

## Step 2: Create a Test Task (1 minute)

Create a simple task file to verify everything works:

```bash
# Create a test request
cat > test-task.md << 'EOF'
## Task: Create a hello world function

Create a TypeScript function `greet(name: string): string` that returns "Hello, {name}!".
Write a test first (TDD), then implement.
EOF
```

---

## Step 3: Run Your First Task (2 minutes)

### In VS Code Copilot / GitHub Copilot CLI

```bash
# Using Copilot CLI
copilot chat --agent gem-orchestrator "Read test-task.md and execute the task"
```

### In Claude Code

```bash
# In your project directory
claude
> /gem-orchestrator Read test-task.md and execute the task
```

### In Cursor

1. Open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Type "Gem Team: Orchestrator"
3. Paste the task: "Read test-task.md and execute the task"

---

## Step 4: Verify Results (1 minute)

You should see:

1. **Test created first** (Red phase)
2. **Implementation added** (Green phase)  
3. **Test passing** (Verify)
4. **Status report** showing what was done

```text
## Execution Status

Plan: `20250115-hello-world` | Create a hello world function
Progress: `2/2` tasks (100%)
Waves: Wave 1 (2/2)
Blocked: 0
Next: Complete
```

---

## Step 5: Clean Up (30 seconds)

```bash
rm test-task.md
# Check what was created
ls -la src/  # or your project structure
```

---

## What Just Happened?

| Phase | Agent | Action |
|-------|-------|--------|
| **Plan** | Orchestrator | Classified as TRIVIAL, routed directly |
| **Execute** | Implementer | Wrote test → implemented function → verified |
| **Output** | Orchestrator | Reported status and results |

The Orchestrator automatically:
- Classified your request (TRIVIAL complexity)
- Routed to the Implementer (fast path)
- Applied TDD (test first, then implementation)
- Verified the test passes
- Reported structured status

---

## Common First Tasks to Try

| Task Type | Example Prompt |
|-----------|----------------|
| **New feature** | "Add a user authentication module with login/register" |
| **Bug fix** | "Fix the off-by-one error in `utils/date.ts:42`" |
| **Refactor** | "Extract the validation logic from `api/users.ts` into a reusable module" |
| **Research** | "Find all usages of the deprecated `legacyApi` and suggest replacements" |
| **Documentation** | "Create API documentation for the `/users` endpoints" |

---

## Next Steps

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="p-4 border rounded-lg">
    <h3>🎯 First Steps Walkthrough</h3>
    <p>Detailed guided example with a real feature</p>
    <a href="/getting-started/first-steps" class="text-primary">Continue →</a>
  </div>
  <div class="p-4 border rounded-lg">
    <h3>🧠 Core Concepts</h3>
    <p>Understand the mental model behind Gem Team</p>
    <a href="/getting-started/concepts" class="text-primary">Learn More →</a>
  </div>
  <div class="p-4 border rounded-lg">
    <h3>⚙️ Configuration</h3>
    <p>Customize behavior with .gem-team.yaml</p>
    <a href="/configuration" class="text-primary">Configure →</a>
  </div>
</div>

---

> **Tip**: The quick start uses the **fast path** (TRIVIAL/LOW complexity). For real features, you'll see the full workflow with planning, multiple agents, and quality gates. Continue to [First Steps](/getting-started/first-steps) for a complete example.