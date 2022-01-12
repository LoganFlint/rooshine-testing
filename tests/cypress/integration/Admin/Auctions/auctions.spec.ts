/// <reference types="cypress" />

// beforeEach(() => {
//   Cypress.Cookies.preserveOnce('session_id', 'remember_token')
// })

// before(() => {
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore

// })

describe("admin auctions page", () => {
  it("admin auctions title", () => {
    cy.goToAdmin();
    cy.get('[data-cy=admin-auctions-tab]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/auctions/live') 
    })
    cy.get('[data-cy=title]').contains("Auctions")
  });

  it("current auction name", () => {
    cy.get('[data-cy=auction-name]').contains("Auction Name")
  });

  // TODO (deletion of live auction) button not currently eneabled this needs to be added later
  it("delete live auction", () => {
    cy.get('[data-cy=delete-auction]').should("be.visible")
    // cy.get('[data-cy=delete-auction]').click().then(() => {
    //   // not sure where this button will be leading to a modal or just an api call...
    // })
  }); 

  // TODO (edit of live auction) button not currently eneabled this needs to be added later
  it("edit current auction", () => {
    cy.get('[data-cy=edit-auction]').should("be.visible")
    // cy.get('[data-cy=delete-auction]').click().then(() => {
    //   // not sure where this button will be leading to a modal or just an api call...
    // })
  });

  it("go to admin upcoming auctions", () => {
    cy.get('[data-cy=upcoming-auctions]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/auctions/upcoming') 
    })
  });  
  
  it("go to admin past auctions", () => {
    cy.get('[data-cy=past-auctions]')
    .click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/auctions/past') 
    })
  });








  
})
