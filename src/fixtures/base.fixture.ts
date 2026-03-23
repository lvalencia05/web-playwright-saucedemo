import { test as base } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS }          from '../data/users';

type AppFixtures = {
  inventoryPage: InventoryPage;
};

/**
 * Fixture que autentica al usuario antes de cada test.
 * Uso: import { test } from '../../src/fixtures/base.fixture'
 */
export const test = base.extend<AppFixtures>({
  inventoryPage: async ({ page, context }, use) => {
    // Bypass de UI Login mediante inyección de estado (Cookies)
    // Esto simula una autenticación vía API y acelera drásticamente los tests.
    await context.addCookies([{
      name: 'session-username',
      value: USERS.standard.username,
      domain: 'www.saucedemo.com',
      path: '/',
    }]);
    
    await page.goto('/inventory.html');
    await use(new InventoryPage(page));
  },
});

export { expect } from '@playwright/test';