---
title: "Checkbox"
description: "A native checkbox with an illuminated indicator and a soft ambient bloom."
---

## Try it

<Preview><ComponentDemo name="Checkbox" /></Preview>

## Usage

```tsx
import { Checkbox } from 'luminescent';

<Checkbox
  label="Ambient lighting"
  description="A softer light for your workspace."
  defaultChecked
  name="lighting"
/>
```

Use `checked` and `onChange={(event) => setChecked(event.target.checked)}` for controlled state. Native input props, form submission, `required`, and forwarded refs are supported.

## Options

- `label`: visible label content. Provide `aria-label` when omitting it.
- `description`: supporting text, connected to the input for assistive technology.
- `indeterminate`: shows a mixed selection using the native input's indeterminate state.
- `size`: `sm`, `md` (default), or `lg`.
- `glowColor`: `peach` (default), `violet`, `blue`, or `mint`.
- `disabled`, `checked`, `defaultChecked`, `name`, `value`, and `onChange`: native checkbox behavior.

Tab focuses the checkbox; Space toggles it. A visible focus ring follows the selected glow color.
