# Workflow Audit Tasks

Concise backlog from the Orchestrator -> Planner -> Executor dry run. Discuss and address one task at a time.

## P0 - Reliability

- [x] **P0-1 Planner contract:** Return verified plan availability, task IDs/count, waves, and structural validation status.
- [ ] **P0-2 Acceptance evidence:** Add compact criterion-level pass/fail evidence to agent results and Orchestrator checks.
- [ ] **P0-3 Configuration wiring:** Remove or implement documented settings that agents do not consume: visual regression, screenshot-on-failure, deployment strategy, auto-rollback, and commit behavior.
- [ ] **P0-4 Retry safety:** Define retry limits by task type; prevent unsafe automatic retries for deployments, migrations, and external side effects.
- [ ] **P0-5 Bug-test ownership:** Clarify whether the Debugger or Implementer owns reproduction and regression tests.

## P1 - Routing and Cost

- [ ] **P1-1 Research handoff:** Define a structured researcher-to-planner evidence manifest.
- [ ] **P1-2 Diagnosis gate:** Skip Debugger only when complete root-cause and reproduction evidence is supplied.
- [ ] **P1-3 Browser applicability:** Add explicit rules for when browser testing is not applicable or can use a smoke check.
- [ ] **P1-4 Accessibility semantics:** Align design validation and browser audits with `quality.a11y_audit_level`.
- [ ] **P1-5 Review precedence:** Define `critic > high > standard` when multiple risk signals match.

## P2 - Contract Simplification

- [ ] **P2-1 Plan schema:** Split core plan fields from specialist-specific extensions.
- [ ] **P2-2 UI states:** Make UI state requirements task-specific instead of universal.
- [ ] **P2-3 Verification ownership:** Remove repeated checks while preserving task, specialist, and aggregate gates.
- [ ] **P2-4 Learning route:** Make learning promotion and `gem-skill-creator` invocation explicitly opt-in and connected to routing.

## Recommended discussion order

1. P0-1 Planner contract
2. P0-2 Acceptance evidence
3. P0-3 Configuration wiring
4. P0-4 Retry safety
5. P0-5 Bug-test ownership
6. Continue through P1 and P2
