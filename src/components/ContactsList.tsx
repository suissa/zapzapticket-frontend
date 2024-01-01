import React from 'react';
import styles from '../styles/Chat.module.css';

const truncateString = (str, num) => {
  if (!str) {
    return "";
  }
  if (str.length <= num) {
    return str;
  }

  return str.slice(0, num) + '...';
}

const ContactsList = ({ contacts, onContactSelect }) => {
  return (
    <div className={styles.contactsList}>
      {contacts.map(contact => (
        <div key={contact._id} className={styles.contactItem} onClick={() => onContactSelect(contact)}>
          <div className={styles.contactName}>{contact.name}</div>
          <div className={styles.lastMessage}>
            {contact.messages && contact.messages.length > 0 
              ? truncateString(contact.messages[0].text, 30)
              : "Sem mensagem"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactsList;
