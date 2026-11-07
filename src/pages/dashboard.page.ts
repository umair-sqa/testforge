import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly heading: Locator;
  readonly welcomeMessage: Locator;
  readonly signOutButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.welcomeMessage = page.getByText('Welcome back.');
    this.signOutButton = page.getByRole('button', { name: 'Sign out' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/dashboard');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async signOut(): Promise<void> {
    await this.signOutButton.click();
    await expect(this.page).toHaveURL(/\/login$/);
  }
}
