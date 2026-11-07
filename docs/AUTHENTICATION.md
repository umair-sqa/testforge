# Authentication and reusable browser state

TestForge includes a setup project that signs in once and saves browser storage state to `.auth/user.json`. Chromium, Firefox and WebKit projects depend on that setup project and reuse the generated state.

## Included demo application

The demo app uses `localStorage` to keep the example small. The setup test opens `/login`, signs in using `TEST_USER_EMAIL` and `TEST_USER_PASSWORD`, verifies the dashboard, then saves storage state.

## Adapt to your application

Authentication is application-specific. Before using this pattern, confirm the application's login route, accessible labels, post-login destination, and whether authentication is represented by cookies, local storage or another mechanism. Update `tests/auth.setup.ts` and the login page object to match the real application.

For SSO, MFA, CSRF, device trust or one-time passwords, implement the approved test-environment flow with the application/security team. Do not bypass production security controls.

## Security requirements

- Treat storage-state files as credentials: anyone who obtains one may impersonate the test account.
- `.auth/` is ignored by Git. Never commit, email or attach state files to public issue trackers.
- Use dedicated, least-privilege test accounts and synthetic data.
- Store credentials in CI secret storage; never commit `.env` files.
- Avoid sharing one mutable account across parallel workers when tests change server-side state. Use account-per-worker or isolated test data where needed.
- Regenerate state when sessions expire or the authentication flow changes.

Official guidance: https://playwright.dev/docs/auth
