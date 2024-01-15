describe("Página de Tarefas", () => {
  beforeEach(() => {
    // Mock da resposta da API de login (se necessário)
    cy.intercept("POST", "http://localhost:9000/login", {
      statusCode: 200,
      body: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyODg0NTMsImV4cCI6MTcwNTI5MjA1M30.DK4dDoDEH4UO9NPrE4V5sjsy7uL_15aYaFg-hZBmxQE"
      }
    });

    cy.intercept("GET", "http://localhost:9000/contacts", {
      statusCode: 200,
      body: [
        { _id: "1", name: "Contato 1", phone: "123456789"},
      ]
    }).as("getContacts");

    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyODg0NTMsImV4cCI6MTcwNTI5MjA1M30.DK4dDoDEH4UO9NPrE4V5sjsy7uL_15aYaFg-hZBmxQE");
    cy.visit("http://localhost:3000/contacts");

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
});
