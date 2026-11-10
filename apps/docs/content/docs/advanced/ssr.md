---
title: "SSR / Next.js"
description: "Predictable markup from the first render."
---

## Import from the application boundary

Import luminescent/style.css once in the root layout. The root package ships a use client directive in both module formats, so a Next.js Server Component can reference the library. Place state and event handlers in your own client component.

## Stable IDs and preferences

Fields and groups use useId unless a consumer ID/name is provided. Theme system preference is CSS-driven. No component needs localStorage, document or window during server rendering.

## Portals

Overlays render through Radix portals on the client. LuminescentProvider supplies a local portal container so a nested theme is retained. The server still renders trigger content; opening an overlay is a client interaction.

## Hydration

Keep words, IDs and initial controlled state consistent between server and client. ContainerTextFlip renders its first word and accessible text in server HTML. ScreenReveal renders its initial isOpen state directly, without a hidden-to-open first-frame mismatch.

## Verification

The packed consumer script server-renders every component against both React 18 and 19, then checks a bundler consumer. Browser tests collect hydration/runtime errors while navigating the built documentation pages.
