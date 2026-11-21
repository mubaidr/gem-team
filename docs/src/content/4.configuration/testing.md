---
title: Testing Configuration
description: Test execution behavior settings.
navigation:
  icon: i-lucide-test-tube
seo:
  title: Testing Configuration — Gem Team
  description: Test execution behavior settings configuration for Gem Team.
  ogTitle: Testing Configuration — Gem Team
  ogDescription: Test execution behavior settings configuration.
---

## Configuration

```yaml
testing:
  screenshot_on_failure: true
```

## Example: Screenshot on Test Failure

```yaml
# Task input to gem-browser-tester
objective: "Verify login flow"
acceptance_criteria:
  - "Login succeeds with valid credentials"
  - "Error shown for invalid credentials"
handoff:
  constraints: ["Staging env", "Chrome"]
  relevant_context:
    - "screenshot_on_failure: true"
```

**When test fails:**

- Browser Tester captures full-page screenshot
- Saved to: `wave-{n}/{task}/artifacts/failure-screenshot.png`
- Included in failure evidence for Debugger/Reviewer

## Settings

| Setting                         | Type    | Default | Description                                   |
| ------------------------------- | ------- | ------- | --------------------------------------------- |
| `testing.screenshot_on_failure` | boolean | `true`  | Capture screenshot when browser/UI tests fail |

## Behavior

When `screenshot_on_failure: true`:

- Browser Tester captures full-page screenshot on test failure
- Screenshot saved to task artifacts: `wave-{n}/{task}/artifacts/failure-screenshot.png`
- Included in failure evidence for Debugger/Reviewer
- Works with both browser and mobile testing

When `screenshot_on_failure: false`:

- No automatic screenshot capture
- Manual screenshots only via explicit acceptance criteria

## Related Pages

- [Browser Tester](/agents/browser-tester) — Screenshot capture in testing
- [Mobile Tester](/agents/mobile-tester) — Mobile screenshot behavior
- [Failure Handling](/guide/failure-handling) — Screenshots in failure evidence
- [Configuration Overview](/configuration) — Full config reference
