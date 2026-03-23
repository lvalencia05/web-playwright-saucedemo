import { test, expect } from '../../src/fixtures/base.fixture';
import { CartPage } from '../../src/pages/CartPage';
import { PRODUCTS } from '../../src/data/products';

test.describe('Cart — Gestión del Carrito', () => {

  test('Debe mantener los productos en el carrito después de recargar la página', async ({ page, inventoryPage }) => {
    const cart = new CartPage(page);

    // 1. Agregar producto
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    
    // 2. Ir al carrito
    await inventoryPage.goToCart();
    expect(await cart.getCartItemCount()).toBe(1);

    // 3. Recargar página (Simula persistencia de sesión)
    await page.reload();
    
    // 4. Validar que el ítem sigue ahí
    expect(await cart.getCartItemCount()).toBe(1);
    expect(await cart.hasProduct(PRODUCTS.backpack)).toBeTruthy();
  });

  test('Debe permitir eliminar productos desde la página del carrito', async ({ page, inventoryPage }) => {
    const cart = new CartPage(page);

    // Precondición: Carrito con item
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);
    await inventoryPage.goToCart();

    // Acción: Eliminar
    await cart.removeFirstItem();

    // Validación
    expect(await cart.getCartItemCount()).toBe(0);
  });

  test('El botón "Continue Shopping" debe regresar al inventario', async ({ page, inventoryPage }) => {
    const cart = new CartPage(page);
    
    await inventoryPage.goToCart();
    await cart.continueShopping();

    await expect(page).toHaveURL(/inventory\.html/);
  });
});
