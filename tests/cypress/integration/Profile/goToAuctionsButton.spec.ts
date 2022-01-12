/// <reference types="Cypress" />

describe("go to auctions from profile", () => {
  it("go to auctions button", () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.login()
    cy.get('[data-cy=go-to-auctions]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/auctions') 
    })
});
})
