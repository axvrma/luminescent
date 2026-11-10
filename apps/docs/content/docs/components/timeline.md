---
title: "Timeline"
description: "A visually striking scrolling timeline component."
---

The `Timeline` component is designed to present chronological content beautifully, featuring an interactive scroll-linked luminescent track and glowing animated highlights.

## Default

<Preview>
  <Timeline 
    title="Changelog"
    description="See our latest updates and features."
    data='[{"title":"Version 1.0","content":"Initial release with the core luminescent components."},{"title":"Version 1.1","content":"Added the highly anticipated Timeline component with scroll-linked animations."}]'
  />
</Preview>

## Usage

```tsx
import { Timeline } from 'luminescent';

export default function App() {
  const timelineData = [
    {
      title: "Step 1",
      content: <p>Setup your account and configure your settings.</p>
    },
    {
      title: "Step 2",
      content: <p>Deploy your first project securely.</p>
    }
  ];

  return (
    <Timeline 
      title="Getting Started" 
      data={timelineData} 
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TimelineEntry[]` | | Array of timeline entries with `title` and `content`. |
| `title` | `ReactNode` | `undefined` | Optional title for the timeline section. |
| `description` | `ReactNode` | `undefined` | Optional description below the title. |
| `containerRef` | `React.RefObject<HTMLElement>` | `undefined` | Optional reference to a scrollable container (if the timeline is used inside an overflow element instead of the main window). |
| `className` | `string` | `undefined` | Additional CSS classes. |

### TimelineEntry

| Property | Type | Description |
|----------|------|-------------|
| `title` | `string` | The title of the timeline step. |
| `content` | `ReactNode` | The descriptive content for the step. |
