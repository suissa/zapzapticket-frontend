import { useState, MutableRefObject, useRef, useEffect } from "react"
import Connection from "../core/Connection"
import ConnectionRepositorio from "../core/ConnectionRepository"
import useLayout from "./useLayout"

const API_URL = "http://localhost:9000/connections";

export default function useConnections() {
    const [ connection, setConnection ] = useState<Connection>(Connection.empty())
    const [ connections, setConnections ] = useState<Connection[]>([])
    const { showForm, showTable, tableVisible } = useLayout()

    useEffect(listConnections, [])

    function createConnection() {
      setConnection(Connection.empty())
      showForm()
    }

    function listConnections() {
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          console.log("listConnections then", data)
          return setConnections(data)
        })
    }

    function getConnection(connection: Connection) {
      setConnection(connection)
      showForm()
    }

    async function deleteConnection(connection: Connection) {
      listConnections()
    }

    async function saveConnection(connection: Connection) {
      const connectionStr = JSON.stringify({
        name: connection.name,
        phone: connection.phone,
        instanceName: "Teste nome conexao",
        // instanceName: connection.instanceName,
        instanceStatus: true,
      })
      console.log("saveConnection connectionStr", connectionStr)
      const response = connection?.id
        ? await fetch(`${API_URL}/${connection.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: connectionStr
        })
        : await fetch(`${API_URL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: connectionStr
        });

      const data = await response.json();
    }

    function criarConnection() {
        setConnection(Connection.empty())
        showForm()
    }


    return {
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
    }
}