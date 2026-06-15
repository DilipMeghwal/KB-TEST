import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.locator('div[id=showOverview] h1.title');
  }

  async getTitleText(): Promise<string> {
    return await this.title.textContent() || '';
  }
}