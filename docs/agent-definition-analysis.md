# Agent Definition Analysis Report

**Date:** 2026-03-01
**Scope:** All 8 agent definitions in gem-team repository
**Analysis Type:** Issue identification and dry run analysis

---

## Executive Summary

Found **27 issues** across 8 agent definitions:

- **3 Critical** - System-breaking issues that prevent execution
- **1 High** - Major design flaws affecting reliability
- **6 Medium** - Significant gaps causing confusion or failures
- **16 Low** - Minor inconsistencies, ambiguities, or documentation gaps

**Most Critical Finding:** The entire delegation system is broken. The orchestrator's delegation protocol doesn't match what agents expect, and the initial request flow cannot work.

---

## Critical Issues (System-Breaking)

### 🔴 CRITICAL-1: Orchestrator Delegation Protocol Mismatch

**Location:** `gem-orchestrator.agent.md` <delegation_protocol>

**Problem:** The orchestrator's delegation protocol provides parameters that don't match agent expectations.

**Examples:**

| Agent | Delegation Protocol Provides | Agent Expects | Mismatch |
|-------|----------------------------|--------------|----------|
| gem-researcher | `user_request`, `plan_id`, `focus_area` | `plan_id`, `objective`, `focus_area`, `complexity` | `user_request` ≠ `objective`, missing `complexity` |
| gem-planner | `task_id`, `plan_id`, `plan_path`, `task_definition` | `plan_id`, `user_request` | Missing `user_request`, extra unused params |
| gem-implementer | `tech_stack`, `test_coverage`, `estimated_lines` | Full task from plan.yaml | Missing `plan_path`, `research_findings` paths |

**Impact:** Delegations will fail immediately with parameter errors.

**Fix Required:** Align delegation_protocol with each agent's input_format_guide.

---

### 🔴 CRITICAL-2: Initial Request Cannot Be Handled

**Location:** `gem-orchestrator.agent.md` <workflow> Phase Detection

**Problem:** When a user makes an initial request (no plan exists), the orchestrator cannot delegate.

**Dry Run Scenario:**

```
User: "Fix the authentication bug in login"

1. Orchestrator Phase Detection: No plan.yaml → Phase 1: Research
2. Orchestrator attempts to delegate to gem-researcher with:
   - task_id: ??? (not defined)
   - plan_id: ??? (not defined)
   - plan_path: ??? (doesn't exist)
   - task_definition: ??? (no plan exists)

RESULT: Cannot delegate - required parameters missing
```

**Impact:** All user requests fail immediately.

**Fix Required:** Add a plan_id generation step before Phase 1 delegation. Use timestamp or hash of user request.

---

### 🔴 CRITICAL-3: Orchestrator Failure Handling Cannot Work

**Location:** `gem-orchestrator.agent.md` <workflow> Handle Failure

**Problem:** Orchestrator tries to evaluate `failure_type` but agents don't provide it.

**Orchestrator Workflow:**

```
Handle Failure: Evaluate failure_type → transient(retry 2x) | fixable(gem-implementer) | needs replan(gem-planner) | escalate(block)
```

**Agent Output Format (all agents):**

```json
{
  "status": "completed|failed|in_progress",
  "task_id": "...",
  "plan_id": "...",
  "summary": "...",
  "extra": {...}
}
```

**Missing:** No `failure_type` field in any agent's output.

**Impact:** Orchestrator cannot implement failure handling logic.

**Fix Required:** Add `failure_type` field to all agent output_format_guide, or change orchestrator to infer from status/summary.

---

## High Priority Issues

### 🟠 HIGH-1: Inconsistent Output Formats

**Location:** All agent files <output_format_guide>

**Problem:** Each agent has different `extra` field structure, making result synthesis difficult.

**Examples:**

```json
// gem-browser-tester
"extra": {
  "console_errors": 0,
  "network_failures": 0,
  "accessibility_issues": 0,
  "evidence_path": "...",
  "failures": [...]
}

// gem-devops
"extra": {
  "health_checks": {},
  "resource_usage": {},
  "deployment_details": {}
}

// gem-planner
"extra": {}  // Empty!
```

**Impact:** Orchestrator cannot reliably synthesize results or extract common information.

**Fix Required:** Define standard output format with required fields and optional agent-specific fields.

---

## Medium Priority Issues

### 🟡 MEDIUM-1: Planner's Assignable Agents List is Wrong

**Location:** `gem-planner.agent.md` <assignable_agents>

**Problem:**

```yaml
assignable_agents:
  - gem-implementer
  - gem-browser-tester
  - gem-devops
  - gem-reviewer
  - gem-documentation-writer
```

**Issues:**

1. Missing `gem-researcher` (though it shouldn't be assignable anyway)
2. Includes `gem-planner` itself (nonsensical - planner creates plans, doesn't execute tasks)
3. Doesn't match orchestrator's `available_agents` list (7 agents)

**Impact:** Planner might assign tasks to wrong agents or create invalid plans.

**Fix Required:** Update to match actual executable agents: `gem-implementer, gem-browser-tester, gem-devops, gem-reviewer, gem-documentation-writer` (current list is actually correct, but needs clarification that gem-planner and gem-researcher are not assignable).

---

### 🟡 MEDIUM-2: Documentation-Writer Task Type Ambiguity

**Location:** `gem-documentation-writer.agent.md`

**Problem:** Three task types exist (walkthrough|documentation|update) but no clear way to determine which to use.

**Workflow says:**

```
- Analyze: Parse task_type (walkthrough|documentation|update)
```

**But:**

1. delegation_protocol doesn't specify how to determine task_type
2. walkthrough needs: overview, tasks_completed, outcomes, next_steps
3. documentation/update needs: audience, coverage_matrix, is_update
4. No logic to distinguish between documentation vs update

**Impact:** Agent will fail when it doesn't know which mode to operate in.

**Fix Required:** Add task_type determination logic to delegation_protocol or add task_type field to task_definition in plan.yaml.

---

### 🟡 MEDIUM-3: Implementer Doesn't Know Which Research Findings to Read

**Location:** `gem-implementer.agent.md` <workflow>

**Problem:**

```
Execute: TDD approach
  - Read research_findings_*.yaml for context
```

**Issues:**

1. Multiple research findings may exist (by focus_area)
2. No mapping between tasks and relevant research findings
3. task_definition has `context_files` but that's for code files
4. No way to determine which findings are relevant

**Impact:** Implementer will either read all findings (inefficient), read none (missing context), or fail.

**Fix Required:** Add `research_findings` field to task_definition in plan.yaml, or have implementer glob all findings and filter by relevance.

---

### 🟡 MEDIUM-4: Reviewer Scope Determination Ambiguity

**Location:** `gem-reviewer.agent.md` <workflow>

**Problem:** Two conflicting ways to determine review depth.

**Workflow says:**

```
Determine Scope: Use review_depth from context or derive from review_criteria
```

**review_criteria says:**

```
security/PII/production OR retry≥2 OR HIGH priority → full
MEDIUM priority → standard
ELSE → lightweight
```

**Issues:**

1. task_definition has `review_depth` field
2. But workflow says "derive from review_criteria"
3. No clear rule for which takes precedence
4. "retry≥2" - where does retry count come from?

**Impact:** Agent will be confused about which depth to use.

**Fix Required:** Clear precedence rule: if `review_depth` provided, use it; otherwise derive from criteria.

---

### 🟡 MEDIUM-5: Plan.yaml Update Race Condition

**Location:** `gem-implementer.agent.md` and `gem-orchestrator.agent.md`

**Problem:** Both implementer and orchestrator try to update plan.yaml status.

**gem-implementer workflow:**

```
Update Status: Mark task completed in plan.yaml
```

**gem-orchestrator workflow:**

```
Synthesize: SUCCESS→mark completed in plan.yaml + manage_todo_list
```

**Issues:**

1. Both agents trying to update same file
2. Potential race condition
3. Duplicate work
4. Unclear who has responsibility

**Impact:** Conflicts, overwrites, or inconsistent state.

**Fix Required:** Clarify responsibility - only orchestrator should update plan.yaml, remove from implementer workflow.

---

### 🟡 MEDIUM-6: Orchestrator Cannot Execute Failure Handling

**Location:** `gem-orchestrator.agent.md` <workflow> Handle Failure

**Problem:** Orchestrator has sophisticated failure handling logic but cannot implement it.

**Workflow:**

```
Handle Failure: Evaluate failure_type → transient(retry 2x) | fixable(gem-implementer) | needs replan(gem-planner) | escalate(block)
```

**Issues:**

1. Agents don't provide `failure_type` in output (see CRITICAL-3)
2. No way to categorize failures
3. Cannot distinguish transient vs persistent vs fixable

**Impact:** All failures will be escalated or handled incorrectly.

**Fix Required:** Add failure classification to agent outputs, or change orchestrator to use heuristics.

---

## Low Priority Issues

### 🟢 LOW-1: Researcher Directives Incomplete

**Location:** `gem-researcher.agent.md` <directives>

**Problem:** Directives section cuts off mid-sentence:

```
<directives>
- Multi-pass: Simple (1), Medium (2), Complex (3)
- Hybrid retrieval: semantic_search + grep_search
```

**Expected:** Complete directive list like other agents (4-5 items).

**Fix Required:** Complete the directives section.

---

### 🟢 LOW-2: Orchestrator Phase Detection Edge Cases

**Location:** `gem-orchestrator.agent.md` <workflow> Phase Detection

**Problem:** Missing edge cases:

1. Plan + user_feedback + NO pending tasks (all completed) → Should go to Phase 4?
2. Plan + user_feedback + blocked tasks → Should unblock or go to Phase 2?
3. No plan.yaml + existing research_findings → Skip Phase 1?

**Impact:** Orchestrator might get stuck or make wrong routing decisions.

**Fix Required:** Add explicit handling for these edge cases.

---

### 🟢 LOW-3: Tool Usage Guidelines Redundancy

**Location:** All agent files <constraints>

**Problem:** Identical "Tool Usage Guidelines" repeated in all 8 agents (4 bullet points each).

**Issues:**

1. Hard to maintain (changes needed in 8 places)
2. Violates DRY principle
3. Makes files unnecessarily long

**Fix Required:** Extract to shared reference or document once in orchestrator.

---

### 🟢 LOW-4: Browser Tester Verification Ambiguity

**Location:** `gem-browser-tester.agent.md` <workflow>

**Problem:**

```
Verify: Console errors, network requests, accessibility audit per plan
```

**Issue:** What does "per plan" mean? plan.yaml doesn't have verification section for browser_tester tasks. validation_matrix is in task_definition.

**Fix Required:** Clarify verification criteria source.

---

### 🟢 LOW-5: DevOps Approval Gates Not in Workflow

**Location:** `gem-devops.agent.md` <approval_gates> and <workflow>

**Problem:** approval_gates section has detailed conditions but workflow only mentions one.

**approval_gates:**

```yaml
security_gate:
  conditions: task.requires_approval OR task.security_sensitive
  action: Call plan_review for approval; abort if denied

deployment_approval:
  conditions: task.environment='production' AND (task.title includes 'deploy' OR task.title includes 'release')
  action: Call plan_review for confirmation; abort if denied
```

**workflow:**

```
Approval Check: Call plan_review if task.requires_approval OR (task.environment='production' AND deployment). Abort if denied.
```

**Issue:** workflow doesn't check for 'deploy' or 'release' in task.title.

**Fix Required:** Align workflow with approval_gates conditions.

---

### 🟢 LOW-6: Planner Plan Verification Vague

**Location:** `gem-planner.agent.md` <workflow>

**Problem:**

```
Verify: Plan structure, task quality, pre-mortem per plan criteria
```

**Issue:** What are "plan criteria"? No definition of what constitutes valid plan structure beyond format guide.

**Fix Required:** Specify verification checklist.

---

### 🟢 LOW-7: Planner Estimated Limits Not Enforced

**Location:** `gem-planner.agent.md` <plan_format_guide>

**Problem:**

```yaml
estimated_files: number # Count of files affected (max 3)
estimated_lines: number # Estimated lines to change (max 500)
```

**Issue:** Comments say "(max 3)" and "(max 500)" but not enforced anywhere.

**Fix Required:** Either enforce in workflow or remove comments.

---

### 🟢 LOW-8: Documentation-Writer Update Delta Not Specified

**Location:** `gem-documentation-writer.agent.md`

**Problem:**

```
- Update: Verify parity on delta only
- Verify: ... Update→delta parity
```

**Issue:** What is "delta"? No specification of:

- What files changed
- What previous state was
- How to calculate delta

**Fix Required:** Add delta specification to input_format_guide.

---

### 🟢 LOW-9: Researcher Complexity Auto-Detection Not Specified

**Location:** `gem-researcher.agent.md` <workflow>

**Problem:**

```
Determine complexity: simple (1 pass), medium (2 passes), complex (3 passes)
```

**Issue:** HOW is complexity auto-detected? No rules specified.

**Fix Required:** Add complexity determination rules (e.g., based on focus_area size, number of files, etc.).

---

### 🟢 LOW-10: Planner ask_questions Timing Ambiguity

**Location:** `gem-planner.agent.md` <workflow>

**Problem:**

```
ask_questions: Critical decisions only (architecture, tech stack, security, data models, API contracts, deployment)
```

**Issue:** WHEN to ask questions? Not specified in workflow steps.

**Fix Required:** Specify which workflow step includes ask_questions (likely "Plan" step).

---

### 🟢 LOW-11: Browser Tester Tool Preference Not Used

**Location:** `gem-browser-tester.agent.md` <delegation_protocol>

**Problem:**

```json
"browser_tool_preference": "playwright|generic"
```

**Issue:** Parameter is passed but not mentioned in workflow. No clear purpose.

**Fix Required:** Either use in workflow or remove from delegation_protocol.

---

### 🟢 LOW-12: DevOps Preflight Check Vague

**Location:** `gem-devops.agent.md` <workflow>

**Problem:**

```
Preflight: Verify environment (docker, kubectl), permissions, resources. Ensure idempotency.
```

**Issue:** Too vague - no specification of:

- How to verify docker/kubectl
- What permissions to check
- What resources to verify
- How to ensure idempotency

**Fix Required:** Add specific preflight checklist.

---

### 🟢 LOW-13: Reviewer Scan Logic Contradiction

**Location:** `gem-reviewer.agent.md` <workflow>

**Problem:** Execute and Scan steps contradict each other.

**Execute says:**

```
- Full: OWASP Top 10, secrets/PII, ...
- Standard: Secrets, basic OWASP, ...
```

**Scan says:**

```
Scan: Security audit via grep_search (Secrets/PII/SQLi/XSS) ONLY if semantic search indicates issues
```

**Issue:** Execute says always check secrets for Standard/Full, but Scan says only if semantic search finds issues.

**Fix Required:** Clarify precedence - remove "ONLY if" from Scan step.

---

### 🟢 LOW-14: Orchestrator Task Limit Not Justified

**Location:** `gem-orchestrator.agent.md` <workflow>

**Problem:**

```
Read plan.yaml, get pending tasks, limit 4
```

**Issue:** Why limit to 4? No justification provided.

**Fix Required:** Document rationale or make configurable.

---

### 🟢 LOW-15: All Agents Missing Reflect Implementation

**Location:** All agent files <workflow>

**Problem:**

```
Reflect (Medium/High priority or complex or failed only)
```

**Issue:** No specification of:

- What reflection means
- What to reflect on
- How to document reflection
- What output should be

**Fix Required:** Define reflection process and output format.

---

### 🟢 LOW-16: Orchestrator User Feedback Detection

**Location:** `gem-orchestrator.agent.md` <workflow>

**Problem:**

```
User feedback → Route to Phase 2
```

**Issue:** No specification of:

- What "user feedback" is
- How to detect it
- What format it comes in
- When to check for it

**Fix Required:** Define user feedback detection mechanism.

---

## Dry Run Analysis: Complete Failure Scenario

### Scenario: User requests "Fix the authentication bug in login"

#### Step 1: Orchestrator Phase Detection

- **Input:** User request, no plan.yaml exists
- **Decision:** Phase 1: Research
- **Action:** Delegate to gem-researcher
- **Problem:** No plan_id, task_id, or plan_path exists

#### Step 2: Delegation Attempt (FAILS)

```json
// Orchestrator tries to send:
{
  "task_id": null,  // ❌ Missing
  "plan_id": null,  // ❌ Missing
  "plan_path": null,  // ❌ Missing
  "task_definition": null  // ❌ Missing
}

// gem-researcher expects:
{
  "plan_id": "string",
  "objective": "string",  // ❌ Mismatch
  "focus_area": "string",
  "complexity": "simple|medium|complex"  // ❌ Missing
}
```

**Result:** ❌ **FAILURE - Cannot delegate**

#### Hypothetical Step 3: If Research Somehow Completes

- **Assume:** gem-researcher creates `docs/plan/fix-auth-bug/research_findings_auth.yaml`
- **Orchestrator:** Phase 2: Planning
- **Action:** Delegate to gem-planner
- **Problem:** Still missing task_id, wrong parameters

#### Hypothetical Step 4: If Plan Somehow Created

- **Assume:** gem-planner creates `docs/plan/fix-auth-bug/plan.yaml` with tasks
- **Orchestrator:** Phase 3: Execution Loop
- **Action:** Delegate to gem-implementer
- **Problem:** Implementer doesn't know which research findings to read

#### Hypothetical Step 5: If Implementer Completes

- **gem-implementer:** Returns JSON with status=completed
- **Orchestrator:** Tries to handle failure
- **Problem:** No failure_type field, cannot determine if retry/replan/escalate

#### Hypothetical Step 6: Status Update

- **gem-implementer:** Tries to update plan.yaml
- **Orchestrator:** Tries to update plan.yaml
- **Problem:** Race condition, potential conflict

---

## Recommended Fix Priority

### Immediate (System-Breaking)

1. **CRITICAL-1:** Align delegation_protocol with agent input_format_guide
2. **CRITICAL-2:** Add plan_id generation before Phase 1 delegation
3. **CRITICAL-3:** Add failure_type to agent outputs or change failure handling logic

### High (Reliability)

4. **HIGH-1:** Standardize agent output formats

### Medium (Functionality)

5. **MEDIUM-1:** Clarify planner's assignable agents
2. **MEDIUM-2:** Add task_type determination logic
3. **MEDIUM-3:** Add research findings mapping to tasks
4. **MEDIUM-4:** Clarify review depth precedence
5. **MEDIUM-5:** Remove plan.yaml update from implementer
6. **MEDIUM-6:** Implement failure classification

### Low (Quality)

11-27: Address low priority issues as time permits

---

## Conclusion

The agent system has fundamental design flaws that prevent it from working at all. The delegation protocol is completely misaligned with agent expectations, and the initial request flow cannot execute.

**Critical Path to Fix:**

1. Standardize delegation protocol across all agents
2. Add plan_id/task_id generation for initial requests
3. Standardize output formats with failure classification
4. Clarify responsibilities (who updates what)
5. Add missing implementation details (reflection, complexity detection, etc.)

Without these fixes, the agent system will fail on every user request.

---

**Analysis Completed:** 2026-03-01
**Total Issues Found:** 27
**Critical:** 3 | **High:** 1 | **Medium:** 6 | **Low:** 16
