describe("Export to pdf", () => {
  beforeEach(() => {
    cy.task("deleteFolder", "cypress/downloads/");
    cy.visit("localhost:3000");

    cy.get(".h-20 > :nth-child(3) > .inline-flex").click();

    cy.get('[placeholder="info@geoprofs.nl"]').type("user1@geoprofs.com");
    cy.get('[placeholder="Jouw wachtwoord"]').type("password123");

    cy.get(".\\[\\&\\>input\\]\\:mb-3 > .inline-flex").click();

    cy.contains("Welkom terug");
  });

  it("Download pdf file", () => {
    cy.get(":nth-child(1) > .space-x-2 > .inline-flex").click();
    cy.readFile("cypress/downloads/users_table.pdf").should("exist");
  });
  after("Delete the downloads folder after the test", () => {
    cy.task("deleteFolder", "cypress/downloads/");
  });
});
