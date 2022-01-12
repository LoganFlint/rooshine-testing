/// <reference types="cypress" />

beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.goToAdmin();
})

describe("admin auctions page", () => {
  it("admin auctions title", () => {
    cy.get('[data-cy=admin-auctions-tab]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/auctions/live') 
    })
    cy.get('[data-cy=title]').contains("Auctions")
  });

  it("current auction name", () => {
    cy.get('[data-cy=admin-auctions-tab]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/auctions/live') 
    })
    cy.get('[data-cy=auction-name]').contains("Auction Name")
  });

  // TODO (deletion of live auction) button not currently eneabled this needs to be added later
  it("delete live auction", () => {
    cy.get('[data-cy=admin-auctions-tab]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/auctions/live') 
    })
    cy.get('[data-cy=delete-auction]').contains("delete")
    // cy.get('[data-cy=delete-auction]').click().then(() => {
    //   // not sure where this button will be leading to a modal or just an api call...
    // })
  }); 

  // TODO (edit of live auction) button not currently eneabled this needs to be added later
  it("edit current auction", () => {
    cy.get('[data-cy=admin-auctions-tab]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/auctions/live') 
    })
    cy.get('[data-cy=edit-auction]').contains("edit")
    // cy.get('[data-cy=delete-auction]').click().then(() => {
    //   // not sure where this button will be leading to a modal or just an api call...
    // })
  });

  it("go to admin upcoming auctions", () => {
    cy.get('[data-cy=admin-auctions-tab]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/auctions/live') 
    })
    cy.get('[data-cy=upcoming-auctions]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/auctions/upcoming') 
    })
  });  
  
  it("go to admin past auctions", () => {
    cy.get('[data-cy=admin-auctions-tab]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/auctions/live') 
    })
    cy.get('[data-cy=past-auctions]')
    .click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/auctions/past') 
    })
  });
})
