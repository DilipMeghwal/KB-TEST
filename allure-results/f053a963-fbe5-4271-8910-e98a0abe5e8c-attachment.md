# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> Parabank Login Tests >> should have the correct page title
- Location: tests/example.spec.ts:5:7

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected: "ParaBank | Welcome | Online Banking"
Received: ""
Timeout:  5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    14 × unexpected value ""

```

```yaml
- text: "{\"type\":\"about:blank\",\"title\":\"Bad Request\",\"status\":400,\"detail\":\"Required parameter 'username' is not present.\",\"instance\":\"/parabank/login.htm\"}"
```

# Test source

```ts
  1  | import { test } from './loginFixture';
  2  | const { expect, request } = require('@playwright/test');
  3  | 
  4  | test.describe('Parabank Login Tests', () => {
  5  |   test('should have the correct page title', async ({ page }) => {
  6  |     await page.goto('login.htm');
> 7  |     await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
     |                        ^ Error: expect(page).toHaveTitle(expected) failed
  8  |   });
  9  | 
  10 |   test('should display the login form', async ({ page }) => {
  11 |     await page.goto('login.htm');
  12 |     const loginForm = page.locator('#loginPanel');
  13 |     await expect(loginForm).toBeVisible();
  14 |   });
  15 | 
  16 |   test('should login with valid credentials', async ({ login }) => {
  17 |     await login.page.goto('login.htm');
  18 |     await login.login(process.env.USERNAME, process.env.PASSWORD);
  19 |     await expect(login.page).toHaveURL(/.*overview\.htm/);
  20 |   });
  21 | 
  22 |   test('Login via API/Form and continue into UI', async ({ browser }) => {
  23 |     const baseUrl = process.env.WEB_URL;
  24 |     // 1. Create a request context to perform a form-based login
  25 |     const requestContext = await request.newContext({ baseURL: baseUrl });
  26 | 
  27 |     const response = await requestContext.post('login.htm', {
  28 |       form: {
  29 |         username: 'john',
  30 |         password: 'demo'
  31 |       }
  32 |     });
  33 | 
  34 |     // Verify the login request went through (usually returns a 302 redirect)
  35 |     expect(response.status()).toBe(200);
  36 | 
  37 |     // 2. Capture the storage state (which contains the JSESSIONID cookie)
  38 |     const storageState = await requestContext.storageState();
  39 |     await requestContext.dispose();
  40 | 
  41 |     // 3. Create a new Browser Context pre-seeded with that authentication state
  42 |     const uiContext = await browser.newContext({ storageState });
  43 |     const page = await uiContext.newPage();
  44 | 
  45 |     // 4. Navigate straight to the authenticated dashboard
  46 |     await page.goto(`${baseUrl}/parabank/overview.htm`);
  47 | 
  48 |     // Assert you are successfully logged in on the UI side
  49 |     await expect(page.locator('#leftPanel')).toContainText('Welcome John Smith');
  50 | 
  51 |     // Clean up
  52 |     await uiContext.close();
  53 |   });
  54 | });
  55 | 
```