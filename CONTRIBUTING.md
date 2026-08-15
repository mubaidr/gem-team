# 🤝 Contributing to Gem Team

## 📝 Commits (Conventional Commits)

```text
<type>(<scope>): <description>

[optional body]
```

| Type                             | Release Impact |
| -------------------------------- | -------------- |
| `feat`                           | 🚀 Minor       |
| `fix` / `perf`                   | 🛠️ Patch       |
| `BREAKING CHANGE`                | 🔥 Major       |
| `docs`/`refactor`/`test`/`chore` | 📝 No release  |

**Rules:** imperative mood · lowercase · ≤72 chars · specific scope (e.g., `gem-implementer`)

## 🚀 Release Automation

**Release Please** (Manifest Strategy) runs on `main`. PR titles become
squash-merge commits, so keep them conventional. The release PR bumps
`apm.yml` and `version.txt`; merging it creates the `gem-team-v<version>` tag.
The release workflow then validates the package and attaches the generated ZIP
plus SHA-256 checksum to the GitHub Release.

If automatic asset upload fails after the release is created, run the
**Publish Release Assets** workflow manually with that release tag.

Generated marketplace metadata is committed, while `build/` remains ignored.
After changing `apm.yml` or publishable package metadata, run:

```bash
apm pack
apm run check
git add .claude-plugin/marketplace.json
```

## 🏗️ Agent Changes

- Edit `.apm/agents/<agent-name>.agent.md`
- Structure:

  ```txt
  ---                    # Frontmatter: name, description, args
  # Role / # Expertise   # Identity & core competencies
  # Knowledge Sources    # Prioritized references
  # Workflow             # Init -> Analyze -> Self-Critique -> Handle Failure -> Output
  # Output Format        # Return JSON schema
  # Rules                # Execution, Constitutional, Anti-Patterns, Directives
  ```

## ✅ Quick Checklist

1. Run `apm run check` for package, agent, or skill changes
2. Run the documentation lint, typecheck, and build when docs change
3. Use a conventional commit and PR title
4. Commit regenerated `.claude-plugin/marketplace.json` when it changes
5. Merge; Release Please creates the release PR and publishes after that PR merges

---

## Happy Contributing! 🎉
