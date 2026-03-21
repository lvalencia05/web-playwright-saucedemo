import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navega a la URL de la página */
  async navigate(): Promise<void> {
    await this.page.goto(this.getUrl());
  }

  /** Retorna la URL relativa de la página */
  protected abstract getUrl(): string;

  /** Espera a que la página esté completamente cargada */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Obtiene el texto de un elemento */
  async getTextContent(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }
}