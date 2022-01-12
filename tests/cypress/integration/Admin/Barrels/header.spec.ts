/// <reference types="Cypress" />

describe("admin barrel page", () => {

  it("navigate to admin barrels & verify title", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.goToAdmin();
    cy.get('[data-cy=admin-barrels-link]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/barrels') 
    })
    cy.get('[data-cy=title]').contains("Barrels")
  });

  // needs to be connected to BE and tested further later
  it("find search barrels & use input", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.goToAdmin();
    cy.get('[data-cy=admin-barrels-link]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/barrels') 
    })
    cy.get('#search-barrels').should("be.visible")
    cy.get('#search-barrels').type("something")
    cy.get('#search-barrels').clear()
  });

  it("forward and back barrel pages", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.goToAdmin();
    cy.get('[data-cy=admin-barrels-link]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/barrels') 
    })
    cy.get("[data-cy=barrels-back-page]").should("be.visible")
    cy.get("[data-cy=barrels-forward-page]").should("be.visible")
    cy.get("[data-cy=barrels-forward-page]").click()
    cy.get("[data-cy=barrels-back-page]").click()
  });

  it("click on barrel in grid list", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.goToAdmin()
    cy.get('[data-cy=admin-barrels-link]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/barrels') 
    })
    cy.get("[data-cy=barrel-id-to-barrelDetails]").first().click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/barrel/barrel-info') 
    })
  });
})
