---
title: Testing Configuration
description: Test execution behavior settings.
navigation:
  icon: i-lucide-test-tube
---

## Configuration

```yaml
testing:
  screenshot_on_failure: true
```

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `testing.screenshot_on_failure` | boolean | `true` | Capture screenshot when browser/UI tests fail |

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