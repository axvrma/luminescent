# Luminescent documentation

This Next.js app is part of the Luminescent npm workspace. It depends on the local package at `../../packages/luminescent`.

Run commands from the repository root:

```bash
nvm use
npm install
npm run dev             # Watch the library and run the docs on localhost:3000
npm run build:docs      # Build the local library, then this app
npm start               # Serve the production build
npm run lint:docs
```

Edit pages in `src/app`, Markdown content in `content/docs`, and shared components in `../../packages/luminescent/src/components`.

Next.js needs the local library's `dist` output. Root development and build commands create it automatically. See the root README for installation, Storybook, publishing, and deployment instructions.
