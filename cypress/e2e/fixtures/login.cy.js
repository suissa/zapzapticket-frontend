describe('Página de Login', () => {
  it('deve logar com sucesso', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="email"]').type('a@a.com');
    cy.get('input[type="password"]').type('a');
    cy.get('button').contains('Entrar').click();
    cy.url().should('include', '/');
  });
});
