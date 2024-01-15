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
  const [users, setUsers] = useState(plan?.users ?? 0)
  const [connections, setConnections] = useState(plan?.connections ?? 0)
  const [queues, setQueues] = useState(plan?.queues ?? 0)
  const [value, setValue] = useState(plan?.value ?? 0)


  const _id = plan?._id

  const handleSubmit = () => {
    const updatedPlan = new Plan(_id, name, users, connections, queues, value);
    planModified?.(updatedPlan); // Passa a tarefa atualizada
  };


  return (
    <form>
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
        onChange={e => setName((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Usuários"
        value={users}
        onChange={e => setUsers(parseInt(e.target.value))}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Conexões"
        value={connections}
        onChange={e => setConnections(parseInt(e.target.value))}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Filas"
        value={queues}
        onChange={e => setQueues(parseInt(e.target.value))}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Valor"
        value={value}
        onChange={e => setValue(parseInt(e.target.value))}
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