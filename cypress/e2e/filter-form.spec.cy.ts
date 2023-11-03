describe("Filter Form", () => {
  it("Tests the search input", () => {
    cy.visit("http://localhost:3000/");

    cy.getByDataTest("nav-logo-link");

    const fakeNameText = "__#214-ABCDEFG*234";
    const searchInput = cy.getByDataTest("search-input");
    searchInput.type(fakeNameText);
    searchInput.should("have.value", fakeNameText);

    cy.contains("No photos match your search criteria");

    cy.contains("Clear Filters").click();

    searchInput.should("have.value", "");
  });
});
