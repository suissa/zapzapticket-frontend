import { useState, useEffect } from "react";
import Tag from "../core/Tag";
import Button from "./Button";
import EntryInput from "./EntryInput";
import ColorPicker from "./ColorPicker"
import useTags from "../hooks/useTags"

interface FormProps {
  tag: Tag
  tagModified?: (tag: Tag) => void
  canceled?: () => void
  initialColor?: string; // Add initialColor property
}

export default function Form({ tag, canceled, tagModified, initialColor }: FormProps) {
  const [name, setName] = useState(tag?.name ?? "");
  const [color, setColor] = useState(tag?.color ?? "#fff");

  const { saveTag } = useTags()

  const _id = tag?._id;
  const handleSubmit = () => {
    tagModified?.(new Tag(color, name, _id));
  };

  const handleOutsideClick = (tag) => {
    if (tag && tag._id) {
      saveTag({ ...tag, color: color });
    }
  };

  useEffect(() => {
    setColor(tag?.color || "#fff");
  }, [tag]);

  console.log("Cor atual:", color);

  return (
    <form>
      {_id ? (
        <EntryInput
          text="ID"
          value={_id}
          readOnly
          className="mb-4 text-white"
        />
      ) : null}

      <EntryInput
        text="Nome"
        value={name}
        onChange={e => setName(e.target.value)}
        className="mb-4 text-white"
      />
      <div className="flex flex-col mb-4 text-white">
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
    </form>
  );
}
