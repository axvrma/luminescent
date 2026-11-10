# Luminescent

Beautiful by default. Accessible by design. Engineered for production.

Luminous React components, native form controls, scoped themes, and typed APIs. React 18 and 19 are supported. Tailwind CSS is not required by consumers.

```sh
npm install luminescent
```

```tsx
import { Button, LuminescentProvider } from 'luminescent';
import 'luminescent/style.css';

export function App() {
  return (
    <LuminescentProvider theme="system" accent="peach" glow="subtle">
      <Button>Create project</Button>
    </LuminescentProvider>
  );
}
```

Dark is the default. Theme accepts dark/light/system; accent accepts peach/violet/blue/mint; glow accepts none/subtle/normal/intense; motion accepts system/reduced. Override documented --lumi- CSS variables through the provider's typed style prop. Separately themed trees and their portalled overlays remain isolated.

## Components

Accordion, Alert, Button, Card, Checkbox, Chip, CodeBlock, ContainerTextFlip, Divider, FloatingMenu, ImagesBadge, Progress, RadioGroup, Rating, ScreenReveal, SegmentedControl, Select, Skeleton, Slider, TextField, Timeline, Toggle; plus Dialog/Modal, Tooltip, Popover, DropdownMenu, Tabs, Toast/ToastProvider, Avatar/AvatarGroup, Badge, Spinner, EmptyState, Breadcrumbs and Pagination. Public prop types are exported from the root.

TextField, Checkbox and Select use native change events. Toggle/Accordion use boolean callbacks; RadioGroup/SegmentedControl use string callbacks; Slider/Rating/Pagination use numeric callbacks. Complex overlays build on individually scoped Radix primitives.

## Server rendering

The package root includes a client boundary for Next.js. Import CSS in your root layout and put state/event handlers in a consumer client component. Components use stable IDs and CSS-based system themes. Both ESM and CJS are available. React/React DOM are peers, never bundled.

## Migration and version

The repository retains version 0.1.7 pending release. Changes described here are unreleased until a maintainer publishes a new version. Button now defaults to type="button"; SegmentedControl uses radio semantics (use Tabs for panels); Card spotlight is opt-in; distributed CSS no longer applies a global reset. See the root CHANGELOG and compatibility document.

## Development

Run npm ci from the monorepo root, then npm run dev, npm run storybook, or npm run dev:playground. See CONTRIBUTING.md in the repository for validation/release commands.

[Source and documentation](https://github.com/axvrma/luminescent) · MIT License
