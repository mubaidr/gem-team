---
title: Mobile Tester
description: Mobile E2E testing - scope-selected with Detox, Maestro, Appium on iOS/Android simulators.
navigation:
  icon: i-lucide-smartphone
seo:
  title: Mobile Tester Agent - Gem Team
  description: The gem-mobile-tester performs iOS/Android E2E testing with Detox, Maestro, Appium.
  ogTitle: Mobile Tester Agent - Gem Team
  ogDescription: The gem-mobile-tester performs iOS/Android E2E testing.
---

## Role

Runs scope-selected mobile E2E on simulators/devices. Tests platform-specific behavior (safe areas, keyboards, permissions, dark mode, haptics, etc.).

## When to Delegate

| Scenario                    | Delegate Mobile Tester? | Why                                      |
| --------------------------- | ----------------------- | ---------------------------------------- |
| New mobile feature          | ✅                      | Flow assertions on iOS/Android           |
| Platform-specific behavior  | ✅                      | Safe areas, VoiceOver, TalkBack, haptics |
| Mobile release validation   | ✅                      | Pre-release E2E testing                  |
| Offline / background sync   | ✅                      | Network conditioner, background states   |
| Pure web feature, no mobile | ❌                      | Out of scope; use Browser Tester         |

## Capabilities

| Dimension         | What                                                   | Tools                               |
| ----------------- | ------------------------------------------------------ | ----------------------------------- |
| Flow Assertions   | Journeys, nav, forms                                   | Detox, Maestro, Appium              |
| Platform Behavior | Safe areas, keyboards, permissions, dark mode, haptics | Platform APIs                       |
| Performance       | TTI, memory, frame rate, bundle                        | Xcode Instruments, Android Profiler |
| Accessibility     | VoiceOver, TalkBack, dynamic type                      | Platform a11y tools                 |
| Network           | API calls, offline, background sync                    | Network link conditioner            |
| Visual            | Screenshot comparison                                  | Native screenshot APIs              |

## Tool Selection

| Tool    | Best For                               | Platform     |
| ------- | -------------------------------------- | ------------ |
| Detox   | React Native, gray-box                 | iOS, Android |
| Maestro | Cross-platform, YAML, fast             | iOS, Android |
| Appium  | Native, WebDriver                      | iOS, Android |
| e2e     | Platform-specific (XCUITest, Espresso) | iOS, Android |

## Platform Checks

**iOS**: Safe areas (notch, Dynamic Island), keyboard dismissal, VoiceOver, Dynamic Type, haptics, background/foreground.

**Android**: Safe areas (cutouts, gesture nav), IME/keyboard, TalkBack, font scaling, haptics, permissions, back gesture.

## Definition

[`.apm/agents/gem-mobile-tester.agent.md`](/.apm/agents/gem-mobile-tester.agent.md)

## Related

- [Workflow: Execute](/guide/workflow-execute)
- [Features: Quality](/guide/quality)
