import { useState, MutableRefObject, useRef, useEffect } from "react"
import Connection from "../core/Connection"
import { IconEdit, IconThrash, IconShow } from "./Icons"
import styled from "styled-components";
import useHandleInstanceStatusCheckboxChange from "../hooks/useHandleInstanceStatusCheckboxChange";
import ModalQRCode from "./ModalQRCode";

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
  showButton?: boolean;
}

const CursorPointerCheckbox = styled.input.attrs({ type: "checkbox" })`
  cursor: pointer;
`;

export default function Table({ 
  connections, connectionSelected, connectionDeleted, connectionSaved, showCheckboxes, onSelectionChange, 
  showActions = true, hideCertainColumns = false, filterActiveInstances = false, showButton = false }: TableProps) {

  const [checked, setChecked] = useState(false);
  // const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const [currentConnection, setCurrentConnection] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  // const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);

  const {
    qrCodeBase64,
    isQRCodeModalOpen,
    closeQRCodeModal,
    handleInstanceStatusCheckboxChange,
    currentConnection,
    openQRCodeModal
  } = useHandleInstanceStatusCheckboxChange();


  // const confirmAndDelete = (user) => {
  //   setCurrentConnection(user);
  //   setIsModalOpen(true);
  // };

  // Função para abrir o modal do QR Code
  // const openQRCodeModal = () => {
  //   setIsQRCodeModalOpen(true);
  // };

  // // Função para fechar o modal do QR Code
  // const closeQRCodeModal = () => {
  //   setIsQRCodeModalOpen(false);
  // };


  const handleDelete = () => {
    if (currentConnection) {
      connectionDeleted?.(currentConnection);
      console.log("Conexão excluído:", currentConnection);
    }
    setIsModalOpen(false);
  };
  // const _handleIntanceStatusCheckboxChange = (connection) => {
  //   setIsQRCodeModalOpen(true);
  // }

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
        {showButton ? <th className="p-4">Selecionar</th> : false}
      </tr>
    )
  }

  function renderData() {
    const filteredConnections = filterActiveInstances 
      ? connections.filter(connection => connection.instanceStatus) 
      : connections;
    return filteredConnections?.map((connection, i) => {
      return (
        <tr key={connection._id} 
            // onClick={() => {
            //   connectionSelected(connection)
            // }}
            className={`${i % 2 === 0 ? "bg-purple-300" : "bg-purple-200"}`}>
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
              {/* <CursorPointerCheckbox
                type="checkbox"
                checked={connection.instanceStatus ? true : false}
                onChange={() => handleInstanceStatusCheckboxChange(connection)}
              // onChange={handleIntanceStatusCheckboxChange}
              /> */}
              {connection.instanceStatus ?
                <button
                  type="button"
                  className="
                  btn-danger text-white
                  px-4 py-2 rounded-md w-90px"
                  onClick={() => handleInstanceStatusCheckboxChange(connection)}>
                  Desativar
                </button>
                :
                <button
                  type="button"
                  className="
                  bg-gradient-to-t from-purple-500 to-purple-700 text-white
                  px-4 py-2 rounded-md w-90px"
                  onClick={() => handleInstanceStatusCheckboxChange(connection)}>
                  Ativar
                </button>
              }
            </label>
          </td>}
            {showButton ? renderShow(connection) : false}
          {showActions ? renderActions(connection) : false}
        </tr>
      )
    })
  }

  function renderShow(connection: Connection) {
    return (
      <td className="flex justify-center">
        {connectionSelected ? (
          <button title="Selecionar"
            onClick={(e) =>{ 
              e.stopPropagation();
              connectionSelected(connection)}
            } 
            className={`
              flex justify-center items-center
              text-green-600 rounded-md p-2 m-1
              hover:bg-purple-50
            `}>
            <IconShow className="text-purple" />
          </button>
        ) : false}
      </td>
    )
  }

  function renderActions(connection: Connection) {
    return (
      <td className="flex justify-center">
        {connectionSelected ? (
          <button 
            onClick={(e) =>{ 
              e.stopPropagation();
              connectionSelected?.(connection)}
            } 
            className={`
              flex justify-center items-center
              text-green-600 rounded-md p-2 m-1
              hover:bg-purple-50
            `}>
            {IconEdit}
          </button>
        ) : false}
        {connectionDeleted ? (
          <button 
          onClick={(e) =>{ 
            e.stopPropagation();
            connectionDeleted?.(connection)
          }} 
          className={`
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
      {/* {qrCodeBase64 && <ModalQRCode64 qrCodeBase64={qrCodeBase64} />} */}
      {/* Botão para abrir o modal do QR Code */}

      {/* Modal do QR Code */}
      {true && (
        <ModalQRCode
          isOpen={isQRCodeModalOpen}
          closeModal={closeQRCodeModal}
          qrCodeBase64={qrCodeBase64}
        />
      )}
{/* {qrCodeBase64 && <ModalQRCode qrcode= (
        <img src={`${qrCodeBase64}`} alt="QR Code" />
      )} */}

      <table className="w-full rounded-md overflow-hidden tb-connections">
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