import { useState, createContext, useRef, useEffect, useCallback } from "react"
import { Contact } from "../core/Contact"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"
import io from "socket.io-client";

const socket = io("http://localhost:9000");
const API_URL = "http://localhost:9000";

export default function useTickets() {
  const [contact, setContact] = useState<Contact>(Contact.empty())
  const [contacts, setContacts] = useState<Contact[]>([])
  // const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const { showForm, showTable, tableVisible } = useLayout()
  const contactsRef = useRef(contacts);

  const handleConnect = () => console.log("Conectado ao servidor Socket.io", new Date());
  const handleMessage = (data) => console.log("Dados recebidos:", data);
  const handleMessageSent = (phone) => {
    console.log("message:chat:send eliminar da lista:", phone);

  };


  function createContact() {
    setContact(Contact.empty())
    showForm()
  }

  function sendMessage(data) {
    const { message, phone, instanceName } = data;
    console.log("sendMessage data", data);

    if (!message) {
      console.error("Error sending message: message is empty");
      return;
    }
    if (!phone) {
      console.error("Error sending phone: phone is empty");
      return;
    }
    if (!instanceName) {
      console.error("Error sending instanceName: instanceName is empty");
      return;
    }
    fetch(`${API_URL}/contacts/message/send`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message, phone, instanceName }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("then sendMessage data", data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  }

  const listContacts = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/contacts/messages/last/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setContacts(data);
      console.log("listContacts data", data);
      return data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
      return [];
      // throw error;
    }
  }, []);

  return {
    sendMessage,
    contact,
    contacts,
    createContact,
    listContacts,
    showTable,
    tableVisible
  }
}