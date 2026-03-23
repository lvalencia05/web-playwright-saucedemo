import { test, expect } from '../../src/fixtures/base.fixture';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { PRODUCTS, CUSTOMER_INFO } from '../../src/data/products';

test.describe('Checkout — Lógica de Negocio', () => {

  test('El cálculo de impuestos y total debe ser matemáticamente correcto', async ({ page, inventoryPage }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Agregar producto y llegar al paso 2 del checkout
    await inventoryPage.addProductToCart(PRODUCTS.backpack); // $29.99
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCustomerInfo(CUSTOMER_INFO);
    await checkoutPage.continueCheckout();

    // 2. Obtener textos de los precios
    const subtotalText = await checkoutPage.getSubtotal(); // "Item total: $29.99"
    const taxText = await checkoutPage.getTax();           // "Tax: $2.40"
    const totalText = await checkoutPage.getOrderTotal();  // "Total: $32.39"

    // 3. Función auxiliar para limpiar y parsear el precio
    const parsePrice = (text: string) => parseFloat(text.replace(/[^0-9.]/g, ''));

    const subtotal = parsePrice(subtotalText);
    const tax = parsePrice(taxText);
    const total = parsePrice(totalText);

    console.log(`Subtotal: ${subtotal}, Tax: ${tax}, Total: ${total}`);

    // 4. Validaciones
    expect(subtotal).toBeGreaterThan(0);
    
    // Validar suma: Subtotal + Tax = Total (usando closeTo para evitar errores de redondeo de punto flotante)
    expect(subtotal + tax).toBeCloseTo(total, 2);
  });
});
