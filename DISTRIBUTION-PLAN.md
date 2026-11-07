# TestForge distribution plan

## Commercial decisions

- Product: TestForge Professional Playwright Automation Starter
- Target market: International QA engineers, SDETs and independent automation consultants
- Primary product format: Downloadable source archive with documentation
- Initial licence: Single individual purchaser; internal use is permitted, redistribution is not
- Support: Product updates and bug fixes only; no application-specific implementation or guaranteed response SLA
- Initial price hypothesis: USD 39
- Storefronts: Gumroad and Lemon Squeezy, subject to seller onboarding approval

## Store setup checklist

### Gumroad

1. Create a seller account using the real Pakistani legal name and address.
2. Complete identity and local bank verification.
3. Confirm the payout currency shown in Payments settings is PKR.
4. Review current fees, refund controls and prohibited-product rules.
5. Create a digital product and upload the approved release archive.
6. Add the individual licence, product description, prerequisites and support boundaries.
7. Use a test purchase or preview mode to verify delivery; do not buy your own live product to test payouts.

Official payout guide: https://gumroad.com/help/article/13-getting-paid

### Lemon Squeezy

1. Apply for a store using accurate seller and business information.
2. Complete identity and bank verification; Pakistan appears in the supported bank payout country list, but approval is not guaranteed.
3. Confirm the bank payout destination and currency in the seller dashboard.
4. Complete store activation and product review.
5. Create a one-time digital product, configure its price and upload the approved archive.
6. Configure the checkout, receipt and licence terms.
7. Run a test-mode checkout and verify post-purchase delivery before enabling live sales.

Official references:
- https://docs.lemonsqueezy.com/help/getting-started/supported-countries
- https://docs.lemonsqueezy.com/help/getting-started/getting-paid

## Multi-store operational controls

- Keep the same product version, price and licence wording on both storefronts.
- Publish one canonical changelog and release archive.
- Record release checksums and retain previous versions for rollback.
- Maintain a support email address before launch.
- Track refunds, chargebacks and support issues separately by platform.
- Do not promise automatic licence enforcement: this is a source-code download, not a hosted licence-checked application.
- Do not publish until the release checklist is fully green.

## Suggested release naming

`TestForge-Professional-v1.0.0.zip`

Include README, docs, source, demo application, tests, licence, changelog and a SHA-256 checksum file. Exclude `.env`, `.auth`, `node_modules`, browser binaries, test results and private credentials.
