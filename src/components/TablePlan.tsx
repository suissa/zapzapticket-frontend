import { useState, MutableRefObject, useRef, useEffect } from "react"
import Plan from "../core/Plan"
import { IconEdit, IconThrash } from "./Icons"
import styled from 'styled-components';
import usePlans from "../hooks/usePlans";

interface TableProps {
  plans: Plan[]
  planSelected?: (plan: Plan) => void
  planDeleted?: (plan: Plan) => void
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
  plans, planSelected, planDeleted, listPlans, showCheckboxes, showActions = true, onSelectionChange 
}: TableProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const planRefs = useRef({});

  const { savePlan, setPlans } = usePlans();
  
  const confirmAndDelete = (user) => {
    setCurrentPlan(user);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (currentPlan) {
      planDeleted?.(currentPlan);
      console.log("Tarefa excluída:", currentPlan);
    }
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (plan) => {
    slideUpEffect(plan._id);

    setTimeout(() => {
      const updatedPlan = { ...plan, isActive: false };
      // savePlan(updatedPlan);
      const plansList = plans.filter(t => t._id !== plan._id);
      setPlans(plansList);
    }, 500);
  };
  


  const slideUpEffect = (planId) => {
    const planRow = planRefs.current[planId];
    if (planRow) {
      planRow.classList.add('slide-up');

      // Adicionar ouvinte para o fim da animação
      planRow.addEventListener('animationend', () => {
        const plansList = plans.filter(t => t._id !== planId);
        setPlans(plansList); // Atualizar o estado após a animação
      }, { once: true }); // Garantir que o evento seja removido após ser acionado
    }
  };

  useEffect(() => {
    planRefs.current = {};
    plans.forEach(plan => {
      planRefs.current[plan._id] = null;
    });
  }, [plans]);

  const Modal = ({ onClose, onConfirm, plan }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <p>Tem certeza que deseja excluir o Plano {plan?.name}?</p>
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
        <th className="text-left p-4">Tarefa</th>
        {showActions ? <th className="p-4 w-1/8">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    return plans?.map((plan, i) => {
      const ref = el => {
        if (el) {
          planRefs.current[plan._id] = el;
        }
      };

      return (
        <tr ref={ref} key={plan._id} 
        className={`text-black ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}
        onClick={() => handleCheckboxChange(plan)}
        style={{ cursor: 'pointer' }}
        >
          {showCheckboxes && (
            <td className="text-center p-4 w-1/10">
              <CursorPointerCheckbox
                  type="checkbox"
                  className="cursorPointer"
                  checked={selectedPlan?._id === plan._id}
                  onChange={() => handleCheckboxChange(plan)}
              />
            </td>
          )}
          <td className="text-left p-4">{plan.name}</td>
          <td className="text-left p-4">{plan.users}</td>
          <td className="text-left p-4">{plan.connections}</td>
          <td className="text-left p-4">{plan.queues}</td>
          <td className="text-left p-4">{plan.value}</td>
          {showActions ? renderActions(plan) : false}
        </tr>
      )
    })
  }

  function renderActions(plan: Plan) {
    return (
      <td className="flex justify-center">
        {planSelected ? (
          <button onClick={() => planSelected?.(plan)} className={`
                    flex justify-right items-right
                    text-green-600 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconEdit}
          </button>
        ) : false}
        {planDeleted ? (
          <button onClick={() => confirmAndDelete(plan)} className={`
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
          plan={currentPlan}
        />
      )}
    </div>
  )
}