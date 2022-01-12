/// <reference types="cypress" />

//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
Cypress.Commands.add('login', () => {
    cy.visit("/").contains(`Hosting the Most`);
    cy.get('[alt="rooshine logo"]').should("be.visible");
    const email = "logan@launchbadge.com"
    const password = "Lambda19"
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
 
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
Cypress.Commands.add('goToAdmin', () => {
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    cy.login()
    cy.visit("/profile");
    cy.get('[data-cy=admin-button]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/home') 
    })
});

//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
Cypress.Commands.add('goToAdminMemberInfo', () => {
  //eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  cy.login()
  cy.visit("/profile");
  cy.get('[data-cy=admin-button]').click().then(() => {
    cy.url().should('eq', 'http://localhost:3000/admin/home') 
  })
  cy.get('[data-cy=admin-members-tab]').click().then(() => {
    cy.url().should('eq', 'http://localhost:3000/admin/members') 
  })
  cy.get('[data-cy=admin-member-email]').first().click().then(() => {
    cy.url().should('eq', 'http://localhost:3000/admin/members/info') 
  })
});
