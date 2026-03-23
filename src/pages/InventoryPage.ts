import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { SortOption } from '../types';

export class InventoryPage extends BasePage {
  private readonly productList:    Locator;
  private readonly sortDropdown:   Locator;
  private readonly cartBadge:      Locator;
  private readonly cartIcon:       Locator;

  constructor(page: Page) {
    super(page);
    this.productList  = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge    = page.locator('.shopping_cart_badge');
    this.cartIcon     = page.locator('.shopping_cart_link');
  }

  protected getUrl(): string {
    return '/inventory.html';
  }

  async getProductCount(): Promise<number> {
    return await this.productList.count();
  }

  /** Agrega un producto al carrito por nombre */
  async addProductToCart(productName: string): Promise<void> {
    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });
    await product
      .locator('button[data-test*="add-to-cart"]')
      .click();
  }

  /** Remueve un producto del carrito por nombre desde el inventario */
  async removeProductFromCart(productName: string): Promise<void> {
    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });
    await product
      .locator('button[data-test*="remove"]')
      .click();
  }

  async sortProducts(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getCartItemCount(): Promise<string> {
    if (await this.cartBadge.isVisible()) {
      return (await this.cartBadge.textContent()) ?? '0';
    }
    return '0';
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async getProductPrices(): Promise<number[]> {
    // Optimización: Obtener todos los textos en una sola llamada al driver
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map(text => parseFloat(text.replace('$', '')));
  }
}