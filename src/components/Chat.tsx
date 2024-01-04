import React, { useState, useEffect, useRef } from "react";
import Message from "./TicketMessage";
import styles from "../styles/Ticket.module.css";
import useTickets from "../hooks/useTickets";

interface ChatProps {
  messages: any[];
  onMessageSent: (newMessage: any) => void;
  selectedContact: { id: string, messages: any[], phone: string } | null;
  // contacts: any[];
}

export default function Chat({ messages, onMessageSent, selectedContact }: ChatProps) {
  const { sendMessage } = useTickets();
  const [messageText, setMessageText] = useState("");
  const endOfMessagesRef = useRef(null);
  const messagesRef = useRef(messages);
  const [localMessages, setLocalMessages] = useState(messages);

  useEffect(() => {
    messagesRef.current = messages;
    console.log("Estado atualizado da messages:", messages);
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000); // Ajuste o tempo conforme necessário
  }, [localMessages]);


  const handleSendMessage = () => {
    if (!selectedContact) {
      console.log("Nenhum contato selecionado.");
      return;
    }
    console.log("selectedContact:", selectedContact);
    const newMessage = {
      text: messageText,
      type: "received",
      typeMessage: "text",
      createdAt: new Date(),
      phone: selectedContact.phone,
    }
    sendMessage({
      message: messageText,
      phone: selectedContact.phone,
      instanceName: "Criptou_Onboarding-5511994649923",
    });
    setMessageText("");
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
        <div className={styles.chatContainerMessages}>
          {localMessages && localMessages.map((message, i) => (
            <Message
              key={i}
              text={message.text}
              date={message.createdAt}
              sender={message.type}
              read={message.read} />
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
          onKeyDown={handleKeyPress}
          disabled={!selectedContact}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};
