import { expect, test } from 'playwright/test';

test('checkbox supports keyboard, mixed state, and disabled state', async ({ page }) => {
  await page.goto('/docs/components/checkbox');
  const lighting = page.getByRole('checkbox', { name: /Ambient lighting/ });
  await expect(lighting).toBeChecked();
  await lighting.focus();
  await page.keyboard.press('Space');
  await expect(lighting).not.toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Some projects selected' })).toHaveJSProperty('indeterminate', true);
  await expect(page.getByRole('checkbox', { name: 'Unavailable option' })).toBeDisabled();
});

test('select changes its controlled palette and keeps native disabled behavior', async ({ page }) => {
  await page.goto('/docs/components/select');
  const palette = page.getByRole('combobox', { name: 'Glow palette' });
  await palette.selectOption('violet');
  await expect(palette).toHaveValue('violet');
  await expect(palette.locator('xpath=../..')).toHaveCSS('--lumi-color', '192, 155, 255');
  await expect(page.getByRole('combobox', { name: 'Workspace' })).toBeDisabled();
});

test('slider updates its controlled value with keyboard bounds', async ({ page }) => {
  await page.goto('/docs/components/slider');
  const slider = page.getByRole('slider', { name: 'Light intensity' });
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await expect(slider).toHaveValue('65');
  await expect(slider).toHaveAttribute('aria-valuetext', '65%');
  await page.keyboard.press('End');
  await expect(slider).toHaveValue('100');
  await page.keyboard.press('Home');
  await expect(slider).toHaveValue('0');
  await expect(page.getByRole('slider', { name: 'Locked intensity' })).toBeDisabled();
});

test('rating uses arrow navigation and exposes a read-only summary', async ({ page }) => {
  await page.goto('/docs/components/rating');
  const group = page.getByRole('radiogroup', { name: 'Rate your experience' });
  await group.getByRole('radio', { name: '4 stars', exact: true }).focus();
  await page.keyboard.press('ArrowLeft');
  await expect(group.getByRole('radio', { name: '3 stars', exact: true })).toBeChecked();
  await expect(page.getByText('3 out of 5 stars')).toBeVisible();
  await expect(page.getByRole('img', { name: 'Community rating: 5 of 5' })).toBeVisible();
  await expect(page.getByRole('radiogroup', { name: 'Unavailable rating' }).getByRole('radio').first()).toBeDisabled();
});

test('chips can be removed and restored', async ({ page }) => {
  await page.goto('/docs/components/chip');
  await page.getByRole('button', { name: 'Remove React', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Remove React', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Reset tags' }).click();
  await expect(page.getByRole('button', { name: 'Remove React', exact: true })).toBeVisible();
});

test('accordion hides collapsed content and exposes its relationship', async ({ page }) => {
  await page.goto('/docs/components/accordion');
  const trigger = page.getByRole('button', { name: 'What makes it luminescent?' });
  const panelId = await trigger.getAttribute('aria-controls');
  const panel = page.locator(`[id="${panelId}"]`);
  await expect(panel).toBeVisible();
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toBeHidden();
  await page.keyboard.press('Space');
  await expect(panel).toBeVisible();
});

test('alerts expose severity and allow dismissal', async ({ page }) => {
  await page.goto('/docs/components/alert');
  await expect(page.getByRole('status').filter({ hasText: 'Changes saved' })).toBeVisible();
  await expect(page.getByRole('alert').filter({ hasText: 'Connection interrupted' })).toBeVisible();
  await page.getByRole('button', { name: 'Dismiss alert' }).click();
  await expect(page.getByText('Changes saved', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Show alert again' }).click();
  await expect(page.getByText('Changes saved', { exact: true })).toBeVisible();
});

test('progress updates its accessible value and supports indeterminate state', async ({ page }) => {
  await page.goto('/docs/components/progress');
  const progress = page.getByRole('progressbar', { name: 'Preparing your workspace' });
  await expect(progress).toHaveAttribute('aria-valuenow', '64');
  const slider = page.getByRole('slider', { name: 'Preview progress' });
  await slider.focus();
  await page.keyboard.press('End');
  await expect(progress).toHaveAttribute('aria-valuenow', '100');
  await expect(page.getByRole('progressbar', { name: 'Upload progress' })).toHaveAttribute('aria-valuenow', '100');
  await expect(page.getByRole('progressbar', { name: 'Syncing assets' })).not.toHaveAttribute('aria-valuenow');
});

test('skeletons stop their shimmer for reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/docs/components/skeleton');
  const skeleton = page.locator('.lumi-skeleton').first();
  await expect(skeleton).toHaveAttribute('aria-hidden', 'true');
  expect(await skeleton.evaluate(node => getComputedStyle(node, '::after').animationName)).toBe('none');
  await expect(page.getByRole('status', { name: 'Loading profile' })).toBeVisible();
});

test('card content remains interactive', async ({ page }) => {
  await page.goto('/docs/components/card');
  await page.getByRole('button', { name: 'Explore the glow' }).click();
  await expect(page.getByRole('button', { name: 'Keep creating ✨' })).toBeVisible();
});

test('gallery and homepage show the new components without overflow or browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const route of ['/docs/examples/component-gallery', '/']) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('slider', { name: route === '/' ? 'Glow intensity' : 'Light intensity' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});
