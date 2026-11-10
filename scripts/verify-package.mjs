import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import postcss from 'postcss';
import { build } from 'esbuild';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const temporary = await mkdtemp(path.join(tmpdir(), 'luminescent-consumer-'));
const report = {
  formats: ['esm', 'cjs'],
  consumers: [],
  cssBytes: 0,
  badgeBundleBytes: 0,
  packedFiles: 0,
};
const expected = [
  'Accordion',
  'Alert',
  'Button',
  'Card',
  'Checkbox',
  'Chip',
  'CodeBlock',
  'ContainerTextFlip',
  'Divider',
  'FloatingMenu',
  'ImagesBadge',
  'Progress',
  'RadioGroup',
  'Rating',
  'ScreenReveal',
  'SegmentedControl',
  'Select',
  'Skeleton',
  'Slider',
  'TextField',
  'Timeline',
  'Toggle',
  'cn',
  'LuminescentProvider',
  'Dialog',
  'Modal',
  'Tooltip',
  'Popover',
  'DropdownMenu',
  'Tabs',
  'Toast',
  'ToastProvider',
  'Avatar',
  'AvatarGroup',
  'Badge',
  'Spinner',
  'EmptyState',
  'Breadcrumbs',
  'Pagination',
  'motionPresets',
];
try {
  const packed = JSON.parse(
    execFileSync(
      'npm',
      [
        'pack',
        '--workspace',
        'luminescent',
        '--ignore-scripts',
        '--json',
        '--pack-destination',
        temporary,
      ],
      { cwd: root, encoding: 'utf8' },
    ),
  )[0];
  report.packedFiles = packed.files.length;
  assert(
    packed.files.some((file) => file.path === 'LICENSE'),
    'Packed license missing',
  );
  assert(
    !packed.files.some((file) => /stories|\.test\.|App\.|main\.|dev\.css/.test(file.path)),
    'Development code leaked into package',
  );
  const css = await readFile(path.join(root, 'packages/luminescent/dist/style.css'), 'utf8');
  report.cssBytes = Buffer.byteLength(css);
  postcss.parse(css).walkRules((rule) => {
    if (rule.parent.type === 'atrule' && rule.parent.name.includes('keyframes')) return;
    for (const selector of rule.selectors)
      assert(
        selector.includes('lumi-') || selector === ':root',
        `Unscoped CSS selector: ${selector}`,
      );
    if (rule.selector === ':root')
      rule.walkDecls((decl) =>
        assert(decl.prop.startsWith('--lumi-'), `Global CSS declaration: ${decl.prop}`),
      );
  });
  assert(report.cssBytes < 60000, 'CSS budget exceeded');
  for (const reactVersion of ['18.3.1', '19.2.4']) {
    const directory = path.join(temporary, `react-${reactVersion}`);
    await import('node:fs/promises').then((fs) => fs.mkdir(directory));
    await writeFile(
      path.join(directory, 'package.json'),
      JSON.stringify({ name: 'packed-consumer', private: true, type: 'module' }),
    );
    execFileSync(
      'npm',
      [
        'install',
        '--ignore-scripts',
        '--no-audit',
        '--no-fund',
        path.join(temporary, packed.filename),
        `react@${reactVersion}`,
        `react-dom@${reactVersion}`,
        `@types/react@${reactVersion.startsWith('18') ? '18' : '19'}`,
        `@types/react-dom@${reactVersion.startsWith('18') ? '18' : '19'}`,
      ],
      { cwd: directory, stdio: 'pipe' },
    );
    const require = createRequire(path.join(directory, 'package.json'));
    const react = require('react');
    const { renderToString } = require('react-dom/server');
    const library = require('luminescent');
    const esm = await import(
      pathToFileURL(require.resolve('luminescent').replace('index.cjs', 'index.mjs')).href
    );
    for (const name of expected) {
      assert(name in library, `Missing CJS export ${name}`);
      assert(name in esm, `Missing ESM export ${name}`);
    }
    assert.equal(library.Modal, library.Dialog);
    const props = {
      Accordion: { title: 'Details', children: 'Content' },
      Button: { children: 'Save' },
      Chip: { children: 'React' },
      CodeBlock: { code: 'const value = 1;' },
      ContainerTextFlip: { words: ['First', 'Second'] },
      ImagesBadge: { text: 'Gallery', images: [] },
      RadioGroup: { label: 'Plan', options: [{ value: 'a', label: 'A' }] },
      ScreenReveal: { isOpen: true, frontContent: 'Front', revealContent: 'Back' },
      SegmentedControl: { tabs: ['One', 'Two'], 'aria-label': 'View' },
      Timeline: { data: [{ title: 'First', content: 'Content' }] },
      Toggle: { 'aria-label': 'Switch' },
      Dialog: { title: 'Dialog', trigger: react.createElement(library.Button, null, 'Open') },
      Tooltip: {
        content: 'Hint',
        children: react.createElement(library.Button, null, 'Hint trigger'),
      },
      Popover: { label: 'Preferences', trigger: react.createElement(library.Button, null, 'Open') },
      DropdownMenu: { items: [], trigger: react.createElement(library.Button, null, 'Actions') },
      Tabs: { items: [{ value: 'one', label: 'One', content: 'Panel' }] },
      Avatar: { alt: 'Alex Morgan' },
      EmptyState: { title: 'No projects' },
      Breadcrumbs: { items: [{ label: 'Home' }] },
      Pagination: { count: 10 },
    };
    for (const name of expected.filter(
      (name) => !['cn', 'motionPresets', 'Modal', 'Toast', 'ToastProvider'].includes(name),
    )) {
      const html = renderToString(react.createElement(library[name], props[name] ?? {}));
      assert(!html.includes('<style'), `${name} injects runtime CSS`);
    }
    renderToString(
      react.createElement(
        library.ToastProvider,
        null,
        react.createElement(library.Toast, { title: 'Saved' }),
      ),
    );
    const types = `import 'luminescent/style.css';\nimport { Button, Toggle, RadioGroup, Dialog, LuminescentProvider, type ButtonProps, type GlowColor } from 'luminescent';\nconst props: ButtonProps = { children: 'Save', variant: 'outline' };\nconst accent: GlowColor = 'violet';\nexport const app = <LuminescentProvider accent={accent}><Button {...props}/><Toggle aria-label="Notifications" defaultChecked/><RadioGroup label="Plan" options={[]}/><Dialog title="Dialog">Content</Dialog></LuminescentProvider>;`;
    await writeFile(path.join(directory, 'consumer.tsx'), types);
    await writeFile(
      path.join(directory, 'consumer.cts'),
      'import { Button, type ButtonProps } from "luminescent"; const props: ButtonProps = { children: "Save" }; export const component = Button; export const options = props;',
    );
    execFileSync(
      process.execPath,
      [
        path.join(root, 'node_modules/typescript/bin/tsc'),
        '--strict',
        '--noEmit',
        '--jsx',
        'react-jsx',
        '--module',
        'nodenext',
        '--moduleResolution',
        'nodenext',
        '--target',
        'es2023',
        '--lib',
        'es2023,dom',
        path.join(directory, 'consumer.tsx'),
        path.join(directory, 'consumer.cts'),
      ],
      { cwd: directory, stdio: 'inherit' },
    );
    const bundle = await build({
      stdin: {
        contents: 'import { Badge } from "luminescent"; console.log(Badge);',
        resolveDir: directory,
        loader: 'tsx',
      },
      bundle: true,
      write: false,
      format: 'esm',
      external: ['react', 'react/jsx-runtime'],
      minify: true,
      metafile: true,
      target: 'es2020',
    });
    const used = Object.values(bundle.metafile.outputs).flatMap((output) =>
      Object.entries(output.inputs)
        .filter(([, value]) => value.bytesInOutput > 0)
        .map(([name]) => name),
    );
    assert(
      !used.some((name) => /framer-motion|prism-react|@radix-ui|lucide-react/.test(name)),
      `Badge pulled in unrelated runtime modules: ${used}`,
    );
    report.badgeBundleBytes = bundle.outputFiles[0].contents.length;
    assert(report.badgeBundleBytes < 5000, 'Simple component bundle budget exceeded');
    report.consumers.push({
      react: reactVersion,
      exports: expected.length,
      ssr: 'pass',
      declarations: 'pass',
      treeShaking: 'pass',
    });
    console.log(
      `Packed React ${reactVersion}: ESM/CJS, ${expected.length} exports, SSR, declarations and tree shaking passed.`,
    );
  }
  await writeFile(
    path.join(root, 'docs/architecture/package-report.json'),
    JSON.stringify(report, null, 2) + '\n',
  );
  console.log(JSON.stringify(report));
} finally {
  await rm(temporary, { recursive: true, force: true });
}
