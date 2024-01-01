import React from "react"
import moment from "moment"
import Image from 'next/image'
import styles from "../styles/Chat.module.css"


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
    <div className={styles.contactsList}>
      {contacts.map(contact => {

        const isoDate = contact.messages[0].createdAt
        const formattedDate = moment(isoDate).format("HH:mm DD/MM/YYYY")

        return (
          <div key={contact._id} className={styles.contactItem} onClick={() => onContactSelect(contact)}>
            <div className={styles.contactName}>{contact.name}</div>
            <div>
              <Image 
                src={contact.profilePictureUrl}
                alt={contact.name}
                width={50}
                height={50}
                className="{styles.contactPicture}"
              />

            </div>
            <div className={styles.lastMessage}>
              {contact.messages && contact.messages.length > 0 
                ? truncateString(contact.messages[0].text, 30)
                : "Sem mensagem"}
            </div>
            <div className={styles.contactDate}>
              {contact.messages && contact.messages.length > 0 
                ? formattedDate
                : ""}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ContactsList
