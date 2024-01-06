import { useState, MutableRefObject, useRef, useEffect } from "react"
import User from "../core/User"
import { IconEdit, IconThrash } from "./Icons"
import styled from 'styled-components';

interface TableProps {
  users: User[]
  userSelected?: (user: User) => void
  userDeleted?: (user: User) => void
  showCheckboxes?: boolean
  showActions?: boolean
  onSelectionChange?: (selectedIds: string[]) => void;
}

const CursorPointerCheckbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
`;
const API_URL = "http://137.184.81.207:9000";

export default function Table({
  users, userSelected, userDeleted, showCheckboxes, showActions = true, onSelectionChange 
}: TableProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const confirmAndDelete = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (currentUser) {
      userDeleted?.(currentUser);
      console.log("Usuário excluído:", currentUser);
    }
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (user) => {
    if (selectedUser && selectedUser._id === user._id) {
      // Desmarcar se já está selecionada
      setSelectedUser(null);
    } else {
      // Selecionar a nova mensagem
      setSelectedUser(user);
    }
    // Chamar onSelectionChange com o texto da mensagem
    onSelectionChange?.(user.text);
  };
  

  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-4 w-1/6">Nome</th>
        <th className="text-left p-4 w-1/6">Telefone</th>
        <th className="text-left p-4 w-1/8">Nível</th>
        <th className="text-center p-4 w-1/10">Ativo</th>
        <th className="text-center p-0 w-1/10">Conectado</th>
        <th className="text-center p-4 w-1/8">Ações</th>
      </tr>
    )
  }

  function renderData() {
    // console.log("renderData: ", users)
    return users?.map((user, i) => {
      return (
        <tr key={user._id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          <td className="text-left p-4 w-1/6">{user.name}</td>
          <td className="text-left p-4 w-1/6">{user.phone}</td>
          <td className="text-left p-4 w-1/8">{user.level}</td>
          <td className="text-center p-4 w-1/10">
            <label>
                <CursorPointerCheckbox
                  type="checkbox"
                  className="cursorPointer"
                  checked={user.isActive ? true : false}
                  onChange={() => handleCheckboxChange(user.isActive, user)}
                  // onChange={handleCheckboxChange}
                  />
            </label>
          </td>
          {/* <td className="text-left p-4">{user.isConnected}</td> */}
          <td className="text-center p-4 w-1/10">
            <label>
                <input
                  type="checkbox"
                  checked={user.isConnected ? true : false}
                  onChange={() => handleCheckboxChange(user.isActive, user._id)}
                  // onChange={handleCheckboxChange}
                  />
            </label>
          </td>
          {showActions ? renderActions(user) : false}
        </tr>
      )
    })
  }

  function renderActions(user: User) {
    return (
      <td className="flex justify-center">
        {userSelected ? (
          <button onClick={() => userSelected?.(user)} className={`
                    flex justify-right items-right
                    text-green-600 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconEdit}
          </button>
        ) : false}
        {userDeleted ? (
          <button onClick={() => confirmAndDelete(user)} className={`
                    flex justify-right items-right
                    text-red-500 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconThrash}
          </button>
        ) : false}
      </td>
    )
  }

  return (
    <div>
      <table className="w-full rounded-md overflow-hidden">
        <thead className={`
          text-gray-100
          bg-gradient-to-r from-purple-500 to-purple-800
      `}>
          {renderHeader()}
        </thead>
        <tbody>
          {renderData()}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal 
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          user={currentUser}
        />
      )}
    </div>
  )
}