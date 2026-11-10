import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFile, writeFile } from 'node:fs/promises';
const dirname = fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    ...(process.env.LUMINESCENT_STORYBOOK
      ? []
      : [
          dts({
            entryRoot: 'src',
            insertTypesEntry: true,
            bundleTypes: true,
            include: ['src/index.ts', 'src/components/**/*.tsx', 'src/lib/**/*.ts'],
            exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
            tsconfigPath: './tsconfig.lib.json',
            afterBuild: async () => {
              await copyFile(
                path.join(dirname, 'dist/index.d.ts'),
                path.join(dirname, 'dist/index.d.cts'),
              );
              await writeFile(path.join(dirname, 'dist/style.css.d.ts'), 'export {};\n');
            },
          }),
        ]),
  ],
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'Luminescent',
      cssFileName: 'style',
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: (id) => !id.startsWith('.') && !path.isAbsolute(id),
      output: {
        banner: '"use client";',
        preserveModules: true,
        preserveModulesRoot: path.resolve(dirname, 'src'),
      },
    },
  },
});
