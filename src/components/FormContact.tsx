import { useState, useEffect } from "react";
import { Contact } from "../core/Contact";
import Button from "./Button";
import EntryInput from "./EntryInput";
import EntrySelect from "./EntrySelect";

interface FormProps {
  contact: Contact
  contactModified?: (contact: Contact) => void
  canceled?: () => void
}

export default function Form({ contact, canceled, contactModified }: FormProps) {
  const [name, setName] = useState(contact?.name ?? "")
  const [phone, setPhone] = useState(contact?.phone ?? "")
  const [status, setStatus] = useState(contact?.status ?? "")
  const [city, setCity] = useState(contact?.city ?? "")
  const [state, setState] = useState(contact?.state ?? "")
  const [country, setCountry] = useState("Brasil")
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

  const handleStatusChange = (event) => {
    console.log("handleStatusChange: ", event.target.value)
    setStatus(event.target.value); // Atualiza o estado com o valor selecionado
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    if (status) { // Verifica se o status não está vazio

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const ContactObj = { ...contact, status };
      console.log("ContactObj", ContactObj)
      // saveContact(contactUpdated);
    }
  }, [status, contact]);
  const handleStateChange = (event) => {
    setState(event.target.value);
    console.log("state", state)
  };


  // useEffect(() => {
  //   if (level) { // Verifica se o level não está vazio
  //     // Preparar o objeto contact com o level atualizado
  //     const ContactObj = { ...contact, level };
  //     console.log("ContactObj", ContactObj)
  //     // Chamar a função saveContact com o contact atualizado
  //     // saveContact(contactUpdated);
  //   }
  // }, [level]);

  const _id = contact?._id
  // const handleSubmit = () => {
  //   // Atualizar o objeto ContactObj com os estados atuais
  //   const ContactObj = {
  //     ...contact,
  //     _id: contact?._id, // ou simplesmente _id, se já estiver no escopo
  //     name,
  //     phone,
  //     status,
  //     city,
  //     state,
  //     country,
  //     badges: [], // Adicione esta linha
  //     messages: [], // Adicione esta linha
  //     isSelected: false, // Adicione esta linha
  //   };
  
  //   console.log("Objeto Contact a ser salvo:", ContactObj);
  //   contactModified?.(ContactObj);
  // }
  
  // Restante do seu código...
  
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
        text="Telefone"
        value={phone}
        className="mb-4 text-white"
        onChange={e => setPhone((e.target as HTMLInputElement).value)}
      />
      <EntrySelect
        text="Status"
        value={status} // Use o estado como valor
        onChange={handleStatusChange}
        className="mb-4 text-white"
        selectOptions={[
          { value: "", label: "Escolha um status" },
          { value: "Lista fria", label: "Lista fria" },
          { value: "Enviando mensagem 1", label: "Enviando mensagem 1" },
          { value: "Prospectado", label: "Prospectado" },
          { value: "Lead", label: "Lead" },
          { value: "Lead quente", label: "Lead quente" },
          { value: "Lead frio", label: "Lead frio" },
          { value: "Sem interesse", label: "Sem interesse" },
          { value: "Bloqueado", label: "Bloqueado" },
          { value: "Não é o momento", label: "Não é o momento" },
          { value: "Sem dinheiro", label: "Sem dinheiro" },
          { value: "Objeção", label: "Objeção" },
          { value: "Vai pagar", label: "Vai pagar" },
          { value: "Cliente", label: "Cliente" },
        ]}
      />
      <EntryInput
        text="Cidade"
        value={city}
        className="mb-4 text-white"
        onChange={e => setCity((e.target as HTMLInputElement).value)}
      />
      <EntrySelect
        text="Estado"
        className="mb-4 text-white"
        onChange={handleStateChange}
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
        className="mb-4 text-white"
        onChange={e => setCountry((e.target as HTMLInputElement).value)}
      />
      <div className="flex justify-end mt-7">
        <Button
          className="mr-2"
          // onClick={handleSubmit}
        >
          {_id ? "Alterar" : "Salvar"}
        </Button>
        <Button onClick={canceled}>
          Cancelar
        </Button>
      </div>
    </form>
  )

}