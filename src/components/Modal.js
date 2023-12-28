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