# Toolshop E2E (Cypress + TypeScript)

End-to-end test suite for the [Practice Software Testing - Toolshop v5.0](https://practicesoftwaretesting.com) demo app.

TypeScript, Page Object Model with a PageManager singleton, `cy.session`-cached
authentication, data-driven tests with `@faker-js/faker`, named tags via
`@cypress/grep`, JUnit reporter for CI, and a GitHub Actions workflow.

---

## CI availability note

The public demo site can return `403 Forbidden` from GitHub-hosted runners before
any test steps run. When that happens, failures appear in `cy.visit()` calls such
as `/`, `/auth/login`, or `/auth/register`; this is an environment access issue,
not a failed assertion in the test suite.

The workflow still runs Cypress so CI shows the actual failure if the hosted app
is blocked from GitHub Actions. A more stable long-term solution is to start the
Practice Software Testing app with Docker Compose inside GitHub Actions and run
Cypress against local URLs such as `http://localhost:4200` for the UI and
`http://localhost:8091` for the API.

---

## Requirements

- Node.js 20+
- npm 9+

---

## Quick start

```bash
npm install
cp cypress.env.example.json cypress.env.json
# open cypress.env.json and fill in the credentials
npm run cy:open          # interactive runner (Chrome)
npm run test             # headless, all tests
npm run test:smoke       # only @smoke tests
npm run test:regression  # only @regression tests
npm run typecheck        # TypeScript check (no output = OK)
npm run lint             # ESLint
npm run format           # Prettier
```

---

## Credentials (cypress.env.json)

Copy `cypress.env.example.json` to `cypress.env.json` and fill in:

```json
{
  "STANDARD_EMAIL": "customer@practicesoftwaretesting.com",
  "STANDARD_PASSWORD": "welcome01",
  "ADMIN_EMAIL": "admin@practicesoftwaretesting.com",
  "ADMIN_PASSWORD": "welcome01"
}
```

These are the public demo credentials for [practicesoftwaretesting.com](https://practicesoftwaretesting.com).
`cypress.env.json` is in `.gitignore` - do not commit it.

---

## Project structure

```
cypress/
  config/         selectors helper (data-test attributes) and route constants
  e2e/            spec files grouped by feature
    auth/         login and registration tests
    catalog/      search, filter, and product detail tests
    buying/       cart and checkout tests
    fullFlow.cy.ts  full registration-to-checkout E2E test
  factories/      test data builders (aUser, anAddress) powered by @faker-js/faker
  fixtures/       static test data for data-driven tests
  pages/          Page Object classes + PageManager
  support/        commands.ts, e2e.ts (global setup), intercepts.ts
  utils/api/      shared API base URL and login setup helper
```

---

## GitHub Actions

The workflow at `.github/workflows/e2e.yml` runs on every push and pull request
to `main`. It also supports a manual trigger where you can pass optional grep tags.

### Setting up secrets

In your GitHub repository go to **Settings -> Secrets and variables -> Actions**
and add:

| Secret                      | Value                                |
| --------------------------- | ------------------------------------ |
| `CYPRESS_STANDARD_EMAIL`    | customer@practicesoftwaretesting.com |
| `CYPRESS_STANDARD_PASSWORD` | welcome01                            |
| `CYPRESS_ADMIN_EMAIL`       | admin@practicesoftwaretesting.com    |
| `CYPRESS_ADMIN_PASSWORD`    | welcome01                            |

The workflow reads these as environment variables (`CYPRESS_*` prefix is picked
up by Cypress automatically).

### Running a specific tag manually in CI

Go to **Actions -> E2E -> Run workflow** and type a tag like `@smoke` or `@auth`.

---

## Running against a different environment

```bash
CYPRESS_BASE_URL=https://staging.example.com \
CYPRESS_API_BASE_URL=https://api.staging.example.com \
  npm run test
```
