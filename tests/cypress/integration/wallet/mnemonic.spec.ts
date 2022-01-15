/// <reference types="cypress" />

describe("enter into wallet with mnemonic phrases", () => {

  it('marketing banner button & click through images', () => {
    const passphrase12 = "say,echo,finish,family,settle,clerk,orphan,cushion,proof,enhance,quarter,brand"
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.login()
    cy.get('[data-cy=wallet-button]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/wallet') 
    })
    .get("[data-cy-mnemonic-option]").then(() => {
      const words = passphrase12.split(",");
      for (let i = 0; i < 12; i++) {
        cy.get(`#something${i + 1}`).type(words[i]);
      }
    })
    cy.get('[data-cy=unlock-wallet]').click()
    cy.get("[data-cy=wallet-balance]").should("be.visible")
    cy.get("[data-cy=wallet-balance]").contains("BALANCE")
  })
})

