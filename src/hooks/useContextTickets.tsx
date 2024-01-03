// ContactContext.tsx
import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:9000");

const defaultValue = {
  contacts: [],
  setContacts: () => {},
  selectedContact: null,
  setSelectedContact: () => {},
  listContacts: async () => {},
};

export const ContactContext = createContext(defaultValue);

export const ContactProvider = ({ children }) => {
  // Definindo o estado aqui
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const contactsRef = useRef(contacts);

  const handleConnect = () => console.log("Conectado ao servidor Socket.io", new Date());
  const handleMessage = (data) => console.log("Dados recebidos:", data);
  const handleMessageSent = (phone) => {
    console.log("message:chat:send eliminar da lista:", phone);

  };
  function updateContactMessages(newMessage) {
    const _newMessage = { text: newMessage.message, type: "sent", typeMessage: "text" };
    console.log("ContactProvider updateContactMessages contacts", contacts);
    console.log("ContactProvider updateContactMessages _newMessage", _newMessage);
    setContacts(currentContacts => currentContacts.map(contact => {
      if (contact.phone === newMessage.phone) {

        // console.log("ContactProvider updateContactMessages selectedContact", selectedContact);
        // if (selectedContact && selectedContact?.phone === newMessage.phone) {
          console.log("ContactProvider achou updateContactMessages contact", contact);
          console.log("ContactProvider achou updateContactMessages selected _newMessage", _newMessage);
        const newMessages = { ...contact, messages: [...contact.messages, _newMessage] };

        setSelectedContact(newMessages);
        // }
        console.log("ContactProvider updateContactMessages newMessages", newMessages);
        return newMessages;
      }
      return contact;
    }));
  
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
  // Exemplo de função que você pode definir
  const listContacts = useCallback(async () => {
    // Lógica para listar contatos
    // Por exemplo: setContacts(dataFetched);
  }, []);


  // Lógica para lidar com eventos do socket e outras funções...

  return (
    <ContactContext.Provider value={{ contacts, setContacts, selectedContact, setSelectedContact, listContacts }}>
      {children}
    </ContactContext.Provider>
  );
};
``
