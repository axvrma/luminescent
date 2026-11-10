---
title: "Toggle"
description: "A glowing, interactive toggle switch component."
---

The `Toggle` component is a sleek switch designed to illuminate when active, drawing attention to state changes with a premium luminescent glow.

## Default

<Preview>
  <div style={{ display: 'flex', gap: '2rem' }}>
    <Toggle />
    <Toggle defaultChecked />
  </div>
</Preview>

## Sizes

<Preview>
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
    <Toggle size="sm" />
    <Toggle size="md" defaultChecked />
    <Toggle size="lg" />
  </div>
</Preview>

## Usage

```tsx
import { Toggle } from 'luminescent';

export default function App() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <label className="text-white">Enable Notifications</label>
      <Toggle checked={enabled} onChange={setEnabled} />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | The controlled value of the toggle. |
| `defaultChecked` | `boolean` | `false` | The initial checked state (uncontrolled). |
| `onChange` | `(checked: boolean) => void` | `undefined` | Callback when the state changes. |
| `size` | `'sm' or 'md' or 'lg'` | `'md'` | The size of the toggle. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `className` | `string` | `undefined` | Additional CSS classes. |
