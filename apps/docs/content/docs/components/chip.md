---
title: "Chip"
description: "Compact tags and status labels with a colored halo and optional removal action."
---

## Try it

<Preview><ComponentDemo name="Chip" /></Preview>

## Usage

```tsx
import { Chip } from 'luminescent';

<Chip glowColor="mint">Published</Chip>
<Chip variant="outlined" glowColor="violet">Design systems</Chip>
```

## Options

- `children`: the tag's content.
- `variant`: `soft` (default) or `outlined`.
- `glowColor`: `peach` (default), `violet`, `blue`, or `mint`.
- `size`: `sm` or `md` (default).
- `icon`: optional decorative React node before the label.
- `onDelete`: shows a removal button and calls your handler. Remove the chip from your own state in that handler.
- `deleteLabel`: accessible name for removal; use a specific label such as `Remove React`.
- `disabled`: disables the removal action and dims the chip.

The remove button supports keyboard focus and activation. A plain chip is a display label.
