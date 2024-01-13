import { useState, MutableRefObject, useRef, useEffect } from "react"
import Company from "../core/Company"
import { IconEdit, IconThrash } from "./Icons"
import styled from 'styled-components';
import useCompanies from "../hooks/useCompanies";
import moment from "moment";
moment.locale('pt-br');

interface TableProps {
  companies: Company[]
  companySelected?: (company: Company) => void
  companyDeleted?: (company: Company) => void
  listCompanies?: () => void
  showCheckboxes?: boolean
  showActions?: boolean
  onSelectionChange?: (selectedIds: string[]) => void;
}

const CursorPointerCheckbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
`;
;

export default function Table({
  companies, companySelected, companyDeleted, listCompanies, showCheckboxes, showActions = true, onSelectionChange 
}: TableProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const companyRefs = useRef({});

  const { saveCompany, setCompanies } = useCompanies();
  
  const confirmAndDelete = (user) => {
    setCurrentCompany(user);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (currentCompany) {
      companyDeleted?.(currentCompany);
      console.log("Tarefa excluída:", currentCompany);
    }
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (company) => {
    setTimeout(() => {
      const updatedCompany = { ...company, isActive: false };
      // saveCompany(updatedCompany);
      const companiesList = companies.filter(t => t._id !== company._id);
      setCompanies(companiesList);
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
          <p>Tem certeza que deseja excluir a Empresa {company?.name}?</p>
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
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Telefone</th>
        <th className="text-left p-4">Status</th>
        <th className="text-left p-4">Plano</th>
        <th className="text-center p-4">Data Vencimento</th>
        <th className="text-center p-4">Recorrente</th>
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
                  checked={selectedCompany?._id === company._id}
                  onChange={() => handleCheckboxChange(company)}
              />
            </td>
          )}
          <td className="text-left p-4">{company.name}</td>
          <td className="text-left p-4">{company.phone}</td>
          <td className="text-left p-4">{company.status}</td>
          <td className="text-left p-4">{company.planName}</td>
          <td className="text-center p-4">{moment(company.dueDate).format('DD/MM/YYYY')}</td>
          <td className="text-center p-4"><input 
            type="checkbox" 
            checked={company.recurrence} 
            onChange={e => {/* handle the change if needed */}}
            disabled // Adicione esta linha se o checkbox não deve ser interativo
          /></td>
          {showActions ? renderActions(company) : false}
        </tr>
      )
    })
  }

  function renderActions(company: Company) {
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
          company={currentCompany}
        />
      )}
    </div>
  )
}