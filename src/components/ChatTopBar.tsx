import styles from "../styles/Ticket.module.css";
import Image from "next/image";
import { IconReturn, IconAccept } from "./Icons";
import MenuDropdown from "./MenuDropdownChat";

export default function ChatTopBar({selectedContact}: any) {
  console.log("ChatTopBar selectedContact:", selectedContact);
  return (
    <>
      <div className={styles.ticketChatTopBar}>
        <div className="flex items-center justify-between">
          <div className={`${styles.ticketChatTopBarWrapper} flex items-center`}>
            <div className={styles.ticketChatTopBarProfileImage}>
              <Image src={selectedContact.profilePictureUrl} width={40} height={40} alt={selectedContact.name} />
            </div>
            <div className={styles.ticketChatTopBarName}>Nome: {selectedContact.name}</div>
          </div>
          <div className={`${styles.ticketChatTopBarButtonsWrapper} grid grid-cols-3`}>
            <div className={`${styles.ticketChatTopBarButtonsReturn} px-4 py-2 text-purple bg-white rounded hover:bg-purple-200 focus:outline-none`}>
              <IconReturn className={`${styles.ticketChatTopBarButtonsReturnIcon} text-purple w-6 h-6 margin-0-auto`} />
            </div>
            <div className={`${styles.ticketChatTopBarButtonsAccept} px-4 py-2 text-purple bg-white rounded hover:bg-purple-200 focus:outline-none`}>
              <IconAccept className={`${styles.ticketChatTopBarButtonsAcceptIcon} text-purple w-6 h-6 mt-1 margin-0-auto`} />
            </div>
            <div className={styles.ticketChatTopBarButtonsMenu}>
              <MenuDropdown className={styles.ticketChatTopBarButtonsMenuIcon} />
            </div>
            {/* </button> */}
          </div>
        </div>
      </div>
    </>
  );
}