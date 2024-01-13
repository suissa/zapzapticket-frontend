import { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/FormScheduleMessage";
import Layout from "../components/Layout";
import Menu from '../components/Menu';
import Table from "../components/TableScheduleMessages";
import useScheduleMessages from "../hooks/useScheduleMessages";
import { useIsAuthenticated } from "../hooks/useAuth";


export default function Home() {
  useIsAuthenticated();

  const {
    scheduleMessage,
    scheduleMessages,
    createScheduleMessage,
    saveScheduleMessage,
    deleteScheduleMessage,
    getScheduleMessage,
    listScheduleMessages,
    showTable,
    tableVisible
  } = useScheduleMessages();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  
  const handleToggleSidebar = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };

  useEffect(() => {
    if (tableVisible) {
      listScheduleMessages();
    }
  }, [tableVisible]);

  return (
   
    <div className="flex">
      <Menu onToggle={setIsSidebarExpanded} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-10"}`}>
        <div className="h-screen bg text-white p-10">
          <Layout title="Campanha" width="w3/3">
            {tableVisible ? (
              <div>
                <div className="flex justify-end">
                  <Button
                    className="mb-4"
                    onClick={createScheduleMessage}
                  >
                    Nova Campanha
                  </Button>
                </div>
                <Table
                  scheduleMessages={scheduleMessages}
                  scheduleMessageSelected={getScheduleMessage}
                  scheduleMessageDeleted={deleteScheduleMessage}
                />
              </div>
            ) : (
              <Form
                scheduleMessage={scheduleMessage}
                scheduleMessageModified={saveScheduleMessage}
                canceled={showTable}
              />
            )}
          </Layout>
        </div>
      </div>
    </div>
  )
}
