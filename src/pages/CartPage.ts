import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly checkoutButton: Locator;
  private readonly cartItems:      Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems      = page.locator('.cart_item');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
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

  /** Remueve el primer ítem que encuentre en el carrito */
  async removeFirstItem(): Promise<void> {
    
    await this.cartItems.first().locator('button[data-test^="remove-"]').click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /** Verifica si un producto específico está visible en el carrito */
  async hasProduct(productName: string): Promise<boolean> {
    return await this.cartItems.filter({ hasText: productName }).isVisible();
  }
}