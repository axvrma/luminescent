---
title: "Alert"
description: "Inline feedback with a luminous status edge and an optional dismiss action."
---

## Try it

<Preview><ComponentDemo name="Alert" /></Preview>

## Usage

```tsx
import { Alert } from 'luminescent';

<Alert title="Changes saved" severity="success">
  Your workspace is up to date.
</Alert>
```

## Options

- `severity`: `info` (default, blue), `success` (mint), `warning` (peach), or `error` (rose).
- `title`: optional message heading.
- `children`: message body.
- `onClose`: shows a dismiss button and calls your handler. Control visibility in your own state.
- `closeLabel`: accessible dismiss-button name; defaults to `Dismiss alert`.
- Native div props, including `role`, `className`, and `style`, are supported.

Info and success use the polite `status` role. Warning and error use `alert`. Each severity has its own icon so meaning is conveyed through shape and text as well as color.
