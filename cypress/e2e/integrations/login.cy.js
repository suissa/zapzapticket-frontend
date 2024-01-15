//  FUNCIONANDO
// describe("Página de Login", () => {
//   it("deve logar com sucesso", () => {
//     cy.visit("http://localhost:3000/login");
//     cy.get("input[type=\"email\"]").type("a@a.com");
//     cy.get("input[type=\"password\"]").type("a");
//     cy.get("button").contains("Entrar").click();
//     cy.url().should("include", "/");

//     // Verificar se o token existe apenas após redirecionar para a página '/'
//     cy.window().then((window) => {
//       // Aguarde até que o token exista no localStorage
//       cy.wrap(null, { timeout: 10000 }).should(() => {
//         const token = window.localStorage.getItem('token');
//         expect(token).to.exist;
//         // Realize outras verificações conforme necessário, por exemplo, se o token possui um formato específico
//       });
//     });
//   });
// });
describe("Página de Login", () => {
  it("deve logar com sucesso", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[type='email']").type("a@a.com");
    cy.get("input[type='password']").type("a");
    cy.get("button").contains("Entrar").click();
    cy.url().should("include", "/");

    // Função para aguardar o token estar disponível
    const waitForToken = () => {
      return new Cypress.Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 20; // Número máximo de tentativas

        const checkToken = () => {
          console.log("cy.window");
          cy.window().then((window) => {
            console.log("cy.window");
            const token = window.localStorage.getItem('token');
            console.log("token", token);
            if (token) {
              console.log("resolve token", token);
              resolve(token);
            } else if (attempts < maxAttempts) {
              attempts++;
              console.log("resolve attempts", attempts);
              setTimeout(checkToken, 1000); // Verifica novamente após 1 segundo
            } else {
              reject(new Error("Token não encontrado após várias tentativas"));
            }
          });
        };
        checkToken();
      });
    };

    // Aguarde o token e então escreva no arquivo
    waitForToken().then((token) => {
      console.log("cy.writeFile", token);
      cy.writeFile('cypress/fixtures/token.json', { token: token });
    }).catch((error) => {
      // Tratar erro se o token não for encontrado
      console.error(error);
    });

  });
});


// describe("Página de Login", () => {
//   it("deve logar com sucesso", () => {
//     cy.visit("http://localhost:3000/login");
//     cy.get("input[type='email']").type("a@a.com");
//     cy.get("input[type='password']").type("a");
//     cy.get("button").contains("Entrar").click();
//     cy.url().should("include", "/");

//     // Função para aguardar o token estar disponível
//     const waitForToken = () => {
//       return new Cypress.Promise((resolve, reject) => {
//         let attempts = 0;
//         const maxAttempts = 20; // Número máximo de tentativas

//         const checkToken = () => {
//           console.log("checkToken");
//           cy.window().then((window) => {
//             console.log("cy.window then");
//             const token = window.localStorage.getItem('token');
//             console.log("cy.window then token", token);
//             if (token) {
//               console.log("cy.window then token if resolve", token);
//               resolve(token);
//             } else if (attempts < maxAttempts) {
//               console.log("cy.window then else if", attempts);
//               attempts++;
//               setTimeout(checkToken, 1000); // Verifica novamente após 1 segundo
//             } else {
//               reject(new Error("Token não encontrado após várias tentativas"));
//             }
//           });
//         };
//         checkToken();
//       });
//     };

//     // Aguarde o token e então escreva no arquivo
//     waitForToken().then((token) => {
//       console.log("cy.writeFile", token);
//       cy.writeFile('cypress/fixtures/token.json', { token: token });
//     }).catch((error) => {
//       // Tratar erro se o token não for encontrado
//       console.error(error);
//     });

//   });
// });
