import { useState, MutableRefObject, useRef, useEffect } from "react"
import User from "../core/User"
import Button from "../components/Button"
import Form from "../components/FormUser"
import { IconEdit, IconThrash } from "./Icons"

interface TableProps {
  users: User[]
  user: User
  userSelected?: (user: User) => void
  userDeleted?: (user: User) => void
  userModified?: (user: User) => void
  canceled?: () => void
}

const API_URL = "http://localhost:9000";

export default function Table({ users, userSelected, userDeleted, userModified, canceled }: TableProps) {

  const showActions = userSelected || userDeleted
  const [checked, setChecked] = useState(false);
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const Modal = ({ onClose, onConfirm, user }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <p>Tem certeza que deseja excluir o usuário {user?.name}?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              onClick={onConfirm}
            >
              Excluir
            </button>
            <button
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white
              px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ModalUpdate = ({ onClose, onConfirm, user }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="flex flex-col w-2/3 rounded-md p-4
            bg-white text-gray-800">
          {isFormOpen ? (
            <Form
              user={currentUser}
              userModified={(user) => {
                // Lógica para tratar o usuário modificado
                console.log("Usuário modificado:", user);

                // Atualizar o objeto UserObj com os estados atuais
                const UserObj = new User(
                  user._id,
                  user.name,
                  user.phone,
                  user.email,
                  user.status,
                  user.city,
                  user.state,
                  user.country,
                  user.level
                );

                userModified?.(UserObj);
                setIsFormOpen(false);
              }}
              canceled={() => setIsFormOpen(false)}
            />
          ) : (
            children
          )}
          {/* <button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Salvar
          </button>
          <button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Fechar
          </button> */}

        </div>
      </div>
    );
  };

  const handleCheckboxChange = async (isActive, _id) => {
    console.log("handleCheckboxChange isActive:", isActive);

  };

  // const confirmAndDeleteUser = (user) => {
  //   // Confirmação de exclusão
  //   if (window.confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`)) {
  //     userDeleted?.(user);
  //     console.log("confirmAndDeleteUser: ", user)
  //   }
  // }
  const openFormWithUser = (user) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  const confirmAndDeleteUser = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (currentUser) {
      userSelected?.(currentUser);
      console.log("Usuário atualizado:", currentUser);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (currentUser) {
      userDeleted?.(currentUser);
      console.log("Usuário excluído:", currentUser);
    }
    setIsModalOpen(false);
  };

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
    // console.log("renderData: ", users)
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
          <button onClick={() => openFormWithUser(user)} className={`
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
      {isModalOpen && (
        <Modal 
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          user={currentUser}
        />
      )}
      {isFormOpen && (
        <ModalUpdate
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          user={currentUser}
        />
      )}
    </div>
  )
}