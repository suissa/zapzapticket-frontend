import { useState } from "react";
import Group from "../core/Group";
import Button from "./Button";
import Entry from "./Entry";

interface FormProps {
  group: Group
  groupModified?: (group: Group) => void
  canceled?: () => void
}

export default function Form({ group, canceled, groupModified }: FormProps) {
  const [title, setTitle] = useState(group?.title ?? "")
  const [text, setText] = useState(group?.text ?? "")
  const [isActive, setIsActive] = useState(group?.isActive ?? "")
  const [instanceStatus, setInstanceStatus] = useState(group?.instanceStatus ?? false)

  const _id = group?._id
  const handleSubmit = () => {
    console.log("ID on button click:", _id); // Isso vai mostrar o ID no console
    groupModified?.(new Group(title, text, _id));
  }
  return (
    <div>
      {_id ? (
        <Entry
          text="ID"
          value={_id}
          readOnly
          className="mb-4"
        />
      ) : false}
      <Entry
        text="Título"
        value={title}
        onChange={e => setTitle((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <Entry
        text="Texto"
        value={text}
        onChange={e => setText((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <Entry
        text="isActive"
        type="checkbox"
        checked={true}
        onChange={e => setIsActive(e.target.checked)}
        className="mb-4 text-white"
      />
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