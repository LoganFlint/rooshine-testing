/// <reference types="cypress" />

describe("purchase isv", () => {

  it('unlock wallet & purchase isv', () => {
    const passphrase12 = "say,echo,finish,family,settle,clerk,orphan,cushion,proof,enhance,quarter,brand"
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.unlockWallet()
    cy.get("[data-cy=wallet-balance]").contains("BALANCE")
    cy.get("[data-cy=wallet-balance]").should("be.visible")
    cy.get("[data-cy=you-receive]").type("1000")
    cy.get("[data-cy=payment-selectField]").click().then(() => {
      cy.get("[data-cy=payment-selectField]").contains("STATE").click()
    })
    cy.get("[data-cy=preview-purchase-isv]").click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/wallet/purchase-confirm') 
    })
    cy.get("[data-cy=purchase-review-title]").should("be.visible")
    cy.get("[data-cy=confirm-isv-purchase]").click()
    cy.get("[data-cy=purchase-complete-title]").should("be.visible")
    cy.get("[data-cy=close-isv-purchased]").click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/profile') 
    })
  })
})
