import { useEffect, useState, useCallback } from "react";
import Company from "../core/Company";
import Plan from "../core/Plan";
import Button from "./Button";
import EntryInput from "./EntryInput";
import EntrySelect from "./EntrySelect";
import EntryCheckbox from "./EntryCheckbox";
import EntryCalendar from "./EntryCalendar";
import useCompanies from "../hooks/useCompanies";

export interface FormProps {
  company: Company;
  // companies: Company[]; // Add the missing 'companies' property
  canceled?: () => void;
  companyModified: (company: Company) => void;
  // companySelected: (company: Company) => void;
  // companyDeleted: (company: Company) => Promise<void>;
  // listCompanies: () => void;
  plans: Plan[];
}

export default function Form({ company, canceled, companyModified, plans }: FormProps) {
  const [name, setName] = useState(company?.name ?? "")
  const [phone, setPhone] = useState(company?.phone ?? "")
  const [status, setStatus] = useState(company?.status ?? "Ativo");
  const [password, setPassword] = useState(company?.password ?? "")
  const [planId, setPlanId] = useState(company?.planId ?? {} as Plan)
  // const [plans, setPlans] = useState([])
  const [dueDate, setDueDate] = useState(company?.dueDate ?? new Date())
  const [recurrence, setRecurrence] = useState(company?.recurrence ?? true)
  const {
    listPlans,
  //   companies,
  //   setCompanies,
    createCompany,
    saveCompany,
  //   deleteCompany,
  //   getCompany,
  //   listCompanies,
  //   showTable,
  //   tableVisible
  } = useCompanies();

  const _id = company?._id

  // const onPlanChange = useCallback((e) => {
  //   console.log("e.target.value", e.target.value)
  //   setPlanId((e.target as unknown as HTMLInputElement).value);
  // }, []);
  

  const onPlanChange = useCallback((e) => {
    const selectedPlanId = e.target.value;
    const selectedPlan = plans.find(plan => plan._id === selectedPlanId);
    setPlanId(selectedPlan); // Armazenar o objeto Plan, não apenas o ID
    console.log("selectedPlan", selectedPlan)
  }, [plans]);

  const handleSubmit = useCallback(() => {
    console.log("handleSubmit planId", planId)
    console.log("name:", name, "phone:", phone, "password:", password)

    const updatedCompany = new Company(_id, name, phone, password, status, planId, dueDate, recurrence);
    companyModified?.(updatedCompany); // Passa a tarefa atualizada
  }, [planId, name, phone, password, status, dueDate, recurrence, companyModified, _id]);
  
  useEffect(() => {
    listPlans();
    console.log("useEffect dueDate", dueDate);
    console.log("useEffect planId", planId);
    if (company?._id) {
      console.log("useEffect company", company)
      setName(company.name);
      setPhone(company.phone);
      setPassword(company.password);
      setPlanId(company.planId);
      console.log("company.dueDate", company.dueDate)
      setDueDate(company.dueDate);
      setRecurrence(company.recurrence);
      const currentPlan = plans.find(plan => plan._id === company.planId._id);
      setPlanId(currentPlan);
    } else {
      setName("");
      setPhone("");
      setPassword("");
      setStatus("Inativo");
      setDueDate(new Date());
      setRecurrence(false);
      setPlanId(plans[0]); // Defina como o primeiro plano ou algum valor padrão

    }
  }, [company]); // Adicione 'company' às dependências do useEffect
  

  
  useEffect(() => {
    console.log("Plans:", plans);
    console.log("Current planId:", planId);
  }, [plans, planId]);

  const statusList = [
    { value: "Ativo", label: "Ativo" },
    { value: "Inativo", label: "Inativo" },
  ];

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
        onChange={e => setPhone((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Senha"
        type="password"
        value={password}
        onChange={e => setPassword((e.target as HTMLInputElement).value)}
        className="mb-4 text-white"
      />
      <EntrySelect
        text="Status"
        selectOptions={statusList}
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="mb-4 text-white"
      />
      <EntrySelect
        text="Plano"
        value={planId?._id ?? ""}
        selectOptions={[{ value: "Escolha um Plano", label: "Escolha um Plano" },...plans.map(plan => {
          // console.log("plan map", plan)
          return { value: plan._id, label: plan.name }
        })]}
        onChange={onPlanChange}
        className="mb-4 text-white"
      />
      <EntryCalendar
        text="Data de Vencimento"
        selected={dueDate}
        onChange={date => setDueDate(date)} // date é a data selecionada
        className="mb-4 text-white"
      />


      <EntryCheckbox
        text="Recorrente"
        checked={recurrence}
        onChange={e => setRecurrence(e.target.checked)} // e.target.checked é um booleano
        className="mb-4 text-white"
      />
      <div className="flex justify-end mt-7">
        <Button
          color="blue"
          className="mr-2"
          onClick={handleSubmit}
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