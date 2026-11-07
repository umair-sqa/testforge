# CI/CD

The included GitHub Actions workflow installs all Playwright browsers, runs TypeScript checks, linting, formatting checks, the Node.js-only demo API smoke suite and the full API plus cross-browser UI suite. It currently uses `npm install` because this development archive does not ship a generated lockfile. Generate and commit `package-lock.json` before production use, then switch CI and Docker to `npm ci`. The workflow uploads HTML, JUnit, JSON and test artifacts even when tests fail.

## Repository setup

1. Push the project to a GitHub repository.
2. Confirm `package-lock.json` is committed after running `npm install`.
3. Add application URLs and credentials under Settings → Secrets and variables → Actions.
4. Update the workflow's Node version and browser matrix to match your organisation's support policy.

## Parallelism and sharding

Start with conservative CI worker counts. Increase only after verifying that test data and accounts are isolated. For large suites, use Playwright sharding and merge blob reports; do not simply multiply workers on a constrained runner.

## Jenkins

See `docs/JENKINS.md`, the root `Jenkinsfile` and `docs/RELEASE-HANDOFF.md` for the lockfile and release handoff steps. The sample pipeline requires the Jenkins NodeJS plugin with a tool installation named `Node22`. Generate and commit the lockfile before replacing `npm install` with `npm ci`.
