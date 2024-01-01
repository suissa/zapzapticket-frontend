import { useState, MutableRefObject, useRef, useEffect } from "react"
import moment from "moment"
import ScheduleMessage from "../core/ScheduleMessage"
import { IconEdit, IconThrash } from "./Icons"
import styled from 'styled-components';

interface TableProps {
  scheduleMessages: ScheduleMessage[]
  scheduleMessageSelected?: (scheduleMessage: ScheduleMessage) => void
  scheduleMessageDeleted?: (scheduleMessage: ScheduleMessage) => void
  showCheckboxes?: boolean
  showActions?: boolean
  onSelectionChange?: (selectedIds: string[]) => void;
}

const CursorPointerCheckbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
`;
const API_URL = "http://localhost:9000";

export default function Table({
  scheduleMessages, scheduleMessageSelected, scheduleMessageDeleted, showCheckboxes, showActions = true, onSelectionChange 
}: TableProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentScheduleMessage, setCurrentScheduleMessage] = useState(null);
  const [selectedScheduleMessage, setSelectedScheduleMessage] = useState(null);

  const confirmAndDelete = (user) => {
    setCurrentScheduleMessage(user);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (currentScheduleMessage) {
      scheduleMessageDeleted?.(currentScheduleMessage);
      console.log("Campanha excluída:", currentScheduleMessage);
    }
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (scheduleMessage) => {
    if (selectedScheduleMessage && selectedScheduleMessage._id === scheduleMessage._id) {
      // Desmarcar se já está selecionada
      setSelectedScheduleMessage(null);
    } else {
      // Selecionar a nova mensagem
      setSelectedScheduleMessage(scheduleMessage);
    }
    // Chamar onSelectionChange com o texto da mensagem
    onSelectionChange?.(scheduleMessage.text);
  };

  const Modal = ({ onClose, onConfirm, scheduleMessage }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <p>Tem certeza que deseja excluir a mensagem {scheduleMessage?.title}?</p>
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
        {showCheckboxes && <th className="text-center p-4 w-1/10">Selecionar</th>}
        <th className="text-left p-4">Texto</th>
        <th className="text-center p-4">Conexão</th>
        <th className="text-center p-4">Contato</th>
        <th className="text-center p-4">Data</th>
        {showActions ? <th className="p-4 w-1/8">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    return scheduleMessages?.map((scheduleMessage, i) => {
      const isoDate = scheduleMessage.dateToSend;
      const formattedDate = moment(isoDate).format('HH:mm DD/MM/YYYY');

      return (
        <tr key={scheduleMessage._id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          {showCheckboxes && (
            <td className="text-center p-4 w-1/10">
              <CursorPointerCheckbox
                  type="checkbox"
                  className="cursorPointer"
                  checked={selectedScheduleMessage?._id === scheduleMessage._id}
                  onChange={() => handleCheckboxChange(scheduleMessage)}
              />
            </td>
          )}
          <td className="text-left p-4">{scheduleMessage.text}</td>
          <td className="text-center p-4">{scheduleMessage.from}</td>
          <td className="text-center p-4">{scheduleMessage.to}</td>
          <td className="text-center p-4">{formattedDate}</td>
          {showActions ? renderActions(scheduleMessage) : false}
        </tr>
      )
    })
  }

  function renderActions(scheduleMessage: ScheduleMessage) {
    return (
      <td className="flex justify-center">
        {scheduleMessageSelected ? (
          <button onClick={() => scheduleMessageSelected?.(scheduleMessage)} className={`
                    flex justify-right items-right
                    text-green-600 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconEdit}
          </button>
        ) : false}
        {scheduleMessageDeleted ? (
          <button onClick={() => confirmAndDelete(scheduleMessage)} className={`
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
      <table className="w-full rounded-md overflow-hidden">
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
          scheduleMessage={currentScheduleMessage}
        />
      )}
    </div>
  )
}