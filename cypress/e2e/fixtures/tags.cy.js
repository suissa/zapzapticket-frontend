describe("Página de tags", () => {
  beforeEach(() => {
    // Mock da resposta da API de login (se necessário)
    cy.intercept("POST", "http://localhost:9000/login", {
      statusCode: 200,
      body: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyODg0NTMsImV4cCI6MTcwNTI5MjA1M30.DK4dDoDEH4UO9NPrE4V5sjsy7uL_15aYaFg-hZBmxQE"
      }
    });

    cy.intercept("GET", "http://localhost:9000/tags", {
      statusCode: 200,
      body: [
        { _id: "1", name: "Tag 1", color: "#000000" },
      ]
    }).as("getTags");

    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyODg0NTMsImV4cCI6MTcwNTI5MjA1M30.DK4dDoDEH4UO9NPrE4V5sjsy7uL_15aYaFg-hZBmxQE");
    cy.visit("http://localhost:3000/tags");

    cy.wait("@getTags");
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

  // Adicione mais testes conforme necessário...
});
