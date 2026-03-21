import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CustomerInfo } from '../types';

export class CheckoutPage extends BasePage {
  private readonly firstNameInput:  Locator;
  private readonly lastNameInput:   Locator;
  private readonly zipCodeInput:    Locator;
  private readonly continueButton:  Locator;
  private readonly finishButton:    Locator;
  private readonly totalLabel:      Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput  = page.locator('[data-test="lastName"]');
    this.zipCodeInput   = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton   = page.locator('[data-test="finish"]');
    this.totalLabel     = page.locator('.summary_total_label');
  }

  protected getUrl(): string {
    return '/checkout-step-one.html';
  }

  async fillCustomerInfo(info: CustomerInfo): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.zipCodeInput.fill(info.zipCode);
  }

  async continueCheckout(): Promise<void> {
    await this.continueButton.click();
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  async getOrderTotal(): Promise<string> {
    return (await this.totalLabel.textContent()) ?? '';
  }
}