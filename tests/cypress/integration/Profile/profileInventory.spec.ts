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

  it("test profile inventory", () => {
    cy.get('[data-cy=create-listing]').first().click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/profile/add-lot-bottles') 
    })
    cy.get('[data-cy=continue-create-listing]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/profile/add-lot-details') 
    })
    cy.get('[data-cy=continue-create-listing-details]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/profile/add-lot-confirm') 
    })
    cy.get('[data-cy=confirm-listing]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/profile/add-lot-confirmation') 
    })
    cy.get('[data-cy=bottles-listed]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/profile') 
    })

    // contact rooshine
    cy.get('[data-cy=contact-rooshine]').contains('contact rooshine').should('be.visible') 
    
    // request button
    cy.get('[data-cy=create-barrel]').click().then(() => {
    cy.url().should('eq', 'http://localhost:3000/create-barrel/barrel-info') 
    })
    cy.visit("/profile")
  })
})
