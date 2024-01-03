import React from "react";
import moment from "moment";
import styles from "../styles/Ticket.module.css";

const TicketMessage = ({ text, sender, date }) => {
  // console.log("TicketMessage: ", text, sender);
  const messageClass = sender === "sent" ? styles.sent : styles.received;
  const isoDate = date
  const messageDate = moment(isoDate);
  const formattedDate = messageDate.format("HH:mm");
  console.log("TicketMessage: ", text, sender, formattedDate);
  return <div className={`${styles.message} ${messageClass}`}>
    <span className={styles.ticketMessageText}>
      {text}
    </span>
    <span className={styles.ticketMessageDate}>
      {formattedDate}
    </span>
    </div>;
};

export default TicketMessage;
