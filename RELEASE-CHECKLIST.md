# Release checklist — do not publish until complete

## Build and technical verification

- [ ] Install dependencies and generate `package-lock.json`; change CI and Docker installation to `npm ci` after committing it.
- [ ] Run `npm run typecheck` and resolve all findings.
- [ ] Run `npm run lint` and resolve all findings.
- [ ] Run `npm run format:check` and resolve all findings.
- [ ] Run `npm test` on Chromium, Firefox and WebKit.
- [ ] Verify authentication setup and storage-state reuse on a clean machine.
- [ ] Verify `USE_DEMO_SERVER=false` against a separately started test application.
- [ ] Verify Docker build and execution.
- [ ] Review README commands and onboarding on a clean machine.

## Commercial readiness

- [ ] Review all dependency licences and pin/lock dependency versions.
- [ ] Have the commercial licence, refund terms and support terms reviewed by appropriate counsel.
- [ ] Capture genuine screenshots of the actual package and test report.
- [ ] Test the complete buyer download and onboarding journey.
- [ ] Confirm marketplace seller eligibility and a working Pakistan payout route.
- [ ] Define version support, update policy and support response boundaries.
- [ ] Remove all development-only notes and mark the product release only after every applicable check passes.

## Current build status

Version 0.3.0 is a development build. Demo server API routes were exercised directly with Node.js `fetch`, and JavaScript/JSON syntax checks passed. npm dependency installation timed out in the build environment, so TypeScript compilation, ESLint, Prettier, Playwright browser execution and Docker build have not been verified. Do not advertise this archive as fully tested or production-ready.


## v1.0.0 commercial distribution gates

- [ ] Install dependencies on a clean network-enabled machine and commit `package-lock.json`.
- [ ] Run `npm ci`, `npm run validate`, `npm run smoke:demo` and `npm test`.
- [ ] Verify Chromium, Firefox and WebKit in CI and retain passing run URLs.
- [ ] Build and run the Docker image using the matching Playwright version.
- [ ] Test the archive on a clean Windows, macOS or Linux machine.
- [ ] Review third-party dependency licences and include notices where required.
- [ ] Obtain legal review of the individual commercial licence and refund terms.
- [ ] Complete Gumroad and Lemon Squeezy seller verification and confirm Pakistani bank payout settings.
- [ ] Upload identical approved version, price and licence terms to both storefronts.
- [ ] Test checkout/download/update flow using each platform's supported test process.
- [ ] Confirm the support contact and release update process.
