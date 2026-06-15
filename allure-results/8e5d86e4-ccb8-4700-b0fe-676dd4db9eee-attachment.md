# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> Parabank Login Tests >> should login with valid credentials
- Location: tests/example.spec.ts:16:7

# Error details

```
Error: page.fill: Test ended.
Call log:
  - waiting for locator('input[name="username"]')

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
     |                     ^ Error: page.fill: Test ended.
  13 |     await this.page.fill('input[name="password"]', password);
  14 |     await this.page.click('input[type="submit"]');
  15 |   }
  16 | }
```