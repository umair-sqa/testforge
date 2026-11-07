# TestForge — Professional Playwright Automation Starter

> Version 0.3.0 development release. The framework source and demo application are included. Full TypeScript, browser, Docker and CI verification has not yet been completed in this build environment; review `RELEASE-CHECKLIST.md` before commercial distribution.

TestForge is a TypeScript Playwright starter for QA engineers and teams who want a maintainable baseline for UI and REST API automation.

It is not a universal drop-in test suite. Adapt the login flow, page objects, API contract, test data and environment settings to the application under test.

## What's included

- Strict TypeScript configuration and centralized environment settings.
- Page Object Model and typed custom fixtures.
- Authentication setup project that saves reusable browser storage state.
- Separate unauthenticated login tests and authenticated dashboard tests.
- API client wrapper and CRUD/validation examples.
- Unique test-data factory.
- Bundled local demo application with login, dashboard, product catalogue, cart, checkout and REST API; no third-party test account required.
- Playwright projects for API, Chromium, Firefox and WebKit.
- HTML, JUnit and JSON reports, traces, screenshots and videos on failure.
- GitHub Actions workflow that installs all browsers and runs validation plus the complete suite.
- Dockerfile aligned with the pinned Playwright version.
- Setup, architecture, configuration, authentication, CI/CD and test-data guides.

## Requirements

- Node.js 22 or newer. Playwright 1.65 no longer supports Node.js 20.
- npm 10 or newer recommended.
- Git recommended.

## Quick start

```bash
npm install
cp .env.example .env
npx playwright install
npm run validate
npm test
```

On Linux CI, install browser system dependencies with `npx playwright install --with-deps`.

The Playwright `webServer` setting starts the bundled demo application automatically when `USE_DEMO_SERVER=true`.

## Commands

| Command | Purpose |
|---|---|
| `npm test` | Run API tests and authenticated UI tests across all configured browsers |
| `npm run test:ui` | Run UI tests in Chromium, Firefox and WebKit |
| `npm run test:api` | Run API tests only |
| `npm run test:auth` | Run authentication setup only |
| `npm run test:smoke` | Run scenarios tagged `@smoke` |
| `npm run test:regression` | Run scenarios not tagged `@smoke` |
| `npm run test:chromium` | Run Chromium UI project |
| `npm run test:firefox` | Run Firefox UI project |
| `npm run test:webkit` | Run WebKit UI project |
| `npm run validate` | Run TypeScript, ESLint and Prettier checks |
| `npm run verify` | Run validation and the complete test suite |
| `npm run report` | Open the HTML report from the last run |
| `npm run smoke:demo` | Verify the bundled demo API using Node.js only |
| `npm run verify:demo` | Run demo smoke checks, quality gates and full Playwright suite |

## Project structure

```text
.
├── .github/workflows/ci.yml
├── Jenkinsfile
├── demo-app/index.html
├── docs/
├── scripts/demo-server.mjs
├── src/
│   ├── config/env.ts
│   ├── fixtures/test.fixture.ts
│   ├── helpers/
│   └── pages/
├── tests/
│   ├── api/
│   ├── ui/
│   └── auth.setup.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## Configure for your application

1. Copy `.env.example` to `.env`.
2. Set `BASE_URL` and `API_BASE_URL`; the API base URL should end in `/`.
3. Set `USE_DEMO_SERVER=false` when targeting your own application.
4. Adapt `tests/auth.setup.ts` and `src/pages/login.page.ts` to your application's approved test login flow.
5. Replace demo page objects, API routes and sample scenarios with verified application behaviour.
6. Configure credentials through environment variables or CI secret storage.
7. Review worker count, retry policy, browser support and test-data isolation before enabling parallel execution.

Do not point the included demo tests at a real application unchanged. They assume the bundled demo app's selectors, credentials and API contract.

## Authentication and secrets

The setup project creates `.auth/user.json`. It is ignored by Git and must be treated as a credential. Never commit, email or attach it to public issue trackers. Use dedicated, least-privilege test accounts and synthetic data. See `docs/AUTHENTICATION.md`.

## Quality principles

- No hard-coded sleeps in sample tests.
- Prefer accessible locators and observable assertions.
- Keep tests independent and safe to run in parallel.
- Generate unique test data for records that can collide.
- Use retries to collect diagnostics, not to conceal flaky tests.
- Keep secrets out of source control and logs.

## Compatibility

The package pins `@playwright/test` to `1.65.0`. The Docker image uses the matching Playwright image tag. Update both together and run the complete verification suite when upgrading. The generated lockfile is not included in this development archive because the package registry could not be reached from the build environment. Generate and commit `package-lock.json` on a network-enabled machine before production adoption, then switch CI and Docker to `npm ci`.

## Licence and support

The included single-customer commercial licence is a draft and must be reviewed before sale. Third-party dependencies retain their own licences. The purchase includes the source and documentation described in the product listing; it does not include adaptation to a buyer's private application, ongoing maintenance or unlimited consulting unless separately agreed.

## Official references

- https://playwright.dev/docs/intro
- https://playwright.dev/docs/test-fixtures
- https://playwright.dev/docs/auth
- https://playwright.dev/docs/api-testing
- https://playwright.dev/docs/ci
