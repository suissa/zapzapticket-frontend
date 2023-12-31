import { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/FormMessage";
import Table from "../components/TableScheduleMessages";
import Menu from '../components/Menu';
import useScheduleMessages from "../hooks/useScheduleMessages";

export default function Home() {
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
          <div title="Campanhas">
            {tableVisible ? (
              <div>
                <div className="flex justify-end">
                  <Button
                    className="mb-4"
                    onClick={createScheduleMessage}
                  >
                    Nova Mensagem
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
          </div>
        </div>
      </div>
    </div>
  )
}
