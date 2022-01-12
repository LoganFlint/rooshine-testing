/// <reference types="Cypress" />

describe("getting started suggested auctions", () => {
  it("close getting started should not longer be visible", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.login()
    cy.get('[data-cy=close-getting-started]').click().then(() => {
      cy.get('[data-cy=getting-started]').should("not.be.visible");
    })
  });
})
