import { useState, MutableRefObject, useRef, useEffect } from "react"
import Plan from "../core/Plan"
import { IconEdit, IconThrash } from "./Icons"
import styled from 'styled-components';
import usePlans from "../hooks/usePlans";

interface TableProps {
  companies: Plan[]
  companySelected?: (company: Plan) => void
  companyDeleted?: (company: Plan) => void
  listPlans?: () => void
  showCheckboxes?: boolean
  showActions?: boolean
  onSelectionChange?: (selectedIds: string[]) => void;
}

const CursorPointerCheckbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
`;
;

export default function Table({
  companies, companySelected, companyDeleted, listPlans, showCheckboxes, showActions = true, onSelectionChange 
}: TableProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const companyRefs = useRef({});

  const { savePlan, setPlans } = usePlans();
  
  const confirmAndDelete = (user) => {
    setCurrentPlan(user);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (currentPlan) {
      companyDeleted?.(currentPlan);
      console.log("Tarefa excluída:", currentPlan);
    }
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (company) => {
    setTimeout(() => {
      const updatedPlan = { ...company, isActive: false };
      // savePlan(updatedPlan);
      const companiesList = companies.filter(t => t._id !== company._id);
      setPlans(companiesList);
    }, 500);
  };


  useEffect(() => {
    companyRefs.current = {};
    companies.forEach(company => {
      companyRefs.current[company._id] = null;
    });
  }, [companies]);

  const Modal = ({ onClose, onConfirm, company }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <p>Tem certeza que deseja excluir o Plano {company?.name}?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              onClick={onConfirm}
            >
              Excluir
            </button>
            <button
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white
              px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  function renderHeader() {
    return (
      <tr>
        {showCheckboxes && <th className="text-center p-4 w-1/10">Selecionar</th>}
        <th className="text-left p-4">Plano</th>
        <th className="text-left p-4">Usuários</th>
        <th className="text-left p-4">Conexões</th>
        <th className="text-left p-4">Filas</th>
        <th className="text-left p-4">Valor</th>
        {showActions ? <th className="p-4 w-1/8">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    return companies && companies?.map((company, i) => {
      const ref = el => {
        if (el) {
          companyRefs.current[company._id] = el;
        }
      };

      return (
        <tr ref={ref} key={company._id} 
        className={`text-black ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}
        onClick={() => handleCheckboxChange(company)}
        style={{ cursor: 'pointer' }}
        >
          {showCheckboxes && (
            <td className="text-center p-4 w-1/10">
              <CursorPointerCheckbox
                  type="checkbox"
                  className="cursorPointer"
                  checked={selectedPlan?._id === company._id}
                  onChange={() => handleCheckboxChange(company)}
              />
            </td>
          )}
          <td className="text-left p-4">{company.name}</td>
          <td className="text-left p-4">{company.users}</td>
          <td className="text-left p-4">{company.connections}</td>
          <td className="text-left p-4">{company.queues}</td>
          <td className="text-left p-4">{company.value}</td>
          {showActions ? renderActions(company) : false}
        </tr>
      )
    })
  }

  function renderActions(company: Plan) {
    return (
      <td className="flex justify-center">
        {companySelected ? (
          <button onClick={() => companySelected?.(company)} className={`
                    flex justify-right items-right
                    text-green-600 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconEdit}
          </button>
        ) : false}
        {companyDeleted ? (
          <button onClick={() => confirmAndDelete(company)} className={`
                    flex justify-right items-right
                    text-red-500 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconThrash}
          </button>
        ) : false}
      </td>
    )
  }

  return (
    <div>
      <table className="w-full rounded-md overflow-hidden">
        <thead className={`
          text-gray-100
          bg-gradient-to-r from-purple-500 to-purple-800
      `}>
          {renderHeader()}
        </thead>
        <tbody>
          {renderData()}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal 
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          company={currentPlan}
        />
      )}
    </div>
  )
}