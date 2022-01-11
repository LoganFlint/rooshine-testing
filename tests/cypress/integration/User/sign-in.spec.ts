import * as smith from "../../fixtures/smith.json";

describe("Sign in", () => {
    it("App mounted", () => {
        cy.visit("/").contains(`Hosting the Most`);
        cy.get('[alt="rooshine logo"]').should("be.visible");
    });

    it("Sign in: Smith (no wallet)", () => {
        const email = smith.email;
        const password = smith.password;

        cy.visit("/sign-in").contains("Sign in to your");
        cy.get('[data-cy=sign-in-modal]').should("be.visible");
        cy.get('[data-cy=sign-in-email-input]').should("be.visible");
        cy.get('[data-cy=sign-in-email-input]').type(email);
        cy.get('[data-cy=sign-in-get-started-button]').should("be.visible");
        cy.get('[data-cy=sign-in-get-started-button]').click().then(() => {
            cy.get('[data-cy=sign-in-error-message]').should("be.visible");
        });
        cy.get('[data-cy=sign-in-password-input]').type(password);
        cy.get('[data-cy=sign-in-get-started-button]').click().then(() => {
            cy.url().should("include", "/wallet-setup");
        });
    });

    it("Close modal: click off", () => {
        cy.visit("/sign-in").contains("Sign in to your");
        cy.get('[data-cy=sign-in-modal]').should("be.visible");
        cy.get('[alt="rooshine logo"]').click({ force: true }).then(() => {
            cy.get('[data-cy=sign-in-modal]').should("not.exist");
        });
    });

    it("Close modal: click exit", () => {
        cy.visit("/sign-in").contains("Sign in to your");
        cy.get('[data-cy=sign-in-modal]').should("be.visible");
        cy.get('[alt="close"]').should("be.visible").click().then(() => {
            cy.get('[data-cy=sign-in-modal]').should("not.exist");
        });
    });

    
})