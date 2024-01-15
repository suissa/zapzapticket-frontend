describe("Página de plans", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:9000/login", {
      statusCode: 200,
      body: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyOTIzMzMsImV4cCI6MTcwNTI5NTkzM30.TxSO20RXxsT38R22qOTuUov7xCHoW-BKynSn_7x-ahM"
      }
    });

    cy.intercept("GET", "http://localhost:9000/plans", {
      statusCode: 200,
      body: [
        { _id: "1", name: "Plan 1", users: 1, connections: 1, price: 1, queues: 1 },
      ]
    }).as("getPlans");

    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyOTIzMzMsImV4cCI6MTcwNTI5NTkzM30.TxSO20RXxsT38R22qOTuUov7xCHoW-BKynSn_7x-ahM");
    cy.visit("http://localhost:3000/plans");

    cy.wait("@getPlans");
  });

  it("deve exibir uma lista de plans", () => {
    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("deve mudar da tabela para o formulário ao clicar em Novo Plano", () => {
    cy.get("button").contains("Novo Plano").click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
  });

});
