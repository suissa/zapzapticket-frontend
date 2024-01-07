import { useState, MutableRefObject, useRef, useEffect } from "react"
import { Contact } from "../core/Contact"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"
// import { API_URL } from "../config"
// const API_URL = "http://137.184.81.207:9000"
const API_URL = "http://localhost:9000"
export default function useContacts() {
  const [contact, setContact] = useState<Contact>(Contact.empty())
  const [contacts, setContacts] = useState<Contact[]>([])
  const { showForm, showTable, tableVisible } = useLayout()

  useEffect(listContacts, [])

  function createContact() {
    setContact(Contact.empty())
    showForm()
  }

  function listContacts() {

    fetch(`${API_URL}/contacts`)
      .then(response => response.json())
      .then(data => {
        console.log("listContacts then", data)
        return setContacts(data)
      })
  }

  function getContact(contact: Contact) {
    setContact(contact)
    showForm()
  }

  async function deleteContact(contact: Contact) {
    fetch(`${API_URL}/contacts/${contact._id}`, {
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
      ? await fetch(`${API_URL}/contacts/${contact._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: contactStr
      })
      : await fetch(`${API_URL}/contacts`, {
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

  return {
    contact,
    contacts,
    createContact,
    saveContact,
    deleteContact,
    getContact,
    listContacts,
    showTable,
    tableVisible
  }
}