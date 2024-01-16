describe("Página de Planos", () => {
  beforeEach(() => {

    cy.fixture("token").then((token) => {
      console.log(token);
      cy.intercept("POST", "http://localhost:9000/login", {
        statusCode: 200,
        body: {
          token: token.token
        }
      });

      cy.intercept("GET", "http://localhost:9000/plans", {
        statusCode: 200,
        body: [
          { _id: "1", name: "Empresa 1",},
        ]
      }).as("getCompanies");

      localStorage.setItem("token", token.token);
      cy.visit("http://localhost:3000/plans");

      cy.wait("@getCompanies");
    })

  });

  it("deve exibir uma lista de planos", () => {
    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("deve mudar da tabela para o formulário ao clicar em Novo Plano", () => {
    cy.get("button").contains("Novo Plano").click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
  });
});
