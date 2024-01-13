import { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/FormCompany";
import Layout from "../components/Layout";
import Table from "../components/TableCompanies";
import Menu from '../components/Menu';
import useCompanies from "../hooks/useCompanies";
import { useIsAuthenticated } from "../hooks/useAuth";
import useLayout from "../hooks/useLayout";

export default function Home() {
  useIsAuthenticated();

  const {
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
  } = useCompanies()

  useEffect(() => {
    if (tableVisible) {
      listPlans();
      listCompanies();
    }
  }, [tableVisible]);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleToggleSidebar = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };
  return (
    <div className="flex">
      <Menu onToggle={setIsSidebarExpanded} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-10"}`}>
        <div className="h-screen bg text-white p-10">
          <Layout title="Empresas" width="w3/3">
            {tableVisible ? (
              <div>
                <div className="flex justify-end">
                  <Button
                    className="mb-4"
                    onClick={createCompany}
                  >
                    Nova Empresa
                  </Button>
                </div>
                <Table
                  companies={companies}
                  companySelected={getCompany}
                  companyDeleted={deleteCompany}
                  listCompanies={listCompanies}
                />
              </div>
            ) : (
              <Form
              plans={plans}
              company={company}
              companyModified={saveCompany}
              canceled={showTable}
              />
            )}
          </Layout>
        </div>
      </div>
    </div>


  )
}