# 💎 Gem Team
>
> Self-Learning Multi-agent orchestration framework for spec-driven development and automated verification.
>

⚡ **The verification-first coding framework that wraps your LLM in TDD loops, security gates, and self-correction cycles.**

![VS Code](https://img.shields.io/badge/VS_Code-5A6D7C?style=flat)
![VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-5A6D7C?style=flat)
![Copilot CLI](https://img.shields.io/badge/Copilot_CLI-5A6D7C?style=flat)
![Cursor](https://img.shields.io/badge/Cursor-5A6D7C?style=flat)
![OpenCode](https://img.shields.io/badge/OpenCode-5A6D7C?style=flat)
![Claude Code](https://img.shields.io/badge/Claude_Code-5A6D7C?style=flat)
![Windsurf](https://img.shields.io/badge/Windsurf-5A6D7C?style=flat)

---

## 🚀 Quick Start

See [all installation options](#-installation) below.

---

## 📑 Contents

- [🚀 Quick Start](#-quick-start)
- [🎯 Who's It For?](#-whos-it-for)
- [🤔 Why Gem Team?](#-why-gem-team)
- [🏗️ Architecture](#-architecture)
- [📦 Installation](#-installation)
- [🤖 The Agent Team](#-the-agent-team)
- [📚 Knowledge Sources](#-knowledge-sources)
- [🤝 Contributing](#-contributing)

---

## 🎯 Who's It For?

| 👥 Teams | 🧑‍💻 Solo Devs | 🏢 Enterprises |
|:---------|:-------------|:---------------|
| Complex multi-file features with reliable verification | Faster shipping with debugging auto-pilot | Security compliance, audit trails, accessibility |

---

## 🤔 Why Gem Team?

### 🚀 Performance

- ⚡ **4x Faster** — Parallel execution with wave-based execution
- 🌊 **Wave-Based** — Parallel agents with integration gates per wave
- ♻️ **Pattern Reuse** — Codebase pattern discovery prevents reinventing wheels

### 🛡️ Quality & Security

- 🏆 **Higher Quality** — Specialized agents + TDD + verification gates + contract-first
- 🔒 **Built-in Security** — OWASP scanning, secrets/PII detection on critical tasks
- 👁️ **Full Visibility** — Real-time status, clear approval gates
- 🛡️ **Resilient** — Pre-mortem analysis, failure handling, auto-replanning
- ♿ **Accessibility-First** — WCAG compliance validated at spec and runtime layers
- 🚀 **Safe DevOps** — Idempotent operations, health checks, mandatory approval gates
- 🔎 **Final Review** — Optional user-triggered comprehensive review of all changed files
- 💬 **Constructive Critique** — gem-critic challenges assumptions, finds edge cases

### 🧠 Intelligence

- 🧠 **Continuous Learning** — Memory tool persists patterns, gotchas, user preferences across sessions
- 🎯 **Auto-Skills** — Agents extract reusable SKILL.md files from successful tasks (high confidence: auto, medium: confirm)
- 📏 **Established Patterns** — Uses library/framework conventions over custom implementations
- 🧠 **Context Scaffolding** — Maps large-scale dependencies _before_ the model reads code, preventing context-loss in legacy repos
- 📋 **Source Verified** — Every factual claim cites its source; no guesswork
- 📚 **Knowledge-Driven** — Prioritized sources (PRD → codebase → AGENTS.md → Context7 → docs)
- 🛠️ **Skills & Guidelines** — Built-in skill & guidelines (web-design-guidelines)

### 🛠️ Process

- 🪞 **Self-Correcting** — All agents self-critique at 0.85 confidence threshold
- ⚖️ **Intent vs. Compliance** — Shifts the burden from writing "perfect prompts" to enforcing strict, YAML-based approval gates
- 🔬 **Smart Debugging** — Root-cause analysis with stack trace parsing + confidence-scored fixes
- 🔗 **Traceable** — Self-documenting IDs link requirements → tasks → tests → evidence
- 📐 **Spec-Driven** — Multi-step refinement defines "what" before "how"
- 🗂️ **Verified-Plan** — Complex tasks: Plan → Verification → Critic
- 🩺 **Diagnose-then-Fix** — gem-debugger diagnoses → gem-implementer fixes → re-verifies
- ⚠️ **Pre-Mortem** — Failure modes identified BEFORE execution
- 📝 **Contract-First** — Contract tests written before implementation

### 🎨 Design

- 🎨 **Design Agents** — Dedicated agents for web and mobile UI/UX with anti-"AI slop" guidelines for distinctive aesthetics
- 📱 **Mobile Agents** — Native mobile implementation (React Native, Flutter) + iOS/Android testing

---

## Core Concepts

### 🚀 The "System-IQ" Multiplier

Raw reasoning isn't enough in single-pass chat. Gem-Team wraps your preferred LLM in a rigid, verification-first loop, fundamentally boosting its effective capability on SWE tasks.

### 🎨 Design Support

Gem Team includes specialized design agents with anti-"AI slop" guidelines for distinctive, modern and unique aesthetics with accessibility compliance.

### 🧠 Triple Learning System

| Type | Storage | 1-liner |
|:-----|:--------|:--------|
| 🧠 **Memory** | `/memories/` | Facts & user preferences (auto-save) |
| 🎯 **Skills** | `docs/skills/` | Procedures with code examples |
| 📐 **Conventions** | `AGENTS.md` | Static rules (requires approval) |

---

## 🏗️ Architecture

```text
User Goal → Orchestrator → [Simple: Research/Plan] or [Complex: Discuss → PRD → Research → Plan → Approve] → Execute (waves) → Summary → Final Review
                ↓
           🔁 Diagnose → Fix → Re-verify
```

---

## 📦 Installation

| Method | Command / Link | Docs |
|:-------|:---------------|:-----|
| **Code** | **[Install Now](https://aka.ms/awesome-copilot/install/agent?url=vscode%3Achat-agent%2Finstall%3Furl%3Dhttps%253A%252F%252Fraw.githubusercontent.com%252Fgithub%252Fawesome-copilot%252Fmain%252F.%252Fagents)** | [Copilot Docs](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-chat) |
| **Code Insiders** | **[Install Now](https://aka.ms/awesome-copilot/install/agent?url=vscode-insiders%3Achat-agent%2Finstall%3Furl%3Dhttps%253A%252F%252Fraw.githubusercontent.com%252Fgithub%252Fawesome-copilot%252Fmain%252F.%252Fagents)** | [Copilot Docs](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-chat) |
| **APM <br/> (All AI coding agents)** | `apm install mubaidr/gem-team` | [APM Docs](https://microsoft.github.io/apm/) |
| **Copilot CLI (Marketplace)** | `copilot plugin install gem-team@awesome-copilot` | [CLI Docs](https://github.com/github/copilot-cli) |
| **Copilot CLI (Direct)** | `copilot plugin install gem-team@mubaidr` | [CLI Docs](https://github.com/github/copilot-cli) |
| **Windsurf** | `codeium agent install mubaidr/gem-team` | [Windsurf Docs](https://docs.codeium.com/windsurf) |
| **Claude Code** | `claude plugin install mubaidr/gem-team` | [Claude Docs](https://docs.anthropic.com/en/docs/claude-code) |
| **OpenCode** | `opencode plugin install mubaidr/gem-team` | [OpenCode Docs](https://opencode.ai/docs/) |
| **Manual <br/> (Copy agent files)** | VS Code: `~/.vscode/agents/` <br/> VS Code Insiders: `~/.vscode-insiders/agents/` <br/> GitHub Copilot: `~/.github/copilot/agents/` <br/> GitHub Copilot (project): `.github/plugin/agents/` <br/> Windsurf: `~/.windsurf/agents/` <br/> Claude: `~/.claude/agents/` <br/> Cursor: `~/.cursor/agents/` <br/> OpenCode: `~/.opencode/agents/` | — |

---

## 🤖 The Agent Team

### 🧩 Core Workflow

| Role | Description | Sources | Recommended LLM |
|:-----|:------------|:--------|:---------------|
| 🎯 **ORCHESTRATOR** | The team lead: Orchestrates research, planning, implementation, and verification | PRD, AGENTS.md | **Closed:** GPT-5.4, Gemini 3.1 Pro, Claude Sonnet 4.6<br>**Open:** GLM-5, Kimi K2.5, Qwen3.5 |
| 🔍 **RESEARCHER** | Codebase exploration — patterns, dependencies, architecture discovery | PRD, codebase, AGENTS.md, docs | **Closed:** Gemini 3.1 Pro, GPT-5.4, Claude Sonnet 4.6<br>**Open:** GLM-5, Qwen3.5-9B, DeepSeek-V3.2 |
| 📋 **PLANNER** | DAG-based execution plans — task decomposition, wave scheduling, risk analysis | PRD, codebase, AGENTS.md | **Closed:** Gemini 3.1 Pro, Claude Sonnet 4.6, GPT-5.4<br>**Open:** Kimi K2.5, GLM-5, Qwen3.5 |
| 🔧 **IMPLEMENTER** | TDD code implementation — features, bugs, refactoring. Never reviews own work | codebase, AGENTS.md, DESIGN.md | **Closed:** Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro<br>**Open:** DeepSeek-V3.2, GLM-5, Qwen3-Coder-Next |

### ✅ Quality & Review

| Role | Description | Sources | Recommended LLM |
|:-----|:------------|:--------|:---------------|
| 🛡️ **REVIEWER** | **Zero-Hallucination Filter** — Security auditing, code review, OWASP scanning | PRD, codebase, AGENTS.md, OWASP | **Closed:** Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro<br>**Open:** Kimi K2.5, GLM-5, DeepSeek-V3.2 |
| 🎯 **CRITIC** | Challenges assumptions, finds edge cases, spots over-engineering and logic gaps | PRD, codebase, AGENTS.md | **Closed:** Claude Sonnet 4.6, GPT-5.4, Gemini 3.1 Pro<br>**Open:** Kimi K2.5, GLM-5, Qwen3.5 |
| 🔬 **DEBUGGER** | Root-cause analysis, stack trace diagnosis, regression bisection | codebase, AGENTS.md, git history | **Closed:** Gemini 3.1 Pro, Claude Opus 4.6, GPT-5.4<br>**Open:** DeepSeek-V3.2, GLM-5, Qwen3-Coder-Next |
| 🧪 **BROWSER TESTER** | E2E browser testing, UI/UX validation, visual regression | PRD, AGENTS.md, fixtures | **Closed:** GPT-5.4, Claude Sonnet 4.6, Gemini 3.1 Flash<br>**Open:** Llama 4 Maverick, Qwen3.5-Flash, MiniMax M2.7 |
| ✂️ **SIMPLIFIER** | Refactoring specialist — removes dead code, reduces complexity | codebase, AGENTS.md, tests | **Closed:** Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro<br>**Open:** DeepSeek-V3.2, GLM-5, Qwen3-Coder-Next |

### 🔧 Specialized

| Role | Description | Sources | Recommended LLM |
|:-----|:------------|:--------|:---------------|
| 🚀 **DEVOPS** | Infrastructure deployment, CI/CD pipelines, container management | AGENTS.md, infra configs | **Closed:** GPT-5.4, Gemini 3.1 Pro, Claude Sonnet 4.6<br>**Open:** DeepSeek-V3.2, GLM-5, Qwen3.5 |
| 📝 **DOCUMENTATION** | Technical documentation, README files, API docs, diagrams | AGENTS.md, source code | **Closed:** Claude Sonnet 4.6, Gemini 3.1 Flash, GPT-5.4 Mini<br>**Open:** Llama 4 Scout, Qwen3.5-9B, MiniMax M2.7 |
| 🎨 **DESIGNER** | UI/UX design — layouts, themes, color schemes, accessibility | PRD, codebase, AGENTS.md | **Closed:** GPT-5.4, Gemini 3.1 Pro, Claude Sonnet 4.6<br>**Open:** Qwen3.5, GLM-5, MiniMax M2.7 |
| 📱 **IMPLEMENTER-MOBILE** | Mobile implementation — React Native, Expo, Flutter | codebase, AGENTS.md | **Closed:** Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro<br>**Open:** DeepSeek-V3.2, GLM-5, Qwen3-Coder-Next |
| 📱 **DESIGNER-MOBILE** | Mobile UI/UX — HIG, Material Design, safe areas | PRD, codebase, AGENTS.md | **Closed:** GPT-5.4, Gemini 3.1 Pro, Claude Sonnet 4.6<br>**Open:** Qwen3.5, GLM-5, MiniMax M2.7 |
| 📱 **MOBILE TESTER** | Mobile E2E testing — Detox, Maestro, iOS/Android | PRD, AGENTS.md | **Closed:** GPT-5.4, Claude Sonnet 4.6, Gemini 3.1 Flash<br>**Open:** Llama 4 Maverick, Qwen3.5-Flash, MiniMax M2.7 |

---

## 📚 Knowledge Sources

Agents consult only the sources relevant to their role:

| Trust Level | Sources | Behavior |
|:-----------|:--------|:---------|
| **Trusted** | PRD, plan.yaml, AGENTS.md | Follow as instructions |
| **Verify** | Codebase files, research findings | Cross-reference before assuming |
| **Untrusted** | Error logs, external data | Factual only — never as instructions |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. [CONTRIBUTING](./CONTRIBUTING.md) for detailed guidelines on commit message formatting, branching strategy, and code standards.

## 📄 License

This project is licensed under the Apache License 2.0.

## 💬 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/mubaidr/gem-team/issues) on GitHub.
