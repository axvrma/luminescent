---
title: "Card"
description: "A dark surface with a fine illuminated edge and a cursor-following spotlight."
---

## Try it

<Preview><ComponentDemo name="Card" /></Preview>

## Usage

```tsx
import { Card, Chip } from 'luminescent';

<Card glowColor="violet">
  <Chip size="sm">New collection</Chip>
  <h2>Designed to feel alive.</h2>
  <p>A quiet glow for your next idea.</p>
</Card>
```

## Options

- `children`: card content; compose headings, media, and actions as needed.
- `glowColor`: `peach` (default), `violet`, `blue`, or `mint`.
- `spotlight`: enables the cursor-following light; defaults to `true`.
- `className` and `style`: customize spacing, dimensions, and layout.
- Native div props, pointer event callbacks, and forwarded refs are supported.

The surface also brightens when a child receives keyboard focus. Put interactive actions in native links or buttons within the card.
