import { useState, MutableRefObject, useRef, useEffect } from "react"
import Connection from "../core/Connection"
import { IconEdit, IconThrash } from "./Icons"
import styled from 'styled-components';

interface TableProps {
  connections: Connection[]
  connectionSelected?: (connection: Connection) => void
  connectionDeleted?: (connection: Connection) => void
  connectionSaved?: (connection: Connection) => void
  showCheckboxes?: boolean
  showActions?: boolean
  onSelectionChange?: (selectedIds: string[]) => void;
  hideCertainColumns?: boolean;
  filterActiveInstances?: boolean;
}

const CursorPointerCheckbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
`;
const API_URL = "http://localhost:9000";

export default function Table({ 
  connections, connectionSelected, connectionDeleted, connectionSaved, showCheckboxes, onSelectionChange, 
  showActions = true, hideCertainColumns = false, filterActiveInstances = false }: TableProps) {

  const [checked, setChecked] = useState(false);
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentConnection, setCurrentConnection] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);

  const confirmAndDelete = (user) => {
    setCurrentConnection(user);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (currentConnection) {
      connectionDeleted?.(currentConnection);
      console.log("Conexão excluído:", currentConnection);
    }
    setIsModalOpen(false);
  };
  const handleIntanceStatusCheckboxChange = async (instanceStatus, connection) => {
    console.log("handleIntanceStatusCheckboxChange instanceStatus:", instanceStatus);
    // tirar implementacao daqui
    if (!instanceStatus) {
      console.log(connection._id)
      const result = await fetch(`${API_URL}/connections/${connection._id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const connectionAPI = await result.json();
      console.log(connectionAPI)

      const instanceName = connectionAPI.name.replace(" ", "_") + "-" + connectionAPI.phone;
      console.log(instanceName)
      const data = {
        instanceName: instanceName,
        token: "tokenMaroto_872983_" + Date.now(),
        qrcode: true
      }
      const resultUpdate = await fetch(`${API_URL}/evolution/instances`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const connectionSAVED = await resultUpdate.json()
      console.log(connectionSAVED)
      setQrCodeBase64(connectionSAVED.qrcode.base64)

    } else {
      console.log("caiu no else")
      connection.isActive = !connection.isActive
      // atualiza pra instanceStatus false
      // connectionSaved(connection)

      const result = await fetch(`${API_URL}/connections/shutdown/${connection.instanceName}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      const connectionAPI = await result.json();
      console.log(connectionAPI)
    }
  };

  const handleCheckboxChange = (connection) => {
    console.log("handleCheckboxChange connection:", connection);
    if (selectedConnection && selectedConnection._id === connection._id) {
      // Desmarcar se já está selecionada
      setSelectedConnection(null);
    } else {
      // Selecionar a nova mensagem
      setSelectedConnection(connection);
    }
    // Chamar onSelectionChange com o texto da mensagem
    onSelectionChange?.(connection.instanceName);
  };

  const Modal = ({ onClose, onConfirm, connection }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <p>Tem certeza que deseja excluir a mensagem {connection?.title}?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              onClick={onConfirm}
            >
              Excluir
            </button>
            <button
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white
              px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  function renderHeader() {
    return (
      <tr>
      {showCheckboxes && <th className="text-center p-4">Selecionar</th>}
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Telefone</th>
        {!hideCertainColumns && <th className="text-left p-4">Instância</th>}
        {!hideCertainColumns && <th className="text-center p-4">Ativa</th>}
        {showActions ? <th className="p-4">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    const filteredConnections = filterActiveInstances 
      ? connections.filter(connection => connection.instanceStatus) 
      : connections;
    return filteredConnections?.map((connection, i) => {
      return (
        <tr key={connection._id} className={`${i % 2 === 0 ? 'bg-purple-300' : 'bg-purple-200'}`}>
          {showCheckboxes && (
            <td className="text-center p-4 w-1/10">
              <CursorPointerCheckbox
                  type="checkbox"
                  className="cursorPointer"
                  checked={selectedConnection?._id === connection._id}
                  onChange={() => handleCheckboxChange(connection)}
              />
            </td>
          )}
          <td className="text-left p-4">{connection.name}</td>
          <td className="text-left p-4">{connection.phone}</td>
          {!hideCertainColumns && <td className="text-left p-4">{connection.instanceName}</td>}
          {!hideCertainColumns && <td className="text-center p-4">
            <label>
              <CursorPointerCheckbox
                type="checkbox"
                checked={connection.instanceStatus ? true : false}
                onChange={() => handleIntanceStatusCheckboxChange(connection.instanceStatus, connection)}
              // onChange={handleIntanceStatusCheckboxChange}
              />
            </label></td>}
          {showActions ? renderActions(connection) : false}
        </tr>
      )
    })
  }

  function renderActions(connection: Connection) {
    return (
      <td className="flex justify-center">
        {connectionSelected ? (
          <button onClick={() => connectionSelected?.(connection)} className={`
                    flex justify-center items-center
                    text-green-600 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconEdit}
          </button>
        ) : false}
        {connectionDeleted ? (
          <button onClick={() => connectionDeleted?.(connection)} className={`
                    flex justify-center items-center
                    text-red-500 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconThrash}
          </button>
        ) : false}
      </td>
    )
  }

  return (
    <div>
      {qrCodeBase64 && (
        <img src={`${qrCodeBase64}`} alt="QR Code" />
      )}

      <table className="w-full rounded-xl overflow-hidden">
        <thead className={`
          text-gray-100
          bg-gradient-to-r from-purple-500 to-purple-800
        `}>
          {renderHeader()}
        </thead>
        <tbody>
          {renderData()}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          connection={currentConnection}
        />
      )}
    </div>
  )
}