import { useState } from "react";
import User from "../core/User";
import Button from "./Button";
import Entry from "./Entry";

interface FormProps {
  user: User
  userModified?: (user: User) => void
  canceled?: () => void
}

export default function Form({ user, canceled, userModified }: FormProps) {
  const [name, setName] = useState(user?.name ?? "")
  const [phone, setPhone] = useState(user?.phone ?? "")
  const [status, setStatus] = useState(user?.status ?? "")
  const [city, setCity] = useState(user?.city ?? "")
  const [state, setState] = useState(user?.state ?? "")
  const [country, setCountry] = useState(user?.country ?? "Brasil")
  const [level, setLevel] = useState(user?.level ?? "")
  const [isActive, setIsActive] = useState(user?.isActive ?? true)
  const [isConnected, setIsConnected] = useState(user?.isConnected ?? false)
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const _id = user?._id
  const handleSubmit = () => {
    console.log("ID on button click:", _id); // Isso vai mostrar o ID no console
    userModified?.(new User(name, phone, _id, state, country, level));
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
        onChange={e => setPhone((e.target as HTMLInputElement).value)}
      />
      <Entry
        text="Status"
        type="select"
        // value={selectedStatus}
        onChange={handleStatusChange}
        selectOptions={[
          { value: 'Lista fria', label: 'Lista fria' },
          { value: 'Enviando mensagem 1', label: 'Enviando mensagem 1' },
          { value: 'Prospectado', label: 'Prospectado' },
          { value: 'Lead', label: 'Lead' },
          { value: 'Lead quente', label: 'Lead quente' },
          { value: 'Lead frio', label: 'Lead frio' },
          { value: 'Sem interesse', label: 'Sem interesse' },
          { value: 'Bloqueado', label: 'Bloqueado' },
          { value: 'Não é o momento', label: 'Não é o momento' },
          { value: 'Sem dinheiro', label: 'Sem dinheiro' },
          { value: 'Objeção', label: 'Objeção' },
          { value: 'Vai pagar', label: 'Vai pagar' },
          { value: 'Cliente', label: 'Cliente' },
        ]}
      />
      <Entry
        text="Cidade"
        value={city}
        onChange={e => setCity((e.target as HTMLInputElement).value)}
      />
      <Entry
        text="Estado"
        type="select"
        selectOptions={[
          { value: 'AC', label: 'Acre' },
          { value: 'AL', label: 'Alagoas' },
          { value: 'AP', label: 'Amapá' },
          { value: 'AM', label: 'Amazonas' },
          { value: 'BA', label: 'Bahia' },
          { value: 'CE', label: 'Ceará' },
          { value: 'DF', label: 'Distrito Federal' },
          { value: 'ES', label: 'Espírito Santo' },
          { value: 'GO', label: 'Goiás' },
          { value: 'MA', label: 'Maranhão' },
          { value: 'MT', label: 'Mato Grosso' },
          { value: 'MS', label: 'Mato Grosso do Sul' },
          { value: 'MG', label: 'Minas Gerais' },
          { value: 'PA', label: 'Pará' },
          { value: 'PB', label: 'Paraíba' },
          { value: 'PR', label: 'Paraná' },
          { value: 'PE', label: 'Pernambuco' },
          { value: 'PI', label: 'Piauí' },
          { value: 'RJ', label: 'Rio de Janeiro' },
          { value: 'RN', label: 'Rio Grande do Norte' },
          { value: 'RS', label: 'Rio Grande do Sul' },
          { value: 'RO', label: 'Rondônia' },
          { value: 'RR', label: 'Roraima' },
          { value: 'SC', label: 'Santa Catarina' },
          { value: 'SP', label: 'São Paulo' },
          { value: 'SE', label: 'Sergipe' },
          { value: 'TO', label: 'Tocantins' },
          { value: 'EX', label: 'Estrangeiro' },
        ]}
      />

      <Entry
        text="País"
        value={country}
        onChange={e => setCountry((e.target as HTMLInputElement).value)}
      />
      <Entry
        text="Nível"
        type="select"
        selectOptions={[
          { value: 'normal', label: 'Normal' },
          { value: 'admin', label: 'Admin' },
          { value: 'master', label: 'Master' },
        ]}
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