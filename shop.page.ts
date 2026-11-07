import { expect, type Locator, type Page } from '@playwright/test';

export class ShopPage {
  readonly heading: Locator;
  readonly products: Locator;
  readonly cartCount: Locator;
  readonly cartTotal: Locator;
  readonly checkoutButton: Locator;
  readonly orderStatus: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Products' });
    this.products = page.locator('#products article');
    this.cartCount = page.locator('#cart-count');
    this.cartTotal = page.locator('#cart-total');
    this.checkoutButton = page.getByRole('button', { name: 'Place order' });
    this.orderStatus = page.locator('#order-status');
  }

  async goto(): Promise<void> {
    await this.page.goto('/shop');
    await expect(this.heading).toBeVisible();
    await expect(this.products.first()).toBeVisible();
  }

  async addProduct(name: string): Promise<void> {
    await this.page.getByRole('button', { name: `Add ${name} to cart` }).click();
  }

  async placeOrder(): Promise<void> {
    await this.checkoutButton.click();
    await expect(this.orderStatus).toContainText('placed successfully');
  }
}
