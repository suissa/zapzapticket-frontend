describe("Página de Contatos", () => {
  beforeEach(() => {

    cy.fixture("token").then((token) => {
      console.log(token);
      // Mock da resposta da API de login (se necessário)
      cy.intercept("POST", "http://localhost:9000/login", {
        statusCode: 200,
        body: {
          token: token.token
        }
      });

      cy.fixture("contacts").then((contacts) => {
        console.log(contacts);
      })
      // cy.intercept("GET", "http://localhost:9000/contacts", {
      //   statusCode: 200,
      //   body: [
      //     { _id: "1", name: "Contato 1", phone: "123456789"},
      //   ]
      // }).as("getContacts");

      localStorage.setItem("token", token.token);
      cy.visit("http://localhost:3000/contacts");

      // cy.wait("@getContacts");
    })

  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    console.log("uncaught:exception:", err);
    return false;
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
