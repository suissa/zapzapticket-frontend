import { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/FormQueue";
import Layout from "../components/Layout";
import Table from "../components/TableQueues";
import Menu from '../components/Menu';
import useQueues from "../hooks/useQueues";
import useLayout from "../hooks/useLayout";

export default function Home() {
  const {
    queue,
    queues,
    createQueue,
    saveQueue,
    deleteQueue,
    getQueue,
    listQueues,
    showTable,
    tableVisible
  } = useQueues()

  useEffect(() => {
    if (tableVisible) {
      listQueues();
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
          <Layout title="Filas" width="w3/3">
            {tableVisible ? (
              <div>
                <div className="flex justify-end">
                  <Button
                    className="mb-4"
                    onClick={createQueue}
                  >
                    Nova Fila
                  </Button>
                </div>
                <Table
                  queues={queues}
                  queueSelected={getQueue}
                  queueDeleted={deleteQueue}
                />
              </div>
            ) : (
              <Form
              queue={queue}
              queueModified={saveQueue}
              canceled={showTable}
              />
            )}
          </Layout>
        </div>
      </div>
    </div>


  )
}