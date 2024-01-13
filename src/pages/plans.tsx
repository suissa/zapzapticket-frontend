import { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/FormPlan";
import Layout from "../components/Layout";
import Table from "../components/TablePlans";
import Menu from '../components/Menu';
import usePlans from "../hooks/usePlans";
import useAuth from "../hooks/useAuth";
import useLayout from "../hooks/useLayout";

export default function Home() {
  const { isAuthenticated } = useAuth();
  isAuthenticated();

  const {
    plan,
    plans,
    createPlan,
    savePlan,
    // setPlan,
    deletePlan,
    getPlan,
    listPlans,
    showTable,
    tableVisible
  } = usePlans()

  useEffect(() => {
    if (tableVisible) {
      listPlans();
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
          <Layout title="Planos" width="w3/3">
            {tableVisible ? (
              <div>
                <div className="flex justify-end">
                  <Button
                    className="mb-4"
                    onClick={createPlan}
                  >
                    Novo Plano
                  </Button>
                </div>
                <Table
                  plans={plans}
                  planSelected={getPlan}
                  planDeleted={deletePlan}
                  listPlans={listPlans}
                />
              </div>
            ) : (
              <Form
              plan={plan}
              planModified={savePlan}
              canceled={showTable}
              />
            )}
          </Layout>
        </div>
      </div>
    </div>


  )
}