import { useState } from "react";
import Connection from "../core/Connection";
import Button from "./Button";
import Entry from "./Entry";

interface FormProps {
  connection: Connection
  connectionModified?: (connection: Connection) => void
  canceled?: () => void
}

export default function Form({ connection, canceled, connectionModified }: FormProps) {
  const [name, setName] = useState(connection?.name ?? "")
  const [phone, setPhone] = useState(connection?.phone ?? "")
  const [instanceName, setInstanceName] = useState(connection?.instanceName ?? "")
  const [instanceStatus, setInstanceStatus] = useState(connection?.instanceStatus ?? false)

  const _id = connection?._id
  const handleSubmit = () => {
    console.log("ID on button click:", _id); // Isso vai mostrar o ID no console
    connectionModified?.(new Connection(name, phone, _id));
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
        text="Nome"
        value={name}
        onChange={e => setName((e.target as HTMLInputElement).value)}
        className="mb-4"
      />
      <Entry
        text="Telefone"
        value={phone}
        onChange={e => setPhone((e.target as HTMLInputElement).value)} // Removido o operador +
      />
      <Entry
        text="Conexão"
        value={instanceName}
        onChange={e => setInstanceName((e.target as HTMLInputElement).value)} // Removido o operador +
      />
      <Entry
        text="instanceStatus"
        type="checkbox"
        checked={instanceStatus}
        onChange={e => setInstanceStatus(e.target.checked)}
      />

      {/* <label>
          Status
          <input
            type="checkbox"
            checked={instanceStatus}
            onChange={e => setInstanceStatus(e.target.checked)}
          />
        </label> */}
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