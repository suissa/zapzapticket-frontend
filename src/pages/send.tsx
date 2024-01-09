import { useEffect, useState } from "react";
import Button from "../components/Button";
import TableContacts from "../components/TableContacts";
import TableMessages from "../components/TableMessages";
import TableSendings from "../components/TableSendings";
import TableConnections from "../components/Table";
import Menu from '../components/Menu';
import useContacts from "../hooks/useContacts";
import useMessages from "../hooks/useMessages";
import useConnections from "../hooks/useConnections";
import useSending from "../hooks/useSending";

export default function Home() {
  // const [list, setList] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState();
  const [selectedConnection, setSelectedConnection] = useState();
  const [loading, setLoading] = useState(false);

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
    sendMessage,
    list,
    setList
  } = useSending()

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleToggleSidebar = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };

  const handleSendMessage = async () => {
    setLoading(true);

    console.log('selectedMessage:', selectedMessage);
    console.log('selectedConnection:', selectedConnection);
    console.log('selectedContacts:', selectedContacts);
    if (selectedMessage && selectedConnection && selectedContacts) {
      try {
        // Use selectedContacts diretamente
        if (selectedContacts.length > 0) {  
          // const newContacts = selectedContacts.filter(contact => 
          //   !list.some(item => item.contact === contact)
          // );
          // console.log('newContacts:', newContacts);
          const newEntries = selectedContacts.map(contact => ({
            connection: selectedConnection,
            contact: contact,
            message: selectedMessage
          }));

          console.log('list:', list);
          console.log('newEntries:', newEntries);
          setList([...list, ...newEntries]);

          console.log('sendingsList:', selectedMessage);
          await sendMessage(selectedMessage, selectedContacts, selectedConnection);
        } else {
          // Trate o caso em que nenhum contato foi selecionado
          alert("Nenhum contato selecionado.");
        }
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Parâmetros incompletos para o envio.");
      setLoading(false);
    }
  };


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

  useEffect(() => {
    if (list) {
      console.log('list if:', list);
    } else {
      console.log('list else:', list);
    }
  }, [list]); // Dependência do useEffect

  useEffect(() => {
    if (loading) {
      console.log('loading if:', loading);
    } else {
      console.log('loading else:', loading);
    }
  }, [loading]); // Dependência do useEffect

  const Modal = ({ onClose, onConfirm, contact }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              onClick={onConfirm}
            >
              Excluir
            </button>
            <button
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white
              px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (

    <div className="flex">
      <Menu onToggle={setIsSidebarExpanded} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-10"}`}>
          <div className="h-screen bg text-black p-10">
            <div className="flex justify-end text-white">
              <Button
                className="mb-4"
                onClick={handleSendMessage}
                >
                {loading ? 'Enviando...' : 'Novo Envio'}
              </Button>
            </div>
            <div className="flex h-80 text-white">
              <div className="flex-1 overflow-auto mr-2">

                <TableMessages
                  messages={messages}
                  messageSelected={getMessage}
                  messageDeleted={deleteMessage}
                  messageModified={saveMessage} // Add the messageModified property
                  showCheckboxes={true}
                  showActions={false}
                  onSelectionChange={handleMessagesSelectionChange}
                />
              </div>
              <div className="flex-1 overflow-auto">
                <TableContacts
                  contacts={contacts}
                  contactSelected={getContact}
                  contactDeleted={deleteContact}
                  contactModified={saveContact}
                  showCheckboxes={true}
                  canceled={showTable}
                  showActions={false}
                  onSelectionChange={handleContactsSelectionChange} contact={undefined}
                />
              </div>
            </div>
            <div className="flex h-80 m-2">
              <div className="flex-1 overflow-auto mr-2">

              <TableConnections
                  connections={connections}
                  showCheckboxes={true}
                  showActions={false}
                  hideCertainColumns={true}
                  filterActiveInstances={true}
                  onSelectionChange={handleConnectionsSelectionChange}
                />
              </div>
              <div className="flex-1 overflow-auto">
                <TableSendings
                  list={list}
                />
              </div>
            </div>
            </div>
      </div>
    </div>
  )
}