import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('Auth — Logout', () => {
  
  test('El usuario debe poder cerrar sesión correctamente', async ({ page, inventoryPage }) => {
    // El login ya ocurrió en la fixture inventoryPage
    await inventoryPage.logout();

    // 1. Validar redirección al login
    await expect(page).toHaveURL('/');
    
    // 2. Validar seguridad: No se debe poder volver atrás usando el navegador
    await page.goBack();
    // Debería seguir en el login o mostrar error, no entrar al inventario
    // Nota: En SauceDemo, al hacer back a veces ves el inventario pero las acciones fallan. 
    // Lo ideal es verificar que NO estamos en la URL de inventario autenticado.
    await expect(page).not.toHaveURL(/inventory\.html/);
  });
});
