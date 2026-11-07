# Configuration guide

1. Copy `.env.example` to `.env`.
2. Set `BASE_URL` and `API_BASE_URL` to the application under test.
3. Add credentials only when your tests need them. Use CI secret storage for pipeline credentials.
4. Add environment-specific values in the CI environment or secret store; do not commit `.env` files.

`src/config/env.ts` centralizes environment access, normalizes the API base URL and validates boolean flags. Add new variables there rather than reading `process.env` throughout the test suite.

## Environment strategy

Use separate CI environments or workflow environments for development, QA and staging. Do not point destructive tests at production. If production smoke tests are required, use dedicated read-only accounts and explicit allowlists.


## Bundled demo server versus your application

`USE_DEMO_SERVER=true` starts the bundled local demo application through Playwright's `webServer` option. Set `USE_DEMO_SERVER=false` when `BASE_URL` points to an application you run separately. In that mode, start the application before executing the suite. The API base URL is configured independently through `API_BASE_URL`.
