# Luminescent ✨

Luminescent's React component library, Storybook playground, and Next.js documentation site live in one npm workspace. The documentation uses the local `luminescent` package instead of downloading a published release.

## Projects

- `packages/luminescent` — publishable React component library, Vite playground, and Storybook stories.
- `apps/docs` — Next.js website, Markdown documentation, examples, and public assets imported from `luminescent-docs`.

The library keeps its npm package name (`luminescent`), version, and public exports. The root package is private. Both projects share the root `package-lock.json`; run dependency installation from this directory.

## Getting started

Use Node.js 24 (or Node.js 22.13+) and npm >=10:

```bash
nvm use
npm install
npm run dev
```

The docs run at http://localhost:3000. `npm run dev` first builds the library, then watches it and runs Next.js together, so component edits rebuild the local package used by the docs.

Other development commands:

```bash
npm run dev:docs        # Build the library and run only Next.js
npm run dev:playground  # Run the Vite playground
npm run storybook      # Run Storybook on port 6006
```

## Build and validation

```bash
npm run build          # Build the library, then the docs
npm run build:lib      # Build only the publishable library
npm run build:docs     # Build the library and docs
npm run build-storybook
npm run lint           # Lint both workspaces
npm run test:components # Browser checks on desktop and mobile (requires Playwright Chromium)
npm start              # Serve the production docs build
```

The library output is `packages/luminescent/dist`, the docs output is `apps/docs/.next`, and Storybook outputs to `packages/luminescent/storybook-static`.

The component gallery at `/docs/examples/component-gallery` covers Checkbox, Select, Slider, Rating, Chip, Card, Accordion, Alert, Progress, and Skeleton. Each also has individual documentation and Storybook stories. To install the browser for interaction checks, run `npx playwright install chromium` once. The checks start their own docs server on port 3100; when a docs server is already running, reuse it with `LUMINESCENT_TEST_URL=http://localhost:3000 npm run test:components` (adjust the port as needed).

## Publishing the library

```bash
npm pack --workspace luminescent --dry-run
npm publish --workspace luminescent
```

The library's `prepack` script builds it before packaging. Only its `dist` directory and npm's standard metadata files are published; the docs remain private.

## Deployment

The root `netlify.toml` builds and serves Storybook from `packages/luminescent/storybook-static`.

For the Next.js site, configure the hosting project's root directory as `apps/docs`, install the npm workspaces from the repository root (`cd ../.. && npm ci`), and build with `cd ../.. && npm run build:docs`. Keep the default Next.js output directory. The docs configuration traces files from the workspace root so deployments include the local library and Markdown content.

## Documentation source

The former `luminescent-docs` project is included under `apps/docs`, including its content, images, and support files. The original sibling checkout is retained as a backup and is no longer needed to build or run this workspace.
