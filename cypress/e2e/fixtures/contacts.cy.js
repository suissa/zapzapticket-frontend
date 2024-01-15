describe("Página de Contatos", () => {
  beforeEach(() => {
    // Mock da resposta da API de login (se necessário)
    cy.intercept("POST", "http://localhost:9000/login", {
      statusCode: 200,
      body: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyODM5MTYsImV4cCI6MTcwNTI4NzUxNn0.MyJuXY7h0vvSZFPsyrp5joxvVqF-WejSVSaUGqH2xtA"
      }
    });

    // Mock da resposta da API de listagem de contatos
    cy.intercept("GET", "http://localhost:9000/contacts", {
      statusCode: 200,
      body: [
        { id: 1, nome: "Contato 1", email: "contato1@example.com", telefone: "123456789" },
        // Adicione mais contatos mockados conforme necessário
      ]
    }).as("getContacts");

    // Define o token JWT mockado no localStorage antes de visitar a página
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyODM5MTYsImV4cCI6MTcwNTI4NzUxNn0.MyJuXY7h0vvSZFPsyrp5joxvVqF-WejSVSaUGqH2xtA");
    cy.visit("http://localhost:3000/contacts");

    // Espera a requisição GET /api/contacts ser chamada
    cy.wait("@getContacts");
  });

  it("deve exibir uma lista de contatos", () => {
    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("deve mudar da tabela para o formulário ao clicar em Novo Contato", () => {
    cy.get("button").contains("Novo Contato").click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
  });

  // Adicione mais testes conforme necessário...
});
