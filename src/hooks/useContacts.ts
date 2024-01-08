import { useState, MutableRefObject, useRef, useEffect } from "react"
import { Contact } from "../core/Contact"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"
import { API_URL } from "../config"
// const API_URL = "http://137.184.81.207:9000/contacts";

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

  async function saveContact(contact: Partial<Contact>) {
    console.log("saveContact contact", contact)
    console.log("status: ", contact.status)
    const newContact = Contact.empty()
    const contactStr = newContact?._id
      ? JSON.stringify({
        _id: newContact._id,
        name: newContact.name,
        phone: newContact.phone,
        status: newContact.status,
        city: newContact.city,
        state: newContact.state,
        country: newContact.country,
      })
      : JSON.stringify({
        name: newContact.name,
        phone: newContact.phone,
        status: newContact.status,
        city: newContact.city,
        state: newContact.state,
        country: newContact.country,
      })
    console.log("saveContact newContactStr", newContactStr)
    const response = newContact?._id
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