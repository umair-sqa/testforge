# TestForge distribution plan

## Approved commercial decisions

- Product: TestForge Professional Playwright Automation Starter
- Target market: International QA engineers, SDETs and independent automation consultants
- Storefront: Gumroad only
- Delivery: Downloadable ZIP archive
- Licence: One named individual commercial licence
- Permitted use: Personal work and multiple client projects by the licensed individual
- Updates: Maintenance releases and bug fixes for the purchased major version, for the lifetime of that major version
- Support: Product defects and product updates only; no application-specific implementation, consulting or guaranteed response SLA
- Launch price: USD 29

## Gumroad launch checklist

1. Create/complete the seller account using accurate legal identity, address and business information.
2. Complete Gumroad identity and payout verification.
3. Confirm the available payout method, destination bank details, payout currency, threshold and timing in the seller dashboard.
4. Review the current Gumroad fees, refund/dispute rules, tax handling and prohibited-product rules before publishing.
5. Create one digital product priced at USD 29.
6. Upload only the approved `TestForge-Professional-v1.0.0.zip` after all technical release gates pass.
7. Include the product description, Node.js/npm prerequisites, individual licence, update entitlement, support boundaries and refund information.
8. Test the buyer journey using Gumroad's currently supported preview/test process.
9. Verify the actual receipt, download access, file integrity and update delivery process.
10. Do not announce the product until a real buyer-facing purchase/download flow has been checked.

Official Gumroad help: https://gumroad.com/help

## Release operations

- Gumroad is the only storefront. Do not configure or advertise Lemon Squeezy or other storefronts.
- Maintain one canonical version, changelog and release archive.
- Record a SHA-256 checksum for each release.
- Retain previous release archives for rollback and buyer support.
- Maintain a support contact before launch.
- Do not promise automatic licence enforcement: this is a source-code download, not a hosted licence-checked application.
- Publish updates for the purchased major version throughout that major version's supported lifetime. A new major version is not automatically included.
- Do not publish until technical, legal and buyer-delivery gates are complete.

## Release archive

Name: `TestForge-Professional-v1.0.0.zip`

Include README, docs, source, demo application, tests, licence, changelog and support/update policy. Exclude `.env`, `.auth`, `node_modules`, browser binaries, test results, local caches and private credentials.
