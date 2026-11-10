---
title: "Themes"
description: "One visual language, more than one mood."
---

## Scoped React configuration

```tsx
import { LuminescentProvider, Button } from "luminescent";

export function Themes() {
  return (
    <>
      <LuminescentProvider theme="dark" accent="peach"><Button>Dark workspace</Button></LuminescentProvider>
      <LuminescentProvider theme="light" accent="violet"><Button>Light workspace</Button></LuminescentProvider>
    </>
  );
}
```

The provider adds a scoped wrapper, configures motion, and keeps portalled overlays inside the same themed tree. Nest providers to reset a subtree to another theme. Defaults are dark, peach, normal glow and system motion.

## CSS-only configuration

You can style static content without React context:

```css
.project-panel {
  --lumi-color: 130, 180, 255;
  --lumi-radius-lg: 1.5rem;
  --lumi-glow-strength: 0.4;
}
```

Use class lumi-theme plus data-lumi-theme="light", "dark" or "system" for standalone theme containers. Portalled components need LuminescentProvider to retain a local theme.

## Predictable rendering

System mode uses prefers-color-scheme in CSS. It does not read localStorage during render, rewrite the document, or produce a different server tree. Applications may persist a user choice in a cookie and pass it as a prop.
