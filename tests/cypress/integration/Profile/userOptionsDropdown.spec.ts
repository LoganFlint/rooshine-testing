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

  it("Sign in", () => {
    cy.get('[data-cy=user-option-dropdown]').click().then(() => {
      cy.get("[data-cy-option]")
        .contains("Profile").should("be.visible").click().then(() => {
          cy.url().should('eq', 'http://localhost:3000/profile') 
        })
    })
});
})
