import { useState, MutableRefObject, useRef, useEffect } from "react"
import Message from "../core/Message"
import { IconEdit, IconThrash } from "./Icons"

interface TableProps {
  messages: Message[]
  messageSelected?: (message: Message) => void
  messageDeleted?: (message: Message) => void
}

const API_URL = "http://localhost:9000";

export default function Table({ messages, messageSelected, messageDeleted }: TableProps) {

  const showActions = messageSelected || messageDeleted
  const [checked, setChecked] = useState(false);
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);

  const confirmAndDeleteMessage = (user) => {
    setCurrentMessage(user);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (currentMessage) {
      messageDeleted?.(currentMessage);
      console.log("Usuário excluído:", currentMessage);
    }
    setIsModalOpen(false);
  };
  const handleCheckboxChange = async (isActive, _id) => {
    console.log("handleCheckboxChange isActive:", isActive);
    // tirar implementacao daqui
    if (!isActive) {
      console.log(_id)
      const result = await fetch(`${API_URL}/messages/${_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const messageAPI = await result.json();
      console.log(messageAPI)

      const instanceName = messageAPI.title.replace(" ", "_") + "-" + messageAPI.text;
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
      const messageSAVED = await resultUpdate.json();
      console.log(messageSAVED)
      setQrCodeBase64(messageSAVED.qrcode.base64);
    }
  };

  const Modal = ({ onClose, onConfirm, message }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <p>Tem certeza que deseja excluir a mensagem {message?.title}?</p>
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

  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-4">Título</th>
        <th className="text-left p-4">Texto</th>
        <th className="text-center p-4">Ativo</th>
        {showActions ? <th className="p-4">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    return messages?.map((message, i) => {
      return (
        <tr key={message._id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          <td className="text-left p-4">{message.title}</td>
          <td className="text-left p-4">{message.text}</td>
          <td className="text-center p-4">
            <label>
              <input
                type="checkbox"
                checked={message.isActive ? true : false}
                onChange={() => handleCheckboxChange(message.isActive, message._id)}
              // onChange={handleCheckboxChange}
              />
            </label></td>
          {showActions ? renderActions(message) : false}
        </tr>
      )
    })
  }

  function renderActions(message: Message) {
    return (
      <td className="flex justify-center">
        {messageSelected ? (
          <button onClick={() => messageSelected?.(message)} className={`
                    flex justify-right items-right
                    text-green-600 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconEdit}
          </button>
        ) : false}
        {messageDeleted ? (
          <button onClick={() => confirmAndDeleteMessage(message)} className={`
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
        <Modal 
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          message={currentMessage}
        />
      )}
    </div>
  )
}