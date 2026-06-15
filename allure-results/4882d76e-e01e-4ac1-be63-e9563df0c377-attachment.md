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
  23 |     // 1. Create a request context to perform a form-based login
  24 |     const requestContext = await request.newContext({ baseURL: process.env.WEB_URL });
  25 | 
  26 |     const response = await requestContext.post('login.htm', {
  27 |       form: {
  28 |         username: 'john',
  29 |         password: 'demo'
  30 |       }
  31 |     });
  32 | 
  33 |     // Verify the login request went through (usually returns a 302 redirect)
  34 |     expect(response.status()).toBe(200);
  35 | 
  36 |     // 2. Capture the storage state (which contains the JSESSIONID cookie)
  37 |     const storageState = await requestContext.storageState();
  38 |     await requestContext.dispose();
  39 | 
  40 |     // 3. Create a new Browser Context pre-seeded with that authentication state
  41 |     const uiContext = await browser.newContext({ storageState });
  42 |     const page = await uiContext.newPage();
  43 | 
  44 |     // 4. Navigate straight to the authenticated dashboard
  45 |     await page.goto(`${baseUrl}/parabank/overview.htm`);
  46 | 
  47 |     // Assert you are successfully logged in on the UI side
  48 |     await expect(page.locator('#leftPanel')).toContainText('Welcome John Smith');
  49 | 
  50 |     // Clean up
  51 |     await uiContext.close();
  52 |   });
  53 | });
  54 | 
```