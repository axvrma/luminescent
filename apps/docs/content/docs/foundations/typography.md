---
title: "Typography"
description: "A useful hierarchy before a distinctive typeface."
---

## Font families

`--lumi-font` uses the system sans-serif stack. `--lumi-font-mono` controls code. Override either inside a theme container; no network font request is required.

## Scale

Text sizes range from `--lumi-text-xs` (0.75rem) through sm (0.875rem), md (1rem), lg (1.25rem) and xl (1.75rem). Use normal, medium and bold weight tokens for content hierarchy. The default reading line-height is 1.6.

## Application headings

Components that own headings expose a suitable heading or a headingLevel prop. Choose levels according to the page outline. Avoid using a large visual font as a substitute for a semantic heading.

## Resizing and localization

Rem-based defaults respect browser font settings. Test translated labels, 200% text zoom and narrow layouts; avoid fixed-width containers around long content.
