import React, { useState, useEffect } from 'react';
import ContactsList from '../components/ContactsList';
import Chat from '../components/Chat';
import styles from '../styles/Chat.module.css';
import useTickets from '../hooks/useTickets';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const { listContacts } = useTickets();

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
    <div className={styles.mainLayout}>
      <ContactsList contacts={contacts} onContactSelect={handleContactSelect} />
      <Chat messages={selectedContact ? selectedContact.messages : [{
        id: 1, text: "Olá, como você está?", sender: "received"
      },
      { id: 2, text: "Bem e vc?", sender: "sent" }
      ]} />
    </div>
  );
}
