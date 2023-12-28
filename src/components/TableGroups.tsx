import { useState, MutableRefObject, useRef, useEffect } from "react"
import Group from "../core/Group"
import { IconEdit, IconThrash } from "./Icons"
import styled from 'styled-components';

interface TableProps {
  groups: Group[]
  groupSelected?: (group: Group) => void
  groupDeleted?: (group: Group) => void
  showCheckboxes?: boolean
  showActions?: boolean
  onSelectionChange?: (selectedIds: string[]) => void;
}

const CursorPointerCheckbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
`;
const API_URL = "http://localhost:9000";

export default function Table({
  groups, groupSelected, groupDeleted, showCheckboxes, showActions = true, onSelectionChange 
}: TableProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const confirmAndDelete = (user) => {
    setCurrentGroup(user);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (currentGroup) {
      groupDeleted?.(currentGroup);
      console.log("Usuário excluído:", currentGroup);
    }
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (group) => {
    if (selectedGroup && selectedGroup._id === group._id) {
      // Desmarcar se já está selecionada
      setSelectedGroup(null);
    } else {
      // Selecionar a nova mensagem
      setSelectedGroup(group);
    }
    // Chamar onSelectionChange com o texto da mensagem
    onSelectionChange?.(group.text);
  };
  

  const Modal = ({ onClose, onConfirm, group }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <p>Tem certeza que deseja excluir a mensagem {group?.title}?</p>
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
        <th className="text-left p-4 w-1/4">Título</th>
        <th className="text-left p-4">Tamanho</th>
        {showActions ? <th className="p-4 w-1/8">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    console.log("TableGroups renderData groups", groups);
    if (!Array.isArray(groups)) {
      return <tr><td colSpan="100% text-white">Nenhum grupo encontrado</td></tr>;
    }
    return groups?.map((group, i) => {
      return (
        <tr key={group.id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          {showCheckboxes && (
            <td className="text-center p-4 w-1/10">
              <CursorPointerCheckbox
                  type="checkbox"
                  className="cursorPointer"
                  checked={selectedGroup?._id === group._id}
                  onChange={() => handleCheckboxChange(group)}
              />
            </td>
          )}
          <td className="text-left p-4">{group.subject}</td>
          <td className="text-left p-4">{group.size}</td>
          {showActions ? renderActions(group) : false}
        </tr>
      )
    })
  }

  function renderActions(group: Group) {
    return (
      <td className="flex justify-center">
        {groupSelected ? (
          <button onClick={() => groupSelected?.(group)} className={`
                    flex justify-right items-right
                    text-green-600 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconEdit}
          </button>
        ) : false}
        {groupDeleted ? (
          <button onClick={() => confirmAndDelete(group)} className={`
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
          group={currentGroup}
        />
      )}
    </div>
  )
}