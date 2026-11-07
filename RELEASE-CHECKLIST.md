# TestForge v1.0.0 release checklist — do not publish until complete

## Technical verification

- [ ] Generate `package-lock.json` from `package.json` on a network-enabled Node.js 22/npm 10 environment; review and commit the generated file.
- [ ] Switch GitHub Actions, Docker and Jenkins dependency installation to `npm ci`.
- [ ] Run `npm ci` from a clean checkout.
- [ ] Run `npm run typecheck` and resolve all findings.
- [ ] Run `npm run lint` and resolve all findings.
- [ ] Run `npm run format:check` and resolve all findings.
- [x] Run `npm run smoke:demo` — seven smoke groups passed in the local preparation environment.
- [ ] Run `npm test` across API, Chromium, Firefox and WebKit projects.
- [ ] Verify authentication setup and storage-state reuse on a clean machine.
- [ ] Verify `USE_DEMO_SERVER=false` against a separately started test application.
- [ ] Verify Docker build and execution with the Playwright image matching the package version.
- [ ] Test the buyer ZIP on a clean machine and confirm setup instructions are accurate.
- [ ] Review third-party dependency licences and include required notices.
- [ ] Generate SHA-256 checksum for the approved final archive.

## Commercial verification

- [ ] Obtain legal review of the individual licence and refund wording.
- [x] Align the draft licence with one named individual across multiple client projects, with no redistribution of the starter package or substantial framework source.
- [x] Align the draft update policy with maintenance releases and bug fixes for the purchased major version only.
- [x] Set the approved launch price to USD 29.
- [x] Remove Lemon Squeezy and multi-store distribution from the active commercial documents.
- [ ] Confirm Gumroad seller identity and payout verification in the seller dashboard.
- [ ] Confirm bank destination, currency, threshold and payout timing in the seller dashboard.
- [ ] Configure the Gumroad product, listing, price, licence, support and refund wording.
- [ ] Test the buyer purchase/receipt/download journey using Gumroad's supported test or preview process.
- [ ] Confirm the support contact and update delivery process.
- [ ] Capture genuine screenshots from the final package and successful test report.

## Current verified blockers

The source fixes for the previously observed TypeScript errors are present locally, and the demo smoke suite passes. A fresh semantic typecheck is blocked because dependencies cannot be installed: this environment cannot resolve `registry.npmjs.org`. No lockfile is present. ESLint, Prettier, the Node.js Playwright suite and Docker have not been verified. A manual Chromium UI attempt was blocked by the environment (`net::ERR_BLOCKED_BY_ADMINISTRATOR` when navigating to the local demo server). No Gumroad product or buyer delivery flow has been configured or tested. Do not mark these gates complete until fresh evidence is available.

## Release archive

`TestForge-Professional-v1.0.0.zip`

Include source, demo app, tests, documentation, licence, support/update policy, changelog and checksum. Exclude `.env`, `.auth`, `node_modules`, browser binaries, test results, local caches and private credentials.
