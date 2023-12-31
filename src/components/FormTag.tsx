import { useState } from "react";
import Tag from "../core/Tag";
import Button from "./Button";
import Entry from "./Entry";
import ColorPicker from "./ColorPicker"
import useTags from "../hooks/useTags"

interface FormProps {
  tag: Tag
  initialColor: string  // Adicione esta linha
  tagModified?: (tag: Tag) => void
  canceled?: () => void
}

export default function Form({ tag, initialColor, canceled, tagModified }: FormProps) {
  const [text, setText] = useState(tag?.text ?? "")
  const [name, setName] = useState(tag?.name ?? "")
  const [selectedTag, setSelectedTag] = useState(null);
  const [color, setColor] = useState(initialColor);

  console.log("initialColor: ", initialColor)
  const {
    saveTag,
  } = useTags()

  const _id = tag?._id
  const handleSubmit = () => {
    console.log("ID on button click:", _id); // Isso vai mostrar o ID no console
    tagModified?.(new Tag(color, text, _id));
  }
  const handleOutsideClick = (tag) => {
    console.log("Clicou fora do color picker tag", tag);
    if (tag && tag._id) {
      saveTag({ ...tag, color: color });
    }
  };
  return (
    <div>
      {_id ? (
        <Entry
          text="ID"
          value={_id}
          readOnly
          className="mb-4 text-white"
        />
      ) : false}

      <Entry
        text="Nome"
        value={name}
        onChange={e => setName((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
    <div className={`flex flex-col mb-4 text-white`}>
      <label className="mb-2">
        Cor:
        <ColorPicker color={color} onChange={setColor} onOutsideClick={() => handleOutsideClick(tag)} />
      </label>
    </div>
      <div className="flex justify-end mt-7">
        <Button
          color="blue"
          className="mr-2"
          onClick={handleSubmit}
        >
          {_id ? 'Alterar' : 'Salvar'}
        </Button>
        <Button onClick={canceled}>
          Cancelar
        </Button>
      </div>
    </div>
  )

}