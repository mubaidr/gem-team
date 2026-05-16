# Agent Definition Analysis — 2026-05-16

## Status: IN PROGRESS

| ID  | Finding                                                  | Status     |
| --- | -------------------------------------------------------- | ---------- | --------------- |
| C1  | Orchestrator workflow mismatch (agent file vs AGENTS.md) | ✅ DONE    |
| C2  | Implementer output/test_results contradiction            | ✅ DONE    |
| H1  | I/O Optimization duplication (~1,800 lines)              | Pending    |
| H2  | Self-reference in available_agents                       | Pending    |
| H3  | Dead conventions pipeline                                | ✅ DONE    |
| H4  | Unreachable cache bypass mechanisms                      | ✅ DONE    |
| H5  | Researcher phase numbering (0.5)                         | ✅ DONE    | Option A: 2.0.5 |
| H6  | skill-creator lists PRD.yaml                             | ⏭️ SKIPPED |
| H7  | "donot" typo                                             | ✅ DONE    |
| H8  | Orchestrator "never read" vs Codebase knowledge          | ⏭️ SKIPPED |

## 2. Critical Issues

### C1 ✅ RESOLVED — Orchestrator Workflow Mismatch

**Problem:** Agent file (`.apm/agents/gem-orchestrator.agent.md`) defined 5 phases (0-4); AGENTS.md mode instructions defined 9 phases (0-8).

**Changes Made:**

1. **AGENTS.md** — Updated Workflow Architecture and Execution Flow:
   - Phases renumbered: 0-4 → 1-5
   - Documentation Updates moved to Phase 1 (Init & Route)
   - Skill Extraction + Convention Proposals moved to Phase 5 (Summary)
   - Final Review (Phase 8) removed entirely

2. **gem-orchestrator.agent.md** — Updated workflow:
   - All phases renumbered: Phase 0-4 → Phase 1-5
   - Phase 1 now includes Documentation Updates step (1.3)
   - PRD Update Routing removed from Phase 3 (was redundant)
   - Skill Extraction + Convention Proposals moved to Phase 5 (Summary) as 5.3 + 5.4
   - Routes now point to correct phases (Phase 1-5 instead of 0-4)

3. **gem-reviewer.agent.md** — Updated output format NOTE:
   - Removed `architectural_checks` note (deferred to gem-critic)

**Verification:** Both AGENTS.md and orchestrator agent file now use consistent 5-phase workflow (1-5).

### C2 ✅ RESOLVED — Implementer Output/Test Results Contradiction

**Problem:** `gem-implementer.agent.md` Verify step said "SKIP: unit tests" but output format required `test_results`. Direct contradiction.

**Changes Made:**

1. **gem-implementer.agent.md** — Updated Verify step:
   - Removed "SKIP: lint, unit tests, coverage"
   - Added "Report test_results from TDD cycle (Red → Green → Refactor)"

2. **gem-implementer-mobile.agent.md** — Updated Verify step:
   - Removed "SKIP: lint, unit tests, build verification"
   - Added "Report test_results from TDD cycle (Red → Green → Refactor)"

**Rationale:** TDD cycle already runs tests in Green phase. Verify step should CONFIRM they passed and report results, not skip them.

**Verification:** Both implementer agents now explicitly report test_results from TDD cycle.

### H3 ✅ RESOLVED — Dead Conventions Pipeline

**Problem:** `learnings.conventions[]` was always empty in implementer outputs, making Phase 5.4 dead code.

**Changes Made:**

1. **gem-implementer.agent.md** — Updated output format:
   - Changed `"conventions": [] // EMPTY IS OK"` → `"conventions": ["string"] // Project-level rules, style guides, architecture patterns (max 3)`
   - Added routing note: "routes to AGENTS.md via gem-documentation-writer"

2. **gem-implementer-mobile.agent.md** — Same update

**Rationale:** Conventions pipeline (Phase 5.4) in orchestrator is now meaningful — implementers will output conventions that are routed to AGENTS.md.

**Verification:** Phase 5.4 in orchestrator now has a chance to fire when implementers output conventions.

### H4 ✅ RESOLVED — Unreachable Cache Bypass Mechanisms

**Problem:** 4 agents defined complex cache-skip mechanisms never triggered by orchestrator.

**Changes Made:**

1. **gem-researcher.agent.md** — Removed:
   - `#### 0.5 Memory Bypass (Fast Path)` section
   - Simplified Memory Usage → Read section
   - Renumbered: 2.0 → 2.0 (Pattern Discovery), 2.1 → 2.1 (Discovery), etc.

2. **gem-reviewer.agent.md** — Removed:
   - `### 1.5 Review Cache Pre-Check (Bypass)` section
   - `review_scope=final` scope (removed from workflow + input contracts)
   - Memory Usage → Read section simplified (no diff cache)
   - Removed "(skip files marked cached in 1.5)" from security scans

3. **gem-debugger.agent.md** — Removed:
   - `### 2.5 Same-Bug Cache Check (Bypass)` section
   - Renumbered phases: 3 → 3, 4 → 4, 5 → 5, 6 → 5
   - Renumbered phases: 6 → 6, 7 → 6, 8 → 7
   - Memory Usage → Read section simplified (no same-bug cache)

4. **gem-planner.agent.md** — Removed:
   - `#### 2.0 Template Cache Check (Bypass)` section
   - `#### 6.1 Save Template to Cache` section
   - Memory Usage → Read section simplified (no template cache)

**Rationale:** Cache bypass mechanisms added complexity without benefit (orchestrator never triggers them).

**Verification:** 4 agents simplified, no dead cache code remains.

**CH_ALL agents have role clarity but suffer from 3 structural problems:**

1. **Massive template bloat** — The `I/O Optimization` block (100+ lines) is duplicated verbatim across all 16 agents. Memory Usage format instructions repeat in every agent. This inflates the definitions by ~40%.
2. **Output format vs workflow contradictions** — Implementer's Verify step says "skip unit tests" but its output format requires `test_results`. These cannot both be true.
3. **Duplicate workflow between AGENTS.md mode instructions and orchestrator agent file** — The orchestrator `.agent.md` defines a 5-phase workflow (0-4); the AGENTS.md mode instructions define a 9-phase workflow (0-8). These must converge.

---

## 2. Critical Issues

### C1. Orchestrator workflow: Agent file vs AGENTS.md mismatch

**File:** `.apm/agents/gem-orchestrator.agent.md` Phase 0-4 vs AGENTS.md mode instructions Phase 0-8

The agent file defines 5 phases:

```
Phase 0: Init & Route
Phase 1: Research
Phase 2: Planning
Phase 3: Execution Loop
Phase 4: Summary
```

The actual AGENTS.md mode instructions define 9 phases:

```
Phase 0: Plan ID Generation
Phase 1: Phase Detection → Phase Detection + Documentation Updates + Routing
Phase 2: Documentation Updates
Phase 3: Phase Routing
Phase 4: Research
Phase 5: Planning
Phase 6: Execution Loop
Phase 7: Summary
Phase 8: Final Review
```

The agent definition has NOT been updated to match the mode instructions. They will produce different behavior. **Fix: Reconcile both to a single source of truth.**

### C2. Implementer: Output format requires test_results but Verify skips tests

**File:** `.apm/agents/gem-implementer.agent.md`

**Workflow 3.4 Verify:**

```
- get_errors (syntax only, fast feedback)
- Verify against acceptance_criteria
- SKIP: lint, unit tests, coverage (Reviewer owns per Phase 3.1.3)
```

**Output Format:**

```jsonc
"test_results": {
  "total": "number",
  "passed": "number",
  "failed": "number",
  "coverage": "string",
}
```

The Verify step says "skip unit tests" but the output format requires `test_results`. How can test_results be reported if tests are skipped? **Fix: Either (a) remove test_results from implementer output, or (b) remove "SKIP: unit tests" from Verify. The TDD cycle already runs tests in Green phase — the Verify step should not contradict it.**

Same issue in `gem-implementer-mobile.agent.md`.

---

## 3. High-Priority Fixes

### H1. I/O Optimization section duplicated across all 16 agents

Every agent file contains an identical ~120-line `I/O Optimization` section with subsections: Batch Operations, Read Efficiently, Scope & Filter. This is ~1,920 lines of redundant text.

These belong in a shared `_shared_io_rules.md` or simply referenced from AGENTS.md. **Fix: Extract to AGENTS.md shared rules section, reference from agents.**

### H2. Planner lists itself in available_agents

**File:** `.apm/agents/gem-planner.agent.md`, section `<available_agents>`:

```
gem-planner, gem-implementer, ...
```

This is a delegation loop hazard. If an orchestrator or another agent reads this list and routes a task to gem-planner _from_ gem-planner, it creates infinite recursion. **Fix: Remove gem-planner from its own available_agents list.**

Researcher already does NOT list itself. Reviewer does NOT list itself. But planner, implementer, implementer-mobile, browser-tester, mobile-tester, devops, doc-writer, skill-creator, debugger, critic, code-simplifier, designer, designer-mobile — all list _all_ agents including themselves. This pattern should be: an agent's `available_agents` lists agents it can delegate TO, which should never include itself.

**Fix: Remove self-reference from all agents' available_agents lists.**

### H3. Conventions pipeline (Phase 3.1.6) is dead code

**File:** `.apm/agents/gem-orchestrator.agent.md`, Phase 3.1.6:

```
Review `learnings.conventions[]` ... IF high-confidence (≥0.85) pattern found:
Delegate to gem-documentation-writer: task_type=agents_md_update
```

But every implementer and implementer-mobile outputs `conventions: []` (empty array). The condition `learnings.conventions[]` non-empty is never met. The orchestrator also says conventions are "skip unless human approval given." This entire phase never fires. **Fix: Either remove Phase 3.1.6 entirely, or make conventions output meaningful.**

### H4. Cache bypass mechanisms are defined but never triggered

Four agents define complex cache-skip mechanisms:

- **Reviewer** (1.5): `review/cache/{file_hash}` — skips grep_search on cached files
- **Debugger** (2.5): `debug/same_bug_cache` — skips Phases 3-5 on matched error
- **Planner** (2.0): `plan/templates/{objective_category}` — pre-populates 80% of DAG
- **Researcher** (0.5): `research/{focus_area}` memory bypass — skips research pass

These are all triggered by ORCHESTRATOR input parameters (e.g., passing git hashes with `changed_files`). But the orchestrator never sends these parameters in any of its delegation contracts. **Fix: Either (a) add these parameters to orchestrator's delegation in the Agent Input Reference, or (b) remove the bypass mechanisms as dead code.**

### H5. Researcher workflow numbering is chaotic

**File:** `.apm/agents/gem-researcher.agent.md`

```
### 1. Initialize & Select Mode
### 2. Research Pass
    ### 0.5 Memory Bypass (Fast Path)
    ### 2.0 Pattern Discovery
    ### 2.1 Discovery
    ### 2.2 Relationship Discovery
    ### 2.3 Detailed Examination
### 3. Synthesize YAML Report
```

Phases go: 1 → 2 → 0.5 → 2.0 → 2.1 → 2.2 → 2.3 → 3. The `0.5` between `2` and `2.0` is confusing. **Fix: Rename to 2.0.5 or renumber sequentially.**

### H6. gem-skill-creator lists PRD.yaml as knowledge source

**File:** `.apm/agents/gem-skill-creator.agent.md`:

```yaml
1. `docs/PRD.yaml`
```

The skill creator extracts patterns from agent outputs and packages them as skill files. It never needs product requirements. **Fix: Remove PRD.yaml from skill-creator knowledge sources.**

### H7. implementer typo: "donot"

**File:** `.apm/agents/gem-implementer.agent.md` (and mobile variant):

```
- Write/ update test for expected behavior → donot run yet
```

`donot` → `do not`. **Fix: Typo correction.**

### H8. Orchestrator role says "never write, edit, run" but Knowledge Sources include "Codebase"

**File:** `.apm/agents/gem-orchestrator.agent.md`

Role says:

```
Never execute code directly — always delegate.
You are a pure coordinator: never read, write, edit, run, or analyze.
```

But Knowledge Sources list:

```
2. Codebase — direct file reading, semantic search, grep
```

If the orchestrator "never reads" the codebase, listing codebase reading as a knowledge source is contradictory. **Fix: Remove Codebase from orchestrator knowledge sources, or remove "never read" from the role. (Recommend: remove Codebase — orchestrator should get codebase context from researcher.)**

---

## 4. Rules to Remove (Unrelated or Redundant)

### R1. "Cite sources for every claim" — ALL agents

Appears in: reviewer, implementer, implementer-mobile, designer, devops, debugger, critic, etc.

**Why:** Impractical for routine coding. A developer writing `const x = foo()` shouldn't "cite sources." Never meaningfully enforced. Slows agents with no safety benefit. **Fix: Remove from all agents except researcher (where citations are meaningful).**

### R2. "Always use established library/framework patterns" — ALL agents

**Why:** Self-evident. Every agent already follows this by design. It's not actionable — what would a violation look like? **Fix: Remove from all agents.**

### R3. "State assumptions explicitly; never guess silently" — ALL agents

**Why:** Overlaps with "minimum code, nothing speculative" and "surgical changes." Duplicate constraint on the same behavior. **Fix: Keep one (e.g., in Constitutional), remove the duplicate.**

### R4. "Surgical changes, don't refactor adjacent code" — implementer, implementer-mobile, designer, devops, code-simplifier

**Why:** This is just the definition of "surgical changes." It's already enforced by Anti-Rationalization ("NOTICED BUT NOT TOUCHING"). **Fix: Keep only in Anti-Rationalization table, remove from Constitutional.**

### R5. "Minimum code, nothing speculative" — implementer, implementer-mobile, designer, doc-writer, code-simplifier

**Why:** Overlaps with YAGNI principle in Directives. **Fix: Remove, keep YAGNI in Directives.**

### R6. "Execute autonomously" — ALL agents

**File:** Directives section of every agent.

**Why:** All agents are subagents with `user-invocable: false`. They _must_ execute autonomously by design. This instruction adds no information. **Fix: Remove from all agents.**

### R7. "Internal reasoning is for correctness, not readability... Skip self-talk and explanatory prose" — ALL agents

**File:** Directives section of every agent.

**Why:** This is an architectural choice about how the LLM should think. It's useful ONCE (in AGENTS.md shared rules), but repeating in all 16 agents wastes tokens. **Fix: Move to AGENTS.md shared rules.**

### R8. "Never implement code" — researcher, reviewer, debugger, critic, designer, designer-mobile, doc-writer, skill-creator, browser-tester, mobile-tester

**Why:** Good constraint, but it already exists in each agent's `<role>` section ("Constraints: never implement code"). The Directives version is redundant. **Fix: Keep in Role, remove from Directives.**

### R9. Orchestrator: "State assumptions explicitly; never guess silently"

**File:** `.apm/agents/gem-orchestrator.agent.md`

**Why:** The orchestrator never executes code or makes technical decisions. It delegates. This rule is meaningless for a dispatcher. **Fix: Remove.**

---

## 5. Workflow Steps to Simplify or Merge

### S1. Merge Orchestrator Phase 3.1.3 (Integration Check) and 3.1.4 (Synthesize)

Both handle failure from wave review. 3.1.3.2 says "IF fails: delegate to debugger... Max 3 retries." 3.1.4 says "failed/needs_revision: Diagnose and retry (debugger → fix → re-verify, max 3 retries)."

These are the same loop described twice. **Fix: Have 3.1.4 reference 3.1.3's failure handling instead of duplicating it.**

### S2. Merge Skill Extraction and Convention Proposals into Summary Phase

Phases 3.1.5 (Skill Extraction) and 3.1.6 (Convention Proposals) run inside the wave execution loop. But skill extraction from one wave might not be reliable until all waves complete. They'd be better in Phase 7 (Summary / Persist Learnings). **Fix: Move 3.1.5 and 3.1.6 to Phase 7.**

### S3. Orchestrator "Phase 2: Documentation Updates" is premature

The mode instructions have Phase 2 as "Documentation Updates" triggered when researcher finds "task_clarifications|architectural_decisions." But documentation updates should happen AFTER planning (Phase 5), not before routing. Architectural decisions from clarify mode should inform the plan first. **Fix: Merge Phase 2 into Phase 7 (Summary) or make it conditional after planning.**

### S4. Reviewer "final scope" unreachable

Reviewer defines `review_scope=final` with detailed checks, but the orchestrator's Phase 4 (Summary) doesn't dispatch a final review. Phase 8 (Final Review) exists in AGENTS.md mode instructions but the orchestrator agent definition has no such phase. **Fix: Either add Phase 8 dispatch to the agent file or remove final scope from reviewer.**

### S5. Simplify duplicate Memory Usage rules

Every agent has the same 4 conditions for memory write (≥0.85, dedup, max 3, YAML frontmatter). Reviewer and Debugger add cache logic on top. **Fix: Keep the shared pattern in AGENTS.md, reference it, and only document agent-specific variations (like reviewer's review cache) in the agent file.**

---

## 6. Minimal Required Changes

| ID  | Change                                                                             | Impact                                  |
| --- | ---------------------------------------------------------------------------------- | --------------------------------------- |
| C1  | Reconcile orchestrator agent file with AGENTS.md mode instructions                 | Prevents wrong behavior                 |
| C2  | Fix implementer Verify to either (a) report test_results or (b) remove from output | Prevents impossible output              |
| H1  | Extract I/O Optimization to shared AGENTS.md section                               | Saves ~1,800 lines, reduces maintenance |
| H2  | Remove self-reference from all agents' available_agents                            | Prevents delegation loops               |
| H4  | Wire bypass trigger params into orchestrator or remove dead cache code             | Eliminates unreachable optimizations    |
| H5  | Renumber researcher phases (0.5 → 2.0.5)                                           | Improves readability                    |
| H7  | Fix "donot" → "do not"                                                             | Typo                                    |

### Optional but Recommended

| ID    | Change                               | Impact                                   |
| ----- | ------------------------------------ | ---------------------------------------- |
| R1-R9 | Remove redundant rules across agents | Saves ~200 lines, reduces cognitive load |
| S1-S5 | Simplify workflow steps              | Reduces surface area for bugs            |
| H3    | Remove dead conventions pipeline     | Eliminates unreachable code path         |

---

## 7. Suggested Patched Text

### P1. Implementer Verify step (fix C2)

**Current:**

```
#### 3.4 Verify
- get_errors (syntax only, fast feedback)
- Verify against acceptance_criteria
- SKIP: lint, unit tests, coverage (Reviewer owns per Phase 3.1.3)
```

**Replacement:**

```
#### 3.4 Verify
- get_errors (syntax only, fast feedback)
- Verify against acceptance_criteria
- Report test_results from TDD cycle (Red → Green → Refactor)
```

**Rationale:** TDD cycle already runs tests in Green phase. Verify should CONFIRM they passed, not skip them. The output format requires test_results — make Verify produce them.

### P2. Researcher phase numbering (fix H5)

**Current:**

```
### 2. Research Pass
#### 0.5 Memory Bypass (Fast Path)
BEFORE entering research pass:
...
#### 2.0 Pattern Discovery
```

**Replacement:**

```
### 2. Research Pass
#### 2.0 Memory Bypass (Fast Path)
BEFORE entering sub-phases 2.1-2.4:
...
#### 2.1 Pattern Discovery
```

### P3. Orchestrator Knowledge Sources (fix H8)

**Current:**

```
2. Codebase — direct file reading, semantic search, grep
```

**Replacement:**

```
2. Research findings — via gem-researcher output, `docs/plan/{plan_id}/research_findings_*.yaml`
```

**Rationale:** Orchestrator never reads codebase directly — always delegates.

### P4. Planner available_agents (fix H2)

**Current:**

```
gem-researcher, gem-planner, gem-implementer, ...
```

**Replacement:**

```
gem-researcher, gem-implementer, ...
```

Apply same pattern to all agent files: remove self-reference.

### P5. Remove repeated "Cite sources for every claim"

**Current:** Appears in Constitutional rules of reviewer, implementer, implementer-mobile, debugger, designer, devops, doc-writer, skill-creator, browser-tester, mobile-tester.

**Fix:** Delete this line from all agents. Keep ONLY in researcher (where factual citations are part of the job).

---

## 8. Things That Should Stay Unchanged

| Feature                                                                       | Why                                                                                                                                    |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Agent Role sections                                                           | Crisp, one-paragraph mission statements. Good consistency.                                                                             |
| TDD (Red → Green → Refactor)                                                  | Core to all implementer agents. Don't touch.                                                                                           |
| failure_type enum                                                             | Same 8 values across all agents. Well-defined.                                                                                         |
| status enum                                                                   | 4-5 values consistent across all agents.                                                                                               |
| learnings.patterns structure                                                  | `{ name, description, confidence }` consistent everywhere.                                                                             |
| Read-only agent constraints                                                   | "never implement code" enforced in reviewer, critic, debugger, designer, researcher, doc-writer, tester agents. Critical safety guard. |
| Retry: 3x                                                                     | Universal. Simple and effective.                                                                                                       |
| "NO preamble, NO meta commentary"                                             | Universal output discipline. Protects parsability.                                                                                     |
| Agent Input Reference in orchestrator                                         | 15 well-structured input contracts. Essential for proper delegation.                                                                   |
| Anti-Rationalization tables                                                   | Effective psychological safety in implementer, implementer-mobile, browser-tester.                                                     |
| Security vectors table in reviewer                                            | 8 mobile security vectors with search/verify/flag columns. Thorough and actionable.                                                    |
| Skills Guidelines in designer/designer-mobile/debugger/devops/code-simplifier | Domain expertise that justifies the agent's existence.                                                                                 |
| Orchestrator Status Summary Format                                            | Minimal, scannable. Good for human consumption.                                                                                        |
| Failure Handling table in orchestrator                                        | Type → Action mapping is clear and complete.                                                                                           |
| Plan Format Guide in planner                                                  | Comprehensive without being overbearing.                                                                                               |
| PRD Format Guide in doc-writer                                                | Covers all essential sections.                                                                                                         |
| Test Definition Format in mobile-tester                                       | Clear flow/scenario/gesture/app_lifecycle structure.                                                                                   |
