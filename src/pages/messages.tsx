import { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/FormMessage";
import Layout from "../components/Layout";
import Table from "../components/TableMessages";
import Menu from '../components/Menu';
import useMessages from "../hooks/useMessages";
import useLayout from "../hooks/useLayout";

export default function Home() {
  const {
    message,
    messages,
    createMessage,
    saveMessage,
    deleteMessage,
    getMessage,
    listMessages,
    showTable,
    tableVisible
  } = useMessages()

  useEffect(() => {
    if (tableVisible) {
      listMessages();
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
                    onClick={createMessage}
                  >
                    Nova Mensagem
                  </Button>
                </div>
                <Table
                  messages={messages}
                  messageSelected={getMessage}
                  messageDeleted={deleteMessage}
                />
              </div>
            ) : (
              <Form
              message={message}
              messageModified={saveMessage}
              canceled={showTable}
              />
            )}
          </Layout>
        </div>
      </div>
    </div>


  )
}