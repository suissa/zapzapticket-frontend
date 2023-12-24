import { useEffect, useState } from "react";
import Button from "../components/Button";
import FormContact from "../components/FormContact";
import Layout from "../components/Layout";
import TableContacts from "../components/TableContacts";
import TableMessages from "../components/TableMessages";
import TableConnections from "../components/Table";
import Menu from '../components/Menu';
import useContacts from "../hooks/useContacts";
import useMessages from "../hooks/useMessages";
import useConnections from "../hooks/useConnections";
import useSend from "../hooks/useSend";
import useLayout from "../hooks/useLayout";

export default function Home() {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState();
  const [selectedConnection, setSelectedConnection] = useState();

  const handleContactsSelectionChange = (selectedIds) => {
    setSelectedContacts(selectedIds);
  };

  const handleMessagesSelectionChange = (selectedId) => {
    setSelectedMessage(selectedId);
  };

  const handleConnectionsSelectionChange = (selectedId) => {
    console.log("handleConnectionsSelectionChange selectedId", selectedId)
    setSelectedConnection(selectedId);
  };

  

  const {
    contact,
    contacts,
    createContact,
    saveContact,
    deleteContact,
    getContact,
    listContacts,
    showTable,
    tableVisible
  } = useContacts()

  const {
    message,
    messages,
    createMessage,
    saveMessage,
    deleteMessage,
    getMessage,
    listMessages,
  } = useMessages()

  const {
    connection,
    connections,
    createConnection,
    saveConnection,
    deleteConnection,
    getConnection,
    listConnections,
  } = useConnections()

  const {
    sendMessage
  } = useSend()

  useEffect(() => {
    if (tableVisible) {
      listContacts();
      listMessages(); // Carregar mensagens
    }
  }, [tableVisible]);

  const handleSendMessage = () => {
    // Supondo que você tem uma função sendMessage no seu hook
    // sendMessage(selectedMessage, selectedContacts);
    console.log('Mensagens selecionadas:', selectedMessage);
    console.log('Contatos selecionados:', selectedContacts);
    sendMessage(selectedMessage, selectedContacts, "Criptou_Onboarding-5511994649923")
  };

  return (
    <div>
      <Menu />
      <div className={`
        flex justify-center items-center
        h-screen bg-gradient-to-r from-blue-500 to-purple-500
        text-white
      `}>
        <Layout title="Envios">
          {tableVisible ? (
          <div>
            <div className="flex justify-end">
              <Button
                color="green"
                className="mb-4"
                onClick={handleSendMessage}
                >
                Novo Envio
              </Button>
            </div>
            <div className="flex h-80">
              <div className="flex-1 overflow-auto">

              <TableConnections
                connections={connections}
                showCheckboxes={true}
                showActions={false}
                onSelectionChange={handleConnectionsSelectionChange}
              />
              </div>
              <div className="flex-1 overflow-auto">

                <TableContacts
                  contacts={contacts}
                  contactSelected={getContact}
                  contactDeleted={deleteContact}
                  contactModified={saveContact}
                  canceled={showTable}
                  showCheckboxes={true}
                  showActions={false}
                  onSelectionChange={handleContactsSelectionChange}
                />
              </div>
            </div>

            {/* Corrigido: Removido o fechamento incorreto da div aqui e colocado a div corretamente em volta de TableContacts */}
            <div className="overflow-auto h-80 mt-4">
              <TableMessages
                messages={messages}
                messageSelected={getMessage}
                messageDeleted={deleteMessage}
                messageModified={saveMessage}
                canceled={showTable}
                showCheckboxes={true}
                showActions={false}
                onSelectionChange={handleMessagesSelectionChange}
              />
            </div>
          </div>
          ) : (
            <FormContact
              contact={contact}
              contactModified={saveContact}
              canceled={showTable}
            />
          )}
        </Layout>
      </div>
    </div>
  )
}
