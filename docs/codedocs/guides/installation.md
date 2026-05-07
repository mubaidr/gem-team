---
title: "Installation"
description: "Install Gem Team into supported hosts and verify that the agent directory is available."
---

Gem Team ships as a plugin repository, so installation is about registering the repo with a host that knows how to load agent specs. The README currently documents APM, GitHub Copilot, Claude Code, OpenCode, Cursor, and manual-copy flows, and the repo includes matching manifests such as `plugin.json`, `.github/plugin/plugin.json`, and `apm.yml`.

## Problem

You want the same agent team available across different tools without maintaining a separate plugin definition for each one.

## Solution

Use the repo as the single source of truth and let each host load `.apm/agents` through its own manifest or install flow.

<Steps>
<Step>
### Clone the repository

```bash
git clone https://github.com/mubaidr/gem-team.git
cd gem-team
```

This gives every host the same agent directory and the same top-level metadata, including version, description, repository URL, and keywords.
</Step>
<Step>
### Pick your host

" "OpenCode"]}>
<Tab value="APM">
```bash
apm install mubaidr/gem-team
```

Or from a repo checkout:

```bash
apm install
```
</Tab>
<Tab value="GitHub Copilot CLI">
```bash
copilot plugin install gem-team@awesome-copilot
```

Optional local-path test:

```bash
copilot plugin install .
```
</Tab>
<Tab value="Claude Code">
```bash
claude --plugin-dir .
```

After editing plugin files:

```text
/reload-plugins
```
</Tab>
<Tab value="Cursor">
```text
/add-plugin /absolute/path/to/gem-team
```
</Tab>
<Tab value="OpenCode">
```text
Add the plugin to the opencode plugin configuration or copy it into
~/.config/opencode/plugins/
```
</Tab>
</Tabs>
</Step>
<Step>
### Verify the installation

Use the checks from `INSTALLATION_TESTS.md`:

```bash
apm --version
copilot --version
claude --version
opencode --version
```

Then confirm the agent team is visible in the host, for example by listing agents or opening the relevant plugin directory.
</Step>
</Steps>

## Runnable verification example

After loading the plugin, ask the orchestrator for a plan:

```text
Use gem-orchestrator.
Objective: review the auth middleware for edge cases and document the findings.
```

If installation succeeded, the host should expose the orchestrator and the underlying internal agents. In Claude Code, the README recommends checking `/help` and `/agents` after starting with `claude --plugin-dir .`.

## Why this works

The manifests all point back to the same agent directory:

- `plugin.json` uses `"agents": "./.apm/agents"`
- `.claude-plugin/plugin.json` uses `"agents": "../.apm/agents"`
- `.cursor-plugin/plugin.json` uses `"agents": "../.apm/agents"`
- `.github/plugin/plugin.json` uses `"agents": "../../.apm/agents"`

That relative-path layout is the portability layer. Host-specific metadata changes, but the actual agent behavior remains centralized.

<Callout type="info">Use tool-managed install locations for deployment, not for editing. The README and `INSTALLATION_TESTS.md` both treat directories such as `~/.copilot/installed-plugins/` and `~/.claude/plugins/` as managed caches rather than working trees.</Callout>

For a fuller operational walkthrough after installation, continue to [Running A Feature Task](/docs/guides/running-a-feature-task).
