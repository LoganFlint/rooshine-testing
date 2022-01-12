/// <reference types="cypress" />

describe("test admin button", () => {
  it("route to admin page", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.goToAdmin();
  });
})
