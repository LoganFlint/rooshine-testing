// import * as smith from "../../fixtures/smith.json";
//import * as testLot1 from "../../fixtures/lot_72197415.json";

// describe("App mounted", () => {
//     it("Mounted", () => {
//         cy.visit("/").contains(`Hosting the Most`);
//         cy.get('[alt="rooshine logo"]').should("be.visible");
//     });
// });

// describe("Try all routes", () => {
//     it("Sign in", () => {
//         cy.visit("/sign-in").contains("Sign in to your");
//         cy.get('[data-cy=sign-in-modal]').should("be.visible");
//     });

//     it("Sign up", () => {
//         cy.visit("/sign-up").contains("Create Account");
//         cy.get('[data-cy=sign-up-form]').should("be.visible");
//     });

//     it("Reset password", () => {
//         cy.visit(`/reset-password/${smith.email}`).contains("Reset Password");
//         cy.get('[data-cy=reset-password-email-input]').should("be.visible").should("have.value", smith.email);
//         cy.visit(`/reset-password/${smith.email}/email`).contains("Reset Password");
//         cy.get('[data-cy=reset-password-email-input]').should("be.visible").should("have.value", smith.email);
//         cy.visit(`/reset-password/${smith.email}/checkemail`).contains("We have sent a verification code to").should("contain.text", smith.email);
//         cy.visit(`/reset-password/${smith.email}/verify`).contains("Enter the 6 digit code").should("contain.text", smith.email);
//         cy.visit(`/reset-password/${smith.email}/newpassword`) //BAD
//     });

//     it("Error", () => {
//         cy.visit("/not-found").url().should("include", "not-found");
//     });

//     it("Create barrel", () => {
//         cy.visit("/create-barrel").url().should("include", "/create-barrel/barrel-info");
//         cy.visit("/create-barrel/barrel-info").url().should("include", "/create-barrel/barrel-info");
//     });

//     it("Register", () => {
//         cy.visit("/register").url().should("include", "/register/account");
//         cy.get("div").contains("Join other whisky").should("contain.text", `Join other whisky enthusiasts in the largest online sprit auction on block chain`);

//         cy.visit("/register/account").contains("Join other whisky enthusiasts");
//         cy.get('[data-cy=account-details-form]').should("be.visible");

//         cy.visit("/register/identity").contains("Let's get you verified");
//         cy.get("div").contains("confirm your identity").should("contain.text", "We need a little information to confirm your identity");

//         cy.visit("/register/address").contains("Where can we ship");
//         cy.get('[data-cy=address-form]').should("be.visible");

//         cy.visit("/register/billing").contains("$5.00 registration");
//         cy.get('[data-cy=billing-info-form]').should("be.visible");

//         cy.visit("/register/finalize").contains("complete your registration");
//         cy.get("a").should("contain.text", "Terms and Conditions");
//     });

//     it("Profile", () => {
//         cy.visit("/user").url().should("include", "/user");

//         cy.visit("/profile").contains("Account Info");
//         cy.get('[data-cy=profile-admin-buttons]').should("be.visible");

//         cy.visit("/profile/add-payment").contains("Add New Payment Method");
//         cy.get('[data-cy=add-payment-modal]').should("be.visible");

//         cy.visit("/profile/add-payment-bank").contains("Add Bank Account");
//         cy.get('[data-cy=add-payment-bank-account-modal]').should("be.visible");

//         cy.visit("/profile/add-payment-card").contains("Add Debit");
//         cy.get('[data-cy=add-payment-card-modal]').should("be.visible");

//         cy.visit("/profile/change-password").contains("Change your password");
//         cy.get('[data-cy=change-password-modal]').should("be.visible");

//         cy.visit("/profile/change-password-confirm").contains(`Password Updated`);
//         cy.visit('[data-cy=change-password-confirm-modal]').should("be.visible");

//         cy.visit("/profile/add-lot-bottles").contains("Select Bottles to List");
//         cy.get('[data-cy=add-lot-bottles-modal]').should("be.visible");

//         cy.visit("/profile/add-lot-details").contains("Listing Details");
//         cy.get('[data-cy=add-lot-details-modal]').should("be.visible");

//         cy.visit("/profile/add-lot-confirm").contains("Confirm Listing");
//         cy.get('[data-cy=add-lot-confirm-modal]').should("be.visible");

//         cy.visit("/profile/add-lot-confirmation").contains("Your bottles are listed");
//         cy.get('[data-cy=add-lot-submitted-modal]').should("be.visible");
//     });

//     it("Wallet", () => {
//         cy.visit("/wallet").get("div").contains("Buy Tokens").should("be.visible");

//         cy.visit("/wallet-setup").contains(`Back up your wallet`);
//         cy.get('[data-cy=wallet-setup-reveal-phrase-button]').should("be.visible");
//     });

//     it("Auctions", () => {
//         cy.visit("/auctions").contains("Live Auction");
//         cy.get('[data-cy=live-auction-countdown-tiles]').should("be.visible");
//         cy.get('[data-cy=live-auction-filter-sidebar]').should("be.visible");

//         cy.visit("/auctions-empty").contains("Upcoming Auctions");
//         cy.get('[data-cy=live-auction-empty]').should("be.visible");

//         cy.visit("/auctions/history").contains("Past Auctions");
//         cy.get('[data-cy=past-auction-cards]').should("be.visible");

//         cy.visit(`/lot-details/${72197415}`).contains("LOT #72197415");
//         cy.get("div").contains("Old Malt Cask").should("contain.text", `Old Malt Cask Ardbeg 32 Year Old 1967`);

//         cy.visit(`/lot-details/${72197415}/bid`).contains("Place Bid");
//         cy.get('[data-cy=start-bid-modal]').should("be.visible");
//     });

//     it("Sell", () => {
//         cy.visit("/sell").contains("How to Sell").should("be.visible");
//     });

//     it("Blog", () => {
//         cy.visit("/blog").contains("FEATURED");
//         cy.get('[data-cy=featured-blog]').should("be.visible");

//         // cy.visit("/blog-article").contains("Blog article").should("contain.text", "Blog article coming soon");
//     });

//     it("Admin", () => {
//         cy.visit("/admin").contains("Welcome Back");
//         cy.get('[data-cy=admin-home-body]').should("be.visible");

//         cy.visit("/admin/home").contains("Welcome Back");
//         cy.get('[data-cy=admin-home-body]').should("be.visible");

//         cy.visit("admin/barrels").contains("Barrels");
//         cy.get('[data-cy=admin-lot-list-table]').should("be.visible");

//         cy.visit("/admin/barrel/barrel-info").contains("Barrel Details");
//         cy.get('[data-cy=admin-barrel-bottle-details]').should("be.visible");

//         cy.visit("/admin/barrel/barrel-bottles").contains("Mint Bottle Tokens");
//         cy.get('[data-cy=mint-bottle-counter]').should("be.visible");

//         cy.visit("/admin/auctions/live").contains("Lot Statistics");
//         cy.get('[data-cy=admin-live-auction-tiles]').should("be.visible");

//         cy.visit("/admin/auctions/upcoming").get('[data-cy=admin-upcoming-auction-list-table]').should("be.visible");

//         cy.visit("/admin/auctions/past").get('[data-cy=admin-past-auction-list-table]').should("be.visible");

//         cy.visit("/admin/members").get('[data-cy=admin-members-list-table]').should("be.visible");

//         cy.visit("/admin/members/info").contains("Personal Info");
//         cy.get('[data-cy=admin-members-personal-info]').should("be.visible");

//         cy.visit("/admin/members/tokens").get('[data-cy=admin-members-token]').should("be.visible");

//         cy.visit("/admin/members/activity").get('[data-cy=admin-members-account-activity-card]').should("be.visible");

//         cy.visit("/admin/members/listings").get('[data-cy=admin-members-listings-table]').should("be.visible");

//         cy.visit("/admin/blogs").get("div").contains("Blogs").should("contain.text", "Blogs");
//     });
// });
