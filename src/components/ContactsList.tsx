import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/pt-br";
import Image from "next/image";
import styles from "../styles/Ticket.module.css";
import { IconWhatsapp } from "./Icons";
import TopBar from "./TopBar";
import TopBarButtons from "./TopBarButtons";
import TopBarOptions from "./TopBarOptions";
import TopBarSearch from "./TopBarSearch";
import { log } from "console";
const truncateString = (str, num) => {
  if (!str) {
    return "";
  }
  if (str.length <= num) {
    return str;
  }

  return str.slice(0, num) + "...";
}

const ContactsList = ({ contacts, onContactSelect }) => {
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  // Atualiza o estado de pesquisa com base no valor do input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filtra contatos sempre que o estado de pesquisa muda
  useEffect(() => {
    const filtered = contacts.filter(contact =>{
      // console.log("contact", contact)
      // return contact.messages.reverse().some(message =>
        return contact.messages.reverse()[0]?.text?.toLowerCase().includes(search.toLowerCase())
      // )
    }).
    map(contact => ({...contact, ["messages"]: contact.messages.reverse()}));

    setFilteredContacts(filtered);
  }, [search, contacts]);

  useEffect(() => {
    console.log("filteredContacts", filteredContacts)
  }, [filteredContacts])
  return (
    <div className={`${styles.contactsList} rounded h-screen`}>
      <TopBar />
      <TopBarSearch onKeyDown={handleSearchChange} />
      <TopBarButtons />
      <TopBarOptions />
      {filteredContacts.sort((a, b) => {
          const lastMessageA = new Date(a.messages[a.messages.length - 1].createdAt).getTime();
          const lastMessageB = new Date(b.messages[b.messages.length - 1].createdAt).getTime();
          return lastMessageB - lastMessageA;
        }).map(contact => {

        const isoDate = contact.messages[contact.messages.length - 1].createdAt
        const messageDate = moment(isoDate);
        const currentDate = moment();
        let formattedDate;

        // Compara se a data da mensagem é a mesma que a data atual
        if (messageDate.isSame(currentDate, "day")) {
          // Se for o mesmo dia, exibe apenas a hora
          formattedDate = messageDate.format("HH:mm");
        } else {
          // Se for um dia diferente, exibe a data e a hora
          formattedDate = messageDate.format("DD/MM/YYYY");
        }

        return (
          <div key={contact._id} className={`${styles.contactItem} cursor-pointer font-extra-light`} onClick={() => onContactSelect(contact)}>
            <Image 
              src={contact.profilePictureUrl}
              alt={contact.name}
              width={40}
              height={40}
              className={styles.contactPicture}
            />
            <div className={styles.contactInfo}>
              <div className={styles.contactPhone}>
                <div className={styles.iconWhatsappContactPhoneWrapper}>
                  <IconWhatsapp className="text-purple-600" />
                </div>
                <div className={styles.phoneContactWrapper}>
                  {contact.name} <br />
                  {contact.phone}
                </div>
              </div>
              <div className={styles.lastMessage}>
              <div className={styles.lastMessage}>
                {contact.messages && contact.messages.length > 0 
                  ? truncateString(contact.messages[contact.messages.length -1].text, 30)
                  : "Sem mensagem"}
                </div>
                <div className={styles.contactDate}>
                  {contact.messages && contact.messages.length > 0 
                    ? formattedDate
                    : ""}
                    <br />
                  {moment(isoDate).fromNow()}

                </div>

                <div className={styles.badgeWrapper}>
                  {contact.badges && contact.badges.length > 0 &&
                    contact.badges.map((badge, i) => (
                      <span key={i} className={styles.badge}>{badge}</span>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default ContactsList
