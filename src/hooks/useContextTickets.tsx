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

  setInterval(() => {
    setContacts(currentContacts =>
      currentContacts
        .sort((a, b) => {
          const lastMessageA = new Date(a.messages[a.messages.length - 1].createdAt).getTime();
          const lastMessageB = new Date(b.messages[b.messages.length - 1].createdAt).getTime();
          return lastMessageB - lastMessageA;
        })
    )
    }, 60000);

  function updateContactMessages(newMessage) {
    console.log("ContactProvider updateContactMessages contacts", contacts);
    console.log("ContactProvider updateContactMessages _newMessage", newMessage);
    setContacts(currentContacts =>
      currentContacts
        .map(contact => {
          if (contact.phone === newMessage.phone) {
            console.log("ACHOU O PHONE ContactProvider updateContactMessages contact", contact);
            const newMessages = { ...contact, messages: [...contact.messages, newMessage] };
            // setSelectedContact(newMessages);
            return newMessages;
          }
          return contact;
        })
        .sort((a, b) => {
          // Convertendo as datas das últimas mensagens para timestamps
          const lastMessageA = new Date(a.messages[a.messages.length - 1].createdAt).getTime();
          const lastMessageB = new Date(b.messages[b.messages.length - 1].createdAt).getTime();
          // console.log("\n\nlastMessageA", lastMessageA, a.name, a.messages[0]);
          // console.log("lastMessageB", lastMessageB, b.name, b.messages[0]);
          // console.log(" lastMessageB - lastMessageA",  lastMessageB - lastMessageA);
          return lastMessageB - lastMessageA;
        })
    );

  }

  const handleMessageReceived = (request) => {
    console.log("message:chat:receive adicionar na lista:", request);

    const { instance, data, sender } = request;
    const { key, pushName, message, messageType, messageTimestamp, owner, source } = data;
    const { remoteJid, fromMe, id } = key;
    const { conversation, messageContextInfo, extendedTextMessage, ephemeralMessage  } = message;
    const text = conversation || extendedTextMessage?.text || ephemeralMessage?.message?.extendedTextMessage?.text;

    const newMessage = {
      phone: remoteJid.replace("@s.whatsapp.net", ""),
      message: text,
      text: text,
      type: "sent",
      typeMessage: "text",
      createdAt: new Date()
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
