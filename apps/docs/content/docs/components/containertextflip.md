---
title: "ContainerTextFlip"
description: "A dynamic text container component that animates through words."
---

The `ContainerTextFlip` component provides an animated, luminescent container that cycles through an array of words, elegantly resizing itself with fluid transitions.

## Default

<Preview>
  <div style={{ padding: '4rem 0', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
    <ContainerTextFlip words={["better", "modern", "beautiful", "awesome"]} variant="secondary" />
    <ContainerTextFlip words={["fast", "secure", "reliable"]} variant="primary" />
  </div>
</Preview>

## Usage

```tsx
import { ContainerTextFlip } from 'luminescent';

export default function App() {
  return (
    <ContainerTextFlip 
      words={["fast", "secure", "reliable"]} 
      interval={2500} 
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `words` | `string[]` | `["better", "modern", "beautiful", "awesome"]` | Array of words to cycle through in the animation. |
| `interval` | `number` | `3000` | Time in milliseconds between word transitions. |
| `animationDuration` | `number` | `700` | Duration of the transition animation in milliseconds. |
| `variant` | `"primary" \| "secondary"` | `"secondary"` | Visual variant of the container. |
| `className` | `string` | `undefined` | Additional CSS classes to apply to the container. |
| `textClassName` | `string` | `undefined` | Additional CSS classes to apply to the text. |
