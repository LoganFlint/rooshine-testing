/// <reference types="Cypress" />

beforeEach(() => {
  Cypress.Cookies.preserveOnce('session_id', 'remember_token')
})

before(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.login()
})

describe("change password modal", () => {
  it("test change password button", () => {
    // const currentPassword = "Lambda19"
    // const newPassword = "Lambda2019"
    cy.get('[data-cy=change-password]').should("be.visible")
    // cy.get('[data-cy=change-password]').click().then(() => {
    //   cy.url().should('eq', 'http://localhost:3000/profile/change-password') 
    // })
    // // add these in once hitting API 
    // cy.get('[data-cy=current-password]').type(currentPassword)
    // cy.get('[data-cy=new-password]').type(newPassword)
    // cy.get('[data-cy=confirm-password]').type(newPassword)
    // cy.get('[data-cy=submit-password]').click().then(() => {
    //   cy.url().should('eq', 'http://localhost:3000/profile') 
    // })
    cy.get('[data-cy="welcome-username"]').should("be.visible")
    cy.get('[alt="rooshine logo"]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/') 
    });
  });
})
