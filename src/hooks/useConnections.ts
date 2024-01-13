import { useState, MutableRefObject, useRef, useEffect } from "react"
import Connection from "../core/Connection"
import ConnectionRepositorio from "../core/ConnectionRepository"
import useLayout from "./useLayout"
import useAuth from "./useAuth"

import { API_URL } from "../config"

export default function useConnections(onConnectionSelected?: (connection: Connection) => void) {
  const [connection, setConnection] = useState<Connection>(Connection.empty())
  const [connections, setConnections] = useState<Connection[]>([])
  const { showForm, showTable, tableVisible } = useLayout()
  const { getAuthHeader } = useAuth()

  useEffect(listConnections, [])

  function createConnection() {
    setConnection(Connection.empty())
    showForm()
  }

  function listConnections() {
    fetch(`${API_URL}/connections`, {
      headers: getAuthHeader(),
    })
      .then(response => response.json())
      .then(data => {
        console.log("useConnection listConnections then", data)
        return setConnections(data)
      })
  }

  function getConnection(connection: Connection) {
    setConnection(connection)
    showForm()

    if (onConnectionSelected) {
      onConnectionSelected(connection);
    }
  }

  async function deleteConnection(connection: Connection) {
    listConnections()
  }

  async function saveConnection(connection: Connection) {
    const connectionStr = JSON.stringify({
      name: connection.name,
      phone: connection.phone,
      instanceName: connection.instanceName,
      instanceStatus: connection.instanceName,
    })
    console.log("saveConnection connectionStr", connectionStr)
    const response = connection?._id
      ? await fetch(`${API_URL}/connections/${connection._id}`, {
        method: 'PATCH',
        headers: getAuthHeader(),
        body: connectionStr
      })
      : await fetch(`${API_URL}/connections`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: connectionStr
      });

    listConnections()
    showTable()
  }


  return {
    connection,
    connections,
    createConnection,
    saveConnection,
    deleteConnection,
    getConnection,
    listConnections,
    showTable,
    tableVisible
  }
}