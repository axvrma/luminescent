---
title: "Button"
description: "A premium, glowing interactive button component."
---

The `Button` component is designed to draw attention with its luminescent hover effects and sleek, dark-mode-first aesthetic.

## Primary

<Preview>
  <Button variant="primary">Schedule a call</Button>
</Preview>

## Secondary

<Preview>
  <Button variant="secondary">Contact us</Button>
</Preview>

## Sizes

<Preview>
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Button variant="primary" size="sm">Small</Button>
    <Button variant="primary" size="md">Medium</Button>
    <Button variant="primary" size="lg">Large</Button>
  </div>
</Preview>

## Usage

```tsx
import { Button } from 'luminescent';

export default function App() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' or 'secondary' or 'outline' or 'ghost'` | `'primary'` | The visual style of the button. |
| `size` | `'sm' or 'md' or 'lg'` | `'md'` | The size of the button. |
| `className` | `string` | `undefined` | Additional CSS classes. |
| `children` | `ReactNode` | `undefined` | The content of the button. |
| `...props` | `ButtonHTMLAttributes` | | Standard HTML button attributes. |
