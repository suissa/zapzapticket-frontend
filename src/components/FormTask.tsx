import { useState } from "react";
import Task from "../core/Task";
import Button from "./Button";
import EntryInput from "./EntryInput";

interface FormProps {
  task: Task
  taskModified?: (task: Task) => void
  canceled?: () => void
}

export default function Form({ task, canceled, taskModified }: FormProps) {
  const [text, setText] = useState(task?.text ?? "")

  const _id = task?._id

  const handleSubmit = () => {
    const updatedTask = new Task(text, task?._id); // Supondo que Task aceite estes parâmetros
    taskModified?.(updatedTask); // Passa a tarefa atualizada
  };

  return (
    <div>
      {_id ? (
        <EntryInput
          text="ID"
          value={_id}
          readOnly
          className="mb-4 text-white"
        />
      ) : false}
      <EntryInput
        text="Tarefa"
        value={text}
        onChange={e => setText((e.target as HTMLInputElement).value)}
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