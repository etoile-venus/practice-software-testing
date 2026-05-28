import { defineConfig } from 'cypress'

const BASE_URL = process.env.CYPRESS_BASE_URL ?? 'https://practicesoftwaretesting.com'
const API_BASE_URL = process.env.CYPRESS_API_BASE_URL ?? 'https://api.practicesoftwaretesting.com'

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  screenshotOnRunFailure: true,
  watchForFileChanges: false,
  defaultCommandTimeout: 8_000,
  requestTimeout: 10_000,
  responseTimeout: 15_000,
  pageLoadTimeout: 30_000,
  retries: {
    runMode: 2,
    openMode: 0,
  },

  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'spec, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/results-[hash].xml',
      toConsole: false,
    },
  },

  expose: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },

  env: {
    API_BASE_URL,
  },

  e2e: {
    baseUrl: BASE_URL,
    testIsolation: true,
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    experimentalRunAllSpecs: true,

    setupNodeEvents(on, config) {
      // Dynamic require avoids top-level TypeScript import resolution conflicts
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')

      cypressGrepPlugin(config)

      on('task', {
        log(message: string) {
          // eslint-disable-next-line no-console
          console.log(`[cypress] ${message}`)
          return null
        },
      })

      return config
    },
  },
})
