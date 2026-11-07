import { test as base, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { LoginPage } from '../pages/login.page';
import { ApiClient } from '../helpers/api-client';
import { ShopPage } from '../pages/shop.page';
import { env } from '../config/env';

interface AppFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  apiClient: ApiClient;
  shopPage: ShopPage;
}

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  shopPage: async ({ page }, use) => {
    await use(new ShopPage(page));
  },
  apiClient: async ({ playwright }, use) => {
    const apiRequest = await playwright.request.newContext({
      baseURL: env.apiBaseUrl,
      timeout: 15_000,
    });
    await use(new ApiClient(apiRequest));
    await apiRequest.dispose();
  },
});

export { expect };
