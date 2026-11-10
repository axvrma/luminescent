import { defineConfig, devices } from 'playwright/test';

const existingServer = process.env.LUMINESCENT_TEST_URL;

export default defineConfig({
  testDir: './packages/luminescent/tests',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: { baseURL: existingServer ?? 'http://127.0.0.1:3100', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: existingServer
    ? undefined
    : {
        command: 'npm run start --workspace luminescent-docs -- --hostname 127.0.0.1 --port 3100',
        url: 'http://127.0.0.1:3100',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
