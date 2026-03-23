import { test, expect } from '../../src/fixtures/base.fixture';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { PRODUCTS } from '../../src/data/products';

test.describe('Checkout — Validaciones de Formulario', () => {
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page, inventoryPage }) => {
    // Precondición: Tener un producto y llegar al checkout
    const cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('Debe mostrar error si se intenta continuar sin llenar campos', async () => {
    await checkoutPage.continueCheckout();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Error: First Name is required');
  });

  test('Debe mostrar error si falta el apellido', async () => {
    await checkoutPage.fillCustomerInfo({ firstName: 'Juan', lastName: '', zipCode: '12345' });
    await checkoutPage.continueCheckout();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Error: Last Name is required');
  });

  test('Debe mostrar error si falta el código postal', async () => {
    await checkoutPage.fillCustomerInfo({ firstName: 'Juan', lastName: 'Perez', zipCode: '' });
    await checkoutPage.continueCheckout();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Error: Postal Code is required');
  });
});