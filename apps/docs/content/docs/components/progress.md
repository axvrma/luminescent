---
title: "Progress"
description: "Linear beams and circular rings with a bright leading edge."
---

## Try it

<Preview><ComponentDemo name="Progress" /></Preview>

## Usage

```tsx
import { Progress } from 'luminescent';

<Progress value={64} label="Preparing your workspace" showValue />
<Progress label="Syncing assets" glowColor="violet" />
<Progress variant="circular" value={64} label="Upload progress" showValue />
```

## Options

- `value`: current progress, clamped between `0` and `max`. Omit it for an indeterminate animation.
- `max`: upper bound; defaults to `100`. Invalid bounds fall back to `100`.
- `label`: accessible name and visible linear label; defaults to `Loading`.
- `showValue`: shows the completion percentage when a value is supplied; defaults to `false`.
- `variant`: `linear` (default) or `circular`.
- `glowColor`: `peach` (default), `violet`, `blue`, or `mint`.

The progressbar role exposes the current bounds and value. Indeterminate progress omits `aria-valuenow`. Continuous animations stop when the user prefers reduced motion.
