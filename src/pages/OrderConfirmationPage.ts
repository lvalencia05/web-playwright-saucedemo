import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  private readonly confirmationHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmationHeader = page.locator('.complete-header');
  }

  protected getUrl(): string {
    return '/checkout-complete.html';
  }

  async getConfirmationMessage(): Promise<string> {
    return (await this.confirmationHeader.textContent()) ?? '';
  }
}