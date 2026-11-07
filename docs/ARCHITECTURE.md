# Architecture

TestForge uses a small, explicit set of layers. Keep the structure boring and predictable; add abstractions only when repeated application behaviour justifies them.

```text
Tests (intent and assertions)
  └── Custom fixtures (dependency construction)
       ├── Page objects (UI behaviour)
       ├── API client (HTTP transport wrapper)
       └── Helpers (test data and shared utilities)
Configuration
  ├── Environment validation
  └── Playwright projects, reporters and execution policy
```

## Responsibilities

- `tests/`: scenarios and assertions. Do not put selectors or raw HTTP transport details here.
- `src/pages/`: page-level interactions and user-facing locators. Prefer role, label and text locators.
- `src/fixtures/`: construct and provide reusable test dependencies.
- `src/helpers/`: deterministic, application-agnostic helpers.
- `src/config/`: validated environment configuration.

## Design rules

1. Prefer user-facing locators (`getByRole`, `getByLabel`, `getByText`). Use `data-testid` when user-facing semantics are not stable or suitable.
2. Avoid fixed sleeps. Wait for observable application state with Playwright assertions.
3. Tests must be independent and safe to run in parallel.
4. Generate unique test data for records that can collide.
5. Keep secrets out of source control and redact sensitive data from logs and artifacts.
6. Do not add a generic wrapper for every Playwright method. Wrap only domain-level behaviour or repeated policy.
7. Retries are diagnostic resilience, not a substitute for fixing flaky tests.

## Extending to an application

Replace the demo app and its tests with application-specific page objects, API clients and fixtures. Keep the shared configuration and quality gates where they remain useful.

## Authentication lifecycle

`tests/auth.setup.ts` is selected by the `setup` project. It authenticates the dedicated test account and writes browser storage state to the ignored `.auth/` directory. Browser projects depend on `setup` and load that state. Tests that exercise the login form override storage state with an empty context so they remain unauthenticated. Adapt the setup flow to the target application's approved authentication mechanism; do not assume the demo's local-storage approach applies to every application.
