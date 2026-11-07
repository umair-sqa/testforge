import { test as setup, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { env } from '../src/config/env';
import { LoginPage } from '../src/pages/login.page';

setup('authenticate test user', async ({ page }) => {
  await mkdir(path.dirname(env.authStatePath), { recursive: true });
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.signIn(env.testUserEmail, env.testUserPassword);
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.context().storageState({ path: env.authStatePath });
});
