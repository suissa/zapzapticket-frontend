import React from "react";
import moment from "moment";
import styles from "../styles/Ticket.module.css";
import { IconDoubleChecked } from "./Icons";

const TicketMessage = ({ text, sender, date, read }) => {
  // console.log("TicketMessage: ", text, sender);
  const messageClass = sender === "sent" ? styles.sent : styles.received;
  const isoDate = date
  const messageDate = moment(isoDate);
  const formattedDate = messageDate.format("HH:mm");
  // console.log("TicketMessage: ", text, sender, formattedDate);
  // console.log("Render TicketMessage: ", text, read);

  return <div className={`${styles.message} ${messageClass}`}>
    <span className={styles.ticketMessageText}>
      {text}
    </span>
    <span className={styles.ticketMessageDate}>
      {formattedDate}
    </span>
    <span className={styles.ticketMessageDoubleChecked}>
      {sender == "received" && read && <IconDoubleChecked className="icon-blue-whatsapp h-4" />}
    </span>
    </div>;
};

export default TicketMessage;
