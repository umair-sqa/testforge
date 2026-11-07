# Jenkins CI setup

The included `Jenkinsfile` is a reference declarative pipeline. It assumes:

- Jenkins Pipeline and NodeJS plugins are installed.
- A NodeJS tool installation named `Node22` is configured in Jenkins Global Tool Configuration.
- The agent is Linux-based and can install Playwright browser system dependencies, or has those dependencies preinstalled.
- The repository is checked out with the framework source.

The pipeline installs npm dependencies, installs Playwright browsers, runs TypeScript/ESLint/Prettier validation, runs the Node-only demo smoke test, executes the full Playwright suite, publishes JUnit results and archives HTML/test artifacts.

For a production pipeline, generate and commit `package-lock.json` on a network-enabled development machine, then replace `npm install` with `npm ci` in this Jenkinsfile and the GitHub Actions workflow. Keep Node.js and Playwright versions aligned with `package.json` and the Docker image.

Do not store test credentials in the Jenkinsfile. Use Jenkins Credentials and inject values as environment variables for the job. Do not archive `.auth/` or `.env` files.
