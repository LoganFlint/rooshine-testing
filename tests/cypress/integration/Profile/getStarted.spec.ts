describe("Sign in", () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('session_id', 'remember_token')
  })
  it("App mounted", () => {
      cy.visit("/").contains(`Hosting the Most`);
      cy.get('[alt="rooshine logo"]').should("be.visible");
  });

  it("Sign in", () => {
      const email = "logan@launchbadge.com";
      const password = "Lambda19";

      cy.visit("/sign-in")
      cy.get('[data-cy=sign-in-modal]').should("be.visible");
      cy.get('[data-cy=sign-in-email-input]').should("be.visible");
      cy.get('[data-cy=sign-in-email-input]').type(email);
      cy.get('[data-cy=sign-in-get-started-button]').should("be.visible");
      cy.get('[data-cy=sign-in-get-started-button]').click().then(() => {
          cy.get('[data-cy=sign-in-error-message]').should("be.visible");
      });
      cy.get('[data-cy=sign-in-password-input]').type(password);
      cy.get('[data-cy=sign-in-get-started-button]').click().then(() => {
          cy.url().should("include", "/wallet");
      });
      cy.visit("/profile")
      cy.get('[data-cy=getting-started]').should("be.visible")
  });

  it("test getting started", () => {
    cy.get('[data-cy=close-getting-started]').click().then(() => {
      cy.get('[data-cy=getting-started]').should("not.be.visible");
    })
  });
})
