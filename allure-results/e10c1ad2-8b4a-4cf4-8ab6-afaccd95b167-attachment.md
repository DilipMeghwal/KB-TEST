# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> Parabank Login Tests >> should login with valid credentials
- Location: tests/example.spec.ts:16:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[name="username"]')

```

# Page snapshot

```yaml
- generic [ref=e2]: "{\"type\":\"about:blank\",\"title\":\"Bad Request\",\"status\":400,\"detail\":\"Required parameter 'username' is not present.\",\"instance\":\"/parabank/login.htm\"}"
```

# Test source

```ts
  1  | 
  2  | import { Page } from '@playwright/test';
  3  | 
  4  | export class LoginPage {
  5  |   readonly page: Page;
  6  | 
  7  |   constructor(page: Page) {
  8  |     this.page = page;
  9  |   }
  10 | 
  11 |   async login(username: string, password: string) {
> 12 |     await this.page.fill('input[name="username"]', username);
     |                     ^ Error: page.fill: Test timeout of 30000ms exceeded.
  13 |     await this.page.fill('input[name="password"]', password);
  14 |     await this.page.click('input[type="submit"]');
  15 |   }
  16 | }
```