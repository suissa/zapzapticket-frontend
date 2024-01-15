describe("Página de Mensagens", () => {
  beforeEach(() => {
    // Mock da resposta da API de login (se necessário)
    cy.intercept("POST", "http://localhost:9000/login", {
      statusCode: 200,
      body: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyOTIzMzMsImV4cCI6MTcwNTI5NTkzM30.TxSO20RXxsT38R22qOTuUov7xCHoW-BKynSn_7x-ahM"
      }
    });

    cy.intercept("GET", "http://localhost:9000/messages", {
      statusCode: 200,
      body: [
        { _id: "1", title: "Mensagem 1", text: "mensagem 1" },
      ]
    }).as("getMessages");

    // Define o token JWT mockado no localStorage antes de visitar a página
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyOTIzMzMsImV4cCI6MTcwNTI5NTkzM30.TxSO20RXxsT38R22qOTuUov7xCHoW-BKynSn_7x-ahM");
    cy.visit("http://localhost:3000/messages");

    // Espera a requisição GET /api/messages ser chamada
    cy.wait("@getMessages");
  });

  it("deve exibir uma lista de messages", () => {
    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("deve mudar da tabela para o formulário ao clicar em Nova Mensagem", () => {
    cy.get("button").contains("Nova Mensagem").click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
  });

  // Adicione mais testes conforme necessário...
});
