import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly checkoutButton: Locator;
  private readonly cartItems:      Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems      = page.locator('.cart_item');
  }

  protected getUrl(): string {
    return '/cart.html';
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }
}