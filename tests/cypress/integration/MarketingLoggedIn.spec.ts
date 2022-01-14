/// <reference types="cypress" />

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.goToMarketing();
})

describe("Marketing Page", () => {
  it("live auctions goes to new route", () => {
    cy.get('[alt="rooshine logo"]').should("be.visible")
    cy.get('[alt="rooshine logo"]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/') 
    })
    cy.get('[data-cy=live-auctions-link]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/auctions') 
    })
  });

  it("past auctions goes to new route & logo visible routes to home", () => {
    cy.get('[data-cy=past-auctions-link]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/auctions/history') 
    })
  })

  
  it("sell link goes to new route & logo visible routes to home", () => {
    cy.get('[data-cy=sell-link]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/sell') 
    })
  })

  it("wallet button goes to new route & logo visible routes to home", () => {
    cy.get('[data-cy=wallet-button]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/wallet') 
    })
    cy.visit("http://localhost:3000/")
  });

  it("search icon opens search bar", () => {
    cy.get('[data-cy=search-icon]').click()
      cy.get('[data-cy=search-bar]').should("be.visible")
      cy.get('[data-cy=search-bar]').type("something")
      cy.get('[data-cy=search-bar]').clear()
      cy.get('[data-cy=close-search-bar]').click({force: true}).then(() => {
        cy.get('[data-cy=search-bar]').should("not.be.visible")
      })
  });

  it('blog link should go to medium site', () => {
    cy.get('[data-cy=blog-link]').should('have.attr', 'target', '_blank')
  })
})

