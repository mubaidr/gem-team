# Workflow Optimization Task List

**Plan:** `20260621-workflow-optimization-findings` | Reduce runtime token burn

All evidence from raw `.agent.md` system instructions. Agents stay self-contained.  
Focus: **execution flow steps that burn tokens at runtime**, not file size.

---

## 🏆 High Priority — Big Savings, Low Effort

### [ ] H1 — Move `agent_input_reference` out of orchestrator's every-turn context

- **What:** 130 lines / ~200 tokens of YAML defining per-agent context fields loads every single orchestrator turn.
- **Problem:** Only needed when delegating to a subagent — not during Phase 0, routing, or output.
- **Fix:** Hardcode delegation patterns or move to a function call. Keep only the active agent's fields in context during delegation.
- **Saves:** ~200 tokens × every orchestrator turn

### [ ] H2 — Orchestrator writes context_envelope directly, skip doc-writer

- **What:** After each wave, orchestrator delegates to `gem-documentation-writer` (`task_type: update_context_envelope`) just to append a few JSON lines.
- **Problem:** Full agent invocation (~2000 tokens) for a simple `replace_string_in_file`.
- **Fix:** Orchestrator uses `replace_string_in_file` directly for JSON appends. Delegate to doc-writer only for complex docs (PRD, AGENTS.md).
- **Saves:** ~2000 tokens × waves (e.g., 10K tokens for 5-wave plan)

### [ ] H3 — Read `plan.yaml` once fully instead of grep+partial-read cycle

- **What:** Orchestrator does grep for wave/status → parse → partial read → repeat per wave (3-6 tool calls).
- **Problem:** More expensive than one full `read_file` for a 50-200 line YAML.
- **Fix:** Allow full `plan.yaml` read in one call. Cache it in-memory.
- **Saves:** 2-5 tool calls per wave evaluation

### [ ] H4 — Move `failure_handling` YAML out of every-turn context

- **What:** ~40-line YAML block defining 7 failure types with retry logic loads every turn.
- **Problem:** Failures are rare. This should only load when handling a failure.
- **Fix:** Load only on failure. Keep a one-liner reference in normal context.
- **Saves:** ~60 tokens × every orchestrator turn

### [ ] H5 — Prune context envelope between waves

- **What:** Envelope only grows — wave 1: 20 lines, wave 3: 40 lines. Every subagent gets the full blob.
- **Problem:** Subagents doing narrow tasks (e.g., "add CSS class") get learnings from prior waves they don't need.
- **Fix:** Include only task-relevant envelope fields per delegation. Strip old learnings.
- **Saves:** Grows progressively — bigger savings in later waves

### [ ] H6 — Tool call memoization (cache grep/semantic/read results)

- **What:** Agents call `grep_search`, `semantic_search`, `read_file` repeatedly with identical args across iterations.
- **Problem:** Same file read 3× by 3 different agents in a wave = 3× the tool calls + tokens.
- **Fix:** Hash tool name + args → cache result in memory/sqlite. Check before any tool call. (Pattern from SWE-agent & Claude Code)
- **Saves:** 1-3 redundant tool calls per agent per wave — compounds across 16 agents

### [ ] H7 — Dynamic context loading (Cursor-style)

- **What:** Entire `context_envelope` is passed to every subagent upfront, including sections they don't need.
- **Problem:** An implementer doing "add CSS class" gets research_digest, architecture_snapshot, prior_decisions — none relevant.
- **Fix:** Pass only task-relevant envelope fields per delegation. Load full file content on-demand, not upfront. (Pattern from Cursor's "dynamic context discovery")
- **Saves:** 30-50% of context per subagent invocation

### [ ] H8 — Hierarchical context compaction (summarize, don't just prune)

- **What:** H5 prunes old learnings. But even pruned context retains verbose task descriptions.
- **Problem:** Completed wave details (task descriptions, acceptance criteria, handoff notes) are verbose and no longer needed.
- **Fix:** After each wave, summarize completed tasks into 1-2 line dense summaries. Replace verbose task blocks with compacted form before passing to next wave. (Pattern from Claude Code's `/compact` and OpenHands compactor)
- **Saves:** 40-60% of envelope size in later waves

---

## 🟡 Medium Priority

### [ ] M1 — Reduce memory tri-read in Phase 0

- **What:** Orchestrator does 3 memory tool calls (repo + session + global) every interaction.
- **Problem:** On follow-up interactions (e.g., "continue"), memory hasn't changed — wasted reads.
- **Fix:** Cache memory in-memory after first read. Re-read only when explicitly needed or stale.
- **Saves:** 3 tool calls per conversation turn

### [ ] M2 — Apply MEDIUM-style reviewer gating to HIGH complexity

- **What:** HIGH runs gem-reviewer after every wave. For a 5-wave plan, that's 5 calls.
- **Problem:** Many intermediate waves have no integration risk.
- **Fix:** Gate reviewer only on: final wave, waves with `conflicts_with`, or waves with downstream contracts.
- **Saves:** 2-4 reviewer invocations per multi-wave plan

### [ ] M3 — Skip reviewer for trivial MEDIUM plans

- **What:** MEDIUM always does planner → reviewer sequence before any code.
- **Problem:** Simple plans (e.g., "add one endpoint") get fully validated when reviewer finds nothing.
- **Fix:** Planner self-certifies low-risk plans. Reviewer only runs when planner flags risk.
- **Saves:** 1 full agent invocation per simple MEDIUM plan

### [ ] M4 — Git checkpointing for zero-cost rollback

- **What:** On failure, debugger re-reads files, re-analyzes, re-generates fix. Expensive recovery.
- **Problem:** No checkpoint system — full re-generation every time.
- **Fix:** Git commit before every task execution. On failure: `git revert HEAD` restores known-good state instantly. Debugger diagnoses from checkpoint diff. (Pattern from Claude Code's git workflow)
- **Saves:** 50-80% of failure recovery tokens

### [ ] M5 — Token-aware budget per task

- **What:** No per-task token budget. A task can burn unlimited tokens spiraling.
- **Problem:** Complex tasks can loop indefinitely, burning context budget on failed approaches.
- **Fix:** Per-task max token budget (e.g., 50K input tokens). If exceeded → task escalated or auto-reverted. (Pattern from TALE budgeting & SWE-agent max_turns)
- **Saves:** Prevents runaway token consumption — saves potentially 100K+ tokens per runaway task

### [ ] M6 — Compacted orchestrator history (keep only last N steps)

- **What:** Orchestrator's conversation accumulates full wave history — every Phase 4 output, every delegation result.
- **Problem:** After 5 waves, the session history is massive. Every subsequent turn loads it all.
- **Fix:** After each wave, replace verbose delegation results (JSON blobs, file diffs) with compacted 1-line summaries. Keep only last 2 waves' full detail. (Pattern from SWE-agent's compacted recent history)
- **Saves:** 30-50% of session history tokens in later waves

---

## 🟢 Nice to Have

### [ ] L1 — Remove scope-reclassification loop for TRIVIAL tasks

- **What:** TRIVIAL/LOW loop checks "scope grows → reclassify complexity" every iteration.
- **Problem:** For a single-file typo fix, this LLM reasoning step always returns "no."
- **Fix:** TRIVIAL: one-shot delegation. If it fails, escalate directly. No loop.
- **Saves:** ~50 tokens per TRIVIAL task

### [ ] L2 — Shared standard execution rules reference

- **What:** All 16 agents carry identical ~14-line "Execution" block (batch aggressively, discover broadly, terse, post-edit).
- **Problem:** 16 copies × ~14 lines = ~224 lines loaded per agent invocation.
- **Fix:** Already in each agent as self-contained requirement, but reduces token efficiency.
- **Note:** Keep self-contained, but could reference `AGENTS.md` for the common block.

### [ ] L3 — Early exit for high-confidence results

- **What:** Agent returns completed + confidence ≥ 0.95 → orchestrator still runs post-wave review.
- **Problem:** Verification on already-confident results burns tokens for no gain.
- **Fix:** If agent confidence ≥ 0.95 AND task is low-risk (no conflicts_with, no downstream deps), skip wave review gate. (Pattern from researcher's existing early-exit logic)
- **Saves:** 1 reviewer call per high-confidence task

### [ ] L4 — Change-only diffs in delegation payload

- **What:** Delegation passes full file paths and descriptions to implementers, who then re-read the full files.
- **Problem:** For large files (500+ lines), re-reading the full file every time burns tokens.
- **Fix:** Pass only the relevant section/diff context instead of full file references. (Pattern from Cursor's speculative edits)
- **Saves:** Variable — bigger savings on large files

---

## Sources

Patterns adapted from:

- **Claude Code** (Anthropic) — prompt caching, git checkpointing, context compaction, slim tool definitions
- **Cursor IDE** — planner→worker hierarchy, dynamic context discovery, speculative edits, content-addressed state
- **SWE-agent** — compacted recent history, tool memoization, token budgets, max_turns
- **OpenHands** — event-stream architecture, parallel tool calling, explicit compactor tools
- **TALE** — token-aware LLM budgeting framework

---

## Summary

- **High (H1-H8):** ~25K+ tokens saved per plan cycle — Low-Med effort
- **Medium (M1-M6):** ~12K+ tokens saved per plan cycle — Low effort
- **Low (L1-L4):** ~2K+ tokens saved per plan cycle — Low effort
