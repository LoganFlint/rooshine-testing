/// <reference types="Cypress" />

describe("change password modal", () => {

  it("test change password button", () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
    cy.login()
    cy.get('[data-cy=add-payment-method]').should("be.visible")
    cy.get('[data-cy=add-payment-method]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/profile/add-payment') 
    })
    cy.get('[data-cy=add-payment-modal]').should("be.visible")
    cy.get('[data-cy=add-card-payment]').click()
    cy.get('[data-cy=continue-add-card]').click().then(() => {
      cy.url().should('eq', 'http://localhost:3000/profile/add-payment-card') 
    })
    cy.get('[data-cy=add-payment-card-modal]').should("be.visible")
    cy.get('[data-cy=card-cardholderName]').type("Logan Flint")
    cy.get('[data-cy=card-cardNumber]').type("4007400000000007")
    cy.get('[data-cy=card-cardExp]').first().type("012027")
    cy.get('[data-cy=card-cardCvc]').click().type("123")
    cy.get('[data-cy=card-line1]').type("1743 Wright St")
    cy.get('[data-cy=card-line2]').type("apt 52")
    cy.get('[data-cy=card-city]').type("Sacramento")
    cy.get('[data-cy=card-postal-code]').type("95825")
    cy.get('[data-cy=card-country]').click().then(() =>{
      cy.get('[data-cy=card-country]').contains("United States of America (the)").click()
    })
    cy.get('[data-cy=card-state]').click().then(() => {
      cy.get('[data-cy=card-state]').contains("California").click()
    })
    cy.get('[data-cy=card-save]').click()
  });





})
