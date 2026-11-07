import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../src/config/env';

// Login tests must start unauthenticated even though browser projects use saved auth state.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test('@smoke allows a registered user to sign in', async ({ loginPage, dashboardPage }) => {
    await loginPage.goto();
    await loginPage.signIn(env.testUserEmail, env.testUserPassword);
    await dashboardPage.expectLoaded();
  });

  test('@regression shows a useful error for invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.signIn('wrong@example.com', 'incorrect-password');
    await loginPage.expectError('Invalid email or password');
  });

  test('@regression marks both credential fields as required', async ({ loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.emailInput).toHaveAttribute('required', '');
    await expect(loginPage.passwordInput).toHaveAttribute('required', '');
  });
});
