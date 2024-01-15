describe('Página de Login', () => {
  it('deve logar com sucesso', () => {
    cy.visit('http://localhost:3000/login');

    // Preenche o campo de e-mail
    cy.get('input[type="email"]').type('a@a.com');

    // Preenche o campo de senha
    cy.get('input[type="password"]').type('a');

    // Clica no botão de login
    cy.get('button').contains('Entrar').click();

    // Verifica se foi redirecionado para a página inicial após o login
    cy.url().should('include', '/');
  });

  // Adicione mais testes conforme necessário...
});
