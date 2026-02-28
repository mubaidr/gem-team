# Agent Issues Summary - Quick Reference

## Critical Issues (Must Fix Before System Can Work)

### 1. Delegation Protocol Mismatch

- **Problem:** Orchestrator sends wrong parameters to agents
- **Example:** Sends `user_request` but gem-researcher expects `objective`
- **Fix:** Align `gem-orchestrator.agent.md` <delegation_protocol> with each agent's <input_format_guide>

### 2. Initial Request Cannot Be Handled

- **Problem:** No plan_id/task_id exists for first user request
- **Example:** User says "Fix bug" → Orchestrator tries to delegate with null values
- **Fix:** Add plan_id generation step before Phase 1 (use timestamp/hash)

### 3. Failure Handling Cannot Work

- **Problem:** Orchestrator tries to evaluate `failure_type` but agents don't provide it
- **Example:** Agent returns `{status: "failed"}` but orchestrator needs `{failure_type: "transient"}`
- **Fix:** Add `failure_type` field to all agent output_format_guide

## High Priority Issues

### 4. Inconsistent Output Formats

- **Problem:** Each agent has different `extra` field structure
- **Example:** gem-browser-tester has `console_errors`, gem-devops has `health_checks`
- **Fix:** Define standard output format with required + optional fields

## Medium Priority Issues

### 5. Planner Assignable Agents

- **Problem:** List is confusing and incomplete
- **Fix:** Clarify that only execution agents are assignable (not gem-planner or gem-researcher)

### 6. Documentation-Writer Task Type

- **Problem:** No way to determine if task is walkthrough|documentation|update
- **Fix:** Add `task_type` field to task_definition in plan.yaml

### 7. Implementer Research Findings

- **Problem:** Doesn't know which research_findings_*.yaml to read
- **Fix:** Add `research_findings` array to task_definition

### 8. Reviewer Scope Determination

- **Problem:** Conflicting rules for determining review depth
- **Fix:** Clear precedence: use provided `review_depth` if available, else derive from criteria

### 9. Plan.yaml Update Race Condition

- **Problem:** Both implementer and orchestrator try to update plan.yaml
- **Fix:** Only orchestrator should update plan.yaml

### 10. Failure Classification Missing

- **Problem:** Agents don't categorize failures (transient/fixable/needs replan)
- **Fix:** Add failure classification logic to agent workflows

## Low Priority Issues

1. Researcher directives incomplete
2. Orchestrator phase detection edge cases
3. Tool usage guidelines redundancy (DRY violation)
4. Browser tester verification ambiguity
5. DevOps approval gates not in workflow
6. Planner plan verification vague
7. Planner estimated limits not enforced
8. Documentation-writer update delta not specified
9. Researcher complexity auto-detection not specified
10. Planner ask_questions timing ambiguity
11. Browser tester tool preference not used
12. DevOps preflight check vague
13. Reviewer scan logic contradiction
14. Orchestrator task limit not justified
15. All agents missing reflect implementation
16. Orchestrator user feedback detection

## Quick Fix Checklist

### Phase 1: Make System Work (Critical)

- [ ] Fix delegation protocol parameter matching
- [ ] Add plan_id generation for initial requests
- [ ] Add failure_type to agent outputs
- [ ] Standardize output formats

### Phase 2: Improve Reliability (High/Medium)

- [ ] Clarify planner assignable agents
- [ ] Add task_type determination logic
- [ ] Map research findings to tasks
- [ ] Clarify review depth precedence
- [ ] Remove plan.yaml update from implementer
- [ ] Implement failure classification

### Phase 3: Polish (Low)

- [ ] Complete incomplete sections
- [ ] Remove redundancies
- [ ] Clarify ambiguities
- [ ] Add missing implementations

## Key Insight

**The entire delegation system is fundamentally broken.** The orchestrator cannot successfully delegate to any agent because the parameters don't match. This is a design-level issue, not an implementation bug.

**Root Cause:** The delegation_protocol was designed independently from the agent input_format_guides, without ensuring they match.

**Solution:** Re-design the delegation system with a contract-first approach:

1. Define standard input/output contracts
2. Update all agents to use standard contracts
3. Update orchestrator to use standard contracts
4. Test delegation end-to-end

## Testing Recommendation

After fixes, test this scenario:

```text
User: "Fix the authentication bug in login"

Expected Flow:
1. Orchestrator generates plan_id = "fix-auth-bug-20260301"
2. Orchestrator delegates to gem-researcher with correct params
3. gem-researcher returns research findings
4. Orchestrator delegates to gem-planner with correct params
5. gem-planner creates plan.yaml with tasks
6. Orchestrator delegates to gem-implementer with correct params
7. gem-implementer completes and returns with failure_type
8. Orchestrator updates plan.yaml and todo list
9. Orchestrator delegates to next task or completes
```

If any step fails, the delegation contract is still broken.
