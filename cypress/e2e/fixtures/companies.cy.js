describe("Página de Empresas", () => {
  beforeEach(() => {
    // Mock da resposta da API de login (se necessário)
    cy.intercept("POST", "http://localhost:9000/login", {
      statusCode: 200,
      body: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyODM5MTYsImV4cCI6MTcwNTI4NzUxNn0.MyJuXY7h0vvSZFPsyrp5joxvVqF-WejSVSaUGqH2xtA"
      }
    });

    // Mock da resposta da API de listagem de tarefas
    cy.intercept("GET", "http://localhost:9000/companies", {
      statusCode: 200,
      body: [
        { _id: "1", name: "Empresa 1", phone: "123456789", status: "Ativo", planId: "teste", dueDate: "16/01/2024", recurrence: true  },
        // Adicione mais tarefas mockados conforme necessário
      ]
    }).as("getTasks");

    // Define o token JWT mockado no localStorage antes de visitar a página
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyODM5MTYsImV4cCI6MTcwNTI4NzUxNn0.MyJuXY7h0vvSZFPsyrp5joxvVqF-WejSVSaUGqH2xtA");
    cy.visit("http://localhost:3000/companies");

    // Espera a requisição GET /api/companies ser chamada
    cy.wait("@getTasks");
  });

  it("deve exibir uma lista de empresas", () => {
    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("deve mudar da tabela para o formulário ao clicar em Nova Empresa", () => {
    cy.get("button").contains("Nova Empresa").click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
  });

  // Adicione mais testes conforme necessário...
});
