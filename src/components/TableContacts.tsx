import { useState, MutableRefObject, useRef, useEffect } from "react"
import Contact from "../core/Contact"
import Button from "../components/Button"
import Form from "../components/FormContact"
import { IconEdit, IconThrash } from "./Icons"
import styled from 'styled-components';

const CursorPointerCheckbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
`;
interface TableProps {
  contacts: Contact[]
  contact: Contact
  contactSelected?: (contact: Contact) => void
  contactDeleted?: (contact: Contact) => void
  contactModified?: (contact: Contact) => void
  canceled?: () => void
  showCheckboxes?: boolean
  showActions?: boolean
}

const API_URL = "http://localhost:9000";

export default function Table({ contacts, contactSelected, contactDeleted, contactModified, showCheckboxes = false, showActions = true, canceled, contact }: TableProps) {

  // const showActions = contactSelected || contactDeleted
  const [checked, setChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  const Modal = ({ onClose, onConfirm, contact }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <p>Tem certeza que deseja excluir o usuário {contact?.name}?</p>
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

  const ModalUpdate = ({ onClose, onConfirm, contact }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="flex flex-col w-2/3 rounded-md p-4
            bg-white text-gray-800">
          {isFormOpen ? (
            <Form
              contact={currentContact}
              contactModified={(contact) => {
                // Lógica para tratar o usuário modificado
                console.log("Usuário modificado:", contact);

                // Atualizar o objeto ContactObj com os estados atuais
                const ContactObj = new Contact(
                  contact._id,
                  contact.name,
                  contact.phone,
                  contact.status,
                  contact.city,
                  contact.state,
                  contact.country,
                );

                contactModified?.(ContactObj);
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

  const handleContactCheckboxChange = async (contact) => {
    console.log("handleContactCheckboxChange contact:", contact);
  };

  // const confirmAndDeleteContact = (contact) => {
  //   // Confirmação de exclusão
  //   if (window.confirm(`Tem certeza que deseja excluir o usuário ${contact.name}?`)) {
  //     contactDeleted?.(contact);
  //     console.log("confirmAndDeleteContact: ", contact)
  //   }
  // }
  const openFormWithContact = (contact) => {
    setCurrentContact(contact);
    setIsFormOpen(true);
  };

  const confirmAndDeleteContact = (contact) => {
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (currentContact) {
      contactSelected?.(currentContact);
      console.log("Usuário atualizado:", currentContact);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (currentContact) {
      contactDeleted?.(currentContact);
      console.log("Usuário excluído:", currentContact);
    }
    setIsModalOpen(false);
  };

  function renderHeader() {
    return (
      <tr>
        {showCheckboxes && <th className="text-center p-4 w-1/10">Selecionar</th>}
        <th className="text-left p-4 w-1/6">Nome</th>
        <th className="text-left p-4 w-1/6">Telefone</th>
        <th className="text-left p-4 w-1/8">Status</th>
        {showActions ? <th className="p-4 w-1/8">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    // console.log("renderData: ", contacts)
    return contacts?.map((contact, i) => {
      return (
        <tr key={contact._id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          {showCheckboxes && (
            <td className="text-center p-4 w-1/10">
              <CursorPointerCheckbox
                  type="checkbox"
                  className="cursorPointer"
                  checked={false}
                  onChange={() => handleContactCheckboxChange(contact)}
              />
            </td>
          )}
          <td className="text-left p-4 w-1/6">{contact.name}</td>
          <td className="text-left p-4 w-1/6">{contact.phone}</td>
          <td className="text-left p-4 w-1/8">{contact.status}</td>
          {showActions ? renderActions(contact) : false}
        </tr>
      )
    })
  }

  function renderActions(contact: Contact) {
    return (
      <td className="flex justify-right w-1/8 pl-10">
        {contactSelected ? (
          <button onClick={() => openFormWithContact(contact)} className={`
            flex justify-right items-right
            text-green-600 rounded-md p-0 mt-4
            hover:bg-purple-50
          `}>
            {IconEdit}
          </button>
        ) : false}
        {contactDeleted ? (
          // <button onClick={() => contactDeleted?.(contact)} className={`
          <button onClick={() => confirmAndDeleteContact(contact)} className={`
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
          contact={currentContact}
        />
      )}
      {isFormOpen && (
        <ModalUpdate
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          contact={currentContact}
        />
      )}
    </div>
  )
}