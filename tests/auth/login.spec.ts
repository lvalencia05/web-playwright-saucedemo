import { test, expect } from '@playwright/test';
import { LoginPage }     from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { USERS }          from '../../src/data/users';

test.describe('Login — Autenticación', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Login exitoso con usuario estándar', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await expect(page).toHaveURL(/inventory/);
    await expect(page).toHaveTitle('Swag Labs');
    expect(await inventoryPage.getProductCount()).toBe(6);
  });

  test('Login fallido — usuario bloqueado', async () => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);

    await expect(loginPage.isErrorVisible()).resolves.toBe(true);
    expect(await loginPage.getErrorMessage())
      .toContain('Sorry, this user has been locked out');
  });

  test('Login fallido — credenciales vacías', async () => {
    await loginPage.login('', '');

    expect(await loginPage.getErrorMessage())
      .toContain('Username is required');
  });

  test('Login fallido — contraseña incorrecta', async () => {
    await loginPage.login(USERS.standard.username, 'wrong_password');

    expect(await loginPage.getErrorMessage())
      .toContain('Username and password do not match');
  });
});