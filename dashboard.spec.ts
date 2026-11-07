import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Authenticated dashboard', () => {
  test('@smoke displays the signed-in user area', async ({ page, dashboardPage }) => {
    await page.goto('/dashboard');
    await dashboardPage.expectLoaded();
    await expect(page.getByText('Welcome back.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Open demo shop' })).toBeVisible();
  });

  test('@regression signs the user out', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('button', { name: 'Sign out' }).click();
    await expect(page).toHaveURL(/\/login$/);
  });
});
