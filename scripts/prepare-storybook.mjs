import { cp, rm } from 'node:fs/promises';

const source = new URL('../packages/luminescent/storybook-static/', import.meta.url);
const destination = new URL('../apps/docs/public/stroybook/', import.meta.url);

await rm(destination, { recursive: true, force: true });
await cp(source, destination, { recursive: true });
console.log('Storybook is ready at /stroybook/.');
