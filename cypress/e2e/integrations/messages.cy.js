describe("Página de Mensagens", () => {
  beforeEach(() => {


    cy.fixture("token").then((token) => {
      console.log(token);
      cy.intercept("POST", "http://localhost:9000/login", {
        statusCode: 200,
        body: {
          token: token.token
        }
      });

      cy.intercept("GET", "http://localhost:9000/messages", {
        statusCode: 200,
        body: [
          { _id: "1", title: "Mensagem 1", text: "mensagem 1" },
        ]
      }).as("getMessages");

      localStorage.setItem("token", token.token);
      cy.visit("http://localhost:3000/messages");

      cy.wait("@getMessages");
    });
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
