import { test, expect } from '../../src/fixtures/base.fixture';
import { CartPage }              from '../../src/pages/CartPage';
import { CheckoutPage }          from '../../src/pages/CheckoutPage';
import { OrderConfirmationPage } from '../../src/pages/OrderConfirmationPage';
import { CUSTOMER_INFO }          from '../../src/data/products';

test.describe('Checkout — Flujo E2E', () => {

  // El login se maneja automáticamente a través de la fixture 'inventoryPage'
  test('Checkout exitoso con un producto', async ({ page, inventoryPage }) => {
    const inventory     = inventoryPage; // Reutilizamos la instancia de la fixture
    const cart          = new CartPage(page);
    const checkout      = new CheckoutPage(page);
    const confirmation  = new OrderConfirmationPage(page);

    // Agregar producto al carrito
    await inventory.addProductToCart('Sauce Labs Backpack');
    expect(await inventory.getCartItemCount()).toBe('1');

    // Ir al carrito y proceder
    await inventory.goToCart();
    await cart.proceedToCheckout();

    // Llenar datos del cliente
    await checkout.fillCustomerInfo(CUSTOMER_INFO);
    await checkout.continueCheckout();

    // Verificar resumen y completar orden
    expect(await checkout.getOrderTotal()).toMatch(/\$\d+\.\d{2}/);
    await checkout.finishCheckout();

    // Verificar confirmación
    await expect(page).toHaveURL(/checkout-complete/);
    expect(await confirmation.getConfirmationMessage())
      .toContain('Thank you for your order!');
  });
});