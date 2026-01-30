# Agent Analysis & Suggestions

This report analyzes the current state of agent definitions in `gem-team` and suggests final refinements for formatting, clarity, and consistency.

## 1. gem-chrome-tester.agent.md

*   **Observation**: The protocol `Use mcp_chrome-devtoo_* tools` is broad.
*   **Suggestion**: Explicitly mention `mcp_chrome-devtoo_screenshot` as a required evidence step in the protocol to reinforce the "visual verification" mission.
*   **Formatting**: The `validation_matrix` in Glossary is slightly cramped. Expanding spacing slightly improves readability without adding lines.

## 2. gem-devops.agent.md

*   **Observation**: The `preflight` step in SLA is `5m`.
*   **Suggestion**: Clarify if this includes research time. Suggest changing to `preflight_check: 5m` to distinguish from research.
*   **Formatting**: SLA line `deploy_timeout: 15m (local)/45m (prod)` is a bit dense. Suggest `deploy: 15m(local)/45m(prod)`.

## 3. gem-documentation-writer.agent.md

*   **Observation**: Protocol mentions "Distinguish between Source Code (read-only)".
*   **Suggestion**: Strengthen this to "Treat Source Code as Read-Only Truth" to prevent accidental refactoring during documentation.
*   **Layout**: Perfect.

## 4. gem-implementer.agent.md

*   **Observation**: Workflow step 3 "Apply changes using `multi_replace_string_in_file` (Atomic)" is good.
*   **Suggestion**: Add a constraint in Protocols: "One file per `multi_replace` call recommended to avoid context window issues" (optional but safer).
*   **Formatting**: SLA `task_timeout` has mixed spacing. Standardize to `task: 20m(S)-60m(XL)`.

## 5. gem-orchestrator.agent.md

*   **Observation**: `agents: []` in frontmatter.
*   **Suggestion**: If the system supports it, list the agent names `['gem-planner', ...]` to help the model understand its team boundaries explicitly, even if redundant.
*   **Workflow**: Step 3 "Synthesize" covers a lot. Breaking "Route" into a sub-bullet might help logic flow.

## 6. gem-planner.agent.md

*   **Observation**: Table formatting is excellent.
*   **Suggestion**: In `plan_format` schema, `tech_stack` is `[]`. Explicitly typing it as `[string]` in the schema hint helps.

## 7. gem-reviewer.agent.md

*   **Observation**: Regex patterns are dense.
*   **Suggestion**: Ensure the regex patterns are escaped correctly for Markdown to avoid rendering issues (looks okay now, but something to watch).
*   **Workflow**: "Fail if critical_issues found or score < 0.5". Explicitly add "Return `status=failed`" to be unambiguous.

## General Formatting Fixes
*   Ensure all SLA lines use consistent separators (` | `).
*   Ensure all Glossary items use consistent delimiters (`:` vs `=`).
