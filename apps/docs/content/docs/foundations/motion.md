---
title: "Motion"
description: "A small movement should have a clear reason."
---

## Preferences

Continuous CSS animations and transitions respect prefers-reduced-motion. Set motion="reduced" on LuminescentProvider to reduce motion in just one tree, including word cycling and the timeline beam. This also configures MotionConfig for motion-based consumers.

## Tokens

Fast, normal and slow durations are 120ms, 220ms and 400ms. `--lumi-ease` and `--lumi-ease-out` define standard curves. The exported `motionPresets` provides gentle and responsive spring presets for applications that use Framer Motion.

## Controls and visibility

ContainerTextFlip offers pause/resume, pauses its timer while the document is hidden, and reserves the longest word's size. ScreenReveal hides closed content from focus. Skeleton and Progress retain useful status even with animation stopped.

## Performance

Prefer opacity and transforms. Card spotlight is opt-in, updates CSS variables directly, and disables tracking with reduced motion. Avoid attaching dozens of continuously animated examples to one page.
