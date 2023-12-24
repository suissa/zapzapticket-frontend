import { useState, MutableRefObject, useRef, useEffect } from "react"
import Contact from "../core/Contact"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"

const API_URL = "http://localhost:9000/contacts";

export default function useContacts() {
  const [contact, setContact] = useState<Contact>(Contact.empty())
  const [contacts, setContacts] = useState<Contact[]>([])
  const { showForm, showTable, tableVisible } = useLayout()

  useEffect(listAllContacts, [])

  function createContact() {
    setContact(Contact.empty())
    showForm()
  }

  function listContacts() {
    fetch(`${API_URL}`)
      .then(response => response.json())
      .then(data => {
        console.log("listContacts then", data)
        return setContacts(data)
      })
  }

  function listAllContacts() {
    fetch(`${API_URL}/all`)
      .then(response => response.json())
      .then(data => {
        // console.log("listContacts then", data)
        return setContacts(data)
      })
  }

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
        email: contact.email,
        phone: contact.phone,
        status: contact.status,
        city: contact.city,
        state: contact.state,
        country: contact.country,
        level: contact.level,
        isActive: contact.isActive
      })
      : JSON.stringify({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        status: contact.status,
        city: contact.city,
        state: contact.state,
        country: contact.country,
        level: contact.level,
        isActive: true
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

    fetch(`${API_URL}/all`)
      .then(response => response.json())
      .then(data => {
        // console.log("listContacts then", data)
        return setContacts(data)
      })
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
    listAllContacts,
    showTable,
    tableVisible
  }
}