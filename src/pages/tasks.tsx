import { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/FormTask";
import Layout from "../components/Layout";
import Table from "../components/TableTasks";
import Menu from '../components/Menu';
import useTasks from "../hooks/useTasks";
import { useIsAuthenticated } from "../hooks/useAuth";

import useLayout from "../hooks/useLayout";

export default function Home() {
  useIsAuthenticated();

  const {
    task,
    tasks,
    createTask,
    saveTask,
    // setTask,
    deleteTask,
    getTask,
    listTasks,
    showTable,
    tableVisible
  } = useTasks()

  useEffect(() => {
    if (tableVisible) {
      listTasks();
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
          <Layout title="Tarefas" width="w3/3">
            {tableVisible ? (
              <div>
                <div className="flex justify-end">
                  <Button
                    className="mb-4"
                    onClick={createTask}
                  >
                    Nova Tarefa
                  </Button>
                </div>
                <Table
                  tasks={tasks}
                  taskSelected={getTask}
                  taskDeleted={deleteTask}
                  listTasks={listTasks}
                />
              </div>
            ) : (
              <Form
              task={task}
              taskModified={saveTask}
              canceled={showTable}
              />
            )}
          </Layout>
        </div>
      </div>
    </div>


  )
}