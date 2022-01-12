/// <reference types="Cypress" />

beforeEach(() => {
  Cypress.Cookies.preserveOnce('session_id', 'remember_token')
})

before(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.login()
})

describe("getting started suggested auctions", () => {
  it("close getting started should not longer be visible", () => {
    cy.get('[data-cy=close-getting-started]').click().then(() => {
      cy.get('[data-cy=getting-started]').should("not.be.visible");
    })
  });
})
