// DeleteConfirmationModal.jsx
import React from 'react';

const ModalDeleteConfirmation = ({ onClose, onConfirm, entity }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <p>Tem certeza que deseja excluir {entity?.title}?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded mr-2"
            onClick={onConfirm}
          >
            Excluir
          </button>
          <button
            type="button"
            className="bg-gradient-to-t from-purple-500 to-purple-700 text-white px-4 py-2 rounded-md mb-4"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteConfirmation;
