import { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/FormContact";
import Layout from "../components/Layout";
import Table from "../components/TableContacts";
import Menu from '../components/Menu';
import useContacts from "../hooks/useContacts";
import { useIsAuthenticated } from "../hooks/useAuth";

import useLayout from "../hooks/useLayout";

export default function Home() {
  useIsAuthenticated();


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

  useEffect(() => {
    if (tableVisible) {
      // Chame a função listContacts quando tableVisible mudar
      listContacts();
    }
  }, [tableVisible]); // O segundo argumento é um array de dependências

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  
  const handleToggleSidebar = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };
  return (
    <div className="flex parent-container">
      <Menu onToggle={setIsSidebarExpanded} />
      <div className={`page-container flex-1 transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-10"}`}>
        <div className="ml-60px h-screen bg text-white p-10">
        <Layout title="Contatos" width="w-3/3">
          {tableVisible ? (
            <div>
              <div className="flex justify-end">
                <Button
                  color="green"
                  className="mb-4"
                  onClick={createContact}
                >
                  Novo Contato
                </Button>
              </div>
              <Table
                  contacts={contacts}
                  contactSelected={getContact}
                  contactDeleted={deleteContact}
                  contactModified={saveContact}
                  canceled={showTable} 
                  contact={undefined}              />
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
    </div>
  )
}