describe("Auth login", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });
  it("Log-in", () => {
    cy.get(".h-20 > :nth-child(3) > .inline-flex").click();
    cy.get('[placeholder="info@geoprofs.nl"]').type("user1@geoprofs.com");
    cy.get('[placeholder="Jouw wachtwoord"]').type("password123");
    cy.get(".\\[\\&\\>input\\]\\:mb-3 > .inline-flex").click();

    cy.contains("Welkom terug");
  });

  it("Log-out", () => {
    cy.get(".h-20 > :nth-child(3) > .inline-flex").click();
    cy.get('[placeholder="info@geoprofs.nl"]').type("user1@geoprofs.com");
    cy.get('[placeholder="Jouw wachtwoord"]').type("password123");
    cy.get(".\\[\\&\\>input\\]\\:mb-3 > .inline-flex").click();
    cy.contains("Welkom terug");
    cy.get(".h-8").click();
    cy.contains("Uitloggen").click();
    cy.contains("Login");
  });

  it("Log-in with wrong password", () => {
    cy.get(".h-20 > :nth-child(3) > .inline-flex").click();
    cy.get('[placeholder="info@geoprofs.nl"]').type("user1@geoprofs.com");
    cy.get('[placeholder="Jouw wachtwoord"]').type("password");
    cy.get(".\\[\\&\\>input\\]\\:mb-3 > .inline-flex").click();
    cy.contains("Onjuiste gebruikersnaam of wachtwoord");
  });
});
