declare namespace Cypress {
  interface TestConfigOverrides {
    tags?: string | string[]
  }
  interface SuiteConfigOverrides {
    tags?: string | string[]
  }
}

declare module '@cypress/grep/plugin' {
  const grepPlugin: (config: Cypress.PluginConfigOptions) => Cypress.PluginConfigOptions
  export default grepPlugin
}
