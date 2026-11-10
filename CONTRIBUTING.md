# Contributing

Use Node 24 (or 22.13+) and npm >=10, from the repository root.

```sh
npm ci
npm run dev
npm run storybook
```

Regenerate documentation manifests/API references after changing interfaces or Markdown content:

```sh
npm run docs:api
```

Before opening a pull request:

```sh
npm run build:lib
npm run check
npm run build:docs
npm run build-storybook
npx playwright install chromium
npm run test:components
```

Keep existing public names and callback shapes unless a migration is documented. Use semantic --lumi- tokens and .lumi- selectors. Preserve native form behavior, refs, accessible names and consumer event handlers. Write tests for behavior, including controlled/uncontrolled state and relevant edge cases. Every component needs typed props, docs, representative stories, both themes and reduced motion. Prefer established accessible foundations for complex focus behavior.

CI tests a packed tarball with React 18 and 19. React/React DOM are peers; runtime dependencies must remain external to the library build. The package stylesheet must not include global element resets. Do not add mandatory cursor tracking or continuous effects.

Release is a separate, explicit maintainer action. Update the package version and changelog, commit the matching lockfile, then run the manual release workflow. Its npm token belongs in the protected npm GitHub environment; npm two-factor authentication and provenance configuration remain account settings. The workflow defaults to a dry run and refuses to publish a version that differs from the reviewed manifest.
