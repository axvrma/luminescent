---
title: "Colors"
description: "Warm accents, clear surfaces, meaningful status."
---

## Semantic roles

Use `--lumi-bg`, `--lumi-surface` and `--lumi-surface-raised` to distinguish page and elevation. `--lumi-text` and `--lumi-muted` express content hierarchy; `--lumi-border` and `--lumi-separator` distinguish boundaries.

## Accent palettes

The built-in palettes are peach, violet, blue and mint. A provider sets the inherited accent. A component's optional glowColor overrides that accent for one component. Accent labels use a theme-adjusted mix so light mode does not place pale peach text on white.

## Status is not just color

`--lumi-success`, `--lumi-warning`, `--lumi-info` and `--lumi-danger` are RGB channel lists with theme-specific values. Pair status with text and an icon, as Alert does. Badge text should name the state rather than relying on a colored dot.

## Custom contrast

Check text contrast and focus visibility on every surface when overriding tokens. The default primary button pairs a light accent with dark text; an arbitrary dark custom accent also needs a suitable `--lumi-on-accent`.
