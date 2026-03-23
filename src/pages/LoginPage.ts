import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Selectores encapsulados como Locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton:   Locator;
  private readonly errorMessage:  Locator;

  constructor(page: Page) {
    super(page);
    // Usando getByTestId gracias a la configuración en playwright.config.ts
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton   = page.getByTestId('login-button');
    this.errorMessage  = page.getByTestId('error');
  }

  protected getUrl(): string {
    return '/';
  }

  /** Ejecuta el flujo completo de login */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.getTextContent(this.errorMessage);
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }
}