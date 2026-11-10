---
title: "Migration from 0.1.7"
description: "Preserved entry points, more deliberate behavior."
---

## Package imports stay the same

Continue importing components from luminescent and CSS from luminescent/style.css. Existing component names, prop types and legacy aliases remain exported. No new version has been published by this work.

## Intentional behavior corrections

- Button defaults to type="button". Set type="submit" explicitly for form submissions.
- SegmentedControl represents a radio selection group. Its tabs prop is preserved; use the new Tabs component for tab/panel relationships.
- RadioGroup generates a unique name unless you supply one, supports defaultValue, and calls onChange once per selection.
- Card cursor spotlight is opt-in with spotlight. It stops for reduced motion.
- The library stylesheet no longer includes Tailwind preflight or global utilities. Applications should supply their own reset and layout styles.
- Repeated injected glow styles are replaced by shared, namespaced CSS. Deep selectors targeting previous internal divs need adjustment.
- Motion, Lucide and accessible foundations are ordinary runtime dependencies; only React/React DOM are peers.

## Customization

Move hardcoded color overrides to semantic --lumi- tokens. Wrap separately themed areas in LuminescentProvider. Retained TextField glowVariant values and CodeBlock language/lang aliases continue to work.

## Compatibility scope

ESM, CommonJS, declarations and packed React 18/19 rendering are tested. Browser tests currently target Chromium desktop/mobile; cross-browser and manual assistive-technology checks remain separate release responsibilities.
