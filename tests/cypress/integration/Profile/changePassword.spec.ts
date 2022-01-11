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
      cy.get('[data-cy="welcome-username"]').should("be.visible")
  });

  it("test change password", () => {
    const currentPassword = "Lambda19"
    const newPassword = "Lambda2019"
    cy.get('[data-cy=change-password]').should("be.visible")
    cy.get('[data-cy=change-password]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/profile/change-password') 
    })
    // add these in once hitting API 
    // cy.get('[data-cy=current-password]').type(currentPassword)
    // cy.get('[data-cy=new-password]').type(newPassword)
    // cy.get('[data-cy=confirm-password]').type(newPassword)
    // cy.get('[data-cy=submit-password]').click().then(() => {
    //   cy.url().should('eq', 'http://localhost:3000/profile') 
    // })
    // cy.get('[data-cy="welcome-username"]').should("be.visible")
    cy.get('[alt="rooshine logo"]').click({ force: true }).then(() => {
      cy.get('[data-cy=change-password]').should("not.exist");
      cy.url().should('eq', 'http://localhost:3000/') 
    });
  });
})
