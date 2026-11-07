import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

const browserProjects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'], storageState: env.authStatePath },
    dependencies: ['setup'],
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'], storageState: env.authStatePath },
    dependencies: ['setup'],
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'], storageState: env.authStatePath },
    dependencies: ['setup'],
  },
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: env.isCi,
  retries: env.isCi ? 1 : 0,
  ...(env.isCi ? { workers: 2 } : {}),
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  outputDir: 'test-results',
  use: {
    baseURL: env.baseUrl,
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts',
      use: { ...devices['Desktop Chrome'], storageState: { cookies: [], origins: [] } },
    },
    { name: 'api', testMatch: '**/api/**/*.spec.ts' },
    ...browserProjects.map((project) => ({
      ...project,
      testIgnore: ['**/api/**', '**/auth.setup.ts'],
    })),
  ],
  ...(env.useDemoServer
    ? {
        webServer: {
          command: 'npm run demo',
          url: env.baseUrl,
          reuseExistingServer: !env.isCi,
          timeout: 15_000,
        },
      }
    : {}),
});
