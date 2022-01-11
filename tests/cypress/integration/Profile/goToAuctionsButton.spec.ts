
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

  it("test go to auctions button", () => {
    cy.get('[data-cy=go-to-auctions]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/auctions') 
    })
});
})
