import { test } from './loginFixture';
const { expect, request } = require('@playwright/test');

test.describe('Parabank Login Tests', () => {
  test('should have the correct page title', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
  });

  test('should display the login form', async ({ page }) => {
    await page.goto('');
    const loginForm = page.locator('#loginPanel');
    await expect(loginForm).toBeVisible();
  });

  test('should login with valid credentials', async ({ login }) => {
    await login.page.goto('');
    await login.login(process.env.USERNAME, process.env.PASSWORD);
    await expect(login.page).toHaveURL(/.*overview\.htm/);
  });

  test('Login via API/Form and continue into UI', async ({ browser }) => {
    const baseUrl = 'http://localhost:8080';

    // 1. Create a request context to perform a form-based login
    const requestContext = await request.newContext({ baseURL: baseUrl });

    const response = await requestContext.post('/parabank/login.htm', {
      form: {
        username: 'john',
        password: 'demo'
      }
    });

    // Verify the login request went through (usually returns a 302 redirect)
    expect(response.status()).toBe(200);

    // 2. Capture the storage state (which contains the JSESSIONID cookie)
    const storageState = await requestContext.storageState();
    await requestContext.dispose();

    // 3. Create a new Browser Context pre-seeded with that authentication state
    const uiContext = await browser.newContext({ storageState });
    const page = await uiContext.newPage();

    // 4. Navigate straight to the authenticated dashboard
    await page.goto(`${baseUrl}/parabank/overview.htm`);

    // Assert you are successfully logged in on the UI side
    await expect(page.locator('#leftPanel')).toContainText('Welcome John Smith');

    // Clean up
    await uiContext.close();
  });
});
