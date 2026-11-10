# Luminescent ✨

A collection of premium, highly-polished, and visually stunning React UI components tailored specifically for modern dark-mode applications.

Luminescent is built with an obsession for detail, focusing on smooth micro-animations, mathematically precise glowing effects, and rich, vibrant aesthetics that instantly elevate any user interface.

## 🚀 Features

- **Mathematical Precision:** Utilizes advanced modern CSS techniques (`@property`, `padding-box` clipping) to create flawless, infinitely scalable glowing borders without bleed or stretch.
- **Dynamic Interactions:** Components feature fluid sliding indicators, discrete fades, and magnetic hover effects powered by Framer Motion.
- **Premium Aesthetics:** Curated dark-mode color palettes featuring rich blacks (`#050505`), glassmorphism, and vibrant gradient blooms.
- **Drop-in Ready:** Built with React and Tailwind CSS. Just copy the component and its dependencies into your codebase.

## 📦 Components Included

* **Checkbox, Select, Slider, Rating:** Native form controls with illuminated focus states, glowing indicators, and keyboard support.
* **Chip:** Soft or outlined tags with four glow palettes and an optional removal action.
* **Card:** Dark glass surfaces with lit edges and a cursor-following spotlight.
* **Accordion:** Accessible expandable details with controlled or uncontrolled state.
* **Alert:** Info, success, warning, and error feedback with optional dismissal.
* **Progress:** Determinate and indeterminate linear beams and circular rings.
* **Skeleton:** Text, rectangular, and circular placeholders with motion-aware shimmer or pulse.
* **TextField:** Features a hyper-smooth, animated "single stream" light gradient that actively orbits the input border while focused.
* **SegmentedControl:** A pill-shaped layout control featuring a beautifully animated, sliding active indicator that snaps seamlessly between options.
* **RadioGroup:** Offers both vertical and horizontal layouts, supporting customizable light variants (slide or fade) to indicate active states.
* **Button:** Highly stylized primary and secondary buttons featuring peachy, ambient blooms and deeply interactive hover states.
* **Divider:** A gorgeous visual separator that emits a soft, fading glow from the edges or center to break up content beautifully.

## 🛠️ Technology Stack

- **React** (v19)
- **Tailwind CSS** (v3.4)
- **Framer Motion** (for complex fluid layout animations)
- **Vite** & **Storybook** (for component development and preview)

Import `luminescent/style.css` once at your application's root. The extended components support `glowColor="peach"`, `"violet"`, `"blue"`, or `"mint"`; alerts derive their palette from severity. All new continuous animations respect `prefers-reduced-motion`.

## 📖 Viewing the Playground

Luminescent uses Storybook to showcase all components in an interactive, dark-themed playground.

```bash
# Install dependencies
npm install

# Start the interactive Storybook playground
npm run storybook
```

## 🌐 Deployment

This project includes a zero-configuration `netlify.toml` file. To deploy the interactive Storybook playground to Netlify:
1. Connect this repository to your Netlify dashboard.
2. Netlify will automatically build the static Storybook using `npm run build-storybook` and serve it from the `storybook-static` directory.
