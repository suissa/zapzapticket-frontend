describe("Página de Conexões", () => {
  beforeEach(() => {

    
    cy.fixture("token").then((token) => {
      console.log(token);
      cy.intercept("POST", "http://137.184.81.207:9000/auth/login", { 
        statusCode: 200,
        body: {
          token: token.token
        }
      });

      cy.intercept("GET", "http://137.184.81.207:9000/connections", {
        statusCode: 200,
        body: [
          { _id: "1", name: "Conexão 1", phone: "123456789", instanceName: "Conexao_1-123456789" },
        ]
      }).as("getConnections");

      localStorage.setItem("token", token.token);
      cy.visit("http://137.184.81.207:3000/connections");

      // Espera a requisição GET /api/connections ser chamada
      cy.wait("@getConnections", { timeout: 10000 });
    });
  });

  it("deve exibir uma lista de connections", () => {
    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("deve mudar da tabela para o formulário ao clicar em Nova Conexão", () => {
    cy.get("button").contains("Nova Conexão").click();
    cy.wait(1000);
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
  });

  it("deve mudar do formulário para a tabela ao clicar em Cancelar", () => {
    cy.get("button").contains("Nova Conexão").click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
    cy.get("button").contains("Cancelar").click();
    cy.get("table").should("exist");
    cy.get("form").should("not.exist");
  });
});
