import { useState, MutableRefObject, useRef, useEffect } from "react"
import ColorPicker from "./ColorPicker"
import Tag from "../core/Tag"
import { IconEdit, IconThrash } from "./Icons"
import useTags from "../hooks/useTags"

interface TableProps {
  tags: Tag[]
  tagSelected?: (tag: Tag) => void
  tagDeleted?: (tag: Tag) => void
  showCheckboxes?: boolean
  showActions?: boolean
  onSelectionChange?: (selectedIds: string[]) => void;
}

const API_URL = "http://localhost:9000";

export default function Table({
  tagSelected, tagDeleted, showCheckboxes, showActions = true, onSelectionChange 
}: TableProps) {

  const {
    tag,
    tags,
    createTag,
    saveTag,
    criarTag,
    deleteTag,
    getTag,
    listTags,
    showTable,
    tableVisible
  } = useTags()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [color, setColor] = useState("#fff");
  const [tagColors, setTagColors] = useState({});

  useEffect(() => {
    const initialColors = {};
    tags.forEach(tag => {
      initialColors[tag._id] = tag.color || "#fff"; // Use a cor da tag ou um padrão
    });
    setTagColors(initialColors);
  }, [tags]);

  const confirmAndDelete = (user) => {
    setCurrentTag(user);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (currentTag) {
      tagDeleted?.(currentTag);
      console.log("Usuário excluído:", currentTag);
    }
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (tag) => {
    if (selectedTag && selectedTag._id === tag._id) {
      // Desmarcar se já está selecionada
      setSelectedTag(null);
    } else {
      // Selecionar a nova mensagem
      setSelectedTag(tag);
    }
    // Chamar onSelectionChange com o texto da mensagem
    onSelectionChange?.(tag.text);
  };

  const handleColorChange = (newColor, tag) => {
    setTagColors(prevColors => ({ ...prevColors, [tag._id]: newColor }));
  };

  const handleOutsideClick = (tag) => {
    console.log("Clicou fora do color picker tag", tag);
    if (tag && tag._id) {
      const updatedColor = tagColors[tag._id];
      console.log("Clicou fora do color picker updatedColor", updatedColor);
      saveTag({ ...tag, color: updatedColor });
    }
  };



  const Modal = ({ onClose, onConfirm, tag }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <p>Tem certeza que deseja excluir a mensagem {tag?.title}?</p>
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
        <th className="text-left p-4 w-1/4">Nome</th>
        <th className="text-left p-4">Cor</th>
        {showActions ? <th className="p-4 w-1/8">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    return tags?.map((tag, i) => {
      const currentColor = tagColors[tag._id] || "#fff"; // Defina currentColor aqui

      return (
        <tr key={tag._id} className={`text-black ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          {showCheckboxes && (
            <td className="text-center p-4 w-1/10">
              <CursorPointerCheckbox
                  type="checkbox"
                  className="cursorPointer"
                  checked={selectedTag?._id === tag._id}
                  onChange={() => handleCheckboxChange(tag)}
              />
            </td>
          )}
          <td className="text-left p-4">{tag.name}</td>
          
          <td className="text-left p-4">
          <div style={{ 
            width: '20px', 
            height: '20px', 
            backgroundColor: currentColor, 
            borderRadius: '20%' 
            }}>

            </div>
          </td>
          {showActions ? renderActions(tag) : false}
        </tr>
      )
    })
  }

  function renderActions(tag: Tag) {
    return (
      <td className="flex justify-center">
        {tagSelected ? (
          <button onClick={() => tagSelected?.(tag)} className={`
                    flex justify-right items-right
                    text-green-600 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconEdit}
          </button>
        ) : false}
        {tagDeleted ? (
          <button onClick={() => confirmAndDelete(tag)} className={`
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
        <Modal 
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          tag={currentTag}
        />
      )}
    </div>
  )
}