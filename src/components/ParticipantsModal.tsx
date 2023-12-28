import React, { useEffect } from 'react';

const ParticipantsModal = ({ group, onClose, getProfileImage }) => {
  // Lógica para processar participantes, etc.
  console.log("ParticipantsModal group", group);
  useEffect(() => {
    if (group) {
      group.participants.forEach(participant => {
        getProfileImage("Criptou_Onboarding-5511994649923", participant.id)
          .then(pictureUrl => {
            // Faça algo com a pictureUrl, como adicionar a uma lista de URLs de imagens
          });
      });
    }
  }, [group, getProfileImage]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-1/2">
        <p>Listagem dos participantes do grupo <strong>{group?.subject}</strong>?</p>
        <div className="overflow-y-auto h-80 mt-4">
          <table className="w-full rounded-xl">
            {/* Cabeçalho e corpo da tabela */}
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsModal;
