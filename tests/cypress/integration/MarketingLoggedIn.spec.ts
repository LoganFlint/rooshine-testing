/// <reference types="cypress" />

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.goToMarketing();
})

describe("Marketing Page & logo goes home", () => {
  it("live auctions goes to new route", () => {
    cy.get('[data-cy=live-auctions-link]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/auctions') 
    })
    cy.get('[alt="rooshine logo"]').should("be.visible")
    cy.get('[alt="rooshine logo"]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/') 
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

  it('facebook footer link', () => {
    cy.get('[data-cy=facebook-link]').find("img").should("be.visible")
    cy.get('[data-cy=social-links]').should('have.attr', 'target', '_blank')
  })  
  
  it('twitter footer link', () => {
    cy.get('[data-cy=twitter-link]').find("img").should("be.visible")
    cy.get('[data-cy=social-links]').should('have.attr', 'target', '_blank')
  })  
  
  
  it('instagram footer link', () => {
    cy.get('[data-cy=instagram-link]').find("img").should('be.visible')
    cy.get('[data-cy=social-links]').should('have.attr', 'target', '_blank')
  })

  it('view lots button routes to lots by id: click first button available', () => {
    cy.get('[data-cy=view-lot]').should("be.visible")
    cy.get('[data-cy=view-lot]').first().click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/lot-details/72197415') 
    })
  })

  it('live auction banner visible, click left & right', () => {
    cy.get('[data-cy=auction-banner-header]').should("be.visible")
    cy.get('[data-cy=auction-banner-arrow-right]').should("be.visible")
    cy.get('[data-cy=auction-banner-arrow-left]').should("be.visible")
    cy.get('[data-cy=auction-banner-header]').contains("Live")

    cy.get('[data-cy=auction-banner-arrow-right]').click()
    cy.get('[data-cy=auction-banner-arrow-right]').click()

    cy.get('[data-cy=auction-banner-arrow-left]').click()
    cy.get('[data-cy=auction-banner-arrow-left]').click()
  })

  // TODO not logged in version
  it('marketing banner button & click through images', () => {
    cy.get('[data-cy=get-started]').should("be.visible")
    cy.get('[data-cy-carousel-image]').should("be.visible")
    cy.get('[data-cy-carousel-image]').click({multiple: true})
    cy.get('[data-cy=get-started]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/auctions') 
    })
  })
})

