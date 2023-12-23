import { useState, MutableRefObject, useRef, useEffect } from "react"
import User from "../core/User"
import { IconEdit, IconThrash } from "./Icons"

interface TableProps {
  users: User[]
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
    // tirar implementacao daqui
    if(!isActive){
      console.log(_id)
      const result = await fetch(`${API_URL}/users/${_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const userAPI = await result.json();
      console.log(userAPI)

      const instanceName = userAPI.title.replace(" ", "_") + "-" + userAPI.text;
      console.log(instanceName)
      const data = {
        instanceName: instanceName,
        token: "tokenMaroto_872983_" + Date.now(),
        qrcode: true
      }
      const resultUpdate = await fetch(`${API_URL}/evolution/instances`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const userSAVED = await resultUpdate.json();
      console.log(userSAVED)
      setQrCodeBase64(userSAVED.qrcode.base64);
    }
  };

  const Modal = ({ onClose, children }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          {children}
          <button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    );
  };

  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-4">Id</th>
        <th className="text-left p-4">Título</th>
        <th className="text-left p-4">Texto</th>
        <th className="text-left p-4">Ativo</th>
        {showActions ? <th className="p-4">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    return users?.map((user, i) => {
      return (
        <tr key={user._id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          <td className="text-left p-4">{user._id}</td>
          <td className="text-left p-4">{user.title}</td>
          <td className="text-left p-4">{user.text}</td>
          <td className="text-left p-4">
            <label>
                <input
                  type="checkbox"
                  checked={user.isActive ? true : false}
                  onChange={() => handleCheckboxChange(user.isActive, user._id)}
                  // onChange={handleCheckboxChange}
                  />
              </label></td>
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
                    flex justify-center items-center
                    text-green-600 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconEdit}
          </button>
        ) : false}
        {userDeleted ? (
          <button onClick={() => userDeleted?.(user)} className={`
                    flex justify-center items-center
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
      {qrCodeBase64 && (
        <img src={`${qrCodeBase64}`} alt="QR Code" />
      )}

    <table className="w-full rounded-xl overflow-hidden">
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
        <Modal onClose={() => setIsModalOpen(false)}>
          {/* Conteúdo do modal, como informações ou confirmação */}
          <p>Conteúdo do modal vai aqui</p>
        </Modal>
      )}
    </div>
  )
}