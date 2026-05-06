# Installation Test Checklist (Linux: openSUSE Tumbleweed)

This is a simple, practical checklist to verify each installation option documented in `README.md`.

## Prereqs (One-Time)

1. Ensure the tool CLIs exist:
   - `apm --version`
   - `copilot --version`
   - `claude --version`
   - `opencode --version`
2. Ensure you are in a clean test folder (recommended):
   - Use a fresh clone of this repo, or a temporary workspace.

## A) APM (Recommended Baseline)

1. From repo root:
   - `apm install`
2. Verify:
   - `ls -la apm.lock.yaml`
3. Verify APM produced outputs for targets that exist in your repo:
   - `ls -la .github .claude .cursor .opencode 2>/dev/null || true`

## B) GitHub Copilot CLI Plugin Install

1. Install from marketplace:
   - `copilot plugin install gem-team@awesome-copilot`
2. Verify install:
   - `copilot plugin list`
3. Verify files landed (location is managed by Copilot CLI):
   - `ls -la ~/.copilot/installed-plugins/awesome-copilot/ 2>/dev/null || true`

Optional: local-path install test

1. From the repo root:
   - `copilot plugin install .`
2. Verify:
   - `copilot plugin list`

## C) Claude Code Local Plugin Load (No Marketplace Needed)

1. Fresh clone:
   - `git clone https://github.com/mubaidr/gem-team.git && cd gem-team`
2. Start Claude Code with local plugin:
   - `claude --plugin-dir .`
3. In the Claude session, verify plugin loaded:
   - `/help`
   - `/agents`
4. Make a tiny edit to a plugin file (for example, a description field), then reload:
   - `/reload-plugins`

## D) OpenCode Plugins (Project and Global)

Project-level plugin directory (preferred for team sharing)

1. Ensure directory exists:
   - `mkdir -p .opencode/plugins`
2. Add a minimal plugin (use an example from the OpenCode plugins docs) into:
   - `.opencode/plugins/<your-plugin>.ts` or `.opencode/plugins/<your-plugin>.js`
3. Start OpenCode in this repo and confirm the plugin behavior triggers.

Global plugin directory (applies across projects)

1. Ensure directory exists:
   - `mkdir -p ~/.config/opencode/plugins`
2. Add the same plugin file into:
   - `~/.config/opencode/plugins/`
3. Start OpenCode in any repo and confirm it triggers globally.

## E) Cursor (Project Rules)

1. Ensure directory exists:
   - `mkdir -p .cursor/rules`
2. Add one small rule file (example):
   - `.cursor/rules/00-project-basics.mdc`
3. In Cursor, confirm the rule is detected for the project and influences Agent behavior.

## Notes

- Tool-managed directories (Copilot CLI, Claude Code) are not meant for manual editing. Prefer the tool install commands.
- If something fails, capture the CLI output and check the relevant tool’s “config directory” documentation first.
