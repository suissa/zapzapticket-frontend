import React, { useState, useEffect, useRef } from "react";
import Message from "./TicketMessage";
import styles from "../styles/Ticket.module.css";
import useTickets from "../hooks/useTickets";

interface ChatProps {
  messages: any[];
  onMessageSent: (newMessage: any) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onMessageSent }) => {
  const { sendMessage } = useTickets();
  const [messageText, setMessageText] = useState("");
  const endOfMessagesRef = useRef(null);
  const messagesRef = useRef(messages);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {

    messagesRef.current = messages;
    console.log("Estado atualizado da messages:", messages);
  }, [messages]);


  const handleSendMessage = () => {
    const newMessage = {
      text: messageText,
      type: "received",
    }
    sendMessage({
      message: messageText,
      phone: "5515991957645",
      instanceName: "Criptou_Onboarding-5511994649923",
    });
    setMessageText(""); // Limpa o campo de texto após o envio
    onMessageSent(newMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.mainLayout}>
        <div className={styles.chatContainer}>
          {messages && messages.map((message, i) => (
            <Message key={i} text={message.text} sender={message.type} />
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      </div>

      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="Digite uma mensagem..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyPress}  // Adicione esta linha
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
