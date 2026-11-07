# Start Here

Welcome to TestForge. This guide gets the included demonstration suite running before you adapt the framework to your application.

## 1. Prerequisites

- Node.js 22 or newer. Playwright 1.65 no longer supports Node.js 20.
- npm.
- Git (recommended).

## 2. Install

```bash
npm install
cp .env.example .env
npx playwright install
```

On Linux CI, install browser system dependencies with `npx playwright install --with-deps`. On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

## 3. Run the included examples

```bash
npm test                  # API suite + authenticated UI suite in all three browsers
npm run test:api          # API suite only
npm run test:ui           # UI suite in Chromium, Firefox and WebKit
npm run test:smoke        # smoke-tagged scenarios
npm run validate          # typecheck, lint and formatting checks
npm run report            # open the last HTML report
```

The local demo app starts automatically when `USE_DEMO_SERVER=true`. The setup project creates `.auth/user.json` before authenticated UI projects run.

## 4. Point the framework at your application

1. Set `BASE_URL` and `API_BASE_URL` in `.env`.
2. Set `USE_DEMO_SERVER=false`.
3. Start your application and API independently.
4. Adapt `tests/auth.setup.ts`, page objects, API helpers and sample scenarios to verified application behaviour.
5. Configure test credentials through environment variables or your CI secret store.

Do not point the included demo tests at a real application unchanged. They assume the bundled demo app's selectors, credentials and API contract. `API_BASE_URL` should end in `/` because API helper paths are relative to that base URL.

## 5. Where to go next

- `docs/ARCHITECTURE.md` — framework layers and design rules.
- `docs/CONFIGURATION.md` — environment and demo-server configuration.
- `docs/AUTHENTICATION.md` — authentication-state setup and security.
- `docs/TEST-DATA.md` — data isolation and factories.
- `docs/CI-CD.md` — GitHub Actions and Jenkins guidance.

## Troubleshooting

### Browser executable missing

Run `npx playwright install`. On Linux, use `npx playwright install --with-deps`.

### Port 4173 already in use

Stop the process using port 4173 or change `BASE_URL` and `DEMO_PORT` together.

### Tests target the wrong application

Check `BASE_URL`, `API_BASE_URL` and `USE_DEMO_SERVER`. The demo server is enabled by default.

### API tests fail with connection refused or 404

Confirm the API is reachable and `API_BASE_URL` points to the API root (for the demo, `http://127.0.0.1:4173/api/`).

### Authentication setup fails

Check the test credentials and login selectors. For an external app, update the login flow to match its approved test authentication process. Never commit `.auth/user.json`.
