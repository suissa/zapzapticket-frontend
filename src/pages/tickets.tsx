// import React, { useState } from "react"
// import Message from "../components/TicketMessage"
// import styles from "../styles/Chat.module.css"

// export default function Home() {
//     const [messages, setMessages] = useState([
//         { id: 1, text: "Olá, como você está?", sender: "received" },
//         { id: 2, text: "Estou bem, obrigado! E você?", sender: "sent" }
//         // Adicione mais mensagens conforme necessário
//     ])

//     return (
//         <div className={styles.chatContainer}>
//             {messages.map(message => (
//                 <Message key={message.id} text={message.text} sender={message.sender} />
//             ))}
//         </div>
//     )
// }


import React, { useState } from 'react';
import ContactsList from '../components/ContactsList';
import Chat from '../components/Chat';
import styles from '../styles/Chat.module.css';

export default function Home() {
    const [contacts, setContacts] = useState([
        { id: 1, name: 'João', lastMessage: 'Oi, como vai?' },
        { id: 2, name: 'Teste', lastMessage: 'Ripa' },
        // Mais contatos...
    ]);
    const [selectedContact, setSelectedContact] = useState(null);

    const handleContactSelect = (contact) => {
        setSelectedContact(contact);
        // Aqui você pode carregar as mensagens do contato selecionado
    };

    return (
        <div className={styles.mainLayout}>
            <ContactsList contacts={contacts} onContactSelect={handleContactSelect} />
            <Chat messages={selectedContact ? selectedContact.messages : []} />
        </div>
    );
}
