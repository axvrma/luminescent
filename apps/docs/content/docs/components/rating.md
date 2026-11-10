---
title: "Rating"
description: "A constellation of glowing stars with native radio input navigation."
---

## Try it

<Preview><ComponentDemo name="Rating" /></Preview>

## Usage

```tsx
import { Rating } from 'luminescent';

<Rating label="Rate your experience" defaultValue={4} name="experience" />
<Rating label="Community rating" value={5} readOnly glowColor="violet" />
```

## Options

- `value` / `defaultValue`: selected number of stars. The initial default is `0`.
- `onChange`: receives the selected number.
- `max`: number of whole stars; defaults to `5`. Values are rounded and clamped to this range.
- `label`: accessible group name; defaults to `Rating`.
- `name`: optional native radio group name for form submission. Each instance otherwise gets a unique name.
- `readOnly`: renders an accessible rating image without interactive inputs.
- `disabled`: disables every radio input.
- `size`: `sm`, `md` (default), or `lg`.
- `glowColor`: `peach` (default), `violet`, `blue`, or `mint`.

Tab enters the radio group. Arrow keys change the selected star. Hover previews a rating without committing a change.
