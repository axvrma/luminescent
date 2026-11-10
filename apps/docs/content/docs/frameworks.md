---
title: "Framework integration"
description: "Bring Luminescent to your React stack."
---

## Vite

Import `luminescent/style.css` in `main.tsx` and components from `luminescent`. Tailwind is not required. Both the package and its dependencies support tree shaking.

## Next.js App Router

Import the stylesheet in `app/layout.tsx`. The library entry includes a client boundary; state and event callbacks belong in a consumer client component. Props crossing the server boundary must remain serializable.

```tsx
"use client";
import { useState } from "react";
import { Toggle } from "luminescent";

export function Notifications() {
  const [checked, setChecked] = useState(false);
  return <Toggle label="Notifications" checked={checked} onChange={setChecked} />;
}
```

## Other SSR frameworks

Import the stylesheet in the application root and render components normally. Avoid random IDs or browser preference checks during render. The provider's system theme uses CSS media queries, so server and initial client markup agree.

## CommonJS

The root exposes a require condition. Stylesheets still belong in your bundler's CSS pipeline. The React server renderer can import and render the packed CJS package; see the compatibility validation in the repository.
