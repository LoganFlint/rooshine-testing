/// <reference types="Cypress" />

beforeEach(() => {
  Cypress.Cookies.preserveOnce("session_id", "remember_token");
});

before(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.login();
});

describe("profile inventory section", () => {
  it("create a new listing", () => {
    cy.get("[data-cy=create-listing]")
      .first()
      .click()
      .then(() => {
        cy.url().should("eq", "http://localhost:3000/profile/add-lot-bottles");
      });
    cy.get("[data-cy=continue-create-listing]")
      .click()
      .then(() => {
        cy.url().should("eq", "http://localhost:3000/profile/add-lot-details");
      });
    cy.get("[data-cy=continue-create-listing-details]")
      .click()
      .then(() => {
        cy.url().should("eq", "http://localhost:3000/profile/add-lot-confirm");
      });
    cy.get("[data-cy=confirm-listing]")
      .click()
      .then(() => {
        cy.url().should(
          "eq",
          "http://localhost:3000/profile/add-lot-confirmation"
        );
      });
    cy.get("[data-cy=bottles-listed]")
      .click()
      .then(() => {
        cy.url().should("eq", "http://localhost:3000/profile");
      });
  });

  it("verify :mailto link", () => {
    // contact rooshine
    cy.get("[data-cy=contact-rooshine]")
      .contains("contact rooshine")
      .should("be.visible");
  });

  it("create new barrel evaluation", () => {
    // request button
    cy.get("[data-cy=create-barrel]")
      .click()
      .then(() => {
        cy.url().should(
          "eq",
          "http://localhost:3000/create-barrel/barrel-info"
        );
      });
    cy.visit("/profile");
  });
});
