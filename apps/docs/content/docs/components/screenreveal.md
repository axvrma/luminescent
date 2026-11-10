---
title: "ScreenReveal"
description: "A stunning reveal animation for page loads."
---

The `ScreenReveal` component wraps your page content and animates it in smoothly using Framer Motion when the page mounts.

## Interactive Preview

<Preview>
  <ScreenReveal>
    <div style={{ padding: '2rem', background: 'var(--card-bg)', borderRadius: '12px' }}>
      <h2>Hello, World!</h2>
      <p>I animated in smoothly.</p>
    </div>
  </ScreenReveal>
</Preview>

## Usage

```tsx
import { ScreenReveal } from 'luminescent';

export default function Page() {
  return (
    <ScreenReveal>
      <main>
        <h1>Welcome</h1>
      </main>
    </ScreenReveal>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | | The content to reveal. |
| `duration` | `number` | `0.8` | The duration of the reveal animation in seconds. |
