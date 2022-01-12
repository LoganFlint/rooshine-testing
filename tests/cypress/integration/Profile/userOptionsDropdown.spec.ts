/// <reference types="Cypress" />

beforeEach(() => {
  Cypress.Cookies.preserveOnce("session_id", "remember_token");
});

before(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.login();
});

// currently using profile option due to not hitting API calls
describe("user options dropdown", () => {
  it("pageheader drop down Profile option", () => {
    cy.get('[data-cy=user-option-dropdown]').click().then(() => {
      cy.get("[data-cy-option]")
        .contains("Profile").should("be.visible").click().then(() => {
          cy.url().should('eq', 'http://localhost:3000/profile') 
        })
    })
  });
})
