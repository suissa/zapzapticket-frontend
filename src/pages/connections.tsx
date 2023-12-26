import { useEffect } from "react";
import Botao from "../components/Button";
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
    criarConnection,
    deleteConnection,
    getConnection,
    listConnections,
    showTable,
    tableVisible
  } = useConnections()

  return (
    <>
      <Head>
        <title>Conexões</title>
      </Head>
      <div>
        <Menu />
        <div className={`
          flex justify-center items-center
          h-screen bg
          text-white
        `}>
          <Layout title="Conexões">
            {tableVisible ? (
              <div>
                <div className="flex justify-end">
                  <Botao
                    color="green"
                    className="mb-4"
                    onClick={createConnection}
                  >
                    Nova Conexão
                  </Botao>
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
    </>
  )
}