describe("Página de Conexões", () => {
  beforeEach(() => {
    // Mock da resposta da API de login (se necessário)
    cy.intercept("POST", "http://localhost:9000/login", {
      statusCode: 200,
      body: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyODg0NTMsImV4cCI6MTcwNTI5MjA1M30.DK4dDoDEH4UO9NPrE4V5sjsy7uL_15aYaFg-hZBmxQE"
      }
    });

    cy.intercept("GET", "http://localhost:9000/connections", {
      statusCode: 200,
      body: [
        { _id: "1", name: "Conexão 1", phone: "123456789", instanceName: "Conexao_1-123456789" },
      ]
    }).as("getConnections");

    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyODg0NTMsImV4cCI6MTcwNTI5MjA1M30.DK4dDoDEH4UO9NPrE4V5sjsy7uL_15aYaFg-hZBmxQE");
    cy.visit("http://localhost:3000/connections");

    // Espera a requisição GET /api/connections ser chamada
    cy.wait("@getConnections");
  });

  it("deve exibir uma lista de connections", () => {
    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("deve mudar da tabela para o formulário ao clicar em Nova Conexão", () => {
    cy.get("button").contains("Nova Conexão").click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
  });

  // Adicione mais testes conforme necessário...
});
