import React, { useState } from "react";
import Button from "../components/Button";
import EntryInput from "../components/EntryInput";
import useAuth from "../hooks/useAuth";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para autenticação
    console.log("handleSubmit:", { email, password });
    const response = await login({email, password})
    const data = await response.json()
    if (response.ok) {
      // Armazena o token no localStorage
      localStorage.setItem('token', data.token.access_token);
      // Redirecionar para a página inicial
      window.location.href = '/';
    } else {
      // Lidar com erros de login
      console.error('Falha no login:', data.message);
    }
  };

  return (
    <div className="bg flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-glass p-6 max-w-sm w-full bg-white shadow-md rounded">
        <h1 className="text-xl font-semibold mb-4 text-white">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">

            <EntryInput
              text="Email"
              type="email"
              value={email}
              onChange={e => setEmail((e.target as HTMLInputElement).value)}
              className="mb-4 text-white"
            />
            {/* <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> */}
          </div>
          <div className="mb-6">
            <EntryInput
              text="Senha"
              type="password"
              value={password}
              onChange={e => setPassword((e.target as HTMLInputElement).value)}
              className="mb-4 text-white"
            />
            {/* <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}
          </div>

          <Button
            className="mb-4 w-full"
            onClick={handleSubmit}
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
