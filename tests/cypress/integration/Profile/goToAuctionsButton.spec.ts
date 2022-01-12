/// <reference types="Cypress" />

beforeEach(() => {
  Cypress.Cookies.preserveOnce('session_id', 'remember_token')
})

before(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.login()
})

describe("go to auctions from profile", () => {
  it("go to auctions button", () => {
    cy.get('[data-cy=go-to-auctions]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/auctions') 
    })
});
})
