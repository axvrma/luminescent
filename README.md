# Luminescent

Beautiful by default. Accessible by design. Engineered for production.

An npm workspaces monorepo containing a typed React component library, a Next.js documentation portal and Storybook. Package identity and entry points remain `luminescent` and `luminescent/style.css`.

```sh
nvm use                  # Node 24; Node 22.13+ also supported
npm ci
npm run dev              # http://localhost:3000
```

- `packages/luminescent`: library source, token CSS, Vite laboratory, stories and behavior tests.
- `apps/docs`: documentation, local search, component catalog, interactive playground and generated API references.
- `docs/architecture`: baseline audit, API compatibility contract and validation evidence.

## Use the library

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

Consumers need React 18 or 19, with matching React DOM. Tailwind is not required. Themes use namespaced CSS variables. Motion and complex focus behavior can be configured through the provider; portalled overlays inherit local themes. The library stylesheet does not reset the consuming application's elements.

## Development

```sh
npm run dev:docs          # Build the library and run Next.js
npm run dev:playground    # Vite component laboratory
npm run storybook        # Storybook on port 6006
npm run docs:api          # Regenerate API + trusted Markdown manifests after source edits
```

`npm run dev` watches library changes. Regenerate documentation metadata after editing interfaces/Markdown. The docs homepage, `/docs/components`, and `/playground` use the local workspace package.

## Validation

```sh
npm run build:lib
npm run check            # Lint, types, metadata drift, behavior, examples, packed consumers
npm run build:docs       # Production docs + library
npm run build-storybook
npx playwright install chromium
npm run test:components  # Production desktop/mobile tests and dark/light axe checks
npm run test:storybook   # Standalone story accessibility checks
npm audit
```

`npm run test:package` installs the actual tarball in isolated React 18.3.1 and 19.2.4 consumers, renders every component on the server, checks ESM/CJS declarations and CSS isolation, and verifies a simple component does not bundle unrelated runtime modules. Results are written to `docs/architecture/package-report.json`.

## Release and deployment

The manifest remains **0.1.7**. These changes are **unreleased**. A maintainer chooses the next version and reviews `CHANGELOG.md` and the compatibility document before publishing. The manual release workflow validates a committed version and defaults to producing a dry-run tarball. Publishing requires explicitly selecting publish and an npm token in the protected GitHub environment. No publishing credentials are included.

Netlify serves the Next.js documentation portal at `/` and Storybook at `/stroybook/` via `netlify.toml`. Run `npm run build` (or `npm run build:docs`) at the repository root to build the library, Storybook and docs together. The Storybook build is copied into the docs app's public directory before Next.js builds. The docs header and sidebar link to Storybook; `/stroybook` redirects to `/stroybook/` so its assets and story links resolve correctly. Both `npm run dev` and `npm run dev:docs` prepare Storybook before starting the docs server; run `npm run build-storybook` again to refresh its bundled stories after editing them. Set `NEXT_PUBLIC_SITE_URL` to the actual production origin for social and sitemap URLs. Builds use local system fonts and do not depend on a network font fetch.

See [CONTRIBUTING.md](CONTRIBUTING.md), [CHANGELOG.md](CHANGELOG.md), [the audit](docs/architecture/audit.md), and [MIT License](LICENSE).
