import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Demo shop', () => {
  test('@smoke loads the product catalogue for an authenticated user', async ({ shopPage }) => {
    await shopPage.goto();
    await expect(shopPage.products).toHaveCount(3);
    await expect(shopPage.checkoutButton).toBeDisabled();
  });

  test('@regression adds a product and updates the cart total', async ({ shopPage }) => {
    await shopPage.goto();
    await shopPage.addProduct('Automation Field Guide');
    await expect(shopPage.cartCount).toHaveText('1');
    await expect(shopPage.cartTotal).toHaveText('$24.50');
    await expect(shopPage.checkoutButton).toBeEnabled();
  });

  test('@smoke completes checkout and clears the cart', async ({ shopPage }) => {
    await shopPage.goto();
    await shopPage.addProduct('API Testing Checklist');
    await shopPage.placeOrder();
    await expect(shopPage.cartCount).toHaveText('0');
    await expect(shopPage.checkoutButton).toBeDisabled();
  });
});
