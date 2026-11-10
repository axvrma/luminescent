---
title: "Getting Started"
description: "How to install and set up Luminescent in your project."
---

Welcome to **Luminescent**, a collection of premium, highly-polished, and visually stunning React UI components tailored specifically for modern dark-mode applications.

## Installation

You can install the package using your favorite package manager:

```bash
npm install luminescent
```

> **Note**: Luminescent requires `react`, `react-dom`, `framer-motion`, and `lucide-react` as peer dependencies. Make sure they are installed in your project.

## Usage

To use the components, simply import them along with the required CSS file at the root of your application (e.g., `_app.tsx` or `layout.tsx`).

```tsx
import 'luminescent/style.css'; // Add this to your root layout
import { Button } from 'luminescent';

export default function App() {
  return (
    <Button variant="primary">Hello Luminescent</Button>
  );
}
```

## Features

- **Dark Mode Native:** Designed meticulously for dark mode interfaces using OKLCH colors.
- **Framer Motion:** Smooth and elegant animations powered by `framer-motion`.
- **Accessible:** Built with WAI-ARIA standards in mind.

Explore the sidebar to see individual components in action!
