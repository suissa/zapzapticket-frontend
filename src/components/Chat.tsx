import React from "react";
import Message from "./TicketMessage";
import styles from "../styles/Chat.module.css";

const Chat = ({ messages }) => {
  console.log({messages});
  return (
    <div className={styles.chatContainer}>
      {messages.map((message, i) => (
        <Message key={i} text={message.text} sender={message.type} />
      ))}
    </div>
  );
};

export default Chat;
