/// <reference types="Cypress" />

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.goToAdminBarrelInfo();
})

describe("admin barrel info page", () => {
  // it("back button", () => {
  //   cy.get('[data-cy=barrel-info-back]').click().then(() => {
  //     cy.url().should('eq', 'http://localhost:3000/admin/barrels') 
  //   })
  // })

  // it("barrel id is visible", () => {
  //   cy.get('[data-cy=barrel-info-barrelId]').should("be.visible")
  // })

  // it("get current barrel status", () => {
  //   cy.get('[data-cy=barrel-status]').contains("Denied")
  // })

  // it("view account button", () => {
  //   // TODO this currenntly does nothing and needs to be connected
  //   cy.get('[data-cy=barrel-info-view-account]').should("be.visible")
  // })
  
  // it("create barrel token button", () => {
  //   // TODO this currenntly does nothing and needs to be connected
  //   cy.get('[data-cy=barrel-info-create-token]').should("be.visible")
  // })

  it("change the barrel status & check the value changed", () => {
    cy.get('[data-cy=barrel-status-dropdown]').click().then(() => {
      // cy.get('[data-cy=barrel-status-holder]').should("be.visible")
    //   cy.get("[data-cy-barrel-status]").contains("Requested").should("be.visible")
    //   .click()
    //     cy.get('[data-cy=barrel-status]').contains("Requested")
    // })
    })


})
