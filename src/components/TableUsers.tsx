import { useState, MutableRefObject, useRef, useEffect } from "react"
import User from "../core/User"
import { IconEdit, IconThrash } from "./Icons"

interface TableProps {
  users: User[]
  user: User
  userSelected?: (user: User) => void
  userDeleted?: (user: User) => void
}

const API_URL = "http://localhost:9000";

export default function Table({ users, userSelected, userDeleted }: TableProps) {

  const showActions = userSelected || userDeleted
  const [checked, setChecked] = useState(false);
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckboxChange = async (isActive, _id) => {
    console.log("handleCheckboxChange isActive:", isActive);

  };

  const confirmAndDeleteUser = (user) => {
    // Confirmação de exclusão
    if (window.confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`)) {
      userDeleted?.(user);
      console.log("confirmAndDeleteUser: ", user)
    }
  }

  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-4 w-1/6">Nome</th>
        <th className="text-left p-4 w-1/6">Telefone</th>
        <th className="text-left p-4 w-1/8">Status</th>
        <th className="text-left p-4 w-1/8">Nível</th>
        <th className="text-left p-4 w-1/10">Ativo</th>
        <th className="text-left p-0 w-1/10">Conectado</th>
        <th className="text-right p-4 w-1/8">Ações</th>
      </tr>
    )
  }

  function renderData() {
    console.log("renderData: ", users)
    return users?.map((user, i) => {
      return (
        <tr key={user._id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          <td className="text-left p-4 w-1/6">{user.name}</td>
          <td className="text-left p-4 w-1/6">{user.phone}</td>
          <td className="text-left p-4 w-1/8">{user.status}</td>
          <td className="text-left p-4 w-1/8">{user.level}</td>
          <td className="text-center p-4 w-1/10">
            <label>
                <input
                  type="checkbox"
                  checked={user.isActive ? true : false}
                  onChange={() => handleCheckboxChange(user.isActive, user._id)}
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
      <td className="flex justify-right w-1/8 pl-10">
        {userSelected ? (
          <button onClick={() => userSelected?.(user)} className={`
            flex justify-right items-right
            text-green-600 rounded-md p-0 mt-4
            hover:bg-purple-50
          `}>
            {IconEdit}
          </button>
        ) : false}
        {userDeleted ? (
          // <button onClick={() => userDeleted?.(user)} className={`
          <button onClick={() => confirmAndDeleteUser(user)} className={`
            flex justify-right items-right
            text-red-500 rounded-md p-0 mt-4 ml-2
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
      <table className="w-full rounded-xl overflow-hidden table-fixed">
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
    </div>
  )
}