---
title: Model Routing Configuration
description: Tier-based model selection for delegated agents with provider examples.
navigation:
  icon: i-lucide-cpu
seo:
  title: Model Routing Configuration - Gem Team
  description: Tier-based model selection configuration for delegated agents with provider examples.
  ogTitle: Model Routing Configuration - Gem Team
  ogDescription: Tier-based model selection configuration.
---

## Configuration

```yaml
model_routing:
  enabled: true
  tiers:
    premium: "claude-4 (anthropic)"
    explore: "claude-3.5-haiku (anthropic)"
```

## Settings

| Setting                       | Type    | Default                 | Description                                    |
| ----------------------------- | ------- | ----------------------- | ---------------------------------------------- |
| `model_routing.enabled`       | boolean | `false`                 | Enable tier-based model selection              |
| `model_routing.tiers.premium` | string  | `gpt-5.6-sol (openai)`  | Model for planning, diagnosis, review          |
| `model_routing.tiers.explore` | string  | `gpt-5.6-luna (openai)` | Model for exploration, implementation, testing |

## Agent Tier Assignments

### Premium Tier (Reasoning-Heavy)

- **Planner** - Wave planning, dependency validation, YAGNI/KISS
- **Debugger** - Root cause analysis, regression bisection
- **Reviewer** - Quality/security review, critic mode evaluation

### Explore Tier (Fast Execution)

- **Researcher** - Codebase exploration, pattern discovery
- **Implementer** - TDD implementation, feature development
- **Browser Tester** - UI/E2E testing, visual regression
- **Mobile Tester** - iOS/Android E2E testing
- **DevOps** - Infrastructure, CI/CD, deployment
- **Documentation** - Tech docs, API docs, diagrams
- **Skill Creator** - Pattern extraction, skill packaging
- **Code Simplifier** - Refactoring, dead code removal

## Provider Examples

| Provider       | Premium Models                      | Explore Models                      |
| -------------- | ----------------------------------- | ----------------------------------- |
| **OpenAI**     | `gpt-5.6-sol`, `o1-pro`, `gpt-4o`   | `gpt-5.6-luna`, `gpt-4o-mini`       |
| **Anthropic**  | `claude-4`, `claude-3.5-sonnet`     | `claude-3.5-haiku`                  |
| **Google**     | `gemini-2.5-pro`                    | `gemini-2.5-flash`                  |
| **OpenRouter** | `openrouter/auto` (premium routing) | `openrouter/auto` (explore routing) |

## Format

Values use `model (provider)` format:

```yaml
tiers:
  premium: "claude-4 (anthropic)"
  explore: "claude-3.5-haiku (anthropic)"
```

## Cost Impact Example

| Workflow                 | Without Routing | With Routing              | Savings |
| ------------------------ | --------------- | ------------------------- | ------- |
| MEDIUM feature (5 tasks) | 5 × premium     | 1 × premium + 4 × explore | ~60%    |
| HIGH feature (8 tasks)   | 8 × premium     | 3 × premium + 5 × explore | ~55%    |
| Bug fix (2 tasks)        | 2 × premium     | 1 × premium + 1 × explore | ~50%    |

### Concrete Example: User Search API (MEDIUM, 5 tasks)

| Task                  | Tier    | Model            | Reason                   |
| --------------------- | ------- | ---------------- | ------------------------ |
| research-api-patterns | Explore | claude-3.5-haiku | Fast exploration         |
| implement-search      | Explore | claude-3.5-haiku | Bounded execution        |
| write-search-tests    | Explore | claude-3.5-haiku | Bounded execution        |
| integration-review    | Premium | claude-4         | Quality/review reasoning |
| plan validation       | Premium | claude-4         | Planning reasoning       |

**Cost**: 3 × explore + 2 × premium vs 5 × premium = ~60% savings.

## Key Rules

1. **Orchestrator not routed** - Uses session default model
2. **Tier semantics fixed** - Premium=reasoning, Explore=execution
3. **Provider-agnostic** - Swap equivalent models freely
4. **Optional** - Disabled by default (`enabled: false`)
5. **Validates on startup** - Invalid models fail fast

## Related Pages

- [Model Routing (Agents)](/agents/model-routing) - Detailed tier rationale
- [Orchestrator](/agents/orchestrator) - Who applies routing
- [Configuration Overview](/configuration) - Full config reference
