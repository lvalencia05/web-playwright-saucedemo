import { test, expect } from '../../src/fixtures/base.fixture';
import { USERS }         from '../../src/data/users';
import { PRODUCTS }      from '../../src/data/products';

test.describe('Inventory — Catálogo de productos', () => {

  // El login se maneja automáticamente a través de la fixture 'inventoryPage'
  test('Debe mostrar 6 productos en el catálogo', async ({ inventoryPage }) => {

    const count = await inventoryPage.getProductCount();

    expect(count).toBe(6);
  });

  test('Debe ordenar productos de menor a mayor precio', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts('lohi');
    const prices = await inventoryPage.getProductPrices();

    // Verifica que cada precio sea menor o igual al siguiente
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('Debe ordenar productos de mayor a menor precio', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts('hilo');
    const prices = await inventoryPage.getProductPrices();

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });

  test('Debe agregar un producto al carrito', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);

    expect(await inventoryPage.getCartItemCount()).toBe('1');
  });

  test('Debe agregar múltiples productos al carrito', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);
    await inventoryPage.addProductToCart(PRODUCTS.boltTShirt);

    expect(await inventoryPage.getCartItemCount()).toBe('3');
  });

  test('Debe permitir agregar y luego eliminar un producto', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    expect(await inventoryPage.getCartItemCount()).toBe('1');

    await inventoryPage.removeProductFromCart(PRODUCTS.backpack);
    expect(await inventoryPage.getCartItemCount()).toBe('0'); // O vacío, dependiendo de la implementación
  });

  test('Debe navegar al carrito al hacer click en el ícono', async ({ inventoryPage, page }) => {
    await inventoryPage.goToCart();

    await expect(page).toHaveURL(/cart/);
  });

});
