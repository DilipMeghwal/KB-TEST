import { test, expect } from './transferFixture';

test.describe('Fund Transfer Tests', () => {
  test.beforeEach(async ({ login, page }) => {
    await page.goto('index.htm');
    await login.login(process.env.USERNAME!, process.env.PASSWORD!);
  });

  test('should successfully transfer funds between accounts', async ({ transfer }) => {
    await transfer.navigateToTransferFunds();
    
    const fromAccounts = await transfer.getFromAccountIds();
    const toAccounts = await transfer.getToAccountIds();

    if (fromAccounts.length > 0 && toAccounts.length > 0) {
        const fromAccount = fromAccounts[0];
        const toAccount = toAccounts[toAccounts.length - 1];
        const amount = '100';

        await transfer.transferFunds(amount, fromAccount, toAccount);
        
        expect(await transfer.getSuccessMessage()).toBe('Transfer Complete!');
        
        const resultText = await transfer.getTransferResultText();
        expect(resultText).toContain(`$${amount}.00 has been transferred from account #${fromAccount} to account #${toAccount}`);
    } else {
        throw new Error('Insufficient accounts found for transfer');
    }
  });
});
