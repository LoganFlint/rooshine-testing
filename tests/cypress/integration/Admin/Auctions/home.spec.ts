/// <reference types="Cypress" />

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.goToAdmin();
})

describe("admin home page", () => {
  it("admin welcome title", () => {
    cy.get('[data-cy=admin-welcome-name]').contains("Welcome Back, Logan Flint")
  });

  it("evaluation banner", () => {
    cy.get('[data-cy=evaluation-banner]').contains("Evaluation Requests")
    cy.get('[data-cy=view-evaluation-requests]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/barrels') 
    })
    cy.get('[data-cy=admin-home-tab]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/home') 
    })
  })
  

  it("profile button", () => {
    cy.get('[data-cy=profile-button]').click().then(() => {
    cy.url().should('eq', 'http://localhost:3000/profile') 
    })
  })

  it("create auctiuon button opens modal close with close button", () => {
    cy.get("[data-cy=create-auction]").click().then(() => {
      cy.get('[data-cy=admin-create-auction-title]').should("be.visible")
      cy.get('[data-cy=admin-create-auction-title]').contains("Create/Edit Auction")
      cy.get('[alt="close"]').should("be.visible").click().then(() => {
        cy.get('[data-cy=admin-create-auction-title]').should("not.be.visible")
      });
    })
  })

  it("create auctiuon button opens modal close with click off", () => {
    cy.get("[data-cy=create-auction]").click().then(() => {
      cy.get('[data-cy=admin-create-auction-title]').should("be.visible")
      cy.get('[data-cy=admin-create-auction-title]').contains("Create/Edit Auction")
      cy.get('[alt="close"]').click(100, 200, {force: true}).then(() => {
        cy.get('[data-cy=admin-create-auction-title]').should("not.be.visible")
      })
    })
  })

})
