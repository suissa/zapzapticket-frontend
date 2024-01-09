import { useState, useEffect } from "react";
import User from "../core/User";
import Button from "./Button";
import EntryInput from "./EntryInput";
import EntrySelect from "./EntrySelect";

interface FormProps {
  user: User
  userModified?: (user: User) => void
  canceled?: () => void
}

export default function Form({ user, canceled, userModified }: FormProps) {
  const [name, setName] = useState(user?.name ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [password, setPassword] = useState(user?.password ?? "")
  const [phone, setPhone] = useState(user?.phone ?? "")
  const [city, setCity] = useState(user?.city ?? "")
  const [state, setState] = useState(user?.state ?? "")
  const [country, setCountry] = useState(user?.country ?? "Brasil")
  const [level, setLevel] = useState(user?.level ?? "")
  const [selectedStatus, setSelectedStatus] = useState(""); // Estado para o valor selecionado

  const Modal = ({ onClose, children }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          {children}
          <button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    );
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
    // console.log("state", state)
  };

  const handleLevelChange = (event) => {
    // console.log("handleStatusChange: ", event.target.value)
    setLevel(event.target.value);
  };

  useEffect(() => {
    if (level) { // Verifica se o level não está vazio
      // Preparar o objeto user com o level atualizado
      const UserObj = { ...user, level };
      // console.log("UserObj", UserObj)
      // Chamar a função saveUser com o user atualizado
      // saveUser(userUpdated);
    }
  }, [level]);

  const _id = user?._id
  const handleSubmit = () => {
    // Atualizar o objeto UserObj com os estados atuais
    const UserObj = {
      _id: user?._id, // ou simplesmente _id, se já estiver no escopo
      name,
      email,
      password,
      phone,
      city,
      state,
      country,
      level
    };
  
    // console.log("Objeto User a ser salvo:", UserObj);
    // userModified?.(UserObj);
  }
  
  // Restante do seu código...
  
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
        onChange={e => setName((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Email"
        value={email}
        onChange={e => setEmail((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Senha"
        type="password"
        value={password}
        onChange={e => setPassword((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Telefone"
        value={phone}
        onChange={e => setPhone((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Cidade"
        value={city}
        onChange={e => setCity((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntrySelect
        text="Estado"
        onChange={handleStateChange}
        className="mb-4 text-white"
        selectOptions={[
          { value: "", label: "Escolha um estado"},
          { value: "AC", label: "Acre" },
          { value: "AL", label: "Alagoas" },
          { value: "AP", label: "Amapá" },
          { value: "AM", label: "Amazonas" },
          { value: "BA", label: "Bahia" },
          { value: "CE", label: "Ceará" },
          { value: "DF", label: "Distrito Federal" },
          { value: "ES", label: "Espírito Santo" },
          { value: "GO", label: "Goiás" },
          { value: "MA", label: "Maranhão" },
          { value: "MT", label: "Mato Grosso" },
          { value: "MS", label: "Mato Grosso do Sul" },
          { value: "MG", label: "Minas Gerais" },
          { value: "PA", label: "Pará" },
          { value: "PB", label: "Paraíba" },
          { value: "PR", label: "Paraná" },
          { value: "PE", label: "Pernambuco" },
          { value: "PI", label: "Piauí" },
          { value: "RJ", label: "Rio de Janeiro" },
          { value: "RN", label: "Rio Grande do Norte" },
          { value: "RS", label: "Rio Grande do Sul" },
          { value: "RO", label: "Rondônia" },
          { value: "RR", label: "Roraima" },
          { value: "SC", label: "Santa Catarina" },
          { value: "SP", label: "São Paulo" },
          { value: "SE", label: "Sergipe" },
          { value: "TO", label: "Tocantins" },
          { value: "EX", label: "Estrangeiro" },
        ]}
      />

      <EntryInput
        text="País"
        value={country}
        onChange={e => setCountry((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntrySelect
        text="Nível"
        onChange={handleLevelChange}
        className="mb-4 text-white"
        selectOptions={[
          { value: "", label: "Escolha um nível"},
          { value: "normal", label: "Normal" },
          { value: "admin", label: "Admin" },
          { value: "master", label: "Master" },
        ]}
      />
      <div className="flex justify-end mt-7">
        <Button
          className="mr-2"
          onClick={handleSubmit}
        >
          {_id ? "Alterar" : "Salvar"}
        </Button>
        <Button onClick={canceled}>
          Cancelar
        </Button>
      </div>
    </div>
  )

}