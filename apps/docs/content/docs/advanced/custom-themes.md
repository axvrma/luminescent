---
title: "Custom themes"
description: "A visual language that belongs to your product."
---

## Override semantic roles

```tsx
import { LuminescentProvider, Button } from "luminescent";

export function Brand() {
  return (
    <LuminescentProvider theme="light" style={{
      "--lumi-color": "135, 190, 255",
      "--lumi-on-accent": "#142239",
      "--lumi-radius-full": "0.75rem",
      "--lumi-focus": "#234f86"
    }}>
      <Button>Our brand</Button>
    </LuminescentProvider>
  );
}
```

Provider style uses the exported LuminescentStyle type, which accepts --lumi- variables alongside CSSProperties. Component style overrides win over defaults.

## Keep a complete palette

Adjust muted text, borders, focus and status colors along with the accent. Test regular/disabled/hover/focus states in both themes. Glow is decorative and should never be the sole way to recognize a state.

## Separate products on one page

Use one provider per independently themed area. Portalled dialogs and menus use that area's portal root, so they inherit custom properties rather than unexpectedly returning to page defaults.
