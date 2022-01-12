/// <reference types="Cypress" />

beforeEach(() => {
  Cypress.Cookies.preserveOnce('session_id', 'remember_token')
})

before(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.login()
  cy.get('[data-cy=admin-button]').click().then(() => {
    cy.url().should('eq', 'http://localhost:3000/admin/home') 
  })
})

describe("admin home page", () => {
  it("admin welcome title", () => {
    cy.get('[data-cy=admin-welcome-name]').contains("Welcome Back, Logan Flint")
  });

  
  it("evaluation banner", () => {
    cy.get('[data-cy=evaluation-banner]').contains("Evaluation Requests")
    cy.get('[data-cy=view-evaluation-requests]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/barrels') 
    })
    cy.get('[data-cy=admin-home-tab]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/home') 
    })
  })
  
  // it("profile button", () => {
  //   cy.get('[data-cy=profile-button]').click().then(() => {
  //     cy.url().should('eq', 'http://localhost:3000/profile') 
  //   })
  // })








  // // TODO (deletion of live auction) button not currently eneabled this needs to be added later
  // it("delete live auction", () => {
  //   cy.get('[data-cy=delete-auction]').should("be.visible")
  //   // cy.get('[data-cy=delete-auction]').click().then(() => {
  //   //   // not sure where this button will be leading to a modal or just an api call...
  //   // })
  // }); 

  // // TODO (edit of live auction) button not currently eneabled this needs to be added later
  // it("edit current auction", () => {
  //   cy.get('[data-cy=edit-auction]').should("be.visible")
  //   // cy.get('[data-cy=delete-auction]').click().then(() => {
  //   //   // not sure where this button will be leading to a modal or just an api call...
  //   // })
  // });

  // it("go to admin upcoming auctions", () => {
  //   cy.get('[data-cy=upcoming-auctions]').click().then(() => {
  //     cy.url().should('eq', 'http://localhost:3000/admin/auctions/upcoming') 
  //   })
  // });  
  
  // it("go to admin past auctions", () => {
  //   cy.get('[data-cy=past-auctions]')
  //   .click().then(() => {
  //     cy.url().should('eq', 'http://localhost:3000/admin/auctions/past') 
  //   })
  // });
  
})
