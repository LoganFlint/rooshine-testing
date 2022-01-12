
/// <reference types="Cypress" />

beforeEach(() => {
  Cypress.Cookies.preserveOnce('session_id', 'remember_token')
})

before(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.login()
})

describe("admin barrel page", () => {

  it("navigate to admin barrels & verify title", () => {
    cy.get('[data-cy=admin-button]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/home') 
    })
    cy.get('[data-cy=admin-barrels-link]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/barrels') 
    })
    cy.get('[data-cy=title]').contains("Barrels")
  });

  // needs to be connected to BE and tested further later
  it("find search barrels & use input", () => {
    cy.get('#search-barrels').should("be.visible")
    cy.get('#search-barrels').type("something")
    cy.get('#search-barrels').clear()
  });

  it("forward and back barrel pages", () => {
    cy.get("[data-cy=barrels-back-page]").should("be.visible")
    cy.get("[data-cy=barrels-forward-page]").should("be.visible")
    cy.get("[data-cy=barrels-forward-page]").click()
    cy.get("[data-cy=barrels-back-page]").click()
  });

  it("click on barrel in grid list", () => {
    cy.get("[data-cy=barrel-id-to-barrelDetails]").contains("6115b174-5ca5-11ec-bfa2-6fd19959527d").click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/barrel/barrel-info') 
    })
  });
})
