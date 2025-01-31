describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");

    cy.get(".h-20 > :nth-child(3) > .inline-flex").click();

    cy.get('[placeholder="info@geoprofs.nl"]').type("user1@geoprofs.com");
    cy.get('[placeholder="Jouw wachtwoord"]').type("password123");

    cy.get(".\\[\\&\\>input\\]\\:mb-3 > .inline-flex").click();

    cy.contains("Welkom terug");
  });

  it("Check pages", () => {
    cy.get('[href="/manage"]').click();
    cy.contains("Afgelopen Verloven");

    cy.get('[href="/create-leave-request"]').click();
    cy.contains("Verlof aanvragen");

    cy.get('[href="/calendar"]').click();
    cy.contains("Alle teams");

    cy.get('.space-x-6 > [href="/dashboard"]').click();
    cy.contains("Personeel");
  });
});
