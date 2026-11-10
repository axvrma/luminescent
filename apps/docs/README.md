# Luminescent documentation

Run commands from the monorepo root. The site consumes the local built luminescent package.

- npm run dev: docs server plus library watcher.
- npm run docs:api: regenerate public API references and the trusted Markdown manifest after editing types/content.
- npm run build:docs: build the library and Storybook, then render the portal. Docs load at `/`; Storybook loads at `/stroybook/`.
- npm run test:components: production desktop/mobile interactions and accessibility scans.

Component descriptions, examples and accessibility contracts are typed in src/lib/catalog.ts and catalog-data.json; TypeScript prop references are generated from the library. The component route renders the shared workbench and preview implementations. Guide/example Markdown lives in content/docs. Local search indexes component metadata and the documented navigation routes. The playground transforms known example strings into JSX without evaluation.

Import the library stylesheet only in the root layout. Application reset/layout styles belong to globals.css and are not shipped to library consumers. Dark/light/system choices in previews are scoped with LuminescentProvider, including portalled overlays. Set NEXT_PUBLIC_SITE_URL to the real production origin before deploying.
