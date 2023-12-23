import React from 'react';

const Menu: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <a href="/users">Usuários</a>
        </li>
        <li>
          <a href="/messages">Mensagens</a>
        </li>
        <li>
          <a href="/">Conexões</a>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
