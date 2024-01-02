import React, { useEffect, useRef } from "react";
import Message from "./TicketMessage";
import styles from "../styles/Chat.module.css";

const Chat = ({ messages }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Scroll para o último elemento da mensagem
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatWrapper}>
        <div className={styles.chatHeader}>

        {messages.map((message, i) => (
          <Message key={i} text={message.text} sender={message.type} />
        ))}
        <div ref={endOfMessagesRef} />
      </div>

        <div className={styles.chatInput}>
          <input type="text" placeholder="Digite uma mensagem..." />
          <button>Enviar</button>
        </div>

      </div>
    </div>
  );
};

export default Chat;
