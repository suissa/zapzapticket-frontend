import React from 'react';
import Link from "next/link";

const Menu: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-500 to-purple-800 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <Link href="/users">Usuários</Link>
        </li>
        <li>
          <Link href="/contacts">Contatos</Link>
        </li>
        <li>
          <Link href="/messages">Mensagens</Link>
        </li>
        <li>
          <Link href="/">Conexões</Link>
        </li>
        <li>
          <Link href="/send">Enviar</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;