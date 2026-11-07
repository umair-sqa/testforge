# TestForge — Local release-preparation report

**Working version:** 0.3.0 development candidate  
**Assessment date:** 2026-11-08  
**Release verdict:** Not ready for commercial distribution.

## Product contents

- TypeScript Playwright framework with Page Object Model and custom fixtures.
- Reusable authentication setup and browser storage-state example.
- UI scenarios for login, authenticated dashboard, catalogue, cart and checkout.
- API client and demo endpoints for health, users, products and orders.
- Input validation and unique test-data generation.
- Chromium, Firefox and WebKit browser projects plus a separate API project.
- HTML, JUnit and JSON reporters; traces, screenshots and videos on failure.
- GitHub Actions workflow, Jenkins pipeline and Playwright-version-aligned Dockerfile.
- Setup, architecture, configuration, authentication, CI/CD and test-data guides.
- Gumroad-only listing copy and draft individual commercial licence, refund and support/update policies.

## Work completed in this local preparation pass

- Applied the conditional `workers` configuration fix for TypeScript's `exactOptionalPropertyTypes` setting.
- Replaced the unsupported `toBeRequired()` assertions with `toHaveAttribute('required', '')`; inspected the bundled login HTML and confirmed both fields carry the native `required` attribute.
- Replaced the previous multi-store commercial drafts with the approved Gumroad-only plan, USD 29 launch price and one named individual licence.
- Aligned the commercial documents around multiple client projects, non-transferability of the starter package/substantial framework source, updates for the purchased major version only, and product-defect-only support.
- Reworked the README and changelog to state the current status and avoid claiming unverified checks.
- Expanded the Node.js-only demo smoke suite with user CRUD, order validation, malformed JSON and oversized-body checks; made its test port dynamically allocated.
- Added a release handoff guide with the exact lockfile, verification, CI/Docker/Jenkins and archive steps.
- Added the expanded demo API smoke suite to GitHub Actions before the browser suite.
- Added an explicit security warning that the demo login is client-side and is not production authentication.

## Verification evidence

| Check | Result | Evidence / limitation |
|---|---|---|
| TypeScript syntax transpilation | **Passed** | Global TypeScript 5.8.3 transpiled all 14 source/test files without syntax diagnostics; this is not semantic typechecking. |
| Demo HTML parsing | **Passed** | Both bundled HTML files parsed successfully with Python `HTMLParser`; this does not validate browser runtime behaviour. |
| GitHub Actions YAML structure | **Passed** | Workflow parsed and expected smoke-test step was present. |
| Relative Markdown links | **Passed** | All checked relative links resolve within the project. |
| Node.js demo smoke suite | **Passed** | `npm run smoke:demo`; all seven smoke groups passed: health, shop page, product catalogue, user CRUD/validation, order create/retrieve, order validation, and malformed/oversized request handling. |
| TypeScript semantic check | **Blocked** | Global `tsc --noEmit` cannot resolve `@playwright/test` and `@types/node` because project dependencies are not installed. |
| Dependency installation | **Blocked** | `npm install --no-audit --no-fund --ignore-scripts` failed with `EAI_AGAIN` resolving `registry.npmjs.org`. |
| Dependency lockfile | **Not generated** | npm registry unavailable; do not fabricate a lockfile. |
| ESLint | **Not run** | Project dependencies are not installed and ESLint is not available globally. |
| Prettier | **Not run** | Project dependencies are not installed and Prettier is not available globally. |
| Playwright browser suite | **Not run** | The Node.js `@playwright/test` dependency is not installed. |
| Manual Chromium UI smoke | **Blocked by environment** | A Python Playwright attempt using system Chromium was blocked at `127.0.0.1` with `net::ERR_BLOCKED_BY_ADMINISTRATOR`; no UI result is claimed. |
| Docker build/run | **Not run** | Docker is not installed in this environment. |
| Gumroad checkout and download | **Not run** | Seller account and product configuration remain owner-side actions. |

## Previous CI evidence

The last inspected GitHub Actions run (`42407238712`) failed during TypeScript validation with two errors: the `workers` optional-property type and missing `toBeRequired()` matcher types. Lint, formatting and browser suites were skipped in that run. The source fixes are now present in this local working copy, but no fresh CI run has validated them.

## Remaining release blockers

1. Generate and review `package-lock.json` using Node.js 22/npm 10 on a network-enabled machine.
2. Switch GitHub Actions, Docker and Jenkins to `npm ci` after the lockfile is present.
3. Install dependencies and pass TypeScript, ESLint and Prettier checks.
4. Run the full API and Chromium/Firefox/WebKit Playwright suite, including a clean authentication-state run.
5. Build and execute the Docker image.
6. Test the final buyer archive from a clean extraction/install.
7. Review third-party licences and obtain legal review of licence/refund terms.
8. Complete Gumroad seller verification, payout configuration, product setup and an end-to-end buyer download test.

No production release archive has been approved. The existing `TestForge-Playwright-Starter-v1.0.0.zip` is an earlier development artifact and must not be sold or represented as verified.
