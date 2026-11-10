---
title: "Version information"
description: "Know what you are building with."
---

## Workspace version

The library manifest remains luminescent 0.1.7. This engineering update is unreleased. The root workspace and documentation app are private and are never published with the package.

## Compatibility

React and React DOM are peer dependencies supporting major versions 18 and 19. The build toolchain uses Node 22.13+ or Node 24. Consumers do not require that build environment in their browser application.

## Release

Maintainers choose the next version after reviewing the changelog and migration notes. CI builds docs, Storybook, ESM/CJS and declarations and exercises the packed package. Publishing uses a reviewed manual workflow with an npm token; the assignment does not publish automatically.
