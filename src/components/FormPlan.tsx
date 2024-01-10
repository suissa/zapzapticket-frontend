import { useState } from "react";
import Plan from "../core/Plan";
import Button from "./Button";
import EntryInput from "./EntryInput";

interface FormProps {
  plan: Plan
  planModified?: (plan: Plan) => void
  canceled?: () => void
}

export default function Form({ plan, canceled, planModified }: FormProps) {
  const [name, setName] = useState(plan?.name ?? "")
  const [users, setUsers] = useState(plan?.users ?? "")
  const [connections, setConnections] = useState(plan?.connections ?? "")
  const [queues, setQueues] = useState(plan?.queues ?? "")
  const [value, setValue] = useState(plan?.value ?? "")


  const _id = plan?._id

  const handleSubmit = () => {
    const updatedPlan = new Plan(text, plan?._id); // Supondo que Plan aceite estes parâmetros
    planModified?.(updatedPlan); // Passa a tarefa atualizada
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
        text="Nome"
        value={name}
        onChange={e => setText((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Usuários"
        value={users}
        onChange={e => setText((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Conexões"
        value={connections}
        onChange={e => setText((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Filas"
        value={queues}
        onChange={e => setText((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Valor"
        value={value}
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