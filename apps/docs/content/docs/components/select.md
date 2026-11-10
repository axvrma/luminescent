---
title: "Select"
description: "A native select with a glass surface and an illuminated focus border."
---

## Try it

<Preview><ComponentDemo name="Select" /></Preview>

## Usage

```tsx
import { Select } from 'luminescent';

<Select label="Glow palette" defaultValue="peach" name="palette">
  <option value="peach">Peach sunset</option>
  <option value="violet">Violet haze</option>
  <option value="blue">Blue hour</option>
</Select>
```

The menu uses your browser's native selection interface, including mobile pickers and keyboard type-ahead. Use `value` and a native `onChange` handler to control the selection.

## Options

- `label`: a visible label associated with the select.
- `description`: supporting text below the field.
- `error`: validation text; also sets `aria-invalid` and connects the message to the field.
- `size`: `sm`, `md` (default), or `lg`.
- `glowColor`: `peach` (default), `violet`, `blue`, or `mint`.
- `containerClassName`: styles the field wrapper; `className` styles the select.
- Native single-select props and forwarded refs are supported, including `required`, `name`, `disabled`, `value`, and `defaultValue`.

Provide `aria-label` if you omit the visible label. Option lists can include native `optgroup` elements.
