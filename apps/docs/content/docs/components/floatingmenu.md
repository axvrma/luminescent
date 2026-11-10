---
title: "FloatingMenu"
description: "A sleek, sticky or absolute positioned floating menu."
---

The `FloatingMenu` component is a glass-morphism panel designed for quick actions or navigation links that float above the content.

## Default

<Preview>
  <div style={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <FloatingMenu items={[{ id: '1', label: 'Home', href: '#' }, { id: '2', label: 'About', href: '#' }, { id: '3', label: 'Settings', href: '#' }]} />
  </div>
</Preview>

## White Glow

<Preview>
  <div style={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <FloatingMenu glowColor="white" items={[{ id: '1', label: 'Home', href: '#' }, { id: '2', label: 'Profile', href: '#' }, { id: '3', label: 'Logout', href: '#' }]} />
  </div>
</Preview>

## Top Glow

<Preview>
  <div style={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <FloatingMenu glowColor="peach" glowPosition="top" items={[{ id: '1', label: 'Projects', href: '#' }, { id: '2', label: 'Tasks', href: '#' }, { id: '3', label: 'Team', href: '#' }]} />
  </div>
</Preview>

## With Divider (Light Projection)

<Preview>
  <div style={{ minHeight: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '2rem', position: 'relative' }}>
    <FloatingMenu withDivider glowColor="peach" glowPosition="bottom" items={[{ id: '1', label: 'Docs', href: '#' }, { id: '2', label: 'Components', href: '#' }, { id: '3', label: 'Blog', href: '#' }]} />
    <div style={{ marginTop: '3rem', maxWidth: '400px', textAlign: 'center', color: '#a1a1aa', zIndex: 0 }}>
      <h3 style={{ color: '#fff', marginBottom: '0.5rem', fontWeight: 500 }}>Illuminated Content</h3>
      <p>This text example demonstrates how the divider's down-illumination projects a subtle glowing light onto the content positioned below the floating menu.</p>
    </div>
  </div>
</Preview>

## Usage

```tsx
import { FloatingMenu } from 'luminescent';

export default function App() {
  return (
    <FloatingMenu 
      items={[
        { label: 'Profile', href: '/profile' },
        { label: 'Settings', href: '/settings' }
      ]} 
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `{ label: string, href: string }[]` | `[]` | The items to display in the menu. |
| `className` | `string` | `undefined` | Additional CSS classes. |
| `glowColor` | `'white' \| 'peach'` | `'peach'` | The color of the glow effect. |
| `glowPosition` | `'top' \| 'bottom'` | `'bottom'` | Whether the glow line appears at the top or bottom. |
| `activeId` | `string` | `undefined` | The currently active item's ID (for controlled usage). |
| `withDivider` | `boolean` | `false` | Renders a glowing divider below the menu to simulate light projection onto the content below. |
