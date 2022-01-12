/// <reference types="Cypress" />

describe("sign out from profile", () => {
  it("sign out button", () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.login()
    cy.get('[data-cy=sign-out]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/') 
    })
});
})
