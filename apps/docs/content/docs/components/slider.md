---
title: "Slider"
description: "A range input with a luminous track, a bright thumb, and a live value label."
---

## Try it

<Preview><ComponentDemo name="Slider" /></Preview>

## Usage

```tsx
import { useState } from 'react';
import { Slider } from 'luminescent';

export function LightControl() {
  const [intensity, setIntensity] = useState(64);
  return <Slider label="Light intensity" value={intensity} onChange={setIntensity} />;
}
```

## Options

- `value` / `defaultValue`: controlled or initial numeric value. The default is `50`.
- `onChange`: receives the next number.
- `min`, `max`, `step`: native range bounds and step; defaults are `0`, `100`, and the browser's `1`.
- `label`: visible input label. Use `aria-label` if omitted.
- `showValue`: displays the current value; defaults to `true`.
- `formatValue`: formats both the visible value and `aria-valuetext`, for example `(value) => value + '%'`.
- `glowColor`: `peach` (default), `violet`, `blue`, or `mint`.
- Native range input props and forwarded refs are supported, including `name` and `disabled`.

Arrow keys change the value by one step. Home and End move to the minimum and maximum. Motion and transitions respect reduced-motion preferences.
