import styles from "../styles/Ticket.module.css";
import Image from "next/image";
import { IconReturn, IconAccept } from "./Icons";
import MenuDropdown from "./MenuDropdownChat";
import TagsInput from "./TagsInput";
import TicketAccept from "./TickerAccept";

export default function ChatTopBar({selectedContact}: any) {
  // console.log("ChatTopBar selectedContact:", selectedContact);
  return (
    <>
      <div className={styles.ticketChatTopBar}>
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 pt-6 pl-4"> {/* Contêiner externo */}
          <div className="w-10 h-10"> {/* Contêiner da imagem, ajuste o tamanho conforme necessário */}
            <Image src={selectedContact.profilePictureUrl} width={40} height={40} alt={selectedContact.name} className="rounded-full" />
          </div>
          <div className="flex flex-col text-purple"> {/* Contêiner para Nome e Transferido para */}
            <div className="text-lg"> {/* Estilos para o Nome */}
              Nome: {selectedContact.name}
            </div>
            <div className="text-sm text-gray-600"> {/* Estilos para Transferido para */}
              Transferido para: {selectedContact.transferedTo || "Ninguém"}
            </div>
          </div>
        </div>
          <div className={`${styles.ticketChatTopBarButtonsWrapper} grid grid-cols-3`}>
            <div className={`${styles.ticketChatTopBarButtonsReturn} px-4 py-2 text-purple bg-white rounded hover:bg-purple-200 focus:outline-none`}>
              <IconReturn className={`${styles.ticketChatTopBarButtonsReturnIcon} text-purple w-6 h-6 margin-0-auto`} />
            </div>
            <div className={`${styles.ticketChatTopBarButtonsAccept} px-4 py-2 text-purple bg-white rounded hover:bg-purple-200 focus:outline-none`}>
              <TicketAccept selectedContact={selectedContact} />
            </div>
            <div className={styles.ticketChatTopBarButtonsMenu}>
              <MenuDropdown 
                className={`${styles.ticketChatTopBarButtonsMenuIcon} text-purple w-6 h-6 margin-0-auto`}
                list={["Agendamento", "Transferência", "Deletar"]}
              />
            </div>
            {/* </button> */}
          </div>
        </div>
      </div>
      <div className={styles.ticketChatTags}>
        <div className={styles.ticketChatTagsWrapper}>
          <TagsInput 
            tags={selectedContact.badges} 
            className={styles.ticketsTags} 
            onChange={(newTags) => {
              // Atualizar o estado do componente pai, se necessário
            }}
          />
        </div>
      </div>
    </>
  );
}