import { readFileSync } from 'node:fs';
import { expect, test } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';
import catalog from '../../../apps/docs/src/lib/catalog-data.json' with { type: 'json' };
for (const [name, entry] of Object.entries(catalog)) {
  test(`${name} renders without runtime errors, overflow or automated accessibility violations in both themes`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/docs/components/${entry.slug}`);
    await expect(page.getByRole('heading', { name: `${name}.`, exact: true })).toBeVisible();
    for (const theme of ['dark', 'light']) {
      await page
        .getByRole('group', { name: 'Preview theme' })
        .getByRole('button', { name: theme, exact: true })
        .click();
      const results = await new AxeBuilder({ page }).include('#preview').analyze();
      expect(
        results.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => node.target),
        })),
      ).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}
test('independent radio groups and segmented selection retain native keyboard behavior', async ({
  page,
}) => {
  await page.goto('/docs/components/radiogroup');
  const plan = page.getByRole('radiogroup', { name: 'Plan', exact: true });
  const billing = page.getByRole('radiogroup', { name: 'Billing', exact: true });
  await plan.getByRole('radio', { name: /^Starter/ }).focus();
  await page.keyboard.press('Space');
  await expect(plan.getByRole('radio', { name: /^Starter/ })).toBeChecked();
  await expect(billing.getByRole('radio', { name: 'Monthly', exact: true })).toBeChecked();
  await page.keyboard.press('ArrowRight');
  await expect(plan.getByRole('radio', { name: /^Pro/ })).toBeChecked();
  await page.goto('/docs/components/segmentedcontrol');
  await page.getByRole('radio', { name: 'Design', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio', { name: 'Develop', exact: true })).toBeChecked();
});
test('dialog traps focus, inherits light theme, closes on Escape and restores its trigger', async ({
  page,
}) => {
  await page.goto('/docs/components/dialog');
  await page
    .getByRole('group', { name: 'Preview theme' })
    .getByRole('button', { name: 'light', exact: true })
    .click();
  const trigger = page.getByRole('button', { name: 'Edit profile', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Edit profile', exact: true });
  await expect(dialog).toBeVisible();
  expect(
    await dialog.evaluate((node) =>
      node.closest('[data-lumi-theme]')?.getAttribute('data-lumi-theme'),
    ),
  ).toBe('light');
  for (let index = 0; index < 6; index++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  }
  const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
  expect(results.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});
test('popover manages interactive focus and outside dismissal', async ({ page }) => {
  await page.goto('/docs/components/popover');
  const trigger = page.getByRole('button', { name: 'Preferences', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Display preferences' });
  await expect(dialog.getByRole('textbox', { name: 'Workspace name' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(dialog).toBeHidden();
});
test('dropdown skips disabled actions and restores focus after selection', async ({ page }) => {
  await page.goto('/docs/components/dropdownmenu');
  const trigger = page.getByRole('button', { name: 'Project actions' });
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Duplicate', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Delete', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status').filter({ hasText: 'delete' })).toBeVisible();
  await expect(trigger).toBeFocused();
});
test('tabs link their panel and support arrows, Home and End', async ({ page }) => {
  await page.goto('/docs/components/tabs');
  await page.getByRole('tab', { name: 'Overview' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tabpanel', { name: 'Activity' })).toBeVisible();
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'Overview' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});
test('tooltip opens for keyboard focus and dismisses with Escape', async ({ page }) => {
  await page.goto('/docs/components/tooltip');
  await page.getByRole('button', { name: 'Save workspace' }).focus();
  await expect(page.getByRole('tooltip')).toContainText('Save your current workspace');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toBeHidden();
});
test('search opens with keyboard, returns useful results and navigates with keyboard', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('ControlOrMeta+k');
  const dialog = page.getByRole('dialog', { name: 'Search documentation', exact: true });
  await expect(dialog).toBeVisible();
  const input = dialog.getByRole('searchbox');
  await input.fill('zzzz-no-result');
  await expect(dialog.getByRole('status')).toContainText('No results found');
  await input.fill('Dialog');
  await input.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/docs\/components\/dialog$/);
  await expect(dialog).toBeHidden();
});
test('playground generates the chosen theme and button state without evaluating code', async ({
  page,
}) => {
  await page.goto('/playground');
  await page
    .getByRole('group', { name: 'Preview theme' })
    .getByRole('button', { name: 'light', exact: true })
    .click();
  await page.getByRole('combobox', { name: 'Accent', exact: true }).selectOption('violet');
  await page.getByRole('combobox', { name: 'Variant', exact: true }).selectOption('outline');
  await page.getByRole('switch', { name: 'Loading', exact: true }).click();
  const preview = page.locator('.workbench-preview');
  await expect(preview.getByRole('button', { name: 'Create project' })).toBeDisabled();
  await expect(page.locator('.workbench-code')).toContainText('theme="light"');
  await expect(page.locator('.workbench-code')).toContainText('accent="violet"');
  await expect(page.locator('.workbench-code')).toContainText('variant="outline"');
  await expect(page.locator('.workbench-code')).toContainText('loading');
});
test('system theme and motion preferences have stable, accessible content', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/docs/components/containertextflip');
  await page
    .getByRole('group', { name: 'Preview theme' })
    .getByRole('button', { name: 'system', exact: true })
    .click();
  await expect(page.locator('.lumi-text-flip-word')).toContainText('thoughtful');
  await expect(page.getByRole('button', { name: 'Pause text animation' })).toHaveCount(0);
  await expect(page.locator('.workbench-preview')).toHaveCSS(
    'background-color',
    'rgb(250, 248, 246)',
  );
});

test('theme recipe overrides inherit and glow can be disabled independently', async ({ page }) => {
  await page.goto('/docs/components/button');
  const preview = page.locator('.workbench-preview');
  await preview.evaluate((node) =>
    (node as HTMLElement).style.setProperty('--lumi-glow-lg', '0px 0px 3px rgb(10, 20, 30)'),
  );
  await expect(preview.getByRole('button', { name: 'Create project' })).toHaveCSS(
    'box-shadow',
    /rgb\(10, 20, 30\)/,
  );
  await preview.evaluate((node) => (node as HTMLElement).style.removeProperty('--lumi-glow-lg'));
  await page.getByRole('combobox', { name: 'Glow intensity', exact: true }).selectOption('none');
  await expect(preview.getByRole('button', { name: 'Create project' })).toHaveCSS(
    'box-shadow',
    'none',
  );
  await page.goto('/docs/components/badge');
  await page
    .locator('.workbench-preview')
    .evaluate((node) =>
      (node as HTMLElement).style.setProperty('--lumi-accent-text', 'rgb(20, 40, 60)'),
    );
  await expect(page.locator('.workbench-preview .lumi-badge').first()).toHaveCSS(
    'color',
    'rgb(20, 40, 60)',
  );
});

test('standalone token CSS themes controls without changing host application styles', async ({
  page,
}) => {
  await page.goto('about:blank');
  await page.setContent(
    '<main><h1>Consumer application</h1><button id="host-button">Native action</button><section class="lumi-theme" data-lumi-theme="light" style="--lumi-font: monospace"><div class="lumi-field"><label for="consumer-name" class="lumi-label">Name</label><input id="consumer-name" class="lumi-input" /></div></section></main>',
  );
  const hostStyles = await page.evaluate(() => ({
    margin: getComputedStyle(document.body).margin,
    font: getComputedStyle(document.body).fontFamily,
    buttonBorder: getComputedStyle(document.querySelector('#host-button')!).borderStyle,
  }));
  await page.addStyleTag({
    content: readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8'),
  });
  expect(
    await page.evaluate(() => ({
      margin: getComputedStyle(document.body).margin,
      font: getComputedStyle(document.body).fontFamily,
      buttonBorder: getComputedStyle(document.querySelector('#host-button')!).borderStyle,
    })),
  ).toEqual(hostStyles);
  await expect(page.locator('.lumi-theme')).toHaveCSS('background-color', 'rgb(250, 248, 246)');
  await expect(page.locator('.lumi-label')).toHaveCSS('color', 'rgb(36, 33, 43)');
  await expect(page.locator('.lumi-input')).toHaveCSS('font-family', 'monospace');
});
