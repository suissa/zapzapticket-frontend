describe("Teste do Kanban com Cypress", () => {
  beforeEach(() => {
    // Antes de cada teste, você pode realizar configurações iniciais, como visitar a página.
    cy.visit("http://www.zapzapticket.online:3000/kanban"); // Certifique-se de ajustar o URL conforme necessário.
    Cypress.Commands.add('dragTo', {prevSubject: 'element'}, (subject, targetEl) => {
      cy.wrap(subject).trigger('mousedown', {which: 1});
      cy.get(targetEl).trigger('mousemove').trigger('mouseup', {force: true});
    });
    
  });

  it("Deve arrastar e soltar um cartão no Kanban", () => {

    // Exemplo fictício:
    cy.get(".smooth-dnd-draggable-wrapper article header > span").first().dragTo(".react-trello-lane");
    cy.get(".react-trello-lane").should("have.length", 1);
  });
});