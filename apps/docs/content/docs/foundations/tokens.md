---
title: "Design tokens"
description: "The small decisions that make a coherent system."
---

## How tokens work

All variables use the --lumi- namespace. The distributed stylesheet declares variables and .lumi- component selectors, with no application reset. Component variables inherit through theme containers.

## Color and contrast

`--lumi-bg`, surface, surface-raised, text, muted, border, separator, color, accent, secondary, on-accent, success, warning, info, danger and focus define semantic roles. RGB channel lists are used by color and status tokens; plain colors are used by backgrounds and text.

## Dimensions and typography

Spacing: space-1 through space-16 (documented in Spacing). Radius: radius-sm/md/lg/full. Heights: control-sm/md/lg. Font families: font and font-mono. Type scale: text-xs/sm/md/lg/xl. Weights: weight-normal/medium/bold. Rhythm: leading and tracking.

## Effects and motion

Elevation: shadow-sm/lg and glow-sm/lg. glow-strength multiplies glow contributions; zero disables them. blur, glass-opacity and border-light support surfaces. Motion uses duration-fast, duration, duration-slow, ease and ease-out.

## Source of truth

See packages/luminescent/src/tokens.css in the repository for exact defaults. These CSS tokens can be consumed independently of React. Glow intensity can be selected with data-lumi-glow="none", "subtle", "normal" or "intense".
