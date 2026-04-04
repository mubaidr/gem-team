# Gem-Team × Agent-Skills: Improvement Proposals — Status

## Status Tracking

| # | Improvement | Priority | Files | Status | Decision | Notes |
|:--|:-----------|:---------|:------|:-------|:---------|:------|
| 1 | Anti-Rationalization Tables | HIGH | 6 | ✅ applied | approved | Deduplicated: 30→17 lines. Skipped debugger (has Red Flags), dropped 7 duplicates |
| 2 | Three-Tier Boundary System | HIGH | 2 | ✅ applied | approved | Kept only NEW escalation triggers. Dropped devops "Never Do" (all duplicates) |
| 3 | Untrusted Data Model | HIGH | 3 | ✅ applied | approved | Skipped implementer duplicate line. Added to debugger, browser-tester, implementer |
| 4 | Context Engineering Protocol | MEDIUM | 3 | ✅ applied | approved | Dropped planner "selective research" (exact duplicate of lines 45-47) |
| 5 | Inline Planning Pattern | MEDIUM | 1 | ✅ applied | approved | All 4 lines NEW. Added as 6.2.0 before Execute Waves |
| 6 | Scope Discipline | MEDIUM | 2 | ✅ applied | approved | Added "NOTICED BUT NOT TOUCHING" to implementer + code-simplifier Directives |
| 7 | Chesterton's Fence | MEDIUM | 1 | ✅ applied | approved | Dropped 2 duplicate lines. Added git blame + test search + edge cases to simplifier |
| 8 | Feature Flag Lifecycle | MEDIUM | 2 | ✅ applied | approved | All lines NEW. Added to devops (Rollback section) + planner (Directives) |
| 9 | Prove-It Pattern | LOW | 1 | ✅ applied | approved | Added single line to debugger Fix Recommendations |
| 10 | Change Sizing | LOW | 1 | ✅ applied | approved | Dropped "≤300 lines" duplicate. Added as 2.1.2 Change Sizing section |
| 11 | Performance Checks | LOW | 2 | ✅ applied | approved | Added CWV thresholds to reviewer + browser-tester self-critique |
| 12 | ADR Lifecycle | LOW | 1 | ✅ applied | approved | Extended decisions block with id, status, alternatives, consequences, superseded_by |

## Post-Application Fixes

| Issue | Fix Applied | Status |
|:------|:-----------|:-------|
| Planner numbering reversed (2.1.2 before 2.1.1) | Reordered to 2.1.1 → 2.1.2 | ✅ |
| Debugger Untrusted Data section misplaced (between Knowledge Sources and Skills) | Moved to Rules section after Constitutional | ✅ |
| README phase numbering misaligned with orchestrator (off by 2) | Renumbered to match orchestrator (Discuss=2, PRD=3, Research=4, Planning=5, Execution=6, Summary=7) | ✅ |
| README "All agents share Anti-Rationalization" claim inaccurate | Updated to "present in 5 agents" | ✅ |
| README "Magic Keywords" undocumented | Clarified as agent name trigger routing | ✅ |
| README artifact paths missing orchestrator context | Added "(via orchestrator)" suffix | ✅ |
| README double period typo in orchestrator | Fixed | ✅ |
| Version bump 1.5.3 → 1.5.4 | README badge + plugin.json | ✅ |

## Summary

- **12 proposals applied** across 12 agent files + README
- **78 lines added, 25 lines dropped** (24% reduction from deduplication)
- **8 post-application fixes** resolved (numbering, section ordering, README alignment)
- **Version:** 1.5.3 → 1.5.4
