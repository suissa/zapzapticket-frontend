describe("Página de tags", () => {
  beforeEach(() => {

    cy.fixture("token").then((token) => {
      console.log(token);
      cy.intercept("POST", "http://137.184.81.207:9000/login", {
        statusCode: 200,
        body: {
          token: token.token
        }
      });

      cy.intercept("GET", "http://137.184.81.207:9000/tags", {
        statusCode: 200,
        body: [
          { _id: "1", name: "Tag 1", color: "#000000" },
        ]
      }).as("getTags");

      localStorage.setItem("token", token.token);
      cy.visit("http://137.184.81.207:3000/tags");

      cy.wait("@getTags");
    });
  });

  it("deve exibir uma lista de tags", () => {
    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("deve mudar da tabela para o formulário ao clicar em Nova Tag", () => {
    cy.get("button").contains("Nova Tag").click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
  });

});
