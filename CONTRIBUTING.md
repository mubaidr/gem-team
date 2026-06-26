# 🤝 Contributing to Gem Team

## 📝 Commits (Conventional Commits)

```
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

**Release Please** (Manifest Strategy) on `main`. PR titles become squash-merge commits - keep them conventional. Version auto-bumps in `version.txt` + git tags.

## 🏗️ Agent Changes

- Edit `.apm/agents/<agent-name>.agent.md`
- Structure:
  ```txt
  ---                    # Frontmatter: name, description, args
  # Role / # Expertise   # Identity & core competencies
  # Knowledge Sources    # Prioritized references
  # Workflow             # Init → Analyze → Self-Critique → Handle Failure → Output
  # Output Format        # Return JSON schema
  # Rules                # Execution, Constitutional, Anti-Patterns, Directives
  ```

## ✅ Quick Checklist

1. Conventional commit message
2. Push to branch
3. PR with conventional title
4. Merge → Release Please auto-releases

---

**Happy Contributing! 🎉**
