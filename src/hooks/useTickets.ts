import { useState, MutableRefObject, useRef, useEffect, useCallback } from "react"
import { Contact } from "../core/Contact"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"
import io from "socket.io-client";

const socket = io("http://localhost:9000");
const API_URL = "http://localhost:9000";

export default function useTickets(selectedContact, setSelectedContact) {
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

  function updateContactMessages(newMessage) {
    const _newMessage = { text: newMessage.message, type: "sent", typeMessage: "text" };
    console.log("updateContactMessages contacts", contacts);
    console.log("updateContactMessages _newMessage", _newMessage);
    setContacts(currentContacts => currentContacts.map(contact => {
      // console.log("updateContactMessages contact", contact);
      // console.log("updateContactMessages contact.phone", contact.phone);
      // console.log("updateContactMessages _newMessage.phone", _newMessage.phone);
      // console.log("updateContactMessages contact.phone === _newMessage.phone", contact.phone === _newMessage.phone);
      if (contact.phone === _newMessage.phone) {
        const newMessages = { ...contact, messages: [...contact.messages, _newMessage] };
        console.log("updateContactMessages newMessages", newMessages);
        return newMessages;
      }
      return contact;
    }));
  
    console.log("updateContactMessages selectedContact", selectedContact);
    if (selectedContact && selectedContact?.phone === newMessage.phone) {
      console.log("achou updateContactMessages selectedContact", selectedContact);
      console.log("achou updateContactMessages selected _newMessage", _newMessage);
      setSelectedContact(currentSelectedContact => {
        console.log("updateContactMessages currentSelectedContact", currentSelectedContact);
        const result = { ...currentSelectedContact, messages: [...currentSelectedContact?.messages, _newMessage] };
        console.log("achou updateContactMessages result", result);
        return result;
      });
    }
  }

  const handleMessageReceived = (request) => {
    console.log("message:chat:receive adicionar na lista:", request);
    const remoteJid = request.data.key.remoteJid.replace("@s.whatsapp.net", "");
    const newMessage = {
      phone: remoteJid,
      message: request.data?.message?.conversation,
    }
    updateContactMessages(newMessage);
  };

  useEffect(() => {
    contactsRef.current = contacts;
  }, [contacts]);

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
    updateContactMessages,
    tableVisible
  }
}