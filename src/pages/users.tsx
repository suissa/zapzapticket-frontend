import { useEffect } from "react";
import Botao from "../components/Button";
import Form from "../components/FormMessage";
import Layout from "../components/Layout";
import Table from "../components/TableMessages";
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
      // Chame a função listMessages quando tableVisible mudar
      listMessages();
    }
  }, [tableVisible]); // O segundo argumento é um array de dependências

  return (
    <div className={`
      flex justify-center items-center
      h-screen bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout title="Mensagens">
        {tableVisible ? (
          <div>
            <div className="flex justify-end">
              <Botao
                color="green"
                className="mb-4"
                onClick={createMessage}
              >
                Nova Mensagem
              </Botao>
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
  )
}