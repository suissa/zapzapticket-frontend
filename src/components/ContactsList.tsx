import React from 'react';
import styles from '../styles/Chat.module.css';

const ContactsList = ({ contacts, onContactSelect }) => {
  return (
    <div className={styles.contactsList}>
      {contacts.map(contact => (
        <div key={contact._id} className={styles.contactItem} onClick={() => onContactSelect(contact)}>
          <div className={styles.contactName}>{contact.name}</div>
          <div className={styles.lastMessage}>{contact.lastMessage}</div>
        </div>
      ))}
    </div>
  );
};

export default ContactsList;
