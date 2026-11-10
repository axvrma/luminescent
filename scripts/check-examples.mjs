import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { buildPlaygroundCode } from '../apps/docs/src/lib/playground-code.ts';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const catalog = JSON.parse(
  await readFile(new URL('../apps/docs/src/lib/catalog-data.json', import.meta.url), 'utf8'),
);
const directory = await mkdtemp(path.join(root, 'apps/docs/.example-check-'));
try {
  for (const [name, entry] of Object.entries(catalog)) {
    await writeFile(path.join(directory, `${name}.tsx`), entry.code);
    await writeFile(path.join(directory, `${name}.theme.tsx`), entry.themedCode);
    if (entry.controlledCode)
      await writeFile(path.join(directory, `${name}.controlled.tsx`), entry.controlledCode);
  }
  for (const [name, entry] of Object.entries(catalog)) {
    const code = buildPlaygroundCode({
      name,
      code: entry.code,
      theme: 'light',
      accent: 'violet',
      glow: 'subtle',
      reduced: true,
    });
    await writeFile(path.join(directory, `${name}.playground.tsx`), code);
  }
  await writeFile(
    path.join(directory, 'Button.configured.tsx'),
    buildPlaygroundCode({
      name: 'Button',
      code: catalog.Button.code,
      theme: 'light',
      accent: 'mint',
      glow: 'none',
      reduced: true,
      variant: 'outline',
      size: 'sm',
      disabled: true,
      loading: true,
    }),
  );
  await writeFile(
    path.join(directory, 'Avatar.configured.tsx'),
    buildPlaygroundCode({
      name: 'Avatar',
      code: catalog.Avatar.code,
      theme: 'dark',
      accent: 'peach',
      glow: 'normal',
      reduced: false,
      size: 'lg',
    }),
  );
  await writeFile(
    path.join(directory, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        target: 'es2023',
        lib: ['es2023', 'dom'],
        module: 'esnext',
        moduleResolution: 'bundler',
        jsx: 'react-jsx',
        strict: true,
        skipLibCheck: false,
        noEmit: true,
        esModuleInterop: true,
      },
      include: ['*.tsx'],
    }),
  );
  execFileSync(
    process.execPath,
    [
      path.join(root, 'node_modules/typescript/bin/tsc'),
      '-p',
      path.join(directory, 'tsconfig.json'),
    ],
    { stdio: 'inherit' },
  );
  console.log(
    `Compiled ${(await readdir(directory)).filter((file) => file.endsWith('.tsx')).length} examples across ${Object.keys(catalog).length} component families against the built package.`,
  );
} finally {
  await rm(directory, { recursive: true, force: true });
}
