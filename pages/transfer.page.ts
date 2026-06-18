import { Page, Locator, expect } from "@playwright/test";

export class TransferPage {
  readonly page: Page;
  readonly transferFundsLink: Locator;
  readonly amountInput: Locator;
  readonly fromAccountIdSelect: Locator;
  readonly toAccountIdSelect: Locator;
  readonly transferButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transferFundsLink = this.page.locator('a[href*="transfer.htm"]');
    this.amountInput = this.page.locator('input#amount');
    this.fromAccountIdSelect = this.page.locator('select#fromAccountId');
    this.toAccountIdSelect = this.page.locator('select#toAccountId');
    this.transferButton = this.page.locator('input[type="submit"]');
    this.successMessage = this.page.locator('div#showResult h1.title');
  }

  async navigateToTransferFunds() {
    await this.transferFundsLink.click();
    await this.amountInput.waitFor();
    // Wait for the accounts API response which populates the dropdowns
    await this.page.waitForResponse(response => response.url().includes('accounts') && response.status() === 200);
    // Wait for at least one option to be present and visible
    await this.fromAccountIdSelect.locator('option').first().waitFor({ state: 'attached' });
  }

  async getFromAccountIds(): Promise<string[]> {
    return await this.fromAccountIdSelect.locator('option').evaluateAll(options => options.map(opt => (opt as HTMLOptionElement).value));
  }

  async getToAccountIds(): Promise<string[]> {
    return await this.toAccountIdSelect.locator('option').evaluateAll(options => options.map(opt => (opt as HTMLOptionElement).value));
  }

  async transferFunds(amount: string, fromAccountId: string, toAccountId: string) {
    await this.amountInput.fill(amount);
    await this.fromAccountIdSelect.selectOption(fromAccountId);
    await this.toAccountIdSelect.selectOption(toAccountId);
    
    // Wait for the transfer API request to complete
    const transferResponse = this.page.waitForResponse(response => 
        response.url().includes('services_proxy/bank/transfer') && response.status() === 200
    );
    await this.transferButton.click();
    await transferResponse;
  }

  async getSuccessMessage(): Promise<string> {
    await this.successMessage.waitFor();
    return await this.successMessage.textContent() || '';
  }

  async getTransferResultText(): Promise<string> {
    const resultLocator = this.page.locator('div#showResult');
    // Wait for the text to contain the '#' symbol followed by digits, indicating IDs are populated
    await expect(resultLocator).toContainText(/account #\d+/);
    return await resultLocator.textContent() || '';
  }
}
