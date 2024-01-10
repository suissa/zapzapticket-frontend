// TicketAccept.js
import React from "react";
import { IconAccept } from "./Icons";
import styles from "../styles/Ticket.module.css";
import useUpdateTicketStatus from "../hooks/useUpdateTicketStatus"; // Importe o hook

export default function TicketAccept({ selectedContact }: any) {
  const { updateTicketStatus, isLoading, error } = useUpdateTicketStatus(selectedContact._id);
  console.log("TicketAccept selectedContact: ", selectedContact)
  const handleClick = async () => {
    await updateTicketStatus(selectedContact.ticketId, {status: "accept"});

  };

  return (
    <div onClick={handleClick} className={`${styles.ticketChatTopBarButtonsAccept} cursor-pointer`}>
      <IconAccept className={`${styles.ticketChatTopBarButtonsAcceptIcon} text-green w-6 h-6 mt-1 margin-0-auto`} />
      {isLoading && <p>Atualizando...</p>}
      {error && <p>Erro: {error}</p>}
    </div>
  );
}
