---
title: "Performance"
description: "Keep the glow proportional to the work."
---

## Imports and bundles

The package provides ESM and CJS. React and React DOM are peers, never bundled. Runtime dependencies remain external and module boundaries are preserved; ESM bundlers can remove components you do not import. The CSS entry is explicit and marked as a side effect.

## Optional cost

Simple components do not implement cursor tracking or scroll listeners. Card spotlight must be enabled. Timeline uses one transform-only scroll beam. CodeBlock highlights sources up to 20,000 characters and falls back to plain text for longer input.

## Animation discipline

Use a small number of ambient effects. Avoid large blurred layers and continuously animated paint properties. Reduce motion for dense screens through the provider. The shared glow system uses stable stylesheet rules, without per-instance style injection.

## Measurement

Run npm run test:package for packed consumer, export, CSS isolation and tree-shaking checks. Exact output sizes are recorded in the architecture validation report; dependency costs vary with the components your application imports.
