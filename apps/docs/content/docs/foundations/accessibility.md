---
title: "Accessibility"
description: "Useful with a keyboard, understandable without the glow."
---

## Native where possible

Checkbox, RadioGroup, Select, Slider and Rating use native inputs. Toggle exposes switch semantics and participates in form submission with an optional name. Button defaults to type="button". Labels, descriptions and errors should explain what a control does.

## Complex interactions

Dialog, Tooltip, Popover, DropdownMenu, Tabs and Toast build on scoped Radix primitives for keyboard behavior, focus, dismissal and ARIA relationships. Component documentation describes each interaction. A component is not a guarantee that the consuming application conforms to WCAG.

## Focus and naming

Every actionable element needs a meaningful name. Supply aria-label to icon-only Buttons. Use aria-labelledby when a nearby heading names a group. Do not remove focus outlines. Tooltip content supplements a label; it should not be the only place essential information appears.

## Contrast and motion

Light/dark defaults adjust text and status colors. Forced-colors and prefers-contrast receive visible boundaries. Custom palettes still require contrast testing. Honor reduced motion and give people control over cycling content.

## Validation

Automated browser checks include keyboard interactions, form reset, focus containment/restoration, and axe scans. Automated tests do not replace screen-reader checks and application-level accessibility review.
