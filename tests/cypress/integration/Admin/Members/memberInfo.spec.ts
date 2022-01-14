/// <reference types="cypress" />

describe("admin member info page", () => {

  it("admin member name is visible", () => {
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.goToAdminMemberInfo();
    cy.get('[data-cy=member-name]').should("be.visible")
  });

  it("admin member type to match buyer", () => {
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.goToAdminMemberInfo();
    cy.get('[data-cy=member-type]').contains("BUYER")
  })

  it("admin member info back button", () => {
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.goToAdminMemberInfo();
    cy.get('[data-cy=member-info-back]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/members') 
    })
  })

  it("admin member info deactivate account", () => {
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.goToAdminMemberInfo();
    // TODO this button currently goes nowhere this will need to be connected
    cy.get('[data-cy=member-deactivate]').contains("deactivate account")
    cy.get('[data-cy=member-deactivate]').should("be.visible")
  })

  it("admin member info send password reset", () => {
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.goToAdminMemberInfo();
    // TODO this button currently goes nowhere this will need to be connected
    cy.get('[data-cy=send-password-reset]').contains("send password reset")
    cy.get('[data-cy=send-password-reset]').should("be.visible")
  })

  it("admin member info toggle admin abilities", () => {
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.goToAdminMemberInfo();
    cy.get('[data-cy=toggle-isAdmin]').should("not.be.checked")
    // TODO toggles are not holding true and folse once this is handling this will be working
    // cy.get('[data-cy=toggle-isAdmin]').click({force: true}).then(() => {
    //   cy.get('[data-cy=toggle-isAdmin]').should("be.checked")
    // })
  })

})
