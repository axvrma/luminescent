---
title: "SegmentedControl"
description: "A sleek iOS-style segmented control."
---

The `SegmentedControl` component allows users to select between multiple mutually exclusive views or options with a smooth sliding animation.

## Interactive Preview

<Preview>
  <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
    <SegmentedControl defaultActiveTab="Map" tabs='["Map", "Transit", "Satellite"]' />
  </div>
</Preview>

## Usage

```tsx
import { SegmentedControl } from 'luminescent';

export default function App() {
  return (
    <SegmentedControl 
      tabs={['Daily', 'Weekly', 'Monthly']}
      defaultActiveTab="Weekly"
      onChange={(val) => console.log(val)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `string[]` | | The options to display. |
| `defaultActiveTab` | `string` | | The initially selected value. |
| `onChange` | `(value: string) => void` | | Callback fired on selection change. |
| `className` | `string` | `undefined` | Additional CSS classes. |
