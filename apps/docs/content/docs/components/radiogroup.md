---
title: "RadioGroup"
description: "A highly accessible radio button group with custom styling."
---

The `RadioGroup` component provides a styled, keyboard-accessible list of mutually exclusive options.

## Default

<Preview>
  <div style={{ padding: '1rem' }}>
    <RadioGroup name="plan" value="pro" options={[{ value: 'starter', label: 'Starter Plan', description: 'Perfect for small side projects.' }, { value: 'pro', label: 'Pro Plan', description: 'For power users and scaling apps.' }, { value: 'enterprise', label: 'Enterprise', description: 'Custom limits and dedicated support.' }]} />
  </div>
</Preview>

## Horizontal Discrete

<Preview>
  <div style={{ padding: '1rem' }}>
    <RadioGroup name="layout" value="pro" layout="horizontal" indicatorAnimation="fade" options={[{ value: 'starter', label: 'Starter' }, { value: 'pro', label: 'Pro' }, { value: 'enterprise', label: 'Enterprise' }]} />
  </div>
</Preview>

## Usage

```tsx
import { RadioGroup } from 'luminescent';

export default function App() {
  return (
    <RadioGroup name="theme" value="dark" options={[{ value: 'light', label: 'Light Theme' }, { value: 'dark', label: 'Dark Theme' }]} />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | | The form name for the inputs. |
| `options` | `{ value: string, label: string }[]` | | The radio options. |
| `defaultValue` | `string` | | The default selected value. |
| `onChange` | `(value: string) => void` | | Callback fired when the selection changes. |
