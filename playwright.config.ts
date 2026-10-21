import { defineConfig, devices } from '@playwright/test';

// Not Astro's default port, so a running dev server is never mistaken for the
// production build
const PORT = 4322;

export default defineConfig({
  testDir: './e2e',
  outputDir: 'e2e-results/artifacts',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'e2e-results/html', open: 'never' }],
  ],
  use: {
    baseURL: `http://localhost:${PORT}`,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // `--ignore-lock` keeps the preview server in the foreground, so Playwright
  // can manage it. Without it, Astro moves the server to the background when
  // it detects it's being run by an AI agent, and Playwright would see it exit.
  webServer: {
    command: `npm run build && npm run preview -- --port ${PORT} --ignore-lock`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
