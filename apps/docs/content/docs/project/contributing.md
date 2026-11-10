---
title: "Contributing"
description: "Keep the details useful for the next developer."
---

## Set up

Use Node 24 (or 22.13+) and npm 10+. Run npm ci at the workspace root, then npm run dev. npm run storybook opens the component laboratory.

## Validate

Run npm run check for lint, type checks, generated API drift, unit behavior and package verification. npm run test:components runs desktop/mobile browser checks. Build docs and Storybook before a release. See CONTRIBUTING.md for the complete commands.

## Component standards

Preserve public APIs, expose typed props, use native semantics where possible, compose consumer event handlers, and test behavior. Every component needs stories, a working example, accessibility notes and light/dark/reduced-motion coverage. Avoid expensive mandatory effects.

## Report issues

Include a minimal reproduction, React/browser version, keyboard steps, expected behavior and whether reduced motion or a custom theme is in use. Report issues through GitHub.
