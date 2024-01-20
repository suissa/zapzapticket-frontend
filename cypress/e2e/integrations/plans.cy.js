describe("Página de Planos", () => {
  beforeEach(() => {

    cy.fixture("token").then((token) => {
      console.log(token);
      cy.intercept("POST", "http://137.184.81.207:9000/login", {
        statusCode: 200,
        body: {
          token: token.token
        }
      });

      cy.intercept("GET", "http://137.184.81.207:9000/plans/active", {
        statusCode: 200,
        body: [
          { _id: "1", name: "Plano 1", users: 1, connections: 1, queues: 1, value: 1},
        ]
      }).as("getPlans");

      localStorage.setItem("token", token.token);
      cy.visit("http://137.184.81.207:3000/plans");

      // cy.wait("@getPlans", {timeout: 20000});
    })

  });

  it("deve exibir uma lista de empresas", () => {
    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("deve mudar da tabela para o formulário ao clicar em Novo Plano", () => {
    cy.get("button").contains("Novo Plano").click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
  });

  it("deve mudar do formulário para a tabela ao clicar em Cancelar", () => {
    cy.get("button").contains("Novo Plano").click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
    cy.get("button").contains("Cancelar").click();
    cy.get("table").should("exist");
    cy.get("form").should("not.exist");
  });
});
