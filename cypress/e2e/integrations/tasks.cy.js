describe("Página de Tarefas", () => {
  beforeEach(() => {

    cy.fixture("token").then((token) => {
      console.log(token);
      cy.intercept("POST", "http://localhost:9000/login", {
        statusCode: 200,
        body: {
          token: token.token
        }
      });

      cy.intercept("GET", "http://localhost:9000/tasks/actives", {
        statusCode: 200,
        body: [
          { _id: "1", text: "Tarefa 1" },
        ]
      }).as("getTasks");

      localStorage.setItem("token", token.token);
      cy.visit("http://localhost:3000/tasks");

      cy.wait("@getTasks");
    });
  });

  it("deve exibir uma lista de tarefas", () => {
    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("deve mudar da tabela para o formulário ao clicar em Nova Tarefa", () => {
    cy.get("button").contains("Nova Tarefa").click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
  });

  // Adicione mais testes conforme necessário...
});
