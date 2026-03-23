import { test, expect } from '../../src/fixtures/base.fixture';
import { PRODUCTS } from '../../src/data/products';

test.describe('Inventory — Detalle de Producto', () => {
  
  // Agregamos 'inventoryPage' para asegurar que se ejecute el login y la navegación
  test('Debe navegar a la página de detalle al hacer click en el nombre del producto', async ({ page, inventoryPage }) => {
    // Click en "Sauce Labs Backpack"
    await page.locator('.inventory_item_name', { hasText: PRODUCTS.backpack }).click();

    // Validar URL y visibilidad del contenedor de detalles
    await expect(page).toHaveURL(/inventory-item\.html/);
    await expect(page.locator('.inventory_details_desc_container')).toBeVisible();
  });

  test('El botón "Back to products" debe regresar al inventario', async ({ page, inventoryPage }) => {
    // Ir al detalle
    await page.locator('.inventory_item_name', { hasText: PRODUCTS.backpack }).click();

    // Click en volver
    await page.locator('[data-test="back-to-products"]').click();

    // Validar regreso
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
