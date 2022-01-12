/// <reference types="Cypress" />

beforeEach(() => {
  Cypress.Cookies.preserveOnce("session_id", "remember_token");
});

before(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.login();
});

describe("go to wallet from profile", () => {
  it("wallet button", () => {
    cy.get('[data-cy=wallet-button]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/wallet') 
    })
  })
})
