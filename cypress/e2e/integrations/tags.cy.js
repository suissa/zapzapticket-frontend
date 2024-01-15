describe("Página de tags", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:9000/login", {
      statusCode: 200,
      body: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyOTIzMzMsImV4cCI6MTcwNTI5NTkzM30.TxSO20RXxsT38R22qOTuUov7xCHoW-BKynSn_7x-ahM"
      }
    });

    cy.intercept("GET", "http://localhost:9000/tags", {
      statusCode: 200,
      body: [
        { _id: "1", name: "Tag 1", color: "#000000" },
      ]
    }).as("getTags");

    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUyOTIzMzMsImV4cCI6MTcwNTI5NTkzM30.TxSO20RXxsT38R22qOTuUov7xCHoW-BKynSn_7x-ahM");
    cy.visit("http://localhost:3000/tags");

    cy.wait("@getTags");
  });

  it("deve exibir uma lista de tags", () => {
    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("deve mudar da tabela para o formulário ao clicar em Nova Tag", () => {
    cy.get("button").contains("Nova Tag").click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
  });

});
