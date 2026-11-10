---
title: "Skeleton"
description: "Warm placeholders that keep a soft light on while your content loads."
---

## Try it

<Preview><ComponentDemo name="Skeleton" /></Preview>

## Usage

```tsx
import { Skeleton } from 'luminescent';

<div role="status" aria-label="Loading profile">
  <Skeleton variant="circular" width={48} height={48} />
  <Skeleton width="65%" />
  <Skeleton variant="rectangular" height={140} />
</div>
```

## Options

- `variant`: `text` (default), `rectangular`, or `circular`.
- `width`, `height`: CSS dimensions; numbers are pixels and strings can use units or percentages.
- `animation`: `shimmer` (default), `pulse`, or `none`.
- `glowColor`: `peach` (default), `violet`, `blue`, or `mint`.
- `className` and `style`: additional layout and visual customization.

Skeletons are decorative and hidden from assistive technology. Label a surrounding loading region once to announce the state. Shimmer and pulse stop automatically for reduced-motion preferences.
