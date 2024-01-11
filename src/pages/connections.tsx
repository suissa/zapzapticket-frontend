import { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/FormConnection";
import Layout from "../components/Layout";
import Table from "../components/TableConnections";
import Menu from '../components/Menu';
import Head from 'next/head';
import useConnections from "../hooks/useConnections";
import useLayout from "../hooks/useLayout";
import { Link } from 'react-router-dom'; // Importe Link do React Router para criar links

export default function Home() {
  const {
    connection,
    connections,
    createConnection,
    saveConnection,
    deleteConnection,
    getConnection,
    listConnections,
    showTable,
    tableVisible
  } = useConnections()

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleToggleSidebar = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };
  return (
    <>
      <Head>
        <title>Conexões</title>
      </Head>
      <div>
        <Menu onToggle={setIsSidebarExpanded} />
        <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-10"}`}>
        <div className="h-screen bg p-10">
          <Layout title="Conexões" width="w-3/3">
            {tableVisible ? (
            <div>
              <div className="flex justify-end">
                <Button
                  className="mb-4"
                  onClick={createConnection}
                >
                  Nova Conexão
                </Button>
              </div>
              <Table
                connections={connections}
                connectionSelected={getConnection}
                connectionSaved={saveConnection}
                connectionDeleted={deleteConnection}
              />
              </div>
              ) : (
              <Form
                connection={connection}
                connectionModified={saveConnection}
                canceled={showTable}
              />
            )}
          </Layout>
        </div>
      </div>

      </div>
    </>
  )
}