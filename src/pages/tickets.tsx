import React, { useState, useEffect, useContext, useRef } from 'react';
import ContactsList from '../components/ContactsList';
import Chat from '../components/Chat';
import Menu from '../components/Menu';
import Layout from "../components/Layout";
import styles from '../styles/Ticket.module.css';
import useTickets from '../hooks/useTickets';
import { ContactContext } from '../hooks/useContextTickets';

export default function Home() {
  // const [contacts, setContacts] = useState([]);
  // const [selectedContact, setSelectedContact] = useState(null);
  const { contacts, setContacts, selectedContact, setSelectedContact } = useContext(ContactContext);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const { listContacts, updateContactMessages } = useTickets(selectedContact, setSelectedContact);

  const handleToggleSidebar = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsData = await listContacts();
      setContacts(contactsData);
    };

    fetchContacts();
  }, [listContacts]);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    // Aqui você pode carregar as mensagens do contato selecionado
  };

  
  // const handleMessageSent = (newMessage) => {
  //   console.log("handleMessageSent newMessage:", newMessage);
  //   updateContactMessages(newMessage, newMessage.phone);
  // };


  const handleMessageSent = (newMessage) => {
    console.log("handleMessageSent newMessage:", newMessage);
    console.log("handleMessageSent selectedContact:", selectedContact);
    // Atualiza o contato selecionado
    if (selectedContact === null) return;
    const updatedSelectedContact = { ...selectedContact, messages: [...selectedContact.messages, newMessage] }
    // selectedContact?.phone === newMessage.phone
    //   ? { ...selectedContact, messages: [...selectedContact.messages, newMessage] }
    //   : selectedContact;
    setSelectedContact(updatedSelectedContact);

    // Atualiza a lista de contatos
    setContacts(contacts.map(contact => {
      console.log("handleMessageSent contact:", contact);
      console.log("handleMessageSent contact.phone:", contact.phone);
      console.log("handleMessageSent newMessage.phone:", newMessage.phone);
      console.log("handleMessageSent contact.phone === newMessage.phone:", contact.phone === newMessage.phone);

      return contact.phone && newMessage.phone && contact.phone === newMessage.phone 
      ? { ...contact, messages: [...contact.messages, newMessage] } 
      : contact
    }
    ));
  };

  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Rola para a última mensagem quando as mensagens do contato selecionado mudam
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedContact?.messages]);

  useEffect(() => {
    console.log("selectedContact:", selectedContact);
  }
  , [selectedContact]);

  return (
    <div className="flex">
      <Menu onToggle={setIsSidebarExpanded} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-10"}`}>
        <div className="h-screen bg text-black p-10">
        {/* <Layout title="Tickets"> */}
          <div className={styles.mainLayout}>
            <div className={styles.contactsList}>
              <ContactsList contacts={contacts} onContactSelect={handleContactSelect} />
            </div>

            <div className={styles.chatContainer}>
            <Chat messages={selectedContact?.messages}
              onMessageSent={handleMessageSent}
              selectedContact={selectedContact}
            />
            </div>
          </div>
        {/* </Layout> */}
      </div>
      </div>
    </div>
  )
}
