import React, { useState, useEffect } from 'react';
import ContactsList from '../components/ContactsList';
import Chat from '../components/Chat';
import Menu from '../components/Menu';
import Layout from "../components/Layout";
import styles from '../styles/Ticket.module.css';
import useTickets from '../hooks/useTickets';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const { listContacts } = useTickets();

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

  const handleMessageSent = (newMessage) => {
    console.log("handleMessageSent newMessage:", newMessage);
    // Atualiza o contato selecionado
    const updatedSelectedContact = selectedContact?.id === newMessage.phone
      ? { ...selectedContact, messages: [...selectedContact.messages, newMessage] }
      : selectedContact;
    setSelectedContact(updatedSelectedContact);

    // Atualiza a lista de contatos
    setContacts(contacts.map(contact => 
      contact.id === newMessage.phone 
      ? { ...contact, messages: [...contact.messages, newMessage] } 
      : contact
    ));
  };

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
            <Chat messages={selectedContact?.messages} onMessageSent={handleMessageSent} />
            </div>
          </div>
        {/* </Layout> */}
      </div>
      </div>
    </div>
  )
}
