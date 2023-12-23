import { useState } from "react";
import User from "../core/User";
import Button from "./Button";
import Entry from "./Entry";

interface FormProps {
  message: User
  messageModified?: (message: User) => void
  canceled?: () => void
}

export default function Form({ message, canceled, messageModified }: FormProps) {
  const [title, setTitle] = useState(message?.title ?? "")
  const [text, setText] = useState(message?.text ?? "")
  const [isActive, setIsActive] = useState(message?.isActive ?? "")
  const [instanceStatus, setInstanceStatus] = useState(message?.instanceStatus ?? false)

  const _id = message?._id
  const handleSubmit = () => {
    console.log("ID on button click:", _id); // Isso vai mostrar o ID no console
    messageModified?.(new User(title, text, _id));
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
        className="mb-4"
      />
      <Entry
        text="Texto"
        value={text}
        onChange={e => setText((e.target as HTMLInputElement).value)} // Removido o operador +
      />
      <Entry
        text="isActive"
        type="checkbox"
        checked={true}
        onChange={e => setIsActive(e.target.checked)}
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