---
title: "Installation"
description: "From a blank page to your first component."
---

## Install

Use an application running React 18 or React 19. Install the package with npm:

```bash
npm install luminescent
```

React and React DOM are peer dependencies. Motion, icons, syntax highlighting, and Radix foundations are regular dependencies; no separate peer installation is necessary. Consumers do not need Tailwind CSS.

## Import the stylesheet

Import the stylesheet once at your application's entry point. It contains namespaced component styles and `--lumi-*` variables. It does not install an application reset.

```tsx
import { Button } from "luminescent";
import "luminescent/style.css";

export function App() {
  return <Button>Create project</Button>;
}
```

## Add a theme

Dark styling is the default. Use a provider for scoped themes, accent colors, reduced motion and portal inheritance.

```tsx
import { LuminescentProvider, Button } from "luminescent";

export function App() {
  return (
    <LuminescentProvider theme="system" accent="violet" glow="subtle">
      <Button>Create project</Button>
    </LuminescentProvider>
  );
}
```

## Next steps

Read [quick start](/docs/quick-start), [Next.js integration](/docs/advanced/ssr), or [theming](/docs/foundations/themes). The repository currently retains package version 0.1.7; unreleased changes are described in the changelog and require a new release before they are available from npm.
