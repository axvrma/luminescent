---
title: "Accordion"
description: "Expandable details framed by a softly illuminated surface."
---

## Try it

<Preview><ComponentDemo name="Accordion" /></Preview>

## Usage

```tsx
import { Accordion } from 'luminescent';

<Accordion title="What makes it luminescent?" defaultExpanded>
  Layered light and a fine illuminated edge create a sense of depth.
</Accordion>
```

## Options

- `title`: content of the heading's toggle button.
- `children`: expandable content.
- `expanded` / `defaultExpanded`: controlled or initial expansion state. Initially collapsed by default.
- `onChange`: receives the next expansion boolean.
- `disabled`: prevents expansion changes.
- `headingLevel`: semantic heading level from `2` through `6`; defaults to `3`.
- `glowColor`: `peach` (default), `violet`, `blue`, or `mint`.

Each heading button exposes `aria-expanded` and controls a uniquely identified region. Collapsed content is hidden from screen readers and keyboard navigation. Use Tab to focus a heading and Enter or Space to toggle it. Stack independent accordions to make a group.
