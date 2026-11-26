---
title: Installation
description: Install Gem Team for your AI coding tool via APM or marketplace.
navigation:
  icon: i-lucide-download
seo:
  title: Installation - Gem Team
  description: Install Gem Team for VS Code Copilot, Claude Code, Cursor, Codex, Gemini, Windsurf, and OpenCode via APM.
  ogTitle: Installation - Gem Team
  ogDescription: Install Gem Team for your AI coding tool via APM or marketplace.
---

## Choose Your Installation Method

### Option 1: APM (Recommended) - Universal

Works across all supported tools with a single command.

```bash
# Install APM if not already installed
curl -sSL https://aka.ms/apm-unix | sh

# Install Gem Team for your tool(s)
apm install mubaidr/gem-team --target copilot,claude,cursor,opencode,codex,gemini,windsurf
```

**Why APM?**

- Single command for all tools
- Version pinning with `apm.lock.yaml`
- Reproducible across environments and CI
- Automatic updates with `apm update`

---

### Option 2: Tool-Specific Marketplace

<details>
<summary><strong>GitHub Copilot (VS Code / CLI)</strong></summary>

```bash
# VS Code: Extensions → Search "Gem Team" → Install
# Or via CLI:
copilot plugin marketplace add mubaidr/gem-team
copilot plugin install gem-team@gem-team
```

</details>

<details>
<summary><strong>Claude Code</strong></summary>

```bash
/plugin marketplace add mubaidr/gem-team
/plugin install gem-team@gem-team
/reload-plugins
```

</details>

<details>
<summary><strong>Cursor</strong></summary>

```bash
# Cursor: Settings → Extensions → Search "Gem Team" → Install
# Or via command palette: "Extensions: Install Extension" → "Gem Team"
```

</details>

<details>
<summary><strong>OpenCode</strong></summary>

```bash
opencode plugin add mubaidr/gem-team
```

</details>

<details>
<summary><strong>Codex CLI</strong></summary>

```bash
codex plugin add mubaidr/gem-team
```

</details>

<details>
<summary><strong>Gemini CLI</strong></summary>

```bash
gemini plugin add mubaidr/gem-team
```

</details>

<details>
<summary><strong>Windsurf / Cascade</strong></summary>

```bash
# Windsurf: Extensions panel → Search "Gem Team" → Install
```

</details>

---

## Verify Installation

After installation, verify Gem Team is active:

```bash
# Check APM installation
apm list | grep gem-team

# For Copilot
copilot plugin list | grep gem-team

# For Claude Code
/plugin list | grep gem-team
```

You should see `gem-team` listed with its version.

### Verification Scenarios

| Scenario                              | Expected Result                   |
| ------------------------------------- | --------------------------------- |
| `apm list                             | grep gem-team`                    | Shows `gem-team` with version |
| `copilot plugin list                  | grep gem-team`                    | Lists `gem-team` as active    |
| `/gem-orchestrator` command available | Orchestrator responds to requests |
| `apm run check`                       | Package validation passes         |

### Tool-Specific Verification

**Copilot (VS Code):**

1. Open Command Palette (`Ctrl+Shift+P`)
2. Search "Gem Team" - should show Orchestrator command
3. Run: `copilot chat --agent gem-orchestrator "Hello"`

**Claude Code:**

1. Run `/plugin list` - should include `gem-team`
2. Run: `/gem-orchestrator "Hello"`

**Cursor:**

1. Settings → Extensions → "Gem Team" should be installed
2. Command Palette → "Gem Team: Orchestrator"

If verification fails for any tool, restart the IDE/terminal and retry.

---

## Project-Scoped vs Global

| Scope              | Use When                                  | Command                                                           |
| ------------------ | ----------------------------------------- | ----------------------------------------------------------------- |
| **Project-scoped** | Team projects, CI/CD, reproducible builds | `apm install mubaidr/gem-team --target ...` (run in project root) |
| **Global**         | Personal use, quick experiments           | `apm install -g mubaidr/gem-team --target ...`                    |

**Best practice**: Use project-scoped for teams. Commit `apm.yml` and `apm.lock.yaml` to version control.

```bash
# Project-scoped (recommended for teams)
cd your-project
apm install mubaidr/gem-team --target copilot,claude,cursor

# This creates apm.yml and apm.lock.yaml - commit both
git add apm.yml apm.lock.yaml
```

---

## Pinning Versions

For reproducible builds, pin to a specific release tag:

```bash
# View available tags
apm search mubaidr/gem-team --tags

# Pin to specific version
apm install 'mubaidr/gem-team#gem-team-v1.2.3' --target copilot,claude,cursor
```

Release tags follow the pattern: `gem-team-v<version>` (e.g., `gem-team-v1.2.3`).

---

## Updating

```bash
# Update project installation
apm update mubaidr/gem-team --yes

# Update global installation
apm update -g mubaidr/gem-team --yes

# Check APM CLI version (without updating)
apm self-update --check
```

---

## Troubleshooting

### Installation fails with "permission denied"

```bash
# Ensure APM is in PATH
export PATH="$HOME/.apm/bin:$PATH"
# Or run with full path
~/.apm/bin/apm install mubaidr/gem-team --target copilot
```

### Tool doesn't recognize Gem Team

1. Restart your IDE/terminal
2. For VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"
3. For Claude Code: `/reload-plugins`

### Version conflicts

```bash
# Clean reinstall
apm uninstall mubaidr/gem-team
apm install mubaidr/gem-team --target copilot,claude,cursor
```

---

## Next Steps

- [Quick Start](/getting-started/quick-start) - Run your first task in 5 minutes
- [Core Concepts](/getting-started/concepts) - Understand the mental model
- [Configuration](/configuration) - Customize behavior with `.gem-team.yaml`
