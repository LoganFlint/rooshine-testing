/// <reference types="cypress" />

beforeEach(() => {
  Cypress.Cookies.preserveOnce('session_id', 'remember_token')
})

before(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.login()
})

describe("test admin button", () => {
  it("route to admin page", () => {
    cy.get('[data-cy=admin-button]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/home') 
    })
    cy.get('[data-cy=admin-home-tab]').should("be.visible")
  });
})
