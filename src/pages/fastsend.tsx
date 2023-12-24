import { useEffect } from "react";
import Botao from "../components/Button";
import FormContact from "../components/FormContact"; // Certifique-se de que o nome está correto
import Layout from "../components/Layout";
import TableContacts from "../components/TableContacts"; // Componente de tabela para contatos
import TableMessages from "../components/TableMessages"; // Componente de tabela para mensagens
import Menu from '../components/Menu';
import useSend from "../hooks/useSend";
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
  } = useSend()

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
          {(
            <FormContact
              contact={contact}
              contactModified={sendMessage}
              canceled={showTable}
            />
          )}
        </Layout>
      </div>
    </div>
  )
}
