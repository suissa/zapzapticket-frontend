import { useState, MutableRefObject, useRef, useEffect, useCallback } from "react"
import React from "react";
import Group from "../core/Group"
import { IconEdit, IconThrash, IconContactsMenu } from "./Icons"
import styled from "styled-components";

interface TableProps {
  groups: Group[]
  groupSelected?: (group: Group) => void
  groupDeleted?: (group: Group) => void
  showCheckboxes?: boolean
  showActions?: boolean
  onSelectionChange?: (selectedIds: string[]) => void;
  getProfileImage?: (instanceName: string, number: string) => Promise<string>
  importContacts?: (instanceName: string, numbers: string, groupId: string) => void
  selectedConnection?: any
}

const CursorPointerCheckbox = styled.input.attrs({ type: "checkbox" })`
  cursor: pointer;
`;
const API_URL = "http://137.184.81.207:9000";

export default function Table({
  groups, groupSelected, groupDeleted, showCheckboxes, showActions = true, onSelectionChange, 
  getProfileImage, importContacts, selectedConnection
}: TableProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [selectedGroupForParticipants, setSelectedGroupForParticipants] = useState(null);
  const [participantImages, setParticipantImages] = useState({});

  console.log("TableGroups rodei 1x");
  const handleParticipantsClick = useCallback((group) => {
    setSelectedGroupForParticipants(group);
    setIsParticipantsModalOpen(true);
  }, []);

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

  
  const ParticipantsModal = ({ onClose, onConfirm, group, importContacts, selectedConnection }) => {
    console.log("TableGroups ParticipantsModal group", group);
    console.log("TableGroups ParticipantsModal selectedConnection", selectedConnection);
    const { participants } = group;
    participants.sort((a, b) => {
      if (a.admin === b.admin) {
        return 0;
      }
      return a.admin ? -1 : 1;
    });
    console.log("Rodei 1x")
    useEffect(() => {
      const loadImages = async () => {
        const imageMap = {};
    
        for (const participant of group.participants) {
          const pictureUrl = await getProfileImage(selectedConnection.instanceName, participant.id.replace("@s.whatsapp.net", ""));
          console.log("TableGroups ParticipantsModal pictureUrl", pictureUrl);
          if (!participantImages[participant.id]) {
            imageMap[participant.id] = pictureUrl || "/images/avatar-01.png";
          }
        }
    
        if (Object.keys(imageMap).length > 0) {
          setParticipantImages(prevImages => ({ ...prevImages, ...imageMap }));
        }
      };
    
      if (group && group.participants) {
        loadImages();
      }
    }, [group, participantImages]);
    
    
    const handleImportContacts = () => {
      const numbers = group.participants.map(p => p.id.replace("@s.whatsapp.net", "")); // Supondo que id seja o número do telefone
      const groupId = group.id;
      const { instanceName } = selectedConnection;
      console.log("TableGroups ParticipantsModal handleImportContacts instanceName", instanceName);
      console.log("TableGroups ParticipantsModal handleImportContacts numbers", numbers);
      console.log("TableGroups ParticipantsModal handleImportContacts groupId", groupId);
      console.log("TableGroups ParticipantsModal handleImportContacts participantImages", participantImages);
      importContacts(instanceName, groupId, participantImages)
        .then(response => {
            console.log("TableGroups ParticipantsModal handleImportContacts response", response);
            alert("Contatos importados com sucesso!")
        })
        .catch(error => {
          console.log("TableGroups ParticipantsModal handleImportContacts error", error);
          alert("Erro ao importar contatos!")
        });
    };
    return (
      
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded w-1/2">
          <p>Listagem dos participantes do grupo <strong>{group?.subject}</strong>?</p>
            <div className="overflow-y-auto h-80 mt-4">
          
            <table className="w-full rounded-xl">
              <thead className={`
                text-gray-100
                bg-gradient-to-r from-purple-500 to-purple-800
            `}>
                <tr>
                  <th className="text-left p-4 w-1/4">Telefone</th>
                  <th className="text-left p-4">Nível</th>
                  <th className="text-left p-4"></th>
                </tr>
              </thead>
              <tbody>
                {participants?.map((participant, i) => {
                  const pictureUrl = participantImages[participant.id];

                  return (
                    <tr key={i} className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}>
                      <td className="text-left p-4">
                        {participant.id.replace("@s.whatsapp.net", "")}
                      </td>
                      <td className="text-left p-4">{participant.admin ? participant.admin : "participante"}</td>
                      <td className="text-center">
                      {pictureUrl && <img src={pictureUrl} alt="Profile" style={{ width: "50px", height: "50px", margin: "0 auto" }} />}
                      </td>
                    </tr>
                  )
                })}
              </tbody>

            </table>
            
          </div>
          <div className="flex justify-end mt-4">
            
            <button
                className="bg-gradient-to-t from-purple-500 to-purple-700 text-white
                px-4 py-2 rounded-md mr-2"
                onClick={handleImportContacts}
              >
                Importar Contatos
              </button>
            <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={onClose}
              >
                Fechar
              </button>
            </div>
          {/* <div className="flex justify-end mt-4">
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
          </div> */}
        </div>
      </div>
    );
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
      return <tr><td colSpan="100%" className="text-white">Nenhum grupo encontrado</td></tr>;
    }
    return groups?.map((group, i) => {
      return (
        <tr key={group.id} className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}>
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
        <button title="Ver participantes"
          onClick={() => handleParticipantsClick(group)} className={`
          flex justify-right items-right
          text-green-600 rounded-md p-2 m-1
          hover:bg-purple-50
        `}>
          <IconContactsMenu className="text-blue" />
        </button>
        {groupSelected ? (
          <button title="Editar"
            onClick={() => groupSelected?.(group)} className={`
                flex justify-right items-right
                text-green-600 rounded-md p-2 m-1
                hover:bg-purple-50
            `}>
            {IconEdit}
          </button>
        ) : false}
        {groupDeleted ? (
          <button title="Excluir"
            onClick={() => confirmAndDelete(group)} className={`
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

      {isParticipantsModalOpen && (
        <ParticipantsModal 
          group={selectedGroupForParticipants} 
          onClose={() => setIsParticipantsModalOpen(false)}
          importContacts={importContacts}
          selectedConnection={selectedConnection}
        />
      )}
    </div>
  )
}