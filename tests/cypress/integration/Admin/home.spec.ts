/// <reference types="Cypress" />

describe("admin home page", () => {
  it("admin welcome title", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.goToAdmin()
    cy.get('[data-cy=admin-welcome-name]').contains("Welcome Back, Logan Flint")
  });

  
  it("evaluation banner", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.goToAdmin()
    cy.get('[data-cy=evaluation-banner]').contains("Evaluation Requests")
    cy.get('[data-cy=view-evaluation-requests]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/barrels') 
    })
    cy.get('[data-cy=admin-home-tab]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/home') 
    })
  })
  

    it("profile button", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.goToAdmin()
    cy.get('[data-cy=profile-button]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/profile') 
    })
  })
})
