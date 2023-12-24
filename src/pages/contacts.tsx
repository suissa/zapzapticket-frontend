import { useEffect } from "react";
import Botao from "../components/Button";
import Form from "../components/FormContact";
import Layout from "../components/Layout";
import Table from "../components/TableContacts";
import Menu from '../components/Menu';
import useContacts from "../hooks/useContacts";
import useLayout from "../hooks/useLayout";

export default function Home() {
  const {
    contact,
    contacts,
    createContact,
    saveContact,
    criarContact,
    deleteContact,
    getContact,
    listContacts,
    showTable,
    tableVisible
  } = useContacts()

  useEffect(() => {
    if (tableVisible) {
      // Chame a função listContacts quando tableVisible mudar
      listContacts();
    }
  }, [tableVisible]); // O segundo argumento é um array de dependências

  return (
    <div>
      <Menu />
      <div className={`
        flex justify-center items-center
        h-screen bg-gradient-to-r from-blue-500 to-purple-500
        text-white
      `}>
        <Layout title="Contatos">
          {tableVisible ? (
            <div>
              <div className="flex justify-end">
                <Botao
                  color="green"
                  className="mb-4"
                  onClick={createContact}
                >
                  Novo Contato
                </Botao>
              </div>
              <Table
                contacts={contacts}
                contactSelected={getContact}
                contactDeleted={deleteContact}
                contactModified={saveContact}
                canceled={showTable}
              />
            </div>
          ) : (
            <Form
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