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
Received: "HTTP Status 404 – Not Found"
Timeout:  5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    14 × unexpected value "HTTP Status 404 – Not Found"

```

```yaml
- heading "HTTP Status 404 – Not Found" [level=1]
- separator
- paragraph: Type Status Report
- paragraph: Description The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.
- separator
- heading "Apache Tomcat/10.1.52" [level=3]
```

# Test source

```ts
  1  | import { test } from './loginFixture';
  2  | const { expect, request } = require('@playwright/test');
  3  | 
  4  | test.describe('Parabank Login Tests', () => {
  5  |   test('should have the correct page title', async ({ page }) => {
  6  |     await page.goto('/login.htm');
> 7  |     await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
     |                        ^ Error: expect(page).toHaveTitle(expected) failed
  8  |   });
  9  | 
  10 |   test('should display the login form', async ({ page }) => {
  11 |     await page.goto('/login.htm');
  12 |     const loginForm = page.locator('#loginPanel');
  13 |     await expect(loginForm).toBeVisible();
  14 |   });
  15 | 
  16 |   test('should login with valid credentials', async ({ login }) => {
  17 |     await login.page.goto('/login.htm');
  18 |     await login.login(process.env.USERNAME, process.env.PASSWORD);
  19 |     await expect(login.page).toHaveURL(/.*overview\.htm/);
  20 |   });
  21 | 
  22 |   test('Login via API/Form and continue into UI', async ({ browser }) => {
  23 |     const baseUrl = process.env.WEB_URL;
  24 | 
  25 |     // 1. Create a request context to perform a form-based login
  26 |     const requestContext = await request.newContext({ baseURL: baseUrl });
  27 | 
  28 |     const response = await requestContext.post('/login.htm', {
  29 |       form: {
  30 |         username: 'john',
  31 |         password: 'demo'
  32 |       }
  33 |     });
  34 | 
  35 |     // Verify the login request went through (usually returns a 302 redirect)
  36 |     expect(response.status()).toBe(200);
  37 | 
  38 |     // 2. Capture the storage state (which contains the JSESSIONID cookie)
  39 |     const storageState = await requestContext.storageState();
  40 |     await requestContext.dispose();
  41 | 
  42 |     // 3. Create a new Browser Context pre-seeded with that authentication state
  43 |     const uiContext = await browser.newContext({ storageState });
  44 |     const page = await uiContext.newPage();
  45 | 
  46 |     // 4. Navigate straight to the authenticated dashboard
  47 |     await page.goto(`${baseUrl}/parabank/overview.htm`);
  48 | 
  49 |     // Assert you are successfully logged in on the UI side
  50 |     await expect(page.locator('#leftPanel')).toContainText('Welcome John Smith');
  51 | 
  52 |     // Clean up
  53 |     await uiContext.close();
  54 |   });
  55 | });
  56 | 
```