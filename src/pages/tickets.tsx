import React, { useState, useEffect } from 'react';
import ContactsList from '../components/ContactsList';
import Chat from '../components/Chat';
import Menu from '../components/Menu';
import styles from '../styles/Chat.module.css';
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

  return (
    <div className="flex">
      <Menu onToggle={setIsSidebarExpanded} />
      <div className={styles.mainLayout}>
        <ContactsList contacts={contacts} onContactSelect={handleContactSelect} />
        <Chat messages={selectedContact ? selectedContact.messages : []} />
      </div>
    </div>
  );
  
}
