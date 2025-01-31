describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");

    cy.get(".h-20 > :nth-child(3) > .inline-flex").click();

    cy.get('[placeholder="info@geoprofs.nl"]').type("user1@geoprofs.com");
    cy.get('[placeholder="Jouw wachtwoord"]').type("password123");

    cy.get(".\\[\\&\\>input\\]\\:mb-3 > .inline-flex").click();

    cy.contains("Welkom terug");
  });

  it("Make request", () => {
    cy.get('[href="/create-leave-request"]').click();
    cy.contains("Verlof aanvragen");
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#\\:r12\\:-form-item").click();
    cy.get('[aria-labelledby="radix-:r1e:"]').click();
    cy.get("#\\:r14\\:-form-item").click();
    cy.get(":nth-child(5) > :nth-child(5) > .rdp-button_reset").click();
    cy.get(":nth-child(5) > :nth-child(7) > .rdp-button_reset").click();
    cy.get("#\\:r16\\:-form-item").click().type("Weekend weg");
    cy.get(".bg-emerald-500").click();
    /* ==== End Cypress Studio ==== */
  });

  it("Check request", () => {
    cy.get('[href="/manage"]').click();
    cy.contains("Vakantie").click();
  });
});
