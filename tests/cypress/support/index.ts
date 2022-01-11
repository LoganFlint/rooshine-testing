/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
Cypress.Commands.add('login', (email: string, password: string) => {
    email = "logan@launchbadge.com"
    password = "Lambda19"
    cy.visit('/sign-in')
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
  })
  