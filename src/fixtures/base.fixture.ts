import { test as base } from '@playwright/test';
import { LoginPage }     from '../pages/LoginPage';
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
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await page.waitForURL('**/inventory.html');
    await use(new InventoryPage(page));
  },
});

export { expect } from '@playwright/test';