import { useState } from "react";
import Message from "../core/Message";
import Button from "./Button";
import EntryInput from "./EntryInput";

interface FormProps {
  message: Message
  messageModified?: (message: Message) => void
  canceled?: () => void
}

export default function Form({ message, canceled, messageModified }: FormProps) {
  const [title, setTitle] = useState(message?.title ?? "")
  const [text, setText] = useState(message?.text ?? "")
  const [isActive, setIsActive] = useState(message?.isActive ?? "")
  // const [instanceStatus, setInstanceStatus] = useState(message?.instanceStatus ?? false)

  const _id = message?._id
  const handleSubmit = () => {
    // console.log("ID on button click:", _id); // Isso vai mostrar o ID no console
    messageModified?.(new Message(title, text, _id));
  }
  return (
    <div>
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
        value={title}
        onChange={e => setTitle((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Texto"
        value={text}
        onChange={e => setText((e.target as HTMLInputElement).value)}
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
    </div>
  )

}