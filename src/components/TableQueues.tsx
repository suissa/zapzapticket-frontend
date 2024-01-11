import { useState, MutableRefObject, useRef, useEffect } from "react"
import ColorPicker from "./ColorPicker"
import Queue from "../core/Queue"
import { IconEdit, IconThrash } from "./Icons"
import useQueues from "../hooks/useQueues"
import ModalDeleteConfirmation from './ModalDeleteConfirmation';
import styled from "styled-components";
import { API_URL } from "../config";


interface TableProps {
  queues: Queue[]
  queueSelected?: (queue: Queue) => void
  queueDeleted?: (queue: Queue) => void
  showCheckboxes?: boolean
  showActions?: boolean
  onSelectionChange?: (selectedIds: string[]) => void;
}

const CursorPointerCheckbox = styled.input.attrs({ type: "checkbox" })`
  cursor: pointer;
`;
export default function Table({
  queueSelected, queueDeleted, showCheckboxes, showActions = true, onSelectionChange 
}: TableProps) {

  const {
    queue,
    queues,
    createQueue,
    saveQueue,
    deleteQueue,
    getQueue,
    listQueues,
    showTable,
    tableVisible
  } = useQueues()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentQueue, setCurrentQueue] = useState(null);
  const [selectedQueue, setSelectedQueue] = useState(null);
  const [color, setColor] = useState("#fff");
  const [queueColors, setQueueColors] = useState({});

  useEffect(() => {
    const initialColors = {};
    queues.forEach(queue => {
      initialColors[queue._id] = queue.color || "#fff"; // Use a cor da queue ou um padrão
    });
    setQueueColors(initialColors);
  }, [queues]);

  const confirmAndDelete = (user) => {
    setCurrentQueue(user);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Excluindo queue", currentQueue);
    if (currentQueue) {
      queueDeleted?.(currentQueue);
      console.log("Queue excluída:", currentQueue);
    }
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (queue) => {
    if (selectedQueue && selectedQueue._id === queue._id) {
      // Desmarcar se já está selecionada
      setSelectedQueue(null);
    } else {
      // Selecionar a nova mensagem
      setSelectedQueue(queue);
    }
    // Chamar onSelectionChange com o texto da mensagem
    onSelectionChange?.(queue.text);
  };

  const handleColorChange = (newColor, queue) => {
    setQueueColors(prevColors => ({ ...prevColors, [queue._id]: newColor }));
  };

  const handleOutsideClick = (queue) => {
    console.log("Clicou fora do color picker queue", queue);
    if (queue && queue._id) {
      const updatedColor = queueColors[queue._id];
      console.log("Clicou fora do color picker updatedColor", updatedColor);
      saveQueue({ ...queue, color: updatedColor });
    }
  };



  const Modal = ({ onClose, onConfirm, queue }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <p>Tem certeza que deseja excluir a mensagem {queue?.title}?</p>
          <div className="flex justify-end mt-4">
            <button
              className="btn-danger text-white py-2 px-4 rounded mr-2"
              onClick={onConfirm}
            >
              Excluir
            </button>
            <button
              type="button"
              className="
              bg-gradient-to-t from-purple-500 to-purple-700 text-white
              px-4 py-4 rounded-md mb-4"
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
        {showCheckboxes && <th className="text-center p-4 w-1/10">Selecionar</th>}
        <th className="text-left p-4 w-1/4">Nome</th>
        <th className="text-left p-4">Cor</th>
        {showActions ? <th className="p-4 w-1/8">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    return queues?.map((queue, i) => {
      const currentColor = queueColors[queue._id] || "#fff"; // Defina currentColor aqui

      return (
        <tr key={queue._id} className={`text-black ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          {showCheckboxes && (
            <td className="text-center p-4 w-1/10">
              <CursorPointerCheckbox
                  type="checkbox"
                  className="cursorPointer"
                  checked={selectedQueue?._id === queue._id}
                  onChange={() => handleCheckboxChange(queue)}
              />
            </td>
          )}
          <td className="text-left p-4">{queue.name}</td>
          
          <td className="text-left p-4">
          <div style={{ 
            width: '20px', 
            height: '20px', 
            backgroundColor: currentColor, 
            borderRadius: '20%' 
            }}>

            </div>
          </td>
          {showActions ? renderActions(queue) : false}
        </tr>
      )
    })
  }

  function renderActions(queue: Queue) {
    return (
      <td className="flex justify-center">
        {queueSelected ? (
          <button onClick={() => queueSelected?.(queue)} className={`
                    flex justify-right items-right
                    text-green-600 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconEdit}
          </button>
        ) : false}
        {queueDeleted ? (
          <button onClick={() => confirmAndDelete(queue)} className={`
                    flex justify-right items-right
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
      <table className="w-full rounded-md overflow-auto">
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
        <ModalDeleteConfirmation
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          name={currentQueue.name} // Certifique-se de passar a entidade correta
        />
      )}
    </div>
  )
}