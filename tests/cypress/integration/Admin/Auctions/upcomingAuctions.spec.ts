/// <reference types="cypress" />

describe("admin upcoming auctions", () => {
  it("route to upcoming auctions and get first element by name", () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cy.goToAdmin();
    cy.get("[data-cy=admin-auctions-tab]").click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/auctions/live') 
    })
    cy.get("[data-cy=upcoming-auctions]").click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/admin/auctions/upcoming') 
    })
    cy.get('[data-cy=upcoming-auction-name]').first().contains("Holiday Auction 1")
    // cy.get('[data-cy=upcoming-auction-name]').first().click().then(() => {
    //   // not sure if this will just be a list or clickable to a destinations!!
    // })
  });
})
