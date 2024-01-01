import React from "react";
import Message from "./TicketMessage";
import styles from "../styles/Chat.module.css";

const Chat = ({ messages }) => {
  console.log({messages});
  return (
    <div className={styles.chatContainer}>
      {messages.map(message => (
        <Message key={message.id} text={message.text} sender={message.sender} />
      ))}
    </div>
  );
};

export default Chat;
