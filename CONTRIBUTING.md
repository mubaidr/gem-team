# 🤝 Contributing to Gem Team

Thank you for your interest in contributing! This document explains how to write commits that work with our automated release system.

## 🚀 Release Automation

Gem Team uses **Release Please** with the **Manifest Strategy** to automate releases. This means your commit messages directly determine what goes into each release.

## 📝 Commit Message Format

We follow **Conventional Commits** strictly. Your commit messages must follow this format:

```
<type>(<scope>): <description>

[optional body]
```

### Types

| Type | Description | Release Impact |
|------|-------------|----------------|
| `feat` | New feature or agent | 🚀 Minor release |
| `fix` | Bug fix | 🛠️ Patch release |
| `perf` | Performance improvement | ⚡ Patch release |
| `docs` | Documentation only | 📝 No release (changelog only) |
| `refactor` | Code refactoring | 🧹 No release |
| `test` | Adding/updating tests | 🧪 No release |
| `chore` | Maintenance, deps, build | 🧹 No release |
| `BREAKING CHANGE` | Breaking change | 🔥 Major release |

### Examples

```bash
# New agent feature
git commit -m "feat(orchestrator): add wave-based execution support"

# Bug fix
git commit -m "fix(researcher): resolve issue with semantic search timeout"

# Performance improvement
git commit -m "perf(planner): optimize DAG generation for large task sets"

# Documentation update
git commit -m "docs: update installation instructions"

# Breaking change
git commit -m "feat(api)!: change task result format
BREAKING CHANGE: The task_result structure has changed"
```

## 🔧 Agent-Specific Changes

When modifying specific agents, include the agent name in the scope:

```bash
git commit -m "feat(gem-implementer): add support for mobile implementation"
git commit -m "fix(gem-debugger): improve stack trace parsing"
git commit -m "refactor(gem-planner): simplify wave scheduling"
```

## ⚠️ Important Rules

1. **Use imperative mood** — "add feature" not "added feature" or "adding feature"
2. **Be specific** — "fix auth timeout" not "fix bugs"
3. **Keep subject line under 72 characters**
4. **Use lowercase** for type and description
5. **Reference issues** in body if applicable: "Fixes #123"

## 🏷️ Pull Request Titles

Since we use squash merging, **PR titles become commit messages**. Make sure your PR titles follow the same format!

## ❌ What Won't Work

These commit messages will NOT trigger a release:

- `update readme`
- `fixed stuff`
- `new feature for the app`
- `Merge branch 'main' into feature/xyz`

---

**Happy Contributing! 🎉**
