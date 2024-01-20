// const ENV = "development"
const ENV = "production"
const BASE_URL_DEV = "http://localhost"
const BASE_URL_PROD = "http://137.184.81.207"
const BASE_URL = ENV == "development" ? BASE_URL_DEV : BASE_URL_PROD
const LOGIN_URL = `${BASE_URL}:9000/login`
const API_URL = `${BASE_URL}:9000/contacts`
const TEST_URL = `${BASE_URL}:3000/contacts`
const BUTTON = "Novo Contato"

describe("Página de Contatos", () => {
  beforeEach(() => {

    cy.fixture("token").then((token) => {
      console.log(token);
      cy.intercept("POST", `${LOGIN_URL}`, {
        statusCode: 200,
        body: {
          token: token.token
        }
      });

      cy.intercept("GET", `${API_URL}`, {
        statusCode: 200,
        body: [
          { _id: "1", name: "Contato 1", phone: "123456789"},
        ]
      }).as("getContacts");

      localStorage.setItem("token", token.token);
      cy.visit(`${TEST_URL}`);

      cy.wait("@getContacts");
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

  it(`deve mudar da tabela para o formulário ao clicar em ${BUTTON}`, () => {
    cy.get("button").contains(BUTTON).click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
  });

  it("deve mudar do formulário para a tabela ao clicar em Cancelar", () => {
    cy.get("button").contains(BUTTON).click();
    cy.get("form").should("exist");
    cy.get("table").should("not.exist");
    cy.get("button").contains("Cancelar").click();
    cy.get("table").should("exist");
    cy.get("form").should("not.exist");
  });
});
