import { useEffect } from "react";
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
    criarMessage,
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

  return (
    <div>
      <Menu />
    <div className={`
      flex justify-center items-center
      h-screen bg
      text-white
    `}>
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
  )
}