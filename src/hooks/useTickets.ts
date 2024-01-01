import { useState, MutableRefObject, useRef, useEffect, useCallback } from "react"
import { Contact } from "../core/Contact"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"

const API_URL = "http://localhost:9000/contacts/messages/all";

export default function useContacts() {
  const [contact, setContact] = useState<Contact>(Contact.empty())
  const [contacts, setContacts] = useState<Contact[]>([])
  const { showForm, showTable, tableVisible } = useLayout()

  // useEffect(listContacts, [])

  function createContact() {
    setContact(Contact.empty())
    showForm()
  }

  const listContacts = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("listContacts data", data);
      return data; // Retorna os dados, em vez de definir o estado aqui
    } catch (error) {
      console.error("Error fetching contacts:", error);
      // Você pode optar por retornar um valor padrão ou lançar o erro novamente
      // return []; // para retornar um array vazio em caso de erro
      throw error; // para lançar o erro para ser tratado pelo chamador
    }
  }, [/* dependências aqui, se houver */]);


  function getContact(contact: Contact) {
    setContact(contact)
    showForm()
  }

  async function deleteContact(contact: Contact) {
    fetch(`${API_URL}/${contact._id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log("DELETE then", data)
        return listContacts()
      })
  }

  async function saveContact(contact: Contact) {
    console.log("saveContact contact", contact)
    console.log("status: ", contact.status)
    const contactStr = contact?._id
      ? JSON.stringify({
        _id: contact._id,
        name: contact.name,
        phone: contact.phone,
        status: contact.status,
        city: contact.city,
        state: contact.state,
        country: contact.country,
      })
      : JSON.stringify({
        name: contact.name,
        phone: contact.phone,
        status: contact.status,
        city: contact.city,
        state: contact.state,
        country: contact.country,
      })
    console.log("saveContact contactStr", contactStr)
    const response = contact?._id
      ? await fetch(`${API_URL}/${contact._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: contactStr
      })
      : await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: contactStr
      });

      showTable()
    // fetch(`${API_URL}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     // console.log("listContacts then", data)
    //     listContacts()
    //   })
    // const data = await response.json();
  }

  function criarContact() {
    setContact(Contact.empty())
    showForm()
  }


  return {
    contact,
    contacts,
    createContact,
    saveContact,
    criarContact,
    deleteContact,
    getContact,
    listContacts,
    listContacts,
    showTable,
    tableVisible
  }
}