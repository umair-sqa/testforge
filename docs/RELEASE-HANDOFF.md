# Release handoff — local to GitHub

This document records the remaining technical work required before the local TestForge working copy can become a buyer-ready release.

## 1. Generate the dependency lockfile

Run from the project root on a network-enabled machine with Node.js 22 and npm 10:

```bash
npm install --package-lock-only --ignore-scripts --no-audit --no-fund
npm ci
```

Review the generated `package-lock.json` and keep it with `package.json`. Do not hand-author or guess lockfile contents.

## 2. Verify the project locally

```bash
npm run typecheck
npm run lint
npm run format:check
npm run smoke:demo
npx playwright install
npm test
```

On Linux CI, install browser system dependencies with:

```bash
npx playwright install --with-deps
```

The Playwright suite should report results for the API, setup, Chromium, Firefox and WebKit projects. Preserve the HTML/JUnit/JSON reports and inspect failures rather than treating a green process exit as the only evidence.

## 3. Make dependency installation deterministic

Only after `package-lock.json` exists and `npm ci` passes, replace `npm install --no-audit --no-fund` with `npm ci` in:

- `.github/workflows/ci.yml`
- `Dockerfile`
- `Jenkinsfile`

Then rebuild and execute the Docker image and rerun the CI pipeline.

## 4. Prepare the buyer archive

The approved archive name is `TestForge-Professional-v1.0.0.zip`. Do not use this name until every technical and commercial checklist item is complete.

Include the framework source, demo application, tests, documentation, `LICENSE.txt`, `CHANGELOG.md`, `SUPPORT-AND-UPDATES.md` and product setup information. Exclude `.env`, `.auth/`, `node_modules/`, browser binaries, `playwright-report/`, `test-results/`, local caches and credentials.

After producing the approved archive:

```bash
sha256sum TestForge-Professional-v1.0.0.zip
unzip -t TestForge-Professional-v1.0.0.zip
```

Extract it into a clean directory and repeat the documented buyer setup and test commands.

## 5. GitHub handoff

The connected GitHub integration previously rejected branch and file writes with HTTP 403. This local working copy has no Git metadata. Once repository write access is restored, or when uploading manually, create a feature branch and commit the complete reviewed source tree. Do not overwrite `main` directly. Require a fresh CI run and inspect its full job summary before approving the release.

## 6. Gumroad handoff

Gumroad is the only approved storefront. The planned launch price is USD 29 for one named individual. Complete seller identity and payout verification in the seller account, review current fees and policies, upload only the approved archive, and verify the actual receipt/download/update path before announcing the product.

The licence and refund policy are drafts and require appropriate legal review before publication.
