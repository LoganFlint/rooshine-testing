/// <reference types="cypress" />

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.goToAdminMemberInfo();
})

describe("admin member info page", () => {

  it("admin member name is visible", () => {
    cy.get('[data-cy=member-name]').should("be.visible")
  });

  it("admin member type to match buyer", () => {
    cy.get('[data-cy=member-type]').contains("BUYER")
  })

  it("admin member info back button", () => {
    cy.get('[data-cy=member-info-back]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/members') 
    })
  })

  it("admin member info deactivate account", () => {
    // TODO this button currently goes nowhere this will need to be connected
    cy.get('[data-cy=member-deactivate]').contains("deactivate account")
    cy.get('[data-cy=member-deactivate]').should("be.visible")
  })

  it("admin member info send password reset", () => {
    // TODO this button currently goes nowhere this will need to be connected
    cy.get('[data-cy=send-password-reset]').contains("send password reset")
    cy.get('[data-cy=send-password-reset]').should("be.visible")
  })

  it("admin member info toggle admin abilities", () => {
    cy.get('[data-cy=toggle-isAdmin]').should("not.be.checked")
    // TODO toggles are not holding true and folse once this is handling this will be working
    // cy.get('[data-cy=toggle-isAdmin]').click({force: true}).then(() => {
    //   cy.get('[data-cy=toggle-isAdmin]').should("be.checked")
    // })
  })

})
