import { useEffect, useState } from "react";
import Button from "../components/Button";
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
    deleteContact,
    getContact,
    listContacts,
    showTable,
    tableVisible
  } = useContacts()

  useEffect(() => {
    if (tableVisible) {
      listContacts();
    }
  }, [tableVisible]);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleToggleSidebar = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };
  return (
    <div className="flex">
      <Menu onToggle={setIsSidebarExpanded} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-10"}`}>
        <div className="h-screen bg text-white p-10">
          <Layout title="Mensagens">
            {tableVisible ? (
              <div>
                <div className="flex justify-end">
                  <Button
                    className="mb-4"
                    onClick={createContact}
                  >
                    Nova Mensagem
                  </Button>
                </div>
                <Table
                  contacts={contacts}
                  contactSelected={getContact}
                  contactDeleted={deleteContact}
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
    </div>


  )
}