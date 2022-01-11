/// <reference types="Cypress" />

describe("Sign in", () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('session_id', 'remember_token')
  })
  it("App mounted", () => {
      cy.visit("/").contains(`Hosting the Most`);
      cy.get('[alt="rooshine logo"]').should("be.visible");
  });

  it("Sign in", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      cy.login();
});

  it("test admin button", () => {
    cy.get('[data-cy=admin-button]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/home') 
    })
    cy.get('[data-cy=admin-home-tab]').should("be.visible")
});
})
