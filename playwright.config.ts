import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
console.log('Loading environment variables from:', path.resolve(__dirname + "/.env", `${process.env.ENV}.env`));
dotenv.config({ path: path.resolve(__dirname + "/.env", `${process.env.ENV}.env`) });
console.log('Environment variables loaded:', {
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
});

console.log('Base URL for tests:', process.env.WEB_URL);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
reporter: [
    ['line'], // Optional: Keeps standard console output
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Automatically capture traces, screenshots, and videos on test failures
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'parabank-ui-tests',
      use: { ...devices['Desktop Chrome'] , baseURL: process.env.WEB_URL },
    },
  ],
});
