# Changelog

## Unreleased

- Added scoped dark/light/system themes, semantic CSS tokens, configurable glow, and reduced motion.
- Corrected radio names/callbacks, segmented selection semantics, safe button type, native form reset, linked field validation, numeric bounds, hidden reveal focus, animation timers, clipboard failures and SSR-visible content.
- Added Dialog/Modal, Tooltip, Popover, DropdownMenu, Tabs, Toast/ToastProvider, Avatar/AvatarGroup, Badge, Spinner, EmptyState, Breadcrumbs and Pagination.
- Preserved root/CSS entry points and existing export names. Published version remains 0.1.7 until a maintainer chooses and releases the next version.
- Rebuilt docs navigation, local search, component catalog, working examples, generated API references and theme playground; replaced starter Vite content.
- Removed distributed Tailwind reset/utilities and repeated runtime styles. React/React DOM are peers; other runtime dependencies remain external, with module boundaries for tree shaking.
- Added behavior/accessibility/browser tests, React 18/19 packed consumer checks, CI, and a guarded manual release workflow.

### Migration notes

Button defaults to type="button"; use type="submit" in forms. SegmentedControl is now a radio selection group; use Tabs for panels. Card spotlight is opt-in. Supply your own application reset/layout CSS. Internal glow DOM has changed; prefer public classes/tokens over deep selectors. See docs/architecture/compatibility.md for the export contract.

## 0.1.7

Existing package version in the starting checkout. Earlier release dates and historical changes have not been inferred.
