import { useState, MutableRefObject, useRef, useEffect } from "react"
import Company from "../core/Company"
import Plan from "../core/Plan"
import CompanyRepository from "../core/CompanyRepository"
import useLayout from "./useLayout"
import { API_URL } from "../config"
import moment from "moment"

export default function useCompanies() {
  const [company, setCompany] = useState<Company>(Company.empty())
  const [companies, setCompanies] = useState<Company[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [planId, setPlanId] = useState<Plan[]>([])
  const { showForm, showTable, tableVisible } = useLayout()

  useEffect(listCompanies, [])

  function createCompany() {
    setCompany(Company.empty())
    showForm()
  }

  function listCompanies() {
    fetch(`${API_URL}/companies`)
      .then(response => response.json())
      .then(data => {
        console.log("listCompanies then", data)
        return setCompanies(data)
      })
  }

  function listPlans() {
    fetch(`${API_URL}/plans/actives`)
      .then(response => response.json())
      .then(data => {
        console.log("listPlans then", data)
        return setPlans(data)
      })
  }

  function getCompany(company: Company) {
    setCompany(company)
    showForm()
  }

  async function deleteCompany(company: Company) {
    listCompanies()
  }

  async function saveCompany(company: Company) {
    console.log("saveCompany company", company)
    var localDate = moment(company.dueDate); // Supondo que company.dueDate já esteja no horário local
    var localDateString = localDate.format(); // Formata a data local como string

    console.log("saveCompany localDate", localDate)
    console.log("saveCompany localDateString", localDateString)
    const companyStr = company?._id
      ? JSON.stringify({
          _id: company._id,
          name: company.name,
          phone: String(company.phone),
          password: company.password,
          status: String(company.status),
          planId: String(company.planId._id),
          dueDate: localDateString,
          recurrence: Boolean(company.recurrence),
          isActive: company.isActive,
        })
      : JSON.stringify({
          name: company.name,
          phone: String(company.phone),
          password: company.password,
          status: String(company.status),
          planId: String(company.planId._id),
          dueDate: localDateString,
          recurrence: Boolean(company.recurrence),
          isActive: company.isActive,
      })
    console.log("saveCompany companyStr", companyStr)
    const response = company?._id
      ? await fetch(`${API_URL}/companies/${company._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: companyStr
      })
      : await fetch(`${API_URL}/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: companyStr
      });
      listCompanies()
      showTable()
    ;
  }

  return {
    plans,
    listPlans,
    company,
    companies,
    setCompanies,
    createCompany,
    saveCompany,
    deleteCompany,
    getCompany,
    listCompanies,
    showTable,
    tableVisible
  }
}