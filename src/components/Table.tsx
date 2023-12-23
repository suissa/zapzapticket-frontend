import { useState, MutableRefObject, useRef, useEffect } from "react"
import Connection from "../core/Connection"
import { IconEdit, IconThrash } from "./Icons"

interface TableProps {
  connections: Connection[]
  connectionSelected?: (connection: Connection) => void
  connectionDeleted?: (connection: Connection) => void
}

const API_URL = "http://localhost:9000";

export default function Table({ connections, connectionSelected, connectionDeleted }: TableProps) {

  const showActions = connectionSelected || connectionDeleted
  const [checked, setChecked] = useState(false);
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentConnection, setCurrentConnection] = useState(null);

  const confirmAndDelete = (user) => {
    setCurrentConnection(user);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (currentConnection) {
      messageDeleted?.(currentConnection);
      console.log("Usuário excluído:", currentConnection);
    }
    setIsModalOpen(false);
  };
  const handleCheckboxChange = async (instanceStatus, _id) => {
    console.log("handleCheckboxChange instanceStatus:", instanceStatus);
    // tirar implementacao daqui
    if(!instanceStatus){
      console.log(_id)
      const result = await fetch(`${API_URL}/connections/${_id}`, {
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
      const connectionSAVED = await resultUpdate.json();
      console.log(connectionSAVED)
      setQrCodeBase64(connectionSAVED.qrcode.base64);

      // setIsModalOpen(true);
    // fetch(`${SERVER_API}/evolution/instances/create`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     instanceName: connectionName,
    //     token: "tokenAOIEKdjnj1701477826237",
    //     qrcode: true
    //   })
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Trate a resposta aqui
    //   console.log(data);
    // })
    // .catch(error => console.error("Error:", error));

    }
  };

  const Modal = ({ onClose, onConfirm, message }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <p>Tem certeza que deseja excluir a mensagem {message?.title}?</p>
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
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Telefone</th>
        <th className="text-left p-4">Instância</th>
        <th className="text-center p-4">Ativa</th>
        {showActions ? <th className="p-4">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    return connections?.map((connection, i) => {
      return (
        <tr key={connection._id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          <td className="text-left p-4">{connection.name}</td>
          <td className="text-left p-4">{connection.phone}</td>
          <td className="text-left p-4">{connection.instanceName}</td>
          <td className="text-center p-4">
            <label>
                <input
                  type="checkbox"
                  checked={connection.instanceStatus ? true : false}
                  onChange={() => handleCheckboxChange(connection.instanceStatus, connection._id)}
                  // onChange={handleCheckboxChange}
                  />
              </label></td>
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
        message={currentConnection}
      />
    )}
    </div>
  )
}