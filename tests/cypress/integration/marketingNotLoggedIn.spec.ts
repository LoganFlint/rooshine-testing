/// <reference types="cypress" />

describe("Marketing page not logged in anything that should act different", () => {

  it('marketing banner button & click through images', () => {
    cy.visit("http://localhost:3000/")
    cy.get('[data-cy=get-started]').should("be.visible")
    cy.get('[data-cy=get-started]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/sign-in') 
    })
    cy.get('[alt="close"]').should("be.visible").click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/') 
    });
  })
})
