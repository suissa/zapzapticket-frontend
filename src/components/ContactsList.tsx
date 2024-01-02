import React from "react"
import moment from "moment"
import Image from 'next/image'
import styles from "../styles/Chat.module.css"
import { IconWhatsapp } from "./Icons"

const truncateString = (str, num) => {
  if (!str) {
    return ""
  }
  if (str.length <= num) {
    return str
  }

  return str.slice(0, num) + "..."
}

const ContactsList = ({ contacts, onContactSelect }) => {
  return (
    <div className={`${styles.contactsList} rounded`}>
      {contacts.map(contact => {

        const isoDate = contact.messages[0].createdAt
        const formattedDate = moment(isoDate).format("HH:mm DD/MM/YYYY")

        return (
          <div key={contact._id} className={styles.contactItem} onClick={() => onContactSelect(contact)}>
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
                  <IconWhatsapp className="text-purple" />
                </div>
                <div className={styles.phoneContactWrapper}>
                  {contact.phone}
                </div>
              </div>
              <div className={styles.lastMessage}>
              <div className={styles.lastMessage}>
                {contact.messages && contact.messages.length > 0 
                  ? truncateString(contact.messages.reverse()[0].text, 30)
                  : "Sem mensagem"}
                </div>
                <div className={styles.contactDate}>
                  {contact.messages && contact.messages.length > 0 
                    ? formattedDate
                    : ""}
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
