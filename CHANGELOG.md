# Changelog

## Unreleased — local release preparation

- Fixed the CI TypeScript error caused by assigning `undefined` to the optional `workers` property under `exactOptionalPropertyTypes`.
- Replaced unsupported `toBeRequired()` matcher calls with native `required` attribute assertions matching the bundled demo form.
- Replaced multi-store draft material with the approved Gumroad-only commercial plan and USD 29 individual licence terms.
- Clarified client-project permissions, one-seat restriction, major-version update entitlement and support exclusions across customer-facing documents.
- Reworked the README to distinguish implemented functionality from release gates that remain unverified.
- Expanded the Node.js-only demo smoke suite to cover user CRUD, order validation, malformed JSON and oversized request bodies; removed its fixed-port assumption.
- Added a local-to-GitHub release handoff guide.
- Added the expanded demo smoke suite to the GitHub Actions workflow.
- Documented that the bundled client-side demo login is intentionally insecure and must not be used as production authentication.

Verification note: the Node.js demo smoke suite passes. Full dependency installation is currently blocked because this environment cannot resolve `registry.npmjs.org`; semantic TypeScript checking, ESLint, Prettier, Playwright browser tests and Docker remain unverified.

## 0.3.0 — Development release

- Added a realistic sample shop with product catalogue, cart and checkout flow.
- Added product and order REST API endpoints with input validation.
- Added UI page object and cross-browser shop scenarios.
- Added API scenarios for catalogue, order creation/retrieval and invalid inputs.
- Added JSON test reporting alongside HTML and JUnit.
- Added a Jenkins declarative pipeline and setup guide.
- Updated the pinned Playwright release to 1.65.0 and aligned the Docker image.
- Set Node.js 22 as the minimum supported runtime.
- Added a Node.js-only demo API smoke verification script.

## 0.2.0 — Development build

- Added a Playwright setup project for reusable authentication state.
- Added authenticated dashboard examples and sign-out coverage.
- Kept login tests explicitly unauthenticated.
- Expanded API client methods and normalized API paths relative to the configured API base URL.
- Added API request validation coverage to the demo suite.
- Improved demo server response headers and request validation.
- Updated CI to install all Playwright browsers and run the complete suite.
- Expanded authentication and onboarding documentation.

## 0.1.0 — Initial development preview

- Added initial TypeScript Playwright framework structure, sample UI/API tests, demo app, configuration, docs, CI and Docker starter.
