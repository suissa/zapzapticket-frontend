import "@4tw/cypress-drag-drop";

describe("Página de Kanban", () => {
  beforeEach(() => {

    cy.fixture("token").then((token) => {
      console.log(token);
      cy.intercept("POST", "http://137.184.81.207:9000/login", {
        statusCode: 200,
        body: {
          token: token.token
        }
      });

      cy.intercept("GET", "http://137.184.81.207:9000/kanban", {
        statusCode: 200,
        body: []
      }).as("getKanban");

      localStorage.setItem("token", token.token);
      cy.visit("http://137.184.81.207:3000/kanban");

      // cy.wait("@getKanban");s  
    })

  });

  Cypress.Commands.add('dragTo', {prevSubject: 'element'}, (subject, targetEl) => {
    cy.wrap(subject).trigger('mousedown', {which: 1});
    cy.get(targetEl).trigger('mousemove').trigger('mouseup', {force: true});
  });
  
  
  it("Deve arrastar e soltar um cartão no Kanban", () => {
    // Adicione os comandos do Cypress para interagir com o Kanban aqui
    // Por exemplo, selecione um cartão, arraste-o e solte-o em uma coluna diferente
    // Use comandos como cy.get(), cy.drag(), etc.

    // Exemplo fictício:
    cy.get(".smooth-dnd-container vertical").first().dragTo(".react-trello-lane");
    // Certifique-se de substituir ".card-selector" e ".target-lane-selector" pelos seletores corretos do seu aplicativo.
    
    // Verifique se a ação foi bem-sucedida
    cy.get(".react-trello-lane").should("have.length", 1); // Verifique se há 1 cartão na coluna de destino.
  });
});
