describe("Página de Empresas", () => {
  beforeEach(() => {

    cy.fixture("token").then((token) => {
      console.log(token);
      cy.intercept("POST", "http://137.184.81.207:9000/login", {
        statusCode: 200,
        body: {
          token: token.token
        }
      });

      cy.intercept("GET", "http://137.184.81.207:9000/companies", {
        statusCode: 200,
        body: [
          { _id: "1", name: "Empresa 1", phone: "123456789", status: "Ativo", dueDate: "16/01/2024", recurrence: "Mensal"},
        ]
      }).as("getCompanies");

      localStorage.setItem("token", token.token);
      cy.visit("http://137.184.81.207:3000/companies");

      cy.wait("@getCompanies");
    })

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

  it("deve mudar do formulário para a tabela ao clicar em Cancelar", () => {
    cy.get("button").contains("Nova Empresa").click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
    cy.get("button").contains("Cancelar").click();
    cy.get("table").should("exist");
    cy.get("form").should("not.exist");
  });
});
