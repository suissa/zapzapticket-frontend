import { useEffect } from "react";
import Button from "../components/Button";
import FormContact from "../components/FormContact"; // Certifique-se de que o nome está correto
import Layout from "../components/Layout";
import TableContacts from "../components/TableContacts"; // Componente de tabela para contatos
import TableMessages from "../components/TableMessages"; // Componente de tabela para mensagens
import Menu from '../components/Menu';
import useContacts from "../hooks/useContacts";
import useMessages from "../hooks/useMessages";
import useLayout from "../hooks/useLayout";

export default function Home() {
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

  useEffect(() => {
    if (tableVisible) {
      listContacts();
      listMessages(); // Carregar mensagens
    }
  }, [tableVisible]);

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
                onClick={createContact}
              >
                Novo Envio
              </Button>
            </div>
            <div className="overflow-auto h-80">
              <TableMessages
                messages={messages}
                messageSelected={getMessage}
                messageDeleted={deleteMessage}
                messageModified={saveMessage}
                canceled={showTable}
                showCheckboxes={true}
                showActions={false}
              />
            </div>

            {/* Corrigido: Removido o fechamento incorreto da div aqui e colocado a div corretamente em volta de TableContacts */}
            <div className="overflow-auto h-80 mt-4">
              <TableContacts
                contacts={contacts}
                contactSelected={getContact}
                contactDeleted={deleteContact}
                contactModified={saveContact}
                canceled={showTable}
                showCheckboxes={true}
                showActions={false}
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
