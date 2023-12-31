import { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/FormUser";
import Layout from "../components/Layout";
import Table from "../components/TableUsers";
import Menu from '../components/Menu';
import useUsers from "../hooks/useUsers";
import useLayout from "../hooks/useLayout";

export default function Home() {
  const {
    user,
    users,
    createUser,
    saveUser,
    criarUser,
    deleteUser,
    getUser,
    listUsers,
    showTable,
    tableVisible
  } = useUsers()

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleToggleSidebar = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };

  useEffect(() => {
    if (tableVisible) {
      listUsers();
    }
  }, [tableVisible]);

  return (
   
    <div className="flex">
      <Menu onToggle={setIsSidebarExpanded} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-10"}`}>
        <div className="h-screen bg text-white p-10">
          <Layout title="Usuários">
            {tableVisible ? (
              <div>
                <div className="flex justify-end">
                  <Button
                    className="mb-4"
                    onClick={createUser}
                  >
                    Novo Usuário
                  </Button>
                </div>
                <Table
                  users={users}
                  userSelected={getUser}
                  userDeleted={deleteUser}
                />
              </div>
            ) : (
              <Form
                user={user}
                userModified={saveUser}
                canceled={showTable}
              />
            )}
          </Layout>
        </div>
      </div>
    </div>
  )
}