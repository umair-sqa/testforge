# TestForge — Professional Playwright Automation Starter

> **Current build: 0.3.0 development candidate — not yet approved for commercial release.** The demo smoke checks pass locally, but the dependency lockfile, semantic TypeScript check, ESLint, Prettier, Playwright browser suite and Docker verification are still outstanding. See `RELEASE-CHECKLIST.md` and `BUILD-REPORT.md` for evidence and blockers.

TestForge is a TypeScript + Playwright starter for QA engineers, SDETs and independent automation consultants who need a maintainable foundation for browser UI and REST API automation.

It is an adaptable starter kit, not a universal drop-in test suite. You must align its page objects, authentication flow, API routes, schemas, test data and environment configuration with the application under test.

## What is included

- Strict TypeScript configuration and centralized environment settings.
- Page Object Model and typed custom fixtures.
- Authentication setup project with reusable browser storage state.
- Separate unauthenticated login tests and authenticated dashboard/shop tests.
- Typed API client wrapper and REST API examples for health, users, products and orders.
- Unique test-data factory.
- Bundled local demo application with login, dashboard, product catalogue, cart and checkout.
- Playwright projects for API, Chromium, Firefox and WebKit.
- HTML, JUnit and JSON reports; traces, screenshots and videos on failure.
- GitHub Actions, Jenkins and Docker starter configuration.
- Setup, architecture, configuration, authentication, CI/CD and test-data guides.

## Requirements

- Node.js 22 or newer.
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

On Linux CI, install browser system dependencies with `npx playwright install --with-deps`. On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

When `USE_DEMO_SERVER=true` (the default), Playwright starts the bundled demo server automatically. The API base URL should end in `/`; the included `.env.example` already does this.

## Commands

| Command | Purpose |
|---|---|
| `npm test` | Run API tests and UI tests across configured browser projects |
| `npm run test:ui` | Run UI tests in Chromium, Firefox and WebKit |
| `npm run test:api` | Run API tests only |
| `npm run test:auth` | Run authentication setup only |
| `npm run test:smoke` | Run scenarios tagged `@smoke` |
| `npm run test:regression` | Run scenarios not tagged `@smoke` |
| `npm run test:chromium` | Run Chromium UI project |
| `npm run test:firefox` | Run Firefox UI project |
| `npm run test:webkit` | Run WebKit UI project |
| `npm run validate` | Run TypeScript, ESLint and Prettier checks |
| `npm run verify` | Run validation and the full Playwright suite |
| `npm run report` | Open the latest HTML report |
| `npm run smoke:demo` | Run Node.js-only demo API smoke checks |
| `npm run verify:demo` | Run demo smoke checks, quality gates and full Playwright suite |

## Project structure

```text
.
├── .github/workflows/ci.yml
├── demo-app/
├── docs/
├── scripts/
├── src/
│   ├── config/
│   ├── fixtures/
│   ├── helpers/
│   └── pages/
├── tests/
│   ├── api/
│   ├── ui/
│   └── auth.setup.ts
├── playwright.config.ts
├── Jenkinsfile
├── Dockerfile
└── package.json
```

## Configure for your application

1. Copy `.env.example` to `.env`.
2. Set `BASE_URL` and `API_BASE_URL`; the API base URL should end in `/`.
3. Set `USE_DEMO_SERVER=false` when targeting an application you start separately.
4. Adapt `tests/auth.setup.ts` and `src/pages/login.page.ts` to the application's approved test login flow.
5. Replace demo page objects, API routes, schemas and sample scenarios with verified application behaviour.
6. Configure credentials through environment variables or CI secret storage.
7. Review worker count, retries, browser support and test-data isolation before enabling parallel execution.

Do not point the included demo tests at a real application unchanged. They assume the bundled demo app's selectors, credentials and API contract.

## Authentication and secrets

The setup project creates `.auth/user.json`. Treat this file as a credential: anyone who obtains it may be able to impersonate the test account. It is ignored by Git. Never commit, email or attach it to public issue trackers. Use dedicated, least-privilege test accounts and synthetic data. Keep `.env` out of source control.

The bundled demo login is intentionally simplified: credentials are checked in browser-side JavaScript and the demo stores an authentication flag in `localStorage`. This is an automation example, not production authentication. Never deploy the demo server publicly, use its sample credentials for a real system, or treat its login mechanism as a security reference. See `docs/AUTHENTICATION.md`.

## Quality principles

- No hard-coded sleeps in sample tests.
- Prefer accessible locators and observable assertions.
- Keep tests independent and safe to run in parallel.
- Generate unique test data for records that can collide.
- Use retries to collect diagnostics, not to conceal flaky tests.
- Keep secrets out of source control and redact sensitive data from logs and artifacts.

## Compatibility and reproducible installs

The project pins `@playwright/test` to `1.65.0` and uses the matching `mcr.microsoft.com/playwright:v1.65.0-noble` Docker image. Keep these versions aligned when upgrading.

A generated `package-lock.json` is not present in this development candidate. Until it is generated and committed, setup uses `npm install`; do not use `npm ci` with this archive. A lockfile must be generated on a network-enabled Node.js 22/npm 10 environment, reviewed, and included before commercial release. CI and Docker should then use `npm ci` for deterministic installation.

## Licence, client work and support

The planned commercial offer is USD 29 for one named individual. That individual may use TestForge across multiple client projects and deliver application-specific tests, automation deliverables and reports. The TestForge starter package and substantial framework source may not be transferred or redistributed to clients or other individuals. One purchase is one individual seat, not a team licence.

The purchase is intended to include maintenance releases and bug fixes for the purchased major version for the lifetime of that major version. Future major versions are not automatically included. Support is limited to reproducible defects in TestForge itself; application-specific consulting, custom implementation and guaranteed response times are excluded.

The licence, refund wording and support policy are drafts pending appropriate legal review. Gumroad is the only planned storefront. Do not treat this development archive as an approved commercial release. See `LICENSE.txt`, `PRODUCT-LISTING.md`, `REFUND-POLICY-DRAFT.md` and `SUPPORT-AND-UPDATES.md`.

## Official references

- https://playwright.dev/docs/intro
- https://playwright.dev/docs/test-fixtures
- https://playwright.dev/docs/auth
- https://playwright.dev/docs/api-testing
- https://playwright.dev/docs/ci
