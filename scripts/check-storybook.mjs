import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const root = path.resolve(
  new URL('../packages/luminescent/storybook-static', import.meta.url).pathname,
);
const index = JSON.parse(await readFile(path.join(root, 'index.json'), 'utf8'));
const stories = Object.values(index.entries).filter(
  (entry) =>
    entry.type === 'story' &&
    (entry.id.endsWith('--default') ||
      entry.id.endsWith('--keyboard-interaction') ||
      entry.id.endsWith('--required-validation')),
);
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep) || !(await stat(file)).isFile()) {
      response.writeHead(404);
      response.end();
      return;
    }
    const extension = path.extname(file);
    response.setHeader(
      'Content-Type',
      {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.mjs': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.svg': 'image/svg+xml',
      }[extension] ?? 'application/octet-stream',
    );
    response.end(await readFile(file));
  } catch {
    response.writeHead(404);
    response.end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch();
let count = 0;
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  for (const story of stories) {
    for (const theme of ['dark', 'light']) {
      console.log(`Checking ${story.id} (${theme})`);
      await page.goto(
        `http://127.0.0.1:${server.address().port}/iframe.html?id=${story.id}&viewMode=story&globals=theme:${theme};motion:reduced`,
      );
      await page
        .locator('#storybook-root .lumi-theme')
        .waitFor()
        .catch(async (error) => {
          throw new Error(`${story.id} (${theme}): ${await page.locator('body').innerText()}`, {
            cause: error,
          });
        });
      await page.waitForFunction(() => !document.querySelector('#storybook-root .sb-errordisplay'));
      if (story.id.endsWith('--keyboard-interaction') || story.id.endsWith('--required-validation'))
        await page.waitForFunction(
          () =>
            document.querySelector('#storybook-root')?.getAttribute('data-interaction') ===
            'passed',
        );
      const results = await new AxeBuilder({ page }).include('#storybook-root').analyze();
      assert.deepEqual(
        results.violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => ({ target: node.target, reason: node.failureSummary })),
        })),
        [],
        `${story.id} (${theme}) failed a11y`,
      );
      count++;
    }
  }
  console.log(
    `Validated ${count} standalone Storybook accessibility/interaction cases in dark/light reduced-motion themes.`,
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
