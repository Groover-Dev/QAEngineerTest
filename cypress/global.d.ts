declare namespace Cypress {
  interface Chainable {
    getByDataTest(dataTestAttribute: string, args?: any): Chainable<any>;
  }
}
