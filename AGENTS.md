# AGENTS.md

## Project Overview

Gem Team turns AI coding into an engineering process. It provides agent definitions that enforce good software engineering: optimizing cost, time, and quality.

### Key Features

- **Quality by Default**: TDD, code reviews, and security audits happen automatically
- **Smart & Efficient**: Fewer tokens, lower costs, no context bloat
- **Works With Your Tools**: Copilot, Claude, Cursor, Codex, Gemini, Windsurf
- **Learns & Improves**: Remembers what works, extracts reusable skills

## Setup Commands

```bash
# Install APM (Agent Package Manager)
curl -sSL https://aka.ms/apm-unix | sh

# Install gem-team into current project
apm install mubaidr/gem-team --target copilot,claude,cursor,opencode,codex,gemini,windsurf

# Documentation site development
cd docs/src
npm install
npm run dev
```

## Build and Test Commands

### Documentation Site

```bash
cd docs/src

# Development server
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run preview

# Linting
npm run lint

# Type checking
npm run typecheck

# Format code
npm run format
```

### Agent Changes

```bash
# Edit agent definitions in
.apm/agents/<agent-name>.agent.md
```

Agent file structure:

```text
---                    # Frontmatter: name, description, args
# Role / # Expertise   # Identity & core competencies
# Knowledge Sources    # Prioritized references
# Workflow             # Init → Analyze → Self-Critique → Handle Failure → Output
# Output Format        # Return JSON schema
# Rules                # Execution, Constitutional, Anti-Patterns, Directives
```

### Agent Documentation

Agent documentation lives in `docs/src/content/3.agents/`:

```bash
# Edit agent docs
docs/src/content/3.agents/1.index.md    # Main agent catalog
```

Documentation guidelines:

- Update `1.index.md` when adding/modifying agents
- Include agent name, role, and key capabilities
- Add model routing recommendations
- Reference workflow phases and integration points

## Code Style Guidelines

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier with default settings
- **Linting**: ESLint with @nuxt/eslint config
- **Vue**: Follow Nuxt UI conventions

### Commit Messages (Conventional Commits)

```text
<type>(<scope>): <description>

[optional body]
```

| Type                             | Release Impact |
| -------------------------------- | -------------- |
| `feat`                           | Minor release  |
| `fix` / `perf`                   | Patch release  |
| `BREAKING CHANGE`                | Major release  |
| `docs`/`refactor`/`test`/`chore` | No release     |

**Rules:**

- Use imperative mood
- Lowercase
- ≤72 characters
- Specific scope (e.g., `gem-implementer`)

## Testing Instructions

### Documentation Site Testing

1. Run `npm run lint` to check code style
2. Run `npm run typecheck` to verify TypeScript
3. Run `npm run build` to ensure production build works
4. Test responsive design on different screen sizes
5. Verify accessibility with screen readers

### Agent Testing

1. Test agent responses with sample inputs
2. Verify JSON output format compliance
3. Check integration with orchestrator workflow
4. Test error handling and edge cases

## Security Considerations

- **API Keys**: Never commit API keys or secrets
- **Dependencies**: Regularly update dependencies for security patches
- **Input Validation**: Validate all user inputs in agent interactions
- **Rate Limiting**: Implement rate limiting for API calls
- **Secrets Management**: Use environment variables for sensitive data

## Dev Environment Tips

- **Node.js**: Use Node.js 26+ for development
- **Package Manager**: Use npm for documentation site
- **IDE**: VS Code recommended with Vue extensions
- **Git**: Use conventional commits for automated releases
- **APM**: Use `apm install` for agent package management

## PR Instructions

### Title Format

```text
[<project_name>] <Title>
```

Example: `[gem-team] Add new debugger agent`

### Checklist

1. Run `npm run lint` before committing
2. Run `npm run typecheck` to verify types
3. Run `npm run build` to ensure build works
4. Add tests for new functionality
5. Update documentation if needed
6. Use conventional commit messages

### Review Process

1. Automated CI checks must pass
2. Code review required for all changes
3. Test coverage must be maintained
4. Documentation must be updated for new features

## Release Automation

- **Release Please** on `main` branch
- PR titles become squash-merge commits
- Version auto-bumps in `version.txt` + git tags
- Conventional commits trigger automated releases

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version (26+ required)
2. **Lint errors**: Run `npm run format` then `npm run lint`
3. **Type errors**: Run `npm run typecheck` to identify issues
4. **Dev server issues**: Clear `.nuxt` cache and restart

### Getting Help

- Check GitHub Issues for known problems
- Review documentation at <https://mubaidr.github.io/gem-team/>
- Follow contribution guidelines in CONTRIBUTING.md
