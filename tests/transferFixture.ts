import { test as loginTest } from './loginFixture';
import { TransferPage } from '../pages/transfer.page';

type TransferFixture = {
  transfer: TransferPage;
};

export const test = loginTest.extend<TransferFixture>({
  transfer: async ({ page }, use) => {
    const transferPage = new TransferPage(page);
    await use(transferPage);
  },
});

export { expect } from '@playwright/test';
export default test;
