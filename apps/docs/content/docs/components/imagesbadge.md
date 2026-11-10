---
title: "ImagesBadge"
description: "A 3D interactive badge component displaying floating images."
---

The `ImagesBadge` component displays a small folder-like badge that opens in 3D on hover to reveal floating images with a sleek luminescent effect.

## Default

<Preview>
  <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
    <ImagesBadge
      text="Gallery"
      images='["/sample1.jpg", "/sample2.jpg", "/sample3.jpg"]'
    />
  </div>
</Preview>

## Usage

```tsx
import { ImagesBadge } from 'luminescent';

export default function App() {
  const images = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg"
  ];

  return (
    <ImagesBadge text="Gallery" images={images} />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | | The label text displayed below the badge. |
| `images` | `string[]` | | Array of image URLs (displays up to 3). |
| `href` | `string` | `undefined` | Optional link URL to make the badge clickable. |
| `target` | `string` | `undefined` | Optional target attribute for the link. |
| `baseWidth` | `number` | `80` | The base width of the component. |
| `imageSize` | `{ width: number; height: number }` | `{ width: 48, height: 32 }` | Dimensions of the floating images. |
| `className` | `string` | `undefined` | Additional CSS classes. |
