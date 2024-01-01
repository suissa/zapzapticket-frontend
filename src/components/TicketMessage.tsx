import React from 'react';
import styles from '../styles/Chat.module.css';

const TicketMessage = ({ text, sender }) => {
    const messageClass = sender === 'sent' ? styles.sent : styles.received;
    return <div className={`${styles.message} ${messageClass}`}>{text}</div>;
};

export default TicketMessage;
