/// <reference types="Cypress" />

beforeEach(() => {
  Cypress.Cookies.preserveOnce("session_id", "remember_token");
});

before(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.login();
});

describe("sign out from profile", () => {
  it("sign out button", () => {
    cy.get('[data-cy=sign-out]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/') 
    })
});
})
