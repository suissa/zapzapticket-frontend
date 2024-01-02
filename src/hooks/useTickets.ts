import { useState, MutableRefObject, useRef, useEffect, useCallback } from "react"
import { Contact } from "../core/Contact"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"
import io from "socket.io-client";

const socket = io("http://localhost:9000");
const API_URL = "http://localhost:9000";

export default function useTickets() {
  const [contact, setContact] = useState<Contact>(Contact.empty())
  const [contacts, setContacts] = useState<Contact[]>([])
  const { showForm, showTable, tableVisible } = useLayout()
  const contactsRef = useRef(contacts);

  const handleConnect = () => console.log("Conectado ao servidor Socket.io", new Date());
  const handleMessage = (data) => console.log("Dados recebidos:", data);
  const handleMessageSent = (phone) => {
    console.log("message:sent eliminar da lista:", phone);

  };
  const handleMessageReceived = (phone) => {
    console.log("message:sent eliminar da lista:", phone);

  };

  useEffect(() => {
    socket.on("connect", handleConnect);
    socket.on("message", handleMessage);
    socket.on("message:chat:send", handleMessageReceived);
    socket.on("message:chat:receive", handleMessageReceived);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("message", handleMessage);
      socket.off("message:chat:send", handleMessageReceived);
      socket.off("message:chat:receive", handleMessageReceived);
      // socket.disconnect();
    };
  }, []);

  function createContact() {
    setContact(Contact.empty())
    showForm()
  }

  function sendMessage(data) {
    const { message, phone, instanceName } = data;
    console.log("sendMessage data", data);

    // fetch(`${API_URL}/contacts/messages/send`, {
  }

  const listContacts = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/contacts/messages/all`);
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