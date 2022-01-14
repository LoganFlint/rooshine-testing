/// <reference types="cypress" />

describe("admin members page", () => {

  it("admin members title", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.goToAdmin();
    cy.get('[data-cy=admin-members-tab]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/members') 
    })
    cy.get('[data-cy=title]').contains("Members")
  });

  it("get first member by email in list and go to next page", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.goToAdmin();
    cy.get('[data-cy=admin-members-tab]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/members') 
    })
    cy.get('[data-cy=admin-member-email]').first().contains("leckey.ryan@gmail.com")
    cy.get('[data-cy=admin-member-email]').first().click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/members/info') 
    })
  });

  it("member tokens should be visible", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.goToAdmin();
    cy.get('[data-cy=admin-members-tab]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/members') 
    })
    cy.get('[data-cy=admin-member-email]').first().contains("leckey.ryan@gmail.com")
    cy.get('[data-cy=admin-member-email]').first().click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/members/info') 
    })
    cy.get('[data-cy=member-tokens]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/members/tokens') 
    })
    cy.get('[data-cy=barrel-tokens]').first().should("be.visible")
  });
})
