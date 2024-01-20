// describe("Teste do Kanban com Cypress", () => {
//   beforeEach(() => {
//     // Antes de cada teste, você pode realizar configurações iniciais, como visitar a página.
//     cy.visit("http://www.zapzapticket.online:3000/kanban"); // Certifique-se de ajustar o URL conforme necessário.
//     Cypress.Commands.add('dragTo', {prevSubject: 'element'}, (subject, targetEl) => {
//       cy.wrap(subject).trigger('mousedown', {which: 1});
//       cy.get(targetEl).trigger('mousemove').trigger('mouseup', {force: true});
//     });
//   });

//   it("Deve arrastar e soltar um cartão no Kanban", () => {
//     return true;
//     // Exemplo fictício:
//     // cy.get(".smooth-dnd-draggable-wrapper article header > span").first().dragTo(".react-trello-lane");
//     // cy.get(".react-trello-lane").should("have.length", 1);
//   });
// });

describe("Página de Kanban", () => {
  beforeEach(() => {

    cy.fixture("token").then((token) => {
      console.log(token);
      // Mock da resposta da API de login (se necessário)
      cy.intercept("POST", "http://137.184.81.207:9000/login", {
        statusCode: 200,
        body: {
          token: token.token
        }
      });

      localStorage.setItem("token", token.token);
      cy.visit("http://137.184.81.207:3000/kanban");

    })

  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    console.log("uncaught:exception:", err);
    return false;
  });
  it("deve exibir pelo menos 2 lanes", () => {
    cy.get(".react-trello-lane").should("exist");
    cy.get(".react-trello-lane").should("have.length.at.least", 2);
  });

});
