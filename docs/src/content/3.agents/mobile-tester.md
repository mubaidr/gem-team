---
title: Mobile Tester
description: Mobile E2E testing specialist — scope-selected tests with Detox, Maestro, Appium, or e2e on iOS/Android simulators.
navigation:
  icon: i-lucide-smartphone
---

## Role

The Mobile Tester runs **scope-selected mobile E2E checks** with Detox, Maestro, Appium, or e2e on iOS/Android simulators and devices.

---

## When Delegated

- Mobile feature verification
- Cross-platform behavior testing
- Platform-specific functionality (safe areas, keyboards, permissions)
- Performance on device
- Release candidate validation

---

## Test Capabilities

| Dimension | What It Tests | Tools |
|-----------|---------------|-------|
| **Flow Assertions** | User journeys, navigation, forms | Detox, Maestro, Appium |
| **Platform Behavior** | Safe areas, keyboards, permissions, dark mode, haptics | Platform APIs |
| **Performance** | Cold-start TTI, memory, frame rate, bundle size | Xcode Instruments, Android Profiler |
| **Accessibility** | VoiceOver, TalkBack, dynamic type, contrast | Platform a11y tools |
| **Network** | API calls, offline handling, background sync | Network link conditioner |
| **Visual** | Screenshot comparison, pixel-perfect UI | Native screenshot APIs |

---

## Input Handoff

```yaml
task_definition:
  objective: "Verify user search on mobile"
  acceptance_criteria:
    - "Search results render on iOS + Android"
    - "Keyboard dismisses on scroll"
    - "Safe area respected (notch/Dynamic Island)"
    - "Dark mode renders correctly"
    - "Pull-to-refresh works"
  handoff:
    constraints:
      - "Test on iOS 17+ simulator + Android 14+ emulator"
      - "Use Detox for iOS, Maestro for Android"
    relevant_context:
      - "implement-search: api_contract=wave-3/implement-search/artifacts/api-contract.json"
      - "Mobile components: src/mobile/UserSearchScreen.tsx"
```

---

## Output

```yaml
status: "completed"
failure_classification: null
handoff:
  test_results:
    ios:
      flow_assertions: "passed"
      safe_areas: "passed"
      keyboard: "passed"
      dark_mode: "passed"
      performance: "passed (TTI: 450ms)"
    android:
      flow_assertions: "passed"
      safe_areas: "passed"
      keyboard: "passed"
      dark_mode: "passed"
      performance: "passed (TTI: 520ms)"
  artifacts:
    ios_screenshots: "wave-4/mobile-test/artifacts/ios/"
    android_screenshots: "wave-4/mobile-test/artifacts/android/"
    ios_performance: "wave-4/mobile-test/artifacts/ios-perf.trace"
    android_performance: "wave-4/mobile-test/artifacts/android-perf.perfetto"
```

---

## Tool Selection

| Tool | Best For | Platform |
|------|----------|----------|
| **Detox** | React Native, gray-box testing | iOS, Android |
| **Maestro** | Cross-platform, YAML flows, fast | iOS, Android |
| **Appium** | Native apps, WebDriver compatible | iOS, Android |
| **e2e** | Platform-specific (XCUITest, Espresso) | iOS, Android |

**Scope-selected** — Planner chooses tool per task requirements.

---

## Platform-Specific Checks

### iOS
- Safe areas (notch, Dynamic Island, home indicator)
- Keyboard types and dismissal
- VoiceOver navigation
- Dynamic Type scaling
- Haptics feedback
- Background/foreground transitions

### Android
- Safe areas (cutouts, gesture navigation)
- IME options and keyboard behavior
- TalkBack navigation
- Font scaling
- Haptic feedback
- Permission runtime requests
- Back gesture handling

---

## Key Rules

1. **Scope-selected tools** — Not one tool for everything
2. **Simulator + device** — Minimum simulator, device for release
3. **Platform-specific criteria** — Acceptance criteria per platform
4. **Performance budgets** — TTI, memory, frame rate thresholds
5. **Evidence by reference** — Screenshots, traces, reports in artifacts

---

## Related Pages

- [Workflow: Execute](/guide/workflow-execute) — Mobile Tester in wave loop
- [Features: Quality](/guide/quality) — Mobile testing in quality gates
- [First Steps](/getting-started/first-steps) — Mobile testing in walkthrough