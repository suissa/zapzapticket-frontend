import { useState, MutableRefObject, useRef, useEffect } from "react"
import Message from "../core/Message"
import { IconEdit, IconThrash } from "./Icons"
import styled from 'styled-components';

interface TableProps {
  messages: Message[]
  messageSelected?: (message: Message) => void
  messageDeleted?: (message: Message) => void
  showCheckboxes?: boolean
  showActions?: boolean
  onSelectionChange?: (selectedIds: string[]) => void;
}

const CursorPointerCheckbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
`;
const API_URL = "http://localhost:9000";

export default function Table({
  messages, messageSelected, messageDeleted, showCheckboxes, showActions = true, onSelectionChange 
}: TableProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const confirmAndDelete = (user) => {
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

  const handleCheckboxChange = (message) => {
    if (selectedMessage && selectedMessage._id === message._id) {
      // Desmarcar se já está selecionada
      setSelectedMessage(null);
    } else {
      // Selecionar a nova mensagem
      setSelectedMessage(message);
    }
    // Chamar onSelectionChange com o texto da mensagem
    onSelectionChange?.(message.text);
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
        {showCheckboxes && <th className="text-center p-4">Selecionar</th>}
        <th className="text-left p-4 w-1/4">Título</th>
        <th className="text-left p-4">Texto</th>
        {showActions ? <th className="p-4 w-1/8">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    return messages?.map((message, i) => {
      return (
        <tr key={message._id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          {showCheckboxes && (
            <td className="text-center p-4 w-1/10">
              <CursorPointerCheckbox
                  type="checkbox"
                  className="cursorPointer"
                  checked={selectedMessage?._id === message._id}
                  onChange={() => handleCheckboxChange(message)}
              />
            </td>
          )}
          <td className="text-left p-4">{message.title}</td>
          <td className="text-left p-4">{message.text}</td>
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
          <button onClick={() => confirmAndDelete(message)} className={`
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