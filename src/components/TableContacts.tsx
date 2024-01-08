import { useState, MutableRefObject, useRef, useEffect } from "react"
import { Contact } from "../core/Contact"
import Button from "../components/Button"
import Form from "../components/FormContact"
import { IconEdit, IconThrash } from "./Icons"
import styled from 'styled-components';

interface TableProps {
  contacts: Contact[]
  contact: Contact
  contactSelected?: (contact: Contact) => void
  contactDeleted?: (contact: Contact) => void
  contactModified?: (contact: Contact) => void
  canceled?: () => void
  showCheckboxes?: boolean
  showActions?: boolean
  onSelectionChange?: (selectedIds: string[]) => void;
}

const CursorPointerCheckbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
`;
const API_URL = "http://137.184.81.207:9000";

export default function Table({
  contacts, contactSelected, contactDeleted, showCheckboxes, showActions = true, onSelectionChange 
}: TableProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const confirmAndDelete = (user) => {
    setCurrentContact(user);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (currentContact) {
      contactDeleted?.(currentContact);
      console.log("Mensagem excluída:", currentContact);
    }
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (contact) => {
    if (selectedContact && selectedContact._id === contact._id) {
      // Desmarcar se já está selecionada
      setSelectedContact(null);
    } else {
      // Selecionar a nova mensagem
      setSelectedContact(contact);
    }
    // Chamar onSelectionChange com o texto da mensagem
    onSelectionChange?.(contact.text);
  };
  

  const Modal = ({ onClose, onConfirm, contact }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <p>Tem certeza que deseja excluir a mensagem {contact?.title}?</p>
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
        {showCheckboxes && <th className="text-center p-4 w-1/10">Selecionar</th>}
        <th className="text-left p-4 w-1/4">Nome</th>
        <th className="text-left p-4">Telefone</th>
        {showActions ? <th className="p-4 w-1/8">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    return contacts?.map((contact, i) => {
      return (
        <tr key={contact._id} className={`text-black ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          {showCheckboxes && (
            <td className="text-center p-4 w-1/10">
              <CursorPointerCheckbox
                  type="checkbox"
                  className="cursorPointer"
                  checked={selectedContact?._id === contact._id}
                  onChange={() => handleCheckboxChange(contact)}
              />
            </td>
          )}
          <td className="text-left p-4">{contact.name}</td>
          <td className="text-left p-4">{contact.phone}</td>
          {showActions ? renderActions(contact) : false}
        </tr>
      )
    })
  }

  function renderActions(contact: Contact) {
    return (
      <td className="flex justify-center">
        {contactSelected ? (
          <button onClick={() => contactSelected?.(contact)} className={`
                    flex justify-right items-right
                    text-green-600 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconEdit}
          </button>
        ) : false}
        {contactDeleted ? (
          <button onClick={() => confirmAndDelete(contact)} className={`
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
    <div className="h-70vh">
      <table className="w-full rounded-md overflow">
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
          contact={currentContact}
        />
      )}
    </div>
  )
}