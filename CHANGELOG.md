# Changelog

## 0.2.0 — Development build

- Added a Playwright setup project for reusable authentication state.
- Added authenticated dashboard examples and sign-out coverage.
- Kept login tests explicitly unauthenticated.
- Expanded API client methods and normalized API paths relative to the configured API base URL.
- Added API request validation coverage to the demo suite.
- Improved demo server response headers and request validation.
- Updated CI to install all Playwright browsers and run the complete suite.
- Expanded authentication and onboarding documentation.
- Updated product listing and commercial launch boundaries.

Verification limitation: npm dependency installation timed out in the build environment, so TypeScript compilation, ESLint, Prettier, Playwright browser execution and Docker build remain unverified.

## 0.1.0 — Initial development preview

- Added initial TypeScript Playwright framework structure, sample UI/API tests, demo app, configuration, docs, CI and Docker starter.

## 0.3.0 — development release

- Added a realistic sample shop with product catalogue, cart and checkout flow.
- Added product and order REST API endpoints with input validation.
- Added UI page object and cross-browser shop scenarios.
- Added API scenarios for catalogue, order creation/retrieval and invalid inputs.
- Added JSON test reporting alongside HTML and JUnit.
- Added a Jenkins declarative pipeline and setup guide.
- Updated the pinned Playwright release to 1.65.0 and aligned the Docker image.
- Set Node.js 22 as the minimum supported runtime.
- Added a Node.js-only demo API smoke verification script.

Verification note: full dependency installation, TypeScript typechecking, browser execution and Docker build remain pending because package registry access was unavailable during this build.
