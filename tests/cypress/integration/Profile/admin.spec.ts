import '../../support/commands'
/// <reference types="Cypress" />

describe("Sign in", () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('session_id', 'remember_token')
  })
  it("App mounted", () => {
      cy.visit("/").contains(`Hosting the Most`);
      cy.get('[alt="rooshine logo"]').should("be.visible");
      cy.login(email, password)
  });

  // it("Sign in", () => {
  //     const email = "logan@launchbadge.com";
  //     const password = "Lambda19";

  //     cy.visit("/sign-in")
  //     cy.get('[data-cy=sign-in-modal]').should("be.visible");
  //     cy.get('[data-cy=sign-in-email-input]').should("be.visible");
  //     cy.get('[data-cy=sign-in-email-input]').type(email);
  //     cy.get('[data-cy=sign-in-get-started-button]').should("be.visible");
  //     cy.get('[data-cy=sign-in-get-started-button]').click().then(() => {
  //         cy.get('[data-cy=sign-in-error-message]').should("be.visible");
  //     });
  //     cy.get('[data-cy=sign-in-password-input]').type(password);
  //     cy.get('[data-cy=sign-in-get-started-button]').click().then(() => {
  //         cy.url().should("include", "/wallet");
  //     });
  //     cy.visit("/profile")
  //     cy.get('[data-cy="admin-button"]').should("be.visible")
  // });



  it("test admin button", () => {
    cy.get('[data-cy=admin-button]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/home') 
    })
    cy.get('[data-cy=admin-home-tab]').should("be.visible")
});
})
