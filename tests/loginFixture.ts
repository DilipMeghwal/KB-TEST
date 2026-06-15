import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { test as base, type Page } from '@playwright/test';

type LoginFixture = {
  login: LoginPage;
  dashboard: DashboardPage;
};

export const test = base.extend<LoginFixture>({
  login: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  dashboard: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export default test;