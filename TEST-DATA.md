# Test data strategy

`createUser()` creates unique user data using a UUID suffix, which reduces collisions in parallel runs. Extend factories around business entities, not generic random-object generators.

Recommendations:

- Prefer API setup and teardown for data preparation when the application exposes stable test APIs.
- Use unique identifiers for records created concurrently.
- Clean up created data when the environment supports safe deletion.
- Keep deterministic fixtures for tests where random values add no value.
- Never use production customer data in test environments.
