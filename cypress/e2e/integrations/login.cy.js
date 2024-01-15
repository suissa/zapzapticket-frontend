describe("Página de Login", () => {
  it("deve logar com sucesso", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[type=\"email\"]").type("a@a.com");
    cy.get("input[type=\"password\"]").type("a");
    cy.get("button").contains("Entrar").click();
    cy.url().should("include", "/");

    // Verificar se o token existe apenas após redirecionar para a página '/'
    cy.window().then((window) => {
      // Aguarde até que o token exista no localStorage
      cy.wrap(null, { timeout: 10000 }).should(() => {
        const token = window.localStorage.getItem('token');
        expect(token).to.exist;
        // Realize outras verificações conforme necessário, por exemplo, se o token possui um formato específico
      });
    });
  });
});

// describe("Página de Login", () => {
//   it("deve logar com sucesso e acessar páginas protegidas", () => {
//     // Suponha que você tenha um endpoint de login no seu aplicativo.
//     cy.request("POST", "localhost:9000/auth/login/", {
//       email: "a@a.com",
//       senha: "a",
//     }).then((response) => {
//       // Verifique se a solicitação de login foi bem-sucedida (status code 200, por exemplo).
//       expect(response.status).to.equal(200);

//       // Verifique se o token JWT é retornado na resposta.
//       expect(response.body).to.have.property("access_token");

//       // Guarde o token JWT para usar em futuras solicitações.
//       const token = response.body.access_token;

//       // Realize qualquer ação adicional necessária, como navegar para uma página protegida.
//       // Por exemplo:
//       // cy.visit("/pagina-protegida", { headers: { Authorization: `Bearer ${token}` } });

//       // Agora você pode realizar testes nas páginas protegidas usando o token JWT.
//       // Certifique-se de incluir o token JWT nos cabeçalhos de suas solicitações para autenticar o acesso.
//     });
//   });
// });
