import { useState } from "react";
import Group from "../core/Group";
import Button from "./Button";
import EntryInput from "./EntryInput";

interface FormProps {
  group: Group
  groupModified?: (group: Group) => void
  canceled?: () => void
}

export default function Form({ group, canceled, groupModified }: FormProps) {
  const [subject, setSubject] = useState(group?.subject ?? "")
  const [isActive, setIsActive] = useState(group?.isActive ?? true)

  const _id = group?._id
  const handleSubmit = () => {
    console.log("ID on button click:", _id); // Isso vai mostrar o ID no console
    groupModified?.(new Group(subject, _id, 0, isActive));
  }
  return (
    <form>
      {_id ? (
        <EntryInput
          text="ID"
          value={_id}
          readOnly
          className="mb-4"
        />
      ) : false}
      <EntryInput
        text="Título"
        value={subject}
        onChange={e => setSubject((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntryInput
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
    </form>
  )

}