/// <reference types="Cypress" />

// currently using profile option due to not hitting API calls
describe("user options dropdown", () => {
  it("pageheader drop down Profile option", () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.login()
    cy.get('[data-cy=user-option-dropdown]').click().then(() => {
      cy.get("[data-cy-option]")
        .contains("Profile").should("be.visible").click().then(() => {
          cy.url().should('eq', 'http://localhost:3000/profile') 
        })
    })
  });
})
