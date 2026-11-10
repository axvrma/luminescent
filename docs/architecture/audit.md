# Luminescent 2.0 engineering audit

Audited 2026-11-10, starting at `3bd321a` (clean worktree). The supplied request ends at “9.2 Package exports”. Scope follows all preceding requirements.

## Architecture and baseline

npm workspaces: a Vite/TypeScript library (`luminescent@0.1.7`) with 22 components, Storybook 10, and a Next.js 16 documentation application consuming its built output. ESM, CJS, declarations and `luminescent/style.css` are public. React 18/19 are declared peers. The entry has a client boundary, so interactive components can be imported from an RSC; callbacks still require a client component.

Actual baseline commands, before behavior changes:

- `npm ci --ignore-scripts`: installed 830 packages; default shell Node 18 is unsupported. Continued with installed Node 24.19.0. Initial install reported 34 advisories; subsequent audit reported 32 (2 low, 18 moderate, 5 high, 7 critical).
- `npm run build:lib`: TypeScript completed, Vite failed: missing `@rolldown/binding-darwin-arm64` optional native binding.
- `npm run build:docs`, `npm run test:components`, `npm pack --workspace luminescent --dry-run`: blocked by the same library build in their prerequisite/prepack.
- `npm run build-storybook`: blocked by the same native binding.
- `npm run lint`: failed in library (33 errors, 18 warnings, including accidentally linted generated Storybook assets) and docs (9 errors, 4 warnings). Explicit `any`, state synchronization effects, unused code and generated-file ignores are defects.

No passing browser baseline is claimed. Baseline logs were captured in `/tmp/lumi-baseline-*` during implementation.

## Defects and risks

### Semantics and behavior

RadioGroup hardcodes `name="radiogroup"`, calls onChange on both label click and input change, lacks uncontrolled operation and disabled options. SegmentedControl uses tabs without panels or arrow navigation. Button defaults to form submit, lacks loading and variant contracts. Toggle spreads onClick over its internal handler and lacks native form participation. TextField lacks linked label/error slots. Rating accepts nonfinite values and unbounded max; Slider fails to normalize nonfinite/reversed bounds and steps. Accordion already uses unique IDs and hidden panels; preserve that behavior. Checkbox/Select are useful native foundations. Progress already clamps ordinary values; preserve its indeterminate semantics. Alert, Chip and Skeleton have sound basic semantics but need themes and consistent refs. Card tracks every cursor by default. FloatingMenu has unlabeled icon controls, buttons without types and missing focus treatment; also accidentally exports `cn` (preserve).

### Animation and rendering

Button, Toggle, TextField and CodeBlock inject repeated, conflicting, unnamespaced style/keyframe definitions. ContainerTextFlip splits undefined on empty arrays, cycles without pause, animates content invisible on first render and measures only at word changes. CodeBlock uses any, copies line numbers/trimmed code, leaves timers alive and rejects uncaught Clipboard errors. ScreenReveal keeps hidden layer controls tabbable and has unstable initial open rendering. ImagesBadge has no keyboard equivalent of hover and unused sizing props. Timeline installs multiple scroll listeners and continuously animates paint properties; ResizeObserver is assumed available. All need SSR-visible information and motion alternatives.

### Distribution

React/ReactDOM/Framer/Lucide appear in both peers and dependencies. Hook-form is story-only. Only four runtime roots are externalized; Prism/merge utilities are bundled. Tailwind preflight resets arbitrary consumer elements and utility classes are unnamespaced. Package lacks sideEffects metadata, license, changelog, CI and release gates. Browser claims include Safari 13 without validation. Declaration generation includes playground sources. No consumer packing/SSR/tree-shaking checks exist. A single library client boundary is deliberate; this is not a server-only component package.

### Documentation and development

Next.js docs use `any` JSON compatibility adapters for MDX arrays, no static route enumeration, no per-page metadata, weak navigation, no local search or configurable playground. Homepage example references unsupported Button glowColor. Header nests button inside anchor. Playground is the Vite starter. Storybook hardcodes black and marks a11y as TODO. Old HTML dumps, Python patch scripts and a pen archive are unrelated source artifacts.

## Decisions and implementation status

Preserve every existing export and entry (see compatibility.md); make additive props. SegmentedControl intentionally becomes a native radio selection group; distinct Tabs provides panels. Use CSS custom properties with scoped theme containers, system media rules and stable SSR. Retain Button motion props for compatibility. React/ReactDOM remain peers only; Framer/Lucide become ordinary external dependencies, hook-form becomes development-only. Use individually scoped Radix Dialog/Tooltip/Popover/DropdownMenu/Tabs/Toast dependencies to delegate complex focus and dismissal behavior. Preserve module boundaries for tree shaking. Remove library Tailwind utilities/reset; development stories may load their own utilities.

Implementation and verified command results are recorded in `docs/architecture/validation.md`. No release or publish is performed by this assignment. Version remains 0.1.7 pending maintainer release choice.

## Completion

All seven supplied implementation phases are represented in the checkout. See validation.md for exact command coverage, package sizes and remaining platform/release limitations. The component catalog has 34 families (22 original, 12 added). All existing public names remain available. There are no placeholder implementations in the added catalog.
